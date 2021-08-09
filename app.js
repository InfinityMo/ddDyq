App({
  // 是否匿名
  isAnonymous: true,
  // 冷启动
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    // const updateManager = dd.getUpdateManager();
    // // updateManager.onCheckForUpdate(function (res) {
    // //   // 请求完新版本信息的回调
    // //   console.log(res.hasUpdate) // 是否有更新
    // // })

    // updateManager.onUpdateReady(function(ret) {
    //   dd.confirm({
    //     title: "更新提示",
    //     content: "新版本已经准备好，是否重启应用？",
    //     success: function(res) {
    //       if (res.confirm) {
    //         // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
    //         updateManager.applyUpdate();
    //       }
    //     }
    //   });
    // });
    // updateManager.onUpdateFailed(function () {
    //   // 新版本下载失败
    // })
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  }
});
