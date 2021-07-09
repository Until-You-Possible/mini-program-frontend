

class Matrix {
  m;
  constructor (matrix) {
    this.m = matrix;
  }

  get rowNum () {
    return this.m.length;
  }

  get colsNum () {
    return this.m[0].length;
  }

  each (cb) {
    for (let j = 0; j < this.colsNum; j++) {
      for (let i = 0; i < this.rowNum; i++) {
        const element = this.m[i][j];
        cb(element, i, j);
      }
    }
  }
  // numpy
  transpose () {
    const desArr = [];
    for (let j = 0; j < this.colsNum; j++) {
      desArr[j] = [];
      for (let i = 0; i < this.rowNum; i++) {
        desArr[j][i] = this.m[i][j];
      }
    }
    return desArr;
  }

}

export {
  Matrix
}