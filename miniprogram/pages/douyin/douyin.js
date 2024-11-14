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
        console.log(fileID);

        cloud.database().collection('images').doc('b6cf38526732048b00cb2c8b675c9614').update({
          data: {
            imageurl: fileID,
         }
        }).then(res=>{console.log(res);
                      wx.showToast({
                        title: 'title',
                      })
                      this.setData({image:fileID})
                      }).catch(err=>{console.log(err)})

      
  

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
    wx.cloud.database().collection('images').doc('b6cf38526732048b00cb2c8b675c9614').get().then(
      res=>{
        this.setData({image:res.data.imageurl})
        console.log(res.data)
      }
    ).catch(err=>console.log(err))


  },

})
