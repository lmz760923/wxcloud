const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

// 创建集合云函数入口函数
exports.main = async (event, context) => {
  try {
    
      
      let ret=await db.collection('users').add({
     
      data: {

        name: event.name,
        age:event.age,
      }
    });
    
    return {name:event.name}

    


  } catch (e) {
  
    return {
      success: false,
      data: e,
    };
  }
};
