(async () => {
  await navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  });
  (await navigator.serviceWorker.ready).active.postMessage(C);

  var
    doc = document,
    tag = (name, attr) => {
      var e = doc.createElement(name)
      Object.assign(e, attr)
      doc.head.appendChild(e)
    };
  tag('script', {
    src: "//" + C.tj,
    async: true
  })

  //加载页面
  var npm = C.cdn.npm + "/",
    t = (await (
      await fetch(
        npm + '6.js'
      )
    ).text()).split("\n");
  for (let i = 0; i < 4; ++i) {
    for (let s of t[i].split(' ')) {
      s = npm + s + '.';
      (i == 1) ? tag(
        'script', {
          src: s + 'js',
        }
      ): tag(
        'link', {
          rel: i ? 'prefetch' : 'stylesheet',
          href: s + ['css', 'js'][i % 2]
        }
      )
    }
  }
})()
