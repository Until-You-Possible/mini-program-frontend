// pages/home/home.js


import { Theme } from "../model/theme.js";
import { Banner } from "../model/banner.js";

Page({
  
  /**
   * Page initial data
   */
  data: {
    themeA  : null,
    bannerB : null
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
    console.log("banenrB", banenrB);
    this.setData({
      themeA  : themeA[0],
      bannerB : banenrB
    })
  }
})