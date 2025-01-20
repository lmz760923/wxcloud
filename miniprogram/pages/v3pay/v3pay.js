// pages/pay/pay.js
var eventdata = {
  body: '{"id":"809eb6dd-9d48-5d1b-bbd3-ed87c5de35bc","create_time":"2024-12-26T21:48:52+08:00","resource_type":"encrypt-resource","event_type":"TRANSACTION.SUCCESS","summary":"支付成功","resource":{"original_type":"transaction","algorithm":"AEAD_AES_256_GCM","ciphertext":"u/Rja4UU3arbZqKW3eTharwbXD33ynNFva29UlVQu8NkxMZRwk0PNdPRCFaJ/EzyDwEDR7ZcY3mL44de9cXO+/LfjxZffcjlYkLhgy6cZCCGRhj4Hx1i/BLgI3OUpkG91zpkf5NQ6z4jEXHQhE4k9CzD5ln0NyubG2AQQf38SP9PS9mYfCaHdkwvO0a6yx6hqjuOOZkpmtfxAHsPwoJs60+TNhhmwnbUmpTlKgtk1zR7EkT/GTU8/AusmUf/NLE6SNlmV5zDMow0Nw56kVEjs6KZ6eZTlP2R4z93yDRSYJjxu0XTf36+Ys6qd4co7a2Rs5ExQZkyzPWJnksXQdkATixdNnFxijYaDHQYMxuF7T4jtk6q6yNyq04A4FGoBxJixg84t35bEWrVgQMRh7BaRtTsW6InaUE2o3tXxP/GPIs4jGCkKe628CcraBdIfsrnELvBYtlFb29sp0jfEK/0ugNbtK4d7qBhWtnVN4FXMUAmwve1btNLlrsgQc+GYp6XTLWSMzPQ+04tmO1HydLGAmHn33r40raeOsH/fKvFevfk8YMEQz4kQ2yp8tlrBFy645QGjHc+YVs6klUIVA==","associated_data":"transaction","nonce":"erSnoFzfnp08"}}',
  headers: {
    '5e645e31d98275b17df2fc9a2447c4d1': 'tag',
    accept: '*/*',
    'cache-control': 'no-cache',
    'content-length': '923',
    'content-type': 'application/json',
    pragma: 'no-cache',
    'user-agent': 'Mozilla/4.0',
    'wechatpay-nonce': '33kNrV0Kl6ierzPzYNlL6N7MpBKdWAi8',
    'wechatpay-serial': 'PUB_KEY_ID_0117004403622024121000218500000722',
    'wechatpay-signature': 'ha3cq9ypfU39E4Cd3EWrJyeNUAH7TEp2bXYgBgbUNn/EW5XKyOG/dsx7sZi9aEIiVdeu4GEphFuHSp+Mu88mhDGZQFENbdAYp3ApOgszMvLPNhNb4lg5S0CQg6fMesb+lrYBVNzuT5NoCAjnr4crEA5IJVlYUCCADeK6+6LE7BmVfzKCQHS1a9WxjQy9H7skUBpqNUDhdneUmHSyD4xkMuRFMAn5Gvwao9wgiL1AHaRSUe25JZvere0M9cHdqUQxUazCnoI6OMge9rGBr02w5kq2z4VvQsb6biFYAJcT23wkLuix/THQWQK0rsWCEJCVG86rtVCwk1S5BIoeH4Ds5w==',
    'wechatpay-signature-type': 'WECHATPAY2-SHA256-RSA2048',
    'wechatpay-timestamp': '1735220932',
    'x-cloudbase-context': 'H4sIAAAAAAAA/0TLvQrCMBRH8Xf5zy2k9AOb1cnF0VVuk4tcMElJmmgV310CguM58HuDfTlZaDiSlKXtbuvzFR6kpoPtaR7QIIuHRqeU6udxVNNQZ+JYxPCZHENjpf24/O+FY5JQlc3O7W35dYMUcjRVbGa5mruw3/D5BgAA/7+CQAhQAAAA==',
    'x-cloudbase-request-id': 'bc21d59c-64b1-4da7-876b-509d81680d42',
    'x-cloudbase-trace': 'MTNlZDk5MzI1ODdiNDI2YmI0MjkwYjMyNWY0MjJhMTQsYWZlNzMxNWI5NGVkNDM0MjlhNDQ1YTQ4YmU2YWNhYWIsb24=',
    'x-forwarded-for': '101.226.103.14',
    'x-forwarded-proto': 'https',
    'x-nws-log-uuid': '10533617663847252198',
    'x-origin-host': 'maisui-1gpxzowa068d3a94-1331667450.ap-shanghai.app.tcloudbase.com',
    'x-real-ip': '101.226.103.14',
    'x-request-id': 'bc21d59c-64b1-4da7-876b-509d81680d42',
    'x-tencent-ua': 'Qcloud'
  },
  httpMethod: 'POST',
  isBase64Encoded: false,
  multiValueHeaders: {
    '5e645e31d98275b17df2fc9a2447c4d1': ['tag'],
    accept: ['*/*'],
    'cache-control': ['no-cache'],
    'content-length': ['923'],
    'content-type': ['application/json'],
    pragma: ['no-cache'],
    'user-agent': ['Mozilla/4.0'],
    'wechatpay-nonce': ['33kNrV0Kl6ierzPzYNlL6N7MpBKdWAi8'],
    'wechatpay-serial': ['PUB_KEY_ID_0117004403622024121000218500000722'],
    'wechatpay-signature': [
      'ha3cq9ypfU39E4Cd3EWrJyeNUAH7TEp2bXYgBgbUNn/EW5XKyOG/dsx7sZi9aEIiVdeu4GEphFuHSp+Mu88mhDGZQFENbdAYp3ApOgszMvLPNhNb4lg5S0CQg6fMesb+lrYBVNzuT5NoCAjnr4crEA5IJVlYUCCADeK6+6LE7BmVfzKCQHS1a9WxjQy9H7skUBpqNUDhdneUmHSyD4xkMuRFMAn5Gvwao9wgiL1AHaRSUe25JZvere0M9cHdqUQxUazCnoI6OMge9rGBr02w5kq2z4VvQsb6biFYAJcT23wkLuix/THQWQK0rsWCEJCVG86rtVCwk1S5BIoeH4Ds5w=='
    ],
    'wechatpay-signature-type': ['WECHATPAY2-SHA256-RSA2048'],
    'wechatpay-timestamp': ['1735220932'],
    'x-cloudbase-context': [
      'H4sIAAAAAAAA/0TLvQrCMBRH8Xf5zy2k9AOb1cnF0VVuk4tcMElJmmgV310CguM58HuDfTlZaDiSlKXtbuvzFR6kpoPtaR7QIIuHRqeU6udxVNNQZ+JYxPCZHENjpf24/O+FY5JQlc3O7W35dYMUcjRVbGa5mruw3/D5BgAA/7+CQAhQAAAA=='
    ],
    'x-cloudbase-request-id': ['bc21d59c-64b1-4da7-876b-509d81680d42'],
    'x-cloudbase-trace': [
      'MTNlZDk5MzI1ODdiNDI2YmI0MjkwYjMyNWY0MjJhMTQsYWZlNzMxNWI5NGVkNDM0MjlhNDQ1YTQ4YmU2YWNhYWIsb24='
    ],
    'x-forwarded-for': ['101.226.103.14'],
    'x-forwarded-proto': ['https'],
    'x-nws-log-uuid': ['10533617663847252198'],
    'x-origin-host': [
      'maisui-1gpxzowa068d3a94-1331667450.ap-shanghai.app.tcloudbase.com'
    ],
    'x-real-ip': ['101.226.103.14'],
    'x-request-id': ['bc21d59c-64b1-4da7-876b-509d81680d42'],
    'x-tencent-ua': ['Qcloud']
  },
  path: '/',
  
  queryStringParameters: {},
  requestContext: {
    appId: 'wx74862e0dfcf69954',
    
    requestId: 'bc21d59c-64b1-4da7-876b-509d81680d42',
   
  }
};
Page({

  /**
 1. 页面的初始数据
   */
  data: {

  },

  cb(){
    wx.cloud.callFunction({
      name:'paycb',
      data: eventdata,
      success: res=>{console.log(res);},
      fail:res=>{console.log(res);},
    })
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
        console.log('统一下单:',res);
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
        console.log('payrequest 签名参数:',params);
        wx.cloud.callFunction({
          name: 'v3pay',
          data: {
            action: 'sign',
            params
          },
          success: ress => {
            console.log('payrequest 签名结果:',ress);
            wx.requestPayment({
              nonceStr,
              package: packageStr,
              signType: 'RSA',
              timeStamp,
              paySign: ress.result,
              success: res => {
                console.log('payrequest success:',res);
              },
              fail: err => {
                console.log('payrequest fail:',err);
              }
            })
          },
          fail: err => {
            console.log('payrequest 签名fail:',err);
          }
        })
      },
      fail: err => {
        console.log('统一下单fail:',err);
      }
    })
  }
})
