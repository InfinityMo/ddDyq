import { encodeUrl, putData } from "/common/utils/utils";
import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    currentTotal: 0,
    dynamics: [],
    tempDynamic: [],
    pageNo: 1,
    total: 0,
    baselineShow: false
  },
  props: {},
  didMount() {
    if (getApp().globalData.token) {
      this.getData();
    } else {
      getApp().tokenCallback = token => {
        if (token != "") {
          this.getData();
        }
      };
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getData() {
      this.setData({ baselineShow: false });
      request
        .get({
          url: "obtain/dynamic",
          params: { pageNo: this.data.pageNo }
        })
        .then(res => {
          this.setData(
            {
              total: res.total,
              tempDynamic: [...this.data.tempDynamic, ...res.list]
            },
            () => {
              const result = this.setBaseData(
                putData(this.data.tempDynamic, "year")
              );
              this.setData({ dynamics: [...result] });
              // console.log(this.data.tempDynamic)
            }
          );
          dd.stopPullDownRefresh();
        });
    },
    lower(e) {
      if (this.data.tempDynamic.length < this.data.total) {
        this.setData({ pageNo: ++this.data.pageNo }, () => {
          this.getData();
        });
      } else {
        this.setData({ baselineShow: true });
      }
    },
    setBaseData(arr) {
      arr.forEach(item => {
        item.list = putData(item.list, "day");
      });
      return arr;
    }
  }
});
