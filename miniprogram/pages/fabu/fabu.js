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
  },

  selectTab(e) {
    let index = e.target.dataset.index;
    this.setData({
      curTab: index,
      current: index
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

  clickSend(){
    if(that.data.content.trim().length==0 && that.data.images.length==0){
      wx.showToast({
        icon:'none',
        title: '请发布点东西吧',
      })
      return;
    }
    wx.showLoading({
      title: '上传中..',
    })
    if(that.data.images.length>0){
      that.setData({
        images_upload_success:that.data.images
      })
      that.uploadImage(0)
    }else{
      that.circleAdd();
    }
  },

  circleAdd(){
    db.collection('circle').add({
      data:{
        content:that.data.content,
        images:that.data.images_upload_success,
        time:new Date(),
        loveList:[],
        commentList:[],
        
      }
    }).then(res=>{
      console.log('add success',res)
      wx.hideLoading({})
    }).catch(error=>{
      console.log('add error',error)
      wx.hideLoading({})
    })
  }

  
})