import { CellStatus } from "../../core/enum";
import { Joiner } from "../../utils/joiner";
import { Cell } from "./cell";
import { SkuCode } from "./sku-code";
import { SkuPending } from "./sku-pending";

class Judger  {
  fenceGroup;
  pathDict = [];
  skuPending;
  constructor (fenceGroup) {
    this.fenceGroup = fenceGroup;
    this.initPathDict();
    this._initPending();
  }
  initPathDict () {
    this.fenceGroup.spu.sku_list.forEach(s => {
      const skuCode = new SkuCode(s.code);
      this.pathDict = this.pathDict.concat(skuCode.totalSegments);
    });
  }

  _initPending () {
    this.skuPending  = new SkuPending();
  }

  judge (cell, x, y) { 
    this._changeCurrentCellStatus(cell, x, y);
    this.fenceGroup.eachCell((cell, x, y) => {
      const path = this._findPotenialPath(cell, x, y);
      if (!path) {
        return;
      }
      console.log("this.pathDict", this.pathDict);
      console.log("path", path);
      const isIn = this._isInDict(path);
      if (isIn) {
        if (cell.status === CellStatus.SELECTED) {
          return;
        }
        this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
      } else {
        this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN;
      }
    });
  }

  _isInDict (path) {
    return this.pathDict.includes(path);
  }

  _findPotenialPath (cell, x, y) {
    const joiner = new Joiner("#");
    for (let i = 0; i < this.fenceGroup.fences.length; i++) {
      const selected = this.skuPending.findSelectedCellByX(i);
      if (x === i) {
        if (this.skuPending.isSelected(cell, x, y)) {
          return;
        }
        const cellCode = this._getCellCode(cell.spec)
        joiner.join(cellCode)
      }
      if (selected) {
        const selectedCellCode = this._getCellCode(selected.spec)
        joiner.join(selectedCellCode);
      }
    }
    return joiner.getStr();
  }
  _getCellCode (spec) {
    return spec.key_id + '-' + spec.value_id
  }

  _changeCurrentCellStatus (cell,x,y) {
    if (cell.status === CellStatus.WAITING) {
      this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED;
      this.skuPending.insertCell(cell, x);
    }
    if (cell.status === CellStatus.SELECTED) {
      this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
      this.skuPending.removeCell(x);

    }
  }
}

export {
  Judger
}