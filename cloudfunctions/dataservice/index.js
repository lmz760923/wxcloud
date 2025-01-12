const test=require('./test/index')

// 云函数入口函数
exports.main = async (event, context) => {

  switch (event.type){
    case 'test': 
      return await test.main(event,context);
      break;
    default:
      return event;
  }
}