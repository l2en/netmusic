// pages/mv/index.js
let tool = require('../../utils/tool.js');

Page({
  /**
   * 页面的初始数据
   */
  data: {
    mvsrc: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    danmuList: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    },
    {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }
    ],
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    scrollHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    setTimeout(()=>{
      const query = wx.createSelectorQuery();
      const _this = this;
      query.select('.wrapper').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec(function (re) {
        console.log('----', re)
        wx.getSystemInfo({
          success: function (res) {
            console.log('----', res);
            _this.setData({ scrollHeight: res.windowHeight - re[0].height});
            console.log('===', _this.data.scrollHeight)
          }
        });
      });
    }, 400)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取按下坐标
  touchStart(e) {
    let startX = e.touches[0].pageX;
    let startY = e.touches[0].pageY;
    this.setData({
      startX: startX,
      startY: startY,
    })
  },

  // 触摸结束
  touchEnd(e) {
    let endX = e.changedTouches[0].pageX;
    let endY = e.changedTouches[0].pageY;
    this.setData({
      endX: endX,
      endY: endY,
    }, () => {
      const {
        endX,
        endY,
        startX,
        startY
      } = this.data
      let direction = tool.getTouchData(endX, endY, startX, startY);
      console.log('方向', direction)
    })
  },

})