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

import { encodeUrl, putData } from "/common/utils/utils";
import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    currentTotal: 0,
    nowAdvise: [],
    historyAdvise: [],
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
        // 分两组数据
        this.setData({
          total: res.alMyOpinionCount,
          nowAdvise: [...this.data.nowAdvise, ...result.now],
          historyAdvise: [...this.data.historyAdvise, ...result.history]
        });
        dd.stopPullDownRefresh();
      });
    },
    lower(e) {
      if ((this.data.nowAdvise.length + this.data.historyAdvise.length) < this.data.total) {
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
