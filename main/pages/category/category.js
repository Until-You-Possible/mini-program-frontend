import { Categories } from "../../model/categories";
import { getWindowHeightRpx } from "../../utils/system";

// pages/category/category.js
Page({

  /**
   * Page initial data
   */
  data: {
    segHeight: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    this.initCategoryData();
    const result = await getWindowHeightRpx()
    const      h =  result - 60 -20 - 2;
    this.setData({
      segHeight: h
    })
    console.log("results", result);
  },
  async initCategoryData () {
    const categories = new Categories();
    this.data.categories = categories
    await categories.getAll()
    const roots = categories.getRoots()
    const defaultRoot = this.getDefaultRoot(roots)
    const currentSubs = categories.getSubs(defaultRoot.id)
    this.setData({
        roots,
        currentSubs,
        currentBannerImg: defaultRoot.img
    })
  },
  getDefaultRoot(roots) {
      let defaultRoot = roots.find(r => r.id === this.data.defaultRootId)
      if (!defaultRoot) {
          defaultRoot = roots[0]
      }
      return defaultRoot
  },
  onGotoSearch(event) {
      wx.navigateTo({
          url: `/pages/search/search`
      })
  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})