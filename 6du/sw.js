const VERSION = 1;

var HOST = {},
  NETWORK_FIRST,
  TJ; // TJ = 统计, 统计脚本必须每次都请求

self.addEventListener('message', async (event) => {
  var C = event.data;
  NETWORK_FIRST = new Set(
    Object.keys(C.url)
  )
  for (let i in C.cdn) {
    var t = C.cdn[i] || `//${location.host}/`;
    if (t.startsWith("//")) {
      t = location.protocol + t
    }
    HOST[i] = new URL(t)
  }
  TJ = C.tj.split("/")[0]
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // 更新客户端
      self.clients.claim()
      // 清理旧版本
      // caches.keys().then(function (cacheList) {
      //     return Promise.all(
      //         cacheList.map(function (cacheName) {
      //             if ((cacheName - VERSION)!== 0 ) {
      //                 return caches.delete(cacheName);
      //             }
      //         })
      //     );
      // })
    ])
  )
})

self.addEventListener(
  'install',
  (event) => {
    event.waitUntil(self.skipWaiting());
  }
);


self.addEventListener(
  'fetch',
  (event) => {
    const req = event.request
    if (
      (
        ["GET", "OPTIONS"].indexOf(req.method) < 0
      ) ||
      (
        TJ && new URL(req.url).host == TJ
      )
    ) return;
    _cache(event)
  }
)

function _cache(event) {
  const req = event.request
  event.respondWith(
    caches.match(req).then(
      async (res) => {
        if (res) {
          res = await reget(req, res)
          return res;
        }
        return get(req)
      }
    )
  )
}


async function reget(req, res) {
  return new Promise(
    async (resolve) => {
      const done = () => {
        resolve(res)
      }
      if (!TJ) return done();
      const timeout = async () => {
        setTimeout(done, 999)
        res = await get(req)
      }
      const url = new URL(req.url)
      const host = url.host;
      const pathname = url.pathname
      const _6_js = "/6.js"

      if (
        req.destination == "image" ||
        (
          host == HOST.npm.host &&
          pathname == HOST.npm.pathname + _6_js
        )
      ) {
        get(req)
      } else if (
        (
          HOST.js.host == host && pathname == _6_js
        ) ||
        (
          host == HOST.site.host &&
          NETWORK_FIRST.has(
            pathname.slice(1).split('/')[0]
          )
        )
      ) {
        // console.log("await ", host, pathname)
        await timeout()
      }
      done()
    }
  )
}

async function get(req) {
  var url = new URL(req.url),
    config = {};

  if (url.host != location.host) {
    config.credentials = "omit";
  }
  const res = await fetch(req.clone(), config);

  if (
    res && res.ok
  ) {
    var cache = true;
    for (const [key, val] of res.headers) {
      if (key == 'cache-control') {
        cache = !(val.indexOf('no-cache') + 1)
        break;
      }
    }
    if (cache) {
      // if (req.url.endsWith('.css')) {
      //   res.headers.set('content-type', 'text/css')
      // }
      const rc = res.clone()
      caches.open(
        VERSION // 数据库版本号
      ).then((cache) => {
        cache.put(req, rc);
      })
    };
  }
  return res;
}
