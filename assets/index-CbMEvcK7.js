var Ju=Object.defineProperty;var Qu=(i,e,t)=>e in i?Ju(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Vt=(i,e,t)=>Qu(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const Ja=Object.freeze,Wn=0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,zs=0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,ph=0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,mh=0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,ed=Ja({p:Wn,n:zs,h:1n,a:0n,b:7n,Gx:ph,Gy:mh}),cn=32,Tc=i=>i instanceof Uint8Array||ArrayBuffer.isView(i)&&i.constructor.name==="Uint8Array"&&i.BYTES_PER_ELEMENT===1,Jt=(i,e,t="")=>{if(Tc(i)&&(e===void 0||i.length===e))return i;const n=Tc(i),s=e!==void 0?` of length ${e}`:"",r=n?`length=${i.length}`:`type=${typeof i}`,o=(t?`"${t}" `:"")+"expected Uint8Array"+s+", got "+r;throw n?new RangeError(o):new TypeError(o)},td=i=>Uint8Array.from(i),nd=(i,e,t)=>td(Jt(i,t,e)),gh=(i,e)=>i.toString(16).padStart(e,"0"),vh=i=>{let e="";for(const t of Jt(i))e+=gh(t,2);return e},yh=i=>{const e="hex invalid";if(typeof i!="string")throw new TypeError(e);if(i.length%2||!/^[\da-f]*$/i.test(i))throw new RangeError(e);const t=new Uint8Array(i.length/2);for(let n=0,s=0;n<t.length;n++,s+=2){const r=i.charCodeAt(s),o=i.charCodeAt(s+1);t[n]=((r&15)+(r>>6)*9)*16+(o&15)+(o>>6)*9}return t},Ac=()=>{var e;const i=(e=globalThis==null?void 0:globalThis.crypto)==null?void 0:e.subtle;if(i)return i;throw new Error("crypto.subtle must be defined, consider polyfill")},ji=(...i)=>{let e=0;for(const s of i)e+=Jt(s).length;const t=new Uint8Array(e);let n=0;for(const s of i)t.set(s,n),n+=s.length;return t},Qa=(i=cn)=>{const e=globalThis==null?void 0:globalThis.crypto;if(typeof(e==null?void 0:e.getRandomValues)!="function")throw new Error("crypto.getRandomValues must be defined, consider polyfill");return e.getRandomValues(new Uint8Array(i))},id=BigInt,Vs=(i,e,t,n="bad number: out of range")=>{if(typeof i!="bigint")throw new TypeError(n);if(e<=i&&i<t)return i;throw new RangeError(n)},Le=(i,e=Wn)=>(i%=e)>=0n?i:e+i,Wr=i=>Le(i,zs),sd=(i,e)=>{if(i===0n)throw new Error("invert: expected non-zero number");if(e<=1n)throw new Error("invert: expected modulus > 1, got "+e);let t=Le(i,e),n=e,s=0n,r=1n;for(;t!==0n;){const a=n/t,c=n-t*a,l=s-r*a;n=t,t=c,s=r,r=l}if(n!==1n)throw new Error("invert: does not exist");return Le(s,e)},_h=i=>{const e=cd[i];if(typeof e!="function")throw new Error("hashes."+i+" not set");return e},Rc=(i,e,t)=>Jt(_h(i)(e,t),cn,"digest"),Cc=async(i,e,t)=>Jt(await _h(i)(e,t),cn,"digest"),io=i=>{if(i instanceof jn)return i;throw new TypeError("Point expected")},so="bad point: not on curve",xh=i=>Le(Le(i*i)*i+7n),Pc=i=>Vs(i,0n,Wn),Cs=i=>Vs(i,1n,Wn),Mh=i=>Vs(i,1n,zs),qr=i=>!(i&1n),rd=i=>Uint8Array.of(qr(i)?2:3),Sh=i=>{const e=xh(Cs(i));let t=1n;for(let n=e,s=(Wn+1n)/4n;s>0n;s>>=1n)s&1n&&(t=t*n%Wn),n=n*n%Wn;if(Le(t*t)!==e)throw new Error("sqrt invalid");return new jn(i,qr(t)?t:Le(-t),1n)},wn=class wn{constructor(e,t,n){Vt(this,"X");Vt(this,"Y");Vt(this,"Z");this.X=Pc(e),this.Y=Cs(t),this.Z=Pc(n),Ja(this)}static CURVE(){return ed}static fromAffine(e){const{x:t,y:n}=e;return t===0n&&n===0n?Ps:new wn(t,n,1n)}static fromBytes(e){Jt(e);const t=e.length,n=e[0],s=Or(e,1,33);try{if(t===33&&(n===2||n===3)){const r=Sh(s);return n===3?r.negate():r}if(t===65&&n===4)return new wn(s,Or(e,33,65),1n).assertValidity()}catch{throw new Error(so)}throw new Error(so)}static fromHex(e){return wn.fromBytes(yh(e))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){const{X:t,Y:n,Z:s}=this,{X:r,Y:o,Z:a}=io(e);return Le(t*a)===Le(r*s)&&Le(n*a)===Le(o*s)}is0(){return this.Z===0n}negate(){return new wn(this.X,Le(-this.Y),this.Z)}double(){return this.add(this)}add(e){const{X:t,Y:n,Z:s}=this,{X:r,Y:o,Z:a}=io(e),c=0n,l=7n;let h=0n,u=0n,p=0n;const g=Le(l*3n);let y=Le(t*r),_=Le(n*o),f=Le(s*a),d=Le(t+n),m=Le(r+o);d=Le(d*m),m=Le(y+_),d=Le(d-m),m=Le(t+s);let v=Le(r+a);return m=Le(m*v),v=Le(y+f),m=Le(m-v),v=Le(n+s),h=Le(o+a),v=Le(v*h),h=Le(_+f),v=Le(v-h),p=Le(c*m),h=Le(g*f),p=Le(h+p),h=Le(_-p),p=Le(_+p),u=Le(h*p),_=Le(y+y),_=Le(_+y),f=Le(c*f),m=Le(g*m),_=Le(_+f),f=Le(y-f),f=Le(c*f),m=Le(m+f),y=Le(_*m),u=Le(u+y),y=Le(v*m),h=Le(d*h),h=Le(h-y),y=Le(d*_),p=Le(v*p),p=Le(p+y),new wn(h,u,p)}subtract(e){return this.add(io(e).negate())}multiply(e,t=!0){if(!t&&e===0n)return Ps;if(Mh(e),e===1n)return this;if(this.equals(gi))return gd(e).p;let n=Ps,s=gi,r=this;for(let o=0;t?o<256:e>0n;o++)e&1n?n=n.add(r):t&&(s=s.add(r)),r=r.double(),e>>=1n;return n}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){const{X:e,Y:t,Z:n}=this;if(n===0n)return{x:0n,y:0n};if(n===1n)return{x:e,y:t};const s=sd(n,Wn);if(Le(n*s)!==1n)throw new Error("inverse invalid");return{x:Le(e*s),y:Le(t*s)}}assertValidity(){const{x:e,y:t}=this.toAffine();if(Cs(e),Cs(t),Le(t*t)!==xh(e))throw new Error(so);return this}toBytes(e=!0){const{x:t,y:n}=this.assertValidity().toAffine(),s=Rn(t);return e?ji(rd(n),s):ji(Uint8Array.of(4),s,Rn(n))}toHex(e){return vh(this.toBytes(e))}};Vt(wn,"BASE"),Vt(wn,"ZERO");let jn=wn;const gi=new jn(ph,mh,1n),Ps=new jn(0n,1n,0n);jn.BASE=gi;jn.ZERO=Ps;const od=(i,e,t)=>gi.multiply(e,!1).add(i.multiply(t,!1)).assertValidity(),Mi=i=>id("0x"+(vh(i)||"0")),Or=(i,e,t)=>Mi(i.subarray(e,t)),Rn=i=>yh(gh(Vs(i,0n,2n**256n),cn*2)),ad=i=>{const e=Mi(Jt(i,cn,"secret key"));return Vs(e,1n,zs,"invalid secret key: outside of range")},Lc="SHA-256",cd={hmacSha256Async:async(i,e)=>{const t=Ac(),n=await t.importKey("raw",i,{name:"HMAC",hash:Lc},!1,["sign"]);return new Uint8Array(await t.sign("HMAC",n,e))},hmacSha256:void 0,sha256Async:async i=>new Uint8Array(await Ac().digest(Lc,i)),sha256:void 0},ld=i=>{if(i=i===void 0?Qa(48):i,Jt(i),i.length<48||i.length>1024)throw new RangeError("expected 48-1024b");const e=Le(Mi(i),zs-1n);return Rn(e+1n)},hd=i=>e=>{const t=ld(e);return{secretKey:t,publicKey:i(t)}},wh=i=>Uint8Array.from("BIP0340/"+i,e=>e.charCodeAt(0)),ea=(i,...e)=>{const t=Rc("sha256",wh(i));return Rc("sha256",ji(t,t,...e))},ta=(i,...e)=>Cc("sha256Async",wh(i)).then(t=>Cc("sha256Async",ji(t,t,...e))),ec=i=>{const e=ad(i),t=gi.multiply(e),{x:n,y:s}=t.assertValidity().toAffine(),r=qr(s)?e:Wr(-e),o=Rn(n);return{d:r,px:o}},tc=i=>Wr(Mi(i)),Eh=(...i)=>tc(ea("challenge",...i)),bh=async(...i)=>tc(await ta("challenge",...i)),Th=i=>ec(i).px,ud=hd(Th),Ah=(i,e,t)=>{const n=nd(i,"message"),{px:s,d:r}=ec(e);return{m:n,px:s,d:r,a:Jt(t,cn)}},Rh=i=>{const e=tc(i);if(e===0n)throw new Error("sign failed: k is zero");const{px:t,d:n}=ec(Rn(e));return{rx:t,k:n}},Ch=(i,e,t,n)=>ji(e,Rn(Wr(i+t*n))),Ph="invalid signature produced",dd=(i,e,t=Qa(cn))=>{const{m:n,px:s,d:r,a:o}=Ah(i,e,t),a=Rn(r^Mi(ea("aux",o))),{rx:c,k:l}=Rh(ea("nonce",a,s,n)),h=Ch(l,c,Eh(c,s,n),r);if(!Dh(h,n,s))throw new Error(Ph);return h},fd=async(i,e,t=Qa(cn))=>{const{m:n,px:s,d:r,a:o}=Ah(i,e,t),a=Rn(r^Mi(await ta("aux",o))),{rx:c,k:l}=Rh(await ta("nonce",a,s,n)),h=Ch(l,c,await bh(c,s,n),r);if(!await Ih(h,n,s))throw new Error(Ph);return h},pd=(i,e)=>i instanceof Promise?i.then(e):e(i),Lh=(i,e,t,n)=>{const s=Jt(i,64,"signature"),r=Jt(e,void 0,"message"),o=Jt(t,cn,"publicKey");let a,c,l,h;try{const u=Mi(o);a=Sh(u),c=Cs(Or(s,0,cn)),l=Mh(Or(s,cn,64)),h=ji(Rn(c),o,r)}catch{return!1}return pd(n(h),u=>{try{const{x:p,y:g}=od(a,l,Wr(-u)).toAffine();return!(!qr(g)||p!==c)}catch{return!1}})},Dh=(i,e,t)=>Lh(i,e,t,Eh),Ih=async(i,e,t)=>Lh(i,e,t,bh),Uh=Ja({keygen:ud,getPublicKey:Th,sign:dd,verify:Dh,signAsync:fd,verifyAsync:Ih}),md=()=>{const i=[];let e=gi,t=e;for(let n=0;n<33;n++){t=e,i.push(t);for(let s=1;s<128;s++)t=t.add(e),i.push(t);e=t.double()}return i};let Dc;const Ic=(i,e)=>{const t=e.negate();return i?t:e},gd=i=>{const e=Dc||(Dc=md());let t=Ps,n=gi;for(let s=0;s<33;s++){let r=Number(i&255n);i>>=8n,r>128&&(r-=256,i+=1n);const o=s*128,a=o+Math.abs(r)-1,c=s%2!==0,l=r<0;r===0?n=n.add(Ic(c,e[o])):t=t.add(Ic(l,e[a]))}if(i!==0n)throw new Error("invalid wnaf");return{p:t,f:n}},{floor:na,min:vd,sin:yd}=Math,Pt="Trystero",nc=(i,e)=>Array(i).fill(void 0).map(e),_d="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",Si=i=>nc(i,()=>_d[na(Math.random()*62)]??"").join(""),Ct=Si(20),wi=Promise.all.bind(Promise),Nh=typeof window<"u",{entries:Ki,fromEntries:Fh,keys:on,values:Mn}=Object,wt=()=>{},Oh="candidate",je=i=>(i!==null&&clearTimeout(i),null),$e=i=>new Error(`${Pt}: ${i}`),Zi=(i,e)=>i instanceof Error&&i.message?i.message:typeof i=="string"&&i?i:Ot(i??e),Hn=(i,e)=>i instanceof Error?i:$e(Zi(i,e)),xd=new TextEncoder,Md=new TextDecoder,En=i=>xd.encode(i),mi=i=>Md.decode(i),Ns=i=>i.reduce((e,t)=>e+t.toString(16).padStart(2,"0"),""),Ji=(...i)=>i.join("@"),Sd=(i,e)=>{const t=[...i],n=()=>{const r=yd(e++)*1e4;return r-na(r)};let s=t.length;for(;s;){const r=na(n()*s--),o=t[s];t[s]=t[r],t[r]=o}return t},wd=(i,e,t,n=!1)=>{var s,r;return((s=i.relayConfig)==null?void 0:s.urls)||(n?Sd(e,kh(i.appId)):e).slice(0,((r=i.relayConfig)==null?void 0:r.redundancy)??t)},Ot=JSON.stringify,Gs=i=>{try{return JSON.parse(i)}catch{throw $e(`failed to parse JSON: ${i}`)}},kh=(i,e=Number.MAX_SAFE_INTEGER)=>i.split("").reduce((t,n)=>t+n.charCodeAt(0),0)%e,Uc=3333,Ed=6e4,fs={};let Ls=null,Ds=null;const bd=()=>{Ls||(Ls=new Promise(i=>{Ds=i}).finally(()=>{Ds=null,Ls=null}))},Td=()=>{Ds==null||Ds()},Ad=(i,e,t)=>{const n={};let s=!1,r=!1,o,a=wt;n.isClosed=!1,n.ready=new Promise(l=>a=l);const c=()=>{if(n.isClosed)return;o=void 0,r=!1;const l=new WebSocket(i);l.onclose=()=>{if(n.isClosed||r)return;if(r=!0,Ls){Ls.then(c);return}const h=fs[i]??(fs[i]=Uc);o=setTimeout(c,Math.random()*h),fs[i]=vd(h*2,Ed)},l.onmessage=h=>e(String(h.data)),n.socket=l,n.url=l.url,l.onopen=()=>{const h=s;s=!0,a(n),fs[i]=Uc,h&&(t==null||t())},n.send=h=>{l.readyState===1&&l.send(h)}};return n.close=()=>{n.isClosed=!0,o!==void 0&&(clearTimeout(o),o=void 0),n.socket.close()},c(),n},Rd=i=>{const e={},t=new WeakMap,n=o=>{const a=t.get(o);if(!a)throw $e("relay bookkeeping missing registration for relay client");return a},s=()=>{const o={},a=c=>o[c]??(o[c]={});return{forKey:a,forRelay:c=>a(n(c))}},r=(o,a)=>(e[o]=a,t.set(a,o),a);return{register:(o,a)=>{const c=e[o];return c||r(o,a())},keyOf:n,scoped:s,getSockets:()=>Fh(Ki(e).flatMap(([o,a])=>{const c=i(a);return c?[[o,c]]:[]}))}},Cd=()=>{if(Nh){const i=new AbortController;return addEventListener("online",Td,{signal:i.signal}),addEventListener("offline",bd,{signal:i.signal}),()=>i.abort()}return wt},ic="AES-GCM",ro={},Pd=i=>btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(i)))),Ld=i=>{const e=atob(i);return new Uint8Array(e.length).map((t,n)=>e.charCodeAt(n)).buffer},Xr=async(i,e)=>new Uint8Array(await crypto.subtle.digest(i,En(e))),Qi=async i=>ro[i]??(ro[i]=Array.from(await Xr("SHA-1",i)).map(e=>e.toString(36)).join("")),Dd=async(i,e,t)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},En(`${i}:${e}:${t}`)),{name:ic},!1,["encrypt","decrypt"]),Id=async(i,e)=>Ns(await Xr("SHA-256",`${Pt}:${i}:${e}`)),Bh="$",zh=",",Ud=async(i,e)=>{const t=crypto.getRandomValues(new Uint8Array(16));return t.join(zh)+Bh+Pd(await crypto.subtle.encrypt({name:ic,iv:t},await i,En(e)))},Nd=async(i,e)=>{const[t,n]=e.split(Bh);return mi(await crypto.subtle.decrypt({name:ic,iv:new Uint8Array((t==null?void 0:t.split(zh).map(Number))??[])},await i,Ld(n??"")))},Fd=18e4;var Od=class{constructor(i){Vt(this,"makeOffer");Vt(this,"leased",new Map);Vt(this,"destroyed",!1);this.makeOffer=i}claimLeased(i){const e=this.leased.get(i);e&&(je(e),this.leased.delete(i))}reclaimLeased(i){this.leased.has(i)&&(this.claimLeased(i),i.destroy())}checkout(i,e,t){const n=async(s=!1)=>{if(this.destroyed)throw $e("room left while preparing offer");const r=this.makeOffer();try{const o=await t(r);if(this.destroyed)throw $e("room left while preparing offer");return e?(this.leased.set(r,setTimeout(()=>{this.leased.delete(r),r.destroy()},Fd)),{peer:r,offer:o,claim:()=>this.claimLeased(r),reclaim:()=>this.reclaimLeased(r)}):{peer:r,offer:o}}catch(o){if(r.destroy(),!s&&!this.destroyed)return n(!0);throw o}};return wi(nc(i,()=>n()))}getOffers(i,e){return this.checkout(i,!0,e)}destroy(){this.destroyed=!0,this.leased.forEach((i,e)=>{je(i),e.destroy()}),this.leased.clear()}};const oo=$e("incorrect password for overlapping room"),kd=(i,e,t)=>{const n=o=>Xr("SHA-256",`${o}:${i}:${e}:${t}`).then(Ns),s=async(o,a,c)=>{if(!i)return;if(c){const h=Si(36);await o({__trystero_pw:"challenge",c:h});const{data:u}=await a();if(!u||typeof u!="object"||u.__trystero_pw!=="response"||typeof u.h!="string")throw oo;const p=await n(h);if(u.h!==p)throw oo;return}const{data:l}=await a();if(!l||typeof l!="object"||l.__trystero_pw!=="challenge"||typeof l.c!="string")throw oo;await o({__trystero_pw:"response",h:await n(l.c)})};return{run:s,compose:o=>i||o?async(a,c,l,h)=>{await s(c,l,h),await(o==null?void 0:o(a,c,l,h))}:void 0}},Bd=i=>{const e=Zi(i,"unknown error");return e.startsWith("handshake ")?e:`handshake failed: ${e}`},zd=({onPeerHandshake:i,onHandshakeError:e,handshakeTimeoutMs:t,sendHandshakeData:n,sendHandshakeReady:s,onActivate:r,onFailure:o})=>{const a={},c=(u,p)=>{const g=a[u];!g||p&&g.peer!==p||g.isActive||!g.didLocalHandshakePass||!g.didReceiveRemoteReady||(g.isActive=!0,g.handshakeTimer=je(g.handshakeTimer),r(u,g.peer))},l=(u,p,g)=>{const y=a[u];if(!y||y.peer!==p)return;const _=Bd(g);e==null||e(u,_),o(u,p,$e(_))},h=(u,p)=>{const g=a[u];!g||g.peer!==p||g.isActive||(g.didLocalHandshakePass=!0,s("",u).catch(y=>l(u,p,$e(`failed sending handshake readiness: ${Zi(y,"unknown send failure")}`))),c(u,p))};return{addPeer:(u,p)=>{a[u]={peer:p,isActive:!1,didLocalHandshakePass:!1,didReceiveRemoteReady:!1,handshakeTimer:null,pendingHandshakePayloads:[],handshakeWaiters:[]}},clearPeer:(u,p)=>{const g=a[u];g&&(g.handshakeTimer=je(g.handshakeTimer),g.pendingHandshakePayloads.length=0,g.handshakeWaiters.splice(0).forEach(y=>y.reject(p)),delete a[u])},canReceiveFromPeer:(u,p)=>{const g=a[u];return!!(g&&(g.isActive||p))},start:(u,p)=>{const g=a[u];if(!g||g.peer!==p)return;g.handshakeTimer=setTimeout(()=>l(u,p,$e(`handshake timed out after ${t}ms`)),t);const y=async(d,m)=>{await n(d,u,m)},_=()=>new Promise((d,m)=>{const v=a[u];if(!v||v.peer!==p){m($e("peer disconnected during handshake"));return}const x=v.pendingHandshakePayloads.shift();if(x){d(x);return}v.handshakeWaiters.push({resolve:d,reject:T=>m(T)})}),f=Ct<u;Promise.resolve(i==null?void 0:i(u,y,_,f)).then(()=>h(u,p)).catch(d=>l(u,p,Hn(d,"handshake failed")))},receiveHandshakeData:(u,p,g)=>{const y=a[p];if(!y||y.isActive)return;const _=g===void 0?{data:u}:{data:u,metadata:g},f=y.handshakeWaiters.shift();if(f){f.resolve(_);return}if(y.pendingHandshakePayloads.length>=16){l(p,y.peer,$e("too many pending handshake messages"));return}y.pendingHandshakePayloads.push(_)},receiveHandshakeReady:u=>{const p=a[u];!p||p.isActive||(p.didReceiveRemoteReady=!0,c(u))}}},Vh=16384,ia=1e4,kr=12e4,Vd=15e3,Gd=150,Hd=5e3,Nc="icecandidate",Fc="icegatheringstatechange",Wd="iceconnectionstatechange",ps="offer",qd="answer",Xd=/out of range/i,$d=128,Yd=8192,Oc=i=>i.replace(/ (\S+\.local) (\d+) typ host/g," 127.0.0.1 $2 typ host");var kc=(i,{trickleIce:e,rtcConfig:t,rtcPolyfill:n,turnConfig:s,_test_only_mdnsHostFallbackToLoopback:r})=>{const o=new(n??RTCPeerConnection)({iceServers:Bc.concat(s??[]),...t}),a={},c=new Set,l=[],h=[];let u=null;const p=e!==!1,g=[],y=[];let _,f=!1,d=!1,m=null,v=null,x=!1;const T=X=>{_&&(_(X),_=void 0)},E=()=>v=je(v),b=()=>{var X;x||(x=!0,c.forEach(Q=>Q()),u=je(u),h.length=0,E(),(X=a.close)==null||X.call(a))},R=X=>{X.type===ps&&(T(X),!a.signal&&!o.remoteDescription)||(a.signal?a.signal(X):l.push(X))},w=X=>{const Q=a.signal;a.signal=de=>{Q==null||Q(de),X(de)},l.length>0&&l.splice(0).forEach(de=>{var z;return(z=a.signal)==null?void 0:z.call(a,de)})},M=X=>r?Oc(X):X,L=X=>{if(!r||typeof X.candidate!="string")return X;const Q=Oc(X.candidate);return Q===X.candidate?X:{...X,candidate:Q}},O=X=>{var Q,de;return{type:((Q=X.localDescription)==null?void 0:Q.type)??ps,sdp:M(((de=X.localDescription)==null?void 0:de.sdp)??"")}},S=()=>{var Q,de;const X=(Q=o.remoteDescription)==null?void 0:Q.sdp;return X?((de=X.match(/a=ice-ufrag:([^\s]+)/))==null?void 0:de[1])??null:null},P=()=>{var X,Q;return(((Q=(X=o.remoteDescription)==null?void 0:X.sdp)==null?void 0:Q.match(/^m=/gm))??[]).length},U=X=>{if(!o.remoteDescription)return!1;const Q=P();if(typeof X.sdpMLineIndex=="number"&&Q>0&&X.sdpMLineIndex>=Q)return!1;const de=S();return!(de&&X.usernameFragment&&X.usernameFragment!==de)},I=async X=>{try{return await o.addIceCandidate(X),!0}catch(Q){if(Q instanceof Error&&Xd.test(Q.message)&&typeof X.sdpMLineIndex=="number")return!1;throw Q}},V=X=>{g.length>=$d&&g.shift(),g.push(X)},k=async()=>{if(!o.remoteDescription||g.length===0)return;const X=S(),Q=g.splice(0),de=[];for(const z of Q)if(!(X&&z.usernameFragment&&z.usernameFragment!==X)){if(!U(z)){de.push(z);continue}await I(z)||de.push(z)}de.forEach(V)},F=async X=>{if(U(X)){await I(X)||V(X);return}V(X)},B=X=>{X.binaryType="arraybuffer",X.bufferedAmountLowThreshold=65535;const Q=()=>{console.warn(`${Pt}: invalid or excessive data before handler registration; disconnecting peer`),X.close(),o.close(),b()};X.onmessage=de=>{const z=de.data;if(!x){if(!(z instanceof ArrayBuffer)&&!ArrayBuffer.isView(z)||z.byteLength>16515){Q();return}if(a.data)a.data(z);else{if(h.length>=64){Q();return}u||(u=setTimeout(Q,ia)),h.push(z)}}},X.onopen=()=>{var de;return(de=a.connect)==null?void 0:de.call(a)},X.onclose=b,X.onerror=({error:de})=>{var z;x||(de==null?void 0:de.errorDetail)==="sctp-failure"&&(de.sctpCauseCode===12||/^User-Initiated Abort\b/.test(de.message))||(z=a.error)==null||z.call(a,Hn(de,"data channel error"))}},j=(t==null?void 0:t.iceServers)??Bc.concat(s??[]),se=X=>j.some(({urls:Q})=>(Array.isArray(Q)?Q:[Q]).some(de=>X.test(de))),le=se(/^turns?:/i),H=!le&&se(/^stuns?:/i),ee=le?/\btyp relay\b/:H?/\btyp (?:srflx|relay|prflx)\b/:/\btyp (?:host|srflx|relay|prflx)\b/,he=async X=>(await new Promise(Q=>{let de=null,z=null;const Fe=()=>{je(de),je(z),X.removeEventListener(Fc,ke),X.removeEventListener(Nc,be),c.delete(Fe),Q()},Ne=(Ae="")=>{var D;const ge=`${((D=X.localDescription)==null?void 0:D.sdp)??""}
${Ae}`;ee.test(ge)&&(je(z),z=setTimeout(Fe,Gd))},ke=()=>{X.iceGatheringState==="complete"||x?Fe():Ne()},be=Ae=>{const{candidate:ge}=Ae;ge?Ne(ge.candidate):Fe()};c.add(Fe),de=setTimeout(Fe,Vd),X.addEventListener(Fc,ke),X.addEventListener(Nc,be),ke()}),O(X)),te=async()=>{const X=p?O(o):await he(o);return x||R(X),X};i?(m=o.createDataChannel("data"),B(m)):o.ondatachannel=({channel:X})=>{m=X,B(X)};const Me=async(X=!1)=>{var Q,de;if(o.connectionState==="closed"||!X&&(f||o.signalingState!=="stable")){o.connectionState==="closed"&&T();return}try{return f=!0,X&&(o.remoteDescription&&o.signalingState!=="stable"&&o.signalingState!=="closed"&&((Q=o.localDescription)==null?void 0:Q.type)===ps&&await o.setLocalDescription({type:"rollback"}),typeof o.restartIce=="function"&&o.restartIce()),await o.setLocalDescription(X?await o.createOffer({iceRestart:!0}):void 0),await te()}catch(z){X||T(),(de=a.error)==null||de.call(a,Hn(z,"failed to create local offer"))}finally{f=!1}};o.onnegotiationneeded=async()=>Me(!1),o.onicecandidate=({candidate:X})=>{if(!p||!X)return;const Q=L(typeof X.toJSON=="function"?X.toJSON():{candidate:X.candidate,sdpMid:X.sdpMid,sdpMLineIndex:X.sdpMLineIndex,usernameFragment:X.usernameFragment});R({type:Oh,sdp:JSON.stringify(Q)})};const Ee=()=>{if(o.connectionState==="failed"||o.connectionState==="closed"||o.iceConnectionState==="failed"||o.iceConnectionState==="closed"){b();return}if(o.connectionState==="connected"||o.connectionState==="connecting"||o.iceConnectionState==="connected"||o.iceConnectionState==="completed"||o.iceConnectionState==="checking"){E();return}if(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected"){v||(v=setTimeout(()=>{v=null,(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected")&&b()},Hd));return}};o.onconnectionstatechange=Ee,o.addEventListener(Wd,Ee),o.ontrack=X=>{var de,z;const Q=X.streams[0];if(Q){if(!a.track&&!a.stream){y.push({track:X.track,stream:Q});return}(de=a.track)==null||de.call(a,X.track,Q),(z=a.stream)==null||z.call(a,Q)}};const Te=i?new Promise(X=>{_=X}):Promise.resolve();return i&&queueMicrotask(()=>{var X;!f&&o.signalingState==="stable"&&!o.localDescription&&o.connectionState!=="closed"&&((X=o.onnegotiationneeded)==null||X.call(o,new Event("negotiationneeded")))}),{connection:o,get channel(){return m},get isDead(){return o.connectionState==="closed"},getOffer:async(X=!1)=>{var Q;if(i)return X?Me(!0):_?Te:((Q=o.localDescription)==null?void 0:Q.type)===ps?p?O(o):he(o):Te},async signal(X){var Q,de,z;if(X.type==="candidate"){if(X.sdp.length>Yd)return;try{const Fe=JSON.parse(X.sdp);Fe&&typeof Fe=="object"&&await F(L(Fe))}catch(Fe){(Q=a.error)==null||Q.call(a,Hn(Fe,"failed to parse remote candidate"))}return}if(!((m==null?void 0:m.readyState)==="open"&&!((de=X.sdp)!=null&&de.includes("a=rtpmap"))))try{const Fe={...X,sdp:M(X.sdp)};if(X.type===ps){const Ne=f||o.signalingState!=="stable"&&!d;return Ne&&i?void 0:(Ne&&o.signalingState!=="stable"?await wi([o.setLocalDescription({type:"rollback"}),o.setRemoteDescription(Fe)]):await o.setRemoteDescription(Fe),await k(),await o.setLocalDescription(),await te())}if(X.type===qd){d=!0;try{await o.setRemoteDescription(Fe),await k()}finally{d=!1}}}catch(Fe){(z=a.error)==null||z.call(a,Hn(Fe,"failed to apply remote signal"))}},sendData:X=>m==null?void 0:m.send(X),destroy:()=>{E(),T(),m==null||m.close(),o.close(),f=!1,d=!1,b()},setHandlers:X=>{const{signal:Q,...de}=X;Object.assign(a,de),a.data&&h.length>0&&(u=je(u),h.splice(0).forEach(z=>{var Fe;return(Fe=a.data)==null?void 0:Fe.call(a,z)})),Q&&w(Q),(a.track||a.stream)&&y.length>0&&y.splice(0).forEach(({track:z,stream:Fe})=>{var Ne,ke;(Ne=a.track)==null||Ne.call(a,z,Fe),(ke=a.stream)==null||ke.call(a,Fe)})},addStream:X=>X.getTracks().forEach(Q=>o.addTrack(Q,X)),removeStream:X=>o.getSenders().filter(Q=>Q.track&&X.getTracks().includes(Q.track)).forEach(Q=>o.removeTrack(Q)),addTrack:(X,Q)=>o.addTrack(X,Q),removeTrack:X=>{const Q=o.getSenders().find(de=>de.track===X);Q&&o.removeTrack(Q)},replaceTrack:(X,Q)=>{const de=o.getSenders().find(z=>z.track===X);if(de)return de.replaceTrack(Q)}}};const Bc=[...nc(3,(i,e)=>`stun:stun${e||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(i=>({urls:i})),jd=1024,Kd=64,Zd=128,Jd=8,Qd=new Uint8Array,ef=(i,e)=>{let t;try{t=i()}catch{return e(!1)}return typeof t=="boolean"?e(t):Promise.resolve(t).then(n=>e(n===!0),()=>e(!1))},zc=(i,e,t)=>e===2?t?i.slice():i:e===1?Gs(mi(i)):mi(i),Gh=(i,e,t,n)=>{try{i.progress(e,t,n)}catch(s){console.error(`${Pt} progress handler error:`,s)}},Vc=(i,e,t,n)=>{var s;Gh(i,1,t,n);try{(s=i.receiver)==null||s.call(i,e,t,n)}catch(r){console.error(`${Pt} action handler error:`,r)}},tf=({fail:i,accept:e,refuse:t,maxReceiveBytes:n,chunkSize:s})=>{const r=new Map,o=new Map,a=new Set,c=new Map;let l=0,h=0,u=0,p=!1,g=!1;const y=S=>S.phase!=="released",_=S=>Math.min(n,(S==null?void 0:S.maxPayloadBytes)??n),f=(S,P,U,I)=>{var V,k;U==null||U.reject(P),(k=(V=r.get(S.type))==null?void 0:V.reject)==null||k.call(V,S.peerId,S.metadata,P),I!==void 0&&t(S.peerId,I,P)},d=S=>{for(const P of Array.from(a))P.peerId===S&&(a.delete(P),a.add(P))},m=S=>{var U,I;if(!y(S))return;S.phase="released",(U=S.removeAbortListener)==null||U.call(S),S.timer=je(S.timer);const P=o.get(S.peerId);if(S.kind==="inline"){const V=P.inline.get(S.key);V.splice(V.indexOf(S),1),V.length||P.inline.delete(S.key),S.data=Qd}else P.bulk.delete(S.id),a.delete(S),S.data=null,S.transfer==="receiving"&&(u-=S.size,P.active===S&&(P.active=null,d(S.peerId)),g=!0);P.count--,l--,P.count||o.delete(S.peerId),(I=S.controller)==null||I.abort()},v=(S,P)=>{y(S)&&(m(S),f(S,P,S.scope,S.kind==="bulk"?S.id:void 0))},x=(S,P)=>{if(S.phase!=="pending")return S.phase==="ready";if(S.size>_(P))return v(S,"payload exceeds receiver size limit"),!1;const U=S.scope?S.scope.receive:P.receive;if(!U)return P.receiver?(S.phase="ready",!0):!1;if(h>=Zd||(c.get(S.peerId)??0)>=Jd)return v(S,"too many pending receive decisions"),!1;S.phase="deciding";const I=new AbortController;S.controller=I,h++,c.set(S.peerId,(c.get(S.peerId)??0)+1);const V=ef(()=>U({byteLength:S.size,peerId:S.peerId,signal:I.signal,...S.metadata===void 0?{}:{metadata:S.metadata}}),k=>{h--;const F=c.get(S.peerId)-1;return F?c.set(S.peerId,F):c.delete(S.peerId),y(S)?(k?S.phase="ready":v(S,"payload rejected by receiver"),k):!1});return typeof V=="boolean"?V:(V.then(()=>w()),!1)},T=(S,P,U)=>{let I;try{I=zc(U,S.format,S.kind==="inline")}catch{m(S),i(S.peerId,"invalid action payload");return}m(S),Vc(P,I,S.peerId,S.metadata)},E=S=>{const P=r.get(S.type);y(S)&&P&&x(S,P)&&P.receiver&&T(S,P,S.data)},b=S=>{const P=r.get(S.type);if(!y(S)||!P||!x(S,P)||!P.receiver)return;if(S.transfer==="receiving"){S.offset===S.size&&T(S,P,S.data);return}const U=o.get(S.peerId);!U.active&&u+S.size<=n&&(U.active=S,S.transfer="receiving",u+=S.size,S.lastSeen=Date.now(),a.delete(S),e(S.peerId,S.id))},R=(S,P)=>{var I;const U=(I=o.get(S))==null?void 0:I.inline.get(P);for(;U!=null&&U[0];){const V=U[0];if(E(V),y(V))break}},w=()=>{if(p){g=!0;return}p=!0;try{do{g=!1;for(const S of a)b(S);for(const[S,P]of o){for(const U of P.bulk.values())U.offset===U.size&&b(U);for(const U of P.inline.keys())R(S,U)}}while(g)}finally{p=!1}},M=S=>{let P=o.get(S.peerId);if(l>=jd||((P==null?void 0:P.count)??0)>=Kd)return f(S,"too many pending transfers",S.scope,S.kind==="bulk"?S.id:void 0),!1;if(P||(P={bulk:new Map,inline:new Map,active:null,count:0},o.set(S.peerId,P)),P.count++,l++,S.kind==="inline"){const I=P.inline.get(S.key)??[];I.push(S),P.inline.set(S.key,I)}else P.bulk.set(S.id,S),a.add(S);const U=()=>{const I=kr-(Date.now()-S.lastSeen);I>0?S.timer=setTimeout(U,I):(v(S,"action transfer timed out"),w())};if(S.timer=setTimeout(U,kr),S.scope){const{signal:I}=S.scope,V=()=>{v(S,"receive cancelled"),w()};if(I.addEventListener("abort",V,{once:!0}),S.removeAbortListener=()=>I.removeEventListener("abort",V),I.aborted)return V(),!1}return!0},L=(S,P)=>{var V;const U=r.get(S.type),I=(V=U==null?void 0:U.receiveScope)==null?void 0:V.call(U,S.peerId,S.metadata);return I===null||I!=null&&I.signal.aborted?(P!==void 0&&t(S.peerId,P,"unexpected response"),null):S.size>_(U)?(f(S,"payload exceeds receiver size limit",I,P),null):{action:U,scope:I}},O=(S,P)=>({...S,...P?{scope:P}:{},phase:"pending",controller:null,lastSeen:Date.now(),timer:null});return{register:(S,P={})=>{const U={...P,receiver:null,receive:null,reject:null,progress:wt};return r.set(S,U),{onMessage:I=>{U.receiver=I,w()},onReceive:I=>{U.receive=I,w()},onReject:I=>{U.reject=I},onProgress:I=>{U.progress=I}}},receiveInline:(S,P)=>{var B;const U=L(S);if(!U)return;const{action:I,scope:V}=U,k=V?`${S.type}\0${V.key}`:S.type;if(I!=null&&I.receiver&&!(V?V.receive:I.receive)&&!((B=o.get(S.peerId))!=null&&B.inline.has(k))){let j;try{j=zc(P,S.format,!0)}catch{i(S.peerId,"invalid action payload");return}Vc(I,j,S.peerId,S.metadata);return}const F={...O(S,V),kind:"inline",key:k,data:P};M(F)&&R(S.peerId,k)},receiveOffer:(S,P)=>{var V;if((V=o.get(S.peerId))!=null&&V.bulk.has(P)){i(S.peerId,"duplicate action offer");return}const U=L(S,P);if(!U)return;const I={...O(S,U.scope),kind:"bulk",id:P,transfer:"waiting",offset:0,data:null};M(I)&&w()},receiveChunk:(S,P,U,I)=>{var B;const V=o.get(S),k=V==null?void 0:V.bulk.get(P);if(!k)return;if(k.transfer!=="receiving"||U!==k.offset||!I.length||I.length!==Math.min(s,k.size-k.offset)){i(S,"invalid action chunk offset or length");return}try{k.data??(k.data=new Uint8Array(k.size))}catch{v(k,"unable to allocate receive buffer"),w();return}k.data.set(I,k.offset),k.offset+=I.length;const F=Date.now();k.lastSeen=F;for(const j of a)j.phase==="ready"&&((B=r.get(j.type))!=null&&B.receiver)&&(j.lastSeen=F);k.offset===k.size?(b(k),y(k)&&(V==null?void 0:V.active)===k&&(V.active=null,d(S)),w()):Gh(r.get(k.type),k.offset/k.size,S,k.metadata)},cancel:(S,P)=>{var I,V;const U=(I=o.get(S))==null?void 0:I.bulk.get(P);U&&(m(U),(V=U.scope)==null||V.reject("response cancelled by sender")),w()},clearPeer:S=>{const P=o.get(S);if(P){for(const U of P.bulk.values())m(U);for(const U of P.inline.values()){const I=[...U];for(const V of I)m(V)}}w()}}},sa=2,Ks=0,Zs=1,Gc=2,ao=3,co=4,Js=5,lo=36,Hc=48,Bn=6,bs=14,ho=Vh-bs,nf=256*1024**2,Wc=1024**2,qc="bufferedamountlow",Xc="close",$c="error",sf=1e4,zn=(i,e)=>{const t=$e(e);return t.kind=i,t.name=i==="aborted"?"AbortError":t.name,t},ra=i=>{if(i!=null&&i.aborted)throw zn("aborted","operation aborted")},Yc=(i,e,t=Bn)=>{const n=new Uint8Array(t);return n[0]=sa,n[1]=i,new DataView(n.buffer).setUint32(2,e),n},Ti=zn,rf=(i,e,t=sf)=>i.readyState!=="open"||i.bufferedAmount<=i.bufferedAmountLowThreshold?Promise.resolve(i.readyState==="open"):new Promise(n=>{let s=!1,r=null;const o=l=>{s||(s=!0,i.removeEventListener(qc,a),i.removeEventListener(Xc,c),i.removeEventListener($c,c),e==null||e.removeEventListener("abort",c),je(r),n(l))},a=()=>o(!0),c=()=>o(!1);if(i.addEventListener(qc,a),i.addEventListener(Xc,c),i.addEventListener($c,c),e==null||e.addEventListener("abort",c,{once:!0}),r=setTimeout(()=>o(!1),t),i.readyState!=="open"||e!=null&&e.aborted){o(!1);return}i.bufferedAmount<=i.bufferedAmountLowThreshold&&o(!0)}),of=({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,throwIfAborted:s=ra,maxReceiveBytes:r=nf})=>{if(!Number.isSafeInteger(r)||r<=0)throw $e("maxReceiveBytes must be a positive safe integer");const o=new Map,a=new Map,c=new WeakSet;let l=0;const h=tf({fail:(f,d)=>p(f,d),accept:(f,d)=>g(f,d,ao),refuse:(f,d,m)=>g(f,d,co,m),maxReceiveBytes:r,chunkSize:ho}),u=f=>{var d;for(const m of((d=a.get(f))==null?void 0:d.values())??[])m.fail(Ti("disconnected","peer disconnected"));a.delete(f),h.clearPeer(f)},p=(f,d)=>{const m=i(f,!0);m&&!c.has(m)&&(c.add(m),console.warn(`${Pt}: ${d}; disconnecting peer ${f}`),n(f,$e(d)))},g=(f,d,m,v="")=>{var b;const x=i(f,!0);if(!x)return;const T=En(v).subarray(0,200),E=Yc(m,d,Bn+T.length);E.set(T,Bn);try{if((((b=x.channel)==null?void 0:b.bufferedAmount)??0)>Wc)throw $e("control send buffer is full");x.sendData(E)}catch{p(f,"unable to send action control")}};return{makeInternalAction:(f,d={})=>{const m={sendToPending:!!d.sendToPending,receiveWhilePending:!!d.receiveWhilePending,...d.maxPayloadBytes===void 0?{}:{maxPayloadBytes:d.maxPayloadBytes},...d.receiveScope?{receiveScope:d.receiveScope}:{}},v=o.get(f);if(v){if(v.options.sendToPending!==m.sendToPending||v.options.receiveWhilePending!==m.receiveWhilePending||v.options.receiveScope!==m.receiveScope||v.options.maxPayloadBytes!==m.maxPayloadBytes)throw $e(`action type "${f}" cannot be redefined`);return v.action}const x=En(f);if(!f||f.includes("\0")||x.length>32)throw $e("action type must contain 1–32 UTF-8 bytes and no null characters");const T={options:m,action:{...h.register(f,m),send:async(E,b,R,w,M)=>{if(s(M),E===void 0)throw $e("action data cannot be undefined");const L=E instanceof Blob,O=L||E instanceof ArrayBuffer||ArrayBuffer.isView(E),S=O?2:typeof E=="string"?0:1;let P=L?E:E instanceof ArrayBuffer?new Uint8Array(E):ArrayBuffer.isView(E)?new Uint8Array(E.buffer,E.byteOffset,E.byteLength):En(S===0?E:Ot(E));const U=P instanceof Blob?P.size:P.byteLength,I=R===void 0?new Uint8Array:En(Ot(R));if(I.length>16336)throw $e("action metadata is too large");const V=lo+I.length+U<=Vh;!V&&O&&!(P instanceof Blob)&&(P=P.slice());const k=V?0:l++>>>0,F=V?lo:Hc,B=new Uint8Array(F+I.length+(V?U:0));B[0]=sa,B[1]=(V?Ks:Zs)|S<<4,B.set(x,2);const j=new DataView(B.buffer);j.setUint16(34,I.length),V||(j.setUint32(36,k),j.setFloat64(40,U)),B.set(I,F),V&&B.set(P instanceof Blob?new Uint8Array(await P.arrayBuffer()):P,F+I.length);const se=b?Array.isArray(b)?b:[b]:e(m.sendToPending);await wi([...new Set(se)].map(async le=>{const H=i(le,m.sendToPending);if(!H){console.warn(`${Pt}: no peer with id ${le} found`);return}let ee=null;const he=()=>{var Ae;if(ee)throw ee;if(s(M),i(le,m.sendToPending)!==H||((Ae=H.channel)==null?void 0:Ae.readyState)==="closed")throw Ti("disconnected","peer disconnected")},te=async Ae=>{he();const ge=H.channel;if(ge&&(ge.readyState!=="open"||ge.bufferedAmount>ge.bufferedAmountLowThreshold)){if(!await rf(ge,M))throw s(M),Ti("disconnected","data channel stopped draining");he()}try{H.sendData(Ae)}catch{throw Ti("disconnected","peer disconnected")}};if(V){await te(B),w==null||w(1,le,R);return}let Me=!1,Ee=!1,Te=Date.now(),X,Q;const de=new Promise((Ae,ge)=>{X=Ae,Q=ge});de.catch(wt);const z=a.get(le)??new Map;if(z.has(k))throw $e("action transmission id is still in use");a.set(le,z);let Fe=null;const Ne={accept:()=>!Fe||ee?!1:(Fe=je(Fe),X(),!0),fail:(Ae,ge=!1)=>{ge&&(Ee=!0),ee=Ae,Q(Ae)},touch:()=>{Fe&&(Te=Date.now())}};z.set(k,Ne);const ke=()=>{const Ae=kr-(Date.now()-Te);Ae>0?Fe=setTimeout(ke,Ae):Ne.fail(Ti("timeout","action offer timed out"))};Fe=setTimeout(ke,kr);const be=()=>{try{s(M)}catch(Ae){Ne.fail(Ae)}};M==null||M.addEventListener("abort",be,{once:!0});try{await te(B),Me=!0,await de;for(let Ae=0;Ae<U;Ae+=ho){he();const ge=Math.min(ho,U-Ae),D=Yc(Gc,k,bs+ge);new DataView(D.buffer).setFloat64(Bn,Ae),D.set(P instanceof Blob?new Uint8Array(await P.slice(Ae,Ae+ge).arrayBuffer()):P.subarray(Ae,Ae+ge),bs),await te(D);for(const A of z.values())A.touch();w==null||w((Ae+ge)/U,le,R)}he()}catch(Ae){throw Me&&!Ee&&i(le,!0)===H&&(!H.channel||H.channel.readyState==="open"&&(H.channel.bufferedAmount??0)<=Wc)&&g(le,k,Js),Ae}finally{Fe=je(Fe),M==null||M.removeEventListener("abort",be),z.delete(k),!z.size&&a.get(le)===z&&a.delete(le)}}))}}};return o.set(f,T),T.action},handleData:(f,d)=>{var U,I,V;if(d.byteLength<2||d.byteLength>16384){p(f,"invalid action frame");return}const m=new Uint8Array(d);if(m[0]!==sa){p(f,"incompatible action protocol version");return}const v=m[1]&15,x=m[1]>>>4,T=new DataView(m.buffer,m.byteOffset,m.byteLength);if(v>Js||x>2||v>Zs&&x!==0){p(f,"invalid action frame");return}if(v>=Gc){if(m.length<Bn||(v===ao||v===Js)&&m.length!==Bn||v===co&&m.length>206){p(f,"invalid action control");return}const k=T.getUint32(2);if(v===ao){const F=a.get(f);if((U=F==null?void 0:F.get(k))!=null&&U.accept())for(const B of F.values())B.touch();return}if(v===co){(V=(I=a.get(f))==null?void 0:I.get(k))==null||V.fail(Ti("rejected",mi(m.subarray(Bn))),!0);return}v===Js?h.cancel(f,k):h.receiveChunk(f,k,m.length>=bs?T.getFloat64(Bn):NaN,m.subarray(bs));return}const E=v===Ks?lo:Hc;if(m.length<E){p(f,"invalid action header");return}const b=mi(m.subarray(2,34)).replaceAll("\0",""),R=o.get(b);if(!t(f,!!(R!=null&&R.options.receiveWhilePending)))return;const w=T.getUint16(34),M=E+w,L=v===Ks?m.length-M:T.getFloat64(40),O=v===Zs?T.getUint32(36):0;if(!b||M>m.length||!Number.isSafeInteger(L)||L<0||v===Zs&&(L===0||M!==m.length)){p(f,"invalid action proposal");return}let S;try{w&&(S=Gs(mi(m.subarray(E,M))))}catch{p(f,"invalid action metadata");return}const P={peerId:f,type:b,format:x,size:L,...S===void 0?{}:{metadata:S}};v===Ks?h.receiveInline(P,m.subarray(M)):h.receiveOffer(P,O)},clearPeer:u}},Hh=i=>i&&typeof i=="object"&&!Array.isArray(i)&&typeof i.r=="string"?i:null,Qs=i=>{const e=Hh(i);return e?{r:e.r,...Object.hasOwn(e,"m")?{m:e.m}:{}}:null},uo=i=>{const e=Hh(i);return e?{r:e.r,...typeof e.e=="string"?{e:e.e}:{}}:null},ms=(i,e)=>e===void 0?i:{...i,metadata:e},af=({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,maxReceiveBytes:s})=>{const r=Object.create(null),o={},a=new Map,c=of({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,...s===void 0?{}:{maxReceiveBytes:s}}),l=c.makeInternalAction,h=c.handleData,u=f=>{const d=o[f];d&&(je(d.timer),d.signal&&d.abortHandler&&d.signal.removeEventListener("abort",d.abortHandler),delete o[f],d.controller.abort())},p=(f,d)=>{Ki(o).forEach(([m,v])=>{v.peerId===f&&(u(m),v.reject(d))})},g=(f,d)=>{c.clearPeer(f);const m=a.get(f);m&&(a.delete(f),m.forEach(v=>v.abort())),p(f,zn("disconnected",Zi(d,"peer disconnected")))},y=l("@_response",{receiveScope:(f,d)=>{const m=uo(d),v=m&&o[m.r];if(!m||!v||v.peerId!==f)return null;const x=m.e===void 0?v.getReceive():null;return{key:m.r,signal:v.controller.signal,receive:x?T=>x({byteLength:T.byteLength,peerId:T.peerId,kind:"response",signal:T.signal}):null,reject:T=>{o[m.r]===v&&(u(m.r),v.reject(zn("rejected",T)))}}}});return y.onProgress((f,d,m)=>{var T;const v=uo(m),x=v&&o[v.r];x&&x.peerId===d&&(v==null?void 0:v.e)===void 0&&((T=x.getReceiveProgress())==null||T(f,{peerId:d}))}),y.onMessage((f,d,m)=>{const v=uo(m);if(!v)return;const x=o[v.r];if(!(!x||x.peerId!==d)){if(u(v.r),v.e!==void 0){x.reject(zn("rejected",v.e));return}x.resolve(f)}}),{makeAction:(f,d)=>{if(d&&"onRequest"in d&&d.kind!=="request")throw $e('request actions must use kind: "request"');const m=(d==null?void 0:d.kind)??"message",v=l(f),x=r[f];if(x){if(x.kind!==m)throw $e(`action type "${f}" cannot be redefined`);return x.action}const T={kind:m,action:null,onReceive:(d==null?void 0:d.onReceive)??null,onReceiveProgress:(d==null?void 0:d.onReceiveProgress)??null},E=(S,P)=>S?(U,I)=>S(U,ms({peerId:I},P)):void 0,b=(S,P,U)=>{var V;const I=T.kind==="request"?Qs(U):null;(V=T.onReceiveProgress)==null||V.call(T,S,ms({peerId:P},I?I.m:U))},R=S=>{T.onReceive=S,v.onReceive(S?P=>{const U=m==="request"?Qs(P.metadata):null;return S(ms({byteLength:P.byteLength,peerId:P.peerId,signal:P.signal,kind:m},U?U.m:P.metadata))}:null)};if(R(T.onReceive),v.onProgress(b),m==="message"){let S=(d==null?void 0:d.onMessage)??null;const P=(I,V,k)=>{const F=S;Promise.resolve().then(()=>F(I,ms({peerId:V},k))).catch(B=>console.error(`${Pt} action handler error:`,B))},U={send:async(I,V={})=>{await v.send(I,V.target,V.metadata,E(V.onProgress,V.metadata),V.signal)},get onMessage(){return S},set onMessage(I){S=I,v.onMessage(I?P:null)},get onReceive(){return T.onReceive},set onReceive(I){R(I)},get onReceiveProgress(){return T.onReceiveProgress},set onReceiveProgress(I){T.onReceiveProgress=I}};return T.action=U,r[f]=T,v.onMessage(S?P:null),U}v.onReject((S,P,U)=>{const I=Qs(P);I&&y.send(null,S,{r:I.r,e:U}).catch(wt)});let w=(d==null?void 0:d.onRequest)??null;const M=(S,P,U)=>{const I=Qs(U);if(!I)return;const V=w,k=new AbortController;let F=a.get(P);F||(F=new Set,a.set(P,F)),F.add(k),Promise.resolve().then(async()=>{const B=await V(S,{...ms({peerId:P},I.m),signal:k.signal});if(B===void 0)throw $e("request handler returned undefined");return B}).then(B=>y.send(B,P,{r:I.r}),B=>y.send(null,P,{r:I.r,e:Zi(B,"request failed").slice(0,512)})).catch(wt).finally(()=>{const B=a.get(P);B==null||B.delete(k),B&&!B.size&&a.delete(P),k.abort()})},L=async(S,P)=>{const{target:U,metadata:I,onProgress:V,signal:k,timeoutMs:F}=P;if(ra(k),!i(U,!1))throw zn("disconnected",`no active peer with id ${U}`);const B=Si(20),j=new AbortController,se=new Promise((le,H)=>{const ee={controller:j,getReceive:()=>T.onReceive,getReceiveProgress:()=>T.onReceiveProgress,peerId:U,resolve:le,reject:H,timer:null,...k===void 0?{}:{signal:k}},he=()=>{u(B),H(zn("aborted","operation aborted"))};k&&(ee.abortHandler=he,k.addEventListener("abort",he,{once:!0})),o[B]=ee,F!==void 0&&(ee.timer=setTimeout(()=>{u(B),ee.reject(zn("timeout","request timed out"))},F))});try{const le=v.send(S,U,I===void 0?{r:B}:{r:B,m:I},E(V,I),j.signal);return await Promise.race([se,le.then(()=>se)])}finally{u(B)}},O={request:L,requestMany:async(S,P)=>{const{targets:U,onResult:I,...V}=P;return ra(V.signal),await wi(U.map(async k=>{try{const F={peerId:k,status:"fulfilled",value:await L(S,{...V,target:k})};return I==null||I(F),F}catch(F){const B=Hn(F,"request failed");if(B.kind==="aborted"||!B.kind)throw B;const j=B.kind==="timeout"?{peerId:k,status:"timeout"}:B.kind==="disconnected"?{peerId:k,status:"disconnected"}:{peerId:k,status:"rejected",error:B};return I==null||I(j),j}}))},get onRequest(){return w},set onRequest(S){w=S,v.onMessage(S?M:null)},get onReceive(){return T.onReceive},set onReceive(S){R(S)},get onReceiveProgress(){return T.onReceiveProgress},set onReceiveProgress(S){T.onReceiveProgress=S}};return T.action=O,r[f]=T,v.onMessage(w?M:null),O},makeInternalAction:l,handleData:h,clearPeer:g}},jc=i=>i&&typeof i=="object"&&!Array.isArray(i)&&typeof i.k=="string"?{key:i.k,...typeof i.s=="string"?{streamId:i.s}:{},...typeof i.t=="string"?{trackId:i.t}:{},...Object.hasOwn(i,"m")?{metadata:i.m}:{}}:null,Kc=i=>e=>{let t=i.get(e);return t||(t=Si(20),i.set(e,t)),t},oa=()=>{const i=new WeakMap,e=new WeakMap,t=new Map,n=new Map,s=new Map,r=new Map,o=new WeakMap,a=new WeakMap;return{getStreamKey:Kc(i),getTrackKey:Kc(e),rememberRemoteStream:(c,l,h)=>{var p;const u=o.get(l);u!==void 0&&t.get(u)===l&&t.delete(u),o.set(l,c),t.set(c,l),h&&n.set(h,l),(p=l.getTracks)==null||p.call(l).forEach(g=>{typeof g.id=="string"&&r.set(g.id,{track:g,stream:l})})},getRemoteStream:(c,l)=>t.get(c)??(l?n.get(l):void 0),rememberRemoteTrack:(c,l,h,u,p)=>{var _;const g={track:l,stream:h},y=a.get(l);y!==void 0&&((_=s.get(y))==null?void 0:_.track)===l&&s.delete(y),a.set(l,c),s.set(c,g),u&&r.set(u,g),p&&n.set(p,h)},getRemoteTrack:(c,l)=>s.get(c)??(l?r.get(l):void 0),hasRemoteMedia:()=>t.size>0||s.size>0,clearRemote:()=>{t.clear(),n.clear(),s.clear(),r.clear()}}},cf=({iterate:i,isActive:e,getSharedMediaPeer:t,onPeerError:n})=>{const s={},r={},o={},a=oa(),c=_=>{var f;return((f=t(_))==null?void 0:f.__trysteroMedia)??o[_]??(o[_]=oa())},l=(_,f,d,m)=>{const v=_[f]??(_[f]=[]);if(v.length>=64){console.warn(`${Pt}: too many pending ${m} metadata messages`),n(f,$e("too many pending media metadata messages"));return}v.push(d)},h=(_,f,d)=>{if(!(_!=null&&_.length))return;const m=f?_.findIndex(v=>{const x=d(v);return!x||x===f}):0;return m>=0?_.splice(m,1)[0]:void 0},u=(_,f,d,m)=>{var v;e(_)&&(c(_).rememberRemoteStream(f,d,typeof d.id=="string"?d.id:void 0),(v=y.onPeerStream)==null||v.call(y,d,_,m))},p=(_,f,d,m,v)=>{var x;e(_)&&(c(_).rememberRemoteTrack(f,d,m,typeof d.id=="string"?d.id:void 0,typeof m.id=="string"?m.id:void 0),(x=y.onPeerTrack)==null||x.call(y,d,m,_,v))},g=(_,f,d,m,v,x={})=>{const T={k:f,...x,...d===void 0?{}:{m:d}};return i(_,async(E,b)=>{await m(T,E),await v(b)})},y={addStream:(_,f,d)=>g(f.target,a.getStreamKey(_),f.metadata,d,m=>m.addStream(_),{s:_.id}),removeStream:(_,f)=>{i(f,(d,m)=>m.removeStream(_))},addTrack:(_,f,d,m)=>g(d.target,a.getTrackKey(_),d.metadata,m,v=>v.addTrack(_,f),{s:f.id,t:_.id}),removeTrack:(_,f)=>{i(f,(d,m)=>m.removeTrack(_))},replaceTrack:(_,f,d,m)=>g(d.target,a.getTrackKey(f),d.metadata,m,v=>v.replaceTrack(_,f),{t:_.id}),receiveStreamMeta:(_,f)=>{if(!e(f))return;const d=jc(_);if(!d)return;const m=c(f).getRemoteStream(d.key,d.streamId);if(m!=null&&m.getTracks().length){u(f,d.key,m,d.metadata);return}l(s,f,d,"stream")},receiveTrackMeta:(_,f)=>{if(!e(f))return;const d=jc(_);if(!d)return;const m=c(f).getRemoteTrack(d.key,d.trackId);if(m&&m.track.readyState!=="ended"&&(!m.stream.getTracks||m.stream.getTracks().includes(m.track))){p(f,d.key,m.track,m.stream,d.metadata);return}l(r,f,d,"track")},receiveRemoteStream:(_,f)=>{if(!e(_))return;const d=h(s[_],typeof f.id=="string"?f.id:void 0,m=>m.streamId);d&&u(_,d.key,f,d.metadata)},receiveRemoteTrack:(_,f,d)=>{if(!e(_))return;const m=r[_],v=typeof f.id=="string"?f.id:void 0,x=typeof d.id=="string"?d.id:void 0,T=m&&v?m.findIndex(b=>b.trackId===v):-1,E=T>=0?m==null?void 0:m.splice(T,1)[0]:h(m,x,b=>b.streamId);E&&p(_,E.key,f,d,E.metadata)},clearPeer:_=>{delete s[_],delete r[_],delete o[_]},onPeerStream:null,onPeerTrack:null};return y},Zc="beforeunload",lf=1e4,Dn=i=>"@_"+i,Ts=new Set,Jc=()=>Ts.forEach(i=>i()),hf=i=>(Ts.add(i),Ts.size===1&&addEventListener(Zc,Jc),()=>{Ts.delete(i),Ts.size||removeEventListener(Zc,Jc)});var uf=(i,e,t,{onPeerHandshake:n,onHandshakeError:s,handshakeTimeoutMs:r=lf,maxReceiveBytes:o,isPassive:a=!1,onBeforeLeave:c}={})=>{const l={},h={},u={},p={onPeerJoin:null,onPeerLeave:null};let g=wt,y=null;const _=(F,B)=>(F?Array.isArray(F)?F:[F]:on(h)).flatMap(j=>{const se=h[j];return se?[Promise.resolve(B(j,se))]:(console.warn(`${Pt}: no peer with id ${j} found`),[])}),f=(F,B,j)=>{const se=l[F];!se||B&&se!==B||(U.send("",F).catch(wt),R(F,se,j))},d=(F,B)=>f(F,void 0,B),m=cf({onPeerError:d,iterate:(F,B)=>_(F,(j,se)=>B(j,se)),isActive:F=>!!h[F],getSharedMediaPeer:F=>l[F]??null}),v=af({onPeerError:d,...o===void 0?{}:{maxReceiveBytes:o},getPeer:(F,B)=>(B?l:h)[F],getPeerIds:F=>on(F?l:h),canReceiveFromPeer:(F,B)=>k.canReceiveFromPeer(F,B)}),x=v.makeInternalAction,T=v.handleData,E=v.makeAction,b=(F,B=$e("peer disconnected"))=>{var se;const j=Hn(B,"peer disconnected");k.clearPeer(F,j),delete l[F],delete h[F],v.clearPeer(F,j),(se=u[F])==null||se.splice(0).forEach(le=>le.reject(j)),delete u[F],m.clearPeer(F)},R=(F,B,j)=>{var H;const se=l[F];if(!se||B&&se!==B)return;const le=!!h[F];b(F,j),se.destroy(),le&&((H=p.onPeerLeave)==null||H.call(p,F)),e(F)},w=()=>y??(y=(async()=>{c==null||c();const F=new AbortController;U.send("",void 0,void 0,void 0,F.signal).catch(wt),await new Promise(B=>setTimeout(B,99)),F.abort();try{Ki(l).forEach(([B,j])=>{j.destroy(),b(B,$e("room left"))})}finally{try{g()}finally{t()}}})()),M=x(Dn("ping")),L=x(Dn("pong")),O=x(Dn("signal")),S=x(Dn("stream"),{maxPayloadBytes:65536}),P=x(Dn("track"),{maxPayloadBytes:65536}),U=x(Dn("leave"),{sendToPending:!0,receiveWhilePending:!0}),I=x(Dn("hsdata"),{sendToPending:!0,receiveWhilePending:!0,maxPayloadBytes:65536}),V=x(Dn("hsready"),{sendToPending:!0,receiveWhilePending:!0}),k=zd({...n===void 0?{}:{onPeerHandshake:n},...s===void 0?{}:{onHandshakeError:s},handshakeTimeoutMs:r,sendHandshakeData:I.send,sendHandshakeReady:V.send,onActivate:(F,B)=>{var j;h[F]=B,B.setHandlers({signal:se=>{h[F]===B&&O.send(se,F).catch(wt)}}),(j=p.onPeerJoin)==null||j.call(p,F)},onFailure:(F,B,j)=>f(F,B,j)});return M.onMessage((F,B)=>{L.send("",B).catch(wt)}),L.onMessage((F,B)=>{var se;const j=u[B];(se=j==null?void 0:j.shift())==null||se.resolve(),j&&!j.length&&delete u[B]}),O.onMessage((F,B)=>{var j;(j=h[B])==null||j.signal(F)}),S.onMessage((F,B)=>m.receiveStreamMeta(F,B)),P.onMessage((F,B)=>m.receiveTrackMeta(F,B)),U.onMessage((F,B)=>R(B,void 0,$e("peer left room"))),I.onMessage((F,B,j)=>k.receiveHandshakeData(F,B,j)),V.onMessage((F,B)=>k.receiveHandshakeReady(B)),i((F,B)=>{const j=l[B];if(j){if(j===F)return;j.destroy(),b(B,$e("peer replaced"))}l[B]=F,k.addPeer(B,F),F.setHandlers({data:se=>{l[B]===F&&T(B,se)},stream:se=>m.receiveRemoteStream(B,se),track:(se,le)=>m.receiveRemoteTrack(B,se,le),close:()=>R(B,F,$e("peer disconnected")),error:se=>{console.error(`${Pt} peer error:`,se),R(B,F,se)}}),k.start(B,F)}),Nh&&(g=hf(()=>w().catch(wt))),{makeAction:E,leave:w,ping:async F=>{if(!h[F])throw $e(`no active peer with id ${F}`);const B=Date.now();return await new Promise((j,se)=>{const le=u[F]??(u[F]=[]),H=()=>{const he=u[F];if(!he)return;const te=he.indexOf(ee);te>-1&&he.splice(te,1),he.length||delete u[F]},ee={resolve:()=>{H(),j()},reject:he=>{H(),se(he)}};le.push(ee),M.send("",F).catch(he=>ee.reject(Hn(he,"peer disconnected")))}),Date.now()-B},isPassive:()=>a,getPeers:()=>Fh(Ki(h).map(([F,B])=>[F,B.connection])),addStream:(F,B={})=>m.addStream(F,B,S.send),removeStream:(F,B={})=>{m.removeStream(F,B.target)},addTrack:(F,B,j={})=>m.addTrack(F,B,j,P.send),removeTrack:(F,B={})=>{m.removeTrack(F,B.target)},replaceTrack:(F,B,j={})=>m.replaceTrack(F,B,j,P.send),get onPeerJoin(){return p.onPeerJoin},set onPeerJoin(F){p.onPeerJoin=F,F&&on(h).forEach(B=>F(B))},get onPeerLeave(){return p.onPeerLeave},set onPeerLeave(F){p.onPeerLeave=F},get onPeerStream(){return m.onPeerStream},set onPeerStream(F){m.onPeerStream=F},get onPeerTrack(){return m.onPeerTrack},set onPeerTrack(F){m.onPeerTrack=F}}};const Wh=1,qh=2,Qc=(i,e)=>{const t=En(i),n=new Uint8Array(3+t.byteLength+e.byteLength);return n[0]=Wh,n[1]=t.byteLength>>>8&255,n[2]=t.byteLength&255,n.set(t,3),n.set(e,3+t.byteLength),n},df=(i,e)=>{const t=En(i),n=new Uint8Array(4+t.byteLength);return n[0]=qh,n[1]=Number(e),n[2]=t.byteLength>>>8&255,n[3]=t.byteLength&255,n.set(t,4),n},el=(i,e)=>{if(i.byteLength<e+2)return null;const t=(i[e]??0)<<8|(i[e+1]??0),n=e+2+t;return t<=0||t>128||i.byteLength<n?null:{roomToken:mi(i.subarray(e+2,n)),headerSize:n}},ff=i=>{const e=new Uint8Array(i);if(e.byteLength<3||e.byteLength>16515)return null;if(e[0]===Wh){const t=el(e,1);return t?{type:"room",roomToken:t.roomToken,payload:e.subarray(t.headerSize).slice().buffer}:null}if(e[0]===qh){const t=el(e,2);return t?{type:"presence",roomToken:t.roomToken,isPresent:e[1]===1}:null}return null},Pr=i=>{const{connection:e,channel:t}=i;return i.isDead||e.connectionState==="closed"||e.connectionState==="failed"||e.iceConnectionState==="closed"||e.iceConnectionState==="failed"||(t==null?void 0:t.readyState)==="closing"||(t==null?void 0:t.readyState)==="closed"},pf=i=>{if(Pr(i))return"stale";const{channel:e}=i;return!e||e.readyState!=="open"?"transient":"live"};var mf=class{constructor(){Vt(this,"rooms",new Map);Vt(this,"unclaimedDataTimers",new WeakMap);Vt(this,"pendingDataTimers",new WeakMap);Vt(this,"byApp",{})}registerRoom(i,e,t,n){const s=this.rooms.get(i)??new Map;if(s.has(e))throw $e("room membership already registered");const r={token:null,tokenPromise:t,...n};s.set(e,r),this.rooms.set(i,s);const o=()=>{var c;return((c=this.rooms.get(i))==null?void 0:c.get(e))===r},a=c=>{if(r.token)for(const l of Mn(this.byApp[i]??{}))try{this.sendRoomPresence(l,r.token,c)}catch{}};return t.then(c=>{if(o()){r.token=c;for(const l of Mn(this.byApp[i]??{}))l.remoteRoomTokens.has(c)&&this.attachRoom(i,e,r,l),this.discardUnboundData(l);o()&&r.active&&a(!0)}}),{connect:(c,l,h)=>{if(!o()){l.destroy();return}const u=this.reusable(i,c);u&&u.peer!==l&&l.destroy();const p=u??this.register(i,c,l,h);if(this.attachRoom(i,e,r,p),!u)for(const g of s.values())g.active&&g.token&&this.sendRoomPresence(p,g.token,!0)},reuse:c=>{if(!o())return!1;const l=this.reusable(i,c);return l?(this.attachRoom(i,e,r,l),!0):!1},setActive:c=>{!o()||r.active===c||(r.active=c,a(c))},leave:()=>{var c,l;if(o()){s.delete(e),s.size||this.rooms.delete(i),a(!1);for(const h of Mn(this.byApp[i]??{})){const u=h.bindings[e];(l=u==null?void 0:(c=u.handlers).close)==null||l.call(c),u==null||u.detach(),this.discardUnboundData(h)}}}}}owns(i,e,t){var n,s;return((s=(n=this.byApp[i])==null?void 0:n[e])==null?void 0:s.peer)===t}reusable(i,e){var n;const t=(n=this.byApp[i])==null?void 0:n[e];if(t&&Pr(t.peer)){this.clear(i,e,{destroyPeer:!0});return}return t}attachRoom(i,e,t,n){var o;if(((o=this.rooms.get(i))==null?void 0:o.get(e))!==t||n.isClosing||this.get(i,n.peerId)!==n)return;const{proxy:s,isNew:r}=this.bind(e,t.tokenPromise,n,{onDetach:()=>t.onDetach(n.peerId,n.peer)});r&&t.onPeer(s,n.peerId,n.peer)}get(i,e){var t;return(t=this.byApp[i])==null?void 0:t[e]}sendRoomPresence(i,e,t){i.isClosing||Pr(i.peer)||i.peer.sendData(df(e,t))}clear(i,e,{destroyPeer:t}){const n=this.byApp[i],s=n==null?void 0:n[e];if(!s||s.isClosing)return;s.idleTimer=je(s.idleTimer),this.clearDataTimers(s),s.isClosing=!0,t&&!s.peer.isDead&&s.peer.destroy();const r=Mn(s.bindings);s.bindings={},s.bindingsByToken={},s.controlRoomId=null,delete n[e],r.forEach(o=>{var a,c;(c=(a=o.handlers).close)==null||c.call(a),o.pendingData.length=0,o.pendingSendData.length=0,o.pendingTracks.length=0}),s.media.clearRemote(),s.pendingDataByToken.clear(),s.remoteRoomTokens.clear(),on(n).length===0&&delete this.byApp[i]}register(i,e,t,n){var a,c;const s=(a=this.byApp[i])==null?void 0:a[e];if(s){if(s.idleTimer=je(s.idleTimer),s.peer===t)return s;this.clear(i,e,{destroyPeer:!0})}const r={appId:i,peerId:e,peer:t,bindings:{},bindingsByToken:{},pendingDataByToken:new Map,remoteRoomTokens:new Set,idleTimer:null,controlRoomId:null,streamOwners:new Map,trackOwners:new Map,media:oa(),idleMs:n,isClosing:!1};((c=this.byApp)[i]??(c[i]={}))[e]=r;const o=()=>{this.owns(i,e,t)&&this.clear(i,e,{destroyPeer:!0})};return t.setHandlers({data:l=>this.dispatchData(r,l),signal:l=>this.dispatchSignal(r,l),close:o,error:l=>{console.error(`${Pt} peer error:`,l),o()},track:(l,h)=>this.dispatchTrack(r,l,h)}),r}bind(i,e,t,{onDetach:n}){const s=t.bindings[i];if(s)return t.idleTimer=je(t.idleTimer),{proxy:s.proxy,isNew:!1};const r={roomId:i,roomToken:null,roomTokenPromise:e,handlers:{},pendingData:[],pendingSendData:[],pendingTracks:[],detach:wt,proxy:{}},o=()=>{if(t.bindings[i]!==r)return;const c=on(t.bindings).length===1&&(t.streamOwners.size>0||t.trackOwners.size>0||t.media.hasRemoteMedia());c||this.pruneRoomOwnership(t,i),delete t.bindings[i],r.roomToken&&t.bindingsByToken[r.roomToken]===r&&delete t.bindingsByToken[r.roomToken],t.controlRoomId===i&&(t.controlRoomId=on(t.bindings)[0]??null),this.discardUnboundData(t),n(),c?this.clear(t.appId,t.peerId,{destroyPeer:!0}):this.scheduleIdleTimer(t)},a={get connection(){return t.peer.connection},get channel(){return t.peer.channel},get isDead(){return t.peer.isDead},getOffer:c=>t.peer.getOffer(c),signal:c=>t.peer.signal(c),sendData:c=>{if(!r.roomToken){r.pendingSendData.push(c);return}t.peer.sendData(Qc(r.roomToken,c))},destroy:()=>o(),setHandlers:c=>{Object.assign(r.handlers,c),this.flushBindingQueues(t,r)},addStream:c=>{const l=t.streamOwners.get(c)??new Set,h=l.size===0;l.add(i),t.streamOwners.set(c,l),h&&t.peer.addStream(c)},removeStream:c=>this.releaseStreamOwner(t,c,i),addTrack:(c,l)=>{const h=t.trackOwners.get(c)??{stream:l,rooms:new Set},u=h.rooms.size===0;return h.stream=l,h.rooms.add(i),t.trackOwners.set(c,h),u?t.peer.addTrack(c,l):t.peer.connection.getSenders().find(p=>p.track===c)??t.peer.addTrack(c,l)},removeTrack:c=>this.releaseTrackOwner(t,c,i),replaceTrack:async(c,l)=>{const h=t.trackOwners.get(c);if(await t.peer.replaceTrack(c,l),h&&t.trackOwners.get(c)===h){t.trackOwners.delete(c);const u=t.trackOwners.get(l)??{stream:h.stream,rooms:new Set};h.rooms.forEach(p=>u.rooms.add(p)),t.trackOwners.set(l,u)}},__trysteroMedia:t.media};return r.proxy=a,r.detach=o,t.bindings[i]=r,t.controlRoomId??(t.controlRoomId=i),t.idleTimer=je(t.idleTimer),e.then(c=>{if(t.isClosing||t.bindings[i]!==r)return;r.roomToken=c,t.bindingsByToken[c]=r;const l=t.pendingDataByToken.get(c);l!=null&&l.length&&(r.pendingData.push(...l),t.pendingDataByToken.delete(c));const h=r.pendingSendData.splice(0);Pr(t.peer)||h.forEach(u=>{try{t.peer.sendData(Qc(c,u))}catch{}}),this.flushBindingQueues(t,r),this.discardUnboundData(t)}),{proxy:a,isNew:!0}}releaseStreamOwner(i,e,t){const n=i.streamOwners.get(e);n&&(n.delete(t),n.size===0&&(i.streamOwners.delete(e),i.peer.removeStream(e)))}releaseTrackOwner(i,e,t){const n=i.trackOwners.get(e);n&&(n.rooms.delete(t),n.rooms.size===0&&(i.trackOwners.delete(e),i.peer.removeTrack(e)))}pruneRoomOwnership(i,e){i.streamOwners.forEach((t,n)=>this.releaseStreamOwner(i,n,e)),i.trackOwners.forEach((t,n)=>this.releaseTrackOwner(i,n,e))}scheduleIdleTimer(i){i.isClosing||on(i.bindings).length>0||(i.idleTimer=je(i.idleTimer),i.idleTimer=setTimeout(()=>{var t;const e=(t=this.byApp[i.appId])==null?void 0:t[i.peerId];!e||on(e.bindings).length>0||this.clear(i.appId,i.peerId,{destroyPeer:!0})},i.idleMs))}getSignalBinding(i){if(i.controlRoomId){const t=i.bindings[i.controlRoomId];if(t!=null&&t.handlers.signal)return t}const e=Mn(i.bindings).find(t=>!!t.handlers.signal);return e?(i.controlRoomId=e.roomId,e):null}flushBindingQueues(i,e){const{handlers:t}=e;if(t.data&&e.pendingData.length>0){const n=e.pendingData.splice(0);this.syncDataTimers(i),n.forEach(s=>{var r;return(r=t.data)==null?void 0:r.call(t,s)})}else this.syncDataTimers(i);(t.track||t.stream)&&e.pendingTracks.length&&e.pendingTracks.splice(0).forEach(({track:n,stream:s})=>{var r,o;(r=t.track)==null||r.call(t,n,s),(o=t.stream)==null||o.call(t,s)})}unclaimedBufferedFrameCount(i){let e=0;for(const t of i.pendingDataByToken.values())e+=t.length;return e}boundBufferedFrameCount(i){let e=0;for(const t of Mn(i.bindings))e+=t.pendingData.length;return e}bufferedFrameCount(i){return this.unclaimedBufferedFrameCount(i)+this.boundBufferedFrameCount(i)}clearDataTimers(i){je(this.unclaimedDataTimers.get(i)),this.unclaimedDataTimers.delete(i),je(this.pendingDataTimers.get(i)),this.pendingDataTimers.delete(i)}syncDataTimers(i){if(i.isClosing){this.clearDataTimers(i);return}this.unclaimedBufferedFrameCount(i)===0?(je(this.unclaimedDataTimers.get(i)),this.unclaimedDataTimers.delete(i)):this.unclaimedDataTimers.has(i)||this.unclaimedDataTimers.set(i,setTimeout(()=>{this.unclaimedDataTimers.delete(i),i.pendingDataByToken.clear()},ia)),this.boundBufferedFrameCount(i)===0?(je(this.pendingDataTimers.get(i)),this.pendingDataTimers.delete(i)):this.pendingDataTimers.has(i)||this.pendingDataTimers.set(i,setTimeout(()=>{this.pendingDataTimers.delete(i),this.boundBufferedFrameCount(i)>0&&this.failData(i,"room data handler timed out")},ia))}canBindRoomToken(i,e){var t;return Mn(i.bindings).some(n=>!n.roomToken)||[...((t=this.rooms.get(i.appId))==null?void 0:t.values())??[]].some(n=>!n.token||n.token===e)}discardUnboundData(i){for(const e of i.pendingDataByToken.keys())this.canBindRoomToken(i,e)||i.pendingDataByToken.delete(e);this.syncDataTimers(i)}failData(i,e){console.warn(`${Pt}: ${e}; disconnecting peer ${i.peerId}`),this.clear(i.appId,i.peerId,{destroyPeer:!0})}dispatchData(i,e){var s,r;if(i.isClosing)return;const t=ff(e);if(!t){this.failData(i,"invalid or incompatible room frame");return}if(t.type==="presence"){if(t.isPresent){if(!i.remoteRoomTokens.has(t.roomToken)&&i.remoteRoomTokens.size>=64){this.failData(i,"too many advertised rooms");return}i.remoteRoomTokens.add(t.roomToken);for(const[o,a]of this.rooms.get(i.appId)??[])a.token===t.roomToken&&this.attachRoom(i.appId,o,a,i)}else{i.remoteRoomTokens.delete(t.roomToken),i.pendingDataByToken.delete(t.roomToken);const o=i.bindingsByToken[t.roomToken];(r=o==null?void 0:(s=o.handlers).close)==null||r.call(s),o==null||o.detach(),this.syncDataTimers(i)}return}const n=i.bindingsByToken[t.roomToken];if(!n){if(!this.canBindRoomToken(i,t.roomToken)||this.bufferedFrameCount(i)>=64)return;const o=i.pendingDataByToken.get(t.roomToken)??[];o.push(t.payload),i.pendingDataByToken.set(t.roomToken,o),this.syncDataTimers(i);return}if(n.handlers.data)n.handlers.data(t.payload);else{if(this.bufferedFrameCount(i)>=64){this.failData(i,"too much data waiting for a room handler");return}n.pendingData.push(t.payload),this.syncDataTimers(i)}}dispatchSignal(i,e){var n,s;const t=this.getSignalBinding(i);t?(s=(n=t.handlers).signal)==null||s.call(n,e):e.type==="offer"&&this.clear(i.appId,i.peerId,{destroyPeer:!0})}dispatchTrack(i,e,t){Mn(i.bindings).forEach(n=>{var s,r,o,a;if(n.handlers.track||n.handlers.stream){(r=(s=n.handlers).track)==null||r.call(s,e,t),(a=(o=n.handlers).stream)==null||a.call(o,t);return}n.pendingTracks.push({track:e,stream:t})})}};const tl=23333,gf=57333,vf=12,yf=7533,_f=23333,Is="offer-placeholder",xf=["offer","answer","candidate"],Xh=i=>{if(typeof i=="string")try{const e=Gs(i);return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch{return null}return i&&typeof i=="object"&&!Array.isArray(i)?i:null},Vn=(i,e)=>typeof i[e]=="string"&&i[e]?i[e]:void 0,$h=i=>!!(i&&typeof i=="object"&&typeof i.signal=="function"&&typeof i.destroy=="function"&&typeof i.setHandlers=="function"),Yh=(i,e=!1)=>xf.some(t=>t in i&&(typeof i[t]!="string"||i[t]===""))||"peer"in i&&(e||i.peer!==void 0&&!$h(i.peer)),Mf=i=>{const e=Xh(i);if(!e||Yh(e,typeof i=="string"))return!1;const t=Vn(e,"peerId");return!!(t&&t!==Ct&&e.passive!==!0&&!Vn(e,"answer")&&!Vn(e,"candidate"))},Sf=(i,e,t,n,s,r)=>{i.toCipher(e).then(o=>{i.isLeaving()||!r()||n(t,Ot(s(o.sdp)))})},wf=()=>({offerPeer:null,offerId:null,offerSdp:null,offerInitPromise:null,offerAnswered:!1,offerRelays:[],offerSignalRelays:[],offerSignalBacklog:[],offerRelayTimers:[],offerExpiryTimer:null,connectedPeer:null,connectedPeerUnhealthySinceMs:null,answeringExpiryTimer:null,answeringPeer:null,answerSent:!1,answerReplay:null,connectionErrorReported:!1}),Ef=i=>{var e;return[...i.turnConfig??[],...((e=i.rtcConfig)==null?void 0:e.iceServers)??[]].some(({urls:t})=>(Array.isArray(t)?t:[t]).some(n=>/^turns?:/i.test(n)))},bf=(i,e)=>`could not connect to peer ${i} after exchanging SDP; ${Ef(e)?"check that your TURN server URLs and credentials are reachable by both peers":"configure TURN servers with turnConfig or rtcConfig.iceServers"}`,$r=(i,e,t)=>{var n;i.isLeaving()||e.connectedPeer||e.connectionErrorReported||(e.connectionErrorReported=!0,(n=i.onJoinError)==null||n.call(i,{error:bf(t,i.config),appId:i.appId,peerId:t,roomId:i.roomId}))},Yr=(i,e)=>i[e]??(i[e]=wf()),Br=new WeakMap,sc=i=>{Br.delete(i),i.answeringExpiryTimer=je(i.answeringExpiryTimer),i.answeringPeer=null,i.answerSent=!1,i.answerReplay=null},Us=(i,e)=>{i.answeringPeer===e&&(sc(i),i.connectedPeer!==e&&!e.isDead&&e.destroy())},Tf=(i,e)=>{i.answeringPeer&&i.answeringPeer!==e&&!i.answeringPeer.isDead&&i.answeringPeer.destroy(),sc(i),i.connectedPeer=e,i.connectedPeerUnhealthySinceMs=null},nl=(i,e)=>{(i==null?void 0:i.connectedPeer)===e&&(i.connectedPeer=null,i.connectedPeerUnhealthySinceMs=null)},aa=(i,e,t)=>{i.connectedPeer&&(i.connectedPeer.isDead||i.connectedPeer.destroy(),i.connectedPeer=null,i.connectedPeerUnhealthySinceMs=null)},rc=(i,e)=>{i.offerRelayTimers[e]=je(i.offerRelayTimers[e]),i.offerRelays[e]&&(i.offerRelays[e]=void 0)},fo=(i,e)=>{(i==null?void 0:i.offerRelays[e])===Is&&rc(i,e)},vi=i=>{Br.delete(i),i.offerExpiryTimer=je(i.offerExpiryTimer),i.offerInitPromise=null,i.offerRelays.forEach((e,t)=>rc(i,t)),i.offerRelays=[],i.offerSignalRelays=[],i.offerRelayTimers=[],i.offerSignalBacklog=[],i.offerPeer&&i.offerPeer!==i.connectedPeer&&(i.offerPeer.isDead||i.offerPeer.destroy()),i.offerPeer=null,i.offerId=null,i.offerSdp=null,i.offerAnswered=!1,i.connectionErrorReported=!1},Af=(i,e,t,n)=>{je(e.answeringExpiryTimer),e.answeringExpiryTimer=setTimeout(()=>{const s=i.peerStates[t];!s||s.connectedPeer||s.answeringPeer!==n||(s.answerSent&&$r(i,s,t),Us(s,n),i.checkDeactivate())},_f)},ca=(i,e,t,n=gf)=>{je(e.offerExpiryTimer);const s=e.offerId;e.offerExpiryTimer=setTimeout(()=>{const r=i.peerStates[t];!r||r.connectedPeer||r.offerId!==s||(r.offerAnswered&&$r(i,r,t),vi(r),i.checkDeactivate())},n)},jh=(i,e,t,n,s)=>{const r=()=>{e.offerPeer===n&&!e.connectedPeer&&(e.offerAnswered&&$r(i,e,t),vi(e)),i.disconnectPeer(n,t),i.checkDeactivate()};n.setHandlers({connect:()=>i.connectPeer(n,t),...s?{signal:s}:{},close:r,error:r})},Rf=(i,e,t)=>{if(e.offerPeer&&e.offerId&&e.offerSdp)return Promise.resolve({peer:e.offerPeer,offer:e.offerSdp,offerId:e.offerId});if(e.offerInitPromise)return e.offerInitPromise;const s=(async()=>{let r;try{r=(await i.offerManager.checkout(1,!1,i.encryptOffer))[0]}catch(c){if(i.isLeaving()||e.offerInitPromise!==s)return null;throw c}if(!r)throw $e("failed to allocate offer peer");const{peer:o,offer:a}=r;return i.isLeaving()||e.offerInitPromise!==s?(o.destroy(),null):(e.offerPeer=o,e.offerId=Si(vf),e.offerSdp=a,e.offerAnswered=!1,e.connectionErrorReported=!1,e.offerSignalBacklog=[],jh(i,e,t,o,c=>{e.offerPeer===o&&(e.offerSignalBacklog.push(c),e.offerSignalRelays.forEach(l=>l==null?void 0:l(c)))}),ca(i,e,t),{peer:o,offer:a,offerId:e.offerId})})().finally(()=>{e.offerInitPromise===s&&(e.offerInitPromise=null)});return e.offerInitPromise=s},Kh=async(i,e,t,n,s=0)=>{const r=i.peerStates[t];if(!r||r.connectedPeer||r.answeringPeer||r.offerAnswered){fo(r,e);return}if(r.offerRelays[e]!==Is)return;const[o,a]=await wi([Qi(Ji(i.rootTopicPlaintext,t)),Rf(i,r,t)]);if(!a){fo(r,e);return}if(i.isLeaving()){vi(r);return}if(r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerRelays[e]!==Is){fo(r,e);return}r.offerRelayTimers[e]=je(r.offerRelayTimers[e]),r.offerRelays[e]=!0,r.offerRelayTimers[e]=setTimeout(()=>{if(s>=2||i.isLeaving()||r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerPeer!==a.peer||r.offerId!==a.offerId){Df(i,t,e);return}r.offerRelays[e]=Is,Kh(i,e,t,n,s+1)},s===0&&i.announceIntervals[e]===void 0?2e3:(i.announceIntervals[e]??i.announceIntervalMs)*.9);let c=!1;r.offerSignalRelays[e]=l=>{c&&(i.isLeaving()||r.connectedPeer||r.offerPeer!==a.peer||r.offerId!==a.offerId||l.type!=="candidate"||Sf(i,l,o,n,h=>({peerId:Ct,offerId:a.offerId,candidate:h,...i.isPassive?{passive:!0}:{}}),()=>!r.connectedPeer&&r.offerPeer===a.peer&&r.offerId===a.offerId))},n(o,Ot({peerId:Ct,offerId:a.offerId,offer:a.offer,...i.isPassive?{passive:!0}:{}})),c=!0,r.offerSignalBacklog.forEach(l=>{var h,u;return(u=(h=r.offerSignalRelays)[e])==null?void 0:u.call(h,l)})},Cf=async(i,e,t,n,s,r)=>{var f;const o=Yr(i.peerStates,t);if(o.answeringPeer||o.offerAnswered){const d=o.answerReplay,m=d==null?void 0:d.lastSentAt[e];if(o.answeringPeer&&!o.answeringPeer.isDead&&d&&d.offer===n&&d.offerId===s&&(m===void 0||Date.now()-m>=1e3)){d.lastSentAt[e]=Date.now();const v=await Qi(Ji(i.rootTopicPlaintext,t));if(!i.isLeaving()&&o.answerReplay===d&&!o.connectedPeer){const x=T=>r(v,T);d.relays[e]=x,d.messages.forEach(x)}}return}const a=!!(o.offerPeer||o.offerRelays.some(Boolean));if(a&&Ct<t)return;a&&vi(o);const c=i.initPeer(!1,i.config),l={offer:n,offerId:s,messages:[],lastSentAt:[],relays:[]};l.lastSentAt[e]=Date.now(),o.answeringPeer=c,o.answerSent=!1,o.answerReplay=l,o.connectionErrorReported=!1,Af(i,o,t,c);const h=()=>{o.answeringPeer===c&&!o.connectedPeer&&o.answerSent&&$r(i,o,t),Us(o,c),i.disconnectPeer(c,t),i.checkDeactivate()};c.setHandlers({connect:()=>i.connectPeer(c,t),close:h,error:h});let u;try{u=await i.toPlain({type:"offer",sdp:n})}catch{Us(o,c),(f=i.onJoinError)==null||f.call(i,{error:"incorrect room password when decrypting offer",appId:i.appId,peerId:t,roomId:i.roomId});return}if(c.isDead){Us(o,c);return}const p=await Qi(Ji(i.rootTopicPlaintext,t));if(i.isLeaving()||o.answerReplay!==l)return;l.relays[e]=d=>r(p,d);const g=[];let y=!1;const _=d=>{i.toCipher(d).then(m=>{if(i.isLeaving()||o.answeringPeer!==c||c.isDead)return;const v={peerId:Ct};d.type==="answer"?(o.answerSent=!0,v.answer=m.sdp):v.candidate=m.sdp,s&&(v.offerId=s),i.isPassive&&(v.passive=!0);const x=Ot(v),T=Date.now();l.messages.push(x),l.relays.forEach((E,b)=>{E&&(l.lastSentAt[b]=T,E(x))}),d.type==="answer"&&!y&&(y=!0,g.splice(0).forEach(_))})};c.setHandlers({signal:d=>{if(!(i.isLeaving()||o.answeringPeer!==c||c.isDead)&&!(d.type!=="answer"&&d.type!=="candidate")){if(d.type==="candidate"&&!y){g.push(d);return}_(d)}}}),await c.signal(u)},Pf=async(i,e,t,n,s)=>{var u;let r;try{r=await i.toPlain({type:Oh,sdp:t})}catch{return}const o=i.peerStates[e],a=n&&(o!=null&&o.offerPeer)&&o.offerId===n?o.offerPeer:null,c=!n||((u=o==null?void 0:o.answerReplay)==null?void 0:u.offerId)===n?o==null?void 0:o.answeringPeer:null,l=!n&&(o!=null&&o.offerPeer)?o.offerPeer:null,h=s&&!s.isDead?s:a??c??l;h&&!h.isDead&&h.signal(r)},Lf=async(i,e,t,n,s)=>{var o;let r;try{r=await i.toPlain({type:"answer",sdp:t})}catch{s&&(i.offerManager.reclaimLeased(s),s.isDead||s.destroy()),(o=i.onJoinError)==null||o.call(i,{error:"incorrect room password when decrypting answer",appId:i.appId,peerId:e,roomId:i.roomId});return}if(s){const a=Yr(i.peerStates,e);if(i.offerManager.claimLeased(s),a.connectedPeer||a.offerAnswered||a.answeringPeer&&!a.answeringPeer.isDead&&Ct>e){s.destroy();return}if(a.answeringPeer){const c=a.answeringPeer;Us(a,c)}vi(a),a.offerPeer=s,a.offerId=n??null,a.offerAnswered=!0,ca(i,a,e,tl),jh(i,a,e,s),s.signal(r)}else{const a=i.peerStates[e];if(!a||!a.offerPeer||a.offerAnswered||n&&a.offerId&&n!==a.offerId||a.offerPeer.isDead)return;a.offerAnswered=!0,ca(i,a,e,tl),a.offerPeer.signal(r)}},Df=(i,e,t)=>{const n=i.peerStates[e];!n||n.connectedPeer||n.offerRelays[t]&&(rc(n,t),i.checkDeactivate())},If=i=>e=>async(t,n,s)=>{var d;if(i.isLeaving())return;const r=Xh(n);if(!r||Yh(r,typeof n=="string"))return;const o=Vn(r,"peerId")??"",a=Vn(r,"offer"),c=Vn(r,"answer"),l=Vn(r,"candidate"),h=Vn(r,"offerId"),u=$h(r.peer)?r.peer:void 0,p=r.passive===!0;if(!o||o===Ct)return;const[g,y]=await wi([i.rootTopicP,i.selfTopicP]);if(i.isLeaving()||t!==g&&t!==y||i.isPassive&&p||(i.isPassive&&!i.isActive&&!c&&!l&&(i.isActive=!0,(d=i.requeueAnnounce)==null||d.call(i)),i.isPassive&&!i.isActive))return;const _=i.peerStates[o],f=_==null?void 0:_.connectedPeer;if(f&&_){const m=pf(f);if(m==="live"){_.connectedPeerUnhealthySinceMs=null;return}if(m==="stale")aa(_);else{const v=Date.now(),x=_.connectedPeerUnhealthySinceMs??v;if(_.connectedPeerUnhealthySinceMs=x,v-x<yf)return;aa(_)}}if(!i.reusePeer(o)){if(o&&!a&&!c&&!l){const m=Yr(i.peerStates,o),v=Ct<o;if(m.answeringPeer||m.connectedPeer||m.offerAnswered)return;if(!v&&!m.offerPeer){let x=Br.get(m);x||(x=[],Br.set(m,x));const T=x[e];if(T!==void 0&&Date.now()-T<1e3)return;x[e]=Date.now();const E=await Qi(Ji(i.rootTopicPlaintext,o));!i.isLeaving()&&!m.connectedPeer&&!m.answeringPeer&&!m.offerAnswered&&s(E,Ot({peerId:Ct}));return}return m.offerRelays[e]?void 0:(m.offerRelays[e]=Is,Kh(i,e,o,s))}if(a)return Cf(i,e,o,a,h,s);if(l)return Pf(i,o,l,h,u);if(c)return Lf(i,o,c,h,u)}},er=5333,Uf=[233,533,1333],il=7533,Nf=123333;var Ff=({init:i,subscribe:e,announce:t,deactivate:n})=>{const s={},r={},o=new mf,a=()=>Mn(s).some(u=>on(u).length>0);let c=!1,l=[],h=wt;return(u,p,g)=>{var A,Y,ne,oe;if(!u)throw $e("requires a config map as the first argument");if(g&&typeof g!="object")throw $e("third argument must be a callbacks object");const{appId:y}=u,_=g==null?void 0:g.onJoinError,f=g==null?void 0:g.onPeerHandshake,d=g==null?void 0:g.handshakeTimeoutMs;if(!y)throw $e("config map is missing appId field");if(!p)throw $e("roomId argument required");if(u.maxReceiveBytes!==void 0&&(!Number.isSafeInteger(u.maxReceiveBytes)||u.maxReceiveBytes<=0))throw $e("maxReceiveBytes must be a positive safe integer");if(d!==void 0&&(!Number.isFinite(d)||d<=0))throw $e("handshakeTimeoutMs must be a positive number");if((A=s[y])!=null&&A[p])return s[y][p];(ne=(Y=r[y])==null?void 0:Y[p])==null||ne.call(Y,!0);const m=Ji(Pt,y,p),v=Qi(m),x=Qi(Ji(m,Ct)),T=Dd(u.password??"",y,p),E=Id(y,p),b=u._test_only_sharedPeerIdleMs??Nf;let R=!1;const w=$=>async ce=>({type:ce.type,sdp:await $(T,ce.sdp)}),M=w(Nd),L=w(Ud),O=()=>kc(!0,u);let S=!1;const P=new Od(O),U=async $=>{const ce=await $.getOffer();if(!ce||ce.type!=="offer")throw $e("failed to get offer for peer");return(await L(ce)).sdp},I=($,ce)=>{D.connect(ce,$,b)};let V=!1;const k=()=>{B||!S||V||(V=!0,queueMicrotask(()=>{var $;V=!1,R||($=H.requeueAnnounce)==null||$.call(H)}))},F=($,ce)=>{if(R)return;const re=H.peerStates[ce];(re==null?void 0:re.connectedPeer)===$&&(aa(re),le(),k())},B=!!u.passive;let j,se=wt;const le=()=>{if(!B||!H.isActive)return;let $=!1;Ki(H.peerStates).forEach(([ce,re])=>{re.connectedPeer||re.answeringPeer||re.offerInitPromise||re.offerPeer||re.offerRelays.some(Boolean)?$=!0:delete H.peerStates[ce]}),$||(H.isActive=!1,j=je(j),Te.forEach(je),Te.length=0,se(),D.setActive(!1))},H={appId:y,roomId:p,config:u,peerStates:{},rootTopicPlaintext:m,rootTopicP:v,selfTopicP:x,toPlain:M,toCipher:L,isLeaving:()=>R,isPassive:B,isActive:!B,onJoinError:_,offerManager:P,encryptOffer:U,initPeer:kc,connectPeer:I,disconnectPeer:F,reusePeer:$=>D.reuse($),checkDeactivate:le,announceIntervals:[],announceIntervalMs:er},ee={config:u,appId:y,roomId:p,isPassive:B},he=If(H);if(!c){const $=i(u);l=(Array.isArray($)?$:[$]).map(ce=>Promise.resolve(ce)),c=!0,h=(oe=u.relayConfig)!=null&&oe.manualReconnection?wt:Cd()}const te=l.map(()=>er),Me=l.map(()=>0),Ee=l.map(()=>0),Te=[],X=l.map(async($,ce)=>e(await $,await v,await x,he(ce),re=>P.getOffers(re,U),ee));wi([v,x]).then(([$,ce])=>{if(R)return;const re=async(fe,Ie)=>{var Ye;if(R||B&&!H.isActive)return;const ae=B?{passive:!0}:void 0;let pe;try{pe=await t(fe,$,ce,ae,ee),Ee[Ie]=0}catch(Ve){if(R)return;const tt=Ee[Ie]??0;tt===0&&((Ye=u.relayConfig)==null?void 0:Ye.warnOnRelayFailure)!==!1&&console.warn(`${Pt}: announce failed - ${Zi(Ve,"")}`),Ee[Ie]=tt+1}if(R||B&&!H.isActive||pe&&typeof pe!="number"&&"stopAnnouncing"in pe)return;typeof pe=="number"?(H.announceIntervals[Ie]=pe,te[Ie]=pe):pe&&(te[Ie]=pe.nextAnnounceMs,S||(S=pe.reannounceOnDisconnect===!0));const Ue=Me[Ie]??0;Me[Ie]=Ue+1;const Oe=te[Ie]??er,Se=Uf[Ue]??(Ue===3&&typeof pe=="object"?er:void 0);Te[Ie]=setTimeout(()=>{re(fe,Ie)},typeof Se=="number"?Math.min(Oe,Se):Oe)};se=()=>{n&&l.forEach(async fe=>{const Ie=await fe;R||n(Ie,$,ce,ee)})},H.requeueAnnounce=()=>{Te.forEach(je),Te.length=0,j=je(j),D.setActive(!0),j=setTimeout(le,il),l.forEach(async(fe,Ie)=>{const ae=await fe;ae&&!R&&(Me[Ie]=0,re(ae,Ie))})},X.forEach(async(fe,Ie)=>{if(await fe,R)return;const ae=await l[Ie];ae&&!R&&(!B||H.isActive)&&re(ae,Ie)})});let Q=wt;const de=u.password??"",{compose:z}=kd(de,y,p),Fe=z(f),Ne=()=>{var $;(($=s[y])==null?void 0:$[p])===ge&&(delete s[y][p],on(s[y]).length===0&&delete s[y])},ke=()=>{var $;(($=r[y])==null?void 0:$[p])===be&&(delete r[y][p],on(r[y]).length===0&&delete r[y])},be=($=!1)=>{R||(R=!0,Q=wt,Ne(),ke(),D.leave(),Ki(H.peerStates).forEach(([ce,re])=>{re.connectedPeer&&!re.connectedPeer.isDead&&(o.owns(y,ce,re.connectedPeer)||re.connectedPeer.destroy()),re.answeringPeer&&!re.answeringPeer.isDead&&re.answeringPeer.destroy(),vi(re),sc(re),re.connectedPeer=null,re.connectedPeerUnhealthySinceMs=null}),Te.forEach(je),j=je(j),X.forEach(async ce=>{(await ce)()}),P.destroy(),!($||a())&&(c=!1,h()))},Ae={...u.maxReceiveBytes===void 0?{}:{maxReceiveBytes:u.maxReceiveBytes},...Fe?{onPeerHandshake:Fe}:{},...d===void 0?{}:{handshakeTimeoutMs:d},isPassive:B,onBeforeLeave:()=>{Ne(),(r[y]??(r[y]={}))[p]=be},onHandshakeError:($,ce)=>_==null?void 0:_({error:ce.replace(/^handshake failed: /,""),appId:y,peerId:$,roomId:p})};s[y]??(s[y]={});const ge=uf($=>Q=$,$=>{if(R)return;const ce=H.peerStates[$];ce!=null&&ce.connectedPeer&&nl(ce,ce.connectedPeer),le(),k()},()=>be(!1),Ae),D=o.registerRoom(y,p,E,{active:!B||H.isActive,onPeer:($,ce,re)=>{const fe=Yr(H.peerStates,ce);Tf(fe,re),B&&!H.isActive&&(H.isActive=!0,D.setActive(!0),H.requeueAnnounce?H.requeueAnnounce():(j=je(j),j=setTimeout(le,il))),Q($,ce),vi(fe)},onDetach:($,ce)=>{nl(H.peerStates[$],ce),le()}});return s[y][p]=ge}};const Of=6e4,po=i=>{if(!i)throw $e("topic strategy missing room context");return i},gs=(i,e,t,n)=>({kind:e,appId:i.appId,roomId:i.roomId,rootTopic:t,selfTopic:n});var kf=({steadyAnnounceIntervalMs:i=Of,reannounceOnDisconnect:e=!0,init:t,subscribeTopic:n,publishTopic:s,unpublishTopic:r})=>Ff({init:t,subscribe:async(o,a,c,l,h,u)=>{const p=po(u),g=(T,E)=>void s(o,T,E,gs(p,"signal",a,c));let y=null,_=!1,f=null,d=!1;const m=T=>{_||(_=!0,T())},v=()=>(f||(f=Promise.resolve(n(o,c,(T,E)=>{d||l(T,E,g)},gs(p,"self",a,c))).then(T=>{y=T,d&&m(T)})),f);p.isPassive||await v();const x=await n(o,a,async(T,E)=>{d||(p.isPassive&&Mf(E)&&await v(),d||await l(T,E,g))},gs(p,"root",a,c));return()=>{d=!0,y&&m(y),x()}},announce:async(o,a,c,l,h)=>{const u=po(h),p=await s(o,a,Ot({peerId:Ct,...l}),gs(u,"announce",a,c));return typeof p=="number"||p!==void 0&&"stopAnnouncing"in p?p:{nextAnnounceMs:(p==null?void 0:p.nextAnnounceMs)??i,reannounceOnDisconnect:(p==null?void 0:p.reannounceOnDisconnect)??e}},...r?{deactivate:(o,a,c,l)=>{const h=po(l);return r(o,a,gs(h,"announce",a,c))}}:{}});const Zh=Rd(i=>i.socket),Bf=5,Jh="x",Qh="EVENT",{secretKey:zf,publicKey:Vf}=Uh.keygen(),Gf=Ns(Vf),mo={},sl=250,ui=6e4,Hf=9e5,oc=5333,Fs=new WeakMap,zr=Zh.scoped(),la=new WeakSet,Wf=i=>{const e=Fs.get(i),t=Math.min(e!=null&&e.delayMs?Math.max(ui,e.delayMs*2):ui,Hf);return Fs.set(i,{delayMs:t,untilMs:Date.now()+t}),t},Os=i=>{const e=Fs.get(i);if(!e)return 0;const t=e.untilMs-Date.now();return t>0?t:0},tr=i=>({nextAnnounceMs:i}),qf={stopAnnouncing:!0},Xf=i=>{var e;return la.has(i)?!1:(la.add(i),Fs.delete(i),(e=i.close)==null||e.call(i),!0)},eu=()=>Math.floor(Date.now()/1e3),tu=i=>mo[i]??(mo[i]=kh(i,1e4)+2e4),$f=async(i,e)=>{const t={kind:tu(i),tags:[[Jh,i]],created_at:eu(),content:e,pubkey:Gf},n=await Xr("SHA-256",Ot([0,t.pubkey,t.created_at,t.kind,t.tags,t.content]));return Ot([Qh,{...t,id:Ns(n),sig:Ns(await Uh.signAsync(n,zf))}])},Xt={},nu=i=>{i.flushWaiters.forEach(e=>e()),i.flushWaiters.clear()},Yf=(i,e,t)=>{var s;const n=Xt[s=i.url]??(Xt[s]={subIds:[],topics:new Map,updateTimer:null,flushWaiters:new Set,retryTimer:null,retryMs:oc,pendingEose:new Set,requestedAt:0});n.topics.set(e,t),iu(i,n)},jf=(i,e)=>{const t=Xt[i.url];t&&(t.topics.delete(e),delete zr.forRelay(i)[e],t.topics.size===0?(t.retryTimer!==null&&clearTimeout(t.retryTimer),t.updateTimer!==null&&(clearTimeout(t.updateTimer),t.updateTimer=null),nu(t),t.subIds.forEach(n=>i.send(Ot(["CLOSE",n]))),delete Xt[i.url]):iu(i,t))},iu=(i,e)=>{e.updateTimer===null&&(e.updateTimer=setTimeout(()=>{e.updateTimer=null;try{su(i)}finally{nu(e)}},0))},Kf=i=>{const e=Xt[i.url];return!e||e.updateTimer===null?Promise.resolve():new Promise(t=>e.flushWaiters.add(t))},su=i=>{const e=Xt[i.url];if(!e||e.topics.size===0)return;const t=[...e.topics.keys()],n=[],s=eu();for(let r=0;r<t.length;r+=sl)n.push(t.slice(r,r+sl));for(;e.subIds.length>n.length;){const r=e.subIds.pop();r&&i.send(Ot(["CLOSE",r]))}e.pendingEose.clear(),e.requestedAt=Date.now(),n.forEach((r,o)=>{var c;const a=(c=e.subIds)[o]??(c[o]=Si(64));e.pendingEose.add(a),i.send(Ot(["REQ",a,{kinds:[...new Set(r.map(tu))],since:s,"#x":r}]))})},ru=i=>{const e=Xt[i.url];if(e&&e.topics.size>0&&!i.isClosed){if(Os(i)>0){cu(i,!0);return}e.retryTimer!==null&&(clearTimeout(e.retryTimer),e.retryTimer=null),su(i),ou(i)}},ou=i=>{Object.entries(zr.forRelay(i)).forEach(([e,t])=>{au(i,e,t,!0)})},au=async(i,e,t,n)=>{var o;if(la.has(i)||i.isClosed)return n?qf:void 0;const s=Os(i);if(s>0||i.socket.readyState!==1)return n?tr(Math.max(ui,s)):void 0;const r=await $f(e,n?Ot({...Gs(t),nonce:Si(8)}):t);if(n&&!((o=Xt[i.url])!=null&&o.topics.has(e)))return tr(ui);if(Os(i)>0||i.isClosed||i.socket.readyState!==1)return n?tr(ui):void 0;if(i.send(r),n)return tr(ui)},cu=(i,e)=>{const t=Xt[i.url];if(!t||t.retryTimer!==null&&!e)return;t.retryTimer!==null&&clearTimeout(t.retryTimer);const n=e?Os(i):t.retryMs;t.retryMs=Math.min(t.retryMs*2,ui),t.retryTimer=setTimeout(()=>{t.retryTimer=null,ru(i)},Math.max(n,oc))},lu=kf({init:i=>wd(i,Zf,Bf,!0).map(e=>{const t=Zh.register(e,()=>Ad(e,n=>{var c,l;const[s,r,o,a]=Gs(n);if(s!==Qh){const h=`${Pt}: relay failure from ${t.url} - `,u=s==="CLOSED"&&typeof o=="string"?o:a,p=s==="OK"&&o===!1,g=(p||s==="CLOSED")&&(u==null?void 0:u.startsWith("rate-limited:")),y=p&&(u==null?void 0:u.startsWith("duplicate:")),_=u&&/^(blocked|restricted|auth-required|pow):/.test(u);if(s==="OK"&&o===!0&&Os(t)===0&&Fs.delete(t),(p||s==="CLOSED")&&_&&!Xf(t))return;if(g)Wf(t);else if(s==="EOSE"){const f=Xt[t.url];f!=null&&f.pendingEose.delete(r)&&f.pendingEose.size===0&&(f.retryMs=oc,f.retryTimer!==null&&(clearTimeout(f.retryTimer),f.retryTimer=null),Date.now()-f.requestedAt>=1e3&&ou(t))}s==="CLOSED"&&!_&&cu(t,!!g),!y&&((c=i.relayConfig)==null?void 0:c.warnOnRelayFailure)!==!1&&(s==="NOTICE"?console.warn(h+r):(p||s==="CLOSED")&&console.warn(h+u));return}if(o&&typeof o=="object"&&"content"in o){const h=Xt[t.url];if(h!=null&&h.subIds.includes(r)&&o.tags){const u=o.tags.find(p=>p[0]===Jh);u!=null&&u[1]&&((l=h.topics.get(u[1]))==null||l(u[1],o.content))}}},()=>ru(t)));return t.ready}),subscribeTopic:(i,e,t,n)=>{const s=(o,a)=>void t(o,a);Yf(i,e,s);const r=()=>{var o;((o=Xt[i.url])==null?void 0:o.topics.get(e))===s&&jf(i,e)};return n.kind==="root"?Kf(i).then(()=>r):r},publishTopic:(i,e,t,{kind:n})=>{const s=typeof t=="string"?t:Ot(t);return n==="announce"&&(zr.forRelay(i)[e]=s),au(i,e,s,n==="announce")},unpublishTopic:(i,e)=>{delete zr.forRelay(i)[e]}}),Zf=["0x-nostr-relay.fly.dev","bendernostur.duckdns.org:8443","cdn.satellite.earth","nos.lol","nostr.chaima.info","nostr.christiansass.de","nostr.rblb.it","nostr.red5d.dev","nostr.robosats.org","nostr.stakey.net","nostrcity-club.fly.dev","relay-dev.gulugulu.moe","relay.aarpia.com","relay.agentry.com","relay.bitmacro.cloud","relay.bullishbounty.com","relay.degmods.com","relay.flashapp.me","relay.grigic.org","relay.hackshed.dev","relay.kaleidoswap.com","relay.layer.systems","relay.nostr.blockhenge.com","relay.nostr.dev.br","relay.nostrmap.net","relay.novospes.com","relay.piazza.today","relay.routstr.com","testr.nymble.world"].map(i=>"wss://"+i);function Dt(i,e){if(!i||typeof i.makeAction!="function")return{send:()=>{},onReceive:()=>{}};const t=i.makeAction(e),n=(s,r)=>{if(typeof s=="string"&&s.length>0)return s;if(s&&typeof s=="object"){if(typeof s.peerId=="string"&&s.peerId.length>0)return s.peerId;if(typeof s.id=="string"&&s.id.length>0)return s.id}if(r&&typeof r=="object"){if(typeof r.id=="string"&&r.id.length>0)return r.id;if(typeof r.senderId=="string"&&r.senderId.length>0)return r.senderId}return null};return Array.isArray(t)?{send:(s,r)=>{try{t[0](s,r)}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{t[1]((r,o)=>{const a=n(o,r);a&&s(r,a)})}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}:{send:(s,r)=>{try{if(t&&typeof t.send=="function"){let o;r&&typeof r=="string"?o=t.send(s,{target:r}):o=t.send(s),o&&typeof o.catch=="function"&&o.catch(()=>{})}}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{if(!t)return;const r=(o,a)=>{const c=n(a,o);c&&s(o,c)};"onMessage"in t?t.onMessage=r:"onReceive"in t&&(typeof t.onReceive=="function"?t.onReceive(r):t.onReceive=r)}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}}const hu="rockets-3d-space-shooter",Jf="rockets_public_directory_v1",Qf=3e3,rl=12e3,uu=["wss://nos.lol","wss://relay.damus.io","wss://relay.snort.social","wss://nostr.mom"];class ep{constructor(){this.lobbyRoom=null,this.activeRooms=new Map,this.listeners=new Set,this.heartbeatTimer=null,this.purgeTimer=null,this.currentHostingMatch=null,this.sendHeartbeat=null,this.sendQuery=null,this.isInitialized=!1}init(){if(!this.isInitialized){this.isInitialized=!0;try{this.lobbyRoom=lu({appId:hu,relayConfig:{urls:uu}},Jf);const e=Dt(this.lobbyRoom,"room_heartbeat"),t=Dt(this.lobbyRoom,"query_rooms");this.sendHeartbeat=e.send,this.sendQuery=t.send,e.onReceive((s,r)=>{!s||!s.roomId||(this.activeRooms.set(s.roomId,{...s,lastSeen:Date.now(),ttlMs:s.ttlMs||rl}),this.notifyListeners())}),t.onReceive((s,r)=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()});const n=()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()};typeof this.lobbyRoom.onPeerJoin=="function"?this.lobbyRoom.onPeerJoin(n):this.lobbyRoom.onPeerJoin=n,this.purgeTimer=setInterval(()=>{const s=Date.now();let r=!1;for(const[o,a]of this.activeRooms.entries())s-a.lastSeen>a.ttlMs&&(this.activeRooms.delete(o),r=!0);r&&this.notifyListeners()},2e3),this.refreshRooms()}catch(e){console.warn("Lobby network init warning:",e)}}}refreshRooms(){if(this.init(),this.sendQuery)try{this.sendQuery({req:"list",from:Ct})}catch(e){console.error(e)}}startMasterKeepAlive(e){this.init(),this.currentHostingMatch=e,this.stopMasterKeepAlive(),this.broadcastCurrentRoom(),this.heartbeatTimer=setInterval(()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()},Qf)}stopMasterKeepAlive(){this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null)}broadcastCurrentRoom(){if(this.currentHostingMatch&&(this.init(),!!this.sendHeartbeat))try{const e=this.currentHostingMatch,t=e.getPlayerCount?e.getPlayerCount():1,n={roomId:e.roomId,roomName:e.roomName||e.roomId,masterId:Ct,playerCount:t,mapSeed:e.mapSeed||42,config:e.config||{voxelQuality:"low",asteroidCount:100,megaRadius:2800,meteorFrequency:10},timestamp:Date.now(),ttlMs:rl};this.sendHeartbeat(n),this.activeRooms.set(e.roomId,{...n,lastSeen:Date.now()}),this.notifyListeners()}catch(e){console.error("Failed to send heartbeat:",e)}}onRoomsUpdated(e){return this.listeners.add(e),e(this.getRoomsList()),()=>this.listeners.delete(e)}notifyListeners(){const e=this.getRoomsList();for(const t of this.listeners)t(e)}getRoomsList(){const e=Date.now(),t=[];for(const n of this.activeRooms.values()){const s=Math.max(0,Math.round((n.lastSeen+n.ttlMs-e)/1e3));t.push({...n,config:n.config||{voxelQuality:"low",asteroidCount:100,megaRadius:2800,meteorFrequency:10},ttlSecondsRemaining:s})}return t.sort((n,s)=>s.lastSeen-n.lastSeen)}destroy(){if(this.stopMasterKeepAlive(),this.purgeTimer&&clearInterval(this.purgeTimer),this.lobbyRoom)try{this.lobbyRoom.leave()}catch{}this.activeRooms.clear(),this.listeners.clear(),this.isInitialized=!1}}const di=new ep;class tp{constructor({roomId:e,roomName:t,mapSeed:n,config:s,playerName:r,onPeerJoined:o,onPeerLeft:a,onMasterChanged:c,onCombatLog:l}){this.roomId=e,this.roomName=t||e,this.mapSeed=n||42,this.config=s||{voxelQuality:"low",asteroidCount:100,megaRadius:2800,meteorFrequency:10},this.playerName=r||`Pilot-${(Ct||"Host").slice(0,4)}`,this.selfId=Ct,this.onPeerJoined=o||(()=>{}),this.onPeerLeft=a||(()=>{}),this.onMasterChanged=c||(()=>{}),this.onCombatLog=l||(()=>{}),this.room=null,this.currentMasterId=this.selfId,this.isMaster=!0,this.peers=new Map,this.sendState=null,this.sendCannon=null,this.sendMine=null,this.sendHit=null,this.sendKill=null,this.sendPing=null,this.sendPong=null,this.sendLaser=null,this.sendDecoy=null,this.sendMissile=null,this.sendMapResetVote=null,this.sendMapReset=null,this.sendConfig=null,this.cannonListeners=new Set,this.mineListeners=new Set,this.hitListeners=new Set,this.killListeners=new Set,this.laserListeners=new Set,this.decoyListeners=new Set,this.missileListeners=new Set,this.mapResetVoteListeners=new Set,this.mapResetListeners=new Set,this.configListeners=new Set,this.currentMapResetVote=null,this.voteTimeoutTimer=null,this.pingInterval=null,this.stateBroadcastInterval=null}join(){this.room=lu({appId:hu,relayConfig:{urls:uu}},this.roomId);const e=Dt(this.room,"state"),t=Dt(this.room,"cannon"),n=Dt(this.room,"mine"),s=Dt(this.room,"hit"),r=Dt(this.room,"kill"),o=Dt(this.room,"ping"),a=Dt(this.room,"pong"),c=Dt(this.room,"laser"),l=Dt(this.room,"missile"),h=Dt(this.room,"decoy"),u=Dt(this.room,"map_reset_vote"),p=Dt(this.room,"map_reset"),g=Dt(this.room,"config");this.sendState=e.send,this.sendCannon=t.send,this.sendMine=n.send,this.sendHit=s.send,this.sendKill=r.send,this.sendPing=o.send,this.sendPong=a.send,this.sendLaser=c.send,this.sendMissile=l.send,this.sendDecoy=h.send,this.sendMapResetVote=u.send,this.sendMapReset=p.send,this.sendConfig=g.send,g.onReceive((f,d)=>{if(!(!f||!f.config)){this.config={...this.config,...f.config},f.mapSeed!==void 0&&(this.mapSeed=f.mapSeed);for(const m of this.configListeners)m(this.config,d)}}),u.onReceive((f,d)=>{!d||typeof d!="string"||!f||(f.type==="start"?this.handleIncomingVoteStart(f):f.type==="vote"&&this.handleIncomingVoteCast(f,d))}),p.onReceive((f,d)=>{!f||f.seed===void 0||this.triggerMapResetLocally(f.seed)}),e.onReceive((f,d)=>{if(!d||typeof d!="string")return;this.peers.has(d)||this.peers.set(d,{id:d,ping:30,lastSeen:Date.now(),packetsReceived:0});const m=this.peers.get(d);m.lastState=f,m.lastSeen=Date.now(),m.packetsReceived=(m.packetsReceived||0)+1}),t.onReceive((f,d)=>{if(!(!d||typeof d!="string"))for(const m of this.cannonListeners)m(f,d)}),c.onReceive((f,d)=>{if(!(!d||typeof d!="string"))for(const m of this.laserListeners)m(f,d)}),l.onReceive((f,d)=>{if(!(!d||typeof d!="string"))for(const m of this.missileListeners)m(f,d)}),h.onReceive((f,d)=>{if(!(!d||typeof d!="string"))for(const m of this.decoyListeners)m(f,d)}),n.onReceive((f,d)=>{if(!(!d||typeof d!="string"))for(const m of this.mineListeners)m(f,d)}),s.onReceive((f,d)=>{if(!(!d||typeof d!="string"))for(const m of this.hitListeners)m(f,d)}),r.onReceive((f,d)=>{if(!(!d||typeof d!="string"))for(const m of this.killListeners)m(f,d)}),o.onReceive((f,d)=>{!d||typeof d!="string"||this.sendPong&&this.sendPong({t:f.t},d)}),a.onReceive((f,d)=>{if(!(!d||typeof d!="string")&&f&&f.t&&this.peers.has(d)){const m=Math.max(1,Date.now()-f.t);this.peers.get(d).ping=m}});const y=f=>{!f||typeof f!="string"||(console.log(`[Mesh] Peer connected: ${f}`),this.peers.set(f,{id:f,ping:40,lastSeen:Date.now()}),this.updateMasterElection(),this.isMaster&&this.sendConfig&&this.sendConfig({config:this.config,mapSeed:this.mapSeed},f),this.onPeerJoined(f),this.onCombatLog(`🛰️ Pilot joined the mesh: ${f.slice(0,5)}`))},_=f=>{!f||typeof f!="string"||(console.log(`[Mesh] Peer disconnected: ${f}`),this.peers.delete(f),this.updateMasterElection(),this.onPeerLeft(f),this.onCombatLog(`💨 Pilot left the mesh: ${f.slice(0,5)}`))};typeof this.room.onPeerJoin=="function"?this.room.onPeerJoin(y):this.room.onPeerJoin=y,typeof this.room.onPeerLeave=="function"?this.room.onPeerLeave(_):this.room.onPeerLeave=_,this.updateMasterElection(),this.isMaster&&di.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,config:this.config,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),this.pingInterval=setInterval(()=>{this.sendPing&&this.peers.size>0&&this.sendPing({t:Date.now()})},2e3)}updateMasterElection(){if(!this.room)return;const e=Object.keys(this.room.getPeers()||{}),n=[this.selfId,...e].sort()[0],s=n===this.selfId;if(this.currentMasterId!==n||this.isMaster!==s){const r=this.currentMasterId;this.currentMasterId=n,this.isMaster=s,console.log(`[Mesh] Master Election: elected ${n} (Self is master: ${s})`),s?(di.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,config:this.config,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),r&&r!==this.selfId&&this.onCombatLog("👑 Previous host left. You took over as Master! Keep-alive active.")):di.stopMasterKeepAlive(),this.onMasterChanged(n,s)}}broadcastLocalState(e){this.sendState&&this.sendState({...e,id:this.selfId,name:this.playerName,time:Date.now()})}broadcastCannon(e){this.sendCannon&&this.sendCannon(e)}onConfig(e){return this.configListeners.add(e),()=>this.configListeners.delete(e)}broadcastConfig(e){this.config={...this.config,...e},this.sendConfig&&this.sendConfig({config:this.config,mapSeed:this.mapSeed})}broadcastLaser(e){this.sendLaser&&this.sendLaser(e)}broadcastMissile(e){if(this.sendMissile){const t={...e,targetPeerId:e.targetPeerId!==void 0?e.targetPeerId:null};this.sendMissile(t)}}broadcastDecoy(e){this.sendDecoy&&this.sendDecoy(e)}onLaser(e){return this.laserListeners.add(e),()=>this.laserListeners.delete(e)}onMissile(e){return this.missileListeners.add(e),()=>this.missileListeners.delete(e)}onDecoy(e){return this.decoyListeners.add(e),()=>this.decoyListeners.delete(e)}broadcastMine(e){this.sendMine&&this.sendMine(e)}sendHitTarget(e,t,n){this.sendHit&&this.sendHit({targetId:e,attackerId:this.selfId,attackerName:this.playerName,damage:t,weapon:n,time:Date.now()})}broadcastKill(e,t,n){this.sendKill&&this.sendKill({victimId:e,killerId:t,killerName:n,time:Date.now()})}onCannon(e){return this.cannonListeners.add(e),()=>this.cannonListeners.delete(e)}onMine(e){return this.mineListeners.add(e),()=>this.mineListeners.delete(e)}onHit(e){return this.hitListeners.add(e),()=>this.hitListeners.delete(e)}onKill(e){return this.killListeners.add(e),()=>this.killListeners.delete(e)}requestMapResetVote(){if(this.peers.size===0){const n=Math.floor(Math.random()*1e6)+1;return this.triggerMapResetLocally(n),{solo:!0,passed:!0,newSeed:n}}if(this.currentMapResetVote)return{error:"Vote already in progress"};const e="vote-"+Date.now()+"-"+Math.random().toString(36).slice(2,6),t=Math.floor(Math.random()*1e6)+1;return this.currentMapResetVote={id:e,initiatorId:this.selfId,initiatorName:this.playerName,newSeed:t,startTime:Date.now(),expiresAt:Date.now()+1e4,votes:new Map([[this.selfId,!0]])},this.sendMapResetVote&&this.sendMapResetVote({type:"start",voteId:e,initiatorId:this.selfId,initiatorName:this.playerName,newSeed:t}),this.voteTimeoutTimer&&clearTimeout(this.voteTimeoutTimer),this.voteTimeoutTimer=setTimeout(()=>{this.finalizeMapResetVote(e)},1e4),this.emitMapResetVoteUpdate(),{solo:!1,voteId:e,newSeed:t}}handleIncomingVoteStart(e){this.currentMapResetVote||(this.currentMapResetVote={id:e.voteId,initiatorId:e.initiatorId,initiatorName:e.initiatorName||"Host",newSeed:e.newSeed,startTime:Date.now(),expiresAt:Date.now()+1e4,votes:new Map([[e.initiatorId,!0]])},this.voteTimeoutTimer&&clearTimeout(this.voteTimeoutTimer),this.voteTimeoutTimer=setTimeout(()=>{this.finalizeMapResetVote(e.voteId)},1e4),this.emitMapResetVoteUpdate())}castMapResetVote(e){if(!this.currentMapResetVote)return;const t=!!e;this.currentMapResetVote.votes.set(this.selfId,t),this.sendMapResetVote&&this.sendMapResetVote({type:"vote",voteId:this.currentMapResetVote.id,choice:t}),this.emitMapResetVoteUpdate();const n=this.peers.size+1;this.currentMapResetVote.votes.size>=n&&this.finalizeMapResetVote(this.currentMapResetVote.id)}handleIncomingVoteCast(e,t){if(!this.currentMapResetVote||this.currentMapResetVote.id!==e.voteId)return;this.currentMapResetVote.votes.set(t,!!e.choice),this.emitMapResetVoteUpdate();const n=this.peers.size+1;this.currentMapResetVote.votes.size>=n&&this.finalizeMapResetVote(this.currentMapResetVote.id)}finalizeMapResetVote(e){if(!this.currentMapResetVote||this.currentMapResetVote.id!==e)return;this.voteTimeoutTimer&&(clearTimeout(this.voteTimeoutTimer),this.voteTimeoutTimer=null);const t=this.currentMapResetVote;this.currentMapResetVote=null;const n=this.peers.size+1;let s=0;for(const[,o]of t.votes.entries())o===!0&&s++;const r=s===n&&s>0;r?(this.onCombatLog(`✅ Map reset passed unanimously (${s}/${n})! Reseeding sector...`),(t.initiatorId===this.selfId||this.isMaster)&&this.sendMapReset&&this.sendMapReset({seed:t.newSeed}),this.triggerMapResetLocally(t.newSeed)):this.onCombatLog(`❌ Map reset vote failed (${s}/${n} agreed).`),this.emitMapResetVoteEnd(r)}emitMapResetVoteUpdate(){if(!this.currentMapResetVote)return;const e=this.peers.size+1;let t=0,n=0;for(const[,o]of this.currentMapResetVote.votes.entries())o?t++:n++;const s=Math.max(0,Math.ceil((this.currentMapResetVote.expiresAt-Date.now())/1e3)),r={active:!0,voteId:this.currentMapResetVote.id,initiatorId:this.currentMapResetVote.initiatorId,initiatorName:this.currentMapResetVote.initiatorName,yesCount:t,noCount:n,totalPeers:e,remainingTime:s,hasVoted:this.currentMapResetVote.votes.has(this.selfId)};for(const o of this.mapResetVoteListeners)o(r)}emitMapResetVoteEnd(e){for(const t of this.mapResetVoteListeners)t({active:!1,passed:e})}triggerMapResetLocally(e){this.mapSeed=e;for(const t of this.mapResetListeners)t(e)}onMapResetVote(e){return this.mapResetVoteListeners.add(e),()=>this.mapResetVoteListeners.delete(e)}onMapReset(e){return this.mapResetListeners.add(e),()=>this.mapResetListeners.delete(e)}getAveragePing(){if(this.peers.size===0)return 0;let e=0;for(const t of this.peers.values())e+=t.ping||30;return Math.round(e/this.peers.size)}leave(){if(di.stopMasterKeepAlive(),this.pingInterval&&clearInterval(this.pingInterval),this.stateBroadcastInterval&&clearInterval(this.stateBroadcastInterval),this.voteTimeoutTimer&&clearTimeout(this.voteTimeoutTimer),this.room){try{this.room.leave()}catch{}this.room=null}this.peers.clear(),this.cannonListeners.clear(),this.mineListeners.clear(),this.hitListeners.clear(),this.killListeners.clear(),this.laserListeners.clear(),this.decoyListeners.clear(),this.missileListeners.clear(),this.mapResetVoteListeners.clear(),this.mapResetListeners.clear(),this.currentMapResetVote=null}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ac="170",np=0,ol=1,ip=2,du=1,sp=2,Sn=3,Kn=0,Nt=1,Rt=2,qn=0,Xi=1,dt=2,al=3,cl=4,rp=5,li=100,op=101,ap=102,cp=103,lp=104,hp=200,up=201,dp=202,fp=203,ha=204,ua=205,pp=206,mp=207,gp=208,vp=209,yp=210,_p=211,xp=212,Mp=213,Sp=214,da=0,fa=1,pa=2,es=3,ma=4,ga=5,va=6,ya=7,fu=0,wp=1,Ep=2,Xn=0,bp=1,Tp=2,Ap=3,pu=4,Rp=5,Cp=6,Pp=7,mu=300,ts=301,ns=302,_a=303,xa=304,jr=306,ks=1e3,fi=1001,Ma=1002,ln=1003,Lp=1004,nr=1005,fn=1006,go=1007,pi=1008,Cn=1009,gu=1010,vu=1011,Bs=1012,cc=1013,yi=1014,bn=1015,Hs=1016,lc=1017,hc=1018,is=1020,yu=35902,_u=1021,xu=1022,an=1023,Mu=1024,Su=1025,$i=1026,ss=1027,wu=1028,uc=1029,Eu=1030,dc=1031,fc=1033,Lr=33776,Dr=33777,Ir=33778,Ur=33779,Sa=35840,wa=35841,Ea=35842,ba=35843,Ta=36196,Aa=37492,Ra=37496,Ca=37808,Pa=37809,La=37810,Da=37811,Ia=37812,Ua=37813,Na=37814,Fa=37815,Oa=37816,ka=37817,Ba=37818,za=37819,Va=37820,Ga=37821,Nr=36492,Ha=36494,Wa=36495,bu=36283,qa=36284,Xa=36285,$a=36286,Dp=3200,Ip=3201,Tu=0,Up=1,Gn="",jt="srgb",as="srgb-linear",Kr="linear",st="srgb",Ai=7680,ll=519,Np=512,Fp=513,Op=514,Au=515,kp=516,Bp=517,zp=518,Vp=519,Ya=35044,ir=35048,hl="300 es",Tn=2e3,Vr=2001;class cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vo=Math.PI/180,ja=180/Math.PI;function $n(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Tt[i&255]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]+"-"+Tt[e&255]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[t&63|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[n&255]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function Bt(i,e,t){return Math.max(e,Math.min(t,i))}function Gp(i,e){return(i%e+e)%e}function yo(i,e,t){return(1-t)*i+t*e}function dn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,s,r,o,a,c,l){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],p=n[2],g=n[5],y=n[8],_=s[0],f=s[3],d=s[6],m=s[1],v=s[4],x=s[7],T=s[2],E=s[5],b=s[8];return r[0]=o*_+a*m+c*T,r[3]=o*f+a*v+c*E,r[6]=o*d+a*x+c*b,r[1]=l*_+h*m+u*T,r[4]=l*f+h*v+u*E,r[7]=l*d+h*x+u*b,r[2]=p*_+g*m+y*T,r[5]=p*f+g*v+y*E,r[8]=p*d+g*x+y*b,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,p=a*c-h*r,g=l*r-o*c,y=t*u+n*p+s*g;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/y;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=p*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=g*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(_o.makeScale(e,t)),this}rotate(e){return this.premultiply(_o.makeRotation(-e)),this}translate(e,t){return this.premultiply(_o.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _o=new We;function Ru(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Gr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Hp(){const i=Gr("canvas");return i.style.display="block",i}const ul={};function As(i){i in ul||(ul[i]=!0,console.warn(i))}function Wp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function qp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Xp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ze={enabled:!0,workingColorSpace:as,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===st&&(i.r=An(i.r),i.g=An(i.g),i.b=An(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===st&&(i.r=Yi(i.r),i.g=Yi(i.g),i.b=Yi(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Gn?Kr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function An(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Yi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const dl=[.64,.33,.3,.6,.15,.06],fl=[.2126,.7152,.0722],pl=[.3127,.329],ml=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),gl=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ze.define({[as]:{primaries:dl,whitePoint:pl,transfer:Kr,toXYZ:ml,fromXYZ:gl,luminanceCoefficients:fl,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:dl,whitePoint:pl,transfer:st,toXYZ:ml,fromXYZ:gl,luminanceCoefficients:fl,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}});let Ri;class $p{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ri===void 0&&(Ri=Gr("canvas")),Ri.width=e.width,Ri.height=e.height;const n=Ri.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ri}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Gr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=An(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(An(t[n]/255)*255):t[n]=An(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Yp=0;class Cu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yp++}),this.uuid=$n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(xo(s[o].image)):r.push(xo(s[o]))}else r=xo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function xo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?$p.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let jp=0;class Ft extends cs{constructor(e=Ft.DEFAULT_IMAGE,t=Ft.DEFAULT_MAPPING,n=fi,s=fi,r=fn,o=pi,a=an,c=Cn,l=Ft.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jp++}),this.uuid=$n(),this.name="",this.source=new Cu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==mu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ks:e.x=e.x-Math.floor(e.x);break;case fi:e.x=e.x<0?0:1;break;case Ma:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ks:e.y=e.y-Math.floor(e.y);break;case fi:e.y=e.y<0?0:1;break;case Ma:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ft.DEFAULT_IMAGE=null;Ft.DEFAULT_MAPPING=mu;Ft.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],p=c[1],g=c[5],y=c[9],_=c[2],f=c[6],d=c[10];if(Math.abs(h-p)<.01&&Math.abs(u-_)<.01&&Math.abs(y-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(u+_)<.1&&Math.abs(y+f)<.1&&Math.abs(l+g+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,x=(g+1)/2,T=(d+1)/2,E=(h+p)/4,b=(u+_)/4,R=(y+f)/4;return v>x&&v>T?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=E/n,r=b/n):x>T?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=E/s,r=R/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=b/r,s=R/r),this.set(n,s,r,t),this}let m=Math.sqrt((f-y)*(f-y)+(u-_)*(u-_)+(p-h)*(p-h));return Math.abs(m)<.001&&(m=1),this.x=(f-y)/m,this.y=(u-_)/m,this.z=(p-h)/m,this.w=Math.acos((l+g+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Kp extends cs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Ft(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Cu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends Kp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Pu extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zp extends Ft{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const p=r[o+0],g=r[o+1],y=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=p,e[t+1]=g,e[t+2]=y,e[t+3]=_;return}if(u!==_||c!==p||l!==g||h!==y){let f=1-a;const d=c*p+l*g+h*y+u*_,m=d>=0?1:-1,v=1-d*d;if(v>Number.EPSILON){const T=Math.sqrt(v),E=Math.atan2(T,d*m);f=Math.sin(f*E)/T,a=Math.sin(a*E)/T}const x=a*m;if(c=c*f+p*x,l=l*f+g*x,h=h*f+y*x,u=u*f+_*x,f===1-a){const T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],p=r[o+1],g=r[o+2],y=r[o+3];return e[t]=a*y+h*u+c*g-l*p,e[t+1]=c*y+h*p+l*u-a*g,e[t+2]=l*y+h*g+a*p-c*u,e[t+3]=h*y-a*u-c*p-l*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),p=c(n/2),g=c(s/2),y=c(r/2);switch(o){case"XYZ":this._x=p*h*u+l*g*y,this._y=l*g*u-p*h*y,this._z=l*h*y+p*g*u,this._w=l*h*u-p*g*y;break;case"YXZ":this._x=p*h*u+l*g*y,this._y=l*g*u-p*h*y,this._z=l*h*y-p*g*u,this._w=l*h*u+p*g*y;break;case"ZXY":this._x=p*h*u-l*g*y,this._y=l*g*u+p*h*y,this._z=l*h*y+p*g*u,this._w=l*h*u-p*g*y;break;case"ZYX":this._x=p*h*u-l*g*y,this._y=l*g*u+p*h*y,this._z=l*h*y-p*g*u,this._w=l*h*u+p*g*y;break;case"YZX":this._x=p*h*u+l*g*y,this._y=l*g*u+p*h*y,this._z=l*h*y-p*g*u,this._w=l*h*u-p*g*y;break;case"XZY":this._x=p*h*u-l*g*y,this._y=l*g*u-p*h*y,this._z=l*h*y+p*g*u,this._w=l*h*u+p*g*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],p=n+a+u;if(p>0){const g=.5/Math.sqrt(p+1);this._w=.25/g,this._x=(h-c)*g,this._y=(r-l)*g,this._z=(o-s)*g}else if(n>a&&n>u){const g=2*Math.sqrt(1+n-a-u);this._w=(h-c)/g,this._x=.25*g,this._y=(s+o)/g,this._z=(r+l)/g}else if(a>u){const g=2*Math.sqrt(1+a-n-u);this._w=(r-l)/g,this._x=(s+o)/g,this._y=.25*g,this._z=(c+h)/g}else{const g=2*Math.sqrt(1+u-n-a);this._w=(o-s)/g,this._x=(r+l)/g,this._y=(c+h)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const g=1-t;return this._w=g*o+t*this._w,this._x=g*n+t*this._x,this._y=g*s+t*this._y,this._z=g*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,p=Math.sin(t*h)/l;return this._w=o*u+this._w*p,this._x=n*u+this._x*p,this._y=s*u+this._y*p,this._z=r*u+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Mo.copy(this).projectOnVector(e),this.sub(Mo)}reflect(e){return this.sub(Mo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Mo=new N,vl=new Zt;class Ws{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,nn):nn.fromBufferAttribute(r,o),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),sr.copy(n.boundingBox)),sr.applyMatrix4(e.matrixWorld),this.union(sr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vs),rr.subVectors(this.max,vs),Ci.subVectors(e.a,vs),Pi.subVectors(e.b,vs),Li.subVectors(e.c,vs),In.subVectors(Pi,Ci),Un.subVectors(Li,Pi),ei.subVectors(Ci,Li);let t=[0,-In.z,In.y,0,-Un.z,Un.y,0,-ei.z,ei.y,In.z,0,-In.x,Un.z,0,-Un.x,ei.z,0,-ei.x,-In.y,In.x,0,-Un.y,Un.x,0,-ei.y,ei.x,0];return!So(t,Ci,Pi,Li,rr)||(t=[1,0,0,0,1,0,0,0,1],!So(t,Ci,Pi,Li,rr))?!1:(or.crossVectors(In,Un),t=[or.x,or.y,or.z],So(t,Ci,Pi,Li,rr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new N,new N,new N,new N,new N,new N,new N,new N],nn=new N,sr=new Ws,Ci=new N,Pi=new N,Li=new N,In=new N,Un=new N,ei=new N,vs=new N,rr=new N,or=new N,ti=new N;function So(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ti.fromArray(i,r);const a=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),c=e.dot(ti),l=t.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Jp=new Ws,ys=new N,wo=new N;class ls{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Jp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ys.subVectors(e,this.center);const t=ys.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ys,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ys.copy(e.center).add(wo)),this.expandByPoint(ys.copy(e.center).sub(wo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new N,Eo=new N,ar=new N,Nn=new N,bo=new N,cr=new N,To=new N;class Lu{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Eo.copy(e).add(t).multiplyScalar(.5),ar.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(Eo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(ar),a=Nn.dot(this.direction),c=-Nn.dot(ar),l=Nn.lengthSq(),h=Math.abs(1-o*o);let u,p,g,y;if(h>0)if(u=o*c-a,p=o*a-c,y=r*h,u>=0)if(p>=-y)if(p<=y){const _=1/h;u*=_,p*=_,g=u*(u+o*p+2*a)+p*(o*u+p+2*c)+l}else p=r,u=Math.max(0,-(o*p+a)),g=-u*u+p*(p+2*c)+l;else p=-r,u=Math.max(0,-(o*p+a)),g=-u*u+p*(p+2*c)+l;else p<=-y?(u=Math.max(0,-(-o*r+a)),p=u>0?-r:Math.min(Math.max(-r,-c),r),g=-u*u+p*(p+2*c)+l):p<=y?(u=0,p=Math.min(Math.max(-r,-c),r),g=p*(p+2*c)+l):(u=Math.max(0,-(o*r+a)),p=u>0?r:Math.min(Math.max(-r,-c),r),g=-u*u+p*(p+2*c)+l);else p=o>0?-r:r,u=Math.max(0,-(o*p+a)),g=-u*u+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Eo).addScaledVector(ar,p),g}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,s=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,s=(e.min.x-p.x)*l),h>=0?(r=(e.min.y-p.y)*h,o=(e.max.y-p.y)*h):(r=(e.max.y-p.y)*h,o=(e.min.y-p.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-p.z)*u,c=(e.max.z-p.z)*u):(a=(e.max.z-p.z)*u,c=(e.min.z-p.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,n,s,r){bo.subVectors(t,e),cr.subVectors(n,e),To.crossVectors(bo,cr);let o=this.direction.dot(To),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Nn.subVectors(this.origin,e);const c=a*this.direction.dot(cr.crossVectors(Nn,cr));if(c<0)return null;const l=a*this.direction.dot(bo.cross(Nn));if(l<0||c+l>o)return null;const h=-a*Nn.dot(To);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class it{constructor(e,t,n,s,r,o,a,c,l,h,u,p,g,y,_,f){it.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,p,g,y,_,f)}set(e,t,n,s,r,o,a,c,l,h,u,p,g,y,_,f){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=p,d[3]=g,d[7]=y,d[11]=_,d[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new it().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Di.setFromMatrixColumn(e,0).length(),r=1/Di.setFromMatrixColumn(e,1).length(),o=1/Di.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const p=o*h,g=o*u,y=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=g+y*l,t[5]=p-_*l,t[9]=-a*c,t[2]=_-p*l,t[6]=y+g*l,t[10]=o*c}else if(e.order==="YXZ"){const p=c*h,g=c*u,y=l*h,_=l*u;t[0]=p+_*a,t[4]=y*a-g,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=g*a-y,t[6]=_+p*a,t[10]=o*c}else if(e.order==="ZXY"){const p=c*h,g=c*u,y=l*h,_=l*u;t[0]=p-_*a,t[4]=-o*u,t[8]=y+g*a,t[1]=g+y*a,t[5]=o*h,t[9]=_-p*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const p=o*h,g=o*u,y=a*h,_=a*u;t[0]=c*h,t[4]=y*l-g,t[8]=p*l+_,t[1]=c*u,t[5]=_*l+p,t[9]=g*l-y,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const p=o*c,g=o*l,y=a*c,_=a*l;t[0]=c*h,t[4]=_-p*u,t[8]=y*u+g,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=g*u+y,t[10]=p-_*u}else if(e.order==="XZY"){const p=o*c,g=o*l,y=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=p*u+_,t[5]=o*h,t[9]=g*u-y,t[2]=y*u-g,t[6]=a*h,t[10]=_*u+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Qp,e,em)}lookAt(e,t,n){const s=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Fn.crossVectors(n,Gt),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Fn.crossVectors(n,Gt)),Fn.normalize(),lr.crossVectors(Gt,Fn),s[0]=Fn.x,s[4]=lr.x,s[8]=Gt.x,s[1]=Fn.y,s[5]=lr.y,s[9]=Gt.y,s[2]=Fn.z,s[6]=lr.z,s[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],p=n[9],g=n[13],y=n[2],_=n[6],f=n[10],d=n[14],m=n[3],v=n[7],x=n[11],T=n[15],E=s[0],b=s[4],R=s[8],w=s[12],M=s[1],L=s[5],O=s[9],S=s[13],P=s[2],U=s[6],I=s[10],V=s[14],k=s[3],F=s[7],B=s[11],j=s[15];return r[0]=o*E+a*M+c*P+l*k,r[4]=o*b+a*L+c*U+l*F,r[8]=o*R+a*O+c*I+l*B,r[12]=o*w+a*S+c*V+l*j,r[1]=h*E+u*M+p*P+g*k,r[5]=h*b+u*L+p*U+g*F,r[9]=h*R+u*O+p*I+g*B,r[13]=h*w+u*S+p*V+g*j,r[2]=y*E+_*M+f*P+d*k,r[6]=y*b+_*L+f*U+d*F,r[10]=y*R+_*O+f*I+d*B,r[14]=y*w+_*S+f*V+d*j,r[3]=m*E+v*M+x*P+T*k,r[7]=m*b+v*L+x*U+T*F,r[11]=m*R+v*O+x*I+T*B,r[15]=m*w+v*S+x*V+T*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],p=e[10],g=e[14],y=e[3],_=e[7],f=e[11],d=e[15];return y*(+r*c*u-s*l*u-r*a*p+n*l*p+s*a*g-n*c*g)+_*(+t*c*g-t*l*p+r*o*p-s*o*g+s*l*h-r*c*h)+f*(+t*l*u-t*a*g-r*o*u+n*o*g+r*a*h-n*l*h)+d*(-s*a*h-t*c*u+t*a*p+s*o*u-n*o*p+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],p=e[10],g=e[11],y=e[12],_=e[13],f=e[14],d=e[15],m=u*f*l-_*p*l+_*c*g-a*f*g-u*c*d+a*p*d,v=y*p*l-h*f*l-y*c*g+o*f*g+h*c*d-o*p*d,x=h*_*l-y*u*l+y*a*g-o*_*g-h*a*d+o*u*d,T=y*u*c-h*_*c-y*a*p+o*_*p+h*a*f-o*u*f,E=t*m+n*v+s*x+r*T;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/E;return e[0]=m*b,e[1]=(_*p*r-u*f*r-_*s*g+n*f*g+u*s*d-n*p*d)*b,e[2]=(a*f*r-_*c*r+_*s*l-n*f*l-a*s*d+n*c*d)*b,e[3]=(u*c*r-a*p*r-u*s*l+n*p*l+a*s*g-n*c*g)*b,e[4]=v*b,e[5]=(h*f*r-y*p*r+y*s*g-t*f*g-h*s*d+t*p*d)*b,e[6]=(y*c*r-o*f*r-y*s*l+t*f*l+o*s*d-t*c*d)*b,e[7]=(o*p*r-h*c*r+h*s*l-t*p*l-o*s*g+t*c*g)*b,e[8]=x*b,e[9]=(y*u*r-h*_*r-y*n*g+t*_*g+h*n*d-t*u*d)*b,e[10]=(o*_*r-y*a*r+y*n*l-t*_*l-o*n*d+t*a*d)*b,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*g-t*a*g)*b,e[12]=T*b,e[13]=(h*_*s-y*u*s+y*n*p-t*_*p-h*n*f+t*u*f)*b,e[14]=(y*a*s-o*_*s-y*n*c+t*_*c+o*n*f-t*a*f)*b,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*p+t*a*p)*b,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,p=r*l,g=r*h,y=r*u,_=o*h,f=o*u,d=a*u,m=c*l,v=c*h,x=c*u,T=n.x,E=n.y,b=n.z;return s[0]=(1-(_+d))*T,s[1]=(g+x)*T,s[2]=(y-v)*T,s[3]=0,s[4]=(g-x)*E,s[5]=(1-(p+d))*E,s[6]=(f+m)*E,s[7]=0,s[8]=(y+v)*b,s[9]=(f-m)*b,s[10]=(1-(p+_))*b,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Di.set(s[0],s[1],s[2]).length();const o=Di.set(s[4],s[5],s[6]).length(),a=Di.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const l=1/r,h=1/o,u=1/a;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,t.setFromRotationMatrix(sn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Tn){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),p=(n+s)/(n-s);let g,y;if(a===Tn)g=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Vr)g=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Tn){const c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),p=(t+e)*l,g=(n+s)*h;let y,_;if(a===Tn)y=(o+r)*u,_=-2*u;else if(a===Vr)y=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-g,c[2]=0,c[6]=0,c[10]=_,c[14]=-y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Di=new N,sn=new it,Qp=new N(0,0,0),em=new N(1,1,1),Fn=new N,lr=new N,Gt=new N,yl=new it,_l=new Zt;class Qt{constructor(e=0,t=0,n=0,s=Qt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],p=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin(Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,g),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,g),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-u,g),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Bt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(p,g),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,g));break;case"XZY":this._z=Math.asin(-Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,g),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return yl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(yl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return _l.setFromEuler(this),this.setFromQuaternion(_l,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qt.DEFAULT_ORDER="XYZ";class Du{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let tm=0;const xl=new N,Ii=new Zt,yn=new it,hr=new N,_s=new N,nm=new N,im=new Zt,Ml=new N(1,0,0),Sl=new N(0,1,0),wl=new N(0,0,1),El={type:"added"},sm={type:"removed"},Ui={type:"childadded",child:null},Ao={type:"childremoved",child:null};class yt extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new N,t=new Qt,n=new Zt,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new We}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Du,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.multiply(Ii),this}rotateOnWorldAxis(e,t){return Ii.setFromAxisAngle(e,t),this.quaternion.premultiply(Ii),this}rotateX(e){return this.rotateOnAxis(Ml,e)}rotateY(e){return this.rotateOnAxis(Sl,e)}rotateZ(e){return this.rotateOnAxis(wl,e)}translateOnAxis(e,t){return xl.copy(e).applyQuaternion(this.quaternion),this.position.add(xl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ml,e)}translateY(e){return this.translateOnAxis(Sl,e)}translateZ(e){return this.translateOnAxis(wl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?hr.copy(e):hr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),_s.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(_s,hr,this.up):yn.lookAt(hr,_s,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),Ii.setFromRotationMatrix(yn),this.quaternion.premultiply(Ii.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(El),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(sm),Ao.child=e,this.dispatchEvent(Ao),Ao.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(El),Ui.child=e,this.dispatchEvent(Ui),Ui.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,e,nm),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_s,im,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),p=o(e.skeletons),g=o(e.animations),y=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),p.length>0&&(n.skeletons=p),g.length>0&&(n.animations=g),y.length>0&&(n.nodes=y)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}yt.DEFAULT_UP=new N(0,1,0);yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new N,_n=new N,Ro=new N,xn=new N,Ni=new N,Fi=new N,bl=new N,Co=new N,Po=new N,Lo=new N,Do=new at,Io=new at,Uo=new at;class Kt{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),_n.subVectors(n,t),Ro.subVectors(e,t);const o=rn.dot(rn),a=rn.dot(_n),c=rn.dot(Ro),l=_n.dot(_n),h=_n.dot(Ro),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const p=1/u,g=(l*c-a*h)*p,y=(o*h-a*c)*p;return r.set(1-g-y,y,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xn.x),c.addScaledVector(o,xn.y),c.addScaledVector(a,xn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Do.setScalar(0),Io.setScalar(0),Uo.setScalar(0),Do.fromBufferAttribute(e,t),Io.fromBufferAttribute(e,n),Uo.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Do,r.x),o.addScaledVector(Io,r.y),o.addScaledVector(Uo,r.z),o}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),_n.subVectors(e,t),rn.cross(_n).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),rn.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Ni.subVectors(s,n),Fi.subVectors(r,n),Co.subVectors(e,n);const c=Ni.dot(Co),l=Fi.dot(Co);if(c<=0&&l<=0)return t.copy(n);Po.subVectors(e,s);const h=Ni.dot(Po),u=Fi.dot(Po);if(h>=0&&u<=h)return t.copy(s);const p=c*u-h*l;if(p<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Ni,o);Lo.subVectors(e,r);const g=Ni.dot(Lo),y=Fi.dot(Lo);if(y>=0&&g<=y)return t.copy(r);const _=g*l-c*y;if(_<=0&&l>=0&&y<=0)return a=l/(l-y),t.copy(n).addScaledVector(Fi,a);const f=h*y-g*u;if(f<=0&&u-h>=0&&g-y>=0)return bl.subVectors(r,s),a=(u-h)/(u-h+(g-y)),t.copy(s).addScaledVector(bl,a);const d=1/(f+_+p);return o=_*d,a=p*d,t.copy(n).addScaledVector(Ni,o).addScaledVector(Fi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Iu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},ur={h:0,s:0,l:0};function No(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=Gp(e,1),t=Bt(t,0,1),n=Bt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=No(o,r,e+1/3),this.g=No(o,r,e),this.b=No(o,r,e-1/3)}return Ze.toWorkingColorSpace(this,s),this}setStyle(e,t=jt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=Iu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return Ze.fromWorkingColorSpace(At.copy(this),e),Math.round(Bt(At.r*255,0,255))*65536+Math.round(Bt(At.g*255,0,255))*256+Math.round(Bt(At.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(At.copy(this),t);const n=At.r,s=At.g,r=At.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=jt){Ze.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,s=At.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(ur);const n=yo(On.h,ur.h,t),s=yo(On.s,ur.s,t),r=yo(On.l,ur.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new qe;qe.NAMES=Iu;let rm=0;class Ei extends cs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rm++}),this.uuid=$n(),this.name="",this.blending=Xi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ha,this.blendDst=ua,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=es,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ll,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Xi&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ha&&(n.blendSrc=this.blendSrc),this.blendDst!==ua&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==es&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ll&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ke extends Ei{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=fu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gt=new N,dr=new ze;class ft{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ya,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)dr.fromBufferAttribute(this,t),dr.applyMatrix3(e),this.setXY(t,dr.x,dr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ya&&(e.usage=this.usage),e}}class Uu extends ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Nu extends ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class mt extends ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}let om=0;const Yt=new it,Fo=new yt,Oi=new N,Ht=new Ws,xs=new Ws,St=new N;class Mt extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:om++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ru(e)?Nu:Uu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return Fo.lookAt(e),Fo.updateMatrix(),this.applyMatrix4(Fo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Oi).negate(),this.translate(Oi.x,Oi.y,Oi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new mt(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ws);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(St.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(St),St.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(St)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(St.addVectors(Ht.min,xs.min),Ht.expandByPoint(St),St.addVectors(Ht.max,xs.max),Ht.expandByPoint(St)):(Ht.expandByPoint(xs.min),Ht.expandByPoint(xs.max))}Ht.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)St.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(St));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)St.fromBufferAttribute(a,l),c&&(Oi.fromBufferAttribute(e,l),St.add(Oi)),s=Math.max(s,n.distanceToSquared(St))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ft(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let R=0;R<n.count;R++)a[R]=new N,c[R]=new N;const l=new N,h=new N,u=new N,p=new ze,g=new ze,y=new ze,_=new N,f=new N;function d(R,w,M){l.fromBufferAttribute(n,R),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),p.fromBufferAttribute(r,R),g.fromBufferAttribute(r,w),y.fromBufferAttribute(r,M),h.sub(l),u.sub(l),g.sub(p),y.sub(p);const L=1/(g.x*y.y-y.x*g.y);isFinite(L)&&(_.copy(h).multiplyScalar(y.y).addScaledVector(u,-g.y).multiplyScalar(L),f.copy(u).multiplyScalar(g.x).addScaledVector(h,-y.x).multiplyScalar(L),a[R].add(_),a[w].add(_),a[M].add(_),c[R].add(f),c[w].add(f),c[M].add(f))}let m=this.groups;m.length===0&&(m=[{start:0,count:e.count}]);for(let R=0,w=m.length;R<w;++R){const M=m[R],L=M.start,O=M.count;for(let S=L,P=L+O;S<P;S+=3)d(e.getX(S+0),e.getX(S+1),e.getX(S+2))}const v=new N,x=new N,T=new N,E=new N;function b(R){T.fromBufferAttribute(s,R),E.copy(T);const w=a[R];v.copy(w),v.sub(T.multiplyScalar(T.dot(w))).normalize(),x.crossVectors(E,w);const L=x.dot(c[R])<0?-1:1;o.setXYZW(R,v.x,v.y,v.z,L)}for(let R=0,w=m.length;R<w;++R){const M=m[R],L=M.start,O=M.count;for(let S=L,P=L+O;S<P;S+=3)b(e.getX(S+0)),b(e.getX(S+1)),b(e.getX(S+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,g=n.count;p<g;p++)n.setXYZ(p,0,0,0);const s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,h=new N,u=new N;if(e)for(let p=0,g=e.count;p<g;p+=3){const y=e.getX(p+0),_=e.getX(p+1),f=e.getX(p+2);s.fromBufferAttribute(t,y),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,f),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,y),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,f),a.add(h),c.add(h),l.add(h),n.setXYZ(y,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,g=t.count;p<g;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)St.fromBufferAttribute(e,t),St.normalize(),e.setXYZ(t,St.x,St.y,St.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,p=new l.constructor(c.length*h);let g=0,y=0;for(let _=0,f=c.length;_<f;_++){a.isInterleavedBufferAttribute?g=c[_]*a.data.stride+a.offset:g=c[_]*h;for(let d=0;d<h;d++)p[y++]=l[g++]}return new ft(p,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Mt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const p=l[h],g=e(p,n);c.push(g)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,p=l.length;u<p;u++){const g=l[u];h.push(g.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let p=0,g=u.length;p<g;p++)h.push(u[p].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tl=new it,ni=new Lu,fr=new ls,Al=new N,pr=new N,mr=new N,gr=new N,Oo=new N,vr=new N,Rl=new N,yr=new N;class we extends yt{constructor(e=new Mt,t=new Ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){vr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Oo.fromBufferAttribute(u,e),o?vr.addScaledVector(Oo,h):vr.addScaledVector(Oo.sub(t),h))}t.add(vr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),fr.copy(n.boundingSphere),fr.applyMatrix4(r),ni.copy(e.ray).recast(e.near),!(fr.containsPoint(ni.origin)===!1&&(ni.intersectSphere(fr,Al)===null||ni.origin.distanceToSquared(Al)>(e.far-e.near)**2))&&(Tl.copy(r).invert(),ni.copy(e.ray).applyMatrix4(Tl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,p=r.groups,g=r.drawRange;if(a!==null)if(Array.isArray(o))for(let y=0,_=p.length;y<_;y++){const f=p[y],d=o[f.materialIndex],m=Math.max(f.start,g.start),v=Math.min(a.count,Math.min(f.start+f.count,g.start+g.count));for(let x=m,T=v;x<T;x+=3){const E=a.getX(x),b=a.getX(x+1),R=a.getX(x+2);s=_r(this,d,e,n,l,h,u,E,b,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const y=Math.max(0,g.start),_=Math.min(a.count,g.start+g.count);for(let f=y,d=_;f<d;f+=3){const m=a.getX(f),v=a.getX(f+1),x=a.getX(f+2);s=_r(this,o,e,n,l,h,u,m,v,x),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let y=0,_=p.length;y<_;y++){const f=p[y],d=o[f.materialIndex],m=Math.max(f.start,g.start),v=Math.min(c.count,Math.min(f.start+f.count,g.start+g.count));for(let x=m,T=v;x<T;x+=3){const E=x,b=x+1,R=x+2;s=_r(this,d,e,n,l,h,u,E,b,R),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const y=Math.max(0,g.start),_=Math.min(c.count,g.start+g.count);for(let f=y,d=_;f<d;f+=3){const m=f,v=f+1,x=f+2;s=_r(this,o,e,n,l,h,u,m,v,x),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function am(i,e,t,n,s,r,o,a){let c;if(e.side===Nt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Kn,a),c===null)return null;yr.copy(a),yr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(yr);return l<t.near||l>t.far?null:{distance:l,point:yr.clone(),object:i}}function _r(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,pr),i.getVertexPosition(c,mr),i.getVertexPosition(l,gr);const h=am(i,e,t,n,pr,mr,gr,Rl);if(h){const u=new N;Kt.getBarycoord(Rl,pr,mr,gr,u),s&&(h.uv=Kt.getInterpolatedAttribute(s,a,c,l,u,new ze)),r&&(h.uv1=Kt.getInterpolatedAttribute(r,a,c,l,u,new ze)),o&&(h.normal=Kt.getInterpolatedAttribute(o,a,c,l,u,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:c,c:l,normal:new N,materialIndex:0};Kt.getNormal(pr,mr,gr,p.normal),h.face=p,h.barycoord=u}return h}class vt extends Mt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let p=0,g=0;y("z","y","x",-1,-1,n,t,e,o,r,0),y("z","y","x",1,-1,n,t,-e,o,r,1),y("x","z","y",1,1,e,n,t,s,o,2),y("x","z","y",1,-1,e,n,-t,s,o,3),y("x","y","z",1,-1,e,t,n,s,r,4),y("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(u,2));function y(_,f,d,m,v,x,T,E,b,R,w){const M=x/b,L=T/R,O=x/2,S=T/2,P=E/2,U=b+1,I=R+1;let V=0,k=0;const F=new N;for(let B=0;B<I;B++){const j=B*L-S;for(let se=0;se<U;se++){const le=se*M-O;F[_]=le*m,F[f]=j*v,F[d]=P,l.push(F.x,F.y,F.z),F[_]=0,F[f]=0,F[d]=E>0?1:-1,h.push(F.x,F.y,F.z),u.push(se/b),u.push(1-B/R),V+=1}}for(let B=0;B<R;B++)for(let j=0;j<b;j++){const se=p+j+U*B,le=p+j+U*(B+1),H=p+(j+1)+U*(B+1),ee=p+(j+1)+U*B;c.push(se,le,ee),c.push(le,H,ee),k+=6}a.addGroup(g,k,w),g+=k,p+=V}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function rs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=rs(i[t]);for(const s in n)e[s]=n[s]}return e}function cm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Fu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const lm={clone:rs,merge:It};var hm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,um=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends Ei{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=hm,this.fragmentShader=um,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=rs(e.uniforms),this.uniformsGroups=cm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ou extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=Tn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new N,Cl=new ze,Pl=new ze;class Wt extends Ou{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ja*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ja*2*Math.atan(Math.tan(vo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,Cl,Pl),t.subVectors(Pl,Cl)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ki=-90,Bi=1;class dm extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wt(ki,Bi,e,t);s.layers=this.layers,this.add(s);const r=new Wt(ki,Bi,e,t);r.layers=this.layers,this.add(r);const o=new Wt(ki,Bi,e,t);o.layers=this.layers,this.add(o);const a=new Wt(ki,Bi,e,t);a.layers=this.layers,this.add(a);const c=new Wt(ki,Bi,e,t);c.layers=this.layers,this.add(c);const l=new Wt(ki,Bi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),p=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,p,g),e.xr.enabled=y,n.texture.needsPMREMUpdate=!0}}class ku extends Ft{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ts,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class fm extends _i{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new ku(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:fn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new vt(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:rs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nt,blending:qn});r.uniforms.tEquirect.value=t;const o=new we(s,r),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=fn),new dm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const ko=new N,pm=new N,mm=new We;class ai{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ko.subVectors(n,t).cross(pm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ko),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||mm.getNormalMatrix(e),s=this.coplanarPoint(ko).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new ls,xr=new N;class pc{constructor(e=new ai,t=new ai,n=new ai,s=new ai,r=new ai,o=new ai){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Tn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],p=s[7],g=s[8],y=s[9],_=s[10],f=s[11],d=s[12],m=s[13],v=s[14],x=s[15];if(n[0].setComponents(c-r,p-l,f-g,x-d).normalize(),n[1].setComponents(c+r,p+l,f+g,x+d).normalize(),n[2].setComponents(c+o,p+h,f+y,x+m).normalize(),n[3].setComponents(c-o,p-h,f-y,x-m).normalize(),n[4].setComponents(c-a,p-u,f-_,x-v).normalize(),t===Tn)n[5].setComponents(c+a,p+u,f+_,x+v).normalize();else if(t===Vr)n[5].setComponents(a,u,_,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(xr.x=s.normal.x>0?e.max.x:e.min.x,xr.y=s.normal.y>0?e.max.y:e.min.y,xr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Bu(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function gm(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),a.onUploadCallback();let g;if(l instanceof Float32Array)g=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)g=i.SHORT;else if(l instanceof Uint32Array)g=i.UNSIGNED_INT;else if(l instanceof Int32Array)g=i.INT;else if(l instanceof Int8Array)g=i.BYTE;else if(l instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:g,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((g,y)=>g.start-y.start);let p=0;for(let g=1;g<u.length;g++){const y=u[p],_=u[g];_.start<=y.start+y.count+1?y.count=Math.max(y.count,_.start+_.count-y.start):(++p,u[p]=_)}u.length=p+1;for(let g=0,y=u.length;g<y;g++){const _=u[g];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class qs extends Mt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,p=t/c,g=[],y=[],_=[],f=[];for(let d=0;d<h;d++){const m=d*p-o;for(let v=0;v<l;v++){const x=v*u-r;y.push(x,-m,0),_.push(0,0,1),f.push(v/a),f.push(1-d/c)}}for(let d=0;d<c;d++)for(let m=0;m<a;m++){const v=m+l*d,x=m+l*(d+1),T=m+1+l*(d+1),E=m+1+l*d;g.push(v,x,E),g.push(x,T,E)}this.setIndex(g),this.setAttribute("position",new mt(y,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qs(e.width,e.height,e.widthSegments,e.heightSegments)}}var vm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ym=`#ifdef USE_ALPHAHASH
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
#endif`,_m=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wm=`#ifdef USE_AOMAP
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
#endif`,Em=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,bm=`#ifdef USE_BATCHING
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
#endif`,Tm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Am=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pm=`#ifdef USE_IRIDESCENCE
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
#endif`,Lm=`#ifdef USE_BUMPMAP
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
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Um=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Om=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,km=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Bm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,zm=`#define PI 3.141592653589793
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
} // validated`,Vm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Gm=`vec3 transformedNormal = objectNormal;
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
#endif`,Hm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Xm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$m="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ym=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jm=`#ifdef USE_ENVMAP
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
#endif`,Km=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Zm=`#ifdef USE_ENVMAP
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
#endif`,Jm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qm=`#ifdef USE_ENVMAP
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
#endif`,e0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,t0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,n0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,i0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,s0=`#ifdef USE_GRADIENTMAP
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
}`,r0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,o0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,a0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c0=`uniform bool receiveShadow;
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
#endif`,l0=`#ifdef USE_ENVMAP
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
#endif`,h0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,u0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,d0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,f0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,p0=`PhysicalMaterial material;
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
#endif`,m0=`struct PhysicalMaterial {
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
}`,g0=`
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
#endif`,v0=`#if defined( RE_IndirectDiffuse )
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
#endif`,y0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_0=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,x0=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M0=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,S0=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,w0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,E0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,b0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,T0=`#if defined( USE_POINTS_UV )
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
#endif`,A0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,R0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,C0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,P0=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,L0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D0=`#ifdef USE_MORPHTARGETS
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
#endif`,I0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,N0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,F0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,B0=`#ifdef USE_NORMALMAP
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
#endif`,z0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,V0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,G0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,W0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,X0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Y0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,j0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,K0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Z0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,J0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Q0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,eg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,tg=`float getShadowMask() {
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
}`,ng=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ig=`#ifdef USE_SKINNING
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
#endif`,sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rg=`#ifdef USE_SKINNING
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
#endif`,og=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ag=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lg=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hg=`#ifdef USE_TRANSMISSION
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
#endif`,ug=`#ifdef USE_TRANSMISSION
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
#endif`,dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const gg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,vg=`uniform sampler2D t2D;
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
}`,yg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_g=`#ifdef ENVMAP_TYPE_CUBE
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
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Sg=`#include <common>
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
}`,wg=`#if DEPTH_PACKING == 3200
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
}`,Eg=`#define DISTANCE
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
}`,bg=`#define DISTANCE
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
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`uniform float scale;
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
}`,Cg=`uniform vec3 diffuse;
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
}`,Pg=`#include <common>
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
}`,Lg=`uniform vec3 diffuse;
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
}`,Dg=`#define LAMBERT
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
}`,Ig=`#define LAMBERT
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
}`,Ug=`#define MATCAP
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
}`,Ng=`#define MATCAP
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
}`,Fg=`#define NORMAL
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
}`,Og=`#define NORMAL
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
}`,kg=`#define PHONG
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
}`,Bg=`#define PHONG
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
}`,zg=`#define STANDARD
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
}`,Vg=`#define STANDARD
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
}`,Gg=`#define TOON
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
}`,Hg=`#define TOON
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
}`,Wg=`uniform float size;
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
}`,qg=`uniform vec3 diffuse;
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
}`,Xg=`#include <common>
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
}`,$g=`uniform vec3 color;
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
}`,Yg=`uniform float rotation;
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
}`,jg=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:vm,alphahash_pars_fragment:ym,alphamap_fragment:_m,alphamap_pars_fragment:xm,alphatest_fragment:Mm,alphatest_pars_fragment:Sm,aomap_fragment:wm,aomap_pars_fragment:Em,batching_pars_vertex:bm,batching_vertex:Tm,begin_vertex:Am,beginnormal_vertex:Rm,bsdfs:Cm,iridescence_fragment:Pm,bumpmap_pars_fragment:Lm,clipping_planes_fragment:Dm,clipping_planes_pars_fragment:Im,clipping_planes_pars_vertex:Um,clipping_planes_vertex:Nm,color_fragment:Fm,color_pars_fragment:Om,color_pars_vertex:km,color_vertex:Bm,common:zm,cube_uv_reflection_fragment:Vm,defaultnormal_vertex:Gm,displacementmap_pars_vertex:Hm,displacementmap_vertex:Wm,emissivemap_fragment:qm,emissivemap_pars_fragment:Xm,colorspace_fragment:$m,colorspace_pars_fragment:Ym,envmap_fragment:jm,envmap_common_pars_fragment:Km,envmap_pars_fragment:Zm,envmap_pars_vertex:Jm,envmap_physical_pars_fragment:l0,envmap_vertex:Qm,fog_vertex:e0,fog_pars_vertex:t0,fog_fragment:n0,fog_pars_fragment:i0,gradientmap_pars_fragment:s0,lightmap_pars_fragment:r0,lights_lambert_fragment:o0,lights_lambert_pars_fragment:a0,lights_pars_begin:c0,lights_toon_fragment:h0,lights_toon_pars_fragment:u0,lights_phong_fragment:d0,lights_phong_pars_fragment:f0,lights_physical_fragment:p0,lights_physical_pars_fragment:m0,lights_fragment_begin:g0,lights_fragment_maps:v0,lights_fragment_end:y0,logdepthbuf_fragment:_0,logdepthbuf_pars_fragment:x0,logdepthbuf_pars_vertex:M0,logdepthbuf_vertex:S0,map_fragment:w0,map_pars_fragment:E0,map_particle_fragment:b0,map_particle_pars_fragment:T0,metalnessmap_fragment:A0,metalnessmap_pars_fragment:R0,morphinstance_vertex:C0,morphcolor_vertex:P0,morphnormal_vertex:L0,morphtarget_pars_vertex:D0,morphtarget_vertex:I0,normal_fragment_begin:U0,normal_fragment_maps:N0,normal_pars_fragment:F0,normal_pars_vertex:O0,normal_vertex:k0,normalmap_pars_fragment:B0,clearcoat_normal_fragment_begin:z0,clearcoat_normal_fragment_maps:V0,clearcoat_pars_fragment:G0,iridescence_pars_fragment:H0,opaque_fragment:W0,packing:q0,premultiplied_alpha_fragment:X0,project_vertex:$0,dithering_fragment:Y0,dithering_pars_fragment:j0,roughnessmap_fragment:K0,roughnessmap_pars_fragment:Z0,shadowmap_pars_fragment:J0,shadowmap_pars_vertex:Q0,shadowmap_vertex:eg,shadowmask_pars_fragment:tg,skinbase_vertex:ng,skinning_pars_vertex:ig,skinning_vertex:sg,skinnormal_vertex:rg,specularmap_fragment:og,specularmap_pars_fragment:ag,tonemapping_fragment:cg,tonemapping_pars_fragment:lg,transmission_fragment:hg,transmission_pars_fragment:ug,uv_pars_fragment:dg,uv_pars_vertex:fg,uv_vertex:pg,worldpos_vertex:mg,background_vert:gg,background_frag:vg,backgroundCube_vert:yg,backgroundCube_frag:_g,cube_vert:xg,cube_frag:Mg,depth_vert:Sg,depth_frag:wg,distanceRGBA_vert:Eg,distanceRGBA_frag:bg,equirect_vert:Tg,equirect_frag:Ag,linedashed_vert:Rg,linedashed_frag:Cg,meshbasic_vert:Pg,meshbasic_frag:Lg,meshlambert_vert:Dg,meshlambert_frag:Ig,meshmatcap_vert:Ug,meshmatcap_frag:Ng,meshnormal_vert:Fg,meshnormal_frag:Og,meshphong_vert:kg,meshphong_frag:Bg,meshphysical_vert:zg,meshphysical_frag:Vg,meshtoon_vert:Gg,meshtoon_frag:Hg,points_vert:Wg,points_frag:qg,shadow_vert:Xg,shadow_frag:$g,sprite_vert:Yg,sprite_frag:jg},me={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},un={basic:{uniforms:It([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:It([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new qe(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:It([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:It([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:It([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new qe(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:It([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:It([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:It([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:It([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:It([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:It([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:It([me.common,me.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:It([me.lights,me.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};un.physical={uniforms:It([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Mr={r:0,b:0,g:0},si=new Qt,Kg=new it;function Zg(i,e,t,n,s,r,o){const a=new qe(0);let c=r===!0?0:1,l,h,u=null,p=0,g=null;function y(m){let v=m.isScene===!0?m.background:null;return v&&v.isTexture&&(v=(m.backgroundBlurriness>0?t:e).get(v)),v}function _(m){let v=!1;const x=y(m);x===null?d(a,c):x&&x.isColor&&(d(x,1),v=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(m,v){const x=y(v);x&&(x.isCubeTexture||x.mapping===jr)?(h===void 0&&(h=new we(new vt(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:rs(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,E,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),si.copy(v.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Kg.makeRotationFromEuler(si)),h.material.toneMapped=Ze.getTransfer(x.colorSpace)!==st,(u!==x||p!==x.version||g!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,p=x.version,g=i.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new we(new qs(2,2),new Zn({name:"BackgroundMaterial",uniforms:rs(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(x.colorSpace)!==st,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||p!==x.version||g!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,p=x.version,g=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function d(m,v){m.getRGB(Mr,Fu(i)),n.buffers.color.setClear(Mr.r,Mr.g,Mr.b,v,o)}return{getClearColor:function(){return a},setClearColor:function(m,v=1){a.set(m),c=v,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,d(a,c)},render:_,addToRenderList:f}}function Jg(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(M,L,O,S,P){let U=!1;const I=u(S,O,L);r!==I&&(r=I,l(r.object)),U=g(M,S,O,P),U&&y(M,S,O,P),P!==null&&e.update(P,i.ELEMENT_ARRAY_BUFFER),(U||o)&&(o=!1,x(M,L,O,S),P!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,L,O){const S=O.wireframe===!0;let P=n[M.id];P===void 0&&(P={},n[M.id]=P);let U=P[L.id];U===void 0&&(U={},P[L.id]=U);let I=U[S];return I===void 0&&(I=p(c()),U[S]=I),I}function p(M){const L=[],O=[],S=[];for(let P=0;P<t;P++)L[P]=0,O[P]=0,S[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:O,attributeDivisors:S,object:M,attributes:{},index:null}}function g(M,L,O,S){const P=r.attributes,U=L.attributes;let I=0;const V=O.getAttributes();for(const k in V)if(V[k].location>=0){const B=P[k];let j=U[k];if(j===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(j=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(j=M.instanceColor)),B===void 0||B.attribute!==j||j&&B.data!==j.data)return!0;I++}return r.attributesNum!==I||r.index!==S}function y(M,L,O,S){const P={},U=L.attributes;let I=0;const V=O.getAttributes();for(const k in V)if(V[k].location>=0){let B=U[k];B===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(B=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(B=M.instanceColor));const j={};j.attribute=B,B&&B.data&&(j.data=B.data),P[k]=j,I++}r.attributes=P,r.attributesNum=I,r.index=S}function _(){const M=r.newAttributes;for(let L=0,O=M.length;L<O;L++)M[L]=0}function f(M){d(M,0)}function d(M,L){const O=r.newAttributes,S=r.enabledAttributes,P=r.attributeDivisors;O[M]=1,S[M]===0&&(i.enableVertexAttribArray(M),S[M]=1),P[M]!==L&&(i.vertexAttribDivisor(M,L),P[M]=L)}function m(){const M=r.newAttributes,L=r.enabledAttributes;for(let O=0,S=L.length;O<S;O++)L[O]!==M[O]&&(i.disableVertexAttribArray(O),L[O]=0)}function v(M,L,O,S,P,U,I){I===!0?i.vertexAttribIPointer(M,L,O,P,U):i.vertexAttribPointer(M,L,O,S,P,U)}function x(M,L,O,S){_();const P=S.attributes,U=O.getAttributes(),I=L.defaultAttributeValues;for(const V in U){const k=U[V];if(k.location>=0){let F=P[V];if(F===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(F=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(F=M.instanceColor)),F!==void 0){const B=F.normalized,j=F.itemSize,se=e.get(F);if(se===void 0)continue;const le=se.buffer,H=se.type,ee=se.bytesPerElement,he=H===i.INT||H===i.UNSIGNED_INT||F.gpuType===cc;if(F.isInterleavedBufferAttribute){const te=F.data,Me=te.stride,Ee=F.offset;if(te.isInstancedInterleavedBuffer){for(let Te=0;Te<k.locationSize;Te++)d(k.location+Te,te.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let Te=0;Te<k.locationSize;Te++)f(k.location+Te);i.bindBuffer(i.ARRAY_BUFFER,le);for(let Te=0;Te<k.locationSize;Te++)v(k.location+Te,j/k.locationSize,H,B,Me*ee,(Ee+j/k.locationSize*Te)*ee,he)}else{if(F.isInstancedBufferAttribute){for(let te=0;te<k.locationSize;te++)d(k.location+te,F.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let te=0;te<k.locationSize;te++)f(k.location+te);i.bindBuffer(i.ARRAY_BUFFER,le);for(let te=0;te<k.locationSize;te++)v(k.location+te,j/k.locationSize,H,B,j*ee,j/k.locationSize*te*ee,he)}}else if(I!==void 0){const B=I[V];if(B!==void 0)switch(B.length){case 2:i.vertexAttrib2fv(k.location,B);break;case 3:i.vertexAttrib3fv(k.location,B);break;case 4:i.vertexAttrib4fv(k.location,B);break;default:i.vertexAttrib1fv(k.location,B)}}}}m()}function T(){R();for(const M in n){const L=n[M];for(const O in L){const S=L[O];for(const P in S)h(S[P].object),delete S[P];delete L[O]}delete n[M]}}function E(M){if(n[M.id]===void 0)return;const L=n[M.id];for(const O in L){const S=L[O];for(const P in S)h(S[P].object),delete S[P];delete L[O]}delete n[M.id]}function b(M){for(const L in n){const O=n[L];if(O[M.id]===void 0)continue;const S=O[M.id];for(const P in S)h(S[P].object),delete S[P];delete O[M.id]}}function R(){w(),o=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:R,resetDefaultState:w,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:f,disableUnusedAttributes:m}}function Qg(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let g=0;for(let y=0;y<u;y++)g+=h[y];t.update(g,n,1)}function c(l,h,u,p){if(u===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let y=0;y<l.length;y++)o(l[y],h[y],p[y]);else{g.multiDrawArraysInstancedWEBGL(n,l,0,h,0,p,0,u);let y=0;for(let _=0;_<u;_++)y+=h[_]*p[_];t.update(y,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function e1(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const b=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==an&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const R=b===Hs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(b!==Cn&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==bn&&!R)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),v=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=y>0,E=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:p,maxTextures:g,maxVertexTextures:y,maxTextureSize:_,maxCubemapSize:f,maxAttributes:d,maxVertexUniforms:m,maxVaryings:v,maxFragmentUniforms:x,vertexTextures:T,maxSamples:E}}function t1(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new ai,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const g=u.length!==0||p||n!==0||s;return s=p,n=u.length,g},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,p){t=h(u,p,0)},this.setState=function(u,p,g){const y=u.clippingPlanes,_=u.clipIntersection,f=u.clipShadows,d=i.get(u);if(!s||y===null||y.length===0||r&&!f)r?h(null):l();else{const m=r?0:n,v=m*4;let x=d.clippingState||null;c.value=x,x=h(y,p,v,g);for(let T=0;T!==v;++T)x[T]=t[T];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=m}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,p,g,y){const _=u!==null?u.length:0;let f=null;if(_!==0){if(f=c.value,y!==!0||f===null){const d=g+_*4,m=p.matrixWorldInverse;a.getNormalMatrix(m),(f===null||f.length<d)&&(f=new Float32Array(d));for(let v=0,x=g;v!==_;++v,x+=4)o.copy(u[v]).applyMatrix4(m,a),o.normal.toArray(f,x),f[x+3]=o.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,f}}function n1(i){let e=new WeakMap;function t(o,a){return a===_a?o.mapping=ts:a===xa&&(o.mapping=ns),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===_a||a===xa)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new fm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class zu extends Ou{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const qi=4,Ll=[.125,.215,.35,.446,.526,.582],hi=20,Bo=new zu,Dl=new qe;let zo=null,Vo=0,Go=0,Ho=!1;const ci=(1+Math.sqrt(5))/2,zi=1/ci,Il=[new N(-ci,zi,0),new N(ci,zi,0),new N(-zi,0,ci),new N(zi,0,ci),new N(0,ci,-zi),new N(0,ci,zi),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Ul{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){zo=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ol(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(zo,Vo,Go),this._renderer.xr.enabled=Ho,e.scissorTest=!1,Sr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ts||e.mapping===ns?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),zo=this._renderer.getRenderTarget(),Vo=this._renderer.getActiveCubeFace(),Go=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Hs,format:an,colorSpace:as,depthBuffer:!1},s=Nl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=i1(r)),this._blurMaterial=s1(r,e,t)}return s}_compileMaterial(e){const t=new we(this._lodPlanes[0],e);this._renderer.compile(t,Bo)}_sceneToCubeUV(e,t,n,s){const a=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Dl),h.toneMapping=Xn,h.autoClear=!1;const g=new Ke({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),y=new we(new vt,g);let _=!1;const f=e.background;f?f.isColor&&(g.color.copy(f),e.background=null,_=!0):(g.color.copy(Dl),_=!0);for(let d=0;d<6;d++){const m=d%3;m===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):m===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const v=this._cubeSize;Sr(s,m*v,d>2?v:0,v,v),h.setRenderTarget(s),_&&h.render(y,a),h.render(e,a)}y.geometry.dispose(),y.material.dispose(),h.toneMapping=p,h.autoClear=u,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ts||e.mapping===ns;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ol()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Sr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Bo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Il[(s-r-1)%Il.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new we(this._lodPlanes[s],l),p=l.uniforms,g=this._sizeLods[n]-1,y=isFinite(r)?Math.PI/(2*g):2*Math.PI/(2*hi-1),_=r/y,f=isFinite(r)?1+Math.floor(h*_):hi;f>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${hi}`);const d=[];let m=0;for(let b=0;b<hi;++b){const R=b/_,w=Math.exp(-R*R/2);d.push(w),b===0?m+=w:b<f&&(m+=2*w)}for(let b=0;b<d.length;b++)d[b]=d[b]/m;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=d,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:v}=this;p.dTheta.value=y,p.mipInt.value=v-n;const x=this._sizeLods[s],T=3*x*(s>v-qi?s-v+qi:0),E=4*(this._cubeSize-x);Sr(t,T,E,3*x,2*x),c.setRenderTarget(t),c.render(u,Bo)}}function i1(i){const e=[],t=[],n=[];let s=i;const r=i-qi+1+Ll.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-qi?c=Ll[o-i+qi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,p=[h,h,u,h,u,u,h,h,u,u,h,u],g=6,y=6,_=3,f=2,d=1,m=new Float32Array(_*y*g),v=new Float32Array(f*y*g),x=new Float32Array(d*y*g);for(let E=0;E<g;E++){const b=E%3*2/3-1,R=E>2?0:-1,w=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];m.set(w,_*y*E),v.set(p,f*y*E);const M=[E,E,E,E,E,E];x.set(M,d*y*E)}const T=new Mt;T.setAttribute("position",new ft(m,_)),T.setAttribute("uv",new ft(v,f)),T.setAttribute("faceIndex",new ft(x,d)),e.push(T),s>qi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Nl(i,e,t){const n=new _i(i,e,t);return n.texture.mapping=jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Sr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function s1(i,e,t){const n=new Float32Array(hi),s=new N(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:mc(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Fl(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mc(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ol(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function mc(){return`

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
	`}function r1(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===_a||c===xa,h=c===ts||c===ns;if(l||h){let u=e.get(a);const p=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new Ul(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const g=a.image;return l&&g&&g.height>0||h&&g&&s(g)?(t===null&&(t=new Ul(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function o1(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&As("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function a1(i,e,t,n){const s={},r=new WeakMap;function o(u){const p=u.target;p.index!==null&&e.remove(p.index);for(const y in p.attributes)e.remove(p.attributes[y]);for(const y in p.morphAttributes){const _=p.morphAttributes[y];for(let f=0,d=_.length;f<d;f++)e.remove(_[f])}p.removeEventListener("dispose",o),delete s[p.id];const g=r.get(p);g&&(e.remove(g),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(u,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,t.memory.geometries++),p}function c(u){const p=u.attributes;for(const y in p)e.update(p[y],i.ARRAY_BUFFER);const g=u.morphAttributes;for(const y in g){const _=g[y];for(let f=0,d=_.length;f<d;f++)e.update(_[f],i.ARRAY_BUFFER)}}function l(u){const p=[],g=u.index,y=u.attributes.position;let _=0;if(g!==null){const m=g.array;_=g.version;for(let v=0,x=m.length;v<x;v+=3){const T=m[v+0],E=m[v+1],b=m[v+2];p.push(T,E,E,b,b,T)}}else if(y!==void 0){const m=y.array;_=y.version;for(let v=0,x=m.length/3-1;v<x;v+=3){const T=v+0,E=v+1,b=v+2;p.push(T,E,E,b,b,T)}}else return;const f=new(Ru(p)?Nu:Uu)(p,1);f.version=_;const d=r.get(u);d&&e.remove(d),r.set(u,f)}function h(u){const p=r.get(u);if(p){const g=u.index;g!==null&&p.version<g.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function c1(i,e,t){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function c(p,g){i.drawElements(n,g,r,p*o),t.update(g,n,1)}function l(p,g,y){y!==0&&(i.drawElementsInstanced(n,g,r,p*o,y),t.update(g,n,y))}function h(p,g,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,g,0,r,p,0,y);let f=0;for(let d=0;d<y;d++)f+=g[d];t.update(f,n,1)}function u(p,g,y,_){if(y===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let d=0;d<p.length;d++)l(p[d]/o,g[d],_[d]);else{f.multiDrawElementsInstancedWEBGL(n,g,0,r,p,0,_,0,y);let d=0;for(let m=0;m<y;m++)d+=g[m]*_[m];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function l1(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function h1(i,e,t){const n=new WeakMap,s=new at;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==u){let M=function(){R.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var g=M;p!==void 0&&p.texture.dispose();const y=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let x=0;y===!0&&(x=1),_===!0&&(x=2),f===!0&&(x=3);let T=a.attributes.position.count*x,E=1;T>e.maxTextureSize&&(E=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const b=new Float32Array(T*E*4*u),R=new Pu(b,T,E,u);R.type=bn,R.needsUpdate=!0;const w=x*4;for(let L=0;L<u;L++){const O=d[L],S=m[L],P=v[L],U=T*E*4*L;for(let I=0;I<O.count;I++){const V=I*w;y===!0&&(s.fromBufferAttribute(O,I),b[U+V+0]=s.x,b[U+V+1]=s.y,b[U+V+2]=s.z,b[U+V+3]=0),_===!0&&(s.fromBufferAttribute(S,I),b[U+V+4]=s.x,b[U+V+5]=s.y,b[U+V+6]=s.z,b[U+V+7]=0),f===!0&&(s.fromBufferAttribute(P,I),b[U+V+8]=s.x,b[U+V+9]=s.y,b[U+V+10]=s.z,b[U+V+11]=P.itemSize===4?s.w:1)}}p={count:u,texture:R,size:new ze(T,E)},n.set(a,p),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let y=0;for(let f=0;f<l.length;f++)y+=l[f];const _=a.morphTargetsRelative?1:1-y;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function u1(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Vu extends Ft{constructor(e,t,n,s,r,o,a,c,l,h=$i){if(h!==$i&&h!==ss)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===$i&&(n=yi),n===void 0&&h===ss&&(n=is),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ln,this.minFilter=c!==void 0?c:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Gu=new Ft,kl=new Vu(1,1),Hu=new Pu,Wu=new Zp,qu=new ku,Bl=[],zl=[],Vl=new Float32Array(16),Gl=new Float32Array(9),Hl=new Float32Array(4);function hs(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Bl[s];if(r===void 0&&(r=new Float32Array(s),Bl[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Zr(i,e){let t=zl[e];t===void 0&&(t=new Int32Array(e),zl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function d1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function f1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),xt(t,e)}}function p1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),xt(t,e)}}function m1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),xt(t,e)}}function g1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;Hl.set(n),i.uniformMatrix2fv(this.addr,!1,Hl),xt(t,n)}}function v1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;Gl.set(n),i.uniformMatrix3fv(this.addr,!1,Gl),xt(t,n)}}function y1(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;Vl.set(n),i.uniformMatrix4fv(this.addr,!1,Vl),xt(t,n)}}function _1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function x1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),xt(t,e)}}function M1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),xt(t,e)}}function S1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),xt(t,e)}}function w1(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function E1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),xt(t,e)}}function b1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),xt(t,e)}}function T1(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),xt(t,e)}}function A1(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(kl.compareFunction=Au,r=kl):r=Gu,t.setTexture2D(e||r,s)}function R1(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Wu,s)}function C1(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||qu,s)}function P1(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Hu,s)}function L1(i){switch(i){case 5126:return d1;case 35664:return f1;case 35665:return p1;case 35666:return m1;case 35674:return g1;case 35675:return v1;case 35676:return y1;case 5124:case 35670:return _1;case 35667:case 35671:return x1;case 35668:case 35672:return M1;case 35669:case 35673:return S1;case 5125:return w1;case 36294:return E1;case 36295:return b1;case 36296:return T1;case 35678:case 36198:case 36298:case 36306:case 35682:return A1;case 35679:case 36299:case 36307:return R1;case 35680:case 36300:case 36308:case 36293:return C1;case 36289:case 36303:case 36311:case 36292:return P1}}function D1(i,e){i.uniform1fv(this.addr,e)}function I1(i,e){const t=hs(e,this.size,2);i.uniform2fv(this.addr,t)}function U1(i,e){const t=hs(e,this.size,3);i.uniform3fv(this.addr,t)}function N1(i,e){const t=hs(e,this.size,4);i.uniform4fv(this.addr,t)}function F1(i,e){const t=hs(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function O1(i,e){const t=hs(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function k1(i,e){const t=hs(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function B1(i,e){i.uniform1iv(this.addr,e)}function z1(i,e){i.uniform2iv(this.addr,e)}function V1(i,e){i.uniform3iv(this.addr,e)}function G1(i,e){i.uniform4iv(this.addr,e)}function H1(i,e){i.uniform1uiv(this.addr,e)}function W1(i,e){i.uniform2uiv(this.addr,e)}function q1(i,e){i.uniform3uiv(this.addr,e)}function X1(i,e){i.uniform4uiv(this.addr,e)}function $1(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Gu,r[o])}function Y1(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Wu,r[o])}function j1(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||qu,r[o])}function K1(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Hu,r[o])}function Z1(i){switch(i){case 5126:return D1;case 35664:return I1;case 35665:return U1;case 35666:return N1;case 35674:return F1;case 35675:return O1;case 35676:return k1;case 5124:case 35670:return B1;case 35667:case 35671:return z1;case 35668:case 35672:return V1;case 35669:case 35673:return G1;case 5125:return H1;case 36294:return W1;case 36295:return q1;case 36296:return X1;case 35678:case 36198:case 36298:case 36306:case 35682:return $1;case 35679:case 36299:case 36307:return Y1;case 35680:case 36300:case 36308:case 36293:return j1;case 36289:case 36303:case 36311:case 36292:return K1}}class J1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=L1(t.type)}}class Q1{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Z1(t.type)}}class ev{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Wo=/(\w+)(\])?(\[|\.)?/g;function Wl(i,e){i.seq.push(e),i.map[e.id]=e}function tv(i,e,t){const n=i.name,s=n.length;for(Wo.lastIndex=0;;){const r=Wo.exec(n),o=Wo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Wl(t,l===void 0?new J1(a,i,e):new Q1(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new ev(a),Wl(t,u)),t=u}}}class Fr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);tv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function ql(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const nv=37297;let iv=0;function sv(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Xl=new We;function rv(i){Ze._getMatrix(Xl,Ze.workingColorSpace,i);const e=`mat3( ${Xl.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Kr:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function $l(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+sv(i.getShaderSource(e),o)}else return s}function ov(i,e){const t=rv(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function av(i,e){let t;switch(e){case bp:t="Linear";break;case Tp:t="Reinhard";break;case Ap:t="Cineon";break;case pu:t="ACESFilmic";break;case Cp:t="AgX";break;case Pp:t="Neutral";break;case Rp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const wr=new N;function cv(){Ze.getLuminanceCoefficients(wr);const i=wr.x.toFixed(4),e=wr.y.toFixed(4),t=wr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rs).join(`
`)}function hv(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function uv(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Rs(i){return i!==""}function Yl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const dv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ka(i){return i.replace(dv,pv)}const fv=new Map;function pv(i,e){let t=Xe[e];if(t===void 0){const n=fv.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ka(t)}const mv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kl(i){return i.replace(mv,gv)}function gv(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Zl(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function vv(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===du?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===sp?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function yv(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ts:case ns:e="ENVMAP_TYPE_CUBE";break;case jr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function _v(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ns:e="ENVMAP_MODE_REFRACTION";break}return e}function xv(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case fu:e="ENVMAP_BLENDING_MULTIPLY";break;case wp:e="ENVMAP_BLENDING_MIX";break;case Ep:e="ENVMAP_BLENDING_ADD";break}return e}function Mv(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Sv(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=vv(t),l=yv(t),h=_v(t),u=xv(t),p=Mv(t),g=lv(t),y=hv(r),_=s.createProgram();let f,d,m=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Rs).join(`
`),f.length>0&&(f+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(Rs).join(`
`),d.length>0&&(d+=`
`)):(f=[Zl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),d=[Zl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Xn?"#define TONE_MAPPING":"",t.toneMapping!==Xn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Xn?av("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,ov("linearToOutputTexel",t.outputColorSpace),cv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Rs).join(`
`)),o=Ka(o),o=Yl(o,t),o=jl(o,t),a=Ka(a),a=Yl(a,t),a=jl(a,t),o=Kl(o),a=Kl(a),t.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,f=[g,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,d=["#define varying in",t.glslVersion===hl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===hl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const v=m+f+o,x=m+d+a,T=ql(s,s.VERTEX_SHADER,v),E=ql(s,s.FRAGMENT_SHADER,x);s.attachShader(_,T),s.attachShader(_,E),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function b(L){if(i.debug.checkShaderErrors){const O=s.getProgramInfoLog(_).trim(),S=s.getShaderInfoLog(T).trim(),P=s.getShaderInfoLog(E).trim();let U=!0,I=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(U=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,T,E);else{const V=$l(s,T,"vertex"),k=$l(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+O+`
`+V+`
`+k)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):(S===""||P==="")&&(I=!1);I&&(L.diagnostics={runnable:U,programLog:O,vertexShader:{log:S,prefix:f},fragmentShader:{log:P,prefix:d}})}s.deleteShader(T),s.deleteShader(E),R=new Fr(s,_),w=uv(s,_)}let R;this.getUniforms=function(){return R===void 0&&b(this),R};let w;this.getAttributes=function(){return w===void 0&&b(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,nv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=iv++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=T,this.fragmentShader=E,this}let wv=0;class Ev{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new bv(e),t.set(e,n)),n}}class bv{constructor(e){this.id=wv++,this.code=e,this.usedTimes=0}}function Tv(i,e,t,n,s,r,o){const a=new Du,c=new Ev,l=new Set,h=[],u=s.logarithmicDepthBuffer,p=s.vertexTextures;let g=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return l.add(w),w===0?"uv":`uv${w}`}function f(w,M,L,O,S){const P=O.fog,U=S.geometry,I=w.isMeshStandardMaterial?O.environment:null,V=(w.isMeshStandardMaterial?t:e).get(w.envMap||I),k=V&&V.mapping===jr?V.image.height:null,F=y[w.type];w.precision!==null&&(g=s.getMaxPrecision(w.precision),g!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",g,"instead."));const B=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,j=B!==void 0?B.length:0;let se=0;U.morphAttributes.position!==void 0&&(se=1),U.morphAttributes.normal!==void 0&&(se=2),U.morphAttributes.color!==void 0&&(se=3);let le,H,ee,he;if(F){const nt=un[F];le=nt.vertexShader,H=nt.fragmentShader}else le=w.vertexShader,H=w.fragmentShader,c.update(w),ee=c.getVertexShaderID(w),he=c.getFragmentShaderID(w);const te=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Ee=S.isInstancedMesh===!0,Te=S.isBatchedMesh===!0,X=!!w.map,Q=!!w.matcap,de=!!V,z=!!w.aoMap,Fe=!!w.lightMap,Ne=!!w.bumpMap,ke=!!w.normalMap,be=!!w.displacementMap,Ae=!!w.emissiveMap,ge=!!w.metalnessMap,D=!!w.roughnessMap,A=w.anisotropy>0,Y=w.clearcoat>0,ne=w.dispersion>0,oe=w.iridescence>0,$=w.sheen>0,ce=w.transmission>0,re=A&&!!w.anisotropyMap,fe=Y&&!!w.clearcoatMap,Ie=Y&&!!w.clearcoatNormalMap,ae=Y&&!!w.clearcoatRoughnessMap,pe=oe&&!!w.iridescenceMap,Ue=oe&&!!w.iridescenceThicknessMap,Oe=$&&!!w.sheenColorMap,Se=$&&!!w.sheenRoughnessMap,Ye=!!w.specularMap,Ve=!!w.specularColorMap,tt=!!w.specularIntensityMap,G=ce&&!!w.transmissionMap,ve=ce&&!!w.thicknessMap,J=!!w.gradientMap,ie=!!w.alphaMap,xe=w.alphaTest>0,ye=!!w.alphaHash,Ge=!!w.extensions;let pt=Xn;w.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(pt=i.toneMapping);const bt={shaderID:F,shaderType:w.type,shaderName:w.name,vertexShader:le,fragmentShader:H,defines:w.defines,customVertexShaderID:ee,customFragmentShaderID:he,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:g,batching:Te,batchingColor:Te&&S._colorsTexture!==null,instancing:Ee,instancingColor:Ee&&S.instanceColor!==null,instancingMorph:Ee&&S.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:te===null?i.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:as,alphaToCoverage:!!w.alphaToCoverage,map:X,matcap:Q,envMap:de,envMapMode:de&&V.mapping,envMapCubeUVHeight:k,aoMap:z,lightMap:Fe,bumpMap:Ne,normalMap:ke,displacementMap:p&&be,emissiveMap:Ae,normalMapObjectSpace:ke&&w.normalMapType===Up,normalMapTangentSpace:ke&&w.normalMapType===Tu,metalnessMap:ge,roughnessMap:D,anisotropy:A,anisotropyMap:re,clearcoat:Y,clearcoatMap:fe,clearcoatNormalMap:Ie,clearcoatRoughnessMap:ae,dispersion:ne,iridescence:oe,iridescenceMap:pe,iridescenceThicknessMap:Ue,sheen:$,sheenColorMap:Oe,sheenRoughnessMap:Se,specularMap:Ye,specularColorMap:Ve,specularIntensityMap:tt,transmission:ce,transmissionMap:G,thicknessMap:ve,gradientMap:J,opaque:w.transparent===!1&&w.blending===Xi&&w.alphaToCoverage===!1,alphaMap:ie,alphaTest:xe,alphaHash:ye,combine:w.combine,mapUv:X&&_(w.map.channel),aoMapUv:z&&_(w.aoMap.channel),lightMapUv:Fe&&_(w.lightMap.channel),bumpMapUv:Ne&&_(w.bumpMap.channel),normalMapUv:ke&&_(w.normalMap.channel),displacementMapUv:be&&_(w.displacementMap.channel),emissiveMapUv:Ae&&_(w.emissiveMap.channel),metalnessMapUv:ge&&_(w.metalnessMap.channel),roughnessMapUv:D&&_(w.roughnessMap.channel),anisotropyMapUv:re&&_(w.anisotropyMap.channel),clearcoatMapUv:fe&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:Ie&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:Se&&_(w.sheenRoughnessMap.channel),specularMapUv:Ye&&_(w.specularMap.channel),specularColorMapUv:Ve&&_(w.specularColorMap.channel),specularIntensityMapUv:tt&&_(w.specularIntensityMap.channel),transmissionMapUv:G&&_(w.transmissionMap.channel),thicknessMapUv:ve&&_(w.thicknessMap.channel),alphaMapUv:ie&&_(w.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(ke||A),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!U.attributes.uv&&(X||ie),fog:!!P,useFog:w.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Me,skinning:S.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:se,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&L.length>0,shadowMapType:i.shadowMap.type,toneMapping:pt,decodeVideoTexture:X&&w.map.isVideoTexture===!0&&Ze.getTransfer(w.map.colorSpace)===st,decodeVideoTextureEmissive:Ae&&w.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(w.emissiveMap.colorSpace)===st,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Rt,flipSided:w.side===Nt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ge&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&w.extensions.multiDraw===!0||Te)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function d(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)M.push(L),M.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(m(M,w),v(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function m(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function v(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function x(w){const M=y[w.type];let L;if(M){const O=un[M];L=lm.clone(O.uniforms)}else L=w.uniforms;return L}function T(w,M){let L;for(let O=0,S=h.length;O<S;O++){const P=h[O];if(P.cacheKey===M){L=P,++L.usedTimes;break}}return L===void 0&&(L=new Sv(i,M,w,r),h.push(L)),L}function E(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function b(w){c.remove(w)}function R(){c.dispose()}return{getParameters:f,getProgramCacheKey:d,getUniforms:x,acquireProgram:T,releaseProgram:E,releaseShaderCache:b,programs:h,dispose:R}}function Av(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Rv(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Jl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Ql(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,p,g,y,_,f){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:p,material:g,groupOrder:y,renderOrder:u.renderOrder,z:_,group:f},i[e]=d):(d.id=u.id,d.object=u,d.geometry=p,d.material=g,d.groupOrder=y,d.renderOrder=u.renderOrder,d.z=_,d.group=f),e++,d}function a(u,p,g,y,_,f){const d=o(u,p,g,y,_,f);g.transmission>0?n.push(d):g.transparent===!0?s.push(d):t.push(d)}function c(u,p,g,y,_,f){const d=o(u,p,g,y,_,f);g.transmission>0?n.unshift(d):g.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,p){t.length>1&&t.sort(u||Rv),n.length>1&&n.sort(p||Jl),s.length>1&&s.sort(p||Jl)}function h(){for(let u=e,p=i.length;u<p;u++){const g=i[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Cv(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new Ql,i.set(n,[o])):s>=r.length?(o=new Ql,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Pv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new qe};break;case"SpotLight":t={position:new N,direction:new N,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function Lv(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Dv=0;function Iv(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Uv(i){const e=new Pv,t=Lv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new it,o=new it;function a(l){let h=0,u=0,p=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let g=0,y=0,_=0,f=0,d=0,m=0,v=0,x=0,T=0,E=0,b=0;l.sort(Iv);for(let w=0,M=l.length;w<M;w++){const L=l[w],O=L.color,S=L.intensity,P=L.distance,U=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=O.r*S,u+=O.g*S,p+=O.b*S;else if(L.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(L.sh.coefficients[I],S);b++}else if(L.isDirectionalLight){const I=e.get(L);if(I.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const V=L.shadow,k=t.get(L);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,n.directionalShadow[g]=k,n.directionalShadowMap[g]=U,n.directionalShadowMatrix[g]=L.shadow.matrix,m++}n.directional[g]=I,g++}else if(L.isSpotLight){const I=e.get(L);I.position.setFromMatrixPosition(L.matrixWorld),I.color.copy(O).multiplyScalar(S),I.distance=P,I.coneCos=Math.cos(L.angle),I.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),I.decay=L.decay,n.spot[_]=I;const V=L.shadow;if(L.map&&(n.spotLightMap[T]=L.map,T++,V.updateMatrices(L),L.castShadow&&E++),n.spotLightMatrix[_]=V.matrix,L.castShadow){const k=t.get(L);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,n.spotShadow[_]=k,n.spotShadowMap[_]=U,x++}_++}else if(L.isRectAreaLight){const I=e.get(L);I.color.copy(O).multiplyScalar(S),I.halfWidth.set(L.width*.5,0,0),I.halfHeight.set(0,L.height*.5,0),n.rectArea[f]=I,f++}else if(L.isPointLight){const I=e.get(L);if(I.color.copy(L.color).multiplyScalar(L.intensity),I.distance=L.distance,I.decay=L.decay,L.castShadow){const V=L.shadow,k=t.get(L);k.shadowIntensity=V.intensity,k.shadowBias=V.bias,k.shadowNormalBias=V.normalBias,k.shadowRadius=V.radius,k.shadowMapSize=V.mapSize,k.shadowCameraNear=V.camera.near,k.shadowCameraFar=V.camera.far,n.pointShadow[y]=k,n.pointShadowMap[y]=U,n.pointShadowMatrix[y]=L.shadow.matrix,v++}n.point[y]=I,y++}else if(L.isHemisphereLight){const I=e.get(L);I.skyColor.copy(L.color).multiplyScalar(S),I.groundColor.copy(L.groundColor).multiplyScalar(S),n.hemi[d]=I,d++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=p;const R=n.hash;(R.directionalLength!==g||R.pointLength!==y||R.spotLength!==_||R.rectAreaLength!==f||R.hemiLength!==d||R.numDirectionalShadows!==m||R.numPointShadows!==v||R.numSpotShadows!==x||R.numSpotMaps!==T||R.numLightProbes!==b)&&(n.directional.length=g,n.spot.length=_,n.rectArea.length=f,n.point.length=y,n.hemi.length=d,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=v,n.pointShadowMap.length=v,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=v,n.spotLightMatrix.length=x+T-E,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=E,n.numLightProbes=b,R.directionalLength=g,R.pointLength=y,R.spotLength=_,R.rectAreaLength=f,R.hemiLength=d,R.numDirectionalShadows=m,R.numPointShadows=v,R.numSpotShadows=x,R.numSpotMaps=T,R.numLightProbes=b,n.version=Dv++)}function c(l,h){let u=0,p=0,g=0,y=0,_=0;const f=h.matrixWorldInverse;for(let d=0,m=l.length;d<m;d++){const v=l[d];if(v.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(f),u++}else if(v.isSpotLight){const x=n.spot[g];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(f),x.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(f),g++}else if(v.isRectAreaLight){const x=n.rectArea[y];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(f),o.identity(),r.copy(v.matrixWorld),r.premultiply(f),o.extractRotation(r),x.halfWidth.set(v.width*.5,0,0),x.halfHeight.set(0,v.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),y++}else if(v.isPointLight){const x=n.point[p];x.position.setFromMatrixPosition(v.matrixWorld),x.position.applyMatrix4(f),p++}else if(v.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(v.matrixWorld),x.direction.transformDirection(f),_++}}}return{setup:a,setupView:c,state:n}}function eh(i){const e=new Uv(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Nv(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new eh(i),e.set(s,[a])):r>=o.length?(a=new eh(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Fv extends Ei{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Dp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ov extends Ei{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const kv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Bv=`uniform sampler2D shadow_pass;
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
}`;function zv(i,e,t){let n=new pc;const s=new ze,r=new ze,o=new at,a=new Fv({depthPacking:Ip}),c=new Ov,l={},h=t.maxTextureSize,u={[Kn]:Nt,[Nt]:Kn,[Rt]:Rt},p=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:kv,fragmentShader:Bv}),g=p.clone();g.defines.HORIZONTAL_PASS=1;const y=new Mt;y.setAttribute("position",new ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new we(y,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=du;let d=this.type;this.render=function(E,b,R){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||E.length===0)return;const w=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),O=i.state;O.setBlending(qn),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const S=d!==Sn&&this.type===Sn,P=d===Sn&&this.type!==Sn;for(let U=0,I=E.length;U<I;U++){const V=E[U],k=V.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const F=k.getFrameExtents();if(s.multiply(F),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/F.x),s.x=r.x*F.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/F.y),s.y=r.y*F.y,k.mapSize.y=r.y)),k.map===null||S===!0||P===!0){const j=this.type!==Sn?{minFilter:ln,magFilter:ln}:{};k.map!==null&&k.map.dispose(),k.map=new _i(s.x,s.y,j),k.map.texture.name=V.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const B=k.getViewportCount();for(let j=0;j<B;j++){const se=k.getViewport(j);o.set(r.x*se.x,r.y*se.y,r.x*se.z,r.y*se.w),O.viewport(o),k.updateMatrices(V,j),n=k.getFrustum(),x(b,R,k.camera,V,this.type)}k.isPointLightShadow!==!0&&this.type===Sn&&m(k,R),k.needsUpdate=!1}d=this.type,f.needsUpdate=!1,i.setRenderTarget(w,M,L)};function m(E,b){const R=e.update(_);p.defines.VSM_SAMPLES!==E.blurSamples&&(p.defines.VSM_SAMPLES=E.blurSamples,g.defines.VSM_SAMPLES=E.blurSamples,p.needsUpdate=!0,g.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new _i(s.x,s.y)),p.uniforms.shadow_pass.value=E.map.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,i.setRenderTarget(E.mapPass),i.clear(),i.renderBufferDirect(b,null,R,p,_,null),g.uniforms.shadow_pass.value=E.mapPass.texture,g.uniforms.resolution.value=E.mapSize,g.uniforms.radius.value=E.radius,i.setRenderTarget(E.map),i.clear(),i.renderBufferDirect(b,null,R,g,_,null)}function v(E,b,R,w){let M=null;const L=R.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(L!==void 0)M=L;else if(M=R.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const O=M.uuid,S=b.uuid;let P=l[O];P===void 0&&(P={},l[O]=P);let U=P[S];U===void 0&&(U=M.clone(),P[S]=U,b.addEventListener("dispose",T)),M=U}if(M.visible=b.visible,M.wireframe=b.wireframe,w===Sn?M.side=b.shadowSide!==null?b.shadowSide:b.side:M.side=b.shadowSide!==null?b.shadowSide:u[b.side],M.alphaMap=b.alphaMap,M.alphaTest=b.alphaTest,M.map=b.map,M.clipShadows=b.clipShadows,M.clippingPlanes=b.clippingPlanes,M.clipIntersection=b.clipIntersection,M.displacementMap=b.displacementMap,M.displacementScale=b.displacementScale,M.displacementBias=b.displacementBias,M.wireframeLinewidth=b.wireframeLinewidth,M.linewidth=b.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const O=i.properties.get(M);O.light=R}return M}function x(E,b,R,w,M){if(E.visible===!1)return;if(E.layers.test(b.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&M===Sn)&&(!E.frustumCulled||n.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,E.matrixWorld);const S=e.update(E),P=E.material;if(Array.isArray(P)){const U=S.groups;for(let I=0,V=U.length;I<V;I++){const k=U[I],F=P[k.materialIndex];if(F&&F.visible){const B=v(E,F,w,M);E.onBeforeShadow(i,E,b,R,S,B,k),i.renderBufferDirect(R,null,S,B,E,k),E.onAfterShadow(i,E,b,R,S,B,k)}}}else if(P.visible){const U=v(E,P,w,M);E.onBeforeShadow(i,E,b,R,S,U,null),i.renderBufferDirect(R,null,S,U,E,null),E.onAfterShadow(i,E,b,R,S,U,null)}}const O=E.children;for(let S=0,P=O.length;S<P;S++)x(O[S],b,R,w,M)}function T(E){E.target.removeEventListener("dispose",T);for(const R in l){const w=l[R],M=E.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const Vv={[da]:fa,[pa]:va,[ma]:ya,[es]:ga,[fa]:da,[va]:pa,[ya]:ma,[ga]:es};function Gv(i,e){function t(){let G=!1;const ve=new at;let J=null;const ie=new at(0,0,0,0);return{setMask:function(xe){J!==xe&&!G&&(i.colorMask(xe,xe,xe,xe),J=xe)},setLocked:function(xe){G=xe},setClear:function(xe,ye,Ge,pt,bt){bt===!0&&(xe*=pt,ye*=pt,Ge*=pt),ve.set(xe,ye,Ge,pt),ie.equals(ve)===!1&&(i.clearColor(xe,ye,Ge,pt),ie.copy(ve))},reset:function(){G=!1,J=null,ie.set(-1,0,0,0)}}}function n(){let G=!1,ve=!1,J=null,ie=null,xe=null;return{setReversed:function(ye){if(ve!==ye){const Ge=e.get("EXT_clip_control");ve?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT);const pt=xe;xe=null,this.setClear(pt)}ve=ye},getReversed:function(){return ve},setTest:function(ye){ye?te(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(ye){J!==ye&&!G&&(i.depthMask(ye),J=ye)},setFunc:function(ye){if(ve&&(ye=Vv[ye]),ie!==ye){switch(ye){case da:i.depthFunc(i.NEVER);break;case fa:i.depthFunc(i.ALWAYS);break;case pa:i.depthFunc(i.LESS);break;case es:i.depthFunc(i.LEQUAL);break;case ma:i.depthFunc(i.EQUAL);break;case ga:i.depthFunc(i.GEQUAL);break;case va:i.depthFunc(i.GREATER);break;case ya:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ie=ye}},setLocked:function(ye){G=ye},setClear:function(ye){xe!==ye&&(ve&&(ye=1-ye),i.clearDepth(ye),xe=ye)},reset:function(){G=!1,J=null,ie=null,xe=null,ve=!1}}}function s(){let G=!1,ve=null,J=null,ie=null,xe=null,ye=null,Ge=null,pt=null,bt=null;return{setTest:function(nt){G||(nt?te(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(nt){ve!==nt&&!G&&(i.stencilMask(nt),ve=nt)},setFunc:function(nt,en,pn){(J!==nt||ie!==en||xe!==pn)&&(i.stencilFunc(nt,en,pn),J=nt,ie=en,xe=pn)},setOp:function(nt,en,pn){(ye!==nt||Ge!==en||pt!==pn)&&(i.stencilOp(nt,en,pn),ye=nt,Ge=en,pt=pn)},setLocked:function(nt){G=nt},setClear:function(nt){bt!==nt&&(i.clearStencil(nt),bt=nt)},reset:function(){G=!1,ve=null,J=null,ie=null,xe=null,ye=null,Ge=null,pt=null,bt=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},p=new WeakMap,g=[],y=null,_=!1,f=null,d=null,m=null,v=null,x=null,T=null,E=null,b=new qe(0,0,0),R=0,w=!1,M=null,L=null,O=null,S=null,P=null;const U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,V=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(k)[1]),I=V>=1):k.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),I=V>=2);let F=null,B={};const j=i.getParameter(i.SCISSOR_BOX),se=i.getParameter(i.VIEWPORT),le=new at().fromArray(j),H=new at().fromArray(se);function ee(G,ve,J,ie){const xe=new Uint8Array(4),ye=i.createTexture();i.bindTexture(G,ye),i.texParameteri(G,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(G,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ge=0;Ge<J;Ge++)G===i.TEXTURE_3D||G===i.TEXTURE_2D_ARRAY?i.texImage3D(ve,0,i.RGBA,1,1,ie,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(ve+Ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return ye}const he={};he[i.TEXTURE_2D]=ee(i.TEXTURE_2D,i.TEXTURE_2D,1),he[i.TEXTURE_CUBE_MAP]=ee(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[i.TEXTURE_2D_ARRAY]=ee(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),he[i.TEXTURE_3D]=ee(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),te(i.DEPTH_TEST),o.setFunc(es),Ne(!1),ke(ol),te(i.CULL_FACE),z(qn);function te(G){h[G]!==!0&&(i.enable(G),h[G]=!0)}function Me(G){h[G]!==!1&&(i.disable(G),h[G]=!1)}function Ee(G,ve){return u[G]!==ve?(i.bindFramebuffer(G,ve),u[G]=ve,G===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ve),G===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ve),!0):!1}function Te(G,ve){let J=g,ie=!1;if(G){J=p.get(ve),J===void 0&&(J=[],p.set(ve,J));const xe=G.textures;if(J.length!==xe.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ye=0,Ge=xe.length;ye<Ge;ye++)J[ye]=i.COLOR_ATTACHMENT0+ye;J.length=xe.length,ie=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ie=!0);ie&&i.drawBuffers(J)}function X(G){return y!==G?(i.useProgram(G),y=G,!0):!1}const Q={[li]:i.FUNC_ADD,[op]:i.FUNC_SUBTRACT,[ap]:i.FUNC_REVERSE_SUBTRACT};Q[cp]=i.MIN,Q[lp]=i.MAX;const de={[hp]:i.ZERO,[up]:i.ONE,[dp]:i.SRC_COLOR,[ha]:i.SRC_ALPHA,[yp]:i.SRC_ALPHA_SATURATE,[gp]:i.DST_COLOR,[pp]:i.DST_ALPHA,[fp]:i.ONE_MINUS_SRC_COLOR,[ua]:i.ONE_MINUS_SRC_ALPHA,[vp]:i.ONE_MINUS_DST_COLOR,[mp]:i.ONE_MINUS_DST_ALPHA,[_p]:i.CONSTANT_COLOR,[xp]:i.ONE_MINUS_CONSTANT_COLOR,[Mp]:i.CONSTANT_ALPHA,[Sp]:i.ONE_MINUS_CONSTANT_ALPHA};function z(G,ve,J,ie,xe,ye,Ge,pt,bt,nt){if(G===qn){_===!0&&(Me(i.BLEND),_=!1);return}if(_===!1&&(te(i.BLEND),_=!0),G!==rp){if(G!==f||nt!==w){if((d!==li||x!==li)&&(i.blendEquation(i.FUNC_ADD),d=li,x=li),nt)switch(G){case Xi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dt:i.blendFunc(i.ONE,i.ONE);break;case al:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}else switch(G){case Xi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dt:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case al:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case cl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",G);break}m=null,v=null,T=null,E=null,b.set(0,0,0),R=0,f=G,w=nt}return}xe=xe||ve,ye=ye||J,Ge=Ge||ie,(ve!==d||xe!==x)&&(i.blendEquationSeparate(Q[ve],Q[xe]),d=ve,x=xe),(J!==m||ie!==v||ye!==T||Ge!==E)&&(i.blendFuncSeparate(de[J],de[ie],de[ye],de[Ge]),m=J,v=ie,T=ye,E=Ge),(pt.equals(b)===!1||bt!==R)&&(i.blendColor(pt.r,pt.g,pt.b,bt),b.copy(pt),R=bt),f=G,w=!1}function Fe(G,ve){G.side===Rt?Me(i.CULL_FACE):te(i.CULL_FACE);let J=G.side===Nt;ve&&(J=!J),Ne(J),G.blending===Xi&&G.transparent===!1?z(qn):z(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),o.setFunc(G.depthFunc),o.setTest(G.depthTest),o.setMask(G.depthWrite),r.setMask(G.colorWrite);const ie=G.stencilWrite;a.setTest(ie),ie&&(a.setMask(G.stencilWriteMask),a.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),a.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),Ae(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?te(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(G){M!==G&&(G?i.frontFace(i.CW):i.frontFace(i.CCW),M=G)}function ke(G){G!==np?(te(i.CULL_FACE),G!==L&&(G===ol?i.cullFace(i.BACK):G===ip?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),L=G}function be(G){G!==O&&(I&&i.lineWidth(G),O=G)}function Ae(G,ve,J){G?(te(i.POLYGON_OFFSET_FILL),(S!==ve||P!==J)&&(i.polygonOffset(ve,J),S=ve,P=J)):Me(i.POLYGON_OFFSET_FILL)}function ge(G){G?te(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function D(G){G===void 0&&(G=i.TEXTURE0+U-1),F!==G&&(i.activeTexture(G),F=G)}function A(G,ve,J){J===void 0&&(F===null?J=i.TEXTURE0+U-1:J=F);let ie=B[J];ie===void 0&&(ie={type:void 0,texture:void 0},B[J]=ie),(ie.type!==G||ie.texture!==ve)&&(F!==J&&(i.activeTexture(J),F=J),i.bindTexture(G,ve||he[G]),ie.type=G,ie.texture=ve)}function Y(){const G=B[F];G!==void 0&&G.type!==void 0&&(i.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ne(){try{i.compressedTexImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function oe(){try{i.compressedTexImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function $(){try{i.texSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ce(){try{i.texSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function re(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function fe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ie(){try{i.texStorage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function ae(){try{i.texStorage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function pe(){try{i.texImage2D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Ue(){try{i.texImage3D.apply(i,arguments)}catch(G){console.error("THREE.WebGLState:",G)}}function Oe(G){le.equals(G)===!1&&(i.scissor(G.x,G.y,G.z,G.w),le.copy(G))}function Se(G){H.equals(G)===!1&&(i.viewport(G.x,G.y,G.z,G.w),H.copy(G))}function Ye(G,ve){let J=l.get(ve);J===void 0&&(J=new WeakMap,l.set(ve,J));let ie=J.get(G);ie===void 0&&(ie=i.getUniformBlockIndex(ve,G.name),J.set(G,ie))}function Ve(G,ve){const ie=l.get(ve).get(G);c.get(ve)!==ie&&(i.uniformBlockBinding(ve,ie,G.__bindingPointIndex),c.set(ve,ie))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},F=null,B={},u={},p=new WeakMap,g=[],y=null,_=!1,f=null,d=null,m=null,v=null,x=null,T=null,E=null,b=new qe(0,0,0),R=0,w=!1,M=null,L=null,O=null,S=null,P=null,le.set(0,0,i.canvas.width,i.canvas.height),H.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:te,disable:Me,bindFramebuffer:Ee,drawBuffers:Te,useProgram:X,setBlending:z,setMaterial:Fe,setFlipSided:Ne,setCullFace:ke,setLineWidth:be,setPolygonOffset:Ae,setScissorTest:ge,activeTexture:D,bindTexture:A,unbindTexture:Y,compressedTexImage2D:ne,compressedTexImage3D:oe,texImage2D:pe,texImage3D:Ue,updateUBOMapping:Ye,uniformBlockBinding:Ve,texStorage2D:Ie,texStorage3D:ae,texSubImage2D:$,texSubImage3D:ce,compressedTexSubImage2D:re,compressedTexSubImage3D:fe,scissor:Oe,viewport:Se,reset:tt}}function th(i,e,t,n){const s=Hv(n);switch(t){case _u:return i*e;case Mu:return i*e;case Su:return i*e*2;case wu:return i*e/s.components*s.byteLength;case uc:return i*e/s.components*s.byteLength;case Eu:return i*e*2/s.components*s.byteLength;case dc:return i*e*2/s.components*s.byteLength;case xu:return i*e*3/s.components*s.byteLength;case an:return i*e*4/s.components*s.byteLength;case fc:return i*e*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ir:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wa:case ba:return Math.max(i,16)*Math.max(e,8)/4;case Sa:case Ea:return Math.max(i,8)*Math.max(e,8)/2;case Ta:case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Pa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case La:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Da:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Na:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Fa:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ka:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case za:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Va:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ga:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Nr:case Ha:case Wa:return Math.ceil(i/4)*Math.ceil(e/4)*16;case bu:case qa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Xa:case $a:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hv(i){switch(i){case Cn:case gu:return{byteLength:1,components:1};case Bs:case vu:case Hs:return{byteLength:2,components:1};case lc:case hc:return{byteLength:2,components:4};case yi:case cc:case bn:return{byteLength:4,components:1};case yu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Wv(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,h=new WeakMap;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(D,A){return g?new OffscreenCanvas(D,A):Gr("canvas")}function _(D,A,Y){let ne=1;const oe=ge(D);if((oe.width>Y||oe.height>Y)&&(ne=Y/Math.max(oe.width,oe.height)),ne<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const $=Math.floor(ne*oe.width),ce=Math.floor(ne*oe.height);u===void 0&&(u=y($,ce));const re=A?y($,ce):u;return re.width=$,re.height=ce,re.getContext("2d").drawImage(D,0,0,$,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+oe.width+"x"+oe.height+") to ("+$+"x"+ce+")."),re}else return"data"in D&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+oe.width+"x"+oe.height+")."),D;return D}function f(D){return D.generateMipmaps}function d(D){i.generateMipmap(D)}function m(D){return D.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?i.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function v(D,A,Y,ne,oe=!1){if(D!==null){if(i[D]!==void 0)return i[D];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let $=A;if(A===i.RED&&(Y===i.FLOAT&&($=i.R32F),Y===i.HALF_FLOAT&&($=i.R16F),Y===i.UNSIGNED_BYTE&&($=i.R8)),A===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&($=i.R8UI),Y===i.UNSIGNED_SHORT&&($=i.R16UI),Y===i.UNSIGNED_INT&&($=i.R32UI),Y===i.BYTE&&($=i.R8I),Y===i.SHORT&&($=i.R16I),Y===i.INT&&($=i.R32I)),A===i.RG&&(Y===i.FLOAT&&($=i.RG32F),Y===i.HALF_FLOAT&&($=i.RG16F),Y===i.UNSIGNED_BYTE&&($=i.RG8)),A===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&($=i.RG8UI),Y===i.UNSIGNED_SHORT&&($=i.RG16UI),Y===i.UNSIGNED_INT&&($=i.RG32UI),Y===i.BYTE&&($=i.RG8I),Y===i.SHORT&&($=i.RG16I),Y===i.INT&&($=i.RG32I)),A===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&($=i.RGB8UI),Y===i.UNSIGNED_SHORT&&($=i.RGB16UI),Y===i.UNSIGNED_INT&&($=i.RGB32UI),Y===i.BYTE&&($=i.RGB8I),Y===i.SHORT&&($=i.RGB16I),Y===i.INT&&($=i.RGB32I)),A===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&($=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&($=i.RGBA16UI),Y===i.UNSIGNED_INT&&($=i.RGBA32UI),Y===i.BYTE&&($=i.RGBA8I),Y===i.SHORT&&($=i.RGBA16I),Y===i.INT&&($=i.RGBA32I)),A===i.RGB&&Y===i.UNSIGNED_INT_5_9_9_9_REV&&($=i.RGB9_E5),A===i.RGBA){const ce=oe?Kr:Ze.getTransfer(ne);Y===i.FLOAT&&($=i.RGBA32F),Y===i.HALF_FLOAT&&($=i.RGBA16F),Y===i.UNSIGNED_BYTE&&($=ce===st?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&($=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&($=i.RGB5_A1)}return($===i.R16F||$===i.R32F||$===i.RG16F||$===i.RG32F||$===i.RGBA16F||$===i.RGBA32F)&&e.get("EXT_color_buffer_float"),$}function x(D,A){let Y;return D?A===null||A===yi||A===is?Y=i.DEPTH24_STENCIL8:A===bn?Y=i.DEPTH32F_STENCIL8:A===Bs&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===yi||A===is?Y=i.DEPTH_COMPONENT24:A===bn?Y=i.DEPTH_COMPONENT32F:A===Bs&&(Y=i.DEPTH_COMPONENT16),Y}function T(D,A){return f(D)===!0||D.isFramebufferTexture&&D.minFilter!==ln&&D.minFilter!==fn?Math.log2(Math.max(A.width,A.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?A.mipmaps.length:1}function E(D){const A=D.target;A.removeEventListener("dispose",E),R(A),A.isVideoTexture&&h.delete(A)}function b(D){const A=D.target;A.removeEventListener("dispose",b),M(A)}function R(D){const A=n.get(D);if(A.__webglInit===void 0)return;const Y=D.source,ne=p.get(Y);if(ne){const oe=ne[A.__cacheKey];oe.usedTimes--,oe.usedTimes===0&&w(D),Object.keys(ne).length===0&&p.delete(Y)}n.remove(D)}function w(D){const A=n.get(D);i.deleteTexture(A.__webglTexture);const Y=D.source,ne=p.get(Y);delete ne[A.__cacheKey],o.memory.textures--}function M(D){const A=n.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),n.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(A.__webglFramebuffer[ne]))for(let oe=0;oe<A.__webglFramebuffer[ne].length;oe++)i.deleteFramebuffer(A.__webglFramebuffer[ne][oe]);else i.deleteFramebuffer(A.__webglFramebuffer[ne]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[ne])}else{if(Array.isArray(A.__webglFramebuffer))for(let ne=0;ne<A.__webglFramebuffer.length;ne++)i.deleteFramebuffer(A.__webglFramebuffer[ne]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let ne=0;ne<A.__webglColorRenderbuffer.length;ne++)A.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[ne]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const Y=D.textures;for(let ne=0,oe=Y.length;ne<oe;ne++){const $=n.get(Y[ne]);$.__webglTexture&&(i.deleteTexture($.__webglTexture),o.memory.textures--),n.remove(Y[ne])}n.remove(D)}let L=0;function O(){L=0}function S(){const D=L;return D>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+s.maxTextures),L+=1,D}function P(D){const A=[];return A.push(D.wrapS),A.push(D.wrapT),A.push(D.wrapR||0),A.push(D.magFilter),A.push(D.minFilter),A.push(D.anisotropy),A.push(D.internalFormat),A.push(D.format),A.push(D.type),A.push(D.generateMipmaps),A.push(D.premultiplyAlpha),A.push(D.flipY),A.push(D.unpackAlignment),A.push(D.colorSpace),A.join()}function U(D,A){const Y=n.get(D);if(D.isVideoTexture&&be(D),D.isRenderTargetTexture===!1&&D.version>0&&Y.__version!==D.version){const ne=D.image;if(ne===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{H(Y,D,A);return}}t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+A)}function I(D,A){const Y=n.get(D);if(D.version>0&&Y.__version!==D.version){H(Y,D,A);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+A)}function V(D,A){const Y=n.get(D);if(D.version>0&&Y.__version!==D.version){H(Y,D,A);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+A)}function k(D,A){const Y=n.get(D);if(D.version>0&&Y.__version!==D.version){ee(Y,D,A);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+A)}const F={[ks]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[Ma]:i.MIRRORED_REPEAT},B={[ln]:i.NEAREST,[Lp]:i.NEAREST_MIPMAP_NEAREST,[nr]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[go]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},j={[Np]:i.NEVER,[Vp]:i.ALWAYS,[Fp]:i.LESS,[Au]:i.LEQUAL,[Op]:i.EQUAL,[zp]:i.GEQUAL,[kp]:i.GREATER,[Bp]:i.NOTEQUAL};function se(D,A){if(A.type===bn&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===fn||A.magFilter===go||A.magFilter===nr||A.magFilter===pi||A.minFilter===fn||A.minFilter===go||A.minFilter===nr||A.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(D,i.TEXTURE_WRAP_S,F[A.wrapS]),i.texParameteri(D,i.TEXTURE_WRAP_T,F[A.wrapT]),(D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY)&&i.texParameteri(D,i.TEXTURE_WRAP_R,F[A.wrapR]),i.texParameteri(D,i.TEXTURE_MAG_FILTER,B[A.magFilter]),i.texParameteri(D,i.TEXTURE_MIN_FILTER,B[A.minFilter]),A.compareFunction&&(i.texParameteri(D,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(D,i.TEXTURE_COMPARE_FUNC,j[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===ln||A.minFilter!==nr&&A.minFilter!==pi||A.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){const Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(D,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function le(D,A){let Y=!1;D.__webglInit===void 0&&(D.__webglInit=!0,A.addEventListener("dispose",E));const ne=A.source;let oe=p.get(ne);oe===void 0&&(oe={},p.set(ne,oe));const $=P(A);if($!==D.__cacheKey){oe[$]===void 0&&(oe[$]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),oe[$].usedTimes++;const ce=oe[D.__cacheKey];ce!==void 0&&(oe[D.__cacheKey].usedTimes--,ce.usedTimes===0&&w(A)),D.__cacheKey=$,D.__webglTexture=oe[$].texture}return Y}function H(D,A,Y){let ne=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ne=i.TEXTURE_3D);const oe=le(D,A),$=A.source;t.bindTexture(ne,D.__webglTexture,i.TEXTURE0+Y);const ce=n.get($);if($.version!==ce.__version||oe===!0){t.activeTexture(i.TEXTURE0+Y);const re=Ze.getPrimaries(Ze.workingColorSpace),fe=A.colorSpace===Gn?null:Ze.getPrimaries(A.colorSpace),Ie=A.colorSpace===Gn||re===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let ae=_(A.image,!1,s.maxTextureSize);ae=Ae(A,ae);const pe=r.convert(A.format,A.colorSpace),Ue=r.convert(A.type);let Oe=v(A.internalFormat,pe,Ue,A.colorSpace,A.isVideoTexture);se(ne,A);let Se;const Ye=A.mipmaps,Ve=A.isVideoTexture!==!0,tt=ce.__version===void 0||oe===!0,G=$.dataReady,ve=T(A,ae);if(A.isDepthTexture)Oe=x(A.format===ss,A.type),tt&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Oe,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,Oe,ae.width,ae.height,0,pe,Ue,null));else if(A.isDataTexture)if(Ye.length>0){Ve&&tt&&t.texStorage2D(i.TEXTURE_2D,ve,Oe,Ye[0].width,Ye[0].height);for(let J=0,ie=Ye.length;J<ie;J++)Se=Ye[J],Ve?G&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Se.width,Se.height,pe,Ue,Se.data):t.texImage2D(i.TEXTURE_2D,J,Oe,Se.width,Se.height,0,pe,Ue,Se.data);A.generateMipmaps=!1}else Ve?(tt&&t.texStorage2D(i.TEXTURE_2D,ve,Oe,ae.width,ae.height),G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae.width,ae.height,pe,Ue,ae.data)):t.texImage2D(i.TEXTURE_2D,0,Oe,ae.width,ae.height,0,pe,Ue,ae.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Ve&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Oe,Ye[0].width,Ye[0].height,ae.depth);for(let J=0,ie=Ye.length;J<ie;J++)if(Se=Ye[J],A.format!==an)if(pe!==null)if(Ve){if(G)if(A.layerUpdates.size>0){const xe=th(Se.width,Se.height,A.format,A.type);for(const ye of A.layerUpdates){const Ge=Se.data.subarray(ye*xe/Se.data.BYTES_PER_ELEMENT,(ye+1)*xe/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ye,Se.width,Se.height,1,pe,Ge)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Se.width,Se.height,ae.depth,pe,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Oe,Se.width,Se.height,ae.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?G&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Se.width,Se.height,ae.depth,pe,Ue,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,Oe,Se.width,Se.height,ae.depth,0,pe,Ue,Se.data)}else{Ve&&tt&&t.texStorage2D(i.TEXTURE_2D,ve,Oe,Ye[0].width,Ye[0].height);for(let J=0,ie=Ye.length;J<ie;J++)Se=Ye[J],A.format!==an?pe!==null?Ve?G&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,Se.width,Se.height,pe,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,J,Oe,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?G&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Se.width,Se.height,pe,Ue,Se.data):t.texImage2D(i.TEXTURE_2D,J,Oe,Se.width,Se.height,0,pe,Ue,Se.data)}else if(A.isDataArrayTexture)if(Ve){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Oe,ae.width,ae.height,ae.depth),G)if(A.layerUpdates.size>0){const J=th(ae.width,ae.height,A.format,A.type);for(const ie of A.layerUpdates){const xe=ae.data.subarray(ie*J/ae.data.BYTES_PER_ELEMENT,(ie+1)*J/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ie,ae.width,ae.height,1,pe,Ue,xe)}A.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,pe,Ue,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,ae.width,ae.height,ae.depth,0,pe,Ue,ae.data);else if(A.isData3DTexture)Ve?(tt&&t.texStorage3D(i.TEXTURE_3D,ve,Oe,ae.width,ae.height,ae.depth),G&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,pe,Ue,ae.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,ae.width,ae.height,ae.depth,0,pe,Ue,ae.data);else if(A.isFramebufferTexture){if(tt)if(Ve)t.texStorage2D(i.TEXTURE_2D,ve,Oe,ae.width,ae.height);else{let J=ae.width,ie=ae.height;for(let xe=0;xe<ve;xe++)t.texImage2D(i.TEXTURE_2D,xe,Oe,J,ie,0,pe,Ue,null),J>>=1,ie>>=1}}else if(Ye.length>0){if(Ve&&tt){const J=ge(Ye[0]);t.texStorage2D(i.TEXTURE_2D,ve,Oe,J.width,J.height)}for(let J=0,ie=Ye.length;J<ie;J++)Se=Ye[J],Ve?G&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,pe,Ue,Se):t.texImage2D(i.TEXTURE_2D,J,Oe,pe,Ue,Se);A.generateMipmaps=!1}else if(Ve){if(tt){const J=ge(ae);t.texStorage2D(i.TEXTURE_2D,ve,Oe,J.width,J.height)}G&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Ue,ae)}else t.texImage2D(i.TEXTURE_2D,0,Oe,pe,Ue,ae);f(A)&&d(ne),ce.__version=$.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function ee(D,A,Y){if(A.image.length!==6)return;const ne=le(D,A),oe=A.source;t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+Y);const $=n.get(oe);if(oe.version!==$.__version||ne===!0){t.activeTexture(i.TEXTURE0+Y);const ce=Ze.getPrimaries(Ze.workingColorSpace),re=A.colorSpace===Gn?null:Ze.getPrimaries(A.colorSpace),fe=A.colorSpace===Gn||ce===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);const Ie=A.isCompressedTexture||A.image[0].isCompressedTexture,ae=A.image[0]&&A.image[0].isDataTexture,pe=[];for(let ie=0;ie<6;ie++)!Ie&&!ae?pe[ie]=_(A.image[ie],!0,s.maxCubemapSize):pe[ie]=ae?A.image[ie].image:A.image[ie],pe[ie]=Ae(A,pe[ie]);const Ue=pe[0],Oe=r.convert(A.format,A.colorSpace),Se=r.convert(A.type),Ye=v(A.internalFormat,Oe,Se,A.colorSpace),Ve=A.isVideoTexture!==!0,tt=$.__version===void 0||ne===!0,G=oe.dataReady;let ve=T(A,Ue);se(i.TEXTURE_CUBE_MAP,A);let J;if(Ie){Ve&&tt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ye,Ue.width,Ue.height);for(let ie=0;ie<6;ie++){J=pe[ie].mipmaps;for(let xe=0;xe<J.length;xe++){const ye=J[xe];A.format!==an?Oe!==null?Ve?G&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe,0,0,ye.width,ye.height,Oe,ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe,Ye,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe,0,0,ye.width,ye.height,Oe,Se,ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe,Ye,ye.width,ye.height,0,Oe,Se,ye.data)}}}else{if(J=A.mipmaps,Ve&&tt){J.length>0&&ve++;const ie=ge(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,Ye,ie.width,ie.height)}for(let ie=0;ie<6;ie++)if(ae){Ve?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,pe[ie].width,pe[ie].height,Oe,Se,pe[ie].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ye,pe[ie].width,pe[ie].height,0,Oe,Se,pe[ie].data);for(let xe=0;xe<J.length;xe++){const Ge=J[xe].image[ie].image;Ve?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe+1,0,0,Ge.width,Ge.height,Oe,Se,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe+1,Ye,Ge.width,Ge.height,0,Oe,Se,Ge.data)}}else{Ve?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,0,0,Oe,Se,pe[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0,Ye,Oe,Se,pe[ie]);for(let xe=0;xe<J.length;xe++){const ye=J[xe];Ve?G&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe+1,0,0,Oe,Se,ye.image[ie]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,xe+1,Ye,Oe,Se,ye.image[ie])}}}f(A)&&d(i.TEXTURE_CUBE_MAP),$.__version=oe.version,A.onUpdate&&A.onUpdate(A)}D.__version=A.version}function he(D,A,Y,ne,oe,$){const ce=r.convert(Y.format,Y.colorSpace),re=r.convert(Y.type),fe=v(Y.internalFormat,ce,re,Y.colorSpace),Ie=n.get(A),ae=n.get(Y);if(ae.__renderTarget=A,!Ie.__hasExternalTextures){const pe=Math.max(1,A.width>>$),Ue=Math.max(1,A.height>>$);oe===i.TEXTURE_3D||oe===i.TEXTURE_2D_ARRAY?t.texImage3D(oe,$,fe,pe,Ue,A.depth,0,ce,re,null):t.texImage2D(oe,$,fe,pe,Ue,0,ce,re,null)}t.bindFramebuffer(i.FRAMEBUFFER,D),ke(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,oe,ae.__webglTexture,0,Ne(A)):(oe===i.TEXTURE_2D||oe>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&oe<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,oe,ae.__webglTexture,$),t.bindFramebuffer(i.FRAMEBUFFER,null)}function te(D,A,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,D),A.depthBuffer){const ne=A.depthTexture,oe=ne&&ne.isDepthTexture?ne.type:null,$=x(A.stencilBuffer,oe),ce=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=Ne(A);ke(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,re,$,A.width,A.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,re,$,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,$,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,D)}else{const ne=A.textures;for(let oe=0;oe<ne.length;oe++){const $=ne[oe],ce=r.convert($.format,$.colorSpace),re=r.convert($.type),fe=v($.internalFormat,ce,re,$.colorSpace),Ie=Ne(A);Y&&ke(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,fe,A.width,A.height):ke(A)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ie,fe,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,fe,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(D,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,D),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ne=n.get(A.depthTexture);ne.__renderTarget=A,(!ne.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),U(A.depthTexture,0);const oe=ne.__webglTexture,$=Ne(A);if(A.depthTexture.format===$i)ke(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,oe,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,oe,0);else if(A.depthTexture.format===ss)ke(A)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,oe,0,$):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,oe,0);else throw new Error("Unknown depthTexture format")}function Ee(D){const A=n.get(D),Y=D.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==D.depthTexture){const ne=D.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),ne){const oe=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,ne.removeEventListener("dispose",oe)};ne.addEventListener("dispose",oe),A.__depthDisposeCallback=oe}A.__boundDepthTexture=ne}if(D.depthTexture&&!A.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Me(A.__webglFramebuffer,D)}else if(Y){A.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[ne]),A.__webglDepthbuffer[ne]===void 0)A.__webglDepthbuffer[ne]=i.createRenderbuffer(),te(A.__webglDepthbuffer[ne],D,!1);else{const oe=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,$=A.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,$),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,$)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),te(A.__webglDepthbuffer,D,!1);else{const ne=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,oe),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,oe)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Te(D,A,Y){const ne=n.get(D);A!==void 0&&he(ne.__webglFramebuffer,D,D.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&Ee(D)}function X(D){const A=D.texture,Y=n.get(D),ne=n.get(A);D.addEventListener("dispose",b);const oe=D.textures,$=D.isWebGLCubeRenderTarget===!0,ce=oe.length>1;if(ce||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=A.version,o.memory.textures++),$){Y.__webglFramebuffer=[];for(let re=0;re<6;re++)if(A.mipmaps&&A.mipmaps.length>0){Y.__webglFramebuffer[re]=[];for(let fe=0;fe<A.mipmaps.length;fe++)Y.__webglFramebuffer[re][fe]=i.createFramebuffer()}else Y.__webglFramebuffer[re]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){Y.__webglFramebuffer=[];for(let re=0;re<A.mipmaps.length;re++)Y.__webglFramebuffer[re]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(ce)for(let re=0,fe=oe.length;re<fe;re++){const Ie=n.get(oe[re]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=i.createTexture(),o.memory.textures++)}if(D.samples>0&&ke(D)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let re=0;re<oe.length;re++){const fe=oe[re];Y.__webglColorRenderbuffer[re]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[re]);const Ie=r.convert(fe.format,fe.colorSpace),ae=r.convert(fe.type),pe=v(fe.internalFormat,Ie,ae,fe.colorSpace,D.isXRRenderTarget===!0),Ue=Ne(D);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,pe,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,Y.__webglColorRenderbuffer[re])}i.bindRenderbuffer(i.RENDERBUFFER,null),D.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),te(Y.__webglDepthRenderbuffer,D,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if($){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),se(i.TEXTURE_CUBE_MAP,A);for(let re=0;re<6;re++)if(A.mipmaps&&A.mipmaps.length>0)for(let fe=0;fe<A.mipmaps.length;fe++)he(Y.__webglFramebuffer[re][fe],D,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,fe);else he(Y.__webglFramebuffer[re],D,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);f(A)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let re=0,fe=oe.length;re<fe;re++){const Ie=oe[re],ae=n.get(Ie);t.bindTexture(i.TEXTURE_2D,ae.__webglTexture),se(i.TEXTURE_2D,Ie),he(Y.__webglFramebuffer,D,Ie,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,0),f(Ie)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let re=i.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(re=D.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(re,ne.__webglTexture),se(re,A),A.mipmaps&&A.mipmaps.length>0)for(let fe=0;fe<A.mipmaps.length;fe++)he(Y.__webglFramebuffer[fe],D,A,i.COLOR_ATTACHMENT0,re,fe);else he(Y.__webglFramebuffer,D,A,i.COLOR_ATTACHMENT0,re,0);f(A)&&d(re),t.unbindTexture()}D.depthBuffer&&Ee(D)}function Q(D){const A=D.textures;for(let Y=0,ne=A.length;Y<ne;Y++){const oe=A[Y];if(f(oe)){const $=m(D),ce=n.get(oe).__webglTexture;t.bindTexture($,ce),d($),t.unbindTexture()}}}const de=[],z=[];function Fe(D){if(D.samples>0){if(ke(D)===!1){const A=D.textures,Y=D.width,ne=D.height;let oe=i.COLOR_BUFFER_BIT;const $=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(D),re=A.length>1;if(re)for(let fe=0;fe<A.length;fe++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let fe=0;fe<A.length;fe++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(oe|=i.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(oe|=i.STENCIL_BUFFER_BIT)),re){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[fe]);const Ie=n.get(A[fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ie,0)}i.blitFramebuffer(0,0,Y,ne,0,0,Y,ne,oe,i.NEAREST),c===!0&&(de.length=0,z.length=0,de.push(i.COLOR_ATTACHMENT0+fe),D.depthBuffer&&D.resolveDepthBuffer===!1&&(de.push($),z.push($),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,z)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,de))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),re)for(let fe=0;fe<A.length;fe++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,ce.__webglColorRenderbuffer[fe]);const Ie=n.get(A[fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.TEXTURE_2D,Ie,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&c){const A=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function Ne(D){return Math.min(s.maxSamples,D.samples)}function ke(D){const A=n.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function be(D){const A=o.render.frame;h.get(D)!==A&&(h.set(D,A),D.update())}function Ae(D,A){const Y=D.colorSpace,ne=D.format,oe=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||Y!==as&&Y!==Gn&&(Ze.getTransfer(Y)===st?(ne!==an||oe!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),A}function ge(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(l.width=D.naturalWidth||D.width,l.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(l.width=D.displayWidth,l.height=D.displayHeight):(l.width=D.width,l.height=D.height),l}this.allocateTextureUnit=S,this.resetTextureUnits=O,this.setTexture2D=U,this.setTexture2DArray=I,this.setTexture3D=V,this.setTextureCube=k,this.rebindTextures=Te,this.setupRenderTarget=X,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=he,this.useMultisampledRTT=ke}function qv(i,e){function t(n,s=Gn){let r;const o=Ze.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===lc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===hc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===yu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===gu)return i.BYTE;if(n===vu)return i.SHORT;if(n===Bs)return i.UNSIGNED_SHORT;if(n===cc)return i.INT;if(n===yi)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===Hs)return i.HALF_FLOAT;if(n===_u)return i.ALPHA;if(n===xu)return i.RGB;if(n===an)return i.RGBA;if(n===Mu)return i.LUMINANCE;if(n===Su)return i.LUMINANCE_ALPHA;if(n===$i)return i.DEPTH_COMPONENT;if(n===ss)return i.DEPTH_STENCIL;if(n===wu)return i.RED;if(n===uc)return i.RED_INTEGER;if(n===Eu)return i.RG;if(n===dc)return i.RG_INTEGER;if(n===fc)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Ir||n===Ur)if(o===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Sa||n===wa||n===Ea||n===ba)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Sa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ea)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ta||n===Aa||n===Ra)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ta||n===Aa)return o===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ra)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Ua||n===Na||n===Fa||n===Oa||n===ka||n===Ba||n===za||n===Va||n===Ga)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ca)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Pa)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===La)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Da)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ia)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ua)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Na)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Fa)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Oa)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ka)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ba)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===za)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Va)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ga)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Nr||n===Ha||n===Wa)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Nr)return o===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ha)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Wa)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===bu||n===qa||n===Xa||n===$a)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Nr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===qa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Xa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$a)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===is?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Xv extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Et extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $v={type:"move"};class qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const f=t.getJointPose(_,n),d=this._getHandJoint(l,_);f!==null&&(d.matrix.fromArray(f.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=f.radius),d.visible=f!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],p=h.position.distanceTo(u.position),g=.02,y=.005;l.inputState.pinching&&p>g+y?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=g-y&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent($v)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Et;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Yv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,jv=`
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

}`;class Kv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Ft,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Zn({vertexShader:Yv,fragmentShader:jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new we(new qs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Zv extends cs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,p=null,g=null,y=null;const _=new Kv,f=t.getContextAttributes();let d=null,m=null;const v=[],x=[],T=new ze;let E=null;const b=new Wt;b.viewport=new at;const R=new Wt;R.viewport=new at;const w=[b,R],M=new Xv;let L=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let ee=v[H];return ee===void 0&&(ee=new qo,v[H]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(H){let ee=v[H];return ee===void 0&&(ee=new qo,v[H]=ee),ee.getGripSpace()},this.getHand=function(H){let ee=v[H];return ee===void 0&&(ee=new qo,v[H]=ee),ee.getHandSpace()};function S(H){const ee=x.indexOf(H.inputSource);if(ee===-1)return;const he=v[ee];he!==void 0&&(he.update(H.inputSource,H.frame,l||o),he.dispatchEvent({type:H.type,data:H.inputSource}))}function P(){s.removeEventListener("select",S),s.removeEventListener("selectstart",S),s.removeEventListener("selectend",S),s.removeEventListener("squeeze",S),s.removeEventListener("squeezestart",S),s.removeEventListener("squeezeend",S),s.removeEventListener("end",P),s.removeEventListener("inputsourceschange",U);for(let H=0;H<v.length;H++){const ee=x[H];ee!==null&&(x[H]=null,v[H].disconnect(ee))}L=null,O=null,_.reset(),e.setRenderTarget(d),g=null,p=null,u=null,s=null,m=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){a=H,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(H){l=H},this.getBaseLayer=function(){return p!==null?p:g},this.getBinding=function(){return u},this.getFrame=function(){return y},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",S),s.addEventListener("selectstart",S),s.addEventListener("selectend",S),s.addEventListener("squeeze",S),s.addEventListener("squeezestart",S),s.addEventListener("squeezeend",S),s.addEventListener("end",P),s.addEventListener("inputsourceschange",U),f.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(T),s.renderState.layers===void 0){const ee={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};g=new XRWebGLLayer(s,t,ee),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),m=new _i(g.framebufferWidth,g.framebufferHeight,{format:an,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let ee=null,he=null,te=null;f.depth&&(te=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ee=f.stencil?ss:$i,he=f.stencil?is:yi);const Me={colorFormat:t.RGBA8,depthFormat:te,scaleFactor:r};u=new XRWebGLBinding(s,t),p=u.createProjectionLayer(Me),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),m=new _i(p.textureWidth,p.textureHeight,{format:an,type:Cn,depthTexture:new Vu(p.textureWidth,p.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,ee),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}m.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),le.setContext(s),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function U(H){for(let ee=0;ee<H.removed.length;ee++){const he=H.removed[ee],te=x.indexOf(he);te>=0&&(x[te]=null,v[te].disconnect(he))}for(let ee=0;ee<H.added.length;ee++){const he=H.added[ee];let te=x.indexOf(he);if(te===-1){for(let Ee=0;Ee<v.length;Ee++)if(Ee>=x.length){x.push(he),te=Ee;break}else if(x[Ee]===null){x[Ee]=he,te=Ee;break}if(te===-1)break}const Me=v[te];Me&&Me.connect(he)}}const I=new N,V=new N;function k(H,ee,he){I.setFromMatrixPosition(ee.matrixWorld),V.setFromMatrixPosition(he.matrixWorld);const te=I.distanceTo(V),Me=ee.projectionMatrix.elements,Ee=he.projectionMatrix.elements,Te=Me[14]/(Me[10]-1),X=Me[14]/(Me[10]+1),Q=(Me[9]+1)/Me[5],de=(Me[9]-1)/Me[5],z=(Me[8]-1)/Me[0],Fe=(Ee[8]+1)/Ee[0],Ne=Te*z,ke=Te*Fe,be=te/(-z+Fe),Ae=be*-z;if(ee.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Ae),H.translateZ(be),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),Me[10]===-1)H.projectionMatrix.copy(ee.projectionMatrix),H.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const ge=Te+be,D=X+be,A=Ne-Ae,Y=ke+(te-Ae),ne=Q*X/D*ge,oe=de*X/D*ge;H.projectionMatrix.makePerspective(A,Y,ne,oe,ge,D),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function F(H,ee){ee===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(ee.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let ee=H.near,he=H.far;_.texture!==null&&(_.depthNear>0&&(ee=_.depthNear),_.depthFar>0&&(he=_.depthFar)),M.near=R.near=b.near=ee,M.far=R.far=b.far=he,(L!==M.near||O!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),L=M.near,O=M.far),b.layers.mask=H.layers.mask|2,R.layers.mask=H.layers.mask|4,M.layers.mask=b.layers.mask|R.layers.mask;const te=H.parent,Me=M.cameras;F(M,te);for(let Ee=0;Ee<Me.length;Ee++)F(Me[Ee],te);Me.length===2?k(M,b,R):M.projectionMatrix.copy(b.projectionMatrix),B(H,M,te)};function B(H,ee,he){he===null?H.matrix.copy(ee.matrixWorld):(H.matrix.copy(he.matrixWorld),H.matrix.invert(),H.matrix.multiply(ee.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(ee.projectionMatrix),H.projectionMatrixInverse.copy(ee.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=ja*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&g===null))return c},this.setFoveation=function(H){c=H,p!==null&&(p.fixedFoveation=H),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=H)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let j=null;function se(H,ee){if(h=ee.getViewerPose(l||o),y=ee,h!==null){const he=h.views;g!==null&&(e.setRenderTargetFramebuffer(m,g.framebuffer),e.setRenderTarget(m));let te=!1;he.length!==M.cameras.length&&(M.cameras.length=0,te=!0);for(let Ee=0;Ee<he.length;Ee++){const Te=he[Ee];let X=null;if(g!==null)X=g.getViewport(Te);else{const de=u.getViewSubImage(p,Te);X=de.viewport,Ee===0&&(e.setRenderTargetTextures(m,de.colorTexture,p.ignoreDepthValues?void 0:de.depthStencilTexture),e.setRenderTarget(m))}let Q=w[Ee];Q===void 0&&(Q=new Wt,Q.layers.enable(Ee),Q.viewport=new at,w[Ee]=Q),Q.matrix.fromArray(Te.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Te.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(X.x,X.y,X.width,X.height),Ee===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),te===!0&&M.cameras.push(Q)}const Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")){const Ee=u.getDepthInformation(he[0]);Ee&&Ee.isValid&&Ee.texture&&_.init(e,Ee,s.renderState)}}for(let he=0;he<v.length;he++){const te=x[he],Me=v[he];te!==null&&Me!==void 0&&Me.update(te,ee,l||o)}j&&j(H,ee),ee.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ee}),y=null}const le=new Bu;le.setAnimationLoop(se),this.setAnimationLoop=function(H){j=H},this.dispose=function(){}}}const ri=new Qt,Jv=new it;function Qv(i,e){function t(f,d){f.matrixAutoUpdate===!0&&f.updateMatrix(),d.value.copy(f.matrix)}function n(f,d){d.color.getRGB(f.fogColor.value,Fu(i)),d.isFog?(f.fogNear.value=d.near,f.fogFar.value=d.far):d.isFogExp2&&(f.fogDensity.value=d.density)}function s(f,d,m,v,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(f,d):d.isMeshToonMaterial?(r(f,d),u(f,d)):d.isMeshPhongMaterial?(r(f,d),h(f,d)):d.isMeshStandardMaterial?(r(f,d),p(f,d),d.isMeshPhysicalMaterial&&g(f,d,x)):d.isMeshMatcapMaterial?(r(f,d),y(f,d)):d.isMeshDepthMaterial?r(f,d):d.isMeshDistanceMaterial?(r(f,d),_(f,d)):d.isMeshNormalMaterial?r(f,d):d.isLineBasicMaterial?(o(f,d),d.isLineDashedMaterial&&a(f,d)):d.isPointsMaterial?c(f,d,m,v):d.isSpriteMaterial?l(f,d):d.isShadowMaterial?(f.color.value.copy(d.color),f.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(f,d){f.opacity.value=d.opacity,d.color&&f.diffuse.value.copy(d.color),d.emissive&&f.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.bumpMap&&(f.bumpMap.value=d.bumpMap,t(d.bumpMap,f.bumpMapTransform),f.bumpScale.value=d.bumpScale,d.side===Nt&&(f.bumpScale.value*=-1)),d.normalMap&&(f.normalMap.value=d.normalMap,t(d.normalMap,f.normalMapTransform),f.normalScale.value.copy(d.normalScale),d.side===Nt&&f.normalScale.value.negate()),d.displacementMap&&(f.displacementMap.value=d.displacementMap,t(d.displacementMap,f.displacementMapTransform),f.displacementScale.value=d.displacementScale,f.displacementBias.value=d.displacementBias),d.emissiveMap&&(f.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,f.emissiveMapTransform)),d.specularMap&&(f.specularMap.value=d.specularMap,t(d.specularMap,f.specularMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest);const m=e.get(d),v=m.envMap,x=m.envMapRotation;v&&(f.envMap.value=v,ri.copy(x),ri.x*=-1,ri.y*=-1,ri.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),f.envMapRotation.value.setFromMatrix4(Jv.makeRotationFromEuler(ri)),f.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=d.reflectivity,f.ior.value=d.ior,f.refractionRatio.value=d.refractionRatio),d.lightMap&&(f.lightMap.value=d.lightMap,f.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,f.lightMapTransform)),d.aoMap&&(f.aoMap.value=d.aoMap,f.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,f.aoMapTransform))}function o(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform))}function a(f,d){f.dashSize.value=d.dashSize,f.totalSize.value=d.dashSize+d.gapSize,f.scale.value=d.scale}function c(f,d,m,v){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.size.value=d.size*m,f.scale.value=v*.5,d.map&&(f.map.value=d.map,t(d.map,f.uvTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function l(f,d){f.diffuse.value.copy(d.color),f.opacity.value=d.opacity,f.rotation.value=d.rotation,d.map&&(f.map.value=d.map,t(d.map,f.mapTransform)),d.alphaMap&&(f.alphaMap.value=d.alphaMap,t(d.alphaMap,f.alphaMapTransform)),d.alphaTest>0&&(f.alphaTest.value=d.alphaTest)}function h(f,d){f.specular.value.copy(d.specular),f.shininess.value=Math.max(d.shininess,1e-4)}function u(f,d){d.gradientMap&&(f.gradientMap.value=d.gradientMap)}function p(f,d){f.metalness.value=d.metalness,d.metalnessMap&&(f.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,f.metalnessMapTransform)),f.roughness.value=d.roughness,d.roughnessMap&&(f.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,f.roughnessMapTransform)),d.envMap&&(f.envMapIntensity.value=d.envMapIntensity)}function g(f,d,m){f.ior.value=d.ior,d.sheen>0&&(f.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),f.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(f.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,f.sheenColorMapTransform)),d.sheenRoughnessMap&&(f.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,f.sheenRoughnessMapTransform))),d.clearcoat>0&&(f.clearcoat.value=d.clearcoat,f.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(f.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,f.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(f.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Nt&&f.clearcoatNormalScale.value.negate())),d.dispersion>0&&(f.dispersion.value=d.dispersion),d.iridescence>0&&(f.iridescence.value=d.iridescence,f.iridescenceIOR.value=d.iridescenceIOR,f.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(f.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,f.iridescenceMapTransform)),d.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),d.transmission>0&&(f.transmission.value=d.transmission,f.transmissionSamplerMap.value=m.texture,f.transmissionSamplerSize.value.set(m.width,m.height),d.transmissionMap&&(f.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,f.transmissionMapTransform)),f.thickness.value=d.thickness,d.thicknessMap&&(f.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=d.attenuationDistance,f.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(f.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(f.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=d.specularIntensity,f.specularColor.value.copy(d.specularColor),d.specularColorMap&&(f.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,f.specularColorMapTransform)),d.specularIntensityMap&&(f.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,f.specularIntensityMapTransform))}function y(f,d){d.matcap&&(f.matcap.value=d.matcap)}function _(f,d){const m=e.get(d).light;f.referencePosition.value.setFromMatrixPosition(m.matrixWorld),f.nearDistance.value=m.shadow.camera.near,f.farDistance.value=m.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function ey(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(m,v){const x=v.program;n.uniformBlockBinding(m,x)}function l(m,v){let x=s[m.id];x===void 0&&(y(m),x=h(m),s[m.id]=x,m.addEventListener("dispose",f));const T=v.program;n.updateUBOMapping(m,T);const E=e.render.frame;r[m.id]!==E&&(p(m),r[m.id]=E)}function h(m){const v=u();m.__bindingPointIndex=v;const x=i.createBuffer(),T=m.__size,E=m.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,T,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,x),x}function u(){for(let m=0;m<a;m++)if(o.indexOf(m)===-1)return o.push(m),m;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(m){const v=s[m.id],x=m.uniforms,T=m.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,b=x.length;E<b;E++){const R=Array.isArray(x[E])?x[E]:[x[E]];for(let w=0,M=R.length;w<M;w++){const L=R[w];if(g(L,E,w,T)===!0){const O=L.__offset,S=Array.isArray(L.value)?L.value:[L.value];let P=0;for(let U=0;U<S.length;U++){const I=S[U],V=_(I);typeof I=="number"||typeof I=="boolean"?(L.__data[0]=I,i.bufferSubData(i.UNIFORM_BUFFER,O+P,L.__data)):I.isMatrix3?(L.__data[0]=I.elements[0],L.__data[1]=I.elements[1],L.__data[2]=I.elements[2],L.__data[3]=0,L.__data[4]=I.elements[3],L.__data[5]=I.elements[4],L.__data[6]=I.elements[5],L.__data[7]=0,L.__data[8]=I.elements[6],L.__data[9]=I.elements[7],L.__data[10]=I.elements[8],L.__data[11]=0):(I.toArray(L.__data,P),P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,O,L.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function g(m,v,x,T){const E=m.value,b=v+"_"+x;if(T[b]===void 0)return typeof E=="number"||typeof E=="boolean"?T[b]=E:T[b]=E.clone(),!0;{const R=T[b];if(typeof E=="number"||typeof E=="boolean"){if(R!==E)return T[b]=E,!0}else if(R.equals(E)===!1)return R.copy(E),!0}return!1}function y(m){const v=m.uniforms;let x=0;const T=16;for(let b=0,R=v.length;b<R;b++){const w=Array.isArray(v[b])?v[b]:[v[b]];for(let M=0,L=w.length;M<L;M++){const O=w[M],S=Array.isArray(O.value)?O.value:[O.value];for(let P=0,U=S.length;P<U;P++){const I=S[P],V=_(I),k=x%T,F=k%V.boundary,B=k+F;x+=F,B!==0&&T-B<V.storage&&(x+=T-B),O.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=x,x+=V.storage}}}const E=x%T;return E>0&&(x+=T-E),m.__size=x,m.__cache={},this}function _(m){const v={boundary:0,storage:0};return typeof m=="number"||typeof m=="boolean"?(v.boundary=4,v.storage=4):m.isVector2?(v.boundary=8,v.storage=8):m.isVector3||m.isColor?(v.boundary=16,v.storage=12):m.isVector4?(v.boundary=16,v.storage=16):m.isMatrix3?(v.boundary=48,v.storage=48):m.isMatrix4?(v.boundary=64,v.storage=64):m.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",m),v}function f(m){const v=m.target;v.removeEventListener("dispose",f);const x=o.indexOf(v.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function d(){for(const m in s)i.deleteBuffer(s[m]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}class ty{constructor(e={}){const{canvas:t=Hp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=o;const y=new Uint32Array(4),_=new Int32Array(4);let f=null,d=null;const m=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this.toneMapping=Xn,this.toneMappingExposure=1;const x=this;let T=!1,E=0,b=0,R=null,w=-1,M=null;const L=new at,O=new at;let S=null;const P=new qe(0);let U=0,I=t.width,V=t.height,k=1,F=null,B=null;const j=new at(0,0,I,V),se=new at(0,0,I,V);let le=!1;const H=new pc;let ee=!1,he=!1;const te=new it,Me=new it,Ee=new N,Te=new at,X={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function de(){return R===null?k:1}let z=n;function Fe(C,W){return t.getContext(C,W)}try{const C={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ac}`),t.addEventListener("webglcontextlost",ie,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",ye,!1),z===null){const W="webgl2";if(z=Fe(W,C),z===null)throw Fe(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Ne,ke,be,Ae,ge,D,A,Y,ne,oe,$,ce,re,fe,Ie,ae,pe,Ue,Oe,Se,Ye,Ve,tt,G;function ve(){Ne=new o1(z),Ne.init(),Ve=new qv(z,Ne),ke=new e1(z,Ne,e,Ve),be=new Gv(z,Ne),ke.reverseDepthBuffer&&p&&be.buffers.depth.setReversed(!0),Ae=new l1(z),ge=new Av,D=new Wv(z,Ne,be,ge,ke,Ve,Ae),A=new n1(x),Y=new r1(x),ne=new gm(z),tt=new Jg(z,ne),oe=new a1(z,ne,Ae,tt),$=new u1(z,oe,ne,Ae),Oe=new h1(z,ke,D),ae=new t1(ge),ce=new Tv(x,A,Y,Ne,ke,tt,ae),re=new Qv(x,ge),fe=new Cv,Ie=new Nv(Ne),Ue=new Zg(x,A,Y,be,$,g,c),pe=new zv(x,$,ke),G=new ey(z,Ae,ke,be),Se=new Qg(z,Ne,Ae),Ye=new c1(z,Ne,Ae),Ae.programs=ce.programs,x.capabilities=ke,x.extensions=Ne,x.properties=ge,x.renderLists=fe,x.shadowMap=pe,x.state=be,x.info=Ae}ve();const J=new Zv(x,z);this.xr=J,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const C=Ne.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Ne.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(C){C!==void 0&&(k=C,this.setSize(I,V,!1))},this.getSize=function(C){return C.set(I,V)},this.setSize=function(C,W,K=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=C,V=W,t.width=Math.floor(C*k),t.height=Math.floor(W*k),K===!0&&(t.style.width=C+"px",t.style.height=W+"px"),this.setViewport(0,0,C,W)},this.getDrawingBufferSize=function(C){return C.set(I*k,V*k).floor()},this.setDrawingBufferSize=function(C,W,K){I=C,V=W,k=K,t.width=Math.floor(C*K),t.height=Math.floor(W*K),this.setViewport(0,0,C,W)},this.getCurrentViewport=function(C){return C.copy(L)},this.getViewport=function(C){return C.copy(j)},this.setViewport=function(C,W,K,Z){C.isVector4?j.set(C.x,C.y,C.z,C.w):j.set(C,W,K,Z),be.viewport(L.copy(j).multiplyScalar(k).round())},this.getScissor=function(C){return C.copy(se)},this.setScissor=function(C,W,K,Z){C.isVector4?se.set(C.x,C.y,C.z,C.w):se.set(C,W,K,Z),be.scissor(O.copy(se).multiplyScalar(k).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(C){be.setScissorTest(le=C)},this.setOpaqueSort=function(C){F=C},this.setTransparentSort=function(C){B=C},this.getClearColor=function(C){return C.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor.apply(Ue,arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha.apply(Ue,arguments)},this.clear=function(C=!0,W=!0,K=!0){let Z=0;if(C){let q=!1;if(R!==null){const ue=R.texture.format;q=ue===fc||ue===dc||ue===uc}if(q){const ue=R.texture.type,_e=ue===Cn||ue===yi||ue===Bs||ue===is||ue===lc||ue===hc,Re=Ue.getClearColor(),Ce=Ue.getClearAlpha(),Be=Re.r,He=Re.g,Pe=Re.b;_e?(y[0]=Be,y[1]=He,y[2]=Pe,y[3]=Ce,z.clearBufferuiv(z.COLOR,0,y)):(_[0]=Be,_[1]=He,_[2]=Pe,_[3]=Ce,z.clearBufferiv(z.COLOR,0,_))}else Z|=z.COLOR_BUFFER_BIT}W&&(Z|=z.DEPTH_BUFFER_BIT),K&&(Z|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ie,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),fe.dispose(),Ie.dispose(),ge.dispose(),A.dispose(),Y.dispose(),$.dispose(),tt.dispose(),G.dispose(),ce.dispose(),J.dispose(),J.removeEventListener("sessionstart",yc),J.removeEventListener("sessionend",_c),Qn.stop()};function ie(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const C=Ae.autoReset,W=pe.enabled,K=pe.autoUpdate,Z=pe.needsUpdate,q=pe.type;ve(),Ae.autoReset=C,pe.enabled=W,pe.autoUpdate=K,pe.needsUpdate=Z,pe.type=q}function ye(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Ge(C){const W=C.target;W.removeEventListener("dispose",Ge),pt(W)}function pt(C){bt(C),ge.remove(C)}function bt(C){const W=ge.get(C).programs;W!==void 0&&(W.forEach(function(K){ce.releaseProgram(K)}),C.isShaderMaterial&&ce.releaseShaderCache(C))}this.renderBufferDirect=function(C,W,K,Z,q,ue){W===null&&(W=X);const _e=q.isMesh&&q.matrixWorld.determinant()<0,Re=ju(C,W,K,Z,q);be.setMaterial(Z,_e);let Ce=K.index,Be=1;if(Z.wireframe===!0){if(Ce=oe.getWireframeAttribute(K),Ce===void 0)return;Be=2}const He=K.drawRange,Pe=K.attributes.position;let Je=He.start*Be,lt=(He.start+He.count)*Be;ue!==null&&(Je=Math.max(Je,ue.start*Be),lt=Math.min(lt,(ue.start+ue.count)*Be)),Ce!==null?(Je=Math.max(Je,0),lt=Math.min(lt,Ce.count)):Pe!=null&&(Je=Math.max(Je,0),lt=Math.min(lt,Pe.count));const ht=lt-Je;if(ht<0||ht===1/0)return;tt.setup(q,Z,Re,K,Ce);let kt,Qe=Se;if(Ce!==null&&(kt=ne.get(Ce),Qe=Ye,Qe.setIndex(kt)),q.isMesh)Z.wireframe===!0?(be.setLineWidth(Z.wireframeLinewidth*de()),Qe.setMode(z.LINES)):Qe.setMode(z.TRIANGLES);else if(q.isLine){let De=Z.linewidth;De===void 0&&(De=1),be.setLineWidth(De*de()),q.isLineSegments?Qe.setMode(z.LINES):q.isLineLoop?Qe.setMode(z.LINE_LOOP):Qe.setMode(z.LINE_STRIP)}else q.isPoints?Qe.setMode(z.POINTS):q.isSprite&&Qe.setMode(z.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Qe.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Qe.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{const De=q._multiDrawStarts,mn=q._multiDrawCounts,et=q._multiDrawCount,tn=Ce?ne.get(Ce).bytesPerElement:1,bi=ge.get(Z).currentProgram.getUniforms();for(let zt=0;zt<et;zt++)bi.setValue(z,"_gl_DrawID",zt),Qe.render(De[zt]/tn,mn[zt])}else if(q.isInstancedMesh)Qe.renderInstances(Je,ht,q.count);else if(K.isInstancedBufferGeometry){const De=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,mn=Math.min(K.instanceCount,De);Qe.renderInstances(Je,ht,mn)}else Qe.render(Je,ht)};function nt(C,W,K){C.transparent===!0&&C.side===Rt&&C.forceSinglePass===!1?(C.side=Nt,C.needsUpdate=!0,js(C,W,K),C.side=Kn,C.needsUpdate=!0,js(C,W,K),C.side=Rt):js(C,W,K)}this.compile=function(C,W,K=null){K===null&&(K=C),d=Ie.get(K),d.init(W),v.push(d),K.traverseVisible(function(q){q.isLight&&q.layers.test(W.layers)&&(d.pushLight(q),q.castShadow&&d.pushShadow(q))}),C!==K&&C.traverseVisible(function(q){q.isLight&&q.layers.test(W.layers)&&(d.pushLight(q),q.castShadow&&d.pushShadow(q))}),d.setupLights();const Z=new Set;return C.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;const ue=q.material;if(ue)if(Array.isArray(ue))for(let _e=0;_e<ue.length;_e++){const Re=ue[_e];nt(Re,K,q),Z.add(Re)}else nt(ue,K,q),Z.add(ue)}),v.pop(),d=null,Z},this.compileAsync=function(C,W,K=null){const Z=this.compile(C,W,K);return new Promise(q=>{function ue(){if(Z.forEach(function(_e){ge.get(_e).currentProgram.isReady()&&Z.delete(_e)}),Z.size===0){q(C);return}setTimeout(ue,10)}Ne.get("KHR_parallel_shader_compile")!==null?ue():setTimeout(ue,10)})};let en=null;function pn(C){en&&en(C)}function yc(){Qn.stop()}function _c(){Qn.start()}const Qn=new Bu;Qn.setAnimationLoop(pn),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(C){en=C,J.setAnimationLoop(C),C===null?Qn.stop():Qn.start()},J.addEventListener("sessionstart",yc),J.addEventListener("sessionend",_c),this.render=function(C,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(W),W=J.getCamera()),C.isScene===!0&&C.onBeforeRender(x,C,W,R),d=Ie.get(C,v.length),d.init(W),v.push(d),Me.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),H.setFromProjectionMatrix(Me),he=this.localClippingEnabled,ee=ae.init(this.clippingPlanes,he),f=fe.get(C,m.length),f.init(),m.push(f),J.enabled===!0&&J.isPresenting===!0){const ue=x.xr.getDepthSensingMesh();ue!==null&&no(ue,W,-1/0,x.sortObjects)}no(C,W,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(F,B),Q=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Q&&Ue.addToRenderList(f,C),this.info.render.frame++,ee===!0&&ae.beginShadows();const K=d.state.shadowsArray;pe.render(K,C,W),ee===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const Z=f.opaque,q=f.transmissive;if(d.setupLights(),W.isArrayCamera){const ue=W.cameras;if(q.length>0)for(let _e=0,Re=ue.length;_e<Re;_e++){const Ce=ue[_e];Mc(Z,q,C,Ce)}Q&&Ue.render(C);for(let _e=0,Re=ue.length;_e<Re;_e++){const Ce=ue[_e];xc(f,C,Ce,Ce.viewport)}}else q.length>0&&Mc(Z,q,C,W),Q&&Ue.render(C),xc(f,C,W);R!==null&&(D.updateMultisampleRenderTarget(R),D.updateRenderTargetMipmap(R)),C.isScene===!0&&C.onAfterRender(x,C,W),tt.resetDefaultState(),w=-1,M=null,v.pop(),v.length>0?(d=v[v.length-1],ee===!0&&ae.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,m.pop(),m.length>0?f=m[m.length-1]:f=null};function no(C,W,K,Z){if(C.visible===!1)return;if(C.layers.test(W.layers)){if(C.isGroup)K=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(W);else if(C.isLight)d.pushLight(C),C.castShadow&&d.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||H.intersectsSprite(C)){Z&&Te.setFromMatrixPosition(C.matrixWorld).applyMatrix4(Me);const _e=$.update(C),Re=C.material;Re.visible&&f.push(C,_e,Re,K,Te.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||H.intersectsObject(C))){const _e=$.update(C),Re=C.material;if(Z&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),Te.copy(C.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Te.copy(_e.boundingSphere.center)),Te.applyMatrix4(C.matrixWorld).applyMatrix4(Me)),Array.isArray(Re)){const Ce=_e.groups;for(let Be=0,He=Ce.length;Be<He;Be++){const Pe=Ce[Be],Je=Re[Pe.materialIndex];Je&&Je.visible&&f.push(C,_e,Je,K,Te.z,Pe)}}else Re.visible&&f.push(C,_e,Re,K,Te.z,null)}}const ue=C.children;for(let _e=0,Re=ue.length;_e<Re;_e++)no(ue[_e],W,K,Z)}function xc(C,W,K,Z){const q=C.opaque,ue=C.transmissive,_e=C.transparent;d.setupLightsView(K),ee===!0&&ae.setGlobalState(x.clippingPlanes,K),Z&&be.viewport(L.copy(Z)),q.length>0&&Ys(q,W,K),ue.length>0&&Ys(ue,W,K),_e.length>0&&Ys(_e,W,K),be.buffers.depth.setTest(!0),be.buffers.depth.setMask(!0),be.buffers.color.setMask(!0),be.setPolygonOffset(!1)}function Mc(C,W,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[Z.id]===void 0&&(d.state.transmissionRenderTarget[Z.id]=new _i(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Hs:Cn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const ue=d.state.transmissionRenderTarget[Z.id],_e=Z.viewport||L;ue.setSize(_e.z,_e.w);const Re=x.getRenderTarget();x.setRenderTarget(ue),x.getClearColor(P),U=x.getClearAlpha(),U<1&&x.setClearColor(16777215,.5),x.clear(),Q&&Ue.render(K);const Ce=x.toneMapping;x.toneMapping=Xn;const Be=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),d.setupLightsView(Z),ee===!0&&ae.setGlobalState(x.clippingPlanes,Z),Ys(C,K,Z),D.updateMultisampleRenderTarget(ue),D.updateRenderTargetMipmap(ue),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Pe=0,Je=W.length;Pe<Je;Pe++){const lt=W[Pe],ht=lt.object,kt=lt.geometry,Qe=lt.material,De=lt.group;if(Qe.side===Rt&&ht.layers.test(Z.layers)){const mn=Qe.side;Qe.side=Nt,Qe.needsUpdate=!0,Sc(ht,K,Z,kt,Qe,De),Qe.side=mn,Qe.needsUpdate=!0,He=!0}}He===!0&&(D.updateMultisampleRenderTarget(ue),D.updateRenderTargetMipmap(ue))}x.setRenderTarget(Re),x.setClearColor(P,U),Be!==void 0&&(Z.viewport=Be),x.toneMapping=Ce}function Ys(C,W,K){const Z=W.isScene===!0?W.overrideMaterial:null;for(let q=0,ue=C.length;q<ue;q++){const _e=C[q],Re=_e.object,Ce=_e.geometry,Be=Z===null?_e.material:Z,He=_e.group;Re.layers.test(K.layers)&&Sc(Re,W,K,Ce,Be,He)}}function Sc(C,W,K,Z,q,ue){C.onBeforeRender(x,W,K,Z,q,ue),C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),q.onBeforeRender(x,W,K,Z,C,ue),q.transparent===!0&&q.side===Rt&&q.forceSinglePass===!1?(q.side=Nt,q.needsUpdate=!0,x.renderBufferDirect(K,W,Z,q,C,ue),q.side=Kn,q.needsUpdate=!0,x.renderBufferDirect(K,W,Z,q,C,ue),q.side=Rt):x.renderBufferDirect(K,W,Z,q,C,ue),C.onAfterRender(x,W,K,Z,q,ue)}function js(C,W,K){W.isScene!==!0&&(W=X);const Z=ge.get(C),q=d.state.lights,ue=d.state.shadowsArray,_e=q.state.version,Re=ce.getParameters(C,q.state,ue,W,K),Ce=ce.getProgramCacheKey(Re);let Be=Z.programs;Z.environment=C.isMeshStandardMaterial?W.environment:null,Z.fog=W.fog,Z.envMap=(C.isMeshStandardMaterial?Y:A).get(C.envMap||Z.environment),Z.envMapRotation=Z.environment!==null&&C.envMap===null?W.environmentRotation:C.envMapRotation,Be===void 0&&(C.addEventListener("dispose",Ge),Be=new Map,Z.programs=Be);let He=Be.get(Ce);if(He!==void 0){if(Z.currentProgram===He&&Z.lightsStateVersion===_e)return Ec(C,Re),He}else Re.uniforms=ce.getUniforms(C),C.onBeforeCompile(Re,x),He=ce.acquireProgram(Re,Ce),Be.set(Ce,He),Z.uniforms=Re.uniforms;const Pe=Z.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Pe.clippingPlanes=ae.uniform),Ec(C,Re),Z.needsLights=Zu(C),Z.lightsStateVersion=_e,Z.needsLights&&(Pe.ambientLightColor.value=q.state.ambient,Pe.lightProbe.value=q.state.probe,Pe.directionalLights.value=q.state.directional,Pe.directionalLightShadows.value=q.state.directionalShadow,Pe.spotLights.value=q.state.spot,Pe.spotLightShadows.value=q.state.spotShadow,Pe.rectAreaLights.value=q.state.rectArea,Pe.ltc_1.value=q.state.rectAreaLTC1,Pe.ltc_2.value=q.state.rectAreaLTC2,Pe.pointLights.value=q.state.point,Pe.pointLightShadows.value=q.state.pointShadow,Pe.hemisphereLights.value=q.state.hemi,Pe.directionalShadowMap.value=q.state.directionalShadowMap,Pe.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Pe.spotShadowMap.value=q.state.spotShadowMap,Pe.spotLightMatrix.value=q.state.spotLightMatrix,Pe.spotLightMap.value=q.state.spotLightMap,Pe.pointShadowMap.value=q.state.pointShadowMap,Pe.pointShadowMatrix.value=q.state.pointShadowMatrix),Z.currentProgram=He,Z.uniformsList=null,He}function wc(C){if(C.uniformsList===null){const W=C.currentProgram.getUniforms();C.uniformsList=Fr.seqWithValue(W.seq,C.uniforms)}return C.uniformsList}function Ec(C,W){const K=ge.get(C);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.batchingColor=W.batchingColor,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.instancingMorph=W.instancingMorph,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function ju(C,W,K,Z,q){W.isScene!==!0&&(W=X),D.resetTextureUnits();const ue=W.fog,_e=Z.isMeshStandardMaterial?W.environment:null,Re=R===null?x.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:as,Ce=(Z.isMeshStandardMaterial?Y:A).get(Z.envMap||_e),Be=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,He=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Pe=!!K.morphAttributes.position,Je=!!K.morphAttributes.normal,lt=!!K.morphAttributes.color;let ht=Xn;Z.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ht=x.toneMapping);const kt=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Qe=kt!==void 0?kt.length:0,De=ge.get(Z),mn=d.state.lights;if(ee===!0&&(he===!0||C!==M)){const $t=C===M&&Z.id===w;ae.setState(Z,C,$t)}let et=!1;Z.version===De.__version?(De.needsLights&&De.lightsStateVersion!==mn.state.version||De.outputColorSpace!==Re||q.isBatchedMesh&&De.batching===!1||!q.isBatchedMesh&&De.batching===!0||q.isBatchedMesh&&De.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&De.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&De.instancing===!1||!q.isInstancedMesh&&De.instancing===!0||q.isSkinnedMesh&&De.skinning===!1||!q.isSkinnedMesh&&De.skinning===!0||q.isInstancedMesh&&De.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&De.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&De.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&De.instancingMorph===!1&&q.morphTexture!==null||De.envMap!==Ce||Z.fog===!0&&De.fog!==ue||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==ae.numPlanes||De.numIntersection!==ae.numIntersection)||De.vertexAlphas!==Be||De.vertexTangents!==He||De.morphTargets!==Pe||De.morphNormals!==Je||De.morphColors!==lt||De.toneMapping!==ht||De.morphTargetsCount!==Qe)&&(et=!0):(et=!0,De.__version=Z.version);let tn=De.currentProgram;et===!0&&(tn=js(Z,W,q));let bi=!1,zt=!1,us=!1;const ut=tn.getUniforms(),hn=De.uniforms;if(be.useProgram(tn.program)&&(bi=!0,zt=!0,us=!0),Z.id!==w&&(w=Z.id,zt=!0),bi||M!==C){be.buffers.depth.getReversed()?(te.copy(C.projectionMatrix),qp(te),Xp(te),ut.setValue(z,"projectionMatrix",te)):ut.setValue(z,"projectionMatrix",C.projectionMatrix),ut.setValue(z,"viewMatrix",C.matrixWorldInverse);const Pn=ut.map.cameraPosition;Pn!==void 0&&Pn.setValue(z,Ee.setFromMatrixPosition(C.matrixWorld)),ke.logarithmicDepthBuffer&&ut.setValue(z,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&ut.setValue(z,"isOrthographic",C.isOrthographicCamera===!0),M!==C&&(M=C,zt=!0,us=!0)}if(q.isSkinnedMesh){ut.setOptional(z,q,"bindMatrix"),ut.setOptional(z,q,"bindMatrixInverse");const $t=q.skeleton;$t&&($t.boneTexture===null&&$t.computeBoneTexture(),ut.setValue(z,"boneTexture",$t.boneTexture,D))}q.isBatchedMesh&&(ut.setOptional(z,q,"batchingTexture"),ut.setValue(z,"batchingTexture",q._matricesTexture,D),ut.setOptional(z,q,"batchingIdTexture"),ut.setValue(z,"batchingIdTexture",q._indirectTexture,D),ut.setOptional(z,q,"batchingColorTexture"),q._colorsTexture!==null&&ut.setValue(z,"batchingColorTexture",q._colorsTexture,D));const ds=K.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&Oe.update(q,K,tn),(zt||De.receiveShadow!==q.receiveShadow)&&(De.receiveShadow=q.receiveShadow,ut.setValue(z,"receiveShadow",q.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(hn.envMap.value=Ce,hn.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),Z.isMeshStandardMaterial&&Z.envMap===null&&W.environment!==null&&(hn.envMapIntensity.value=W.environmentIntensity),zt&&(ut.setValue(z,"toneMappingExposure",x.toneMappingExposure),De.needsLights&&Ku(hn,us),ue&&Z.fog===!0&&re.refreshFogUniforms(hn,ue),re.refreshMaterialUniforms(hn,Z,k,V,d.state.transmissionRenderTarget[C.id]),Fr.upload(z,wc(De),hn,D)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Fr.upload(z,wc(De),hn,D),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&ut.setValue(z,"center",q.center),ut.setValue(z,"modelViewMatrix",q.modelViewMatrix),ut.setValue(z,"normalMatrix",q.normalMatrix),ut.setValue(z,"modelMatrix",q.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const $t=Z.uniformsGroups;for(let Pn=0,Ln=$t.length;Pn<Ln;Pn++){const bc=$t[Pn];G.update(bc,tn),G.bind(bc,tn)}}return tn}function Ku(C,W){C.ambientLightColor.needsUpdate=W,C.lightProbe.needsUpdate=W,C.directionalLights.needsUpdate=W,C.directionalLightShadows.needsUpdate=W,C.pointLights.needsUpdate=W,C.pointLightShadows.needsUpdate=W,C.spotLights.needsUpdate=W,C.spotLightShadows.needsUpdate=W,C.rectAreaLights.needsUpdate=W,C.hemisphereLights.needsUpdate=W}function Zu(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(C,W,K){ge.get(C.texture).__webglTexture=W,ge.get(C.depthTexture).__webglTexture=K;const Z=ge.get(C);Z.__hasExternalTextures=!0,Z.__autoAllocateDepthBuffer=K===void 0,Z.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,W){const K=ge.get(C);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(C,W=0,K=0){R=C,E=W,b=K;let Z=!0,q=null,ue=!1,_e=!1;if(C){const Ce=ge.get(C);if(Ce.__useDefaultFramebuffer!==void 0)be.bindFramebuffer(z.FRAMEBUFFER,null),Z=!1;else if(Ce.__webglFramebuffer===void 0)D.setupRenderTarget(C);else if(Ce.__hasExternalTextures)D.rebindTextures(C,ge.get(C.texture).__webglTexture,ge.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const Pe=C.depthTexture;if(Ce.__boundDepthTexture!==Pe){if(Pe!==null&&ge.has(Pe)&&(C.width!==Pe.image.width||C.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(C)}}const Be=C.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(_e=!0);const He=ge.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(He[W])?q=He[W][K]:q=He[W],ue=!0):C.samples>0&&D.useMultisampledRTT(C)===!1?q=ge.get(C).__webglMultisampledFramebuffer:Array.isArray(He)?q=He[K]:q=He,L.copy(C.viewport),O.copy(C.scissor),S=C.scissorTest}else L.copy(j).multiplyScalar(k).floor(),O.copy(se).multiplyScalar(k).floor(),S=le;if(be.bindFramebuffer(z.FRAMEBUFFER,q)&&Z&&be.drawBuffers(C,q),be.viewport(L),be.scissor(O),be.setScissorTest(S),ue){const Ce=ge.get(C.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+W,Ce.__webglTexture,K)}else if(_e){const Ce=ge.get(C.texture),Be=W||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Ce.__webglTexture,K||0,Be)}w=-1},this.readRenderTargetPixels=function(C,W,K,Z,q,ue,_e){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Re=ge.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_e!==void 0&&(Re=Re[_e]),Re){be.bindFramebuffer(z.FRAMEBUFFER,Re);try{const Ce=C.texture,Be=Ce.format,He=Ce.type;if(!ke.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ke.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=C.width-Z&&K>=0&&K<=C.height-q&&z.readPixels(W,K,Z,q,Ve.convert(Be),Ve.convert(He),ue)}finally{const Ce=R!==null?ge.get(R).__webglFramebuffer:null;be.bindFramebuffer(z.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(C,W,K,Z,q,ue,_e){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Re=ge.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&_e!==void 0&&(Re=Re[_e]),Re){const Ce=C.texture,Be=Ce.format,He=Ce.type;if(!ke.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ke.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(W>=0&&W<=C.width-Z&&K>=0&&K<=C.height-q){be.bindFramebuffer(z.FRAMEBUFFER,Re);const Pe=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,Pe),z.bufferData(z.PIXEL_PACK_BUFFER,ue.byteLength,z.STREAM_READ),z.readPixels(W,K,Z,q,Ve.convert(Be),Ve.convert(He),0);const Je=R!==null?ge.get(R).__webglFramebuffer:null;be.bindFramebuffer(z.FRAMEBUFFER,Je);const lt=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Wp(z,lt,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,Pe),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,ue),z.deleteBuffer(Pe),z.deleteSync(lt),ue}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,W=null,K=0){C.isTexture!==!0&&(As("WebGLRenderer: copyFramebufferToTexture function signature has changed."),W=arguments[0]||null,C=arguments[1]);const Z=Math.pow(2,-K),q=Math.floor(C.image.width*Z),ue=Math.floor(C.image.height*Z),_e=W!==null?W.x:0,Re=W!==null?W.y:0;D.setTexture2D(C,0),z.copyTexSubImage2D(z.TEXTURE_2D,K,0,0,_e,Re,q,ue),be.unbindTexture()},this.copyTextureToTexture=function(C,W,K=null,Z=null,q=0){C.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture function signature has changed."),Z=arguments[0]||null,C=arguments[1],W=arguments[2],q=arguments[3]||0,K=null);let ue,_e,Re,Ce,Be,He,Pe,Je,lt;const ht=C.isCompressedTexture?C.mipmaps[q]:C.image;K!==null?(ue=K.max.x-K.min.x,_e=K.max.y-K.min.y,Re=K.isBox3?K.max.z-K.min.z:1,Ce=K.min.x,Be=K.min.y,He=K.isBox3?K.min.z:0):(ue=ht.width,_e=ht.height,Re=ht.depth||1,Ce=0,Be=0,He=0),Z!==null?(Pe=Z.x,Je=Z.y,lt=Z.z):(Pe=0,Je=0,lt=0);const kt=Ve.convert(W.format),Qe=Ve.convert(W.type);let De;W.isData3DTexture?(D.setTexture3D(W,0),De=z.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(D.setTexture2DArray(W,0),De=z.TEXTURE_2D_ARRAY):(D.setTexture2D(W,0),De=z.TEXTURE_2D),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,W.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,W.unpackAlignment);const mn=z.getParameter(z.UNPACK_ROW_LENGTH),et=z.getParameter(z.UNPACK_IMAGE_HEIGHT),tn=z.getParameter(z.UNPACK_SKIP_PIXELS),bi=z.getParameter(z.UNPACK_SKIP_ROWS),zt=z.getParameter(z.UNPACK_SKIP_IMAGES);z.pixelStorei(z.UNPACK_ROW_LENGTH,ht.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ht.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ce),z.pixelStorei(z.UNPACK_SKIP_ROWS,Be),z.pixelStorei(z.UNPACK_SKIP_IMAGES,He);const us=C.isDataArrayTexture||C.isData3DTexture,ut=W.isDataArrayTexture||W.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const hn=ge.get(C),ds=ge.get(W),$t=ge.get(hn.__renderTarget),Pn=ge.get(ds.__renderTarget);be.bindFramebuffer(z.READ_FRAMEBUFFER,$t.__webglFramebuffer),be.bindFramebuffer(z.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Ln=0;Ln<Re;Ln++)us&&z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ge.get(C).__webglTexture,q,He+Ln),C.isDepthTexture?(ut&&z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,ge.get(W).__webglTexture,q,lt+Ln),z.blitFramebuffer(Ce,Be,ue,_e,Pe,Je,ue,_e,z.DEPTH_BUFFER_BIT,z.NEAREST)):ut?z.copyTexSubImage3D(De,q,Pe,Je,lt+Ln,Ce,Be,ue,_e):z.copyTexSubImage2D(De,q,Pe,Je,lt+Ln,Ce,Be,ue,_e);be.bindFramebuffer(z.READ_FRAMEBUFFER,null),be.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else ut?C.isDataTexture||C.isData3DTexture?z.texSubImage3D(De,q,Pe,Je,lt,ue,_e,Re,kt,Qe,ht.data):W.isCompressedArrayTexture?z.compressedTexSubImage3D(De,q,Pe,Je,lt,ue,_e,Re,kt,ht.data):z.texSubImage3D(De,q,Pe,Je,lt,ue,_e,Re,kt,Qe,ht):C.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,q,Pe,Je,ue,_e,kt,Qe,ht.data):C.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,q,Pe,Je,ht.width,ht.height,kt,ht.data):z.texSubImage2D(z.TEXTURE_2D,q,Pe,Je,ue,_e,kt,Qe,ht);z.pixelStorei(z.UNPACK_ROW_LENGTH,mn),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,et),z.pixelStorei(z.UNPACK_SKIP_PIXELS,tn),z.pixelStorei(z.UNPACK_SKIP_ROWS,bi),z.pixelStorei(z.UNPACK_SKIP_IMAGES,zt),q===0&&W.generateMipmaps&&z.generateMipmap(De),be.unbindTexture()},this.copyTextureToTexture3D=function(C,W,K=null,Z=null,q=0){return C.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,Z=arguments[1]||null,C=arguments[2],W=arguments[3],q=arguments[4]||0),As('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,W,K,Z,q)},this.initRenderTarget=function(C){ge.get(C).__webglFramebuffer===void 0&&D.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?D.setTextureCube(C,0):C.isData3DTexture?D.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?D.setTexture2DArray(C,0):D.setTexture2D(C,0),be.unbindTexture()},this.resetState=function(){E=0,b=0,R=null,be.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}class gc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(e),this.density=t}clone(){return new gc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class ny extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qt,this.environmentIntensity=1,this.environmentRotation=new Qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class iy{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ya,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Lt=new N;class Hr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=dn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Hr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Xu extends Ei{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Vi;const Ms=new N,Gi=new N,Hi=new N,Wi=new ze,Ss=new ze,$u=new it,Er=new N,ws=new N,br=new N,nh=new ze,Xo=new ze,ih=new ze;class sy extends yt{constructor(e=new Xu){if(super(),this.isSprite=!0,this.type="Sprite",Vi===void 0){Vi=new Mt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new iy(t,5);Vi.setIndex([0,1,2,0,2,3]),Vi.setAttribute("position",new Hr(n,3,0,!1)),Vi.setAttribute("uv",new Hr(n,2,3,!1))}this.geometry=Vi,this.material=e,this.center=new ze(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),$u.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Hi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Hi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Tr(Er.set(-.5,-.5,0),Hi,o,Gi,s,r),Tr(ws.set(.5,-.5,0),Hi,o,Gi,s,r),Tr(br.set(.5,.5,0),Hi,o,Gi,s,r),nh.set(0,0),Xo.set(1,0),ih.set(1,1);let a=e.ray.intersectTriangle(Er,ws,br,!1,Ms);if(a===null&&(Tr(ws.set(-.5,.5,0),Hi,o,Gi,s,r),Xo.set(0,1),a=e.ray.intersectTriangle(Er,br,ws,!1,Ms),a===null))return;const c=e.ray.origin.distanceTo(Ms);c<e.near||c>e.far||t.push({distance:c,point:Ms.clone(),uv:Kt.getInterpolation(Ms,Er,ws,br,nh,Xo,ih,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Tr(i,e,t,n,s,r){Wi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ss.x=r*Wi.x-s*Wi.y,Ss.y=s*Wi.x+r*Wi.y):Ss.copy(Wi),i.copy(e),i.x+=Ss.x,i.y+=Ss.y,i.applyMatrix4($u)}class Xs extends Ei{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sh=new it,Za=new Lu,Ar=new ls,Rr=new N;class Jr extends yt{constructor(e=new Mt,t=new Xs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ar.copy(n.boundingSphere),Ar.applyMatrix4(s),Ar.radius+=r,e.ray.intersectsSphere(Ar)===!1)return;sh.copy(s).invert(),Za.copy(e.ray).applyMatrix4(sh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const p=Math.max(0,o.start),g=Math.min(l.count,o.start+o.count);for(let y=p,_=g;y<_;y++){const f=l.getX(y);Rr.fromBufferAttribute(u,f),rh(Rr,f,c,s,e,t,this)}}else{const p=Math.max(0,o.start),g=Math.min(u.count,o.start+o.count);for(let y=p,_=g;y<_;y++)Rr.fromBufferAttribute(u,y),rh(Rr,y,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function rh(i,e,t,n,s,r,o){const a=Za.distanceSqToPoint(i);if(a<t){const c=new N;Za.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Qr extends Ft{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qt extends Mt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],p=[],g=[];let y=0;const _=[],f=n/2;let d=0;m(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(h),this.setAttribute("position",new mt(u,3)),this.setAttribute("normal",new mt(p,3)),this.setAttribute("uv",new mt(g,2));function m(){const x=new N,T=new N;let E=0;const b=(t-e)/n;for(let R=0;R<=r;R++){const w=[],M=R/r,L=M*(t-e)+e;for(let O=0;O<=s;O++){const S=O/s,P=S*c+a,U=Math.sin(P),I=Math.cos(P);T.x=L*U,T.y=-M*n+f,T.z=L*I,u.push(T.x,T.y,T.z),x.set(U,b,I).normalize(),p.push(x.x,x.y,x.z),g.push(S,1-M),w.push(y++)}_.push(w)}for(let R=0;R<s;R++)for(let w=0;w<r;w++){const M=_[w][R],L=_[w+1][R],O=_[w+1][R+1],S=_[w][R+1];(e>0||w!==0)&&(h.push(M,L,S),E+=3),(t>0||w!==r-1)&&(h.push(L,O,S),E+=3)}l.addGroup(d,E,0),d+=E}function v(x){const T=y,E=new ze,b=new N;let R=0;const w=x===!0?e:t,M=x===!0?1:-1;for(let O=1;O<=s;O++)u.push(0,f*M,0),p.push(0,M,0),g.push(.5,.5),y++;const L=y;for(let O=0;O<=s;O++){const P=O/s*c+a,U=Math.cos(P),I=Math.sin(P);b.x=w*I,b.y=f*M,b.z=w*U,u.push(b.x,b.y,b.z),p.push(0,M,0),E.x=U*.5+.5,E.y=I*.5*M+.5,g.push(E.x,E.y),y++}for(let O=0;O<s;O++){const S=T+O,P=L+O;x===!0?h.push(P,P+1,S):h.push(P+1,P,S),R+=3}l.addGroup(d,R,x===!0?1:2),d+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yn extends qt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Yn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class eo extends Mt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new mt(r,3)),this.setAttribute("normal",new mt(r.slice(),3)),this.setAttribute("uv",new mt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(m){const v=new N,x=new N,T=new N;for(let E=0;E<t.length;E+=3)g(t[E+0],v),g(t[E+1],x),g(t[E+2],T),c(v,x,T,m)}function c(m,v,x,T){const E=T+1,b=[];for(let R=0;R<=E;R++){b[R]=[];const w=m.clone().lerp(x,R/E),M=v.clone().lerp(x,R/E),L=E-R;for(let O=0;O<=L;O++)O===0&&R===E?b[R][O]=w:b[R][O]=w.clone().lerp(M,O/L)}for(let R=0;R<E;R++)for(let w=0;w<2*(E-R)-1;w++){const M=Math.floor(w/2);w%2===0?(p(b[R][M+1]),p(b[R+1][M]),p(b[R][M])):(p(b[R][M+1]),p(b[R+1][M+1]),p(b[R+1][M]))}}function l(m){const v=new N;for(let x=0;x<r.length;x+=3)v.x=r[x+0],v.y=r[x+1],v.z=r[x+2],v.normalize().multiplyScalar(m),r[x+0]=v.x,r[x+1]=v.y,r[x+2]=v.z}function h(){const m=new N;for(let v=0;v<r.length;v+=3){m.x=r[v+0],m.y=r[v+1],m.z=r[v+2];const x=f(m)/2/Math.PI+.5,T=d(m)/Math.PI+.5;o.push(x,1-T)}y(),u()}function u(){for(let m=0;m<o.length;m+=6){const v=o[m+0],x=o[m+2],T=o[m+4],E=Math.max(v,x,T),b=Math.min(v,x,T);E>.9&&b<.1&&(v<.2&&(o[m+0]+=1),x<.2&&(o[m+2]+=1),T<.2&&(o[m+4]+=1))}}function p(m){r.push(m.x,m.y,m.z)}function g(m,v){const x=m*3;v.x=e[x+0],v.y=e[x+1],v.z=e[x+2]}function y(){const m=new N,v=new N,x=new N,T=new N,E=new ze,b=new ze,R=new ze;for(let w=0,M=0;w<r.length;w+=9,M+=6){m.set(r[w+0],r[w+1],r[w+2]),v.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),E.set(o[M+0],o[M+1]),b.set(o[M+2],o[M+3]),R.set(o[M+4],o[M+5]),T.copy(m).add(v).add(x).divideScalar(3);const L=f(T);_(E,M+0,m,L),_(b,M+2,v,L),_(R,M+4,x,L)}}function _(m,v,x,T){T<0&&m.x===1&&(o[v]=m.x-1),x.x===0&&x.z===0&&(o[v]=T/2/Math.PI+.5)}function f(m){return Math.atan2(m.z,-m.x)}function d(m){return Math.atan2(-m.y,Math.sqrt(m.x*m.x+m.z*m.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new eo(e.vertices,e.indices,e.radius,e.details)}}class $s extends eo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $s(e.radius,e.detail)}}class os extends eo{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new os(e.radius,e.detail)}}class vc extends Mt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const p=(t-e)/s,g=new N,y=new ze;for(let _=0;_<=s;_++){for(let f=0;f<=n;f++){const d=r+f/n*o;g.x=u*Math.cos(d),g.y=u*Math.sin(d),c.push(g.x,g.y,g.z),l.push(0,0,1),y.x=(g.x/t+1)/2,y.y=(g.y/t+1)/2,h.push(y.x,y.y)}u+=p}for(let _=0;_<s;_++){const f=_*(n+1);for(let d=0;d<n;d++){const m=d+f,v=m,x=m+n+1,T=m+n+2,E=m+1;a.push(v,x,E),a.push(x,T,E)}}this.setIndex(a),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Jn extends Mt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new N,p=new N,g=[],y=[],_=[],f=[];for(let d=0;d<=n;d++){const m=[],v=d/n;let x=0;d===0&&o===0?x=.5/t:d===n&&c===Math.PI&&(x=-.5/t);for(let T=0;T<=t;T++){const E=T/t;u.x=-e*Math.cos(s+E*r)*Math.sin(o+v*a),u.y=e*Math.cos(o+v*a),u.z=e*Math.sin(s+E*r)*Math.sin(o+v*a),y.push(u.x,u.y,u.z),p.copy(u).normalize(),_.push(p.x,p.y,p.z),f.push(E+x,1-v),m.push(l++)}h.push(m)}for(let d=0;d<n;d++)for(let m=0;m<t;m++){const v=h[d][m+1],x=h[d][m],T=h[d+1][m],E=h[d+1][m+1];(d!==0||o>0)&&g.push(v,x,E),(d!==n-1||c<Math.PI)&&g.push(x,T,E)}this.setIndex(g),this.setAttribute("position",new mt(y,3)),this.setAttribute("normal",new mt(_,3)),this.setAttribute("uv",new mt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class xi extends Mt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new N,u=new N,p=new N;for(let g=0;g<=n;g++)for(let y=0;y<=s;y++){const _=y/s*r,f=g/n*Math.PI*2;u.x=(e+t*Math.cos(f))*Math.cos(_),u.y=(e+t*Math.cos(f))*Math.sin(_),u.z=t*Math.sin(f),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),p.subVectors(u,h).normalize(),c.push(p.x,p.y,p.z),l.push(y/s),l.push(g/n)}for(let g=1;g<=n;g++)for(let y=1;y<=s;y++){const _=(s+1)*g+y-1,f=(s+1)*(g-1)+y-1,d=(s+1)*(g-1)+y,m=(s+1)*g+y;o.push(_,f,m),o.push(f,d,m)}this.setIndex(o),this.setAttribute("position",new mt(a,3)),this.setAttribute("normal",new mt(c,3)),this.setAttribute("uv",new mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ut extends Ei{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Tu,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class to extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ry extends to{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const $o=new it,oh=new N,ah=new N;class Yu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pc,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;oh.setFromMatrixPosition(e.matrixWorld),t.position.copy(oh),ah.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ah),t.updateMatrixWorld(),$o.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix($o),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($o)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ch=new it,Es=new N,Yo=new N;class oy extends Yu{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Es.setFromMatrixPosition(e.matrixWorld),n.position.copy(Es),Yo.copy(n.position),Yo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(Yo),n.updateMatrixWorld(),s.makeTranslation(-Es.x,-Es.y,-Es.z),ch.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ch)}}class jo extends to{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new oy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class ay extends Yu{constructor(){super(new zu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class lh extends to{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new ay}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class cy extends to{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ac}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ac);class ly extends we{constructor(e,t,n=!1,s=!1,r=1e4){const o=new Mt;super(o,t),this.isMarchingCubes=!0;const a=this,c=new Float32Array(12*3),l=new Float32Array(12*3),h=new Float32Array(12*3);this.enableUvs=n,this.enableColors=s,this.init=function(m){this.resolution=m,this.isolation=80,this.size=m,this.size2=this.size*this.size,this.size3=this.size2*this.size,this.halfsize=this.size/2,this.delta=2/this.size,this.yd=this.size,this.zd=this.size2,this.field=new Float32Array(this.size3),this.normal_cache=new Float32Array(this.size3*3),this.palette=new Float32Array(this.size3*3),this.count=0;const v=r*3;this.positionArray=new Float32Array(v*3);const x=new ft(this.positionArray,3);x.setUsage(ir),o.setAttribute("position",x),this.normalArray=new Float32Array(v*3);const T=new ft(this.normalArray,3);if(T.setUsage(ir),o.setAttribute("normal",T),this.enableUvs){this.uvArray=new Float32Array(v*2);const E=new ft(this.uvArray,2);E.setUsage(ir),o.setAttribute("uv",E)}if(this.enableColors){this.colorArray=new Float32Array(v*3);const E=new ft(this.colorArray,3);E.setUsage(ir),o.setAttribute("color",E)}o.boundingSphere=new ls(new N,1)};function u(m,v,x){return m+(v-m)*x}function p(m,v,x,T,E,b,R,w,M,L){const O=(x-R)/(w-R),S=a.normal_cache;c[v+0]=T+O*a.delta,c[v+1]=E,c[v+2]=b,l[v+0]=u(S[m+0],S[m+3],O),l[v+1]=u(S[m+1],S[m+4],O),l[v+2]=u(S[m+2],S[m+5],O),h[v+0]=u(a.palette[M*3+0],a.palette[L*3+0],O),h[v+1]=u(a.palette[M*3+1],a.palette[L*3+1],O),h[v+2]=u(a.palette[M*3+2],a.palette[L*3+2],O)}function g(m,v,x,T,E,b,R,w,M,L){const O=(x-R)/(w-R),S=a.normal_cache;c[v+0]=T,c[v+1]=E+O*a.delta,c[v+2]=b;const P=m+a.yd*3;l[v+0]=u(S[m+0],S[P+0],O),l[v+1]=u(S[m+1],S[P+1],O),l[v+2]=u(S[m+2],S[P+2],O),h[v+0]=u(a.palette[M*3+0],a.palette[L*3+0],O),h[v+1]=u(a.palette[M*3+1],a.palette[L*3+1],O),h[v+2]=u(a.palette[M*3+2],a.palette[L*3+2],O)}function y(m,v,x,T,E,b,R,w,M,L){const O=(x-R)/(w-R),S=a.normal_cache;c[v+0]=T,c[v+1]=E,c[v+2]=b+O*a.delta;const P=m+a.zd*3;l[v+0]=u(S[m+0],S[P+0],O),l[v+1]=u(S[m+1],S[P+1],O),l[v+2]=u(S[m+2],S[P+2],O),h[v+0]=u(a.palette[M*3+0],a.palette[L*3+0],O),h[v+1]=u(a.palette[M*3+1],a.palette[L*3+1],O),h[v+2]=u(a.palette[M*3+2],a.palette[L*3+2],O)}function _(m){const v=m*3;a.normal_cache[v]===0&&(a.normal_cache[v+0]=a.field[m-1]-a.field[m+1],a.normal_cache[v+1]=a.field[m-a.yd]-a.field[m+a.yd],a.normal_cache[v+2]=a.field[m-a.zd]-a.field[m+a.zd])}function f(m,v,x,T,E){const b=T+1,R=T+a.yd,w=T+a.zd,M=b+a.yd,L=b+a.zd,O=T+a.yd+a.zd,S=b+a.yd+a.zd;let P=0;const U=a.field[T],I=a.field[b],V=a.field[R],k=a.field[M],F=a.field[w],B=a.field[L],j=a.field[O],se=a.field[S];U<E&&(P|=1),I<E&&(P|=2),V<E&&(P|=8),k<E&&(P|=4),F<E&&(P|=16),B<E&&(P|=32),j<E&&(P|=128),se<E&&(P|=64);const le=hy[P];if(le===0)return 0;const H=a.delta,ee=m+H,he=v+H,te=x+H;le&1&&(_(T),_(b),p(T*3,0,E,m,v,x,U,I,T,b)),le&2&&(_(b),_(M),g(b*3,3,E,ee,v,x,I,k,b,M)),le&4&&(_(R),_(M),p(R*3,6,E,m,he,x,V,k,R,M)),le&8&&(_(T),_(R),g(T*3,9,E,m,v,x,U,V,T,R)),le&16&&(_(w),_(L),p(w*3,12,E,m,v,te,F,B,w,L)),le&32&&(_(L),_(S),g(L*3,15,E,ee,v,te,B,se,L,S)),le&64&&(_(O),_(S),p(O*3,18,E,m,he,te,j,se,O,S)),le&128&&(_(w),_(O),g(w*3,21,E,m,v,te,F,j,w,O)),le&256&&(_(T),_(w),y(T*3,24,E,m,v,x,U,F,T,w)),le&512&&(_(b),_(L),y(b*3,27,E,ee,v,x,I,B,b,L)),le&1024&&(_(M),_(S),y(M*3,30,E,ee,he,x,k,se,M,S)),le&2048&&(_(R),_(O),y(R*3,33,E,m,he,x,V,j,R,O)),P<<=4;let Me,Ee,Te,X=0,Q=0;for(;Cr[P+Q]!=-1;)Me=P+Q,Ee=Me+1,Te=Me+2,d(c,l,h,3*Cr[Me],3*Cr[Ee],3*Cr[Te]),Q+=3,X++;return X}function d(m,v,x,T,E,b){const R=a.count*3;if(a.positionArray[R+0]=m[T],a.positionArray[R+1]=m[T+1],a.positionArray[R+2]=m[T+2],a.positionArray[R+3]=m[E],a.positionArray[R+4]=m[E+1],a.positionArray[R+5]=m[E+2],a.positionArray[R+6]=m[b],a.positionArray[R+7]=m[b+1],a.positionArray[R+8]=m[b+2],a.material.flatShading===!0){const w=(v[T+0]+v[E+0]+v[b+0])/3,M=(v[T+1]+v[E+1]+v[b+1])/3,L=(v[T+2]+v[E+2]+v[b+2])/3;a.normalArray[R+0]=w,a.normalArray[R+1]=M,a.normalArray[R+2]=L,a.normalArray[R+3]=w,a.normalArray[R+4]=M,a.normalArray[R+5]=L,a.normalArray[R+6]=w,a.normalArray[R+7]=M,a.normalArray[R+8]=L}else a.normalArray[R+0]=v[T+0],a.normalArray[R+1]=v[T+1],a.normalArray[R+2]=v[T+2],a.normalArray[R+3]=v[E+0],a.normalArray[R+4]=v[E+1],a.normalArray[R+5]=v[E+2],a.normalArray[R+6]=v[b+0],a.normalArray[R+7]=v[b+1],a.normalArray[R+8]=v[b+2];if(a.enableUvs){const w=a.count*2;a.uvArray[w+0]=m[T+0],a.uvArray[w+1]=m[T+2],a.uvArray[w+2]=m[E+0],a.uvArray[w+3]=m[E+2],a.uvArray[w+4]=m[b+0],a.uvArray[w+5]=m[b+2]}a.enableColors&&(a.colorArray[R+0]=x[T+0],a.colorArray[R+1]=x[T+1],a.colorArray[R+2]=x[T+2],a.colorArray[R+3]=x[E+0],a.colorArray[R+4]=x[E+1],a.colorArray[R+5]=x[E+2],a.colorArray[R+6]=x[b+0],a.colorArray[R+7]=x[b+1],a.colorArray[R+8]=x[b+2]),a.count+=3}this.addBall=function(m,v,x,T,E,b){const R=Math.sign(T);T=Math.abs(T);const w=b!=null;let M=new qe(m,v,x);if(w)try{M=b instanceof qe?b:Array.isArray(b)?new qe(Math.min(Math.abs(b[0]),1),Math.min(Math.abs(b[1]),1),Math.min(Math.abs(b[2]),1)):new qe(b)}catch{M=new qe(m,v,x)}const L=this.size*Math.sqrt(T/E),O=x*this.size,S=v*this.size,P=m*this.size;let U=Math.floor(O-L);U<1&&(U=1);let I=Math.floor(O+L);I>this.size-1&&(I=this.size-1);let V=Math.floor(S-L);V<1&&(V=1);let k=Math.floor(S+L);k>this.size-1&&(k=this.size-1);let F=Math.floor(P-L);F<1&&(F=1);let B=Math.floor(P+L);B>this.size-1&&(B=this.size-1);let j,se,le,H,ee,he,te,Me,Ee,Te,X;for(le=U;le<I;le++)for(ee=this.size2*le,Me=le/this.size-x,Ee=Me*Me,se=V;se<k;se++)for(H=ee+this.size*se,te=se/this.size-v,Te=te*te,j=F;j<B;j++)if(he=j/this.size-m,X=T/(1e-6+he*he+Te+Ee)-E,X>0){this.field[H+j]+=X*R;const Q=Math.sqrt((j-P)*(j-P)+(se-S)*(se-S)+(le-O)*(le-O))/L,de=1-Q*Q*Q*(Q*(Q*6-15)+10);this.palette[(H+j)*3+0]+=M.r*de,this.palette[(H+j)*3+1]+=M.g*de,this.palette[(H+j)*3+2]+=M.b*de}},this.addPlaneX=function(m,v){const x=this.size,T=this.yd,E=this.zd,b=this.field;let R,w,M,L,O,S,P,U=x*Math.sqrt(m/v);for(U>x&&(U=x),R=0;R<U;R++)if(S=R/x,L=S*S,O=m/(1e-4+L)-v,O>0)for(w=0;w<x;w++)for(P=R+w*T,M=0;M<x;M++)b[E*M+P]+=O},this.addPlaneY=function(m,v){const x=this.size,T=this.yd,E=this.zd,b=this.field;let R,w,M,L,O,S,P,U,I=x*Math.sqrt(m/v);for(I>x&&(I=x),w=0;w<I;w++)if(S=w/x,L=S*S,O=m/(1e-4+L)-v,O>0)for(P=w*T,R=0;R<x;R++)for(U=P+R,M=0;M<x;M++)b[E*M+U]+=O},this.addPlaneZ=function(m,v){const x=this.size,T=this.yd,E=this.zd,b=this.field;let R,w,M,L,O,S,P,U,I=x*Math.sqrt(m/v);for(I>x&&(I=x),M=0;M<I;M++)if(S=M/x,L=S*S,O=m/(1e-4+L)-v,O>0)for(P=E*M,w=0;w<x;w++)for(U=P+w*T,R=0;R<x;R++)b[U+R]+=O},this.setCell=function(m,v,x,T){const E=this.size2*x+this.size*v+m;this.field[E]=T},this.getCell=function(m,v,x){const T=this.size2*x+this.size*v+m;return this.field[T]},this.blur=function(m=1){const v=this.field,x=v.slice(),T=this.size,E=this.size2;for(let b=0;b<T;b++)for(let R=0;R<T;R++)for(let w=0;w<T;w++){const M=E*w+T*R+b;let L=x[M],O=1;for(let S=-1;S<=1;S+=2){const P=S+b;if(!(P<0||P>=T))for(let U=-1;U<=1;U+=2){const I=U+R;if(!(I<0||I>=T))for(let V=-1;V<=1;V+=2){const k=V+w;if(k<0||k>=T)continue;const F=E*k+T*I+P,B=x[F];O++,L+=m*(B-L)/O}}}v[M]=L}},this.reset=function(){for(let m=0;m<this.size3;m++)this.normal_cache[m*3]=0,this.field[m]=0,this.palette[m*3]=this.palette[m*3+1]=this.palette[m*3+2]=0},this.update=function(){this.count=0;const m=this.size-2;for(let v=1;v<m;v++){const x=this.size2*v,T=(v-this.halfsize)/this.halfsize;for(let E=1;E<m;E++){const b=x+this.size*E,R=(E-this.halfsize)/this.halfsize;for(let w=1;w<m;w++){const M=(w-this.halfsize)/this.halfsize,L=b+w;f(M,R,T,L,this.isolation)}}}this.geometry.setDrawRange(0,this.count),o.getAttribute("position").needsUpdate=!0,o.getAttribute("normal").needsUpdate=!0,this.enableUvs&&(o.getAttribute("uv").needsUpdate=!0),this.enableColors&&(o.getAttribute("color").needsUpdate=!0),this.count/3>r&&console.warn("THREE.MarchingCubes: Geometry buffers too small for rendering. Please create an instance with a higher poly count.")},this.init(e)}}const hy=new Int32Array([0,265,515,778,1030,1295,1541,1804,2060,2309,2575,2822,3082,3331,3593,3840,400,153,915,666,1430,1183,1941,1692,2460,2197,2975,2710,3482,3219,3993,3728,560,825,51,314,1590,1855,1077,1340,2620,2869,2111,2358,3642,3891,3129,3376,928,681,419,170,1958,1711,1445,1196,2988,2725,2479,2214,4010,3747,3497,3232,1120,1385,1635,1898,102,367,613,876,3180,3429,3695,3942,2154,2403,2665,2912,1520,1273,2035,1786,502,255,1013,764,3580,3317,4095,3830,2554,2291,3065,2800,1616,1881,1107,1370,598,863,85,348,3676,3925,3167,3414,2650,2899,2137,2384,1984,1737,1475,1226,966,719,453,204,4044,3781,3535,3270,3018,2755,2505,2240,2240,2505,2755,3018,3270,3535,3781,4044,204,453,719,966,1226,1475,1737,1984,2384,2137,2899,2650,3414,3167,3925,3676,348,85,863,598,1370,1107,1881,1616,2800,3065,2291,2554,3830,4095,3317,3580,764,1013,255,502,1786,2035,1273,1520,2912,2665,2403,2154,3942,3695,3429,3180,876,613,367,102,1898,1635,1385,1120,3232,3497,3747,4010,2214,2479,2725,2988,1196,1445,1711,1958,170,419,681,928,3376,3129,3891,3642,2358,2111,2869,2620,1340,1077,1855,1590,314,51,825,560,3728,3993,3219,3482,2710,2975,2197,2460,1692,1941,1183,1430,666,915,153,400,3840,3593,3331,3082,2822,2575,2309,2060,1804,1541,1295,1030,778,515,265,0]),Cr=new Int32Array([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,9,8,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,2,10,0,2,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,8,3,2,10,8,10,9,8,-1,-1,-1,-1,-1,-1,-1,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,8,11,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,11,2,1,9,11,9,8,11,-1,-1,-1,-1,-1,-1,-1,3,10,1,11,10,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,10,1,0,8,10,8,11,10,-1,-1,-1,-1,-1,-1,-1,3,9,0,3,11,9,11,10,9,-1,-1,-1,-1,-1,-1,-1,9,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,7,3,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,1,9,4,7,1,7,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,8,4,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,4,7,3,0,4,1,2,10,-1,-1,-1,-1,-1,-1,-1,9,2,10,9,0,2,8,4,7,-1,-1,-1,-1,-1,-1,-1,2,10,9,2,9,7,2,7,3,7,9,4,-1,-1,-1,-1,8,4,7,3,11,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,4,7,11,2,4,2,0,4,-1,-1,-1,-1,-1,-1,-1,9,0,1,8,4,7,2,3,11,-1,-1,-1,-1,-1,-1,-1,4,7,11,9,4,11,9,11,2,9,2,1,-1,-1,-1,-1,3,10,1,3,11,10,7,8,4,-1,-1,-1,-1,-1,-1,-1,1,11,10,1,4,11,1,0,4,7,11,4,-1,-1,-1,-1,4,7,8,9,0,11,9,11,10,11,0,3,-1,-1,-1,-1,4,7,11,4,11,9,9,11,10,-1,-1,-1,-1,-1,-1,-1,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,5,4,1,5,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,5,4,8,3,5,3,1,5,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,10,4,9,5,-1,-1,-1,-1,-1,-1,-1,5,2,10,5,4,2,4,0,2,-1,-1,-1,-1,-1,-1,-1,2,10,5,3,2,5,3,5,4,3,4,8,-1,-1,-1,-1,9,5,4,2,3,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,11,2,0,8,11,4,9,5,-1,-1,-1,-1,-1,-1,-1,0,5,4,0,1,5,2,3,11,-1,-1,-1,-1,-1,-1,-1,2,1,5,2,5,8,2,8,11,4,8,5,-1,-1,-1,-1,10,3,11,10,1,3,9,5,4,-1,-1,-1,-1,-1,-1,-1,4,9,5,0,8,1,8,10,1,8,11,10,-1,-1,-1,-1,5,4,0,5,0,11,5,11,10,11,0,3,-1,-1,-1,-1,5,4,8,5,8,10,10,8,11,-1,-1,-1,-1,-1,-1,-1,9,7,8,5,7,9,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,3,0,9,5,3,5,7,3,-1,-1,-1,-1,-1,-1,-1,0,7,8,0,1,7,1,5,7,-1,-1,-1,-1,-1,-1,-1,1,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,7,8,9,5,7,10,1,2,-1,-1,-1,-1,-1,-1,-1,10,1,2,9,5,0,5,3,0,5,7,3,-1,-1,-1,-1,8,0,2,8,2,5,8,5,7,10,5,2,-1,-1,-1,-1,2,10,5,2,5,3,3,5,7,-1,-1,-1,-1,-1,-1,-1,7,9,5,7,8,9,3,11,2,-1,-1,-1,-1,-1,-1,-1,9,5,7,9,7,2,9,2,0,2,7,11,-1,-1,-1,-1,2,3,11,0,1,8,1,7,8,1,5,7,-1,-1,-1,-1,11,2,1,11,1,7,7,1,5,-1,-1,-1,-1,-1,-1,-1,9,5,8,8,5,7,10,1,3,10,3,11,-1,-1,-1,-1,5,7,0,5,0,9,7,11,0,1,0,10,11,10,0,-1,11,10,0,11,0,3,10,5,0,8,0,7,5,7,0,-1,11,10,5,7,11,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,0,1,5,10,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,8,3,1,9,8,5,10,6,-1,-1,-1,-1,-1,-1,-1,1,6,5,2,6,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,6,5,1,2,6,3,0,8,-1,-1,-1,-1,-1,-1,-1,9,6,5,9,0,6,0,2,6,-1,-1,-1,-1,-1,-1,-1,5,9,8,5,8,2,5,2,6,3,2,8,-1,-1,-1,-1,2,3,11,10,6,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,0,8,11,2,0,10,6,5,-1,-1,-1,-1,-1,-1,-1,0,1,9,2,3,11,5,10,6,-1,-1,-1,-1,-1,-1,-1,5,10,6,1,9,2,9,11,2,9,8,11,-1,-1,-1,-1,6,3,11,6,5,3,5,1,3,-1,-1,-1,-1,-1,-1,-1,0,8,11,0,11,5,0,5,1,5,11,6,-1,-1,-1,-1,3,11,6,0,3,6,0,6,5,0,5,9,-1,-1,-1,-1,6,5,9,6,9,11,11,9,8,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,3,0,4,7,3,6,5,10,-1,-1,-1,-1,-1,-1,-1,1,9,0,5,10,6,8,4,7,-1,-1,-1,-1,-1,-1,-1,10,6,5,1,9,7,1,7,3,7,9,4,-1,-1,-1,-1,6,1,2,6,5,1,4,7,8,-1,-1,-1,-1,-1,-1,-1,1,2,5,5,2,6,3,0,4,3,4,7,-1,-1,-1,-1,8,4,7,9,0,5,0,6,5,0,2,6,-1,-1,-1,-1,7,3,9,7,9,4,3,2,9,5,9,6,2,6,9,-1,3,11,2,7,8,4,10,6,5,-1,-1,-1,-1,-1,-1,-1,5,10,6,4,7,2,4,2,0,2,7,11,-1,-1,-1,-1,0,1,9,4,7,8,2,3,11,5,10,6,-1,-1,-1,-1,9,2,1,9,11,2,9,4,11,7,11,4,5,10,6,-1,8,4,7,3,11,5,3,5,1,5,11,6,-1,-1,-1,-1,5,1,11,5,11,6,1,0,11,7,11,4,0,4,11,-1,0,5,9,0,6,5,0,3,6,11,6,3,8,4,7,-1,6,5,9,6,9,11,4,7,9,7,11,9,-1,-1,-1,-1,10,4,9,6,4,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,10,6,4,9,10,0,8,3,-1,-1,-1,-1,-1,-1,-1,10,0,1,10,6,0,6,4,0,-1,-1,-1,-1,-1,-1,-1,8,3,1,8,1,6,8,6,4,6,1,10,-1,-1,-1,-1,1,4,9,1,2,4,2,6,4,-1,-1,-1,-1,-1,-1,-1,3,0,8,1,2,9,2,4,9,2,6,4,-1,-1,-1,-1,0,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,3,2,8,2,4,4,2,6,-1,-1,-1,-1,-1,-1,-1,10,4,9,10,6,4,11,2,3,-1,-1,-1,-1,-1,-1,-1,0,8,2,2,8,11,4,9,10,4,10,6,-1,-1,-1,-1,3,11,2,0,1,6,0,6,4,6,1,10,-1,-1,-1,-1,6,4,1,6,1,10,4,8,1,2,1,11,8,11,1,-1,9,6,4,9,3,6,9,1,3,11,6,3,-1,-1,-1,-1,8,11,1,8,1,0,11,6,1,9,1,4,6,4,1,-1,3,11,6,3,6,0,0,6,4,-1,-1,-1,-1,-1,-1,-1,6,4,8,11,6,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,10,6,7,8,10,8,9,10,-1,-1,-1,-1,-1,-1,-1,0,7,3,0,10,7,0,9,10,6,7,10,-1,-1,-1,-1,10,6,7,1,10,7,1,7,8,1,8,0,-1,-1,-1,-1,10,6,7,10,7,1,1,7,3,-1,-1,-1,-1,-1,-1,-1,1,2,6,1,6,8,1,8,9,8,6,7,-1,-1,-1,-1,2,6,9,2,9,1,6,7,9,0,9,3,7,3,9,-1,7,8,0,7,0,6,6,0,2,-1,-1,-1,-1,-1,-1,-1,7,3,2,6,7,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,11,10,6,8,10,8,9,8,6,7,-1,-1,-1,-1,2,0,7,2,7,11,0,9,7,6,7,10,9,10,7,-1,1,8,0,1,7,8,1,10,7,6,7,10,2,3,11,-1,11,2,1,11,1,7,10,6,1,6,7,1,-1,-1,-1,-1,8,9,6,8,6,7,9,1,6,11,6,3,1,3,6,-1,0,9,1,11,6,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,8,0,7,0,6,3,11,0,11,6,0,-1,-1,-1,-1,7,11,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,8,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,9,11,7,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,1,9,8,3,1,11,7,6,-1,-1,-1,-1,-1,-1,-1,10,1,2,6,11,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,8,6,11,7,-1,-1,-1,-1,-1,-1,-1,2,9,0,2,10,9,6,11,7,-1,-1,-1,-1,-1,-1,-1,6,11,7,2,10,3,10,8,3,10,9,8,-1,-1,-1,-1,7,2,3,6,2,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,7,0,8,7,6,0,6,2,0,-1,-1,-1,-1,-1,-1,-1,2,7,6,2,3,7,0,1,9,-1,-1,-1,-1,-1,-1,-1,1,6,2,1,8,6,1,9,8,8,7,6,-1,-1,-1,-1,10,7,6,10,1,7,1,3,7,-1,-1,-1,-1,-1,-1,-1,10,7,6,1,7,10,1,8,7,1,0,8,-1,-1,-1,-1,0,3,7,0,7,10,0,10,9,6,10,7,-1,-1,-1,-1,7,6,10,7,10,8,8,10,9,-1,-1,-1,-1,-1,-1,-1,6,8,4,11,8,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,6,11,3,0,6,0,4,6,-1,-1,-1,-1,-1,-1,-1,8,6,11,8,4,6,9,0,1,-1,-1,-1,-1,-1,-1,-1,9,4,6,9,6,3,9,3,1,11,3,6,-1,-1,-1,-1,6,8,4,6,11,8,2,10,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,3,0,11,0,6,11,0,4,6,-1,-1,-1,-1,4,11,8,4,6,11,0,2,9,2,10,9,-1,-1,-1,-1,10,9,3,10,3,2,9,4,3,11,3,6,4,6,3,-1,8,2,3,8,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,0,4,2,4,6,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,9,0,2,3,4,2,4,6,4,3,8,-1,-1,-1,-1,1,9,4,1,4,2,2,4,6,-1,-1,-1,-1,-1,-1,-1,8,1,3,8,6,1,8,4,6,6,10,1,-1,-1,-1,-1,10,1,0,10,0,6,6,0,4,-1,-1,-1,-1,-1,-1,-1,4,6,3,4,3,8,6,10,3,0,3,9,10,9,3,-1,10,9,4,6,10,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,5,7,6,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,5,11,7,6,-1,-1,-1,-1,-1,-1,-1,5,0,1,5,4,0,7,6,11,-1,-1,-1,-1,-1,-1,-1,11,7,6,8,3,4,3,5,4,3,1,5,-1,-1,-1,-1,9,5,4,10,1,2,7,6,11,-1,-1,-1,-1,-1,-1,-1,6,11,7,1,2,10,0,8,3,4,9,5,-1,-1,-1,-1,7,6,11,5,4,10,4,2,10,4,0,2,-1,-1,-1,-1,3,4,8,3,5,4,3,2,5,10,5,2,11,7,6,-1,7,2,3,7,6,2,5,4,9,-1,-1,-1,-1,-1,-1,-1,9,5,4,0,8,6,0,6,2,6,8,7,-1,-1,-1,-1,3,6,2,3,7,6,1,5,0,5,4,0,-1,-1,-1,-1,6,2,8,6,8,7,2,1,8,4,8,5,1,5,8,-1,9,5,4,10,1,6,1,7,6,1,3,7,-1,-1,-1,-1,1,6,10,1,7,6,1,0,7,8,7,0,9,5,4,-1,4,0,10,4,10,5,0,3,10,6,10,7,3,7,10,-1,7,6,10,7,10,8,5,4,10,4,8,10,-1,-1,-1,-1,6,9,5,6,11,9,11,8,9,-1,-1,-1,-1,-1,-1,-1,3,6,11,0,6,3,0,5,6,0,9,5,-1,-1,-1,-1,0,11,8,0,5,11,0,1,5,5,6,11,-1,-1,-1,-1,6,11,3,6,3,5,5,3,1,-1,-1,-1,-1,-1,-1,-1,1,2,10,9,5,11,9,11,8,11,5,6,-1,-1,-1,-1,0,11,3,0,6,11,0,9,6,5,6,9,1,2,10,-1,11,8,5,11,5,6,8,0,5,10,5,2,0,2,5,-1,6,11,3,6,3,5,2,10,3,10,5,3,-1,-1,-1,-1,5,8,9,5,2,8,5,6,2,3,8,2,-1,-1,-1,-1,9,5,6,9,6,0,0,6,2,-1,-1,-1,-1,-1,-1,-1,1,5,8,1,8,0,5,6,8,3,8,2,6,2,8,-1,1,5,6,2,1,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,6,1,6,10,3,8,6,5,6,9,8,9,6,-1,10,1,0,10,0,6,9,5,0,5,6,0,-1,-1,-1,-1,0,3,8,5,6,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,10,5,6,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,7,5,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,11,5,10,11,7,5,8,3,0,-1,-1,-1,-1,-1,-1,-1,5,11,7,5,10,11,1,9,0,-1,-1,-1,-1,-1,-1,-1,10,7,5,10,11,7,9,8,1,8,3,1,-1,-1,-1,-1,11,1,2,11,7,1,7,5,1,-1,-1,-1,-1,-1,-1,-1,0,8,3,1,2,7,1,7,5,7,2,11,-1,-1,-1,-1,9,7,5,9,2,7,9,0,2,2,11,7,-1,-1,-1,-1,7,5,2,7,2,11,5,9,2,3,2,8,9,8,2,-1,2,5,10,2,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,8,2,0,8,5,2,8,7,5,10,2,5,-1,-1,-1,-1,9,0,1,5,10,3,5,3,7,3,10,2,-1,-1,-1,-1,9,8,2,9,2,1,8,7,2,10,2,5,7,5,2,-1,1,3,5,3,7,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,8,7,0,7,1,1,7,5,-1,-1,-1,-1,-1,-1,-1,9,0,3,9,3,5,5,3,7,-1,-1,-1,-1,-1,-1,-1,9,8,7,5,9,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,5,8,4,5,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,5,0,4,5,11,0,5,10,11,11,3,0,-1,-1,-1,-1,0,1,9,8,4,10,8,10,11,10,4,5,-1,-1,-1,-1,10,11,4,10,4,5,11,3,4,9,4,1,3,1,4,-1,2,5,1,2,8,5,2,11,8,4,5,8,-1,-1,-1,-1,0,4,11,0,11,3,4,5,11,2,11,1,5,1,11,-1,0,2,5,0,5,9,2,11,5,4,5,8,11,8,5,-1,9,4,5,2,11,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,5,10,3,5,2,3,4,5,3,8,4,-1,-1,-1,-1,5,10,2,5,2,4,4,2,0,-1,-1,-1,-1,-1,-1,-1,3,10,2,3,5,10,3,8,5,4,5,8,0,1,9,-1,5,10,2,5,2,4,1,9,2,9,4,2,-1,-1,-1,-1,8,4,5,8,5,3,3,5,1,-1,-1,-1,-1,-1,-1,-1,0,4,5,1,0,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,8,4,5,8,5,3,9,0,5,0,3,5,-1,-1,-1,-1,9,4,5,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,11,7,4,9,11,9,10,11,-1,-1,-1,-1,-1,-1,-1,0,8,3,4,9,7,9,11,7,9,10,11,-1,-1,-1,-1,1,10,11,1,11,4,1,4,0,7,4,11,-1,-1,-1,-1,3,1,4,3,4,8,1,10,4,7,4,11,10,11,4,-1,4,11,7,9,11,4,9,2,11,9,1,2,-1,-1,-1,-1,9,7,4,9,11,7,9,1,11,2,11,1,0,8,3,-1,11,7,4,11,4,2,2,4,0,-1,-1,-1,-1,-1,-1,-1,11,7,4,11,4,2,8,3,4,3,2,4,-1,-1,-1,-1,2,9,10,2,7,9,2,3,7,7,4,9,-1,-1,-1,-1,9,10,7,9,7,4,10,2,7,8,7,0,2,0,7,-1,3,7,10,3,10,2,7,4,10,1,10,0,4,0,10,-1,1,10,2,8,7,4,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,7,1,3,-1,-1,-1,-1,-1,-1,-1,4,9,1,4,1,7,0,8,1,8,7,1,-1,-1,-1,-1,4,0,3,7,4,3,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,4,8,7,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,9,10,8,10,11,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,11,9,10,-1,-1,-1,-1,-1,-1,-1,0,1,10,0,10,8,8,10,11,-1,-1,-1,-1,-1,-1,-1,3,1,10,11,3,10,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,2,11,1,11,9,9,11,8,-1,-1,-1,-1,-1,-1,-1,3,0,9,3,9,11,1,2,9,2,11,9,-1,-1,-1,-1,0,2,11,8,0,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,3,2,11,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,10,8,9,-1,-1,-1,-1,-1,-1,-1,9,10,2,0,9,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,2,3,8,2,8,10,0,1,8,1,10,8,-1,-1,-1,-1,1,10,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,1,3,8,9,1,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,9,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,3,8,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]);function hh(i){let e=(typeof i=="number"?i:uy(i||"rockets-default-seed"))>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function uy(i){let e=0;for(let t=0;t<i.length;t++)e=(e<<5)-e+i.charCodeAt(t),e|=0;return e>>>0}function Ko(i,e,t){return Math.max(e,Math.min(t,i))}class dy{constructor(){this.ctx=null,this.masterGain=null,this.compressor=null,this.isMuted=!1,this.isUnlocked=!1,this.engineGain=null,this.engineFilter=null,this.engineOsc1=null,this.engineOsc2=null,this.engineNoiseNode=null,this.currentEngineVol=0,this.brakeGain=null,this.brakeFilter=null,this.brakeNoiseNode=null,this.currentBrakeVol=0,this.noiseBuffer=null,this.init()}init(){if(typeof window>"u")return;const e=window.AudioContext||window.webkitAudioContext;if(e)try{this.ctx=new e,this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.threshold.setValueAtTime(-12,this.ctx.currentTime),this.compressor.knee.setValueAtTime(8,this.ctx.currentTime),this.compressor.ratio.setValueAtTime(4,this.ctx.currentTime),this.compressor.attack.setValueAtTime(.005,this.ctx.currentTime),this.compressor.release.setValueAtTime(.08,this.ctx.currentTime),this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(.85,this.ctx.currentTime),this.compressor.connect(this.masterGain),this.masterGain.connect(this.ctx.destination),this.generateNoiseBuffer(),this.initEngineSynth(),this.initBrakeSynth(),this.setupAutoUnlock()}catch(t){console.warn("AudioContext initialization failed:",t)}}setupAutoUnlock(){if(!this.ctx)return;const e=()=>{this.ctx&&this.ctx.state==="suspended"?this.ctx.resume().then(()=>{this.isUnlocked=!0}).catch(()=>{}):this.isUnlocked=!0,window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e),window.removeEventListener("touchstart",e)};window.addEventListener("pointerdown",e,{passive:!0,once:!0}),window.addEventListener("keydown",e,{passive:!0,once:!0}),window.addEventListener("touchstart",e,{passive:!0,once:!0})}updateListener(e){if(!(!this.ctx||!this.ctx.listener||!e))try{const t=this.ctx.listener,n=this.ctx.currentTime,s=e.position,r=new N(0,0,-1).applyQuaternion(e.quaternion),o=new N(0,1,0).applyQuaternion(e.quaternion);t.positionX?(t.positionX.setValueAtTime(s.x,n),t.positionY.setValueAtTime(s.y,n),t.positionZ.setValueAtTime(s.z,n),t.forwardX.setValueAtTime(r.x,n),t.forwardY.setValueAtTime(r.y,n),t.forwardZ.setValueAtTime(r.z,n),t.upX.setValueAtTime(o.x,n),t.upY.setValueAtTime(o.y,n),t.upZ.setValueAtTime(o.z,n)):t.setPosition&&(t.setPosition(s.x,s.y,s.z),t.setOrientation(r.x,r.y,r.z,o.x,o.y,o.z))}catch{}}createPanner(e){if(!this.ctx||!e)return null;try{const t=this.ctx.createPanner();t.panningModel="HRTF",t.distanceModel="inverse",t.refDistance=35,t.maxDistance=2500,t.rolloffFactor=1.15,t.coneInnerAngle=360;const n=this.ctx.currentTime;return t.positionX?(t.positionX.setValueAtTime(e.x,n),t.positionY.setValueAtTime(e.y,n),t.positionZ.setValueAtTime(e.z,n)):t.setPosition&&t.setPosition(e.x,e.y,e.z),t.connect(this.compressor),t}catch{return null}}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}generateNoiseBuffer(){if(!this.ctx)return;const e=this.ctx.sampleRate*2;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const t=this.noiseBuffer.getChannelData(0);for(let n=0;n<e;n++)t[n]=Math.random()*2-1}initEngineSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.engineOsc1=this.ctx.createOscillator(),this.engineOsc1.type="sawtooth",this.engineOsc1.frequency.setValueAtTime(55,this.ctx.currentTime),this.engineOsc2=this.ctx.createOscillator(),this.engineOsc2.type="triangle",this.engineOsc2.frequency.setValueAtTime(110,this.ctx.currentTime),this.engineNoiseNode=this.ctx.createBufferSource(),this.engineNoiseNode.buffer=this.noiseBuffer,this.engineNoiseNode.loop=!0,this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.setValueAtTime(120,this.ctx.currentTime),this.engineFilter.Q.setValueAtTime(3,this.ctx.currentTime),this.engineGain=this.ctx.createGain(),this.engineGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.engineOsc1.connect(this.engineFilter),this.engineOsc2.connect(this.engineFilter),this.engineNoiseNode.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineGain.connect(this.compressor);try{this.engineOsc1.start(),this.engineOsc2.start(),this.engineNoiseNode.start()}catch{}}}initBrakeSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.brakeNoiseNode=this.ctx.createBufferSource(),this.brakeNoiseNode.buffer=this.noiseBuffer,this.brakeNoiseNode.loop=!0,this.brakeFilter=this.ctx.createBiquadFilter(),this.brakeFilter.type="bandpass",this.brakeFilter.frequency.setValueAtTime(1400,this.ctx.currentTime),this.brakeFilter.Q.setValueAtTime(2.5,this.ctx.currentTime),this.brakeGain=this.ctx.createGain(),this.brakeGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.brakeNoiseNode.connect(this.brakeFilter),this.brakeFilter.connect(this.brakeGain),this.brakeGain.connect(this.compressor);try{this.brakeNoiseNode.start()}catch{}}}updateEngine(e,t,n){if(!this.ctx||!this.engineGain||!this.brakeGain)return;this.resume();const s=e?.38:0,r=e?460:120;this.currentEngineVol+=(s-this.currentEngineVol)*Math.min(1,n*10);const o=this.ctx.currentTime;this.engineGain.gain.setTargetAtTime(Math.max(1e-4,this.currentEngineVol),o,.05),this.engineFilter.frequency.setTargetAtTime(r,o,.08);const a=t?.32:0;this.currentBrakeVol+=(a-this.currentBrakeVol)*Math.min(1,n*12),this.brakeGain.gain.setTargetAtTime(Math.max(1e-4,this.currentBrakeVol),o,.04)}playLockTick(e=0){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="sine";const r=750+e*800;n.frequency.setValueAtTime(r,t),s.gain.setValueAtTime(.18,t),s.gain.exponentialRampToValueAtTime(.001,t+.06),n.connect(s),s.connect(this.compressor),n.start(t),n.stop(t+.07)}playLockChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),s=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(1760,e),t.frequency.setValueAtTime(2200,e+.08),n.type="sine",n.frequency.setValueAtTime(880,e),n.frequency.setValueAtTime(1100,e+.08),s.gain.setValueAtTime(.28,e),s.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(s),n.connect(s),s.connect(this.compressor),t.start(e),t.stop(e+.24),n.start(e),n.stop(e+.24)}playMissileLaunch(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor;if(this.noiseBuffer){const a=this.ctx.createBufferSource();a.buffer=this.noiseBuffer;const c=this.ctx.createBiquadFilter();c.type="bandpass",c.frequency.setValueAtTime(800,n),c.frequency.exponentialRampToValueAtTime(2400,n+.25),c.Q.setValueAtTime(2,n);const l=this.ctx.createGain();l.gain.setValueAtTime(.45,n),l.gain.exponentialRampToValueAtTime(.001,n+.35),a.connect(c),c.connect(l),l.connect(s),a.start(n),a.stop(n+.36)}const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sawtooth",r.frequency.setValueAtTime(220,n),r.frequency.exponentialRampToValueAtTime(980,n+.28),o.gain.setValueAtTime(.35,n),o.gain.exponentialRampToValueAtTime(.001,n+.3),r.connect(o),o.connect(s),r.start(n),r.stop(n+.32)}playLaserShot(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime;if(this._lastLaserAudioTime&&n-this._lastLaserAudioTime<.07)return;this._lastLaserAudioTime=n;const s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type="sawtooth",r.frequency.setValueAtTime(e?1480:1150,n),r.frequency.exponentialRampToValueAtTime(320,n+.09),a.type="bandpass",a.frequency.setValueAtTime(2900,n),a.frequency.exponentialRampToValueAtTime(550,n+.09),a.Q.setValueAtTime(3.2,n);const c=e?.32:.2;o.gain.setValueAtTime(.001,n),o.gain.linearRampToValueAtTime(c,n+.012),o.gain.exponentialRampToValueAtTime(.001,n+.095),r.connect(a),a.connect(o),o.connect(s),r.start(n),r.stop(n+.1)}playDecoyDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(440,e),t.frequency.linearRampToValueAtTime(1100,e+.15),t.frequency.linearRampToValueAtTime(880,e+.35),n.gain.setValueAtTime(.28,e),n.gain.exponentialRampToValueAtTime(.001,e+.4),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.42)}playCannonShot(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type=e?"sawtooth":"sine";const c=e?920:680,l=e?110:90;r.frequency.setValueAtTime(c,n),r.frequency.exponentialRampToValueAtTime(l,n+.08),a.type="lowpass",a.frequency.setValueAtTime(2800,n),a.frequency.exponentialRampToValueAtTime(400,n+.09);const h=e?.36:.22;o.gain.setValueAtTime(h,n),o.gain.exponentialRampToValueAtTime(.001,n+.095),r.connect(a),a.connect(o),o.connect(s),r.start(n),r.stop(n+.1)}playMineDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(60,e+.12),n.gain.setValueAtTime(.35,e),n.gain.exponentialRampToValueAtTime(.001,e+.13),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.14);const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(1250,e+.06),s.frequency.setValueAtTime(1750,e+.14),r.gain.setValueAtTime(1e-4,e),r.gain.setValueAtTime(.22,e+.06),r.gain.setValueAtTime(.25,e+.14),r.gain.exponentialRampToValueAtTime(.001,e+.28),s.connect(r),r.connect(this.compressor),s.start(e+.05),s.stop(e+.3)}playExplosion(e=1,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(140,n),r.frequency.exponentialRampToValueAtTime(28,n+.7*e);const a=Math.min(.7,.45*e);if(o.gain.setValueAtTime(a,n),o.gain.exponentialRampToValueAtTime(.001,n+.75*e),r.connect(o),o.connect(s),r.start(n),r.stop(n+.8*e),this.noiseBuffer){const c=this.ctx.createBufferSource();c.buffer=this.noiseBuffer;const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(900,n),l.frequency.exponentialRampToValueAtTime(80,n+.6*e);const h=this.ctx.createGain();h.gain.setValueAtTime(.5*e,n),h.gain.exponentialRampToValueAtTime(.001,n+.65*e),c.connect(l),l.connect(h),h.connect(s),c.start(n),c.stop(n+.7*e)}}playDamageHit(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(70,e+.16),n.gain.setValueAtTime(.42,e),n.gain.exponentialRampToValueAtTime(.001,e+.18),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.2)}playScoreChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(880,e),t.frequency.setValueAtTime(1320,e+.08),n.gain.setValueAtTime(.25,e),n.gain.exponentialRampToValueAtTime(.001,e+.35),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.36)}playStrafeBurst(){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1600,e),n.Q.setValueAtTime(2,e);const s=this.ctx.createGain();s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(n),n.connect(s),s.connect(this.compressor),t.start(e),t.stop(e+.13)}playEngagementBeacon(e=null){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,n=this.createPanner(e)||this.compressor,s=this.ctx.createOscillator(),r=this.ctx.createGain(),o=this.ctx.createBiquadFilter();s.type="sine",s.frequency.setValueAtTime(1480,t),s.frequency.exponentialRampToValueAtTime(520,t+.45),o.type="bandpass",o.frequency.setValueAtTime(1200,t),o.Q.setValueAtTime(4,t),r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(.38,t+.04),r.gain.exponentialRampToValueAtTime(.001,t+.95),s.connect(o),o.connect(r),r.connect(n),s.start(t),s.stop(t+1)}playMeteorFlyby(e=null){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const t=this.ctx.currentTime,n=this.createPanner(e)||this.compressor,s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(180,t),r.frequency.exponentialRampToValueAtTime(680,t+.35),r.frequency.exponentialRampToValueAtTime(120,t+1.1),r.Q.setValueAtTime(1.8,t);const o=this.ctx.createGain();o.gain.setValueAtTime(.001,t),o.gain.linearRampToValueAtTime(.55,t+.35),o.gain.exponentialRampToValueAtTime(.001,t+1.15),s.connect(r),r.connect(o),o.connect(n),s.start(t),s.stop(t+1.2)}playBoost(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();if(t.type="sine",t.frequency.setValueAtTime(220,e),t.frequency.exponentialRampToValueAtTime(45,e+.28),n.gain.setValueAtTime(.55,e),n.gain.exponentialRampToValueAtTime(.001,e+.3),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.32),this.noiseBuffer){const s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(320,e),r.frequency.exponentialRampToValueAtTime(1400,e+.12),r.frequency.exponentialRampToValueAtTime(250,e+.35),r.Q.setValueAtTime(2.2,e);const o=this.ctx.createGain();o.gain.setValueAtTime(.48,e),o.gain.exponentialRampToValueAtTime(.001,e+.36),s.connect(r),r.connect(o),o.connect(this.compressor),s.start(e),s.stop(e+.38)}}}const ot=new dy;function fy(){if(typeof document>"u")return null;try{const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(!e)return null;const t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255, 255, 255, 1)"),t.addColorStop(.25,"rgba(235, 245, 255, 0.85)"),t.addColorStop(.55,"rgba(160, 205, 255, 0.35)"),t.addColorStop(.85,"rgba(100, 150, 255, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const n=new Qr(i);return n.generateMipmaps=!0,n}catch{return null}}function py(){if(typeof document>"u")return null;try{const i=document.createElement("canvas");i.width=256,i.height=256;const e=i.getContext("2d");if(!e)return null;const t=e.createImageData(256,256),n=t.data;for(let r=0;r<256;r++)for(let o=0;o<256;o++){const a=(r*256+o)*4,c=o/256,l=r/256,h=Math.sin(c*32)*Math.cos(l*32)*.35+Math.sin(c*64+l*48)*.25+Math.sin(c*128-l*96)*.15,u=(Math.random()-.5)*.25,p=Math.floor(Math.min(255,Math.max(0,(h+u+.5)*255)));n[a]=p,n[a+1]=p,n[a+2]=p,n[a+3]=255}e.putImageData(t,0,0);const s=new Qr(i);return s.wrapS=ks,s.wrapT=ks,s.repeat.set(4,4),s}catch{return null}}class Zo{constructor(e,t=42,n={}){this.scene=e,this.mapSeed=t,this.options={voxelQuality:"low",asteroidCount:100,megaRadius:2800,...n},this.voxelQuality=this.options.voxelQuality||"low",this.asteroidCount=this.options.asteroidCount!==void 0?this.options.asteroidCount:100,this.megaRadius=this.options.megaRadius!==void 0?this.options.megaRadius:2800;const s={low:32,medium:48,high:64};this.megaResolution=s[this.voxelQuality]||32,this.asteroids=[],this.asteroidGroup=new Et,this.debrisList=[],this.init()}init(){this.setupLighting(),this.createStarfield(),this.createAsteroidField()}setupLighting(){const e=new ry(5601177,1713203,1.8);this.scene.add(e);const t=new cy(3820380,1.4);this.scene.add(t);const n=new lh(16774890,3.4);n.position.set(3500,2500,3e3),this.scene.add(n);const s=new lh(46335,2);s.position.set(-3e3,-2e3,-3e3),this.scene.add(s);const r=new jo(16772829,3.5,2500);r.position.set(0,120,3200),this.scene.add(r),this.combatFlashLight=new jo(16737792,0,160),this.combatFlashLight.position.set(0,0,0),this.scene.add(this.combatFlashLight),this.meteorLight=new jo(16724736,0,450),this.meteorLight.position.set(0,0,0),this.scene.add(this.meteorLight)}createStarfield(){const t=new Mt,n=new Float32Array(500*3),s=new Float32Array(500*3),r=hh("stars-fixed-celestial");for(let l=0;l<500;l++){const h=l*3,u=r(),p=r(),g=u*2*Math.PI,y=Math.acos(2*p-1),_=7500+r()*1e3;n[h]=_*Math.sin(y)*Math.cos(g),n[h+1]=_*Math.sin(y)*Math.sin(g),n[h+2]=_*Math.cos(y);const f=r();f<.25?(s[h]=.65,s[h+1]=.88,s[h+2]=1):f<.45?(s[h]=1,s[h+1]=.88,s[h+2]=.65):f<.6?(s[h]=.92,s[h+1]=.65,s[h+2]=1):(s[h]=1,s[h+1]=1,s[h+2]=1)}t.setAttribute("position",new ft(n,3)),t.setAttribute("color",new ft(s,3));const o=fy(),a=new Xs({size:2.8,map:o||void 0,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,blending:dt,sizeAttenuation:!1,fog:!1}),c=new Jr(t,a);this.scene.add(c)}createAsteroidField(){const e=hh(this.mapSeed),n=this.asteroidCount+1,s=py(),r=new Ut({color:10180674,roughness:.88,metalness:.16,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Rt}),o=new Ut({color:3685958,roughness:.92,metalness:.1,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Rt}),a=new Ut({color:6187125,roughness:.86,metalness:.14,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Rt}),c=new Ut({color:8293530,roughness:.8,metalness:.26,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Rt}),l=[r,o,a,c];for(let h=0;h<n;h++){let u,p=1/0,g=!1,y=!1;h===0?(u=this.megaRadius,p=1/0,g=!0):(y=h%3===0,y?(u=40+e()*50,p=1/0):(u=15+e()*20,p=20));const _=l[Math.floor(e()*l.length)],f=g?this.megaResolution:y?20:16,d=g?Math.max(3e4,f*f*25):8e3,m=new ly(f,_,!0,!1,d);m.isolation=80;const v=m.halfsize,x=e()*Math.PI*2,T=e()*Math.PI*2,E=e()*Math.PI*2;for(let S=0;S<f;S++){const P=(S-v)/v;for(let U=0;U<f;U++){const I=(U-v)/v;for(let V=0;V<f;V++){const k=(V-v)/v,F=Math.hypot(k,I,P),B=(Math.sin(k*3.2+x)*Math.cos(I*3.2+T)+Math.sin(P*3.8+E)*.5+Math.sin(k*6-P*5)*.25)*(g?14:12),j=Math.max(0,Math.min(150,80+(1-F)*60+B));m.setCell(V,U,S,j)}}}m.update(),m.scale.set(u,u,u);let b=0,R=0,w=0,M=new N(0,0,0),L=new N(0,0,0);if(g)b=0,R=0,w=0;else{let P=!1,U=0;const I=200;for(;!P&&U<I;){U++;const F=3300+e()*2200,B=e()*Math.PI*2;b=Math.cos(B)*F,R=(e()-.5)*450,w=Math.sin(B)*F;let j=!1;for(let se=0;se<this.asteroids.length;se++){const le=this.asteroids[se];if(Math.hypot(b-le.position.x,R-le.position.y,w-le.position.z)<u+le.radius+20){j=!0;break}}j||(P=!0)}const V=Math.atan2(w,b),k=16+e()*14;M.set(-Math.sin(V)*k,(e()-.5)*1.5,Math.cos(V)*k),L.set((e()-.5)*.05,(e()-.5)*.05,(e()-.5)*.05)}m.position.set(b,R,w),m.rotation.set(e()*Math.PI,e()*Math.PI,e()*Math.PI),this.asteroidGroup.add(m);const O=4/3*Math.PI*Math.pow(u,3)*.001;this.asteroids.push({mesh:m,mc:m,radius:u,mass:O,hp:p,maxHp:p,isMegaAsteroid:g,carvings:[],position:m.position,velocity:M,rotationSpeed:L,boundingSphere:new ls(m.position,u*1.05)})}this.scene.add(this.asteroidGroup)}sampleDensity(e,t,n,s,r){if(!e||!e.field)return 0;const o=e.resolution,a=e.halfsize,c=t/r*a+a,l=n/r*a+a,h=s/r*a+a;if(c<0||c>=o-1||l<0||l>=o-1||h<0||h>=o-1){if(c<0||c>=o||l<0||l>=o||h<0||h>=o)return 0;const k=Math.floor(Math.max(0,Math.min(o-1,c))),F=Math.floor(Math.max(0,Math.min(o-1,l))),B=Math.floor(Math.max(0,Math.min(o-1,h)));return e.getCell(k,F,B)}const u=Math.floor(c),p=u+1,g=Math.floor(l),y=g+1,_=Math.floor(h),f=_+1,d=c-u,m=l-g,v=h-_,x=e.getCell(u,g,_),T=e.getCell(p,g,_),E=e.getCell(u,y,_),b=e.getCell(p,y,_),R=e.getCell(u,g,f),w=e.getCell(p,g,f),M=e.getCell(u,y,f),L=e.getCell(p,y,f),O=x*(1-d)+T*d,S=E*(1-d)+b*d,P=R*(1-d)+w*d,U=M*(1-d)+L*d,I=O*(1-m)+S*m,V=P*(1-m)+U*m;return I*(1-v)+V*v}computeDensityGradientNormal(e,t){const n=e.mc||e.mesh,s=e.radius,r=s/n.halfsize*.5,o=this.sampleDensity(n,t.x+r,t.y,t.z,s)-this.sampleDensity(n,t.x-r,t.y,t.z,s),a=this.sampleDensity(n,t.x,t.y+r,t.z,s)-this.sampleDensity(n,t.x,t.y-r,t.z,s),c=this.sampleDensity(n,t.x,t.y,t.z+r,s)-this.sampleDensity(n,t.x,t.y,t.z-r,s),l=new N(-o,-a,-c);return l.lengthSq()<1e-4?(l.copy(t).normalize(),l.lengthSq()<1e-4&&l.set(0,1,0)):l.normalize(),e.mesh&&e.mesh.matrixWorld?l.transformDirection(e.mesh.matrixWorld).normalize():l}checkInsideCarvings(e,t){if(!e.carvings||e.carvings.length===0)return!1;for(let n=0;n<e.carvings.length;n++){const s=e.carvings[n],r=t.distanceTo(s.cavityCenter||s.localHit);if(s.isThroughTunnel&&s.localDir&&s.carveDepth){const a=t.clone().sub(s.localHit).dot(s.localDir);if(a>=-25&&a<=s.carveDepth+25){const c=s.localHit.clone().addScaledVector(s.localDir,a);if(t.distanceTo(c)<s.carveRadius*.95)return!0}}else if(s.localDir&&s.carveDepth){const o=s.carveDepth,c=t.clone().sub(s.localHit).dot(s.localDir),l=Math.max(0,Math.min(1,c/Math.max(.1,o))),h=s.localHit.clone().addScaledVector(s.localDir,l*o),u=t.distanceTo(h);if(r<s.carveRadius*1.05||u<s.carveRadius*.95)return!0}else if(r<s.carveRadius*1.05)return!0}return!1}triggerCombatFlash(e,t=16737792,n=4){this.combatFlashLight&&(this.combatFlashLight.position.copy(e),this.combatFlashLight.color.setHex(t),this.combatFlashLight.intensity=n)}update(e,t,n){for(let r=this.debrisList.length-1;r>=0;r--){const o=this.debrisList[r];if(o.life-=e,o.life<=0){this.scene.remove(o.mesh),this.debrisList.splice(r,1);continue}o.mesh.position.addScaledVector(o.vel,e),o.mesh.rotation.x+=o.rot.x*e,o.mesh.rotation.y+=o.rot.y*e;const a=o.life/o.maxLife;o.mesh.scale.set(a,a,a)}this.combatFlashLight&&this.combatFlashLight.intensity>0&&(this.combatFlashLight.intensity=Math.max(0,this.combatFlashLight.intensity-e*6));const s=this.asteroids.length;for(let r=0;r<s;r++){const o=this.asteroids[r];if(o.isMegaAsteroid){o.position.set(0,0,0),o.velocity.set(0,0,0),o.boundingSphere.center.set(0,0,0);continue}o.position.addScaledVector(o.velocity,e),o.boundingSphere.center.copy(o.position),o.mesh.rotation.x+=o.rotationSpeed.x*e,o.mesh.rotation.y+=o.rotationSpeed.y*e,o.mesh.rotation.z+=o.rotationSpeed.z*e;const a=Math.hypot(o.position.x,o.position.z);if(a>10){const c=o.position.x/a,l=o.position.z/a,h=Math.hypot(o.velocity.x,o.velocity.z),u=h*h/a;if(o.velocity.x-=c*u*e,o.velocity.z-=l*u*e,o.velocity.y-=o.position.y*.08*e,a<3300){const p=(3300-a)*.12*e;o.velocity.x+=c*p,o.velocity.z+=l*p}else if(a>5500){const p=(a-5500)*.12*e;o.velocity.x-=c*p,o.velocity.z-=l*p}}}for(let r=0;r<3;r++)for(let o=0;o<s;o++){const a=this.asteroids[o];if(!a)continue;const c=a.position;for(let l=o+1;l<s;l++){const h=this.asteroids[l];if(!h)continue;const u=h.position,p=c.x-u.x,g=c.y-u.y,y=c.z-u.z,_=p*p+g*g+y*y,f=a.radius+h.radius;if(_<f*f&&_>1e-4){const d=Math.sqrt(_),m=p/d,v=g/d,x=y/d,T=f-d,E=Math.min(T*.55,20);if(a.isMegaAsteroid){if(u.x-=m*E,u.y-=v*E,u.z-=x*E,h.boundingSphere&&h.boundingSphere.center.copy(u),r===0){const b=h.velocity.x*m+h.velocity.y*v+h.velocity.z*x;b>0&&(h.velocity.x-=(1+.5)*b*m,h.velocity.y-=(1+.5)*b*v,h.velocity.z-=(1+.5)*b*x)}}else if(h.isMegaAsteroid){if(c.x+=m*E,c.y+=v*E,c.z+=x*E,a.boundingSphere&&a.boundingSphere.center.copy(c),r===0){const b=a.velocity.x*-m+a.velocity.y*-v+a.velocity.z*-x;b>0&&(a.velocity.x-=(1+.5)*b*-m,a.velocity.y-=(1+.5)*b*-v,a.velocity.z-=(1+.5)*b*-x)}}else{const b=a.mass+h.mass,R=h.mass/b,w=a.mass/b;if(c.x+=m*E*R,c.y+=v*E*R,c.z+=x*E*R,u.x-=m*E*w,u.y-=v*E*w,u.z-=x*E*w,a.boundingSphere&&a.boundingSphere.center.copy(c),h.boundingSphere&&h.boundingSphere.center.copy(u),r===0){const M=a.velocity.x-h.velocity.x,L=a.velocity.y-h.velocity.y,O=a.velocity.z-h.velocity.z,S=M*m+L*v+O*x;if(S<0){const P=-1.55*S/(1/a.mass+1/h.mass),U=Math.min(25,P/a.mass),I=Math.min(25,P/h.mass);a.velocity.x+=U*m,a.velocity.y+=U*v,a.velocity.z+=U*x,h.velocity.x-=I*m,h.velocity.y-=I*v,h.velocity.z-=I*x}}}a.velocity.length()>40&&a.velocity.setLength(40),h.velocity.length()>40&&h.velocity.setLength(40)}}}}checkCollision(e,t=2.5){for(let n=0;n<this.asteroids.length;n++){const s=this.asteroids[n],r=e.distanceToSquared(s.position),o=s.radius+t;if(r<o*o)return s}return null}checkRayBlocked(e,t){const n=t.clone().sub(e),s=n.length();if(s<.001)return!1;const r=n.clone().divideScalar(s);for(let o=0;o<this.asteroids.length;o++){const a=this.asteroids[o],c=a.position.clone().sub(e),l=c.dot(r);if(l>0&&l<s){const h=c.lengthSq()-l*l,u=a.radius*.95;if(h<u*u){if(a.carvings&&a.carvings.length>0&&a.mesh){a.mesh.matrixWorld&&a.mesh.updateMatrixWorld(!0);const p=a.mesh.matrixWorld?a.mesh.matrixWorld.clone().invert():new it().copy(a.mesh.matrix).invert(),g=e.clone().applyMatrix4(p).multiplyScalar(a.radius),y=r.clone().transformDirection(p).normalize();let _=!1;for(let f=0;f<a.carvings.length;f++){const d=a.carvings[f];if(d.isThroughTunnel){const m=d.localHit.clone().sub(g),v=m.dot(y);if(m.clone().addScaledVector(y,-v).length()<d.carveRadius*.95){_=!0;break}}}if(_)continue}return!0}}}return!1}checkRayCollision(e,t,n=750){var o;let s=null,r=n;for(let a=0;a<this.asteroids.length;a++){const c=this.asteroids[a],l=c.position.clone().sub(e),h=l.dot(t),u=c.radius,g=l.length()<u;if(h<0&&!g||h-u>r)continue;const y=l.lengthSq()-h*h;if(y>u*u)continue;const _=Math.sqrt(Math.max(0,u*u-y));let f=h-_;if(f<0&&(f=h+_),f>0&&f<r){let d=e.clone().addScaledVector(t,f),m=!1,v=f;if(c.mesh){c.mesh.matrixWorld&&c.mesh.updateMatrixWorld(!0);const x=c.mesh.matrixWorld?c.mesh.matrixWorld.clone().invert():new it().copy(c.mesh.matrix).invert(),T=d.clone().applyMatrix4(x).multiplyScalar(c.radius),E=this.sampleDensity(c.mc||c.mesh,T.x,T.y,T.z,c.radius),b=this.checkInsideCarvings(c,T);(E<=(((o=c.mc)==null?void 0:o.isolation)||80)||b)&&(m=!0,c.carvings&&c.carvings.some(R=>R.isThroughTunnel)?v=Math.max(v,h+_+5):v=Math.max(v,f+60))}if(m){if(v>=h+_)continue;f=v,d=e.clone().addScaledVector(t,f)}f>0&&f<r&&(r=f,s={asteroid:c,distance:f,hitPoint:d})}}return s}resolveShipCollision(e,t,n=2.8,s=1200){var r;for(let o=0;o<this.asteroids.length;o++){const a=this.asteroids[o],c=e.distanceTo(a.position),l=a.radius+n;if(c<l){a.mesh.matrixWorld&&a.mesh.updateMatrixWorld(!0);const h=a.mesh.matrixWorld?a.mesh.matrixWorld.clone().invert():new it().copy(a.mesh.matrix).invert(),u=e.clone().applyMatrix4(h).multiplyScalar(a.radius),p=this.checkInsideCarvings(a,u),g=this.sampleDensity(a.mc||a.mesh,u.x,u.y,u.z,a.radius);if(p||g<=(((r=a.mc)==null?void 0:r.isolation)||80)&&c<a.radius*.95&&a.carvings&&a.carvings.length>0)continue;const y=this.computeDensityGradientNormal(a,u);e.copy(a.position).addScaledVector(y,l+.3);const f=t.clone().sub(a.velocity).dot(y);if(f<0){const d=-1.85*f*s;t.addScaledVector(y,d/s),a.isMegaAsteroid||a.velocity.addScaledVector(y,-(d/a.mass));const m=Math.abs(f),v=Math.round(Math.min(45,Math.max(10,m*.75)));return{asteroid:a,normal:y,impactDamage:v,impactSpeed:m}}}}return null}spawnRockDebris(e,t,n=8){const s=new $s(.85,0),r=new Ut({color:5923437,roughness:.9,metalness:.1});for(let o=0;o<n;o++){if(this.debrisList.length>60){const u=this.debrisList.shift();this.scene.remove(u.mesh)}const a=new we(s,r);a.position.copy(e),this.scene.add(a);const c=new N((Math.random()-.5)*35,(Math.random()-.5)*35,(Math.random()-.5)*35),l=t.clone().multiplyScalar(-18).add(c),h=.5+Math.random()*.4;this.debrisList.push({mesh:a,vel:l,rot:new N(Math.random()*8,Math.random()*8,Math.random()*8),life:h,maxLife:h})}}removeAsteroid(e){if(!e)return!1;const t=this.asteroids.indexOf(e);return t!==-1&&this.asteroids.splice(t,1),e.mesh&&(e.mesh.parent?e.mesh.parent.remove(e.mesh):(this.asteroidGroup.remove(e.mesh),this.scene.remove(e.mesh)),e.mesh.geometry&&e.mesh.geometry.dispose()),e.mc&&(e.mc.geometry&&e.mc.geometry.dispose(),e.mc.field=null,e.mc.normal_cache=null,e.mc.palette=null),!0}damageAsteroid(e,t=5,n,s,r=32,o=36){if(!e)return{destroyed:!1};if(e.hp!==void 0&&e.hp!==1/0&&(e.hp-=t,e.hp<=0)){const a=n?n.clone():e.position.clone(),c=s?s.clone():new N(0,0,1);return this.spawnRockDebris(a,c,28),ot&&typeof ot.playExplosion=="function"&&ot.playExplosion(1.2,a),this.removeAsteroid(e),{destroyed:!0,asteroid:e}}return n&&s&&this.carveAsteroid(e,n,s,r,o),{destroyed:!1,asteroid:e,hp:e.hp}}carveAsteroid(e,t,n,s=32,r=36,o=120){var m,v;if(!e||!e.mesh)return;const a=e.mc||e.mesh;e.mesh.matrixWorld&&e.mesh.updateMatrixWorld(!0);const c=e.mesh.matrixWorld?e.mesh.matrixWorld.clone().invert():new it().copy(e.mesh.matrix).invert(),l=t.clone().applyMatrix4(c).multiplyScalar(e.radius),h=n.clone().transformDirection(c).normalize(),u=e.radius>=2500||e.isMegaAsteroid,p=!u&&e.radius>=38,g=p?Math.max(28,Math.min(36,s)):s,y=u?Math.max(120,Math.min(180,r*3.5)):p?e.radius*2.5:r;let _=0,f=0;if(a&&a.field&&typeof a.getCell=="function"){const x=a.resolution,T=a.halfsize,E=e.radius;for(let b=0;b<x;b++)for(let R=0;R<x;R++)for(let w=0;w<x;w++){const M=new N((w-T)/T*E,(R-T)/T*E,(b-T)/T*E),O=M.clone().sub(l).dot(h);let S;if(p)if(O>=-25&&O<=y+25){const P=l.clone().addScaledVector(h,O);S=M.distanceTo(P)}else S=1/0;else{const P=Math.max(0,Math.min(y,O)),U=l.clone().addScaledVector(h,P);S=M.distanceTo(U)}if(S<g){const P=Math.max(0,1-S/g),U=a.getCell(w,R,b);if(U>0){const I=P*(o||120),V=Math.max(0,U-I);a.setCell(w,R,b,V),f++,_+=U-V}}}a.update(),a.geometry&&((v=(m=a.geometry).computeBoundingSphere)==null||v.call(m))}e.carvings=e.carvings||[],e.carvings.push({localHit:l.clone(),localDir:h.clone(),cavityCenter:l.clone().addScaledVector(h,y*.5),carveRadius:g,carveDepth:y,isThroughTunnel:p,carvedVolume:_,carvedCells:f,timestamp:Date.now()});const d=g>35?16:8;this.spawnRockDebris(t,n,d)}cleanup(){this.destroy()}destroy(){var e,t;for(const n of this.debrisList)n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose());this.debrisList=[];for(const n of this.asteroids)n.mesh&&(n.mesh.parent&&n.mesh.parent.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose()),n.mc&&(n.mc.geometry&&n.mc.geometry.dispose(),n.mc.field=null,n.mc.normal_cache=null,n.mc.palette=null);this.asteroids=[],this.asteroidGroup&&(this.scene.remove(this.asteroidGroup),(t=(e=this.asteroidGroup).clear)==null||t.call(e)),this.combatFlashLight&&this.scene.remove(this.combatFlashLight),this.meteorLight&&this.scene.remove(this.meteorLight)}}class my{constructor(e){this.camera=e,this.group=new Et,this.camera.add(this.group),this.targetOffset=new N,this.currentOffset=new N,this.targetRotation=new Qt,this.currentRotation=new Qt,this.shieldGlassMat=null,this.damageFlashTimer=0,this.boostKickZ=0,this.accentMaterials=[],this.consoleWarningMat=null,this.createCockpitModel()}createCockpitModel(){const e=new Ut({color:1119776,roughness:.35,metalness:.9,flatShading:!0}),t=new Ut({color:1975344,roughness:.45,metalness:.8,flatShading:!0}),n=new Ke({color:54527});this.accentMaterials.push(n);const s=new Ke({color:16755200});this.accentMaterials.push(s),this.consoleWarningMat=new Ke({color:65416});const r=new vt(.5,.14,.35),o=new we(r,e);o.position.set(0,-.58,-.55),o.rotation.x=.55,this.group.add(o);const a=new vt(.48,.12,.32),c=new we(a,e);c.position.set(-.52,-.59,-.52),c.rotation.set(.5,.28,-.12),this.group.add(c);const l=new vt(.48,.12,.32),h=new we(l,e);h.position.set(.52,-.59,-.52),h.rotation.set(.5,-.28,.12),this.group.add(h);const u=new qs(.18,.08),p=new we(u,new Ke({color:6180}));p.position.set(-.5,-.53,-.47),p.rotation.set(.5,.28,-.12),this.group.add(p);const g=new we(u,new Ke({color:2102272}));g.position.set(.5,-.53,-.47),g.rotation.set(.5,-.28,.12),this.group.add(g);const y=new qt(.003,.003,1.4,6);y.rotateZ(Math.PI/2);const _=new we(y,n);_.position.set(0,-.54,-.48),_.rotation.x=.5,this.group.add(_);const f=new vt(.024,1.15,.035),d=new we(f,e);d.position.set(-.92,.16,-.48),d.rotation.set(-.12,.12,.52),this.group.add(d);const m=d.clone();m.position.set(.92,.16,-.48),m.rotation.set(-.12,-.12,-.52),this.group.add(m);const v=new vt(1.6,.03,.14),x=new we(v,e);x.position.set(0,.72,-.52),x.rotation.x=-.22,this.group.add(x);const T=new Jn(.82,16,12,0,Math.PI*2,0,Math.PI*.46);this.shieldGlassMat=new Ke({color:57855,transparent:!0,opacity:.025,side:Nt,blending:dt,depthWrite:!1});const E=new we(T,this.shieldGlassMat);E.position.set(0,0,.08),this.group.add(E),this.createCompactCannon(-.72,-.44,-.65,e,t,n),this.createCompactCannon(.72,-.44,-.65,e,t,n)}createCompactCannon(e,t,n,s,r,o){const a=new Et;a.position.set(e,t,n);const c=new qt(.018,.022,.55,8);c.rotateX(Math.PI/2);const l=new we(c,r);l.position.set(0,0,-.22),a.add(l);const h=new xi(.024,.004,6,12),u=new we(h,o);u.position.set(0,0,-.48),a.add(u),this.group.add(a)}triggerDamageFlash(){this.damageFlashTimer=.38}triggerBoostFlash(){this.boostKickZ=-.06,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(65535),this.shieldGlassMat.opacity=.2)}update(e,t,n){this.boostKickZ||(this.boostKickZ=0),this.boostKickZ+=(0-this.boostKickZ)*e*9;const s=(t.thrust?.016:t.brake?-.016:0)+this.boostKickZ,r=t.strafe*.02,o=t.pitch*.012,a=t.roll*.018;this.targetOffset.set(-r,-o,s),this.targetRotation.set(-o*1.4,-r*1.1,-a),this.currentOffset.lerp(this.targetOffset,e*10),this.currentRotation.x+=(this.targetRotation.x-this.currentRotation.x)*e*10,this.currentRotation.y+=(this.targetRotation.y-this.currentRotation.y)*e*10,this.currentRotation.z+=(this.targetRotation.z-this.currentRotation.z)*e*10,this.group.position.copy(this.currentOffset),this.group.rotation.copy(this.currentRotation),this.damageFlashTimer>0?(this.damageFlashTimer-=e,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(16720452),this.shieldGlassMat.opacity=Math.max(.03,this.damageFlashTimer*.9))):this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(57855),this.shieldGlassMat.opacity=.025)}}class gy{constructor(e,t){this.camera=e,this.spaceEnv=t,this.position=new N(0,80,3200),this.velocity=new N(0,0,0),this.quaternion=new Zt,this.maxSpeed=90,this.forwardAccel=45,this.decelRate=this.maxSpeed/2*3,this.strafeAccel=40,this.maxStrafeSpeed=35,this.boostCooldown=2,this.boostCooldownTimer=0,this.lastThrustTapTime=0,this.boostImpulse=180,this.pitchSpeed=1.6,this.yawSpeed=1.6,this.rollSpeed=2,this.maxHp=100,this.hp=100,this.maxShield=100,this.shield=100,this.isShieldBroken=!1,this.shieldRechargeDelay=2,this.shieldRechargeTimer=0,this.shieldRechargeRate=100/15,this.mass=1200,this.isInvisible=!1,this.invisibilityTimer=0,this.hasHologramDecoy=!1,this.storedPowerUp=null,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.asteroidImpactDebounceTimer=0,this.shipCollisionDebounceTimer=0,this.score=0,this.kills=0,this.deaths=0,this.input={thrust:!1,brake:!1,strafeLeft:!1,strafeRight:!1,pitchUp:!1,pitchDown:!1,yawLeft:!1,yawRight:!1,rollLeft:!1,rollRight:!1,analogPitch:0,analogYaw:0,analogRoll:0},this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}resetSpawn(){this.position.set(0,80,3200),this.velocity.set(0,0,0),this.quaternion.set(0,0,0,1),this.hp=this.maxHp,this.shield=this.maxShield,this.isShieldBroken=!1,this.shieldRechargeTimer=0,this.boostCooldownTimer=0,this.lastThrustTapTime=0,this.isInvisible=!1,this.invisibilityTimer=0,this.hasHologramDecoy=!1,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.asteroidImpactDebounceTimer=0,this.shipCollisionDebounceTimer=0,this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}takeDamage(e,t="generic",n=!1){if(typeof t=="boolean"&&(n=t,t="generic"),this.isDead||!n&&this.invulnerableTimer>0)return!1;this.shieldRechargeTimer=this.shieldRechargeDelay;let s=e,r=e;if(t==="laser"?(s=e*2.4,r=e*.35):(t==="cannon"||t==="missile")&&(s=e*.35,r=e*2.2),this.shield>0){const o=Math.min(this.shield,s);this.shield-=o,this.shield<=0&&(this.shield=0,this.isShieldBroken=!0);const a=1-o/(s||1);a>.01&&(this.hp=Math.max(0,this.hp-r*a))}else this.hp=Math.max(0,this.hp-r);return this.hp<=0?(this.isDead=!0,this.deaths++,this.respawnTimer=3,!0):!1}recordKill(){this.kills++,this.score+=100}triggerThrustPress(e=performance.now()){const t=e-this.lastThrustTapTime;return this.lastThrustTapTime=e,t>=40&&t<=380&&this.boostCooldownTimer<=0&&!this.isDead?this.activateBoost():!1}useSpecialPowerUp(e){if(!this.storedPowerUp||this.isDead)return null;const t=this.storedPowerUp;return this.storedPowerUp=null,t.type==="shield_repair"?(this.shield=this.maxShield,this.isShieldBroken=!1,{success:!0,message:"🛡️ SHIELD REPAIRED: 100%"}):t.type==="invisibility"?(this.isInvisible=!0,this.invisibilityTimer=60,{success:!0,message:"👁️ CLOAK ACTIVATED (60s)"}):t.type==="hologram_clone"?(e&&e.weaponsSystem&&e.weaponsSystem.deployDecoyClone(this),{success:!0,message:"👥 HOLOGRAM CLONE LAUNCHED"}):null}breakInvisibility(){this.isInvisible=!1,this.invisibilityTimer=0}activateBoost(){this.boostCooldownTimer=this.boostCooldown;const e=this.getForwardVector();this.velocity.addScaledVector(e,this.boostImpulse);const t=this.maxSpeed*3;return this.velocity.length()>t&&this.velocity.setLength(t),!0}applyImpulse(e){this.velocity.add(e),this.velocity.length()>this.maxSpeed*1.35&&this.velocity.setLength(this.maxSpeed*1.35)}update(e){if(this.invulnerableTimer>0&&(this.invulnerableTimer=Math.max(0,this.invulnerableTimer-e)),this.asteroidImpactDebounceTimer>0&&(this.asteroidImpactDebounceTimer=Math.max(0,this.asteroidImpactDebounceTimer-e)),this.shipCollisionDebounceTimer>0&&(this.shipCollisionDebounceTimer=Math.max(0,this.shipCollisionDebounceTimer-e)),this.boostCooldownTimer>0&&(this.boostCooldownTimer=Math.max(0,this.boostCooldownTimer-e)),this.invisibilityTimer>0&&(this.invisibilityTimer=Math.max(0,this.invisibilityTimer-e),this.invisibilityTimer<=0&&(this.isInvisible=!1)),this.isDead){this.respawnTimer-=e,this.respawnTimer<=0&&this.resetSpawn();return}!this.isShieldBroken&&this.shield<this.maxShield&&(this.shieldRechargeTimer>0?this.shieldRechargeTimer-=e:this.shield=Math.min(this.maxShield,this.shield+this.shieldRechargeRate*e)),(isNaN(this.position.x)||isNaN(this.position.y)||isNaN(this.position.z))&&(this.position.set(0,80,3200),this.velocity.set(0,0,0)),(isNaN(this.velocity.x)||isNaN(this.velocity.y)||isNaN(this.velocity.z))&&this.velocity.set(0,0,0),(isNaN(this.quaternion.x)||isNaN(this.quaternion.w))&&this.quaternion.set(0,0,0,1),this.handleRotation(e),this.handleThrustAndMovement(e),this.handleAsteroidCollisions(),this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}handleRotation(e){let t=0;this.input.pitchUp&&(t+=1),this.input.pitchDown&&(t-=1),t+=this.input.analogPitch,t=Ko(t,-1,1);let n=0;this.input.yawLeft&&(n+=1),this.input.yawRight&&(n-=1),n+=this.input.analogYaw,n=Ko(n,-1,1);let s=0;this.input.rollLeft&&(s+=1),this.input.rollRight&&(s-=1),s+=this.input.analogRoll,s=Ko(s,-1,1);const r=new N(1,0,0),o=new N(0,1,0),a=new N(0,0,1);if(t!==0){const c=new Zt().setFromAxisAngle(r,t*this.pitchSpeed*e);this.quaternion.multiply(c)}if(n!==0){const c=new Zt().setFromAxisAngle(o,n*this.yawSpeed*e);this.quaternion.multiply(c)}if(s!==0){const c=new Zt().setFromAxisAngle(a,s*this.rollSpeed*e);this.quaternion.multiply(c)}this.quaternion.normalize()}handleThrustAndMovement(e){const t=new N(0,0,-1).applyQuaternion(this.quaternion).normalize(),n=new N(1,0,0).applyQuaternion(this.quaternion).normalize();if(this.input.thrust&&(this.velocity.addScaledVector(t,this.forwardAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.input.brake){const o=this.velocity.length();if(o>.001){const a=this.decelRate*e,c=Math.max(0,o-a);c===0?this.velocity.set(0,0,0):this.velocity.setLength(c)}else this.velocity.set(0,0,0)}let s=0;if(this.input.strafeLeft&&(s-=1),this.input.strafeRight&&(s+=1),s!==0&&(this.velocity.addScaledVector(n,s*this.strafeAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.position.addScaledVector(this.velocity,e),this.position.length()>6500){const o=this.position.clone().normalize().multiplyScalar(-30*e);this.velocity.add(o)}}handleAsteroidCollisions(){if(this.spaceEnv&&typeof this.spaceEnv.resolveShipCollision=="function"){const t=this.spaceEnv.resolveShipCollision(this.position,this.velocity,2.8,this.mass);if(t)return this.asteroidImpactDebounceTimer<=0&&(this.takeDamage(t.impactDamage),this.asteroidImpactDebounceTimer=.25),t}else if(this.spaceEnv&&typeof this.spaceEnv.checkCollision=="function"){const t=this.spaceEnv.checkCollision(this.position,2.8);if(t){const n=this.position.clone().sub(t.position);n.lengthSq()<.001?n.set(0,1,0):n.normalize(),this.position.copy(t.position).addScaledVector(n,t.radius+2.8+.4);const s=this.velocity.dot(n);s<0&&this.velocity.subScaledVector(n,1.8*s),this.asteroidImpactDebounceTimer<=0&&(this.takeDamage(15),this.asteroidImpactDebounceTimer=.25)}}}getForwardVector(){return new N(0,0,-1).applyQuaternion(this.quaternion).normalize()}getRightVector(){return new N(1,0,0).applyQuaternion(this.quaternion).normalize()}getSpeed(){return this.velocity.length()}}class vy{constructor(){this.logs=[],this.maxLogs=500,this.engineRef=null,this.startTime=Date.now(),this.webglInfo=null,this.lastFps=0,this.frameCount=0,this.fpsTimer=performance.now(),this.interceptConsole(),this.listenToErrors()}setEngine(e){if(this.engineRef=e,e&&e.renderer)try{const t=e.renderer.getContext(),n=t.getExtension("WEBGL_debug_renderer_info");this.webglInfo={renderer:n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER),vendor:n?t.getParameter(n.UNMASKED_VENDOR_WEBGL):t.getParameter(t.VENDOR),version:t.getParameter(t.VERSION),shadingLanguageVersion:t.getParameter(t.SHADING_LANGUAGE_VERSION),maxTextureSize:t.getParameter(t.MAX_TEXTURE_SIZE)},this.log("SYS",`WebGL Initialized: ${this.webglInfo.renderer}`)}catch(t){this.log("SYS",`WebGL info inspection error: ${t.message}`)}}interceptConsole(){const e=console.log.bind(console),t=console.warn.bind(console),n=console.error.bind(console);console.log=(...s)=>{this.log("LOG",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),e(...s)},console.warn=(...s)=>{this.log("WARN",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),t(...s)},console.error=(...s)=>{this.log("ERROR",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),n(...s)}}listenToErrors(){window.addEventListener("error",e=>{this.log("UNCAUGHT",`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`)}),window.addEventListener("unhandledrejection",e=>{var t;this.log("REJECTION",`${((t=e.reason)==null?void 0:t.message)||e.reason}`)})}log(e,t){const s=`[${((Date.now()-this.startTime)/1e3).toFixed(2)}s][${e}] ${t}`;this.logs.push(s),this.logs.length>this.maxLogs&&this.logs.shift()}recordFrame(){this.frameCount++;const e=performance.now();e-this.fpsTimer>=1e3&&(this.lastFps=Math.round(this.frameCount*1e3/(e-this.fpsTimer)),this.frameCount=0,this.fpsTimer=e)}generateDiagnosticReport(){var n,s,r,o,a,c,l,h,u,p,g,y;const e=[];if(e.push("================ ROCKETS CLIENT DIAGNOSTICS ================"),e.push(`Timestamp: ${new Date().toISOString()}`),e.push(`User Agent: ${navigator.userAgent}`),e.push(`Screen Resolution: ${window.screen.width}x${window.screen.height} (Pixel Ratio: ${window.devicePixelRatio})`),e.push(`Window Inner Size: ${window.innerWidth}x${window.innerHeight}`),e.push(`Orientation: ${((n=screen.orientation)==null?void 0:n.type)||"unknown"}`),e.push(`Touch Supported: ${"ontouchstart"in window||navigator.maxTouchPoints>0} (Max Points: ${navigator.maxTouchPoints})`),e.push(""),e.push("--- WebGL Environment ---"),this.webglInfo?(e.push(`Renderer: ${this.webglInfo.renderer}`),e.push(`Vendor: ${this.webglInfo.vendor}`),e.push(`WebGL Version: ${this.webglInfo.version}`),e.push(`Max Texture Size: ${this.webglInfo.maxTextureSize}`)):e.push("WebGL Info: Not yet captured or WebGL unavailable"),e.push(""),e.push("--- Engine & Simulation State ---"),this.engineRef){const _=this.engineRef;if(e.push(`Is Engine Running: ${_.isRunning}`),e.push(`Render FPS: ${this.lastFps}`),e.push(`Canvas Size: ${(r=(s=_.renderer)==null?void 0:s.domElement)==null?void 0:r.width}x${(a=(o=_.renderer)==null?void 0:o.domElement)==null?void 0:a.height}`),e.push(`Canvas Container Size: ${(c=_.container)==null?void 0:c.clientWidth}x${(l=_.container)==null?void 0:l.clientHeight}`),e.push(`Scene Children Count: ${((u=(h=_.scene)==null?void 0:h.children)==null?void 0:u.length)||0}`),e.push(`Asteroids Spawned: ${((g=(p=_.spaceEnv)==null?void 0:p.asteroids)==null?void 0:g.length)||0}`),_.playerShip){const f=_.playerShip;e.push(`Ship Position: (${f.position.x.toFixed(2)}, ${f.position.y.toFixed(2)}, ${f.position.z.toFixed(2)})`),e.push(`Ship Velocity: (${f.velocity.x.toFixed(2)}, ${f.velocity.y.toFixed(2)}, ${f.velocity.z.toFixed(2)}) [Speed: ${f.getSpeed().toFixed(1)}]`),e.push(`Ship Quaternion: (${f.quaternion.x.toFixed(3)}, ${f.quaternion.y.toFixed(3)}, ${f.quaternion.z.toFixed(3)}, ${f.quaternion.w.toFixed(3)})`),e.push(`Ship HP: ${f.hp}/${f.maxHp} (isDead: ${f.isDead}, invuln: ${f.invulnerableTimer.toFixed(1)})`),e.push(`Active Inputs: thrust=${f.input.thrust}, brake=${f.input.brake}, strafeL=${f.input.strafeLeft}, strafeR=${f.input.strafeRight}, analogPitch=${f.input.analogPitch.toFixed(2)}, analogYaw=${f.input.analogYaw.toFixed(2)}`)}_.network&&(e.push(`Network Self ID: ${_.network.selfId}`),e.push(`Network Room ID: ${_.network.roomId}`),e.push(`Network isMaster: ${_.network.isMaster}`),e.push(`Connected Peers: ${((y=_.network.peers)==null?void 0:y.size)||0}`))}else e.push("Engine Reference: None (Engine not attached)");e.push(""),e.push("--- Recent Event Stream (Last 50 Logs) ---");const t=this.logs.slice(-50);for(const _ of t)e.push(_);return e.push("============================================================"),e.join(`
`)}async copyToClipboard(){const e=this.generateDiagnosticReport();if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(e),!0}catch{}return window.prompt("Copy diagnostic report below (Ctrl+C / Cmd+C):",e),!0}}const ct=new vy;class yy{constructor(e){this.scene=e,this.maxParticles=1200,this.particles=[],this.geom=new Mt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new ft(this.positions,3)),this.geom.setAttribute("color",new ft(this.colors,3)),this.material=new Xs({size:11.5,vertexColors:!0,transparent:!0,opacity:.95,blending:dt,depthWrite:!1,sizeAttenuation:!0}),this.points=new Jr(this.geom,this.material),this.points.frustumCulled=!1,this.scene.add(this.points)}emit(e,t,n=2){for(let s=0;s<n&&!(this.particles.length>=this.maxParticles);s++){const r=new N((Math.random()-.5)*.55,(Math.random()-.5)*.55,(Math.random()-.5)*.55),o=e.clone().add(r),a=t.clone().multiplyScalar(-20).add(new N((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8)),c=.8+Math.random()*.6;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}update(e){for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.life-=e,s.life<=0){this.particles.splice(n,1);continue}s.pos.addScaledVector(s.vel,e),s.vel.multiplyScalar(Math.pow(.92,e*60))}const t=this.particles.length;for(let n=0;n<t;n++){const s=this.particles[n],r=n*3;this.positions[r]=s.pos.x,this.positions[r+1]=s.pos.y,this.positions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.2)this.colors[r]=1,this.colors[r+1]=.98,this.colors[r+2]=.75;else if(o<.55){const a=(o-.2)/.35;this.colors[r]=1,this.colors[r+1]=.52*(1-a),this.colors[r+2]=.05*(1-a)}else{const a=(1-o)/.45,c=.26*a;this.colors[r]=c,this.colors[r+1]=c,this.colors[r+2]=c+.03*a}}for(let n=t;n<this.maxParticles;n++){const s=n*3;this.positions[s]=99999,this.positions[s+1]=99999,this.positions[s+2]=99999,this.colors[s]=0,this.colors[s+1]=0,this.colors[s+2]=0}this.geom.attributes.position.needsUpdate=!0,this.geom.attributes.color.needsUpdate=!0}cleanup(){this.points&&this.points.parent&&this.points.parent.remove(this.points),this.geom.dispose(),this.material.dispose()}}class _y{constructor({maxTurnRate:e=3.2,initialSpeed:t=85,maxSpeed:n=210,accel:s=50}={}){this.maxTurnRate=e,this.currentSpeed=t,this.maxSpeed=n,this.accel=s}steer(e,t,n,s){this.currentSpeed=Math.min(this.maxSpeed,this.currentSpeed+this.accel*e);const r=s.clone().sub(t),o=r.length();if(o<.001)return{newDir:n.clone(),speed:this.currentSpeed,dist:0};const a=r.clone().divideScalar(o),c=new Zt().setFromUnitVectors(new N(0,0,1),n),l=new Zt().setFromUnitVectors(new N(0,0,1),a),h=this.maxTurnRate*e,u=c.angleTo(l),p=u>1e-4?Math.min(1,h/u):1;return c.slerp(l,p),{newDir:new N(0,0,1).applyQuaternion(c).normalize(),speed:this.currentSpeed,dist:o}}}class xy{constructor(){this.lockRequiredTime=3,this.lockTimer=0,this.isLocked=!1,this.currentTargetId=null,this.lockTickTimer=0,this.maxLockDistance=650,this.lockConeDot=.86,this.targetScreenPos={x:0,y:0,visible:!1,dist:0}}update(e,t,n,s,r){if(t.isDead){this.reset();return}const o=t.getForwardVector();let a=null,c=this.lockConeDot,l=this.maxLockDistance;for(const[h,u]of n.entries()){if(!u||u.isDead||u.isInvisible)continue;const p=u.position.clone().sub(t.position),g=p.length();if(g>this.maxLockDistance)continue;const y=p.clone().divideScalar(g),_=o.dot(y);_>c&&(s&&typeof s.checkRayBlocked=="function"&&s.checkRayBlocked(t.position,u.position)||(c=_,l=g,a={id:h,remote:u,dist:g,dot:_}))}if(a){if(this.currentTargetId===a.id?(this.lockTimer=Math.min(this.lockRequiredTime,this.lockTimer+e),this.lockTickTimer+=e,this.lockTickTimer>=.38&&!this.isLocked&&(this.lockTickTimer=0,ot.playLockTick(this.lockTimer/this.lockRequiredTime)),this.lockTimer>=this.lockRequiredTime&&!this.isLocked&&(this.isLocked=!0,ot.playLockChime(),ct.log("WEAPON",`Missile lock ACQUIRED on target [${a.id.slice(0,5)}]`))):(this.currentTargetId=a.id,this.lockTimer=e,this.isLocked=this.lockTimer>=this.lockRequiredTime,this.lockTickTimer=0,ot.playLockTick(Math.min(1,this.lockTimer/this.lockRequiredTime))),r&&typeof r.project=="function")try{const h=a.remote.position.clone().project(r);this.targetScreenPos={x:(h.x*.5+.5)*100,y:(-(h.y*.5)+.5)*100,inFront:h.z<1,dist:Math.round(l),id:a.id}}catch{}}else this.lockTimer>0&&(this.lockTimer=Math.max(0,this.lockTimer-e*2.8)),this.lockTimer<=0&&this.reset(),this.targetScreenPos.visible=!1}consumeLock(){const e=this.currentTargetId;return this.reset(),e}reset(){this.lockTimer=0,this.isLocked=!1,this.currentTargetId=null,this.lockTickTimer=0,this.targetScreenPos={x:0,y:0,inFront:!1,dist:0}}getProgress(){return Math.min(1,this.lockTimer/this.lockRequiredTime)}}class My{constructor(e,t,n){this.scene=e,this.spaceEnv=t,this.network=n,this.laserMaxEnergy=100,this.laserEnergy=100,this.laserFireInterval=.08,this.laserShotCost=1.6,this.laserCooldownDelay=.5,this.laserCooldownTimer=0,this.laserRechargeRate=25,this.laserLastFireTime=0,this.laserDamage=2.4,this.laserMaxRange=750,this.laserSpeed=480,this.lockSystem=new xy,this.missileDamage=55,this.missileFireCooldown=.8,this.missileLastFireTime=0,this.cannonDamage=6,this.cannonSpeed=185,this.laserBeams=[],this.projectileLasers=[],this.missiles=[],this.projectiles=[],this.mines=[],this.explosions=[],this.decoys=[],this.fireTrails=new yy(this.scene),this.initGeometriesAndMaterials(),this.listenToNetworkEvents()}initGeometriesAndMaterials(){this.laserCoreGeom=new qt(.12,.12,1,8),this.laserCoreGeom.rotateX(Math.PI/2),this.laserGlowGeom=new qt(.38,.38,1,8),this.laserGlowGeom.rotateX(Math.PI/2),this.localLaserCoreMat=new Ke({color:16777215,transparent:!0,opacity:.98,blending:dt}),this.localLaserGlowMat=new Ke({color:54527,transparent:!0,opacity:.85,blending:dt}),this.remoteLaserCoreMat=new Ke({color:16777215,transparent:!0,opacity:.98,blending:dt}),this.remoteLaserGlowMat=new Ke({color:16711782,transparent:!0,opacity:.85,blending:dt}),this.missileBodyGeom=new qt(.3,.3,2.6,8),this.missileBodyGeom.rotateX(Math.PI/2),this.missileNoseGeom=new Yn(.3,.9,8),this.missileNoseGeom.rotateX(-Math.PI/2),this.missileFinGeom=new vt(1.4,.05,.65),this.missileNozzleGeom=new qt(.2,.28,.45,8),this.missileNozzleGeom.rotateX(Math.PI/2),this.missileBodyMat=new Ut({color:1975344,roughness:.35,metalness:.9,flatShading:!0}),this.missileNoseMat=new Ke({color:16724770}),this.missileFinMat=new Ut({color:3818580,roughness:.5}),this.missileNozzleMat=new Ke({color:16742144}),this.slugBodyGeom=new qt(.24,.32,2,8),this.slugBodyGeom.rotateX(Math.PI/2),this.slugNoseGeom=new Yn(.24,.9,8),this.slugNoseGeom.rotateX(-Math.PI/2),this.slugTailGeom=new qt(.18,.28,.45,8),this.slugTailGeom.rotateX(Math.PI/2),this.slugBodyMat=new Ut({color:2371133,roughness:.35,metalness:.85}),this.localSlugNoseMat=new Ke({color:16763955}),this.remoteSlugNoseMat=new Ke({color:16724804}),this.slugThrusterMat=new Ke({color:16737792}),this.decoyMat=new Ke({color:65535,wireframe:!0,transparent:!0,opacity:.75,blending:dt}),this.mineGeom=new $s(1.6,1),this.mineMat=new Ut({color:2236962,roughness:.3,metalness:.9,emissive:16716032,emissiveIntensity:.4})}listenToNetworkEvents(){this.network&&(typeof this.network.onLaser=="function"&&this.network.onLaser((e,t)=>{this.spawnRemoteLaserBeam(e,t)}),typeof this.network.onMissile=="function"&&this.network.onMissile((e,t)=>{this.spawnRemoteMissile(e,t)}),typeof this.network.onDecoy=="function"&&this.network.onDecoy((e,t)=>{this.spawnRemoteDecoy(e,t)}),typeof this.network.onCannon=="function"&&this.network.onCannon((e,t)=>{this.spawnRemoteLaserBeam(e,t)}),typeof this.network.onMine=="function"&&this.network.onMine((e,t)=>{this.spawnRemoteMine(e,t)}))}triggerPrimary(e,t,n){if(!e||t.isDead)return;typeof t.breakInvisibility=="function"&&t.breakInvisibility();const s=n>1e3?n*.001:n;if(this.laserEnergy>=this.laserShotCost&&s-this.laserLastFireTime>=this.laserFireInterval-.001){this.laserLastFireTime=s,this.laserCooldownTimer=this.laserCooldownDelay,this.laserEnergy=Math.max(0,this.laserEnergy-this.laserShotCost);const r=t.getForwardVector(),o=t.getRightVector(),a=new N(0,1,0).applyQuaternion(t.quaternion),c=t.position.clone().addScaledVector(r,2.2).addScaledVector(o,-.72).addScaledVector(a,-.28),l=t.position.clone().addScaledVector(r,2.2).addScaledVector(o,.72).addScaledVector(a,-.28),h=t.position.clone().addScaledVector(r,2);let u=null,p=this.laserMaxRange,g=null,y=null;if(this.spaceEnv&&typeof this.spaceEnv.checkRayCollision=="function"){const f=this.spaceEnv.checkRayCollision(h,r,this.laserMaxRange);f&&(u=f.hitPoint,p=f.distance,g="asteroid",y=f.asteroid)}if(this.network&&this.network.peers)for(const[f,d]of this.network.peers.entries()){const m=d==null?void 0:d.lastState;if(!m||m.isDead||m.isInvisible)continue;const x=new N(m.pos.x,m.pos.y,m.pos.z).clone().sub(h),T=x.dot(r);T>0&&T<p&&x.lengthSq()-T*T<16&&(p=T,u=h.clone().addScaledVector(r,T),g="ship",y=f)}u||(u=h.clone().addScaledVector(r,this.laserMaxRange));const _=`laser-${this.network?this.network.selfId:"local"}-${Date.now()}`;this.spawnTwinLaserBeam(c,l,u,!0),ot.playLaserShot(!0),g==="asteroid"&&y?(this.spawnExplosion(u,6,54527),typeof this.spaceEnv.damageAsteroid=="function"?this.spaceEnv.damageAsteroid(y,5,u,r,45,36):typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(y,u,r,45,36)):g==="ship"&&y&&(this.spawnExplosion(u,8,65535),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(y,this.laserDamage,"laser")),this.network&&typeof this.network.broadcastLaser=="function"&&this.network.broadcastLaser({id:_,leftOrigin:{x:c.x,y:c.y,z:c.z},rightOrigin:{x:l.x,y:l.y,z:l.z},hitPoint:{x:u.x,y:u.y,z:u.z},dir:{x:r.x,y:r.y,z:r.z},targetType:g,time:n})}}spawnTwinLaserBeam(e,t,n,s){const r=new Et,o=s?this.localLaserCoreMat:this.remoteLaserCoreMat,a=s?this.localLaserGlowMat:this.remoteLaserGlowMat,c=e.distanceTo(n),l=e.clone().add(n).multiplyScalar(.5),h=new we(this.laserCoreGeom,o);h.scale.set(1,1,c),h.position.copy(l),h.lookAt(n),r.add(h);const u=new we(this.laserGlowGeom,a);u.scale.set(1,1,c),u.position.copy(l),u.lookAt(n),r.add(u);const p=t.distanceTo(n),g=t.clone().add(n).multiplyScalar(.5),y=new we(this.laserCoreGeom,o);y.scale.set(1,1,p),y.position.copy(g),y.lookAt(n),r.add(y);const _=new we(this.laserGlowGeom,a);_.scale.set(1,1,p),_.position.copy(g),_.lookAt(n),r.add(_),this.scene.add(r),this.laserBeams.push({group:r,life:.14,maxLife:.14,isLocal:s})}spawnRemoteLaserBeam(e,t){const n=e.leftOrigin?new N(e.leftOrigin.x,e.leftOrigin.y,e.leftOrigin.z):new N(e.origin.x,e.origin.y,e.origin.z),s=e.rightOrigin?new N(e.rightOrigin.x,e.rightOrigin.y,e.rightOrigin.z):n,r=e.hitPoint?new N(e.hitPoint.x,e.hitPoint.y,e.hitPoint.z):n.clone().add(new N(e.dir.x,e.dir.y,e.dir.z).multiplyScalar(500));this.spawnTwinLaserBeam(n,s,r,!1),ot.playLaserShot(!1,n),e.targetType==="asteroid"&&this.spawnExplosion(r,6,16711782)}triggerSecondary(e,t,n){if(!e||t.isDead)return!1;const s=n>1e3?n*.001:n;if(s-this.missileLastFireTime<this.missileFireCooldown)return!1;this.missileLastFireTime=s,typeof t.breakInvisibility=="function"&&t.breakInvisibility();let r=null,o=!1;this.lockSystem.isLocked&&this.lockSystem.currentTargetId&&(r=this.lockSystem.consumeLock(),o=!0);const a=t.getForwardVector(),c=t.position.clone().addScaledVector(a,3.5).add(new N(0,-.4,0)),l=`missile-${this.network?this.network.selfId:"local"}-${Date.now()}`;return this.spawnMissile(c,a,r,!0,l),ot.playMissileLaunch(!0),o?ct.log("WEAPON",`🚀 Guided Homing Missile LAUNCHED tracking target [${r.slice(0,5)}]`):ct.log("WEAPON","🚀 Unguided Dumb-Fire Missile LAUNCHED straight ahead"),this.network&&typeof this.network.broadcastMissile=="function"&&this.network.broadcastMissile({id:l,origin:{x:c.x,y:c.y,z:c.z},dir:{x:a.x,y:a.y,z:a.z},targetPeerId:r,time:n}),!0}spawnMissile(e,t,n,s,r){const o=new Et;o.position.copy(e),o.quaternion.setFromUnitVectors(new N(0,0,1),t);const a=new we(this.missileBodyGeom,this.missileBodyMat);o.add(a);const c=new we(this.missileNoseGeom,this.missileNoseMat);c.position.set(0,0,1.7),o.add(c);const l=new we(this.missileFinGeom,this.missileFinMat);l.position.set(0,0,-.9),o.add(l);const h=new we(this.missileFinGeom,this.missileFinMat);h.position.set(0,0,-.9),h.rotation.z=Math.PI/2,o.add(h);const u=new we(this.missileNozzleGeom,this.missileNozzleMat);u.position.set(0,0,-1.5),o.add(u),this.scene.add(o),this.missiles.push({group:o,dir:t.clone().normalize(),guidance:new _y,targetId:n,isLocal:s,id:r,life:9})}spawnRemoteMissile(e,t){const n=new N(e.origin.x,e.origin.y,e.origin.z),s=new N(e.dir.x,e.dir.y,e.dir.z);this.spawnMissile(n,s,e.targetPeerId,!1,e.id),ot.playMissileLaunch(!1,n)}deployDecoyClone(e){const t=e.getForwardVector(),n=e.position.clone().addScaledVector(t,4),s=`decoy-${this.network?this.network.selfId:"local"}-${Date.now()}`;this.spawnDecoy(n,t,!0,s),ot.playDecoyDeploy(),ct.log("POWERUP","Hologram Decoy Clone deployed forward!"),this.network&&typeof this.network.broadcastDecoy=="function"&&this.network.broadcastDecoy({id:s,pos:{x:n.x,y:n.y,z:n.z},dir:{x:t.x,y:t.y,z:t.z},time:Date.now()})}spawnDecoy(e,t,n,s){const r=new Et;r.position.copy(e),r.quaternion.setFromUnitVectors(new N(0,0,-1),t);const o=new Yn(1.2,4,5);o.rotateX(-Math.PI/2);const a=new we(o,this.decoyMat);r.add(a);const c=new vt(5,.08,1.8),l=new we(c,this.decoyMat);l.position.set(0,0,.8),r.add(l);const h=new Jn(.5,8,8),u=new Ke({color:65535,transparent:!0,opacity:.9,blending:dt}),p=new we(h,u);p.position.set(0,0,2.2),r.add(p),this.scene.add(r),this.decoys.push({group:r,dir:t.clone().normalize(),speed:95,life:15,maxLife:15,isLocal:n,id:s})}spawnRemoteDecoy(e,t){const n=new N(e.pos.x,e.pos.y,e.pos.z),s=new N(e.dir.x,e.dir.y,e.dir.z);this.spawnDecoy(n,s,!1,e.id),ot.playDecoyDeploy()}spawnRemoteMine(e,t){const n=new N(e.pos.x,e.pos.y,e.pos.z),s=new we(this.mineGeom,this.mineMat);s.position.copy(n),this.scene.add(s),this.mines.push({mesh:s,pos:n,life:3,id:e.id,isLocal:!1})}spawnExplosion(e,t=12,n=16737792){const s=new Et;s.position.copy(e);const r=new Jn(t*.4,12,10),o=new Ke({color:n,transparent:!0,opacity:.95,blending:dt}),a=new we(r,o);s.add(a);const c=new xi(t*.35,t*.04,6,28),l=new Ke({color:16772778,transparent:!0,opacity:.9,blending:dt}),h=new we(c,l);h.rotation.x=Math.random()*Math.PI,h.rotation.y=Math.random()*Math.PI,s.add(h);const u=new vt(.35,.35,.35),p=new Ke({color:16755251,transparent:!0,opacity:.95,blending:dt}),g=t>15?12:6,y=[];for(let _=0;_<g;_++){const f=new we(u,p),d=Math.random()*Math.PI*2,m=Math.acos(2*Math.random()-1),v=new N(Math.sin(m)*Math.cos(d),Math.sin(m)*Math.sin(d),Math.cos(m)),x=t*1.5+Math.random()*(t*1.8),T=v.multiplyScalar(x);s.add(f),y.push({mesh:f,vel:T})}this.scene.add(s),ot.playExplosion(t>15?1.6:.85,e),this.spaceEnv&&typeof this.spaceEnv.triggerCombatFlash=="function"&&this.spaceEnv.triggerCombatFlash(e,n,t>15?4.5:2.5),this.explosions.push({group:s,mesh:s,fireball:a,ring:h,sparks:y,maxLife:.55,life:.55,maxRadius:t})}spawnLaser(e,t,n,s){const r=new Et;r.position.copy(e),r.quaternion.setFromUnitVectors(new N(0,0,1),t);const o=new we(this.laserCoreGeom,n?this.localLaserCoreMat:this.remoteLaserCoreMat);o.scale.set(1,1,9),r.add(o);const a=new we(this.laserGlowGeom,n?this.localLaserGlowMat:this.remoteLaserGlowMat);a.scale.set(1,1,9.4),r.add(a),this.scene.add(r),this.projectileLasers.push({mesh:r,dir:t.clone().normalize(),speed:this.laserSpeed,life:1.4,isLocal:n,id:s})}spawnProjectile(e,t,n,s,r){const o=new Et;o.position.copy(e),o.quaternion.setFromUnitVectors(new N(0,0,1),t);const a=new we(this.slugBodyGeom,this.slugBodyMat);o.add(a);const c=new we(this.slugNoseGeom,s?this.localSlugNoseMat:this.remoteSlugNoseMat);c.position.set(0,0,-1.45),o.add(c);const l=new we(this.slugTailGeom,this.slugThrusterMat);l.position.set(0,0,1.15),o.add(l),this.scene.add(o),this.projectiles.push({mesh:o,dir:t.clone().normalize(),speed:this.cannonSpeed,initialVel:n?n.clone():new N,life:2.8,isLocal:s,id:r})}triggerCannon(e,t,n){return this.triggerSecondary(e,t,n)}triggerLaser(e,t,n){this.triggerPrimary(e,t,n)}triggerRearMine(e){return this.triggerSecondary(!0,e,performance.now())}update(e,t,n,s){if(this.laserCooldownTimer>0){const r=Math.min(this.laserCooldownTimer,e);this.laserCooldownTimer-=r;const o=e-r;o>0&&this.laserEnergy<this.laserMaxEnergy&&(this.laserEnergy=Math.min(this.laserMaxEnergy,this.laserEnergy+this.laserRechargeRate*o))}else this.laserEnergy<this.laserMaxEnergy&&(this.laserEnergy=Math.min(this.laserMaxEnergy,this.laserEnergy+this.laserRechargeRate*e));for(let r=this.laserBeams.length-1;r>=0;r--){const o=this.laserBeams[r];if(o.life-=e,o.life<=0){this.scene.remove(o.group),this.laserBeams.splice(r,1);continue}const a=o.life/o.maxLife;o.group.children.forEach(c=>{c.material&&c.material.opacity!==void 0&&(c.material.opacity=a*.95)})}for(let r=this.missiles.length-1;r>=0;r--){const o=this.missiles[r];o.life-=e;let a=null;if(o.targetId===(this.network?this.network.selfId:null))a=t.position;else if(n.has(o.targetId)){const u=n.get(o.targetId);u.isDead||(a=u.position)}if(a){const u=o.guidance.steer(e,o.group.position,o.dir,a);o.dir.copy(u.newDir),o.group.position.addScaledVector(o.dir,u.speed*e)}else o.group.position.addScaledVector(o.dir,o.guidance.currentSpeed*e);o.group.quaternion.setFromUnitVectors(new N(0,0,1),o.dir);const c=o.group.position.clone().addScaledVector(o.dir,-1.5);this.fireTrails.emit(c,o.dir,3);let l=!1;const h=this.spaceEnv.checkCollision(o.group.position,1.8);if(h&&(this.spawnExplosion(o.group.position,22,16733440),typeof this.spaceEnv.damageAsteroid=="function"?this.spaceEnv.damageAsteroid(h,50,o.group.position,o.dir,55,42):typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(h,o.group.position,o.dir,45,35),l=!0),!l&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.group.position.distanceToSquared(t.position)<24&&(this.spawnExplosion(o.group.position,20,16720384),t.takeDamage(this.missileDamage,"missile"),s&&s(this.missileDamage,"missile",null),l=!0),!l&&o.isLocal){if(o.targetId&&n.has(o.targetId)){const u=n.get(o.targetId);!u.isDead&&o.group.position.distanceToSquared(u.position)<24&&(this.spawnExplosion(o.group.position,20,16720384),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(o.targetId,this.missileDamage,"missile"),l=!0)}else if(!o.targetId&&n){for(const[u,p]of n.entries())if(!p.isDead&&o.group.position.distanceToSquared(p.position)<24){this.spawnExplosion(o.group.position,20,16720384),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(u,this.missileDamage,"missile"),l=!0;break}}}(l||o.life<=0)&&(o.life<=0&&!l&&this.spawnExplosion(o.group.position,10,16729088),this.scene.remove(o.group),this.missiles.splice(r,1))}for(let r=this.projectileLasers.length-1;r>=0;r--){const o=this.projectileLasers[r];o.life-=e,o.mesh.position.addScaledVector(o.dir,o.speed*e);let a=!1;if(this.spaceEnv.checkCollision(o.mesh.position,1.2)&&(this.spawnExplosion(o.mesh.position,6,54527),a=!0),!a&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<18&&(this.spawnExplosion(o.mesh.position,8,65535),t.takeDamage(this.laserDamage,"laser"),s&&s(this.laserDamage,"laser",null),a=!0),!a&&o.isLocal){for(const[l,h]of n.entries())if(!h.isDead&&o.mesh.position.distanceToSquared(h.position)<18){this.spawnExplosion(o.mesh.position,8,65535),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(l,this.laserDamage,"laser"),a=!0;break}}(a||o.life<=0)&&(this.scene.remove(o.mesh),this.projectileLasers.splice(r,1))}for(let r=this.projectiles.length-1;r>=0;r--){const o=this.projectiles[r];o.life-=e,o.mesh.position.addScaledVector(o.dir,o.speed*e);let a=!1;const c=this.spaceEnv.checkCollision(o.mesh.position,1.2);if(c&&(this.spawnExplosion(o.mesh.position,5,16742144),typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(c,o.mesh.position,o.dir),a=!0),!a&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<16&&(this.spawnExplosion(o.mesh.position,6,16724736),t.takeDamage(this.cannonDamage,"cannon"),s&&s(this.cannonDamage,"cannon",null),a=!0),!a&&o.isLocal){for(const[l,h]of n.entries())if(!h.isDead&&o.mesh.position.distanceToSquared(h.position)<16){this.spawnExplosion(o.mesh.position,6,16733440),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(l,this.cannonDamage,"cannon"),a=!0;break}}(a||o.life<=0)&&(this.scene.remove(o.mesh),this.projectiles.splice(r,1))}for(let r=this.decoys.length-1;r>=0;r--){const o=this.decoys[r];o.life-=e,o.group.position.addScaledVector(o.dir,o.speed*e);const a=.5+Math.sin(o.life*14)*.25;o.group.children.forEach(c=>{c.material&&c.material.opacity!==void 0&&(c.material.opacity=a)}),o.life<=0&&(this.spawnExplosion(o.group.position,6,65535),this.scene.remove(o.group),this.decoys.splice(r,1))}for(let r=this.mines.length-1;r>=0;r--){const o=this.mines[r];o.life-=e,o.mesh.rotation.y+=e*2,o.life<=0&&(this.spawnExplosion(o.pos,16,16720384),this.scene.remove(o.mesh),this.mines.splice(r,1))}for(let r=this.explosions.length-1;r>=0;r--){const o=this.explosions[r];if(o.life-=e,o.life<=0){o.group&&o.group.parent?o.group.parent.remove(o.group):o.mesh&&o.mesh.parent&&o.mesh.parent.remove(o.mesh),this.explosions.splice(r,1);continue}const a=1-o.life/o.maxLife,c=o.life/o.maxLife;if(o.fireball){const l=1+a*2.4;o.fireball.scale.set(l,l,l),o.fireball.material&&(o.fireball.material.opacity=Math.max(0,c*.95))}else if(o.mesh&&o.mesh.material){const l=1+a*2.2;o.mesh.scale.set(l,l,l),o.mesh.material.opacity=c*.9}if(o.ring){const l=1+a*4.2;o.ring.scale.set(l,l,l),o.ring.material&&(o.ring.material.opacity=Math.max(0,(1-a)*.85))}if(o.sparks)for(let l=0;l<o.sparks.length;l++){const h=o.sparks[l];h.mesh.position.addScaledVector(h.vel,e),h.vel.multiplyScalar(Math.pow(.9,e*60)),h.mesh.material&&(h.mesh.material.opacity=Math.max(0,(1-a)*.9))}}this.fireTrails.update(e)}get lasers(){return this.projectileLasers.length>0?this.projectileLasers:this.laserBeams}get cannonEnergy(){return this.lockSystem.isLocked?100:Math.round(this.lockSystem.getProgress()*100)}get cannonMaxEnergy(){return 100}get cannonCooldownTimer(){return this.lockSystem.isLocked?0:3-this.lockSystem.lockTimer}cleanup(){for(const e of this.laserBeams)this.scene.remove(e.group);for(const e of this.missiles)this.scene.remove(e.group);for(const e of this.decoys)this.scene.remove(e.group);for(const e of this.mines)this.scene.remove(e.mesh);for(const e of this.explosions)e.group&&e.group.parent?e.group.parent.remove(e.group):e.mesh&&e.mesh.parent&&e.mesh.parent.remove(e.mesh);this.fireTrails.cleanup()}}class uh{constructor(e,t,n="Pilot"){this.peerId=e,this.scene=t,this.playerName=n,this.group=new Et,this.position=this.group.position,this.quaternion=this.group.quaternion,this.lastReceivedState=null,this.targetPosition=new N,this.targetQuaternion=new Zt,this.targetVelocity=new N,this.velocity=this.targetVelocity,this.lastPacketTime=performance.now(),this.hp=100,this.maxHp=100,this.isDead=!1,this.isThrusting=!1,this.strafeState=0,this.engineFlares=[],this.sideThrusterFlares=[],this.shieldMesh=null,this.nameCanvas=null,this.nameSprite=null,this.createShipMesh(),this.createNameplate(),this.scene.add(this.group)}createShipMesh(){const e=new Ut({color:10363940,roughness:.35,metalness:.85,flatShading:!0}),t=new Ut({color:1580068,roughness:.45,metalness:.8,flatShading:!0}),n=new Ut({color:54527,roughness:.12,metalness:.95,emissive:15186,emissiveIntensity:.6}),s=new Ke({color:58879}),r=new Yn(.75,2.6,5);r.rotateX(-Math.PI/2);const o=new we(r,e);o.position.set(0,0,-2.1),this.group.add(o);const a=new vt(1.8,.04,.6),c=new we(a,t);c.position.set(0,.05,-1.5),this.group.add(c);const l=new vt(1.4,.8,3.2),h=new we(l,e);h.position.set(0,0,.2),this.group.add(h);const u=new vt(.35,.55,1.8),p=new we(u,t);p.position.set(-.85,-.05,.1),this.group.add(p);const g=p.clone();g.position.set(.85,-.05,.1),this.group.add(g);const y=new Yn(.48,1.8,5);y.rotateX(-Math.PI/2);const _=new we(y,n);_.position.set(0,.44,-.4),this.group.add(_);const f=new vt(5.8,.08,2),d=new we(f,e);d.position.set(0,-.08,.6),this.group.add(d);const m=new qt(.1,.12,1.6,8);m.rotateX(Math.PI/2);const v=new we(m,t);v.position.set(-1.8,-.22,.3),this.group.add(v);const x=v.clone();x.position.set(1.8,-.22,.3),this.group.add(x);const T=new xi(.12,.02,6,12),E=new we(T,s);E.position.set(-1.8,-.22,-.5),this.group.add(E);const b=E.clone();b.position.set(1.8,-.22,-.5),this.group.add(b);const R=new vt(.08,1.25,1.2),w=new we(R,t);w.position.set(-.65,.62,1.2),w.rotation.z=-.32,this.group.add(w);const M=w.clone();M.position.set(.65,.62,1.2),M.rotation.z=.32,this.group.add(M);const L=new qt(.32,.42,.75,10);L.rotateX(Math.PI/2);const O=new we(L,t);O.position.set(-.48,0,1.95),this.group.add(O);const S=O.clone();S.position.set(.48,0,1.95),this.group.add(S);const P=new xi(.3,.03,6,12),U=new we(P,s);U.position.set(-.48,0,2.32),this.group.add(U);const I=U.clone();I.position.set(.48,0,2.32),this.group.add(I);const V=new Yn(.32,2.6,8);V.rotateX(-Math.PI/2);const k=new Ke({color:51455,transparent:!0,opacity:.9,blending:dt}),F=new we(V,k);F.position.set(-.48,0,3.6),this.group.add(F),this.engineFlares.push(F);const B=F.clone();B.position.set(.48,0,3.6),this.group.add(B),this.engineFlares.push(B);const j=new Jn(3.4,16,12),se=new Ke({color:58879,wireframe:!0,transparent:!0,opacity:0});this.shieldMesh=new we(j,se),this.group.add(this.shieldMesh)}createNameplate(){this.nameCanvas=document.createElement("canvas"),this.nameCanvas.width=256,this.nameCanvas.height=64,this.updateNameplateTexture();const e=new Qr(this.nameCanvas),t=new Xu({map:e,transparent:!0});this.nameSprite=new sy(t),this.nameSprite.position.set(0,3.2,0),this.nameSprite.scale.set(7.5,1.8,1),this.group.add(this.nameSprite)}updateNameplateTexture(){if(!this.nameCanvas)return;const e=this.nameCanvas.getContext("2d");if(!e)return;e.clearRect(0,0,256,64),e.fillStyle="rgba(10, 16, 26, 0.75)",e.roundRect?e.roundRect(10,8,236,48,8):e.fillRect(10,8,236,48),e.fill(),e.strokeStyle="#00d4ff",e.lineWidth=2,e.stroke(),e.font='bold 20px "Segoe UI", sans-serif',e.fillStyle="#ffffff",e.textAlign="center",e.fillText(this.playerName,128,30);const t=Math.max(0,this.hp/this.maxHp);e.fillStyle="#222",e.fillRect(30,38,196,10),e.fillStyle=t>.4?"#00ff88":"#ff3344",e.fillRect(30,38,196*t,10),this.nameSprite&&this.nameSprite.material.map&&(this.nameSprite.material.map.needsUpdate=!0)}receiveNetworkState(e){e&&(this.lastPacketTime=performance.now(),e.name&&e.name!==this.playerName&&(this.playerName=e.name,this.updateNameplateTexture()),e.hp!==void 0&&e.hp!==this.hp&&(this.hp=e.hp,this.updateNameplateTexture()),this.isDead=!!e.isDead,this.isInvisible=!!e.isInvisible,this.isThrusting=!!e.thrust,this.strafeState=e.strafe||0,this.targetPosition.set(e.pos.x,e.pos.y,e.pos.z),this.targetQuaternion.set(e.quat._x||e.quat.x,e.quat._y||e.quat.y,e.quat._z||e.quat.z,e.quat._w||e.quat.w),e.vel&&this.targetVelocity.set(e.vel.x,e.vel.y,e.vel.z))}triggerShieldFlash(){this.shieldMesh&&(this.shieldMesh.material.opacity=.55)}update(e){if(this.isDead){this.group.visible=!1;return}this.group.visible=!0;const t=performance.now(),n=Math.min(.25,(t-this.lastPacketTime)/1e3),s=this.targetPosition.clone().addScaledVector(this.targetVelocity,n),r=Math.min(1,e*12);this.position.lerp(s,r),this.quaternion.slerp(this.targetQuaternion,Math.min(1,e*10));const o=this.isThrusting?.8+Math.random()*.4:.001;for(const a of this.engineFlares)a.scale.set(o,o,o),a.visible=this.isThrusting;this.shieldMesh&&this.shieldMesh.material.opacity>0&&(this.shieldMesh.material.opacity=Math.max(0,this.shieldMesh.material.opacity-e*2.5))}destroy(){this.scene.remove(this.group)}}class Sy{constructor(e){this.scene=e,this.maxParticles=2400,this.particles=[],this.geom=new Mt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new ft(this.positions,3)),this.geom.setAttribute("color",new ft(this.colors,3));let t=null;if(typeof document<"u")try{const n=document.createElement("canvas");n.width=64,n.height=64;const s=n.getContext("2d");if(s){const r=s.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.2,"rgba(0, 220, 255, 0.85)"),r.addColorStop(.5,"rgba(0, 140, 255, 0.35)"),r.addColorStop(.8,"rgba(0, 60, 255, 0.1)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),s.fillStyle=r,s.fillRect(0,0,64,64),t=new Qr(n)}}catch{}this.mat=new Xs({size:5.5,map:t||void 0,vertexColors:!0,transparent:!0,opacity:.85,blending:dt,depthWrite:!1,sizeAttenuation:!0}),this.points=new Jr(this.geom,this.mat),this.points.frustumCulled=!1,this.scene.add(this.points),this.emitTimer=0}emit(e,t,n=!1){this.particles.length>=this.maxParticles&&this.particles.shift();const s=(Math.random()-.5)*.6,r=(Math.random()-.5)*.6,o=(Math.random()-.5)*.6,a=e.clone().addScaledVector(t,-2.4);this.particles.push({x:a.x+s,y:a.y+r,z:a.z+o,vx:s*.4,vy:r*.4,vz:o*.4,age:0,maxAge:15,isHostile:n})}update(e){const t=this.geom.attributes.position,n=this.geom.attributes.color,s=this.particles.length;for(let r=s-1;r>=0;r--){const o=this.particles[r];if(o.age+=e,o.age>=o.maxAge){this.particles.splice(r,1);continue}o.x+=o.vx*e,o.y+=o.vy*e,o.z+=o.vz*e;const a=1-o.age/o.maxAge,c=Math.pow(a,1.6),l=r*3;this.positions[l]=o.x,this.positions[l+1]=o.y,this.positions[l+2]=o.z,o.isHostile?(this.colors[l]=1*c,this.colors[l+1]=.35*c,this.colors[l+2]=.15*c):(this.colors[l]=.15*c,this.colors[l+1]=.85*c,this.colors[l+2]=1*c)}this.maxParticles-this.particles.length;for(let r=this.particles.length;r<this.maxParticles;r++){const o=r*3;this.positions[o]=0,this.positions[o+1]=0,this.positions[o+2]=0,this.colors[o]=0,this.colors[o+1]=0,this.colors[o+2]=0}t.needsUpdate=!0,n.needsUpdate=!0}cleanup(){this.scene.remove(this.points),this.particles=[]}}class wy{constructor(e){this.scene=e,this.ripples=[],this.ringGeom=new vc(.8,1.2,32),this.ringGeom.rotateX(Math.PI/2),this.sphereGeom=new os(1,2)}emitRipple(e,t=58879){const n=new Et;n.position.copy(e);const s=new Ke({color:t,wireframe:!0,transparent:!0,opacity:.85,blending:dt,depthWrite:!1}),r=new we(this.sphereGeom,s);n.add(r);const o=new Ke({color:16777215,transparent:!0,opacity:.95,side:Rt,blending:dt,depthWrite:!1}),a=new we(this.ringGeom,o);n.add(a),this.scene.add(n),this.ripples.push({group:n,sphereMesh:r,ringMesh:a,age:0,maxAge:2.5,maxRadius:280})}update(e){for(let t=this.ripples.length-1;t>=0;t--){const n=this.ripples[t];if(n.age+=e,n.age>=n.maxAge){this.scene.remove(n.group),this.ripples.splice(t,1);continue}const s=n.age/n.maxAge,r=2+Math.pow(s,.75)*n.maxRadius,o=Math.max(0,(1-s)*.9);n.sphereMesh.scale.set(r,r,r),n.sphereMesh.material.opacity=o,n.ringMesh.scale.set(r*1.05,r*1.05,r*1.05),n.ringMesh.material.opacity=o*1.2}}cleanup(){for(const e of this.ripples)this.scene.remove(e.group);this.ripples=[]}}class Ey{constructor(e,t,n={}){this.scene=e,this.spaceEnv=t;const s=typeof n=="number"?n:(n==null?void 0:n.frequency)!==void 0?n.frequency:10;this.spawnInterval=s,this.enabled=s>0,this.spawnTimer=4,this.activeMeteor=null,this.maxParticles=250,this.particles=[],this.trailGeom=new Mt,this.trailPositions=new Float32Array(this.maxParticles*3),this.trailColors=new Float32Array(this.maxParticles*3),this.trailGeom.setAttribute("position",new ft(this.trailPositions,3)),this.trailGeom.setAttribute("color",new ft(this.trailColors,3)),this.trailMat=new Xs({size:48,vertexColors:!0,transparent:!0,opacity:.95,blending:dt,depthWrite:!1,sizeAttenuation:!0}),this.trailPoints=new Jr(this.trailGeom,this.trailMat),this.scene.add(this.trailPoints)}spawnMeteor(){if(this.activeMeteor)return;const e=Math.random()*Math.PI*2,t=Math.acos(2*Math.random()-1),n=6500+Math.random()*500,s=new N(n*Math.sin(t)*Math.cos(e),n*Math.sin(t)*Math.sin(e)*.4,n*Math.cos(t));let r=new N((Math.random()-.5)*600,(Math.random()-.5)*300,(Math.random()-.5)*600);if(this.spaceEnv&&this.spaceEnv.asteroids.length>1&&Math.random()<.45){const R=Math.floor(1+Math.random()*(this.spaceEnv.asteroids.length-1)),w=this.spaceEnv.asteroids[R];w&&r.copy(w.position)}const o=r.clone().sub(s).normalize(),a=260,c=o.clone().multiplyScalar(a),l=56,h=12e5,u=new Et;u.position.copy(s);const p=new $s(l,2),g=new Ut({color:1705986,emissive:16724736,emissiveIntensity:4.2,roughness:.88,metalness:.25}),y=new we(p,g);u.add(y);const _=new Jn(l*.75,16,12),f=new Ke({color:16777215,transparent:!0,opacity:.95,blending:dt}),d=new we(_,f);u.add(d);const m=new os(l*1.25,2),v=new Ke({color:16729088,transparent:!0,opacity:.65,blending:dt,side:Rt}),x=new we(m,v);u.add(x);const T=new os(l*1.4,2),E=new Ke({color:16755200,transparent:!0,opacity:.45,blending:dt,side:Rt}),b=new we(T,E);u.add(b),this.scene.add(u),this.activeMeteor={group:u,coreMesh:y,fireEnvelopeMesh:x,haloMesh:b,position:u.position,velocity:c,dir:o,speed:a,radius:l,mass:h,flybyPlayed:!1,age:0},this.spaceEnv&&this.spaceEnv.meteorLight&&(this.spaceEnv.meteorLight.intensity=4.5,this.spaceEnv.meteorLight.position.copy(s)),ct.log("METEOR",`Flaming meteor entered sector at (${Math.round(s.x)}, ${Math.round(s.y)}, ${Math.round(s.z)}) heading speed ${a} u/s`)}update(e,t,n,s){var r;if(this.enabled&&this.spawnInterval>0&&(this.spawnTimer+=e,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnMeteor())),this.activeMeteor){const o=this.activeMeteor;if(o.age+=e,o.position.addScaledVector(o.velocity,e),o.coreMesh.rotation.x+=e*1.8,o.coreMesh.rotation.y+=e*2.2,o.fireEnvelopeMesh){o.fireEnvelopeMesh.rotation.x-=e*3.5,o.fireEnvelopeMesh.rotation.z+=e*4;const c=1+Math.sin(o.age*14)*.06;o.fireEnvelopeMesh.scale.set(c,c,c)}if(o.haloMesh){o.haloMesh.rotation.y+=e*2.8,o.haloMesh.rotation.z-=e*2.5;const c=1+Math.cos(o.age*10)*.08;o.haloMesh.scale.set(c,c,c)}this.spaceEnv&&this.spaceEnv.meteorLight&&this.spaceEnv.meteorLight.position.copy(o.position),this.emitTrailParticles(o.position,o.dir,6),!o.flybyPlayed&&t&&!t.isDead&&o.position.distanceTo(t.position)<450&&(o.flybyPlayed=!0,ot.playMeteorFlyby(o.position));let a=!1;for(let c=0;c<this.spaceEnv.asteroids.length;c++){const l=this.spaceEnv.asteroids[c],h=o.position.distanceToSquared(l.position),u=l.radius+o.radius;if(h<u*u){if(l.radius>=2500||l.isMegaAsteroid){ct.log("METEOR","Meteor IMPACT with Central Mega-Asteroid! Blasting massive crater.");const g=o.position.clone(),y=o.dir.clone();typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(l,g,y,130,90),this.triggerExplosion(o.position,65,16724736)}else{const g=l.position.clone().sub(o.position).normalize(),y=o.mass/Math.max(1,l.mass)*o.speed*1.8,_=Math.min(30,y);l.velocity.addScaledVector(g,_),l.velocity.length()>40&&l.velocity.setLength(40),typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(l,o.position.clone(),o.dir.clone(),36,25),l.rotationSpeed.add(new N((Math.random()-.5)*1.2,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2)),ct.log("METEOR",`Meteor IMPACT with belt asteroid! Transferred impulse ${Math.round(_)} u/s`),this.triggerExplosion(o.position,28,16733440)}a=!0;break}}if(!a&&t&&!t.isDead&&o.position.distanceTo(t.position)<o.radius+3.2&&(ct.log("METEOR","Meteor DIRECT HIT on player ship! Instant lethal incineration."),this.triggerExplosion(o.position,36,16720384),t.takeDamage(1e3,!0),s&&s("🔥 Incinerated by rogue flaming meteor!"),a=!0),!a&&n){for(const[c,l]of n.entries())if(!l.isDead&&o.position.distanceTo(l.position)<o.radius+3.2){ct.log("METEOR",`Meteor DIRECT HIT on remote ship ${c.slice(0,5)}!`),this.triggerExplosion(o.position,36,16720384),(r=l.takeDamage)==null||r.call(l,1e3),a=!0;break}}!a&&o.position.length()>8e3&&(a=!0),a&&this.destroyMeteor()}this.updateTrailParticles(e)}emitTrailParticles(e,t,n=6){for(let s=0;s<n&&!(this.particles.length>=this.maxParticles);s++){const r=new N((Math.random()-.5)*45,(Math.random()-.5)*45,(Math.random()-.5)*45),o=e.clone().add(r),a=t.clone().multiplyScalar(-40).add(new N((Math.random()-.5)*25,(Math.random()-.5)*25,(Math.random()-.5)*25)),c=.65+Math.random()*.45;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}updateTrailParticles(e){for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.life-=e,s.life<=0){this.particles.splice(n,1);continue}s.pos.addScaledVector(s.vel,e)}const t=this.particles.length;for(let n=0;n<t;n++){const s=this.particles[n],r=n*3;this.trailPositions[r]=s.pos.x,this.trailPositions[r+1]=s.pos.y,this.trailPositions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.2)this.trailColors[r]=1,this.trailColors[r+1]=.95,this.trailColors[r+2]=.8;else if(o<.6)this.trailColors[r]=1,this.trailColors[r+1]=.45*(1-(o-.2)/.4),this.trailColors[r+2]=.05;else{const a=(1-o)/.4;this.trailColors[r]=.6*a,this.trailColors[r+1]=.1*a,this.trailColors[r+2]=.02*a}}for(let n=t;n<this.maxParticles;n++){const s=n*3;this.trailPositions[s]=0,this.trailPositions[s+1]=0,this.trailPositions[s+2]=999999}this.trailGeom.attributes.position.needsUpdate=!0,this.trailGeom.attributes.color.needsUpdate=!0}triggerExplosion(e,t=28,n=16733440){const s=new Jn(t*.4,16,12),r=new Ke({color:n,transparent:!0,opacity:.95,blending:dt}),o=new we(s,r);o.position.copy(e),this.scene.add(o),ot.playExplosion(2.5),this.spaceEnv&&typeof this.spaceEnv.triggerCombatFlash=="function"&&this.spaceEnv.triggerCombatFlash(e,n,6);const a=performance.now(),c=550,l=()=>{const u=(performance.now()-a)/c;if(u>=1){this.scene.remove(o),s.dispose(),r.dispose();return}const p=1+u*3.5;o.scale.set(p,p,p),r.opacity=Math.max(0,1-u),requestAnimationFrame(l)};requestAnimationFrame(l)}destroyMeteor(){this.activeMeteor&&(this.scene.remove(this.activeMeteor.group),this.spaceEnv&&this.spaceEnv.meteorLight&&(this.spaceEnv.meteorLight.intensity=0),this.activeMeteor=null)}cleanup(){this.destroyMeteor(),this.scene.remove(this.trailPoints),this.trailGeom.dispose(),this.trailMat.dispose()}}const oi={SHIELD_REPAIR:"shield_repair",INVISIBILITY:"invisibility",HOLOGRAM_CLONE:"hologram_clone"};class by{constructor(e,t=null){this.scene=e,this.blackHoleSystem=t,this.spawnInterval=10,this.spawnTimer=2,this.itemLifetime=60,this.powerups=[],this.maxConcurrent=12,this.orbGeom=new os(3.2,2),this.ringGeom=new xi(4.5,.25,8,24),this.iconGeom=new vt(1.6,1.6,1.6)}spawnPowerUp(){if(this.powerups.length>=this.maxConcurrent)return;const e=Math.random()*Math.PI*2,t=3300+Math.random()*1900,n=new N(Math.cos(e)*t,(Math.random()-.5)*400,Math.sin(e)*t),s=Math.random();let r=oi.SHIELD_REPAIR,o=65535,a="Shield Repair";s<.36?(r=oi.SHIELD_REPAIR,o=65484,a="Shield Replenish"):s<.68?(r=oi.INVISIBILITY,o=13378303,a="Cloaking Device"):(r=oi.HOLOGRAM_CLONE,o=65382,a="Hologram Decoy");const c=new Et;c.position.copy(n);const l=new Ke({color:o,transparent:!0,opacity:.85,blending:dt}),h=new we(this.orbGeom,l);c.add(h);const u=new Ke({color:o,wireframe:!0,transparent:!0,opacity:.75,blending:dt}),p=new we(this.ringGeom,u);c.add(p);const g=new Ke({color:16777215,wireframe:!0}),y=new we(this.iconGeom,g);c.add(y),this.scene.add(c),this.powerups.push({group:c,coreMesh:h,ringMesh:p,iconMesh:y,type:r,name:a,pos:n,life:this.itemLifetime,maxLife:this.itemLifetime,initialY:n.y,seed:Math.random()*10}),ct.log("POWERUP",`Spawned [${a}] at (${Math.round(n.x)}, ${Math.round(n.y)}, ${Math.round(n.z)})`)}update(e,t,n){this.spawnTimer+=e,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnPowerUp());for(let s=this.powerups.length-1;s>=0;s--){const r=this.powerups[s];if(r.life-=e,r.life<=0){this.scene.remove(r.group),this.powerups.splice(s,1);continue}const o=r.maxLife-r.life;if(r.group.rotation.y+=e*1.6,r.ringMesh.rotation.x+=e*2.4,r.ringMesh.rotation.z+=e*1.8,r.iconMesh.rotation.y-=e*3,r.group.position.y=r.initialY+Math.sin(o*2.5+r.seed)*3.5,r.life<10){const a=(Math.sin(o*12)+1)*.5;r.coreMesh.material.opacity=.3+a*.6}if(t&&!t.isDead){const a=t.position.distanceToSquared(r.group.position),c=8;a<=c*c&&(this.applyPowerUp(r.type,t,n),ot.playScoreChime(),this.scene.remove(r.group),this.powerups.splice(s,1))}}}applyPowerUp(e,t,n){let s="Special",r="✨",o="#00ffff";switch(e){case oi.SHIELD_REPAIR:s="REPAIR SHIELD",r="🛡️",o="#00d4ff";break;case oi.INVISIBILITY:s="CLOAK",r="👁️",o="#c084fc";break;case oi.HOLOGRAM_CLONE:s="DECOY CLONE",r="👥",o="#00ff88";break}t.storedPowerUp={type:e,name:s,icon:r,color:o},ct.log("POWERUP",`Collected and stored [${s}] in Special slot`),n&&n(`✨ ${r} ${s} ARMED! PRESS [R] OR SPECIAL BUTTON TO USE`)}cleanup(){for(const e of this.powerups)this.scene.remove(e.group);this.powerups=[],this.orbGeom.dispose(),this.ringGeom.dispose(),this.iconGeom.dispose()}}class Ty{constructor({container:e,network:t,mapSeed:n,config:s,onHudUpdate:r,onDeathNotice:o}){this.container=e,this.network=t,this.mapSeed=n,this.config=s||{voxelQuality:"low",asteroidCount:100,megaRadius:2800,meteorFrequency:10},this.onHudUpdate=r||(()=>{}),this.onDeathNotice=o||(()=>{}),this.scene=null,this.camera=null,this.renderer=null,this.spaceEnv=null,this.cockpit=null,this.playerShip=null,this.weaponsSystem=null,this.remoteShips=new Map,this.isRunning=!1,this.lastTime=performance.now(),this.animFrameId=null,this.lastWidth=0,this.lastHeight=0,this.isPointerLocked=!1,this.mouseSensitivity=.0066,this.isFiringLaser=!1,this.isFiringCannon=!1,this.powerUpSystem=null,this.broadcastTimer=0,this.broadcastInterval=1/20,this.thrusterTrails=null,this.beaconSystem=null,this.meteorSystem=null,this.trailEmitTimer=0,this.timeSinceLastCombat=0,this.beaconPulseTimer=0,this.netStatsTimer=0,this.initThree(),this.setupNetworkHandlers(),this.setupInputListeners(),ct.setEngine(this),ct.log("ENGINE",`GameEngine initialized with seed ${this.mapSeed}`)}initThree(){this.scene=new ny,this.scene.background=new qe(264212),this.scene.fog=new gc(264212,4e-5);const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;this.camera=new Wt(75,e/t,.1,12e3),this.scene.add(this.camera),this.renderer=new ty({antialias:!0,powerPreference:"high-performance",precision:"highp",stencil:!1,alpha:!1}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=pu,this.renderer.toneMappingExposure=1.2,this.renderer.domElement.style.transform="translateZ(0)",this.renderer.domElement.style.willChange="transform",this.container.appendChild(this.renderer.domElement),this.spaceEnv=new Zo(this.scene,this.mapSeed,this.config),this.playerShip=new gy(this.camera,this.spaceEnv),this.playerShip.resetSpawn(),this.cockpit=new my(this.camera),this.weaponsSystem=new My(this.scene,this.spaceEnv,this.network),this.thrusterTrails=new Sy(this.scene),this.beaconSystem=new wy(this.scene),this.meteorSystem=new Ey(this.scene,this.spaceEnv,{frequency:this.config.meteorFrequency!==void 0?this.config.meteorFrequency:10}),this.powerUpSystem=new by(this.scene);try{this.renderer.compile(this.scene,this.camera)}catch{}window.addEventListener("resize",this.onWindowResize.bind(this))}setupNetworkHandlers(){this.network.onPeerJoined=e=>{if(!(!e||typeof e!="string")){if(!this.remoteShips.has(e)){const t=new uh(e,this.scene,`Pilot-${e.slice(0,4)}`);this.remoteShips.set(e,t)}ct.log("NET",`Peer joined: ${e}`)}},this.network.onPeerLeft=e=>{!e||typeof e!="string"||(this.remoteShips.has(e)&&(this.remoteShips.get(e).destroy(),this.remoteShips.delete(e)),ct.log("NET",`Peer left: ${e}`))},this.network.onHit(e=>{if(this.timeSinceLastCombat=0,e.targetId===this.network.selfId){const t=this.playerShip.takeDamage(e.damage);this.cockpit.triggerDamageFlash(),ot.playDamageHit(),t&&(ot.playExplosion(2.2),this.network.broadcastKill(this.network.selfId,e.attackerId,e.attackerName),this.onDeathNotice(`💥 Destroyed by ${e.attackerName||"Unknown Pilot"}`))}else this.remoteShips.has(e.targetId)&&this.remoteShips.get(e.targetId).triggerShieldFlash()}),this.weaponsSystem&&(this.network.onCannon(()=>{this.timeSinceLastCombat=0}),this.network.onMine(()=>{this.timeSinceLastCombat=0})),this.network.onKill(e=>{this.timeSinceLastCombat=0,e.killerId===this.network.selfId&&(this.playerShip.recordKill(),ot.playScoreChime(),this.onDeathNotice(`🎯 You eliminated ${e.victimId?e.victimId.slice(0,5):"Enemy"}! (+100 PTS)`))}),this.network.onMapReset(e=>{this.resetMap(e)}),this.network&&typeof this.network.onConfig=="function"&&this.network.onConfig(e=>{e&&(this.config={...this.config,...e},ct.log("CONFIG",`Received room config update: ${JSON.stringify(this.config)}`),this.spaceEnv&&(this.spaceEnv.destroy(),this.spaceEnv=new Zo(this.scene,this.mapSeed,this.config),this.weaponsSystem&&(this.weaponsSystem.spaceEnv=this.spaceEnv),this.meteorSystem&&(this.meteorSystem.spaceEnv=this.spaceEnv),this.playerShip&&(this.playerShip.spaceEnv=this.spaceEnv)),this.meteorSystem&&(this.meteorSystem.spawnInterval=this.config.meteorFrequency!==void 0?this.config.meteorFrequency:10,this.meteorSystem.enabled=this.meteorSystem.spawnInterval>0))})}resetMap(e,t=null){this.mapSeed=e,t&&(this.config={...this.config,...t}),this.spaceEnv&&this.spaceEnv.destroy(),this.spaceEnv=new Zo(this.scene,e,this.config),this.weaponsSystem&&(this.weaponsSystem.spaceEnv=this.spaceEnv),this.meteorSystem&&(this.meteorSystem.spaceEnv=this.spaceEnv,this.meteorSystem.spawnInterval=this.config.meteorFrequency!==void 0?this.config.meteorFrequency:10,this.meteorSystem.enabled=this.meteorSystem.spawnInterval>0),this.playerShip&&(this.playerShip.spaceEnv=this.spaceEnv,this.playerShip.position.set(0,80,3200),this.playerShip.velocity.set(0,0,0),this.playerShip.quaternion.set(0,0,0,1)),ct.log("MAP",`Map reseeded with ${e}`),this.onDeathNotice("🔄 Sector reseeded! Map reset complete.")}requestMapResetVote(){return this.network.requestMapResetVote()}castMapResetVote(e){return this.network.castMapResetVote(e)}triggerBoostAction(){return this.playerShip&&this.playerShip.triggerThrustPress(performance.now())?(ot.playBoost(),this.cockpit.triggerBoostFlash(),this.thrusterTrails&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1),!0):!1}setupInputListeners(){window.addEventListener("keydown",e=>{if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.code){case"KeyW":this.playerShip.input.thrust||this.triggerBoostAction(),this.playerShip.input.thrust=!0;break;case"KeyS":this.playerShip.input.brake=!0;break;case"KeyA":this.playerShip.input.strafeLeft||ot.playStrafeBurst(),this.playerShip.input.strafeLeft=!0;break;case"KeyD":this.playerShip.input.strafeRight||ot.playStrafeBurst(),this.playerShip.input.strafeRight=!0;break;case"KeyQ":this.playerShip.input.rollLeft=!0;break;case"KeyE":this.playerShip.input.rollRight=!0;break;case"ArrowUp":this.playerShip.input.pitchUp=!0;break;case"ArrowDown":this.playerShip.input.pitchDown=!0;break;case"ArrowLeft":this.playerShip.input.yawLeft=!0;break;case"ArrowRight":this.playerShip.input.yawRight=!0;break;case"Space":this.isFiringLaser=!0,e.preventDefault();break;case"KeyF":this.weaponsSystem.triggerSecondary(!0,this.playerShip,performance.now());break;case"KeyR":{const t=this.playerShip.useSpecialPowerUp(this);t&&this.onDeathNotice(t.message);break}}}),window.addEventListener("keyup",e=>{switch(e.code){case"KeyW":this.playerShip.input.thrust=!1;break;case"KeyS":this.playerShip.input.brake=!1;break;case"KeyA":this.playerShip.input.strafeLeft=!1;break;case"KeyD":this.playerShip.input.strafeRight=!1;break;case"KeyQ":this.playerShip.input.rollLeft=!1;break;case"KeyE":this.playerShip.input.rollRight=!1;break;case"ArrowUp":this.playerShip.input.pitchUp=!1;break;case"ArrowDown":this.playerShip.input.pitchDown=!1;break;case"ArrowLeft":this.playerShip.input.yawLeft=!1;break;case"ArrowRight":this.playerShip.input.yawRight=!1;break;case"Space":this.isFiringLaser=!1;break}}),this.renderer.domElement.addEventListener("mousedown",e=>{e.button===0?this.isFiringLaser=!0:e.button===2&&this.weaponsSystem.triggerSecondary(!0,this.playerShip,performance.now())}),window.addEventListener("mouseup",e=>{e.button===0&&(this.isFiringLaser=!1)}),this.renderer.domElement.addEventListener("contextmenu",e=>e.preventDefault()),this.renderer.domElement.addEventListener("click",()=>{var e,t;document.pointerLockElement||(t=(e=this.renderer.domElement).requestPointerLock)==null||t.call(e)}),document.addEventListener("pointerlockchange",()=>{this.isPointerLocked=document.pointerLockElement===this.renderer.domElement}),document.addEventListener("mousemove",e=>{this.isPointerLocked&&(this.playerShip.input.analogYaw=-e.movementX*this.mouseSensitivity*25,this.playerShip.input.analogPitch=-e.movementY*this.mouseSensitivity*25)})}onWindowResize(){if(!this.container||!this.renderer||!this.camera)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}start(){this.isRunning=!0,this.lastTime=performance.now(),this.loop()}stop(){this.isRunning=!1,this.animFrameId&&cancelAnimationFrame(this.animFrameId)}loop(){if(this.isRunning){this.animFrameId=requestAnimationFrame(this.loop.bind(this));try{ct.recordFrame();const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;e>0&&t>0&&(e!==this.lastWidth||t!==this.lastHeight)&&(this.lastWidth=e,this.lastHeight=t,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1));const n=performance.now(),s=Math.min(.1,(n-this.lastTime)/1e3);this.lastTime=n,this.isPointerLocked&&(this.playerShip.input.analogPitch*=.7,this.playerShip.input.analogYaw*=.7),this.playerShip.update(s),ot.updateListener(this.camera),ot.updateEngine(this.playerShip.input.thrust,this.playerShip.input.brake,s),(this.isFiringLaser||this.isFiringCannon)&&(this.timeSinceLastCombat=0),this.weaponsSystem.triggerPrimary(this.isFiringLaser,this.playerShip,n),this.weaponsSystem&&this.weaponsSystem.lockSystem&&this.weaponsSystem.lockSystem.update(s,this.playerShip,this.remoteShips,this.spaceEnv,this.camera),this.weaponsSystem.update(s,this.playerShip,this.remoteShips,(o,a,c)=>{this.timeSinceLastCombat=0,this.cockpit.triggerDamageFlash()}),this.powerUpSystem&&this.powerUpSystem.update(s,this.playerShip,o=>{this.onDeathNotice(o)});for(const[o,a]of this.network.peers.entries()){if(!o||typeof o!="string")continue;if(!this.remoteShips.has(o)){const l=(a==null?void 0:a.name)||`Pilot-${o.slice(0,4)}`,h=new uh(o,this.scene,l);this.remoteShips.set(o,h)}const c=this.remoteShips.get(o);c&&(a!=null&&a.lastState)&&c.receiveNetworkState(a.lastState),c&&c.update(s)}if(!this.playerShip.isDead)for(const c of this.remoteShips.values()){if(!c||c.isDead)continue;const l=this.playerShip.position,h=c.position,u=l.x-h.x,p=l.y-h.y,g=l.z-h.z,y=u*u+p*p+g*g;if(y<5.6*5.6&&y>1e-4){const _=Math.sqrt(y),f=u/_,d=p/_,m=g/_,v=5.6-_;l.x+=f*v*.55,l.y+=d*v*.55,l.z+=m*v*.55,h.x-=f*v*.45,h.y-=d*v*.45,h.z-=m*v*.45;const x=this.playerShip.velocity.clone().sub(c.velocity||new N),T=x.x*f+x.y*d+x.z*m;if(T<0){const b=-1.85*T*.5;if(this.playerShip.velocity.x+=f*b,this.playerShip.velocity.y+=d*b,this.playerShip.velocity.z+=m*b,c.velocity&&(c.velocity.x-=f*b,c.velocity.y-=d*b,c.velocity.z-=m*b),ot.playExplosion(.65,l),typeof c.triggerShieldFlash=="function"&&c.triggerShieldFlash(),this.playerShip.shipCollisionDebounceTimer<=0){const R=Math.abs(T),w=Math.round(Math.min(25,Math.max(8,R*.6)));this.playerShip.takeDamage(w),this.playerShip.shipCollisionDebounceTimer=.25,this.cockpit.triggerDamageFlash()}}}}if(this.timeSinceLastCombat+=s,this.network.peers.size>0&&this.timeSinceLastCombat>=30){if(this.beaconPulseTimer+=s,this.beaconPulseTimer>=3.5){this.beaconPulseTimer=0,this.beaconSystem.emitRipple(this.playerShip.position,54527);for(const o of this.remoteShips.values())o.isDead||this.beaconSystem.emitRipple(o.position,16724821);ot.playEngagementBeacon(),ct.log("BEACON",`Engagement beacon pulse emitted across sector (inactivity: ${Math.round(this.timeSinceLastCombat)}s)`)}}else this.beaconPulseTimer=0;if(this.trailEmitTimer+=s,this.trailEmitTimer>=.12){this.trailEmitTimer=0,this.playerShip.input.thrust&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1);for(const o of this.remoteShips.values())if(!o.isDead&&o.isThrusting){const a=new N(0,0,-1).applyQuaternion(o.quaternion);this.thrusterTrails.emit(o.position,a,!0)}}if(this.thrusterTrails.update(s),this.beaconSystem.update(s),this.meteorSystem&&this.meteorSystem.update(s,this.playerShip,this.remoteShips,o=>{this.cockpit.triggerDamageFlash(),this.onDeathNotice(o)}),this.netStatsTimer+=s,this.netStatsTimer>=5){this.netStatsTimer=0;const o=Array.from(this.network.peers.entries());if(o.length===0)ct.log("NET_STATS",`Connected Peers: 0 | Inactivity: ${Math.round(this.timeSinceLastCombat)}s | Master: ${this.network.isMaster}`);else{const a=o.map(([c,l])=>{const h=this.remoteShips.get(c),u=h?Math.round(this.playerShip.position.distanceTo(h.position)):"N/A",p=l.packetsReceived?(l.packetsReceived/5).toFixed(1):"0.0",g=Date.now()-(l.lastSeen||Date.now());l.packetsReceived=0;const y=h?`(${h.position.x.toFixed(1)}, ${h.position.y.toFixed(1)}, ${h.position.z.toFixed(1)})`:"N/A";return`Peer[${c.slice(0,5)}]: ${p} pkt/s, ping ${l.ping||0}ms, seen ${g}ms ago, dist ${u}u, pos ${y}, inScene: ${h?!!h.group.parent:!1}`}).join(" | ");ct.log("NET_STATS",`Peers (${o.length}): ${a}`)}}const r={thrust:this.playerShip.input.thrust,brake:this.playerShip.input.brake,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),pitch:(this.playerShip.input.pitchUp?1:0)-(this.playerShip.input.pitchDown?1:0)+this.playerShip.input.analogPitch,roll:(this.playerShip.input.rollRight?1:0)-(this.playerShip.input.rollLeft?1:0)};this.cockpit.update(s,r,this.playerShip.velocity),this.spaceEnv.update(s,this.playerShip.position,this.playerShip.velocity),this.broadcastTimer+=s,this.broadcastTimer>=this.broadcastInterval&&(this.broadcastTimer=0,this.network.broadcastLocalState({pos:{x:this.playerShip.position.x,y:this.playerShip.position.y,z:this.playerShip.position.z},quat:{x:this.playerShip.quaternion.x,y:this.playerShip.quaternion.y,z:this.playerShip.quaternion.z,w:this.playerShip.quaternion.w},vel:{x:this.playerShip.velocity.x,y:this.playerShip.velocity.y,z:this.playerShip.velocity.z},thrust:this.playerShip.input.thrust,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),hp:this.playerShip.hp,shield:this.playerShip.shield,isDead:this.playerShip.isDead,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,isInvisible:this.playerShip.isInvisible})),this.renderer.render(this.scene,this.camera),this.onHudUpdate({hp:this.playerShip.hp,maxHp:this.playerShip.maxHp,shield:Math.round(this.playerShip.shield),maxShield:this.playerShip.maxShield,speed:Math.round(this.playerShip.getSpeed()),maxSpeed:Math.round(this.playerShip.maxSpeed),laserEnergy:Math.round(this.weaponsSystem.laserEnergy),laserMaxEnergy:this.weaponsSystem.laserMaxEnergy,laserRecharging:this.weaponsSystem.laserCooldownTimer<=0&&this.weaponsSystem.laserEnergy<this.weaponsSystem.laserMaxEnergy,missileLocked:this.weaponsSystem.lockSystem.isLocked,missileLockProgress:this.weaponsSystem.lockSystem.getProgress(),missileTarget:this.weaponsSystem.lockSystem.targetScreenPos,storedPowerUp:this.playerShip.storedPowerUp,cannonEnergy:Math.round(this.weaponsSystem.cannonEnergy),cannonMaxEnergy:this.weaponsSystem.cannonMaxEnergy,cannonRecharging:this.weaponsSystem.cannonCooldownTimer<=0&&this.weaponsSystem.cannonEnergy<this.weaponsSystem.cannonMaxEnergy,isShieldBroken:this.playerShip.isShieldBroken,isInvisible:this.playerShip.isInvisible,hasHologramDecoy:this.playerShip.hasHologramDecoy,alivePilotsCount:[this.playerShip,...this.remoteShips.values()].filter(o=>!o.isDead).length,isDead:this.playerShip.isDead,respawnCountdown:Math.ceil(this.playerShip.respawnTimer),invulnerable:this.playerShip.invulnerableTimer>0,boostReady:this.playerShip.boostCooldownTimer<=0,boostCooldown:Math.ceil(this.playerShip.boostCooldownTimer),inactivityBeacon:this.network.peers.size>0&&this.timeSinceLastCombat>=30,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,activePeersCount:this.network.peers.size+1,isMaster:this.network.isMaster,masterId:this.network.currentMasterId,avgPing:this.network.getAveragePing()})}catch(e){ct.log("CRASH",`Render loop exception: ${e.message}
${e.stack}`)}}}destroy(){this.stop(),this.spaceEnv&&this.spaceEnv.destroy(),this.weaponsSystem&&this.weaponsSystem.cleanup(),this.thrusterTrails&&this.thrusterTrails.cleanup(),this.beaconSystem&&this.beaconSystem.cleanup(),this.meteorSystem&&this.meteorSystem.cleanup(),this.powerUpSystem&&this.powerUpSystem.cleanup(),this.renderer&&this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}class Ay{constructor(e,t){this.container=e,this.engine=t,this.hudElement=null,this.isVoteActive=!1,this.createDom(),this.bindJoystick(),this.bindTouchControls(),this.bindFullscreen(),this.bindDiagnostics(),this.bindMapResetVoting();const n=document.getElementById("hud-room-title");n&&this.engine&&this.engine.network&&(n.textContent=this.engine.network.roomName||this.engine.network.roomId||"Orion Sector");const s=document.getElementById("hud-config-pill");if(s&&this.engine&&this.engine.config){const r=this.engine.config,o=(r.voxelQuality||"low").toUpperCase(),c={low:"32³",medium:"48³",high:"64³"}[r.voxelQuality]||"32³",l=r.asteroidCount!==void 0?r.asteroidCount:100,h=r.meteorFrequency?`${r.meteorFrequency}s`:"OFF";s.textContent=`VOX: ${o} (${c}) | BELT: ${l} | METEOR: ${h}`}}createDom(){this.hudElement=document.createElement("div"),this.hudElement.className="game-hud-overlay",this.hudElement.innerHTML=`
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
            <button class="hud-btn-reset-map" id="hud-btn-reset-map" title="Vote to Reset Sector Map">🔄 Reset Map</button>
          </div>
        </div>

        <div class="hud-top-center">
          <div class="hud-header-scoreboard" id="hud-header-scoreboard">
            <span>👥 <strong id="hud-alive-val">1</strong> Pilot</span>
            <span>SPD: <strong id="hud-speed-val">0</strong></span>
          </div>

          <!-- Integrated Compact Flight & Combat Gauges -->
          <div class="hud-top-meters">
            <div class="hud-compact-meter meter-shield">
              <span class="meter-label" id="hud-shield-title">SHIELD</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-shield" id="hud-shield-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-shield-num">100%</span>
            </div>

            <div class="hud-compact-meter meter-hp">
              <span class="meter-label">HULL</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-hp" id="hud-hp-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-hp-num">100%</span>
            </div>

            <div class="hud-compact-meter meter-laser">
              <span class="meter-label">LASER [SHIELD/DIG]</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-laser" id="hud-laser-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-laser-pct">100%</span>
            </div>

            <div class="hud-compact-meter meter-missile">
              <span class="meter-label">MISSILE</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-missile" id="hud-missile-bar" style="width: 0%;"></div>
              </div>
              <span class="meter-val" id="hud-missile-pct">DUMB-FIRE</span>
            </div>

            <div class="hud-powerup-badge" id="hud-powerup-badge" style="display: none;"></div>

            <div class="hud-beacon-pill" id="hud-beacon-pill" style="display: none;">
              📡 BEACON ACTIVE
            </div>
          </div>
        </div>

        <div class="hud-top-right">
          <div class="hud-stat-pill hud-config-pill" id="hud-config-pill">VOX: LOW (32³) | BELT: 100 | METEOR: 10s</div>
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

      <!-- 3D Target Lock Brackets -->
      <div class="hud-missile-lock-box" id="hud-missile-lock-box" style="display: none;">
        <div class="lock-bracket tl"></div>
        <div class="lock-bracket tr"></div>
        <div class="lock-bracket bl"></div>
        <div class="lock-bracket br"></div>
        <span class="lock-label" id="hud-lock-label">TRACKING 0%</span>
      </div>

      <div class="hud-combat-feed" id="hud-combat-feed"></div>

      <!-- 10-Second Democratic Map Reset Vote Interactive Banner -->
      <div class="hud-vote-banner" id="hud-vote-banner" style="display: none;">
        <div class="vote-header">
          <span class="vote-icon">🔄</span>
          <span class="vote-title">SECTOR RE-SEED VOTE</span>
          <span class="vote-countdown" id="hud-vote-countdown">10s</span>
        </div>
        <div class="vote-info" id="hud-vote-info">Initiated by Host</div>
        <div class="vote-tally-bar">
          <span class="vote-tally-label" id="hud-vote-tally">Votes: 1/1 agreed</span>
        </div>
        <div class="vote-buttons" id="hud-vote-buttons">
          <button class="vote-btn-accept" id="btn-vote-accept">✓ Accept (Y)</button>
          <button class="vote-btn-decline" id="btn-vote-decline">✕ Decline (N)</button>
        </div>
      </div>

      <div class="hud-respawn-overlay" id="hud-respawn-overlay" style="display: none;">
        <div class="respawn-title" id="hud-respawn-title">SHIP DESTROYED</div>
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
            <button class="action-touch-btn btn-thrust" id="btn-thrust" title="Hold to Thrust (W) | Double-Tap to BOOST">
              🚀 <strong>THRUST</strong>
              <span class="hud-boost-badge" id="hud-boost-badge">⚡ BOOST</span>
            </button>
            <button class="action-touch-btn btn-brake" id="btn-brake" title="Hold to Slow Down / Stop in 0.67s (S)">🛑 <strong>BRAKE</strong></button>
          </div>

          <!-- Dual Forward Arsenals & Dedicated Special Powerup -->
          <div class="touch-weapon-cluster">
            <button class="action-touch-btn btn-laser" id="btn-laser" title="Hold to Fire Laser Beam & Dig Asteroids (Space / LMB)">
              ⚡ <strong>LASER</strong>
              <small class="weapon-subtext">[SHIELD/DIG]</small>
            </button>
            <button class="action-touch-btn btn-missile" id="btn-missile" title="Homing Missile (F / RMB) - Aim at target for 3s to lock">
              <span id="btn-missile-icon">🚀</span> <strong id="btn-missile-text">MISSILE</strong>
              <small class="weapon-subtext" id="btn-missile-status">[AIM TO LOCK]</small>
            </button>
            <button class="action-touch-btn btn-special disabled" id="btn-special" title="Activate Special Power-Up (Key R)">
              <span id="btn-special-icon">✨</span> <strong id="btn-special-text">SPECIAL</strong>
              <small class="weapon-subtext" id="btn-special-desc">[EMPTY]</small>
            </button>
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
    `,this.container.appendChild(this.hudElement)}bindJoystick(){const e=document.getElementById("touch-joystick-container"),t=document.getElementById("joystick-base"),n=document.getElementById("joystick-knob");if(!e||!t||!n)return;const s=this.engine.playerShip.input,r=45;let o=null,a=!1;const c=(h,u)=>{const p=t.getBoundingClientRect(),g=p.left+p.width/2,y=p.top+p.height/2;let _=h-g,f=u-y;const d=Math.sqrt(_*_+f*f);d>r&&(_=_/d*r,f=f/d*r),n.style.transform=`translate(${_}px, ${f}px)`,s.analogPitch=-(f/r),s.analogYaw=-(_/r)},l=()=>{o=null,a=!1,n.style.transform="translate(0px, 0px)",s.analogPitch=0,s.analogYaw=0};e.addEventListener("touchstart",h=>{if(h.preventDefault(),h.stopPropagation(),o===null&&h.touches.length>0){const u=h.touches[0];o=u.identifier,c(u.clientX,u.clientY),ct.log("TOUCH",`Joystick touchstart at (${Math.round(u.clientX)}, ${Math.round(u.clientY)})`)}},{passive:!1}),e.addEventListener("touchmove",h=>{if(h.preventDefault(),h.stopPropagation(),o!==null){for(let u=0;u<h.touches.length;u++)if(h.touches[u].identifier===o){c(h.touches[u].clientX,h.touches[u].clientY);break}}},{passive:!1}),e.addEventListener("touchend",h=>{h.preventDefault(),l()},{passive:!1}),e.addEventListener("touchcancel",h=>{l()},{passive:!1}),e.addEventListener("pointerdown",h=>{h.pointerType!=="touch"&&(h.preventDefault(),a=!0,c(h.clientX,h.clientY))}),window.addEventListener("pointermove",h=>{a&&c(h.clientX,h.clientY)}),window.addEventListener("pointerup",()=>{a&&l()})}bindTouchControls(){const e=this.engine.playerShip.input,t=(a,c,l)=>{const h=document.getElementById(a);if(!h)return;let u=!1;const p=y=>{y&&(y.preventDefault(),y.stopPropagation()),!u&&(u=!0,c(),h.classList.add("active"),ct.log("INPUT",`Button [${a}] ACTIVATED`))},g=y=>{u&&(u=!1,l(),h.classList.remove("active"),ct.log("INPUT",`Button [${a}] RELEASED`))};h.addEventListener("touchstart",p,{passive:!1}),h.addEventListener("touchend",g,{passive:!1}),h.addEventListener("touchcancel",g,{passive:!1}),h.addEventListener("pointerdown",y=>{y.pointerType!=="touch"&&p(y)}),h.addEventListener("pointerup",g),h.addEventListener("pointerleave",g),window.addEventListener("pointerup",g)};t("btn-roll-left",()=>e.rollLeft=!0,()=>e.rollLeft=!1),t("btn-roll-right",()=>e.rollRight=!0,()=>e.rollRight=!1),t("btn-strafe-left",()=>{ot.playStrafeBurst(),e.strafeLeft=!0},()=>e.strafeLeft=!1),t("btn-strafe-right",()=>{ot.playStrafeBurst(),e.strafeRight=!0},()=>e.strafeRight=!1),t("btn-thrust",()=>{this.engine.triggerBoostAction(),e.thrust=!0},()=>e.thrust=!1),t("btn-brake",()=>e.brake=!0,()=>e.brake=!1),t("btn-laser",()=>this.engine.isFiringLaser=!0,()=>this.engine.isFiringLaser=!1);const n=document.getElementById("btn-missile");if(n){const a=c=>{c&&(c.preventDefault(),c.stopPropagation()),this.engine.weaponsSystem.triggerSecondary(!0,this.engine.playerShip,performance.now())};n.addEventListener("click",a),n.addEventListener("touchstart",a,{passive:!1})}const s=document.getElementById("btn-special");if(s){const a=c=>{c&&(c.preventDefault(),c.stopPropagation());const l=this.engine.playerShip.useSpecialPowerUp(this.engine);l&&this.showCombatMessage(l.message)};s.addEventListener("click",a),s.addEventListener("touchstart",a,{passive:!1})}const r=document.getElementById("hud-btn-copy");r&&r.addEventListener("click",()=>{const a=window.location.origin+window.location.pathname+`?room=${encodeURIComponent(this.engine.network.roomId)}`;navigator.clipboard.writeText(a).then(()=>{r.textContent="✅ Copied!",setTimeout(()=>r.textContent="📋 Invite",2e3)}).catch(()=>{prompt("Share this match link:",a)})});const o=document.getElementById("hud-btn-leave");o&&o.addEventListener("click",()=>{confirm("Leave current match and return to lobby?")&&(window.location.href=window.location.origin+window.location.pathname)})}bindDiagnostics(){const e=document.getElementById("hud-btn-diag"),t=document.getElementById("hud-diag-backdrop"),n=document.getElementById("btn-close-diag"),s=document.getElementById("btn-copy-diag-text"),r=document.getElementById("diag-text-display");!e||!t||(e.addEventListener("click",()=>{r&&(r.textContent=ct.generateDiagnosticReport()),t.style.display="flex"}),n&&n.addEventListener("click",()=>{t.style.display="none"}),s&&s.addEventListener("click",async()=>{await ct.copyToClipboard(),s.textContent="✅ Copied to Clipboard!",setTimeout(()=>{s.textContent="📋 Copy Log to Clipboard"},2500)}))}bindFullscreen(){const e=document.getElementById("hud-btn-fullscreen"),t=document.getElementById("btn-rotate-fullscreen"),n=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement){const r=document.documentElement;r.requestFullscreen?r.requestFullscreen().catch(()=>{}):r.webkitRequestFullscreen&&r.webkitRequestFullscreen();try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}else document.exitFullscreen?document.exitFullscreen().catch(()=>{}):document.webkitExitFullscreen&&document.webkitExitFullscreen()};e&&e.addEventListener("click",n),t&&t.addEventListener("click",n);const s=()=>{const r=!!(document.fullscreenElement||document.webkitFullscreenElement);e&&(e.textContent=r?"⛶ Exit":"⛶ Fullscreen")};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}bindMapResetVoting(){const e=document.getElementById("hud-btn-reset-map"),t=document.getElementById("hud-vote-banner"),n=document.getElementById("btn-vote-accept"),s=document.getElementById("btn-vote-decline"),r=document.getElementById("hud-vote-countdown"),o=document.getElementById("hud-vote-info"),a=document.getElementById("hud-vote-tally");e&&e.addEventListener("click",()=>{if(this.engine){const c=this.engine.requestMapResetVote();c&&c.error&&this.showCombatMessage(`⚠️ ${c.error}`)}}),n&&n.addEventListener("click",()=>{this.engine&&this.engine.castMapResetVote(!0)}),s&&s.addEventListener("click",()=>{this.engine&&this.engine.castMapResetVote(!1)}),window.addEventListener("keydown",c=>{this.isVoteActive&&(c.code==="KeyY"?(this.engine&&this.engine.castMapResetVote(!0),c.preventDefault()):c.code==="KeyN"&&(this.engine&&this.engine.castMapResetVote(!1),c.preventDefault()))}),this.engine&&this.engine.network&&this.engine.network.onMapResetVote(c=>{t&&(c.active?(this.isVoteActive=!0,t.style.display="flex",r&&(r.textContent=`${c.remainingTime}s`),o&&(o.textContent=`Initiated by ${c.initiatorName||"Host"}`),a&&(a.textContent=`Votes: ${c.yesCount}/${c.totalPeers} agreed (${c.remainingTime}s left)`)):(this.isVoteActive=!1,t.style.display="none"))})}showCombatMessage(e){const t=document.getElementById("hud-combat-feed");if(!t)return;const n=document.createElement("div");n.className="combat-feed-item",n.textContent=e,t.appendChild(n),setTimeout(()=>{n.classList.add("fade-out"),setTimeout(()=>n.remove(),400)},3500)}update(e){const t=document.getElementById("hud-room-title");t&&(t.textContent=this.engine.network.roomName||"Orion Sector");const n=document.getElementById("hud-peers-count");n&&(n.textContent=`👥 ${e.activePeersCount} Pilot${e.activePeersCount===1?"":"s"}`);const s=document.getElementById("hud-ping-val");s&&(s.textContent=`📡 ${e.avgPing}ms`);const r=document.getElementById("hud-config-pill");if(r&&this.engine&&this.engine.config){const te=this.engine.config,Me=(te.voxelQuality||"low").toUpperCase(),Te={low:"32³",medium:"48³",high:"64³"}[te.voxelQuality]||"32³",X=te.asteroidCount!==void 0?te.asteroidCount:100,Q=te.meteorFrequency?`${te.meteorFrequency}s`:"OFF";r.textContent=`VOX: ${Me} (${Te}) | BELT: ${X} | METEOR: ${Q}`}const o=document.getElementById("hud-shield-bar"),a=document.getElementById("hud-shield-num"),c=Math.round((e.shield!==void 0?e.shield:100)/(e.maxShield||100)*100);o&&(o.style.width=`${c}%`),a&&(a.textContent=`${c}%`);const l=document.getElementById("hud-hp-bar"),h=document.getElementById("hud-hp-num"),u=Math.round(e.hp/e.maxHp*100);l&&(l.style.width=`${u}%`,l.className=u>35?"gauge-bar-fill bar-hp":"gauge-bar-fill bar-hp bar-hp-critical"),h&&(h.textContent=`${u}%`);const p=document.getElementById("hud-beacon-pill");p&&(p.style.display=e.inactivityBeacon?"inline-flex":"none");const g=document.getElementById("hud-shield-status");g&&(e.invulnerable?(g.textContent="🛡️ INVULNERABLE",g.style.color="#00ffff"):e.hp<=35?(g.textContent="CRITICAL",g.style.color="#ff3344"):(g.textContent="ACTIVE",g.style.color="#00ff88"));const y=document.getElementById("hud-score-val");y&&(y.textContent=e.score);const _=document.getElementById("hud-kills-val");_&&(_.textContent=e.kills);const f=document.getElementById("hud-deaths-val");f&&(f.textContent=e.deaths);const d=document.getElementById("hud-speed-val");d&&(d.textContent=e.speed);const m=document.getElementById("hud-boost-badge"),v=document.getElementById("btn-thrust");m&&(e.boostReady?(m.textContent="⚡ BOOST",m.className="hud-boost-badge ready",v&&v.classList.add("boost-ready")):(m.textContent=`${e.boostCooldown}s`,m.className="hud-boost-badge cooling",v&&v.classList.remove("boost-ready")));const x=document.getElementById("hud-alive-val");x&&e.alivePilotsCount!==void 0&&(x.textContent=e.alivePilotsCount);const T=document.getElementById("hud-shield-title");T&&(e.isShieldBroken?(T.textContent="SHIELD [BROKEN]",T.style.color="#ff3344"):(T.textContent="SHIELD",T.style.color="#00ffff"));const E=document.getElementById("hud-laser-bar"),b=document.getElementById("hud-laser-pct"),R=Math.max(0,Math.min(100,Math.round(e.laserEnergy!==void 0?e.laserEnergy:100)));E&&(E.style.width=`${R}%`),b&&(b.textContent=`${R}%`);const w=document.getElementById("hud-missile-bar"),M=document.getElementById("hud-missile-pct"),L=document.getElementById("btn-missile"),O=document.getElementById("btn-missile-text"),S=document.getElementById("btn-missile-status"),P=e.missileLockProgress||0,U=!!e.missileLocked;if(w&&(w.style.width=`${Math.round(P*100)}%`,w.className=U?"gauge-bar-fill bar-missile locked":"gauge-bar-fill bar-missile"),M&&(U?(M.textContent="LOCKED",M.style.color="#ff3344"):P>0?(M.textContent=`${Math.round(P*100)}%`,M.style.color="#ffcc00"):(M.textContent="DUMB-FIRE",M.style.color="#00ffff")),L)if(U)L.classList.add("missile-locked"),O&&(O.textContent="MISSILE [LOCKED]"),S&&(S.textContent="🎯 [LOCKED - GUIDED]");else if(P>0){L.classList.remove("missile-locked"),O&&(O.textContent="LOCKING...");const te=(3*(1-P)).toFixed(1);S&&(S.textContent=`${Math.round(P*100)}% (${te}s)`)}else L.classList.remove("missile-locked"),O&&(O.textContent="MISSILE [DUMB-FIRE]"),S&&(S.textContent="[DUMB-FIRE / AIM 3s]");const I=document.getElementById("btn-special"),V=document.getElementById("btn-special-icon"),k=document.getElementById("btn-special-text"),F=document.getElementById("btn-special-desc");I&&(e.storedPowerUp?(I.classList.remove("disabled"),I.classList.add("ready"),I.style.setProperty("--powerup-glow",e.storedPowerUp.color||"#00ffff"),V&&(V.textContent=e.storedPowerUp.icon||"✨"),k&&(k.textContent=e.storedPowerUp.name||"SPECIAL"),F&&(F.textContent="[USE (KEY R)]")):(I.classList.add("disabled"),I.classList.remove("ready"),I.style.removeProperty("--powerup-glow"),V&&(V.textContent="✨"),k&&(k.textContent="SPECIAL"),F&&(F.textContent="[EMPTY]")));const B=document.getElementById("hud-missile-lock-box"),j=document.getElementById("hud-lock-label");if(B&&j){const te=e.missileTarget;te&&te.inFront&&P>0?(B.style.display="block",B.style.left=`${te.x}%`,B.style.top=`${te.y}%`,U?(B.className="hud-missile-lock-box locked",j.textContent=`🎯 LOCKED [${te.dist}u]`):(B.className="hud-missile-lock-box tracking",j.textContent=`TRACKING ${Math.round(P*100)}% [${te.dist}u]`)):B.style.display="none"}const se=document.getElementById("hud-cannon-bar"),le=document.getElementById("hud-cannon-pct");se&&(se.style.width=`${e.cannonEnergy||0}%`),le&&(le.textContent=`${e.cannonEnergy||0}%`);const H=document.getElementById("hud-powerup-badge");H&&(e.isInvisible?(H.style.display="inline-flex",H.textContent="👁️ CLOAKED",H.className="hud-powerup-badge cloak"):e.hasHologramDecoy?(H.style.display="inline-flex",H.textContent="👥 DECOY ARMED",H.className="hud-powerup-badge decoy"):H.style.display="none");const ee=document.getElementById("hud-respawn-overlay"),he=document.getElementById("hud-respawn-counter");ee&&he&&(e.isDead?(ee.style.display="flex",he.textContent=`Respawning in ${e.respawnCountdown}s...`):ee.style.display="none")}destroy(){this.hudElement&&this.hudElement.parentNode&&this.hudElement.parentNode.removeChild(this.hudElement)}}const Jo=document.getElementById("app"),dh=["Nebula-Orion","Andromeda-Deep","Centauri-Prime","Cygnus-Rift","Cassiopeia-Void","Pegasus-Belt","Vela-Pulsar","Perseus-Arm"];function fh(){const i=dh[Math.floor(Math.random()*dh.length)],e=Math.floor(100+Math.random()*900);return`${i}-${e}`}class Ry{constructor(){this.currentMode="lobby",this.engine=null,this.network=null,this.hud=null,this.playerName=localStorage.getItem("rockets_pilot_name")||`Pilot-${Math.floor(1e3+Math.random()*9e3)}`,this.init()}init(){const e=new URLSearchParams(window.location.search),t=e.get("room"),n={voxelQuality:e.get("quality")||"low",asteroidCount:e.get("density")?parseInt(e.get("density"),10):100,megaRadius:e.get("mega")?parseInt(e.get("mega"),10):2800,meteorFrequency:e.get("meteor")!==null?parseInt(e.get("meteor"),10):10};t?this.startMatch({roomId:t,roomName:t,mapSeed:Math.abs(this.hashCode(t)),config:n}):this.renderLobby()}hashCode(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return t}renderLobby(){this.currentMode="lobby",Jo.innerHTML=`
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
              <input type="text" id="sector-name-input" class="lobby-input" value="${fh()}" />
            </div>

            <!-- Room Configuration Drawer -->
            <div class="room-config-drawer" id="room-config-drawer">
              <div class="drawer-header">⚙️ Sector Physics & Voxel Parameters</div>
              <div class="config-grid">
                <div class="config-field">
                  <label for="voxel-quality-select">Voxel Quality</label>
                  <select id="voxel-quality-select" class="lobby-select">
                    <option value="low" selected>Low (32³)</option>
                    <option value="medium">Medium (48³)</option>
                    <option value="high">High (64³)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="asteroid-count-select">Belt Asteroids</label>
                  <select id="asteroid-count-select" class="lobby-select">
                    <option value="50">50 Asteroids</option>
                    <option value="100" selected>100 Asteroids</option>
                    <option value="150">150 Asteroids</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="mega-radius-select">Mega Asteroid Radius</label>
                  <select id="mega-radius-select" class="lobby-select">
                    <option value="1400">1,400u (Compact)</option>
                    <option value="2800" selected>2,800u (Standard)</option>
                    <option value="4000">4,000u (Colossal)</option>
                  </select>
                </div>
                <div class="config-field">
                  <label for="meteor-freq-select">Meteor Hazard</label>
                  <select id="meteor-freq-select" class="lobby-select">
                    <option value="0">0 (Off)</option>
                    <option value="20">20s (Mild)</option>
                    <option value="10" selected>10s (Standard)</option>
                    <option value="5">5s (Chaos)</option>
                  </select>
                </div>
              </div>
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
    `;const e=document.getElementById("pilot-name-input");e&&e.addEventListener("input",h=>{this.playerName=h.target.value.trim()||"Pilot",localStorage.setItem("rockets_pilot_name",this.playerName)});let t=window.__pwaDeferredPrompt;const n=document.getElementById("pwa-install-banner"),s=document.getElementById("btn-pwa-install");t&&n&&(n.style.display="flex"),window.addEventListener("beforeinstallprompt",h=>{h.preventDefault(),window.__pwaDeferredPrompt=h,n&&(n.style.display="flex")}),s&&s.addEventListener("click",()=>{const h=window.__pwaDeferredPrompt;h&&(h.prompt(),h.userChoice.then(()=>{n&&(n.style.display="none")}))});const r=document.getElementById("btn-create-match"),o=document.getElementById("sector-name-input");r&&r.addEventListener("click",()=>{var g,y,_;const h=o.value.trim()||fh(),u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-"),p={voxelQuality:((g=document.getElementById("voxel-quality-select"))==null?void 0:g.value)||"low",asteroidCount:parseInt((y=document.getElementById("asteroid-count-select"))==null?void 0:y.value,10)||100,megaRadius:parseInt((_=document.getElementById("mega-radius-select"))==null?void 0:_.value,10)||2800,meteorFrequency:document.getElementById("meteor-freq-select")?parseInt(document.getElementById("meteor-freq-select").value,10):10};this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u)),config:p})});const a=document.getElementById("btn-direct-join"),c=document.getElementById("join-room-input");a&&a.addEventListener("click",()=>{const h=c.value.trim();if(!h){alert("Please enter a Room Code or Sector ID to join.");return}const u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const l=document.getElementById("btn-refresh-rooms");l&&l.addEventListener("click",()=>{di.refreshRooms()}),di.init(),di.onRoomsUpdated(h=>{this.updateRoomsListUI(h)})}updateRoomsListUI(e){const t=document.getElementById("rooms-list-container");if(!t)return;if(!e||e.length===0){t.innerHTML='<div class="rooms-empty">No active matches found. Click <strong>LAUNCH SECTOR</strong> above to host one!</div>';return}t.innerHTML=e.map(s=>{var r,o,a,c;return`
      <div class="room-list-item">
        <div class="room-item-meta">
          <span class="room-item-name">🛰️ ${Qo(s.roomName||s.roomId)}</span>
          <div class="room-item-details">
            <span>👥 ${s.playerCount||1} Pilot${s.playerCount===1?"":"s"}</span>
            <span>👑 Host: Pilot-${(s.masterId||"Host").slice(0,4)}</span>
            <span class="room-ttl-badge">⏳ TTL: ${s.ttlSecondsRemaining}s</span>
          </div>
          <div class="room-config-badges">
            <span class="room-badge badge-vox">VOX: ${(((r=s.config)==null?void 0:r.voxelQuality)||"low").toUpperCase()}</span>
            <span class="room-badge badge-belt">BELT: ${((o=s.config)==null?void 0:o.asteroidCount)??100}</span>
            <span class="room-badge badge-mega">MEGA: ${((a=s.config)==null?void 0:a.megaRadius)??2800}u</span>
            <span class="room-badge badge-meteor">METEOR: ${(c=s.config)!=null&&c.meteorFrequency?s.config.meteorFrequency+"s":"OFF"}</span>
          </div>
        </div>
        <button class="btn-join-room-item" data-room-id="${Qo(s.roomId)}" data-room-name="${Qo(s.roomName||s.roomId)}" data-seed="${s.mapSeed||42}" data-config='${JSON.stringify(s.config||{})}'>
          JOIN SECTOR
        </button>
      </div>
    `}).join(""),t.querySelectorAll(".btn-join-room-item").forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-room-id"),o=s.getAttribute("data-room-name"),a=parseInt(s.getAttribute("data-seed"),10)||42;let c=null;try{c=JSON.parse(s.getAttribute("data-config"))}catch{}this.startMatch({roomId:r,roomName:o,mapSeed:a,config:c})})})}startMatch({roomId:e,roomName:t,mapSeed:n,config:s}){this.currentMode="game";const r=s||{voxelQuality:"low",asteroidCount:100,megaRadius:2800,meteorFrequency:10};Jo.innerHTML="";const o=document.createElement("div");o.id="game-canvas-container",o.style.width="100%",o.style.height="100%",o.style.position="relative",o.style.overflow="hidden",Jo.appendChild(o);const a=`${window.location.pathname}?room=${encodeURIComponent(e)}&quality=${encodeURIComponent(r.voxelQuality)}&density=${r.asteroidCount}&mega=${r.megaRadius}&meteor=${r.meteorFrequency}`;window.history.pushState({path:a},"",a),this.network=new tp({roomId:e,roomName:t,mapSeed:n,config:r,playerName:this.playerName,onCombatLog:c=>{this.hud&&this.hud.showCombatMessage(c)}}),this.engine=new Ty({container:o,network:this.network,mapSeed:n,config:r,onHudUpdate:c=>{this.hud&&this.hud.update(c)},onDeathNotice:c=>{this.hud&&this.hud.showCombatMessage(c)}}),this.hud=new Ay(o,this.engine);try{this.network.join()}catch(c){console.error("[Network] joinRoom exception:",(c==null?void 0:c.message)||c)}this.engine.start()}}function Qo(i){return i?i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}new Ry;
//# sourceMappingURL=index-CbMEvcK7.js.map
