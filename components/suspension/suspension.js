Component({
  mixins: [],
  data: {
    hidden: true,
    isAnonymous: false
  },
  props: {},
  didMount() {
    const storageData = dd.getStorageSync({ key: "userMode" }).data;
    if (storageData && storageData.isAnonymous) {
      getApp().globalData.isAnonymous = storageData.isAnonymous;
     // this.setData({ isAnonymous: storageData.isAnonymous });
      if (storageData.isAnonymous !== this.data.isAnonymous) {
        this.setData({ isAnonymous: storageData.isAnonymous });
      }
    } else {
      getApp().globalData.isAnonymous = false;
      //this.setData({ isAnonymous: false });
      if (this.data.isAnonymous) {
        this.setData({ isAnonymous: false });
      }
    }
    this.setData({ hidden: false });
  },
  didUpdate() {},
  didUnmount() {},
  methods: {
    changeSkin() {
      dd.setStorageSync({
        key: "userMode",
        data: {
          isAnonymous: !this.data.isAnonymous
        }
      });
      const isAnonymous = getApp().globalData.isAnonymous;
      getApp().globalData.isAnonymous = !isAnonymous;
      this.setData({ isAnonymous: !isAnonymous });
    }
  }
});
