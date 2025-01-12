const cloud = require('wx-server-sdk');
const crypto = require('crypto'); // 需安装 npm install crypto
const request = require('request-promise'); // 需安装npm i --save request      npm i --save request-promise
const fs = require('fs')
cloud.init();

// 配置微信商户信息
const mchId = '你的商户号'; // 商户号
const serialNo = '你的api证书序列号'; // 证书序列号
const appid = '你的小程序appid';
const keyPath = 'apiclient_key.pem'; // 密钥证书路径
const jsapiUrl = 'https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi'; // 请求url

// 生成随机字符串
function generateNonceStr(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex') // 转换为十六进制字符串
    .slice(0, length); // 截取指定长度
}

// 生成时间戳（秒）
function generateTimestamp() {
  return Math.floor(Date.now() / 1000);
}
// 生成签名
async function generateSignature(method, canonicalUrl, timestamp, nonceStr, body, privateKey) {
  const message = `${method}\n${canonicalUrl}\n${timestamp}\n${nonceStr}\n${body}\n`;
  console.log('拼接后的', message);
  // 转换为Buffer对象
  const privateKeyBuffer = fs.readFileSync(privateKey);
  // 创建签名对象
  const sign = crypto.createSign('SHA256');
  sign.update(message, 'utf8');
  sign.end();
  // 使用私钥进行签名
  const signature = sign.sign(privateKeyBuffer, 'base64');
  return signature;
}

// 生成签名
async function generateSignature2(params) {
  const message = `${appid}\n${params.timeStamp}\n${params.nonceStr}\n${params.package}\n`;
  console.log(message);
  // 转换为Buffer对象
  const privateKeyBuffer = fs.readFileSync(keyPath);
  // 创建签名对象
  const sign = crypto.createSign('SHA256');
  sign.update(message, 'utf8');
  sign.end();
  // 使用私钥进行签名
  const signature = sign.sign(privateKeyBuffer, 'base64');
  return signature;
}

// 云函数入口
exports.main = async (event, context) => {
  const {
    payParams,
    action
  } = event;
  const timestamp = generateTimestamp();
  if (action == 'pay') {
    // 添加分账接收方
    const payload = {
      appid,
      mchid: mchId,
      ...payParams,
      payer: {
        openid: cloud.getWXContext().OPENID
      },
      settle_info: {
        profit_sharing: true// 分账标识
      }
    };
    const nonceStr = generateNonceStr(32);
    const bodyString = JSON.stringify(payload);
    try {
      const signature = await generateSignature(
        'POST',
        `/v3/pay/transactions/jsapi`,
        timestamp,
        nonceStr,
        bodyString,
        keyPath // 使用私钥路径
      );
      const authorization = `WECHATPAY2-SHA256-RSA2048 mchid="${mchId}",nonce_str="${nonceStr}",timestamp="${timestamp}",serial_no="${serialNo}",signature="${signature}"`;
      console.log('签名', authorization);
      const options = {
        method: 'POST',
        uri: jsapiUrl,
        json: true,
        body: payload,
        headers: {
          'Authorization': authorization,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Wechatpay-Serial': serialNo,
          'User-Agent': 'request',
        },
      };

      const response = await request(options);
      return response;
    } catch (err) {
      console.log(err);
      return {
        error: err.message
      };
    }
  } else {
    return generateSignature2(event.params);
  }

};
