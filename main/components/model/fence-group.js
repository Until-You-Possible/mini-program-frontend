import { Fence } from "./fence";
import { Matrix } from "./matrix";


class FenceGroup {
  spu;
  constructor (spu) {
    this.spu = spu;
    this.skuList = spu.sku_list;
  }
  initFences () {
    const matrix = this._createMatrix(this.skuList);
    let currentJ = -1;
    const fences= [];
    matrix.each((element, j, i) => {
      if (currentJ !== j) {
        // 开启新的一列
        currentJ = j;
        fences[currentJ] = this._createFece(element);
      }
      fences[currentJ].pushValueTitle(element.value);
    });
    console.log("fences", fences);
  }
  _createFece (element) {
    const fence = new Fence();
    return fence;
  }
  
  _createMatrix (skuList) {
    const m = [];
    skuList.forEach(sku => {
      m.push(sku.specs);
    });
    return new Matrix(m);

  }
  
}

export {
  FenceGroup
}