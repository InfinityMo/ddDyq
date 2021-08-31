import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    advises: [],
    orderType: 0,
    pageNo: 1,
    total: 0,
    orderTypeArray: [
      {
        id: 0,
        name: "按点赞量排序"
      },
      {
        id: 1,
        name: "按时间排序"
      }
    ],
    baselineShow: false,
    errorNodata: true,
    netWorkError: false
  },
  props: {
    className: ""
  },
  didMount() {
    // 页面加载
    if (getApp().globalData.token) {
      this.getCurrentData();
    } else {
      getApp().tokenCallback = token => {
        if (token != "") {
          this.getCurrentData();
        }
      };
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getCurrentData() {
      this.setData({ baselineShow: false, netWorkError: false });
      request
        .get({
          url: "opinion",
          params: {
            type: "current",
            pageNo: this.data.pageNo,
            orderType: String(this.data.orderType) === "0" ? "rank" : "time"
          }
        })
        .then(res => {
          this.setData(
            {
              total: res.allOpinionsNum,
              advises: [...this.data.advises, ...res.opinion]
            },
            () => {
              this.setData({
                errorNodata: this.data.advises.length > 0,
                netWorkError: false
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
    // 点赞
    toSupport(e) {
      const { id, anonymousName } = e.target.dataset;
      const findIndex = this.data.advises.findIndex(item => item.id === id);
      const upCount = `advises[${findIndex}].upCount`;
      const upCountValue = this.data.advises[findIndex].upCount;
      const isCurrentUserUp = `advises[${findIndex}].isCurrentUserUp`;
      const userUpValue = this.data.advises[findIndex].isCurrentUserUp;
      request
        .post(
          {
            url: "opinion/vote",
            params: {
              id: id,
              action: "up",
              anonymousName: getApp().globalData.isAnonymous
                ? anonymousName
                : "",
              isAnonymous: getApp().globalData.isAnonymous
            }
          },
          false
        )
        .then(res => {
          if (res) {
            this.setData({
              [isCurrentUserUp]: !userUpValue,
              [upCount]: userUpValue ? upCountValue - 1 : upCountValue + 1
            });
          }
        });
    },
    pickerChange(e) {
      this.setData(
        {
          pageNo: 1,
          advises: [],
          baselineShow: false,
          orderType: e.detail.value
        },
        () => {
          this.getCurrentData();
        }
      );
    },
    lower(e) {
      if (this.data.advises.length < this.data.total) {
        this.setData({ pageNo: ++this.data.pageNo }, () => {
          this.getCurrentData();
        });
      } else {
        this.setData({ baselineShow: true });
      }
    }
  }
});
