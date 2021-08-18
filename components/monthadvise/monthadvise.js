// import { advises } from "/data/testData";
import request from "/common/request/request";
Component({
  mixins: [],
  data: {
    advises:[]
  },
  props: {
    className: ""
  },
  didMount() {
    this.getCurrentData();
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    getCurrentData() {
      request.mock({ url: "suggest", params: { type: "current", pageNo:1 } })
        .then(res => {
          this.setData({ advises: [...res.opinion] });
        });
    }
  }
});
