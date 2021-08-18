// import { adpot } from "/data/testData";
import { encodeUrl } from "/common/utils/utils";
import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    adpot:[]
  },
  props: {},
  didMount() {
    this.getAdoptData();
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getAdoptData() {
      request.mock({ url: "suggest", params: { type: 'adopt' } }).then(res => {
        this.setData({ adpot:[...res.opinion]});
      });
    },
    toAdoptDeatil(e) {
      const id = e.target.dataset.id;
      const url = encodeUrl("/pages/detail/feedback/index", { id });
      dd.navigateTo({ url });
    }
  }
});
