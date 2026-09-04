const C='aprozar-v1';
self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>self.clients.claim());
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!e.request.url.startsWith(self.location.origin))return;
  e.respondWith(caches.open(C).then(async c=>{
    try{const r=await fetch(e.request);if(r.ok)c.put(e.request,r.clone());return r;}
    catch(err){return (await c.match(e.request))||c.match('./index.html');}
  }));
});