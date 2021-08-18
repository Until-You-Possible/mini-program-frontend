Component({
  /**
   * 组件的属性列表
   */
  properties: {
      categories: Array,
      bannerImg: String
  },

  /**
   * 组件的初始数据
   */
  data: {},

  observers: {
      'categories': function (t) {
          console.log(t)
      }
  },

  /**
   * 组件的方法列表
   */
  methods: {
      onTapGridItem(event) {
          const id = event.detail.key
          this.triggerEvent('itemtap', {
              cid: id
          })
      }
  }
})
