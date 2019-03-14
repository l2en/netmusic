const tool = require('../../utils/tool.js');

Page({
  data: {
    vertical: false,
    autoplay: false,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    indicatorDots:true,
    addAnimationDown: false,
    addAnimationUp: false,
    imgUrls: [
      'https://dwz.cn/3XPwC4GG',
      'https://dwz.cn/vOyBW22b',
      'https://dwz.cn/8QAsi2Dd'
    ],
  },
  //事件处理函数
  bindTap(){
    wx.navigateTo({
      url: "../mv/index"
    })
  },
  /*上拉加载更多*/
  onReachBottom: function () {
    console.log('加载更多')
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    setTimeout(()=>{
      wx.hideLoading();
    }, 3000)
  },
  // 搜索
  toSearch(){
    wx.navigateTo({
      url: '../search/index',
    })
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
      let direction = tool.getTouchcolum(endX, endY, startX, startY);
      if (direction == 'down'){
        this.setData({ addAnimationDown: false})
      } else{
        this.setData({ addAnimationDown: true })
      }
    })
  },
})