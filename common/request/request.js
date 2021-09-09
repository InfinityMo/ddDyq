import { ddToast, ddLoading, encodeUrl } from "/common/utils/utils";
const request = {
  // 通用get方法
  get(options, isLoading = true) {
    if (isLoading) ddLoading.show("加载中...");
    return new Promise((resolve, reject) => {
      dd.httpRequest({
        // 拼接完整请求地址
        url: encodeUrl(
          `${getApp().globalData.host}/api/${options.url}`,
          options.params
        ),
        method: "GET",
        timeout: 5000,
        // 请求头
        headers: { token: getApp().globalData.token || "" },
        success: res => {
          if (res.data && res.data.code !== 201) {
            resolve(res.data.detail);
            ddLoading.hide();
          } else {
            reject(res);
            handleError({ error: 19 });
            ddLoading.hide();
          }
        },
        fail: err => {
          reject(err);
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
        url: `${getApp().globalData.host}/api/${options.url}`,
        method: "POST",
        timeout: 5000,
        // 请求参数
        data:
          options.params !== undefined
            ? JSON.stringify(options.params)
            : JSON.stringify({}),
        // 请求头
        headers: {
          token: getApp().globalData.token || "",
          "Content-Type": "application/json;charset=UTF-8"
        },
        success: res => {
          if (res.data && res.data.code !== 201) {
            resolve(res.data.detail || res.data);
            if (isLoading) ddLoading.hide();
          } else {
            reject(res);
            handleError({ error: 19 });
            if (isLoading) ddLoading.hide();
          }
        },
        fail: err => {
          reject(err);
          handleError(err, isLoading);
        }
      });
    });
  },
  mock(options, isLoading = true) {
    if (isLoading) ddLoading.show("加载中...");
    return new Promise((resolve, reject) => {
      //resolve(require("/mock/" + options.url + ".json").details);
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
const handleError = (err, isLoading) => {
  let message = "哎呀，服务器似乎出了点问题";
  if (err.error === 12) {
    message = "您的网络似乎出了点问题";
    // 判断错误码
    // switch (err.error) {
    //   case 11:
    //     message = "无权跨域";
    //     break;
    //   case 12:
    //     message = "网络出错";
    //     break;
    //   case 13:
    //     message = "超时";
    //     break;
    //   case 14:
    //     message = "解码失败";
    //     break;
    //   case 19:
    //     message = "哎呀，服务器似乎出了点问题";
    //     break;
    //   default:
    //     break;
    // }
  }
  ddToast({ type: "fail", text: message });
  if (isLoading) ddLoading.hide();
};

export default request;
