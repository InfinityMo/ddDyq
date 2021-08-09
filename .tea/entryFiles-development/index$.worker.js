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
require('../../components/adoptadvise/adoptadvise?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/monthadvise/monthadvise?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/mydynamic/mydynamic?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../components/mysuggest/mysuggest?hash=05d2a9730dd6009bf9446182f9c985f40f8c0f43');
require('../../pages/dynamic/index?hash=1f421855b3347533473eb49a503209068a61b1d0');
require('../../pages/suggest/index?hash=74afd51d933dfa2d841965e9538393cd84eed97c');
require('../../pages/publish/index?hash=1f421855b3347533473eb49a503209068a61b1d0');
require('../../pages/user/index?hash=8edefa1a5747f7fd4ae01e1b66732206aba003c4');
require('../../pages/detail/feedback/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/detail/dynamicinfo/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}