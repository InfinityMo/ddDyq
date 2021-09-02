import { encodeUrl, ddToast, debounce } from "/common/utils/utils";
import request from "/common/request/request";
Page({
  data: {
    mode: false, //暗黑模式
    focus: false,
    inputHeight: "",
    isShowInput: false,
    placeholder: "",
    shareId: "",
    shareImg:
      "https://lianen-data-develop.oss-cn-shanghai.aliyuncs.com/topic/share/45cd733d-c529-45b8-ac60-abba81927981.png?Expires=1631554229&OSSAccessKeyId=LTAI5t9iqts8pXE9AdrwCyDn&Signature=T5nYSZnFL00jVQU%2B2TT08ZARKec%3D",
    total: 0,
    pageNo: 1,
    dynamics: [],
    baselineShow: false,
    commentObj: {},
    commentComment: "",
    netWorkError: false,
    errorNodata: true
  },
  toSupport(event) {
    const { id, anonymousName } = event.target.dataset;
    const findIndex = this.data.dynamics.findIndex(
      item => item.topic.id === id
    );
    if (findIndex >= 0) {
      const ownSupport = `dynamics[${findIndex}].topic.isCurrentUserUp`;
      const support = `dynamics[${findIndex}].topic.upIdNames`;
      const upCount = `dynamics[${findIndex}].topic.upCount`;
      const value =
        this.data.dynamics[findIndex].topic.isCurrentUserUp === "0" ? "1" : "0";
      const supportArr = this.data.dynamics[findIndex].topic.upIdNames;
      const upCountValue = this.data.dynamics[findIndex].topic.upCount;
      this.postSupport(id, anonymousName).then(res => {
        if (res) {
          // 点赞
          if (value === "1") {
            this.setData({
              [ownSupport]: value,
              [support]: [
                {
                  userId: getApp().userData.id,
                  userName: getApp().globalData.isAnonymous
                    ? anonymousName
                    : getApp().userData.username
                },
                ...supportArr
              ],
              [upCount]: upCountValue + 1
            });
          } else {
            //取消赞
            // 获取当前用户点赞的index
            const ownIndex = supportArr.findIndex(
              item => item.userId == getApp().userData.id
            );
            if (ownIndex >= 0) {
              this.setData({
                [ownSupport]: value,
                [upCount]: upCountValue - 1
              });
              this.$spliceData({ [support]: [ownIndex, 1] });
            }
          }
        }
      });
    }
  },
  postSupport(id, anonymousName) {
    return new Promise((resolve, reject) => {
      request
        .post(
          {
            url: "dynamic/vote",
            params: {
              id: id,
              anonymousName: getApp().globalData.isAnonymous
                ? anonymousName
                : "",
              anonymous: getApp().globalData.isAnonymous
            }
          },
          false
        )
        .then(res => {
          if (res) {
            resolve(true);
          }
        });
    });
  },
  toComment(event) {
    const { anonymousName, commentId, authorName } = event.target.dataset;
    const topicId = event.target.dataset.id || "";
    this.setData({
      placeholder: `回复${authorName}`,
      commentObj: {
        content: "",
        topicId,
        commentId,
        anonymousName: getApp().globalData.isAnonymous ? anonymousName : "",
        isAnonymous: getApp().globalData.isAnonymous
      }
    });
    this.onFocus();
    // debounce(this.onFocus).bind(this)()
  },
  textareaInput(e) {
    // const value = e.detail.value.trim();
    const { value } = e.detail;
    if (value.trim().length > 0) {
      this.setData({ commentComment: value, "commentObj.content": value });
    } else {
      this.setData({ commentComment: "", "commentObj.content": value });
    }
  },
  publishComment() {
    request
      .post({
        url: "dynamic/comment",
        params: this.data.commentObj
      })
      .then(res => {
        if (res.code === 204) {
          this.setData({
            commentComment: "",
            commentObj: {},
            placeholder: ""
          });
          ddToast({ type: "fail", text: "部分文字无法通过审核，请检查" });
          return false;
        }
        if (res) {
          const topicIndex = this.data.dynamics.findIndex(
            item => item.topic.id === res.topicId
          );
          if (topicIndex >= 0) {
            const comments = `dynamics[${topicIndex}].comments`;
            this.$spliceData({
              [comments]: [this.data.dynamics.length, 0, { ...res }]
            });
            this.setData({
              commentComment: "",
              commentObj: {},
              placeholder: ""
            });
          }
        }
      });
  },
  // 转发
  sharehandle(e) {
    const shareId = e.target.dataset.id;
    const target = this.data.dynamics.filter(
      item => item.topic.id === shareId
    )[0];
    this.setData({ shareId });
    if (target && target.topic.avatars.length > 0) {
      this.setData({ shareImg: target.topic.avatars[0] });
    }
  },
  onShareAppMessage(option) {
    const { shareId, shareImg } = this.data;
    this.setData({
      shareImg:
        "https://lianen-data-develop.oss-cn-shanghai.aliyuncs.com/topic/share/45cd733d-c529-45b8-ac60-abba81927981.png?Expires=1631554229&OSSAccessKeyId=LTAI5t9iqts8pXE9AdrwCyDn&Signature=T5nYSZnFL00jVQU%2B2TT08ZARKec%3D"
    });
    const path = shareId
      ? `pages/detail/dynamicinfo/index?id=${shareId}`
      : "pages/dynamic/index";
    // 返回自定义分享信息
    return {
      title: "小程序",
      desc: shareId ? "您的好友给您分享了一条动态" : "",
      imageUrl: shareImg,
      path
    };
  },
  // 删除
  deleteHandle(e) {
    dd.confirm({
      title: "提示",
      content: "确定删除该条动态？",
      confirmButtonText: "是",
      cancelButtonText: "否",
      success: result => {
        if (result.confirm) {
          const id = e.target.dataset.id;
          const findIndex = this.data.dynamics.findIndex(
            item => item.topic.id === id
          );
          if (findIndex >= 0) {
            request
              .post({
                url: "dynamic/delete",
                params: { id }
              })
              .then(res => {
                this.$spliceData({ dynamics: [findIndex, 1] });
              });
          }
        }
      }
    });
  },
  // onFocus() {
  //   this.setData({ focus: true, isShowInput: true });
  // },
  onFocus: debounce(function(e) {
    this.setData({ focus: true, isShowInput: true });
  }, 200),
  onBlur() {
    this.setData({ focus: false, isShowInput: false, commentComment: "" });
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
    if (this.data.dynamics.length < this.data.total) {
      this.setData({ pageNo: ++this.data.pageNo }, () => {
        this.getDynamicData();
      });
    } else {
      this.setData({ baselineShow: true });
    }
  },
  getDynamicData() {
    this.setData({ baselineShow: false, netWorkError: false });
    request
      .get({ url: "dynamic", params: { pageNo: this.data.pageNo } })
      .then(res => {
        this.setData(
          {
            total: res.allTopicsNum,
            dynamics: [...this.data.dynamics, ...res.topicList]
          },
          () => {
            this.setData({
              errorNodata: this.data.dynamics.length > 0,
              netWorkError: false
            });
          }
        );
        dd.stopPullDownRefresh();
      })
      .catch(err => {
        this.setData({ netWorkError: true, errorNodata: false });
        dd.stopPullDownRefresh();
      });
  },
  onLoad() {
    // 页面加载
    if (getApp().globalData.token) {
      this.setData({ pageNo: 1, dynamics: [] }, () => {
        this.getDynamicData();
      });
    } else {
      getApp().tokenCallback = token => {
        if (token != "") {
          this.setData({ pageNo: 1, dynamics: [] }, () => {
            this.getDynamicData();
          });
        }
      };
    }
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    this.setData({ mode: getApp().globalData.isAnonymous });
    getApp().watch(value => {
      this.setData({ mode: value });
    });
  },
  onHide() {
    // 页面隐藏
  },
  // onUnload () {
  //   // 页面被关闭
  // },
  // onTitleClick () {
  //   // 标题被点击
  // },
  onPullDownRefresh() {
    this.setData({ pageNo: 1, dynamics: [] }, () => {
      this.getDynamicData();
    });
  }
  // onReachBottom () {
  //   // 页面被拉到底部
  // },
});
