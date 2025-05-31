from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
import databutton as db
from typing import List, Literal, Dict

router = APIRouter()

# Mirrored structure from the data population script
class RecyclingIdeaModel(BaseModel):
    id: str
    title: str
    description: str
    difficulty: Literal["easy", "medium", "hard"]
    materials_needed: List[str]
    image_url: str
    youtube_tutorial_link: str

class GetIdeasResponse(BaseModel):
    material_type: str
    ideas: List[RecyclingIdeaModel] = Field(default_factory=list)
    message: str | None = None

# Storage key where the ideas database is stored
STORAGE_KEY = "prakriti_recycling_ideas_v1"

@router.get("/get-ideas", response_model=GetIdeasResponse)
async def get_recycling_ideas(material_type: str = Query(..., description="The type of waste material to get ideas for (e.g., plastic, paper, glass).")):
    """
    Retrieves recycling and reuse ideas for a given waste material type 
    from the database stored in Databutton storage.
    """
    try:
        # Load the entire database of ideas
        # Type hint for clarity, though Pydantic will validate the response model
        ideas_database: Dict[str, List[Dict]] = db.storage.json.get(STORAGE_KEY) 

        if not ideas_database:
            raise HTTPException(status_code=404, detail=f"Recycling ideas database not found at key '{STORAGE_KEY}'. Please populate it first.")

        # Normalize material_type for matching (e.g., classifier might output 'Plastic' or 'plastic')
        normalized_material_type = material_type.lower()

        relevant_ideas_dicts = ideas_database.get(normalized_material_type, [])
        
        # Validate and convert dictionaries to RecyclingIdeaModel instances
        # Pydantic will do this automatically if the data matches the model structure upon return,
        # but explicit parsing can catch errors earlier or allow for transformations if needed.
        # For now, relying on response_model validation.
        
        if not relevant_ideas_dicts:
            return GetIdeasResponse(
                material_type=material_type,
                ideas=[],
                message=f"No specific recycling or reuse ideas found for '{material_type}'. We are constantly updating our database!"
            )
        
        # The response_model will handle converting dicts to RecyclingIdeaModel if they match
        return GetIdeasResponse(
            material_type=material_type,
            ideas=relevant_ideas_dicts # Pydantic will validate/convert these dicts to RecyclingIdeaModel
        )

    except FileNotFoundError:
        # This specific exception for db.storage.json.get might not be standard, depends on SDK.
        # More general exception handling is usually better unless specific errors are documented.
        print(f"Recycling ideas database file not found at key: {STORAGE_KEY}")
        raise HTTPException(status_code=500, detail=f"The recycling ideas database seems to be missing. Please contact support or try repopulating.") from None
    except Exception as e:
        print(f"Error retrieving recycling ideas: {e}")
        # Log the full traceback for detailed debugging if needed
        # import traceback; traceback.print_exc();
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred while fetching recycling ideas: {str(e)}") from e

# Example of how this might be called (for documentation):
# GET /get-ideas?material_type=plastic
