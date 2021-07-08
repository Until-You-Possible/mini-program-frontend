// components/realm/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    spu: Object
  },

  /**
   * Component initial data
   */
  data: {

  },
  observers: {
    "spu": function (spu) {
      if (!spu) {
        return
      }
    }
  }

  /**
   * Component methods
   */
  methods: {

  }
})
