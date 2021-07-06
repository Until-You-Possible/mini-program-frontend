import { Http } from "../../utils/http";


export class Spu {
  static  getDeail (id)  {
    return Http.request({
      url: `spu/id/${id}/detail`
    })
  }
}