var Ku=Object.defineProperty;var Zu=(i,e,t)=>e in i?Ku(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var Vt=(i,e,t)=>Zu(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const ja=Object.freeze,Wn=0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,Bs=0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,dh=0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,fh=0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,Ju=ja({p:Wn,n:Bs,h:1n,a:0n,b:7n,Gx:dh,Gy:fh}),cn=32,wc=i=>i instanceof Uint8Array||ArrayBuffer.isView(i)&&i.constructor.name==="Uint8Array"&&i.BYTES_PER_ELEMENT===1,Jt=(i,e,t="")=>{if(wc(i)&&(e===void 0||i.length===e))return i;const n=wc(i),s=e!==void 0?` of length ${e}`:"",r=n?`length=${i.length}`:`type=${typeof i}`,o=(t?`"${t}" `:"")+"expected Uint8Array"+s+", got "+r;throw n?new RangeError(o):new TypeError(o)},Qu=i=>Uint8Array.from(i),ed=(i,e,t)=>Qu(Jt(i,t,e)),ph=(i,e)=>i.toString(16).padStart(e,"0"),mh=i=>{let e="";for(const t of Jt(i))e+=ph(t,2);return e},gh=i=>{const e="hex invalid";if(typeof i!="string")throw new TypeError(e);if(i.length%2||!/^[\da-f]*$/i.test(i))throw new RangeError(e);const t=new Uint8Array(i.length/2);for(let n=0,s=0;n<t.length;n++,s+=2){const r=i.charCodeAt(s),o=i.charCodeAt(s+1);t[n]=((r&15)+(r>>6)*9)*16+(o&15)+(o>>6)*9}return t},Ec=()=>{var e;const i=(e=globalThis==null?void 0:globalThis.crypto)==null?void 0:e.subtle;if(i)return i;throw new Error("crypto.subtle must be defined, consider polyfill")},Ki=(...i)=>{let e=0;for(const s of i)e+=Jt(s).length;const t=new Uint8Array(e);let n=0;for(const s of i)t.set(s,n),n+=s.length;return t},Ka=(i=cn)=>{const e=globalThis==null?void 0:globalThis.crypto;if(typeof(e==null?void 0:e.getRandomValues)!="function")throw new Error("crypto.getRandomValues must be defined, consider polyfill");return e.getRandomValues(new Uint8Array(i))},td=BigInt,zs=(i,e,t,n="bad number: out of range")=>{if(typeof i!="bigint")throw new TypeError(n);if(e<=i&&i<t)return i;throw new RangeError(n)},Ce=(i,e=Wn)=>(i%=e)>=0n?i:e+i,Gr=i=>Ce(i,Bs),nd=(i,e)=>{if(i===0n)throw new Error("invert: expected non-zero number");if(e<=1n)throw new Error("invert: expected modulus > 1, got "+e);let t=Ce(i,e),n=e,s=0n,r=1n;for(;t!==0n;){const a=n/t,c=n-t*a,l=s-r*a;n=t,t=c,s=r,r=l}if(n!==1n)throw new Error("invert: does not exist");return Ce(s,e)},vh=i=>{const e=od[i];if(typeof e!="function")throw new Error("hashes."+i+" not set");return e},Tc=(i,e,t)=>Jt(vh(i)(e,t),cn,"digest"),bc=async(i,e,t)=>Jt(await vh(i)(e,t),cn,"digest"),to=i=>{if(i instanceof jn)return i;throw new TypeError("Point expected")},no="bad point: not on curve",yh=i=>Ce(Ce(i*i)*i+7n),Ac=i=>zs(i,0n,Wn),Rs=i=>zs(i,1n,Wn),_h=i=>zs(i,1n,Bs),Hr=i=>!(i&1n),id=i=>Uint8Array.of(Hr(i)?2:3),xh=i=>{const e=yh(Rs(i));let t=1n;for(let n=e,s=(Wn+1n)/4n;s>0n;s>>=1n)s&1n&&(t=t*n%Wn),n=n*n%Wn;if(Ce(t*t)!==e)throw new Error("sqrt invalid");return new jn(i,Hr(t)?t:Ce(-t),1n)},wn=class wn{constructor(e,t,n){Vt(this,"X");Vt(this,"Y");Vt(this,"Z");this.X=Ac(e),this.Y=Rs(t),this.Z=Ac(n),ja(this)}static CURVE(){return Ju}static fromAffine(e){const{x:t,y:n}=e;return t===0n&&n===0n?Cs:new wn(t,n,1n)}static fromBytes(e){Jt(e);const t=e.length,n=e[0],s=Nr(e,1,33);try{if(t===33&&(n===2||n===3)){const r=xh(s);return n===3?r.negate():r}if(t===65&&n===4)return new wn(s,Nr(e,33,65),1n).assertValidity()}catch{throw new Error(no)}throw new Error(no)}static fromHex(e){return wn.fromBytes(gh(e))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){const{X:t,Y:n,Z:s}=this,{X:r,Y:o,Z:a}=to(e);return Ce(t*a)===Ce(r*s)&&Ce(n*a)===Ce(o*s)}is0(){return this.Z===0n}negate(){return new wn(this.X,Ce(-this.Y),this.Z)}double(){return this.add(this)}add(e){const{X:t,Y:n,Z:s}=this,{X:r,Y:o,Z:a}=to(e),c=0n,l=7n;let h=0n,d=0n,p=0n;const m=Ce(l*3n);let y=Ce(t*r),g=Ce(n*o),f=Ce(s*a),u=Ce(t+n),v=Ce(r+o);u=Ce(u*v),v=Ce(y+g),u=Ce(u-v),v=Ce(t+s);let x=Ce(r+a);return v=Ce(v*x),x=Ce(y+f),v=Ce(v-x),x=Ce(n+s),h=Ce(o+a),x=Ce(x*h),h=Ce(g+f),x=Ce(x-h),p=Ce(c*v),h=Ce(m*f),p=Ce(h+p),h=Ce(g-p),p=Ce(g+p),d=Ce(h*p),g=Ce(y+y),g=Ce(g+y),f=Ce(c*f),v=Ce(m*v),g=Ce(g+f),f=Ce(y-f),f=Ce(c*f),v=Ce(v+f),y=Ce(g*v),d=Ce(d+y),y=Ce(x*v),h=Ce(u*h),h=Ce(h-y),y=Ce(u*g),p=Ce(x*p),p=Ce(p+y),new wn(h,d,p)}subtract(e){return this.add(to(e).negate())}multiply(e,t=!0){if(!t&&e===0n)return Cs;if(_h(e),e===1n)return this;if(this.equals(gi))return pd(e).p;let n=Cs,s=gi,r=this;for(let o=0;t?o<256:e>0n;o++)e&1n?n=n.add(r):t&&(s=s.add(r)),r=r.double(),e>>=1n;return n}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){const{X:e,Y:t,Z:n}=this;if(n===0n)return{x:0n,y:0n};if(n===1n)return{x:e,y:t};const s=nd(n,Wn);if(Ce(n*s)!==1n)throw new Error("inverse invalid");return{x:Ce(e*s),y:Ce(t*s)}}assertValidity(){const{x:e,y:t}=this.toAffine();if(Rs(e),Rs(t),Ce(t*t)!==yh(e))throw new Error(no);return this}toBytes(e=!0){const{x:t,y:n}=this.assertValidity().toAffine(),s=Rn(t);return e?Ki(id(n),s):Ki(Uint8Array.of(4),s,Rn(n))}toHex(e){return mh(this.toBytes(e))}};Vt(wn,"BASE"),Vt(wn,"ZERO");let jn=wn;const gi=new jn(dh,fh,1n),Cs=new jn(0n,1n,0n);jn.BASE=gi;jn.ZERO=Cs;const sd=(i,e,t)=>gi.multiply(e,!1).add(i.multiply(t,!1)).assertValidity(),Si=i=>td("0x"+(mh(i)||"0")),Nr=(i,e,t)=>Si(i.subarray(e,t)),Rn=i=>gh(ph(zs(i,0n,2n**256n),cn*2)),rd=i=>{const e=Si(Jt(i,cn,"secret key"));return zs(e,1n,Bs,"invalid secret key: outside of range")},Rc="SHA-256",od={hmacSha256Async:async(i,e)=>{const t=Ec(),n=await t.importKey("raw",i,{name:"HMAC",hash:Rc},!1,["sign"]);return new Uint8Array(await t.sign("HMAC",n,e))},hmacSha256:void 0,sha256Async:async i=>new Uint8Array(await Ec().digest(Rc,i)),sha256:void 0},ad=i=>{if(i=i===void 0?Ka(48):i,Jt(i),i.length<48||i.length>1024)throw new RangeError("expected 48-1024b");const e=Ce(Si(i),Bs-1n);return Rn(e+1n)},cd=i=>e=>{const t=ad(e);return{secretKey:t,publicKey:i(t)}},Mh=i=>Uint8Array.from("BIP0340/"+i,e=>e.charCodeAt(0)),Zo=(i,...e)=>{const t=Tc("sha256",Mh(i));return Tc("sha256",Ki(t,t,...e))},Jo=(i,...e)=>bc("sha256Async",Mh(i)).then(t=>bc("sha256Async",Ki(t,t,...e))),Za=i=>{const e=rd(i),t=gi.multiply(e),{x:n,y:s}=t.assertValidity().toAffine(),r=Hr(s)?e:Gr(-e),o=Rn(n);return{d:r,px:o}},Ja=i=>Gr(Si(i)),Sh=(...i)=>Ja(Zo("challenge",...i)),wh=async(...i)=>Ja(await Jo("challenge",...i)),Eh=i=>Za(i).px,ld=cd(Eh),Th=(i,e,t)=>{const n=ed(i,"message"),{px:s,d:r}=Za(e);return{m:n,px:s,d:r,a:Jt(t,cn)}},bh=i=>{const e=Ja(i);if(e===0n)throw new Error("sign failed: k is zero");const{px:t,d:n}=Za(Rn(e));return{rx:t,k:n}},Ah=(i,e,t,n)=>Ki(e,Rn(Gr(i+t*n))),Rh="invalid signature produced",hd=(i,e,t=Ka(cn))=>{const{m:n,px:s,d:r,a:o}=Th(i,e,t),a=Rn(r^Si(Zo("aux",o))),{rx:c,k:l}=bh(Zo("nonce",a,s,n)),h=Ah(l,c,Sh(c,s,n),r);if(!Ph(h,n,s))throw new Error(Rh);return h},ud=async(i,e,t=Ka(cn))=>{const{m:n,px:s,d:r,a:o}=Th(i,e,t),a=Rn(r^Si(await Jo("aux",o))),{rx:c,k:l}=bh(await Jo("nonce",a,s,n)),h=Ah(l,c,await wh(c,s,n),r);if(!await Lh(h,n,s))throw new Error(Rh);return h},dd=(i,e)=>i instanceof Promise?i.then(e):e(i),Ch=(i,e,t,n)=>{const s=Jt(i,64,"signature"),r=Jt(e,void 0,"message"),o=Jt(t,cn,"publicKey");let a,c,l,h;try{const d=Si(o);a=xh(d),c=Rs(Nr(s,0,cn)),l=_h(Nr(s,cn,64)),h=Ki(Rn(c),o,r)}catch{return!1}return dd(n(h),d=>{try{const{x:p,y:m}=sd(a,l,Gr(-d)).toAffine();return!(!Hr(m)||p!==c)}catch{return!1}})},Ph=(i,e,t)=>Ch(i,e,t,Sh),Lh=async(i,e,t)=>Ch(i,e,t,wh),Dh=ja({keygen:ld,getPublicKey:Eh,sign:hd,verify:Ph,signAsync:ud,verifyAsync:Lh}),fd=()=>{const i=[];let e=gi,t=e;for(let n=0;n<33;n++){t=e,i.push(t);for(let s=1;s<128;s++)t=t.add(e),i.push(t);e=t.double()}return i};let Cc;const Pc=(i,e)=>{const t=e.negate();return i?t:e},pd=i=>{const e=Cc||(Cc=fd());let t=Cs,n=gi;for(let s=0;s<33;s++){let r=Number(i&255n);i>>=8n,r>128&&(r-=256,i+=1n);const o=s*128,a=o+Math.abs(r)-1,c=s%2!==0,l=r<0;r===0?n=n.add(Pc(c,e[o])):t=t.add(Pc(l,e[a]))}if(i!==0n)throw new Error("invalid wnaf");return{p:t,f:n}},{floor:Qo,min:md,sin:gd}=Math,Pt="Trystero",Qa=(i,e)=>Array(i).fill(void 0).map(e),vd="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",wi=i=>Qa(i,()=>vd[Qo(Math.random()*62)]??"").join(""),Ct=wi(20),Ei=Promise.all.bind(Promise),Ih=typeof window<"u",{entries:Zi,fromEntries:Uh,keys:on,values:Mn}=Object,St=()=>{},Nh="candidate",Ye=i=>(i!==null&&clearTimeout(i),null),qe=i=>new Error(`${Pt}: ${i}`),Ji=(i,e)=>i instanceof Error&&i.message?i.message:typeof i=="string"&&i?i:Ft(i??e),Hn=(i,e)=>i instanceof Error?i:qe(Ji(i,e)),yd=new TextEncoder,_d=new TextDecoder,En=i=>yd.encode(i),mi=i=>_d.decode(i),Us=i=>i.reduce((e,t)=>e+t.toString(16).padStart(2,"0"),""),Qi=(...i)=>i.join("@"),xd=(i,e)=>{const t=[...i],n=()=>{const r=gd(e++)*1e4;return r-Qo(r)};let s=t.length;for(;s;){const r=Qo(n()*s--),o=t[s];t[s]=t[r],t[r]=o}return t},Md=(i,e,t,n=!1)=>{var s,r;return((s=i.relayConfig)==null?void 0:s.urls)||(n?xd(e,Fh(i.appId)):e).slice(0,((r=i.relayConfig)==null?void 0:r.redundancy)??t)},Ft=JSON.stringify,Vs=i=>{try{return JSON.parse(i)}catch{throw qe(`failed to parse JSON: ${i}`)}},Fh=(i,e=Number.MAX_SAFE_INTEGER)=>i.split("").reduce((t,n)=>t+n.charCodeAt(0),0)%e,Lc=3333,Sd=6e4,ds={};let Ps=null,Ls=null;const wd=()=>{Ps||(Ps=new Promise(i=>{Ls=i}).finally(()=>{Ls=null,Ps=null}))},Ed=()=>{Ls==null||Ls()},Td=(i,e,t)=>{const n={};let s=!1,r=!1,o,a=St;n.isClosed=!1,n.ready=new Promise(l=>a=l);const c=()=>{if(n.isClosed)return;o=void 0,r=!1;const l=new WebSocket(i);l.onclose=()=>{if(n.isClosed||r)return;if(r=!0,Ps){Ps.then(c);return}const h=ds[i]??(ds[i]=Lc);o=setTimeout(c,Math.random()*h),ds[i]=md(h*2,Sd)},l.onmessage=h=>e(String(h.data)),n.socket=l,n.url=l.url,l.onopen=()=>{const h=s;s=!0,a(n),ds[i]=Lc,h&&(t==null||t())},n.send=h=>{l.readyState===1&&l.send(h)}};return n.close=()=>{n.isClosed=!0,o!==void 0&&(clearTimeout(o),o=void 0),n.socket.close()},c(),n},bd=i=>{const e={},t=new WeakMap,n=o=>{const a=t.get(o);if(!a)throw qe("relay bookkeeping missing registration for relay client");return a},s=()=>{const o={},a=c=>o[c]??(o[c]={});return{forKey:a,forRelay:c=>a(n(c))}},r=(o,a)=>(e[o]=a,t.set(a,o),a);return{register:(o,a)=>{const c=e[o];return c||r(o,a())},keyOf:n,scoped:s,getSockets:()=>Uh(Zi(e).flatMap(([o,a])=>{const c=i(a);return c?[[o,c]]:[]}))}},Ad=()=>{if(Ih){const i=new AbortController;return addEventListener("online",Ed,{signal:i.signal}),addEventListener("offline",wd,{signal:i.signal}),()=>i.abort()}return St},ec="AES-GCM",io={},Rd=i=>btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(i)))),Cd=i=>{const e=atob(i);return new Uint8Array(e.length).map((t,n)=>e.charCodeAt(n)).buffer},Wr=async(i,e)=>new Uint8Array(await crypto.subtle.digest(i,En(e))),es=async i=>io[i]??(io[i]=Array.from(await Wr("SHA-1",i)).map(e=>e.toString(36)).join("")),Pd=async(i,e,t)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},En(`${i}:${e}:${t}`)),{name:ec},!1,["encrypt","decrypt"]),Ld=async(i,e)=>Us(await Wr("SHA-256",`${Pt}:${i}:${e}`)),Oh="$",kh=",",Dd=async(i,e)=>{const t=crypto.getRandomValues(new Uint8Array(16));return t.join(kh)+Oh+Rd(await crypto.subtle.encrypt({name:ec,iv:t},await i,En(e)))},Id=async(i,e)=>{const[t,n]=e.split(Oh);return mi(await crypto.subtle.decrypt({name:ec,iv:new Uint8Array((t==null?void 0:t.split(kh).map(Number))??[])},await i,Cd(n??"")))},Ud=18e4;var Nd=class{constructor(i){Vt(this,"makeOffer");Vt(this,"leased",new Map);Vt(this,"destroyed",!1);this.makeOffer=i}claimLeased(i){const e=this.leased.get(i);e&&(Ye(e),this.leased.delete(i))}reclaimLeased(i){this.leased.has(i)&&(this.claimLeased(i),i.destroy())}checkout(i,e,t){const n=async(s=!1)=>{if(this.destroyed)throw qe("room left while preparing offer");const r=this.makeOffer();try{const o=await t(r);if(this.destroyed)throw qe("room left while preparing offer");return e?(this.leased.set(r,setTimeout(()=>{this.leased.delete(r),r.destroy()},Ud)),{peer:r,offer:o,claim:()=>this.claimLeased(r),reclaim:()=>this.reclaimLeased(r)}):{peer:r,offer:o}}catch(o){if(r.destroy(),!s&&!this.destroyed)return n(!0);throw o}};return Ei(Qa(i,()=>n()))}getOffers(i,e){return this.checkout(i,!0,e)}destroy(){this.destroyed=!0,this.leased.forEach((i,e)=>{Ye(i),e.destroy()}),this.leased.clear()}};const so=qe("incorrect password for overlapping room"),Fd=(i,e,t)=>{const n=o=>Wr("SHA-256",`${o}:${i}:${e}:${t}`).then(Us),s=async(o,a,c)=>{if(!i)return;if(c){const h=wi(36);await o({__trystero_pw:"challenge",c:h});const{data:d}=await a();if(!d||typeof d!="object"||d.__trystero_pw!=="response"||typeof d.h!="string")throw so;const p=await n(h);if(d.h!==p)throw so;return}const{data:l}=await a();if(!l||typeof l!="object"||l.__trystero_pw!=="challenge"||typeof l.c!="string")throw so;await o({__trystero_pw:"response",h:await n(l.c)})};return{run:s,compose:o=>i||o?async(a,c,l,h)=>{await s(c,l,h),await(o==null?void 0:o(a,c,l,h))}:void 0}},Od=i=>{const e=Ji(i,"unknown error");return e.startsWith("handshake ")?e:`handshake failed: ${e}`},kd=({onPeerHandshake:i,onHandshakeError:e,handshakeTimeoutMs:t,sendHandshakeData:n,sendHandshakeReady:s,onActivate:r,onFailure:o})=>{const a={},c=(d,p)=>{const m=a[d];!m||p&&m.peer!==p||m.isActive||!m.didLocalHandshakePass||!m.didReceiveRemoteReady||(m.isActive=!0,m.handshakeTimer=Ye(m.handshakeTimer),r(d,m.peer))},l=(d,p,m)=>{const y=a[d];if(!y||y.peer!==p)return;const g=Od(m);e==null||e(d,g),o(d,p,qe(g))},h=(d,p)=>{const m=a[d];!m||m.peer!==p||m.isActive||(m.didLocalHandshakePass=!0,s("",d).catch(y=>l(d,p,qe(`failed sending handshake readiness: ${Ji(y,"unknown send failure")}`))),c(d,p))};return{addPeer:(d,p)=>{a[d]={peer:p,isActive:!1,didLocalHandshakePass:!1,didReceiveRemoteReady:!1,handshakeTimer:null,pendingHandshakePayloads:[],handshakeWaiters:[]}},clearPeer:(d,p)=>{const m=a[d];m&&(m.handshakeTimer=Ye(m.handshakeTimer),m.pendingHandshakePayloads.length=0,m.handshakeWaiters.splice(0).forEach(y=>y.reject(p)),delete a[d])},canReceiveFromPeer:(d,p)=>{const m=a[d];return!!(m&&(m.isActive||p))},start:(d,p)=>{const m=a[d];if(!m||m.peer!==p)return;m.handshakeTimer=setTimeout(()=>l(d,p,qe(`handshake timed out after ${t}ms`)),t);const y=async(u,v)=>{await n(u,d,v)},g=()=>new Promise((u,v)=>{const x=a[d];if(!x||x.peer!==p){v(qe("peer disconnected during handshake"));return}const _=x.pendingHandshakePayloads.shift();if(_){u(_);return}x.handshakeWaiters.push({resolve:u,reject:A=>v(A)})}),f=Ct<d;Promise.resolve(i==null?void 0:i(d,y,g,f)).then(()=>h(d,p)).catch(u=>l(d,p,Hn(u,"handshake failed")))},receiveHandshakeData:(d,p,m)=>{const y=a[p];if(!y||y.isActive)return;const g=m===void 0?{data:d}:{data:d,metadata:m},f=y.handshakeWaiters.shift();if(f){f.resolve(g);return}if(y.pendingHandshakePayloads.length>=16){l(p,y.peer,qe("too many pending handshake messages"));return}y.pendingHandshakePayloads.push(g)},receiveHandshakeReady:d=>{const p=a[d];!p||p.isActive||(p.didReceiveRemoteReady=!0,c(d))}}},Bh=16384,ea=1e4,Fr=12e4,Bd=15e3,zd=150,Vd=5e3,Dc="icecandidate",Ic="icegatheringstatechange",Gd="iceconnectionstatechange",fs="offer",Hd="answer",Wd=/out of range/i,Xd=128,qd=8192,Uc=i=>i.replace(/ (\S+\.local) (\d+) typ host/g," 127.0.0.1 $2 typ host");var Nc=(i,{trickleIce:e,rtcConfig:t,rtcPolyfill:n,turnConfig:s,_test_only_mdnsHostFallbackToLoopback:r})=>{const o=new(n??RTCPeerConnection)({iceServers:Fc.concat(s??[]),...t}),a={},c=new Set,l=[],h=[];let d=null;const p=e!==!1,m=[],y=[];let g,f=!1,u=!1,v=null,x=null,_=!1;const A=Y=>{g&&(g(Y),g=void 0)},T=()=>x=Ye(x),R=()=>{var Y;_||(_=!0,c.forEach(ee=>ee()),d=Ye(d),h.length=0,T(),(Y=a.close)==null||Y.call(a))},P=Y=>{Y.type===fs&&(A(Y),!a.signal&&!o.remoteDescription)||(a.signal?a.signal(Y):l.push(Y))},w=Y=>{const ee=a.signal;a.signal=ue=>{ee==null||ee(ue),Y(ue)},l.length>0&&l.splice(0).forEach(ue=>{var k;return(k=a.signal)==null?void 0:k.call(a,ue)})},M=Y=>r?Uc(Y):Y,D=Y=>{if(!r||typeof Y.candidate!="string")return Y;const ee=Uc(Y.candidate);return ee===Y.candidate?Y:{...Y,candidate:ee}},G=Y=>{var ee,ue;return{type:((ee=Y.localDescription)==null?void 0:ee.type)??fs,sdp:M(((ue=Y.localDescription)==null?void 0:ue.sdp)??"")}},S=()=>{var ee,ue;const Y=(ee=o.remoteDescription)==null?void 0:ee.sdp;return Y?((ue=Y.match(/a=ice-ufrag:([^\s]+)/))==null?void 0:ue[1])??null:null},L=()=>{var Y,ee;return(((ee=(Y=o.remoteDescription)==null?void 0:Y.sdp)==null?void 0:ee.match(/^m=/gm))??[]).length},F=Y=>{if(!o.remoteDescription)return!1;const ee=L();if(typeof Y.sdpMLineIndex=="number"&&ee>0&&Y.sdpMLineIndex>=ee)return!1;const ue=S();return!(ue&&Y.usernameFragment&&Y.usernameFragment!==ue)},I=async Y=>{try{return await o.addIceCandidate(Y),!0}catch(ee){if(ee instanceof Error&&Wd.test(ee.message)&&typeof Y.sdpMLineIndex=="number")return!1;throw ee}},z=Y=>{m.length>=Xd&&m.shift(),m.push(Y)},O=async()=>{if(!o.remoteDescription||m.length===0)return;const Y=S(),ee=m.splice(0),ue=[];for(const k of ee)if(!(Y&&k.usernameFragment&&k.usernameFragment!==Y)){if(!F(k)){ue.push(k);continue}await I(k)||ue.push(k)}ue.forEach(z)},U=async Y=>{if(F(Y)){await I(Y)||z(Y);return}z(Y)},B=Y=>{Y.binaryType="arraybuffer",Y.bufferedAmountLowThreshold=65535;const ee=()=>{console.warn(`${Pt}: invalid or excessive data before handler registration; disconnecting peer`),Y.close(),o.close(),R()};Y.onmessage=ue=>{const k=ue.data;if(!_){if(!(k instanceof ArrayBuffer)&&!ArrayBuffer.isView(k)||k.byteLength>16515){ee();return}if(a.data)a.data(k);else{if(h.length>=64){ee();return}d||(d=setTimeout(ee,ea)),h.push(k)}}},Y.onopen=()=>{var ue;return(ue=a.connect)==null?void 0:ue.call(a)},Y.onclose=R,Y.onerror=({error:ue})=>{var k;_||(ue==null?void 0:ue.errorDetail)==="sctp-failure"&&(ue.sctpCauseCode===12||/^User-Initiated Abort\b/.test(ue.message))||(k=a.error)==null||k.call(a,Hn(ue,"data channel error"))}},Z=(t==null?void 0:t.iceServers)??Fc.concat(s??[]),le=Y=>Z.some(({urls:ee})=>(Array.isArray(ee)?ee:[ee]).some(ue=>Y.test(ue))),fe=le(/^turns?:/i),X=!fe&&le(/^stuns?:/i),Q=fe?/\btyp relay\b/:X?/\btyp (?:srflx|relay|prflx)\b/:/\btyp (?:host|srflx|relay|prflx)\b/,oe=async Y=>(await new Promise(ee=>{let ue=null,k=null;const Fe=()=>{Ye(ue),Ye(k),Y.removeEventListener(Ic,ke),Y.removeEventListener(Dc,Ee),c.delete(Fe),ee()},Ne=(Te="")=>{var C;const ge=`${((C=Y.localDescription)==null?void 0:C.sdp)??""}
${Te}`;Q.test(ge)&&(Ye(k),k=setTimeout(Fe,zd))},ke=()=>{Y.iceGatheringState==="complete"||_?Fe():Ne()},Ee=Te=>{const{candidate:ge}=Te;ge?Ne(ge.candidate):Fe()};c.add(Fe),ue=setTimeout(Fe,Bd),Y.addEventListener(Ic,ke),Y.addEventListener(Dc,Ee),ke()}),G(Y)),re=async()=>{const Y=p?G(o):await oe(o);return _||P(Y),Y};i?(v=o.createDataChannel("data"),B(v)):o.ondatachannel=({channel:Y})=>{v=Y,B(Y)};const Me=async(Y=!1)=>{var ee,ue;if(o.connectionState==="closed"||!Y&&(f||o.signalingState!=="stable")){o.connectionState==="closed"&&A();return}try{return f=!0,Y&&(o.remoteDescription&&o.signalingState!=="stable"&&o.signalingState!=="closed"&&((ee=o.localDescription)==null?void 0:ee.type)===fs&&await o.setLocalDescription({type:"rollback"}),typeof o.restartIce=="function"&&o.restartIce()),await o.setLocalDescription(Y?await o.createOffer({iceRestart:!0}):void 0),await re()}catch(k){Y||A(),(ue=a.error)==null||ue.call(a,Hn(k,"failed to create local offer"))}finally{f=!1}};o.onnegotiationneeded=async()=>Me(!1),o.onicecandidate=({candidate:Y})=>{if(!p||!Y)return;const ee=D(typeof Y.toJSON=="function"?Y.toJSON():{candidate:Y.candidate,sdpMid:Y.sdpMid,sdpMLineIndex:Y.sdpMLineIndex,usernameFragment:Y.usernameFragment});P({type:Nh,sdp:JSON.stringify(ee)})};const Pe=()=>{if(o.connectionState==="failed"||o.connectionState==="closed"||o.iceConnectionState==="failed"||o.iceConnectionState==="closed"){R();return}if(o.connectionState==="connected"||o.connectionState==="connecting"||o.iceConnectionState==="connected"||o.iceConnectionState==="completed"||o.iceConnectionState==="checking"){T();return}if(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected"){x||(x=setTimeout(()=>{x=null,(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected")&&R()},Vd));return}};o.onconnectionstatechange=Pe,o.addEventListener(Gd,Pe),o.ontrack=Y=>{var ue,k;const ee=Y.streams[0];if(ee){if(!a.track&&!a.stream){y.push({track:Y.track,stream:ee});return}(ue=a.track)==null||ue.call(a,Y.track,ee),(k=a.stream)==null||k.call(a,ee)}};const Ue=i?new Promise(Y=>{g=Y}):Promise.resolve();return i&&queueMicrotask(()=>{var Y;!f&&o.signalingState==="stable"&&!o.localDescription&&o.connectionState!=="closed"&&((Y=o.onnegotiationneeded)==null||Y.call(o,new Event("negotiationneeded")))}),{connection:o,get channel(){return v},get isDead(){return o.connectionState==="closed"},getOffer:async(Y=!1)=>{var ee;if(i)return Y?Me(!0):g?Ue:((ee=o.localDescription)==null?void 0:ee.type)===fs?p?G(o):oe(o):Ue},async signal(Y){var ee,ue,k;if(Y.type==="candidate"){if(Y.sdp.length>qd)return;try{const Fe=JSON.parse(Y.sdp);Fe&&typeof Fe=="object"&&await U(D(Fe))}catch(Fe){(ee=a.error)==null||ee.call(a,Hn(Fe,"failed to parse remote candidate"))}return}if(!((v==null?void 0:v.readyState)==="open"&&!((ue=Y.sdp)!=null&&ue.includes("a=rtpmap"))))try{const Fe={...Y,sdp:M(Y.sdp)};if(Y.type===fs){const Ne=f||o.signalingState!=="stable"&&!u;return Ne&&i?void 0:(Ne&&o.signalingState!=="stable"?await Ei([o.setLocalDescription({type:"rollback"}),o.setRemoteDescription(Fe)]):await o.setRemoteDescription(Fe),await O(),await o.setLocalDescription(),await re())}if(Y.type===Hd){u=!0;try{await o.setRemoteDescription(Fe),await O()}finally{u=!1}}}catch(Fe){(k=a.error)==null||k.call(a,Hn(Fe,"failed to apply remote signal"))}},sendData:Y=>v==null?void 0:v.send(Y),destroy:()=>{T(),A(),v==null||v.close(),o.close(),f=!1,u=!1,R()},setHandlers:Y=>{const{signal:ee,...ue}=Y;Object.assign(a,ue),a.data&&h.length>0&&(d=Ye(d),h.splice(0).forEach(k=>{var Fe;return(Fe=a.data)==null?void 0:Fe.call(a,k)})),ee&&w(ee),(a.track||a.stream)&&y.length>0&&y.splice(0).forEach(({track:k,stream:Fe})=>{var Ne,ke;(Ne=a.track)==null||Ne.call(a,k,Fe),(ke=a.stream)==null||ke.call(a,Fe)})},addStream:Y=>Y.getTracks().forEach(ee=>o.addTrack(ee,Y)),removeStream:Y=>o.getSenders().filter(ee=>ee.track&&Y.getTracks().includes(ee.track)).forEach(ee=>o.removeTrack(ee)),addTrack:(Y,ee)=>o.addTrack(Y,ee),removeTrack:Y=>{const ee=o.getSenders().find(ue=>ue.track===Y);ee&&o.removeTrack(ee)},replaceTrack:(Y,ee)=>{const ue=o.getSenders().find(k=>k.track===Y);if(ue)return ue.replaceTrack(ee)}}};const Fc=[...Qa(3,(i,e)=>`stun:stun${e||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(i=>({urls:i})),$d=1024,Yd=64,jd=128,Kd=8,Zd=new Uint8Array,Jd=(i,e)=>{let t;try{t=i()}catch{return e(!1)}return typeof t=="boolean"?e(t):Promise.resolve(t).then(n=>e(n===!0),()=>e(!1))},Oc=(i,e,t)=>e===2?t?i.slice():i:e===1?Vs(mi(i)):mi(i),zh=(i,e,t,n)=>{try{i.progress(e,t,n)}catch(s){console.error(`${Pt} progress handler error:`,s)}},kc=(i,e,t,n)=>{var s;zh(i,1,t,n);try{(s=i.receiver)==null||s.call(i,e,t,n)}catch(r){console.error(`${Pt} action handler error:`,r)}},Qd=({fail:i,accept:e,refuse:t,maxReceiveBytes:n,chunkSize:s})=>{const r=new Map,o=new Map,a=new Set,c=new Map;let l=0,h=0,d=0,p=!1,m=!1;const y=S=>S.phase!=="released",g=S=>Math.min(n,(S==null?void 0:S.maxPayloadBytes)??n),f=(S,L,F,I)=>{var z,O;F==null||F.reject(L),(O=(z=r.get(S.type))==null?void 0:z.reject)==null||O.call(z,S.peerId,S.metadata,L),I!==void 0&&t(S.peerId,I,L)},u=S=>{for(const L of Array.from(a))L.peerId===S&&(a.delete(L),a.add(L))},v=S=>{var F,I;if(!y(S))return;S.phase="released",(F=S.removeAbortListener)==null||F.call(S),S.timer=Ye(S.timer);const L=o.get(S.peerId);if(S.kind==="inline"){const z=L.inline.get(S.key);z.splice(z.indexOf(S),1),z.length||L.inline.delete(S.key),S.data=Zd}else L.bulk.delete(S.id),a.delete(S),S.data=null,S.transfer==="receiving"&&(d-=S.size,L.active===S&&(L.active=null,u(S.peerId)),m=!0);L.count--,l--,L.count||o.delete(S.peerId),(I=S.controller)==null||I.abort()},x=(S,L)=>{y(S)&&(v(S),f(S,L,S.scope,S.kind==="bulk"?S.id:void 0))},_=(S,L)=>{if(S.phase!=="pending")return S.phase==="ready";if(S.size>g(L))return x(S,"payload exceeds receiver size limit"),!1;const F=S.scope?S.scope.receive:L.receive;if(!F)return L.receiver?(S.phase="ready",!0):!1;if(h>=jd||(c.get(S.peerId)??0)>=Kd)return x(S,"too many pending receive decisions"),!1;S.phase="deciding";const I=new AbortController;S.controller=I,h++,c.set(S.peerId,(c.get(S.peerId)??0)+1);const z=Jd(()=>F({byteLength:S.size,peerId:S.peerId,signal:I.signal,...S.metadata===void 0?{}:{metadata:S.metadata}}),O=>{h--;const U=c.get(S.peerId)-1;return U?c.set(S.peerId,U):c.delete(S.peerId),y(S)?(O?S.phase="ready":x(S,"payload rejected by receiver"),O):!1});return typeof z=="boolean"?z:(z.then(()=>w()),!1)},A=(S,L,F)=>{let I;try{I=Oc(F,S.format,S.kind==="inline")}catch{v(S),i(S.peerId,"invalid action payload");return}v(S),kc(L,I,S.peerId,S.metadata)},T=S=>{const L=r.get(S.type);y(S)&&L&&_(S,L)&&L.receiver&&A(S,L,S.data)},R=S=>{const L=r.get(S.type);if(!y(S)||!L||!_(S,L)||!L.receiver)return;if(S.transfer==="receiving"){S.offset===S.size&&A(S,L,S.data);return}const F=o.get(S.peerId);!F.active&&d+S.size<=n&&(F.active=S,S.transfer="receiving",d+=S.size,S.lastSeen=Date.now(),a.delete(S),e(S.peerId,S.id))},P=(S,L)=>{var I;const F=(I=o.get(S))==null?void 0:I.inline.get(L);for(;F!=null&&F[0];){const z=F[0];if(T(z),y(z))break}},w=()=>{if(p){m=!0;return}p=!0;try{do{m=!1;for(const S of a)R(S);for(const[S,L]of o){for(const F of L.bulk.values())F.offset===F.size&&R(F);for(const F of L.inline.keys())P(S,F)}}while(m)}finally{p=!1}},M=S=>{let L=o.get(S.peerId);if(l>=$d||((L==null?void 0:L.count)??0)>=Yd)return f(S,"too many pending transfers",S.scope,S.kind==="bulk"?S.id:void 0),!1;if(L||(L={bulk:new Map,inline:new Map,active:null,count:0},o.set(S.peerId,L)),L.count++,l++,S.kind==="inline"){const I=L.inline.get(S.key)??[];I.push(S),L.inline.set(S.key,I)}else L.bulk.set(S.id,S),a.add(S);const F=()=>{const I=Fr-(Date.now()-S.lastSeen);I>0?S.timer=setTimeout(F,I):(x(S,"action transfer timed out"),w())};if(S.timer=setTimeout(F,Fr),S.scope){const{signal:I}=S.scope,z=()=>{x(S,"receive cancelled"),w()};if(I.addEventListener("abort",z,{once:!0}),S.removeAbortListener=()=>I.removeEventListener("abort",z),I.aborted)return z(),!1}return!0},D=(S,L)=>{var z;const F=r.get(S.type),I=(z=F==null?void 0:F.receiveScope)==null?void 0:z.call(F,S.peerId,S.metadata);return I===null||I!=null&&I.signal.aborted?(L!==void 0&&t(S.peerId,L,"unexpected response"),null):S.size>g(F)?(f(S,"payload exceeds receiver size limit",I,L),null):{action:F,scope:I}},G=(S,L)=>({...S,...L?{scope:L}:{},phase:"pending",controller:null,lastSeen:Date.now(),timer:null});return{register:(S,L={})=>{const F={...L,receiver:null,receive:null,reject:null,progress:St};return r.set(S,F),{onMessage:I=>{F.receiver=I,w()},onReceive:I=>{F.receive=I,w()},onReject:I=>{F.reject=I},onProgress:I=>{F.progress=I}}},receiveInline:(S,L)=>{var B;const F=D(S);if(!F)return;const{action:I,scope:z}=F,O=z?`${S.type}\0${z.key}`:S.type;if(I!=null&&I.receiver&&!(z?z.receive:I.receive)&&!((B=o.get(S.peerId))!=null&&B.inline.has(O))){let Z;try{Z=Oc(L,S.format,!0)}catch{i(S.peerId,"invalid action payload");return}kc(I,Z,S.peerId,S.metadata);return}const U={...G(S,z),kind:"inline",key:O,data:L};M(U)&&P(S.peerId,O)},receiveOffer:(S,L)=>{var z;if((z=o.get(S.peerId))!=null&&z.bulk.has(L)){i(S.peerId,"duplicate action offer");return}const F=D(S,L);if(!F)return;const I={...G(S,F.scope),kind:"bulk",id:L,transfer:"waiting",offset:0,data:null};M(I)&&w()},receiveChunk:(S,L,F,I)=>{var B;const z=o.get(S),O=z==null?void 0:z.bulk.get(L);if(!O)return;if(O.transfer!=="receiving"||F!==O.offset||!I.length||I.length!==Math.min(s,O.size-O.offset)){i(S,"invalid action chunk offset or length");return}try{O.data??(O.data=new Uint8Array(O.size))}catch{x(O,"unable to allocate receive buffer"),w();return}O.data.set(I,O.offset),O.offset+=I.length;const U=Date.now();O.lastSeen=U;for(const Z of a)Z.phase==="ready"&&((B=r.get(Z.type))!=null&&B.receiver)&&(Z.lastSeen=U);O.offset===O.size?(R(O),y(O)&&(z==null?void 0:z.active)===O&&(z.active=null,u(S)),w()):zh(r.get(O.type),O.offset/O.size,S,O.metadata)},cancel:(S,L)=>{var I,z;const F=(I=o.get(S))==null?void 0:I.bulk.get(L);F&&(v(F),(z=F.scope)==null||z.reject("response cancelled by sender")),w()},clearPeer:S=>{const L=o.get(S);if(L){for(const F of L.bulk.values())v(F);for(const F of L.inline.values()){const I=[...F];for(const z of I)v(z)}}w()}}},ta=2,Ks=0,Zs=1,Bc=2,ro=3,oo=4,Js=5,ao=36,zc=48,Bn=6,Es=14,co=Bh-Es,ef=256*1024**2,Vc=1024**2,Gc="bufferedamountlow",Hc="close",Wc="error",tf=1e4,zn=(i,e)=>{const t=qe(e);return t.kind=i,t.name=i==="aborted"?"AbortError":t.name,t},na=i=>{if(i!=null&&i.aborted)throw zn("aborted","operation aborted")},Xc=(i,e,t=Bn)=>{const n=new Uint8Array(t);return n[0]=ta,n[1]=i,new DataView(n.buffer).setUint32(2,e),n},Ai=zn,nf=(i,e,t=tf)=>i.readyState!=="open"||i.bufferedAmount<=i.bufferedAmountLowThreshold?Promise.resolve(i.readyState==="open"):new Promise(n=>{let s=!1,r=null;const o=l=>{s||(s=!0,i.removeEventListener(Gc,a),i.removeEventListener(Hc,c),i.removeEventListener(Wc,c),e==null||e.removeEventListener("abort",c),Ye(r),n(l))},a=()=>o(!0),c=()=>o(!1);if(i.addEventListener(Gc,a),i.addEventListener(Hc,c),i.addEventListener(Wc,c),e==null||e.addEventListener("abort",c,{once:!0}),r=setTimeout(()=>o(!1),t),i.readyState!=="open"||e!=null&&e.aborted){o(!1);return}i.bufferedAmount<=i.bufferedAmountLowThreshold&&o(!0)}),sf=({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,throwIfAborted:s=na,maxReceiveBytes:r=ef})=>{if(!Number.isSafeInteger(r)||r<=0)throw qe("maxReceiveBytes must be a positive safe integer");const o=new Map,a=new Map,c=new WeakSet;let l=0;const h=Qd({fail:(f,u)=>p(f,u),accept:(f,u)=>m(f,u,ro),refuse:(f,u,v)=>m(f,u,oo,v),maxReceiveBytes:r,chunkSize:co}),d=f=>{var u;for(const v of((u=a.get(f))==null?void 0:u.values())??[])v.fail(Ai("disconnected","peer disconnected"));a.delete(f),h.clearPeer(f)},p=(f,u)=>{const v=i(f,!0);v&&!c.has(v)&&(c.add(v),console.warn(`${Pt}: ${u}; disconnecting peer ${f}`),n(f,qe(u)))},m=(f,u,v,x="")=>{var R;const _=i(f,!0);if(!_)return;const A=En(x).subarray(0,200),T=Xc(v,u,Bn+A.length);T.set(A,Bn);try{if((((R=_.channel)==null?void 0:R.bufferedAmount)??0)>Vc)throw qe("control send buffer is full");_.sendData(T)}catch{p(f,"unable to send action control")}};return{makeInternalAction:(f,u={})=>{const v={sendToPending:!!u.sendToPending,receiveWhilePending:!!u.receiveWhilePending,...u.maxPayloadBytes===void 0?{}:{maxPayloadBytes:u.maxPayloadBytes},...u.receiveScope?{receiveScope:u.receiveScope}:{}},x=o.get(f);if(x){if(x.options.sendToPending!==v.sendToPending||x.options.receiveWhilePending!==v.receiveWhilePending||x.options.receiveScope!==v.receiveScope||x.options.maxPayloadBytes!==v.maxPayloadBytes)throw qe(`action type "${f}" cannot be redefined`);return x.action}const _=En(f);if(!f||f.includes("\0")||_.length>32)throw qe("action type must contain 1–32 UTF-8 bytes and no null characters");const A={options:v,action:{...h.register(f,v),send:async(T,R,P,w,M)=>{if(s(M),T===void 0)throw qe("action data cannot be undefined");const D=T instanceof Blob,G=D||T instanceof ArrayBuffer||ArrayBuffer.isView(T),S=G?2:typeof T=="string"?0:1;let L=D?T:T instanceof ArrayBuffer?new Uint8Array(T):ArrayBuffer.isView(T)?new Uint8Array(T.buffer,T.byteOffset,T.byteLength):En(S===0?T:Ft(T));const F=L instanceof Blob?L.size:L.byteLength,I=P===void 0?new Uint8Array:En(Ft(P));if(I.length>16336)throw qe("action metadata is too large");const z=ao+I.length+F<=Bh;!z&&G&&!(L instanceof Blob)&&(L=L.slice());const O=z?0:l++>>>0,U=z?ao:zc,B=new Uint8Array(U+I.length+(z?F:0));B[0]=ta,B[1]=(z?Ks:Zs)|S<<4,B.set(_,2);const Z=new DataView(B.buffer);Z.setUint16(34,I.length),z||(Z.setUint32(36,O),Z.setFloat64(40,F)),B.set(I,U),z&&B.set(L instanceof Blob?new Uint8Array(await L.arrayBuffer()):L,U+I.length);const le=R?Array.isArray(R)?R:[R]:e(v.sendToPending);await Ei([...new Set(le)].map(async fe=>{const X=i(fe,v.sendToPending);if(!X){console.warn(`${Pt}: no peer with id ${fe} found`);return}let Q=null;const oe=()=>{var Te;if(Q)throw Q;if(s(M),i(fe,v.sendToPending)!==X||((Te=X.channel)==null?void 0:Te.readyState)==="closed")throw Ai("disconnected","peer disconnected")},re=async Te=>{oe();const ge=X.channel;if(ge&&(ge.readyState!=="open"||ge.bufferedAmount>ge.bufferedAmountLowThreshold)){if(!await nf(ge,M))throw s(M),Ai("disconnected","data channel stopped draining");oe()}try{X.sendData(Te)}catch{throw Ai("disconnected","peer disconnected")}};if(z){await re(B),w==null||w(1,fe,P);return}let Me=!1,Pe=!1,Ue=Date.now(),Y,ee;const ue=new Promise((Te,ge)=>{Y=Te,ee=ge});ue.catch(St);const k=a.get(fe)??new Map;if(k.has(O))throw qe("action transmission id is still in use");a.set(fe,k);let Fe=null;const Ne={accept:()=>!Fe||Q?!1:(Fe=Ye(Fe),Y(),!0),fail:(Te,ge=!1)=>{ge&&(Pe=!0),Q=Te,ee(Te)},touch:()=>{Fe&&(Ue=Date.now())}};k.set(O,Ne);const ke=()=>{const Te=Fr-(Date.now()-Ue);Te>0?Fe=setTimeout(ke,Te):Ne.fail(Ai("timeout","action offer timed out"))};Fe=setTimeout(ke,Fr);const Ee=()=>{try{s(M)}catch(Te){Ne.fail(Te)}};M==null||M.addEventListener("abort",Ee,{once:!0});try{await re(B),Me=!0,await ue;for(let Te=0;Te<F;Te+=co){oe();const ge=Math.min(co,F-Te),C=Xc(Bc,O,Es+ge);new DataView(C.buffer).setFloat64(Bn,Te),C.set(L instanceof Blob?new Uint8Array(await L.slice(Te,Te+ge).arrayBuffer()):L.subarray(Te,Te+ge),Es),await re(C);for(const E of k.values())E.touch();w==null||w((Te+ge)/F,fe,P)}oe()}catch(Te){throw Me&&!Pe&&i(fe,!0)===X&&(!X.channel||X.channel.readyState==="open"&&(X.channel.bufferedAmount??0)<=Vc)&&m(fe,O,Js),Te}finally{Fe=Ye(Fe),M==null||M.removeEventListener("abort",Ee),k.delete(O),!k.size&&a.get(fe)===k&&a.delete(fe)}}))}}};return o.set(f,A),A.action},handleData:(f,u)=>{var F,I,z;if(u.byteLength<2||u.byteLength>16384){p(f,"invalid action frame");return}const v=new Uint8Array(u);if(v[0]!==ta){p(f,"incompatible action protocol version");return}const x=v[1]&15,_=v[1]>>>4,A=new DataView(v.buffer,v.byteOffset,v.byteLength);if(x>Js||_>2||x>Zs&&_!==0){p(f,"invalid action frame");return}if(x>=Bc){if(v.length<Bn||(x===ro||x===Js)&&v.length!==Bn||x===oo&&v.length>206){p(f,"invalid action control");return}const O=A.getUint32(2);if(x===ro){const U=a.get(f);if((F=U==null?void 0:U.get(O))!=null&&F.accept())for(const B of U.values())B.touch();return}if(x===oo){(z=(I=a.get(f))==null?void 0:I.get(O))==null||z.fail(Ai("rejected",mi(v.subarray(Bn))),!0);return}x===Js?h.cancel(f,O):h.receiveChunk(f,O,v.length>=Es?A.getFloat64(Bn):NaN,v.subarray(Es));return}const T=x===Ks?ao:zc;if(v.length<T){p(f,"invalid action header");return}const R=mi(v.subarray(2,34)).replaceAll("\0",""),P=o.get(R);if(!t(f,!!(P!=null&&P.options.receiveWhilePending)))return;const w=A.getUint16(34),M=T+w,D=x===Ks?v.length-M:A.getFloat64(40),G=x===Zs?A.getUint32(36):0;if(!R||M>v.length||!Number.isSafeInteger(D)||D<0||x===Zs&&(D===0||M!==v.length)){p(f,"invalid action proposal");return}let S;try{w&&(S=Vs(mi(v.subarray(T,M))))}catch{p(f,"invalid action metadata");return}const L={peerId:f,type:R,format:_,size:D,...S===void 0?{}:{metadata:S}};x===Ks?h.receiveInline(L,v.subarray(M)):h.receiveOffer(L,G)},clearPeer:d}},Vh=i=>i&&typeof i=="object"&&!Array.isArray(i)&&typeof i.r=="string"?i:null,Qs=i=>{const e=Vh(i);return e?{r:e.r,...Object.hasOwn(e,"m")?{m:e.m}:{}}:null},lo=i=>{const e=Vh(i);return e?{r:e.r,...typeof e.e=="string"?{e:e.e}:{}}:null},ps=(i,e)=>e===void 0?i:{...i,metadata:e},rf=({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,maxReceiveBytes:s})=>{const r=Object.create(null),o={},a=new Map,c=sf({getPeer:i,getPeerIds:e,canReceiveFromPeer:t,onPeerError:n,...s===void 0?{}:{maxReceiveBytes:s}}),l=c.makeInternalAction,h=c.handleData,d=f=>{const u=o[f];u&&(Ye(u.timer),u.signal&&u.abortHandler&&u.signal.removeEventListener("abort",u.abortHandler),delete o[f],u.controller.abort())},p=(f,u)=>{Zi(o).forEach(([v,x])=>{x.peerId===f&&(d(v),x.reject(u))})},m=(f,u)=>{c.clearPeer(f);const v=a.get(f);v&&(a.delete(f),v.forEach(x=>x.abort())),p(f,zn("disconnected",Ji(u,"peer disconnected")))},y=l("@_response",{receiveScope:(f,u)=>{const v=lo(u),x=v&&o[v.r];if(!v||!x||x.peerId!==f)return null;const _=v.e===void 0?x.getReceive():null;return{key:v.r,signal:x.controller.signal,receive:_?A=>_({byteLength:A.byteLength,peerId:A.peerId,kind:"response",signal:A.signal}):null,reject:A=>{o[v.r]===x&&(d(v.r),x.reject(zn("rejected",A)))}}}});return y.onProgress((f,u,v)=>{var A;const x=lo(v),_=x&&o[x.r];_&&_.peerId===u&&(x==null?void 0:x.e)===void 0&&((A=_.getReceiveProgress())==null||A(f,{peerId:u}))}),y.onMessage((f,u,v)=>{const x=lo(v);if(!x)return;const _=o[x.r];if(!(!_||_.peerId!==u)){if(d(x.r),x.e!==void 0){_.reject(zn("rejected",x.e));return}_.resolve(f)}}),{makeAction:(f,u)=>{if(u&&"onRequest"in u&&u.kind!=="request")throw qe('request actions must use kind: "request"');const v=(u==null?void 0:u.kind)??"message",x=l(f),_=r[f];if(_){if(_.kind!==v)throw qe(`action type "${f}" cannot be redefined`);return _.action}const A={kind:v,action:null,onReceive:(u==null?void 0:u.onReceive)??null,onReceiveProgress:(u==null?void 0:u.onReceiveProgress)??null},T=(S,L)=>S?(F,I)=>S(F,ps({peerId:I},L)):void 0,R=(S,L,F)=>{var z;const I=A.kind==="request"?Qs(F):null;(z=A.onReceiveProgress)==null||z.call(A,S,ps({peerId:L},I?I.m:F))},P=S=>{A.onReceive=S,x.onReceive(S?L=>{const F=v==="request"?Qs(L.metadata):null;return S(ps({byteLength:L.byteLength,peerId:L.peerId,signal:L.signal,kind:v},F?F.m:L.metadata))}:null)};if(P(A.onReceive),x.onProgress(R),v==="message"){let S=(u==null?void 0:u.onMessage)??null;const L=(I,z,O)=>{const U=S;Promise.resolve().then(()=>U(I,ps({peerId:z},O))).catch(B=>console.error(`${Pt} action handler error:`,B))},F={send:async(I,z={})=>{await x.send(I,z.target,z.metadata,T(z.onProgress,z.metadata),z.signal)},get onMessage(){return S},set onMessage(I){S=I,x.onMessage(I?L:null)},get onReceive(){return A.onReceive},set onReceive(I){P(I)},get onReceiveProgress(){return A.onReceiveProgress},set onReceiveProgress(I){A.onReceiveProgress=I}};return A.action=F,r[f]=A,x.onMessage(S?L:null),F}x.onReject((S,L,F)=>{const I=Qs(L);I&&y.send(null,S,{r:I.r,e:F}).catch(St)});let w=(u==null?void 0:u.onRequest)??null;const M=(S,L,F)=>{const I=Qs(F);if(!I)return;const z=w,O=new AbortController;let U=a.get(L);U||(U=new Set,a.set(L,U)),U.add(O),Promise.resolve().then(async()=>{const B=await z(S,{...ps({peerId:L},I.m),signal:O.signal});if(B===void 0)throw qe("request handler returned undefined");return B}).then(B=>y.send(B,L,{r:I.r}),B=>y.send(null,L,{r:I.r,e:Ji(B,"request failed").slice(0,512)})).catch(St).finally(()=>{const B=a.get(L);B==null||B.delete(O),B&&!B.size&&a.delete(L),O.abort()})},D=async(S,L)=>{const{target:F,metadata:I,onProgress:z,signal:O,timeoutMs:U}=L;if(na(O),!i(F,!1))throw zn("disconnected",`no active peer with id ${F}`);const B=wi(20),Z=new AbortController,le=new Promise((fe,X)=>{const Q={controller:Z,getReceive:()=>A.onReceive,getReceiveProgress:()=>A.onReceiveProgress,peerId:F,resolve:fe,reject:X,timer:null,...O===void 0?{}:{signal:O}},oe=()=>{d(B),X(zn("aborted","operation aborted"))};O&&(Q.abortHandler=oe,O.addEventListener("abort",oe,{once:!0})),o[B]=Q,U!==void 0&&(Q.timer=setTimeout(()=>{d(B),Q.reject(zn("timeout","request timed out"))},U))});try{const fe=x.send(S,F,I===void 0?{r:B}:{r:B,m:I},T(z,I),Z.signal);return await Promise.race([le,fe.then(()=>le)])}finally{d(B)}},G={request:D,requestMany:async(S,L)=>{const{targets:F,onResult:I,...z}=L;return na(z.signal),await Ei(F.map(async O=>{try{const U={peerId:O,status:"fulfilled",value:await D(S,{...z,target:O})};return I==null||I(U),U}catch(U){const B=Hn(U,"request failed");if(B.kind==="aborted"||!B.kind)throw B;const Z=B.kind==="timeout"?{peerId:O,status:"timeout"}:B.kind==="disconnected"?{peerId:O,status:"disconnected"}:{peerId:O,status:"rejected",error:B};return I==null||I(Z),Z}}))},get onRequest(){return w},set onRequest(S){w=S,x.onMessage(S?M:null)},get onReceive(){return A.onReceive},set onReceive(S){P(S)},get onReceiveProgress(){return A.onReceiveProgress},set onReceiveProgress(S){A.onReceiveProgress=S}};return A.action=G,r[f]=A,x.onMessage(w?M:null),G},makeInternalAction:l,handleData:h,clearPeer:m}},qc=i=>i&&typeof i=="object"&&!Array.isArray(i)&&typeof i.k=="string"?{key:i.k,...typeof i.s=="string"?{streamId:i.s}:{},...typeof i.t=="string"?{trackId:i.t}:{},...Object.hasOwn(i,"m")?{metadata:i.m}:{}}:null,$c=i=>e=>{let t=i.get(e);return t||(t=wi(20),i.set(e,t)),t},ia=()=>{const i=new WeakMap,e=new WeakMap,t=new Map,n=new Map,s=new Map,r=new Map,o=new WeakMap,a=new WeakMap;return{getStreamKey:$c(i),getTrackKey:$c(e),rememberRemoteStream:(c,l,h)=>{var p;const d=o.get(l);d!==void 0&&t.get(d)===l&&t.delete(d),o.set(l,c),t.set(c,l),h&&n.set(h,l),(p=l.getTracks)==null||p.call(l).forEach(m=>{typeof m.id=="string"&&r.set(m.id,{track:m,stream:l})})},getRemoteStream:(c,l)=>t.get(c)??(l?n.get(l):void 0),rememberRemoteTrack:(c,l,h,d,p)=>{var g;const m={track:l,stream:h},y=a.get(l);y!==void 0&&((g=s.get(y))==null?void 0:g.track)===l&&s.delete(y),a.set(l,c),s.set(c,m),d&&r.set(d,m),p&&n.set(p,h)},getRemoteTrack:(c,l)=>s.get(c)??(l?r.get(l):void 0),hasRemoteMedia:()=>t.size>0||s.size>0,clearRemote:()=>{t.clear(),n.clear(),s.clear(),r.clear()}}},of=({iterate:i,isActive:e,getSharedMediaPeer:t,onPeerError:n})=>{const s={},r={},o={},a=ia(),c=g=>{var f;return((f=t(g))==null?void 0:f.__trysteroMedia)??o[g]??(o[g]=ia())},l=(g,f,u,v)=>{const x=g[f]??(g[f]=[]);if(x.length>=64){console.warn(`${Pt}: too many pending ${v} metadata messages`),n(f,qe("too many pending media metadata messages"));return}x.push(u)},h=(g,f,u)=>{if(!(g!=null&&g.length))return;const v=f?g.findIndex(x=>{const _=u(x);return!_||_===f}):0;return v>=0?g.splice(v,1)[0]:void 0},d=(g,f,u,v)=>{var x;e(g)&&(c(g).rememberRemoteStream(f,u,typeof u.id=="string"?u.id:void 0),(x=y.onPeerStream)==null||x.call(y,u,g,v))},p=(g,f,u,v,x)=>{var _;e(g)&&(c(g).rememberRemoteTrack(f,u,v,typeof u.id=="string"?u.id:void 0,typeof v.id=="string"?v.id:void 0),(_=y.onPeerTrack)==null||_.call(y,u,v,g,x))},m=(g,f,u,v,x,_={})=>{const A={k:f,..._,...u===void 0?{}:{m:u}};return i(g,async(T,R)=>{await v(A,T),await x(R)})},y={addStream:(g,f,u)=>m(f.target,a.getStreamKey(g),f.metadata,u,v=>v.addStream(g),{s:g.id}),removeStream:(g,f)=>{i(f,(u,v)=>v.removeStream(g))},addTrack:(g,f,u,v)=>m(u.target,a.getTrackKey(g),u.metadata,v,x=>x.addTrack(g,f),{s:f.id,t:g.id}),removeTrack:(g,f)=>{i(f,(u,v)=>v.removeTrack(g))},replaceTrack:(g,f,u,v)=>m(u.target,a.getTrackKey(f),u.metadata,v,x=>x.replaceTrack(g,f),{t:g.id}),receiveStreamMeta:(g,f)=>{if(!e(f))return;const u=qc(g);if(!u)return;const v=c(f).getRemoteStream(u.key,u.streamId);if(v!=null&&v.getTracks().length){d(f,u.key,v,u.metadata);return}l(s,f,u,"stream")},receiveTrackMeta:(g,f)=>{if(!e(f))return;const u=qc(g);if(!u)return;const v=c(f).getRemoteTrack(u.key,u.trackId);if(v&&v.track.readyState!=="ended"&&(!v.stream.getTracks||v.stream.getTracks().includes(v.track))){p(f,u.key,v.track,v.stream,u.metadata);return}l(r,f,u,"track")},receiveRemoteStream:(g,f)=>{if(!e(g))return;const u=h(s[g],typeof f.id=="string"?f.id:void 0,v=>v.streamId);u&&d(g,u.key,f,u.metadata)},receiveRemoteTrack:(g,f,u)=>{if(!e(g))return;const v=r[g],x=typeof f.id=="string"?f.id:void 0,_=typeof u.id=="string"?u.id:void 0,A=v&&x?v.findIndex(R=>R.trackId===x):-1,T=A>=0?v==null?void 0:v.splice(A,1)[0]:h(v,_,R=>R.streamId);T&&p(g,T.key,f,u,T.metadata)},clearPeer:g=>{delete s[g],delete r[g],delete o[g]},onPeerStream:null,onPeerTrack:null};return y},Yc="beforeunload",af=1e4,Dn=i=>"@_"+i,Ts=new Set,jc=()=>Ts.forEach(i=>i()),cf=i=>(Ts.add(i),Ts.size===1&&addEventListener(Yc,jc),()=>{Ts.delete(i),Ts.size||removeEventListener(Yc,jc)});var lf=(i,e,t,{onPeerHandshake:n,onHandshakeError:s,handshakeTimeoutMs:r=af,maxReceiveBytes:o,isPassive:a=!1,onBeforeLeave:c}={})=>{const l={},h={},d={},p={onPeerJoin:null,onPeerLeave:null};let m=St,y=null;const g=(U,B)=>(U?Array.isArray(U)?U:[U]:on(h)).flatMap(Z=>{const le=h[Z];return le?[Promise.resolve(B(Z,le))]:(console.warn(`${Pt}: no peer with id ${Z} found`),[])}),f=(U,B,Z)=>{const le=l[U];!le||B&&le!==B||(F.send("",U).catch(St),P(U,le,Z))},u=(U,B)=>f(U,void 0,B),v=of({onPeerError:u,iterate:(U,B)=>g(U,(Z,le)=>B(Z,le)),isActive:U=>!!h[U],getSharedMediaPeer:U=>l[U]??null}),x=rf({onPeerError:u,...o===void 0?{}:{maxReceiveBytes:o},getPeer:(U,B)=>(B?l:h)[U],getPeerIds:U=>on(U?l:h),canReceiveFromPeer:(U,B)=>O.canReceiveFromPeer(U,B)}),_=x.makeInternalAction,A=x.handleData,T=x.makeAction,R=(U,B=qe("peer disconnected"))=>{var le;const Z=Hn(B,"peer disconnected");O.clearPeer(U,Z),delete l[U],delete h[U],x.clearPeer(U,Z),(le=d[U])==null||le.splice(0).forEach(fe=>fe.reject(Z)),delete d[U],v.clearPeer(U)},P=(U,B,Z)=>{var X;const le=l[U];if(!le||B&&le!==B)return;const fe=!!h[U];R(U,Z),le.destroy(),fe&&((X=p.onPeerLeave)==null||X.call(p,U)),e(U)},w=()=>y??(y=(async()=>{c==null||c();const U=new AbortController;F.send("",void 0,void 0,void 0,U.signal).catch(St),await new Promise(B=>setTimeout(B,99)),U.abort();try{Zi(l).forEach(([B,Z])=>{Z.destroy(),R(B,qe("room left"))})}finally{try{m()}finally{t()}}})()),M=_(Dn("ping")),D=_(Dn("pong")),G=_(Dn("signal")),S=_(Dn("stream"),{maxPayloadBytes:65536}),L=_(Dn("track"),{maxPayloadBytes:65536}),F=_(Dn("leave"),{sendToPending:!0,receiveWhilePending:!0}),I=_(Dn("hsdata"),{sendToPending:!0,receiveWhilePending:!0,maxPayloadBytes:65536}),z=_(Dn("hsready"),{sendToPending:!0,receiveWhilePending:!0}),O=kd({...n===void 0?{}:{onPeerHandshake:n},...s===void 0?{}:{onHandshakeError:s},handshakeTimeoutMs:r,sendHandshakeData:I.send,sendHandshakeReady:z.send,onActivate:(U,B)=>{var Z;h[U]=B,B.setHandlers({signal:le=>{h[U]===B&&G.send(le,U).catch(St)}}),(Z=p.onPeerJoin)==null||Z.call(p,U)},onFailure:(U,B,Z)=>f(U,B,Z)});return M.onMessage((U,B)=>{D.send("",B).catch(St)}),D.onMessage((U,B)=>{var le;const Z=d[B];(le=Z==null?void 0:Z.shift())==null||le.resolve(),Z&&!Z.length&&delete d[B]}),G.onMessage((U,B)=>{var Z;(Z=h[B])==null||Z.signal(U)}),S.onMessage((U,B)=>v.receiveStreamMeta(U,B)),L.onMessage((U,B)=>v.receiveTrackMeta(U,B)),F.onMessage((U,B)=>P(B,void 0,qe("peer left room"))),I.onMessage((U,B,Z)=>O.receiveHandshakeData(U,B,Z)),z.onMessage((U,B)=>O.receiveHandshakeReady(B)),i((U,B)=>{const Z=l[B];if(Z){if(Z===U)return;Z.destroy(),R(B,qe("peer replaced"))}l[B]=U,O.addPeer(B,U),U.setHandlers({data:le=>{l[B]===U&&A(B,le)},stream:le=>v.receiveRemoteStream(B,le),track:(le,fe)=>v.receiveRemoteTrack(B,le,fe),close:()=>P(B,U,qe("peer disconnected")),error:le=>{console.error(`${Pt} peer error:`,le),P(B,U,le)}}),O.start(B,U)}),Ih&&(m=cf(()=>w().catch(St))),{makeAction:T,leave:w,ping:async U=>{if(!h[U])throw qe(`no active peer with id ${U}`);const B=Date.now();return await new Promise((Z,le)=>{const fe=d[U]??(d[U]=[]),X=()=>{const oe=d[U];if(!oe)return;const re=oe.indexOf(Q);re>-1&&oe.splice(re,1),oe.length||delete d[U]},Q={resolve:()=>{X(),Z()},reject:oe=>{X(),le(oe)}};fe.push(Q),M.send("",U).catch(oe=>Q.reject(Hn(oe,"peer disconnected")))}),Date.now()-B},isPassive:()=>a,getPeers:()=>Uh(Zi(h).map(([U,B])=>[U,B.connection])),addStream:(U,B={})=>v.addStream(U,B,S.send),removeStream:(U,B={})=>{v.removeStream(U,B.target)},addTrack:(U,B,Z={})=>v.addTrack(U,B,Z,L.send),removeTrack:(U,B={})=>{v.removeTrack(U,B.target)},replaceTrack:(U,B,Z={})=>v.replaceTrack(U,B,Z,L.send),get onPeerJoin(){return p.onPeerJoin},set onPeerJoin(U){p.onPeerJoin=U,U&&on(h).forEach(B=>U(B))},get onPeerLeave(){return p.onPeerLeave},set onPeerLeave(U){p.onPeerLeave=U},get onPeerStream(){return v.onPeerStream},set onPeerStream(U){v.onPeerStream=U},get onPeerTrack(){return v.onPeerTrack},set onPeerTrack(U){v.onPeerTrack=U}}};const Gh=1,Hh=2,Kc=(i,e)=>{const t=En(i),n=new Uint8Array(3+t.byteLength+e.byteLength);return n[0]=Gh,n[1]=t.byteLength>>>8&255,n[2]=t.byteLength&255,n.set(t,3),n.set(e,3+t.byteLength),n},hf=(i,e)=>{const t=En(i),n=new Uint8Array(4+t.byteLength);return n[0]=Hh,n[1]=Number(e),n[2]=t.byteLength>>>8&255,n[3]=t.byteLength&255,n.set(t,4),n},Zc=(i,e)=>{if(i.byteLength<e+2)return null;const t=(i[e]??0)<<8|(i[e+1]??0),n=e+2+t;return t<=0||t>128||i.byteLength<n?null:{roomToken:mi(i.subarray(e+2,n)),headerSize:n}},uf=i=>{const e=new Uint8Array(i);if(e.byteLength<3||e.byteLength>16515)return null;if(e[0]===Gh){const t=Zc(e,1);return t?{type:"room",roomToken:t.roomToken,payload:e.subarray(t.headerSize).slice().buffer}:null}if(e[0]===Hh){const t=Zc(e,2);return t?{type:"presence",roomToken:t.roomToken,isPresent:e[1]===1}:null}return null},Rr=i=>{const{connection:e,channel:t}=i;return i.isDead||e.connectionState==="closed"||e.connectionState==="failed"||e.iceConnectionState==="closed"||e.iceConnectionState==="failed"||(t==null?void 0:t.readyState)==="closing"||(t==null?void 0:t.readyState)==="closed"},df=i=>{if(Rr(i))return"stale";const{channel:e}=i;return!e||e.readyState!=="open"?"transient":"live"};var ff=class{constructor(){Vt(this,"rooms",new Map);Vt(this,"unclaimedDataTimers",new WeakMap);Vt(this,"pendingDataTimers",new WeakMap);Vt(this,"byApp",{})}registerRoom(i,e,t,n){const s=this.rooms.get(i)??new Map;if(s.has(e))throw qe("room membership already registered");const r={token:null,tokenPromise:t,...n};s.set(e,r),this.rooms.set(i,s);const o=()=>{var c;return((c=this.rooms.get(i))==null?void 0:c.get(e))===r},a=c=>{if(r.token)for(const l of Mn(this.byApp[i]??{}))try{this.sendRoomPresence(l,r.token,c)}catch{}};return t.then(c=>{if(o()){r.token=c;for(const l of Mn(this.byApp[i]??{}))l.remoteRoomTokens.has(c)&&this.attachRoom(i,e,r,l),this.discardUnboundData(l);o()&&r.active&&a(!0)}}),{connect:(c,l,h)=>{if(!o()){l.destroy();return}const d=this.reusable(i,c);d&&d.peer!==l&&l.destroy();const p=d??this.register(i,c,l,h);if(this.attachRoom(i,e,r,p),!d)for(const m of s.values())m.active&&m.token&&this.sendRoomPresence(p,m.token,!0)},reuse:c=>{if(!o())return!1;const l=this.reusable(i,c);return l?(this.attachRoom(i,e,r,l),!0):!1},setActive:c=>{!o()||r.active===c||(r.active=c,a(c))},leave:()=>{var c,l;if(o()){s.delete(e),s.size||this.rooms.delete(i),a(!1);for(const h of Mn(this.byApp[i]??{})){const d=h.bindings[e];(l=d==null?void 0:(c=d.handlers).close)==null||l.call(c),d==null||d.detach(),this.discardUnboundData(h)}}}}}owns(i,e,t){var n,s;return((s=(n=this.byApp[i])==null?void 0:n[e])==null?void 0:s.peer)===t}reusable(i,e){var n;const t=(n=this.byApp[i])==null?void 0:n[e];if(t&&Rr(t.peer)){this.clear(i,e,{destroyPeer:!0});return}return t}attachRoom(i,e,t,n){var o;if(((o=this.rooms.get(i))==null?void 0:o.get(e))!==t||n.isClosing||this.get(i,n.peerId)!==n)return;const{proxy:s,isNew:r}=this.bind(e,t.tokenPromise,n,{onDetach:()=>t.onDetach(n.peerId,n.peer)});r&&t.onPeer(s,n.peerId,n.peer)}get(i,e){var t;return(t=this.byApp[i])==null?void 0:t[e]}sendRoomPresence(i,e,t){i.isClosing||Rr(i.peer)||i.peer.sendData(hf(e,t))}clear(i,e,{destroyPeer:t}){const n=this.byApp[i],s=n==null?void 0:n[e];if(!s||s.isClosing)return;s.idleTimer=Ye(s.idleTimer),this.clearDataTimers(s),s.isClosing=!0,t&&!s.peer.isDead&&s.peer.destroy();const r=Mn(s.bindings);s.bindings={},s.bindingsByToken={},s.controlRoomId=null,delete n[e],r.forEach(o=>{var a,c;(c=(a=o.handlers).close)==null||c.call(a),o.pendingData.length=0,o.pendingSendData.length=0,o.pendingTracks.length=0}),s.media.clearRemote(),s.pendingDataByToken.clear(),s.remoteRoomTokens.clear(),on(n).length===0&&delete this.byApp[i]}register(i,e,t,n){var a,c;const s=(a=this.byApp[i])==null?void 0:a[e];if(s){if(s.idleTimer=Ye(s.idleTimer),s.peer===t)return s;this.clear(i,e,{destroyPeer:!0})}const r={appId:i,peerId:e,peer:t,bindings:{},bindingsByToken:{},pendingDataByToken:new Map,remoteRoomTokens:new Set,idleTimer:null,controlRoomId:null,streamOwners:new Map,trackOwners:new Map,media:ia(),idleMs:n,isClosing:!1};((c=this.byApp)[i]??(c[i]={}))[e]=r;const o=()=>{this.owns(i,e,t)&&this.clear(i,e,{destroyPeer:!0})};return t.setHandlers({data:l=>this.dispatchData(r,l),signal:l=>this.dispatchSignal(r,l),close:o,error:l=>{console.error(`${Pt} peer error:`,l),o()},track:(l,h)=>this.dispatchTrack(r,l,h)}),r}bind(i,e,t,{onDetach:n}){const s=t.bindings[i];if(s)return t.idleTimer=Ye(t.idleTimer),{proxy:s.proxy,isNew:!1};const r={roomId:i,roomToken:null,roomTokenPromise:e,handlers:{},pendingData:[],pendingSendData:[],pendingTracks:[],detach:St,proxy:{}},o=()=>{if(t.bindings[i]!==r)return;const c=on(t.bindings).length===1&&(t.streamOwners.size>0||t.trackOwners.size>0||t.media.hasRemoteMedia());c||this.pruneRoomOwnership(t,i),delete t.bindings[i],r.roomToken&&t.bindingsByToken[r.roomToken]===r&&delete t.bindingsByToken[r.roomToken],t.controlRoomId===i&&(t.controlRoomId=on(t.bindings)[0]??null),this.discardUnboundData(t),n(),c?this.clear(t.appId,t.peerId,{destroyPeer:!0}):this.scheduleIdleTimer(t)},a={get connection(){return t.peer.connection},get channel(){return t.peer.channel},get isDead(){return t.peer.isDead},getOffer:c=>t.peer.getOffer(c),signal:c=>t.peer.signal(c),sendData:c=>{if(!r.roomToken){r.pendingSendData.push(c);return}t.peer.sendData(Kc(r.roomToken,c))},destroy:()=>o(),setHandlers:c=>{Object.assign(r.handlers,c),this.flushBindingQueues(t,r)},addStream:c=>{const l=t.streamOwners.get(c)??new Set,h=l.size===0;l.add(i),t.streamOwners.set(c,l),h&&t.peer.addStream(c)},removeStream:c=>this.releaseStreamOwner(t,c,i),addTrack:(c,l)=>{const h=t.trackOwners.get(c)??{stream:l,rooms:new Set},d=h.rooms.size===0;return h.stream=l,h.rooms.add(i),t.trackOwners.set(c,h),d?t.peer.addTrack(c,l):t.peer.connection.getSenders().find(p=>p.track===c)??t.peer.addTrack(c,l)},removeTrack:c=>this.releaseTrackOwner(t,c,i),replaceTrack:async(c,l)=>{const h=t.trackOwners.get(c);if(await t.peer.replaceTrack(c,l),h&&t.trackOwners.get(c)===h){t.trackOwners.delete(c);const d=t.trackOwners.get(l)??{stream:h.stream,rooms:new Set};h.rooms.forEach(p=>d.rooms.add(p)),t.trackOwners.set(l,d)}},__trysteroMedia:t.media};return r.proxy=a,r.detach=o,t.bindings[i]=r,t.controlRoomId??(t.controlRoomId=i),t.idleTimer=Ye(t.idleTimer),e.then(c=>{if(t.isClosing||t.bindings[i]!==r)return;r.roomToken=c,t.bindingsByToken[c]=r;const l=t.pendingDataByToken.get(c);l!=null&&l.length&&(r.pendingData.push(...l),t.pendingDataByToken.delete(c));const h=r.pendingSendData.splice(0);Rr(t.peer)||h.forEach(d=>{try{t.peer.sendData(Kc(c,d))}catch{}}),this.flushBindingQueues(t,r),this.discardUnboundData(t)}),{proxy:a,isNew:!0}}releaseStreamOwner(i,e,t){const n=i.streamOwners.get(e);n&&(n.delete(t),n.size===0&&(i.streamOwners.delete(e),i.peer.removeStream(e)))}releaseTrackOwner(i,e,t){const n=i.trackOwners.get(e);n&&(n.rooms.delete(t),n.rooms.size===0&&(i.trackOwners.delete(e),i.peer.removeTrack(e)))}pruneRoomOwnership(i,e){i.streamOwners.forEach((t,n)=>this.releaseStreamOwner(i,n,e)),i.trackOwners.forEach((t,n)=>this.releaseTrackOwner(i,n,e))}scheduleIdleTimer(i){i.isClosing||on(i.bindings).length>0||(i.idleTimer=Ye(i.idleTimer),i.idleTimer=setTimeout(()=>{var t;const e=(t=this.byApp[i.appId])==null?void 0:t[i.peerId];!e||on(e.bindings).length>0||this.clear(i.appId,i.peerId,{destroyPeer:!0})},i.idleMs))}getSignalBinding(i){if(i.controlRoomId){const t=i.bindings[i.controlRoomId];if(t!=null&&t.handlers.signal)return t}const e=Mn(i.bindings).find(t=>!!t.handlers.signal);return e?(i.controlRoomId=e.roomId,e):null}flushBindingQueues(i,e){const{handlers:t}=e;if(t.data&&e.pendingData.length>0){const n=e.pendingData.splice(0);this.syncDataTimers(i),n.forEach(s=>{var r;return(r=t.data)==null?void 0:r.call(t,s)})}else this.syncDataTimers(i);(t.track||t.stream)&&e.pendingTracks.length&&e.pendingTracks.splice(0).forEach(({track:n,stream:s})=>{var r,o;(r=t.track)==null||r.call(t,n,s),(o=t.stream)==null||o.call(t,s)})}unclaimedBufferedFrameCount(i){let e=0;for(const t of i.pendingDataByToken.values())e+=t.length;return e}boundBufferedFrameCount(i){let e=0;for(const t of Mn(i.bindings))e+=t.pendingData.length;return e}bufferedFrameCount(i){return this.unclaimedBufferedFrameCount(i)+this.boundBufferedFrameCount(i)}clearDataTimers(i){Ye(this.unclaimedDataTimers.get(i)),this.unclaimedDataTimers.delete(i),Ye(this.pendingDataTimers.get(i)),this.pendingDataTimers.delete(i)}syncDataTimers(i){if(i.isClosing){this.clearDataTimers(i);return}this.unclaimedBufferedFrameCount(i)===0?(Ye(this.unclaimedDataTimers.get(i)),this.unclaimedDataTimers.delete(i)):this.unclaimedDataTimers.has(i)||this.unclaimedDataTimers.set(i,setTimeout(()=>{this.unclaimedDataTimers.delete(i),i.pendingDataByToken.clear()},ea)),this.boundBufferedFrameCount(i)===0?(Ye(this.pendingDataTimers.get(i)),this.pendingDataTimers.delete(i)):this.pendingDataTimers.has(i)||this.pendingDataTimers.set(i,setTimeout(()=>{this.pendingDataTimers.delete(i),this.boundBufferedFrameCount(i)>0&&this.failData(i,"room data handler timed out")},ea))}canBindRoomToken(i,e){var t;return Mn(i.bindings).some(n=>!n.roomToken)||[...((t=this.rooms.get(i.appId))==null?void 0:t.values())??[]].some(n=>!n.token||n.token===e)}discardUnboundData(i){for(const e of i.pendingDataByToken.keys())this.canBindRoomToken(i,e)||i.pendingDataByToken.delete(e);this.syncDataTimers(i)}failData(i,e){console.warn(`${Pt}: ${e}; disconnecting peer ${i.peerId}`),this.clear(i.appId,i.peerId,{destroyPeer:!0})}dispatchData(i,e){var s,r;if(i.isClosing)return;const t=uf(e);if(!t){this.failData(i,"invalid or incompatible room frame");return}if(t.type==="presence"){if(t.isPresent){if(!i.remoteRoomTokens.has(t.roomToken)&&i.remoteRoomTokens.size>=64){this.failData(i,"too many advertised rooms");return}i.remoteRoomTokens.add(t.roomToken);for(const[o,a]of this.rooms.get(i.appId)??[])a.token===t.roomToken&&this.attachRoom(i.appId,o,a,i)}else{i.remoteRoomTokens.delete(t.roomToken),i.pendingDataByToken.delete(t.roomToken);const o=i.bindingsByToken[t.roomToken];(r=o==null?void 0:(s=o.handlers).close)==null||r.call(s),o==null||o.detach(),this.syncDataTimers(i)}return}const n=i.bindingsByToken[t.roomToken];if(!n){if(!this.canBindRoomToken(i,t.roomToken)||this.bufferedFrameCount(i)>=64)return;const o=i.pendingDataByToken.get(t.roomToken)??[];o.push(t.payload),i.pendingDataByToken.set(t.roomToken,o),this.syncDataTimers(i);return}if(n.handlers.data)n.handlers.data(t.payload);else{if(this.bufferedFrameCount(i)>=64){this.failData(i,"too much data waiting for a room handler");return}n.pendingData.push(t.payload),this.syncDataTimers(i)}}dispatchSignal(i,e){var n,s;const t=this.getSignalBinding(i);t?(s=(n=t.handlers).signal)==null||s.call(n,e):e.type==="offer"&&this.clear(i.appId,i.peerId,{destroyPeer:!0})}dispatchTrack(i,e,t){Mn(i.bindings).forEach(n=>{var s,r,o,a;if(n.handlers.track||n.handlers.stream){(r=(s=n.handlers).track)==null||r.call(s,e,t),(a=(o=n.handlers).stream)==null||a.call(o,t);return}n.pendingTracks.push({track:e,stream:t})})}};const Jc=23333,pf=57333,mf=12,gf=7533,vf=23333,Ds="offer-placeholder",yf=["offer","answer","candidate"],Wh=i=>{if(typeof i=="string")try{const e=Vs(i);return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch{return null}return i&&typeof i=="object"&&!Array.isArray(i)?i:null},Vn=(i,e)=>typeof i[e]=="string"&&i[e]?i[e]:void 0,Xh=i=>!!(i&&typeof i=="object"&&typeof i.signal=="function"&&typeof i.destroy=="function"&&typeof i.setHandlers=="function"),qh=(i,e=!1)=>yf.some(t=>t in i&&(typeof i[t]!="string"||i[t]===""))||"peer"in i&&(e||i.peer!==void 0&&!Xh(i.peer)),_f=i=>{const e=Wh(i);if(!e||qh(e,typeof i=="string"))return!1;const t=Vn(e,"peerId");return!!(t&&t!==Ct&&e.passive!==!0&&!Vn(e,"answer")&&!Vn(e,"candidate"))},xf=(i,e,t,n,s,r)=>{i.toCipher(e).then(o=>{i.isLeaving()||!r()||n(t,Ft(s(o.sdp)))})},Mf=()=>({offerPeer:null,offerId:null,offerSdp:null,offerInitPromise:null,offerAnswered:!1,offerRelays:[],offerSignalRelays:[],offerSignalBacklog:[],offerRelayTimers:[],offerExpiryTimer:null,connectedPeer:null,connectedPeerUnhealthySinceMs:null,answeringExpiryTimer:null,answeringPeer:null,answerSent:!1,answerReplay:null,connectionErrorReported:!1}),Sf=i=>{var e;return[...i.turnConfig??[],...((e=i.rtcConfig)==null?void 0:e.iceServers)??[]].some(({urls:t})=>(Array.isArray(t)?t:[t]).some(n=>/^turns?:/i.test(n)))},wf=(i,e)=>`could not connect to peer ${i} after exchanging SDP; ${Sf(e)?"check that your TURN server URLs and credentials are reachable by both peers":"configure TURN servers with turnConfig or rtcConfig.iceServers"}`,Xr=(i,e,t)=>{var n;i.isLeaving()||e.connectedPeer||e.connectionErrorReported||(e.connectionErrorReported=!0,(n=i.onJoinError)==null||n.call(i,{error:wf(t,i.config),appId:i.appId,peerId:t,roomId:i.roomId}))},qr=(i,e)=>i[e]??(i[e]=Mf()),Or=new WeakMap,tc=i=>{Or.delete(i),i.answeringExpiryTimer=Ye(i.answeringExpiryTimer),i.answeringPeer=null,i.answerSent=!1,i.answerReplay=null},Is=(i,e)=>{i.answeringPeer===e&&(tc(i),i.connectedPeer!==e&&!e.isDead&&e.destroy())},Ef=(i,e)=>{i.answeringPeer&&i.answeringPeer!==e&&!i.answeringPeer.isDead&&i.answeringPeer.destroy(),tc(i),i.connectedPeer=e,i.connectedPeerUnhealthySinceMs=null},Qc=(i,e)=>{(i==null?void 0:i.connectedPeer)===e&&(i.connectedPeer=null,i.connectedPeerUnhealthySinceMs=null)},sa=(i,e,t)=>{i.connectedPeer&&(i.connectedPeer.isDead||i.connectedPeer.destroy(),i.connectedPeer=null,i.connectedPeerUnhealthySinceMs=null)},nc=(i,e)=>{i.offerRelayTimers[e]=Ye(i.offerRelayTimers[e]),i.offerRelays[e]&&(i.offerRelays[e]=void 0)},ho=(i,e)=>{(i==null?void 0:i.offerRelays[e])===Ds&&nc(i,e)},vi=i=>{Or.delete(i),i.offerExpiryTimer=Ye(i.offerExpiryTimer),i.offerInitPromise=null,i.offerRelays.forEach((e,t)=>nc(i,t)),i.offerRelays=[],i.offerSignalRelays=[],i.offerRelayTimers=[],i.offerSignalBacklog=[],i.offerPeer&&i.offerPeer!==i.connectedPeer&&(i.offerPeer.isDead||i.offerPeer.destroy()),i.offerPeer=null,i.offerId=null,i.offerSdp=null,i.offerAnswered=!1,i.connectionErrorReported=!1},Tf=(i,e,t,n)=>{Ye(e.answeringExpiryTimer),e.answeringExpiryTimer=setTimeout(()=>{const s=i.peerStates[t];!s||s.connectedPeer||s.answeringPeer!==n||(s.answerSent&&Xr(i,s,t),Is(s,n),i.checkDeactivate())},vf)},ra=(i,e,t,n=pf)=>{Ye(e.offerExpiryTimer);const s=e.offerId;e.offerExpiryTimer=setTimeout(()=>{const r=i.peerStates[t];!r||r.connectedPeer||r.offerId!==s||(r.offerAnswered&&Xr(i,r,t),vi(r),i.checkDeactivate())},n)},$h=(i,e,t,n,s)=>{const r=()=>{e.offerPeer===n&&!e.connectedPeer&&(e.offerAnswered&&Xr(i,e,t),vi(e)),i.disconnectPeer(n,t),i.checkDeactivate()};n.setHandlers({connect:()=>i.connectPeer(n,t),...s?{signal:s}:{},close:r,error:r})},bf=(i,e,t)=>{if(e.offerPeer&&e.offerId&&e.offerSdp)return Promise.resolve({peer:e.offerPeer,offer:e.offerSdp,offerId:e.offerId});if(e.offerInitPromise)return e.offerInitPromise;const s=(async()=>{let r;try{r=(await i.offerManager.checkout(1,!1,i.encryptOffer))[0]}catch(c){if(i.isLeaving()||e.offerInitPromise!==s)return null;throw c}if(!r)throw qe("failed to allocate offer peer");const{peer:o,offer:a}=r;return i.isLeaving()||e.offerInitPromise!==s?(o.destroy(),null):(e.offerPeer=o,e.offerId=wi(mf),e.offerSdp=a,e.offerAnswered=!1,e.connectionErrorReported=!1,e.offerSignalBacklog=[],$h(i,e,t,o,c=>{e.offerPeer===o&&(e.offerSignalBacklog.push(c),e.offerSignalRelays.forEach(l=>l==null?void 0:l(c)))}),ra(i,e,t),{peer:o,offer:a,offerId:e.offerId})})().finally(()=>{e.offerInitPromise===s&&(e.offerInitPromise=null)});return e.offerInitPromise=s},Yh=async(i,e,t,n,s=0)=>{const r=i.peerStates[t];if(!r||r.connectedPeer||r.answeringPeer||r.offerAnswered){ho(r,e);return}if(r.offerRelays[e]!==Ds)return;const[o,a]=await Ei([es(Qi(i.rootTopicPlaintext,t)),bf(i,r,t)]);if(!a){ho(r,e);return}if(i.isLeaving()){vi(r);return}if(r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerRelays[e]!==Ds){ho(r,e);return}r.offerRelayTimers[e]=Ye(r.offerRelayTimers[e]),r.offerRelays[e]=!0,r.offerRelayTimers[e]=setTimeout(()=>{if(s>=2||i.isLeaving()||r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerPeer!==a.peer||r.offerId!==a.offerId){Pf(i,t,e);return}r.offerRelays[e]=Ds,Yh(i,e,t,n,s+1)},s===0&&i.announceIntervals[e]===void 0?2e3:(i.announceIntervals[e]??i.announceIntervalMs)*.9);let c=!1;r.offerSignalRelays[e]=l=>{c&&(i.isLeaving()||r.connectedPeer||r.offerPeer!==a.peer||r.offerId!==a.offerId||l.type!=="candidate"||xf(i,l,o,n,h=>({peerId:Ct,offerId:a.offerId,candidate:h,...i.isPassive?{passive:!0}:{}}),()=>!r.connectedPeer&&r.offerPeer===a.peer&&r.offerId===a.offerId))},n(o,Ft({peerId:Ct,offerId:a.offerId,offer:a.offer,...i.isPassive?{passive:!0}:{}})),c=!0,r.offerSignalBacklog.forEach(l=>{var h,d;return(d=(h=r.offerSignalRelays)[e])==null?void 0:d.call(h,l)})},Af=async(i,e,t,n,s,r)=>{var f;const o=qr(i.peerStates,t);if(o.answeringPeer||o.offerAnswered){const u=o.answerReplay,v=u==null?void 0:u.lastSentAt[e];if(o.answeringPeer&&!o.answeringPeer.isDead&&u&&u.offer===n&&u.offerId===s&&(v===void 0||Date.now()-v>=1e3)){u.lastSentAt[e]=Date.now();const x=await es(Qi(i.rootTopicPlaintext,t));if(!i.isLeaving()&&o.answerReplay===u&&!o.connectedPeer){const _=A=>r(x,A);u.relays[e]=_,u.messages.forEach(_)}}return}const a=!!(o.offerPeer||o.offerRelays.some(Boolean));if(a&&Ct<t)return;a&&vi(o);const c=i.initPeer(!1,i.config),l={offer:n,offerId:s,messages:[],lastSentAt:[],relays:[]};l.lastSentAt[e]=Date.now(),o.answeringPeer=c,o.answerSent=!1,o.answerReplay=l,o.connectionErrorReported=!1,Tf(i,o,t,c);const h=()=>{o.answeringPeer===c&&!o.connectedPeer&&o.answerSent&&Xr(i,o,t),Is(o,c),i.disconnectPeer(c,t),i.checkDeactivate()};c.setHandlers({connect:()=>i.connectPeer(c,t),close:h,error:h});let d;try{d=await i.toPlain({type:"offer",sdp:n})}catch{Is(o,c),(f=i.onJoinError)==null||f.call(i,{error:"incorrect room password when decrypting offer",appId:i.appId,peerId:t,roomId:i.roomId});return}if(c.isDead){Is(o,c);return}const p=await es(Qi(i.rootTopicPlaintext,t));if(i.isLeaving()||o.answerReplay!==l)return;l.relays[e]=u=>r(p,u);const m=[];let y=!1;const g=u=>{i.toCipher(u).then(v=>{if(i.isLeaving()||o.answeringPeer!==c||c.isDead)return;const x={peerId:Ct};u.type==="answer"?(o.answerSent=!0,x.answer=v.sdp):x.candidate=v.sdp,s&&(x.offerId=s),i.isPassive&&(x.passive=!0);const _=Ft(x),A=Date.now();l.messages.push(_),l.relays.forEach((T,R)=>{T&&(l.lastSentAt[R]=A,T(_))}),u.type==="answer"&&!y&&(y=!0,m.splice(0).forEach(g))})};c.setHandlers({signal:u=>{if(!(i.isLeaving()||o.answeringPeer!==c||c.isDead)&&!(u.type!=="answer"&&u.type!=="candidate")){if(u.type==="candidate"&&!y){m.push(u);return}g(u)}}}),await c.signal(d)},Rf=async(i,e,t,n,s)=>{var d;let r;try{r=await i.toPlain({type:Nh,sdp:t})}catch{return}const o=i.peerStates[e],a=n&&(o!=null&&o.offerPeer)&&o.offerId===n?o.offerPeer:null,c=!n||((d=o==null?void 0:o.answerReplay)==null?void 0:d.offerId)===n?o==null?void 0:o.answeringPeer:null,l=!n&&(o!=null&&o.offerPeer)?o.offerPeer:null,h=s&&!s.isDead?s:a??c??l;h&&!h.isDead&&h.signal(r)},Cf=async(i,e,t,n,s)=>{var o;let r;try{r=await i.toPlain({type:"answer",sdp:t})}catch{s&&(i.offerManager.reclaimLeased(s),s.isDead||s.destroy()),(o=i.onJoinError)==null||o.call(i,{error:"incorrect room password when decrypting answer",appId:i.appId,peerId:e,roomId:i.roomId});return}if(s){const a=qr(i.peerStates,e);if(i.offerManager.claimLeased(s),a.connectedPeer||a.offerAnswered||a.answeringPeer&&!a.answeringPeer.isDead&&Ct>e){s.destroy();return}if(a.answeringPeer){const c=a.answeringPeer;Is(a,c)}vi(a),a.offerPeer=s,a.offerId=n??null,a.offerAnswered=!0,ra(i,a,e,Jc),$h(i,a,e,s),s.signal(r)}else{const a=i.peerStates[e];if(!a||!a.offerPeer||a.offerAnswered||n&&a.offerId&&n!==a.offerId||a.offerPeer.isDead)return;a.offerAnswered=!0,ra(i,a,e,Jc),a.offerPeer.signal(r)}},Pf=(i,e,t)=>{const n=i.peerStates[e];!n||n.connectedPeer||n.offerRelays[t]&&(nc(n,t),i.checkDeactivate())},Lf=i=>e=>async(t,n,s)=>{var u;if(i.isLeaving())return;const r=Wh(n);if(!r||qh(r,typeof n=="string"))return;const o=Vn(r,"peerId")??"",a=Vn(r,"offer"),c=Vn(r,"answer"),l=Vn(r,"candidate"),h=Vn(r,"offerId"),d=Xh(r.peer)?r.peer:void 0,p=r.passive===!0;if(!o||o===Ct)return;const[m,y]=await Ei([i.rootTopicP,i.selfTopicP]);if(i.isLeaving()||t!==m&&t!==y||i.isPassive&&p||(i.isPassive&&!i.isActive&&!c&&!l&&(i.isActive=!0,(u=i.requeueAnnounce)==null||u.call(i)),i.isPassive&&!i.isActive))return;const g=i.peerStates[o],f=g==null?void 0:g.connectedPeer;if(f&&g){const v=df(f);if(v==="live"){g.connectedPeerUnhealthySinceMs=null;return}if(v==="stale")sa(g);else{const x=Date.now(),_=g.connectedPeerUnhealthySinceMs??x;if(g.connectedPeerUnhealthySinceMs=_,x-_<gf)return;sa(g)}}if(!i.reusePeer(o)){if(o&&!a&&!c&&!l){const v=qr(i.peerStates,o),x=Ct<o;if(v.answeringPeer||v.connectedPeer||v.offerAnswered)return;if(!x&&!v.offerPeer){let _=Or.get(v);_||(_=[],Or.set(v,_));const A=_[e];if(A!==void 0&&Date.now()-A<1e3)return;_[e]=Date.now();const T=await es(Qi(i.rootTopicPlaintext,o));!i.isLeaving()&&!v.connectedPeer&&!v.answeringPeer&&!v.offerAnswered&&s(T,Ft({peerId:Ct}));return}return v.offerRelays[e]?void 0:(v.offerRelays[e]=Ds,Yh(i,e,o,s))}if(a)return Af(i,e,o,a,h,s);if(l)return Rf(i,o,l,h,d);if(c)return Cf(i,o,c,h,d)}},er=5333,Df=[233,533,1333],el=7533,If=123333;var Uf=({init:i,subscribe:e,announce:t,deactivate:n})=>{const s={},r={},o=new ff,a=()=>Mn(s).some(d=>on(d).length>0);let c=!1,l=[],h=St;return(d,p,m)=>{var E,$,te,se;if(!d)throw qe("requires a config map as the first argument");if(m&&typeof m!="object")throw qe("third argument must be a callbacks object");const{appId:y}=d,g=m==null?void 0:m.onJoinError,f=m==null?void 0:m.onPeerHandshake,u=m==null?void 0:m.handshakeTimeoutMs;if(!y)throw qe("config map is missing appId field");if(!p)throw qe("roomId argument required");if(d.maxReceiveBytes!==void 0&&(!Number.isSafeInteger(d.maxReceiveBytes)||d.maxReceiveBytes<=0))throw qe("maxReceiveBytes must be a positive safe integer");if(u!==void 0&&(!Number.isFinite(u)||u<=0))throw qe("handshakeTimeoutMs must be a positive number");if((E=s[y])!=null&&E[p])return s[y][p];(te=($=r[y])==null?void 0:$[p])==null||te.call($,!0);const v=Qi(Pt,y,p),x=es(v),_=es(Qi(v,Ct)),A=Pd(d.password??"",y,p),T=Ld(y,p),R=d._test_only_sharedPeerIdleMs??If;let P=!1;const w=q=>async ce=>({type:ce.type,sdp:await q(A,ce.sdp)}),M=w(Id),D=w(Dd),G=()=>Nc(!0,d);let S=!1;const L=new Nd(G),F=async q=>{const ce=await q.getOffer();if(!ce||ce.type!=="offer")throw qe("failed to get offer for peer");return(await D(ce)).sdp},I=(q,ce)=>{C.connect(ce,q,R)};let z=!1;const O=()=>{B||!S||z||(z=!0,queueMicrotask(()=>{var q;z=!1,P||(q=X.requeueAnnounce)==null||q.call(X)}))},U=(q,ce)=>{if(P)return;const ie=X.peerStates[ce];(ie==null?void 0:ie.connectedPeer)===q&&(sa(ie),fe(),O())},B=!!d.passive;let Z,le=St;const fe=()=>{if(!B||!X.isActive)return;let q=!1;Zi(X.peerStates).forEach(([ce,ie])=>{ie.connectedPeer||ie.answeringPeer||ie.offerInitPromise||ie.offerPeer||ie.offerRelays.some(Boolean)?q=!0:delete X.peerStates[ce]}),q||(X.isActive=!1,Z=Ye(Z),Ue.forEach(Ye),Ue.length=0,le(),C.setActive(!1))},X={appId:y,roomId:p,config:d,peerStates:{},rootTopicPlaintext:v,rootTopicP:x,selfTopicP:_,toPlain:M,toCipher:D,isLeaving:()=>P,isPassive:B,isActive:!B,onJoinError:g,offerManager:L,encryptOffer:F,initPeer:Nc,connectPeer:I,disconnectPeer:U,reusePeer:q=>C.reuse(q),checkDeactivate:fe,announceIntervals:[],announceIntervalMs:er},Q={config:d,appId:y,roomId:p,isPassive:B},oe=Lf(X);if(!c){const q=i(d);l=(Array.isArray(q)?q:[q]).map(ce=>Promise.resolve(ce)),c=!0,h=(se=d.relayConfig)!=null&&se.manualReconnection?St:Ad()}const re=l.map(()=>er),Me=l.map(()=>0),Pe=l.map(()=>0),Ue=[],Y=l.map(async(q,ce)=>e(await q,await x,await _,oe(ce),ie=>L.getOffers(ie,F),Q));Ei([x,_]).then(([q,ce])=>{if(P)return;const ie=async(de,De)=>{var $e;if(P||B&&!X.isActive)return;const ae=B?{passive:!0}:void 0;let pe;try{pe=await t(de,q,ce,ae,Q),Pe[De]=0}catch(Ve){if(P)return;const tt=Pe[De]??0;tt===0&&(($e=d.relayConfig)==null?void 0:$e.warnOnRelayFailure)!==!1&&console.warn(`${Pt}: announce failed - ${Ji(Ve,"")}`),Pe[De]=tt+1}if(P||B&&!X.isActive||pe&&typeof pe!="number"&&"stopAnnouncing"in pe)return;typeof pe=="number"?(X.announceIntervals[De]=pe,re[De]=pe):pe&&(re[De]=pe.nextAnnounceMs,S||(S=pe.reannounceOnDisconnect===!0));const Ie=Me[De]??0;Me[De]=Ie+1;const Oe=re[De]??er,Se=Df[Ie]??(Ie===3&&typeof pe=="object"?er:void 0);Ue[De]=setTimeout(()=>{ie(de,De)},typeof Se=="number"?Math.min(Oe,Se):Oe)};le=()=>{n&&l.forEach(async de=>{const De=await de;P||n(De,q,ce,Q)})},X.requeueAnnounce=()=>{Ue.forEach(Ye),Ue.length=0,Z=Ye(Z),C.setActive(!0),Z=setTimeout(fe,el),l.forEach(async(de,De)=>{const ae=await de;ae&&!P&&(Me[De]=0,ie(ae,De))})},Y.forEach(async(de,De)=>{if(await de,P)return;const ae=await l[De];ae&&!P&&(!B||X.isActive)&&ie(ae,De)})});let ee=St;const ue=d.password??"",{compose:k}=Fd(ue,y,p),Fe=k(f),Ne=()=>{var q;((q=s[y])==null?void 0:q[p])===ge&&(delete s[y][p],on(s[y]).length===0&&delete s[y])},ke=()=>{var q;((q=r[y])==null?void 0:q[p])===Ee&&(delete r[y][p],on(r[y]).length===0&&delete r[y])},Ee=(q=!1)=>{P||(P=!0,ee=St,Ne(),ke(),C.leave(),Zi(X.peerStates).forEach(([ce,ie])=>{ie.connectedPeer&&!ie.connectedPeer.isDead&&(o.owns(y,ce,ie.connectedPeer)||ie.connectedPeer.destroy()),ie.answeringPeer&&!ie.answeringPeer.isDead&&ie.answeringPeer.destroy(),vi(ie),tc(ie),ie.connectedPeer=null,ie.connectedPeerUnhealthySinceMs=null}),Ue.forEach(Ye),Z=Ye(Z),Y.forEach(async ce=>{(await ce)()}),L.destroy(),!(q||a())&&(c=!1,h()))},Te={...d.maxReceiveBytes===void 0?{}:{maxReceiveBytes:d.maxReceiveBytes},...Fe?{onPeerHandshake:Fe}:{},...u===void 0?{}:{handshakeTimeoutMs:u},isPassive:B,onBeforeLeave:()=>{Ne(),(r[y]??(r[y]={}))[p]=Ee},onHandshakeError:(q,ce)=>g==null?void 0:g({error:ce.replace(/^handshake failed: /,""),appId:y,peerId:q,roomId:p})};s[y]??(s[y]={});const ge=lf(q=>ee=q,q=>{if(P)return;const ce=X.peerStates[q];ce!=null&&ce.connectedPeer&&Qc(ce,ce.connectedPeer),fe(),O()},()=>Ee(!1),Te),C=o.registerRoom(y,p,T,{active:!B||X.isActive,onPeer:(q,ce,ie)=>{const de=qr(X.peerStates,ce);Ef(de,ie),B&&!X.isActive&&(X.isActive=!0,C.setActive(!0),X.requeueAnnounce?X.requeueAnnounce():(Z=Ye(Z),Z=setTimeout(fe,el))),ee(q,ce),vi(de)},onDetach:(q,ce)=>{Qc(X.peerStates[q],ce),fe()}});return s[y][p]=ge}};const Nf=6e4,uo=i=>{if(!i)throw qe("topic strategy missing room context");return i},ms=(i,e,t,n)=>({kind:e,appId:i.appId,roomId:i.roomId,rootTopic:t,selfTopic:n});var Ff=({steadyAnnounceIntervalMs:i=Nf,reannounceOnDisconnect:e=!0,init:t,subscribeTopic:n,publishTopic:s,unpublishTopic:r})=>Uf({init:t,subscribe:async(o,a,c,l,h,d)=>{const p=uo(d),m=(A,T)=>void s(o,A,T,ms(p,"signal",a,c));let y=null,g=!1,f=null,u=!1;const v=A=>{g||(g=!0,A())},x=()=>(f||(f=Promise.resolve(n(o,c,(A,T)=>{u||l(A,T,m)},ms(p,"self",a,c))).then(A=>{y=A,u&&v(A)})),f);p.isPassive||await x();const _=await n(o,a,async(A,T)=>{u||(p.isPassive&&_f(T)&&await x(),u||await l(A,T,m))},ms(p,"root",a,c));return()=>{u=!0,y&&v(y),_()}},announce:async(o,a,c,l,h)=>{const d=uo(h),p=await s(o,a,Ft({peerId:Ct,...l}),ms(d,"announce",a,c));return typeof p=="number"||p!==void 0&&"stopAnnouncing"in p?p:{nextAnnounceMs:(p==null?void 0:p.nextAnnounceMs)??i,reannounceOnDisconnect:(p==null?void 0:p.reannounceOnDisconnect)??e}},...r?{deactivate:(o,a,c,l)=>{const h=uo(l);return r(o,a,ms(h,"announce",a,c))}}:{}});const jh=bd(i=>i.socket),Of=5,Kh="x",Zh="EVENT",{secretKey:kf,publicKey:Bf}=Dh.keygen(),zf=Us(Bf),fo={},tl=250,ui=6e4,Vf=9e5,ic=5333,Ns=new WeakMap,kr=jh.scoped(),oa=new WeakSet,Gf=i=>{const e=Ns.get(i),t=Math.min(e!=null&&e.delayMs?Math.max(ui,e.delayMs*2):ui,Vf);return Ns.set(i,{delayMs:t,untilMs:Date.now()+t}),t},Fs=i=>{const e=Ns.get(i);if(!e)return 0;const t=e.untilMs-Date.now();return t>0?t:0},tr=i=>({nextAnnounceMs:i}),Hf={stopAnnouncing:!0},Wf=i=>{var e;return oa.has(i)?!1:(oa.add(i),Ns.delete(i),(e=i.close)==null||e.call(i),!0)},Jh=()=>Math.floor(Date.now()/1e3),Qh=i=>fo[i]??(fo[i]=Fh(i,1e4)+2e4),Xf=async(i,e)=>{const t={kind:Qh(i),tags:[[Kh,i]],created_at:Jh(),content:e,pubkey:zf},n=await Wr("SHA-256",Ft([0,t.pubkey,t.created_at,t.kind,t.tags,t.content]));return Ft([Zh,{...t,id:Us(n),sig:Us(await Dh.signAsync(n,kf))}])},qt={},eu=i=>{i.flushWaiters.forEach(e=>e()),i.flushWaiters.clear()},qf=(i,e,t)=>{var s;const n=qt[s=i.url]??(qt[s]={subIds:[],topics:new Map,updateTimer:null,flushWaiters:new Set,retryTimer:null,retryMs:ic,pendingEose:new Set,requestedAt:0});n.topics.set(e,t),tu(i,n)},$f=(i,e)=>{const t=qt[i.url];t&&(t.topics.delete(e),delete kr.forRelay(i)[e],t.topics.size===0?(t.retryTimer!==null&&clearTimeout(t.retryTimer),t.updateTimer!==null&&(clearTimeout(t.updateTimer),t.updateTimer=null),eu(t),t.subIds.forEach(n=>i.send(Ft(["CLOSE",n]))),delete qt[i.url]):tu(i,t))},tu=(i,e)=>{e.updateTimer===null&&(e.updateTimer=setTimeout(()=>{e.updateTimer=null;try{nu(i)}finally{eu(e)}},0))},Yf=i=>{const e=qt[i.url];return!e||e.updateTimer===null?Promise.resolve():new Promise(t=>e.flushWaiters.add(t))},nu=i=>{const e=qt[i.url];if(!e||e.topics.size===0)return;const t=[...e.topics.keys()],n=[],s=Jh();for(let r=0;r<t.length;r+=tl)n.push(t.slice(r,r+tl));for(;e.subIds.length>n.length;){const r=e.subIds.pop();r&&i.send(Ft(["CLOSE",r]))}e.pendingEose.clear(),e.requestedAt=Date.now(),n.forEach((r,o)=>{var c;const a=(c=e.subIds)[o]??(c[o]=wi(64));e.pendingEose.add(a),i.send(Ft(["REQ",a,{kinds:[...new Set(r.map(Qh))],since:s,"#x":r}]))})},iu=i=>{const e=qt[i.url];if(e&&e.topics.size>0&&!i.isClosed){if(Fs(i)>0){ou(i,!0);return}e.retryTimer!==null&&(clearTimeout(e.retryTimer),e.retryTimer=null),nu(i),su(i)}},su=i=>{Object.entries(kr.forRelay(i)).forEach(([e,t])=>{ru(i,e,t,!0)})},ru=async(i,e,t,n)=>{var o;if(oa.has(i)||i.isClosed)return n?Hf:void 0;const s=Fs(i);if(s>0||i.socket.readyState!==1)return n?tr(Math.max(ui,s)):void 0;const r=await Xf(e,n?Ft({...Vs(t),nonce:wi(8)}):t);if(n&&!((o=qt[i.url])!=null&&o.topics.has(e)))return tr(ui);if(Fs(i)>0||i.isClosed||i.socket.readyState!==1)return n?tr(ui):void 0;if(i.send(r),n)return tr(ui)},ou=(i,e)=>{const t=qt[i.url];if(!t||t.retryTimer!==null&&!e)return;t.retryTimer!==null&&clearTimeout(t.retryTimer);const n=e?Fs(i):t.retryMs;t.retryMs=Math.min(t.retryMs*2,ui),t.retryTimer=setTimeout(()=>{t.retryTimer=null,iu(i)},Math.max(n,ic))},au=Ff({init:i=>Md(i,jf,Of,!0).map(e=>{const t=jh.register(e,()=>Td(e,n=>{var c,l;const[s,r,o,a]=Vs(n);if(s!==Zh){const h=`${Pt}: relay failure from ${t.url} - `,d=s==="CLOSED"&&typeof o=="string"?o:a,p=s==="OK"&&o===!1,m=(p||s==="CLOSED")&&(d==null?void 0:d.startsWith("rate-limited:")),y=p&&(d==null?void 0:d.startsWith("duplicate:")),g=d&&/^(blocked|restricted|auth-required|pow):/.test(d);if(s==="OK"&&o===!0&&Fs(t)===0&&Ns.delete(t),(p||s==="CLOSED")&&g&&!Wf(t))return;if(m)Gf(t);else if(s==="EOSE"){const f=qt[t.url];f!=null&&f.pendingEose.delete(r)&&f.pendingEose.size===0&&(f.retryMs=ic,f.retryTimer!==null&&(clearTimeout(f.retryTimer),f.retryTimer=null),Date.now()-f.requestedAt>=1e3&&su(t))}s==="CLOSED"&&!g&&ou(t,!!m),!y&&((c=i.relayConfig)==null?void 0:c.warnOnRelayFailure)!==!1&&(s==="NOTICE"?console.warn(h+r):(p||s==="CLOSED")&&console.warn(h+d));return}if(o&&typeof o=="object"&&"content"in o){const h=qt[t.url];if(h!=null&&h.subIds.includes(r)&&o.tags){const d=o.tags.find(p=>p[0]===Kh);d!=null&&d[1]&&((l=h.topics.get(d[1]))==null||l(d[1],o.content))}}},()=>iu(t)));return t.ready}),subscribeTopic:(i,e,t,n)=>{const s=(o,a)=>void t(o,a);qf(i,e,s);const r=()=>{var o;((o=qt[i.url])==null?void 0:o.topics.get(e))===s&&$f(i,e)};return n.kind==="root"?Yf(i).then(()=>r):r},publishTopic:(i,e,t,{kind:n})=>{const s=typeof t=="string"?t:Ft(t);return n==="announce"&&(kr.forRelay(i)[e]=s),ru(i,e,s,n==="announce")},unpublishTopic:(i,e)=>{delete kr.forRelay(i)[e]}}),jf=["0x-nostr-relay.fly.dev","bendernostur.duckdns.org:8443","cdn.satellite.earth","nos.lol","nostr.chaima.info","nostr.christiansass.de","nostr.rblb.it","nostr.red5d.dev","nostr.robosats.org","nostr.stakey.net","nostrcity-club.fly.dev","relay-dev.gulugulu.moe","relay.aarpia.com","relay.agentry.com","relay.bitmacro.cloud","relay.bullishbounty.com","relay.degmods.com","relay.flashapp.me","relay.grigic.org","relay.hackshed.dev","relay.kaleidoswap.com","relay.layer.systems","relay.nostr.blockhenge.com","relay.nostr.dev.br","relay.nostrmap.net","relay.novospes.com","relay.piazza.today","relay.routstr.com","testr.nymble.world"].map(i=>"wss://"+i);function kt(i,e){if(!i||typeof i.makeAction!="function")return{send:()=>{},onReceive:()=>{}};const t=i.makeAction(e),n=(s,r)=>{if(typeof s=="string"&&s.length>0)return s;if(s&&typeof s=="object"){if(typeof s.peerId=="string"&&s.peerId.length>0)return s.peerId;if(typeof s.id=="string"&&s.id.length>0)return s.id}if(r&&typeof r=="object"){if(typeof r.id=="string"&&r.id.length>0)return r.id;if(typeof r.senderId=="string"&&r.senderId.length>0)return r.senderId}return null};return Array.isArray(t)?{send:(s,r)=>{try{t[0](s,r)}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{t[1]((r,o)=>{const a=n(o,r);a&&s(r,a)})}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}:{send:(s,r)=>{try{if(t&&typeof t.send=="function"){let o;r&&typeof r=="string"?o=t.send(s,{target:r}):o=t.send(s),o&&typeof o.catch=="function"&&o.catch(()=>{})}}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{if(!t)return;const r=(o,a)=>{const c=n(a,o);c&&s(o,c)};"onMessage"in t?t.onMessage=r:"onReceive"in t&&(typeof t.onReceive=="function"?t.onReceive(r):t.onReceive=r)}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}}const cu="rockets-3d-space-shooter",Kf="rockets_public_directory_v1",Zf=3e3,nl=12e3,lu=["wss://nos.lol","wss://relay.damus.io","wss://relay.snort.social","wss://nostr.mom"];class Jf{constructor(){this.lobbyRoom=null,this.activeRooms=new Map,this.listeners=new Set,this.heartbeatTimer=null,this.purgeTimer=null,this.currentHostingMatch=null,this.sendHeartbeat=null,this.sendQuery=null,this.isInitialized=!1}init(){if(!this.isInitialized){this.isInitialized=!0;try{this.lobbyRoom=au({appId:cu,relayConfig:{urls:lu}},Kf);const e=kt(this.lobbyRoom,"room_heartbeat"),t=kt(this.lobbyRoom,"query_rooms");this.sendHeartbeat=e.send,this.sendQuery=t.send,e.onReceive((s,r)=>{!s||!s.roomId||(this.activeRooms.set(s.roomId,{...s,lastSeen:Date.now(),ttlMs:s.ttlMs||nl}),this.notifyListeners())}),t.onReceive((s,r)=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()});const n=()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()};typeof this.lobbyRoom.onPeerJoin=="function"?this.lobbyRoom.onPeerJoin(n):this.lobbyRoom.onPeerJoin=n,this.purgeTimer=setInterval(()=>{const s=Date.now();let r=!1;for(const[o,a]of this.activeRooms.entries())s-a.lastSeen>a.ttlMs&&(this.activeRooms.delete(o),r=!0);r&&this.notifyListeners()},2e3),this.refreshRooms()}catch(e){console.warn("Lobby network init warning:",e)}}}refreshRooms(){if(this.init(),this.sendQuery)try{this.sendQuery({req:"list",from:Ct})}catch(e){console.error(e)}}startMasterKeepAlive(e){this.init(),this.currentHostingMatch=e,this.stopMasterKeepAlive(),this.broadcastCurrentRoom(),this.heartbeatTimer=setInterval(()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()},Zf)}stopMasterKeepAlive(){this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null)}broadcastCurrentRoom(){if(this.currentHostingMatch&&(this.init(),!!this.sendHeartbeat))try{const e=this.currentHostingMatch,t=e.getPlayerCount?e.getPlayerCount():1,n={roomId:e.roomId,roomName:e.roomName||e.roomId,masterId:Ct,playerCount:t,mapSeed:e.mapSeed||42,timestamp:Date.now(),ttlMs:nl};this.sendHeartbeat(n),this.activeRooms.set(e.roomId,{...n,lastSeen:Date.now()}),this.notifyListeners()}catch(e){console.error("Failed to send heartbeat:",e)}}onRoomsUpdated(e){return this.listeners.add(e),e(this.getRoomsList()),()=>this.listeners.delete(e)}notifyListeners(){const e=this.getRoomsList();for(const t of this.listeners)t(e)}getRoomsList(){const e=Date.now(),t=[];for(const n of this.activeRooms.values()){const s=Math.max(0,Math.round((n.lastSeen+n.ttlMs-e)/1e3));t.push({...n,ttlSecondsRemaining:s})}return t.sort((n,s)=>s.lastSeen-n.lastSeen)}destroy(){if(this.stopMasterKeepAlive(),this.purgeTimer&&clearInterval(this.purgeTimer),this.lobbyRoom)try{this.lobbyRoom.leave()}catch{}this.activeRooms.clear(),this.listeners.clear(),this.isInitialized=!1}}const di=new Jf;class Qf{constructor({roomId:e,roomName:t,mapSeed:n,playerName:s,onPeerJoined:r,onPeerLeft:o,onMasterChanged:a,onCombatLog:c}){this.roomId=e,this.roomName=t||e,this.mapSeed=n||42,this.playerName=s||`Pilot-${(Ct||"Host").slice(0,4)}`,this.selfId=Ct,this.onPeerJoined=r||(()=>{}),this.onPeerLeft=o||(()=>{}),this.onMasterChanged=a||(()=>{}),this.onCombatLog=c||(()=>{}),this.room=null,this.currentMasterId=this.selfId,this.isMaster=!0,this.peers=new Map,this.sendState=null,this.sendCannon=null,this.sendMine=null,this.sendHit=null,this.sendKill=null,this.sendPing=null,this.sendPong=null,this.sendLaser=null,this.sendDecoy=null,this.sendMissile=null,this.sendMapResetVote=null,this.sendMapReset=null,this.cannonListeners=new Set,this.mineListeners=new Set,this.hitListeners=new Set,this.killListeners=new Set,this.laserListeners=new Set,this.decoyListeners=new Set,this.missileListeners=new Set,this.mapResetVoteListeners=new Set,this.mapResetListeners=new Set,this.currentMapResetVote=null,this.voteTimeoutTimer=null,this.pingInterval=null,this.stateBroadcastInterval=null}join(){this.room=au({appId:cu,relayConfig:{urls:lu}},this.roomId);const e=kt(this.room,"state"),t=kt(this.room,"cannon"),n=kt(this.room,"mine"),s=kt(this.room,"hit"),r=kt(this.room,"kill"),o=kt(this.room,"ping"),a=kt(this.room,"pong"),c=kt(this.room,"laser"),l=kt(this.room,"missile"),h=kt(this.room,"decoy"),d=kt(this.room,"map_reset_vote"),p=kt(this.room,"map_reset");this.sendState=e.send,this.sendCannon=t.send,this.sendMine=n.send,this.sendHit=s.send,this.sendKill=r.send,this.sendPing=o.send,this.sendPong=a.send,this.sendLaser=c.send,this.sendMissile=l.send,this.sendDecoy=h.send,this.sendMapResetVote=d.send,this.sendMapReset=p.send,d.onReceive((g,f)=>{!f||typeof f!="string"||!g||(g.type==="start"?this.handleIncomingVoteStart(g):g.type==="vote"&&this.handleIncomingVoteCast(g,f))}),p.onReceive((g,f)=>{!g||g.seed===void 0||this.triggerMapResetLocally(g.seed)}),e.onReceive((g,f)=>{if(!f||typeof f!="string")return;this.peers.has(f)||this.peers.set(f,{id:f,ping:30,lastSeen:Date.now(),packetsReceived:0});const u=this.peers.get(f);u.lastState=g,u.lastSeen=Date.now(),u.packetsReceived=(u.packetsReceived||0)+1}),t.onReceive((g,f)=>{if(!(!f||typeof f!="string"))for(const u of this.cannonListeners)u(g,f)}),c.onReceive((g,f)=>{if(!(!f||typeof f!="string"))for(const u of this.laserListeners)u(g,f)}),l.onReceive((g,f)=>{if(!(!f||typeof f!="string"))for(const u of this.missileListeners)u(g,f)}),h.onReceive((g,f)=>{if(!(!f||typeof f!="string"))for(const u of this.decoyListeners)u(g,f)}),n.onReceive((g,f)=>{if(!(!f||typeof f!="string"))for(const u of this.mineListeners)u(g,f)}),s.onReceive((g,f)=>{if(!(!f||typeof f!="string"))for(const u of this.hitListeners)u(g,f)}),r.onReceive((g,f)=>{if(!(!f||typeof f!="string"))for(const u of this.killListeners)u(g,f)}),o.onReceive((g,f)=>{!f||typeof f!="string"||this.sendPong&&this.sendPong({t:g.t},f)}),a.onReceive((g,f)=>{if(!(!f||typeof f!="string")&&g&&g.t&&this.peers.has(f)){const u=Math.max(1,Date.now()-g.t);this.peers.get(f).ping=u}});const m=g=>{!g||typeof g!="string"||(console.log(`[Mesh] Peer connected: ${g}`),this.peers.set(g,{id:g,ping:40,lastSeen:Date.now()}),this.updateMasterElection(),this.onPeerJoined(g),this.onCombatLog(`🛰️ Pilot joined the mesh: ${g.slice(0,5)}`))},y=g=>{!g||typeof g!="string"||(console.log(`[Mesh] Peer disconnected: ${g}`),this.peers.delete(g),this.updateMasterElection(),this.onPeerLeft(g),this.onCombatLog(`💨 Pilot left the mesh: ${g.slice(0,5)}`))};typeof this.room.onPeerJoin=="function"?this.room.onPeerJoin(m):this.room.onPeerJoin=m,typeof this.room.onPeerLeave=="function"?this.room.onPeerLeave(y):this.room.onPeerLeave=y,this.updateMasterElection(),this.isMaster&&di.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),this.pingInterval=setInterval(()=>{this.sendPing&&this.peers.size>0&&this.sendPing({t:Date.now()})},2e3)}updateMasterElection(){if(!this.room)return;const e=Object.keys(this.room.getPeers()||{}),n=[this.selfId,...e].sort()[0],s=n===this.selfId;if(this.currentMasterId!==n||this.isMaster!==s){const r=this.currentMasterId;this.currentMasterId=n,this.isMaster=s,console.log(`[Mesh] Master Election: elected ${n} (Self is master: ${s})`),s?(di.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),r&&r!==this.selfId&&this.onCombatLog("👑 Previous host left. You took over as Master! Keep-alive active.")):di.stopMasterKeepAlive(),this.onMasterChanged(n,s)}}broadcastLocalState(e){this.sendState&&this.sendState({...e,id:this.selfId,name:this.playerName,time:Date.now()})}broadcastCannon(e){this.sendCannon&&this.sendCannon(e)}broadcastLaser(e){this.sendLaser&&this.sendLaser(e)}broadcastMissile(e){if(this.sendMissile){const t={...e,targetPeerId:e.targetPeerId!==void 0?e.targetPeerId:null};this.sendMissile(t)}}broadcastDecoy(e){this.sendDecoy&&this.sendDecoy(e)}onLaser(e){return this.laserListeners.add(e),()=>this.laserListeners.delete(e)}onMissile(e){return this.missileListeners.add(e),()=>this.missileListeners.delete(e)}onDecoy(e){return this.decoyListeners.add(e),()=>this.decoyListeners.delete(e)}broadcastMine(e){this.sendMine&&this.sendMine(e)}sendHitTarget(e,t,n){this.sendHit&&this.sendHit({targetId:e,attackerId:this.selfId,attackerName:this.playerName,damage:t,weapon:n,time:Date.now()})}broadcastKill(e,t,n){this.sendKill&&this.sendKill({victimId:e,killerId:t,killerName:n,time:Date.now()})}onCannon(e){return this.cannonListeners.add(e),()=>this.cannonListeners.delete(e)}onMine(e){return this.mineListeners.add(e),()=>this.mineListeners.delete(e)}onHit(e){return this.hitListeners.add(e),()=>this.hitListeners.delete(e)}onKill(e){return this.killListeners.add(e),()=>this.killListeners.delete(e)}requestMapResetVote(){if(this.peers.size===0){const n=Math.floor(Math.random()*1e6)+1;return this.triggerMapResetLocally(n),{solo:!0,passed:!0,newSeed:n}}if(this.currentMapResetVote)return{error:"Vote already in progress"};const e="vote-"+Date.now()+"-"+Math.random().toString(36).slice(2,6),t=Math.floor(Math.random()*1e6)+1;return this.currentMapResetVote={id:e,initiatorId:this.selfId,initiatorName:this.playerName,newSeed:t,startTime:Date.now(),expiresAt:Date.now()+1e4,votes:new Map([[this.selfId,!0]])},this.sendMapResetVote&&this.sendMapResetVote({type:"start",voteId:e,initiatorId:this.selfId,initiatorName:this.playerName,newSeed:t}),this.voteTimeoutTimer&&clearTimeout(this.voteTimeoutTimer),this.voteTimeoutTimer=setTimeout(()=>{this.finalizeMapResetVote(e)},1e4),this.emitMapResetVoteUpdate(),{solo:!1,voteId:e,newSeed:t}}handleIncomingVoteStart(e){this.currentMapResetVote||(this.currentMapResetVote={id:e.voteId,initiatorId:e.initiatorId,initiatorName:e.initiatorName||"Host",newSeed:e.newSeed,startTime:Date.now(),expiresAt:Date.now()+1e4,votes:new Map([[e.initiatorId,!0]])},this.voteTimeoutTimer&&clearTimeout(this.voteTimeoutTimer),this.voteTimeoutTimer=setTimeout(()=>{this.finalizeMapResetVote(e.voteId)},1e4),this.emitMapResetVoteUpdate())}castMapResetVote(e){if(!this.currentMapResetVote)return;const t=!!e;this.currentMapResetVote.votes.set(this.selfId,t),this.sendMapResetVote&&this.sendMapResetVote({type:"vote",voteId:this.currentMapResetVote.id,choice:t}),this.emitMapResetVoteUpdate();const n=this.peers.size+1;this.currentMapResetVote.votes.size>=n&&this.finalizeMapResetVote(this.currentMapResetVote.id)}handleIncomingVoteCast(e,t){if(!this.currentMapResetVote||this.currentMapResetVote.id!==e.voteId)return;this.currentMapResetVote.votes.set(t,!!e.choice),this.emitMapResetVoteUpdate();const n=this.peers.size+1;this.currentMapResetVote.votes.size>=n&&this.finalizeMapResetVote(this.currentMapResetVote.id)}finalizeMapResetVote(e){if(!this.currentMapResetVote||this.currentMapResetVote.id!==e)return;this.voteTimeoutTimer&&(clearTimeout(this.voteTimeoutTimer),this.voteTimeoutTimer=null);const t=this.currentMapResetVote;this.currentMapResetVote=null;const n=this.peers.size+1;let s=0;for(const[,o]of t.votes.entries())o===!0&&s++;const r=s===n&&s>0;r?(this.onCombatLog(`✅ Map reset passed unanimously (${s}/${n})! Reseeding sector...`),(t.initiatorId===this.selfId||this.isMaster)&&this.sendMapReset&&this.sendMapReset({seed:t.newSeed}),this.triggerMapResetLocally(t.newSeed)):this.onCombatLog(`❌ Map reset vote failed (${s}/${n} agreed).`),this.emitMapResetVoteEnd(r)}emitMapResetVoteUpdate(){if(!this.currentMapResetVote)return;const e=this.peers.size+1;let t=0,n=0;for(const[,o]of this.currentMapResetVote.votes.entries())o?t++:n++;const s=Math.max(0,Math.ceil((this.currentMapResetVote.expiresAt-Date.now())/1e3)),r={active:!0,voteId:this.currentMapResetVote.id,initiatorId:this.currentMapResetVote.initiatorId,initiatorName:this.currentMapResetVote.initiatorName,yesCount:t,noCount:n,totalPeers:e,remainingTime:s,hasVoted:this.currentMapResetVote.votes.has(this.selfId)};for(const o of this.mapResetVoteListeners)o(r)}emitMapResetVoteEnd(e){for(const t of this.mapResetVoteListeners)t({active:!1,passed:e})}triggerMapResetLocally(e){this.mapSeed=e;for(const t of this.mapResetListeners)t(e)}onMapResetVote(e){return this.mapResetVoteListeners.add(e),()=>this.mapResetVoteListeners.delete(e)}onMapReset(e){return this.mapResetListeners.add(e),()=>this.mapResetListeners.delete(e)}getAveragePing(){if(this.peers.size===0)return 0;let e=0;for(const t of this.peers.values())e+=t.ping||30;return Math.round(e/this.peers.size)}leave(){if(di.stopMasterKeepAlive(),this.pingInterval&&clearInterval(this.pingInterval),this.stateBroadcastInterval&&clearInterval(this.stateBroadcastInterval),this.voteTimeoutTimer&&clearTimeout(this.voteTimeoutTimer),this.room){try{this.room.leave()}catch{}this.room=null}this.peers.clear(),this.cannonListeners.clear(),this.mineListeners.clear(),this.hitListeners.clear(),this.killListeners.clear(),this.laserListeners.clear(),this.decoyListeners.clear(),this.missileListeners.clear(),this.mapResetVoteListeners.clear(),this.mapResetListeners.clear(),this.currentMapResetVote=null}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const sc="170",ep=0,il=1,tp=2,hu=1,np=2,Sn=3,Kn=0,Ut=1,Rt=2,Xn=0,$i=1,dt=2,sl=3,rl=4,ip=5,li=100,sp=101,rp=102,op=103,ap=104,cp=200,lp=201,hp=202,up=203,aa=204,ca=205,dp=206,fp=207,pp=208,mp=209,gp=210,vp=211,yp=212,_p=213,xp=214,la=0,ha=1,ua=2,ts=3,da=4,fa=5,pa=6,ma=7,uu=0,Mp=1,Sp=2,qn=0,wp=1,Ep=2,Tp=3,du=4,bp=5,Ap=6,Rp=7,fu=300,ns=301,is=302,ga=303,va=304,$r=306,Os=1e3,fi=1001,ya=1002,ln=1003,Cp=1004,nr=1005,fn=1006,po=1007,pi=1008,Cn=1009,pu=1010,mu=1011,ks=1012,rc=1013,yi=1014,Tn=1015,Gs=1016,oc=1017,ac=1018,ss=1020,gu=35902,vu=1021,yu=1022,an=1023,_u=1024,xu=1025,Yi=1026,rs=1027,Mu=1028,cc=1029,Su=1030,lc=1031,hc=1033,Cr=33776,Pr=33777,Lr=33778,Dr=33779,_a=35840,xa=35841,Ma=35842,Sa=35843,wa=36196,Ea=37492,Ta=37496,ba=37808,Aa=37809,Ra=37810,Ca=37811,Pa=37812,La=37813,Da=37814,Ia=37815,Ua=37816,Na=37817,Fa=37818,Oa=37819,ka=37820,Ba=37821,Ir=36492,za=36494,Va=36495,wu=36283,Ga=36284,Ha=36285,Wa=36286,Pp=3200,Lp=3201,Eu=0,Dp=1,Gn="",jt="srgb",as="srgb-linear",Yr="linear",st="srgb",Ri=7680,ol=519,Ip=512,Up=513,Np=514,Tu=515,Fp=516,Op=517,kp=518,Bp=519,Xa=35044,al="300 es",bn=2e3,Br=2001;class cs{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const bt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mo=Math.PI/180,qa=180/Math.PI;function $n(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(bt[i&255]+bt[i>>8&255]+bt[i>>16&255]+bt[i>>24&255]+"-"+bt[e&255]+bt[e>>8&255]+"-"+bt[e>>16&15|64]+bt[e>>24&255]+"-"+bt[t&63|128]+bt[t>>8&255]+"-"+bt[t>>16&255]+bt[t>>24&255]+bt[n&255]+bt[n>>8&255]+bt[n>>16&255]+bt[n>>24&255]).toLowerCase()}function Bt(i,e,t){return Math.max(e,Math.min(t,i))}function zp(i,e){return(i%e+e)%e}function go(i,e,t){return(1-t)*i+t*e}function dn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function rt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*s+e.x,this.y=r*s+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,s,r,o,a,c,l){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l)}set(e,t,n,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],p=n[2],m=n[5],y=n[8],g=s[0],f=s[3],u=s[6],v=s[1],x=s[4],_=s[7],A=s[2],T=s[5],R=s[8];return r[0]=o*g+a*v+c*A,r[3]=o*f+a*x+c*T,r[6]=o*u+a*_+c*R,r[1]=l*g+h*v+d*A,r[4]=l*f+h*x+d*T,r[7]=l*u+h*_+d*R,r[2]=p*g+m*v+y*A,r[5]=p*f+m*x+y*T,r[8]=p*u+m*_+y*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=h*o-a*l,p=a*c-h*r,m=l*r-o*c,y=t*d+n*p+s*m;if(y===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/y;return e[0]=d*g,e[1]=(s*l-h*n)*g,e[2]=(a*n-s*o)*g,e[3]=p*g,e[4]=(h*t-s*c)*g,e[5]=(s*r-a*t)*g,e[6]=m*g,e[7]=(n*c-l*t)*g,e[8]=(o*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(vo.makeScale(e,t)),this}rotate(e){return this.premultiply(vo.makeRotation(-e)),this}translate(e,t){return this.premultiply(vo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const vo=new We;function bu(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function zr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Vp(){const i=zr("canvas");return i.style.display="block",i}const cl={};function bs(i){i in cl||(cl[i]=!0,console.warn(i))}function Gp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Hp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Wp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Ze={enabled:!0,workingColorSpace:as,spaces:{},convert:function(i,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===st&&(i.r=An(i.r),i.g=An(i.g),i.b=An(i.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(i.applyMatrix3(this.spaces[e].toXYZ),i.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===st&&(i.r=ji(i.r),i.g=ji(i.g),i.b=ji(i.b))),i},fromWorkingColorSpace:function(i,e){return this.convert(i,this.workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Gn?Yr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,e=this.workingColorSpace){return i.fromArray(this.spaces[e].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,e,t){return i.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function An(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const ll=[.64,.33,.3,.6,.15,.06],hl=[.2126,.7152,.0722],ul=[.3127,.329],dl=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),fl=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ze.define({[as]:{primaries:ll,whitePoint:ul,transfer:Yr,toXYZ:dl,fromXYZ:fl,luminanceCoefficients:hl,workingColorSpaceConfig:{unpackColorSpace:jt},outputColorSpaceConfig:{drawingBufferColorSpace:jt}},[jt]:{primaries:ll,whitePoint:ul,transfer:st,toXYZ:dl,fromXYZ:fl,luminanceCoefficients:hl,outputColorSpaceConfig:{drawingBufferColorSpace:jt}}});let Ci;class Xp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Ci===void 0&&(Ci=zr("canvas")),Ci.width=e.width,Ci.height=e.height;const n=Ci.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Ci}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=zr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=An(r[o]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(An(t[n]/255)*255):t[n]=An(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qp=0;class Au{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:qp++}),this.uuid=$n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(yo(s[o].image)):r.push(yo(s[o]))}else r=yo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function yo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let $p=0;class Nt extends cs{constructor(e=Nt.DEFAULT_IMAGE,t=Nt.DEFAULT_MAPPING,n=fi,s=fi,r=fn,o=pi,a=an,c=Cn,l=Nt.DEFAULT_ANISOTROPY,h=Gn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:$p++}),this.uuid=$n(),this.name="",this.source=new Au(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Os:e.x=e.x-Math.floor(e.x);break;case fi:e.x=e.x<0?0:1;break;case ya:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Os:e.y=e.y-Math.floor(e.y);break;case fi:e.y=e.y<0?0:1;break;case ya:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Nt.DEFAULT_IMAGE=null;Nt.DEFAULT_MAPPING=fu;Nt.DEFAULT_ANISOTROPY=1;class at{constructor(e=0,t=0,n=0,s=1){at.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],d=c[8],p=c[1],m=c[5],y=c[9],g=c[2],f=c[6],u=c[10];if(Math.abs(h-p)<.01&&Math.abs(d-g)<.01&&Math.abs(y-f)<.01){if(Math.abs(h+p)<.1&&Math.abs(d+g)<.1&&Math.abs(y+f)<.1&&Math.abs(l+m+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(l+1)/2,_=(m+1)/2,A=(u+1)/2,T=(h+p)/4,R=(d+g)/4,P=(y+f)/4;return x>_&&x>A?x<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(x),s=T/n,r=R/n):_>A?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=T/s,r=P/s):A<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(A),n=R/r,s=P/r),this.set(n,s,r,t),this}let v=Math.sqrt((f-y)*(f-y)+(d-g)*(d-g)+(p-h)*(p-h));return Math.abs(v)<.001&&(v=1),this.x=(f-y)/v,this.y=(d-g)/v,this.z=(p-h)/v,this.w=Math.acos((l+m+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Yp extends cs{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new at(0,0,e,t),this.scissorTest=!1,this.viewport=new at(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new Nt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Au(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends Yp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Ru extends Nt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class jp extends Nt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=fi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],d=n[s+3];const p=r[o+0],m=r[o+1],y=r[o+2],g=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d;return}if(a===1){e[t+0]=p,e[t+1]=m,e[t+2]=y,e[t+3]=g;return}if(d!==g||c!==p||l!==m||h!==y){let f=1-a;const u=c*p+l*m+h*y+d*g,v=u>=0?1:-1,x=1-u*u;if(x>Number.EPSILON){const A=Math.sqrt(x),T=Math.atan2(A,u*v);f=Math.sin(f*T)/A,a=Math.sin(a*T)/A}const _=a*v;if(c=c*f+p*_,l=l*f+m*_,h=h*f+y*_,d=d*f+g*_,f===1-a){const A=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=A,l*=A,h*=A,d*=A}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],d=r[o],p=r[o+1],m=r[o+2],y=r[o+3];return e[t]=a*y+h*d+c*m-l*p,e[t+1]=c*y+h*p+l*d-a*m,e[t+2]=l*y+h*m+a*p-c*d,e[t+3]=h*y-a*d-c*p-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),d=a(r/2),p=c(n/2),m=c(s/2),y=c(r/2);switch(o){case"XYZ":this._x=p*h*d+l*m*y,this._y=l*m*d-p*h*y,this._z=l*h*y+p*m*d,this._w=l*h*d-p*m*y;break;case"YXZ":this._x=p*h*d+l*m*y,this._y=l*m*d-p*h*y,this._z=l*h*y-p*m*d,this._w=l*h*d+p*m*y;break;case"ZXY":this._x=p*h*d-l*m*y,this._y=l*m*d+p*h*y,this._z=l*h*y+p*m*d,this._w=l*h*d-p*m*y;break;case"ZYX":this._x=p*h*d-l*m*y,this._y=l*m*d+p*h*y,this._z=l*h*y-p*m*d,this._w=l*h*d+p*m*y;break;case"YZX":this._x=p*h*d+l*m*y,this._y=l*m*d+p*h*y,this._z=l*h*y-p*m*d,this._w=l*h*d-p*m*y;break;case"XZY":this._x=p*h*d-l*m*y,this._y=l*m*d-p*h*y,this._z=l*h*y+p*m*d,this._w=l*h*d+p*m*y;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],d=t[10],p=n+a+d;if(p>0){const m=.5/Math.sqrt(p+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(n>a&&n>d){const m=2*Math.sqrt(1+n-a-d);this._w=(h-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>d){const m=2*Math.sqrt(1+a-n-d);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+d-n-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Bt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-t)*h)/l,p=Math.sin(t*h)/l;return this._w=o*d+this._w*p,this._x=n*d+this._x*p,this._y=s*d+this._y*p,this._z=r*d+this._z*p,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class N{constructor(e=0,t=0,n=0){N.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(pl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(pl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*n),h=2*(a*t-r*s),d=2*(r*n-o*t);return this.x=t+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=s+c*d+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _o.copy(this).projectOnVector(e),this.sub(_o)}reflect(e){return this.sub(_o.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Bt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _o=new N,pl=new Zt;class Hs{constructor(e=new N(1/0,1/0,1/0),t=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,nn):nn.fromBufferAttribute(r,o),nn.applyMatrix4(e.matrixWorld),this.expandByPoint(nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ir.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ir.copy(n.boundingBox)),ir.applyMatrix4(e.matrixWorld),this.union(ir)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,nn),nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(gs),sr.subVectors(this.max,gs),Pi.subVectors(e.a,gs),Li.subVectors(e.b,gs),Di.subVectors(e.c,gs),In.subVectors(Li,Pi),Un.subVectors(Di,Li),ei.subVectors(Pi,Di);let t=[0,-In.z,In.y,0,-Un.z,Un.y,0,-ei.z,ei.y,In.z,0,-In.x,Un.z,0,-Un.x,ei.z,0,-ei.x,-In.y,In.x,0,-Un.y,Un.x,0,-ei.y,ei.x,0];return!xo(t,Pi,Li,Di,sr)||(t=[1,0,0,0,1,0,0,0,1],!xo(t,Pi,Li,Di,sr))?!1:(rr.crossVectors(In,Un),t=[rr.x,rr.y,rr.z],xo(t,Pi,Li,Di,sr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(nn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const gn=[new N,new N,new N,new N,new N,new N,new N,new N],nn=new N,ir=new Hs,Pi=new N,Li=new N,Di=new N,In=new N,Un=new N,ei=new N,gs=new N,sr=new N,rr=new N,ti=new N;function xo(i,e,t,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){ti.fromArray(i,r);const a=s.x*Math.abs(ti.x)+s.y*Math.abs(ti.y)+s.z*Math.abs(ti.z),c=e.dot(ti),l=t.dot(ti),h=n.dot(ti);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Kp=new Hs,vs=new N,Mo=new N;class Ws{constructor(e=new N,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Kp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;vs.subVectors(e,this.center);const t=vs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(vs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Mo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(vs.copy(e.center).add(Mo)),this.expandByPoint(vs.copy(e.center).sub(Mo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const vn=new N,So=new N,or=new N,Nn=new N,wo=new N,ar=new N,Eo=new N;class Cu{constructor(e=new N,t=new N(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(vn.copy(this.origin).addScaledVector(this.direction,t),vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){So.copy(e).add(t).multiplyScalar(.5),or.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(So);const r=e.distanceTo(t)*.5,o=-this.direction.dot(or),a=Nn.dot(this.direction),c=-Nn.dot(or),l=Nn.lengthSq(),h=Math.abs(1-o*o);let d,p,m,y;if(h>0)if(d=o*c-a,p=o*a-c,y=r*h,d>=0)if(p>=-y)if(p<=y){const g=1/h;d*=g,p*=g,m=d*(d+o*p+2*a)+p*(o*d+p+2*c)+l}else p=r,d=Math.max(0,-(o*p+a)),m=-d*d+p*(p+2*c)+l;else p=-r,d=Math.max(0,-(o*p+a)),m=-d*d+p*(p+2*c)+l;else p<=-y?(d=Math.max(0,-(-o*r+a)),p=d>0?-r:Math.min(Math.max(-r,-c),r),m=-d*d+p*(p+2*c)+l):p<=y?(d=0,p=Math.min(Math.max(-r,-c),r),m=p*(p+2*c)+l):(d=Math.max(0,-(o*r+a)),p=d>0?r:Math.min(Math.max(-r,-c),r),m=-d*d+p*(p+2*c)+l);else p=o>0?-r:r,d=Math.max(0,-(o*p+a)),m=-d*d+p*(p+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(So).addScaledVector(or,p),m}intersectSphere(e,t){vn.subVectors(e.center,this.origin);const n=vn.dot(this.direction),s=vn.dot(vn)-n*n,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,p=this.origin;return l>=0?(n=(e.min.x-p.x)*l,s=(e.max.x-p.x)*l):(n=(e.max.x-p.x)*l,s=(e.min.x-p.x)*l),h>=0?(r=(e.min.y-p.y)*h,o=(e.max.y-p.y)*h):(r=(e.max.y-p.y)*h,o=(e.min.y-p.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),d>=0?(a=(e.min.z-p.z)*d,c=(e.max.z-p.z)*d):(a=(e.max.z-p.z)*d,c=(e.min.z-p.z)*d),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,vn)!==null}intersectTriangle(e,t,n,s,r){wo.subVectors(t,e),ar.subVectors(n,e),Eo.crossVectors(wo,ar);let o=this.direction.dot(Eo),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Nn.subVectors(this.origin,e);const c=a*this.direction.dot(ar.crossVectors(Nn,ar));if(c<0)return null;const l=a*this.direction.dot(wo.cross(Nn));if(l<0||c+l>o)return null;const h=-a*Nn.dot(Eo);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class it{constructor(e,t,n,s,r,o,a,c,l,h,d,p,m,y,g,f){it.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,o,a,c,l,h,d,p,m,y,g,f)}set(e,t,n,s,r,o,a,c,l,h,d,p,m,y,g,f){const u=this.elements;return u[0]=e,u[4]=t,u[8]=n,u[12]=s,u[1]=r,u[5]=o,u[9]=a,u[13]=c,u[2]=l,u[6]=h,u[10]=d,u[14]=p,u[3]=m,u[7]=y,u[11]=g,u[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new it().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Ii.setFromMatrixColumn(e,0).length(),r=1/Ii.setFromMatrixColumn(e,1).length(),o=1/Ii.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const p=o*h,m=o*d,y=a*h,g=a*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=m+y*l,t[5]=p-g*l,t[9]=-a*c,t[2]=g-p*l,t[6]=y+m*l,t[10]=o*c}else if(e.order==="YXZ"){const p=c*h,m=c*d,y=l*h,g=l*d;t[0]=p+g*a,t[4]=y*a-m,t[8]=o*l,t[1]=o*d,t[5]=o*h,t[9]=-a,t[2]=m*a-y,t[6]=g+p*a,t[10]=o*c}else if(e.order==="ZXY"){const p=c*h,m=c*d,y=l*h,g=l*d;t[0]=p-g*a,t[4]=-o*d,t[8]=y+m*a,t[1]=m+y*a,t[5]=o*h,t[9]=g-p*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const p=o*h,m=o*d,y=a*h,g=a*d;t[0]=c*h,t[4]=y*l-m,t[8]=p*l+g,t[1]=c*d,t[5]=g*l+p,t[9]=m*l-y,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const p=o*c,m=o*l,y=a*c,g=a*l;t[0]=c*h,t[4]=g-p*d,t[8]=y*d+m,t[1]=d,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=m*d+y,t[10]=p-g*d}else if(e.order==="XZY"){const p=o*c,m=o*l,y=a*c,g=a*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=p*d+g,t[5]=o*h,t[9]=m*d-y,t[2]=y*d-m,t[6]=a*h,t[10]=g*d+p}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Zp,e,Jp)}lookAt(e,t,n){const s=this.elements;return Gt.subVectors(e,t),Gt.lengthSq()===0&&(Gt.z=1),Gt.normalize(),Fn.crossVectors(n,Gt),Fn.lengthSq()===0&&(Math.abs(n.z)===1?Gt.x+=1e-4:Gt.z+=1e-4,Gt.normalize(),Fn.crossVectors(n,Gt)),Fn.normalize(),cr.crossVectors(Gt,Fn),s[0]=Fn.x,s[4]=cr.x,s[8]=Gt.x,s[1]=Fn.y,s[5]=cr.y,s[9]=Gt.y,s[2]=Fn.z,s[6]=cr.z,s[10]=Gt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],p=n[9],m=n[13],y=n[2],g=n[6],f=n[10],u=n[14],v=n[3],x=n[7],_=n[11],A=n[15],T=s[0],R=s[4],P=s[8],w=s[12],M=s[1],D=s[5],G=s[9],S=s[13],L=s[2],F=s[6],I=s[10],z=s[14],O=s[3],U=s[7],B=s[11],Z=s[15];return r[0]=o*T+a*M+c*L+l*O,r[4]=o*R+a*D+c*F+l*U,r[8]=o*P+a*G+c*I+l*B,r[12]=o*w+a*S+c*z+l*Z,r[1]=h*T+d*M+p*L+m*O,r[5]=h*R+d*D+p*F+m*U,r[9]=h*P+d*G+p*I+m*B,r[13]=h*w+d*S+p*z+m*Z,r[2]=y*T+g*M+f*L+u*O,r[6]=y*R+g*D+f*F+u*U,r[10]=y*P+g*G+f*I+u*B,r[14]=y*w+g*S+f*z+u*Z,r[3]=v*T+x*M+_*L+A*O,r[7]=v*R+x*D+_*F+A*U,r[11]=v*P+x*G+_*I+A*B,r[15]=v*w+x*S+_*z+A*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],d=e[6],p=e[10],m=e[14],y=e[3],g=e[7],f=e[11],u=e[15];return y*(+r*c*d-s*l*d-r*a*p+n*l*p+s*a*m-n*c*m)+g*(+t*c*m-t*l*p+r*o*p-s*o*m+s*l*h-r*c*h)+f*(+t*l*d-t*a*m-r*o*d+n*o*m+r*a*h-n*l*h)+u*(-s*a*h-t*c*d+t*a*p+s*o*d-n*o*p+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],d=e[9],p=e[10],m=e[11],y=e[12],g=e[13],f=e[14],u=e[15],v=d*f*l-g*p*l+g*c*m-a*f*m-d*c*u+a*p*u,x=y*p*l-h*f*l-y*c*m+o*f*m+h*c*u-o*p*u,_=h*g*l-y*d*l+y*a*m-o*g*m-h*a*u+o*d*u,A=y*d*c-h*g*c-y*a*p+o*g*p+h*a*f-o*d*f,T=t*v+n*x+s*_+r*A;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/T;return e[0]=v*R,e[1]=(g*p*r-d*f*r-g*s*m+n*f*m+d*s*u-n*p*u)*R,e[2]=(a*f*r-g*c*r+g*s*l-n*f*l-a*s*u+n*c*u)*R,e[3]=(d*c*r-a*p*r-d*s*l+n*p*l+a*s*m-n*c*m)*R,e[4]=x*R,e[5]=(h*f*r-y*p*r+y*s*m-t*f*m-h*s*u+t*p*u)*R,e[6]=(y*c*r-o*f*r-y*s*l+t*f*l+o*s*u-t*c*u)*R,e[7]=(o*p*r-h*c*r+h*s*l-t*p*l-o*s*m+t*c*m)*R,e[8]=_*R,e[9]=(y*d*r-h*g*r-y*n*m+t*g*m+h*n*u-t*d*u)*R,e[10]=(o*g*r-y*a*r+y*n*l-t*g*l-o*n*u+t*a*u)*R,e[11]=(h*a*r-o*d*r-h*n*l+t*d*l+o*n*m-t*a*m)*R,e[12]=A*R,e[13]=(h*g*s-y*d*s+y*n*p-t*g*p-h*n*f+t*d*f)*R,e[14]=(y*a*s-o*g*s-y*n*c+t*g*c+o*n*f-t*a*f)*R,e[15]=(o*d*s-h*a*s+h*n*c-t*d*c-o*n*p+t*a*p)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,o){return this.set(1,n,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,d=a+a,p=r*l,m=r*h,y=r*d,g=o*h,f=o*d,u=a*d,v=c*l,x=c*h,_=c*d,A=n.x,T=n.y,R=n.z;return s[0]=(1-(g+u))*A,s[1]=(m+_)*A,s[2]=(y-x)*A,s[3]=0,s[4]=(m-_)*T,s[5]=(1-(p+u))*T,s[6]=(f+v)*T,s[7]=0,s[8]=(y+x)*R,s[9]=(f-v)*R,s[10]=(1-(p+g))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Ii.set(s[0],s[1],s[2]).length();const o=Ii.set(s[4],s[5],s[6]).length(),a=Ii.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],sn.copy(this);const l=1/r,h=1/o,d=1/a;return sn.elements[0]*=l,sn.elements[1]*=l,sn.elements[2]*=l,sn.elements[4]*=h,sn.elements[5]*=h,sn.elements[6]*=h,sn.elements[8]*=d,sn.elements[9]*=d,sn.elements[10]*=d,t.setFromRotationMatrix(sn),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,s,r,o,a=bn){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),p=(n+s)/(n-s);let m,y;if(a===bn)m=-(o+r)/(o-r),y=-2*o*r/(o-r);else if(a===Br)m=-o/(o-r),y=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,o,a=bn){const c=this.elements,l=1/(t-e),h=1/(n-s),d=1/(o-r),p=(t+e)*l,m=(n+s)*h;let y,g;if(a===bn)y=(o+r)*d,g=-2*d;else if(a===Br)y=r*d,g=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-p,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=g,c[14]=-y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ii=new N,sn=new it,Zp=new N(0,0,0),Jp=new N(1,1,1),Fn=new N,cr=new N,Gt=new N,ml=new it,gl=new Zt;class Qt{constructor(e=0,t=0,n=0,s=Qt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],d=s[2],p=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Bt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(p,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Bt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Bt(p,-1,1)),Math.abs(p)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Bt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(p,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Bt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Bt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(p,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ml.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ml,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gl.setFromEuler(this),this.setFromQuaternion(gl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qt.DEFAULT_ORDER="XYZ";class Pu{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qp=0;const vl=new N,Ui=new Zt,yn=new it,lr=new N,ys=new N,em=new N,tm=new Zt,yl=new N(1,0,0),_l=new N(0,1,0),xl=new N(0,0,1),Ml={type:"added"},nm={type:"removed"},Ni={type:"childadded",child:null},To={type:"childremoved",child:null};class vt extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vt.DEFAULT_UP.clone();const e=new N,t=new Qt,n=new Zt,s=new N(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new it},normalMatrix:{value:new We}}),this.matrix=new it,this.matrixWorld=new it,this.matrixAutoUpdate=vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(yl,e)}rotateY(e){return this.rotateOnAxis(_l,e)}rotateZ(e){return this.rotateOnAxis(xl,e)}translateOnAxis(e,t){return vl.copy(e).applyQuaternion(this.quaternion),this.position.add(vl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(yl,e)}translateY(e){return this.translateOnAxis(_l,e)}translateZ(e){return this.translateOnAxis(xl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(yn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?lr.copy(e):lr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),ys.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?yn.lookAt(ys,lr,this.up):yn.lookAt(lr,ys,this.up),this.quaternion.setFromRotationMatrix(yn),s&&(yn.extractRotation(s.matrixWorld),Ui.setFromRotationMatrix(yn),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ml),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nm),To.child=e,this.dispatchEvent(To),To.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),yn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),yn.multiply(e.parent.matrixWorld)),e.applyMatrix4(yn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ml),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,e,em),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ys,tm,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),d=o(e.shapes),p=o(e.skeletons),m=o(e.animations),y=o(e.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),p.length>0&&(n.skeletons=p),m.length>0&&(n.animations=m),y.length>0&&(n.nodes=y)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}vt.DEFAULT_UP=new N(0,1,0);vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const rn=new N,_n=new N,bo=new N,xn=new N,Fi=new N,Oi=new N,Sl=new N,Ao=new N,Ro=new N,Co=new N,Po=new at,Lo=new at,Do=new at;class Kt{constructor(e=new N,t=new N,n=new N){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),rn.subVectors(e,t),s.cross(rn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){rn.subVectors(s,t),_n.subVectors(n,t),bo.subVectors(e,t);const o=rn.dot(rn),a=rn.dot(_n),c=rn.dot(bo),l=_n.dot(_n),h=_n.dot(bo),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const p=1/d,m=(l*c-a*h)*p,y=(o*h-a*c)*p;return r.set(1-m-y,y,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,xn)===null?!1:xn.x>=0&&xn.y>=0&&xn.x+xn.y<=1}static getInterpolation(e,t,n,s,r,o,a,c){return this.getBarycoord(e,t,n,s,xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,xn.x),c.addScaledVector(o,xn.y),c.addScaledVector(a,xn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,o){return Po.setScalar(0),Lo.setScalar(0),Do.setScalar(0),Po.fromBufferAttribute(e,t),Lo.fromBufferAttribute(e,n),Do.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Po,r.x),o.addScaledVector(Lo,r.y),o.addScaledVector(Do,r.z),o}static isFrontFacing(e,t,n,s){return rn.subVectors(n,t),_n.subVectors(e,t),rn.cross(_n).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return rn.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),rn.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Kt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Kt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Kt.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Kt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Kt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let o,a;Fi.subVectors(s,n),Oi.subVectors(r,n),Ao.subVectors(e,n);const c=Fi.dot(Ao),l=Oi.dot(Ao);if(c<=0&&l<=0)return t.copy(n);Ro.subVectors(e,s);const h=Fi.dot(Ro),d=Oi.dot(Ro);if(h>=0&&d<=h)return t.copy(s);const p=c*d-h*l;if(p<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(n).addScaledVector(Fi,o);Co.subVectors(e,r);const m=Fi.dot(Co),y=Oi.dot(Co);if(y>=0&&m<=y)return t.copy(r);const g=m*l-c*y;if(g<=0&&l>=0&&y<=0)return a=l/(l-y),t.copy(n).addScaledVector(Oi,a);const f=h*y-m*d;if(f<=0&&d-h>=0&&m-y>=0)return Sl.subVectors(r,s),a=(d-h)/(d-h+(m-y)),t.copy(s).addScaledVector(Sl,a);const u=1/(f+g+p);return o=g*u,a=p*u,t.copy(n).addScaledVector(Fi,o).addScaledVector(Oi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Lu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},hr={h:0,s:0,l:0};function Io(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class je{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ze.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ze.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ze.workingColorSpace){if(e=zp(e,1),t=Bt(t,0,1),n=Bt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=Io(o,r,e+1/3),this.g=Io(o,r,e),this.b=Io(o,r,e-1/3)}return Ze.toWorkingColorSpace(this,s),this}setStyle(e,t=jt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=jt){const n=Lu[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=jt){return Ze.fromWorkingColorSpace(At.copy(this),e),Math.round(Bt(At.r*255,0,255))*65536+Math.round(Bt(At.g*255,0,255))*256+Math.round(Bt(At.b*255,0,255))}getHexString(e=jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ze.workingColorSpace){Ze.fromWorkingColorSpace(At.copy(this),t);const n=At.r,s=At.g,r=At.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=Ze.workingColorSpace){return Ze.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=jt){Ze.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,s=At.b;return e!==jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(hr);const n=go(On.h,hr.h,t),s=go(On.s,hr.s,t),r=go(On.l,hr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new je;je.NAMES=Lu;let im=0;class Ti extends cs{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:im++}),this.uuid=$n(),this.name="",this.blending=$i,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=aa,this.blendDst=ca,this.blendEquation=li,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new je(0,0,0),this.blendAlpha=0,this.depthFunc=ts,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ol,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ri,this.stencilZFail=Ri,this.stencilZPass=Ri,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==Kn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==aa&&(n.blendSrc=this.blendSrc),this.blendDst!==ca&&(n.blendDst=this.blendDst),this.blendEquation!==li&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ts&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ol&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ri&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ri&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ri&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Ke extends Ti{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new je(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.combine=uu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const mt=new N,ur=new ze;class yt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Xa,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ur.fromBufferAttribute(this,t),ur.applyMatrix3(e),this.setXY(t,ur.x,ur.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xa&&(e.usage=this.usage),e}}class Du extends yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Iu extends yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class pt extends yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let sm=0;const Yt=new it,Uo=new vt,ki=new N,Ht=new Hs,_s=new Hs,Mt=new N;class wt extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sm++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(bu(e)?Iu:Du)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new We().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Yt.makeRotationFromQuaternion(e),this.applyMatrix4(Yt),this}rotateX(e){return Yt.makeRotationX(e),this.applyMatrix4(Yt),this}rotateY(e){return Yt.makeRotationY(e),this.applyMatrix4(Yt),this}rotateZ(e){return Yt.makeRotationZ(e),this.applyMatrix4(Yt),this}translate(e,t,n){return Yt.makeTranslation(e,t,n),this.applyMatrix4(Yt),this}scale(e,t,n){return Yt.makeScale(e,t,n),this.applyMatrix4(Yt),this}lookAt(e){return Uo.lookAt(e),Uo.updateMatrix(),this.applyMatrix4(Uo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ki).negate(),this.translate(ki.x,ki.y,ki.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new pt(n,3))}else{for(let n=0,s=t.count;n<s;n++){const r=e[n];t.setXYZ(n,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Hs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Ht.setFromBufferAttribute(r),this.morphTargetsRelative?(Mt.addVectors(this.boundingBox.min,Ht.min),this.boundingBox.expandByPoint(Mt),Mt.addVectors(this.boundingBox.max,Ht.max),this.boundingBox.expandByPoint(Mt)):(this.boundingBox.expandByPoint(Ht.min),this.boundingBox.expandByPoint(Ht.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ws);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new N,1/0);return}if(e){const n=this.boundingSphere.center;if(Ht.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];_s.setFromBufferAttribute(a),this.morphTargetsRelative?(Mt.addVectors(Ht.min,_s.min),Ht.expandByPoint(Mt),Mt.addVectors(Ht.max,_s.max),Ht.expandByPoint(Mt)):(Ht.expandByPoint(_s.min),Ht.expandByPoint(_s.max))}Ht.getCenter(n);let s=0;for(let r=0,o=e.count;r<o;r++)Mt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Mt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Mt.fromBufferAttribute(a,l),c&&(ki.fromBufferAttribute(e,l),Mt.add(ki)),s=Math.max(s,n.distanceToSquared(Mt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let P=0;P<n.count;P++)a[P]=new N,c[P]=new N;const l=new N,h=new N,d=new N,p=new ze,m=new ze,y=new ze,g=new N,f=new N;function u(P,w,M){l.fromBufferAttribute(n,P),h.fromBufferAttribute(n,w),d.fromBufferAttribute(n,M),p.fromBufferAttribute(r,P),m.fromBufferAttribute(r,w),y.fromBufferAttribute(r,M),h.sub(l),d.sub(l),m.sub(p),y.sub(p);const D=1/(m.x*y.y-y.x*m.y);isFinite(D)&&(g.copy(h).multiplyScalar(y.y).addScaledVector(d,-m.y).multiplyScalar(D),f.copy(d).multiplyScalar(m.x).addScaledVector(h,-y.x).multiplyScalar(D),a[P].add(g),a[w].add(g),a[M].add(g),c[P].add(f),c[w].add(f),c[M].add(f))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let P=0,w=v.length;P<w;++P){const M=v[P],D=M.start,G=M.count;for(let S=D,L=D+G;S<L;S+=3)u(e.getX(S+0),e.getX(S+1),e.getX(S+2))}const x=new N,_=new N,A=new N,T=new N;function R(P){A.fromBufferAttribute(s,P),T.copy(A);const w=a[P];x.copy(w),x.sub(A.multiplyScalar(A.dot(w))).normalize(),_.crossVectors(T,w);const D=_.dot(c[P])<0?-1:1;o.setXYZW(P,x.x,x.y,x.z,D)}for(let P=0,w=v.length;P<w;++P){const M=v[P],D=M.start,G=M.count;for(let S=D,L=D+G;S<L;S+=3)R(e.getX(S+0)),R(e.getX(S+1)),R(e.getX(S+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let p=0,m=n.count;p<m;p++)n.setXYZ(p,0,0,0);const s=new N,r=new N,o=new N,a=new N,c=new N,l=new N,h=new N,d=new N;if(e)for(let p=0,m=e.count;p<m;p+=3){const y=e.getX(p+0),g=e.getX(p+1),f=e.getX(p+2);s.fromBufferAttribute(t,y),r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,f),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),a.fromBufferAttribute(n,y),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,f),a.add(h),c.add(h),l.add(h),n.setXYZ(y,a.x,a.y,a.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(f,l.x,l.y,l.z)}else for(let p=0,m=t.count;p<m;p+=3)s.fromBufferAttribute(t,p+0),r.fromBufferAttribute(t,p+1),o.fromBufferAttribute(t,p+2),h.subVectors(o,r),d.subVectors(s,r),h.cross(d),n.setXYZ(p+0,h.x,h.y,h.z),n.setXYZ(p+1,h.x,h.y,h.z),n.setXYZ(p+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Mt.fromBufferAttribute(e,t),Mt.normalize(),e.setXYZ(t,Mt.x,Mt.y,Mt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,d=a.normalized,p=new l.constructor(c.length*h);let m=0,y=0;for(let g=0,f=c.length;g<f;g++){a.isInterleavedBufferAttribute?m=c[g]*a.data.stride+a.offset:m=c[g]*h;for(let u=0;u<h;u++)p[y++]=l[m++]}return new yt(p,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new wt,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,n);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){const p=l[h],m=e(p,n);c.push(m)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,p=l.length;d<p;d++){const m=l[d];h.push(m.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let p=0,m=d.length;p<m;p++)h.push(d[p].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const wl=new it,ni=new Cu,dr=new Ws,El=new N,fr=new N,pr=new N,mr=new N,No=new N,gr=new N,Tl=new N,vr=new N;class we extends vt{constructor(e=new wt,t=new Ke){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){gr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],d=r[c];h!==0&&(No.fromBufferAttribute(d,e),o?gr.addScaledVector(No,h):gr.addScaledVector(No.sub(t),h))}t.add(gr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(r),ni.copy(e.ray).recast(e.near),!(dr.containsPoint(ni.origin)===!1&&(ni.intersectSphere(dr,El)===null||ni.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(wl.copy(r).invert(),ni.copy(e.ray).applyMatrix4(wl),!(n.boundingBox!==null&&ni.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ni)))}_computeIntersections(e,t,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,p=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let y=0,g=p.length;y<g;y++){const f=p[y],u=o[f.materialIndex],v=Math.max(f.start,m.start),x=Math.min(a.count,Math.min(f.start+f.count,m.start+m.count));for(let _=v,A=x;_<A;_+=3){const T=a.getX(_),R=a.getX(_+1),P=a.getX(_+2);s=yr(this,u,e,n,l,h,d,T,R,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const y=Math.max(0,m.start),g=Math.min(a.count,m.start+m.count);for(let f=y,u=g;f<u;f+=3){const v=a.getX(f),x=a.getX(f+1),_=a.getX(f+2);s=yr(this,o,e,n,l,h,d,v,x,_),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let y=0,g=p.length;y<g;y++){const f=p[y],u=o[f.materialIndex],v=Math.max(f.start,m.start),x=Math.min(c.count,Math.min(f.start+f.count,m.start+m.count));for(let _=v,A=x;_<A;_+=3){const T=_,R=_+1,P=_+2;s=yr(this,u,e,n,l,h,d,T,R,P),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const y=Math.max(0,m.start),g=Math.min(c.count,m.start+m.count);for(let f=y,u=g;f<u;f+=3){const v=f,x=f+1,_=f+2;s=yr(this,o,e,n,l,h,d,v,x,_),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function rm(i,e,t,n,s,r,o,a){let c;if(e.side===Ut?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,e.side===Kn,a),c===null)return null;vr.copy(a),vr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(vr);return l<t.near||l>t.far?null:{distance:l,point:vr.clone(),object:i}}function yr(i,e,t,n,s,r,o,a,c,l){i.getVertexPosition(a,fr),i.getVertexPosition(c,pr),i.getVertexPosition(l,mr);const h=rm(i,e,t,n,fr,pr,mr,Tl);if(h){const d=new N;Kt.getBarycoord(Tl,fr,pr,mr,d),s&&(h.uv=Kt.getInterpolatedAttribute(s,a,c,l,d,new ze)),r&&(h.uv1=Kt.getInterpolatedAttribute(r,a,c,l,d,new ze)),o&&(h.normal=Kt.getInterpolatedAttribute(o,a,c,l,d,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const p={a,b:c,c:l,normal:new N,materialIndex:0};Kt.getNormal(fr,pr,mr,p.normal),h.face=p,h.barycoord=d}return h}class gt extends wt{constructor(e=1,t=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],d=[];let p=0,m=0;y("z","y","x",-1,-1,n,t,e,o,r,0),y("z","y","x",1,-1,n,t,-e,o,r,1),y("x","z","y",1,1,e,n,t,s,o,2),y("x","z","y",1,-1,e,n,-t,s,o,3),y("x","y","z",1,-1,e,t,n,s,r,4),y("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new pt(l,3)),this.setAttribute("normal",new pt(h,3)),this.setAttribute("uv",new pt(d,2));function y(g,f,u,v,x,_,A,T,R,P,w){const M=_/R,D=A/P,G=_/2,S=A/2,L=T/2,F=R+1,I=P+1;let z=0,O=0;const U=new N;for(let B=0;B<I;B++){const Z=B*D-S;for(let le=0;le<F;le++){const fe=le*M-G;U[g]=fe*v,U[f]=Z*x,U[u]=L,l.push(U.x,U.y,U.z),U[g]=0,U[f]=0,U[u]=T>0?1:-1,h.push(U.x,U.y,U.z),d.push(le/R),d.push(1-B/P),z+=1}}for(let B=0;B<P;B++)for(let Z=0;Z<R;Z++){const le=p+Z+F*B,fe=p+Z+F*(B+1),X=p+(Z+1)+F*(B+1),Q=p+(Z+1)+F*B;c.push(le,fe,Q),c.push(fe,X,Q),O+=6}a.addGroup(m,O,w),m+=O,p+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function os(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Dt(i){const e={};for(let t=0;t<i.length;t++){const n=os(i[t]);for(const s in n)e[s]=n[s]}return e}function om(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Uu(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const am={clone:os,merge:Dt};var cm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,lm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends Ti{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cm,this.fragmentShader=lm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=om(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Nu extends vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new it,this.projectionMatrix=new it,this.projectionMatrixInverse=new it,this.coordinateSystem=bn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const kn=new N,bl=new ze,Al=new ze;class Wt extends Nu{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=qa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qa*2*Math.atan(Math.tan(mo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(kn.x,kn.y).multiplyScalar(-e/kn.z),kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(kn.x,kn.y).multiplyScalar(-e/kn.z)}getViewSize(e,t){return this.getViewBounds(e,bl,Al),t.subVectors(Al,bl)}setViewOffset(e,t,n,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(mo*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Bi=-90,zi=1;class hm extends vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wt(Bi,zi,e,t);s.layers=this.layers,this.add(s);const r=new Wt(Bi,zi,e,t);r.layers=this.layers,this.add(r);const o=new Wt(Bi,zi,e,t);o.layers=this.layers,this.add(o);const a=new Wt(Bi,zi,e,t);a.layers=this.layers,this.add(a);const c=new Wt(Bi,zi,e,t);c.layers=this.layers,this.add(c);const l=new Wt(Bi,zi,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===bn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Br)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,d=e.getRenderTarget(),p=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),y=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,o),e.setRenderTarget(n,2,s),e.render(t,a),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(d,p,m),e.xr.enabled=y,n.texture.needsPMREMUpdate=!0}}class Fu extends Nt{constructor(e,t,n,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:ns,super(e,t,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class um extends _i{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Fu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:fn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new gt(5,5,5),r=new Zn({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ut,blending:Xn});r.uniforms.tEquirect.value=t;const o=new we(s,r),a=t.minFilter;return t.minFilter===pi&&(t.minFilter=fn),new hm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,s);e.setRenderTarget(r)}}const Fo=new N,dm=new N,fm=new We;class ai{constructor(e=new N(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Fo.subVectors(n,t).cross(dm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Fo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||fm.getNormalMatrix(e),s=this.coplanarPoint(Fo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ii=new Ws,_r=new N;class uc{constructor(e=new ai,t=new ai,n=new ai,s=new ai,r=new ai,o=new ai){this.planes=[e,t,n,s,r,o]}set(e,t,n,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=bn){const n=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],d=s[6],p=s[7],m=s[8],y=s[9],g=s[10],f=s[11],u=s[12],v=s[13],x=s[14],_=s[15];if(n[0].setComponents(c-r,p-l,f-m,_-u).normalize(),n[1].setComponents(c+r,p+l,f+m,_+u).normalize(),n[2].setComponents(c+o,p+h,f+y,_+v).normalize(),n[3].setComponents(c-o,p-h,f-y,_-v).normalize(),n[4].setComponents(c-a,p-d,f-g,_-x).normalize(),t===bn)n[5].setComponents(c+a,p+d,f+g,_+x).normalize();else if(t===Br)n[5].setComponents(a,d,g,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ii)}intersectsSprite(e){return ii.center.set(0,0,0),ii.radius=.7071067811865476,ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(ii)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(_r.x=s.normal.x>0?e.max.x:e.min.x,_r.y=s.normal.y>0?e.max.y:e.min.y,_r.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(_r)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ou(){let i=null,e=!1,t=null,n=null;function s(r,o){t(r,o),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function pm(i){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,d=l.byteLength,p=i.createBuffer();i.bindBuffer(c,p),i.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:p,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,c,l){const h=c.array,d=c.updateRanges;if(i.bindBuffer(l,a),d.length===0)i.bufferSubData(l,0,h);else{d.sort((m,y)=>m.start-y.start);let p=0;for(let m=1;m<d.length;m++){const y=d[p],g=d[m];g.start<=y.start+y.count+1?y.count=Math.max(y.count,g.start+g.count-y.start):(++p,d[p]=g)}d.length=p+1;for(let m=0,y=d.length;m<y;m++){const g=d[m];i.bufferSubData(l,g.start*h.BYTES_PER_ELEMENT,h,g.start,g.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(i.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class Xs extends wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,d=e/a,p=t/c,m=[],y=[],g=[],f=[];for(let u=0;u<h;u++){const v=u*p-o;for(let x=0;x<l;x++){const _=x*d-r;y.push(_,-v,0),g.push(0,0,1),f.push(x/a),f.push(1-u/c)}}for(let u=0;u<c;u++)for(let v=0;v<a;v++){const x=v+l*u,_=v+l*(u+1),A=v+1+l*(u+1),T=v+1+l*u;m.push(x,_,T),m.push(_,A,T)}this.setIndex(m),this.setAttribute("position",new pt(y,3)),this.setAttribute("normal",new pt(g,3)),this.setAttribute("uv",new pt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xs(e.width,e.height,e.widthSegments,e.heightSegments)}}var mm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gm=`#ifdef USE_ALPHAHASH
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
#endif`,vm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ym=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_m=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,xm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mm=`#ifdef USE_AOMAP
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
#endif`,Sm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wm=`#ifdef USE_BATCHING
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
#endif`,Em=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Tm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Am=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Rm=`#ifdef USE_IRIDESCENCE
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
#endif`,Cm=`#ifdef USE_BUMPMAP
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
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Im=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Fm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Om=`#if defined( USE_COLOR_ALPHA )
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
#endif`,km=`#define PI 3.141592653589793
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
#endif`,zm=`vec3 transformedNormal = objectNormal;
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
#endif`,Vm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Xm="gl_FragColor = linearToOutputTexel( gl_FragColor );",qm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,$m=`#ifdef USE_ENVMAP
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
#endif`,Ym=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,jm=`#ifdef USE_ENVMAP
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
#endif`,Km=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zm=`#ifdef USE_ENVMAP
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
#endif`,Jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,tg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ng=`#ifdef USE_GRADIENTMAP
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
}`,ig=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,og=`uniform bool receiveShadow;
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
#endif`,ag=`#ifdef USE_ENVMAP
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
#endif`,cg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,hg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ug=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,dg=`PhysicalMaterial material;
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
#endif`,fg=`struct PhysicalMaterial {
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
}`,pg=`
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
#endif`,mg=`#if defined( RE_IndirectDiffuse )
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
#endif`,gg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,vg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_g=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Eg=`#if defined( USE_POINTS_UV )
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
#endif`,Tg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Ag=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Rg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Cg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pg=`#ifdef USE_MORPHTARGETS
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
#endif`,Lg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ig=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Ug=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ng=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Og=`#ifdef USE_NORMALMAP
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
#endif`,kg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zg=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Vg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gg=`#ifdef OPAQUE
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
}`,Wg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$g=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Kg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Jg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Qg=`float getShadowMask() {
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
}`,e0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,t0=`#ifdef USE_SKINNING
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
#endif`,n0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,i0=`#ifdef USE_SKINNING
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
#endif`,s0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,r0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,o0=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,a0=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,c0=`#ifdef USE_TRANSMISSION
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
#endif`,l0=`#ifdef USE_TRANSMISSION
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
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,u0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,d0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const p0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,m0=`uniform sampler2D t2D;
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
}`,g0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,v0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,y0=`varying vec3 vWorldDirection;
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
}`,x0=`#include <common>
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
}`,M0=`#if DEPTH_PACKING == 3200
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
}`,S0=`#define DISTANCE
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
}`,w0=`#define DISTANCE
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
}`,E0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,T0=`uniform sampler2D tEquirect;
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
}`,A0=`uniform vec3 diffuse;
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
}`,R0=`#include <common>
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
}`,C0=`uniform vec3 diffuse;
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
}`,P0=`#define LAMBERT
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
}`,L0=`#define LAMBERT
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
}`,D0=`#define MATCAP
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
}`,I0=`#define MATCAP
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
}`,U0=`#define NORMAL
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
}`,N0=`#define NORMAL
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
}`,F0=`#define PHONG
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
}`,O0=`#define PHONG
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
}`,k0=`#define STANDARD
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
}`,z0=`#define TOON
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
}`,V0=`#define TOON
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
}`,G0=`uniform float size;
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
}`,W0=`#include <common>
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
}`,X0=`uniform vec3 color;
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
}`,q0=`uniform float rotation;
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
}`,$0=`uniform vec3 diffuse;
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
}`,Xe={alphahash_fragment:mm,alphahash_pars_fragment:gm,alphamap_fragment:vm,alphamap_pars_fragment:ym,alphatest_fragment:_m,alphatest_pars_fragment:xm,aomap_fragment:Mm,aomap_pars_fragment:Sm,batching_pars_vertex:wm,batching_vertex:Em,begin_vertex:Tm,beginnormal_vertex:bm,bsdfs:Am,iridescence_fragment:Rm,bumpmap_pars_fragment:Cm,clipping_planes_fragment:Pm,clipping_planes_pars_fragment:Lm,clipping_planes_pars_vertex:Dm,clipping_planes_vertex:Im,color_fragment:Um,color_pars_fragment:Nm,color_pars_vertex:Fm,color_vertex:Om,common:km,cube_uv_reflection_fragment:Bm,defaultnormal_vertex:zm,displacementmap_pars_vertex:Vm,displacementmap_vertex:Gm,emissivemap_fragment:Hm,emissivemap_pars_fragment:Wm,colorspace_fragment:Xm,colorspace_pars_fragment:qm,envmap_fragment:$m,envmap_common_pars_fragment:Ym,envmap_pars_fragment:jm,envmap_pars_vertex:Km,envmap_physical_pars_fragment:ag,envmap_vertex:Zm,fog_vertex:Jm,fog_pars_vertex:Qm,fog_fragment:eg,fog_pars_fragment:tg,gradientmap_pars_fragment:ng,lightmap_pars_fragment:ig,lights_lambert_fragment:sg,lights_lambert_pars_fragment:rg,lights_pars_begin:og,lights_toon_fragment:cg,lights_toon_pars_fragment:lg,lights_phong_fragment:hg,lights_phong_pars_fragment:ug,lights_physical_fragment:dg,lights_physical_pars_fragment:fg,lights_fragment_begin:pg,lights_fragment_maps:mg,lights_fragment_end:gg,logdepthbuf_fragment:vg,logdepthbuf_pars_fragment:yg,logdepthbuf_pars_vertex:_g,logdepthbuf_vertex:xg,map_fragment:Mg,map_pars_fragment:Sg,map_particle_fragment:wg,map_particle_pars_fragment:Eg,metalnessmap_fragment:Tg,metalnessmap_pars_fragment:bg,morphinstance_vertex:Ag,morphcolor_vertex:Rg,morphnormal_vertex:Cg,morphtarget_pars_vertex:Pg,morphtarget_vertex:Lg,normal_fragment_begin:Dg,normal_fragment_maps:Ig,normal_pars_fragment:Ug,normal_pars_vertex:Ng,normal_vertex:Fg,normalmap_pars_fragment:Og,clearcoat_normal_fragment_begin:kg,clearcoat_normal_fragment_maps:Bg,clearcoat_pars_fragment:zg,iridescence_pars_fragment:Vg,opaque_fragment:Gg,packing:Hg,premultiplied_alpha_fragment:Wg,project_vertex:Xg,dithering_fragment:qg,dithering_pars_fragment:$g,roughnessmap_fragment:Yg,roughnessmap_pars_fragment:jg,shadowmap_pars_fragment:Kg,shadowmap_pars_vertex:Zg,shadowmap_vertex:Jg,shadowmask_pars_fragment:Qg,skinbase_vertex:e0,skinning_pars_vertex:t0,skinning_vertex:n0,skinnormal_vertex:i0,specularmap_fragment:s0,specularmap_pars_fragment:r0,tonemapping_fragment:o0,tonemapping_pars_fragment:a0,transmission_fragment:c0,transmission_pars_fragment:l0,uv_pars_fragment:h0,uv_pars_vertex:u0,uv_vertex:d0,worldpos_vertex:f0,background_vert:p0,background_frag:m0,backgroundCube_vert:g0,backgroundCube_frag:v0,cube_vert:y0,cube_frag:_0,depth_vert:x0,depth_frag:M0,distanceRGBA_vert:S0,distanceRGBA_frag:w0,equirect_vert:E0,equirect_frag:T0,linedashed_vert:b0,linedashed_frag:A0,meshbasic_vert:R0,meshbasic_frag:C0,meshlambert_vert:P0,meshlambert_frag:L0,meshmatcap_vert:D0,meshmatcap_frag:I0,meshnormal_vert:U0,meshnormal_frag:N0,meshphong_vert:F0,meshphong_frag:O0,meshphysical_vert:k0,meshphysical_frag:B0,meshtoon_vert:z0,meshtoon_frag:V0,points_vert:G0,points_frag:H0,shadow_vert:W0,shadow_frag:X0,sprite_vert:q0,sprite_frag:$0},me={common:{diffuse:{value:new je(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new je(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new je(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new je(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},un={basic:{uniforms:Dt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.fog]),vertexShader:Xe.meshbasic_vert,fragmentShader:Xe.meshbasic_frag},lambert:{uniforms:Dt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new je(0)}}]),vertexShader:Xe.meshlambert_vert,fragmentShader:Xe.meshlambert_frag},phong:{uniforms:Dt([me.common,me.specularmap,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.fog,me.lights,{emissive:{value:new je(0)},specular:{value:new je(1118481)},shininess:{value:30}}]),vertexShader:Xe.meshphong_vert,fragmentShader:Xe.meshphong_frag},standard:{uniforms:Dt([me.common,me.envmap,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.roughnessmap,me.metalnessmap,me.fog,me.lights,{emissive:{value:new je(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag},toon:{uniforms:Dt([me.common,me.aomap,me.lightmap,me.emissivemap,me.bumpmap,me.normalmap,me.displacementmap,me.gradientmap,me.fog,me.lights,{emissive:{value:new je(0)}}]),vertexShader:Xe.meshtoon_vert,fragmentShader:Xe.meshtoon_frag},matcap:{uniforms:Dt([me.common,me.bumpmap,me.normalmap,me.displacementmap,me.fog,{matcap:{value:null}}]),vertexShader:Xe.meshmatcap_vert,fragmentShader:Xe.meshmatcap_frag},points:{uniforms:Dt([me.points,me.fog]),vertexShader:Xe.points_vert,fragmentShader:Xe.points_frag},dashed:{uniforms:Dt([me.common,me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xe.linedashed_vert,fragmentShader:Xe.linedashed_frag},depth:{uniforms:Dt([me.common,me.displacementmap]),vertexShader:Xe.depth_vert,fragmentShader:Xe.depth_frag},normal:{uniforms:Dt([me.common,me.bumpmap,me.normalmap,me.displacementmap,{opacity:{value:1}}]),vertexShader:Xe.meshnormal_vert,fragmentShader:Xe.meshnormal_frag},sprite:{uniforms:Dt([me.sprite,me.fog]),vertexShader:Xe.sprite_vert,fragmentShader:Xe.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xe.background_vert,fragmentShader:Xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:Xe.backgroundCube_vert,fragmentShader:Xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xe.cube_vert,fragmentShader:Xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xe.equirect_vert,fragmentShader:Xe.equirect_frag},distanceRGBA:{uniforms:Dt([me.common,me.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xe.distanceRGBA_vert,fragmentShader:Xe.distanceRGBA_frag},shadow:{uniforms:Dt([me.lights,me.fog,{color:{value:new je(0)},opacity:{value:1}}]),vertexShader:Xe.shadow_vert,fragmentShader:Xe.shadow_frag}};un.physical={uniforms:Dt([un.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new je(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new je(0)},specularColor:{value:new je(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:Xe.meshphysical_vert,fragmentShader:Xe.meshphysical_frag};const xr={r:0,b:0,g:0},si=new Qt,Y0=new it;function j0(i,e,t,n,s,r,o){const a=new je(0);let c=r===!0?0:1,l,h,d=null,p=0,m=null;function y(v){let x=v.isScene===!0?v.background:null;return x&&x.isTexture&&(x=(v.backgroundBlurriness>0?t:e).get(x)),x}function g(v){let x=!1;const _=y(v);_===null?u(a,c):_&&_.isColor&&(u(_,1),x=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,o):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function f(v,x){const _=y(x);_&&(_.isCubeTexture||_.mapping===$r)?(h===void 0&&(h=new we(new gt(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:os(un.backgroundCube.uniforms),vertexShader:un.backgroundCube.vertexShader,fragmentShader:un.backgroundCube.fragmentShader,side:Ut,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(A,T,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),si.copy(x.backgroundRotation),si.x*=-1,si.y*=-1,si.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(si.y*=-1,si.z*=-1),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Y0.makeRotationFromEuler(si)),h.material.toneMapped=Ze.getTransfer(_.colorSpace)!==st,(d!==_||p!==_.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=_,p=_.version,m=i.toneMapping),h.layers.enableAll(),v.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new we(new Xs(2,2),new Zn({name:"BackgroundMaterial",uniforms:os(un.background.uniforms),vertexShader:un.background.vertexShader,fragmentShader:un.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=Ze.getTransfer(_.colorSpace)!==st,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||p!==_.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,d=_,p=_.version,m=i.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function u(v,x){v.getRGB(xr,Uu(i)),n.buffers.color.setClear(xr.r,xr.g,xr.b,x,o)}return{getClearColor:function(){return a},setClearColor:function(v,x=1){a.set(v),c=x,u(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(v){c=v,u(a,c)},render:g,addToRenderList:f}}function K0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=p(null);let r=s,o=!1;function a(M,D,G,S,L){let F=!1;const I=d(S,G,D);r!==I&&(r=I,l(r.object)),F=m(M,S,G,L),F&&y(M,S,G,L),L!==null&&e.update(L,i.ELEMENT_ARRAY_BUFFER),(F||o)&&(o=!1,_(M,D,G,S),L!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function h(M){return i.deleteVertexArray(M)}function d(M,D,G){const S=G.wireframe===!0;let L=n[M.id];L===void 0&&(L={},n[M.id]=L);let F=L[D.id];F===void 0&&(F={},L[D.id]=F);let I=F[S];return I===void 0&&(I=p(c()),F[S]=I),I}function p(M){const D=[],G=[],S=[];for(let L=0;L<t;L++)D[L]=0,G[L]=0,S[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:G,attributeDivisors:S,object:M,attributes:{},index:null}}function m(M,D,G,S){const L=r.attributes,F=D.attributes;let I=0;const z=G.getAttributes();for(const O in z)if(z[O].location>=0){const B=L[O];let Z=F[O];if(Z===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),B===void 0||B.attribute!==Z||Z&&B.data!==Z.data)return!0;I++}return r.attributesNum!==I||r.index!==S}function y(M,D,G,S){const L={},F=D.attributes;let I=0;const z=G.getAttributes();for(const O in z)if(z[O].location>=0){let B=F[O];B===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(B=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(B=M.instanceColor));const Z={};Z.attribute=B,B&&B.data&&(Z.data=B.data),L[O]=Z,I++}r.attributes=L,r.attributesNum=I,r.index=S}function g(){const M=r.newAttributes;for(let D=0,G=M.length;D<G;D++)M[D]=0}function f(M){u(M,0)}function u(M,D){const G=r.newAttributes,S=r.enabledAttributes,L=r.attributeDivisors;G[M]=1,S[M]===0&&(i.enableVertexAttribArray(M),S[M]=1),L[M]!==D&&(i.vertexAttribDivisor(M,D),L[M]=D)}function v(){const M=r.newAttributes,D=r.enabledAttributes;for(let G=0,S=D.length;G<S;G++)D[G]!==M[G]&&(i.disableVertexAttribArray(G),D[G]=0)}function x(M,D,G,S,L,F,I){I===!0?i.vertexAttribIPointer(M,D,G,L,F):i.vertexAttribPointer(M,D,G,S,L,F)}function _(M,D,G,S){g();const L=S.attributes,F=G.getAttributes(),I=D.defaultAttributeValues;for(const z in F){const O=F[z];if(O.location>=0){let U=L[z];if(U===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(U=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(U=M.instanceColor)),U!==void 0){const B=U.normalized,Z=U.itemSize,le=e.get(U);if(le===void 0)continue;const fe=le.buffer,X=le.type,Q=le.bytesPerElement,oe=X===i.INT||X===i.UNSIGNED_INT||U.gpuType===rc;if(U.isInterleavedBufferAttribute){const re=U.data,Me=re.stride,Pe=U.offset;if(re.isInstancedInterleavedBuffer){for(let Ue=0;Ue<O.locationSize;Ue++)u(O.location+Ue,re.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ue=0;Ue<O.locationSize;Ue++)f(O.location+Ue);i.bindBuffer(i.ARRAY_BUFFER,fe);for(let Ue=0;Ue<O.locationSize;Ue++)x(O.location+Ue,Z/O.locationSize,X,B,Me*Q,(Pe+Z/O.locationSize*Ue)*Q,oe)}else{if(U.isInstancedBufferAttribute){for(let re=0;re<O.locationSize;re++)u(O.location+re,U.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=U.meshPerAttribute*U.count)}else for(let re=0;re<O.locationSize;re++)f(O.location+re);i.bindBuffer(i.ARRAY_BUFFER,fe);for(let re=0;re<O.locationSize;re++)x(O.location+re,Z/O.locationSize,X,B,Z*Q,Z/O.locationSize*re*Q,oe)}}else if(I!==void 0){const B=I[z];if(B!==void 0)switch(B.length){case 2:i.vertexAttrib2fv(O.location,B);break;case 3:i.vertexAttrib3fv(O.location,B);break;case 4:i.vertexAttrib4fv(O.location,B);break;default:i.vertexAttrib1fv(O.location,B)}}}}v()}function A(){P();for(const M in n){const D=n[M];for(const G in D){const S=D[G];for(const L in S)h(S[L].object),delete S[L];delete D[G]}delete n[M]}}function T(M){if(n[M.id]===void 0)return;const D=n[M.id];for(const G in D){const S=D[G];for(const L in S)h(S[L].object),delete S[L];delete D[G]}delete n[M.id]}function R(M){for(const D in n){const G=n[D];if(G[M.id]===void 0)continue;const S=G[M.id];for(const L in S)h(S[L].object),delete S[L];delete G[M.id]}}function P(){w(),o=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:P,resetDefaultState:w,dispose:A,releaseStatesOfGeometry:T,releaseStatesOfProgram:R,initAttributes:g,enableAttribute:f,disableUnusedAttributes:v}}function Z0(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function o(l,h,d){d!==0&&(i.drawArraysInstanced(n,l,h,d),t.update(h,n,d))}function a(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,d);let m=0;for(let y=0;y<d;y++)m+=h[y];t.update(m,n,1)}function c(l,h,d,p){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let y=0;y<l.length;y++)o(l[y],h[y],p[y]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,h,0,p,0,d);let y=0;for(let g=0;g<d;g++)y+=h[g]*p[g];t.update(y,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function J0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==an&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const P=R===Gs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Cn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Tn&&!P)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,p=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),u=i.getParameter(i.MAX_VERTEX_ATTRIBS),v=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=y>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:p,maxTextures:m,maxVertexTextures:y,maxTextureSize:g,maxCubemapSize:f,maxAttributes:u,maxVertexUniforms:v,maxVaryings:x,maxFragmentUniforms:_,vertexTextures:A,maxSamples:T}}function Q0(i){const e=this;let t=null,n=0,s=!1,r=!1;const o=new ai,a=new We,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,p){const m=d.length!==0||p||n!==0||s;return s=p,n=d.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,p){t=h(d,p,0)},this.setState=function(d,p,m){const y=d.clippingPlanes,g=d.clipIntersection,f=d.clipShadows,u=i.get(d);if(!s||y===null||y.length===0||r&&!f)r?h(null):l();else{const v=r?0:n,x=v*4;let _=u.clippingState||null;c.value=_,_=h(y,p,x,m);for(let A=0;A!==x;++A)_[A]=t[A];u.clippingState=_,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=v}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,p,m,y){const g=d!==null?d.length:0;let f=null;if(g!==0){if(f=c.value,y!==!0||f===null){const u=m+g*4,v=p.matrixWorldInverse;a.getNormalMatrix(v),(f===null||f.length<u)&&(f=new Float32Array(u));for(let x=0,_=m;x!==g;++x,_+=4)o.copy(d[x]).applyMatrix4(v,a),o.normal.toArray(f,_),f[_+3]=o.constant}c.value=f,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,f}}function ev(i){let e=new WeakMap;function t(o,a){return a===ga?o.mapping=ns:a===va&&(o.mapping=is),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ga||a===va)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new um(c.height);return l.fromEquirectangularTexture(i,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class ku extends Nu{constructor(e=-1,t=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const qi=4,Rl=[.125,.215,.35,.446,.526,.582],hi=20,Oo=new ku,Cl=new je;let ko=null,Bo=0,zo=0,Vo=!1;const ci=(1+Math.sqrt(5))/2,Vi=1/ci,Pl=[new N(-ci,Vi,0),new N(ci,Vi,0),new N(-Vi,0,ci),new N(Vi,0,ci),new N(0,ci,-Vi),new N(0,ci,Vi),new N(-1,1,-1),new N(1,1,-1),new N(-1,1,1),new N(1,1,1)];class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){ko=this._renderer.getRenderTarget(),Bo=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Vo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Il(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ko,Bo,zo),this._renderer.xr.enabled=Vo,e.scissorTest=!1,Mr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ns||e.mapping===is?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ko=this._renderer.getRenderTarget(),Bo=this._renderer.getActiveCubeFace(),zo=this._renderer.getActiveMipmapLevel(),Vo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:fn,minFilter:fn,generateMipmaps:!1,type:Gs,format:an,colorSpace:as,depthBuffer:!1},s=Dl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=tv(r)),this._blurMaterial=nv(r,e,t)}return s}_compileMaterial(e){const t=new we(this._lodPlanes[0],e);this._renderer.compile(t,Oo)}_sceneToCubeUV(e,t,n,s){const a=new Wt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,p=h.toneMapping;h.getClearColor(Cl),h.toneMapping=qn,h.autoClear=!1;const m=new Ke({name:"PMREM.Background",side:Ut,depthWrite:!1,depthTest:!1}),y=new we(new gt,m);let g=!1;const f=e.background;f?f.isColor&&(m.color.copy(f),e.background=null,g=!0):(m.color.copy(Cl),g=!0);for(let u=0;u<6;u++){const v=u%3;v===0?(a.up.set(0,c[u],0),a.lookAt(l[u],0,0)):v===1?(a.up.set(0,0,c[u]),a.lookAt(0,l[u],0)):(a.up.set(0,c[u],0),a.lookAt(0,0,l[u]));const x=this._cubeSize;Mr(s,v*x,u>2?x:0,x,x),h.setRenderTarget(s),g&&h.render(y,a),h.render(e,a)}y.geometry.dispose(),y.material.dispose(),h.toneMapping=p,h.autoClear=d,e.background=f}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===ns||e.mapping===is;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Il());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new we(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;Mr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(o,Oo)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Pl[(s-r-1)%Pl.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,s,"latitudinal",r),this._halfBlur(o,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new we(this._lodPlanes[s],l),p=l.uniforms,m=this._sizeLods[n]-1,y=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*hi-1),g=r/y,f=isFinite(r)?1+Math.floor(h*g):hi;f>hi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${hi}`);const u=[];let v=0;for(let R=0;R<hi;++R){const P=R/g,w=Math.exp(-P*P/2);u.push(w),R===0?v+=w:R<f&&(v+=2*w)}for(let R=0;R<u.length;R++)u[R]=u[R]/v;p.envMap.value=e.texture,p.samples.value=f,p.weights.value=u,p.latitudinal.value=o==="latitudinal",a&&(p.poleAxis.value=a);const{_lodMax:x}=this;p.dTheta.value=y,p.mipInt.value=x-n;const _=this._sizeLods[s],A=3*_*(s>x-qi?s-x+qi:0),T=4*(this._cubeSize-_);Mr(t,A,T,3*_,2*_),c.setRenderTarget(t),c.render(d,Oo)}}function tv(i){const e=[],t=[],n=[];let s=i;const r=i-qi+1+Rl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>i-qi?c=Rl[o-i+qi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,d=1+l,p=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,y=6,g=3,f=2,u=1,v=new Float32Array(g*y*m),x=new Float32Array(f*y*m),_=new Float32Array(u*y*m);for(let T=0;T<m;T++){const R=T%3*2/3-1,P=T>2?0:-1,w=[R,P,0,R+2/3,P,0,R+2/3,P+1,0,R,P,0,R+2/3,P+1,0,R,P+1,0];v.set(w,g*y*T),x.set(p,f*y*T);const M=[T,T,T,T,T,T];_.set(M,u*y*T)}const A=new wt;A.setAttribute("position",new yt(v,g)),A.setAttribute("uv",new yt(x,f)),A.setAttribute("faceIndex",new yt(_,u)),e.push(A),s>qi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dl(i,e,t){const n=new _i(i,e,t);return n.texture.mapping=$r,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Mr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function nv(i,e,t){const n=new Float32Array(hi),s=new N(0,1,0);return new Zn({name:"SphericalGaussianBlur",defines:{n:hi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:dc(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Il(){return new Zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:dc(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Ul(){return new Zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:dc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function dc(){return`

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
	`}function iv(i){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ga||c===va,h=c===ns||c===is;if(l||h){let d=e.get(a);const p=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==p)return t===null&&(t=new Ll(i)),d=l?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const m=a.image;return l&&m&&m.height>0||h&&m&&s(m)?(t===null&&(t=new Ll(i)),d=l?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function sv(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&bs("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function rv(i,e,t,n){const s={},r=new WeakMap;function o(d){const p=d.target;p.index!==null&&e.remove(p.index);for(const y in p.attributes)e.remove(p.attributes[y]);for(const y in p.morphAttributes){const g=p.morphAttributes[y];for(let f=0,u=g.length;f<u;f++)e.remove(g[f])}p.removeEventListener("dispose",o),delete s[p.id];const m=r.get(p);m&&(e.remove(m),r.delete(p)),n.releaseStatesOfGeometry(p),p.isInstancedBufferGeometry===!0&&delete p._maxInstanceCount,t.memory.geometries--}function a(d,p){return s[p.id]===!0||(p.addEventListener("dispose",o),s[p.id]=!0,t.memory.geometries++),p}function c(d){const p=d.attributes;for(const y in p)e.update(p[y],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const y in m){const g=m[y];for(let f=0,u=g.length;f<u;f++)e.update(g[f],i.ARRAY_BUFFER)}}function l(d){const p=[],m=d.index,y=d.attributes.position;let g=0;if(m!==null){const v=m.array;g=m.version;for(let x=0,_=v.length;x<_;x+=3){const A=v[x+0],T=v[x+1],R=v[x+2];p.push(A,T,T,R,R,A)}}else if(y!==void 0){const v=y.array;g=y.version;for(let x=0,_=v.length/3-1;x<_;x+=3){const A=x+0,T=x+1,R=x+2;p.push(A,T,T,R,R,A)}}else return;const f=new(bu(p)?Iu:Du)(p,1);f.version=g;const u=r.get(d);u&&e.remove(u),r.set(d,f)}function h(d){const p=r.get(d);if(p){const m=d.index;m!==null&&p.version<m.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function ov(i,e,t){let n;function s(p){n=p}let r,o;function a(p){r=p.type,o=p.bytesPerElement}function c(p,m){i.drawElements(n,m,r,p*o),t.update(m,n,1)}function l(p,m,y){y!==0&&(i.drawElementsInstanced(n,m,r,p*o,y),t.update(m,n,y))}function h(p,m,y){if(y===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,p,0,y);let f=0;for(let u=0;u<y;u++)f+=m[u];t.update(f,n,1)}function d(p,m,y,g){if(y===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let u=0;u<p.length;u++)l(p[u]/o,m[u],g[u]);else{f.multiDrawElementsInstancedWEBGL(n,m,0,r,p,0,g,0,y);let u=0;for(let v=0;v<y;v++)u+=m[v]*g[v];t.update(u,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function av(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(r/3);break;case i.LINES:t.lines+=a*(r/2);break;case i.LINE_STRIP:t.lines+=a*(r-1);break;case i.LINE_LOOP:t.lines+=a*r;break;case i.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function cv(i,e,t){const n=new WeakMap,s=new at;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=h!==void 0?h.length:0;let p=n.get(a);if(p===void 0||p.count!==d){let M=function(){P.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var m=M;p!==void 0&&p.texture.dispose();const y=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let _=0;y===!0&&(_=1),g===!0&&(_=2),f===!0&&(_=3);let A=a.attributes.position.count*_,T=1;A>e.maxTextureSize&&(T=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const R=new Float32Array(A*T*4*d),P=new Ru(R,A,T,d);P.type=Tn,P.needsUpdate=!0;const w=_*4;for(let D=0;D<d;D++){const G=u[D],S=v[D],L=x[D],F=A*T*4*D;for(let I=0;I<G.count;I++){const z=I*w;y===!0&&(s.fromBufferAttribute(G,I),R[F+z+0]=s.x,R[F+z+1]=s.y,R[F+z+2]=s.z,R[F+z+3]=0),g===!0&&(s.fromBufferAttribute(S,I),R[F+z+4]=s.x,R[F+z+5]=s.y,R[F+z+6]=s.z,R[F+z+7]=0),f===!0&&(s.fromBufferAttribute(L,I),R[F+z+8]=s.x,R[F+z+9]=s.y,R[F+z+10]=s.z,R[F+z+11]=L.itemSize===4?s.w:1)}}p={count:d,texture:P,size:new ze(A,T)},n.set(a,p),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let y=0;for(let f=0;f<l.length;f++)y+=l[f];const g=a.morphTargetsRelative?1:1-y;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}return{update:r}}function lv(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=e.get(c,h);if(s.get(d)!==l&&(e.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==l&&(p.update(),s.set(p,l))}return d}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Bu extends Nt{constructor(e,t,n,s,r,o,a,c,l,h=Yi){if(h!==Yi&&h!==rs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Yi&&(n=yi),n===void 0&&h===rs&&(n=ss),super(null,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:ln,this.minFilter=c!==void 0?c:ln,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const zu=new Nt,Nl=new Bu(1,1),Vu=new Ru,Gu=new jp,Hu=new Fu,Fl=[],Ol=[],kl=new Float32Array(16),Bl=new Float32Array(9),zl=new Float32Array(4);function ls(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Fl[s];if(r===void 0&&(r=new Float32Array(s),Fl[s]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(r,a)}return r}function _t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function jr(i,e){let t=Ol[e];t===void 0&&(t=new Int32Array(e),Ol[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function hv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function uv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2fv(this.addr,e),xt(t,e)}}function dv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(_t(t,e))return;i.uniform3fv(this.addr,e),xt(t,e)}}function fv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4fv(this.addr,e),xt(t,e)}}function pv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;zl.set(n),i.uniformMatrix2fv(this.addr,!1,zl),xt(t,n)}}function mv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;Bl.set(n),i.uniformMatrix3fv(this.addr,!1,Bl),xt(t,n)}}function gv(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(_t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(_t(t,n))return;kl.set(n),i.uniformMatrix4fv(this.addr,!1,kl),xt(t,n)}}function vv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function yv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2iv(this.addr,e),xt(t,e)}}function _v(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3iv(this.addr,e),xt(t,e)}}function xv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4iv(this.addr,e),xt(t,e)}}function Mv(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Sv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(_t(t,e))return;i.uniform2uiv(this.addr,e),xt(t,e)}}function wv(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(_t(t,e))return;i.uniform3uiv(this.addr,e),xt(t,e)}}function Ev(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(_t(t,e))return;i.uniform4uiv(this.addr,e),xt(t,e)}}function Tv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Nl.compareFunction=Tu,r=Nl):r=zu,t.setTexture2D(e||r,s)}function bv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Gu,s)}function Av(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Hu,s)}function Rv(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Vu,s)}function Cv(i){switch(i){case 5126:return hv;case 35664:return uv;case 35665:return dv;case 35666:return fv;case 35674:return pv;case 35675:return mv;case 35676:return gv;case 5124:case 35670:return vv;case 35667:case 35671:return yv;case 35668:case 35672:return _v;case 35669:case 35673:return xv;case 5125:return Mv;case 36294:return Sv;case 36295:return wv;case 36296:return Ev;case 35678:case 36198:case 36298:case 36306:case 35682:return Tv;case 35679:case 36299:case 36307:return bv;case 35680:case 36300:case 36308:case 36293:return Av;case 36289:case 36303:case 36311:case 36292:return Rv}}function Pv(i,e){i.uniform1fv(this.addr,e)}function Lv(i,e){const t=ls(e,this.size,2);i.uniform2fv(this.addr,t)}function Dv(i,e){const t=ls(e,this.size,3);i.uniform3fv(this.addr,t)}function Iv(i,e){const t=ls(e,this.size,4);i.uniform4fv(this.addr,t)}function Uv(i,e){const t=ls(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Nv(i,e){const t=ls(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Fv(i,e){const t=ls(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Ov(i,e){i.uniform1iv(this.addr,e)}function kv(i,e){i.uniform2iv(this.addr,e)}function Bv(i,e){i.uniform3iv(this.addr,e)}function zv(i,e){i.uniform4iv(this.addr,e)}function Vv(i,e){i.uniform1uiv(this.addr,e)}function Gv(i,e){i.uniform2uiv(this.addr,e)}function Hv(i,e){i.uniform3uiv(this.addr,e)}function Wv(i,e){i.uniform4uiv(this.addr,e)}function Xv(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||zu,r[o])}function qv(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||Gu,r[o])}function $v(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Hu,r[o])}function Yv(i,e,t){const n=this.cache,s=e.length,r=jr(t,s);_t(n,r)||(i.uniform1iv(this.addr,r),xt(n,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Vu,r[o])}function jv(i){switch(i){case 5126:return Pv;case 35664:return Lv;case 35665:return Dv;case 35666:return Iv;case 35674:return Uv;case 35675:return Nv;case 35676:return Fv;case 5124:case 35670:return Ov;case 35667:case 35671:return kv;case 35668:case 35672:return Bv;case 35669:case 35673:return zv;case 5125:return Vv;case 36294:return Gv;case 36295:return Hv;case 36296:return Wv;case 35678:case 36198:case 36298:case 36306:case 35682:return Xv;case 35679:case 36299:case 36307:return qv;case 35680:case 36300:case 36308:case 36293:return $v;case 36289:case 36303:case 36311:case 36292:return Yv}}class Kv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Cv(t.type)}}class Zv{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=jv(t.type)}}class Jv{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],n)}}}const Go=/(\w+)(\])?(\[|\.)?/g;function Vl(i,e){i.seq.push(e),i.map[e.id]=e}function Qv(i,e,t){const n=i.name,s=n.length;for(Go.lastIndex=0;;){const r=Go.exec(n),o=Go.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Vl(t,l===void 0?new Kv(a,i,e):new Zv(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Jv(a),Vl(t,d)),t=d}}}class Ur{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Qv(r,o,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&n.push(o)}return n}}function Gl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ey=37297;let ty=0;function ny(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Hl=new We;function iy(i){Ze._getMatrix(Hl,Ze.workingColorSpace,i);const e=`mat3( ${Hl.elements.map(t=>t.toFixed(4))} )`;switch(Ze.getTransfer(i)){case Yr:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+ny(i.getShaderSource(e),o)}else return s}function sy(i,e){const t=iy(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function ry(i,e){let t;switch(e){case wp:t="Linear";break;case Ep:t="Reinhard";break;case Tp:t="Cineon";break;case du:t="ACESFilmic";break;case Ap:t="AgX";break;case Rp:t="Neutral";break;case bp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Sr=new N;function oy(){Ze.getLuminanceCoefficients(Sr);const i=Sr.x.toFixed(4),e=Sr.y.toFixed(4),t=Sr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ay(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(As).join(`
`)}function cy(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function ly(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function As(i){return i!==""}function Xl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ql(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const hy=/^[ \t]*#include +<([\w\d./]+)>/gm;function $a(i){return i.replace(hy,dy)}const uy=new Map;function dy(i,e){let t=Xe[e];if(t===void 0){const n=uy.get(e);if(n!==void 0)t=Xe[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return $a(t)}const fy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(i){return i.replace(fy,py)}function py(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function my(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===hu?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===np?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Sn&&(e="SHADOWMAP_TYPE_VSM"),e}function gy(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case ns:case is:e="ENVMAP_TYPE_CUBE";break;case $r:e="ENVMAP_TYPE_CUBE_UV";break}return e}function vy(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case is:e="ENVMAP_MODE_REFRACTION";break}return e}function yy(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case uu:e="ENVMAP_BLENDING_MULTIPLY";break;case Mp:e="ENVMAP_BLENDING_MIX";break;case Sp:e="ENVMAP_BLENDING_ADD";break}return e}function _y(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function xy(i,e,t,n){const s=i.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=my(t),l=gy(t),h=vy(t),d=yy(t),p=_y(t),m=ay(t),y=cy(r),g=s.createProgram();let f,u,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(As).join(`
`),f.length>0&&(f+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y].filter(As).join(`
`),u.length>0&&(u+=`
`)):(f=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(As).join(`
`),u=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,y,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",p?"#define CUBEUV_TEXEL_WIDTH "+p.texelWidth:"",p?"#define CUBEUV_TEXEL_HEIGHT "+p.texelHeight:"",p?"#define CUBEUV_MAX_MIP "+p.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?Xe.tonemapping_pars_fragment:"",t.toneMapping!==qn?ry("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Xe.colorspace_pars_fragment,sy("linearToOutputTexel",t.outputColorSpace),oy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(As).join(`
`)),o=$a(o),o=Xl(o,t),o=ql(o,t),a=$a(a),a=Xl(a,t),a=ql(a,t),o=$l(o),a=$l(a),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,f=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,u=["#define varying in",t.glslVersion===al?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===al?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const x=v+f+o,_=v+u+a,A=Gl(s,s.VERTEX_SHADER,x),T=Gl(s,s.FRAGMENT_SHADER,_);s.attachShader(g,A),s.attachShader(g,T),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function R(D){if(i.debug.checkShaderErrors){const G=s.getProgramInfoLog(g).trim(),S=s.getShaderInfoLog(A).trim(),L=s.getShaderInfoLog(T).trim();let F=!0,I=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(F=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,A,T);else{const z=Wl(s,A,"vertex"),O=Wl(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+G+`
`+z+`
`+O)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):(S===""||L==="")&&(I=!1);I&&(D.diagnostics={runnable:F,programLog:G,vertexShader:{log:S,prefix:f},fragmentShader:{log:L,prefix:u}})}s.deleteShader(A),s.deleteShader(T),P=new Ur(s,g),w=ly(s,g)}let P;this.getUniforms=function(){return P===void 0&&R(this),P};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(g,ey)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=ty++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=A,this.fragmentShader=T,this}let My=0;class Sy{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new wy(e),t.set(e,n)),n}}class wy{constructor(e){this.id=My++,this.code=e,this.usedTimes=0}}function Ey(i,e,t,n,s,r,o){const a=new Pu,c=new Sy,l=new Set,h=[],d=s.logarithmicDepthBuffer,p=s.vertexTextures;let m=s.precision;const y={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(w){return l.add(w),w===0?"uv":`uv${w}`}function f(w,M,D,G,S){const L=G.fog,F=S.geometry,I=w.isMeshStandardMaterial?G.environment:null,z=(w.isMeshStandardMaterial?t:e).get(w.envMap||I),O=z&&z.mapping===$r?z.image.height:null,U=y[w.type];w.precision!==null&&(m=s.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const B=F.morphAttributes.position||F.morphAttributes.normal||F.morphAttributes.color,Z=B!==void 0?B.length:0;let le=0;F.morphAttributes.position!==void 0&&(le=1),F.morphAttributes.normal!==void 0&&(le=2),F.morphAttributes.color!==void 0&&(le=3);let fe,X,Q,oe;if(U){const nt=un[U];fe=nt.vertexShader,X=nt.fragmentShader}else fe=w.vertexShader,X=w.fragmentShader,c.update(w),Q=c.getVertexShaderID(w),oe=c.getFragmentShaderID(w);const re=i.getRenderTarget(),Me=i.state.buffers.depth.getReversed(),Pe=S.isInstancedMesh===!0,Ue=S.isBatchedMesh===!0,Y=!!w.map,ee=!!w.matcap,ue=!!z,k=!!w.aoMap,Fe=!!w.lightMap,Ne=!!w.bumpMap,ke=!!w.normalMap,Ee=!!w.displacementMap,Te=!!w.emissiveMap,ge=!!w.metalnessMap,C=!!w.roughnessMap,E=w.anisotropy>0,$=w.clearcoat>0,te=w.dispersion>0,se=w.iridescence>0,q=w.sheen>0,ce=w.transmission>0,ie=E&&!!w.anisotropyMap,de=$&&!!w.clearcoatMap,De=$&&!!w.clearcoatNormalMap,ae=$&&!!w.clearcoatRoughnessMap,pe=se&&!!w.iridescenceMap,Ie=se&&!!w.iridescenceThicknessMap,Oe=q&&!!w.sheenColorMap,Se=q&&!!w.sheenRoughnessMap,$e=!!w.specularMap,Ve=!!w.specularColorMap,tt=!!w.specularIntensityMap,V=ce&&!!w.transmissionMap,ve=ce&&!!w.thicknessMap,J=!!w.gradientMap,ne=!!w.alphaMap,xe=w.alphaTest>0,ye=!!w.alphaHash,Ge=!!w.extensions;let ft=qn;w.toneMapped&&(re===null||re.isXRRenderTarget===!0)&&(ft=i.toneMapping);const Tt={shaderID:U,shaderType:w.type,shaderName:w.name,vertexShader:fe,fragmentShader:X,defines:w.defines,customVertexShaderID:Q,customFragmentShaderID:oe,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:Ue,batchingColor:Ue&&S._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&S.instanceColor!==null,instancingMorph:Pe&&S.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:re===null?i.outputColorSpace:re.isXRRenderTarget===!0?re.texture.colorSpace:as,alphaToCoverage:!!w.alphaToCoverage,map:Y,matcap:ee,envMap:ue,envMapMode:ue&&z.mapping,envMapCubeUVHeight:O,aoMap:k,lightMap:Fe,bumpMap:Ne,normalMap:ke,displacementMap:p&&Ee,emissiveMap:Te,normalMapObjectSpace:ke&&w.normalMapType===Dp,normalMapTangentSpace:ke&&w.normalMapType===Eu,metalnessMap:ge,roughnessMap:C,anisotropy:E,anisotropyMap:ie,clearcoat:$,clearcoatMap:de,clearcoatNormalMap:De,clearcoatRoughnessMap:ae,dispersion:te,iridescence:se,iridescenceMap:pe,iridescenceThicknessMap:Ie,sheen:q,sheenColorMap:Oe,sheenRoughnessMap:Se,specularMap:$e,specularColorMap:Ve,specularIntensityMap:tt,transmission:ce,transmissionMap:V,thicknessMap:ve,gradientMap:J,opaque:w.transparent===!1&&w.blending===$i&&w.alphaToCoverage===!1,alphaMap:ne,alphaTest:xe,alphaHash:ye,combine:w.combine,mapUv:Y&&g(w.map.channel),aoMapUv:k&&g(w.aoMap.channel),lightMapUv:Fe&&g(w.lightMap.channel),bumpMapUv:Ne&&g(w.bumpMap.channel),normalMapUv:ke&&g(w.normalMap.channel),displacementMapUv:Ee&&g(w.displacementMap.channel),emissiveMapUv:Te&&g(w.emissiveMap.channel),metalnessMapUv:ge&&g(w.metalnessMap.channel),roughnessMapUv:C&&g(w.roughnessMap.channel),anisotropyMapUv:ie&&g(w.anisotropyMap.channel),clearcoatMapUv:de&&g(w.clearcoatMap.channel),clearcoatNormalMapUv:De&&g(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&g(w.clearcoatRoughnessMap.channel),iridescenceMapUv:pe&&g(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&g(w.iridescenceThicknessMap.channel),sheenColorMapUv:Oe&&g(w.sheenColorMap.channel),sheenRoughnessMapUv:Se&&g(w.sheenRoughnessMap.channel),specularMapUv:$e&&g(w.specularMap.channel),specularColorMapUv:Ve&&g(w.specularColorMap.channel),specularIntensityMapUv:tt&&g(w.specularIntensityMap.channel),transmissionMapUv:V&&g(w.transmissionMap.channel),thicknessMapUv:ve&&g(w.thicknessMap.channel),alphaMapUv:ne&&g(w.alphaMap.channel),vertexTangents:!!F.attributes.tangent&&(ke||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!F.attributes.color&&F.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!F.attributes.uv&&(Y||ne),fog:!!L,useFog:w.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Me,skinning:S.isSkinnedMesh===!0,morphTargets:F.morphAttributes.position!==void 0,morphNormals:F.morphAttributes.normal!==void 0,morphColors:F.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:le,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:ft,decodeVideoTexture:Y&&w.map.isVideoTexture===!0&&Ze.getTransfer(w.map.colorSpace)===st,decodeVideoTextureEmissive:Te&&w.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(w.emissiveMap.colorSpace)===st,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Rt,flipSided:w.side===Ut,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ge&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ge&&w.extensions.multiDraw===!0||Ue)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function u(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const D in w.defines)M.push(D),M.push(w.defines[D]);return w.isRawShaderMaterial===!1&&(v(M,w),x(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function v(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function x(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function _(w){const M=y[w.type];let D;if(M){const G=un[M];D=am.clone(G.uniforms)}else D=w.uniforms;return D}function A(w,M){let D;for(let G=0,S=h.length;G<S;G++){const L=h[G];if(L.cacheKey===M){D=L,++D.usedTimes;break}}return D===void 0&&(D=new xy(i,M,w,r),h.push(D)),D}function T(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function R(w){c.remove(w)}function P(){c.dispose()}return{getParameters:f,getProgramCacheKey:u,getUniforms:_,acquireProgram:A,releaseProgram:T,releaseShaderCache:R,programs:h,dispose:P}}function Ty(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function by(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function jl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Kl(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function o(d,p,m,y,g,f){let u=i[e];return u===void 0?(u={id:d.id,object:d,geometry:p,material:m,groupOrder:y,renderOrder:d.renderOrder,z:g,group:f},i[e]=u):(u.id=d.id,u.object=d,u.geometry=p,u.material=m,u.groupOrder=y,u.renderOrder=d.renderOrder,u.z=g,u.group=f),e++,u}function a(d,p,m,y,g,f){const u=o(d,p,m,y,g,f);m.transmission>0?n.push(u):m.transparent===!0?s.push(u):t.push(u)}function c(d,p,m,y,g,f){const u=o(d,p,m,y,g,f);m.transmission>0?n.unshift(u):m.transparent===!0?s.unshift(u):t.unshift(u)}function l(d,p){t.length>1&&t.sort(d||by),n.length>1&&n.sort(p||jl),s.length>1&&s.sort(p||jl)}function h(){for(let d=e,p=i.length;d<p;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Ay(){let i=new WeakMap;function e(n,s){const r=i.get(n);let o;return r===void 0?(o=new Kl,i.set(n,[o])):s>=r.length?(o=new Kl,r.push(o)):o=r[s],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Ry(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new N,color:new je};break;case"SpotLight":t={position:new N,direction:new N,color:new je,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new N,color:new je,distance:0,decay:0};break;case"HemisphereLight":t={direction:new N,skyColor:new je,groundColor:new je};break;case"RectAreaLight":t={color:new je,position:new N,halfWidth:new N,halfHeight:new N};break}return i[e.id]=t,t}}}function Cy(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Py=0;function Ly(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Dy(i){const e=new Ry,t=Cy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new N);const s=new N,r=new it,o=new it;function a(l){let h=0,d=0,p=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let m=0,y=0,g=0,f=0,u=0,v=0,x=0,_=0,A=0,T=0,R=0;l.sort(Ly);for(let w=0,M=l.length;w<M;w++){const D=l[w],G=D.color,S=D.intensity,L=D.distance,F=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=G.r*S,d+=G.g*S,p+=G.b*S;else if(D.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(D.sh.coefficients[I],S);R++}else if(D.isDirectionalLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const z=D.shadow,O=t.get(D);O.shadowIntensity=z.intensity,O.shadowBias=z.bias,O.shadowNormalBias=z.normalBias,O.shadowRadius=z.radius,O.shadowMapSize=z.mapSize,n.directionalShadow[m]=O,n.directionalShadowMap[m]=F,n.directionalShadowMatrix[m]=D.shadow.matrix,v++}n.directional[m]=I,m++}else if(D.isSpotLight){const I=e.get(D);I.position.setFromMatrixPosition(D.matrixWorld),I.color.copy(G).multiplyScalar(S),I.distance=L,I.coneCos=Math.cos(D.angle),I.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),I.decay=D.decay,n.spot[g]=I;const z=D.shadow;if(D.map&&(n.spotLightMap[A]=D.map,A++,z.updateMatrices(D),D.castShadow&&T++),n.spotLightMatrix[g]=z.matrix,D.castShadow){const O=t.get(D);O.shadowIntensity=z.intensity,O.shadowBias=z.bias,O.shadowNormalBias=z.normalBias,O.shadowRadius=z.radius,O.shadowMapSize=z.mapSize,n.spotShadow[g]=O,n.spotShadowMap[g]=F,_++}g++}else if(D.isRectAreaLight){const I=e.get(D);I.color.copy(G).multiplyScalar(S),I.halfWidth.set(D.width*.5,0,0),I.halfHeight.set(0,D.height*.5,0),n.rectArea[f]=I,f++}else if(D.isPointLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),I.distance=D.distance,I.decay=D.decay,D.castShadow){const z=D.shadow,O=t.get(D);O.shadowIntensity=z.intensity,O.shadowBias=z.bias,O.shadowNormalBias=z.normalBias,O.shadowRadius=z.radius,O.shadowMapSize=z.mapSize,O.shadowCameraNear=z.camera.near,O.shadowCameraFar=z.camera.far,n.pointShadow[y]=O,n.pointShadowMap[y]=F,n.pointShadowMatrix[y]=D.shadow.matrix,x++}n.point[y]=I,y++}else if(D.isHemisphereLight){const I=e.get(D);I.skyColor.copy(D.color).multiplyScalar(S),I.groundColor.copy(D.groundColor).multiplyScalar(S),n.hemi[u]=I,u++}}f>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=me.LTC_FLOAT_1,n.rectAreaLTC2=me.LTC_FLOAT_2):(n.rectAreaLTC1=me.LTC_HALF_1,n.rectAreaLTC2=me.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=p;const P=n.hash;(P.directionalLength!==m||P.pointLength!==y||P.spotLength!==g||P.rectAreaLength!==f||P.hemiLength!==u||P.numDirectionalShadows!==v||P.numPointShadows!==x||P.numSpotShadows!==_||P.numSpotMaps!==A||P.numLightProbes!==R)&&(n.directional.length=m,n.spot.length=g,n.rectArea.length=f,n.point.length=y,n.hemi.length=u,n.directionalShadow.length=v,n.directionalShadowMap.length=v,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=v,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=_+A-T,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=R,P.directionalLength=m,P.pointLength=y,P.spotLength=g,P.rectAreaLength=f,P.hemiLength=u,P.numDirectionalShadows=v,P.numPointShadows=x,P.numSpotShadows=_,P.numSpotMaps=A,P.numLightProbes=R,n.version=Py++)}function c(l,h){let d=0,p=0,m=0,y=0,g=0;const f=h.matrixWorldInverse;for(let u=0,v=l.length;u<v;u++){const x=l[u];if(x.isDirectionalLight){const _=n.directional[d];_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(f),d++}else if(x.isSpotLight){const _=n.spot[m];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(f),m++}else if(x.isRectAreaLight){const _=n.rectArea[y];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(f),o.identity(),r.copy(x.matrixWorld),r.premultiply(f),o.extractRotation(r),_.halfWidth.set(x.width*.5,0,0),_.halfHeight.set(0,x.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),y++}else if(x.isPointLight){const _=n.point[p];_.position.setFromMatrixPosition(x.matrixWorld),_.position.applyMatrix4(f),p++}else if(x.isHemisphereLight){const _=n.hemi[g];_.direction.setFromMatrixPosition(x.matrixWorld),_.direction.transformDirection(f),g++}}}return{setup:a,setupView:c,state:n}}function Zl(i){const e=new Dy(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function o(h){n.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Iy(i){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Zl(i),e.set(s,[a])):r>=o.length?(a=new Zl(i),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}class Uy extends Ti{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Pp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ny extends Ti{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Fy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Oy=`uniform sampler2D shadow_pass;
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
}`;function ky(i,e,t){let n=new uc;const s=new ze,r=new ze,o=new at,a=new Uy({depthPacking:Lp}),c=new Ny,l={},h=t.maxTextureSize,d={[Kn]:Ut,[Ut]:Kn,[Rt]:Rt},p=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:Fy,fragmentShader:Oy}),m=p.clone();m.defines.HORIZONTAL_PASS=1;const y=new wt;y.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new we(y,p),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=hu;let u=this.type;this.render=function(T,R,P){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||T.length===0)return;const w=i.getRenderTarget(),M=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),G=i.state;G.setBlending(Xn),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const S=u!==Sn&&this.type===Sn,L=u===Sn&&this.type!==Sn;for(let F=0,I=T.length;F<I;F++){const z=T[F],O=z.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const U=O.getFrameExtents();if(s.multiply(U),r.copy(O.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/U.x),s.x=r.x*U.x,O.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/U.y),s.y=r.y*U.y,O.mapSize.y=r.y)),O.map===null||S===!0||L===!0){const Z=this.type!==Sn?{minFilter:ln,magFilter:ln}:{};O.map!==null&&O.map.dispose(),O.map=new _i(s.x,s.y,Z),O.map.texture.name=z.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const B=O.getViewportCount();for(let Z=0;Z<B;Z++){const le=O.getViewport(Z);o.set(r.x*le.x,r.y*le.y,r.x*le.z,r.y*le.w),G.viewport(o),O.updateMatrices(z,Z),n=O.getFrustum(),_(R,P,O.camera,z,this.type)}O.isPointLightShadow!==!0&&this.type===Sn&&v(O,P),O.needsUpdate=!1}u=this.type,f.needsUpdate=!1,i.setRenderTarget(w,M,D)};function v(T,R){const P=e.update(g);p.defines.VSM_SAMPLES!==T.blurSamples&&(p.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,p.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new _i(s.x,s.y)),p.uniforms.shadow_pass.value=T.map.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(R,null,P,p,g,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value=T.mapSize,m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(R,null,P,m,g,null)}function x(T,R,P,w){let M=null;const D=P.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(D!==void 0)M=D;else if(M=P.isPointLight===!0?c:a,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const G=M.uuid,S=R.uuid;let L=l[G];L===void 0&&(L={},l[G]=L);let F=L[S];F===void 0&&(F=M.clone(),L[S]=F,R.addEventListener("dispose",A)),M=F}if(M.visible=R.visible,M.wireframe=R.wireframe,w===Sn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:d[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const G=i.properties.get(M);G.light=P}return M}function _(T,R,P,w,M){if(T.visible===!1)return;if(T.layers.test(R.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&M===Sn)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,T.matrixWorld);const S=e.update(T),L=T.material;if(Array.isArray(L)){const F=S.groups;for(let I=0,z=F.length;I<z;I++){const O=F[I],U=L[O.materialIndex];if(U&&U.visible){const B=x(T,U,w,M);T.onBeforeShadow(i,T,R,P,S,B,O),i.renderBufferDirect(P,null,S,B,T,O),T.onAfterShadow(i,T,R,P,S,B,O)}}}else if(L.visible){const F=x(T,L,w,M);T.onBeforeShadow(i,T,R,P,S,F,null),i.renderBufferDirect(P,null,S,F,T,null),T.onAfterShadow(i,T,R,P,S,F,null)}}const G=T.children;for(let S=0,L=G.length;S<L;S++)_(G[S],R,P,w,M)}function A(T){T.target.removeEventListener("dispose",A);for(const P in l){const w=l[P],M=T.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const By={[la]:ha,[ua]:pa,[da]:ma,[ts]:fa,[ha]:la,[pa]:ua,[ma]:da,[fa]:ts};function zy(i,e){function t(){let V=!1;const ve=new at;let J=null;const ne=new at(0,0,0,0);return{setMask:function(xe){J!==xe&&!V&&(i.colorMask(xe,xe,xe,xe),J=xe)},setLocked:function(xe){V=xe},setClear:function(xe,ye,Ge,ft,Tt){Tt===!0&&(xe*=ft,ye*=ft,Ge*=ft),ve.set(xe,ye,Ge,ft),ne.equals(ve)===!1&&(i.clearColor(xe,ye,Ge,ft),ne.copy(ve))},reset:function(){V=!1,J=null,ne.set(-1,0,0,0)}}}function n(){let V=!1,ve=!1,J=null,ne=null,xe=null;return{setReversed:function(ye){if(ve!==ye){const Ge=e.get("EXT_clip_control");ve?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT);const ft=xe;xe=null,this.setClear(ft)}ve=ye},getReversed:function(){return ve},setTest:function(ye){ye?re(i.DEPTH_TEST):Me(i.DEPTH_TEST)},setMask:function(ye){J!==ye&&!V&&(i.depthMask(ye),J=ye)},setFunc:function(ye){if(ve&&(ye=By[ye]),ne!==ye){switch(ye){case la:i.depthFunc(i.NEVER);break;case ha:i.depthFunc(i.ALWAYS);break;case ua:i.depthFunc(i.LESS);break;case ts:i.depthFunc(i.LEQUAL);break;case da:i.depthFunc(i.EQUAL);break;case fa:i.depthFunc(i.GEQUAL);break;case pa:i.depthFunc(i.GREATER);break;case ma:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ne=ye}},setLocked:function(ye){V=ye},setClear:function(ye){xe!==ye&&(ve&&(ye=1-ye),i.clearDepth(ye),xe=ye)},reset:function(){V=!1,J=null,ne=null,xe=null,ve=!1}}}function s(){let V=!1,ve=null,J=null,ne=null,xe=null,ye=null,Ge=null,ft=null,Tt=null;return{setTest:function(nt){V||(nt?re(i.STENCIL_TEST):Me(i.STENCIL_TEST))},setMask:function(nt){ve!==nt&&!V&&(i.stencilMask(nt),ve=nt)},setFunc:function(nt,en,pn){(J!==nt||ne!==en||xe!==pn)&&(i.stencilFunc(nt,en,pn),J=nt,ne=en,xe=pn)},setOp:function(nt,en,pn){(ye!==nt||Ge!==en||ft!==pn)&&(i.stencilOp(nt,en,pn),ye=nt,Ge=en,ft=pn)},setLocked:function(nt){V=nt},setClear:function(nt){Tt!==nt&&(i.clearStencil(nt),Tt=nt)},reset:function(){V=!1,ve=null,J=null,ne=null,xe=null,ye=null,Ge=null,ft=null,Tt=null}}}const r=new t,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},d={},p=new WeakMap,m=[],y=null,g=!1,f=null,u=null,v=null,x=null,_=null,A=null,T=null,R=new je(0,0,0),P=0,w=!1,M=null,D=null,G=null,S=null,L=null;const F=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,z=0;const O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(O)[1]),I=z>=1):O.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),I=z>=2);let U=null,B={};const Z=i.getParameter(i.SCISSOR_BOX),le=i.getParameter(i.VIEWPORT),fe=new at().fromArray(Z),X=new at().fromArray(le);function Q(V,ve,J,ne){const xe=new Uint8Array(4),ye=i.createTexture();i.bindTexture(V,ye),i.texParameteri(V,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(V,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ge=0;Ge<J;Ge++)V===i.TEXTURE_3D||V===i.TEXTURE_2D_ARRAY?i.texImage3D(ve,0,i.RGBA,1,1,ne,0,i.RGBA,i.UNSIGNED_BYTE,xe):i.texImage2D(ve+Ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,xe);return ye}const oe={};oe[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),oe[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),oe[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),oe[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),re(i.DEPTH_TEST),o.setFunc(ts),Ne(!1),ke(il),re(i.CULL_FACE),k(Xn);function re(V){h[V]!==!0&&(i.enable(V),h[V]=!0)}function Me(V){h[V]!==!1&&(i.disable(V),h[V]=!1)}function Pe(V,ve){return d[V]!==ve?(i.bindFramebuffer(V,ve),d[V]=ve,V===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ve),V===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ve),!0):!1}function Ue(V,ve){let J=m,ne=!1;if(V){J=p.get(ve),J===void 0&&(J=[],p.set(ve,J));const xe=V.textures;if(J.length!==xe.length||J[0]!==i.COLOR_ATTACHMENT0){for(let ye=0,Ge=xe.length;ye<Ge;ye++)J[ye]=i.COLOR_ATTACHMENT0+ye;J.length=xe.length,ne=!0}}else J[0]!==i.BACK&&(J[0]=i.BACK,ne=!0);ne&&i.drawBuffers(J)}function Y(V){return y!==V?(i.useProgram(V),y=V,!0):!1}const ee={[li]:i.FUNC_ADD,[sp]:i.FUNC_SUBTRACT,[rp]:i.FUNC_REVERSE_SUBTRACT};ee[op]=i.MIN,ee[ap]=i.MAX;const ue={[cp]:i.ZERO,[lp]:i.ONE,[hp]:i.SRC_COLOR,[aa]:i.SRC_ALPHA,[gp]:i.SRC_ALPHA_SATURATE,[pp]:i.DST_COLOR,[dp]:i.DST_ALPHA,[up]:i.ONE_MINUS_SRC_COLOR,[ca]:i.ONE_MINUS_SRC_ALPHA,[mp]:i.ONE_MINUS_DST_COLOR,[fp]:i.ONE_MINUS_DST_ALPHA,[vp]:i.CONSTANT_COLOR,[yp]:i.ONE_MINUS_CONSTANT_COLOR,[_p]:i.CONSTANT_ALPHA,[xp]:i.ONE_MINUS_CONSTANT_ALPHA};function k(V,ve,J,ne,xe,ye,Ge,ft,Tt,nt){if(V===Xn){g===!0&&(Me(i.BLEND),g=!1);return}if(g===!1&&(re(i.BLEND),g=!0),V!==ip){if(V!==f||nt!==w){if((u!==li||_!==li)&&(i.blendEquation(i.FUNC_ADD),u=li,_=li),nt)switch(V){case $i:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dt:i.blendFunc(i.ONE,i.ONE);break;case sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case $i:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case dt:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case sl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case rl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}v=null,x=null,A=null,T=null,R.set(0,0,0),P=0,f=V,w=nt}return}xe=xe||ve,ye=ye||J,Ge=Ge||ne,(ve!==u||xe!==_)&&(i.blendEquationSeparate(ee[ve],ee[xe]),u=ve,_=xe),(J!==v||ne!==x||ye!==A||Ge!==T)&&(i.blendFuncSeparate(ue[J],ue[ne],ue[ye],ue[Ge]),v=J,x=ne,A=ye,T=Ge),(ft.equals(R)===!1||Tt!==P)&&(i.blendColor(ft.r,ft.g,ft.b,Tt),R.copy(ft),P=Tt),f=V,w=!1}function Fe(V,ve){V.side===Rt?Me(i.CULL_FACE):re(i.CULL_FACE);let J=V.side===Ut;ve&&(J=!J),Ne(J),V.blending===$i&&V.transparent===!1?k(Xn):k(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);const ne=V.stencilWrite;a.setTest(ne),ne&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Te(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?re(i.SAMPLE_ALPHA_TO_COVERAGE):Me(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ne(V){M!==V&&(V?i.frontFace(i.CW):i.frontFace(i.CCW),M=V)}function ke(V){V!==ep?(re(i.CULL_FACE),V!==D&&(V===il?i.cullFace(i.BACK):V===tp?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Me(i.CULL_FACE),D=V}function Ee(V){V!==G&&(I&&i.lineWidth(V),G=V)}function Te(V,ve,J){V?(re(i.POLYGON_OFFSET_FILL),(S!==ve||L!==J)&&(i.polygonOffset(ve,J),S=ve,L=J)):Me(i.POLYGON_OFFSET_FILL)}function ge(V){V?re(i.SCISSOR_TEST):Me(i.SCISSOR_TEST)}function C(V){V===void 0&&(V=i.TEXTURE0+F-1),U!==V&&(i.activeTexture(V),U=V)}function E(V,ve,J){J===void 0&&(U===null?J=i.TEXTURE0+F-1:J=U);let ne=B[J];ne===void 0&&(ne={type:void 0,texture:void 0},B[J]=ne),(ne.type!==V||ne.texture!==ve)&&(U!==J&&(i.activeTexture(J),U=J),i.bindTexture(V,ve||oe[V]),ne.type=V,ne.texture=ve)}function $(){const V=B[U];V!==void 0&&V.type!==void 0&&(i.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function te(){try{i.compressedTexImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function q(){try{i.texSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ce(){try{i.texSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ie(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function de(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function De(){try{i.texStorage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ae(){try{i.texStorage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function pe(){try{i.texImage2D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Ie(){try{i.texImage3D.apply(i,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Oe(V){fe.equals(V)===!1&&(i.scissor(V.x,V.y,V.z,V.w),fe.copy(V))}function Se(V){X.equals(V)===!1&&(i.viewport(V.x,V.y,V.z,V.w),X.copy(V))}function $e(V,ve){let J=l.get(ve);J===void 0&&(J=new WeakMap,l.set(ve,J));let ne=J.get(V);ne===void 0&&(ne=i.getUniformBlockIndex(ve,V.name),J.set(V,ne))}function Ve(V,ve){const ne=l.get(ve).get(V);c.get(ve)!==ne&&(i.uniformBlockBinding(ve,ne,V.__bindingPointIndex),c.set(ve,ne))}function tt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},U=null,B={},d={},p=new WeakMap,m=[],y=null,g=!1,f=null,u=null,v=null,x=null,_=null,A=null,T=null,R=new je(0,0,0),P=0,w=!1,M=null,D=null,G=null,S=null,L=null,fe.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:re,disable:Me,bindFramebuffer:Pe,drawBuffers:Ue,useProgram:Y,setBlending:k,setMaterial:Fe,setFlipSided:Ne,setCullFace:ke,setLineWidth:Ee,setPolygonOffset:Te,setScissorTest:ge,activeTexture:C,bindTexture:E,unbindTexture:$,compressedTexImage2D:te,compressedTexImage3D:se,texImage2D:pe,texImage3D:Ie,updateUBOMapping:$e,uniformBlockBinding:Ve,texStorage2D:De,texStorage3D:ae,texSubImage2D:q,texSubImage3D:ce,compressedTexSubImage2D:ie,compressedTexSubImage3D:de,scissor:Oe,viewport:Se,reset:tt}}function Jl(i,e,t,n){const s=Vy(n);switch(t){case vu:return i*e;case _u:return i*e;case xu:return i*e*2;case Mu:return i*e/s.components*s.byteLength;case cc:return i*e/s.components*s.byteLength;case Su:return i*e*2/s.components*s.byteLength;case lc:return i*e*2/s.components*s.byteLength;case yu:return i*e*3/s.components*s.byteLength;case an:return i*e*4/s.components*s.byteLength;case hc:return i*e*4/s.components*s.byteLength;case Cr:case Pr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Lr:case Dr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case xa:case Sa:return Math.max(i,16)*Math.max(e,8)/4;case _a:case Ma:return Math.max(i,8)*Math.max(e,8)/2;case wa:case Ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ba:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Aa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ra:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Pa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case La:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Da:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ia:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ua:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Na:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Fa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Oa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ka:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ba:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ir:case za:case Va:return Math.ceil(i/4)*Math.ceil(e/4)*16;case wu:case Ga:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ha:case Wa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Vy(i){switch(i){case Cn:case pu:return{byteLength:1,components:1};case ks:case mu:case Gs:return{byteLength:2,components:1};case oc:case ac:return{byteLength:2,components:4};case yi:case rc:case Tn:return{byteLength:4,components:1};case gu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Gy(i,e,t,n,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ze,h=new WeakMap;let d;const p=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(C,E){return m?new OffscreenCanvas(C,E):zr("canvas")}function g(C,E,$){let te=1;const se=ge(C);if((se.width>$||se.height>$)&&(te=$/Math.max(se.width,se.height)),te<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const q=Math.floor(te*se.width),ce=Math.floor(te*se.height);d===void 0&&(d=y(q,ce));const ie=E?y(q,ce):d;return ie.width=q,ie.height=ce,ie.getContext("2d").drawImage(C,0,0,q,ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+q+"x"+ce+")."),ie}else return"data"in C&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),C;return C}function f(C){return C.generateMipmaps}function u(C){i.generateMipmap(C)}function v(C){return C.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?i.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function x(C,E,$,te,se=!1){if(C!==null){if(i[C]!==void 0)return i[C];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let q=E;if(E===i.RED&&($===i.FLOAT&&(q=i.R32F),$===i.HALF_FLOAT&&(q=i.R16F),$===i.UNSIGNED_BYTE&&(q=i.R8)),E===i.RED_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.R8UI),$===i.UNSIGNED_SHORT&&(q=i.R16UI),$===i.UNSIGNED_INT&&(q=i.R32UI),$===i.BYTE&&(q=i.R8I),$===i.SHORT&&(q=i.R16I),$===i.INT&&(q=i.R32I)),E===i.RG&&($===i.FLOAT&&(q=i.RG32F),$===i.HALF_FLOAT&&(q=i.RG16F),$===i.UNSIGNED_BYTE&&(q=i.RG8)),E===i.RG_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RG8UI),$===i.UNSIGNED_SHORT&&(q=i.RG16UI),$===i.UNSIGNED_INT&&(q=i.RG32UI),$===i.BYTE&&(q=i.RG8I),$===i.SHORT&&(q=i.RG16I),$===i.INT&&(q=i.RG32I)),E===i.RGB_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RGB8UI),$===i.UNSIGNED_SHORT&&(q=i.RGB16UI),$===i.UNSIGNED_INT&&(q=i.RGB32UI),$===i.BYTE&&(q=i.RGB8I),$===i.SHORT&&(q=i.RGB16I),$===i.INT&&(q=i.RGB32I)),E===i.RGBA_INTEGER&&($===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),$===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),$===i.UNSIGNED_INT&&(q=i.RGBA32UI),$===i.BYTE&&(q=i.RGBA8I),$===i.SHORT&&(q=i.RGBA16I),$===i.INT&&(q=i.RGBA32I)),E===i.RGB&&$===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),E===i.RGBA){const ce=se?Yr:Ze.getTransfer(te);$===i.FLOAT&&(q=i.RGBA32F),$===i.HALF_FLOAT&&(q=i.RGBA16F),$===i.UNSIGNED_BYTE&&(q=ce===st?i.SRGB8_ALPHA8:i.RGBA8),$===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),$===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function _(C,E){let $;return C?E===null||E===yi||E===ss?$=i.DEPTH24_STENCIL8:E===Tn?$=i.DEPTH32F_STENCIL8:E===ks&&($=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===yi||E===ss?$=i.DEPTH_COMPONENT24:E===Tn?$=i.DEPTH_COMPONENT32F:E===ks&&($=i.DEPTH_COMPONENT16),$}function A(C,E){return f(C)===!0||C.isFramebufferTexture&&C.minFilter!==ln&&C.minFilter!==fn?Math.log2(Math.max(E.width,E.height))+1:C.mipmaps!==void 0&&C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?E.mipmaps.length:1}function T(C){const E=C.target;E.removeEventListener("dispose",T),P(E),E.isVideoTexture&&h.delete(E)}function R(C){const E=C.target;E.removeEventListener("dispose",R),M(E)}function P(C){const E=n.get(C);if(E.__webglInit===void 0)return;const $=C.source,te=p.get($);if(te){const se=te[E.__cacheKey];se.usedTimes--,se.usedTimes===0&&w(C),Object.keys(te).length===0&&p.delete($)}n.remove(C)}function w(C){const E=n.get(C);i.deleteTexture(E.__webglTexture);const $=C.source,te=p.get($);delete te[E.__cacheKey],o.memory.textures--}function M(C){const E=n.get(C);if(C.depthTexture&&(C.depthTexture.dispose(),n.remove(C.depthTexture)),C.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(E.__webglFramebuffer[te]))for(let se=0;se<E.__webglFramebuffer[te].length;se++)i.deleteFramebuffer(E.__webglFramebuffer[te][se]);else i.deleteFramebuffer(E.__webglFramebuffer[te]);E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer[te])}else{if(Array.isArray(E.__webglFramebuffer))for(let te=0;te<E.__webglFramebuffer.length;te++)i.deleteFramebuffer(E.__webglFramebuffer[te]);else i.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&i.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&i.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let te=0;te<E.__webglColorRenderbuffer.length;te++)E.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(E.__webglColorRenderbuffer[te]);E.__webglDepthRenderbuffer&&i.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const $=C.textures;for(let te=0,se=$.length;te<se;te++){const q=n.get($[te]);q.__webglTexture&&(i.deleteTexture(q.__webglTexture),o.memory.textures--),n.remove($[te])}n.remove(C)}let D=0;function G(){D=0}function S(){const C=D;return C>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+C+" texture units while this GPU supports only "+s.maxTextures),D+=1,C}function L(C){const E=[];return E.push(C.wrapS),E.push(C.wrapT),E.push(C.wrapR||0),E.push(C.magFilter),E.push(C.minFilter),E.push(C.anisotropy),E.push(C.internalFormat),E.push(C.format),E.push(C.type),E.push(C.generateMipmaps),E.push(C.premultiplyAlpha),E.push(C.flipY),E.push(C.unpackAlignment),E.push(C.colorSpace),E.join()}function F(C,E){const $=n.get(C);if(C.isVideoTexture&&Ee(C),C.isRenderTargetTexture===!1&&C.version>0&&$.__version!==C.version){const te=C.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X($,C,E);return}}t.bindTexture(i.TEXTURE_2D,$.__webglTexture,i.TEXTURE0+E)}function I(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){X($,C,E);return}t.bindTexture(i.TEXTURE_2D_ARRAY,$.__webglTexture,i.TEXTURE0+E)}function z(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){X($,C,E);return}t.bindTexture(i.TEXTURE_3D,$.__webglTexture,i.TEXTURE0+E)}function O(C,E){const $=n.get(C);if(C.version>0&&$.__version!==C.version){Q($,C,E);return}t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture,i.TEXTURE0+E)}const U={[Os]:i.REPEAT,[fi]:i.CLAMP_TO_EDGE,[ya]:i.MIRRORED_REPEAT},B={[ln]:i.NEAREST,[Cp]:i.NEAREST_MIPMAP_NEAREST,[nr]:i.NEAREST_MIPMAP_LINEAR,[fn]:i.LINEAR,[po]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},Z={[Ip]:i.NEVER,[Bp]:i.ALWAYS,[Up]:i.LESS,[Tu]:i.LEQUAL,[Np]:i.EQUAL,[kp]:i.GEQUAL,[Fp]:i.GREATER,[Op]:i.NOTEQUAL};function le(C,E){if(E.type===Tn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===fn||E.magFilter===po||E.magFilter===nr||E.magFilter===pi||E.minFilter===fn||E.minFilter===po||E.minFilter===nr||E.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(C,i.TEXTURE_WRAP_S,U[E.wrapS]),i.texParameteri(C,i.TEXTURE_WRAP_T,U[E.wrapT]),(C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY)&&i.texParameteri(C,i.TEXTURE_WRAP_R,U[E.wrapR]),i.texParameteri(C,i.TEXTURE_MAG_FILTER,B[E.magFilter]),i.texParameteri(C,i.TEXTURE_MIN_FILTER,B[E.minFilter]),E.compareFunction&&(i.texParameteri(C,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(C,i.TEXTURE_COMPARE_FUNC,Z[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===ln||E.minFilter!==nr&&E.minFilter!==pi||E.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||n.get(E).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");i.texParameterf(C,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),n.get(E).__currentAnisotropy=E.anisotropy}}}function fe(C,E){let $=!1;C.__webglInit===void 0&&(C.__webglInit=!0,E.addEventListener("dispose",T));const te=E.source;let se=p.get(te);se===void 0&&(se={},p.set(te,se));const q=L(E);if(q!==C.__cacheKey){se[q]===void 0&&(se[q]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,$=!0),se[q].usedTimes++;const ce=se[C.__cacheKey];ce!==void 0&&(se[C.__cacheKey].usedTimes--,ce.usedTimes===0&&w(E)),C.__cacheKey=q,C.__webglTexture=se[q].texture}return $}function X(C,E,$){let te=i.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),E.isData3DTexture&&(te=i.TEXTURE_3D);const se=fe(C,E),q=E.source;t.bindTexture(te,C.__webglTexture,i.TEXTURE0+$);const ce=n.get(q);if(q.version!==ce.__version||se===!0){t.activeTexture(i.TEXTURE0+$);const ie=Ze.getPrimaries(Ze.workingColorSpace),de=E.colorSpace===Gn?null:Ze.getPrimaries(E.colorSpace),De=E.colorSpace===Gn||ie===de?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let ae=g(E.image,!1,s.maxTextureSize);ae=Te(E,ae);const pe=r.convert(E.format,E.colorSpace),Ie=r.convert(E.type);let Oe=x(E.internalFormat,pe,Ie,E.colorSpace,E.isVideoTexture);le(te,E);let Se;const $e=E.mipmaps,Ve=E.isVideoTexture!==!0,tt=ce.__version===void 0||se===!0,V=q.dataReady,ve=A(E,ae);if(E.isDepthTexture)Oe=_(E.format===rs,E.type),tt&&(Ve?t.texStorage2D(i.TEXTURE_2D,1,Oe,ae.width,ae.height):t.texImage2D(i.TEXTURE_2D,0,Oe,ae.width,ae.height,0,pe,Ie,null));else if(E.isDataTexture)if($e.length>0){Ve&&tt&&t.texStorage2D(i.TEXTURE_2D,ve,Oe,$e[0].width,$e[0].height);for(let J=0,ne=$e.length;J<ne;J++)Se=$e[J],Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Se.width,Se.height,pe,Ie,Se.data):t.texImage2D(i.TEXTURE_2D,J,Oe,Se.width,Se.height,0,pe,Ie,Se.data);E.generateMipmaps=!1}else Ve?(tt&&t.texStorage2D(i.TEXTURE_2D,ve,Oe,ae.width,ae.height),V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae.width,ae.height,pe,Ie,ae.data)):t.texImage2D(i.TEXTURE_2D,0,Oe,ae.width,ae.height,0,pe,Ie,ae.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){Ve&&tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Oe,$e[0].width,$e[0].height,ae.depth);for(let J=0,ne=$e.length;J<ne;J++)if(Se=$e[J],E.format!==an)if(pe!==null)if(Ve){if(V)if(E.layerUpdates.size>0){const xe=Jl(Se.width,Se.height,E.format,E.type);for(const ye of E.layerUpdates){const Ge=Se.data.subarray(ye*xe/Se.data.BYTES_PER_ELEMENT,(ye+1)*xe/Se.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,ye,Se.width,Se.height,1,pe,Ge)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Se.width,Se.height,ae.depth,pe,Se.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,J,Oe,Se.width,Se.height,ae.depth,0,Se.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ve?V&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,J,0,0,0,Se.width,Se.height,ae.depth,pe,Ie,Se.data):t.texImage3D(i.TEXTURE_2D_ARRAY,J,Oe,Se.width,Se.height,ae.depth,0,pe,Ie,Se.data)}else{Ve&&tt&&t.texStorage2D(i.TEXTURE_2D,ve,Oe,$e[0].width,$e[0].height);for(let J=0,ne=$e.length;J<ne;J++)Se=$e[J],E.format!==an?pe!==null?Ve?V&&t.compressedTexSubImage2D(i.TEXTURE_2D,J,0,0,Se.width,Se.height,pe,Se.data):t.compressedTexImage2D(i.TEXTURE_2D,J,Oe,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,Se.width,Se.height,pe,Ie,Se.data):t.texImage2D(i.TEXTURE_2D,J,Oe,Se.width,Se.height,0,pe,Ie,Se.data)}else if(E.isDataArrayTexture)if(Ve){if(tt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ve,Oe,ae.width,ae.height,ae.depth),V)if(E.layerUpdates.size>0){const J=Jl(ae.width,ae.height,E.format,E.type);for(const ne of E.layerUpdates){const xe=ae.data.subarray(ne*J/ae.data.BYTES_PER_ELEMENT,(ne+1)*J/ae.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ne,ae.width,ae.height,1,pe,Ie,xe)}E.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ae.width,ae.height,ae.depth,pe,Ie,ae.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Oe,ae.width,ae.height,ae.depth,0,pe,Ie,ae.data);else if(E.isData3DTexture)Ve?(tt&&t.texStorage3D(i.TEXTURE_3D,ve,Oe,ae.width,ae.height,ae.depth),V&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ae.width,ae.height,ae.depth,pe,Ie,ae.data)):t.texImage3D(i.TEXTURE_3D,0,Oe,ae.width,ae.height,ae.depth,0,pe,Ie,ae.data);else if(E.isFramebufferTexture){if(tt)if(Ve)t.texStorage2D(i.TEXTURE_2D,ve,Oe,ae.width,ae.height);else{let J=ae.width,ne=ae.height;for(let xe=0;xe<ve;xe++)t.texImage2D(i.TEXTURE_2D,xe,Oe,J,ne,0,pe,Ie,null),J>>=1,ne>>=1}}else if($e.length>0){if(Ve&&tt){const J=ge($e[0]);t.texStorage2D(i.TEXTURE_2D,ve,Oe,J.width,J.height)}for(let J=0,ne=$e.length;J<ne;J++)Se=$e[J],Ve?V&&t.texSubImage2D(i.TEXTURE_2D,J,0,0,pe,Ie,Se):t.texImage2D(i.TEXTURE_2D,J,Oe,pe,Ie,Se);E.generateMipmaps=!1}else if(Ve){if(tt){const J=ge(ae);t.texStorage2D(i.TEXTURE_2D,ve,Oe,J.width,J.height)}V&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,pe,Ie,ae)}else t.texImage2D(i.TEXTURE_2D,0,Oe,pe,Ie,ae);f(E)&&u(te),ce.__version=q.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function Q(C,E,$){if(E.image.length!==6)return;const te=fe(C,E),se=E.source;t.bindTexture(i.TEXTURE_CUBE_MAP,C.__webglTexture,i.TEXTURE0+$);const q=n.get(se);if(se.version!==q.__version||te===!0){t.activeTexture(i.TEXTURE0+$);const ce=Ze.getPrimaries(Ze.workingColorSpace),ie=E.colorSpace===Gn?null:Ze.getPrimaries(E.colorSpace),de=E.colorSpace===Gn||ce===ie?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const De=E.isCompressedTexture||E.image[0].isCompressedTexture,ae=E.image[0]&&E.image[0].isDataTexture,pe=[];for(let ne=0;ne<6;ne++)!De&&!ae?pe[ne]=g(E.image[ne],!0,s.maxCubemapSize):pe[ne]=ae?E.image[ne].image:E.image[ne],pe[ne]=Te(E,pe[ne]);const Ie=pe[0],Oe=r.convert(E.format,E.colorSpace),Se=r.convert(E.type),$e=x(E.internalFormat,Oe,Se,E.colorSpace),Ve=E.isVideoTexture!==!0,tt=q.__version===void 0||te===!0,V=se.dataReady;let ve=A(E,Ie);le(i.TEXTURE_CUBE_MAP,E);let J;if(De){Ve&&tt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,$e,Ie.width,Ie.height);for(let ne=0;ne<6;ne++){J=pe[ne].mipmaps;for(let xe=0;xe<J.length;xe++){const ye=J[xe];E.format!==an?Oe!==null?Ve?V&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe,0,0,ye.width,ye.height,Oe,ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe,$e,ye.width,ye.height,0,ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe,0,0,ye.width,ye.height,Oe,Se,ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe,$e,ye.width,ye.height,0,Oe,Se,ye.data)}}}else{if(J=E.mipmaps,Ve&&tt){J.length>0&&ve++;const ne=ge(pe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ve,$e,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(ae){Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,pe[ne].width,pe[ne].height,Oe,Se,pe[ne].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,pe[ne].width,pe[ne].height,0,Oe,Se,pe[ne].data);for(let xe=0;xe<J.length;xe++){const Ge=J[xe].image[ne].image;Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe+1,0,0,Ge.width,Ge.height,Oe,Se,Ge.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe+1,$e,Ge.width,Ge.height,0,Oe,Se,Ge.data)}}else{Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Oe,Se,pe[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,Oe,Se,pe[ne]);for(let xe=0;xe<J.length;xe++){const ye=J[xe];Ve?V&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe+1,0,0,Oe,Se,ye.image[ne]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ne,xe+1,$e,Oe,Se,ye.image[ne])}}}f(E)&&u(i.TEXTURE_CUBE_MAP),q.__version=se.version,E.onUpdate&&E.onUpdate(E)}C.__version=E.version}function oe(C,E,$,te,se,q){const ce=r.convert($.format,$.colorSpace),ie=r.convert($.type),de=x($.internalFormat,ce,ie,$.colorSpace),De=n.get(E),ae=n.get($);if(ae.__renderTarget=E,!De.__hasExternalTextures){const pe=Math.max(1,E.width>>q),Ie=Math.max(1,E.height>>q);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,q,de,pe,Ie,E.depth,0,ce,ie,null):t.texImage2D(se,q,de,pe,Ie,0,ce,ie,null)}t.bindFramebuffer(i.FRAMEBUFFER,C),ke(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,se,ae.__webglTexture,0,Ne(E)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,se,ae.__webglTexture,q),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(C,E,$){if(i.bindRenderbuffer(i.RENDERBUFFER,C),E.depthBuffer){const te=E.depthTexture,se=te&&te.isDepthTexture?te.type:null,q=_(E.stencilBuffer,se),ce=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ie=Ne(E);ke(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ie,q,E.width,E.height):$?i.renderbufferStorageMultisample(i.RENDERBUFFER,ie,q,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,q,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ce,i.RENDERBUFFER,C)}else{const te=E.textures;for(let se=0;se<te.length;se++){const q=te[se],ce=r.convert(q.format,q.colorSpace),ie=r.convert(q.type),de=x(q.internalFormat,ce,ie,q.colorSpace),De=Ne(E);$&&ke(E)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,De,de,E.width,E.height):ke(E)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,De,de,E.width,E.height):i.renderbufferStorage(i.RENDERBUFFER,de,E.width,E.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Me(C,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,C),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(E.depthTexture);te.__renderTarget=E,(!te.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),F(E.depthTexture,0);const se=te.__webglTexture,q=Ne(E);if(E.depthTexture.format===Yi)ke(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(E.depthTexture.format===rs)ke(E)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Pe(C){const E=n.get(C),$=C.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==C.depthTexture){const te=C.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),te){const se=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,te.removeEventListener("dispose",se)};te.addEventListener("dispose",se),E.__depthDisposeCallback=se}E.__boundDepthTexture=te}if(C.depthTexture&&!E.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Me(E.__webglFramebuffer,C)}else if($){E.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer[te]),E.__webglDepthbuffer[te]===void 0)E.__webglDepthbuffer[te]=i.createRenderbuffer(),re(E.__webglDepthbuffer[te],C,!1);else{const se=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,q=E.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,q),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,q)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=i.createRenderbuffer(),re(E.__webglDepthbuffer,C,!1);else{const te=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=E.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,se)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ue(C,E,$){const te=n.get(C);E!==void 0&&oe(te.__webglFramebuffer,C,C.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),$!==void 0&&Pe(C)}function Y(C){const E=C.texture,$=n.get(C),te=n.get(E);C.addEventListener("dispose",R);const se=C.textures,q=C.isWebGLCubeRenderTarget===!0,ce=se.length>1;if(ce||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=E.version,o.memory.textures++),q){$.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[ie]=[];for(let de=0;de<E.mipmaps.length;de++)$.__webglFramebuffer[ie][de]=i.createFramebuffer()}else $.__webglFramebuffer[ie]=i.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let ie=0;ie<E.mipmaps.length;ie++)$.__webglFramebuffer[ie]=i.createFramebuffer()}else $.__webglFramebuffer=i.createFramebuffer();if(ce)for(let ie=0,de=se.length;ie<de;ie++){const De=n.get(se[ie]);De.__webglTexture===void 0&&(De.__webglTexture=i.createTexture(),o.memory.textures++)}if(C.samples>0&&ke(C)===!1){$.__webglMultisampledFramebuffer=i.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ie=0;ie<se.length;ie++){const de=se[ie];$.__webglColorRenderbuffer[ie]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,$.__webglColorRenderbuffer[ie]);const De=r.convert(de.format,de.colorSpace),ae=r.convert(de.type),pe=x(de.internalFormat,De,ae,de.colorSpace,C.isXRRenderTarget===!0),Ie=Ne(C);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,pe,C.width,C.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ie,i.RENDERBUFFER,$.__webglColorRenderbuffer[ie])}i.bindRenderbuffer(i.RENDERBUFFER,null),C.depthBuffer&&($.__webglDepthRenderbuffer=i.createRenderbuffer(),re($.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(q){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),le(i.TEXTURE_CUBE_MAP,E);for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)oe($.__webglFramebuffer[ie][de],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,de);else oe($.__webglFramebuffer[ie],C,E,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);f(E)&&u(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ce){for(let ie=0,de=se.length;ie<de;ie++){const De=se[ie],ae=n.get(De);t.bindTexture(i.TEXTURE_2D,ae.__webglTexture),le(i.TEXTURE_2D,De),oe($.__webglFramebuffer,C,De,i.COLOR_ATTACHMENT0+ie,i.TEXTURE_2D,0),f(De)&&u(i.TEXTURE_2D)}t.unbindTexture()}else{let ie=i.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ie,te.__webglTexture),le(ie,E),E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)oe($.__webglFramebuffer[de],C,E,i.COLOR_ATTACHMENT0,ie,de);else oe($.__webglFramebuffer,C,E,i.COLOR_ATTACHMENT0,ie,0);f(E)&&u(ie),t.unbindTexture()}C.depthBuffer&&Pe(C)}function ee(C){const E=C.textures;for(let $=0,te=E.length;$<te;$++){const se=E[$];if(f(se)){const q=v(C),ce=n.get(se).__webglTexture;t.bindTexture(q,ce),u(q),t.unbindTexture()}}}const ue=[],k=[];function Fe(C){if(C.samples>0){if(ke(C)===!1){const E=C.textures,$=C.width,te=C.height;let se=i.COLOR_BUFFER_BIT;const q=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ce=n.get(C),ie=E.length>1;if(ie)for(let de=0;de<E.length;de++)t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ce.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglFramebuffer);for(let de=0;de<E.length;de++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),ie){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);const De=n.get(E[de]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,De,0)}i.blitFramebuffer(0,0,$,te,0,0,$,te,se,i.NEAREST),c===!0&&(ue.length=0,k.length=0,ue.push(i.COLOR_ATTACHMENT0+de),C.depthBuffer&&C.resolveDepthBuffer===!1&&(ue.push(q),k.push(q),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,k)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ie)for(let de=0;de<E.length;de++){t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.RENDERBUFFER,ce.__webglColorRenderbuffer[de]);const De=n.get(E[de]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ce.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+de,i.TEXTURE_2D,De,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ce.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.resolveDepthBuffer===!1&&c){const E=C.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[E])}}}function Ne(C){return Math.min(s.maxSamples,C.samples)}function ke(C){const E=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Ee(C){const E=o.render.frame;h.get(C)!==E&&(h.set(C,E),C.update())}function Te(C,E){const $=C.colorSpace,te=C.format,se=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||$!==as&&$!==Gn&&(Ze.getTransfer($)===st?(te!==an||se!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),E}function ge(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(l.width=C.naturalWidth||C.width,l.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(l.width=C.displayWidth,l.height=C.displayHeight):(l.width=C.width,l.height=C.height),l}this.allocateTextureUnit=S,this.resetTextureUnits=G,this.setTexture2D=F,this.setTexture2DArray=I,this.setTexture3D=z,this.setTextureCube=O,this.rebindTextures=Ue,this.setupRenderTarget=Y,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=Fe,this.setupDepthRenderbuffer=Pe,this.setupFrameBufferTexture=oe,this.useMultisampledRTT=ke}function Hy(i,e){function t(n,s=Gn){let r;const o=Ze.getTransfer(s);if(n===Cn)return i.UNSIGNED_BYTE;if(n===oc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===ac)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===pu)return i.BYTE;if(n===mu)return i.SHORT;if(n===ks)return i.UNSIGNED_SHORT;if(n===rc)return i.INT;if(n===yi)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===Gs)return i.HALF_FLOAT;if(n===vu)return i.ALPHA;if(n===yu)return i.RGB;if(n===an)return i.RGBA;if(n===_u)return i.LUMINANCE;if(n===xu)return i.LUMINANCE_ALPHA;if(n===Yi)return i.DEPTH_COMPONENT;if(n===rs)return i.DEPTH_STENCIL;if(n===Mu)return i.RED;if(n===cc)return i.RED_INTEGER;if(n===Su)return i.RG;if(n===lc)return i.RG_INTEGER;if(n===hc)return i.RGBA_INTEGER;if(n===Cr||n===Pr||n===Lr||n===Dr)if(o===st)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Cr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Cr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Pr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Lr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Dr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_a||n===xa||n===Ma||n===Sa)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_a)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ma)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Sa)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===wa||n===Ea||n===Ta)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===wa||n===Ea)return o===st?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Ta)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ba||n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Ua||n===Na||n===Fa||n===Oa||n===ka||n===Ba)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ba)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Aa)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ra)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ca)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pa)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===La)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Da)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ia)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ua)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Na)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fa)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oa)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ka)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ba)return o===st?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ir||n===za||n===Va)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Ir)return o===st?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===za)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Va)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===wu||n===Ga||n===Ha||n===Wa)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ir)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Ga)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ha)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ss?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class Wy extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Et extends vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Xy={type:"move"};class Ho{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Et,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Et,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Et,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const g of e.hand.values()){const f=t.getJointPose(g,n),u=this._getHandJoint(l,g);f!==null&&(u.matrix.fromArray(f.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=f.radius),u.visible=f!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],p=h.position.distanceTo(d.position),m=.02,y=.005;l.inputState.pinching&&p>m+y?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&p<=m-y&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Xy)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Et;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const qy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,$y=`
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

}`;class Yy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new Nt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Zn({vertexShader:qy,fragmentShader:$y,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new we(new Xs(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jy extends cs{constructor(e,t){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,p=null,m=null,y=null;const g=new Yy,f=t.getContextAttributes();let u=null,v=null;const x=[],_=[],A=new ze;let T=null;const R=new Wt;R.viewport=new at;const P=new Wt;P.viewport=new at;const w=[R,P],M=new Wy;let D=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Q=x[X];return Q===void 0&&(Q=new Ho,x[X]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(X){let Q=x[X];return Q===void 0&&(Q=new Ho,x[X]=Q),Q.getGripSpace()},this.getHand=function(X){let Q=x[X];return Q===void 0&&(Q=new Ho,x[X]=Q),Q.getHandSpace()};function S(X){const Q=_.indexOf(X.inputSource);if(Q===-1)return;const oe=x[Q];oe!==void 0&&(oe.update(X.inputSource,X.frame,l||o),oe.dispatchEvent({type:X.type,data:X.inputSource}))}function L(){s.removeEventListener("select",S),s.removeEventListener("selectstart",S),s.removeEventListener("selectend",S),s.removeEventListener("squeeze",S),s.removeEventListener("squeezestart",S),s.removeEventListener("squeezeend",S),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",F);for(let X=0;X<x.length;X++){const Q=_[X];Q!==null&&(_[X]=null,x[X].disconnect(Q))}D=null,G=null,g.reset(),e.setRenderTarget(u),m=null,p=null,d=null,s=null,v=null,fe.stop(),n.isPresenting=!1,e.setPixelRatio(T),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return p!==null?p:m},this.getBinding=function(){return d},this.getFrame=function(){return y},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(u=e.getRenderTarget(),s.addEventListener("select",S),s.addEventListener("selectstart",S),s.addEventListener("selectend",S),s.addEventListener("squeeze",S),s.addEventListener("squeezestart",S),s.addEventListener("squeezeend",S),s.addEventListener("end",L),s.addEventListener("inputsourceschange",F),f.xrCompatible!==!0&&await t.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0){const Q={antialias:f.antialias,alpha:!0,depth:f.depth,stencil:f.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Q),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),v=new _i(m.framebufferWidth,m.framebufferHeight,{format:an,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:f.stencil})}else{let Q=null,oe=null,re=null;f.depth&&(re=f.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Q=f.stencil?rs:Yi,oe=f.stencil?ss:yi);const Me={colorFormat:t.RGBA8,depthFormat:re,scaleFactor:r};d=new XRWebGLBinding(s,t),p=d.createProjectionLayer(Me),s.updateRenderState({layers:[p]}),e.setPixelRatio(1),e.setSize(p.textureWidth,p.textureHeight,!1),v=new _i(p.textureWidth,p.textureHeight,{format:an,type:Cn,depthTexture:new Bu(p.textureWidth,p.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,Q),stencilBuffer:f.stencil,colorSpace:e.outputColorSpace,samples:f.antialias?4:0,resolveDepthBuffer:p.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),fe.setContext(s),fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function F(X){for(let Q=0;Q<X.removed.length;Q++){const oe=X.removed[Q],re=_.indexOf(oe);re>=0&&(_[re]=null,x[re].disconnect(oe))}for(let Q=0;Q<X.added.length;Q++){const oe=X.added[Q];let re=_.indexOf(oe);if(re===-1){for(let Pe=0;Pe<x.length;Pe++)if(Pe>=_.length){_.push(oe),re=Pe;break}else if(_[Pe]===null){_[Pe]=oe,re=Pe;break}if(re===-1)break}const Me=x[re];Me&&Me.connect(oe)}}const I=new N,z=new N;function O(X,Q,oe){I.setFromMatrixPosition(Q.matrixWorld),z.setFromMatrixPosition(oe.matrixWorld);const re=I.distanceTo(z),Me=Q.projectionMatrix.elements,Pe=oe.projectionMatrix.elements,Ue=Me[14]/(Me[10]-1),Y=Me[14]/(Me[10]+1),ee=(Me[9]+1)/Me[5],ue=(Me[9]-1)/Me[5],k=(Me[8]-1)/Me[0],Fe=(Pe[8]+1)/Pe[0],Ne=Ue*k,ke=Ue*Fe,Ee=re/(-k+Fe),Te=Ee*-k;if(Q.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Te),X.translateZ(Ee),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Me[10]===-1)X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const ge=Ue+Ee,C=Y+Ee,E=Ne-Te,$=ke+(re-Te),te=ee*Y/C*ge,se=ue*Y/C*ge;X.projectionMatrix.makePerspective(E,$,te,se,ge,C),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function U(X,Q){Q===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Q.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Q=X.near,oe=X.far;g.texture!==null&&(g.depthNear>0&&(Q=g.depthNear),g.depthFar>0&&(oe=g.depthFar)),M.near=P.near=R.near=Q,M.far=P.far=R.far=oe,(D!==M.near||G!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),D=M.near,G=M.far),R.layers.mask=X.layers.mask|2,P.layers.mask=X.layers.mask|4,M.layers.mask=R.layers.mask|P.layers.mask;const re=X.parent,Me=M.cameras;U(M,re);for(let Pe=0;Pe<Me.length;Pe++)U(Me[Pe],re);Me.length===2?O(M,R,P):M.projectionMatrix.copy(R.projectionMatrix),B(X,M,re)};function B(X,Q,oe){oe===null?X.matrix.copy(Q.matrixWorld):(X.matrix.copy(oe.matrixWorld),X.matrix.invert(),X.matrix.multiply(Q.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Q.projectionMatrix),X.projectionMatrixInverse.copy(Q.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=qa*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(p===null&&m===null))return c},this.setFoveation=function(X){c=X,p!==null&&(p.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(M)};let Z=null;function le(X,Q){if(h=Q.getViewerPose(l||o),y=Q,h!==null){const oe=h.views;m!==null&&(e.setRenderTargetFramebuffer(v,m.framebuffer),e.setRenderTarget(v));let re=!1;oe.length!==M.cameras.length&&(M.cameras.length=0,re=!0);for(let Pe=0;Pe<oe.length;Pe++){const Ue=oe[Pe];let Y=null;if(m!==null)Y=m.getViewport(Ue);else{const ue=d.getViewSubImage(p,Ue);Y=ue.viewport,Pe===0&&(e.setRenderTargetTextures(v,ue.colorTexture,p.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(v))}let ee=w[Pe];ee===void 0&&(ee=new Wt,ee.layers.enable(Pe),ee.viewport=new at,w[Pe]=ee),ee.matrix.fromArray(Ue.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(Ue.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(Y.x,Y.y,Y.width,Y.height),Pe===0&&(M.matrix.copy(ee.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),re===!0&&M.cameras.push(ee)}const Me=s.enabledFeatures;if(Me&&Me.includes("depth-sensing")){const Pe=d.getDepthInformation(oe[0]);Pe&&Pe.isValid&&Pe.texture&&g.init(e,Pe,s.renderState)}}for(let oe=0;oe<x.length;oe++){const re=_[oe],Me=x[oe];re!==null&&Me!==void 0&&Me.update(re,Q,l||o)}Z&&Z(X,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),y=null}const fe=new Ou;fe.setAnimationLoop(le),this.setAnimationLoop=function(X){Z=X},this.dispose=function(){}}}const ri=new Qt,Ky=new it;function Zy(i,e){function t(f,u){f.matrixAutoUpdate===!0&&f.updateMatrix(),u.value.copy(f.matrix)}function n(f,u){u.color.getRGB(f.fogColor.value,Uu(i)),u.isFog?(f.fogNear.value=u.near,f.fogFar.value=u.far):u.isFogExp2&&(f.fogDensity.value=u.density)}function s(f,u,v,x,_){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(f,u):u.isMeshToonMaterial?(r(f,u),d(f,u)):u.isMeshPhongMaterial?(r(f,u),h(f,u)):u.isMeshStandardMaterial?(r(f,u),p(f,u),u.isMeshPhysicalMaterial&&m(f,u,_)):u.isMeshMatcapMaterial?(r(f,u),y(f,u)):u.isMeshDepthMaterial?r(f,u):u.isMeshDistanceMaterial?(r(f,u),g(f,u)):u.isMeshNormalMaterial?r(f,u):u.isLineBasicMaterial?(o(f,u),u.isLineDashedMaterial&&a(f,u)):u.isPointsMaterial?c(f,u,v,x):u.isSpriteMaterial?l(f,u):u.isShadowMaterial?(f.color.value.copy(u.color),f.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(f,u){f.opacity.value=u.opacity,u.color&&f.diffuse.value.copy(u.color),u.emissive&&f.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(f.map.value=u.map,t(u.map,f.mapTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.bumpMap&&(f.bumpMap.value=u.bumpMap,t(u.bumpMap,f.bumpMapTransform),f.bumpScale.value=u.bumpScale,u.side===Ut&&(f.bumpScale.value*=-1)),u.normalMap&&(f.normalMap.value=u.normalMap,t(u.normalMap,f.normalMapTransform),f.normalScale.value.copy(u.normalScale),u.side===Ut&&f.normalScale.value.negate()),u.displacementMap&&(f.displacementMap.value=u.displacementMap,t(u.displacementMap,f.displacementMapTransform),f.displacementScale.value=u.displacementScale,f.displacementBias.value=u.displacementBias),u.emissiveMap&&(f.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,f.emissiveMapTransform)),u.specularMap&&(f.specularMap.value=u.specularMap,t(u.specularMap,f.specularMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest);const v=e.get(u),x=v.envMap,_=v.envMapRotation;x&&(f.envMap.value=x,ri.copy(_),ri.x*=-1,ri.y*=-1,ri.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ri.y*=-1,ri.z*=-1),f.envMapRotation.value.setFromMatrix4(Ky.makeRotationFromEuler(ri)),f.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=u.reflectivity,f.ior.value=u.ior,f.refractionRatio.value=u.refractionRatio),u.lightMap&&(f.lightMap.value=u.lightMap,f.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,f.lightMapTransform)),u.aoMap&&(f.aoMap.value=u.aoMap,f.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,f.aoMapTransform))}function o(f,u){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,u.map&&(f.map.value=u.map,t(u.map,f.mapTransform))}function a(f,u){f.dashSize.value=u.dashSize,f.totalSize.value=u.dashSize+u.gapSize,f.scale.value=u.scale}function c(f,u,v,x){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,f.size.value=u.size*v,f.scale.value=x*.5,u.map&&(f.map.value=u.map,t(u.map,f.uvTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest)}function l(f,u){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,f.rotation.value=u.rotation,u.map&&(f.map.value=u.map,t(u.map,f.mapTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest)}function h(f,u){f.specular.value.copy(u.specular),f.shininess.value=Math.max(u.shininess,1e-4)}function d(f,u){u.gradientMap&&(f.gradientMap.value=u.gradientMap)}function p(f,u){f.metalness.value=u.metalness,u.metalnessMap&&(f.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,f.metalnessMapTransform)),f.roughness.value=u.roughness,u.roughnessMap&&(f.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,f.roughnessMapTransform)),u.envMap&&(f.envMapIntensity.value=u.envMapIntensity)}function m(f,u,v){f.ior.value=u.ior,u.sheen>0&&(f.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),f.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(f.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,f.sheenColorMapTransform)),u.sheenRoughnessMap&&(f.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,f.sheenRoughnessMapTransform))),u.clearcoat>0&&(f.clearcoat.value=u.clearcoat,f.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(f.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,f.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(f.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Ut&&f.clearcoatNormalScale.value.negate())),u.dispersion>0&&(f.dispersion.value=u.dispersion),u.iridescence>0&&(f.iridescence.value=u.iridescence,f.iridescenceIOR.value=u.iridescenceIOR,f.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(f.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,f.iridescenceMapTransform)),u.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),u.transmission>0&&(f.transmission.value=u.transmission,f.transmissionSamplerMap.value=v.texture,f.transmissionSamplerSize.value.set(v.width,v.height),u.transmissionMap&&(f.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,f.transmissionMapTransform)),f.thickness.value=u.thickness,u.thicknessMap&&(f.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=u.attenuationDistance,f.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(f.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(f.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=u.specularIntensity,f.specularColor.value.copy(u.specularColor),u.specularColorMap&&(f.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,f.specularColorMapTransform)),u.specularIntensityMap&&(f.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,f.specularIntensityMapTransform))}function y(f,u){u.matcap&&(f.matcap.value=u.matcap)}function g(f,u){const v=e.get(u).light;f.referencePosition.value.setFromMatrixPosition(v.matrixWorld),f.nearDistance.value=v.shadow.camera.near,f.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Jy(i,e,t,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,x){const _=x.program;n.uniformBlockBinding(v,_)}function l(v,x){let _=s[v.id];_===void 0&&(y(v),_=h(v),s[v.id]=_,v.addEventListener("dispose",f));const A=x.program;n.updateUBOMapping(v,A);const T=e.render.frame;r[v.id]!==T&&(p(v),r[v.id]=T)}function h(v){const x=d();v.__bindingPointIndex=x;const _=i.createBuffer(),A=v.__size,T=v.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,A,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,_),_}function d(){for(let v=0;v<a;v++)if(o.indexOf(v)===-1)return o.push(v),v;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function p(v){const x=s[v.id],_=v.uniforms,A=v.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let T=0,R=_.length;T<R;T++){const P=Array.isArray(_[T])?_[T]:[_[T]];for(let w=0,M=P.length;w<M;w++){const D=P[w];if(m(D,T,w,A)===!0){const G=D.__offset,S=Array.isArray(D.value)?D.value:[D.value];let L=0;for(let F=0;F<S.length;F++){const I=S[F],z=g(I);typeof I=="number"||typeof I=="boolean"?(D.__data[0]=I,i.bufferSubData(i.UNIFORM_BUFFER,G+L,D.__data)):I.isMatrix3?(D.__data[0]=I.elements[0],D.__data[1]=I.elements[1],D.__data[2]=I.elements[2],D.__data[3]=0,D.__data[4]=I.elements[3],D.__data[5]=I.elements[4],D.__data[6]=I.elements[5],D.__data[7]=0,D.__data[8]=I.elements[6],D.__data[9]=I.elements[7],D.__data[10]=I.elements[8],D.__data[11]=0):(I.toArray(D.__data,L),L+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(v,x,_,A){const T=v.value,R=x+"_"+_;if(A[R]===void 0)return typeof T=="number"||typeof T=="boolean"?A[R]=T:A[R]=T.clone(),!0;{const P=A[R];if(typeof T=="number"||typeof T=="boolean"){if(P!==T)return A[R]=T,!0}else if(P.equals(T)===!1)return P.copy(T),!0}return!1}function y(v){const x=v.uniforms;let _=0;const A=16;for(let R=0,P=x.length;R<P;R++){const w=Array.isArray(x[R])?x[R]:[x[R]];for(let M=0,D=w.length;M<D;M++){const G=w[M],S=Array.isArray(G.value)?G.value:[G.value];for(let L=0,F=S.length;L<F;L++){const I=S[L],z=g(I),O=_%A,U=O%z.boundary,B=O+U;_+=U,B!==0&&A-B<z.storage&&(_+=A-B),G.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=_,_+=z.storage}}}const T=_%A;return T>0&&(_+=A-T),v.__size=_,v.__cache={},this}function g(v){const x={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(x.boundary=4,x.storage=4):v.isVector2?(x.boundary=8,x.storage=8):v.isVector3||v.isColor?(x.boundary=16,x.storage=12):v.isVector4?(x.boundary=16,x.storage=16):v.isMatrix3?(x.boundary=48,x.storage=48):v.isMatrix4?(x.boundary=64,x.storage=64):v.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",v),x}function f(v){const x=v.target;x.removeEventListener("dispose",f);const _=o.indexOf(x.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete r[x.id]}function u(){for(const v in s)i.deleteBuffer(s[v]);o=[],s={},r={}}return{bind:c,update:l,dispose:u}}class Qy{constructor(e={}){const{canvas:t=Vp(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:p=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const y=new Uint32Array(4),g=new Int32Array(4);let f=null,u=null;const v=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=jt,this.toneMapping=qn,this.toneMappingExposure=1;const _=this;let A=!1,T=0,R=0,P=null,w=-1,M=null;const D=new at,G=new at;let S=null;const L=new je(0);let F=0,I=t.width,z=t.height,O=1,U=null,B=null;const Z=new at(0,0,I,z),le=new at(0,0,I,z);let fe=!1;const X=new uc;let Q=!1,oe=!1;const re=new it,Me=new it,Pe=new N,Ue=new at,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ee=!1;function ue(){return P===null?O:1}let k=n;function Fe(b,H){return t.getContext(b,H)}try{const b={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${sc}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",xe,!1),t.addEventListener("webglcontextcreationerror",ye,!1),k===null){const H="webgl2";if(k=Fe(H,b),k===null)throw Fe(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Ne,ke,Ee,Te,ge,C,E,$,te,se,q,ce,ie,de,De,ae,pe,Ie,Oe,Se,$e,Ve,tt,V;function ve(){Ne=new sv(k),Ne.init(),Ve=new Hy(k,Ne),ke=new J0(k,Ne,e,Ve),Ee=new zy(k,Ne),ke.reverseDepthBuffer&&p&&Ee.buffers.depth.setReversed(!0),Te=new av(k),ge=new Ty,C=new Gy(k,Ne,Ee,ge,ke,Ve,Te),E=new ev(_),$=new iv(_),te=new pm(k),tt=new K0(k,te),se=new rv(k,te,Te,tt),q=new lv(k,se,te,Te),Oe=new cv(k,ke,C),ae=new Q0(ge),ce=new Ey(_,E,$,Ne,ke,tt,ae),ie=new Zy(_,ge),de=new Ay,De=new Iy(Ne),Ie=new j0(_,E,$,Ee,q,m,c),pe=new ky(_,q,ke),V=new Jy(k,Te,ke,Ee),Se=new Z0(k,Ne,Te),$e=new ov(k,Ne,Te),Te.programs=ce.programs,_.capabilities=ke,_.extensions=Ne,_.properties=ge,_.renderLists=de,_.shadowMap=pe,_.state=Ee,_.info=Te}ve();const J=new jy(_,k);this.xr=J,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const b=Ne.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Ne.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(b){b!==void 0&&(O=b,this.setSize(I,z,!1))},this.getSize=function(b){return b.set(I,z)},this.setSize=function(b,H,j=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=b,z=H,t.width=Math.floor(b*O),t.height=Math.floor(H*O),j===!0&&(t.style.width=b+"px",t.style.height=H+"px"),this.setViewport(0,0,b,H)},this.getDrawingBufferSize=function(b){return b.set(I*O,z*O).floor()},this.setDrawingBufferSize=function(b,H,j){I=b,z=H,O=j,t.width=Math.floor(b*j),t.height=Math.floor(H*j),this.setViewport(0,0,b,H)},this.getCurrentViewport=function(b){return b.copy(D)},this.getViewport=function(b){return b.copy(Z)},this.setViewport=function(b,H,j,K){b.isVector4?Z.set(b.x,b.y,b.z,b.w):Z.set(b,H,j,K),Ee.viewport(D.copy(Z).multiplyScalar(O).round())},this.getScissor=function(b){return b.copy(le)},this.setScissor=function(b,H,j,K){b.isVector4?le.set(b.x,b.y,b.z,b.w):le.set(b,H,j,K),Ee.scissor(G.copy(le).multiplyScalar(O).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(b){Ee.setScissorTest(fe=b)},this.setOpaqueSort=function(b){U=b},this.setTransparentSort=function(b){B=b},this.getClearColor=function(b){return b.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor.apply(Ie,arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha.apply(Ie,arguments)},this.clear=function(b=!0,H=!0,j=!0){let K=0;if(b){let W=!1;if(P!==null){const he=P.texture.format;W=he===hc||he===lc||he===cc}if(W){const he=P.texture.type,_e=he===Cn||he===yi||he===ks||he===ss||he===oc||he===ac,be=Ie.getClearColor(),Ae=Ie.getClearAlpha(),Be=be.r,He=be.g,Re=be.b;_e?(y[0]=Be,y[1]=He,y[2]=Re,y[3]=Ae,k.clearBufferuiv(k.COLOR,0,y)):(g[0]=Be,g[1]=He,g[2]=Re,g[3]=Ae,k.clearBufferiv(k.COLOR,0,g))}else K|=k.COLOR_BUFFER_BIT}H&&(K|=k.DEPTH_BUFFER_BIT),j&&(K|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",xe,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),de.dispose(),De.dispose(),ge.dispose(),E.dispose(),$.dispose(),q.dispose(),tt.dispose(),V.dispose(),ce.dispose(),J.dispose(),J.removeEventListener("sessionstart",mc),J.removeEventListener("sessionend",gc),Qn.stop()};function ne(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function xe(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const b=Te.autoReset,H=pe.enabled,j=pe.autoUpdate,K=pe.needsUpdate,W=pe.type;ve(),Te.autoReset=b,pe.enabled=H,pe.autoUpdate=j,pe.needsUpdate=K,pe.type=W}function ye(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function Ge(b){const H=b.target;H.removeEventListener("dispose",Ge),ft(H)}function ft(b){Tt(b),ge.remove(b)}function Tt(b){const H=ge.get(b).programs;H!==void 0&&(H.forEach(function(j){ce.releaseProgram(j)}),b.isShaderMaterial&&ce.releaseShaderCache(b))}this.renderBufferDirect=function(b,H,j,K,W,he){H===null&&(H=Y);const _e=W.isMesh&&W.matrixWorld.determinant()<0,be=$u(b,H,j,K,W);Ee.setMaterial(K,_e);let Ae=j.index,Be=1;if(K.wireframe===!0){if(Ae=se.getWireframeAttribute(j),Ae===void 0)return;Be=2}const He=j.drawRange,Re=j.attributes.position;let Je=He.start*Be,ct=(He.start+He.count)*Be;he!==null&&(Je=Math.max(Je,he.start*Be),ct=Math.min(ct,(he.start+he.count)*Be)),Ae!==null?(Je=Math.max(Je,0),ct=Math.min(ct,Ae.count)):Re!=null&&(Je=Math.max(Je,0),ct=Math.min(ct,Re.count));const ht=ct-Je;if(ht<0||ht===1/0)return;tt.setup(W,K,be,j,Ae);let Ot,Qe=Se;if(Ae!==null&&(Ot=te.get(Ae),Qe=$e,Qe.setIndex(Ot)),W.isMesh)K.wireframe===!0?(Ee.setLineWidth(K.wireframeLinewidth*ue()),Qe.setMode(k.LINES)):Qe.setMode(k.TRIANGLES);else if(W.isLine){let Le=K.linewidth;Le===void 0&&(Le=1),Ee.setLineWidth(Le*ue()),W.isLineSegments?Qe.setMode(k.LINES):W.isLineLoop?Qe.setMode(k.LINE_LOOP):Qe.setMode(k.LINE_STRIP)}else W.isPoints?Qe.setMode(k.POINTS):W.isSprite&&Qe.setMode(k.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Qe.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Ne.get("WEBGL_multi_draw"))Qe.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Le=W._multiDrawStarts,mn=W._multiDrawCounts,et=W._multiDrawCount,tn=Ae?te.get(Ae).bytesPerElement:1,bi=ge.get(K).currentProgram.getUniforms();for(let zt=0;zt<et;zt++)bi.setValue(k,"_gl_DrawID",zt),Qe.render(Le[zt]/tn,mn[zt])}else if(W.isInstancedMesh)Qe.renderInstances(Je,ht,W.count);else if(j.isInstancedBufferGeometry){const Le=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,mn=Math.min(j.instanceCount,Le);Qe.renderInstances(Je,ht,mn)}else Qe.render(Je,ht)};function nt(b,H,j){b.transparent===!0&&b.side===Rt&&b.forceSinglePass===!1?(b.side=Ut,b.needsUpdate=!0,js(b,H,j),b.side=Kn,b.needsUpdate=!0,js(b,H,j),b.side=Rt):js(b,H,j)}this.compile=function(b,H,j=null){j===null&&(j=b),u=De.get(j),u.init(H),x.push(u),j.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(u.pushLight(W),W.castShadow&&u.pushShadow(W))}),b!==j&&b.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(u.pushLight(W),W.castShadow&&u.pushShadow(W))}),u.setupLights();const K=new Set;return b.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const he=W.material;if(he)if(Array.isArray(he))for(let _e=0;_e<he.length;_e++){const be=he[_e];nt(be,j,W),K.add(be)}else nt(he,j,W),K.add(he)}),x.pop(),u=null,K},this.compileAsync=function(b,H,j=null){const K=this.compile(b,H,j);return new Promise(W=>{function he(){if(K.forEach(function(_e){ge.get(_e).currentProgram.isReady()&&K.delete(_e)}),K.size===0){W(b);return}setTimeout(he,10)}Ne.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let en=null;function pn(b){en&&en(b)}function mc(){Qn.stop()}function gc(){Qn.start()}const Qn=new Ou;Qn.setAnimationLoop(pn),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(b){en=b,J.setAnimationLoop(b),b===null?Qn.stop():Qn.start()},J.addEventListener("sessionstart",mc),J.addEventListener("sessionend",gc),this.render=function(b,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(H),H=J.getCamera()),b.isScene===!0&&b.onBeforeRender(_,b,H,P),u=De.get(b,x.length),u.init(H),x.push(u),Me.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),X.setFromProjectionMatrix(Me),oe=this.localClippingEnabled,Q=ae.init(this.clippingPlanes,oe),f=de.get(b,v.length),f.init(),v.push(f),J.enabled===!0&&J.isPresenting===!0){const he=_.xr.getDepthSensingMesh();he!==null&&eo(he,H,-1/0,_.sortObjects)}eo(b,H,0,_.sortObjects),f.finish(),_.sortObjects===!0&&f.sort(U,B),ee=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,ee&&Ie.addToRenderList(f,b),this.info.render.frame++,Q===!0&&ae.beginShadows();const j=u.state.shadowsArray;pe.render(j,b,H),Q===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=f.opaque,W=f.transmissive;if(u.setupLights(),H.isArrayCamera){const he=H.cameras;if(W.length>0)for(let _e=0,be=he.length;_e<be;_e++){const Ae=he[_e];yc(K,W,b,Ae)}ee&&Ie.render(b);for(let _e=0,be=he.length;_e<be;_e++){const Ae=he[_e];vc(f,b,Ae,Ae.viewport)}}else W.length>0&&yc(K,W,b,H),ee&&Ie.render(b),vc(f,b,H);P!==null&&(C.updateMultisampleRenderTarget(P),C.updateRenderTargetMipmap(P)),b.isScene===!0&&b.onAfterRender(_,b,H),tt.resetDefaultState(),w=-1,M=null,x.pop(),x.length>0?(u=x[x.length-1],Q===!0&&ae.setGlobalState(_.clippingPlanes,u.state.camera)):u=null,v.pop(),v.length>0?f=v[v.length-1]:f=null};function eo(b,H,j,K){if(b.visible===!1)return;if(b.layers.test(H.layers)){if(b.isGroup)j=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(H);else if(b.isLight)u.pushLight(b),b.castShadow&&u.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||X.intersectsSprite(b)){K&&Ue.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Me);const _e=q.update(b),be=b.material;be.visible&&f.push(b,_e,be,j,Ue.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||X.intersectsObject(b))){const _e=q.update(b),be=b.material;if(K&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),Ue.copy(b.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Ue.copy(_e.boundingSphere.center)),Ue.applyMatrix4(b.matrixWorld).applyMatrix4(Me)),Array.isArray(be)){const Ae=_e.groups;for(let Be=0,He=Ae.length;Be<He;Be++){const Re=Ae[Be],Je=be[Re.materialIndex];Je&&Je.visible&&f.push(b,_e,Je,j,Ue.z,Re)}}else be.visible&&f.push(b,_e,be,j,Ue.z,null)}}const he=b.children;for(let _e=0,be=he.length;_e<be;_e++)eo(he[_e],H,j,K)}function vc(b,H,j,K){const W=b.opaque,he=b.transmissive,_e=b.transparent;u.setupLightsView(j),Q===!0&&ae.setGlobalState(_.clippingPlanes,j),K&&Ee.viewport(D.copy(K)),W.length>0&&Ys(W,H,j),he.length>0&&Ys(he,H,j),_e.length>0&&Ys(_e,H,j),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function yc(b,H,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[K.id]===void 0&&(u.state.transmissionRenderTarget[K.id]=new _i(1,1,{generateMipmaps:!0,type:Ne.has("EXT_color_buffer_half_float")||Ne.has("EXT_color_buffer_float")?Gs:Cn,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace}));const he=u.state.transmissionRenderTarget[K.id],_e=K.viewport||D;he.setSize(_e.z,_e.w);const be=_.getRenderTarget();_.setRenderTarget(he),_.getClearColor(L),F=_.getClearAlpha(),F<1&&_.setClearColor(16777215,.5),_.clear(),ee&&Ie.render(j);const Ae=_.toneMapping;_.toneMapping=qn;const Be=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),u.setupLightsView(K),Q===!0&&ae.setGlobalState(_.clippingPlanes,K),Ys(b,j,K),C.updateMultisampleRenderTarget(he),C.updateRenderTargetMipmap(he),Ne.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let Re=0,Je=H.length;Re<Je;Re++){const ct=H[Re],ht=ct.object,Ot=ct.geometry,Qe=ct.material,Le=ct.group;if(Qe.side===Rt&&ht.layers.test(K.layers)){const mn=Qe.side;Qe.side=Ut,Qe.needsUpdate=!0,_c(ht,j,K,Ot,Qe,Le),Qe.side=mn,Qe.needsUpdate=!0,He=!0}}He===!0&&(C.updateMultisampleRenderTarget(he),C.updateRenderTargetMipmap(he))}_.setRenderTarget(be),_.setClearColor(L,F),Be!==void 0&&(K.viewport=Be),_.toneMapping=Ae}function Ys(b,H,j){const K=H.isScene===!0?H.overrideMaterial:null;for(let W=0,he=b.length;W<he;W++){const _e=b[W],be=_e.object,Ae=_e.geometry,Be=K===null?_e.material:K,He=_e.group;be.layers.test(j.layers)&&_c(be,H,j,Ae,Be,He)}}function _c(b,H,j,K,W,he){b.onBeforeRender(_,H,j,K,W,he),b.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),W.onBeforeRender(_,H,j,K,b,he),W.transparent===!0&&W.side===Rt&&W.forceSinglePass===!1?(W.side=Ut,W.needsUpdate=!0,_.renderBufferDirect(j,H,K,W,b,he),W.side=Kn,W.needsUpdate=!0,_.renderBufferDirect(j,H,K,W,b,he),W.side=Rt):_.renderBufferDirect(j,H,K,W,b,he),b.onAfterRender(_,H,j,K,W,he)}function js(b,H,j){H.isScene!==!0&&(H=Y);const K=ge.get(b),W=u.state.lights,he=u.state.shadowsArray,_e=W.state.version,be=ce.getParameters(b,W.state,he,H,j),Ae=ce.getProgramCacheKey(be);let Be=K.programs;K.environment=b.isMeshStandardMaterial?H.environment:null,K.fog=H.fog,K.envMap=(b.isMeshStandardMaterial?$:E).get(b.envMap||K.environment),K.envMapRotation=K.environment!==null&&b.envMap===null?H.environmentRotation:b.envMapRotation,Be===void 0&&(b.addEventListener("dispose",Ge),Be=new Map,K.programs=Be);let He=Be.get(Ae);if(He!==void 0){if(K.currentProgram===He&&K.lightsStateVersion===_e)return Mc(b,be),He}else be.uniforms=ce.getUniforms(b),b.onBeforeCompile(be,_),He=ce.acquireProgram(be,Ae),Be.set(Ae,He),K.uniforms=be.uniforms;const Re=K.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Re.clippingPlanes=ae.uniform),Mc(b,be),K.needsLights=ju(b),K.lightsStateVersion=_e,K.needsLights&&(Re.ambientLightColor.value=W.state.ambient,Re.lightProbe.value=W.state.probe,Re.directionalLights.value=W.state.directional,Re.directionalLightShadows.value=W.state.directionalShadow,Re.spotLights.value=W.state.spot,Re.spotLightShadows.value=W.state.spotShadow,Re.rectAreaLights.value=W.state.rectArea,Re.ltc_1.value=W.state.rectAreaLTC1,Re.ltc_2.value=W.state.rectAreaLTC2,Re.pointLights.value=W.state.point,Re.pointLightShadows.value=W.state.pointShadow,Re.hemisphereLights.value=W.state.hemi,Re.directionalShadowMap.value=W.state.directionalShadowMap,Re.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Re.spotShadowMap.value=W.state.spotShadowMap,Re.spotLightMatrix.value=W.state.spotLightMatrix,Re.spotLightMap.value=W.state.spotLightMap,Re.pointShadowMap.value=W.state.pointShadowMap,Re.pointShadowMatrix.value=W.state.pointShadowMatrix),K.currentProgram=He,K.uniformsList=null,He}function xc(b){if(b.uniformsList===null){const H=b.currentProgram.getUniforms();b.uniformsList=Ur.seqWithValue(H.seq,b.uniforms)}return b.uniformsList}function Mc(b,H){const j=ge.get(b);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function $u(b,H,j,K,W){H.isScene!==!0&&(H=Y),C.resetTextureUnits();const he=H.fog,_e=K.isMeshStandardMaterial?H.environment:null,be=P===null?_.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:as,Ae=(K.isMeshStandardMaterial?$:E).get(K.envMap||_e),Be=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,He=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Re=!!j.morphAttributes.position,Je=!!j.morphAttributes.normal,ct=!!j.morphAttributes.color;let ht=qn;K.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(ht=_.toneMapping);const Ot=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Qe=Ot!==void 0?Ot.length:0,Le=ge.get(K),mn=u.state.lights;if(Q===!0&&(oe===!0||b!==M)){const $t=b===M&&K.id===w;ae.setState(K,b,$t)}let et=!1;K.version===Le.__version?(Le.needsLights&&Le.lightsStateVersion!==mn.state.version||Le.outputColorSpace!==be||W.isBatchedMesh&&Le.batching===!1||!W.isBatchedMesh&&Le.batching===!0||W.isBatchedMesh&&Le.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Le.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Le.instancing===!1||!W.isInstancedMesh&&Le.instancing===!0||W.isSkinnedMesh&&Le.skinning===!1||!W.isSkinnedMesh&&Le.skinning===!0||W.isInstancedMesh&&Le.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Le.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Le.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Le.instancingMorph===!1&&W.morphTexture!==null||Le.envMap!==Ae||K.fog===!0&&Le.fog!==he||Le.numClippingPlanes!==void 0&&(Le.numClippingPlanes!==ae.numPlanes||Le.numIntersection!==ae.numIntersection)||Le.vertexAlphas!==Be||Le.vertexTangents!==He||Le.morphTargets!==Re||Le.morphNormals!==Je||Le.morphColors!==ct||Le.toneMapping!==ht||Le.morphTargetsCount!==Qe)&&(et=!0):(et=!0,Le.__version=K.version);let tn=Le.currentProgram;et===!0&&(tn=js(K,H,W));let bi=!1,zt=!1,hs=!1;const ut=tn.getUniforms(),hn=Le.uniforms;if(Ee.useProgram(tn.program)&&(bi=!0,zt=!0,hs=!0),K.id!==w&&(w=K.id,zt=!0),bi||M!==b){Ee.buffers.depth.getReversed()?(re.copy(b.projectionMatrix),Hp(re),Wp(re),ut.setValue(k,"projectionMatrix",re)):ut.setValue(k,"projectionMatrix",b.projectionMatrix),ut.setValue(k,"viewMatrix",b.matrixWorldInverse);const Pn=ut.map.cameraPosition;Pn!==void 0&&Pn.setValue(k,Pe.setFromMatrixPosition(b.matrixWorld)),ke.logarithmicDepthBuffer&&ut.setValue(k,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&ut.setValue(k,"isOrthographic",b.isOrthographicCamera===!0),M!==b&&(M=b,zt=!0,hs=!0)}if(W.isSkinnedMesh){ut.setOptional(k,W,"bindMatrix"),ut.setOptional(k,W,"bindMatrixInverse");const $t=W.skeleton;$t&&($t.boneTexture===null&&$t.computeBoneTexture(),ut.setValue(k,"boneTexture",$t.boneTexture,C))}W.isBatchedMesh&&(ut.setOptional(k,W,"batchingTexture"),ut.setValue(k,"batchingTexture",W._matricesTexture,C),ut.setOptional(k,W,"batchingIdTexture"),ut.setValue(k,"batchingIdTexture",W._indirectTexture,C),ut.setOptional(k,W,"batchingColorTexture"),W._colorsTexture!==null&&ut.setValue(k,"batchingColorTexture",W._colorsTexture,C));const us=j.morphAttributes;if((us.position!==void 0||us.normal!==void 0||us.color!==void 0)&&Oe.update(W,j,tn),(zt||Le.receiveShadow!==W.receiveShadow)&&(Le.receiveShadow=W.receiveShadow,ut.setValue(k,"receiveShadow",W.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(hn.envMap.value=Ae,hn.flipEnvMap.value=Ae.isCubeTexture&&Ae.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&H.environment!==null&&(hn.envMapIntensity.value=H.environmentIntensity),zt&&(ut.setValue(k,"toneMappingExposure",_.toneMappingExposure),Le.needsLights&&Yu(hn,hs),he&&K.fog===!0&&ie.refreshFogUniforms(hn,he),ie.refreshMaterialUniforms(hn,K,O,z,u.state.transmissionRenderTarget[b.id]),Ur.upload(k,xc(Le),hn,C)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Ur.upload(k,xc(Le),hn,C),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&ut.setValue(k,"center",W.center),ut.setValue(k,"modelViewMatrix",W.modelViewMatrix),ut.setValue(k,"normalMatrix",W.normalMatrix),ut.setValue(k,"modelMatrix",W.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const $t=K.uniformsGroups;for(let Pn=0,Ln=$t.length;Pn<Ln;Pn++){const Sc=$t[Pn];V.update(Sc,tn),V.bind(Sc,tn)}}return tn}function Yu(b,H){b.ambientLightColor.needsUpdate=H,b.lightProbe.needsUpdate=H,b.directionalLights.needsUpdate=H,b.directionalLightShadows.needsUpdate=H,b.pointLights.needsUpdate=H,b.pointLightShadows.needsUpdate=H,b.spotLights.needsUpdate=H,b.spotLightShadows.needsUpdate=H,b.rectAreaLights.needsUpdate=H,b.hemisphereLights.needsUpdate=H}function ju(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(b,H,j){ge.get(b.texture).__webglTexture=H,ge.get(b.depthTexture).__webglTexture=j;const K=ge.get(b);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=j===void 0,K.__autoAllocateDepthBuffer||Ne.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,H){const j=ge.get(b);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(b,H=0,j=0){P=b,T=H,R=j;let K=!0,W=null,he=!1,_e=!1;if(b){const Ae=ge.get(b);if(Ae.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(k.FRAMEBUFFER,null),K=!1;else if(Ae.__webglFramebuffer===void 0)C.setupRenderTarget(b);else if(Ae.__hasExternalTextures)C.rebindTextures(b,ge.get(b.texture).__webglTexture,ge.get(b.depthTexture).__webglTexture);else if(b.depthBuffer){const Re=b.depthTexture;if(Ae.__boundDepthTexture!==Re){if(Re!==null&&ge.has(Re)&&(b.width!==Re.image.width||b.height!==Re.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");C.setupDepthRenderbuffer(b)}}const Be=b.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(_e=!0);const He=ge.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(He[H])?W=He[H][j]:W=He[H],he=!0):b.samples>0&&C.useMultisampledRTT(b)===!1?W=ge.get(b).__webglMultisampledFramebuffer:Array.isArray(He)?W=He[j]:W=He,D.copy(b.viewport),G.copy(b.scissor),S=b.scissorTest}else D.copy(Z).multiplyScalar(O).floor(),G.copy(le).multiplyScalar(O).floor(),S=fe;if(Ee.bindFramebuffer(k.FRAMEBUFFER,W)&&K&&Ee.drawBuffers(b,W),Ee.viewport(D),Ee.scissor(G),Ee.setScissorTest(S),he){const Ae=ge.get(b.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+H,Ae.__webglTexture,j)}else if(_e){const Ae=ge.get(b.texture),Be=H||0;k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ae.__webglTexture,j||0,Be)}w=-1},this.readRenderTargetPixels=function(b,H,j,K,W,he,_e){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=ge.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){Ee.bindFramebuffer(k.FRAMEBUFFER,be);try{const Ae=b.texture,Be=Ae.format,He=Ae.type;if(!ke.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ke.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=b.width-K&&j>=0&&j<=b.height-W&&k.readPixels(H,j,K,W,Ve.convert(Be),Ve.convert(He),he)}finally{const Ae=P!==null?ge.get(P).__webglFramebuffer:null;Ee.bindFramebuffer(k.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(b,H,j,K,W,he,_e){if(!(b&&b.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=ge.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&_e!==void 0&&(be=be[_e]),be){const Ae=b.texture,Be=Ae.format,He=Ae.type;if(!ke.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ke.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=b.width-K&&j>=0&&j<=b.height-W){Ee.bindFramebuffer(k.FRAMEBUFFER,be);const Re=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Re),k.bufferData(k.PIXEL_PACK_BUFFER,he.byteLength,k.STREAM_READ),k.readPixels(H,j,K,W,Ve.convert(Be),Ve.convert(He),0);const Je=P!==null?ge.get(P).__webglFramebuffer:null;Ee.bindFramebuffer(k.FRAMEBUFFER,Je);const ct=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Gp(k,ct,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Re),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,he),k.deleteBuffer(Re),k.deleteSync(ct),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(b,H=null,j=0){b.isTexture!==!0&&(bs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,b=arguments[1]);const K=Math.pow(2,-j),W=Math.floor(b.image.width*K),he=Math.floor(b.image.height*K),_e=H!==null?H.x:0,be=H!==null?H.y:0;C.setTexture2D(b,0),k.copyTexSubImage2D(k.TEXTURE_2D,j,0,0,_e,be,W,he),Ee.unbindTexture()},this.copyTextureToTexture=function(b,H,j=null,K=null,W=0){b.isTexture!==!0&&(bs("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,b=arguments[1],H=arguments[2],W=arguments[3]||0,j=null);let he,_e,be,Ae,Be,He,Re,Je,ct;const ht=b.isCompressedTexture?b.mipmaps[W]:b.image;j!==null?(he=j.max.x-j.min.x,_e=j.max.y-j.min.y,be=j.isBox3?j.max.z-j.min.z:1,Ae=j.min.x,Be=j.min.y,He=j.isBox3?j.min.z:0):(he=ht.width,_e=ht.height,be=ht.depth||1,Ae=0,Be=0,He=0),K!==null?(Re=K.x,Je=K.y,ct=K.z):(Re=0,Je=0,ct=0);const Ot=Ve.convert(H.format),Qe=Ve.convert(H.type);let Le;H.isData3DTexture?(C.setTexture3D(H,0),Le=k.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(C.setTexture2DArray(H,0),Le=k.TEXTURE_2D_ARRAY):(C.setTexture2D(H,0),Le=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);const mn=k.getParameter(k.UNPACK_ROW_LENGTH),et=k.getParameter(k.UNPACK_IMAGE_HEIGHT),tn=k.getParameter(k.UNPACK_SKIP_PIXELS),bi=k.getParameter(k.UNPACK_SKIP_ROWS),zt=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,ht.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ht.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Ae),k.pixelStorei(k.UNPACK_SKIP_ROWS,Be),k.pixelStorei(k.UNPACK_SKIP_IMAGES,He);const hs=b.isDataArrayTexture||b.isData3DTexture,ut=H.isDataArrayTexture||H.isData3DTexture;if(b.isRenderTargetTexture||b.isDepthTexture){const hn=ge.get(b),us=ge.get(H),$t=ge.get(hn.__renderTarget),Pn=ge.get(us.__renderTarget);Ee.bindFramebuffer(k.READ_FRAMEBUFFER,$t.__webglFramebuffer),Ee.bindFramebuffer(k.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Ln=0;Ln<be;Ln++)hs&&k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ge.get(b).__webglTexture,W,He+Ln),b.isDepthTexture?(ut&&k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ge.get(H).__webglTexture,W,ct+Ln),k.blitFramebuffer(Ae,Be,he,_e,Re,Je,he,_e,k.DEPTH_BUFFER_BIT,k.NEAREST)):ut?k.copyTexSubImage3D(Le,W,Re,Je,ct+Ln,Ae,Be,he,_e):k.copyTexSubImage2D(Le,W,Re,Je,ct+Ln,Ae,Be,he,_e);Ee.bindFramebuffer(k.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else ut?b.isDataTexture||b.isData3DTexture?k.texSubImage3D(Le,W,Re,Je,ct,he,_e,be,Ot,Qe,ht.data):H.isCompressedArrayTexture?k.compressedTexSubImage3D(Le,W,Re,Je,ct,he,_e,be,Ot,ht.data):k.texSubImage3D(Le,W,Re,Je,ct,he,_e,be,Ot,Qe,ht):b.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,W,Re,Je,he,_e,Ot,Qe,ht.data):b.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,W,Re,Je,ht.width,ht.height,Ot,ht.data):k.texSubImage2D(k.TEXTURE_2D,W,Re,Je,he,_e,Ot,Qe,ht);k.pixelStorei(k.UNPACK_ROW_LENGTH,mn),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,et),k.pixelStorei(k.UNPACK_SKIP_PIXELS,tn),k.pixelStorei(k.UNPACK_SKIP_ROWS,bi),k.pixelStorei(k.UNPACK_SKIP_IMAGES,zt),W===0&&H.generateMipmaps&&k.generateMipmap(Le),Ee.unbindTexture()},this.copyTextureToTexture3D=function(b,H,j=null,K=null,W=0){return b.isTexture!==!0&&(bs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,K=arguments[1]||null,b=arguments[2],H=arguments[3],W=arguments[4]||0),bs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(b,H,j,K,W)},this.initRenderTarget=function(b){ge.get(b).__webglFramebuffer===void 0&&C.setupRenderTarget(b)},this.initTexture=function(b){b.isCubeTexture?C.setTextureCube(b,0):b.isData3DTexture?C.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?C.setTexture2DArray(b,0):C.setTexture2D(b,0),Ee.unbindTexture()},this.resetState=function(){T=0,R=0,P=null,Ee.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=Ze._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ze._getUnpackColorSpace()}}class fc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new je(e),this.density=t}clone(){return new fc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class e_ extends vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qt,this.environmentIntensity=1,this.environmentRotation=new Qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class t_{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Xa,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Lt=new N;class Vr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyMatrix4(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.applyNormalMatrix(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Lt.fromBufferAttribute(this,t),Lt.transformDirection(e),this.setXYZ(t,Lt.x,Lt.y,Lt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=dn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=rt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=dn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=rt(t,this.array),n=rt(n,this.array),s=rt(s,this.array),r=rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Vr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Wu extends Ti{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new je(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Gi;const xs=new N,Hi=new N,Wi=new N,Xi=new ze,Ms=new ze,Xu=new it,wr=new N,Ss=new N,Er=new N,Ql=new ze,Wo=new ze,eh=new ze;class n_ extends vt{constructor(e=new Wu){if(super(),this.isSprite=!0,this.type="Sprite",Gi===void 0){Gi=new wt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new t_(t,5);Gi.setIndex([0,1,2,0,2,3]),Gi.setAttribute("position",new Vr(n,3,0,!1)),Gi.setAttribute("uv",new Vr(n,2,3,!1))}this.geometry=Gi,this.material=e,this.center=new ze(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Hi.setFromMatrixScale(this.matrixWorld),Xu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hi.multiplyScalar(-Wi.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Tr(wr.set(-.5,-.5,0),Wi,o,Hi,s,r),Tr(Ss.set(.5,-.5,0),Wi,o,Hi,s,r),Tr(Er.set(.5,.5,0),Wi,o,Hi,s,r),Ql.set(0,0),Wo.set(1,0),eh.set(1,1);let a=e.ray.intersectTriangle(wr,Ss,Er,!1,xs);if(a===null&&(Tr(Ss.set(-.5,.5,0),Wi,o,Hi,s,r),Wo.set(0,1),a=e.ray.intersectTriangle(wr,Er,Ss,!1,xs),a===null))return;const c=e.ray.origin.distanceTo(xs);c<e.near||c>e.far||t.push({distance:c,point:xs.clone(),uv:Kt.getInterpolation(xs,wr,Ss,Er,Ql,Wo,eh,new ze),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Tr(i,e,t,n,s,r){Xi.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(Ms.x=r*Xi.x-s*Xi.y,Ms.y=s*Xi.x+r*Xi.y):Ms.copy(Xi),i.copy(e),i.x+=Ms.x,i.y+=Ms.y,i.applyMatrix4(Xu)}class qs extends Ti{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new je(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const th=new it,Ya=new Cu,br=new Ws,Ar=new N;class Kr extends vt{constructor(e=new wt,t=new qs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),br.copy(n.boundingSphere),br.applyMatrix4(s),br.radius+=r,e.ray.intersectsSphere(br)===!1)return;th.copy(s).invert(),Ya.copy(e.ray).applyMatrix4(th);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,d=n.attributes.position;if(l!==null){const p=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let y=p,g=m;y<g;y++){const f=l.getX(y);Ar.fromBufferAttribute(d,f),nh(Ar,f,c,s,e,t,this)}}else{const p=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let y=p,g=m;y<g;y++)Ar.fromBufferAttribute(d,y),nh(Ar,y,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function nh(i,e,t,n,s,r,o){const a=Ya.distanceSqToPoint(i);if(a<t){const c=new N;Ya.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Zr extends Nt{constructor(e,t,n,s,r,o,a,c,l){super(e,t,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Xt extends wt{constructor(e=1,t=1,n=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],d=[],p=[],m=[];let y=0;const g=[],f=n/2;let u=0;v(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new pt(d,3)),this.setAttribute("normal",new pt(p,3)),this.setAttribute("uv",new pt(m,2));function v(){const _=new N,A=new N;let T=0;const R=(t-e)/n;for(let P=0;P<=r;P++){const w=[],M=P/r,D=M*(t-e)+e;for(let G=0;G<=s;G++){const S=G/s,L=S*c+a,F=Math.sin(L),I=Math.cos(L);A.x=D*F,A.y=-M*n+f,A.z=D*I,d.push(A.x,A.y,A.z),_.set(F,R,I).normalize(),p.push(_.x,_.y,_.z),m.push(S,1-M),w.push(y++)}g.push(w)}for(let P=0;P<s;P++)for(let w=0;w<r;w++){const M=g[w][P],D=g[w+1][P],G=g[w+1][P+1],S=g[w][P+1];(e>0||w!==0)&&(h.push(M,D,S),T+=3),(t>0||w!==r-1)&&(h.push(D,G,S),T+=3)}l.addGroup(u,T,0),u+=T}function x(_){const A=y,T=new ze,R=new N;let P=0;const w=_===!0?e:t,M=_===!0?1:-1;for(let G=1;G<=s;G++)d.push(0,f*M,0),p.push(0,M,0),m.push(.5,.5),y++;const D=y;for(let G=0;G<=s;G++){const L=G/s*c+a,F=Math.cos(L),I=Math.sin(L);R.x=w*I,R.y=f*M,R.z=w*F,d.push(R.x,R.y,R.z),p.push(0,M,0),T.x=F*.5+.5,T.y=I*.5*M+.5,m.push(T.x,T.y),y++}for(let G=0;G<s;G++){const S=A+G,L=D+G;_===!0?h.push(L,L+1,S):h.push(L+1,L,S),P+=3}l.addGroup(u,P,_===!0?1:2),u+=P}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xt(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Yn extends Xt{constructor(e=1,t=1,n=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,n,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Yn(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Jr extends wt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],o=[];a(s),l(n),h(),this.setAttribute("position",new pt(r,3)),this.setAttribute("normal",new pt(r.slice(),3)),this.setAttribute("uv",new pt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(v){const x=new N,_=new N,A=new N;for(let T=0;T<t.length;T+=3)m(t[T+0],x),m(t[T+1],_),m(t[T+2],A),c(x,_,A,v)}function c(v,x,_,A){const T=A+1,R=[];for(let P=0;P<=T;P++){R[P]=[];const w=v.clone().lerp(_,P/T),M=x.clone().lerp(_,P/T),D=T-P;for(let G=0;G<=D;G++)G===0&&P===T?R[P][G]=w:R[P][G]=w.clone().lerp(M,G/D)}for(let P=0;P<T;P++)for(let w=0;w<2*(T-P)-1;w++){const M=Math.floor(w/2);w%2===0?(p(R[P][M+1]),p(R[P+1][M]),p(R[P][M])):(p(R[P][M+1]),p(R[P+1][M+1]),p(R[P+1][M]))}}function l(v){const x=new N;for(let _=0;_<r.length;_+=3)x.x=r[_+0],x.y=r[_+1],x.z=r[_+2],x.normalize().multiplyScalar(v),r[_+0]=x.x,r[_+1]=x.y,r[_+2]=x.z}function h(){const v=new N;for(let x=0;x<r.length;x+=3){v.x=r[x+0],v.y=r[x+1],v.z=r[x+2];const _=f(v)/2/Math.PI+.5,A=u(v)/Math.PI+.5;o.push(_,1-A)}y(),d()}function d(){for(let v=0;v<o.length;v+=6){const x=o[v+0],_=o[v+2],A=o[v+4],T=Math.max(x,_,A),R=Math.min(x,_,A);T>.9&&R<.1&&(x<.2&&(o[v+0]+=1),_<.2&&(o[v+2]+=1),A<.2&&(o[v+4]+=1))}}function p(v){r.push(v.x,v.y,v.z)}function m(v,x){const _=v*3;x.x=e[_+0],x.y=e[_+1],x.z=e[_+2]}function y(){const v=new N,x=new N,_=new N,A=new N,T=new ze,R=new ze,P=new ze;for(let w=0,M=0;w<r.length;w+=9,M+=6){v.set(r[w+0],r[w+1],r[w+2]),x.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),T.set(o[M+0],o[M+1]),R.set(o[M+2],o[M+3]),P.set(o[M+4],o[M+5]),A.copy(v).add(x).add(_).divideScalar(3);const D=f(A);g(T,M+0,v,D),g(R,M+2,x,D),g(P,M+4,_,D)}}function g(v,x,_,A){A<0&&v.x===1&&(o[x]=v.x-1),_.x===0&&_.z===0&&(o[x]=A/2/Math.PI+.5)}function f(v){return Math.atan2(v.z,-v.x)}function u(v){return Math.atan2(-v.y,Math.sqrt(v.x*v.x+v.z*v.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jr(e.vertices,e.indices,e.radius,e.details)}}class $s extends Jr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new $s(e.radius,e.detail)}}class xi extends Jr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new xi(e.radius,e.detail)}}class pc extends wt{constructor(e=.5,t=1,n=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:o},n=Math.max(3,n),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let d=e;const p=(t-e)/s,m=new N,y=new ze;for(let g=0;g<=s;g++){for(let f=0;f<=n;f++){const u=r+f/n*o;m.x=d*Math.cos(u),m.y=d*Math.sin(u),c.push(m.x,m.y,m.z),l.push(0,0,1),y.x=(m.x/t+1)/2,y.y=(m.y/t+1)/2,h.push(y.x,y.y)}d+=p}for(let g=0;g<s;g++){const f=g*(n+1);for(let u=0;u<n;u++){const v=u+f,x=v,_=v+n+1,A=v+n+2,T=v+1;a.push(x,_,T),a.push(_,A,T)}}this.setIndex(a),this.setAttribute("position",new pt(c,3)),this.setAttribute("normal",new pt(l,3)),this.setAttribute("uv",new pt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Jn extends wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],d=new N,p=new N,m=[],y=[],g=[],f=[];for(let u=0;u<=n;u++){const v=[],x=u/n;let _=0;u===0&&o===0?_=.5/t:u===n&&c===Math.PI&&(_=-.5/t);for(let A=0;A<=t;A++){const T=A/t;d.x=-e*Math.cos(s+T*r)*Math.sin(o+x*a),d.y=e*Math.cos(o+x*a),d.z=e*Math.sin(s+T*r)*Math.sin(o+x*a),y.push(d.x,d.y,d.z),p.copy(d).normalize(),g.push(p.x,p.y,p.z),f.push(T+_,1-x),v.push(l++)}h.push(v)}for(let u=0;u<n;u++)for(let v=0;v<t;v++){const x=h[u][v+1],_=h[u][v],A=h[u+1][v],T=h[u+1][v+1];(u!==0||o>0)&&m.push(x,_,T),(u!==n-1||c<Math.PI)&&m.push(_,A,T)}this.setIndex(m),this.setAttribute("position",new pt(y,3)),this.setAttribute("normal",new pt(g,3)),this.setAttribute("uv",new pt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Mi extends wt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r},n=Math.floor(n),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new N,d=new N,p=new N;for(let m=0;m<=n;m++)for(let y=0;y<=s;y++){const g=y/s*r,f=m/n*Math.PI*2;d.x=(e+t*Math.cos(f))*Math.cos(g),d.y=(e+t*Math.cos(f))*Math.sin(g),d.z=t*Math.sin(f),a.push(d.x,d.y,d.z),h.x=e*Math.cos(g),h.y=e*Math.sin(g),p.subVectors(d,h).normalize(),c.push(p.x,p.y,p.z),l.push(y/s),l.push(m/n)}for(let m=1;m<=n;m++)for(let y=1;y<=s;y++){const g=(s+1)*m+y-1,f=(s+1)*(m-1)+y-1,u=(s+1)*(m-1)+y,v=(s+1)*m+y;o.push(g,f,v),o.push(f,u,v)}this.setIndex(o),this.setAttribute("position",new pt(a,3)),this.setAttribute("normal",new pt(c,3)),this.setAttribute("uv",new pt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class It extends Ti{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new je(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new je(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Eu,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Qr extends vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new je(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class i_ extends Qr{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new je(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Xo=new it,ih=new N,sh=new N;class qu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new it,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uc,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new at(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;ih.setFromMatrixPosition(e.matrixWorld),t.position.copy(ih),sh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(sh),t.updateMatrixWorld(),Xo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Xo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const rh=new it,ws=new N,qo=new N;class s_ extends qu{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new at(2,1,1,1),new at(0,1,1,1),new at(3,1,1,1),new at(1,1,1,1),new at(3,0,1,1),new at(1,0,1,1)],this._cubeDirections=[new N(1,0,0),new N(-1,0,0),new N(0,0,1),new N(0,0,-1),new N(0,1,0),new N(0,-1,0)],this._cubeUps=[new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,1,0),new N(0,0,1),new N(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),ws.setFromMatrixPosition(e.matrixWorld),n.position.copy(ws),qo.copy(n.position),qo.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(qo),n.updateMatrixWorld(),s.makeTranslation(-ws.x,-ws.y,-ws.z),rh.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(rh)}}class $o extends Qr{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new s_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class r_ extends qu{constructor(){super(new ku(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class oh extends Qr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(vt.DEFAULT_UP),this.updateMatrix(),this.target=new vt,this.shadow=new r_}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class o_ extends Qr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:sc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=sc);function a_(i,e=1e-4){e=Math.max(e,Number.EPSILON);const t={},n=i.getIndex(),s=i.getAttribute("position"),r=n?n.count:s.count;let o=0;const a=Object.keys(i.attributes),c={},l={},h=[],d=["getX","getY","getZ","getW"],p=["setX","setY","setZ","setW"];for(let v=0,x=a.length;v<x;v++){const _=a[v],A=i.attributes[_];c[_]=new A.constructor(new A.array.constructor(A.count*A.itemSize),A.itemSize,A.normalized);const T=i.morphAttributes[_];T&&(l[_]||(l[_]=[]),T.forEach((R,P)=>{const w=new R.array.constructor(R.count*R.itemSize);l[_][P]=new R.constructor(w,R.itemSize,R.normalized)}))}const m=e*.5,y=Math.log10(1/e),g=Math.pow(10,y),f=m*g;for(let v=0;v<r;v++){const x=n?n.getX(v):v;let _="";for(let A=0,T=a.length;A<T;A++){const R=a[A],P=i.getAttribute(R),w=P.itemSize;for(let M=0;M<w;M++)_+=`${~~(P[d[M]](x)*g+f)},`}if(_ in t)h.push(t[_]);else{for(let A=0,T=a.length;A<T;A++){const R=a[A],P=i.getAttribute(R),w=i.morphAttributes[R],M=P.itemSize,D=c[R],G=l[R];for(let S=0;S<M;S++){const L=d[S],F=p[S];if(D[F](o,P[L](x)),w)for(let I=0,z=w.length;I<z;I++)G[I][F](o,w[I][L](x))}}t[_]=o,h.push(o),o++}}const u=i.clone();for(const v in i.attributes){const x=c[v];if(u.setAttribute(v,new x.constructor(x.array.slice(0,o*x.itemSize),x.itemSize,x.normalized)),v in l)for(let _=0;_<l[v].length;_++){const A=l[v][_];u.morphAttributes[v][_]=new A.constructor(A.array.slice(0,o*A.itemSize),A.itemSize,A.normalized)}}return u.setIndex(h),u}function ah(i){let e=(typeof i=="number"?i:c_(i||"rockets-default-seed"))>>>0;return function(){e|=0,e=e+1831565813|0;let n=Math.imul(e^e>>>15,1|e);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296}}function c_(i){let e=0;for(let t=0;t<i.length;t++)e=(e<<5)-e+i.charCodeAt(t),e|=0;return e>>>0}function Yo(i,e,t){return Math.max(e,Math.min(t,i))}class l_{constructor(){this.ctx=null,this.masterGain=null,this.compressor=null,this.isMuted=!1,this.isUnlocked=!1,this.engineGain=null,this.engineFilter=null,this.engineOsc1=null,this.engineOsc2=null,this.engineNoiseNode=null,this.currentEngineVol=0,this.brakeGain=null,this.brakeFilter=null,this.brakeNoiseNode=null,this.currentBrakeVol=0,this.noiseBuffer=null,this.init()}init(){if(typeof window>"u")return;const e=window.AudioContext||window.webkitAudioContext;if(e)try{this.ctx=new e,this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.threshold.setValueAtTime(-12,this.ctx.currentTime),this.compressor.knee.setValueAtTime(8,this.ctx.currentTime),this.compressor.ratio.setValueAtTime(4,this.ctx.currentTime),this.compressor.attack.setValueAtTime(.005,this.ctx.currentTime),this.compressor.release.setValueAtTime(.08,this.ctx.currentTime),this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(.85,this.ctx.currentTime),this.compressor.connect(this.masterGain),this.masterGain.connect(this.ctx.destination),this.generateNoiseBuffer(),this.initEngineSynth(),this.initBrakeSynth(),this.setupAutoUnlock()}catch(t){console.warn("AudioContext initialization failed:",t)}}setupAutoUnlock(){if(!this.ctx)return;const e=()=>{this.ctx&&this.ctx.state==="suspended"?this.ctx.resume().then(()=>{this.isUnlocked=!0}).catch(()=>{}):this.isUnlocked=!0,window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e),window.removeEventListener("touchstart",e)};window.addEventListener("pointerdown",e,{passive:!0,once:!0}),window.addEventListener("keydown",e,{passive:!0,once:!0}),window.addEventListener("touchstart",e,{passive:!0,once:!0})}updateListener(e){if(!(!this.ctx||!this.ctx.listener||!e))try{const t=this.ctx.listener,n=this.ctx.currentTime,s=e.position,r=new N(0,0,-1).applyQuaternion(e.quaternion),o=new N(0,1,0).applyQuaternion(e.quaternion);t.positionX?(t.positionX.setValueAtTime(s.x,n),t.positionY.setValueAtTime(s.y,n),t.positionZ.setValueAtTime(s.z,n),t.forwardX.setValueAtTime(r.x,n),t.forwardY.setValueAtTime(r.y,n),t.forwardZ.setValueAtTime(r.z,n),t.upX.setValueAtTime(o.x,n),t.upY.setValueAtTime(o.y,n),t.upZ.setValueAtTime(o.z,n)):t.setPosition&&(t.setPosition(s.x,s.y,s.z),t.setOrientation(r.x,r.y,r.z,o.x,o.y,o.z))}catch{}}createPanner(e){if(!this.ctx||!e)return null;try{const t=this.ctx.createPanner();t.panningModel="HRTF",t.distanceModel="inverse",t.refDistance=35,t.maxDistance=2500,t.rolloffFactor=1.15,t.coneInnerAngle=360;const n=this.ctx.currentTime;return t.positionX?(t.positionX.setValueAtTime(e.x,n),t.positionY.setValueAtTime(e.y,n),t.positionZ.setValueAtTime(e.z,n)):t.setPosition&&t.setPosition(e.x,e.y,e.z),t.connect(this.compressor),t}catch{return null}}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}generateNoiseBuffer(){if(!this.ctx)return;const e=this.ctx.sampleRate*2;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const t=this.noiseBuffer.getChannelData(0);for(let n=0;n<e;n++)t[n]=Math.random()*2-1}initEngineSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.engineOsc1=this.ctx.createOscillator(),this.engineOsc1.type="sawtooth",this.engineOsc1.frequency.setValueAtTime(55,this.ctx.currentTime),this.engineOsc2=this.ctx.createOscillator(),this.engineOsc2.type="triangle",this.engineOsc2.frequency.setValueAtTime(110,this.ctx.currentTime),this.engineNoiseNode=this.ctx.createBufferSource(),this.engineNoiseNode.buffer=this.noiseBuffer,this.engineNoiseNode.loop=!0,this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.setValueAtTime(120,this.ctx.currentTime),this.engineFilter.Q.setValueAtTime(3,this.ctx.currentTime),this.engineGain=this.ctx.createGain(),this.engineGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.engineOsc1.connect(this.engineFilter),this.engineOsc2.connect(this.engineFilter),this.engineNoiseNode.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineGain.connect(this.compressor);try{this.engineOsc1.start(),this.engineOsc2.start(),this.engineNoiseNode.start()}catch{}}}initBrakeSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.brakeNoiseNode=this.ctx.createBufferSource(),this.brakeNoiseNode.buffer=this.noiseBuffer,this.brakeNoiseNode.loop=!0,this.brakeFilter=this.ctx.createBiquadFilter(),this.brakeFilter.type="bandpass",this.brakeFilter.frequency.setValueAtTime(1400,this.ctx.currentTime),this.brakeFilter.Q.setValueAtTime(2.5,this.ctx.currentTime),this.brakeGain=this.ctx.createGain(),this.brakeGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.brakeNoiseNode.connect(this.brakeFilter),this.brakeFilter.connect(this.brakeGain),this.brakeGain.connect(this.compressor);try{this.brakeNoiseNode.start()}catch{}}}updateEngine(e,t,n){if(!this.ctx||!this.engineGain||!this.brakeGain)return;this.resume();const s=e?.38:0,r=e?460:120;this.currentEngineVol+=(s-this.currentEngineVol)*Math.min(1,n*10);const o=this.ctx.currentTime;this.engineGain.gain.setTargetAtTime(Math.max(1e-4,this.currentEngineVol),o,.05),this.engineFilter.frequency.setTargetAtTime(r,o,.08);const a=t?.32:0;this.currentBrakeVol+=(a-this.currentBrakeVol)*Math.min(1,n*12),this.brakeGain.gain.setTargetAtTime(Math.max(1e-4,this.currentBrakeVol),o,.04)}playLockTick(e=0){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,n=this.ctx.createOscillator(),s=this.ctx.createGain();n.type="sine";const r=750+e*800;n.frequency.setValueAtTime(r,t),s.gain.setValueAtTime(.18,t),s.gain.exponentialRampToValueAtTime(.001,t+.06),n.connect(s),s.connect(this.compressor),n.start(t),n.stop(t+.07)}playLockChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createOscillator(),s=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(1760,e),t.frequency.setValueAtTime(2200,e+.08),n.type="sine",n.frequency.setValueAtTime(880,e),n.frequency.setValueAtTime(1100,e+.08),s.gain.setValueAtTime(.28,e),s.gain.exponentialRampToValueAtTime(.001,e+.22),t.connect(s),n.connect(s),s.connect(this.compressor),t.start(e),t.stop(e+.24),n.start(e),n.stop(e+.24)}playMissileLaunch(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor;if(this.noiseBuffer){const a=this.ctx.createBufferSource();a.buffer=this.noiseBuffer;const c=this.ctx.createBiquadFilter();c.type="bandpass",c.frequency.setValueAtTime(800,n),c.frequency.exponentialRampToValueAtTime(2400,n+.25),c.Q.setValueAtTime(2,n);const l=this.ctx.createGain();l.gain.setValueAtTime(.45,n),l.gain.exponentialRampToValueAtTime(.001,n+.35),a.connect(c),c.connect(l),l.connect(s),a.start(n),a.stop(n+.36)}const r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sawtooth",r.frequency.setValueAtTime(220,n),r.frequency.exponentialRampToValueAtTime(980,n+.28),o.gain.setValueAtTime(.35,n),o.gain.exponentialRampToValueAtTime(.001,n+.3),r.connect(o),o.connect(s),r.start(n),r.stop(n+.32)}playLaserShot(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime;if(this._lastLaserAudioTime&&n-this._lastLaserAudioTime<.07)return;this._lastLaserAudioTime=n;const s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type="sawtooth",r.frequency.setValueAtTime(e?1480:1150,n),r.frequency.exponentialRampToValueAtTime(320,n+.09),a.type="bandpass",a.frequency.setValueAtTime(2900,n),a.frequency.exponentialRampToValueAtTime(550,n+.09),a.Q.setValueAtTime(3.2,n);const c=e?.32:.2;o.gain.setValueAtTime(.001,n),o.gain.linearRampToValueAtTime(c,n+.012),o.gain.exponentialRampToValueAtTime(.001,n+.095),r.connect(a),a.connect(o),o.connect(s),r.start(n),r.stop(n+.1)}playDecoyDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sine",t.frequency.setValueAtTime(440,e),t.frequency.linearRampToValueAtTime(1100,e+.15),t.frequency.linearRampToValueAtTime(880,e+.35),n.gain.setValueAtTime(.28,e),n.gain.exponentialRampToValueAtTime(.001,e+.4),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.42)}playCannonShot(e=!0,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain(),a=this.ctx.createBiquadFilter();r.type=e?"sawtooth":"sine";const c=e?920:680,l=e?110:90;r.frequency.setValueAtTime(c,n),r.frequency.exponentialRampToValueAtTime(l,n+.08),a.type="lowpass",a.frequency.setValueAtTime(2800,n),a.frequency.exponentialRampToValueAtTime(400,n+.09);const h=e?.36:.22;o.gain.setValueAtTime(h,n),o.gain.exponentialRampToValueAtTime(.001,n+.095),r.connect(a),a.connect(o),o.connect(s),r.start(n),r.stop(n+.1)}playMineDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(60,e+.12),n.gain.setValueAtTime(.35,e),n.gain.exponentialRampToValueAtTime(.001,e+.13),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.14);const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(1250,e+.06),s.frequency.setValueAtTime(1750,e+.14),r.gain.setValueAtTime(1e-4,e),r.gain.setValueAtTime(.22,e+.06),r.gain.setValueAtTime(.25,e+.14),r.gain.exponentialRampToValueAtTime(.001,e+.28),s.connect(r),r.connect(this.compressor),s.start(e+.05),s.stop(e+.3)}playExplosion(e=1,t=null){if(!this.ctx||this.isMuted)return;this.resume();const n=this.ctx.currentTime,s=this.createPanner(t)||this.compressor,r=this.ctx.createOscillator(),o=this.ctx.createGain();r.type="sine",r.frequency.setValueAtTime(140,n),r.frequency.exponentialRampToValueAtTime(28,n+.7*e);const a=Math.min(.7,.45*e);if(o.gain.setValueAtTime(a,n),o.gain.exponentialRampToValueAtTime(.001,n+.75*e),r.connect(o),o.connect(s),r.start(n),r.stop(n+.8*e),this.noiseBuffer){const c=this.ctx.createBufferSource();c.buffer=this.noiseBuffer;const l=this.ctx.createBiquadFilter();l.type="lowpass",l.frequency.setValueAtTime(900,n),l.frequency.exponentialRampToValueAtTime(80,n+.6*e);const h=this.ctx.createGain();h.gain.setValueAtTime(.5*e,n),h.gain.exponentialRampToValueAtTime(.001,n+.65*e),c.connect(l),l.connect(h),h.connect(s),c.start(n),c.stop(n+.7*e)}}playDamageHit(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(70,e+.16),n.gain.setValueAtTime(.42,e),n.gain.exponentialRampToValueAtTime(.001,e+.18),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.2)}playScoreChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(880,e),t.frequency.setValueAtTime(1320,e+.08),n.gain.setValueAtTime(.25,e),n.gain.exponentialRampToValueAtTime(.001,e+.35),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.36)}playStrafeBurst(){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer;const n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1600,e),n.Q.setValueAtTime(2,e);const s=this.ctx.createGain();s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(n),n.connect(s),s.connect(this.compressor),t.start(e),t.stop(e+.13)}playEngagementBeacon(e=null){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,n=this.createPanner(e)||this.compressor,s=this.ctx.createOscillator(),r=this.ctx.createGain(),o=this.ctx.createBiquadFilter();s.type="sine",s.frequency.setValueAtTime(1480,t),s.frequency.exponentialRampToValueAtTime(520,t+.45),o.type="bandpass",o.frequency.setValueAtTime(1200,t),o.Q.setValueAtTime(4,t),r.gain.setValueAtTime(1e-4,t),r.gain.linearRampToValueAtTime(.38,t+.04),r.gain.exponentialRampToValueAtTime(.001,t+.95),s.connect(o),o.connect(r),r.connect(n),s.start(t),s.stop(t+1)}playMeteorFlyby(e=null){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const t=this.ctx.currentTime,n=this.createPanner(e)||this.compressor,s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(180,t),r.frequency.exponentialRampToValueAtTime(680,t+.35),r.frequency.exponentialRampToValueAtTime(120,t+1.1),r.Q.setValueAtTime(1.8,t);const o=this.ctx.createGain();o.gain.setValueAtTime(.001,t),o.gain.linearRampToValueAtTime(.55,t+.35),o.gain.exponentialRampToValueAtTime(.001,t+1.15),s.connect(r),r.connect(o),o.connect(n),s.start(t),s.stop(t+1.2)}playBoost(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),n=this.ctx.createGain();if(t.type="sine",t.frequency.setValueAtTime(220,e),t.frequency.exponentialRampToValueAtTime(45,e+.28),n.gain.setValueAtTime(.55,e),n.gain.exponentialRampToValueAtTime(.001,e+.3),t.connect(n),n.connect(this.compressor),t.start(e),t.stop(e+.32),this.noiseBuffer){const s=this.ctx.createBufferSource();s.buffer=this.noiseBuffer;const r=this.ctx.createBiquadFilter();r.type="bandpass",r.frequency.setValueAtTime(320,e),r.frequency.exponentialRampToValueAtTime(1400,e+.12),r.frequency.exponentialRampToValueAtTime(250,e+.35),r.Q.setValueAtTime(2.2,e);const o=this.ctx.createGain();o.gain.setValueAtTime(.48,e),o.gain.exponentialRampToValueAtTime(.001,e+.36),s.connect(r),r.connect(o),o.connect(this.compressor),s.start(e),s.stop(e+.38)}}}const ot=new l_;function h_(){if(typeof document>"u")return null;try{const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d");if(!e)return null;const t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255, 255, 255, 1)"),t.addColorStop(.25,"rgba(235, 245, 255, 0.85)"),t.addColorStop(.55,"rgba(160, 205, 255, 0.35)"),t.addColorStop(.85,"rgba(100, 150, 255, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const n=new Zr(i);return n.generateMipmaps=!0,n}catch{return null}}function u_(){if(typeof document>"u")return null;try{const i=document.createElement("canvas");i.width=256,i.height=256;const e=i.getContext("2d");if(!e)return null;const t=e.createImageData(256,256),n=t.data;for(let r=0;r<256;r++)for(let o=0;o<256;o++){const a=(r*256+o)*4,c=o/256,l=r/256,h=Math.sin(c*32)*Math.cos(l*32)*.35+Math.sin(c*64+l*48)*.25+Math.sin(c*128-l*96)*.15,d=(Math.random()-.5)*.25,p=Math.floor(Math.min(255,Math.max(0,(h+d+.5)*255)));n[a]=p,n[a+1]=p,n[a+2]=p,n[a+3]=255}e.putImageData(t,0,0);const s=new Zr(i);return s.wrapS=Os,s.wrapT=Os,s.repeat.set(4,4),s}catch{return null}}class ch{constructor(e,t=42){this.scene=e,this.mapSeed=t,this.asteroids=[],this.asteroidGroup=new Et,this.debrisList=[],this.init()}init(){this.setupLighting(),this.createStarfield(),this.createAsteroidField()}setupLighting(){const e=new i_(5601177,1713203,1.8);this.scene.add(e);const t=new o_(3820380,1.4);this.scene.add(t);const n=new oh(16774890,3.4);n.position.set(3500,2500,3e3),this.scene.add(n);const s=new oh(46335,2);s.position.set(-3e3,-2e3,-3e3),this.scene.add(s);const r=new $o(16772829,3.5,2500);r.position.set(0,120,3200),this.scene.add(r),this.combatFlashLight=new $o(16737792,0,160),this.combatFlashLight.position.set(0,0,0),this.scene.add(this.combatFlashLight),this.meteorLight=new $o(16724736,0,450),this.meteorLight.position.set(0,0,0),this.scene.add(this.meteorLight)}createStarfield(){const t=new wt,n=new Float32Array(500*3),s=new Float32Array(500*3),r=ah("stars-fixed-celestial");for(let l=0;l<500;l++){const h=l*3,d=r(),p=r(),m=d*2*Math.PI,y=Math.acos(2*p-1),g=7500+r()*1e3;n[h]=g*Math.sin(y)*Math.cos(m),n[h+1]=g*Math.sin(y)*Math.sin(m),n[h+2]=g*Math.cos(y);const f=r();f<.25?(s[h]=.65,s[h+1]=.88,s[h+2]=1):f<.45?(s[h]=1,s[h+1]=.88,s[h+2]=.65):f<.6?(s[h]=.92,s[h+1]=.65,s[h+2]=1):(s[h]=1,s[h+1]=1,s[h+2]=1)}t.setAttribute("position",new yt(n,3)),t.setAttribute("color",new yt(s,3));const o=h_(),a=new qs({size:2.8,map:o||void 0,vertexColors:!0,transparent:!0,opacity:.9,depthWrite:!1,blending:dt,sizeAttenuation:!1,fog:!1}),c=new Kr(t,a);this.scene.add(c)}createAsteroidField(){const e=ah(this.mapSeed),n=100+1,s=u_(),r=new It({color:10180674,roughness:.88,metalness:.16,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Rt}),o=new It({color:3685958,roughness:.92,metalness:.1,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Rt}),a=new It({color:6187125,roughness:.86,metalness:.14,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Rt}),c=new It({color:8293530,roughness:.8,metalness:.26,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Rt}),l=[r,o,a,c];for(let h=0;h<n;h++){let d,p,m=1/0,y=!1;h===0?(d=2800,p=4,m=1/0,y=!0):h%3===0?(d=40+e()*50,p=3,m=1/0):(d=15+e()*20,p=3,m=20);let g=a_(new xi(d,p));const f=g.attributes.position,u=new N,v=y?.96+e()*.08:.82+e()*.36,x=y?.94+e()*.12:.8+e()*.4,_=y?.96+e()*.08:.82+e()*.36,A=e()*Math.PI*2,T=e()*Math.PI*2,R=e()*Math.PI*2,P=Math.floor(y?12+e()*6:4+e()*3),w=[];for(let O=0;O<P;O++){const U=e()*Math.PI*2,B=Math.acos(2*e()-1);w.push({dir:new N(Math.sin(B)*Math.cos(U),Math.sin(B)*Math.sin(U),Math.cos(B)),depth:y?.08+e()*.08:.16+e()*.16,radiusCos:y?.88+e()*.08:.78+e()*.14})}for(let O=0;O<f.count;O++){u.fromBufferAttribute(f,O);const U=u.clone().normalize(),B=.08*Math.sin(U.x*3.2+A)*Math.cos(U.y*3.2+T)+.06*Math.sin(U.z*3.8+R),Z=.04*Math.sin(U.x*6.5-U.z*5.2)*Math.cos(U.y*6.1),le=.02*Math.sin(U.y*12+U.x*10.5)*Math.sin(U.z*11.8),fe=B+Z+le;let X=0;for(let oe=0;oe<w.length;oe++){const re=w[oe],Me=U.dot(re.dir);if(Me>re.radiusCos){const Pe=(Me-re.radiusCos)/(1-re.radiusCos);X-=re.depth*Math.cos(Pe*(Math.PI/2))}else if(Me>re.radiusCos-.1){const Pe=(Me-(re.radiusCos-.1))/.1;X+=.25*re.depth*Math.sin(Pe*Math.PI)}}const Q=Math.max(.65,1+fe+X);u.copy(U).multiplyScalar(d*Q),u.x*=v,u.y*=x,u.z*=_,f.setXYZ(O,u.x,u.y,u.z)}g.computeVertexNormals();const M=l[Math.floor(e()*l.length)],D=new we(g,M);let G=0,S=0,L=0,F=new N(0,0,0),I=new N(0,0,0);if(y)G=0,S=0,L=0;else{let U=!1,B=0;const Z=200;for(;!U&&B<Z;){B++;const X=3300+e()*2200,Q=e()*Math.PI*2;G=Math.cos(Q)*X,S=(e()-.5)*450,L=Math.sin(Q)*X;let oe=!1;for(let re=0;re<this.asteroids.length;re++){const Me=this.asteroids[re];if(Math.hypot(G-Me.position.x,S-Me.position.y,L-Me.position.z)<d+Me.radius+20){oe=!0;break}}oe||(U=!0)}const le=Math.atan2(L,G),fe=16+e()*14;F.set(-Math.sin(le)*fe,(e()-.5)*1.5,Math.cos(le)*fe),I.set((e()-.5)*.05,(e()-.5)*.05,(e()-.5)*.05)}D.position.set(G,S,L),D.rotation.set(e()*Math.PI,e()*Math.PI,e()*Math.PI),this.asteroidGroup.add(D);const z=4/3*Math.PI*Math.pow(d,3)*.001;this.asteroids.push({mesh:D,radius:d,mass:z,hp:m,maxHp:m,isMegaAsteroid:y,carvings:[],position:D.position,velocity:F,rotationSpeed:I,boundingSphere:new Ws(D.position,d*1.05)})}this.scene.add(this.asteroidGroup)}triggerCombatFlash(e,t=16737792,n=4){this.combatFlashLight&&(this.combatFlashLight.position.copy(e),this.combatFlashLight.color.setHex(t),this.combatFlashLight.intensity=n)}update(e,t,n){for(let r=this.debrisList.length-1;r>=0;r--){const o=this.debrisList[r];if(o.life-=e,o.life<=0){this.scene.remove(o.mesh),this.debrisList.splice(r,1);continue}o.mesh.position.addScaledVector(o.vel,e),o.mesh.rotation.x+=o.rot.x*e,o.mesh.rotation.y+=o.rot.y*e;const a=o.life/o.maxLife;o.mesh.scale.set(a,a,a)}this.combatFlashLight&&this.combatFlashLight.intensity>0&&(this.combatFlashLight.intensity=Math.max(0,this.combatFlashLight.intensity-e*6));const s=this.asteroids.length;for(let r=0;r<s;r++){const o=this.asteroids[r];if(o.isMegaAsteroid){o.position.set(0,0,0),o.velocity.set(0,0,0),o.boundingSphere.center.set(0,0,0);continue}o.position.addScaledVector(o.velocity,e),o.boundingSphere.center.copy(o.position),o.mesh.rotation.x+=o.rotationSpeed.x*e,o.mesh.rotation.y+=o.rotationSpeed.y*e,o.mesh.rotation.z+=o.rotationSpeed.z*e;const a=Math.hypot(o.position.x,o.position.z);if(a>10){const c=o.position.x/a,l=o.position.z/a,h=Math.hypot(o.velocity.x,o.velocity.z),d=h*h/a;if(o.velocity.x-=c*d*e,o.velocity.z-=l*d*e,o.velocity.y-=o.position.y*.08*e,a<3300){const p=(3300-a)*.12*e;o.velocity.x+=c*p,o.velocity.z+=l*p}else if(a>5500){const p=(a-5500)*.12*e;o.velocity.x-=c*p,o.velocity.z-=l*p}}}for(let r=0;r<3;r++)for(let o=0;o<s;o++){const a=this.asteroids[o];if(!a)continue;const c=a.position;for(let l=o+1;l<s;l++){const h=this.asteroids[l];if(!h)continue;const d=h.position,p=c.x-d.x,m=c.y-d.y,y=c.z-d.z,g=p*p+m*m+y*y,f=a.radius+h.radius;if(g<f*f&&g>1e-4){const u=Math.sqrt(g),v=p/u,x=m/u,_=y/u,A=f-u,T=Math.min(A*.55,20);if(a.isMegaAsteroid){if(d.x-=v*T,d.y-=x*T,d.z-=_*T,h.boundingSphere&&h.boundingSphere.center.copy(d),r===0){const R=h.velocity.x*v+h.velocity.y*x+h.velocity.z*_;R>0&&(h.velocity.x-=(1+.5)*R*v,h.velocity.y-=(1+.5)*R*x,h.velocity.z-=(1+.5)*R*_)}}else if(h.isMegaAsteroid){if(c.x+=v*T,c.y+=x*T,c.z+=_*T,a.boundingSphere&&a.boundingSphere.center.copy(c),r===0){const R=a.velocity.x*-v+a.velocity.y*-x+a.velocity.z*-_;R>0&&(a.velocity.x-=(1+.5)*R*-v,a.velocity.y-=(1+.5)*R*-x,a.velocity.z-=(1+.5)*R*-_)}}else{const R=a.mass+h.mass,P=h.mass/R,w=a.mass/R;if(c.x+=v*T*P,c.y+=x*T*P,c.z+=_*T*P,d.x-=v*T*w,d.y-=x*T*w,d.z-=_*T*w,a.boundingSphere&&a.boundingSphere.center.copy(c),h.boundingSphere&&h.boundingSphere.center.copy(d),r===0){const M=a.velocity.x-h.velocity.x,D=a.velocity.y-h.velocity.y,G=a.velocity.z-h.velocity.z,S=M*v+D*x+G*_;if(S<0){const L=-1.55*S/(1/a.mass+1/h.mass),F=Math.min(25,L/a.mass),I=Math.min(25,L/h.mass);a.velocity.x+=F*v,a.velocity.y+=F*x,a.velocity.z+=F*_,h.velocity.x-=I*v,h.velocity.y-=I*x,h.velocity.z-=I*_}}}a.velocity.length()>40&&a.velocity.setLength(40),h.velocity.length()>40&&h.velocity.setLength(40)}}}}checkCollision(e,t=2.5){for(let n=0;n<this.asteroids.length;n++){const s=this.asteroids[n],r=e.distanceToSquared(s.position),o=s.radius+t;if(r<o*o)return s}return null}checkRayBlocked(e,t){const n=t.clone().sub(e),s=n.length();if(s<.001)return!1;const r=n.clone().divideScalar(s);for(let o=0;o<this.asteroids.length;o++){const a=this.asteroids[o],c=a.position.clone().sub(e),l=c.dot(r);if(l>0&&l<s){const h=c.lengthSq()-l*l,d=a.radius*.95;if(h<d*d){if(a.carvings&&a.carvings.length>0&&a.mesh){a.mesh.matrixWorld&&a.mesh.updateMatrixWorld(!0);const p=a.mesh.matrixWorld?a.mesh.matrixWorld.clone().invert():new it().copy(a.mesh.matrix).invert(),m=e.clone().applyMatrix4(p),y=r.clone().transformDirection(p).normalize();let g=!1;for(let f=0;f<a.carvings.length;f++){const u=a.carvings[f];if(u.isThroughTunnel){const v=u.localHit.clone().sub(m),x=v.dot(y);if(v.clone().addScaledVector(y,-x).length()<u.carveRadius*.95){g=!0;break}}}if(g)continue}return!0}}}return!1}checkRayCollision(e,t,n=750){let s=null,r=n;for(let o=0;o<this.asteroids.length;o++){const a=this.asteroids[o],c=a.position.clone().sub(e),l=c.dot(t),h=a.radius,p=c.length()<h;if(l<0&&!p||l-h>r)continue;const m=c.lengthSq()-l*l;if(m>h*h)continue;const y=Math.sqrt(Math.max(0,h*h-m));let g=l-y;if(g<0&&(g=l+y),g>0&&g<r){let f=e.clone().addScaledVector(t,g),u=!1,v=g;if(a.carvings&&a.carvings.length>0&&a.mesh){a.mesh.matrixWorld&&a.mesh.updateMatrixWorld(!0);const x=a.mesh.matrixWorld?a.mesh.matrixWorld.clone().invert():new it().copy(a.mesh.matrix).invert(),_=f.clone().applyMatrix4(x);for(let A=0;A<a.carvings.length;A++){const T=a.carvings[A],R=_.distanceTo(T.localHit);let P=R;if(T.localDir&&T.carveDepth){const w=_.clone().sub(T.localHit),M=w.dot(T.localDir);M>=-15&&M<=T.carveDepth+15&&(P=w.clone().addScaledVector(T.localDir,-M).length())}(R<T.carveRadius*.95||P<T.carveRadius*.95)&&(u=!0,T.isThroughTunnel?v=Math.max(v,l+y+5):v=Math.max(v,g+(T.carveDepth||36)*.85))}}if(u){if(v>=l+y)continue;g=v,f=e.clone().addScaledVector(t,g)}g>0&&g<r&&(r=g,s={asteroid:a,distance:g,hitPoint:f})}}return s}resolveShipCollision(e,t,n=2.8,s=1200){for(let r=0;r<this.asteroids.length;r++){const o=this.asteroids[r],a=e.distanceTo(o.position),c=o.radius+n;if(a<c){if(o.carvings&&o.carvings.length>0&&o.mesh){o.mesh.matrixWorld&&o.mesh.updateMatrixWorld(!0);const p=o.mesh.matrixWorld?o.mesh.matrixWorld.clone().invert():new it().copy(o.mesh.matrix).invert(),m=e.clone().applyMatrix4(p);let y=!1;for(let g=0;g<o.carvings.length;g++){const f=o.carvings[g],u=m.distanceTo(f.cavityCenter||f.localHit);if(f.isThroughTunnel&&f.localDir&&f.carveDepth){const x=m.clone().sub(f.localHit).dot(f.localDir);if(x>=-20&&x<=f.carveDepth+20){const _=f.localHit.clone().addScaledVector(f.localDir,x);if(m.distanceTo(_)<f.carveRadius*.95){y=!0;break}}}else if(f.localDir&&f.carveDepth){const v=f.carveDepth,_=m.clone().sub(f.localHit).dot(f.localDir),A=Math.max(0,Math.min(1,_/Math.max(.1,v))),T=f.localHit.clone().addScaledVector(f.localDir,A*v),R=m.distanceTo(T);if(u<f.carveRadius*1.05||R<f.carveRadius*.95){y=!0;break}}else if(u<f.carveRadius*1.05){y=!0;break}}if(y)continue}const l=e.clone().sub(o.position);l.lengthSq()<1e-4?l.set(0,1,0):l.normalize(),e.copy(o.position).addScaledVector(l,c+.3);const d=t.clone().sub(o.velocity).dot(l);if(d<0){const p=-1.85*d*s;t.addScaledVector(l,p/s),o.isMegaAsteroid||o.velocity.addScaledVector(l,-(p/o.mass));const m=Math.abs(d),y=Math.round(Math.min(45,Math.max(10,m*.75)));return{asteroid:o,normal:l,impactDamage:y,impactSpeed:m}}}}return null}spawnRockDebris(e,t,n=8){const s=new $s(.85,0),r=new It({color:5923437,roughness:.9,metalness:.1});for(let o=0;o<n;o++){if(this.debrisList.length>60){const d=this.debrisList.shift();this.scene.remove(d.mesh)}const a=new we(s,r);a.position.copy(e),this.scene.add(a);const c=new N((Math.random()-.5)*35,(Math.random()-.5)*35,(Math.random()-.5)*35),l=t.clone().multiplyScalar(-18).add(c),h=.5+Math.random()*.4;this.debrisList.push({mesh:a,vel:l,rot:new N(Math.random()*8,Math.random()*8,Math.random()*8),life:h,maxLife:h})}}removeAsteroid(e){if(!e)return!1;const t=this.asteroids.indexOf(e);return t!==-1&&this.asteroids.splice(t,1),e.mesh&&(e.mesh.parent?e.mesh.parent.remove(e.mesh):(this.asteroidGroup.remove(e.mesh),this.scene.remove(e.mesh)),e.mesh.geometry&&e.mesh.geometry.dispose()),!0}damageAsteroid(e,t=5,n,s,r=32,o=36){if(!e)return{destroyed:!1};if(e.hp!==void 0&&e.hp!==1/0&&(e.hp-=t,e.hp<=0)){const a=n?n.clone():e.position.clone(),c=s?s.clone():new N(0,0,1);return this.spawnRockDebris(a,c,28),ot&&typeof ot.playExplosion=="function"&&ot.playExplosion(1.2,a),this.removeAsteroid(e),{destroyed:!0,asteroid:e}}return n&&s&&this.carveAsteroid(e,n,s,r,o),{destroyed:!1,asteroid:e,hp:e.hp}}carveAsteroid(e,t,n,s=32,r=36){if(!e||!e.mesh)return;const o=e.mesh.geometry,a=o.attributes.position;if(!a)return;e.mesh.matrixWorld&&e.mesh.updateMatrixWorld(!0);const c=e.mesh.matrixWorld?e.mesh.matrixWorld.clone().invert():new it().copy(e.mesh.matrix).invert(),l=t.clone().applyMatrix4(c),h=n.clone().transformDirection(c).normalize(),d=e.radius>=2500||e.isMegaAsteroid,p=!d&&e.radius>=38,m=p?Math.max(28,Math.min(36,s)):s,y=d?Math.max(120,Math.min(180,r*3.5)):p?e.radius*2.5:r,g=new N;let f=0;if(p)for(let v=0;v<a.count;v++){g.fromBufferAttribute(a,v);const _=g.clone().sub(l).dot(h);if(_>=-20&&_<=e.radius*2.6){const A=l.clone().addScaledVector(h,_),T=g.clone().sub(A),R=T.length();if(R<m){let P;R>.001?P=T.normalize():(P=new N(-h.y,h.x,0),P.lengthSq()<.001&&P.set(0,-h.z,h.y),P.normalize());const w=A.addScaledVector(P,m+1.5);a.setXYZ(v,w.x,w.y,w.z),f++}}}else for(let v=0;v<a.count;v++){g.fromBufferAttribute(a,v);const x=g.distanceTo(l);if(x<m){const _=1-Math.pow(x/m,1.4),A=y*_;g.addScaledVector(h,A),a.setXYZ(v,g.x,g.y,g.z),f++}}if(f===0){let v=1/0,x=-1;for(let _=0;_<a.count;_++){g.fromBufferAttribute(a,_);const A=g.distanceTo(l);A<v&&(v=A,x=_)}if(x!==-1&&v<m+80){g.fromBufferAttribute(a,x);const _=g.clone();for(let A=0;A<a.count;A++){g.fromBufferAttribute(a,A);const T=g.distanceTo(_);if(T<m){const R=1-Math.pow(T/m,1.4),P=y*R;g.addScaledVector(h,P),a.setXYZ(A,g.x,g.y,g.z),f++}}}}f>0&&(a.needsUpdate=!0,o.computeVertexNormals(),o.computeBoundingSphere()),e.carvings=e.carvings||[],e.carvings.push({localHit:l.clone(),localDir:h.clone(),cavityCenter:l.clone().addScaledVector(h,y*.5),carveRadius:m,carveDepth:y,isThroughTunnel:p,timestamp:Date.now()});const u=m>35?16:8;this.spawnRockDebris(t,n,u)}cleanup(){this.destroy()}destroy(){var e,t;for(const n of this.debrisList)n.mesh&&(this.scene.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose());this.debrisList=[];for(const n of this.asteroids)n.mesh&&(n.mesh.parent&&n.mesh.parent.remove(n.mesh),n.mesh.geometry&&n.mesh.geometry.dispose());this.asteroids=[],this.asteroidGroup&&(this.scene.remove(this.asteroidGroup),(t=(e=this.asteroidGroup).clear)==null||t.call(e)),this.combatFlashLight&&this.scene.remove(this.combatFlashLight),this.meteorLight&&this.scene.remove(this.meteorLight)}}class d_{constructor(e){this.camera=e,this.group=new Et,this.camera.add(this.group),this.targetOffset=new N,this.currentOffset=new N,this.targetRotation=new Qt,this.currentRotation=new Qt,this.shieldGlassMat=null,this.damageFlashTimer=0,this.boostKickZ=0,this.accentMaterials=[],this.consoleWarningMat=null,this.createCockpitModel()}createCockpitModel(){const e=new It({color:1119776,roughness:.35,metalness:.9,flatShading:!0}),t=new It({color:1975344,roughness:.45,metalness:.8,flatShading:!0}),n=new Ke({color:54527});this.accentMaterials.push(n);const s=new Ke({color:16755200});this.accentMaterials.push(s),this.consoleWarningMat=new Ke({color:65416});const r=new gt(.5,.14,.35),o=new we(r,e);o.position.set(0,-.58,-.55),o.rotation.x=.55,this.group.add(o);const a=new gt(.48,.12,.32),c=new we(a,e);c.position.set(-.52,-.59,-.52),c.rotation.set(.5,.28,-.12),this.group.add(c);const l=new gt(.48,.12,.32),h=new we(l,e);h.position.set(.52,-.59,-.52),h.rotation.set(.5,-.28,.12),this.group.add(h);const d=new Xs(.18,.08),p=new we(d,new Ke({color:6180}));p.position.set(-.5,-.53,-.47),p.rotation.set(.5,.28,-.12),this.group.add(p);const m=new we(d,new Ke({color:2102272}));m.position.set(.5,-.53,-.47),m.rotation.set(.5,-.28,.12),this.group.add(m);const y=new Xt(.003,.003,1.4,6);y.rotateZ(Math.PI/2);const g=new we(y,n);g.position.set(0,-.54,-.48),g.rotation.x=.5,this.group.add(g);const f=new gt(.024,1.15,.035),u=new we(f,e);u.position.set(-.92,.16,-.48),u.rotation.set(-.12,.12,.52),this.group.add(u);const v=u.clone();v.position.set(.92,.16,-.48),v.rotation.set(-.12,-.12,-.52),this.group.add(v);const x=new gt(1.6,.03,.14),_=new we(x,e);_.position.set(0,.72,-.52),_.rotation.x=-.22,this.group.add(_);const A=new Jn(.82,16,12,0,Math.PI*2,0,Math.PI*.46);this.shieldGlassMat=new Ke({color:57855,transparent:!0,opacity:.025,side:Ut,blending:dt,depthWrite:!1});const T=new we(A,this.shieldGlassMat);T.position.set(0,0,.08),this.group.add(T),this.createCompactCannon(-.72,-.44,-.65,e,t,n),this.createCompactCannon(.72,-.44,-.65,e,t,n)}createCompactCannon(e,t,n,s,r,o){const a=new Et;a.position.set(e,t,n);const c=new Xt(.018,.022,.55,8);c.rotateX(Math.PI/2);const l=new we(c,r);l.position.set(0,0,-.22),a.add(l);const h=new Mi(.024,.004,6,12),d=new we(h,o);d.position.set(0,0,-.48),a.add(d),this.group.add(a)}triggerDamageFlash(){this.damageFlashTimer=.38}triggerBoostFlash(){this.boostKickZ=-.06,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(65535),this.shieldGlassMat.opacity=.2)}update(e,t,n){this.boostKickZ||(this.boostKickZ=0),this.boostKickZ+=(0-this.boostKickZ)*e*9;const s=(t.thrust?.016:t.brake?-.016:0)+this.boostKickZ,r=t.strafe*.02,o=t.pitch*.012,a=t.roll*.018;this.targetOffset.set(-r,-o,s),this.targetRotation.set(-o*1.4,-r*1.1,-a),this.currentOffset.lerp(this.targetOffset,e*10),this.currentRotation.x+=(this.targetRotation.x-this.currentRotation.x)*e*10,this.currentRotation.y+=(this.targetRotation.y-this.currentRotation.y)*e*10,this.currentRotation.z+=(this.targetRotation.z-this.currentRotation.z)*e*10,this.group.position.copy(this.currentOffset),this.group.rotation.copy(this.currentRotation),this.damageFlashTimer>0?(this.damageFlashTimer-=e,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(16720452),this.shieldGlassMat.opacity=Math.max(.03,this.damageFlashTimer*.9))):this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(57855),this.shieldGlassMat.opacity=.025)}}class f_{constructor(e,t){this.camera=e,this.spaceEnv=t,this.position=new N(0,80,3200),this.velocity=new N(0,0,0),this.quaternion=new Zt,this.maxSpeed=90,this.forwardAccel=45,this.decelRate=this.maxSpeed/2*3,this.strafeAccel=40,this.maxStrafeSpeed=35,this.boostCooldown=2,this.boostCooldownTimer=0,this.lastThrustTapTime=0,this.boostImpulse=180,this.pitchSpeed=1.6,this.yawSpeed=1.6,this.rollSpeed=2,this.maxHp=100,this.hp=100,this.maxShield=100,this.shield=100,this.isShieldBroken=!1,this.shieldRechargeDelay=2,this.shieldRechargeTimer=0,this.shieldRechargeRate=100/15,this.mass=1200,this.isInvisible=!1,this.invisibilityTimer=0,this.hasHologramDecoy=!1,this.storedPowerUp=null,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.asteroidImpactDebounceTimer=0,this.shipCollisionDebounceTimer=0,this.score=0,this.kills=0,this.deaths=0,this.input={thrust:!1,brake:!1,strafeLeft:!1,strafeRight:!1,pitchUp:!1,pitchDown:!1,yawLeft:!1,yawRight:!1,rollLeft:!1,rollRight:!1,analogPitch:0,analogYaw:0,analogRoll:0},this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}resetSpawn(){this.position.set(0,80,3200),this.velocity.set(0,0,0),this.quaternion.set(0,0,0,1),this.hp=this.maxHp,this.shield=this.maxShield,this.isShieldBroken=!1,this.shieldRechargeTimer=0,this.boostCooldownTimer=0,this.lastThrustTapTime=0,this.isInvisible=!1,this.invisibilityTimer=0,this.hasHologramDecoy=!1,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.asteroidImpactDebounceTimer=0,this.shipCollisionDebounceTimer=0,this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}takeDamage(e,t="generic",n=!1){if(typeof t=="boolean"&&(n=t,t="generic"),this.isDead||!n&&this.invulnerableTimer>0)return!1;this.shieldRechargeTimer=this.shieldRechargeDelay;let s=e,r=e;if(t==="laser"?(s=e*2.4,r=e*.35):(t==="cannon"||t==="missile")&&(s=e*.35,r=e*2.2),this.shield>0){const o=Math.min(this.shield,s);this.shield-=o,this.shield<=0&&(this.shield=0,this.isShieldBroken=!0);const a=1-o/(s||1);a>.01&&(this.hp=Math.max(0,this.hp-r*a))}else this.hp=Math.max(0,this.hp-r);return this.hp<=0?(this.isDead=!0,this.deaths++,this.respawnTimer=3,!0):!1}recordKill(){this.kills++,this.score+=100}triggerThrustPress(e=performance.now()){const t=e-this.lastThrustTapTime;return this.lastThrustTapTime=e,t>=40&&t<=380&&this.boostCooldownTimer<=0&&!this.isDead?this.activateBoost():!1}useSpecialPowerUp(e){if(!this.storedPowerUp||this.isDead)return null;const t=this.storedPowerUp;return this.storedPowerUp=null,t.type==="shield_repair"?(this.shield=this.maxShield,this.isShieldBroken=!1,{success:!0,message:"🛡️ SHIELD REPAIRED: 100%"}):t.type==="invisibility"?(this.isInvisible=!0,this.invisibilityTimer=60,{success:!0,message:"👁️ CLOAK ACTIVATED (60s)"}):t.type==="hologram_clone"?(e&&e.weaponsSystem&&e.weaponsSystem.deployDecoyClone(this),{success:!0,message:"👥 HOLOGRAM CLONE LAUNCHED"}):null}breakInvisibility(){this.isInvisible=!1,this.invisibilityTimer=0}activateBoost(){this.boostCooldownTimer=this.boostCooldown;const e=this.getForwardVector();this.velocity.addScaledVector(e,this.boostImpulse);const t=this.maxSpeed*3;return this.velocity.length()>t&&this.velocity.setLength(t),!0}applyImpulse(e){this.velocity.add(e),this.velocity.length()>this.maxSpeed*1.35&&this.velocity.setLength(this.maxSpeed*1.35)}update(e){if(this.invulnerableTimer>0&&(this.invulnerableTimer=Math.max(0,this.invulnerableTimer-e)),this.asteroidImpactDebounceTimer>0&&(this.asteroidImpactDebounceTimer=Math.max(0,this.asteroidImpactDebounceTimer-e)),this.shipCollisionDebounceTimer>0&&(this.shipCollisionDebounceTimer=Math.max(0,this.shipCollisionDebounceTimer-e)),this.boostCooldownTimer>0&&(this.boostCooldownTimer=Math.max(0,this.boostCooldownTimer-e)),this.invisibilityTimer>0&&(this.invisibilityTimer=Math.max(0,this.invisibilityTimer-e),this.invisibilityTimer<=0&&(this.isInvisible=!1)),this.isDead){this.respawnTimer-=e,this.respawnTimer<=0&&this.resetSpawn();return}!this.isShieldBroken&&this.shield<this.maxShield&&(this.shieldRechargeTimer>0?this.shieldRechargeTimer-=e:this.shield=Math.min(this.maxShield,this.shield+this.shieldRechargeRate*e)),(isNaN(this.position.x)||isNaN(this.position.y)||isNaN(this.position.z))&&(this.position.set(0,80,3200),this.velocity.set(0,0,0)),(isNaN(this.velocity.x)||isNaN(this.velocity.y)||isNaN(this.velocity.z))&&this.velocity.set(0,0,0),(isNaN(this.quaternion.x)||isNaN(this.quaternion.w))&&this.quaternion.set(0,0,0,1),this.handleRotation(e),this.handleThrustAndMovement(e),this.handleAsteroidCollisions(),this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}handleRotation(e){let t=0;this.input.pitchUp&&(t+=1),this.input.pitchDown&&(t-=1),t+=this.input.analogPitch,t=Yo(t,-1,1);let n=0;this.input.yawLeft&&(n+=1),this.input.yawRight&&(n-=1),n+=this.input.analogYaw,n=Yo(n,-1,1);let s=0;this.input.rollLeft&&(s+=1),this.input.rollRight&&(s-=1),s+=this.input.analogRoll,s=Yo(s,-1,1);const r=new N(1,0,0),o=new N(0,1,0),a=new N(0,0,1);if(t!==0){const c=new Zt().setFromAxisAngle(r,t*this.pitchSpeed*e);this.quaternion.multiply(c)}if(n!==0){const c=new Zt().setFromAxisAngle(o,n*this.yawSpeed*e);this.quaternion.multiply(c)}if(s!==0){const c=new Zt().setFromAxisAngle(a,s*this.rollSpeed*e);this.quaternion.multiply(c)}this.quaternion.normalize()}handleThrustAndMovement(e){const t=new N(0,0,-1).applyQuaternion(this.quaternion).normalize(),n=new N(1,0,0).applyQuaternion(this.quaternion).normalize();if(this.input.thrust&&(this.velocity.addScaledVector(t,this.forwardAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.input.brake){const o=this.velocity.length();if(o>.001){const a=this.decelRate*e,c=Math.max(0,o-a);c===0?this.velocity.set(0,0,0):this.velocity.setLength(c)}else this.velocity.set(0,0,0)}let s=0;if(this.input.strafeLeft&&(s-=1),this.input.strafeRight&&(s+=1),s!==0&&(this.velocity.addScaledVector(n,s*this.strafeAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.position.addScaledVector(this.velocity,e),this.position.length()>6500){const o=this.position.clone().normalize().multiplyScalar(-30*e);this.velocity.add(o)}}handleAsteroidCollisions(){if(this.spaceEnv&&typeof this.spaceEnv.resolveShipCollision=="function"){const t=this.spaceEnv.resolveShipCollision(this.position,this.velocity,2.8,this.mass);if(t)return this.asteroidImpactDebounceTimer<=0&&(this.takeDamage(t.impactDamage),this.asteroidImpactDebounceTimer=.25),t}else if(this.spaceEnv&&typeof this.spaceEnv.checkCollision=="function"){const t=this.spaceEnv.checkCollision(this.position,2.8);if(t){const n=this.position.clone().sub(t.position);n.lengthSq()<.001?n.set(0,1,0):n.normalize(),this.position.copy(t.position).addScaledVector(n,t.radius+2.8+.4);const s=this.velocity.dot(n);s<0&&this.velocity.subScaledVector(n,1.8*s),this.asteroidImpactDebounceTimer<=0&&(this.takeDamage(15),this.asteroidImpactDebounceTimer=.25)}}}getForwardVector(){return new N(0,0,-1).applyQuaternion(this.quaternion).normalize()}getRightVector(){return new N(1,0,0).applyQuaternion(this.quaternion).normalize()}getSpeed(){return this.velocity.length()}}class p_{constructor(){this.logs=[],this.maxLogs=500,this.engineRef=null,this.startTime=Date.now(),this.webglInfo=null,this.lastFps=0,this.frameCount=0,this.fpsTimer=performance.now(),this.interceptConsole(),this.listenToErrors()}setEngine(e){if(this.engineRef=e,e&&e.renderer)try{const t=e.renderer.getContext(),n=t.getExtension("WEBGL_debug_renderer_info");this.webglInfo={renderer:n?t.getParameter(n.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER),vendor:n?t.getParameter(n.UNMASKED_VENDOR_WEBGL):t.getParameter(t.VENDOR),version:t.getParameter(t.VERSION),shadingLanguageVersion:t.getParameter(t.SHADING_LANGUAGE_VERSION),maxTextureSize:t.getParameter(t.MAX_TEXTURE_SIZE)},this.log("SYS",`WebGL Initialized: ${this.webglInfo.renderer}`)}catch(t){this.log("SYS",`WebGL info inspection error: ${t.message}`)}}interceptConsole(){const e=console.log.bind(console),t=console.warn.bind(console),n=console.error.bind(console);console.log=(...s)=>{this.log("LOG",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),e(...s)},console.warn=(...s)=>{this.log("WARN",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),t(...s)},console.error=(...s)=>{this.log("ERROR",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),n(...s)}}listenToErrors(){window.addEventListener("error",e=>{this.log("UNCAUGHT",`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`)}),window.addEventListener("unhandledrejection",e=>{var t;this.log("REJECTION",`${((t=e.reason)==null?void 0:t.message)||e.reason}`)})}log(e,t){const s=`[${((Date.now()-this.startTime)/1e3).toFixed(2)}s][${e}] ${t}`;this.logs.push(s),this.logs.length>this.maxLogs&&this.logs.shift()}recordFrame(){this.frameCount++;const e=performance.now();e-this.fpsTimer>=1e3&&(this.lastFps=Math.round(this.frameCount*1e3/(e-this.fpsTimer)),this.frameCount=0,this.fpsTimer=e)}generateDiagnosticReport(){var n,s,r,o,a,c,l,h,d,p,m,y;const e=[];if(e.push("================ ROCKETS CLIENT DIAGNOSTICS ================"),e.push(`Timestamp: ${new Date().toISOString()}`),e.push(`User Agent: ${navigator.userAgent}`),e.push(`Screen Resolution: ${window.screen.width}x${window.screen.height} (Pixel Ratio: ${window.devicePixelRatio})`),e.push(`Window Inner Size: ${window.innerWidth}x${window.innerHeight}`),e.push(`Orientation: ${((n=screen.orientation)==null?void 0:n.type)||"unknown"}`),e.push(`Touch Supported: ${"ontouchstart"in window||navigator.maxTouchPoints>0} (Max Points: ${navigator.maxTouchPoints})`),e.push(""),e.push("--- WebGL Environment ---"),this.webglInfo?(e.push(`Renderer: ${this.webglInfo.renderer}`),e.push(`Vendor: ${this.webglInfo.vendor}`),e.push(`WebGL Version: ${this.webglInfo.version}`),e.push(`Max Texture Size: ${this.webglInfo.maxTextureSize}`)):e.push("WebGL Info: Not yet captured or WebGL unavailable"),e.push(""),e.push("--- Engine & Simulation State ---"),this.engineRef){const g=this.engineRef;if(e.push(`Is Engine Running: ${g.isRunning}`),e.push(`Render FPS: ${this.lastFps}`),e.push(`Canvas Size: ${(r=(s=g.renderer)==null?void 0:s.domElement)==null?void 0:r.width}x${(a=(o=g.renderer)==null?void 0:o.domElement)==null?void 0:a.height}`),e.push(`Canvas Container Size: ${(c=g.container)==null?void 0:c.clientWidth}x${(l=g.container)==null?void 0:l.clientHeight}`),e.push(`Scene Children Count: ${((d=(h=g.scene)==null?void 0:h.children)==null?void 0:d.length)||0}`),e.push(`Asteroids Spawned: ${((m=(p=g.spaceEnv)==null?void 0:p.asteroids)==null?void 0:m.length)||0}`),g.playerShip){const f=g.playerShip;e.push(`Ship Position: (${f.position.x.toFixed(2)}, ${f.position.y.toFixed(2)}, ${f.position.z.toFixed(2)})`),e.push(`Ship Velocity: (${f.velocity.x.toFixed(2)}, ${f.velocity.y.toFixed(2)}, ${f.velocity.z.toFixed(2)}) [Speed: ${f.getSpeed().toFixed(1)}]`),e.push(`Ship Quaternion: (${f.quaternion.x.toFixed(3)}, ${f.quaternion.y.toFixed(3)}, ${f.quaternion.z.toFixed(3)}, ${f.quaternion.w.toFixed(3)})`),e.push(`Ship HP: ${f.hp}/${f.maxHp} (isDead: ${f.isDead}, invuln: ${f.invulnerableTimer.toFixed(1)})`),e.push(`Active Inputs: thrust=${f.input.thrust}, brake=${f.input.brake}, strafeL=${f.input.strafeLeft}, strafeR=${f.input.strafeRight}, analogPitch=${f.input.analogPitch.toFixed(2)}, analogYaw=${f.input.analogYaw.toFixed(2)}`)}g.network&&(e.push(`Network Self ID: ${g.network.selfId}`),e.push(`Network Room ID: ${g.network.roomId}`),e.push(`Network isMaster: ${g.network.isMaster}`),e.push(`Connected Peers: ${((y=g.network.peers)==null?void 0:y.size)||0}`))}else e.push("Engine Reference: None (Engine not attached)");e.push(""),e.push("--- Recent Event Stream (Last 50 Logs) ---");const t=this.logs.slice(-50);for(const g of t)e.push(g);return e.push("============================================================"),e.join(`
`)}async copyToClipboard(){const e=this.generateDiagnosticReport();if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(e),!0}catch{}return window.prompt("Copy diagnostic report below (Ctrl+C / Cmd+C):",e),!0}}const lt=new p_;class m_{constructor(e){this.scene=e,this.maxParticles=1200,this.particles=[],this.geom=new wt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new yt(this.positions,3)),this.geom.setAttribute("color",new yt(this.colors,3)),this.material=new qs({size:11.5,vertexColors:!0,transparent:!0,opacity:.95,blending:dt,depthWrite:!1,sizeAttenuation:!0}),this.points=new Kr(this.geom,this.material),this.points.frustumCulled=!1,this.scene.add(this.points)}emit(e,t,n=2){for(let s=0;s<n&&!(this.particles.length>=this.maxParticles);s++){const r=new N((Math.random()-.5)*.55,(Math.random()-.5)*.55,(Math.random()-.5)*.55),o=e.clone().add(r),a=t.clone().multiplyScalar(-20).add(new N((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8)),c=.8+Math.random()*.6;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}update(e){for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.life-=e,s.life<=0){this.particles.splice(n,1);continue}s.pos.addScaledVector(s.vel,e),s.vel.multiplyScalar(Math.pow(.92,e*60))}const t=this.particles.length;for(let n=0;n<t;n++){const s=this.particles[n],r=n*3;this.positions[r]=s.pos.x,this.positions[r+1]=s.pos.y,this.positions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.2)this.colors[r]=1,this.colors[r+1]=.98,this.colors[r+2]=.75;else if(o<.55){const a=(o-.2)/.35;this.colors[r]=1,this.colors[r+1]=.52*(1-a),this.colors[r+2]=.05*(1-a)}else{const a=(1-o)/.45,c=.26*a;this.colors[r]=c,this.colors[r+1]=c,this.colors[r+2]=c+.03*a}}for(let n=t;n<this.maxParticles;n++){const s=n*3;this.positions[s]=99999,this.positions[s+1]=99999,this.positions[s+2]=99999,this.colors[s]=0,this.colors[s+1]=0,this.colors[s+2]=0}this.geom.attributes.position.needsUpdate=!0,this.geom.attributes.color.needsUpdate=!0}cleanup(){this.points&&this.points.parent&&this.points.parent.remove(this.points),this.geom.dispose(),this.material.dispose()}}class g_{constructor({maxTurnRate:e=3.2,initialSpeed:t=85,maxSpeed:n=210,accel:s=50}={}){this.maxTurnRate=e,this.currentSpeed=t,this.maxSpeed=n,this.accel=s}steer(e,t,n,s){this.currentSpeed=Math.min(this.maxSpeed,this.currentSpeed+this.accel*e);const r=s.clone().sub(t),o=r.length();if(o<.001)return{newDir:n.clone(),speed:this.currentSpeed,dist:0};const a=r.clone().divideScalar(o),c=new Zt().setFromUnitVectors(new N(0,0,1),n),l=new Zt().setFromUnitVectors(new N(0,0,1),a),h=this.maxTurnRate*e,d=c.angleTo(l),p=d>1e-4?Math.min(1,h/d):1;return c.slerp(l,p),{newDir:new N(0,0,1).applyQuaternion(c).normalize(),speed:this.currentSpeed,dist:o}}}class v_{constructor(){this.lockRequiredTime=3,this.lockTimer=0,this.isLocked=!1,this.currentTargetId=null,this.lockTickTimer=0,this.maxLockDistance=650,this.lockConeDot=.86,this.targetScreenPos={x:0,y:0,visible:!1,dist:0}}update(e,t,n,s,r){if(t.isDead){this.reset();return}const o=t.getForwardVector();let a=null,c=this.lockConeDot,l=this.maxLockDistance;for(const[h,d]of n.entries()){if(!d||d.isDead||d.isInvisible)continue;const p=d.position.clone().sub(t.position),m=p.length();if(m>this.maxLockDistance)continue;const y=p.clone().divideScalar(m),g=o.dot(y);g>c&&(s&&typeof s.checkRayBlocked=="function"&&s.checkRayBlocked(t.position,d.position)||(c=g,l=m,a={id:h,remote:d,dist:m,dot:g}))}if(a){if(this.currentTargetId===a.id?(this.lockTimer=Math.min(this.lockRequiredTime,this.lockTimer+e),this.lockTickTimer+=e,this.lockTickTimer>=.38&&!this.isLocked&&(this.lockTickTimer=0,ot.playLockTick(this.lockTimer/this.lockRequiredTime)),this.lockTimer>=this.lockRequiredTime&&!this.isLocked&&(this.isLocked=!0,ot.playLockChime(),lt.log("WEAPON",`Missile lock ACQUIRED on target [${a.id.slice(0,5)}]`))):(this.currentTargetId=a.id,this.lockTimer=e,this.isLocked=this.lockTimer>=this.lockRequiredTime,this.lockTickTimer=0,ot.playLockTick(Math.min(1,this.lockTimer/this.lockRequiredTime))),r&&typeof r.project=="function")try{const h=a.remote.position.clone().project(r);this.targetScreenPos={x:(h.x*.5+.5)*100,y:(-(h.y*.5)+.5)*100,inFront:h.z<1,dist:Math.round(l),id:a.id}}catch{}}else this.lockTimer>0&&(this.lockTimer=Math.max(0,this.lockTimer-e*2.8)),this.lockTimer<=0&&this.reset(),this.targetScreenPos.visible=!1}consumeLock(){const e=this.currentTargetId;return this.reset(),e}reset(){this.lockTimer=0,this.isLocked=!1,this.currentTargetId=null,this.lockTickTimer=0,this.targetScreenPos={x:0,y:0,inFront:!1,dist:0}}getProgress(){return Math.min(1,this.lockTimer/this.lockRequiredTime)}}class y_{constructor(e,t,n){this.scene=e,this.spaceEnv=t,this.network=n,this.laserMaxEnergy=100,this.laserEnergy=100,this.laserFireInterval=.08,this.laserShotCost=1.6,this.laserCooldownDelay=.5,this.laserCooldownTimer=0,this.laserRechargeRate=25,this.laserLastFireTime=0,this.laserDamage=2.4,this.laserMaxRange=750,this.laserSpeed=480,this.lockSystem=new v_,this.missileDamage=55,this.missileFireCooldown=.8,this.missileLastFireTime=0,this.cannonDamage=6,this.cannonSpeed=185,this.laserBeams=[],this.projectileLasers=[],this.missiles=[],this.projectiles=[],this.mines=[],this.explosions=[],this.decoys=[],this.fireTrails=new m_(this.scene),this.initGeometriesAndMaterials(),this.listenToNetworkEvents()}initGeometriesAndMaterials(){this.laserCoreGeom=new Xt(.12,.12,1,8),this.laserCoreGeom.rotateX(Math.PI/2),this.laserGlowGeom=new Xt(.38,.38,1,8),this.laserGlowGeom.rotateX(Math.PI/2),this.localLaserCoreMat=new Ke({color:16777215,transparent:!0,opacity:.98,blending:dt}),this.localLaserGlowMat=new Ke({color:54527,transparent:!0,opacity:.85,blending:dt}),this.remoteLaserCoreMat=new Ke({color:16777215,transparent:!0,opacity:.98,blending:dt}),this.remoteLaserGlowMat=new Ke({color:16711782,transparent:!0,opacity:.85,blending:dt}),this.missileBodyGeom=new Xt(.3,.3,2.6,8),this.missileBodyGeom.rotateX(Math.PI/2),this.missileNoseGeom=new Yn(.3,.9,8),this.missileNoseGeom.rotateX(-Math.PI/2),this.missileFinGeom=new gt(1.4,.05,.65),this.missileNozzleGeom=new Xt(.2,.28,.45,8),this.missileNozzleGeom.rotateX(Math.PI/2),this.missileBodyMat=new It({color:1975344,roughness:.35,metalness:.9,flatShading:!0}),this.missileNoseMat=new Ke({color:16724770}),this.missileFinMat=new It({color:3818580,roughness:.5}),this.missileNozzleMat=new Ke({color:16742144}),this.slugBodyGeom=new Xt(.24,.32,2,8),this.slugBodyGeom.rotateX(Math.PI/2),this.slugNoseGeom=new Yn(.24,.9,8),this.slugNoseGeom.rotateX(-Math.PI/2),this.slugTailGeom=new Xt(.18,.28,.45,8),this.slugTailGeom.rotateX(Math.PI/2),this.slugBodyMat=new It({color:2371133,roughness:.35,metalness:.85}),this.localSlugNoseMat=new Ke({color:16763955}),this.remoteSlugNoseMat=new Ke({color:16724804}),this.slugThrusterMat=new Ke({color:16737792}),this.decoyMat=new Ke({color:65535,wireframe:!0,transparent:!0,opacity:.75,blending:dt}),this.mineGeom=new $s(1.6,1),this.mineMat=new It({color:2236962,roughness:.3,metalness:.9,emissive:16716032,emissiveIntensity:.4})}listenToNetworkEvents(){this.network&&(typeof this.network.onLaser=="function"&&this.network.onLaser((e,t)=>{this.spawnRemoteLaserBeam(e,t)}),typeof this.network.onMissile=="function"&&this.network.onMissile((e,t)=>{this.spawnRemoteMissile(e,t)}),typeof this.network.onDecoy=="function"&&this.network.onDecoy((e,t)=>{this.spawnRemoteDecoy(e,t)}),typeof this.network.onCannon=="function"&&this.network.onCannon((e,t)=>{this.spawnRemoteLaserBeam(e,t)}),typeof this.network.onMine=="function"&&this.network.onMine((e,t)=>{this.spawnRemoteMine(e,t)}))}triggerPrimary(e,t,n){if(!e||t.isDead)return;typeof t.breakInvisibility=="function"&&t.breakInvisibility();const s=n>1e3?n*.001:n;if(this.laserEnergy>=this.laserShotCost&&s-this.laserLastFireTime>=this.laserFireInterval-.001){this.laserLastFireTime=s,this.laserCooldownTimer=this.laserCooldownDelay,this.laserEnergy=Math.max(0,this.laserEnergy-this.laserShotCost);const r=t.getForwardVector(),o=t.getRightVector(),a=new N(0,1,0).applyQuaternion(t.quaternion),c=t.position.clone().addScaledVector(r,2.2).addScaledVector(o,-.72).addScaledVector(a,-.28),l=t.position.clone().addScaledVector(r,2.2).addScaledVector(o,.72).addScaledVector(a,-.28),h=t.position.clone().addScaledVector(r,2);let d=null,p=this.laserMaxRange,m=null,y=null;if(this.spaceEnv&&typeof this.spaceEnv.checkRayCollision=="function"){const f=this.spaceEnv.checkRayCollision(h,r,this.laserMaxRange);f&&(d=f.hitPoint,p=f.distance,m="asteroid",y=f.asteroid)}if(this.network&&this.network.peers)for(const[f,u]of this.network.peers.entries()){const v=u==null?void 0:u.lastState;if(!v||v.isDead||v.isInvisible)continue;const _=new N(v.pos.x,v.pos.y,v.pos.z).clone().sub(h),A=_.dot(r);A>0&&A<p&&_.lengthSq()-A*A<16&&(p=A,d=h.clone().addScaledVector(r,A),m="ship",y=f)}d||(d=h.clone().addScaledVector(r,this.laserMaxRange));const g=`laser-${this.network?this.network.selfId:"local"}-${Date.now()}`;this.spawnTwinLaserBeam(c,l,d,!0),ot.playLaserShot(!0),m==="asteroid"&&y?(this.spawnExplosion(d,6,54527),typeof this.spaceEnv.damageAsteroid=="function"?this.spaceEnv.damageAsteroid(y,5,d,r,45,36):typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(y,d,r,45,36)):m==="ship"&&y&&(this.spawnExplosion(d,8,65535),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(y,this.laserDamage,"laser")),this.network&&typeof this.network.broadcastLaser=="function"&&this.network.broadcastLaser({id:g,leftOrigin:{x:c.x,y:c.y,z:c.z},rightOrigin:{x:l.x,y:l.y,z:l.z},hitPoint:{x:d.x,y:d.y,z:d.z},dir:{x:r.x,y:r.y,z:r.z},targetType:m,time:n})}}spawnTwinLaserBeam(e,t,n,s){const r=new Et,o=s?this.localLaserCoreMat:this.remoteLaserCoreMat,a=s?this.localLaserGlowMat:this.remoteLaserGlowMat,c=e.distanceTo(n),l=e.clone().add(n).multiplyScalar(.5),h=new we(this.laserCoreGeom,o);h.scale.set(1,1,c),h.position.copy(l),h.lookAt(n),r.add(h);const d=new we(this.laserGlowGeom,a);d.scale.set(1,1,c),d.position.copy(l),d.lookAt(n),r.add(d);const p=t.distanceTo(n),m=t.clone().add(n).multiplyScalar(.5),y=new we(this.laserCoreGeom,o);y.scale.set(1,1,p),y.position.copy(m),y.lookAt(n),r.add(y);const g=new we(this.laserGlowGeom,a);g.scale.set(1,1,p),g.position.copy(m),g.lookAt(n),r.add(g),this.scene.add(r),this.laserBeams.push({group:r,life:.14,maxLife:.14,isLocal:s})}spawnRemoteLaserBeam(e,t){const n=e.leftOrigin?new N(e.leftOrigin.x,e.leftOrigin.y,e.leftOrigin.z):new N(e.origin.x,e.origin.y,e.origin.z),s=e.rightOrigin?new N(e.rightOrigin.x,e.rightOrigin.y,e.rightOrigin.z):n,r=e.hitPoint?new N(e.hitPoint.x,e.hitPoint.y,e.hitPoint.z):n.clone().add(new N(e.dir.x,e.dir.y,e.dir.z).multiplyScalar(500));this.spawnTwinLaserBeam(n,s,r,!1),ot.playLaserShot(!1,n),e.targetType==="asteroid"&&this.spawnExplosion(r,6,16711782)}triggerSecondary(e,t,n){if(!e||t.isDead)return!1;const s=n>1e3?n*.001:n;if(s-this.missileLastFireTime<this.missileFireCooldown)return!1;this.missileLastFireTime=s,typeof t.breakInvisibility=="function"&&t.breakInvisibility();let r=null,o=!1;this.lockSystem.isLocked&&this.lockSystem.currentTargetId&&(r=this.lockSystem.consumeLock(),o=!0);const a=t.getForwardVector(),c=t.position.clone().addScaledVector(a,3.5).add(new N(0,-.4,0)),l=`missile-${this.network?this.network.selfId:"local"}-${Date.now()}`;return this.spawnMissile(c,a,r,!0,l),ot.playMissileLaunch(!0),o?lt.log("WEAPON",`🚀 Guided Homing Missile LAUNCHED tracking target [${r.slice(0,5)}]`):lt.log("WEAPON","🚀 Unguided Dumb-Fire Missile LAUNCHED straight ahead"),this.network&&typeof this.network.broadcastMissile=="function"&&this.network.broadcastMissile({id:l,origin:{x:c.x,y:c.y,z:c.z},dir:{x:a.x,y:a.y,z:a.z},targetPeerId:r,time:n}),!0}spawnMissile(e,t,n,s,r){const o=new Et;o.position.copy(e),o.quaternion.setFromUnitVectors(new N(0,0,1),t);const a=new we(this.missileBodyGeom,this.missileBodyMat);o.add(a);const c=new we(this.missileNoseGeom,this.missileNoseMat);c.position.set(0,0,1.7),o.add(c);const l=new we(this.missileFinGeom,this.missileFinMat);l.position.set(0,0,-.9),o.add(l);const h=new we(this.missileFinGeom,this.missileFinMat);h.position.set(0,0,-.9),h.rotation.z=Math.PI/2,o.add(h);const d=new we(this.missileNozzleGeom,this.missileNozzleMat);d.position.set(0,0,-1.5),o.add(d),this.scene.add(o),this.missiles.push({group:o,dir:t.clone().normalize(),guidance:new g_,targetId:n,isLocal:s,id:r,life:9})}spawnRemoteMissile(e,t){const n=new N(e.origin.x,e.origin.y,e.origin.z),s=new N(e.dir.x,e.dir.y,e.dir.z);this.spawnMissile(n,s,e.targetPeerId,!1,e.id),ot.playMissileLaunch(!1,n)}deployDecoyClone(e){const t=e.getForwardVector(),n=e.position.clone().addScaledVector(t,4),s=`decoy-${this.network?this.network.selfId:"local"}-${Date.now()}`;this.spawnDecoy(n,t,!0,s),ot.playDecoyDeploy(),lt.log("POWERUP","Hologram Decoy Clone deployed forward!"),this.network&&typeof this.network.broadcastDecoy=="function"&&this.network.broadcastDecoy({id:s,pos:{x:n.x,y:n.y,z:n.z},dir:{x:t.x,y:t.y,z:t.z},time:Date.now()})}spawnDecoy(e,t,n,s){const r=new Et;r.position.copy(e),r.quaternion.setFromUnitVectors(new N(0,0,-1),t);const o=new Yn(1.2,4,5);o.rotateX(-Math.PI/2);const a=new we(o,this.decoyMat);r.add(a);const c=new gt(5,.08,1.8),l=new we(c,this.decoyMat);l.position.set(0,0,.8),r.add(l);const h=new Jn(.5,8,8),d=new Ke({color:65535,transparent:!0,opacity:.9,blending:dt}),p=new we(h,d);p.position.set(0,0,2.2),r.add(p),this.scene.add(r),this.decoys.push({group:r,dir:t.clone().normalize(),speed:95,life:15,maxLife:15,isLocal:n,id:s})}spawnRemoteDecoy(e,t){const n=new N(e.pos.x,e.pos.y,e.pos.z),s=new N(e.dir.x,e.dir.y,e.dir.z);this.spawnDecoy(n,s,!1,e.id),ot.playDecoyDeploy()}spawnRemoteMine(e,t){const n=new N(e.pos.x,e.pos.y,e.pos.z),s=new we(this.mineGeom,this.mineMat);s.position.copy(n),this.scene.add(s),this.mines.push({mesh:s,pos:n,life:3,id:e.id,isLocal:!1})}spawnExplosion(e,t=12,n=16737792){const s=new Et;s.position.copy(e);const r=new Jn(t*.4,12,10),o=new Ke({color:n,transparent:!0,opacity:.95,blending:dt}),a=new we(r,o);s.add(a);const c=new Mi(t*.35,t*.04,6,28),l=new Ke({color:16772778,transparent:!0,opacity:.9,blending:dt}),h=new we(c,l);h.rotation.x=Math.random()*Math.PI,h.rotation.y=Math.random()*Math.PI,s.add(h);const d=new gt(.35,.35,.35),p=new Ke({color:16755251,transparent:!0,opacity:.95,blending:dt}),m=t>15?12:6,y=[];for(let g=0;g<m;g++){const f=new we(d,p),u=Math.random()*Math.PI*2,v=Math.acos(2*Math.random()-1),x=new N(Math.sin(v)*Math.cos(u),Math.sin(v)*Math.sin(u),Math.cos(v)),_=t*1.5+Math.random()*(t*1.8),A=x.multiplyScalar(_);s.add(f),y.push({mesh:f,vel:A})}this.scene.add(s),ot.playExplosion(t>15?1.6:.85,e),this.spaceEnv&&typeof this.spaceEnv.triggerCombatFlash=="function"&&this.spaceEnv.triggerCombatFlash(e,n,t>15?4.5:2.5),this.explosions.push({group:s,mesh:s,fireball:a,ring:h,sparks:y,maxLife:.55,life:.55,maxRadius:t})}spawnLaser(e,t,n,s){const r=new Et;r.position.copy(e),r.quaternion.setFromUnitVectors(new N(0,0,1),t);const o=new we(this.laserCoreGeom,n?this.localLaserCoreMat:this.remoteLaserCoreMat);o.scale.set(1,1,9),r.add(o);const a=new we(this.laserGlowGeom,n?this.localLaserGlowMat:this.remoteLaserGlowMat);a.scale.set(1,1,9.4),r.add(a),this.scene.add(r),this.projectileLasers.push({mesh:r,dir:t.clone().normalize(),speed:this.laserSpeed,life:1.4,isLocal:n,id:s})}spawnProjectile(e,t,n,s,r){const o=new Et;o.position.copy(e),o.quaternion.setFromUnitVectors(new N(0,0,1),t);const a=new we(this.slugBodyGeom,this.slugBodyMat);o.add(a);const c=new we(this.slugNoseGeom,s?this.localSlugNoseMat:this.remoteSlugNoseMat);c.position.set(0,0,-1.45),o.add(c);const l=new we(this.slugTailGeom,this.slugThrusterMat);l.position.set(0,0,1.15),o.add(l),this.scene.add(o),this.projectiles.push({mesh:o,dir:t.clone().normalize(),speed:this.cannonSpeed,initialVel:n?n.clone():new N,life:2.8,isLocal:s,id:r})}triggerCannon(e,t,n){return this.triggerSecondary(e,t,n)}triggerLaser(e,t,n){this.triggerPrimary(e,t,n)}triggerRearMine(e){return this.triggerSecondary(!0,e,performance.now())}update(e,t,n,s){if(this.laserCooldownTimer>0){const r=Math.min(this.laserCooldownTimer,e);this.laserCooldownTimer-=r;const o=e-r;o>0&&this.laserEnergy<this.laserMaxEnergy&&(this.laserEnergy=Math.min(this.laserMaxEnergy,this.laserEnergy+this.laserRechargeRate*o))}else this.laserEnergy<this.laserMaxEnergy&&(this.laserEnergy=Math.min(this.laserMaxEnergy,this.laserEnergy+this.laserRechargeRate*e));for(let r=this.laserBeams.length-1;r>=0;r--){const o=this.laserBeams[r];if(o.life-=e,o.life<=0){this.scene.remove(o.group),this.laserBeams.splice(r,1);continue}const a=o.life/o.maxLife;o.group.children.forEach(c=>{c.material&&c.material.opacity!==void 0&&(c.material.opacity=a*.95)})}for(let r=this.missiles.length-1;r>=0;r--){const o=this.missiles[r];o.life-=e;let a=null;if(o.targetId===(this.network?this.network.selfId:null))a=t.position;else if(n.has(o.targetId)){const d=n.get(o.targetId);d.isDead||(a=d.position)}if(a){const d=o.guidance.steer(e,o.group.position,o.dir,a);o.dir.copy(d.newDir),o.group.position.addScaledVector(o.dir,d.speed*e)}else o.group.position.addScaledVector(o.dir,o.guidance.currentSpeed*e);o.group.quaternion.setFromUnitVectors(new N(0,0,1),o.dir);const c=o.group.position.clone().addScaledVector(o.dir,-1.5);this.fireTrails.emit(c,o.dir,3);let l=!1;const h=this.spaceEnv.checkCollision(o.group.position,1.8);if(h&&(this.spawnExplosion(o.group.position,22,16733440),typeof this.spaceEnv.damageAsteroid=="function"?this.spaceEnv.damageAsteroid(h,50,o.group.position,o.dir,55,42):typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(h,o.group.position,o.dir,45,35),l=!0),!l&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.group.position.distanceToSquared(t.position)<24&&(this.spawnExplosion(o.group.position,20,16720384),t.takeDamage(this.missileDamage,"missile"),s&&s(this.missileDamage,"missile",null),l=!0),!l&&o.isLocal){if(o.targetId&&n.has(o.targetId)){const d=n.get(o.targetId);!d.isDead&&o.group.position.distanceToSquared(d.position)<24&&(this.spawnExplosion(o.group.position,20,16720384),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(o.targetId,this.missileDamage,"missile"),l=!0)}else if(!o.targetId&&n){for(const[d,p]of n.entries())if(!p.isDead&&o.group.position.distanceToSquared(p.position)<24){this.spawnExplosion(o.group.position,20,16720384),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(d,this.missileDamage,"missile"),l=!0;break}}}(l||o.life<=0)&&(o.life<=0&&!l&&this.spawnExplosion(o.group.position,10,16729088),this.scene.remove(o.group),this.missiles.splice(r,1))}for(let r=this.projectileLasers.length-1;r>=0;r--){const o=this.projectileLasers[r];o.life-=e,o.mesh.position.addScaledVector(o.dir,o.speed*e);let a=!1;if(this.spaceEnv.checkCollision(o.mesh.position,1.2)&&(this.spawnExplosion(o.mesh.position,6,54527),a=!0),!a&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<18&&(this.spawnExplosion(o.mesh.position,8,65535),t.takeDamage(this.laserDamage,"laser"),s&&s(this.laserDamage,"laser",null),a=!0),!a&&o.isLocal){for(const[l,h]of n.entries())if(!h.isDead&&o.mesh.position.distanceToSquared(h.position)<18){this.spawnExplosion(o.mesh.position,8,65535),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(l,this.laserDamage,"laser"),a=!0;break}}(a||o.life<=0)&&(this.scene.remove(o.mesh),this.projectileLasers.splice(r,1))}for(let r=this.projectiles.length-1;r>=0;r--){const o=this.projectiles[r];o.life-=e,o.mesh.position.addScaledVector(o.dir,o.speed*e);let a=!1;const c=this.spaceEnv.checkCollision(o.mesh.position,1.2);if(c&&(this.spawnExplosion(o.mesh.position,5,16742144),typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(c,o.mesh.position,o.dir),a=!0),!a&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<16&&(this.spawnExplosion(o.mesh.position,6,16724736),t.takeDamage(this.cannonDamage,"cannon"),s&&s(this.cannonDamage,"cannon",null),a=!0),!a&&o.isLocal){for(const[l,h]of n.entries())if(!h.isDead&&o.mesh.position.distanceToSquared(h.position)<16){this.spawnExplosion(o.mesh.position,6,16733440),this.network&&typeof this.network.sendHitTarget=="function"&&this.network.sendHitTarget(l,this.cannonDamage,"cannon"),a=!0;break}}(a||o.life<=0)&&(this.scene.remove(o.mesh),this.projectiles.splice(r,1))}for(let r=this.decoys.length-1;r>=0;r--){const o=this.decoys[r];o.life-=e,o.group.position.addScaledVector(o.dir,o.speed*e);const a=.5+Math.sin(o.life*14)*.25;o.group.children.forEach(c=>{c.material&&c.material.opacity!==void 0&&(c.material.opacity=a)}),o.life<=0&&(this.spawnExplosion(o.group.position,6,65535),this.scene.remove(o.group),this.decoys.splice(r,1))}for(let r=this.mines.length-1;r>=0;r--){const o=this.mines[r];o.life-=e,o.mesh.rotation.y+=e*2,o.life<=0&&(this.spawnExplosion(o.pos,16,16720384),this.scene.remove(o.mesh),this.mines.splice(r,1))}for(let r=this.explosions.length-1;r>=0;r--){const o=this.explosions[r];if(o.life-=e,o.life<=0){o.group&&o.group.parent?o.group.parent.remove(o.group):o.mesh&&o.mesh.parent&&o.mesh.parent.remove(o.mesh),this.explosions.splice(r,1);continue}const a=1-o.life/o.maxLife,c=o.life/o.maxLife;if(o.fireball){const l=1+a*2.4;o.fireball.scale.set(l,l,l),o.fireball.material&&(o.fireball.material.opacity=Math.max(0,c*.95))}else if(o.mesh&&o.mesh.material){const l=1+a*2.2;o.mesh.scale.set(l,l,l),o.mesh.material.opacity=c*.9}if(o.ring){const l=1+a*4.2;o.ring.scale.set(l,l,l),o.ring.material&&(o.ring.material.opacity=Math.max(0,(1-a)*.85))}if(o.sparks)for(let l=0;l<o.sparks.length;l++){const h=o.sparks[l];h.mesh.position.addScaledVector(h.vel,e),h.vel.multiplyScalar(Math.pow(.9,e*60)),h.mesh.material&&(h.mesh.material.opacity=Math.max(0,(1-a)*.9))}}this.fireTrails.update(e)}get lasers(){return this.projectileLasers.length>0?this.projectileLasers:this.laserBeams}get cannonEnergy(){return this.lockSystem.isLocked?100:Math.round(this.lockSystem.getProgress()*100)}get cannonMaxEnergy(){return 100}get cannonCooldownTimer(){return this.lockSystem.isLocked?0:3-this.lockSystem.lockTimer}cleanup(){for(const e of this.laserBeams)this.scene.remove(e.group);for(const e of this.missiles)this.scene.remove(e.group);for(const e of this.decoys)this.scene.remove(e.group);for(const e of this.mines)this.scene.remove(e.mesh);for(const e of this.explosions)e.group&&e.group.parent?e.group.parent.remove(e.group):e.mesh&&e.mesh.parent&&e.mesh.parent.remove(e.mesh);this.fireTrails.cleanup()}}class lh{constructor(e,t,n="Pilot"){this.peerId=e,this.scene=t,this.playerName=n,this.group=new Et,this.position=this.group.position,this.quaternion=this.group.quaternion,this.lastReceivedState=null,this.targetPosition=new N,this.targetQuaternion=new Zt,this.targetVelocity=new N,this.velocity=this.targetVelocity,this.lastPacketTime=performance.now(),this.hp=100,this.maxHp=100,this.isDead=!1,this.isThrusting=!1,this.strafeState=0,this.engineFlares=[],this.sideThrusterFlares=[],this.shieldMesh=null,this.nameCanvas=null,this.nameSprite=null,this.createShipMesh(),this.createNameplate(),this.scene.add(this.group)}createShipMesh(){const e=new It({color:10363940,roughness:.35,metalness:.85,flatShading:!0}),t=new It({color:1580068,roughness:.45,metalness:.8,flatShading:!0}),n=new It({color:54527,roughness:.12,metalness:.95,emissive:15186,emissiveIntensity:.6}),s=new Ke({color:58879}),r=new Yn(.75,2.6,5);r.rotateX(-Math.PI/2);const o=new we(r,e);o.position.set(0,0,-2.1),this.group.add(o);const a=new gt(1.8,.04,.6),c=new we(a,t);c.position.set(0,.05,-1.5),this.group.add(c);const l=new gt(1.4,.8,3.2),h=new we(l,e);h.position.set(0,0,.2),this.group.add(h);const d=new gt(.35,.55,1.8),p=new we(d,t);p.position.set(-.85,-.05,.1),this.group.add(p);const m=p.clone();m.position.set(.85,-.05,.1),this.group.add(m);const y=new Yn(.48,1.8,5);y.rotateX(-Math.PI/2);const g=new we(y,n);g.position.set(0,.44,-.4),this.group.add(g);const f=new gt(5.8,.08,2),u=new we(f,e);u.position.set(0,-.08,.6),this.group.add(u);const v=new Xt(.1,.12,1.6,8);v.rotateX(Math.PI/2);const x=new we(v,t);x.position.set(-1.8,-.22,.3),this.group.add(x);const _=x.clone();_.position.set(1.8,-.22,.3),this.group.add(_);const A=new Mi(.12,.02,6,12),T=new we(A,s);T.position.set(-1.8,-.22,-.5),this.group.add(T);const R=T.clone();R.position.set(1.8,-.22,-.5),this.group.add(R);const P=new gt(.08,1.25,1.2),w=new we(P,t);w.position.set(-.65,.62,1.2),w.rotation.z=-.32,this.group.add(w);const M=w.clone();M.position.set(.65,.62,1.2),M.rotation.z=.32,this.group.add(M);const D=new Xt(.32,.42,.75,10);D.rotateX(Math.PI/2);const G=new we(D,t);G.position.set(-.48,0,1.95),this.group.add(G);const S=G.clone();S.position.set(.48,0,1.95),this.group.add(S);const L=new Mi(.3,.03,6,12),F=new we(L,s);F.position.set(-.48,0,2.32),this.group.add(F);const I=F.clone();I.position.set(.48,0,2.32),this.group.add(I);const z=new Yn(.32,2.6,8);z.rotateX(-Math.PI/2);const O=new Ke({color:51455,transparent:!0,opacity:.9,blending:dt}),U=new we(z,O);U.position.set(-.48,0,3.6),this.group.add(U),this.engineFlares.push(U);const B=U.clone();B.position.set(.48,0,3.6),this.group.add(B),this.engineFlares.push(B);const Z=new Jn(3.4,16,12),le=new Ke({color:58879,wireframe:!0,transparent:!0,opacity:0});this.shieldMesh=new we(Z,le),this.group.add(this.shieldMesh)}createNameplate(){this.nameCanvas=document.createElement("canvas"),this.nameCanvas.width=256,this.nameCanvas.height=64,this.updateNameplateTexture();const e=new Zr(this.nameCanvas),t=new Wu({map:e,transparent:!0});this.nameSprite=new n_(t),this.nameSprite.position.set(0,3.2,0),this.nameSprite.scale.set(7.5,1.8,1),this.group.add(this.nameSprite)}updateNameplateTexture(){if(!this.nameCanvas)return;const e=this.nameCanvas.getContext("2d");if(!e)return;e.clearRect(0,0,256,64),e.fillStyle="rgba(10, 16, 26, 0.75)",e.roundRect?e.roundRect(10,8,236,48,8):e.fillRect(10,8,236,48),e.fill(),e.strokeStyle="#00d4ff",e.lineWidth=2,e.stroke(),e.font='bold 20px "Segoe UI", sans-serif',e.fillStyle="#ffffff",e.textAlign="center",e.fillText(this.playerName,128,30);const t=Math.max(0,this.hp/this.maxHp);e.fillStyle="#222",e.fillRect(30,38,196,10),e.fillStyle=t>.4?"#00ff88":"#ff3344",e.fillRect(30,38,196*t,10),this.nameSprite&&this.nameSprite.material.map&&(this.nameSprite.material.map.needsUpdate=!0)}receiveNetworkState(e){e&&(this.lastPacketTime=performance.now(),e.name&&e.name!==this.playerName&&(this.playerName=e.name,this.updateNameplateTexture()),e.hp!==void 0&&e.hp!==this.hp&&(this.hp=e.hp,this.updateNameplateTexture()),this.isDead=!!e.isDead,this.isInvisible=!!e.isInvisible,this.isThrusting=!!e.thrust,this.strafeState=e.strafe||0,this.targetPosition.set(e.pos.x,e.pos.y,e.pos.z),this.targetQuaternion.set(e.quat._x||e.quat.x,e.quat._y||e.quat.y,e.quat._z||e.quat.z,e.quat._w||e.quat.w),e.vel&&this.targetVelocity.set(e.vel.x,e.vel.y,e.vel.z))}triggerShieldFlash(){this.shieldMesh&&(this.shieldMesh.material.opacity=.55)}update(e){if(this.isDead){this.group.visible=!1;return}this.group.visible=!0;const t=performance.now(),n=Math.min(.25,(t-this.lastPacketTime)/1e3),s=this.targetPosition.clone().addScaledVector(this.targetVelocity,n),r=Math.min(1,e*12);this.position.lerp(s,r),this.quaternion.slerp(this.targetQuaternion,Math.min(1,e*10));const o=this.isThrusting?.8+Math.random()*.4:.001;for(const a of this.engineFlares)a.scale.set(o,o,o),a.visible=this.isThrusting;this.shieldMesh&&this.shieldMesh.material.opacity>0&&(this.shieldMesh.material.opacity=Math.max(0,this.shieldMesh.material.opacity-e*2.5))}destroy(){this.scene.remove(this.group)}}class __{constructor(e){this.scene=e,this.maxParticles=2400,this.particles=[],this.geom=new wt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new yt(this.positions,3)),this.geom.setAttribute("color",new yt(this.colors,3));let t=null;if(typeof document<"u")try{const n=document.createElement("canvas");n.width=64,n.height=64;const s=n.getContext("2d");if(s){const r=s.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.2,"rgba(0, 220, 255, 0.85)"),r.addColorStop(.5,"rgba(0, 140, 255, 0.35)"),r.addColorStop(.8,"rgba(0, 60, 255, 0.1)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),s.fillStyle=r,s.fillRect(0,0,64,64),t=new Zr(n)}}catch{}this.mat=new qs({size:5.5,map:t||void 0,vertexColors:!0,transparent:!0,opacity:.85,blending:dt,depthWrite:!1,sizeAttenuation:!0}),this.points=new Kr(this.geom,this.mat),this.points.frustumCulled=!1,this.scene.add(this.points),this.emitTimer=0}emit(e,t,n=!1){this.particles.length>=this.maxParticles&&this.particles.shift();const s=(Math.random()-.5)*.6,r=(Math.random()-.5)*.6,o=(Math.random()-.5)*.6,a=e.clone().addScaledVector(t,-2.4);this.particles.push({x:a.x+s,y:a.y+r,z:a.z+o,vx:s*.4,vy:r*.4,vz:o*.4,age:0,maxAge:15,isHostile:n})}update(e){const t=this.geom.attributes.position,n=this.geom.attributes.color,s=this.particles.length;for(let r=s-1;r>=0;r--){const o=this.particles[r];if(o.age+=e,o.age>=o.maxAge){this.particles.splice(r,1);continue}o.x+=o.vx*e,o.y+=o.vy*e,o.z+=o.vz*e;const a=1-o.age/o.maxAge,c=Math.pow(a,1.6),l=r*3;this.positions[l]=o.x,this.positions[l+1]=o.y,this.positions[l+2]=o.z,o.isHostile?(this.colors[l]=1*c,this.colors[l+1]=.35*c,this.colors[l+2]=.15*c):(this.colors[l]=.15*c,this.colors[l+1]=.85*c,this.colors[l+2]=1*c)}this.maxParticles-this.particles.length;for(let r=this.particles.length;r<this.maxParticles;r++){const o=r*3;this.positions[o]=0,this.positions[o+1]=0,this.positions[o+2]=0,this.colors[o]=0,this.colors[o+1]=0,this.colors[o+2]=0}t.needsUpdate=!0,n.needsUpdate=!0}cleanup(){this.scene.remove(this.points),this.particles=[]}}class x_{constructor(e){this.scene=e,this.ripples=[],this.ringGeom=new pc(.8,1.2,32),this.ringGeom.rotateX(Math.PI/2),this.sphereGeom=new xi(1,2)}emitRipple(e,t=58879){const n=new Et;n.position.copy(e);const s=new Ke({color:t,wireframe:!0,transparent:!0,opacity:.85,blending:dt,depthWrite:!1}),r=new we(this.sphereGeom,s);n.add(r);const o=new Ke({color:16777215,transparent:!0,opacity:.95,side:Rt,blending:dt,depthWrite:!1}),a=new we(this.ringGeom,o);n.add(a),this.scene.add(n),this.ripples.push({group:n,sphereMesh:r,ringMesh:a,age:0,maxAge:2.5,maxRadius:280})}update(e){for(let t=this.ripples.length-1;t>=0;t--){const n=this.ripples[t];if(n.age+=e,n.age>=n.maxAge){this.scene.remove(n.group),this.ripples.splice(t,1);continue}const s=n.age/n.maxAge,r=2+Math.pow(s,.75)*n.maxRadius,o=Math.max(0,(1-s)*.9);n.sphereMesh.scale.set(r,r,r),n.sphereMesh.material.opacity=o,n.ringMesh.scale.set(r*1.05,r*1.05,r*1.05),n.ringMesh.material.opacity=o*1.2}}cleanup(){for(const e of this.ripples)this.scene.remove(e.group);this.ripples=[]}}class M_{constructor(e,t){this.scene=e,this.spaceEnv=t,this.spawnInterval=10,this.spawnTimer=4,this.activeMeteor=null,this.maxParticles=250,this.particles=[],this.trailGeom=new wt,this.trailPositions=new Float32Array(this.maxParticles*3),this.trailColors=new Float32Array(this.maxParticles*3),this.trailGeom.setAttribute("position",new yt(this.trailPositions,3)),this.trailGeom.setAttribute("color",new yt(this.trailColors,3)),this.trailMat=new qs({size:48,vertexColors:!0,transparent:!0,opacity:.95,blending:dt,depthWrite:!1,sizeAttenuation:!0}),this.trailPoints=new Kr(this.trailGeom,this.trailMat),this.scene.add(this.trailPoints)}spawnMeteor(){if(this.activeMeteor)return;const e=Math.random()*Math.PI*2,t=Math.acos(2*Math.random()-1),n=6500+Math.random()*500,s=new N(n*Math.sin(t)*Math.cos(e),n*Math.sin(t)*Math.sin(e)*.4,n*Math.cos(t));let r=new N((Math.random()-.5)*600,(Math.random()-.5)*300,(Math.random()-.5)*600);if(this.spaceEnv&&this.spaceEnv.asteroids.length>1&&Math.random()<.45){const P=Math.floor(1+Math.random()*(this.spaceEnv.asteroids.length-1)),w=this.spaceEnv.asteroids[P];w&&r.copy(w.position)}const o=r.clone().sub(s).normalize(),a=260,c=o.clone().multiplyScalar(a),l=56,h=12e5,d=new Et;d.position.copy(s);const p=new $s(l,2),m=new It({color:1705986,emissive:16724736,emissiveIntensity:4.2,roughness:.88,metalness:.25}),y=new we(p,m);d.add(y);const g=new Jn(l*.75,16,12),f=new Ke({color:16777215,transparent:!0,opacity:.95,blending:dt}),u=new we(g,f);d.add(u);const v=new xi(l*1.25,2),x=new Ke({color:16729088,transparent:!0,opacity:.65,blending:dt,side:Rt}),_=new we(v,x);d.add(_);const A=new xi(l*1.4,2),T=new Ke({color:16755200,transparent:!0,opacity:.45,blending:dt,side:Rt}),R=new we(A,T);d.add(R),this.scene.add(d),this.activeMeteor={group:d,coreMesh:y,fireEnvelopeMesh:_,haloMesh:R,position:d.position,velocity:c,dir:o,speed:a,radius:l,mass:h,flybyPlayed:!1,age:0},this.spaceEnv&&this.spaceEnv.meteorLight&&(this.spaceEnv.meteorLight.intensity=4.5,this.spaceEnv.meteorLight.position.copy(s)),lt.log("METEOR",`Flaming meteor entered sector at (${Math.round(s.x)}, ${Math.round(s.y)}, ${Math.round(s.z)}) heading speed ${a} u/s`)}update(e,t,n,s){var r;if(this.spawnTimer+=e,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnMeteor()),this.activeMeteor){const o=this.activeMeteor;if(o.age+=e,o.position.addScaledVector(o.velocity,e),o.coreMesh.rotation.x+=e*1.8,o.coreMesh.rotation.y+=e*2.2,o.fireEnvelopeMesh){o.fireEnvelopeMesh.rotation.x-=e*3.5,o.fireEnvelopeMesh.rotation.z+=e*4;const c=1+Math.sin(o.age*14)*.06;o.fireEnvelopeMesh.scale.set(c,c,c)}if(o.haloMesh){o.haloMesh.rotation.y+=e*2.8,o.haloMesh.rotation.z-=e*2.5;const c=1+Math.cos(o.age*10)*.08;o.haloMesh.scale.set(c,c,c)}this.spaceEnv&&this.spaceEnv.meteorLight&&this.spaceEnv.meteorLight.position.copy(o.position),this.emitTrailParticles(o.position,o.dir,6),!o.flybyPlayed&&t&&!t.isDead&&o.position.distanceTo(t.position)<450&&(o.flybyPlayed=!0,ot.playMeteorFlyby(o.position));let a=!1;for(let c=0;c<this.spaceEnv.asteroids.length;c++){const l=this.spaceEnv.asteroids[c],h=o.position.distanceToSquared(l.position),d=l.radius+o.radius;if(h<d*d){if(l.radius>=2500||l.isMegaAsteroid){lt.log("METEOR","Meteor IMPACT with Central Mega-Asteroid! Blasting massive crater.");const m=o.position.clone(),y=o.dir.clone();typeof this.spaceEnv.carveAsteroid=="function"&&this.spaceEnv.carveAsteroid(l,m,y,130,90),this.triggerExplosion(o.position,65,16724736)}else{const m=l.position.clone().sub(o.position).normalize(),y=o.mass/Math.max(1,l.mass)*o.speed*1.8,g=Math.min(30,y);l.velocity.addScaledVector(m,g),l.velocity.length()>40&&l.velocity.setLength(40),l.rotationSpeed.add(new N((Math.random()-.5)*1.2,(Math.random()-.5)*1.2,(Math.random()-.5)*1.2)),lt.log("METEOR",`Meteor IMPACT with belt asteroid! Transferred impulse ${Math.round(g)} u/s`),this.triggerExplosion(o.position,28,16733440)}a=!0;break}}if(!a&&t&&!t.isDead&&o.position.distanceTo(t.position)<o.radius+3.2&&(lt.log("METEOR","Meteor DIRECT HIT on player ship! Instant lethal incineration."),this.triggerExplosion(o.position,36,16720384),t.takeDamage(1e3,!0),s&&s("🔥 Incinerated by rogue flaming meteor!"),a=!0),!a&&n){for(const[c,l]of n.entries())if(!l.isDead&&o.position.distanceTo(l.position)<o.radius+3.2){lt.log("METEOR",`Meteor DIRECT HIT on remote ship ${c.slice(0,5)}!`),this.triggerExplosion(o.position,36,16720384),(r=l.takeDamage)==null||r.call(l,1e3),a=!0;break}}!a&&o.position.length()>8e3&&(a=!0),a&&this.destroyMeteor()}this.updateTrailParticles(e)}emitTrailParticles(e,t,n=6){for(let s=0;s<n&&!(this.particles.length>=this.maxParticles);s++){const r=new N((Math.random()-.5)*45,(Math.random()-.5)*45,(Math.random()-.5)*45),o=e.clone().add(r),a=t.clone().multiplyScalar(-40).add(new N((Math.random()-.5)*25,(Math.random()-.5)*25,(Math.random()-.5)*25)),c=.65+Math.random()*.45;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}updateTrailParticles(e){for(let n=this.particles.length-1;n>=0;n--){const s=this.particles[n];if(s.life-=e,s.life<=0){this.particles.splice(n,1);continue}s.pos.addScaledVector(s.vel,e)}const t=this.particles.length;for(let n=0;n<t;n++){const s=this.particles[n],r=n*3;this.trailPositions[r]=s.pos.x,this.trailPositions[r+1]=s.pos.y,this.trailPositions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.2)this.trailColors[r]=1,this.trailColors[r+1]=.95,this.trailColors[r+2]=.8;else if(o<.6)this.trailColors[r]=1,this.trailColors[r+1]=.45*(1-(o-.2)/.4),this.trailColors[r+2]=.05;else{const a=(1-o)/.4;this.trailColors[r]=.6*a,this.trailColors[r+1]=.1*a,this.trailColors[r+2]=.02*a}}for(let n=t;n<this.maxParticles;n++){const s=n*3;this.trailPositions[s]=0,this.trailPositions[s+1]=0,this.trailPositions[s+2]=999999}this.trailGeom.attributes.position.needsUpdate=!0,this.trailGeom.attributes.color.needsUpdate=!0}triggerExplosion(e,t=28,n=16733440){const s=new Jn(t*.4,16,12),r=new Ke({color:n,transparent:!0,opacity:.95,blending:dt}),o=new we(s,r);o.position.copy(e),this.scene.add(o),ot.playExplosion(2.5),this.spaceEnv&&typeof this.spaceEnv.triggerCombatFlash=="function"&&this.spaceEnv.triggerCombatFlash(e,n,6);const a=performance.now(),c=550,l=()=>{const d=(performance.now()-a)/c;if(d>=1){this.scene.remove(o),s.dispose(),r.dispose();return}const p=1+d*3.5;o.scale.set(p,p,p),r.opacity=Math.max(0,1-d),requestAnimationFrame(l)};requestAnimationFrame(l)}destroyMeteor(){this.activeMeteor&&(this.scene.remove(this.activeMeteor.group),this.spaceEnv&&this.spaceEnv.meteorLight&&(this.spaceEnv.meteorLight.intensity=0),this.activeMeteor=null)}cleanup(){this.destroyMeteor(),this.scene.remove(this.trailPoints),this.trailGeom.dispose(),this.trailMat.dispose()}}const oi={SHIELD_REPAIR:"shield_repair",INVISIBILITY:"invisibility",HOLOGRAM_CLONE:"hologram_clone"};class S_{constructor(e,t=null){this.scene=e,this.blackHoleSystem=t,this.spawnInterval=10,this.spawnTimer=2,this.itemLifetime=60,this.powerups=[],this.maxConcurrent=12,this.orbGeom=new xi(3.2,2),this.ringGeom=new Mi(4.5,.25,8,24),this.iconGeom=new gt(1.6,1.6,1.6)}spawnPowerUp(){if(this.powerups.length>=this.maxConcurrent)return;const e=Math.random()*Math.PI*2,t=3300+Math.random()*1900,n=new N(Math.cos(e)*t,(Math.random()-.5)*400,Math.sin(e)*t),s=Math.random();let r=oi.SHIELD_REPAIR,o=65535,a="Shield Repair";s<.36?(r=oi.SHIELD_REPAIR,o=65484,a="Shield Replenish"):s<.68?(r=oi.INVISIBILITY,o=13378303,a="Cloaking Device"):(r=oi.HOLOGRAM_CLONE,o=65382,a="Hologram Decoy");const c=new Et;c.position.copy(n);const l=new Ke({color:o,transparent:!0,opacity:.85,blending:dt}),h=new we(this.orbGeom,l);c.add(h);const d=new Ke({color:o,wireframe:!0,transparent:!0,opacity:.75,blending:dt}),p=new we(this.ringGeom,d);c.add(p);const m=new Ke({color:16777215,wireframe:!0}),y=new we(this.iconGeom,m);c.add(y),this.scene.add(c),this.powerups.push({group:c,coreMesh:h,ringMesh:p,iconMesh:y,type:r,name:a,pos:n,life:this.itemLifetime,maxLife:this.itemLifetime,initialY:n.y,seed:Math.random()*10}),lt.log("POWERUP",`Spawned [${a}] at (${Math.round(n.x)}, ${Math.round(n.y)}, ${Math.round(n.z)})`)}update(e,t,n){this.spawnTimer+=e,this.spawnTimer>=this.spawnInterval&&(this.spawnTimer=0,this.spawnPowerUp());for(let s=this.powerups.length-1;s>=0;s--){const r=this.powerups[s];if(r.life-=e,r.life<=0){this.scene.remove(r.group),this.powerups.splice(s,1);continue}const o=r.maxLife-r.life;if(r.group.rotation.y+=e*1.6,r.ringMesh.rotation.x+=e*2.4,r.ringMesh.rotation.z+=e*1.8,r.iconMesh.rotation.y-=e*3,r.group.position.y=r.initialY+Math.sin(o*2.5+r.seed)*3.5,r.life<10){const a=(Math.sin(o*12)+1)*.5;r.coreMesh.material.opacity=.3+a*.6}if(t&&!t.isDead){const a=t.position.distanceToSquared(r.group.position),c=8;a<=c*c&&(this.applyPowerUp(r.type,t,n),ot.playScoreChime(),this.scene.remove(r.group),this.powerups.splice(s,1))}}}applyPowerUp(e,t,n){let s="Special",r="✨",o="#00ffff";switch(e){case oi.SHIELD_REPAIR:s="REPAIR SHIELD",r="🛡️",o="#00d4ff";break;case oi.INVISIBILITY:s="CLOAK",r="👁️",o="#c084fc";break;case oi.HOLOGRAM_CLONE:s="DECOY CLONE",r="👥",o="#00ff88";break}t.storedPowerUp={type:e,name:s,icon:r,color:o},lt.log("POWERUP",`Collected and stored [${s}] in Special slot`),n&&n(`✨ ${r} ${s} ARMED! PRESS [R] OR SPECIAL BUTTON TO USE`)}cleanup(){for(const e of this.powerups)this.scene.remove(e.group);this.powerups=[],this.orbGeom.dispose(),this.ringGeom.dispose(),this.iconGeom.dispose()}}class w_{constructor({container:e,network:t,mapSeed:n,onHudUpdate:s,onDeathNotice:r}){this.container=e,this.network=t,this.mapSeed=n,this.onHudUpdate=s||(()=>{}),this.onDeathNotice=r||(()=>{}),this.scene=null,this.camera=null,this.renderer=null,this.spaceEnv=null,this.cockpit=null,this.playerShip=null,this.weaponsSystem=null,this.remoteShips=new Map,this.isRunning=!1,this.lastTime=performance.now(),this.animFrameId=null,this.lastWidth=0,this.lastHeight=0,this.isPointerLocked=!1,this.mouseSensitivity=.0066,this.isFiringLaser=!1,this.isFiringCannon=!1,this.powerUpSystem=null,this.broadcastTimer=0,this.broadcastInterval=1/20,this.thrusterTrails=null,this.beaconSystem=null,this.meteorSystem=null,this.trailEmitTimer=0,this.timeSinceLastCombat=0,this.beaconPulseTimer=0,this.netStatsTimer=0,this.initThree(),this.setupNetworkHandlers(),this.setupInputListeners(),lt.setEngine(this),lt.log("ENGINE",`GameEngine initialized with seed ${this.mapSeed}`)}initThree(){this.scene=new e_,this.scene.background=new je(264212),this.scene.fog=new fc(264212,4e-5);const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;this.camera=new Wt(75,e/t,.1,12e3),this.scene.add(this.camera),this.renderer=new Qy({antialias:!0,powerPreference:"high-performance",precision:"highp",stencil:!1,alpha:!1}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=du,this.renderer.toneMappingExposure=1.2,this.renderer.domElement.style.transform="translateZ(0)",this.renderer.domElement.style.willChange="transform",this.container.appendChild(this.renderer.domElement),this.spaceEnv=new ch(this.scene,this.mapSeed),this.playerShip=new f_(this.camera,this.spaceEnv),this.playerShip.resetSpawn(),this.cockpit=new d_(this.camera),this.weaponsSystem=new y_(this.scene,this.spaceEnv,this.network),this.thrusterTrails=new __(this.scene),this.beaconSystem=new x_(this.scene),this.meteorSystem=new M_(this.scene,this.spaceEnv),this.powerUpSystem=new S_(this.scene);try{this.renderer.compile(this.scene,this.camera)}catch{}window.addEventListener("resize",this.onWindowResize.bind(this))}setupNetworkHandlers(){this.network.onPeerJoined=e=>{if(!(!e||typeof e!="string")){if(!this.remoteShips.has(e)){const t=new lh(e,this.scene,`Pilot-${e.slice(0,4)}`);this.remoteShips.set(e,t)}lt.log("NET",`Peer joined: ${e}`)}},this.network.onPeerLeft=e=>{!e||typeof e!="string"||(this.remoteShips.has(e)&&(this.remoteShips.get(e).destroy(),this.remoteShips.delete(e)),lt.log("NET",`Peer left: ${e}`))},this.network.onHit(e=>{if(this.timeSinceLastCombat=0,e.targetId===this.network.selfId){const t=this.playerShip.takeDamage(e.damage);this.cockpit.triggerDamageFlash(),ot.playDamageHit(),t&&(ot.playExplosion(2.2),this.network.broadcastKill(this.network.selfId,e.attackerId,e.attackerName),this.onDeathNotice(`💥 Destroyed by ${e.attackerName||"Unknown Pilot"}`))}else this.remoteShips.has(e.targetId)&&this.remoteShips.get(e.targetId).triggerShieldFlash()}),this.weaponsSystem&&(this.network.onCannon(()=>{this.timeSinceLastCombat=0}),this.network.onMine(()=>{this.timeSinceLastCombat=0})),this.network.onKill(e=>{this.timeSinceLastCombat=0,e.killerId===this.network.selfId&&(this.playerShip.recordKill(),ot.playScoreChime(),this.onDeathNotice(`🎯 You eliminated ${e.victimId?e.victimId.slice(0,5):"Enemy"}! (+100 PTS)`))}),this.network.onMapReset(e=>{this.resetMap(e)})}resetMap(e){this.mapSeed=e,this.spaceEnv&&this.spaceEnv.destroy(),this.spaceEnv=new ch(this.scene,e),this.weaponsSystem&&(this.weaponsSystem.spaceEnv=this.spaceEnv),this.meteorSystem&&(this.meteorSystem.spaceEnv=this.spaceEnv),this.playerShip&&(this.playerShip.spaceEnv=this.spaceEnv,this.playerShip.position.set(0,80,3200),this.playerShip.velocity.set(0,0,0),this.playerShip.quaternion.set(0,0,0,1)),lt.log("MAP",`Map reseeded with ${e}`),this.onDeathNotice("🔄 Sector reseeded! Map reset complete.")}requestMapResetVote(){return this.network.requestMapResetVote()}castMapResetVote(e){return this.network.castMapResetVote(e)}triggerBoostAction(){return this.playerShip&&this.playerShip.triggerThrustPress(performance.now())?(ot.playBoost(),this.cockpit.triggerBoostFlash(),this.thrusterTrails&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1),!0):!1}setupInputListeners(){window.addEventListener("keydown",e=>{if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.code){case"KeyW":this.playerShip.input.thrust||this.triggerBoostAction(),this.playerShip.input.thrust=!0;break;case"KeyS":this.playerShip.input.brake=!0;break;case"KeyA":this.playerShip.input.strafeLeft||ot.playStrafeBurst(),this.playerShip.input.strafeLeft=!0;break;case"KeyD":this.playerShip.input.strafeRight||ot.playStrafeBurst(),this.playerShip.input.strafeRight=!0;break;case"KeyQ":this.playerShip.input.rollLeft=!0;break;case"KeyE":this.playerShip.input.rollRight=!0;break;case"ArrowUp":this.playerShip.input.pitchUp=!0;break;case"ArrowDown":this.playerShip.input.pitchDown=!0;break;case"ArrowLeft":this.playerShip.input.yawLeft=!0;break;case"ArrowRight":this.playerShip.input.yawRight=!0;break;case"Space":this.isFiringLaser=!0,e.preventDefault();break;case"KeyF":this.weaponsSystem.triggerSecondary(!0,this.playerShip,performance.now());break;case"KeyR":{const t=this.playerShip.useSpecialPowerUp(this);t&&this.onDeathNotice(t.message);break}}}),window.addEventListener("keyup",e=>{switch(e.code){case"KeyW":this.playerShip.input.thrust=!1;break;case"KeyS":this.playerShip.input.brake=!1;break;case"KeyA":this.playerShip.input.strafeLeft=!1;break;case"KeyD":this.playerShip.input.strafeRight=!1;break;case"KeyQ":this.playerShip.input.rollLeft=!1;break;case"KeyE":this.playerShip.input.rollRight=!1;break;case"ArrowUp":this.playerShip.input.pitchUp=!1;break;case"ArrowDown":this.playerShip.input.pitchDown=!1;break;case"ArrowLeft":this.playerShip.input.yawLeft=!1;break;case"ArrowRight":this.playerShip.input.yawRight=!1;break;case"Space":this.isFiringLaser=!1;break}}),this.renderer.domElement.addEventListener("mousedown",e=>{e.button===0?this.isFiringLaser=!0:e.button===2&&this.weaponsSystem.triggerSecondary(!0,this.playerShip,performance.now())}),window.addEventListener("mouseup",e=>{e.button===0&&(this.isFiringLaser=!1)}),this.renderer.domElement.addEventListener("contextmenu",e=>e.preventDefault()),this.renderer.domElement.addEventListener("click",()=>{var e,t;document.pointerLockElement||(t=(e=this.renderer.domElement).requestPointerLock)==null||t.call(e)}),document.addEventListener("pointerlockchange",()=>{this.isPointerLocked=document.pointerLockElement===this.renderer.domElement}),document.addEventListener("mousemove",e=>{this.isPointerLocked&&(this.playerShip.input.analogYaw=-e.movementX*this.mouseSensitivity*25,this.playerShip.input.analogPitch=-e.movementY*this.mouseSensitivity*25)})}onWindowResize(){if(!this.container||!this.renderer||!this.camera)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}start(){this.isRunning=!0,this.lastTime=performance.now(),this.loop()}stop(){this.isRunning=!1,this.animFrameId&&cancelAnimationFrame(this.animFrameId)}loop(){if(this.isRunning){this.animFrameId=requestAnimationFrame(this.loop.bind(this));try{lt.recordFrame();const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;e>0&&t>0&&(e!==this.lastWidth||t!==this.lastHeight)&&(this.lastWidth=e,this.lastHeight=t,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1));const n=performance.now(),s=Math.min(.1,(n-this.lastTime)/1e3);this.lastTime=n,this.isPointerLocked&&(this.playerShip.input.analogPitch*=.7,this.playerShip.input.analogYaw*=.7),this.playerShip.update(s),ot.updateListener(this.camera),ot.updateEngine(this.playerShip.input.thrust,this.playerShip.input.brake,s),(this.isFiringLaser||this.isFiringCannon)&&(this.timeSinceLastCombat=0),this.weaponsSystem.triggerPrimary(this.isFiringLaser,this.playerShip,n),this.weaponsSystem&&this.weaponsSystem.lockSystem&&this.weaponsSystem.lockSystem.update(s,this.playerShip,this.remoteShips,this.spaceEnv,this.camera),this.weaponsSystem.update(s,this.playerShip,this.remoteShips,(o,a,c)=>{this.timeSinceLastCombat=0,this.cockpit.triggerDamageFlash()}),this.powerUpSystem&&this.powerUpSystem.update(s,this.playerShip,o=>{this.onDeathNotice(o)});for(const[o,a]of this.network.peers.entries()){if(!o||typeof o!="string")continue;if(!this.remoteShips.has(o)){const l=(a==null?void 0:a.name)||`Pilot-${o.slice(0,4)}`,h=new lh(o,this.scene,l);this.remoteShips.set(o,h)}const c=this.remoteShips.get(o);c&&(a!=null&&a.lastState)&&c.receiveNetworkState(a.lastState),c&&c.update(s)}if(!this.playerShip.isDead)for(const c of this.remoteShips.values()){if(!c||c.isDead)continue;const l=this.playerShip.position,h=c.position,d=l.x-h.x,p=l.y-h.y,m=l.z-h.z,y=d*d+p*p+m*m;if(y<5.6*5.6&&y>1e-4){const g=Math.sqrt(y),f=d/g,u=p/g,v=m/g,x=5.6-g;l.x+=f*x*.55,l.y+=u*x*.55,l.z+=v*x*.55,h.x-=f*x*.45,h.y-=u*x*.45,h.z-=v*x*.45;const _=this.playerShip.velocity.clone().sub(c.velocity||new N),A=_.x*f+_.y*u+_.z*v;if(A<0){const R=-1.85*A*.5;if(this.playerShip.velocity.x+=f*R,this.playerShip.velocity.y+=u*R,this.playerShip.velocity.z+=v*R,c.velocity&&(c.velocity.x-=f*R,c.velocity.y-=u*R,c.velocity.z-=v*R),ot.playExplosion(.65,l),typeof c.triggerShieldFlash=="function"&&c.triggerShieldFlash(),this.playerShip.shipCollisionDebounceTimer<=0){const P=Math.abs(A),w=Math.round(Math.min(25,Math.max(8,P*.6)));this.playerShip.takeDamage(w),this.playerShip.shipCollisionDebounceTimer=.25,this.cockpit.triggerDamageFlash()}}}}if(this.timeSinceLastCombat+=s,this.network.peers.size>0&&this.timeSinceLastCombat>=30){if(this.beaconPulseTimer+=s,this.beaconPulseTimer>=3.5){this.beaconPulseTimer=0,this.beaconSystem.emitRipple(this.playerShip.position,54527);for(const o of this.remoteShips.values())o.isDead||this.beaconSystem.emitRipple(o.position,16724821);ot.playEngagementBeacon(),lt.log("BEACON",`Engagement beacon pulse emitted across sector (inactivity: ${Math.round(this.timeSinceLastCombat)}s)`)}}else this.beaconPulseTimer=0;if(this.trailEmitTimer+=s,this.trailEmitTimer>=.12){this.trailEmitTimer=0,this.playerShip.input.thrust&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1);for(const o of this.remoteShips.values())if(!o.isDead&&o.isThrusting){const a=new N(0,0,-1).applyQuaternion(o.quaternion);this.thrusterTrails.emit(o.position,a,!0)}}if(this.thrusterTrails.update(s),this.beaconSystem.update(s),this.meteorSystem&&this.meteorSystem.update(s,this.playerShip,this.remoteShips,o=>{this.cockpit.triggerDamageFlash(),this.onDeathNotice(o)}),this.netStatsTimer+=s,this.netStatsTimer>=5){this.netStatsTimer=0;const o=Array.from(this.network.peers.entries());if(o.length===0)lt.log("NET_STATS",`Connected Peers: 0 | Inactivity: ${Math.round(this.timeSinceLastCombat)}s | Master: ${this.network.isMaster}`);else{const a=o.map(([c,l])=>{const h=this.remoteShips.get(c),d=h?Math.round(this.playerShip.position.distanceTo(h.position)):"N/A",p=l.packetsReceived?(l.packetsReceived/5).toFixed(1):"0.0",m=Date.now()-(l.lastSeen||Date.now());l.packetsReceived=0;const y=h?`(${h.position.x.toFixed(1)}, ${h.position.y.toFixed(1)}, ${h.position.z.toFixed(1)})`:"N/A";return`Peer[${c.slice(0,5)}]: ${p} pkt/s, ping ${l.ping||0}ms, seen ${m}ms ago, dist ${d}u, pos ${y}, inScene: ${h?!!h.group.parent:!1}`}).join(" | ");lt.log("NET_STATS",`Peers (${o.length}): ${a}`)}}const r={thrust:this.playerShip.input.thrust,brake:this.playerShip.input.brake,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),pitch:(this.playerShip.input.pitchUp?1:0)-(this.playerShip.input.pitchDown?1:0)+this.playerShip.input.analogPitch,roll:(this.playerShip.input.rollRight?1:0)-(this.playerShip.input.rollLeft?1:0)};this.cockpit.update(s,r,this.playerShip.velocity),this.spaceEnv.update(s,this.playerShip.position,this.playerShip.velocity),this.broadcastTimer+=s,this.broadcastTimer>=this.broadcastInterval&&(this.broadcastTimer=0,this.network.broadcastLocalState({pos:{x:this.playerShip.position.x,y:this.playerShip.position.y,z:this.playerShip.position.z},quat:{x:this.playerShip.quaternion.x,y:this.playerShip.quaternion.y,z:this.playerShip.quaternion.z,w:this.playerShip.quaternion.w},vel:{x:this.playerShip.velocity.x,y:this.playerShip.velocity.y,z:this.playerShip.velocity.z},thrust:this.playerShip.input.thrust,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),hp:this.playerShip.hp,shield:this.playerShip.shield,isDead:this.playerShip.isDead,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,isInvisible:this.playerShip.isInvisible})),this.renderer.render(this.scene,this.camera),this.onHudUpdate({hp:this.playerShip.hp,maxHp:this.playerShip.maxHp,shield:Math.round(this.playerShip.shield),maxShield:this.playerShip.maxShield,speed:Math.round(this.playerShip.getSpeed()),maxSpeed:Math.round(this.playerShip.maxSpeed),laserEnergy:Math.round(this.weaponsSystem.laserEnergy),laserMaxEnergy:this.weaponsSystem.laserMaxEnergy,laserRecharging:this.weaponsSystem.laserCooldownTimer<=0&&this.weaponsSystem.laserEnergy<this.weaponsSystem.laserMaxEnergy,missileLocked:this.weaponsSystem.lockSystem.isLocked,missileLockProgress:this.weaponsSystem.lockSystem.getProgress(),missileTarget:this.weaponsSystem.lockSystem.targetScreenPos,storedPowerUp:this.playerShip.storedPowerUp,cannonEnergy:Math.round(this.weaponsSystem.cannonEnergy),cannonMaxEnergy:this.weaponsSystem.cannonMaxEnergy,cannonRecharging:this.weaponsSystem.cannonCooldownTimer<=0&&this.weaponsSystem.cannonEnergy<this.weaponsSystem.cannonMaxEnergy,isShieldBroken:this.playerShip.isShieldBroken,isInvisible:this.playerShip.isInvisible,hasHologramDecoy:this.playerShip.hasHologramDecoy,alivePilotsCount:[this.playerShip,...this.remoteShips.values()].filter(o=>!o.isDead).length,isDead:this.playerShip.isDead,respawnCountdown:Math.ceil(this.playerShip.respawnTimer),invulnerable:this.playerShip.invulnerableTimer>0,boostReady:this.playerShip.boostCooldownTimer<=0,boostCooldown:Math.ceil(this.playerShip.boostCooldownTimer),inactivityBeacon:this.network.peers.size>0&&this.timeSinceLastCombat>=30,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,activePeersCount:this.network.peers.size+1,isMaster:this.network.isMaster,masterId:this.network.currentMasterId,avgPing:this.network.getAveragePing()})}catch(e){lt.log("CRASH",`Render loop exception: ${e.message}
${e.stack}`)}}}destroy(){this.stop(),this.spaceEnv&&this.spaceEnv.destroy(),this.weaponsSystem&&this.weaponsSystem.cleanup(),this.thrusterTrails&&this.thrusterTrails.cleanup(),this.beaconSystem&&this.beaconSystem.cleanup(),this.meteorSystem&&this.meteorSystem.cleanup(),this.powerUpSystem&&this.powerUpSystem.cleanup(),this.renderer&&this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}class E_{constructor(e,t){this.container=e,this.engine=t,this.hudElement=null,this.isVoteActive=!1,this.createDom(),this.bindJoystick(),this.bindTouchControls(),this.bindFullscreen(),this.bindDiagnostics(),this.bindMapResetVoting();const n=document.getElementById("hud-room-title");n&&this.engine&&this.engine.network&&(n.textContent=this.engine.network.roomName||this.engine.network.roomId||"Orion Sector")}createDom(){this.hudElement=document.createElement("div"),this.hudElement.className="game-hud-overlay",this.hudElement.innerHTML=`
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
    `,this.container.appendChild(this.hudElement)}bindJoystick(){const e=document.getElementById("touch-joystick-container"),t=document.getElementById("joystick-base"),n=document.getElementById("joystick-knob");if(!e||!t||!n)return;const s=this.engine.playerShip.input,r=45;let o=null,a=!1;const c=(h,d)=>{const p=t.getBoundingClientRect(),m=p.left+p.width/2,y=p.top+p.height/2;let g=h-m,f=d-y;const u=Math.sqrt(g*g+f*f);u>r&&(g=g/u*r,f=f/u*r),n.style.transform=`translate(${g}px, ${f}px)`,s.analogPitch=-(f/r),s.analogYaw=-(g/r)},l=()=>{o=null,a=!1,n.style.transform="translate(0px, 0px)",s.analogPitch=0,s.analogYaw=0};e.addEventListener("touchstart",h=>{if(h.preventDefault(),h.stopPropagation(),o===null&&h.touches.length>0){const d=h.touches[0];o=d.identifier,c(d.clientX,d.clientY),lt.log("TOUCH",`Joystick touchstart at (${Math.round(d.clientX)}, ${Math.round(d.clientY)})`)}},{passive:!1}),e.addEventListener("touchmove",h=>{if(h.preventDefault(),h.stopPropagation(),o!==null){for(let d=0;d<h.touches.length;d++)if(h.touches[d].identifier===o){c(h.touches[d].clientX,h.touches[d].clientY);break}}},{passive:!1}),e.addEventListener("touchend",h=>{h.preventDefault(),l()},{passive:!1}),e.addEventListener("touchcancel",h=>{l()},{passive:!1}),e.addEventListener("pointerdown",h=>{h.pointerType!=="touch"&&(h.preventDefault(),a=!0,c(h.clientX,h.clientY))}),window.addEventListener("pointermove",h=>{a&&c(h.clientX,h.clientY)}),window.addEventListener("pointerup",()=>{a&&l()})}bindTouchControls(){const e=this.engine.playerShip.input,t=(a,c,l)=>{const h=document.getElementById(a);if(!h)return;let d=!1;const p=y=>{y&&(y.preventDefault(),y.stopPropagation()),!d&&(d=!0,c(),h.classList.add("active"),lt.log("INPUT",`Button [${a}] ACTIVATED`))},m=y=>{d&&(d=!1,l(),h.classList.remove("active"),lt.log("INPUT",`Button [${a}] RELEASED`))};h.addEventListener("touchstart",p,{passive:!1}),h.addEventListener("touchend",m,{passive:!1}),h.addEventListener("touchcancel",m,{passive:!1}),h.addEventListener("pointerdown",y=>{y.pointerType!=="touch"&&p(y)}),h.addEventListener("pointerup",m),h.addEventListener("pointerleave",m),window.addEventListener("pointerup",m)};t("btn-roll-left",()=>e.rollLeft=!0,()=>e.rollLeft=!1),t("btn-roll-right",()=>e.rollRight=!0,()=>e.rollRight=!1),t("btn-strafe-left",()=>{ot.playStrafeBurst(),e.strafeLeft=!0},()=>e.strafeLeft=!1),t("btn-strafe-right",()=>{ot.playStrafeBurst(),e.strafeRight=!0},()=>e.strafeRight=!1),t("btn-thrust",()=>{this.engine.triggerBoostAction(),e.thrust=!0},()=>e.thrust=!1),t("btn-brake",()=>e.brake=!0,()=>e.brake=!1),t("btn-laser",()=>this.engine.isFiringLaser=!0,()=>this.engine.isFiringLaser=!1);const n=document.getElementById("btn-missile");if(n){const a=c=>{c&&(c.preventDefault(),c.stopPropagation()),this.engine.weaponsSystem.triggerSecondary(!0,this.engine.playerShip,performance.now())};n.addEventListener("click",a),n.addEventListener("touchstart",a,{passive:!1})}const s=document.getElementById("btn-special");if(s){const a=c=>{c&&(c.preventDefault(),c.stopPropagation());const l=this.engine.playerShip.useSpecialPowerUp(this.engine);l&&this.showCombatMessage(l.message)};s.addEventListener("click",a),s.addEventListener("touchstart",a,{passive:!1})}const r=document.getElementById("hud-btn-copy");r&&r.addEventListener("click",()=>{const a=window.location.origin+window.location.pathname+`?room=${encodeURIComponent(this.engine.network.roomId)}`;navigator.clipboard.writeText(a).then(()=>{r.textContent="✅ Copied!",setTimeout(()=>r.textContent="📋 Invite",2e3)}).catch(()=>{prompt("Share this match link:",a)})});const o=document.getElementById("hud-btn-leave");o&&o.addEventListener("click",()=>{confirm("Leave current match and return to lobby?")&&(window.location.href=window.location.origin+window.location.pathname)})}bindDiagnostics(){const e=document.getElementById("hud-btn-diag"),t=document.getElementById("hud-diag-backdrop"),n=document.getElementById("btn-close-diag"),s=document.getElementById("btn-copy-diag-text"),r=document.getElementById("diag-text-display");!e||!t||(e.addEventListener("click",()=>{r&&(r.textContent=lt.generateDiagnosticReport()),t.style.display="flex"}),n&&n.addEventListener("click",()=>{t.style.display="none"}),s&&s.addEventListener("click",async()=>{await lt.copyToClipboard(),s.textContent="✅ Copied to Clipboard!",setTimeout(()=>{s.textContent="📋 Copy Log to Clipboard"},2500)}))}bindFullscreen(){const e=document.getElementById("hud-btn-fullscreen"),t=document.getElementById("btn-rotate-fullscreen"),n=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement){const r=document.documentElement;r.requestFullscreen?r.requestFullscreen().catch(()=>{}):r.webkitRequestFullscreen&&r.webkitRequestFullscreen();try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}else document.exitFullscreen?document.exitFullscreen().catch(()=>{}):document.webkitExitFullscreen&&document.webkitExitFullscreen()};e&&e.addEventListener("click",n),t&&t.addEventListener("click",n);const s=()=>{const r=!!(document.fullscreenElement||document.webkitFullscreenElement);e&&(e.textContent=r?"⛶ Exit":"⛶ Fullscreen")};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}bindMapResetVoting(){const e=document.getElementById("hud-btn-reset-map"),t=document.getElementById("hud-vote-banner"),n=document.getElementById("btn-vote-accept"),s=document.getElementById("btn-vote-decline"),r=document.getElementById("hud-vote-countdown"),o=document.getElementById("hud-vote-info"),a=document.getElementById("hud-vote-tally");e&&e.addEventListener("click",()=>{if(this.engine){const c=this.engine.requestMapResetVote();c&&c.error&&this.showCombatMessage(`⚠️ ${c.error}`)}}),n&&n.addEventListener("click",()=>{this.engine&&this.engine.castMapResetVote(!0)}),s&&s.addEventListener("click",()=>{this.engine&&this.engine.castMapResetVote(!1)}),window.addEventListener("keydown",c=>{this.isVoteActive&&(c.code==="KeyY"?(this.engine&&this.engine.castMapResetVote(!0),c.preventDefault()):c.code==="KeyN"&&(this.engine&&this.engine.castMapResetVote(!1),c.preventDefault()))}),this.engine&&this.engine.network&&this.engine.network.onMapResetVote(c=>{t&&(c.active?(this.isVoteActive=!0,t.style.display="flex",r&&(r.textContent=`${c.remainingTime}s`),o&&(o.textContent=`Initiated by ${c.initiatorName||"Host"}`),a&&(a.textContent=`Votes: ${c.yesCount}/${c.totalPeers} agreed (${c.remainingTime}s left)`)):(this.isVoteActive=!1,t.style.display="none"))})}showCombatMessage(e){const t=document.getElementById("hud-combat-feed");if(!t)return;const n=document.createElement("div");n.className="combat-feed-item",n.textContent=e,t.appendChild(n),setTimeout(()=>{n.classList.add("fade-out"),setTimeout(()=>n.remove(),400)},3500)}update(e){const t=document.getElementById("hud-room-title");t&&(t.textContent=this.engine.network.roomName||"Orion Sector");const n=document.getElementById("hud-peers-count");n&&(n.textContent=`👥 ${e.activePeersCount} Pilot${e.activePeersCount===1?"":"s"}`);const s=document.getElementById("hud-ping-val");s&&(s.textContent=`📡 ${e.avgPing}ms`);const r=document.getElementById("hud-shield-bar"),o=document.getElementById("hud-shield-num"),a=Math.round((e.shield!==void 0?e.shield:100)/(e.maxShield||100)*100);r&&(r.style.width=`${a}%`),o&&(o.textContent=`${a}%`);const c=document.getElementById("hud-hp-bar"),l=document.getElementById("hud-hp-num"),h=Math.round(e.hp/e.maxHp*100);c&&(c.style.width=`${h}%`,c.className=h>35?"gauge-bar-fill bar-hp":"gauge-bar-fill bar-hp bar-hp-critical"),l&&(l.textContent=`${h}%`);const d=document.getElementById("hud-beacon-pill");d&&(d.style.display=e.inactivityBeacon?"inline-flex":"none");const p=document.getElementById("hud-shield-status");p&&(e.invulnerable?(p.textContent="🛡️ INVULNERABLE",p.style.color="#00ffff"):e.hp<=35?(p.textContent="CRITICAL",p.style.color="#ff3344"):(p.textContent="ACTIVE",p.style.color="#00ff88"));const m=document.getElementById("hud-score-val");m&&(m.textContent=e.score);const y=document.getElementById("hud-kills-val");y&&(y.textContent=e.kills);const g=document.getElementById("hud-deaths-val");g&&(g.textContent=e.deaths);const f=document.getElementById("hud-speed-val");f&&(f.textContent=e.speed);const u=document.getElementById("hud-boost-badge"),v=document.getElementById("btn-thrust");u&&(e.boostReady?(u.textContent="⚡ BOOST",u.className="hud-boost-badge ready",v&&v.classList.add("boost-ready")):(u.textContent=`${e.boostCooldown}s`,u.className="hud-boost-badge cooling",v&&v.classList.remove("boost-ready")));const x=document.getElementById("hud-alive-val");x&&e.alivePilotsCount!==void 0&&(x.textContent=e.alivePilotsCount);const _=document.getElementById("hud-shield-title");_&&(e.isShieldBroken?(_.textContent="SHIELD [BROKEN]",_.style.color="#ff3344"):(_.textContent="SHIELD",_.style.color="#00ffff"));const A=document.getElementById("hud-laser-bar"),T=document.getElementById("hud-laser-pct"),R=Math.max(0,Math.min(100,Math.round(e.laserEnergy!==void 0?e.laserEnergy:100)));A&&(A.style.width=`${R}%`),T&&(T.textContent=`${R}%`);const P=document.getElementById("hud-missile-bar"),w=document.getElementById("hud-missile-pct"),M=document.getElementById("btn-missile"),D=document.getElementById("btn-missile-text"),G=document.getElementById("btn-missile-status"),S=e.missileLockProgress||0,L=!!e.missileLocked;if(P&&(P.style.width=`${Math.round(S*100)}%`,P.className=L?"gauge-bar-fill bar-missile locked":"gauge-bar-fill bar-missile"),w&&(L?(w.textContent="LOCKED",w.style.color="#ff3344"):S>0?(w.textContent=`${Math.round(S*100)}%`,w.style.color="#ffcc00"):(w.textContent="DUMB-FIRE",w.style.color="#00ffff")),M)if(L)M.classList.add("missile-locked"),D&&(D.textContent="MISSILE [LOCKED]"),G&&(G.textContent="🎯 [LOCKED - GUIDED]");else if(S>0){M.classList.remove("missile-locked"),D&&(D.textContent="LOCKING...");const oe=(3*(1-S)).toFixed(1);G&&(G.textContent=`${Math.round(S*100)}% (${oe}s)`)}else M.classList.remove("missile-locked"),D&&(D.textContent="MISSILE [DUMB-FIRE]"),G&&(G.textContent="[DUMB-FIRE / AIM 3s]");const F=document.getElementById("btn-special"),I=document.getElementById("btn-special-icon"),z=document.getElementById("btn-special-text"),O=document.getElementById("btn-special-desc");F&&(e.storedPowerUp?(F.classList.remove("disabled"),F.classList.add("ready"),F.style.setProperty("--powerup-glow",e.storedPowerUp.color||"#00ffff"),I&&(I.textContent=e.storedPowerUp.icon||"✨"),z&&(z.textContent=e.storedPowerUp.name||"SPECIAL"),O&&(O.textContent="[USE (KEY R)]")):(F.classList.add("disabled"),F.classList.remove("ready"),F.style.removeProperty("--powerup-glow"),I&&(I.textContent="✨"),z&&(z.textContent="SPECIAL"),O&&(O.textContent="[EMPTY]")));const U=document.getElementById("hud-missile-lock-box"),B=document.getElementById("hud-lock-label");if(U&&B){const oe=e.missileTarget;oe&&oe.inFront&&S>0?(U.style.display="block",U.style.left=`${oe.x}%`,U.style.top=`${oe.y}%`,L?(U.className="hud-missile-lock-box locked",B.textContent=`🎯 LOCKED [${oe.dist}u]`):(U.className="hud-missile-lock-box tracking",B.textContent=`TRACKING ${Math.round(S*100)}% [${oe.dist}u]`)):U.style.display="none"}const Z=document.getElementById("hud-cannon-bar"),le=document.getElementById("hud-cannon-pct");Z&&(Z.style.width=`${e.cannonEnergy||0}%`),le&&(le.textContent=`${e.cannonEnergy||0}%`);const fe=document.getElementById("hud-powerup-badge");fe&&(e.isInvisible?(fe.style.display="inline-flex",fe.textContent="👁️ CLOAKED",fe.className="hud-powerup-badge cloak"):e.hasHologramDecoy?(fe.style.display="inline-flex",fe.textContent="👥 DECOY ARMED",fe.className="hud-powerup-badge decoy"):fe.style.display="none");const X=document.getElementById("hud-respawn-overlay"),Q=document.getElementById("hud-respawn-counter");X&&Q&&(e.isDead?(X.style.display="flex",Q.textContent=`Respawning in ${e.respawnCountdown}s...`):X.style.display="none")}destroy(){this.hudElement&&this.hudElement.parentNode&&this.hudElement.parentNode.removeChild(this.hudElement)}}const jo=document.getElementById("app"),hh=["Nebula-Orion","Andromeda-Deep","Centauri-Prime","Cygnus-Rift","Cassiopeia-Void","Pegasus-Belt","Vela-Pulsar","Perseus-Arm"];function uh(){const i=hh[Math.floor(Math.random()*hh.length)],e=Math.floor(100+Math.random()*900);return`${i}-${e}`}class T_{constructor(){this.currentMode="lobby",this.engine=null,this.network=null,this.hud=null,this.playerName=localStorage.getItem("rockets_pilot_name")||`Pilot-${Math.floor(1e3+Math.random()*9e3)}`,this.init()}init(){const t=new URLSearchParams(window.location.search).get("room");t?this.startMatch({roomId:t,roomName:t,mapSeed:Math.abs(this.hashCode(t))}):this.renderLobby()}hashCode(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n),t|=0;return t}renderLobby(){this.currentMode="lobby",jo.innerHTML=`
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
              <input type="text" id="sector-name-input" class="lobby-input" value="${uh()}" />
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
    `;const e=document.getElementById("pilot-name-input");e&&e.addEventListener("input",h=>{this.playerName=h.target.value.trim()||"Pilot",localStorage.setItem("rockets_pilot_name",this.playerName)});let t=window.__pwaDeferredPrompt;const n=document.getElementById("pwa-install-banner"),s=document.getElementById("btn-pwa-install");t&&n&&(n.style.display="flex"),window.addEventListener("beforeinstallprompt",h=>{h.preventDefault(),window.__pwaDeferredPrompt=h,n&&(n.style.display="flex")}),s&&s.addEventListener("click",()=>{const h=window.__pwaDeferredPrompt;h&&(h.prompt(),h.userChoice.then(()=>{n&&(n.style.display="none")}))});const r=document.getElementById("btn-create-match"),o=document.getElementById("sector-name-input");r&&r.addEventListener("click",()=>{const h=o.value.trim()||uh(),d=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:d,roomName:h,mapSeed:Math.abs(this.hashCode(d))})});const a=document.getElementById("btn-direct-join"),c=document.getElementById("join-room-input");a&&a.addEventListener("click",()=>{const h=c.value.trim();if(!h){alert("Please enter a Room Code or Sector ID to join.");return}const d=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:d,roomName:h,mapSeed:Math.abs(this.hashCode(d))})});const l=document.getElementById("btn-refresh-rooms");l&&l.addEventListener("click",()=>{di.refreshRooms()}),di.init(),di.onRoomsUpdated(h=>{this.updateRoomsListUI(h)})}updateRoomsListUI(e){const t=document.getElementById("rooms-list-container");if(!t)return;if(!e||e.length===0){t.innerHTML='<div class="rooms-empty">No active matches found. Click <strong>LAUNCH SECTOR</strong> above to host one!</div>';return}t.innerHTML=e.map(s=>`
      <div class="room-list-item">
        <div class="room-item-meta">
          <span class="room-item-name">🛰️ ${Ko(s.roomName||s.roomId)}</span>
          <div class="room-item-details">
            <span>👥 ${s.playerCount||1} Pilot${s.playerCount===1?"":"s"}</span>
            <span>👑 Host: Pilot-${(s.masterId||"Host").slice(0,4)}</span>
            <span class="room-ttl-badge">⏳ TTL: ${s.ttlSecondsRemaining}s</span>
          </div>
        </div>
        <button class="btn-join-room-item" data-room-id="${Ko(s.roomId)}" data-room-name="${Ko(s.roomName||s.roomId)}" data-seed="${s.mapSeed||42}">
          JOIN SECTOR
        </button>
      </div>
    `).join(""),t.querySelectorAll(".btn-join-room-item").forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-room-id"),o=s.getAttribute("data-room-name"),a=parseInt(s.getAttribute("data-seed"),10)||42;this.startMatch({roomId:r,roomName:o,mapSeed:a})})})}startMatch({roomId:e,roomName:t,mapSeed:n}){this.currentMode="game",jo.innerHTML="";const s=document.createElement("div");s.id="game-canvas-container",s.style.width="100%",s.style.height="100%",s.style.position="relative",s.style.overflow="hidden",jo.appendChild(s);const r=`${window.location.pathname}?room=${encodeURIComponent(e)}`;window.history.pushState({path:r},"",r),this.network=new Qf({roomId:e,roomName:t,mapSeed:n,playerName:this.playerName,onCombatLog:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.engine=new w_({container:s,network:this.network,mapSeed:n,onHudUpdate:o=>{this.hud&&this.hud.update(o)},onDeathNotice:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.hud=new E_(s,this.engine);try{this.network.join()}catch(o){console.error("[Network] joinRoom exception:",(o==null?void 0:o.message)||o)}this.engine.start()}}function Ko(i){return i?i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}new T_;
//# sourceMappingURL=index-CaaGsL_6.js.map
