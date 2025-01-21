//const { PostProcess } = require('XrFrame/xrFrameSystem');
const { envList } = require('../../envList');
const app=getApp();
// pages/me/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openId: '',
    showTip: false,
    title:"title",
    content:"content"
  },

  onLoad(e){
    this.setData({openId: app.globalData.userinfo.openid});
    

  },

  fileupload(){
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image','video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      async success(res){
        console.log('res:',res)
        const result = await that.uploadFile(res.tempFiles[0].tempFilePath, 'xx.jpg' ,function(res){
          console.log(`上传进度：${res.progress}%，已上传${res.totalBytesSent}B，共${res.totalBytesExpectedToSend}B`)
          // if(res.progress > 50){ // 测试文件上传一半就终止上传
          //   return false
          // }
        })
        console.log(result)
      }
    })
  },

  uploadFile(file, path, onCall = () => {}) {
    return new Promise((resolve, reject) => {
      const task = wx.cloud.uploadFile({
        cloudPath: path,
        filePath: file,
        config: {
          env: 'prod-4g2nznbh9c0d99f6' // 需要替换成自己的微信云托管环境ID
        },
        success: res => resolve(res.fileID),
        fail: e => {
          const info = e.toString()
          if (info.indexOf('abort') != -1) {
            reject(new Error('【文件上传失败】中断上传'))
          } else {
            reject(new Error('【文件上传失败】网络或其他错误'))
          }
        }
      })
      task.onProgressUpdate((res) => {
        if (onCall(res) == false) {
          task.abort()
        }
      })
    })
  },

  getOpenId() {
    wx.showLoading({
      title: '',
    });
    wx.cloud
      .callFunction({
        name: 'quickstartFunctions',
        data: {
          type: 'getOpenId',
        },
      })
      .then((resp) => {
        this.setData({
          haveGetOpenId: true,
          openId: resp.result.openid,
        });
        wx.hideLoading();
        console.log('openid:',resp.result.openid);
      })
      .catch((e) => {
        wx.hideLoading();
        const { errCode, errMsg } = e
        if (errMsg.includes('Environment not found')) {
          this.setData({
            showTip: true,
            title: "云开发环境未找到",
            content: "如果已经开通云开发，请检查环境ID与 `miniprogram/app.js` 中的 `env` 参数是否一致。"
          });
          return
        }
        if (errMsg.includes('FunctionName parameter could not be found')) {
          this.setData({
            showTip: true,
            title: "请上传云函数",
            content: "在'cloudfunctions/quickstartFunctions'目录右键，选择【上传并部署-云端安装依赖】，等待云函数上传完成后重试。"
          });
          return
        }
      });
  },

  gotoWxCodePage() {
    wx.navigateTo({
      url: `/pages/exampleDetail/index?envId=${envList?.[0]?.envId}&type=getMiniProgramCode`,
    });
  },
  my_request(){
    wx.request(
      {
        url: app.globalData.requesturl+'/users/insert', //仅为示例，并非真实的接口地址
        data: JSON.stringify({id:1009,name:'xxx',password:100,number:100}),
        dataType:"json",
        method: 'POST',
        header: {
          'content-type': 'application/json' ,
          'Test-type': 'application/json' 
        },
      
        success (res) {
          //console.log(res.data)
          wx.showToast({
            title: 'success',
            content: ''+res.data.id,
          })
        }
      }
    );
  },

  
  dataservice(){
    wx.cloud.callFunction(
      {
        name:'dataservice',
        data:{
          type:'test',
          name:'test',
          age:45,
        },
        success(res){
          console.log("success",res);
        },
        fail(res){
          console.log(res);
        }
      }
    );
  },

  
navtov3pay(){
  wx.navigateTo({
    url: '/pages/v3pay/v3pay',
  })
},
navtoweb(){
  wx.navigateTo({
    url: '/pages/web/index?url=https://www.baidu.com&title=webbrowse',
  })
},

async callcloud(){
let result=await wx.cloud.callContainer({
config:{env: 'prod-4g2nznbh9c0d99f6'},
path: '/products/41',
method: 'GET',
header:{'X-WX-SERVICE':'stu01-1',}

})
console.log('result:',result)
}

});
