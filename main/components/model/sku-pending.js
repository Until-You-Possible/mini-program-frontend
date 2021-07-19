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