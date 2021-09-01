if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


      if( navigator.userAgent && (navigator.userAgent.indexOf('LyraVM') > 0 || navigator.userAgent.indexOf('AlipayIDE') > 0) ) {
        var AFAppX = self.AFAppX.getAppContext ? self.AFAppX.getAppContext().AFAppX : self.AFAppX;
      } else {
        importScripts('https://appx/af-appx.worker.min.js');
        var AFAppX = self.AFAppX;
      }
      self.getCurrentPages = AFAppX.getCurrentPages;
      self.getApp = AFAppX.getApp;
      self.Page = AFAppX.Page;
      self.App = AFAppX.App;
      self.my = AFAppX.bridge || AFAppX.abridge;
      self.abridge = self.my;
      self.Component = AFAppX.WorkerComponent || function(){};
      self.$global = AFAppX.$global;
      self.requirePlugin = AFAppX.requirePlugin;
    

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/suspension/suspension?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/dataerror/dataerror?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/adoptadvise/adoptadvise?hash=19fe34b3fdd358782494ad7b035cc017a592fa81');
require('../../components/monthadvise/monthadvise?hash=19fe34b3fdd358782494ad7b035cc017a592fa81');
require('../../components/mydynamic/mydynamic?hash=19fe34b3fdd358782494ad7b035cc017a592fa81');
require('../../components/mysuggest/mysuggest?hash=19fe34b3fdd358782494ad7b035cc017a592fa81');
require('../../pages/dynamic/index?hash=b3cf20417c4e1cf93955de2f000b082ddaf16d4e');
require('../../pages/suggest/index?hash=5040638a8396d3db64104eeaaa8395d3e6fa3433');
require('../../pages/publish/index?hash=1f421855b3347533473eb49a503209068a61b1d0');
require('../../pages/user/index?hash=490b87771f9bcdb19ac3b5fb6ba0557614f66aa1');
require('../../pages/detail/dynamicinfo/index?hash=b3cf20417c4e1cf93955de2f000b082ddaf16d4e');
require('../../pages/detail/feedback/index?hash=b3cf20417c4e1cf93955de2f000b082ddaf16d4e');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}