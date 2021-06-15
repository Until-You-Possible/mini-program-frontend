import { Http } from "../../utils/http";

export class Activity {
  static locationD = 'a-2';
  static async getHomeLocationD() {
    return await Http.request({
      url: `activity/name/${Activity.locationD}`
    })
  }
}