// pages/xinsheng/xinsheng.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        list: [{
          id: 1,
          name: '芒果',
          pic:"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/huanying.jpg"
        }, {
          id: 2,
          name: '香蕉',
          pic:"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xinsheng.jpg"
        }],
        
          tabList: [{
            id: 1,
            name: "科普",
            pic:"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/kepu.png"
          },
          {
            id: 2,
            name: "问答",
            pic:"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/wenda.png"
          }
        ]
  },

  selectTab(e) {
    let index = e.target.dataset.index;
    this.setData({
      curTab: index,
      current: index
    })
  },
  swiperChange(e) {
    let index = e.detail.current;
    this.setData({
      curTab: index,
      current: index
    })
  },
  changeGoodsSwip: function (detail) {
    if (detail.detail.source == "touch") {
        //当页面卡死的时候，current的值会变成0 
        if(detail.detail.current == 0){
              //有时候这算是正常情况，所以暂定连续出现3次就是卡了
            let swiperError = this.data.swiperError
            swiperError += 1
            this.setData({swiperError: swiperError })
            if (swiperError >= 3) { //在开关被触发3次以上
                console.error(this.data.swiperError)
                this.setData({ goodsIndex: this.data.preIndex });//，重置current为正确索引
                this.setData({swiperError: 0})
            }
        }else {//正常轮播时，记录正确页码索引
            this.setData({ preIndex: detail.detail.current });
            //将开关重置为0
            this.setData({swiperError: 0})
        }
    }
  },
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight-177
        });
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