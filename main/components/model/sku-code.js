import { combination } from "../../utils/utils";

export class SkuCode {
  code;
  spuId;
  // 当前sku所有的路径总和
  totalSegments = [];
  constructor (code) {
    this.code = code;
    this._splitToSegments();
  }

  _splitToSegments () {
    const spuAndSpec = this.code.split("$");
    this.spuId = spuAndSpec[0];
    const specCodeArray = spuAndSpec[1].split("#");
    const length = spuAndSpec.length;
    for (let i = 1; i <= length; i++) {
      const segments = combination(specCodeArray, i);
      const newSegments =  segments.map(s => {
        return s.join("#");
      });
      this.totalSegments = this.totalSegments.concat(newSegments);
    }


  }

}