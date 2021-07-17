import { FenceGroup } from "../model/fence-group";
import { Judger } from "../model/judger";

// components/realm/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    spu: Object,
    x: Number
  },

  /**
   * Component initial data
   */
  data: {
    judger: Object
  },
  observers: {
    "spu": function (spu) {
      if (!spu) {
        return
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences1();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
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
    },
    onCellTap (event) {
      const cell = event.detail.cell;
      const x = event.detail.x;
      const y = event.detail.y;
      const  judger = this.data.judger;
      judger.judge(cell, x, y);
      this.setData({
        fences: judger.fenceGroup.fences
      })
    }
  }
})
