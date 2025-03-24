(()=>{try{self["workbox:core:7.2.0"]&&_()}catch{}var ie=(o,...e)=>{let t=o;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t};var ee=ie;var c=class extends Error{constructor(e,t){let r=ee(e,t);super(r),this.name=e,this.details=t}};var S=new Set;var f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},F=o=>[f.prefix,o,f.suffix].filter(e=>e&&e.length>0).join("-"),ce=o=>{for(let e of Object.keys(f))o(e)},h={updateDetails:o=>{ce(e=>{typeof o[e]=="string"&&(f[e]=o[e])})},getGoogleAnalyticsName:o=>o||F(f.googleAnalytics),getPrecacheName:o=>o||F(f.precache),getPrefix:()=>f.prefix,getRuntimeName:o=>o||F(f.runtime),getSuffix:()=>f.suffix};function te(o,e){let t=new URL(o);for(let r of e)t.searchParams.delete(r);return t.href}async function K(o,e,t,r){let s=te(e.url,t);if(e.url===s)return o.match(e,r);let a=Object.assign(Object.assign({},r),{ignoreSearch:!0}),n=await o.keys(e,a);for(let i of n){let l=te(i.url,t);if(s===l)return o.match(i,r)}}var b;function M(){if(b===void 0){let o=new Response("");if("body"in o)try{new Response(o.body),b=!0}catch{b=!1}b=!1}return b}var E=class{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}};async function I(){for(let o of S)await o()}var H=o=>new URL(String(o),location.href).href.replace(new RegExp(`^${location.origin}`),"");function L(o){return new Promise(e=>setTimeout(e,o))}function O(o,e){let t=e();return o.waitUntil(t),t}async function j(o,e){let t=null;if(o.url&&(t=new URL(o.url).origin),t!==self.location.origin)throw new c("cross-origin-copy-response",{origin:t});let r=o.clone(),s={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},a=e?e(s):s,n=M()?r.body:await r.blob();return new Response(n,a)}function B(){self.addEventListener("activate",()=>self.clients.claim())}try{self["workbox:precaching:7.2.0"]&&_()}catch{}var ue="__WB_REVISION__";function oe(o){if(!o)throw new c("add-to-cache-list-unexpected-type",{entry:o});if(typeof o=="string"){let a=new URL(o,location.href);return{cacheKey:a.href,url:a.href}}let{revision:e,url:t}=o;if(!t)throw new c("add-to-cache-list-unexpected-type",{entry:o});if(!e){let a=new URL(t,location.href);return{cacheKey:a.href,url:a.href}}let r=new URL(t,location.href),s=new URL(t,location.href);return r.searchParams.set(ue,e),{cacheKey:r.href,url:s.href}}var T=class{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:r})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){let s=t.originalRequest.url;r?this.notUpdatedURLs.push(s):this.updatedURLs.push(s)}return r}}};var D=class{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:r})=>{let s=r?.cacheKey||this._precacheController.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this._precacheController=e}};try{self["workbox:strategies:7.2.0"]&&_()}catch{}function P(o){return typeof o=="string"?new Request(o):o}var q=class{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new E,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(let r of this._plugins)this._pluginStateMap.set(r,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){let{event:t}=this,r=P(e);if(r.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){let n=await t.preloadResponse;if(n)return n}let s=this.hasCallback("fetchDidFail")?r.clone():null;try{for(let n of this.iterateCallbacks("requestWillFetch"))r=await n({request:r.clone(),event:t})}catch(n){if(n instanceof Error)throw new c("plugin-error-request-will-fetch",{thrownErrorMessage:n.message})}let a=r.clone();try{let n;n=await fetch(r,r.mode==="navigate"?void 0:this._strategy.fetchOptions);for(let i of this.iterateCallbacks("fetchDidSucceed"))n=await i({event:t,request:a,response:n});return n}catch(n){throw s&&await this.runCallbacks("fetchDidFail",{error:n,event:t,originalRequest:s.clone(),request:a.clone()}),n}}async fetchAndCachePut(e){let t=await this.fetch(e),r=t.clone();return this.waitUntil(this.cachePut(e,r)),t}async cacheMatch(e){let t=P(e),r,{cacheName:s,matchOptions:a}=this._strategy,n=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:s});r=await caches.match(n,i);for(let l of this.iterateCallbacks("cachedResponseWillBeUsed"))r=await l({cacheName:s,matchOptions:a,cachedResponse:r,request:n,event:this.event})||void 0;return r}async cachePut(e,t){let r=P(e);await L(0);let s=await this.getCacheKey(r,"write");if(!t)throw new c("cache-put-with-no-response",{url:H(s.url)});let a=await this._ensureResponseSafeToCache(t);if(!a)return!1;let{cacheName:n,matchOptions:i}=this._strategy,l=await self.caches.open(n),g=this.hasCallback("cacheDidUpdate"),m=g?await K(l,s.clone(),["__WB_REVISION__"],i):null;try{await l.put(s,g?a.clone():a)}catch(p){if(p instanceof Error)throw p.name==="QuotaExceededError"&&await I(),p}for(let p of this.iterateCallbacks("cacheDidUpdate"))await p({cacheName:n,oldResponse:m,newResponse:a.clone(),request:s,event:this.event});return!0}async getCacheKey(e,t){let r=`${e.url} | ${t}`;if(!this._cacheKeys[r]){let s=e;for(let a of this.iterateCallbacks("cacheKeyWillBeUsed"))s=P(await a({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[r]=s}return this._cacheKeys[r]}hasCallback(e){for(let t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(let r of this.iterateCallbacks(e))await r(t)}*iterateCallbacks(e){for(let t of this._strategy.plugins)if(typeof t[e]=="function"){let r=this._pluginStateMap.get(t);yield a=>{let n=Object.assign(Object.assign({},a),{state:r});return t[e](n)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,r=!1;for(let s of this.iterateCallbacks("cacheWillUpdate"))if(t=await s({request:this.request,response:t,event:this.event})||void 0,r=!0,!t)break;return r||t&&t.status!==200&&(t=void 0),t}};var A=class{constructor(e={}){this.cacheName=h.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){let[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});let t=e.event,r=typeof e.request=="string"?new Request(e.request):e.request,s="params"in e?e.params:void 0,a=new q(this,{event:t,request:r,params:s}),n=this._getResponse(a,r,t),i=this._awaitComplete(n,a,r,t);return[n,i]}async _getResponse(e,t,r){await e.runCallbacks("handlerWillStart",{event:r,request:t});let s;try{if(s=await this._handle(t,e),!s||s.type==="error")throw new c("no-response",{url:t.url})}catch(a){if(a instanceof Error){for(let n of e.iterateCallbacks("handlerDidError"))if(s=await n({error:a,event:r,request:t}),s)break}if(!s)throw a}for(let a of e.iterateCallbacks("handlerWillRespond"))s=await a({event:r,request:t,response:s});return s}async _awaitComplete(e,t,r,s){let a,n;try{a=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:s,request:r,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(n=i)}if(await t.runCallbacks("handlerDidComplete",{event:s,request:r,response:a,error:n}),t.destroy(),n)throw n}};var y=class o extends A{constructor(e={}){e.cacheName=h.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(o.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){let r=await t.cacheMatch(e);return r||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let r,s=t.params||{};if(this._fallbackToNetwork){let a=s.integrity,n=e.integrity,i=!n||n===a;if(r=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?n||a:void 0})),a&&i&&e.mode!=="no-cors"){this._useDefaultCacheabilityPluginIfNeeded();let l=await t.cachePut(e,r.clone())}}else throw new c("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return r}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();let r=await t.fetch(e);if(!await t.cachePut(e,r.clone()))throw new c("bad-precaching-response",{url:e.url,status:r.status});return r}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(let[r,s]of this.plugins.entries())s!==o.copyRedirectedCacheableResponsesPlugin&&(s===o.defaultPrecacheCacheabilityPlugin&&(e=r),s.cacheWillUpdate&&t++);t===0?this.plugins.push(o.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}};y.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:o}){return!o||o.status>=400?null:o}};y.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:o}){return o.redirected?await j(o):o}};var N=class{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:r=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new y({cacheName:h.getPrecacheName(e),plugins:[...t,new D({precacheController:this})],fallbackToNetwork:r}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){let t=[];for(let r of e){typeof r=="string"?t.push(r):r&&r.revision===void 0&&t.push(r.url);let{cacheKey:s,url:a}=oe(r),n=typeof r!="string"&&r.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==s)throw new c("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:s});if(typeof r!="string"&&r.integrity){if(this._cacheKeysToIntegrities.has(s)&&this._cacheKeysToIntegrities.get(s)!==r.integrity)throw new c("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(s,r.integrity)}if(this._urlsToCacheKeys.set(a,s),this._urlsToCacheModes.set(a,n),t.length>0){let i=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(i)}}}install(e){return O(e,async()=>{let t=new T;this.strategy.plugins.push(t);for(let[a,n]of this._urlsToCacheKeys){let i=this._cacheKeysToIntegrities.get(n),l=this._urlsToCacheModes.get(a),g=new Request(a,{integrity:i,cache:l,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:n},request:g,event:e}))}let{updatedURLs:r,notUpdatedURLs:s}=t;return{updatedURLs:r,notUpdatedURLs:s}})}activate(e){return O(e,async()=>{let t=await self.caches.open(this.strategy.cacheName),r=await t.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(let n of r)s.has(n.url)||(await t.delete(n),a.push(n.url));return{deletedURLs:a}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){let t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){let t=e instanceof Request?e.url:e,r=this.getCacheKeyForURL(t);if(r)return(await self.caches.open(this.strategy.cacheName)).match(r)}createHandlerBoundToURL(e){let t=this.getCacheKeyForURL(e);if(!t)throw new c("non-precached-url",{url:e});return r=>(r.request=new Request(e),r.params=Object.assign({cacheKey:t},r.params),this.strategy.handle(r))}};var G,d=()=>(G||(G=new N),G);try{self["workbox:routing:7.2.0"]&&_()}catch{}var V="GET";var w=o=>o&&typeof o=="object"?o:{handle:o};var u=class{constructor(e,t,r=V){this.handler=w(t),this.match=e,this.method=r}setCatchHandler(e){this.catchHandler=w(e)}};var C=class extends u{constructor(e,t,r){let s=({url:a})=>{let n=e.exec(a.href);if(n&&!(a.origin!==location.origin&&n.index!==0))return n.slice(1)};super(s,t,r)}};var x=class{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{let{request:t}=e,r=this.handleRequest({request:t,event:e});r&&e.respondWith(r)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){let{payload:t}=e.data,r=Promise.all(t.urlsToCache.map(s=>{typeof s=="string"&&(s=[s]);let a=new Request(...s);return this.handleRequest({request:a,event:e})}));e.waitUntil(r),e.ports&&e.ports[0]&&r.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){let r=new URL(e.url,location.href);if(!r.protocol.startsWith("http"))return;let s=r.origin===location.origin,{params:a,route:n}=this.findMatchingRoute({event:t,request:e,sameOrigin:s,url:r}),i=n&&n.handler,l=[],g=e.method;if(!i&&this._defaultHandlerMap.has(g)&&(i=this._defaultHandlerMap.get(g)),!i)return;let m;try{m=i.handle({url:r,request:e,event:t,params:a})}catch(R){m=Promise.reject(R)}let p=n&&n.catchHandler;return m instanceof Promise&&(this._catchHandler||p)&&(m=m.catch(async R=>{if(p)try{return await p.handle({url:r,request:e,event:t,params:a})}catch(Z){Z instanceof Error&&(R=Z)}if(this._catchHandler)return this._catchHandler.handle({url:r,request:e,event:t});throw R})),m}findMatchingRoute({url:e,sameOrigin:t,request:r,event:s}){let a=this._routes.get(r.method)||[];for(let n of a){let i,l=n.match({url:e,sameOrigin:t,request:r,event:s});if(l)return i=l,(Array.isArray(i)&&i.length===0||l.constructor===Object&&Object.keys(l).length===0||typeof l=="boolean")&&(i=void 0),{route:n,params:i}}return{}}setDefaultHandler(e,t=V){this._defaultHandlerMap.set(t,w(e))}setCatchHandler(e){this._catchHandler=w(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new c("unregister-route-but-not-found-with-method",{method:e.method});let t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new c("unregister-route-route-not-registered")}};var v,W=()=>(v||(v=new x,v.addFetchListener(),v.addCacheListener()),v);function k(o,e,t){let r;if(typeof o=="string"){let a=new URL(o,location.href),n=({url:i})=>i.href===a.href;r=new u(n,e,t)}else if(o instanceof RegExp)r=new C(o,e,t);else if(typeof o=="function")r=new u(o,e,t);else if(o instanceof u)r=o;else throw new c("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return W().registerRoute(r),r}function se(o,e=[]){for(let t of[...o.searchParams.keys()])e.some(r=>r.test(t))&&o.searchParams.delete(t);return o}function*ae(o,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:r=!0,urlManipulation:s}={}){let a=new URL(o,location.href);a.hash="",yield a.href;let n=se(a,e);if(yield n.href,t&&n.pathname.endsWith("/")){let i=new URL(n.href);i.pathname+=t,yield i.href}if(r){let i=new URL(n.href);i.pathname+=".html",yield i.href}if(s){let i=s({url:a});for(let l of i)yield l.href}}var U=class extends u{constructor(e,t){let r=({request:s})=>{let a=e.getURLsToCacheKeys();for(let n of ae(s.url,t)){let i=a.get(n);if(i){let l=e.getIntegrityForCacheKey(i);return{cacheKey:i,integrity:l}}}};super(r,e.strategy)}};function Q(o){let e=d(),t=new U(e,o);k(t)}var he="-precache-",ne=async(o,e=he)=>{let r=(await self.caches.keys()).filter(s=>s.includes(e)&&s.includes(self.registration.scope)&&s!==o);return await Promise.all(r.map(s=>self.caches.delete(s))),r};function Y(){self.addEventListener("activate",o=>{let e=h.getPrecacheName();o.waitUntil(ne(e).then(t=>{}))})}function J(o){return d().createHandlerBoundToURL(o)}function X(o){d().precache(o)}function z(o,e){X(o),Q(e)}var $=class extends u{constructor(e,{allowlist:t=[/./],denylist:r=[]}={}){super(s=>this._match(s),e),this._allowlist=t,this._denylist=r}_match({url:e,request:t}){if(t&&t.mode!=="navigate")return!1;let r=e.pathname+e.search;for(let s of this._denylist)if(s.test(r))return!1;return!!this._allowlist.some(s=>s.test(r))}};self.skipWaiting();B();z([{"revision":"86a8a7003badea089c1cd1e5a9faf206","url":"assets/axios-_s9Gw42U.js"},{"revision":"dcdfdfd7e2c18a86c688db8f0dc45e34","url":"assets/ErrorNotFound-OO78UJAU.js"},{"revision":"3e1afe59fa075c9e04c436606b77f640","url":"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa-Dr0goTwe.woff"},{"revision":"a4160421d2605545f69a4cd6cd642902","url":"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ-D-x-0Q06.woff2"},{"revision":"1230e41d08c94fdcffa6388d485c6c20","url":"assets/index-B70-mVPo.js"},{"revision":"ff888aa90743bdaaef5cb78030b2667f","url":"assets/index-nt6vUMT3.css"},{"revision":"378555ac1b93cd1485510b0fc72f5bd8","url":"assets/IndexPage-B1C3VE3C.js"},{"revision":"218c107e2d57e79f585cd95d254efbe2","url":"assets/IndexPage-DNNiqWNX.css"},{"revision":"2d29775851b8463053deb35b21b5d5c8","url":"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuaabVmUiAw-CNa4tw4G.woff"},{"revision":"be27354f07345fafe8dfc84117bbafd4","url":"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWub2bVmUiAw-CHKg1YId.woff"},{"revision":"c8cea161abfb039c97a11c26dff2f546","url":"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbFmUiAw-yBxCyPWP.woff"},{"revision":"585ad11be98f8f044923a71898ddfde6","url":"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmUiAw-3fZ6d7DD.woff"},{"revision":"2cadc82e8484ccac69caddc849f603be","url":"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjalmUiAw-BepdiOnY.woff"},{"revision":"51c41b1c2668c088c7cce3fa116396e1","url":"assets/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtalmUiAw-4ZhHFPot.woff"},{"revision":"19e0d1f758b7142e002b2db1c66e19e2","url":"assets/MainLayout-DoXmITBU.js"},{"revision":"1bcfb6af940ffbf88c40186185aa6965","url":"assets/QBtn-Cfv77Lm3.js"},{"revision":"22f58d4e0f3003b5ead910a10e915e58","url":"assets/QItem-BEGN6IgN.js"},{"revision":"f4facfeaed834544d622544acfbb7722","url":"favicon.ico"},{"revision":"d082235f6e6d2109e84e397f66fa868d","url":"icons/apple-icon-120x120.png"},{"revision":"3c728ce3e709b7395be487becf76283a","url":"icons/apple-icon-152x152.png"},{"revision":"3fec89672a18e4b402ede58646917c2d","url":"icons/apple-icon-167x167.png"},{"revision":"aa47843bd47f34b7ca4b99f65dd25955","url":"icons/apple-icon-180x180.png"},{"revision":"ab92df0270f054ca388127c9703a4911","url":"icons/favicon-128x128.png"},{"revision":"e4b046d41e08e6fa06626d6410ab381d","url":"icons/favicon-16x16.png"},{"revision":"410858b01fa6d3d66b7bf21447c5f1fc","url":"icons/favicon-32x32.png"},{"revision":"db2bde7f824fb4057ffd1c42f6ed756e","url":"icons/favicon-96x96.png"},{"revision":"ab92df0270f054ca388127c9703a4911","url":"icons/icon-128x128.png"},{"revision":"7659f0d3e9602e71811f8b7cf2ce0e8e","url":"icons/icon-192x192.png"},{"revision":"cf5ad3498fb6fda43bdafd3c6ce9b824","url":"icons/icon-256x256.png"},{"revision":"fdfc1b3612b6833a27a7b260c9990247","url":"icons/icon-384x384.png"},{"revision":"2c2dc987945806196bd18cb6028d8bf4","url":"icons/icon-512x512.png"},{"revision":"8de1b0e67a62b881cd22d935f102a0e6","url":"icons/ms-icon-144x144.png"},{"revision":"3e4c3730b00c89591de9505efb73afd3","url":"icons/safari-pinned-tab.svg"},{"revision":"3bd606c36d856f675a12a81070f18f12","url":"index.html"},{"revision":"f775492dcfc7cd54193654b8b61ef856","url":"manifest.json"}]);Y();k(new $(J("index.html"),{denylist:[new RegExp("sw\\.js$"),/workbox-(.)*\.js$/]}));self.addEventListener("install",o=>{console.log("[Service Worker] \u0423\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E"),o.waitUntil(caches.open("weather-cache").then(e=>e.addAll(["/","/index.html","/manifest.json","/icons/icon-192x192.png","/icons/icon-512x512.png"])))});self.addEventListener("fetch",o=>{o.respondWith(caches.match(o.request).then(e=>e||fetch(o.request)))});})();
