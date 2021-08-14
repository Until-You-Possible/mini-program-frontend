import { Http } from "../utils/http";

export class Banner {
  static locationB = 'b-1';
  static locationG = 'b-2';
  static async getHomeLocationB() {
    return await Http.request({
      url: `banner/name/${Banner.locationB}`
    });
  }
  static async getHomeLocationG() {
    return await Http.request({
      url: `banner/name/${Banner.locationG}`
    });
  }
}