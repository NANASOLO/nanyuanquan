//index.js
const app = getApp()
const db = wx.cloud.database()

Page({
  data: {
    curTab: 0,
    current: 0,
    imgUrls:[],
    tabList:[]
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

  xiangqingTab:function(event){
    console.log(event.currentTarget.dataset.xiangqingdata.pic)
    console.log(event.currentTarget.dataset.xiangqingdata.name)
    console.log(event.currentTarget.dataset.xiangqingdata.data)
    console.log(event.currentTarget.dataset.xiangqingdata.neirong)
    console.log(event.currentTarget.dataset.xiangqingdata.plNum)
    console.log(event.currentTarget.dataset.xiangqingdata.readNum)
    console.log(event.currentTarget.dataset.xiangqingdata.scNum)
    console.log(event.currentTarget.dataset.xiangqingdata.isPromotion)
    var xiangqingPic = event.currentTarget.dataset.xiangqingdata.pic
    var xiangqingName = event.currentTarget.dataset.xiangqingdata.name
    var xiangqingData = event.currentTarget.dataset.xiangqingdata.data
    var xiangqingNeirong = event.currentTarget.dataset.xiangqingdata.neirong
    var xiangqingPlNum = event.currentTarget.dataset.xiangqingdata.plNum
    var xiangqingReadNum = event.currentTarget.dataset.xiangqingdata.readNum
    var xiangqingScNum = event.currentTarget.dataset.xiangqingdata.scNum
    var xiangqingTupian = event.currentTarget.dataset.xiangqingdata.tupian
    var xiangqingIsPromotion = event.currentTarget.dataset.xiangqingdata.isPromotion
    wx.navigateTo({
      url: '/pages/xiangqing/xiangqing?'+"pic="+xiangqingPic+"&name="+xiangqingName+"&data="+xiangqingData+"&neirong="+xiangqingNeirong+"&plNum="+xiangqingPlNum+"&readNum="+xiangqingReadNum+"&scNum="+xiangqingScNum+"&tupian="+xiangqingTupian+"&isPromotion="+xiangqingIsPromotion
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

adddetial: function () {
 
      wx.navigateTo({
   
        url: '../fabu/fabu',
   
        success: function (res) { },
   
        fail: function (res) { },
   
        complete: function (res) { },
   
      })
   
    },
  

  onLoad: function() {
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight-177
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
    db.collection('bqpage')
    .get({
      success:function(res){
        console.log(res)
        that.setData({
          tabList:res.data[0].tabList
        })
      }
    }) 
    }

  

  

})
