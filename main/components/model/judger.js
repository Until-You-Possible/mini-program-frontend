import { SkuCode } from "./sku-code";

export class Judger  {
  fenceGroup;
  pathDict = [];

  constructor (fenceGroup) {
    this.fenceGroup = fenceGroup;
    this.initPathDict();
  }
  initPathDict () {
    this.fenceGroup.spu.sku_list.forEach(s => {
      const skuCode = new SkuCode(s.code);
      this.pathDict = this.pathDict.concat(skuCode.totalSegments);
    });
    console.log("pathDict", this.pathDict);
  }

}