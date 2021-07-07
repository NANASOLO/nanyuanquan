const app = getApp()
const circle = wx.cloud.database()
const db = wx.cloud.database()
const shouchang=db.collection('shouchang')
const comments=db.collection('comments')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    good_id:[],
    userInfo:{},
    comments:[],
    categor:'',
    Content:'',
    images:'',
    nickName:'',
    time:'',
    avatarUrl:'',
    heightBottom:'',
    currentCircleIndex:-1,
    showCommentAdd:false,
    commentContent:'',
    job: [],
    jobList: [],
    id: '',
    isClick: false,
    jobStorage: [],
    jobId: '',
    circle:[],
    pinglun:[],
    kapianname:{},
    pingnickName:{},
  },

  haveSave(e) {
    var that=this
    if(wx.getStorageSync('userInfo')){
      console.log('在') 
      // this.getUserProfile()
      wx.getStorage({
        key:'userInfo',
        success(res){
          var userInfo=res.data
          var nickname=userInfo.nickName
          var gouwuche_cartlist=[]
          var gouwuche_cartlist_content=[]
          db.collection('shouchang').get().then(res=>{
            for(let i=0;i<res.data.length;i++){
              // for循环该购物车数据集
              if(res.data[i].nickName==nickname){
              // 判断是否是该nickname用户
                gouwuche_cartlist.push(res.data[i])
              // 该用户商品信息
                gouwuche_cartlist_content.push(res.data[i].circle.content)
              // 该用户的购物车商品记录id
              }
            }
            console.log('点击加入购物车查看该用户的数据信息',gouwuche_cartlist)
            console.log('查看该用户收藏的内容',gouwuche_cartlist_content)
            
            var this_good_content=that.data.Content
            // 这个页面的商品id
            var contents=gouwuche_cartlist_content
            // 该用户购物车数据库里的商品id组
            if(contents.indexOf(that.data.Content)<0){
            // 判断是否购物车数据库已存在该商品，如果没存在，直接把该条商品的信息加入数据库里，如下：
            console.log('该用户还没添加过该商品')
            db.collection('shouchang').add({
              data:{
                nickName:userInfo.nickName,
                circle: getApp().globalData.circle,
                num:1,
                amount:500
              }
            }).then(res => {
              console.log(res)
              console.log('保存信息和昵称到收藏数据库：',res)
            })

            wx.getStorage({
              key: 'isClick',
              success(res){
              console.log('缓存调用',res.data)
              that.setData({
              isClick:res.data,
              })
              console.log('测试',that.data.isClick)
            }
            })

            if (that.data.isClick == false) {
              wx.showToast({
                title: '收藏成功',
                icon:'success',
                duration:1500,
              }) 
             }
             wx.setStorage({
              key: 'isClick',
              data: true,
              success: function(res){
                that.setData({
                  isClick:that.data.isClick,
                  isClick:true
                })
                console.log("缓存成功",that.data.isClick);
                }
              })

            } else{
              //如果已经存在，找到这条商品的记录，在里面的数目上面加一，如下：
              console.log('该用户已经添加过该商品了')
              // 下面是确定在购物车数据库里这条商品的一个记录id，也就是_id
               for(let i=0;i<gouwuche_cartlist.length;i++){
               // for循环该用户加购的商品
                if(gouwuche_cartlist[i].circle.content==this_good_content){
                // 根据商品的id找到这条数据
                var _id=gouwuche_cartlist[i]._id                   
                    var now_shumu=gouwuche_cartlist[i].num
                    console.log("该商品的记录id",_id)
                    console.log("该商品当前的数目",now_shumu)
                        // 然后通过查询记录id删除掉数据库中的这条记录
                db.collection('shouchang').doc(_id).remove({
                success: function(res) {
                 console.log('收藏')
                  wx.showToast({
                   title: '取消收藏成功',
                     icon:'success',
                      duration:1500,
                 })
                 
                 wx.setStorage({
                  key: 'isClick',
                  data: false,
                  success: function(res){
                    that.setData({
                      isClick:that.data.isClick,
                      isClick:false
                    })
                    console.log("缓存成功",that.data.isClick);
                    }
                  })
                }
               })
  
              }                
              }    
              
            }
          
            })
          
        }
        
      })
     
      }
      else{
        console.log('不在')
        this.getUserProfile()
        
      }
    },
  
    getUserProfile(e){
      wx.getUserProfile({
        desc: '获取用户信息',
        success: (res) => {
          console.log(res, '成功回调')
          // 存储key的data
           wx.setStorage({
                 key:"userInfo",
                 data:res.userInfo,   
                   })
            
          wx.showToast({
            title: '登陆成功',
            icon:'success',
            duration:2000
          })
        console.log(res) 
            this.data.nickName=res.userInfo.nickName,
            console.log("成功将昵称赋值到this.data中 ：" + this.data)            
           
        },
        fail(res){
          console.log('登录失败')
        },
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    db.collection('circle')
    .get({
      success:function(res){
        console.log(res)
        that.setData({
          circle:res.data.circle
        })
      }
    }) ;
  
    wx.getStorage({
      key: 'isClick',
      success(res){
      console.log('缓存调用',res.data)
      that.setData({
      isClick:res.data,
      })
      console.log('测试',that.data.isClick)
    }
    })
  
    var that=this;
    var NickName=options.nickName
    console.log("var",NickName)
    console.log('options=',options)
    this.setData({
      circle:options,
      Categor:options.categor,//标签
      Content:options.content,
      Images:options.images,
      NickName:options.nickName,
      Time:options.time,
      AvatarUrl:options.avatarUrl,
      kapianname:options.nickName,
      Icon:options.icon,
      Iconn:options.iconn,
      Click:options.click
    }) 
    getApp().globalData.circle=options
    console.log('全局变量',getApp().globalData.circle)

    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight-700
        });
      }
    }) 
    
    db.collection('comments').where({
      kapianname:NickName,
      content:that.data.Content
    })
  
    .get({
      success: function(res) {
        console.log('获取实时发送数据成功',res.data)
        if (res.data.length > 0) {
          for (var i = 0; i < res.data.length; i++) {
          res.data[i].time = that.js_date_time(res.data[i].time);}}
        that.setData({
          pinglun:res.data,
          time:res.data[0].time
          
        })
        console.log('存实时评论成功',that.data.pinglun)
      }
    })
   
  },
 

  formSubmit(e) {
    var that = this
    if(wx.getStorageSync('userInfo')){
      console.log('在') 
      // this.getUserProfile()
      wx.getStorage({
        key:'userInfo',
        success(res){
          var userInfo=res.data
          that.setData({
            userInfo:res.data
          })

          console.log('form发生了submit事件，携带数据为：',e.detail.value)
            that.setData({
              comments:e.detail.value.comments
            })
            console.log('存评论到这个页面成功'+e.detail.value.comments)
          
          db.collection('comments').add({
            data:{
              avatarUrl:userInfo.avatarUrl,
              pingnickName:userInfo.nickName,
              userInfo:userInfo,
              _id:guid(),
              comments:e.detail.value.comments,
              kapianname:that.data.kapianname,
              content:that.data.Content,
              time:new Date()
            }
          }).then(res => {
            console.log('保存数据到数据库',res)
            
          })
          
          wx.showToast({
            title: '发送成功',
            icon:'success',
            duration:1500,
          })
        }  
      })
     
      

      }
      else{
        console.log('不在')
        this.getUserProfile()
        
      }
      },
   

      getUserProfile(e){
        wx.getUserProfile({
          desc: '获取用户信息',
          success: (res) => {
            console.log(res, '成功回调')
            // 存储key的data
             wx.setStorage({
                   key:"userInfo",
                   data:res.userInfo,   
                     })
              
            wx.showToast({
              title: '登陆成功',
              icon:'success',
              duration:1500
            })
          console.log(res)
              this.data.avatarUrl=res.userInfo.avatarUrl,
              this.data.nickName=res.userInfo.nickName,
              this.data.userInfo=res.userInfo
              console.log("成功赋值到this.data中 ：" + this.data)
          
             
          },
          fail(res){
            console.log('data')
          },
        })
          },
  
       
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
    comments.watch({
      onChange:this.onChange.bind(this),
      onError(err){
        console.error(数据更新失败)
      }
    })
  },

  onChange(snapshot){
    var that=this
    console.log('数据变更快照',snapshot)
    if(snapshot.type==='init'){

    }
    else{
      const pinglun=[...this.data.pinglun]
     

      // for循环快照中的docChanges,也就是变更的数据
      for(const docChange of snapshot.docChanges){
        // 查询docChange里的queueType
        switch(docChange.queueType){
          // dequeue表示是记录离开了列表,也就是类型是删除
          case'enqueue':
          // 将删除的该条数据从购物车数组里移除
          pinglun.push(docChange.doc)
          console.log('发送的评论是',docChange.doc)
          break // 结束
        }
      }
    

      if (pinglun.length > 0) {
        for (var i = 0; i < pinglun.length; i++) {
        pinglun[i].time = this.js_date_time(pinglun[i].time );}}
      that.setData({
        pinglun:pinglun,
        time:pinglun[0].time
        
      })
      console.log('新的评论数据组',pinglun)
    }
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
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this
   
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

//用于生成uuid
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
function guid() {
  return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}