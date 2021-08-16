export const encodeUrl = (url, obj) => {
  Object.keys(obj).forEach((item, index) => {
    url =
      index === 0
        ? `${url}?${item}=${obj[item]}`
        : `${url}&${item}=${obj[item]}`;
  });
  return url;
};

// 全局toast
export const ddToast = ({ type, text, interval }) => {
  dd.showToast({
    type: type,
    content: text,
    duration: interval
  });
};
// // 全局toast
// export const ddLoading = (content='') => {
//   dd.showToast({
//     content
//   });
// };

export const ddLoading = {
  show(content = "") {
    dd.showLoading({
      content
    });
  },
  hide(page) {
    page ? dd.hideLoading(page) : dd.hideLoading();
  }
};

export const upload = (options) => {
  console.log(`${getApp().globalData.host}/${options.url}`)
  dd.uploadFile({
    url: `${getApp().globalData.host}/${options.url}`,
    fileType: "image",
    fileName: "file",
    filePath: options.filePath,
    formData: JSON.stringify(options.formData),
    success: res => {
      dd.alert({ title: `上传成功：${JSON.stringify(res)}` });
    },
    fail: function(res) {
      dd.alert({ title: `上传失败：${JSON.stringify(res)}` });
    }
  });
};
