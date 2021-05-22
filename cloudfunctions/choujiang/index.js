// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()


// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  rand = Math.random()
  var isWin = false
  if (rand < event.prob){
    isWin = true
  }

  return {
    isWin,
  }
}