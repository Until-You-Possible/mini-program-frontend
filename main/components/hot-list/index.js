// components/hot-list/index.js
import { Banner } from "../../pages/model/banner";
Component({
  /**
   * Component properties
   */
  properties: {
    banner: Object
  },

  observers: {
    "banner" : function (banner) {
      if (!banner) return;
      if (!banner.items.length) return;
      const left        = banner.items.find(i=> i.name ==='left');
      const rightTop    = banner.items.find(i=> i.name ==='right-top');
      const rightBottom = banner.items.find(i=> i.name ==='right-bottom');
      this.setData({
        left,
        rightTop,
        rightBottom
      })
    }
  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
    onGotToTheme(event) {
      const tName = event.currentTarget.dataset.tname
      console.log(tName)
      wx.navigateTo({
          url: `/pages/theme/theme?tname=${tName}`
      })
  },

  onGotoDetail(event) {
      const keyword = event.currentTarget.dataset.keyword
      const type = event.currentTarget.dataset.type
      Banner.gotoTarget(type, keyword)
  }
  }
})
