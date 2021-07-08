import { FenceGroup } from "../model/fence-group";

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
      const fenceGroup = new FenceGroup(spu);
      console.log("fenceGroup", fenceGroup);
      fenceGroup.initFences();
    }
  },

  /**
   * Component methods
   */
  methods: {

  }
})
