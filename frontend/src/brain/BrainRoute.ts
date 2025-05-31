import {
  BodyClassifyWasteImage,
  CheckHealthData,
  ClassifyWasteImageData,
  GetRecyclingIdeasData,
} from "./data-contracts";

export namespace Brain {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  export namespace check_health {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CheckHealthData;
  }

  /**
   * @description Analyzes an uploaded image of waste material using OpenAI Vision and returns the classification results.
   * @tags dbtn/module:waste_classifier
   * @name classify_waste_image
   * @summary Classify Waste Image
   * @request POST:/routes/classify-waste
   */
  export namespace classify_waste_image {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = BodyClassifyWasteImage;
    export type RequestHeaders = {};
    export type ResponseBody = ClassifyWasteImageData;
  }

  /**
   * @description Retrieves recycling and reuse ideas for a given waste material type from the database stored in Databutton storage.
   * @tags dbtn/module:recycling_ideas_retriever
   * @name get_recycling_ideas
   * @summary Get Recycling Ideas
   * @request GET:/routes/get-ideas
   */
  export namespace get_recycling_ideas {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Material Type
       * The type of waste material to get ideas for (e.g., plastic, paper, glass).
       */
      material_type: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRecyclingIdeasData;
  }
}
