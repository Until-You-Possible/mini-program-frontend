// pages/home/home.js


import { Theme } from "../model/theme.js";
import { Banner } from "../model/banner.js";
import { Category } from "../model/category.js";
import { Activity } from "../model/activity.js";

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
    const themes   = await Theme.getThemes();
    const themeA   = themes.filter(v => v.name === 't-1');
    const banenrB  = await Banner.getHomeLocationB();
    const grid     = await Category.getGridCategory();
    const activity = await Activity.getHomeLocationD();
    this.setData({
      themeA   : themeA,
      bannerB  : banenrB,
      grid     : grid.roots.slice(0, 5),
      activity : activity
    })
  }
})