import { FenceGroup } from "../model/fence-group";
import { Judger } from "../model/judger";

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
      fenceGroup.initFences1();
      const judger = new Judger(fenceGroup);
      this.bindInitData(fenceGroup);
    }
  },

  /**
   * Component methods
   */
  methods: {
    bindInitData (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    }
  }
})
