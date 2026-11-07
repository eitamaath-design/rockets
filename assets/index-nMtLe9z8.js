var ju=Object.defineProperty;var Ku=(i,e,t)=>e in i?ju(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var kt=(i,e,t)=>Ku(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const Ka=Object.freeze,qn=0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,Vs=0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,uh=0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,dh=0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,Zu=Ka({p:qn,n:Vs,h:1n,a:0n,b:7n,Gx:uh,Gy:dh}),cn=32,wc=i=>i instanceof Uint8Array||ArrayBuffer.isView(i)&&i.constructor.name==="Uint8Array"&&i.BYTES_PER_ELEMENT===1,Kt=(i,e,t="")=>{if(wc(i)&&(e===void 0||i.length===e))return i;const n=wc(i),s=e!==void 0?` of length ${e}`:"",r=n?`length=${i.length}`:`type=${typeof i}`,o=(t?`"${t}" `:"")+"expected Uint8Array"+s+", got "+r;throw n?new RangeError(o):new TypeError(o)},Ju=i=>Uint8Array.from(i),Qu=(i,e,t)=>Ju(Kt(i,t,e)),fh=(i,e)=>i.toString(16).padStart(e,"0"),ph=i=>{let e="";for(const t of Kt(i))e+=fh(t,2);return e},mh=i=>{const e="hex invalid";if(typeof i!="string")throw new TypeError(e);if(i.length%2||!/^[\da-f]*$/i.test(i))throw new RangeError(e);const t=new Uint8Array(i.length/2);for(let n=0,s=0;n<t.length;n++,s+=2){const r=i.charCodeAt(s),o=i.charCodeAt(s+1);t[n]=((r&15)+(r>>6)*9)*16+(o&15)+(o>>6)*9}return t},Ec=()=>{var e;const i=(e=globalThis==null?void 0:globalThis.crypto)==null?void 0:e.subtle;if(i)return i;throw new Error("crypto.subtle must be defined, consider polyfill")},Ki=(...i)=>{let e=0;for(const s of i)e+=Kt(s).length;const t=new Uint8Array(e);let n=0;for(const s of i)t.set(s,n),n+=s.length;return t},Za=(i=cn)=>{const e=globalThis==null?void 0:globalThis.crypto;if(typeof(e==null?void 0:e.getRandomValues)!="function")throw new Error("crypto.getRandomValues must be defined, consider polyfill");return e.getRandomValues(new Uint8Array(i))},ed=BigInt,Hs=(i,e,t,n="bad number: out of range")=>{if(typeof i!="bigint")throw new TypeError(n);if(e<=i&&i<t)return i;throw new RangeError(n)},Re=(i,e=qn)=>(i%=e)>=0n?i:e+i,Wr=i=>Re(i,Vs),td=(i,e)=>{if(i===0n)throw new Error("invert: expected non-zero number");if(e<=1n)throw new Error("invert: expected modulus > 1, got "+e);let t=Re(i,e),n=e,s=0n,r=1n;for(;t!==0n;){const a=n/t,c=n-t*a,l=s-r*a;n=t,t=c,s=r,r=l}if(n!==1n)throw new Error("invert: does not exist");return Re(s,e)},gh=i=>{const e=rd[i];if(typeof e!="function")throw new Error("hashes."+i+" not set");return e},bc=(i,e,t)=>Kt(gh(i)(e,t),cn,"digest"),Tc=async(i,e,t)=>Kt(await gh(i)(e,t),cn,"digest"),no=i=>{if(i instanceof Kn)return i;throw new TypeError("Point expected")},io="bad point: not on curve",vh=i=>Re(Re(i*i)*i+7n),Ac=i=>Hs(i,0n,qn),Cs=i=>Hs(i,1n,qn),_h=i=>Hs(i,1n,Vs),Xr=i=>!(i&1n),nd=i=>Uint8Array.of(Xr(i)?2:3),yh=i=>{const e=vh(Cs(i));let t=1n;for(let n=e,s=(qn+1n)/4n;s>0n;s>>=1n)s&1n&&(t=t*n%qn),n=n*n%qn;if(Re(t*t)!==e)throw new Error("sqrt invalid");return new Kn(i,Xr(t)?t:Re(-t),1n)},bn=class bn{constructor(e,t,n){kt(this,"X");kt(this,"Y");kt(this,"Z");this.X=Ac(e),this.Y=Cs(t),this.Z=Ac(n),Ka(this)}static CURVE(){return Zu}static fromAffine(e){const{x:t,y:n}=e;return t===0n&&n===0n?Ps:new bn(t,n,1n)}static fromBytes(e){Kt(e);const t=e.length,n=e[0],s=Or(e,1,33);try{if(t===33&&(n===2||n===3)){const r=yh(s);return n===3?r.negate():r}if(t===65&&n===4)return new bn(s,Or(e,33,65),1n).assertValidity()}catch{throw new Error(io)}throw new Error(io)}static fromHex(e){return bn.fromBytes(mh(e))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){const{X:t,Y:n,Z:s}=this,{X:r,Y:o,Z:a}=no(e);return Re(t*a)===Re(r*s)&&Re(n*a)===Re(o*s)}is0(){return this.Z===0n}negate(){return new bn(this.X,Re(-this.Y),this.Z)}double(){return this.add(this)}add(e){const{X:t,Y:n,Z:s}=this,{X:r,Y:o,Z:a}=no(e),c=0n,l=7n;let h=0n,u=0n,f=0n;const m=Re(l*3n);let g=Re(t*r),_=Re(n*o),p=Re(s*a),d=Re(t+n),v=Re(r+o);d=Re(d*v),v=Re(g+_),d=Re(d-v),v=Re(t+s);let y=Re(r+a);return v=Re(v*y),y=Re(g+p),v=Re(v-y),y=Re(n+s),h=Re(o+a),y=Re(y*h),h=Re(_+p),y=Re(y-h),f=Re(c*v),h=Re(m*p),f=Re(h+f),h=Re(_-f),f=Re(_+f),u=Re(h*f),_=Re(g+g),_=Re(_+g),p=Re(c*p),v=Re(m*v),_=Re(_+p),p=Re(g-p),p=Re(c*p),v=Re(v+p),g=Re(_*v),u=Re(u+g),g=Re(y*v),h=Re(d*h),h=Re(h-g),g=Re(d*_),f=Re(y*f),f=Re(f+g),new bn(h,u,f)}subtract(e){return this.add(no(e).negate())}multiply(e,t=!0){if(!t&&e===0n)return Ps;if(_h(e),e===1n)return this;if(this.equals(gi))return fd(e).p;let n=Ps,s=gi,r=this;for(let o=0;t?o<256:e>0n;o++)e&1n?n=n.add(r):t&&(s=s.add(r)),r=r.double(),e>>=1n;return n}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){const{X:e,Y:t,Z:n}=this;if(n===0n)return{x:0n,y:0n};if(n===1n)return{x:e,y:t};const s=td(n,qn);if(Re(n*s)!==1n)throw new Error("inverse invalid");return{x:Re(e*s),y:Re(t*s)}}assertValidity(){const{x:e,y:t}=this.toAffine();if(Cs(e),Cs(t),Re(t*t)!==vh(e))throw new Error(io);return this}toBytes(e=!0){const{x:t,y:n}=this.assertValidity().toAffine(),s=Pn(t);return e?Ki(nd(n),s):Ki(Uint8Array.of(4),s,Pn(n))}toHex(e){return ph(this.toBytes(e))}};kt(bn,"BASE"),kt(bn,"ZERO");let Kn=bn;const gi=new Kn(uh,dh,1n),Ps=new Kn(0n,1n,0n);Kn.BASE=gi;Kn.ZERO=Ps;const id=(i,e,t)=>gi.multiply(e,!1).add(i.multiply(t,!1)).assertValidity(),Si=i=>ed("0x"+(ph(i)||"0")),Or=(i,e,t)=>Si(i.subarray(e,t)),Pn=i=>mh(fh(Hs(i,0n,2n**256n),cn*2)),sd=i=>{const e=Si(Kt(i,cn,"secret key"));return Hs(e,1n,Vs,"invalid secret key: outside of range")},Rc="SHA-256",rd={hmacSha256Async:async(i,e)=>{const t=Ec(),n=await t.importKey("raw",i,{name:"HMAC",hash:Rc},!1,["sign"]);return new Uint8Array(await t.sign("HMAC",n,e))},hmacSha256:void 0,sha256Async:async i=>new Uint8Array(await Ec().digest(Rc,i)),sha256:void 0},od=i=>{if(i=i===void 0?Za(48):i,Kt(i),i.length<48||i.length>1024)throw new RangeError("expected 48-1024b");const e=Re(Si(i),Vs-1n);return Pn(e+1n)},ad=i=>e=>{const t=od(e);return{secretKey:t,publicKey:i(t)}},xh=i=>Uint8Array.from("BIP0340/"+i,e=>e.charCodeAt(0)),Jo=(i,...e)=>{const t=bc("sha256",xh(i));return bc("sha256",Ki(t,t,...e))},Qo=(i,...e)=>Tc("sha256Async",xh(i)).then(t=>Tc("sha256Async",Ki(t,t,...e))),Ja=i=>{const e=sd(i),t=gi.multiply(e),{x:n,y:s}=t.assertValidity().toAffine(),r=Xr(s)?e:Wr(-e),o=Pn(n);return{d:r,px:o}},Qa=i=>Wr(Si(i)),Mh=(...i)=>Qa(Jo("challenge",...i)),Sh=async(...i)=>Qa(await Qo("challenge",...i)),wh=i=>Ja(i).px,cd=ad(wh),Eh=(i,e,t)=>{const n=Qu(i,"message"),{px:s,d:r}=Ja(e);return{m:n,px:s,d:r,a:Kt(t,cn)}},bh=i=>{const e=Qa(i);if(e===0n)throw new Error("sign failed: k is zero");const{px:t,d:n}=Ja(Pn(e));return{rx:t,k:n}},Th=(i,e,t,n)=>Ki(e,Pn(Wr(i+t*n))),Ah="invalid signature produced",ld=(i,e,t=Za(cn))=>{const{m:n,px:s,d:r,a:o}=Eh(i,e,t),a=Pn(r^Si(Jo("aux",o))),{rx:c,k:l}=bh(Jo("nonce",a,s,n)),h=Th(l,c,Mh(c,s,n),r);if(!Ch(h,n,s))throw new Error(Ah);return h},hd=async(i,e,t=Za(cn))=>{const{m:n,px:s,d:r,a:o}=Eh(i,e,t),a=Pn(r^Si(await Qo("aux",o))),{rx:c,k:l}=bh(await Qo("nonce",a,s,n)),h=Th(l,c,await Sh(c,s,n),r);if(!await Ph(h,n,s))throw new Error(Ah);return h},ud=(i,e)=>i instanceof Promise?i.then(e):e(i),Rh=(i,e,t,n)=>{const s=Kt(i,64,"signature"),r=Kt(e,void 0,"message"),o=Kt(t,cn,"publicKey");let a,c,l,h;try{const u=Si(o);a=yh(u),c=Cs(Or(s,0,cn)),l=_h(Or(s,cn,64)),h=Ki(Pn(c),o,r)}catch{return!1}return ud(n(h),u=>{try{const{x:f,y:m}=id(a,l,Wr(-u)).toAffine();return!(!Xr(m)||f!==c)}catch{return!1}})},Ch=(i,e,t)=>Rh(i,e,t,Mh),Ph=async(i,e,t)=>Rh(i,e,t,Sh),Lh=Ka({keygen:cd,getPublicKey:wh,sign:ld,verify:Ch,signAsync:hd,verifyAsync:Ph}),dd=()=>{const i=[];let e=gi,t=e;for(let n=0;n<33;n++){t=e,i.push(t);for(let s=1;s<128;s++)t=t.add(e),i.push(t);e=t.double()}return i};let Cc;const Pc=(i,e)=>{const t=e.negate();return i?t:e},fd=i=>{const e=Cc||(Cc=dd());let t=Ps,n=gi;for(let s=0;s<33;s++){let r=Number(i&255n);i>>=8n,r>128&&(r-=256,i+=1n);const o=s*128,a=o+Math.abs(r)-1,c=s%2!==0,l=r<0;r===0?n=n.add(Pc(c,e[o])):t=t.add(Pc(l,e[a]))}if(i!==0n)throw new Error("invalid wnaf");return{p:t,f:n}},{floor:ea,min:pd,sin:md}=Math,Ct="Trystero",ec=(i,e)=>Array(i).fill(void 0).map(e),gd="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",wi=i=>ec(i,()=>gd[ea(Math.random()*62)]??"").join(""),At=wi(20),Ei=Promise.all.bind(Promise),Dh=typeof window<"u",{entries:Zi,fromEntries:Ih,keys:rn,values:wn}=Object,St=()=>{},Uh="candidate",Ye=i=>(i!==null&&clearTimeout(i),null),qe=i=>new Error(`${Ct}: ${i}`),Ji=(i,e)=>i instanceof Error&&i.message?i.message:typeof i=="string"&&i?i:Ut(i??e),Xn=(i,e)=>i instanceof Error?i:qe(Ji(i,e)),vd=new TextEncoder,_d=new TextDecoder,Tn=i=>vd.encode(i),pi=i=>_d.decode(i),Ns=i=>i.reduce((e,t)=>e+t.toString(16).padStart(2,"0"),""),Qi=(...i)=>i.join("@"),yd=(i,e)=>{const t=[...i],n=()=>{const r=md(e++)*1e4;return r-ea(r)};let s=t.length;for(;s;){const r=ea(n()*s--),o=t[s];t[s]=t[r],t[r]=o}return t},xd=(i,e,t,n=!1)=>{var s,r;return((s=i.relayConfig)==null?void 0:s.urls)||(n?yd(e,Nh(i.appId)):e).slice(0,((r=i.relayConfig)==null?void 0:r.redundancy)??t)},Ut=JSON.stringify,Gs=i=>{try{return JSON.parse(i)}catch{throw qe(`failed to parse JSON: ${i}`)}},Nh=(i,e=Number.MAX_SAFE_INTEGER)=>i.split("").reduce((t,n)=>t+n.charCodeAt(0),0)%e,Lc=3333,Md=6e4,fs={};let Ls=null,Ds=null;const Sd=()=>{Ls||(Ls=new Promise(i=>{Ds=i}).finally(()=>{Ds=null,Ls=null}))},wd=()=>{Ds==null||Ds()},Ed=(i,e,t)=>{const n={};let s=!1,r=!1,o,a=St;n.isClosed=!1,n.ready=new Promise(l=>a=l);const c=()=>{if(n.isClosed)return;o=void 0,r=!1;const l=new WebSocket(i);l.onclose=()=>{if(n.isClosed||r)return;if(r=!0,Ls){Ls.then(c);return}const h=fs[i]??(fs[i]=Lc);o=setTimeout(c,Math.random()*h),fs[i]=pd(h*2,Md)},l.onmessage=h=>e(String(h.data)),n.socket=l,n.url=l.url,l.onopen=()=>{const h=s;s=!0,a(n),fs[i]=Lc,h&&(t==null||t())},n.send=h=>{l.readyState===1&&l.send(h)}};return n.close=()=>{n.isClosed=!0,o!==void 0&&(clearTimeout(o),o=void 0),n.socket.close()},c(),n},bd=i=>{const e={},t=new WeakMap,n=o=>{const a=t.get(o);if(!a)throw qe("relay bookkeeping missing registration for relay client");return a},s=()=>{const o={},a=c=>o[c]??(o[c]={});return{forKey:a,forRelay:c=>a(n(c))}},r=(o,a)=>(e[o]=a,t.set(a,o),a);return{register:(o,a)=>{const c=e[o];return c||r(o,a())},keyOf:n,scoped:s,getSockets:()=>Ih(Zi(e).flatMap(([o,a])=>{const c=i(a);return c?[[o,c]]:[]}))}},Td=()=>{if(Dh){const i=new AbortController;return addEventListener("online",wd,{signal:i.signal}),addEventListener("offline",Sd,{signal:i.signal}),()=>i.abort()}return St},tc="AES-GCM",so={},Ad=i=>btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(i)))),Rd=i=>{const e=atob(i);return new Uint8Array(e.length).map((t,n)=>e.charCodeAt(n)).buffer},qr=async(i,e)=>new Uint8Array(await crypto.subtle.digest(i,Tn(e))),es=async i=>so[i]??(so[i]=Array.from(await qr("SHA-1",i)).map(e=>e.toString(36)).join("")),Cd=async(i,e,t)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},Tn(`${i}:${e}:${t}`)),{name:tc},!1,["encrypt","decrypt"]),Pd=async(i,e)=>Ns(await qr("SHA-256",`${Ct}:${i}:${e}`)),Fh="$",Oh=",",Ld=async(i,e)=>{const t=crypto.getRandomValues(new Uint8Array(16));return t.join(Oh)+Fh+Ad(await crypto.subtle.encrypt({name:tc,iv:t},await i,Tn(e)))},Dd=async(i,e)=>{const[t,n]=e.split(Fh);return pi(await crypto.subtle.decrypt({name:tc,iv:new Uint8Array((t==null?void 0:t.split(Oh).map(Number))??[])},await i,Rd(n??"")))},Id=18e4;var Ud=class{constructor(i){kt(this,"makeOffer");kt(this,"leased",new Map);kt(this,"destroyed",!1);this.makeOffer=i}claimLeased(i){const e=this.leased.get(i);e&&(Ye(e),this.leased.delete(i))}reclaimLeased(i){this.leased.has(i)&&(this.claimLeased(i),i.destroy())}checkout(i,e,t){const n=async(s=!1)=>{if(this.destroyed)throw qe("room left while preparing offer");const r=this.makeOffer();try{const o=await t(r);if(this.destroyed)throw qe("room left while preparing offer");return e?(this.leased.set(r,setTimeout(()=>{this.leased.delete(r),r.destroy()},Id)),{peer:r,offer:o,claim:()=>this.claimLeased(r),reclaim:()=>this.reclaimLeased(r)}):{peer:r,offer:o}}catch(o){if(r.destroy(),!s&&!this.destroyed)return n(!0);throw o}};return Ei(ec(i,()=>n()))}getOffers(i,e){return this.checkout(i,!0,e)}destroy(){this.destroyed=!0,this.leased.forEach((i,e)=>{Ye(i),e.destroy()}),this.leased.clear()}};const ro=qe("incorrect password for overlapping room"),Nd=(i,e,t)=>{const n=o=>qr("SHA-256",`${o}:${i}:${e}:${t}`).then(Ns),s=async(o,a,c)=>{if(!i)return;if(c){const h=wi(36);await o({__trystero_pw:"challenge",c:h});const{data:u}=await a();if(!u||typeof u!="object"||u.__trystero_pw!=="response"||typeof u.h!="string")throw ro;const f=await n(h);if(u.h!==f)throw ro;return}const{data:l}=await a();if(!l||typeof l!="object"||l.__trystero_pw!=="challenge"||typeof l.c!="string")throw ro;await o({__trystero_pw:"response",h:await n(l.c)})};return{run:s,compose:o=>i||o?async(a,c,l,h)=>{await s(c,l,h),await(o==null?void 0:o(a,c,l,h))}:void 0}},Fd=i=>{const e=Ji(i,"unknown error");return e.startsWith("handshake ")?e:`handshake failed: ${e}`},Od=({onPeerHandshake:i,onHandshakeError:e,handshakeTimeoutMs:t,sendHandshakeData:n,sendHandshakeReady:s,onActivate:r,onFailure:o})=>{const a={},c=(u,f)=>{const m=a[u];!m||f&&m.peer!==f||m.isActive||!m.didLocalHandshakePass||!m.didReceiveRemoteReady||(m.isActive=!0,m.handshakeTimer=Ye(m.handshakeTimer),r(u,m.peer))},l=(u,f,m)=>{const g=a[u];if(!g||g.peer!==f)return;const _=Fd(m);e==null||e(u,_),o(u,f,qe(_))},h=(u,f)=>{const m=a[u];!m||m.peer!==f||m.isActive||(m.didLocalHandshakePass=!0,s("",u).catch(g=>l(u,f,qe(`failed sending handshake readiness: ${Ji(g,"unknown send failure")}`))),c(u,f))};return{addPeer:(u,f)=>{a[u]={peer:f,isActive:!1,didLocalHandshakePass:!1,didReceiveRemoteReady:!1,handshakeTimer:null,pendingHandshakePayloads:[],handshakeWaiters:[]}},clearPeer:(u,f)=>{const m=a[u];m&&(m.handshakeTimer=Ye(m.handshakeTimer),m.pendingHandshakePayloads.length=0,m.handshakeWaiters.splice(0).forEach(g=>g.reject(f)),delete a[u])},canReceiveFromPeer:(u,f)=>{const m=a[u];return!!(m&&(m.isActive||f))},start:(u,f)=>{const m=a[u];if(!m||m.peer!==f)return;m.handshakeTimer=setTimeout(()=>l(u,f,qe(`handshake timed out after ${t}ms`)),t);const g=async(d,v)=>{await n(d,u,v)},_=()=>new Promise((d,v)=>{const y=a[u];if(!y||y.peer!==f){v(qe("peer disconnected during handshake"));return}const x=y.pendingHandshakePayloads.shift();if(x){d(x);return}y.handshakeWaiters.push({resolve:d,reject:R=>v(R)})}),p=At<u;Promise.resolve(i==null?void 0:i(u,g,_,p)).then(()=>h(u,f)).catch(d=>l(u,f,Xn(d,"handshake failed")))},receiveHandshakeData:(u,f,m)=>{const g=a[f];if(!g||g.isActive)return;const _=m===void 0?{data:u}:{data:u,metadata:m},p=g.handshakeWaiters.shift();if(p){p.resolve(_);return}if(g.pendingHandshakePayloads.length>=16){l(f,g.peer,qe("too many pending handshake messages"));return}g.pendingHandshakePayloads.push(_)},receiveHandshakeReady:u=>{const f=a[u];!f||f.isActive||(f.didReceiveRemoteReady=!0,c(u))}}},Bh=16384,ta=1e4,Br=12e4,Bd=15e3,kd=150,zd=5e3,Dc="icecandidate",Ic="icegatheringstatechange",Vd="iceconnectionstatechange",ps="offer",Hd="answer",Gd=/out of range/i,Wd=128,Xd=8192,Uc=i=>i.replace(/ (\S+\.local) (\d+) typ host/g," 127.0.0.1 $2 typ host");var Nc=(i,{trickleIce:e,rtcConfig:t,rtcPolyfill:n,turnConfig:s,_test_only_mdnsHostFallbackToLoopback:r})=>{const o=new(n??RTCPeerConnection)({iceServers:Fc.concat(s??[]),...t}),a={},c=new Set,l=[],h=[];let u=null;const f=e!==!1,m=[],g=[];let _,p=!1,d=!1,v=null,y=null,x=!1;const R=Y=>{_&&(_(Y),_=void 0)},T=()=>y=Ye(y),A=()=>{var Y;x||(x=!0,c.forEach(Q=>Q()),u=Ye(u),h.length=0,T(),(Y=a.close)==null||Y.call(a))},L=Y=>{Y.type===ps&&(R(Y),!a.signal&&!o.remoteDescription)||(a.signal?a.signal(Y):l.push(Y))},w=Y=>{const Q=a.signal;a.signal=ue=>{Q==null||Q(ue),Y(ue)},l.length>0&&l.splice(0).forEach(ue=>{var F;return(F=a.signal)==null?void 0:F.call(a,ue)})},M=Y=>r?Uc(Y):Y,I=Y=>{if(!r||typeof Y.candidate!="string")return Y;const Q=Uc(Y.candidate);return Q===Y.candidate?Y:{...Y,candidate:Q}},W=Y=>{var Q,ue;return{type:((Q=Y.localDescription)==null?void 0:Q.type)??ps,sdp:M(((ue=Y.localDescription)==null?void 0:ue.sdp)??"")}},S=()=>{var Q,ue;const Y=(Q=o.remoteDescription)==null?void 0:Q.sdp;return Y?((ue=Y.match(/a=ice-ufrag:([^\s]+)/))==null?void 0:ue[1])??null:null},D=()=>{var Y,Q;return(((Q=(Y=o.remoteDescription)==null?void 0:Y.sdp)==null?void 0:Q.match(/^m=/gm))??[]).length},N=Y=>{if(!o.remoteDescription)return!1;const Q=D();if(typeof Y.sdpMLineIndex=="number"&&Q>0&&Y.sdpMLineIndex>=Q)return!1;const ue=S();return!(ue&&Y.usernameFragment&&Y.usernameFragment!==ue)},P=async Y=>{try{return await o.addIceCandidate(Y),!0}catch(Q){if(Q instanceof Error&&Gd.test(Q.message)&&typeof Y.sdpMLineIndex=="number")return!1;throw Q}},z=Y=>{m.length>=Wd&&m.shift(),m.push(Y)},B=async()=>{if(!o.remoteDescription||m.length===0)return;const Y=S(),Q=m.splice(0),ue=[];for(const F of Q)if(!(Y&&F.usernameFragment&&F.usernameFragment!==Y)){if(!N(F)){ue.push(F);continue}await P(F)||ue.push(F)}ue.forEach(z)},O=async Y=>{if(N(Y)){await P(Y)||z(Y);return}z(Y)},k=Y=>{Y.binaryType="arraybuffer",Y.bufferedAmountLowThreshold=65535;const Q=()=>{console.warn(`${Ct}: invalid or excessive data before handler registration; disconnecting peer`),Y.close(),o.close(),A()};Y.onmessage=ue=>{const F=ue.data;if(!x){if(!(F instanceof ArrayBuffer)&&!ArrayBuffer.isView(F)||F.byteLength>16515){Q();return}if(a.data)a.data(F);else{if(h.length>=64){Q();return}u||(u=setTimeout(Q,ta)),h.push(F)}}},Y.onopen=()=>{var ue;return(ue=a.connect)==null?void 0:ue.call(a)},Y.onclose=A,Y.onerror=({error:ue})=>{var F;x||(ue==null?void 0:ue.errorDetail)==="sctp-failure"&&(ue.sctpCauseCode===12||/^User-Initiated Abort\b/.test(ue.message))||(F=a.error)==null||F.call(a,Xn(ue,"data channel error"))}},Z=(t==null?void 0:t.iceServers)??Fc.concat(s??[]),le=Y=>Z.some(({urls:Q})=>(Array.isArray(Q)?Q:[Q]).some(ue=>Y.test(ue))),Me=le(/^turns?:/i),X=!Me&&le(/^stuns?:/i),te=Me?/\btyp relay\b/:X?/\btyp (?:srflx|relay|prflx)\b/:/\btyp (?:host|srflx|relay|prflx)\b/,he=async Y=>(await new Promise(Q=>{let ue=null,F=null;const Fe=()=>{Ye(ue),Ye(F),Y.removeEventListener(Ic,Be),Y.removeEventListener(Dc,we),c.delete(Fe),Q()},Ne=(Ee="")=>{var C;const me=`${((C=Y.localDescription)==null?void 0:C.sdp)??""}
${Ee}`;te.test(me)&&(Ye(F),F=setTimeout(Fe,kd))},Be=()=>{Y.iceGatheringState==="complete"||x?Fe():Ne()},we=Ee=>{const{candidate:me}=Ee;me?Ne(me.candidate):Fe()};c.add(Fe),ue=setTimeout(Fe,Bd),Y.addEventListener(Ic,Be),Y.addEventListener(Dc,we),Be()}),W(Y)),ae=async()=>{const Y=f?W(o):await he(o);return x||L(Y),Y};i?(v=o.createDataChannel("data"),k(v)):o.ondatachannel=({channel:Y})=>{v=Y,k(Y)};const Ce=async(Y=!1)=>{var Q,ue;if(o.connectionState==="closed"||!Y&&(p||o.signalingState!=="stable")){o.connectionState==="closed"&&R();return}try{return p=!0,Y&&(o.remoteDescription&&o.signalingState!=="stable"&&o.signalingState!=="closed"&&((Q=o.localDescription)==null?void 0:Q.type)===ps&&await o.setLocalDescription({type:"rollback"}),typeof o.restartIce=="function"&&o.restartIce()),await o.setLocalDescription(Y?await o.createOffer({iceRestart:!0}):void 0),await ae()}catch(F){Y||R(),(ue=a.error)==null||ue.call(a,Xn(F,"failed to create local offer"))}finally{p=!1}};o.onnegotiationneeded=async()=>Ce(!1),o.onicecandidate=({candidate:Y})=>{if(!f||!Y)return;const Q=I(typeof Y.toJSON=="function"?Y.toJSON():{candidate:Y.candidate,sdpMid:Y.sdpMid,sdpMLineIndex:Y.sdpMLineIndex,usernameFragment:Y.usernameFragment});L({type:Uh,sdp:JSON.stringify(Q)})};const De=()=>{if(o.connectionState==="failed"||o.connectionState==="closed"||o.iceConnectionState==="failed"||o.iceConnectionState==="closed"){A();return}if(o.connectionState==="connected"||o.connectionState==="connecting"||o.iceConnectionState==="connected"||o.iceConnectionState==="completed"||o.iceConnectionState==="checking"){T();return}if(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected"){y||(y=setTimeout(()=>{y=null,(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected")&&A()},zd));return}};o.onconnectionstatechange=De,o.addEventListener(Vd,De),o.ontrack=Y=>{var ue,F;const Q=Y.streams[0];if(Q){if(!a.track&&!a.stream){g.push({track:Y.track,stream:Q});return}(ue=a.track)==null||ue.call(a,Y.track,Q),(F=a.stream)==null||F.call(a,Q)}};const Ue=i?new Promise(Y=>{_=Y}):Promise.resolve();return i&&queueMicrotask(()=>{var Y;!p&&o.signalingState==="stable"&&!o.localDescription&&o.connectionState!=="closed"&&((Y=o.onnegotiationneeded)==null||Y.call(o,new Event("negotiationneeded")))}),{connection:o,get channel(){return v},get isDead(){return o.connectionState==="closed"},getOffer:async(Y=!1)=>{var Q;if(i)return Y?Ce(!0):_?Ue:((Q=o.localDescription)==null?void 0:Q.type)===ps?f?W(o):he(o):Ue},async signal(Y){var Q,ue,F;if(Y.type==="candidate"){if(Y.sdp.length>Xd)return;try{const Fe=JSON.parse(Y.sdp);Fe&&typeof Fe=="object"&&await O(I(Fe))}catch(Fe){(Q=a.error)==null||Q.call(a,Xn(Fe,"failed to parse remote candidate"))}return}if(!((v==null?void 0:v.readyState)==="open"&&!((ue=Y.sdp)!=null&&ue.includes("a=rtpmap"))))try{const Fe={...Y,sdp:M(Y.sdp)};if(Y.type===ps){const Ne=p||o.signalingState!=="stable"&&!d;return Ne&&i?void 0:(Ne&&o.signalingState!=="stable"?await Ei([o.setLocalDescription({type:"rollback"}),o.setRemoteDescription(Fe)]):await o.setRemoteDescription(Fe),await B(),await o.setLocalDescription(),await ae())}if(Y.type===Hd){d=!0;try{await o.setRemoteDescription(Fe),await B()}finally{d=!1}}}catch(Fe){(F=a.error)==null||F.call(a,Xn(Fe,"failed to apply remote signal"))}},sendData:Y=>v==null?void 0:v.send(Y),destroy:()=>{T(),R(),v==null||v.close(),o.close(),p=!1,d=!1,A()},setHandlers:Y=>{const{signal:Q,...ue}=Y;Object.assign(a,ue),a.data&&h.length>0&&(u=Ye(u),h.splice(0).forEach(F=>{var Fe;return(Fe=a.data)==null?void 0:Fe.call(a,F)})),Q&&w(Q),(a.track||a.stream)&&g.length>0&&g.splice(0).forEach(({track:F,stream:Fe})=>{var Ne,Be;(Ne=a.track)==null||Ne.call(a,F,Fe),(Be=a.stream)==null||Be.call(a,Fe)})},addStream:Y=>Y.getTracks().forEach(Q=>o.addTrack(Q,Y)),removeStream:Y=>o.getSenders().filter(Q=>Q.track&&Y.getTracks().includes(Q.track)).forEach(Q=>o.removeTrack(Q)),addTrack:(Y,Q)=>o.addTrack(Y,Q),removeTrack:Y=>{const Q=o.getSenders().find(ue=>ue.track===Y);Q&&o.removeTrack(Q)},replaceTrack:(Y,Q)=>{const ue=o.getSenders().find(F=>F.track===Y);if(ue)return ue.replaceTrack(Q)}}};const Fc=[...ec(3,(i,e)=>`stun:stun${e||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(i=>({urls:i})),qd=1024,$d=64,Yd=128,jd=8,Kd=new Uint8Array,Zd=(i,e)=>{let t;try{t=i()}catch{return e(!1)}return typeof t=="boolean"?e(t):Promise.resolve(t).then(n=>e(n===!0),()=>e(!1))},Oc=(i,e,t)=>e===2?t?i.slice():i:e===1?Gs(pi(i)):pi(i),kh=(i,e,t,n)=>{try{i.progress(e,t,n)}catch(s){console.error(`${Ct} progress handler error:`,s)}},Bc=(i,e,t,n)=>{var s;kh(i,1,t,n);try{(s=i.receiver)==null||s.call(i,e,t,n)}catch(r){console.error(`${Ct} action handler error:`,r)}},Jd=({fail:i,accept:e,refuse:t,maxReceiveBytes:n,chunkSize:s})=>{const r=new Map,o=new Map,a=new Set,c=new Map;let l=0,h=0,u=0,f=!1,m=!1;const g=S=>S.phase!=="released",_=S=>Math.min(n,(S==null?void 0:S.maxPayloadBytes)??n),p=(S,D,N,P)=>{var z,B;N==null||N.reject(D),(B=(z=r.get(S.type))==null?void 0:z.reject)==null||B.call(z,S.peerId,S.metadata,D),P!==void 0&&t(S.peerId,P,D)},d=S=>{for(const D of Array.from(a))D.peerId===S&&(a.delete(D),a.add(D))},v=S=>{var N,P;if(!g(S))return;S.phase="released",(N=S.removeAbortListener)==null||N.call(S),S.timer=Ye(S.timer);const D=o.get(S.peerId);if(S.kind==="inline"){const z=D.inline.get(S.key);z.splice(z.indexOf(S),1),z.length||D.inline.delete(S.key),S.data=Kd}else D.bulk.delete(S.id),a.delete(S),S.data=null,S.transfer==="receiving"&&(u-=S.size,D.active===S&&(D.active=null,d(S.peerId)),m=!0);D.count--,l--,D.count||o.delete(S.peerId),(P=S.controller)==null||P.abort()},y=(S,D)=>{g(S)&&(v(S),p(S,D,S.scope,S.kind==="bulk"?S.id:void 0))},x=(S,D)=>{if(S.phase!=="pending")return S.phase==="ready";if(S.size>_(D))return y(S,"payload exceeds receiver size limit"),!1;const N=S.scope?S.scope.receive:D.receive;if(!N)return D.receiver?(S.phase="ready",!0):!1;if(h>=Yd||(c.get(S.peerId)??0)>=jd)return y(S,"too many pending receive decisions"),!1;S.phase="deciding";const P=new AbortController;S.controller=P,h++,c.set(S.peerId,(c.get(S.peerId)??0)+1);const z=Zd(()=>N({byteLength:S.size,peerId:S.peerId,signal:P.signal,...S.metadata===void 0?{}:{metadata:S.metadata}}),B=>{h--;const O=c.get(S.peerId)-1;return O?c.set(S.peerId,O):c.delete(S.peerId),g(S)?(B?S.phase="ready":y(S,"payload rejected by receiver"),B):!1});return typeof z=="boolean"?z:(z.then(()=>w()),!1)},R=(S,D,N)=>{let P;try{P=Oc(N,S.format,S.kind==="inline")}catch{v(S),i(S.peerId,"invalid action payload");return}v(S),Bc(D,P,S.peerId,S.metadata)},T=S=>{const D=r.get(S.type);g(S)&&D&&x(S,D)&&D.receiver&&R(S,D,S.data)},A=S=>{const D=r.get(S.type);if(!g(S)||!D||!x(S,D)||!D.receiver)return;if(S.transfer==="receiving"){S.offset===S.size&&R(S,D,S.data);return}const N=o.get(S.peerId);!N.active&&u+S.size<=n&&(N.active=S,S.transfer="receiving",u+=S.size,S.lastSeen=Date.now(),a.delete(S),e(S.peerId,S.id))},L=(S,D)=>{var P;const N=(P=o.get(S))==null?void 0:P.inline.get(D);for(;N!=null&&N[0];){const z=N[0];if(T(z),g(z))break}},w=()=>{if(f){m=!0;return}f=!0;try{do{m=!1;for(const S of a)A(S);for(const[S,D]of o){for(const N of D.bulk.values())N.offset===N.size&&A(N);for(const N of D.inline.keys())L(S,N)}}while(m)}finally{f=!1}},M=S=>{let D=o.get(S.peerId);if(l>=qd||((D==null?void 0:D.count)??0)>=$d)return p(S,"too many pending transfers",S.scope,S.kind==="bulk"?S.id:void 0),!1;if(D||(D={bulk:new Map,inline:new Map,active:null,count:0},o.set(S.peerId,D)),D.count++,l++,S.kind==="inline"){const P=D.inline.get(S.key)??[];P.push(S),D.inline.set(S.key,P)}else D.bulk.set(S.id,S),a.add(S);const N=()=>{const P=Br-(Date.now()-S.lastSeen);P>0?S.timer=setTimeout(N,P):(y(S,"action transfer timed out"),w())};if(S.timer=setTimeout(N,Br),S.scope){const{signal:P}=S.scope,z=()=>{y(S,"receive cancelled"),w()};if(P.addEventListener("abort",z,{once:!0}),S.removeAbortListener=()=>P.removeEventListener("abort",z),P.aborted)return z(),!1}return!0},I=(S,D)=>{var z;const N=r.get(S.type),P=(z=N==null?void 0:N.receiveScope)==null?void 0:z.call(N,S.peerId,S.metadata);return P===null||P!=null&&P.signal.aborted?(D!==void 0&&t(S.peerId,D,"unexpected response"),null):S.size>_(N)?(p(S,"payload exceeds receiver size limit",P,D),null):{action:N,scope:P}},W=(S,D)=>({...S,...D?{scope:D}:{},phase:"pending",controller:null,lastSeen:Date.now(),timer:null});return{register:(S,D={})=>{const N={...D,receiver:null,receive:null,reject:null,progress:St};return r.set(S,N),{onMessage:P=>{N.receiver=P,w()},onReceive:P=>{N.receive=P,w()},onReject:P=>{N.reject=P},onProgress:P=>{N.progress=P}}},receiveInline:(S,D)=>{var k;const N=I(S);if(!N)return;const{action:P,scope:z}=N,B=z?`${S.type}\0${z.key}`:S.type;if(P!=null&&P.receiver&&!(z?z.receive:P.receive)&&!((k=o.get(S.peerId))!=null&&k.inline.has(B))){let Z;try{Z=Oc(D,S.format,!0)}catch{i(S.peerId,"invalid action payload");return}Bc(P,Z,S.peerId,S.metadata);return}const O={...W(S,z),kind:"inline",key:B,data:D};M(O)&&L(S.peerId,B)},receiveOffer:(S,D)=>{var z;if((z=o.get(S.peerId))!=null&&z.bulk.has(D)){i(S.peerId,"duplicate action offer");return}const N=I(S,D);if(!N)return;const P={...W(S,N.scope),kind:"bulk",id:D,transfer:"waiting",offset:0,data:null};M(P)&&w()},receiveChunk:(S,D,N,P)=>{var k;const z=o.get(S),B=z==null?void 0:z.bulk.get(D);if(!B)return;if(B.transfer!=="receiving"||N!==B.offset||!P.length||P.length!==Math.min(s,B.size-B.offset)){i(S,"invalid action chunk offset or length");return}try{B.data??(B.data=new Uint8Array(B.size))}catch{y(B,"unable to allocate receive buffer"),w();return}B.data.set(P,B.offset),B.offset+=P.length;const O=Date.now();B.lastSeen=O;for(const Z of a)Z.phase==="ready"&&((k=r.get(Z.type))!=null&&k.receiver)&&(Z.lastSeen=O);B.offset===B.size?(A(B),g(B)&&(z==null?void 0:z.active)===B&&(z.active=null,d(S)),w()):kh(r.get(B.type),B.offset/B.size,S,B.metadata)},cancel:(S,D)=>{var P,z;const N=(P=o.get(S))==null?void 0:P.bulk.get(D);N&&(v(N),(z=N.scope)==null||z.reject("response cancelled by sender")),w()},clearPeer:S=>{const D=o.get(S);if(D){for(const N of D.bulk.values())v(N);for(const N of D.inline.values()){const P=[...N];for(const z of P)v(z)}}w()}}},na=2,Js=0,Qs=1,kc=2,oo=3,ao=4,er=5,co=36,zc=48,Vn=6,bs=14,lo=Bh-bs,Qd=256*1024**2,Vc=1024**2,Hc="bufferedamountlow",Gc="close",Wc="error",ef=1e4,Hn=(i,e)=>{const t=qe(e);return t.kind=i,t.name=i==="aborted"?"AbortError":t.name,t},ia=i=>{if(i!=null&&i.aborted)throw Hn("aborted","operation aborted")},Xc=(i,e,t=Vn)=>{const n=new Uint8Array(t);return n[0]=na,n[1]=i,new DataView(n.buffer).setUint32(2,e),n},Ai=Hn,tf=(i,e,t=ef)=>i.readyState!=="open"||i.bufferedAmount<=i.bufferedAmountLowThreshold?Promise.resolve(i.readyState==="open"):new Promise(n=>{let s=!1,r=null;const o=l=>{s||(s=!0,i.removeEventListener(Hc,a),i.removeEventListener(Gc,c),i.removeEventListener(Wc,c),e==null||e.removeEventListener("abort",c),Ye(r),n(l))},a=()=>o(!0),c=()=>o(!1);if(i.addEventListener(Hc,a),i.addEventListener(Gc,c),i.addEventListener(Wc,c),e==null||e.addEventListener("abort",c,{once:!0}),r=setTimeout(()=>o(!1),t),i.readyState!=="open"||e!=null&&e.aborted){o(!1);return}i.bufferedAmount<=i.bufferedAmountLowThreshold&&o(!0)}),nf=({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,throwIfAborted:s=ia,maxReceiveBytes:r=Qd})=>{if(!Number.isSafeInteger(r)||r<=0)throw qe("maxReceiveBytes must be a positive safe integer");const o=new Map,a=new Map,c=new WeakSet;let l=0;const h=Jd({fail:(p,d)=>f(p,d),accept:(p,d)=>m(p,d,oo),refuse:(p,d,v)=>m(p,d,ao,v),maxReceiveBytes:r,chunkSize:lo}),u=p=>{var d;for(const v of((d=a.get(p))==null?void 0:d.values())??[])v.fail(Ai("disconnected","peer disconnected"));a.delete(p),h.clearPeer(p)},f=(p,d)=>{const v=i(p,!0);v&&!c.has(v)&&(c.add(v),console.warn(`${Ct}: ${d}; disconnecting peer ${p}`),n(p,qe(d)))},m=(p,d,v,y="")=>{var A;const x=i(p,!0);if(!x)return;const R=Tn(y).subarray(0,200),T=Xc(v,d,Vn+R.length);T.set(R,Vn);try{if((((A=x.channel)==null?void 0:A.bufferedAmount)??0)>Vc)throw qe("control send buffer is full");x.sendData(T)}catch{f(p,"unable to send action control")}};return{makeInternalAction:(p,d={})=>{const v={sendToPending:!!d.sendToPending,receiveWhilePending:!!d.receiveWhilePending,...d.maxPayloadBytes===void 0?{}:{maxPayloadBytes:d.maxPayloadBytes},...d.receiveScope?{receiveScope:d.receiveScope}:{}},y=o.get(p);if(y){if(y.options.sendToPending!==v.sendToPending||y.options.receiveWhilePending!==v.receiveWhilePending||y.options.receiveScope!==v.receiveScope||y.options.maxPayloadBytes!==v.maxPayloadBytes)throw qe(`action type "${p}" cannot be redefined`);return y.action}const x=Tn(p);if(!p||p.includes("\0")||x.length>32)throw qe("action type must contain 1–32 UTF-8 bytes and no null characters");const R={options:v,action:{...h.register(p,v),send:async(T,A,L,w,M)=>{if(s(M),T===void 0)throw qe("action data cannot be undefined");const I=T instanceof Blob,W=I||T instanceof ArrayBuffer||ArrayBuffer.isView(T),S=W?2:typeof T=="string"?0:1;let D=I?T:T instanceof ArrayBuffer?new Uint8Array(T):ArrayBuffer.isView(T)?new Uint8Array(T.buffer,T.byteOffset,T.byteLength):Tn(S===0?T:Ut(T));const N=D instanceof Blob?D.size:D.byteLength,P=L===void 0?new Uint8Array:Tn(Ut(L));if(P.length>16336)throw qe("action metadata is too large");const z=co+P.length+N<=Bh;!z&&W&&!(D instanceof Blob)&&(D=D.slice());const B=z?0:l++>>>0,O=z?co:zc,k=new Uint8Array(O+P.length+(z?N:0));k[0]=na,k[1]=(z?Js:Qs)|S<<4,k.set(x,2);const Z=new DataView(k.buffer);Z.setUint16(34,P.length),z||(Z.setUint32(36,B),Z.setFloat64(40,N)),k.set(P,O),z&&k.set(D instanceof Blob?new Uint8Array(await D.arrayBuffer()):D,O+P.length);const le=A?Array.isArray(A)?A:[A]:e(v.sendToPending);await Ei([...new Set(le)].map(async Me=>{const X=i(Me,v.sendToPending);if(!X){console.warn(`${Ct}: no peer with id ${Me} found`);return}let te=null;const he=()=>{var Ee;if(te)throw te;if(s(M),i(Me,v.sendToPending)!==X||((Ee=X.channel)==null?void 0:Ee.readyState)==="closed")throw Ai("disconnected","peer disconnected")},ae=async Ee=>{he();const me=X.channel;if(me&&(me.readyState!=="open"||me.bufferedAmount>me.bufferedAmountLowThreshold)){if(!await tf(me,M))throw s(M),Ai("disconnected","data channel stopped draining");he()}try{X.sendData(Ee)}catch{throw Ai("disconnected","peer disconnected")}};if(z){await ae(k),w==null||w(1,Me,L);return}let Ce=!1,De=!1,Ue=Date.now(),Y,Q;const ue=new Promise((Ee,me)=>{Y=Ee,Q=me});ue.catch(St);const F=a.get(Me)??new Map;if(F.has(B))throw qe("action transmission id is still in use");a.set(Me,F);let Fe=null;const Ne={accept:()=>!Fe||te?!1:(Fe=Ye(Fe),Y(),!0),fail:(Ee,me=!1)=>{me&&(De=!0),te=Ee,Q(Ee)},touch:()=>{Fe&&(Ue=Date.now())}};F.set(B,Ne);const Be=()=>{const Ee=Br-(Date.now()-Ue);Ee>0?Fe=setTimeout(Be,Ee):Ne.fail(Ai("timeout","action offer timed out"))};Fe=setTimeout(Be,Br);const we=()=>{try{s(M)}catch(Ee){Ne.fail(Ee)}};M==null||M.addEventListener("abort",we,{once:!0});try{await ae(k),Ce=!0,await ue;for(let Ee=0;Ee<N;Ee+=lo){he();const me=Math.min(lo,N-Ee),C=Xc(kc,B,bs+me);new DataView(C.buffer).setFloat64(Vn,Ee),C.set(D instanceof Blob?new Uint8Array(await D.slice(Ee,Ee+me).arrayBuffer()):D.subarray(Ee,Ee+me),bs),await ae(C);for(const E of F.values())E.touch();w==null||w((Ee+me)/N,Me,L)}he()}catch(Ee){throw Ce&&!De&&i(Me,!0)===X&&(!X.channel||X.channel.readyState==="open"&&(X.channel.bufferedAmount??0)<=Vc)&&m(Me,B,er),Ee}finally{Fe=Ye(Fe),M==null||M.removeEventListener("abort",we),F.delete(B),!F.size&&a.get(Me)===F&&a.delete(Me)}}))}}};return o.set(p,R),R.action},handleData:(p,d)=>{var N,P,z;if(d.byteLength<2||d.byteLength>16384){f(p,"invalid action frame");return}const v=new Uint8Array(d);if(v[0]!==na){f(p,"incompatible action protocol version");return}const y=v[1]&15,x=v[1]>>>4,R=new DataView(v.buffer,v.byteOffset,v.byteLength);if(y>er||x>2||y>Qs&&x!==0){f(p,"invalid action frame");return}if(y>=kc){if(v.length<Vn||(y===oo||y===er)&&v.length!==Vn||y===ao&&v.length>206){f(p,"invalid action control");return}const B=R.getUint32(2);if(y===oo){const O=a.get(p);if((N=O==null?void 0:O.get(B))!=null&&N.accept())for(const k of O.values())k.touch();return}if(y===ao){(z=(P=a.get(p))==null?void 0:P.get(B))==null||z.fail(Ai("rejected",pi(v.subarray(Vn))),!0);return}y===er?h.cancel(p,B):h.receiveChunk(p,B,v.length>=bs?R.getFloat64(Vn):NaN,v.subarray(bs));return}const T=y===Js?co:zc;if(v.length<T){f(p,"invalid action header");return}const A=pi(v.subarray(2,34)).replaceAll("\0",""),L=o.get(A);if(!t(p,!!(L!=null&&L.options.receiveWhilePending)))return;const w=R.getUint16(34),M=T+w,I=y===Js?v.length-M:R.getFloat64(40),W=y===Qs?R.getUint32(36):0;if(!A||M>v.length||!Number.isSafeInteger(I)||I<0||y===Qs&&(I===0||M!==v.length)){f(p,"invalid action proposal");return}let S;try{w&&(S=Gs(pi(v.subarray(T,M))))}catch{f(p,"invalid action metadata");return}const D={peerId:p,type:A,format:x,size:I,...S===void 0?{}:{metadata:S}};y===Js?h.receiveInline(D,v.subarray(M)):h.receiveOffer(D,W)},clearPeer:u}},zh=i=>i&&typeof i=="object"&&!Array.isArray(i)&&typeof i.r=="string"?i:null,tr=i=>{const e=zh(i);return e?{r:e.r,...Object.hasOwn(e,"m")?{m:e.m}:{}}:null},ho=i=>{const e=zh(i);return e?{r:e.r,...typeof e.e=="string"?{e:e.e}:{}}:null},ms=(i,e)=>e===void 0?i:{...i,metadata:e},sf=({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,maxReceiveBytes:s})=>{const r=Object.create(null),o={},a=new Map,c=nf({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,...s===void 0?{}:{maxReceiveBytes:s}}),l=c.makeInternalAction,h=c.handleData,u=p=>{const d=o[p];d&&(Ye(d.timer),d.signal&&d.abortHandler&&d.signal.removeEventListener("abort",d.abortHandler),delete o[p],d.controller.abort())},f=(p,d)=>{Zi(o).forEach(([v,y])=>{y.peerId===p&&(u(v),y.reject(d))})},m=(p,d)=>{c.clearPeer(p);const v=a.get(p);v&&(a.delete(p),v.forEach(y=>y.abort())),f(p,Hn("disconnected",Ji(d,"peer disconnected")))},g=l("@_response",{receiveScope:(p,d)=>{const v=ho(d),y=v&&o[v.r];if(!v||!y||y.peerId!==p)return null;const x=v.e===void 0?y.getReceive():null;return{key:v.r,signal:y.controller.signal,receive:x?R=>x({byteLength:R.byteLength,peerId:R.peerId,kind:"response",signal:R.signal}):null,reject:R=>{o[v.r]===y&&(u(v.r),y.reject(Hn("rejected",R)))}}}});return g.onProgress((p,d,v)=>{var R;const y=ho(v),x=y&&o[y.r];x&&x.peerId===d&&(y==null?void 0:y.e)===void 0&&((R=x.getReceiveProgress())==null||R(p,{peerId:d}))}),g.onMessage((p,d,v)=>{const y=ho(v);if(!y)return;const x=o[y.r];if(!(!x||x.peerId!==d)){if(u(y.r),y.e!==void 0){x.reject(Hn("rejected",y.e));return}x.resolve(p)}}),{makeAction:(p,d)=>{if(d&&"onRequest"in d&&d.kind!=="request")throw qe('request actions must use kind: "request"');const v=(d==null?void 0:d.kind)??"message",y=l(p),x=r[p];if(x){if(x.kind!==v)throw qe(`action type "${p}" cannot be redefined`);return x.action}const R={kind:v,action:null,onReceive:(d==null?void 0:d.onReceive)??null,onReceiveProgress:(d==null?void 0:d.onReceiveProgress)??null},T=(S,D)=>S?(N,P)=>S(N,ms({peerId:P},D)):void 0,A=(S,D,N)=>{var z;const P=R.kind==="request"?tr(N):null;(z=R.onReceiveProgress)==null||z.call(R,S,ms({peerId:D},P?P.m:N))},L=S=>{R.onReceive=S,y.onReceive(S?D=>{const N=v==="request"?tr(D.metadata):null;return S(ms({byteLength:D.byteLength,peerId:D.peerId,signal:D.signal,kind:v},N?N.m:D.metadata))}:null)};if(L(R.onReceive),y.onProgress(A),v==="message"){let S=(d==null?void 0:d.onMessage)??null;const D=(P,z,B)=>{const O=S;Promise.resolve().then(()=>O(P,ms({peerId:z},B))).catch(k=>console.error(`${Ct} action handler error:`,k))},N={send:async(P,z={})=>{await y.send(P,z.target,z.metadata,T(z.onProgress,z.metadata),z.signal)},get onMessage(){return S},set onMessage(P){S=P,y.onMessage(P?D:null)},get onReceive(){return R.onReceive},set onReceive(P){L(P)},get onReceiveProgress(){return R.onReceiveProgress},set onReceiveProgress(P){R.onReceiveProgress=P}};return R.action=N,r[p]=R,y.onMessage(S?D:null),N}y.onReject((S,D,N)=>{const P=tr(D);P&&g.send(null,S,{r:P.r,e:N}).catch(St)});let w=(d==null?void 0:d.onRequest)??null;const M=(S,D,N)=>{const P=tr(N);if(!P)return;const z=w,B=new AbortController;let O=a.get(D);O||(O=new Set,a.set(D,O)),O.add(B),Promise.resolve().then(async()=>{const k=await z(S,{...ms({peerId:D},P.m),signal:B.signal});if(k===void 0)throw qe("request handler returned undefined");return k}).then(k=>g.send(k,D,{r:P.r}),k=>g.send(null,D,{r:P.r,e:Ji(k,"request failed").slice(0,512)})).catch(St).finally(()=>{const k=a.get(D);k==null||k.delete(B),k&&!k.size&&a.delete(D),B.abort()})},I=async(S,D)=>{const{target:N,metadata:P,onProgress:z,signal:B,timeoutMs:O}=D;if(ia(B),!i(N,!1))throw Hn("disconnected",`no active peer with id ${N}`);const k=wi(20),Z=new AbortController,le=new Promise((Me,X)=>{const te={controller:Z,getReceive:()=>R.onReceive,getReceiveProgress:()=>R.onReceiveProgress,peerId:N,resolve:Me,reject:X,timer:null,...B===void 0?{}:{signal:B}},he=()=>{u(k),X(Hn("aborted","operation aborted"))};B&&(te.abortHandler=he,B.addEventListener("abort",he,{once:!0})),o[k]=te,O!==void 0&&(te.timer=setTimeout(()=>{u(k),te.reject(Hn("timeout","request timed out"))},O))});try{const Me=y.send(S,N,P===void 0?{r:k}:{r:k,m:P},T(z,P),Z.signal);return await Promise.race([le,Me.then(()=>le)])}finally{u(k)}},W={request:I,requestMany:async(S,D)=>{const{targets:N,onResult:P,...z}=D;return ia(z.signal),await Ei(N.map(async B=>{try{const O={peerId:B,status:"fulfilled",value:await I(S,{...z,target:B})};return P==null||P(O),O}catch(O){const k=Xn(O,"request failed");if(k.kind==="aborted"||!k.kind)throw k;const Z=k.kind==="timeout"?{peerId:B,status:"timeout"}:k.kind==="disconnected"?{peerId:B,status:"disconnected"}:{peerId:B,status:"rejected",error:k};return P==null||P(Z),Z}}))},get onRequest(){return w},set onRequest(S){w=S,y.onMessage(S?M:null)},get onReceive(){return R.onReceive},set onReceive(S){L(S)},get onReceiveProgress(){return R.onReceiveProgress},set onReceiveProgress(S){R.onReceiveProgress=S}};return R.action=W,r[p]=R,y.onMessage(w?M:null),W},makeInternalAction:l,handleData:h,clearPeer:m}},qc=i=>i&&typeof i=="object"&&!Array.isArray(i)&&typeof i.k=="string"?{key:i.k,...typeof i.s=="string"?{streamId:i.s}:{},...typeof i.t=="string"?{trackId:i.t}:{},...Object.hasOwn(i,"m")?{metadata:i.m}:{}}:null,$c=i=>e=>{let t=i.get(e);return t||(t=wi(20),i.set(e,t)),t},sa=()=>{const i=new WeakMap,e=new WeakMap,t=new Map,n=new Map,s=new Map,r=new Map,o=new WeakMap,a=new WeakMap;return{getStreamKey:$c(i),getTrackKey:$c(e),rememberRemoteStream:(c,l,h)=>{var f;const u=o.get(l);u!==void 0&&t.get(u)===l&&t.delete(u),o.set(l,c),t.set(c,l),h&&n.set(h,l),(f=l.getTracks)==null||f.call(l).forEach(m=>{typeof m.id=="string"&&r.set(m.id,{track:m,stream:l})})},getRemoteStream:(c,l)=>t.get(c)??(l?n.get(l):void 0),rememberRemoteTrack:(c,l,h,u,f)=>{var _;const m={track:l,stream:h},g=a.get(l);g!==void 0&&((_=s.get(g))==null?void 0:_.track)===l&&s.delete(g),a.set(l,c),s.set(c,m),u&&r.set(u,m),f&&n.set(f,h)},getRemoteTrack:(c,l)=>s.get(c)??(l?r.get(l):void 0),hasRemoteMedia:()=>t.size>0||s.size>0,clearRemote:()=>{t.clear(),n.clear(),s.clear(),r.clear()}}},rf=({iterate:i,isActive:e,getSharedMediaPeer:t,onPeerError:n})=>{const s={},r={},o={},a=sa(),c=_=>{var p;return((p=t(_))==null?void 0:p.__trysteroMedia)??o[_]??(o[_]=sa())},l=(_,p,d,v)=>{const y=_[p]??(_[p]=[]);if(y.length>=64){console.warn(`${Ct}: too many pending ${v} metadata messages`),n(p,qe("too many pending media metadata messages"));return}y.push(d)},h=(_,p,d)=>{if(!(_!=null&&_.length))return;const v=p?_.findIndex(y=>{const x=d(y);return!x||x===p}):0;return v>=0?_.splice(v,1)[0]:void 0},u=(_,p,d,v)=>{var y;e(_)&&(c(_).rememberRemoteStream(p,d,typeof d.id=="string"?d.id:void 0),(y=g.onPeerStream)==null||y.call(g,d,_,v))},f=(_,p,d,v,y)=>{var x;e(_)&&(c(_).rememberRemoteTrack(p,d,v,typeof d.id=="string"?d.id:void 0,typeof v.id=="string"?v.id:void 0),(x=g.onPeerTrack)==null||x.call(g,d,v,_,y))},m=(_,p,d,v,y,x={})=>{const R={k:p,...x,...d===void 0?{}:{m:d}};return i(_,async(T,A)=>{await v(R,T),await y(A)})},g={addStream:(_,p,d)=>m(p.target,a.getStreamKey(_),p.metadata,d,v=>v.addStream(_),{s:_.id}),removeStream:(_,p)=>{i(p,(d,v)=>v.removeStream(_))},addTrack:(_,p,d,v)=>m(d.target,a.getTrackKey(_),d.metadata,v,y=>y.addTrack(_,p),{s:p.id,t:_.id}),removeTrack:(_,p)=>{i(p,(d,v)=>v.removeTrack(_))},replaceTrack:(_,p,d,v)=>m(d.target,a.getTrackKey(p),d.metadata,v,y=>y.replaceTrack(_,p),{t:_.id}),receiveStreamMeta:(_,p)=>{if(!e(p))return;const d=qc(_);if(!d)return;const v=c(p).getRemoteStream(d.key,d.streamId);if(v!=null&&v.getTracks().length){u(p,d.key,v,d.metadata);return}l(s,p,d,"stream")},receiveTrackMeta:(_,p)=>{if(!e(p))return;const d=qc(_);if(!d)return;const v=c(p).getRemoteTrack(d.key,d.trackId);if(v&&v.track.readyState!=="ended"&&(!v.stream.getTracks||v.stream.getTracks().includes(v.track))){f(p,d.key,v.track,v.stream,d.metadata);return}l(r,p,d,"track")},receiveRemoteStream:(_,p)=>{if(!e(_))return;const d=h(s[_],typeof p.id=="string"?p.id:void 0,v=>v.streamId);d&&u(_,d.key,p,d.metadata)},receiveRemoteTrack:(_,p,d)=>{if(!e(_))return;const v=r[_],y=typeof p.id=="string"?p.id:void 0,x=typeof d.id=="string"?d.id:void 0,R=v&&y?v.findIndex(A=>A.trackId===y):-1,T=R>=0?v==null?void 0:v.splice(R,1)[0]:h(v,x,A=>A.streamId);T&&f(_,T.key,p,d,T.metadata)},clearPeer:_=>{delete s[_],delete r[_],delete o[_]},onPeerStream:null,onPeerTrack:null};return g},Yc="beforeunload",of=1e4,Un=i=>"@_"+i,Ts=new Set,jc=()=>Ts.forEach(i=>i()),af=i=>(Ts.add(i),Ts.size===1&&addEventListener(Yc,jc),()=>{Ts.delete(i),Ts.size||removeEventListener(Yc,jc)});var cf=(i,e,t,{onPeerHandshake:n,onHandshakeError:s,handshakeTimeoutMs:r=of,maxReceiveBytes:o,isPassive:a=!1,onBeforeLeave:c}={})=>{const l={},h={},u={},f={onPeerJoin:null,onPeerLeave:null};let m=St,g=null;const _=(O,k)=>(O?Array.isArray(O)?O:[O]:rn(h)).flatMap(Z=>{const le=h[Z];return le?[Promise.resolve(k(Z,le))]:(console.warn(`${Ct}: no peer with id ${Z} found`),[])}),p=(O,k,Z)=>{const le=l[O];!le||k&&le!==k||(N.send("",O).catch(St),L(O,le,Z))},d=(O,k)=>p(O,void 0,k),v=rf({onPeerError:d,iterate:(O,k)=>_(O,(Z,le)=>k(Z,le)),isActive:O=>!!h[O],getSharedMediaPeer:O=>l[O]??null}),y=sf({onPeerError:d,...o===void 0?{}:{maxReceiveBytes:o},getPeer:(O,k)=>(k?l:h)[O],getPeerIds:O=>rn(O?l:h),canReceiveFromPeer:(O,k)=>B.canReceiveFromPeer(O,k)}),x=y.makeInternalAction,R=y.handleData,T=y.makeAction,A=(O,k=qe("peer disconnected"))=>{var le;const Z=Xn(k,"peer disconnected");B.clearPeer(O,Z),delete l[O],delete h[O],y.clearPeer(O,Z),(le=u[O])==null||le.splice(0).forEach(Me=>Me.reject(Z)),delete u[O],v.clearPeer(O)},L=(O,k,Z)=>{var X;const le=l[O];if(!le||k&&le!==k)return;const Me=!!h[O];A(O,Z),le.destroy(),Me&&((X=f.onPeerLeave)==null||X.call(f,O)),e(O)},w=()=>g??(g=(async()=>{c==null||c();const O=new AbortController;N.send("",void 0,void 0,void 0,O.signal).catch(St),await new Promise(k=>setTimeout(k,99)),O.abort();try{Zi(l).forEach(([k,Z])=>{Z.destroy(),A(k,qe("room left"))})}finally{try{m()}finally{t()}}})()),M=x(Un("ping")),I=x(Un("pong")),W=x(Un("signal")),S=x(Un("stream"),{maxPayloadBytes:65536}),D=x(Un("track"),{maxPayloadBytes:65536}),N=x(Un("leave"),{sendToPending:!0,receiveWhilePending:!0}),P=x(Un("hsdata"),{sendToPending:!0,receiveWhilePending:!0,maxPayloadBytes:65536}),z=x(Un("hsready"),{sendToPending:!0,receiveWhilePending:!0}),B=Od({...n===void 0?{}:{onPeerHandshake:n},...s===void 0?{}:{onHandshakeError:s},handshakeTimeoutMs:r,sendHandshakeData:P.send,sendHandshakeReady:z.send,onActivate:(O,k)=>{var Z;h[O]=k,k.setHandlers({signal:le=>{h[O]===k&&W.send(le,O).catch(St)}}),(Z=f.onPeerJoin)==null||Z.call(f,O)},onFailure:(O,k,Z)=>p(O,k,Z)});return M.onMessage((O,k)=>{I.send("",k).catch(St)}),I.onMessage((O,k)=>{var le;const Z=u[k];(le=Z==null?void 0:Z.shift())==null||le.resolve(),Z&&!Z.length&&delete u[k]}),W.onMessage((O,k)=>{var Z;(Z=h[k])==null||Z.signal(O)}),S.onMessage((O,k)=>v.receiveStreamMeta(O,k)),D.onMessage((O,k)=>v.receiveTrackMeta(O,k)),N.onMessage((O,k)=>L(k,void 0,qe("peer left room"))),P.onMessage((O,k,Z)=>B.receiveHandshakeData(O,k,Z)),z.onMessage((O,k)=>B.receiveHandshakeReady(k)),i((O,k)=>{const Z=l[k];if(Z){if(Z===O)return;Z.destroy(),A(k,qe("peer replaced"))}l[k]=O,B.addPeer(k,O),O.setHandlers({data:le=>{l[k]===O&&R(k,le)},stream:le=>v.receiveRemoteStream(k,le),track:(le,Me)=>v.receiveRemoteTrack(k,le,Me),close:()=>L(k,O,qe("peer disconnected")),error:le=>{console.error(`${Ct} peer error:`,le),L(k,O,le)}}),B.start(k,O)}),Dh&&(m=af(()=>w().catch(St))),{makeAction:T,leave:w,ping:async O=>{if(!h[O])throw qe(`no active peer with id ${O}`);const k=Date.now();return await new Promise((Z,le)=>{const Me=u[O]??(u[O]=[]),X=()=>{const he=u[O];if(!he)return;const ae=he.indexOf(te);ae>-1&&he.splice(ae,1),he.length||delete u[O]},te={resolve:()=>{X(),Z()},reject:he=>{X(),le(he)}};Me.push(te),M.send("",O).catch(he=>te.reject(Xn(he,"peer disconnected")))}),Date.now()-k},isPassive:()=>a,getPeers:()=>Ih(Zi(h).map(([O,k])=>[O,k.connection])),addStream:(O,k={})=>v.addStream(O,k,S.send),removeStream:(O,k={})=>{v.removeStream(O,k.target)},addTrack:(O,k,Z={})=>v.addTrack(O,k,Z,D.send),removeTrack:(O,k={})=>{v.removeTrack(O,k.target)},replaceTrack:(O,k,Z={})=>v.replaceTrack(O,k,Z,D.send),get onPeerJoin(){return f.onPeerJoin},set onPeerJoin(O){f.onPeerJoin=O,O&&rn(h).forEach(k=>O(k))},get onPeerLeave(){return f.onPeerLeave},set onPeerLeave(O){f.onPeerLeave=O},get onPeerStream(){return v.onPeerStream},set onPeerStream(O){v.onPeerStream=O},get onPeerTrack(){return v.onPeerTrack},set onPeerTrack(O){v.onPeerTrack=O}}};const Vh=1,Hh=2,Kc=(i,e)=>{const t=Tn(i),n=new Uint8Array(3+t.byteLength+e.byteLength);return n[0]=Vh,n[1]=t.byteLength>>>8&255,n[2]=t.byteLength&255,n.set(t,3),n.set(e,3+t.byteLength),n},lf=(i,e)=>{const t=Tn(i),n=new Uint8Array(4+t.byteLength);return n[0]=Hh,n[1]=Number(e),n[2]=t.byteLength>>>8&255,n[3]=t.byteLength&255,n.set(t,4),n},Zc=(i,e)=>{if(i.byteLength<e+2)return null;const t=(i[e]??0)<<8|(i[e+1]??0),n=e+2+t;return t<=0||t>128||i.byteLength<n?null:{roomToken:pi(i.subarray(e+2,n)),headerSize:n}},hf=i=>{const e=new Uint8Array(i);if(e.byteLength<3||e.byteLength>16515)return null;if(e[0]===Vh){const t=Zc(e,1);return t?{type:"room",roomToken:t.roomToken,payload:e.subarray(t.headerSize).slice().buffer}:null}if(e[0]===Hh){const t=Zc(e,2);return t?{type:"presence",roomToken:t.roomToken,isPresent:e[1]===1}:null}return null},Pr=i=>{const{connection:e,channel:t}=i;return i.isDead||e.connectionState==="closed"||e.connectionState==="failed"||e.iceConnectionState==="closed"||e.iceConnectionState==="failed"||(t==null?void 0:t.readyState)==="closing"||(t==null?void 0:t.readyState)==="closed"},uf=i=>{if(Pr(i))return"stale";const{channel:e}=i;return!e||e.readyState!=="open"?"transient":"live"};var df=class{constructor(){kt(this,"rooms",new Map);kt(this,"unclaimedDataTimers",new WeakMap);kt(this,"pendingDataTimers",new WeakMap);kt(this,"byApp",{})}registerRoom(i,e,t,n){const s=this.rooms.get(i)??new Map;if(s.has(e))throw qe("room membership already registered");const r={token:null,tokenPromise:t,...n};s.set(e,r),this.rooms.set(i,s);const o=()=>{var c;return((c=this.rooms.get(i))==null?void 0:c.get(e))===r},a=c=>{if(r.token)for(const l of wn(this.byApp[i]??{}))try{this.sendRoomPresence(l,r.token,c)}catch{}};return t.then(c=>{if(o()){r.token=c;for(const l of wn(this.byApp[i]??{}))l.remoteRoomTokens.has(c)&&this.attachRoom(i,e,r,l),this.discardUnboundData(l);o()&&r.active&&a(!0)}}),{connect:(c,l,h)=>{if(!o()){l.destroy();return}const u=this.reusable(i,c);u&&u.peer!==l&&l.destroy();const f=u??this.register(i,c,l,h);if(this.attachRoom(i,e,r,f),!u)for(const m of s.values())m.active&&m.token&&this.sendRoomPresence(f,m.token,!0)},reuse:c=>{if(!o())return!1;const l=this.reusable(i,c);return l?(this.attachRoom(i,e,r,l),!0):!1},setActive:c=>{!o()||r.active===c||(r.active=c,a(c))},leave:()=>{var c,l;if(o()){s.delete(e),s.size||this.rooms.delete(i),a(!1);for(const h of wn(this.byApp[i]??{})){const u=h.bindings[e];(l=u==null?void 0:(c=u.handlers).close)==null||l.call(c),u==null||u.detach(),this.discardUnboundData(h)}}}}}owns(i,e,t){var n,s;return((s=(n=this.byApp[i])==null?void 0:n[e])==null?void 0:s.peer)===t}reusable(i,e){var n;const t=(n=this.byApp[i])==null?void 0:n[e];if(t&&Pr(t.peer)){this.clear(i,e,{destroyPeer:!0});return}return t}attachRoom(i,e,t,n){var o;if(((o=this.rooms.get(i))==null?void 0:o.get(e))!==t||n.isClosing||this.get(i,n.peerId)!==n)return;const{proxy:s,isNew:r}=this.bind(e,t.tokenPromise,n,{onDetach:()=>t.onDetach(n.peerId,n.peer)});r&&t.onPeer(s,n.peerId,n.peer)}get(i,e){var t;return(t=this.byApp[i])==null?void 0:t[e]}sendRoomPresence(i,e,t){i.isClosing||Pr(i.peer)||i.peer.sendData(lf(e,t))}clear(i,e,{destroyPeer:t}){const n=this.byApp[i],s=n==null?void 0:n[e];if(!s||s.isClosing)return;s.idleTimer=Ye(s.idleTimer),this.clearDataTimers(s),s.isClosing=!0,t&&!s.peer.isDead&&s.peer.destroy();const r=wn(s.bindings);s.bindings={},s.bindingsByToken={},s.controlRoomId=null,delete n[e],r.forEach(o=>{var a,c;(c=(a=o.handlers).close)==null||c.call(a),o.pendingData.length=0,o.pendingSendData.length=0,o.pendingTracks.length=0}),s.media.clearRemote(),s.pendingDataByToken.clear(),s.remoteRoomTokens.clear(),rn(n).length===0&&delete this.byApp[i]}register(i,e,t,n){var a,c;const s=(a=this.byApp[i])==null?void 0:a[e];if(s){if(s.idleTimer=Ye(s.idleTimer),s.peer===t)return s;this.clear(i,e,{destroyPeer:!0})}const r={appId:i,peerId:e,peer:t,bindings:{},bindingsByToken:{},pendingDataByToken:new Map,remoteRoomTokens:new Set,idleTimer:null,controlRoomId:null,streamOwners:new Map,trackOwners:new Map,media:sa(),idleMs:n,isClosing:!1};((c=this.byApp)[i]??(c[i]={}))[e]=r;const o=()=>{this.owns(i,e,t)&&this.clear(i,e,{destroyPeer:!0})};return t.setHandlers({data:l=>this.dispatchData(r,l),signal:l=>this.dispatchSignal(r,l),close:o,error:l=>{console.error(`${Ct} peer error:`,l),o()},track:(l,h)=>this.dispatchTrack(r,l,h)}),r}bind(i,e,t,{onDetach:n}){const s=t.bindings[i];if(s)return t.idleTimer=Ye(t.idleTimer),{proxy:s.proxy,isNew:!1};const r={roomId:i,roomToken:null,roomTokenPromise:e,handlers:{},pendingData:[],pendingSendData:[],pendingTracks:[],detach:St,proxy:{}},o=()=>{if(t.bindings[i]!==r)return;const c=rn(t.bindings).length===1&&(t.streamOwners.size>0||t.trackOwners.size>0||t.media.hasRemoteMedia());c||this.pruneRoomOwnership(t,i),delete t.bindings[i],r.roomToken&&t.bindingsByToken[r.roomToken]===r&&delete t.bindingsByToken[r.roomToken],t.controlRoomId===i&&(t.controlRoomId=rn(t.bindings)[0]??null),this.discardUnboundData(t),n(),c?this.clear(t.appId,t.peerId,{destroyPeer:!0}):this.scheduleIdleTimer(t)},a={get connection(){return t.peer.connection},get channel(){return t.peer.channel},get isDead(){return t.peer.isDead},getOffer:c=>t.peer.getOffer(c),signal:c=>t.peer.signal(c),sendData:c=>{if(!r.roomToken){r.pendingSendData.push(c);return}t.peer.sendData(Kc(r.roomToken,c))},destroy:()=>o(),setHandlers:c=>{Object.assign(r.handlers,c),this.flushBindingQueues(t,r)},addStream:c=>{const l=t.streamOwners.get(c)??new Set,h=l.size===0;l.add(i),t.streamOwners.set(c,l),h&&t.peer.addStream(c)},removeStream:c=>this.releaseStreamOwner(t,c,i),addTrack:(c,l)=>{const h=t.trackOwners.get(c)??{stream:l,rooms:new Set},u=h.rooms.size===0;return h.stream=l,h.rooms.add(i),t.trackOwners.set(c,h),u?t.peer.addTrack(c,l):t.peer.connection.getSenders().find(f=>f.track===c)??t.peer.addTrack(c,l)},removeTrack:c=>this.releaseTrackOwner(t,c,i),replaceTrack:async(c,l)=>{const h=t.trackOwners.get(c);if(await t.peer.replaceTrack(c,l),h&&t.trackOwners.get(c)===h){t.trackOwners.delete(c);const u=t.trackOwners.get(l)??{stream:h.stream,rooms:new Set};h.rooms.forEach(f=>u.rooms.add(f)),t.trackOwners.set(l,u)}},__trysteroMedia:t.media};return r.proxy=a,r.detach=o,t.bindings[i]=r,t.controlRoomId??(t.controlRoomId=i),t.idleTimer=Ye(t.idleTimer),e.then(c=>{if(t.isClosing||t.bindings[i]!==r)return;r.roomToken=c,t.bindingsByToken[c]=r;const l=t.pendingDataByToken.get(c);l!=null&&l.length&&(r.pendingData.push(...l),t.pendingDataByToken.delete(c));const h=r.pendingSendData.splice(0);Pr(t.peer)||h.forEach(u=>{try{t.peer.sendData(Kc(c,u))}catch{}}),this.flushBindingQueues(t,r),this.discardUnboundData(t)}),{proxy:a,isNew:!0}}releaseStreamOwner(i,e,t){const n=i.streamOwners.get(e);n&&(n.delete(t),n.size===0&&(i.streamOwners.delete(e),i.peer.removeStream(e)))}releaseTrackOwner(i,e,t){const n=i.trackOwners.get(e);n&&(n.rooms.delete(t),n.rooms.size===0&&(i.trackOwners.delete(e),i.peer.removeTrack(e)))}pruneRoomOwnership(i,e){i.streamOwners.forEach((t,n)=>this.releaseStreamOwner(i,n,e)),i.trackOwners.forEach((t,n)=>this.releaseTrackOwner(i,n,e))}scheduleIdleTimer(i){i.isClosing||rn(i.bindings).length>0||(i.idleTimer=Ye(i.idleTimer),i.idleTimer=setTimeout(()=>{var t;const e=(t=this.byApp[i.appId])==null?void 0:t[i.peerId];!e||rn(e.bindings).length>0||this.clear(i.appId,i.peerId,{destroyPeer:!0})},i.idleMs))}getSignalBinding(i){if(i.controlRoomId){const t=i.bindings[i.controlRoomId];if(t!=null&&t.handlers.signal)return t}const e=wn(i.bindings).find(t=>!!t.handlers.signal);return e?(i.controlRoomId=e.roomId,e):null}flushBindingQueues(i,e){const{handlers:t}=e;if(t.data&&e.pendingData.length>0){const n=e.pendingData.splice(0);this.syncDataTimers(i),n.forEach(s=>{var r;return(r=t.data)==null?void 0:r.call(t,s)})}else this.syncDataTimers(i);(t.track||t.stream)&&e.pendingTracks.length&&e.pendingTracks.splice(0).forEach(({track:n,stream:s})=>{var r,o;(r=t.track)==null||r.call(t,n,s),(o=t.stream)==null||o.call(t,s)})}unclaimedBufferedFrameCount(i){let e=0;for(const t of i.pendingDataByToken.values())e+=t.length;return e}boundBufferedFrameCount(i){let e=0;for(const t of wn(i.bindings))e+=t.pendingData.length;return e}bufferedFrameCount(i){return this.unclaimedBufferedFrameCount(i)+this.boundBufferedFrameCount(i)}clearDataTimers(i){Ye(this.unclaimedDataTimers.get(i)),this.unclaimedDataTimers.delete(i),Ye(this.pendingDataTimers.get(i)),this.pendingDataTimers.delete(i)}syncDataTimers(i){if(i.isClosing){this.clearDataTimers(i);return}this.unclaimedBufferedFrameCount(i)===0?(Ye(this.unclaimedDataTimers.get(i)),this.unclaimedDataTimers.delete(i)):this.unclaimedDataTimers.has(i)||this.unclaimedDataTimers.set(i,setTimeout(()=>{this.unclaimedDataTimers.delete(i),i.pendingDataByToken.clear()},ta)),this.boundBufferedFrameCount(i)===0?(Ye(this.pendingDataTimers.get(i)),this.pendingDataTimers.delete(i)):this.pendingDataTimers.has(i)||this.pendingDataTimers.set(i,setTimeout(()=>{this.pendingDataTimers.delete(i),this.boundBufferedFrameCount(i)>0&&this.failData(i,"room data handler timed out")},ta))}canBindRoomToken(i,e){var t;return wn(i.bindings).some(n=>!n.roomToken)||[...((t=this.rooms.get(i.appId))==null?void 0:t.values())??[]].some(n=>!n.token||n.token===e)}discardUnboundData(i){for(const e of i.pendingDataByToken.keys())this.canBindRoomToken(i,e)||i.pendingDataByToken.delete(e);this.syncDataTimers(i)}failData(i,e){console.warn(`${Ct}: ${e}; disconnecting peer ${i.peerId}`),this.clear(i.appId,i.peerId,{destroyPeer:!0})}dispatchData(i,e){var s,r;if(i.isClosing)return;const t=hf(e);if(!t){this.failData(i,"invalid or incompatible room frame");return}if(t.type==="presence"){if(t.isPresent){if(!i.remoteRoomTokens.has(t.roomToken)&&i.remoteRoomTokens.size>=64){this.failData(i,"too many advertised rooms");return}i.remoteRoomTokens.add(t.roomToken);for(const[o,a]of this.rooms.get(i.appId)??[])a.token===t.roomToken&&this.attachRoom(i.appId,o,a,i)}else{i.remoteRoomTokens.delete(t.roomToken),i.pendingDataByToken.delete(t.roomToken);const o=i.bindingsByToken[t.roomToken];(r=o==null?void 0:(s=o.handlers).close)==null||r.call(s),o==null||o.detach(),this.syncDataTimers(i)}return}const n=i.bindingsByToken[t.roomToken];if(!n){if(!this.canBindRoomToken(i,t.roomToken)||this.bufferedFrameCount(i)>=64)return;const o=i.pendingDataByToken.get(t.roomToken)??[];o.push(t.payload),i.pendingDataByToken.set(t.roomToken,o),this.syncDataTimers(i);return}if(n.handlers.data)n.handlers.data(t.payload);else{if(this.bufferedFrameCount(i)>=64){this.failData(i,"too much data waiting for a room handler");return}n.pendingData.push(t.payload),this.syncDataTimers(i)}}dispatchSignal(i,e){var n,s;const t=this.getSignalBinding(i);t?(s=(n=t.handlers).signal)==null||s.call(n,e):e.type==="offer"&&this.clear(i.appId,i.peerId,{destroyPeer:!0})}dispatchTrack(i,e,t){wn(i.bindings).forEach(n=>{var s,r,o,a;if(n.handlers.track||n.handlers.stream){(r=(s=n.handlers).track)==null||r.call(s,e,t),(a=(o=n.handlers).stream)==null||a.call(o,t);return}n.pendingTracks.push({track:e,stream:t})})}};const Jc=23333,ff=57333,pf=12,mf=7533,gf=23333,Is="offer-placeholder",vf=["offer","answer","candidate"],Gh=i=>{if(typeof i=="string")try{const e=Gs(i);return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch{return null}return i&&typeof i=="object"&&!Array.isArray(i)?i:null},Gn=(i,e)=>typeof i[e]=="string"&&i[e]?i[e]:void 0,Wh=i=>!!(i&&typeof i=="object"&&typeof i.signal=="function"&&typeof i.destroy=="function"&&typeof i.setHandlers=="function"),Xh=(i,e=!1)=>vf.some(t=>t in i&&(typeof i[t]!="string"||i[t]===""))||"peer"in i&&(e||i.peer!==void 0&&!Wh(i.peer)),_f=i=>{const e=Gh(i);if(!e||Xh(e,typeof i=="string"))return!1;const t=Gn(e,"peerId");return!!(t&&t!==At&&e.passive!==!0&&!Gn(e,"answer")&&!Gn(e,"candidate"))},yf=(i,e,t,n,s,r)=>{i.toCipher(e).then(o=>{i.isLeaving()||!r()||n(t,Ut(s(o.sdp)))})},xf=()=>({offerPeer:null,offerId:null,offerSdp:null,offerInitPromise:null,offerAnswered:!1,offerRelays:[],offerSignalRelays:[],offerSignalBacklog:[],offerRelayTimers:[],offerExpiryTimer:null,connectedPeer:null,connectedPeerUnhealthySinceMs:null,answeringExpiryTimer:null,answeringPeer:null,answerSent:!1,answerReplay:null,connectionErrorReported:!1}),Mf=i=>{var e;return[...i.turnConfig??[],...((e=i.rtcConfig)==null?void 0:e.iceServers)??[]].some(({urls:t})=>(Array.isArray(t)?t:[t]).some(n=>/^turns?:/i.test(n)))},Sf=(i,e)=>`could not connect to peer ${i} after exchanging SDP; ${Mf(e)?"check that your TURN server URLs and credentials are reachable by both peers":"configure TURN servers with turnConfig or rtcConfig.iceServers"}`,$r=(i,e,t)=>{var n;i.isLeaving()||e.connectedPeer||e.connectionErrorReported||(e.connectionErrorReported=!0,(n=i.onJoinError)==null||n.call(i,{error:Sf(t,i.config),appId:i.appId,peerId:t,roomId:i.roomId}))},Yr=(i,e)=>i[e]??(i[e]=xf()),kr=new WeakMap,nc=i=>{kr.delete(i),i.answeringExpiryTimer=Ye(i.answeringExpiryTimer),i.answeringPeer=null,i.answerSent=!1,i.answerReplay=null},Us=(i,e)=>{i.answeringPeer===e&&(nc(i),i.connectedPeer!==e&&!e.isDead&&e.destroy())},wf=(i,e)=>{i.answeringPeer&&i.answeringPeer!==e&&!i.answeringPeer.isDead&&i.answeringPeer.destroy(),nc(i),i.connectedPeer=e,i.connectedPeerUnhealthySinceMs=null},Qc=(i,e)=>{(i==null?void 0:i.connectedPeer)===e&&(i.connectedPeer=null,i.connectedPeerUnhealthySinceMs=null)},ra=(i,e,t)=>{i.connectedPeer&&(i.connectedPeer.isDead||i.connectedPeer.destroy(),i.connectedPeer=null,i.connectedPeerUnhealthySinceMs=null)},ic=(i,e)=>{i.offerRelayTimers[e]=Ye(i.offerRelayTimers[e]),i.offerRelays[e]&&(i.offerRelays[e]=void 0)},uo=(i,e)=>{(i==null?void 0:i.offerRelays[e])===Is&&ic(i,e)},vi=i=>{kr.delete(i),i.offerExpiryTimer=Ye(i.offerExpiryTimer),i.offerInitPromise=null,i.offerRelays.forEach((e,t)=>ic(i,t)),i.offerRelays=[],i.offerSignalRelays=[],i.offerRelayTimers=[],i.offerSignalBacklog=[],i.offerPeer&&i.offerPeer!==i.connectedPeer&&(i.offerPeer.isDead||i.offerPeer.destroy()),i.offerPeer=null,i.offerId=null,i.offerSdp=null,i.offerAnswered=!1,i.connectionErrorReported=!1},Ef=(i,e,t,n)=>{Ye(e.answeringExpiryTimer),e.answeringExpiryTimer=setTimeout(()=>{const s=i.peerStates[t];!s||s.connectedPeer||s.answeringPeer!==n||(s.answerSent&&$r(i,s,t),Us(s,n),i.checkDeactivate())},gf)},oa=(i,e,t,n=ff)=>{Ye(e.offerExpiryTimer);const s=e.offerId;e.offerExpiryTimer=setTimeout(()=>{const r=i.peerStates[t];!r||r.connectedPeer||r.offerId!==s||(r.offerAnswered&&$r(i,r,t),vi(r),i.checkDeactivate())},n)},qh=(i,e,t,n,s)=>{const r=()=>{e.offerPeer===n&&!e.connectedPeer&&(e.offerAnswered&&$r(i,e,t),vi(e)),i.disconnectPeer(n,t),i.checkDeactivate()};n.setHandlers({connect:()=>i.connectPeer(n,t),...s?{signal:s}:{},close:r,error:r})},bf=(i,e,t)=>{if(e.offerPeer&&e.offerId&&e.offerSdp)return Promise.resolve({peer:e.offerPeer,offer:e.offerSdp,offerId:e.offerId});if(e.offerInitPromise)return e.offerInitPromise;const s=(async()=>{let r;try{r=(await i.offerManager.checkout(1,!1,i.encryptOffer))[0]}catch(c){if(i.isLeaving()||e.offerInitPromise!==s)return null;throw c}if(!r)throw qe("failed to allocate offer peer");const{peer:o,offer:a}=r;return i.isLeaving()||e.offerInitPromise!==s?(o.destroy(),null):(e.offerPeer=o,e.offerId=wi(pf),e.offerSdp=a,e.offerAnswered=!1,e.connectionErrorReported=!1,e.offerSignalBacklog=[],qh(i,e,t,o,c=>{e.offerPeer===o&&(e.offerSignalBacklog.push(c),e.offerSignalRelays.forEach(l=>l==null?void 0:l(c)))}),oa(i,e,t),{peer:o,offer:a,offerId:e.offerId})})().finally(()=>{e.offerInitPromise===s&&(e.offerInitPromise=null)});return e.offerInitPromise=s},$h=async(i,e,t,n,s=0)=>{const r=i.peerStates[t];if(!r||r.connectedPeer||r.answeringPeer||r.offerAnswered){uo(r,e);return}if(r.offerRelays[e]!==Is)return;const[o,a]=await Ei([es(Qi(i.rootTopicPlaintext,t)),bf(i,r,t)]);if(!a){uo(r,e);return}if(i.isLeaving()){vi(r);return}if(r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerRelays[e]!==Is){uo(r,e);return}r.offerRelayTimers[e]=Ye(r.offerRelayTimers[e]),r.offerRelays[e]=!0,r.offerRelayTimers[e]=setTimeout(()=>{if(s>=2||i.isLeaving()||r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerPeer!==a.peer||r.offerId!==a.offerId){Cf(i,t,e);return}r.offerRelays[e]=Is,$h(i,e,t,n,s+1)},s===0&&i.announceIntervals[e]===void 0?2e3:(i.announceIntervals[e]??i.announceIntervalMs)*.9);let c=!1;r.offerSignalRelays[e]=l=>{c&&(i.isLeaving()||r.connectedPeer||r.offerPeer!==a.peer||r.offerId!==a.offerId||l.type!=="candidate"||yf(i,l,o,n,h=>({peerId:At,offerId:a.offerId,candidate:h,...i.isPassive?{passive:!0}:{}}),()=>!r.connectedPeer&&r.offerPeer===a.peer&&r.offerId===a.offerId))},n(o,Ut({peerId:At,offerId:a.offerId,offer:a.offer,...i.isPassive?{passive:!0}:{}})),c=!0,r.offerSignalBacklog.forEach(l=>{var h,u;return(u=(h=r.offerSignalRelays)[e])==null?void 0:u.call(h,l)})},Tf=async(i,e,t,n,s,r)=>{var p;const o=Yr(i.peerStates,t);if(o.answeringPeer||o.offerAnswered){const d=o.answerReplay,v=d==null?void 0:d.lastSentAt[e];if(o.answeringPeer&&!o.answeringPeer.isDead&&d&&d.offer===n&&d.offerId===s&&(v===void 0||Date.now()-v>=1e3)){d.lastSentAt[e]=Date.now();const y=await es(Qi(i.rootTopicPlaintext,t));if(!i.isLeaving()&&o.answerReplay===d&&!o.connectedPeer){const x=R=>r(y,R);d.relays[e]=x,d.messages.forEach(x)}}return}const a=!!(o.offerPeer||o.offerRelays.some(Boolean));if(a&&At<t)return;a&&vi(o);const c=i.initPeer(!1,i.config),l={offer:n,offerId:s,messages:[],lastSentAt:[],relays:[]};l.lastSentAt[e]=Date.now(),o.answeringPeer=c,o.answerSent=!1,o.answerReplay=l,o.connectionErrorReported=!1,Ef(i,o,t,c);const h=()=>{o.answeringPeer===c&&!o.connectedPeer&&o.answerSent&&$r(i,o,t),Us(o,c),i.disconnectPeer(c,t),i.checkDeactivate()};c.setHandlers({connect:()=>i.connectPeer(c,t),close:h,error:h});let u;try{u=await i.toPlain({type:"offer",sdp:n})}catch{Us(o,c),(p=i.onJoinError)==null||p.call(i,{error:"incorrect room password when decrypting offer",appId:i.appId,peerId:t,roomId:i.roomId});return}if(c.isDead){Us(o,c);return}const f=await es(Qi(i.rootTopicPlaintext,t));if(i.isLeaving()||o.answerReplay!==l)return;l.relays[e]=d=>r(f,d);const m=[];let g=!1;const _=d=>{i.toCipher(d).then(v=>{if(i.isLeaving()||o.answeringPeer!==c||c.isDead)return;const y={peerId:At};d.type==="answer"?(o.answerSent=!0,y.answer=v.sdp):y.candidate=v.sdp,s&&(y.offerId=s),i.isPassive&&(y.passive=!0);const x=Ut(y),R=Date.now();l.messages.push(x),l.relays.forEach((T,A)=>{T&&(l.lastSentAt[A]=R,T(x))}),d.type==="answer"&&!g&&(g=!0,m.splice(0).forEach(_))})};c.setHandlers({signal:d=>{if(!(i.isLeaving()||o.answeringPeer!==c||c.isDead)&&!(d.type!=="answer"&&d.type!=="candidate")){if(d.type==="candidate"&&!g){m.push(d);return}_(d)}}}),await c.signal(u)},Af=async(i,e,t,n,s)=>{var u;let r;try{r=await i.toPlain({type:Uh,sdp:t})}catch{return}const o=i.peerStates[e],a=n&&(o!=null&&o.offerPeer)&&o.offerId===n?o.offerPeer:null,c=!n||((u=o==null?void 0:o.answerReplay)==null?void 0:u.offerId)===n?o==null?void 0:o.answeringPeer:null,l=!n&&(o!=null&&o.offerPeer)?o.offerPeer:null,h=s&&!s.isDead?s:a??c??l;h&&!h.isDead&&h.signal(r)},Rf=async(i,e,t,n,s)=>{var o;let r;try{r=await i.toPlain({type:"answer",sdp:t})}catch{s&&(i.offerManager.reclaimLeased(s),s.isDead||s.destroy()),(o=i.onJoinError)==null||o.call(i,{error:"incorrect room password when decrypting answer",appId:i.appId,peerId:e,roomId:i.roomId});return}if(s){const a=Yr(i.peerStates,e);if(i.offerManager.claimLeased(s),a.connectedPeer||a.offerAnswered||a.answeringPeer&&!a.answeringPeer.isDead&&At>e){s.destroy();return}if(a.answeringPeer){const c=a.answeringPeer;Us(a,c)}vi(a),a.offerPeer=s,a.offerId=n??null,a.offerAnswered=!0,oa(i,a,e,Jc),qh(i,a,e,s),s.signal(r)}else{const a=i.peerStates[e];if(!a||!a.offerPeer||a.offerAnswered||n&&a.offerId&&n!==a.offerId||a.offerPeer.isDead)return;a.offerAnswered=!0,oa(i,a,e,Jc),a.offerPeer.signal(r)}},Cf=(i,e,t)=>{const n=i.peerStates[e];!n||n.connectedPeer||n.offerRelays[t]&&(ic(n,t),i.checkDeactivate())},Pf=i=>e=>async(t,n,s)=>{var d;if(i.isLeaving())return;const r=Gh(n);if(!r||Xh(r,typeof n=="string"))return;const o=Gn(r,"peerId")??"",a=Gn(r,"offer"),c=Gn(r,"answer"),l=Gn(r,"candidate"),h=Gn(r,"offerId"),u=Wh(r.peer)?r.peer:void 0,f=r.passive===!0;if(!o||o===At)return;const[m,g]=await Ei([i.rootTopicP,i.selfTopicP]);if(i.isLeaving()||t!==m&&t!==g||i.isPassive&&f||(i.isPassive&&!i.isActive&&!c&&!l&&(i.isActive=!0,(d=i.requeueAnnounce)==null||d.call(i)),i.isPassive&&!i.isActive))return;const _=i.peerStates[o],p=_==null?void 0:_.connectedPeer;if(p&&_){const v=uf(p);if(v==="live"){_.connectedPeerUnhealthySinceMs=null;return}if(v==="stale")ra(_);else{const y=Date.now(),x=_.connectedPeerUnhealthySinceMs??y;if(_.connectedPeerUnhealthySinceMs=x,y-x<mf)return;ra(_)}}if(!i.reusePeer(o)){if(o&&!a&&!c&&!l){const v=Yr(i.peerStates,o),y=At<o;if(v.answeringPeer||v.connectedPeer||v.offerAnswered)return;if(!y&&!v.offerPeer){let x=kr.get(v);x||(x=[],kr.set(v,x));const R=x[e];if(R!==void 0&&Date.now()-R<1e3)return;x[e]=Date.now();const T=await es(Qi(i.rootTopicPlaintext,o));!i.isLeaving()&&!v.connectedPeer&&!v.answeringPeer&&!v.offerAnswered&&s(T,Ut({peerId:At}));return}return v.offerRelays[e]?void 0:(v.offerRelays[e]=Is,$h(i,e,o,s))}if(a)return Tf(i,e,o,a,h,s);if(l)return Af(i,o,l,h,u);if(c)return Rf(i,o,c,h,u)}},nr=5333,Lf=[233,533,1333],el=7533,Df=123333;var If=({init:i,subscribe:e,announce:t,deactivate:n})=>{const s={},r={},o=new df,a=()=>wn(s).some(u=>rn(u).length>0);let c=!1,l=[],h=St;return(u,f,m)=>{var E,$,ee,se;if(!u)throw qe("requires a config map as the first argument");if(m&&typeof m!="object")throw qe("third argument must be a callbacks object");const{appId:g}=u,_=m==null?void 0:m.onJoinError,p=m==null?void 0:m.onPeerHandshake,d=m==null?void 0:m.handshakeTimeoutMs;if(!g)throw qe("config map is missing appId field");if(!f)throw qe("roomId argument required");if(u.maxReceiveBytes!==void 0&&(!Number.isSafeInteger(u.maxReceiveBytes)||u.maxReceiveBytes<=0))throw qe("maxReceiveBytes must be a positive safe integer");if(d!==void 0&&(!Number.isFinite(d)||d<=0))throw qe("handshakeTimeoutMs must be a positive number");if((E=s[g])!=null&&E[f])return s[g][f];(ee=($=r[g])==null?void 0:$[f])==null||ee.call($,!0);const v=Qi(Ct,g,f),y=es(v),x=es(Qi(v,At)),R=Cd(u.password??"",g,f),T=Pd(g,f),A=u._test_only_sharedPeerIdleMs??Df;let L=!1;const w=q=>async oe=>({type:oe.type,sdp:await q(R,oe.sdp)}),M=w(Dd),I=w(Ld),W=()=>Nc(!0,u);let S=!1;const D=new Ud(W),N=async q=>{const oe=await q.getOffer();if(!oe||oe.type!=="offer")throw qe("failed to get offer for peer");return(await I(oe)).sdp},P=(q,oe)=>{C.connect(oe,q,A)};let z=!1;const B=()=>{k||!S||z||(z=!0,queueMicrotask(()=>{var q;z=!1,L||(q=X.requeueAnnounce)==null||q.call(X)}))},O=(q,oe)=>{if(L)return;const ie=X.peerStates[oe];(ie==null?void 0:ie.connectedPeer)===q&&(ra(ie),Me(),B())},k=!!u.passive;let Z,le=St;const Me=()=>{if(!k||!X.isActive)return;let q=!1;Zi(X.peerStates).forEach(([oe,ie])=>{ie.connectedPeer||ie.answeringPeer||ie.offerInitPromise||ie.offerPeer||ie.offerRelays.some(Boolean)?q=!0:delete X.peerStates[oe]}),q||(X.isActive=!1,Z=Ye(Z),Ue.forEach(Ye),Ue.length=0,le(),C.setActive(!1))},X={appId:g,roomId:f,config:u,peerStates:{},rootTopicPlaintext:v,rootTopicP:y,selfTopicP:x,toPlain:M,toCipher:I,isLeaving:()=>L,isPassive:k,isActive:!k,onJoinError:_,offerManager:D,encryptOffer:N,initPeer:Nc,connectPeer:P,disconnectPeer:O,reusePeer:q=>C.reuse(q),checkDeactivate:Me,announceIntervals:[],announceIntervalMs:nr},te={config:u,appId:g,roomId:f,isPassive:k},he=Pf(X);if(!c){const q=i(u);l=(Array.isArray(q)?q:[q]).map(oe=>Promise.resolve(oe)),c=!0,h=(se=u.relayConfig)!=null&&se.manualReconnection?St:Td()}const ae=l.map(()=>nr),Ce=l.map(()=>0),De=l.map(()=>0),Ue=[],Y=l.map(async(q,oe)=>e(await q,await y,await x,he(oe),ie=>D.getOffers(ie,N),te));Ei([y,x]).then(([q,oe])=>{if(L)return;const ie=async(de,Le)=>{var $e;if(L||k&&!X.isActive)return;const re=k?{passive:!0}:void 0;let fe;try{fe=await t(de,q,oe,re,te),De[Le]=0}catch(Ve){if(L)return;const tt=De[Le]??0;tt===0&&(($e=u.relayConfig)==null?void 0:$e.warnOnRelayFailure)!==!1&&console.warn(`${Ct}: announce failed - ${Ji(Ve,"")}`),De[Le]=tt+1}if(L||k&&!X.isActive||fe&&typeof fe!="number"&&"stopAnnouncing"in fe)return;typeof fe=="number"?(X.announceIntervals[Le]=fe,ae[Le]=fe):fe&&(ae[Le]=fe.nextAnnounceMs,S||(S=fe.reannounceOnDisconnect===!0));const Ie=Ce[Le]??0;Ce[Le]=Ie+1;const Oe=ae[Le]??nr,xe=Lf[Ie]??(Ie===3&&typeof fe=="object"?nr:void 0);Ue[Le]=setTimeout(()=>{ie(de,Le)},typeof xe=="number"?Math.min(Oe,xe):Oe)};le=()=>{n&&l.forEach(async de=>{const Le=await de;L||n(Le,q,oe,te)})},X.requeueAnnounce=()=>{Ue.forEach(Ye),Ue.length=0,Z=Ye(Z),C.setActive(!0),Z=setTimeout(Me,el),l.forEach(async(de,Le)=>{const re=await de;re&&!L&&(Ce[Le]=0,ie(re,Le))})},Y.forEach(async(de,Le)=>{if(await de,L)return;const re=await l[Le];re&&!L&&(!k||X.isActive)&&ie(re,Le)})});let Q=St;const ue=u.password??"",{compose:F}=Nd(ue,g,f),Fe=F(p),Ne=()=>{var q;((q=s[g])==null?void 0:q[f])===me&&(delete s[g][f],rn(s[g]).length===0&&delete s[g])},Be=()=>{var q;((q=r[g])==null?void 0:q[f])===we&&(delete r[g][f],rn(r[g]).length===0&&delete r[g])},we=(q=!1)=>{L||(L=!0,Q=St,Ne(),Be(),C.leave(),Zi(X.peerStates).forEach(([oe,ie])=>{ie.connectedPeer&&!ie.connectedPeer.isDead&&(o.owns(g,oe,ie.connectedPeer)||ie.connectedPeer.destroy()),ie.answeringPeer&&!ie.answeringPeer.isDead&&ie.answeringPeer.destroy(),vi(ie),nc(ie),ie.connectedPeer=null,ie.connectedPeerUnhealthySinceMs=null}),Ue.forEach(Ye),Z=Ye(Z),Y.forEach(async oe=>{(await oe)()}),D.destroy(),!(q||a())&&(c=!1,h()))},Ee={...u.maxReceiveBytes===void 0?{}:{maxReceiveBytes:u.maxReceiveBytes},...Fe?{onPeerHandshake:Fe}:{},...d===void 0?{}:{handshakeTimeoutMs:d},isPassive:k,onBeforeLeave:()=>{Ne(),(r[g]??(r[g]={}))[f]=we},onHandshakeError:(q,oe)=>_==null?void 0:_({error:oe.replace(/^handshake failed: /,""),appId:g,peerId:q,roomId:f})};s[g]??(s[g]={});const me=cf(q=>Q=q,q=>{if(L)return;const oe=X.peerStates[q];oe!=null&&oe.connectedPeer&&Qc(oe,oe.connectedPeer),Me(),B()},()=>we(!1),Ee),C=o.registerRoom(g,f,T,{active:!k||X.isActive,onPeer:(q,oe,ie)=>{const de=Yr(X.peerStates,oe);wf(de,ie),k&&!X.isActive&&(X.isActive=!0,C.setActive(!0),X.requeueAnnounce?X.requeueAnnounce():(Z=Ye(Z),Z=setTimeout(Me,el))),Q(q,oe),vi(de)},onDetach:(q,oe)=>{Qc(X.peerStates[q],oe),Me()}});return s[g][f]=me}};const Uf=6e4,fo=i=>{if(!i)throw qe("topic strategy missing room context");return i},gs=(i,e,t,n)=>({kind:e,appId:i.appId,roomId:i.roomId,rootTopic:t,selfTopic:n});var Nf=({steadyAnnounceIntervalMs:i=Uf,reannounceOnDisconnect:e=!0,init:t,subscribeTopic:n,publishTopic:s,unpublishTopic:r})=>If({init:t,subscribe:async(o,a,c,l,h,u)=>{const f=fo(u),m=(R,T)=>void s(o,R,T,gs(f,"signal",a,c));let g=null,_=!1,p=null,d=!1;const v=R=>{_||(_=!0,R())},y=()=>(p||(p=Promise.resolve(n(o,c,(R,T)=>{d||l(R,T,m)},gs(f,"self",a,c))).then(R=>{g=R,d&&v(R)})),p);f.isPassive||await y();const x=await n(o,a,async(R,T)=>{d||(f.isPassive&&_f(T)&&await y(),d||await l(R,T,m))},gs(f,"root",a,c));return()=>{d=!0,g&&v(g),x()}},announce:async(o,a,c,l,h)=>{const u=fo(h),f=await s(o,a,Ut({peerId:At,...l}),gs(u,"announce",a,c));return typeof f=="number"||f!==void 0&&"stopAnnouncing"in f?f:{nextAnnounceMs:(f==null?void 0:f.nextAnnounceMs)??i,reannounceOnDisconnect:(f==null?void 0:f.reannounceOnDisconnect)??e}},...r?{deactivate:(o,a,c,l)=>{const h=fo(l);return r(o,a,gs(h,"announce",a,c))}}:{}});const Yh=bd(i=>i.socket),Ff=5,jh="x",Kh="EVENT",{secretKey:Of,publicKey:Bf}=Lh.keygen(),kf=Ns(Bf),po={},tl=250,hi=6e4,zf=9e5,sc=5333,Fs=new WeakMap,zr=Yh.scoped(),aa=new WeakSet,Vf=i=>{const e=Fs.get(i),t=Math.min(e!=null&&e.delayMs?Math.max(hi,e.delayMs*2):hi,zf);return Fs.set(i,{delayMs:t,untilMs:Date.now()+t}),t},Os=i=>{const e=Fs.get(i);if(!e)return 0;const t=e.untilMs-Date.now();return t>0?t:0},ir=i=>({nextAnnounceMs:i}),Hf={stopAnnouncing:!0},Gf=i=>{var e;return aa.has(i)?!1:(aa.add(i),Fs.delete(i),(e=i.close)==null||e.call(i),!0)},Zh=()=>Math.floor(Date.now()/1e3),Jh=i=>po[i]??(po[i]=Nh(i,1e4)+2e4),Wf=async(i,e)=>{const t={kind:Jh(i),tags:[[jh,i]],created_at:Zh(),content:e,pubkey:kf},n=await qr("SHA-256",Ut([0,t.pubkey,t.created_at,t.kind,t.tags,t.content]));return Ut([Kh,{...t,id:Ns(n),sig:Ns(await Lh.signAsync(n,Of))}])},Wt={},Qh=i=>{i.flushWaiters.forEach(e=>e()),i.flushWaiters.clear()},Xf=(i,e,t)=>{var s;const n=Wt[s=i.url]??(Wt[s]={subIds:[],topics:new Map,updateTimer:null,flushWaiters:new Set,retryTimer:null,retryMs:sc,pendingEose:new Set,requestedAt:0});n.topics.set(e,t),eu(i,n)},qf=(i,e)=>{const t=Wt[i.url];t&&(t.topics.delete(e),delete zr.forRelay(i)[e],t.topics.size===0?(t.retryTimer!==null&&clearTimeout(t.retryTimer),t.updateTimer!==null&&(clearTimeout(t.updateTimer),t.updateTimer=null),Qh(t),t.subIds.forEach(n=>i.send(Ut(["CLOSE",n]))),delete Wt[i.url]):eu(i,t))},eu=(i,e)=>{e.updateTimer===null&&(e.updateTimer=setTimeout(()=>{e.updateTimer=null;try{tu(i)}finally{Qh(e)}},0))},$f=i=>{const e=Wt[i.url];return!e||e.updateTimer===null?Promise.resolve():new Promise(t=>e.flushWaiters.add(t))},tu=i=>{const e=Wt[i.url];if(!e||e.topics.size===0)return;const t=[...e.topics.keys()],n=[],s=Zh();for(let r=0;r<t.length;r+=tl)n.push(t.slice(r,r+tl));for(;e.subIds.length>n.length;){const r=e.subIds.pop();r&&i.send(Ut(["CLOSE",r]))}e.pendingEose.clear(),e.requestedAt=Date.now(),n.forEach((r,o)=>{var c;const a=(c=e.subIds)[o]??(c[o]=wi(64));e.pendingEose.add(a),i.send(Ut(["REQ",a,{kinds:[...new Set(r.map(Jh))],since:s,"#x":r}]))})},nu=i=>{const e=Wt[i.url];if(e&&e.topics.size>0&&!i.isClosed){if(Os(i)>0){ru(i,!0);return}e.retryTimer!==null&&(clearTimeout(e.retryTimer),e.retryTimer=null),tu(i),iu(i)}},iu=i=>{Object.entries(zr.forRelay(i)).forEach(([e,t])=>{su(i,e,t,!0)})},su=async(i,e,t,n)=>{var o;if(aa.has(i)||i.isClosed)return n?Hf:void 0;const s=Os(i);if(s>0||i.socket.readyState!==1)return n?ir(Math.max(hi,s)):void 0;const r=await Wf(e,n?Ut({...Gs(t),nonce:wi(8)}):t);if(n&&!((o=Wt[i.url])!=null&&o.topics.has(e)))return ir(hi);if(Os(i)>0||i.isClosed||i.socket.readyState!==1)return n?ir(hi):void 0;if(i.send(r),n)return ir(hi)},ru=(i,e)=>{const t=Wt[i.url];if(!t||t.retryTimer!==null&&!e)return;t.retryTimer!==null&&clearTimeout(t.retryTimer);const n=e?Os(i):t.retryMs;t.retryMs=Math.min(t.retryMs*2,hi),t.retryTimer=setTimeout(()=>{t.retryTimer=null,nu(i)},Math.max(n,sc))},ou=Nf({init:i=>xd(i,Yf,Ff,!0).map(e=>{const t=Yh.register(e,()=>Ed(e,n=>{var c,l;const[s,r,o,a]=Gs(n);if(s!==Kh){const h=`${Ct}: relay failure from ${t.url} - `,u=s==="CLOSED"&&typeof o=="string"?o:a,f=s==="OK"&&o===!1,m=(f||s==="CLOSED")&&(u==null?void 0:u.startsWith("rate-limited:")),g=f&&(u==null?void 0:u.startsWith("duplicate:")),_=u&&/^(blocked|restricted|auth-required|pow):/.test(u);if(s==="OK"&&o===!0&&Os(t)===0&&Fs.delete(t),(f||s==="CLOSED")&&_&&!Gf(t))return;if(m)Vf(t);else if(s==="EOSE"){const p=Wt[t.url];p!=null&&p.pendingEose.delete(r)&&p.pendingEose.size===0&&(p.retryMs=sc,p.retryTimer!==null&&(clearTimeout(p.retryTimer),p.retryTimer=null),Date.now()-p.requestedAt>=1e3&&iu(t))}s==="CLOSED"&&!_&&ru(t,!!m),!g&&((c=i.relayConfig)==null?void 0:c.warnOnRelayFailure)!==!1&&(s==="NOTICE"?console.warn(h+r):(f||s==="CLOSED")&&console.warn(h+u));return}if(o&&typeof o=="object"&&"content"in o){const h=Wt[t.url];if(h!=null&&h.subIds.includes(r)&&o.tags){const u=o.tags.find(f=>f[0]===jh);u!=null&&u[1]&&((l=h.topics.get(u[1]))==null||l(u[1],o.content))}}},()=>nu(t)));return t.ready}),subscribeTopic:(i,e,t,n)=>{const s=(o,a)=>void t(o,a);Xf(i,e,s);const r=()=>{var o;((o=Wt[i.url])==null?void 0:o.topics.get(e))===s&&qf(i,e)};return n.kind==="root"?$f(i).then(()=>r):r},publishTopic:(i,e,t,{kind:n})=>{const s=typeof t=="string"?t:Ut(t);return n==="announce"&&(zr.forRelay(i)[e]=s),su(i,e,s,n==="announce")},unpublishTopic:(i,e)=>{delete zr.forRelay(i)[e]}}),Yf=["0x-nostr-relay.fly.dev","bendernostur.duckdns.org:8443","cdn.satellite.earth","nos.lol","nostr.chaima.info","nostr.christiansass.de","nostr.rblb.it","nostr.red5d.dev","nostr.robosats.org","nostr.stakey.net","nostrcity-club.fly.dev","relay-dev.gulugulu.moe","relay.aarpia.com","relay.agentry.com","relay.bitmacro.cloud","relay.bullishbounty.com","relay.degmods.com","relay.flashapp.me","relay.grigic.org","relay.hackshed.dev","relay.kaleidoswap.com","relay.layer.systems","relay.nostr.blockhenge.com","relay.nostr.dev.br","relay.nostrmap.net","relay.novospes.com","relay.piazza.today","relay.routstr.com","testr.nymble.world"].map(i=>"wss://"+i);function sn(i,e){if(!i||typeof i.makeAction!="function")return{send:()=>{},onReceive:()=>{}};const t=i.makeAction(e),n=(s,r)=>{if(typeof s=="string"&&s.length>0)return s;if(s&&typeof s=="object"){if(typeof s.peerId=="string"&&s.peerId.length>0)return s.peerId;if(typeof s.id=="string"&&s.id.length>0)return s.id}if(r&&typeof r=="object"){if(typeof r.id=="string"&&r.id.length>0)return r.id;if(typeof r.senderId=="string"&&r.senderId.length>0)return r.senderId}return null};return Array.isArray(t)?{send:(s,r)=>{try{t[0](s,r)}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{t[1]((r,o)=>{const a=n(o,r);a&&s(r,a)})}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}:{send:(s,r)=>{try{if(t&&typeof t.send=="function"){let o;r&&typeof r=="string"?o=t.send(s,{target:r}):o=t.send(s),o&&typeof o.catch=="function"&&o.catch(()=>{})}}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{if(!t)return;const r=(o,a)=>{const c=n(a,o);c&&s(o,c)};"onMessage"in t?t.onMessage=r:"onReceive"in t&&(typeof t.onReceive=="function"?t.onReceive(r):t.onReceive=r)}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}}const au="rockets-3d-space-shooter",jf="rockets_public_directory_v1",Kf=3e3,nl=12e3,cu=["wss://nos.lol","wss://relay.damus.io","wss://relay.snort.social","wss://nostr.mom"];class Zf{constructor(){this.lobbyRoom=null,this.activeRooms=new Map,this.listeners=new Set,this.heartbeatTimer=null,this.purgeTimer=null,this.currentHostingMatch=null,this.sendHeartbeat=null,this.sendQuery=null,this.isInitialized=!1}init(){if(!this.isInitialized){this.isInitialized=!0;try{this.lobbyRoom=ou({appId:au,relayConfig:{urls:cu}},jf);const e=sn(this.lobbyRoom,"room_heartbeat"),t=sn(this.lobbyRoom,"query_rooms");this.sendHeartbeat=e.send,this.sendQuery=t.send,e.onReceive((s,r)=>{!s||!s.roomId||(this.activeRooms.set(s.roomId,{...s,lastSeen:Date.now(),ttlMs:s.ttlMs||nl}),this.notifyListeners())}),t.onReceive((s,r)=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()});const n=()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()};typeof this.lobbyRoom.onPeerJoin=="function"?this.lobbyRoom.onPeerJoin(n):this.lobbyRoom.onPeerJoin=n,this.purgeTimer=setInterval(()=>{const s=Date.now();let r=!1;for(const[o,a]of this.activeRooms.entries())s-a.lastSeen>a.ttlMs&&(this.activeRooms.delete(o),r=!0);r&&this.notifyListeners()},2e3),this.refreshRooms()}catch(e){console.warn("Lobby network init warning:",e)}}}refreshRooms(){if(this.init(),this.sendQuery)try{this.sendQuery({req:"list",from:At})}catch(e){console.error(e)}}startMasterKeepAlive(e){this.init(),this.currentHostingMatch=e,this.stopMasterKeepAlive(),this.broadcastCurrentRoom(),this.heartbeatTimer=setInterval(()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()},Kf)}stopMasterKeepAlive(){this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null)}broadcastCurrentRoom(){if(this.currentHostingMatch&&(this.init(),!!this.sendHeartbeat))try{const e=this.currentHostingMatch,t=e.getPlayerCount?e.getPlayerCount():1,n={roomId:e.roomId,roomName:e.roomName||e.roomId,masterId:At,playerCount:t,mapSeed:e.mapSeed||42,timestamp:Date.now(),ttlMs:nl};this.sendHeartbeat(n),this.activeRooms.set(e.roomId,{...n,lastSeen:Date.now()}),this.notifyListeners()}catch(e){console.error("Failed to send heartbeat:",e)}}onRoomsUpdated(e){return this.listeners.add(e),e(this.getRoomsList()),()=>this.listeners.delete(e)}notifyListeners(){const e=this.getRoomsList();for(const t of this.listeners)t(e)}getRoomsList(){const e=Date.now(),t=[];for(const n of this.activeRooms.values()){const s=Math.max(0,Math.round((n.lastSeen+n.ttlMs-e)/1e3));t.push({...n,ttlSecondsRemaining:s})}return t.sort((n,s)=>s.lastSeen-n.lastSeen)}destroy(){if(this.stopMasterKeepAlive(),this.purgeTimer&&clearInterval(this.purgeTimer),this.lobbyRoom)try{this.lobbyRoom.leave()}catch{}this.activeRooms.clear(),this.listeners.clear(),this.isInitialized=!1}}const ui=new Zf;class Jf{constructor({roomId:e,roomName:t,mapSeed:n,playerName:s,onPeerJoined:r,onPeerLeft:o,onMasterChanged:a,onCombatLog:c}){this.roomId=e,this.roomName=t||e,this.mapSeed=n||42,this.playerName=s||`Pilot-${(At||"Host").slice(0,4)}`,this.selfId=At,this.onPeerJoined=r||(()=>{}),this.onPeerLeft=o||(()=>{}),this.onMasterChanged=a||(()=>{}),this.onCombatLog=c||(()=>{}),this.room=null,this.currentMasterId=this.selfId,this.isMaster=!0,this.peers=new Map,this.sendState=null,this.sendCannon=null,this.sendMine=null,this.sendHit=null,this.sendKill=null,this.sendPing=null,this.sendPong=null,this.sendLaser=null,this.sendDecoy=null,this.cannonListeners=new Set,this.mineListeners=new Set,this.hitListeners=new Set,this.killListeners=new Set,this.laserListeners=new Set,this.decoyListeners=new Set,this.pingInterval=null,this.stateBroadcastInterval=null}join(){this.room=ou({appId:au,relayConfig:{urls:cu}},this.roomId);const e=sn(this.room,"state"),t=sn(this.room,"cannon"),n=sn(this.room,"mine"),s=sn(this.room,"hit"),r=sn(this.room,"kill"),o=sn(this.room,"ping"),a=sn(this.room,"pong"),c=sn(this.room,"laser"),l=sn(this.room,"decoy");this.sendState=e.send,this.sendCannon=t.send,this.sendMine=n.send,this.sendHit=s.send,this.sendKill=r.send,this.sendPing=o.send,this.sendPong=a.send,this.sendLaser=c.send,this.sendDecoy=l.send,e.onReceive((f,m)=>{if(!m||typeof m!="string")return;this.peers.has(m)||this.peers.set(m,{id:m,ping:30,lastSeen:Date.now(),packetsReceived:0});const g=this.peers.get(m);g.lastState=f,g.lastSeen=Date.now(),g.packetsReceived=(g.packetsReceived||0)+1}),t.onReceive((f,m)=>{if(!(!m||typeof m!="string"))for(const g of this.cannonListeners)g(f,m)}),c.onReceive((f,m)=>{if(!(!m||typeof m!="string"))for(const g of this.laserListeners)g(f,m)}),l.onReceive((f,m)=>{if(!(!m||typeof m!="string"))for(const g of this.decoyListeners)g(f,m)}),n.onReceive((f,m)=>{if(!(!m||typeof m!="string"))for(const g of this.mineListeners)g(f,m)}),s.onReceive((f,m)=>{if(!(!m||typeof m!="string"))for(const g of this.hitListeners)g(f,m)}),r.onReceive((f,m)=>{if(!(!m||typeof m!="string"))for(const g of this.killListeners)g(f,m)}),o.onReceive((f,m)=>{!m||typeof m!="string"||this.sendPong&&this.sendPong({t:f.t},m)}),a.onReceive((f,m)=>{if(!(!m||typeof m!="string")&&f&&f.t&&this.peers.has(m)){const g=Math.max(1,Date.now()-f.t);this.peers.get(m).ping=g}});const h=f=>{!f||typeof f!="string"||(console.log(`[Mesh] Peer connected: ${f}`),this.peers.set(f,{id:f,ping:40,lastSeen:Date.now()}),this.updateMasterElection(),this.onPeerJoined(f),this.onCombatLog(`🛰️ Pilot joined the mesh: ${f.slice(0,5)}`))},u=f=>{!f||typeof f!="string"||(console.log(`[Mesh] Peer disconnected: ${f}`),this.peers.delete(f),this.updateMasterElection(),this.onPeerLeft(f),this.onCombatLog(`💨 Pilot left the mesh: ${f.slice(0,5)}`))};typeof this.room.onPeerJoin=="function"?this.room.onPeerJoin(h):this.room.onPeerJoin=h,typeof this.room.onPeerLeave=="function"?this.room.onPeerLeave(u):this.room.onPeerLeave=u,this.updateMasterElection(),this.isMaster&&ui.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),this.pingInterval=setInterval(()=>{this.sendPing&&this.peers.size>0&&this.sendPing({t:Date.now()})},2e3)}updateMasterElection(){if(!this.room)return;const e=Object.keys(this.room.getPeers()||{}),n=[this.selfId,...e].sort()[0],s=n===this.selfId;if(this.currentMasterId!==n||this.isMaster!==s){const r=this.currentMasterId;this.currentMasterId=n,this.isMaster=s,console.log(`[Mesh] Master Election: elected ${n} (Self is master: ${s})`),s?(ui.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),r&&r!==this.selfId&&this.onCombatLog("👑 Previous host left. You took over as Master! Keep-alive active.")):ui.stopMasterKeepAlive(),this.onMasterChanged(n,s)}}broadcastLocalState(e){this.sendState&&this.sendState({...e,id:this.selfId,name:this.playerName,time:Date.now()})}broadcastCannon(e){this.sendCannon&&this.sendCannon(e)}broadcastLaser(e){this.sendLaser&&this.sendLaser(e)}broadcastDecoy(e){this.sendDecoy&&this.sendDecoy(e)}onLaser(e){return this.laserListeners.add(e),()=>this.laserListeners.delete(e)}onDecoy(e){return this.decoyListeners.add(e),()=>this.decoyListeners.delete(e)}broadcastMine(e){this.sendMine&&this.sendMine(e)}sendHitTarget(e,t,n){this.sendHit&&this.sendHit({targetId:e,attackerId:this.selfId,attackerName:this.playerName,damage:t,weapon:n,time:Date.now()})}broadcastKill(e,t,n){this.sendKill&&this.sendKill({victimId:e,killerId:t,killerName:n,time:Date.now()})}onCannon(e){return this.cannonListeners.add(e),()=>this.cannonListeners.delete(e)}onMine(e){return this.mineListeners.add(e),()=>this.mineListeners.delete(e)}onHit(e){return this.hitListeners.add(e),()=>this.hitListeners.delete(e)}onKill(e){return this.killListeners.add(e),()=>this.killListeners.delete(e)}getAveragePing(){if(this.peers.size===0)return 0;let e=0;for(const t of this.peers.values())e+=t.ping||30;return Math.round(e/this.peers.size)}leave(){if(ui.stopMasterKeepAlive(),this.pingInterval&&clearInterval(this.pingInterval),this.stateBroadcastInterval&&clearInterval(this.stateBroadcastInterval),this.room){try{this.room.leave()}catch{}this.room=null}this.peers.clear(),this.cannonListeners.clear(),this.mineListeners.clear(),this.hitListeners.clear(),this.killListeners.clear(),this.laserListeners.clear(),this.decoyListeners.clear()}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rc="170",Qf=0,il=1,ep=2,lu=1,tp=2,En=3,jt=0,Rt=1,Ot=2,$n=0,$i=1,rt=2,sl=3,rl=4,np=5,ci=100,ip=101,sp=102,rp=103,op=104,ap=200,cp=201,lp=202,hp=203,ca=204,la=205,up=206,dp=207,fp=208,pp=209,mp=210,gp=211,vp=212,_p=213,yp=214,ha=0,ua=1,da=2,ts=3,fa=4,pa=5,ma=6,ga=7,hu=0,xp=1,Mp=2,Yn=0,Sp=1,wp=2,Ep=3,uu=4,bp=5,Tp=6,Ap=7,du=300,ns=301,is=302,va=303,_a=304,jr=306,Bs=1e3,di=1001,ya=1002,ln=1003,Rp=1004,sr=1005,fn=1006,mo=1007,fi=1008,Ln=1009,fu=1010,pu=1011,ks=1012,oc=1013,_i=1014,An=1015,Ws=1016,ac=1017,cc=1018,ss=1020,mu=35902,gu=1021,vu=1022,on=1023,_u=1024,yu=1025,Yi=1026,rs=1027,xu=1028,lc=1029,Mu=1030,hc=1031,uc=1033,Lr=33776,Dr=33777,Ir=33778,Ur=33779,xa=35840,Ma=35841,Sa=35842,wa=35843,Ea=36196,ba=37492,Ta=37496,Aa=37808,Ra=37809,Ca=37810,Pa=37811,La=37812,Da=37813,Ia=37814,Ua=37815,Na=37816,Fa=37817,Oa=37818,Ba=37819,ka=37820,za=37821,Nr=36492,Va=36494,Ha=36495,Su=36283,Ga=36284,Wa=36285,Xa=36286,Cp=3200,Pp=3201,wu=0,Lp=1,Wn="",$t="srgb",as="srgb-linear",Kr="linear",it="srgb",Ri=7680,ol=519,Dp=512,Ip=513,Up=514,Eu=515,Np=516,Fp=517,Op=518,Bp=519,qa=35044,al="300 es",Rn=2e3,Vr=2001;class cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],go=Math.PI/180,$a=180/Math.PI;function jn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function Ft(i,e,t){return Math.max(e,Math.min(t,i))}function kp(i,e){return(i%e+e)%e}function vo(i,e,t){return(1-t)*i+t*e}function dn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function st(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,s,r,o,a,c,l){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],m=n[5],g=n[8],_=s[0],p=s[3],d=s[6],v=s[1],y=s[4],x=s[7],R=s[2],T=s[5],A=s[8];return r[0]=o*_+a*v+c*R,r[3]=o*p+a*y+c*T,r[6]=o*d+a*x+c*A,r[1]=l*_+h*v+u*R,r[4]=l*p+h*y+u*T,r[7]=l*d+h*x+u*A,r[2]=f*_+m*v+g*R,r[5]=f*p+m*y+g*T,r[8]=f*d+m*x+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,m=l*r-o*c,g=t*u+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(a*n-s*o)*_,e[3]=f*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-a*t)*_,e[6]=m*_,e[7]=(n*c-l*t)*_,e[8]=(o*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(_o.makeScale(e,t)),this}rotate(e){return this.premultiply(_o.makeRotation(-e)),this}translate(e,t){return this.premultiply(_o.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const _o=new We;function bu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Hr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function zp(){const i=Hr("canvas");return i.style.display="block",i}const cl={};function As(i){i in cl||(cl[i]=!0,console.warn(i))}function Vp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Hp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Gp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ze={enabled:!0,workingColorSpace:as,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===it&&(i.r=Cn(i.r),i.g=Cn(i.g),i.b=Cn(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===it&&(i.r=ji(i.r),i.g=ji(i.g),i.b=ji(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Wn?Kr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function Cn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ll=[.64,.33,.3,.6,.15,.06],hl=[.2126,.7152,.0722],ul=[.3127,.329],dl=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fl=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ze.define({[as]:{primaries:ll,whitePoint:ul,transfer:Kr,toXYZ:dl,fromXYZ:fl,luminanceCoefficients:hl,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:ll,whitePoint:ul,transfer:it,toXYZ:dl,fromXYZ:fl,luminanceCoefficients:hl,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}});let Ci;class Wp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ci===void 0&&(Ci=Hr("canvas")),Ci.width=e.width,Ci.height=e.height;const n=Ci.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ci}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Hr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Cn(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Cn(t[n]/255)*255):t[n]=Cn(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Xp=0;class Tu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=jn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(yo(s[o].image)):r.push(yo(s[o]))}else r=yo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function yo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Wp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let qp=0;class It extends cs{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=di,s=di,r=fn,o=fi,a=on,c=Ln,l=It.DEFAULT_ANISOTROPY,h=Wn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=jn(),this.name="",this.source=new Tu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==du)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Bs:e.x=e.x-Math.floor(e.x);break;case di:e.x=e.x<0?0:1;break;case ya:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Bs:e.y=e.y-Math.floor(e.y);break;case di:e.y=e.y<0?0:1;break;case ya:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=du;It.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,s=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],m=c[5],g=c[9],_=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,x=(m+1)/2,R=(d+1)/2,T=(h+f)/4,A=(u+_)/4,L=(g+p)/4;return y>x&&y>R?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=T/n,r=A/n):x>R?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=T/s,r=L/s):R<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(R),n=A/r,s=L/r),this.set(n,s,r,t),this}let v=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(v)<.001&&(v=1),this.x=(p-g)/v,this.y=(u-_)/v,this.z=(f-h)/v,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class $p extends cs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new It(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Tu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends $p{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Au extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yp extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pn{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],m=r[o+1],g=r[o+2],_=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==f||l!==m||h!==g){let p=1-a;const d=c*f+l*m+h*g+u*_,v=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const R=Math.sqrt(y),T=Math.atan2(R,d*v);p=Math.sin(p*T)/R,a=Math.sin(a*T)/R}const x=a*v;if(c=c*p+f*x,l=l*p+m*x,h=h*p+g*x,u=u*p+_*x,p===1-a){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*m-l*f,e[t+1]=c*g+h*f+l*u-a*m,e[t+2]=l*g+h*m+a*f-c*u,e[t+3]=h*g-a*u-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),m=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u+f*m*g;break;case"YZX":this._x=f*h*u+l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u-f*m*g;break;case"XZY":this._x=f*h*u-l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=n+a+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(n>a&&n>u){const m=2*Math.sqrt(1+n-a-u);this._w=(h-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>u){const m=2*Math.sqrt(1+a-n-u);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-n-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,t=0,n=0){U.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),u=2*(r*n-o*t);return this.x=t+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return xo.copy(this).projectOnVector(e),this.sub(xo)}reflect(e){return this.sub(xo.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xo=new U,pl=new pn;class Xs{constructor(e=new U(1/0,1/0,1/0),t=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(en.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(en.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=en.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,en):en.fromBufferAttribute(r,o),en.applyMatrix4(e.matrixWorld),this.expandByPoint(en);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),rr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),rr.copy(n.boundingBox)),rr.applyMatrix4(e.matrixWorld),this.union(rr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,en),en.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vs),or.subVectors(this.max,vs),Pi.subVectors(e.a,vs),Li.subVectors(e.b,vs),Di.subVectors(e.c,vs),Nn.subVectors(Li,Pi),Fn.subVectors(Di,Li),Qn.subVectors(Pi,Di);let t=[0,-Nn.z,Nn.y,0,-Fn.z,Fn.y,0,-Qn.z,Qn.y,Nn.z,0,-Nn.x,Fn.z,0,-Fn.x,Qn.z,0,-Qn.x,-Nn.y,Nn.x,0,-Fn.y,Fn.x,0,-Qn.y,Qn.x,0];return!Mo(t,Pi,Li,Di,or)||(t=[1,0,0,0,1,0,0,0,1],!Mo(t,Pi,Li,Di,or))?!1:(ar.crossVectors(Nn,Fn),t=[ar.x,ar.y,ar.z],Mo(t,Pi,Li,Di,or))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,en).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(en).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const _n=[new U,new U,new U,new U,new U,new U,new U,new U],en=new U,rr=new Xs,Pi=new U,Li=new U,Di=new U,Nn=new U,Fn=new U,Qn=new U,vs=new U,or=new U,ar=new U,ei=new U;function Mo(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ei.fromArray(i,r);const a=s.x*Math.abs(ei.x)+s.y*Math.abs(ei.y)+s.z*Math.abs(ei.z),c=e.dot(ei),l=t.dot(ei),h=n.dot(ei);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const jp=new Xs,_s=new U,So=new U;class qs{constructor(e=new U,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):jp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_s.subVectors(e,this.center);const t=_s.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(_s,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(So.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_s.copy(e.center).add(So)),this.expandByPoint(_s.copy(e.center).sub(So))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const yn=new U,wo=new U,cr=new U,On=new U,Eo=new U,lr=new U,bo=new U;class Ru{constructor(e=new U,t=new U(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,yn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=yn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(yn.copy(this.origin).addScaledVector(this.direction,t),yn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){wo.copy(e).add(t).multiplyScalar(.5),cr.copy(t).sub(e).normalize(),On.copy(this.origin).sub(wo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(cr),a=On.dot(this.direction),c=-On.dot(cr),l=On.lengthSq(),h=Math.abs(1-o*o);let u,f,m,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const _=1/h;u*=_,f*=_,m=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(wo).addScaledVector(cr,f),m}intersectSphere(e,t){yn.subVectors(e.center,this.origin);const n=yn.dot(this.direction),s=yn.dot(yn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,yn)!==null}intersectTriangle(e,t,n,s,r){Eo.subVectors(t,e),lr.subVectors(n,e),bo.crossVectors(Eo,lr);let o=this.direction.dot(bo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;On.subVectors(this.origin,e);const c=a*this.direction.dot(lr.crossVectors(On,lr));if(c<0)return null;const l=a*this.direction.dot(Eo.cross(On));if(l<0||c+l>o)return null;const h=-a*On.dot(bo);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,t,n,s,r,o,a,c,l,h,u,f,m,g,_,p){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,u,f,m,g,_,p)}set(e,t,n,s,r,o,a,c,l,h,u,f,m,g,_,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=n,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=g,d[11]=_,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ii.setFromMatrixColumn(e,0).length(),r=1/Ii.setFromMatrixColumn(e,1).length(),o=1/Ii.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,m=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+g*l,t[5]=f-_*l,t[9]=-a*c,t[2]=_-f*l,t[6]=g+m*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,m=c*u,g=l*h,_=l*u;t[0]=f+_*a,t[4]=g*a-m,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-g,t[6]=_+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,m=c*u,g=l*h,_=l*u;t[0]=f-_*a,t[4]=-o*u,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*h,t[9]=_-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,m=o*u,g=a*h,_=a*u;t[0]=c*h,t[4]=g*l-m,t[8]=f*l+_,t[1]=c*u,t[5]=_*l+f,t[9]=m*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,m=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=_-f*u,t[8]=g*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=m*u+g,t[10]=f-_*u}else if(e.order==="XZY"){const f=o*c,m=o*l,g=a*c,_=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+_,t[5]=o*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=a*h,t[10]=_*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Kp,e,Zp)}lookAt(e,t,n){const s=this.elements;return zt.subVectors(e,t),zt.lengthSq()===0&&(zt.z=1),zt.normalize(),Bn.crossVectors(n,zt),Bn.lengthSq()===0&&(Math.abs(n.z)===1?zt.x+=1e-4:zt.z+=1e-4,zt.normalize(),Bn.crossVectors(n,zt)),Bn.normalize(),hr.crossVectors(zt,Bn),s[0]=Bn.x,s[4]=hr.x,s[8]=zt.x,s[1]=Bn.y,s[5]=hr.y,s[9]=zt.y,s[2]=Bn.z,s[6]=hr.z,s[10]=zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],d=n[14],v=n[3],y=n[7],x=n[11],R=n[15],T=s[0],A=s[4],L=s[8],w=s[12],M=s[1],I=s[5],W=s[9],S=s[13],D=s[2],N=s[6],P=s[10],z=s[14],B=s[3],O=s[7],k=s[11],Z=s[15];return r[0]=o*T+a*M+c*D+l*B,r[4]=o*A+a*I+c*N+l*O,r[8]=o*L+a*W+c*P+l*k,r[12]=o*w+a*S+c*z+l*Z,r[1]=h*T+u*M+f*D+m*B,r[5]=h*A+u*I+f*N+m*O,r[9]=h*L+u*W+f*P+m*k,r[13]=h*w+u*S+f*z+m*Z,r[2]=g*T+_*M+p*D+d*B,r[6]=g*A+_*I+p*N+d*O,r[10]=g*L+_*W+p*P+d*k,r[14]=g*w+_*S+p*z+d*Z,r[3]=v*T+y*M+x*D+R*B,r[7]=v*A+y*I+x*N+R*O,r[11]=v*L+y*W+x*P+R*k,r[15]=v*w+y*S+x*z+R*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],m=e[14],g=e[3],_=e[7],p=e[11],d=e[15];return g*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*m-n*c*m)+_*(+t*c*m-t*l*f+r*o*f-s*o*m+s*l*h-r*c*h)+p*(+t*l*u-t*a*m-r*o*u+n*o*m+r*a*h-n*l*h)+d*(-s*a*h-t*c*u+t*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],m=e[11],g=e[12],_=e[13],p=e[14],d=e[15],v=u*p*l-_*f*l+_*c*m-a*p*m-u*c*d+a*f*d,y=g*f*l-h*p*l-g*c*m+o*p*m+h*c*d-o*f*d,x=h*_*l-g*u*l+g*a*m-o*_*m-h*a*d+o*u*d,R=g*u*c-h*_*c-g*a*f+o*_*f+h*a*p-o*u*p,T=t*v+n*y+s*x+r*R;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return e[0]=v*A,e[1]=(_*f*r-u*p*r-_*s*m+n*p*m+u*s*d-n*f*d)*A,e[2]=(a*p*r-_*c*r+_*s*l-n*p*l-a*s*d+n*c*d)*A,e[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*m-n*c*m)*A,e[4]=y*A,e[5]=(h*p*r-g*f*r+g*s*m-t*p*m-h*s*d+t*f*d)*A,e[6]=(g*c*r-o*p*r-g*s*l+t*p*l+o*s*d-t*c*d)*A,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*m+t*c*m)*A,e[8]=x*A,e[9]=(g*u*r-h*_*r-g*n*m+t*_*m+h*n*d-t*u*d)*A,e[10]=(o*_*r-g*a*r+g*n*l-t*_*l-o*n*d+t*a*d)*A,e[11]=(h*a*r-o*u*r-h*n*l+t*u*l+o*n*m-t*a*m)*A,e[12]=R*A,e[13]=(h*_*s-g*u*s+g*n*f-t*_*f-h*n*p+t*u*p)*A,e[14]=(g*a*s-o*_*s-g*n*c+t*_*c+o*n*p-t*a*p)*A,e[15]=(o*u*s-h*a*s+h*n*c-t*u*c-o*n*f+t*a*f)*A,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,m=r*h,g=r*u,_=o*h,p=o*u,d=a*u,v=c*l,y=c*h,x=c*u,R=n.x,T=n.y,A=n.z;return s[0]=(1-(_+d))*R,s[1]=(m+x)*R,s[2]=(g-y)*R,s[3]=0,s[4]=(m-x)*T,s[5]=(1-(f+d))*T,s[6]=(p+v)*T,s[7]=0,s[8]=(g+y)*A,s[9]=(p-v)*A,s[10]=(1-(f+_))*A,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ii.set(s[0],s[1],s[2]).length();const o=Ii.set(s[4],s[5],s[6]).length(),a=Ii.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],tn.copy(this);const l=1/r,h=1/o,u=1/a;return tn.elements[0]*=l,tn.elements[1]*=l,tn.elements[2]*=l,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,t.setFromRotationMatrix(tn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=Rn){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),f=(n+s)/(n-s);let m,g;if(a===Rn)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Vr)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=Rn){const c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(o-r),f=(t+e)*l,m=(n+s)*h;let g,_;if(a===Rn)g=(o+r)*u,_=-2*u;else if(a===Vr)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ii=new U,tn=new ut,Kp=new U(0,0,0),Zp=new U(1,1,1),Bn=new U,hr=new U,zt=new U,ml=new ut,gl=new pn;class Zt{constructor(e=0,t=0,n=0,s=Zt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ft(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ft(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ft(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ml,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gl.setFromEuler(this),this.setFromQuaternion(gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Zt.DEFAULT_ORDER="XYZ";class Cu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Jp=0;const vl=new U,Ui=new pn,xn=new ut,ur=new U,ys=new U,Qp=new U,em=new pn,_l=new U(1,0,0),yl=new U(0,1,0),xl=new U(0,0,1),Ml={type:"added"},tm={type:"removed"},Ni={type:"childadded",child:null},To={type:"childremoved",child:null};class vt extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jp++}),this.uuid=jn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new U,t=new Zt,n=new pn,s=new U(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ut},normalMatrix:{value:new We}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Cu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(_l,e)}rotateY(e){return this.rotateOnAxis(yl,e)}rotateZ(e){return this.rotateOnAxis(xl,e)}translateOnAxis(e,t){return vl.copy(e).applyQuaternion(this.quaternion),this.position.add(vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_l,e)}translateY(e){return this.translateOnAxis(yl,e)}translateZ(e){return this.translateOnAxis(xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ur.copy(e):ur.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xn.lookAt(ys,ur,this.up):xn.lookAt(ur,ys,this.up),this.quaternion.setFromRotationMatrix(xn),s&&(xn.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(xn),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ml),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(tm),To.child=e,this.dispatchEvent(To),To.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xn.multiply(e.parent.matrixWorld)),e.applyMatrix4(xn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ml),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,e,Qp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,em,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}vt.DEFAULT_UP=new U(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new U,Mn=new U,Ao=new U,Sn=new U,Fi=new U,Oi=new U,Sl=new U,Ro=new U,Co=new U,Po=new U,Lo=new ot,Do=new ot,Io=new ot;class Yt{constructor(e=new U,t=new U,n=new U){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),nn.subVectors(e,t),s.cross(nn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){nn.subVectors(s,t),Mn.subVectors(n,t),Ao.subVectors(e,t);const o=nn.dot(nn),a=nn.dot(Mn),c=nn.dot(Ao),l=Mn.dot(Mn),h=Mn.dot(Ao),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Sn)===null?!1:Sn.x>=0&&Sn.y>=0&&Sn.x+Sn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,Sn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Sn.x),c.addScaledVector(o,Sn.y),c.addScaledVector(a,Sn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Lo.setScalar(0),Do.setScalar(0),Io.setScalar(0),Lo.fromBufferAttribute(e,t),Do.fromBufferAttribute(e,n),Io.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Lo,r.x),o.addScaledVector(Do,r.y),o.addScaledVector(Io,r.z),o}static isFrontFacing(e,t,n,s){return nn.subVectors(n,t),Mn.subVectors(e,t),nn.cross(Mn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return nn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),nn.cross(Mn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Yt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Yt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Fi.subVectors(s,n),Oi.subVectors(r,n),Ro.subVectors(e,n);const c=Fi.dot(Ro),l=Oi.dot(Ro);if(c<=0&&l<=0)return t.copy(n);Co.subVectors(e,s);const h=Fi.dot(Co),u=Oi.dot(Co);if(h>=0&&u<=h)return t.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Fi,o);Po.subVectors(e,r);const m=Fi.dot(Po),g=Oi.dot(Po);if(g>=0&&m<=g)return t.copy(r);const _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(n).addScaledVector(Oi,a);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Sl.subVectors(r,s),a=(u-h)/(u-h+(m-g)),t.copy(s).addScaledVector(Sl,a);const d=1/(p+_+f);return o=_*d,a=f*d,t.copy(n).addScaledVector(Fi,o).addScaledVector(Oi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Pu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},kn={h:0,s:0,l:0},dr={h:0,s:0,l:0};function Uo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=kp(e,1),t=Ft(t,0,1),n=Ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Uo(o,r,e+1/3),this.g=Uo(o,r,e),this.b=Uo(o,r,e-1/3)}return Ze.toWorkingColorSpace(this,s),this}setStyle(e,t=$t){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const n=Pu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Cn(e.r),this.g=Cn(e.g),this.b=Cn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return Ze.fromWorkingColorSpace(Tt.copy(this),e),Math.round(Ft(Tt.r*255,0,255))*65536+Math.round(Ft(Tt.g*255,0,255))*256+Math.round(Ft(Tt.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(Tt.copy(this),t);const n=Tt.r,s=Tt.g,r=Tt.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(Tt.copy(this),t),e.r=Tt.r,e.g=Tt.g,e.b=Tt.b,e}getStyle(e=$t){Ze.fromWorkingColorSpace(Tt.copy(this),e);const t=Tt.r,n=Tt.g,s=Tt.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(kn),this.setHSL(kn.h+e,kn.s+t,kn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(kn),e.getHSL(dr);const n=vo(kn.h,dr.h,t),s=vo(kn.s,dr.s,t),r=vo(kn.l,dr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Tt=new je;je.NAMES=Pu;let nm=0;class bi extends cs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=jn(),this.name="",this.blending=$i,this.side=jt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ca,this.blendDst=la,this.blendEquation=ci,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==jt&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ca&&(n.blendSrc=this.blendSrc),this.blendDst!==la&&(n.blendDst=this.blendDst),this.blendEquation!==ci&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ol&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ke extends bi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.combine=hu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gt=new U,fr=new ze;class mt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=qa,this.updateRanges=[],this.gpuType=An,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)fr.fromBufferAttribute(this,t),fr.applyMatrix3(e),this.setXY(t,fr.x,fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qa&&(e.usage=this.usage),e}}class Lu extends mt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Du extends mt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends mt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let im=0;const qt=new ut,No=new vt,Bi=new U,Vt=new Xs,xs=new Xs,Mt=new U;class xt extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=jn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bu(e)?Du:Lu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return qt.makeRotationFromQuaternion(e),this.applyMatrix4(qt),this}rotateX(e){return qt.makeRotationX(e),this.applyMatrix4(qt),this}rotateY(e){return qt.makeRotationY(e),this.applyMatrix4(qt),this}rotateZ(e){return qt.makeRotationZ(e),this.applyMatrix4(qt),this}translate(e,t,n){return qt.makeTranslation(e,t,n),this.applyMatrix4(qt),this}scale(e,t,n){return qt.makeScale(e,t,n),this.applyMatrix4(qt),this}lookAt(e){return No.lookAt(e),No.updateMatrix(),this.applyMatrix4(No.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Bi).negate(),this.translate(Bi.x,Bi.y,Bi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Vt.setFromBufferAttribute(r),this.morphTargetsRelative?(Mt.addVectors(this.boundingBox.min,Vt.min),this.boundingBox.expandByPoint(Mt),Mt.addVectors(this.boundingBox.max,Vt.max),this.boundingBox.expandByPoint(Mt)):(this.boundingBox.expandByPoint(Vt.min),this.boundingBox.expandByPoint(Vt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const n=this.boundingSphere.center;if(Vt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Mt.addVectors(Vt.min,xs.min),Vt.expandByPoint(Mt),Mt.addVectors(Vt.max,xs.max),Vt.expandByPoint(Mt)):(Vt.expandByPoint(xs.min),Vt.expandByPoint(xs.max))}Vt.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Mt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Mt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Mt.fromBufferAttribute(a,l),c&&(Bi.fromBufferAttribute(e,l),Mt.add(Bi)),s=Math.max(s,n.distanceToSquared(Mt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new U,c[L]=new U;const l=new U,h=new U,u=new U,f=new ze,m=new ze,g=new ze,_=new U,p=new U;function d(L,w,M){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,w),u.fromBufferAttribute(n,M),f.fromBufferAttribute(r,L),m.fromBufferAttribute(r,w),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),m.sub(f),g.sub(f);const I=1/(m.x*g.y-g.x*m.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(I),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(I),a[L].add(_),a[w].add(_),a[M].add(_),c[L].add(p),c[w].add(p),c[M].add(p))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let L=0,w=v.length;L<w;++L){const M=v[L],I=M.start,W=M.count;for(let S=I,D=I+W;S<D;S+=3)d(e.getX(S+0),e.getX(S+1),e.getX(S+2))}const y=new U,x=new U,R=new U,T=new U;function A(L){R.fromBufferAttribute(s,L),T.copy(R);const w=a[L];y.copy(w),y.sub(R.multiplyScalar(R.dot(w))).normalize(),x.crossVectors(T,w);const I=x.dot(c[L])<0?-1:1;o.setXYZW(L,y.x,y.y,y.z,I)}for(let L=0,w=v.length;L<w;++L){const M=v[L],I=M.start,W=M.count;for(let S=I,D=I+W;S<D;S+=3)A(e.getX(S+0)),A(e.getX(S+1)),A(e.getX(S+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new mt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);const s=new U,r=new U,o=new U,a=new U,c=new U,l=new U,h=new U,u=new U;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),_=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mt.fromBufferAttribute(e,t),Mt.normalize(),e.setXYZ(t,Mt.x,Mt.y,Mt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let m=0,g=0;for(let _=0,p=c.length;_<p;_++){a.isInterleavedBufferAttribute?m=c[_]*a.data.stride+a.offset:m=c[_]*h;for(let d=0;d<h;d++)f[g++]=l[m++]}return new mt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new xt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],m=e(f,n);c.push(m)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wl=new ut,ti=new Ru,pr=new qs,El=new U,mr=new U,gr=new U,vr=new U,Fo=new U,_r=new U,bl=new U,yr=new U;class Se extends vt{constructor(e=new xt,t=new Ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){_r.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Fo.fromBufferAttribute(u,e),o?_r.addScaledVector(Fo,h):_r.addScaledVector(Fo.sub(t),h))}t.add(_r)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),pr.copy(n.boundingSphere),pr.applyMatrix4(r),ti.copy(e.ray).recast(e.near),!(pr.containsPoint(ti.origin)===!1&&(ti.intersectSphere(pr,El)===null||ti.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(wl.copy(r).invert(),ti.copy(e.ray).applyMatrix4(wl),!(n.boundingBox!==null&&ti.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ti)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=o[p.materialIndex],v=Math.max(p.start,m.start),y=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let x=v,R=y;x<R;x+=3){const T=a.getX(x),A=a.getX(x+1),L=a.getX(x+2);s=xr(this,d,e,n,l,h,u,T,A,L),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(a.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const v=a.getX(p),y=a.getX(p+1),x=a.getX(p+2);s=xr(this,o,e,n,l,h,u,v,y,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,_=f.length;g<_;g++){const p=f[g],d=o[p.materialIndex],v=Math.max(p.start,m.start),y=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let x=v,R=y;x<R;x+=3){const T=x,A=x+1,L=x+2;s=xr(this,d,e,n,l,h,u,T,A,L),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=g,d=_;p<d;p+=3){const v=p,y=p+1,x=p+2;s=xr(this,o,e,n,l,h,u,v,y,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function sm(i,e,t,n,s,r,o,a){let c;if(e.side===Rt?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===jt,a),c===null)return null;yr.copy(a),yr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(yr);return l<t.near||l>t.far?null:{distance:l,point:yr.clone(),object:i}}function xr(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,mr),i.getVertexPosition(c,gr),i.getVertexPosition(l,vr);const h=sm(i,e,t,n,mr,gr,vr,bl);if(h){const u=new U;Yt.getBarycoord(bl,mr,gr,vr,u),s&&(h.uv=Yt.getInterpolatedAttribute(s,a,c,l,u,new ze)),r&&(h.uv1=Yt.getInterpolatedAttribute(r,a,c,l,u,new ze)),o&&(h.normal=Yt.getInterpolatedAttribute(o,a,c,l,u,new U),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new U,materialIndex:0};Yt.getNormal(mr,gr,vr,f.normal),h.face=f,h.barycoord=u}return h}class wt extends xt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,n,t,e,o,r,0),g("z","y","x",1,-1,n,t,-e,o,r,1),g("x","z","y",1,1,e,n,t,s,o,2),g("x","z","y",1,-1,e,n,-t,s,o,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(u,2));function g(_,p,d,v,y,x,R,T,A,L,w){const M=x/A,I=R/L,W=x/2,S=R/2,D=T/2,N=A+1,P=L+1;let z=0,B=0;const O=new U;for(let k=0;k<P;k++){const Z=k*I-S;for(let le=0;le<N;le++){const Me=le*M-W;O[_]=Me*v,O[p]=Z*y,O[d]=D,l.push(O.x,O.y,O.z),O[_]=0,O[p]=0,O[d]=T>0?1:-1,h.push(O.x,O.y,O.z),u.push(le/A),u.push(1-k/L),z+=1}}for(let k=0;k<L;k++)for(let Z=0;Z<A;Z++){const le=f+Z+N*k,Me=f+Z+N*(k+1),X=f+(Z+1)+N*(k+1),te=f+(Z+1)+N*k;c.push(le,Me,te),c.push(Me,X,te),B+=6}a.addGroup(m,B,w),m+=B,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function os(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Lt(i){const e={};for(let t=0;t<i.length;t++){const n=os(i[t]);for(const s in n)e[s]=n[s]}return e}function rm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Iu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const om={clone:os,merge:Lt};var am=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends bi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=am,this.fragmentShader=cm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=rm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Uu extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=Rn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const zn=new U,Tl=new ze,Al=new ze;class Ht extends Uu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=$a*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(go*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $a*2*Math.atan(Math.tan(go*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zn.x,zn.y).multiplyScalar(-e/zn.z),zn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zn.x,zn.y).multiplyScalar(-e/zn.z)}getViewSize(e,t){return this.getViewBounds(e,Tl,Al),t.subVectors(Al,Tl)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(go*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ki=-90,zi=1;class lm extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ht(ki,zi,e,t);s.layers=this.layers,this.add(s);const r=new Ht(ki,zi,e,t);r.layers=this.layers,this.add(r);const o=new Ht(ki,zi,e,t);o.layers=this.layers,this.add(o);const a=new Ht(ki,zi,e,t);a.layers=this.layers,this.add(a);const c=new Ht(ki,zi,e,t);c.layers=this.layers,this.add(c);const l=new Ht(ki,zi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Rn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Vr)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,f,m),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Nu extends It{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ns,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class hm extends yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Nu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:fn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new wt(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Rt,blending:$n});r.uniforms.tEquirect.value=t;const o=new Se(s,r),a=t.minFilter;return t.minFilter===fi&&(t.minFilter=fn),new lm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Oo=new U,um=new U,dm=new We;class oi{constructor(e=new U(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Oo.subVectors(n,t).cross(um.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Oo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||dm.getNormalMatrix(e),s=this.coplanarPoint(Oo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ni=new qs,Mr=new U;class dc{constructor(e=new oi,t=new oi,n=new oi,s=new oi,r=new oi,o=new oi){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Rn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],m=s[8],g=s[9],_=s[10],p=s[11],d=s[12],v=s[13],y=s[14],x=s[15];if(n[0].setComponents(c-r,f-l,p-m,x-d).normalize(),n[1].setComponents(c+r,f+l,p+m,x+d).normalize(),n[2].setComponents(c+o,f+h,p+g,x+v).normalize(),n[3].setComponents(c-o,f-h,p-g,x-v).normalize(),n[4].setComponents(c-a,f-u,p-_,x-y).normalize(),t===Rn)n[5].setComponents(c+a,f+u,p+_,x+y).normalize();else if(t===Vr)n[5].setComponents(a,u,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ni.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ni.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ni)}intersectsSprite(e){return ni.center.set(0,0,0),ni.radius=.7071067811865476,ni.applyMatrix4(e.matrixWorld),this.intersectsSphere(ni)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Mr.x=s.normal.x>0?e.max.x:e.min.x,Mr.y=s.normal.y>0?e.max.y:e.min.y,Mr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Fu(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function fm(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<u.length;m++){const g=u[f],_=u[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,u[f]=_)}u.length=f+1;for(let m=0,g=u.length;m<g;m++){const _=u[m];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class $s extends xt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,m=[],g=[],_=[],p=[];for(let d=0;d<h;d++){const v=d*f-o;for(let y=0;y<l;y++){const x=y*u-r;g.push(x,-v,0),_.push(0,0,1),p.push(y/a),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let v=0;v<a;v++){const y=v+l*d,x=v+l*(d+1),R=v+1+l*(d+1),T=v+1+l*d;m.push(y,x,T),m.push(x,R,T)}this.setIndex(m),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $s(e.width,e.height,e.widthSegments,e.heightSegments)}}var pm=`#ifdef USE_ALPHAHASH
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
#endif`,bm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Tm=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Bm=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,km=`vec3 transformedNormal = objectNormal;
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
#endif`,bg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tg=`#ifdef USE_INSTANCING_MORPH
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
#endif`,Bg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,kg=`#ifdef USE_CLEARCOATMAP
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
}`,b0=`uniform float scale;
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
}`,T0=`uniform vec3 diffuse;
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
}`,B0=`#define STANDARD
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
}`,k0=`#define TOON
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
}`,Xe={alphahash_fragment:pm,alphahash_pars_fragment:mm,alphamap_fragment:gm,alphamap_pars_fragment:vm,alphatest_fragment:_m,alphatest_pars_fragment:ym,aomap_fragment:xm,aomap_pars_fragment:Mm,batching_pars_vertex:Sm,batching_vertex:wm,begin_vertex:Em,beginnormal_vertex:bm,bsdfs:Tm,iridescence_fragment:Am,bumpmap_pars_fragment:Rm,clipping_planes_fragment:Cm,clipping_planes_pars_fragment:Pm,clipping_planes_pars_vertex:Lm,clipping_planes_vertex:Dm,color_fragment:Im,color_pars_fragment:Um,color_pars_vertex:Nm,color_vertex:Fm,common:Om,cube_uv_reflection_fragment:Bm,defaultnormal_vertex:km,displacementmap_pars_vertex:zm,displacementmap_vertex:Vm,emissivemap_fragment:Hm,emissivemap_pars_fragment:Gm,colorspace_fragment:Wm,colorspace_pars_fragment:Xm,envmap_fragment:qm,envmap_common_pars_fragment:$m,envmap_pars_fragment:Ym,envmap_pars_vertex:jm,envmap_physical_pars_fragment:og,envmap_vertex:Km,fog_vertex:Zm,fog_pars_vertex:Jm,fog_fragment:Qm,fog_pars_fragment:eg,gradientmap_pars_fragment:tg,lightmap_pars_fragment:ng,lights_lambert_fragment:ig,lights_lambert_pars_fragment:sg,lights_pars_begin:rg,lights_toon_fragment:ag,lights_toon_pars_fragment:cg,lights_phong_fragment:lg,lights_phong_pars_fragment:hg,lights_physical_fragment:ug,lights_physical_pars_fragment:dg,lights_fragment_begin:fg,lights_fragment_maps:pg,lights_fragment_end:mg,logdepthbuf_fragment:gg,logdepthbuf_pars_fragment:vg,logdepthbuf_pars_vertex:_g,logdepthbuf_vertex:yg,map_fragment:xg,map_pars_fragment:Mg,map_particle_fragment:Sg,map_particle_pars_fragment:wg,metalnessmap_fragment:Eg,metalnessmap_pars_fragment:bg,morphinstance_vertex:Tg,morphcolor_vertex:Ag,morphnormal_vertex:Rg,morphtarget_pars_vertex:Cg,morphtarget_vertex:Pg,normal_fragment_begin:Lg,normal_fragment_maps:Dg,normal_pars_fragment:Ig,normal_pars_vertex:Ug,normal_vertex:Ng,normalmap_pars_fragment:Fg,clearcoat_normal_fragment_begin:Og,clearcoat_normal_fragment_maps:Bg,clearcoat_pars_fragment:kg,iridescence_pars_fragment:zg,opaque_fragment:Vg,packing:Hg,premultiplied_alpha_fragment:Gg,project_vertex:Wg,dithering_fragment:Xg,dithering_pars_fragment:qg,roughnessmap_fragment:$g,roughnessmap_pars_fragment:Yg,shadowmap_pars_fragment:jg,shadowmap_pars_vertex:Kg,shadowmap_vertex:Zg,shadowmask_pars_fragment:Jg,skinbase_vertex:Qg,skinning_pars_vertex:e0,skinning_vertex:t0,skinnormal_vertex:n0,specularmap_fragment:i0,specularmap_pars_fragment:s0,tonemapping_fragment:r0,tonemapping_pars_fragment:o0,transmission_fragment:a0,transmission_pars_fragment:c0,uv_pars_fragment:l0,uv_pars_vertex:h0,uv_vertex:u0,worldpos_vertex:d0,background_vert:f0,background_frag:p0,backgroundCube_vert:m0,backgroundCube_frag:g0,cube_vert:v0,cube_frag:_0,depth_vert:y0,depth_frag:x0,distanceRGBA_vert:M0,distanceRGBA_frag:S0,equirect_vert:w0,equirect_frag:E0,linedashed_vert:b0,linedashed_frag:T0,meshbasic_vert:A0,meshbasic_frag:R0,meshlambert_vert:C0,meshlambert_frag:P0,meshmatcap_vert:L0,meshmatcap_frag:D0,meshnormal_vert:I0,meshnormal_frag:U0,meshphong_vert:N0,meshphong_frag:F0,meshphysical_vert:O0,meshphysical_frag:B0,meshtoon_vert:k0,meshtoon_frag:z0,points_vert:V0,points_frag:H0,shadow_vert:G0,shadow_frag:W0,sprite_vert:X0,sprite_frag:q0},pe={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},un={basic:{uniforms:Lt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Lt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new je(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Lt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Lt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Lt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new je(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Lt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Lt([pe.points,pe.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Lt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Lt([pe.common,pe.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Lt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Lt([pe.sprite,pe.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Lt([pe.common,pe.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Lt([pe.lights,pe.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};un.physical={uniforms:Lt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const Sr={r:0,b:0,g:0},ii=new Zt,$0=new ut;function Y0(i,e,t,n,s,r,o){const a=new je(0);let c=r===!0?0:1,l,h,u=null,f=0,m=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?t:e).get(y)),y}function _(v){let y=!1;const x=g(v);x===null?d(a,c):x&&x.isColor&&(d(x,1),y=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(v,y){const x=g(y);x&&(x.isCubeTexture||x.mapping===jr)?(h===void 0&&(h=new Se(new wt(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:os(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Rt,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,T,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ii.copy(y.backgroundRotation),ii.x*=-1,ii.y*=-1,ii.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ii.y*=-1,ii.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4($0.makeRotationFromEuler(ii)),h.material.toneMapped=Ze.getTransfer(x.colorSpace)!==it,(u!==x||f!==x.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,m=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Se(new $s(2,2),new Zn({name:"BackgroundMaterial",uniforms:os(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(x.colorSpace)!==it,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,m=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function d(v,y){v.getRGB(Sr,Iu(i)),n.buffers.color.setClear(Sr.r,Sr.g,Sr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),c=y,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,d(a,c)},render:_,addToRenderList:p}}function j0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(M,I,W,S,D){let N=!1;const P=u(S,W,I);r!==P&&(r=P,l(r.object)),N=m(M,S,W,D),N&&g(M,S,W,D),D!==null&&e.update(D,i.ELEMENT_ARRAY_BUFFER),(N||o)&&(o=!1,x(M,I,W,S),D!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function u(M,I,W){const S=W.wireframe===!0;let D=n[M.id];D===void 0&&(D={},n[M.id]=D);let N=D[I.id];N===void 0&&(N={},D[I.id]=N);let P=N[S];return P===void 0&&(P=f(c()),N[S]=P),P}function f(M){const I=[],W=[],S=[];for(let D=0;D<t;D++)I[D]=0,W[D]=0,S[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:W,attributeDivisors:S,object:M,attributes:{},index:null}}function m(M,I,W,S){const D=r.attributes,N=I.attributes;let P=0;const z=W.getAttributes();for(const B in z)if(z[B].location>=0){const k=D[B];let Z=N[B];if(Z===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),k===void 0||k.attribute!==Z||Z&&k.data!==Z.data)return!0;P++}return r.attributesNum!==P||r.index!==S}function g(M,I,W,S){const D={},N=I.attributes;let P=0;const z=W.getAttributes();for(const B in z)if(z[B].location>=0){let k=N[B];k===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(k=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(k=M.instanceColor));const Z={};Z.attribute=k,k&&k.data&&(Z.data=k.data),D[B]=Z,P++}r.attributes=D,r.attributesNum=P,r.index=S}function _(){const M=r.newAttributes;for(let I=0,W=M.length;I<W;I++)M[I]=0}function p(M){d(M,0)}function d(M,I){const W=r.newAttributes,S=r.enabledAttributes,D=r.attributeDivisors;W[M]=1,S[M]===0&&(i.enableVertexAttribArray(M),S[M]=1),D[M]!==I&&(i.vertexAttribDivisor(M,I),D[M]=I)}function v(){const M=r.newAttributes,I=r.enabledAttributes;for(let W=0,S=I.length;W<S;W++)I[W]!==M[W]&&(i.disableVertexAttribArray(W),I[W]=0)}function y(M,I,W,S,D,N,P){P===!0?i.vertexAttribIPointer(M,I,W,D,N):i.vertexAttribPointer(M,I,W,S,D,N)}function x(M,I,W,S){_();const D=S.attributes,N=W.getAttributes(),P=I.defaultAttributeValues;for(const z in N){const B=N[z];if(B.location>=0){let O=D[z];if(O===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(O=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(O=M.instanceColor)),O!==void 0){const k=O.normalized,Z=O.itemSize,le=e.get(O);if(le===void 0)continue;const Me=le.buffer,X=le.type,te=le.bytesPerElement,he=X===i.INT||X===i.UNSIGNED_INT||O.gpuType===oc;if(O.isInterleavedBufferAttribute){const ae=O.data,Ce=ae.stride,De=O.offset;if(ae.isInstancedInterleavedBuffer){for(let Ue=0;Ue<B.locationSize;Ue++)d(B.location+Ue,ae.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ue=0;Ue<B.locationSize;Ue++)p(B.location+Ue);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let Ue=0;Ue<B.locationSize;Ue++)y(B.location+Ue,Z/B.locationSize,X,k,Ce*te,(De+Z/B.locationSize*Ue)*te,he)}else{if(O.isInstancedBufferAttribute){for(let ae=0;ae<B.locationSize;ae++)d(B.location+ae,O.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=O.meshPerAttribute*O.count)}else for(let ae=0;ae<B.locationSize;ae++)p(B.location+ae);i.bindBuffer(i.ARRAY_BUFFER,Me);for(let ae=0;ae<B.locationSize;ae++)y(B.location+ae,Z/B.locationSize,X,k,Z*te,Z/B.locationSize*ae*te,he)}}else if(P!==void 0){const k=P[z];if(k!==void 0)switch(k.length){case 2:i.vertexAttrib2fv(B.location,k);break;case 3:i.vertexAttrib3fv(B.location,k);break;case 4:i.vertexAttrib4fv(B.location,k);break;default:i.vertexAttrib1fv(B.location,k)}}}}v()}function R(){L();for(const M in n){const I=n[M];for(const W in I){const S=I[W];for(const D in S)h(S[D].object),delete S[D];delete I[W]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const W in I){const S=I[W];for(const D in S)h(S[D].object),delete S[D];delete I[W]}delete n[M.id]}function A(M){for(const I in n){const W=n[I];if(W[M.id]===void 0)continue;const S=W[M.id];for(const D in S)h(S[D].object),delete S[D];delete W[M.id]}}function L(){w(),o=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:w,dispose:R,releaseStatesOfGeometry:T,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:v}}function K0(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];t.update(m,n,1)}function c(l,h,u,f){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*f[_];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Z0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(A){return!(A!==on&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const L=A===Ws&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Ln&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==An&&!L)}function c(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),d=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:R,maxSamples:T}}function J0(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new oi,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||n!==0||s;return s=f,n=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,m){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,d=i.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const v=r?0:n,y=v*4;let x=d.clippingState||null;c.value=x,x=h(g,f,y,m);for(let R=0;R!==y;++R)x[R]=t[R];d.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,f,m,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=c.value,g!==!0||p===null){const d=m+_*4,v=f.matrixWorldInverse;a.getNormalMatrix(v),(p===null||p.length<d)&&(p=new Float32Array(d));for(let y=0,x=m;y!==_;++y,x+=4)o.copy(u[y]).applyMatrix4(v,a),o.normal.toArray(p,x),p[x+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,p}}function Q0(i){let e=new WeakMap;function t(o,a){return a===va?o.mapping=ns:a===_a&&(o.mapping=is),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===va||a===_a)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new hm(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Ou extends Uu{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const qi=4,Rl=[.125,.215,.35,.446,.526,.582],li=20,Bo=new Ou,Cl=new je;let ko=null,zo=0,Vo=0,Ho=!1;const ai=(1+Math.sqrt(5))/2,Vi=1/ai,Pl=[new U(-ai,Vi,0),new U(ai,Vi,0),new U(-Vi,0,ai),new U(Vi,0,ai),new U(0,ai,-Vi),new U(0,ai,Vi),new U(-1,1,-1),new U(1,1,-1),new U(-1,1,1),new U(1,1,1)];class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ko=this._renderer.getRenderTarget(),zo=this._renderer.getActiveCubeFace(),Vo=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ko,zo,Vo),this._renderer.xr.enabled=Ho,e.scissorTest=!1,wr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ko=this._renderer.getRenderTarget(),zo=this._renderer.getActiveCubeFace(),Vo=this._renderer.getActiveMipmapLevel(),Ho=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Ws,format:on,colorSpace:as,depthBuffer:!1},s=Dl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ev(r)),this._blurMaterial=tv(r,e,t)}return s}_compileMaterial(e){const t=new Se(this._lodPlanes[0],e);this._renderer.compile(t,Bo)}_sceneToCubeUV(e,t,n,s){const a=new Ht(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Cl),h.toneMapping=Yn,h.autoClear=!1;const m=new Ke({name:"PMREM.Background",side:Rt,depthWrite:!1,depthTest:!1}),g=new Se(new wt,m);let _=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,_=!0):(m.color.copy(Cl),_=!0);for(let d=0;d<6;d++){const v=d%3;v===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):v===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const y=this._cubeSize;wr(s,v*y,d>2?y:0,y,y),h.setRenderTarget(s),_&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ns||e.mapping===is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Il());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Se(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;wr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Bo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Pl[(s-r-1)%Pl.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Se(this._lodPlanes[s],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*li-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):li;p>li&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${li}`);const d=[];let v=0;for(let A=0;A<li;++A){const L=A/_,w=Math.exp(-L*L/2);d.push(w),A===0?v+=w:A<p&&(v+=2*w)}for(let A=0;A<d.length;A++)d[A]=d[A]/v;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;const x=this._sizeLods[s],R=3*x*(s>y-qi?s-y+qi:0),T=4*(this._cubeSize-x);wr(t,R,T,3*x,2*x),c.setRenderTarget(t),c.render(u,Bo)}}function ev(i){const e=[],t=[],n=[];let s=i;const r=i-qi+1+Rl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-qi?c=Rl[o-i+qi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,_=3,p=2,d=1,v=new Float32Array(_*g*m),y=new Float32Array(p*g*m),x=new Float32Array(d*g*m);for(let T=0;T<m;T++){const A=T%3*2/3-1,L=T>2?0:-1,w=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];v.set(w,_*g*T),y.set(f,p*g*T);const M=[T,T,T,T,T,T];x.set(M,d*g*T)}const R=new xt;R.setAttribute("position",new mt(v,_)),R.setAttribute("uv",new mt(y,p)),R.setAttribute("faceIndex",new mt(x,d)),e.push(R),s>qi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dl(i,e,t){const n=new yi(i,e,t);return n.texture.mapping=jr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function wr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function tv(i,e,t){const n=new Float32Array(li),s=new U(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:li,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:fc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Il(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ul(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function fc(){return`

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
	`}function nv(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===va||c===_a,h=c===ns||c===is;if(l||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Ll(i)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return l&&m&&m.height>0||h&&m&&s(m)?(t===null&&(t=new Ll(i)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function iv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&As("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function sv(i,e,t,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const _=f.morphAttributes[g];for(let p=0,d=_.length;p<d;p++)e.remove(_[p])}f.removeEventListener("dispose",o),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)e.update(f[g],i.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const _=m[g];for(let p=0,d=_.length;p<d;p++)e.update(_[p],i.ARRAY_BUFFER)}}function l(u){const f=[],m=u.index,g=u.attributes.position;let _=0;if(m!==null){const v=m.array;_=m.version;for(let y=0,x=v.length;y<x;y+=3){const R=v[y+0],T=v[y+1],A=v[y+2];f.push(R,T,T,A,A,R)}}else if(g!==void 0){const v=g.array;_=g.version;for(let y=0,x=v.length/3-1;y<x;y+=3){const R=y+0,T=y+1,A=y+2;f.push(R,T,T,A,A,R)}}else return;const p=new(bu(f)?Du:Lu)(f,1);p.version=_;const d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function rv(i,e,t){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,m){i.drawElements(n,m,r,f*o),t.update(m,n,1)}function l(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,f*o,g),t.update(m,n,g))}function h(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,f,0,g);let p=0;for(let d=0;d<g;d++)p+=m[d];t.update(p,n,1)}function u(f,m,g,_){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<f.length;d++)l(f[d]/o,m[d],_[d]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,_,0,g);let d=0;for(let v=0;v<g;v++)d+=m[v]*_[v];t.update(d,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function ov(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function av(i,e,t){const n=new WeakMap,s=new ot;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let M=function(){L.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var m=M;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),_===!0&&(x=2),p===!0&&(x=3);let R=a.attributes.position.count*x,T=1;R>e.maxTextureSize&&(T=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const A=new Float32Array(R*T*4*u),L=new Au(A,R,T,u);L.type=An,L.needsUpdate=!0;const w=x*4;for(let I=0;I<u;I++){const W=d[I],S=v[I],D=y[I],N=R*T*4*I;for(let P=0;P<W.count;P++){const z=P*w;g===!0&&(s.fromBufferAttribute(W,P),A[N+z+0]=s.x,A[N+z+1]=s.y,A[N+z+2]=s.z,A[N+z+3]=0),_===!0&&(s.fromBufferAttribute(S,P),A[N+z+4]=s.x,A[N+z+5]=s.y,A[N+z+6]=s.z,A[N+z+7]=0),p===!0&&(s.fromBufferAttribute(D,P),A[N+z+8]=s.x,A[N+z+9]=s.y,A[N+z+10]=s.z,A[N+z+11]=D.itemSize===4?s.w:1)}}f={count:u,texture:L,size:new ze(R,T)},n.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(i,"morphTargetBaseInfluence",_),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function cv(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Bu extends It{constructor(e,t,n,s,r,o,a,c,l,h=Yi){if(h!==Yi&&h!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Yi&&(n=_i),n===void 0&&h===rs&&(n=ss),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ln,this.minFilter=c!==void 0?c:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ku=new It,Nl=new Bu(1,1),zu=new Au,Vu=new Yp,Hu=new Nu,Fl=[],Ol=[],Bl=new Float32Array(16),kl=new Float32Array(9),zl=new Float32Array(4);function ls(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Fl[s];if(r===void 0&&(r=new Float32Array(s),Fl[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function yt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Zr(i,e){let t=Ol[e];t===void 0&&(t=new Int32Array(e),Ol[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function lv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function hv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),yt(t,e)}}function uv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),yt(t,e)}}function dv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),yt(t,e)}}function fv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;zl.set(n),i.uniformMatrix2fv(this.addr,!1,zl),yt(t,n)}}function pv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;kl.set(n),i.uniformMatrix3fv(this.addr,!1,kl),yt(t,n)}}function mv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),yt(t,e)}else{if(_t(t,n))return;Bl.set(n),i.uniformMatrix4fv(this.addr,!1,Bl),yt(t,n)}}function gv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function vv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),yt(t,e)}}function _v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),yt(t,e)}}function yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),yt(t,e)}}function xv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Mv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),yt(t,e)}}function Sv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),yt(t,e)}}function wv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),yt(t,e)}}function Ev(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Nl.compareFunction=Eu,r=Nl):r=ku,t.setTexture2D(e||r,s)}function bv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Vu,s)}function Tv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Hu,s)}function Av(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||zu,s)}function Rv(i){switch(i){case 5126:return lv;case 35664:return hv;case 35665:return uv;case 35666:return dv;case 35674:return fv;case 35675:return pv;case 35676:return mv;case 5124:case 35670:return gv;case 35667:case 35671:return vv;case 35668:case 35672:return _v;case 35669:case 35673:return yv;case 5125:return xv;case 36294:return Mv;case 36295:return Sv;case 36296:return wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return bv;case 35680:case 36300:case 36308:case 36293:return Tv;case 36289:case 36303:case 36311:case 36292:return Av}}function Cv(i,e){i.uniform1fv(this.addr,e)}function Pv(i,e){const t=ls(e,this.size,2);i.uniform2fv(this.addr,t)}function Lv(i,e){const t=ls(e,this.size,3);i.uniform3fv(this.addr,t)}function Dv(i,e){const t=ls(e,this.size,4);i.uniform4fv(this.addr,t)}function Iv(i,e){const t=ls(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Uv(i,e){const t=ls(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Nv(i,e){const t=ls(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Fv(i,e){i.uniform1iv(this.addr,e)}function Ov(i,e){i.uniform2iv(this.addr,e)}function Bv(i,e){i.uniform3iv(this.addr,e)}function kv(i,e){i.uniform4iv(this.addr,e)}function zv(i,e){i.uniform1uiv(this.addr,e)}function Vv(i,e){i.uniform2uiv(this.addr,e)}function Hv(i,e){i.uniform3uiv(this.addr,e)}function Gv(i,e){i.uniform4uiv(this.addr,e)}function Wv(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||ku,r[o])}function Xv(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Vu,r[o])}function qv(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Hu,r[o])}function $v(i,e,t){const n=this.cache,s=e.length,r=Zr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),yt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||zu,r[o])}function Yv(i){switch(i){case 5126:return Cv;case 35664:return Pv;case 35665:return Lv;case 35666:return Dv;case 35674:return Iv;case 35675:return Uv;case 35676:return Nv;case 5124:case 35670:return Fv;case 35667:case 35671:return Ov;case 35668:case 35672:return Bv;case 35669:case 35673:return kv;case 5125:return zv;case 36294:return Vv;case 36295:return Hv;case 36296:return Gv;case 35678:case 36198:case 36298:case 36306:case 35682:return Wv;case 35679:case 36299:case 36307:return Xv;case 35680:case 36300:case 36308:case 36293:return qv;case 36289:case 36303:case 36311:case 36292:return $v}}class jv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Rv(t.type)}}class Kv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Yv(t.type)}}class Zv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Go=/(\w+)(\])?(\[|\.)?/g;function Vl(i,e){i.seq.push(e),i.map[e.id]=e}function Jv(i,e,t){const n=i.name,s=n.length;for(Go.lastIndex=0;;){const r=Go.exec(n),o=Go.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Vl(t,l===void 0?new jv(a,i,e):new Kv(a,i,e));break}else{let u=t.map[a];u===void 0&&(u=new Zv(a),Vl(t,u)),t=u}}}class Fr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Jv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Hl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Qv=37297;let e_=0;function t_(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Gl=new We;function n_(i){Ze._getMatrix(Gl,Ze.workingColorSpace,i);const e=`mat3( ${Gl.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Kr:return[e,"LinearTransferOETF"];case it:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+t_(i.getShaderSource(e),o)}else return s}function i_(i,e){const t=n_(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function s_(i,e){let t;switch(e){case Sp:t="Linear";break;case wp:t="Reinhard";break;case Ep:t="Cineon";break;case uu:t="ACESFilmic";break;case Tp:t="AgX";break;case Ap:t="Neutral";break;case bp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Er=new U;function r_(){Ze.getLuminanceCoefficients(Er);const i=Er.x.toFixed(4),e=Er.y.toFixed(4),t=Er.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
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
#define LOW_PRECISION`),e}function p_(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===lu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===tp?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===En&&(e="SHADOWMAP_TYPE_VSM"),e}function m_(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ns:case is:e="ENVMAP_TYPE_CUBE";break;case jr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function g_(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case is:e="ENVMAP_MODE_REFRACTION";break}return e}function v_(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case hu:e="ENVMAP_BLENDING_MULTIPLY";break;case xp:e="ENVMAP_BLENDING_MIX";break;case Mp:e="ENVMAP_BLENDING_ADD";break}return e}function __(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function y_(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=p_(t),l=m_(t),h=g_(t),u=v_(t),f=__(t),m=o_(t),g=a_(r),_=s.createProgram();let p,d,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Rs).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Rs).join(`
`),d.length>0&&(d+=`
`)):(p=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Rs).join(`
`),d=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Yn?"#define TONE_MAPPING":"",t.toneMapping!==Yn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==Yn?s_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,i_("linearToOutputTexel",t.outputColorSpace),r_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Rs).join(`
`)),o=Ya(o),o=Xl(o,t),o=ql(o,t),a=Ya(a),a=Xl(a,t),a=ql(a,t),o=$l(o),a=$l(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",t.glslVersion===al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=v+p+o,x=v+d+a,R=Hl(s,s.VERTEX_SHADER,y),T=Hl(s,s.FRAGMENT_SHADER,x);s.attachShader(_,R),s.attachShader(_,T),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(I){if(i.debug.checkShaderErrors){const W=s.getProgramInfoLog(_).trim(),S=s.getShaderInfoLog(R).trim(),D=s.getShaderInfoLog(T).trim();let N=!0,P=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(N=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,T);else{const z=Wl(s,R,"vertex"),B=Wl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+W+`
`+z+`
`+B)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(S===""||D==="")&&(P=!1);P&&(I.diagnostics={runnable:N,programLog:W,vertexShader:{log:S,prefix:p},fragmentShader:{log:D,prefix:d}})}s.deleteShader(R),s.deleteShader(T),L=new Fr(s,_),w=c_(s,_)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let w;this.getAttributes=function(){return w===void 0&&A(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,Qv)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=e_++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=T,this}let x_=0;class M_{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new S_(e),t.set(e,n)),n}}class S_{constructor(e){this.id=x_++,this.code=e,this.usedTimes=0}}function w_(i,e,t,n,s,r,o){const a=new Cu,c=new M_,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return l.add(w),w===0?"uv":`uv${w}`}function p(w,M,I,W,S){const D=W.fog,N=S.geometry,P=w.isMeshStandardMaterial?W.environment:null,z=(w.isMeshStandardMaterial?t:e).get(w.envMap||P),B=z&&z.mapping===jr?z.image.height:null,O=g[w.type];w.precision!==null&&(m=s.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const k=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Z=k!==void 0?k.length:0;let le=0;N.morphAttributes.position!==void 0&&(le=1),N.morphAttributes.normal!==void 0&&(le=2),N.morphAttributes.color!==void 0&&(le=3);let Me,X,te,he;if(O){const nt=un[O];Me=nt.vertexShader,X=nt.fragmentShader}else Me=w.vertexShader,X=w.fragmentShader,c.update(w),te=c.getVertexShaderID(w),he=c.getFragmentShaderID(w);const ae=i.getRenderTarget(),Ce=i.state.buffers.depth.getReversed(),De=S.isInstancedMesh===!0,Ue=S.isBatchedMesh===!0,Y=!!w.map,Q=!!w.matcap,ue=!!z,F=!!w.aoMap,Fe=!!w.lightMap,Ne=!!w.bumpMap,Be=!!w.normalMap,we=!!w.displacementMap,Ee=!!w.emissiveMap,me=!!w.metalnessMap,C=!!w.roughnessMap,E=w.anisotropy>0,$=w.clearcoat>0,ee=w.dispersion>0,se=w.iridescence>0,q=w.sheen>0,oe=w.transmission>0,ie=E&&!!w.anisotropyMap,de=$&&!!w.clearcoatMap,Le=$&&!!w.clearcoatNormalMap,re=$&&!!w.clearcoatRoughnessMap,fe=se&&!!w.iridescenceMap,Ie=se&&!!w.iridescenceThicknessMap,Oe=q&&!!w.sheenColorMap,xe=q&&!!w.sheenRoughnessMap,$e=!!w.specularMap,Ve=!!w.specularColorMap,tt=!!w.specularIntensityMap,V=oe&&!!w.transmissionMap,ge=oe&&!!w.thicknessMap,J=!!w.gradientMap,ne=!!w.alphaMap,ye=w.alphaTest>0,ve=!!w.alphaHash,He=!!w.extensions;let ft=Yn;w.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(ft=i.toneMapping);const Et={shaderID:O,shaderType:w.type,shaderName:w.name,vertexShader:Me,fragmentShader:X,defines:w.defines,customVertexShaderID:te,customFragmentShaderID:he,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:Ue,batchingColor:Ue&&S._colorsTexture!==null,instancing:De,instancingColor:De&&S.instanceColor!==null,instancingMorph:De&&S.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?i.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:as,alphaToCoverage:!!w.alphaToCoverage,map:Y,matcap:Q,envMap:ue,envMapMode:ue&&z.mapping,envMapCubeUVHeight:B,aoMap:F,lightMap:Fe,bumpMap:Ne,normalMap:Be,displacementMap:f&&we,emissiveMap:Ee,normalMapObjectSpace:Be&&w.normalMapType===Lp,normalMapTangentSpace:Be&&w.normalMapType===wu,metalnessMap:me,roughnessMap:C,anisotropy:E,anisotropyMap:ie,clearcoat:$,clearcoatMap:de,clearcoatNormalMap:Le,clearcoatRoughnessMap:re,dispersion:ee,iridescence:se,iridescenceMap:fe,iridescenceThicknessMap:Ie,sheen:q,sheenColorMap:Oe,sheenRoughnessMap:xe,specularMap:$e,specularColorMap:Ve,specularIntensityMap:tt,transmission:oe,transmissionMap:V,thicknessMap:ge,gradientMap:J,opaque:w.transparent===!1&&w.blending===$i&&w.alphaToCoverage===!1,alphaMap:ne,alphaTest:ye,alphaHash:ve,combine:w.combine,mapUv:Y&&_(w.map.channel),aoMapUv:F&&_(w.aoMap.channel),lightMapUv:Fe&&_(w.lightMap.channel),bumpMapUv:Ne&&_(w.bumpMap.channel),normalMapUv:Be&&_(w.normalMap.channel),displacementMapUv:we&&_(w.displacementMap.channel),emissiveMapUv:Ee&&_(w.emissiveMap.channel),metalnessMapUv:me&&_(w.metalnessMap.channel),roughnessMapUv:C&&_(w.roughnessMap.channel),anisotropyMapUv:ie&&_(w.anisotropyMap.channel),clearcoatMapUv:de&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:Le&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:xe&&_(w.sheenRoughnessMap.channel),specularMapUv:$e&&_(w.specularMap.channel),specularColorMapUv:Ve&&_(w.specularColorMap.channel),specularIntensityMapUv:tt&&_(w.specularIntensityMap.channel),transmissionMapUv:V&&_(w.transmissionMap.channel),thicknessMapUv:ge&&_(w.thicknessMap.channel),alphaMapUv:ne&&_(w.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Be||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!N.attributes.uv&&(Y||ne),fog:!!D,useFog:w.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ce,skinning:S.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:le,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&I.length>0,shadowMapType:i.shadowMap.type,toneMapping:ft,decodeVideoTexture:Y&&w.map.isVideoTexture===!0&&Ze.getTransfer(w.map.colorSpace)===it,decodeVideoTextureEmissive:Ee&&w.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(w.emissiveMap.colorSpace)===it,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Ot,flipSided:w.side===Rt,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:He&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(He&&w.extensions.multiDraw===!0||Ue)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Et.vertexUv1s=l.has(1),Et.vertexUv2s=l.has(2),Et.vertexUv3s=l.has(3),l.clear(),Et}function d(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)M.push(I),M.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(v(M,w),y(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function v(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function y(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function x(w){const M=g[w.type];let I;if(M){const W=un[M];I=om.clone(W.uniforms)}else I=w.uniforms;return I}function R(w,M){let I;for(let W=0,S=h.length;W<S;W++){const D=h[W];if(D.cacheKey===M){I=D,++I.usedTimes;break}}return I===void 0&&(I=new y_(i,M,w,r),h.push(I)),I}function T(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function A(w){c.remove(w)}function L(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:x,acquireProgram:R,releaseProgram:T,releaseShaderCache:A,programs:h,dispose:L}}function E_(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function b_(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function jl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Kl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(u,f,m,g,_,p){let d=i[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},i[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=_,d.group=p),e++,d}function a(u,f,m,g,_,p){const d=o(u,f,m,g,_,p);m.transmission>0?n.push(d):m.transparent===!0?s.push(d):t.push(d)}function c(u,f,m,g,_,p){const d=o(u,f,m,g,_,p);m.transmission>0?n.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||b_),n.length>1&&n.sort(f||jl),s.length>1&&s.sort(f||jl)}function h(){for(let u=e,f=i.length;u<f;u++){const m=i[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function T_(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new Kl,i.set(n,[o])):s>=r.length?(o=new Kl,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function A_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new U,color:new je};break;case"SpotLight":t={position:new U,direction:new U,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new U,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new U,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new U,halfWidth:new U,halfHeight:new U};break}return i[e.id]=t,t}}}function R_(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let C_=0;function P_(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function L_(i){const e=new A_,t=R_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new U);const s=new U,r=new ut,o=new ut;function a(l){let h=0,u=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let m=0,g=0,_=0,p=0,d=0,v=0,y=0,x=0,R=0,T=0,A=0;l.sort(P_);for(let w=0,M=l.length;w<M;w++){const I=l[w],W=I.color,S=I.intensity,D=I.distance,N=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=W.r*S,u+=W.g*S,f+=W.b*S;else if(I.isLightProbe){for(let P=0;P<9;P++)n.probe[P].addScaledVector(I.sh.coefficients[P],S);A++}else if(I.isDirectionalLight){const P=e.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const z=I.shadow,B=t.get(I);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,n.directionalShadow[m]=B,n.directionalShadowMap[m]=N,n.directionalShadowMatrix[m]=I.shadow.matrix,v++}n.directional[m]=P,m++}else if(I.isSpotLight){const P=e.get(I);P.position.setFromMatrixPosition(I.matrixWorld),P.color.copy(W).multiplyScalar(S),P.distance=D,P.coneCos=Math.cos(I.angle),P.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),P.decay=I.decay,n.spot[_]=P;const z=I.shadow;if(I.map&&(n.spotLightMap[R]=I.map,R++,z.updateMatrices(I),I.castShadow&&T++),n.spotLightMatrix[_]=z.matrix,I.castShadow){const B=t.get(I);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,n.spotShadow[_]=B,n.spotShadowMap[_]=N,x++}_++}else if(I.isRectAreaLight){const P=e.get(I);P.color.copy(W).multiplyScalar(S),P.halfWidth.set(I.width*.5,0,0),P.halfHeight.set(0,I.height*.5,0),n.rectArea[p]=P,p++}else if(I.isPointLight){const P=e.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),P.distance=I.distance,P.decay=I.decay,I.castShadow){const z=I.shadow,B=t.get(I);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,B.shadowCameraNear=z.camera.near,B.shadowCameraFar=z.camera.far,n.pointShadow[g]=B,n.pointShadowMap[g]=N,n.pointShadowMatrix[g]=I.shadow.matrix,y++}n.point[g]=P,g++}else if(I.isHemisphereLight){const P=e.get(I);P.skyColor.copy(I.color).multiplyScalar(S),P.groundColor.copy(I.groundColor).multiplyScalar(S),n.hemi[d]=P,d++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==m||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==p||L.hemiLength!==d||L.numDirectionalShadows!==v||L.numPointShadows!==y||L.numSpotShadows!==x||L.numSpotMaps!==R||L.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=d,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+R-T,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=A,L.directionalLength=m,L.pointLength=g,L.spotLength=_,L.rectAreaLength=p,L.hemiLength=d,L.numDirectionalShadows=v,L.numPointShadows=y,L.numSpotShadows=x,L.numSpotMaps=R,L.numLightProbes=A,n.version=C_++)}function c(l,h){let u=0,f=0,m=0,g=0,_=0;const p=h.matrixWorldInverse;for(let d=0,v=l.length;d<v;d++){const y=l[d];if(y.isDirectionalLight){const x=n.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),u++}else if(y.isSpotLight){const x=n.spot[m];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),m++}else if(y.isRectAreaLight){const x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const x=n.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){const x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(p),_++}}}return{setup:a,setupView:c,state:n}}function Zl(i){const e=new L_(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function D_(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Zl(i),e.set(s,[a])):r>=o.length?(a=new Zl(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class I_ extends bi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Cp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class U_ extends bi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const N_=`void main() {
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
}`;function O_(i,e,t){let n=new dc;const s=new ze,r=new ze,o=new ot,a=new I_({depthPacking:Pp}),c=new U_,l={},h=t.maxTextureSize,u={[jt]:Rt,[Rt]:jt,[Ot]:Ot},f=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:N_,fragmentShader:F_}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new xt;g.setAttribute("position",new mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Se(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lu;let d=this.type;this.render=function(T,A,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||T.length===0)return;const w=i.getRenderTarget(),M=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),W=i.state;W.setBlending($n),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const S=d!==En&&this.type===En,D=d===En&&this.type!==En;for(let N=0,P=T.length;N<P;N++){const z=T[N],B=z.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const O=B.getFrameExtents();if(s.multiply(O),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/O.x),s.x=r.x*O.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/O.y),s.y=r.y*O.y,B.mapSize.y=r.y)),B.map===null||S===!0||D===!0){const Z=this.type!==En?{minFilter:ln,magFilter:ln}:{};B.map!==null&&B.map.dispose(),B.map=new yi(s.x,s.y,Z),B.map.texture.name=z.name+".shadowMap",B.camera.updateProjectionMatrix()}i.setRenderTarget(B.map),i.clear();const k=B.getViewportCount();for(let Z=0;Z<k;Z++){const le=B.getViewport(Z);o.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),W.viewport(o),B.updateMatrices(z,Z),n=B.getFrustum(),x(A,L,B.camera,z,this.type)}B.isPointLightShadow!==!0&&this.type===En&&v(B,L),B.needsUpdate=!1}d=this.type,p.needsUpdate=!1,i.setRenderTarget(w,M,I)};function v(T,A){const L=e.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new yi(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(A,null,L,f,_,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(A,null,L,m,_,null)}function y(T,A,L,w){let M=null;const I=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(I!==void 0)M=I;else if(M=L.isPointLight===!0?c:a,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const W=M.uuid,S=A.uuid;let D=l[W];D===void 0&&(D={},l[W]=D);let N=D[S];N===void 0&&(N=M.clone(),D[S]=N,A.addEventListener("dispose",R)),M=N}if(M.visible=A.visible,M.wireframe=A.wireframe,w===En?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,L.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const W=i.properties.get(M);W.light=L}return M}function x(T,A,L,w,M){if(T.visible===!1)return;if(T.layers.test(A.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===En)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const S=e.update(T),D=T.material;if(Array.isArray(D)){const N=S.groups;for(let P=0,z=N.length;P<z;P++){const B=N[P],O=D[B.materialIndex];if(O&&O.visible){const k=y(T,O,w,M);T.onBeforeShadow(i,T,A,L,S,k,B),i.renderBufferDirect(L,null,S,k,T,B),T.onAfterShadow(i,T,A,L,S,k,B)}}}else if(D.visible){const N=y(T,D,w,M);T.onBeforeShadow(i,T,A,L,S,N,null),i.renderBufferDirect(L,null,S,N,T,null),T.onAfterShadow(i,T,A,L,S,N,null)}}const W=T.children;for(let S=0,D=W.length;S<D;S++)x(W[S],A,L,w,M)}function R(T){T.target.removeEventListener("dispose",R);for(const L in l){const w=l[L],M=T.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const B_={[ha]:ua,[da]:ma,[fa]:ga,[ts]:pa,[ua]:ha,[ma]:da,[ga]:fa,[pa]:ts};function k_(i,e){function t(){let V=!1;const ge=new ot;let J=null;const ne=new ot(0,0,0,0);return{setMask:function(ye){J!==ye&&!V&&(i.colorMask(ye,ye,ye,ye),J=ye)},setLocked:function(ye){V=ye},setClear:function(ye,ve,He,ft,Et){Et===!0&&(ye*=ft,ve*=ft,He*=ft),ge.set(ye,ve,He,ft),ne.equals(ge)===!1&&(i.clearColor(ye,ve,He,ft),ne.copy(ge))},reset:function(){V=!1,J=null,ne.set(-1,0,0,0)}}}function n(){let V=!1,ge=!1,J=null,ne=null,ye=null;return{setReversed:function(ve){if(ge!==ve){const He=e.get("EXT_clip_control");ge?He.clipControlEXT(He.LOWER_LEFT_EXT,He.ZERO_TO_ONE_EXT):He.clipControlEXT(He.LOWER_LEFT_EXT,He.NEGATIVE_ONE_TO_ONE_EXT);const ft=ye;ye=null,this.setClear(ft)}ge=ve},getReversed:function(){return ge},setTest:function(ve){ve?ae(i.DEPTH_TEST):Ce(i.DEPTH_TEST)},setMask:function(ve){J!==ve&&!V&&(i.depthMask(ve),J=ve)},setFunc:function(ve){if(ge&&(ve=B_[ve]),ne!==ve){switch(ve){case ha:i.depthFunc(i.NEVER);break;case ua:i.depthFunc(i.ALWAYS);break;case da:i.depthFunc(i.LESS);break;case ts:i.depthFunc(i.LEQUAL);break;case fa:i.depthFunc(i.EQUAL);break;case pa:i.depthFunc(i.GEQUAL);break;case ma:i.depthFunc(i.GREATER);break;case ga:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ne=ve}},setLocked:function(ve){V=ve},setClear:function(ve){ye!==ve&&(ge&&(ve=1-ve),i.clearDepth(ve),ye=ve)},reset:function(){V=!1,J=null,ne=null,ye=null,ge=!1}}}function s(){let V=!1,ge=null,J=null,ne=null,ye=null,ve=null,He=null,ft=null,Et=null;return{setTest:function(nt){V||(nt?ae(i.STENCIL_TEST):Ce(i.STENCIL_TEST))},setMask:function(nt){ge!==nt&&!V&&(i.stencilMask(nt),ge=nt)},setFunc:function(nt,Jt,gn){(J!==nt||ne!==Jt||ye!==gn)&&(i.stencilFunc(nt,Jt,gn),J=nt,ne=Jt,ye=gn)},setOp:function(nt,Jt,gn){(ve!==nt||He!==Jt||ft!==gn)&&(i.stencilOp(nt,Jt,gn),ve=nt,He=Jt,ft=gn)},setLocked:function(nt){V=nt},setClear:function(nt){Et!==nt&&(i.clearStencil(nt),Et=nt)},reset:function(){V=!1,ge=null,J=null,ne=null,ye=null,ve=null,He=null,ft=null,Et=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,m=[],g=null,_=!1,p=null,d=null,v=null,y=null,x=null,R=null,T=null,A=new je(0,0,0),L=0,w=!1,M=null,I=null,W=null,S=null,D=null;const N=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,z=0;const B=i.getParameter(i.VERSION);B.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(B)[1]),P=z>=1):B.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),P=z>=2);let O=null,k={};const Z=i.getParameter(i.SCISSOR_BOX),le=i.getParameter(i.VIEWPORT),Me=new ot().fromArray(Z),X=new ot().fromArray(le);function te(V,ge,J,ne){const ye=new Uint8Array(4),ve=i.createTexture();i.bindTexture(V,ve),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let He=0;He<J;He++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,ne,0,i.RGBA,i.UNSIGNED_BYTE,ye):i.texImage2D(ge+He,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ye);return ve}const he={};he[i.TEXTURE_2D]=te(i.TEXTURE_2D,i.TEXTURE_2D,1),he[i.TEXTURE_CUBE_MAP]=te(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),he[i.TEXTURE_2D_ARRAY]=te(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),he[i.TEXTURE_3D]=te(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(i.DEPTH_TEST),o.setFunc(ts),Ne(!1),Be(il),ae(i.CULL_FACE),F($n);function ae(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function Ce(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function De(V,ge){return u[V]!==ge?(i.bindFramebuffer(V,ge),u[V]=ge,V===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ge),V===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ue(V,ge){let J=m,ne=!1;if(V){J=f.get(ge),J===void 0&&(J=[],f.set(ge,J));const ye=V.textures;if(J.length!==ye.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ve=0,He=ye.length;ve<He;ve++)J[ve]=i.COLOR_ATTACHMENT0+ve;J.length=ye.length,ne=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ne=!0);ne&&i.drawBuffers(J)}function Y(V){return g!==V?(i.useProgram(V),g=V,!0):!1}const Q={[ci]:i.FUNC_ADD,[ip]:i.FUNC_SUBTRACT,[sp]:i.FUNC_REVERSE_SUBTRACT};Q[rp]=i.MIN,Q[op]=i.MAX;const ue={[ap]:i.ZERO,[cp]:i.ONE,[lp]:i.SRC_COLOR,[ca]:i.SRC_ALPHA,[mp]:i.SRC_ALPHA_SATURATE,[fp]:i.DST_COLOR,[up]:i.DST_ALPHA,[hp]:i.ONE_MINUS_SRC_COLOR,[la]:i.ONE_MINUS_SRC_ALPHA,[pp]:i.ONE_MINUS_DST_COLOR,[dp]:i.ONE_MINUS_DST_ALPHA,[gp]:i.CONSTANT_COLOR,[vp]:i.ONE_MINUS_CONSTANT_COLOR,[_p]:i.CONSTANT_ALPHA,[yp]:i.ONE_MINUS_CONSTANT_ALPHA};function F(V,ge,J,ne,ye,ve,He,ft,Et,nt){if(V===$n){_===!0&&(Ce(i.BLEND),_=!1);return}if(_===!1&&(ae(i.BLEND),_=!0),V!==np){if(V!==p||nt!==w){if((d!==ci||x!==ci)&&(i.blendEquation(i.FUNC_ADD),d=ci,x=ci),nt)switch(V){case $i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rt:i.blendFunc(i.ONE,i.ONE);break;case sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case $i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case rt:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}v=null,y=null,R=null,T=null,A.set(0,0,0),L=0,p=V,w=nt}return}ye=ye||ge,ve=ve||J,He=He||ne,(ge!==d||ye!==x)&&(i.blendEquationSeparate(Q[ge],Q[ye]),d=ge,x=ye),(J!==v||ne!==y||ve!==R||He!==T)&&(i.blendFuncSeparate(ue[J],ue[ne],ue[ve],ue[He]),v=J,y=ne,R=ve,T=He),(ft.equals(A)===!1||Et!==L)&&(i.blendColor(ft.r,ft.g,ft.b,Et),A.copy(ft),L=Et),p=V,w=!1}function Fe(V,ge){V.side===Ot?Ce(i.CULL_FACE):ae(i.CULL_FACE);let J=V.side===Rt;ge&&(J=!J),Ne(J),V.blending===$i&&V.transparent===!1?F($n):F(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);const ne=V.stencilWrite;a.setTest(ne),ne&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ee(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):Ce(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(V){M!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),M=V)}function Be(V){V!==Qf?(ae(i.CULL_FACE),V!==I&&(V===il?i.cullFace(i.BACK):V===ep?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ce(i.CULL_FACE),I=V}function we(V){V!==W&&(P&&i.lineWidth(V),W=V)}function Ee(V,ge,J){V?(ae(i.POLYGON_OFFSET_FILL),(S!==ge||D!==J)&&(i.polygonOffset(ge,J),S=ge,D=J)):Ce(i.POLYGON_OFFSET_FILL)}function me(V){V?ae(i.SCISSOR_TEST):Ce(i.SCISSOR_TEST)}function C(V){V===void 0&&(V=i.TEXTURE0+N-1),O!==V&&(i.activeTexture(V),O=V)}function E(V,ge,J){J===void 0&&(O===null?J=i.TEXTURE0+N-1:J=O);let ne=k[J];ne===void 0&&(ne={type:void 0,texture:void 0},k[J]=ne),(ne.type!==V||ne.texture!==ge)&&(O!==J&&(i.activeTexture(J),O=J),i.bindTexture(V,ge||he[V]),ne.type=V,ne.texture=ge)}function $(){const V=k[O];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function ee(){try{i.compressedTexImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function oe(){try{i.texSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Le(){try{i.texStorage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function re(){try{i.texStorage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function fe(){try{i.texImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ie(){try{i.texImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Oe(V){Me.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),Me.copy(V))}function xe(V){X.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),X.copy(V))}function $e(V,ge){let J=l.get(ge);J===void 0&&(J=new WeakMap,l.set(ge,J));let ne=J.get(V);ne===void 0&&(ne=i.getUniformBlockIndex(ge,V.name),J.set(V,ne))}function Ve(V,ge){const ne=l.get(ge).get(V);c.get(ge)!==ne&&(i.uniformBlockBinding(ge,ne,V.__bindingPointIndex),c.set(ge,ne))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},O=null,k={},u={},f=new WeakMap,m=[],g=null,_=!1,p=null,d=null,v=null,y=null,x=null,R=null,T=null,A=new je(0,0,0),L=0,w=!1,M=null,I=null,W=null,S=null,D=null,Me.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Ce,bindFramebuffer:De,drawBuffers:Ue,useProgram:Y,setBlending:F,setMaterial:Fe,setFlipSided:Ne,setCullFace:Be,setLineWidth:we,setPolygonOffset:Ee,setScissorTest:me,activeTexture:C,bindTexture:E,unbindTexture:$,compressedTexImage2D:ee,compressedTexImage3D:se,texImage2D:fe,texImage3D:Ie,updateUBOMapping:$e,uniformBlockBinding:Ve,texStorage2D:Le,texStorage3D:re,texSubImage2D:q,texSubImage3D:oe,compressedTexSubImage2D:ie,compressedTexSubImage3D:de,scissor:Oe,viewport:xe,reset:tt}}function Jl(i,e,t,n){const s=z_(n);switch(t){case gu:return i*e;case _u:return i*e;case yu:return i*e*2;case xu:return i*e/s.components*s.byteLength;case lc:return i*e/s.components*s.byteLength;case Mu:return i*e*2/s.components*s.byteLength;case hc:return i*e*2/s.components*s.byteLength;case vu:return i*e*3/s.components*s.byteLength;case on:return i*e*4/s.components*s.byteLength;case uc:return i*e*4/s.components*s.byteLength;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ir:case Ur:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ma:case wa:return Math.max(i,16)*Math.max(e,8)/4;case xa:case Sa:return Math.max(i,8)*Math.max(e,8)/2;case Ea:case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ca:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case La:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Da:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ia:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ua:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Na:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ka:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case za:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Nr:case Va:case Ha:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Su:case Ga:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Wa:case Xa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function z_(i){switch(i){case Ln:case fu:return{byteLength:1,components:1};case ks:case pu:case Ws:return{byteLength:2,components:1};case ac:case cc:return{byteLength:2,components:4};case _i:case oc:case An:return{byteLength:4,components:1};case mu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function V_(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(C,E){return m?new OffscreenCanvas(C,E):Hr("canvas")}function _(C,E,$){let ee=1;const se=me(C);if((se.width>$||se.height>$)&&(ee=$/Math.max(se.width,se.height)),ee<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const q=Math.floor(ee*se.width),oe=Math.floor(ee*se.height);u===void 0&&(u=g(q,oe));const ie=E?g(q,oe):u;return ie.width=q,ie.height=oe,ie.getContext("2d").drawImage(C,0,0,q,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+q+"x"+oe+")."),ie}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),C;return C}function p(C){return C.generateMipmaps}function d(C){i.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(C,E,$,ee,se=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let q=E;if(E===i.RED&&($===i.FLOAT&&(q=i.R32F),$===i.HALF_FLOAT&&(q=i.R16F),$===i.UNSIGNED_BYTE&&(q=i.R8)),E===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.R8UI),$===i.UNSIGNED_SHORT&&(q=i.R16UI),$===i.UNSIGNED_INT&&(q=i.R32UI),$===i.BYTE&&(q=i.R8I),$===i.SHORT&&(q=i.R16I),$===i.INT&&(q=i.R32I)),E===i.RG&&($===i.FLOAT&&(q=i.RG32F),$===i.HALF_FLOAT&&(q=i.RG16F),$===i.UNSIGNED_BYTE&&(q=i.RG8)),E===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RG8UI),$===i.UNSIGNED_SHORT&&(q=i.RG16UI),$===i.UNSIGNED_INT&&(q=i.RG32UI),$===i.BYTE&&(q=i.RG8I),$===i.SHORT&&(q=i.RG16I),$===i.INT&&(q=i.RG32I)),E===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RGB8UI),$===i.UNSIGNED_SHORT&&(q=i.RGB16UI),$===i.UNSIGNED_INT&&(q=i.RGB32UI),$===i.BYTE&&(q=i.RGB8I),$===i.SHORT&&(q=i.RGB16I),$===i.INT&&(q=i.RGB32I)),E===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),$===i.UNSIGNED_INT&&(q=i.RGBA32UI),$===i.BYTE&&(q=i.RGBA8I),$===i.SHORT&&(q=i.RGBA16I),$===i.INT&&(q=i.RGBA32I)),E===i.RGB&&$===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),E===i.RGBA){const oe=se?Kr:Ze.getTransfer(ee);$===i.FLOAT&&(q=i.RGBA32F),$===i.HALF_FLOAT&&(q=i.RGBA16F),$===i.UNSIGNED_BYTE&&(q=oe===it?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(C,E){let $;return C?E===null||E===_i||E===ss?$=i.DEPTH24_STENCIL8:E===An?$=i.DEPTH32F_STENCIL8:E===ks&&($=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===_i||E===ss?$=i.DEPTH_COMPONENT24:E===An?$=i.DEPTH_COMPONENT32F:E===ks&&($=i.DEPTH_COMPONENT16),$}function R(C,E){return p(C)===!0||C.isFramebufferTexture&&C.minFilter!==ln&&C.minFilter!==fn?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function T(C){const E=C.target;E.removeEventListener("dispose",T),L(E),E.isVideoTexture&&h.delete(E)}function A(C){const E=C.target;E.removeEventListener("dispose",A),M(E)}function L(C){const E=n.get(C);if(E.__webglInit===void 0)return;const $=C.source,ee=f.get($);if(ee){const se=ee[E.__cacheKey];se.usedTimes--,se.usedTimes===0&&w(C),Object.keys(ee).length===0&&f.delete($)}n.remove(C)}function w(C){const E=n.get(C);i.deleteTexture(E.__webglTexture);const $=C.source,ee=f.get($);delete ee[E.__cacheKey],o.memory.textures--}function M(C){const E=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(E.__webglFramebuffer[ee]))for(let se=0;se<E.__webglFramebuffer[ee].length;se++)i.deleteFramebuffer(E.__webglFramebuffer[ee][se]);else i.deleteFramebuffer(E.__webglFramebuffer[ee]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[ee])}else{if(Array.isArray(E.__webglFramebuffer))for(let ee=0;ee<E.__webglFramebuffer.length;ee++)i.deleteFramebuffer(E.__webglFramebuffer[ee]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ee=0;ee<E.__webglColorRenderbuffer.length;ee++)E.__webglColorRenderbuffer[ee]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[ee]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const $=C.textures;for(let ee=0,se=$.length;ee<se;ee++){const q=n.get($[ee]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove($[ee])}n.remove(C)}let I=0;function W(){I=0}function S(){const C=I;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),I+=1,C}function D(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function N(C,E){const $=n.get(C);if(C.isVideoTexture&&we(C),C.isRenderTargetTexture===!1&&C.version>0&&$.__version!==C.version){const ee=C.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X($,C,E);return}}t.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+E)}function P(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){X($,C,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+E)}function z(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){X($,C,E);return}t.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+E)}function B(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){te($,C,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+E)}const O={[Bs]:i.REPEAT,[di]:i.CLAMP_TO_EDGE,[ya]:i.MIRRORED_REPEAT},k={[ln]:i.NEAREST,[Rp]:i.NEAREST_MIPMAP_NEAREST,[sr]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[mo]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},Z={[Dp]:i.NEVER,[Bp]:i.ALWAYS,[Ip]:i.LESS,[Eu]:i.LEQUAL,[Up]:i.EQUAL,[Op]:i.GEQUAL,[Np]:i.GREATER,[Fp]:i.NOTEQUAL};function le(C,E){if(E.type===An&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===fn||E.magFilter===mo||E.magFilter===sr||E.magFilter===fi||E.minFilter===fn||E.minFilter===mo||E.minFilter===sr||E.minFilter===fi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,O[E.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,O[E.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,O[E.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,k[E.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,k[E.minFilter]),E.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Z[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ln||E.minFilter!==sr&&E.minFilter!==fi||E.type===An&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function Me(C,E){let $=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",T));const ee=E.source;let se=f.get(ee);se===void 0&&(se={},f.set(ee,se));const q=D(E);if(q!==C.__cacheKey){se[q]===void 0&&(se[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),se[q].usedTimes++;const oe=se[C.__cacheKey];oe!==void 0&&(se[C.__cacheKey].usedTimes--,oe.usedTimes===0&&w(E)),C.__cacheKey=q,C.__webglTexture=se[q].texture}return $}function X(C,E,$){let ee=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ee=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ee=i.TEXTURE_3D);const se=Me(C,E),q=E.source;t.bindTexture(ee,C.__webglTexture,i.TEXTURE0+$);const oe=n.get(q);if(q.version!==oe.__version||se===!0){t.activeTexture(i.TEXTURE0+$);const ie=Ze.getPrimaries(Ze.workingColorSpace),de=E.colorSpace===Wn?null:Ze.getPrimaries(E.colorSpace),Le=E.colorSpace===Wn||ie===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Le);let re=_(E.image,!1,s.maxTextureSize);re=Ee(E,re);const fe=r.convert(E.format,E.colorSpace),Ie=r.convert(E.type);let Oe=y(E.internalFormat,fe,Ie,E.colorSpace,E.isVideoTexture);le(ee,E);let xe;const $e=E.mipmaps,Ve=E.isVideoTexture!==!0,tt=oe.__version===void 0||se===!0,V=q.dataReady,ge=R(E,re);if(E.isDepthTexture)Oe=x(E.format===rs,E.type),tt&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Oe,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Oe,re.width,re.height,0,fe,Ie,null));else if(E.isDataTexture)if($e.length>0){Ve&&tt&&t.texStorage2D(i.TEXTURE_2D,ge,Oe,$e[0].width,$e[0].height);for(let J=0,ne=$e.length;J<ne;J++)xe=$e[J],Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,xe.width,xe.height,fe,Ie,xe.data):t.texImage2D(i.TEXTURE_2D,J,Oe,xe.width,xe.height,0,fe,Ie,xe.data);E.generateMipmaps=!1}else Ve?(tt&&t.texStorage2D(i.TEXTURE_2D,ge,Oe,re.width,re.height),V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,fe,Ie,re.data)):t.texImage2D(i.TEXTURE_2D,0,Oe,re.width,re.height,0,fe,Ie,re.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ve&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Oe,$e[0].width,$e[0].height,re.depth);for(let J=0,ne=$e.length;J<ne;J++)if(xe=$e[J],E.format!==on)if(fe!==null)if(Ve){if(V)if(E.layerUpdates.size>0){const ye=Jl(xe.width,xe.height,E.format,E.type);for(const ve of E.layerUpdates){const He=xe.data.subarray(ve*ye/xe.data.BYTES_PER_ELEMENT,(ve+1)*ye/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ve,xe.width,xe.height,1,fe,He)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,xe.width,xe.height,re.depth,fe,xe.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Oe,xe.width,xe.height,re.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,xe.width,xe.height,re.depth,fe,Ie,xe.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,Oe,xe.width,xe.height,re.depth,0,fe,Ie,xe.data)}else{Ve&&tt&&t.texStorage2D(i.TEXTURE_2D,ge,Oe,$e[0].width,$e[0].height);for(let J=0,ne=$e.length;J<ne;J++)xe=$e[J],E.format!==on?fe!==null?Ve?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,xe.width,xe.height,fe,xe.data):t.compressedTexImage2D(i.TEXTURE_2D,J,Oe,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,xe.width,xe.height,fe,Ie,xe.data):t.texImage2D(i.TEXTURE_2D,J,Oe,xe.width,xe.height,0,fe,Ie,xe.data)}else if(E.isDataArrayTexture)if(Ve){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Oe,re.width,re.height,re.depth),V)if(E.layerUpdates.size>0){const J=Jl(re.width,re.height,E.format,E.type);for(const ne of E.layerUpdates){const ye=re.data.subarray(ne*J/re.data.BYTES_PER_ELEMENT,(ne+1)*J/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ne,re.width,re.height,1,fe,Ie,ye)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,fe,Ie,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,re.width,re.height,re.depth,0,fe,Ie,re.data);else if(E.isData3DTexture)Ve?(tt&&t.texStorage3D(i.TEXTURE_3D,ge,Oe,re.width,re.height,re.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,fe,Ie,re.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,re.width,re.height,re.depth,0,fe,Ie,re.data);else if(E.isFramebufferTexture){if(tt)if(Ve)t.texStorage2D(i.TEXTURE_2D,ge,Oe,re.width,re.height);else{let J=re.width,ne=re.height;for(let ye=0;ye<ge;ye++)t.texImage2D(i.TEXTURE_2D,ye,Oe,J,ne,0,fe,Ie,null),J>>=1,ne>>=1}}else if($e.length>0){if(Ve&&tt){const J=me($e[0]);t.texStorage2D(i.TEXTURE_2D,ge,Oe,J.width,J.height)}for(let J=0,ne=$e.length;J<ne;J++)xe=$e[J],Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,fe,Ie,xe):t.texImage2D(i.TEXTURE_2D,J,Oe,fe,Ie,xe);E.generateMipmaps=!1}else if(Ve){if(tt){const J=me(re);t.texStorage2D(i.TEXTURE_2D,ge,Oe,J.width,J.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,fe,Ie,re)}else t.texImage2D(i.TEXTURE_2D,0,Oe,fe,Ie,re);p(E)&&d(ee),oe.__version=q.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function te(C,E,$){if(E.image.length!==6)return;const ee=Me(C,E),se=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+$);const q=n.get(se);if(se.version!==q.__version||ee===!0){t.activeTexture(i.TEXTURE0+$);const oe=Ze.getPrimaries(Ze.workingColorSpace),ie=E.colorSpace===Wn?null:Ze.getPrimaries(E.colorSpace),de=E.colorSpace===Wn||oe===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Le=E.isCompressedTexture||E.image[0].isCompressedTexture,re=E.image[0]&&E.image[0].isDataTexture,fe=[];for(let ne=0;ne<6;ne++)!Le&&!re?fe[ne]=_(E.image[ne],!0,s.maxCubemapSize):fe[ne]=re?E.image[ne].image:E.image[ne],fe[ne]=Ee(E,fe[ne]);const Ie=fe[0],Oe=r.convert(E.format,E.colorSpace),xe=r.convert(E.type),$e=y(E.internalFormat,Oe,xe,E.colorSpace),Ve=E.isVideoTexture!==!0,tt=q.__version===void 0||ee===!0,V=se.dataReady;let ge=R(E,Ie);le(i.TEXTURE_CUBE_MAP,E);let J;if(Le){Ve&&tt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,$e,Ie.width,Ie.height);for(let ne=0;ne<6;ne++){J=fe[ne].mipmaps;for(let ye=0;ye<J.length;ye++){const ve=J[ye];E.format!==on?Oe!==null?Ve?V&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,0,0,ve.width,ve.height,Oe,ve.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,$e,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,0,0,ve.width,ve.height,Oe,xe,ve.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,$e,ve.width,ve.height,0,Oe,xe,ve.data)}}}else{if(J=E.mipmaps,Ve&&tt){J.length>0&&ge++;const ne=me(fe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,$e,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(re){Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,fe[ne].width,fe[ne].height,Oe,xe,fe[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,fe[ne].width,fe[ne].height,0,Oe,xe,fe[ne].data);for(let ye=0;ye<J.length;ye++){const He=J[ye].image[ne].image;Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,0,0,He.width,He.height,Oe,xe,He.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,$e,He.width,He.height,0,Oe,xe,He.data)}}else{Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Oe,xe,fe[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,Oe,xe,fe[ne]);for(let ye=0;ye<J.length;ye++){const ve=J[ye];Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,0,0,Oe,xe,ve.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,$e,Oe,xe,ve.image[ne])}}}p(E)&&d(i.TEXTURE_CUBE_MAP),q.__version=se.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function he(C,E,$,ee,se,q){const oe=r.convert($.format,$.colorSpace),ie=r.convert($.type),de=y($.internalFormat,oe,ie,$.colorSpace),Le=n.get(E),re=n.get($);if(re.__renderTarget=E,!Le.__hasExternalTextures){const fe=Math.max(1,E.width>>q),Ie=Math.max(1,E.height>>q);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,q,de,fe,Ie,E.depth,0,oe,ie,null):t.texImage2D(se,q,de,fe,Ie,0,oe,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),Be(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ee,se,re.__webglTexture,0,Ne(E)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ee,se,re.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ae(C,E,$){if(i.bindRenderbuffer(i.RENDERBUFFER,C),E.depthBuffer){const ee=E.depthTexture,se=ee&&ee.isDepthTexture?ee.type:null,q=x(E.stencilBuffer,se),oe=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=Ne(E);Be(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie,q,E.width,E.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,q,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,oe,i.RENDERBUFFER,C)}else{const ee=E.textures;for(let se=0;se<ee.length;se++){const q=ee[se],oe=r.convert(q.format,q.colorSpace),ie=r.convert(q.type),de=y(q.internalFormat,oe,ie,q.colorSpace),Le=Ne(E);$&&Be(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Le,de,E.width,E.height):Be(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Le,de,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,de,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ce(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=n.get(E.depthTexture);ee.__renderTarget=E,(!ee.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),N(E.depthTexture,0);const se=ee.__webglTexture,q=Ne(E);if(E.depthTexture.format===Yi)Be(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(E.depthTexture.format===rs)Be(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function De(C){const E=n.get(C),$=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const ee=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ee){const se=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ee.removeEventListener("dispose",se)};ee.addEventListener("dispose",se),E.__depthDisposeCallback=se}E.__boundDepthTexture=ee}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Ce(E.__webglFramebuffer,C)}else if($){E.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[ee]),E.__webglDepthbuffer[ee]===void 0)E.__webglDepthbuffer[ee]=i.createRenderbuffer(),ae(E.__webglDepthbuffer[ee],C,!1);else{const se=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=E.__webglDepthbuffer[ee];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,q)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),ae(E.__webglDepthbuffer,C,!1);else{const ee=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,ee,i.RENDERBUFFER,se)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(C,E,$){const ee=n.get(C);E!==void 0&&he(ee.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&De(C)}function Y(C){const E=C.texture,$=n.get(C),ee=n.get(E);C.addEventListener("dispose",A);const se=C.textures,q=C.isWebGLCubeRenderTarget===!0,oe=se.length>1;if(oe||(ee.__webglTexture===void 0&&(ee.__webglTexture=i.createTexture()),ee.__version=E.version,o.memory.textures++),q){$.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[ie]=[];for(let de=0;de<E.mipmaps.length;de++)$.__webglFramebuffer[ie][de]=i.createFramebuffer()}else $.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let ie=0;ie<E.mipmaps.length;ie++)$.__webglFramebuffer[ie]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(oe)for(let ie=0,de=se.length;ie<de;ie++){const Le=n.get(se[ie]);Le.__webglTexture===void 0&&(Le.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&Be(C)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ie=0;ie<se.length;ie++){const de=se[ie];$.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[ie]);const Le=r.convert(de.format,de.colorSpace),re=r.convert(de.type),fe=y(de.internalFormat,Le,re,de.colorSpace,C.isXRRenderTarget===!0),Ie=Ne(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,fe,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,$.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),ae($.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,ee.__webglTexture),le(i.TEXTURE_CUBE_MAP,E);for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)he($.__webglFramebuffer[ie][de],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,de);else he($.__webglFramebuffer[ie],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(E)&&d(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let ie=0,de=se.length;ie<de;ie++){const Le=se[ie],re=n.get(Le);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),le(i.TEXTURE_2D,Le),he($.__webglFramebuffer,C,Le,i.COLOR_ATTACHMENT0+ie,i.TEXTURE_2D,0),p(Le)&&d(i.TEXTURE_2D)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,ee.__webglTexture),le(ie,E),E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)he($.__webglFramebuffer[de],C,E,i.COLOR_ATTACHMENT0,ie,de);else he($.__webglFramebuffer,C,E,i.COLOR_ATTACHMENT0,ie,0);p(E)&&d(ie),t.unbindTexture()}C.depthBuffer&&De(C)}function Q(C){const E=C.textures;for(let $=0,ee=E.length;$<ee;$++){const se=E[$];if(p(se)){const q=v(C),oe=n.get(se).__webglTexture;t.bindTexture(q,oe),d(q),t.unbindTexture()}}}const ue=[],F=[];function Fe(C){if(C.samples>0){if(Be(C)===!1){const E=C.textures,$=C.width,ee=C.height;let se=i.COLOR_BUFFER_BIT;const q=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,oe=n.get(C),ie=E.length>1;if(ie)for(let de=0;de<E.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let de=0;de<E.length;de++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,oe.__webglColorRenderbuffer[de]);const Le=n.get(E[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Le,0)}i.blitFramebuffer(0,0,$,ee,0,0,$,ee,se,i.NEAREST),c===!0&&(ue.length=0,F.length=0,ue.push(i.COLOR_ATTACHMENT0+de),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ue.push(q),F.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let de=0;de<E.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,oe.__webglColorRenderbuffer[de]);const Le=n.get(E[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,oe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,Le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const E=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Ne(C){return Math.min(s.maxSamples,C.samples)}function Be(C){const E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function we(C){const E=o.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function Ee(C,E){const $=C.colorSpace,ee=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||$!==as&&$!==Wn&&(Ze.getTransfer($)===it?(ee!==on||se!==Ln)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),E}function me(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=S,this.resetTextureUnits=W,this.setTexture2D=N,this.setTexture2DArray=P,this.setTexture3D=z,this.setTextureCube=B,this.rebindTextures=Ue,this.setupRenderTarget=Y,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=he,this.useMultisampledRTT=Be}function H_(i,e){function t(n,s=Wn){let r;const o=Ze.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===ac)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===mu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===fu)return i.BYTE;if(n===pu)return i.SHORT;if(n===ks)return i.UNSIGNED_SHORT;if(n===oc)return i.INT;if(n===_i)return i.UNSIGNED_INT;if(n===An)return i.FLOAT;if(n===Ws)return i.HALF_FLOAT;if(n===gu)return i.ALPHA;if(n===vu)return i.RGB;if(n===on)return i.RGBA;if(n===_u)return i.LUMINANCE;if(n===yu)return i.LUMINANCE_ALPHA;if(n===Yi)return i.DEPTH_COMPONENT;if(n===rs)return i.DEPTH_STENCIL;if(n===xu)return i.RED;if(n===lc)return i.RED_INTEGER;if(n===Mu)return i.RG;if(n===hc)return i.RG_INTEGER;if(n===uc)return i.RGBA_INTEGER;if(n===Lr||n===Dr||n===Ir||n===Ur)if(o===it)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Lr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Lr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ir)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ur)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===xa||n===Ma||n===Sa||n===wa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===xa)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ma)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Sa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ea||n===ba||n===Ta)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ea||n===ba)return o===it?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ta)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Ua||n===Na||n===Fa||n===Oa||n===Ba||n===ka||n===za)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Aa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ra)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ca)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Pa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===La)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Da)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ia)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ua)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Na)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Fa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Oa)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ba)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ka)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===za)return o===it?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Nr||n===Va||n===Ha)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Nr)return o===it?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Va)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ha)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Su||n===Ga||n===Wa||n===Xa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Nr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ga)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wa)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class G_ extends Ht{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Dt extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const W_={type:"move"};class Wo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const _ of e.hand.values()){const p=t.getJointPose(_,n),d=this._getHandJoint(l,_);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(W_)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Dt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const X_=`
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

}`;class $_{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new It,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Zn({vertexShader:X_,fragmentShader:q_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Se(new $s(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Y_ extends cs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,m=null,g=null;const _=new $_,p=t.getContextAttributes();let d=null,v=null;const y=[],x=[],R=new ze;let T=null;const A=new Ht;A.viewport=new ot;const L=new Ht;L.viewport=new ot;const w=[A,L],M=new G_;let I=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let te=y[X];return te===void 0&&(te=new Wo,y[X]=te),te.getTargetRaySpace()},this.getControllerGrip=function(X){let te=y[X];return te===void 0&&(te=new Wo,y[X]=te),te.getGripSpace()},this.getHand=function(X){let te=y[X];return te===void 0&&(te=new Wo,y[X]=te),te.getHandSpace()};function S(X){const te=x.indexOf(X.inputSource);if(te===-1)return;const he=y[te];he!==void 0&&(he.update(X.inputSource,X.frame,l||o),he.dispatchEvent({type:X.type,data:X.inputSource}))}function D(){s.removeEventListener("select",S),s.removeEventListener("selectstart",S),s.removeEventListener("selectend",S),s.removeEventListener("squeeze",S),s.removeEventListener("squeezestart",S),s.removeEventListener("squeezeend",S),s.removeEventListener("end",D),s.removeEventListener("inputsourceschange",N);for(let X=0;X<y.length;X++){const te=x[X];te!==null&&(x[X]=null,y[X].disconnect(te))}I=null,W=null,_.reset(),e.setRenderTarget(d),m=null,f=null,u=null,s=null,v=null,Me.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",S),s.addEventListener("selectstart",S),s.addEventListener("selectend",S),s.addEventListener("squeeze",S),s.addEventListener("squeezestart",S),s.addEventListener("squeezeend",S),s.addEventListener("end",D),s.addEventListener("inputsourceschange",N),p.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(R),s.renderState.layers===void 0){const te={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new yi(m.framebufferWidth,m.framebufferHeight,{format:on,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let te=null,he=null,ae=null;p.depth&&(ae=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=p.stencil?rs:Yi,he=p.stencil?ss:_i);const Ce={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(Ce),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),v=new yi(f.textureWidth,f.textureHeight,{format:on,type:Ln,depthTexture:new Bu(f.textureWidth,f.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Me.setContext(s),Me.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function N(X){for(let te=0;te<X.removed.length;te++){const he=X.removed[te],ae=x.indexOf(he);ae>=0&&(x[ae]=null,y[ae].disconnect(he))}for(let te=0;te<X.added.length;te++){const he=X.added[te];let ae=x.indexOf(he);if(ae===-1){for(let De=0;De<y.length;De++)if(De>=x.length){x.push(he),ae=De;break}else if(x[De]===null){x[De]=he,ae=De;break}if(ae===-1)break}const Ce=y[ae];Ce&&Ce.connect(he)}}const P=new U,z=new U;function B(X,te,he){P.setFromMatrixPosition(te.matrixWorld),z.setFromMatrixPosition(he.matrixWorld);const ae=P.distanceTo(z),Ce=te.projectionMatrix.elements,De=he.projectionMatrix.elements,Ue=Ce[14]/(Ce[10]-1),Y=Ce[14]/(Ce[10]+1),Q=(Ce[9]+1)/Ce[5],ue=(Ce[9]-1)/Ce[5],F=(Ce[8]-1)/Ce[0],Fe=(De[8]+1)/De[0],Ne=Ue*F,Be=Ue*Fe,we=ae/(-F+Fe),Ee=we*-F;if(te.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ee),X.translateZ(we),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Ce[10]===-1)X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const me=Ue+we,C=Y+we,E=Ne-Ee,$=Be+(ae-Ee),ee=Q*Y/C*me,se=ue*Y/C*me;X.projectionMatrix.makePerspective(E,$,ee,se,me,C),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function O(X,te){te===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(te.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let te=X.near,he=X.far;_.texture!==null&&(_.depthNear>0&&(te=_.depthNear),_.depthFar>0&&(he=_.depthFar)),M.near=L.near=A.near=te,M.far=L.far=A.far=he,(I!==M.near||W!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,W=M.far),A.layers.mask=X.layers.mask|2,L.layers.mask=X.layers.mask|4,M.layers.mask=A.layers.mask|L.layers.mask;const ae=X.parent,Ce=M.cameras;O(M,ae);for(let De=0;De<Ce.length;De++)O(Ce[De],ae);Ce.length===2?B(M,A,L):M.projectionMatrix.copy(A.projectionMatrix),k(X,M,ae)};function k(X,te,he){he===null?X.matrix.copy(te.matrixWorld):(X.matrix.copy(he.matrixWorld),X.matrix.invert(),X.matrix.multiply(te.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=$a*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let Z=null;function le(X,te){if(h=te.getViewerPose(l||o),g=te,h!==null){const he=h.views;m!==null&&(e.setRenderTargetFramebuffer(v,m.framebuffer),e.setRenderTarget(v));let ae=!1;he.length!==M.cameras.length&&(M.cameras.length=0,ae=!0);for(let De=0;De<he.length;De++){const Ue=he[De];let Y=null;if(m!==null)Y=m.getViewport(Ue);else{const ue=u.getViewSubImage(f,Ue);Y=ue.viewport,De===0&&(e.setRenderTargetTextures(v,ue.colorTexture,f.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(v))}let Q=w[De];Q===void 0&&(Q=new Ht,Q.layers.enable(De),Q.viewport=new ot,w[De]=Q),Q.matrix.fromArray(Ue.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Ue.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Y.x,Y.y,Y.width,Y.height),De===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ae===!0&&M.cameras.push(Q)}const Ce=s.enabledFeatures;if(Ce&&Ce.includes("depth-sensing")){const De=u.getDepthInformation(he[0]);De&&De.isValid&&De.texture&&_.init(e,De,s.renderState)}}for(let he=0;he<y.length;he++){const ae=x[he],Ce=y[he];ae!==null&&Ce!==void 0&&Ce.update(ae,te,l||o)}Z&&Z(X,te),te.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:te}),g=null}const Me=new Fu;Me.setAnimationLoop(le),this.setAnimationLoop=function(X){Z=X},this.dispose=function(){}}}const si=new Zt,j_=new ut;function K_(i,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function n(p,d){d.color.getRGB(p.fogColor.value,Iu(i)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,v,y,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,x)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),_(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?c(p,d,v,y):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===Rt&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===Rt&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const v=e.get(d),y=v.envMap,x=v.envMapRotation;y&&(p.envMap.value=y,si.copy(x),si.x*=-1,si.y*=-1,si.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),p.envMapRotation.value.setFromMatrix4(j_.makeRotationFromEuler(si)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,v,y){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*v,p.scale.value=y*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,v){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Rt&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=v.texture,p.transmissionSamplerSize.value.set(v.width,v.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function _(p,d){const v=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(v.matrixWorld),p.nearDistance.value=v.shadow.camera.near,p.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Z_(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,y){const x=y.program;n.uniformBlockBinding(v,x)}function l(v,y){let x=s[v.id];x===void 0&&(g(v),x=h(v),s[v.id]=x,v.addEventListener("dispose",p));const R=y.program;n.updateUBOMapping(v,R);const T=e.render.frame;r[v.id]!==T&&(f(v),r[v.id]=T)}function h(v){const y=u();v.__bindingPointIndex=y;const x=i.createBuffer(),R=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,R,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function u(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(v){const y=s[v.id],x=v.uniforms,R=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let T=0,A=x.length;T<A;T++){const L=Array.isArray(x[T])?x[T]:[x[T]];for(let w=0,M=L.length;w<M;w++){const I=L[w];if(m(I,T,w,R)===!0){const W=I.__offset,S=Array.isArray(I.value)?I.value:[I.value];let D=0;for(let N=0;N<S.length;N++){const P=S[N],z=_(P);typeof P=="number"||typeof P=="boolean"?(I.__data[0]=P,i.bufferSubData(i.UNIFORM_BUFFER,W+D,I.__data)):P.isMatrix3?(I.__data[0]=P.elements[0],I.__data[1]=P.elements[1],I.__data[2]=P.elements[2],I.__data[3]=0,I.__data[4]=P.elements[3],I.__data[5]=P.elements[4],I.__data[6]=P.elements[5],I.__data[7]=0,I.__data[8]=P.elements[6],I.__data[9]=P.elements[7],I.__data[10]=P.elements[8],I.__data[11]=0):(P.toArray(I.__data,D),D+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(v,y,x,R){const T=v.value,A=y+"_"+x;if(R[A]===void 0)return typeof T=="number"||typeof T=="boolean"?R[A]=T:R[A]=T.clone(),!0;{const L=R[A];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return R[A]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function g(v){const y=v.uniforms;let x=0;const R=16;for(let A=0,L=y.length;A<L;A++){const w=Array.isArray(y[A])?y[A]:[y[A]];for(let M=0,I=w.length;M<I;M++){const W=w[M],S=Array.isArray(W.value)?W.value:[W.value];for(let D=0,N=S.length;D<N;D++){const P=S[D],z=_(P),B=x%R,O=B%z.boundary,k=B+O;x+=O,k!==0&&R-k<z.storage&&(x+=R-k),W.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=x,x+=z.storage}}}const T=x%R;return T>0&&(x+=R-T),v.__size=x,v.__cache={},this}function _(v){const y={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(y.boundary=4,y.storage=4):v.isVector2?(y.boundary=8,y.storage=8):v.isVector3||v.isColor?(y.boundary=16,y.storage=12):v.isVector4?(y.boundary=16,y.storage=16):v.isMatrix3?(y.boundary=48,y.storage=48):v.isMatrix4?(y.boundary=64,y.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),y}function p(v){const y=v.target;y.removeEventListener("dispose",p);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function d(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}class J_{constructor(e={}){const{canvas:t=zp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,d=null;const v=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$t,this.toneMapping=Yn,this.toneMappingExposure=1;const x=this;let R=!1,T=0,A=0,L=null,w=-1,M=null;const I=new ot,W=new ot;let S=null;const D=new je(0);let N=0,P=t.width,z=t.height,B=1,O=null,k=null;const Z=new ot(0,0,P,z),le=new ot(0,0,P,z);let Me=!1;const X=new dc;let te=!1,he=!1;const ae=new ut,Ce=new ut,De=new U,Ue=new ot,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function ue(){return L===null?B:1}let F=n;function Fe(b,H){return t.getContext(b,H)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rc}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",ve,!1),F===null){const H="webgl2";if(F=Fe(H,b),F===null)throw Fe(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ne,Be,we,Ee,me,C,E,$,ee,se,q,oe,ie,de,Le,re,fe,Ie,Oe,xe,$e,Ve,tt,V;function ge(){Ne=new iv(F),Ne.init(),Ve=new H_(F,Ne),Be=new Z0(F,Ne,e,Ve),we=new k_(F,Ne),Be.reverseDepthBuffer&&f&&we.buffers.depth.setReversed(!0),Ee=new ov(F),me=new E_,C=new V_(F,Ne,we,me,Be,Ve,Ee),E=new Q0(x),$=new nv(x),ee=new fm(F),tt=new j0(F,ee),se=new sv(F,ee,Ee,tt),q=new cv(F,se,ee,Ee),Oe=new av(F,Be,C),re=new J0(me),oe=new w_(x,E,$,Ne,Be,tt,re),ie=new K_(x,me),de=new T_,Le=new D_(Ne),Ie=new Y0(x,E,$,we,q,m,c),fe=new O_(x,q,Be),V=new Z_(F,Ee,Be,we),xe=new K0(F,Ne,Ee),$e=new rv(F,Ne,Ee),Ee.programs=oe.programs,x.capabilities=Be,x.extensions=Ne,x.properties=me,x.renderLists=de,x.shadowMap=fe,x.state=we,x.info=Ee}ge();const J=new Y_(x,F);this.xr=J,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const b=Ne.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ne.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(b){b!==void 0&&(B=b,this.setSize(P,z,!1))},this.getSize=function(b){return b.set(P,z)},this.setSize=function(b,H,j=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=b,z=H,t.width=Math.floor(b*B),t.height=Math.floor(H*B),j===!0&&(t.style.width=b+"px",t.style.height=H+"px"),this.setViewport(0,0,b,H)},this.getDrawingBufferSize=function(b){return b.set(P*B,z*B).floor()},this.setDrawingBufferSize=function(b,H,j){P=b,z=H,B=j,t.width=Math.floor(b*j),t.height=Math.floor(H*j),this.setViewport(0,0,b,H)},this.getCurrentViewport=function(b){return b.copy(I)},this.getViewport=function(b){return b.copy(Z)},this.setViewport=function(b,H,j,K){b.isVector4?Z.set(b.x,b.y,b.z,b.w):Z.set(b,H,j,K),we.viewport(I.copy(Z).multiplyScalar(B).round())},this.getScissor=function(b){return b.copy(le)},this.setScissor=function(b,H,j,K){b.isVector4?le.set(b.x,b.y,b.z,b.w):le.set(b,H,j,K),we.scissor(W.copy(le).multiplyScalar(B).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(b){we.setScissorTest(Me=b)},this.setOpaqueSort=function(b){O=b},this.setTransparentSort=function(b){k=b},this.getClearColor=function(b){return b.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor.apply(Ie,arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha.apply(Ie,arguments)},this.clear=function(b=!0,H=!0,j=!0){let K=0;if(b){let G=!1;if(L!==null){const ce=L.texture.format;G=ce===uc||ce===hc||ce===lc}if(G){const ce=L.texture.type,_e=ce===Ln||ce===_i||ce===ks||ce===ss||ce===ac||ce===cc,be=Ie.getClearColor(),Te=Ie.getClearAlpha(),ke=be.r,Ge=be.g,Ae=be.b;_e?(g[0]=ke,g[1]=Ge,g[2]=Ae,g[3]=Te,F.clearBufferuiv(F.COLOR,0,g)):(_[0]=ke,_[1]=Ge,_[2]=Ae,_[3]=Te,F.clearBufferiv(F.COLOR,0,_))}else K|=F.COLOR_BUFFER_BIT}H&&(K|=F.DEPTH_BUFFER_BIT),j&&(K|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",ve,!1),de.dispose(),Le.dispose(),me.dispose(),E.dispose(),$.dispose(),q.dispose(),tt.dispose(),V.dispose(),oe.dispose(),J.dispose(),J.removeEventListener("sessionstart",mc),J.removeEventListener("sessionend",gc),Jn.stop()};function ne(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const b=Ee.autoReset,H=fe.enabled,j=fe.autoUpdate,K=fe.needsUpdate,G=fe.type;ge(),Ee.autoReset=b,fe.enabled=H,fe.autoUpdate=j,fe.needsUpdate=K,fe.type=G}function ve(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function He(b){const H=b.target;H.removeEventListener("dispose",He),ft(H)}function ft(b){Et(b),me.remove(b)}function Et(b){const H=me.get(b).programs;H!==void 0&&(H.forEach(function(j){oe.releaseProgram(j)}),b.isShaderMaterial&&oe.releaseShaderCache(b))}this.renderBufferDirect=function(b,H,j,K,G,ce){H===null&&(H=Y);const _e=G.isMesh&&G.matrixWorld.determinant()<0,be=qu(b,H,j,K,G);we.setMaterial(K,_e);let Te=j.index,ke=1;if(K.wireframe===!0){if(Te=se.getWireframeAttribute(j),Te===void 0)return;ke=2}const Ge=j.drawRange,Ae=j.attributes.position;let Je=Ge.start*ke,at=(Ge.start+Ge.count)*ke;ce!==null&&(Je=Math.max(Je,ce.start*ke),at=Math.min(at,(ce.start+ce.count)*ke)),Te!==null?(Je=Math.max(Je,0),at=Math.min(at,Te.count)):Ae!=null&&(Je=Math.max(Je,0),at=Math.min(at,Ae.count));const lt=at-Je;if(lt<0||lt===1/0)return;tt.setup(G,K,be,j,Te);let Nt,Qe=xe;if(Te!==null&&(Nt=ee.get(Te),Qe=$e,Qe.setIndex(Nt)),G.isMesh)K.wireframe===!0?(we.setLineWidth(K.wireframeLinewidth*ue()),Qe.setMode(F.LINES)):Qe.setMode(F.TRIANGLES);else if(G.isLine){let Pe=K.linewidth;Pe===void 0&&(Pe=1),we.setLineWidth(Pe*ue()),G.isLineSegments?Qe.setMode(F.LINES):G.isLineLoop?Qe.setMode(F.LINE_LOOP):Qe.setMode(F.LINE_STRIP)}else G.isPoints?Qe.setMode(F.POINTS):G.isSprite&&Qe.setMode(F.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Qe.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Qe.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Pe=G._multiDrawStarts,vn=G._multiDrawCounts,et=G._multiDrawCount,Qt=Te?ee.get(Te).bytesPerElement:1,Ti=me.get(K).currentProgram.getUniforms();for(let Bt=0;Bt<et;Bt++)Ti.setValue(F,"_gl_DrawID",Bt),Qe.render(Pe[Bt]/Qt,vn[Bt])}else if(G.isInstancedMesh)Qe.renderInstances(Je,lt,G.count);else if(j.isInstancedBufferGeometry){const Pe=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,vn=Math.min(j.instanceCount,Pe);Qe.renderInstances(Je,lt,vn)}else Qe.render(Je,lt)};function nt(b,H,j){b.transparent===!0&&b.side===Ot&&b.forceSinglePass===!1?(b.side=Rt,b.needsUpdate=!0,Zs(b,H,j),b.side=jt,b.needsUpdate=!0,Zs(b,H,j),b.side=Ot):Zs(b,H,j)}this.compile=function(b,H,j=null){j===null&&(j=b),d=Le.get(j),d.init(H),y.push(d),j.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),b!==j&&b.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const K=new Set;return b.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ce=G.material;if(ce)if(Array.isArray(ce))for(let _e=0;_e<ce.length;_e++){const be=ce[_e];nt(be,j,G),K.add(be)}else nt(ce,j,G),K.add(ce)}),y.pop(),d=null,K},this.compileAsync=function(b,H,j=null){const K=this.compile(b,H,j);return new Promise(G=>{function ce(){if(K.forEach(function(_e){me.get(_e).currentProgram.isReady()&&K.delete(_e)}),K.size===0){G(b);return}setTimeout(ce,10)}Ne.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let Jt=null;function gn(b){Jt&&Jt(b)}function mc(){Jn.stop()}function gc(){Jn.start()}const Jn=new Fu;Jn.setAnimationLoop(gn),typeof self<"u"&&Jn.setContext(self),this.setAnimationLoop=function(b){Jt=b,J.setAnimationLoop(b),b===null?Jn.stop():Jn.start()},J.addEventListener("sessionstart",mc),J.addEventListener("sessionend",gc),this.render=function(b,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(H),H=J.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,H,L),d=Le.get(b,y.length),d.init(H),y.push(d),Ce.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),X.setFromProjectionMatrix(Ce),he=this.localClippingEnabled,te=re.init(this.clippingPlanes,he),p=de.get(b,v.length),p.init(),v.push(p),J.enabled===!0&&J.isPresenting===!0){const ce=x.xr.getDepthSensingMesh();ce!==null&&to(ce,H,-1/0,x.sortObjects)}to(b,H,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(O,k),Q=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Q&&Ie.addToRenderList(p,b),this.info.render.frame++,te===!0&&re.beginShadows();const j=d.state.shadowsArray;fe.render(j,b,H),te===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=p.opaque,G=p.transmissive;if(d.setupLights(),H.isArrayCamera){const ce=H.cameras;if(G.length>0)for(let _e=0,be=ce.length;_e<be;_e++){const Te=ce[_e];_c(K,G,b,Te)}Q&&Ie.render(b);for(let _e=0,be=ce.length;_e<be;_e++){const Te=ce[_e];vc(p,b,Te,Te.viewport)}}else G.length>0&&_c(K,G,b,H),Q&&Ie.render(b),vc(p,b,H);L!==null&&(C.updateMultisampleRenderTarget(L),C.updateRenderTargetMipmap(L)),b.isScene===!0&&b.onAfterRender(x,b,H),tt.resetDefaultState(),w=-1,M=null,y.pop(),y.length>0?(d=y[y.length-1],te===!0&&re.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,v.pop(),v.length>0?p=v[v.length-1]:p=null};function to(b,H,j,K){if(b.visible===!1)return;if(b.layers.test(H.layers)){if(b.isGroup)j=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(H);else if(b.isLight)d.pushLight(b),b.castShadow&&d.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){K&&Ue.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Ce);const _e=q.update(b),be=b.material;be.visible&&p.push(b,_e,be,j,Ue.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const _e=q.update(b),be=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ue.copy(b.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ue.copy(_e.boundingSphere.center)),Ue.applyMatrix4(b.matrixWorld).applyMatrix4(Ce)),Array.isArray(be)){const Te=_e.groups;for(let ke=0,Ge=Te.length;ke<Ge;ke++){const Ae=Te[ke],Je=be[Ae.materialIndex];Je&&Je.visible&&p.push(b,_e,Je,j,Ue.z,Ae)}}else be.visible&&p.push(b,_e,be,j,Ue.z,null)}}const ce=b.children;for(let _e=0,be=ce.length;_e<be;_e++)to(ce[_e],H,j,K)}function vc(b,H,j,K){const G=b.opaque,ce=b.transmissive,_e=b.transparent;d.setupLightsView(j),te===!0&&re.setGlobalState(x.clippingPlanes,j),K&&we.viewport(I.copy(K)),G.length>0&&Ks(G,H,j),ce.length>0&&Ks(ce,H,j),_e.length>0&&Ks(_e,H,j),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function _c(b,H,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[K.id]===void 0&&(d.state.transmissionRenderTarget[K.id]=new yi(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Ws:Ln,minFilter:fi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const ce=d.state.transmissionRenderTarget[K.id],_e=K.viewport||I;ce.setSize(_e.z,_e.w);const be=x.getRenderTarget();x.setRenderTarget(ce),x.getClearColor(D),N=x.getClearAlpha(),N<1&&x.setClearColor(16777215,.5),x.clear(),Q&&Ie.render(j);const Te=x.toneMapping;x.toneMapping=Yn;const ke=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),d.setupLightsView(K),te===!0&&re.setGlobalState(x.clippingPlanes,K),Ks(b,j,K),C.updateMultisampleRenderTarget(ce),C.updateRenderTargetMipmap(ce),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let Ge=!1;for(let Ae=0,Je=H.length;Ae<Je;Ae++){const at=H[Ae],lt=at.object,Nt=at.geometry,Qe=at.material,Pe=at.group;if(Qe.side===Ot&&lt.layers.test(K.layers)){const vn=Qe.side;Qe.side=Rt,Qe.needsUpdate=!0,yc(lt,j,K,Nt,Qe,Pe),Qe.side=vn,Qe.needsUpdate=!0,Ge=!0}}Ge===!0&&(C.updateMultisampleRenderTarget(ce),C.updateRenderTargetMipmap(ce))}x.setRenderTarget(be),x.setClearColor(D,N),ke!==void 0&&(K.viewport=ke),x.toneMapping=Te}function Ks(b,H,j){const K=H.isScene===!0?H.overrideMaterial:null;for(let G=0,ce=b.length;G<ce;G++){const _e=b[G],be=_e.object,Te=_e.geometry,ke=K===null?_e.material:K,Ge=_e.group;be.layers.test(j.layers)&&yc(be,H,j,Te,ke,Ge)}}function yc(b,H,j,K,G,ce){b.onBeforeRender(x,H,j,K,G,ce),b.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(x,H,j,K,b,ce),G.transparent===!0&&G.side===Ot&&G.forceSinglePass===!1?(G.side=Rt,G.needsUpdate=!0,x.renderBufferDirect(j,H,K,G,b,ce),G.side=jt,G.needsUpdate=!0,x.renderBufferDirect(j,H,K,G,b,ce),G.side=Ot):x.renderBufferDirect(j,H,K,G,b,ce),b.onAfterRender(x,H,j,K,G,ce)}function Zs(b,H,j){H.isScene!==!0&&(H=Y);const K=me.get(b),G=d.state.lights,ce=d.state.shadowsArray,_e=G.state.version,be=oe.getParameters(b,G.state,ce,H,j),Te=oe.getProgramCacheKey(be);let ke=K.programs;K.environment=b.isMeshStandardMaterial?H.environment:null,K.fog=H.fog,K.envMap=(b.isMeshStandardMaterial?$:E).get(b.envMap||K.environment),K.envMapRotation=K.environment!==null&&b.envMap===null?H.environmentRotation:b.envMapRotation,ke===void 0&&(b.addEventListener("dispose",He),ke=new Map,K.programs=ke);let Ge=ke.get(Te);if(Ge!==void 0){if(K.currentProgram===Ge&&K.lightsStateVersion===_e)return Mc(b,be),Ge}else be.uniforms=oe.getUniforms(b),b.onBeforeCompile(be,x),Ge=oe.acquireProgram(be,Te),ke.set(Te,Ge),K.uniforms=be.uniforms;const Ae=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Ae.clippingPlanes=re.uniform),Mc(b,be),K.needsLights=Yu(b),K.lightsStateVersion=_e,K.needsLights&&(Ae.ambientLightColor.value=G.state.ambient,Ae.lightProbe.value=G.state.probe,Ae.directionalLights.value=G.state.directional,Ae.directionalLightShadows.value=G.state.directionalShadow,Ae.spotLights.value=G.state.spot,Ae.spotLightShadows.value=G.state.spotShadow,Ae.rectAreaLights.value=G.state.rectArea,Ae.ltc_1.value=G.state.rectAreaLTC1,Ae.ltc_2.value=G.state.rectAreaLTC2,Ae.pointLights.value=G.state.point,Ae.pointLightShadows.value=G.state.pointShadow,Ae.hemisphereLights.value=G.state.hemi,Ae.directionalShadowMap.value=G.state.directionalShadowMap,Ae.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ae.spotShadowMap.value=G.state.spotShadowMap,Ae.spotLightMatrix.value=G.state.spotLightMatrix,Ae.spotLightMap.value=G.state.spotLightMap,Ae.pointShadowMap.value=G.state.pointShadowMap,Ae.pointShadowMatrix.value=G.state.pointShadowMatrix),K.currentProgram=Ge,K.uniformsList=null,Ge}function xc(b){if(b.uniformsList===null){const H=b.currentProgram.getUniforms();b.uniformsList=Fr.seqWithValue(H.seq,b.uniforms)}return b.uniformsList}function Mc(b,H){const j=me.get(b);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function qu(b,H,j,K,G){H.isScene!==!0&&(H=Y),C.resetTextureUnits();const ce=H.fog,_e=K.isMeshStandardMaterial?H.environment:null,be=L===null?x.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:as,Te=(K.isMeshStandardMaterial?$:E).get(K.envMap||_e),ke=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,Ge=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ae=!!j.morphAttributes.position,Je=!!j.morphAttributes.normal,at=!!j.morphAttributes.color;let lt=Yn;K.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(lt=x.toneMapping);const Nt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Qe=Nt!==void 0?Nt.length:0,Pe=me.get(K),vn=d.state.lights;if(te===!0&&(he===!0||b!==M)){const Xt=b===M&&K.id===w;re.setState(K,b,Xt)}let et=!1;K.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==vn.state.version||Pe.outputColorSpace!==be||G.isBatchedMesh&&Pe.batching===!1||!G.isBatchedMesh&&Pe.batching===!0||G.isBatchedMesh&&Pe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Pe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Pe.instancing===!1||!G.isInstancedMesh&&Pe.instancing===!0||G.isSkinnedMesh&&Pe.skinning===!1||!G.isSkinnedMesh&&Pe.skinning===!0||G.isInstancedMesh&&Pe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Pe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Pe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Pe.instancingMorph===!1&&G.morphTexture!==null||Pe.envMap!==Te||K.fog===!0&&Pe.fog!==ce||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==re.numPlanes||Pe.numIntersection!==re.numIntersection)||Pe.vertexAlphas!==ke||Pe.vertexTangents!==Ge||Pe.morphTargets!==Ae||Pe.morphNormals!==Je||Pe.morphColors!==at||Pe.toneMapping!==lt||Pe.morphTargetsCount!==Qe)&&(et=!0):(et=!0,Pe.__version=K.version);let Qt=Pe.currentProgram;et===!0&&(Qt=Zs(K,H,G));let Ti=!1,Bt=!1,us=!1;const ht=Qt.getUniforms(),hn=Pe.uniforms;if(we.useProgram(Qt.program)&&(Ti=!0,Bt=!0,us=!0),K.id!==w&&(w=K.id,Bt=!0),Ti||M!==b){we.buffers.depth.getReversed()?(ae.copy(b.projectionMatrix),Hp(ae),Gp(ae),ht.setValue(F,"projectionMatrix",ae)):ht.setValue(F,"projectionMatrix",b.projectionMatrix),ht.setValue(F,"viewMatrix",b.matrixWorldInverse);const Dn=ht.map.cameraPosition;Dn!==void 0&&Dn.setValue(F,De.setFromMatrixPosition(b.matrixWorld)),Be.logarithmicDepthBuffer&&ht.setValue(F,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ht.setValue(F,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,Bt=!0,us=!0)}if(G.isSkinnedMesh){ht.setOptional(F,G,"bindMatrix"),ht.setOptional(F,G,"bindMatrixInverse");const Xt=G.skeleton;Xt&&(Xt.boneTexture===null&&Xt.computeBoneTexture(),ht.setValue(F,"boneTexture",Xt.boneTexture,C))}G.isBatchedMesh&&(ht.setOptional(F,G,"batchingTexture"),ht.setValue(F,"batchingTexture",G._matricesTexture,C),ht.setOptional(F,G,"batchingIdTexture"),ht.setValue(F,"batchingIdTexture",G._indirectTexture,C),ht.setOptional(F,G,"batchingColorTexture"),G._colorsTexture!==null&&ht.setValue(F,"batchingColorTexture",G._colorsTexture,C));const ds=j.morphAttributes;if((ds.position!==void 0||ds.normal!==void 0||ds.color!==void 0)&&Oe.update(G,j,Qt),(Bt||Pe.receiveShadow!==G.receiveShadow)&&(Pe.receiveShadow=G.receiveShadow,ht.setValue(F,"receiveShadow",G.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(hn.envMap.value=Te,hn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&H.environment!==null&&(hn.envMapIntensity.value=H.environmentIntensity),Bt&&(ht.setValue(F,"toneMappingExposure",x.toneMappingExposure),Pe.needsLights&&$u(hn,us),ce&&K.fog===!0&&ie.refreshFogUniforms(hn,ce),ie.refreshMaterialUniforms(hn,K,B,z,d.state.transmissionRenderTarget[b.id]),Fr.upload(F,xc(Pe),hn,C)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Fr.upload(F,xc(Pe),hn,C),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ht.setValue(F,"center",G.center),ht.setValue(F,"modelViewMatrix",G.modelViewMatrix),ht.setValue(F,"normalMatrix",G.normalMatrix),ht.setValue(F,"modelMatrix",G.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const Xt=K.uniformsGroups;for(let Dn=0,In=Xt.length;Dn<In;Dn++){const Sc=Xt[Dn];V.update(Sc,Qt),V.bind(Sc,Qt)}}return Qt}function $u(b,H){b.ambientLightColor.needsUpdate=H,b.lightProbe.needsUpdate=H,b.directionalLights.needsUpdate=H,b.directionalLightShadows.needsUpdate=H,b.pointLights.needsUpdate=H,b.pointLightShadows.needsUpdate=H,b.spotLights.needsUpdate=H,b.spotLightShadows.needsUpdate=H,b.rectAreaLights.needsUpdate=H,b.hemisphereLights.needsUpdate=H}function Yu(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(b,H,j){me.get(b.texture).__webglTexture=H,me.get(b.depthTexture).__webglTexture=j;const K=me.get(b);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=j===void 0,K.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,H){const j=me.get(b);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(b,H=0,j=0){L=b,T=H,A=j;let K=!0,G=null,ce=!1,_e=!1;if(b){const Te=me.get(b);if(Te.__useDefaultFramebuffer!==void 0)we.bindFramebuffer(F.FRAMEBUFFER,null),K=!1;else if(Te.__webglFramebuffer===void 0)C.setupRenderTarget(b);else if(Te.__hasExternalTextures)C.rebindTextures(b,me.get(b.texture).__webglTexture,me.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Ae=b.depthTexture;if(Te.__boundDepthTexture!==Ae){if(Ae!==null&&me.has(Ae)&&(b.width!==Ae.image.width||b.height!==Ae.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(b)}}const ke=b.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(_e=!0);const Ge=me.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Ge[H])?G=Ge[H][j]:G=Ge[H],ce=!0):b.samples>0&&C.useMultisampledRTT(b)===!1?G=me.get(b).__webglMultisampledFramebuffer:Array.isArray(Ge)?G=Ge[j]:G=Ge,I.copy(b.viewport),W.copy(b.scissor),S=b.scissorTest}else I.copy(Z).multiplyScalar(B).floor(),W.copy(le).multiplyScalar(B).floor(),S=Me;if(we.bindFramebuffer(F.FRAMEBUFFER,G)&&K&&we.drawBuffers(b,G),we.viewport(I),we.scissor(W),we.setScissorTest(S),ce){const Te=me.get(b.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+H,Te.__webglTexture,j)}else if(_e){const Te=me.get(b.texture),ke=H||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Te.__webglTexture,j||0,ke)}w=-1},this.readRenderTargetPixels=function(b,H,j,K,G,ce,_e){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=me.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){we.bindFramebuffer(F.FRAMEBUFFER,be);try{const Te=b.texture,ke=Te.format,Ge=Te.type;if(!Be.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Be.textureTypeReadable(Ge)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=b.width-K&&j>=0&&j<=b.height-G&&F.readPixels(H,j,K,G,Ve.convert(ke),Ve.convert(Ge),ce)}finally{const Te=L!==null?me.get(L).__webglFramebuffer:null;we.bindFramebuffer(F.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(b,H,j,K,G,ce,_e){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=me.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){const Te=b.texture,ke=Te.format,Ge=Te.type;if(!Be.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Be.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=b.width-K&&j>=0&&j<=b.height-G){we.bindFramebuffer(F.FRAMEBUFFER,be);const Ae=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ae),F.bufferData(F.PIXEL_PACK_BUFFER,ce.byteLength,F.STREAM_READ),F.readPixels(H,j,K,G,Ve.convert(ke),Ve.convert(Ge),0);const Je=L!==null?me.get(L).__webglFramebuffer:null;we.bindFramebuffer(F.FRAMEBUFFER,Je);const at=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Vp(F,at,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ae),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,ce),F.deleteBuffer(Ae),F.deleteSync(at),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,H=null,j=0){b.isTexture!==!0&&(As("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1]);const K=Math.pow(2,-j),G=Math.floor(b.image.width*K),ce=Math.floor(b.image.height*K),_e=H!==null?H.x:0,be=H!==null?H.y:0;C.setTexture2D(b,0),F.copyTexSubImage2D(F.TEXTURE_2D,j,0,0,_e,be,G,ce),we.unbindTexture()},this.copyTextureToTexture=function(b,H,j=null,K=null,G=0){b.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,b=arguments[1],H=arguments[2],G=arguments[3]||0,j=null);let ce,_e,be,Te,ke,Ge,Ae,Je,at;const lt=b.isCompressedTexture?b.mipmaps[G]:b.image;j!==null?(ce=j.max.x-j.min.x,_e=j.max.y-j.min.y,be=j.isBox3?j.max.z-j.min.z:1,Te=j.min.x,ke=j.min.y,Ge=j.isBox3?j.min.z:0):(ce=lt.width,_e=lt.height,be=lt.depth||1,Te=0,ke=0,Ge=0),K!==null?(Ae=K.x,Je=K.y,at=K.z):(Ae=0,Je=0,at=0);const Nt=Ve.convert(H.format),Qe=Ve.convert(H.type);let Pe;H.isData3DTexture?(C.setTexture3D(H,0),Pe=F.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(C.setTexture2DArray(H,0),Pe=F.TEXTURE_2D_ARRAY):(C.setTexture2D(H,0),Pe=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,H.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,H.unpackAlignment);const vn=F.getParameter(F.UNPACK_ROW_LENGTH),et=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Qt=F.getParameter(F.UNPACK_SKIP_PIXELS),Ti=F.getParameter(F.UNPACK_SKIP_ROWS),Bt=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,lt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,lt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Te),F.pixelStorei(F.UNPACK_SKIP_ROWS,ke),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ge);const us=b.isDataArrayTexture||b.isData3DTexture,ht=H.isDataArrayTexture||H.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const hn=me.get(b),ds=me.get(H),Xt=me.get(hn.__renderTarget),Dn=me.get(ds.__renderTarget);we.bindFramebuffer(F.READ_FRAMEBUFFER,Xt.__webglFramebuffer),we.bindFramebuffer(F.DRAW_FRAMEBUFFER,Dn.__webglFramebuffer);for(let In=0;In<be;In++)us&&F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,me.get(b).__webglTexture,G,Ge+In),b.isDepthTexture?(ht&&F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,me.get(H).__webglTexture,G,at+In),F.blitFramebuffer(Te,ke,ce,_e,Ae,Je,ce,_e,F.DEPTH_BUFFER_BIT,F.NEAREST)):ht?F.copyTexSubImage3D(Pe,G,Ae,Je,at+In,Te,ke,ce,_e):F.copyTexSubImage2D(Pe,G,Ae,Je,at+In,Te,ke,ce,_e);we.bindFramebuffer(F.READ_FRAMEBUFFER,null),we.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ht?b.isDataTexture||b.isData3DTexture?F.texSubImage3D(Pe,G,Ae,Je,at,ce,_e,be,Nt,Qe,lt.data):H.isCompressedArrayTexture?F.compressedTexSubImage3D(Pe,G,Ae,Je,at,ce,_e,be,Nt,lt.data):F.texSubImage3D(Pe,G,Ae,Je,at,ce,_e,be,Nt,Qe,lt):b.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,G,Ae,Je,ce,_e,Nt,Qe,lt.data):b.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,G,Ae,Je,lt.width,lt.height,Nt,lt.data):F.texSubImage2D(F.TEXTURE_2D,G,Ae,Je,ce,_e,Nt,Qe,lt);F.pixelStorei(F.UNPACK_ROW_LENGTH,vn),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,et),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Qt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ti),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Bt),G===0&&H.generateMipmaps&&F.generateMipmap(Pe),we.unbindTexture()},this.copyTextureToTexture3D=function(b,H,j=null,K=null,G=0){return b.isTexture!==!0&&(As("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,K=arguments[1]||null,b=arguments[2],H=arguments[3],G=arguments[4]||0),As('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,H,j,K,G)},this.initRenderTarget=function(b){me.get(b).__webglFramebuffer===void 0&&C.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),we.unbindTexture()},this.resetState=function(){T=0,A=0,L=null,we.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Rn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}class pc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new je(e),this.density=t}clone(){return new pc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Q_ extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Zt,this.environmentIntensity=1,this.environmentRotation=new Zt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class ey{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=qa,this.updateRanges=[],this.version=0,this.uuid=jn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Pt=new U;class Gr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=st(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=st(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=dn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=st(t,this.array),n=st(n,this.array),s=st(s,this.array),r=st(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new mt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Gr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Gu extends bi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Hi;const Ms=new U,Gi=new U,Wi=new U,Xi=new ze,Ss=new ze,Wu=new ut,br=new U,ws=new U,Tr=new U,Ql=new ze,Xo=new ze,eh=new ze;class ty extends vt{constructor(e=new Gu){if(super(),this.isSprite=!0,this.type="Sprite",Hi===void 0){Hi=new xt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new ey(t,5);Hi.setIndex([0,1,2,0,2,3]),Hi.setAttribute("position",new Gr(n,3,0,!1)),Hi.setAttribute("uv",new Gr(n,2,3,!1))}this.geometry=Hi,this.material=e,this.center=new ze(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Gi.setFromMatrixScale(this.matrixWorld),Wu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Gi.multiplyScalar(-Wi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Ar(br.set(-.5,-.5,0),Wi,o,Gi,s,r),Ar(ws.set(.5,-.5,0),Wi,o,Gi,s,r),Ar(Tr.set(.5,.5,0),Wi,o,Gi,s,r),Ql.set(0,0),Xo.set(1,0),eh.set(1,1);let a=e.ray.intersectTriangle(br,ws,Tr,!1,Ms);if(a===null&&(Ar(ws.set(-.5,.5,0),Wi,o,Gi,s,r),Xo.set(0,1),a=e.ray.intersectTriangle(br,Tr,ws,!1,Ms),a===null))return;const c=e.ray.origin.distanceTo(Ms);c<e.near||c>e.far||t.push({distance:c,point:Ms.clone(),uv:Yt.getInterpolation(Ms,br,ws,Tr,Ql,Xo,eh,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Ar(i,e,t,n,s,r){Xi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ss.x=r*Xi.x-s*Xi.y,Ss.y=s*Xi.x+r*Xi.y):Ss.copy(Xi),i.copy(e),i.x+=Ss.x,i.y+=Ss.y,i.applyMatrix4(Wu)}class hs extends bi{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const th=new ut,ja=new Ru,Rr=new qs,Cr=new U;class Ys extends vt{constructor(e=new xt,t=new hs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(s),Rr.radius+=r,e.ray.intersectsSphere(Rr)===!1)return;th.copy(s).invert(),ja.copy(e.ray).applyMatrix4(th);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let g=f,_=m;g<_;g++){const p=l.getX(g);Cr.fromBufferAttribute(u,p),nh(Cr,p,c,s,e,t,this)}}else{const f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=f,_=m;g<_;g++)Cr.fromBufferAttribute(u,g),nh(Cr,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function nh(i,e,t,n,s,r,o){const a=ja.distanceSqToPoint(i);if(a<t){const c=new U;ja.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Jr extends It{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class an extends xt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],m=[];let g=0;const _=[],p=n/2;let d=0;v(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new pt(u,3)),this.setAttribute("normal",new pt(f,3)),this.setAttribute("uv",new pt(m,2));function v(){const x=new U,R=new U;let T=0;const A=(t-e)/n;for(let L=0;L<=r;L++){const w=[],M=L/r,I=M*(t-e)+e;for(let W=0;W<=s;W++){const S=W/s,D=S*c+a,N=Math.sin(D),P=Math.cos(D);R.x=I*N,R.y=-M*n+p,R.z=I*P,u.push(R.x,R.y,R.z),x.set(N,A,P).normalize(),f.push(x.x,x.y,x.z),m.push(S,1-M),w.push(g++)}_.push(w)}for(let L=0;L<s;L++)for(let w=0;w<r;w++){const M=_[w][L],I=_[w+1][L],W=_[w+1][L+1],S=_[w][L+1];(e>0||w!==0)&&(h.push(M,I,S),T+=3),(t>0||w!==r-1)&&(h.push(I,W,S),T+=3)}l.addGroup(d,T,0),d+=T}function y(x){const R=g,T=new ze,A=new U;let L=0;const w=x===!0?e:t,M=x===!0?1:-1;for(let W=1;W<=s;W++)u.push(0,p*M,0),f.push(0,M,0),m.push(.5,.5),g++;const I=g;for(let W=0;W<=s;W++){const D=W/s*c+a,N=Math.cos(D),P=Math.sin(D);A.x=w*P,A.y=p*M,A.z=w*N,u.push(A.x,A.y,A.z),f.push(0,M,0),T.x=N*.5+.5,T.y=P*.5*M+.5,m.push(T.x,T.y),g++}for(let W=0;W<s;W++){const S=R+W,D=I+W;x===!0?h.push(D,D+1,S):h.push(D+1,D,S),L+=3}l.addGroup(d,L,x===!0?1:2),d+=L}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new an(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class mi extends an{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new mi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Qr extends xt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new pt(r,3)),this.setAttribute("normal",new pt(r.slice(),3)),this.setAttribute("uv",new pt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const y=new U,x=new U,R=new U;for(let T=0;T<t.length;T+=3)m(t[T+0],y),m(t[T+1],x),m(t[T+2],R),c(y,x,R,v)}function c(v,y,x,R){const T=R+1,A=[];for(let L=0;L<=T;L++){A[L]=[];const w=v.clone().lerp(x,L/T),M=y.clone().lerp(x,L/T),I=T-L;for(let W=0;W<=I;W++)W===0&&L===T?A[L][W]=w:A[L][W]=w.clone().lerp(M,W/I)}for(let L=0;L<T;L++)for(let w=0;w<2*(T-L)-1;w++){const M=Math.floor(w/2);w%2===0?(f(A[L][M+1]),f(A[L+1][M]),f(A[L][M])):(f(A[L][M+1]),f(A[L+1][M+1]),f(A[L+1][M]))}}function l(v){const y=new U;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(v),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function h(){const v=new U;for(let y=0;y<r.length;y+=3){v.x=r[y+0],v.y=r[y+1],v.z=r[y+2];const x=p(v)/2/Math.PI+.5,R=d(v)/Math.PI+.5;o.push(x,1-R)}g(),u()}function u(){for(let v=0;v<o.length;v+=6){const y=o[v+0],x=o[v+2],R=o[v+4],T=Math.max(y,x,R),A=Math.min(y,x,R);T>.9&&A<.1&&(y<.2&&(o[v+0]+=1),x<.2&&(o[v+2]+=1),R<.2&&(o[v+4]+=1))}}function f(v){r.push(v.x,v.y,v.z)}function m(v,y){const x=v*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function g(){const v=new U,y=new U,x=new U,R=new U,T=new ze,A=new ze,L=new ze;for(let w=0,M=0;w<r.length;w+=9,M+=6){v.set(r[w+0],r[w+1],r[w+2]),y.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),T.set(o[M+0],o[M+1]),A.set(o[M+2],o[M+3]),L.set(o[M+4],o[M+5]),R.copy(v).add(y).add(x).divideScalar(3);const I=p(R);_(T,M+0,v,I),_(A,M+2,y,I),_(L,M+4,x,I)}}function _(v,y,x,R){R<0&&v.x===1&&(o[y]=v.x-1),x.x===0&&x.z===0&&(o[y]=R/2/Math.PI+.5)}function p(v){return Math.atan2(v.z,-v.x)}function d(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.vertices,e.indices,e.radius,e.details)}}class js extends Qr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new js(e.radius,e.detail)}}class xi extends Qr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new xi(e.radius,e.detail)}}class zs extends xt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const f=(t-e)/s,m=new U,g=new ze;for(let _=0;_<=s;_++){for(let p=0;p<=n;p++){const d=r+p/n*o;m.x=u*Math.cos(d),m.y=u*Math.sin(d),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let _=0;_<s;_++){const p=_*(n+1);for(let d=0;d<n;d++){const v=d+p,y=v,x=v+n+1,R=v+n+2,T=v+1;a.push(y,x,T),a.push(x,R,T)}}this.setIndex(a),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new zs(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class mn extends xt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new U,f=new U,m=[],g=[],_=[],p=[];for(let d=0;d<=n;d++){const v=[],y=d/n;let x=0;d===0&&o===0?x=.5/t:d===n&&c===Math.PI&&(x=-.5/t);for(let R=0;R<=t;R++){const T=R/t;u.x=-e*Math.cos(s+T*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(s+T*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),p.push(T+x,1-y),v.push(l++)}h.push(v)}for(let d=0;d<n;d++)for(let v=0;v<t;v++){const y=h[d][v+1],x=h[d][v],R=h[d+1][v],T=h[d+1][v+1];(d!==0||o>0)&&m.push(y,x,T),(d!==n-1||c<Math.PI)&&m.push(x,R,T)}this.setIndex(m),this.setAttribute("position",new pt(g,3)),this.setAttribute("normal",new pt(_,3)),this.setAttribute("uv",new pt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new mn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mi extends xt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new U,u=new U,f=new U;for(let m=0;m<=n;m++)for(let g=0;g<=s;g++){const _=g/s*r,p=m/n*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(_),u.y=(e+t*Math.cos(p))*Math.sin(_),u.z=t*Math.sin(p),a.push(u.x,u.y,u.z),h.x=e*Math.cos(_),h.y=e*Math.sin(_),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=s;g++){const _=(s+1)*m+g-1,p=(s+1)*(m-1)+g-1,d=(s+1)*(m-1)+g,v=(s+1)*m+g;o.push(_,p,v),o.push(p,d,v)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Gt extends bi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=wu,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Zt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class eo extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ny extends eo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const qo=new ut,ih=new U,sh=new U;class Xu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dc,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ih.setFromMatrixPosition(e.matrixWorld),t.position.copy(ih),sh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sh),t.updateMatrixWorld(),qo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(qo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(qo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const rh=new ut,Es=new U,$o=new U;class iy extends Xu{constructor(){super(new Ht(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new U(1,0,0),new U(-1,0,0),new U(0,0,1),new U(0,0,-1),new U(0,1,0),new U(0,-1,0)],this._cubeUps=[new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,1,0),new U(0,0,1),new U(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Es.setFromMatrixPosition(e.matrixWorld),n.position.copy(Es),$o.copy(n.position),$o.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt($o),n.updateMatrixWorld(),s.makeTranslation(-Es.x,-Es.y,-Es.z),rh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rh)}}class Yo extends eo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new iy}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class sy extends Xu{constructor(){super(new Ou(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oh extends eo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new sy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class ry extends eo{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rc);function oy(i,e=1e-4){e=Math.max(e,Number.EPSILON);const t={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let o=0;const a=Object.keys(i.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let v=0,y=a.length;v<y;v++){const x=a[v],R=i.attributes[x];c[x]=new R.constructor(new R.array.constructor(R.count*R.itemSize),R.itemSize,R.normalized);const T=i.morphAttributes[x];T&&(l[x]||(l[x]=[]),T.forEach((A,L)=>{const w=new A.array.constructor(A.count*A.itemSize);l[x][L]=new A.constructor(w,A.itemSize,A.normalized)}))}const m=e*.5,g=Math.log10(1/e),_=Math.pow(10,g),p=m*_;for(let v=0;v<r;v++){const y=n?n.getX(v):v;let x="";for(let R=0,T=a.length;R<T;R++){const A=a[R],L=i.getAttribute(A),w=L.itemSize;for(let M=0;M<w;M++)x+=`${~~(L[u[M]](y)*_+p)},`}if(x in t)h.push(t[x]);else{for(let R=0,T=a.length;R<T;R++){const A=a[R],L=i.getAttribute(A),w=i.morphAttributes[A],M=L.itemSize,I=c[A],W=l[A];for(let S=0;S<M;S++){const D=u[S],N=f[S];if(I[N](o,L[D](y)),w)for(let P=0,z=w.length;P<z;P++)W[P][N](o,w[P][D](y))}}t[x]=o,h.push(o),o++}}const d=i.clone();for(const v in i.attributes){const y=c[v];if(d.setAttribute(v,new y.constructor(y.array.slice(0,o*y.itemSize),y.itemSize,y.normalized)),v in l)for(let x=0;x<l[v].length;x++){const R=l[v][x];d.morphAttributes[v][x]=new R.constructor(R.array.slice(0,o*R.itemSize),R.itemSize,R.normalized)}}return d.setIndex(h),d}function ah(i){let e=(typeof i=="number"?i:ay(i||"rockets-default-seed"))>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function ay(i){let e=0;for(let t=0;t<i.length;t++)e=(e<<5)-e+i.charCodeAt(t),e|=0;return e>>>0}function jo(i,e,t){return Math.max(e,Math.min(t,i))}function cy(){if(typeof document>"u")return null;try{const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(!e)return null;const t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255, 255, 255, 1)"),t.addColorStop(.25,"rgba(235, 245, 255, 0.85)"),t.addColorStop(.55,"rgba(160, 205, 255, 0.35)"),t.addColorStop(.85,"rgba(100, 150, 255, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const n=new Jr(i);return n.generateMipmaps=!0,n}catch{return null}}function ly(){if(typeof document>"u")return null;try{const i=document.createElement("canvas");i.width=256,i.height=256;const e=i.getContext("2d");if(!e)return null;const t=e.createImageData(256,256),n=t.data;for(let r=0;r<256;r++)for(let o=0;o<256;o++){const a=(r*256+o)*4,c=o/256,l=r/256,h=Math.sin(c*32)*Math.cos(l*32)*.35+Math.sin(c*64+l*48)*.25+Math.sin(c*128-l*96)*.15,u=(Math.random()-.5)*.25,f=Math.floor(Math.min(255,Math.max(0,(h+u+.5)*255)));n[a]=f,n[a+1]=f,n[a+2]=f,n[a+3]=255}e.putImageData(t,0,0);const s=new Jr(i);return s.wrapS=Bs,s.wrapT=Bs,s.repeat.set(4,4),s}catch{return null}}class hy{constructor(e,t=42){this.scene=e,this.mapSeed=t,this.asteroids=[],this.asteroidGroup=new Dt,this.debrisList=[],this.init()}init(){this.setupLighting(),this.createStarfield(),this.createAsteroidField()}setupLighting(){const e=new ny(5601177,1713203,1.6);this.scene.add(e);const t=new ry(3820380,1.2);this.scene.add(t);const n=new oh(16774890,3.2);n.position.set(700,450,600),this.scene.add(n);const s=new oh(46335,1.8);s.position.set(-600,-350,-500),this.scene.add(s);const r=new Yo(16772829,3.2,900);r.position.set(0,60,160),this.scene.add(r),this.combatFlashLight=new Yo(16737792,0,120),this.combatFlashLight.position.set(0,0,0),this.scene.add(this.combatFlashLight),this.meteorLight=new Yo(16724736,0,350),this.meteorLight.position.set(0,0,0),this.scene.add(this.meteorLight)}createStarfield(){const t=new xt,n=new Float32Array(350*3),s=new Float32Array(350*3),r=ah("stars-fixed-celestial");for(let l=0;l<350;l++){const h=l*3,u=r(),f=r(),m=u*2*Math.PI,g=Math.acos(2*f-1),_=2900+r()*500;n[h]=_*Math.sin(g)*Math.cos(m),n[h+1]=_*Math.sin(g)*Math.sin(m),n[h+2]=_*Math.cos(g);const p=r();p<.25?(s[h]=.65,s[h+1]=.88,s[h+2]=1):p<.45?(s[h]=1,s[h+1]=.88,s[h+2]=.65):p<.6?(s[h]=.92,s[h+1]=.65,s[h+2]=1):(s[h]=1,s[h+1]=1,s[h+2]=1)}t.setAttribute("position",new mt(n,3)),t.setAttribute("color",new mt(s,3));const o=cy(),a=new hs({size:2.5,map:o||void 0,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,blending:rt,sizeAttenuation:!1,fog:!1}),c=new Ys(t,a);this.scene.add(c)}createAsteroidField(){const e=ah(this.mapSeed),t=120,n=1e3,s=ly(),r=new Gt({color:10180674,roughness:.88,metalness:.16,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:jt}),o=new Gt({color:3685958,roughness:.92,metalness:.1,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:jt}),a=new Gt({color:6187125,roughness:.86,metalness:.14,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:jt}),c=new Gt({color:8293530,roughness:.8,metalness:.26,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:jt}),l=[r,o,a,c];for(let h=0;h<t;h++){let u,f;h<20?(u=75+e()*65,f=4):h<65?(u=42+e()*33,f=3):(u=22+e()*20,f=3);let m=oy(new xi(u,f));const g=m.attributes.position,_=new U,p=.82+e()*.4,d=.78+e()*.44,v=.82+e()*.4,y=e()*Math.PI*2,x=e()*Math.PI*2,R=e()*Math.PI*2,T=Math.floor(4+e()*3),A=[];for(let N=0;N<T;N++){const P=e()*Math.PI*2,z=Math.acos(2*e()-1);A.push({dir:new U(Math.sin(z)*Math.cos(P),Math.sin(z)*Math.sin(P),Math.cos(z)),depth:.16+e()*.16,radiusCos:.78+e()*.14})}for(let N=0;N<g.count;N++){_.fromBufferAttribute(g,N);const P=_.clone().normalize(),z=.1*Math.sin(P.x*3.2+y)*Math.cos(P.y*3.2+x)+.08*Math.sin(P.z*3.8+R),B=.05*Math.sin(P.x*6.5-P.z*5.2)*Math.cos(P.y*6.1),O=.025*Math.sin(P.y*12+P.x*10.5)*Math.sin(P.z*11.8),k=z+B+O;let Z=0;for(let Me=0;Me<A.length;Me++){const X=A[Me],te=P.dot(X.dir);if(te>X.radiusCos){const he=(te-X.radiusCos)/(1-X.radiusCos);Z-=X.depth*Math.cos(he*(Math.PI/2))}else if(te>X.radiusCos-.12){const he=(te-(X.radiusCos-.12))/.12;Z+=.35*X.depth*Math.sin(he*Math.PI)}}const le=Math.max(.6,1+k+Z);_.copy(P).multiplyScalar(u*le),_.x*=p,_.y*=d,_.z*=v,g.setXYZ(N,_.x,_.y,_.z)}m.computeVertexNormals();const L=l[Math.floor(e()*l.length)],w=new Se(m,L);let M=0,I=0,W=0;if(h<12)M=(e()-.5)*180,I=(e()-.5)*90,W=60-e()*320;else{let N=!1,P=0;for(;!N&&P<50;){P++,M=(e()-.5)*n*2,I=(e()-.5)*(n*.7),W=(e()-.5)*n*2;const z=Math.hypot(M-0,I-0,W-180),B=Math.hypot(M,I,W);z>u+50&&B<n&&(N=!0)}}w.position.set(M,I,W),w.rotation.set(e()*Math.PI,e()*Math.PI,e()*Math.PI),this.asteroidGroup.add(w);const S=4/3*Math.PI*Math.pow(u,3)*.001,D=new U((e()-.5)*4,(e()-.5)*2.2,(e()-.5)*4);this.asteroids.push({mesh:w,radius:u,mass:S,position:w.position,velocity:D,rotationSpeed:new U((e()-.5)*.08,(e()-.5)*.08,(e()-.5)*.08),boundingSphere:new qs(w.position,u*1.05)})}this.scene.add(this.asteroidGroup)}triggerCombatFlash(e,t=16737792,n=4){this.combatFlashLight&&(this.combatFlashLight.position.copy(e),this.combatFlashLight.color.setHex(t),this.combatFlashLight.intensity=n)}update(e,t,n){for(let o=this.debrisList.length-1;o>=0;o--){const a=this.debrisList[o];if(a.life-=e,a.life<=0){this.scene.remove(a.mesh),this.debrisList.splice(o,1);continue}a.mesh.position.addScaledVector(a.vel,e),a.mesh.rotation.x+=a.rot.x*e,a.mesh.rotation.y+=a.rot.y*e;const c=a.life/a.maxLife;a.mesh.scale.set(c,c,c)}this.combatFlashLight&&this.combatFlashLight.intensity>0&&(this.combatFlashLight.intensity=Math.max(0,this.combatFlashLight.intensity-e*6));const s=1e3,r=this.asteroids.length;for(let o=0;o<r;o++){const a=this.asteroids[o];if(a.position.addScaledVector(a.velocity,e),a.boundingSphere.center.copy(a.position),a.mesh.rotation.x+=a.rotationSpeed.x*e,a.mesh.rotation.y+=a.rotationSpeed.y*e,a.mesh.rotation.z+=a.rotationSpeed.z*e,a.position.length()>s){const l=a.position.clone().normalize().multiplyScalar(-6*e);a.velocity.add(l)}}for(let o=0;o<r;o++){const a=this.asteroids[o],c=a.position;for(let l=o+1;l<r;l++){const h=this.asteroids[l],u=h.position,f=c.x-u.x,m=c.y-u.y,g=c.z-u.z,_=f*f+m*m+g*g,p=a.radius+h.radius;if(_<p*p&&_>1e-4){const d=Math.sqrt(_),v=f/d,y=m/d,x=g/d,R=p-d,T=a.mass+h.mass,A=h.mass/T,L=a.mass/T;c.x+=v*R*A,c.y+=y*R*A,c.z+=x*R*A,u.x-=v*R*L,u.y-=y*R*L,u.z-=x*R*L;const w=a.velocity.x-h.velocity.x,M=a.velocity.y-h.velocity.y,I=a.velocity.z-h.velocity.z,W=w*v+M*y+I*x;if(W<0){const S=-1.65*W/(1/a.mass+1/h.mass);a.velocity.x+=S/a.mass*v,a.velocity.y+=S/a.mass*y,a.velocity.z+=S/a.mass*x,h.velocity.x-=S/h.mass*v,h.velocity.y-=S/h.mass*y,h.velocity.z-=S/h.mass*x}}}}}checkCollision(e,t=2.5){for(let n=0;n<this.asteroids.length;n++){const s=this.asteroids[n],r=e.distanceToSquared(s.position),o=s.radius+t;if(r<o*o)return s}return null}resolveShipCollision(e,t,n=2.8,s=1200){for(let r=0;r<this.asteroids.length;r++){const o=this.asteroids[r],a=e.distanceTo(o.position),c=o.radius+n;if(a<c){const l=e.clone().sub(o.position);l.lengthSq()<1e-4?l.set(0,1,0):l.normalize(),e.copy(o.position).addScaledVector(l,c+.3);const u=t.clone().sub(o.velocity).dot(l);if(u<0){const f=-1.85*u*s;t.addScaledVector(l,f/s),o.velocity.addScaledVector(l,-(f/o.mass));const m=Math.abs(u),g=Math.round(Math.min(45,Math.max(10,m*.75)));return{asteroid:o,normal:l,impactDamage:g,impactSpeed:m}}}}return null}spawnRockDebris(e,t,n=8){const s=new js(.85,0),r=new Gt({color:5923437,roughness:.9,metalness:.1});for(let o=0;o<n;o++){if(this.debrisList.length>60){const u=this.debrisList.shift();this.scene.remove(u.mesh)}const a=new Se(s,r);a.position.copy(e),this.scene.add(a);const c=new U((Math.random()-.5)*35,(Math.random()-.5)*35,(Math.random()-.5)*35),l=t.clone().multiplyScalar(-18).add(c),h=.5+Math.random()*.4;this.debrisList.push({mesh:a,vel:l,rot:new U(Math.random()*8,Math.random()*8,Math.random()*8),life:h,maxLife:h})}}carveAsteroid(e,t,n,s=14,r=11){if(!e||!e.mesh)return;const o=e.mesh.geometry,a=o.attributes.position;if(!a)return;const c=e.mesh.matrixWorld.clone().invert(),l=t.clone().applyMatrix4(c),h=n.clone().transformDirection(c).normalize(),u=new U;let f=0;for(let m=0;m<a.count;m++){u.fromBufferAttribute(a,m);const g=u.distanceTo(l);if(g<s){const _=1-Math.pow(g/s,1.4),p=r*_;u.addScaledVector(h,p),a.setXYZ(m,u.x,u.y,u.z),f++}}f>0&&(a.needsUpdate=!0,o.computeVertexNormals(),o.computeBoundingSphere(),o.boundingSphere&&(e.boundingSphere.radius=Math.max(10,o.boundingSphere.radius))),this.spawnRockDebris(t,n)}}class uy{constructor(e){this.camera=e,this.group=new Dt,this.camera.add(this.group),this.targetOffset=new U,this.currentOffset=new U,this.targetRotation=new Zt,this.currentRotation=new Zt,this.shieldGlassMat=null,this.damageFlashTimer=0,this.boostKickZ=0,this.accentMaterials=[],this.consoleWarningMat=null,this.createCockpitModel()}createCockpitModel(){const e=new Gt({color:1119776,roughness:.35,metalness:.9,flatShading:!0}),t=new Gt({color:1975344,roughness:.45,metalness:.8,flatShading:!0}),n=new Ke({color:54527});this.accentMaterials.push(n);const s=new Ke({color:16755200});this.accentMaterials.push(s),this.consoleWarningMat=new Ke({color:65416});const r=new wt(.5,.14,.35),o=new Se(r,e);o.position.set(0,-.58,-.55),o.rotation.x=.55,this.group.add(o);const a=new wt(.48,.12,.32),c=new Se(a,e);c.position.set(-.52,-.59,-.52),c.rotation.set(.5,.28,-.12),this.group.add(c);const l=new wt(.48,.12,.32),h=new Se(l,e);h.position.set(.52,-.59,-.52),h.rotation.set(.5,-.28,.12),this.group.add(h);const u=new $s(.18,.08),f=new Se(u,new Ke({color:6180}));f.position.set(-.5,-.53,-.47),f.rotation.set(.5,.28,-.12),this.group.add(f);const m=new Se(u,new Ke({color:2102272}));m.position.set(.5,-.53,-.47),m.rotation.set(.5,-.28,.12),this.group.add(m);const g=new an(.003,.003,1.4,6);g.rotateZ(Math.PI/2);const _=new Se(g,n);_.position.set(0,-.54,-.48),_.rotation.x=.5,this.group.add(_);const p=new wt(.024,1.15,.035),d=new Se(p,e);d.position.set(-.92,.16,-.48),d.rotation.set(-.12,.12,.52),this.group.add(d);const v=d.clone();v.position.set(.92,.16,-.48),v.rotation.set(-.12,-.12,-.52),this.group.add(v);const y=new wt(1.6,.03,.14),x=new Se(y,e);x.position.set(0,.72,-.52),x.rotation.x=-.22,this.group.add(x);const R=new mn(.82,16,12,0,Math.PI*2,0,Math.PI*.46);this.shieldGlassMat=new Ke({color:57855,transparent:!0,opacity:.025,side:Rt,blending:rt,depthWrite:!1});const T=new Se(R,this.shieldGlassMat);T.position.set(0,0,.08),this.group.add(T),this.createCompactCannon(-.72,-.44,-.65,e,t,n),this.createCompactCannon(.72,-.44,-.65,e,t,n)}createCompactCannon(e,t,n,s,r,o){const a=new Dt;a.position.set(e,t,n);const c=new an(.018,.022,.55,8);c.rotateX(Math.PI/2);const l=new Se(c,r);l.position.set(0,0,-.22),a.add(l);const h=new Mi(.024,.004,6,12),u=new Se(h,o);u.position.set(0,0,-.48),a.add(u),this.group.add(a)}triggerDamageFlash(){this.damageFlashTimer=.38}triggerBoostFlash(){this.boostKickZ=-.06,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(65535),this.shieldGlassMat.opacity=.2)}update(e,t,n){this.boostKickZ||(this.boostKickZ=0),this.boostKickZ+=(0-this.boostKickZ)*e*9;const s=(t.thrust?.016:t.brake?-.016:0)+this.boostKickZ,r=t.strafe*.02,o=t.pitch*.012,a=t.roll*.018;this.targetOffset.set(-r,-o,s),this.targetRotation.set(-o*1.4,-r*1.1,-a),this.currentOffset.lerp(this.targetOffset,e*10),this.currentRotation.x+=(this.targetRotation.x-this.currentRotation.x)*e*10,this.currentRotation.y+=(this.targetRotation.y-this.currentRotation.y)*e*10,this.currentRotation.z+=(this.targetRotation.z-this.currentRotation.z)*e*10,this.group.position.copy(this.currentOffset),this.group.rotation.copy(this.currentRotation),this.damageFlashTimer>0?(this.damageFlashTimer-=e,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(16720452),this.shieldGlassMat.opacity=Math.max(.03,this.damageFlashTimer*.9))):this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(57855),this.shieldGlassMat.opacity=.025)}}class dy{constructor(e,t){this.camera=e,this.spaceEnv=t,this.position=new U(0,0,100),this.velocity=new U(0,0,0),this.quaternion=new pn,this.maxSpeed=90,this.forwardAccel=45,this.decelRate=this.maxSpeed/2*3,this.strafeAccel=40,this.maxStrafeSpeed=35,this.boostCooldown=2,this.boostCooldownTimer=0,this.lastThrustTapTime=0,this.boostImpulse=180,this.pitchSpeed=1.6,this.yawSpeed=1.6,this.rollSpeed=2,this.maxHp=100,this.hp=100,this.maxShield=100,this.shield=100,this.isShieldBroken=!1,this.shieldRechargeDelay=2,this.shieldRechargeTimer=0,this.shieldRechargeRate=100/15,this.mass=1200,this.isInvisible=!1,this.invisibilityTimer=0,this.hasHologramDecoy=!1,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.score=0,this.kills=0,this.deaths=0,this.input={thrust:!1,brake:!1,strafeLeft:!1,strafeRight:!1,pitchUp:!1,pitchDown:!1,yawLeft:!1,yawRight:!1,rollLeft:!1,rollRight:!1,analogPitch:0,analogYaw:0,analogRoll:0},this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}resetSpawn(){this.position.set(0,0,180),this.velocity.set(0,0,0),this.quaternion.set(0,0,0,1),this.hp=this.maxHp,this.shield=this.maxShield,this.isShieldBroken=!1,this.shieldRechargeTimer=0,this.boostCooldownTimer=0,this.lastThrustTapTime=0,this.isInvisible=!1,this.invisibilityTimer=0,this.hasHologramDecoy=!1,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}takeDamage(e,t="generic",n=!1){if(typeof t=="boolean"&&(n=t,t="generic"),this.isDead||!n&&this.invulnerableTimer>0)return!1;this.shieldRechargeTimer=this.shieldRechargeDelay;let s=e,r=e;if(t==="laser"?(s=e*2.4,r=e*.35):t==="cannon"&&(s=e*.35,r=e*2.2),this.shield>0){const o=Math.min(this.shield,s);this.shield-=o,this.shield<=0&&(this.shield=0,this.isShieldBroken=!0);const a=1-o/(s||1);a>.01&&(this.hp=Math.max(0,this.hp-r*a))}else this.hp=Math.max(0,this.hp-r);return this.hp<=0?(this.isDead=!0,this.deaths++,this.respawnTimer=3,!0):!1}recordKill(){this.kills++,this.score+=100}triggerThrustPress(e=performance.now()){const t=e-this.lastThrustTapTime;return this.lastThrustTapTime=e,t>=40&&t<=380&&this.boostCooldownTimer<=0&&!this.isDead?this.activateBoost():!1}breakInvisibility(){this.isInvisible=!1,this.invisibilityTimer=0}activateBoost(){this.boostCooldownTimer=this.boostCooldown;const e=this.getForwardVector();this.velocity.addScaledVector(e,this.boostImpulse);const t=this.maxSpeed*3;return this.velocity.length()>t&&this.velocity.setLength(t),!0}applyImpulse(e){this.velocity.add(e),this.velocity.length()>this.maxSpeed*1.35&&this.velocity.setLength(this.maxSpeed*1.35)}update(e){if(this.invulnerableTimer>0&&(this.invulnerableTimer=Math.max(0,this.invulnerableTimer-e)),this.boostCooldownTimer>0&&(this.boostCooldownTimer=Math.max(0,this.boostCooldownTimer-e)),this.invisibilityTimer>0&&(this.invisibilityTimer=Math.max(0,this.invisibilityTimer-e),this.invisibilityTimer<=0&&(this.isInvisible=!1)),this.isDead){this.respawnTimer-=e,this.respawnTimer<=0&&this.resetSpawn();return}!this.isShieldBroken&&this.shield<this.maxShield&&(this.shieldRechargeTimer>0?this.shieldRechargeTimer-=e:this.shield=Math.min(this.maxShield,this.shield+this.shieldRechargeRate*e)),(isNaN(this.position.x)||isNaN(this.position.y)||isNaN(this.position.z))&&(this.position.set(0,0,180),this.velocity.set(0,0,0)),(isNaN(this.velocity.x)||isNaN(this.velocity.y)||isNaN(this.velocity.z))&&this.velocity.set(0,0,0),(isNaN(this.quaternion.x)||isNaN(this.quaternion.w))&&this.quaternion.set(0,0,0,1),this.handleRotation(e),this.handleThrustAndMovement(e),this.handleAsteroidCollisions(),this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}handleRotation(e){let t=0;this.input.pitchUp&&(t+=1),this.input.pitchDown&&(t-=1),t+=this.input.analogPitch,t=jo(t,-1,1);let n=0;this.input.yawLeft&&(n+=1),this.input.yawRight&&(n-=1),n+=this.input.analogYaw,n=jo(n,-1,1);let s=0;this.input.rollLeft&&(s+=1),this.input.rollRight&&(s-=1),s+=this.input.analogRoll,s=jo(s,-1,1);const r=new U(1,0,0),o=new U(0,1,0),a=new U(0,0,1);if(t!==0){const c=new pn().setFromAxisAngle(r,t*this.pitchSpeed*e);this.quaternion.multiply(c)}if(n!==0){const c=new pn().setFromAxisAngle(o,n*this.yawSpeed*e);this.quaternion.multiply(c)}if(s!==0){const c=new pn().setFromAxisAngle(a,s*this.rollSpeed*e);this.quaternion.multiply(c)}this.quaternion.normalize()}handleThrustAndMovement(e){const t=new U(0,0,-1).applyQuaternion(this.quaternion).normalize(),n=new U(1,0,0).applyQuaternion(this.quaternion).normalize();if(this.input.thrust&&(this.velocity.addScaledVector(t,this.forwardAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.input.brake){const o=this.velocity.length();if(o>.001){const a=this.decelRate*e,c=Math.max(0,o-a);c===0?this.velocity.set(0,0,0):this.velocity.setLength(c)}else this.velocity.set(0,0,0)}let s=0;if(this.input.strafeLeft&&(s-=1),this.input.strafeRight&&(s+=1),s!==0&&(this.velocity.addScaledVector(n,s*this.strafeAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.position.addScaledVector(this.velocity,e),this.position.length()>1100){const o=this.position.clone().normalize().multiplyScalar(-30*e);this.velocity.add(o)}}handleAsteroidCollisions(){if(this.spaceEnv&&typeof this.spaceEnv.resolveShipCollision=="function"){const t=this.spaceEnv.resolveShipCollision(this.position,this.velocity,2.8,this.mass);if(t)return this.takeDamage(t.impactDamage),t}else if(this.spaceEnv&&typeof this.spaceEnv.checkCollision=="function"){const t=this.spaceEnv.checkCollision(this.position,2.8);if(t){const n=this.position.clone().sub(t.position);n.lengthSq()<.001?n.set(0,1,0):n.normalize(),this.position.copy(t.position).addScaledVector(n,t.radius+2.8+.4);const s=this.velocity.dot(n);s<0&&this.velocity.subScaledVector(n,1.8*s),this.takeDamage(15)}}}getForwardVector(){return new U(0,0,-1).applyQuaternion(this.quaternion).normalize()}getRightVector(){return new U(1,0,0).applyQuaternion(this.quaternion).normalize()}getSpeed(){return this.velocity.length()}}class fy{constructor(){this.ctx=null,this.masterGain=null,this.compressor=null,this.isMuted=!1,this.isUnlocked=!1,this.engineGain=null,this.engineFilter=null,this.engineOsc1=null,this.engineOsc2=null,this.engineNoiseNode=null,this.currentEngineVol=0,this.brakeGain=null,this.brakeFilter=null,this.brakeNoiseNode=null,this.currentBrakeVol=0,this.noiseBuffer=null,this.init()}init(){if(typeof window>"u")return;const e=window.AudioContext||window.webkitAudioContext;if(e)try{this.ctx=new e,this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.threshold.setValueAtTime(-12,this.ctx.currentTime),this.compressor.knee.setValueAtTime(8,this.ctx.currentTime),this.compressor.ratio.setValueAtTime(4,this.ctx.currentTime),this.compressor.attack.setValueAtTime(.005,this.ctx.currentTime),this.compressor.release.setValueAtTime(.08,this.ctx.currentTime),this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(.85,this.ctx.currentTime),this.compressor.connect(this.masterGain),this.masterGain.connect(this.ctx.destination),this.generateNoiseBuffer(),this.initEngineSynth(),this.initBrakeSynth(),this.setupAutoUnlock()}catch(t){console.warn("AudioContext initialization failed:",t)}}setupAutoUnlock(){if(!this.ctx)return;const e=()=>{this.ctx&&this.ctx.state==="suspended"?this.ctx.resume().then(()=>{this.isUnlocked=!0}).catch(()=>{}):this.isUnlocked=!0,window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e),window.removeEventListener("touchstart",e)};window.addEventListener("pointerdown",e,{passive:!0,once:!0}),window.addEventListener("keydown",e,{passive:!0,once:!0}),window.addEventListener("touchstart",e,{passive:!0,once:!0})}updateListener(e){if(!(!this.ctx||!this.ctx.listener||!e))try{const t=this.ctx.listener,n=this.ctx.currentTime,s=e.position,r=new U(0,0,-1).applyQuaternion(e.quaternion),o=new U(0,1,0).applyQuaternion(e.quaternion);t.positionX?(t.positionX.setValueAtTime(s.x,n),t.positionY.setValueAtTime(s.y,n),t.positionZ.setValueAtTime(s.z,n),t.forwardX.setValueAtTime(r.x,n),t.forwardY.setValueAtTime(r.y,n),t.forwardZ.setValueAtTime(r.z,n),t.upX.setValueAtTime(o.x,n),t.upY.setValueAtTime(o.y,n),t.upZ.setValueAtTime(o.z,n)):t.setPosition&&(t.setPosition(s.x,s.y,s.z),t.setOrientation(r.x,r.y,r.z,o.x,o.y,o.z))}catch{}}createPanner(e){if(!this.ctx||!e)return null;try{const t=this.ctx.createPanner();t.panningModel="HRTF",t.distanceModel="inverse",t.refDistance=35,t.maxDistance=2500,t.rolloffFactor=1.15,t.coneInnerAngle=360;const n=this.ctx.currentTime;return t.positionX?(t.positionX.setValueAtTime(e.x,n),t.positionY.setValueAtTime(e.y,n),t.positionZ.setValueAtTime(e.z,n)):t.setPosition&&t.setPosition(e.x,e.y,e.z),t.connect(this.compressor),t}catch{return null}}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}generateNoiseBuffer(){if(!this.ctx)return;const e=this.ctx.sampleRate*2;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const t=this.noiseBuffer.getChannelData(0);for(let n=0;n<e;n++)t[n]=Math.random()*2-1}initEngineSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.engineOsc1=this.ctx.createOscillator(),this.engineOsc1.type="sawtooth",this.engineOsc1.frequency.setValueAtTime(55,this.ctx.currentTime),this.engineOsc2=this.ctx.createOscillator(),this.engineOsc2.type="triangle",this.engineOsc2.frequency.setValueAtTime(110,this.ctx.currentTime),this.engineNoiseNode=this.ctx.createBufferSource(),this.engineNoiseNode.buffer=this.noiseBuffer,this.engineNoiseNode.loop=!0,this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.setValueAtTime(120,this.ctx.currentTime),this.engineFilter.Q.setValueAtTime(3,this.ctx.currentTime),this.engineGain=this.ctx.createGain(),this.engineGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.engineOsc1.connect(this.engineFilter),this.engineOsc2.connect(this.engineFilter),this.engineNoiseNode.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineGain.connect(this.compressor);try{this.engineOsc1.start(),this.engineOsc2.start(),this.engineNoiseNode.start()}catch{}}}initBrakeSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.brakeNoiseNode=this.ctx.createBufferSource(),this.brakeNoiseNode.buffer=this.noiseBuffer,this.brakeNoiseNode.loop=!0,this.brakeFilter=this.ctx.createBiquadFilter(),this.brakeFilter.type="bandpass",this.brakeFilter.frequency.setValueAtTime(1400,this.ctx.currentTime),this.brakeFilter.Q.setValueAtTime(2.5,this.ctx.currentTime),this.brakeGain=this.ctx.createGain(),this.brakeGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.brakeNoiseNode.connect(this.brakeFilter),this.brakeFilter.connect(this.brakeGain),this.brakeGain.connect(this.compressor);try{this.brakeNoiseNode.start()}catch{}}}updateEngine(e,t,n){if(!this.ctx||!this.engineGain||!this.brakeGain)return;this.resume();const s=e?.38:0,r=e?460:120;this.currentEngineVol+=(s-this.currentEngineVol)*Math.min(1,n*10);const o=this.ctx.currentTime;this.engineGain.gain.setTargetAtTime(Math.max(1e-4,this.currentEngineVol),o,.05),this.engineFilter.frequency.setTargetAtTime(r,o,.08);const a=t?.32:0;this.currentBrakeVol+=(a-this.currentBrakeVol)*Math.min(1,n*12),this.brakeGain.gain.setTargetAtTime(Math.max(1e-4,this.currentBrakeVol),o,.04)}playLaserShot(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type="sawtooth",r.frequency.setValueAtTime(e?1650:1200,n),r.frequency.exponentialRampToValueAtTime(140,n+.18),a.type="bandpass",a.frequency.setValueAtTime(3200,n),a.frequency.exponentialRampToValueAtTime(450,n+.18),a.Q.setValueAtTime(4,n);const c=e?.42:.26;o.gain.setValueAtTime(c,n),o.gain.exponentialRampToValueAtTime(.001,n+.19),r.connect(a),a.connect(o),o.connect(s),r.start(n),r.stop(n+.2)}playDecoyDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(440,e),t.frequency.linearRampToValueAtTime(1100,e+.15),t.frequency.linearRampToValueAtTime(880,e+.35),n.gain.setValueAtTime(.28,e),n.gain.exponentialRampToValueAtTime(.001,e+.4),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.42)}playCannonShot(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type=e?"sawtooth":"sine";const c=e?920:680,l=e?110:90;r.frequency.setValueAtTime(c,n),r.frequency.exponentialRampToValueAtTime(l,n+.08),a.type="lowpass",a.frequency.setValueAtTime(2800,n),a.frequency.exponentialRampToValueAtTime(400,n+.09);const h=e?.36:.22;o.gain.setValueAtTime(h,n),o.gain.exponentialRampToValueAtTime(.001,n+.095),r.connect(a),a.connect(o),o.connect(s),r.start(n),r.stop(n+.1)}playMineDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(60,e+.12),n.gain.setValueAtTime(.35,e),n.gain.exponentialRampToValueAtTime(.001,e+.13),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.14);const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(1250,e+.06),s.frequency.setValueAtTime(1750,e+.14),r.gain.setValueAtTime(1e-4,e),r.gain.setValueAtTime(.22,e+.06),r.gain.setValueAtTime(.25,e+.14),r.gain.exponentialRampToValueAtTime(.001,e+.28),s.connect(r),r.connect(this.compressor),s.start(e+.05),s.stop(e+.3)}playExplosion(e=1,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(140,n),r.frequency.exponentialRampToValueAtTime(28,n+.7*e);const a=Math.min(.7,.45*e);if(o.gain.setValueAtTime(a,n),o.gain.exponentialRampToValueAtTime(.001,n+.75*e),r.connect(o),o.connect(s),r.start(n),r.stop(n+.8*e),this.noiseBuffer){const c=this.ctx.createBufferSource();c.buffer=this.noiseBuffer;const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(900,n),l.frequency.exponentialRampToValueAtTime(80,n+.6*e);const h=this.ctx.createGain();h.gain.setValueAtTime(.5*e,n),h.gain.exponentialRampToValueAtTime(.001,n+.65*e),c.connect(l),l.connect(h),h.connect(s),c.start(n),c.stop(n+.7*e)}}playDamageHit(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(70,e+.16),n.gain.setValueAtTime(.42,e),n.gain.exponentialRampToValueAtTime(.001,e+.18),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.2)}playScoreChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(880,e),t.frequency.setValueAtTime(1320,e+.08),n.gain.setValueAtTime(.25,e),n.gain.exponentialRampToValueAtTime(.001,e+.35),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.36)}playStrafeBurst(){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1600,e),n.Q.setValueAtTime(2,e);const s=this.ctx.createGain();s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(n),n.connect(s),s.connect(this.compressor),t.start(e),t.stop(e+.13)}playEngagementBeacon(e=null){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,n=this.createPanner(e)||this.compressor,s=this.ctx.createOscillator(),r=this.ctx.createGain(),o=this.ctx.createBiquadFilter();s.type="sine",s.frequency.setValueAtTime(1480,t),s.frequency.exponentialRampToValueAtTime(520,t+.45),o.type="bandpass",o.frequency.setValueAtTime(1200,t),o.Q.setValueAtTime(4,t),r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(.38,t+.04),r.gain.exponentialRampToValueAtTime(.001,t+.95),s.connect(o),o.connect(r),r.connect(n),s.start(t),s.stop(t+1)}playMeteorFlyby(e=null){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const t=this.ctx.currentTime,n=this.createPanner(e)||this.compressor,s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(180,t),r.frequency.exponentialRampToValueAtTime(680,t+.35),r.frequency.exponentialRampToValueAtTime(120,t+1.1),r.Q.setValueAtTime(1.8,t);const o=this.ctx.createGain();o.gain.setValueAtTime(.001,t),o.gain.linearRampToValueAtTime(.55,t+.35),o.gain.exponentialRampToValueAtTime(.001,t+1.15),s.connect(r),r.connect(o),o.connect(n),s.start(t),s.stop(t+1.2)}playBoost(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();if(t.type="sine",t.frequency.setValueAtTime(220,e),t.frequency.exponentialRampToValueAtTime(45,e+.28),n.gain.setValueAtTime(.55,e),n.gain.exponentialRampToValueAtTime(.001,e+.3),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.32),this.noiseBuffer){const s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(320,e),r.frequency.exponentialRampToValueAtTime(1400,e+.12),r.frequency.exponentialRampToValueAtTime(250,e+.35),r.Q.setValueAtTime(2.2,e);const o=this.ctx.createGain();o.gain.setValueAtTime(.48,e),o.gain.exponentialRampToValueAtTime(.001,e+.36),s.connect(r),r.connect(o),o.connect(this.compressor),s.start(e),s.stop(e+.38)}}}const dt=new fy;class py{constructor(){this.logs=[],this.maxLogs=500,this.engineRef=null,this.startTime=Date.now(),this.webglInfo=null,this.lastFps=0,this.frameCount=0,this.fpsTimer=performance.now(),this.interceptConsole(),this.listenToErrors()}setEngine(e){if(this.engineRef=e,e&&e.renderer)try{const t=e.renderer.getContext(),n=t.getExtension("WEBGL_debug_renderer_info");this.webglInfo={renderer:n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER),vendor:n?t.getParameter(n.UNMASKED_VENDOR_WEBGL):t.getParameter(t.VENDOR),version:t.getParameter(t.VERSION),shadingLanguageVersion:t.getParameter(t.SHADING_LANGUAGE_VERSION),maxTextureSize:t.getParameter(t.MAX_TEXTURE_SIZE)},this.log("SYS",`WebGL Initialized: ${this.webglInfo.renderer}`)}catch(t){this.log("SYS",`WebGL info inspection error: ${t.message}`)}}interceptConsole(){const e=console.log.bind(console),t=console.warn.bind(console),n=console.error.bind(console);console.log=(...s)=>{this.log("LOG",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),e(...s)},console.warn=(...s)=>{this.log("WARN",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),t(...s)},console.error=(...s)=>{this.log("ERROR",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),n(...s)}}listenToErrors(){window.addEventListener("error",e=>{this.log("UNCAUGHT",`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`)}),window.addEventListener("unhandledrejection",e=>{var t;this.log("REJECTION",`${((t=e.reason)==null?void 0:t.message)||e.reason}`)})}log(e,t){const s=`[${((Date.now()-this.startTime)/1e3).toFixed(2)}s][${e}] ${t}`;this.logs.push(s),this.logs.length>this.maxLogs&&this.logs.shift()}recordFrame(){this.frameCount++;const e=performance.now();e-this.fpsTimer>=1e3&&(this.lastFps=Math.round(this.frameCount*1e3/(e-this.fpsTimer)),this.frameCount=0,this.fpsTimer=e)}generateDiagnosticReport(){var n,s,r,o,a,c,l,h,u,f,m,g;const e=[];if(e.push("================ ROCKETS CLIENT DIAGNOSTICS ================"),e.push(`Timestamp: ${new Date().toISOString()}`),e.push(`User Agent: ${navigator.userAgent}`),e.push(`Screen Resolution: ${window.screen.width}x${window.screen.height} (Pixel Ratio: ${window.devicePixelRatio})`),e.push(`Window Inner Size: ${window.innerWidth}x${window.innerHeight}`),e.push(`Orientation: ${((n=screen.orientation)==null?void 0:n.type)||"unknown"}`),e.push(`Touch Supported: ${"ontouchstart"in window||navigator.maxTouchPoints>0} (Max Points: ${navigator.maxTouchPoints})`),e.push(""),e.push("--- WebGL Environment ---"),this.webglInfo?(e.push(`Renderer: ${this.webglInfo.renderer}`),e.push(`Vendor: ${this.webglInfo.vendor}`),e.push(`WebGL Version: ${this.webglInfo.version}`),e.push(`Max Texture Size: ${this.webglInfo.maxTextureSize}`)):e.push("WebGL Info: Not yet captured or WebGL unavailable"),e.push(""),e.push("--- Engine & Simulation State ---"),this.engineRef){const _=this.engineRef;if(e.push(`Is Engine Running: ${_.isRunning}`),e.push(`Render FPS: ${this.lastFps}`),e.push(`Canvas Size: ${(r=(s=_.renderer)==null?void 0:s.domElement)==null?void 0:r.width}x${(a=(o=_.renderer)==null?void 0:o.domElement)==null?void 0:a.height}`),e.push(`Canvas Container Size: ${(c=_.container)==null?void 0:c.clientWidth}x${(l=_.container)==null?void 0:l.clientHeight}`),e.push(`Scene Children Count: ${((u=(h=_.scene)==null?void 0:h.children)==null?void 0:u.length)||0}`),e.push(`Asteroids Spawned: ${((m=(f=_.spaceEnv)==null?void 0:f.asteroids)==null?void 0:m.length)||0}`),_.playerShip){const p=_.playerShip;e.push(`Ship Position: (${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)}, ${p.position.z.toFixed(2)})`),e.push(`Ship Velocity: (${p.velocity.x.toFixed(2)}, ${p.velocity.y.toFixed(2)}, ${p.velocity.z.toFixed(2)}) [Speed: ${p.getSpeed().toFixed(1)}]`),e.push(`Ship Quaternion: (${p.quaternion.x.toFixed(3)}, ${p.quaternion.y.toFixed(3)}, ${p.quaternion.z.toFixed(3)}, ${p.quaternion.w.toFixed(3)})`),e.push(`Ship HP: ${p.hp}/${p.maxHp} (isDead: ${p.isDead}, invuln: ${p.invulnerableTimer.toFixed(1)})`),e.push(`Active Inputs: thrust=${p.input.thrust}, brake=${p.input.brake}, strafeL=${p.input.strafeLeft}, strafeR=${p.input.strafeRight}, analogPitch=${p.input.analogPitch.toFixed(2)}, analogYaw=${p.input.analogYaw.toFixed(2)}`)}_.network&&(e.push(`Network Self ID: ${_.network.selfId}`),e.push(`Network Room ID: ${_.network.roomId}`),e.push(`Network isMaster: ${_.network.isMaster}`),e.push(`Connected Peers: ${((g=_.network.peers)==null?void 0:g.size)||0}`))}else e.push("Engine Reference: None (Engine not attached)");e.push(""),e.push("--- Recent Event Stream (Last 50 Logs) ---");const t=this.logs.slice(-50);for(const _ of t)e.push(_);return e.push("============================================================"),e.join(`
`)}async copyToClipboard(){const e=this.generateDiagnosticReport();if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(e),!0}catch{}return window.prompt("Copy diagnostic report below (Ctrl+C / Cmd+C):",e),!0}}const ct=new py;class my{constructor(e){this.scene=e,this.maxParticles=800,this.particles=[],this.geom=new xt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new mt(this.positions,3)),this.geom.setAttribute("color",new mt(this.colors,3)),this.material=new hs({size:4.8,vertexColors:!0,transparent:!0,opacity:.95,blending:rt,depthWrite:!1,sizeAttenuation:!0}),this.points=new Ys(this.geom,this.material),this.scene.add(this.points)}emit(e,t,n=2){for(let s=0;s<n&&!(this.particles.length>=this.maxParticles);s++){const r=new U((Math.random()-.5)*.45,(Math.random()-.5)*.45,(Math.random()-.5)*.45),o=e.clone().add(r),a=t.clone().multiplyScalar(-18).add(new U((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8)),c=.28+Math.random()*.18;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}update(e){for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.life-=e,s.life<=0){this.particles.splice(n,1);continue}s.pos.addScaledVector(s.vel,e)}const t=this.particles.length;for(let n=0;n<t;n++){const s=this.particles[n],r=n*3;this.positions[r]=s.pos.x,this.positions[r+1]=s.pos.y,this.positions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.25)this.colors[r]=1,this.colors[r+1]=.98,this.colors[r+2]=.7;else if(o<.65)this.colors[r]=1,this.colors[r+1]=.55*(1-(o-.25)/.4),this.colors[r+2]=.05;else{const a=(1-o)/.35;this.colors[r]=.85*a,this.colors[r+1]=.15*a,this.colors[r+2]=.02*a}}for(let n=t;n<this.maxParticles;n++){const s=n*3;this.positions[s]=99999,this.positions[s+1]=99999,this.positions[s+2]=99999,this.colors[s]=0,this.colors[s+1]=0,this.colors[s+2]=0}this.geom.attributes.position.needsUpdate=!0,this.geom.attributes.color.needsUpdate=!0}cleanup(){this.points&&this.points.parent&&this.points.parent.remove(this.points),this.geom.dispose(),this.material.dispose()}}class gy{constructor(e,t,n){this.scene=e,this.spaceEnv=t,this.network=n,this.laserMaxEnergy=100,this.laserEnergy=100,this.laserShotCost=28,this.laserCooldownDelay=.85,this.laserCooldownTimer=0,this.laserRechargeRate=28,this.laserFireInterval=.4,this.laserLastFireTime=0,this.laserDamage=22,this.laserSpeed=480,this.cannonMaxEnergy=100,this.cannonEnergy=100,this.cannonShotCost=2.5,this.cannonCooldownDelay=.8,this.cannonCooldownTimer=0,this.cannonRechargeRate=35,this.cannonFireInterval=.1,this.cannonLastFireTime=0,this.cannonDamage=6,this.cannonSpeed=185,this.mineMaxCharges=2,this.mineCharges=2,this.mineRechargeTime=6,this.mineRechargeProgress=0,this.mineFuseTime=3,this.lasers=[],this.projectiles=[],this.mines=[],this.explosions=[],this.decoys=[],this.fireTrails=new my(this.scene),this.initGeometriesAndMaterials(),this.listenToNetworkEvents()}initGeometriesAndMaterials(){this.laserGeom=new an(.24,.24,9,8),this.laserGeom.rotateX(Math.PI/2),this.localLaserMat=new Ke({color:65535,transparent:!0,opacity:.95,blending:rt}),this.remoteLaserMat=new Ke({color:16711782,transparent:!0,opacity:.95,blending:rt}),this.laserGlowGeom=new an(.55,.55,9.4,8),this.laserGlowGeom.rotateX(Math.PI/2),this.localLaserGlowMat=new Ke({color:35071,transparent:!0,opacity:.45,blending:rt}),this.remoteLaserGlowMat=new Ke({color:16724736,transparent:!0,opacity:.45,blending:rt}),this.slugBodyGeom=new an(.24,.32,2,8),this.slugBodyGeom.rotateX(Math.PI/2),this.slugNoseGeom=new mi(.24,.9,8),this.slugNoseGeom.rotateX(-Math.PI/2),this.slugTailGeom=new an(.18,.28,.45,8),this.slugTailGeom.rotateX(Math.PI/2),this.slugBodyMat=new Gt({color:2371133,roughness:.35,metalness:.85,flatShading:!0}),this.localSlugNoseMat=new Ke({color:16763955}),this.remoteSlugNoseMat=new Ke({color:16724804}),this.slugThrusterMat=new Ke({color:16737792}),this.mineGeom=new js(1.6,1),this.mineMat=new Gt({color:2236962,roughness:.3,metalness:.9,emissive:16716032,emissiveIntensity:.4}),this.decoyMat=new Ke({color:65535,wireframe:!0,transparent:!0,opacity:.75,blending:rt})}listenToNetworkEvents(){this.network&&(typeof this.network.onLaser=="function"&&this.network.onLaser((e,t)=>{this.spawnRemoteLaser(e,t)}),this.network.onCannon((e,t)=>{this.spawnRemoteProjectile(e,t)}),typeof this.network.onDecoy=="function"&&this.network.onDecoy((e,t)=>{this.spawnRemoteDecoy(e,t)}),this.network.onMine((e,t)=>{this.spawnRemoteMine(e,t)}))}triggerPrimary(e,t,n){if(!e||t.isDead)return;if(typeof t.breakInvisibility=="function"&&t.breakInvisibility(),t.hasHologramDecoy){t.hasHologramDecoy=!1;const r=t.getForwardVector(),o=t.position.clone().addScaledVector(r,4),a=`decoy-${this.network.selfId}-${Date.now()}`;this.spawnDecoy(o,r,!0,a),dt.playDecoyDeploy(),ct.log("WEAPON","Hologram Decoy Clone launched forward!"),this.network&&typeof this.network.broadcastDecoy=="function"&&this.network.broadcastDecoy({id:a,pos:{x:o.x,y:o.y,z:o.z},dir:{x:r.x,y:r.y,z:r.z},time:Date.now()});return}const s=n>1e3?n*.001:n;if(this.laserEnergy>=this.laserShotCost&&s-this.laserLastFireTime>=this.laserFireInterval){this.laserLastFireTime=s,this.laserCooldownTimer=this.laserCooldownDelay,this.laserEnergy=Math.max(0,this.laserEnergy-this.laserShotCost);const r=t.getForwardVector(),o=t.position.clone().addScaledVector(r,3.2).add(new U(0,-.25,0)),a=`laser-${this.network.selfId}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;this.spawnLaser(o,r,!0,a),dt.playLaserShot(!0),this.network&&typeof this.network.broadcastLaser=="function"&&this.network.broadcastLaser({id:a,origin:{x:o.x,y:o.y,z:o.z},dir:{x:r.x,y:r.y,z:r.z},time:n})}}triggerSecondary(e,t,n){if(!e||t.isDead)return;typeof t.breakInvisibility=="function"&&t.breakInvisibility();const s=n>1e3?n*.001:n;if(this.cannonCooldownTimer=this.cannonCooldownDelay,this.cannonEnergy>=this.cannonShotCost&&s-this.cannonLastFireTime>=this.cannonFireInterval){this.cannonLastFireTime=s,this.cannonEnergy=Math.max(0,this.cannonEnergy-this.cannonShotCost);const r=t.getForwardVector(),o=t.getRightVector(),a=(Math.random()>.5?1:-1)*.72,c=t.position.clone().addScaledVector(r,2.8).addScaledVector(o,a).add(new U(0,-.28,0)),l=`cannon-${this.network.selfId}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;this.spawnProjectile(c,r,t.velocity,!0,l),dt.playCannonShot(!0),this.network.broadcastCannon({id:l,origin:{x:c.x,y:c.y,z:c.z},dir:{x:r.x,y:r.y,z:r.z},vel:{x:t.velocity.x,y:t.velocity.y,z:t.velocity.z},time:n})}}triggerCannon(e,t,n){this.triggerSecondary(e,t,n)}triggerLaser(e,t,n){this.triggerPrimary(e,t,n)}triggerRearMine(e){return this.triggerSecondary(!0,e,performance.now())}spawnLaser(e,t,n,s){const r=new Dt;r.position.copy(e),r.quaternion.setFromUnitVectors(new U(0,0,1),t);const o=new Se(this.laserGeom,n?this.localLaserMat:this.remoteLaserMat);r.add(o);const a=new Se(this.laserGlowGeom,n?this.localLaserGlowMat:this.remoteLaserGlowMat);r.add(a),this.scene.add(r),this.lasers.push({mesh:r,dir:t.clone().normalize(),speed:this.laserSpeed,life:1.4,maxLife:1.4,isLocal:n,id:s})}spawnRemoteLaser(e,t){const n=new U(e.origin.x,e.origin.y,e.origin.z),s=new U(e.dir.x,e.dir.y,e.dir.z);this.spawnLaser(n,s,!1,e.id),dt.playLaserShot(!1,n)}spawnProjectile(e,t,n,s,r){const o=new Dt;o.position.copy(e),o.quaternion.setFromUnitVectors(new U(0,0,1),t);const a=new Se(this.slugBodyGeom,this.slugBodyMat);o.add(a);const c=new Se(this.slugNoseGeom,s?this.localSlugNoseMat:this.remoteSlugNoseMat);c.position.set(0,0,-1.45),o.add(c);const l=new Se(this.slugTailGeom,this.slugThrusterMat);l.position.set(0,0,1.15),o.add(l),this.scene.add(o),this.projectiles.push({mesh:o,dir:t.clone().normalize(),speed:this.cannonSpeed,initialVel:n?n.clone():new U,life:2.8,isLocal:s,id:r})}spawnRemoteProjectile(e,t){const n=new U(e.origin.x,e.origin.y,e.origin.z),s=new U(e.dir.x,e.dir.y,e.dir.z),r=e.vel?new U(e.vel.x,e.vel.y,e.vel.z):new U;this.spawnProjectile(n,s,r,!1,e.id),dt.playCannonShot(!1,n)}spawnDecoy(e,t,n,s){const r=new Dt;r.position.copy(e),r.quaternion.setFromUnitVectors(new U(0,0,-1),t);const o=new mi(1.2,4,5);o.rotateX(-Math.PI/2);const a=new Se(o,this.decoyMat);r.add(a);const c=new wt(5,.08,1.8),l=new Se(c,this.decoyMat);l.position.set(0,0,.8),r.add(l);const h=new mn(.5,8,8),u=new Ke({color:65535,transparent:!0,opacity:.9,blending:rt}),f=new Se(h,u);f.position.set(0,0,2.2),r.add(f),this.scene.add(r),this.decoys.push({group:r,dir:t.clone().normalize(),speed:90,life:15,maxLife:15,isLocal:n,id:s})}spawnRemoteDecoy(e,t){const n=new U(e.pos.x,e.pos.y,e.pos.z),s=new U(e.dir.x,e.dir.y,e.dir.z);this.spawnDecoy(n,s,!1,e.id),dt.playDecoyDeploy()}spawnRemoteMine(e,t){const n=new U(e.pos.x,e.pos.y,e.pos.z),s=new Se(this.mineGeom,this.mineMat);s.position.copy(n),this.scene.add(s),this.mines.push({mesh:s,pos:n,life:3,id:e.id,isLocal:!1})}spawnExplosion(e,t=12,n=16737792){const s=new mn(t*.4,12,10),r=new Ke({color:n,transparent:!0,opacity:.9,blending:rt}),o=new Se(s,r);o.position.copy(e),this.scene.add(o),dt.playExplosion(t>15?1.5:.8,e),this.spaceEnv&&typeof this.spaceEnv.triggerCombatFlash=="function"&&this.spaceEnv.triggerCombatFlash(e,n,t>15?4.5:2.5),this.explosions.push({mesh:o,maxLife:.45,life:.45,maxRadius:t})}update(e,t,n,s){if(this.laserCooldownTimer>0){const r=Math.min(this.laserCooldownTimer,e);this.laserCooldownTimer-=r;const o=e-r;o>0&&this.laserEnergy<this.laserMaxEnergy&&(this.laserEnergy=Math.min(this.laserMaxEnergy,this.laserEnergy+this.laserRechargeRate*o))}else this.laserEnergy<this.laserMaxEnergy&&(this.laserEnergy=Math.min(this.laserMaxEnergy,this.laserEnergy+this.laserRechargeRate*e));this.cannonCooldownTimer>0?this.cannonCooldownTimer=Math.max(0,this.cannonCooldownTimer-e):this.cannonEnergy<this.cannonMaxEnergy&&(this.cannonEnergy=Math.min(this.cannonMaxEnergy,this.cannonEnergy+this.cannonRechargeRate*e));for(let r=this.lasers.length-1;r>=0;r--){const o=this.lasers[r];o.life-=e,o.mesh.position.addScaledVector(o.dir,o.speed*e);let a=!1;if(this.spaceEnv.checkCollision(o.mesh.position,1.2)&&(this.spawnExplosion(o.mesh.position,6,54527),a=!0),!a&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<18&&(this.spawnExplosion(o.mesh.position,8,65535),t.takeDamage(this.laserDamage,"laser"),s&&s(this.laserDamage,"laser",null),a=!0),!a&&o.isLocal){for(const[l,h]of n.entries())if(!h.isDead&&o.mesh.position.distanceToSquared(h.position)<18){this.spawnExplosion(o.mesh.position,8,65535),this.network.sendHitTarget(l,this.laserDamage,"laser"),a=!0;break}}(a||o.life<=0)&&(this.scene.remove(o.mesh),this.lasers.splice(r,1))}for(let r=this.projectiles.length-1;r>=0;r--){const o=this.projectiles[r];o.life-=e,o.mesh.position.addScaledVector(o.dir,o.speed*e);const a=o.mesh.position.clone().addScaledVector(o.dir,-1.2);this.fireTrails.emit(a,o.dir,3);let c=!1;const l=this.spaceEnv.checkCollision(o.mesh.position,1.2);if(l&&(this.spawnExplosion(o.mesh.position,5,16742144),typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(l,o.mesh.position,o.dir),c=!0),!c&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<16&&(this.spawnExplosion(o.mesh.position,6,16724736),t.takeDamage(this.cannonDamage,"cannon"),s&&s(this.cannonDamage,"cannon",null),c=!0),!c&&o.isLocal){for(const[h,u]of n.entries())if(!u.isDead&&o.mesh.position.distanceToSquared(u.position)<16){this.spawnExplosion(o.mesh.position,6,16733440),this.network.sendHitTarget(h,this.cannonDamage,"cannon"),c=!0;break}}(c||o.life<=0)&&(this.scene.remove(o.mesh),this.projectiles.splice(r,1))}for(let r=this.decoys.length-1;r>=0;r--){const o=this.decoys[r];o.life-=e,o.group.position.addScaledVector(o.dir,o.speed*e);const a=.5+Math.sin(o.life*14)*.25;o.group.children.forEach(c=>{c.material&&c.material.opacity!==void 0&&(c.material.opacity=a)}),o.life<=0&&(this.spawnExplosion(o.group.position,6,65535),this.scene.remove(o.group),this.decoys.splice(r,1))}for(let r=this.mines.length-1;r>=0;r--){const o=this.mines[r];o.life-=e,o.mesh.rotation.y+=e*2,o.life<=0&&(this.spawnExplosion(o.pos,16,16720384),this.scene.remove(o.mesh),this.mines.splice(r,1))}for(let r=this.explosions.length-1;r>=0;r--){const o=this.explosions[r];if(o.life-=e,o.life<=0){this.scene.remove(o.mesh),this.explosions.splice(r,1);continue}const c=1+(1-o.life/o.maxLife)*2.2;o.mesh.scale.set(c,c,c),o.mesh.material.opacity=o.life/o.maxLife*.9}this.fireTrails.update(e)}cleanup(){for(const e of this.lasers)this.scene.remove(e.mesh);for(const e of this.projectiles)this.scene.remove(e.mesh);for(const e of this.decoys)this.scene.remove(e.group);for(const e of this.mines)this.scene.remove(e.mesh);for(const e of this.explosions)this.scene.remove(e.mesh);this.fireTrails.cleanup()}}class ch{constructor(e,t,n="Pilot"){this.peerId=e,this.scene=t,this.playerName=n,this.group=new Dt,this.position=this.group.position,this.quaternion=this.group.quaternion,this.lastReceivedState=null,this.targetPosition=new U,this.targetQuaternion=new pn,this.targetVelocity=new U,this.lastPacketTime=performance.now(),this.hp=100,this.maxHp=100,this.isDead=!1,this.isThrusting=!1,this.strafeState=0,this.engineFlares=[],this.sideThrusterFlares=[],this.shieldMesh=null,this.nameCanvas=null,this.nameSprite=null,this.createShipMesh(),this.createNameplate(),this.scene.add(this.group)}createShipMesh(){const e=new Gt({color:10363940,roughness:.35,metalness:.85,flatShading:!0}),t=new Gt({color:1580068,roughness:.45,metalness:.8,flatShading:!0}),n=new Gt({color:54527,roughness:.12,metalness:.95,emissive:15186,emissiveIntensity:.6}),s=new Ke({color:58879}),r=new mi(.75,2.6,5);r.rotateX(-Math.PI/2);const o=new Se(r,e);o.position.set(0,0,-2.1),this.group.add(o);const a=new wt(1.8,.04,.6),c=new Se(a,t);c.position.set(0,.05,-1.5),this.group.add(c);const l=new wt(1.4,.8,3.2),h=new Se(l,e);h.position.set(0,0,.2),this.group.add(h);const u=new wt(.35,.55,1.8),f=new Se(u,t);f.position.set(-.85,-.05,.1),this.group.add(f);const m=f.clone();m.position.set(.85,-.05,.1),this.group.add(m);const g=new mi(.48,1.8,5);g.rotateX(-Math.PI/2);const _=new Se(g,n);_.position.set(0,.44,-.4),this.group.add(_);const p=new wt(5.8,.08,2),d=new Se(p,e);d.position.set(0,-.08,.6),this.group.add(d);const v=new an(.1,.12,1.6,8);v.rotateX(Math.PI/2);const y=new Se(v,t);y.position.set(-1.8,-.22,.3),this.group.add(y);const x=y.clone();x.position.set(1.8,-.22,.3),this.group.add(x);const R=new Mi(.12,.02,6,12),T=new Se(R,s);T.position.set(-1.8,-.22,-.5),this.group.add(T);const A=T.clone();A.position.set(1.8,-.22,-.5),this.group.add(A);const L=new wt(.08,1.25,1.2),w=new Se(L,t);w.position.set(-.65,.62,1.2),w.rotation.z=-.32,this.group.add(w);const M=w.clone();M.position.set(.65,.62,1.2),M.rotation.z=.32,this.group.add(M);const I=new an(.32,.42,.75,10);I.rotateX(Math.PI/2);const W=new Se(I,t);W.position.set(-.48,0,1.95),this.group.add(W);const S=W.clone();S.position.set(.48,0,1.95),this.group.add(S);const D=new Mi(.3,.03,6,12),N=new Se(D,s);N.position.set(-.48,0,2.32),this.group.add(N);const P=N.clone();P.position.set(.48,0,2.32),this.group.add(P);const z=new mi(.32,2.6,8);z.rotateX(-Math.PI/2);const B=new Ke({color:51455,transparent:!0,opacity:.9,blending:rt}),O=new Se(z,B);O.position.set(-.48,0,3.6),this.group.add(O),this.engineFlares.push(O);const k=O.clone();k.position.set(.48,0,3.6),this.group.add(k),this.engineFlares.push(k);const Z=new mn(3.4,16,12),le=new Ke({color:58879,wireframe:!0,transparent:!0,opacity:0});this.shieldMesh=new Se(Z,le),this.group.add(this.shieldMesh)}createNameplate(){this.nameCanvas=document.createElement("canvas"),this.nameCanvas.width=256,this.nameCanvas.height=64,this.updateNameplateTexture();const e=new Jr(this.nameCanvas),t=new Gu({map:e,transparent:!0});this.nameSprite=new ty(t),this.nameSprite.position.set(0,3.2,0),this.nameSprite.scale.set(7.5,1.8,1),this.group.add(this.nameSprite)}updateNameplateTexture(){if(!this.nameCanvas)return;const e=this.nameCanvas.getContext("2d");if(!e)return;e.clearRect(0,0,256,64),e.fillStyle="rgba(10, 16, 26, 0.75)",e.roundRect?e.roundRect(10,8,236,48,8):e.fillRect(10,8,236,48),e.fill(),e.strokeStyle="#00d4ff",e.lineWidth=2,e.stroke(),e.font='bold 20px "Segoe UI", sans-serif',e.fillStyle="#ffffff",e.textAlign="center",e.fillText(this.playerName,128,30);const t=Math.max(0,this.hp/this.maxHp);e.fillStyle="#222",e.fillRect(30,38,196,10),e.fillStyle=t>.4?"#00ff88":"#ff3344",e.fillRect(30,38,196*t,10),this.nameSprite&&this.nameSprite.material.map&&(this.nameSprite.material.map.needsUpdate=!0)}receiveNetworkState(e){e&&(this.lastPacketTime=performance.now(),e.name&&e.name!==this.playerName&&(this.playerName=e.name,this.updateNameplateTexture()),e.hp!==void 0&&e.hp!==this.hp&&(this.hp=e.hp,this.updateNameplateTexture()),this.isDead=!!e.isDead,this.isInvisible=!!e.isInvisible,this.isThrusting=!!e.thrust,this.strafeState=e.strafe||0,this.targetPosition.set(e.pos.x,e.pos.y,e.pos.z),this.targetQuaternion.set(e.quat._x||e.quat.x,e.quat._y||e.quat.y,e.quat._z||e.quat.z,e.quat._w||e.quat.w),e.vel&&this.targetVelocity.set(e.vel.x,e.vel.y,e.vel.z))}triggerShieldFlash(){this.shieldMesh&&(this.shieldMesh.material.opacity=.55)}update(e){if(this.isDead){this.group.visible=!1;return}this.group.visible=!0;const t=performance.now(),n=Math.min(.25,(t-this.lastPacketTime)/1e3),s=this.targetPosition.clone().addScaledVector(this.targetVelocity,n),r=Math.min(1,e*12);this.position.lerp(s,r),this.quaternion.slerp(this.targetQuaternion,Math.min(1,e*10));const o=this.isThrusting?.8+Math.random()*.4:.001;for(const a of this.engineFlares)a.scale.set(o,o,o),a.visible=this.isThrusting;this.shieldMesh&&this.shieldMesh.material.opacity>0&&(this.shieldMesh.material.opacity=Math.max(0,this.shieldMesh.material.opacity-e*2.5))}destroy(){this.scene.remove(this.group)}}class vy{constructor(e){this.scene=e,this.maxParticles=2400,this.particles=[],this.geom=new xt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new mt(this.positions,3)),this.geom.setAttribute("color",new mt(this.colors,3));let t=null;if(typeof document<"u")try{const n=document.createElement("canvas");n.width=64,n.height=64;const s=n.getContext("2d");if(s){const r=s.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.2,"rgba(0, 220, 255, 0.85)"),r.addColorStop(.5,"rgba(0, 140, 255, 0.35)"),r.addColorStop(.8,"rgba(0, 60, 255, 0.1)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),s.fillStyle=r,s.fillRect(0,0,64,64),t=new Jr(n)}}catch{}this.mat=new hs({size:5.5,map:t||void 0,vertexColors:!0,transparent:!0,opacity:.85,blending:rt,depthWrite:!1,sizeAttenuation:!0}),this.points=new Ys(this.geom,this.mat),this.points.frustumCulled=!1,this.scene.add(this.points),this.emitTimer=0}emit(e,t,n=!1){this.particles.length>=this.maxParticles&&this.particles.shift();const s=(Math.random()-.5)*.6,r=(Math.random()-.5)*.6,o=(Math.random()-.5)*.6,a=e.clone().addScaledVector(t,-2.4);this.particles.push({x:a.x+s,y:a.y+r,z:a.z+o,vx:s*.4,vy:r*.4,vz:o*.4,age:0,maxAge:15,isHostile:n})}update(e){const t=this.geom.attributes.position,n=this.geom.attributes.color,s=this.particles.length;for(let r=s-1;r>=0;r--){const o=this.particles[r];if(o.age+=e,o.age>=o.maxAge){this.particles.splice(r,1);continue}o.x+=o.vx*e,o.y+=o.vy*e,o.z+=o.vz*e;const a=1-o.age/o.maxAge,c=Math.pow(a,1.6),l=r*3;this.positions[l]=o.x,this.positions[l+1]=o.y,this.positions[l+2]=o.z,o.isHostile?(this.colors[l]=1*c,this.colors[l+1]=.35*c,this.colors[l+2]=.15*c):(this.colors[l]=.15*c,this.colors[l+1]=.85*c,this.colors[l+2]=1*c)}this.maxParticles-this.particles.length;for(let r=this.particles.length;r<this.maxParticles;r++){const o=r*3;this.positions[o]=0,this.positions[o+1]=0,this.positions[o+2]=0,this.colors[o]=0,this.colors[o+1]=0,this.colors[o+2]=0}t.needsUpdate=!0,n.needsUpdate=!0}cleanup(){this.scene.remove(this.points),this.particles=[]}}class _y{constructor(e){this.scene=e,this.ripples=[],this.ringGeom=new zs(.8,1.2,32),this.ringGeom.rotateX(Math.PI/2),this.sphereGeom=new xi(1,2)}emitRipple(e,t=58879){const n=new Dt;n.position.copy(e);const s=new Ke({color:t,wireframe:!0,transparent:!0,opacity:.85,blending:rt,depthWrite:!1}),r=new Se(this.sphereGeom,s);n.add(r);const o=new Ke({color:16777215,transparent:!0,opacity:.95,side:Ot,blending:rt,depthWrite:!1}),a=new Se(this.ringGeom,o);n.add(a),this.scene.add(n),this.ripples.push({group:n,sphereMesh:r,ringMesh:a,age:0,maxAge:2.5,maxRadius:280})}update(e){for(let t=this.ripples.length-1;t>=0;t--){const n=this.ripples[t];if(n.age+=e,n.age>=n.maxAge){this.scene.remove(n.group),this.ripples.splice(t,1);continue}const s=n.age/n.maxAge,r=2+Math.pow(s,.75)*n.maxRadius,o=Math.max(0,(1-s)*.9);n.sphereMesh.scale.set(r,r,r),n.sphereMesh.material.opacity=o,n.ringMesh.scale.set(r*1.05,r*1.05,r*1.05),n.ringMesh.material.opacity=o*1.2}}cleanup(){for(const e of this.ripples)this.scene.remove(e.group);this.ripples=[]}}class yy{constructor(e,t){this.scene=e,this.spaceEnv=t,this.spawnInterval=10,this.spawnTimer=4,this.activeMeteor=null,this.maxParticles=250,this.particles=[],this.trailGeom=new xt,this.trailPositions=new Float32Array(this.maxParticles*3),this.trailColors=new Float32Array(this.maxParticles*3),this.trailGeom.setAttribute("position",new mt(this.trailPositions,3)),this.trailGeom.setAttribute("color",new mt(this.trailColors,3)),this.trailMat=new hs({size:48,vertexColors:!0,transparent:!0,opacity:.95,blending:rt,depthWrite:!1,sizeAttenuation:!0}),this.trailPoints=new Ys(this.trailGeom,this.trailMat),this.scene.add(this.trailPoints)}spawnMeteor(){if(this.activeMeteor)return;const e=Math.random()*Math.PI*2,t=Math.acos(2*Math.random()-1),n=1300,s=new U(n*Math.sin(t)*Math.cos(e),n*Math.sin(t)*Math.sin(e)*.6,n*Math.cos(t));let r=new U((Math.random()-.5)*400,(Math.random()-.5)*200,(Math.random()-.5)*400);if(this.spaceEnv.asteroids.length>0&&Math.random()<.65){const L=this.spaceEnv.asteroids[Math.floor(Math.random()*this.spaceEnv.asteroids.length)];L&&r.copy(L.position).add(new U((Math.random()-.5)*30,(Math.random()-.5)*30,(Math.random()-.5)*30))}const o=r.clone().sub(s).normalize(),a=260,c=o.clone().multiplyScalar(a),l=56,h=12e5,u=new Dt;u.position.copy(s);const f=new js(l,2),m=new Gt({color:1705986,emissive:16724736,emissiveIntensity:4.2,roughness:.88,metalness:.25}),g=new Se(f,m);u.add(g);const _=new mn(l*.75,16,12),p=new Ke({color:16777215,transparent:!0,opacity:.95,blending:rt}),d=new Se(_,p);u.add(d);const v=new xi(l*1.25,2),y=new Ke({color:16729088,transparent:!0,opacity:.65,blending:rt,side:Ot}),x=new Se(v,y);u.add(x);const R=new xi(l*1.4,2),T=new Ke({color:16755200,transparent:!0,opacity:.45,blending:rt,side:Ot}),A=new Se(R,T);u.add(A),this.scene.add(u),this.activeMeteor={group:u,coreMesh:g,fireEnvelopeMesh:x,haloMesh:A,position:u.position,velocity:c,dir:o,speed:a,radius:l,mass:h,flybyPlayed:!1,age:0},this.spaceEnv&&this.spaceEnv.meteorLight&&(this.spaceEnv.meteorLight.intensity=4.5,this.spaceEnv.meteorLight.position.copy(s)),ct.log("METEOR",`Flaming meteor entered sector at (${Math.round(s.x)}, ${Math.round(s.y)}, ${Math.round(s.z)}) heading speed ${a} u/s`)}update(e,t,n,s){var r;if(this.spawnTimer+=e,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnMeteor()),this.activeMeteor){const o=this.activeMeteor;if(o.age+=e,o.position.addScaledVector(o.velocity,e),o.coreMesh.rotation.x+=e*1.8,o.coreMesh.rotation.y+=e*2.2,o.fireEnvelopeMesh){o.fireEnvelopeMesh.rotation.x-=e*3.5,o.fireEnvelopeMesh.rotation.z+=e*4;const c=1+Math.sin(o.age*14)*.06;o.fireEnvelopeMesh.scale.set(c,c,c)}if(o.haloMesh){o.haloMesh.rotation.y+=e*2.8,o.haloMesh.rotation.z-=e*2.5;const c=1+Math.cos(o.age*10)*.08;o.haloMesh.scale.set(c,c,c)}this.spaceEnv&&this.spaceEnv.meteorLight&&this.spaceEnv.meteorLight.position.copy(o.position),this.emitTrailParticles(o.position,o.dir,6),!o.flybyPlayed&&t&&!t.isDead&&o.position.distanceTo(t.position)<450&&(o.flybyPlayed=!0,dt.playMeteorFlyby(o.position));let a=!1;for(let c=0;c<this.spaceEnv.asteroids.length;c++){const l=this.spaceEnv.asteroids[c],h=o.position.distanceToSquared(l.position),u=l.radius+o.radius;if(h<u*u){const f=l.position.clone().sub(o.position).normalize(),m=o.mass/l.mass*o.speed*1.8;l.velocity.addScaledVector(f,m),l.rotationSpeed.add(new U((Math.random()-.5)*1.2,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2)),ct.log("METEOR",`Meteor IMPACT with asteroid! Transferred impulse ${Math.round(m)} u/s (new ast speed: ${Math.round(l.velocity.length())})`),this.triggerExplosion(o.position,28,16733440),a=!0;break}}if(!a&&t&&!t.isDead&&o.position.distanceTo(t.position)<o.radius+3.2&&(ct.log("METEOR","Meteor DIRECT HIT on player ship! Instant lethal incineration."),this.triggerExplosion(o.position,36,16720384),t.takeDamage(1e3,!0),s&&s("🔥 Incinerated by rogue flaming meteor!"),a=!0),!a&&n){for(const[c,l]of n.entries())if(!l.isDead&&o.position.distanceTo(l.position)<o.radius+3.2){ct.log("METEOR",`Meteor DIRECT HIT on remote ship ${c.slice(0,5)}!`),this.triggerExplosion(o.position,36,16720384),(r=l.takeDamage)==null||r.call(l,1e3),a=!0;break}}!a&&o.position.length()>1600&&(a=!0),a&&this.destroyMeteor()}this.updateTrailParticles(e)}emitTrailParticles(e,t,n=6){for(let s=0;s<n&&!(this.particles.length>=this.maxParticles);s++){const r=new U((Math.random()-.5)*45,(Math.random()-.5)*45,(Math.random()-.5)*45),o=e.clone().add(r),a=t.clone().multiplyScalar(-40).add(new U((Math.random()-.5)*25,(Math.random()-.5)*25,(Math.random()-.5)*25)),c=.65+Math.random()*.45;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}updateTrailParticles(e){for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.life-=e,s.life<=0){this.particles.splice(n,1);continue}s.pos.addScaledVector(s.vel,e)}const t=this.particles.length;for(let n=0;n<t;n++){const s=this.particles[n],r=n*3;this.trailPositions[r]=s.pos.x,this.trailPositions[r+1]=s.pos.y,this.trailPositions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.2)this.trailColors[r]=1,this.trailColors[r+1]=.95,this.trailColors[r+2]=.8;else if(o<.6)this.trailColors[r]=1,this.trailColors[r+1]=.45*(1-(o-.2)/.4),this.trailColors[r+2]=.05;else{const a=(1-o)/.4;this.trailColors[r]=.6*a,this.trailColors[r+1]=.1*a,this.trailColors[r+2]=.02*a}}for(let n=t;n<this.maxParticles;n++){const s=n*3;this.trailPositions[s]=0,this.trailPositions[s+1]=0,this.trailPositions[s+2]=999999}this.trailGeom.attributes.position.needsUpdate=!0,this.trailGeom.attributes.color.needsUpdate=!0}triggerExplosion(e,t=28,n=16733440){const s=new mn(t*.4,16,12),r=new Ke({color:n,transparent:!0,opacity:.95,blending:rt}),o=new Se(s,r);o.position.copy(e),this.scene.add(o),dt.playExplosion(2.5),this.spaceEnv&&typeof this.spaceEnv.triggerCombatFlash=="function"&&this.spaceEnv.triggerCombatFlash(e,n,6);const a=performance.now(),c=550,l=()=>{const u=(performance.now()-a)/c;if(u>=1){this.scene.remove(o),s.dispose(),r.dispose();return}const f=1+u*3.5;o.scale.set(f,f,f),r.opacity=Math.max(0,1-u),requestAnimationFrame(l)};requestAnimationFrame(l)}destroyMeteor(){this.activeMeteor&&(this.scene.remove(this.activeMeteor.group),this.spaceEnv&&this.spaceEnv.meteorLight&&(this.spaceEnv.meteorLight.intensity=0),this.activeMeteor=null)}cleanup(){this.destroyMeteor(),this.scene.remove(this.trailPoints),this.trailGeom.dispose(),this.trailMat.dispose()}}class xy{constructor(e,t){this.scene=e,this.spaceEnv=t,this.matchDuration=600,this.matchTime=0,this.initialSafeRadius=1100,this.finalSafeRadius=120,this.currentSafeRadius=this.initialSafeRadius,this.startPosition=new U(0,450,-600),this.targetPosition=new U(0,0,0),this.position=this.startPosition.clone(),this.eventHorizonRadius=65,this.gravityStrength=45e4,this.group=new Dt,this.group.position.copy(this.position),this.createBlackHoleVisuals(),this.createSafeZonePerimeterVisuals(),this.scene.add(this.group)}createBlackHoleVisuals(){const e=new mn(this.eventHorizonRadius,32,24),t=new Ke({color:0,fog:!1});this.horizonMesh=new Se(e,t),this.group.add(this.horizonMesh);const n=new mn(this.eventHorizonRadius*1.15,28,20),s=new Ke({color:8965375,transparent:!0,opacity:.35,side:Rt,blending:rt,fog:!1});this.lensMesh=new Se(n,s),this.group.add(this.lensMesh);const r=new zs(this.eventHorizonRadius*1.08,this.eventHorizonRadius*3.8,48,8);r.rotateX(Math.PI/2.3);const o=new Ke({color:16737792,side:Ot,transparent:!0,opacity:.9,blending:rt,fog:!1});this.diskMesh=new Se(r,o),this.group.add(this.diskMesh);const a=new zs(this.eventHorizonRadius*1.05,this.eventHorizonRadius*1.9,48,4);a.rotateX(Math.PI/2.3);const c=new Ke({color:65535,side:Ot,transparent:!0,opacity:.75,blending:rt,fog:!1});this.innerDiskMesh=new Se(a,c),this.group.add(this.innerDiskMesh),this.infallParticleCount=180,this.infallGeom=new xt,this.infallPositions=new Float32Array(this.infallParticleCount*3),this.infallColors=new Float32Array(this.infallParticleCount*3),this.infallData=[];for(let h=0;h<this.infallParticleCount;h++){const u=Math.random()*Math.PI*2,f=this.eventHorizonRadius*(1.2+Math.random()*2.8),m=(Math.random()-.5)*30,g=40+Math.random()*60;this.infallData.push({angle:u,dist:f,height:m,speed:g});const _=h*3;this.infallPositions[_]=Math.cos(u)*f,this.infallPositions[_+1]=m,this.infallPositions[_+2]=Math.sin(u)*f,this.infallColors[_]=1,this.infallColors[_+1]=.5+Math.random()*.5,this.infallColors[_+2]=.2}this.infallGeom.setAttribute("position",new mt(this.infallPositions,3)),this.infallGeom.setAttribute("color",new mt(this.infallColors,3));const l=new hs({size:6.5,vertexColors:!0,transparent:!0,opacity:.85,blending:rt,depthWrite:!1});this.infallPoints=new Ys(this.infallGeom,l),this.group.add(this.infallPoints)}createSafeZonePerimeterVisuals(){const e=this.currentSafeRadius,t=new Mi(e,2.5,8,64);t.rotateX(Math.PI/2),this.perimeterMat=new Ke({color:54527,transparent:!0,opacity:.55,wireframe:!0,blending:rt}),this.perimeterMesh=new Se(t,this.perimeterMat),this.perimeterMesh.position.set(0,0,0),this.scene.add(this.perimeterMesh)}update(e,t,n,s,r){var c;this.matchTime+=e;const o=Math.min(1,this.matchTime/this.matchDuration);this.currentSafeRadius=this.initialSafeRadius-o*(this.initialSafeRadius-this.finalSafeRadius);const a=this.currentSafeRadius/this.initialSafeRadius;if(this.perimeterMesh&&(this.perimeterMesh.scale.set(a,1,a),o>.7?(this.perimeterMat.color.setHex(16720452),this.perimeterMat.opacity=.75+Math.sin(this.matchTime*6)*.2):(this.perimeterMat.color.setHex(54527),this.perimeterMat.opacity=.45+Math.sin(this.matchTime*2)*.15)),this.position.lerpVectors(this.startPosition,this.targetPosition,Math.pow(o,.7)),this.group.position.copy(this.position),this.diskMesh&&(this.diskMesh.rotation.z+=e*.75),this.innerDiskMesh&&(this.innerDiskMesh.rotation.z-=e*1.35),this.infallData){for(let l=0;l<this.infallParticleCount;l++){const h=this.infallData[l];h.angle+=h.speed/(h.dist+1)*e,h.dist-=e*14,h.dist<=this.eventHorizonRadius*1.02&&(h.dist=this.eventHorizonRadius*(2.2+Math.random()*1.8));const u=l*3;this.infallPositions[u]=Math.cos(h.angle)*h.dist,this.infallPositions[u+1]=h.height,this.infallPositions[u+2]=Math.sin(h.angle)*h.dist}this.infallGeom.attributes.position.needsUpdate=!0}if(t&&!t.isDead){const l=this.position.clone().sub(t.position),h=l.length(),u=l.normalize(),f=Math.min(65,this.gravityStrength/(h*h+1e3));t.velocity.addScaledVector(u,f*e),h<=this.eventHorizonRadius&&(ct.log("BLACK_HOLE","Player ship devoured by the Black Hole event horizon!"),t.takeDamage(9999,!0),r&&r("🕳️ Devoured by the encroaching Cosmic Black Hole!"))}if(n)for(const[l,h]of n.entries())h.isDead||this.position.distanceTo(h.position)<=this.eventHorizonRadius&&((c=h.takeDamage)==null||c.call(h,9999));if(this.spaceEnv&&this.spaceEnv.asteroids)for(let l=this.spaceEnv.asteroids.length-1;l>=0;l--){const h=this.spaceEnv.asteroids[l],u=this.position.clone().sub(h.position),f=u.length();if(f>.1){const m=Math.min(25,this.gravityStrength*.4/(f*f+2e3));h.velocity.addScaledVector(u.normalize(),m*e)}f<=this.eventHorizonRadius+h.radius*.3&&(this.spaceEnv.scene.remove(h.mesh),this.spaceEnv.asteroids.splice(l,1),dt.playExplosion(2.2,this.position),ct.log("BLACK_HOLE",`Asteroid swallowed by singularity! (${this.spaceEnv.asteroids.length} remaining)`))}if(s&&s.activeMeteor){const l=s.activeMeteor,h=this.position.clone().sub(l.position);h.length()<=this.eventHorizonRadius+l.radius?(ct.log("BLACK_HOLE","Rogue flaming meteor sucked into the Black Hole!"),s.destroyMeteor(),dt.playExplosion(3,this.position)):l.velocity.addScaledVector(h.normalize(),60*e)}}getSafeRadius(){return this.currentSafeRadius}getMatchProgress(){return Math.min(1,this.matchTime/this.matchDuration)}getTimeRemaining(){return Math.max(0,this.matchDuration-this.matchTime)}cleanup(){this.scene.remove(this.group),this.perimeterMesh&&this.scene.remove(this.perimeterMesh),this.infallGeom.dispose()}}const ri={SHIELD_REPAIR:"shield_repair",INVISIBILITY:"invisibility",HOLOGRAM_CLONE:"hologram_clone"};class My{constructor(e,t){this.scene=e,this.blackHoleSystem=t,this.spawnInterval=10,this.spawnTimer=2,this.itemLifetime=60,this.powerups=[],this.maxConcurrent=12,this.orbGeom=new xi(3.2,2),this.ringGeom=new Mi(4.5,.25,8,24),this.iconGeom=new wt(1.6,1.6,1.6)}spawnPowerUp(){if(this.powerups.length>=this.maxConcurrent)return;const e=this.blackHoleSystem?this.blackHoleSystem.getSafeRadius()*.75:600,t=Math.random()*Math.PI*2,n=80+Math.random()*e,s=new U(Math.cos(t)*n,(Math.random()-.5)*160,Math.sin(t)*n),r=Math.random();let o=ri.SHIELD_REPAIR,a=65535,c="Shield Repair";r<.36?(o=ri.SHIELD_REPAIR,a=65484,c="Shield Replenish"):r<.68?(o=ri.INVISIBILITY,a=13378303,c="Cloaking Device"):(o=ri.HOLOGRAM_CLONE,a=65382,c="Hologram Decoy");const l=new Dt;l.position.copy(s);const h=new Ke({color:a,transparent:!0,opacity:.85,blending:rt}),u=new Se(this.orbGeom,h);l.add(u);const f=new Ke({color:a,wireframe:!0,transparent:!0,opacity:.75,blending:rt}),m=new Se(this.ringGeom,f);l.add(m);const g=new Ke({color:16777215,wireframe:!0}),_=new Se(this.iconGeom,g);l.add(_),this.scene.add(l),this.powerups.push({group:l,coreMesh:u,ringMesh:m,iconMesh:_,type:o,name:c,pos:s,life:this.itemLifetime,maxLife:this.itemLifetime,initialY:s.y,seed:Math.random()*10}),ct.log("POWERUP",`Spawned [${c}] at (${Math.round(s.x)}, ${Math.round(s.y)}, ${Math.round(s.z)})`)}update(e,t,n){this.spawnTimer+=e,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnPowerUp());for(let s=this.powerups.length-1;s>=0;s--){const r=this.powerups[s];if(r.life-=e,r.life<=0){this.scene.remove(r.group),this.powerups.splice(s,1);continue}const o=r.maxLife-r.life;if(r.group.rotation.y+=e*1.6,r.ringMesh.rotation.x+=e*2.4,r.ringMesh.rotation.z+=e*1.8,r.iconMesh.rotation.y-=e*3,r.group.position.y=r.initialY+Math.sin(o*2.5+r.seed)*3.5,r.life<10){const a=(Math.sin(o*12)+1)*.5;r.coreMesh.material.opacity=.3+a*.6}if(t&&!t.isDead){const a=t.position.distanceToSquared(r.group.position),c=8;a<=c*c&&(this.applyPowerUp(r.type,t,n),dt.playScoreChime(),this.scene.remove(r.group),this.powerups.splice(s,1))}}}applyPowerUp(e,t,n){switch(e){case ri.SHIELD_REPAIR:t.shield=t.maxShield,t.isShieldBroken=!1,ct.log("POWERUP","Collected: Shield Replenish! Shield restored to 100%"),n&&n("🛡️ SHIELD REPLENISHED: 100%");break;case ri.INVISIBILITY:t.isInvisible=!0,t.invisibilityTimer=60,ct.log("POWERUP","Collected: Invisibility! Ship cloaked for 60 seconds"),n&&n("👁️ CLOAK ACTIVATED (1 MINUTE)");break;case ri.HOLOGRAM_CLONE:t.hasHologramDecoy=!0,ct.log("POWERUP","Collected: Hologram Decoy Clone!"),n&&n("👥 HOLOGRAM CLONE READY (FIRE TO DEPLOY)");break}}cleanup(){for(const e of this.powerups)this.scene.remove(e.group);this.powerups=[],this.orbGeom.dispose(),this.ringGeom.dispose(),this.iconGeom.dispose()}}class Sy{constructor({container:e,network:t,mapSeed:n,onHudUpdate:s,onDeathNotice:r}){this.container=e,this.network=t,this.mapSeed=n,this.onHudUpdate=s||(()=>{}),this.onDeathNotice=r||(()=>{}),this.scene=null,this.camera=null,this.renderer=null,this.spaceEnv=null,this.cockpit=null,this.playerShip=null,this.weaponsSystem=null,this.remoteShips=new Map,this.isRunning=!1,this.lastTime=performance.now(),this.animFrameId=null,this.lastWidth=0,this.lastHeight=0,this.isPointerLocked=!1,this.mouseSensitivity=.0066,this.isFiringLaser=!1,this.isFiringCannon=!1,this.blackHoleSystem=null,this.powerUpSystem=null,this.broadcastTimer=0,this.broadcastInterval=1/20,this.thrusterTrails=null,this.beaconSystem=null,this.meteorSystem=null,this.trailEmitTimer=0,this.timeSinceLastCombat=0,this.beaconPulseTimer=0,this.netStatsTimer=0,this.initThree(),this.setupNetworkHandlers(),this.setupInputListeners(),ct.setEngine(this),ct.log("ENGINE",`GameEngine initialized with seed ${this.mapSeed}`)}initThree(){this.scene=new Q_,this.scene.background=new je(264212),this.scene.fog=new pc(264212,1e-4);const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;this.camera=new Ht(75,e/t,.1,4e3),this.scene.add(this.camera),this.renderer=new J_({antialias:!0,powerPreference:"high-performance",precision:"highp",stencil:!1,alpha:!1}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=uu,this.renderer.toneMappingExposure=1.2,this.renderer.domElement.style.transform="translateZ(0)",this.renderer.domElement.style.willChange="transform",this.container.appendChild(this.renderer.domElement),this.spaceEnv=new hy(this.scene,this.mapSeed),this.playerShip=new dy(this.camera,this.spaceEnv),this.playerShip.resetSpawn(),this.cockpit=new uy(this.camera),this.weaponsSystem=new gy(this.scene,this.spaceEnv,this.network),this.thrusterTrails=new vy(this.scene),this.beaconSystem=new _y(this.scene),this.meteorSystem=new yy(this.scene,this.spaceEnv),this.blackHoleSystem=new xy(this.scene,this.spaceEnv),this.powerUpSystem=new My(this.scene,this.blackHoleSystem);try{this.renderer.compile(this.scene,this.camera)}catch{}window.addEventListener("resize",this.onWindowResize.bind(this))}setupNetworkHandlers(){this.network.onPeerJoined=e=>{if(!(!e||typeof e!="string")){if(!this.remoteShips.has(e)){const t=new ch(e,this.scene,`Pilot-${e.slice(0,4)}`);this.remoteShips.set(e,t)}ct.log("NET",`Peer joined: ${e}`)}},this.network.onPeerLeft=e=>{!e||typeof e!="string"||(this.remoteShips.has(e)&&(this.remoteShips.get(e).destroy(),this.remoteShips.delete(e)),ct.log("NET",`Peer left: ${e}`))},this.network.onHit(e=>{if(this.timeSinceLastCombat=0,e.targetId===this.network.selfId){const t=this.playerShip.takeDamage(e.damage);this.cockpit.triggerDamageFlash(),dt.playDamageHit(),t&&(dt.playExplosion(2.2),this.network.broadcastKill(this.network.selfId,e.attackerId,e.attackerName),this.onDeathNotice(`💥 Destroyed by ${e.attackerName||"Unknown Pilot"}`))}else this.remoteShips.has(e.targetId)&&this.remoteShips.get(e.targetId).triggerShieldFlash()}),this.weaponsSystem&&(this.network.onCannon(()=>{this.timeSinceLastCombat=0}),this.network.onMine(()=>{this.timeSinceLastCombat=0})),this.network.onKill(e=>{this.timeSinceLastCombat=0,e.killerId===this.network.selfId&&(this.playerShip.recordKill(),dt.playScoreChime(),this.onDeathNotice(`🎯 You eliminated ${e.victimId?e.victimId.slice(0,5):"Enemy"}! (+100 PTS)`))})}triggerBoostAction(){return this.playerShip&&this.playerShip.triggerThrustPress(performance.now())?(dt.playBoost(),this.cockpit.triggerBoostFlash(),this.thrusterTrails&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1),!0):!1}setupInputListeners(){window.addEventListener("keydown",e=>{if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.code){case"KeyW":this.playerShip.input.thrust||this.triggerBoostAction(),this.playerShip.input.thrust=!0;break;case"KeyS":this.playerShip.input.brake=!0;break;case"KeyA":this.playerShip.input.strafeLeft||dt.playStrafeBurst(),this.playerShip.input.strafeLeft=!0;break;case"KeyD":this.playerShip.input.strafeRight||dt.playStrafeBurst(),this.playerShip.input.strafeRight=!0;break;case"KeyQ":this.playerShip.input.rollLeft=!0;break;case"KeyE":this.playerShip.input.rollRight=!0;break;case"ArrowUp":this.playerShip.input.pitchUp=!0;break;case"ArrowDown":this.playerShip.input.pitchDown=!0;break;case"ArrowLeft":this.playerShip.input.yawLeft=!0;break;case"ArrowRight":this.playerShip.input.yawRight=!0;break;case"Space":this.isFiringCannon=!0,e.preventDefault();break;case"KeyF":this.weaponsSystem.triggerRearMine(this.playerShip);break}}),window.addEventListener("keyup",e=>{switch(e.code){case"KeyW":this.playerShip.input.thrust=!1;break;case"KeyS":this.playerShip.input.brake=!1;break;case"KeyA":this.playerShip.input.strafeLeft=!1;break;case"KeyD":this.playerShip.input.strafeRight=!1;break;case"KeyQ":this.playerShip.input.rollLeft=!1;break;case"KeyE":this.playerShip.input.rollRight=!1;break;case"ArrowUp":this.playerShip.input.pitchUp=!1;break;case"ArrowDown":this.playerShip.input.pitchDown=!1;break;case"ArrowLeft":this.playerShip.input.yawLeft=!1;break;case"ArrowRight":this.playerShip.input.yawRight=!1;break;case"Space":this.isFiringCannon=!1;break}}),this.renderer.domElement.addEventListener("mousedown",e=>{e.button===0?this.isFiringCannon=!0:e.button===2&&this.weaponsSystem.triggerRearMine(this.playerShip)}),window.addEventListener("mouseup",e=>{e.button===0&&(this.isFiringCannon=!1)}),this.renderer.domElement.addEventListener("contextmenu",e=>e.preventDefault()),this.renderer.domElement.addEventListener("click",()=>{var e,t;document.pointerLockElement||(t=(e=this.renderer.domElement).requestPointerLock)==null||t.call(e)}),document.addEventListener("pointerlockchange",()=>{this.isPointerLocked=document.pointerLockElement===this.renderer.domElement}),document.addEventListener("mousemove",e=>{this.isPointerLocked&&(this.playerShip.input.analogYaw=-e.movementX*this.mouseSensitivity*25,this.playerShip.input.analogPitch=-e.movementY*this.mouseSensitivity*25)})}onWindowResize(){if(!this.container||!this.renderer||!this.camera)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}start(){this.isRunning=!0,this.lastTime=performance.now(),this.loop()}stop(){this.isRunning=!1,this.animFrameId&&cancelAnimationFrame(this.animFrameId)}loop(){if(this.isRunning){this.animFrameId=requestAnimationFrame(this.loop.bind(this));try{ct.recordFrame();const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;e>0&&t>0&&(e!==this.lastWidth||t!==this.lastHeight)&&(this.lastWidth=e,this.lastHeight=t,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1));const n=performance.now(),s=Math.min(.1,(n-this.lastTime)/1e3);this.lastTime=n,this.isPointerLocked&&(this.playerShip.input.analogPitch*=.7,this.playerShip.input.analogYaw*=.7),this.playerShip.update(s),dt.updateListener(this.camera),dt.updateEngine(this.playerShip.input.thrust,this.playerShip.input.brake,s),(this.isFiringLaser||this.isFiringCannon)&&(this.timeSinceLastCombat=0),this.weaponsSystem.triggerPrimary(this.isFiringLaser,this.playerShip,n),this.weaponsSystem.triggerSecondary(this.isFiringCannon,this.playerShip,n),this.weaponsSystem.update(s,this.playerShip,this.remoteShips,(o,a,c)=>{this.timeSinceLastCombat=0,this.cockpit.triggerDamageFlash()}),this.blackHoleSystem&&this.blackHoleSystem.update(s,this.playerShip,this.remoteShips,this.spaceEnv,this.meteorSystem,o=>{this.cockpit.triggerDamageFlash(),this.onDeathNotice(o)}),this.powerUpSystem&&this.powerUpSystem.update(s,this.playerShip,o=>{this.onDeathNotice(o)});for(const[o,a]of this.network.peers.entries()){if(!o||typeof o!="string")continue;if(!this.remoteShips.has(o)){const l=(a==null?void 0:a.name)||`Pilot-${o.slice(0,4)}`,h=new ch(o,this.scene,l);this.remoteShips.set(o,h)}const c=this.remoteShips.get(o);c&&(a!=null&&a.lastState)&&c.receiveNetworkState(a.lastState),c&&c.update(s)}if(this.timeSinceLastCombat+=s,this.network.peers.size>0&&this.timeSinceLastCombat>=30){if(this.beaconPulseTimer+=s,this.beaconPulseTimer>=3.5){this.beaconPulseTimer=0,this.beaconSystem.emitRipple(this.playerShip.position,54527);for(const o of this.remoteShips.values())o.isDead||this.beaconSystem.emitRipple(o.position,16724821);dt.playEngagementBeacon(),ct.log("BEACON",`Engagement beacon pulse emitted across sector (inactivity: ${Math.round(this.timeSinceLastCombat)}s)`)}}else this.beaconPulseTimer=0;if(this.trailEmitTimer+=s,this.trailEmitTimer>=.12){this.trailEmitTimer=0,this.playerShip.input.thrust&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1);for(const o of this.remoteShips.values())if(!o.isDead&&o.isThrusting){const a=new U(0,0,-1).applyQuaternion(o.quaternion);this.thrusterTrails.emit(o.position,a,!0)}}if(this.thrusterTrails.update(s),this.beaconSystem.update(s),this.meteorSystem&&this.meteorSystem.update(s,this.playerShip,this.remoteShips,o=>{this.cockpit.triggerDamageFlash(),this.onDeathNotice(o)}),this.netStatsTimer+=s,this.netStatsTimer>=5){this.netStatsTimer=0;const o=Array.from(this.network.peers.entries());if(o.length===0)ct.log("NET_STATS",`Connected Peers: 0 | Inactivity: ${Math.round(this.timeSinceLastCombat)}s | Master: ${this.network.isMaster}`);else{const a=o.map(([c,l])=>{const h=this.remoteShips.get(c),u=h?Math.round(this.playerShip.position.distanceTo(h.position)):"N/A",f=l.packetsReceived?(l.packetsReceived/5).toFixed(1):"0.0",m=Date.now()-(l.lastSeen||Date.now());l.packetsReceived=0;const g=h?`(${h.position.x.toFixed(1)}, ${h.position.y.toFixed(1)}, ${h.position.z.toFixed(1)})`:"N/A";return`Peer[${c.slice(0,5)}]: ${f} pkt/s, ping ${l.ping||0}ms, seen ${m}ms ago, dist ${u}u, pos ${g}, inScene: ${h?!!h.group.parent:!1}`}).join(" | ");ct.log("NET_STATS",`Peers (${o.length}): ${a}`)}}const r={thrust:this.playerShip.input.thrust,brake:this.playerShip.input.brake,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),pitch:(this.playerShip.input.pitchUp?1:0)-(this.playerShip.input.pitchDown?1:0)+this.playerShip.input.analogPitch,roll:(this.playerShip.input.rollRight?1:0)-(this.playerShip.input.rollLeft?1:0)};this.cockpit.update(s,r,this.playerShip.velocity),this.spaceEnv.update(s,this.playerShip.position,this.playerShip.velocity),this.broadcastTimer+=s,this.broadcastTimer>=this.broadcastInterval&&(this.broadcastTimer=0,this.network.broadcastLocalState({pos:{x:this.playerShip.position.x,y:this.playerShip.position.y,z:this.playerShip.position.z},quat:{x:this.playerShip.quaternion.x,y:this.playerShip.quaternion.y,z:this.playerShip.quaternion.z,w:this.playerShip.quaternion.w},vel:{x:this.playerShip.velocity.x,y:this.playerShip.velocity.y,z:this.playerShip.velocity.z},thrust:this.playerShip.input.thrust,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),hp:this.playerShip.hp,shield:this.playerShip.shield,isDead:this.playerShip.isDead,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,isInvisible:this.playerShip.isInvisible})),this.renderer.render(this.scene,this.camera),this.onHudUpdate({hp:this.playerShip.hp,maxHp:this.playerShip.maxHp,shield:Math.round(this.playerShip.shield),maxShield:this.playerShip.maxShield,speed:Math.round(this.playerShip.getSpeed()),maxSpeed:Math.round(this.playerShip.maxSpeed),laserEnergy:Math.round(this.weaponsSystem.laserEnergy),laserMaxEnergy:this.weaponsSystem.laserMaxEnergy,laserRecharging:this.weaponsSystem.laserCooldownTimer<=0&&this.weaponsSystem.laserEnergy<this.weaponsSystem.laserMaxEnergy,cannonEnergy:Math.round(this.weaponsSystem.cannonEnergy),cannonMaxEnergy:this.weaponsSystem.cannonMaxEnergy,cannonRecharging:this.weaponsSystem.cannonCooldownTimer<=0&&this.weaponsSystem.cannonEnergy<this.weaponsSystem.cannonMaxEnergy,safeRadius:Math.round(this.blackHoleSystem?this.blackHoleSystem.getSafeRadius():1e3),matchTimeRemaining:Math.max(0,Math.round(this.blackHoleSystem?this.blackHoleSystem.getMatchTimeRemaining():600)),isShieldBroken:this.playerShip.isShieldBroken,isInvisible:this.playerShip.isInvisible,hasHologramDecoy:this.playerShip.hasHologramDecoy,alivePilotsCount:[this.playerShip,...this.remoteShips.values()].filter(o=>!o.isDead).length,isVictoryRoyale:this.network.peers.size>0&&!this.playerShip.isDead&&Array.from(this.remoteShips.values()).every(o=>o.isDead),isDead:this.playerShip.isDead,respawnCountdown:Math.ceil(this.playerShip.respawnTimer),invulnerable:this.playerShip.invulnerableTimer>0,boostReady:this.playerShip.boostCooldownTimer<=0,boostCooldown:Math.ceil(this.playerShip.boostCooldownTimer),inactivityBeacon:this.network.peers.size>0&&this.timeSinceLastCombat>=30,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,activePeersCount:this.network.peers.size+1,isMaster:this.network.isMaster,masterId:this.network.currentMasterId,avgPing:this.network.getAveragePing()})}catch(e){ct.log("CRASH",`Render loop exception: ${e.message}
${e.stack}`)}}}destroy(){this.stop(),this.weaponsSystem&&this.weaponsSystem.cleanup(),this.thrusterTrails&&this.thrusterTrails.cleanup(),this.beaconSystem&&this.beaconSystem.cleanup(),this.meteorSystem&&this.meteorSystem.cleanup(),this.blackHoleSystem&&this.blackHoleSystem.cleanup(),this.powerUpSystem&&this.powerUpSystem.cleanup(),this.renderer&&this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}class wy{constructor(e,t){this.container=e,this.engine=t,this.hudElement=null,this.createDom(),this.bindJoystick(),this.bindTouchControls(),this.bindFullscreen(),this.bindDiagnostics();const n=document.getElementById("hud-room-title");n&&this.engine&&this.engine.network&&(n.textContent=this.engine.network.roomName||this.engine.network.roomId||"Orion Sector")}createDom(){this.hudElement=document.createElement("div"),this.hudElement.className="game-hud-overlay",this.hudElement.innerHTML=`
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
              <span class="meter-label">LASER [SHIELD]</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-laser" id="hud-laser-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-laser-pct">100%</span>
            </div>

            <div class="hud-compact-meter meter-cannon">
              <span class="meter-label">CANNON [HULL/DIG]</span>
              <div class="meter-track">
                <div class="gauge-bar-fill bar-cannon" id="hud-cannon-bar" style="width: 100%;"></div>
              </div>
              <span class="meter-val" id="hud-cannon-pct">100%</span>
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

          <!-- Dual Forward Arsenals -->
          <div class="touch-weapon-cluster">
            <button class="action-touch-btn btn-laser" id="btn-laser" title="Hold to Fire Laser Beam / Hologram Decoy (Space / LMB)">
              ⚡ <strong>LASER</strong>
              <small class="weapon-subtext">[SHIELD]</small>
            </button>
            <button class="action-touch-btn btn-cannon" id="btn-cannon" title="Hold to Fire Kinetic Cannon / Dig Asteroids (F / RMB)">
              🔥 <strong>CANNON</strong>
              <small class="weapon-subtext">[HULL/DIG]</small>
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
    `,this.container.appendChild(this.hudElement)}bindJoystick(){const e=document.getElementById("touch-joystick-container"),t=document.getElementById("joystick-base"),n=document.getElementById("joystick-knob");if(!e||!t||!n)return;const s=this.engine.playerShip.input,r=45;let o=null,a=!1;const c=(h,u)=>{const f=t.getBoundingClientRect(),m=f.left+f.width/2,g=f.top+f.height/2;let _=h-m,p=u-g;const d=Math.sqrt(_*_+p*p);d>r&&(_=_/d*r,p=p/d*r),n.style.transform=`translate(${_}px, ${p}px)`,s.analogPitch=-(p/r),s.analogYaw=-(_/r)},l=()=>{o=null,a=!1,n.style.transform="translate(0px, 0px)",s.analogPitch=0,s.analogYaw=0};e.addEventListener("touchstart",h=>{if(h.preventDefault(),h.stopPropagation(),o===null&&h.touches.length>0){const u=h.touches[0];o=u.identifier,c(u.clientX,u.clientY),ct.log("TOUCH",`Joystick touchstart at (${Math.round(u.clientX)}, ${Math.round(u.clientY)})`)}},{passive:!1}),e.addEventListener("touchmove",h=>{if(h.preventDefault(),h.stopPropagation(),o!==null){for(let u=0;u<h.touches.length;u++)if(h.touches[u].identifier===o){c(h.touches[u].clientX,h.touches[u].clientY);break}}},{passive:!1}),e.addEventListener("touchend",h=>{h.preventDefault(),l()},{passive:!1}),e.addEventListener("touchcancel",h=>{l()},{passive:!1}),e.addEventListener("pointerdown",h=>{h.pointerType!=="touch"&&(h.preventDefault(),a=!0,c(h.clientX,h.clientY))}),window.addEventListener("pointermove",h=>{a&&c(h.clientX,h.clientY)}),window.addEventListener("pointerup",()=>{a&&l()})}bindTouchControls(){const e=this.engine.playerShip.input,t=(r,o,a)=>{const c=document.getElementById(r);if(!c)return;let l=!1;const h=f=>{f&&(f.preventDefault(),f.stopPropagation()),!l&&(l=!0,o(),c.classList.add("active"),ct.log("INPUT",`Button [${r}] ACTIVATED`))},u=f=>{l&&(l=!1,a(),c.classList.remove("active"),ct.log("INPUT",`Button [${r}] RELEASED`))};c.addEventListener("touchstart",h,{passive:!1}),c.addEventListener("touchend",u,{passive:!1}),c.addEventListener("touchcancel",u,{passive:!1}),c.addEventListener("pointerdown",f=>{f.pointerType!=="touch"&&h(f)}),c.addEventListener("pointerup",u),c.addEventListener("pointerleave",u),window.addEventListener("pointerup",u)};t("btn-roll-left",()=>e.rollLeft=!0,()=>e.rollLeft=!1),t("btn-roll-right",()=>e.rollRight=!0,()=>e.rollRight=!1),t("btn-strafe-left",()=>{dt.playStrafeBurst(),e.strafeLeft=!0},()=>e.strafeLeft=!1),t("btn-strafe-right",()=>{dt.playStrafeBurst(),e.strafeRight=!0},()=>e.strafeRight=!1),t("btn-thrust",()=>{this.engine.triggerBoostAction(),e.thrust=!0},()=>e.thrust=!1),t("btn-brake",()=>e.brake=!0,()=>e.brake=!1),t("btn-laser",()=>this.engine.isFiringLaser=!0,()=>this.engine.isFiringLaser=!1),t("btn-cannon",()=>this.engine.isFiringCannon=!0,()=>this.engine.isFiringCannon=!1);const n=document.getElementById("hud-btn-copy");n&&n.addEventListener("click",()=>{const r=window.location.origin+window.location.pathname+`?room=${encodeURIComponent(this.engine.network.roomId)}`;navigator.clipboard.writeText(r).then(()=>{n.textContent="✅ Copied!",setTimeout(()=>n.textContent="📋 Invite",2e3)}).catch(()=>{prompt("Share this match link:",r)})});const s=document.getElementById("hud-btn-leave");s&&s.addEventListener("click",()=>{confirm("Leave current match and return to lobby?")&&(window.location.href=window.location.origin+window.location.pathname)})}bindDiagnostics(){const e=document.getElementById("hud-btn-diag"),t=document.getElementById("hud-diag-backdrop"),n=document.getElementById("btn-close-diag"),s=document.getElementById("btn-copy-diag-text"),r=document.getElementById("diag-text-display");!e||!t||(e.addEventListener("click",()=>{r&&(r.textContent=ct.generateDiagnosticReport()),t.style.display="flex"}),n&&n.addEventListener("click",()=>{t.style.display="none"}),s&&s.addEventListener("click",async()=>{await ct.copyToClipboard(),s.textContent="✅ Copied to Clipboard!",setTimeout(()=>{s.textContent="📋 Copy Log to Clipboard"},2500)}))}bindFullscreen(){const e=document.getElementById("hud-btn-fullscreen"),t=document.getElementById("btn-rotate-fullscreen"),n=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement){const r=document.documentElement;r.requestFullscreen?r.requestFullscreen().catch(()=>{}):r.webkitRequestFullscreen&&r.webkitRequestFullscreen();try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}else document.exitFullscreen?document.exitFullscreen().catch(()=>{}):document.webkitExitFullscreen&&document.webkitExitFullscreen()};e&&e.addEventListener("click",n),t&&t.addEventListener("click",n);const s=()=>{const r=!!(document.fullscreenElement||document.webkitFullscreenElement);e&&(e.textContent=r?"⛶ Exit":"⛶ Fullscreen")};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}showCombatMessage(e){const t=document.getElementById("hud-combat-feed");if(!t)return;const n=document.createElement("div");n.className="combat-feed-item",n.textContent=e,t.appendChild(n),setTimeout(()=>{n.classList.add("fade-out"),setTimeout(()=>n.remove(),400)},3500)}update(e){const t=document.getElementById("hud-room-title");t&&(t.textContent=this.engine.network.roomName||"Orion Sector");const n=document.getElementById("hud-peers-count");n&&(n.textContent=`👥 ${e.activePeersCount} Pilot${e.activePeersCount===1?"":"s"}`);const s=document.getElementById("hud-ping-val");s&&(s.textContent=`📡 ${e.avgPing}ms`);const r=document.getElementById("hud-shield-bar"),o=document.getElementById("hud-shield-num"),a=Math.round((e.shield!==void 0?e.shield:100)/(e.maxShield||100)*100);r&&(r.style.width=`${a}%`),o&&(o.textContent=`${a}%`);const c=document.getElementById("hud-hp-bar"),l=document.getElementById("hud-hp-num"),h=Math.round(e.hp/e.maxHp*100);c&&(c.style.width=`${h}%`,c.className=h>35?"gauge-bar-fill bar-hp":"gauge-bar-fill bar-hp bar-hp-critical"),l&&(l.textContent=`${h}%`);const u=document.getElementById("hud-beacon-pill");u&&(u.style.display=e.inactivityBeacon?"inline-flex":"none");const f=document.getElementById("hud-shield-status");f&&(e.invulnerable?(f.textContent="🛡️ INVULNERABLE",f.style.color="#00ffff"):e.hp<=35?(f.textContent="CRITICAL",f.style.color="#ff3344"):(f.textContent="ACTIVE",f.style.color="#00ff88"));const m=document.getElementById("hud-score-val");m&&(m.textContent=e.score);const g=document.getElementById("hud-kills-val");g&&(g.textContent=e.kills);const _=document.getElementById("hud-deaths-val");_&&(_.textContent=e.deaths);const p=document.getElementById("hud-speed-val");p&&(p.textContent=e.speed);const d=document.getElementById("hud-boost-badge"),v=document.getElementById("btn-thrust");d&&(e.boostReady?(d.textContent="⚡ BOOST",d.className="hud-boost-badge ready",v&&v.classList.add("boost-ready")):(d.textContent=`${e.boostCooldown}s`,d.className="hud-boost-badge cooling",v&&v.classList.remove("boost-ready")));const y=document.getElementById("hud-timer-val");if(y&&e.matchTimeRemaining!==void 0){const N=Math.floor(e.matchTimeRemaining/60),P=e.matchTimeRemaining%60;y.textContent=`${N.toString().padStart(2,"0")}:${P.toString().padStart(2,"0")}`}const x=document.getElementById("hud-safe-val");x&&e.safeRadius!==void 0&&(x.textContent=`${e.safeRadius}u`);const R=document.getElementById("hud-alive-val");R&&e.alivePilotsCount!==void 0&&(R.textContent=e.alivePilotsCount);const T=document.getElementById("hud-shield-title");T&&(e.isShieldBroken?(T.textContent="SHIELD [BROKEN]",T.style.color="#ff3344"):(T.textContent="SHIELD",T.style.color="#00ffff"));const A=document.getElementById("hud-laser-bar"),L=document.getElementById("hud-laser-pct");A&&(A.style.width=`${e.laserEnergy||0}%`),L&&(L.textContent=`${e.laserEnergy||0}%`);const w=document.getElementById("hud-cannon-bar"),M=document.getElementById("hud-cannon-pct");w&&(w.style.width=`${e.cannonEnergy||0}%`),M&&(M.textContent=`${e.cannonEnergy||0}%`);const I=document.getElementById("hud-powerup-badge");I&&(e.isInvisible?(I.style.display="inline-flex",I.textContent="👁️ CLOAKED",I.className="hud-powerup-badge cloak"):e.hasHologramDecoy?(I.style.display="inline-flex",I.textContent="👥 DECOY ARMED",I.className="hud-powerup-badge decoy"):I.style.display="none");const W=document.getElementById("hud-victory-banner");W&&(W.style.display=e.isVictoryRoyale?"block":"none");const S=document.getElementById("hud-respawn-overlay"),D=document.getElementById("hud-respawn-counter");S&&D&&(e.isDead?(S.style.display="flex",D.textContent=`Respawning in ${e.respawnCountdown}s...`):S.style.display="none")}destroy(){this.hudElement&&this.hudElement.parentNode&&this.hudElement.parentNode.removeChild(this.hudElement)}}const Ko=document.getElementById("app"),lh=["Nebula-Orion","Andromeda-Deep","Centauri-Prime","Cygnus-Rift","Cassiopeia-Void","Pegasus-Belt","Vela-Pulsar","Perseus-Arm"];function hh(){const i=lh[Math.floor(Math.random()*lh.length)],e=Math.floor(100+Math.random()*900);return`${i}-${e}`}class Ey{constructor(){this.currentMode="lobby",this.engine=null,this.network=null,this.hud=null,this.playerName=localStorage.getItem("rockets_pilot_name")||`Pilot-${Math.floor(1e3+Math.random()*9e3)}`,this.init()}init(){const t=new URLSearchParams(window.location.search).get("room");t?this.startMatch({roomId:t,roomName:t,mapSeed:Math.abs(this.hashCode(t))}):this.renderLobby()}hashCode(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return t}renderLobby(){this.currentMode="lobby",Ko.innerHTML=`
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
    `;const e=document.getElementById("pilot-name-input");e&&e.addEventListener("input",h=>{this.playerName=h.target.value.trim()||"Pilot",localStorage.setItem("rockets_pilot_name",this.playerName)});let t=window.__pwaDeferredPrompt;const n=document.getElementById("pwa-install-banner"),s=document.getElementById("btn-pwa-install");t&&n&&(n.style.display="flex"),window.addEventListener("beforeinstallprompt",h=>{h.preventDefault(),window.__pwaDeferredPrompt=h,n&&(n.style.display="flex")}),s&&s.addEventListener("click",()=>{const h=window.__pwaDeferredPrompt;h&&(h.prompt(),h.userChoice.then(()=>{n&&(n.style.display="none")}))});const r=document.getElementById("btn-create-match"),o=document.getElementById("sector-name-input");r&&r.addEventListener("click",()=>{const h=o.value.trim()||hh(),u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const a=document.getElementById("btn-direct-join"),c=document.getElementById("join-room-input");a&&a.addEventListener("click",()=>{const h=c.value.trim();if(!h){alert("Please enter a Room Code or Sector ID to join.");return}const u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const l=document.getElementById("btn-refresh-rooms");l&&l.addEventListener("click",()=>{ui.refreshRooms()}),ui.init(),ui.onRoomsUpdated(h=>{this.updateRoomsListUI(h)})}updateRoomsListUI(e){const t=document.getElementById("rooms-list-container");if(!t)return;if(!e||e.length===0){t.innerHTML='<div class="rooms-empty">No active matches found. Click <strong>LAUNCH SECTOR</strong> above to host one!</div>';return}t.innerHTML=e.map(s=>`
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
    `).join(""),t.querySelectorAll(".btn-join-room-item").forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-room-id"),o=s.getAttribute("data-room-name"),a=parseInt(s.getAttribute("data-seed"),10)||42;this.startMatch({roomId:r,roomName:o,mapSeed:a})})})}startMatch({roomId:e,roomName:t,mapSeed:n}){this.currentMode="game",Ko.innerHTML="";const s=document.createElement("div");s.id="game-canvas-container",s.style.width="100%",s.style.height="100%",s.style.position="relative",s.style.overflow="hidden",Ko.appendChild(s);const r=`${window.location.pathname}?room=${encodeURIComponent(e)}`;window.history.pushState({path:r},"",r),this.network=new Jf({roomId:e,roomName:t,mapSeed:n,playerName:this.playerName,onCombatLog:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.engine=new Sy({container:s,network:this.network,mapSeed:n,onHudUpdate:o=>{this.hud&&this.hud.update(o)},onDeathNotice:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.hud=new wy(s,this.engine);try{this.network.join()}catch(o){console.error("[Network] joinRoom exception:",(o==null?void 0:o.message)||o)}this.engine.start()}}function Zo(i){return i?i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}new Ey;
//# sourceMappingURL=index-nMtLe9z8.js.map
