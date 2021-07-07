//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    curTab: 1,
    current: 0,
    imgUrls:[],
    zdList:[],
    circleTozu:[],
    biaoqian:"考试"
  },

  
  selectTab:function(event) {
    const self=this;
    getApp().globalData.fabutozd_id=event.currentTarget.dataset.item.id
    getApp().globalData.fabutozd_biaoqian=event.currentTarget.dataset.item.name1
    console.log(getApp().globalData.fabutozd_id)
    console.log(getApp().globalData.fabutozd_biaoqian)
    this.setData({
     curTab:event.currentTarget.dataset.item.id,
     id:event.currentTarget.dataset.item.id,
     biaoqian:event.currentTarget.dataset.item.name1,
     isScroll:true
    })
    console.log('测试',this.data.biaoqian)
    setTimeout(function () {
      self.setData({
        curTab:event.currentTarget.dataset.item.id,
        id:event.currentTarget.dataset.item.id,
        biaoqian:event.currentTarget.dataset.item.name1
      })
    }, 0)

    setTimeout(function () {
      self.setData({
        isScroll: false
      })
    }, 1)

  },
  swiperChange(event) {
    getApp().globalData.fabutozd_id=event.currentTarget.dataset.item.id
    getApp().globalData.fabutozd_biaoqian=event.currentTarget.dataset.item.name1
    console.log(getApp().globalData.fabutozd_id)
    console.log(getApp().globalData.fabutozd_biaoqian)
    this.setData({
     curTab:event.currentTarget.dataset.item.id,
     id:event.currentTarget.dataset.item.id,
     biaoqian:event.currentTarget.dataset.item.name1
    })
    console.log('测试',this.data.biaoqian)
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
      url: '/pages/xiangqing2/xiangqing2?'+"categor="+xiangqingCategor+"&content="+xiangqingContent+"&images="+xiangqingImages+"&nickName="+xiangqingNickName+"&time="+xiangqingTime+"&avatarUrl="+xiangqingAvatarUrl
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

  onLoad: function() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight-60
        });
      }
    })
    

    var that = this
    db.collection('swiper')
    .get({
      success:function(res){
        console.log(res)
        that.setData({
          imgUrls:res.data[0].imgUrls
        })
      }
    }) 
   
    db.collection('zdpage')
    .get({
      success:function(res){
        console.log(res)
        that.setData({
           zdList:res.data[0].zdList
         })
        
      }
    })
    },
    onShow:function(){
      var that = this
      db.collection('circleTozd')
    .get({
      success:function(res){
        console.log(res)
        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
            res.data[i].time = that.js_date_time(res.data[i].time);}}
        that.setData({
          circleTozd:res.data
         })
        
      }
    })
    this.setData({
      curTab:getApp().globalData.fabutozd_id,
      id:getApp().globalData.fabutozd_id,
      biaoqian:getApp().globalData.fabutozd_biaoqian
     
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

})
