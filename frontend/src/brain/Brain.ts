import {
  BodyClassifyWasteImage,
  CheckHealthData,
  ClassifyWasteImageData,
  ClassifyWasteImageError,
  GetRecyclingIdeasData,
  GetRecyclingIdeasError,
  GetRecyclingIdeasParams,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Brain<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description Check health of application. Returns 200 when OK, 500 when not.
   *
   * @name check_health
   * @summary Check Health
   * @request GET:/_healthz
   */
  check_health = (params: RequestParams = {}) =>
    this.request<CheckHealthData, any>({
      path: `/_healthz`,
      method: "GET",
      ...params,
    });

  /**
   * @description Analyzes an uploaded image of waste material using OpenAI Vision and returns the classification results.
   *
   * @tags dbtn/module:waste_classifier
   * @name classify_waste_image
   * @summary Classify Waste Image
   * @request POST:/routes/classify-waste
   */
  classify_waste_image = (data: BodyClassifyWasteImage, params: RequestParams = {}) =>
    this.request<ClassifyWasteImageData, ClassifyWasteImageError>({
      path: `/routes/classify-waste`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });

  /**
   * @description Retrieves recycling and reuse ideas for a given waste material type from the database stored in Databutton storage.
   *
   * @tags dbtn/module:recycling_ideas_retriever
   * @name get_recycling_ideas
   * @summary Get Recycling Ideas
   * @request GET:/routes/get-ideas
   */
  get_recycling_ideas = (query: GetRecyclingIdeasParams, params: RequestParams = {}) =>
    this.request<GetRecyclingIdeasData, GetRecyclingIdeasError>({
      path: `/routes/get-ideas`,
      method: "GET",
      query: query,
      ...params,
    });
}
