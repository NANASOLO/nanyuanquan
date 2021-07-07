Page({

  
  data: {
    isShow:true,
    isDisabled:false,
    array: ['商学院', '会计学院', '电气与计算机工程学院', '外国语学院','文学与创媒学院','健康与护理学院','公共管理学院','艺术设计与创意产业系','音乐学系','达人书院'],
    xingming:'',
    xuehao:'',
    xibie:'',
    zhuanye:'',
    disabled:false,
    imgUrl:[]
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value,
     
    })
  },

  //上传图片
 chuantupian() {
  let that = this;
  let timestamp = (new Date()).valueOf();
  wx.chooseImage({
   success: chooseResult => {
    wx.showLoading({
     title: '上传中。。。',
    })
    // 将图片上传至云存储空间
    wx.cloud.uploadFile({
     // 指定上传到的云路径
     cloudPath: timestamp + '.png',
     // 指定要上传的文件的小程序临时文件路径
     filePath: chooseResult.tempFilePaths[0],
     // 成功回调
     success: res => {
      console.log('上传成功', res)
      wx.hideLoading()
      wx.showToast({
       title: '上传图片成功',
      })
      if (res.fileID) {
       that.setData({
        zhaopian: '图片如下',
        imgUrl: res.fileID,
        isShow:false
       })
      }
     },
    })
   },
  })
 },


 formSubmit(e) {
  
  console.log('form发生了submit事件，携带数据为：', e.detail.value) 
  if(e.detail.value.xingming.length==0){
    wx.showToast({
      icon:"error",
      title: '请填写您的姓名',
      duration:1500
    })
  }
  else if(e.detail.value.xuehao.length==0){
    wx.showToast({
      icon:"error",
      title: '请填写您的学号',
      duration:1500
    })
  }
  else if(e.detail.value.xibie==null){
    wx.showToast({
      icon:"error",
      title: '请选择您的系别',
      duration:1500
    })
  }
  else if(e.detail.value.zhuanye.length==0){
    wx.showToast({
      icon:"error",
      title: '请填写您的专业',
      duration:1500
    })
  }
  else if(this.data.imgUrl.length==0){
    wx.showToast({
      icon:"error",
      title: '请上传学生证明',
      duration:1500
    })
  }
else{
  this.setData({
    xingming:e.detail.value.xingming,
    xuehao:e.detail.value.xuehao,
    xibie:e.detail.value.xibie,
    zhuanye:e.detail.value.zhuanye,
    isDisabled:true
  })

  wx.showToast({
    title: '认证成功',
    icon:'success',
    duration:1500,

    success: function () {
      setTimeout(function() {
        var that=this
        wx.navigateTo({
          url: '/pages/renzhen3/renzhen3?xingming='+e.detail.value.xingming+"&xuehao="+e.detail.value.xuehao+"&xibie="+e.detail.value.xibie+"&zhuanye="+e.detail.value.zhuanye,
        })
      }, 2000);
    }
  })
}
 
},
  
})
