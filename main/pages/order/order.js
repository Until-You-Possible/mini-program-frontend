import {Cart} from "../../models/cart";
import {Sku} from "../../models/sku";
import {OrderItem} from "../../models/order-item";
import {Order} from "../../models/order";
import {Coupon} from "../../models/coupon";
import {CouponBO} from "../../models/coupon-bo";
import {CouponOperate, ShoppingWay} from "../../core/enum";
import {showToast} from "../../utils/ui";
import {OrderPost} from "../../models/order-post";
import {Payment} from "../../models/payment";

const cart = new Cart()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        finalTotalPrice: 0,
        totalPrice: 0,
        discountMoney: 0,
        submitBtnDisable: false,

        address: null,

        currentCouponId: null,
        order: null,
        isOk: true,

        orderFail: false,
        orderFailMsg: '',

        shoppingWay: ShoppingWay.BUY
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let orderItems;
        let localItemCount
        const shoppingWay = options.way
        this.data.shoppingWay = shoppingWay

        if (shoppingWay === ShoppingWay.BUY) {
            const skuId = options.sku_id
            const count = options.count
            orderItems = await this.getSingleOrderItems(skuId, count)
            localItemCount = 1
        } else {
            const skuIds = cart.getCheckedSkuIds()
            orderItems = await this.getCartOrderItems(skuIds)
            localItemCount = skuIds.length
        }

        const order = new Order(orderItems, localItemCount)
        this.data.order = order

        try {
            order.checkOrderIsOk()
        } catch (e) {
            console.error(e)
            this.setData({
                isOk: false
            })
            return
        }
        const coupons = await Coupon.getMySelfWithCategory()
        const couponBOList = this.packageCouponBOList(coupons, order)
        this.setData({
            couponBOList,
            totalPrice: order.getTotalPrice(),
            finalTotalPrice: order.getTotalPrice()
        })
    },

    async onSubmit(event) {
        if (!this.data.address) {
            showToast('请选择收获地址')
            return
        }

        this.disableSubmitBtn()
        const order = this.data.order

        const orderPost = new OrderPost(
            this.data.totalPrice,
            this.data.finalTotalPrice,
            this.data.currentCouponId,
            order.getOrderSkuInfoList(),
            this.data.address
        )

        const oid = await this.postOrder(orderPost)
        if (!oid) {
            this.enableSubmitBtn()
            return
        }

        if (this.data.shoppingWay === ShoppingWay.CART) {
            cart.removeCheckedItems()
        }

        // 支付 小程序/前端 支付
        // 支付参数 调用 API

        // 支付 wx.requestPayment(params)
        // API => params

        wx.lin.showLoading({
            type: "flash",
            fullScreen: true,
            color: "#157658"
        })

        const payParams = await Payment.getPayParams(oid)

        if (!payParams) {
            return
        }

        try {
            const res = await wx.requestPayment(payParams)
            wx.redirectTo({
                url: `/pages/pay-success/pay-success?oid=${oid}`
            })
        } catch (e) {
            wx.redirectTo({
                url: `/pages/my-order/my-order?key=${1}`
            })
        }

        // wx.requestPayment()

    },

    async postOrder(orderPost) {
        try {
            const serverOrder = await Order.postOrderToServer(orderPost)
            if (serverOrder) {
                return serverOrder.id
            }
            // throwError
        } catch (e) {
            // code
            this.setData({
                orderFail: true,
                orderFailMsg: e.message
            })
        }
    },

    disableSubmitBtn() {
        this.setData({
            submitBtnDisable: true
        })
    },

    enableSubmitBtn() {
        this.setData({
            submitBtnDisable: false
        })
    },

    onChooseAddress(event) {
        const address = event.detail.address
        this.data.address = address
    },

    async getSingleOrderItems(skuId, count) {
        const skus = await Sku.getSkusByIds(skuId)
        return [new OrderItem(skus[0], count)];
    },

    async getCartOrderItems(skuIds) {
        // 同步最新的SKU数据
        const skus = await Sku.getSkusByIds(skuIds)
        const orderItems = this.packageOrderItems(skus)
        return orderItems
    },

    //Mark
    onChooseCoupon(event) {
        const couponObj = event.detail.coupon
        const couponOperate = event.detail.operate
        console.log(couponObj)
        if (couponOperate === CouponOperate.PICK) {
            this.data.currentCouponId = couponObj.id
            const priceObj = CouponBO.getFinalPrice(this.data.order, couponObj)
            this.setData({
                finalTotalPrice: priceObj.finalPrice,
                discountMoney: priceObj.discountMoney
            })
        } else {
            this.data.currentCouponId = null
            this.setData({
                finalTotalPrice: this.data.order.getTotalPrice(),
                discountMoney: 0
            })
        }

    },

    packageOrderItems(skus) {
        return skus.map(sku => {
            const count = cart.getSkuCountBySkuId(sku.id)
            return new OrderItem(sku, count)
        })
    },

    packageCouponBOList(coupons, order) {
        return coupons.map(coupon => {
            const couponBO = new CouponBO(coupon)
            couponBO.meetCondition(order)
            return couponBO
        })
    }


})