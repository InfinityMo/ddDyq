Page({
  data: {
    suspensionShow: false,
    tabs: ["采纳建议", "本月建议"],
    tabIndex: 0,
    adpotAdvise: false,
    monthAdvise: true,
    adoptSuggests: [
      {
        title: "男卫生间加一个全身镜",
        content:
          "经过同事反馈，男性也需要着装整理，所以为了男同胞们的形象，在每一层男卫生间安装一面全身镜，目前已经解决了这个问题",
        supportCount: "234",
        isSelfSupport: "1",
        treadCount: "20",
        isSelfTread: "0"
      },
      {
        title: "女卫生间多加几个位置",
        content:
          "经过同事反馈，女卫生间经常性位置不够，经过与行政部分协调，现已在多层女卫生间中多加了位置，这个问题目前已得到解决",
        supportCount: "534",
        isSelfSupport: "0",
        treadCount: "20",
        isSelfTread: "1"
      }
    ]
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
    this.setData({ suspensionShow: true });
  },
  onHide() {
    // 页面隐藏
    this.setData({ suspensionShow: false });
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
