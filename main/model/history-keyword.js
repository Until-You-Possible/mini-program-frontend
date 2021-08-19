

class HistoryKeyword {
  static MAX_ITEM_COUNT = 20;
  static KEY = "keywords";
  keywords = [];
  get () {
    return this.keywords;
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
    const items = this.keywords.filter(v => v === keyword);
    if (items.length !== 0 ) {
      return;
    }
    if (items.length >= HistoryKeyword.MAX_ITEM_COUNT) {
      this.keywords.pop();
    }
    this.keywords.unshift(keyword);
    this._refreshLocal();
  }
  clear () {
    this.keywords = [];
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