import { Http } from "../../utils/http";

export class Category {
  static async getGridCategoryC () {
    return await Http.request({
      url: `category/all`
    });
  }
}