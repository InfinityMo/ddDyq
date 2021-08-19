import { encodeUrl } from "/common/utils/utils";
import request from "/common/request/request";
Page({
  data: {
    mode: false, //暗黑模式
    focus: false,
    inputHeight: "",
    isShowInput: false,
    placeholder: "",
    shareId: "",
    total: 0,
    dynamics: []
  },
  toSupport(event) {
    dd.getNetworkType({
      success: res => {
        // dd.alert({
        //   title: `${res.networkAvailable} - ${res.networkType}`
        // });
        if (res.networkAvailable) {
          const id = event.target.dataset.id;
          const findIndex = this.data.dynamics.findIndex(
            item => item.id === id
          );
          if (findIndex >= 0) {
            const ownSupport = `dynamics[${findIndex}].interaction.ownSupport`;
            const support = `dynamics[${findIndex}].interaction.support`;
            const value =
              this.data.dynamics[findIndex].interaction.ownSupport === 0
                ? 1
                : 0;
            const supportArr = this.data.dynamics[findIndex].interaction
              .support;
            this.setData({
              [ownSupport]: value,
              [support]: [{ userId: "234", name: "xxx" }, ...supportArr]
            });
          }
        } else {
          dd.showToast({
            type: "fail",
            content: "网络有问题",
            duration: 3000
          });
        }
      }
    });
  },
  toComment(event) {
    const authorName = event.target.dataset.authorName;
    this.setData({ placeholder: `回复${authorName}` });
    this.onFocus();
  },
  // 转发
  sharehandle(e) {
    const shareId = e.target.dataset.id;
    this.setData({ shareId });
    // this.onShareAppMessage(id)
  },
  onShareAppMessage(option) {
    const id = this.data.shareId;
    const path = id
      ? `pages/detail/dynamicinfo/index?id=${id}`
      : "pages/dynamic/index";
    // 返回自定义分享信息
    return {
      title: "动态",
      desc:'如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示',
      imageUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201605%2F10%2F20160510001106_2YjCN.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631869211&t=e83f3049c646769768f51ba6144ec26a",
      path
    };
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
  // 预览图片
  previewImg(e) {
    const index = e.target.dataset.index || 0;
    const id = e.target.dataset.id || 0;
    const target = this.data.dynamics.filter(item => item.topic.id === id)[0];
    if (target) {
      dd.previewImage({
        current: index,
        urls: [...target.topic.avatars]
      });
    }
  },
  // 查看详情
  toDetail(e) {
    const id = e.target.dataset.id;
    const url = encodeUrl("/pages/detail/dynamicinfo/index", { id });
    dd.navigateTo({ url });
  },
  onLoad(query) {
    // console.log()
    // 页面加载
    // getApp().watch(() => {
    //   debugger;
    // });
    this.getDynamicData();
  },
  onReady() {
    // 页面加载完成
    // request.get({ url: "longhua/test",params:{content:'567'} }).then(res => {
    //   console.log(res);
    // });
  },
  getDynamicData() {
    request.mock({ url: "dynamic" }).then(res => {
      this.setData({ total: res.allTopicsNum, dynamics: [...res.topics] });
    });
  },
  onShow() {
    // dd.getNetworkType({
    //   success: res => {
    //     dd.alert({
    //       title: `${res.networkAvailable} - ${res.networkType}`
    //     });
    //   }
    // });
    this.setData({ mode: getApp().globalData.isAnonymous });
    getApp().watch(value => {
      this.setData({ mode: value });
    });
  },
  onHide() {
    // 页面隐藏
    // this.setData({ mode: getApp().globalData.isAnonymous });
  },
  // onUnload () {
  //   // 页面被关闭
  // },
  // onTitleClick () {
  //   // 标题被点击
  // },
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
