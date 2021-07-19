import { Http } from "../../utils/http";


export class Spu {


  static isNoSpec (spu) {
    if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
      return true;
    }
    return false;
  }

  static  getDeail (id)  {
    return Http.request({
      url: `spu/id/${id}/detail`
    })
  }
}