// pages/play/index.js
const time = require('../../utils/time.js');
const baseUrl = require('../../utils/baseUrl.js');

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
    playIco: '../../assets/ico/pause.svg',
    showPlayList: true,
    sliderCurrentVal: 0,
    duration: 0,
    musicDurationTime: '--:--',
    playedTime: '0:00',
    lrc: [],
    playActive: 'music-play-active',
    currentlrcIndex: null,
    currentTime: 0,
    lrcScrollTop: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options = {
    songid: 571338279
  }) {
    this.newAduio(options);
    this.songDetails(options.songid);
    this.playEnded();
    this.onPause();
    this.onPlay();
    this.getLrc(options.songid);
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
        return res.data
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.playUpdate()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.backPlay()
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  newAduio(options) {
    innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=${options.songid}.mp3`
    // innerAudioContext.src = `https://music.163.com/song/media/outer/url?id=1348044876.mp3`
    innerAudioContext.autoplay = true;
    this.canPlay()
  },
  // 根据id获取音乐
  handleSearch(songid) {
    wx.request({
      url: `https://music.163.com/song/media/outer/url?id=${songid}.mp3`,
      success: (res) => {
      }
    })
  },
  // 音乐播放控制
  playControl() {
    const {
      playIco
    } = this.data;
    playIco == '../../assets/ico/pause.svg' && innerAudioContext.pause();
    playIco == '../../assets/ico/pause.svg' || innerAudioContext.play();
  },
  // 拖动进度
  timeSliderChanged(e) {
    const {
      duration
    } = this.data;
    let positionNum = duration / 100 * e.detail.value
    this.seek(positionNum)
  },
  // 监听音乐播放进度
  playUpdate() {
    const _this = this
    innerAudioContext.onTimeUpdate(() => {
      let duration = innerAudioContext.duration,
        currentTime = innerAudioContext.currentTime,
        sliderCurrentVal = (100 / duration) * currentTime;
      let currentlrcIndex= _this.handleCurrentIndex(currentTime);
      _this.setData({
        sliderCurrentVal,
        currentlrcIndex,
        currentTime,
        playedTime: time.timeFormat(currentTime)
      })
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
        playIco: '../../assets/ico/play.svg'
      })
    })
  },
  // 检测音乐是否可播放（同时获取音乐总时长）
  canPlay() {
    const _this = this
    innerAudioContext.onCanplay(() => {
      setTimeout(function() {
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
        playIco: '../../assets/ico/pause.svg',
      })
    })
  },
  // 播放结束
  playEnded() {
    const _this = this
    innerAudioContext.onEnded(() => {
      _this.setData({
        playIco: '../../assets/ico/play.svg'
      })
    })
  },
  // 获取歌曲详情
  songDetails(id = 571338279) {
    const _this = this
    wx.request({
      url: `${baseUrl.baseUrl}/song/detail?ids=${id}`,
      success: res => {
        if (res.data.code != 200) return;
        _this.setData({
          songDetails: res.data.songs[0]
        })
      },
      fail: err => {}
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
  },
  // 歌词获取
  getLrc(id = 571338279) {
    const _this = this;
    // 歌词格式化成数组
    function parseLyric(text) {
      var lines = text.split('\n'), //将文本按行分隔，存入数组
        pattern = /\[\d*:\d*((\.|\:)\d*)*\]/g, //正则表达式
        result = []; //保存最终结果的数组
      lines.forEach(function(v, index, arr) {
        var time = v.match(pattern), //返回与正则匹配的字符串的数组，正则中有/g，为全部
          value = v.replace(pattern, ''); //提取歌词
        if (time) {
          var t = time[0].slice(1, -1).split(':'); //去掉时间里的中括号并分割
          if (t.length === 3) { //[00:00:00]
            result.push([parseInt(t[0], 10) * 60 + parseInt(t[1]) + parseFloat("0." + t[2]), value]); //最终数组
          } else {
            result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
          }
        }
      });
      //将元素按时间大小排序，貌似没有必要
      result.sort(function(a, b) {
        return a[0] - b[0];
      });
      return result;
    }
    wx.request({
      url: `${baseUrl.baseUrl}/lyric?id=${id}`,
      success: res => {
        if (res.data.nolyric) {
          _this.setData({
            lrc: [['nolrc', '暂无歌词']]
          })
        } else {
          const lrc = parseLyric(res.data.lrc.lyric)
          _this.setData({
            lrc
          })
        }
      }
    })
  },
  // 滑动歌词
  scrollChange(e) {
  },
  // 确定当前歌词index
  handleCurrentIndex(currentTime){
    const _this = this
    const { lrc } = this.data
    let lrcScrollTop = (this.data.duration / lrc[lrc.length - 1][0]) * currentTime*21
    this.setData({
      lrcScrollTop
    })
  }
})