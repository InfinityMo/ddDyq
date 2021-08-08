import { frontdynamicInfo } from "/data/testData";
Page({
  data: {
    focus: false,
    inputHeight: "",
    isShowInput: false,
    placeholder: "",
    dynamics: frontdynamicInfo,
    isDelete: false
  },
  toSupport(event) {
    const id = event.target.dataset.id;
    const findIndex = this.data.dynamics.findIndex(item => item.id === id);
    if (findIndex >= 0) {
      const ownSupport = `dynamics[${findIndex}].interaction.ownSupport`;
      const support = `dynamics[${findIndex}].interaction.support`;
      const value =
        this.data.dynamics[findIndex].interaction.ownSupport === 0 ? 1 : 0;
      const supportArr = this.data.dynamics[findIndex].interaction.support;
      if (value) {
        this.setData({
          [ownSupport]: value,
          [support]: [{ userId: "234", name: "xxx" }, ...supportArr]
        });
      }
    }
  },
  toComment(event) {
    const authorId = event.target.dataset.authorId;
    const authorName = event.target.dataset.authorName;
    this.setData({ placeholder: `回复${authorName}` });
    this.onFocus();
  },
  onFocus() {
    this.setData({ focus: true, isShowInput: true });
  },
  onBlur() {
    this.setData({ focus: false, isShowInput: false });
  },
  onKeyboardHide() {
    this.onBlur();
  },
  previewImg(e) {
    const index = e.target.dataset.index || 0;
    const id = e.target.dataset.id || 0;
    const target = this.data.dynamics.filter(item => item.id === id)[0];
    if (target) {
      dd.previewImage({
        current: index,
        urls: [...target.dynamic.pics]
      });
    }
  },
  // onLoad (query) {
  //   // 页面加载
  //   console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  // },
  // onReady () {
  //   // 页面加载完成
  // },
  // onShow () {
  //   // 页面显示
  // },
  // onHide () {
  //   // 页面隐藏
  // },
  // onUnload () {
  //   // 页面被关闭
  // },
  // onTitleClick () {
  //   // 标题被点击
  // },
  showDelete() {
    this.setData({ isDelete: !this.data.isDelete })
  },
  onPullDownRefresh() {
    setTimeout(() => {
      dd.stopPullDownRefresh();
    }, 2000);
    // 页面被下拉
  }
  // onReachBottom () {
  //   // 页面被拉到底部
  // },
  // onShareAppMessage () {
  //   // 返回自定义分享信息
  //   return {
  //     title: 'My App',
  //     desc: 'My App description',
  //     path: 'pages/index/index',
  //   };
  // },
});
