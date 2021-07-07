var that;
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    content:'',
    textLength:0,
    images:[],
    maxCount:9,
    images_upload_success:[],
    images_upload_success_size:0,
    isClickSend:false,
    tabList:[],
    current: 0,
    category:"",
    avatarUrl:{},
    nickName:{},
    userInfo:{}
  },

  selectTab(e) {
    let index = e.target.dataset.index;
    console.log(index)
    console.log(this.data.tabList[index].name1)
    
    this.setData({
      curTab: index,
      current: index,
      category:this.data.tabList[index].name1
    })
  },

  onLoad:function(options){
    that = this;
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

  bindInput(e){
    that.setData({
      content:e.detail.value,
      textLength:e.detail.value.length
    })
  },

  //选择图片
  chooseImage() {
    wx.chooseImage({
      count: that.data.maxCount,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        that.setData({
          images:res.tempFilePaths
        })
      }
    })
  },
  previewImage(e){
    wx.previewImage({
      current:that.data.images[e.currentTarget.dataset.index], // 当前显示图片的http链接
      urls:that.data.images // 需要预览的图片http链接列表
    })
  },

  uploadImage(index){
    wx.cloud.uploadFile({
      cloudPath:'circle_'+ new Date().getTime() + "_" + Math.floor(Math.random()*1000) + ".jpg",
      filePath: that.data.images[index],
      success: res => {
        console.log(res.fileID)
        that.data.images_upload_success[index] = res.fileID;
        that.data.images_upload_success_size = that.data.images_upload_success_size+1;

        if(that.data.images_upload_success_size == that.data.images.length){
          console.log("success",that.data.images_upload_success)
          that.circleAdd();
        }else{
          that.uploadImage(index+1);
        }
      },
      fail: err => {
        that.setData({
          images_upload_success:[],
          images_upload_success_size:0
        })
        wx.hideLoading({})
        wx.showToast({
          icon:'none',
          title: '图片上传失败',
        })
      }
    })
  },


  
  clickSend:function(){
    var that = this
    if(wx.getStorageSync('userInfo')){
      console.log('在') 
      wx.getStorage({
        key:'userInfo',
        success(res){
          var userInfo=res.data
          that.setData({
            userInfo:res.data
          })
         
          if(that.data.content.trim().length==0 && that.data.images.length==0){
            wx.showToast({
              icon:'none',
              title: '请发布点东西吧',
            })
            return;
          }
          else{
          wx.showLoading({
            title: '上传中..',
            duration:1000
          })}
          
          if(that.data.images.length>0){
            that.setData({
              images_upload_success:that.data.images
            })
            that.uploadImage(0)
            db.collection('circleToxs').add({
              data:{
                content:that.data.content,
                images:that.data.images_upload_success,//图片
                time:new Date(),//时间
                categor:that.data.category, // 上传分类信息
                avatarUrl:userInfo.avatarUrl,
                nickName:userInfo.nickName,
                userInfo:userInfo,
                isPromotion:"true"
              }
            }).then(res=>{
              console.log('add success',res)
              wx.hideLoading({})
              wx.showToast({
                title: '发布成功'
          })
           wx.switchTab({
             url: '../xinsheng/xinsheng',
           })
            }).catch(error=>{
              console.log('add error',error)
              wx.hideLoading({})
            })
            
          }else{
            db.collection('circleToxs').add({
              data:{
                content:that.data.content,
                images:that.data.images_upload_success,//图片
                time:new Date(),//时间
                categor:that.data.category, // 上传分类信息
                avatarUrl:userInfo.avatarUrl,
                nickName:userInfo.nickName,
                userInfo:userInfo
              }
            }).then(res=>{
              console.log('add success',res)
              wx.hideLoading({})
              wx.showToast({
                title: '发布成功'
          })
           wx.switchTab({
             url: '../xinsheng/xinsheng',
           })
            }).catch(error=>{
              console.log('add error',error)
              wx.hideLoading({})
            })
            
          }
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
    })