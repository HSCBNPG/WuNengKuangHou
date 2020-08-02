// pages/Glife/Glife.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        LifeData: []
    },
    showModal(e) {
        this.setData({
            modalName: e.currentTarget.dataset.target
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    ViewImage(e) {
        wx.previewImage({
            urls: [e.currentTarget.dataset.img],
            current: e.currentTarget.dataset.img
        })
    },
    FromUp() {
        wx.showModal({
            content: "闭上你的嘴吧啊! 宝~~~..还真有意见的啊,出门客服点击",
            confirmText: "我知道了",
            cancelText: "我知道了",
            complete: () => {
                wx.showToast({
                    title: '真乖',
                    icon: "none"
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.myLifeData();
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
    myLifeData() {
        wx.request({
            url: 'https://wdemo.applinzi.com/index/MygoodLife',
            success: (res) => {
                this.setData({
                    LifeData: res.data.data
                })
            }
        })
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