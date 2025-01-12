const cloud = require('wx-server-sdk');
const crypto = require('crypto'); // 安装 npm install crypto

cloud.init();

const TAG_LENGTH_BYTE = 16; // GCM 的身份验证标签长度为 16 字节
const KEY_LENGTH_BYTE = 32; // 密钥长度为 32 字节
const apiV3Key = 'bda2711b29b769edeebaa9713ded7452'; // APIv3 密钥

//解密函数
class AesUtil {
  constructor(key) {
    if (key.length !== KEY_LENGTH_BYTE) {
      throw new Error('无效的ApiV3Key，长度必须为32个字节');
    }
    this.aesKey = key;
  }
  decryptToString(associatedData, nonce, ciphertext) {
    const cipherBuffer = Buffer.from(ciphertext, 'base64'); // 将密文转换为 Buffer
    const decipher = crypto.createDecipheriv('aes-256-gcm', this.aesKey, nonce);
    decipher.setAAD(associatedData); // 设置附加数据
    const authTag = cipherBuffer.slice(-TAG_LENGTH_BYTE); // 获取最后16字节作为身份验证标签
    decipher.setAuthTag(authTag); // 设置身份验证标签
    const encryptedText = cipherBuffer.slice(0, -TAG_LENGTH_BYTE); // 获取密文主体部分
    const decrypted = Buffer.concat([
      decipher.update(encryptedText),
      decipher.final()
    ]);
    return decrypted.toString('utf-8');
  }
}

// 云函数主入口
exports.main = async (event, context) => {
  // 测试报文
  // var event = {
  //   body: '{"id":"809eb6dd-9d48-5d1b-bbd3-ed87c5de35bc","create_time":"2024-12-26T21:48:52+08:00","resource_type":"encrypt-resource","event_type":"TRANSACTION.SUCCESS","summary":"支付成功","resource":{"original_type":"transaction","algorithm":"AEAD_AES_256_GCM","ciphertext":"u/Rja4UU3arbZqKW3eTharwbXD33ynNFva29UlVQu8NkxMZRwk0PNdPRCFaJ/EzyDwEDR7ZcY3mL44de9cXO+/LfjxZffcjlYkLhgy6cZCCGRhj4Hx1i/BLgI3OUpkG91zpkf5NQ6z4jEXHQhE4k9CzD5ln0NyubG2AQQf38SP9PS9mYfCaHdkwvO0a6yx6hqjuOOZkpmtfxAHsPwoJs60+TNhhmwnbUmpTlKgtk1zR7EkT/GTU8/AusmUf/NLE6SNlmV5zDMow0Nw56kVEjs6KZ6eZTlP2R4z93yDRSYJjxu0XTf36+Ys6qd4co7a2Rs5ExQZkyzPWJnksXQdkATixdNnFxijYaDHQYMxuF7T4jtk6q6yNyq04A4FGoBxJixg84t35bEWrVgQMRh7BaRtTsW6InaUE2o3tXxP/GPIs4jGCkKe628CcraBdIfsrnELvBYtlFb29sp0jfEK/0ugNbtK4d7qBhWtnVN4FXMUAmwve1btNLlrsgQc+GYp6XTLWSMzPQ+04tmO1HydLGAmHn33r40raeOsH/fKvFevfk8YMEQz4kQ2yp8tlrBFy645QGjHc+YVs6klUIVA==","associated_data":"transaction","nonce":"erSnoFzfnp08"}}',
  //   headers: {
  //     '5e645e31d98275b17df2fc9a2447c4d1': 'tag',
  //     accept: '*/*',
  //     'cache-control': 'no-cache',
  //     'content-length': '923',
  //     'content-type': 'application/json',
  //     pragma: 'no-cache',
  //     'user-agent': 'Mozilla/4.0',
  //     'wechatpay-nonce': '33kNrV0Kl6ierzPzYNlL6N7MpBKdWAi8',
  //     'wechatpay-serial': 'PUB_KEY_ID_0117004403622024121000218500000722',
  //     'wechatpay-signature': 'ha3cq9ypfU39E4Cd3EWrJyeNUAH7TEp2bXYgBgbUNn/EW5XKyOG/dsx7sZi9aEIiVdeu4GEphFuHSp+Mu88mhDGZQFENbdAYp3ApOgszMvLPNhNb4lg5S0CQg6fMesb+lrYBVNzuT5NoCAjnr4crEA5IJVlYUCCADeK6+6LE7BmVfzKCQHS1a9WxjQy9H7skUBpqNUDhdneUmHSyD4xkMuRFMAn5Gvwao9wgiL1AHaRSUe25JZvere0M9cHdqUQxUazCnoI6OMge9rGBr02w5kq2z4VvQsb6biFYAJcT23wkLuix/THQWQK0rsWCEJCVG86rtVCwk1S5BIoeH4Ds5w==',
  //     'wechatpay-signature-type': 'WECHATPAY2-SHA256-RSA2048',
  //     'wechatpay-timestamp': '1735220932',
  //     'x-cloudbase-context': 'H4sIAAAAAAAA/0TLvQrCMBRH8Xf5zy2k9AOb1cnF0VVuk4tcMElJmmgV310CguM58HuDfTlZaDiSlKXtbuvzFR6kpoPtaR7QIIuHRqeU6udxVNNQZ+JYxPCZHENjpf24/O+FY5JQlc3O7W35dYMUcjRVbGa5mruw3/D5BgAA///7+CQAhQAAAA==',
  //     'x-cloudbase-request-id': 'bc21d59c-64b1-4da7-876b-509d81680d42',
  //     'x-cloudbase-trace': 'MTNlZDk5MzI1ODdiNDI2YmI0MjkwYjMyNWY0MjJhMTQsYWZlNzMxNWI5NGVkNDM0MjlhNDQ1YTQ4YmU2YWNhYWIsb24=',
  //     'x-forwarded-for': '101.226.103.14',
  //     'x-forwarded-proto': 'https',
  //     'x-nws-log-uuid': '10533617663847252198',
  //     'x-origin-host': 'maisui-1gpxzowa068d3a94-1331667450.ap-shanghai.app.tcloudbase.com',
  //     'x-real-ip': '101.226.103.14',
  //     'x-request-id': 'bc21d59c-64b1-4da7-876b-509d81680d42',
  //     'x-tencent-ua': 'Qcloud'
  //   },
  //   httpMethod: 'POST',
  //   isBase64Encoded: false,
  //   multiValueHeaders: {
  //     '5e645e31d98275b17df2fc9a2447c4d1': ['tag'],
  //     accept: ['*/*'],
  //     'cache-control': ['no-cache'],
  //     'content-length': ['923'],
  //     'content-type': ['application/json'],
  //     pragma: ['no-cache'],
  //     'user-agent': ['Mozilla/4.0'],
  //     'wechatpay-nonce': ['33kNrV0Kl6ierzPzYNlL6N7MpBKdWAi8'],
  //     'wechatpay-serial': ['PUB_KEY_ID_0117004403622024121000218500000722'],
  //     'wechatpay-signature': [
  //       'ha3cq9ypfU39E4Cd3EWrJyeNUAH7TEp2bXYgBgbUNn/EW5XKyOG/dsx7sZi9aEIiVdeu4GEphFuHSp+Mu88mhDGZQFENbdAYp3ApOgszMvLPNhNb4lg5S0CQg6fMesb+lrYBVNzuT5NoCAjnr4crEA5IJVlYUCCADeK6+6LE7BmVfzKCQHS1a9WxjQy9H7skUBpqNUDhdneUmHSyD4xkMuRFMAn5Gvwao9wgiL1AHaRSUe25JZvere0M9cHdqUQxUazCnoI6OMge9rGBr02w5kq2z4VvQsb6biFYAJcT23wkLuix/THQWQK0rsWCEJCVG86rtVCwk1S5BIoeH4Ds5w=='
  //     ],
  //     'wechatpay-signature-type': ['WECHATPAY2-SHA256-RSA2048'],
  //     'wechatpay-timestamp': ['1735220932'],
  //     'x-cloudbase-context': [
  //       'H4sIAAAAAAAA/0TLvQrCMBRH8Xf5zy2k9AOb1cnF0VVuk4tcMElJmmgV310CguM58HuDfTlZaDiSlKXtbuvzFR6kpoPtaR7QIIuHRqeU6udxVNNQZ+JYxPCZHENjpf24/O+FY5JQlc3O7W35dYMUcjRVbGa5mruw3/D5BgAA///7+CQAhQAAAA=='
  //     ],
  //     'x-cloudbase-request-id': ['bc21d59c-64b1-4da7-876b-509d81680d42'],
  //     'x-cloudbase-trace': [
  //       'MTNlZDk5MzI1ODdiNDI2YmI0MjkwYjMyNWY0MjJhMTQsYWZlNzMxNWI5NGVkNDM0MjlhNDQ1YTQ4YmU2YWNhYWIsb24='
  //     ],
  //     'x-forwarded-for': ['101.226.103.14'],
  //     'x-forwarded-proto': ['https'],
  //     'x-nws-log-uuid': ['10533617663847252198'],
  //     'x-origin-host': [
  //       'maisui-1gpxzowa068d3a94-1331667450.ap-shanghai.app.tcloudbase.com'
  //     ],
  //     'x-real-ip': ['101.226.103.14'],
  //     'x-request-id': ['bc21d59c-64b1-4da7-876b-509d81680d42'],
  //     'x-tencent-ua': ['Qcloud']
  //   },
  //   path: '/',
  //   queryStringParameters: {},
  //   requestContext: {
  //     appId: '1331667450',
  //     envId: 'maisui-1gpxzowa068d3a94',
  //     requestId: 'bc21d59c-64b1-4da7-876b-509d81680d42',
  //     uin: '100039550644'
  //   }
  // };
  const key = Buffer.from(apiV3Key, 'utf-8');
  var body = event.body;
  try {
    body = JSON.parse(event.body); // 解析 JSON
  } catch (error) {
    return {
      code: 500,
      body: '无效报文'
    };
  }
  const associatedData = Buffer.from(body.resource.associated_data, 'utf-8');
  const nonce = Buffer.from(body.resource.nonce, 'utf-8');
  const ciphertext = body.resource.ciphertext;
  let decryptedData;
  try {
    const aesUtil = new AesUtil(key);
    decryptedData = aesUtil.decryptToString(associatedData, nonce, ciphertext);
    console.log('解密数据:', decryptedData);
    decryptedData = JSON.parse(decryptedData); // 解析解密后的数据
  } catch (error) {
    return {
      code: 500,
      body: JSON.stringify({
        message: '解密失败'
      })
    };
  }
  const {
    out_trade_no
  } = decryptedData; // 这里就拿到decryptedData里的订单号
  console.log('解析拿到的订单号', out_trade_no);

  try {
    // ...后面的逻辑处理都是大家自己的逻辑，这里就不写了


    // 注意：最后处理完自己逻辑之后一定要通知给微信，不然一直会重复回调
    return {
      code: 200,
      message: '处理完成'
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: '订单状态更新失败'
    };
  }
};
