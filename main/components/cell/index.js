// components/cell/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    cell: Object,
    x: Number,
    y: Number
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
    onTap (event) {
      this.triggerEvent("cellTap", {
        cell: this.properties.cell,
        y: this.properties.y,
        x: this.properties.x
      }, {
        bubbles: true,
        composed: true
      });
    }
  }
})
