

class HistoryKeyword {
  static MAX_ITEM_COUNT = 20;
  static KEY = "keywords"
  keyword = [];
  get () {
    return this.keyword;
  }
  constructor () {
    if (HistoryKeyword.instance === "object") {
      return HistoryKeyword.instance;
    }
    this.keyword = this._getLocalKeywords();
    HistoryKeyword.instance = this;
    return this;
  }
  save (keyword) {
    const item = this.keyword.filter(v => v === keyword);
    if (item.length !== 0 ) {
      return;
    }
    if (item.length >= HistoryKeyword.MAX_ITEM_COUNT) {
      this.keyword.pop();
    }
    this.keyword.unshift(keyword);
    this._refreshLocal();
  }
  clear () {
    this.keyword = [];
    this._refreshLocal();
  }
  _refreshLocal () {
    wx.setStorageSync(HistoryKeyword.KEY, this.keyword);
  }
  _getLocalKeywords () {
    const results =  wx.getStorageSync(HistoryKeyword.KEY);
    if (!results) {
      wx.setStorageSync(HistoryKeyword.KEY, []);
      return [];
    }
    return results;
  }
}

export {
  HistoryKeyword
}