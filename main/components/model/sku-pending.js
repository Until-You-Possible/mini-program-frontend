

class SkuPending {

  pending = [];
  constructor () {

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