Page({
  data: {
    dynamics:[{
      user:{
        avatar:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201812%2F30%2F20181230144326_yzofb.thumb.700_0.jpg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630221724&t=0e232873ac2da8a226c1082e8994e226',
        name:'测试用户1',
        time:'2021-07-21 19:01'
      },
      dynamic:{
        words:'我这么一个人，哪懂什么时尚，留过时的发型，唱过时的歌，跳过时的舞，穿过时的衣服。我这么一个人，为了时尚的你，通红着脸，学了几个时兴的姿势。02《镜子》',
        pics:[
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F03%2F165526ophx4l6c6ll3cnpl.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630220827&t=02df669605ae13018c02bccf72734c7e",
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201401%2F23%2F095609lsejfi4thjrrwydj.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630220854&t=21af5cb840ce709c786421c74cd724d9"
        ]
      },
      interaction:{
        support:['infinity','test','jack'],
        comments:[
          {
            name:'infinity',
            text:'1111'
          },
           {
            name:'json',
            text:'2222'
          }
        ]
      }
    },{
      user:{
        avatar:'/image/user/cat.png',
        name:'测试用户2',
        time:'2021-07-29 12:09'
      },
      dynamic:{
        words:'我和我的祖国，一刻也不能分割',
        pics:[
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201312%2F03%2F165526ophx4l6c6ll3cnpl.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630220827&t=02df669605ae13018c02bccf72734c7e",
          "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201401%2F23%2F095609lsejfi4thjrrwydj.jpg&refer=http%3A%2F%2Fattach.bbs.miui.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1630220854&t=21af5cb840ce709c786421c74cd724d9"
        ]
      },
      interaction:{
        support:['infinity'],
        comments:[
          {
            name:'mark',
            text:'无论我走到哪里，都流出一首赞歌'
          },
          {
            name:'infinity',
            reply:'mark',
            text:'我歌唱每一座高山，我歌唱每一条河，袅袅炊烟小小村落，路上一道辙'
          },
           {
            name:'json',
            text:'6666'
          },
           {
            name:'json2',
            text:'6666'
          },
           {
            name:'json3',
            text:'7777'
          },
           {
            name:'json4',
            text:'8888'
          },
           {
            name:'json5',
            text:'9999'
          }
        ]
      }
    }
  ]
  },
  onLoad (query) {
    // 页面加载
    console.info(`Page onLoad with query: ${JSON.stringify(query)}`);
  },
  onReady () {
    // 页面加载完成
  },
  onShow () {
    // 页面显示
  },
  onHide () {
    // 页面隐藏
  },
  onUnload () {
    // 页面被关闭
  },
  onTitleClick () {
    // 标题被点击
  },
  onPullDownRefresh () {
    // 页面被下拉
  },
  onReachBottom () {
    // 页面被拉到底部
  },
  onShareAppMessage () {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
