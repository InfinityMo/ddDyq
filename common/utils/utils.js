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
    fail: function (res) {
      dd.alert({ title: `上传失败：${JSON.stringify(res)}` });
    }
  });
};

// 生成uuid
export const createUUID = (length = 128) => {
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = new Array(length)
  let rnd = 0
  let r
  for (let i = 0; i < length; i++) {
    if (i === 8 || i === 13 || i === 18 || i === 23) {
      uuid[i] = '-'
    } else if (i === 14) {
      uuid[i] = '4'
    } else {
      if (rnd <= 0x02) { rnd = 0x2000000 + (Math.random() * 0x1000000) | 0 }
      r = rnd & 0xf
      rnd = rnd >> 4
      uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r]
    }
  }
  return uuid.join('').replace(/[-]/g, '').toLowerCase()
}

// 嵌套三层结构
export const putData = (arr, key) => {
  let map = [],
    result = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    if (obj[key] && !map[obj[key]]) {
      if (key === "year") {
        result.push({
          [key]: obj[key],
          currentYear: obj.currentYear,
          list: [obj]
        });
      } else {
        result.push({
          [key]: obj[key],
          month: obj.month,
          dateType: obj.dateType,
          list: [obj]
        });
      }

      map[obj[key]] = obj;
    } else {
      for (let j = 0; j < result.length; j++) {
        let aj = result[j];
        if (aj[key] === obj[key]) {
          aj.list.push(obj);
        }
      }
    }
  }
  return result;
}

export const putData2 = (arr, key) => {
  let map = [],
    result = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = arr[i];
    if (obj[key] && !map[obj[key]]) {
      result.push({
        [key]: obj[key],
        list: [obj]
      });
      map[obj[key]] = obj;
    } else {
      for (let j = 0; j < result.length; j++) {
        let aj = result[j];
        if (aj[key] === obj[key]) {
          aj.list.push(obj);
        }
      }
    }
  }
  return result;
}