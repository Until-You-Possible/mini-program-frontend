// components/tab-bar/index.js
Component({
  /**
   * Component properties
   */
  properties: {

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
    onGoToHome(event){
      this.triggerEvent('gotohome',{
      })
    },

    onGoToCart(event){
      this.triggerEvent('gotocart')
    },

    onAddToCart(event){
      this.triggerEvent('addtocart')
    },

    onBuy(event){
      this.triggerEvent('buy')
    }
  }
})
