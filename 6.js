C={txt:{title:"六度空间"},cdn:{npm:"//cdn.jsdelivr.net/npm/6d",js:"",img:"",site:""},tj:"hm.baidu.com/hm.js?c0b408deb6b3a64353a68648b81f4d98",url:{li:"|",md:"0day|help|join|chrome|vision|roadmap|markdown|milestone|2019-image|quote/declaration-of-digital-independence|quote/the-man-who-created-the-world-wide-web-has-some-regrets",pug:"about"},pug:{aside:'<header><h2>六度空间</h2><h3>联结彼此 我们同在</h3><div class="logo" style="background-image:url(/6du/ico.svg)"></div></header><menu><a href="/">首页</a><a href="/milestone">里程碑</a><a href="/about">关于</a></menu><nav><a href="/vision">远景目标</a><a href="/join">参与项目</a><a href="/note">开发随笔</a></nav>',foot:'<a class="btn" href="//t.me/hi6du">聊天室</a>'}},(async()=>{await navigator.serviceWorker.register("/sw.js",{scope:"/"}),(await navigator.serviceWorker.ready).active.postMessage(C);var e=document,a=(a,t)=>{var s=e.createElement(a);Object.assign(s,t),e.head.appendChild(s)};a("script",{src:"//"+C.tj,async:!0});var t=C.cdn.npm+"/",s=(await(await fetch(t+"6.js")).text()).split("\n");for(let e=0;e<4;++e)for(let r of s[e].split(" "))r=t+r+".",1==e?a("script",{src:r+"js"}):a("link",{rel:e?"prefetch":"stylesheet",href:r+["css","js"][e%2]})})();