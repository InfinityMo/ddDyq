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
    baselineShow: false,
    errorNodata: true,
    netWorkError: false
  },
  props: {},
  didMount() {
    if (getApp().globalData.token) {
      this.getData();
    } else {
      // getApp().tokenCallback = token => {
      //   if (token != "") {
      //     this.getData();
      //   }
      // };
      getApp()
        .getAuthCode()
        .then(res => {
          this.getData();
        });
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getData() {
      this.setData({ baselineShow: false, netWorkError: false });
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
              this.setData({ dynamics: [...result] }, () => {
                this.setData({
                  errorNodata: this.data.dynamics.length > 0,
                  netWorkError: false
                });
              });
            }
          );
          dd.stopPullDownRefresh();
        })
        .catch(err => {
          this.setData({ netWorkError: true, errorNodata: false });
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
    },
    toDynamicDetail(e) {
      const { id } = e.target.dataset;
      const url = encodeUrl("/pages/detail/dynamicinfo/index", { id });
      dd.navigateTo({ url });
    }
  }
});
