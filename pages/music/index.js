// pages/play/index.js
const innerAudioContext = wx.createInnerAudioContext()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicurl: '',
    poster: "http://p1.music.126.net/MtofDr4IqworgZ7Ri3HY_g==/109951163064544587.jpg",

    bgSrc: 'https://dwz.cn/wbPxDoMM',
    songDetails: {},
    playIco: './imgs/pause.svg'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this
    let playIco = this.data.playIco == './imgs/pause.svg' ? './imgs/play.svg' : './imgs/pause.svg'
    innerAudioContext.autoplay = true
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${options.songid}.mp3`
    innerAudioContext.onPlay(() => {
      _this.setData({ playIco })
    })
    innerAudioContext.onPause(() => {
      _this.setData({ playIco })
    })
    this.songDetails(options.songid)
    // this.setData({
    //   musicurl: `https://music.163.com/song/media/outer/url?id=${options.songid}.mp3`
    // });
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
  // 根据id获取音乐
  handleSearch(songid) {
    console.log('获取搜索传参', songid);
    wx.request({
      url: `https://music.163.com/song/media/outer/url?id=${songid}.mp3`,
      success: (res) => {
        console.log('搜索=====>>>', res)
      }
    })
  },
  // 拖动进度
  timeSliderChanged(e) {
    console.log('进度', e)
  },
  // 音乐播放控制
  playControl() {
    this.data.playIco == './imgs/pause.svg'
      ? innerAudioContext.pause()
      : innerAudioContext.play()
  },
  // 获取歌曲详情
  songDetails(id = 1348044876) {
    const _this = this
    wx.request({
      url: `http://wyyyy.xyz:3000/song/detail?ids=${id}`,
      success: res => {
        console.log('获取成功', res);
        if (res.data.code != 200) return;
        _this.setData({
          songDetails: res.data.songs[0]
        })
      },
      fail: err => { }
    })
  }
})