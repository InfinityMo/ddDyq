
Component({
  mixins: [],
  data: {
    isAnonymous: false
  },
  props: {},
  didMount() {
    this.setData({ isAnonymous: getApp().isAnonymous });
  },
  didUpdate() { },
  didUnmount() {
  },
  methods: {
    changeSkin() {
      getApp().isAnonymous = !getApp().isAnonymous;
      this.setData({ isAnonymous: !this.data.isAnonymous });
    }
  },
});
