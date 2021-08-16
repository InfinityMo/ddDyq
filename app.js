App({
  globalData: {
    host: 'http://172.165.251.4:8083'
    // isAnonymous: true
  },
  // isAnonymous: true,
  // 冷启动
  onLaunch(options) {
    // 获取authodCode
    dd.getAuthCode({
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
      }
    });
    const storageData = dd.getStorageSync({ key: "userMode" }).data;
    this.globalData.isAnonymous = storageData ? storageData.isAnonymous : false;
    // 第一次打开
    // options.query == {number:1}
    // dd.getNetworkType({
    //   success: res => {
    //     dd.alert({
    //       title: `${res.networkAvailable} - ${res.networkType}`
    //     });
    //   }
    // });
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
    } catch (err) { }

    // updateManager.onUpdateFailed(function () {
    //   // 新版本下载失败
    // })
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
        // 在其他界面调用getApp().globalData.name的时候，这里就会执行。
        return this._isAnonymous;
      }
    });
  }
});
