// pages/pay/pay.js
Page({

  /**
 1. 页面的初始数据
   */
  data: {

  },

  pay() {
    // 生成支付单号的函数
    function generatePaymentOrderNumber() {
      // 获取当前时间戳（精确到毫秒）
      const timestamp = Date.now();
      // 生成一个随机数，并将其转换为字符串
      const randomNum = Math.random().toString(36).substring(2, 15); // 截取一部分字符串作为随机数
      // 组合时间戳和随机数
      const paymentOrderNumber = `${timestamp}${randomNum}`;
      // 返回支付单号
      return paymentOrderNumber;
    }
    // 在这之前先存订单到云数据库
    wx.cloud.callFunction({
      name: 'v3pay',
      data: {
        action: 'pay',
        payParams: {
          description: '测试商品',
          out_trade_no: generatePaymentOrderNumber(),
          notify_url: 'https://cloud365c-6gi38xrod99be338-1306499834.ap-shanghai.app.tcloudbase.com/v3paycb',
          amount: {
            total: 1
          }
        }
      },
      success: res => {
        console.log(res);
        // 生成随机32位字符串的函数
        function generateRandomString(length = 32) {
          const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          let result = '';
          const charactersLength = characters.length;
          for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charactersLength);
            result += characters[randomIndex];
          }
          return result;
        }
        var timeStamp = String(Math.floor(Date.now() / 1000));
        var packageStr = 'prepay_id=' + res.result.prepay_id;
        var nonceStr = generateRandomString();
        var params = {
          timeStamp,
          nonceStr,
          package: packageStr
        };
        console.log(params);
        wx.cloud.callFunction({
          name: 'v3pay',
          data: {
            action: 'sign',
            params
          },
          success: ress => {
            console.log(ress);
            wx.requestPayment({
              nonceStr,
              package: packageStr,
              signType: 'RSA',
              timeStamp,
              paySign: ress.result,
              success: res => {
                console.log(res);
              },
              fail: err => {
                console.log(err);
              }
            })
          },
          fail: err => {
            console.log(err);
          }
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})
