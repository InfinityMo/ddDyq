import { encodeUrl } from "/common/utils/utils";
import request from "/common/request/request";
Page({
  data: {
    mode: false, //暗黑模式
    focus: false,
    inputHeight: "",
    placeholder: "说点什么吧..",
    shareId: "",
    total: 0,
    pageNo: 1,
    dynamics: [],
    baselineShow: false,
    commentObj: {},
    commentComment: ""
  },
  toSupport(event) {
    // const id = event.target.dataset.id;
    // const anonymousName = event.target.dataset.anonymousName;
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
  },
  textareaInput(e) {
    const value = e.detail.value.trim();
    if (value.length > 0) {
      this.setData({ commentComment: value, "commentObj.content": value });
    } else {
      this.setData({ commentComment: "", "commentObj.content": value });
    }
  },
  publishComment() {
    // topicId
    if (!this.data.commentObj.topicId) {
      this.setData({ "commentObj.topicId": this.data.dynamics[0].topic.id });
    }
    request
      .post({
        url: "dynamic/comment",
        params: this.data.commentObj
      })
      .then(res => {
        if (res) {
          const comments = `dynamics[0].comments`;
          this.$spliceData({
            [comments]: [this.data.dynamics[0].comments.length, 0, { ...res }]
          });
          this.setData({
            commentComment: "",
            commentObj: {},
            placeholder: "说点什么吧..."
          });
        }
      });
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
      desc: "",
      imageUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201605%2F10%2F20160510001106_2YjCN.thumb.700_0.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1631869211&t=e83f3049c646769768f51ba6144ec26a",
      path
    };
  },
  // 删除
  deleteHandle(e) {
    dd.confirm({
      title: '提示',
      content: '确定删除该条动态？',
      confirmButtonText: '是',
      cancelButtonText: '否',
      success: (result) => {
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
                // 返回上级页面
                dd.navigateBack({delta: 1})
              });
          }
        }
      },
    });
  },
  onFocus() {
    this.setData({ focus: true });
  },
  onBlur() {
    this.setData({ focus: false, placeholder: "说点什么吧..." });
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
  getDynamicData(id) {
    request.get({ url: "dynamic/detail", params: { id } }).then(res => {
      this.setData({
        total: res.allTopicsNum,
        dynamics: [...this.data.dynamics, ...res.topicList]
      });
      dd.stopPullDownRefresh();
    });
  },
  onLoad(query) {
    // 页面加载
    const { id } = query;
    if (id) {
      if (getApp().globalData.token) {
        this.getDynamicData(id);
      } else {
        getApp().tokenCallback = token => {
          if (token != "") {
            this.getDynamicData(id);
          }
        };
      }
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
