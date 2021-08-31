import request from "/common/request/request";
import { ddToast } from "/common/utils/utils";
Page({
  data: {
    mode: false, //暗黑模式
    textareaFocus: false,
    radios: [
      {
        name: "动态",
        value: "1",
        checked: true,
        disabled: "0"
      },
      {
        name: "意见板",
        value: "2",
        disabled: "0"
      }
    ],
    radioCheck: "1",
    content: "",
    fileLists: [],
    filesPath: [],
    imgPaths: [], //服务器返回的路径
    shareImg:
      "https://lianen-data-develop.oss-cn-shanghai.aliyuncs.com/topic/share/312908fe-69f3-48d9-ab22-cceb55627796.png?Expires=1631497546&OSSAccessKeyId=LTAI5t9iqts8pXE9AdrwCyDn&Signature=2ozlbNbx91JCuV03GyCDZhUPNFo%3D"
  },
  selectPicture() {
    dd.chooseImage({
      sourceType: ["camera", "album"],
      count: 9 - this.data.fileLists.length,
      success: res => {
        // 压缩图片
        this.compressImg(res.filePaths);
      }
    });
  },
  compressImg(files) {
    dd.compressImage({
      filePaths: [...files],
      compressLevel: 2,
      success: res => {
        this.setData({
          fileLists: [...this.data.fileLists, ...res.filePaths],
          "radios[1].disabled": "1"
        });
      }
    });
  },
  // 预览图片
  previewImg(e) {
    const index = e.target.dataset.index || 0;
    dd.previewImage({
      current: index,
      urls: [...this.data.fileLists]
    });
  },
  // 删除图片
  deleteImg(e) {
    const index = e.target.dataset.index || 0;
    const fileLists = this.data.fileLists.concat();
    fileLists.splice(index, 1);
    this.setData({ fileLists, "radios[1].disabled": "0" });
  },
  // 单选
  radioChange(e) {
    if (e.detail.value !== "1") {
      this.setData({ fileLists: [] });
    }
    this.setData({ radioCheck: e.detail.value });
  },
  textareaInput(e) {
    const value = e.detail.value.trim();
    value.length > 0
      ? this.setData({ textareaFocus: true, content: value })
      : this.setData({ textareaFocus: false, content: "" });
  },
  submit(e) {
    dd.showLoading({
      content: "加载中..."
    });
    if (this.data.fileLists.length > 0) {
      this.upload();
    } else {
      this.publish();
    }
  },
  publish() {
    request
      .post({
        url: "add",
        params: {
          content: this.data.content,
          avatar: this.data.filesPath.join(),
          isDynamic: this.data.radioCheck === "1",
          isAnonymous: getApp().globalData.isAnonymous
        }
      })
      .then(res => {
        if (res.code === 204) {
          ddToast({ type: "fail", text: "部分文字无法通过审核，请检查" });
          return false;
        }
        const url =
          this.data.radioCheck === "1"
            ? "/pages/dynamic/index"
            : "/pages/suggest/index";
        // 清除数据
        this.setData({
          "radios[1].disabled": "0",
          textareaFocus: false,
          content: "",
          fileLists: [],
          filesPath: [],
          imgPaths: []
        });
        dd.hideLoading();
        dd.switchTab({
          url,
          success() {
            setTimeout(() => {
              const page = getCurrentPages().pop();
              if (page == undefined || page == null) return;
              page.onLoad();
            });
          }
        });
      });
  },
  upload(count = 0) {
    let that = this;
    return new Promise((resolve, reject) => {
      const filePath = that.data.fileLists[count];
      dd.uploadFile({
        url: `${getApp().globalData.host}/api/upload`,
        fileType: "image",
        fileName: "file",
        hideLoading: true,
        header: { token: getApp().globalData.token || "" },
        filePath,
        success: response => {
          const res = JSON.parse(response.data);
          if (res.code === 200) {
            count++;
            that.setData({
              filesPath: [res.detail.urls[0], ...that.data.filesPath]
            });
            resolve(count);
          } else if (res.code === 203) {
            that.setData({ filesPath: [] });
            ddToast({ type: "fail", text: "请检查图片是否合法" });
            resolve(false);
            dd.hideLoading();
          } else if (res.data.code === 210) {
            that.setData({ filesPath: [] });
            ddToast({ type: "fail", text: "图片格式不支持" });
            resolve(false);
            dd.hideLoading();
          } else {
            that.setData({ filesPath: [] });
            ddToast({ type: "fail", text: "哎呀，服务器似乎出了点问题" });
            resolve(false);
            dd.hideLoading();
          }
        },
        fail: function(res) {
          ddToast({ type: "fail", text: "哎呀，服务器似乎出了点问题" });
          that.setData({ filesPath: [] });
          resolve(false);
        }
      });
    }).then(res => {
      if (typeof res === "number") {
        if (res >= that.data.fileLists.length) {
          that.publish();
        } else {
          that.upload(res);
        }
      }
    });
  },
  onLoad(query) {
    // Object.assign(this.$data, this.$options.data())
    // 页面加载
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
  onShareAppMessage(option) {
    // 返回自定义分享信息
    const { shareImg } = this.data;
    const path = "pages/dynamic/index";
    return {
      title: "小程序",
      desc: "",
      imageUrl: shareImg,
      path
    };
  },
  onHide() {
    // 页面隐藏
    console.log("hide");
  },
  onUnload() {
    // 页面被关闭
    console.log("Unload");
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  }
});
