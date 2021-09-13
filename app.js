import request from "/common/request/request";
App({
  globalData: {
    //host: "http://47.100.240.53",
    host: "https://changyan.thelian.com",
    token: ""
  },
  userData: {},
  // 冷启动
  onLaunch(options) {
    // 从内存中获取用户的模式
    const storageData = dd.getStorageSync({ key: "userMode" }).data;
    this.globalData.isAnonymous = storageData ? storageData.isAnonymous : false;
    // 获取authodCode
    //this.getAuthCode();
    // 更新app
  },
  onShow(options) {
    this.updateApp();
  },
  onHide() {},
  getAuthCode() {
    return new Promise((resolve, reject) => {
      dd.getAuthCode({
        success: res => {
          const { authCode } = res;
          request
            .post({ url: "userInfo", params: { authCode } })
            .then(res => {
              this.globalData.token = res.token || "";
              resolve(true);
              this.userData = { ...res.user };
              if (this.tokenCallback) {
                this.tokenCallback(res.token);
              }
            })
            .catch(err => {
              resolve(false);
            });
        },
        fail: function(err) {
           resolve(false);
        }
      });
    });
  },
  getUserInfo() {
    return new Promise((resolve, reject) => {
      request
        .post({ url: "userInfo", params: { authCode: this.authCode } })
        .then(res => {
          this.globalData.token = res.token || "";
          resolve(true);
          this.userData = { ...res.user };
          if (this.tokenCallback) {
            this.tokenCallback(res.token);
          }
        })
        .catch(err => {
          resolve(false);
        });
    });
  },
  updateApp() {
    try {
      const updateManager = dd.getUpdateManager();
      updateManager.onCheckForUpdate(function(res) {
        // 请求完新版本信息的回调
        // console.log(res.hasUpdate); // 是否有更新
      });
      updateManager.onUpdateReady(function(ret) {
        dd.confirm({
          title: "更新提示",
          content: "修复了一些已知问题，提升了用户体验。",
          confirmButtonText: "更新",
          cancelButtonText: "暂不更新",
          success: function(res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate();
            }
          }
        });
      });
      updateManager.onUpdateFailed(function() {});
    } catch (err) {}
  },
  watch: function(method) {
    const obj = this.globalData;
    Object.defineProperty(obj, "isAnonymous", {
      configurable: true, //描述属性是否配置，以及可否删除
      enumerable: true, //描述属性是否会出现在for in 或者 Object.keys()的遍历中
      set: function(value) {
        this._isAnonymous = value;
        method(value);
      },
      get: function() {
        // 在其他界面调用getApp().globalData.isAnonymous的时候，这里就会执行。
        return this._isAnonymous;
      }
    });
  }
});
