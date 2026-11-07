var Xu=Object.defineProperty;var qu=(n,e,t)=>e in n?Xu(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var Dt=(n,e,t)=>qu(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const Wa=Object.freeze,Gn=0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,Nr=0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,lh=0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,hh=0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,Yu=Wa({p:Gn,n:Nr,h:1n,a:0n,b:7n,Gx:lh,Gy:hh}),Jt=32,Mc=n=>n instanceof Uint8Array||ArrayBuffer.isView(n)&&n.constructor.name==="Uint8Array"&&n.BYTES_PER_ELEMENT===1,Gt=(n,e,t="")=>{if(Mc(n)&&(e===void 0||n.length===e))return n;const i=Mc(n),r=e!==void 0?` of length ${e}`:"",s=i?`length=${n.length}`:`type=${typeof n}`,o=(t?`"${t}" `:"")+"expected Uint8Array"+r+", got "+s;throw i?new RangeError(o):new TypeError(o)},$u=n=>Uint8Array.from(n),ju=(n,e,t)=>$u(Gt(n,t,e)),uh=(n,e)=>n.toString(16).padStart(e,"0"),dh=n=>{let e="";for(const t of Gt(n))e+=uh(t,2);return e},fh=n=>{const e="hex invalid";if(typeof n!="string")throw new TypeError(e);if(n.length%2||!/^[\da-f]*$/i.test(n))throw new RangeError(e);const t=new Uint8Array(n.length/2);for(let i=0,r=0;i<t.length;i++,r+=2){const s=n.charCodeAt(r),o=n.charCodeAt(r+1);t[i]=((s&15)+(s>>6)*9)*16+(o&15)+(o>>6)*9}return t},Sc=()=>{var e;const n=(e=globalThis==null?void 0:globalThis.crypto)==null?void 0:e.subtle;if(n)return n;throw new Error("crypto.subtle must be defined, consider polyfill")},qi=(...n)=>{let e=0;for(const r of n)e+=Gt(r).length;const t=new Uint8Array(e);let i=0;for(const r of n)t.set(r,i),i+=r.length;return t},Xa=(n=Jt)=>{const e=globalThis==null?void 0:globalThis.crypto;if(typeof(e==null?void 0:e.getRandomValues)!="function")throw new Error("crypto.getRandomValues must be defined, consider polyfill");return e.getRandomValues(new Uint8Array(n))},Ku=BigInt,Fr=(n,e,t,i="bad number: out of range")=>{if(typeof n!="bigint")throw new TypeError(i);if(e<=n&&n<t)return n;throw new RangeError(i)},Ae=(n,e=Gn)=>(n%=e)>=0n?n:e+n,Bs=n=>Ae(n,Nr),Zu=(n,e)=>{if(n===0n)throw new Error("invert: expected non-zero number");if(e<=1n)throw new Error("invert: expected modulus > 1, got "+e);let t=Ae(n,e),i=e,r=0n,s=1n;for(;t!==0n;){const a=i/t,c=i-t*a,l=r-s*a;i=t,t=c,r=s,s=l}if(i!==1n)throw new Error("invert: does not exist");return Ae(r,e)},ph=n=>{const e=td[n];if(typeof e!="function")throw new Error("hashes."+n+" not set");return e},Ec=(n,e,t)=>Gt(ph(n)(e,t),Jt,"digest"),wc=async(n,e,t)=>Gt(await ph(n)(e,t),Jt,"digest"),Ks=n=>{if(n instanceof Yn)return n;throw new TypeError("Point expected")},Zs="bad point: not on curve",mh=n=>Ae(Ae(n*n)*n+7n),Tc=n=>Fr(n,0n,Gn),wr=n=>Fr(n,1n,Gn),gh=n=>Fr(n,1n,Nr),ks=n=>!(n&1n),Ju=n=>Uint8Array.of(ks(n)?2:3),_h=n=>{const e=mh(wr(n));let t=1n;for(let i=e,r=(Gn+1n)/4n;r>0n;r>>=1n)r&1n&&(t=t*i%Gn),i=i*i%Gn;if(Ae(t*t)!==e)throw new Error("sqrt invalid");return new Yn(n,ks(t)?t:Ae(-t),1n)},xn=class xn{constructor(e,t,i){Dt(this,"X");Dt(this,"Y");Dt(this,"Z");this.X=Tc(e),this.Y=wr(t),this.Z=Tc(i),Wa(this)}static CURVE(){return Yu}static fromAffine(e){const{x:t,y:i}=e;return t===0n&&i===0n?Tr:new xn(t,i,1n)}static fromBytes(e){Gt(e);const t=e.length,i=e[0],r=Ps(e,1,33);try{if(t===33&&(i===2||i===3)){const s=_h(r);return i===3?s.negate():s}if(t===65&&i===4)return new xn(r,Ps(e,33,65),1n).assertValidity()}catch{throw new Error(Zs)}throw new Error(Zs)}static fromHex(e){return xn.fromBytes(fh(e))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){const{X:t,Y:i,Z:r}=this,{X:s,Y:o,Z:a}=Ks(e);return Ae(t*a)===Ae(s*r)&&Ae(i*a)===Ae(o*r)}is0(){return this.Z===0n}negate(){return new xn(this.X,Ae(-this.Y),this.Z)}double(){return this.add(this)}add(e){const{X:t,Y:i,Z:r}=this,{X:s,Y:o,Z:a}=Ks(e),c=0n,l=7n;let h=0n,u=0n,f=0n;const m=Ae(l*3n);let v=Ae(t*s),g=Ae(i*o),p=Ae(r*a),d=Ae(t+i),_=Ae(s+o);d=Ae(d*_),_=Ae(v+g),d=Ae(d-_),_=Ae(t+r);let y=Ae(s+a);return _=Ae(_*y),y=Ae(v+p),_=Ae(_-y),y=Ae(i+r),h=Ae(o+a),y=Ae(y*h),h=Ae(g+p),y=Ae(y-h),f=Ae(c*_),h=Ae(m*p),f=Ae(h+f),h=Ae(g-f),f=Ae(g+f),u=Ae(h*f),g=Ae(v+v),g=Ae(g+v),p=Ae(c*p),_=Ae(m*_),g=Ae(g+p),p=Ae(v-p),p=Ae(c*p),_=Ae(_+p),v=Ae(g*_),u=Ae(u+v),v=Ae(y*_),h=Ae(d*h),h=Ae(h-v),v=Ae(d*g),f=Ae(y*f),f=Ae(f+v),new xn(h,u,f)}subtract(e){return this.add(Ks(e).negate())}multiply(e,t=!0){if(!t&&e===0n)return Tr;if(gh(e),e===1n)return this;if(this.equals(di))return ld(e).p;let i=Tr,r=di,s=this;for(let o=0;t?o<256:e>0n;o++)e&1n?i=i.add(s):t&&(r=r.add(s)),s=s.double(),e>>=1n;return i}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){const{X:e,Y:t,Z:i}=this;if(i===0n)return{x:0n,y:0n};if(i===1n)return{x:e,y:t};const r=Zu(i,Gn);if(Ae(i*r)!==1n)throw new Error("inverse invalid");return{x:Ae(e*r),y:Ae(t*r)}}assertValidity(){const{x:e,y:t}=this.toAffine();if(wr(e),wr(t),Ae(t*t)!==mh(e))throw new Error(Zs);return this}toBytes(e=!0){const{x:t,y:i}=this.assertValidity().toAffine(),r=bn(t);return e?qi(Ju(i),r):qi(Uint8Array.of(4),r,bn(i))}toHex(e){return dh(this.toBytes(e))}};Dt(xn,"BASE"),Dt(xn,"ZERO");let Yn=xn;const di=new Yn(lh,hh,1n),Tr=new Yn(0n,1n,0n);Yn.BASE=di;Yn.ZERO=Tr;const Qu=(n,e,t)=>di.multiply(e,!1).add(n.multiply(t,!1)).assertValidity(),_i=n=>Ku("0x"+(dh(n)||"0")),Ps=(n,e,t)=>_i(n.subarray(e,t)),bn=n=>fh(uh(Fr(n,0n,2n**256n),Jt*2)),ed=n=>{const e=_i(Gt(n,Jt,"secret key"));return Fr(e,1n,Nr,"invalid secret key: outside of range")},bc="SHA-256",td={hmacSha256Async:async(n,e)=>{const t=Sc(),i=await t.importKey("raw",n,{name:"HMAC",hash:bc},!1,["sign"]);return new Uint8Array(await t.sign("HMAC",i,e))},hmacSha256:void 0,sha256Async:async n=>new Uint8Array(await Sc().digest(bc,n)),sha256:void 0},nd=n=>{if(n=n===void 0?Xa(48):n,Gt(n),n.length<48||n.length>1024)throw new RangeError("expected 48-1024b");const e=Ae(_i(n),Nr-1n);return bn(e+1n)},id=n=>e=>{const t=nd(e);return{secretKey:t,publicKey:n(t)}},vh=n=>Uint8Array.from("BIP0340/"+n,e=>e.charCodeAt(0)),Xo=(n,...e)=>{const t=Ec("sha256",vh(n));return Ec("sha256",qi(t,t,...e))},qo=(n,...e)=>wc("sha256Async",vh(n)).then(t=>wc("sha256Async",qi(t,t,...e))),qa=n=>{const e=ed(n),t=di.multiply(e),{x:i,y:r}=t.assertValidity().toAffine(),s=ks(r)?e:Bs(-e),o=bn(i);return{d:s,px:o}},Ya=n=>Bs(_i(n)),yh=(...n)=>Ya(Xo("challenge",...n)),xh=async(...n)=>Ya(await qo("challenge",...n)),Mh=n=>qa(n).px,rd=id(Mh),Sh=(n,e,t)=>{const i=ju(n,"message"),{px:r,d:s}=qa(e);return{m:i,px:r,d:s,a:Gt(t,Jt)}},Eh=n=>{const e=Ya(n);if(e===0n)throw new Error("sign failed: k is zero");const{px:t,d:i}=qa(bn(e));return{rx:t,k:i}},wh=(n,e,t,i)=>qi(e,bn(Bs(n+t*i))),Th="invalid signature produced",sd=(n,e,t=Xa(Jt))=>{const{m:i,px:r,d:s,a:o}=Sh(n,e,t),a=bn(s^_i(Xo("aux",o))),{rx:c,k:l}=Eh(Xo("nonce",a,r,i)),h=wh(l,c,yh(c,r,i),s);if(!Ah(h,i,r))throw new Error(Th);return h},od=async(n,e,t=Xa(Jt))=>{const{m:i,px:r,d:s,a:o}=Sh(n,e,t),a=bn(s^_i(await qo("aux",o))),{rx:c,k:l}=Eh(await qo("nonce",a,r,i)),h=wh(l,c,await xh(c,r,i),s);if(!await Rh(h,i,r))throw new Error(Th);return h},ad=(n,e)=>n instanceof Promise?n.then(e):e(n),bh=(n,e,t,i)=>{const r=Gt(n,64,"signature"),s=Gt(e,void 0,"message"),o=Gt(t,Jt,"publicKey");let a,c,l,h;try{const u=_i(o);a=_h(u),c=wr(Ps(r,0,Jt)),l=gh(Ps(r,Jt,64)),h=qi(bn(c),o,s)}catch{return!1}return ad(i(h),u=>{try{const{x:f,y:m}=Qu(a,l,Bs(-u)).toAffine();return!(!ks(m)||f!==c)}catch{return!1}})},Ah=(n,e,t)=>bh(n,e,t,yh),Rh=async(n,e,t)=>bh(n,e,t,xh),Ch=Wa({keygen:rd,getPublicKey:Mh,sign:sd,verify:Ah,signAsync:od,verifyAsync:Rh}),cd=()=>{const n=[];let e=di,t=e;for(let i=0;i<33;i++){t=e,n.push(t);for(let r=1;r<128;r++)t=t.add(e),n.push(t);e=t.double()}return n};let Ac;const Rc=(n,e)=>{const t=e.negate();return n?t:e},ld=n=>{const e=Ac||(Ac=cd());let t=Tr,i=di;for(let r=0;r<33;r++){let s=Number(n&255n);n>>=8n,s>128&&(s-=256,n+=1n);const o=r*128,a=o+Math.abs(s)-1,c=r%2!==0,l=s<0;s===0?i=i.add(Rc(c,e[o])):t=t.add(Rc(l,e[a]))}if(n!==0n)throw new Error("invalid wnaf");return{p:t,f:i}},{floor:Yo,min:hd,sin:ud}=Math,St="Trystero",$a=(n,e)=>Array(n).fill(void 0).map(e),dd="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",vi=n=>$a(n,()=>dd[Yo(Math.random()*62)]??"").join(""),Mt=vi(20),yi=Promise.all.bind(Promise),Ph=typeof window<"u",{entries:Yi,fromEntries:Lh,keys:Kt,values:_n}=Object,gt=()=>{},Dh="candidate",$e=n=>(n!==null&&clearTimeout(n),null),Xe=n=>new Error(`${St}: ${n}`),$i=(n,e)=>n instanceof Error&&n.message?n.message:typeof n=="string"&&n?n:Rt(n??e),Hn=(n,e)=>n instanceof Error?n:Xe($i(n,e)),fd=new TextEncoder,pd=new TextDecoder,Sn=n=>fd.encode(n),ui=n=>pd.decode(n),Pr=n=>n.reduce((e,t)=>e+t.toString(16).padStart(2,"0"),""),ji=(...n)=>n.join("@"),md=(n,e)=>{const t=[...n],i=()=>{const s=ud(e++)*1e4;return s-Yo(s)};let r=t.length;for(;r;){const s=Yo(i()*r--),o=t[r];t[r]=t[s],t[s]=o}return t},gd=(n,e,t,i=!1)=>{var r,s;return((r=n.relayConfig)==null?void 0:r.urls)||(i?md(e,Ih(n.appId)):e).slice(0,((s=n.relayConfig)==null?void 0:s.redundancy)??t)},Rt=JSON.stringify,Or=n=>{try{return JSON.parse(n)}catch{throw Xe(`failed to parse JSON: ${n}`)}},Ih=(n,e=Number.MAX_SAFE_INTEGER)=>n.split("").reduce((t,i)=>t+i.charCodeAt(0),0)%e,Cc=3333,_d=6e4,cr={};let br=null,Ar=null;const vd=()=>{br||(br=new Promise(n=>{Ar=n}).finally(()=>{Ar=null,br=null}))},yd=()=>{Ar==null||Ar()},xd=(n,e,t)=>{const i={};let r=!1,s=!1,o,a=gt;i.isClosed=!1,i.ready=new Promise(l=>a=l);const c=()=>{if(i.isClosed)return;o=void 0,s=!1;const l=new WebSocket(n);l.onclose=()=>{if(i.isClosed||s)return;if(s=!0,br){br.then(c);return}const h=cr[n]??(cr[n]=Cc);o=setTimeout(c,Math.random()*h),cr[n]=hd(h*2,_d)},l.onmessage=h=>e(String(h.data)),i.socket=l,i.url=l.url,l.onopen=()=>{const h=r;r=!0,a(i),cr[n]=Cc,h&&(t==null||t())},i.send=h=>{l.readyState===1&&l.send(h)}};return i.close=()=>{i.isClosed=!0,o!==void 0&&(clearTimeout(o),o=void 0),i.socket.close()},c(),i},Md=n=>{const e={},t=new WeakMap,i=o=>{const a=t.get(o);if(!a)throw Xe("relay bookkeeping missing registration for relay client");return a},r=()=>{const o={},a=c=>o[c]??(o[c]={});return{forKey:a,forRelay:c=>a(i(c))}},s=(o,a)=>(e[o]=a,t.set(a,o),a);return{register:(o,a)=>{const c=e[o];return c||s(o,a())},keyOf:i,scoped:r,getSockets:()=>Lh(Yi(e).flatMap(([o,a])=>{const c=n(a);return c?[[o,c]]:[]}))}},Sd=()=>{if(Ph){const n=new AbortController;return addEventListener("online",yd,{signal:n.signal}),addEventListener("offline",vd,{signal:n.signal}),()=>n.abort()}return gt},ja="AES-GCM",Js={},Ed=n=>btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(n)))),wd=n=>{const e=atob(n);return new Uint8Array(e.length).map((t,i)=>e.charCodeAt(i)).buffer},zs=async(n,e)=>new Uint8Array(await crypto.subtle.digest(n,Sn(e))),Ki=async n=>Js[n]??(Js[n]=Array.from(await zs("SHA-1",n)).map(e=>e.toString(36)).join("")),Td=async(n,e,t)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},Sn(`${n}:${e}:${t}`)),{name:ja},!1,["encrypt","decrypt"]),bd=async(n,e)=>Pr(await zs("SHA-256",`${St}:${n}:${e}`)),Uh="$",Nh=",",Ad=async(n,e)=>{const t=crypto.getRandomValues(new Uint8Array(16));return t.join(Nh)+Uh+Ed(await crypto.subtle.encrypt({name:ja,iv:t},await n,Sn(e)))},Rd=async(n,e)=>{const[t,i]=e.split(Uh);return ui(await crypto.subtle.decrypt({name:ja,iv:new Uint8Array((t==null?void 0:t.split(Nh).map(Number))??[])},await n,wd(i??"")))},Cd=18e4;var Pd=class{constructor(n){Dt(this,"makeOffer");Dt(this,"leased",new Map);Dt(this,"destroyed",!1);this.makeOffer=n}claimLeased(n){const e=this.leased.get(n);e&&($e(e),this.leased.delete(n))}reclaimLeased(n){this.leased.has(n)&&(this.claimLeased(n),n.destroy())}checkout(n,e,t){const i=async(r=!1)=>{if(this.destroyed)throw Xe("room left while preparing offer");const s=this.makeOffer();try{const o=await t(s);if(this.destroyed)throw Xe("room left while preparing offer");return e?(this.leased.set(s,setTimeout(()=>{this.leased.delete(s),s.destroy()},Cd)),{peer:s,offer:o,claim:()=>this.claimLeased(s),reclaim:()=>this.reclaimLeased(s)}):{peer:s,offer:o}}catch(o){if(s.destroy(),!r&&!this.destroyed)return i(!0);throw o}};return yi($a(n,()=>i()))}getOffers(n,e){return this.checkout(n,!0,e)}destroy(){this.destroyed=!0,this.leased.forEach((n,e)=>{$e(n),e.destroy()}),this.leased.clear()}};const Qs=Xe("incorrect password for overlapping room"),Ld=(n,e,t)=>{const i=o=>zs("SHA-256",`${o}:${n}:${e}:${t}`).then(Pr),r=async(o,a,c)=>{if(!n)return;if(c){const h=vi(36);await o({__trystero_pw:"challenge",c:h});const{data:u}=await a();if(!u||typeof u!="object"||u.__trystero_pw!=="response"||typeof u.h!="string")throw Qs;const f=await i(h);if(u.h!==f)throw Qs;return}const{data:l}=await a();if(!l||typeof l!="object"||l.__trystero_pw!=="challenge"||typeof l.c!="string")throw Qs;await o({__trystero_pw:"response",h:await i(l.c)})};return{run:r,compose:o=>n||o?async(a,c,l,h)=>{await r(c,l,h),await(o==null?void 0:o(a,c,l,h))}:void 0}},Dd=n=>{const e=$i(n,"unknown error");return e.startsWith("handshake ")?e:`handshake failed: ${e}`},Id=({onPeerHandshake:n,onHandshakeError:e,handshakeTimeoutMs:t,sendHandshakeData:i,sendHandshakeReady:r,onActivate:s,onFailure:o})=>{const a={},c=(u,f)=>{const m=a[u];!m||f&&m.peer!==f||m.isActive||!m.didLocalHandshakePass||!m.didReceiveRemoteReady||(m.isActive=!0,m.handshakeTimer=$e(m.handshakeTimer),s(u,m.peer))},l=(u,f,m)=>{const v=a[u];if(!v||v.peer!==f)return;const g=Dd(m);e==null||e(u,g),o(u,f,Xe(g))},h=(u,f)=>{const m=a[u];!m||m.peer!==f||m.isActive||(m.didLocalHandshakePass=!0,r("",u).catch(v=>l(u,f,Xe(`failed sending handshake readiness: ${$i(v,"unknown send failure")}`))),c(u,f))};return{addPeer:(u,f)=>{a[u]={peer:f,isActive:!1,didLocalHandshakePass:!1,didReceiveRemoteReady:!1,handshakeTimer:null,pendingHandshakePayloads:[],handshakeWaiters:[]}},clearPeer:(u,f)=>{const m=a[u];m&&(m.handshakeTimer=$e(m.handshakeTimer),m.pendingHandshakePayloads.length=0,m.handshakeWaiters.splice(0).forEach(v=>v.reject(f)),delete a[u])},canReceiveFromPeer:(u,f)=>{const m=a[u];return!!(m&&(m.isActive||f))},start:(u,f)=>{const m=a[u];if(!m||m.peer!==f)return;m.handshakeTimer=setTimeout(()=>l(u,f,Xe(`handshake timed out after ${t}ms`)),t);const v=async(d,_)=>{await i(d,u,_)},g=()=>new Promise((d,_)=>{const y=a[u];if(!y||y.peer!==f){_(Xe("peer disconnected during handshake"));return}const x=y.pendingHandshakePayloads.shift();if(x){d(x);return}y.handshakeWaiters.push({resolve:d,reject:P=>_(P)})}),p=Mt<u;Promise.resolve(n==null?void 0:n(u,v,g,p)).then(()=>h(u,f)).catch(d=>l(u,f,Hn(d,"handshake failed")))},receiveHandshakeData:(u,f,m)=>{const v=a[f];if(!v||v.isActive)return;const g=m===void 0?{data:u}:{data:u,metadata:m},p=v.handshakeWaiters.shift();if(p){p.resolve(g);return}if(v.pendingHandshakePayloads.length>=16){l(f,v.peer,Xe("too many pending handshake messages"));return}v.pendingHandshakePayloads.push(g)},receiveHandshakeReady:u=>{const f=a[u];!f||f.isActive||(f.didReceiveRemoteReady=!0,c(u))}}},Fh=16384,$o=1e4,Ls=12e4,Ud=15e3,Nd=150,Fd=5e3,Pc="icecandidate",Lc="icegatheringstatechange",Od="iceconnectionstatechange",lr="offer",Bd="answer",kd=/out of range/i,zd=128,Hd=8192,Dc=n=>n.replace(/ (\S+\.local) (\d+) typ host/g," 127.0.0.1 $2 typ host");var Ic=(n,{trickleIce:e,rtcConfig:t,rtcPolyfill:i,turnConfig:r,_test_only_mdnsHostFallbackToLoopback:s})=>{const o=new(i??RTCPeerConnection)({iceServers:Uc.concat(r??[]),...t}),a={},c=new Set,l=[],h=[];let u=null;const f=e!==!1,m=[],v=[];let g,p=!1,d=!1,_=null,y=null,x=!1;const P=$=>{g&&(g($),g=void 0)},A=()=>y=$e(y),C=()=>{var $;x||(x=!0,c.forEach(Q=>Q()),u=$e(u),h.length=0,A(),($=a.close)==null||$.call(a))},L=$=>{$.type===lr&&(P($),!a.signal&&!o.remoteDescription)||(a.signal?a.signal($):l.push($))},w=$=>{const Q=a.signal;a.signal=ue=>{Q==null||Q(ue),$(ue)},l.length>0&&l.splice(0).forEach(ue=>{var U;return(U=a.signal)==null?void 0:U.call(a,ue)})},M=$=>s?Dc($):$,D=$=>{if(!s||typeof $.candidate!="string")return $;const Q=Dc($.candidate);return Q===$.candidate?$:{...$,candidate:Q}},W=$=>{var Q,ue;return{type:((Q=$.localDescription)==null?void 0:Q.type)??lr,sdp:M(((ue=$.localDescription)==null?void 0:ue.sdp)??"")}},S=()=>{var Q,ue;const $=(Q=o.remoteDescription)==null?void 0:Q.sdp;return $?((ue=$.match(/a=ice-ufrag:([^\s]+)/))==null?void 0:ue[1])??null:null},R=()=>{var $,Q;return(((Q=($=o.remoteDescription)==null?void 0:$.sdp)==null?void 0:Q.match(/^m=/gm))??[]).length},N=$=>{if(!o.remoteDescription)return!1;const Q=R();if(typeof $.sdpMLineIndex=="number"&&Q>0&&$.sdpMLineIndex>=Q)return!1;const ue=S();return!(ue&&$.usernameFragment&&$.usernameFragment!==ue)},I=async $=>{try{return await o.addIceCandidate($),!0}catch(Q){if(Q instanceof Error&&kd.test(Q.message)&&typeof $.sdpMLineIndex=="number")return!1;throw Q}},z=$=>{m.length>=zd&&m.shift(),m.push($)},B=async()=>{if(!o.remoteDescription||m.length===0)return;const $=S(),Q=m.splice(0),ue=[];for(const U of Q)if(!($&&U.usernameFragment&&U.usernameFragment!==$)){if(!N(U)){ue.push(U);continue}await I(U)||ue.push(U)}ue.forEach(z)},F=async $=>{if(N($)){await I($)||z($);return}z($)},k=$=>{$.binaryType="arraybuffer",$.bufferedAmountLowThreshold=65535;const Q=()=>{console.warn(`${St}: invalid or excessive data before handler registration; disconnecting peer`),$.close(),o.close(),C()};$.onmessage=ue=>{const U=ue.data;if(!x){if(!(U instanceof ArrayBuffer)&&!ArrayBuffer.isView(U)||U.byteLength>16515){Q();return}if(a.data)a.data(U);else{if(h.length>=64){Q();return}u||(u=setTimeout(Q,$o)),h.push(U)}}},$.onopen=()=>{var ue;return(ue=a.connect)==null?void 0:ue.call(a)},$.onclose=C,$.onerror=({error:ue})=>{var U;x||(ue==null?void 0:ue.errorDetail)==="sctp-failure"&&(ue.sctpCauseCode===12||/^User-Initiated Abort\b/.test(ue.message))||(U=a.error)==null||U.call(a,Hn(ue,"data channel error"))}},Z=(t==null?void 0:t.iceServers)??Uc.concat(r??[]),ae=$=>Z.some(({urls:Q})=>(Array.isArray(Q)?Q:[Q]).some(ue=>$.test(ue))),xe=ae(/^turns?:/i),X=!xe&&ae(/^stuns?:/i),ne=xe?/\btyp relay\b/:X?/\btyp (?:srflx|relay|prflx)\b/:/\btyp (?:host|srflx|relay|prflx)\b/,he=async $=>(await new Promise(Q=>{let ue=null,U=null;const Ne=()=>{$e(ue),$e(U),$.removeEventListener(Lc,Oe),$.removeEventListener(Pc,Se),c.delete(Ne),Q()},Ue=(Ee="")=>{var b;const me=`${((b=$.localDescription)==null?void 0:b.sdp)??""}
${Ee}`;ne.test(me)&&($e(U),U=setTimeout(Ne,Nd))},Oe=()=>{$.iceGatheringState==="complete"||x?Ne():Ue()},Se=Ee=>{const{candidate:me}=Ee;me?Ue(me.candidate):Ne()};c.add(Ne),ue=setTimeout(Ne,Ud),$.addEventListener(Lc,Oe),$.addEventListener(Pc,Se),Oe()}),W($)),ce=async()=>{const $=f?W(o):await he(o);return x||L($),$};n?(_=o.createDataChannel("data"),k(_)):o.ondatachannel=({channel:$})=>{_=$,k($)};const Re=async($=!1)=>{var Q,ue;if(o.connectionState==="closed"||!$&&(p||o.signalingState!=="stable")){o.connectionState==="closed"&&P();return}try{return p=!0,$&&(o.remoteDescription&&o.signalingState!=="stable"&&o.signalingState!=="closed"&&((Q=o.localDescription)==null?void 0:Q.type)===lr&&await o.setLocalDescription({type:"rollback"}),typeof o.restartIce=="function"&&o.restartIce()),await o.setLocalDescription($?await o.createOffer({iceRestart:!0}):void 0),await ce()}catch(U){$||P(),(ue=a.error)==null||ue.call(a,Hn(U,"failed to create local offer"))}finally{p=!1}};o.onnegotiationneeded=async()=>Re(!1),o.onicecandidate=({candidate:$})=>{if(!f||!$)return;const Q=D(typeof $.toJSON=="function"?$.toJSON():{candidate:$.candidate,sdpMid:$.sdpMid,sdpMLineIndex:$.sdpMLineIndex,usernameFragment:$.usernameFragment});L({type:Dh,sdp:JSON.stringify(Q)})};const Le=()=>{if(o.connectionState==="failed"||o.connectionState==="closed"||o.iceConnectionState==="failed"||o.iceConnectionState==="closed"){C();return}if(o.connectionState==="connected"||o.connectionState==="connecting"||o.iceConnectionState==="connected"||o.iceConnectionState==="completed"||o.iceConnectionState==="checking"){A();return}if(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected"){y||(y=setTimeout(()=>{y=null,(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected")&&C()},Fd));return}};o.onconnectionstatechange=Le,o.addEventListener(Od,Le),o.ontrack=$=>{var ue,U;const Q=$.streams[0];if(Q){if(!a.track&&!a.stream){v.push({track:$.track,stream:Q});return}(ue=a.track)==null||ue.call(a,$.track,Q),(U=a.stream)==null||U.call(a,Q)}};const Ie=n?new Promise($=>{g=$}):Promise.resolve();return n&&queueMicrotask(()=>{var $;!p&&o.signalingState==="stable"&&!o.localDescription&&o.connectionState!=="closed"&&(($=o.onnegotiationneeded)==null||$.call(o,new Event("negotiationneeded")))}),{connection:o,get channel(){return _},get isDead(){return o.connectionState==="closed"},getOffer:async($=!1)=>{var Q;if(n)return $?Re(!0):g?Ie:((Q=o.localDescription)==null?void 0:Q.type)===lr?f?W(o):he(o):Ie},async signal($){var Q,ue,U;if($.type==="candidate"){if($.sdp.length>Hd)return;try{const Ne=JSON.parse($.sdp);Ne&&typeof Ne=="object"&&await F(D(Ne))}catch(Ne){(Q=a.error)==null||Q.call(a,Hn(Ne,"failed to parse remote candidate"))}return}if(!((_==null?void 0:_.readyState)==="open"&&!((ue=$.sdp)!=null&&ue.includes("a=rtpmap"))))try{const Ne={...$,sdp:M($.sdp)};if($.type===lr){const Ue=p||o.signalingState!=="stable"&&!d;return Ue&&n?void 0:(Ue&&o.signalingState!=="stable"?await yi([o.setLocalDescription({type:"rollback"}),o.setRemoteDescription(Ne)]):await o.setRemoteDescription(Ne),await B(),await o.setLocalDescription(),await ce())}if($.type===Bd){d=!0;try{await o.setRemoteDescription(Ne),await B()}finally{d=!1}}}catch(Ne){(U=a.error)==null||U.call(a,Hn(Ne,"failed to apply remote signal"))}},sendData:$=>_==null?void 0:_.send($),destroy:()=>{A(),P(),_==null||_.close(),o.close(),p=!1,d=!1,C()},setHandlers:$=>{const{signal:Q,...ue}=$;Object.assign(a,ue),a.data&&h.length>0&&(u=$e(u),h.splice(0).forEach(U=>{var Ne;return(Ne=a.data)==null?void 0:Ne.call(a,U)})),Q&&w(Q),(a.track||a.stream)&&v.length>0&&v.splice(0).forEach(({track:U,stream:Ne})=>{var Ue,Oe;(Ue=a.track)==null||Ue.call(a,U,Ne),(Oe=a.stream)==null||Oe.call(a,Ne)})},addStream:$=>$.getTracks().forEach(Q=>o.addTrack(Q,$)),removeStream:$=>o.getSenders().filter(Q=>Q.track&&$.getTracks().includes(Q.track)).forEach(Q=>o.removeTrack(Q)),addTrack:($,Q)=>o.addTrack($,Q),removeTrack:$=>{const Q=o.getSenders().find(ue=>ue.track===$);Q&&o.removeTrack(Q)},replaceTrack:($,Q)=>{const ue=o.getSenders().find(U=>U.track===$);if(ue)return ue.replaceTrack(Q)}}};const Uc=[...$a(3,(n,e)=>`stun:stun${e||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(n=>({urls:n})),Vd=1024,Gd=64,Wd=128,Xd=8,qd=new Uint8Array,Yd=(n,e)=>{let t;try{t=n()}catch{return e(!1)}return typeof t=="boolean"?e(t):Promise.resolve(t).then(i=>e(i===!0),()=>e(!1))},Nc=(n,e,t)=>e===2?t?n.slice():n:e===1?Or(ui(n)):ui(n),Oh=(n,e,t,i)=>{try{n.progress(e,t,i)}catch(r){console.error(`${St} progress handler error:`,r)}},Fc=(n,e,t,i)=>{var r;Oh(n,1,t,i);try{(r=n.receiver)==null||r.call(n,e,t,i)}catch(s){console.error(`${St} action handler error:`,s)}},$d=({fail:n,accept:e,refuse:t,maxReceiveBytes:i,chunkSize:r})=>{const s=new Map,o=new Map,a=new Set,c=new Map;let l=0,h=0,u=0,f=!1,m=!1;const v=S=>S.phase!=="released",g=S=>Math.min(i,(S==null?void 0:S.maxPayloadBytes)??i),p=(S,R,N,I)=>{var z,B;N==null||N.reject(R),(B=(z=s.get(S.type))==null?void 0:z.reject)==null||B.call(z,S.peerId,S.metadata,R),I!==void 0&&t(S.peerId,I,R)},d=S=>{for(const R of Array.from(a))R.peerId===S&&(a.delete(R),a.add(R))},_=S=>{var N,I;if(!v(S))return;S.phase="released",(N=S.removeAbortListener)==null||N.call(S),S.timer=$e(S.timer);const R=o.get(S.peerId);if(S.kind==="inline"){const z=R.inline.get(S.key);z.splice(z.indexOf(S),1),z.length||R.inline.delete(S.key),S.data=qd}else R.bulk.delete(S.id),a.delete(S),S.data=null,S.transfer==="receiving"&&(u-=S.size,R.active===S&&(R.active=null,d(S.peerId)),m=!0);R.count--,l--,R.count||o.delete(S.peerId),(I=S.controller)==null||I.abort()},y=(S,R)=>{v(S)&&(_(S),p(S,R,S.scope,S.kind==="bulk"?S.id:void 0))},x=(S,R)=>{if(S.phase!=="pending")return S.phase==="ready";if(S.size>g(R))return y(S,"payload exceeds receiver size limit"),!1;const N=S.scope?S.scope.receive:R.receive;if(!N)return R.receiver?(S.phase="ready",!0):!1;if(h>=Wd||(c.get(S.peerId)??0)>=Xd)return y(S,"too many pending receive decisions"),!1;S.phase="deciding";const I=new AbortController;S.controller=I,h++,c.set(S.peerId,(c.get(S.peerId)??0)+1);const z=Yd(()=>N({byteLength:S.size,peerId:S.peerId,signal:I.signal,...S.metadata===void 0?{}:{metadata:S.metadata}}),B=>{h--;const F=c.get(S.peerId)-1;return F?c.set(S.peerId,F):c.delete(S.peerId),v(S)?(B?S.phase="ready":y(S,"payload rejected by receiver"),B):!1});return typeof z=="boolean"?z:(z.then(()=>w()),!1)},P=(S,R,N)=>{let I;try{I=Nc(N,S.format,S.kind==="inline")}catch{_(S),n(S.peerId,"invalid action payload");return}_(S),Fc(R,I,S.peerId,S.metadata)},A=S=>{const R=s.get(S.type);v(S)&&R&&x(S,R)&&R.receiver&&P(S,R,S.data)},C=S=>{const R=s.get(S.type);if(!v(S)||!R||!x(S,R)||!R.receiver)return;if(S.transfer==="receiving"){S.offset===S.size&&P(S,R,S.data);return}const N=o.get(S.peerId);!N.active&&u+S.size<=i&&(N.active=S,S.transfer="receiving",u+=S.size,S.lastSeen=Date.now(),a.delete(S),e(S.peerId,S.id))},L=(S,R)=>{var I;const N=(I=o.get(S))==null?void 0:I.inline.get(R);for(;N!=null&&N[0];){const z=N[0];if(A(z),v(z))break}},w=()=>{if(f){m=!0;return}f=!0;try{do{m=!1;for(const S of a)C(S);for(const[S,R]of o){for(const N of R.bulk.values())N.offset===N.size&&C(N);for(const N of R.inline.keys())L(S,N)}}while(m)}finally{f=!1}},M=S=>{let R=o.get(S.peerId);if(l>=Vd||((R==null?void 0:R.count)??0)>=Gd)return p(S,"too many pending transfers",S.scope,S.kind==="bulk"?S.id:void 0),!1;if(R||(R={bulk:new Map,inline:new Map,active:null,count:0},o.set(S.peerId,R)),R.count++,l++,S.kind==="inline"){const I=R.inline.get(S.key)??[];I.push(S),R.inline.set(S.key,I)}else R.bulk.set(S.id,S),a.add(S);const N=()=>{const I=Ls-(Date.now()-S.lastSeen);I>0?S.timer=setTimeout(N,I):(y(S,"action transfer timed out"),w())};if(S.timer=setTimeout(N,Ls),S.scope){const{signal:I}=S.scope,z=()=>{y(S,"receive cancelled"),w()};if(I.addEventListener("abort",z,{once:!0}),S.removeAbortListener=()=>I.removeEventListener("abort",z),I.aborted)return z(),!1}return!0},D=(S,R)=>{var z;const N=s.get(S.type),I=(z=N==null?void 0:N.receiveScope)==null?void 0:z.call(N,S.peerId,S.metadata);return I===null||I!=null&&I.signal.aborted?(R!==void 0&&t(S.peerId,R,"unexpected response"),null):S.size>g(N)?(p(S,"payload exceeds receiver size limit",I,R),null):{action:N,scope:I}},W=(S,R)=>({...S,...R?{scope:R}:{},phase:"pending",controller:null,lastSeen:Date.now(),timer:null});return{register:(S,R={})=>{const N={...R,receiver:null,receive:null,reject:null,progress:gt};return s.set(S,N),{onMessage:I=>{N.receiver=I,w()},onReceive:I=>{N.receive=I,w()},onReject:I=>{N.reject=I},onProgress:I=>{N.progress=I}}},receiveInline:(S,R)=>{var k;const N=D(S);if(!N)return;const{action:I,scope:z}=N,B=z?`${S.type}\0${z.key}`:S.type;if(I!=null&&I.receiver&&!(z?z.receive:I.receive)&&!((k=o.get(S.peerId))!=null&&k.inline.has(B))){let Z;try{Z=Nc(R,S.format,!0)}catch{n(S.peerId,"invalid action payload");return}Fc(I,Z,S.peerId,S.metadata);return}const F={...W(S,z),kind:"inline",key:B,data:R};M(F)&&L(S.peerId,B)},receiveOffer:(S,R)=>{var z;if((z=o.get(S.peerId))!=null&&z.bulk.has(R)){n(S.peerId,"duplicate action offer");return}const N=D(S,R);if(!N)return;const I={...W(S,N.scope),kind:"bulk",id:R,transfer:"waiting",offset:0,data:null};M(I)&&w()},receiveChunk:(S,R,N,I)=>{var k;const z=o.get(S),B=z==null?void 0:z.bulk.get(R);if(!B)return;if(B.transfer!=="receiving"||N!==B.offset||!I.length||I.length!==Math.min(r,B.size-B.offset)){n(S,"invalid action chunk offset or length");return}try{B.data??(B.data=new Uint8Array(B.size))}catch{y(B,"unable to allocate receive buffer"),w();return}B.data.set(I,B.offset),B.offset+=I.length;const F=Date.now();B.lastSeen=F;for(const Z of a)Z.phase==="ready"&&((k=s.get(Z.type))!=null&&k.receiver)&&(Z.lastSeen=F);B.offset===B.size?(C(B),v(B)&&(z==null?void 0:z.active)===B&&(z.active=null,d(S)),w()):Oh(s.get(B.type),B.offset/B.size,S,B.metadata)},cancel:(S,R)=>{var I,z;const N=(I=o.get(S))==null?void 0:I.bulk.get(R);N&&(_(N),(z=N.scope)==null||z.reject("response cancelled by sender")),w()},clearPeer:S=>{const R=o.get(S);if(R){for(const N of R.bulk.values())_(N);for(const N of R.inline.values()){const I=[...N];for(const z of I)_(z)}}w()}}},jo=2,Wr=0,Xr=1,Oc=2,eo=3,to=4,qr=5,no=36,Bc=48,On=6,xr=14,io=Fh-xr,jd=256*1024**2,kc=1024**2,zc="bufferedamountlow",Hc="close",Vc="error",Kd=1e4,Bn=(n,e)=>{const t=Xe(e);return t.kind=n,t.name=n==="aborted"?"AbortError":t.name,t},Ko=n=>{if(n!=null&&n.aborted)throw Bn("aborted","operation aborted")},Gc=(n,e,t=On)=>{const i=new Uint8Array(t);return i[0]=jo,i[1]=n,new DataView(i.buffer).setUint32(2,e),i},Si=Bn,Zd=(n,e,t=Kd)=>n.readyState!=="open"||n.bufferedAmount<=n.bufferedAmountLowThreshold?Promise.resolve(n.readyState==="open"):new Promise(i=>{let r=!1,s=null;const o=l=>{r||(r=!0,n.removeEventListener(zc,a),n.removeEventListener(Hc,c),n.removeEventListener(Vc,c),e==null||e.removeEventListener("abort",c),$e(s),i(l))},a=()=>o(!0),c=()=>o(!1);if(n.addEventListener(zc,a),n.addEventListener(Hc,c),n.addEventListener(Vc,c),e==null||e.addEventListener("abort",c,{once:!0}),s=setTimeout(()=>o(!1),t),n.readyState!=="open"||e!=null&&e.aborted){o(!1);return}n.bufferedAmount<=n.bufferedAmountLowThreshold&&o(!0)}),Jd=({getPeer:n,getPeerIds:e,canReceiveFromPeer:t,onPeerError:i,throwIfAborted:r=Ko,maxReceiveBytes:s=jd})=>{if(!Number.isSafeInteger(s)||s<=0)throw Xe("maxReceiveBytes must be a positive safe integer");const o=new Map,a=new Map,c=new WeakSet;let l=0;const h=$d({fail:(p,d)=>f(p,d),accept:(p,d)=>m(p,d,eo),refuse:(p,d,_)=>m(p,d,to,_),maxReceiveBytes:s,chunkSize:io}),u=p=>{var d;for(const _ of((d=a.get(p))==null?void 0:d.values())??[])_.fail(Si("disconnected","peer disconnected"));a.delete(p),h.clearPeer(p)},f=(p,d)=>{const _=n(p,!0);_&&!c.has(_)&&(c.add(_),console.warn(`${St}: ${d}; disconnecting peer ${p}`),i(p,Xe(d)))},m=(p,d,_,y="")=>{var C;const x=n(p,!0);if(!x)return;const P=Sn(y).subarray(0,200),A=Gc(_,d,On+P.length);A.set(P,On);try{if((((C=x.channel)==null?void 0:C.bufferedAmount)??0)>kc)throw Xe("control send buffer is full");x.sendData(A)}catch{f(p,"unable to send action control")}};return{makeInternalAction:(p,d={})=>{const _={sendToPending:!!d.sendToPending,receiveWhilePending:!!d.receiveWhilePending,...d.maxPayloadBytes===void 0?{}:{maxPayloadBytes:d.maxPayloadBytes},...d.receiveScope?{receiveScope:d.receiveScope}:{}},y=o.get(p);if(y){if(y.options.sendToPending!==_.sendToPending||y.options.receiveWhilePending!==_.receiveWhilePending||y.options.receiveScope!==_.receiveScope||y.options.maxPayloadBytes!==_.maxPayloadBytes)throw Xe(`action type "${p}" cannot be redefined`);return y.action}const x=Sn(p);if(!p||p.includes("\0")||x.length>32)throw Xe("action type must contain 1–32 UTF-8 bytes and no null characters");const P={options:_,action:{...h.register(p,_),send:async(A,C,L,w,M)=>{if(r(M),A===void 0)throw Xe("action data cannot be undefined");const D=A instanceof Blob,W=D||A instanceof ArrayBuffer||ArrayBuffer.isView(A),S=W?2:typeof A=="string"?0:1;let R=D?A:A instanceof ArrayBuffer?new Uint8Array(A):ArrayBuffer.isView(A)?new Uint8Array(A.buffer,A.byteOffset,A.byteLength):Sn(S===0?A:Rt(A));const N=R instanceof Blob?R.size:R.byteLength,I=L===void 0?new Uint8Array:Sn(Rt(L));if(I.length>16336)throw Xe("action metadata is too large");const z=no+I.length+N<=Fh;!z&&W&&!(R instanceof Blob)&&(R=R.slice());const B=z?0:l++>>>0,F=z?no:Bc,k=new Uint8Array(F+I.length+(z?N:0));k[0]=jo,k[1]=(z?Wr:Xr)|S<<4,k.set(x,2);const Z=new DataView(k.buffer);Z.setUint16(34,I.length),z||(Z.setUint32(36,B),Z.setFloat64(40,N)),k.set(I,F),z&&k.set(R instanceof Blob?new Uint8Array(await R.arrayBuffer()):R,F+I.length);const ae=C?Array.isArray(C)?C:[C]:e(_.sendToPending);await yi([...new Set(ae)].map(async xe=>{const X=n(xe,_.sendToPending);if(!X){console.warn(`${St}: no peer with id ${xe} found`);return}let ne=null;const he=()=>{var Ee;if(ne)throw ne;if(r(M),n(xe,_.sendToPending)!==X||((Ee=X.channel)==null?void 0:Ee.readyState)==="closed")throw Si("disconnected","peer disconnected")},ce=async Ee=>{he();const me=X.channel;if(me&&(me.readyState!=="open"||me.bufferedAmount>me.bufferedAmountLowThreshold)){if(!await Zd(me,M))throw r(M),Si("disconnected","data channel stopped draining");he()}try{X.sendData(Ee)}catch{throw Si("disconnected","peer disconnected")}};if(z){await ce(k),w==null||w(1,xe,L);return}let Re=!1,Le=!1,Ie=Date.now(),$,Q;const ue=new Promise((Ee,me)=>{$=Ee,Q=me});ue.catch(gt);const U=a.get(xe)??new Map;if(U.has(B))throw Xe("action transmission id is still in use");a.set(xe,U);let Ne=null;const Ue={accept:()=>!Ne||ne?!1:(Ne=$e(Ne),$(),!0),fail:(Ee,me=!1)=>{me&&(Le=!0),ne=Ee,Q(Ee)},touch:()=>{Ne&&(Ie=Date.now())}};U.set(B,Ue);const Oe=()=>{const Ee=Ls-(Date.now()-Ie);Ee>0?Ne=setTimeout(Oe,Ee):Ue.fail(Si("timeout","action offer timed out"))};Ne=setTimeout(Oe,Ls);const Se=()=>{try{r(M)}catch(Ee){Ue.fail(Ee)}};M==null||M.addEventListener("abort",Se,{once:!0});try{await ce(k),Re=!0,await ue;for(let Ee=0;Ee<N;Ee+=io){he();const me=Math.min(io,N-Ee),b=Gc(Oc,B,xr+me);new DataView(b.buffer).setFloat64(On,Ee),b.set(R instanceof Blob?new Uint8Array(await R.slice(Ee,Ee+me).arrayBuffer()):R.subarray(Ee,Ee+me),xr),await ce(b);for(const E of U.values())E.touch();w==null||w((Ee+me)/N,xe,L)}he()}catch(Ee){throw Re&&!Le&&n(xe,!0)===X&&(!X.channel||X.channel.readyState==="open"&&(X.channel.bufferedAmount??0)<=kc)&&m(xe,B,qr),Ee}finally{Ne=$e(Ne),M==null||M.removeEventListener("abort",Se),U.delete(B),!U.size&&a.get(xe)===U&&a.delete(xe)}}))}}};return o.set(p,P),P.action},handleData:(p,d)=>{var N,I,z;if(d.byteLength<2||d.byteLength>16384){f(p,"invalid action frame");return}const _=new Uint8Array(d);if(_[0]!==jo){f(p,"incompatible action protocol version");return}const y=_[1]&15,x=_[1]>>>4,P=new DataView(_.buffer,_.byteOffset,_.byteLength);if(y>qr||x>2||y>Xr&&x!==0){f(p,"invalid action frame");return}if(y>=Oc){if(_.length<On||(y===eo||y===qr)&&_.length!==On||y===to&&_.length>206){f(p,"invalid action control");return}const B=P.getUint32(2);if(y===eo){const F=a.get(p);if((N=F==null?void 0:F.get(B))!=null&&N.accept())for(const k of F.values())k.touch();return}if(y===to){(z=(I=a.get(p))==null?void 0:I.get(B))==null||z.fail(Si("rejected",ui(_.subarray(On))),!0);return}y===qr?h.cancel(p,B):h.receiveChunk(p,B,_.length>=xr?P.getFloat64(On):NaN,_.subarray(xr));return}const A=y===Wr?no:Bc;if(_.length<A){f(p,"invalid action header");return}const C=ui(_.subarray(2,34)).replaceAll("\0",""),L=o.get(C);if(!t(p,!!(L!=null&&L.options.receiveWhilePending)))return;const w=P.getUint16(34),M=A+w,D=y===Wr?_.length-M:P.getFloat64(40),W=y===Xr?P.getUint32(36):0;if(!C||M>_.length||!Number.isSafeInteger(D)||D<0||y===Xr&&(D===0||M!==_.length)){f(p,"invalid action proposal");return}let S;try{w&&(S=Or(ui(_.subarray(A,M))))}catch{f(p,"invalid action metadata");return}const R={peerId:p,type:C,format:x,size:D,...S===void 0?{}:{metadata:S}};y===Wr?h.receiveInline(R,_.subarray(M)):h.receiveOffer(R,W)},clearPeer:u}},Bh=n=>n&&typeof n=="object"&&!Array.isArray(n)&&typeof n.r=="string"?n:null,Yr=n=>{const e=Bh(n);return e?{r:e.r,...Object.hasOwn(e,"m")?{m:e.m}:{}}:null},ro=n=>{const e=Bh(n);return e?{r:e.r,...typeof e.e=="string"?{e:e.e}:{}}:null},hr=(n,e)=>e===void 0?n:{...n,metadata:e},Qd=({getPeer:n,getPeerIds:e,canReceiveFromPeer:t,onPeerError:i,maxReceiveBytes:r})=>{const s=Object.create(null),o={},a=new Map,c=Jd({getPeer:n,getPeerIds:e,canReceiveFromPeer:t,onPeerError:i,...r===void 0?{}:{maxReceiveBytes:r}}),l=c.makeInternalAction,h=c.handleData,u=p=>{const d=o[p];d&&($e(d.timer),d.signal&&d.abortHandler&&d.signal.removeEventListener("abort",d.abortHandler),delete o[p],d.controller.abort())},f=(p,d)=>{Yi(o).forEach(([_,y])=>{y.peerId===p&&(u(_),y.reject(d))})},m=(p,d)=>{c.clearPeer(p);const _=a.get(p);_&&(a.delete(p),_.forEach(y=>y.abort())),f(p,Bn("disconnected",$i(d,"peer disconnected")))},v=l("@_response",{receiveScope:(p,d)=>{const _=ro(d),y=_&&o[_.r];if(!_||!y||y.peerId!==p)return null;const x=_.e===void 0?y.getReceive():null;return{key:_.r,signal:y.controller.signal,receive:x?P=>x({byteLength:P.byteLength,peerId:P.peerId,kind:"response",signal:P.signal}):null,reject:P=>{o[_.r]===y&&(u(_.r),y.reject(Bn("rejected",P)))}}}});return v.onProgress((p,d,_)=>{var P;const y=ro(_),x=y&&o[y.r];x&&x.peerId===d&&(y==null?void 0:y.e)===void 0&&((P=x.getReceiveProgress())==null||P(p,{peerId:d}))}),v.onMessage((p,d,_)=>{const y=ro(_);if(!y)return;const x=o[y.r];if(!(!x||x.peerId!==d)){if(u(y.r),y.e!==void 0){x.reject(Bn("rejected",y.e));return}x.resolve(p)}}),{makeAction:(p,d)=>{if(d&&"onRequest"in d&&d.kind!=="request")throw Xe('request actions must use kind: "request"');const _=(d==null?void 0:d.kind)??"message",y=l(p),x=s[p];if(x){if(x.kind!==_)throw Xe(`action type "${p}" cannot be redefined`);return x.action}const P={kind:_,action:null,onReceive:(d==null?void 0:d.onReceive)??null,onReceiveProgress:(d==null?void 0:d.onReceiveProgress)??null},A=(S,R)=>S?(N,I)=>S(N,hr({peerId:I},R)):void 0,C=(S,R,N)=>{var z;const I=P.kind==="request"?Yr(N):null;(z=P.onReceiveProgress)==null||z.call(P,S,hr({peerId:R},I?I.m:N))},L=S=>{P.onReceive=S,y.onReceive(S?R=>{const N=_==="request"?Yr(R.metadata):null;return S(hr({byteLength:R.byteLength,peerId:R.peerId,signal:R.signal,kind:_},N?N.m:R.metadata))}:null)};if(L(P.onReceive),y.onProgress(C),_==="message"){let S=(d==null?void 0:d.onMessage)??null;const R=(I,z,B)=>{const F=S;Promise.resolve().then(()=>F(I,hr({peerId:z},B))).catch(k=>console.error(`${St} action handler error:`,k))},N={send:async(I,z={})=>{await y.send(I,z.target,z.metadata,A(z.onProgress,z.metadata),z.signal)},get onMessage(){return S},set onMessage(I){S=I,y.onMessage(I?R:null)},get onReceive(){return P.onReceive},set onReceive(I){L(I)},get onReceiveProgress(){return P.onReceiveProgress},set onReceiveProgress(I){P.onReceiveProgress=I}};return P.action=N,s[p]=P,y.onMessage(S?R:null),N}y.onReject((S,R,N)=>{const I=Yr(R);I&&v.send(null,S,{r:I.r,e:N}).catch(gt)});let w=(d==null?void 0:d.onRequest)??null;const M=(S,R,N)=>{const I=Yr(N);if(!I)return;const z=w,B=new AbortController;let F=a.get(R);F||(F=new Set,a.set(R,F)),F.add(B),Promise.resolve().then(async()=>{const k=await z(S,{...hr({peerId:R},I.m),signal:B.signal});if(k===void 0)throw Xe("request handler returned undefined");return k}).then(k=>v.send(k,R,{r:I.r}),k=>v.send(null,R,{r:I.r,e:$i(k,"request failed").slice(0,512)})).catch(gt).finally(()=>{const k=a.get(R);k==null||k.delete(B),k&&!k.size&&a.delete(R),B.abort()})},D=async(S,R)=>{const{target:N,metadata:I,onProgress:z,signal:B,timeoutMs:F}=R;if(Ko(B),!n(N,!1))throw Bn("disconnected",`no active peer with id ${N}`);const k=vi(20),Z=new AbortController,ae=new Promise((xe,X)=>{const ne={controller:Z,getReceive:()=>P.onReceive,getReceiveProgress:()=>P.onReceiveProgress,peerId:N,resolve:xe,reject:X,timer:null,...B===void 0?{}:{signal:B}},he=()=>{u(k),X(Bn("aborted","operation aborted"))};B&&(ne.abortHandler=he,B.addEventListener("abort",he,{once:!0})),o[k]=ne,F!==void 0&&(ne.timer=setTimeout(()=>{u(k),ne.reject(Bn("timeout","request timed out"))},F))});try{const xe=y.send(S,N,I===void 0?{r:k}:{r:k,m:I},A(z,I),Z.signal);return await Promise.race([ae,xe.then(()=>ae)])}finally{u(k)}},W={request:D,requestMany:async(S,R)=>{const{targets:N,onResult:I,...z}=R;return Ko(z.signal),await yi(N.map(async B=>{try{const F={peerId:B,status:"fulfilled",value:await D(S,{...z,target:B})};return I==null||I(F),F}catch(F){const k=Hn(F,"request failed");if(k.kind==="aborted"||!k.kind)throw k;const Z=k.kind==="timeout"?{peerId:B,status:"timeout"}:k.kind==="disconnected"?{peerId:B,status:"disconnected"}:{peerId:B,status:"rejected",error:k};return I==null||I(Z),Z}}))},get onRequest(){return w},set onRequest(S){w=S,y.onMessage(S?M:null)},get onReceive(){return P.onReceive},set onReceive(S){L(S)},get onReceiveProgress(){return P.onReceiveProgress},set onReceiveProgress(S){P.onReceiveProgress=S}};return P.action=W,s[p]=P,y.onMessage(w?M:null),W},makeInternalAction:l,handleData:h,clearPeer:m}},Wc=n=>n&&typeof n=="object"&&!Array.isArray(n)&&typeof n.k=="string"?{key:n.k,...typeof n.s=="string"?{streamId:n.s}:{},...typeof n.t=="string"?{trackId:n.t}:{},...Object.hasOwn(n,"m")?{metadata:n.m}:{}}:null,Xc=n=>e=>{let t=n.get(e);return t||(t=vi(20),n.set(e,t)),t},Zo=()=>{const n=new WeakMap,e=new WeakMap,t=new Map,i=new Map,r=new Map,s=new Map,o=new WeakMap,a=new WeakMap;return{getStreamKey:Xc(n),getTrackKey:Xc(e),rememberRemoteStream:(c,l,h)=>{var f;const u=o.get(l);u!==void 0&&t.get(u)===l&&t.delete(u),o.set(l,c),t.set(c,l),h&&i.set(h,l),(f=l.getTracks)==null||f.call(l).forEach(m=>{typeof m.id=="string"&&s.set(m.id,{track:m,stream:l})})},getRemoteStream:(c,l)=>t.get(c)??(l?i.get(l):void 0),rememberRemoteTrack:(c,l,h,u,f)=>{var g;const m={track:l,stream:h},v=a.get(l);v!==void 0&&((g=r.get(v))==null?void 0:g.track)===l&&r.delete(v),a.set(l,c),r.set(c,m),u&&s.set(u,m),f&&i.set(f,h)},getRemoteTrack:(c,l)=>r.get(c)??(l?s.get(l):void 0),hasRemoteMedia:()=>t.size>0||r.size>0,clearRemote:()=>{t.clear(),i.clear(),r.clear(),s.clear()}}},ef=({iterate:n,isActive:e,getSharedMediaPeer:t,onPeerError:i})=>{const r={},s={},o={},a=Zo(),c=g=>{var p;return((p=t(g))==null?void 0:p.__trysteroMedia)??o[g]??(o[g]=Zo())},l=(g,p,d,_)=>{const y=g[p]??(g[p]=[]);if(y.length>=64){console.warn(`${St}: too many pending ${_} metadata messages`),i(p,Xe("too many pending media metadata messages"));return}y.push(d)},h=(g,p,d)=>{if(!(g!=null&&g.length))return;const _=p?g.findIndex(y=>{const x=d(y);return!x||x===p}):0;return _>=0?g.splice(_,1)[0]:void 0},u=(g,p,d,_)=>{var y;e(g)&&(c(g).rememberRemoteStream(p,d,typeof d.id=="string"?d.id:void 0),(y=v.onPeerStream)==null||y.call(v,d,g,_))},f=(g,p,d,_,y)=>{var x;e(g)&&(c(g).rememberRemoteTrack(p,d,_,typeof d.id=="string"?d.id:void 0,typeof _.id=="string"?_.id:void 0),(x=v.onPeerTrack)==null||x.call(v,d,_,g,y))},m=(g,p,d,_,y,x={})=>{const P={k:p,...x,...d===void 0?{}:{m:d}};return n(g,async(A,C)=>{await _(P,A),await y(C)})},v={addStream:(g,p,d)=>m(p.target,a.getStreamKey(g),p.metadata,d,_=>_.addStream(g),{s:g.id}),removeStream:(g,p)=>{n(p,(d,_)=>_.removeStream(g))},addTrack:(g,p,d,_)=>m(d.target,a.getTrackKey(g),d.metadata,_,y=>y.addTrack(g,p),{s:p.id,t:g.id}),removeTrack:(g,p)=>{n(p,(d,_)=>_.removeTrack(g))},replaceTrack:(g,p,d,_)=>m(d.target,a.getTrackKey(p),d.metadata,_,y=>y.replaceTrack(g,p),{t:g.id}),receiveStreamMeta:(g,p)=>{if(!e(p))return;const d=Wc(g);if(!d)return;const _=c(p).getRemoteStream(d.key,d.streamId);if(_!=null&&_.getTracks().length){u(p,d.key,_,d.metadata);return}l(r,p,d,"stream")},receiveTrackMeta:(g,p)=>{if(!e(p))return;const d=Wc(g);if(!d)return;const _=c(p).getRemoteTrack(d.key,d.trackId);if(_&&_.track.readyState!=="ended"&&(!_.stream.getTracks||_.stream.getTracks().includes(_.track))){f(p,d.key,_.track,_.stream,d.metadata);return}l(s,p,d,"track")},receiveRemoteStream:(g,p)=>{if(!e(g))return;const d=h(r[g],typeof p.id=="string"?p.id:void 0,_=>_.streamId);d&&u(g,d.key,p,d.metadata)},receiveRemoteTrack:(g,p,d)=>{if(!e(g))return;const _=s[g],y=typeof p.id=="string"?p.id:void 0,x=typeof d.id=="string"?d.id:void 0,P=_&&y?_.findIndex(C=>C.trackId===y):-1,A=P>=0?_==null?void 0:_.splice(P,1)[0]:h(_,x,C=>C.streamId);A&&f(g,A.key,p,d,A.metadata)},clearPeer:g=>{delete r[g],delete s[g],delete o[g]},onPeerStream:null,onPeerTrack:null};return v},qc="beforeunload",tf=1e4,Pn=n=>"@_"+n,Mr=new Set,Yc=()=>Mr.forEach(n=>n()),nf=n=>(Mr.add(n),Mr.size===1&&addEventListener(qc,Yc),()=>{Mr.delete(n),Mr.size||removeEventListener(qc,Yc)});var rf=(n,e,t,{onPeerHandshake:i,onHandshakeError:r,handshakeTimeoutMs:s=tf,maxReceiveBytes:o,isPassive:a=!1,onBeforeLeave:c}={})=>{const l={},h={},u={},f={onPeerJoin:null,onPeerLeave:null};let m=gt,v=null;const g=(F,k)=>(F?Array.isArray(F)?F:[F]:Kt(h)).flatMap(Z=>{const ae=h[Z];return ae?[Promise.resolve(k(Z,ae))]:(console.warn(`${St}: no peer with id ${Z} found`),[])}),p=(F,k,Z)=>{const ae=l[F];!ae||k&&ae!==k||(N.send("",F).catch(gt),L(F,ae,Z))},d=(F,k)=>p(F,void 0,k),_=ef({onPeerError:d,iterate:(F,k)=>g(F,(Z,ae)=>k(Z,ae)),isActive:F=>!!h[F],getSharedMediaPeer:F=>l[F]??null}),y=Qd({onPeerError:d,...o===void 0?{}:{maxReceiveBytes:o},getPeer:(F,k)=>(k?l:h)[F],getPeerIds:F=>Kt(F?l:h),canReceiveFromPeer:(F,k)=>B.canReceiveFromPeer(F,k)}),x=y.makeInternalAction,P=y.handleData,A=y.makeAction,C=(F,k=Xe("peer disconnected"))=>{var ae;const Z=Hn(k,"peer disconnected");B.clearPeer(F,Z),delete l[F],delete h[F],y.clearPeer(F,Z),(ae=u[F])==null||ae.splice(0).forEach(xe=>xe.reject(Z)),delete u[F],_.clearPeer(F)},L=(F,k,Z)=>{var X;const ae=l[F];if(!ae||k&&ae!==k)return;const xe=!!h[F];C(F,Z),ae.destroy(),xe&&((X=f.onPeerLeave)==null||X.call(f,F)),e(F)},w=()=>v??(v=(async()=>{c==null||c();const F=new AbortController;N.send("",void 0,void 0,void 0,F.signal).catch(gt),await new Promise(k=>setTimeout(k,99)),F.abort();try{Yi(l).forEach(([k,Z])=>{Z.destroy(),C(k,Xe("room left"))})}finally{try{m()}finally{t()}}})()),M=x(Pn("ping")),D=x(Pn("pong")),W=x(Pn("signal")),S=x(Pn("stream"),{maxPayloadBytes:65536}),R=x(Pn("track"),{maxPayloadBytes:65536}),N=x(Pn("leave"),{sendToPending:!0,receiveWhilePending:!0}),I=x(Pn("hsdata"),{sendToPending:!0,receiveWhilePending:!0,maxPayloadBytes:65536}),z=x(Pn("hsready"),{sendToPending:!0,receiveWhilePending:!0}),B=Id({...i===void 0?{}:{onPeerHandshake:i},...r===void 0?{}:{onHandshakeError:r},handshakeTimeoutMs:s,sendHandshakeData:I.send,sendHandshakeReady:z.send,onActivate:(F,k)=>{var Z;h[F]=k,k.setHandlers({signal:ae=>{h[F]===k&&W.send(ae,F).catch(gt)}}),(Z=f.onPeerJoin)==null||Z.call(f,F)},onFailure:(F,k,Z)=>p(F,k,Z)});return M.onMessage((F,k)=>{D.send("",k).catch(gt)}),D.onMessage((F,k)=>{var ae;const Z=u[k];(ae=Z==null?void 0:Z.shift())==null||ae.resolve(),Z&&!Z.length&&delete u[k]}),W.onMessage((F,k)=>{var Z;(Z=h[k])==null||Z.signal(F)}),S.onMessage((F,k)=>_.receiveStreamMeta(F,k)),R.onMessage((F,k)=>_.receiveTrackMeta(F,k)),N.onMessage((F,k)=>L(k,void 0,Xe("peer left room"))),I.onMessage((F,k,Z)=>B.receiveHandshakeData(F,k,Z)),z.onMessage((F,k)=>B.receiveHandshakeReady(k)),n((F,k)=>{const Z=l[k];if(Z){if(Z===F)return;Z.destroy(),C(k,Xe("peer replaced"))}l[k]=F,B.addPeer(k,F),F.setHandlers({data:ae=>{l[k]===F&&P(k,ae)},stream:ae=>_.receiveRemoteStream(k,ae),track:(ae,xe)=>_.receiveRemoteTrack(k,ae,xe),close:()=>L(k,F,Xe("peer disconnected")),error:ae=>{console.error(`${St} peer error:`,ae),L(k,F,ae)}}),B.start(k,F)}),Ph&&(m=nf(()=>w().catch(gt))),{makeAction:A,leave:w,ping:async F=>{if(!h[F])throw Xe(`no active peer with id ${F}`);const k=Date.now();return await new Promise((Z,ae)=>{const xe=u[F]??(u[F]=[]),X=()=>{const he=u[F];if(!he)return;const ce=he.indexOf(ne);ce>-1&&he.splice(ce,1),he.length||delete u[F]},ne={resolve:()=>{X(),Z()},reject:he=>{X(),ae(he)}};xe.push(ne),M.send("",F).catch(he=>ne.reject(Hn(he,"peer disconnected")))}),Date.now()-k},isPassive:()=>a,getPeers:()=>Lh(Yi(h).map(([F,k])=>[F,k.connection])),addStream:(F,k={})=>_.addStream(F,k,S.send),removeStream:(F,k={})=>{_.removeStream(F,k.target)},addTrack:(F,k,Z={})=>_.addTrack(F,k,Z,R.send),removeTrack:(F,k={})=>{_.removeTrack(F,k.target)},replaceTrack:(F,k,Z={})=>_.replaceTrack(F,k,Z,R.send),get onPeerJoin(){return f.onPeerJoin},set onPeerJoin(F){f.onPeerJoin=F,F&&Kt(h).forEach(k=>F(k))},get onPeerLeave(){return f.onPeerLeave},set onPeerLeave(F){f.onPeerLeave=F},get onPeerStream(){return _.onPeerStream},set onPeerStream(F){_.onPeerStream=F},get onPeerTrack(){return _.onPeerTrack},set onPeerTrack(F){_.onPeerTrack=F}}};const kh=1,zh=2,$c=(n,e)=>{const t=Sn(n),i=new Uint8Array(3+t.byteLength+e.byteLength);return i[0]=kh,i[1]=t.byteLength>>>8&255,i[2]=t.byteLength&255,i.set(t,3),i.set(e,3+t.byteLength),i},sf=(n,e)=>{const t=Sn(n),i=new Uint8Array(4+t.byteLength);return i[0]=zh,i[1]=Number(e),i[2]=t.byteLength>>>8&255,i[3]=t.byteLength&255,i.set(t,4),i},jc=(n,e)=>{if(n.byteLength<e+2)return null;const t=(n[e]??0)<<8|(n[e+1]??0),i=e+2+t;return t<=0||t>128||n.byteLength<i?null:{roomToken:ui(n.subarray(e+2,i)),headerSize:i}},of=n=>{const e=new Uint8Array(n);if(e.byteLength<3||e.byteLength>16515)return null;if(e[0]===kh){const t=jc(e,1);return t?{type:"room",roomToken:t.roomToken,payload:e.subarray(t.headerSize).slice().buffer}:null}if(e[0]===zh){const t=jc(e,2);return t?{type:"presence",roomToken:t.roomToken,isPresent:e[1]===1}:null}return null},Ss=n=>{const{connection:e,channel:t}=n;return n.isDead||e.connectionState==="closed"||e.connectionState==="failed"||e.iceConnectionState==="closed"||e.iceConnectionState==="failed"||(t==null?void 0:t.readyState)==="closing"||(t==null?void 0:t.readyState)==="closed"},af=n=>{if(Ss(n))return"stale";const{channel:e}=n;return!e||e.readyState!=="open"?"transient":"live"};var cf=class{constructor(){Dt(this,"rooms",new Map);Dt(this,"unclaimedDataTimers",new WeakMap);Dt(this,"pendingDataTimers",new WeakMap);Dt(this,"byApp",{})}registerRoom(n,e,t,i){const r=this.rooms.get(n)??new Map;if(r.has(e))throw Xe("room membership already registered");const s={token:null,tokenPromise:t,...i};r.set(e,s),this.rooms.set(n,r);const o=()=>{var c;return((c=this.rooms.get(n))==null?void 0:c.get(e))===s},a=c=>{if(s.token)for(const l of _n(this.byApp[n]??{}))try{this.sendRoomPresence(l,s.token,c)}catch{}};return t.then(c=>{if(o()){s.token=c;for(const l of _n(this.byApp[n]??{}))l.remoteRoomTokens.has(c)&&this.attachRoom(n,e,s,l),this.discardUnboundData(l);o()&&s.active&&a(!0)}}),{connect:(c,l,h)=>{if(!o()){l.destroy();return}const u=this.reusable(n,c);u&&u.peer!==l&&l.destroy();const f=u??this.register(n,c,l,h);if(this.attachRoom(n,e,s,f),!u)for(const m of r.values())m.active&&m.token&&this.sendRoomPresence(f,m.token,!0)},reuse:c=>{if(!o())return!1;const l=this.reusable(n,c);return l?(this.attachRoom(n,e,s,l),!0):!1},setActive:c=>{!o()||s.active===c||(s.active=c,a(c))},leave:()=>{var c,l;if(o()){r.delete(e),r.size||this.rooms.delete(n),a(!1);for(const h of _n(this.byApp[n]??{})){const u=h.bindings[e];(l=u==null?void 0:(c=u.handlers).close)==null||l.call(c),u==null||u.detach(),this.discardUnboundData(h)}}}}}owns(n,e,t){var i,r;return((r=(i=this.byApp[n])==null?void 0:i[e])==null?void 0:r.peer)===t}reusable(n,e){var i;const t=(i=this.byApp[n])==null?void 0:i[e];if(t&&Ss(t.peer)){this.clear(n,e,{destroyPeer:!0});return}return t}attachRoom(n,e,t,i){var o;if(((o=this.rooms.get(n))==null?void 0:o.get(e))!==t||i.isClosing||this.get(n,i.peerId)!==i)return;const{proxy:r,isNew:s}=this.bind(e,t.tokenPromise,i,{onDetach:()=>t.onDetach(i.peerId,i.peer)});s&&t.onPeer(r,i.peerId,i.peer)}get(n,e){var t;return(t=this.byApp[n])==null?void 0:t[e]}sendRoomPresence(n,e,t){n.isClosing||Ss(n.peer)||n.peer.sendData(sf(e,t))}clear(n,e,{destroyPeer:t}){const i=this.byApp[n],r=i==null?void 0:i[e];if(!r||r.isClosing)return;r.idleTimer=$e(r.idleTimer),this.clearDataTimers(r),r.isClosing=!0,t&&!r.peer.isDead&&r.peer.destroy();const s=_n(r.bindings);r.bindings={},r.bindingsByToken={},r.controlRoomId=null,delete i[e],s.forEach(o=>{var a,c;(c=(a=o.handlers).close)==null||c.call(a),o.pendingData.length=0,o.pendingSendData.length=0,o.pendingTracks.length=0}),r.media.clearRemote(),r.pendingDataByToken.clear(),r.remoteRoomTokens.clear(),Kt(i).length===0&&delete this.byApp[n]}register(n,e,t,i){var a,c;const r=(a=this.byApp[n])==null?void 0:a[e];if(r){if(r.idleTimer=$e(r.idleTimer),r.peer===t)return r;this.clear(n,e,{destroyPeer:!0})}const s={appId:n,peerId:e,peer:t,bindings:{},bindingsByToken:{},pendingDataByToken:new Map,remoteRoomTokens:new Set,idleTimer:null,controlRoomId:null,streamOwners:new Map,trackOwners:new Map,media:Zo(),idleMs:i,isClosing:!1};((c=this.byApp)[n]??(c[n]={}))[e]=s;const o=()=>{this.owns(n,e,t)&&this.clear(n,e,{destroyPeer:!0})};return t.setHandlers({data:l=>this.dispatchData(s,l),signal:l=>this.dispatchSignal(s,l),close:o,error:l=>{console.error(`${St} peer error:`,l),o()},track:(l,h)=>this.dispatchTrack(s,l,h)}),s}bind(n,e,t,{onDetach:i}){const r=t.bindings[n];if(r)return t.idleTimer=$e(t.idleTimer),{proxy:r.proxy,isNew:!1};const s={roomId:n,roomToken:null,roomTokenPromise:e,handlers:{},pendingData:[],pendingSendData:[],pendingTracks:[],detach:gt,proxy:{}},o=()=>{if(t.bindings[n]!==s)return;const c=Kt(t.bindings).length===1&&(t.streamOwners.size>0||t.trackOwners.size>0||t.media.hasRemoteMedia());c||this.pruneRoomOwnership(t,n),delete t.bindings[n],s.roomToken&&t.bindingsByToken[s.roomToken]===s&&delete t.bindingsByToken[s.roomToken],t.controlRoomId===n&&(t.controlRoomId=Kt(t.bindings)[0]??null),this.discardUnboundData(t),i(),c?this.clear(t.appId,t.peerId,{destroyPeer:!0}):this.scheduleIdleTimer(t)},a={get connection(){return t.peer.connection},get channel(){return t.peer.channel},get isDead(){return t.peer.isDead},getOffer:c=>t.peer.getOffer(c),signal:c=>t.peer.signal(c),sendData:c=>{if(!s.roomToken){s.pendingSendData.push(c);return}t.peer.sendData($c(s.roomToken,c))},destroy:()=>o(),setHandlers:c=>{Object.assign(s.handlers,c),this.flushBindingQueues(t,s)},addStream:c=>{const l=t.streamOwners.get(c)??new Set,h=l.size===0;l.add(n),t.streamOwners.set(c,l),h&&t.peer.addStream(c)},removeStream:c=>this.releaseStreamOwner(t,c,n),addTrack:(c,l)=>{const h=t.trackOwners.get(c)??{stream:l,rooms:new Set},u=h.rooms.size===0;return h.stream=l,h.rooms.add(n),t.trackOwners.set(c,h),u?t.peer.addTrack(c,l):t.peer.connection.getSenders().find(f=>f.track===c)??t.peer.addTrack(c,l)},removeTrack:c=>this.releaseTrackOwner(t,c,n),replaceTrack:async(c,l)=>{const h=t.trackOwners.get(c);if(await t.peer.replaceTrack(c,l),h&&t.trackOwners.get(c)===h){t.trackOwners.delete(c);const u=t.trackOwners.get(l)??{stream:h.stream,rooms:new Set};h.rooms.forEach(f=>u.rooms.add(f)),t.trackOwners.set(l,u)}},__trysteroMedia:t.media};return s.proxy=a,s.detach=o,t.bindings[n]=s,t.controlRoomId??(t.controlRoomId=n),t.idleTimer=$e(t.idleTimer),e.then(c=>{if(t.isClosing||t.bindings[n]!==s)return;s.roomToken=c,t.bindingsByToken[c]=s;const l=t.pendingDataByToken.get(c);l!=null&&l.length&&(s.pendingData.push(...l),t.pendingDataByToken.delete(c));const h=s.pendingSendData.splice(0);Ss(t.peer)||h.forEach(u=>{try{t.peer.sendData($c(c,u))}catch{}}),this.flushBindingQueues(t,s),this.discardUnboundData(t)}),{proxy:a,isNew:!0}}releaseStreamOwner(n,e,t){const i=n.streamOwners.get(e);i&&(i.delete(t),i.size===0&&(n.streamOwners.delete(e),n.peer.removeStream(e)))}releaseTrackOwner(n,e,t){const i=n.trackOwners.get(e);i&&(i.rooms.delete(t),i.rooms.size===0&&(n.trackOwners.delete(e),n.peer.removeTrack(e)))}pruneRoomOwnership(n,e){n.streamOwners.forEach((t,i)=>this.releaseStreamOwner(n,i,e)),n.trackOwners.forEach((t,i)=>this.releaseTrackOwner(n,i,e))}scheduleIdleTimer(n){n.isClosing||Kt(n.bindings).length>0||(n.idleTimer=$e(n.idleTimer),n.idleTimer=setTimeout(()=>{var t;const e=(t=this.byApp[n.appId])==null?void 0:t[n.peerId];!e||Kt(e.bindings).length>0||this.clear(n.appId,n.peerId,{destroyPeer:!0})},n.idleMs))}getSignalBinding(n){if(n.controlRoomId){const t=n.bindings[n.controlRoomId];if(t!=null&&t.handlers.signal)return t}const e=_n(n.bindings).find(t=>!!t.handlers.signal);return e?(n.controlRoomId=e.roomId,e):null}flushBindingQueues(n,e){const{handlers:t}=e;if(t.data&&e.pendingData.length>0){const i=e.pendingData.splice(0);this.syncDataTimers(n),i.forEach(r=>{var s;return(s=t.data)==null?void 0:s.call(t,r)})}else this.syncDataTimers(n);(t.track||t.stream)&&e.pendingTracks.length&&e.pendingTracks.splice(0).forEach(({track:i,stream:r})=>{var s,o;(s=t.track)==null||s.call(t,i,r),(o=t.stream)==null||o.call(t,r)})}unclaimedBufferedFrameCount(n){let e=0;for(const t of n.pendingDataByToken.values())e+=t.length;return e}boundBufferedFrameCount(n){let e=0;for(const t of _n(n.bindings))e+=t.pendingData.length;return e}bufferedFrameCount(n){return this.unclaimedBufferedFrameCount(n)+this.boundBufferedFrameCount(n)}clearDataTimers(n){$e(this.unclaimedDataTimers.get(n)),this.unclaimedDataTimers.delete(n),$e(this.pendingDataTimers.get(n)),this.pendingDataTimers.delete(n)}syncDataTimers(n){if(n.isClosing){this.clearDataTimers(n);return}this.unclaimedBufferedFrameCount(n)===0?($e(this.unclaimedDataTimers.get(n)),this.unclaimedDataTimers.delete(n)):this.unclaimedDataTimers.has(n)||this.unclaimedDataTimers.set(n,setTimeout(()=>{this.unclaimedDataTimers.delete(n),n.pendingDataByToken.clear()},$o)),this.boundBufferedFrameCount(n)===0?($e(this.pendingDataTimers.get(n)),this.pendingDataTimers.delete(n)):this.pendingDataTimers.has(n)||this.pendingDataTimers.set(n,setTimeout(()=>{this.pendingDataTimers.delete(n),this.boundBufferedFrameCount(n)>0&&this.failData(n,"room data handler timed out")},$o))}canBindRoomToken(n,e){var t;return _n(n.bindings).some(i=>!i.roomToken)||[...((t=this.rooms.get(n.appId))==null?void 0:t.values())??[]].some(i=>!i.token||i.token===e)}discardUnboundData(n){for(const e of n.pendingDataByToken.keys())this.canBindRoomToken(n,e)||n.pendingDataByToken.delete(e);this.syncDataTimers(n)}failData(n,e){console.warn(`${St}: ${e}; disconnecting peer ${n.peerId}`),this.clear(n.appId,n.peerId,{destroyPeer:!0})}dispatchData(n,e){var r,s;if(n.isClosing)return;const t=of(e);if(!t){this.failData(n,"invalid or incompatible room frame");return}if(t.type==="presence"){if(t.isPresent){if(!n.remoteRoomTokens.has(t.roomToken)&&n.remoteRoomTokens.size>=64){this.failData(n,"too many advertised rooms");return}n.remoteRoomTokens.add(t.roomToken);for(const[o,a]of this.rooms.get(n.appId)??[])a.token===t.roomToken&&this.attachRoom(n.appId,o,a,n)}else{n.remoteRoomTokens.delete(t.roomToken),n.pendingDataByToken.delete(t.roomToken);const o=n.bindingsByToken[t.roomToken];(s=o==null?void 0:(r=o.handlers).close)==null||s.call(r),o==null||o.detach(),this.syncDataTimers(n)}return}const i=n.bindingsByToken[t.roomToken];if(!i){if(!this.canBindRoomToken(n,t.roomToken)||this.bufferedFrameCount(n)>=64)return;const o=n.pendingDataByToken.get(t.roomToken)??[];o.push(t.payload),n.pendingDataByToken.set(t.roomToken,o),this.syncDataTimers(n);return}if(i.handlers.data)i.handlers.data(t.payload);else{if(this.bufferedFrameCount(n)>=64){this.failData(n,"too much data waiting for a room handler");return}i.pendingData.push(t.payload),this.syncDataTimers(n)}}dispatchSignal(n,e){var i,r;const t=this.getSignalBinding(n);t?(r=(i=t.handlers).signal)==null||r.call(i,e):e.type==="offer"&&this.clear(n.appId,n.peerId,{destroyPeer:!0})}dispatchTrack(n,e,t){_n(n.bindings).forEach(i=>{var r,s,o,a;if(i.handlers.track||i.handlers.stream){(s=(r=i.handlers).track)==null||s.call(r,e,t),(a=(o=i.handlers).stream)==null||a.call(o,t);return}i.pendingTracks.push({track:e,stream:t})})}};const Kc=23333,lf=57333,hf=12,uf=7533,df=23333,Rr="offer-placeholder",ff=["offer","answer","candidate"],Hh=n=>{if(typeof n=="string")try{const e=Or(n);return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch{return null}return n&&typeof n=="object"&&!Array.isArray(n)?n:null},kn=(n,e)=>typeof n[e]=="string"&&n[e]?n[e]:void 0,Vh=n=>!!(n&&typeof n=="object"&&typeof n.signal=="function"&&typeof n.destroy=="function"&&typeof n.setHandlers=="function"),Gh=(n,e=!1)=>ff.some(t=>t in n&&(typeof n[t]!="string"||n[t]===""))||"peer"in n&&(e||n.peer!==void 0&&!Vh(n.peer)),pf=n=>{const e=Hh(n);if(!e||Gh(e,typeof n=="string"))return!1;const t=kn(e,"peerId");return!!(t&&t!==Mt&&e.passive!==!0&&!kn(e,"answer")&&!kn(e,"candidate"))},mf=(n,e,t,i,r,s)=>{n.toCipher(e).then(o=>{n.isLeaving()||!s()||i(t,Rt(r(o.sdp)))})},gf=()=>({offerPeer:null,offerId:null,offerSdp:null,offerInitPromise:null,offerAnswered:!1,offerRelays:[],offerSignalRelays:[],offerSignalBacklog:[],offerRelayTimers:[],offerExpiryTimer:null,connectedPeer:null,connectedPeerUnhealthySinceMs:null,answeringExpiryTimer:null,answeringPeer:null,answerSent:!1,answerReplay:null,connectionErrorReported:!1}),_f=n=>{var e;return[...n.turnConfig??[],...((e=n.rtcConfig)==null?void 0:e.iceServers)??[]].some(({urls:t})=>(Array.isArray(t)?t:[t]).some(i=>/^turns?:/i.test(i)))},vf=(n,e)=>`could not connect to peer ${n} after exchanging SDP; ${_f(e)?"check that your TURN server URLs and credentials are reachable by both peers":"configure TURN servers with turnConfig or rtcConfig.iceServers"}`,Hs=(n,e,t)=>{var i;n.isLeaving()||e.connectedPeer||e.connectionErrorReported||(e.connectionErrorReported=!0,(i=n.onJoinError)==null||i.call(n,{error:vf(t,n.config),appId:n.appId,peerId:t,roomId:n.roomId}))},Vs=(n,e)=>n[e]??(n[e]=gf()),Ds=new WeakMap,Ka=n=>{Ds.delete(n),n.answeringExpiryTimer=$e(n.answeringExpiryTimer),n.answeringPeer=null,n.answerSent=!1,n.answerReplay=null},Cr=(n,e)=>{n.answeringPeer===e&&(Ka(n),n.connectedPeer!==e&&!e.isDead&&e.destroy())},yf=(n,e)=>{n.answeringPeer&&n.answeringPeer!==e&&!n.answeringPeer.isDead&&n.answeringPeer.destroy(),Ka(n),n.connectedPeer=e,n.connectedPeerUnhealthySinceMs=null},Zc=(n,e)=>{(n==null?void 0:n.connectedPeer)===e&&(n.connectedPeer=null,n.connectedPeerUnhealthySinceMs=null)},Jo=(n,e,t)=>{n.connectedPeer&&(n.connectedPeer.isDead||n.connectedPeer.destroy(),n.connectedPeer=null,n.connectedPeerUnhealthySinceMs=null)},Za=(n,e)=>{n.offerRelayTimers[e]=$e(n.offerRelayTimers[e]),n.offerRelays[e]&&(n.offerRelays[e]=void 0)},so=(n,e)=>{(n==null?void 0:n.offerRelays[e])===Rr&&Za(n,e)},fi=n=>{Ds.delete(n),n.offerExpiryTimer=$e(n.offerExpiryTimer),n.offerInitPromise=null,n.offerRelays.forEach((e,t)=>Za(n,t)),n.offerRelays=[],n.offerSignalRelays=[],n.offerRelayTimers=[],n.offerSignalBacklog=[],n.offerPeer&&n.offerPeer!==n.connectedPeer&&(n.offerPeer.isDead||n.offerPeer.destroy()),n.offerPeer=null,n.offerId=null,n.offerSdp=null,n.offerAnswered=!1,n.connectionErrorReported=!1},xf=(n,e,t,i)=>{$e(e.answeringExpiryTimer),e.answeringExpiryTimer=setTimeout(()=>{const r=n.peerStates[t];!r||r.connectedPeer||r.answeringPeer!==i||(r.answerSent&&Hs(n,r,t),Cr(r,i),n.checkDeactivate())},df)},Qo=(n,e,t,i=lf)=>{$e(e.offerExpiryTimer);const r=e.offerId;e.offerExpiryTimer=setTimeout(()=>{const s=n.peerStates[t];!s||s.connectedPeer||s.offerId!==r||(s.offerAnswered&&Hs(n,s,t),fi(s),n.checkDeactivate())},i)},Wh=(n,e,t,i,r)=>{const s=()=>{e.offerPeer===i&&!e.connectedPeer&&(e.offerAnswered&&Hs(n,e,t),fi(e)),n.disconnectPeer(i,t),n.checkDeactivate()};i.setHandlers({connect:()=>n.connectPeer(i,t),...r?{signal:r}:{},close:s,error:s})},Mf=(n,e,t)=>{if(e.offerPeer&&e.offerId&&e.offerSdp)return Promise.resolve({peer:e.offerPeer,offer:e.offerSdp,offerId:e.offerId});if(e.offerInitPromise)return e.offerInitPromise;const r=(async()=>{let s;try{s=(await n.offerManager.checkout(1,!1,n.encryptOffer))[0]}catch(c){if(n.isLeaving()||e.offerInitPromise!==r)return null;throw c}if(!s)throw Xe("failed to allocate offer peer");const{peer:o,offer:a}=s;return n.isLeaving()||e.offerInitPromise!==r?(o.destroy(),null):(e.offerPeer=o,e.offerId=vi(hf),e.offerSdp=a,e.offerAnswered=!1,e.connectionErrorReported=!1,e.offerSignalBacklog=[],Wh(n,e,t,o,c=>{e.offerPeer===o&&(e.offerSignalBacklog.push(c),e.offerSignalRelays.forEach(l=>l==null?void 0:l(c)))}),Qo(n,e,t),{peer:o,offer:a,offerId:e.offerId})})().finally(()=>{e.offerInitPromise===r&&(e.offerInitPromise=null)});return e.offerInitPromise=r},Xh=async(n,e,t,i,r=0)=>{const s=n.peerStates[t];if(!s||s.connectedPeer||s.answeringPeer||s.offerAnswered){so(s,e);return}if(s.offerRelays[e]!==Rr)return;const[o,a]=await yi([Ki(ji(n.rootTopicPlaintext,t)),Mf(n,s,t)]);if(!a){so(s,e);return}if(n.isLeaving()){fi(s);return}if(s.connectedPeer||s.answeringPeer||s.offerAnswered||s.offerRelays[e]!==Rr){so(s,e);return}s.offerRelayTimers[e]=$e(s.offerRelayTimers[e]),s.offerRelays[e]=!0,s.offerRelayTimers[e]=setTimeout(()=>{if(r>=2||n.isLeaving()||s.connectedPeer||s.answeringPeer||s.offerAnswered||s.offerPeer!==a.peer||s.offerId!==a.offerId){Tf(n,t,e);return}s.offerRelays[e]=Rr,Xh(n,e,t,i,r+1)},r===0&&n.announceIntervals[e]===void 0?2e3:(n.announceIntervals[e]??n.announceIntervalMs)*.9);let c=!1;s.offerSignalRelays[e]=l=>{c&&(n.isLeaving()||s.connectedPeer||s.offerPeer!==a.peer||s.offerId!==a.offerId||l.type!=="candidate"||mf(n,l,o,i,h=>({peerId:Mt,offerId:a.offerId,candidate:h,...n.isPassive?{passive:!0}:{}}),()=>!s.connectedPeer&&s.offerPeer===a.peer&&s.offerId===a.offerId))},i(o,Rt({peerId:Mt,offerId:a.offerId,offer:a.offer,...n.isPassive?{passive:!0}:{}})),c=!0,s.offerSignalBacklog.forEach(l=>{var h,u;return(u=(h=s.offerSignalRelays)[e])==null?void 0:u.call(h,l)})},Sf=async(n,e,t,i,r,s)=>{var p;const o=Vs(n.peerStates,t);if(o.answeringPeer||o.offerAnswered){const d=o.answerReplay,_=d==null?void 0:d.lastSentAt[e];if(o.answeringPeer&&!o.answeringPeer.isDead&&d&&d.offer===i&&d.offerId===r&&(_===void 0||Date.now()-_>=1e3)){d.lastSentAt[e]=Date.now();const y=await Ki(ji(n.rootTopicPlaintext,t));if(!n.isLeaving()&&o.answerReplay===d&&!o.connectedPeer){const x=P=>s(y,P);d.relays[e]=x,d.messages.forEach(x)}}return}const a=!!(o.offerPeer||o.offerRelays.some(Boolean));if(a&&Mt<t)return;a&&fi(o);const c=n.initPeer(!1,n.config),l={offer:i,offerId:r,messages:[],lastSentAt:[],relays:[]};l.lastSentAt[e]=Date.now(),o.answeringPeer=c,o.answerSent=!1,o.answerReplay=l,o.connectionErrorReported=!1,xf(n,o,t,c);const h=()=>{o.answeringPeer===c&&!o.connectedPeer&&o.answerSent&&Hs(n,o,t),Cr(o,c),n.disconnectPeer(c,t),n.checkDeactivate()};c.setHandlers({connect:()=>n.connectPeer(c,t),close:h,error:h});let u;try{u=await n.toPlain({type:"offer",sdp:i})}catch{Cr(o,c),(p=n.onJoinError)==null||p.call(n,{error:"incorrect room password when decrypting offer",appId:n.appId,peerId:t,roomId:n.roomId});return}if(c.isDead){Cr(o,c);return}const f=await Ki(ji(n.rootTopicPlaintext,t));if(n.isLeaving()||o.answerReplay!==l)return;l.relays[e]=d=>s(f,d);const m=[];let v=!1;const g=d=>{n.toCipher(d).then(_=>{if(n.isLeaving()||o.answeringPeer!==c||c.isDead)return;const y={peerId:Mt};d.type==="answer"?(o.answerSent=!0,y.answer=_.sdp):y.candidate=_.sdp,r&&(y.offerId=r),n.isPassive&&(y.passive=!0);const x=Rt(y),P=Date.now();l.messages.push(x),l.relays.forEach((A,C)=>{A&&(l.lastSentAt[C]=P,A(x))}),d.type==="answer"&&!v&&(v=!0,m.splice(0).forEach(g))})};c.setHandlers({signal:d=>{if(!(n.isLeaving()||o.answeringPeer!==c||c.isDead)&&!(d.type!=="answer"&&d.type!=="candidate")){if(d.type==="candidate"&&!v){m.push(d);return}g(d)}}}),await c.signal(u)},Ef=async(n,e,t,i,r)=>{var u;let s;try{s=await n.toPlain({type:Dh,sdp:t})}catch{return}const o=n.peerStates[e],a=i&&(o!=null&&o.offerPeer)&&o.offerId===i?o.offerPeer:null,c=!i||((u=o==null?void 0:o.answerReplay)==null?void 0:u.offerId)===i?o==null?void 0:o.answeringPeer:null,l=!i&&(o!=null&&o.offerPeer)?o.offerPeer:null,h=r&&!r.isDead?r:a??c??l;h&&!h.isDead&&h.signal(s)},wf=async(n,e,t,i,r)=>{var o;let s;try{s=await n.toPlain({type:"answer",sdp:t})}catch{r&&(n.offerManager.reclaimLeased(r),r.isDead||r.destroy()),(o=n.onJoinError)==null||o.call(n,{error:"incorrect room password when decrypting answer",appId:n.appId,peerId:e,roomId:n.roomId});return}if(r){const a=Vs(n.peerStates,e);if(n.offerManager.claimLeased(r),a.connectedPeer||a.offerAnswered||a.answeringPeer&&!a.answeringPeer.isDead&&Mt>e){r.destroy();return}if(a.answeringPeer){const c=a.answeringPeer;Cr(a,c)}fi(a),a.offerPeer=r,a.offerId=i??null,a.offerAnswered=!0,Qo(n,a,e,Kc),Wh(n,a,e,r),r.signal(s)}else{const a=n.peerStates[e];if(!a||!a.offerPeer||a.offerAnswered||i&&a.offerId&&i!==a.offerId||a.offerPeer.isDead)return;a.offerAnswered=!0,Qo(n,a,e,Kc),a.offerPeer.signal(s)}},Tf=(n,e,t)=>{const i=n.peerStates[e];!i||i.connectedPeer||i.offerRelays[t]&&(Za(i,t),n.checkDeactivate())},bf=n=>e=>async(t,i,r)=>{var d;if(n.isLeaving())return;const s=Hh(i);if(!s||Gh(s,typeof i=="string"))return;const o=kn(s,"peerId")??"",a=kn(s,"offer"),c=kn(s,"answer"),l=kn(s,"candidate"),h=kn(s,"offerId"),u=Vh(s.peer)?s.peer:void 0,f=s.passive===!0;if(!o||o===Mt)return;const[m,v]=await yi([n.rootTopicP,n.selfTopicP]);if(n.isLeaving()||t!==m&&t!==v||n.isPassive&&f||(n.isPassive&&!n.isActive&&!c&&!l&&(n.isActive=!0,(d=n.requeueAnnounce)==null||d.call(n)),n.isPassive&&!n.isActive))return;const g=n.peerStates[o],p=g==null?void 0:g.connectedPeer;if(p&&g){const _=af(p);if(_==="live"){g.connectedPeerUnhealthySinceMs=null;return}if(_==="stale")Jo(g);else{const y=Date.now(),x=g.connectedPeerUnhealthySinceMs??y;if(g.connectedPeerUnhealthySinceMs=x,y-x<uf)return;Jo(g)}}if(!n.reusePeer(o)){if(o&&!a&&!c&&!l){const _=Vs(n.peerStates,o),y=Mt<o;if(_.answeringPeer||_.connectedPeer||_.offerAnswered)return;if(!y&&!_.offerPeer){let x=Ds.get(_);x||(x=[],Ds.set(_,x));const P=x[e];if(P!==void 0&&Date.now()-P<1e3)return;x[e]=Date.now();const A=await Ki(ji(n.rootTopicPlaintext,o));!n.isLeaving()&&!_.connectedPeer&&!_.answeringPeer&&!_.offerAnswered&&r(A,Rt({peerId:Mt}));return}return _.offerRelays[e]?void 0:(_.offerRelays[e]=Rr,Xh(n,e,o,r))}if(a)return Sf(n,e,o,a,h,r);if(l)return Ef(n,o,l,h,u);if(c)return wf(n,o,c,h,u)}},$r=5333,Af=[233,533,1333],Jc=7533,Rf=123333;var Cf=({init:n,subscribe:e,announce:t,deactivate:i})=>{const r={},s={},o=new cf,a=()=>_n(r).some(u=>Kt(u).length>0);let c=!1,l=[],h=gt;return(u,f,m)=>{var E,Y,ee,re;if(!u)throw Xe("requires a config map as the first argument");if(m&&typeof m!="object")throw Xe("third argument must be a callbacks object");const{appId:v}=u,g=m==null?void 0:m.onJoinError,p=m==null?void 0:m.onPeerHandshake,d=m==null?void 0:m.handshakeTimeoutMs;if(!v)throw Xe("config map is missing appId field");if(!f)throw Xe("roomId argument required");if(u.maxReceiveBytes!==void 0&&(!Number.isSafeInteger(u.maxReceiveBytes)||u.maxReceiveBytes<=0))throw Xe("maxReceiveBytes must be a positive safe integer");if(d!==void 0&&(!Number.isFinite(d)||d<=0))throw Xe("handshakeTimeoutMs must be a positive number");if((E=r[v])!=null&&E[f])return r[v][f];(ee=(Y=s[v])==null?void 0:Y[f])==null||ee.call(Y,!0);const _=ji(St,v,f),y=Ki(_),x=Ki(ji(_,Mt)),P=Td(u.password??"",v,f),A=bd(v,f),C=u._test_only_sharedPeerIdleMs??Rf;let L=!1;const w=q=>async oe=>({type:oe.type,sdp:await q(P,oe.sdp)}),M=w(Rd),D=w(Ad),W=()=>Ic(!0,u);let S=!1;const R=new Pd(W),N=async q=>{const oe=await q.getOffer();if(!oe||oe.type!=="offer")throw Xe("failed to get offer for peer");return(await D(oe)).sdp},I=(q,oe)=>{b.connect(oe,q,C)};let z=!1;const B=()=>{k||!S||z||(z=!0,queueMicrotask(()=>{var q;z=!1,L||(q=X.requeueAnnounce)==null||q.call(X)}))},F=(q,oe)=>{if(L)return;const ie=X.peerStates[oe];(ie==null?void 0:ie.connectedPeer)===q&&(Jo(ie),xe(),B())},k=!!u.passive;let Z,ae=gt;const xe=()=>{if(!k||!X.isActive)return;let q=!1;Yi(X.peerStates).forEach(([oe,ie])=>{ie.connectedPeer||ie.answeringPeer||ie.offerInitPromise||ie.offerPeer||ie.offerRelays.some(Boolean)?q=!0:delete X.peerStates[oe]}),q||(X.isActive=!1,Z=$e(Z),Ie.forEach($e),Ie.length=0,ae(),b.setActive(!1))},X={appId:v,roomId:f,config:u,peerStates:{},rootTopicPlaintext:_,rootTopicP:y,selfTopicP:x,toPlain:M,toCipher:D,isLeaving:()=>L,isPassive:k,isActive:!k,onJoinError:g,offerManager:R,encryptOffer:N,initPeer:Ic,connectPeer:I,disconnectPeer:F,reusePeer:q=>b.reuse(q),checkDeactivate:xe,announceIntervals:[],announceIntervalMs:$r},ne={config:u,appId:v,roomId:f,isPassive:k},he=bf(X);if(!c){const q=n(u);l=(Array.isArray(q)?q:[q]).map(oe=>Promise.resolve(oe)),c=!0,h=(re=u.relayConfig)!=null&&re.manualReconnection?gt:Sd()}const ce=l.map(()=>$r),Re=l.map(()=>0),Le=l.map(()=>0),Ie=[],$=l.map(async(q,oe)=>e(await q,await y,await x,he(oe),ie=>R.getOffers(ie,N),ne));yi([y,x]).then(([q,oe])=>{if(L)return;const ie=async(de,Pe)=>{var Ye;if(L||k&&!X.isActive)return;const se=k?{passive:!0}:void 0;let fe;try{fe=await t(de,q,oe,se,ne),Le[Pe]=0}catch(ke){if(L)return;const Qe=Le[Pe]??0;Qe===0&&((Ye=u.relayConfig)==null?void 0:Ye.warnOnRelayFailure)!==!1&&console.warn(`${St}: announce failed - ${$i(ke,"")}`),Le[Pe]=Qe+1}if(L||k&&!X.isActive||fe&&typeof fe!="number"&&"stopAnnouncing"in fe)return;typeof fe=="number"?(X.announceIntervals[Pe]=fe,ce[Pe]=fe):fe&&(ce[Pe]=fe.nextAnnounceMs,S||(S=fe.reannounceOnDisconnect===!0));const De=Re[Pe]??0;Re[Pe]=De+1;const Fe=ce[Pe]??$r,Me=Af[De]??(De===3&&typeof fe=="object"?$r:void 0);Ie[Pe]=setTimeout(()=>{ie(de,Pe)},typeof Me=="number"?Math.min(Fe,Me):Fe)};ae=()=>{i&&l.forEach(async de=>{const Pe=await de;L||i(Pe,q,oe,ne)})},X.requeueAnnounce=()=>{Ie.forEach($e),Ie.length=0,Z=$e(Z),b.setActive(!0),Z=setTimeout(xe,Jc),l.forEach(async(de,Pe)=>{const se=await de;se&&!L&&(Re[Pe]=0,ie(se,Pe))})},$.forEach(async(de,Pe)=>{if(await de,L)return;const se=await l[Pe];se&&!L&&(!k||X.isActive)&&ie(se,Pe)})});let Q=gt;const ue=u.password??"",{compose:U}=Ld(ue,v,f),Ne=U(p),Ue=()=>{var q;((q=r[v])==null?void 0:q[f])===me&&(delete r[v][f],Kt(r[v]).length===0&&delete r[v])},Oe=()=>{var q;((q=s[v])==null?void 0:q[f])===Se&&(delete s[v][f],Kt(s[v]).length===0&&delete s[v])},Se=(q=!1)=>{L||(L=!0,Q=gt,Ue(),Oe(),b.leave(),Yi(X.peerStates).forEach(([oe,ie])=>{ie.connectedPeer&&!ie.connectedPeer.isDead&&(o.owns(v,oe,ie.connectedPeer)||ie.connectedPeer.destroy()),ie.answeringPeer&&!ie.answeringPeer.isDead&&ie.answeringPeer.destroy(),fi(ie),Ka(ie),ie.connectedPeer=null,ie.connectedPeerUnhealthySinceMs=null}),Ie.forEach($e),Z=$e(Z),$.forEach(async oe=>{(await oe)()}),R.destroy(),!(q||a())&&(c=!1,h()))},Ee={...u.maxReceiveBytes===void 0?{}:{maxReceiveBytes:u.maxReceiveBytes},...Ne?{onPeerHandshake:Ne}:{},...d===void 0?{}:{handshakeTimeoutMs:d},isPassive:k,onBeforeLeave:()=>{Ue(),(s[v]??(s[v]={}))[f]=Se},onHandshakeError:(q,oe)=>g==null?void 0:g({error:oe.replace(/^handshake failed: /,""),appId:v,peerId:q,roomId:f})};r[v]??(r[v]={});const me=rf(q=>Q=q,q=>{if(L)return;const oe=X.peerStates[q];oe!=null&&oe.connectedPeer&&Zc(oe,oe.connectedPeer),xe(),B()},()=>Se(!1),Ee),b=o.registerRoom(v,f,A,{active:!k||X.isActive,onPeer:(q,oe,ie)=>{const de=Vs(X.peerStates,oe);yf(de,ie),k&&!X.isActive&&(X.isActive=!0,b.setActive(!0),X.requeueAnnounce?X.requeueAnnounce():(Z=$e(Z),Z=setTimeout(xe,Jc))),Q(q,oe),fi(de)},onDetach:(q,oe)=>{Zc(X.peerStates[q],oe),xe()}});return r[v][f]=me}};const Pf=6e4,oo=n=>{if(!n)throw Xe("topic strategy missing room context");return n},ur=(n,e,t,i)=>({kind:e,appId:n.appId,roomId:n.roomId,rootTopic:t,selfTopic:i});var Lf=({steadyAnnounceIntervalMs:n=Pf,reannounceOnDisconnect:e=!0,init:t,subscribeTopic:i,publishTopic:r,unpublishTopic:s})=>Cf({init:t,subscribe:async(o,a,c,l,h,u)=>{const f=oo(u),m=(P,A)=>void r(o,P,A,ur(f,"signal",a,c));let v=null,g=!1,p=null,d=!1;const _=P=>{g||(g=!0,P())},y=()=>(p||(p=Promise.resolve(i(o,c,(P,A)=>{d||l(P,A,m)},ur(f,"self",a,c))).then(P=>{v=P,d&&_(P)})),p);f.isPassive||await y();const x=await i(o,a,async(P,A)=>{d||(f.isPassive&&pf(A)&&await y(),d||await l(P,A,m))},ur(f,"root",a,c));return()=>{d=!0,v&&_(v),x()}},announce:async(o,a,c,l,h)=>{const u=oo(h),f=await r(o,a,Rt({peerId:Mt,...l}),ur(u,"announce",a,c));return typeof f=="number"||f!==void 0&&"stopAnnouncing"in f?f:{nextAnnounceMs:(f==null?void 0:f.nextAnnounceMs)??n,reannounceOnDisconnect:(f==null?void 0:f.reannounceOnDisconnect)??e}},...s?{deactivate:(o,a,c,l)=>{const h=oo(l);return s(o,a,ur(h,"announce",a,c))}}:{}});const qh=Md(n=>n.socket),Df=5,Yh="x",$h="EVENT",{secretKey:If,publicKey:Uf}=Ch.keygen(),Nf=Pr(Uf),ao={},Qc=250,ai=6e4,Ff=9e5,Ja=5333,Lr=new WeakMap,Is=qh.scoped(),ea=new WeakSet,Of=n=>{const e=Lr.get(n),t=Math.min(e!=null&&e.delayMs?Math.max(ai,e.delayMs*2):ai,Ff);return Lr.set(n,{delayMs:t,untilMs:Date.now()+t}),t},Dr=n=>{const e=Lr.get(n);if(!e)return 0;const t=e.untilMs-Date.now();return t>0?t:0},jr=n=>({nextAnnounceMs:n}),Bf={stopAnnouncing:!0},kf=n=>{var e;return ea.has(n)?!1:(ea.add(n),Lr.delete(n),(e=n.close)==null||e.call(n),!0)},jh=()=>Math.floor(Date.now()/1e3),Kh=n=>ao[n]??(ao[n]=Ih(n,1e4)+2e4),zf=async(n,e)=>{const t={kind:Kh(n),tags:[[Yh,n]],created_at:jh(),content:e,pubkey:Nf},i=await zs("SHA-256",Rt([0,t.pubkey,t.created_at,t.kind,t.tags,t.content]));return Rt([$h,{...t,id:Pr(i),sig:Pr(await Ch.signAsync(i,If))}])},Ft={},Zh=n=>{n.flushWaiters.forEach(e=>e()),n.flushWaiters.clear()},Hf=(n,e,t)=>{var r;const i=Ft[r=n.url]??(Ft[r]={subIds:[],topics:new Map,updateTimer:null,flushWaiters:new Set,retryTimer:null,retryMs:Ja,pendingEose:new Set,requestedAt:0});i.topics.set(e,t),Jh(n,i)},Vf=(n,e)=>{const t=Ft[n.url];t&&(t.topics.delete(e),delete Is.forRelay(n)[e],t.topics.size===0?(t.retryTimer!==null&&clearTimeout(t.retryTimer),t.updateTimer!==null&&(clearTimeout(t.updateTimer),t.updateTimer=null),Zh(t),t.subIds.forEach(i=>n.send(Rt(["CLOSE",i]))),delete Ft[n.url]):Jh(n,t))},Jh=(n,e)=>{e.updateTimer===null&&(e.updateTimer=setTimeout(()=>{e.updateTimer=null;try{Qh(n)}finally{Zh(e)}},0))},Gf=n=>{const e=Ft[n.url];return!e||e.updateTimer===null?Promise.resolve():new Promise(t=>e.flushWaiters.add(t))},Qh=n=>{const e=Ft[n.url];if(!e||e.topics.size===0)return;const t=[...e.topics.keys()],i=[],r=jh();for(let s=0;s<t.length;s+=Qc)i.push(t.slice(s,s+Qc));for(;e.subIds.length>i.length;){const s=e.subIds.pop();s&&n.send(Rt(["CLOSE",s]))}e.pendingEose.clear(),e.requestedAt=Date.now(),i.forEach((s,o)=>{var c;const a=(c=e.subIds)[o]??(c[o]=vi(64));e.pendingEose.add(a),n.send(Rt(["REQ",a,{kinds:[...new Set(s.map(Kh))],since:r,"#x":s}]))})},eu=n=>{const e=Ft[n.url];if(e&&e.topics.size>0&&!n.isClosed){if(Dr(n)>0){iu(n,!0);return}e.retryTimer!==null&&(clearTimeout(e.retryTimer),e.retryTimer=null),Qh(n),tu(n)}},tu=n=>{Object.entries(Is.forRelay(n)).forEach(([e,t])=>{nu(n,e,t,!0)})},nu=async(n,e,t,i)=>{var o;if(ea.has(n)||n.isClosed)return i?Bf:void 0;const r=Dr(n);if(r>0||n.socket.readyState!==1)return i?jr(Math.max(ai,r)):void 0;const s=await zf(e,i?Rt({...Or(t),nonce:vi(8)}):t);if(i&&!((o=Ft[n.url])!=null&&o.topics.has(e)))return jr(ai);if(Dr(n)>0||n.isClosed||n.socket.readyState!==1)return i?jr(ai):void 0;if(n.send(s),i)return jr(ai)},iu=(n,e)=>{const t=Ft[n.url];if(!t||t.retryTimer!==null&&!e)return;t.retryTimer!==null&&clearTimeout(t.retryTimer);const i=e?Dr(n):t.retryMs;t.retryMs=Math.min(t.retryMs*2,ai),t.retryTimer=setTimeout(()=>{t.retryTimer=null,eu(n)},Math.max(i,Ja))},ru=Lf({init:n=>gd(n,Wf,Df,!0).map(e=>{const t=qh.register(e,()=>xd(e,i=>{var c,l;const[r,s,o,a]=Or(i);if(r!==$h){const h=`${St}: relay failure from ${t.url} - `,u=r==="CLOSED"&&typeof o=="string"?o:a,f=r==="OK"&&o===!1,m=(f||r==="CLOSED")&&(u==null?void 0:u.startsWith("rate-limited:")),v=f&&(u==null?void 0:u.startsWith("duplicate:")),g=u&&/^(blocked|restricted|auth-required|pow):/.test(u);if(r==="OK"&&o===!0&&Dr(t)===0&&Lr.delete(t),(f||r==="CLOSED")&&g&&!kf(t))return;if(m)Of(t);else if(r==="EOSE"){const p=Ft[t.url];p!=null&&p.pendingEose.delete(s)&&p.pendingEose.size===0&&(p.retryMs=Ja,p.retryTimer!==null&&(clearTimeout(p.retryTimer),p.retryTimer=null),Date.now()-p.requestedAt>=1e3&&tu(t))}r==="CLOSED"&&!g&&iu(t,!!m),!v&&((c=n.relayConfig)==null?void 0:c.warnOnRelayFailure)!==!1&&(r==="NOTICE"?console.warn(h+s):(f||r==="CLOSED")&&console.warn(h+u));return}if(o&&typeof o=="object"&&"content"in o){const h=Ft[t.url];if(h!=null&&h.subIds.includes(s)&&o.tags){const u=o.tags.find(f=>f[0]===Yh);u!=null&&u[1]&&((l=h.topics.get(u[1]))==null||l(u[1],o.content))}}},()=>eu(t)));return t.ready}),subscribeTopic:(n,e,t,i)=>{const r=(o,a)=>void t(o,a);Hf(n,e,r);const s=()=>{var o;((o=Ft[n.url])==null?void 0:o.topics.get(e))===r&&Vf(n,e)};return i.kind==="root"?Gf(n).then(()=>s):s},publishTopic:(n,e,t,{kind:i})=>{const r=typeof t=="string"?t:Rt(t);return i==="announce"&&(Is.forRelay(n)[e]=r),nu(n,e,r,i==="announce")},unpublishTopic:(n,e)=>{delete Is.forRelay(n)[e]}}),Wf=["0x-nostr-relay.fly.dev","bendernostur.duckdns.org:8443","cdn.satellite.earth","nos.lol","nostr.chaima.info","nostr.christiansass.de","nostr.rblb.it","nostr.red5d.dev","nostr.robosats.org","nostr.stakey.net","nostrcity-club.fly.dev","relay-dev.gulugulu.moe","relay.aarpia.com","relay.agentry.com","relay.bitmacro.cloud","relay.bullishbounty.com","relay.degmods.com","relay.flashapp.me","relay.grigic.org","relay.hackshed.dev","relay.kaleidoswap.com","relay.layer.systems","relay.nostr.blockhenge.com","relay.nostr.dev.br","relay.nostrmap.net","relay.novospes.com","relay.piazza.today","relay.routstr.com","testr.nymble.world"].map(n=>"wss://"+n);function yn(n,e){if(!n||typeof n.makeAction!="function")return{send:()=>{},onReceive:()=>{}};const t=n.makeAction(e),i=r=>{if(typeof r=="string")return r;if(r&&typeof r=="object"){if(typeof r.peerId=="string")return r.peerId;if(typeof r.id=="string")return r.id}return null};return Array.isArray(t)?{send:(r,s)=>{try{t[0](r,s)}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:r=>{try{t[1]((s,o)=>{const a=i(o);a&&r(s,a)})}catch(s){console.warn(`[Action:${e}] onReceive error:`,s)}}}:{send:(r,s)=>{try{if(t&&typeof t.send=="function"){const o=typeof s=="string"?{target:s}:s||{};let a;try{a=t.send(r,o)}catch{a=t.send(r,s)}a&&typeof a.catch=="function"&&a.catch(()=>{})}}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:r=>{try{if(!t)return;const s=(o,a)=>{const c=i(a);c&&r(o,c)};"onMessage"in t&&(t.onMessage=s),"onReceive"in t&&(typeof t.onReceive=="function"?t.onReceive(s):t.onReceive=s)}catch(s){console.warn(`[Action:${e}] onReceive error:`,s)}}}}const Xf="rockets-3d-space-shooter",qf="rockets_public_directory_v1",Yf=3500,el=1e4;class $f{constructor(){this.lobbyRoom=null,this.activeRooms=new Map,this.listeners=new Set,this.heartbeatTimer=null,this.purgeTimer=null,this.currentHostingMatch=null,this.sendHeartbeat=null,this.sendQuery=null,this.isInitialized=!1}init(){if(!this.isInitialized){this.isInitialized=!0;try{this.lobbyRoom=ru({appId:Xf},qf);const e=yn(this.lobbyRoom,"room_heartbeat"),t=yn(this.lobbyRoom,"query_rooms");this.sendHeartbeat=e.send,this.sendQuery=t.send,e.onReceive((i,r)=>{!i||!i.roomId||(this.activeRooms.set(i.roomId,{...i,lastSeen:Date.now(),ttlMs:i.ttlMs||el}),this.notifyListeners())}),t.onReceive((i,r)=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()}),this.purgeTimer=setInterval(()=>{const i=Date.now();let r=!1;for(const[s,o]of this.activeRooms.entries())i-o.lastSeen>o.ttlMs&&(this.activeRooms.delete(s),r=!0);r&&this.notifyListeners()},2e3),this.refreshRooms()}catch(e){console.warn("Lobby network init warning:",e)}}}refreshRooms(){if(this.sendQuery)try{this.sendQuery({req:"list",from:Mt})}catch(e){console.error(e)}}startMasterKeepAlive(e){this.currentHostingMatch=e,this.stopMasterKeepAlive(),this.broadcastCurrentRoom(),this.heartbeatTimer=setInterval(()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()},Yf)}stopMasterKeepAlive(){this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null)}broadcastCurrentRoom(){if(!(!this.currentHostingMatch||!this.sendHeartbeat))try{const e=this.currentHostingMatch,t=e.getPlayerCount?e.getPlayerCount():1,i={roomId:e.roomId,roomName:e.roomName||e.roomId,masterId:Mt,playerCount:t,mapSeed:e.mapSeed||42,timestamp:Date.now(),ttlMs:el};this.sendHeartbeat(i),this.activeRooms.set(e.roomId,{...i,lastSeen:Date.now()}),this.notifyListeners()}catch(e){console.error("Failed to send heartbeat:",e)}}onRoomsUpdated(e){return this.listeners.add(e),e(this.getRoomsList()),()=>this.listeners.delete(e)}notifyListeners(){const e=this.getRoomsList();for(const t of this.listeners)t(e)}getRoomsList(){const e=Date.now(),t=[];for(const i of this.activeRooms.values()){const r=Math.max(0,Math.round((i.lastSeen+i.ttlMs-e)/1e3));t.push({...i,ttlSecondsRemaining:r})}return t.sort((i,r)=>r.lastSeen-i.lastSeen)}destroy(){if(this.stopMasterKeepAlive(),this.purgeTimer&&clearInterval(this.purgeTimer),this.lobbyRoom)try{this.lobbyRoom.leave()}catch{}this.activeRooms.clear(),this.listeners.clear()}}const ci=new $f,jf="rockets-3d-space-shooter";class Kf{constructor({roomId:e,roomName:t,mapSeed:i,playerName:r,onPeerJoined:s,onPeerLeft:o,onMasterChanged:a,onCombatLog:c}){this.roomId=e,this.roomName=t||e,this.mapSeed=i||42,this.playerName=r||`Pilot-${(Mt||"Host").slice(0,4)}`,this.selfId=Mt,this.onPeerJoined=s||(()=>{}),this.onPeerLeft=o||(()=>{}),this.onMasterChanged=a||(()=>{}),this.onCombatLog=c||(()=>{}),this.room=null,this.currentMasterId=this.selfId,this.isMaster=!0,this.peers=new Map,this.sendState=null,this.sendCannon=null,this.sendMine=null,this.sendHit=null,this.sendKill=null,this.sendPing=null,this.sendPong=null,this.cannonListeners=new Set,this.mineListeners=new Set,this.hitListeners=new Set,this.killListeners=new Set,this.pingInterval=null,this.stateBroadcastInterval=null}join(){this.room=ru({appId:jf},this.roomId);const e=yn(this.room,"state"),t=yn(this.room,"cannon"),i=yn(this.room,"mine"),r=yn(this.room,"hit"),s=yn(this.room,"kill"),o=yn(this.room,"ping"),a=yn(this.room,"pong");this.sendState=e.send,this.sendCannon=t.send,this.sendMine=i.send,this.sendHit=r.send,this.sendKill=s.send,this.sendPing=o.send,this.sendPong=a.send,e.onReceive((h,u)=>{if(!u||typeof u!="string")return;this.peers.has(u)||this.peers.set(u,{id:u,ping:30,lastSeen:Date.now()});const f=this.peers.get(u);f.lastState=h,f.lastSeen=Date.now()}),t.onReceive((h,u)=>{if(!(!u||typeof u!="string"))for(const f of this.cannonListeners)f(h,u)}),i.onReceive((h,u)=>{if(!(!u||typeof u!="string"))for(const f of this.mineListeners)f(h,u)}),r.onReceive((h,u)=>{if(!(!u||typeof u!="string"))for(const f of this.hitListeners)f(h,u)}),s.onReceive((h,u)=>{if(!(!u||typeof u!="string"))for(const f of this.killListeners)f(h,u)}),o.onReceive((h,u)=>{!u||typeof u!="string"||this.sendPong&&this.sendPong({t:h.t},u)}),a.onReceive((h,u)=>{if(!(!u||typeof u!="string")&&h&&h.t&&this.peers.has(u)){const f=Math.max(1,Date.now()-h.t);this.peers.get(u).ping=f}});const c=h=>{!h||typeof h!="string"||(console.log(`[Mesh] Peer connected: ${h}`),this.peers.set(h,{id:h,ping:40,lastSeen:Date.now()}),this.updateMasterElection(),this.onPeerJoined(h),this.onCombatLog(`🛰️ Pilot joined the mesh: ${h.slice(0,5)}`))},l=h=>{!h||typeof h!="string"||(console.log(`[Mesh] Peer disconnected: ${h}`),this.peers.delete(h),this.updateMasterElection(),this.onPeerLeft(h),this.onCombatLog(`💨 Pilot left the mesh: ${h.slice(0,5)}`))};typeof this.room.onPeerJoin=="function"?this.room.onPeerJoin(c):this.room.onPeerJoin=c,typeof this.room.onPeerLeave=="function"?this.room.onPeerLeave(l):this.room.onPeerLeave=l,this.updateMasterElection(),this.isMaster&&ci.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),this.pingInterval=setInterval(()=>{this.sendPing&&this.peers.size>0&&this.sendPing({t:Date.now()})},2e3)}updateMasterElection(){if(!this.room)return;const e=Object.keys(this.room.getPeers()||{}),i=[this.selfId,...e].sort()[0],r=i===this.selfId;if(this.currentMasterId!==i||this.isMaster!==r){const s=this.currentMasterId;this.currentMasterId=i,this.isMaster=r,console.log(`[Mesh] Master Election: elected ${i} (Self is master: ${r})`),r?(ci.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),s&&s!==this.selfId&&this.onCombatLog("👑 Previous host left. You took over as Master! Keep-alive active.")):ci.stopMasterKeepAlive(),this.onMasterChanged(i,r)}}broadcastLocalState(e){this.sendState&&this.sendState({...e,id:this.selfId,name:this.playerName,time:Date.now()})}broadcastCannon(e){this.sendCannon&&this.sendCannon(e)}broadcastMine(e){this.sendMine&&this.sendMine(e)}sendHitTarget(e,t,i){this.sendHit&&this.sendHit({targetId:e,attackerId:this.selfId,attackerName:this.playerName,damage:t,weapon:i,time:Date.now()})}broadcastKill(e,t,i){this.sendKill&&this.sendKill({victimId:e,killerId:t,killerName:i,time:Date.now()})}onCannon(e){return this.cannonListeners.add(e),()=>this.cannonListeners.delete(e)}onMine(e){return this.mineListeners.add(e),()=>this.mineListeners.delete(e)}onHit(e){return this.hitListeners.add(e),()=>this.hitListeners.delete(e)}onKill(e){return this.killListeners.add(e),()=>this.killListeners.delete(e)}getAveragePing(){if(this.peers.size===0)return 0;let e=0;for(const t of this.peers.values())e+=t.ping||30;return Math.round(e/this.peers.size)}leave(){if(ci.stopMasterKeepAlive(),this.pingInterval&&clearInterval(this.pingInterval),this.stateBroadcastInterval&&clearInterval(this.stateBroadcastInterval),this.room){try{this.room.leave()}catch{}this.room=null}this.peers.clear(),this.cannonListeners.clear(),this.mineListeners.clear(),this.hitListeners.clear(),this.killListeners.clear()}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Qa="170",Zf=0,tl=1,Jf=2,su=1,Qf=2,vn=3,Vt=0,bt=1,Mn=2,Wn=0,Vi=1,$n=2,nl=3,il=4,ep=5,si=100,tp=101,np=102,ip=103,rp=104,sp=200,op=201,ap=202,cp=203,ta=204,na=205,lp=206,hp=207,up=208,dp=209,fp=210,pp=211,mp=212,gp=213,_p=214,ia=0,ra=1,sa=2,Zi=3,oa=4,aa=5,ca=6,la=7,ou=0,vp=1,yp=2,Xn=0,xp=1,Mp=2,Sp=3,au=4,Ep=5,wp=6,Tp=7,cu=300,Ji=301,Qi=302,ha=303,ua=304,Gs=306,Ir=1e3,li=1001,da=1002,Qt=1003,bp=1004,Kr=1005,sn=1006,co=1007,hi=1008,An=1009,lu=1010,hu=1011,Ur=1012,ec=1013,pi=1014,En=1015,Br=1016,tc=1017,nc=1018,er=1020,uu=35902,du=1021,fu=1022,Zt=1023,pu=1024,mu=1025,Gi=1026,tr=1027,gu=1028,ic=1029,_u=1030,rc=1031,sc=1033,Es=33776,ws=33777,Ts=33778,bs=33779,fa=35840,pa=35841,ma=35842,ga=35843,_a=36196,va=37492,ya=37496,xa=37808,Ma=37809,Sa=37810,Ea=37811,wa=37812,Ta=37813,ba=37814,Aa=37815,Ra=37816,Ca=37817,Pa=37818,La=37819,Da=37820,Ia=37821,As=36492,Ua=36494,Na=36495,vu=36283,Fa=36284,Oa=36285,Ba=36286,Ap=3200,Rp=3201,yu=0,Cp=1,zn="",kt="srgb",ir="srgb-linear",Ws="linear",tt="srgb",Ei=7680,rl=519,Pp=512,Lp=513,Dp=514,xu=515,Ip=516,Up=517,Np=518,Fp=519,ka=35044,sl="300 es",wn=2e3,Us=2001;class rr{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const r=this._listeners[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const yt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],lo=Math.PI/180,za=180/Math.PI;function qn(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(yt[n&255]+yt[n>>8&255]+yt[n>>16&255]+yt[n>>24&255]+"-"+yt[e&255]+yt[e>>8&255]+"-"+yt[e>>16&15|64]+yt[e>>24&255]+"-"+yt[t&63|128]+yt[t>>8&255]+"-"+yt[t>>16&255]+yt[t>>24&255]+yt[i&255]+yt[i>>8&255]+yt[i>>16&255]+yt[i>>24&255]).toLowerCase()}function Pt(n,e,t){return Math.max(e,Math.min(t,n))}function Op(n,e){return(n%e+e)%e}function ho(n,e,t){return(1-t)*n+t*e}function rn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,i,r,s,o,a,c,l){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l)}set(e,t,i,r,s,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],m=i[5],v=i[8],g=r[0],p=r[3],d=r[6],_=r[1],y=r[4],x=r[7],P=r[2],A=r[5],C=r[8];return s[0]=o*g+a*_+c*P,s[3]=o*p+a*y+c*A,s[6]=o*d+a*x+c*C,s[1]=l*g+h*_+u*P,s[4]=l*p+h*y+u*A,s[7]=l*d+h*x+u*C,s[2]=f*g+m*_+v*P,s[5]=f*p+m*y+v*A,s[8]=f*d+m*x+v*C,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*s*h+i*a*c+r*s*l-r*o*c}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*s,m=l*s-o*c,v=t*u+i*f+r*m;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return e[0]=u*g,e[1]=(r*l-h*i)*g,e[2]=(a*i-r*o)*g,e[3]=f*g,e[4]=(h*t-r*c)*g,e[5]=(r*s-a*t)*g,e[6]=m*g,e[7]=(i*c-l*t)*g,e[8]=(o*t-i*s)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-r*l,r*c,-r*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(uo.makeScale(e,t)),this}rotate(e){return this.premultiply(uo.makeRotation(-e)),this}translate(e,t){return this.premultiply(uo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const uo=new Ge;function Mu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ns(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Bp(){const n=Ns("canvas");return n.style.display="block",n}const ol={};function Sr(n){n in ol||(ol[n]=!0,console.warn(n))}function kp(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}function zp(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Hp(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const je={enabled:!0,workingColorSpace:ir,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===tt&&(n.r=Tn(n.r),n.g=Tn(n.g),n.b=Tn(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===tt&&(n.r=Wi(n.r),n.g=Wi(n.g),n.b=Wi(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===zn?Ws:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function Tn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Wi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const al=[.64,.33,.3,.6,.15,.06],cl=[.2126,.7152,.0722],ll=[.3127,.329],hl=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ul=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);je.define({[ir]:{primaries:al,whitePoint:ll,transfer:Ws,toXYZ:hl,fromXYZ:ul,luminanceCoefficients:cl,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:al,whitePoint:ll,transfer:tt,toXYZ:hl,fromXYZ:ul,luminanceCoefficients:cl,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}});let wi;class Vp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{wi===void 0&&(wi=Ns("canvas")),wi.width=e.width,wi.height=e.height;const i=wi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=wi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ns("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Tn(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Tn(t[i]/255)*255):t[i]=Tn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Gp=0;class Su{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=qn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(fo(r[o].image)):s.push(fo(r[o]))}else s=fo(r);i.url=s}return t||(e.images[this.uuid]=i),i}}function fo(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Vp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wp=0;class At extends rr{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,i=li,r=li,s=sn,o=hi,a=Zt,c=An,l=At.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=qn(),this.name="",this.source=new Su(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ir:e.x=e.x-Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case da:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ir:e.y=e.y-Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case da:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null;At.DEFAULT_MAPPING=cu;At.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,i=0,r=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],m=c[5],v=c[9],g=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(v-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(v+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,x=(m+1)/2,P=(d+1)/2,A=(h+f)/4,C=(u+g)/4,L=(v+p)/4;return y>x&&y>P?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=A/i,s=C/i):x>P?x<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(x),i=A/r,s=L/r):P<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(P),i=C/s,r=L/s),this.set(i,r,s,t),this}let _=Math.sqrt((p-v)*(p-v)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(p-v)/_,this.y=(u-g)/_,this.z=(f-h)/_,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xp extends rr{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const r={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const s=new At(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,r=e.textures.length;i<r;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Su(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends Xp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Eu extends At{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qp extends At{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class on{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let c=i[r+0],l=i[r+1],h=i[r+2],u=i[r+3];const f=s[o+0],m=s[o+1],v=s[o+2],g=s[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=v,e[t+3]=g;return}if(u!==g||c!==f||l!==m||h!==v){let p=1-a;const d=c*f+l*m+h*v+u*g,_=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const P=Math.sqrt(y),A=Math.atan2(P,d*_);p=Math.sin(p*A)/P,a=Math.sin(a*A)/P}const x=a*_;if(c=c*p+f*x,l=l*p+m*x,h=h*p+v*x,u=u*p+g*x,p===1-a){const P=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=P,l*=P,h*=P,u*=P}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,o){const a=i[r],c=i[r+1],l=i[r+2],h=i[r+3],u=s[o],f=s[o+1],m=s[o+2],v=s[o+3];return e[t]=a*v+h*u+c*m-l*f,e[t+1]=c*v+h*f+l*u-a*m,e[t+2]=l*v+h*m+a*f-c*u,e[t+3]=h*v-a*u-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(r/2),u=a(s/2),f=c(i/2),m=c(r/2),v=c(s/2);switch(o){case"XYZ":this._x=f*h*u+l*m*v,this._y=l*m*u-f*h*v,this._z=l*h*v+f*m*u,this._w=l*h*u-f*m*v;break;case"YXZ":this._x=f*h*u+l*m*v,this._y=l*m*u-f*h*v,this._z=l*h*v-f*m*u,this._w=l*h*u+f*m*v;break;case"ZXY":this._x=f*h*u-l*m*v,this._y=l*m*u+f*h*v,this._z=l*h*v+f*m*u,this._w=l*h*u-f*m*v;break;case"ZYX":this._x=f*h*u-l*m*v,this._y=l*m*u+f*h*v,this._z=l*h*v-f*m*u,this._w=l*h*u+f*m*v;break;case"YZX":this._x=f*h*u+l*m*v,this._y=l*m*u+f*h*v,this._z=l*h*v-f*m*u,this._w=l*h*u-f*m*v;break;case"XZY":this._x=f*h*u-l*m*v,this._y=l*m*u-f*h*v,this._z=l*h*v+f*m*u,this._w=l*h*u+f*m*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=i+a+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(o-r)*m}else if(i>a&&i>u){const m=2*Math.sqrt(1+i-a-u);this._w=(h-c)/m,this._x=.25*m,this._y=(r+o)/m,this._z=(s+l)/m}else if(a>u){const m=2*Math.sqrt(1+a-i-u);this._w=(s-l)/m,this._x=(r+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-i-a);this._w=(o-r)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Pt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+r*l-s*c,this._y=r*h+o*c+s*a-i*l,this._z=s*h+o*l+i*c-r*a,this._w=o*h-i*a-r*c-s*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*r+t*this._y,this._z=m*s+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=r*u+this._y*f,this._z=s*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(dl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(dl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*r-a*i),h=2*(a*t-s*r),u=2*(s*i-o*t);return this.x=t+c*l+o*u-a*h,this.y=i+c*h+a*l-s*u,this.z=r+c*u+s*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,c=t.z;return this.x=r*c-s*a,this.y=s*o-i*c,this.z=i*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return po.copy(this).projectOnVector(e),this.sub(po)}reflect(e){return this.sub(po.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const po=new O,dl=new on;class kr{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Yt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Yt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=Yt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Yt):Yt.fromBufferAttribute(s,o),Yt.applyMatrix4(e.matrixWorld),this.expandByPoint(Yt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Zr.copy(i.boundingBox)),Zr.applyMatrix4(e.matrixWorld),this.union(Zr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Yt),Yt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(dr),Jr.subVectors(this.max,dr),Ti.subVectors(e.a,dr),bi.subVectors(e.b,dr),Ai.subVectors(e.c,dr),Ln.subVectors(bi,Ti),Dn.subVectors(Ai,bi),Zn.subVectors(Ti,Ai);let t=[0,-Ln.z,Ln.y,0,-Dn.z,Dn.y,0,-Zn.z,Zn.y,Ln.z,0,-Ln.x,Dn.z,0,-Dn.x,Zn.z,0,-Zn.x,-Ln.y,Ln.x,0,-Dn.y,Dn.x,0,-Zn.y,Zn.x,0];return!mo(t,Ti,bi,Ai,Jr)||(t=[1,0,0,0,1,0,0,0,1],!mo(t,Ti,bi,Ai,Jr))?!1:(Qr.crossVectors(Ln,Dn),t=[Qr.x,Qr.y,Qr.z],mo(t,Ti,bi,Ai,Jr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Yt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Yt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(dn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),dn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),dn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),dn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),dn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),dn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),dn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),dn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(dn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const dn=[new O,new O,new O,new O,new O,new O,new O,new O],Yt=new O,Zr=new kr,Ti=new O,bi=new O,Ai=new O,Ln=new O,Dn=new O,Zn=new O,dr=new O,Jr=new O,Qr=new O,Jn=new O;function mo(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){Jn.fromArray(n,s);const a=r.x*Math.abs(Jn.x)+r.y*Math.abs(Jn.y)+r.z*Math.abs(Jn.z),c=e.dot(Jn),l=t.dot(Jn),h=i.dot(Jn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Yp=new kr,fr=new O,go=new O;class zr{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Yp.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fr.subVectors(e,this.center);const t=fr.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(fr,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(go.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fr.copy(e.center).add(go)),this.expandByPoint(fr.copy(e.center).sub(go))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new O,_o=new O,es=new O,In=new O,vo=new O,ts=new O,yo=new O;class wu{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fn.copy(this.origin).addScaledVector(this.direction,t),fn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){_o.copy(e).add(t).multiplyScalar(.5),es.copy(t).sub(e).normalize(),In.copy(this.origin).sub(_o);const s=e.distanceTo(t)*.5,o=-this.direction.dot(es),a=In.dot(this.direction),c=-In.dot(es),l=In.lengthSq(),h=Math.abs(1-o*o);let u,f,m,v;if(h>0)if(u=o*c-a,f=o*a-c,v=s*h,u>=0)if(f>=-v)if(f<=v){const g=1/h;u*=g,f*=g,m=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=s,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;else f=-s,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;else f<=-v?(u=Math.max(0,-(-o*s+a)),f=u>0?-s:Math.min(Math.max(-s,-c),s),m=-u*u+f*(f+2*c)+l):f<=v?(u=0,f=Math.min(Math.max(-s,-c),s),m=f*(f+2*c)+l):(u=Math.max(0,-(o*s+a)),f=u>0?s:Math.min(Math.max(-s,-c),s),m=-u*u+f*(f+2*c)+l);else f=o>0?-s:s,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(_o).addScaledVector(es,f),m}intersectSphere(e,t){fn.subVectors(e.center,this.origin);const i=fn.dot(this.direction),r=fn.dot(fn)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),h>=0?(s=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(s=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),i>c||a>r)||((a>i||i!==i)&&(i=a),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,fn)!==null}intersectTriangle(e,t,i,r,s){vo.subVectors(t,e),ts.subVectors(i,e),yo.crossVectors(vo,ts);let o=this.direction.dot(yo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;In.subVectors(this.origin,e);const c=a*this.direction.dot(ts.crossVectors(In,ts));if(c<0)return null;const l=a*this.direction.dot(vo.cross(In));if(l<0||c+l>o)return null;const h=-a*In.dot(yo);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,i,r,s,o,a,c,l,h,u,f,m,v,g,p){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,c,l,h,u,f,m,v,g,p)}set(e,t,i,r,s,o,a,c,l,h,u,f,m,v,g,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=r,d[1]=s,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=v,d[11]=g,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,r=1/Ri.setFromMatrixColumn(e,0).length(),s=1/Ri.setFromMatrixColumn(e,1).length(),o=1/Ri.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){const f=o*h,m=o*u,v=a*h,g=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+v*l,t[5]=f-g*l,t[9]=-a*c,t[2]=g-f*l,t[6]=v+m*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,m=c*u,v=l*h,g=l*u;t[0]=f+g*a,t[4]=v*a-m,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-v,t[6]=g+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,m=c*u,v=l*h,g=l*u;t[0]=f-g*a,t[4]=-o*u,t[8]=v+m*a,t[1]=m+v*a,t[5]=o*h,t[9]=g-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,m=o*u,v=a*h,g=a*u;t[0]=c*h,t[4]=v*l-m,t[8]=f*l+g,t[1]=c*u,t[5]=g*l+f,t[9]=m*l-v,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,m=o*l,v=a*c,g=a*l;t[0]=c*h,t[4]=g-f*u,t[8]=v*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=m*u+v,t[10]=f-g*u}else if(e.order==="XZY"){const f=o*c,m=o*l,v=a*c,g=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+g,t[5]=o*h,t[9]=m*u-v,t[2]=v*u-m,t[6]=a*h,t[10]=g*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($p,e,jp)}lookAt(e,t,i){const r=this.elements;return It.subVectors(e,t),It.lengthSq()===0&&(It.z=1),It.normalize(),Un.crossVectors(i,It),Un.lengthSq()===0&&(Math.abs(i.z)===1?It.x+=1e-4:It.z+=1e-4,It.normalize(),Un.crossVectors(i,It)),Un.normalize(),ns.crossVectors(It,Un),r[0]=Un.x,r[4]=ns.x,r[8]=It.x,r[1]=Un.y,r[5]=ns.y,r[9]=It.y,r[2]=Un.z,r[6]=ns.z,r[10]=It.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],m=i[13],v=i[2],g=i[6],p=i[10],d=i[14],_=i[3],y=i[7],x=i[11],P=i[15],A=r[0],C=r[4],L=r[8],w=r[12],M=r[1],D=r[5],W=r[9],S=r[13],R=r[2],N=r[6],I=r[10],z=r[14],B=r[3],F=r[7],k=r[11],Z=r[15];return s[0]=o*A+a*M+c*R+l*B,s[4]=o*C+a*D+c*N+l*F,s[8]=o*L+a*W+c*I+l*k,s[12]=o*w+a*S+c*z+l*Z,s[1]=h*A+u*M+f*R+m*B,s[5]=h*C+u*D+f*N+m*F,s[9]=h*L+u*W+f*I+m*k,s[13]=h*w+u*S+f*z+m*Z,s[2]=v*A+g*M+p*R+d*B,s[6]=v*C+g*D+p*N+d*F,s[10]=v*L+g*W+p*I+d*k,s[14]=v*w+g*S+p*z+d*Z,s[3]=_*A+y*M+x*R+P*B,s[7]=_*C+y*D+x*N+P*F,s[11]=_*L+y*W+x*I+P*k,s[15]=_*w+y*S+x*z+P*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],m=e[14],v=e[3],g=e[7],p=e[11],d=e[15];return v*(+s*c*u-r*l*u-s*a*f+i*l*f+r*a*m-i*c*m)+g*(+t*c*m-t*l*f+s*o*f-r*o*m+r*l*h-s*c*h)+p*(+t*l*u-t*a*m-s*o*u+i*o*m+s*a*h-i*l*h)+d*(-r*a*h-t*c*u+t*a*f+r*o*u-i*o*f+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],m=e[11],v=e[12],g=e[13],p=e[14],d=e[15],_=u*p*l-g*f*l+g*c*m-a*p*m-u*c*d+a*f*d,y=v*f*l-h*p*l-v*c*m+o*p*m+h*c*d-o*f*d,x=h*g*l-v*u*l+v*a*m-o*g*m-h*a*d+o*u*d,P=v*u*c-h*g*c-v*a*f+o*g*f+h*a*p-o*u*p,A=t*_+i*y+r*x+s*P;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return e[0]=_*C,e[1]=(g*f*s-u*p*s-g*r*m+i*p*m+u*r*d-i*f*d)*C,e[2]=(a*p*s-g*c*s+g*r*l-i*p*l-a*r*d+i*c*d)*C,e[3]=(u*c*s-a*f*s-u*r*l+i*f*l+a*r*m-i*c*m)*C,e[4]=y*C,e[5]=(h*p*s-v*f*s+v*r*m-t*p*m-h*r*d+t*f*d)*C,e[6]=(v*c*s-o*p*s-v*r*l+t*p*l+o*r*d-t*c*d)*C,e[7]=(o*f*s-h*c*s+h*r*l-t*f*l-o*r*m+t*c*m)*C,e[8]=x*C,e[9]=(v*u*s-h*g*s-v*i*m+t*g*m+h*i*d-t*u*d)*C,e[10]=(o*g*s-v*a*s+v*i*l-t*g*l-o*i*d+t*a*d)*C,e[11]=(h*a*s-o*u*s-h*i*l+t*u*l+o*i*m-t*a*m)*C,e[12]=P*C,e[13]=(h*g*r-v*u*r+v*i*f-t*g*f-h*i*p+t*u*p)*C,e[14]=(v*a*r-o*g*r-v*i*c+t*g*c+o*i*p-t*a*p)*C,e[15]=(o*u*r-h*a*r+h*i*c-t*u*c-o*i*f+t*a*f)*C,this}scale(e){const t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,c=e.z,l=s*o,h=s*a;return this.set(l*o+i,l*a-r*c,l*c+r*a,0,l*a+r*c,h*a+i,h*c-r*o,0,l*c-r*a,h*c+r*o,s*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){const r=this.elements,s=t._x,o=t._y,a=t._z,c=t._w,l=s+s,h=o+o,u=a+a,f=s*l,m=s*h,v=s*u,g=o*h,p=o*u,d=a*u,_=c*l,y=c*h,x=c*u,P=i.x,A=i.y,C=i.z;return r[0]=(1-(g+d))*P,r[1]=(m+x)*P,r[2]=(v-y)*P,r[3]=0,r[4]=(m-x)*A,r[5]=(1-(f+d))*A,r[6]=(p+_)*A,r[7]=0,r[8]=(v+y)*C,r[9]=(p-_)*C,r[10]=(1-(f+g))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){const r=this.elements;let s=Ri.set(r[0],r[1],r[2]).length();const o=Ri.set(r[4],r[5],r[6]).length(),a=Ri.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],$t.copy(this);const l=1/s,h=1/o,u=1/a;return $t.elements[0]*=l,$t.elements[1]*=l,$t.elements[2]*=l,$t.elements[4]*=h,$t.elements[5]*=h,$t.elements[6]*=h,$t.elements[8]*=u,$t.elements[9]*=u,$t.elements[10]*=u,t.setFromRotationMatrix($t),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=wn){const c=this.elements,l=2*s/(t-e),h=2*s/(i-r),u=(t+e)/(t-e),f=(i+r)/(i-r);let m,v;if(a===wn)m=-(o+s)/(o-s),v=-2*o*s/(o-s);else if(a===Us)m=-o/(o-s),v=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=wn){const c=this.elements,l=1/(t-e),h=1/(i-r),u=1/(o-s),f=(t+e)*l,m=(i+r)*h;let v,g;if(a===wn)v=(o+s)*u,g=-2*u;else if(a===Us)v=s*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ri=new O,$t=new ct,$p=new O(0,0,0),jp=new O(1,1,1),Un=new O,ns=new O,It=new O,fl=new ct,pl=new on;class Wt{constructor(e=0,t=0,i=0,r=Wt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],c=r[1],l=r[5],h=r[9],u=r[2],f=r[6],m=r[10];switch(t){case"XYZ":this._y=Math.asin(Pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Pt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Pt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Pt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Pt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return fl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return pl.setFromEuler(this),this.setFromQuaternion(pl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wt.DEFAULT_ORDER="XYZ";class Tu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kp=0;const ml=new O,Ci=new on,pn=new ct,is=new O,pr=new O,Zp=new O,Jp=new on,gl=new O(1,0,0),_l=new O(0,1,0),vl=new O(0,0,1),yl={type:"added"},Qp={type:"removed"},Pi={type:"childadded",child:null},xo={type:"childremoved",child:null};class ut extends rr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=qn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ut.DEFAULT_UP.clone();const e=new O,t=new Wt,i=new on,r=new O(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ct},normalMatrix:{value:new Ge}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ci.setFromAxisAngle(e,t),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(e,t){return Ci.setFromAxisAngle(e,t),this.quaternion.premultiply(Ci),this}rotateX(e){return this.rotateOnAxis(gl,e)}rotateY(e){return this.rotateOnAxis(_l,e)}rotateZ(e){return this.rotateOnAxis(vl,e)}translateOnAxis(e,t){return ml.copy(e).applyQuaternion(this.quaternion),this.position.add(ml.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(gl,e)}translateY(e){return this.translateOnAxis(_l,e)}translateZ(e){return this.translateOnAxis(vl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?is.copy(e):is.set(e,t,i);const r=this.parent;this.updateWorldMatrix(!0,!1),pr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(pr,is,this.up):pn.lookAt(is,pr,this.up),this.quaternion.setFromRotationMatrix(pn),r&&(pn.extractRotation(r.matrixWorld),Ci.setFromRotationMatrix(pn),this.quaternion.premultiply(Ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(yl),Pi.child=e,this.dispatchEvent(Pi),Pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Qp),xo.child=e,this.dispatchEvent(xo),xo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(yl),Pi.child=e,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,e,Zp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(pr,Jp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()}));function s(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];s(e.shapes,u)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(s(e.materials,this.material[c]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];r.animations.push(s(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),m=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),v.length>0&&(i.nodes=v)}return i.object=r,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}ut.DEFAULT_UP=new O(0,1,0);ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const jt=new O,mn=new O,Mo=new O,gn=new O,Li=new O,Di=new O,xl=new O,So=new O,Eo=new O,wo=new O,To=new rt,bo=new rt,Ao=new rt;class Ht{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),jt.subVectors(e,t),r.cross(jt);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){jt.subVectors(r,t),mn.subVectors(i,t),Mo.subVectors(e,t);const o=jt.dot(jt),a=jt.dot(mn),c=jt.dot(Mo),l=mn.dot(mn),h=mn.dot(Mo),u=o*l-a*a;if(u===0)return s.set(0,0,0),null;const f=1/u,m=(l*c-a*h)*f,v=(o*h-a*c)*f;return s.set(1-m-v,v,m)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(e,t,i,r,s,o,a,c){return this.getBarycoord(e,t,i,r,gn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,gn.x),c.addScaledVector(o,gn.y),c.addScaledVector(a,gn.z),c)}static getInterpolatedAttribute(e,t,i,r,s,o){return To.setScalar(0),bo.setScalar(0),Ao.setScalar(0),To.fromBufferAttribute(e,t),bo.fromBufferAttribute(e,i),Ao.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(To,s.x),o.addScaledVector(bo,s.y),o.addScaledVector(Ao,s.z),o}static isFrontFacing(e,t,i,r){return jt.subVectors(i,t),mn.subVectors(e,t),jt.cross(mn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return jt.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),jt.cross(mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ht.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ht.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return Ht.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return Ht.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ht.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,r=this.b,s=this.c;let o,a;Li.subVectors(r,i),Di.subVectors(s,i),So.subVectors(e,i);const c=Li.dot(So),l=Di.dot(So);if(c<=0&&l<=0)return t.copy(i);Eo.subVectors(e,r);const h=Li.dot(Eo),u=Di.dot(Eo);if(h>=0&&u<=h)return t.copy(r);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(Li,o);wo.subVectors(e,s);const m=Li.dot(wo),v=Di.dot(wo);if(v>=0&&m<=v)return t.copy(s);const g=m*l-c*v;if(g<=0&&l>=0&&v<=0)return a=l/(l-v),t.copy(i).addScaledVector(Di,a);const p=h*v-m*u;if(p<=0&&u-h>=0&&m-v>=0)return xl.subVectors(s,r),a=(u-h)/(u-h+(m-v)),t.copy(r).addScaledVector(xl,a);const d=1/(p+g+f);return o=g*d,a=f*d,t.copy(i).addScaledVector(Li,o).addScaledVector(Di,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const bu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},rs={h:0,s:0,l:0};function Ro(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,i,r=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.toWorkingColorSpace(this,r),this}setHSL(e,t,i,r=je.workingColorSpace){if(e=Op(e,1),t=Pt(t,0,1),i=Pt(i,0,1),t===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Ro(o,s,e+1/3),this.g=Ro(o,s,e),this.b=Ro(o,s,e-1/3)}return je.toWorkingColorSpace(this,r),this}setStyle(e,t=kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const i=bu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Tn(e.r),this.g=Tn(e.g),this.b=Tn(e.b),this}copyLinearToSRGB(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return je.fromWorkingColorSpace(xt.copy(this),e),Math.round(Pt(xt.r*255,0,255))*65536+Math.round(Pt(xt.g*255,0,255))*256+Math.round(Pt(xt.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(xt.copy(this),t);const i=xt.r,r=xt.g,s=xt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(r-s)/u+(r<s?6:0);break;case r:c=(s-i)/u+2;break;case s:c=(i-r)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(xt.copy(this),t),e.r=xt.r,e.g=xt.g,e.b=xt.b,e}getStyle(e=kt){je.fromWorkingColorSpace(xt.copy(this),e);const t=xt.r,i=xt.g,r=xt.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Nn),this.setHSL(Nn.h+e,Nn.s+t,Nn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Nn),e.getHSL(rs);const i=ho(Nn.h,rs.h,t),r=ho(Nn.s,rs.s,t),s=ho(Nn.l,rs.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const xt=new qe;qe.NAMES=bu;let em=0;class xi extends rr{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=qn(),this.name="",this.blending=Vi,this.side=Vt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ta,this.blendDst=na,this.blendEquation=si,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Vi&&(i.blending=this.blending),this.side!==Vt&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==ta&&(i.blendSrc=this.blendSrc),this.blendDst!==na&&(i.blendDst=this.blendDst),this.blendEquation!==si&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const c=s[a];delete c.metadata,o.push(c)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class an extends xi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=ou,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ht=new O,ss=new ze;class _t{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=ka,this.updateRanges=[],this.gpuType=En,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ss.fromBufferAttribute(this,t),ss.applyMatrix3(e),this.setXY(t,ss.x,ss.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=rn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=rn(t,this.array)),t}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=rn(t,this.array)),t}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=rn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=rn(t,this.array)),t}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),r=nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),r=nt(r,this.array),s=nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ka&&(e.usage=this.usage),e}}class Au extends _t{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ru extends _t{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class dt extends _t{constructor(e,t,i){super(new Float32Array(e),t,i)}}let tm=0;const Bt=new ct,Co=new ut,Ii=new O,Ut=new kr,mr=new kr,mt=new O;class Et extends rr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=qn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mu(e)?Ru:Au)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ge().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bt.makeRotationFromQuaternion(e),this.applyMatrix4(Bt),this}rotateX(e){return Bt.makeRotationX(e),this.applyMatrix4(Bt),this}rotateY(e){return Bt.makeRotationY(e),this.applyMatrix4(Bt),this}rotateZ(e){return Bt.makeRotationZ(e),this.applyMatrix4(Bt),this}translate(e,t,i){return Bt.makeTranslation(e,t,i),this.applyMatrix4(Bt),this}scale(e,t,i){return Bt.makeScale(e,t,i),this.applyMatrix4(Bt),this}lookAt(e){return Co.lookAt(e),Co.updateMatrix(),this.applyMatrix4(Co.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new dt(i,3))}else{for(let i=0,r=t.count;i<r;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new kr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){const s=t[i];Ut.setFromBufferAttribute(s),this.morphTargetsRelative?(mt.addVectors(this.boundingBox.min,Ut.min),this.boundingBox.expandByPoint(mt),mt.addVectors(this.boundingBox.max,Ut.max),this.boundingBox.expandByPoint(mt)):(this.boundingBox.expandByPoint(Ut.min),this.boundingBox.expandByPoint(Ut.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Ut.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];mr.setFromBufferAttribute(a),this.morphTargetsRelative?(mt.addVectors(Ut.min,mr.min),Ut.expandByPoint(mt),mt.addVectors(Ut.max,mr.max),Ut.expandByPoint(mt)):(Ut.expandByPoint(mr.min),Ut.expandByPoint(mr.max))}Ut.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)mt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(mt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)mt.fromBufferAttribute(a,l),c&&(Ii.fromBufferAttribute(e,l),mt.add(Ii)),r=Math.max(r,i.distanceToSquared(mt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new _t(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<i.count;L++)a[L]=new O,c[L]=new O;const l=new O,h=new O,u=new O,f=new ze,m=new ze,v=new ze,g=new O,p=new O;function d(L,w,M){l.fromBufferAttribute(i,L),h.fromBufferAttribute(i,w),u.fromBufferAttribute(i,M),f.fromBufferAttribute(s,L),m.fromBufferAttribute(s,w),v.fromBufferAttribute(s,M),h.sub(l),u.sub(l),m.sub(f),v.sub(f);const D=1/(m.x*v.y-v.x*m.y);isFinite(D)&&(g.copy(h).multiplyScalar(v.y).addScaledVector(u,-m.y).multiplyScalar(D),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-v.x).multiplyScalar(D),a[L].add(g),a[w].add(g),a[M].add(g),c[L].add(p),c[w].add(p),c[M].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let L=0,w=_.length;L<w;++L){const M=_[L],D=M.start,W=M.count;for(let S=D,R=D+W;S<R;S+=3)d(e.getX(S+0),e.getX(S+1),e.getX(S+2))}const y=new O,x=new O,P=new O,A=new O;function C(L){P.fromBufferAttribute(r,L),A.copy(P);const w=a[L];y.copy(w),y.sub(P.multiplyScalar(P.dot(w))).normalize(),x.crossVectors(A,w);const D=x.dot(c[L])<0?-1:1;o.setXYZW(L,y.x,y.y,y.z,D)}for(let L=0,w=_.length;L<w;++L){const M=_[L],D=M.start,W=M.count;for(let S=D,R=D+W;S<R;S+=3)C(e.getX(S+0)),C(e.getX(S+1)),C(e.getX(S+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new _t(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const r=new O,s=new O,o=new O,a=new O,c=new O,l=new O,h=new O,u=new O;if(e)for(let f=0,m=e.count;f<m;f+=3){const v=e.getX(f+0),g=e.getX(f+1),p=e.getX(f+2);r.fromBufferAttribute(t,v),s.fromBufferAttribute(t,g),o.fromBufferAttribute(t,p),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,v),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,p),a.add(h),c.add(h),l.add(h),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)mt.fromBufferAttribute(e,t),mt.normalize(),e.setXYZ(t,mt.x,mt.y,mt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let m=0,v=0;for(let g=0,p=c.length;g<p;g++){a.isInterleavedBufferAttribute?m=c[g]*a.data.stride+a.offset:m=c[g]*h;for(let d=0;d<h;d++)f[v++]=l[m++]}return new _t(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Et,i=this.index.array,r=this.attributes;for(const a in r){const c=r[a],l=e(c,i);t.setAttribute(a,l)}const s=this.morphAttributes;for(const a in s){const c=[],l=s[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],m=e(f,i);c.push(m)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],u=s[l];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ml=new ct,Qn=new wu,os=new zr,Sl=new O,as=new O,cs=new O,ls=new O,Po=new O,hs=new O,El=new O,us=new O;class it extends ut{constructor(e=new Et,t=new an){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){hs.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=a[c],u=s[c];h!==0&&(Po.fromBufferAttribute(u,e),o?hs.addScaledVector(Po,h):hs.addScaledVector(Po.sub(t),h))}t.add(hs)}return t}raycast(e,t){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),os.copy(i.boundingSphere),os.applyMatrix4(s),Qn.copy(e.ray).recast(e.near),!(os.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(os,Sl)===null||Qn.origin.distanceToSquared(Sl)>(e.far-e.near)**2))&&(Ml.copy(s).invert(),Qn.copy(e.ray).applyMatrix4(Ml),!(i.boundingBox!==null&&Qn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,i){let r;const s=this.geometry,o=this.material,a=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,f=s.groups,m=s.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,g=f.length;v<g;v++){const p=f[v],d=o[p.materialIndex],_=Math.max(p.start,m.start),y=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let x=_,P=y;x<P;x+=3){const A=a.getX(x),C=a.getX(x+1),L=a.getX(x+2);r=ds(this,d,e,i,l,h,u,A,C,L),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const v=Math.max(0,m.start),g=Math.min(a.count,m.start+m.count);for(let p=v,d=g;p<d;p+=3){const _=a.getX(p),y=a.getX(p+1),x=a.getX(p+2);r=ds(this,o,e,i,l,h,u,_,y,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}else if(c!==void 0)if(Array.isArray(o))for(let v=0,g=f.length;v<g;v++){const p=f[v],d=o[p.materialIndex],_=Math.max(p.start,m.start),y=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let x=_,P=y;x<P;x+=3){const A=x,C=x+1,L=x+2;r=ds(this,d,e,i,l,h,u,A,C,L),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=p.materialIndex,t.push(r))}}else{const v=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let p=v,d=g;p<d;p+=3){const _=p,y=p+1,x=p+2;r=ds(this,o,e,i,l,h,u,_,y,x),r&&(r.faceIndex=Math.floor(p/3),t.push(r))}}}}function nm(n,e,t,i,r,s,o,a){let c;if(e.side===bt?c=i.intersectTriangle(o,s,r,!0,a):c=i.intersectTriangle(r,s,o,e.side===Vt,a),c===null)return null;us.copy(a),us.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(us);return l<t.near||l>t.far?null:{distance:l,point:us.clone(),object:n}}function ds(n,e,t,i,r,s,o,a,c,l){n.getVertexPosition(a,as),n.getVertexPosition(c,cs),n.getVertexPosition(l,ls);const h=nm(n,e,t,i,as,cs,ls,El);if(h){const u=new O;Ht.getBarycoord(El,as,cs,ls,u),r&&(h.uv=Ht.getInterpolatedAttribute(r,a,c,l,u,new ze)),s&&(h.uv1=Ht.getInterpolatedAttribute(s,a,c,l,u,new ze)),o&&(h.normal=Ht.getInterpolatedAttribute(o,a,c,l,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new O,materialIndex:0};Ht.getNormal(as,cs,ls,f.normal),h.face=f,h.barycoord=u}return h}class ln extends Et{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,m=0;v("z","y","x",-1,-1,i,t,e,o,s,0),v("z","y","x",1,-1,i,t,-e,o,s,1),v("x","z","y",1,1,e,i,t,r,o,2),v("x","z","y",1,-1,e,i,-t,r,o,3),v("x","y","z",1,-1,e,t,i,r,s,4),v("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new dt(l,3)),this.setAttribute("normal",new dt(h,3)),this.setAttribute("uv",new dt(u,2));function v(g,p,d,_,y,x,P,A,C,L,w){const M=x/C,D=P/L,W=x/2,S=P/2,R=A/2,N=C+1,I=L+1;let z=0,B=0;const F=new O;for(let k=0;k<I;k++){const Z=k*D-S;for(let ae=0;ae<N;ae++){const xe=ae*M-W;F[g]=xe*_,F[p]=Z*y,F[d]=R,l.push(F.x,F.y,F.z),F[g]=0,F[p]=0,F[d]=A>0?1:-1,h.push(F.x,F.y,F.z),u.push(ae/C),u.push(1-k/L),z+=1}}for(let k=0;k<L;k++)for(let Z=0;Z<C;Z++){const ae=f+Z+N*k,xe=f+Z+N*(k+1),X=f+(Z+1)+N*(k+1),ne=f+(Z+1)+N*k;c.push(ae,xe,ne),c.push(xe,X,ne),B+=6}a.addGroup(m,B,w),m+=B,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ln(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function nr(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function Tt(n){const e={};for(let t=0;t<n.length;t++){const i=nr(n[t]);for(const r in i)e[r]=i[r]}return e}function im(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Cu(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const rm={clone:nr,merge:Tt};var sm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,om=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends xi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sm,this.fragmentShader=om,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=nr(e.uniforms),this.uniformsGroups=im(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Pu extends ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=wn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fn=new O,wl=new ze,Tl=new ze;class Nt extends Pu{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=za*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(lo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return za*2*Math.atan(Math.tan(lo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Fn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z),Fn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Fn.x,Fn.y).multiplyScalar(-e/Fn.z)}getViewSize(e,t){return this.getViewBounds(e,wl,Tl),t.subVectors(Tl,wl)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(lo*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;s+=o.offsetX*r/c,t-=o.offsetY*i/l,r*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ui=-90,Ni=1;class am extends ut{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nt(Ui,Ni,e,t);r.layers=this.layers,this.add(r);const s=new Nt(Ui,Ni,e,t);s.layers=this.layers,this.add(s);const o=new Nt(Ui,Ni,e,t);o.layers=this.layers,this.add(o);const a=new Nt(Ui,Ni,e,t);a.layers=this.layers,this.add(a);const c=new Nt(Ui,Ni,e,t);c.layers=this.layers,this.add(c);const l=new Nt(Ui,Ni,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,c]=t;for(const l of t)this.remove(l);if(e===wn)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Us)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,c),e.setRenderTarget(i,4,r),e.render(t,l),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(u,f,m),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class Lu extends At{constructor(e,t,i,r,s,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Ji,super(e,t,i,r,s,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class cm extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Lu(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ln(5,5,5),s=new jn({name:"CubemapFromEquirect",uniforms:nr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:bt,blending:Wn});s.uniforms.tEquirect.value=t;const o=new it(r,s),a=t.minFilter;return t.minFilter===hi&&(t.minFilter=sn),new am(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,r){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}}const Lo=new O,lm=new O,hm=new Ge;class ii{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const r=Lo.subVectors(i,t).cross(lm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Lo),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||hm.getNormalMatrix(e),r=this.coplanarPoint(Lo).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new zr,fs=new O;class oc{constructor(e=new ii,t=new ii,i=new ii,r=new ii,s=new ii,o=new ii){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=wn){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],c=r[3],l=r[4],h=r[5],u=r[6],f=r[7],m=r[8],v=r[9],g=r[10],p=r[11],d=r[12],_=r[13],y=r[14],x=r[15];if(i[0].setComponents(c-s,f-l,p-m,x-d).normalize(),i[1].setComponents(c+s,f+l,p+m,x+d).normalize(),i[2].setComponents(c+o,f+h,p+v,x+_).normalize(),i[3].setComponents(c-o,f-h,p-v,x-_).normalize(),i[4].setComponents(c-a,f-u,p-g,x-y).normalize(),t===wn)i[5].setComponents(c+a,f+u,p+g,x+y).normalize();else if(t===Us)i[5].setComponents(a,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const r=t[i];if(fs.x=r.normal.x>0?e.max.x:e.min.x,fs.y=r.normal.y>0?e.max.y:e.min.y,fs.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(fs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Du(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function um(n){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((m,v)=>m.start-v.start);let f=0;for(let m=1;m<u.length;m++){const v=u[f],g=u[m];g.start<=v.start+v.count+1?v.count=Math.max(v.count,g.start+g.count-v.start):(++f,u[f]=g)}u.length=f+1;for(let m=0,v=u.length;m<v;m++){const g=u[m];n.bufferSubData(l,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:r,remove:s,update:o}}class Xs extends Et{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(i),c=Math.floor(r),l=a+1,h=c+1,u=e/a,f=t/c,m=[],v=[],g=[],p=[];for(let d=0;d<h;d++){const _=d*f-o;for(let y=0;y<l;y++){const x=y*u-s;v.push(x,-_,0),g.push(0,0,1),p.push(y/a),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let _=0;_<a;_++){const y=_+l*d,x=_+l*(d+1),P=_+1+l*(d+1),A=_+1+l*d;m.push(y,x,A),m.push(x,P,A)}this.setIndex(m),this.setAttribute("position",new dt(v,3)),this.setAttribute("normal",new dt(g,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.width,e.height,e.widthSegments,e.heightSegments)}}var dm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,fm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,pm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_m=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,vm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ym=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,xm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Mm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Sm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Em=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,wm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Tm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Lm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Nm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Om=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Bm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,km=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,zm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Vm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Gm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Wm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Xm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ym=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$m=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Km=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Zm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Jm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,eg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ng=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ig=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,rg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,sg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,og=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ag=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,cg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,hg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,ug=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,dg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,fg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_g=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,yg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Mg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Sg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Eg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,wg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Tg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ag=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Rg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Pg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ig=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ug=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ng=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Fg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Bg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,kg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Hg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Gg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Wg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Xg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Yg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,$g=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Kg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Zg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Jg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Qg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,e0=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,t0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,n0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,i0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,r0=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,s0=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,o0=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,a0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,h0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const u0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,d0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,v0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,y0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,x0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,M0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,S0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,E0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,w0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,b0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,R0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,P0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,L0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,D0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,I0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,U0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,N0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,F0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,B0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,k0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,z0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,V0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,G0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,W0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,We={alphahash_fragment:dm,alphahash_pars_fragment:fm,alphamap_fragment:pm,alphamap_pars_fragment:mm,alphatest_fragment:gm,alphatest_pars_fragment:_m,aomap_fragment:vm,aomap_pars_fragment:ym,batching_pars_vertex:xm,batching_vertex:Mm,begin_vertex:Sm,beginnormal_vertex:Em,bsdfs:wm,iridescence_fragment:Tm,bumpmap_pars_fragment:bm,clipping_planes_fragment:Am,clipping_planes_pars_fragment:Rm,clipping_planes_pars_vertex:Cm,clipping_planes_vertex:Pm,color_fragment:Lm,color_pars_fragment:Dm,color_pars_vertex:Im,color_vertex:Um,common:Nm,cube_uv_reflection_fragment:Fm,defaultnormal_vertex:Om,displacementmap_pars_vertex:Bm,displacementmap_vertex:km,emissivemap_fragment:zm,emissivemap_pars_fragment:Hm,colorspace_fragment:Vm,colorspace_pars_fragment:Gm,envmap_fragment:Wm,envmap_common_pars_fragment:Xm,envmap_pars_fragment:qm,envmap_pars_vertex:Ym,envmap_physical_pars_fragment:rg,envmap_vertex:$m,fog_vertex:jm,fog_pars_vertex:Km,fog_fragment:Zm,fog_pars_fragment:Jm,gradientmap_pars_fragment:Qm,lightmap_pars_fragment:eg,lights_lambert_fragment:tg,lights_lambert_pars_fragment:ng,lights_pars_begin:ig,lights_toon_fragment:sg,lights_toon_pars_fragment:og,lights_phong_fragment:ag,lights_phong_pars_fragment:cg,lights_physical_fragment:lg,lights_physical_pars_fragment:hg,lights_fragment_begin:ug,lights_fragment_maps:dg,lights_fragment_end:fg,logdepthbuf_fragment:pg,logdepthbuf_pars_fragment:mg,logdepthbuf_pars_vertex:gg,logdepthbuf_vertex:_g,map_fragment:vg,map_pars_fragment:yg,map_particle_fragment:xg,map_particle_pars_fragment:Mg,metalnessmap_fragment:Sg,metalnessmap_pars_fragment:Eg,morphinstance_vertex:wg,morphcolor_vertex:Tg,morphnormal_vertex:bg,morphtarget_pars_vertex:Ag,morphtarget_vertex:Rg,normal_fragment_begin:Cg,normal_fragment_maps:Pg,normal_pars_fragment:Lg,normal_pars_vertex:Dg,normal_vertex:Ig,normalmap_pars_fragment:Ug,clearcoat_normal_fragment_begin:Ng,clearcoat_normal_fragment_maps:Fg,clearcoat_pars_fragment:Og,iridescence_pars_fragment:Bg,opaque_fragment:kg,packing:zg,premultiplied_alpha_fragment:Hg,project_vertex:Vg,dithering_fragment:Gg,dithering_pars_fragment:Wg,roughnessmap_fragment:Xg,roughnessmap_pars_fragment:qg,shadowmap_pars_fragment:Yg,shadowmap_pars_vertex:$g,shadowmap_vertex:jg,shadowmask_pars_fragment:Kg,skinbase_vertex:Zg,skinning_pars_vertex:Jg,skinning_vertex:Qg,skinnormal_vertex:e0,specularmap_fragment:t0,specularmap_pars_fragment:n0,tonemapping_fragment:i0,tonemapping_pars_fragment:r0,transmission_fragment:s0,transmission_pars_fragment:o0,uv_pars_fragment:a0,uv_pars_vertex:c0,uv_vertex:l0,worldpos_vertex:h0,background_vert:u0,background_frag:d0,backgroundCube_vert:f0,backgroundCube_frag:p0,cube_vert:m0,cube_frag:g0,depth_vert:_0,depth_frag:v0,distanceRGBA_vert:y0,distanceRGBA_frag:x0,equirect_vert:M0,equirect_frag:S0,linedashed_vert:E0,linedashed_frag:w0,meshbasic_vert:T0,meshbasic_frag:b0,meshlambert_vert:A0,meshlambert_frag:R0,meshmatcap_vert:C0,meshmatcap_frag:P0,meshnormal_vert:L0,meshnormal_frag:D0,meshphong_vert:I0,meshphong_frag:U0,meshphysical_vert:N0,meshphysical_frag:F0,meshtoon_vert:O0,meshtoon_frag:B0,points_vert:k0,points_frag:z0,shadow_vert:H0,shadow_frag:V0,sprite_vert:G0,sprite_frag:W0},pe={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},tn={basic:{uniforms:Tt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Tt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new qe(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Tt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Tt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Tt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new qe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Tt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Tt([pe.points,pe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Tt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Tt([pe.common,pe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Tt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Tt([pe.sprite,pe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Tt([pe.common,pe.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Tt([pe.lights,pe.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};tn.physical={uniforms:Tt([tn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const ps={r:0,b:0,g:0},ti=new Wt,X0=new ct;function q0(n,e,t,i,r,s,o){const a=new qe(0);let c=s===!0?0:1,l,h,u=null,f=0,m=null;function v(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?t:e).get(y)),y}function g(_){let y=!1;const x=v(_);x===null?d(a,c):x&&x.isColor&&(d(x,1),y=!0);const P=n.xr.getEnvironmentBlendMode();P==="additive"?i.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(_,y){const x=v(y);x&&(x.isCubeTexture||x.mapping===Gs)?(h===void 0&&(h=new it(new ln(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:nr(tn.backgroundCube.uniforms),vertexShader:tn.backgroundCube.vertexShader,fragmentShader:tn.backgroundCube.fragmentShader,side:bt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),ti.copy(y.backgroundRotation),ti.x*=-1,ti.y*=-1,ti.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(X0.makeRotationFromEuler(ti)),h.material.toneMapped=je.getTransfer(x.colorSpace)!==tt,(u!==x||f!==x.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,m=n.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new it(new Xs(2,2),new jn({name:"BackgroundMaterial",uniforms:nr(tn.background.uniforms),vertexShader:tn.background.vertexShader,fragmentShader:tn.background.fragmentShader,side:Vt,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=je.getTransfer(x.colorSpace)!==tt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,m=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function d(_,y){_.getRGB(ps,Cu(n)),i.buffers.color.setClear(ps.r,ps.g,ps.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),c=y,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,d(a,c)},render:g,addToRenderList:p}}function Y0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=f(null);let s=r,o=!1;function a(M,D,W,S,R){let N=!1;const I=u(S,W,D);s!==I&&(s=I,l(s.object)),N=m(M,S,W,R),N&&v(M,S,W,R),R!==null&&e.update(R,n.ELEMENT_ARRAY_BUFFER),(N||o)&&(o=!1,x(M,D,W,S),R!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(R).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,D,W){const S=W.wireframe===!0;let R=i[M.id];R===void 0&&(R={},i[M.id]=R);let N=R[D.id];N===void 0&&(N={},R[D.id]=N);let I=N[S];return I===void 0&&(I=f(c()),N[S]=I),I}function f(M){const D=[],W=[],S=[];for(let R=0;R<t;R++)D[R]=0,W[R]=0,S[R]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:W,attributeDivisors:S,object:M,attributes:{},index:null}}function m(M,D,W,S){const R=s.attributes,N=D.attributes;let I=0;const z=W.getAttributes();for(const B in z)if(z[B].location>=0){const k=R[B];let Z=N[B];if(Z===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),k===void 0||k.attribute!==Z||Z&&k.data!==Z.data)return!0;I++}return s.attributesNum!==I||s.index!==S}function v(M,D,W,S){const R={},N=D.attributes;let I=0;const z=W.getAttributes();for(const B in z)if(z[B].location>=0){let k=N[B];k===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(k=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(k=M.instanceColor));const Z={};Z.attribute=k,k&&k.data&&(Z.data=k.data),R[B]=Z,I++}s.attributes=R,s.attributesNum=I,s.index=S}function g(){const M=s.newAttributes;for(let D=0,W=M.length;D<W;D++)M[D]=0}function p(M){d(M,0)}function d(M,D){const W=s.newAttributes,S=s.enabledAttributes,R=s.attributeDivisors;W[M]=1,S[M]===0&&(n.enableVertexAttribArray(M),S[M]=1),R[M]!==D&&(n.vertexAttribDivisor(M,D),R[M]=D)}function _(){const M=s.newAttributes,D=s.enabledAttributes;for(let W=0,S=D.length;W<S;W++)D[W]!==M[W]&&(n.disableVertexAttribArray(W),D[W]=0)}function y(M,D,W,S,R,N,I){I===!0?n.vertexAttribIPointer(M,D,W,R,N):n.vertexAttribPointer(M,D,W,S,R,N)}function x(M,D,W,S){g();const R=S.attributes,N=W.getAttributes(),I=D.defaultAttributeValues;for(const z in N){const B=N[z];if(B.location>=0){let F=R[z];if(F===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(F=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(F=M.instanceColor)),F!==void 0){const k=F.normalized,Z=F.itemSize,ae=e.get(F);if(ae===void 0)continue;const xe=ae.buffer,X=ae.type,ne=ae.bytesPerElement,he=X===n.INT||X===n.UNSIGNED_INT||F.gpuType===ec;if(F.isInterleavedBufferAttribute){const ce=F.data,Re=ce.stride,Le=F.offset;if(ce.isInstancedInterleavedBuffer){for(let Ie=0;Ie<B.locationSize;Ie++)d(B.location+Ie,ce.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ie=0;Ie<B.locationSize;Ie++)p(B.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let Ie=0;Ie<B.locationSize;Ie++)y(B.location+Ie,Z/B.locationSize,X,k,Re*ne,(Le+Z/B.locationSize*Ie)*ne,he)}else{if(F.isInstancedBufferAttribute){for(let ce=0;ce<B.locationSize;ce++)d(B.location+ce,F.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let ce=0;ce<B.locationSize;ce++)p(B.location+ce);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let ce=0;ce<B.locationSize;ce++)y(B.location+ce,Z/B.locationSize,X,k,Z*ne,Z/B.locationSize*ce*ne,he)}}else if(I!==void 0){const k=I[z];if(k!==void 0)switch(k.length){case 2:n.vertexAttrib2fv(B.location,k);break;case 3:n.vertexAttrib3fv(B.location,k);break;case 4:n.vertexAttrib4fv(B.location,k);break;default:n.vertexAttrib1fv(B.location,k)}}}}_()}function P(){L();for(const M in i){const D=i[M];for(const W in D){const S=D[W];for(const R in S)h(S[R].object),delete S[R];delete D[W]}delete i[M]}}function A(M){if(i[M.id]===void 0)return;const D=i[M.id];for(const W in D){const S=D[W];for(const R in S)h(S[R].object),delete S[R];delete D[W]}delete i[M.id]}function C(M){for(const D in i){const W=i[D];if(W[M.id]===void 0)continue;const S=W[M.id];for(const R in S)h(S[R].object),delete S[R];delete W[M.id]}}function L(){w(),o=!0,s!==r&&(s=r,l(s.object))}function w(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:L,resetDefaultState:w,dispose:P,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:g,enableAttribute:p,disableUnusedAttributes:_}}function $0(n,e,t){let i;function r(l){i=l}function s(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),t.update(h,i,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v];t.update(m,i,1)}function c(l,h,u,f){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let v=0;v<l.length;v++)o(l[v],h[v],f[v]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let v=0;for(let g=0;g<u;g++)v+=h[g]*f[g];t.update(v,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function j0(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(C){return!(C!==Zt&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(C){const L=C===Br&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==An&&i.convert(C)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==En&&!L)}function c(C){if(C==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),P=v>0,A=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:v,maxTextureSize:g,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:P,maxSamples:A}}function K0(n){const e=this;let t=null,i=0,r=!1,s=!1;const o=new ii,a=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||i!==0||r;return r=f,i=u.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,m){const v=u.clippingPlanes,g=u.clipIntersection,p=u.clipShadows,d=n.get(u);if(!r||v===null||v.length===0||s&&!p)s?h(null):l();else{const _=s?0:i,y=_*4;let x=d.clippingState||null;c.value=x,x=h(v,f,y,m);for(let P=0;P!==y;++P)x[P]=t[P];d.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,m,v){const g=u!==null?u.length:0;let p=null;if(g!==0){if(p=c.value,v!==!0||p===null){const d=m+g*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<d)&&(p=new Float32Array(d));for(let y=0,x=m;y!==g;++y,x+=4)o.copy(u[y]).applyMatrix4(_,a),o.normal.toArray(p,x),p[x+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,p}}function Z0(n){let e=new WeakMap;function t(o,a){return a===ha?o.mapping=Ji:a===ua&&(o.mapping=Qi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===ha||a===ua)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new cm(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",r),t(l.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}class Iu extends Pu{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+t,c=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,o=s+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Hi=4,bl=[.125,.215,.35,.446,.526,.582],oi=20,Do=new Iu,Al=new qe;let Io=null,Uo=0,No=0,Fo=!1;const ri=(1+Math.sqrt(5))/2,Fi=1/ri,Rl=[new O(-ri,Fi,0),new O(ri,Fi,0),new O(-Fi,0,ri),new O(Fi,0,ri),new O(0,ri,-Fi),new O(0,ri,Fi),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class Cl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100){Io=this._renderer.getRenderTarget(),Uo=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,i,r,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Io,Uo,No),this._renderer.xr.enabled=Fo,e.scissorTest=!1,ms(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ji||e.mapping===Qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Io=this._renderer.getRenderTarget(),Uo=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Fo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:Br,format:Zt,colorSpace:ir,depthBuffer:!1},r=Pl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Pl(e,t,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=J0(s)),this._blurMaterial=Q0(s,e,t)}return r}_compileMaterial(e){const t=new it(this._lodPlanes[0],e);this._renderer.compile(t,Do)}_sceneToCubeUV(e,t,i,r){const a=new Nt(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Al),h.toneMapping=Xn,h.autoClear=!1;const m=new an({name:"PMREM.Background",side:bt,depthWrite:!1,depthTest:!1}),v=new it(new ln,m);let g=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,g=!0):(m.color.copy(Al),g=!0);for(let d=0;d<6;d++){const _=d%3;_===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):_===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const y=this._cubeSize;ms(r,_*y,d>2?y:0,y,y),h.setRenderTarget(r),g&&h.render(v,a),h.render(e,a)}v.geometry.dispose(),v.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,r=e.mapping===Ji||e.mapping===Qi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ll());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new it(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const c=this._cubeSize;ms(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,Do)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Rl[(r-s-1)%Rl.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new it(this._lodPlanes[r],l),f=l.uniforms,m=this._sizeLods[i]-1,v=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*oi-1),g=s/v,p=isFinite(s)?1+Math.floor(h*g):oi;p>oi&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${oi}`);const d=[];let _=0;for(let C=0;C<oi;++C){const L=C/g,w=Math.exp(-L*L/2);d.push(w),C===0?_+=w:C<p&&(_+=2*w)}for(let C=0;C<d.length;C++)d[C]=d[C]/_;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=v,f.mipInt.value=y-i;const x=this._sizeLods[r],P=3*x*(r>y-Hi?r-y+Hi:0),A=4*(this._cubeSize-x);ms(t,P,A,3*x,2*x),c.setRenderTarget(t),c.render(u,Do)}}function J0(n){const e=[],t=[],i=[];let r=n;const s=n-Hi+1+bl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);t.push(a);let c=1/a;o>n-Hi?c=bl[o-n+Hi-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,v=6,g=3,p=2,d=1,_=new Float32Array(g*v*m),y=new Float32Array(p*v*m),x=new Float32Array(d*v*m);for(let A=0;A<m;A++){const C=A%3*2/3-1,L=A>2?0:-1,w=[C,L,0,C+2/3,L,0,C+2/3,L+1,0,C,L,0,C+2/3,L+1,0,C,L+1,0];_.set(w,g*v*A),y.set(f,p*v*A);const M=[A,A,A,A,A,A];x.set(M,d*v*A)}const P=new Et;P.setAttribute("position",new _t(_,g)),P.setAttribute("uv",new _t(y,p)),P.setAttribute("faceIndex",new _t(x,d)),e.push(P),r>Hi&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Pl(n,e,t){const i=new mi(n,e,t);return i.texture.mapping=Gs,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ms(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function Q0(n,e,t){const i=new Float32Array(oi),r=new O(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Ll(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function Dl(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ac(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wn,depthTest:!1,depthWrite:!1})}function ac(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function e_(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===ha||c===ua,h=c===Ji||c===Qi;if(l||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Cl(n)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return l&&m&&m.height>0||h&&m&&r(m)?(t===null&&(t=new Cl(n)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function s(a){const c=a.target;c.removeEventListener("dispose",s);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function t_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const r=t(i);return r===null&&Sr("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function n_(n,e,t,i){const r={},s=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const v in f.attributes)e.remove(f.attributes[v]);for(const v in f.morphAttributes){const g=f.morphAttributes[v];for(let p=0,d=g.length;p<d;p++)e.remove(g[p])}f.removeEventListener("dispose",o),delete r[f.id];const m=s.get(f);m&&(e.remove(m),s.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const v in f)e.update(f[v],n.ARRAY_BUFFER);const m=u.morphAttributes;for(const v in m){const g=m[v];for(let p=0,d=g.length;p<d;p++)e.update(g[p],n.ARRAY_BUFFER)}}function l(u){const f=[],m=u.index,v=u.attributes.position;let g=0;if(m!==null){const _=m.array;g=m.version;for(let y=0,x=_.length;y<x;y+=3){const P=_[y+0],A=_[y+1],C=_[y+2];f.push(P,A,A,C,C,P)}}else if(v!==void 0){const _=v.array;g=v.version;for(let y=0,x=_.length/3-1;y<x;y+=3){const P=y+0,A=y+1,C=y+2;f.push(P,A,A,C,C,P)}}else return;const p=new(Mu(f)?Ru:Au)(f,1);p.version=g;const d=s.get(u);d&&e.remove(d),s.set(u,p)}function h(u){const f=s.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return s.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function i_(n,e,t){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function c(f,m){n.drawElements(i,m,s,f*o),t.update(m,i,1)}function l(f,m,v){v!==0&&(n.drawElementsInstanced(i,m,s,f*o,v),t.update(m,i,v))}function h(f,m,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,f,0,v);let p=0;for(let d=0;d<v;d++)p+=m[d];t.update(p,i,1)}function u(f,m,v,g){if(v===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<f.length;d++)l(f[d]/o,m[d],g[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,f,0,g,0,v);let d=0;for(let _=0;_<v;_++)d+=m[_]*g[_];t.update(d,i,1)}}this.setMode=r,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function r_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function s_(n,e,t){const i=new WeakMap,r=new rt;function s(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let M=function(){L.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var m=M;f!==void 0&&f.texture.dispose();const v=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;v===!0&&(x=1),g===!0&&(x=2),p===!0&&(x=3);let P=a.attributes.position.count*x,A=1;P>e.maxTextureSize&&(A=Math.ceil(P/e.maxTextureSize),P=e.maxTextureSize);const C=new Float32Array(P*A*4*u),L=new Eu(C,P,A,u);L.type=En,L.needsUpdate=!0;const w=x*4;for(let D=0;D<u;D++){const W=d[D],S=_[D],R=y[D],N=P*A*4*D;for(let I=0;I<W.count;I++){const z=I*w;v===!0&&(r.fromBufferAttribute(W,I),C[N+z+0]=r.x,C[N+z+1]=r.y,C[N+z+2]=r.z,C[N+z+3]=0),g===!0&&(r.fromBufferAttribute(S,I),C[N+z+4]=r.x,C[N+z+5]=r.y,C[N+z+6]=r.z,C[N+z+7]=0),p===!0&&(r.fromBufferAttribute(R,I),C[N+z+8]=r.x,C[N+z+9]=r.y,C[N+z+10]=r.z,C[N+z+11]=R.itemSize===4?r.w:1)}}f={count:u,texture:L,size:new ze(P,A)},i.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let v=0;for(let p=0;p<l.length;p++)v+=l[p];const g=a.morphTargetsRelative?1:1-v;c.getUniforms().setValue(n,"morphTargetBaseInfluence",g),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:s}}function o_(n,e,t,i){let r=new WeakMap;function s(c){const l=i.render.frame,h=c.geometry,u=e.get(c,h);if(r.get(u)!==l&&(e.update(u),r.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),r.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;r.get(f)!==l&&(f.update(),r.set(f,l))}return u}function o(){r=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:s,dispose:o}}class Uu extends At{constructor(e,t,i,r,s,o,a,c,l,h=Gi){if(h!==Gi&&h!==tr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Gi&&(i=pi),i===void 0&&h===tr&&(i=er),super(null,r,s,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:Qt,this.minFilter=c!==void 0?c:Qt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Nu=new At,Il=new Uu(1,1),Fu=new Eu,Ou=new qp,Bu=new Lu,Ul=[],Nl=[],Fl=new Float32Array(16),Ol=new Float32Array(9),Bl=new Float32Array(4);function sr(n,e,t){const i=n[0];if(i<=0||i>0)return n;const r=e*t;let s=Ul[r];if(s===void 0&&(s=new Float32Array(r),Ul[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function ft(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function pt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function qs(n,e){let t=Nl[e];t===void 0&&(t=new Int32Array(e),Nl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function a_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function c_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2fv(this.addr,e),pt(t,e)}}function l_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ft(t,e))return;n.uniform3fv(this.addr,e),pt(t,e)}}function h_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4fv(this.addr,e),pt(t,e)}}function u_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;Bl.set(i),n.uniformMatrix2fv(this.addr,!1,Bl),pt(t,i)}}function d_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;Ol.set(i),n.uniformMatrix3fv(this.addr,!1,Ol),pt(t,i)}}function f_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(ft(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),pt(t,e)}else{if(ft(t,i))return;Fl.set(i),n.uniformMatrix4fv(this.addr,!1,Fl),pt(t,i)}}function p_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function m_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2iv(this.addr,e),pt(t,e)}}function g_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;n.uniform3iv(this.addr,e),pt(t,e)}}function __(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4iv(this.addr,e),pt(t,e)}}function v_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function y_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ft(t,e))return;n.uniform2uiv(this.addr,e),pt(t,e)}}function x_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ft(t,e))return;n.uniform3uiv(this.addr,e),pt(t,e)}}function M_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ft(t,e))return;n.uniform4uiv(this.addr,e),pt(t,e)}}function S_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(Il.compareFunction=xu,s=Il):s=Nu,t.setTexture2D(e||s,r)}function E_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||Ou,r)}function w_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||Bu,r)}function T_(n,e,t){const i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||Fu,r)}function b_(n){switch(n){case 5126:return a_;case 35664:return c_;case 35665:return l_;case 35666:return h_;case 35674:return u_;case 35675:return d_;case 35676:return f_;case 5124:case 35670:return p_;case 35667:case 35671:return m_;case 35668:case 35672:return g_;case 35669:case 35673:return __;case 5125:return v_;case 36294:return y_;case 36295:return x_;case 36296:return M_;case 35678:case 36198:case 36298:case 36306:case 35682:return S_;case 35679:case 36299:case 36307:return E_;case 35680:case 36300:case 36308:case 36293:return w_;case 36289:case 36303:case 36311:case 36292:return T_}}function A_(n,e){n.uniform1fv(this.addr,e)}function R_(n,e){const t=sr(e,this.size,2);n.uniform2fv(this.addr,t)}function C_(n,e){const t=sr(e,this.size,3);n.uniform3fv(this.addr,t)}function P_(n,e){const t=sr(e,this.size,4);n.uniform4fv(this.addr,t)}function L_(n,e){const t=sr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function D_(n,e){const t=sr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function I_(n,e){const t=sr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function U_(n,e){n.uniform1iv(this.addr,e)}function N_(n,e){n.uniform2iv(this.addr,e)}function F_(n,e){n.uniform3iv(this.addr,e)}function O_(n,e){n.uniform4iv(this.addr,e)}function B_(n,e){n.uniform1uiv(this.addr,e)}function k_(n,e){n.uniform2uiv(this.addr,e)}function z_(n,e){n.uniform3uiv(this.addr,e)}function H_(n,e){n.uniform4uiv(this.addr,e)}function V_(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),pt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||Nu,s[o])}function G_(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),pt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Ou,s[o])}function W_(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),pt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Bu,s[o])}function X_(n,e,t){const i=this.cache,r=e.length,s=qs(t,r);ft(i,s)||(n.uniform1iv(this.addr,s),pt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Fu,s[o])}function q_(n){switch(n){case 5126:return A_;case 35664:return R_;case 35665:return C_;case 35666:return P_;case 35674:return L_;case 35675:return D_;case 35676:return I_;case 5124:case 35670:return U_;case 35667:case 35671:return N_;case 35668:case 35672:return F_;case 35669:case 35673:return O_;case 5125:return B_;case 36294:return k_;case 36295:return z_;case 36296:return H_;case 35678:case 36198:case 36298:case 36306:case 35682:return V_;case 35679:case 36299:case 36307:return G_;case 35680:case 36300:case 36308:case 36293:return W_;case 36289:case 36303:case 36311:case 36292:return X_}}class Y_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=b_(t.type)}}class $_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=q_(t.type)}}class j_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],i)}}}const Oo=/(\w+)(\])?(\[|\.)?/g;function kl(n,e){n.seq.push(e),n.map[e.id]=e}function K_(n,e,t){const i=n.name,r=i.length;for(Oo.lastIndex=0;;){const s=Oo.exec(i),o=Oo.lastIndex;let a=s[1];const c=s[2]==="]",l=s[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===r){kl(t,l===void 0?new Y_(a,n,e):new $_(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new j_(a),kl(t,u)),t=u}}}class Rs{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);K_(s,o,this)}}setValue(e,t,i,r){const s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){const r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,r)}}static seqWithValue(e,t){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&i.push(o)}return i}}function zl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const Z_=37297;let J_=0;function Q_(n,e){const t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Hl=new Ge;function ev(n){je._getMatrix(Hl,je.workingColorSpace,n);const e=`mat3( ${Hl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case Ws:return[e,"LinearTransferOETF"];case tt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Vl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=n.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return t.toUpperCase()+`

`+r+`

`+Q_(n.getShaderSource(e),o)}else return r}function tv(n,e){const t=ev(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function nv(n,e){let t;switch(e){case xp:t="Linear";break;case Mp:t="Reinhard";break;case Sp:t="Cineon";break;case au:t="ACESFilmic";break;case wp:t="AgX";break;case Tp:t="Neutral";break;case Ep:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const gs=new O;function iv(){je.getLuminanceCoefficients(gs);const n=gs.x.toFixed(4),e=gs.y.toFixed(4),t=gs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function sv(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function ov(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=n.getActiveAttrib(e,r),o=s.name;let a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Er(n){return n!==""}function Gl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const av=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ha(n){return n.replace(av,lv)}const cv=new Map;function lv(n,e){let t=We[e];if(t===void 0){const i=cv.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Ha(t)}const hv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(n){return n.replace(hv,uv)}function uv(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function ql(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function dv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===su?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Qf?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===vn&&(e="SHADOWMAP_TYPE_VSM"),e}function fv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ji:case Qi:e="ENVMAP_TYPE_CUBE";break;case Gs:e="ENVMAP_TYPE_CUBE_UV";break}return e}function pv(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Qi:e="ENVMAP_MODE_REFRACTION";break}return e}function mv(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case ou:e="ENVMAP_BLENDING_MULTIPLY";break;case vp:e="ENVMAP_BLENDING_MIX";break;case yp:e="ENVMAP_BLENDING_ADD";break}return e}function gv(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function _v(n,e,t,i){const r=n.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=dv(t),l=fv(t),h=pv(t),u=mv(t),f=gv(t),m=rv(t),v=sv(s),g=r.createProgram();let p,d,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Er).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Er).join(`
`),d.length>0&&(d+=`
`)):(p=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),d=[ql(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?We.tonemapping_pars_fragment:"",t.toneMapping!==Xn?nv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,tv("linearToOutputTexel",t.outputColorSpace),iv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Er).join(`
`)),o=Ha(o),o=Gl(o,t),o=Wl(o,t),a=Ha(a),a=Gl(a,t),a=Wl(a,t),o=Xl(o),a=Xl(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",t.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=_+p+o,x=_+d+a,P=zl(r,r.VERTEX_SHADER,y),A=zl(r,r.FRAGMENT_SHADER,x);r.attachShader(g,P),r.attachShader(g,A),t.index0AttributeName!==void 0?r.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(g,0,"position"),r.linkProgram(g);function C(D){if(n.debug.checkShaderErrors){const W=r.getProgramInfoLog(g).trim(),S=r.getShaderInfoLog(P).trim(),R=r.getShaderInfoLog(A).trim();let N=!0,I=!0;if(r.getProgramParameter(g,r.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,g,P,A);else{const z=Vl(r,P,"vertex"),B=Vl(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(g,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+W+`
`+z+`
`+B)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(S===""||R==="")&&(I=!1);I&&(D.diagnostics={runnable:N,programLog:W,vertexShader:{log:S,prefix:p},fragmentShader:{log:R,prefix:d}})}r.deleteShader(P),r.deleteShader(A),L=new Rs(r,g),w=ov(r,g)}let L;this.getUniforms=function(){return L===void 0&&C(this),L};let w;this.getAttributes=function(){return w===void 0&&C(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(g,Z_)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=J_++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=P,this.fragmentShader=A,this}let vv=0;class yv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new xv(e),t.set(e,i)),i}}class xv{constructor(e){this.id=vv++,this.code=e,this.usedTimes=0}}function Mv(n,e,t,i,r,s,o){const a=new Tu,c=new yv,l=new Set,h=[],u=r.logarithmicDepthBuffer,f=r.vertexTextures;let m=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return l.add(w),w===0?"uv":`uv${w}`}function p(w,M,D,W,S){const R=W.fog,N=S.geometry,I=w.isMeshStandardMaterial?W.environment:null,z=(w.isMeshStandardMaterial?t:e).get(w.envMap||I),B=z&&z.mapping===Gs?z.image.height:null,F=v[w.type];w.precision!==null&&(m=r.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const k=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Z=k!==void 0?k.length:0;let ae=0;N.morphAttributes.position!==void 0&&(ae=1),N.morphAttributes.normal!==void 0&&(ae=2),N.morphAttributes.color!==void 0&&(ae=3);let xe,X,ne,he;if(F){const et=tn[F];xe=et.vertexShader,X=et.fragmentShader}else xe=w.vertexShader,X=w.fragmentShader,c.update(w),ne=c.getVertexShaderID(w),he=c.getFragmentShaderID(w);const ce=n.getRenderTarget(),Re=n.state.buffers.depth.getReversed(),Le=S.isInstancedMesh===!0,Ie=S.isBatchedMesh===!0,$=!!w.map,Q=!!w.matcap,ue=!!z,U=!!w.aoMap,Ne=!!w.lightMap,Ue=!!w.bumpMap,Oe=!!w.normalMap,Se=!!w.displacementMap,Ee=!!w.emissiveMap,me=!!w.metalnessMap,b=!!w.roughnessMap,E=w.anisotropy>0,Y=w.clearcoat>0,ee=w.dispersion>0,re=w.iridescence>0,q=w.sheen>0,oe=w.transmission>0,ie=E&&!!w.anisotropyMap,de=Y&&!!w.clearcoatMap,Pe=Y&&!!w.clearcoatNormalMap,se=Y&&!!w.clearcoatRoughnessMap,fe=re&&!!w.iridescenceMap,De=re&&!!w.iridescenceThicknessMap,Fe=q&&!!w.sheenColorMap,Me=q&&!!w.sheenRoughnessMap,Ye=!!w.specularMap,ke=!!w.specularColorMap,Qe=!!w.specularIntensityMap,H=oe&&!!w.transmissionMap,ge=oe&&!!w.thicknessMap,J=!!w.gradientMap,te=!!w.alphaMap,ye=w.alphaTest>0,_e=!!w.alphaHash,He=!!w.extensions;let lt=Xn;w.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(lt=n.toneMapping);const vt={shaderID:F,shaderType:w.type,shaderName:w.name,vertexShader:xe,fragmentShader:X,defines:w.defines,customVertexShaderID:ne,customFragmentShaderID:he,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:Ie,batchingColor:Ie&&S._colorsTexture!==null,instancing:Le,instancingColor:Le&&S.instanceColor!==null,instancingMorph:Le&&S.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ce===null?n.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:ir,alphaToCoverage:!!w.alphaToCoverage,map:$,matcap:Q,envMap:ue,envMapMode:ue&&z.mapping,envMapCubeUVHeight:B,aoMap:U,lightMap:Ne,bumpMap:Ue,normalMap:Oe,displacementMap:f&&Se,emissiveMap:Ee,normalMapObjectSpace:Oe&&w.normalMapType===Cp,normalMapTangentSpace:Oe&&w.normalMapType===yu,metalnessMap:me,roughnessMap:b,anisotropy:E,anisotropyMap:ie,clearcoat:Y,clearcoatMap:de,clearcoatNormalMap:Pe,clearcoatRoughnessMap:se,dispersion:ee,iridescence:re,iridescenceMap:fe,iridescenceThicknessMap:De,sheen:q,sheenColorMap:Fe,sheenRoughnessMap:Me,specularMap:Ye,specularColorMap:ke,specularIntensityMap:Qe,transmission:oe,transmissionMap:H,thicknessMap:ge,gradientMap:J,opaque:w.transparent===!1&&w.blending===Vi&&w.alphaToCoverage===!1,alphaMap:te,alphaTest:ye,alphaHash:_e,combine:w.combine,mapUv:$&&g(w.map.channel),aoMapUv:U&&g(w.aoMap.channel),lightMapUv:Ne&&g(w.lightMap.channel),bumpMapUv:Ue&&g(w.bumpMap.channel),normalMapUv:Oe&&g(w.normalMap.channel),displacementMapUv:Se&&g(w.displacementMap.channel),emissiveMapUv:Ee&&g(w.emissiveMap.channel),metalnessMapUv:me&&g(w.metalnessMap.channel),roughnessMapUv:b&&g(w.roughnessMap.channel),anisotropyMapUv:ie&&g(w.anisotropyMap.channel),clearcoatMapUv:de&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:De&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:Me&&g(w.sheenRoughnessMap.channel),specularMapUv:Ye&&g(w.specularMap.channel),specularColorMapUv:ke&&g(w.specularColorMap.channel),specularIntensityMapUv:Qe&&g(w.specularIntensityMap.channel),transmissionMapUv:H&&g(w.transmissionMap.channel),thicknessMapUv:ge&&g(w.thicknessMap.channel),alphaMapUv:te&&g(w.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Oe||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!N.attributes.uv&&($||te),fog:!!R,useFog:w.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Re,skinning:S.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ae,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&D.length>0,shadowMapType:n.shadowMap.type,toneMapping:lt,decodeVideoTexture:$&&w.map.isVideoTexture===!0&&je.getTransfer(w.map.colorSpace)===tt,decodeVideoTextureEmissive:Ee&&w.emissiveMap.isVideoTexture===!0&&je.getTransfer(w.emissiveMap.colorSpace)===tt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Mn,flipSided:w.side===bt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:He&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&w.extensions.multiDraw===!0||Ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return vt.vertexUv1s=l.has(1),vt.vertexUv2s=l.has(2),vt.vertexUv3s=l.has(3),l.clear(),vt}function d(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)M.push(D),M.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(_(M,w),y(M,w),M.push(n.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function _(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function y(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function x(w){const M=v[w.type];let D;if(M){const W=tn[M];D=rm.clone(W.uniforms)}else D=w.uniforms;return D}function P(w,M){let D;for(let W=0,S=h.length;W<S;W++){const R=h[W];if(R.cacheKey===M){D=R,++D.usedTimes;break}}return D===void 0&&(D=new _v(n,M,w,s),h.push(D)),D}function A(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function C(w){c.remove(w)}function L(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:x,acquireProgram:P,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:L}}function Sv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,c){n.get(o)[a]=c}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function Ev(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Yl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function $l(){const n=[];let e=0;const t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(u,f,m,v,g,p){let d=n[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:v,renderOrder:u.renderOrder,z:g,group:p},n[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=v,d.renderOrder=u.renderOrder,d.z=g,d.group=p),e++,d}function a(u,f,m,v,g,p){const d=o(u,f,m,v,g,p);m.transmission>0?i.push(d):m.transparent===!0?r.push(d):t.push(d)}function c(u,f,m,v,g,p){const d=o(u,f,m,v,g,p);m.transmission>0?i.unshift(d):m.transparent===!0?r.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||Ev),i.length>1&&i.sort(f||Yl),r.length>1&&r.sort(f||Yl)}function h(){for(let u=e,f=n.length;u<f;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:c,finish:h,sort:l}}function wv(){let n=new WeakMap;function e(i,r){const s=n.get(i);let o;return s===void 0?(o=new $l,n.set(i,[o])):r>=s.length?(o=new $l,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function Tv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new qe};break;case"SpotLight":t={position:new O,direction:new O,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function bv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Av=0;function Rv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Cv(n){const e=new Tv,t=bv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const r=new O,s=new ct,o=new ct;function a(l){let h=0,u=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let m=0,v=0,g=0,p=0,d=0,_=0,y=0,x=0,P=0,A=0,C=0;l.sort(Rv);for(let w=0,M=l.length;w<M;w++){const D=l[w],W=D.color,S=D.intensity,R=D.distance,N=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=W.r*S,u+=W.g*S,f+=W.b*S;else if(D.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(D.sh.coefficients[I],S);C++}else if(D.isDirectionalLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const z=D.shadow,B=t.get(D);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,i.directionalShadow[m]=B,i.directionalShadowMap[m]=N,i.directionalShadowMatrix[m]=D.shadow.matrix,_++}i.directional[m]=I,m++}else if(D.isSpotLight){const I=e.get(D);I.position.setFromMatrixPosition(D.matrixWorld),I.color.copy(W).multiplyScalar(S),I.distance=R,I.coneCos=Math.cos(D.angle),I.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),I.decay=D.decay,i.spot[g]=I;const z=D.shadow;if(D.map&&(i.spotLightMap[P]=D.map,P++,z.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[g]=z.matrix,D.castShadow){const B=t.get(D);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,i.spotShadow[g]=B,i.spotShadowMap[g]=N,x++}g++}else if(D.isRectAreaLight){const I=e.get(D);I.color.copy(W).multiplyScalar(S),I.halfWidth.set(D.width*.5,0,0),I.halfHeight.set(0,D.height*.5,0),i.rectArea[p]=I,p++}else if(D.isPointLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),I.distance=D.distance,I.decay=D.decay,D.castShadow){const z=D.shadow,B=t.get(D);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,B.shadowCameraNear=z.camera.near,B.shadowCameraFar=z.camera.far,i.pointShadow[v]=B,i.pointShadowMap[v]=N,i.pointShadowMatrix[v]=D.shadow.matrix,y++}i.point[v]=I,v++}else if(D.isHemisphereLight){const I=e.get(D);I.skyColor.copy(D.color).multiplyScalar(S),I.groundColor.copy(D.groundColor).multiplyScalar(S),i.hemi[d]=I,d++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const L=i.hash;(L.directionalLength!==m||L.pointLength!==v||L.spotLength!==g||L.rectAreaLength!==p||L.hemiLength!==d||L.numDirectionalShadows!==_||L.numPointShadows!==y||L.numSpotShadows!==x||L.numSpotMaps!==P||L.numLightProbes!==C)&&(i.directional.length=m,i.spot.length=g,i.rectArea.length=p,i.point.length=v,i.hemi.length=d,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=x+P-A,i.spotLightMap.length=P,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,L.directionalLength=m,L.pointLength=v,L.spotLength=g,L.rectAreaLength=p,L.hemiLength=d,L.numDirectionalShadows=_,L.numPointShadows=y,L.numSpotShadows=x,L.numSpotMaps=P,L.numLightProbes=C,i.version=Av++)}function c(l,h){let u=0,f=0,m=0,v=0,g=0;const p=h.matrixWorldInverse;for(let d=0,_=l.length;d<_;d++){const y=l[d];if(y.isDirectionalLight){const x=i.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(p),u++}else if(y.isSpotLight){const x=i.spot[m];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(p),m++}else if(y.isRectAreaLight){const x=i.rectArea[v];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),o.identity(),s.copy(y.matrixWorld),s.premultiply(p),o.extractRotation(s),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),v++}else if(y.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){const x=i.hemi[g];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(p),g++}}}return{setup:a,setupView:c,state:i}}function jl(n){const e=new Cv(n),t=[],i=[];function r(h){l.camera=h,t.length=0,i.length=0}function s(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:a,setupLightsView:c,pushLight:s,pushShadow:o}}function Pv(n){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new jl(n),e.set(r,[a])):s>=o.length?(a=new jl(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class Lv extends xi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Ap,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Dv extends xi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Iv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Uv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Nv(n,e,t){let i=new oc;const r=new ze,s=new ze,o=new rt,a=new Lv({depthPacking:Rp}),c=new Dv,l={},h=t.maxTextureSize,u={[Vt]:bt,[bt]:Vt,[Mn]:Mn},f=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:Iv,fragmentShader:Uv}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const v=new Et;v.setAttribute("position",new _t(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new it(v,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=su;let d=this.type;this.render=function(A,C,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;const w=n.getRenderTarget(),M=n.getActiveCubeFace(),D=n.getActiveMipmapLevel(),W=n.state;W.setBlending(Wn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const S=d!==vn&&this.type===vn,R=d===vn&&this.type!==vn;for(let N=0,I=A.length;N<I;N++){const z=A[N],B=z.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const F=B.getFrameExtents();if(r.multiply(F),s.copy(B.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/F.x),r.x=s.x*F.x,B.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/F.y),r.y=s.y*F.y,B.mapSize.y=s.y)),B.map===null||S===!0||R===!0){const Z=this.type!==vn?{minFilter:Qt,magFilter:Qt}:{};B.map!==null&&B.map.dispose(),B.map=new mi(r.x,r.y,Z),B.map.texture.name=z.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();const k=B.getViewportCount();for(let Z=0;Z<k;Z++){const ae=B.getViewport(Z);o.set(s.x*ae.x,s.y*ae.y,s.x*ae.z,s.y*ae.w),W.viewport(o),B.updateMatrices(z,Z),i=B.getFrustum(),x(C,L,B.camera,z,this.type)}B.isPointLightShadow!==!0&&this.type===vn&&_(B,L),B.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(w,M,D)};function _(A,C){const L=e.update(g);f.defines.VSM_SAMPLES!==A.blurSamples&&(f.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new mi(r.x,r.y)),f.uniforms.shadow_pass.value=A.map.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,n.setRenderTarget(A.mapPass),n.clear(),n.renderBufferDirect(C,null,L,f,g,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,n.setRenderTarget(A.map),n.clear(),n.renderBufferDirect(C,null,L,m,g,null)}function y(A,C,L,w){let M=null;const D=L.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(D!==void 0)M=D;else if(M=L.isPointLight===!0?c:a,n.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const W=M.uuid,S=C.uuid;let R=l[W];R===void 0&&(R={},l[W]=R);let N=R[S];N===void 0&&(N=M.clone(),R[S]=N,C.addEventListener("dispose",P)),M=N}if(M.visible=C.visible,M.wireframe=C.wireframe,w===vn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const W=n.properties.get(M);W.light=L}return M}function x(A,C,L,w,M){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===vn)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,A.matrixWorld);const S=e.update(A),R=A.material;if(Array.isArray(R)){const N=S.groups;for(let I=0,z=N.length;I<z;I++){const B=N[I],F=R[B.materialIndex];if(F&&F.visible){const k=y(A,F,w,M);A.onBeforeShadow(n,A,C,L,S,k,B),n.renderBufferDirect(L,null,S,k,A,B),A.onAfterShadow(n,A,C,L,S,k,B)}}}else if(R.visible){const N=y(A,R,w,M);A.onBeforeShadow(n,A,C,L,S,N,null),n.renderBufferDirect(L,null,S,N,A,null),A.onAfterShadow(n,A,C,L,S,N,null)}}const W=A.children;for(let S=0,R=W.length;S<R;S++)x(W[S],C,L,w,M)}function P(A){A.target.removeEventListener("dispose",P);for(const L in l){const w=l[L],M=A.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const Fv={[ia]:ra,[sa]:ca,[oa]:la,[Zi]:aa,[ra]:ia,[ca]:sa,[la]:oa,[aa]:Zi};function Ov(n,e){function t(){let H=!1;const ge=new rt;let J=null;const te=new rt(0,0,0,0);return{setMask:function(ye){J!==ye&&!H&&(n.colorMask(ye,ye,ye,ye),J=ye)},setLocked:function(ye){H=ye},setClear:function(ye,_e,He,lt,vt){vt===!0&&(ye*=lt,_e*=lt,He*=lt),ge.set(ye,_e,He,lt),te.equals(ge)===!1&&(n.clearColor(ye,_e,He,lt),te.copy(ge))},reset:function(){H=!1,J=null,te.set(-1,0,0,0)}}}function i(){let H=!1,ge=!1,J=null,te=null,ye=null;return{setReversed:function(_e){if(ge!==_e){const He=e.get("EXT_clip_control");ge?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT);const lt=ye;ye=null,this.setClear(lt)}ge=_e},getReversed:function(){return ge},setTest:function(_e){_e?ce(n.DEPTH_TEST):Re(n.DEPTH_TEST)},setMask:function(_e){J!==_e&&!H&&(n.depthMask(_e),J=_e)},setFunc:function(_e){if(ge&&(_e=Fv[_e]),te!==_e){switch(_e){case ia:n.depthFunc(n.NEVER);break;case ra:n.depthFunc(n.ALWAYS);break;case sa:n.depthFunc(n.LESS);break;case Zi:n.depthFunc(n.LEQUAL);break;case oa:n.depthFunc(n.EQUAL);break;case aa:n.depthFunc(n.GEQUAL);break;case ca:n.depthFunc(n.GREATER);break;case la:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}te=_e}},setLocked:function(_e){H=_e},setClear:function(_e){ye!==_e&&(ge&&(_e=1-_e),n.clearDepth(_e),ye=_e)},reset:function(){H=!1,J=null,te=null,ye=null,ge=!1}}}function r(){let H=!1,ge=null,J=null,te=null,ye=null,_e=null,He=null,lt=null,vt=null;return{setTest:function(et){H||(et?ce(n.STENCIL_TEST):Re(n.STENCIL_TEST))},setMask:function(et){ge!==et&&!H&&(n.stencilMask(et),ge=et)},setFunc:function(et,Xt,hn){(J!==et||te!==Xt||ye!==hn)&&(n.stencilFunc(et,Xt,hn),J=et,te=Xt,ye=hn)},setOp:function(et,Xt,hn){(_e!==et||He!==Xt||lt!==hn)&&(n.stencilOp(et,Xt,hn),_e=et,He=Xt,lt=hn)},setLocked:function(et){H=et},setClear:function(et){vt!==et&&(n.clearStencil(et),vt=et)},reset:function(){H=!1,ge=null,J=null,te=null,ye=null,_e=null,He=null,lt=null,vt=null}}}const s=new t,o=new i,a=new r,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,m=[],v=null,g=!1,p=null,d=null,_=null,y=null,x=null,P=null,A=null,C=new qe(0,0,0),L=0,w=!1,M=null,D=null,W=null,S=null,R=null;const N=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,z=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(B)[1]),I=z>=1):B.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),I=z>=2);let F=null,k={};const Z=n.getParameter(n.SCISSOR_BOX),ae=n.getParameter(n.VIEWPORT),xe=new rt().fromArray(Z),X=new rt().fromArray(ae);function ne(H,ge,J,te){const ye=new Uint8Array(4),_e=n.createTexture();n.bindTexture(H,_e),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let He=0;He<J;He++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,te,0,n.RGBA,n.UNSIGNED_BYTE,ye):n.texImage2D(ge+He,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ye);return _e}const he={};he[n.TEXTURE_2D]=ne(n.TEXTURE_2D,n.TEXTURE_2D,1),he[n.TEXTURE_CUBE_MAP]=ne(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[n.TEXTURE_2D_ARRAY]=ne(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),he[n.TEXTURE_3D]=ne(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(n.DEPTH_TEST),o.setFunc(Zi),Ue(!1),Oe(tl),ce(n.CULL_FACE),U(Wn);function ce(H){h[H]!==!0&&(n.enable(H),h[H]=!0)}function Re(H){h[H]!==!1&&(n.disable(H),h[H]=!1)}function Le(H,ge){return u[H]!==ge?(n.bindFramebuffer(H,ge),u[H]=ge,H===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ge),H===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ie(H,ge){let J=m,te=!1;if(H){J=f.get(ge),J===void 0&&(J=[],f.set(ge,J));const ye=H.textures;if(J.length!==ye.length||J[0]!==n.COLOR_ATTACHMENT0){for(let _e=0,He=ye.length;_e<He;_e++)J[_e]=n.COLOR_ATTACHMENT0+_e;J.length=ye.length,te=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,te=!0);te&&n.drawBuffers(J)}function $(H){return v!==H?(n.useProgram(H),v=H,!0):!1}const Q={[si]:n.FUNC_ADD,[tp]:n.FUNC_SUBTRACT,[np]:n.FUNC_REVERSE_SUBTRACT};Q[ip]=n.MIN,Q[rp]=n.MAX;const ue={[sp]:n.ZERO,[op]:n.ONE,[ap]:n.SRC_COLOR,[ta]:n.SRC_ALPHA,[fp]:n.SRC_ALPHA_SATURATE,[up]:n.DST_COLOR,[lp]:n.DST_ALPHA,[cp]:n.ONE_MINUS_SRC_COLOR,[na]:n.ONE_MINUS_SRC_ALPHA,[dp]:n.ONE_MINUS_DST_COLOR,[hp]:n.ONE_MINUS_DST_ALPHA,[pp]:n.CONSTANT_COLOR,[mp]:n.ONE_MINUS_CONSTANT_COLOR,[gp]:n.CONSTANT_ALPHA,[_p]:n.ONE_MINUS_CONSTANT_ALPHA};function U(H,ge,J,te,ye,_e,He,lt,vt,et){if(H===Wn){g===!0&&(Re(n.BLEND),g=!1);return}if(g===!1&&(ce(n.BLEND),g=!0),H!==ep){if(H!==p||et!==w){if((d!==si||x!==si)&&(n.blendEquation(n.FUNC_ADD),d=si,x=si),et)switch(H){case Vi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $n:n.blendFunc(n.ONE,n.ONE);break;case nl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case il:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}else switch(H){case Vi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case $n:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case nl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case il:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",H);break}_=null,y=null,P=null,A=null,C.set(0,0,0),L=0,p=H,w=et}return}ye=ye||ge,_e=_e||J,He=He||te,(ge!==d||ye!==x)&&(n.blendEquationSeparate(Q[ge],Q[ye]),d=ge,x=ye),(J!==_||te!==y||_e!==P||He!==A)&&(n.blendFuncSeparate(ue[J],ue[te],ue[_e],ue[He]),_=J,y=te,P=_e,A=He),(lt.equals(C)===!1||vt!==L)&&(n.blendColor(lt.r,lt.g,lt.b,vt),C.copy(lt),L=vt),p=H,w=!1}function Ne(H,ge){H.side===Mn?Re(n.CULL_FACE):ce(n.CULL_FACE);let J=H.side===bt;ge&&(J=!J),Ue(J),H.blending===Vi&&H.transparent===!1?U(Wn):U(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),o.setFunc(H.depthFunc),o.setTest(H.depthTest),o.setMask(H.depthWrite),s.setMask(H.colorWrite);const te=H.stencilWrite;a.setTest(te),te&&(a.setMask(H.stencilWriteMask),a.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),a.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Ee(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?ce(n.SAMPLE_ALPHA_TO_COVERAGE):Re(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(H){M!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),M=H)}function Oe(H){H!==Zf?(ce(n.CULL_FACE),H!==D&&(H===tl?n.cullFace(n.BACK):H===Jf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Re(n.CULL_FACE),D=H}function Se(H){H!==W&&(I&&n.lineWidth(H),W=H)}function Ee(H,ge,J){H?(ce(n.POLYGON_OFFSET_FILL),(S!==ge||R!==J)&&(n.polygonOffset(ge,J),S=ge,R=J)):Re(n.POLYGON_OFFSET_FILL)}function me(H){H?ce(n.SCISSOR_TEST):Re(n.SCISSOR_TEST)}function b(H){H===void 0&&(H=n.TEXTURE0+N-1),F!==H&&(n.activeTexture(H),F=H)}function E(H,ge,J){J===void 0&&(F===null?J=n.TEXTURE0+N-1:J=F);let te=k[J];te===void 0&&(te={type:void 0,texture:void 0},k[J]=te),(te.type!==H||te.texture!==ge)&&(F!==J&&(n.activeTexture(J),F=J),n.bindTexture(H,ge||he[H]),te.type=H,te.texture=ge)}function Y(){const H=k[F];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function ee(){try{n.compressedTexImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function re(){try{n.compressedTexImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function oe(){try{n.texSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function ie(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function de(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Pe(){try{n.texStorage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function se(){try{n.texStorage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function fe(){try{n.texImage2D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function De(){try{n.texImage3D.apply(n,arguments)}catch(H){console.error("THREE.WebGLState:",H)}}function Fe(H){xe.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),xe.copy(H))}function Me(H){X.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),X.copy(H))}function Ye(H,ge){let J=l.get(ge);J===void 0&&(J=new WeakMap,l.set(ge,J));let te=J.get(H);te===void 0&&(te=n.getUniformBlockIndex(ge,H.name),J.set(H,te))}function ke(H,ge){const te=l.get(ge).get(H);c.get(ge)!==te&&(n.uniformBlockBinding(ge,te,H.__bindingPointIndex),c.set(ge,te))}function Qe(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},F=null,k={},u={},f=new WeakMap,m=[],v=null,g=!1,p=null,d=null,_=null,y=null,x=null,P=null,A=null,C=new qe(0,0,0),L=0,w=!1,M=null,D=null,W=null,S=null,R=null,xe.set(0,0,n.canvas.width,n.canvas.height),X.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ce,disable:Re,bindFramebuffer:Le,drawBuffers:Ie,useProgram:$,setBlending:U,setMaterial:Ne,setFlipSided:Ue,setCullFace:Oe,setLineWidth:Se,setPolygonOffset:Ee,setScissorTest:me,activeTexture:b,bindTexture:E,unbindTexture:Y,compressedTexImage2D:ee,compressedTexImage3D:re,texImage2D:fe,texImage3D:De,updateUBOMapping:Ye,uniformBlockBinding:ke,texStorage2D:Pe,texStorage3D:se,texSubImage2D:q,texSubImage3D:oe,compressedTexSubImage2D:ie,compressedTexSubImage3D:de,scissor:Fe,viewport:Me,reset:Qe}}function Kl(n,e,t,i){const r=Bv(i);switch(t){case du:return n*e;case pu:return n*e;case mu:return n*e*2;case gu:return n*e/r.components*r.byteLength;case ic:return n*e/r.components*r.byteLength;case _u:return n*e*2/r.components*r.byteLength;case rc:return n*e*2/r.components*r.byteLength;case fu:return n*e*3/r.components*r.byteLength;case Zt:return n*e*4/r.components*r.byteLength;case sc:return n*e*4/r.components*r.byteLength;case Es:case ws:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ts:case bs:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case pa:case ga:return Math.max(n,16)*Math.max(e,8)/4;case fa:case ma:return Math.max(n,8)*Math.max(e,8)/2;case _a:case va:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case ya:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case xa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ma:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Sa:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Ea:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case wa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ta:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ba:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Aa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Ra:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Pa:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case La:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Da:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Ia:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case As:case Ua:case Na:return Math.ceil(n/4)*Math.ceil(e/4)*16;case vu:case Fa:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Oa:case Ba:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Bv(n){switch(n){case An:case lu:return{byteLength:1,components:1};case Ur:case hu:case Br:return{byteLength:2,components:1};case tc:case nc:return{byteLength:2,components:4};case pi:case ec:case En:return{byteLength:4,components:1};case uu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function kv(n,e,t,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(b,E){return m?new OffscreenCanvas(b,E):Ns("canvas")}function g(b,E,Y){let ee=1;const re=me(b);if((re.width>Y||re.height>Y)&&(ee=Y/Math.max(re.width,re.height)),ee<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const q=Math.floor(ee*re.width),oe=Math.floor(ee*re.height);u===void 0&&(u=v(q,oe));const ie=E?v(q,oe):u;return ie.width=q,ie.height=oe,ie.getContext("2d").drawImage(b,0,0,q,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+re.width+"x"+re.height+") to ("+q+"x"+oe+")."),ie}else return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+re.width+"x"+re.height+")."),b;return b}function p(b){return b.generateMipmaps}function d(b){n.generateMipmap(b)}function _(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(b,E,Y,ee,re=!1){if(b!==null){if(n[b]!==void 0)return n[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let q=E;if(E===n.RED&&(Y===n.FLOAT&&(q=n.R32F),Y===n.HALF_FLOAT&&(q=n.R16F),Y===n.UNSIGNED_BYTE&&(q=n.R8)),E===n.RED_INTEGER&&(Y===n.UNSIGNED_BYTE&&(q=n.R8UI),Y===n.UNSIGNED_SHORT&&(q=n.R16UI),Y===n.UNSIGNED_INT&&(q=n.R32UI),Y===n.BYTE&&(q=n.R8I),Y===n.SHORT&&(q=n.R16I),Y===n.INT&&(q=n.R32I)),E===n.RG&&(Y===n.FLOAT&&(q=n.RG32F),Y===n.HALF_FLOAT&&(q=n.RG16F),Y===n.UNSIGNED_BYTE&&(q=n.RG8)),E===n.RG_INTEGER&&(Y===n.UNSIGNED_BYTE&&(q=n.RG8UI),Y===n.UNSIGNED_SHORT&&(q=n.RG16UI),Y===n.UNSIGNED_INT&&(q=n.RG32UI),Y===n.BYTE&&(q=n.RG8I),Y===n.SHORT&&(q=n.RG16I),Y===n.INT&&(q=n.RG32I)),E===n.RGB_INTEGER&&(Y===n.UNSIGNED_BYTE&&(q=n.RGB8UI),Y===n.UNSIGNED_SHORT&&(q=n.RGB16UI),Y===n.UNSIGNED_INT&&(q=n.RGB32UI),Y===n.BYTE&&(q=n.RGB8I),Y===n.SHORT&&(q=n.RGB16I),Y===n.INT&&(q=n.RGB32I)),E===n.RGBA_INTEGER&&(Y===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),Y===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),Y===n.UNSIGNED_INT&&(q=n.RGBA32UI),Y===n.BYTE&&(q=n.RGBA8I),Y===n.SHORT&&(q=n.RGBA16I),Y===n.INT&&(q=n.RGBA32I)),E===n.RGB&&Y===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),E===n.RGBA){const oe=re?Ws:je.getTransfer(ee);Y===n.FLOAT&&(q=n.RGBA32F),Y===n.HALF_FLOAT&&(q=n.RGBA16F),Y===n.UNSIGNED_BYTE&&(q=oe===tt?n.SRGB8_ALPHA8:n.RGBA8),Y===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),Y===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(b,E){let Y;return b?E===null||E===pi||E===er?Y=n.DEPTH24_STENCIL8:E===En?Y=n.DEPTH32F_STENCIL8:E===Ur&&(Y=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===pi||E===er?Y=n.DEPTH_COMPONENT24:E===En?Y=n.DEPTH_COMPONENT32F:E===Ur&&(Y=n.DEPTH_COMPONENT16),Y}function P(b,E){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Qt&&b.minFilter!==sn?Math.log2(Math.max(E.width,E.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?E.mipmaps.length:1}function A(b){const E=b.target;E.removeEventListener("dispose",A),L(E),E.isVideoTexture&&h.delete(E)}function C(b){const E=b.target;E.removeEventListener("dispose",C),M(E)}function L(b){const E=i.get(b);if(E.__webglInit===void 0)return;const Y=b.source,ee=f.get(Y);if(ee){const re=ee[E.__cacheKey];re.usedTimes--,re.usedTimes===0&&w(b),Object.keys(ee).length===0&&f.delete(Y)}i.remove(b)}function w(b){const E=i.get(b);n.deleteTexture(E.__webglTexture);const Y=b.source,ee=f.get(Y);delete ee[E.__cacheKey],o.memory.textures--}function M(b){const E=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(E.__webglFramebuffer[ee]))for(let re=0;re<E.__webglFramebuffer[ee].length;re++)n.deleteFramebuffer(E.__webglFramebuffer[ee][re]);else n.deleteFramebuffer(E.__webglFramebuffer[ee]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[ee])}else{if(Array.isArray(E.__webglFramebuffer))for(let ee=0;ee<E.__webglFramebuffer.length;ee++)n.deleteFramebuffer(E.__webglFramebuffer[ee]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ee=0;ee<E.__webglColorRenderbuffer.length;ee++)E.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[ee]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const Y=b.textures;for(let ee=0,re=Y.length;ee<re;ee++){const q=i.get(Y[ee]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove(Y[ee])}i.remove(b)}let D=0;function W(){D=0}function S(){const b=D;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),D+=1,b}function R(b){const E=[];return E.push(b.wrapS),E.push(b.wrapT),E.push(b.wrapR||0),E.push(b.magFilter),E.push(b.minFilter),E.push(b.anisotropy),E.push(b.internalFormat),E.push(b.format),E.push(b.type),E.push(b.generateMipmaps),E.push(b.premultiplyAlpha),E.push(b.flipY),E.push(b.unpackAlignment),E.push(b.colorSpace),E.join()}function N(b,E){const Y=i.get(b);if(b.isVideoTexture&&Se(b),b.isRenderTargetTexture===!1&&b.version>0&&Y.__version!==b.version){const ee=b.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(Y,b,E);return}}t.bindTexture(n.TEXTURE_2D,Y.__webglTexture,n.TEXTURE0+E)}function I(b,E){const Y=i.get(b);if(b.version>0&&Y.__version!==b.version){X(Y,b,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,Y.__webglTexture,n.TEXTURE0+E)}function z(b,E){const Y=i.get(b);if(b.version>0&&Y.__version!==b.version){X(Y,b,E);return}t.bindTexture(n.TEXTURE_3D,Y.__webglTexture,n.TEXTURE0+E)}function B(b,E){const Y=i.get(b);if(b.version>0&&Y.__version!==b.version){ne(Y,b,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,Y.__webglTexture,n.TEXTURE0+E)}const F={[Ir]:n.REPEAT,[li]:n.CLAMP_TO_EDGE,[da]:n.MIRRORED_REPEAT},k={[Qt]:n.NEAREST,[bp]:n.NEAREST_MIPMAP_NEAREST,[Kr]:n.NEAREST_MIPMAP_LINEAR,[sn]:n.LINEAR,[co]:n.LINEAR_MIPMAP_NEAREST,[hi]:n.LINEAR_MIPMAP_LINEAR},Z={[Pp]:n.NEVER,[Fp]:n.ALWAYS,[Lp]:n.LESS,[xu]:n.LEQUAL,[Dp]:n.EQUAL,[Np]:n.GEQUAL,[Ip]:n.GREATER,[Up]:n.NOTEQUAL};function ae(b,E){if(E.type===En&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===sn||E.magFilter===co||E.magFilter===Kr||E.magFilter===hi||E.minFilter===sn||E.minFilter===co||E.minFilter===Kr||E.minFilter===hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,F[E.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,F[E.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,F[E.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,k[E.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,k[E.minFilter]),E.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Z[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Qt||E.minFilter!==Kr&&E.minFilter!==hi||E.type===En&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,r.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function xe(b,E){let Y=!1;b.__webglInit===void 0&&(b.__webglInit=!0,E.addEventListener("dispose",A));const ee=E.source;let re=f.get(ee);re===void 0&&(re={},f.set(ee,re));const q=R(E);if(q!==b.__cacheKey){re[q]===void 0&&(re[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),re[q].usedTimes++;const oe=re[b.__cacheKey];oe!==void 0&&(re[b.__cacheKey].usedTimes--,oe.usedTimes===0&&w(E)),b.__cacheKey=q,b.__webglTexture=re[q].texture}return Y}function X(b,E,Y){let ee=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ee=n.TEXTURE_3D);const re=xe(b,E),q=E.source;t.bindTexture(ee,b.__webglTexture,n.TEXTURE0+Y);const oe=i.get(q);if(q.version!==oe.__version||re===!0){t.activeTexture(n.TEXTURE0+Y);const ie=je.getPrimaries(je.workingColorSpace),de=E.colorSpace===zn?null:je.getPrimaries(E.colorSpace),Pe=E.colorSpace===zn||ie===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let se=g(E.image,!1,r.maxTextureSize);se=Ee(E,se);const fe=s.convert(E.format,E.colorSpace),De=s.convert(E.type);let Fe=y(E.internalFormat,fe,De,E.colorSpace,E.isVideoTexture);ae(ee,E);let Me;const Ye=E.mipmaps,ke=E.isVideoTexture!==!0,Qe=oe.__version===void 0||re===!0,H=q.dataReady,ge=P(E,se);if(E.isDepthTexture)Fe=x(E.format===tr,E.type),Qe&&(ke?t.texStorage2D(n.TEXTURE_2D,1,Fe,se.width,se.height):t.texImage2D(n.TEXTURE_2D,0,Fe,se.width,se.height,0,fe,De,null));else if(E.isDataTexture)if(Ye.length>0){ke&&Qe&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,Ye[0].width,Ye[0].height);for(let J=0,te=Ye.length;J<te;J++)Me=Ye[J],ke?H&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,Me.width,Me.height,fe,De,Me.data):t.texImage2D(n.TEXTURE_2D,J,Fe,Me.width,Me.height,0,fe,De,Me.data);E.generateMipmaps=!1}else ke?(Qe&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,se.width,se.height),H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,se.width,se.height,fe,De,se.data)):t.texImage2D(n.TEXTURE_2D,0,Fe,se.width,se.height,0,fe,De,se.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ke&&Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Fe,Ye[0].width,Ye[0].height,se.depth);for(let J=0,te=Ye.length;J<te;J++)if(Me=Ye[J],E.format!==Zt)if(fe!==null)if(ke){if(H)if(E.layerUpdates.size>0){const ye=Kl(Me.width,Me.height,E.format,E.type);for(const _e of E.layerUpdates){const He=Me.data.subarray(_e*ye/Me.data.BYTES_PER_ELEMENT,(_e+1)*ye/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,_e,Me.width,Me.height,1,fe,He)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Me.width,Me.height,se.depth,fe,Me.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,Fe,Me.width,Me.height,se.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ke?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,Me.width,Me.height,se.depth,fe,De,Me.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,Fe,Me.width,Me.height,se.depth,0,fe,De,Me.data)}else{ke&&Qe&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,Ye[0].width,Ye[0].height);for(let J=0,te=Ye.length;J<te;J++)Me=Ye[J],E.format!==Zt?fe!==null?ke?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,Me.width,Me.height,fe,Me.data):t.compressedTexImage2D(n.TEXTURE_2D,J,Fe,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ke?H&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,Me.width,Me.height,fe,De,Me.data):t.texImage2D(n.TEXTURE_2D,J,Fe,Me.width,Me.height,0,fe,De,Me.data)}else if(E.isDataArrayTexture)if(ke){if(Qe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Fe,se.width,se.height,se.depth),H)if(E.layerUpdates.size>0){const J=Kl(se.width,se.height,E.format,E.type);for(const te of E.layerUpdates){const ye=se.data.subarray(te*J/se.data.BYTES_PER_ELEMENT,(te+1)*J/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,te,se.width,se.height,1,fe,De,ye)}E.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,fe,De,se.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Fe,se.width,se.height,se.depth,0,fe,De,se.data);else if(E.isData3DTexture)ke?(Qe&&t.texStorage3D(n.TEXTURE_3D,ge,Fe,se.width,se.height,se.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,fe,De,se.data)):t.texImage3D(n.TEXTURE_3D,0,Fe,se.width,se.height,se.depth,0,fe,De,se.data);else if(E.isFramebufferTexture){if(Qe)if(ke)t.texStorage2D(n.TEXTURE_2D,ge,Fe,se.width,se.height);else{let J=se.width,te=se.height;for(let ye=0;ye<ge;ye++)t.texImage2D(n.TEXTURE_2D,ye,Fe,J,te,0,fe,De,null),J>>=1,te>>=1}}else if(Ye.length>0){if(ke&&Qe){const J=me(Ye[0]);t.texStorage2D(n.TEXTURE_2D,ge,Fe,J.width,J.height)}for(let J=0,te=Ye.length;J<te;J++)Me=Ye[J],ke?H&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,fe,De,Me):t.texImage2D(n.TEXTURE_2D,J,Fe,fe,De,Me);E.generateMipmaps=!1}else if(ke){if(Qe){const J=me(se);t.texStorage2D(n.TEXTURE_2D,ge,Fe,J.width,J.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,De,se)}else t.texImage2D(n.TEXTURE_2D,0,Fe,fe,De,se);p(E)&&d(ee),oe.__version=q.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function ne(b,E,Y){if(E.image.length!==6)return;const ee=xe(b,E),re=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+Y);const q=i.get(re);if(re.version!==q.__version||ee===!0){t.activeTexture(n.TEXTURE0+Y);const oe=je.getPrimaries(je.workingColorSpace),ie=E.colorSpace===zn?null:je.getPrimaries(E.colorSpace),de=E.colorSpace===zn||oe===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Pe=E.isCompressedTexture||E.image[0].isCompressedTexture,se=E.image[0]&&E.image[0].isDataTexture,fe=[];for(let te=0;te<6;te++)!Pe&&!se?fe[te]=g(E.image[te],!0,r.maxCubemapSize):fe[te]=se?E.image[te].image:E.image[te],fe[te]=Ee(E,fe[te]);const De=fe[0],Fe=s.convert(E.format,E.colorSpace),Me=s.convert(E.type),Ye=y(E.internalFormat,Fe,Me,E.colorSpace),ke=E.isVideoTexture!==!0,Qe=q.__version===void 0||ee===!0,H=re.dataReady;let ge=P(E,De);ae(n.TEXTURE_CUBE_MAP,E);let J;if(Pe){ke&&Qe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ye,De.width,De.height);for(let te=0;te<6;te++){J=fe[te].mipmaps;for(let ye=0;ye<J.length;ye++){const _e=J[ye];E.format!==Zt?Fe!==null?ke?H&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye,0,0,_e.width,_e.height,Fe,_e.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye,Ye,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ke?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye,0,0,_e.width,_e.height,Fe,Me,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye,Ye,_e.width,_e.height,0,Fe,Me,_e.data)}}}else{if(J=E.mipmaps,ke&&Qe){J.length>0&&ge++;const te=me(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,Ye,te.width,te.height)}for(let te=0;te<6;te++)if(se){ke?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,fe[te].width,fe[te].height,Fe,Me,fe[te].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ye,fe[te].width,fe[te].height,0,Fe,Me,fe[te].data);for(let ye=0;ye<J.length;ye++){const He=J[ye].image[te].image;ke?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye+1,0,0,He.width,He.height,Fe,Me,He.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye+1,Ye,He.width,He.height,0,Fe,Me,He.data)}}else{ke?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Fe,Me,fe[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Ye,Fe,Me,fe[te]);for(let ye=0;ye<J.length;ye++){const _e=J[ye];ke?H&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye+1,0,0,Fe,Me,_e.image[te]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+te,ye+1,Ye,Fe,Me,_e.image[te])}}}p(E)&&d(n.TEXTURE_CUBE_MAP),q.__version=re.version,E.onUpdate&&E.onUpdate(E)}b.__version=E.version}function he(b,E,Y,ee,re,q){const oe=s.convert(Y.format,Y.colorSpace),ie=s.convert(Y.type),de=y(Y.internalFormat,oe,ie,Y.colorSpace),Pe=i.get(E),se=i.get(Y);if(se.__renderTarget=E,!Pe.__hasExternalTextures){const fe=Math.max(1,E.width>>q),De=Math.max(1,E.height>>q);re===n.TEXTURE_3D||re===n.TEXTURE_2D_ARRAY?t.texImage3D(re,q,de,fe,De,E.depth,0,oe,ie,null):t.texImage2D(re,q,de,fe,De,0,oe,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Oe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,re,se.__webglTexture,0,Ue(E)):(re===n.TEXTURE_2D||re>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&re<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,re,se.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ce(b,E,Y){if(n.bindRenderbuffer(n.RENDERBUFFER,b),E.depthBuffer){const ee=E.depthTexture,re=ee&&ee.isDepthTexture?ee.type:null,q=x(E.stencilBuffer,re),oe=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=Ue(E);Oe(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,q,E.width,E.height):Y?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,q,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,q,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,b)}else{const ee=E.textures;for(let re=0;re<ee.length;re++){const q=ee[re],oe=s.convert(q.format,q.colorSpace),ie=s.convert(q.type),de=y(q.internalFormat,oe,ie,q.colorSpace),Pe=Ue(E);Y&&Oe(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,de,E.width,E.height):Oe(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pe,de,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,de,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Re(b,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=i.get(E.depthTexture);ee.__renderTarget=E,(!ee.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),N(E.depthTexture,0);const re=ee.__webglTexture,q=Ue(E);if(E.depthTexture.format===Gi)Oe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,re,0);else if(E.depthTexture.format===tr)Oe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,re,0);else throw new Error("Unknown depthTexture format")}function Le(b){const E=i.get(b),Y=b.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==b.depthTexture){const ee=b.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ee){const re=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ee.removeEventListener("dispose",re)};ee.addEventListener("dispose",re),E.__depthDisposeCallback=re}E.__boundDepthTexture=ee}if(b.depthTexture&&!E.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Re(E.__webglFramebuffer,b)}else if(Y){E.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[ee]),E.__webglDepthbuffer[ee]===void 0)E.__webglDepthbuffer[ee]=n.createRenderbuffer(),ce(E.__webglDepthbuffer[ee],b,!1);else{const re=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=E.__webglDepthbuffer[ee];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,re,n.RENDERBUFFER,q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),ce(E.__webglDepthbuffer,b,!1);else{const ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,re=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,re),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,re)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(b,E,Y){const ee=i.get(b);E!==void 0&&he(ee.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Y!==void 0&&Le(b)}function $(b){const E=b.texture,Y=i.get(b),ee=i.get(E);b.addEventListener("dispose",C);const re=b.textures,q=b.isWebGLCubeRenderTarget===!0,oe=re.length>1;if(oe||(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=E.version,o.memory.textures++),q){Y.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0){Y.__webglFramebuffer[ie]=[];for(let de=0;de<E.mipmaps.length;de++)Y.__webglFramebuffer[ie][de]=n.createFramebuffer()}else Y.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ie=0;ie<E.mipmaps.length;ie++)Y.__webglFramebuffer[ie]=n.createFramebuffer()}else Y.__webglFramebuffer=n.createFramebuffer();if(oe)for(let ie=0,de=re.length;ie<de;ie++){const Pe=i.get(re[ie]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(b.samples>0&&Oe(b)===!1){Y.__webglMultisampledFramebuffer=n.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ie=0;ie<re.length;ie++){const de=re[ie];Y.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Y.__webglColorRenderbuffer[ie]);const Pe=s.convert(de.format,de.colorSpace),se=s.convert(de.type),fe=y(de.internalFormat,Pe,se,de.colorSpace,b.isXRRenderTarget===!0),De=Ue(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,fe,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,Y.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(Y.__webglDepthRenderbuffer=n.createRenderbuffer(),ce(Y.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),ae(n.TEXTURE_CUBE_MAP,E);for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)he(Y.__webglFramebuffer[ie][de],b,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,de);else he(Y.__webglFramebuffer[ie],b,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(E)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let ie=0,de=re.length;ie<de;ie++){const Pe=re[ie],se=i.get(Pe);t.bindTexture(n.TEXTURE_2D,se.__webglTexture),ae(n.TEXTURE_2D,Pe),he(Y.__webglFramebuffer,b,Pe,n.COLOR_ATTACHMENT0+ie,n.TEXTURE_2D,0),p(Pe)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ie=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,ee.__webglTexture),ae(ie,E),E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)he(Y.__webglFramebuffer[de],b,E,n.COLOR_ATTACHMENT0,ie,de);else he(Y.__webglFramebuffer,b,E,n.COLOR_ATTACHMENT0,ie,0);p(E)&&d(ie),t.unbindTexture()}b.depthBuffer&&Le(b)}function Q(b){const E=b.textures;for(let Y=0,ee=E.length;Y<ee;Y++){const re=E[Y];if(p(re)){const q=_(b),oe=i.get(re).__webglTexture;t.bindTexture(q,oe),d(q),t.unbindTexture()}}}const ue=[],U=[];function Ne(b){if(b.samples>0){if(Oe(b)===!1){const E=b.textures,Y=b.width,ee=b.height;let re=n.COLOR_BUFFER_BIT;const q=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(b),ie=E.length>1;if(ie)for(let de=0;de<E.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let de=0;de<E.length;de++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(re|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(re|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[de]);const Pe=i.get(E[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pe,0)}n.blitFramebuffer(0,0,Y,ee,0,0,Y,ee,re,n.NEAREST),c===!0&&(ue.length=0,U.length=0,ue.push(n.COLOR_ATTACHMENT0+de),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ue.push(q),U.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let de=0;de<E.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,oe.__webglColorRenderbuffer[de]);const Pe=i.get(E[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const E=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function Ue(b){return Math.min(r.maxSamples,b.samples)}function Oe(b){const E=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Se(b){const E=o.render.frame;h.get(b)!==E&&(h.set(b,E),b.update())}function Ee(b,E){const Y=b.colorSpace,ee=b.format,re=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||Y!==ir&&Y!==zn&&(je.getTransfer(Y)===tt?(ee!==Zt||re!==An)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),E}function me(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=S,this.resetTextureUnits=W,this.setTexture2D=N,this.setTexture2DArray=I,this.setTexture3D=z,this.setTextureCube=B,this.rebindTextures=Ie,this.setupRenderTarget=$,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Oe}function zv(n,e){function t(i,r=zn){let s;const o=je.getTransfer(r);if(i===An)return n.UNSIGNED_BYTE;if(i===tc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===nc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===uu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===lu)return n.BYTE;if(i===hu)return n.SHORT;if(i===Ur)return n.UNSIGNED_SHORT;if(i===ec)return n.INT;if(i===pi)return n.UNSIGNED_INT;if(i===En)return n.FLOAT;if(i===Br)return n.HALF_FLOAT;if(i===du)return n.ALPHA;if(i===fu)return n.RGB;if(i===Zt)return n.RGBA;if(i===pu)return n.LUMINANCE;if(i===mu)return n.LUMINANCE_ALPHA;if(i===Gi)return n.DEPTH_COMPONENT;if(i===tr)return n.DEPTH_STENCIL;if(i===gu)return n.RED;if(i===ic)return n.RED_INTEGER;if(i===_u)return n.RG;if(i===rc)return n.RG_INTEGER;if(i===sc)return n.RGBA_INTEGER;if(i===Es||i===ws||i===Ts||i===bs)if(o===tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Es)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ws)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ts)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===bs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Es)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ws)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ts)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===bs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===fa||i===pa||i===ma||i===ga)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===fa)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===pa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ma)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ga)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_a||i===va||i===ya)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_a||i===va)return o===tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ya)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===xa||i===Ma||i===Sa||i===Ea||i===wa||i===Ta||i===ba||i===Aa||i===Ra||i===Ca||i===Pa||i===La||i===Da||i===Ia)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===xa)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ma)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Sa)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ea)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===wa)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ta)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ba)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Aa)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ra)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ca)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Pa)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===La)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Da)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ia)return o===tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===As||i===Ua||i===Na)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===As)return o===tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ua)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Na)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===vu||i===Fa||i===Oa||i===Ba)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===As)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Fa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Oa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ba)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===er?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Hv extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Vn extends ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Vv={type:"move"};class Bo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const g of e.hand.values()){const p=t.getJointPose(g,i),d=this._getHandJoint(l,g);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,v=.005;l.inputState.pinching&&f>m+v?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-v&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Vv)))}return a!==null&&(a.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new Vn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Gv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Wv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Xv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const r=new At,s=e.properties.get(r);s.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new jn({vertexShader:Gv,fragmentShader:Wv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new it(new Xs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qv extends rr{constructor(e,t){super();const i=this;let r=null,s=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,m=null,v=null;const g=new Xv,p=t.getContextAttributes();let d=null,_=null;const y=[],x=[],P=new ze;let A=null;const C=new Nt;C.viewport=new rt;const L=new Nt;L.viewport=new rt;const w=[C,L],M=new Hv;let D=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let ne=y[X];return ne===void 0&&(ne=new Bo,y[X]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(X){let ne=y[X];return ne===void 0&&(ne=new Bo,y[X]=ne),ne.getGripSpace()},this.getHand=function(X){let ne=y[X];return ne===void 0&&(ne=new Bo,y[X]=ne),ne.getHandSpace()};function S(X){const ne=x.indexOf(X.inputSource);if(ne===-1)return;const he=y[ne];he!==void 0&&(he.update(X.inputSource,X.frame,l||o),he.dispatchEvent({type:X.type,data:X.inputSource}))}function R(){r.removeEventListener("select",S),r.removeEventListener("selectstart",S),r.removeEventListener("selectend",S),r.removeEventListener("squeeze",S),r.removeEventListener("squeezestart",S),r.removeEventListener("squeezeend",S),r.removeEventListener("end",R),r.removeEventListener("inputsourceschange",N);for(let X=0;X<y.length;X++){const ne=x[X];ne!==null&&(x[X]=null,y[X].disconnect(ne))}D=null,W=null,g.reset(),e.setRenderTarget(d),m=null,f=null,u=null,r=null,_=null,xe.stop(),i.isPresenting=!1,e.setPixelRatio(A),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){s=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return v},this.getSession=function(){return r},this.setSession=async function(X){if(r=X,r!==null){if(d=e.getRenderTarget(),r.addEventListener("select",S),r.addEventListener("selectstart",S),r.addEventListener("selectend",S),r.addEventListener("squeeze",S),r.addEventListener("squeezestart",S),r.addEventListener("squeezeend",S),r.addEventListener("end",R),r.addEventListener("inputsourceschange",N),p.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0){const ne={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,t,ne),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new mi(m.framebufferWidth,m.framebufferHeight,{format:Zt,type:An,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let ne=null,he=null,ce=null;p.depth&&(ce=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ne=p.stencil?tr:Gi,he=p.stencil?er:pi);const Re={colorFormat:t.RGBA8,depthFormat:ce,scaleFactor:s};u=new XRWebGLBinding(r,t),f=u.createProjectionLayer(Re),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new mi(f.textureWidth,f.textureHeight,{format:Zt,type:An,depthTexture:new Uu(f.textureWidth,f.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,ne),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await r.requestReferenceSpace(a),xe.setContext(r),xe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function N(X){for(let ne=0;ne<X.removed.length;ne++){const he=X.removed[ne],ce=x.indexOf(he);ce>=0&&(x[ce]=null,y[ce].disconnect(he))}for(let ne=0;ne<X.added.length;ne++){const he=X.added[ne];let ce=x.indexOf(he);if(ce===-1){for(let Le=0;Le<y.length;Le++)if(Le>=x.length){x.push(he),ce=Le;break}else if(x[Le]===null){x[Le]=he,ce=Le;break}if(ce===-1)break}const Re=y[ce];Re&&Re.connect(he)}}const I=new O,z=new O;function B(X,ne,he){I.setFromMatrixPosition(ne.matrixWorld),z.setFromMatrixPosition(he.matrixWorld);const ce=I.distanceTo(z),Re=ne.projectionMatrix.elements,Le=he.projectionMatrix.elements,Ie=Re[14]/(Re[10]-1),$=Re[14]/(Re[10]+1),Q=(Re[9]+1)/Re[5],ue=(Re[9]-1)/Re[5],U=(Re[8]-1)/Re[0],Ne=(Le[8]+1)/Le[0],Ue=Ie*U,Oe=Ie*Ne,Se=ce/(-U+Ne),Ee=Se*-U;if(ne.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ee),X.translateZ(Se),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Re[10]===-1)X.projectionMatrix.copy(ne.projectionMatrix),X.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const me=Ie+Se,b=$+Se,E=Ue-Ee,Y=Oe+(ce-Ee),ee=Q*$/b*me,re=ue*$/b*me;X.projectionMatrix.makePerspective(E,Y,ee,re,me,b),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function F(X,ne){ne===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(ne.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(r===null)return;let ne=X.near,he=X.far;g.texture!==null&&(g.depthNear>0&&(ne=g.depthNear),g.depthFar>0&&(he=g.depthFar)),M.near=L.near=C.near=ne,M.far=L.far=C.far=he,(D!==M.near||W!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),D=M.near,W=M.far),C.layers.mask=X.layers.mask|2,L.layers.mask=X.layers.mask|4,M.layers.mask=C.layers.mask|L.layers.mask;const ce=X.parent,Re=M.cameras;F(M,ce);for(let Le=0;Le<Re.length;Le++)F(Re[Le],ce);Re.length===2?B(M,C,L):M.projectionMatrix.copy(C.projectionMatrix),k(X,M,ce)};function k(X,ne,he){he===null?X.matrix.copy(ne.matrixWorld):(X.matrix.copy(he.matrixWorld),X.matrix.invert(),X.matrix.multiply(ne.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(ne.projectionMatrix),X.projectionMatrixInverse.copy(ne.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=za*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let Z=null;function ae(X,ne){if(h=ne.getViewerPose(l||o),v=ne,h!==null){const he=h.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let ce=!1;he.length!==M.cameras.length&&(M.cameras.length=0,ce=!0);for(let Le=0;Le<he.length;Le++){const Ie=he[Le];let $=null;if(m!==null)$=m.getViewport(Ie);else{const ue=u.getViewSubImage(f,Ie);$=ue.viewport,Le===0&&(e.setRenderTargetTextures(_,ue.colorTexture,f.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(_))}let Q=w[Le];Q===void 0&&(Q=new Nt,Q.layers.enable(Le),Q.viewport=new rt,w[Le]=Q),Q.matrix.fromArray(Ie.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Ie.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set($.x,$.y,$.width,$.height),Le===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ce===!0&&M.cameras.push(Q)}const Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")){const Le=u.getDepthInformation(he[0]);Le&&Le.isValid&&Le.texture&&g.init(e,Le,r.renderState)}}for(let he=0;he<y.length;he++){const ce=x[he],Re=y[he];ce!==null&&Re!==void 0&&Re.update(ce,ne,l||o)}Z&&Z(X,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),v=null}const xe=new Du;xe.setAnimationLoop(ae),this.setAnimationLoop=function(X){Z=X},this.dispose=function(){}}}const ni=new Wt,Yv=new ct;function $v(n,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,Cu(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,_,y,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?s(p,d):d.isMeshToonMaterial?(s(p,d),u(p,d)):d.isMeshPhongMaterial?(s(p,d),h(p,d)):d.isMeshStandardMaterial?(s(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,x)):d.isMeshMatcapMaterial?(s(p,d),v(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),g(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?c(p,d,_,y):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===bt&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===bt&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const _=e.get(d),y=_.envMap,x=_.envMapRotation;y&&(p.envMap.value=y,ni.copy(x),ni.x*=-1,ni.y*=-1,ni.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),p.envMapRotation.value.setFromMatrix4(Yv.makeRotationFromEuler(ni)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,_,y){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*_,p.scale.value=y*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,_){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===bt&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function v(p,d){d.matcap&&(p.matcap.value=d.matcap)}function g(p,d){const _=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function jv(n,e,t,i){let r={},s={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,y){const x=y.program;i.uniformBlockBinding(_,x)}function l(_,y){let x=r[_.id];x===void 0&&(v(_),x=h(_),r[_.id]=x,_.addEventListener("dispose",p));const P=y.program;i.updateUBOMapping(_,P);const A=e.render.frame;s[_.id]!==A&&(f(_),s[_.id]=A)}function h(_){const y=u();_.__bindingPointIndex=y;const x=n.createBuffer(),P=_.__size,A=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,P,A),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,x),x}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const y=r[_.id],x=_.uniforms,P=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let A=0,C=x.length;A<C;A++){const L=Array.isArray(x[A])?x[A]:[x[A]];for(let w=0,M=L.length;w<M;w++){const D=L[w];if(m(D,A,w,P)===!0){const W=D.__offset,S=Array.isArray(D.value)?D.value:[D.value];let R=0;for(let N=0;N<S.length;N++){const I=S[N],z=g(I);typeof I=="number"||typeof I=="boolean"?(D.__data[0]=I,n.bufferSubData(n.UNIFORM_BUFFER,W+R,D.__data)):I.isMatrix3?(D.__data[0]=I.elements[0],D.__data[1]=I.elements[1],D.__data[2]=I.elements[2],D.__data[3]=0,D.__data[4]=I.elements[3],D.__data[5]=I.elements[4],D.__data[6]=I.elements[5],D.__data[7]=0,D.__data[8]=I.elements[6],D.__data[9]=I.elements[7],D.__data[10]=I.elements[8],D.__data[11]=0):(I.toArray(D.__data,R),R+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,D.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(_,y,x,P){const A=_.value,C=y+"_"+x;if(P[C]===void 0)return typeof A=="number"||typeof A=="boolean"?P[C]=A:P[C]=A.clone(),!0;{const L=P[C];if(typeof A=="number"||typeof A=="boolean"){if(L!==A)return P[C]=A,!0}else if(L.equals(A)===!1)return L.copy(A),!0}return!1}function v(_){const y=_.uniforms;let x=0;const P=16;for(let C=0,L=y.length;C<L;C++){const w=Array.isArray(y[C])?y[C]:[y[C]];for(let M=0,D=w.length;M<D;M++){const W=w[M],S=Array.isArray(W.value)?W.value:[W.value];for(let R=0,N=S.length;R<N;R++){const I=S[R],z=g(I),B=x%P,F=B%z.boundary,k=B+F;x+=F,k!==0&&P-k<z.storage&&(x+=P-k),W.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=x,x+=z.storage}}}const A=x%P;return A>0&&(x+=P-A),_.__size=x,_.__cache={},this}function g(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function p(_){const y=_.target;y.removeEventListener("dispose",p);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function d(){for(const _ in r)n.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:c,update:l,dispose:d}}class Kv{constructor(e={}){const{canvas:t=Bp(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const v=new Uint32Array(4),g=new Int32Array(4);let p=null,d=null;const _=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=kt,this.toneMapping=Xn,this.toneMappingExposure=1;const x=this;let P=!1,A=0,C=0,L=null,w=-1,M=null;const D=new rt,W=new rt;let S=null;const R=new qe(0);let N=0,I=t.width,z=t.height,B=1,F=null,k=null;const Z=new rt(0,0,I,z),ae=new rt(0,0,I,z);let xe=!1;const X=new oc;let ne=!1,he=!1;const ce=new ct,Re=new ct,Le=new O,Ie=new rt,$={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function ue(){return L===null?B:1}let U=i;function Ne(T,V){return t.getContext(T,V)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Qa}`),t.addEventListener("webglcontextlost",te,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",_e,!1),U===null){const V="webgl2";if(U=Ne(V,T),U===null)throw Ne(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ue,Oe,Se,Ee,me,b,E,Y,ee,re,q,oe,ie,de,Pe,se,fe,De,Fe,Me,Ye,ke,Qe,H;function ge(){Ue=new t_(U),Ue.init(),ke=new zv(U,Ue),Oe=new j0(U,Ue,e,ke),Se=new Ov(U,Ue),Oe.reverseDepthBuffer&&f&&Se.buffers.depth.setReversed(!0),Ee=new r_(U),me=new Sv,b=new kv(U,Ue,Se,me,Oe,ke,Ee),E=new Z0(x),Y=new e_(x),ee=new um(U),Qe=new Y0(U,ee),re=new n_(U,ee,Ee,Qe),q=new o_(U,re,ee,Ee),Fe=new s_(U,Oe,b),se=new K0(me),oe=new Mv(x,E,Y,Ue,Oe,Qe,se),ie=new $v(x,me),de=new wv,Pe=new Pv(Ue),De=new q0(x,E,Y,Se,q,m,c),fe=new Nv(x,q,Oe),H=new jv(U,Ee,Oe,Se),Me=new $0(U,Ue,Ee),Ye=new i_(U,Ue,Ee),Ee.programs=oe.programs,x.capabilities=Oe,x.extensions=Ue,x.properties=me,x.renderLists=de,x.shadowMap=fe,x.state=Se,x.info=Ee}ge();const J=new qv(x,U);this.xr=J,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=Ue.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ue.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(T){T!==void 0&&(B=T,this.setSize(I,z,!1))},this.getSize=function(T){return T.set(I,z)},this.setSize=function(T,V,j=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=T,z=V,t.width=Math.floor(T*B),t.height=Math.floor(V*B),j===!0&&(t.style.width=T+"px",t.style.height=V+"px"),this.setViewport(0,0,T,V)},this.getDrawingBufferSize=function(T){return T.set(I*B,z*B).floor()},this.setDrawingBufferSize=function(T,V,j){I=T,z=V,B=j,t.width=Math.floor(T*j),t.height=Math.floor(V*j),this.setViewport(0,0,T,V)},this.getCurrentViewport=function(T){return T.copy(D)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,V,j,K){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,V,j,K),Se.viewport(D.copy(Z).multiplyScalar(B).round())},this.getScissor=function(T){return T.copy(ae)},this.setScissor=function(T,V,j,K){T.isVector4?ae.set(T.x,T.y,T.z,T.w):ae.set(T,V,j,K),Se.scissor(W.copy(ae).multiplyScalar(B).round())},this.getScissorTest=function(){return xe},this.setScissorTest=function(T){Se.setScissorTest(xe=T)},this.setOpaqueSort=function(T){F=T},this.setTransparentSort=function(T){k=T},this.getClearColor=function(T){return T.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(T=!0,V=!0,j=!0){let K=0;if(T){let G=!1;if(L!==null){const le=L.texture.format;G=le===sc||le===rc||le===ic}if(G){const le=L.texture.type,ve=le===An||le===pi||le===Ur||le===er||le===tc||le===nc,we=De.getClearColor(),Te=De.getClearAlpha(),Be=we.r,Ve=we.g,be=we.b;ve?(v[0]=Be,v[1]=Ve,v[2]=be,v[3]=Te,U.clearBufferuiv(U.COLOR,0,v)):(g[0]=Be,g[1]=Ve,g[2]=be,g[3]=Te,U.clearBufferiv(U.COLOR,0,g))}else K|=U.COLOR_BUFFER_BIT}V&&(K|=U.DEPTH_BUFFER_BIT),j&&(K|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",te,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),de.dispose(),Pe.dispose(),me.dispose(),E.dispose(),Y.dispose(),q.dispose(),Qe.dispose(),H.dispose(),oe.dispose(),J.dispose(),J.removeEventListener("sessionstart",fc),J.removeEventListener("sessionend",pc),Kn.stop()};function te(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),P=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),P=!1;const T=Ee.autoReset,V=fe.enabled,j=fe.autoUpdate,K=fe.needsUpdate,G=fe.type;ge(),Ee.autoReset=T,fe.enabled=V,fe.autoUpdate=j,fe.needsUpdate=K,fe.type=G}function _e(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function He(T){const V=T.target;V.removeEventListener("dispose",He),lt(V)}function lt(T){vt(T),me.remove(T)}function vt(T){const V=me.get(T).programs;V!==void 0&&(V.forEach(function(j){oe.releaseProgram(j)}),T.isShaderMaterial&&oe.releaseShaderCache(T))}this.renderBufferDirect=function(T,V,j,K,G,le){V===null&&(V=$);const ve=G.isMesh&&G.matrixWorld.determinant()<0,we=Vu(T,V,j,K,G);Se.setMaterial(K,ve);let Te=j.index,Be=1;if(K.wireframe===!0){if(Te=re.getWireframeAttribute(j),Te===void 0)return;Be=2}const Ve=j.drawRange,be=j.attributes.position;let Ke=Ve.start*Be,st=(Ve.start+Ve.count)*Be;le!==null&&(Ke=Math.max(Ke,le.start*Be),st=Math.min(st,(le.start+le.count)*Be)),Te!==null?(Ke=Math.max(Ke,0),st=Math.min(st,Te.count)):be!=null&&(Ke=Math.max(Ke,0),st=Math.min(st,be.count));const ot=st-Ke;if(ot<0||ot===1/0)return;Qe.setup(G,K,we,j,Te);let Ct,Ze=Me;if(Te!==null&&(Ct=ee.get(Te),Ze=Ye,Ze.setIndex(Ct)),G.isMesh)K.wireframe===!0?(Se.setLineWidth(K.wireframeLinewidth*ue()),Ze.setMode(U.LINES)):Ze.setMode(U.TRIANGLES);else if(G.isLine){let Ce=K.linewidth;Ce===void 0&&(Ce=1),Se.setLineWidth(Ce*ue()),G.isLineSegments?Ze.setMode(U.LINES):G.isLineLoop?Ze.setMode(U.LINE_LOOP):Ze.setMode(U.LINE_STRIP)}else G.isPoints?Ze.setMode(U.POINTS):G.isSprite&&Ze.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Ze.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))Ze.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ce=G._multiDrawStarts,un=G._multiDrawCounts,Je=G._multiDrawCount,qt=Te?ee.get(Te).bytesPerElement:1,Mi=me.get(K).currentProgram.getUniforms();for(let Lt=0;Lt<Je;Lt++)Mi.setValue(U,"_gl_DrawID",Lt),Ze.render(Ce[Lt]/qt,un[Lt])}else if(G.isInstancedMesh)Ze.renderInstances(Ke,ot,G.count);else if(j.isInstancedBufferGeometry){const Ce=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,un=Math.min(j.instanceCount,Ce);Ze.renderInstances(Ke,ot,un)}else Ze.render(Ke,ot)};function et(T,V,j){T.transparent===!0&&T.side===Mn&&T.forceSinglePass===!1?(T.side=bt,T.needsUpdate=!0,Gr(T,V,j),T.side=Vt,T.needsUpdate=!0,Gr(T,V,j),T.side=Mn):Gr(T,V,j)}this.compile=function(T,V,j=null){j===null&&(j=T),d=Pe.get(j),d.init(V),y.push(d),j.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),T!==j&&T.traverseVisible(function(G){G.isLight&&G.layers.test(V.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const K=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const le=G.material;if(le)if(Array.isArray(le))for(let ve=0;ve<le.length;ve++){const we=le[ve];et(we,j,G),K.add(we)}else et(le,j,G),K.add(le)}),y.pop(),d=null,K},this.compileAsync=function(T,V,j=null){const K=this.compile(T,V,j);return new Promise(G=>{function le(){if(K.forEach(function(ve){me.get(ve).currentProgram.isReady()&&K.delete(ve)}),K.size===0){G(T);return}setTimeout(le,10)}Ue.get("KHR_parallel_shader_compile")!==null?le():setTimeout(le,10)})};let Xt=null;function hn(T){Xt&&Xt(T)}function fc(){Kn.stop()}function pc(){Kn.start()}const Kn=new Du;Kn.setAnimationLoop(hn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(T){Xt=T,J.setAnimationLoop(T),T===null?Kn.stop():Kn.start()},J.addEventListener("sessionstart",fc),J.addEventListener("sessionend",pc),this.render=function(T,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(V),V=J.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,V,L),d=Pe.get(T,y.length),d.init(V),y.push(d),Re.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),X.setFromProjectionMatrix(Re),he=this.localClippingEnabled,ne=se.init(this.clippingPlanes,he),p=de.get(T,_.length),p.init(),_.push(p),J.enabled===!0&&J.isPresenting===!0){const le=x.xr.getDepthSensingMesh();le!==null&&js(le,V,-1/0,x.sortObjects)}js(T,V,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(F,k),Q=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Q&&De.addToRenderList(p,T),this.info.render.frame++,ne===!0&&se.beginShadows();const j=d.state.shadowsArray;fe.render(j,T,V),ne===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=p.opaque,G=p.transmissive;if(d.setupLights(),V.isArrayCamera){const le=V.cameras;if(G.length>0)for(let ve=0,we=le.length;ve<we;ve++){const Te=le[ve];gc(K,G,T,Te)}Q&&De.render(T);for(let ve=0,we=le.length;ve<we;ve++){const Te=le[ve];mc(p,T,Te,Te.viewport)}}else G.length>0&&gc(K,G,T,V),Q&&De.render(T),mc(p,T,V);L!==null&&(b.updateMultisampleRenderTarget(L),b.updateRenderTargetMipmap(L)),T.isScene===!0&&T.onAfterRender(x,T,V),Qe.resetDefaultState(),w=-1,M=null,y.pop(),y.length>0?(d=y[y.length-1],ne===!0&&se.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?p=_[_.length-1]:p=null};function js(T,V,j,K){if(T.visible===!1)return;if(T.layers.test(V.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(V);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||X.intersectsSprite(T)){K&&Ie.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Re);const ve=q.update(T),we=T.material;we.visible&&p.push(T,ve,we,j,Ie.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||X.intersectsObject(T))){const ve=q.update(T),we=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ie.copy(T.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ie.copy(ve.boundingSphere.center)),Ie.applyMatrix4(T.matrixWorld).applyMatrix4(Re)),Array.isArray(we)){const Te=ve.groups;for(let Be=0,Ve=Te.length;Be<Ve;Be++){const be=Te[Be],Ke=we[be.materialIndex];Ke&&Ke.visible&&p.push(T,ve,Ke,j,Ie.z,be)}}else we.visible&&p.push(T,ve,we,j,Ie.z,null)}}const le=T.children;for(let ve=0,we=le.length;ve<we;ve++)js(le[ve],V,j,K)}function mc(T,V,j,K){const G=T.opaque,le=T.transmissive,ve=T.transparent;d.setupLightsView(j),ne===!0&&se.setGlobalState(x.clippingPlanes,j),K&&Se.viewport(D.copy(K)),G.length>0&&Vr(G,V,j),le.length>0&&Vr(le,V,j),ve.length>0&&Vr(ve,V,j),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function gc(T,V,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[K.id]===void 0&&(d.state.transmissionRenderTarget[K.id]=new mi(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?Br:An,minFilter:hi,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const le=d.state.transmissionRenderTarget[K.id],ve=K.viewport||D;le.setSize(ve.z,ve.w);const we=x.getRenderTarget();x.setRenderTarget(le),x.getClearColor(R),N=x.getClearAlpha(),N<1&&x.setClearColor(16777215,.5),x.clear(),Q&&De.render(j);const Te=x.toneMapping;x.toneMapping=Xn;const Be=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),d.setupLightsView(K),ne===!0&&se.setGlobalState(x.clippingPlanes,K),Vr(T,j,K),b.updateMultisampleRenderTarget(le),b.updateRenderTargetMipmap(le),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Ve=!1;for(let be=0,Ke=V.length;be<Ke;be++){const st=V[be],ot=st.object,Ct=st.geometry,Ze=st.material,Ce=st.group;if(Ze.side===Mn&&ot.layers.test(K.layers)){const un=Ze.side;Ze.side=bt,Ze.needsUpdate=!0,_c(ot,j,K,Ct,Ze,Ce),Ze.side=un,Ze.needsUpdate=!0,Ve=!0}}Ve===!0&&(b.updateMultisampleRenderTarget(le),b.updateRenderTargetMipmap(le))}x.setRenderTarget(we),x.setClearColor(R,N),Be!==void 0&&(K.viewport=Be),x.toneMapping=Te}function Vr(T,V,j){const K=V.isScene===!0?V.overrideMaterial:null;for(let G=0,le=T.length;G<le;G++){const ve=T[G],we=ve.object,Te=ve.geometry,Be=K===null?ve.material:K,Ve=ve.group;we.layers.test(j.layers)&&_c(we,V,j,Te,Be,Ve)}}function _c(T,V,j,K,G,le){T.onBeforeRender(x,V,j,K,G,le),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(x,V,j,K,T,le),G.transparent===!0&&G.side===Mn&&G.forceSinglePass===!1?(G.side=bt,G.needsUpdate=!0,x.renderBufferDirect(j,V,K,G,T,le),G.side=Vt,G.needsUpdate=!0,x.renderBufferDirect(j,V,K,G,T,le),G.side=Mn):x.renderBufferDirect(j,V,K,G,T,le),T.onAfterRender(x,V,j,K,G,le)}function Gr(T,V,j){V.isScene!==!0&&(V=$);const K=me.get(T),G=d.state.lights,le=d.state.shadowsArray,ve=G.state.version,we=oe.getParameters(T,G.state,le,V,j),Te=oe.getProgramCacheKey(we);let Be=K.programs;K.environment=T.isMeshStandardMaterial?V.environment:null,K.fog=V.fog,K.envMap=(T.isMeshStandardMaterial?Y:E).get(T.envMap||K.environment),K.envMapRotation=K.environment!==null&&T.envMap===null?V.environmentRotation:T.envMapRotation,Be===void 0&&(T.addEventListener("dispose",He),Be=new Map,K.programs=Be);let Ve=Be.get(Te);if(Ve!==void 0){if(K.currentProgram===Ve&&K.lightsStateVersion===ve)return yc(T,we),Ve}else we.uniforms=oe.getUniforms(T),T.onBeforeCompile(we,x),Ve=oe.acquireProgram(we,Te),Be.set(Te,Ve),K.uniforms=we.uniforms;const be=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(be.clippingPlanes=se.uniform),yc(T,we),K.needsLights=Wu(T),K.lightsStateVersion=ve,K.needsLights&&(be.ambientLightColor.value=G.state.ambient,be.lightProbe.value=G.state.probe,be.directionalLights.value=G.state.directional,be.directionalLightShadows.value=G.state.directionalShadow,be.spotLights.value=G.state.spot,be.spotLightShadows.value=G.state.spotShadow,be.rectAreaLights.value=G.state.rectArea,be.ltc_1.value=G.state.rectAreaLTC1,be.ltc_2.value=G.state.rectAreaLTC2,be.pointLights.value=G.state.point,be.pointLightShadows.value=G.state.pointShadow,be.hemisphereLights.value=G.state.hemi,be.directionalShadowMap.value=G.state.directionalShadowMap,be.directionalShadowMatrix.value=G.state.directionalShadowMatrix,be.spotShadowMap.value=G.state.spotShadowMap,be.spotLightMatrix.value=G.state.spotLightMatrix,be.spotLightMap.value=G.state.spotLightMap,be.pointShadowMap.value=G.state.pointShadowMap,be.pointShadowMatrix.value=G.state.pointShadowMatrix),K.currentProgram=Ve,K.uniformsList=null,Ve}function vc(T){if(T.uniformsList===null){const V=T.currentProgram.getUniforms();T.uniformsList=Rs.seqWithValue(V.seq,T.uniforms)}return T.uniformsList}function yc(T,V){const j=me.get(T);j.outputColorSpace=V.outputColorSpace,j.batching=V.batching,j.batchingColor=V.batchingColor,j.instancing=V.instancing,j.instancingColor=V.instancingColor,j.instancingMorph=V.instancingMorph,j.skinning=V.skinning,j.morphTargets=V.morphTargets,j.morphNormals=V.morphNormals,j.morphColors=V.morphColors,j.morphTargetsCount=V.morphTargetsCount,j.numClippingPlanes=V.numClippingPlanes,j.numIntersection=V.numClipIntersection,j.vertexAlphas=V.vertexAlphas,j.vertexTangents=V.vertexTangents,j.toneMapping=V.toneMapping}function Vu(T,V,j,K,G){V.isScene!==!0&&(V=$),b.resetTextureUnits();const le=V.fog,ve=K.isMeshStandardMaterial?V.environment:null,we=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ir,Te=(K.isMeshStandardMaterial?Y:E).get(K.envMap||ve),Be=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ve=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),be=!!j.morphAttributes.position,Ke=!!j.morphAttributes.normal,st=!!j.morphAttributes.color;let ot=Xn;K.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ot=x.toneMapping);const Ct=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ze=Ct!==void 0?Ct.length:0,Ce=me.get(K),un=d.state.lights;if(ne===!0&&(he===!0||T!==M)){const Ot=T===M&&K.id===w;se.setState(K,T,Ot)}let Je=!1;K.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==un.state.version||Ce.outputColorSpace!==we||G.isBatchedMesh&&Ce.batching===!1||!G.isBatchedMesh&&Ce.batching===!0||G.isBatchedMesh&&Ce.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ce.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ce.instancing===!1||!G.isInstancedMesh&&Ce.instancing===!0||G.isSkinnedMesh&&Ce.skinning===!1||!G.isSkinnedMesh&&Ce.skinning===!0||G.isInstancedMesh&&Ce.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ce.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ce.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ce.instancingMorph===!1&&G.morphTexture!==null||Ce.envMap!==Te||K.fog===!0&&Ce.fog!==le||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==se.numPlanes||Ce.numIntersection!==se.numIntersection)||Ce.vertexAlphas!==Be||Ce.vertexTangents!==Ve||Ce.morphTargets!==be||Ce.morphNormals!==Ke||Ce.morphColors!==st||Ce.toneMapping!==ot||Ce.morphTargetsCount!==Ze)&&(Je=!0):(Je=!0,Ce.__version=K.version);let qt=Ce.currentProgram;Je===!0&&(qt=Gr(K,V,G));let Mi=!1,Lt=!1,or=!1;const at=qt.getUniforms(),en=Ce.uniforms;if(Se.useProgram(qt.program)&&(Mi=!0,Lt=!0,or=!0),K.id!==w&&(w=K.id,Lt=!0),Mi||M!==T){Se.buffers.depth.getReversed()?(ce.copy(T.projectionMatrix),zp(ce),Hp(ce),at.setValue(U,"projectionMatrix",ce)):at.setValue(U,"projectionMatrix",T.projectionMatrix),at.setValue(U,"viewMatrix",T.matrixWorldInverse);const Rn=at.map.cameraPosition;Rn!==void 0&&Rn.setValue(U,Le.setFromMatrixPosition(T.matrixWorld)),Oe.logarithmicDepthBuffer&&at.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&at.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Lt=!0,or=!0)}if(G.isSkinnedMesh){at.setOptional(U,G,"bindMatrix"),at.setOptional(U,G,"bindMatrixInverse");const Ot=G.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),at.setValue(U,"boneTexture",Ot.boneTexture,b))}G.isBatchedMesh&&(at.setOptional(U,G,"batchingTexture"),at.setValue(U,"batchingTexture",G._matricesTexture,b),at.setOptional(U,G,"batchingIdTexture"),at.setValue(U,"batchingIdTexture",G._indirectTexture,b),at.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&at.setValue(U,"batchingColorTexture",G._colorsTexture,b));const ar=j.morphAttributes;if((ar.position!==void 0||ar.normal!==void 0||ar.color!==void 0)&&Fe.update(G,j,qt),(Lt||Ce.receiveShadow!==G.receiveShadow)&&(Ce.receiveShadow=G.receiveShadow,at.setValue(U,"receiveShadow",G.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(en.envMap.value=Te,en.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&V.environment!==null&&(en.envMapIntensity.value=V.environmentIntensity),Lt&&(at.setValue(U,"toneMappingExposure",x.toneMappingExposure),Ce.needsLights&&Gu(en,or),le&&K.fog===!0&&ie.refreshFogUniforms(en,le),ie.refreshMaterialUniforms(en,K,B,z,d.state.transmissionRenderTarget[T.id]),Rs.upload(U,vc(Ce),en,b)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Rs.upload(U,vc(Ce),en,b),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&at.setValue(U,"center",G.center),at.setValue(U,"modelViewMatrix",G.modelViewMatrix),at.setValue(U,"normalMatrix",G.normalMatrix),at.setValue(U,"modelMatrix",G.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const Ot=K.uniformsGroups;for(let Rn=0,Cn=Ot.length;Rn<Cn;Rn++){const xc=Ot[Rn];H.update(xc,qt),H.bind(xc,qt)}}return qt}function Gu(T,V){T.ambientLightColor.needsUpdate=V,T.lightProbe.needsUpdate=V,T.directionalLights.needsUpdate=V,T.directionalLightShadows.needsUpdate=V,T.pointLights.needsUpdate=V,T.pointLightShadows.needsUpdate=V,T.spotLights.needsUpdate=V,T.spotLightShadows.needsUpdate=V,T.rectAreaLights.needsUpdate=V,T.hemisphereLights.needsUpdate=V}function Wu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return A},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(T,V,j){me.get(T.texture).__webglTexture=V,me.get(T.depthTexture).__webglTexture=j;const K=me.get(T);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=j===void 0,K.__autoAllocateDepthBuffer||Ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,V){const j=me.get(T);j.__webglFramebuffer=V,j.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(T,V=0,j=0){L=T,A=V,C=j;let K=!0,G=null,le=!1,ve=!1;if(T){const Te=me.get(T);if(Te.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(U.FRAMEBUFFER,null),K=!1;else if(Te.__webglFramebuffer===void 0)b.setupRenderTarget(T);else if(Te.__hasExternalTextures)b.rebindTextures(T,me.get(T.texture).__webglTexture,me.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const be=T.depthTexture;if(Te.__boundDepthTexture!==be){if(be!==null&&me.has(be)&&(T.width!==be.image.width||T.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");b.setupDepthRenderbuffer(T)}}const Be=T.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ve=!0);const Ve=me.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ve[V])?G=Ve[V][j]:G=Ve[V],le=!0):T.samples>0&&b.useMultisampledRTT(T)===!1?G=me.get(T).__webglMultisampledFramebuffer:Array.isArray(Ve)?G=Ve[j]:G=Ve,D.copy(T.viewport),W.copy(T.scissor),S=T.scissorTest}else D.copy(Z).multiplyScalar(B).floor(),W.copy(ae).multiplyScalar(B).floor(),S=xe;if(Se.bindFramebuffer(U.FRAMEBUFFER,G)&&K&&Se.drawBuffers(T,G),Se.viewport(D),Se.scissor(W),Se.setScissorTest(S),le){const Te=me.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+V,Te.__webglTexture,j)}else if(ve){const Te=me.get(T.texture),Be=V||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Te.__webglTexture,j||0,Be)}w=-1},this.readRenderTargetPixels=function(T,V,j,K,G,le,ve){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){Se.bindFramebuffer(U.FRAMEBUFFER,we);try{const Te=T.texture,Be=Te.format,Ve=Te.type;if(!Oe.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(Ve)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=T.width-K&&j>=0&&j<=T.height-G&&U.readPixels(V,j,K,G,ke.convert(Be),ke.convert(Ve),le)}finally{const Te=L!==null?me.get(L).__webglFramebuffer:null;Se.bindFramebuffer(U.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(T,V,j,K,G,le,ve){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){const Te=T.texture,Be=Te.format,Ve=Te.type;if(!Oe.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(V>=0&&V<=T.width-K&&j>=0&&j<=T.height-G){Se.bindFramebuffer(U.FRAMEBUFFER,we);const be=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,be),U.bufferData(U.PIXEL_PACK_BUFFER,le.byteLength,U.STREAM_READ),U.readPixels(V,j,K,G,ke.convert(Be),ke.convert(Ve),0);const Ke=L!==null?me.get(L).__webglFramebuffer:null;Se.bindFramebuffer(U.FRAMEBUFFER,Ke);const st=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await kp(U,st,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,be),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,le),U.deleteBuffer(be),U.deleteSync(st),le}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,V=null,j=0){T.isTexture!==!0&&(Sr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),V=arguments[0]||null,T=arguments[1]);const K=Math.pow(2,-j),G=Math.floor(T.image.width*K),le=Math.floor(T.image.height*K),ve=V!==null?V.x:0,we=V!==null?V.y:0;b.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,j,0,0,ve,we,G,le),Se.unbindTexture()},this.copyTextureToTexture=function(T,V,j=null,K=null,G=0){T.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,T=arguments[1],V=arguments[2],G=arguments[3]||0,j=null);let le,ve,we,Te,Be,Ve,be,Ke,st;const ot=T.isCompressedTexture?T.mipmaps[G]:T.image;j!==null?(le=j.max.x-j.min.x,ve=j.max.y-j.min.y,we=j.isBox3?j.max.z-j.min.z:1,Te=j.min.x,Be=j.min.y,Ve=j.isBox3?j.min.z:0):(le=ot.width,ve=ot.height,we=ot.depth||1,Te=0,Be=0,Ve=0),K!==null?(be=K.x,Ke=K.y,st=K.z):(be=0,Ke=0,st=0);const Ct=ke.convert(V.format),Ze=ke.convert(V.type);let Ce;V.isData3DTexture?(b.setTexture3D(V,0),Ce=U.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(b.setTexture2DArray(V,0),Ce=U.TEXTURE_2D_ARRAY):(b.setTexture2D(V,0),Ce=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,V.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,V.unpackAlignment);const un=U.getParameter(U.UNPACK_ROW_LENGTH),Je=U.getParameter(U.UNPACK_IMAGE_HEIGHT),qt=U.getParameter(U.UNPACK_SKIP_PIXELS),Mi=U.getParameter(U.UNPACK_SKIP_ROWS),Lt=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ot.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ot.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Te),U.pixelStorei(U.UNPACK_SKIP_ROWS,Be),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ve);const or=T.isDataArrayTexture||T.isData3DTexture,at=V.isDataArrayTexture||V.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const en=me.get(T),ar=me.get(V),Ot=me.get(en.__renderTarget),Rn=me.get(ar.__renderTarget);Se.bindFramebuffer(U.READ_FRAMEBUFFER,Ot.__webglFramebuffer),Se.bindFramebuffer(U.DRAW_FRAMEBUFFER,Rn.__webglFramebuffer);for(let Cn=0;Cn<we;Cn++)or&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,me.get(T).__webglTexture,G,Ve+Cn),T.isDepthTexture?(at&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,me.get(V).__webglTexture,G,st+Cn),U.blitFramebuffer(Te,Be,le,ve,be,Ke,le,ve,U.DEPTH_BUFFER_BIT,U.NEAREST)):at?U.copyTexSubImage3D(Ce,G,be,Ke,st+Cn,Te,Be,le,ve):U.copyTexSubImage2D(Ce,G,be,Ke,st+Cn,Te,Be,le,ve);Se.bindFramebuffer(U.READ_FRAMEBUFFER,null),Se.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else at?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(Ce,G,be,Ke,st,le,ve,we,Ct,Ze,ot.data):V.isCompressedArrayTexture?U.compressedTexSubImage3D(Ce,G,be,Ke,st,le,ve,we,Ct,ot.data):U.texSubImage3D(Ce,G,be,Ke,st,le,ve,we,Ct,Ze,ot):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,G,be,Ke,le,ve,Ct,Ze,ot.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,G,be,Ke,ot.width,ot.height,Ct,ot.data):U.texSubImage2D(U.TEXTURE_2D,G,be,Ke,le,ve,Ct,Ze,ot);U.pixelStorei(U.UNPACK_ROW_LENGTH,un),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Je),U.pixelStorei(U.UNPACK_SKIP_PIXELS,qt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Mi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Lt),G===0&&V.generateMipmaps&&U.generateMipmap(Ce),Se.unbindTexture()},this.copyTextureToTexture3D=function(T,V,j=null,K=null,G=0){return T.isTexture!==!0&&(Sr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,K=arguments[1]||null,T=arguments[2],V=arguments[3],G=arguments[4]||0),Sr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,V,j,K,G)},this.initRenderTarget=function(T){me.get(T).__webglFramebuffer===void 0&&b.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?b.setTextureCube(T,0):T.isData3DTexture?b.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?b.setTexture2DArray(T,0):b.setTexture2D(T,0),Se.unbindTexture()},this.resetState=function(){A=0,C=0,L=null,Se.reset(),Qe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}class cc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(e),this.density=t}clone(){return new cc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Zv extends ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wt,this.environmentIntensity=1,this.environmentRotation=new Wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Jv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ka,this.updateRanges=[],this.version=0,this.uuid=qn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let r=0,s=this.stride;r<s;r++)this.array[e+r]=t.array[i+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=qn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wt=new O;class Fs{constructor(e,t,i,r=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=rn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=nt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=rn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=rn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=rn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=rn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),r=nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=nt(t,this.array),i=nt(i,this.array),r=nt(r,this.array),s=nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=r,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return new _t(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Fs(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const r=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[r+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ku extends xi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Oi;const gr=new O,Bi=new O,ki=new O,zi=new ze,_r=new ze,zu=new ct,_s=new O,vr=new O,vs=new O,Zl=new ze,ko=new ze,Jl=new ze;class Qv extends ut{constructor(e=new ku){if(super(),this.isSprite=!0,this.type="Sprite",Oi===void 0){Oi=new Et;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Jv(t,5);Oi.setIndex([0,1,2,0,2,3]),Oi.setAttribute("position",new Fs(i,3,0,!1)),Oi.setAttribute("uv",new Fs(i,2,3,!1))}this.geometry=Oi,this.material=e,this.center=new ze(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Bi.setFromMatrixScale(this.matrixWorld),zu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ki.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Bi.multiplyScalar(-ki.z);const i=this.material.rotation;let r,s;i!==0&&(s=Math.cos(i),r=Math.sin(i));const o=this.center;ys(_s.set(-.5,-.5,0),ki,o,Bi,r,s),ys(vr.set(.5,-.5,0),ki,o,Bi,r,s),ys(vs.set(.5,.5,0),ki,o,Bi,r,s),Zl.set(0,0),ko.set(1,0),Jl.set(1,1);let a=e.ray.intersectTriangle(_s,vr,vs,!1,gr);if(a===null&&(ys(vr.set(-.5,.5,0),ki,o,Bi,r,s),ko.set(0,1),a=e.ray.intersectTriangle(_s,vs,vr,!1,gr),a===null))return;const c=e.ray.origin.distanceTo(gr);c<e.near||c>e.far||t.push({distance:c,point:gr.clone(),uv:Ht.getInterpolation(gr,_s,vr,vs,Zl,ko,Jl,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function ys(n,e,t,i,r,s){zi.subVectors(n,t).addScalar(.5).multiply(i),r!==void 0?(_r.x=s*zi.x-r*zi.y,_r.y=r*zi.x+s*zi.y):_r.copy(zi),n.copy(e),n.x+=_r.x,n.y+=_r.y,n.applyMatrix4(zu)}class Os extends xi{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ql=new ct,Va=new wu,xs=new zr,Ms=new O;class Ga extends ut{constructor(e=new Et,t=new Os){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xs.copy(i.boundingSphere),xs.applyMatrix4(r),xs.radius+=s,e.ray.intersectsSphere(xs)===!1)return;Ql.copy(r).invert(),Va.copy(e.ray).applyMatrix4(Ql);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){const f=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let v=f,g=m;v<g;v++){const p=l.getX(v);Ms.fromBufferAttribute(u,p),eh(Ms,p,c,r,e,t,this)}}else{const f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let v=f,g=m;v<g;v++)Ms.fromBufferAttribute(u,v),eh(Ms,v,c,r,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function eh(n,e,t,i,r,s,o){const a=Va.distanceSqToPoint(n);if(a<t){const c=new O;Va.closestPointToPoint(n,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class lc extends At{constructor(e,t,i,r,s,o,a,c,l){super(e,t,i,r,s,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gi extends Et{constructor(e=1,t=1,i=1,r=32,s=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:c};const l=this;r=Math.floor(r),s=Math.floor(s);const h=[],u=[],f=[],m=[];let v=0;const g=[],p=i/2;let d=0;_(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new dt(u,3)),this.setAttribute("normal",new dt(f,3)),this.setAttribute("uv",new dt(m,2));function _(){const x=new O,P=new O;let A=0;const C=(t-e)/i;for(let L=0;L<=s;L++){const w=[],M=L/s,D=M*(t-e)+e;for(let W=0;W<=r;W++){const S=W/r,R=S*c+a,N=Math.sin(R),I=Math.cos(R);P.x=D*N,P.y=-M*i+p,P.z=D*I,u.push(P.x,P.y,P.z),x.set(N,C,I).normalize(),f.push(x.x,x.y,x.z),m.push(S,1-M),w.push(v++)}g.push(w)}for(let L=0;L<r;L++)for(let w=0;w<s;w++){const M=g[w][L],D=g[w+1][L],W=g[w+1][L+1],S=g[w][L+1];(e>0||w!==0)&&(h.push(M,D,S),A+=3),(t>0||w!==s-1)&&(h.push(D,W,S),A+=3)}l.addGroup(d,A,0),d+=A}function y(x){const P=v,A=new ze,C=new O;let L=0;const w=x===!0?e:t,M=x===!0?1:-1;for(let W=1;W<=r;W++)u.push(0,p*M,0),f.push(0,M,0),m.push(.5,.5),v++;const D=v;for(let W=0;W<=r;W++){const R=W/r*c+a,N=Math.cos(R),I=Math.sin(R);C.x=w*I,C.y=p*M,C.z=w*N,u.push(C.x,C.y,C.z),f.push(0,M,0),A.x=N*.5+.5,A.y=I*.5*M+.5,m.push(A.x,A.y),v++}for(let W=0;W<r;W++){const S=P+W,R=D+W;x===!0?h.push(R,R+1,S):h.push(R+1,R,S),L+=3}l.addGroup(d,L,x===!0?1:2),d+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xi extends gi{constructor(e=1,t=1,i=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,i,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Xi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ys extends Et{constructor(e=[],t=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:r};const s=[],o=[];a(r),l(i),h(),this.setAttribute("position",new dt(s,3)),this.setAttribute("normal",new dt(s.slice(),3)),this.setAttribute("uv",new dt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const y=new O,x=new O,P=new O;for(let A=0;A<t.length;A+=3)m(t[A+0],y),m(t[A+1],x),m(t[A+2],P),c(y,x,P,_)}function c(_,y,x,P){const A=P+1,C=[];for(let L=0;L<=A;L++){C[L]=[];const w=_.clone().lerp(x,L/A),M=y.clone().lerp(x,L/A),D=A-L;for(let W=0;W<=D;W++)W===0&&L===A?C[L][W]=w:C[L][W]=w.clone().lerp(M,W/D)}for(let L=0;L<A;L++)for(let w=0;w<2*(A-L)-1;w++){const M=Math.floor(w/2);w%2===0?(f(C[L][M+1]),f(C[L+1][M]),f(C[L][M])):(f(C[L][M+1]),f(C[L+1][M+1]),f(C[L+1][M]))}}function l(_){const y=new O;for(let x=0;x<s.length;x+=3)y.x=s[x+0],y.y=s[x+1],y.z=s[x+2],y.normalize().multiplyScalar(_),s[x+0]=y.x,s[x+1]=y.y,s[x+2]=y.z}function h(){const _=new O;for(let y=0;y<s.length;y+=3){_.x=s[y+0],_.y=s[y+1],_.z=s[y+2];const x=p(_)/2/Math.PI+.5,P=d(_)/Math.PI+.5;o.push(x,1-P)}v(),u()}function u(){for(let _=0;_<o.length;_+=6){const y=o[_+0],x=o[_+2],P=o[_+4],A=Math.max(y,x,P),C=Math.min(y,x,P);A>.9&&C<.1&&(y<.2&&(o[_+0]+=1),x<.2&&(o[_+2]+=1),P<.2&&(o[_+4]+=1))}}function f(_){s.push(_.x,_.y,_.z)}function m(_,y){const x=_*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function v(){const _=new O,y=new O,x=new O,P=new O,A=new ze,C=new ze,L=new ze;for(let w=0,M=0;w<s.length;w+=9,M+=6){_.set(s[w+0],s[w+1],s[w+2]),y.set(s[w+3],s[w+4],s[w+5]),x.set(s[w+6],s[w+7],s[w+8]),A.set(o[M+0],o[M+1]),C.set(o[M+2],o[M+3]),L.set(o[M+4],o[M+5]),P.copy(_).add(y).add(x).divideScalar(3);const D=p(P);g(A,M+0,_,D),g(C,M+2,y,D),g(L,M+4,x,D)}}function g(_,y,x,P){P<0&&_.x===1&&(o[y]=_.x-1),x.x===0&&x.z===0&&(o[y]=P/2/Math.PI+.5)}function p(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ys(e.vertices,e.indices,e.radius,e.details)}}class hc extends Ys{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=1/i,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-i,0,-r,i,0,r,-i,0,r,i,-r,-i,0,-r,i,0,r,-i,0,r,i,0,-i,0,-r,i,0,-r,-i,0,r,i,0,r],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new hc(e.radius,e.detail)}}class uc extends Ys{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new uc(e.radius,e.detail)}}class Hr extends Et{constructor(e=1,t=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new O,f=new O,m=[],v=[],g=[],p=[];for(let d=0;d<=i;d++){const _=[],y=d/i;let x=0;d===0&&o===0?x=.5/t:d===i&&c===Math.PI&&(x=-.5/t);for(let P=0;P<=t;P++){const A=P/t;u.x=-e*Math.cos(r+A*s)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(r+A*s)*Math.sin(o+y*a),v.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),p.push(A+x,1-y),_.push(l++)}h.push(_)}for(let d=0;d<i;d++)for(let _=0;_<t;_++){const y=h[d][_+1],x=h[d][_],P=h[d+1][_],A=h[d+1][_+1];(d!==0||o>0)&&m.push(y,x,A),(d!==i-1||c<Math.PI)&&m.push(x,P,A)}this.setIndex(m),this.setAttribute("position",new dt(v,3)),this.setAttribute("normal",new dt(g,3)),this.setAttribute("uv",new dt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Hr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class dc extends Et{constructor(e=1,t=.4,i=12,r=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:r,arc:s},i=Math.floor(i),r=Math.floor(r);const o=[],a=[],c=[],l=[],h=new O,u=new O,f=new O;for(let m=0;m<=i;m++)for(let v=0;v<=r;v++){const g=v/r*s,p=m/i*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(g),u.y=(e+t*Math.cos(p))*Math.sin(g),u.z=t*Math.sin(p),a.push(u.x,u.y,u.z),h.x=e*Math.cos(g),h.y=e*Math.sin(g),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(v/r),l.push(m/i)}for(let m=1;m<=i;m++)for(let v=1;v<=r;v++){const g=(r+1)*m+v-1,p=(r+1)*(m-1)+v-1,d=(r+1)*(m-1)+v,_=(r+1)*m+v;o.push(g,p,_),o.push(p,d,_)}this.setIndex(o),this.setAttribute("position",new dt(a,3)),this.setAttribute("normal",new dt(c,3)),this.setAttribute("uv",new dt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class cn extends xi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yu,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class $s extends ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ey extends $s{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const zo=new ct,th=new O,nh=new O;class Hu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new oc,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;th.setFromMatrixPosition(e.matrixWorld),t.position.copy(th),nh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(nh),t.updateMatrixWorld(),zo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(zo),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(zo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ih=new ct,yr=new O,Ho=new O;class ty extends Hu{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,r=this.matrix,s=e.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),yr.setFromMatrixPosition(e.matrixWorld),i.position.copy(yr),Ho.copy(i.position),Ho.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Ho),i.updateMatrixWorld(),r.makeTranslation(-yr.x,-yr.y,-yr.z),ih.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ih)}}class Cs extends $s{constructor(e,t,i=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new ty}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ny extends Hu{constructor(){super(new Iu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rh extends $s{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ut.DEFAULT_UP),this.updateMatrix(),this.target=new ut,this.shadow=new ny}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class iy extends $s{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Qa);function sh(n){let e=(typeof n=="number"?n:ry(n||"rockets-default-seed"))>>>0;return function(){e|=0,e=e+1831565813|0;let i=Math.imul(e^e>>>15,1|e);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function ry(n){let e=0;for(let t=0;t<n.length;t++)e=(e<<5)-e+n.charCodeAt(t),e|=0;return e>>>0}function Vo(n,e,t){return Math.max(e,Math.min(t,n))}function sy(){if(typeof document>"u")return null;try{const n=document.createElement("canvas");n.width=64,n.height=64;const e=n.getContext("2d");if(!e)return null;const t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255, 255, 255, 1)"),t.addColorStop(.25,"rgba(235, 245, 255, 0.85)"),t.addColorStop(.55,"rgba(160, 205, 255, 0.35)"),t.addColorStop(.85,"rgba(100, 150, 255, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const i=new lc(n);return i.generateMipmaps=!0,i}catch{return null}}function oy(){if(typeof document>"u")return null;try{const n=document.createElement("canvas");n.width=256,n.height=256;const e=n.getContext("2d");if(!e)return null;const t=e.createImageData(256,256),i=t.data;for(let s=0;s<256;s++)for(let o=0;o<256;o++){const a=(s*256+o)*4,c=o/256,l=s/256,h=Math.sin(c*32)*Math.cos(l*32)*.35+Math.sin(c*64+l*48)*.25+Math.sin(c*128-l*96)*.15,u=(Math.random()-.5)*.25,f=Math.floor(Math.min(255,Math.max(0,(h+u+.5)*255)));i[a]=f,i[a+1]=f,i[a+2]=f,i[a+3]=255}e.putImageData(t,0,0);const r=new lc(n);return r.wrapS=Ir,r.wrapT=Ir,r.repeat.set(4,4),r}catch{return null}}class ay{constructor(e,t=42){this.scene=e,this.mapSeed=t,this.asteroids=[],this.asteroidGroup=new Vn,this.init()}init(){this.setupLighting(),this.createStarfield(),this.createAsteroidField()}setupLighting(){const e=new ey(5601177,1713203,1.6);this.scene.add(e);const t=new iy(3820380,1.2);this.scene.add(t);const i=new rh(16774890,3.2);i.position.set(700,450,600),this.scene.add(i);const r=new rh(46335,1.8);r.position.set(-600,-350,-500),this.scene.add(r);const s=new Cs(16772829,3.2,900);s.position.set(0,60,160),this.scene.add(s)}createStarfield(){const t=new Et,i=new Float32Array(200*3),r=new Float32Array(200*3),s=sh("stars-fixed-background");for(let l=0;l<200;l++){const h=l*3,u=s(),f=s(),m=u*2*Math.PI,v=Math.acos(2*f-1),g=350+s()*450;i[h]=g*Math.sin(v)*Math.cos(m),i[h+1]=g*Math.sin(v)*Math.sin(m),i[h+2]=g*Math.cos(v);const p=s();p<.25?(r[h]=.65,r[h+1]=.88,r[h+2]=1):p<.45?(r[h]=1,r[h+1]=.88,r[h+2]=.65):p<.6?(r[h]=.92,r[h+1]=.65,r[h+2]=1):(r[h]=1,r[h+1]=1,r[h+2]=1)}t.setAttribute("position",new _t(i,3)),t.setAttribute("color",new _t(r,3));const o=sy(),a=new Os({size:4,map:o||void 0,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,blending:$n,sizeAttenuation:!0,fog:!1}),c=new Ga(t,a);this.scene.add(c),this.createNebulae(s,o)}createNebulae(e,t){const r=new Et,s=new Float32Array(25*3),o=new Float32Array(25*3),a=[new qe(35071),new qe(10035967),new qe(65484),new qe(16724872)];for(let h=0;h<25;h++){const u=h*3,f=Math.floor(e()*a.length),m=a[f],v=f/a.length*Math.PI*2+(e()-.5)*.8,g=550+e()*350;s[u]=Math.cos(v)*g+(e()-.5)*200,s[u+1]=(e()-.5)*400,s[u+2]=Math.sin(v)*g+(e()-.5)*200,o[u]=m.r,o[u+1]=m.g,o[u+2]=m.b}r.setAttribute("position",new _t(s,3)),r.setAttribute("color",new _t(o,3));const c=new Os({size:60,map:t||void 0,vertexColors:!0,transparent:!0,opacity:.28,blending:$n,sizeAttenuation:!0,depthWrite:!1,fog:!1}),l=new Ga(r,c);this.scene.add(l)}createAsteroidField(){const e=sh(this.mapSeed),t=120,i=1e3,r=oy(),s=new cn({color:10180674,roughness:.88,metalness:.16,flatShading:!1,bumpMap:r||null,bumpScale:1.2,depthWrite:!0,side:Vt}),o=new cn({color:3685958,roughness:.92,metalness:.1,flatShading:!1,bumpMap:r||null,bumpScale:1.2,depthWrite:!0,side:Vt}),a=new cn({color:6187125,roughness:.86,metalness:.14,flatShading:!1,bumpMap:r||null,bumpScale:1.2,depthWrite:!0,side:Vt}),c=new cn({color:8293530,roughness:.8,metalness:.26,flatShading:!1,bumpMap:r||null,bumpScale:1.2,depthWrite:!0,side:Vt}),l=[s,o,a,c];for(let h=0;h<t;h++){let u,f;h<20?(u=75+e()*65,f=4):h<65?(u=42+e()*33,f=3):(u=22+e()*20,f=3);const m=new uc(u,f),v=m.attributes.position,g=new O,p=.82+e()*.4,d=.78+e()*.44,_=.82+e()*.4,y=e()*Math.PI*2,x=e()*Math.PI*2,P=e()*Math.PI*2,A=Math.floor(4+e()*3),C=[];for(let S=0;S<A;S++){const R=e()*Math.PI*2,N=Math.acos(2*e()-1);C.push({dir:new O(Math.sin(N)*Math.cos(R),Math.sin(N)*Math.sin(R),Math.cos(N)),depth:.16+e()*.16,radiusCos:.78+e()*.14})}for(let S=0;S<v.count;S++){g.fromBufferAttribute(v,S);const R=g.clone().normalize(),N=.1*Math.sin(R.x*3.2+y)*Math.cos(R.y*3.2+x)+.08*Math.sin(R.z*3.8+P),I=.05*Math.sin(R.x*6.5-R.z*5.2)*Math.cos(R.y*6.1),z=.025*Math.sin(R.y*12+R.x*10.5)*Math.sin(R.z*11.8),B=N+I+z;let F=0;for(let Z=0;Z<C.length;Z++){const ae=C[Z],xe=R.dot(ae.dir);if(xe>ae.radiusCos){const X=(xe-ae.radiusCos)/(1-ae.radiusCos);F-=ae.depth*Math.cos(X*(Math.PI/2))}else if(xe>ae.radiusCos-.12){const X=(xe-(ae.radiusCos-.12))/.12;F+=.35*ae.depth*Math.sin(X*Math.PI)}}const k=Math.max(.6,1+B+F);g.copy(R).multiplyScalar(u*k),g.x*=p,g.y*=d,g.z*=_,v.setXYZ(S,g.x,g.y,g.z)}m.computeVertexNormals();const L=l[Math.floor(e()*l.length)],w=new it(m,L);let M=0,D=0,W=0;if(h<12)M=(e()-.5)*180,D=(e()-.5)*90,W=60-e()*320;else{let S=!1,R=0;for(;!S&&R<50;){R++,M=(e()-.5)*i*2,D=(e()-.5)*(i*.7),W=(e()-.5)*i*2;const N=Math.hypot(M-0,D-0,W-180),I=Math.hypot(M,D,W);N>u+50&&I<i&&(S=!0)}}w.position.set(M,D,W),w.rotation.set(e()*Math.PI,e()*Math.PI,e()*Math.PI),this.asteroidGroup.add(w),this.asteroids.push({mesh:w,radius:u,position:w.position,rotationSpeed:new O((e()-.5)*.003,(e()-.5)*.003,(e()-.5)*.003),boundingSphere:new zr(w.position,u*1.1)})}this.scene.add(this.asteroidGroup)}update(e,t,i){for(let r=0;r<this.asteroids.length;r++){const s=this.asteroids[r];s.mesh.rotation.x+=s.rotationSpeed.x,s.mesh.rotation.y+=s.rotationSpeed.y,s.mesh.rotation.z+=s.rotationSpeed.z}}checkCollision(e,t=2.5){for(let i=0;i<this.asteroids.length;i++){const r=this.asteroids[i],s=e.distanceToSquared(r.position),o=r.radius+t;if(s<o*o)return r}return null}}class cy{constructor(e){this.camera=e,this.group=new Vn,this.camera.add(this.group),this.targetOffset=new O,this.currentOffset=new O,this.targetRotation=new Wt,this.currentRotation=new Wt,this.shieldGlassMat=null,this.damageFlashTimer=0,this.createCockpitModel()}createCockpitModel(){const e=new cn({color:1712688,roughness:.3,metalness:.85,flatShading:!0}),t=new an({color:58879,wireframe:!1}),i=new ln(1.6,.04,.2),r=new it(i,e);r.position.set(0,-.42,-.55),r.rotation.x=.25,this.group.add(r);const s=new ln(1.2,.006,.01),o=new it(s,t);o.position.set(0,-.4,-.54),o.rotation.x=.25,this.group.add(o);const a=new ln(.03,.9,.04),c=new it(a,e);c.position.set(-.72,.08,-.5),c.rotation.set(-.15,.15,.42),this.group.add(c);const l=c.clone();l.position.set(.72,.08,-.5),l.rotation.set(-.15,-.15,-.42),this.group.add(l);const h=new Hr(.75,16,12,0,Math.PI*2,0,Math.PI*.45);this.shieldGlassMat=new an({color:57855,transparent:!0,opacity:.03,side:bt,blending:$n,depthWrite:!1});const u=new it(h,this.shieldGlassMat);u.position.set(0,0,.1),this.group.add(u);const f=new gi(.022,.03,.55,8),m=new it(f,e);m.position.set(-.52,-.32,-.65),m.rotation.x=Math.PI/2,this.group.add(m);const v=m.clone();v.position.set(.52,-.32,-.65),this.group.add(v);const g=new dc(.026,.006,6,12),p=new it(g,t);p.position.set(-.52,-.32,-.92),this.group.add(p);const d=p.clone();d.position.set(.52,-.32,-.92),this.group.add(d)}triggerDamageFlash(){this.damageFlashTimer=.35}update(e,t,i){i&&i.length();const r=t.thrust?.015:t.brake?-.015:0,s=t.strafe*.02,o=t.pitch*.012,a=t.roll*.02;this.targetOffset.set(-s,-o,r),this.targetRotation.set(-o*1.5,-s*1.2,-a),this.currentOffset.lerp(this.targetOffset,e*10),this.currentRotation.x+=(this.targetRotation.x-this.currentRotation.x)*e*10,this.currentRotation.y+=(this.targetRotation.y-this.currentRotation.y)*e*10,this.currentRotation.z+=(this.targetRotation.z-this.currentRotation.z)*e*10,this.group.position.copy(this.currentOffset),this.group.rotation.copy(this.currentRotation),this.damageFlashTimer>0?(this.damageFlashTimer-=e,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(16720452),this.shieldGlassMat.opacity=Math.max(.04,this.damageFlashTimer*.8))):this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(57855),this.shieldGlassMat.opacity=.04)}}class ly{constructor(e,t){this.camera=e,this.spaceEnv=t,this.position=new O(0,0,100),this.velocity=new O(0,0,0),this.quaternion=new on,this.maxSpeed=90,this.forwardAccel=45,this.decelRate=this.maxSpeed/2,this.strafeAccel=40,this.maxStrafeSpeed=35,this.pitchSpeed=1.6,this.yawSpeed=1.6,this.rollSpeed=2,this.maxHp=100,this.hp=100,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.score=0,this.kills=0,this.deaths=0,this.input={thrust:!1,brake:!1,strafeLeft:!1,strafeRight:!1,pitchUp:!1,pitchDown:!1,yawLeft:!1,yawRight:!1,rollLeft:!1,rollRight:!1,analogPitch:0,analogYaw:0,analogRoll:0},this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}resetSpawn(){this.position.set(0,0,180),this.velocity.set(0,0,0),this.quaternion.set(0,0,0,1),this.hp=this.maxHp,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}takeDamage(e){return this.isDead||this.invulnerableTimer>0?!1:(this.hp=Math.max(0,this.hp-e),this.hp<=0?(this.isDead=!0,this.deaths++,this.respawnTimer=3,!0):!1)}recordKill(){this.kills++,this.score+=100}applyImpulse(e){this.velocity.add(e),this.velocity.length()>this.maxSpeed*1.35&&this.velocity.setLength(this.maxSpeed*1.35)}update(e){if(this.invulnerableTimer>0&&(this.invulnerableTimer=Math.max(0,this.invulnerableTimer-e)),this.isDead){this.respawnTimer-=e,this.respawnTimer<=0&&this.resetSpawn();return}(isNaN(this.position.x)||isNaN(this.position.y)||isNaN(this.position.z))&&(this.position.set(0,0,180),this.velocity.set(0,0,0)),(isNaN(this.velocity.x)||isNaN(this.velocity.y)||isNaN(this.velocity.z))&&this.velocity.set(0,0,0),(isNaN(this.quaternion.x)||isNaN(this.quaternion.w))&&this.quaternion.set(0,0,0,1),this.handleRotation(e),this.handleThrustAndMovement(e),this.handleAsteroidCollisions(),this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}handleRotation(e){let t=0;this.input.pitchUp&&(t+=1),this.input.pitchDown&&(t-=1),t+=this.input.analogPitch,t=Vo(t,-1,1);let i=0;this.input.yawLeft&&(i+=1),this.input.yawRight&&(i-=1),i+=this.input.analogYaw,i=Vo(i,-1,1);let r=0;this.input.rollLeft&&(r+=1),this.input.rollRight&&(r-=1),r+=this.input.analogRoll,r=Vo(r,-1,1);const s=new O(1,0,0),o=new O(0,1,0),a=new O(0,0,1);if(t!==0){const c=new on().setFromAxisAngle(s,t*this.pitchSpeed*e);this.quaternion.multiply(c)}if(i!==0){const c=new on().setFromAxisAngle(o,i*this.yawSpeed*e);this.quaternion.multiply(c)}if(r!==0){const c=new on().setFromAxisAngle(a,r*this.rollSpeed*e);this.quaternion.multiply(c)}this.quaternion.normalize()}handleThrustAndMovement(e){const t=new O(0,0,-1).applyQuaternion(this.quaternion).normalize(),i=new O(1,0,0).applyQuaternion(this.quaternion).normalize();if(this.input.thrust&&(this.velocity.addScaledVector(t,this.forwardAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.input.brake){const o=this.velocity.length();if(o>.001){const a=this.decelRate*e,c=Math.max(0,o-a);c===0?this.velocity.set(0,0,0):this.velocity.setLength(c)}else this.velocity.set(0,0,0)}let r=0;if(this.input.strafeLeft&&(r-=1),this.input.strafeRight&&(r+=1),r!==0&&(this.velocity.addScaledVector(i,r*this.strafeAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.position.addScaledVector(this.velocity,e),this.position.length()>1100){const o=this.position.clone().normalize().multiplyScalar(-30*e);this.velocity.add(o)}}handleAsteroidCollisions(){const t=this.spaceEnv.checkCollision(this.position,2.8);if(t){const i=this.position.clone().sub(t.position);i.lengthSq()<.001?i.set(0,0,1):i.normalize(),this.position.copy(t.position).addScaledVector(i,t.radius+2.8+.5);const r=this.velocity.dot(i);r<0&&this.velocity.subScaledVector(i,1.6*r),this.takeDamage(12)}}getForwardVector(){return new O(0,0,-1).applyQuaternion(this.quaternion).normalize()}getRightVector(){return new O(1,0,0).applyQuaternion(this.quaternion).normalize()}getSpeed(){return this.velocity.length()}}class hy{constructor(){this.ctx=null,this.masterGain=null,this.compressor=null,this.isMuted=!1,this.isUnlocked=!1,this.engineGain=null,this.engineFilter=null,this.engineOsc1=null,this.engineOsc2=null,this.engineNoiseNode=null,this.currentEngineVol=0,this.brakeGain=null,this.brakeFilter=null,this.brakeNoiseNode=null,this.currentBrakeVol=0,this.noiseBuffer=null,this.init()}init(){if(typeof window>"u")return;const e=window.AudioContext||window.webkitAudioContext;if(e)try{this.ctx=new e,this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.threshold.setValueAtTime(-12,this.ctx.currentTime),this.compressor.knee.setValueAtTime(8,this.ctx.currentTime),this.compressor.ratio.setValueAtTime(4,this.ctx.currentTime),this.compressor.attack.setValueAtTime(.005,this.ctx.currentTime),this.compressor.release.setValueAtTime(.08,this.ctx.currentTime),this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(.85,this.ctx.currentTime),this.compressor.connect(this.masterGain),this.masterGain.connect(this.ctx.destination),this.generateNoiseBuffer(),this.initEngineSynth(),this.initBrakeSynth(),this.setupAutoUnlock()}catch(t){console.warn("AudioContext initialization failed:",t)}}setupAutoUnlock(){if(!this.ctx)return;const e=()=>{this.ctx&&this.ctx.state==="suspended"?this.ctx.resume().then(()=>{this.isUnlocked=!0}).catch(()=>{}):this.isUnlocked=!0,window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e),window.removeEventListener("touchstart",e)};window.addEventListener("pointerdown",e,{passive:!0,once:!0}),window.addEventListener("keydown",e,{passive:!0,once:!0}),window.addEventListener("touchstart",e,{passive:!0,once:!0})}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}generateNoiseBuffer(){if(!this.ctx)return;const e=this.ctx.sampleRate*2;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const t=this.noiseBuffer.getChannelData(0);for(let i=0;i<e;i++)t[i]=Math.random()*2-1}initEngineSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.engineOsc1=this.ctx.createOscillator(),this.engineOsc1.type="sawtooth",this.engineOsc1.frequency.setValueAtTime(55,this.ctx.currentTime),this.engineOsc2=this.ctx.createOscillator(),this.engineOsc2.type="triangle",this.engineOsc2.frequency.setValueAtTime(110,this.ctx.currentTime),this.engineNoiseNode=this.ctx.createBufferSource(),this.engineNoiseNode.buffer=this.noiseBuffer,this.engineNoiseNode.loop=!0,this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.setValueAtTime(120,this.ctx.currentTime),this.engineFilter.Q.setValueAtTime(3,this.ctx.currentTime),this.engineGain=this.ctx.createGain(),this.engineGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.engineOsc1.connect(this.engineFilter),this.engineOsc2.connect(this.engineFilter),this.engineNoiseNode.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineGain.connect(this.compressor);try{this.engineOsc1.start(),this.engineOsc2.start(),this.engineNoiseNode.start()}catch{}}}initBrakeSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.brakeNoiseNode=this.ctx.createBufferSource(),this.brakeNoiseNode.buffer=this.noiseBuffer,this.brakeNoiseNode.loop=!0,this.brakeFilter=this.ctx.createBiquadFilter(),this.brakeFilter.type="bandpass",this.brakeFilter.frequency.setValueAtTime(1400,this.ctx.currentTime),this.brakeFilter.Q.setValueAtTime(2.5,this.ctx.currentTime),this.brakeGain=this.ctx.createGain(),this.brakeGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.brakeNoiseNode.connect(this.brakeFilter),this.brakeFilter.connect(this.brakeGain),this.brakeGain.connect(this.compressor);try{this.brakeNoiseNode.start()}catch{}}}updateEngine(e,t,i){if(!this.ctx||!this.engineGain||!this.brakeGain)return;this.resume();const r=e?.38:0,s=e?460:120;this.currentEngineVol+=(r-this.currentEngineVol)*Math.min(1,i*10);const o=this.ctx.currentTime;this.engineGain.gain.setTargetAtTime(Math.max(1e-4,this.currentEngineVol),o,.05),this.engineFilter.frequency.setTargetAtTime(s,o,.08);const a=t?.32:0;this.currentBrakeVol+=(a-this.currentBrakeVol)*Math.min(1,i*12),this.brakeGain.gain.setTargetAtTime(Math.max(1e-4,this.currentBrakeVol),o,.04)}playCannonShot(e=!0){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,i=this.ctx.createOscillator(),r=this.ctx.createGain(),s=this.ctx.createBiquadFilter();i.type=e?"sawtooth":"sine";const o=e?920:680,a=e?110:90;i.frequency.setValueAtTime(o,t),i.frequency.exponentialRampToValueAtTime(a,t+.08),s.type="lowpass",s.frequency.setValueAtTime(2800,t),s.frequency.exponentialRampToValueAtTime(400,t+.09);const c=e?.36:.18;r.gain.setValueAtTime(c,t),r.gain.exponentialRampToValueAtTime(.001,t+.095),i.connect(s),s.connect(r),r.connect(this.compressor),i.start(t),i.stop(t+.1)}playMineDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(60,e+.12),i.gain.setValueAtTime(.35,e),i.gain.exponentialRampToValueAtTime(.001,e+.13),t.connect(i),i.connect(this.compressor),t.start(e),t.stop(e+.14);const r=this.ctx.createOscillator(),s=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(1250,e+.06),r.frequency.setValueAtTime(1750,e+.14),s.gain.setValueAtTime(1e-4,e),s.gain.setValueAtTime(.22,e+.06),s.gain.setValueAtTime(.25,e+.14),s.gain.exponentialRampToValueAtTime(.001,e+.28),r.connect(s),s.connect(this.compressor),r.start(e+.05),r.stop(e+.3)}playExplosion(e=1){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(140,t),i.frequency.exponentialRampToValueAtTime(28,t+.7*e);const s=Math.min(.7,.45*e);if(r.gain.setValueAtTime(s,t),r.gain.exponentialRampToValueAtTime(.001,t+.75*e),i.connect(r),r.connect(this.compressor),i.start(t),i.stop(t+.8*e),this.noiseBuffer){const o=this.ctx.createBufferSource();o.buffer=this.noiseBuffer;const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(900,t),a.frequency.exponentialRampToValueAtTime(80,t+.6*e);const c=this.ctx.createGain();c.gain.setValueAtTime(.5*e,t),c.gain.exponentialRampToValueAtTime(.001,t+.65*e),o.connect(a),a.connect(c),c.connect(this.compressor),o.start(t),o.stop(t+.7*e)}}playDamageHit(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(70,e+.16),i.gain.setValueAtTime(.42,e),i.gain.exponentialRampToValueAtTime(.001,e+.18),t.connect(i),i.connect(this.compressor),t.start(e),t.stop(e+.2)}playScoreChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(880,e),t.frequency.setValueAtTime(1320,e+.08),i.gain.setValueAtTime(.25,e),i.gain.exponentialRampToValueAtTime(.001,e+.35),t.connect(i),i.connect(this.compressor),t.start(e),t.stop(e+.36)}playStrafeBurst(){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer;const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.setValueAtTime(1600,e),i.Q.setValueAtTime(2,e);const r=this.ctx.createGain();r.gain.setValueAtTime(.2,e),r.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(i),i.connect(r),r.connect(this.compressor),t.start(e),t.stop(e+.13)}}const zt=new hy;class uy{constructor(e){this.scene=e,this.maxParticles=1e3,this.particles=[],this.geom=new Et,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new _t(this.positions,3)),this.geom.setAttribute("color",new _t(this.colors,3)),this.material=new Os({size:4.8,vertexColors:!0,transparent:!0,opacity:.95,blending:$n,depthWrite:!1,sizeAttenuation:!0}),this.points=new Ga(this.geom,this.material),this.scene.add(this.points)}emit(e,t,i=2){for(let r=0;r<i&&!(this.particles.length>=this.maxParticles);r++){const s=new O((Math.random()-.5)*.45,(Math.random()-.5)*.45,(Math.random()-.5)*.45),o=e.clone().add(s),a=t.clone().multiplyScalar(-18).add(new O((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8)),c=.28+Math.random()*.18;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}update(e){for(let i=this.particles.length-1;i>=0;i--){const r=this.particles[i];if(r.life-=e,r.life<=0){this.particles.splice(i,1);continue}r.pos.addScaledVector(r.vel,e)}const t=this.particles.length;for(let i=0;i<t;i++){const r=this.particles[i],s=i*3;this.positions[s]=r.pos.x,this.positions[s+1]=r.pos.y,this.positions[s+2]=r.pos.z;const o=1-r.life/r.maxLife;if(o<.25)this.colors[s]=1,this.colors[s+1]=.98,this.colors[s+2]=.7;else if(o<.65)this.colors[s]=1,this.colors[s+1]=.55*(1-(o-.25)/.4),this.colors[s+2]=.05;else{const a=(1-o)/.35;this.colors[s]=.85*a,this.colors[s+1]=.15*a,this.colors[s+2]=.02*a}}for(let i=t;i<this.maxParticles;i++){const r=i*3;this.positions[r]=99999,this.positions[r+1]=99999,this.positions[r+2]=99999,this.colors[r]=0,this.colors[r+1]=0,this.colors[r+2]=0}this.geom.attributes.position.needsUpdate=!0,this.geom.attributes.color.needsUpdate=!0}cleanup(){this.points&&this.points.parent&&this.points.parent.remove(this.points),this.geom.dispose(),this.material.dispose()}}class dy{constructor(e,t,i){this.scene=e,this.spaceEnv=t,this.network=i,this.cannonMaxEnergy=100,this.cannonEnergy=100,this.cannonShotCost=2.5,this.cannonCooldownDelay=1,this.cannonCooldownTimer=0,this.cannonRechargeRate=35,this.cannonFireInterval=.1,this.cannonLastFireTime=0,this.cannonDamage=5,this.cannonSpeed=175,this.mineMaxCharges=2,this.mineCharges=2,this.mineRechargeTime=5.5,this.mineRechargeProgress=0,this.mineForwardImpulse=20,this.mineFuseTime=3,this.mineDetonationRadius=8,this.mineExplosionDamage=50,this.mineExplosionRadius=18,this.projectiles=[],this.mines=[],this.explosions=[],this.fireTrails=new uy(this.scene),this.slugBodyGeom=new gi(.24,.32,2,8),this.slugBodyGeom.rotateX(Math.PI/2),this.slugNoseGeom=new Xi(.24,.9,8),this.slugNoseGeom.rotateX(-Math.PI/2),this.slugTailGeom=new gi(.18,.28,.45,8),this.slugTailGeom.rotateX(Math.PI/2),this.slugBodyMat=new cn({color:2371133,roughness:.35,metalness:.85,flatShading:!0}),this.localSlugNoseMat=new an({color:16763955}),this.remoteSlugNoseMat=new an({color:16724804}),this.slugThrusterMat=new an({color:16737792}),this.mineGeom=new hc(1.6,1),this.mineMat=new cn({color:2236962,roughness:.3,metalness:.9,emissive:16716032,emissiveIntensity:.4}),this.listenToNetworkEvents()}listenToNetworkEvents(){this.network.onCannon((e,t)=>{this.spawnRemoteProjectile(e,t)}),this.network.onMine((e,t)=>{this.spawnRemoteMine(e,t)})}triggerCannon(e,t,i){if(e){this.cannonCooldownTimer=this.cannonCooldownDelay;const r=i>1e3?i*.001:i;if(this.cannonEnergy>=this.cannonShotCost&&r-this.cannonLastFireTime>=this.cannonFireInterval){this.cannonLastFireTime=r,this.cannonEnergy=Math.max(0,this.cannonEnergy-this.cannonShotCost);const s=t.getForwardVector(),o=t.getRightVector(),a=(Math.random()>.5?1:-1)*.52,c=t.position.clone().addScaledVector(s,2.5).addScaledVector(o,a).add(new O(0,-.32,0)),l=`${this.network.selfId}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;this.spawnProjectile(c,s,t.velocity,!0,l),zt.playCannonShot(!0),this.network.broadcastCannon({id:l,origin:{x:c.x,y:c.y,z:c.z},dir:{x:s.x,y:s.y,z:s.z},vel:{x:t.velocity.x,y:t.velocity.y,z:t.velocity.z},time:i})}}}triggerRearMine(e){if(this.mineCharges<1||e.isDead)return!1;this.mineCharges--;const t=e.getForwardVector();e.applyImpulse(t.clone().multiplyScalar(this.mineForwardImpulse));const i=e.position.clone().addScaledVector(t,-1.8),r=`mine-${this.network.selfId}-${Date.now()}`;return this.spawnMine(i,!0,this.network.selfId,r),zt.playMineDeploy(),this.network.broadcastMine({id:r,pos:{x:i.x,y:i.y,z:i.z},ownerId:this.network.selfId,time:Date.now()}),!0}spawnProjectile(e,t,i,r,s){const o=new Vn;o.position.copy(e),o.quaternion.setFromUnitVectors(new O(0,0,1),t);const a=new it(this.slugBodyGeom,this.slugBodyMat);o.add(a);const c=new it(this.slugNoseGeom,r?this.localSlugNoseMat:this.remoteSlugNoseMat);c.position.set(0,0,-1.45),o.add(c);const l=new it(this.slugTailGeom,this.slugThrusterMat);l.position.set(0,0,1.15),o.add(l);const h=new Cs(r?16746496:16720452,2.8,22);h.position.set(0,0,.5),o.add(h),this.scene.add(o),this.projectiles.push({mesh:o,dir:t.clone().normalize(),speed:this.cannonSpeed,initialVel:i?i.clone():new O,life:2.8,isLocal:r,id:s})}spawnRemoteProjectile(e,t){const i=new O(e.origin.x,e.origin.y,e.origin.z),r=new O(e.dir.x,e.dir.y,e.dir.z),s=e.vel?new O(e.vel.x,e.vel.y,e.vel.z):new O;this.spawnProjectile(i,r,s,!1,e.id),zt.playCannonShot(!1)}spawnMine(e,t,i,r){const s=new it(this.mineGeom,this.mineMat);s.position.copy(e);const o=new Cs(16720384,2.5,30);s.add(o),this.scene.add(s),this.mines.push({mesh:s,light:o,pos:s.position,life:this.mineFuseTime,ownerId:i,isLocal:t,id:r})}spawnRemoteMine(e,t){const i=new O(e.pos.x,e.pos.y,e.pos.z);this.spawnMine(i,!1,e.ownerId||t,e.id)}spawnExplosion(e,t=12,i=16737792){const r=new Hr(t*.4,12,10),s=new an({color:i,transparent:!0,opacity:.9,blending:$n}),o=new it(r,s);o.position.copy(e);const a=new Cs(i,4,t*3.5);o.add(a),this.scene.add(o),zt.playExplosion(t>15?1.5:.8),this.explosions.push({mesh:o,light:a,maxLife:.45,life:.45,maxRadius:t})}update(e,t,i,r){if(this.cannonCooldownTimer>0){const s=Math.min(this.cannonCooldownTimer,e);this.cannonCooldownTimer-=s;const o=e-s;o>0&&this.cannonEnergy<this.cannonMaxEnergy&&(this.cannonEnergy=Math.min(this.cannonMaxEnergy,this.cannonEnergy+this.cannonRechargeRate*o))}else this.cannonEnergy<this.cannonMaxEnergy&&(this.cannonEnergy=Math.min(this.cannonMaxEnergy,this.cannonEnergy+this.cannonRechargeRate*e));this.mineCharges<this.mineMaxCharges?(this.mineRechargeProgress+=e/this.mineRechargeTime,this.mineRechargeProgress>=1&&(this.mineCharges++,this.mineRechargeProgress=0)):this.mineRechargeProgress=0;for(let s=this.projectiles.length-1;s>=0;s--){const o=this.projectiles[s];o.life-=e;const a=o.dir.clone().multiplyScalar(o.speed*e);o.mesh.position.add(a);const c=o.mesh.position.clone().addScaledVector(o.dir,-1.2);this.fireTrails.emit(c,o.dir,3);let l=!1;if(this.spaceEnv.checkCollision(o.mesh.position,1)&&(this.spawnExplosion(o.mesh.position,4,54527),l=!0),!l&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<16&&(this.spawnExplosion(o.mesh.position,6,16720384),t.takeDamage(this.cannonDamage),r&&r(this.cannonDamage,"cannon",null),l=!0),!l&&o.isLocal){for(const[h,u]of i.entries())if(!u.isDead&&o.mesh.position.distanceToSquared(u.position)<16){this.spawnExplosion(o.mesh.position,6,65535),this.network.sendHitTarget(h,this.cannonDamage,"cannon"),l=!0;break}}(l||o.life<=0)&&(this.scene.remove(o.mesh),this.projectiles.splice(s,1))}for(let s=this.mines.length-1;s>=0;s--){const o=this.mines[s];o.life-=e,o.mesh.rotation.y+=e*2,o.mesh.rotation.x+=e*1.5;const a=Math.sin(o.life*12)>0;o.light.intensity=a?3.5:.8;let c=!1;const l=o.isLocal&&o.life>this.mineFuseTime-.6;if(!t.isDead&&!l&&o.pos.distanceToSquared(t.position)<=this.mineDetonationRadius*this.mineDetonationRadius&&(c=!0),!c){for(const[h,u]of i.entries())if(!u.isDead&&o.pos.distanceToSquared(u.position)<=this.mineDetonationRadius*this.mineDetonationRadius){c=!0;break}}if(o.life<=0&&(c=!0),c){if(this.spawnExplosion(o.pos,this.mineExplosionRadius,16729088),!t.isDead&&t.invulnerableTimer<=0){const h=o.pos.distanceTo(t.position);if(h<=this.mineExplosionRadius){const u=1-h/this.mineExplosionRadius,f=Math.round(this.mineExplosionDamage*u);t.takeDamage(f);const m=t.position.clone().sub(o.pos).normalize();t.applyImpulse(m.multiplyScalar(25*u)),r&&r(f,"mine",o.ownerId)}}if(o.isLocal){for(const[h,u]of i.entries())if(!u.isDead){const f=o.pos.distanceTo(u.position);if(f<=this.mineExplosionRadius){const m=1-f/this.mineExplosionRadius,v=Math.round(this.mineExplosionDamage*m);this.network.sendHitTarget(h,v,"mine")}}}this.scene.remove(o.mesh),this.mines.splice(s,1)}}for(let s=this.explosions.length-1;s>=0;s--){const o=this.explosions[s];o.life-=e;const a=1-o.life/o.maxLife,c=1+a*2.5;o.mesh.scale.set(c,c,c),o.mesh.material.opacity=Math.max(0,1-a),o.light.intensity=Math.max(0,(1-a)*4),o.life<=0&&(this.scene.remove(o.mesh),this.explosions.splice(s,1))}this.fireTrails&&this.fireTrails.update(e)}cleanup(){for(const e of this.projectiles)this.scene.remove(e.mesh);for(const e of this.mines)this.scene.remove(e.mesh);for(const e of this.explosions)this.scene.remove(e.mesh);this.fireTrails&&this.fireTrails.cleanup(),this.projectiles=[],this.mines=[],this.explosions=[]}}class oh{constructor(e,t,i="Pilot"){this.peerId=e,this.scene=t,this.playerName=i,this.group=new Vn,this.position=this.group.position,this.quaternion=this.group.quaternion,this.lastReceivedState=null,this.targetPosition=new O,this.targetQuaternion=new on,this.targetVelocity=new O,this.lastPacketTime=performance.now(),this.hp=100,this.maxHp=100,this.isDead=!1,this.isThrusting=!1,this.strafeState=0,this.engineFlares=[],this.sideThrusterFlares=[],this.shieldMesh=null,this.nameCanvas=null,this.nameSprite=null,this.createShipMesh(),this.createNameplate(),this.scene.add(this.group)}createShipMesh(){const e=new cn({color:10035746,roughness:.35,metalness:.8,flatShading:!0}),t=new cn({color:2237738,roughness:.5,metalness:.6}),i=new cn({color:54527,roughness:.1,metalness:.9,emissive:17510,emissiveIntensity:.5}),r=new Xi(1.2,5,5);r.rotateX(Math.PI/2);const s=new it(r,e);this.group.add(s);const o=new Xi(.55,2.2,4);o.rotateX(Math.PI/2);const a=new it(o,i);a.position.set(0,.45,-.4),this.group.add(a);const c=new ln(5.2,.1,1.8),l=new it(c,e);l.position.set(0,-.1,.5),l.rotation.y=.1,this.group.add(l);const h=new ln(.1,1.2,1.4),u=new it(h,t);u.position.set(-2.55,.45,.6),this.group.add(u);const f=u.clone();f.position.set(2.55,.45,.6),this.group.add(f);const m=new gi(.4,.5,.8,8);m.rotateX(Math.PI/2);const v=new it(m,t);v.position.set(-.7,0,2.3),this.group.add(v);const g=v.clone();g.position.set(.7,0,2.3),this.group.add(g);const p=new Xi(.35,2.2,8);p.rotateX(-Math.PI/2);const d=new an({color:43775,transparent:!0,opacity:.85,blending:$n}),_=new it(p,d);_.position.set(-.7,0,3.4),this.group.add(_),this.engineFlares.push(_);const y=_.clone();y.position.set(.7,0,3.4),this.group.add(y),this.engineFlares.push(y);const x=new Hr(3.2,16,12),P=new an({color:58879,wireframe:!0,transparent:!0,opacity:0});this.shieldMesh=new it(x,P),this.group.add(this.shieldMesh)}createNameplate(){this.nameCanvas=document.createElement("canvas"),this.nameCanvas.width=256,this.nameCanvas.height=64,this.updateNameplateTexture();const e=new lc(this.nameCanvas),t=new ku({map:e,transparent:!0});this.nameSprite=new Qv(t),this.nameSprite.position.set(0,3.2,0),this.nameSprite.scale.set(7.5,1.8,1),this.group.add(this.nameSprite)}updateNameplateTexture(){if(!this.nameCanvas)return;const e=this.nameCanvas.getContext("2d");if(!e)return;e.clearRect(0,0,256,64),e.fillStyle="rgba(10, 16, 26, 0.75)",e.roundRect?e.roundRect(10,8,236,48,8):e.fillRect(10,8,236,48),e.fill(),e.strokeStyle="#00d4ff",e.lineWidth=2,e.stroke(),e.font='bold 20px "Segoe UI", sans-serif',e.fillStyle="#ffffff",e.textAlign="center",e.fillText(this.playerName,128,30);const t=Math.max(0,this.hp/this.maxHp);e.fillStyle="#222",e.fillRect(30,38,196,10),e.fillStyle=t>.4?"#00ff88":"#ff3344",e.fillRect(30,38,196*t,10),this.nameSprite&&this.nameSprite.material.map&&(this.nameSprite.material.map.needsUpdate=!0)}receiveNetworkState(e){e&&(this.lastPacketTime=performance.now(),e.name&&e.name!==this.playerName&&(this.playerName=e.name,this.updateNameplateTexture()),e.hp!==void 0&&e.hp!==this.hp&&(this.hp=e.hp,this.updateNameplateTexture()),this.isDead=!!e.isDead,this.isThrusting=!!e.thrust,this.strafeState=e.strafe||0,this.targetPosition.set(e.pos.x,e.pos.y,e.pos.z),this.targetQuaternion.set(e.quat._x||e.quat.x,e.quat._y||e.quat.y,e.quat._z||e.quat.z,e.quat._w||e.quat.w),e.vel&&this.targetVelocity.set(e.vel.x,e.vel.y,e.vel.z))}triggerShieldFlash(){this.shieldMesh&&(this.shieldMesh.material.opacity=.55)}update(e){if(this.isDead){this.group.visible=!1;return}this.group.visible=!0;const t=performance.now(),i=Math.min(.25,(t-this.lastPacketTime)/1e3),r=this.targetPosition.clone().addScaledVector(this.targetVelocity,i),s=Math.min(1,e*12);this.position.lerp(r,s),this.quaternion.slerp(this.targetQuaternion,Math.min(1,e*10));const o=this.isThrusting?.8+Math.random()*.4:.001;for(const a of this.engineFlares)a.scale.set(o,o,o),a.visible=this.isThrusting;this.shieldMesh&&this.shieldMesh.material.opacity>0&&(this.shieldMesh.material.opacity=Math.max(0,this.shieldMesh.material.opacity-e*2.5))}destroy(){this.scene.remove(this.group)}}class fy{constructor(){this.logs=[],this.maxLogs=500,this.engineRef=null,this.startTime=Date.now(),this.webglInfo=null,this.lastFps=0,this.frameCount=0,this.fpsTimer=performance.now(),this.interceptConsole(),this.listenToErrors()}setEngine(e){if(this.engineRef=e,e&&e.renderer)try{const t=e.renderer.getContext(),i=t.getExtension("WEBGL_debug_renderer_info");this.webglInfo={renderer:i?t.getParameter(i.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER),vendor:i?t.getParameter(i.UNMASKED_VENDOR_WEBGL):t.getParameter(t.VENDOR),version:t.getParameter(t.VERSION),shadingLanguageVersion:t.getParameter(t.SHADING_LANGUAGE_VERSION),maxTextureSize:t.getParameter(t.MAX_TEXTURE_SIZE)},this.log("SYS",`WebGL Initialized: ${this.webglInfo.renderer}`)}catch(t){this.log("SYS",`WebGL info inspection error: ${t.message}`)}}interceptConsole(){const e=console.log.bind(console),t=console.warn.bind(console),i=console.error.bind(console);console.log=(...r)=>{this.log("LOG",r.map(s=>typeof s=="object"?JSON.stringify(s):String(s)).join(" ")),e(...r)},console.warn=(...r)=>{this.log("WARN",r.map(s=>typeof s=="object"?JSON.stringify(s):String(s)).join(" ")),t(...r)},console.error=(...r)=>{this.log("ERROR",r.map(s=>typeof s=="object"?JSON.stringify(s):String(s)).join(" ")),i(...r)}}listenToErrors(){window.addEventListener("error",e=>{this.log("UNCAUGHT",`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`)}),window.addEventListener("unhandledrejection",e=>{var t;this.log("REJECTION",`${((t=e.reason)==null?void 0:t.message)||e.reason}`)})}log(e,t){const r=`[${((Date.now()-this.startTime)/1e3).toFixed(2)}s][${e}] ${t}`;this.logs.push(r),this.logs.length>this.maxLogs&&this.logs.shift()}recordFrame(){this.frameCount++;const e=performance.now();e-this.fpsTimer>=1e3&&(this.lastFps=Math.round(this.frameCount*1e3/(e-this.fpsTimer)),this.frameCount=0,this.fpsTimer=e)}generateDiagnosticReport(){var i,r,s,o,a,c,l,h,u,f,m,v;const e=[];if(e.push("================ ROCKETS CLIENT DIAGNOSTICS ================"),e.push(`Timestamp: ${new Date().toISOString()}`),e.push(`User Agent: ${navigator.userAgent}`),e.push(`Screen Resolution: ${window.screen.width}x${window.screen.height} (Pixel Ratio: ${window.devicePixelRatio})`),e.push(`Window Inner Size: ${window.innerWidth}x${window.innerHeight}`),e.push(`Orientation: ${((i=screen.orientation)==null?void 0:i.type)||"unknown"}`),e.push(`Touch Supported: ${"ontouchstart"in window||navigator.maxTouchPoints>0} (Max Points: ${navigator.maxTouchPoints})`),e.push(""),e.push("--- WebGL Environment ---"),this.webglInfo?(e.push(`Renderer: ${this.webglInfo.renderer}`),e.push(`Vendor: ${this.webglInfo.vendor}`),e.push(`WebGL Version: ${this.webglInfo.version}`),e.push(`Max Texture Size: ${this.webglInfo.maxTextureSize}`)):e.push("WebGL Info: Not yet captured or WebGL unavailable"),e.push(""),e.push("--- Engine & Simulation State ---"),this.engineRef){const g=this.engineRef;if(e.push(`Is Engine Running: ${g.isRunning}`),e.push(`Render FPS: ${this.lastFps}`),e.push(`Canvas Size: ${(s=(r=g.renderer)==null?void 0:r.domElement)==null?void 0:s.width}x${(a=(o=g.renderer)==null?void 0:o.domElement)==null?void 0:a.height}`),e.push(`Canvas Container Size: ${(c=g.container)==null?void 0:c.clientWidth}x${(l=g.container)==null?void 0:l.clientHeight}`),e.push(`Scene Children Count: ${((u=(h=g.scene)==null?void 0:h.children)==null?void 0:u.length)||0}`),e.push(`Asteroids Spawned: ${((m=(f=g.spaceEnv)==null?void 0:f.asteroids)==null?void 0:m.length)||0}`),g.playerShip){const p=g.playerShip;e.push(`Ship Position: (${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)}, ${p.position.z.toFixed(2)})`),e.push(`Ship Velocity: (${p.velocity.x.toFixed(2)}, ${p.velocity.y.toFixed(2)}, ${p.velocity.z.toFixed(2)}) [Speed: ${p.getSpeed().toFixed(1)}]`),e.push(`Ship Quaternion: (${p.quaternion.x.toFixed(3)}, ${p.quaternion.y.toFixed(3)}, ${p.quaternion.z.toFixed(3)}, ${p.quaternion.w.toFixed(3)})`),e.push(`Ship HP: ${p.hp}/${p.maxHp} (isDead: ${p.isDead}, invuln: ${p.invulnerableTimer.toFixed(1)})`),e.push(`Active Inputs: thrust=${p.input.thrust}, brake=${p.input.brake}, strafeL=${p.input.strafeLeft}, strafeR=${p.input.strafeRight}, analogPitch=${p.input.analogPitch.toFixed(2)}, analogYaw=${p.input.analogYaw.toFixed(2)}`)}g.network&&(e.push(`Network Self ID: ${g.network.selfId}`),e.push(`Network Room ID: ${g.network.roomId}`),e.push(`Network isMaster: ${g.network.isMaster}`),e.push(`Connected Peers: ${((v=g.network.peers)==null?void 0:v.size)||0}`))}else e.push("Engine Reference: None (Engine not attached)");e.push(""),e.push("--- Recent Event Stream (Last 50 Logs) ---");const t=this.logs.slice(-50);for(const g of t)e.push(g);return e.push("============================================================"),e.join(`
`)}async copyToClipboard(){const e=this.generateDiagnosticReport();if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(e),!0}catch{}return window.prompt("Copy diagnostic report below (Ctrl+C / Cmd+C):",e),!0}}const nn=new fy;class py{constructor({container:e,network:t,mapSeed:i,onHudUpdate:r,onDeathNotice:s}){this.container=e,this.network=t,this.mapSeed=i,this.onHudUpdate=r||(()=>{}),this.onDeathNotice=s||(()=>{}),this.scene=null,this.camera=null,this.renderer=null,this.spaceEnv=null,this.cockpit=null,this.playerShip=null,this.weaponsSystem=null,this.remoteShips=new Map,this.isRunning=!1,this.lastTime=performance.now(),this.animFrameId=null,this.lastWidth=0,this.lastHeight=0,this.isPointerLocked=!1,this.mouseSensitivity=.0022,this.isFiringCannon=!1,this.broadcastTimer=0,this.broadcastInterval=1/20,this.initThree(),this.setupNetworkHandlers(),this.setupInputListeners(),nn.setEngine(this),nn.log("ENGINE",`GameEngine initialized with seed ${this.mapSeed}`)}initThree(){this.scene=new Zv,this.scene.background=new qe(264212),this.scene.fog=new cc(264212,1e-4);const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;this.camera=new Nt(75,e/t,.1,4e3),this.scene.add(this.camera),this.renderer=new Kv({antialias:!0,powerPreference:"high-performance",precision:"highp",stencil:!1,alpha:!1}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=au,this.renderer.toneMappingExposure=1.2,this.renderer.domElement.style.transform="translateZ(0)",this.renderer.domElement.style.willChange="transform",this.container.appendChild(this.renderer.domElement),this.spaceEnv=new ay(this.scene,this.mapSeed),this.playerShip=new ly(this.camera,this.spaceEnv),this.playerShip.resetSpawn(),this.cockpit=new cy(this.camera),this.weaponsSystem=new dy(this.scene,this.spaceEnv,this.network),window.addEventListener("resize",this.onWindowResize.bind(this))}setupNetworkHandlers(){this.network.onPeerJoined=e=>{if(!(!e||typeof e!="string")&&!this.remoteShips.has(e)){const t=new oh(e,this.scene,`Pilot-${e.slice(0,4)}`);this.remoteShips.set(e,t)}},this.network.onPeerLeft=e=>{!e||typeof e!="string"||this.remoteShips.has(e)&&(this.remoteShips.get(e).destroy(),this.remoteShips.delete(e))},this.network.onHit(e=>{if(e.targetId===this.network.selfId){const t=this.playerShip.takeDamage(e.damage);this.cockpit.triggerDamageFlash(),zt.playDamageHit(),t&&(zt.playExplosion(2.2),this.network.broadcastKill(this.network.selfId,e.attackerId,e.attackerName),this.onDeathNotice(`💥 Destroyed by ${e.attackerName||"Unknown Pilot"}`))}else this.remoteShips.has(e.targetId)&&this.remoteShips.get(e.targetId).triggerShieldFlash()}),this.network.onKill(e=>{e.killerId===this.network.selfId&&(this.playerShip.recordKill(),zt.playScoreChime(),this.onDeathNotice(`🎯 You eliminated ${e.victimId?e.victimId.slice(0,5):"Enemy"}! (+100 PTS)`))})}setupInputListeners(){window.addEventListener("keydown",e=>{if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.code){case"KeyW":this.playerShip.input.thrust=!0;break;case"KeyS":this.playerShip.input.brake=!0;break;case"KeyA":this.playerShip.input.strafeLeft||zt.playStrafeBurst(),this.playerShip.input.strafeLeft=!0;break;case"KeyD":this.playerShip.input.strafeRight||zt.playStrafeBurst(),this.playerShip.input.strafeRight=!0;break;case"KeyQ":this.playerShip.input.rollLeft=!0;break;case"KeyE":this.playerShip.input.rollRight=!0;break;case"ArrowUp":this.playerShip.input.pitchUp=!0;break;case"ArrowDown":this.playerShip.input.pitchDown=!0;break;case"ArrowLeft":this.playerShip.input.yawLeft=!0;break;case"ArrowRight":this.playerShip.input.yawRight=!0;break;case"Space":this.isFiringCannon=!0,e.preventDefault();break;case"KeyF":this.weaponsSystem.triggerRearMine(this.playerShip);break}}),window.addEventListener("keyup",e=>{switch(e.code){case"KeyW":this.playerShip.input.thrust=!1;break;case"KeyS":this.playerShip.input.brake=!1;break;case"KeyA":this.playerShip.input.strafeLeft=!1;break;case"KeyD":this.playerShip.input.strafeRight=!1;break;case"KeyQ":this.playerShip.input.rollLeft=!1;break;case"KeyE":this.playerShip.input.rollRight=!1;break;case"ArrowUp":this.playerShip.input.pitchUp=!1;break;case"ArrowDown":this.playerShip.input.pitchDown=!1;break;case"ArrowLeft":this.playerShip.input.yawLeft=!1;break;case"ArrowRight":this.playerShip.input.yawRight=!1;break;case"Space":this.isFiringCannon=!1;break}}),this.renderer.domElement.addEventListener("mousedown",e=>{e.button===0?this.isFiringCannon=!0:e.button===2&&this.weaponsSystem.triggerRearMine(this.playerShip)}),window.addEventListener("mouseup",e=>{e.button===0&&(this.isFiringCannon=!1)}),this.renderer.domElement.addEventListener("contextmenu",e=>e.preventDefault()),this.renderer.domElement.addEventListener("click",()=>{var e,t;document.pointerLockElement||(t=(e=this.renderer.domElement).requestPointerLock)==null||t.call(e)}),document.addEventListener("pointerlockchange",()=>{this.isPointerLocked=document.pointerLockElement===this.renderer.domElement}),document.addEventListener("mousemove",e=>{this.isPointerLocked&&(this.playerShip.input.analogYaw=-e.movementX*this.mouseSensitivity*25,this.playerShip.input.analogPitch=-e.movementY*this.mouseSensitivity*25)})}onWindowResize(){if(!this.container||!this.renderer||!this.camera)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}start(){this.isRunning=!0,this.lastTime=performance.now(),this.loop()}stop(){this.isRunning=!1,this.animFrameId&&cancelAnimationFrame(this.animFrameId)}loop(){if(this.isRunning){this.animFrameId=requestAnimationFrame(this.loop.bind(this));try{nn.recordFrame();const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;e>0&&t>0&&(e!==this.lastWidth||t!==this.lastHeight)&&(this.lastWidth=e,this.lastHeight=t,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1));const i=performance.now(),r=Math.min(.1,(i-this.lastTime)/1e3);this.lastTime=i,this.isPointerLocked&&(this.playerShip.input.analogPitch*=.7,this.playerShip.input.analogYaw*=.7),this.playerShip.update(r),zt.updateEngine(this.playerShip.input.thrust,this.playerShip.input.brake,r),this.weaponsSystem.triggerCannon(this.isFiringCannon,this.playerShip,i),this.weaponsSystem.update(r,this.playerShip,this.remoteShips,(o,a,c)=>{this.cockpit.triggerDamageFlash()});for(const[o,a]of this.network.peers.entries()){if(!o||typeof o!="string")continue;if(!this.remoteShips.has(o)){const l=(a==null?void 0:a.name)||`Pilot-${o.slice(0,4)}`,h=new oh(o,this.scene,l);this.remoteShips.set(o,h)}const c=this.remoteShips.get(o);c&&(a!=null&&a.lastState)&&c.receiveNetworkState(a.lastState),c&&c.update(r)}const s={thrust:this.playerShip.input.thrust,brake:this.playerShip.input.brake,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),pitch:(this.playerShip.input.pitchUp?1:0)-(this.playerShip.input.pitchDown?1:0)+this.playerShip.input.analogPitch,roll:(this.playerShip.input.rollRight?1:0)-(this.playerShip.input.rollLeft?1:0)};this.cockpit.update(r,s,this.playerShip.velocity),this.spaceEnv.update(r,this.playerShip.position,this.playerShip.velocity),this.broadcastTimer+=r,this.broadcastTimer>=this.broadcastInterval&&(this.broadcastTimer=0,this.network.broadcastLocalState({pos:{x:this.playerShip.position.x,y:this.playerShip.position.y,z:this.playerShip.position.z},quat:{x:this.playerShip.quaternion.x,y:this.playerShip.quaternion.y,z:this.playerShip.quaternion.z,w:this.playerShip.quaternion.w},vel:{x:this.playerShip.velocity.x,y:this.playerShip.velocity.y,z:this.playerShip.velocity.z},thrust:this.playerShip.input.thrust,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),hp:this.playerShip.hp,isDead:this.playerShip.isDead,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths})),this.renderer.render(this.scene,this.camera),this.onHudUpdate({hp:this.playerShip.hp,maxHp:this.playerShip.maxHp,speed:Math.round(this.playerShip.getSpeed()),maxSpeed:Math.round(this.playerShip.maxSpeed),cannonEnergy:Math.round(this.weaponsSystem.cannonEnergy),cannonMaxEnergy:this.weaponsSystem.cannonMaxEnergy,cannonRecharging:this.weaponsSystem.cannonCooldownTimer<=0&&this.weaponsSystem.cannonEnergy<this.weaponsSystem.cannonMaxEnergy,mineCharges:this.weaponsSystem.mineCharges,mineMaxCharges:this.weaponsSystem.mineMaxCharges,mineRechargeProgress:this.weaponsSystem.mineRechargeProgress,isDead:this.playerShip.isDead,respawnCountdown:Math.ceil(this.playerShip.respawnTimer),invulnerable:this.playerShip.invulnerableTimer>0,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,activePeersCount:this.network.peers.size+1,isMaster:this.network.isMaster,masterId:this.network.currentMasterId,avgPing:this.network.getAveragePing()})}catch(e){nn.log("CRASH",`Render loop exception: ${e.message}
${e.stack}`)}}}destroy(){this.stop(),this.weaponsSystem&&this.weaponsSystem.cleanup(),this.renderer&&this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}class my{constructor(e,t){this.container=e,this.engine=t,this.hudElement=null,this.createDom(),this.bindJoystick(),this.bindTouchControls(),this.bindFullscreen(),this.bindDiagnostics();const i=document.getElementById("hud-room-title");i&&this.engine&&this.engine.network&&(i.textContent=this.engine.network.roomName||this.engine.network.roomId||"Orion Sector")}createDom(){this.hudElement=document.createElement("div"),this.hudElement.className="game-hud-overlay",this.hudElement.innerHTML=`
      <!-- Orientation Warning for Mobile Portrait -->
      <div class="hud-rotate-notice" id="hud-rotate-notice">
        <span>🔄 Rotate phone to landscape for flight stick controls</span>
        <button class="hud-btn-mini-fullscreen" id="btn-rotate-fullscreen">⛶ Fullscreen</button>
      </div>

      <!-- Top Status Bar with Integrated Compact Gauges -->
      <div class="hud-top-bar">
        <div class="hud-top-left">
          <div class="hud-room-info">
            <span class="hud-room-title" id="hud-room-title">Orion Sector</span>
            <button class="hud-btn-copy" id="hud-btn-copy" title="Copy Shareable Link">📋 Invite</button>
          </div>
        </div>

        <div class="hud-top-center">
          <div class="hud-header-scoreboard" id="hud-header-scoreboard">
            <span>SCR: <strong id="hud-score-val">0</strong></span>
            <span>K: <strong id="hud-kills-val">0</strong></span>
            <span style="display:none;" id="hud-deaths-val">0</span>
            <span>SPD: <strong id="hud-speed-val">0</strong></span>
          </div>

          <!-- Integrated Compact Flight Gauges (No Screen Clutter) -->
          <div class="hud-top-meters">
            <div class="hud-compact-meter meter-hp">
              <span class="meter-label">HULL</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-hp" id="hud-hp-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-hp-num">100%</span>
              <span id="hud-shield-status" style="display:none;">ACTIVE</span>
            </div>

            <div class="hud-compact-meter meter-cannon">
              <span class="meter-label">CANNON</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-cannon" id="hud-cannon-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-cannon-pct">100%</span>
              <span id="hud-cannon-status" style="display:none;">READY</span>
            </div>

            <div class="hud-compact-mines">
              <span class="mine-mini-title">MINES:</span>
              <div class="mine-dot active" id="mine-dot-1">💣</div>
              <div class="mine-dot active" id="mine-dot-2">💣</div>
            </div>
          </div>
        </div>

        <div class="hud-top-right">
          <div class="hud-stat-pill" id="hud-peers-count">👥 1</div>
          <div class="hud-stat-pill" id="hud-ping-val">📡 0ms</div>
          <button class="hud-btn-diag" id="hud-btn-diag" title="Client Diagnostics & Telemetry Logs">🐞 Logs</button>
          <button class="hud-btn-fullscreen" id="hud-btn-fullscreen" title="Toggle Fullscreen">⛶</button>
          <button class="hud-btn-leave" id="hud-btn-leave" title="Leave Match">✕</button>
        </div>
      </div>

      <!-- Center Reticle & Alerts -->
      <div class="hud-center-crosshair">
        <div class="crosshair-ring"></div>
        <div class="crosshair-dot"></div>
      </div>

      <div class="hud-combat-feed" id="hud-combat-feed"></div>
      <div class="hud-respawn-overlay" id="hud-respawn-overlay" style="display: none;">
        <div class="respawn-title">SHIP DESTROYED</div>
        <div class="respawn-counter" id="hud-respawn-counter">Respawning in 3...</div>
      </div>

      <!-- On-Screen Flight & Combat Controls (Clean, Minimalist Translucent) -->
      <div class="hud-touch-controls">
        <!-- Left: Drag D-Pad Joystick (Pitch Up/Down, Turn Left/Right with Auto-Roll Banking) -->
        <div class="touch-controls-left">
          <div class="touch-joystick-container" id="touch-joystick-container">
            <div class="joystick-base" id="joystick-base">
              <div class="joystick-axis-h"></div>
              <div class="joystick-axis-v"></div>
              <div class="joystick-knob" id="joystick-knob"></div>
            </div>
          </div>

          <!-- Manual Roll Buttons -->
          <div class="touch-roll-cluster">
            <button class="action-touch-btn btn-roll" id="btn-roll-left" title="Roll Left (Q)">↺ Roll L</button>
            <button class="action-touch-btn btn-roll" id="btn-roll-right" title="Roll Right (E)">Roll R ↻</button>
          </div>
        </div>

        <!-- Right: Side Strafing, Main Thrusters & Weapons -->
        <div class="touch-controls-right">
          <!-- Side Thrusters (Strafing) -->
          <div class="touch-strafe-cluster">
            <button class="action-touch-btn btn-strafe" id="btn-strafe-left" title="Strafe Left Side Thruster (A)">⬅ Strafe L</button>
            <button class="action-touch-btn btn-strafe" id="btn-strafe-right" title="Strafe Right Side Thruster (D)">Strafe R ➡</button>
          </div>

          <!-- Main Thrusters -->
          <div class="touch-thrust-cluster">
            <button class="action-touch-btn btn-thrust" id="btn-thrust" title="Hold to Accelerate Forward (W)">🚀 <strong>THRUST</strong></button>
            <button class="action-touch-btn btn-brake" id="btn-brake" title="Hold to Slow Down / Stop in 2.0s (S)">🛑 <strong>BRAKE</strong></button>
          </div>

          <!-- Combat Weapons -->
          <div class="touch-weapon-cluster">
            <button class="action-touch-btn btn-cannon" id="btn-cannon" title="Hold to Fire Cannon (Space / LMB)">⚡ <strong>CANNON</strong></button>
            <button class="action-touch-btn btn-mine" id="btn-mine" title="Tap to Drop Rear Mine (F / RMB)">💣 <strong>MINE</strong></button>
          </div>
        </div>
      </div>

      <!-- Client Diagnostic & Telemetry Log Modal -->
      <div class="hud-diag-backdrop" id="hud-diag-backdrop" style="display: none;">
        <div class="hud-diag-modal">
          <div class="diag-header">
            <h3>🛠️ Client Diagnostics & Engine Logs</h3>
            <button class="diag-close-btn" id="btn-close-diag">✕ Close</button>
          </div>
          <div class="diag-body">
            <pre class="diag-text" id="diag-text-display">Loading diagnostics...</pre>
          </div>
          <div class="diag-footer">
            <button class="btn-primary" id="btn-copy-diag-text">📋 Copy Log to Clipboard</button>
          </div>
        </div>
      </div>
    `,this.container.appendChild(this.hudElement)}bindJoystick(){const e=document.getElementById("touch-joystick-container"),t=document.getElementById("joystick-base"),i=document.getElementById("joystick-knob");if(!e||!t||!i)return;const r=this.engine.playerShip.input,s=45;let o=null,a=!1;const c=(h,u)=>{const f=t.getBoundingClientRect(),m=f.left+f.width/2,v=f.top+f.height/2;let g=h-m,p=u-v;const d=Math.sqrt(g*g+p*p);d>s&&(g=g/d*s,p=p/d*s),i.style.transform=`translate(${g}px, ${p}px)`,r.analogPitch=-(p/s),r.analogYaw=-(g/s)},l=()=>{o=null,a=!1,i.style.transform="translate(0px, 0px)",r.analogPitch=0,r.analogYaw=0};e.addEventListener("touchstart",h=>{if(h.preventDefault(),h.stopPropagation(),o===null&&h.touches.length>0){const u=h.touches[0];o=u.identifier,c(u.clientX,u.clientY),nn.log("TOUCH",`Joystick touchstart at (${Math.round(u.clientX)}, ${Math.round(u.clientY)})`)}},{passive:!1}),e.addEventListener("touchmove",h=>{if(h.preventDefault(),h.stopPropagation(),o!==null){for(let u=0;u<h.touches.length;u++)if(h.touches[u].identifier===o){c(h.touches[u].clientX,h.touches[u].clientY);break}}},{passive:!1}),e.addEventListener("touchend",h=>{h.preventDefault(),l()},{passive:!1}),e.addEventListener("touchcancel",h=>{l()},{passive:!1}),e.addEventListener("pointerdown",h=>{h.pointerType!=="touch"&&(h.preventDefault(),a=!0,c(h.clientX,h.clientY))}),window.addEventListener("pointermove",h=>{a&&c(h.clientX,h.clientY)}),window.addEventListener("pointerup",()=>{a&&l()})}bindTouchControls(){const e=this.engine.playerShip.input,t=(o,a,c)=>{const l=document.getElementById(o);if(!l)return;let h=!1;const u=m=>{m&&(m.preventDefault(),m.stopPropagation()),!h&&(h=!0,a(),l.classList.add("active"),nn.log("INPUT",`Button [${o}] ACTIVATED`))},f=m=>{h&&(h=!1,c(),l.classList.remove("active"),nn.log("INPUT",`Button [${o}] RELEASED`))};l.addEventListener("touchstart",u,{passive:!1}),l.addEventListener("touchend",f,{passive:!1}),l.addEventListener("touchcancel",f,{passive:!1}),l.addEventListener("pointerdown",m=>{m.pointerType!=="touch"&&u(m)}),l.addEventListener("pointerup",f),l.addEventListener("pointerleave",f),window.addEventListener("pointerup",f)};t("btn-roll-left",()=>e.rollLeft=!0,()=>e.rollLeft=!1),t("btn-roll-right",()=>e.rollRight=!0,()=>e.rollRight=!1),t("btn-strafe-left",()=>{zt.playStrafeBurst(),e.strafeLeft=!0},()=>e.strafeLeft=!1),t("btn-strafe-right",()=>{zt.playStrafeBurst(),e.strafeRight=!0},()=>e.strafeRight=!1),t("btn-thrust",()=>e.thrust=!0,()=>e.thrust=!1),t("btn-brake",()=>e.brake=!0,()=>e.brake=!1),t("btn-cannon",()=>this.engine.isFiringCannon=!0,()=>this.engine.isFiringCannon=!1);const i=document.getElementById("btn-mine");if(i){const o=a=>{a&&(a.preventDefault(),a.stopPropagation()),this.engine.weaponsSystem.triggerRearMine(this.engine.playerShip),i.classList.add("active"),nn.log("INPUT","Rear Mine Triggered"),setTimeout(()=>i.classList.remove("active"),150)};i.addEventListener("touchstart",o,{passive:!1}),i.addEventListener("pointerdown",a=>{a.pointerType!=="touch"&&o(a)})}const r=document.getElementById("hud-btn-copy");r&&r.addEventListener("click",()=>{const o=window.location.origin+window.location.pathname+`?room=${encodeURIComponent(this.engine.network.roomId)}`;navigator.clipboard.writeText(o).then(()=>{r.textContent="✅ Copied!",setTimeout(()=>r.textContent="📋 Invite",2e3)}).catch(()=>{prompt("Share this match link:",o)})});const s=document.getElementById("hud-btn-leave");s&&s.addEventListener("click",()=>{confirm("Leave current match and return to lobby?")&&(window.location.href=window.location.origin+window.location.pathname)})}bindDiagnostics(){const e=document.getElementById("hud-btn-diag"),t=document.getElementById("hud-diag-backdrop"),i=document.getElementById("btn-close-diag"),r=document.getElementById("btn-copy-diag-text"),s=document.getElementById("diag-text-display");!e||!t||(e.addEventListener("click",()=>{s&&(s.textContent=nn.generateDiagnosticReport()),t.style.display="flex"}),i&&i.addEventListener("click",()=>{t.style.display="none"}),r&&r.addEventListener("click",async()=>{await nn.copyToClipboard(),r.textContent="✅ Copied to Clipboard!",setTimeout(()=>{r.textContent="📋 Copy Log to Clipboard"},2500)}))}bindFullscreen(){const e=document.getElementById("hud-btn-fullscreen"),t=document.getElementById("btn-rotate-fullscreen"),i=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement){const s=document.documentElement;s.requestFullscreen?s.requestFullscreen().catch(()=>{}):s.webkitRequestFullscreen&&s.webkitRequestFullscreen();try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}else document.exitFullscreen?document.exitFullscreen().catch(()=>{}):document.webkitExitFullscreen&&document.webkitExitFullscreen()};e&&e.addEventListener("click",i),t&&t.addEventListener("click",i);const r=()=>{const s=!!(document.fullscreenElement||document.webkitFullscreenElement);e&&(e.textContent=s?"⛶ Exit":"⛶ Fullscreen")};document.addEventListener("fullscreenchange",r),document.addEventListener("webkitfullscreenchange",r)}showCombatMessage(e){const t=document.getElementById("hud-combat-feed");if(!t)return;const i=document.createElement("div");i.className="combat-feed-item",i.textContent=e,t.appendChild(i),setTimeout(()=>{i.classList.add("fade-out"),setTimeout(()=>i.remove(),400)},3500)}update(e){const t=document.getElementById("hud-room-title");t&&(t.textContent=this.engine.network.roomName||"Orion Sector");const i=document.getElementById("hud-peers-count");i&&(i.textContent=`👥 ${e.activePeersCount} Pilot${e.activePeersCount===1?"":"s"}`);const r=document.getElementById("hud-ping-val");r&&(r.textContent=`📡 ${e.avgPing}ms`);const s=document.getElementById("hud-hp-bar"),o=document.getElementById("hud-hp-num"),a=Math.round(e.hp/e.maxHp*100);s&&(s.style.width=`${a}%`,s.className=a>35?"gauge-bar-fill bar-hp":"gauge-bar-fill bar-hp bar-hp-critical"),o&&(o.textContent=`${a}%`);const c=document.getElementById("hud-shield-status");c&&(e.invulnerable?(c.textContent="🛡️ INVULNERABLE",c.style.color="#00ffff"):e.hp<=35?(c.textContent="CRITICAL",c.style.color="#ff3344"):(c.textContent="ACTIVE",c.style.color="#00ff88"));const l=document.getElementById("hud-score-val");l&&(l.textContent=e.score);const h=document.getElementById("hud-kills-val");h&&(h.textContent=e.kills);const u=document.getElementById("hud-deaths-val");u&&(u.textContent=e.deaths);const f=document.getElementById("hud-speed-val");f&&(f.textContent=e.speed);const m=document.getElementById("hud-cannon-bar"),v=document.getElementById("hud-cannon-pct"),g=document.getElementById("hud-cannon-status");m&&(m.style.width=`${e.cannonEnergy}%`),v&&(v.textContent=`${e.cannonEnergy}%`),g&&(e.cannonRecharging?(g.textContent="RECHARGING...",g.style.color="#00ffff"):e.cannonEnergy<15?(g.textContent="COOLDOWN",g.style.color="#ffaa00"):(g.textContent="READY (TTK 2s)",g.style.color="#88aacc"));const p=document.getElementById("mine-dot-1"),d=document.getElementById("mine-dot-2");p&&(p.className=e.mineCharges>=1?"mine-dot active":"mine-dot empty"),d&&(d.className=e.mineCharges>=2?"mine-dot active":"mine-dot empty");const _=document.getElementById("hud-respawn-overlay"),y=document.getElementById("hud-respawn-counter");_&&y&&(e.isDead?(_.style.display="flex",y.textContent=`Respawning in ${e.respawnCountdown}s...`):_.style.display="none")}destroy(){this.hudElement&&this.hudElement.parentNode&&this.hudElement.parentNode.removeChild(this.hudElement)}}const Go=document.getElementById("app"),ah=["Nebula-Orion","Andromeda-Deep","Centauri-Prime","Cygnus-Rift","Cassiopeia-Void","Pegasus-Belt","Vela-Pulsar","Perseus-Arm"];function ch(){const n=ah[Math.floor(Math.random()*ah.length)],e=Math.floor(100+Math.random()*900);return`${n}-${e}`}class gy{constructor(){this.currentMode="lobby",this.engine=null,this.network=null,this.hud=null,this.playerName=localStorage.getItem("rockets_pilot_name")||`Pilot-${Math.floor(1e3+Math.random()*9e3)}`,this.init()}init(){const t=new URLSearchParams(window.location.search).get("room");t?this.startMatch({roomId:t,roomName:t,mapSeed:Math.abs(this.hashCode(t))}):this.renderLobby()}hashCode(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return t}renderLobby(){this.currentMode="lobby",Go.innerHTML=`
      <div class="lobby-container">
        <header class="lobby-header">
          <h1 class="lobby-title">🚀 ROCKETS</h1>
          <p class="lobby-subtitle">Serverless P2P WebRTC 3D Multiplayer Space Combat</p>
        </header>

        <div class="lobby-pilot-config">
          <label for="pilot-name-input">CALLSIGN:</label>
          <input type="text" id="pilot-name-input" value="${this.playerName}" maxlength="16" placeholder="Pilot Name" />
        </div>

        <div class="pwa-install-banner" id="pwa-install-banner">
          <span>📲 Install Rockets as Fullscreen App on your phone:</span>
          <button class="btn-pwa-install" id="btn-pwa-install">INSTALL</button>
        </div>

        <div class="lobby-grid">
          <!-- Create Match Card -->
          <div class="lobby-card">
            <h2 class="card-title"><span>🛰️</span> Create New Sector</h2>
            <p class="card-description">
              Initialize a new procedural asteroid map. You become the initial Master peer broadcasting session TTL heartbeats.
            </p>
            <div class="lobby-form-row">
              <label for="sector-name-input">Sector / Room Name</label>
              <input type="text" id="sector-name-input" class="lobby-input" value="${ch()}" />
            </div>
            <button class="btn-primary" id="btn-create-match">LAUNCH SECTOR</button>
          </div>

          <!-- Join by Code Card -->
          <div class="lobby-card">
            <h2 class="card-title"><span>⚡</span> Direct Join</h2>
            <p class="card-description">
              Connect directly to an existing peer mesh using a known Room ID or invite link.
            </p>
            <div class="lobby-form-row">
              <label for="join-room-input">Room Code or Sector ID</label>
              <input type="text" id="join-room-input" class="lobby-input" placeholder="e.g. Nebula-Orion-412" />
            </div>
            <button class="btn-secondary" id="btn-direct-join">JOIN DIRECTLY</button>
          </div>
        </div>

        <!-- Live Public Lobbies Browser -->
        <section class="lobby-browser-section">
          <div class="browser-header">
            <h2 class="card-title"><span>📡</span> Public Sector Directory (Live Keep-Alive TTL)</h2>
            <button class="btn-refresh-rooms" id="btn-refresh-rooms">🔄 Refresh</button>
          </div>
          <div class="rooms-list" id="rooms-list-container">
            <div class="rooms-empty">Scanning decentralized relays for active sectors...</div>
          </div>
        </section>

        <!-- Controls Guide -->
        <section class="lobby-controls-card">
          <strong>PILOT FLIGHT & COMBAT MANUAL:</strong>
          <div class="controls-grid">
            <div class="control-item">
              <span class="control-key">W / 🚀 Thrust:</span> Accelerate forward up to max speed
            </div>
            <div class="control-item">
              <span class="control-key">S / 🛑 Brake:</span> Progressive deceleration (full stop in 2.0s)
            </div>
            <div class="control-item">
              <span class="control-key">A & D / ⬅ ➡ Strafe:</span> Fire lateral side thrusters
            </div>
            <div class="control-item">
              <span class="control-key">D-Pad / Arrows / Mouse:</span> Pitch (up/down) & Pan/Yaw (left/right)
            </div>
            <div class="control-item">
              <span class="control-key">Q & E / ↺ ↻:</span> Roll left & right
            </div>
            <div class="control-item">
              <span class="control-key">Space / LMB:</span> Front Cannon (rapid fire, 2.0s TTK, auto-recharge)
            </div>
            <div class="control-item">
              <span class="control-key">F / RMB:</span> Rear Mine (forward boost + 3s proximity fuse)
            </div>
          </div>
        </section>
      </div>
    `;const e=document.getElementById("pilot-name-input");e&&e.addEventListener("input",h=>{this.playerName=h.target.value.trim()||"Pilot",localStorage.setItem("rockets_pilot_name",this.playerName)});let t=window.__pwaDeferredPrompt;const i=document.getElementById("pwa-install-banner"),r=document.getElementById("btn-pwa-install");t&&i&&(i.style.display="flex"),window.addEventListener("beforeinstallprompt",h=>{h.preventDefault(),window.__pwaDeferredPrompt=h,i&&(i.style.display="flex")}),r&&r.addEventListener("click",()=>{const h=window.__pwaDeferredPrompt;h&&(h.prompt(),h.userChoice.then(()=>{i&&(i.style.display="none")}))});const s=document.getElementById("btn-create-match"),o=document.getElementById("sector-name-input");s&&s.addEventListener("click",()=>{const h=o.value.trim()||ch(),u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const a=document.getElementById("btn-direct-join"),c=document.getElementById("join-room-input");a&&a.addEventListener("click",()=>{const h=c.value.trim();if(!h){alert("Please enter a Room Code or Sector ID to join.");return}const u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const l=document.getElementById("btn-refresh-rooms");l&&l.addEventListener("click",()=>{ci.refreshRooms()}),ci.init(),ci.onRoomsUpdated(h=>{this.updateRoomsListUI(h)})}updateRoomsListUI(e){const t=document.getElementById("rooms-list-container");if(!t)return;if(!e||e.length===0){t.innerHTML='<div class="rooms-empty">No active matches found. Click <strong>LAUNCH SECTOR</strong> above to host one!</div>';return}t.innerHTML=e.map(r=>`
      <div class="room-list-item">
        <div class="room-item-meta">
          <span class="room-item-name">🛰️ ${Wo(r.roomName||r.roomId)}</span>
          <div class="room-item-details">
            <span>👥 ${r.playerCount||1} Pilot${r.playerCount===1?"":"s"}</span>
            <span>👑 Host: Pilot-${(r.masterId||"Host").slice(0,4)}</span>
            <span class="room-ttl-badge">⏳ TTL: ${r.ttlSecondsRemaining}s</span>
          </div>
        </div>
        <button class="btn-join-room-item" data-room-id="${Wo(r.roomId)}" data-room-name="${Wo(r.roomName||r.roomId)}" data-seed="${r.mapSeed||42}">
          JOIN SECTOR
        </button>
      </div>
    `).join(""),t.querySelectorAll(".btn-join-room-item").forEach(r=>{r.addEventListener("click",()=>{const s=r.getAttribute("data-room-id"),o=r.getAttribute("data-room-name"),a=parseInt(r.getAttribute("data-seed"),10)||42;this.startMatch({roomId:s,roomName:o,mapSeed:a})})})}startMatch({roomId:e,roomName:t,mapSeed:i}){this.currentMode="game",Go.innerHTML="";const r=document.createElement("div");r.id="game-canvas-container",r.style.width="100%",r.style.height="100%",r.style.position="relative",r.style.overflow="hidden",Go.appendChild(r);const s=`${window.location.pathname}?room=${encodeURIComponent(e)}`;window.history.pushState({path:s},"",s),this.network=new Kf({roomId:e,roomName:t,mapSeed:i,playerName:this.playerName,onCombatLog:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.engine=new py({container:r,network:this.network,mapSeed:i,onHudUpdate:o=>{this.hud&&this.hud.update(o)},onDeathNotice:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.hud=new my(r,this.engine);try{this.network.join()}catch(o){console.error("[Network] joinRoom exception:",(o==null?void 0:o.message)||o)}this.engine.start()}}function Wo(n){return n?n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}new gy;
//# sourceMappingURL=index-BM1-xprH.js.map
