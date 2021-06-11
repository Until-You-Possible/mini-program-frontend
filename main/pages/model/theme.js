// theme

import { Http } from "../../utils/http";

export class Theme {
  static getHomeLocationA (callback) {
    Http.request({
      url: `theme/by/names`,
      data: {
        names: "t-1"
      },
      method: "GET",
      callback: data => {
        callback(data);
      }
    })
  }
}