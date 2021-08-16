import { adpot } from "/data/testData";
import { encodeUrl } from '/common/utils/utils'
Component({
  mixins: [],
  data: {
    adpot
  },
  props: {},
  didMount() {},
  didUpdate() {},
  didUnmount() {},
  methods: {
    toAdoptDeatil(e) {
      const id = e.target.dataset.id;
       const url = encodeUrl('/pages/detail/feedback/index', { id })
      dd.navigateTo({ url });
    }
  }
});
