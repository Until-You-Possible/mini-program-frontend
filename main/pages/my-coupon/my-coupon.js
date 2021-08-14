// pages/my-coupon/my-coupon.js
import {Coupon} from "../../models/coupon";
import {CouponStatus} from "../../core/enum";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey:CouponStatus.AVAILABLE
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        this.change(CouponStatus.AVAILABLE)
    },

    async change(status) {
        const coupons = await Coupon.getMyCoupons(status)
        this.setData({
            coupons,
            status
        });
    },

    onSegmentChange(event) {
        console.log(event)
        this.change(event.detail.activeKey)
    }

})