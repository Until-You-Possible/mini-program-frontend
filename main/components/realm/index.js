import { Spu } from "../../model/spu";
import { FenceGroup } from "../model/fence-group";
import { Judger } from "../model/judger";

// components/realm/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    spu: Object,
    x: Number,
    currentSkuCount: Number
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
        this.processNoSpec(spu);
      } else {
        this.processHasSpec(spu);
      }

    }
  },

  /**
   * Component methods
   */
  methods: {
    processNoSpec (spu) {
      this.setData({
        noSpec: true
      });
      this.bindSkuData(spu.sku_list[0]);
      return;
    },
    setStockStatus(stock, currentCount) {
      console.log("fff", this.isOutOfStock(stock, currentCount));
        this.setData({
            outStock: this.isOutOfStock(stock, currentCount)
        });
    },
    isOutOfStock (stock, currentStock) {
      return stock < currentStock;
    },
    processHasSpec (spu) {
      const fenceGroup = new FenceGroup(spu);
      fenceGroup.initFences1();
      const judger = new Judger(fenceGroup);
      this.data.judger = judger;
      const defaultSku = fenceGroup.getDefaultSku();
      if (defaultSku) {
        this.bindSkuData(defaultSku);
        this.setStockStatus(defaultSku.stock, this.data.currentSkuCount);
      } else {
        this.bindSpuData();
      }
      this.bindInitData(fenceGroup);
    },
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
      if (!sku) {
        return false;
      }
        this.setData({
          previewImg: sku.img,
          title: sku.title,
          price: sku.price,
          discountPrice: sku.discount_price,
          stock: 5
          // stock: sku.stock
        });
    },
    bindInitData (fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
        skuIntact: this.data.judger.isSkuIntact
      });
      
    },
    bindTipData() {
      this.setData({
          skuIntact: this.data.judger.isSkuIntact(),
          currentValues: this.data.judger.getCurrentValues(),
          missingKeys: this.data.judger.getMissingKeys()
      })
  },
  bindFenceGroupData(fenceGroup) {
      this.setData({
          fences: fenceGroup.fences,
      })
  },
  onSelectCount (event) {
    this.currentSkuCount  = event.detail.count;
    if (event.detail.count > 5) {
      this.setData({
        outStock: true
      });
    } else {
      this.setData({
        outStock: false
      });
    }
  },
    onCellTap (event) {
      const cell = event.detail.cell;
      const x = event.detail.x;
      const y = event.detail.y;
      const  judger = this.data.judger;
      judger.judge(cell, x, y);
      this.setData({
        fences: judger.fenceGroup.fences
      });
      const skuIntact = judger.isSkuIntact();
      if (!skuIntact) {
          const currentSku = judger.getDeterminateSku();
          this.bindSkuData(currentSku)
          this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
      }
      this.bindTipData()
      this.bindFenceGroupData(judger.fenceGroup)
      // this.triggerSpecEvent();
    }
  }
})
