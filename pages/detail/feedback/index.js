import request from "/common/request/request";
Page({
  data: {
    mode: false, //暗黑模式
    adpotDeatil: {},
    adoptComment: [],
    placeholder: "一起讨论吧...",
    focus: false,
    content: "",
    commentObj: {}
  },
  textareaInput(e) {
    const content = e.detail.value.trim();
    //  content: "",
    //   topicId,
    //   commentId,
    //   anonymousName: getApp().globalData.isAnonymous ? anonymousName : "",
    //   isAnonymous: getApp().globalData.isAnonymous
    if (content.length > 0) {
      this.setData({ content, "commentObj.content": content });
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
        // if (res) {
        //   const topicIndex = this.data.dynamics.findIndex(
        //     item => item.topic.id === res.topicId
        //   );
        //   if (topicIndex >= 0) {
        //     const comments = `dynamics[${topicIndex}].comments`;
        //     this.$spliceData({
        //       [comments]: [this.data.dynamics.length, 0, { ...res }]
        //     });
        //   }
        // }
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
  getDetailData(id) {
    request
      .get({ url: "opinion/detail", params: { id, pageNo: 1 } })
      .then(res => {
        this.setData({
          adpotDeatil: { ...res.opinion },
          adoptComment: [...res.solutionComment]
        });
      });
  },
  onLoad(query) {
    // 页面加载
    const { id = "8" } = query;
    if (id) {
      this.setData({ "commentObj.opinionId": id });
      setTimeout(() => {
        this.getDetailData(id);
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
    setTimeout(() => {
      dd.stopPullDownRefresh();
    }, 2000);
    // 页面被下拉
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
