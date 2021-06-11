// pages/home/home.js


import { Theme } from "../model/theme.js";
import { Banner } from "../model/banner.js";
import { Category } from "../model/category.js";

Page({
  
  /**
   * Page initial data
   */
  data: {
    themeA  : null,
    bannerB : null,
    grid    : []
  },

  /**
   * Lifecycle function--Called when page load
   */
  async onLoad(options) {
    this.initAllData();
  },
  async initAllData() {
    const themeA  = await Theme.getHomeLocationA();
    const banenrB = await Banner.getHomeLocationB();
    const grid    = await Category.getGridCategory();
    this.setData({
      themeA  : themeA[0],
      bannerB : banenrB,
      grid    : grid.roots.slice(0, 5)
    })
  }
})