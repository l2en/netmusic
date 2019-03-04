//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    picSrc: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
    movieList: [{
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      }, {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      },
      {
        pic: 'http://img2.imgtn.bdimg.com/it/u=2728111176,1787116770&fm=26&gp=0.jpg',
        name: '冰雪奇缘'
      }
    ],
    hideHeader: true
  },
  //事件处理函数
  bindTap(){
    wx.navigateTo({
      url: "../play/index"
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
  }
})