Page({

  data: {
    image: '',

  },

  uploadPhoto: function() {
    //this.getList();

    wx.chooseImage({
      count:1,
      sizeType:'compressed',
      sourceType:['album', 'camera'],
      success:res=>{
        // console.log(res.tempFilePaths[0])
        var photoTempPath = res.tempFilePaths[0]
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


  },

  getList() {
    wx.cloud.database().collection('images').doc('imageurl').get().then(
      res=>{
        this.setData({image:res.data.imageurl})
        console.log(res.data)
      }
    ).catch(err=>console.log(err))


  },

})
