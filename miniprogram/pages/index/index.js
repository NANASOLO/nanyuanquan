//index.js
const app = getApp()
const db = wx.cloud.database()
const circle1=db.collection('shouchang')
const circle = wx.cloud.database()
var systemInfo = wx.getSystemInfoSync()

Page({
  data: {
    curTab: 1,
    imgUrls:[],
    tabList:[],
    isShow: false, //是否已经弹出
    animMain: {}, //旋转动画
    animAdd: {}, //item位移,透明度
    animDelLots: {}, 
    circle:[],
    categor:'',
    content:'',
    images:'',
    nickName:'',
    time:'',
    avatarUrl:'',
    job: [],
    jobList: [],
    id: '',
    isClick: false,
    jobStorage: [],
    jobId: '',
    good_detail:[],
    userInfo:{},
    nickName:"",
    biaoqian:"学习",
    
    
  },

  
  swiperChange(event) {
    getApp().globalData.fabu_id=event.currentTarget.dataset.item.id
    getApp().globalData.fabu_biaoqian=event.currentTarget.dataset.item.name1
    console.log(getApp().globalData.fabu_id)
    console.log(getApp().globalData.fabu_biaoqian)
    this.setData({
     curTab:event.currentTarget.dataset.item.id,
     id:event.currentTarget.dataset.item.id,
     biaoqian:event.currentTarget.dataset.item.name1
    })
    console.log('测试',this.data.biaoqian)
  },

  selectTab:function(event) {
    const self=this;
    getApp().globalData.fabu_id=event.currentTarget.dataset.item.id
    getApp().globalData.fabu_biaoqian=event.currentTarget.dataset.item.name1
    console.log(getApp().globalData.fabu_id)
    console.log(getApp().globalData.fabu_biaoqian)
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


  xiangqing2Tab:function(event){ 
    console.log(event.currentTarget.dataset.xiangqingdata2.avatarUrl)
    console.log(event.currentTarget.dataset.xiangqingdata2.categor)
    console.log(event.currentTarget.dataset.xiangqingdata2.content)
    console.log(event.currentTarget.dataset.xiangqingdata2.images)
    console.log(event.currentTarget.dataset.xiangqingdata2.nickName)
    console.log(event.currentTarget.dataset.xiangqingdata2.time)
    console.log(event.currentTarget.dataset.xiangqingdata2.click)
    console.log(event.currentTarget.dataset.xiangqingdata2.icon)
    console.log(event.currentTarget.dataset.xiangqingdata2.iconn)
    var xiangqingAvatarUrl = event.currentTarget.dataset.xiangqingdata2.avatarUrl
    var xiangqingCategor = event.currentTarget.dataset.xiangqingdata2.categor
    var xiangqingContent = event.currentTarget.dataset.xiangqingdata2.content
    var xiangqingImages = event.currentTarget.dataset.xiangqingdata2.images
    var xiangqingNickName = event.currentTarget.dataset.xiangqingdata2.nickName
    var xiangqingTime = event.currentTarget.dataset.xiangqingdata2.time
    var xiangqingClick = event.currentTarget.dataset.xiangqingdata2.click
    var xiangqingIcon = event.currentTarget.dataset.xiangqingdata2.icon
    var xiangqingIconn = event.currentTarget.dataset.xiangqingdata2.iconn
    wx.navigateTo({
      url: '/pages/xiangqing2/xiangqing2?'+"categor="+xiangqingCategor+"&content="+xiangqingContent+"&images="+xiangqingImages+"&nickName="+xiangqingNickName+"&time="+xiangqingTime+"&avatarUrl="+xiangqingAvatarUrl+"&click="+xiangqingClick+"&icon="+xiangqingIcon+"&iconn="+xiangqingIconn
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
   
    
    },

    

    showOrHide: function() {
      if (this.data.isShow) {
        //缩回动画
        this.takeback();
        this.setData({
          isShow: false
        })
      } else {
        //弹出动画
        this.popp();
        this.setData({
          isShow: true
        })
      }
    },
     add: function() {
      this.triggerEvent("addEvent")
      this.showOrHide()
    },
    deleteLots: function() {
      wx.navigateTo({
        url: '../fabu/fabu',
      })
      this.triggerEvent("deleteLotsEvent")
      this.showOrHide()
    },
    fabuToxs:function(){
     wx.navigateTo({
       url: '../fabuToxs/fabuToxs',
     })
     this.triggerEvent("deleteLotsEvent")
     this.showOrHide()
    },
    fabuTozd:function(){
      wx.navigateTo({
        url: '../fabuTozd/fabuTozu',
      })
      this.triggerEvent("deleteLotsEvent")
      this.showOrHide()
     },    
  //弹出动画
    popp: function() {
      //main按钮顺时针旋转
      var animationMain = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationDelLots = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationAdd = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animationMain.rotateZ(0).step();
      animationDelLots.translate(0, -140 / 750 * systemInfo.windowWidth).rotateZ(0).opacity(1).step();
      animationAdd.translate(0, -280 / 750 * systemInfo.windowWidth).rotateZ(0).opacity(1).step();
      this.setData({
        animMain: animationMain.export(),
        animDelLots: animationDelLots.export(),
        animAdd: animationAdd.export(),
      })
    },
    //收回动画
    takeback: function() {
      //main按钮逆时针旋转
      var animationMain = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationDelLots = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationAdd = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animationMain.rotateZ(0).step();
      animationDelLots.translate(0, 0).rotateZ(0).opacity(0).step();
      animationAdd.translate(0, 0).rotateZ(0).opacity(0).step();
      this.setData({
        animMain: animationMain.export(),
        animDelLots: animationDelLots.export(),
        animAdd: animationAdd.export(),
      })
    },
    onShow:function(){
      var that = this
      db.collection('circle')
      .get({
        success:function(res){
          console.log('内容',res)
          if (res.data.length > 0) {
            for (var i = 0; i < res.data.length; i++) {
              res.data[i].time = that.js_date_time(res.data[i].time);}}
          that.setData({
            circle:res.data,
            categor:res.data[0].categor,
            content:res.data[0].content,
            images:res.data[0].images,
            nickName:res.data[0].nickName,
            time:res.data[0].time,
            click:res.data[0].click
          })
          getApp().globalData.circle=res.data
          console.log('啊')
        }
      }) 

      this.setData({
        curTab:getApp().globalData.fabu_id,
        id:getApp().globalData.fabu_id,
        biaoqian:getApp().globalData.fabu_biaoqian
       
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
