import { Spu } from "../../pages/model/spu";
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
    judger: Object,
    previewImg: String,
    title: String
  },
  observers: {
    "spu": function (spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpec(spu)) {
        this.setData({
          noSpec: true
        });
        this.bindSkuData(spu.sku_list[0]);
        return;
      }
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences1();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if (defaultSku) {
        this.bindSkuData(defaultSku);
      } else {
        this.bindSpuData();
      }
      this.bindInitData(fenceGroup);
    }
  },

  /**
   * Component methods
   */
  methods: {
    bindSpuData () {
      const spu = this.properties.previewImg;
      if (spu) {
        this.setData({
          previewImg: spu.img,
          title: spu.title,
          price: spu.price,
          discountPrice: spu.discount_price
        })
      }
    },
    bindSkuData (sku) {
        this.setData({
          previewImg: sku.img,
          title: sku.title,
          price: sku.price,
          discountPrice: sku.discount_price,
          stock: sku.stock
        });
    },
    bindInitData (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
        skuIntact: this.data.judger.isSkuIntact
      });
      
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
