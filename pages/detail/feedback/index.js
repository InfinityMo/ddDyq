import request from "/common/request/request";
Page({
  data: {
    mode: false, //暗黑模式
    adpotDeatil: null,
    adoptComment: [],
    placeholder: "一起讨论吧...",
    focus: false,
    commentComment: "",
    commentObj: {},
    pageNo: 1,
    total: 0,
    baselineShow: false
  },
  textareaInput(e) {
    const content = e.detail.value.trim();
    if (content.length > 0) {
      this.setData({ commentComment: content, "commentObj.content": content });
    }
  },
  publishComment() {
    const params = {
      content: this.data.commentObj.content,
      opinionId: this.data.commentObj.opinionId,
      opinionCommentId: this.data.commentObj.opinionCommentId || "",
      anonymousName: getApp().globalData.isAnonymous
        ? this.data.adpotDeatil.anonymousName
        : "",
      isAnonymous: getApp().globalData.isAnonymous
    };
    request
      .post({
        url: "opinion/comment",
        params
      })
      .then(res => {
        if (res) {
          this.$spliceData({
            adoptComment: [this.data.adoptComment.length, 0, { ...res }]
          });
          this.setData({
            placeholder: "一起讨论吧...",
            commentComment: "",
            commentObj: {}
          });
        }
      });
  },
  toSupport(e) {
    const { id, anonymousName, action } = e.target.dataset;
    let countString = "";
    let countValue = 0;
    let actionString = "";
    let actionValue = false;
    if (action === "up") {
      countString = `adpotDeatil.upCount`;
      countValue = this.data.adpotDeatil.upCount;
      actionString = `adpotDeatil.isCurrentUserUp`;
      actionValue = this.data.adpotDeatil.isCurrentUserUp;
    } else {
      countString = `adpotDeatil.downCount`;
      countValue = this.data.adpotDeatil.downCount;
      actionString = `adpotDeatil.isCurrentUserDown`;
      actionValue = this.data.adpotDeatil.isCurrentUserDown;
    }
    request
      .post(
        {
          url: "opinion/vote",
          params: {
            id,
            action,
            anonymousName: getApp().globalData.isAnonymous ? anonymousName : "",
            isAnonymous: getApp().globalData.isAnonymous
          }
        },
        false
      )
      .then(res => {
        if (res) {
          this.setData({
            [actionString]: !actionValue,
            [countString]: actionValue ? countValue - 1 : countValue + 1
          });
        }
      });
  },
  commentToSupport(e) {
    const { id, action } = e.target.dataset;
    const anonymousName = this.data.adpotDeatil.anonymousName;
    const findIndex = this.data.adoptComment.findIndex(item => item.id === id);
    if (findIndex >= 0) {
      let countString = "";
      let countValue = 0;
      let actionString = "";
      let actionValue = false;
      if (action === "up") {
        countString = `adoptComment[${findIndex}].upCount`;
        countValue = this.data.adoptComment[findIndex].upCount;
        actionString = `adoptComment[${findIndex}].isCurrentUserUp`;
        actionValue = this.data.adoptComment[findIndex].isCurrentUserUp;
      } else {
        countString = `adoptComment[${findIndex}].downCount`;
        countValue = this.data.adoptComment[findIndex].downCount;
        actionString = `adoptComment[${findIndex}].isCurrentUserDown`;
        actionValue = this.data.adoptComment[findIndex].isCurrentUserDown;
      }
      request
        .post(
          {
            url: "opinion/comment/vote",
            params: {
              id,
              action,
              anonymousName: getApp().globalData.isAnonymous
                ? anonymousName
                : "",
              isAnonymous: getApp().globalData.isAnonymous
            }
          },
          false
        )
        .then(res => {
          if (res) {
            this.setData({
              [actionString]: !actionValue,
              [countString]: actionValue ? countValue - 1 : countValue + 1
            });
          }
        });
    }
  },
  toComment(event) {
    const authorId = event.target.dataset.authorId;
    const authorName = event.target.dataset.authorName;
    this.setData({ placeholder: `回复${authorName}` });
    this.onFocus();
  },
  replyComment(e) {
    const { opinionCommentId, authorName } = e.target.dataset;
    this.setData({
      placeholder: `回复${authorName}`,
      "commentObj.opinionCommentId": opinionCommentId
    });
    this.onFocus();
  },
  onFocus() {
    this.setData({ focus: true });
  },
  onBlur() {
    this.setData({ focus: false, placeholder: "一起讨论吧..." });
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
  getDetailData() {
    this.setData({ baselineShow: false });
    request
      .get({ url: "opinion/detail", params: { id: this.data.commentObj.opinionId, pageNo: this.data.pageNo } })
      .then(res => {
        this.setData({
          total: res.solutionCommentCount,
          adpotDeatil: { ...res.opinion },
          adoptComment: [...this.data.adoptComment, ...res.solutionComment]
        });
        dd.stopPullDownRefresh();
      });
  },
  lower(e) {
    if (this.data.adoptComment.length < this.data.total) {
      this.setData({ pageNo: ++this.data.pageNo }, () => {
        this.getDetailData();
      });
    } else {
      this.setData({ baselineShow: true });
    }
  },
  onLoad(query) {
    // 页面加载
    const { id  } = query;
    if (id) {
      this.setData({ "commentObj.opinionId": id });
      setTimeout(() => {
        this.getDetailData();
      }, 2000);
    }
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
  // onUnload () {
  //   // 页面被关闭
  // },
  // onTitleClick () {
  //   // 标题被点击
  // },
  showDelete() {
    this.setData({ isDelete: !this.data.isDelete });
  },
  onPullDownRefresh() {
    this.setData({ pageNo: 1, total: 0, adpotDeatil: null, adoptComment: [] }, () => {
      this.getDetailData();
    });
  },
  // onReachBottom () {
  //   // 页面被拉到底部
  // },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: "畅言",
      desc: "My App description",
      path: "pages/detail/feedback/index"
    };
  }
});
