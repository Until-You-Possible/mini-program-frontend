import { ShoppingWay } from "../../core/enum";
import { Spu } from "../../model/spu";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    spu: null,
    showRealm: false,
    cartItemCount: 999,
    orderWay: "Cart"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const id = options.pid;
    const spu = await Spu.getDeail(id);
    this.setData({
      spu
    })
  },
  onGotoHome () {
    wx.switchTab({
      url: '/pages/home/home'
    });
  },
  onGotoCart() {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    });
  },
  onBuy () {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.BUY
    });
  },
  onAddToCart () {
    this.setData({
      showRealm: true,
      orderWay: ShoppingWay.CART
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})