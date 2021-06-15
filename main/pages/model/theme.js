// theme

import { Http } from "../../utils/http";

export class Theme {

  static locationA = "t-1";
  static locationB = "t-2";
  static locationC = "t-3";
  static locationD = "t-4";
  static async getThemes () {
  const names = `${Theme.locationA},${Theme.locationB},${Theme.locationC},${Theme.locationD}`;
    return await Http.request({
      url: `theme/by/names`,
      data: {
        names
      }
    });
  }
}