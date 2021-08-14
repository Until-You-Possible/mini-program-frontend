// pages/order-detail/order-detail.js
import {Order} from "../../models/order";
import {OrderDetail} from "../../models/order-detail";
import {Payment} from "../../models/payment";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        oid: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const oid = options.oid
        this.data.oid = oid
        const order = await Order.getDetail(oid)
        const detail = new OrderDetail(order)
        this.setData({
            order: detail
        })
    },

    async onPay(event) {
        const oid = this.data.oid
        if (!oid) {
            // this.enableSubmitBtn()
            return
        }
        wx.lin.showLoading({
            type: "flash",
            fullScreen: true,
            color: "#157658"
        })
        const payParams = await Payment.getPayParams(oid)
        // let payStatus = OrderStatus.UNPAID
        let res
        try {
            res = await wx.requestPayment(payParams)
            wx.lin.hideLoading()
            wx.navigateTo({
                url: `/pages/pay-success/pay-success?oid=${oid}`
            })
        } catch (e) {
            wx.lin.hideLoading()
        }
    },

    onPaySuccess(event) {
    }

})