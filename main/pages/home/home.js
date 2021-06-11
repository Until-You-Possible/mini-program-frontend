// pages/home/home.js


import { Theme } from "../model/theme.js";

Page({
  
  /**
   * Page initial data
   */
  data: {
    topTheme: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: async function (options) {
    const data = await Theme.getHomeLocationA();
    console.log("data", data);
    this.setData({
      topTheme: data[0]
    })
  }
})