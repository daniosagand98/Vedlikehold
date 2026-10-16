/* Vedlikehold Viking Fjord – powiadomienia push (osobny service worker, zakres /push/) */
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('push',e=>{
  let d={};
  try{d=e.data?e.data.json():{}}catch(x){d={body:e.data?e.data.text():''}}
  const title=d.title||'Vedlikehold Viking Fjord';
  e.waitUntil(self.registration.showNotification(title,{body:d.body||'',tag:d.tag||'vf-push',renotify:true,data:{url:d.url||'../'}}));
});
self.addEventListener('notificationclick',e=>{
  e.notification.close();
  const target=new URL((e.notification.data&&e.notification.data.url)||'../',self.registration.scope).href;
  e.waitUntil((async()=>{
    const list=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    const home=new URL('../',self.registration.scope).href;
    for(const c of list){if(c.url.startsWith(home)&&'focus' in c)return c.focus()}
    return self.clients.openWindow(target);
  })());
});
