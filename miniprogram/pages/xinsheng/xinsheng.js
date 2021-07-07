// pages/xinsheng/xinsheng.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curTab: 0,
    current: 0,
    circleToxs:[],
    tabList: [{
            id: 1,
            name: "科普",
            picture:"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/kepu.png",
            detail:[{
              id:1,
              text:'军训注意事项',
              banner:'cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/zysx.jpg',
              detailphoto:'cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/kpxiangqing1.jpg',
              "Promotion":"ture"
            },{
              id:2,
              text:'新生交通指引',
              banner:'cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/jtzy.jpg',
              detailphoto:'cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/kpxiangqing2.jpg',
              "Promotion":"ture"
            },{
              id:3,
              text:'新生报到须知',
              banner:'cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/bdxz.jpg',
              detailphoto:'cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/kpxiangqing3.jpg',
              "Promotion":"ture"
            }]
          },
          {
            id: 2,
            name: "问答",
            picture:"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/wenda.png",
            "detail":[{
            "isPromotion":"ture"}]
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

  xiangqingTab: function(event) {
    console.log(event.currentTarget.dataset.id.detailphoto)
    var kepu_detailphoto = event.currentTarget.dataset.id.detailphoto

    wx.navigateTo({
      url: '../kepudetail/kepudetail?'+"detailphoto="+kepu_detailphoto
    })
  },
   xiangqing2Tab:function(event){ 
    console.log(event.currentTarget.dataset.xiangqingdata2.avatarUrl)
    console.log(event.currentTarget.dataset.xiangqingdata2.categor)
    console.log(event.currentTarget.dataset.xiangqingdata2.content)
    console.log(event.currentTarget.dataset.xiangqingdata2.images)
    console.log(event.currentTarget.dataset.xiangqingdata2.nickName)
    console.log(event.currentTarget.dataset.xiangqingdata2.time)
    var xiangqingAvatarUrl = event.currentTarget.dataset.xiangqingdata2.avatarUrl
    var xiangqingCategor = event.currentTarget.dataset.xiangqingdata2.categor
    var xiangqingContent = event.currentTarget.dataset.xiangqingdata2.content
    var xiangqingImages = event.currentTarget.dataset.xiangqingdata2.images
    var xiangqingNickName = event.currentTarget.dataset.xiangqingdata2.nickName
    var xiangqingTime = event.currentTarget.dataset.xiangqingdata2.time
    wx.navigateTo({
      url: '/pages/xiangqing1/xiangqing1?'+"categor="+xiangqingCategor+"&content="+xiangqingContent+"&images="+xiangqingImages+"&nickName="+xiangqingNickName+"&time="+xiangqingTime+"&avatarUrl="+xiangqingAvatarUrl
    })

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
  onShow:function(){
    var that = this
    db.collection('circleToxs')
  .get({
    success:function(res){
      console.log(res)
      if (res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].time = that.js_date_time(res.data[i].time);}}
      that.setData({
        circleToxs:res.data
       })
      
    }
  })
  },

  js_date_time(unixtime) {
    var date = new Date(unixtime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return m + '-' + d + ' ' + h + ':' + minute + ':' + second; //年月日时分秒
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