const app = getApp()
const db = wx.cloud.database()
Page({
  //清除历史记录
  cleanhistory: function(e) {
    this.setData({
      history: false, //隐藏历史记录
      historyArray: [], //清空历史记录数组
      newArray: [],
      shoopingtext: "" //清空搜索框
    })
  },
  //搜索
  search: function(e) {
    var searchtext = this.data.shoopingtext; //搜索框的值
    var sss = true;

    if (searchtext != "") {
      //将搜索框的值赋给历史数组
      this.data.historyArray.push(searchtext);
      //模糊查询 循环查询数组中的title字段
      for (var index in this.data.circleToxs) {
        var num = this.data.circleToxs[index].content.indexOf(searchtext);
        let temp = 'circleToxs[' + index + '].status';
        if (num != -1) { //不匹配的不显示
          this.setData({
            [temp]: 1,
          })
          sss = false //隐藏未找到提示
        }
      }
      
      this.setData({
        history: false, //隐藏历史记录
        noneview: sss, //隐藏未找到提示
        shoppinglist: true, //显示商品列表
        newArray: this.data.historyArray //给新历史记录数组赋值
      })
    } else {
      this.setData({
        noneview: true, //显示未找到提示
        shoppinglist: false, //隐藏商品列表
        history: false, //隐藏历史记录
      })
    }

  },
  
  data: {
    shoopingtext: "", //搜索框的值
    history: false, //显示历史记录
    noneview: false, //显示未找到提示
    shoppinglist: false, //显示商品列表
    historyArray: [], //历史记录数组,
    newArray: [], //添加历史记录数组
    circle:[],
    circleToxs:[],
    circleTozd:[],
    tabList: []
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


  //搜索框的值
  shoppinginput: function(e) {
    //当删除input的值为空时
    if (e.detail.value == "") {
      this.setData({
        history: true, //显示历史记录
        shoppinglist: false //隐藏商品列表
      });
      //所有商品列表的状态改为0
     
      for (var index in this.data.circleToxs) {
        let temp = 'circleToxs[' + index + '].status';
        this.setData({
          [temp]: 0,
        })
      }
   
    }
    this.setData({
      shoopingtext: e.detail.value
    })
  },
  //点击历史记录赋值给搜索框
  textfz: function(e) {
    this.setData({
      shoopingtext: e.target.dataset.text
    })
  },

  onLoad:function(){
    var that = this
  db.collection('circleToxs')
  .get({
    success:function(res){
      console.log(res)
      if (res.data.length > 0) {
        for (var i = 0; i < res.data.length; i++) {
        res.data[i].time = that.js_date_time(res.data[i].time);}}
      that.setData({
        circleToxs:res.data,
        time:res.data[0].time
        
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
  }

})