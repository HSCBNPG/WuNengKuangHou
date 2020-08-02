const App = getApp();
const $citys = require('../../utils/citys.js');
const getadd = require('../../utils/getlocation');
const cityData = $citys.data;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    issueData: [],
    acode: [110000, 110000, 110101],
    provinces: [],
    citys: [],
    countys: [],
    cityValue: [0, 0, 0],
    cityText: '请选择地址',
    isDate: true,
    isCity: true,
  },
  navigator() {
    wx.navigateBack({
      complete: (res) => { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.issueData(options.id)
    this.setData({
      cityText: App.globalData.add ? App.globalData.add : '请选择地址'
    })
    this.getLocation();
  },
  issueData(id) {
    wx.request({
      url: 'https://wdemo.applinzi.com/index/issueData?_id=' + id,
      success: (res) => {
        this.setData({
          issueData: res.data.data[0]
        })
      }
    })
  },
  /**定位当前位置 选择位置 */
  getLocation: function () {
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        that.setData({
          lat: res.latitude,
          lng: res.longitude
        });
        var getAddressUrl = "https://apis.map.qq.com/ws/geocoder/v1/?location=" + res.latitude + "," + res.longitude + "&key=VGUBZ-FPQKJ-LVQFJ-KZ3A2-45X65-3XFLO";
        wx.request({
          url: getAddressUrl,
          success: (res) => {
            if (App.globalData.address.length == 0) {
              that.setData({
                cityText: res.data.result.address_component.province + ' ' + res.data.result.address_component.city + ' ' + res.data.result.address_component.district,
              });
              getadd.city_name().then((res) => {
                that.setData({
                  citys: res.citys,
                  countys: res.countys,
                  provinces: res.provinces,
                  'acode[0]': res.code[0],
                  'acode[1]': res.code[1],
                  'acode[2]': res.code[2]
                })
              })
            } else {
              //根据code 获取选择的省市区排在第一个
              var code = App.globalData.address
              getadd.city_code(code).then((res) => {
                that.setData({
                  citys: res.citys,
                  countys: res.countys,
                  provinces: res.provinces,
                  'acode[0]': res.code[0],
                  'acode[1]': res.code[1],
                  'acode[2]': res.code[2]
                })
              })
            }
          }
        });
      },
      fail: () => {
        getadd.city_name().then((res) => {
          that.setData({
            citys: res.citys,
            countys: res.countys,
            provinces: res.provinces,
            'acode[0]': res.code[0],
            'acode[1]': res.code[1],
            'acode[2]': res.code[2],
            cityText: "北京市" + ' ' + '北京市' + ' ' + '东城区'
          })
        })
      }
    })
  },

  //调起选择器
  risePicker: function (e) {
    var that = this;
    var $mold = e.currentTarget.dataset.mold;
    if ($mold == 'city') {
      that.setData({
        isCity: false
      });
      // that.getlocation();
    }

  },
  //城市选择器
  cityChange: function (e) {
    //console.log(e);
    var val = e.detail.value
    var that = this;
    var t = this.data.cityValue;
    var citys = that.data.citys;
    var countys = that.data.countys
    var address = '';
    if (val[0] != t[0]) {
      citys = [];
      countys = [];
      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        citys.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        citys: citys,
        countys: countys,
        cityValue: [val[0], 0, 0]
      })
      address += cityData[val[0]].name + " " + cityData[val[0]].sub[0].name + " " + cityData[val[0]].sub[0].sub[0].name;
      that.data.acode[0] = cityData[val[0]].code;
      that.data.acode[1] = cityData[val[0]].sub[0].code;
      that.data.acode[2] = cityData[val[0]].sub[0].sub[0].code;
      this.setData({
        address,
        acode: that.data.acode
      })
      return;
    }
    if (val[1] != t[1]) {
      var countys = [];
      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }
      this.setData({
        countys: countys,
        cityValue: [val[0], val[1], 0]
      })
      that.data.acode[0] = cityData[val[1]].sub[0].code;
      that.data.acode[1] = cityData[val[0]].sub[val[1]].code;
      that.data.acode[2] = cityData[val[0]].sub[val[1]].sub[0].code;
      address += cityData[val[0]].name + " " + cityData[val[0]].sub[val[1]].name + " " + cityData[val[0]].sub[val[1]].sub[0].name;
      this.setData({
        address,
        acode: that.data.acode
      })
      return;
    }
    if (val[2] != t[2]) {
      this.setData({
        county: this.data.countys[val[2]],
        cityValue: val
      })
      address += cityData[val[0]].name + " " + cityData[val[0]].sub[val[1]].name + " " + cityData[val[0]].sub[val[1]].sub[val[2]].name;
      that.data.acode[0] = cityData[val[0]].code;
      that.data.acode[1] = cityData[val[0]].sub[val[1]].code;
      that.data.acode[2] = cityData[val[0]].sub[val[1]].sub[val[2]].code;
      this.setData({
        address,
        acode: that.data.acode
      })
      return;
    }


  },

  //确定选择
  ideChoice: function (e) {
    var that = this;
    //城市
    if (that.data.address == '') {
      var cityText = that.data.cityText
    } else {
      var cityText = that.data.address
    }
    that.setData({
      cityText,
    })
    that.setData({
      isCity: true,
      isDate: true,
    });
    App.globalData.address = that.data.acode;
    App.globalData.add = that.data.cityText;

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