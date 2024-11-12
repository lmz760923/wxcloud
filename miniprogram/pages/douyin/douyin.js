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
        /*const db = cloud.database()

        db.collection('images').add({
          
          data: {
            
            imageurl: fileID,
            
          },
          success: function(res) {
            
            console.log(res)
          }
      })



        

        collection.get({
          success:(res)=>{
            
            console.log(res)
          }
        })

        collection.doc('b6cf38526732048b00cb2c8b675c9614').update({
               data: {
               imageurl: fileID,
            }
        })*/

  

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
    const db = wx.cloud.database()
    const collection = db.collection('images');
    collection.doc('b6cf38526732048b00cb2c8b675c9614').get({
      success:(res)=>{
        this.setData({image:res.data(0).imageurl})
        console.log(res.data(0).imageurl)
        console.log(image)
        
      }
    })
  },

})
