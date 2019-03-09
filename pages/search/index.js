// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keywords: '',
    allMatch: [],
    searchValue: '',
    searchListHidden: true,
    songs:[],
    loading: false
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
  // 返回
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  // 监听输入框（搜索推荐）
  handleInput(e) {
    const _this = this
    _this.setData({
      allMatch:[],
      loading: true
    })
    if (!e.detail.value.replace(/\s+/g, '')) return;
    this.setData({
      keywords: e.detail.value.replace(/\s+/g, ''),
      searchValue: e.detail.value.replace(/\s+/g, '')
    });
    function getSuggest() {
      wx.request({
        url: `http://wyyyy.xyz:3000/search/suggest?keywords=${e.detail.value}&type=mobile`,
        success: (res) => {
          console.log('返回', res)
          if (!res.data.result.allMatch) return;
          _this.setData({
            loading: false,
            searchListHidden: false,
            allMatch: res.data.result.allMatch
          })
        },
        fail: (err) => {
          console.log('访问错误', err)
        }
      })
    }
    getSuggest()
  },
  // 根据歌曲id搜索
  handleSearch() {
    const _this = this;
    _this.setData({
      searchListHidden: true,
      loading: true
    })
    const { searchValue } = this.data;
    if (!searchValue) return;
    console.log('点击搜索', searchValue);
    this.setData({
      searchListHidden: true,
    })
    wx.request({
      url: `http://wyyyy.xyz:3000/search?keywords=${searchValue}`,
      success:(res)=>{
        console.log('搜索单曲===》》》》》》', res);
        if (res.statusCode != 200) return;
        _this.setData({
          loading: false,
          songs: res.data.result.songs
        })
      }
    })
  },
  // 键盘右下角回车
  bindconfirm() {
    this.handleSearch()
  },
  // 点击搜索建议的item
  getSearchList(e){
    this.setData({
      searchValue: e.currentTarget.dataset.name
    },()=>{
      this.handleSearch()
    });
  },
  // 播放音乐
  playMusic(e) {
    console.log(e.currentTarget.dataset.id);
    let songid = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `../music/index?songid=${songid}`,
    })
  }
})