const app = getApp()
const db = wx.cloud.database()
const circle=db.collection('circle')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circle:[],
    nickname:[],
    deleteID:[],
    _id: '',
    delete: null,
    job: [],
    jobList: [],
    id: '',
    isClick: false,
    jobStorage: [],
    jobId: '',
    iftrue:true,
    
  },
  

  // 删除事件
  deleteList(e){
    // 通过点击到的index去寻找相应的商品在数据库中的记录id
       const index=e.currentTarget.dataset.index
       var circle=this.data.circle
       console.log("12345",circle)
       var good_id=circle[index]._id
      console.log('该商品的index',index)
      console.log('已找到该商品数据库记录id',good_id)
      getApp().globalData.index= e.currentTarget.dataset.index
    
    // 然后通过查询记录id删除掉数据库中的这条记录
       db.collection('circle').doc(good_id).remove({
        success: function(res) {
          console.log('成功删除')
          wx.showToast({
            title: '删除成功',
            icon:'success',
            duration:1500,
          }) 
        }
      })
      },

  bindInput(e){
        this.setData({
          commentContent:e.detail.value
        })
      },
      bindFocus(e){
        this.setData({
          heightBottom:e.detail.height
        })
      },
    
      clickcomment(e){
        this.setData({
          currentCircleIndex:e.currentTarget.dataset.index,
          showCommentAdd:true,
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
      url: '/pages/xiangqing2/xiangqing2?'+"categor="+xiangqingCategor+"&content="+xiangqingContent+"&images="+xiangqingImages+"&nickName="+xiangqingNickName+"&time="+xiangqingTime+"&avatarUrl="+xiangqingAvatarUrl
    })

   },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.getStorage({
      key:'userInfo',
      success(res){
        that.setData({
          nickname:res.data.nickName
        })
        var nickname=res.data.nickName
        console.log('获取昵称成功',res.data.nickName)
        db.collection('circle').where({
          nickName:nickname
        })
        .get({
          success:function(res){
            console.log('获取发布数据成功',res.data)
            if (res.data.length > 0) {
              for (var i = 0; i < res.data.length; i++) {
                res.data[i].time = that.js_date_time(res.data[i].time);}}
            that.setData({
              circle:res.data,
              deleteID:res.data[0]._id,
              time:res.data[0].time
            })
            console.log('测试是否存到了这个页面',res.data)
            getApp().globalData.deleteID=res.data[0]._id
           /*  console.log('测试是否存到了这个页面',res.data[0]._id) */
          }
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
        // 页面渲染完成
  // 监听数据库中的数据有无变更
  circle.watch({
    // 变更，写一个函数去更新数据
    onChange:this.onChange.bind(this), 
    // 更新失败，报错
    onError(err){
      console.error(数据更新失败)
    }
  })
  },
  // 自写的变更函数
  onChange(snapshot){
    // 数据有发生改变之后，先打印出数据结果快照进行查看
    console.log('数据变更快照',snapshot)
    // 快照中的type如果是init表示是初次渲染，也就是数据没有发生改变
    // 快照中的type如果是undefined表示不是初次渲染，也就是数据发生改变了，也就是用户有做出删除这个动作
    if(snapshot.type==='init'){
    // 用户没有删除,数据没有改变,不需要做什么
    }
    else{
      // 用户删除了某个数据,数据发生了改变
      
      // 先给这个页面的购物车数据赋个值
      const circle=[...this.data.circle]
      console.log('测试',this.data.circle)

      // for循环快照中的docChanges,也就是变更的数据
      for(const docChange of snapshot.docChanges){
        // 查询docChange里的queueType
        switch(docChange.queueType){
          // dequeue表示是记录离开了列表,也就是类型是删除
          case'dequeue':
          // 将删除的该条数据从购物车数组里移除
          circle.splice(getApp().globalData.index,1)
          console.log('删除的数据是',snapshot.docChanges[0].doc)
          break // 结束
        }
      }
    //  最后把这个新的购物车的数组赋予给页面
      this.setData({
        circle:circle
      })
    }
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