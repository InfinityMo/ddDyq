import { ddToast } from "/common/utils/utils";
Component({
  mixins: [],
  data: {
    _isAnonymous: false
  },
  props: {
    isAnonymous: false,
    isShowInput: false
  },
  didMount() {
    const storageData = dd.getStorageSync({ key: "userMode" }).data;
    if (storageData && storageData.isAnonymous) {
      getApp().globalData.isAnonymous = storageData.isAnonymous;
      if (storageData.isAnonymous !== this.data._isAnonymous) {
        this.setData({ _isAnonymous: storageData.isAnonymous });
      }
    } else {
      getApp().globalData.isAnonymous = false;
      if (this.data._isAnonymous) {
        this.setData({ _isAnonymous: false });
      }
    }
  },
  didUpdate(prevProps) {
    this.setData({ _isAnonymous: this.props.isAnonymous });
  },
  didUnmount() {},
  methods: {
    changeSkin() {
      dd.setStorageSync({
        key: "userMode",
        data: {
          isAnonymous: !this.data._isAnonymous
        }
      });
      const isAnonymous = getApp().globalData.isAnonymous;
      getApp().globalData.isAnonymous = !isAnonymous;
      ddToast({ type: "none", text: !isAnonymous ? "匿名模式" : "实名模式" });
      this.setData({ _isAnonymous: !isAnonymous });
    }
  }
});
