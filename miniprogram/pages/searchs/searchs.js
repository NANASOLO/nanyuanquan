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
      for (var index in this.data.tabList) {
        var num = this.data.tabList[index].neirong.indexOf(searchtext);
        let temp = 'tabList[' + index + '].status';
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
    tabList: [
    {
    "id":0,
    "name1":"全部",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xue1.jpg",
    "name":"抱树UB",
    "data":"16分钟前",
    "neirong":"请问学校的市场营销插本怎么样？谢谢。",
    "readNum":108,
    "plNum":92,
    "scNum":7,
    "status": 0
  },
  {
    "id":0,
    "name1":"全部",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xue2.jpg",
    "name":"小苹果",
    "data":"40分钟前",
    "neirong":"艺创系的吴建老师的互动设计课程怎么样？听别人说挂科率挺高的，是真的吗？",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0
  },
    {
    "id":0,
    "name1":"全部", 
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xue3.jpg",
    "name":"HEINA",
    "data":"1小时前",
    "neirong":"请问医检专业大四还需要上课吗？还是实习一年？",
    "readNum":98,
    "plNum":3,
    "scNum":2,
    "status": 0},
  {
    "id":1,
    "name1":"学习",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xue1.jpg",
    "name":"抱树UB",
    "data":"16分钟前",
    "neirong":"请问学校的市场营销插本怎么样？谢谢。",
    "readNum":108,
    "plNum":92,
    "scNum":7,
    "status": 0},
    {"id":1,
    "name1":"学习",
      "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xue2.jpg",
    "name":"小苹果",
    "data":"40分钟前",
    "neirong":"艺创系的吴建老师的互动设计课程怎么样？听别人说挂科率挺高的，是真的吗？",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0},
    {"id":1,
    "name1":"学习",
      "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xue3.jpg",
    "name":"HEINA",
    "data":"1小时前",
    "neirong":"请问医检专业大四还需要上课吗？还是实习一年？",
    "readNum":98,
    "plNum":3,
    "scNum":2,
    "status": 0},
    {
    
    "id":2,
    "name1":"考试信息",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/kao1.jpg",
    "name":"KJHL",
    "data":"3分钟前",
    "neirong":"请问我们学校五月份有开设计算机二级的考点吗？",
    "readNum":98,
    "plNum":3,
    "bqlist":2,
    "status": 0},
    {
    "id":2,
    "name1":"考试信息",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/kao2.jpg",
    "name":"FJJO",
    "data":"3小时前",
    "neirong":"想打听一下我们学校六级允许刷分吗？",
    "readNum":98,
    "plNum":3,
    "scNum":2,
    "status": 0},
    {
    "id":3,
    "name1":"闲置租借",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xian1.jpg",
    "name":"ZSRZ",
    "data":"40分钟前",
    "neirong":"出书，基本全新，微信：TTingone",
    "readNum":129,
    "plNum":23,
   "scNum":6,
    "status": 0},
    {
      "id":3,
    "name1":"闲置租借",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xian2.jpg",
    "name":"XGGH",
    "data":"56分钟前",
    "neirong":"有没有同学出二手小冰箱，预算100多，+v：NANA1212",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0},
    {
      "id":3,
    "name1":"闲置租借",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xian3.jpg",
    "name":"FRDH",
    "data":"2小时前",
    "neirong":"出全新考研资料。需要的朋友加我v：serpo02",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0
  },
  {
    "id":4,
    "name1":"找资源",
   "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/zhao1.jpg",
    "name":"NFSG",
    "data":"1小时前",
    "neirong":"有无朋友有四六级网课资源出售的？联系：everyday",
    "readNum":98,
    "plNum":3,
    "scNum":2,
    "status": 0},
    {"id":4,
    "name1":"找资源",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/zhao2.jpg",
    "name":"VGMV",
    "data":"1小时前",
    "neirong":"寻找生物的教资学习电子资料，请加我微信：WWime-",
    "readNum":98,
    "plNum":3,
    "scNum":2,
    "status": 0
  },
  {
    "id":5,
    "name1":"生活",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/shen1.jpg",
    "name":"MFRD",
    "data":"40分钟前",
    "neirong":"今天在1教302丢了一个惠普鼠标，请捡到的朋友联系我微信xuhuinala，谢谢~",
    "tupian":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/shen1n.png",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0},
    {"id":5,
    "name1":"生活",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/shen2.jpg",
    "name":"MFGD",
    "data":"40分钟前",
    "neirong":"请问图书馆二楼清馆时被收走的书在哪里?",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0
  },
  {
    "id":6,
    "name1":"毕业",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/bi1.jpg",
    "name":"DFDB",
    "data":"6分钟前",
    "neirong":"有小姐妹可以接毕业时化妆和拍照修图一条龙服务的吗？+v：happyla88",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0},
    {"id":6,
    "name1":"毕业",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/bi2.jpg",
    "name":"FGDB",
    "data":"55分钟前",
    "neirong":"打听我们学校毕业典礼时公众号会出各个院系的时间吗？",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0
  },
  {
    "id":7,
    "name1":"其它",
    "pic":"cloud://text-3gs63jh3073eb50d.7465-text-3gs63jh3073eb50d-1305876548/images/xue2.jpg",
    "name":"小苹果",
    "data":"40分钟前",
    "neirong":"艺创系的吴建老师的互动设计课程怎么样？听别人说挂科率挺高的，是真的吗？",
    "readNum":129,
    "plNum":23,
    "scNum":6,
    "status": 0
  },
]},


xiangqingTab:function(event){
  console.log(event.currentTarget.dataset.xiangqingdata.pic)
  console.log(event.currentTarget.dataset.xiangqingdata.name)
  console.log(event.currentTarget.dataset.xiangqingdata.data)
  console.log(event.currentTarget.dataset.xiangqingdata.neirong)
  console.log(event.currentTarget.dataset.xiangqingdata.plNum)
  console.log(event.currentTarget.dataset.xiangqingdata.readNum)
  console.log(event.currentTarget.dataset.xiangqingdata.scNum)
  var xiangqingPic = event.currentTarget.dataset.xiangqingdata.pic
  var xiangqingName = event.currentTarget.dataset.xiangqingdata.name
  var xiangqingData = event.currentTarget.dataset.xiangqingdata.data
  var xiangqingNeirong = event.currentTarget.dataset.xiangqingdata.neirong
  var xiangqingPlNum = event.currentTarget.dataset.xiangqingdata.plNum
  var xiangqingReadNum = event.currentTarget.dataset.xiangqingdata.readNum
  var xiangqingScNum = event.currentTarget.dataset.xiangqingdata.scNum
  var xiangqingTupian = event.currentTarget.dataset.xiangqingdata.tupian
  wx.navigateTo({
    url: '/pages/xiangqing/xiangqing?'+"pic="+xiangqingPic+"&name="+xiangqingName+"&data="+xiangqingData+"&neirong="+xiangqingNeirong+"&plNum="+xiangqingPlNum+"&readNum="+xiangqingReadNum+"&scNum="+xiangqingScNum+"&tupian="+xiangqingTupian
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
      for (var index in this.data.tabList) {
        let temp = 'tabList[' + index + '].status';
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
  }
})