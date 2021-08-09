import { dynamics } from "/data/testData";
Page({
  data: {
    suspensionShow: false,
    tabs: ["我的动态", "我的建议"],
    tabIndex: 0,
    mydynamicHide: false,
    mysuggestHide: true,
    userInfo: {
      avatar: "/image/user/cat.png",
      name: "Infinity",
      userId: "tytrrwrw",
      company: "上海联恩商钥互联网科技股份有限公司"
    },
    dynamics
  },
  tabClick(e) {
    const tabIndex = e.target.dataset.index;
    tabIndex === 0
      ? this.setData({ tabIndex, mydynamicHide: false, mysuggestHide: true })
      : this.setData({ tabIndex, mydynamicHide: true, mysuggestHide: false });
  },
  onLoad(query) {
    // 页面加载
    // console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
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
