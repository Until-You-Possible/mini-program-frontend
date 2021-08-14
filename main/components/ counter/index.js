import { Cart } from "../../model/cart";

// components/ counter/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    count: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
    },
    max: {
      type: Number,
      value: Cart.SKU_MAX_COUNT
    },
    min: {
      type: Number,
      value: Cart.SKU_MIN_COUNT
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
    onOverStep (event) {
      const minOrMaxOut = event.detail.type
      if (minOrMaxOut === 'overflow_max') {
          wx.showToast({
              icon: "none",
              duration: 3000,
              title: `超出最大购买数量`
          })
      }
      if (minOrMaxOut === 'overflow_min') {
          wx.showToast({
              icon: "none",
              duration: 3000,
              title: `最少需要购买${Cart.SKU_MIN_COUNT}件噢`
          })
      }
    }
  }
})
