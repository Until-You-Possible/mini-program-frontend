// pages/pay-success/pay-success.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        oid:null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.data.oid = options.oid
        // wx.lin.showStatusShow({
        //     type: 'success'
        // })
    },

    onGotoOrderDetail(event) {
        wx.redirectTo({
            url:`/pages/order-detail/order-detail?oid=${this.data.oid}`
        })
    }

})