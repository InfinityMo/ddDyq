Component({
  mixins: [],
  data: {
    // hidden: true,
    _isAnonymous: false
  },
  props: {
    isAnonymous: false
    // onRender: () => { }
  },
  didMount() {
    const storageData = dd.getStorageSync({ key: "userMode" }).data;
    if (storageData && storageData.isAnonymous) {
      getApp().globalData.isAnonymous = storageData.isAnonymous;
      // this.setData({ isAnonymous: storageData.isAnonymous });
      if (storageData.isAnonymous !== this.data._isAnonymous) {
        this.setData({ _isAnonymous: storageData.isAnonymous });
      }
    } else {
      getApp().globalData.isAnonymous = false;
      //this.setData({ isAnonymous: false });
      if (this.data._isAnonymous) {
        this.setData({ _isAnonymous: false });
      }
    }
    setTimeout(() => {
      console.log(this.data._isAnonymous)
    }, 1000)
    // this.setData({ hidden: false });
  },
  didUpdate(prevProps) {
    this.setData({ _isAnonymous: this.props.isAnonymous })
  },
  didUnmount() { },
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
      this.setData({ _isAnonymous: !isAnonymous });
    }
  }
});
