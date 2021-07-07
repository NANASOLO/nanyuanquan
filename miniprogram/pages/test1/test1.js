const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList:[],
    current: '',
    circle:[],
    type:''
  },

  selectTab(e) {
    let index = e.target.dataset.index;
    console.log(index)
    console.log(this.data.tabList[index].name1)
    
    this.setData({
      curTab: index,
      current: index,
      type:this.data.tabList[index].name1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('circle')
    .get()
    .then(res=>{
      console.log(res)
      that.setData({
        circle:res.data
      })
      res.data[i].time = that.date_time(res.data[i].time)

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

  date_time(unixtime){
    var date = new Date(unixtime);
    var y =date.getFullYear();
    var m =date.getMonth() + 1;
    m = m < 10 ?('0'+ m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   /* */
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