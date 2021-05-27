// pages/xiangqing/xiangqing.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
   //授权登录
  //  login: function () {
  //   var that = this;
  //   // 查看是否授权
  //   wx.getSetting({
  //     success(res) {
  //       if (res.authSetting['scope.userInfo']) {
  //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
  //         wx.getUserInfo({
  //           success: function (res) {
  //             console.log(res.userInfo),
  //               that.setData({
  //                 nickName: res.userInfo.nickName,
  //                 avatarUrl: res.userInfo.avatarUrl,
  //                 gender: res.userInfo.gender
  //               })
  //           }
  //         })

  //       }
  //     }
  //   })
  // },
  // bindGotUserInfo: function (e) {
  //   console.log(e.detail.errMsg)
  //   console.log(e.detail.userInfo)
  //   console.log(e.detail.rawData)
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('options=',options)
    this.setData({
      data:options.data,
      name:options.name,
      pic:options.pic,
      neirong:options.neirong,
      plNum:options.plNum,
      readNum:options.readNum,
      scNum:options.scNum,
      tupian:options.tupian,
      isPromotion:options.isPromotion
    }),
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
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
