// pages/addFunction/addFunction.js

const code = `// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  console.log(context)
  return {
    sum: event.a + event.b
  }
}`

const app = getApp()

Page({

  data: {
    result: '',
    prob: null,
    canIUseClipboard: wx.canIUse('setClipboardData'),
  },

  onLoad: function (options) {

  },

  copyCode: function() {
    wx.setClipboardData({
      data: code,
      success: function () {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },

  choujiang() {
    wx.cloud.callFunction({
      name: 'choujiang',
      data: {
        refresh: false,
        prob: this.data.prob
      },
      success: res => {
        console.log(res)
        var titlex = "恭喜中奖"
        if (!res.result.isWin){
          titlex = "可惜~下次一定"
        }
        wx.showToast({
          title: titlex,
        })
        this.setData({
          result: titlex
        })
        this.addMe()
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '调用失败',
        })
        console.error('[云函数] [choujiang] 调用失败：', err)
      }
    })
  },
  getProb(){
    const db = wx.cloud.database();
    db.collection("prob")
    .doc("b00064a760a8c74819a7dbb918f1a5d5")
    .get({
      success: res => {
        console.log(res)
        this.setData({
          prob: res.data.prob
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  setProb(){
    var newProb = 0.987
    const db = wx.cloud.database();
    db.collection("prob")
    .doc("b00064a760a8c74819a7dbb918f1a5d5")
    .update({
      data: {
        prob: newProb
      },
      success: res => {
        console.log(res)
        this.getProb()
        wx.showToast({
          title: '设置成功'
        })
        console.log('[数据库] [更新记录] 更新个数: ', res.stats.updated)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '更新记录失败'
        })
        console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },
  addMe(){
    const db = wx.cloud.database();
    db.collection("zhongjiangyonghu")
    .add({
      data:{

      },
      success: res => {
        console.log(res)
        console.log('[数据库] [添加记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '添加记录失败'
        })
        console.error('[数据库] [添加记录] 失败：', err)
      }
    })
  },
})

