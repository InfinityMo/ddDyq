import { encodeUrl } from "/common/utils/utils";
import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    adpot: [],
    errorNodata: true,
    netWorkError: false
  },
  props: {},
  didMount() {
    // 页面加载
    if (getApp().globalData.token) {
      this.getAdoptData();
    } else {
      getApp().tokenCallback = token => {
        if (token != "") {
          this.getAdoptData();
        }
      };
    }
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getAdoptData() {
      request
        .get({
          url: "opinion",
          params: { type: "adopt", pageNo: 1 }
        })
        .then(res => {
          this.setData(
            {
              adpot: [...res.opinion]
            },
            () => {
              this.setData({
                errorNodata: this.data.adpot.length > 0,
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
    toSupport(e) {
      const { id, anonymousName, action } = e.target.dataset;
      const findIndex = this.data.adpot.findIndex(item => item.id === id);
      if (findIndex >= 0) {
        let countString = "";
        let countValue = 0;
        let actionString = "";
        let actionValue = false;
        if (action === "up") {
          countString = `adpot[${findIndex}].upCount`;
          countValue = this.data.adpot[findIndex].upCount;
          actionString = `adpot[${findIndex}].isCurrentUserUp`;
          actionValue = this.data.adpot[findIndex].isCurrentUserUp;
        } else {
          countString = `adpot[${findIndex}].downCount`;
          countValue = this.data.adpot[findIndex].downCount;
          actionString = `adpot[${findIndex}].isCurrentUserDown`;
          actionValue = this.data.adpot[findIndex].isCurrentUserDown;
        }
        request
          .post(
            {
              url: "opinion/vote",
              params: {
                id,
                action,
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
                [actionString]: !actionValue,
                [countString]: actionValue ? countValue - 1 : countValue + 1
              });
            }
          });
      }
    },
    toAdoptDeatil(e) {
      const id = e.target.dataset.id;
      const url = encodeUrl("/pages/detail/feedback/index", { id });
      dd.navigateTo({ url });
    }
  }
});
