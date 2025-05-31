/** Body_classify_waste_image */
export interface BodyClassifyWasteImage {
  /**
   * Image File
   * @format binary
   */
  image_file: File;
}

/** GetIdeasResponse */
export interface GetIdeasResponse {
  /** Material Type */
  material_type: string;
  /** Ideas */
  ideas?: RecyclingIdeaModel[];
  /** Message */
  message?: string | null;
}

/** HTTPValidationError */
export interface HTTPValidationError {
  /** Detail */
  detail?: ValidationError[];
}

/** HealthResponse */
export interface HealthResponse {
  /** Status */
  status: string;
}

/** RecyclingIdeaModel */
export interface RecyclingIdeaModel {
  /** Id */
  id: string;
  /** Title */
  title: string;
  /** Description */
  description: string;
  /** Difficulty */
  difficulty: "easy" | "medium" | "hard";
  /** Materials Needed */
  materials_needed: string[];
  /** Image Url */
  image_url: string;
  /** Youtube Tutorial Link */
  youtube_tutorial_link: string;
}

/** ValidationError */
export interface ValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** WasteClassificationApiResponse */
export interface WasteClassificationApiResponse {
  /**
   * Material Type
   * The classified type of waste material (e.g., plastic, paper, glass).
   */
  material_type?: string | null;
  /**
   * Confidence Score
   * The AI's confidence in the classification (0.0 to 1.0).
   */
  confidence_score?: number | null;
  /**
   * Details
   * Additional details or specific type of the material.
   */
  details?: string | null;
  /**
   * Raw Ai Response
   * The raw response from the AI for debugging or further processing.
   */
  raw_ai_response?: string | null;
  /**
   * Error
   * Error message if classification failed.
   */
  error?: string | null;
}

export type CheckHealthData = HealthResponse;

export type ClassifyWasteImageData = WasteClassificationApiResponse;

export type ClassifyWasteImageError = HTTPValidationError;

export interface GetRecyclingIdeasParams {
  /**
   * Material Type
   * The type of waste material to get ideas for (e.g., plastic, paper, glass).
   */
  material_type: string;
}

export type GetRecyclingIdeasData = GetIdeasResponse;

export type GetRecyclingIdeasError = HTTPValidationError;
