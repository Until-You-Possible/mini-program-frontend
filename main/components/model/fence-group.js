import { Matrixs } from "./matrix";


class FenceGroup {

  spu;
  constructor () {
    this.spu = spu;
    this.skuList = spu.sku_list;
  }

  initFences () {
    const matrix = this._createMatrix(this.skuList);
    matrix.each((element, j, i) => {

    });
  }
  
  _createMatrix (skuList) {
    const m = [];
    skuList.forEach(sku => {
      m.push(sku.specs);
    });
    return new Matrixs(m);

  }
  



}


export {
  FenceGroup
}