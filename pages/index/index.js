const tool = require('../../utils/tool.js');

Page({
  data: {
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 5000,
    duration: 1000,
    previousMargin: 0,
    nextMargin: 0,
    indicatorDots:true,
    addAnimationDown: false,
    addAnimationUp: false,
    banners: [],
    tjgd:[]
  },
  onLoad(){
    this.getBanner();
    this.gettjgd();
  },
  onHide(){

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
  // get banner
  getBanner(){
    wx.request({
      url: 'http://wyyyy.xyz:3000/banner',
      success:res=>{
        const {code, banners} = res.data;
        if(code != 200) return;
        this.setData({ banners })
      },
      complete:res=>{
        console.log(res)
      }
    })
  },
  gettjgd(){
    wx.request({
      url: 'http://wyyyy.xyz:3000/personalized',
      success:res=>{
        const {code, result} = res.data;
        this.setData({tjgd: result})
      }
    })
  },
})