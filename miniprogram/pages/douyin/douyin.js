const app=getApp()
Page({

  data: {
    image: '',
    userinfo:{openid:'',
              appid:'',
              unionid:''},

  },

  
  uploadPhoto: function() {
    //this.getList();

    wx.chooseMedia({
      count:1,
      madiaType:['image'],
      sizeType:'compressed',
      sourceType:['album', 'camera'],
      success:res=>{
        // console.log(res.tempFilePaths[0])
        var photoTempPath = res.tempFiles[0].tempFilePath
        this.uploadPhotoToDatabase(photoTempPath)
      }
    })
  },

  uploadPhotoToDatabase: function(photoTempPath) {
    wx.showLoading({
      title:"正在上传......"
    })
    wx.cloud.uploadFile({
      cloudPath:"photo/"+Date.now()+".jpg",
      filePath:photoTempPath,
      success(res) {
        //console.log(res)
        wx.hideLoading()
        wx.showToast({
          title:"上传成功！",
          duration:2000
        })
        const fileID = res.fileID;

        wx.cloud.callFunction({
          name: 'quickstartFunctions',
          data: {
            type: 'addimageurl',
            imageurl: fileID,
          }
        }).then((resp) => {
          console.log('resp:',resp);

          this.setData({
            
            image: resp.result.imageurl,
          });
          
          
        }).catch((e) => {

          const {errCode,errMsg}=e
          console.log(e);
        });

      
  

      },
      fail(res) {
        wx.hideLoading()
        wx.showToast({
          title:"上传失败，请检查网络！",
          icon:"none",
          duration:2000
        })
      }
    })    
  },

  onLoad: function (options) {
    this.getList();
    if (app.globalData.userinfo.openid!=''){
      this.setData({userinfo: app.globalData.userinfo})

    }

  },



  onShow: function(e){
    if (app.globalData.userinfo.openid!=''){
      this.setData({userinfo: app.globalData.userinfo})

    }
   
  },

  getList() {
    wx.cloud.database().collection('images').doc('imageurl').get().then(
      res=>{
        this.setData({image:res.data.imageurl})
        


  }).catch((e) => {

    const {errCode,errMsg}=e
    console.log(e);
  })
},



}
)
