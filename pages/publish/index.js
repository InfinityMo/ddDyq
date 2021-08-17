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
    filesPath:[]
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
      : this.setData({ textareaFocus: false });
  },
  submit(e) {
    if (this.data.fileLists.length > 0) {
      this.upload().then(res => {});
    }
  },
  reset() {},
  upload(count = 0) {
    return new Promise(resolve => {
      const filePath = this.data.fileLists[count];
      dd.uploadFile({
        url: `${getApp().globalData.host}/longhua/upload`,
        fileType: "image",
        fileName: "file",
        filePath,
        success: res => {
          count++;
          this.setData({filesPath:[res.data,...this.data.filesPath]})
          count >= this.data.fileLists.length
            ? resolve(res.data)
            : this.upload(count, res.data);
          // dd.alert({ title: `上传成功：${JSON.stringify(res)}` });
        },
        fail: function(res) {
          ddToast({ type: "fail", text: "上传失败" });
          resolve(false);
          // dd.alert({ title: `上传失败：${JSON.stringify(res)}` });
        }
      });
    });
  },
  onLoad(query) {
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
  onHide() {
    // 页面隐藏
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
  }
});
