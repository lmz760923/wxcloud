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
      message: '处理完成',
      trade_no:out_trade_no,
      des:decryptedData,

    };
  } catch (error) {
    return {
      statusCode: 500,
      body: '订单状态更新失败'
    };
  }
};
