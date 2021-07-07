// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    nickName:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var that = this
    if(wx.getStorageSync('userInfo')){
      console.log('在')
      console.log(this.data.userInfo)
      wx.getStorage({
        key:"userInfo",
        success(res){
          console.log(res.data)
          that.setData({
            userInfo:res.data,
            canIUseGetUserProfile:false,
            hasUserInfo:true
          })
        }  
      })
    }
    else {(wx.getUserProfile) 
      this.setData({
        canIUseGetUserProfile: true
      })
    }

  },
  getUserProfile(e) {
    var that = this
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    // 检查缓存是否存在 userinfo
    if(wx.getStorageSync('userInfo')){
      console.log('在')
      console.log(this.data.userInfo)
      wx.getStorage({
        key:"userInfo",
        success(res){
          console.log(res.data)
          that.setData({
            userInfo:res.data,
            canIUseGetUserProfile:false,
            hasUserInfo:true
          })
        }  
      })
    }
    else{ 
      console.log('不在')
      wx.getUserProfile({
        desc: '用于完善会员资料', 
        success: (res) => {
       
          wx.setStorage({
            key:"userInfo",
            data:res.userInfo,
          
          })
          wx.showToast({
            title: '登录成功',
            icon:'success',
            duration:1000
          })

          this.setData({
            userInfo: res.userInfo,
            nickName:res.userInfo.nickName,
            hasUserInfo: true
          })
        }
      })
     
     
    }
   
    },

  fatiao:function(){
      wx.navigateTo({
        url: '/pages/wofabu/wofabu'
      })
    },
    shoutiao:function(){
      wx.navigateTo({
        url: '/pages/woshouc/woshouc'
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

