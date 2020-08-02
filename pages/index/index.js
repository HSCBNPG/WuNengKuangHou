Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [
      "/images/run2.jpg","/images/run3.jpg","/images/run.jpg",  "/images/run1.jpg","/images/o.jpg", "/images/f.jpg", "/images/ts.jpg", "/images/fw.jpg",
    ],
    issue: [],
    functionData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    wx.request({
      url: 'https://wdemo.applinzi.com/index/issue',
      success:(res)=>{
        for(var item of res.data.data){
          if(item.title_head == 1){
            this.data.issue.push(item)
          }else{
            this.data.functionData.push(item)
          }
        }
        this.setData({
          issue:this.data.issue,
          functionData: this.data.functionData
        })
      }
    })
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
    var that = this;
    wx.showLoading();
    setTimeout(() => {
      that.onLoad();
      wx.stopPullDownRefresh({
        complete: (res) => {},
      });
      wx.hideLoading({
        complete: (res) => {},
      })
    }, 1000);
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