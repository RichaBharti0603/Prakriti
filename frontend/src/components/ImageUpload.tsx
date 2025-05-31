import React, { useState, useCallback, ChangeEvent, DragEvent } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card, 
  CardContent, 
  CardDescription, // If used for subtitles or secondary text
  CardFooter, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"; // For collapsible trigger icon

import brain from 'brain'; // Import Databutton brain client
import type { WasteClassificationApiResponse, GetIdeasResponse, RecyclingIdeaModel } from 'types'; // Assuming types are generated

// Placeholder icons - consider replacing with more organic/biophilic SVGs later
const UploadCloudIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-12 h-12 text-gray-400"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
  </svg>
);

const CameraIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6 mr-2"}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.174C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.174 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
    </svg>
);

const XCircleIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

interface IdeaCardProps {
  idea: RecyclingIdeaModel;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea }) => {
  const [isOpen, setIsOpen] = useState(false);

  let difficultyBadgeVariant: "default" | "secondary" | "destructive" | "outline" = "default";
  switch (idea.difficulty) {
    case "easy":
      difficultyBadgeVariant = "default"; // Greenish in shadcn default theme (often)
      break;
    case "medium":
      difficultyBadgeVariant = "secondary"; // Bluish/Grayish
      break;
    case "hard":
      difficultyBadgeVariant = "destructive"; // Reddish
      break;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <Card className="rounded-lg shadow-md bg-white border-lime-200 overflow-hidden transition-all duration-300 ease-in-out">
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer p-4 hover:bg-lime-50">
            <div className="flex-grow">
              <CardTitle className="text-lime-700 text-md">{idea.title}</CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={difficultyBadgeVariant} className="capitalize text-xs px-2 py-0.5">
                {idea.difficulty}
              </Badge>
              {isOpen ? (
                <ChevronUpIcon className="h-5 w-5 text-lime-600" />
              ) : (
                <ChevronDownIcon className="h-5 w-5 text-lime-600" />
              )}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="text-sm text-gray-700 space-y-3 p-4 pt-0">
            {idea.image_url && (
              <img 
                src={idea.image_url} 
                alt={idea.title} 
                className="w-full h-48 object-cover rounded-md my-2 border border-gray-200 shadow-sm"
                onError={(e) => { 
                  (e.target as HTMLImageElement).style.display = 'none'; 
                }}
              />
            )}
            <p className="text-gray-600">{idea.description}</p>
            {idea.materials_needed && idea.materials_needed.length > 0 && (
                <p><strong>Materials:</strong> {idea.materials_needed.join(', ')}</p>
            )}
            {idea.youtube_tutorial_link && (
              <a 
                href={idea.youtube_tutorial_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center mt-2 text-sm text-emerald-600 hover:text-emerald-800 hover:underline font-medium"
              >
                Watch Tutorial on YouTube 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1">
                  <path fillRule="evenodd" d="M4.25 5.5a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm0 3a.75.75 0 000 1.5h5.5a.75.75 0 000-1.5h-5.5zm0 3a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5zm10.75 1.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5z" clipRule="evenodd" />
                  <path d="M14.25 3.055a.75.75 0 01.75-.75h.5a.75.75 0 01.75.75v.5c0 .414.336.75.75.75h.5a.75.75 0 01.75.75v.5a.75.75 0 01-.75.75h-.5a.75.75 0 01-.75-.75V6.31l-4.72 4.72a.75.75 0 11-1.06-1.06L14.19 5.25H12.5a.75.75 0 01-.75-.75v-.5a.75.75 0 01.75-.75h1.75z" />
                </svg>
              </a>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};

export interface ImageUploadProps {
  onUpload?: (file: File) => void; // Original prop, can be kept or adapted
  onClassificationResult: (result: WasteClassificationApiResponse) => void; // Callback for classification results
  onIdeasFetched?: (ideas: GetIdeasResponse) => void; // Optional callback for fetched ideas
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, onClassificationResult, onIdeasFetched }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); 
  const [classificationResult, setClassificationResult] = useState<WasteClassificationApiResponse | null>(null);
  const [recyclingIdeas, setRecyclingIdeas] = useState<GetIdeasResponse | null>(null);
  const [ideasError, setIdeasError] = useState<string | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (file: File | null) => {
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
      } else {
        setError('Invalid file type. Please upload an image.');
        setSelectedFile(null);
        setPreviewUrl(null);
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFile(event.target.files ? event.target.files[0] : null);
  };

  const handleDragEnter = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isDragging) setIsDragging(true); // Ensure it's set if not already
  }, [isDragging]);

  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    handleFile(event.dataTransfer.files ? event.dataTransfer.files[0] : null);
  }, []);

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    setClassificationResult(null); // Clear previous results
    setRecyclingIdeas(null); // Clear previous ideas
    setIdeasError(null); // Clear previous ideas error
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset file input
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      setIsLoading(true);
      setError(null);
      setClassificationResult(null);
      setRecyclingIdeas(null); // Clear previous ideas
      setIdeasError(null); // Clear previous ideas error

      const formData = new FormData();
      formData.append('image_file', selectedFile); // Ensure key matches FastAPI endpoint's expected file name

      brain.classify_waste_image(formData as any) // 'as any' for FormData, brain client should handle typing
        .then(async (response) => {
          if (!response.ok) {
            let errorDetail = `API Error: ${response.status} ${response.statusText}`;
            try {
              // Attempt to parse more specific error from backend response
              const errorData = await response.json(); 
              errorDetail = errorData.detail || errorData.error || (typeof errorData === 'string' ? errorData : JSON.stringify(errorData));
            } catch (e) {
              // If parsing error response fails, use the status text
              console.warn('Could not parse error response:', e);
            }
            throw new Error(errorDetail);
          }
          return response.json();
        })
        .then((data: WasteClassificationApiResponse) => {
          setClassificationResult(data);
          onClassificationResult(data); // Pass result to parent component
          if (data.error) {
            setError(`Classification Error: ${data.error}`);
            setIsLoading(false); // Stop loading if classification itself errors
          } else {
            // Successfully classified, now fetch ideas
            if (data.material_type) {
              brain.get_recycling_ideas({ material_type: data.material_type })
                .then(async (ideasResponse) => {
                  if (!ideasResponse.ok) {
                    let ideasErrorDetail = `API Error: ${ideasResponse.status} ${ideasResponse.statusText}`;
                    try {
                      const errorData = await ideasResponse.json();
                      ideasErrorDetail = errorData.detail || errorData.error || JSON.stringify(errorData);
                    } catch (e) { /* Keep default */ }
                    throw new Error(ideasErrorDetail);
                  }
                  return ideasResponse.json();
                })
                .then((ideasData: GetIdeasResponse) => {
                  setRecyclingIdeas(ideasData);
                  if (onIdeasFetched) onIdeasFetched(ideasData);
                  if (ideasData.message && ideasData.ideas.length === 0) {
                    // Handle message for no ideas, not necessarily a hard error
                    setIdeasError(ideasData.message); 
                  }
                })
                .catch((err) => {
                  console.error("Error fetching recycling ideas:", err);
                  setIdeasError(err.message || 'Failed to fetch recycling ideas.');
                })
                .finally(() => {
                  setIsLoading(false); // Final loading stop
                });
            } else {
              // No material type from classification, so can't fetch ideas
              setIdeasError("Material type not determined, cannot fetch ideas.");
              setIsLoading(false);
            }
          }
        })
        .catch((err) => {
          console.error("Error during waste classification call:", err);
          setError(err.message || 'An unexpected error occurred during classification.');
          setClassificationResult(null); // Clear any partial/error results
          setIsLoading(false); // Ensure loading stops on classification error
        });
        // .finally(() => { // Original finally moved into specific paths
        //   setIsLoading(false);
        // });
    }
  };
  
  // TODO: Implement camera capture functionality
  const handleCameraClick = () => {
    console.warn('Camera functionality not yet implemented.');
    setError('Camera functionality is planned for a future update.');
  };

  return (
    <Card className="w-full max-w-lg mx-auto rounded-2xl shadow-xl border-emerald-200 bg-gradient-to-br from-lime-50 via-green-50 to-emerald-50 p-2 sm:p-4">
      <CardContent className="p-4 sm:p-6">
        <div 
          className={`flex flex-col items-center justify-center p-6 sm:p-10 border-2 border-dashed rounded-xl transition-all duration-300 ease-in-out cursor-pointer 
            ${isDragging ? 'border-emerald-500 bg-emerald-100/70 scale-105' : 'border-green-300 hover:border-emerald-400 hover:bg-green-100/50'}
            ${previewUrl ? 'h-auto' : 'h-64'}`}
          onClick={!previewUrl ? handleBrowseClick : undefined} // Only allow click to browse if no preview
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          {previewUrl && selectedFile ? (
            <div className="relative text-center w-full">
              <img 
                src={previewUrl} 
                alt={selectedFile.name} 
                className="max-h-72 w-auto object-contain rounded-lg shadow-md mx-auto mb-4" 
              />
              <button 
                onClick={handleRemoveImage} 
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                aria-label="Remove image"
              >
                <XCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <p className="text-sm text-gray-600 truncate mt-1">{selectedFile.name}</p>
            </div>
          ) : (
            <div className="text-center space-y-3">
              <UploadCloudIcon className="w-16 h-16 text-emerald-500 mx-auto" />
              <p className="text-lg font-semibold text-green-700">Drag & drop your waste image here</p>
              <p className="text-sm text-gray-500">or</p>
              <Button variant="outline" size="sm" onClick={handleBrowseClick} className="bg-white border-emerald-400 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700 rounded-full">
                Browse Files
              </Button>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm text-red-600 bg-red-100 p-3 rounded-lg text-center">{error}</p>
        )}

        {/* Display Classification Result */}
        {classificationResult && (
          <Card className="mt-6 rounded-lg shadow-md bg-white border-emerald-200">
            <CardHeader>
              <CardTitle className="text-emerald-700 text-lg">Classification Result</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2 pt-4">
              {classificationResult.error ? (
                <p className='text-red-600 font-medium'>Error: {classificationResult.error}</p>
              ) : (
                <>
                  <p><strong>Material Type:</strong> {classificationResult.material_type || 'N/A'}</p>
                  <p>
                    <strong>Confidence:</strong> 
                    {classificationResult.confidence_score !== null && typeof classificationResult.confidence_score === 'number' 
                      ? (classificationResult.confidence_score * 100).toFixed(1) + '%'
                      : 'N/A'}
                  </p>
                  <p><strong>Details:</strong> {classificationResult.details || 'N/A'}</p>
                </>
              )}
              {classificationResult.raw_ai_response && (
                <details className='mt-2 text-xs text-gray-500'>
                  <summary className="cursor-pointer hover:text-gray-700">Show Raw AI Response</summary>
                  <pre className='mt-1 p-2 bg-gray-50 rounded whitespace-pre-wrap break-all max-h-40 overflow-auto'>{classificationResult.raw_ai_response}</pre>
                </details>
              )}
            </CardContent>
          </Card>
        )}

        {/* Display Recycling Ideas */}
        {!isLoading && ideasError && (
          <p className="mt-4 text-sm text-orange-600 bg-orange-100 p-3 rounded-lg text-center">{ideasError}</p>
        )}
        {!isLoading && recyclingIdeas && recyclingIdeas.ideas && recyclingIdeas.ideas.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-emerald-700 mb-3">Recycling & Reuse Ideas for {recyclingIdeas.material_type}</h3>
            <div className="space-y-4">
              {recyclingIdeas.ideas.map((idea: RecyclingIdeaModel) => (
                <IdeaCard key={idea.id} idea={idea} />
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            onClick={handleCameraClick} 
            variant="outline" 
            className="w-full sm:w-auto flex-1 sm:flex-initial items-center justify-center text-emerald-600 border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-sm hover:shadow-md"
          >
            <CameraIcon className="w-5 h-5 mr-2"/> Use Camera
          </Button>
          <Button 
            onClick={handleUploadClick} 
            disabled={!selectedFile || isLoading} 
            className="w-full sm:w-auto flex-1 sm:flex-initial bg-emerald-500 hover:bg-emerald-600 text-white rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? 'Uploading...' : 'Upload Image'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
