import request from "/common/request/request";
App({
  globalData: {
    // host: "http://42510579yw.imdo.co",
    host: "http://47.100.240.53",
    token: ""
  },
  userData: {},
  // 冷启动
  onLaunch(options) {
    // 从内存中获取用户的模式
    const storageData = dd.getStorageSync({ key: "userMode" }).data;
    this.globalData.isAnonymous = storageData ? storageData.isAnonymous : false;
    // 获取authodCode
    this.getAuthCode();
    // 更新app
    this.updateApp();
    // 第一次打开
    // options.query == {number:1}
    // dd.getNetworkType({
    //   success: res => {
    //     dd.alert({
    //       title: `${res.networkAvailable} - ${res.networkType}`
    //     });
    //   }
    // });
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    // let storageData = dd.getStorageSync({ key: "userMode" }).data;
    // if (!storageData || !storageData.isAnonymous) {
    //   dd.confirm({
    //     title: "提示",
    //     content: "是否开启匿名状态？",
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     success: result => {
    //       dd.setStorageSync({
    //         key: "userMode",
    //         data: {
    //           isAnonymous: result.confirm
    //         }
    //       });
    //     }
    //   });
    // }
  },
  getAuthCode() {
    dd.getAuthCode({
      success: res => {
        const { authCode } = res;
        this.getUserInfo(authCode);
      },
      fail: function (err) { }
    });
  },
  getUserInfo(authCode) {
    request.post({ url: "userInfo", params: { authCode } }).then(res => {
      this.globalData.token = res.token || "";
      this.userData = { ...res.user }
      if (this.tokenCallback) {
        this.tokenCallback(res.token);
      }
    });
  },
  updateApp() {
    try {
      const updateManager = dd.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        // console.log(res.hasUpdate); // 是否有更新
      });
      updateManager.onUpdateReady(function (ret) {
        dd.confirm({
          title: "更新提示",
          content: "新版本已经准备好，是否重启应用？",
          confirmButtonText: "是",
          cancelButtonText: "否",
          success: function (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed(function () { });
    } catch (err) { }
  },
  watch: function (method) {
    const obj = this.globalData;
    Object.defineProperty(obj, "isAnonymous", {
      configurable: true, //描述属性是否配置，以及可否删除
      enumerable: true, //描述属性是否会出现在for in 或者 Object.keys()的遍历中
      set: function (value) {
        this._isAnonymous = value;
        method(value);
      },
      get: function () {
        // 在其他界面调用getApp().globalData.isAnonymous的时候，这里就会执行。
        return this._isAnonymous;
      }
    });
  }
});
