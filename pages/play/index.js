// pages/play/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicurl: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      musicurl: `https://music.163.com/song/media/outer/url?id=${options.songid}.mp3`
    });

    wx.playBackgroundAudio({
      dataUrl: `https://music.163.com/song/media/outer/url?id=${options.songid}.mp3`,
      title: '皮皮听音乐',
      coverImgUrl: ''
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
})