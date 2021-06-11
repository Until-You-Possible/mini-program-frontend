
import { config } from "../pages/config/config";

class Http {
  static request(dataObject) {
    wx.request({
      url: `${config.apiBaseUrl}${dataObject.url}`,
      data: dataObject.data,
      method: dataObject.method || "GET",
      header: {
        appkey: config.appkey
      },
      success: (res) => {
        dataObject.callback(res.data)
      }
    })
  }
}

export {
  Http
}