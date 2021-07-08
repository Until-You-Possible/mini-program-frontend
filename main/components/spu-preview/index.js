// components/spu-preivew/index.js

Component({
  properties: {
      data: Object
  },

  data: {
      tags: Array
  },

  observers: {
      data: function (data) {
  
          if (!data) {
              return
          }
          if (!data.tags) {
              return
          }
          const tags = data.tags.split('$')
          this.setData({
              tags
          })
      }
  },

  methods: {
      onImgLoad(event) {
          const {width, height} = event.detail
          this.setData({
              w: 340,
              h: 340 * height/width
          })
      },
      onItemTap(event){
          const pid = event.currentTarget.dataset.pid
          wx.navigateTo({
              url:`/pages/detail/detail?pid=${pid}`
          })
      }
  }
})
