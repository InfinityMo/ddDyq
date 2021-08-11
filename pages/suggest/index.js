Page({
  data: {
    mode: false, //暗黑模式
    suspensionShow: false,
    tabs: ["采纳建议", "本月建议"],
    tabIndex: 0,
    adpotAdvise: false,
    monthAdvise: true
  },
  tabClick(e) {
    const tabIndex = e.target.dataset.index;
    tabIndex === 0
      ? this.setData({ tabIndex, adpotAdvise: false, monthAdvise: true })
      : this.setData({ tabIndex, adpotAdvise: true, monthAdvise: false });
  },
  onLoad(query) {
    // 页面加载
  },
  onReady() {
    // 页面加载完成
         
  },
  onShow() {
    // 页面显示
    this.setData({ mode: getApp().globalData.isAnonymous });
    getApp().watch(value => {
      this.setData({ mode: value });
    });
    this.setData({ suspensionShow: true });
  },
  onHide() {
    // 页面隐藏
    // this.setData({ suspensionShow: false });
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: "My App",
      desc: "My App description",
      path: "pages/index/index"
    };
  }
});
