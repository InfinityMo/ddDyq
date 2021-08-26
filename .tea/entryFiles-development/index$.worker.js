/**! __CODEPLACEHOLDER_START__ */ /*[PositionForHostEntryCodeBegin]*/ /**! __CODEPLACEHOLDER_END__ */
if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');
require('./importScripts$');

      function getUserAgentInPlatformWeb() {
        return typeof navigator !== 'undefined' ? navigator.swuserAgent || navigator.userAgent || '' : '';
      }
      if(getUserAgentInPlatformWeb() && (getUserAgentInPlatformWeb().indexOf('LyraVM') > 0 || getUserAgentInPlatformWeb().indexOf('AlipayIDE') > 0) ) {
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
require('../../pages/publish/index?hash=1f421855b3347533473eb49a503209068a61b1d0');
require('../../pages/dynamic/index?hash=1f421855b3347533473eb49a503209068a61b1d0');
require('../../pages/detail/feedback/index?hash=1f421855b3347533473eb49a503209068a61b1d0');
require('../../pages/suggest/index?hash=b80c7018236227a048f31789be2265409ddd58e1');
require('../../pages/user/index?hash=8edefa1a5747f7fd4ae01e1b66732206aba003c4');
require('../../pages/detail/dynamicinfo/index?hash=1f421855b3347533473eb49a503209068a61b1d0');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}