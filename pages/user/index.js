import { createUUID } from "/common/utils/utils";
Page({
  data: {
    mode: false, //暗黑模式
    tabs: ["我的动态", "我的建议"],
    tabIndex: 0,
    mydynamicHide: false,
    mysuggestHide: true,
    userInfo: {
      ...getApp().userData
    },
    mydynamicKey: '',
    mysuggestKey: ''

  },
  tabClick(e) {
    const tabIndex = e.target.dataset.index;
    tabIndex === 0
      ? this.setData({ tabIndex, mydynamicHide: false, mysuggestHide: true })
      : this.setData({ tabIndex, mydynamicHide: true, mysuggestHide: false });
  },
  onLoad(query) {
    this.setData({ mydynamicKey: createUUID(), mysuggestKey: createUUID() });
    // 页面加载
    setTimeout(() => {
      this.setData({ userInfo: { ...getApp().userData } })
    }, 2000)
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
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
    this.data.tabIndex === 0
      ? this.setData({ mydynamicKey: createUUID() })
      : this.setData({ mysuggestKey: createUUID() });
  },
  onReachBottom() {
    // 页面被拉到底部
  }
});
