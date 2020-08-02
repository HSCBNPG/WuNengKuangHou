//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    moduleData: [{
      title: "用户定位(自定义三级城市联动)",
      desc: "在用户购物选择收货地址,如果不定位当前城市,则会让用户滚动去查找自己的城市花费一定的时间,用户选择收货地址,下次进行修改,应该是用户最后一次修改的城市",
      use: [{
        name: "腾讯地图定位,主要KEY关键字,当前微信小程序申请",
        key: "key : E7IBZ-2IPH4-4U5UE-DTRGK-IUCV6-REFER"
      }],
      id: 1
    },
    {
      title: "canvas写字",
      desc: "签字文件",
      use: [{
        name: "主要使用WXcanvas 下载的话也是使用微信官方自带方法"
      }],
      id: 2
    }
    ],
    address: [],
    add: ''
  },
  uselogin: function (e) {
    var that = this;
    // 登录
    return new Promise(function (reslove, reject) {
      wx.login({
        success: (resp) => {
          wx.request({
            url: 'https://wdemo.applinzi.com/index/userInfo',
            data: {
              _uname: e.detail.userInfo.nickName,
              avatar: e.detail.userInfo.avatarUrl,
              sex: e.detail.userInfo.gender,
              city: e.detail.userInfo.province + e.detail.userInfo.city,
              u_id: wx.getStorageSync('id'),
              code:resp.code
            },
            success: (res) => {
              if (res.data.code == 1) {
                wx.setStorageSync('is_login', true);
                wx.setStorageSync('userInfo', e.detail.userInfo)
                wx.setStorageSync('id', res.data.data.insertId);
                wx.showToast({
                  title: res.data.msg,
                  icon: "none"
                });
              } else {
                wx.setStorageSync('is_login', true);
                wx.setStorageSync('userInfo', e.detail.userInfo)
                wx.setStorageSync('id', res.data.data);
                wx.showToast({
                  title: res.data.msg,
                  icon: "none"
                });
              };
              reslove()
            }
          })
        }
      })
    })
  },
})