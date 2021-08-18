import { ddToast, ddLoading, encodeUrl } from "/common/utils/utils";
const request = {
  // 通用get方法
  get(options, isLoading = true) {
    if (isLoading) ddLoading.show("加载中...");
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        // 拼接完整请求地址
        url: encodeUrl(
          `${getApp().globalData.host}/${options.url}`,
          options.params
        ),
        method: "GET",
        // 请求头
        headers: { Authorization: getApp().globalData.token || "" },
        success: res => {
          resolve(res.data);
          ddLoading.hide();
        },
        fail: err => {
          debugger;
          reject(err);
          ddLoading.hide();
          handleError(err);
        }
      });
    });
  },

  // 通用post方法
  post(options, isLoading = true) {
    if (isLoading) ddLoading.show("加载中...");
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        // 拼接完整请求地址
        url: `${getApp().globalData.host}/${options.url}`,
        method: "POST",
        // 请求参数
        data:
          options.params !== undefined
            ? JSON.stringify(options.params)
            : JSON.stringify({}),
        // 请求头
        headers: {
          Authorization: getApp().globalData.token || "",
          "Content-Type": "application/json;charset=UTF-8"
        },
        success: res => {
          resolve(res.data);
          ddLoading.hide();
        },
        fail: err => {
          reject(err);
          ddLoading.hide();
          handleError(err);
        }
      });
    });
  },
  mock(options, isLoading = true) {
    if (isLoading) ddLoading.show("加载中...");
    return new Promise((resolve, reject) => {
      resolve(require("/mock/" + options.url + ".json").details);
      ddLoading.hide();
      // dd.httpRequest({
      //   // 拼接完整请求地址
      //   url: `/mock/${options.url}.json`,
      //   method: "POST",
      //   // 请求参数
      //   data:
      //     options.params !== undefined
      //       ? JSON.stringify(options.params)
      //       : JSON.stringify({}),
      //   // 请求头
      //   headers: {
      //     Authorization: getApp().globalData.token || "",
      //     "Content-Type": "application/json;charset=UTF-8"
      //   },
      //   success: res => {
      //     resolve(res.data);
      //     ddLoading.hide();
      //   },
      //   fail: err => {
      //     reject(err);
      //     handleError(err);
      //     // ddLoading.hide();
      //   }
      // });
    });
  }
};

// 错误处理方法
const handleError = err => {
  let message = "请求错误";
  if (err.error) {
    // 判断错误码
    switch (err.error) {
      case 11:
        message = "无权跨域";
        break;
      case 12:
        message = "网络出错";
        break;
      case 13:
        message = "超时";
        break;
      case 14:
        message = "解码失败";
        break;
      case 19:
        message = "服务器发生错误";
        break;
      default:
        break;
    }
  }
  ddToast({ type: "fail", text: message });
};

export default request;
