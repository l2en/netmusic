// pages/play/index.js
const time = require('../../utils/time.js');
let innerAudioContext = wx.createInnerAudioContext()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    musicurl: '',
    poster: "http://p1.music.126.net/MtofDr4IqworgZ7Ri3HY_g==/109951163064544587.jpg",
    bgSrc: 'https://dwz.cn/wbPxDoMM',
    songDetails: {},
    playIco: './imgs/pause.svg',
    showPlayList: true,
    sliderCurrentVal: 0,
    duration: 0,
    musicDurationTime: '--:--',
    playedTime: '0:00'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.newAduio(options);
    this.songDetails(options.songid);
    this.playEnded();
    this.onPause();
    this.onPlay()
  },
  // 存数据到localstorage
  saveData2Storage(key, val) {
    wx.setStorage({
      key: key,
      data: val
    })
  },
  // 从localstorage读取数据
  getData4Storagr(key) {
    wx.getStorage({
      key: key,
      success(res) {
        console.log(res.data);
        return res.data
      }
    })
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
    this.playUpdate()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.backPlay()
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
  newAduio(options) {
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${options.songid}.mp3`
    // innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=1348044876.mp3`
    innerAudioContext.autoplay = true;
    this.canPlay()
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
  // 音乐播放控制
  playControl(e) {
    const { playIco } = this.data;
    playIco == './imgs/pause.svg' && innerAudioContext.pause();
    playIco == './imgs/pause.svg' || innerAudioContext.play();
  },
  // 拖动进度
  timeSliderChanged(e) {
    console.log('进度', e.detail.value);
    const { duration} = this.data;
    let positionNum = duration / 100 * e.detail.value 
    this.seek(positionNum)
  },
  // 监听音乐播放进度
  playUpdate() {
    const _this = this
    innerAudioContext.onTimeUpdate(() => {
      let duration = innerAudioContext.duration,
        currentTime = innerAudioContext.currentTime,
        sliderCurrentVal = (100 / duration) * currentTime
      _this.setData({ sliderCurrentVal, playedTime: time.timeFormat(currentTime) })
    })
  },
  // 跳转至指定位置
  seek(num) {
    innerAudioContext.seek(num)
  },
  // 取消监听音乐播放进度
  offTimeUpdate() {

  },
  // 监听音乐暂停函数
  onPause() {
    const _this = this
    innerAudioContext.onPause(() => {
      _this.setData({
        playIco: './imgs/play.svg'
      })
    })
  },
  // 检测音乐是否可播放（同时获取音乐总时长）
  canPlay() {
    const _this = this
    innerAudioContext.onCanplay(() => {
      setTimeout(function () {
        let duration = innerAudioContext.duration
        _this.setData({
          musicDurationTime: time.timeFormat(duration),
          duration
        })
      }, 1000)
    })
  },
  // 监听音乐播放函数
  onPlay() {
    const _this = this
    innerAudioContext.onPlay(() => {
      _this.setData({
        playIco: './imgs/pause.svg',
      })
    })
  },
  // 播放结束
  playEnded() {
    const _this = this
    innerAudioContext.onEnded(() => {
      _this.setData({
        playIco: './imgs/play.svg'
      })
    })
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
  },
  // 后台播放
  backPlay() {
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    backgroundAudioManager.title = '黎明前的黑暗'
    backgroundAudioManager.epname = '黎明前的黑暗'
    backgroundAudioManager.singer = 'NCF'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = 'https://music.163.com/song/media/outer/url?id=1345312401.mp3'
  },
  // 播放列表选中音乐
  playFromList(id) {
    this.setData({
      showPlayList: true
    })
  },
  // 显示播放列表
  moreList() {
    this.setData({
      showPlayList: false
    })
  }
})