import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    advises: [],
    pageNo: 1,
    total: 0,
    baselineShow: false
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
      request
        .get({
          url: "opinion",
          params: { type: "current", pageNo: this.data.pageNo }
        })
        .then(res => {
          this.setData({
            total: res.allOpinionsNum,
            advises: [...this.data.advises, ...res.opinion]
          });
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
