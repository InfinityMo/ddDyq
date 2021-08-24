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
    pageNo: 1,
    dynamics: []
  },
  toSupport(event) {
    const id = event.target.dataset.id;
    const anonymousName = event.target.dataset.anonymousName;
    const findIndex = this.data.dynamics.findIndex(
      item => item.topic.id === id
    );
    // debugger
    if (findIndex >= 0) {
      const ownSupport = `dynamics[${findIndex}].topic.isCurrentUserUp`;
      const support = `dynamics[${findIndex}].topic.upIdNames`;
      const upCount = `dynamics[${findIndex}].topic.upCount`;
      const value =
        this.data.dynamics[findIndex].topic.isCurrentUserUp === "0" ? "1" : "0";
      const supportArr = this.data.dynamics[findIndex].topic.upIdNames;
      console.log(this.data[upCount])
      this.setData({
        [ownSupport]: value,
        [support]: [
          {
            userId: getApp().userData.id,
            userName: getApp().userData.username
          },
          ...supportArr
        ],
        [upCount]:
          value === "1" ? this.data[upCount] + 1 : this.data[upCount] - 1
      });
      this.postSupport(id, anonymousName);
    }
    // dd.getNetworkType({
    //   success: res => {
    //     // dd.alert({
    //     //   title: `${res.networkAvailable} - ${res.networkType}`
    //     // });
    //     if (res.networkAvailable) {
    //       const id = event.target.dataset.id;
    //       const findIndex = this.data.dynamics.findIndex(
    //         item => item.id === id
    //       );
    //       if (findIndex >= 0) {
    //         const ownSupport = `dynamics[${findIndex}].interaction.ownSupport`;
    //         const support = `dynamics[${findIndex}].interaction.support`;
    //         const value =
    //           this.data.dynamics[findIndex].interaction.ownSupport === 0
    //             ? 1
    //             : 0;
    //         const supportArr = this.data.dynamics[findIndex].interaction
    //           .support;
    //         this.setData({
    //           [ownSupport]: value,
    //           [support]: [{ userId: "234", name: "xxx" }, ...supportArr]
    //         });
    //       }
    //     } else {
    //       dd.showToast({
    //         type: "fail",
    //         content: "网络有问题",
    //         duration: 3000
    //       });
    //     }
    //   }
    // });
  },
  postSupport(id, anonymousName) {
    request
      .post({
        url: "dynamic/vote",
        params: {
          id: id,
          anonymousName: getApp().globalData.isAnonymous ? anonymousName : "",
          isAnonymous: getApp().globalData.isAnonymous
        }
      })
      .then(res => {
        // this.setData({ total: res.allTopicsNum, dynamics: [...res.topicList] });
        // dd.stopPullDownRefresh();
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
      desc:
        "如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示如果在Page中定义了e函数，此时该页面右上角菜单中会显示分享按钮，反之不显示",
      imageUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201605%2F10%2F20160510001106_2YjCN.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631869211&t=e83f3049c646769768f51ba6144ec26a",
      path
    };
  },
  // 删除
  deleteHandle(e) {
    const id = e.target.dataset.id;
    const findIndex = this.data.dynamics.findIndex(
      item => item.topic.id === id
    );
    if (findIndex >= 0) {
      this.$spliceData({ dynamics: [findIndex, 1] });
      request.post({
        url: "dynamic/delete",
        params: { id }
      });
    }
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
  lower(e) {
    console.log(this.data.dynamics.length, this.data.total);
    if (this.data.dynamics.length < this.data.total) {
      this.setData({ pageNo: ++this.data.pageNo }, () => {
        this.getDynamicData();
      });
    }
  },
  getDynamicData() {
    request
      .get({ url: "dynamic", params: { pageNo: this.data.pageNo } })
      .then(res => {
        this.setData({
          total: res.allTopicsNum,
          dynamics: [...this.data.dynamics, ...res.topicList]
        });
        dd.stopPullDownRefresh();
      });
  },
  onLoad() {
    // 页面加载
    setTimeout(() => {
      this.getDynamicData();
    }, 2000);
  },
  onReady() {
    // 页面加载完成
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
    this.setData({ pageNo: 1 }, () => {
      this.getDynamicData();
    });

    // setTimeout(() => {
    //   dd.stopPullDownRefresh();
    // }, 2000);
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
