var ju=Object.defineProperty;var Ku=(i,e,t)=>e in i?ju(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var zt=(i,e,t)=>Ku(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const Ka=Object.freeze,Xn=0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,Vs=0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,uh=0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,dh=0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,Zu=Ka({p:Xn,n:Vs,h:1n,a:0n,b:7n,Gx:uh,Gy:dh}),cn=32,wc=i=>i instanceof Uint8Array||ArrayBuffer.isView(i)&&i.constructor.name==="Uint8Array"&&i.BYTES_PER_ELEMENT===1,Jt=(i,e,t="")=>{if(wc(i)&&(e===void 0||i.length===e))return i;const n=wc(i),s=e!==void 0?` of length ${e}`:"",r=n?`length=${i.length}`:`type=${typeof i}`,o=(t?`"${t}" `:"")+"expected Uint8Array"+s+", got "+r;throw n?new RangeError(o):new TypeError(o)},Ju=i=>Uint8Array.from(i),Qu=(i,e,t)=>Ju(Jt(i,t,e)),fh=(i,e)=>i.toString(16).padStart(e,"0"),ph=i=>{let e="";for(const t of Jt(i))e+=fh(t,2);return e},mh=i=>{const e="hex invalid";if(typeof i!="string")throw new TypeError(e);if(i.length%2||!/^[\da-f]*$/i.test(i))throw new RangeError(e);const t=new Uint8Array(i.length/2);for(let n=0,s=0;n<t.length;n++,s+=2){const r=i.charCodeAt(s),o=i.charCodeAt(s+1);t[n]=((r&15)+(r>>6)*9)*16+(o&15)+(o>>6)*9}return t},Ec=()=>{var e;const i=(e=globalThis==null?void 0:globalThis.crypto)==null?void 0:e.subtle;if(i)return i;throw new Error("crypto.subtle must be defined, consider polyfill")},Ki=(...i)=>{let e=0;for(const s of i)e+=Jt(s).length;const t=new Uint8Array(e);let n=0;for(const s of i)t.set(s,n),n+=s.length;return t},Za=(i=cn)=>{const e=globalThis==null?void 0:globalThis.crypto;if(typeof(e==null?void 0:e.getRandomValues)!="function")throw new Error("crypto.getRandomValues must be defined, consider polyfill");return e.getRandomValues(new Uint8Array(i))},ed=BigInt,Hs=(i,e,t,n="bad number: out of range")=>{if(typeof i!="bigint")throw new TypeError(n);if(e<=i&&i<t)return i;throw new RangeError(n)},Ce=(i,e=Xn)=>(i%=e)>=0n?i:e+i,Wr=i=>Ce(i,Vs),td=(i,e)=>{if(i===0n)throw new Error("invert: expected non-zero number");if(e<=1n)throw new Error("invert: expected modulus > 1, got "+e);let t=Ce(i,e),n=e,s=0n,r=1n;for(;t!==0n;){const a=n/t,c=n-t*a,l=s-r*a;n=t,t=c,s=r,r=l}if(n!==1n)throw new Error("invert: does not exist");return Ce(s,e)},gh=i=>{const e=rd[i];if(typeof e!="function")throw new Error("hashes."+i+" not set");return e},Tc=(i,e,t)=>Jt(gh(i)(e,t),cn,"digest"),bc=async(i,e,t)=>Jt(await gh(i)(e,t),cn,"digest"),no=i=>{if(i instanceof Kn)return i;throw new TypeError("Point expected")},io="bad point: not on curve",vh=i=>Ce(Ce(i*i)*i+7n),Ac=i=>Hs(i,0n,Xn),Cs=i=>Hs(i,1n,Xn),_h=i=>Hs(i,1n,Vs),Xr=i=>!(i&1n),nd=i=>Uint8Array.of(Xr(i)?2:3),yh=i=>{const e=vh(Cs(i));let t=1n;for(let n=e,s=(Xn+1n)/4n;s>0n;s>>=1n)s&1n&&(t=t*n%Xn),n=n*n%Xn;if(Ce(t*t)!==e)throw new Error("sqrt invalid");return new Kn(i,Xr(t)?t:Ce(-t),1n)},En=class En{constructor(e,t,n){zt(this,"X");zt(this,"Y");zt(this,"Z");this.X=Ac(e),this.Y=Cs(t),this.Z=Ac(n),Ka(this)}static CURVE(){return Zu}static fromAffine(e){const{x:t,y:n}=e;return t===0n&&n===0n?Ps:new En(t,n,1n)}static fromBytes(e){Jt(e);const t=e.length,n=e[0],s=Or(e,1,33);try{if(t===33&&(n===2||n===3)){const r=yh(s);return n===3?r.negate():r}if(t===65&&n===4)return new En(s,Or(e,33,65),1n).assertValidity()}catch{throw new Error(io)}throw new Error(io)}static fromHex(e){return En.fromBytes(mh(e))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){const{X:t,Y:n,Z:s}=this,{X:r,Y:o,Z:a}=no(e);return Ce(t*a)===Ce(r*s)&&Ce(n*a)===Ce(o*s)}is0(){return this.Z===0n}negate(){return new En(this.X,Ce(-this.Y),this.Z)}double(){return this.add(this)}add(e){const{X:t,Y:n,Z:s}=this,{X:r,Y:o,Z:a}=no(e),c=0n,l=7n;let h=0n,u=0n,f=0n;const m=Ce(l*3n);let g=Ce(t*r),v=Ce(n*o),p=Ce(s*a),d=Ce(t+n),_=Ce(r+o);d=Ce(d*_),_=Ce(g+v),d=Ce(d-_),_=Ce(t+s);let x=Ce(r+a);return _=Ce(_*x),x=Ce(g+p),_=Ce(_-x),x=Ce(n+s),h=Ce(o+a),x=Ce(x*h),h=Ce(v+p),x=Ce(x-h),f=Ce(c*_),h=Ce(m*p),f=Ce(h+f),h=Ce(v-f),f=Ce(v+f),u=Ce(h*f),v=Ce(g+g),v=Ce(v+g),p=Ce(c*p),_=Ce(m*_),v=Ce(v+p),p=Ce(g-p),p=Ce(c*p),_=Ce(_+p),g=Ce(v*_),u=Ce(u+g),g=Ce(x*_),h=Ce(d*h),h=Ce(h-g),g=Ce(d*v),f=Ce(x*f),f=Ce(f+g),new En(h,u,f)}subtract(e){return this.add(no(e).negate())}multiply(e,t=!0){if(!t&&e===0n)return Ps;if(_h(e),e===1n)return this;if(this.equals(gi))return fd(e).p;let n=Ps,s=gi,r=this;for(let o=0;t?o<256:e>0n;o++)e&1n?n=n.add(r):t&&(s=s.add(r)),r=r.double(),e>>=1n;return n}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){const{X:e,Y:t,Z:n}=this;if(n===0n)return{x:0n,y:0n};if(n===1n)return{x:e,y:t};const s=td(n,Xn);if(Ce(n*s)!==1n)throw new Error("inverse invalid");return{x:Ce(e*s),y:Ce(t*s)}}assertValidity(){const{x:e,y:t}=this.toAffine();if(Cs(e),Cs(t),Ce(t*t)!==vh(e))throw new Error(io);return this}toBytes(e=!0){const{x:t,y:n}=this.assertValidity().toAffine(),s=Cn(t);return e?Ki(nd(n),s):Ki(Uint8Array.of(4),s,Cn(n))}toHex(e){return ph(this.toBytes(e))}};zt(En,"BASE"),zt(En,"ZERO");let Kn=En;const gi=new Kn(uh,dh,1n),Ps=new Kn(0n,1n,0n);Kn.BASE=gi;Kn.ZERO=Ps;const id=(i,e,t)=>gi.multiply(e,!1).add(i.multiply(t,!1)).assertValidity(),Si=i=>ed("0x"+(ph(i)||"0")),Or=(i,e,t)=>Si(i.subarray(e,t)),Cn=i=>mh(fh(Hs(i,0n,2n**256n),cn*2)),sd=i=>{const e=Si(Jt(i,cn,"secret key"));return Hs(e,1n,Vs,"invalid secret key: outside of range")},Rc="SHA-256",rd={hmacSha256Async:async(i,e)=>{const t=Ec(),n=await t.importKey("raw",i,{name:"HMAC",hash:Rc},!1,["sign"]);return new Uint8Array(await t.sign("HMAC",n,e))},hmacSha256:void 0,sha256Async:async i=>new Uint8Array(await Ec().digest(Rc,i)),sha256:void 0},od=i=>{if(i=i===void 0?Za(48):i,Jt(i),i.length<48||i.length>1024)throw new RangeError("expected 48-1024b");const e=Ce(Si(i),Vs-1n);return Cn(e+1n)},ad=i=>e=>{const t=od(e);return{secretKey:t,publicKey:i(t)}},xh=i=>Uint8Array.from("BIP0340/"+i,e=>e.charCodeAt(0)),Jo=(i,...e)=>{const t=Tc("sha256",xh(i));return Tc("sha256",Ki(t,t,...e))},Qo=(i,...e)=>bc("sha256Async",xh(i)).then(t=>bc("sha256Async",Ki(t,t,...e))),Ja=i=>{const e=sd(i),t=gi.multiply(e),{x:n,y:s}=t.assertValidity().toAffine(),r=Xr(s)?e:Wr(-e),o=Cn(n);return{d:r,px:o}},Qa=i=>Wr(Si(i)),Mh=(...i)=>Qa(Jo("challenge",...i)),Sh=async(...i)=>Qa(await Qo("challenge",...i)),wh=i=>Ja(i).px,cd=ad(wh),Eh=(i,e,t)=>{const n=Qu(i,"message"),{px:s,d:r}=Ja(e);return{m:n,px:s,d:r,a:Jt(t,cn)}},Th=i=>{const e=Qa(i);if(e===0n)throw new Error("sign failed: k is zero");const{px:t,d:n}=Ja(Cn(e));return{rx:t,k:n}},bh=(i,e,t,n)=>Ki(e,Cn(Wr(i+t*n))),Ah="invalid signature produced",ld=(i,e,t=Za(cn))=>{const{m:n,px:s,d:r,a:o}=Eh(i,e,t),a=Cn(r^Si(Jo("aux",o))),{rx:c,k:l}=Th(Jo("nonce",a,s,n)),h=bh(l,c,Mh(c,s,n),r);if(!Ch(h,n,s))throw new Error(Ah);return h},hd=async(i,e,t=Za(cn))=>{const{m:n,px:s,d:r,a:o}=Eh(i,e,t),a=Cn(r^Si(await Qo("aux",o))),{rx:c,k:l}=Th(await Qo("nonce",a,s,n)),h=bh(l,c,await Sh(c,s,n),r);if(!await Ph(h,n,s))throw new Error(Ah);return h},ud=(i,e)=>i instanceof Promise?i.then(e):e(i),Rh=(i,e,t,n)=>{const s=Jt(i,64,"signature"),r=Jt(e,void 0,"message"),o=Jt(t,cn,"publicKey");let a,c,l,h;try{const u=Si(o);a=yh(u),c=Cs(Or(s,0,cn)),l=_h(Or(s,cn,64)),h=Ki(Cn(c),o,r)}catch{return!1}return ud(n(h),u=>{try{const{x:f,y:m}=id(a,l,Wr(-u)).toAffine();return!(!Xr(m)||f!==c)}catch{return!1}})},Ch=(i,e,t)=>Rh(i,e,t,Mh),Ph=async(i,e,t)=>Rh(i,e,t,Sh),Lh=Ka({keygen:cd,getPublicKey:wh,sign:ld,verify:Ch,signAsync:hd,verifyAsync:Ph}),dd=()=>{const i=[];let e=gi,t=e;for(let n=0;n<33;n++){t=e,i.push(t);for(let s=1;s<128;s++)t=t.add(e),i.push(t);e=t.double()}return i};let Cc;const Pc=(i,e)=>{const t=e.negate();return i?t:e},fd=i=>{const e=Cc||(Cc=dd());let t=Ps,n=gi;for(let s=0;s<33;s++){let r=Number(i&255n);i>>=8n,r>128&&(r-=256,i+=1n);const o=s*128,a=o+Math.abs(r)-1,c=s%2!==0,l=r<0;r===0?n=n.add(Pc(c,e[o])):t=t.add(Pc(l,e[a]))}if(i!==0n)throw new Error("invalid wnaf");return{p:t,f:n}},{floor:ea,min:pd,sin:md}=Math,Lt="Trystero",ec=(i,e)=>Array(i).fill(void 0).map(e),gd="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",wi=i=>ec(i,()=>gd[ea(Math.random()*62)]??"").join(""),Ct=wi(20),Ei=Promise.all.bind(Promise),Dh=typeof window<"u",{entries:Zi,fromEntries:Ih,keys:on,values:Sn}=Object,St=()=>{},Uh="candidate",je=i=>(i!==null&&clearTimeout(i),null),qe=i=>new Error(`${Lt}: ${i}`),Ji=(i,e)=>i instanceof Error&&i.message?i.message:typeof i=="string"&&i?i:Ft(i??e),Wn=(i,e)=>i instanceof Error?i:qe(Ji(i,e)),vd=new TextEncoder,_d=new TextDecoder,Tn=i=>vd.encode(i),mi=i=>_d.decode(i),Ns=i=>i.reduce((e,t)=>e+t.toString(16).padStart(2,"0"),""),Qi=(...i)=>i.join("@"),yd=(i,e)=>{const t=[...i],n=()=>{const r=md(e++)*1e4;return r-ea(r)};let s=t.length;for(;s;){const r=ea(n()*s--),o=t[s];t[s]=t[r],t[r]=o}return t},xd=(i,e,t,n=!1)=>{var s,r;return((s=i.relayConfig)==null?void 0:s.urls)||(n?yd(e,Nh(i.appId)):e).slice(0,((r=i.relayConfig)==null?void 0:r.redundancy)??t)},Ft=JSON.stringify,Gs=i=>{try{return JSON.parse(i)}catch{throw qe(`failed to parse JSON: ${i}`)}},Nh=(i,e=Number.MAX_SAFE_INTEGER)=>i.split("").reduce((t,n)=>t+n.charCodeAt(0),0)%e,Lc=3333,Md=6e4,fs={};let Ls=null,Ds=null;const Sd=()=>{Ls||(Ls=new Promise(i=>{Ds=i}).finally(()=>{Ds=null,Ls=null}))},wd=()=>{Ds==null||Ds()},Ed=(i,e,t)=>{const n={};let s=!1,r=!1,o,a=St;n.isClosed=!1,n.ready=new Promise(l=>a=l);const c=()=>{if(n.isClosed)return;o=void 0,r=!1;const l=new WebSocket(i);l.onclose=()=>{if(n.isClosed||r)return;if(r=!0,Ls){Ls.then(c);return}const h=fs[i]??(fs[i]=Lc);o=setTimeout(c,Math.random()*h),fs[i]=pd(h*2,Md)},l.onmessage=h=>e(String(h.data)),n.socket=l,n.url=l.url,l.onopen=()=>{const h=s;s=!0,a(n),fs[i]=Lc,h&&(t==null||t())},n.send=h=>{l.readyState===1&&l.send(h)}};return n.close=()=>{n.isClosed=!0,o!==void 0&&(clearTimeout(o),o=void 0),n.socket.close()},c(),n},Td=i=>{const e={},t=new WeakMap,n=o=>{const a=t.get(o);if(!a)throw qe("relay bookkeeping missing registration for relay client");return a},s=()=>{const o={},a=c=>o[c]??(o[c]={});return{forKey:a,forRelay:c=>a(n(c))}},r=(o,a)=>(e[o]=a,t.set(a,o),a);return{register:(o,a)=>{const c=e[o];return c||r(o,a())},keyOf:n,scoped:s,getSockets:()=>Ih(Zi(e).flatMap(([o,a])=>{const c=i(a);return c?[[o,c]]:[]}))}},bd=()=>{if(Dh){const i=new AbortController;return addEventListener("online",wd,{signal:i.signal}),addEventListener("offline",Sd,{signal:i.signal}),()=>i.abort()}return St},tc="AES-GCM",so={},Ad=i=>btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(i)))),Rd=i=>{const e=atob(i);return new Uint8Array(e.length).map((t,n)=>e.charCodeAt(n)).buffer},qr=async(i,e)=>new Uint8Array(await crypto.subtle.digest(i,Tn(e))),es=async i=>so[i]??(so[i]=Array.from(await qr("SHA-1",i)).map(e=>e.toString(36)).join("")),Cd=async(i,e,t)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},Tn(`${i}:${e}:${t}`)),{name:tc},!1,["encrypt","decrypt"]),Pd=async(i,e)=>Ns(await qr("SHA-256",`${Lt}:${i}:${e}`)),Fh="$",Oh=",",Ld=async(i,e)=>{const t=crypto.getRandomValues(new Uint8Array(16));return t.join(Oh)+Fh+Ad(await crypto.subtle.encrypt({name:tc,iv:t},await i,Tn(e)))},Dd=async(i,e)=>{const[t,n]=e.split(Fh);return mi(await crypto.subtle.decrypt({name:tc,iv:new Uint8Array((t==null?void 0:t.split(Oh).map(Number))??[])},await i,Rd(n??"")))},Id=18e4;var Ud=class{constructor(i){zt(this,"makeOffer");zt(this,"leased",new Map);zt(this,"destroyed",!1);this.makeOffer=i}claimLeased(i){const e=this.leased.get(i);e&&(je(e),this.leased.delete(i))}reclaimLeased(i){this.leased.has(i)&&(this.claimLeased(i),i.destroy())}checkout(i,e,t){const n=async(s=!1)=>{if(this.destroyed)throw qe("room left while preparing offer");const r=this.makeOffer();try{const o=await t(r);if(this.destroyed)throw qe("room left while preparing offer");return e?(this.leased.set(r,setTimeout(()=>{this.leased.delete(r),r.destroy()},Id)),{peer:r,offer:o,claim:()=>this.claimLeased(r),reclaim:()=>this.reclaimLeased(r)}):{peer:r,offer:o}}catch(o){if(r.destroy(),!s&&!this.destroyed)return n(!0);throw o}};return Ei(ec(i,()=>n()))}getOffers(i,e){return this.checkout(i,!0,e)}destroy(){this.destroyed=!0,this.leased.forEach((i,e)=>{je(i),e.destroy()}),this.leased.clear()}};const ro=qe("incorrect password for overlapping room"),Nd=(i,e,t)=>{const n=o=>qr("SHA-256",`${o}:${i}:${e}:${t}`).then(Ns),s=async(o,a,c)=>{if(!i)return;if(c){const h=wi(36);await o({__trystero_pw:"challenge",c:h});const{data:u}=await a();if(!u||typeof u!="object"||u.__trystero_pw!=="response"||typeof u.h!="string")throw ro;const f=await n(h);if(u.h!==f)throw ro;return}const{data:l}=await a();if(!l||typeof l!="object"||l.__trystero_pw!=="challenge"||typeof l.c!="string")throw ro;await o({__trystero_pw:"response",h:await n(l.c)})};return{run:s,compose:o=>i||o?async(a,c,l,h)=>{await s(c,l,h),await(o==null?void 0:o(a,c,l,h))}:void 0}},Fd=i=>{const e=Ji(i,"unknown error");return e.startsWith("handshake ")?e:`handshake failed: ${e}`},Od=({onPeerHandshake:i,onHandshakeError:e,handshakeTimeoutMs:t,sendHandshakeData:n,sendHandshakeReady:s,onActivate:r,onFailure:o})=>{const a={},c=(u,f)=>{const m=a[u];!m||f&&m.peer!==f||m.isActive||!m.didLocalHandshakePass||!m.didReceiveRemoteReady||(m.isActive=!0,m.handshakeTimer=je(m.handshakeTimer),r(u,m.peer))},l=(u,f,m)=>{const g=a[u];if(!g||g.peer!==f)return;const v=Fd(m);e==null||e(u,v),o(u,f,qe(v))},h=(u,f)=>{const m=a[u];!m||m.peer!==f||m.isActive||(m.didLocalHandshakePass=!0,s("",u).catch(g=>l(u,f,qe(`failed sending handshake readiness: ${Ji(g,"unknown send failure")}`))),c(u,f))};return{addPeer:(u,f)=>{a[u]={peer:f,isActive:!1,didLocalHandshakePass:!1,didReceiveRemoteReady:!1,handshakeTimer:null,pendingHandshakePayloads:[],handshakeWaiters:[]}},clearPeer:(u,f)=>{const m=a[u];m&&(m.handshakeTimer=je(m.handshakeTimer),m.pendingHandshakePayloads.length=0,m.handshakeWaiters.splice(0).forEach(g=>g.reject(f)),delete a[u])},canReceiveFromPeer:(u,f)=>{const m=a[u];return!!(m&&(m.isActive||f))},start:(u,f)=>{const m=a[u];if(!m||m.peer!==f)return;m.handshakeTimer=setTimeout(()=>l(u,f,qe(`handshake timed out after ${t}ms`)),t);const g=async(d,_)=>{await n(d,u,_)},v=()=>new Promise((d,_)=>{const x=a[u];if(!x||x.peer!==f){_(qe("peer disconnected during handshake"));return}const y=x.pendingHandshakePayloads.shift();if(y){d(y);return}x.handshakeWaiters.push({resolve:d,reject:A=>_(A)})}),p=Ct<u;Promise.resolve(i==null?void 0:i(u,g,v,p)).then(()=>h(u,f)).catch(d=>l(u,f,Wn(d,"handshake failed")))},receiveHandshakeData:(u,f,m)=>{const g=a[f];if(!g||g.isActive)return;const v=m===void 0?{data:u}:{data:u,metadata:m},p=g.handshakeWaiters.shift();if(p){p.resolve(v);return}if(g.pendingHandshakePayloads.length>=16){l(f,g.peer,qe("too many pending handshake messages"));return}g.pendingHandshakePayloads.push(v)},receiveHandshakeReady:u=>{const f=a[u];!f||f.isActive||(f.didReceiveRemoteReady=!0,c(u))}}},kh=16384,ta=1e4,kr=12e4,kd=15e3,Bd=150,zd=5e3,Dc="icecandidate",Ic="icegatheringstatechange",Vd="iceconnectionstatechange",ps="offer",Hd="answer",Gd=/out of range/i,Wd=128,Xd=8192,Uc=i=>i.replace(/ (\S+\.local) (\d+) typ host/g," 127.0.0.1 $2 typ host");var Nc=(i,{trickleIce:e,rtcConfig:t,rtcPolyfill:n,turnConfig:s,_test_only_mdnsHostFallbackToLoopback:r})=>{const o=new(n??RTCPeerConnection)({iceServers:Fc.concat(s??[]),...t}),a={},c=new Set,l=[],h=[];let u=null;const f=e!==!1,m=[],g=[];let v,p=!1,d=!1,_=null,x=null,y=!1;const A=Y=>{v&&(v(Y),v=void 0)},b=()=>x=je(x),R=()=>{var Y;y||(y=!0,c.forEach(ee=>ee()),u=je(u),h.length=0,b(),(Y=a.close)==null||Y.call(a))},D=Y=>{Y.type===ps&&(A(Y),!a.signal&&!o.remoteDescription)||(a.signal?a.signal(Y):l.push(Y))},w=Y=>{const ee=a.signal;a.signal=ue=>{ee==null||ee(ue),Y(ue)},l.length>0&&l.splice(0).forEach(ue=>{var F;return(F=a.signal)==null?void 0:F.call(a,ue)})},M=Y=>r?Uc(Y):Y,I=Y=>{if(!r||typeof Y.candidate!="string")return Y;const ee=Uc(Y.candidate);return ee===Y.candidate?Y:{...Y,candidate:ee}},H=Y=>{var ee,ue;return{type:((ee=Y.localDescription)==null?void 0:ee.type)??ps,sdp:M(((ue=Y.localDescription)==null?void 0:ue.sdp)??"")}},S=()=>{var ee,ue;const Y=(ee=o.remoteDescription)==null?void 0:ee.sdp;return Y?((ue=Y.match(/a=ice-ufrag:([^\s]+)/))==null?void 0:ue[1])??null:null},L=()=>{var Y,ee;return(((ee=(Y=o.remoteDescription)==null?void 0:Y.sdp)==null?void 0:ee.match(/^m=/gm))??[]).length},N=Y=>{if(!o.remoteDescription)return!1;const ee=L();if(typeof Y.sdpMLineIndex=="number"&&ee>0&&Y.sdpMLineIndex>=ee)return!1;const ue=S();return!(ue&&Y.usernameFragment&&Y.usernameFragment!==ue)},P=async Y=>{try{return await o.addIceCandidate(Y),!0}catch(ee){if(ee instanceof Error&&Gd.test(ee.message)&&typeof Y.sdpMLineIndex=="number")return!1;throw ee}},z=Y=>{m.length>=Wd&&m.shift(),m.push(Y)},k=async()=>{if(!o.remoteDescription||m.length===0)return;const Y=S(),ee=m.splice(0),ue=[];for(const F of ee)if(!(Y&&F.usernameFragment&&F.usernameFragment!==Y)){if(!N(F)){ue.push(F);continue}await P(F)||ue.push(F)}ue.forEach(z)},O=async Y=>{if(N(Y)){await P(Y)||z(Y);return}z(Y)},B=Y=>{Y.binaryType="arraybuffer",Y.bufferedAmountLowThreshold=65535;const ee=()=>{console.warn(`${Lt}: invalid or excessive data before handler registration; disconnecting peer`),Y.close(),o.close(),R()};Y.onmessage=ue=>{const F=ue.data;if(!y){if(!(F instanceof ArrayBuffer)&&!ArrayBuffer.isView(F)||F.byteLength>16515){ee();return}if(a.data)a.data(F);else{if(h.length>=64){ee();return}u||(u=setTimeout(ee,ta)),h.push(F)}}},Y.onopen=()=>{var ue;return(ue=a.connect)==null?void 0:ue.call(a)},Y.onclose=R,Y.onerror=({error:ue})=>{var F;y||(ue==null?void 0:ue.errorDetail)==="sctp-failure"&&(ue.sctpCauseCode===12||/^User-Initiated Abort\b/.test(ue.message))||(F=a.error)==null||F.call(a,Wn(ue,"data channel error"))}},Z=(t==null?void 0:t.iceServers)??Fc.concat(s??[]),ce=Y=>Z.some(({urls:ee})=>(Array.isArray(ee)?ee:[ee]).some(ue=>Y.test(ue))),Me=ce(/^turns?:/i),X=!Me&&ce(/^stuns?:/i),Q=Me?/\btyp relay\b/:X?/\btyp (?:srflx|relay|prflx)\b/:/\btyp (?:host|srflx|relay|prflx)\b/,le=async Y=>(await new Promise(ee=>{let ue=null,F=null;const Fe=()=>{je(ue),je(F),Y.removeEventListener(Ic,ke),Y.removeEventListener(Dc,Ee),c.delete(Fe),ee()},Ne=(Te="")=>{var C;const me=`${((C=Y.localDescription)==null?void 0:C.sdp)??""}
${Te}`;Q.test(me)&&(je(F),F=setTimeout(Fe,Bd))},ke=()=>{Y.iceGatheringState==="complete"||y?Fe():Ne()},Ee=Te=>{const{candidate:me}=Te;me?Ne(me.candidate):Fe()};c.add(Fe),ue=setTimeout(Fe,kd),Y.addEventListener(Ic,ke),Y.addEventListener(Dc,Ee),ke()}),H(Y)),ae=async()=>{const Y=f?H(o):await le(o);return y||D(Y),Y};i?(_=o.createDataChannel("data"),B(_)):o.ondatachannel=({channel:Y})=>{_=Y,B(Y)};const Se=async(Y=!1)=>{var ee,ue;if(o.connectionState==="closed"||!Y&&(p||o.signalingState!=="stable")){o.connectionState==="closed"&&A();return}try{return p=!0,Y&&(o.remoteDescription&&o.signalingState!=="stable"&&o.signalingState!=="closed"&&((ee=o.localDescription)==null?void 0:ee.type)===ps&&await o.setLocalDescription({type:"rollback"}),typeof o.restartIce=="function"&&o.restartIce()),await o.setLocalDescription(Y?await o.createOffer({iceRestart:!0}):void 0),await ae()}catch(F){Y||A(),(ue=a.error)==null||ue.call(a,Wn(F,"failed to create local offer"))}finally{p=!1}};o.onnegotiationneeded=async()=>Se(!1),o.onicecandidate=({candidate:Y})=>{if(!f||!Y)return;const ee=I(typeof Y.toJSON=="function"?Y.toJSON():{candidate:Y.candidate,sdpMid:Y.sdpMid,sdpMLineIndex:Y.sdpMLineIndex,usernameFragment:Y.usernameFragment});D({type:Uh,sdp:JSON.stringify(ee)})};const Le=()=>{if(o.connectionState==="failed"||o.connectionState==="closed"||o.iceConnectionState==="failed"||o.iceConnectionState==="closed"){R();return}if(o.connectionState==="connected"||o.connectionState==="connecting"||o.iceConnectionState==="connected"||o.iceConnectionState==="completed"||o.iceConnectionState==="checking"){b();return}if(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected"){x||(x=setTimeout(()=>{x=null,(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected")&&R()},zd));return}};o.onconnectionstatechange=Le,o.addEventListener(Vd,Le),o.ontrack=Y=>{var ue,F;const ee=Y.streams[0];if(ee){if(!a.track&&!a.stream){g.push({track:Y.track,stream:ee});return}(ue=a.track)==null||ue.call(a,Y.track,ee),(F=a.stream)==null||F.call(a,ee)}};const Ue=i?new Promise(Y=>{v=Y}):Promise.resolve();return i&&queueMicrotask(()=>{var Y;!p&&o.signalingState==="stable"&&!o.localDescription&&o.connectionState!=="closed"&&((Y=o.onnegotiationneeded)==null||Y.call(o,new Event("negotiationneeded")))}),{connection:o,get channel(){return _},get isDead(){return o.connectionState==="closed"},getOffer:async(Y=!1)=>{var ee;if(i)return Y?Se(!0):v?Ue:((ee=o.localDescription)==null?void 0:ee.type)===ps?f?H(o):le(o):Ue},async signal(Y){var ee,ue,F;if(Y.type==="candidate"){if(Y.sdp.length>Xd)return;try{const Fe=JSON.parse(Y.sdp);Fe&&typeof Fe=="object"&&await O(I(Fe))}catch(Fe){(ee=a.error)==null||ee.call(a,Wn(Fe,"failed to parse remote candidate"))}return}if(!((_==null?void 0:_.readyState)==="open"&&!((ue=Y.sdp)!=null&&ue.includes("a=rtpmap"))))try{const Fe={...Y,sdp:M(Y.sdp)};if(Y.type===ps){const Ne=p||o.signalingState!=="stable"&&!d;return Ne&&i?void 0:(Ne&&o.signalingState!=="stable"?await Ei([o.setLocalDescription({type:"rollback"}),o.setRemoteDescription(Fe)]):await o.setRemoteDescription(Fe),await k(),await o.setLocalDescription(),await ae())}if(Y.type===Hd){d=!0;try{await o.setRemoteDescription(Fe),await k()}finally{d=!1}}}catch(Fe){(F=a.error)==null||F.call(a,Wn(Fe,"failed to apply remote signal"))}},sendData:Y=>_==null?void 0:_.send(Y),destroy:()=>{b(),A(),_==null||_.close(),o.close(),p=!1,d=!1,R()},setHandlers:Y=>{const{signal:ee,...ue}=Y;Object.assign(a,ue),a.data&&h.length>0&&(u=je(u),h.splice(0).forEach(F=>{var Fe;return(Fe=a.data)==null?void 0:Fe.call(a,F)})),ee&&w(ee),(a.track||a.stream)&&g.length>0&&g.splice(0).forEach(({track:F,stream:Fe})=>{var Ne,ke;(Ne=a.track)==null||Ne.call(a,F,Fe),(ke=a.stream)==null||ke.call(a,Fe)})},addStream:Y=>Y.getTracks().forEach(ee=>o.addTrack(ee,Y)),removeStream:Y=>o.getSenders().filter(ee=>ee.track&&Y.getTracks().includes(ee.track)).forEach(ee=>o.removeTrack(ee)),addTrack:(Y,ee)=>o.addTrack(Y,ee),removeTrack:Y=>{const ee=o.getSenders().find(ue=>ue.track===Y);ee&&o.removeTrack(ee)},replaceTrack:(Y,ee)=>{const ue=o.getSenders().find(F=>F.track===Y);if(ue)return ue.replaceTrack(ee)}}};const Fc=[...ec(3,(i,e)=>`stun:stun${e||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(i=>({urls:i})),qd=1024,$d=64,Yd=128,jd=8,Kd=new Uint8Array,Zd=(i,e)=>{let t;try{t=i()}catch{return e(!1)}return typeof t=="boolean"?e(t):Promise.resolve(t).then(n=>e(n===!0),()=>e(!1))},Oc=(i,e,t)=>e===2?t?i.slice():i:e===1?Gs(mi(i)):mi(i),Bh=(i,e,t,n)=>{try{i.progress(e,t,n)}catch(s){console.error(`${Lt} progress handler error:`,s)}},kc=(i,e,t,n)=>{var s;Bh(i,1,t,n);try{(s=i.receiver)==null||s.call(i,e,t,n)}catch(r){console.error(`${Lt} action handler error:`,r)}},Jd=({fail:i,accept:e,refuse:t,maxReceiveBytes:n,chunkSize:s})=>{const r=new Map,o=new Map,a=new Set,c=new Map;let l=0,h=0,u=0,f=!1,m=!1;const g=S=>S.phase!=="released",v=S=>Math.min(n,(S==null?void 0:S.maxPayloadBytes)??n),p=(S,L,N,P)=>{var z,k;N==null||N.reject(L),(k=(z=r.get(S.type))==null?void 0:z.reject)==null||k.call(z,S.peerId,S.metadata,L),P!==void 0&&t(S.peerId,P,L)},d=S=>{for(const L of Array.from(a))L.peerId===S&&(a.delete(L),a.add(L))},_=S=>{var N,P;if(!g(S))return;S.phase="released",(N=S.removeAbortListener)==null||N.call(S),S.timer=je(S.timer);const L=o.get(S.peerId);if(S.kind==="inline"){const z=L.inline.get(S.key);z.splice(z.indexOf(S),1),z.length||L.inline.delete(S.key),S.data=Kd}else L.bulk.delete(S.id),a.delete(S),S.data=null,S.transfer==="receiving"&&(u-=S.size,L.active===S&&(L.active=null,d(S.peerId)),m=!0);L.count--,l--,L.count||o.delete(S.peerId),(P=S.controller)==null||P.abort()},x=(S,L)=>{g(S)&&(_(S),p(S,L,S.scope,S.kind==="bulk"?S.id:void 0))},y=(S,L)=>{if(S.phase!=="pending")return S.phase==="ready";if(S.size>v(L))return x(S,"payload exceeds receiver size limit"),!1;const N=S.scope?S.scope.receive:L.receive;if(!N)return L.receiver?(S.phase="ready",!0):!1;if(h>=Yd||(c.get(S.peerId)??0)>=jd)return x(S,"too many pending receive decisions"),!1;S.phase="deciding";const P=new AbortController;S.controller=P,h++,c.set(S.peerId,(c.get(S.peerId)??0)+1);const z=Zd(()=>N({byteLength:S.size,peerId:S.peerId,signal:P.signal,...S.metadata===void 0?{}:{metadata:S.metadata}}),k=>{h--;const O=c.get(S.peerId)-1;return O?c.set(S.peerId,O):c.delete(S.peerId),g(S)?(k?S.phase="ready":x(S,"payload rejected by receiver"),k):!1});return typeof z=="boolean"?z:(z.then(()=>w()),!1)},A=(S,L,N)=>{let P;try{P=Oc(N,S.format,S.kind==="inline")}catch{_(S),i(S.peerId,"invalid action payload");return}_(S),kc(L,P,S.peerId,S.metadata)},b=S=>{const L=r.get(S.type);g(S)&&L&&y(S,L)&&L.receiver&&A(S,L,S.data)},R=S=>{const L=r.get(S.type);if(!g(S)||!L||!y(S,L)||!L.receiver)return;if(S.transfer==="receiving"){S.offset===S.size&&A(S,L,S.data);return}const N=o.get(S.peerId);!N.active&&u+S.size<=n&&(N.active=S,S.transfer="receiving",u+=S.size,S.lastSeen=Date.now(),a.delete(S),e(S.peerId,S.id))},D=(S,L)=>{var P;const N=(P=o.get(S))==null?void 0:P.inline.get(L);for(;N!=null&&N[0];){const z=N[0];if(b(z),g(z))break}},w=()=>{if(f){m=!0;return}f=!0;try{do{m=!1;for(const S of a)R(S);for(const[S,L]of o){for(const N of L.bulk.values())N.offset===N.size&&R(N);for(const N of L.inline.keys())D(S,N)}}while(m)}finally{f=!1}},M=S=>{let L=o.get(S.peerId);if(l>=qd||((L==null?void 0:L.count)??0)>=$d)return p(S,"too many pending transfers",S.scope,S.kind==="bulk"?S.id:void 0),!1;if(L||(L={bulk:new Map,inline:new Map,active:null,count:0},o.set(S.peerId,L)),L.count++,l++,S.kind==="inline"){const P=L.inline.get(S.key)??[];P.push(S),L.inline.set(S.key,P)}else L.bulk.set(S.id,S),a.add(S);const N=()=>{const P=kr-(Date.now()-S.lastSeen);P>0?S.timer=setTimeout(N,P):(x(S,"action transfer timed out"),w())};if(S.timer=setTimeout(N,kr),S.scope){const{signal:P}=S.scope,z=()=>{x(S,"receive cancelled"),w()};if(P.addEventListener("abort",z,{once:!0}),S.removeAbortListener=()=>P.removeEventListener("abort",z),P.aborted)return z(),!1}return!0},I=(S,L)=>{var z;const N=r.get(S.type),P=(z=N==null?void 0:N.receiveScope)==null?void 0:z.call(N,S.peerId,S.metadata);return P===null||P!=null&&P.signal.aborted?(L!==void 0&&t(S.peerId,L,"unexpected response"),null):S.size>v(N)?(p(S,"payload exceeds receiver size limit",P,L),null):{action:N,scope:P}},H=(S,L)=>({...S,...L?{scope:L}:{},phase:"pending",controller:null,lastSeen:Date.now(),timer:null});return{register:(S,L={})=>{const N={...L,receiver:null,receive:null,reject:null,progress:St};return r.set(S,N),{onMessage:P=>{N.receiver=P,w()},onReceive:P=>{N.receive=P,w()},onReject:P=>{N.reject=P},onProgress:P=>{N.progress=P}}},receiveInline:(S,L)=>{var B;const N=I(S);if(!N)return;const{action:P,scope:z}=N,k=z?`${S.type}\0${z.key}`:S.type;if(P!=null&&P.receiver&&!(z?z.receive:P.receive)&&!((B=o.get(S.peerId))!=null&&B.inline.has(k))){let Z;try{Z=Oc(L,S.format,!0)}catch{i(S.peerId,"invalid action payload");return}kc(P,Z,S.peerId,S.metadata);return}const O={...H(S,z),kind:"inline",key:k,data:L};M(O)&&D(S.peerId,k)},receiveOffer:(S,L)=>{var z;if((z=o.get(S.peerId))!=null&&z.bulk.has(L)){i(S.peerId,"duplicate action offer");return}const N=I(S,L);if(!N)return;const P={...H(S,N.scope),kind:"bulk",id:L,transfer:"waiting",offset:0,data:null};M(P)&&w()},receiveChunk:(S,L,N,P)=>{var B;const z=o.get(S),k=z==null?void 0:z.bulk.get(L);if(!k)return;if(k.transfer!=="receiving"||N!==k.offset||!P.length||P.length!==Math.min(s,k.size-k.offset)){i(S,"invalid action chunk offset or length");return}try{k.data??(k.data=new Uint8Array(k.size))}catch{x(k,"unable to allocate receive buffer"),w();return}k.data.set(P,k.offset),k.offset+=P.length;const O=Date.now();k.lastSeen=O;for(const Z of a)Z.phase==="ready"&&((B=r.get(Z.type))!=null&&B.receiver)&&(Z.lastSeen=O);k.offset===k.size?(R(k),g(k)&&(z==null?void 0:z.active)===k&&(z.active=null,d(S)),w()):Bh(r.get(k.type),k.offset/k.size,S,k.metadata)},cancel:(S,L)=>{var P,z;const N=(P=o.get(S))==null?void 0:P.bulk.get(L);N&&(_(N),(z=N.scope)==null||z.reject("response cancelled by sender")),w()},clearPeer:S=>{const L=o.get(S);if(L){for(const N of L.bulk.values())_(N);for(const N of L.inline.values()){const P=[...N];for(const z of P)_(z)}}w()}}},na=2,Js=0,Qs=1,Bc=2,oo=3,ao=4,er=5,co=36,zc=48,zn=6,Ts=14,lo=kh-Ts,Qd=256*1024**2,Vc=1024**2,Hc="bufferedamountlow",Gc="close",Wc="error",ef=1e4,Vn=(i,e)=>{const t=qe(e);return t.kind=i,t.name=i==="aborted"?"AbortError":t.name,t},ia=i=>{if(i!=null&&i.aborted)throw Vn("aborted","operation aborted")},Xc=(i,e,t=zn)=>{const n=new Uint8Array(t);return n[0]=na,n[1]=i,new DataView(n.buffer).setUint32(2,e),n},Ai=Vn,tf=(i,e,t=ef)=>i.readyState!=="open"||i.bufferedAmount<=i.bufferedAmountLowThreshold?Promise.resolve(i.readyState==="open"):new Promise(n=>{let s=!1,r=null;const o=l=>{s||(s=!0,i.removeEventListener(Hc,a),i.removeEventListener(Gc,c),i.removeEventListener(Wc,c),e==null||e.removeEventListener("abort",c),je(r),n(l))},a=()=>o(!0),c=()=>o(!1);if(i.addEventListener(Hc,a),i.addEventListener(Gc,c),i.addEventListener(Wc,c),e==null||e.addEventListener("abort",c,{once:!0}),r=setTimeout(()=>o(!1),t),i.readyState!=="open"||e!=null&&e.aborted){o(!1);return}i.bufferedAmount<=i.bufferedAmountLowThreshold&&o(!0)}),nf=({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,throwIfAborted:s=ia,maxReceiveBytes:r=Qd})=>{if(!Number.isSafeInteger(r)||r<=0)throw qe("maxReceiveBytes must be a positive safe integer");const o=new Map,a=new Map,c=new WeakSet;let l=0;const h=Jd({fail:(p,d)=>f(p,d),accept:(p,d)=>m(p,d,oo),refuse:(p,d,_)=>m(p,d,ao,_),maxReceiveBytes:r,chunkSize:lo}),u=p=>{var d;for(const _ of((d=a.get(p))==null?void 0:d.values())??[])_.fail(Ai("disconnected","peer disconnected"));a.delete(p),h.clearPeer(p)},f=(p,d)=>{const _=i(p,!0);_&&!c.has(_)&&(c.add(_),console.warn(`${Lt}: ${d}; disconnecting peer ${p}`),n(p,qe(d)))},m=(p,d,_,x="")=>{var R;const y=i(p,!0);if(!y)return;const A=Tn(x).subarray(0,200),b=Xc(_,d,zn+A.length);b.set(A,zn);try{if((((R=y.channel)==null?void 0:R.bufferedAmount)??0)>Vc)throw qe("control send buffer is full");y.sendData(b)}catch{f(p,"unable to send action control")}};return{makeInternalAction:(p,d={})=>{const _={sendToPending:!!d.sendToPending,receiveWhilePending:!!d.receiveWhilePending,...d.maxPayloadBytes===void 0?{}:{maxPayloadBytes:d.maxPayloadBytes},...d.receiveScope?{receiveScope:d.receiveScope}:{}},x=o.get(p);if(x){if(x.options.sendToPending!==_.sendToPending||x.options.receiveWhilePending!==_.receiveWhilePending||x.options.receiveScope!==_.receiveScope||x.options.maxPayloadBytes!==_.maxPayloadBytes)throw qe(`action type "${p}" cannot be redefined`);return x.action}const y=Tn(p);if(!p||p.includes("\0")||y.length>32)throw qe("action type must contain 1–32 UTF-8 bytes and no null characters");const A={options:_,action:{...h.register(p,_),send:async(b,R,D,w,M)=>{if(s(M),b===void 0)throw qe("action data cannot be undefined");const I=b instanceof Blob,H=I||b instanceof ArrayBuffer||ArrayBuffer.isView(b),S=H?2:typeof b=="string"?0:1;let L=I?b:b instanceof ArrayBuffer?new Uint8Array(b):ArrayBuffer.isView(b)?new Uint8Array(b.buffer,b.byteOffset,b.byteLength):Tn(S===0?b:Ft(b));const N=L instanceof Blob?L.size:L.byteLength,P=D===void 0?new Uint8Array:Tn(Ft(D));if(P.length>16336)throw qe("action metadata is too large");const z=co+P.length+N<=kh;!z&&H&&!(L instanceof Blob)&&(L=L.slice());const k=z?0:l++>>>0,O=z?co:zc,B=new Uint8Array(O+P.length+(z?N:0));B[0]=na,B[1]=(z?Js:Qs)|S<<4,B.set(y,2);const Z=new DataView(B.buffer);Z.setUint16(34,P.length),z||(Z.setUint32(36,k),Z.setFloat64(40,N)),B.set(P,O),z&&B.set(L instanceof Blob?new Uint8Array(await L.arrayBuffer()):L,O+P.length);const ce=R?Array.isArray(R)?R:[R]:e(_.sendToPending);await Ei([...new Set(ce)].map(async Me=>{const X=i(Me,_.sendToPending);if(!X){console.warn(`${Lt}: no peer with id ${Me} found`);return}let Q=null;const le=()=>{var Te;if(Q)throw Q;if(s(M),i(Me,_.sendToPending)!==X||((Te=X.channel)==null?void 0:Te.readyState)==="closed")throw Ai("disconnected","peer disconnected")},ae=async Te=>{le();const me=X.channel;if(me&&(me.readyState!=="open"||me.bufferedAmount>me.bufferedAmountLowThreshold)){if(!await tf(me,M))throw s(M),Ai("disconnected","data channel stopped draining");le()}try{X.sendData(Te)}catch{throw Ai("disconnected","peer disconnected")}};if(z){await ae(B),w==null||w(1,Me,D);return}let Se=!1,Le=!1,Ue=Date.now(),Y,ee;const ue=new Promise((Te,me)=>{Y=Te,ee=me});ue.catch(St);const F=a.get(Me)??new Map;if(F.has(k))throw qe("action transmission id is still in use");a.set(Me,F);let Fe=null;const Ne={accept:()=>!Fe||Q?!1:(Fe=je(Fe),Y(),!0),fail:(Te,me=!1)=>{me&&(Le=!0),Q=Te,ee(Te)},touch:()=>{Fe&&(Ue=Date.now())}};F.set(k,Ne);const ke=()=>{const Te=kr-(Date.now()-Ue);Te>0?Fe=setTimeout(ke,Te):Ne.fail(Ai("timeout","action offer timed out"))};Fe=setTimeout(ke,kr);const Ee=()=>{try{s(M)}catch(Te){Ne.fail(Te)}};M==null||M.addEventListener("abort",Ee,{once:!0});try{await ae(B),Se=!0,await ue;for(let Te=0;Te<N;Te+=lo){le();const me=Math.min(lo,N-Te),C=Xc(Bc,k,Ts+me);new DataView(C.buffer).setFloat64(zn,Te),C.set(L instanceof Blob?new Uint8Array(await L.slice(Te,Te+me).arrayBuffer()):L.subarray(Te,Te+me),Ts),await ae(C);for(const E of F.values())E.touch();w==null||w((Te+me)/N,Me,D)}le()}catch(Te){throw Se&&!Le&&i(Me,!0)===X&&(!X.channel||X.channel.readyState==="open"&&(X.channel.bufferedAmount??0)<=Vc)&&m(Me,k,er),Te}finally{Fe=je(Fe),M==null||M.removeEventListener("abort",Ee),F.delete(k),!F.size&&a.get(Me)===F&&a.delete(Me)}}))}}};return o.set(p,A),A.action},handleData:(p,d)=>{var N,P,z;if(d.byteLength<2||d.byteLength>16384){f(p,"invalid action frame");return}const _=new Uint8Array(d);if(_[0]!==na){f(p,"incompatible action protocol version");return}const x=_[1]&15,y=_[1]>>>4,A=new DataView(_.buffer,_.byteOffset,_.byteLength);if(x>er||y>2||x>Qs&&y!==0){f(p,"invalid action frame");return}if(x>=Bc){if(_.length<zn||(x===oo||x===er)&&_.length!==zn||x===ao&&_.length>206){f(p,"invalid action control");return}const k=A.getUint32(2);if(x===oo){const O=a.get(p);if((N=O==null?void 0:O.get(k))!=null&&N.accept())for(const B of O.values())B.touch();return}if(x===ao){(z=(P=a.get(p))==null?void 0:P.get(k))==null||z.fail(Ai("rejected",mi(_.subarray(zn))),!0);return}x===er?h.cancel(p,k):h.receiveChunk(p,k,_.length>=Ts?A.getFloat64(zn):NaN,_.subarray(Ts));return}const b=x===Js?co:zc;if(_.length<b){f(p,"invalid action header");return}const R=mi(_.subarray(2,34)).replaceAll("\0",""),D=o.get(R);if(!t(p,!!(D!=null&&D.options.receiveWhilePending)))return;const w=A.getUint16(34),M=b+w,I=x===Js?_.length-M:A.getFloat64(40),H=x===Qs?A.getUint32(36):0;if(!R||M>_.length||!Number.isSafeInteger(I)||I<0||x===Qs&&(I===0||M!==_.length)){f(p,"invalid action proposal");return}let S;try{w&&(S=Gs(mi(_.subarray(b,M))))}catch{f(p,"invalid action metadata");return}const L={peerId:p,type:R,format:y,size:I,...S===void 0?{}:{metadata:S}};x===Js?h.receiveInline(L,_.subarray(M)):h.receiveOffer(L,H)},clearPeer:u}},zh=i=>i&&typeof i=="object"&&!Array.isArray(i)&&typeof i.r=="string"?i:null,tr=i=>{const e=zh(i);return e?{r:e.r,...Object.hasOwn(e,"m")?{m:e.m}:{}}:null},ho=i=>{const e=zh(i);return e?{r:e.r,...typeof e.e=="string"?{e:e.e}:{}}:null},ms=(i,e)=>e===void 0?i:{...i,metadata:e},sf=({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,maxReceiveBytes:s})=>{const r=Object.create(null),o={},a=new Map,c=nf({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,...s===void 0?{}:{maxReceiveBytes:s}}),l=c.makeInternalAction,h=c.handleData,u=p=>{const d=o[p];d&&(je(d.timer),d.signal&&d.abortHandler&&d.signal.removeEventListener("abort",d.abortHandler),delete o[p],d.controller.abort())},f=(p,d)=>{Zi(o).forEach(([_,x])=>{x.peerId===p&&(u(_),x.reject(d))})},m=(p,d)=>{c.clearPeer(p);const _=a.get(p);_&&(a.delete(p),_.forEach(x=>x.abort())),f(p,Vn("disconnected",Ji(d,"peer disconnected")))},g=l("@_response",{receiveScope:(p,d)=>{const _=ho(d),x=_&&o[_.r];if(!_||!x||x.peerId!==p)return null;const y=_.e===void 0?x.getReceive():null;return{key:_.r,signal:x.controller.signal,receive:y?A=>y({byteLength:A.byteLength,peerId:A.peerId,kind:"response",signal:A.signal}):null,reject:A=>{o[_.r]===x&&(u(_.r),x.reject(Vn("rejected",A)))}}}});return g.onProgress((p,d,_)=>{var A;const x=ho(_),y=x&&o[x.r];y&&y.peerId===d&&(x==null?void 0:x.e)===void 0&&((A=y.getReceiveProgress())==null||A(p,{peerId:d}))}),g.onMessage((p,d,_)=>{const x=ho(_);if(!x)return;const y=o[x.r];if(!(!y||y.peerId!==d)){if(u(x.r),x.e!==void 0){y.reject(Vn("rejected",x.e));return}y.resolve(p)}}),{makeAction:(p,d)=>{if(d&&"onRequest"in d&&d.kind!=="request")throw qe('request actions must use kind: "request"');const _=(d==null?void 0:d.kind)??"message",x=l(p),y=r[p];if(y){if(y.kind!==_)throw qe(`action type "${p}" cannot be redefined`);return y.action}const A={kind:_,action:null,onReceive:(d==null?void 0:d.onReceive)??null,onReceiveProgress:(d==null?void 0:d.onReceiveProgress)??null},b=(S,L)=>S?(N,P)=>S(N,ms({peerId:P},L)):void 0,R=(S,L,N)=>{var z;const P=A.kind==="request"?tr(N):null;(z=A.onReceiveProgress)==null||z.call(A,S,ms({peerId:L},P?P.m:N))},D=S=>{A.onReceive=S,x.onReceive(S?L=>{const N=_==="request"?tr(L.metadata):null;return S(ms({byteLength:L.byteLength,peerId:L.peerId,signal:L.signal,kind:_},N?N.m:L.metadata))}:null)};if(D(A.onReceive),x.onProgress(R),_==="message"){let S=(d==null?void 0:d.onMessage)??null;const L=(P,z,k)=>{const O=S;Promise.resolve().then(()=>O(P,ms({peerId:z},k))).catch(B=>console.error(`${Lt} action handler error:`,B))},N={send:async(P,z={})=>{await x.send(P,z.target,z.metadata,b(z.onProgress,z.metadata),z.signal)},get onMessage(){return S},set onMessage(P){S=P,x.onMessage(P?L:null)},get onReceive(){return A.onReceive},set onReceive(P){D(P)},get onReceiveProgress(){return A.onReceiveProgress},set onReceiveProgress(P){A.onReceiveProgress=P}};return A.action=N,r[p]=A,x.onMessage(S?L:null),N}x.onReject((S,L,N)=>{const P=tr(L);P&&g.send(null,S,{r:P.r,e:N}).catch(St)});let w=(d==null?void 0:d.onRequest)??null;const M=(S,L,N)=>{const P=tr(N);if(!P)return;const z=w,k=new AbortController;let O=a.get(L);O||(O=new Set,a.set(L,O)),O.add(k),Promise.resolve().then(async()=>{const B=await z(S,{...ms({peerId:L},P.m),signal:k.signal});if(B===void 0)throw qe("request handler returned undefined");return B}).then(B=>g.send(B,L,{r:P.r}),B=>g.send(null,L,{r:P.r,e:Ji(B,"request failed").slice(0,512)})).catch(St).finally(()=>{const B=a.get(L);B==null||B.delete(k),B&&!B.size&&a.delete(L),k.abort()})},I=async(S,L)=>{const{target:N,metadata:P,onProgress:z,signal:k,timeoutMs:O}=L;if(ia(k),!i(N,!1))throw Vn("disconnected",`no active peer with id ${N}`);const B=wi(20),Z=new AbortController,ce=new Promise((Me,X)=>{const Q={controller:Z,getReceive:()=>A.onReceive,getReceiveProgress:()=>A.onReceiveProgress,peerId:N,resolve:Me,reject:X,timer:null,...k===void 0?{}:{signal:k}},le=()=>{u(B),X(Vn("aborted","operation aborted"))};k&&(Q.abortHandler=le,k.addEventListener("abort",le,{once:!0})),o[B]=Q,O!==void 0&&(Q.timer=setTimeout(()=>{u(B),Q.reject(Vn("timeout","request timed out"))},O))});try{const Me=x.send(S,N,P===void 0?{r:B}:{r:B,m:P},b(z,P),Z.signal);return await Promise.race([ce,Me.then(()=>ce)])}finally{u(B)}},H={request:I,requestMany:async(S,L)=>{const{targets:N,onResult:P,...z}=L;return ia(z.signal),await Ei(N.map(async k=>{try{const O={peerId:k,status:"fulfilled",value:await I(S,{...z,target:k})};return P==null||P(O),O}catch(O){const B=Wn(O,"request failed");if(B.kind==="aborted"||!B.kind)throw B;const Z=B.kind==="timeout"?{peerId:k,status:"timeout"}:B.kind==="disconnected"?{peerId:k,status:"disconnected"}:{peerId:k,status:"rejected",error:B};return P==null||P(Z),Z}}))},get onRequest(){return w},set onRequest(S){w=S,x.onMessage(S?M:null)},get onReceive(){return A.onReceive},set onReceive(S){D(S)},get onReceiveProgress(){return A.onReceiveProgress},set onReceiveProgress(S){A.onReceiveProgress=S}};return A.action=H,r[p]=A,x.onMessage(w?M:null),H},makeInternalAction:l,handleData:h,clearPeer:m}},qc=i=>i&&typeof i=="object"&&!Array.isArray(i)&&typeof i.k=="string"?{key:i.k,...typeof i.s=="string"?{streamId:i.s}:{},...typeof i.t=="string"?{trackId:i.t}:{},...Object.hasOwn(i,"m")?{metadata:i.m}:{}}:null,$c=i=>e=>{let t=i.get(e);return t||(t=wi(20),i.set(e,t)),t},sa=()=>{const i=new WeakMap,e=new WeakMap,t=new Map,n=new Map,s=new Map,r=new Map,o=new WeakMap,a=new WeakMap;return{getStreamKey:$c(i),getTrackKey:$c(e),rememberRemoteStream:(c,l,h)=>{var f;const u=o.get(l);u!==void 0&&t.get(u)===l&&t.delete(u),o.set(l,c),t.set(c,l),h&&n.set(h,l),(f=l.getTracks)==null||f.call(l).forEach(m=>{typeof m.id=="string"&&r.set(m.id,{track:m,stream:l})})},getRemoteStream:(c,l)=>t.get(c)??(l?n.get(l):void 0),rememberRemoteTrack:(c,l,h,u,f)=>{var v;const m={track:l,stream:h},g=a.get(l);g!==void 0&&((v=s.get(g))==null?void 0:v.track)===l&&s.delete(g),a.set(l,c),s.set(c,m),u&&r.set(u,m),f&&n.set(f,h)},getRemoteTrack:(c,l)=>s.get(c)??(l?r.get(l):void 0),hasRemoteMedia:()=>t.size>0||s.size>0,clearRemote:()=>{t.clear(),n.clear(),s.clear(),r.clear()}}},rf=({iterate:i,isActive:e,getSharedMediaPeer:t,onPeerError:n})=>{const s={},r={},o={},a=sa(),c=v=>{var p;return((p=t(v))==null?void 0:p.__trysteroMedia)??o[v]??(o[v]=sa())},l=(v,p,d,_)=>{const x=v[p]??(v[p]=[]);if(x.length>=64){console.warn(`${Lt}: too many pending ${_} metadata messages`),n(p,qe("too many pending media metadata messages"));return}x.push(d)},h=(v,p,d)=>{if(!(v!=null&&v.length))return;const _=p?v.findIndex(x=>{const y=d(x);return!y||y===p}):0;return _>=0?v.splice(_,1)[0]:void 0},u=(v,p,d,_)=>{var x;e(v)&&(c(v).rememberRemoteStream(p,d,typeof d.id=="string"?d.id:void 0),(x=g.onPeerStream)==null||x.call(g,d,v,_))},f=(v,p,d,_,x)=>{var y;e(v)&&(c(v).rememberRemoteTrack(p,d,_,typeof d.id=="string"?d.id:void 0,typeof _.id=="string"?_.id:void 0),(y=g.onPeerTrack)==null||y.call(g,d,_,v,x))},m=(v,p,d,_,x,y={})=>{const A={k:p,...y,...d===void 0?{}:{m:d}};return i(v,async(b,R)=>{await _(A,b),await x(R)})},g={addStream:(v,p,d)=>m(p.target,a.getStreamKey(v),p.metadata,d,_=>_.addStream(v),{s:v.id}),removeStream:(v,p)=>{i(p,(d,_)=>_.removeStream(v))},addTrack:(v,p,d,_)=>m(d.target,a.getTrackKey(v),d.metadata,_,x=>x.addTrack(v,p),{s:p.id,t:v.id}),removeTrack:(v,p)=>{i(p,(d,_)=>_.removeTrack(v))},replaceTrack:(v,p,d,_)=>m(d.target,a.getTrackKey(p),d.metadata,_,x=>x.replaceTrack(v,p),{t:v.id}),receiveStreamMeta:(v,p)=>{if(!e(p))return;const d=qc(v);if(!d)return;const _=c(p).getRemoteStream(d.key,d.streamId);if(_!=null&&_.getTracks().length){u(p,d.key,_,d.metadata);return}l(s,p,d,"stream")},receiveTrackMeta:(v,p)=>{if(!e(p))return;const d=qc(v);if(!d)return;const _=c(p).getRemoteTrack(d.key,d.trackId);if(_&&_.track.readyState!=="ended"&&(!_.stream.getTracks||_.stream.getTracks().includes(_.track))){f(p,d.key,_.track,_.stream,d.metadata);return}l(r,p,d,"track")},receiveRemoteStream:(v,p)=>{if(!e(v))return;const d=h(s[v],typeof p.id=="string"?p.id:void 0,_=>_.streamId);d&&u(v,d.key,p,d.metadata)},receiveRemoteTrack:(v,p,d)=>{if(!e(v))return;const _=r[v],x=typeof p.id=="string"?p.id:void 0,y=typeof d.id=="string"?d.id:void 0,A=_&&x?_.findIndex(R=>R.trackId===x):-1,b=A>=0?_==null?void 0:_.splice(A,1)[0]:h(_,y,R=>R.streamId);b&&f(v,b.key,p,d,b.metadata)},clearPeer:v=>{delete s[v],delete r[v],delete o[v]},onPeerStream:null,onPeerTrack:null};return g},Yc="beforeunload",of=1e4,In=i=>"@_"+i,bs=new Set,jc=()=>bs.forEach(i=>i()),af=i=>(bs.add(i),bs.size===1&&addEventListener(Yc,jc),()=>{bs.delete(i),bs.size||removeEventListener(Yc,jc)});var cf=(i,e,t,{onPeerHandshake:n,onHandshakeError:s,handshakeTimeoutMs:r=of,maxReceiveBytes:o,isPassive:a=!1,onBeforeLeave:c}={})=>{const l={},h={},u={},f={onPeerJoin:null,onPeerLeave:null};let m=St,g=null;const v=(O,B)=>(O?Array.isArray(O)?O:[O]:on(h)).flatMap(Z=>{const ce=h[Z];return ce?[Promise.resolve(B(Z,ce))]:(console.warn(`${Lt}: no peer with id ${Z} found`),[])}),p=(O,B,Z)=>{const ce=l[O];!ce||B&&ce!==B||(N.send("",O).catch(St),D(O,ce,Z))},d=(O,B)=>p(O,void 0,B),_=rf({onPeerError:d,iterate:(O,B)=>v(O,(Z,ce)=>B(Z,ce)),isActive:O=>!!h[O],getSharedMediaPeer:O=>l[O]??null}),x=sf({onPeerError:d,...o===void 0?{}:{maxReceiveBytes:o},getPeer:(O,B)=>(B?l:h)[O],getPeerIds:O=>on(O?l:h),canReceiveFromPeer:(O,B)=>k.canReceiveFromPeer(O,B)}),y=x.makeInternalAction,A=x.handleData,b=x.makeAction,R=(O,B=qe("peer disconnected"))=>{var ce;const Z=Wn(B,"peer disconnected");k.clearPeer(O,Z),delete l[O],delete h[O],x.clearPeer(O,Z),(ce=u[O])==null||ce.splice(0).forEach(Me=>Me.reject(Z)),delete u[O],_.clearPeer(O)},D=(O,B,Z)=>{var X;const ce=l[O];if(!ce||B&&ce!==B)return;const Me=!!h[O];R(O,Z),ce.destroy(),Me&&((X=f.onPeerLeave)==null||X.call(f,O)),e(O)},w=()=>g??(g=(async()=>{c==null||c();const O=new AbortController;N.send("",void 0,void 0,void 0,O.signal).catch(St),await new Promise(B=>setTimeout(B,99)),O.abort();try{Zi(l).forEach(([B,Z])=>{Z.destroy(),R(B,qe("room left"))})}finally{try{m()}finally{t()}}})()),M=y(In("ping")),I=y(In("pong")),H=y(In("signal")),S=y(In("stream"),{maxPayloadBytes:65536}),L=y(In("track"),{maxPayloadBytes:65536}),N=y(In("leave"),{sendToPending:!0,receiveWhilePending:!0}),P=y(In("hsdata"),{sendToPending:!0,receiveWhilePending:!0,maxPayloadBytes:65536}),z=y(In("hsready"),{sendToPending:!0,receiveWhilePending:!0}),k=Od({...n===void 0?{}:{onPeerHandshake:n},...s===void 0?{}:{onHandshakeError:s},handshakeTimeoutMs:r,sendHandshakeData:P.send,sendHandshakeReady:z.send,onActivate:(O,B)=>{var Z;h[O]=B,B.setHandlers({signal:ce=>{h[O]===B&&H.send(ce,O).catch(St)}}),(Z=f.onPeerJoin)==null||Z.call(f,O)},onFailure:(O,B,Z)=>p(O,B,Z)});return M.onMessage((O,B)=>{I.send("",B).catch(St)}),I.onMessage((O,B)=>{var ce;const Z=u[B];(ce=Z==null?void 0:Z.shift())==null||ce.resolve(),Z&&!Z.length&&delete u[B]}),H.onMessage((O,B)=>{var Z;(Z=h[B])==null||Z.signal(O)}),S.onMessage((O,B)=>_.receiveStreamMeta(O,B)),L.onMessage((O,B)=>_.receiveTrackMeta(O,B)),N.onMessage((O,B)=>D(B,void 0,qe("peer left room"))),P.onMessage((O,B,Z)=>k.receiveHandshakeData(O,B,Z)),z.onMessage((O,B)=>k.receiveHandshakeReady(B)),i((O,B)=>{const Z=l[B];if(Z){if(Z===O)return;Z.destroy(),R(B,qe("peer replaced"))}l[B]=O,k.addPeer(B,O),O.setHandlers({data:ce=>{l[B]===O&&A(B,ce)},stream:ce=>_.receiveRemoteStream(B,ce),track:(ce,Me)=>_.receiveRemoteTrack(B,ce,Me),close:()=>D(B,O,qe("peer disconnected")),error:ce=>{console.error(`${Lt} peer error:`,ce),D(B,O,ce)}}),k.start(B,O)}),Dh&&(m=af(()=>w().catch(St))),{makeAction:b,leave:w,ping:async O=>{if(!h[O])throw qe(`no active peer with id ${O}`);const B=Date.now();return await new Promise((Z,ce)=>{const Me=u[O]??(u[O]=[]),X=()=>{const le=u[O];if(!le)return;const ae=le.indexOf(Q);ae>-1&&le.splice(ae,1),le.length||delete u[O]},Q={resolve:()=>{X(),Z()},reject:le=>{X(),ce(le)}};Me.push(Q),M.send("",O).catch(le=>Q.reject(Wn(le,"peer disconnected")))}),Date.now()-B},isPassive:()=>a,getPeers:()=>Ih(Zi(h).map(([O,B])=>[O,B.connection])),addStream:(O,B={})=>_.addStream(O,B,S.send),removeStream:(O,B={})=>{_.removeStream(O,B.target)},addTrack:(O,B,Z={})=>_.addTrack(O,B,Z,L.send),removeTrack:(O,B={})=>{_.removeTrack(O,B.target)},replaceTrack:(O,B,Z={})=>_.replaceTrack(O,B,Z,L.send),get onPeerJoin(){return f.onPeerJoin},set onPeerJoin(O){f.onPeerJoin=O,O&&on(h).forEach(B=>O(B))},get onPeerLeave(){return f.onPeerLeave},set onPeerLeave(O){f.onPeerLeave=O},get onPeerStream(){return _.onPeerStream},set onPeerStream(O){_.onPeerStream=O},get onPeerTrack(){return _.onPeerTrack},set onPeerTrack(O){_.onPeerTrack=O}}};const Vh=1,Hh=2,Kc=(i,e)=>{const t=Tn(i),n=new Uint8Array(3+t.byteLength+e.byteLength);return n[0]=Vh,n[1]=t.byteLength>>>8&255,n[2]=t.byteLength&255,n.set(t,3),n.set(e,3+t.byteLength),n},lf=(i,e)=>{const t=Tn(i),n=new Uint8Array(4+t.byteLength);return n[0]=Hh,n[1]=Number(e),n[2]=t.byteLength>>>8&255,n[3]=t.byteLength&255,n.set(t,4),n},Zc=(i,e)=>{if(i.byteLength<e+2)return null;const t=(i[e]??0)<<8|(i[e+1]??0),n=e+2+t;return t<=0||t>128||i.byteLength<n?null:{roomToken:mi(i.subarray(e+2,n)),headerSize:n}},hf=i=>{const e=new Uint8Array(i);if(e.byteLength<3||e.byteLength>16515)return null;if(e[0]===Vh){const t=Zc(e,1);return t?{type:"room",roomToken:t.roomToken,payload:e.subarray(t.headerSize).slice().buffer}:null}if(e[0]===Hh){const t=Zc(e,2);return t?{type:"presence",roomToken:t.roomToken,isPresent:e[1]===1}:null}return null},Pr=i=>{const{connection:e,channel:t}=i;return i.isDead||e.connectionState==="closed"||e.connectionState==="failed"||e.iceConnectionState==="closed"||e.iceConnectionState==="failed"||(t==null?void 0:t.readyState)==="closing"||(t==null?void 0:t.readyState)==="closed"},uf=i=>{if(Pr(i))return"stale";const{channel:e}=i;return!e||e.readyState!=="open"?"transient":"live"};var df=class{constructor(){zt(this,"rooms",new Map);zt(this,"unclaimedDataTimers",new WeakMap);zt(this,"pendingDataTimers",new WeakMap);zt(this,"byApp",{})}registerRoom(i,e,t,n){const s=this.rooms.get(i)??new Map;if(s.has(e))throw qe("room membership already registered");const r={token:null,tokenPromise:t,...n};s.set(e,r),this.rooms.set(i,s);const o=()=>{var c;return((c=this.rooms.get(i))==null?void 0:c.get(e))===r},a=c=>{if(r.token)for(const l of Sn(this.byApp[i]??{}))try{this.sendRoomPresence(l,r.token,c)}catch{}};return t.then(c=>{if(o()){r.token=c;for(const l of Sn(this.byApp[i]??{}))l.remoteRoomTokens.has(c)&&this.attachRoom(i,e,r,l),this.discardUnboundData(l);o()&&r.active&&a(!0)}}),{connect:(c,l,h)=>{if(!o()){l.destroy();return}const u=this.reusable(i,c);u&&u.peer!==l&&l.destroy();const f=u??this.register(i,c,l,h);if(this.attachRoom(i,e,r,f),!u)for(const m of s.values())m.active&&m.token&&this.sendRoomPresence(f,m.token,!0)},reuse:c=>{if(!o())return!1;const l=this.reusable(i,c);return l?(this.attachRoom(i,e,r,l),!0):!1},setActive:c=>{!o()||r.active===c||(r.active=c,a(c))},leave:()=>{var c,l;if(o()){s.delete(e),s.size||this.rooms.delete(i),a(!1);for(const h of Sn(this.byApp[i]??{})){const u=h.bindings[e];(l=u==null?void 0:(c=u.handlers).close)==null||l.call(c),u==null||u.detach(),this.discardUnboundData(h)}}}}}owns(i,e,t){var n,s;return((s=(n=this.byApp[i])==null?void 0:n[e])==null?void 0:s.peer)===t}reusable(i,e){var n;const t=(n=this.byApp[i])==null?void 0:n[e];if(t&&Pr(t.peer)){this.clear(i,e,{destroyPeer:!0});return}return t}attachRoom(i,e,t,n){var o;if(((o=this.rooms.get(i))==null?void 0:o.get(e))!==t||n.isClosing||this.get(i,n.peerId)!==n)return;const{proxy:s,isNew:r}=this.bind(e,t.tokenPromise,n,{onDetach:()=>t.onDetach(n.peerId,n.peer)});r&&t.onPeer(s,n.peerId,n.peer)}get(i,e){var t;return(t=this.byApp[i])==null?void 0:t[e]}sendRoomPresence(i,e,t){i.isClosing||Pr(i.peer)||i.peer.sendData(lf(e,t))}clear(i,e,{destroyPeer:t}){const n=this.byApp[i],s=n==null?void 0:n[e];if(!s||s.isClosing)return;s.idleTimer=je(s.idleTimer),this.clearDataTimers(s),s.isClosing=!0,t&&!s.peer.isDead&&s.peer.destroy();const r=Sn(s.bindings);s.bindings={},s.bindingsByToken={},s.controlRoomId=null,delete n[e],r.forEach(o=>{var a,c;(c=(a=o.handlers).close)==null||c.call(a),o.pendingData.length=0,o.pendingSendData.length=0,o.pendingTracks.length=0}),s.media.clearRemote(),s.pendingDataByToken.clear(),s.remoteRoomTokens.clear(),on(n).length===0&&delete this.byApp[i]}register(i,e,t,n){var a,c;const s=(a=this.byApp[i])==null?void 0:a[e];if(s){if(s.idleTimer=je(s.idleTimer),s.peer===t)return s;this.clear(i,e,{destroyPeer:!0})}const r={appId:i,peerId:e,peer:t,bindings:{},bindingsByToken:{},pendingDataByToken:new Map,remoteRoomTokens:new Set,idleTimer:null,controlRoomId:null,streamOwners:new Map,trackOwners:new Map,media:sa(),idleMs:n,isClosing:!1};((c=this.byApp)[i]??(c[i]={}))[e]=r;const o=()=>{this.owns(i,e,t)&&this.clear(i,e,{destroyPeer:!0})};return t.setHandlers({data:l=>this.dispatchData(r,l),signal:l=>this.dispatchSignal(r,l),close:o,error:l=>{console.error(`${Lt} peer error:`,l),o()},track:(l,h)=>this.dispatchTrack(r,l,h)}),r}bind(i,e,t,{onDetach:n}){const s=t.bindings[i];if(s)return t.idleTimer=je(t.idleTimer),{proxy:s.proxy,isNew:!1};const r={roomId:i,roomToken:null,roomTokenPromise:e,handlers:{},pendingData:[],pendingSendData:[],pendingTracks:[],detach:St,proxy:{}},o=()=>{if(t.bindings[i]!==r)return;const c=on(t.bindings).length===1&&(t.streamOwners.size>0||t.trackOwners.size>0||t.media.hasRemoteMedia());c||this.pruneRoomOwnership(t,i),delete t.bindings[i],r.roomToken&&t.bindingsByToken[r.roomToken]===r&&delete t.bindingsByToken[r.roomToken],t.controlRoomId===i&&(t.controlRoomId=on(t.bindings)[0]??null),this.discardUnboundData(t),n(),c?this.clear(t.appId,t.peerId,{destroyPeer:!0}):this.scheduleIdleTimer(t)},a={get connection(){return t.peer.connection},get channel(){return t.peer.channel},get isDead(){return t.peer.isDead},getOffer:c=>t.peer.getOffer(c),signal:c=>t.peer.signal(c),sendData:c=>{if(!r.roomToken){r.pendingSendData.push(c);return}t.peer.sendData(Kc(r.roomToken,c))},destroy:()=>o(),setHandlers:c=>{Object.assign(r.handlers,c),this.flushBindingQueues(t,r)},addStream:c=>{const l=t.streamOwners.get(c)??new Set,h=l.size===0;l.add(i),t.streamOwners.set(c,l),h&&t.peer.addStream(c)},removeStream:c=>this.releaseStreamOwner(t,c,i),addTrack:(c,l)=>{const h=t.trackOwners.get(c)??{stream:l,rooms:new Set},u=h.rooms.size===0;return h.stream=l,h.rooms.add(i),t.trackOwners.set(c,h),u?t.peer.addTrack(c,l):t.peer.connection.getSenders().find(f=>f.track===c)??t.peer.addTrack(c,l)},removeTrack:c=>this.releaseTrackOwner(t,c,i),replaceTrack:async(c,l)=>{const h=t.trackOwners.get(c);if(await t.peer.replaceTrack(c,l),h&&t.trackOwners.get(c)===h){t.trackOwners.delete(c);const u=t.trackOwners.get(l)??{stream:h.stream,rooms:new Set};h.rooms.forEach(f=>u.rooms.add(f)),t.trackOwners.set(l,u)}},__trysteroMedia:t.media};return r.proxy=a,r.detach=o,t.bindings[i]=r,t.controlRoomId??(t.controlRoomId=i),t.idleTimer=je(t.idleTimer),e.then(c=>{if(t.isClosing||t.bindings[i]!==r)return;r.roomToken=c,t.bindingsByToken[c]=r;const l=t.pendingDataByToken.get(c);l!=null&&l.length&&(r.pendingData.push(...l),t.pendingDataByToken.delete(c));const h=r.pendingSendData.splice(0);Pr(t.peer)||h.forEach(u=>{try{t.peer.sendData(Kc(c,u))}catch{}}),this.flushBindingQueues(t,r),this.discardUnboundData(t)}),{proxy:a,isNew:!0}}releaseStreamOwner(i,e,t){const n=i.streamOwners.get(e);n&&(n.delete(t),n.size===0&&(i.streamOwners.delete(e),i.peer.removeStream(e)))}releaseTrackOwner(i,e,t){const n=i.trackOwners.get(e);n&&(n.rooms.delete(t),n.rooms.size===0&&(i.trackOwners.delete(e),i.peer.removeTrack(e)))}pruneRoomOwnership(i,e){i.streamOwners.forEach((t,n)=>this.releaseStreamOwner(i,n,e)),i.trackOwners.forEach((t,n)=>this.releaseTrackOwner(i,n,e))}scheduleIdleTimer(i){i.isClosing||on(i.bindings).length>0||(i.idleTimer=je(i.idleTimer),i.idleTimer=setTimeout(()=>{var t;const e=(t=this.byApp[i.appId])==null?void 0:t[i.peerId];!e||on(e.bindings).length>0||this.clear(i.appId,i.peerId,{destroyPeer:!0})},i.idleMs))}getSignalBinding(i){if(i.controlRoomId){const t=i.bindings[i.controlRoomId];if(t!=null&&t.handlers.signal)return t}const e=Sn(i.bindings).find(t=>!!t.handlers.signal);return e?(i.controlRoomId=e.roomId,e):null}flushBindingQueues(i,e){const{handlers:t}=e;if(t.data&&e.pendingData.length>0){const n=e.pendingData.splice(0);this.syncDataTimers(i),n.forEach(s=>{var r;return(r=t.data)==null?void 0:r.call(t,s)})}else this.syncDataTimers(i);(t.track||t.stream)&&e.pendingTracks.length&&e.pendingTracks.splice(0).forEach(({track:n,stream:s})=>{var r,o;(r=t.track)==null||r.call(t,n,s),(o=t.stream)==null||o.call(t,s)})}unclaimedBufferedFrameCount(i){let e=0;for(const t of i.pendingDataByToken.values())e+=t.length;return e}boundBufferedFrameCount(i){let e=0;for(const t of Sn(i.bindings))e+=t.pendingData.length;return e}bufferedFrameCount(i){return this.unclaimedBufferedFrameCount(i)+this.boundBufferedFrameCount(i)}clearDataTimers(i){je(this.unclaimedDataTimers.get(i)),this.unclaimedDataTimers.delete(i),je(this.pendingDataTimers.get(i)),this.pendingDataTimers.delete(i)}syncDataTimers(i){if(i.isClosing){this.clearDataTimers(i);return}this.unclaimedBufferedFrameCount(i)===0?(je(this.unclaimedDataTimers.get(i)),this.unclaimedDataTimers.delete(i)):this.unclaimedDataTimers.has(i)||this.unclaimedDataTimers.set(i,setTimeout(()=>{this.unclaimedDataTimers.delete(i),i.pendingDataByToken.clear()},ta)),this.boundBufferedFrameCount(i)===0?(je(this.pendingDataTimers.get(i)),this.pendingDataTimers.delete(i)):this.pendingDataTimers.has(i)||this.pendingDataTimers.set(i,setTimeout(()=>{this.pendingDataTimers.delete(i),this.boundBufferedFrameCount(i)>0&&this.failData(i,"room data handler timed out")},ta))}canBindRoomToken(i,e){var t;return Sn(i.bindings).some(n=>!n.roomToken)||[...((t=this.rooms.get(i.appId))==null?void 0:t.values())??[]].some(n=>!n.token||n.token===e)}discardUnboundData(i){for(const e of i.pendingDataByToken.keys())this.canBindRoomToken(i,e)||i.pendingDataByToken.delete(e);this.syncDataTimers(i)}failData(i,e){console.warn(`${Lt}: ${e}; disconnecting peer ${i.peerId}`),this.clear(i.appId,i.peerId,{destroyPeer:!0})}dispatchData(i,e){var s,r;if(i.isClosing)return;const t=hf(e);if(!t){this.failData(i,"invalid or incompatible room frame");return}if(t.type==="presence"){if(t.isPresent){if(!i.remoteRoomTokens.has(t.roomToken)&&i.remoteRoomTokens.size>=64){this.failData(i,"too many advertised rooms");return}i.remoteRoomTokens.add(t.roomToken);for(const[o,a]of this.rooms.get(i.appId)??[])a.token===t.roomToken&&this.attachRoom(i.appId,o,a,i)}else{i.remoteRoomTokens.delete(t.roomToken),i.pendingDataByToken.delete(t.roomToken);const o=i.bindingsByToken[t.roomToken];(r=o==null?void 0:(s=o.handlers).close)==null||r.call(s),o==null||o.detach(),this.syncDataTimers(i)}return}const n=i.bindingsByToken[t.roomToken];if(!n){if(!this.canBindRoomToken(i,t.roomToken)||this.bufferedFrameCount(i)>=64)return;const o=i.pendingDataByToken.get(t.roomToken)??[];o.push(t.payload),i.pendingDataByToken.set(t.roomToken,o),this.syncDataTimers(i);return}if(n.handlers.data)n.handlers.data(t.payload);else{if(this.bufferedFrameCount(i)>=64){this.failData(i,"too much data waiting for a room handler");return}n.pendingData.push(t.payload),this.syncDataTimers(i)}}dispatchSignal(i,e){var n,s;const t=this.getSignalBinding(i);t?(s=(n=t.handlers).signal)==null||s.call(n,e):e.type==="offer"&&this.clear(i.appId,i.peerId,{destroyPeer:!0})}dispatchTrack(i,e,t){Sn(i.bindings).forEach(n=>{var s,r,o,a;if(n.handlers.track||n.handlers.stream){(r=(s=n.handlers).track)==null||r.call(s,e,t),(a=(o=n.handlers).stream)==null||a.call(o,t);return}n.pendingTracks.push({track:e,stream:t})})}};const Jc=23333,ff=57333,pf=12,mf=7533,gf=23333,Is="offer-placeholder",vf=["offer","answer","candidate"],Gh=i=>{if(typeof i=="string")try{const e=Gs(i);return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch{return null}return i&&typeof i=="object"&&!Array.isArray(i)?i:null},Hn=(i,e)=>typeof i[e]=="string"&&i[e]?i[e]:void 0,Wh=i=>!!(i&&typeof i=="object"&&typeof i.signal=="function"&&typeof i.destroy=="function"&&typeof i.setHandlers=="function"),Xh=(i,e=!1)=>vf.some(t=>t in i&&(typeof i[t]!="string"||i[t]===""))||"peer"in i&&(e||i.peer!==void 0&&!Wh(i.peer)),_f=i=>{const e=Gh(i);if(!e||Xh(e,typeof i=="string"))return!1;const t=Hn(e,"peerId");return!!(t&&t!==Ct&&e.passive!==!0&&!Hn(e,"answer")&&!Hn(e,"candidate"))},yf=(i,e,t,n,s,r)=>{i.toCipher(e).then(o=>{i.isLeaving()||!r()||n(t,Ft(s(o.sdp)))})},xf=()=>({offerPeer:null,offerId:null,offerSdp:null,offerInitPromise:null,offerAnswered:!1,offerRelays:[],offerSignalRelays:[],offerSignalBacklog:[],offerRelayTimers:[],offerExpiryTimer:null,connectedPeer:null,connectedPeerUnhealthySinceMs:null,answeringExpiryTimer:null,answeringPeer:null,answerSent:!1,answerReplay:null,connectionErrorReported:!1}),Mf=i=>{var e;return[...i.turnConfig??[],...((e=i.rtcConfig)==null?void 0:e.iceServers)??[]].some(({urls:t})=>(Array.isArray(t)?t:[t]).some(n=>/^turns?:/i.test(n)))},Sf=(i,e)=>`could not connect to peer ${i} after exchanging SDP; ${Mf(e)?"check that your TURN server URLs and credentials are reachable by both peers":"configure TURN servers with turnConfig or rtcConfig.iceServers"}`,$r=(i,e,t)=>{var n;i.isLeaving()||e.connectedPeer||e.connectionErrorReported||(e.connectionErrorReported=!0,(n=i.onJoinError)==null||n.call(i,{error:Sf(t,i.config),appId:i.appId,peerId:t,roomId:i.roomId}))},Yr=(i,e)=>i[e]??(i[e]=xf()),Br=new WeakMap,nc=i=>{Br.delete(i),i.answeringExpiryTimer=je(i.answeringExpiryTimer),i.answeringPeer=null,i.answerSent=!1,i.answerReplay=null},Us=(i,e)=>{i.answeringPeer===e&&(nc(i),i.connectedPeer!==e&&!e.isDead&&e.destroy())},wf=(i,e)=>{i.answeringPeer&&i.answeringPeer!==e&&!i.answeringPeer.isDead&&i.answeringPeer.destroy(),nc(i),i.connectedPeer=e,i.connectedPeerUnhealthySinceMs=null},Qc=(i,e)=>{(i==null?void 0:i.connectedPeer)===e&&(i.connectedPeer=null,i.connectedPeerUnhealthySinceMs=null)},ra=(i,e,t)=>{i.connectedPeer&&(i.connectedPeer.isDead||i.connectedPeer.destroy(),i.connectedPeer=null,i.connectedPeerUnhealthySinceMs=null)},ic=(i,e)=>{i.offerRelayTimers[e]=je(i.offerRelayTimers[e]),i.offerRelays[e]&&(i.offerRelays[e]=void 0)},uo=(i,e)=>{(i==null?void 0:i.offerRelays[e])===Is&&ic(i,e)},vi=i=>{Br.delete(i),i.offerExpiryTimer=je(i.offerExpiryTimer),i.offerInitPromise=null,i.offerRelays.forEach((e,t)=>ic(i,t)),i.offerRelays=[],i.offerSignalRelays=[],i.offerRelayTimers=[],i.offerSignalBacklog=[],i.offerPeer&&i.offerPeer!==i.connectedPeer&&(i.offerPeer.isDead||i.offerPeer.destroy()),i.offerPeer=null,i.offerId=null,i.offerSdp=null,i.offerAnswered=!1,i.connectionErrorReported=!1},Ef=(i,e,t,n)=>{je(e.answeringExpiryTimer),e.answeringExpiryTimer=setTimeout(()=>{const s=i.peerStates[t];!s||s.connectedPeer||s.answeringPeer!==n||(s.answerSent&&$r(i,s,t),Us(s,n),i.checkDeactivate())},gf)},oa=(i,e,t,n=ff)=>{je(e.offerExpiryTimer);const s=e.offerId;e.offerExpiryTimer=setTimeout(()=>{const r=i.peerStates[t];!r||r.connectedPeer||r.offerId!==s||(r.offerAnswered&&$r(i,r,t),vi(r),i.checkDeactivate())},n)},qh=(i,e,t,n,s)=>{const r=()=>{e.offerPeer===n&&!e.connectedPeer&&(e.offerAnswered&&$r(i,e,t),vi(e)),i.disconnectPeer(n,t),i.checkDeactivate()};n.setHandlers({connect:()=>i.connectPeer(n,t),...s?{signal:s}:{},close:r,error:r})},Tf=(i,e,t)=>{if(e.offerPeer&&e.offerId&&e.offerSdp)return Promise.resolve({peer:e.offerPeer,offer:e.offerSdp,offerId:e.offerId});if(e.offerInitPromise)return e.offerInitPromise;const s=(async()=>{let r;try{r=(await i.offerManager.checkout(1,!1,i.encryptOffer))[0]}catch(c){if(i.isLeaving()||e.offerInitPromise!==s)return null;throw c}if(!r)throw qe("failed to allocate offer peer");const{peer:o,offer:a}=r;return i.isLeaving()||e.offerInitPromise!==s?(o.destroy(),null):(e.offerPeer=o,e.offerId=wi(pf),e.offerSdp=a,e.offerAnswered=!1,e.connectionErrorReported=!1,e.offerSignalBacklog=[],qh(i,e,t,o,c=>{e.offerPeer===o&&(e.offerSignalBacklog.push(c),e.offerSignalRelays.forEach(l=>l==null?void 0:l(c)))}),oa(i,e,t),{peer:o,offer:a,offerId:e.offerId})})().finally(()=>{e.offerInitPromise===s&&(e.offerInitPromise=null)});return e.offerInitPromise=s},$h=async(i,e,t,n,s=0)=>{const r=i.peerStates[t];if(!r||r.connectedPeer||r.answeringPeer||r.offerAnswered){uo(r,e);return}if(r.offerRelays[e]!==Is)return;const[o,a]=await Ei([es(Qi(i.rootTopicPlaintext,t)),Tf(i,r,t)]);if(!a){uo(r,e);return}if(i.isLeaving()){vi(r);return}if(r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerRelays[e]!==Is){uo(r,e);return}r.offerRelayTimers[e]=je(r.offerRelayTimers[e]),r.offerRelays[e]=!0,r.offerRelayTimers[e]=setTimeout(()=>{if(s>=2||i.isLeaving()||r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerPeer!==a.peer||r.offerId!==a.offerId){Cf(i,t,e);return}r.offerRelays[e]=Is,$h(i,e,t,n,s+1)},s===0&&i.announceIntervals[e]===void 0?2e3:(i.announceIntervals[e]??i.announceIntervalMs)*.9);let c=!1;r.offerSignalRelays[e]=l=>{c&&(i.isLeaving()||r.connectedPeer||r.offerPeer!==a.peer||r.offerId!==a.offerId||l.type!=="candidate"||yf(i,l,o,n,h=>({peerId:Ct,offerId:a.offerId,candidate:h,...i.isPassive?{passive:!0}:{}}),()=>!r.connectedPeer&&r.offerPeer===a.peer&&r.offerId===a.offerId))},n(o,Ft({peerId:Ct,offerId:a.offerId,offer:a.offer,...i.isPassive?{passive:!0}:{}})),c=!0,r.offerSignalBacklog.forEach(l=>{var h,u;return(u=(h=r.offerSignalRelays)[e])==null?void 0:u.call(h,l)})},bf=async(i,e,t,n,s,r)=>{var p;const o=Yr(i.peerStates,t);if(o.answeringPeer||o.offerAnswered){const d=o.answerReplay,_=d==null?void 0:d.lastSentAt[e];if(o.answeringPeer&&!o.answeringPeer.isDead&&d&&d.offer===n&&d.offerId===s&&(_===void 0||Date.now()-_>=1e3)){d.lastSentAt[e]=Date.now();const x=await es(Qi(i.rootTopicPlaintext,t));if(!i.isLeaving()&&o.answerReplay===d&&!o.connectedPeer){const y=A=>r(x,A);d.relays[e]=y,d.messages.forEach(y)}}return}const a=!!(o.offerPeer||o.offerRelays.some(Boolean));if(a&&Ct<t)return;a&&vi(o);const c=i.initPeer(!1,i.config),l={offer:n,offerId:s,messages:[],lastSentAt:[],relays:[]};l.lastSentAt[e]=Date.now(),o.answeringPeer=c,o.answerSent=!1,o.answerReplay=l,o.connectionErrorReported=!1,Ef(i,o,t,c);const h=()=>{o.answeringPeer===c&&!o.connectedPeer&&o.answerSent&&$r(i,o,t),Us(o,c),i.disconnectPeer(c,t),i.checkDeactivate()};c.setHandlers({connect:()=>i.connectPeer(c,t),close:h,error:h});let u;try{u=await i.toPlain({type:"offer",sdp:n})}catch{Us(o,c),(p=i.onJoinError)==null||p.call(i,{error:"incorrect room password when decrypting offer",appId:i.appId,peerId:t,roomId:i.roomId});return}if(c.isDead){Us(o,c);return}const f=await es(Qi(i.rootTopicPlaintext,t));if(i.isLeaving()||o.answerReplay!==l)return;l.relays[e]=d=>r(f,d);const m=[];let g=!1;const v=d=>{i.toCipher(d).then(_=>{if(i.isLeaving()||o.answeringPeer!==c||c.isDead)return;const x={peerId:Ct};d.type==="answer"?(o.answerSent=!0,x.answer=_.sdp):x.candidate=_.sdp,s&&(x.offerId=s),i.isPassive&&(x.passive=!0);const y=Ft(x),A=Date.now();l.messages.push(y),l.relays.forEach((b,R)=>{b&&(l.lastSentAt[R]=A,b(y))}),d.type==="answer"&&!g&&(g=!0,m.splice(0).forEach(v))})};c.setHandlers({signal:d=>{if(!(i.isLeaving()||o.answeringPeer!==c||c.isDead)&&!(d.type!=="answer"&&d.type!=="candidate")){if(d.type==="candidate"&&!g){m.push(d);return}v(d)}}}),await c.signal(u)},Af=async(i,e,t,n,s)=>{var u;let r;try{r=await i.toPlain({type:Uh,sdp:t})}catch{return}const o=i.peerStates[e],a=n&&(o!=null&&o.offerPeer)&&o.offerId===n?o.offerPeer:null,c=!n||((u=o==null?void 0:o.answerReplay)==null?void 0:u.offerId)===n?o==null?void 0:o.answeringPeer:null,l=!n&&(o!=null&&o.offerPeer)?o.offerPeer:null,h=s&&!s.isDead?s:a??c??l;h&&!h.isDead&&h.signal(r)},Rf=async(i,e,t,n,s)=>{var o;let r;try{r=await i.toPlain({type:"answer",sdp:t})}catch{s&&(i.offerManager.reclaimLeased(s),s.isDead||s.destroy()),(o=i.onJoinError)==null||o.call(i,{error:"incorrect room password when decrypting answer",appId:i.appId,peerId:e,roomId:i.roomId});return}if(s){const a=Yr(i.peerStates,e);if(i.offerManager.claimLeased(s),a.connectedPeer||a.offerAnswered||a.answeringPeer&&!a.answeringPeer.isDead&&Ct>e){s.destroy();return}if(a.answeringPeer){const c=a.answeringPeer;Us(a,c)}vi(a),a.offerPeer=s,a.offerId=n??null,a.offerAnswered=!0,oa(i,a,e,Jc),qh(i,a,e,s),s.signal(r)}else{const a=i.peerStates[e];if(!a||!a.offerPeer||a.offerAnswered||n&&a.offerId&&n!==a.offerId||a.offerPeer.isDead)return;a.offerAnswered=!0,oa(i,a,e,Jc),a.offerPeer.signal(r)}},Cf=(i,e,t)=>{const n=i.peerStates[e];!n||n.connectedPeer||n.offerRelays[t]&&(ic(n,t),i.checkDeactivate())},Pf=i=>e=>async(t,n,s)=>{var d;if(i.isLeaving())return;const r=Gh(n);if(!r||Xh(r,typeof n=="string"))return;const o=Hn(r,"peerId")??"",a=Hn(r,"offer"),c=Hn(r,"answer"),l=Hn(r,"candidate"),h=Hn(r,"offerId"),u=Wh(r.peer)?r.peer:void 0,f=r.passive===!0;if(!o||o===Ct)return;const[m,g]=await Ei([i.rootTopicP,i.selfTopicP]);if(i.isLeaving()||t!==m&&t!==g||i.isPassive&&f||(i.isPassive&&!i.isActive&&!c&&!l&&(i.isActive=!0,(d=i.requeueAnnounce)==null||d.call(i)),i.isPassive&&!i.isActive))return;const v=i.peerStates[o],p=v==null?void 0:v.connectedPeer;if(p&&v){const _=uf(p);if(_==="live"){v.connectedPeerUnhealthySinceMs=null;return}if(_==="stale")ra(v);else{const x=Date.now(),y=v.connectedPeerUnhealthySinceMs??x;if(v.connectedPeerUnhealthySinceMs=y,x-y<mf)return;ra(v)}}if(!i.reusePeer(o)){if(o&&!a&&!c&&!l){const _=Yr(i.peerStates,o),x=Ct<o;if(_.answeringPeer||_.connectedPeer||_.offerAnswered)return;if(!x&&!_.offerPeer){let y=Br.get(_);y||(y=[],Br.set(_,y));const A=y[e];if(A!==void 0&&Date.now()-A<1e3)return;y[e]=Date.now();const b=await es(Qi(i.rootTopicPlaintext,o));!i.isLeaving()&&!_.connectedPeer&&!_.answeringPeer&&!_.offerAnswered&&s(b,Ft({peerId:Ct}));return}return _.offerRelays[e]?void 0:(_.offerRelays[e]=Is,$h(i,e,o,s))}if(a)return bf(i,e,o,a,h,s);if(l)return Af(i,o,l,h,u);if(c)return Rf(i,o,c,h,u)}},nr=5333,Lf=[233,533,1333],el=7533,Df=123333;var If=({init:i,subscribe:e,announce:t,deactivate:n})=>{const s={},r={},o=new df,a=()=>Sn(s).some(u=>on(u).length>0);let c=!1,l=[],h=St;return(u,f,m)=>{var E,$,te,se;if(!u)throw qe("requires a config map as the first argument");if(m&&typeof m!="object")throw qe("third argument must be a callbacks object");const{appId:g}=u,v=m==null?void 0:m.onJoinError,p=m==null?void 0:m.onPeerHandshake,d=m==null?void 0:m.handshakeTimeoutMs;if(!g)throw qe("config map is missing appId field");if(!f)throw qe("roomId argument required");if(u.maxReceiveBytes!==void 0&&(!Number.isSafeInteger(u.maxReceiveBytes)||u.maxReceiveBytes<=0))throw qe("maxReceiveBytes must be a positive safe integer");if(d!==void 0&&(!Number.isFinite(d)||d<=0))throw qe("handshakeTimeoutMs must be a positive number");if((E=s[g])!=null&&E[f])return s[g][f];(te=($=r[g])==null?void 0:$[f])==null||te.call($,!0);const _=Qi(Lt,g,f),x=es(_),y=es(Qi(_,Ct)),A=Cd(u.password??"",g,f),b=Pd(g,f),R=u._test_only_sharedPeerIdleMs??Df;let D=!1;const w=q=>async oe=>({type:oe.type,sdp:await q(A,oe.sdp)}),M=w(Dd),I=w(Ld),H=()=>Nc(!0,u);let S=!1;const L=new Ud(H),N=async q=>{const oe=await q.getOffer();if(!oe||oe.type!=="offer")throw qe("failed to get offer for peer");return(await I(oe)).sdp},P=(q,oe)=>{C.connect(oe,q,R)};let z=!1;const k=()=>{B||!S||z||(z=!0,queueMicrotask(()=>{var q;z=!1,D||(q=X.requeueAnnounce)==null||q.call(X)}))},O=(q,oe)=>{if(D)return;const ie=X.peerStates[oe];(ie==null?void 0:ie.connectedPeer)===q&&(ra(ie),Me(),k())},B=!!u.passive;let Z,ce=St;const Me=()=>{if(!B||!X.isActive)return;let q=!1;Zi(X.peerStates).forEach(([oe,ie])=>{ie.connectedPeer||ie.answeringPeer||ie.offerInitPromise||ie.offerPeer||ie.offerRelays.some(Boolean)?q=!0:delete X.peerStates[oe]}),q||(X.isActive=!1,Z=je(Z),Ue.forEach(je),Ue.length=0,ce(),C.setActive(!1))},X={appId:g,roomId:f,config:u,peerStates:{},rootTopicPlaintext:_,rootTopicP:x,selfTopicP:y,toPlain:M,toCipher:I,isLeaving:()=>D,isPassive:B,isActive:!B,onJoinError:v,offerManager:L,encryptOffer:N,initPeer:Nc,connectPeer:P,disconnectPeer:O,reusePeer:q=>C.reuse(q),checkDeactivate:Me,announceIntervals:[],announceIntervalMs:nr},Q={config:u,appId:g,roomId:f,isPassive:B},le=Pf(X);if(!c){const q=i(u);l=(Array.isArray(q)?q:[q]).map(oe=>Promise.resolve(oe)),c=!0,h=(se=u.relayConfig)!=null&&se.manualReconnection?St:bd()}const ae=l.map(()=>nr),Se=l.map(()=>0),Le=l.map(()=>0),Ue=[],Y=l.map(async(q,oe)=>e(await q,await x,await y,le(oe),ie=>L.getOffers(ie,N),Q));Ei([x,y]).then(([q,oe])=>{if(D)return;const ie=async(de,De)=>{var $e;if(D||B&&!X.isActive)return;const re=B?{passive:!0}:void 0;let fe;try{fe=await t(de,q,oe,re,Q),Le[De]=0}catch(Ve){if(D)return;const tt=Le[De]??0;tt===0&&(($e=u.relayConfig)==null?void 0:$e.warnOnRelayFailure)!==!1&&console.warn(`${Lt}: announce failed - ${Ji(Ve,"")}`),Le[De]=tt+1}if(D||B&&!X.isActive||fe&&typeof fe!="number"&&"stopAnnouncing"in fe)return;typeof fe=="number"?(X.announceIntervals[De]=fe,ae[De]=fe):fe&&(ae[De]=fe.nextAnnounceMs,S||(S=fe.reannounceOnDisconnect===!0));const Ie=Se[De]??0;Se[De]=Ie+1;const Oe=ae[De]??nr,we=Lf[Ie]??(Ie===3&&typeof fe=="object"?nr:void 0);Ue[De]=setTimeout(()=>{ie(de,De)},typeof we=="number"?Math.min(Oe,we):Oe)};ce=()=>{n&&l.forEach(async de=>{const De=await de;D||n(De,q,oe,Q)})},X.requeueAnnounce=()=>{Ue.forEach(je),Ue.length=0,Z=je(Z),C.setActive(!0),Z=setTimeout(Me,el),l.forEach(async(de,De)=>{const re=await de;re&&!D&&(Se[De]=0,ie(re,De))})},Y.forEach(async(de,De)=>{if(await de,D)return;const re=await l[De];re&&!D&&(!B||X.isActive)&&ie(re,De)})});let ee=St;const ue=u.password??"",{compose:F}=Nd(ue,g,f),Fe=F(p),Ne=()=>{var q;((q=s[g])==null?void 0:q[f])===me&&(delete s[g][f],on(s[g]).length===0&&delete s[g])},ke=()=>{var q;((q=r[g])==null?void 0:q[f])===Ee&&(delete r[g][f],on(r[g]).length===0&&delete r[g])},Ee=(q=!1)=>{D||(D=!0,ee=St,Ne(),ke(),C.leave(),Zi(X.peerStates).forEach(([oe,ie])=>{ie.connectedPeer&&!ie.connectedPeer.isDead&&(o.owns(g,oe,ie.connectedPeer)||ie.connectedPeer.destroy()),ie.answeringPeer&&!ie.answeringPeer.isDead&&ie.answeringPeer.destroy(),vi(ie),nc(ie),ie.connectedPeer=null,ie.connectedPeerUnhealthySinceMs=null}),Ue.forEach(je),Z=je(Z),Y.forEach(async oe=>{(await oe)()}),L.destroy(),!(q||a())&&(c=!1,h()))},Te={...u.maxReceiveBytes===void 0?{}:{maxReceiveBytes:u.maxReceiveBytes},...Fe?{onPeerHandshake:Fe}:{},...d===void 0?{}:{handshakeTimeoutMs:d},isPassive:B,onBeforeLeave:()=>{Ne(),(r[g]??(r[g]={}))[f]=Ee},onHandshakeError:(q,oe)=>v==null?void 0:v({error:oe.replace(/^handshake failed: /,""),appId:g,peerId:q,roomId:f})};s[g]??(s[g]={});const me=cf(q=>ee=q,q=>{if(D)return;const oe=X.peerStates[q];oe!=null&&oe.connectedPeer&&Qc(oe,oe.connectedPeer),Me(),k()},()=>Ee(!1),Te),C=o.registerRoom(g,f,b,{active:!B||X.isActive,onPeer:(q,oe,ie)=>{const de=Yr(X.peerStates,oe);wf(de,ie),B&&!X.isActive&&(X.isActive=!0,C.setActive(!0),X.requeueAnnounce?X.requeueAnnounce():(Z=je(Z),Z=setTimeout(Me,el))),ee(q,oe),vi(de)},onDetach:(q,oe)=>{Qc(X.peerStates[q],oe),Me()}});return s[g][f]=me}};const Uf=6e4,fo=i=>{if(!i)throw qe("topic strategy missing room context");return i},gs=(i,e,t,n)=>({kind:e,appId:i.appId,roomId:i.roomId,rootTopic:t,selfTopic:n});var Nf=({steadyAnnounceIntervalMs:i=Uf,reannounceOnDisconnect:e=!0,init:t,subscribeTopic:n,publishTopic:s,unpublishTopic:r})=>If({init:t,subscribe:async(o,a,c,l,h,u)=>{const f=fo(u),m=(A,b)=>void s(o,A,b,gs(f,"signal",a,c));let g=null,v=!1,p=null,d=!1;const _=A=>{v||(v=!0,A())},x=()=>(p||(p=Promise.resolve(n(o,c,(A,b)=>{d||l(A,b,m)},gs(f,"self",a,c))).then(A=>{g=A,d&&_(A)})),p);f.isPassive||await x();const y=await n(o,a,async(A,b)=>{d||(f.isPassive&&_f(b)&&await x(),d||await l(A,b,m))},gs(f,"root",a,c));return()=>{d=!0,g&&_(g),y()}},announce:async(o,a,c,l,h)=>{const u=fo(h),f=await s(o,a,Ft({peerId:Ct,...l}),gs(u,"announce",a,c));return typeof f=="number"||f!==void 0&&"stopAnnouncing"in f?f:{nextAnnounceMs:(f==null?void 0:f.nextAnnounceMs)??i,reannounceOnDisconnect:(f==null?void 0:f.reannounceOnDisconnect)??e}},...r?{deactivate:(o,a,c,l)=>{const h=fo(l);return r(o,a,gs(h,"announce",a,c))}}:{}});const Yh=Td(i=>i.socket),Ff=5,jh="x",Kh="EVENT",{secretKey:Of,publicKey:kf}=Lh.keygen(),Bf=Ns(kf),po={},tl=250,ui=6e4,zf=9e5,sc=5333,Fs=new WeakMap,zr=Yh.scoped(),aa=new WeakSet,Vf=i=>{const e=Fs.get(i),t=Math.min(e!=null&&e.delayMs?Math.max(ui,e.delayMs*2):ui,zf);return Fs.set(i,{delayMs:t,untilMs:Date.now()+t}),t},Os=i=>{const e=Fs.get(i);if(!e)return 0;const t=e.untilMs-Date.now();return t>0?t:0},ir=i=>({nextAnnounceMs:i}),Hf={stopAnnouncing:!0},Gf=i=>{var e;return aa.has(i)?!1:(aa.add(i),Fs.delete(i),(e=i.close)==null||e.call(i),!0)},Zh=()=>Math.floor(Date.now()/1e3),Jh=i=>po[i]??(po[i]=Nh(i,1e4)+2e4),Wf=async(i,e)=>{const t={kind:Jh(i),tags:[[jh,i]],created_at:Zh(),content:e,pubkey:Bf},n=await qr("SHA-256",Ft([0,t.pubkey,t.created_at,t.kind,t.tags,t.content]));return Ft([Kh,{...t,id:Ns(n),sig:Ns(await Lh.signAsync(n,Of))}])},Xt={},Qh=i=>{i.flushWaiters.forEach(e=>e()),i.flushWaiters.clear()},Xf=(i,e,t)=>{var s;const n=Xt[s=i.url]??(Xt[s]={subIds:[],topics:new Map,updateTimer:null,flushWaiters:new Set,retryTimer:null,retryMs:sc,pendingEose:new Set,requestedAt:0});n.topics.set(e,t),eu(i,n)},qf=(i,e)=>{const t=Xt[i.url];t&&(t.topics.delete(e),delete zr.forRelay(i)[e],t.topics.size===0?(t.retryTimer!==null&&clearTimeout(t.retryTimer),t.updateTimer!==null&&(clearTimeout(t.updateTimer),t.updateTimer=null),Qh(t),t.subIds.forEach(n=>i.send(Ft(["CLOSE",n]))),delete Xt[i.url]):eu(i,t))},eu=(i,e)=>{e.updateTimer===null&&(e.updateTimer=setTimeout(()=>{e.updateTimer=null;try{tu(i)}finally{Qh(e)}},0))},$f=i=>{const e=Xt[i.url];return!e||e.updateTimer===null?Promise.resolve():new Promise(t=>e.flushWaiters.add(t))},tu=i=>{const e=Xt[i.url];if(!e||e.topics.size===0)return;const t=[...e.topics.keys()],n=[],s=Zh();for(let r=0;r<t.length;r+=tl)n.push(t.slice(r,r+tl));for(;e.subIds.length>n.length;){const r=e.subIds.pop();r&&i.send(Ft(["CLOSE",r]))}e.pendingEose.clear(),e.requestedAt=Date.now(),n.forEach((r,o)=>{var c;const a=(c=e.subIds)[o]??(c[o]=wi(64));e.pendingEose.add(a),i.send(Ft(["REQ",a,{kinds:[...new Set(r.map(Jh))],since:s,"#x":r}]))})},nu=i=>{const e=Xt[i.url];if(e&&e.topics.size>0&&!i.isClosed){if(Os(i)>0){ru(i,!0);return}e.retryTimer!==null&&(clearTimeout(e.retryTimer),e.retryTimer=null),tu(i),iu(i)}},iu=i=>{Object.entries(zr.forRelay(i)).forEach(([e,t])=>{su(i,e,t,!0)})},su=async(i,e,t,n)=>{var o;if(aa.has(i)||i.isClosed)return n?Hf:void 0;const s=Os(i);if(s>0||i.socket.readyState!==1)return n?ir(Math.max(ui,s)):void 0;const r=await Wf(e,n?Ft({...Gs(t),nonce:wi(8)}):t);if(n&&!((o=Xt[i.url])!=null&&o.topics.has(e)))return ir(ui);if(Os(i)>0||i.isClosed||i.socket.readyState!==1)return n?ir(ui):void 0;if(i.send(r),n)return ir(ui)},ru=(i,e)=>{const t=Xt[i.url];if(!t||t.retryTimer!==null&&!e)return;t.retryTimer!==null&&clearTimeout(t.retryTimer);const n=e?Os(i):t.retryMs;t.retryMs=Math.min(t.retryMs*2,ui),t.retryTimer=setTimeout(()=>{t.retryTimer=null,nu(i)},Math.max(n,sc))},ou=Nf({init:i=>xd(i,Yf,Ff,!0).map(e=>{const t=Yh.register(e,()=>Ed(e,n=>{var c,l;const[s,r,o,a]=Gs(n);if(s!==Kh){const h=`${Lt}: relay failure from ${t.url} - `,u=s==="CLOSED"&&typeof o=="string"?o:a,f=s==="OK"&&o===!1,m=(f||s==="CLOSED")&&(u==null?void 0:u.startsWith("rate-limited:")),g=f&&(u==null?void 0:u.startsWith("duplicate:")),v=u&&/^(blocked|restricted|auth-required|pow):/.test(u);if(s==="OK"&&o===!0&&Os(t)===0&&Fs.delete(t),(f||s==="CLOSED")&&v&&!Gf(t))return;if(m)Vf(t);else if(s==="EOSE"){const p=Xt[t.url];p!=null&&p.pendingEose.delete(r)&&p.pendingEose.size===0&&(p.retryMs=sc,p.retryTimer!==null&&(clearTimeout(p.retryTimer),p.retryTimer=null),Date.now()-p.requestedAt>=1e3&&iu(t))}s==="CLOSED"&&!v&&ru(t,!!m),!g&&((c=i.relayConfig)==null?void 0:c.warnOnRelayFailure)!==!1&&(s==="NOTICE"?console.warn(h+r):(f||s==="CLOSED")&&console.warn(h+u));return}if(o&&typeof o=="object"&&"content"in o){const h=Xt[t.url];if(h!=null&&h.subIds.includes(r)&&o.tags){const u=o.tags.find(f=>f[0]===jh);u!=null&&u[1]&&((l=h.topics.get(u[1]))==null||l(u[1],o.content))}}},()=>nu(t)));return t.ready}),subscribeTopic:(i,e,t,n)=>{const s=(o,a)=>void t(o,a);Xf(i,e,s);const r=()=>{var o;((o=Xt[i.url])==null?void 0:o.topics.get(e))===s&&qf(i,e)};return n.kind==="root"?$f(i).then(()=>r):r},publishTopic:(i,e,t,{kind:n})=>{const s=typeof t=="string"?t:Ft(t);return n==="announce"&&(zr.forRelay(i)[e]=s),su(i,e,s,n==="announce")},unpublishTopic:(i,e)=>{delete zr.forRelay(i)[e]}}),Yf=["0x-nostr-relay.fly.dev","bendernostur.duckdns.org:8443","cdn.satellite.earth","nos.lol","nostr.chaima.info","nostr.christiansass.de","nostr.rblb.it","nostr.red5d.dev","nostr.robosats.org","nostr.stakey.net","nostrcity-club.fly.dev","relay-dev.gulugulu.moe","relay.aarpia.com","relay.agentry.com","relay.bitmacro.cloud","relay.bullishbounty.com","relay.degmods.com","relay.flashapp.me","relay.grigic.org","relay.hackshed.dev","relay.kaleidoswap.com","relay.layer.systems","relay.nostr.blockhenge.com","relay.nostr.dev.br","relay.nostrmap.net","relay.novospes.com","relay.piazza.today","relay.routstr.com","testr.nymble.world"].map(i=>"wss://"+i);function Yt(i,e){if(!i||typeof i.makeAction!="function")return{send:()=>{},onReceive:()=>{}};const t=i.makeAction(e),n=(s,r)=>{if(typeof s=="string"&&s.length>0)return s;if(s&&typeof s=="object"){if(typeof s.peerId=="string"&&s.peerId.length>0)return s.peerId;if(typeof s.id=="string"&&s.id.length>0)return s.id}if(r&&typeof r=="object"){if(typeof r.id=="string"&&r.id.length>0)return r.id;if(typeof r.senderId=="string"&&r.senderId.length>0)return r.senderId}return null};return Array.isArray(t)?{send:(s,r)=>{try{t[0](s,r)}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{t[1]((r,o)=>{const a=n(o,r);a&&s(r,a)})}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}:{send:(s,r)=>{try{if(t&&typeof t.send=="function"){let o;r&&typeof r=="string"?o=t.send(s,{target:r}):o=t.send(s),o&&typeof o.catch=="function"&&o.catch(()=>{})}}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{if(!t)return;const r=(o,a)=>{const c=n(a,o);c&&s(o,c)};"onMessage"in t?t.onMessage=r:"onReceive"in t&&(typeof t.onReceive=="function"?t.onReceive(r):t.onReceive=r)}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}}const au="rockets-3d-space-shooter",jf="rockets_public_directory_v1",Kf=3e3,nl=12e3,cu=["wss://nos.lol","wss://relay.damus.io","wss://relay.snort.social","wss://nostr.mom"];class Zf{constructor(){this.lobbyRoom=null,this.activeRooms=new Map,this.listeners=new Set,this.heartbeatTimer=null,this.purgeTimer=null,this.currentHostingMatch=null,this.sendHeartbeat=null,this.sendQuery=null,this.isInitialized=!1}init(){if(!this.isInitialized){this.isInitialized=!0;try{this.lobbyRoom=ou({appId:au,relayConfig:{urls:cu}},jf);const e=Yt(this.lobbyRoom,"room_heartbeat"),t=Yt(this.lobbyRoom,"query_rooms");this.sendHeartbeat=e.send,this.sendQuery=t.send,e.onReceive((s,r)=>{!s||!s.roomId||(this.activeRooms.set(s.roomId,{...s,lastSeen:Date.now(),ttlMs:s.ttlMs||nl}),this.notifyListeners())}),t.onReceive((s,r)=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()});const n=()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()};typeof this.lobbyRoom.onPeerJoin=="function"?this.lobbyRoom.onPeerJoin(n):this.lobbyRoom.onPeerJoin=n,this.purgeTimer=setInterval(()=>{const s=Date.now();let r=!1;for(const[o,a]of this.activeRooms.entries())s-a.lastSeen>a.ttlMs&&(this.activeRooms.delete(o),r=!0);r&&this.notifyListeners()},2e3),this.refreshRooms()}catch(e){console.warn("Lobby network init warning:",e)}}}refreshRooms(){if(this.init(),this.sendQuery)try{this.sendQuery({req:"list",from:Ct})}catch(e){console.error(e)}}startMasterKeepAlive(e){this.init(),this.currentHostingMatch=e,this.stopMasterKeepAlive(),this.broadcastCurrentRoom(),this.heartbeatTimer=setInterval(()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()},Kf)}stopMasterKeepAlive(){this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null)}broadcastCurrentRoom(){if(this.currentHostingMatch&&(this.init(),!!this.sendHeartbeat))try{const e=this.currentHostingMatch,t=e.getPlayerCount?e.getPlayerCount():1,n={roomId:e.roomId,roomName:e.roomName||e.roomId,masterId:Ct,playerCount:t,mapSeed:e.mapSeed||42,timestamp:Date.now(),ttlMs:nl};this.sendHeartbeat(n),this.activeRooms.set(e.roomId,{...n,lastSeen:Date.now()}),this.notifyListeners()}catch(e){console.error("Failed to send heartbeat:",e)}}onRoomsUpdated(e){return this.listeners.add(e),e(this.getRoomsList()),()=>this.listeners.delete(e)}notifyListeners(){const e=this.getRoomsList();for(const t of this.listeners)t(e)}getRoomsList(){const e=Date.now(),t=[];for(const n of this.activeRooms.values()){const s=Math.max(0,Math.round((n.lastSeen+n.ttlMs-e)/1e3));t.push({...n,ttlSecondsRemaining:s})}return t.sort((n,s)=>s.lastSeen-n.lastSeen)}destroy(){if(this.stopMasterKeepAlive(),this.purgeTimer&&clearInterval(this.purgeTimer),this.lobbyRoom)try{this.lobbyRoom.leave()}catch{}this.activeRooms.clear(),this.listeners.clear(),this.isInitialized=!1}}const di=new Zf;class Jf{constructor({roomId:e,roomName:t,mapSeed:n,playerName:s,onPeerJoined:r,onPeerLeft:o,onMasterChanged:a,onCombatLog:c}){this.roomId=e,this.roomName=t||e,this.mapSeed=n||42,this.playerName=s||`Pilot-${(Ct||"Host").slice(0,4)}`,this.selfId=Ct,this.onPeerJoined=r||(()=>{}),this.onPeerLeft=o||(()=>{}),this.onMasterChanged=a||(()=>{}),this.onCombatLog=c||(()=>{}),this.room=null,this.currentMasterId=this.selfId,this.isMaster=!0,this.peers=new Map,this.sendState=null,this.sendCannon=null,this.sendMine=null,this.sendHit=null,this.sendKill=null,this.sendPing=null,this.sendPong=null,this.sendLaser=null,this.sendDecoy=null,this.sendMissile=null,this.cannonListeners=new Set,this.mineListeners=new Set,this.hitListeners=new Set,this.killListeners=new Set,this.laserListeners=new Set,this.decoyListeners=new Set,this.missileListeners=new Set,this.pingInterval=null,this.stateBroadcastInterval=null}join(){this.room=ou({appId:au,relayConfig:{urls:cu}},this.roomId);const e=Yt(this.room,"state"),t=Yt(this.room,"cannon"),n=Yt(this.room,"mine"),s=Yt(this.room,"hit"),r=Yt(this.room,"kill"),o=Yt(this.room,"ping"),a=Yt(this.room,"pong"),c=Yt(this.room,"laser"),l=Yt(this.room,"missile"),h=Yt(this.room,"decoy");this.sendState=e.send,this.sendCannon=t.send,this.sendMine=n.send,this.sendHit=s.send,this.sendKill=r.send,this.sendPing=o.send,this.sendPong=a.send,this.sendLaser=c.send,this.sendMissile=l.send,this.sendDecoy=h.send,e.onReceive((m,g)=>{if(!g||typeof g!="string")return;this.peers.has(g)||this.peers.set(g,{id:g,ping:30,lastSeen:Date.now(),packetsReceived:0});const v=this.peers.get(g);v.lastState=m,v.lastSeen=Date.now(),v.packetsReceived=(v.packetsReceived||0)+1}),t.onReceive((m,g)=>{if(!(!g||typeof g!="string"))for(const v of this.cannonListeners)v(m,g)}),c.onReceive((m,g)=>{if(!(!g||typeof g!="string"))for(const v of this.laserListeners)v(m,g)}),l.onReceive((m,g)=>{if(!(!g||typeof g!="string"))for(const v of this.missileListeners)v(m,g)}),h.onReceive((m,g)=>{if(!(!g||typeof g!="string"))for(const v of this.decoyListeners)v(m,g)}),n.onReceive((m,g)=>{if(!(!g||typeof g!="string"))for(const v of this.mineListeners)v(m,g)}),s.onReceive((m,g)=>{if(!(!g||typeof g!="string"))for(const v of this.hitListeners)v(m,g)}),r.onReceive((m,g)=>{if(!(!g||typeof g!="string"))for(const v of this.killListeners)v(m,g)}),o.onReceive((m,g)=>{!g||typeof g!="string"||this.sendPong&&this.sendPong({t:m.t},g)}),a.onReceive((m,g)=>{if(!(!g||typeof g!="string")&&m&&m.t&&this.peers.has(g)){const v=Math.max(1,Date.now()-m.t);this.peers.get(g).ping=v}});const u=m=>{!m||typeof m!="string"||(console.log(`[Mesh] Peer connected: ${m}`),this.peers.set(m,{id:m,ping:40,lastSeen:Date.now()}),this.updateMasterElection(),this.onPeerJoined(m),this.onCombatLog(`🛰️ Pilot joined the mesh: ${m.slice(0,5)}`))},f=m=>{!m||typeof m!="string"||(console.log(`[Mesh] Peer disconnected: ${m}`),this.peers.delete(m),this.updateMasterElection(),this.onPeerLeft(m),this.onCombatLog(`💨 Pilot left the mesh: ${m.slice(0,5)}`))};typeof this.room.onPeerJoin=="function"?this.room.onPeerJoin(u):this.room.onPeerJoin=u,typeof this.room.onPeerLeave=="function"?this.room.onPeerLeave(f):this.room.onPeerLeave=f,this.updateMasterElection(),this.isMaster&&di.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),this.pingInterval=setInterval(()=>{this.sendPing&&this.peers.size>0&&this.sendPing({t:Date.now()})},2e3)}updateMasterElection(){if(!this.room)return;const e=Object.keys(this.room.getPeers()||{}),n=[this.selfId,...e].sort()[0],s=n===this.selfId;if(this.currentMasterId!==n||this.isMaster!==s){const r=this.currentMasterId;this.currentMasterId=n,this.isMaster=s,console.log(`[Mesh] Master Election: elected ${n} (Self is master: ${s})`),s?(di.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),r&&r!==this.selfId&&this.onCombatLog("👑 Previous host left. You took over as Master! Keep-alive active.")):di.stopMasterKeepAlive(),this.onMasterChanged(n,s)}}broadcastLocalState(e){this.sendState&&this.sendState({...e,id:this.selfId,name:this.playerName,time:Date.now()})}broadcastCannon(e){this.sendCannon&&this.sendCannon(e)}broadcastLaser(e){this.sendLaser&&this.sendLaser(e)}broadcastMissile(e){this.sendMissile&&this.sendMissile(e)}broadcastDecoy(e){this.sendDecoy&&this.sendDecoy(e)}onLaser(e){return this.laserListeners.add(e),()=>this.laserListeners.delete(e)}onMissile(e){return this.missileListeners.add(e),()=>this.missileListeners.delete(e)}onDecoy(e){return this.decoyListeners.add(e),()=>this.decoyListeners.delete(e)}broadcastMine(e){this.sendMine&&this.sendMine(e)}sendHitTarget(e,t,n){this.sendHit&&this.sendHit({targetId:e,attackerId:this.selfId,attackerName:this.playerName,damage:t,weapon:n,time:Date.now()})}broadcastKill(e,t,n){this.sendKill&&this.sendKill({victimId:e,killerId:t,killerName:n,time:Date.now()})}onCannon(e){return this.cannonListeners.add(e),()=>this.cannonListeners.delete(e)}onMine(e){return this.mineListeners.add(e),()=>this.mineListeners.delete(e)}onHit(e){return this.hitListeners.add(e),()=>this.hitListeners.delete(e)}onKill(e){return this.killListeners.add(e),()=>this.killListeners.delete(e)}getAveragePing(){if(this.peers.size===0)return 0;let e=0;for(const t of this.peers.values())e+=t.ping||30;return Math.round(e/this.peers.size)}leave(){if(di.stopMasterKeepAlive(),this.pingInterval&&clearInterval(this.pingInterval),this.stateBroadcastInterval&&clearInterval(this.stateBroadcastInterval),this.room){try{this.room.leave()}catch{}this.room=null}this.peers.clear(),this.cannonListeners.clear(),this.mineListeners.clear(),this.hitListeners.clear(),this.killListeners.clear(),this.laserListeners.clear(),this.decoyListeners.clear(),this.missileListeners.clear()}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rc="170",Qf=0,il=1,ep=2,lu=1,tp=2,wn=3,Zn=0,Pt=1,wt=2,qn=0,$i=1,rt=2,sl=3,rl=4,np=5,li=100,ip=101,sp=102,rp=103,op=104,ap=200,cp=201,lp=202,hp=203,ca=204,la=205,up=206,dp=207,fp=208,pp=209,mp=210,gp=211,vp=212,_p=213,yp=214,ha=0,ua=1,da=2,ts=3,fa=4,pa=5,ma=6,ga=7,hu=0,xp=1,Mp=2,$n=0,Sp=1,wp=2,Ep=3,uu=4,Tp=5,bp=6,Ap=7,du=300,ns=301,is=302,va=303,_a=304,jr=306,ks=1e3,fi=1001,ya=1002,ln=1003,Rp=1004,sr=1005,fn=1006,mo=1007,pi=1008,Pn=1009,fu=1010,pu=1011,Bs=1012,oc=1013,_i=1014,bn=1015,Ws=1016,ac=1017,cc=1018,ss=1020,mu=35902,gu=1021,vu=1022,an=1023,_u=1024,yu=1025,Yi=1026,rs=1027,xu=1028,lc=1029,Mu=1030,hc=1031,uc=1033,Lr=33776,Dr=33777,Ir=33778,Ur=33779,xa=35840,Ma=35841,Sa=35842,wa=35843,Ea=36196,Ta=37492,ba=37496,Aa=37808,Ra=37809,Ca=37810,Pa=37811,La=37812,Da=37813,Ia=37814,Ua=37815,Na=37816,Fa=37817,Oa=37818,ka=37819,Ba=37820,za=37821,Nr=36492,Va=36494,Ha=36495,Su=36283,Ga=36284,Wa=36285,Xa=36286,Cp=3200,Pp=3201,wu=0,Lp=1,Gn="",jt="srgb",as="srgb-linear",Kr="linear",it="srgb",Ri=7680,ol=519,Dp=512,Ip=513,Up=514,Eu=515,Np=516,Fp=517,Op=518,kp=519,qa=35044,al="300 es",An=2e3,Vr=2001;class cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const At=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],go=Math.PI/180,$a=180/Math.PI;function Yn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(At[i&255]+At[i>>8&255]+At[i>>16&255]+At[i>>24&255]+"-"+At[e&255]+At[e>>8&255]+"-"+At[e>>16&15|64]+At[e>>24&255]+"-"+At[t&63|128]+At[t>>8&255]+"-"+At[t>>16&255]+At[t>>24&255]+At[n&255]+At[n>>8&255]+At[n>>16&255]+At[n>>24&255]).toLowerCase()}function kt(i,e,t){return Math.max(e,Math.min(t,i))}function Bp(i,e){return(i%e+e)%e}function vo(i,e,t){return(1-t)*i+t*e}function dn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,s,r,o,a,c,l){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],m=n[5],g=n[8],v=s[0],p=s[3],d=s[6],_=s[1],x=s[4],y=s[7],A=s[2],b=s[5],R=s[8];return r[0]=o*v+a*_+c*A,r[3]=o*p+a*x+c*b,r[6]=o*d+a*y+c*R,r[1]=l*v+h*_+u*A,r[4]=l*p+h*x+u*b,r[7]=l*d+h*y+u*R,r[2]=f*v+m*_+g*A,r[5]=f*p+m*x+g*b,r[8]=f*d+m*y+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,m=l*r-o*c,g=t*u+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*l-h*n)*v,e[2]=(a*n-s*o)*v,e[3]=f*v,e[4]=(h*t-s*c)*v,e[5]=(s*r-a*t)*v,e[6]=m*v,e[7]=(n*c-l*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(_o.makeScale(e,t)),this}rotate(e){return this.premultiply(_o.makeRotation(-e)),this}translate(e,t){return this.premultiply(_o.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _o=new We;function Tu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Hr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zp(){const i=Hr("canvas");return i.style.display="block",i}const cl={};function As(i){i in cl||(cl[i]=!0,console.warn(i))}function Vp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Hp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Gp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ze={enabled:!0,workingColorSpace:as,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===it&&(i.r=Rn(i.r),i.g=Rn(i.g),i.b=Rn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===it&&(i.r=ji(i.r),i.g=ji(i.g),i.b=ji(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Gn?Kr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Rn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ll=[.64,.33,.3,.6,.15,.06],hl=[.2126,.7152,.0722],ul=[.3127,.329],dl=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fl=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ze.define({[as]:{primaries:ll,whitePoint:ul,transfer:Kr,toXYZ:dl,fromXYZ:fl,luminanceCoefficients:hl,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:ll,whitePoint:ul,transfer:it,toXYZ:dl,fromXYZ:fl,luminanceCoefficients:hl,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}});let Ci;class Wp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ci===void 0&&(Ci=Hr("canvas")),Ci.width=e.width,Ci.height=e.height;const n=Ci.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ci}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Rn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Rn(t[n]/255)*255):t[n]=Rn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xp=0;class bu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=Yn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(yo(s[o].image)):r.push(yo(s[o]))}else r=yo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function yo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qp=0;class Nt extends cs{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,n=fi,s=fi,r=fn,o=pi,a=an,c=Pn,l=Nt.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=Yn(),this.name="",this.source=new bu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ks:e.x=e.x-Math.floor(e.x);break;case fi:e.x=e.x<0?0:1;break;case ya:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ks:e.y=e.y-Math.floor(e.y);break;case fi:e.y=e.y<0?0:1;break;case ya:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=du;Nt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,s=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],m=c[5],g=c[9],v=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,y=(m+1)/2,A=(d+1)/2,b=(h+f)/4,R=(u+v)/4,D=(g+p)/4;return x>y&&x>A?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=b/n,r=R/n):y>A?y<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=b/s,r=D/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=D/r),this.set(n,s,r,t),this}let _=Math.sqrt((p-g)*(p-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(p-g)/_,this.y=(u-v)/_,this.z=(f-h)/_,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $p extends cs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Nt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new bu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends $p{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Au extends Nt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yp extends Nt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],m=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=v;return}if(u!==v||c!==f||l!==m||h!==g){let p=1-a;const d=c*f+l*m+h*g+u*v,_=d>=0?1:-1,x=1-d*d;if(x>Number.EPSILON){const A=Math.sqrt(x),b=Math.atan2(A,d*_);p=Math.sin(p*b)/A,a=Math.sin(a*b)/A}const y=a*_;if(c=c*p+f*y,l=l*p+m*y,h=h*p+g*y,u=u*p+v*y,p===1-a){const A=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=A,l*=A,h*=A,u*=A}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*m-l*f,e[t+1]=c*g+h*f+l*u-a*m,e[t+2]=l*g+h*m+a*f-c*u,e[t+3]=h*g-a*u-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),m=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u+f*m*g;break;case"YZX":this._x=f*h*u+l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u-f*m*g;break;case"XZY":this._x=f*h*u-l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(kt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xo.copy(this).projectOnVector(e),this.sub(xo)}reflect(e){return this.sub(xo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(kt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xo=new U,pl=new Zt;class Xs{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,nn):nn.fromBufferAttribute(r,o),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(e.matrixWorld),this.union(rr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vs),or.subVectors(this.max,vs),Pi.subVectors(e.a,vs),Li.subVectors(e.b,vs),Di.subVectors(e.c,vs),Un.subVectors(Li,Pi),Nn.subVectors(Di,Li),ei.subVectors(Pi,Di);let t=[0,-Un.z,Un.y,0,-Nn.z,Nn.y,0,-ei.z,ei.y,Un.z,0,-Un.x,Nn.z,0,-Nn.x,ei.z,0,-ei.x,-Un.y,Un.x,0,-Nn.y,Nn.x,0,-ei.y,ei.x,0];return!Mo(t,Pi,Li,Di,or)||(t=[1,0,0,0,1,0,0,0,1],!Mo(t,Pi,Li,Di,or))?!1:(ar.crossVectors(Un,Nn),t=[ar.x,ar.y,ar.z],Mo(t,Pi,Li,Di,or))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(vn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),vn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),vn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),vn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),vn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),vn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),vn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),vn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(vn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const vn=[new U,new U,new U,new U,new U,new U,new U,new U],nn=new U,rr=new Xs,Pi=new U,Li=new U,Di=new U,Un=new U,Nn=new U,ei=new U,vs=new U,or=new U,ar=new U,ti=new U;function Mo(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ti.fromArray(i,r);const a=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),c=e.dot(ti),l=t.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const jp=new Xs,_s=new U,So=new U;class qs{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_s.subVectors(e,this.center);const t=_s.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(_s,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(So.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_s.copy(e.center).add(So)),this.expandByPoint(_s.copy(e.center).sub(So))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const _n=new U,wo=new U,cr=new U,Fn=new U,Eo=new U,lr=new U,To=new U;class Ru{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_n)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=_n.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_n.copy(this.origin).addScaledVector(this.direction,t),_n.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){wo.copy(e).add(t).multiplyScalar(.5),cr.copy(t).sub(e).normalize(),Fn.copy(this.origin).sub(wo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(cr),a=Fn.dot(this.direction),c=-Fn.dot(cr),l=Fn.lengthSq(),h=Math.abs(1-o*o);let u,f,m,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,m=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(wo).addScaledVector(cr,f),m}intersectSphere(e,t){_n.subVectors(e.center,this.origin);const n=_n.dot(this.direction),s=_n.dot(_n)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,_n)!==null}intersectTriangle(e,t,n,s,r){Eo.subVectors(t,e),lr.subVectors(n,e),To.crossVectors(Eo,lr);let o=this.direction.dot(To),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Fn.subVectors(this.origin,e);const c=a*this.direction.dot(lr.crossVectors(Fn,lr));if(c<0)return null;const l=a*this.direction.dot(Eo.cross(Fn));if(l<0||c+l>o)return null;const h=-a*Fn.dot(To);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class dt{constructor(e,t,n,s,r,o,a,c,l,h,u,f,m,g,v,p){dt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,m,g,v,p)}set(e,t,n,s,r,o,a,c,l,h,u,f,m,g,v,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=g,d[11]=v,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new dt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ii.setFromMatrixColumn(e,0).length(),r=1/Ii.setFromMatrixColumn(e,1).length(),o=1/Ii.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,m=o*u,g=a*h,v=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+g*l,t[5]=f-v*l,t[9]=-a*c,t[2]=v-f*l,t[6]=g+m*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,m=c*u,g=l*h,v=l*u;t[0]=f+v*a,t[4]=g*a-m,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-g,t[6]=v+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,m=c*u,g=l*h,v=l*u;t[0]=f-v*a,t[4]=-o*u,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*h,t[9]=v-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,m=o*u,g=a*h,v=a*u;t[0]=c*h,t[4]=g*l-m,t[8]=f*l+v,t[1]=c*u,t[5]=v*l+f,t[9]=m*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,m=o*l,g=a*c,v=a*l;t[0]=c*h,t[4]=v-f*u,t[8]=g*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=m*u+g,t[10]=f-v*u}else if(e.order==="XZY"){const f=o*c,m=o*l,g=a*c,v=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+v,t[5]=o*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=a*h,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kp,e,Zp)}lookAt(e,t,n){const s=this.elements;return Vt.subVectors(e,t),Vt.lengthSq()===0&&(Vt.z=1),Vt.normalize(),On.crossVectors(n,Vt),On.lengthSq()===0&&(Math.abs(n.z)===1?Vt.x+=1e-4:Vt.z+=1e-4,Vt.normalize(),On.crossVectors(n,Vt)),On.normalize(),hr.crossVectors(Vt,On),s[0]=On.x,s[4]=hr.x,s[8]=Vt.x,s[1]=On.y,s[5]=hr.y,s[9]=Vt.y,s[2]=On.z,s[6]=hr.z,s[10]=Vt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],m=n[13],g=n[2],v=n[6],p=n[10],d=n[14],_=n[3],x=n[7],y=n[11],A=n[15],b=s[0],R=s[4],D=s[8],w=s[12],M=s[1],I=s[5],H=s[9],S=s[13],L=s[2],N=s[6],P=s[10],z=s[14],k=s[3],O=s[7],B=s[11],Z=s[15];return r[0]=o*b+a*M+c*L+l*k,r[4]=o*R+a*I+c*N+l*O,r[8]=o*D+a*H+c*P+l*B,r[12]=o*w+a*S+c*z+l*Z,r[1]=h*b+u*M+f*L+m*k,r[5]=h*R+u*I+f*N+m*O,r[9]=h*D+u*H+f*P+m*B,r[13]=h*w+u*S+f*z+m*Z,r[2]=g*b+v*M+p*L+d*k,r[6]=g*R+v*I+p*N+d*O,r[10]=g*D+v*H+p*P+d*B,r[14]=g*w+v*S+p*z+d*Z,r[3]=_*b+x*M+y*L+A*k,r[7]=_*R+x*I+y*N+A*O,r[11]=_*D+x*H+y*P+A*B,r[15]=_*w+x*S+y*z+A*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],m=e[14],g=e[3],v=e[7],p=e[11],d=e[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*m-n*c*m)+v*(+t*c*m-t*l*f+r*o*f-s*o*m+s*l*h-r*c*h)+p*(+t*l*u-t*a*m-r*o*u+n*o*m+r*a*h-n*l*h)+d*(-s*a*h-t*c*u+t*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],m=e[11],g=e[12],v=e[13],p=e[14],d=e[15],_=u*p*l-v*f*l+v*c*m-a*p*m-u*c*d+a*f*d,x=g*f*l-h*p*l-g*c*m+o*p*m+h*c*d-o*f*d,y=h*v*l-g*u*l+g*a*m-o*v*m-h*a*d+o*u*d,A=g*u*c-h*v*c-g*a*f+o*v*f+h*a*p-o*u*p,b=t*_+n*x+s*y+r*A;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/b;return e[0]=_*R,e[1]=(v*f*r-u*p*r-v*s*m+n*p*m+u*s*d-n*f*d)*R,e[2]=(a*p*r-v*c*r+v*s*l-n*p*l-a*s*d+n*c*d)*R,e[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*m-n*c*m)*R,e[4]=x*R,e[5]=(h*p*r-g*f*r+g*s*m-t*p*m-h*s*d+t*f*d)*R,e[6]=(g*c*r-o*p*r-g*s*l+t*p*l+o*s*d-t*c*d)*R,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*m+t*c*m)*R,e[8]=y*R,e[9]=(g*u*r-h*v*r-g*n*m+t*v*m+h*n*d-t*u*d)*R,e[10]=(o*v*r-g*a*r+g*n*l-t*v*l-o*n*d+t*a*d)*R,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*m-t*a*m)*R,e[12]=A*R,e[13]=(h*v*s-g*u*s+g*n*f-t*v*f-h*n*p+t*u*p)*R,e[14]=(g*a*s-o*v*s-g*n*c+t*v*c+o*n*p-t*a*p)*R,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*f+t*a*f)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,m=r*h,g=r*u,v=o*h,p=o*u,d=a*u,_=c*l,x=c*h,y=c*u,A=n.x,b=n.y,R=n.z;return s[0]=(1-(v+d))*A,s[1]=(m+y)*A,s[2]=(g-x)*A,s[3]=0,s[4]=(m-y)*b,s[5]=(1-(f+d))*b,s[6]=(p+_)*b,s[7]=0,s[8]=(g+x)*R,s[9]=(p-_)*R,s[10]=(1-(f+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ii.set(s[0],s[1],s[2]).length();const o=Ii.set(s[4],s[5],s[6]).length(),a=Ii.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const l=1/r,h=1/o,u=1/a;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=u,sn.elements[9]*=u,sn.elements[10]*=u,t.setFromRotationMatrix(sn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=An){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let m,g;if(a===An)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Vr)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=An){const c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),f=(t+e)*l,m=(n+s)*h;let g,v;if(a===An)g=(o+r)*u,v=-2*u;else if(a===Vr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ii=new U,sn=new dt,Kp=new U(0,0,0),Zp=new U(1,1,1),On=new U,hr=new U,Vt=new U,ml=new dt,gl=new Zt;class Qt{constructor(e=0,t=0,n=0,s=Qt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(kt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-kt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(kt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-kt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(kt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-kt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ml,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gl.setFromEuler(this),this.setFromQuaternion(gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qt.DEFAULT_ORDER="XYZ";class Cu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jp=0;const vl=new U,Ui=new Zt,yn=new dt,ur=new U,ys=new U,Qp=new U,em=new Zt,_l=new U(1,0,0),yl=new U(0,1,0),xl=new U(0,0,1),Ml={type:"added"},tm={type:"removed"},Ni={type:"childadded",child:null},bo={type:"childremoved",child:null};class vt extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=Yn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new U,t=new Qt,n=new Zt,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new dt},normalMatrix:{value:new We}}),this.matrix=new dt,this.matrixWorld=new dt,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(_l,e)}rotateY(e){return this.rotateOnAxis(yl,e)}rotateZ(e){return this.rotateOnAxis(xl,e)}translateOnAxis(e,t){return vl.copy(e).applyQuaternion(this.quaternion),this.position.add(vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_l,e)}translateY(e){return this.translateOnAxis(yl,e)}translateZ(e){return this.translateOnAxis(xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ur.copy(e):ur.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(ys,ur,this.up):yn.lookAt(ur,ys,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(yn),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ml),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tm),bo.child=e,this.dispatchEvent(bo),bo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ml),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,e,Qp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,em,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}vt.DEFAULT_UP=new U(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new U,xn=new U,Ao=new U,Mn=new U,Fi=new U,Oi=new U,Sl=new U,Ro=new U,Co=new U,Po=new U,Lo=new ot,Do=new ot,Io=new ot;class Kt{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),xn.subVectors(n,t),Ao.subVectors(e,t);const o=rn.dot(rn),a=rn.dot(xn),c=rn.dot(Ao),l=xn.dot(xn),h=xn.dot(Ao),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Mn)===null?!1:Mn.x>=0&&Mn.y>=0&&Mn.x+Mn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Mn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Mn.x),c.addScaledVector(o,Mn.y),c.addScaledVector(a,Mn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Lo.setScalar(0),Do.setScalar(0),Io.setScalar(0),Lo.fromBufferAttribute(e,t),Do.fromBufferAttribute(e,n),Io.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Lo,r.x),o.addScaledVector(Do,r.y),o.addScaledVector(Io,r.z),o}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),xn.subVectors(e,t),rn.cross(xn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),xn.subVectors(this.a,this.b),rn.cross(xn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Fi.subVectors(s,n),Oi.subVectors(r,n),Ro.subVectors(e,n);const c=Fi.dot(Ro),l=Oi.dot(Ro);if(c<=0&&l<=0)return t.copy(n);Co.subVectors(e,s);const h=Fi.dot(Co),u=Oi.dot(Co);if(h>=0&&u<=h)return t.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Fi,o);Po.subVectors(e,r);const m=Fi.dot(Po),g=Oi.dot(Po);if(g>=0&&m<=g)return t.copy(r);const v=m*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Oi,a);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Sl.subVectors(r,s),a=(u-h)/(u-h+(m-g)),t.copy(s).addScaledVector(Sl,a);const d=1/(p+v+f);return o=v*d,a=f*d,t.copy(n).addScaledVector(Fi,o).addScaledVector(Oi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},dr={h:0,s:0,l:0};function Uo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ke{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=Bp(e,1),t=kt(t,0,1),n=kt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Uo(o,r,e+1/3),this.g=Uo(o,r,e),this.b=Uo(o,r,e-1/3)}return Ze.toWorkingColorSpace(this,s),this}setStyle(e,t=jt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=Pu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Rn(e.r),this.g=Rn(e.g),this.b=Rn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return Ze.fromWorkingColorSpace(Rt.copy(this),e),Math.round(kt(Rt.r*255,0,255))*65536+Math.round(kt(Rt.g*255,0,255))*256+Math.round(kt(Rt.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(Rt.copy(this),t);const n=Rt.r,s=Rt.g,r=Rt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=jt){Ze.fromWorkingColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,s=Rt.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(dr);const n=vo(kn.h,dr.h,t),s=vo(kn.s,dr.s,t),r=vo(kn.l,dr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new Ke;Ke.NAMES=Pu;let nm=0;class Ti extends cs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=Yn(),this.name="",this.blending=$i,this.side=Zn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ca,this.blendDst=la,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==Zn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ca&&(n.blendSrc=this.blendSrc),this.blendDst!==la&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ol&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ye extends Ti{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=hu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gt=new U,fr=new ze;class mt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qa,this.updateRanges=[],this.gpuType=bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyMatrix3(e),this.setXY(t,fr.x,fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qa&&(e.usage=this.usage),e}}class Lu extends mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Du extends mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends mt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let im=0;const $t=new dt,No=new vt,ki=new U,Ht=new Xs,xs=new Xs,Mt=new U;class xt extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=Yn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Tu(e)?Du:Lu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return No.lookAt(e),No.updateMatrix(),this.applyMatrix4(No.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(Mt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(Mt),Mt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(Mt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Mt.addVectors(Ht.min,xs.min),Ht.expandByPoint(Mt),Mt.addVectors(Ht.max,xs.max),Ht.expandByPoint(Mt)):(Ht.expandByPoint(xs.min),Ht.expandByPoint(xs.max))}Ht.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Mt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Mt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Mt.fromBufferAttribute(a,l),c&&(ki.fromBufferAttribute(e,l),Mt.add(ki)),s=Math.max(s,n.distanceToSquared(Mt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new U,c[D]=new U;const l=new U,h=new U,u=new U,f=new ze,m=new ze,g=new ze,v=new U,p=new U;function d(D,w,M){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,D),m.fromBufferAttribute(r,w),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),m.sub(f),g.sub(f);const I=1/(m.x*g.y-g.x*m.y);isFinite(I)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(I),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(I),a[D].add(v),a[w].add(v),a[M].add(v),c[D].add(p),c[w].add(p),c[M].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let D=0,w=_.length;D<w;++D){const M=_[D],I=M.start,H=M.count;for(let S=I,L=I+H;S<L;S+=3)d(e.getX(S+0),e.getX(S+1),e.getX(S+2))}const x=new U,y=new U,A=new U,b=new U;function R(D){A.fromBufferAttribute(s,D),b.copy(A);const w=a[D];x.copy(w),x.sub(A.multiplyScalar(A.dot(w))).normalize(),y.crossVectors(b,w);const I=y.dot(c[D])<0?-1:1;o.setXYZW(D,x.x,x.y,x.z,I)}for(let D=0,w=_.length;D<w;++D){const M=_[D],I=M.start,H=M.count;for(let S=I,L=I+H;S<L;S+=3)R(e.getX(S+0)),R(e.getX(S+1)),R(e.getX(S+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),v=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mt.fromBufferAttribute(e,t),Mt.normalize(),e.setXYZ(t,Mt.x,Mt.y,Mt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let m=0,g=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?m=c[v]*a.data.stride+a.offset:m=c[v]*h;for(let d=0;d<h;d++)f[g++]=l[m++]}return new mt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],m=e(f,n);c.push(m)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wl=new dt,ni=new Ru,pr=new qs,El=new U,mr=new U,gr=new U,vr=new U,Fo=new U,_r=new U,Tl=new U,yr=new U;class xe extends vt{constructor(e=new xt,t=new Ye){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){_r.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Fo.fromBufferAttribute(u,e),o?_r.addScaledVector(Fo,h):_r.addScaledVector(Fo.sub(t),h))}t.add(_r)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(r),ni.copy(e.ray).recast(e.near),!(pr.containsPoint(ni.origin)===!1&&(ni.intersectSphere(pr,El)===null||ni.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(wl.copy(r).invert(),ni.copy(e.ray).applyMatrix4(wl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],d=o[p.materialIndex],_=Math.max(p.start,m.start),x=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let y=_,A=x;y<A;y+=3){const b=a.getX(y),R=a.getX(y+1),D=a.getX(y+2);s=xr(this,d,e,n,l,h,u,b,R,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let p=g,d=v;p<d;p+=3){const _=a.getX(p),x=a.getX(p+1),y=a.getX(p+2);s=xr(this,o,e,n,l,h,u,_,x,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],d=o[p.materialIndex],_=Math.max(p.start,m.start),x=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=_,A=x;y<A;y+=3){const b=y,R=y+1,D=y+2;s=xr(this,d,e,n,l,h,u,b,R,D),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let p=g,d=v;p<d;p+=3){const _=p,x=p+1,y=p+2;s=xr(this,o,e,n,l,h,u,_,x,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function sm(i,e,t,n,s,r,o,a){let c;if(e.side===Pt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Zn,a),c===null)return null;yr.copy(a),yr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(yr);return l<t.near||l>t.far?null:{distance:l,point:yr.clone(),object:i}}function xr(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,mr),i.getVertexPosition(c,gr),i.getVertexPosition(l,vr);const h=sm(i,e,t,n,mr,gr,vr,Tl);if(h){const u=new U;Kt.getBarycoord(Tl,mr,gr,vr,u),s&&(h.uv=Kt.getInterpolatedAttribute(s,a,c,l,u,new ze)),r&&(h.uv1=Kt.getInterpolatedAttribute(r,a,c,l,u,new ze)),o&&(h.normal=Kt.getInterpolatedAttribute(o,a,c,l,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new U,materialIndex:0};Kt.getNormal(mr,gr,vr,f.normal),h.face=f,h.barycoord=u}return h}class Et extends xt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(u,2));function g(v,p,d,_,x,y,A,b,R,D,w){const M=y/R,I=A/D,H=y/2,S=A/2,L=b/2,N=R+1,P=D+1;let z=0,k=0;const O=new U;for(let B=0;B<P;B++){const Z=B*I-S;for(let ce=0;ce<N;ce++){const Me=ce*M-H;O[v]=Me*_,O[p]=Z*x,O[d]=L,l.push(O.x,O.y,O.z),O[v]=0,O[p]=0,O[d]=b>0?1:-1,h.push(O.x,O.y,O.z),u.push(ce/R),u.push(1-B/D),z+=1}}for(let B=0;B<D;B++)for(let Z=0;Z<R;Z++){const ce=f+Z+N*B,Me=f+Z+N*(B+1),X=f+(Z+1)+N*(B+1),Q=f+(Z+1)+N*B;c.push(ce,Me,Q),c.push(Me,X,Q),k+=6}a.addGroup(m,k,w),m+=k,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Et(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function os(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function It(i){const e={};for(let t=0;t<i.length;t++){const n=os(i[t]);for(const s in n)e[s]=n[s]}return e}function rm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Iu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const om={clone:os,merge:It};var am=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Jn extends Ti{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=am,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=rm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Uu extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new dt,this.projectionMatrix=new dt,this.projectionMatrixInverse=new dt,this.coordinateSystem=An}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new U,bl=new ze,Al=new ze;class Gt extends Uu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$a*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(go*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $a*2*Math.atan(Math.tan(go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,bl,Al),t.subVectors(Al,bl)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(go*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bi=-90,zi=1;class lm extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Gt(Bi,zi,e,t);s.layers=this.layers,this.add(s);const r=new Gt(Bi,zi,e,t);r.layers=this.layers,this.add(r);const o=new Gt(Bi,zi,e,t);o.layers=this.layers,this.add(o);const a=new Gt(Bi,zi,e,t);a.layers=this.layers,this.add(a);const c=new Gt(Bi,zi,e,t);c.layers=this.layers,this.add(c);const l=new Gt(Bi,zi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===An)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Nu extends Nt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ns,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hm extends yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Nu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:fn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Et(5,5,5),r=new Jn({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Pt,blending:qn});r.uniforms.tEquirect.value=t;const o=new xe(s,r),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=fn),new lm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Oo=new U,um=new U,dm=new We;class ai{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Oo.subVectors(n,t).cross(um.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Oo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||dm.getNormalMatrix(e),s=this.coplanarPoint(Oo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new qs,Mr=new U;class dc{constructor(e=new ai,t=new ai,n=new ai,s=new ai,r=new ai,o=new ai){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=An){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],m=s[8],g=s[9],v=s[10],p=s[11],d=s[12],_=s[13],x=s[14],y=s[15];if(n[0].setComponents(c-r,f-l,p-m,y-d).normalize(),n[1].setComponents(c+r,f+l,p+m,y+d).normalize(),n[2].setComponents(c+o,f+h,p+g,y+_).normalize(),n[3].setComponents(c-o,f-h,p-g,y-_).normalize(),n[4].setComponents(c-a,f-u,p-v,y-x).normalize(),t===An)n[5].setComponents(c+a,f+u,p+v,y+x).normalize();else if(t===Vr)n[5].setComponents(a,u,v,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Mr.x=s.normal.x>0?e.max.x:e.min.x,Mr.y=s.normal.y>0?e.max.y:e.min.y,Mr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fu(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function fm(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<u.length;m++){const g=u[f],v=u[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let m=0,g=u.length;m<g;m++){const v=u[m];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class $s extends xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,m=[],g=[],v=[],p=[];for(let d=0;d<h;d++){const _=d*f-o;for(let x=0;x<l;x++){const y=x*u-r;g.push(y,-_,0),v.push(0,0,1),p.push(x/a),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let _=0;_<a;_++){const x=_+l*d,y=_+l*(d+1),A=_+1+l*(d+1),b=_+1+l*d;m.push(x,y,b),m.push(y,A,b)}this.setIndex(m),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(v,3)),this.setAttribute("uv",new pt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $s(e.width,e.height,e.widthSegments,e.heightSegments)}}var pm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,mm=`#ifdef USE_ALPHAHASH
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
#endif`,gm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_m=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ym=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xm=`#ifdef USE_AOMAP
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
#endif`,Mm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Sm=`#ifdef USE_BATCHING
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
#endif`,wm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Am=`#ifdef USE_IRIDESCENCE
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
#endif`,Rm=`#ifdef USE_BUMPMAP
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
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Fm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Om=`#define PI 3.141592653589793
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
} // validated`,km=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Bm=`vec3 transformedNormal = objectNormal;
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
#endif`,zm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Gm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qm=`#ifdef USE_ENVMAP
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
#endif`,$m=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ym=`#ifdef USE_ENVMAP
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
#endif`,jm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Km=`#ifdef USE_ENVMAP
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
#endif`,Zm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,eg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,tg=`#ifdef USE_GRADIENTMAP
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
}`,ng=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ig=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,sg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,rg=`uniform bool receiveShadow;
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
#endif`,og=`#ifdef USE_ENVMAP
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
#endif`,ag=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ug=`PhysicalMaterial material;
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
#endif`,dg=`struct PhysicalMaterial {
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
}`,fg=`
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
#endif`,pg=`#if defined( RE_IndirectDiffuse )
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
#endif`,mg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_g=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,xg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Mg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Sg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wg=`#if defined( USE_POINTS_UV )
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
#endif`,Eg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Tg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,bg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ag=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cg=`#ifdef USE_MORPHTARGETS
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
#endif`,Pg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ng=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Fg=`#ifdef USE_NORMALMAP
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
#endif`,Og=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,kg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Bg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Vg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Hg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Gg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Wg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,qg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$g=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Yg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Jg=`float getShadowMask() {
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
}`,Qg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,e0=`#ifdef USE_SKINNING
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
#endif`,t0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,n0=`#ifdef USE_SKINNING
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
#endif`,i0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,s0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,r0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,o0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,a0=`#ifdef USE_TRANSMISSION
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
#endif`,c0=`#ifdef USE_TRANSMISSION
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
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const f0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,p0=`uniform sampler2D t2D;
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
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,g0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,v0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,y0=`#include <common>
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
}`,x0=`#if DEPTH_PACKING == 3200
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
}`,M0=`#define DISTANCE
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
}`,S0=`#define DISTANCE
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
}`,w0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,E0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,T0=`uniform float scale;
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
}`,b0=`uniform vec3 diffuse;
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
}`,A0=`#include <common>
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
}`,R0=`uniform vec3 diffuse;
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
}`,C0=`#define LAMBERT
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
}`,P0=`#define LAMBERT
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
}`,L0=`#define MATCAP
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
}`,D0=`#define MATCAP
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
}`,I0=`#define NORMAL
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
}`,U0=`#define NORMAL
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
}`,N0=`#define PHONG
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
}`,F0=`#define PHONG
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
}`,O0=`#define STANDARD
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
}`,k0=`#define STANDARD
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
}`,B0=`#define TOON
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
}`,z0=`#define TOON
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
}`,V0=`uniform float size;
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
}`,H0=`uniform vec3 diffuse;
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
}`,G0=`#include <common>
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
}`,W0=`uniform vec3 color;
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
}`,X0=`uniform float rotation;
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
}`,q0=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:pm,alphahash_pars_fragment:mm,alphamap_fragment:gm,alphamap_pars_fragment:vm,alphatest_fragment:_m,alphatest_pars_fragment:ym,aomap_fragment:xm,aomap_pars_fragment:Mm,batching_pars_vertex:Sm,batching_vertex:wm,begin_vertex:Em,beginnormal_vertex:Tm,bsdfs:bm,iridescence_fragment:Am,bumpmap_pars_fragment:Rm,clipping_planes_fragment:Cm,clipping_planes_pars_fragment:Pm,clipping_planes_pars_vertex:Lm,clipping_planes_vertex:Dm,color_fragment:Im,color_pars_fragment:Um,color_pars_vertex:Nm,color_vertex:Fm,common:Om,cube_uv_reflection_fragment:km,defaultnormal_vertex:Bm,displacementmap_pars_vertex:zm,displacementmap_vertex:Vm,emissivemap_fragment:Hm,emissivemap_pars_fragment:Gm,colorspace_fragment:Wm,colorspace_pars_fragment:Xm,envmap_fragment:qm,envmap_common_pars_fragment:$m,envmap_pars_fragment:Ym,envmap_pars_vertex:jm,envmap_physical_pars_fragment:og,envmap_vertex:Km,fog_vertex:Zm,fog_pars_vertex:Jm,fog_fragment:Qm,fog_pars_fragment:eg,gradientmap_pars_fragment:tg,lightmap_pars_fragment:ng,lights_lambert_fragment:ig,lights_lambert_pars_fragment:sg,lights_pars_begin:rg,lights_toon_fragment:ag,lights_toon_pars_fragment:cg,lights_phong_fragment:lg,lights_phong_pars_fragment:hg,lights_physical_fragment:ug,lights_physical_pars_fragment:dg,lights_fragment_begin:fg,lights_fragment_maps:pg,lights_fragment_end:mg,logdepthbuf_fragment:gg,logdepthbuf_pars_fragment:vg,logdepthbuf_pars_vertex:_g,logdepthbuf_vertex:yg,map_fragment:xg,map_pars_fragment:Mg,map_particle_fragment:Sg,map_particle_pars_fragment:wg,metalnessmap_fragment:Eg,metalnessmap_pars_fragment:Tg,morphinstance_vertex:bg,morphcolor_vertex:Ag,morphnormal_vertex:Rg,morphtarget_pars_vertex:Cg,morphtarget_vertex:Pg,normal_fragment_begin:Lg,normal_fragment_maps:Dg,normal_pars_fragment:Ig,normal_pars_vertex:Ug,normal_vertex:Ng,normalmap_pars_fragment:Fg,clearcoat_normal_fragment_begin:Og,clearcoat_normal_fragment_maps:kg,clearcoat_pars_fragment:Bg,iridescence_pars_fragment:zg,opaque_fragment:Vg,packing:Hg,premultiplied_alpha_fragment:Gg,project_vertex:Wg,dithering_fragment:Xg,dithering_pars_fragment:qg,roughnessmap_fragment:$g,roughnessmap_pars_fragment:Yg,shadowmap_pars_fragment:jg,shadowmap_pars_vertex:Kg,shadowmap_vertex:Zg,shadowmask_pars_fragment:Jg,skinbase_vertex:Qg,skinning_pars_vertex:e0,skinning_vertex:t0,skinnormal_vertex:n0,specularmap_fragment:i0,specularmap_pars_fragment:s0,tonemapping_fragment:r0,tonemapping_pars_fragment:o0,transmission_fragment:a0,transmission_pars_fragment:c0,uv_pars_fragment:l0,uv_pars_vertex:h0,uv_vertex:u0,worldpos_vertex:d0,background_vert:f0,background_frag:p0,backgroundCube_vert:m0,backgroundCube_frag:g0,cube_vert:v0,cube_frag:_0,depth_vert:y0,depth_frag:x0,distanceRGBA_vert:M0,distanceRGBA_frag:S0,equirect_vert:w0,equirect_frag:E0,linedashed_vert:T0,linedashed_frag:b0,meshbasic_vert:A0,meshbasic_frag:R0,meshlambert_vert:C0,meshlambert_frag:P0,meshmatcap_vert:L0,meshmatcap_frag:D0,meshnormal_vert:I0,meshnormal_frag:U0,meshphong_vert:N0,meshphong_frag:F0,meshphysical_vert:O0,meshphysical_frag:k0,meshtoon_vert:B0,meshtoon_frag:z0,points_vert:V0,points_frag:H0,shadow_vert:G0,shadow_frag:W0,sprite_vert:X0,sprite_frag:q0},pe={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},un={basic:{uniforms:It([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:It([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:It([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:It([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:It([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ke(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:It([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:It([pe.points,pe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:It([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:It([pe.common,pe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:It([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:It([pe.sprite,pe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:It([pe.common,pe.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:It([pe.lights,pe.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};un.physical={uniforms:It([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Sr={r:0,b:0,g:0},si=new Qt,$0=new dt;function Y0(i,e,t,n,s,r,o){const a=new Ke(0);let c=r===!0?0:1,l,h,u=null,f=0,m=null;function g(_){let x=_.isScene===!0?_.background:null;return x&&x.isTexture&&(x=(_.backgroundBlurriness>0?t:e).get(x)),x}function v(_){let x=!1;const y=g(_);y===null?d(a,c):y&&y.isColor&&(d(y,1),x=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(_,x){const y=g(x);y&&(y.isCubeTexture||y.mapping===jr)?(h===void 0&&(h=new xe(new Et(1,1,1),new Jn({name:"BackgroundCubeMaterial",uniforms:os(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Pt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),si.copy(x.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($0.makeRotationFromEuler(si)),h.material.toneMapped=Ze.getTransfer(y.colorSpace)!==it,(u!==y||f!==y.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,m=i.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new xe(new $s(2,2),new Jn({name:"BackgroundMaterial",uniforms:os(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Zn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(y.colorSpace)!==it,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,m=i.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function d(_,x){_.getRGB(Sr,Iu(i)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(_,x=1){a.set(_),c=x,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,d(a,c)},render:v,addToRenderList:p}}function j0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(M,I,H,S,L){let N=!1;const P=u(S,H,I);r!==P&&(r=P,l(r.object)),N=m(M,S,H,L),N&&g(M,S,H,L),L!==null&&e.update(L,i.ELEMENT_ARRAY_BUFFER),(N||o)&&(o=!1,y(M,I,H,S),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,I,H){const S=H.wireframe===!0;let L=n[M.id];L===void 0&&(L={},n[M.id]=L);let N=L[I.id];N===void 0&&(N={},L[I.id]=N);let P=N[S];return P===void 0&&(P=f(c()),N[S]=P),P}function f(M){const I=[],H=[],S=[];for(let L=0;L<t;L++)I[L]=0,H[L]=0,S[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:H,attributeDivisors:S,object:M,attributes:{},index:null}}function m(M,I,H,S){const L=r.attributes,N=I.attributes;let P=0;const z=H.getAttributes();for(const k in z)if(z[k].location>=0){const B=L[k];let Z=N[k];if(Z===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),B===void 0||B.attribute!==Z||Z&&B.data!==Z.data)return!0;P++}return r.attributesNum!==P||r.index!==S}function g(M,I,H,S){const L={},N=I.attributes;let P=0;const z=H.getAttributes();for(const k in z)if(z[k].location>=0){let B=N[k];B===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(B=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(B=M.instanceColor));const Z={};Z.attribute=B,B&&B.data&&(Z.data=B.data),L[k]=Z,P++}r.attributes=L,r.attributesNum=P,r.index=S}function v(){const M=r.newAttributes;for(let I=0,H=M.length;I<H;I++)M[I]=0}function p(M){d(M,0)}function d(M,I){const H=r.newAttributes,S=r.enabledAttributes,L=r.attributeDivisors;H[M]=1,S[M]===0&&(i.enableVertexAttribArray(M),S[M]=1),L[M]!==I&&(i.vertexAttribDivisor(M,I),L[M]=I)}function _(){const M=r.newAttributes,I=r.enabledAttributes;for(let H=0,S=I.length;H<S;H++)I[H]!==M[H]&&(i.disableVertexAttribArray(H),I[H]=0)}function x(M,I,H,S,L,N,P){P===!0?i.vertexAttribIPointer(M,I,H,L,N):i.vertexAttribPointer(M,I,H,S,L,N)}function y(M,I,H,S){v();const L=S.attributes,N=H.getAttributes(),P=I.defaultAttributeValues;for(const z in N){const k=N[z];if(k.location>=0){let O=L[z];if(O===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(O=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(O=M.instanceColor)),O!==void 0){const B=O.normalized,Z=O.itemSize,ce=e.get(O);if(ce===void 0)continue;const Me=ce.buffer,X=ce.type,Q=ce.bytesPerElement,le=X===i.INT||X===i.UNSIGNED_INT||O.gpuType===oc;if(O.isInterleavedBufferAttribute){const ae=O.data,Se=ae.stride,Le=O.offset;if(ae.isInstancedInterleavedBuffer){for(let Ue=0;Ue<k.locationSize;Ue++)d(k.location+Ue,ae.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ue=0;Ue<k.locationSize;Ue++)p(k.location+Ue);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let Ue=0;Ue<k.locationSize;Ue++)x(k.location+Ue,Z/k.locationSize,X,B,Se*Q,(Le+Z/k.locationSize*Ue)*Q,le)}else{if(O.isInstancedBufferAttribute){for(let ae=0;ae<k.locationSize;ae++)d(k.location+ae,O.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let ae=0;ae<k.locationSize;ae++)p(k.location+ae);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let ae=0;ae<k.locationSize;ae++)x(k.location+ae,Z/k.locationSize,X,B,Z*Q,Z/k.locationSize*ae*Q,le)}}else if(P!==void 0){const B=P[z];if(B!==void 0)switch(B.length){case 2:i.vertexAttrib2fv(k.location,B);break;case 3:i.vertexAttrib3fv(k.location,B);break;case 4:i.vertexAttrib4fv(k.location,B);break;default:i.vertexAttrib1fv(k.location,B)}}}}_()}function A(){D();for(const M in n){const I=n[M];for(const H in I){const S=I[H];for(const L in S)h(S[L].object),delete S[L];delete I[H]}delete n[M]}}function b(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const H in I){const S=I[H];for(const L in S)h(S[L].object),delete S[L];delete I[H]}delete n[M.id]}function R(M){for(const I in n){const H=n[I];if(H[M.id]===void 0)continue;const S=H[M.id];for(const L in S)h(S[L].object),delete S[L];delete H[M.id]}}function D(){w(),o=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:w,dispose:A,releaseStatesOfGeometry:b,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:_}}function K0(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];t.update(m,n,1)}function c(l,h,u,f){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Z0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==an&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const D=R===Ws&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Pn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==bn&&!D)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),_=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=g>0,b=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:_,maxVaryings:x,maxFragmentUniforms:y,vertexTextures:A,maxSamples:b}}function J0(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new ai,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||n!==0||s;return s=f,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,m){const g=u.clippingPlanes,v=u.clipIntersection,p=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const _=r?0:n,x=_*4;let y=d.clippingState||null;c.value=y,y=h(g,f,x,m);for(let A=0;A!==x;++A)y[A]=t[A];d.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,m,g){const v=u!==null?u.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const d=m+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<d)&&(p=new Float32Array(d));for(let x=0,y=m;x!==v;++x,y+=4)o.copy(u[x]).applyMatrix4(_,a),o.normal.toArray(p,y),p[y+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function Q0(i){let e=new WeakMap;function t(o,a){return a===va?o.mapping=ns:a===_a&&(o.mapping=is),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===va||a===_a)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new hm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Ou extends Uu{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const qi=4,Rl=[.125,.215,.35,.446,.526,.582],hi=20,ko=new Ou,Cl=new Ke;let Bo=null,zo=0,Vo=0,Ho=!1;const ci=(1+Math.sqrt(5))/2,Vi=1/ci,Pl=[new U(-ci,Vi,0),new U(ci,Vi,0),new U(-Vi,0,ci),new U(Vi,0,ci),new U(0,ci,-Vi),new U(0,ci,Vi),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Bo=this._renderer.getRenderTarget(),zo=this._renderer.getActiveCubeFace(),Vo=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Bo,zo,Vo),this._renderer.xr.enabled=Ho,e.scissorTest=!1,wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bo=this._renderer.getRenderTarget(),zo=this._renderer.getActiveCubeFace(),Vo=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Ws,format:an,colorSpace:as,depthBuffer:!1},s=Dl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ev(r)),this._blurMaterial=tv(r,e,t)}return s}_compileMaterial(e){const t=new xe(this._lodPlanes[0],e);this._renderer.compile(t,ko)}_sceneToCubeUV(e,t,n,s){const a=new Gt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Cl),h.toneMapping=$n,h.autoClear=!1;const m=new Ye({name:"PMREM.Background",side:Pt,depthWrite:!1,depthTest:!1}),g=new xe(new Et,m);let v=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,v=!0):(m.color.copy(Cl),v=!0);for(let d=0;d<6;d++){const _=d%3;_===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):_===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const x=this._cubeSize;wr(s,_*x,d>2?x:0,x,x),h.setRenderTarget(s),v&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ns||e.mapping===is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Il());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new xe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;wr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,ko)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Pl[(s-r-1)%Pl.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new xe(this._lodPlanes[s],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*hi-1),v=r/g,p=isFinite(r)?1+Math.floor(h*v):hi;p>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${hi}`);const d=[];let _=0;for(let R=0;R<hi;++R){const D=R/v,w=Math.exp(-D*D/2);d.push(w),R===0?_+=w:R<p&&(_+=2*w)}for(let R=0;R<d.length;R++)d[R]=d[R]/_;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:x}=this;f.dTheta.value=g,f.mipInt.value=x-n;const y=this._sizeLods[s],A=3*y*(s>x-qi?s-x+qi:0),b=4*(this._cubeSize-y);wr(t,A,b,3*y,2*y),c.setRenderTarget(t),c.render(u,ko)}}function ev(i){const e=[],t=[],n=[];let s=i;const r=i-qi+1+Rl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-qi?c=Rl[o-i+qi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,v=3,p=2,d=1,_=new Float32Array(v*g*m),x=new Float32Array(p*g*m),y=new Float32Array(d*g*m);for(let b=0;b<m;b++){const R=b%3*2/3-1,D=b>2?0:-1,w=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];_.set(w,v*g*b),x.set(f,p*g*b);const M=[b,b,b,b,b,b];y.set(M,d*g*b)}const A=new xt;A.setAttribute("position",new mt(_,v)),A.setAttribute("uv",new mt(x,p)),A.setAttribute("faceIndex",new mt(y,d)),e.push(A),s>qi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dl(i,e,t){const n=new yi(i,e,t);return n.texture.mapping=jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function tv(i,e,t){const n=new Float32Array(hi),s=new U(0,1,0);return new Jn({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fc(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Il(){return new Jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fc(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ul(){return new Jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function fc(){return`

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
	`}function nv(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===va||c===_a,h=c===ns||c===is;if(l||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ll(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return l&&m&&m.height>0||h&&m&&s(m)?(t===null&&(t=new Ll(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function iv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&As("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function sv(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let p=0,d=v.length;p<d;p++)e.remove(v[p])}f.removeEventListener("dispose",o),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const v=m[g];for(let p=0,d=v.length;p<d;p++)e.update(v[p],i.ARRAY_BUFFER)}}function l(u){const f=[],m=u.index,g=u.attributes.position;let v=0;if(m!==null){const _=m.array;v=m.version;for(let x=0,y=_.length;x<y;x+=3){const A=_[x+0],b=_[x+1],R=_[x+2];f.push(A,b,b,R,R,A)}}else if(g!==void 0){const _=g.array;v=g.version;for(let x=0,y=_.length/3-1;x<y;x+=3){const A=x+0,b=x+1,R=x+2;f.push(A,b,b,R,R,A)}}else return;const p=new(Tu(f)?Du:Lu)(f,1);p.version=v;const d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function rv(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,m){i.drawElements(n,m,r,f*o),t.update(m,n,1)}function l(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,f*o,g),t.update(m,n,g))}function h(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,f,0,g);let p=0;for(let d=0;d<g;d++)p+=m[d];t.update(p,n,1)}function u(f,m,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<f.length;d++)l(f[d]/o,m[d],v[d]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,v,0,g);let d=0;for(let _=0;_<g;_++)d+=m[_]*v[_];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ov(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function av(i,e,t){const n=new WeakMap,s=new ot;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let M=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var m=M;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),v===!0&&(y=2),p===!0&&(y=3);let A=a.attributes.position.count*y,b=1;A>e.maxTextureSize&&(b=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const R=new Float32Array(A*b*4*u),D=new Au(R,A,b,u);D.type=bn,D.needsUpdate=!0;const w=y*4;for(let I=0;I<u;I++){const H=d[I],S=_[I],L=x[I],N=A*b*4*I;for(let P=0;P<H.count;P++){const z=P*w;g===!0&&(s.fromBufferAttribute(H,P),R[N+z+0]=s.x,R[N+z+1]=s.y,R[N+z+2]=s.z,R[N+z+3]=0),v===!0&&(s.fromBufferAttribute(S,P),R[N+z+4]=s.x,R[N+z+5]=s.y,R[N+z+6]=s.z,R[N+z+7]=0),p===!0&&(s.fromBufferAttribute(L,P),R[N+z+8]=s.x,R[N+z+9]=s.y,R[N+z+10]=s.z,R[N+z+11]=L.itemSize===4?s.w:1)}}f={count:u,texture:D,size:new ze(A,b)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",v),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function cv(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class ku extends Nt{constructor(e,t,n,s,r,o,a,c,l,h=Yi){if(h!==Yi&&h!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Yi&&(n=_i),n===void 0&&h===rs&&(n=ss),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ln,this.minFilter=c!==void 0?c:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bu=new Nt,Nl=new ku(1,1),zu=new Au,Vu=new Yp,Hu=new Nu,Fl=[],Ol=[],kl=new Float32Array(16),Bl=new Float32Array(9),zl=new Float32Array(4);function ls(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Fl[s];if(r===void 0&&(r=new Float32Array(s),Fl[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Zr(i,e){let t=Ol[e];t===void 0&&(t=new Int32Array(e),Ol[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function lv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function hv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),yt(t,e)}}function uv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),yt(t,e)}}function dv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),yt(t,e)}}function fv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;zl.set(n),i.uniformMatrix2fv(this.addr,!1,zl),yt(t,n)}}function pv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;Bl.set(n),i.uniformMatrix3fv(this.addr,!1,Bl),yt(t,n)}}function mv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;kl.set(n),i.uniformMatrix4fv(this.addr,!1,kl),yt(t,n)}}function gv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function vv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),yt(t,e)}}function _v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),yt(t,e)}}function yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),yt(t,e)}}function xv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),yt(t,e)}}function Sv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),yt(t,e)}}function wv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),yt(t,e)}}function Ev(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Nl.compareFunction=Eu,r=Nl):r=Bu,t.setTexture2D(e||r,s)}function Tv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Vu,s)}function bv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Hu,s)}function Av(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zu,s)}function Rv(i){switch(i){case 5126:return lv;case 35664:return hv;case 35665:return uv;case 35666:return dv;case 35674:return fv;case 35675:return pv;case 35676:return mv;case 5124:case 35670:return gv;case 35667:case 35671:return vv;case 35668:case 35672:return _v;case 35669:case 35673:return yv;case 5125:return xv;case 36294:return Mv;case 36295:return Sv;case 36296:return wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return Tv;case 35680:case 36300:case 36308:case 36293:return bv;case 36289:case 36303:case 36311:case 36292:return Av}}function Cv(i,e){i.uniform1fv(this.addr,e)}function Pv(i,e){const t=ls(e,this.size,2);i.uniform2fv(this.addr,t)}function Lv(i,e){const t=ls(e,this.size,3);i.uniform3fv(this.addr,t)}function Dv(i,e){const t=ls(e,this.size,4);i.uniform4fv(this.addr,t)}function Iv(i,e){const t=ls(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Uv(i,e){const t=ls(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Nv(i,e){const t=ls(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Fv(i,e){i.uniform1iv(this.addr,e)}function Ov(i,e){i.uniform2iv(this.addr,e)}function kv(i,e){i.uniform3iv(this.addr,e)}function Bv(i,e){i.uniform4iv(this.addr,e)}function zv(i,e){i.uniform1uiv(this.addr,e)}function Vv(i,e){i.uniform2uiv(this.addr,e)}function Hv(i,e){i.uniform3uiv(this.addr,e)}function Gv(i,e){i.uniform4uiv(this.addr,e)}function Wv(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Bu,r[o])}function Xv(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Vu,r[o])}function qv(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Hu,r[o])}function $v(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||zu,r[o])}function Yv(i){switch(i){case 5126:return Cv;case 35664:return Pv;case 35665:return Lv;case 35666:return Dv;case 35674:return Iv;case 35675:return Uv;case 35676:return Nv;case 5124:case 35670:return Fv;case 35667:case 35671:return Ov;case 35668:case 35672:return kv;case 35669:case 35673:return Bv;case 5125:return zv;case 36294:return Vv;case 36295:return Hv;case 36296:return Gv;case 35678:case 36198:case 36298:case 36306:case 35682:return Wv;case 35679:case 36299:case 36307:return Xv;case 35680:case 36300:case 36308:case 36293:return qv;case 36289:case 36303:case 36311:case 36292:return $v}}class jv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Rv(t.type)}}class Kv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yv(t.type)}}class Zv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Go=/(\w+)(\])?(\[|\.)?/g;function Vl(i,e){i.seq.push(e),i.map[e.id]=e}function Jv(i,e,t){const n=i.name,s=n.length;for(Go.lastIndex=0;;){const r=Go.exec(n),o=Go.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Vl(t,l===void 0?new jv(a,i,e):new Kv(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Zv(a),Vl(t,u)),t=u}}}class Fr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Jv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Hl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Qv=37297;let e_=0;function t_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Gl=new We;function n_(i){Ze._getMatrix(Gl,Ze.workingColorSpace,i);const e=`mat3( ${Gl.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Kr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+t_(i.getShaderSource(e),o)}else return s}function i_(i,e){const t=n_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function s_(i,e){let t;switch(e){case Sp:t="Linear";break;case wp:t="Reinhard";break;case Ep:t="Cineon";break;case uu:t="ACESFilmic";break;case bp:t="AgX";break;case Ap:t="Neutral";break;case Tp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Er=new U;function r_(){Ze.getLuminanceCoefficients(Er);const i=Er.x.toFixed(4),e=Er.y.toFixed(4),t=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function o_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Rs).join(`
`)}function a_(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function c_(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Rs(i){return i!==""}function Xl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ql(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const l_=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ya(i){return i.replace(l_,u_)}const h_=new Map;function u_(i,e){let t=Xe[e];if(t===void 0){const n=h_.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Ya(t)}const d_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(i){return i.replace(d_,f_)}function f_(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function p_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===lu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===tp?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===wn&&(e="SHADOWMAP_TYPE_VSM"),e}function m_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ns:case is:e="ENVMAP_TYPE_CUBE";break;case jr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function g_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case is:e="ENVMAP_MODE_REFRACTION";break}return e}function v_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case hu:e="ENVMAP_BLENDING_MULTIPLY";break;case xp:e="ENVMAP_BLENDING_MIX";break;case Mp:e="ENVMAP_BLENDING_ADD";break}return e}function __(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function y_(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=p_(t),l=m_(t),h=g_(t),u=v_(t),f=__(t),m=o_(t),g=a_(r),v=s.createProgram();let p,d,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Rs).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Rs).join(`
`),d.length>0&&(d+=`
`)):(p=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),d=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==$n?"#define TONE_MAPPING":"",t.toneMapping!==$n?Xe.tonemapping_pars_fragment:"",t.toneMapping!==$n?s_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,i_("linearToOutputTexel",t.outputColorSpace),r_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Rs).join(`
`)),o=Ya(o),o=Xl(o,t),o=ql(o,t),a=Ya(a),a=Xl(a,t),a=ql(a,t),o=$l(o),a=$l(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",t.glslVersion===al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const x=_+p+o,y=_+d+a,A=Hl(s,s.VERTEX_SHADER,x),b=Hl(s,s.FRAGMENT_SHADER,y);s.attachShader(v,A),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(I){if(i.debug.checkShaderErrors){const H=s.getProgramInfoLog(v).trim(),S=s.getShaderInfoLog(A).trim(),L=s.getShaderInfoLog(b).trim();let N=!0,P=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(N=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,b);else{const z=Wl(s,A,"vertex"),k=Wl(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+H+`
`+z+`
`+k)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):(S===""||L==="")&&(P=!1);P&&(I.diagnostics={runnable:N,programLog:H,vertexShader:{log:S,prefix:p},fragmentShader:{log:L,prefix:d}})}s.deleteShader(A),s.deleteShader(b),D=new Fr(s,v),w=c_(s,v)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,Qv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=e_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=b,this}let x_=0;class M_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new S_(e),t.set(e,n)),n}}class S_{constructor(e){this.id=x_++,this.code=e,this.usedTimes=0}}function w_(i,e,t,n,s,r,o){const a=new Cu,c=new M_,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return l.add(w),w===0?"uv":`uv${w}`}function p(w,M,I,H,S){const L=H.fog,N=S.geometry,P=w.isMeshStandardMaterial?H.environment:null,z=(w.isMeshStandardMaterial?t:e).get(w.envMap||P),k=z&&z.mapping===jr?z.image.height:null,O=g[w.type];w.precision!==null&&(m=s.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const B=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Z=B!==void 0?B.length:0;let ce=0;N.morphAttributes.position!==void 0&&(ce=1),N.morphAttributes.normal!==void 0&&(ce=2),N.morphAttributes.color!==void 0&&(ce=3);let Me,X,Q,le;if(O){const nt=un[O];Me=nt.vertexShader,X=nt.fragmentShader}else Me=w.vertexShader,X=w.fragmentShader,c.update(w),Q=c.getVertexShaderID(w),le=c.getFragmentShaderID(w);const ae=i.getRenderTarget(),Se=i.state.buffers.depth.getReversed(),Le=S.isInstancedMesh===!0,Ue=S.isBatchedMesh===!0,Y=!!w.map,ee=!!w.matcap,ue=!!z,F=!!w.aoMap,Fe=!!w.lightMap,Ne=!!w.bumpMap,ke=!!w.normalMap,Ee=!!w.displacementMap,Te=!!w.emissiveMap,me=!!w.metalnessMap,C=!!w.roughnessMap,E=w.anisotropy>0,$=w.clearcoat>0,te=w.dispersion>0,se=w.iridescence>0,q=w.sheen>0,oe=w.transmission>0,ie=E&&!!w.anisotropyMap,de=$&&!!w.clearcoatMap,De=$&&!!w.clearcoatNormalMap,re=$&&!!w.clearcoatRoughnessMap,fe=se&&!!w.iridescenceMap,Ie=se&&!!w.iridescenceThicknessMap,Oe=q&&!!w.sheenColorMap,we=q&&!!w.sheenRoughnessMap,$e=!!w.specularMap,Ve=!!w.specularColorMap,tt=!!w.specularIntensityMap,V=oe&&!!w.transmissionMap,ge=oe&&!!w.thicknessMap,J=!!w.gradientMap,ne=!!w.alphaMap,ye=w.alphaTest>0,ve=!!w.alphaHash,He=!!w.extensions;let ft=$n;w.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ft=i.toneMapping);const bt={shaderID:O,shaderType:w.type,shaderName:w.name,vertexShader:Me,fragmentShader:X,defines:w.defines,customVertexShaderID:Q,customFragmentShaderID:le,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:Ue,batchingColor:Ue&&S._colorsTexture!==null,instancing:Le,instancingColor:Le&&S.instanceColor!==null,instancingMorph:Le&&S.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:as,alphaToCoverage:!!w.alphaToCoverage,map:Y,matcap:ee,envMap:ue,envMapMode:ue&&z.mapping,envMapCubeUVHeight:k,aoMap:F,lightMap:Fe,bumpMap:Ne,normalMap:ke,displacementMap:f&&Ee,emissiveMap:Te,normalMapObjectSpace:ke&&w.normalMapType===Lp,normalMapTangentSpace:ke&&w.normalMapType===wu,metalnessMap:me,roughnessMap:C,anisotropy:E,anisotropyMap:ie,clearcoat:$,clearcoatMap:de,clearcoatNormalMap:De,clearcoatRoughnessMap:re,dispersion:te,iridescence:se,iridescenceMap:fe,iridescenceThicknessMap:Ie,sheen:q,sheenColorMap:Oe,sheenRoughnessMap:we,specularMap:$e,specularColorMap:Ve,specularIntensityMap:tt,transmission:oe,transmissionMap:V,thicknessMap:ge,gradientMap:J,opaque:w.transparent===!1&&w.blending===$i&&w.alphaToCoverage===!1,alphaMap:ne,alphaTest:ye,alphaHash:ve,combine:w.combine,mapUv:Y&&v(w.map.channel),aoMapUv:F&&v(w.aoMap.channel),lightMapUv:Fe&&v(w.lightMap.channel),bumpMapUv:Ne&&v(w.bumpMap.channel),normalMapUv:ke&&v(w.normalMap.channel),displacementMapUv:Ee&&v(w.displacementMap.channel),emissiveMapUv:Te&&v(w.emissiveMap.channel),metalnessMapUv:me&&v(w.metalnessMap.channel),roughnessMapUv:C&&v(w.roughnessMap.channel),anisotropyMapUv:ie&&v(w.anisotropyMap.channel),clearcoatMapUv:de&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:De&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:we&&v(w.sheenRoughnessMap.channel),specularMapUv:$e&&v(w.specularMap.channel),specularColorMapUv:Ve&&v(w.specularColorMap.channel),specularIntensityMapUv:tt&&v(w.specularIntensityMap.channel),transmissionMapUv:V&&v(w.transmissionMap.channel),thicknessMapUv:ge&&v(w.thicknessMap.channel),alphaMapUv:ne&&v(w.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(ke||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!N.attributes.uv&&(Y||ne),fog:!!L,useFog:w.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Se,skinning:S.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ce,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ft,decodeVideoTexture:Y&&w.map.isVideoTexture===!0&&Ze.getTransfer(w.map.colorSpace)===it,decodeVideoTextureEmissive:Te&&w.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(w.emissiveMap.colorSpace)===it,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===wt,flipSided:w.side===Pt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:He&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&w.extensions.multiDraw===!0||Ue)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return bt.vertexUv1s=l.has(1),bt.vertexUv2s=l.has(2),bt.vertexUv3s=l.has(3),l.clear(),bt}function d(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)M.push(I),M.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(_(M,w),x(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function _(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function x(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function y(w){const M=g[w.type];let I;if(M){const H=un[M];I=om.clone(H.uniforms)}else I=w.uniforms;return I}function A(w,M){let I;for(let H=0,S=h.length;H<S;H++){const L=h[H];if(L.cacheKey===M){I=L,++I.usedTimes;break}}return I===void 0&&(I=new y_(i,M,w,r),h.push(I)),I}function b(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function R(w){c.remove(w)}function D(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:y,acquireProgram:A,releaseProgram:b,releaseShaderCache:R,programs:h,dispose:D}}function E_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function T_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function jl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Kl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,m,g,v,p){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:v,group:p},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=v,d.group=p),e++,d}function a(u,f,m,g,v,p){const d=o(u,f,m,g,v,p);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):t.push(d)}function c(u,f,m,g,v,p){const d=o(u,f,m,g,v,p);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||T_),n.length>1&&n.sort(f||jl),s.length>1&&s.sort(f||jl)}function h(){for(let u=e,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function b_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new Kl,i.set(n,[o])):s>=r.length?(o=new Kl,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function A_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new Ke};break;case"SpotLight":t={position:new U,direction:new U,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function R_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let C_=0;function P_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function L_(i){const e=new A_,t=R_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);const s=new U,r=new dt,o=new dt;function a(l){let h=0,u=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let m=0,g=0,v=0,p=0,d=0,_=0,x=0,y=0,A=0,b=0,R=0;l.sort(P_);for(let w=0,M=l.length;w<M;w++){const I=l[w],H=I.color,S=I.intensity,L=I.distance,N=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=H.r*S,u+=H.g*S,f+=H.b*S;else if(I.isLightProbe){for(let P=0;P<9;P++)n.probe[P].addScaledVector(I.sh.coefficients[P],S);R++}else if(I.isDirectionalLight){const P=e.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const z=I.shadow,k=t.get(I);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,n.directionalShadow[m]=k,n.directionalShadowMap[m]=N,n.directionalShadowMatrix[m]=I.shadow.matrix,_++}n.directional[m]=P,m++}else if(I.isSpotLight){const P=e.get(I);P.position.setFromMatrixPosition(I.matrixWorld),P.color.copy(H).multiplyScalar(S),P.distance=L,P.coneCos=Math.cos(I.angle),P.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),P.decay=I.decay,n.spot[v]=P;const z=I.shadow;if(I.map&&(n.spotLightMap[A]=I.map,A++,z.updateMatrices(I),I.castShadow&&b++),n.spotLightMatrix[v]=z.matrix,I.castShadow){const k=t.get(I);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,n.spotShadow[v]=k,n.spotShadowMap[v]=N,y++}v++}else if(I.isRectAreaLight){const P=e.get(I);P.color.copy(H).multiplyScalar(S),P.halfWidth.set(I.width*.5,0,0),P.halfHeight.set(0,I.height*.5,0),n.rectArea[p]=P,p++}else if(I.isPointLight){const P=e.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),P.distance=I.distance,P.decay=I.decay,I.castShadow){const z=I.shadow,k=t.get(I);k.shadowIntensity=z.intensity,k.shadowBias=z.bias,k.shadowNormalBias=z.normalBias,k.shadowRadius=z.radius,k.shadowMapSize=z.mapSize,k.shadowCameraNear=z.camera.near,k.shadowCameraFar=z.camera.far,n.pointShadow[g]=k,n.pointShadowMap[g]=N,n.pointShadowMatrix[g]=I.shadow.matrix,x++}n.point[g]=P,g++}else if(I.isHemisphereLight){const P=e.get(I);P.skyColor.copy(I.color).multiplyScalar(S),P.groundColor.copy(I.groundColor).multiplyScalar(S),n.hemi[d]=P,d++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const D=n.hash;(D.directionalLength!==m||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==p||D.hemiLength!==d||D.numDirectionalShadows!==_||D.numPointShadows!==x||D.numSpotShadows!==y||D.numSpotMaps!==A||D.numLightProbes!==R)&&(n.directional.length=m,n.spot.length=v,n.rectArea.length=p,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=_,n.directionalShadowMap.length=_,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=_,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=y+A-b,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=b,n.numLightProbes=R,D.directionalLength=m,D.pointLength=g,D.spotLength=v,D.rectAreaLength=p,D.hemiLength=d,D.numDirectionalShadows=_,D.numPointShadows=x,D.numSpotShadows=y,D.numSpotMaps=A,D.numLightProbes=R,n.version=C_++)}function c(l,h){let u=0,f=0,m=0,g=0,v=0;const p=h.matrixWorldInverse;for(let d=0,_=l.length;d<_;d++){const x=l[d];if(x.isDirectionalLight){const y=n.directional[u];y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),u++}else if(x.isSpotLight){const y=n.spot[m];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),m++}else if(x.isRectAreaLight){const y=n.rectArea[g];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),o.identity(),r.copy(x.matrixWorld),r.premultiply(p),o.extractRotation(r),y.halfWidth.set(x.width*.5,0,0),y.halfHeight.set(0,x.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const y=n.point[f];y.position.setFromMatrixPosition(x.matrixWorld),y.position.applyMatrix4(p),f++}else if(x.isHemisphereLight){const y=n.hemi[v];y.direction.setFromMatrixPosition(x.matrixWorld),y.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:n}}function Zl(i){const e=new L_(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function D_(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Zl(i),e.set(s,[a])):r>=o.length?(a=new Zl(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class I_ extends Ti{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Cp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class U_ extends Ti{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const N_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,F_=`uniform sampler2D shadow_pass;
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
}`;function O_(i,e,t){let n=new dc;const s=new ze,r=new ze,o=new ot,a=new I_({depthPacking:Pp}),c=new U_,l={},h=t.maxTextureSize,u={[Zn]:Pt,[Pt]:Zn,[wt]:wt},f=new Jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:N_,fragmentShader:F_}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new xt;g.setAttribute("position",new mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new xe(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lu;let d=this.type;this.render=function(b,R,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const w=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),H=i.state;H.setBlending(qn),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const S=d!==wn&&this.type===wn,L=d===wn&&this.type!==wn;for(let N=0,P=b.length;N<P;N++){const z=b[N],k=z.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);const O=k.getFrameExtents();if(s.multiply(O),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/O.x),s.x=r.x*O.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/O.y),s.y=r.y*O.y,k.mapSize.y=r.y)),k.map===null||S===!0||L===!0){const Z=this.type!==wn?{minFilter:ln,magFilter:ln}:{};k.map!==null&&k.map.dispose(),k.map=new yi(s.x,s.y,Z),k.map.texture.name=z.name+".shadowMap",k.camera.updateProjectionMatrix()}i.setRenderTarget(k.map),i.clear();const B=k.getViewportCount();for(let Z=0;Z<B;Z++){const ce=k.getViewport(Z);o.set(r.x*ce.x,r.y*ce.y,r.x*ce.z,r.y*ce.w),H.viewport(o),k.updateMatrices(z,Z),n=k.getFrustum(),y(R,D,k.camera,z,this.type)}k.isPointLightShadow!==!0&&this.type===wn&&_(k,D),k.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(w,M,I)};function _(b,R){const D=e.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new yi(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,i.setRenderTarget(b.mapPass),i.clear(),i.renderBufferDirect(R,null,D,f,v,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,i.setRenderTarget(b.map),i.clear(),i.renderBufferDirect(R,null,D,m,v,null)}function x(b,R,D,w){let M=null;const I=D.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)M=I;else if(M=D.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const H=M.uuid,S=R.uuid;let L=l[H];L===void 0&&(L={},l[H]=L);let N=L[S];N===void 0&&(N=M.clone(),L[S]=N,R.addEventListener("dispose",A)),M=N}if(M.visible=R.visible,M.wireframe=R.wireframe,w===wn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const H=i.properties.get(M);H.light=D}return M}function y(b,R,D,w,M){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===wn)&&(!b.frustumCulled||n.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,b.matrixWorld);const S=e.update(b),L=b.material;if(Array.isArray(L)){const N=S.groups;for(let P=0,z=N.length;P<z;P++){const k=N[P],O=L[k.materialIndex];if(O&&O.visible){const B=x(b,O,w,M);b.onBeforeShadow(i,b,R,D,S,B,k),i.renderBufferDirect(D,null,S,B,b,k),b.onAfterShadow(i,b,R,D,S,B,k)}}}else if(L.visible){const N=x(b,L,w,M);b.onBeforeShadow(i,b,R,D,S,N,null),i.renderBufferDirect(D,null,S,N,b,null),b.onAfterShadow(i,b,R,D,S,N,null)}}const H=b.children;for(let S=0,L=H.length;S<L;S++)y(H[S],R,D,w,M)}function A(b){b.target.removeEventListener("dispose",A);for(const D in l){const w=l[D],M=b.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const k_={[ha]:ua,[da]:ma,[fa]:ga,[ts]:pa,[ua]:ha,[ma]:da,[ga]:fa,[pa]:ts};function B_(i,e){function t(){let V=!1;const ge=new ot;let J=null;const ne=new ot(0,0,0,0);return{setMask:function(ye){J!==ye&&!V&&(i.colorMask(ye,ye,ye,ye),J=ye)},setLocked:function(ye){V=ye},setClear:function(ye,ve,He,ft,bt){bt===!0&&(ye*=ft,ve*=ft,He*=ft),ge.set(ye,ve,He,ft),ne.equals(ge)===!1&&(i.clearColor(ye,ve,He,ft),ne.copy(ge))},reset:function(){V=!1,J=null,ne.set(-1,0,0,0)}}}function n(){let V=!1,ge=!1,J=null,ne=null,ye=null;return{setReversed:function(ve){if(ge!==ve){const He=e.get("EXT_clip_control");ge?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT);const ft=ye;ye=null,this.setClear(ft)}ge=ve},getReversed:function(){return ge},setTest:function(ve){ve?ae(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(ve){J!==ve&&!V&&(i.depthMask(ve),J=ve)},setFunc:function(ve){if(ge&&(ve=k_[ve]),ne!==ve){switch(ve){case ha:i.depthFunc(i.NEVER);break;case ua:i.depthFunc(i.ALWAYS);break;case da:i.depthFunc(i.LESS);break;case ts:i.depthFunc(i.LEQUAL);break;case fa:i.depthFunc(i.EQUAL);break;case pa:i.depthFunc(i.GEQUAL);break;case ma:i.depthFunc(i.GREATER);break;case ga:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ne=ve}},setLocked:function(ve){V=ve},setClear:function(ve){ye!==ve&&(ge&&(ve=1-ve),i.clearDepth(ve),ye=ve)},reset:function(){V=!1,J=null,ne=null,ye=null,ge=!1}}}function s(){let V=!1,ge=null,J=null,ne=null,ye=null,ve=null,He=null,ft=null,bt=null;return{setTest:function(nt){V||(nt?ae(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(nt){ge!==nt&&!V&&(i.stencilMask(nt),ge=nt)},setFunc:function(nt,en,mn){(J!==nt||ne!==en||ye!==mn)&&(i.stencilFunc(nt,en,mn),J=nt,ne=en,ye=mn)},setOp:function(nt,en,mn){(ve!==nt||He!==en||ft!==mn)&&(i.stencilOp(nt,en,mn),ve=nt,He=en,ft=mn)},setLocked:function(nt){V=nt},setClear:function(nt){bt!==nt&&(i.clearStencil(nt),bt=nt)},reset:function(){V=!1,ge=null,J=null,ne=null,ye=null,ve=null,He=null,ft=null,bt=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,m=[],g=null,v=!1,p=null,d=null,_=null,x=null,y=null,A=null,b=null,R=new Ke(0,0,0),D=0,w=!1,M=null,I=null,H=null,S=null,L=null;const N=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,z=0;const k=i.getParameter(i.VERSION);k.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(k)[1]),P=z>=1):k.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),P=z>=2);let O=null,B={};const Z=i.getParameter(i.SCISSOR_BOX),ce=i.getParameter(i.VIEWPORT),Me=new ot().fromArray(Z),X=new ot().fromArray(ce);function Q(V,ge,J,ne){const ye=new Uint8Array(4),ve=i.createTexture();i.bindTexture(V,ve),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let He=0;He<J;He++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,ne,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(ge+He,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return ve}const le={};le[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),le[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),le[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(ts),Ne(!1),ke(il),ae(i.CULL_FACE),F(qn);function ae(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function Se(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function Le(V,ge){return u[V]!==ge?(i.bindFramebuffer(V,ge),u[V]=ge,V===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ge),V===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ue(V,ge){let J=m,ne=!1;if(V){J=f.get(ge),J===void 0&&(J=[],f.set(ge,J));const ye=V.textures;if(J.length!==ye.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,He=ye.length;ve<He;ve++)J[ve]=i.COLOR_ATTACHMENT0+ve;J.length=ye.length,ne=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ne=!0);ne&&i.drawBuffers(J)}function Y(V){return g!==V?(i.useProgram(V),g=V,!0):!1}const ee={[li]:i.FUNC_ADD,[ip]:i.FUNC_SUBTRACT,[sp]:i.FUNC_REVERSE_SUBTRACT};ee[rp]=i.MIN,ee[op]=i.MAX;const ue={[ap]:i.ZERO,[cp]:i.ONE,[lp]:i.SRC_COLOR,[ca]:i.SRC_ALPHA,[mp]:i.SRC_ALPHA_SATURATE,[fp]:i.DST_COLOR,[up]:i.DST_ALPHA,[hp]:i.ONE_MINUS_SRC_COLOR,[la]:i.ONE_MINUS_SRC_ALPHA,[pp]:i.ONE_MINUS_DST_COLOR,[dp]:i.ONE_MINUS_DST_ALPHA,[gp]:i.CONSTANT_COLOR,[vp]:i.ONE_MINUS_CONSTANT_COLOR,[_p]:i.CONSTANT_ALPHA,[yp]:i.ONE_MINUS_CONSTANT_ALPHA};function F(V,ge,J,ne,ye,ve,He,ft,bt,nt){if(V===qn){v===!0&&(Se(i.BLEND),v=!1);return}if(v===!1&&(ae(i.BLEND),v=!0),V!==np){if(V!==p||nt!==w){if((d!==li||y!==li)&&(i.blendEquation(i.FUNC_ADD),d=li,y=li),nt)switch(V){case $i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rt:i.blendFunc(i.ONE,i.ONE);break;case sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case $i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rt:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}_=null,x=null,A=null,b=null,R.set(0,0,0),D=0,p=V,w=nt}return}ye=ye||ge,ve=ve||J,He=He||ne,(ge!==d||ye!==y)&&(i.blendEquationSeparate(ee[ge],ee[ye]),d=ge,y=ye),(J!==_||ne!==x||ve!==A||He!==b)&&(i.blendFuncSeparate(ue[J],ue[ne],ue[ve],ue[He]),_=J,x=ne,A=ve,b=He),(ft.equals(R)===!1||bt!==D)&&(i.blendColor(ft.r,ft.g,ft.b,bt),R.copy(ft),D=bt),p=V,w=!1}function Fe(V,ge){V.side===wt?Se(i.CULL_FACE):ae(i.CULL_FACE);let J=V.side===Pt;ge&&(J=!J),Ne(J),V.blending===$i&&V.transparent===!1?F(qn):F(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);const ne=V.stencilWrite;a.setTest(ne),ne&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Te(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(V){M!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),M=V)}function ke(V){V!==Qf?(ae(i.CULL_FACE),V!==I&&(V===il?i.cullFace(i.BACK):V===ep?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),I=V}function Ee(V){V!==H&&(P&&i.lineWidth(V),H=V)}function Te(V,ge,J){V?(ae(i.POLYGON_OFFSET_FILL),(S!==ge||L!==J)&&(i.polygonOffset(ge,J),S=ge,L=J)):Se(i.POLYGON_OFFSET_FILL)}function me(V){V?ae(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)}function C(V){V===void 0&&(V=i.TEXTURE0+N-1),O!==V&&(i.activeTexture(V),O=V)}function E(V,ge,J){J===void 0&&(O===null?J=i.TEXTURE0+N-1:J=O);let ne=B[J];ne===void 0&&(ne={type:void 0,texture:void 0},B[J]=ne),(ne.type!==V||ne.texture!==ge)&&(O!==J&&(i.activeTexture(J),O=J),i.bindTexture(V,ge||le[V]),ne.type=V,ne.texture=ge)}function $(){const V=B[O];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function te(){try{i.compressedTexImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function oe(){try{i.texSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function De(){try{i.texStorage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function re(){try{i.texStorage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function fe(){try{i.texImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ie(){try{i.texImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Oe(V){Me.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),Me.copy(V))}function we(V){X.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),X.copy(V))}function $e(V,ge){let J=l.get(ge);J===void 0&&(J=new WeakMap,l.set(ge,J));let ne=J.get(V);ne===void 0&&(ne=i.getUniformBlockIndex(ge,V.name),J.set(V,ne))}function Ve(V,ge){const ne=l.get(ge).get(V);c.get(ge)!==ne&&(i.uniformBlockBinding(ge,ne,V.__bindingPointIndex),c.set(ge,ne))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},O=null,B={},u={},f=new WeakMap,m=[],g=null,v=!1,p=null,d=null,_=null,x=null,y=null,A=null,b=null,R=new Ke(0,0,0),D=0,w=!1,M=null,I=null,H=null,S=null,L=null,Me.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Se,bindFramebuffer:Le,drawBuffers:Ue,useProgram:Y,setBlending:F,setMaterial:Fe,setFlipSided:Ne,setCullFace:ke,setLineWidth:Ee,setPolygonOffset:Te,setScissorTest:me,activeTexture:C,bindTexture:E,unbindTexture:$,compressedTexImage2D:te,compressedTexImage3D:se,texImage2D:fe,texImage3D:Ie,updateUBOMapping:$e,uniformBlockBinding:Ve,texStorage2D:De,texStorage3D:re,texSubImage2D:q,texSubImage3D:oe,compressedTexSubImage2D:ie,compressedTexSubImage3D:de,scissor:Oe,viewport:we,reset:tt}}function Jl(i,e,t,n){const s=z_(n);switch(t){case gu:return i*e;case _u:return i*e;case yu:return i*e*2;case xu:return i*e/s.components*s.byteLength;case lc:return i*e/s.components*s.byteLength;case Mu:return i*e*2/s.components*s.byteLength;case hc:return i*e*2/s.components*s.byteLength;case vu:return i*e*3/s.components*s.byteLength;case an:return i*e*4/s.components*s.byteLength;case uc:return i*e*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ir:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ma:case wa:return Math.max(i,16)*Math.max(e,8)/4;case xa:case Sa:return Math.max(i,8)*Math.max(e,8)/2;case Ea:case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ca:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case La:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Da:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Na:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ka:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Ba:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case za:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Nr:case Va:case Ha:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Su:case Ga:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Wa:case Xa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function z_(i){switch(i){case Pn:case fu:return{byteLength:1,components:1};case Bs:case pu:case Ws:return{byteLength:2,components:1};case ac:case cc:return{byteLength:2,components:4};case _i:case oc:case bn:return{byteLength:4,components:1};case mu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function V_(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,E){return m?new OffscreenCanvas(C,E):Hr("canvas")}function v(C,E,$){let te=1;const se=me(C);if((se.width>$||se.height>$)&&(te=$/Math.max(se.width,se.height)),te<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const q=Math.floor(te*se.width),oe=Math.floor(te*se.height);u===void 0&&(u=g(q,oe));const ie=E?g(q,oe):u;return ie.width=q,ie.height=oe,ie.getContext("2d").drawImage(C,0,0,q,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+q+"x"+oe+")."),ie}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),C;return C}function p(C){return C.generateMipmaps}function d(C){i.generateMipmap(C)}function _(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(C,E,$,te,se=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let q=E;if(E===i.RED&&($===i.FLOAT&&(q=i.R32F),$===i.HALF_FLOAT&&(q=i.R16F),$===i.UNSIGNED_BYTE&&(q=i.R8)),E===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.R8UI),$===i.UNSIGNED_SHORT&&(q=i.R16UI),$===i.UNSIGNED_INT&&(q=i.R32UI),$===i.BYTE&&(q=i.R8I),$===i.SHORT&&(q=i.R16I),$===i.INT&&(q=i.R32I)),E===i.RG&&($===i.FLOAT&&(q=i.RG32F),$===i.HALF_FLOAT&&(q=i.RG16F),$===i.UNSIGNED_BYTE&&(q=i.RG8)),E===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RG8UI),$===i.UNSIGNED_SHORT&&(q=i.RG16UI),$===i.UNSIGNED_INT&&(q=i.RG32UI),$===i.BYTE&&(q=i.RG8I),$===i.SHORT&&(q=i.RG16I),$===i.INT&&(q=i.RG32I)),E===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RGB8UI),$===i.UNSIGNED_SHORT&&(q=i.RGB16UI),$===i.UNSIGNED_INT&&(q=i.RGB32UI),$===i.BYTE&&(q=i.RGB8I),$===i.SHORT&&(q=i.RGB16I),$===i.INT&&(q=i.RGB32I)),E===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),$===i.UNSIGNED_INT&&(q=i.RGBA32UI),$===i.BYTE&&(q=i.RGBA8I),$===i.SHORT&&(q=i.RGBA16I),$===i.INT&&(q=i.RGBA32I)),E===i.RGB&&$===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),E===i.RGBA){const oe=se?Kr:Ze.getTransfer(te);$===i.FLOAT&&(q=i.RGBA32F),$===i.HALF_FLOAT&&(q=i.RGBA16F),$===i.UNSIGNED_BYTE&&(q=oe===it?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function y(C,E){let $;return C?E===null||E===_i||E===ss?$=i.DEPTH24_STENCIL8:E===bn?$=i.DEPTH32F_STENCIL8:E===Bs&&($=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===_i||E===ss?$=i.DEPTH_COMPONENT24:E===bn?$=i.DEPTH_COMPONENT32F:E===Bs&&($=i.DEPTH_COMPONENT16),$}function A(C,E){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==ln&&C.minFilter!==fn?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function b(C){const E=C.target;E.removeEventListener("dispose",b),D(E),E.isVideoTexture&&h.delete(E)}function R(C){const E=C.target;E.removeEventListener("dispose",R),M(E)}function D(C){const E=n.get(C);if(E.__webglInit===void 0)return;const $=C.source,te=f.get($);if(te){const se=te[E.__cacheKey];se.usedTimes--,se.usedTimes===0&&w(C),Object.keys(te).length===0&&f.delete($)}n.remove(C)}function w(C){const E=n.get(C);i.deleteTexture(E.__webglTexture);const $=C.source,te=f.get($);delete te[E.__cacheKey],o.memory.textures--}function M(C){const E=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(E.__webglFramebuffer[te]))for(let se=0;se<E.__webglFramebuffer[te].length;se++)i.deleteFramebuffer(E.__webglFramebuffer[te][se]);else i.deleteFramebuffer(E.__webglFramebuffer[te]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[te])}else{if(Array.isArray(E.__webglFramebuffer))for(let te=0;te<E.__webglFramebuffer.length;te++)i.deleteFramebuffer(E.__webglFramebuffer[te]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let te=0;te<E.__webglColorRenderbuffer.length;te++)E.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[te]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const $=C.textures;for(let te=0,se=$.length;te<se;te++){const q=n.get($[te]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove($[te])}n.remove(C)}let I=0;function H(){I=0}function S(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function L(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function N(C,E){const $=n.get(C);if(C.isVideoTexture&&Ee(C),C.isRenderTargetTexture===!1&&C.version>0&&$.__version!==C.version){const te=C.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X($,C,E);return}}t.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+E)}function P(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){X($,C,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+E)}function z(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){X($,C,E);return}t.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+E)}function k(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){Q($,C,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+E)}const O={[ks]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[ya]:i.MIRRORED_REPEAT},B={[ln]:i.NEAREST,[Rp]:i.NEAREST_MIPMAP_NEAREST,[sr]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[mo]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},Z={[Dp]:i.NEVER,[kp]:i.ALWAYS,[Ip]:i.LESS,[Eu]:i.LEQUAL,[Up]:i.EQUAL,[Op]:i.GEQUAL,[Np]:i.GREATER,[Fp]:i.NOTEQUAL};function ce(C,E){if(E.type===bn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===fn||E.magFilter===mo||E.magFilter===sr||E.magFilter===pi||E.minFilter===fn||E.minFilter===mo||E.minFilter===sr||E.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,O[E.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,O[E.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,O[E.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,B[E.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,B[E.minFilter]),E.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Z[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ln||E.minFilter!==sr&&E.minFilter!==pi||E.type===bn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Me(C,E){let $=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",b));const te=E.source;let se=f.get(te);se===void 0&&(se={},f.set(te,se));const q=L(E);if(q!==C.__cacheKey){se[q]===void 0&&(se[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),se[q].usedTimes++;const oe=se[C.__cacheKey];oe!==void 0&&(se[C.__cacheKey].usedTimes--,oe.usedTimes===0&&w(E)),C.__cacheKey=q,C.__webglTexture=se[q].texture}return $}function X(C,E,$){let te=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(te=i.TEXTURE_3D);const se=Me(C,E),q=E.source;t.bindTexture(te,C.__webglTexture,i.TEXTURE0+$);const oe=n.get(q);if(q.version!==oe.__version||se===!0){t.activeTexture(i.TEXTURE0+$);const ie=Ze.getPrimaries(Ze.workingColorSpace),de=E.colorSpace===Gn?null:Ze.getPrimaries(E.colorSpace),De=E.colorSpace===Gn||ie===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let re=v(E.image,!1,s.maxTextureSize);re=Te(E,re);const fe=r.convert(E.format,E.colorSpace),Ie=r.convert(E.type);let Oe=x(E.internalFormat,fe,Ie,E.colorSpace,E.isVideoTexture);ce(te,E);let we;const $e=E.mipmaps,Ve=E.isVideoTexture!==!0,tt=oe.__version===void 0||se===!0,V=q.dataReady,ge=A(E,re);if(E.isDepthTexture)Oe=y(E.format===rs,E.type),tt&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Oe,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Oe,re.width,re.height,0,fe,Ie,null));else if(E.isDataTexture)if($e.length>0){Ve&&tt&&t.texStorage2D(i.TEXTURE_2D,ge,Oe,$e[0].width,$e[0].height);for(let J=0,ne=$e.length;J<ne;J++)we=$e[J],Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,we.width,we.height,fe,Ie,we.data):t.texImage2D(i.TEXTURE_2D,J,Oe,we.width,we.height,0,fe,Ie,we.data);E.generateMipmaps=!1}else Ve?(tt&&t.texStorage2D(i.TEXTURE_2D,ge,Oe,re.width,re.height),V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,fe,Ie,re.data)):t.texImage2D(i.TEXTURE_2D,0,Oe,re.width,re.height,0,fe,Ie,re.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ve&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Oe,$e[0].width,$e[0].height,re.depth);for(let J=0,ne=$e.length;J<ne;J++)if(we=$e[J],E.format!==an)if(fe!==null)if(Ve){if(V)if(E.layerUpdates.size>0){const ye=Jl(we.width,we.height,E.format,E.type);for(const ve of E.layerUpdates){const He=we.data.subarray(ve*ye/we.data.BYTES_PER_ELEMENT,(ve+1)*ye/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ve,we.width,we.height,1,fe,He)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,we.width,we.height,re.depth,fe,we.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Oe,we.width,we.height,re.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,we.width,we.height,re.depth,fe,Ie,we.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,Oe,we.width,we.height,re.depth,0,fe,Ie,we.data)}else{Ve&&tt&&t.texStorage2D(i.TEXTURE_2D,ge,Oe,$e[0].width,$e[0].height);for(let J=0,ne=$e.length;J<ne;J++)we=$e[J],E.format!==an?fe!==null?Ve?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,we.width,we.height,fe,we.data):t.compressedTexImage2D(i.TEXTURE_2D,J,Oe,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,we.width,we.height,fe,Ie,we.data):t.texImage2D(i.TEXTURE_2D,J,Oe,we.width,we.height,0,fe,Ie,we.data)}else if(E.isDataArrayTexture)if(Ve){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Oe,re.width,re.height,re.depth),V)if(E.layerUpdates.size>0){const J=Jl(re.width,re.height,E.format,E.type);for(const ne of E.layerUpdates){const ye=re.data.subarray(ne*J/re.data.BYTES_PER_ELEMENT,(ne+1)*J/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ne,re.width,re.height,1,fe,Ie,ye)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,fe,Ie,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,re.width,re.height,re.depth,0,fe,Ie,re.data);else if(E.isData3DTexture)Ve?(tt&&t.texStorage3D(i.TEXTURE_3D,ge,Oe,re.width,re.height,re.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,fe,Ie,re.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,re.width,re.height,re.depth,0,fe,Ie,re.data);else if(E.isFramebufferTexture){if(tt)if(Ve)t.texStorage2D(i.TEXTURE_2D,ge,Oe,re.width,re.height);else{let J=re.width,ne=re.height;for(let ye=0;ye<ge;ye++)t.texImage2D(i.TEXTURE_2D,ye,Oe,J,ne,0,fe,Ie,null),J>>=1,ne>>=1}}else if($e.length>0){if(Ve&&tt){const J=me($e[0]);t.texStorage2D(i.TEXTURE_2D,ge,Oe,J.width,J.height)}for(let J=0,ne=$e.length;J<ne;J++)we=$e[J],Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,fe,Ie,we):t.texImage2D(i.TEXTURE_2D,J,Oe,fe,Ie,we);E.generateMipmaps=!1}else if(Ve){if(tt){const J=me(re);t.texStorage2D(i.TEXTURE_2D,ge,Oe,J.width,J.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Ie,re)}else t.texImage2D(i.TEXTURE_2D,0,Oe,fe,Ie,re);p(E)&&d(te),oe.__version=q.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function Q(C,E,$){if(E.image.length!==6)return;const te=Me(C,E),se=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+$);const q=n.get(se);if(se.version!==q.__version||te===!0){t.activeTexture(i.TEXTURE0+$);const oe=Ze.getPrimaries(Ze.workingColorSpace),ie=E.colorSpace===Gn?null:Ze.getPrimaries(E.colorSpace),de=E.colorSpace===Gn||oe===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const De=E.isCompressedTexture||E.image[0].isCompressedTexture,re=E.image[0]&&E.image[0].isDataTexture,fe=[];for(let ne=0;ne<6;ne++)!De&&!re?fe[ne]=v(E.image[ne],!0,s.maxCubemapSize):fe[ne]=re?E.image[ne].image:E.image[ne],fe[ne]=Te(E,fe[ne]);const Ie=fe[0],Oe=r.convert(E.format,E.colorSpace),we=r.convert(E.type),$e=x(E.internalFormat,Oe,we,E.colorSpace),Ve=E.isVideoTexture!==!0,tt=q.__version===void 0||te===!0,V=se.dataReady;let ge=A(E,Ie);ce(i.TEXTURE_CUBE_MAP,E);let J;if(De){Ve&&tt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,$e,Ie.width,Ie.height);for(let ne=0;ne<6;ne++){J=fe[ne].mipmaps;for(let ye=0;ye<J.length;ye++){const ve=J[ye];E.format!==an?Oe!==null?Ve?V&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,0,0,ve.width,ve.height,Oe,ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,$e,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,0,0,ve.width,ve.height,Oe,we,ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,$e,ve.width,ve.height,0,Oe,we,ve.data)}}}else{if(J=E.mipmaps,Ve&&tt){J.length>0&&ge++;const ne=me(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,$e,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(re){Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,fe[ne].width,fe[ne].height,Oe,we,fe[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,fe[ne].width,fe[ne].height,0,Oe,we,fe[ne].data);for(let ye=0;ye<J.length;ye++){const He=J[ye].image[ne].image;Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,0,0,He.width,He.height,Oe,we,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,$e,He.width,He.height,0,Oe,we,He.data)}}else{Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Oe,we,fe[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,Oe,we,fe[ne]);for(let ye=0;ye<J.length;ye++){const ve=J[ye];Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,0,0,Oe,we,ve.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,$e,Oe,we,ve.image[ne])}}}p(E)&&d(i.TEXTURE_CUBE_MAP),q.__version=se.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function le(C,E,$,te,se,q){const oe=r.convert($.format,$.colorSpace),ie=r.convert($.type),de=x($.internalFormat,oe,ie,$.colorSpace),De=n.get(E),re=n.get($);if(re.__renderTarget=E,!De.__hasExternalTextures){const fe=Math.max(1,E.width>>q),Ie=Math.max(1,E.height>>q);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,q,de,fe,Ie,E.depth,0,oe,ie,null):t.texImage2D(se,q,de,fe,Ie,0,oe,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),ke(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,se,re.__webglTexture,0,Ne(E)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,se,re.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(C,E,$){if(i.bindRenderbuffer(i.RENDERBUFFER,C),E.depthBuffer){const te=E.depthTexture,se=te&&te.isDepthTexture?te.type:null,q=y(E.stencilBuffer,se),oe=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=Ne(E);ke(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie,q,E.width,E.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,q,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,C)}else{const te=E.textures;for(let se=0;se<te.length;se++){const q=te[se],oe=r.convert(q.format,q.colorSpace),ie=r.convert(q.type),de=x(q.internalFormat,oe,ie,q.colorSpace),De=Ne(E);$&&ke(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,De,de,E.width,E.height):ke(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,De,de,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,de,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Se(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(E.depthTexture);te.__renderTarget=E,(!te.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),N(E.depthTexture,0);const se=te.__webglTexture,q=Ne(E);if(E.depthTexture.format===Yi)ke(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(E.depthTexture.format===rs)ke(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Le(C){const E=n.get(C),$=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const te=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),te){const se=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,te.removeEventListener("dispose",se)};te.addEventListener("dispose",se),E.__depthDisposeCallback=se}E.__boundDepthTexture=te}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Se(E.__webglFramebuffer,C)}else if($){E.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[te]),E.__webglDepthbuffer[te]===void 0)E.__webglDepthbuffer[te]=i.createRenderbuffer(),ae(E.__webglDepthbuffer[te],C,!1);else{const se=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=E.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,q)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ae(E.__webglDepthbuffer,C,!1);else{const te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,se)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(C,E,$){const te=n.get(C);E!==void 0&&le(te.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&Le(C)}function Y(C){const E=C.texture,$=n.get(C),te=n.get(E);C.addEventListener("dispose",R);const se=C.textures,q=C.isWebGLCubeRenderTarget===!0,oe=se.length>1;if(oe||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=E.version,o.memory.textures++),q){$.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[ie]=[];for(let de=0;de<E.mipmaps.length;de++)$.__webglFramebuffer[ie][de]=i.createFramebuffer()}else $.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let ie=0;ie<E.mipmaps.length;ie++)$.__webglFramebuffer[ie]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(oe)for(let ie=0,de=se.length;ie<de;ie++){const De=n.get(se[ie]);De.__webglTexture===void 0&&(De.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&ke(C)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ie=0;ie<se.length;ie++){const de=se[ie];$.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[ie]);const De=r.convert(de.format,de.colorSpace),re=r.convert(de.type),fe=x(de.internalFormat,De,re,de.colorSpace,C.isXRRenderTarget===!0),Ie=Ne(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,fe,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,$.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),ae($.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),ce(i.TEXTURE_CUBE_MAP,E);for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)le($.__webglFramebuffer[ie][de],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,de);else le($.__webglFramebuffer[ie],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(E)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let ie=0,de=se.length;ie<de;ie++){const De=se[ie],re=n.get(De);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),ce(i.TEXTURE_2D,De),le($.__webglFramebuffer,C,De,i.COLOR_ATTACHMENT0+ie,i.TEXTURE_2D,0),p(De)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,te.__webglTexture),ce(ie,E),E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)le($.__webglFramebuffer[de],C,E,i.COLOR_ATTACHMENT0,ie,de);else le($.__webglFramebuffer,C,E,i.COLOR_ATTACHMENT0,ie,0);p(E)&&d(ie),t.unbindTexture()}C.depthBuffer&&Le(C)}function ee(C){const E=C.textures;for(let $=0,te=E.length;$<te;$++){const se=E[$];if(p(se)){const q=_(C),oe=n.get(se).__webglTexture;t.bindTexture(q,oe),d(q),t.unbindTexture()}}}const ue=[],F=[];function Fe(C){if(C.samples>0){if(ke(C)===!1){const E=C.textures,$=C.width,te=C.height;let se=i.COLOR_BUFFER_BIT;const q=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(C),ie=E.length>1;if(ie)for(let de=0;de<E.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let de=0;de<E.length;de++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[de]);const De=n.get(E[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,De,0)}i.blitFramebuffer(0,0,$,te,0,0,$,te,se,i.NEAREST),c===!0&&(ue.length=0,F.length=0,ue.push(i.COLOR_ATTACHMENT0+de),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ue.push(q),F.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let de=0;de<E.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,oe.__webglColorRenderbuffer[de]);const De=n.get(E[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,De,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const E=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Ne(C){return Math.min(s.maxSamples,C.samples)}function ke(C){const E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ee(C){const E=o.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function Te(C,E){const $=C.colorSpace,te=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||$!==as&&$!==Gn&&(Ze.getTransfer($)===it?(te!==an||se!==Pn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),E}function me(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=S,this.resetTextureUnits=H,this.setTexture2D=N,this.setTexture2DArray=P,this.setTexture3D=z,this.setTextureCube=k,this.rebindTextures=Ue,this.setupRenderTarget=Y,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=le,this.useMultisampledRTT=ke}function H_(i,e){function t(n,s=Gn){let r;const o=Ze.getTransfer(s);if(n===Pn)return i.UNSIGNED_BYTE;if(n===ac)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===fu)return i.BYTE;if(n===pu)return i.SHORT;if(n===Bs)return i.UNSIGNED_SHORT;if(n===oc)return i.INT;if(n===_i)return i.UNSIGNED_INT;if(n===bn)return i.FLOAT;if(n===Ws)return i.HALF_FLOAT;if(n===gu)return i.ALPHA;if(n===vu)return i.RGB;if(n===an)return i.RGBA;if(n===_u)return i.LUMINANCE;if(n===yu)return i.LUMINANCE_ALPHA;if(n===Yi)return i.DEPTH_COMPONENT;if(n===rs)return i.DEPTH_STENCIL;if(n===xu)return i.RED;if(n===lc)return i.RED_INTEGER;if(n===Mu)return i.RG;if(n===hc)return i.RG_INTEGER;if(n===uc)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Ir||n===Ur)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xa||n===Ma||n===Sa||n===wa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===xa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ma)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Sa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ea||n===Ta||n===ba)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ea||n===Ta)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ba)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Ua||n===Na||n===Fa||n===Oa||n===ka||n===Ba||n===za)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Aa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ra)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ca)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===La)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Da)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ia)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ua)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Na)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ka)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ba)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===za)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Nr||n===Va||n===Ha)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Nr)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ha)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Su||n===Ga||n===Wa||n===Xa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Nr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ga)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class G_ extends Gt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Tt extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const W_={type:"move"};class Wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Tt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Tt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Tt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,n),d=this._getHandJoint(l,v);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(W_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Tt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const X_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,q_=`
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

}`;class $_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Nt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Jn({vertexShader:X_,fragmentShader:q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new xe(new $s(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Y_ extends cs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,m=null,g=null;const v=new $_,p=t.getContextAttributes();let d=null,_=null;const x=[],y=[],A=new ze;let b=null;const R=new Gt;R.viewport=new ot;const D=new Gt;D.viewport=new ot;const w=[R,D],M=new G_;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=x[X];return Q===void 0&&(Q=new Wo,x[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=x[X];return Q===void 0&&(Q=new Wo,x[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=x[X];return Q===void 0&&(Q=new Wo,x[X]=Q),Q.getHandSpace()};function S(X){const Q=y.indexOf(X.inputSource);if(Q===-1)return;const le=x[Q];le!==void 0&&(le.update(X.inputSource,X.frame,l||o),le.dispatchEvent({type:X.type,data:X.inputSource}))}function L(){s.removeEventListener("select",S),s.removeEventListener("selectstart",S),s.removeEventListener("selectend",S),s.removeEventListener("squeeze",S),s.removeEventListener("squeezestart",S),s.removeEventListener("squeezeend",S),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",N);for(let X=0;X<x.length;X++){const Q=y[X];Q!==null&&(y[X]=null,x[X].disconnect(Q))}I=null,H=null,v.reset(),e.setRenderTarget(d),m=null,f=null,u=null,s=null,_=null,Me.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",S),s.addEventListener("selectstart",S),s.addEventListener("selectend",S),s.addEventListener("squeeze",S),s.addEventListener("squeezestart",S),s.addEventListener("squeezeend",S),s.addEventListener("end",L),s.addEventListener("inputsourceschange",N),p.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0){const Q={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new yi(m.framebufferWidth,m.framebufferHeight,{format:an,type:Pn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let Q=null,le=null,ae=null;p.depth&&(ae=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=p.stencil?rs:Yi,le=p.stencil?ss:_i);const Se={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(Se),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new yi(f.textureWidth,f.textureHeight,{format:an,type:Pn,depthTexture:new ku(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Me.setContext(s),Me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function N(X){for(let Q=0;Q<X.removed.length;Q++){const le=X.removed[Q],ae=y.indexOf(le);ae>=0&&(y[ae]=null,x[ae].disconnect(le))}for(let Q=0;Q<X.added.length;Q++){const le=X.added[Q];let ae=y.indexOf(le);if(ae===-1){for(let Le=0;Le<x.length;Le++)if(Le>=y.length){y.push(le),ae=Le;break}else if(y[Le]===null){y[Le]=le,ae=Le;break}if(ae===-1)break}const Se=x[ae];Se&&Se.connect(le)}}const P=new U,z=new U;function k(X,Q,le){P.setFromMatrixPosition(Q.matrixWorld),z.setFromMatrixPosition(le.matrixWorld);const ae=P.distanceTo(z),Se=Q.projectionMatrix.elements,Le=le.projectionMatrix.elements,Ue=Se[14]/(Se[10]-1),Y=Se[14]/(Se[10]+1),ee=(Se[9]+1)/Se[5],ue=(Se[9]-1)/Se[5],F=(Se[8]-1)/Se[0],Fe=(Le[8]+1)/Le[0],Ne=Ue*F,ke=Ue*Fe,Ee=ae/(-F+Fe),Te=Ee*-F;if(Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Te),X.translateZ(Ee),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Se[10]===-1)X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const me=Ue+Ee,C=Y+Ee,E=Ne-Te,$=ke+(ae-Te),te=ee*Y/C*me,se=ue*Y/C*me;X.projectionMatrix.makePerspective(E,$,te,se,me,C),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function O(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Q=X.near,le=X.far;v.texture!==null&&(v.depthNear>0&&(Q=v.depthNear),v.depthFar>0&&(le=v.depthFar)),M.near=D.near=R.near=Q,M.far=D.far=R.far=le,(I!==M.near||H!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,H=M.far),R.layers.mask=X.layers.mask|2,D.layers.mask=X.layers.mask|4,M.layers.mask=R.layers.mask|D.layers.mask;const ae=X.parent,Se=M.cameras;O(M,ae);for(let Le=0;Le<Se.length;Le++)O(Se[Le],ae);Se.length===2?k(M,R,D):M.projectionMatrix.copy(R.projectionMatrix),B(X,M,ae)};function B(X,Q,le){le===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(le.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=$a*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let Z=null;function ce(X,Q){if(h=Q.getViewerPose(l||o),g=Q,h!==null){const le=h.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let ae=!1;le.length!==M.cameras.length&&(M.cameras.length=0,ae=!0);for(let Le=0;Le<le.length;Le++){const Ue=le[Le];let Y=null;if(m!==null)Y=m.getViewport(Ue);else{const ue=u.getViewSubImage(f,Ue);Y=ue.viewport,Le===0&&(e.setRenderTargetTextures(_,ue.colorTexture,f.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(_))}let ee=w[Le];ee===void 0&&(ee=new Gt,ee.layers.enable(Le),ee.viewport=new ot,w[Le]=ee),ee.matrix.fromArray(Ue.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(Ue.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(Y.x,Y.y,Y.width,Y.height),Le===0&&(M.matrix.copy(ee.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ae===!0&&M.cameras.push(ee)}const Se=s.enabledFeatures;if(Se&&Se.includes("depth-sensing")){const Le=u.getDepthInformation(le[0]);Le&&Le.isValid&&Le.texture&&v.init(e,Le,s.renderState)}}for(let le=0;le<x.length;le++){const ae=y[le],Se=x[le];ae!==null&&Se!==void 0&&Se.update(ae,Q,l||o)}Z&&Z(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Me=new Fu;Me.setAnimationLoop(ce),this.setAnimationLoop=function(X){Z=X},this.dispose=function(){}}}const ri=new Qt,j_=new dt;function K_(i,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,Iu(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,_,x,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,y)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),v(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?c(p,d,_,x):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Pt&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Pt&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const _=e.get(d),x=_.envMap,y=_.envMapRotation;x&&(p.envMap.value=x,ri.copy(y),ri.x*=-1,ri.y*=-1,ri.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),p.envMapRotation.value.setFromMatrix4(j_.makeRotationFromEuler(ri)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,_,x){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*_,p.scale.value=x*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,_){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Pt&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function v(p,d){const _=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Z_(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,x){const y=x.program;n.uniformBlockBinding(_,y)}function l(_,x){let y=s[_.id];y===void 0&&(g(_),y=h(_),s[_.id]=y,_.addEventListener("dispose",p));const A=x.program;n.updateUBOMapping(_,A);const b=e.render.frame;r[_.id]!==b&&(f(_),r[_.id]=b)}function h(_){const x=u();_.__bindingPointIndex=x;const y=i.createBuffer(),A=_.__size,b=_.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,A,b),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,y),y}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const x=s[_.id],y=_.uniforms,A=_.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let b=0,R=y.length;b<R;b++){const D=Array.isArray(y[b])?y[b]:[y[b]];for(let w=0,M=D.length;w<M;w++){const I=D[w];if(m(I,b,w,A)===!0){const H=I.__offset,S=Array.isArray(I.value)?I.value:[I.value];let L=0;for(let N=0;N<S.length;N++){const P=S[N],z=v(P);typeof P=="number"||typeof P=="boolean"?(I.__data[0]=P,i.bufferSubData(i.UNIFORM_BUFFER,H+L,I.__data)):P.isMatrix3?(I.__data[0]=P.elements[0],I.__data[1]=P.elements[1],I.__data[2]=P.elements[2],I.__data[3]=0,I.__data[4]=P.elements[3],I.__data[5]=P.elements[4],I.__data[6]=P.elements[5],I.__data[7]=0,I.__data[8]=P.elements[6],I.__data[9]=P.elements[7],I.__data[10]=P.elements[8],I.__data[11]=0):(P.toArray(I.__data,L),L+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,H,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(_,x,y,A){const b=_.value,R=x+"_"+y;if(A[R]===void 0)return typeof b=="number"||typeof b=="boolean"?A[R]=b:A[R]=b.clone(),!0;{const D=A[R];if(typeof b=="number"||typeof b=="boolean"){if(D!==b)return A[R]=b,!0}else if(D.equals(b)===!1)return D.copy(b),!0}return!1}function g(_){const x=_.uniforms;let y=0;const A=16;for(let R=0,D=x.length;R<D;R++){const w=Array.isArray(x[R])?x[R]:[x[R]];for(let M=0,I=w.length;M<I;M++){const H=w[M],S=Array.isArray(H.value)?H.value:[H.value];for(let L=0,N=S.length;L<N;L++){const P=S[L],z=v(P),k=y%A,O=k%z.boundary,B=k+O;y+=O,B!==0&&A-B<z.storage&&(y+=A-B),H.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=y,y+=z.storage}}}const b=y%A;return b>0&&(y+=A-b),_.__size=y,_.__cache={},this}function v(_){const x={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(x.boundary=4,x.storage=4):_.isVector2?(x.boundary=8,x.storage=8):_.isVector3||_.isColor?(x.boundary=16,x.storage=12):_.isVector4?(x.boundary=16,x.storage=16):_.isMatrix3?(x.boundary=48,x.storage=48):_.isMatrix4?(x.boundary=64,x.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),x}function p(_){const x=_.target;x.removeEventListener("dispose",p);const y=o.indexOf(x.__bindingPointIndex);o.splice(y,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function d(){for(const _ in s)i.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}class J_{constructor(e={}){const{canvas:t=zp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),v=new Int32Array(4);let p=null,d=null;const _=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this.toneMapping=$n,this.toneMappingExposure=1;const y=this;let A=!1,b=0,R=0,D=null,w=-1,M=null;const I=new ot,H=new ot;let S=null;const L=new Ke(0);let N=0,P=t.width,z=t.height,k=1,O=null,B=null;const Z=new ot(0,0,P,z),ce=new ot(0,0,P,z);let Me=!1;const X=new dc;let Q=!1,le=!1;const ae=new dt,Se=new dt,Le=new U,Ue=new ot,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ee=!1;function ue(){return D===null?k:1}let F=n;function Fe(T,G){return t.getContext(T,G)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rc}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",ve,!1),F===null){const G="webgl2";if(F=Fe(G,T),F===null)throw Fe(G)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ne,ke,Ee,Te,me,C,E,$,te,se,q,oe,ie,de,De,re,fe,Ie,Oe,we,$e,Ve,tt,V;function ge(){Ne=new iv(F),Ne.init(),Ve=new H_(F,Ne),ke=new Z0(F,Ne,e,Ve),Ee=new B_(F,Ne),ke.reverseDepthBuffer&&f&&Ee.buffers.depth.setReversed(!0),Te=new ov(F),me=new E_,C=new V_(F,Ne,Ee,me,ke,Ve,Te),E=new Q0(y),$=new nv(y),te=new fm(F),tt=new j0(F,te),se=new sv(F,te,Te,tt),q=new cv(F,se,te,Te),Oe=new av(F,ke,C),re=new J0(me),oe=new w_(y,E,$,Ne,ke,tt,re),ie=new K_(y,me),de=new b_,De=new D_(Ne),Ie=new Y0(y,E,$,Ee,q,m,c),fe=new O_(y,q,ke),V=new Z_(F,Te,ke,Ee),we=new K0(F,Ne,Te),$e=new rv(F,Ne,Te),Te.programs=oe.programs,y.capabilities=ke,y.extensions=Ne,y.properties=me,y.renderLists=de,y.shadowMap=fe,y.state=Ee,y.info=Te}ge();const J=new Y_(y,F);this.xr=J,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const T=Ne.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ne.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return k},this.setPixelRatio=function(T){T!==void 0&&(k=T,this.setSize(P,z,!1))},this.getSize=function(T){return T.set(P,z)},this.setSize=function(T,G,j=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=T,z=G,t.width=Math.floor(T*k),t.height=Math.floor(G*k),j===!0&&(t.style.width=T+"px",t.style.height=G+"px"),this.setViewport(0,0,T,G)},this.getDrawingBufferSize=function(T){return T.set(P*k,z*k).floor()},this.setDrawingBufferSize=function(T,G,j){P=T,z=G,k=j,t.width=Math.floor(T*j),t.height=Math.floor(G*j),this.setViewport(0,0,T,G)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,G,j,K){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,G,j,K),Ee.viewport(I.copy(Z).multiplyScalar(k).round())},this.getScissor=function(T){return T.copy(ce)},this.setScissor=function(T,G,j,K){T.isVector4?ce.set(T.x,T.y,T.z,T.w):ce.set(T,G,j,K),Ee.scissor(H.copy(ce).multiplyScalar(k).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(T){Ee.setScissorTest(Me=T)},this.setOpaqueSort=function(T){O=T},this.setTransparentSort=function(T){B=T},this.getClearColor=function(T){return T.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor.apply(Ie,arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha.apply(Ie,arguments)},this.clear=function(T=!0,G=!0,j=!0){let K=0;if(T){let W=!1;if(D!==null){const he=D.texture.format;W=he===uc||he===hc||he===lc}if(W){const he=D.texture.type,_e=he===Pn||he===_i||he===Bs||he===ss||he===ac||he===cc,be=Ie.getClearColor(),Ae=Ie.getClearAlpha(),Be=be.r,Ge=be.g,Re=be.b;_e?(g[0]=Be,g[1]=Ge,g[2]=Re,g[3]=Ae,F.clearBufferuiv(F.COLOR,0,g)):(v[0]=Be,v[1]=Ge,v[2]=Re,v[3]=Ae,F.clearBufferiv(F.COLOR,0,v))}else K|=F.COLOR_BUFFER_BIT}G&&(K|=F.DEPTH_BUFFER_BIT),j&&(K|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),de.dispose(),De.dispose(),me.dispose(),E.dispose(),$.dispose(),q.dispose(),tt.dispose(),V.dispose(),oe.dispose(),J.dispose(),J.removeEventListener("sessionstart",mc),J.removeEventListener("sessionend",gc),Qn.stop()};function ne(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const T=Te.autoReset,G=fe.enabled,j=fe.autoUpdate,K=fe.needsUpdate,W=fe.type;ge(),Te.autoReset=T,fe.enabled=G,fe.autoUpdate=j,fe.needsUpdate=K,fe.type=W}function ve(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function He(T){const G=T.target;G.removeEventListener("dispose",He),ft(G)}function ft(T){bt(T),me.remove(T)}function bt(T){const G=me.get(T).programs;G!==void 0&&(G.forEach(function(j){oe.releaseProgram(j)}),T.isShaderMaterial&&oe.releaseShaderCache(T))}this.renderBufferDirect=function(T,G,j,K,W,he){G===null&&(G=Y);const _e=W.isMesh&&W.matrixWorld.determinant()<0,be=qu(T,G,j,K,W);Ee.setMaterial(K,_e);let Ae=j.index,Be=1;if(K.wireframe===!0){if(Ae=se.getWireframeAttribute(j),Ae===void 0)return;Be=2}const Ge=j.drawRange,Re=j.attributes.position;let Je=Ge.start*Be,at=(Ge.start+Ge.count)*Be;he!==null&&(Je=Math.max(Je,he.start*Be),at=Math.min(at,(he.start+he.count)*Be)),Ae!==null?(Je=Math.max(Je,0),at=Math.min(at,Ae.count)):Re!=null&&(Je=Math.max(Je,0),at=Math.min(at,Re.count));const ht=at-Je;if(ht<0||ht===1/0)return;tt.setup(W,K,be,j,Ae);let Ot,Qe=we;if(Ae!==null&&(Ot=te.get(Ae),Qe=$e,Qe.setIndex(Ot)),W.isMesh)K.wireframe===!0?(Ee.setLineWidth(K.wireframeLinewidth*ue()),Qe.setMode(F.LINES)):Qe.setMode(F.TRIANGLES);else if(W.isLine){let Pe=K.linewidth;Pe===void 0&&(Pe=1),Ee.setLineWidth(Pe*ue()),W.isLineSegments?Qe.setMode(F.LINES):W.isLineLoop?Qe.setMode(F.LINE_LOOP):Qe.setMode(F.LINE_STRIP)}else W.isPoints?Qe.setMode(F.POINTS):W.isSprite&&Qe.setMode(F.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Qe.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Qe.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Pe=W._multiDrawStarts,gn=W._multiDrawCounts,et=W._multiDrawCount,tn=Ae?te.get(Ae).bytesPerElement:1,bi=me.get(K).currentProgram.getUniforms();for(let Bt=0;Bt<et;Bt++)bi.setValue(F,"_gl_DrawID",Bt),Qe.render(Pe[Bt]/tn,gn[Bt])}else if(W.isInstancedMesh)Qe.renderInstances(Je,ht,W.count);else if(j.isInstancedBufferGeometry){const Pe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,gn=Math.min(j.instanceCount,Pe);Qe.renderInstances(Je,ht,gn)}else Qe.render(Je,ht)};function nt(T,G,j){T.transparent===!0&&T.side===wt&&T.forceSinglePass===!1?(T.side=Pt,T.needsUpdate=!0,Zs(T,G,j),T.side=Zn,T.needsUpdate=!0,Zs(T,G,j),T.side=wt):Zs(T,G,j)}this.compile=function(T,G,j=null){j===null&&(j=T),d=De.get(j),d.init(G),x.push(d),j.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),T!==j&&T.traverseVisible(function(W){W.isLight&&W.layers.test(G.layers)&&(d.pushLight(W),W.castShadow&&d.pushShadow(W))}),d.setupLights();const K=new Set;return T.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const he=W.material;if(he)if(Array.isArray(he))for(let _e=0;_e<he.length;_e++){const be=he[_e];nt(be,j,W),K.add(be)}else nt(he,j,W),K.add(he)}),x.pop(),d=null,K},this.compileAsync=function(T,G,j=null){const K=this.compile(T,G,j);return new Promise(W=>{function he(){if(K.forEach(function(_e){me.get(_e).currentProgram.isReady()&&K.delete(_e)}),K.size===0){W(T);return}setTimeout(he,10)}Ne.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let en=null;function mn(T){en&&en(T)}function mc(){Qn.stop()}function gc(){Qn.start()}const Qn=new Fu;Qn.setAnimationLoop(mn),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(T){en=T,J.setAnimationLoop(T),T===null?Qn.stop():Qn.start()},J.addEventListener("sessionstart",mc),J.addEventListener("sessionend",gc),this.render=function(T,G){if(G!==void 0&&G.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),G.parent===null&&G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(G),G=J.getCamera()),T.isScene===!0&&T.onBeforeRender(y,T,G,D),d=De.get(T,x.length),d.init(G),x.push(d),Se.multiplyMatrices(G.projectionMatrix,G.matrixWorldInverse),X.setFromProjectionMatrix(Se),le=this.localClippingEnabled,Q=re.init(this.clippingPlanes,le),p=de.get(T,_.length),p.init(),_.push(p),J.enabled===!0&&J.isPresenting===!0){const he=y.xr.getDepthSensingMesh();he!==null&&to(he,G,-1/0,y.sortObjects)}to(T,G,0,y.sortObjects),p.finish(),y.sortObjects===!0&&p.sort(O,B),ee=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ee&&Ie.addToRenderList(p,T),this.info.render.frame++,Q===!0&&re.beginShadows();const j=d.state.shadowsArray;fe.render(j,T,G),Q===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=p.opaque,W=p.transmissive;if(d.setupLights(),G.isArrayCamera){const he=G.cameras;if(W.length>0)for(let _e=0,be=he.length;_e<be;_e++){const Ae=he[_e];_c(K,W,T,Ae)}ee&&Ie.render(T);for(let _e=0,be=he.length;_e<be;_e++){const Ae=he[_e];vc(p,T,Ae,Ae.viewport)}}else W.length>0&&_c(K,W,T,G),ee&&Ie.render(T),vc(p,T,G);D!==null&&(C.updateMultisampleRenderTarget(D),C.updateRenderTargetMipmap(D)),T.isScene===!0&&T.onAfterRender(y,T,G),tt.resetDefaultState(),w=-1,M=null,x.pop(),x.length>0?(d=x[x.length-1],Q===!0&&re.setGlobalState(y.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?p=_[_.length-1]:p=null};function to(T,G,j,K){if(T.visible===!1)return;if(T.layers.test(G.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(G);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||X.intersectsSprite(T)){K&&Ue.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Se);const _e=q.update(T),be=T.material;be.visible&&p.push(T,_e,be,j,Ue.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||X.intersectsObject(T))){const _e=q.update(T),be=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ue.copy(T.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ue.copy(_e.boundingSphere.center)),Ue.applyMatrix4(T.matrixWorld).applyMatrix4(Se)),Array.isArray(be)){const Ae=_e.groups;for(let Be=0,Ge=Ae.length;Be<Ge;Be++){const Re=Ae[Be],Je=be[Re.materialIndex];Je&&Je.visible&&p.push(T,_e,Je,j,Ue.z,Re)}}else be.visible&&p.push(T,_e,be,j,Ue.z,null)}}const he=T.children;for(let _e=0,be=he.length;_e<be;_e++)to(he[_e],G,j,K)}function vc(T,G,j,K){const W=T.opaque,he=T.transmissive,_e=T.transparent;d.setupLightsView(j),Q===!0&&re.setGlobalState(y.clippingPlanes,j),K&&Ee.viewport(I.copy(K)),W.length>0&&Ks(W,G,j),he.length>0&&Ks(he,G,j),_e.length>0&&Ks(_e,G,j),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function _c(T,G,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[K.id]===void 0&&(d.state.transmissionRenderTarget[K.id]=new yi(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Ws:Pn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const he=d.state.transmissionRenderTarget[K.id],_e=K.viewport||I;he.setSize(_e.z,_e.w);const be=y.getRenderTarget();y.setRenderTarget(he),y.getClearColor(L),N=y.getClearAlpha(),N<1&&y.setClearColor(16777215,.5),y.clear(),ee&&Ie.render(j);const Ae=y.toneMapping;y.toneMapping=$n;const Be=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),d.setupLightsView(K),Q===!0&&re.setGlobalState(y.clippingPlanes,K),Ks(T,j,K),C.updateMultisampleRenderTarget(he),C.updateRenderTargetMipmap(he),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let Re=0,Je=G.length;Re<Je;Re++){const at=G[Re],ht=at.object,Ot=at.geometry,Qe=at.material,Pe=at.group;if(Qe.side===wt&&ht.layers.test(K.layers)){const gn=Qe.side;Qe.side=Pt,Qe.needsUpdate=!0,yc(ht,j,K,Ot,Qe,Pe),Qe.side=gn,Qe.needsUpdate=!0,Ge=!0}}Ge===!0&&(C.updateMultisampleRenderTarget(he),C.updateRenderTargetMipmap(he))}y.setRenderTarget(be),y.setClearColor(L,N),Be!==void 0&&(K.viewport=Be),y.toneMapping=Ae}function Ks(T,G,j){const K=G.isScene===!0?G.overrideMaterial:null;for(let W=0,he=T.length;W<he;W++){const _e=T[W],be=_e.object,Ae=_e.geometry,Be=K===null?_e.material:K,Ge=_e.group;be.layers.test(j.layers)&&yc(be,G,j,Ae,Be,Ge)}}function yc(T,G,j,K,W,he){T.onBeforeRender(y,G,j,K,W,he),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),W.onBeforeRender(y,G,j,K,T,he),W.transparent===!0&&W.side===wt&&W.forceSinglePass===!1?(W.side=Pt,W.needsUpdate=!0,y.renderBufferDirect(j,G,K,W,T,he),W.side=Zn,W.needsUpdate=!0,y.renderBufferDirect(j,G,K,W,T,he),W.side=wt):y.renderBufferDirect(j,G,K,W,T,he),T.onAfterRender(y,G,j,K,W,he)}function Zs(T,G,j){G.isScene!==!0&&(G=Y);const K=me.get(T),W=d.state.lights,he=d.state.shadowsArray,_e=W.state.version,be=oe.getParameters(T,W.state,he,G,j),Ae=oe.getProgramCacheKey(be);let Be=K.programs;K.environment=T.isMeshStandardMaterial?G.environment:null,K.fog=G.fog,K.envMap=(T.isMeshStandardMaterial?$:E).get(T.envMap||K.environment),K.envMapRotation=K.environment!==null&&T.envMap===null?G.environmentRotation:T.envMapRotation,Be===void 0&&(T.addEventListener("dispose",He),Be=new Map,K.programs=Be);let Ge=Be.get(Ae);if(Ge!==void 0){if(K.currentProgram===Ge&&K.lightsStateVersion===_e)return Mc(T,be),Ge}else be.uniforms=oe.getUniforms(T),T.onBeforeCompile(be,y),Ge=oe.acquireProgram(be,Ae),Be.set(Ae,Ge),K.uniforms=be.uniforms;const Re=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Re.clippingPlanes=re.uniform),Mc(T,be),K.needsLights=Yu(T),K.lightsStateVersion=_e,K.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.directionalShadowMap.value=W.state.directionalShadowMap,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotShadowMap.value=W.state.spotShadowMap,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMap.value=W.state.pointShadowMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),K.currentProgram=Ge,K.uniformsList=null,Ge}function xc(T){if(T.uniformsList===null){const G=T.currentProgram.getUniforms();T.uniformsList=Fr.seqWithValue(G.seq,T.uniforms)}return T.uniformsList}function Mc(T,G){const j=me.get(T);j.outputColorSpace=G.outputColorSpace,j.batching=G.batching,j.batchingColor=G.batchingColor,j.instancing=G.instancing,j.instancingColor=G.instancingColor,j.instancingMorph=G.instancingMorph,j.skinning=G.skinning,j.morphTargets=G.morphTargets,j.morphNormals=G.morphNormals,j.morphColors=G.morphColors,j.morphTargetsCount=G.morphTargetsCount,j.numClippingPlanes=G.numClippingPlanes,j.numIntersection=G.numClipIntersection,j.vertexAlphas=G.vertexAlphas,j.vertexTangents=G.vertexTangents,j.toneMapping=G.toneMapping}function qu(T,G,j,K,W){G.isScene!==!0&&(G=Y),C.resetTextureUnits();const he=G.fog,_e=K.isMeshStandardMaterial?G.environment:null,be=D===null?y.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:as,Ae=(K.isMeshStandardMaterial?$:E).get(K.envMap||_e),Be=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ge=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Re=!!j.morphAttributes.position,Je=!!j.morphAttributes.normal,at=!!j.morphAttributes.color;let ht=$n;K.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ht=y.toneMapping);const Ot=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Qe=Ot!==void 0?Ot.length:0,Pe=me.get(K),gn=d.state.lights;if(Q===!0&&(le===!0||T!==M)){const qt=T===M&&K.id===w;re.setState(K,T,qt)}let et=!1;K.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==gn.state.version||Pe.outputColorSpace!==be||W.isBatchedMesh&&Pe.batching===!1||!W.isBatchedMesh&&Pe.batching===!0||W.isBatchedMesh&&Pe.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Pe.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Pe.instancing===!1||!W.isInstancedMesh&&Pe.instancing===!0||W.isSkinnedMesh&&Pe.skinning===!1||!W.isSkinnedMesh&&Pe.skinning===!0||W.isInstancedMesh&&Pe.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Pe.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Pe.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Pe.instancingMorph===!1&&W.morphTexture!==null||Pe.envMap!==Ae||K.fog===!0&&Pe.fog!==he||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==re.numPlanes||Pe.numIntersection!==re.numIntersection)||Pe.vertexAlphas!==Be||Pe.vertexTangents!==Ge||Pe.morphTargets!==Re||Pe.morphNormals!==Je||Pe.morphColors!==at||Pe.toneMapping!==ht||Pe.morphTargetsCount!==Qe)&&(et=!0):(et=!0,Pe.__version=K.version);let tn=Pe.currentProgram;et===!0&&(tn=Zs(K,G,W));let bi=!1,Bt=!1,us=!1;const ut=tn.getUniforms(),hn=Pe.uniforms;if(Ee.useProgram(tn.program)&&(bi=!0,Bt=!0,us=!0),K.id!==w&&(w=K.id,Bt=!0),bi||M!==T){Ee.buffers.depth.getReversed()?(ae.copy(T.projectionMatrix),Hp(ae),Gp(ae),ut.setValue(F,"projectionMatrix",ae)):ut.setValue(F,"projectionMatrix",T.projectionMatrix),ut.setValue(F,"viewMatrix",T.matrixWorldInverse);const Ln=ut.map.cameraPosition;Ln!==void 0&&Ln.setValue(F,Le.setFromMatrixPosition(T.matrixWorld)),ke.logarithmicDepthBuffer&&ut.setValue(F,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ut.setValue(F,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Bt=!0,us=!0)}if(W.isSkinnedMesh){ut.setOptional(F,W,"bindMatrix"),ut.setOptional(F,W,"bindMatrixInverse");const qt=W.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),ut.setValue(F,"boneTexture",qt.boneTexture,C))}W.isBatchedMesh&&(ut.setOptional(F,W,"batchingTexture"),ut.setValue(F,"batchingTexture",W._matricesTexture,C),ut.setOptional(F,W,"batchingIdTexture"),ut.setValue(F,"batchingIdTexture",W._indirectTexture,C),ut.setOptional(F,W,"batchingColorTexture"),W._colorsTexture!==null&&ut.setValue(F,"batchingColorTexture",W._colorsTexture,C));const ds=j.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&Oe.update(W,j,tn),(Bt||Pe.receiveShadow!==W.receiveShadow)&&(Pe.receiveShadow=W.receiveShadow,ut.setValue(F,"receiveShadow",W.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(hn.envMap.value=Ae,hn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&G.environment!==null&&(hn.envMapIntensity.value=G.environmentIntensity),Bt&&(ut.setValue(F,"toneMappingExposure",y.toneMappingExposure),Pe.needsLights&&$u(hn,us),he&&K.fog===!0&&ie.refreshFogUniforms(hn,he),ie.refreshMaterialUniforms(hn,K,k,z,d.state.transmissionRenderTarget[T.id]),Fr.upload(F,xc(Pe),hn,C)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Fr.upload(F,xc(Pe),hn,C),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ut.setValue(F,"center",W.center),ut.setValue(F,"modelViewMatrix",W.modelViewMatrix),ut.setValue(F,"normalMatrix",W.normalMatrix),ut.setValue(F,"modelMatrix",W.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const qt=K.uniformsGroups;for(let Ln=0,Dn=qt.length;Ln<Dn;Ln++){const Sc=qt[Ln];V.update(Sc,tn),V.bind(Sc,tn)}}return tn}function $u(T,G){T.ambientLightColor.needsUpdate=G,T.lightProbe.needsUpdate=G,T.directionalLights.needsUpdate=G,T.directionalLightShadows.needsUpdate=G,T.pointLights.needsUpdate=G,T.pointLightShadows.needsUpdate=G,T.spotLights.needsUpdate=G,T.spotLightShadows.needsUpdate=G,T.rectAreaLights.needsUpdate=G,T.hemisphereLights.needsUpdate=G}function Yu(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(T,G,j){me.get(T.texture).__webglTexture=G,me.get(T.depthTexture).__webglTexture=j;const K=me.get(T);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=j===void 0,K.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,G){const j=me.get(T);j.__webglFramebuffer=G,j.__useDefaultFramebuffer=G===void 0},this.setRenderTarget=function(T,G=0,j=0){D=T,b=G,R=j;let K=!0,W=null,he=!1,_e=!1;if(T){const Ae=me.get(T);if(Ae.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(F.FRAMEBUFFER,null),K=!1;else if(Ae.__webglFramebuffer===void 0)C.setupRenderTarget(T);else if(Ae.__hasExternalTextures)C.rebindTextures(T,me.get(T.texture).__webglTexture,me.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Re=T.depthTexture;if(Ae.__boundDepthTexture!==Re){if(Re!==null&&me.has(Re)&&(T.width!==Re.image.width||T.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(T)}}const Be=T.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(_e=!0);const Ge=me.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(Ge[G])?W=Ge[G][j]:W=Ge[G],he=!0):T.samples>0&&C.useMultisampledRTT(T)===!1?W=me.get(T).__webglMultisampledFramebuffer:Array.isArray(Ge)?W=Ge[j]:W=Ge,I.copy(T.viewport),H.copy(T.scissor),S=T.scissorTest}else I.copy(Z).multiplyScalar(k).floor(),H.copy(ce).multiplyScalar(k).floor(),S=Me;if(Ee.bindFramebuffer(F.FRAMEBUFFER,W)&&K&&Ee.drawBuffers(T,W),Ee.viewport(I),Ee.scissor(H),Ee.setScissorTest(S),he){const Ae=me.get(T.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+G,Ae.__webglTexture,j)}else if(_e){const Ae=me.get(T.texture),Be=G||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ae.__webglTexture,j||0,Be)}w=-1},this.readRenderTargetPixels=function(T,G,j,K,W,he,_e){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){Ee.bindFramebuffer(F.FRAMEBUFFER,be);try{const Ae=T.texture,Be=Ae.format,Ge=Ae.type;if(!ke.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ke.textureTypeReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}G>=0&&G<=T.width-K&&j>=0&&j<=T.height-W&&F.readPixels(G,j,K,W,Ve.convert(Be),Ve.convert(Ge),he)}finally{const Ae=D!==null?me.get(D).__webglFramebuffer:null;Ee.bindFramebuffer(F.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(T,G,j,K,W,he,_e){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){const Ae=T.texture,Be=Ae.format,Ge=Ae.type;if(!ke.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ke.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(G>=0&&G<=T.width-K&&j>=0&&j<=T.height-W){Ee.bindFramebuffer(F.FRAMEBUFFER,be);const Re=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Re),F.bufferData(F.PIXEL_PACK_BUFFER,he.byteLength,F.STREAM_READ),F.readPixels(G,j,K,W,Ve.convert(Be),Ve.convert(Ge),0);const Je=D!==null?me.get(D).__webglFramebuffer:null;Ee.bindFramebuffer(F.FRAMEBUFFER,Je);const at=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Vp(F,at,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Re),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,he),F.deleteBuffer(Re),F.deleteSync(at),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,G=null,j=0){T.isTexture!==!0&&(As("WebGLRenderer: copyFramebufferToTexture function signature has changed."),G=arguments[0]||null,T=arguments[1]);const K=Math.pow(2,-j),W=Math.floor(T.image.width*K),he=Math.floor(T.image.height*K),_e=G!==null?G.x:0,be=G!==null?G.y:0;C.setTexture2D(T,0),F.copyTexSubImage2D(F.TEXTURE_2D,j,0,0,_e,be,W,he),Ee.unbindTexture()},this.copyTextureToTexture=function(T,G,j=null,K=null,W=0){T.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,T=arguments[1],G=arguments[2],W=arguments[3]||0,j=null);let he,_e,be,Ae,Be,Ge,Re,Je,at;const ht=T.isCompressedTexture?T.mipmaps[W]:T.image;j!==null?(he=j.max.x-j.min.x,_e=j.max.y-j.min.y,be=j.isBox3?j.max.z-j.min.z:1,Ae=j.min.x,Be=j.min.y,Ge=j.isBox3?j.min.z:0):(he=ht.width,_e=ht.height,be=ht.depth||1,Ae=0,Be=0,Ge=0),K!==null?(Re=K.x,Je=K.y,at=K.z):(Re=0,Je=0,at=0);const Ot=Ve.convert(G.format),Qe=Ve.convert(G.type);let Pe;G.isData3DTexture?(C.setTexture3D(G,0),Pe=F.TEXTURE_3D):G.isDataArrayTexture||G.isCompressedArrayTexture?(C.setTexture2DArray(G,0),Pe=F.TEXTURE_2D_ARRAY):(C.setTexture2D(G,0),Pe=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,G.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,G.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,G.unpackAlignment);const gn=F.getParameter(F.UNPACK_ROW_LENGTH),et=F.getParameter(F.UNPACK_IMAGE_HEIGHT),tn=F.getParameter(F.UNPACK_SKIP_PIXELS),bi=F.getParameter(F.UNPACK_SKIP_ROWS),Bt=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ht.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ht.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ae),F.pixelStorei(F.UNPACK_SKIP_ROWS,Be),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ge);const us=T.isDataArrayTexture||T.isData3DTexture,ut=G.isDataArrayTexture||G.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const hn=me.get(T),ds=me.get(G),qt=me.get(hn.__renderTarget),Ln=me.get(ds.__renderTarget);Ee.bindFramebuffer(F.READ_FRAMEBUFFER,qt.__webglFramebuffer),Ee.bindFramebuffer(F.DRAW_FRAMEBUFFER,Ln.__webglFramebuffer);for(let Dn=0;Dn<be;Dn++)us&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,me.get(T).__webglTexture,W,Ge+Dn),T.isDepthTexture?(ut&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,me.get(G).__webglTexture,W,at+Dn),F.blitFramebuffer(Ae,Be,he,_e,Re,Je,he,_e,F.DEPTH_BUFFER_BIT,F.NEAREST)):ut?F.copyTexSubImage3D(Pe,W,Re,Je,at+Dn,Ae,Be,he,_e):F.copyTexSubImage2D(Pe,W,Re,Je,at+Dn,Ae,Be,he,_e);Ee.bindFramebuffer(F.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ut?T.isDataTexture||T.isData3DTexture?F.texSubImage3D(Pe,W,Re,Je,at,he,_e,be,Ot,Qe,ht.data):G.isCompressedArrayTexture?F.compressedTexSubImage3D(Pe,W,Re,Je,at,he,_e,be,Ot,ht.data):F.texSubImage3D(Pe,W,Re,Je,at,he,_e,be,Ot,Qe,ht):T.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,W,Re,Je,he,_e,Ot,Qe,ht.data):T.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,W,Re,Je,ht.width,ht.height,Ot,ht.data):F.texSubImage2D(F.TEXTURE_2D,W,Re,Je,he,_e,Ot,Qe,ht);F.pixelStorei(F.UNPACK_ROW_LENGTH,gn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,et),F.pixelStorei(F.UNPACK_SKIP_PIXELS,tn),F.pixelStorei(F.UNPACK_SKIP_ROWS,bi),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Bt),W===0&&G.generateMipmaps&&F.generateMipmap(Pe),Ee.unbindTexture()},this.copyTextureToTexture3D=function(T,G,j=null,K=null,W=0){return T.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,K=arguments[1]||null,T=arguments[2],G=arguments[3],W=arguments[4]||0),As('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,G,j,K,W)},this.initRenderTarget=function(T){me.get(T).__webglFramebuffer===void 0&&C.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?C.setTextureCube(T,0):T.isData3DTexture?C.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?C.setTexture2DArray(T,0):C.setTexture2D(T,0),Ee.unbindTexture()},this.resetState=function(){b=0,R=0,D=null,Ee.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return An}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}class pc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ke(e),this.density=t}clone(){return new pc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Q_ extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qt,this.environmentIntensity=1,this.environmentRotation=new Qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ey{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qa,this.updateRanges=[],this.version=0,this.uuid=Yn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Yn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Dt=new U;class Gr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyMatrix4(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.applyNormalMatrix(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Dt.fromBufferAttribute(this,t),Dt.transformDirection(e),this.setXYZ(t,Dt.x,Dt.y,Dt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=dn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Gr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Gu extends Ti{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Hi;const Ms=new U,Gi=new U,Wi=new U,Xi=new ze,Ss=new ze,Wu=new dt,Tr=new U,ws=new U,br=new U,Ql=new ze,Xo=new ze,eh=new ze;class ty extends vt{constructor(e=new Gu){if(super(),this.isSprite=!0,this.type="Sprite",Hi===void 0){Hi=new xt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ey(t,5);Hi.setIndex([0,1,2,0,2,3]),Hi.setAttribute("position",new Gr(n,3,0,!1)),Hi.setAttribute("uv",new Gr(n,2,3,!1))}this.geometry=Hi,this.material=e,this.center=new ze(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),Wu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Wi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Ar(Tr.set(-.5,-.5,0),Wi,o,Gi,s,r),Ar(ws.set(.5,-.5,0),Wi,o,Gi,s,r),Ar(br.set(.5,.5,0),Wi,o,Gi,s,r),Ql.set(0,0),Xo.set(1,0),eh.set(1,1);let a=e.ray.intersectTriangle(Tr,ws,br,!1,Ms);if(a===null&&(Ar(ws.set(-.5,.5,0),Wi,o,Gi,s,r),Xo.set(0,1),a=e.ray.intersectTriangle(Tr,br,ws,!1,Ms),a===null))return;const c=e.ray.origin.distanceTo(Ms);c<e.near||c>e.far||t.push({distance:c,point:Ms.clone(),uv:Kt.getInterpolation(Ms,Tr,ws,br,Ql,Xo,eh,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ar(i,e,t,n,s,r){Xi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ss.x=r*Xi.x-s*Xi.y,Ss.y=s*Xi.x+r*Xi.y):Ss.copy(Xi),i.copy(e),i.x+=Ss.x,i.y+=Ss.y,i.applyMatrix4(Wu)}class hs extends Ti{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const th=new dt,ja=new Ru,Rr=new qs,Cr=new U;class Ys extends vt{constructor(e=new xt,t=new hs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(s),Rr.radius+=r,e.ray.intersectsSphere(Rr)===!1)return;th.copy(s).invert(),ja.copy(e.ray).applyMatrix4(th);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let g=f,v=m;g<v;g++){const p=l.getX(g);Cr.fromBufferAttribute(u,p),nh(Cr,p,c,s,e,t,this)}}else{const f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=f,v=m;g<v;g++)Cr.fromBufferAttribute(u,g),nh(Cr,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function nh(i,e,t,n,s,r,o){const a=ja.distanceSqToPoint(i);if(a<t){const c=new U;ja.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Jr extends Nt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Wt extends xt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],m=[];let g=0;const v=[],p=n/2;let d=0;_(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(f,3)),this.setAttribute("uv",new pt(m,2));function _(){const y=new U,A=new U;let b=0;const R=(t-e)/n;for(let D=0;D<=r;D++){const w=[],M=D/r,I=M*(t-e)+e;for(let H=0;H<=s;H++){const S=H/s,L=S*c+a,N=Math.sin(L),P=Math.cos(L);A.x=I*N,A.y=-M*n+p,A.z=I*P,u.push(A.x,A.y,A.z),y.set(N,R,P).normalize(),f.push(y.x,y.y,y.z),m.push(S,1-M),w.push(g++)}v.push(w)}for(let D=0;D<s;D++)for(let w=0;w<r;w++){const M=v[w][D],I=v[w+1][D],H=v[w+1][D+1],S=v[w][D+1];(e>0||w!==0)&&(h.push(M,I,S),b+=3),(t>0||w!==r-1)&&(h.push(I,H,S),b+=3)}l.addGroup(d,b,0),d+=b}function x(y){const A=g,b=new ze,R=new U;let D=0;const w=y===!0?e:t,M=y===!0?1:-1;for(let H=1;H<=s;H++)u.push(0,p*M,0),f.push(0,M,0),m.push(.5,.5),g++;const I=g;for(let H=0;H<=s;H++){const L=H/s*c+a,N=Math.cos(L),P=Math.sin(L);R.x=w*P,R.y=p*M,R.z=w*N,u.push(R.x,R.y,R.z),f.push(0,M,0),b.x=N*.5+.5,b.y=P*.5*M+.5,m.push(b.x,b.y),g++}for(let H=0;H<s;H++){const S=A+H,L=I+H;y===!0?h.push(L,L+1,S):h.push(L+1,L,S),D+=3}l.addGroup(d,D,y===!0?1:2),d+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class jn extends Wt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new jn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qr extends xt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new pt(r,3)),this.setAttribute("normal",new pt(r.slice(),3)),this.setAttribute("uv",new pt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const x=new U,y=new U,A=new U;for(let b=0;b<t.length;b+=3)m(t[b+0],x),m(t[b+1],y),m(t[b+2],A),c(x,y,A,_)}function c(_,x,y,A){const b=A+1,R=[];for(let D=0;D<=b;D++){R[D]=[];const w=_.clone().lerp(y,D/b),M=x.clone().lerp(y,D/b),I=b-D;for(let H=0;H<=I;H++)H===0&&D===b?R[D][H]=w:R[D][H]=w.clone().lerp(M,H/I)}for(let D=0;D<b;D++)for(let w=0;w<2*(b-D)-1;w++){const M=Math.floor(w/2);w%2===0?(f(R[D][M+1]),f(R[D+1][M]),f(R[D][M])):(f(R[D][M+1]),f(R[D+1][M+1]),f(R[D+1][M]))}}function l(_){const x=new U;for(let y=0;y<r.length;y+=3)x.x=r[y+0],x.y=r[y+1],x.z=r[y+2],x.normalize().multiplyScalar(_),r[y+0]=x.x,r[y+1]=x.y,r[y+2]=x.z}function h(){const _=new U;for(let x=0;x<r.length;x+=3){_.x=r[x+0],_.y=r[x+1],_.z=r[x+2];const y=p(_)/2/Math.PI+.5,A=d(_)/Math.PI+.5;o.push(y,1-A)}g(),u()}function u(){for(let _=0;_<o.length;_+=6){const x=o[_+0],y=o[_+2],A=o[_+4],b=Math.max(x,y,A),R=Math.min(x,y,A);b>.9&&R<.1&&(x<.2&&(o[_+0]+=1),y<.2&&(o[_+2]+=1),A<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function m(_,x){const y=_*3;x.x=e[y+0],x.y=e[y+1],x.z=e[y+2]}function g(){const _=new U,x=new U,y=new U,A=new U,b=new ze,R=new ze,D=new ze;for(let w=0,M=0;w<r.length;w+=9,M+=6){_.set(r[w+0],r[w+1],r[w+2]),x.set(r[w+3],r[w+4],r[w+5]),y.set(r[w+6],r[w+7],r[w+8]),b.set(o[M+0],o[M+1]),R.set(o[M+2],o[M+3]),D.set(o[M+4],o[M+5]),A.copy(_).add(x).add(y).divideScalar(3);const I=p(A);v(b,M+0,_,I),v(R,M+2,x,I),v(D,M+4,y,I)}}function v(_,x,y,A){A<0&&_.x===1&&(o[x]=_.x-1),y.x===0&&y.z===0&&(o[x]=A/2/Math.PI+.5)}function p(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.vertices,e.indices,e.radius,e.details)}}class js extends Qr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new js(e.radius,e.detail)}}class xi extends Qr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new xi(e.radius,e.detail)}}class zs extends xt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const f=(t-e)/s,m=new U,g=new ze;for(let v=0;v<=s;v++){for(let p=0;p<=n;p++){const d=r+p/n*o;m.x=u*Math.cos(d),m.y=u*Math.sin(d),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<s;v++){const p=v*(n+1);for(let d=0;d<n;d++){const _=d+p,x=_,y=_+n+1,A=_+n+2,b=_+1;a.push(x,y,b),a.push(y,A,b)}}this.setIndex(a),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class pn extends xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new U,f=new U,m=[],g=[],v=[],p=[];for(let d=0;d<=n;d++){const _=[],x=d/n;let y=0;d===0&&o===0?y=.5/t:d===n&&c===Math.PI&&(y=-.5/t);for(let A=0;A<=t;A++){const b=A/t;u.x=-e*Math.cos(s+b*r)*Math.sin(o+x*a),u.y=e*Math.cos(o+x*a),u.z=e*Math.sin(s+b*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),p.push(b+y,1-x),_.push(l++)}h.push(_)}for(let d=0;d<n;d++)for(let _=0;_<t;_++){const x=h[d][_+1],y=h[d][_],A=h[d+1][_],b=h[d+1][_+1];(d!==0||o>0)&&m.push(x,y,b),(d!==n-1||c<Math.PI)&&m.push(y,A,b)}this.setIndex(m),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(v,3)),this.setAttribute("uv",new pt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mi extends xt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new U,u=new U,f=new U;for(let m=0;m<=n;m++)for(let g=0;g<=s;g++){const v=g/s*r,p=m/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(v),u.y=(e+t*Math.cos(p))*Math.sin(v),u.z=t*Math.sin(p),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=s;g++){const v=(s+1)*m+g-1,p=(s+1)*(m-1)+g-1,d=(s+1)*(m-1)+g,_=(s+1)*m+g;o.push(v,p,_),o.push(p,d,_)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ut extends Ti{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new Ke(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wu,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class eo extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ny extends eo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ke(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const qo=new dt,ih=new U,sh=new U;class Xu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new dt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dc,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ih.setFromMatrixPosition(e.matrixWorld),t.position.copy(ih),sh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sh),t.updateMatrixWorld(),qo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const rh=new dt,Es=new U,$o=new U;class iy extends Xu{constructor(){super(new Gt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Es.setFromMatrixPosition(e.matrixWorld),n.position.copy(Es),$o.copy(n.position),$o.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt($o),n.updateMatrixWorld(),s.makeTranslation(-Es.x,-Es.y,-Es.z),rh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rh)}}class Yo extends eo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new iy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class sy extends Xu{constructor(){super(new Ou(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oh extends eo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new sy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ry extends eo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rc);function oy(i,e=1e-4){e=Math.max(e,Number.EPSILON);const t={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let o=0;const a=Object.keys(i.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let _=0,x=a.length;_<x;_++){const y=a[_],A=i.attributes[y];c[y]=new A.constructor(new A.array.constructor(A.count*A.itemSize),A.itemSize,A.normalized);const b=i.morphAttributes[y];b&&(l[y]||(l[y]=[]),b.forEach((R,D)=>{const w=new R.array.constructor(R.count*R.itemSize);l[y][D]=new R.constructor(w,R.itemSize,R.normalized)}))}const m=e*.5,g=Math.log10(1/e),v=Math.pow(10,g),p=m*v;for(let _=0;_<r;_++){const x=n?n.getX(_):_;let y="";for(let A=0,b=a.length;A<b;A++){const R=a[A],D=i.getAttribute(R),w=D.itemSize;for(let M=0;M<w;M++)y+=`${~~(D[u[M]](x)*v+p)},`}if(y in t)h.push(t[y]);else{for(let A=0,b=a.length;A<b;A++){const R=a[A],D=i.getAttribute(R),w=i.morphAttributes[R],M=D.itemSize,I=c[R],H=l[R];for(let S=0;S<M;S++){const L=u[S],N=f[S];if(I[N](o,D[L](x)),w)for(let P=0,z=w.length;P<z;P++)H[P][N](o,w[P][L](x))}}t[y]=o,h.push(o),o++}}const d=i.clone();for(const _ in i.attributes){const x=c[_];if(d.setAttribute(_,new x.constructor(x.array.slice(0,o*x.itemSize),x.itemSize,x.normalized)),_ in l)for(let y=0;y<l[_].length;y++){const A=l[_][y];d.morphAttributes[_][y]=new A.constructor(A.array.slice(0,o*A.itemSize),A.itemSize,A.normalized)}}return d.setIndex(h),d}function ah(i){let e=(typeof i=="number"?i:ay(i||"rockets-default-seed"))>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function ay(i){let e=0;for(let t=0;t<i.length;t++)e=(e<<5)-e+i.charCodeAt(t),e|=0;return e>>>0}function jo(i,e,t){return Math.max(e,Math.min(t,i))}function cy(){if(typeof document>"u")return null;try{const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(!e)return null;const t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255, 255, 255, 1)"),t.addColorStop(.25,"rgba(235, 245, 255, 0.85)"),t.addColorStop(.55,"rgba(160, 205, 255, 0.35)"),t.addColorStop(.85,"rgba(100, 150, 255, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const n=new Jr(i);return n.generateMipmaps=!0,n}catch{return null}}function ly(){if(typeof document>"u")return null;try{const i=document.createElement("canvas");i.width=256,i.height=256;const e=i.getContext("2d");if(!e)return null;const t=e.createImageData(256,256),n=t.data;for(let r=0;r<256;r++)for(let o=0;o<256;o++){const a=(r*256+o)*4,c=o/256,l=r/256,h=Math.sin(c*32)*Math.cos(l*32)*.35+Math.sin(c*64+l*48)*.25+Math.sin(c*128-l*96)*.15,u=(Math.random()-.5)*.25,f=Math.floor(Math.min(255,Math.max(0,(h+u+.5)*255)));n[a]=f,n[a+1]=f,n[a+2]=f,n[a+3]=255}e.putImageData(t,0,0);const s=new Jr(i);return s.wrapS=ks,s.wrapT=ks,s.repeat.set(4,4),s}catch{return null}}class hy{constructor(e,t=42){this.scene=e,this.mapSeed=t,this.asteroids=[],this.asteroidGroup=new Tt,this.debrisList=[],this.init()}init(){this.setupLighting(),this.createStarfield(),this.createAsteroidField()}setupLighting(){const e=new ny(5601177,1713203,1.6);this.scene.add(e);const t=new ry(3820380,1.2);this.scene.add(t);const n=new oh(16774890,3.2);n.position.set(700,450,600),this.scene.add(n);const s=new oh(46335,1.8);s.position.set(-600,-350,-500),this.scene.add(s);const r=new Yo(16772829,3.2,900);r.position.set(0,60,160),this.scene.add(r),this.combatFlashLight=new Yo(16737792,0,120),this.combatFlashLight.position.set(0,0,0),this.scene.add(this.combatFlashLight),this.meteorLight=new Yo(16724736,0,350),this.meteorLight.position.set(0,0,0),this.scene.add(this.meteorLight)}createStarfield(){const t=new xt,n=new Float32Array(350*3),s=new Float32Array(350*3),r=ah("stars-fixed-celestial");for(let l=0;l<350;l++){const h=l*3,u=r(),f=r(),m=u*2*Math.PI,g=Math.acos(2*f-1),v=2900+r()*500;n[h]=v*Math.sin(g)*Math.cos(m),n[h+1]=v*Math.sin(g)*Math.sin(m),n[h+2]=v*Math.cos(g);const p=r();p<.25?(s[h]=.65,s[h+1]=.88,s[h+2]=1):p<.45?(s[h]=1,s[h+1]=.88,s[h+2]=.65):p<.6?(s[h]=.92,s[h+1]=.65,s[h+2]=1):(s[h]=1,s[h+1]=1,s[h+2]=1)}t.setAttribute("position",new mt(n,3)),t.setAttribute("color",new mt(s,3));const o=cy(),a=new hs({size:2.5,map:o||void 0,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,blending:rt,sizeAttenuation:!1,fog:!1}),c=new Ys(t,a);this.scene.add(c)}createAsteroidField(){const e=ah(this.mapSeed),t=120,n=1e3,s=ly(),r=new Ut({color:10180674,roughness:.88,metalness:.16,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:wt}),o=new Ut({color:3685958,roughness:.92,metalness:.1,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:wt}),a=new Ut({color:6187125,roughness:.86,metalness:.14,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:wt}),c=new Ut({color:8293530,roughness:.8,metalness:.26,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:wt}),l=[r,o,a,c];for(let h=0;h<t;h++){let u,f;h<20?(u=75+e()*65,f=4):h<65?(u=42+e()*33,f=3):(u=22+e()*20,f=3);let m=oy(new xi(u,f));const g=m.attributes.position,v=new U,p=.82+e()*.4,d=.78+e()*.44,_=.82+e()*.4,x=e()*Math.PI*2,y=e()*Math.PI*2,A=e()*Math.PI*2,b=Math.floor(4+e()*3),R=[];for(let N=0;N<b;N++){const P=e()*Math.PI*2,z=Math.acos(2*e()-1);R.push({dir:new U(Math.sin(z)*Math.cos(P),Math.sin(z)*Math.sin(P),Math.cos(z)),depth:.16+e()*.16,radiusCos:.78+e()*.14})}for(let N=0;N<g.count;N++){v.fromBufferAttribute(g,N);const P=v.clone().normalize(),z=.1*Math.sin(P.x*3.2+x)*Math.cos(P.y*3.2+y)+.08*Math.sin(P.z*3.8+A),k=.05*Math.sin(P.x*6.5-P.z*5.2)*Math.cos(P.y*6.1),O=.025*Math.sin(P.y*12+P.x*10.5)*Math.sin(P.z*11.8),B=z+k+O;let Z=0;for(let Me=0;Me<R.length;Me++){const X=R[Me],Q=P.dot(X.dir);if(Q>X.radiusCos){const le=(Q-X.radiusCos)/(1-X.radiusCos);Z-=X.depth*Math.cos(le*(Math.PI/2))}else if(Q>X.radiusCos-.12){const le=(Q-(X.radiusCos-.12))/.12;Z+=.35*X.depth*Math.sin(le*Math.PI)}}const ce=Math.max(.6,1+B+Z);v.copy(P).multiplyScalar(u*ce),v.x*=p,v.y*=d,v.z*=_,g.setXYZ(N,v.x,v.y,v.z)}m.computeVertexNormals();const D=l[Math.floor(e()*l.length)],w=new xe(m,D);let M=0,I=0,H=0;if(h<12)M=(e()-.5)*180,I=(e()-.5)*90,H=60-e()*320;else{let N=!1,P=0;for(;!N&&P<50;){P++,M=(e()-.5)*n*2,I=(e()-.5)*(n*.7),H=(e()-.5)*n*2;const z=Math.hypot(M-0,I-0,H-180),k=Math.hypot(M,I,H);z>u+50&&k<n&&(N=!0)}}w.position.set(M,I,H),w.rotation.set(e()*Math.PI,e()*Math.PI,e()*Math.PI),this.asteroidGroup.add(w);const S=4/3*Math.PI*Math.pow(u,3)*.001,L=new U((e()-.5)*4,(e()-.5)*2.2,(e()-.5)*4);this.asteroids.push({mesh:w,radius:u,mass:S,position:w.position,velocity:L,rotationSpeed:new U((e()-.5)*.08,(e()-.5)*.08,(e()-.5)*.08),boundingSphere:new qs(w.position,u*1.05)})}this.scene.add(this.asteroidGroup)}triggerCombatFlash(e,t=16737792,n=4){this.combatFlashLight&&(this.combatFlashLight.position.copy(e),this.combatFlashLight.color.setHex(t),this.combatFlashLight.intensity=n)}update(e,t,n){for(let o=this.debrisList.length-1;o>=0;o--){const a=this.debrisList[o];if(a.life-=e,a.life<=0){this.scene.remove(a.mesh),this.debrisList.splice(o,1);continue}a.mesh.position.addScaledVector(a.vel,e),a.mesh.rotation.x+=a.rot.x*e,a.mesh.rotation.y+=a.rot.y*e;const c=a.life/a.maxLife;a.mesh.scale.set(c,c,c)}this.combatFlashLight&&this.combatFlashLight.intensity>0&&(this.combatFlashLight.intensity=Math.max(0,this.combatFlashLight.intensity-e*6));const s=1e3,r=this.asteroids.length;for(let o=0;o<r;o++){const a=this.asteroids[o];if(a.position.addScaledVector(a.velocity,e),a.boundingSphere.center.copy(a.position),a.mesh.rotation.x+=a.rotationSpeed.x*e,a.mesh.rotation.y+=a.rotationSpeed.y*e,a.mesh.rotation.z+=a.rotationSpeed.z*e,a.position.length()>s){const l=a.position.clone().normalize().multiplyScalar(-6*e);a.velocity.add(l)}}for(let o=0;o<r;o++){const a=this.asteroids[o],c=a.position;for(let l=o+1;l<r;l++){const h=this.asteroids[l],u=h.position,f=c.x-u.x,m=c.y-u.y,g=c.z-u.z,v=f*f+m*m+g*g,p=a.radius+h.radius;if(v<p*p&&v>1e-4){const d=Math.sqrt(v),_=f/d,x=m/d,y=g/d,A=p-d,b=a.mass+h.mass,R=h.mass/b,D=a.mass/b;c.x+=_*A*R,c.y+=x*A*R,c.z+=y*A*R,u.x-=_*A*D,u.y-=x*A*D,u.z-=y*A*D;const w=a.velocity.x-h.velocity.x,M=a.velocity.y-h.velocity.y,I=a.velocity.z-h.velocity.z,H=w*_+M*x+I*y;if(H<0){const S=-1.65*H/(1/a.mass+1/h.mass);a.velocity.x+=S/a.mass*_,a.velocity.y+=S/a.mass*x,a.velocity.z+=S/a.mass*y,h.velocity.x-=S/h.mass*_,h.velocity.y-=S/h.mass*x,h.velocity.z-=S/h.mass*y}}}}}checkCollision(e,t=2.5){for(let n=0;n<this.asteroids.length;n++){const s=this.asteroids[n],r=e.distanceToSquared(s.position),o=s.radius+t;if(r<o*o)return s}return null}checkRayBlocked(e,t){const n=t.clone().sub(e),s=n.length();if(s<.001)return!1;const r=n.clone().divideScalar(s);for(let o=0;o<this.asteroids.length;o++){const a=this.asteroids[o],c=a.position.clone().sub(e),l=c.dot(r);if(l>0&&l<s){const h=c.lengthSq()-l*l,u=a.radius*.95;if(h<u*u)return!0}}return!1}checkRayCollision(e,t,n=750){let s=null,r=n;for(let o=0;o<this.asteroids.length;o++){const a=this.asteroids[o],c=a.position.clone().sub(e),l=c.dot(t);if(l<0)continue;const h=a.radius;if(l-h>r)continue;const u=c.lengthSq()-l*l;if(u>h*h)continue;const f=Math.sqrt(Math.max(0,h*h-u));let m=l-f;m<0&&(m=l+f),m>0&&m<r&&(r=m,s={asteroid:a,distance:m,hitPoint:e.clone().addScaledVector(t,m)})}return s}resolveShipCollision(e,t,n=2.8,s=1200){for(let r=0;r<this.asteroids.length;r++){const o=this.asteroids[r],a=e.distanceTo(o.position),c=o.radius+n;if(a<c){const l=e.clone().sub(o.position);l.lengthSq()<1e-4?l.set(0,1,0):l.normalize(),e.copy(o.position).addScaledVector(l,c+.3);const u=t.clone().sub(o.velocity).dot(l);if(u<0){const f=-1.85*u*s;t.addScaledVector(l,f/s),o.velocity.addScaledVector(l,-(f/o.mass));const m=Math.abs(u),g=Math.round(Math.min(45,Math.max(10,m*.75)));return{asteroid:o,normal:l,impactDamage:g,impactSpeed:m}}}}return null}spawnRockDebris(e,t,n=8){const s=new js(.85,0),r=new Ut({color:5923437,roughness:.9,metalness:.1});for(let o=0;o<n;o++){if(this.debrisList.length>60){const u=this.debrisList.shift();this.scene.remove(u.mesh)}const a=new xe(s,r);a.position.copy(e),this.scene.add(a);const c=new U((Math.random()-.5)*35,(Math.random()-.5)*35,(Math.random()-.5)*35),l=t.clone().multiplyScalar(-18).add(c),h=.5+Math.random()*.4;this.debrisList.push({mesh:a,vel:l,rot:new U(Math.random()*8,Math.random()*8,Math.random()*8),life:h,maxLife:h})}}carveAsteroid(e,t,n,s=22,r=16){if(!e||!e.mesh)return;const o=e.mesh.geometry,a=o.attributes.position;if(!a)return;const c=e.mesh.matrixWorld.clone().invert(),l=t.clone().applyMatrix4(c),h=n.clone().transformDirection(c).normalize(),u=new U;let f=0;for(let m=0;m<a.count;m++){u.fromBufferAttribute(a,m);const g=u.distanceTo(l);if(g<s){const v=1-Math.pow(g/s,1.4),p=r*v;u.addScaledVector(h,p),a.setXYZ(m,u.x,u.y,u.z),f++}}f>0&&(a.needsUpdate=!0,o.computeVertexNormals(),o.computeBoundingSphere(),o.boundingSphere&&(e.boundingSphere.radius=Math.max(10,o.boundingSphere.radius))),this.spawnRockDebris(t,n)}}class uy{constructor(e){this.camera=e,this.group=new Tt,this.camera.add(this.group),this.targetOffset=new U,this.currentOffset=new U,this.targetRotation=new Qt,this.currentRotation=new Qt,this.shieldGlassMat=null,this.damageFlashTimer=0,this.boostKickZ=0,this.accentMaterials=[],this.consoleWarningMat=null,this.createCockpitModel()}createCockpitModel(){const e=new Ut({color:1119776,roughness:.35,metalness:.9,flatShading:!0}),t=new Ut({color:1975344,roughness:.45,metalness:.8,flatShading:!0}),n=new Ye({color:54527});this.accentMaterials.push(n);const s=new Ye({color:16755200});this.accentMaterials.push(s),this.consoleWarningMat=new Ye({color:65416});const r=new Et(.5,.14,.35),o=new xe(r,e);o.position.set(0,-.58,-.55),o.rotation.x=.55,this.group.add(o);const a=new Et(.48,.12,.32),c=new xe(a,e);c.position.set(-.52,-.59,-.52),c.rotation.set(.5,.28,-.12),this.group.add(c);const l=new Et(.48,.12,.32),h=new xe(l,e);h.position.set(.52,-.59,-.52),h.rotation.set(.5,-.28,.12),this.group.add(h);const u=new $s(.18,.08),f=new xe(u,new Ye({color:6180}));f.position.set(-.5,-.53,-.47),f.rotation.set(.5,.28,-.12),this.group.add(f);const m=new xe(u,new Ye({color:2102272}));m.position.set(.5,-.53,-.47),m.rotation.set(.5,-.28,.12),this.group.add(m);const g=new Wt(.003,.003,1.4,6);g.rotateZ(Math.PI/2);const v=new xe(g,n);v.position.set(0,-.54,-.48),v.rotation.x=.5,this.group.add(v);const p=new Et(.024,1.15,.035),d=new xe(p,e);d.position.set(-.92,.16,-.48),d.rotation.set(-.12,.12,.52),this.group.add(d);const _=d.clone();_.position.set(.92,.16,-.48),_.rotation.set(-.12,-.12,-.52),this.group.add(_);const x=new Et(1.6,.03,.14),y=new xe(x,e);y.position.set(0,.72,-.52),y.rotation.x=-.22,this.group.add(y);const A=new pn(.82,16,12,0,Math.PI*2,0,Math.PI*.46);this.shieldGlassMat=new Ye({color:57855,transparent:!0,opacity:.025,side:Pt,blending:rt,depthWrite:!1});const b=new xe(A,this.shieldGlassMat);b.position.set(0,0,.08),this.group.add(b),this.createCompactCannon(-.72,-.44,-.65,e,t,n),this.createCompactCannon(.72,-.44,-.65,e,t,n)}createCompactCannon(e,t,n,s,r,o){const a=new Tt;a.position.set(e,t,n);const c=new Wt(.018,.022,.55,8);c.rotateX(Math.PI/2);const l=new xe(c,r);l.position.set(0,0,-.22),a.add(l);const h=new Mi(.024,.004,6,12),u=new xe(h,o);u.position.set(0,0,-.48),a.add(u),this.group.add(a)}triggerDamageFlash(){this.damageFlashTimer=.38}triggerBoostFlash(){this.boostKickZ=-.06,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(65535),this.shieldGlassMat.opacity=.2)}update(e,t,n){this.boostKickZ||(this.boostKickZ=0),this.boostKickZ+=(0-this.boostKickZ)*e*9;const s=(t.thrust?.016:t.brake?-.016:0)+this.boostKickZ,r=t.strafe*.02,o=t.pitch*.012,a=t.roll*.018;this.targetOffset.set(-r,-o,s),this.targetRotation.set(-o*1.4,-r*1.1,-a),this.currentOffset.lerp(this.targetOffset,e*10),this.currentRotation.x+=(this.targetRotation.x-this.currentRotation.x)*e*10,this.currentRotation.y+=(this.targetRotation.y-this.currentRotation.y)*e*10,this.currentRotation.z+=(this.targetRotation.z-this.currentRotation.z)*e*10,this.group.position.copy(this.currentOffset),this.group.rotation.copy(this.currentRotation),this.damageFlashTimer>0?(this.damageFlashTimer-=e,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(16720452),this.shieldGlassMat.opacity=Math.max(.03,this.damageFlashTimer*.9))):this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(57855),this.shieldGlassMat.opacity=.025)}}class dy{constructor(e,t){this.camera=e,this.spaceEnv=t,this.position=new U(0,0,100),this.velocity=new U(0,0,0),this.quaternion=new Zt,this.maxSpeed=90,this.forwardAccel=45,this.decelRate=this.maxSpeed/2*3,this.strafeAccel=40,this.maxStrafeSpeed=35,this.boostCooldown=2,this.boostCooldownTimer=0,this.lastThrustTapTime=0,this.boostImpulse=180,this.pitchSpeed=1.6,this.yawSpeed=1.6,this.rollSpeed=2,this.maxHp=100,this.hp=100,this.maxShield=100,this.shield=100,this.isShieldBroken=!1,this.shieldRechargeDelay=2,this.shieldRechargeTimer=0,this.shieldRechargeRate=100/15,this.mass=1200,this.isInvisible=!1,this.invisibilityTimer=0,this.hasHologramDecoy=!1,this.storedPowerUp=null,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.score=0,this.kills=0,this.deaths=0,this.input={thrust:!1,brake:!1,strafeLeft:!1,strafeRight:!1,pitchUp:!1,pitchDown:!1,yawLeft:!1,yawRight:!1,rollLeft:!1,rollRight:!1,analogPitch:0,analogYaw:0,analogRoll:0},this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}resetSpawn(){this.position.set(0,0,180),this.velocity.set(0,0,0),this.quaternion.set(0,0,0,1),this.hp=this.maxHp,this.shield=this.maxShield,this.isShieldBroken=!1,this.shieldRechargeTimer=0,this.boostCooldownTimer=0,this.lastThrustTapTime=0,this.isInvisible=!1,this.invisibilityTimer=0,this.hasHologramDecoy=!1,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}takeDamage(e,t="generic",n=!1){if(typeof t=="boolean"&&(n=t,t="generic"),this.isDead||!n&&this.invulnerableTimer>0)return!1;this.shieldRechargeTimer=this.shieldRechargeDelay;let s=e,r=e;if(t==="laser"?(s=e*2.4,r=e*.35):(t==="cannon"||t==="missile")&&(s=e*.35,r=e*2.2),this.shield>0){const o=Math.min(this.shield,s);this.shield-=o,this.shield<=0&&(this.shield=0,this.isShieldBroken=!0);const a=1-o/(s||1);a>.01&&(this.hp=Math.max(0,this.hp-r*a))}else this.hp=Math.max(0,this.hp-r);return this.hp<=0?(this.isDead=!0,this.deaths++,this.respawnTimer=3,!0):!1}recordKill(){this.kills++,this.score+=100}triggerThrustPress(e=performance.now()){const t=e-this.lastThrustTapTime;return this.lastThrustTapTime=e,t>=40&&t<=380&&this.boostCooldownTimer<=0&&!this.isDead?this.activateBoost():!1}useSpecialPowerUp(e){if(!this.storedPowerUp||this.isDead)return null;const t=this.storedPowerUp;return this.storedPowerUp=null,t.type==="shield_repair"?(this.shield=this.maxShield,this.isShieldBroken=!1,{success:!0,message:"🛡️ SHIELD REPAIRED: 100%"}):t.type==="invisibility"?(this.isInvisible=!0,this.invisibilityTimer=60,{success:!0,message:"👁️ CLOAK ACTIVATED (60s)"}):t.type==="hologram_clone"?(e&&e.weaponsSystem&&e.weaponsSystem.deployDecoyClone(this),{success:!0,message:"👥 HOLOGRAM CLONE LAUNCHED"}):null}breakInvisibility(){this.isInvisible=!1,this.invisibilityTimer=0}activateBoost(){this.boostCooldownTimer=this.boostCooldown;const e=this.getForwardVector();this.velocity.addScaledVector(e,this.boostImpulse);const t=this.maxSpeed*3;return this.velocity.length()>t&&this.velocity.setLength(t),!0}applyImpulse(e){this.velocity.add(e),this.velocity.length()>this.maxSpeed*1.35&&this.velocity.setLength(this.maxSpeed*1.35)}update(e){if(this.invulnerableTimer>0&&(this.invulnerableTimer=Math.max(0,this.invulnerableTimer-e)),this.boostCooldownTimer>0&&(this.boostCooldownTimer=Math.max(0,this.boostCooldownTimer-e)),this.invisibilityTimer>0&&(this.invisibilityTimer=Math.max(0,this.invisibilityTimer-e),this.invisibilityTimer<=0&&(this.isInvisible=!1)),this.isDead){this.respawnTimer-=e,this.respawnTimer<=0&&this.resetSpawn();return}!this.isShieldBroken&&this.shield<this.maxShield&&(this.shieldRechargeTimer>0?this.shieldRechargeTimer-=e:this.shield=Math.min(this.maxShield,this.shield+this.shieldRechargeRate*e)),(isNaN(this.position.x)||isNaN(this.position.y)||isNaN(this.position.z))&&(this.position.set(0,0,180),this.velocity.set(0,0,0)),(isNaN(this.velocity.x)||isNaN(this.velocity.y)||isNaN(this.velocity.z))&&this.velocity.set(0,0,0),(isNaN(this.quaternion.x)||isNaN(this.quaternion.w))&&this.quaternion.set(0,0,0,1),this.handleRotation(e),this.handleThrustAndMovement(e),this.handleAsteroidCollisions(),this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}handleRotation(e){let t=0;this.input.pitchUp&&(t+=1),this.input.pitchDown&&(t-=1),t+=this.input.analogPitch,t=jo(t,-1,1);let n=0;this.input.yawLeft&&(n+=1),this.input.yawRight&&(n-=1),n+=this.input.analogYaw,n=jo(n,-1,1);let s=0;this.input.rollLeft&&(s+=1),this.input.rollRight&&(s-=1),s+=this.input.analogRoll,s=jo(s,-1,1);const r=new U(1,0,0),o=new U(0,1,0),a=new U(0,0,1);if(t!==0){const c=new Zt().setFromAxisAngle(r,t*this.pitchSpeed*e);this.quaternion.multiply(c)}if(n!==0){const c=new Zt().setFromAxisAngle(o,n*this.yawSpeed*e);this.quaternion.multiply(c)}if(s!==0){const c=new Zt().setFromAxisAngle(a,s*this.rollSpeed*e);this.quaternion.multiply(c)}this.quaternion.normalize()}handleThrustAndMovement(e){const t=new U(0,0,-1).applyQuaternion(this.quaternion).normalize(),n=new U(1,0,0).applyQuaternion(this.quaternion).normalize();if(this.input.thrust&&(this.velocity.addScaledVector(t,this.forwardAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.input.brake){const o=this.velocity.length();if(o>.001){const a=this.decelRate*e,c=Math.max(0,o-a);c===0?this.velocity.set(0,0,0):this.velocity.setLength(c)}else this.velocity.set(0,0,0)}let s=0;if(this.input.strafeLeft&&(s-=1),this.input.strafeRight&&(s+=1),s!==0&&(this.velocity.addScaledVector(n,s*this.strafeAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.position.addScaledVector(this.velocity,e),this.position.length()>1100){const o=this.position.clone().normalize().multiplyScalar(-30*e);this.velocity.add(o)}}handleAsteroidCollisions(){if(this.spaceEnv&&typeof this.spaceEnv.resolveShipCollision=="function"){const t=this.spaceEnv.resolveShipCollision(this.position,this.velocity,2.8,this.mass);if(t)return this.takeDamage(t.impactDamage),t}else if(this.spaceEnv&&typeof this.spaceEnv.checkCollision=="function"){const t=this.spaceEnv.checkCollision(this.position,2.8);if(t){const n=this.position.clone().sub(t.position);n.lengthSq()<.001?n.set(0,1,0):n.normalize(),this.position.copy(t.position).addScaledVector(n,t.radius+2.8+.4);const s=this.velocity.dot(n);s<0&&this.velocity.subScaledVector(n,1.8*s),this.takeDamage(15)}}}getForwardVector(){return new U(0,0,-1).applyQuaternion(this.quaternion).normalize()}getRightVector(){return new U(1,0,0).applyQuaternion(this.quaternion).normalize()}getSpeed(){return this.velocity.length()}}class fy{constructor(){this.ctx=null,this.masterGain=null,this.compressor=null,this.isMuted=!1,this.isUnlocked=!1,this.engineGain=null,this.engineFilter=null,this.engineOsc1=null,this.engineOsc2=null,this.engineNoiseNode=null,this.currentEngineVol=0,this.brakeGain=null,this.brakeFilter=null,this.brakeNoiseNode=null,this.currentBrakeVol=0,this.noiseBuffer=null,this.init()}init(){if(typeof window>"u")return;const e=window.AudioContext||window.webkitAudioContext;if(e)try{this.ctx=new e,this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.threshold.setValueAtTime(-12,this.ctx.currentTime),this.compressor.knee.setValueAtTime(8,this.ctx.currentTime),this.compressor.ratio.setValueAtTime(4,this.ctx.currentTime),this.compressor.attack.setValueAtTime(.005,this.ctx.currentTime),this.compressor.release.setValueAtTime(.08,this.ctx.currentTime),this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(.85,this.ctx.currentTime),this.compressor.connect(this.masterGain),this.masterGain.connect(this.ctx.destination),this.generateNoiseBuffer(),this.initEngineSynth(),this.initBrakeSynth(),this.setupAutoUnlock()}catch(t){console.warn("AudioContext initialization failed:",t)}}setupAutoUnlock(){if(!this.ctx)return;const e=()=>{this.ctx&&this.ctx.state==="suspended"?this.ctx.resume().then(()=>{this.isUnlocked=!0}).catch(()=>{}):this.isUnlocked=!0,window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e),window.removeEventListener("touchstart",e)};window.addEventListener("pointerdown",e,{passive:!0,once:!0}),window.addEventListener("keydown",e,{passive:!0,once:!0}),window.addEventListener("touchstart",e,{passive:!0,once:!0})}updateListener(e){if(!(!this.ctx||!this.ctx.listener||!e))try{const t=this.ctx.listener,n=this.ctx.currentTime,s=e.position,r=new U(0,0,-1).applyQuaternion(e.quaternion),o=new U(0,1,0).applyQuaternion(e.quaternion);t.positionX?(t.positionX.setValueAtTime(s.x,n),t.positionY.setValueAtTime(s.y,n),t.positionZ.setValueAtTime(s.z,n),t.forwardX.setValueAtTime(r.x,n),t.forwardY.setValueAtTime(r.y,n),t.forwardZ.setValueAtTime(r.z,n),t.upX.setValueAtTime(o.x,n),t.upY.setValueAtTime(o.y,n),t.upZ.setValueAtTime(o.z,n)):t.setPosition&&(t.setPosition(s.x,s.y,s.z),t.setOrientation(r.x,r.y,r.z,o.x,o.y,o.z))}catch{}}createPanner(e){if(!this.ctx||!e)return null;try{const t=this.ctx.createPanner();t.panningModel="HRTF",t.distanceModel="inverse",t.refDistance=35,t.maxDistance=2500,t.rolloffFactor=1.15,t.coneInnerAngle=360;const n=this.ctx.currentTime;return t.positionX?(t.positionX.setValueAtTime(e.x,n),t.positionY.setValueAtTime(e.y,n),t.positionZ.setValueAtTime(e.z,n)):t.setPosition&&t.setPosition(e.x,e.y,e.z),t.connect(this.compressor),t}catch{return null}}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}generateNoiseBuffer(){if(!this.ctx)return;const e=this.ctx.sampleRate*2;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const t=this.noiseBuffer.getChannelData(0);for(let n=0;n<e;n++)t[n]=Math.random()*2-1}initEngineSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.engineOsc1=this.ctx.createOscillator(),this.engineOsc1.type="sawtooth",this.engineOsc1.frequency.setValueAtTime(55,this.ctx.currentTime),this.engineOsc2=this.ctx.createOscillator(),this.engineOsc2.type="triangle",this.engineOsc2.frequency.setValueAtTime(110,this.ctx.currentTime),this.engineNoiseNode=this.ctx.createBufferSource(),this.engineNoiseNode.buffer=this.noiseBuffer,this.engineNoiseNode.loop=!0,this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.setValueAtTime(120,this.ctx.currentTime),this.engineFilter.Q.setValueAtTime(3,this.ctx.currentTime),this.engineGain=this.ctx.createGain(),this.engineGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.engineOsc1.connect(this.engineFilter),this.engineOsc2.connect(this.engineFilter),this.engineNoiseNode.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineGain.connect(this.compressor);try{this.engineOsc1.start(),this.engineOsc2.start(),this.engineNoiseNode.start()}catch{}}}initBrakeSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.brakeNoiseNode=this.ctx.createBufferSource(),this.brakeNoiseNode.buffer=this.noiseBuffer,this.brakeNoiseNode.loop=!0,this.brakeFilter=this.ctx.createBiquadFilter(),this.brakeFilter.type="bandpass",this.brakeFilter.frequency.setValueAtTime(1400,this.ctx.currentTime),this.brakeFilter.Q.setValueAtTime(2.5,this.ctx.currentTime),this.brakeGain=this.ctx.createGain(),this.brakeGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.brakeNoiseNode.connect(this.brakeFilter),this.brakeFilter.connect(this.brakeGain),this.brakeGain.connect(this.compressor);try{this.brakeNoiseNode.start()}catch{}}}updateEngine(e,t,n){if(!this.ctx||!this.engineGain||!this.brakeGain)return;this.resume();const s=e?.38:0,r=e?460:120;this.currentEngineVol+=(s-this.currentEngineVol)*Math.min(1,n*10);const o=this.ctx.currentTime;this.engineGain.gain.setTargetAtTime(Math.max(1e-4,this.currentEngineVol),o,.05),this.engineFilter.frequency.setTargetAtTime(r,o,.08);const a=t?.32:0;this.currentBrakeVol+=(a-this.currentBrakeVol)*Math.min(1,n*12),this.brakeGain.gain.setTargetAtTime(Math.max(1e-4,this.currentBrakeVol),o,.04)}playLockTick(e=0){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="sine";const r=750+e*800;n.frequency.setValueAtTime(r,t),s.gain.setValueAtTime(.18,t),s.gain.exponentialRampToValueAtTime(.001,t+.06),n.connect(s),s.connect(this.compressor),n.start(t),n.stop(t+.07)}playLockChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),s=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(1760,e),t.frequency.setValueAtTime(2200,e+.08),n.type="sine",n.frequency.setValueAtTime(880,e),n.frequency.setValueAtTime(1100,e+.08),s.gain.setValueAtTime(.28,e),s.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(s),n.connect(s),s.connect(this.compressor),t.start(e),t.stop(e+.24),n.start(e),n.stop(e+.24)}playMissileLaunch(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor;if(this.noiseBuffer){const a=this.ctx.createBufferSource();a.buffer=this.noiseBuffer;const c=this.ctx.createBiquadFilter();c.type="bandpass",c.frequency.setValueAtTime(800,n),c.frequency.exponentialRampToValueAtTime(2400,n+.25),c.Q.setValueAtTime(2,n);const l=this.ctx.createGain();l.gain.setValueAtTime(.45,n),l.gain.exponentialRampToValueAtTime(.001,n+.35),a.connect(c),c.connect(l),l.connect(s),a.start(n),a.stop(n+.36)}const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sawtooth",r.frequency.setValueAtTime(220,n),r.frequency.exponentialRampToValueAtTime(980,n+.28),o.gain.setValueAtTime(.35,n),o.gain.exponentialRampToValueAtTime(.001,n+.3),r.connect(o),o.connect(s),r.start(n),r.stop(n+.32)}playLaserShot(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type="sawtooth",r.frequency.setValueAtTime(e?1650:1200,n),r.frequency.exponentialRampToValueAtTime(140,n+.18),a.type="bandpass",a.frequency.setValueAtTime(3200,n),a.frequency.exponentialRampToValueAtTime(450,n+.18),a.Q.setValueAtTime(4,n);const c=e?.42:.26;o.gain.setValueAtTime(c,n),o.gain.exponentialRampToValueAtTime(.001,n+.19),r.connect(a),a.connect(o),o.connect(s),r.start(n),r.stop(n+.2)}playDecoyDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(440,e),t.frequency.linearRampToValueAtTime(1100,e+.15),t.frequency.linearRampToValueAtTime(880,e+.35),n.gain.setValueAtTime(.28,e),n.gain.exponentialRampToValueAtTime(.001,e+.4),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.42)}playCannonShot(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type=e?"sawtooth":"sine";const c=e?920:680,l=e?110:90;r.frequency.setValueAtTime(c,n),r.frequency.exponentialRampToValueAtTime(l,n+.08),a.type="lowpass",a.frequency.setValueAtTime(2800,n),a.frequency.exponentialRampToValueAtTime(400,n+.09);const h=e?.36:.22;o.gain.setValueAtTime(h,n),o.gain.exponentialRampToValueAtTime(.001,n+.095),r.connect(a),a.connect(o),o.connect(s),r.start(n),r.stop(n+.1)}playMineDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(60,e+.12),n.gain.setValueAtTime(.35,e),n.gain.exponentialRampToValueAtTime(.001,e+.13),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.14);const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(1250,e+.06),s.frequency.setValueAtTime(1750,e+.14),r.gain.setValueAtTime(1e-4,e),r.gain.setValueAtTime(.22,e+.06),r.gain.setValueAtTime(.25,e+.14),r.gain.exponentialRampToValueAtTime(.001,e+.28),s.connect(r),r.connect(this.compressor),s.start(e+.05),s.stop(e+.3)}playExplosion(e=1,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(140,n),r.frequency.exponentialRampToValueAtTime(28,n+.7*e);const a=Math.min(.7,.45*e);if(o.gain.setValueAtTime(a,n),o.gain.exponentialRampToValueAtTime(.001,n+.75*e),r.connect(o),o.connect(s),r.start(n),r.stop(n+.8*e),this.noiseBuffer){const c=this.ctx.createBufferSource();c.buffer=this.noiseBuffer;const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(900,n),l.frequency.exponentialRampToValueAtTime(80,n+.6*e);const h=this.ctx.createGain();h.gain.setValueAtTime(.5*e,n),h.gain.exponentialRampToValueAtTime(.001,n+.65*e),c.connect(l),l.connect(h),h.connect(s),c.start(n),c.stop(n+.7*e)}}playDamageHit(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(70,e+.16),n.gain.setValueAtTime(.42,e),n.gain.exponentialRampToValueAtTime(.001,e+.18),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.2)}playScoreChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(880,e),t.frequency.setValueAtTime(1320,e+.08),n.gain.setValueAtTime(.25,e),n.gain.exponentialRampToValueAtTime(.001,e+.35),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.36)}playStrafeBurst(){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1600,e),n.Q.setValueAtTime(2,e);const s=this.ctx.createGain();s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(n),n.connect(s),s.connect(this.compressor),t.start(e),t.stop(e+.13)}playEngagementBeacon(e=null){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,n=this.createPanner(e)||this.compressor,s=this.ctx.createOscillator(),r=this.ctx.createGain(),o=this.ctx.createBiquadFilter();s.type="sine",s.frequency.setValueAtTime(1480,t),s.frequency.exponentialRampToValueAtTime(520,t+.45),o.type="bandpass",o.frequency.setValueAtTime(1200,t),o.Q.setValueAtTime(4,t),r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(.38,t+.04),r.gain.exponentialRampToValueAtTime(.001,t+.95),s.connect(o),o.connect(r),r.connect(n),s.start(t),s.stop(t+1)}playMeteorFlyby(e=null){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const t=this.ctx.currentTime,n=this.createPanner(e)||this.compressor,s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(180,t),r.frequency.exponentialRampToValueAtTime(680,t+.35),r.frequency.exponentialRampToValueAtTime(120,t+1.1),r.Q.setValueAtTime(1.8,t);const o=this.ctx.createGain();o.gain.setValueAtTime(.001,t),o.gain.linearRampToValueAtTime(.55,t+.35),o.gain.exponentialRampToValueAtTime(.001,t+1.15),s.connect(r),r.connect(o),o.connect(n),s.start(t),s.stop(t+1.2)}playBoost(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();if(t.type="sine",t.frequency.setValueAtTime(220,e),t.frequency.exponentialRampToValueAtTime(45,e+.28),n.gain.setValueAtTime(.55,e),n.gain.exponentialRampToValueAtTime(.001,e+.3),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.32),this.noiseBuffer){const s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(320,e),r.frequency.exponentialRampToValueAtTime(1400,e+.12),r.frequency.exponentialRampToValueAtTime(250,e+.35),r.Q.setValueAtTime(2.2,e);const o=this.ctx.createGain();o.gain.setValueAtTime(.48,e),o.gain.exponentialRampToValueAtTime(.001,e+.36),s.connect(r),r.connect(o),o.connect(this.compressor),s.start(e),s.stop(e+.38)}}}const ct=new fy;class py{constructor(){this.logs=[],this.maxLogs=500,this.engineRef=null,this.startTime=Date.now(),this.webglInfo=null,this.lastFps=0,this.frameCount=0,this.fpsTimer=performance.now(),this.interceptConsole(),this.listenToErrors()}setEngine(e){if(this.engineRef=e,e&&e.renderer)try{const t=e.renderer.getContext(),n=t.getExtension("WEBGL_debug_renderer_info");this.webglInfo={renderer:n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER),vendor:n?t.getParameter(n.UNMASKED_VENDOR_WEBGL):t.getParameter(t.VENDOR),version:t.getParameter(t.VERSION),shadingLanguageVersion:t.getParameter(t.SHADING_LANGUAGE_VERSION),maxTextureSize:t.getParameter(t.MAX_TEXTURE_SIZE)},this.log("SYS",`WebGL Initialized: ${this.webglInfo.renderer}`)}catch(t){this.log("SYS",`WebGL info inspection error: ${t.message}`)}}interceptConsole(){const e=console.log.bind(console),t=console.warn.bind(console),n=console.error.bind(console);console.log=(...s)=>{this.log("LOG",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),e(...s)},console.warn=(...s)=>{this.log("WARN",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),t(...s)},console.error=(...s)=>{this.log("ERROR",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),n(...s)}}listenToErrors(){window.addEventListener("error",e=>{this.log("UNCAUGHT",`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`)}),window.addEventListener("unhandledrejection",e=>{var t;this.log("REJECTION",`${((t=e.reason)==null?void 0:t.message)||e.reason}`)})}log(e,t){const s=`[${((Date.now()-this.startTime)/1e3).toFixed(2)}s][${e}] ${t}`;this.logs.push(s),this.logs.length>this.maxLogs&&this.logs.shift()}recordFrame(){this.frameCount++;const e=performance.now();e-this.fpsTimer>=1e3&&(this.lastFps=Math.round(this.frameCount*1e3/(e-this.fpsTimer)),this.frameCount=0,this.fpsTimer=e)}generateDiagnosticReport(){var n,s,r,o,a,c,l,h,u,f,m,g;const e=[];if(e.push("================ ROCKETS CLIENT DIAGNOSTICS ================"),e.push(`Timestamp: ${new Date().toISOString()}`),e.push(`User Agent: ${navigator.userAgent}`),e.push(`Screen Resolution: ${window.screen.width}x${window.screen.height} (Pixel Ratio: ${window.devicePixelRatio})`),e.push(`Window Inner Size: ${window.innerWidth}x${window.innerHeight}`),e.push(`Orientation: ${((n=screen.orientation)==null?void 0:n.type)||"unknown"}`),e.push(`Touch Supported: ${"ontouchstart"in window||navigator.maxTouchPoints>0} (Max Points: ${navigator.maxTouchPoints})`),e.push(""),e.push("--- WebGL Environment ---"),this.webglInfo?(e.push(`Renderer: ${this.webglInfo.renderer}`),e.push(`Vendor: ${this.webglInfo.vendor}`),e.push(`WebGL Version: ${this.webglInfo.version}`),e.push(`Max Texture Size: ${this.webglInfo.maxTextureSize}`)):e.push("WebGL Info: Not yet captured or WebGL unavailable"),e.push(""),e.push("--- Engine & Simulation State ---"),this.engineRef){const v=this.engineRef;if(e.push(`Is Engine Running: ${v.isRunning}`),e.push(`Render FPS: ${this.lastFps}`),e.push(`Canvas Size: ${(r=(s=v.renderer)==null?void 0:s.domElement)==null?void 0:r.width}x${(a=(o=v.renderer)==null?void 0:o.domElement)==null?void 0:a.height}`),e.push(`Canvas Container Size: ${(c=v.container)==null?void 0:c.clientWidth}x${(l=v.container)==null?void 0:l.clientHeight}`),e.push(`Scene Children Count: ${((u=(h=v.scene)==null?void 0:h.children)==null?void 0:u.length)||0}`),e.push(`Asteroids Spawned: ${((m=(f=v.spaceEnv)==null?void 0:f.asteroids)==null?void 0:m.length)||0}`),v.playerShip){const p=v.playerShip;e.push(`Ship Position: (${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)}, ${p.position.z.toFixed(2)})`),e.push(`Ship Velocity: (${p.velocity.x.toFixed(2)}, ${p.velocity.y.toFixed(2)}, ${p.velocity.z.toFixed(2)}) [Speed: ${p.getSpeed().toFixed(1)}]`),e.push(`Ship Quaternion: (${p.quaternion.x.toFixed(3)}, ${p.quaternion.y.toFixed(3)}, ${p.quaternion.z.toFixed(3)}, ${p.quaternion.w.toFixed(3)})`),e.push(`Ship HP: ${p.hp}/${p.maxHp} (isDead: ${p.isDead}, invuln: ${p.invulnerableTimer.toFixed(1)})`),e.push(`Active Inputs: thrust=${p.input.thrust}, brake=${p.input.brake}, strafeL=${p.input.strafeLeft}, strafeR=${p.input.strafeRight}, analogPitch=${p.input.analogPitch.toFixed(2)}, analogYaw=${p.input.analogYaw.toFixed(2)}`)}v.network&&(e.push(`Network Self ID: ${v.network.selfId}`),e.push(`Network Room ID: ${v.network.roomId}`),e.push(`Network isMaster: ${v.network.isMaster}`),e.push(`Connected Peers: ${((g=v.network.peers)==null?void 0:g.size)||0}`))}else e.push("Engine Reference: None (Engine not attached)");e.push(""),e.push("--- Recent Event Stream (Last 50 Logs) ---");const t=this.logs.slice(-50);for(const v of t)e.push(v);return e.push("============================================================"),e.join(`
`)}async copyToClipboard(){const e=this.generateDiagnosticReport();if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(e),!0}catch{}return window.prompt("Copy diagnostic report below (Ctrl+C / Cmd+C):",e),!0}}const lt=new py;class my{constructor(e){this.scene=e,this.maxParticles=900,this.particles=[],this.geom=new xt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new mt(this.positions,3)),this.geom.setAttribute("color",new mt(this.colors,3)),this.material=new hs({size:4.8,vertexColors:!0,transparent:!0,opacity:.95,blending:rt,depthWrite:!1,sizeAttenuation:!0}),this.points=new Ys(this.geom,this.material),this.scene.add(this.points)}emit(e,t,n=2){for(let s=0;s<n&&!(this.particles.length>=this.maxParticles);s++){const r=new U((Math.random()-.5)*.45,(Math.random()-.5)*.45,(Math.random()-.5)*.45),o=e.clone().add(r),a=t.clone().multiplyScalar(-24).add(new U((Math.random()-.5)*9,(Math.random()-.5)*9,(Math.random()-.5)*9)),c=.32+Math.random()*.22;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}update(e){for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.life-=e,s.life<=0){this.particles.splice(n,1);continue}s.pos.addScaledVector(s.vel,e)}const t=this.particles.length;for(let n=0;n<t;n++){const s=this.particles[n],r=n*3;this.positions[r]=s.pos.x,this.positions[r+1]=s.pos.y,this.positions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.25)this.colors[r]=1,this.colors[r+1]=.98,this.colors[r+2]=.7;else if(o<.65)this.colors[r]=1,this.colors[r+1]=.55*(1-(o-.25)/.4),this.colors[r+2]=.05;else{const a=(1-o)/.35;this.colors[r]=.85*a,this.colors[r+1]=.15*a,this.colors[r+2]=.02*a}}for(let n=t;n<this.maxParticles;n++){const s=n*3;this.positions[s]=99999,this.positions[s+1]=99999,this.positions[s+2]=99999,this.colors[s]=0,this.colors[s+1]=0,this.colors[s+2]=0}this.geom.attributes.position.needsUpdate=!0,this.geom.attributes.color.needsUpdate=!0}cleanup(){this.points&&this.points.parent&&this.points.parent.remove(this.points),this.geom.dispose(),this.material.dispose()}}class gy{constructor({maxTurnRate:e=3.2,initialSpeed:t=85,maxSpeed:n=210,accel:s=50}={}){this.maxTurnRate=e,this.currentSpeed=t,this.maxSpeed=n,this.accel=s}steer(e,t,n,s){this.currentSpeed=Math.min(this.maxSpeed,this.currentSpeed+this.accel*e);const r=s.clone().sub(t),o=r.length();if(o<.001)return{newDir:n.clone(),speed:this.currentSpeed,dist:0};const a=r.clone().divideScalar(o),c=new Zt().setFromUnitVectors(new U(0,0,1),n),l=new Zt().setFromUnitVectors(new U(0,0,1),a),h=this.maxTurnRate*e,u=c.angleTo(l),f=u>1e-4?Math.min(1,h/u):1;return c.slerp(l,f),{newDir:new U(0,0,1).applyQuaternion(c).normalize(),speed:this.currentSpeed,dist:o}}}class vy{constructor(){this.lockRequiredTime=3,this.lockTimer=0,this.isLocked=!1,this.currentTargetId=null,this.lockTickTimer=0,this.maxLockDistance=650,this.lockConeDot=.86,this.targetScreenPos={x:0,y:0,visible:!1,dist:0}}update(e,t,n,s,r){if(t.isDead){this.reset();return}const o=t.getForwardVector();let a=null,c=this.lockConeDot,l=this.maxLockDistance;for(const[h,u]of n.entries()){if(!u||u.isDead||u.isInvisible)continue;const f=u.position.clone().sub(t.position),m=f.length();if(m>this.maxLockDistance)continue;const g=f.clone().divideScalar(m),v=o.dot(g);v>c&&(s&&typeof s.checkRayBlocked=="function"&&s.checkRayBlocked(t.position,u.position)||(c=v,l=m,a={id:h,remote:u,dist:m,dot:v}))}if(a){if(this.currentTargetId===a.id?(this.lockTimer=Math.min(this.lockRequiredTime,this.lockTimer+e),this.lockTickTimer+=e,this.lockTickTimer>=.38&&!this.isLocked&&(this.lockTickTimer=0,ct.playLockTick(this.lockTimer/this.lockRequiredTime)),this.lockTimer>=this.lockRequiredTime&&!this.isLocked&&(this.isLocked=!0,ct.playLockChime(),lt.log("WEAPON",`Missile lock ACQUIRED on target [${a.id.slice(0,5)}]`))):(this.currentTargetId=a.id,this.lockTimer=e,this.isLocked=this.lockTimer>=this.lockRequiredTime,this.lockTickTimer=0,ct.playLockTick(Math.min(1,this.lockTimer/this.lockRequiredTime))),r&&typeof r.project=="function")try{const h=a.remote.position.clone().project(r);this.targetScreenPos={x:(h.x*.5+.5)*100,y:(-(h.y*.5)+.5)*100,inFront:h.z<1,dist:Math.round(l),id:a.id}}catch{}}else this.lockTimer>0&&(this.lockTimer=Math.max(0,this.lockTimer-e*2.8)),this.lockTimer<=0&&this.reset(),this.targetScreenPos.visible=!1}consumeLock(){const e=this.currentTargetId;return this.reset(),e}reset(){this.lockTimer=0,this.isLocked=!1,this.currentTargetId=null,this.lockTickTimer=0,this.targetScreenPos={x:0,y:0,inFront:!1,dist:0}}getProgress(){return Math.min(1,this.lockTimer/this.lockRequiredTime)}}class _y{constructor(e,t,n){this.scene=e,this.spaceEnv=t,this.network=n,this.laserMaxEnergy=100,this.laserEnergy=100,this.laserShotCost=25,this.laserCooldownDelay=.7,this.laserCooldownTimer=0,this.laserRechargeRate=32,this.laserFireInterval=.25,this.laserLastFireTime=0,this.laserDamage=22,this.laserMaxRange=750,this.laserSpeed=480,this.lockSystem=new vy,this.missileDamage=55,this.missileFireCooldown=1,this.missileLastFireTime=0,this.cannonDamage=6,this.cannonSpeed=185,this.laserBeams=[],this.projectileLasers=[],this.missiles=[],this.projectiles=[],this.mines=[],this.explosions=[],this.decoys=[],this.fireTrails=new my(this.scene),this.initGeometriesAndMaterials(),this.listenToNetworkEvents()}initGeometriesAndMaterials(){this.laserCoreGeom=new Wt(.12,.12,1,8),this.laserCoreGeom.rotateX(Math.PI/2),this.laserGlowGeom=new Wt(.38,.38,1,8),this.laserGlowGeom.rotateX(Math.PI/2),this.localLaserCoreMat=new Ye({color:16777215,transparent:!0,opacity:.98,blending:rt}),this.localLaserGlowMat=new Ye({color:54527,transparent:!0,opacity:.85,blending:rt}),this.remoteLaserCoreMat=new Ye({color:16777215,transparent:!0,opacity:.98,blending:rt}),this.remoteLaserGlowMat=new Ye({color:16711782,transparent:!0,opacity:.85,blending:rt}),this.missileBodyGeom=new Wt(.3,.3,2.6,8),this.missileBodyGeom.rotateX(Math.PI/2),this.missileNoseGeom=new jn(.3,.9,8),this.missileNoseGeom.rotateX(-Math.PI/2),this.missileFinGeom=new Et(1.4,.05,.65),this.missileNozzleGeom=new Wt(.2,.28,.45,8),this.missileNozzleGeom.rotateX(Math.PI/2),this.missileBodyMat=new Ut({color:1975344,roughness:.35,metalness:.9,flatShading:!0}),this.missileNoseMat=new Ye({color:16724770}),this.missileFinMat=new Ut({color:3818580,roughness:.5}),this.missileNozzleMat=new Ye({color:16742144}),this.slugBodyGeom=new Wt(.24,.32,2,8),this.slugBodyGeom.rotateX(Math.PI/2),this.slugNoseGeom=new jn(.24,.9,8),this.slugNoseGeom.rotateX(-Math.PI/2),this.slugTailGeom=new Wt(.18,.28,.45,8),this.slugTailGeom.rotateX(Math.PI/2),this.slugBodyMat=new Ut({color:2371133,roughness:.35,metalness:.85}),this.localSlugNoseMat=new Ye({color:16763955}),this.remoteSlugNoseMat=new Ye({color:16724804}),this.slugThrusterMat=new Ye({color:16737792}),this.decoyMat=new Ye({color:65535,wireframe:!0,transparent:!0,opacity:.75,blending:rt}),this.mineGeom=new js(1.6,1),this.mineMat=new Ut({color:2236962,roughness:.3,metalness:.9,emissive:16716032,emissiveIntensity:.4})}listenToNetworkEvents(){this.network&&(typeof this.network.onLaser=="function"&&this.network.onLaser((e,t)=>{this.spawnRemoteLaserBeam(e,t)}),typeof this.network.onMissile=="function"&&this.network.onMissile((e,t)=>{this.spawnRemoteMissile(e,t)}),typeof this.network.onDecoy=="function"&&this.network.onDecoy((e,t)=>{this.spawnRemoteDecoy(e,t)}),typeof this.network.onCannon=="function"&&this.network.onCannon((e,t)=>{this.spawnRemoteLaserBeam(e,t)}),typeof this.network.onMine=="function"&&this.network.onMine((e,t)=>{this.spawnRemoteMine(e,t)}))}triggerPrimary(e,t,n){if(!e||t.isDead)return;typeof t.breakInvisibility=="function"&&t.breakInvisibility();const s=n>1e3?n*.001:n;if(this.laserEnergy>=this.laserShotCost&&s-this.laserLastFireTime>=this.laserFireInterval){this.laserLastFireTime=s,this.laserCooldownTimer=this.laserCooldownDelay,this.laserEnergy=Math.max(0,this.laserEnergy-this.laserShotCost);const r=t.getForwardVector(),o=t.getRightVector(),a=new U(0,1,0).applyQuaternion(t.quaternion),c=t.position.clone().addScaledVector(r,2.2).addScaledVector(o,-.72).addScaledVector(a,-.28),l=t.position.clone().addScaledVector(r,2.2).addScaledVector(o,.72).addScaledVector(a,-.28),h=t.position.clone().addScaledVector(r,2);let u=null,f=this.laserMaxRange,m=null,g=null;if(this.spaceEnv&&typeof this.spaceEnv.checkRayCollision=="function"){const p=this.spaceEnv.checkRayCollision(h,r,this.laserMaxRange);p&&(u=p.hitPoint,f=p.distance,m="asteroid",g=p.asteroid)}if(this.network&&this.network.peers)for(const[p,d]of this.network.peers.entries()){const _=d==null?void 0:d.lastState;if(!_||_.isDead||_.isInvisible)continue;const y=new U(_.pos.x,_.pos.y,_.pos.z).clone().sub(h),A=y.dot(r);A>0&&A<f&&y.lengthSq()-A*A<16&&(f=A,u=h.clone().addScaledVector(r,A),m="ship",g=p)}u||(u=h.clone().addScaledVector(r,this.laserMaxRange));const v=`laser-${this.network?this.network.selfId:"local"}-${Date.now()}`;this.spawnTwinLaserBeam(c,l,u,!0),ct.playLaserShot(!0),m==="asteroid"&&g?(this.spawnExplosion(u,6,54527),typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(g,u,r,20,14)):m==="ship"&&g&&(this.spawnExplosion(u,8,65535),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(g,this.laserDamage,"laser")),this.network&&typeof this.network.broadcastLaser=="function"&&this.network.broadcastLaser({id:v,leftOrigin:{x:c.x,y:c.y,z:c.z},rightOrigin:{x:l.x,y:l.y,z:l.z},hitPoint:{x:u.x,y:u.y,z:u.z},dir:{x:r.x,y:r.y,z:r.z},targetType:m,time:n})}}spawnTwinLaserBeam(e,t,n,s){const r=new Tt,o=s?this.localLaserCoreMat:this.remoteLaserCoreMat,a=s?this.localLaserGlowMat:this.remoteLaserGlowMat,c=e.distanceTo(n),l=e.clone().add(n).multiplyScalar(.5),h=new xe(this.laserCoreGeom,o);h.scale.set(1,1,c),h.position.copy(l),h.lookAt(n),r.add(h);const u=new xe(this.laserGlowGeom,a);u.scale.set(1,1,c),u.position.copy(l),u.lookAt(n),r.add(u);const f=t.distanceTo(n),m=t.clone().add(n).multiplyScalar(.5),g=new xe(this.laserCoreGeom,o);g.scale.set(1,1,f),g.position.copy(m),g.lookAt(n),r.add(g);const v=new xe(this.laserGlowGeom,a);v.scale.set(1,1,f),v.position.copy(m),v.lookAt(n),r.add(v),this.scene.add(r),this.laserBeams.push({group:r,life:.14,maxLife:.14,isLocal:s})}spawnRemoteLaserBeam(e,t){const n=e.leftOrigin?new U(e.leftOrigin.x,e.leftOrigin.y,e.leftOrigin.z):new U(e.origin.x,e.origin.y,e.origin.z),s=e.rightOrigin?new U(e.rightOrigin.x,e.rightOrigin.y,e.rightOrigin.z):n,r=e.hitPoint?new U(e.hitPoint.x,e.hitPoint.y,e.hitPoint.z):n.clone().add(new U(e.dir.x,e.dir.y,e.dir.z).multiplyScalar(500));this.spawnTwinLaserBeam(n,s,r,!1),ct.playLaserShot(!1,n),e.targetType==="asteroid"&&this.spawnExplosion(r,6,16711782)}triggerSecondary(e,t,n){if(!e||t.isDead||!this.lockSystem.isLocked||!this.lockSystem.currentTargetId)return!1;const s=n>1e3?n*.001:n;if(s-this.missileLastFireTime<this.missileFireCooldown)return!1;this.missileLastFireTime=s,typeof t.breakInvisibility=="function"&&t.breakInvisibility();const r=this.lockSystem.consumeLock(),o=t.getForwardVector(),a=t.position.clone().addScaledVector(o,3.5).add(new U(0,-.4,0)),c=`missile-${this.network?this.network.selfId:"local"}-${Date.now()}`;return this.spawnMissile(a,o,r,!0,c),ct.playMissileLaunch(!0),lt.log("WEAPON",`🚀 Homing Missile LAUNCHED tracking target [${r.slice(0,5)}]`),this.network&&typeof this.network.broadcastMissile=="function"&&this.network.broadcastMissile({id:c,origin:{x:a.x,y:a.y,z:a.z},dir:{x:o.x,y:o.y,z:o.z},targetPeerId:r,time:n}),!0}spawnMissile(e,t,n,s,r){const o=new Tt;o.position.copy(e),o.quaternion.setFromUnitVectors(new U(0,0,1),t);const a=new xe(this.missileBodyGeom,this.missileBodyMat);o.add(a);const c=new xe(this.missileNoseGeom,this.missileNoseMat);c.position.set(0,0,1.7),o.add(c);const l=new xe(this.missileFinGeom,this.missileFinMat);l.position.set(0,0,-.9),o.add(l);const h=new xe(this.missileFinGeom,this.missileFinMat);h.position.set(0,0,-.9),h.rotation.z=Math.PI/2,o.add(h);const u=new xe(this.missileNozzleGeom,this.missileNozzleMat);u.position.set(0,0,-1.5),o.add(u),this.scene.add(o),this.missiles.push({group:o,dir:t.clone().normalize(),guidance:new gy,targetId:n,isLocal:s,id:r,life:9})}spawnRemoteMissile(e,t){const n=new U(e.origin.x,e.origin.y,e.origin.z),s=new U(e.dir.x,e.dir.y,e.dir.z);this.spawnMissile(n,s,e.targetPeerId,!1,e.id),ct.playMissileLaunch(!1,n)}deployDecoyClone(e){const t=e.getForwardVector(),n=e.position.clone().addScaledVector(t,4),s=`decoy-${this.network?this.network.selfId:"local"}-${Date.now()}`;this.spawnDecoy(n,t,!0,s),ct.playDecoyDeploy(),lt.log("POWERUP","Hologram Decoy Clone deployed forward!"),this.network&&typeof this.network.broadcastDecoy=="function"&&this.network.broadcastDecoy({id:s,pos:{x:n.x,y:n.y,z:n.z},dir:{x:t.x,y:t.y,z:t.z},time:Date.now()})}spawnDecoy(e,t,n,s){const r=new Tt;r.position.copy(e),r.quaternion.setFromUnitVectors(new U(0,0,-1),t);const o=new jn(1.2,4,5);o.rotateX(-Math.PI/2);const a=new xe(o,this.decoyMat);r.add(a);const c=new Et(5,.08,1.8),l=new xe(c,this.decoyMat);l.position.set(0,0,.8),r.add(l);const h=new pn(.5,8,8),u=new Ye({color:65535,transparent:!0,opacity:.9,blending:rt}),f=new xe(h,u);f.position.set(0,0,2.2),r.add(f),this.scene.add(r),this.decoys.push({group:r,dir:t.clone().normalize(),speed:95,life:15,maxLife:15,isLocal:n,id:s})}spawnRemoteDecoy(e,t){const n=new U(e.pos.x,e.pos.y,e.pos.z),s=new U(e.dir.x,e.dir.y,e.dir.z);this.spawnDecoy(n,s,!1,e.id),ct.playDecoyDeploy()}spawnRemoteMine(e,t){const n=new U(e.pos.x,e.pos.y,e.pos.z),s=new xe(this.mineGeom,this.mineMat);s.position.copy(n),this.scene.add(s),this.mines.push({mesh:s,pos:n,life:3,id:e.id,isLocal:!1})}spawnExplosion(e,t=12,n=16737792){const s=new pn(t*.45,12,10),r=new Ye({color:n,transparent:!0,opacity:.92,blending:rt}),o=new xe(s,r);o.position.copy(e),this.scene.add(o),ct.playExplosion(t>15?1.6:.85,e),this.spaceEnv&&typeof this.spaceEnv.triggerCombatFlash=="function"&&this.spaceEnv.triggerCombatFlash(e,n,t>15?4.5:2.5),this.explosions.push({mesh:o,maxLife:.45,life:.45,maxRadius:t})}spawnLaser(e,t,n,s){const r=new Tt;r.position.copy(e),r.quaternion.setFromUnitVectors(new U(0,0,1),t);const o=new xe(this.laserCoreGeom,n?this.localLaserCoreMat:this.remoteLaserCoreMat);o.scale.set(1,1,9),r.add(o);const a=new xe(this.laserGlowGeom,n?this.localLaserGlowMat:this.remoteLaserGlowMat);a.scale.set(1,1,9.4),r.add(a),this.scene.add(r),this.projectileLasers.push({mesh:r,dir:t.clone().normalize(),speed:this.laserSpeed,life:1.4,isLocal:n,id:s})}spawnProjectile(e,t,n,s,r){const o=new Tt;o.position.copy(e),o.quaternion.setFromUnitVectors(new U(0,0,1),t);const a=new xe(this.slugBodyGeom,this.slugBodyMat);o.add(a);const c=new xe(this.slugNoseGeom,s?this.localSlugNoseMat:this.remoteSlugNoseMat);c.position.set(0,0,-1.45),o.add(c);const l=new xe(this.slugTailGeom,this.slugThrusterMat);l.position.set(0,0,1.15),o.add(l),this.scene.add(o),this.projectiles.push({mesh:o,dir:t.clone().normalize(),speed:this.cannonSpeed,initialVel:n?n.clone():new U,life:2.8,isLocal:s,id:r})}triggerCannon(e,t,n){return this.triggerSecondary(e,t,n)}triggerLaser(e,t,n){this.triggerPrimary(e,t,n)}triggerRearMine(e){return this.triggerSecondary(!0,e,performance.now())}update(e,t,n,s){if(this.laserCooldownTimer>0){const r=Math.min(this.laserCooldownTimer,e);this.laserCooldownTimer-=r;const o=e-r;o>0&&this.laserEnergy<this.laserMaxEnergy&&(this.laserEnergy=Math.min(this.laserMaxEnergy,this.laserEnergy+this.laserRechargeRate*o))}else this.laserEnergy<this.laserMaxEnergy&&(this.laserEnergy=Math.min(this.laserMaxEnergy,this.laserEnergy+this.laserRechargeRate*e));for(let r=this.laserBeams.length-1;r>=0;r--){const o=this.laserBeams[r];if(o.life-=e,o.life<=0){this.scene.remove(o.group),this.laserBeams.splice(r,1);continue}const a=o.life/o.maxLife;o.group.children.forEach(c=>{c.material&&c.material.opacity!==void 0&&(c.material.opacity=a*.95)})}for(let r=this.missiles.length-1;r>=0;r--){const o=this.missiles[r];o.life-=e;let a=null;if(o.targetId===(this.network?this.network.selfId:null))a=t.position;else if(n.has(o.targetId)){const u=n.get(o.targetId);u.isDead||(a=u.position)}if(a){const u=o.guidance.steer(e,o.group.position,o.dir,a);o.dir.copy(u.newDir),o.group.position.addScaledVector(o.dir,u.speed*e)}else o.group.position.addScaledVector(o.dir,o.guidance.currentSpeed*e);o.group.quaternion.setFromUnitVectors(new U(0,0,1),o.dir);const c=o.group.position.clone().addScaledVector(o.dir,-1.5);this.fireTrails.emit(c,o.dir,3);let l=!1;const h=this.spaceEnv.checkCollision(o.group.position,1.8);if(h&&(this.spawnExplosion(o.group.position,16,16733440),typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(h,o.group.position,o.dir,28,18),l=!0),!l&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.group.position.distanceToSquared(t.position)<24&&(this.spawnExplosion(o.group.position,20,16720384),t.takeDamage(this.missileDamage,"missile"),s&&s(this.missileDamage,"missile",null),l=!0),!l&&o.isLocal&&o.targetId&&n.has(o.targetId)){const u=n.get(o.targetId);!u.isDead&&o.group.position.distanceToSquared(u.position)<24&&(this.spawnExplosion(o.group.position,20,16720384),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(o.targetId,this.missileDamage,"missile"),l=!0)}(l||o.life<=0)&&(o.life<=0&&!l&&this.spawnExplosion(o.group.position,10,16729088),this.scene.remove(o.group),this.missiles.splice(r,1))}for(let r=this.projectileLasers.length-1;r>=0;r--){const o=this.projectileLasers[r];o.life-=e,o.mesh.position.addScaledVector(o.dir,o.speed*e);let a=!1;if(this.spaceEnv.checkCollision(o.mesh.position,1.2)&&(this.spawnExplosion(o.mesh.position,6,54527),a=!0),!a&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<18&&(this.spawnExplosion(o.mesh.position,8,65535),t.takeDamage(this.laserDamage,"laser"),s&&s(this.laserDamage,"laser",null),a=!0),!a&&o.isLocal){for(const[l,h]of n.entries())if(!h.isDead&&o.mesh.position.distanceToSquared(h.position)<18){this.spawnExplosion(o.mesh.position,8,65535),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(l,this.laserDamage,"laser"),a=!0;break}}(a||o.life<=0)&&(this.scene.remove(o.mesh),this.projectileLasers.splice(r,1))}for(let r=this.projectiles.length-1;r>=0;r--){const o=this.projectiles[r];o.life-=e,o.mesh.position.addScaledVector(o.dir,o.speed*e);let a=!1;const c=this.spaceEnv.checkCollision(o.mesh.position,1.2);if(c&&(this.spawnExplosion(o.mesh.position,5,16742144),typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(c,o.mesh.position,o.dir),a=!0),!a&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<16&&(this.spawnExplosion(o.mesh.position,6,16724736),t.takeDamage(this.cannonDamage,"cannon"),s&&s(this.cannonDamage,"cannon",null),a=!0),!a&&o.isLocal){for(const[l,h]of n.entries())if(!h.isDead&&o.mesh.position.distanceToSquared(h.position)<16){this.spawnExplosion(o.mesh.position,6,16733440),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(l,this.cannonDamage,"cannon"),a=!0;break}}(a||o.life<=0)&&(this.scene.remove(o.mesh),this.projectiles.splice(r,1))}for(let r=this.decoys.length-1;r>=0;r--){const o=this.decoys[r];o.life-=e,o.group.position.addScaledVector(o.dir,o.speed*e);const a=.5+Math.sin(o.life*14)*.25;o.group.children.forEach(c=>{c.material&&c.material.opacity!==void 0&&(c.material.opacity=a)}),o.life<=0&&(this.spawnExplosion(o.group.position,6,65535),this.scene.remove(o.group),this.decoys.splice(r,1))}for(let r=this.mines.length-1;r>=0;r--){const o=this.mines[r];o.life-=e,o.mesh.rotation.y+=e*2,o.life<=0&&(this.spawnExplosion(o.pos,16,16720384),this.scene.remove(o.mesh),this.mines.splice(r,1))}for(let r=this.explosions.length-1;r>=0;r--){const o=this.explosions[r];if(o.life-=e,o.life<=0){this.scene.remove(o.mesh),this.explosions.splice(r,1);continue}const c=1+(1-o.life/o.maxLife)*2.2;o.mesh.scale.set(c,c,c),o.mesh.material.opacity=o.life/o.maxLife*.9}this.fireTrails.update(e)}get lasers(){return this.projectileLasers.length>0?this.projectileLasers:this.laserBeams}get cannonEnergy(){return this.lockSystem.isLocked?100:Math.round(this.lockSystem.getProgress()*100)}get cannonMaxEnergy(){return 100}get cannonCooldownTimer(){return this.lockSystem.isLocked?0:3-this.lockSystem.lockTimer}cleanup(){for(const e of this.laserBeams)this.scene.remove(e.group);for(const e of this.missiles)this.scene.remove(e.group);for(const e of this.decoys)this.scene.remove(e.group);for(const e of this.mines)this.scene.remove(e.mesh);for(const e of this.explosions)this.scene.remove(e.mesh);this.fireTrails.cleanup()}}class ch{constructor(e,t,n="Pilot"){this.peerId=e,this.scene=t,this.playerName=n,this.group=new Tt,this.position=this.group.position,this.quaternion=this.group.quaternion,this.lastReceivedState=null,this.targetPosition=new U,this.targetQuaternion=new Zt,this.targetVelocity=new U,this.lastPacketTime=performance.now(),this.hp=100,this.maxHp=100,this.isDead=!1,this.isThrusting=!1,this.strafeState=0,this.engineFlares=[],this.sideThrusterFlares=[],this.shieldMesh=null,this.nameCanvas=null,this.nameSprite=null,this.createShipMesh(),this.createNameplate(),this.scene.add(this.group)}createShipMesh(){const e=new Ut({color:10363940,roughness:.35,metalness:.85,flatShading:!0}),t=new Ut({color:1580068,roughness:.45,metalness:.8,flatShading:!0}),n=new Ut({color:54527,roughness:.12,metalness:.95,emissive:15186,emissiveIntensity:.6}),s=new Ye({color:58879}),r=new jn(.75,2.6,5);r.rotateX(-Math.PI/2);const o=new xe(r,e);o.position.set(0,0,-2.1),this.group.add(o);const a=new Et(1.8,.04,.6),c=new xe(a,t);c.position.set(0,.05,-1.5),this.group.add(c);const l=new Et(1.4,.8,3.2),h=new xe(l,e);h.position.set(0,0,.2),this.group.add(h);const u=new Et(.35,.55,1.8),f=new xe(u,t);f.position.set(-.85,-.05,.1),this.group.add(f);const m=f.clone();m.position.set(.85,-.05,.1),this.group.add(m);const g=new jn(.48,1.8,5);g.rotateX(-Math.PI/2);const v=new xe(g,n);v.position.set(0,.44,-.4),this.group.add(v);const p=new Et(5.8,.08,2),d=new xe(p,e);d.position.set(0,-.08,.6),this.group.add(d);const _=new Wt(.1,.12,1.6,8);_.rotateX(Math.PI/2);const x=new xe(_,t);x.position.set(-1.8,-.22,.3),this.group.add(x);const y=x.clone();y.position.set(1.8,-.22,.3),this.group.add(y);const A=new Mi(.12,.02,6,12),b=new xe(A,s);b.position.set(-1.8,-.22,-.5),this.group.add(b);const R=b.clone();R.position.set(1.8,-.22,-.5),this.group.add(R);const D=new Et(.08,1.25,1.2),w=new xe(D,t);w.position.set(-.65,.62,1.2),w.rotation.z=-.32,this.group.add(w);const M=w.clone();M.position.set(.65,.62,1.2),M.rotation.z=.32,this.group.add(M);const I=new Wt(.32,.42,.75,10);I.rotateX(Math.PI/2);const H=new xe(I,t);H.position.set(-.48,0,1.95),this.group.add(H);const S=H.clone();S.position.set(.48,0,1.95),this.group.add(S);const L=new Mi(.3,.03,6,12),N=new xe(L,s);N.position.set(-.48,0,2.32),this.group.add(N);const P=N.clone();P.position.set(.48,0,2.32),this.group.add(P);const z=new jn(.32,2.6,8);z.rotateX(-Math.PI/2);const k=new Ye({color:51455,transparent:!0,opacity:.9,blending:rt}),O=new xe(z,k);O.position.set(-.48,0,3.6),this.group.add(O),this.engineFlares.push(O);const B=O.clone();B.position.set(.48,0,3.6),this.group.add(B),this.engineFlares.push(B);const Z=new pn(3.4,16,12),ce=new Ye({color:58879,wireframe:!0,transparent:!0,opacity:0});this.shieldMesh=new xe(Z,ce),this.group.add(this.shieldMesh)}createNameplate(){this.nameCanvas=document.createElement("canvas"),this.nameCanvas.width=256,this.nameCanvas.height=64,this.updateNameplateTexture();const e=new Jr(this.nameCanvas),t=new Gu({map:e,transparent:!0});this.nameSprite=new ty(t),this.nameSprite.position.set(0,3.2,0),this.nameSprite.scale.set(7.5,1.8,1),this.group.add(this.nameSprite)}updateNameplateTexture(){if(!this.nameCanvas)return;const e=this.nameCanvas.getContext("2d");if(!e)return;e.clearRect(0,0,256,64),e.fillStyle="rgba(10, 16, 26, 0.75)",e.roundRect?e.roundRect(10,8,236,48,8):e.fillRect(10,8,236,48),e.fill(),e.strokeStyle="#00d4ff",e.lineWidth=2,e.stroke(),e.font='bold 20px "Segoe UI", sans-serif',e.fillStyle="#ffffff",e.textAlign="center",e.fillText(this.playerName,128,30);const t=Math.max(0,this.hp/this.maxHp);e.fillStyle="#222",e.fillRect(30,38,196,10),e.fillStyle=t>.4?"#00ff88":"#ff3344",e.fillRect(30,38,196*t,10),this.nameSprite&&this.nameSprite.material.map&&(this.nameSprite.material.map.needsUpdate=!0)}receiveNetworkState(e){e&&(this.lastPacketTime=performance.now(),e.name&&e.name!==this.playerName&&(this.playerName=e.name,this.updateNameplateTexture()),e.hp!==void 0&&e.hp!==this.hp&&(this.hp=e.hp,this.updateNameplateTexture()),this.isDead=!!e.isDead,this.isInvisible=!!e.isInvisible,this.isThrusting=!!e.thrust,this.strafeState=e.strafe||0,this.targetPosition.set(e.pos.x,e.pos.y,e.pos.z),this.targetQuaternion.set(e.quat._x||e.quat.x,e.quat._y||e.quat.y,e.quat._z||e.quat.z,e.quat._w||e.quat.w),e.vel&&this.targetVelocity.set(e.vel.x,e.vel.y,e.vel.z))}triggerShieldFlash(){this.shieldMesh&&(this.shieldMesh.material.opacity=.55)}update(e){if(this.isDead){this.group.visible=!1;return}this.group.visible=!0;const t=performance.now(),n=Math.min(.25,(t-this.lastPacketTime)/1e3),s=this.targetPosition.clone().addScaledVector(this.targetVelocity,n),r=Math.min(1,e*12);this.position.lerp(s,r),this.quaternion.slerp(this.targetQuaternion,Math.min(1,e*10));const o=this.isThrusting?.8+Math.random()*.4:.001;for(const a of this.engineFlares)a.scale.set(o,o,o),a.visible=this.isThrusting;this.shieldMesh&&this.shieldMesh.material.opacity>0&&(this.shieldMesh.material.opacity=Math.max(0,this.shieldMesh.material.opacity-e*2.5))}destroy(){this.scene.remove(this.group)}}class yy{constructor(e){this.scene=e,this.maxParticles=2400,this.particles=[],this.geom=new xt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new mt(this.positions,3)),this.geom.setAttribute("color",new mt(this.colors,3));let t=null;if(typeof document<"u")try{const n=document.createElement("canvas");n.width=64,n.height=64;const s=n.getContext("2d");if(s){const r=s.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.2,"rgba(0, 220, 255, 0.85)"),r.addColorStop(.5,"rgba(0, 140, 255, 0.35)"),r.addColorStop(.8,"rgba(0, 60, 255, 0.1)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),s.fillStyle=r,s.fillRect(0,0,64,64),t=new Jr(n)}}catch{}this.mat=new hs({size:5.5,map:t||void 0,vertexColors:!0,transparent:!0,opacity:.85,blending:rt,depthWrite:!1,sizeAttenuation:!0}),this.points=new Ys(this.geom,this.mat),this.points.frustumCulled=!1,this.scene.add(this.points),this.emitTimer=0}emit(e,t,n=!1){this.particles.length>=this.maxParticles&&this.particles.shift();const s=(Math.random()-.5)*.6,r=(Math.random()-.5)*.6,o=(Math.random()-.5)*.6,a=e.clone().addScaledVector(t,-2.4);this.particles.push({x:a.x+s,y:a.y+r,z:a.z+o,vx:s*.4,vy:r*.4,vz:o*.4,age:0,maxAge:15,isHostile:n})}update(e){const t=this.geom.attributes.position,n=this.geom.attributes.color,s=this.particles.length;for(let r=s-1;r>=0;r--){const o=this.particles[r];if(o.age+=e,o.age>=o.maxAge){this.particles.splice(r,1);continue}o.x+=o.vx*e,o.y+=o.vy*e,o.z+=o.vz*e;const a=1-o.age/o.maxAge,c=Math.pow(a,1.6),l=r*3;this.positions[l]=o.x,this.positions[l+1]=o.y,this.positions[l+2]=o.z,o.isHostile?(this.colors[l]=1*c,this.colors[l+1]=.35*c,this.colors[l+2]=.15*c):(this.colors[l]=.15*c,this.colors[l+1]=.85*c,this.colors[l+2]=1*c)}this.maxParticles-this.particles.length;for(let r=this.particles.length;r<this.maxParticles;r++){const o=r*3;this.positions[o]=0,this.positions[o+1]=0,this.positions[o+2]=0,this.colors[o]=0,this.colors[o+1]=0,this.colors[o+2]=0}t.needsUpdate=!0,n.needsUpdate=!0}cleanup(){this.scene.remove(this.points),this.particles=[]}}class xy{constructor(e){this.scene=e,this.ripples=[],this.ringGeom=new zs(.8,1.2,32),this.ringGeom.rotateX(Math.PI/2),this.sphereGeom=new xi(1,2)}emitRipple(e,t=58879){const n=new Tt;n.position.copy(e);const s=new Ye({color:t,wireframe:!0,transparent:!0,opacity:.85,blending:rt,depthWrite:!1}),r=new xe(this.sphereGeom,s);n.add(r);const o=new Ye({color:16777215,transparent:!0,opacity:.95,side:wt,blending:rt,depthWrite:!1}),a=new xe(this.ringGeom,o);n.add(a),this.scene.add(n),this.ripples.push({group:n,sphereMesh:r,ringMesh:a,age:0,maxAge:2.5,maxRadius:280})}update(e){for(let t=this.ripples.length-1;t>=0;t--){const n=this.ripples[t];if(n.age+=e,n.age>=n.maxAge){this.scene.remove(n.group),this.ripples.splice(t,1);continue}const s=n.age/n.maxAge,r=2+Math.pow(s,.75)*n.maxRadius,o=Math.max(0,(1-s)*.9);n.sphereMesh.scale.set(r,r,r),n.sphereMesh.material.opacity=o,n.ringMesh.scale.set(r*1.05,r*1.05,r*1.05),n.ringMesh.material.opacity=o*1.2}}cleanup(){for(const e of this.ripples)this.scene.remove(e.group);this.ripples=[]}}class My{constructor(e,t){this.scene=e,this.spaceEnv=t,this.spawnInterval=10,this.spawnTimer=4,this.activeMeteor=null,this.maxParticles=250,this.particles=[],this.trailGeom=new xt,this.trailPositions=new Float32Array(this.maxParticles*3),this.trailColors=new Float32Array(this.maxParticles*3),this.trailGeom.setAttribute("position",new mt(this.trailPositions,3)),this.trailGeom.setAttribute("color",new mt(this.trailColors,3)),this.trailMat=new hs({size:48,vertexColors:!0,transparent:!0,opacity:.95,blending:rt,depthWrite:!1,sizeAttenuation:!0}),this.trailPoints=new Ys(this.trailGeom,this.trailMat),this.scene.add(this.trailPoints)}spawnMeteor(){if(this.activeMeteor)return;const e=Math.random()*Math.PI*2,t=Math.acos(2*Math.random()-1),n=1300,s=new U(n*Math.sin(t)*Math.cos(e),n*Math.sin(t)*Math.sin(e)*.6,n*Math.cos(t));let r=new U((Math.random()-.5)*400,(Math.random()-.5)*200,(Math.random()-.5)*400);if(this.spaceEnv.asteroids.length>0&&Math.random()<.65){const D=this.spaceEnv.asteroids[Math.floor(Math.random()*this.spaceEnv.asteroids.length)];D&&r.copy(D.position).add(new U((Math.random()-.5)*30,(Math.random()-.5)*30,(Math.random()-.5)*30))}const o=r.clone().sub(s).normalize(),a=260,c=o.clone().multiplyScalar(a),l=56,h=12e5,u=new Tt;u.position.copy(s);const f=new js(l,2),m=new Ut({color:1705986,emissive:16724736,emissiveIntensity:4.2,roughness:.88,metalness:.25}),g=new xe(f,m);u.add(g);const v=new pn(l*.75,16,12),p=new Ye({color:16777215,transparent:!0,opacity:.95,blending:rt}),d=new xe(v,p);u.add(d);const _=new xi(l*1.25,2),x=new Ye({color:16729088,transparent:!0,opacity:.65,blending:rt,side:wt}),y=new xe(_,x);u.add(y);const A=new xi(l*1.4,2),b=new Ye({color:16755200,transparent:!0,opacity:.45,blending:rt,side:wt}),R=new xe(A,b);u.add(R),this.scene.add(u),this.activeMeteor={group:u,coreMesh:g,fireEnvelopeMesh:y,haloMesh:R,position:u.position,velocity:c,dir:o,speed:a,radius:l,mass:h,flybyPlayed:!1,age:0},this.spaceEnv&&this.spaceEnv.meteorLight&&(this.spaceEnv.meteorLight.intensity=4.5,this.spaceEnv.meteorLight.position.copy(s)),lt.log("METEOR",`Flaming meteor entered sector at (${Math.round(s.x)}, ${Math.round(s.y)}, ${Math.round(s.z)}) heading speed ${a} u/s`)}update(e,t,n,s){var r;if(this.spawnTimer+=e,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnMeteor()),this.activeMeteor){const o=this.activeMeteor;if(o.age+=e,o.position.addScaledVector(o.velocity,e),o.coreMesh.rotation.x+=e*1.8,o.coreMesh.rotation.y+=e*2.2,o.fireEnvelopeMesh){o.fireEnvelopeMesh.rotation.x-=e*3.5,o.fireEnvelopeMesh.rotation.z+=e*4;const c=1+Math.sin(o.age*14)*.06;o.fireEnvelopeMesh.scale.set(c,c,c)}if(o.haloMesh){o.haloMesh.rotation.y+=e*2.8,o.haloMesh.rotation.z-=e*2.5;const c=1+Math.cos(o.age*10)*.08;o.haloMesh.scale.set(c,c,c)}this.spaceEnv&&this.spaceEnv.meteorLight&&this.spaceEnv.meteorLight.position.copy(o.position),this.emitTrailParticles(o.position,o.dir,6),!o.flybyPlayed&&t&&!t.isDead&&o.position.distanceTo(t.position)<450&&(o.flybyPlayed=!0,ct.playMeteorFlyby(o.position));let a=!1;for(let c=0;c<this.spaceEnv.asteroids.length;c++){const l=this.spaceEnv.asteroids[c],h=o.position.distanceToSquared(l.position),u=l.radius+o.radius;if(h<u*u){const f=l.position.clone().sub(o.position).normalize(),m=o.mass/l.mass*o.speed*1.8;l.velocity.addScaledVector(f,m),l.rotationSpeed.add(new U((Math.random()-.5)*1.2,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2)),lt.log("METEOR",`Meteor IMPACT with asteroid! Transferred impulse ${Math.round(m)} u/s (new ast speed: ${Math.round(l.velocity.length())})`),this.triggerExplosion(o.position,28,16733440),a=!0;break}}if(!a&&t&&!t.isDead&&o.position.distanceTo(t.position)<o.radius+3.2&&(lt.log("METEOR","Meteor DIRECT HIT on player ship! Instant lethal incineration."),this.triggerExplosion(o.position,36,16720384),t.takeDamage(1e3,!0),s&&s("🔥 Incinerated by rogue flaming meteor!"),a=!0),!a&&n){for(const[c,l]of n.entries())if(!l.isDead&&o.position.distanceTo(l.position)<o.radius+3.2){lt.log("METEOR",`Meteor DIRECT HIT on remote ship ${c.slice(0,5)}!`),this.triggerExplosion(o.position,36,16720384),(r=l.takeDamage)==null||r.call(l,1e3),a=!0;break}}!a&&o.position.length()>1600&&(a=!0),a&&this.destroyMeteor()}this.updateTrailParticles(e)}emitTrailParticles(e,t,n=6){for(let s=0;s<n&&!(this.particles.length>=this.maxParticles);s++){const r=new U((Math.random()-.5)*45,(Math.random()-.5)*45,(Math.random()-.5)*45),o=e.clone().add(r),a=t.clone().multiplyScalar(-40).add(new U((Math.random()-.5)*25,(Math.random()-.5)*25,(Math.random()-.5)*25)),c=.65+Math.random()*.45;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}updateTrailParticles(e){for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.life-=e,s.life<=0){this.particles.splice(n,1);continue}s.pos.addScaledVector(s.vel,e)}const t=this.particles.length;for(let n=0;n<t;n++){const s=this.particles[n],r=n*3;this.trailPositions[r]=s.pos.x,this.trailPositions[r+1]=s.pos.y,this.trailPositions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.2)this.trailColors[r]=1,this.trailColors[r+1]=.95,this.trailColors[r+2]=.8;else if(o<.6)this.trailColors[r]=1,this.trailColors[r+1]=.45*(1-(o-.2)/.4),this.trailColors[r+2]=.05;else{const a=(1-o)/.4;this.trailColors[r]=.6*a,this.trailColors[r+1]=.1*a,this.trailColors[r+2]=.02*a}}for(let n=t;n<this.maxParticles;n++){const s=n*3;this.trailPositions[s]=0,this.trailPositions[s+1]=0,this.trailPositions[s+2]=999999}this.trailGeom.attributes.position.needsUpdate=!0,this.trailGeom.attributes.color.needsUpdate=!0}triggerExplosion(e,t=28,n=16733440){const s=new pn(t*.4,16,12),r=new Ye({color:n,transparent:!0,opacity:.95,blending:rt}),o=new xe(s,r);o.position.copy(e),this.scene.add(o),ct.playExplosion(2.5),this.spaceEnv&&typeof this.spaceEnv.triggerCombatFlash=="function"&&this.spaceEnv.triggerCombatFlash(e,n,6);const a=performance.now(),c=550,l=()=>{const u=(performance.now()-a)/c;if(u>=1){this.scene.remove(o),s.dispose(),r.dispose();return}const f=1+u*3.5;o.scale.set(f,f,f),r.opacity=Math.max(0,1-u),requestAnimationFrame(l)};requestAnimationFrame(l)}destroyMeteor(){this.activeMeteor&&(this.scene.remove(this.activeMeteor.group),this.spaceEnv&&this.spaceEnv.meteorLight&&(this.spaceEnv.meteorLight.intensity=0),this.activeMeteor=null)}cleanup(){this.destroyMeteor(),this.scene.remove(this.trailPoints),this.trailGeom.dispose(),this.trailMat.dispose()}}class Sy{constructor(e,t){this.scene=e,this.spaceEnv=t,this.matchDuration=600,this.matchTime=0,this.initialSafeRadius=1100,this.finalSafeRadius=120,this.currentSafeRadius=this.initialSafeRadius,this.startPosition=new U(0,450,-600),this.targetPosition=new U(0,0,0),this.position=this.startPosition.clone(),this.eventHorizonRadius=65,this.gravityStrength=45e4,this.group=new Tt,this.group.position.copy(this.position),this.createBlackHoleVisuals(),this.createSafeZonePerimeterVisuals(),this.scene.add(this.group)}createBlackHoleVisuals(){const e=new pn(this.eventHorizonRadius,32,24),t=new Ye({color:0,fog:!1});this.horizonMesh=new xe(e,t),this.group.add(this.horizonMesh);const n=new pn(this.eventHorizonRadius*1.15,28,20),s=new Ye({color:8965375,transparent:!0,opacity:.35,side:Pt,blending:rt,fog:!1});this.lensMesh=new xe(n,s),this.group.add(this.lensMesh);const r=new zs(this.eventHorizonRadius*1.08,this.eventHorizonRadius*3.8,48,8);r.rotateX(Math.PI/2.3);const o=new Ye({color:16737792,side:wt,transparent:!0,opacity:.9,blending:rt,fog:!1});this.diskMesh=new xe(r,o),this.group.add(this.diskMesh);const a=new zs(this.eventHorizonRadius*1.05,this.eventHorizonRadius*1.9,48,4);a.rotateX(Math.PI/2.3);const c=new Ye({color:65535,side:wt,transparent:!0,opacity:.75,blending:rt,fog:!1});this.innerDiskMesh=new xe(a,c),this.group.add(this.innerDiskMesh),this.infallParticleCount=180,this.infallGeom=new xt,this.infallPositions=new Float32Array(this.infallParticleCount*3),this.infallColors=new Float32Array(this.infallParticleCount*3),this.infallData=[];for(let h=0;h<this.infallParticleCount;h++){const u=Math.random()*Math.PI*2,f=this.eventHorizonRadius*(1.2+Math.random()*2.8),m=(Math.random()-.5)*30,g=40+Math.random()*60;this.infallData.push({angle:u,dist:f,height:m,speed:g});const v=h*3;this.infallPositions[v]=Math.cos(u)*f,this.infallPositions[v+1]=m,this.infallPositions[v+2]=Math.sin(u)*f,this.infallColors[v]=1,this.infallColors[v+1]=.5+Math.random()*.5,this.infallColors[v+2]=.2}this.infallGeom.setAttribute("position",new mt(this.infallPositions,3)),this.infallGeom.setAttribute("color",new mt(this.infallColors,3));const l=new hs({size:6.5,vertexColors:!0,transparent:!0,opacity:.85,blending:rt,depthWrite:!1});this.infallPoints=new Ys(this.infallGeom,l),this.group.add(this.infallPoints)}createSafeZonePerimeterVisuals(){const e=this.currentSafeRadius,t=new Mi(e,2.5,8,64);t.rotateX(Math.PI/2),this.perimeterMat=new Ye({color:54527,transparent:!0,opacity:.55,wireframe:!0,blending:rt}),this.perimeterMesh=new xe(t,this.perimeterMat),this.perimeterMesh.position.set(0,0,0),this.scene.add(this.perimeterMesh)}update(e,t,n,s,r){var c;this.matchTime+=e;const o=Math.min(1,this.matchTime/this.matchDuration);this.currentSafeRadius=this.initialSafeRadius-o*(this.initialSafeRadius-this.finalSafeRadius);const a=this.currentSafeRadius/this.initialSafeRadius;if(this.perimeterMesh&&(this.perimeterMesh.scale.set(a,1,a),o>.7?(this.perimeterMat.color.setHex(16720452),this.perimeterMat.opacity=.75+Math.sin(this.matchTime*6)*.2):(this.perimeterMat.color.setHex(54527),this.perimeterMat.opacity=.45+Math.sin(this.matchTime*2)*.15)),this.position.lerpVectors(this.startPosition,this.targetPosition,Math.pow(o,.7)),this.group.position.copy(this.position),this.diskMesh&&(this.diskMesh.rotation.z+=e*.75),this.innerDiskMesh&&(this.innerDiskMesh.rotation.z-=e*1.35),this.infallData){for(let l=0;l<this.infallParticleCount;l++){const h=this.infallData[l];h.angle+=h.speed/(h.dist+1)*e,h.dist-=e*14,h.dist<=this.eventHorizonRadius*1.02&&(h.dist=this.eventHorizonRadius*(2.2+Math.random()*1.8));const u=l*3;this.infallPositions[u]=Math.cos(h.angle)*h.dist,this.infallPositions[u+1]=h.height,this.infallPositions[u+2]=Math.sin(h.angle)*h.dist}this.infallGeom.attributes.position.needsUpdate=!0}if(t&&!t.isDead){const l=this.position.clone().sub(t.position),h=l.length(),u=l.normalize(),f=Math.min(65,this.gravityStrength/(h*h+1e3));t.velocity.addScaledVector(u,f*e),h<=this.eventHorizonRadius&&(lt.log("BLACK_HOLE","Player ship devoured by the Black Hole event horizon!"),t.takeDamage(9999,!0),r&&r("🕳️ Devoured by the encroaching Cosmic Black Hole!"))}if(n)for(const[l,h]of n.entries())h.isDead||this.position.distanceTo(h.position)<=this.eventHorizonRadius&&((c=h.takeDamage)==null||c.call(h,9999));if(this.spaceEnv&&this.spaceEnv.asteroids)for(let l=this.spaceEnv.asteroids.length-1;l>=0;l--){const h=this.spaceEnv.asteroids[l],u=this.position.clone().sub(h.position),f=u.length();if(f>.1){const m=Math.min(25,this.gravityStrength*.4/(f*f+2e3));h.velocity.addScaledVector(u.normalize(),m*e)}f<=this.eventHorizonRadius+h.radius*.3&&(this.spaceEnv.scene.remove(h.mesh),this.spaceEnv.asteroids.splice(l,1),ct.playExplosion(2.2,this.position),lt.log("BLACK_HOLE",`Asteroid swallowed by singularity! (${this.spaceEnv.asteroids.length} remaining)`))}if(s&&s.activeMeteor){const l=s.activeMeteor,h=this.position.clone().sub(l.position);h.length()<=this.eventHorizonRadius+l.radius?(lt.log("BLACK_HOLE","Rogue flaming meteor sucked into the Black Hole!"),s.destroyMeteor(),ct.playExplosion(3,this.position)):l.velocity.addScaledVector(h.normalize(),60*e)}}getSafeRadius(){return this.currentSafeRadius}getMatchProgress(){return Math.min(1,this.matchTime/this.matchDuration)}getTimeRemaining(){return Math.max(0,this.matchDuration-this.matchTime)}getMatchTimeRemaining(){return this.getTimeRemaining()}cleanup(){this.scene.remove(this.group),this.perimeterMesh&&this.scene.remove(this.perimeterMesh),this.infallGeom.dispose()}}const oi={SHIELD_REPAIR:"shield_repair",INVISIBILITY:"invisibility",HOLOGRAM_CLONE:"hologram_clone"};class wy{constructor(e,t){this.scene=e,this.blackHoleSystem=t,this.spawnInterval=10,this.spawnTimer=2,this.itemLifetime=60,this.powerups=[],this.maxConcurrent=12,this.orbGeom=new xi(3.2,2),this.ringGeom=new Mi(4.5,.25,8,24),this.iconGeom=new Et(1.6,1.6,1.6)}spawnPowerUp(){if(this.powerups.length>=this.maxConcurrent)return;const e=this.blackHoleSystem?this.blackHoleSystem.getSafeRadius()*.75:600,t=Math.random()*Math.PI*2,n=80+Math.random()*e,s=new U(Math.cos(t)*n,(Math.random()-.5)*160,Math.sin(t)*n),r=Math.random();let o=oi.SHIELD_REPAIR,a=65535,c="Shield Repair";r<.36?(o=oi.SHIELD_REPAIR,a=65484,c="Shield Replenish"):r<.68?(o=oi.INVISIBILITY,a=13378303,c="Cloaking Device"):(o=oi.HOLOGRAM_CLONE,a=65382,c="Hologram Decoy");const l=new Tt;l.position.copy(s);const h=new Ye({color:a,transparent:!0,opacity:.85,blending:rt}),u=new xe(this.orbGeom,h);l.add(u);const f=new Ye({color:a,wireframe:!0,transparent:!0,opacity:.75,blending:rt}),m=new xe(this.ringGeom,f);l.add(m);const g=new Ye({color:16777215,wireframe:!0}),v=new xe(this.iconGeom,g);l.add(v),this.scene.add(l),this.powerups.push({group:l,coreMesh:u,ringMesh:m,iconMesh:v,type:o,name:c,pos:s,life:this.itemLifetime,maxLife:this.itemLifetime,initialY:s.y,seed:Math.random()*10}),lt.log("POWERUP",`Spawned [${c}] at (${Math.round(s.x)}, ${Math.round(s.y)}, ${Math.round(s.z)})`)}update(e,t,n){this.spawnTimer+=e,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnPowerUp());for(let s=this.powerups.length-1;s>=0;s--){const r=this.powerups[s];if(r.life-=e,r.life<=0){this.scene.remove(r.group),this.powerups.splice(s,1);continue}const o=r.maxLife-r.life;if(r.group.rotation.y+=e*1.6,r.ringMesh.rotation.x+=e*2.4,r.ringMesh.rotation.z+=e*1.8,r.iconMesh.rotation.y-=e*3,r.group.position.y=r.initialY+Math.sin(o*2.5+r.seed)*3.5,r.life<10){const a=(Math.sin(o*12)+1)*.5;r.coreMesh.material.opacity=.3+a*.6}if(t&&!t.isDead){const a=t.position.distanceToSquared(r.group.position),c=8;a<=c*c&&(this.applyPowerUp(r.type,t,n),ct.playScoreChime(),this.scene.remove(r.group),this.powerups.splice(s,1))}}}applyPowerUp(e,t,n){let s="Special",r="✨",o="#00ffff";switch(e){case oi.SHIELD_REPAIR:s="REPAIR SHIELD",r="🛡️",o="#00d4ff";break;case oi.INVISIBILITY:s="CLOAK",r="👁️",o="#c084fc";break;case oi.HOLOGRAM_CLONE:s="DECOY CLONE",r="👥",o="#00ff88";break}t.storedPowerUp={type:e,name:s,icon:r,color:o},lt.log("POWERUP",`Collected and stored [${s}] in Special slot`),n&&n(`✨ ${r} ${s} ARMED! PRESS [R] OR SPECIAL BUTTON TO USE`)}cleanup(){for(const e of this.powerups)this.scene.remove(e.group);this.powerups=[],this.orbGeom.dispose(),this.ringGeom.dispose(),this.iconGeom.dispose()}}class Ey{constructor({container:e,network:t,mapSeed:n,onHudUpdate:s,onDeathNotice:r}){this.container=e,this.network=t,this.mapSeed=n,this.onHudUpdate=s||(()=>{}),this.onDeathNotice=r||(()=>{}),this.scene=null,this.camera=null,this.renderer=null,this.spaceEnv=null,this.cockpit=null,this.playerShip=null,this.weaponsSystem=null,this.remoteShips=new Map,this.isRunning=!1,this.lastTime=performance.now(),this.animFrameId=null,this.lastWidth=0,this.lastHeight=0,this.isPointerLocked=!1,this.mouseSensitivity=.0066,this.isFiringLaser=!1,this.isFiringCannon=!1,this.blackHoleSystem=null,this.powerUpSystem=null,this.broadcastTimer=0,this.broadcastInterval=1/20,this.thrusterTrails=null,this.beaconSystem=null,this.meteorSystem=null,this.trailEmitTimer=0,this.timeSinceLastCombat=0,this.beaconPulseTimer=0,this.netStatsTimer=0,this.initThree(),this.setupNetworkHandlers(),this.setupInputListeners(),lt.setEngine(this),lt.log("ENGINE",`GameEngine initialized with seed ${this.mapSeed}`)}initThree(){this.scene=new Q_,this.scene.background=new Ke(264212),this.scene.fog=new pc(264212,1e-4);const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;this.camera=new Gt(75,e/t,.1,4e3),this.scene.add(this.camera),this.renderer=new J_({antialias:!0,powerPreference:"high-performance",precision:"highp",stencil:!1,alpha:!1}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=uu,this.renderer.toneMappingExposure=1.2,this.renderer.domElement.style.transform="translateZ(0)",this.renderer.domElement.style.willChange="transform",this.container.appendChild(this.renderer.domElement),this.spaceEnv=new hy(this.scene,this.mapSeed),this.playerShip=new dy(this.camera,this.spaceEnv),this.playerShip.resetSpawn(),this.cockpit=new uy(this.camera),this.weaponsSystem=new _y(this.scene,this.spaceEnv,this.network),this.thrusterTrails=new yy(this.scene),this.beaconSystem=new xy(this.scene),this.meteorSystem=new My(this.scene,this.spaceEnv),this.blackHoleSystem=new Sy(this.scene,this.spaceEnv),this.powerUpSystem=new wy(this.scene,this.blackHoleSystem);try{this.renderer.compile(this.scene,this.camera)}catch{}window.addEventListener("resize",this.onWindowResize.bind(this))}setupNetworkHandlers(){this.network.onPeerJoined=e=>{if(!(!e||typeof e!="string")){if(!this.remoteShips.has(e)){const t=new ch(e,this.scene,`Pilot-${e.slice(0,4)}`);this.remoteShips.set(e,t)}lt.log("NET",`Peer joined: ${e}`)}},this.network.onPeerLeft=e=>{!e||typeof e!="string"||(this.remoteShips.has(e)&&(this.remoteShips.get(e).destroy(),this.remoteShips.delete(e)),lt.log("NET",`Peer left: ${e}`))},this.network.onHit(e=>{if(this.timeSinceLastCombat=0,e.targetId===this.network.selfId){const t=this.playerShip.takeDamage(e.damage);this.cockpit.triggerDamageFlash(),ct.playDamageHit(),t&&(ct.playExplosion(2.2),this.network.broadcastKill(this.network.selfId,e.attackerId,e.attackerName),this.onDeathNotice(`💥 Destroyed by ${e.attackerName||"Unknown Pilot"}`))}else this.remoteShips.has(e.targetId)&&this.remoteShips.get(e.targetId).triggerShieldFlash()}),this.weaponsSystem&&(this.network.onCannon(()=>{this.timeSinceLastCombat=0}),this.network.onMine(()=>{this.timeSinceLastCombat=0})),this.network.onKill(e=>{this.timeSinceLastCombat=0,e.killerId===this.network.selfId&&(this.playerShip.recordKill(),ct.playScoreChime(),this.onDeathNotice(`🎯 You eliminated ${e.victimId?e.victimId.slice(0,5):"Enemy"}! (+100 PTS)`))})}triggerBoostAction(){return this.playerShip&&this.playerShip.triggerThrustPress(performance.now())?(ct.playBoost(),this.cockpit.triggerBoostFlash(),this.thrusterTrails&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1),!0):!1}setupInputListeners(){window.addEventListener("keydown",e=>{if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.code){case"KeyW":this.playerShip.input.thrust||this.triggerBoostAction(),this.playerShip.input.thrust=!0;break;case"KeyS":this.playerShip.input.brake=!0;break;case"KeyA":this.playerShip.input.strafeLeft||ct.playStrafeBurst(),this.playerShip.input.strafeLeft=!0;break;case"KeyD":this.playerShip.input.strafeRight||ct.playStrafeBurst(),this.playerShip.input.strafeRight=!0;break;case"KeyQ":this.playerShip.input.rollLeft=!0;break;case"KeyE":this.playerShip.input.rollRight=!0;break;case"ArrowUp":this.playerShip.input.pitchUp=!0;break;case"ArrowDown":this.playerShip.input.pitchDown=!0;break;case"ArrowLeft":this.playerShip.input.yawLeft=!0;break;case"ArrowRight":this.playerShip.input.yawRight=!0;break;case"Space":this.isFiringLaser=!0,e.preventDefault();break;case"KeyF":this.weaponsSystem.triggerSecondary(!0,this.playerShip,performance.now());break;case"KeyR":{const t=this.playerShip.useSpecialPowerUp(this);t&&this.onDeathNotice(t.message);break}}}),window.addEventListener("keyup",e=>{switch(e.code){case"KeyW":this.playerShip.input.thrust=!1;break;case"KeyS":this.playerShip.input.brake=!1;break;case"KeyA":this.playerShip.input.strafeLeft=!1;break;case"KeyD":this.playerShip.input.strafeRight=!1;break;case"KeyQ":this.playerShip.input.rollLeft=!1;break;case"KeyE":this.playerShip.input.rollRight=!1;break;case"ArrowUp":this.playerShip.input.pitchUp=!1;break;case"ArrowDown":this.playerShip.input.pitchDown=!1;break;case"ArrowLeft":this.playerShip.input.yawLeft=!1;break;case"ArrowRight":this.playerShip.input.yawRight=!1;break;case"Space":this.isFiringLaser=!1;break}}),this.renderer.domElement.addEventListener("mousedown",e=>{e.button===0?this.isFiringLaser=!0:e.button===2&&this.weaponsSystem.triggerSecondary(!0,this.playerShip,performance.now())}),window.addEventListener("mouseup",e=>{e.button===0&&(this.isFiringLaser=!1)}),this.renderer.domElement.addEventListener("contextmenu",e=>e.preventDefault()),this.renderer.domElement.addEventListener("click",()=>{var e,t;document.pointerLockElement||(t=(e=this.renderer.domElement).requestPointerLock)==null||t.call(e)}),document.addEventListener("pointerlockchange",()=>{this.isPointerLocked=document.pointerLockElement===this.renderer.domElement}),document.addEventListener("mousemove",e=>{this.isPointerLocked&&(this.playerShip.input.analogYaw=-e.movementX*this.mouseSensitivity*25,this.playerShip.input.analogPitch=-e.movementY*this.mouseSensitivity*25)})}onWindowResize(){if(!this.container||!this.renderer||!this.camera)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}start(){this.isRunning=!0,this.lastTime=performance.now(),this.loop()}stop(){this.isRunning=!1,this.animFrameId&&cancelAnimationFrame(this.animFrameId)}loop(){if(this.isRunning){this.animFrameId=requestAnimationFrame(this.loop.bind(this));try{lt.recordFrame();const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;e>0&&t>0&&(e!==this.lastWidth||t!==this.lastHeight)&&(this.lastWidth=e,this.lastHeight=t,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1));const n=performance.now(),s=Math.min(.1,(n-this.lastTime)/1e3);this.lastTime=n,this.isPointerLocked&&(this.playerShip.input.analogPitch*=.7,this.playerShip.input.analogYaw*=.7),this.playerShip.update(s),ct.updateListener(this.camera),ct.updateEngine(this.playerShip.input.thrust,this.playerShip.input.brake,s),(this.isFiringLaser||this.isFiringCannon)&&(this.timeSinceLastCombat=0),this.weaponsSystem.triggerPrimary(this.isFiringLaser,this.playerShip,n),this.weaponsSystem&&this.weaponsSystem.lockSystem&&this.weaponsSystem.lockSystem.update(s,this.playerShip,this.remoteShips,this.spaceEnv,this.camera),this.weaponsSystem.update(s,this.playerShip,this.remoteShips,(o,a,c)=>{this.timeSinceLastCombat=0,this.cockpit.triggerDamageFlash()}),this.blackHoleSystem&&this.blackHoleSystem.update(s,this.playerShip,this.remoteShips,this.spaceEnv,this.meteorSystem,o=>{this.cockpit.triggerDamageFlash(),this.onDeathNotice(o)}),this.powerUpSystem&&this.powerUpSystem.update(s,this.playerShip,o=>{this.onDeathNotice(o)});for(const[o,a]of this.network.peers.entries()){if(!o||typeof o!="string")continue;if(!this.remoteShips.has(o)){const l=(a==null?void 0:a.name)||`Pilot-${o.slice(0,4)}`,h=new ch(o,this.scene,l);this.remoteShips.set(o,h)}const c=this.remoteShips.get(o);c&&(a!=null&&a.lastState)&&c.receiveNetworkState(a.lastState),c&&c.update(s)}if(this.timeSinceLastCombat+=s,this.network.peers.size>0&&this.timeSinceLastCombat>=30){if(this.beaconPulseTimer+=s,this.beaconPulseTimer>=3.5){this.beaconPulseTimer=0,this.beaconSystem.emitRipple(this.playerShip.position,54527);for(const o of this.remoteShips.values())o.isDead||this.beaconSystem.emitRipple(o.position,16724821);ct.playEngagementBeacon(),lt.log("BEACON",`Engagement beacon pulse emitted across sector (inactivity: ${Math.round(this.timeSinceLastCombat)}s)`)}}else this.beaconPulseTimer=0;if(this.trailEmitTimer+=s,this.trailEmitTimer>=.12){this.trailEmitTimer=0,this.playerShip.input.thrust&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1);for(const o of this.remoteShips.values())if(!o.isDead&&o.isThrusting){const a=new U(0,0,-1).applyQuaternion(o.quaternion);this.thrusterTrails.emit(o.position,a,!0)}}if(this.thrusterTrails.update(s),this.beaconSystem.update(s),this.meteorSystem&&this.meteorSystem.update(s,this.playerShip,this.remoteShips,o=>{this.cockpit.triggerDamageFlash(),this.onDeathNotice(o)}),this.netStatsTimer+=s,this.netStatsTimer>=5){this.netStatsTimer=0;const o=Array.from(this.network.peers.entries());if(o.length===0)lt.log("NET_STATS",`Connected Peers: 0 | Inactivity: ${Math.round(this.timeSinceLastCombat)}s | Master: ${this.network.isMaster}`);else{const a=o.map(([c,l])=>{const h=this.remoteShips.get(c),u=h?Math.round(this.playerShip.position.distanceTo(h.position)):"N/A",f=l.packetsReceived?(l.packetsReceived/5).toFixed(1):"0.0",m=Date.now()-(l.lastSeen||Date.now());l.packetsReceived=0;const g=h?`(${h.position.x.toFixed(1)}, ${h.position.y.toFixed(1)}, ${h.position.z.toFixed(1)})`:"N/A";return`Peer[${c.slice(0,5)}]: ${f} pkt/s, ping ${l.ping||0}ms, seen ${m}ms ago, dist ${u}u, pos ${g}, inScene: ${h?!!h.group.parent:!1}`}).join(" | ");lt.log("NET_STATS",`Peers (${o.length}): ${a}`)}}const r={thrust:this.playerShip.input.thrust,brake:this.playerShip.input.brake,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),pitch:(this.playerShip.input.pitchUp?1:0)-(this.playerShip.input.pitchDown?1:0)+this.playerShip.input.analogPitch,roll:(this.playerShip.input.rollRight?1:0)-(this.playerShip.input.rollLeft?1:0)};this.cockpit.update(s,r,this.playerShip.velocity),this.spaceEnv.update(s,this.playerShip.position,this.playerShip.velocity),this.broadcastTimer+=s,this.broadcastTimer>=this.broadcastInterval&&(this.broadcastTimer=0,this.network.broadcastLocalState({pos:{x:this.playerShip.position.x,y:this.playerShip.position.y,z:this.playerShip.position.z},quat:{x:this.playerShip.quaternion.x,y:this.playerShip.quaternion.y,z:this.playerShip.quaternion.z,w:this.playerShip.quaternion.w},vel:{x:this.playerShip.velocity.x,y:this.playerShip.velocity.y,z:this.playerShip.velocity.z},thrust:this.playerShip.input.thrust,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),hp:this.playerShip.hp,shield:this.playerShip.shield,isDead:this.playerShip.isDead,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,isInvisible:this.playerShip.isInvisible})),this.renderer.render(this.scene,this.camera),this.onHudUpdate({hp:this.playerShip.hp,maxHp:this.playerShip.maxHp,shield:Math.round(this.playerShip.shield),maxShield:this.playerShip.maxShield,speed:Math.round(this.playerShip.getSpeed()),maxSpeed:Math.round(this.playerShip.maxSpeed),laserEnergy:Math.round(this.weaponsSystem.laserEnergy),laserMaxEnergy:this.weaponsSystem.laserMaxEnergy,laserRecharging:this.weaponsSystem.laserCooldownTimer<=0&&this.weaponsSystem.laserEnergy<this.weaponsSystem.laserMaxEnergy,missileLocked:this.weaponsSystem.lockSystem.isLocked,missileLockProgress:this.weaponsSystem.lockSystem.getProgress(),missileTarget:this.weaponsSystem.lockSystem.targetScreenPos,storedPowerUp:this.playerShip.storedPowerUp,cannonEnergy:Math.round(this.weaponsSystem.cannonEnergy),cannonMaxEnergy:this.weaponsSystem.cannonMaxEnergy,cannonRecharging:this.weaponsSystem.cannonCooldownTimer<=0&&this.weaponsSystem.cannonEnergy<this.weaponsSystem.cannonMaxEnergy,safeRadius:Math.round(this.blackHoleSystem?this.blackHoleSystem.getSafeRadius():1e3),matchTimeRemaining:Math.max(0,Math.round(this.blackHoleSystem?this.blackHoleSystem.getMatchTimeRemaining():600)),isShieldBroken:this.playerShip.isShieldBroken,isInvisible:this.playerShip.isInvisible,hasHologramDecoy:this.playerShip.hasHologramDecoy,alivePilotsCount:[this.playerShip,...this.remoteShips.values()].filter(o=>!o.isDead).length,isVictoryRoyale:this.network.peers.size>0&&!this.playerShip.isDead&&Array.from(this.remoteShips.values()).every(o=>o.isDead),isDead:this.playerShip.isDead,respawnCountdown:Math.ceil(this.playerShip.respawnTimer),invulnerable:this.playerShip.invulnerableTimer>0,boostReady:this.playerShip.boostCooldownTimer<=0,boostCooldown:Math.ceil(this.playerShip.boostCooldownTimer),inactivityBeacon:this.network.peers.size>0&&this.timeSinceLastCombat>=30,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,activePeersCount:this.network.peers.size+1,isMaster:this.network.isMaster,masterId:this.network.currentMasterId,avgPing:this.network.getAveragePing()})}catch(e){lt.log("CRASH",`Render loop exception: ${e.message}
${e.stack}`)}}}destroy(){this.stop(),this.weaponsSystem&&this.weaponsSystem.cleanup(),this.thrusterTrails&&this.thrusterTrails.cleanup(),this.beaconSystem&&this.beaconSystem.cleanup(),this.meteorSystem&&this.meteorSystem.cleanup(),this.blackHoleSystem&&this.blackHoleSystem.cleanup(),this.powerUpSystem&&this.powerUpSystem.cleanup(),this.renderer&&this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}class Ty{constructor(e,t){this.container=e,this.engine=t,this.hudElement=null,this.createDom(),this.bindJoystick(),this.bindTouchControls(),this.bindFullscreen(),this.bindDiagnostics();const n=document.getElementById("hud-room-title");n&&this.engine&&this.engine.network&&(n.textContent=this.engine.network.roomName||this.engine.network.roomId||"Orion Sector")}createDom(){this.hudElement=document.createElement("div"),this.hudElement.className="game-hud-overlay",this.hudElement.innerHTML=`
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
            <span>⏳ <strong id="hud-timer-val">10:00</strong></span>
            <span>🌀 SAFE: <strong id="hud-safe-val">1100u</strong></span>
            <span>👥 <strong id="hud-alive-val">1</strong> Alive</span>
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
              <span class="meter-label">MISSILE [LOCK]</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-missile" id="hud-missile-bar" style="width: 0%;"></div>
              </div>
              <span class="meter-val" id="hud-missile-pct">READY</span>
            </div>

            <div class="hud-powerup-badge" id="hud-powerup-badge" style="display: none;"></div>

            <div class="hud-beacon-pill" id="hud-beacon-pill" style="display: none;">
              📡 BEACON ACTIVE
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

      <!-- 3D Target Lock Brackets -->
      <div class="hud-missile-lock-box" id="hud-missile-lock-box" style="display: none;">
        <div class="lock-bracket tl"></div>
        <div class="lock-bracket tr"></div>
        <div class="lock-bracket bl"></div>
        <div class="lock-bracket br"></div>
        <span class="lock-label" id="hud-lock-label">TRACKING 0%</span>
      </div>

      <div class="hud-combat-feed" id="hud-combat-feed"></div>
      <div class="hud-victory-banner" id="hud-victory-banner" style="display: none;">
        🏆 VICTORY ROYALE: LAST PILOT ALIVE!
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
    `,this.container.appendChild(this.hudElement)}bindJoystick(){const e=document.getElementById("touch-joystick-container"),t=document.getElementById("joystick-base"),n=document.getElementById("joystick-knob");if(!e||!t||!n)return;const s=this.engine.playerShip.input,r=45;let o=null,a=!1;const c=(h,u)=>{const f=t.getBoundingClientRect(),m=f.left+f.width/2,g=f.top+f.height/2;let v=h-m,p=u-g;const d=Math.sqrt(v*v+p*p);d>r&&(v=v/d*r,p=p/d*r),n.style.transform=`translate(${v}px, ${p}px)`,s.analogPitch=-(p/r),s.analogYaw=-(v/r)},l=()=>{o=null,a=!1,n.style.transform="translate(0px, 0px)",s.analogPitch=0,s.analogYaw=0};e.addEventListener("touchstart",h=>{if(h.preventDefault(),h.stopPropagation(),o===null&&h.touches.length>0){const u=h.touches[0];o=u.identifier,c(u.clientX,u.clientY),lt.log("TOUCH",`Joystick touchstart at (${Math.round(u.clientX)}, ${Math.round(u.clientY)})`)}},{passive:!1}),e.addEventListener("touchmove",h=>{if(h.preventDefault(),h.stopPropagation(),o!==null){for(let u=0;u<h.touches.length;u++)if(h.touches[u].identifier===o){c(h.touches[u].clientX,h.touches[u].clientY);break}}},{passive:!1}),e.addEventListener("touchend",h=>{h.preventDefault(),l()},{passive:!1}),e.addEventListener("touchcancel",h=>{l()},{passive:!1}),e.addEventListener("pointerdown",h=>{h.pointerType!=="touch"&&(h.preventDefault(),a=!0,c(h.clientX,h.clientY))}),window.addEventListener("pointermove",h=>{a&&c(h.clientX,h.clientY)}),window.addEventListener("pointerup",()=>{a&&l()})}bindTouchControls(){const e=this.engine.playerShip.input,t=(a,c,l)=>{const h=document.getElementById(a);if(!h)return;let u=!1;const f=g=>{g&&(g.preventDefault(),g.stopPropagation()),!u&&(u=!0,c(),h.classList.add("active"),lt.log("INPUT",`Button [${a}] ACTIVATED`))},m=g=>{u&&(u=!1,l(),h.classList.remove("active"),lt.log("INPUT",`Button [${a}] RELEASED`))};h.addEventListener("touchstart",f,{passive:!1}),h.addEventListener("touchend",m,{passive:!1}),h.addEventListener("touchcancel",m,{passive:!1}),h.addEventListener("pointerdown",g=>{g.pointerType!=="touch"&&f(g)}),h.addEventListener("pointerup",m),h.addEventListener("pointerleave",m),window.addEventListener("pointerup",m)};t("btn-roll-left",()=>e.rollLeft=!0,()=>e.rollLeft=!1),t("btn-roll-right",()=>e.rollRight=!0,()=>e.rollRight=!1),t("btn-strafe-left",()=>{ct.playStrafeBurst(),e.strafeLeft=!0},()=>e.strafeLeft=!1),t("btn-strafe-right",()=>{ct.playStrafeBurst(),e.strafeRight=!0},()=>e.strafeRight=!1),t("btn-thrust",()=>{this.engine.triggerBoostAction(),e.thrust=!0},()=>e.thrust=!1),t("btn-brake",()=>e.brake=!0,()=>e.brake=!1),t("btn-laser",()=>this.engine.isFiringLaser=!0,()=>this.engine.isFiringLaser=!1);const n=document.getElementById("btn-missile");if(n){const a=c=>{c&&(c.preventDefault(),c.stopPropagation()),this.engine.weaponsSystem.triggerSecondary(!0,this.engine.playerShip,performance.now())};n.addEventListener("click",a),n.addEventListener("touchstart",a,{passive:!1})}const s=document.getElementById("btn-special");if(s){const a=c=>{c&&(c.preventDefault(),c.stopPropagation());const l=this.engine.playerShip.useSpecialPowerUp(this.engine);l&&this.showCombatMessage(l.message)};s.addEventListener("click",a),s.addEventListener("touchstart",a,{passive:!1})}const r=document.getElementById("hud-btn-copy");r&&r.addEventListener("click",()=>{const a=window.location.origin+window.location.pathname+`?room=${encodeURIComponent(this.engine.network.roomId)}`;navigator.clipboard.writeText(a).then(()=>{r.textContent="✅ Copied!",setTimeout(()=>r.textContent="📋 Invite",2e3)}).catch(()=>{prompt("Share this match link:",a)})});const o=document.getElementById("hud-btn-leave");o&&o.addEventListener("click",()=>{confirm("Leave current match and return to lobby?")&&(window.location.href=window.location.origin+window.location.pathname)})}bindDiagnostics(){const e=document.getElementById("hud-btn-diag"),t=document.getElementById("hud-diag-backdrop"),n=document.getElementById("btn-close-diag"),s=document.getElementById("btn-copy-diag-text"),r=document.getElementById("diag-text-display");!e||!t||(e.addEventListener("click",()=>{r&&(r.textContent=lt.generateDiagnosticReport()),t.style.display="flex"}),n&&n.addEventListener("click",()=>{t.style.display="none"}),s&&s.addEventListener("click",async()=>{await lt.copyToClipboard(),s.textContent="✅ Copied to Clipboard!",setTimeout(()=>{s.textContent="📋 Copy Log to Clipboard"},2500)}))}bindFullscreen(){const e=document.getElementById("hud-btn-fullscreen"),t=document.getElementById("btn-rotate-fullscreen"),n=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement){const r=document.documentElement;r.requestFullscreen?r.requestFullscreen().catch(()=>{}):r.webkitRequestFullscreen&&r.webkitRequestFullscreen();try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}else document.exitFullscreen?document.exitFullscreen().catch(()=>{}):document.webkitExitFullscreen&&document.webkitExitFullscreen()};e&&e.addEventListener("click",n),t&&t.addEventListener("click",n);const s=()=>{const r=!!(document.fullscreenElement||document.webkitFullscreenElement);e&&(e.textContent=r?"⛶ Exit":"⛶ Fullscreen")};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}showCombatMessage(e){const t=document.getElementById("hud-combat-feed");if(!t)return;const n=document.createElement("div");n.className="combat-feed-item",n.textContent=e,t.appendChild(n),setTimeout(()=>{n.classList.add("fade-out"),setTimeout(()=>n.remove(),400)},3500)}update(e){const t=document.getElementById("hud-room-title");t&&(t.textContent=this.engine.network.roomName||"Orion Sector");const n=document.getElementById("hud-peers-count");n&&(n.textContent=`👥 ${e.activePeersCount} Pilot${e.activePeersCount===1?"":"s"}`);const s=document.getElementById("hud-ping-val");s&&(s.textContent=`📡 ${e.avgPing}ms`);const r=document.getElementById("hud-shield-bar"),o=document.getElementById("hud-shield-num"),a=Math.round((e.shield!==void 0?e.shield:100)/(e.maxShield||100)*100);r&&(r.style.width=`${a}%`),o&&(o.textContent=`${a}%`);const c=document.getElementById("hud-hp-bar"),l=document.getElementById("hud-hp-num"),h=Math.round(e.hp/e.maxHp*100);c&&(c.style.width=`${h}%`,c.className=h>35?"gauge-bar-fill bar-hp":"gauge-bar-fill bar-hp bar-hp-critical"),l&&(l.textContent=`${h}%`);const u=document.getElementById("hud-beacon-pill");u&&(u.style.display=e.inactivityBeacon?"inline-flex":"none");const f=document.getElementById("hud-shield-status");f&&(e.invulnerable?(f.textContent="🛡️ INVULNERABLE",f.style.color="#00ffff"):e.hp<=35?(f.textContent="CRITICAL",f.style.color="#ff3344"):(f.textContent="ACTIVE",f.style.color="#00ff88"));const m=document.getElementById("hud-score-val");m&&(m.textContent=e.score);const g=document.getElementById("hud-kills-val");g&&(g.textContent=e.kills);const v=document.getElementById("hud-deaths-val");v&&(v.textContent=e.deaths);const p=document.getElementById("hud-speed-val");p&&(p.textContent=e.speed);const d=document.getElementById("hud-boost-badge"),_=document.getElementById("btn-thrust");d&&(e.boostReady?(d.textContent="⚡ BOOST",d.className="hud-boost-badge ready",_&&_.classList.add("boost-ready")):(d.textContent=`${e.boostCooldown}s`,d.className="hud-boost-badge cooling",_&&_.classList.remove("boost-ready")));const x=document.getElementById("hud-timer-val");if(x&&e.matchTimeRemaining!==void 0){const Se=Math.floor(e.matchTimeRemaining/60),Le=e.matchTimeRemaining%60;x.textContent=`${Se.toString().padStart(2,"0")}:${Le.toString().padStart(2,"0")}`}const y=document.getElementById("hud-safe-val");y&&e.safeRadius!==void 0&&(y.textContent=`${e.safeRadius}u`);const A=document.getElementById("hud-alive-val");A&&e.alivePilotsCount!==void 0&&(A.textContent=e.alivePilotsCount);const b=document.getElementById("hud-shield-title");b&&(e.isShieldBroken?(b.textContent="SHIELD [BROKEN]",b.style.color="#ff3344"):(b.textContent="SHIELD",b.style.color="#00ffff"));const R=document.getElementById("hud-laser-bar"),D=document.getElementById("hud-laser-pct");R&&(R.style.width=`${e.laserEnergy||0}%`),D&&(D.textContent=`${e.laserEnergy||0}%`);const w=document.getElementById("hud-missile-bar"),M=document.getElementById("hud-missile-pct"),I=document.getElementById("btn-missile"),H=document.getElementById("btn-missile-text"),S=document.getElementById("btn-missile-status"),L=e.missileLockProgress||0,N=!!e.missileLocked;if(w&&(w.style.width=`${Math.round(L*100)}%`,w.className=N?"gauge-bar-fill bar-missile locked":"gauge-bar-fill bar-missile"),M&&(N?(M.textContent="LOCKED",M.style.color="#ff3344"):L>0?(M.textContent=`${Math.round(L*100)}%`,M.style.color="#ffcc00"):(M.textContent="READY",M.style.color="#00ffff")),I)if(N)I.classList.add("missile-locked"),H&&(H.textContent="MISSILE [READY]"),S&&(S.textContent="🔥 [LOCKED - FIRE!]");else if(L>0){I.classList.remove("missile-locked"),H&&(H.textContent="LOCKING...");const Se=(3*(1-L)).toFixed(1);S&&(S.textContent=`${Math.round(L*100)}% (${Se}s)`)}else I.classList.remove("missile-locked"),H&&(H.textContent="MISSILE"),S&&(S.textContent="[AIM TO LOCK (3s)]");const P=document.getElementById("btn-special"),z=document.getElementById("btn-special-icon"),k=document.getElementById("btn-special-text"),O=document.getElementById("btn-special-desc");P&&(e.storedPowerUp?(P.classList.remove("disabled"),P.classList.add("ready"),P.style.setProperty("--powerup-glow",e.storedPowerUp.color||"#00ffff"),z&&(z.textContent=e.storedPowerUp.icon||"✨"),k&&(k.textContent=e.storedPowerUp.name||"SPECIAL"),O&&(O.textContent="[USE (KEY R)]")):(P.classList.add("disabled"),P.classList.remove("ready"),P.style.removeProperty("--powerup-glow"),z&&(z.textContent="✨"),k&&(k.textContent="SPECIAL"),O&&(O.textContent="[EMPTY]")));const B=document.getElementById("hud-missile-lock-box"),Z=document.getElementById("hud-lock-label");if(B&&Z){const Se=e.missileTarget;Se&&Se.inFront&&L>0?(B.style.display="block",B.style.left=`${Se.x}%`,B.style.top=`${Se.y}%`,N?(B.className="hud-missile-lock-box locked",Z.textContent=`🎯 LOCKED [${Se.dist}u]`):(B.className="hud-missile-lock-box tracking",Z.textContent=`TRACKING ${Math.round(L*100)}% [${Se.dist}u]`)):B.style.display="none"}const ce=document.getElementById("hud-cannon-bar"),Me=document.getElementById("hud-cannon-pct");ce&&(ce.style.width=`${e.cannonEnergy||0}%`),Me&&(Me.textContent=`${e.cannonEnergy||0}%`);const X=document.getElementById("hud-powerup-badge");X&&(e.isInvisible?(X.style.display="inline-flex",X.textContent="👁️ CLOAKED",X.className="hud-powerup-badge cloak"):e.hasHologramDecoy?(X.style.display="inline-flex",X.textContent="👥 DECOY ARMED",X.className="hud-powerup-badge decoy"):X.style.display="none");const Q=document.getElementById("hud-victory-banner");Q&&(Q.style.display=e.isVictoryRoyale?"block":"none");const le=document.getElementById("hud-respawn-overlay"),ae=document.getElementById("hud-respawn-counter");le&&ae&&(e.isDead?(le.style.display="flex",ae.textContent=`Respawning in ${e.respawnCountdown}s...`):le.style.display="none")}destroy(){this.hudElement&&this.hudElement.parentNode&&this.hudElement.parentNode.removeChild(this.hudElement)}}const Ko=document.getElementById("app"),lh=["Nebula-Orion","Andromeda-Deep","Centauri-Prime","Cygnus-Rift","Cassiopeia-Void","Pegasus-Belt","Vela-Pulsar","Perseus-Arm"];function hh(){const i=lh[Math.floor(Math.random()*lh.length)],e=Math.floor(100+Math.random()*900);return`${i}-${e}`}class by{constructor(){this.currentMode="lobby",this.engine=null,this.network=null,this.hud=null,this.playerName=localStorage.getItem("rockets_pilot_name")||`Pilot-${Math.floor(1e3+Math.random()*9e3)}`,this.init()}init(){const t=new URLSearchParams(window.location.search).get("room");t?this.startMatch({roomId:t,roomName:t,mapSeed:Math.abs(this.hashCode(t))}):this.renderLobby()}hashCode(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return t}renderLobby(){this.currentMode="lobby",Ko.innerHTML=`
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
              <input type="text" id="sector-name-input" class="lobby-input" value="${hh()}" />
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
    `;const e=document.getElementById("pilot-name-input");e&&e.addEventListener("input",h=>{this.playerName=h.target.value.trim()||"Pilot",localStorage.setItem("rockets_pilot_name",this.playerName)});let t=window.__pwaDeferredPrompt;const n=document.getElementById("pwa-install-banner"),s=document.getElementById("btn-pwa-install");t&&n&&(n.style.display="flex"),window.addEventListener("beforeinstallprompt",h=>{h.preventDefault(),window.__pwaDeferredPrompt=h,n&&(n.style.display="flex")}),s&&s.addEventListener("click",()=>{const h=window.__pwaDeferredPrompt;h&&(h.prompt(),h.userChoice.then(()=>{n&&(n.style.display="none")}))});const r=document.getElementById("btn-create-match"),o=document.getElementById("sector-name-input");r&&r.addEventListener("click",()=>{const h=o.value.trim()||hh(),u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const a=document.getElementById("btn-direct-join"),c=document.getElementById("join-room-input");a&&a.addEventListener("click",()=>{const h=c.value.trim();if(!h){alert("Please enter a Room Code or Sector ID to join.");return}const u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const l=document.getElementById("btn-refresh-rooms");l&&l.addEventListener("click",()=>{di.refreshRooms()}),di.init(),di.onRoomsUpdated(h=>{this.updateRoomsListUI(h)})}updateRoomsListUI(e){const t=document.getElementById("rooms-list-container");if(!t)return;if(!e||e.length===0){t.innerHTML='<div class="rooms-empty">No active matches found. Click <strong>LAUNCH SECTOR</strong> above to host one!</div>';return}t.innerHTML=e.map(s=>`
      <div class="room-list-item">
        <div class="room-item-meta">
          <span class="room-item-name">🛰️ ${Zo(s.roomName||s.roomId)}</span>
          <div class="room-item-details">
            <span>👥 ${s.playerCount||1} Pilot${s.playerCount===1?"":"s"}</span>
            <span>👑 Host: Pilot-${(s.masterId||"Host").slice(0,4)}</span>
            <span class="room-ttl-badge">⏳ TTL: ${s.ttlSecondsRemaining}s</span>
          </div>
        </div>
        <button class="btn-join-room-item" data-room-id="${Zo(s.roomId)}" data-room-name="${Zo(s.roomName||s.roomId)}" data-seed="${s.mapSeed||42}">
          JOIN SECTOR
        </button>
      </div>
    `).join(""),t.querySelectorAll(".btn-join-room-item").forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-room-id"),o=s.getAttribute("data-room-name"),a=parseInt(s.getAttribute("data-seed"),10)||42;this.startMatch({roomId:r,roomName:o,mapSeed:a})})})}startMatch({roomId:e,roomName:t,mapSeed:n}){this.currentMode="game",Ko.innerHTML="";const s=document.createElement("div");s.id="game-canvas-container",s.style.width="100%",s.style.height="100%",s.style.position="relative",s.style.overflow="hidden",Ko.appendChild(s);const r=`${window.location.pathname}?room=${encodeURIComponent(e)}`;window.history.pushState({path:r},"",r),this.network=new Jf({roomId:e,roomName:t,mapSeed:n,playerName:this.playerName,onCombatLog:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.engine=new Ey({container:s,network:this.network,mapSeed:n,onHudUpdate:o=>{this.hud&&this.hud.update(o)},onDeathNotice:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.hud=new Ty(s,this.engine);try{this.network.join()}catch(o){console.error("[Network] joinRoom exception:",(o==null?void 0:o.message)||o)}this.engine.start()}}function Zo(i){return i?i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}new by;
//# sourceMappingURL=index-CHXNHP58.js.map
