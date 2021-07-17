

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
    console.log("this.pending", this.pending[x]);
    return this.pending[x];
  }

}


export {
  SkuPending
}