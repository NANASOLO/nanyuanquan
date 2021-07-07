// pages/renzhen3/renzhen3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xingming:'',
    xuehao:'',
    xibie:'',
    zhuanye:'',
    array: ['商学院', '会计学院', '电气与计算机工程学院', '外国语学院','文学与创媒学院','健康与护理学院','公共管理学院','艺术设计与创意产业系','音乐学系','达人书院'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var xingming=options.xingming;
    // var xuehao=options.xuehao;
    // var xibie=options.xibie;
    // var zhuanye=options.zhuanye;


    this.setData({
      xingming:options.xingming,
      xuehao:options.xuehao,
      xibie:options.xibie,
      zhuanye:options.zhuanye
    })
    console.log(options)
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
    wx.reLaunch({
      url: '/pages/wode/wode'
    })
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