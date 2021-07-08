

class Matrix {
  m;
  constructor (matrix) {
    this.m = matrix;
  }

  get rowNum () {
    return this.m.length;
  }

  get colsNum () {
    this.m[0].length;
  }

  each (cb) {
    for (let j = 0; j < this.colsNum; j++) {
      for (let i = 0; i < this.rowNum; i++) {
        const element = this.m[j][i];
        cb(element, i, j);
      }
    }
  }

}

export {
  Matrixs
}