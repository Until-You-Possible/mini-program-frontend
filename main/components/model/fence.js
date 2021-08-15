import { Cell } from "./cell";


class Fence {
  cells = [];
  specs;
  id;
  title;

  constructor (specs) {
    this.specs = specs;
    this.title = specs[0].key;
    this.id = specs[0].key_id;
  }
  init () {
    this._initCells();
  }
  setFenceSketch(skuList) {
    this.cells.forEach(c=>{
        this._setCellSkuImg(c, skuList)
    })
}
  _initCells () {
    this.specs.forEach(s => {
      const exsited = this.cells.some(c => c.id === s.value_id);
      if (exsited) {
        return;
      }
      const cell = new Cell(s);
      this.cells.push(cell);
    });
  }
}
export {
  Fence
}