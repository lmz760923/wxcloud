// app.js
App({
  globalData:{
    userinfo:{openid:'',
              appid:'',
              unionid:''},
    token:null,
    isLogin:false,
    requesturl: 'http://127.0.0.1:8080',
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "cloud365c-6gi38xrod99be338",
        traceUser: true,
      });
    }

    //this.globalData = {};
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      data: {
        type: 'getOpenId',
        
      }
    }).then((res)=>{
      //console.log('result:',res.result);
      this.globalData.userinfo.openid=res.result.openid;
      this.globalData.userinfo.appid=res.result.appid;
      this.globalData.userinfo.unionid=res.result.unionid;
      
      /*
      if (this.callback){this.callback(res.result.userinfo);
          console.log('callback');  
      }*/
    }
    

    ).catch((e) => {

      const {errCode,errMsg}=e
      console.log(e);
    });
  },
});
