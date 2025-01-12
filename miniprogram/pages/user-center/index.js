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

  my_request_get(){
    
    wx.request({
      url:'https://cloud365c-6gi38xrod99be338-1306499834.ap-shanghai.app.tcloudbase.com/pay_notify',
      method: 'POST',
      data: {
        image: 'test0...',

      },
      success(res){
        console.log('success:',res.data.msg);
      },
      fail(res){console.log('fail:',res);},
    });
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

  pay_request(e){
    wx.showToast({
      title: '请先开通商户号',
    })
    //return;
    let that = this;
        let formData = {orderid:'abcd12345678',money:0.1}
        
        wx.cloud.callFunction({
            name: "pay",
            data: {

                orderid:formData.orderid,
                money: formData.money
            },
            success(res) {
                console.log("提交成功", res.result)
                that.pay(res.result)
            },
            fail(res) {
                console.log("提交失败", res)
            }
        })
  },

  //实现小程序支付
  pay(payData) {
    //官方标准的支付方法
    wx.requestPayment({
        timeStamp: payData.timeStamp,
        nonceStr: payData.nonceStr,
        package: payData.package, //统一下单接口返回的 prepay_id 格式如：prepay_id=***
        signType: 'MD5',
        paySign: payData.paySign, //签名
        success(res) {
            console.log("支付成功", res)
        },
        fail(res) {
            console.log("支付失败", res)
        },
        complete(res) {
            console.log("支付完成", res)
        }
    })
},

navtov3pay(){
  wx.navigateTo({
    url: '/pages/v3pay/v3pay',
  })
},

});
