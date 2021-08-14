import { Joiner } from "../../utils/joiner";
import { Cell } from "./cell";
import { SkuCode } from "./sku-code";


class SkuPending {
  size;
  pending = [];
  constructor (size) {
    this.size = size;
  }

  init (sku) {
    this.size = sku.specs.length;
    for (let i = 0; i < sku.specs.length; i++) {
      const cell = new Cell(sku.specs[i]);
      this.insertCell(cell, i);
    }
  }

  getCurrentSpecValues() {
      const values = this.pending.map(cell => {
          return cell ? cell.spec.value : null
      })
      return values
  }
  getSkuCode() {
      const joiner = new Joiner('#');
      console.log("this.pending", this.pending);
      this.pending.forEach(cell => {
        if (cell) {
          const cellCode = cell.getCellCode()
          joiner.join(cellCode)
        }
      })
      return joiner.getStr()
  }

  getMissingSpecKeysIndex() {
      const keysIndex = []
      for (let i = 0; i < this.size; i++) {
          if(!this.pending[i]){
              keysIndex.push(i)
          }
      }
      return keysIndex
  }

  isIntact () {
    if (this.size !== this.pending.length) {
      return false;
    }
    for (let i = 0; i < this.size;i++) {
      if (this.isEmptyPart(i)) {
        return false;
      }
    }
  }
  isEmptyPart (index) {
    return !this.pending[index]
  }

  insertCell (cell, x) {
    this.pending[x] = cell;
    console.log("cell", cell);
  }

  removeCell (x) {
    this.pending[x] = null;
  }

  findSelectedCellByX (x) {
    return this.pending[x];
  }
  isSelected (cell, x, y) {
    const pendingCell = this.pending[x];
    if (!pendingCell) {
      return;
    }
    return cell.id === pendingCell.id;

  }

}


export {
  SkuPending
}