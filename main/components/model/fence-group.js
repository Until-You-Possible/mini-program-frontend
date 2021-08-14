import { Fence } from "./fence";
import { Matrix } from "./matrix";


class FenceGroup {
  spu;
  fences = [];
  constructor (spu) {
    this.spu = spu;
    this.skuList = spu.sku_list;
  }

  setCellStatusById (cellId, status) {
    this.eachCell((cell) => {
      if (cell.id === cellId) {
        cell.status = status;
      }
    });
  }

  setCellStatusByXY (x, y, status) {
    this.fences[x].cells[y].status = status;
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
  }
   initFences1 () {
    const matrix = this._createMatrix(this.skuList);
    const fences= [];
    const AT = matrix.transpose();
    AT.forEach(r => {
      const fence = new Fence(r);
      fence.init();
      fences.push(fence);
    });
    this.fences =  fences;

   }
  
  _createFece (element) {
    const fence = new Fence();
    return fence;
  }
  getSku(skuCode) {
      const fullSkuCode = this.spu.id + '$' + skuCode;
      const sku = this.spu.sku_list.find(s => s.code === fullSkuCode)
      return sku ? sku : null
  }
  getDefaultSku () {
    const defaultId = this.spu.default_sku_id;
    if (!defaultId) {
      return false;
    }
    return this.skuList.find(v => v.id === defaultId);
  }

  eachCell (cb) {
    for (let i = 0; i < this.fences.length; i++) {
      for (let j = 0; j < this.fences[i].cells.length; j++) {
          const cell = this.fences[i].cells[j];
          cb(cell, i, j)
      }
  }
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