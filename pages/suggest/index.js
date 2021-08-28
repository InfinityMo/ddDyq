import { createUUID } from "/common/utils/utils";
Page({
  data: {
    mode: false, //暗黑模式
    suspensionShow: false,
    tabs: ["本月建议", "采纳建议"],
    tabIndex: 0,
    adpotAdvise: true,
    monthAdvise: false,
    monthKey: "",
    adoptKey: ""
  },
  tabClick(e) {
    const tabIndex = e.target.dataset.index;
    tabIndex === 0
      ? this.setData({ tabIndex, adpotAdvise: true, monthAdvise: false })
      : this.setData({ tabIndex, adpotAdvise: false, monthAdvise: true });
  },
  onLoad(query) {
    this.setData({ monthKey: createUUID(), adoptKey: createUUID() });
    // 页面加载
    // getApp().tokenCallback = token => {
    //   if (token != "") {
    //     this.getDynamicData();
    //   }
    // };
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
    this.data.tabIndex === 0
      ? this.setData({ monthKey: createUUID() })
      : this.setData({ adoptKey: createUUID() });
  },
  onReachBottom() {
    // 页面被拉到底部
  }
});
