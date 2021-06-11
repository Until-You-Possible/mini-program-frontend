// pages/home/home.js

import { Http } from "../../utils/http.js";
import { config  } from "../config/config.js";
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
  onLoad: function (options) {
    Theme.getHomeLocationA(data => {
      this.setData({
        topTheme: data[0]
      })
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})