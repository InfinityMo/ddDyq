import { encodeUrl } from "/common/utils/utils";
import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    currentTotal: 0,
    dynamics: [],
    pageNo: 1,
    total: 0
  },
  props: {},
  didMount() {
    setTimeout(() => {
      this.getData();
    }, 2000);
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getData() {
      request
        .get({
          url: "obtain/dynamic",
          params: { pageNo: this.data.pageNo }
        })
        .then(res => {
          // console.log();
          const result = this.setBaseData(this.putData(res.list, "year"));
          console.log(result);
          //   console.log(this.putBase(this.putBase(res.list, "year"), "month"));
          this.setData({
            total: res.total,
            dynamics: [...this.data.dynamics, ...result]
          });
          dd.stopPullDownRefresh();
        });
    },
    setBaseData(arr) {
      arr.forEach(item => {
        item.list = this.putData(item.list, "day");
      });
      return arr;
    },
    // 嵌套三层结构
    putData(arr, key) {
      let map = [],
        result = [];
      for (let i = 0; i < arr.length; i++) {
        let obj = arr[i];
        if (obj[key] && !map[obj[key]]) {
          if (key === "year") {
            result.push({
              [key]: obj[key],
              currentYear:obj.currentYear,
              list: [obj]
            });
          } else {
            result.push({
              [key]: obj[key],
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
  }
});
