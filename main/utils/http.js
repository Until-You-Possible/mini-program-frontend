
import { config } from "../pages/config/config";
import {promisic} from "./utils";

class Http {
  static async request(dataObject) {
  const res =  await promisic(wx.request)({
      url      : `${config.apiBaseUrl}${dataObject.url}`,
      data     : dataObject.data,
      method   : dataObject.method || "GET",
      callback : dataObject.callback,
      header   : {
        appkey : config.appkey
      }
    });
    return res.data;
  }
}

export {
  Http
}