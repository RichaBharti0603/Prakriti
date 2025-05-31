from fastapi import APIRouter, File, UploadFile, HTTPException
from pydantic import BaseModel, Field
import databutton as db
from openai import OpenAI
import base64
import mimetypes

router = APIRouter()

# Initialize OpenAI client
# This will use the OPENAI_API_KEY secret you provided
api_key = db.secrets.get("OPENAI_API_KEY")
if not api_key:
    print("Warning: OPENAI_API_KEY secret is not set. The API will not function correctly.")
    # You could raise an error here or allow the app to start and fail at runtime
client = OpenAI(api_key=api_key)

# Renaming to avoid any potential clashes, though unlikely here.
class WasteClassificationApiRequest(BaseModel):
    # FastAPI will handle the file upload via the endpoint parameter
    pass

class WasteClassificationApiResponse(BaseModel):
    material_type: str | None = Field(None, description="The classified type of waste material (e.g., plastic, paper, glass).")
    confidence_score: float | None = Field(None, description="The AI's confidence in the classification (0.0 to 1.0).")
    details: str | None = Field(None, description="Additional details or specific type of the material.")
    raw_ai_response: str | None = Field(None, description="The raw response from the AI for debugging or further processing.")
    error: str | None = Field(None, description="Error message if classification failed.")

@router.post("/classify-waste", response_model=WasteClassificationApiResponse)
async def classify_waste_image(image_file: UploadFile = File(...) ):
    """
    Analyzes an uploaded image of waste material using OpenAI Vision 
    and returns the classification results.
    """
    if not db.secrets.get("OPENAI_API_KEY"):
        raise HTTPException(status_code=500, detail="OpenAI API key is not configured. Please set the OPENAI_API_KEY secret.")

    allowed_mime_types = ["image/jpeg", "image/png", "image/gif", "image/webp"]
    if image_file.content_type not in allowed_mime_types:
        return WasteClassificationApiResponse(
            error=f"Unsupported file type: {image_file.content_type}. Please upload a JPG, PNG, GIF, or WEBP image."
        )

    try:
        contents = await image_file.read()
        base64_image = base64.b64encode(contents).decode("utf-8")
        mime_type = image_file.content_type
        image_url = f"data:{mime_type};base64,{base64_image}"

        prompt_text = (
            "Analyze the provided image and identify the primary waste material shown. "
            "Your response should be a JSON object with the following fields: "
            "'material_type' (e.g., plastic, paper, glass, metal, organic, electronic, textile), "
            "'confidence_score' (a float between 0.0 and 1.0 indicating your confidence), "
            "and 'details' (a brief description or specific type of the material, e.g., 'PET bottle', 'cardboard box'). "
            "If you cannot confidently classify the material, set material_type to 'unknown' and provide a low confidence score."
        )

        response = client.chat.completions.create(
            model="gpt-4o-mini", 
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": prompt_text},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url,
                            },
                        },
                    ],
                }
            ],
            max_tokens=300,
            # Ensure JSON mode is enabled if the model supports it and you want guaranteed JSON output
            # For gpt-4o-mini, direct JSON mode might not be explicitly set this way, 
            # so parsing the text response is safer.
            # response_format={"type": "json_object"} # Check OpenAI documentation for model-specific JSON mode
        )

        ai_response_content = response.choices[0].message.content
        print(f"OpenAI raw response: {ai_response_content}") # For debugging

        # Attempt to parse the JSON from the AI response
        try:
            parsed_response = db.storage.json.loads(ai_response_content) # Using db.storage.json for consistency, or import json
            material_type = parsed_response.get("material_type")
            confidence_score = parsed_response.get("confidence_score")
            details = parsed_response.get("details")
            
            # Validate types
            if material_type and not isinstance(material_type, str):
                material_type = str(material_type)
            if confidence_score:
                try:
                    confidence_score = float(confidence_score)
                except ValueError:
                    print(f"Warning: Could not parse confidence_score '{confidence_score}' as float.")
                    confidence_score = 0.0 # Default or handle as error
            if details and not isinstance(details, str):
                details = str(details)

            return WasteClassificationApiResponse(
                material_type=material_type,
                confidence_score=confidence_score,
                details=details,
                raw_ai_response=ai_response_content
            )
        except Exception as e: # Broad exception for parsing issues
            print(f"Error parsing AI JSON response: {e}")
            # Fallback if JSON parsing fails - attempt to extract common terms or return raw
            # This is a simple fallback, more sophisticated parsing might be needed for non-JSON responses
            material_type_guess = None
            if ai_response_content:
                if "plastic" in ai_response_content.lower(): 
                    material_type_guess = "plastic"
                elif "paper" in ai_response_content.lower(): 
                    material_type_guess = "paper"
                elif "glass" in ai_response_content.lower(): 
                    material_type_guess = "glass"
                # Add more guesses if needed
            
            return WasteClassificationApiResponse(
                material_type=material_type_guess if material_type_guess else "unknown",
                confidence_score=0.1 if material_type_guess else 0.0, # Low confidence for guessed/unknown
                details="AI response was not in the expected JSON format. See raw response.",
                raw_ai_response=ai_response_content,
                error="Failed to parse AI response as JSON."
            )

    except HTTPException as http_exc: # Re-raise HTTPExceptions to be handled by FastAPI
        raise http_exc
    except Exception as e:
        print(f"Error during waste classification: {e}")
        # Consider logging the full traceback here for detailed debugging
        # import traceback; traceback.print_exc();
        return WasteClassificationApiResponse(
            error=f"An unexpected error occurred during classification: {str(e)}"
        )
    finally:
        if 'image_file' in locals() and hasattr(image_file, 'close'):
            await image_file.close()
