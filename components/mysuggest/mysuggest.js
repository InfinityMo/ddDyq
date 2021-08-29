// import { nowAdvise, historyAdvise } from "/data/testData";
// Component({
//   mixins: [],
//   data: {
//     nowAdvise,
//     historyAdvise
//   },
//   props: {},
//   didMount() {},
//   didUpdate() {},
//   didUnmount() {},
//   methods: {}
// });

import { encodeUrl, putData2 } from "/common/utils/utils";
import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    currentTotal: 0,
    nowAdvise: [],
    historyAdvise: [],
    tempHistory: [],
    pageNo: 1,
    total: 0,
    baselineShow: false
  },
  props: {},
  didMount() {
    setTimeout(() => {
      this.getData();
    }, 2000);
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    getData() {
      this.setData({ baselineShow: false });
      request.get({
        url: "obtain/opinion",
        params: { pageNo: this.data.pageNo }
      }).then(res => {
        const result = this.divideData(res.Opinion)
        // console.log(result)
        // 分两组数据
        this.setData({
          total: res.alMyOpinionCount,
          nowAdvise: [...this.data.nowAdvise, ...result.now],
          tempHistory: [...this.data.tempHistory, ...result.history]
        }, () => {
          const resultData =putData2(this.data.tempHistory, "year")
          this.setData({ historyAdvise: [...resultData] })
          // console.log(this.data.tempDynamic)
        });
        dd.stopPullDownRefresh();
      });
    },
    // setBaseData(arr) {
    //   arr.forEach(item => {
    //     item.list = putData(item.list, "day");
    //   });
    //   return arr;
    // },
    lower(e) {
      if ((this.data.nowAdvise.length + this.data.tempHistory.length) < this.data.total) {
        this.setData({ pageNo: ++this.data.pageNo }, () => {
          this.getData();
        });
      } else {
        this.setData({ baselineShow: true });
      }
    },
    divideData(arr) {
      const dataForm = { now: [], history: [] }
      arr.forEach(item => {
        item.isCurrentMonth ? dataForm.now.push(item) : dataForm.history.push(item)
      });
      return dataForm;
    }
  }
});
