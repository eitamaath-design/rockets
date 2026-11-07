var Yu=Object.defineProperty;var ju=(n,e,t)=>e in n?Yu(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var It=(n,e,t)=>ju(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();/*! noble-secp256k1 - MIT License (c) 2019 Paul Miller (paulmillr.com) */const qa=Object.freeze,Wn=0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2fn,Os=0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141n,hh=0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798n,uh=0x483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n,Ku=qa({p:Wn,n:Os,h:1n,a:0n,b:7n,Gx:hh,Gy:uh}),en=32,Sc=n=>n instanceof Uint8Array||ArrayBuffer.isView(n)&&n.constructor.name==="Uint8Array"&&n.BYTES_PER_ELEMENT===1,Xt=(n,e,t="")=>{if(Sc(n)&&(e===void 0||n.length===e))return n;const i=Sc(n),s=e!==void 0?` of length ${e}`:"",r=i?`length=${n.length}`:`type=${typeof n}`,o=(t?`"${t}" `:"")+"expected Uint8Array"+s+", got "+r;throw i?new RangeError(o):new TypeError(o)},Zu=n=>Uint8Array.from(n),Ju=(n,e,t)=>Zu(Xt(n,t,e)),dh=(n,e)=>n.toString(16).padStart(e,"0"),fh=n=>{let e="";for(const t of Xt(n))e+=dh(t,2);return e},ph=n=>{const e="hex invalid";if(typeof n!="string")throw new TypeError(e);if(n.length%2||!/^[\da-f]*$/i.test(n))throw new RangeError(e);const t=new Uint8Array(n.length/2);for(let i=0,s=0;i<t.length;i++,s+=2){const r=n.charCodeAt(s),o=n.charCodeAt(s+1);t[i]=((r&15)+(r>>6)*9)*16+(o&15)+(o>>6)*9}return t},Ec=()=>{var e;const n=(e=globalThis==null?void 0:globalThis.crypto)==null?void 0:e.subtle;if(n)return n;throw new Error("crypto.subtle must be defined, consider polyfill")},qi=(...n)=>{let e=0;for(const s of n)e+=Xt(s).length;const t=new Uint8Array(e);let i=0;for(const s of n)t.set(s,i),i+=s.length;return t},$a=(n=en)=>{const e=globalThis==null?void 0:globalThis.crypto;if(typeof(e==null?void 0:e.getRandomValues)!="function")throw new Error("crypto.getRandomValues must be defined, consider polyfill");return e.getRandomValues(new Uint8Array(n))},Qu=BigInt,Bs=(n,e,t,i="bad number: out of range")=>{if(typeof n!="bigint")throw new TypeError(i);if(e<=n&&n<t)return n;throw new RangeError(i)},Ae=(n,e=Wn)=>(n%=e)>=0n?n:e+n,kr=n=>Ae(n,Os),ed=(n,e)=>{if(n===0n)throw new Error("invert: expected non-zero number");if(e<=1n)throw new Error("invert: expected modulus > 1, got "+e);let t=Ae(n,e),i=e,s=0n,r=1n;for(;t!==0n;){const a=i/t,c=i-t*a,l=s-r*a;i=t,t=c,s=r,r=l}if(i!==1n)throw new Error("invert: does not exist");return Ae(s,e)},mh=n=>{const e=sd[n];if(typeof e!="function")throw new Error("hashes."+n+" not set");return e},wc=(n,e,t)=>Xt(mh(n)(e,t),en,"digest"),Tc=async(n,e,t)=>Xt(await mh(n)(e,t),en,"digest"),Qr=n=>{if(n instanceof Yn)return n;throw new TypeError("Point expected")},eo="bad point: not on curve",gh=n=>Ae(Ae(n*n)*n+7n),bc=n=>Bs(n,0n,Wn),ws=n=>Bs(n,1n,Wn),_h=n=>Bs(n,1n,Os),zr=n=>!(n&1n),td=n=>Uint8Array.of(zr(n)?2:3),vh=n=>{const e=gh(ws(n));let t=1n;for(let i=e,s=(Wn+1n)/4n;s>0n;s>>=1n)s&1n&&(t=t*i%Wn),i=i*i%Wn;if(Ae(t*t)!==e)throw new Error("sqrt invalid");return new Yn(n,zr(t)?t:Ae(-t),1n)},Sn=class Sn{constructor(e,t,i){It(this,"X");It(this,"Y");It(this,"Z");this.X=bc(e),this.Y=ws(t),this.Z=bc(i),qa(this)}static CURVE(){return Ku}static fromAffine(e){const{x:t,y:i}=e;return t===0n&&i===0n?Ts:new Sn(t,i,1n)}static fromBytes(e){Xt(e);const t=e.length,i=e[0],s=Lr(e,1,33);try{if(t===33&&(i===2||i===3)){const r=vh(s);return i===3?r.negate():r}if(t===65&&i===4)return new Sn(s,Lr(e,33,65),1n).assertValidity()}catch{throw new Error(eo)}throw new Error(eo)}static fromHex(e){return Sn.fromBytes(ph(e))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){const{X:t,Y:i,Z:s}=this,{X:r,Y:o,Z:a}=Qr(e);return Ae(t*a)===Ae(r*s)&&Ae(i*a)===Ae(o*s)}is0(){return this.Z===0n}negate(){return new Sn(this.X,Ae(-this.Y),this.Z)}double(){return this.add(this)}add(e){const{X:t,Y:i,Z:s}=this,{X:r,Y:o,Z:a}=Qr(e),c=0n,l=7n;let h=0n,u=0n,f=0n;const m=Ae(l*3n);let g=Ae(t*r),v=Ae(i*o),p=Ae(s*a),d=Ae(t+i),_=Ae(r+o);d=Ae(d*_),_=Ae(g+v),d=Ae(d-_),_=Ae(t+s);let y=Ae(r+a);return _=Ae(_*y),y=Ae(g+p),_=Ae(_-y),y=Ae(i+s),h=Ae(o+a),y=Ae(y*h),h=Ae(v+p),y=Ae(y-h),f=Ae(c*_),h=Ae(m*p),f=Ae(h+f),h=Ae(v-f),f=Ae(v+f),u=Ae(h*f),v=Ae(g+g),v=Ae(v+g),p=Ae(c*p),_=Ae(m*_),v=Ae(v+p),p=Ae(g-p),p=Ae(c*p),_=Ae(_+p),g=Ae(v*_),u=Ae(u+g),g=Ae(y*_),h=Ae(d*h),h=Ae(h-g),g=Ae(d*v),f=Ae(y*f),f=Ae(f+g),new Sn(h,u,f)}subtract(e){return this.add(Qr(e).negate())}multiply(e,t=!0){if(!t&&e===0n)return Ts;if(_h(e),e===1n)return this;if(this.equals(di))return dd(e).p;let i=Ts,s=di,r=this;for(let o=0;t?o<256:e>0n;o++)e&1n?i=i.add(r):t&&(s=s.add(r)),r=r.double(),e>>=1n;return i}multiplyUnsafe(e){return this.multiply(e,!1)}toAffine(){const{X:e,Y:t,Z:i}=this;if(i===0n)return{x:0n,y:0n};if(i===1n)return{x:e,y:t};const s=ed(i,Wn);if(Ae(i*s)!==1n)throw new Error("inverse invalid");return{x:Ae(e*s),y:Ae(t*s)}}assertValidity(){const{x:e,y:t}=this.toAffine();if(ws(e),ws(t),Ae(t*t)!==gh(e))throw new Error(eo);return this}toBytes(e=!0){const{x:t,y:i}=this.assertValidity().toAffine(),s=Rn(t);return e?qi(td(i),s):qi(Uint8Array.of(4),s,Rn(i))}toHex(e){return fh(this.toBytes(e))}};It(Sn,"BASE"),It(Sn,"ZERO");let Yn=Sn;const di=new Yn(hh,uh,1n),Ts=new Yn(0n,1n,0n);Yn.BASE=di;Yn.ZERO=Ts;const nd=(n,e,t)=>di.multiply(e,!1).add(n.multiply(t,!1)).assertValidity(),_i=n=>Qu("0x"+(fh(n)||"0")),Lr=(n,e,t)=>_i(n.subarray(e,t)),Rn=n=>ph(dh(Bs(n,0n,2n**256n),en*2)),id=n=>{const e=_i(Xt(n,en,"secret key"));return Bs(e,1n,Os,"invalid secret key: outside of range")},Ac="SHA-256",sd={hmacSha256Async:async(n,e)=>{const t=Ec(),i=await t.importKey("raw",n,{name:"HMAC",hash:Ac},!1,["sign"]);return new Uint8Array(await t.sign("HMAC",i,e))},hmacSha256:void 0,sha256Async:async n=>new Uint8Array(await Ec().digest(Ac,n)),sha256:void 0},rd=n=>{if(n=n===void 0?$a(48):n,Xt(n),n.length<48||n.length>1024)throw new RangeError("expected 48-1024b");const e=Ae(_i(n),Os-1n);return Rn(e+1n)},od=n=>e=>{const t=rd(e);return{secretKey:t,publicKey:n(t)}},yh=n=>Uint8Array.from("BIP0340/"+n,e=>e.charCodeAt(0)),Yo=(n,...e)=>{const t=wc("sha256",yh(n));return wc("sha256",qi(t,t,...e))},jo=(n,...e)=>Tc("sha256Async",yh(n)).then(t=>Tc("sha256Async",qi(t,t,...e))),Ya=n=>{const e=id(n),t=di.multiply(e),{x:i,y:s}=t.assertValidity().toAffine(),r=zr(s)?e:kr(-e),o=Rn(i);return{d:r,px:o}},ja=n=>kr(_i(n)),xh=(...n)=>ja(Yo("challenge",...n)),Mh=async(...n)=>ja(await jo("challenge",...n)),Sh=n=>Ya(n).px,ad=od(Sh),Eh=(n,e,t)=>{const i=Ju(n,"message"),{px:s,d:r}=Ya(e);return{m:i,px:s,d:r,a:Xt(t,en)}},wh=n=>{const e=ja(n);if(e===0n)throw new Error("sign failed: k is zero");const{px:t,d:i}=Ya(Rn(e));return{rx:t,k:i}},Th=(n,e,t,i)=>qi(e,Rn(kr(n+t*i))),bh="invalid signature produced",cd=(n,e,t=$a(en))=>{const{m:i,px:s,d:r,a:o}=Eh(n,e,t),a=Rn(r^_i(Yo("aux",o))),{rx:c,k:l}=wh(Yo("nonce",a,s,i)),h=Th(l,c,xh(c,s,i),r);if(!Rh(h,i,s))throw new Error(bh);return h},ld=async(n,e,t=$a(en))=>{const{m:i,px:s,d:r,a:o}=Eh(n,e,t),a=Rn(r^_i(await jo("aux",o))),{rx:c,k:l}=wh(await jo("nonce",a,s,i)),h=Th(l,c,await Mh(c,s,i),r);if(!await Ch(h,i,s))throw new Error(bh);return h},hd=(n,e)=>n instanceof Promise?n.then(e):e(n),Ah=(n,e,t,i)=>{const s=Xt(n,64,"signature"),r=Xt(e,void 0,"message"),o=Xt(t,en,"publicKey");let a,c,l,h;try{const u=_i(o);a=vh(u),c=ws(Lr(s,0,en)),l=_h(Lr(s,en,64)),h=qi(Rn(c),o,r)}catch{return!1}return hd(i(h),u=>{try{const{x:f,y:m}=nd(a,l,kr(-u)).toAffine();return!(!zr(m)||f!==c)}catch{return!1}})},Rh=(n,e,t)=>Ah(n,e,t,xh),Ch=async(n,e,t)=>Ah(n,e,t,Mh),Ph=qa({keygen:ad,getPublicKey:Sh,sign:cd,verify:Rh,signAsync:ld,verifyAsync:Ch}),ud=()=>{const n=[];let e=di,t=e;for(let i=0;i<33;i++){t=e,n.push(t);for(let s=1;s<128;s++)t=t.add(e),n.push(t);e=t.double()}return n};let Rc;const Cc=(n,e)=>{const t=e.negate();return n?t:e},dd=n=>{const e=Rc||(Rc=ud());let t=Ts,i=di;for(let s=0;s<33;s++){let r=Number(n&255n);n>>=8n,r>128&&(r-=256,n+=1n);const o=s*128,a=o+Math.abs(r)-1,c=s%2!==0,l=r<0;r===0?i=i.add(Cc(c,e[o])):t=t.add(Cc(l,e[a]))}if(n!==0n)throw new Error("invalid wnaf");return{p:t,f:i}},{floor:Ko,min:fd,sin:pd}=Math,Et="Trystero",Ka=(n,e)=>Array(n).fill(void 0).map(e),md="0123456789AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz",vi=n=>Ka(n,()=>md[Ko(Math.random()*62)]??"").join(""),St=vi(20),yi=Promise.all.bind(Promise),Lh=typeof window<"u",{entries:$i,fromEntries:Dh,keys:Jt,values:yn}=Object,_t=()=>{},Ih="candidate",Ye=n=>(n!==null&&clearTimeout(n),null),Xe=n=>new Error(`${Et}: ${n}`),Yi=(n,e)=>n instanceof Error&&n.message?n.message:typeof n=="string"&&n?n:Ct(n??e),Gn=(n,e)=>n instanceof Error?n:Xe(Yi(n,e)),gd=new TextEncoder,_d=new TextDecoder,En=n=>gd.encode(n),ui=n=>_d.decode(n),Ls=n=>n.reduce((e,t)=>e+t.toString(16).padStart(2,"0"),""),ji=(...n)=>n.join("@"),vd=(n,e)=>{const t=[...n],i=()=>{const r=pd(e++)*1e4;return r-Ko(r)};let s=t.length;for(;s;){const r=Ko(i()*s--),o=t[s];t[s]=t[r],t[r]=o}return t},yd=(n,e,t,i=!1)=>{var s,r;return((s=n.relayConfig)==null?void 0:s.urls)||(i?vd(e,Uh(n.appId)):e).slice(0,((r=n.relayConfig)==null?void 0:r.redundancy)??t)},Ct=JSON.stringify,ks=n=>{try{return JSON.parse(n)}catch{throw Xe(`failed to parse JSON: ${n}`)}},Uh=(n,e=Number.MAX_SAFE_INTEGER)=>n.split("").reduce((t,i)=>t+i.charCodeAt(0),0)%e,Pc=3333,xd=6e4,cs={};let bs=null,As=null;const Md=()=>{bs||(bs=new Promise(n=>{As=n}).finally(()=>{As=null,bs=null}))},Sd=()=>{As==null||As()},Ed=(n,e,t)=>{const i={};let s=!1,r=!1,o,a=_t;i.isClosed=!1,i.ready=new Promise(l=>a=l);const c=()=>{if(i.isClosed)return;o=void 0,r=!1;const l=new WebSocket(n);l.onclose=()=>{if(i.isClosed||r)return;if(r=!0,bs){bs.then(c);return}const h=cs[n]??(cs[n]=Pc);o=setTimeout(c,Math.random()*h),cs[n]=fd(h*2,xd)},l.onmessage=h=>e(String(h.data)),i.socket=l,i.url=l.url,l.onopen=()=>{const h=s;s=!0,a(i),cs[n]=Pc,h&&(t==null||t())},i.send=h=>{l.readyState===1&&l.send(h)}};return i.close=()=>{i.isClosed=!0,o!==void 0&&(clearTimeout(o),o=void 0),i.socket.close()},c(),i},wd=n=>{const e={},t=new WeakMap,i=o=>{const a=t.get(o);if(!a)throw Xe("relay bookkeeping missing registration for relay client");return a},s=()=>{const o={},a=c=>o[c]??(o[c]={});return{forKey:a,forRelay:c=>a(i(c))}},r=(o,a)=>(e[o]=a,t.set(a,o),a);return{register:(o,a)=>{const c=e[o];return c||r(o,a())},keyOf:i,scoped:s,getSockets:()=>Dh($i(e).flatMap(([o,a])=>{const c=n(a);return c?[[o,c]]:[]}))}},Td=()=>{if(Lh){const n=new AbortController;return addEventListener("online",Sd,{signal:n.signal}),addEventListener("offline",Md,{signal:n.signal}),()=>n.abort()}return _t},Za="AES-GCM",to={},bd=n=>btoa(String.fromCharCode.apply(null,Array.from(new Uint8Array(n)))),Ad=n=>{const e=atob(n);return new Uint8Array(e.length).map((t,i)=>e.charCodeAt(i)).buffer},Vr=async(n,e)=>new Uint8Array(await crypto.subtle.digest(n,En(e))),Ki=async n=>to[n]??(to[n]=Array.from(await Vr("SHA-1",n)).map(e=>e.toString(36)).join("")),Rd=async(n,e,t)=>crypto.subtle.importKey("raw",await crypto.subtle.digest({name:"SHA-256"},En(`${n}:${e}:${t}`)),{name:Za},!1,["encrypt","decrypt"]),Cd=async(n,e)=>Ls(await Vr("SHA-256",`${Et}:${n}:${e}`)),Nh="$",Fh=",",Pd=async(n,e)=>{const t=crypto.getRandomValues(new Uint8Array(16));return t.join(Fh)+Nh+bd(await crypto.subtle.encrypt({name:Za,iv:t},await n,En(e)))},Ld=async(n,e)=>{const[t,i]=e.split(Nh);return ui(await crypto.subtle.decrypt({name:Za,iv:new Uint8Array((t==null?void 0:t.split(Fh).map(Number))??[])},await n,Ad(i??"")))},Dd=18e4;var Id=class{constructor(n){It(this,"makeOffer");It(this,"leased",new Map);It(this,"destroyed",!1);this.makeOffer=n}claimLeased(n){const e=this.leased.get(n);e&&(Ye(e),this.leased.delete(n))}reclaimLeased(n){this.leased.has(n)&&(this.claimLeased(n),n.destroy())}checkout(n,e,t){const i=async(s=!1)=>{if(this.destroyed)throw Xe("room left while preparing offer");const r=this.makeOffer();try{const o=await t(r);if(this.destroyed)throw Xe("room left while preparing offer");return e?(this.leased.set(r,setTimeout(()=>{this.leased.delete(r),r.destroy()},Dd)),{peer:r,offer:o,claim:()=>this.claimLeased(r),reclaim:()=>this.reclaimLeased(r)}):{peer:r,offer:o}}catch(o){if(r.destroy(),!s&&!this.destroyed)return i(!0);throw o}};return yi(Ka(n,()=>i()))}getOffers(n,e){return this.checkout(n,!0,e)}destroy(){this.destroyed=!0,this.leased.forEach((n,e)=>{Ye(n),e.destroy()}),this.leased.clear()}};const no=Xe("incorrect password for overlapping room"),Ud=(n,e,t)=>{const i=o=>Vr("SHA-256",`${o}:${n}:${e}:${t}`).then(Ls),s=async(o,a,c)=>{if(!n)return;if(c){const h=vi(36);await o({__trystero_pw:"challenge",c:h});const{data:u}=await a();if(!u||typeof u!="object"||u.__trystero_pw!=="response"||typeof u.h!="string")throw no;const f=await i(h);if(u.h!==f)throw no;return}const{data:l}=await a();if(!l||typeof l!="object"||l.__trystero_pw!=="challenge"||typeof l.c!="string")throw no;await o({__trystero_pw:"response",h:await i(l.c)})};return{run:s,compose:o=>n||o?async(a,c,l,h)=>{await s(c,l,h),await(o==null?void 0:o(a,c,l,h))}:void 0}},Nd=n=>{const e=Yi(n,"unknown error");return e.startsWith("handshake ")?e:`handshake failed: ${e}`},Fd=({onPeerHandshake:n,onHandshakeError:e,handshakeTimeoutMs:t,sendHandshakeData:i,sendHandshakeReady:s,onActivate:r,onFailure:o})=>{const a={},c=(u,f)=>{const m=a[u];!m||f&&m.peer!==f||m.isActive||!m.didLocalHandshakePass||!m.didReceiveRemoteReady||(m.isActive=!0,m.handshakeTimer=Ye(m.handshakeTimer),r(u,m.peer))},l=(u,f,m)=>{const g=a[u];if(!g||g.peer!==f)return;const v=Nd(m);e==null||e(u,v),o(u,f,Xe(v))},h=(u,f)=>{const m=a[u];!m||m.peer!==f||m.isActive||(m.didLocalHandshakePass=!0,s("",u).catch(g=>l(u,f,Xe(`failed sending handshake readiness: ${Yi(g,"unknown send failure")}`))),c(u,f))};return{addPeer:(u,f)=>{a[u]={peer:f,isActive:!1,didLocalHandshakePass:!1,didReceiveRemoteReady:!1,handshakeTimer:null,pendingHandshakePayloads:[],handshakeWaiters:[]}},clearPeer:(u,f)=>{const m=a[u];m&&(m.handshakeTimer=Ye(m.handshakeTimer),m.pendingHandshakePayloads.length=0,m.handshakeWaiters.splice(0).forEach(g=>g.reject(f)),delete a[u])},canReceiveFromPeer:(u,f)=>{const m=a[u];return!!(m&&(m.isActive||f))},start:(u,f)=>{const m=a[u];if(!m||m.peer!==f)return;m.handshakeTimer=setTimeout(()=>l(u,f,Xe(`handshake timed out after ${t}ms`)),t);const g=async(d,_)=>{await i(d,u,_)},v=()=>new Promise((d,_)=>{const y=a[u];if(!y||y.peer!==f){_(Xe("peer disconnected during handshake"));return}const x=y.pendingHandshakePayloads.shift();if(x){d(x);return}y.handshakeWaiters.push({resolve:d,reject:C=>_(C)})}),p=St<u;Promise.resolve(n==null?void 0:n(u,g,v,p)).then(()=>h(u,f)).catch(d=>l(u,f,Gn(d,"handshake failed")))},receiveHandshakeData:(u,f,m)=>{const g=a[f];if(!g||g.isActive)return;const v=m===void 0?{data:u}:{data:u,metadata:m},p=g.handshakeWaiters.shift();if(p){p.resolve(v);return}if(g.pendingHandshakePayloads.length>=16){l(f,g.peer,Xe("too many pending handshake messages"));return}g.pendingHandshakePayloads.push(v)},receiveHandshakeReady:u=>{const f=a[u];!f||f.isActive||(f.didReceiveRemoteReady=!0,c(u))}}},Oh=16384,Zo=1e4,Dr=12e4,Od=15e3,Bd=150,kd=5e3,Lc="icecandidate",Dc="icegatheringstatechange",zd="iceconnectionstatechange",ls="offer",Vd="answer",Hd=/out of range/i,Gd=128,Wd=8192,Ic=n=>n.replace(/ (\S+\.local) (\d+) typ host/g," 127.0.0.1 $2 typ host");var Uc=(n,{trickleIce:e,rtcConfig:t,rtcPolyfill:i,turnConfig:s,_test_only_mdnsHostFallbackToLoopback:r})=>{const o=new(i??RTCPeerConnection)({iceServers:Nc.concat(s??[]),...t}),a={},c=new Set,l=[],h=[];let u=null;const f=e!==!1,m=[],g=[];let v,p=!1,d=!1,_=null,y=null,x=!1;const C=Y=>{v&&(v(Y),v=void 0)},b=()=>y=Ye(y),R=()=>{var Y;x||(x=!0,c.forEach(Q=>Q()),u=Ye(u),h.length=0,b(),(Y=a.close)==null||Y.call(a))},D=Y=>{Y.type===ls&&(C(Y),!a.signal&&!o.remoteDescription)||(a.signal?a.signal(Y):l.push(Y))},w=Y=>{const Q=a.signal;a.signal=ue=>{Q==null||Q(ue),Y(ue)},l.length>0&&l.splice(0).forEach(ue=>{var U;return(U=a.signal)==null?void 0:U.call(a,ue)})},M=Y=>r?Ic(Y):Y,I=Y=>{if(!r||typeof Y.candidate!="string")return Y;const Q=Ic(Y.candidate);return Q===Y.candidate?Y:{...Y,candidate:Q}},W=Y=>{var Q,ue;return{type:((Q=Y.localDescription)==null?void 0:Q.type)??ls,sdp:M(((ue=Y.localDescription)==null?void 0:ue.sdp)??"")}},S=()=>{var Q,ue;const Y=(Q=o.remoteDescription)==null?void 0:Q.sdp;return Y?((ue=Y.match(/a=ice-ufrag:([^\s]+)/))==null?void 0:ue[1])??null:null},L=()=>{var Y,Q;return(((Q=(Y=o.remoteDescription)==null?void 0:Y.sdp)==null?void 0:Q.match(/^m=/gm))??[]).length},N=Y=>{if(!o.remoteDescription)return!1;const Q=L();if(typeof Y.sdpMLineIndex=="number"&&Q>0&&Y.sdpMLineIndex>=Q)return!1;const ue=S();return!(ue&&Y.usernameFragment&&Y.usernameFragment!==ue)},P=async Y=>{try{return await o.addIceCandidate(Y),!0}catch(Q){if(Q instanceof Error&&Hd.test(Q.message)&&typeof Y.sdpMLineIndex=="number")return!1;throw Q}},z=Y=>{m.length>=Gd&&m.shift(),m.push(Y)},B=async()=>{if(!o.remoteDescription||m.length===0)return;const Y=S(),Q=m.splice(0),ue=[];for(const U of Q)if(!(Y&&U.usernameFragment&&U.usernameFragment!==Y)){if(!N(U)){ue.push(U);continue}await P(U)||ue.push(U)}ue.forEach(z)},F=async Y=>{if(N(Y)){await P(Y)||z(Y);return}z(Y)},k=Y=>{Y.binaryType="arraybuffer",Y.bufferedAmountLowThreshold=65535;const Q=()=>{console.warn(`${Et}: invalid or excessive data before handler registration; disconnecting peer`),Y.close(),o.close(),R()};Y.onmessage=ue=>{const U=ue.data;if(!x){if(!(U instanceof ArrayBuffer)&&!ArrayBuffer.isView(U)||U.byteLength>16515){Q();return}if(a.data)a.data(U);else{if(h.length>=64){Q();return}u||(u=setTimeout(Q,Zo)),h.push(U)}}},Y.onopen=()=>{var ue;return(ue=a.connect)==null?void 0:ue.call(a)},Y.onclose=R,Y.onerror=({error:ue})=>{var U;x||(ue==null?void 0:ue.errorDetail)==="sctp-failure"&&(ue.sctpCauseCode===12||/^User-Initiated Abort\b/.test(ue.message))||(U=a.error)==null||U.call(a,Gn(ue,"data channel error"))}},Z=(t==null?void 0:t.iceServers)??Nc.concat(s??[]),he=Y=>Z.some(({urls:Q})=>(Array.isArray(Q)?Q:[Q]).some(ue=>Y.test(ue))),Me=he(/^turns?:/i),X=!Me&&he(/^stuns?:/i),te=Me?/\btyp relay\b/:X?/\btyp (?:srflx|relay|prflx)\b/:/\btyp (?:host|srflx|relay|prflx)\b/,le=async Y=>(await new Promise(Q=>{let ue=null,U=null;const Ne=()=>{Ye(ue),Ye(U),Y.removeEventListener(Dc,Oe),Y.removeEventListener(Lc,Se),c.delete(Ne),Q()},Ue=(Ee="")=>{var A;const me=`${((A=Y.localDescription)==null?void 0:A.sdp)??""}
${Ee}`;te.test(me)&&(Ye(U),U=setTimeout(Ne,Bd))},Oe=()=>{Y.iceGatheringState==="complete"||x?Ne():Ue()},Se=Ee=>{const{candidate:me}=Ee;me?Ue(me.candidate):Ne()};c.add(Ne),ue=setTimeout(Ne,Od),Y.addEventListener(Dc,Oe),Y.addEventListener(Lc,Se),Oe()}),W(Y)),ae=async()=>{const Y=f?W(o):await le(o);return x||D(Y),Y};n?(_=o.createDataChannel("data"),k(_)):o.ondatachannel=({channel:Y})=>{_=Y,k(Y)};const Re=async(Y=!1)=>{var Q,ue;if(o.connectionState==="closed"||!Y&&(p||o.signalingState!=="stable")){o.connectionState==="closed"&&C();return}try{return p=!0,Y&&(o.remoteDescription&&o.signalingState!=="stable"&&o.signalingState!=="closed"&&((Q=o.localDescription)==null?void 0:Q.type)===ls&&await o.setLocalDescription({type:"rollback"}),typeof o.restartIce=="function"&&o.restartIce()),await o.setLocalDescription(Y?await o.createOffer({iceRestart:!0}):void 0),await ae()}catch(U){Y||C(),(ue=a.error)==null||ue.call(a,Gn(U,"failed to create local offer"))}finally{p=!1}};o.onnegotiationneeded=async()=>Re(!1),o.onicecandidate=({candidate:Y})=>{if(!f||!Y)return;const Q=I(typeof Y.toJSON=="function"?Y.toJSON():{candidate:Y.candidate,sdpMid:Y.sdpMid,sdpMLineIndex:Y.sdpMLineIndex,usernameFragment:Y.usernameFragment});D({type:Ih,sdp:JSON.stringify(Q)})};const Le=()=>{if(o.connectionState==="failed"||o.connectionState==="closed"||o.iceConnectionState==="failed"||o.iceConnectionState==="closed"){R();return}if(o.connectionState==="connected"||o.connectionState==="connecting"||o.iceConnectionState==="connected"||o.iceConnectionState==="completed"||o.iceConnectionState==="checking"){b();return}if(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected"){y||(y=setTimeout(()=>{y=null,(o.connectionState==="disconnected"||o.iceConnectionState==="disconnected")&&R()},kd));return}};o.onconnectionstatechange=Le,o.addEventListener(zd,Le),o.ontrack=Y=>{var ue,U;const Q=Y.streams[0];if(Q){if(!a.track&&!a.stream){g.push({track:Y.track,stream:Q});return}(ue=a.track)==null||ue.call(a,Y.track,Q),(U=a.stream)==null||U.call(a,Q)}};const Ie=n?new Promise(Y=>{v=Y}):Promise.resolve();return n&&queueMicrotask(()=>{var Y;!p&&o.signalingState==="stable"&&!o.localDescription&&o.connectionState!=="closed"&&((Y=o.onnegotiationneeded)==null||Y.call(o,new Event("negotiationneeded")))}),{connection:o,get channel(){return _},get isDead(){return o.connectionState==="closed"},getOffer:async(Y=!1)=>{var Q;if(n)return Y?Re(!0):v?Ie:((Q=o.localDescription)==null?void 0:Q.type)===ls?f?W(o):le(o):Ie},async signal(Y){var Q,ue,U;if(Y.type==="candidate"){if(Y.sdp.length>Wd)return;try{const Ne=JSON.parse(Y.sdp);Ne&&typeof Ne=="object"&&await F(I(Ne))}catch(Ne){(Q=a.error)==null||Q.call(a,Gn(Ne,"failed to parse remote candidate"))}return}if(!((_==null?void 0:_.readyState)==="open"&&!((ue=Y.sdp)!=null&&ue.includes("a=rtpmap"))))try{const Ne={...Y,sdp:M(Y.sdp)};if(Y.type===ls){const Ue=p||o.signalingState!=="stable"&&!d;return Ue&&n?void 0:(Ue&&o.signalingState!=="stable"?await yi([o.setLocalDescription({type:"rollback"}),o.setRemoteDescription(Ne)]):await o.setRemoteDescription(Ne),await B(),await o.setLocalDescription(),await ae())}if(Y.type===Vd){d=!0;try{await o.setRemoteDescription(Ne),await B()}finally{d=!1}}}catch(Ne){(U=a.error)==null||U.call(a,Gn(Ne,"failed to apply remote signal"))}},sendData:Y=>_==null?void 0:_.send(Y),destroy:()=>{b(),C(),_==null||_.close(),o.close(),p=!1,d=!1,R()},setHandlers:Y=>{const{signal:Q,...ue}=Y;Object.assign(a,ue),a.data&&h.length>0&&(u=Ye(u),h.splice(0).forEach(U=>{var Ne;return(Ne=a.data)==null?void 0:Ne.call(a,U)})),Q&&w(Q),(a.track||a.stream)&&g.length>0&&g.splice(0).forEach(({track:U,stream:Ne})=>{var Ue,Oe;(Ue=a.track)==null||Ue.call(a,U,Ne),(Oe=a.stream)==null||Oe.call(a,Ne)})},addStream:Y=>Y.getTracks().forEach(Q=>o.addTrack(Q,Y)),removeStream:Y=>o.getSenders().filter(Q=>Q.track&&Y.getTracks().includes(Q.track)).forEach(Q=>o.removeTrack(Q)),addTrack:(Y,Q)=>o.addTrack(Y,Q),removeTrack:Y=>{const Q=o.getSenders().find(ue=>ue.track===Y);Q&&o.removeTrack(Q)},replaceTrack:(Y,Q)=>{const ue=o.getSenders().find(U=>U.track===Y);if(ue)return ue.replaceTrack(Q)}}};const Nc=[...Ka(3,(n,e)=>`stun:stun${e||""}.l.google.com:19302`),"stun:stun.cloudflare.com:3478"].map(n=>({urls:n})),Xd=1024,qd=64,$d=128,Yd=8,jd=new Uint8Array,Kd=(n,e)=>{let t;try{t=n()}catch{return e(!1)}return typeof t=="boolean"?e(t):Promise.resolve(t).then(i=>e(i===!0),()=>e(!1))},Fc=(n,e,t)=>e===2?t?n.slice():n:e===1?ks(ui(n)):ui(n),Bh=(n,e,t,i)=>{try{n.progress(e,t,i)}catch(s){console.error(`${Et} progress handler error:`,s)}},Oc=(n,e,t,i)=>{var s;Bh(n,1,t,i);try{(s=n.receiver)==null||s.call(n,e,t,i)}catch(r){console.error(`${Et} action handler error:`,r)}},Zd=({fail:n,accept:e,refuse:t,maxReceiveBytes:i,chunkSize:s})=>{const r=new Map,o=new Map,a=new Set,c=new Map;let l=0,h=0,u=0,f=!1,m=!1;const g=S=>S.phase!=="released",v=S=>Math.min(i,(S==null?void 0:S.maxPayloadBytes)??i),p=(S,L,N,P)=>{var z,B;N==null||N.reject(L),(B=(z=r.get(S.type))==null?void 0:z.reject)==null||B.call(z,S.peerId,S.metadata,L),P!==void 0&&t(S.peerId,P,L)},d=S=>{for(const L of Array.from(a))L.peerId===S&&(a.delete(L),a.add(L))},_=S=>{var N,P;if(!g(S))return;S.phase="released",(N=S.removeAbortListener)==null||N.call(S),S.timer=Ye(S.timer);const L=o.get(S.peerId);if(S.kind==="inline"){const z=L.inline.get(S.key);z.splice(z.indexOf(S),1),z.length||L.inline.delete(S.key),S.data=jd}else L.bulk.delete(S.id),a.delete(S),S.data=null,S.transfer==="receiving"&&(u-=S.size,L.active===S&&(L.active=null,d(S.peerId)),m=!0);L.count--,l--,L.count||o.delete(S.peerId),(P=S.controller)==null||P.abort()},y=(S,L)=>{g(S)&&(_(S),p(S,L,S.scope,S.kind==="bulk"?S.id:void 0))},x=(S,L)=>{if(S.phase!=="pending")return S.phase==="ready";if(S.size>v(L))return y(S,"payload exceeds receiver size limit"),!1;const N=S.scope?S.scope.receive:L.receive;if(!N)return L.receiver?(S.phase="ready",!0):!1;if(h>=$d||(c.get(S.peerId)??0)>=Yd)return y(S,"too many pending receive decisions"),!1;S.phase="deciding";const P=new AbortController;S.controller=P,h++,c.set(S.peerId,(c.get(S.peerId)??0)+1);const z=Kd(()=>N({byteLength:S.size,peerId:S.peerId,signal:P.signal,...S.metadata===void 0?{}:{metadata:S.metadata}}),B=>{h--;const F=c.get(S.peerId)-1;return F?c.set(S.peerId,F):c.delete(S.peerId),g(S)?(B?S.phase="ready":y(S,"payload rejected by receiver"),B):!1});return typeof z=="boolean"?z:(z.then(()=>w()),!1)},C=(S,L,N)=>{let P;try{P=Fc(N,S.format,S.kind==="inline")}catch{_(S),n(S.peerId,"invalid action payload");return}_(S),Oc(L,P,S.peerId,S.metadata)},b=S=>{const L=r.get(S.type);g(S)&&L&&x(S,L)&&L.receiver&&C(S,L,S.data)},R=S=>{const L=r.get(S.type);if(!g(S)||!L||!x(S,L)||!L.receiver)return;if(S.transfer==="receiving"){S.offset===S.size&&C(S,L,S.data);return}const N=o.get(S.peerId);!N.active&&u+S.size<=i&&(N.active=S,S.transfer="receiving",u+=S.size,S.lastSeen=Date.now(),a.delete(S),e(S.peerId,S.id))},D=(S,L)=>{var P;const N=(P=o.get(S))==null?void 0:P.inline.get(L);for(;N!=null&&N[0];){const z=N[0];if(b(z),g(z))break}},w=()=>{if(f){m=!0;return}f=!0;try{do{m=!1;for(const S of a)R(S);for(const[S,L]of o){for(const N of L.bulk.values())N.offset===N.size&&R(N);for(const N of L.inline.keys())D(S,N)}}while(m)}finally{f=!1}},M=S=>{let L=o.get(S.peerId);if(l>=Xd||((L==null?void 0:L.count)??0)>=qd)return p(S,"too many pending transfers",S.scope,S.kind==="bulk"?S.id:void 0),!1;if(L||(L={bulk:new Map,inline:new Map,active:null,count:0},o.set(S.peerId,L)),L.count++,l++,S.kind==="inline"){const P=L.inline.get(S.key)??[];P.push(S),L.inline.set(S.key,P)}else L.bulk.set(S.id,S),a.add(S);const N=()=>{const P=Dr-(Date.now()-S.lastSeen);P>0?S.timer=setTimeout(N,P):(y(S,"action transfer timed out"),w())};if(S.timer=setTimeout(N,Dr),S.scope){const{signal:P}=S.scope,z=()=>{y(S,"receive cancelled"),w()};if(P.addEventListener("abort",z,{once:!0}),S.removeAbortListener=()=>P.removeEventListener("abort",z),P.aborted)return z(),!1}return!0},I=(S,L)=>{var z;const N=r.get(S.type),P=(z=N==null?void 0:N.receiveScope)==null?void 0:z.call(N,S.peerId,S.metadata);return P===null||P!=null&&P.signal.aborted?(L!==void 0&&t(S.peerId,L,"unexpected response"),null):S.size>v(N)?(p(S,"payload exceeds receiver size limit",P,L),null):{action:N,scope:P}},W=(S,L)=>({...S,...L?{scope:L}:{},phase:"pending",controller:null,lastSeen:Date.now(),timer:null});return{register:(S,L={})=>{const N={...L,receiver:null,receive:null,reject:null,progress:_t};return r.set(S,N),{onMessage:P=>{N.receiver=P,w()},onReceive:P=>{N.receive=P,w()},onReject:P=>{N.reject=P},onProgress:P=>{N.progress=P}}},receiveInline:(S,L)=>{var k;const N=I(S);if(!N)return;const{action:P,scope:z}=N,B=z?`${S.type}\0${z.key}`:S.type;if(P!=null&&P.receiver&&!(z?z.receive:P.receive)&&!((k=o.get(S.peerId))!=null&&k.inline.has(B))){let Z;try{Z=Fc(L,S.format,!0)}catch{n(S.peerId,"invalid action payload");return}Oc(P,Z,S.peerId,S.metadata);return}const F={...W(S,z),kind:"inline",key:B,data:L};M(F)&&D(S.peerId,B)},receiveOffer:(S,L)=>{var z;if((z=o.get(S.peerId))!=null&&z.bulk.has(L)){n(S.peerId,"duplicate action offer");return}const N=I(S,L);if(!N)return;const P={...W(S,N.scope),kind:"bulk",id:L,transfer:"waiting",offset:0,data:null};M(P)&&w()},receiveChunk:(S,L,N,P)=>{var k;const z=o.get(S),B=z==null?void 0:z.bulk.get(L);if(!B)return;if(B.transfer!=="receiving"||N!==B.offset||!P.length||P.length!==Math.min(s,B.size-B.offset)){n(S,"invalid action chunk offset or length");return}try{B.data??(B.data=new Uint8Array(B.size))}catch{y(B,"unable to allocate receive buffer"),w();return}B.data.set(P,B.offset),B.offset+=P.length;const F=Date.now();B.lastSeen=F;for(const Z of a)Z.phase==="ready"&&((k=r.get(Z.type))!=null&&k.receiver)&&(Z.lastSeen=F);B.offset===B.size?(R(B),g(B)&&(z==null?void 0:z.active)===B&&(z.active=null,d(S)),w()):Bh(r.get(B.type),B.offset/B.size,S,B.metadata)},cancel:(S,L)=>{var P,z;const N=(P=o.get(S))==null?void 0:P.bulk.get(L);N&&(_(N),(z=N.scope)==null||z.reject("response cancelled by sender")),w()},clearPeer:S=>{const L=o.get(S);if(L){for(const N of L.bulk.values())_(N);for(const N of L.inline.values()){const P=[...N];for(const z of P)_(z)}}w()}}},Jo=2,qs=0,$s=1,Bc=2,io=3,so=4,Ys=5,ro=36,kc=48,kn=6,xs=14,oo=Oh-xs,Jd=256*1024**2,zc=1024**2,Vc="bufferedamountlow",Hc="close",Gc="error",Qd=1e4,zn=(n,e)=>{const t=Xe(e);return t.kind=n,t.name=n==="aborted"?"AbortError":t.name,t},Qo=n=>{if(n!=null&&n.aborted)throw zn("aborted","operation aborted")},Wc=(n,e,t=kn)=>{const i=new Uint8Array(t);return i[0]=Jo,i[1]=n,new DataView(i.buffer).setUint32(2,e),i},Si=zn,ef=(n,e,t=Qd)=>n.readyState!=="open"||n.bufferedAmount<=n.bufferedAmountLowThreshold?Promise.resolve(n.readyState==="open"):new Promise(i=>{let s=!1,r=null;const o=l=>{s||(s=!0,n.removeEventListener(Vc,a),n.removeEventListener(Hc,c),n.removeEventListener(Gc,c),e==null||e.removeEventListener("abort",c),Ye(r),i(l))},a=()=>o(!0),c=()=>o(!1);if(n.addEventListener(Vc,a),n.addEventListener(Hc,c),n.addEventListener(Gc,c),e==null||e.addEventListener("abort",c,{once:!0}),r=setTimeout(()=>o(!1),t),n.readyState!=="open"||e!=null&&e.aborted){o(!1);return}n.bufferedAmount<=n.bufferedAmountLowThreshold&&o(!0)}),tf=({getPeer:n,getPeerIds:e,canReceiveFromPeer:t,onPeerError:i,throwIfAborted:s=Qo,maxReceiveBytes:r=Jd})=>{if(!Number.isSafeInteger(r)||r<=0)throw Xe("maxReceiveBytes must be a positive safe integer");const o=new Map,a=new Map,c=new WeakSet;let l=0;const h=Zd({fail:(p,d)=>f(p,d),accept:(p,d)=>m(p,d,io),refuse:(p,d,_)=>m(p,d,so,_),maxReceiveBytes:r,chunkSize:oo}),u=p=>{var d;for(const _ of((d=a.get(p))==null?void 0:d.values())??[])_.fail(Si("disconnected","peer disconnected"));a.delete(p),h.clearPeer(p)},f=(p,d)=>{const _=n(p,!0);_&&!c.has(_)&&(c.add(_),console.warn(`${Et}: ${d}; disconnecting peer ${p}`),i(p,Xe(d)))},m=(p,d,_,y="")=>{var R;const x=n(p,!0);if(!x)return;const C=En(y).subarray(0,200),b=Wc(_,d,kn+C.length);b.set(C,kn);try{if((((R=x.channel)==null?void 0:R.bufferedAmount)??0)>zc)throw Xe("control send buffer is full");x.sendData(b)}catch{f(p,"unable to send action control")}};return{makeInternalAction:(p,d={})=>{const _={sendToPending:!!d.sendToPending,receiveWhilePending:!!d.receiveWhilePending,...d.maxPayloadBytes===void 0?{}:{maxPayloadBytes:d.maxPayloadBytes},...d.receiveScope?{receiveScope:d.receiveScope}:{}},y=o.get(p);if(y){if(y.options.sendToPending!==_.sendToPending||y.options.receiveWhilePending!==_.receiveWhilePending||y.options.receiveScope!==_.receiveScope||y.options.maxPayloadBytes!==_.maxPayloadBytes)throw Xe(`action type "${p}" cannot be redefined`);return y.action}const x=En(p);if(!p||p.includes("\0")||x.length>32)throw Xe("action type must contain 1–32 UTF-8 bytes and no null characters");const C={options:_,action:{...h.register(p,_),send:async(b,R,D,w,M)=>{if(s(M),b===void 0)throw Xe("action data cannot be undefined");const I=b instanceof Blob,W=I||b instanceof ArrayBuffer||ArrayBuffer.isView(b),S=W?2:typeof b=="string"?0:1;let L=I?b:b instanceof ArrayBuffer?new Uint8Array(b):ArrayBuffer.isView(b)?new Uint8Array(b.buffer,b.byteOffset,b.byteLength):En(S===0?b:Ct(b));const N=L instanceof Blob?L.size:L.byteLength,P=D===void 0?new Uint8Array:En(Ct(D));if(P.length>16336)throw Xe("action metadata is too large");const z=ro+P.length+N<=Oh;!z&&W&&!(L instanceof Blob)&&(L=L.slice());const B=z?0:l++>>>0,F=z?ro:kc,k=new Uint8Array(F+P.length+(z?N:0));k[0]=Jo,k[1]=(z?qs:$s)|S<<4,k.set(x,2);const Z=new DataView(k.buffer);Z.setUint16(34,P.length),z||(Z.setUint32(36,B),Z.setFloat64(40,N)),k.set(P,F),z&&k.set(L instanceof Blob?new Uint8Array(await L.arrayBuffer()):L,F+P.length);const he=R?Array.isArray(R)?R:[R]:e(_.sendToPending);await yi([...new Set(he)].map(async Me=>{const X=n(Me,_.sendToPending);if(!X){console.warn(`${Et}: no peer with id ${Me} found`);return}let te=null;const le=()=>{var Ee;if(te)throw te;if(s(M),n(Me,_.sendToPending)!==X||((Ee=X.channel)==null?void 0:Ee.readyState)==="closed")throw Si("disconnected","peer disconnected")},ae=async Ee=>{le();const me=X.channel;if(me&&(me.readyState!=="open"||me.bufferedAmount>me.bufferedAmountLowThreshold)){if(!await ef(me,M))throw s(M),Si("disconnected","data channel stopped draining");le()}try{X.sendData(Ee)}catch{throw Si("disconnected","peer disconnected")}};if(z){await ae(k),w==null||w(1,Me,D);return}let Re=!1,Le=!1,Ie=Date.now(),Y,Q;const ue=new Promise((Ee,me)=>{Y=Ee,Q=me});ue.catch(_t);const U=a.get(Me)??new Map;if(U.has(B))throw Xe("action transmission id is still in use");a.set(Me,U);let Ne=null;const Ue={accept:()=>!Ne||te?!1:(Ne=Ye(Ne),Y(),!0),fail:(Ee,me=!1)=>{me&&(Le=!0),te=Ee,Q(Ee)},touch:()=>{Ne&&(Ie=Date.now())}};U.set(B,Ue);const Oe=()=>{const Ee=Dr-(Date.now()-Ie);Ee>0?Ne=setTimeout(Oe,Ee):Ue.fail(Si("timeout","action offer timed out"))};Ne=setTimeout(Oe,Dr);const Se=()=>{try{s(M)}catch(Ee){Ue.fail(Ee)}};M==null||M.addEventListener("abort",Se,{once:!0});try{await ae(k),Re=!0,await ue;for(let Ee=0;Ee<N;Ee+=oo){le();const me=Math.min(oo,N-Ee),A=Wc(Bc,B,xs+me);new DataView(A.buffer).setFloat64(kn,Ee),A.set(L instanceof Blob?new Uint8Array(await L.slice(Ee,Ee+me).arrayBuffer()):L.subarray(Ee,Ee+me),xs),await ae(A);for(const E of U.values())E.touch();w==null||w((Ee+me)/N,Me,D)}le()}catch(Ee){throw Re&&!Le&&n(Me,!0)===X&&(!X.channel||X.channel.readyState==="open"&&(X.channel.bufferedAmount??0)<=zc)&&m(Me,B,Ys),Ee}finally{Ne=Ye(Ne),M==null||M.removeEventListener("abort",Se),U.delete(B),!U.size&&a.get(Me)===U&&a.delete(Me)}}))}}};return o.set(p,C),C.action},handleData:(p,d)=>{var N,P,z;if(d.byteLength<2||d.byteLength>16384){f(p,"invalid action frame");return}const _=new Uint8Array(d);if(_[0]!==Jo){f(p,"incompatible action protocol version");return}const y=_[1]&15,x=_[1]>>>4,C=new DataView(_.buffer,_.byteOffset,_.byteLength);if(y>Ys||x>2||y>$s&&x!==0){f(p,"invalid action frame");return}if(y>=Bc){if(_.length<kn||(y===io||y===Ys)&&_.length!==kn||y===so&&_.length>206){f(p,"invalid action control");return}const B=C.getUint32(2);if(y===io){const F=a.get(p);if((N=F==null?void 0:F.get(B))!=null&&N.accept())for(const k of F.values())k.touch();return}if(y===so){(z=(P=a.get(p))==null?void 0:P.get(B))==null||z.fail(Si("rejected",ui(_.subarray(kn))),!0);return}y===Ys?h.cancel(p,B):h.receiveChunk(p,B,_.length>=xs?C.getFloat64(kn):NaN,_.subarray(xs));return}const b=y===qs?ro:kc;if(_.length<b){f(p,"invalid action header");return}const R=ui(_.subarray(2,34)).replaceAll("\0",""),D=o.get(R);if(!t(p,!!(D!=null&&D.options.receiveWhilePending)))return;const w=C.getUint16(34),M=b+w,I=y===qs?_.length-M:C.getFloat64(40),W=y===$s?C.getUint32(36):0;if(!R||M>_.length||!Number.isSafeInteger(I)||I<0||y===$s&&(I===0||M!==_.length)){f(p,"invalid action proposal");return}let S;try{w&&(S=ks(ui(_.subarray(b,M))))}catch{f(p,"invalid action metadata");return}const L={peerId:p,type:R,format:x,size:I,...S===void 0?{}:{metadata:S}};y===qs?h.receiveInline(L,_.subarray(M)):h.receiveOffer(L,W)},clearPeer:u}},kh=n=>n&&typeof n=="object"&&!Array.isArray(n)&&typeof n.r=="string"?n:null,js=n=>{const e=kh(n);return e?{r:e.r,...Object.hasOwn(e,"m")?{m:e.m}:{}}:null},ao=n=>{const e=kh(n);return e?{r:e.r,...typeof e.e=="string"?{e:e.e}:{}}:null},hs=(n,e)=>e===void 0?n:{...n,metadata:e},nf=({getPeer:n,getPeerIds:e,canReceiveFromPeer:t,onPeerError:i,maxReceiveBytes:s})=>{const r=Object.create(null),o={},a=new Map,c=tf({getPeer:n,getPeerIds:e,canReceiveFromPeer:t,onPeerError:i,...s===void 0?{}:{maxReceiveBytes:s}}),l=c.makeInternalAction,h=c.handleData,u=p=>{const d=o[p];d&&(Ye(d.timer),d.signal&&d.abortHandler&&d.signal.removeEventListener("abort",d.abortHandler),delete o[p],d.controller.abort())},f=(p,d)=>{$i(o).forEach(([_,y])=>{y.peerId===p&&(u(_),y.reject(d))})},m=(p,d)=>{c.clearPeer(p);const _=a.get(p);_&&(a.delete(p),_.forEach(y=>y.abort())),f(p,zn("disconnected",Yi(d,"peer disconnected")))},g=l("@_response",{receiveScope:(p,d)=>{const _=ao(d),y=_&&o[_.r];if(!_||!y||y.peerId!==p)return null;const x=_.e===void 0?y.getReceive():null;return{key:_.r,signal:y.controller.signal,receive:x?C=>x({byteLength:C.byteLength,peerId:C.peerId,kind:"response",signal:C.signal}):null,reject:C=>{o[_.r]===y&&(u(_.r),y.reject(zn("rejected",C)))}}}});return g.onProgress((p,d,_)=>{var C;const y=ao(_),x=y&&o[y.r];x&&x.peerId===d&&(y==null?void 0:y.e)===void 0&&((C=x.getReceiveProgress())==null||C(p,{peerId:d}))}),g.onMessage((p,d,_)=>{const y=ao(_);if(!y)return;const x=o[y.r];if(!(!x||x.peerId!==d)){if(u(y.r),y.e!==void 0){x.reject(zn("rejected",y.e));return}x.resolve(p)}}),{makeAction:(p,d)=>{if(d&&"onRequest"in d&&d.kind!=="request")throw Xe('request actions must use kind: "request"');const _=(d==null?void 0:d.kind)??"message",y=l(p),x=r[p];if(x){if(x.kind!==_)throw Xe(`action type "${p}" cannot be redefined`);return x.action}const C={kind:_,action:null,onReceive:(d==null?void 0:d.onReceive)??null,onReceiveProgress:(d==null?void 0:d.onReceiveProgress)??null},b=(S,L)=>S?(N,P)=>S(N,hs({peerId:P},L)):void 0,R=(S,L,N)=>{var z;const P=C.kind==="request"?js(N):null;(z=C.onReceiveProgress)==null||z.call(C,S,hs({peerId:L},P?P.m:N))},D=S=>{C.onReceive=S,y.onReceive(S?L=>{const N=_==="request"?js(L.metadata):null;return S(hs({byteLength:L.byteLength,peerId:L.peerId,signal:L.signal,kind:_},N?N.m:L.metadata))}:null)};if(D(C.onReceive),y.onProgress(R),_==="message"){let S=(d==null?void 0:d.onMessage)??null;const L=(P,z,B)=>{const F=S;Promise.resolve().then(()=>F(P,hs({peerId:z},B))).catch(k=>console.error(`${Et} action handler error:`,k))},N={send:async(P,z={})=>{await y.send(P,z.target,z.metadata,b(z.onProgress,z.metadata),z.signal)},get onMessage(){return S},set onMessage(P){S=P,y.onMessage(P?L:null)},get onReceive(){return C.onReceive},set onReceive(P){D(P)},get onReceiveProgress(){return C.onReceiveProgress},set onReceiveProgress(P){C.onReceiveProgress=P}};return C.action=N,r[p]=C,y.onMessage(S?L:null),N}y.onReject((S,L,N)=>{const P=js(L);P&&g.send(null,S,{r:P.r,e:N}).catch(_t)});let w=(d==null?void 0:d.onRequest)??null;const M=(S,L,N)=>{const P=js(N);if(!P)return;const z=w,B=new AbortController;let F=a.get(L);F||(F=new Set,a.set(L,F)),F.add(B),Promise.resolve().then(async()=>{const k=await z(S,{...hs({peerId:L},P.m),signal:B.signal});if(k===void 0)throw Xe("request handler returned undefined");return k}).then(k=>g.send(k,L,{r:P.r}),k=>g.send(null,L,{r:P.r,e:Yi(k,"request failed").slice(0,512)})).catch(_t).finally(()=>{const k=a.get(L);k==null||k.delete(B),k&&!k.size&&a.delete(L),B.abort()})},I=async(S,L)=>{const{target:N,metadata:P,onProgress:z,signal:B,timeoutMs:F}=L;if(Qo(B),!n(N,!1))throw zn("disconnected",`no active peer with id ${N}`);const k=vi(20),Z=new AbortController,he=new Promise((Me,X)=>{const te={controller:Z,getReceive:()=>C.onReceive,getReceiveProgress:()=>C.onReceiveProgress,peerId:N,resolve:Me,reject:X,timer:null,...B===void 0?{}:{signal:B}},le=()=>{u(k),X(zn("aborted","operation aborted"))};B&&(te.abortHandler=le,B.addEventListener("abort",le,{once:!0})),o[k]=te,F!==void 0&&(te.timer=setTimeout(()=>{u(k),te.reject(zn("timeout","request timed out"))},F))});try{const Me=y.send(S,N,P===void 0?{r:k}:{r:k,m:P},b(z,P),Z.signal);return await Promise.race([he,Me.then(()=>he)])}finally{u(k)}},W={request:I,requestMany:async(S,L)=>{const{targets:N,onResult:P,...z}=L;return Qo(z.signal),await yi(N.map(async B=>{try{const F={peerId:B,status:"fulfilled",value:await I(S,{...z,target:B})};return P==null||P(F),F}catch(F){const k=Gn(F,"request failed");if(k.kind==="aborted"||!k.kind)throw k;const Z=k.kind==="timeout"?{peerId:B,status:"timeout"}:k.kind==="disconnected"?{peerId:B,status:"disconnected"}:{peerId:B,status:"rejected",error:k};return P==null||P(Z),Z}}))},get onRequest(){return w},set onRequest(S){w=S,y.onMessage(S?M:null)},get onReceive(){return C.onReceive},set onReceive(S){D(S)},get onReceiveProgress(){return C.onReceiveProgress},set onReceiveProgress(S){C.onReceiveProgress=S}};return C.action=W,r[p]=C,y.onMessage(w?M:null),W},makeInternalAction:l,handleData:h,clearPeer:m}},Xc=n=>n&&typeof n=="object"&&!Array.isArray(n)&&typeof n.k=="string"?{key:n.k,...typeof n.s=="string"?{streamId:n.s}:{},...typeof n.t=="string"?{trackId:n.t}:{},...Object.hasOwn(n,"m")?{metadata:n.m}:{}}:null,qc=n=>e=>{let t=n.get(e);return t||(t=vi(20),n.set(e,t)),t},ea=()=>{const n=new WeakMap,e=new WeakMap,t=new Map,i=new Map,s=new Map,r=new Map,o=new WeakMap,a=new WeakMap;return{getStreamKey:qc(n),getTrackKey:qc(e),rememberRemoteStream:(c,l,h)=>{var f;const u=o.get(l);u!==void 0&&t.get(u)===l&&t.delete(u),o.set(l,c),t.set(c,l),h&&i.set(h,l),(f=l.getTracks)==null||f.call(l).forEach(m=>{typeof m.id=="string"&&r.set(m.id,{track:m,stream:l})})},getRemoteStream:(c,l)=>t.get(c)??(l?i.get(l):void 0),rememberRemoteTrack:(c,l,h,u,f)=>{var v;const m={track:l,stream:h},g=a.get(l);g!==void 0&&((v=s.get(g))==null?void 0:v.track)===l&&s.delete(g),a.set(l,c),s.set(c,m),u&&r.set(u,m),f&&i.set(f,h)},getRemoteTrack:(c,l)=>s.get(c)??(l?r.get(l):void 0),hasRemoteMedia:()=>t.size>0||s.size>0,clearRemote:()=>{t.clear(),i.clear(),s.clear(),r.clear()}}},sf=({iterate:n,isActive:e,getSharedMediaPeer:t,onPeerError:i})=>{const s={},r={},o={},a=ea(),c=v=>{var p;return((p=t(v))==null?void 0:p.__trysteroMedia)??o[v]??(o[v]=ea())},l=(v,p,d,_)=>{const y=v[p]??(v[p]=[]);if(y.length>=64){console.warn(`${Et}: too many pending ${_} metadata messages`),i(p,Xe("too many pending media metadata messages"));return}y.push(d)},h=(v,p,d)=>{if(!(v!=null&&v.length))return;const _=p?v.findIndex(y=>{const x=d(y);return!x||x===p}):0;return _>=0?v.splice(_,1)[0]:void 0},u=(v,p,d,_)=>{var y;e(v)&&(c(v).rememberRemoteStream(p,d,typeof d.id=="string"?d.id:void 0),(y=g.onPeerStream)==null||y.call(g,d,v,_))},f=(v,p,d,_,y)=>{var x;e(v)&&(c(v).rememberRemoteTrack(p,d,_,typeof d.id=="string"?d.id:void 0,typeof _.id=="string"?_.id:void 0),(x=g.onPeerTrack)==null||x.call(g,d,_,v,y))},m=(v,p,d,_,y,x={})=>{const C={k:p,...x,...d===void 0?{}:{m:d}};return n(v,async(b,R)=>{await _(C,b),await y(R)})},g={addStream:(v,p,d)=>m(p.target,a.getStreamKey(v),p.metadata,d,_=>_.addStream(v),{s:v.id}),removeStream:(v,p)=>{n(p,(d,_)=>_.removeStream(v))},addTrack:(v,p,d,_)=>m(d.target,a.getTrackKey(v),d.metadata,_,y=>y.addTrack(v,p),{s:p.id,t:v.id}),removeTrack:(v,p)=>{n(p,(d,_)=>_.removeTrack(v))},replaceTrack:(v,p,d,_)=>m(d.target,a.getTrackKey(p),d.metadata,_,y=>y.replaceTrack(v,p),{t:v.id}),receiveStreamMeta:(v,p)=>{if(!e(p))return;const d=Xc(v);if(!d)return;const _=c(p).getRemoteStream(d.key,d.streamId);if(_!=null&&_.getTracks().length){u(p,d.key,_,d.metadata);return}l(s,p,d,"stream")},receiveTrackMeta:(v,p)=>{if(!e(p))return;const d=Xc(v);if(!d)return;const _=c(p).getRemoteTrack(d.key,d.trackId);if(_&&_.track.readyState!=="ended"&&(!_.stream.getTracks||_.stream.getTracks().includes(_.track))){f(p,d.key,_.track,_.stream,d.metadata);return}l(r,p,d,"track")},receiveRemoteStream:(v,p)=>{if(!e(v))return;const d=h(s[v],typeof p.id=="string"?p.id:void 0,_=>_.streamId);d&&u(v,d.key,p,d.metadata)},receiveRemoteTrack:(v,p,d)=>{if(!e(v))return;const _=r[v],y=typeof p.id=="string"?p.id:void 0,x=typeof d.id=="string"?d.id:void 0,C=_&&y?_.findIndex(R=>R.trackId===y):-1,b=C>=0?_==null?void 0:_.splice(C,1)[0]:h(_,x,R=>R.streamId);b&&f(v,b.key,p,d,b.metadata)},clearPeer:v=>{delete s[v],delete r[v],delete o[v]},onPeerStream:null,onPeerTrack:null};return g},$c="beforeunload",rf=1e4,Dn=n=>"@_"+n,Ms=new Set,Yc=()=>Ms.forEach(n=>n()),of=n=>(Ms.add(n),Ms.size===1&&addEventListener($c,Yc),()=>{Ms.delete(n),Ms.size||removeEventListener($c,Yc)});var af=(n,e,t,{onPeerHandshake:i,onHandshakeError:s,handshakeTimeoutMs:r=rf,maxReceiveBytes:o,isPassive:a=!1,onBeforeLeave:c}={})=>{const l={},h={},u={},f={onPeerJoin:null,onPeerLeave:null};let m=_t,g=null;const v=(F,k)=>(F?Array.isArray(F)?F:[F]:Jt(h)).flatMap(Z=>{const he=h[Z];return he?[Promise.resolve(k(Z,he))]:(console.warn(`${Et}: no peer with id ${Z} found`),[])}),p=(F,k,Z)=>{const he=l[F];!he||k&&he!==k||(N.send("",F).catch(_t),D(F,he,Z))},d=(F,k)=>p(F,void 0,k),_=sf({onPeerError:d,iterate:(F,k)=>v(F,(Z,he)=>k(Z,he)),isActive:F=>!!h[F],getSharedMediaPeer:F=>l[F]??null}),y=nf({onPeerError:d,...o===void 0?{}:{maxReceiveBytes:o},getPeer:(F,k)=>(k?l:h)[F],getPeerIds:F=>Jt(F?l:h),canReceiveFromPeer:(F,k)=>B.canReceiveFromPeer(F,k)}),x=y.makeInternalAction,C=y.handleData,b=y.makeAction,R=(F,k=Xe("peer disconnected"))=>{var he;const Z=Gn(k,"peer disconnected");B.clearPeer(F,Z),delete l[F],delete h[F],y.clearPeer(F,Z),(he=u[F])==null||he.splice(0).forEach(Me=>Me.reject(Z)),delete u[F],_.clearPeer(F)},D=(F,k,Z)=>{var X;const he=l[F];if(!he||k&&he!==k)return;const Me=!!h[F];R(F,Z),he.destroy(),Me&&((X=f.onPeerLeave)==null||X.call(f,F)),e(F)},w=()=>g??(g=(async()=>{c==null||c();const F=new AbortController;N.send("",void 0,void 0,void 0,F.signal).catch(_t),await new Promise(k=>setTimeout(k,99)),F.abort();try{$i(l).forEach(([k,Z])=>{Z.destroy(),R(k,Xe("room left"))})}finally{try{m()}finally{t()}}})()),M=x(Dn("ping")),I=x(Dn("pong")),W=x(Dn("signal")),S=x(Dn("stream"),{maxPayloadBytes:65536}),L=x(Dn("track"),{maxPayloadBytes:65536}),N=x(Dn("leave"),{sendToPending:!0,receiveWhilePending:!0}),P=x(Dn("hsdata"),{sendToPending:!0,receiveWhilePending:!0,maxPayloadBytes:65536}),z=x(Dn("hsready"),{sendToPending:!0,receiveWhilePending:!0}),B=Fd({...i===void 0?{}:{onPeerHandshake:i},...s===void 0?{}:{onHandshakeError:s},handshakeTimeoutMs:r,sendHandshakeData:P.send,sendHandshakeReady:z.send,onActivate:(F,k)=>{var Z;h[F]=k,k.setHandlers({signal:he=>{h[F]===k&&W.send(he,F).catch(_t)}}),(Z=f.onPeerJoin)==null||Z.call(f,F)},onFailure:(F,k,Z)=>p(F,k,Z)});return M.onMessage((F,k)=>{I.send("",k).catch(_t)}),I.onMessage((F,k)=>{var he;const Z=u[k];(he=Z==null?void 0:Z.shift())==null||he.resolve(),Z&&!Z.length&&delete u[k]}),W.onMessage((F,k)=>{var Z;(Z=h[k])==null||Z.signal(F)}),S.onMessage((F,k)=>_.receiveStreamMeta(F,k)),L.onMessage((F,k)=>_.receiveTrackMeta(F,k)),N.onMessage((F,k)=>D(k,void 0,Xe("peer left room"))),P.onMessage((F,k,Z)=>B.receiveHandshakeData(F,k,Z)),z.onMessage((F,k)=>B.receiveHandshakeReady(k)),n((F,k)=>{const Z=l[k];if(Z){if(Z===F)return;Z.destroy(),R(k,Xe("peer replaced"))}l[k]=F,B.addPeer(k,F),F.setHandlers({data:he=>{l[k]===F&&C(k,he)},stream:he=>_.receiveRemoteStream(k,he),track:(he,Me)=>_.receiveRemoteTrack(k,he,Me),close:()=>D(k,F,Xe("peer disconnected")),error:he=>{console.error(`${Et} peer error:`,he),D(k,F,he)}}),B.start(k,F)}),Lh&&(m=of(()=>w().catch(_t))),{makeAction:b,leave:w,ping:async F=>{if(!h[F])throw Xe(`no active peer with id ${F}`);const k=Date.now();return await new Promise((Z,he)=>{const Me=u[F]??(u[F]=[]),X=()=>{const le=u[F];if(!le)return;const ae=le.indexOf(te);ae>-1&&le.splice(ae,1),le.length||delete u[F]},te={resolve:()=>{X(),Z()},reject:le=>{X(),he(le)}};Me.push(te),M.send("",F).catch(le=>te.reject(Gn(le,"peer disconnected")))}),Date.now()-k},isPassive:()=>a,getPeers:()=>Dh($i(h).map(([F,k])=>[F,k.connection])),addStream:(F,k={})=>_.addStream(F,k,S.send),removeStream:(F,k={})=>{_.removeStream(F,k.target)},addTrack:(F,k,Z={})=>_.addTrack(F,k,Z,L.send),removeTrack:(F,k={})=>{_.removeTrack(F,k.target)},replaceTrack:(F,k,Z={})=>_.replaceTrack(F,k,Z,L.send),get onPeerJoin(){return f.onPeerJoin},set onPeerJoin(F){f.onPeerJoin=F,F&&Jt(h).forEach(k=>F(k))},get onPeerLeave(){return f.onPeerLeave},set onPeerLeave(F){f.onPeerLeave=F},get onPeerStream(){return _.onPeerStream},set onPeerStream(F){_.onPeerStream=F},get onPeerTrack(){return _.onPeerTrack},set onPeerTrack(F){_.onPeerTrack=F}}};const zh=1,Vh=2,jc=(n,e)=>{const t=En(n),i=new Uint8Array(3+t.byteLength+e.byteLength);return i[0]=zh,i[1]=t.byteLength>>>8&255,i[2]=t.byteLength&255,i.set(t,3),i.set(e,3+t.byteLength),i},cf=(n,e)=>{const t=En(n),i=new Uint8Array(4+t.byteLength);return i[0]=Vh,i[1]=Number(e),i[2]=t.byteLength>>>8&255,i[3]=t.byteLength&255,i.set(t,4),i},Kc=(n,e)=>{if(n.byteLength<e+2)return null;const t=(n[e]??0)<<8|(n[e+1]??0),i=e+2+t;return t<=0||t>128||n.byteLength<i?null:{roomToken:ui(n.subarray(e+2,i)),headerSize:i}},lf=n=>{const e=new Uint8Array(n);if(e.byteLength<3||e.byteLength>16515)return null;if(e[0]===zh){const t=Kc(e,1);return t?{type:"room",roomToken:t.roomToken,payload:e.subarray(t.headerSize).slice().buffer}:null}if(e[0]===Vh){const t=Kc(e,2);return t?{type:"presence",roomToken:t.roomToken,isPresent:e[1]===1}:null}return null},wr=n=>{const{connection:e,channel:t}=n;return n.isDead||e.connectionState==="closed"||e.connectionState==="failed"||e.iceConnectionState==="closed"||e.iceConnectionState==="failed"||(t==null?void 0:t.readyState)==="closing"||(t==null?void 0:t.readyState)==="closed"},hf=n=>{if(wr(n))return"stale";const{channel:e}=n;return!e||e.readyState!=="open"?"transient":"live"};var uf=class{constructor(){It(this,"rooms",new Map);It(this,"unclaimedDataTimers",new WeakMap);It(this,"pendingDataTimers",new WeakMap);It(this,"byApp",{})}registerRoom(n,e,t,i){const s=this.rooms.get(n)??new Map;if(s.has(e))throw Xe("room membership already registered");const r={token:null,tokenPromise:t,...i};s.set(e,r),this.rooms.set(n,s);const o=()=>{var c;return((c=this.rooms.get(n))==null?void 0:c.get(e))===r},a=c=>{if(r.token)for(const l of yn(this.byApp[n]??{}))try{this.sendRoomPresence(l,r.token,c)}catch{}};return t.then(c=>{if(o()){r.token=c;for(const l of yn(this.byApp[n]??{}))l.remoteRoomTokens.has(c)&&this.attachRoom(n,e,r,l),this.discardUnboundData(l);o()&&r.active&&a(!0)}}),{connect:(c,l,h)=>{if(!o()){l.destroy();return}const u=this.reusable(n,c);u&&u.peer!==l&&l.destroy();const f=u??this.register(n,c,l,h);if(this.attachRoom(n,e,r,f),!u)for(const m of s.values())m.active&&m.token&&this.sendRoomPresence(f,m.token,!0)},reuse:c=>{if(!o())return!1;const l=this.reusable(n,c);return l?(this.attachRoom(n,e,r,l),!0):!1},setActive:c=>{!o()||r.active===c||(r.active=c,a(c))},leave:()=>{var c,l;if(o()){s.delete(e),s.size||this.rooms.delete(n),a(!1);for(const h of yn(this.byApp[n]??{})){const u=h.bindings[e];(l=u==null?void 0:(c=u.handlers).close)==null||l.call(c),u==null||u.detach(),this.discardUnboundData(h)}}}}}owns(n,e,t){var i,s;return((s=(i=this.byApp[n])==null?void 0:i[e])==null?void 0:s.peer)===t}reusable(n,e){var i;const t=(i=this.byApp[n])==null?void 0:i[e];if(t&&wr(t.peer)){this.clear(n,e,{destroyPeer:!0});return}return t}attachRoom(n,e,t,i){var o;if(((o=this.rooms.get(n))==null?void 0:o.get(e))!==t||i.isClosing||this.get(n,i.peerId)!==i)return;const{proxy:s,isNew:r}=this.bind(e,t.tokenPromise,i,{onDetach:()=>t.onDetach(i.peerId,i.peer)});r&&t.onPeer(s,i.peerId,i.peer)}get(n,e){var t;return(t=this.byApp[n])==null?void 0:t[e]}sendRoomPresence(n,e,t){n.isClosing||wr(n.peer)||n.peer.sendData(cf(e,t))}clear(n,e,{destroyPeer:t}){const i=this.byApp[n],s=i==null?void 0:i[e];if(!s||s.isClosing)return;s.idleTimer=Ye(s.idleTimer),this.clearDataTimers(s),s.isClosing=!0,t&&!s.peer.isDead&&s.peer.destroy();const r=yn(s.bindings);s.bindings={},s.bindingsByToken={},s.controlRoomId=null,delete i[e],r.forEach(o=>{var a,c;(c=(a=o.handlers).close)==null||c.call(a),o.pendingData.length=0,o.pendingSendData.length=0,o.pendingTracks.length=0}),s.media.clearRemote(),s.pendingDataByToken.clear(),s.remoteRoomTokens.clear(),Jt(i).length===0&&delete this.byApp[n]}register(n,e,t,i){var a,c;const s=(a=this.byApp[n])==null?void 0:a[e];if(s){if(s.idleTimer=Ye(s.idleTimer),s.peer===t)return s;this.clear(n,e,{destroyPeer:!0})}const r={appId:n,peerId:e,peer:t,bindings:{},bindingsByToken:{},pendingDataByToken:new Map,remoteRoomTokens:new Set,idleTimer:null,controlRoomId:null,streamOwners:new Map,trackOwners:new Map,media:ea(),idleMs:i,isClosing:!1};((c=this.byApp)[n]??(c[n]={}))[e]=r;const o=()=>{this.owns(n,e,t)&&this.clear(n,e,{destroyPeer:!0})};return t.setHandlers({data:l=>this.dispatchData(r,l),signal:l=>this.dispatchSignal(r,l),close:o,error:l=>{console.error(`${Et} peer error:`,l),o()},track:(l,h)=>this.dispatchTrack(r,l,h)}),r}bind(n,e,t,{onDetach:i}){const s=t.bindings[n];if(s)return t.idleTimer=Ye(t.idleTimer),{proxy:s.proxy,isNew:!1};const r={roomId:n,roomToken:null,roomTokenPromise:e,handlers:{},pendingData:[],pendingSendData:[],pendingTracks:[],detach:_t,proxy:{}},o=()=>{if(t.bindings[n]!==r)return;const c=Jt(t.bindings).length===1&&(t.streamOwners.size>0||t.trackOwners.size>0||t.media.hasRemoteMedia());c||this.pruneRoomOwnership(t,n),delete t.bindings[n],r.roomToken&&t.bindingsByToken[r.roomToken]===r&&delete t.bindingsByToken[r.roomToken],t.controlRoomId===n&&(t.controlRoomId=Jt(t.bindings)[0]??null),this.discardUnboundData(t),i(),c?this.clear(t.appId,t.peerId,{destroyPeer:!0}):this.scheduleIdleTimer(t)},a={get connection(){return t.peer.connection},get channel(){return t.peer.channel},get isDead(){return t.peer.isDead},getOffer:c=>t.peer.getOffer(c),signal:c=>t.peer.signal(c),sendData:c=>{if(!r.roomToken){r.pendingSendData.push(c);return}t.peer.sendData(jc(r.roomToken,c))},destroy:()=>o(),setHandlers:c=>{Object.assign(r.handlers,c),this.flushBindingQueues(t,r)},addStream:c=>{const l=t.streamOwners.get(c)??new Set,h=l.size===0;l.add(n),t.streamOwners.set(c,l),h&&t.peer.addStream(c)},removeStream:c=>this.releaseStreamOwner(t,c,n),addTrack:(c,l)=>{const h=t.trackOwners.get(c)??{stream:l,rooms:new Set},u=h.rooms.size===0;return h.stream=l,h.rooms.add(n),t.trackOwners.set(c,h),u?t.peer.addTrack(c,l):t.peer.connection.getSenders().find(f=>f.track===c)??t.peer.addTrack(c,l)},removeTrack:c=>this.releaseTrackOwner(t,c,n),replaceTrack:async(c,l)=>{const h=t.trackOwners.get(c);if(await t.peer.replaceTrack(c,l),h&&t.trackOwners.get(c)===h){t.trackOwners.delete(c);const u=t.trackOwners.get(l)??{stream:h.stream,rooms:new Set};h.rooms.forEach(f=>u.rooms.add(f)),t.trackOwners.set(l,u)}},__trysteroMedia:t.media};return r.proxy=a,r.detach=o,t.bindings[n]=r,t.controlRoomId??(t.controlRoomId=n),t.idleTimer=Ye(t.idleTimer),e.then(c=>{if(t.isClosing||t.bindings[n]!==r)return;r.roomToken=c,t.bindingsByToken[c]=r;const l=t.pendingDataByToken.get(c);l!=null&&l.length&&(r.pendingData.push(...l),t.pendingDataByToken.delete(c));const h=r.pendingSendData.splice(0);wr(t.peer)||h.forEach(u=>{try{t.peer.sendData(jc(c,u))}catch{}}),this.flushBindingQueues(t,r),this.discardUnboundData(t)}),{proxy:a,isNew:!0}}releaseStreamOwner(n,e,t){const i=n.streamOwners.get(e);i&&(i.delete(t),i.size===0&&(n.streamOwners.delete(e),n.peer.removeStream(e)))}releaseTrackOwner(n,e,t){const i=n.trackOwners.get(e);i&&(i.rooms.delete(t),i.rooms.size===0&&(n.trackOwners.delete(e),n.peer.removeTrack(e)))}pruneRoomOwnership(n,e){n.streamOwners.forEach((t,i)=>this.releaseStreamOwner(n,i,e)),n.trackOwners.forEach((t,i)=>this.releaseTrackOwner(n,i,e))}scheduleIdleTimer(n){n.isClosing||Jt(n.bindings).length>0||(n.idleTimer=Ye(n.idleTimer),n.idleTimer=setTimeout(()=>{var t;const e=(t=this.byApp[n.appId])==null?void 0:t[n.peerId];!e||Jt(e.bindings).length>0||this.clear(n.appId,n.peerId,{destroyPeer:!0})},n.idleMs))}getSignalBinding(n){if(n.controlRoomId){const t=n.bindings[n.controlRoomId];if(t!=null&&t.handlers.signal)return t}const e=yn(n.bindings).find(t=>!!t.handlers.signal);return e?(n.controlRoomId=e.roomId,e):null}flushBindingQueues(n,e){const{handlers:t}=e;if(t.data&&e.pendingData.length>0){const i=e.pendingData.splice(0);this.syncDataTimers(n),i.forEach(s=>{var r;return(r=t.data)==null?void 0:r.call(t,s)})}else this.syncDataTimers(n);(t.track||t.stream)&&e.pendingTracks.length&&e.pendingTracks.splice(0).forEach(({track:i,stream:s})=>{var r,o;(r=t.track)==null||r.call(t,i,s),(o=t.stream)==null||o.call(t,s)})}unclaimedBufferedFrameCount(n){let e=0;for(const t of n.pendingDataByToken.values())e+=t.length;return e}boundBufferedFrameCount(n){let e=0;for(const t of yn(n.bindings))e+=t.pendingData.length;return e}bufferedFrameCount(n){return this.unclaimedBufferedFrameCount(n)+this.boundBufferedFrameCount(n)}clearDataTimers(n){Ye(this.unclaimedDataTimers.get(n)),this.unclaimedDataTimers.delete(n),Ye(this.pendingDataTimers.get(n)),this.pendingDataTimers.delete(n)}syncDataTimers(n){if(n.isClosing){this.clearDataTimers(n);return}this.unclaimedBufferedFrameCount(n)===0?(Ye(this.unclaimedDataTimers.get(n)),this.unclaimedDataTimers.delete(n)):this.unclaimedDataTimers.has(n)||this.unclaimedDataTimers.set(n,setTimeout(()=>{this.unclaimedDataTimers.delete(n),n.pendingDataByToken.clear()},Zo)),this.boundBufferedFrameCount(n)===0?(Ye(this.pendingDataTimers.get(n)),this.pendingDataTimers.delete(n)):this.pendingDataTimers.has(n)||this.pendingDataTimers.set(n,setTimeout(()=>{this.pendingDataTimers.delete(n),this.boundBufferedFrameCount(n)>0&&this.failData(n,"room data handler timed out")},Zo))}canBindRoomToken(n,e){var t;return yn(n.bindings).some(i=>!i.roomToken)||[...((t=this.rooms.get(n.appId))==null?void 0:t.values())??[]].some(i=>!i.token||i.token===e)}discardUnboundData(n){for(const e of n.pendingDataByToken.keys())this.canBindRoomToken(n,e)||n.pendingDataByToken.delete(e);this.syncDataTimers(n)}failData(n,e){console.warn(`${Et}: ${e}; disconnecting peer ${n.peerId}`),this.clear(n.appId,n.peerId,{destroyPeer:!0})}dispatchData(n,e){var s,r;if(n.isClosing)return;const t=lf(e);if(!t){this.failData(n,"invalid or incompatible room frame");return}if(t.type==="presence"){if(t.isPresent){if(!n.remoteRoomTokens.has(t.roomToken)&&n.remoteRoomTokens.size>=64){this.failData(n,"too many advertised rooms");return}n.remoteRoomTokens.add(t.roomToken);for(const[o,a]of this.rooms.get(n.appId)??[])a.token===t.roomToken&&this.attachRoom(n.appId,o,a,n)}else{n.remoteRoomTokens.delete(t.roomToken),n.pendingDataByToken.delete(t.roomToken);const o=n.bindingsByToken[t.roomToken];(r=o==null?void 0:(s=o.handlers).close)==null||r.call(s),o==null||o.detach(),this.syncDataTimers(n)}return}const i=n.bindingsByToken[t.roomToken];if(!i){if(!this.canBindRoomToken(n,t.roomToken)||this.bufferedFrameCount(n)>=64)return;const o=n.pendingDataByToken.get(t.roomToken)??[];o.push(t.payload),n.pendingDataByToken.set(t.roomToken,o),this.syncDataTimers(n);return}if(i.handlers.data)i.handlers.data(t.payload);else{if(this.bufferedFrameCount(n)>=64){this.failData(n,"too much data waiting for a room handler");return}i.pendingData.push(t.payload),this.syncDataTimers(n)}}dispatchSignal(n,e){var i,s;const t=this.getSignalBinding(n);t?(s=(i=t.handlers).signal)==null||s.call(i,e):e.type==="offer"&&this.clear(n.appId,n.peerId,{destroyPeer:!0})}dispatchTrack(n,e,t){yn(n.bindings).forEach(i=>{var s,r,o,a;if(i.handlers.track||i.handlers.stream){(r=(s=i.handlers).track)==null||r.call(s,e,t),(a=(o=i.handlers).stream)==null||a.call(o,t);return}i.pendingTracks.push({track:e,stream:t})})}};const Zc=23333,df=57333,ff=12,pf=7533,mf=23333,Rs="offer-placeholder",gf=["offer","answer","candidate"],Hh=n=>{if(typeof n=="string")try{const e=ks(n);return e&&typeof e=="object"&&!Array.isArray(e)?e:null}catch{return null}return n&&typeof n=="object"&&!Array.isArray(n)?n:null},Vn=(n,e)=>typeof n[e]=="string"&&n[e]?n[e]:void 0,Gh=n=>!!(n&&typeof n=="object"&&typeof n.signal=="function"&&typeof n.destroy=="function"&&typeof n.setHandlers=="function"),Wh=(n,e=!1)=>gf.some(t=>t in n&&(typeof n[t]!="string"||n[t]===""))||"peer"in n&&(e||n.peer!==void 0&&!Gh(n.peer)),_f=n=>{const e=Hh(n);if(!e||Wh(e,typeof n=="string"))return!1;const t=Vn(e,"peerId");return!!(t&&t!==St&&e.passive!==!0&&!Vn(e,"answer")&&!Vn(e,"candidate"))},vf=(n,e,t,i,s,r)=>{n.toCipher(e).then(o=>{n.isLeaving()||!r()||i(t,Ct(s(o.sdp)))})},yf=()=>({offerPeer:null,offerId:null,offerSdp:null,offerInitPromise:null,offerAnswered:!1,offerRelays:[],offerSignalRelays:[],offerSignalBacklog:[],offerRelayTimers:[],offerExpiryTimer:null,connectedPeer:null,connectedPeerUnhealthySinceMs:null,answeringExpiryTimer:null,answeringPeer:null,answerSent:!1,answerReplay:null,connectionErrorReported:!1}),xf=n=>{var e;return[...n.turnConfig??[],...((e=n.rtcConfig)==null?void 0:e.iceServers)??[]].some(({urls:t})=>(Array.isArray(t)?t:[t]).some(i=>/^turns?:/i.test(i)))},Mf=(n,e)=>`could not connect to peer ${n} after exchanging SDP; ${xf(e)?"check that your TURN server URLs and credentials are reachable by both peers":"configure TURN servers with turnConfig or rtcConfig.iceServers"}`,Hr=(n,e,t)=>{var i;n.isLeaving()||e.connectedPeer||e.connectionErrorReported||(e.connectionErrorReported=!0,(i=n.onJoinError)==null||i.call(n,{error:Mf(t,n.config),appId:n.appId,peerId:t,roomId:n.roomId}))},Gr=(n,e)=>n[e]??(n[e]=yf()),Ir=new WeakMap,Ja=n=>{Ir.delete(n),n.answeringExpiryTimer=Ye(n.answeringExpiryTimer),n.answeringPeer=null,n.answerSent=!1,n.answerReplay=null},Cs=(n,e)=>{n.answeringPeer===e&&(Ja(n),n.connectedPeer!==e&&!e.isDead&&e.destroy())},Sf=(n,e)=>{n.answeringPeer&&n.answeringPeer!==e&&!n.answeringPeer.isDead&&n.answeringPeer.destroy(),Ja(n),n.connectedPeer=e,n.connectedPeerUnhealthySinceMs=null},Jc=(n,e)=>{(n==null?void 0:n.connectedPeer)===e&&(n.connectedPeer=null,n.connectedPeerUnhealthySinceMs=null)},ta=(n,e,t)=>{n.connectedPeer&&(n.connectedPeer.isDead||n.connectedPeer.destroy(),n.connectedPeer=null,n.connectedPeerUnhealthySinceMs=null)},Qa=(n,e)=>{n.offerRelayTimers[e]=Ye(n.offerRelayTimers[e]),n.offerRelays[e]&&(n.offerRelays[e]=void 0)},co=(n,e)=>{(n==null?void 0:n.offerRelays[e])===Rs&&Qa(n,e)},fi=n=>{Ir.delete(n),n.offerExpiryTimer=Ye(n.offerExpiryTimer),n.offerInitPromise=null,n.offerRelays.forEach((e,t)=>Qa(n,t)),n.offerRelays=[],n.offerSignalRelays=[],n.offerRelayTimers=[],n.offerSignalBacklog=[],n.offerPeer&&n.offerPeer!==n.connectedPeer&&(n.offerPeer.isDead||n.offerPeer.destroy()),n.offerPeer=null,n.offerId=null,n.offerSdp=null,n.offerAnswered=!1,n.connectionErrorReported=!1},Ef=(n,e,t,i)=>{Ye(e.answeringExpiryTimer),e.answeringExpiryTimer=setTimeout(()=>{const s=n.peerStates[t];!s||s.connectedPeer||s.answeringPeer!==i||(s.answerSent&&Hr(n,s,t),Cs(s,i),n.checkDeactivate())},mf)},na=(n,e,t,i=df)=>{Ye(e.offerExpiryTimer);const s=e.offerId;e.offerExpiryTimer=setTimeout(()=>{const r=n.peerStates[t];!r||r.connectedPeer||r.offerId!==s||(r.offerAnswered&&Hr(n,r,t),fi(r),n.checkDeactivate())},i)},Xh=(n,e,t,i,s)=>{const r=()=>{e.offerPeer===i&&!e.connectedPeer&&(e.offerAnswered&&Hr(n,e,t),fi(e)),n.disconnectPeer(i,t),n.checkDeactivate()};i.setHandlers({connect:()=>n.connectPeer(i,t),...s?{signal:s}:{},close:r,error:r})},wf=(n,e,t)=>{if(e.offerPeer&&e.offerId&&e.offerSdp)return Promise.resolve({peer:e.offerPeer,offer:e.offerSdp,offerId:e.offerId});if(e.offerInitPromise)return e.offerInitPromise;const s=(async()=>{let r;try{r=(await n.offerManager.checkout(1,!1,n.encryptOffer))[0]}catch(c){if(n.isLeaving()||e.offerInitPromise!==s)return null;throw c}if(!r)throw Xe("failed to allocate offer peer");const{peer:o,offer:a}=r;return n.isLeaving()||e.offerInitPromise!==s?(o.destroy(),null):(e.offerPeer=o,e.offerId=vi(ff),e.offerSdp=a,e.offerAnswered=!1,e.connectionErrorReported=!1,e.offerSignalBacklog=[],Xh(n,e,t,o,c=>{e.offerPeer===o&&(e.offerSignalBacklog.push(c),e.offerSignalRelays.forEach(l=>l==null?void 0:l(c)))}),na(n,e,t),{peer:o,offer:a,offerId:e.offerId})})().finally(()=>{e.offerInitPromise===s&&(e.offerInitPromise=null)});return e.offerInitPromise=s},qh=async(n,e,t,i,s=0)=>{const r=n.peerStates[t];if(!r||r.connectedPeer||r.answeringPeer||r.offerAnswered){co(r,e);return}if(r.offerRelays[e]!==Rs)return;const[o,a]=await yi([Ki(ji(n.rootTopicPlaintext,t)),wf(n,r,t)]);if(!a){co(r,e);return}if(n.isLeaving()){fi(r);return}if(r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerRelays[e]!==Rs){co(r,e);return}r.offerRelayTimers[e]=Ye(r.offerRelayTimers[e]),r.offerRelays[e]=!0,r.offerRelayTimers[e]=setTimeout(()=>{if(s>=2||n.isLeaving()||r.connectedPeer||r.answeringPeer||r.offerAnswered||r.offerPeer!==a.peer||r.offerId!==a.offerId){Rf(n,t,e);return}r.offerRelays[e]=Rs,qh(n,e,t,i,s+1)},s===0&&n.announceIntervals[e]===void 0?2e3:(n.announceIntervals[e]??n.announceIntervalMs)*.9);let c=!1;r.offerSignalRelays[e]=l=>{c&&(n.isLeaving()||r.connectedPeer||r.offerPeer!==a.peer||r.offerId!==a.offerId||l.type!=="candidate"||vf(n,l,o,i,h=>({peerId:St,offerId:a.offerId,candidate:h,...n.isPassive?{passive:!0}:{}}),()=>!r.connectedPeer&&r.offerPeer===a.peer&&r.offerId===a.offerId))},i(o,Ct({peerId:St,offerId:a.offerId,offer:a.offer,...n.isPassive?{passive:!0}:{}})),c=!0,r.offerSignalBacklog.forEach(l=>{var h,u;return(u=(h=r.offerSignalRelays)[e])==null?void 0:u.call(h,l)})},Tf=async(n,e,t,i,s,r)=>{var p;const o=Gr(n.peerStates,t);if(o.answeringPeer||o.offerAnswered){const d=o.answerReplay,_=d==null?void 0:d.lastSentAt[e];if(o.answeringPeer&&!o.answeringPeer.isDead&&d&&d.offer===i&&d.offerId===s&&(_===void 0||Date.now()-_>=1e3)){d.lastSentAt[e]=Date.now();const y=await Ki(ji(n.rootTopicPlaintext,t));if(!n.isLeaving()&&o.answerReplay===d&&!o.connectedPeer){const x=C=>r(y,C);d.relays[e]=x,d.messages.forEach(x)}}return}const a=!!(o.offerPeer||o.offerRelays.some(Boolean));if(a&&St<t)return;a&&fi(o);const c=n.initPeer(!1,n.config),l={offer:i,offerId:s,messages:[],lastSentAt:[],relays:[]};l.lastSentAt[e]=Date.now(),o.answeringPeer=c,o.answerSent=!1,o.answerReplay=l,o.connectionErrorReported=!1,Ef(n,o,t,c);const h=()=>{o.answeringPeer===c&&!o.connectedPeer&&o.answerSent&&Hr(n,o,t),Cs(o,c),n.disconnectPeer(c,t),n.checkDeactivate()};c.setHandlers({connect:()=>n.connectPeer(c,t),close:h,error:h});let u;try{u=await n.toPlain({type:"offer",sdp:i})}catch{Cs(o,c),(p=n.onJoinError)==null||p.call(n,{error:"incorrect room password when decrypting offer",appId:n.appId,peerId:t,roomId:n.roomId});return}if(c.isDead){Cs(o,c);return}const f=await Ki(ji(n.rootTopicPlaintext,t));if(n.isLeaving()||o.answerReplay!==l)return;l.relays[e]=d=>r(f,d);const m=[];let g=!1;const v=d=>{n.toCipher(d).then(_=>{if(n.isLeaving()||o.answeringPeer!==c||c.isDead)return;const y={peerId:St};d.type==="answer"?(o.answerSent=!0,y.answer=_.sdp):y.candidate=_.sdp,s&&(y.offerId=s),n.isPassive&&(y.passive=!0);const x=Ct(y),C=Date.now();l.messages.push(x),l.relays.forEach((b,R)=>{b&&(l.lastSentAt[R]=C,b(x))}),d.type==="answer"&&!g&&(g=!0,m.splice(0).forEach(v))})};c.setHandlers({signal:d=>{if(!(n.isLeaving()||o.answeringPeer!==c||c.isDead)&&!(d.type!=="answer"&&d.type!=="candidate")){if(d.type==="candidate"&&!g){m.push(d);return}v(d)}}}),await c.signal(u)},bf=async(n,e,t,i,s)=>{var u;let r;try{r=await n.toPlain({type:Ih,sdp:t})}catch{return}const o=n.peerStates[e],a=i&&(o!=null&&o.offerPeer)&&o.offerId===i?o.offerPeer:null,c=!i||((u=o==null?void 0:o.answerReplay)==null?void 0:u.offerId)===i?o==null?void 0:o.answeringPeer:null,l=!i&&(o!=null&&o.offerPeer)?o.offerPeer:null,h=s&&!s.isDead?s:a??c??l;h&&!h.isDead&&h.signal(r)},Af=async(n,e,t,i,s)=>{var o;let r;try{r=await n.toPlain({type:"answer",sdp:t})}catch{s&&(n.offerManager.reclaimLeased(s),s.isDead||s.destroy()),(o=n.onJoinError)==null||o.call(n,{error:"incorrect room password when decrypting answer",appId:n.appId,peerId:e,roomId:n.roomId});return}if(s){const a=Gr(n.peerStates,e);if(n.offerManager.claimLeased(s),a.connectedPeer||a.offerAnswered||a.answeringPeer&&!a.answeringPeer.isDead&&St>e){s.destroy();return}if(a.answeringPeer){const c=a.answeringPeer;Cs(a,c)}fi(a),a.offerPeer=s,a.offerId=i??null,a.offerAnswered=!0,na(n,a,e,Zc),Xh(n,a,e,s),s.signal(r)}else{const a=n.peerStates[e];if(!a||!a.offerPeer||a.offerAnswered||i&&a.offerId&&i!==a.offerId||a.offerPeer.isDead)return;a.offerAnswered=!0,na(n,a,e,Zc),a.offerPeer.signal(r)}},Rf=(n,e,t)=>{const i=n.peerStates[e];!i||i.connectedPeer||i.offerRelays[t]&&(Qa(i,t),n.checkDeactivate())},Cf=n=>e=>async(t,i,s)=>{var d;if(n.isLeaving())return;const r=Hh(i);if(!r||Wh(r,typeof i=="string"))return;const o=Vn(r,"peerId")??"",a=Vn(r,"offer"),c=Vn(r,"answer"),l=Vn(r,"candidate"),h=Vn(r,"offerId"),u=Gh(r.peer)?r.peer:void 0,f=r.passive===!0;if(!o||o===St)return;const[m,g]=await yi([n.rootTopicP,n.selfTopicP]);if(n.isLeaving()||t!==m&&t!==g||n.isPassive&&f||(n.isPassive&&!n.isActive&&!c&&!l&&(n.isActive=!0,(d=n.requeueAnnounce)==null||d.call(n)),n.isPassive&&!n.isActive))return;const v=n.peerStates[o],p=v==null?void 0:v.connectedPeer;if(p&&v){const _=hf(p);if(_==="live"){v.connectedPeerUnhealthySinceMs=null;return}if(_==="stale")ta(v);else{const y=Date.now(),x=v.connectedPeerUnhealthySinceMs??y;if(v.connectedPeerUnhealthySinceMs=x,y-x<pf)return;ta(v)}}if(!n.reusePeer(o)){if(o&&!a&&!c&&!l){const _=Gr(n.peerStates,o),y=St<o;if(_.answeringPeer||_.connectedPeer||_.offerAnswered)return;if(!y&&!_.offerPeer){let x=Ir.get(_);x||(x=[],Ir.set(_,x));const C=x[e];if(C!==void 0&&Date.now()-C<1e3)return;x[e]=Date.now();const b=await Ki(ji(n.rootTopicPlaintext,o));!n.isLeaving()&&!_.connectedPeer&&!_.answeringPeer&&!_.offerAnswered&&s(b,Ct({peerId:St}));return}return _.offerRelays[e]?void 0:(_.offerRelays[e]=Rs,qh(n,e,o,s))}if(a)return Tf(n,e,o,a,h,s);if(l)return bf(n,o,l,h,u);if(c)return Af(n,o,c,h,u)}},Ks=5333,Pf=[233,533,1333],Qc=7533,Lf=123333;var Df=({init:n,subscribe:e,announce:t,deactivate:i})=>{const s={},r={},o=new uf,a=()=>yn(s).some(u=>Jt(u).length>0);let c=!1,l=[],h=_t;return(u,f,m)=>{var E,$,ee,se;if(!u)throw Xe("requires a config map as the first argument");if(m&&typeof m!="object")throw Xe("third argument must be a callbacks object");const{appId:g}=u,v=m==null?void 0:m.onJoinError,p=m==null?void 0:m.onPeerHandshake,d=m==null?void 0:m.handshakeTimeoutMs;if(!g)throw Xe("config map is missing appId field");if(!f)throw Xe("roomId argument required");if(u.maxReceiveBytes!==void 0&&(!Number.isSafeInteger(u.maxReceiveBytes)||u.maxReceiveBytes<=0))throw Xe("maxReceiveBytes must be a positive safe integer");if(d!==void 0&&(!Number.isFinite(d)||d<=0))throw Xe("handshakeTimeoutMs must be a positive number");if((E=s[g])!=null&&E[f])return s[g][f];(ee=($=r[g])==null?void 0:$[f])==null||ee.call($,!0);const _=ji(Et,g,f),y=Ki(_),x=Ki(ji(_,St)),C=Rd(u.password??"",g,f),b=Cd(g,f),R=u._test_only_sharedPeerIdleMs??Lf;let D=!1;const w=q=>async oe=>({type:oe.type,sdp:await q(C,oe.sdp)}),M=w(Ld),I=w(Pd),W=()=>Uc(!0,u);let S=!1;const L=new Id(W),N=async q=>{const oe=await q.getOffer();if(!oe||oe.type!=="offer")throw Xe("failed to get offer for peer");return(await I(oe)).sdp},P=(q,oe)=>{A.connect(oe,q,R)};let z=!1;const B=()=>{k||!S||z||(z=!0,queueMicrotask(()=>{var q;z=!1,D||(q=X.requeueAnnounce)==null||q.call(X)}))},F=(q,oe)=>{if(D)return;const ie=X.peerStates[oe];(ie==null?void 0:ie.connectedPeer)===q&&(ta(ie),Me(),B())},k=!!u.passive;let Z,he=_t;const Me=()=>{if(!k||!X.isActive)return;let q=!1;$i(X.peerStates).forEach(([oe,ie])=>{ie.connectedPeer||ie.answeringPeer||ie.offerInitPromise||ie.offerPeer||ie.offerRelays.some(Boolean)?q=!0:delete X.peerStates[oe]}),q||(X.isActive=!1,Z=Ye(Z),Ie.forEach(Ye),Ie.length=0,he(),A.setActive(!1))},X={appId:g,roomId:f,config:u,peerStates:{},rootTopicPlaintext:_,rootTopicP:y,selfTopicP:x,toPlain:M,toCipher:I,isLeaving:()=>D,isPassive:k,isActive:!k,onJoinError:v,offerManager:L,encryptOffer:N,initPeer:Uc,connectPeer:P,disconnectPeer:F,reusePeer:q=>A.reuse(q),checkDeactivate:Me,announceIntervals:[],announceIntervalMs:Ks},te={config:u,appId:g,roomId:f,isPassive:k},le=Cf(X);if(!c){const q=n(u);l=(Array.isArray(q)?q:[q]).map(oe=>Promise.resolve(oe)),c=!0,h=(se=u.relayConfig)!=null&&se.manualReconnection?_t:Td()}const ae=l.map(()=>Ks),Re=l.map(()=>0),Le=l.map(()=>0),Ie=[],Y=l.map(async(q,oe)=>e(await q,await y,await x,le(oe),ie=>L.getOffers(ie,N),te));yi([y,x]).then(([q,oe])=>{if(D)return;const ie=async(de,Pe)=>{var $e;if(D||k&&!X.isActive)return;const re=k?{passive:!0}:void 0;let fe;try{fe=await t(de,q,oe,re,te),Le[Pe]=0}catch(ze){if(D)return;const et=Le[Pe]??0;et===0&&(($e=u.relayConfig)==null?void 0:$e.warnOnRelayFailure)!==!1&&console.warn(`${Et}: announce failed - ${Yi(ze,"")}`),Le[Pe]=et+1}if(D||k&&!X.isActive||fe&&typeof fe!="number"&&"stopAnnouncing"in fe)return;typeof fe=="number"?(X.announceIntervals[Pe]=fe,ae[Pe]=fe):fe&&(ae[Pe]=fe.nextAnnounceMs,S||(S=fe.reannounceOnDisconnect===!0));const De=Re[Pe]??0;Re[Pe]=De+1;const Fe=ae[Pe]??Ks,xe=Pf[De]??(De===3&&typeof fe=="object"?Ks:void 0);Ie[Pe]=setTimeout(()=>{ie(de,Pe)},typeof xe=="number"?Math.min(Fe,xe):Fe)};he=()=>{i&&l.forEach(async de=>{const Pe=await de;D||i(Pe,q,oe,te)})},X.requeueAnnounce=()=>{Ie.forEach(Ye),Ie.length=0,Z=Ye(Z),A.setActive(!0),Z=setTimeout(Me,Qc),l.forEach(async(de,Pe)=>{const re=await de;re&&!D&&(Re[Pe]=0,ie(re,Pe))})},Y.forEach(async(de,Pe)=>{if(await de,D)return;const re=await l[Pe];re&&!D&&(!k||X.isActive)&&ie(re,Pe)})});let Q=_t;const ue=u.password??"",{compose:U}=Ud(ue,g,f),Ne=U(p),Ue=()=>{var q;((q=s[g])==null?void 0:q[f])===me&&(delete s[g][f],Jt(s[g]).length===0&&delete s[g])},Oe=()=>{var q;((q=r[g])==null?void 0:q[f])===Se&&(delete r[g][f],Jt(r[g]).length===0&&delete r[g])},Se=(q=!1)=>{D||(D=!0,Q=_t,Ue(),Oe(),A.leave(),$i(X.peerStates).forEach(([oe,ie])=>{ie.connectedPeer&&!ie.connectedPeer.isDead&&(o.owns(g,oe,ie.connectedPeer)||ie.connectedPeer.destroy()),ie.answeringPeer&&!ie.answeringPeer.isDead&&ie.answeringPeer.destroy(),fi(ie),Ja(ie),ie.connectedPeer=null,ie.connectedPeerUnhealthySinceMs=null}),Ie.forEach(Ye),Z=Ye(Z),Y.forEach(async oe=>{(await oe)()}),L.destroy(),!(q||a())&&(c=!1,h()))},Ee={...u.maxReceiveBytes===void 0?{}:{maxReceiveBytes:u.maxReceiveBytes},...Ne?{onPeerHandshake:Ne}:{},...d===void 0?{}:{handshakeTimeoutMs:d},isPassive:k,onBeforeLeave:()=>{Ue(),(r[g]??(r[g]={}))[f]=Se},onHandshakeError:(q,oe)=>v==null?void 0:v({error:oe.replace(/^handshake failed: /,""),appId:g,peerId:q,roomId:f})};s[g]??(s[g]={});const me=af(q=>Q=q,q=>{if(D)return;const oe=X.peerStates[q];oe!=null&&oe.connectedPeer&&Jc(oe,oe.connectedPeer),Me(),B()},()=>Se(!1),Ee),A=o.registerRoom(g,f,b,{active:!k||X.isActive,onPeer:(q,oe,ie)=>{const de=Gr(X.peerStates,oe);Sf(de,ie),k&&!X.isActive&&(X.isActive=!0,A.setActive(!0),X.requeueAnnounce?X.requeueAnnounce():(Z=Ye(Z),Z=setTimeout(Me,Qc))),Q(q,oe),fi(de)},onDetach:(q,oe)=>{Jc(X.peerStates[q],oe),Me()}});return s[g][f]=me}};const If=6e4,lo=n=>{if(!n)throw Xe("topic strategy missing room context");return n},us=(n,e,t,i)=>({kind:e,appId:n.appId,roomId:n.roomId,rootTopic:t,selfTopic:i});var Uf=({steadyAnnounceIntervalMs:n=If,reannounceOnDisconnect:e=!0,init:t,subscribeTopic:i,publishTopic:s,unpublishTopic:r})=>Df({init:t,subscribe:async(o,a,c,l,h,u)=>{const f=lo(u),m=(C,b)=>void s(o,C,b,us(f,"signal",a,c));let g=null,v=!1,p=null,d=!1;const _=C=>{v||(v=!0,C())},y=()=>(p||(p=Promise.resolve(i(o,c,(C,b)=>{d||l(C,b,m)},us(f,"self",a,c))).then(C=>{g=C,d&&_(C)})),p);f.isPassive||await y();const x=await i(o,a,async(C,b)=>{d||(f.isPassive&&_f(b)&&await y(),d||await l(C,b,m))},us(f,"root",a,c));return()=>{d=!0,g&&_(g),x()}},announce:async(o,a,c,l,h)=>{const u=lo(h),f=await s(o,a,Ct({peerId:St,...l}),us(u,"announce",a,c));return typeof f=="number"||f!==void 0&&"stopAnnouncing"in f?f:{nextAnnounceMs:(f==null?void 0:f.nextAnnounceMs)??n,reannounceOnDisconnect:(f==null?void 0:f.reannounceOnDisconnect)??e}},...r?{deactivate:(o,a,c,l)=>{const h=lo(l);return r(o,a,us(h,"announce",a,c))}}:{}});const $h=wd(n=>n.socket),Nf=5,Yh="x",jh="EVENT",{secretKey:Ff,publicKey:Of}=Ph.keygen(),Bf=Ls(Of),ho={},el=250,ai=6e4,kf=9e5,ec=5333,Ds=new WeakMap,Ur=$h.scoped(),ia=new WeakSet,zf=n=>{const e=Ds.get(n),t=Math.min(e!=null&&e.delayMs?Math.max(ai,e.delayMs*2):ai,kf);return Ds.set(n,{delayMs:t,untilMs:Date.now()+t}),t},Is=n=>{const e=Ds.get(n);if(!e)return 0;const t=e.untilMs-Date.now();return t>0?t:0},Zs=n=>({nextAnnounceMs:n}),Vf={stopAnnouncing:!0},Hf=n=>{var e;return ia.has(n)?!1:(ia.add(n),Ds.delete(n),(e=n.close)==null||e.call(n),!0)},Kh=()=>Math.floor(Date.now()/1e3),Zh=n=>ho[n]??(ho[n]=Uh(n,1e4)+2e4),Gf=async(n,e)=>{const t={kind:Zh(n),tags:[[Yh,n]],created_at:Kh(),content:e,pubkey:Bf},i=await Vr("SHA-256",Ct([0,t.pubkey,t.created_at,t.kind,t.tags,t.content]));return Ct([jh,{...t,id:Ls(i),sig:Ls(await Ph.signAsync(i,Ff))}])},Bt={},Jh=n=>{n.flushWaiters.forEach(e=>e()),n.flushWaiters.clear()},Wf=(n,e,t)=>{var s;const i=Bt[s=n.url]??(Bt[s]={subIds:[],topics:new Map,updateTimer:null,flushWaiters:new Set,retryTimer:null,retryMs:ec,pendingEose:new Set,requestedAt:0});i.topics.set(e,t),Qh(n,i)},Xf=(n,e)=>{const t=Bt[n.url];t&&(t.topics.delete(e),delete Ur.forRelay(n)[e],t.topics.size===0?(t.retryTimer!==null&&clearTimeout(t.retryTimer),t.updateTimer!==null&&(clearTimeout(t.updateTimer),t.updateTimer=null),Jh(t),t.subIds.forEach(i=>n.send(Ct(["CLOSE",i]))),delete Bt[n.url]):Qh(n,t))},Qh=(n,e)=>{e.updateTimer===null&&(e.updateTimer=setTimeout(()=>{e.updateTimer=null;try{eu(n)}finally{Jh(e)}},0))},qf=n=>{const e=Bt[n.url];return!e||e.updateTimer===null?Promise.resolve():new Promise(t=>e.flushWaiters.add(t))},eu=n=>{const e=Bt[n.url];if(!e||e.topics.size===0)return;const t=[...e.topics.keys()],i=[],s=Kh();for(let r=0;r<t.length;r+=el)i.push(t.slice(r,r+el));for(;e.subIds.length>i.length;){const r=e.subIds.pop();r&&n.send(Ct(["CLOSE",r]))}e.pendingEose.clear(),e.requestedAt=Date.now(),i.forEach((r,o)=>{var c;const a=(c=e.subIds)[o]??(c[o]=vi(64));e.pendingEose.add(a),n.send(Ct(["REQ",a,{kinds:[...new Set(r.map(Zh))],since:s,"#x":r}]))})},tu=n=>{const e=Bt[n.url];if(e&&e.topics.size>0&&!n.isClosed){if(Is(n)>0){su(n,!0);return}e.retryTimer!==null&&(clearTimeout(e.retryTimer),e.retryTimer=null),eu(n),nu(n)}},nu=n=>{Object.entries(Ur.forRelay(n)).forEach(([e,t])=>{iu(n,e,t,!0)})},iu=async(n,e,t,i)=>{var o;if(ia.has(n)||n.isClosed)return i?Vf:void 0;const s=Is(n);if(s>0||n.socket.readyState!==1)return i?Zs(Math.max(ai,s)):void 0;const r=await Gf(e,i?Ct({...ks(t),nonce:vi(8)}):t);if(i&&!((o=Bt[n.url])!=null&&o.topics.has(e)))return Zs(ai);if(Is(n)>0||n.isClosed||n.socket.readyState!==1)return i?Zs(ai):void 0;if(n.send(r),i)return Zs(ai)},su=(n,e)=>{const t=Bt[n.url];if(!t||t.retryTimer!==null&&!e)return;t.retryTimer!==null&&clearTimeout(t.retryTimer);const i=e?Is(n):t.retryMs;t.retryMs=Math.min(t.retryMs*2,ai),t.retryTimer=setTimeout(()=>{t.retryTimer=null,tu(n)},Math.max(i,ec))},ru=Uf({init:n=>yd(n,$f,Nf,!0).map(e=>{const t=$h.register(e,()=>Ed(e,i=>{var c,l;const[s,r,o,a]=ks(i);if(s!==jh){const h=`${Et}: relay failure from ${t.url} - `,u=s==="CLOSED"&&typeof o=="string"?o:a,f=s==="OK"&&o===!1,m=(f||s==="CLOSED")&&(u==null?void 0:u.startsWith("rate-limited:")),g=f&&(u==null?void 0:u.startsWith("duplicate:")),v=u&&/^(blocked|restricted|auth-required|pow):/.test(u);if(s==="OK"&&o===!0&&Is(t)===0&&Ds.delete(t),(f||s==="CLOSED")&&v&&!Hf(t))return;if(m)zf(t);else if(s==="EOSE"){const p=Bt[t.url];p!=null&&p.pendingEose.delete(r)&&p.pendingEose.size===0&&(p.retryMs=ec,p.retryTimer!==null&&(clearTimeout(p.retryTimer),p.retryTimer=null),Date.now()-p.requestedAt>=1e3&&nu(t))}s==="CLOSED"&&!v&&su(t,!!m),!g&&((c=n.relayConfig)==null?void 0:c.warnOnRelayFailure)!==!1&&(s==="NOTICE"?console.warn(h+r):(f||s==="CLOSED")&&console.warn(h+u));return}if(o&&typeof o=="object"&&"content"in o){const h=Bt[t.url];if(h!=null&&h.subIds.includes(r)&&o.tags){const u=o.tags.find(f=>f[0]===Yh);u!=null&&u[1]&&((l=h.topics.get(u[1]))==null||l(u[1],o.content))}}},()=>tu(t)));return t.ready}),subscribeTopic:(n,e,t,i)=>{const s=(o,a)=>void t(o,a);Wf(n,e,s);const r=()=>{var o;((o=Bt[n.url])==null?void 0:o.topics.get(e))===s&&Xf(n,e)};return i.kind==="root"?qf(n).then(()=>r):r},publishTopic:(n,e,t,{kind:i})=>{const s=typeof t=="string"?t:Ct(t);return i==="announce"&&(Ur.forRelay(n)[e]=s),iu(n,e,s,i==="announce")},unpublishTopic:(n,e)=>{delete Ur.forRelay(n)[e]}}),$f=["0x-nostr-relay.fly.dev","bendernostur.duckdns.org:8443","cdn.satellite.earth","nos.lol","nostr.chaima.info","nostr.christiansass.de","nostr.rblb.it","nostr.red5d.dev","nostr.robosats.org","nostr.stakey.net","nostrcity-club.fly.dev","relay-dev.gulugulu.moe","relay.aarpia.com","relay.agentry.com","relay.bitmacro.cloud","relay.bullishbounty.com","relay.degmods.com","relay.flashapp.me","relay.grigic.org","relay.hackshed.dev","relay.kaleidoswap.com","relay.layer.systems","relay.nostr.blockhenge.com","relay.nostr.dev.br","relay.nostrmap.net","relay.novospes.com","relay.piazza.today","relay.routstr.com","testr.nymble.world"].map(n=>"wss://"+n);function Mn(n,e){if(!n||typeof n.makeAction!="function")return{send:()=>{},onReceive:()=>{}};const t=n.makeAction(e),i=(s,r)=>{if(typeof s=="string"&&s.length>0)return s;if(s&&typeof s=="object"){if(typeof s.peerId=="string"&&s.peerId.length>0)return s.peerId;if(typeof s.id=="string"&&s.id.length>0)return s.id}if(r&&typeof r=="object"){if(typeof r.id=="string"&&r.id.length>0)return r.id;if(typeof r.senderId=="string"&&r.senderId.length>0)return r.senderId}return null};return Array.isArray(t)?{send:(s,r)=>{try{t[0](s,r)}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{t[1]((r,o)=>{const a=i(o,r);a&&s(r,a)})}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}:{send:(s,r)=>{try{if(t&&typeof t.send=="function"){let o;r&&typeof r=="string"?o=t.send(s,{target:r}):o=t.send(s),o&&typeof o.catch=="function"&&o.catch(()=>{})}}catch(o){console.warn(`[Action:${e}] send error:`,o)}},onReceive:s=>{try{if(!t)return;const r=(o,a)=>{const c=i(a,o);c&&s(o,c)};"onMessage"in t?t.onMessage=r:"onReceive"in t&&(typeof t.onReceive=="function"?t.onReceive(r):t.onReceive=r)}catch(r){console.warn(`[Action:${e}] onReceive error:`,r)}}}}const ou="rockets-3d-space-shooter",Yf="rockets_public_directory_v1",jf=3e3,tl=12e3,au=["wss://nos.lol","wss://relay.damus.io","wss://relay.snort.social","wss://nostr.mom"];class Kf{constructor(){this.lobbyRoom=null,this.activeRooms=new Map,this.listeners=new Set,this.heartbeatTimer=null,this.purgeTimer=null,this.currentHostingMatch=null,this.sendHeartbeat=null,this.sendQuery=null,this.isInitialized=!1}init(){if(!this.isInitialized){this.isInitialized=!0;try{this.lobbyRoom=ru({appId:ou,relayConfig:{urls:au}},Yf);const e=Mn(this.lobbyRoom,"room_heartbeat"),t=Mn(this.lobbyRoom,"query_rooms");this.sendHeartbeat=e.send,this.sendQuery=t.send,e.onReceive((s,r)=>{!s||!s.roomId||(this.activeRooms.set(s.roomId,{...s,lastSeen:Date.now(),ttlMs:s.ttlMs||tl}),this.notifyListeners())}),t.onReceive((s,r)=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()});const i=()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()};typeof this.lobbyRoom.onPeerJoin=="function"?this.lobbyRoom.onPeerJoin(i):this.lobbyRoom.onPeerJoin=i,this.purgeTimer=setInterval(()=>{const s=Date.now();let r=!1;for(const[o,a]of this.activeRooms.entries())s-a.lastSeen>a.ttlMs&&(this.activeRooms.delete(o),r=!0);r&&this.notifyListeners()},2e3),this.refreshRooms()}catch(e){console.warn("Lobby network init warning:",e)}}}refreshRooms(){if(this.init(),this.sendQuery)try{this.sendQuery({req:"list",from:St})}catch(e){console.error(e)}}startMasterKeepAlive(e){this.init(),this.currentHostingMatch=e,this.stopMasterKeepAlive(),this.broadcastCurrentRoom(),this.heartbeatTimer=setInterval(()=>{this.currentHostingMatch&&this.currentHostingMatch.isMaster()&&this.broadcastCurrentRoom()},jf)}stopMasterKeepAlive(){this.heartbeatTimer&&(clearInterval(this.heartbeatTimer),this.heartbeatTimer=null)}broadcastCurrentRoom(){if(this.currentHostingMatch&&(this.init(),!!this.sendHeartbeat))try{const e=this.currentHostingMatch,t=e.getPlayerCount?e.getPlayerCount():1,i={roomId:e.roomId,roomName:e.roomName||e.roomId,masterId:St,playerCount:t,mapSeed:e.mapSeed||42,timestamp:Date.now(),ttlMs:tl};this.sendHeartbeat(i),this.activeRooms.set(e.roomId,{...i,lastSeen:Date.now()}),this.notifyListeners()}catch(e){console.error("Failed to send heartbeat:",e)}}onRoomsUpdated(e){return this.listeners.add(e),e(this.getRoomsList()),()=>this.listeners.delete(e)}notifyListeners(){const e=this.getRoomsList();for(const t of this.listeners)t(e)}getRoomsList(){const e=Date.now(),t=[];for(const i of this.activeRooms.values()){const s=Math.max(0,Math.round((i.lastSeen+i.ttlMs-e)/1e3));t.push({...i,ttlSecondsRemaining:s})}return t.sort((i,s)=>s.lastSeen-i.lastSeen)}destroy(){if(this.stopMasterKeepAlive(),this.purgeTimer&&clearInterval(this.purgeTimer),this.lobbyRoom)try{this.lobbyRoom.leave()}catch{}this.activeRooms.clear(),this.listeners.clear(),this.isInitialized=!1}}const ci=new Kf;class Zf{constructor({roomId:e,roomName:t,mapSeed:i,playerName:s,onPeerJoined:r,onPeerLeft:o,onMasterChanged:a,onCombatLog:c}){this.roomId=e,this.roomName=t||e,this.mapSeed=i||42,this.playerName=s||`Pilot-${(St||"Host").slice(0,4)}`,this.selfId=St,this.onPeerJoined=r||(()=>{}),this.onPeerLeft=o||(()=>{}),this.onMasterChanged=a||(()=>{}),this.onCombatLog=c||(()=>{}),this.room=null,this.currentMasterId=this.selfId,this.isMaster=!0,this.peers=new Map,this.sendState=null,this.sendCannon=null,this.sendMine=null,this.sendHit=null,this.sendKill=null,this.sendPing=null,this.sendPong=null,this.cannonListeners=new Set,this.mineListeners=new Set,this.hitListeners=new Set,this.killListeners=new Set,this.pingInterval=null,this.stateBroadcastInterval=null}join(){this.room=ru({appId:ou,relayConfig:{urls:au}},this.roomId);const e=Mn(this.room,"state"),t=Mn(this.room,"cannon"),i=Mn(this.room,"mine"),s=Mn(this.room,"hit"),r=Mn(this.room,"kill"),o=Mn(this.room,"ping"),a=Mn(this.room,"pong");this.sendState=e.send,this.sendCannon=t.send,this.sendMine=i.send,this.sendHit=s.send,this.sendKill=r.send,this.sendPing=o.send,this.sendPong=a.send,e.onReceive((h,u)=>{if(!u||typeof u!="string")return;this.peers.has(u)||this.peers.set(u,{id:u,ping:30,lastSeen:Date.now(),packetsReceived:0});const f=this.peers.get(u);f.lastState=h,f.lastSeen=Date.now(),f.packetsReceived=(f.packetsReceived||0)+1}),t.onReceive((h,u)=>{if(!(!u||typeof u!="string"))for(const f of this.cannonListeners)f(h,u)}),i.onReceive((h,u)=>{if(!(!u||typeof u!="string"))for(const f of this.mineListeners)f(h,u)}),s.onReceive((h,u)=>{if(!(!u||typeof u!="string"))for(const f of this.hitListeners)f(h,u)}),r.onReceive((h,u)=>{if(!(!u||typeof u!="string"))for(const f of this.killListeners)f(h,u)}),o.onReceive((h,u)=>{!u||typeof u!="string"||this.sendPong&&this.sendPong({t:h.t},u)}),a.onReceive((h,u)=>{if(!(!u||typeof u!="string")&&h&&h.t&&this.peers.has(u)){const f=Math.max(1,Date.now()-h.t);this.peers.get(u).ping=f}});const c=h=>{!h||typeof h!="string"||(console.log(`[Mesh] Peer connected: ${h}`),this.peers.set(h,{id:h,ping:40,lastSeen:Date.now()}),this.updateMasterElection(),this.onPeerJoined(h),this.onCombatLog(`🛰️ Pilot joined the mesh: ${h.slice(0,5)}`))},l=h=>{!h||typeof h!="string"||(console.log(`[Mesh] Peer disconnected: ${h}`),this.peers.delete(h),this.updateMasterElection(),this.onPeerLeft(h),this.onCombatLog(`💨 Pilot left the mesh: ${h.slice(0,5)}`))};typeof this.room.onPeerJoin=="function"?this.room.onPeerJoin(c):this.room.onPeerJoin=c,typeof this.room.onPeerLeave=="function"?this.room.onPeerLeave(l):this.room.onPeerLeave=l,this.updateMasterElection(),this.isMaster&&ci.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),this.pingInterval=setInterval(()=>{this.sendPing&&this.peers.size>0&&this.sendPing({t:Date.now()})},2e3)}updateMasterElection(){if(!this.room)return;const e=Object.keys(this.room.getPeers()||{}),i=[this.selfId,...e].sort()[0],s=i===this.selfId;if(this.currentMasterId!==i||this.isMaster!==s){const r=this.currentMasterId;this.currentMasterId=i,this.isMaster=s,console.log(`[Mesh] Master Election: elected ${i} (Self is master: ${s})`),s?(ci.startMasterKeepAlive({roomId:this.roomId,roomName:this.roomName,mapSeed:this.mapSeed,isMaster:()=>this.isMaster,getPlayerCount:()=>this.peers.size+1}),r&&r!==this.selfId&&this.onCombatLog("👑 Previous host left. You took over as Master! Keep-alive active.")):ci.stopMasterKeepAlive(),this.onMasterChanged(i,s)}}broadcastLocalState(e){this.sendState&&this.sendState({...e,id:this.selfId,name:this.playerName,time:Date.now()})}broadcastCannon(e){this.sendCannon&&this.sendCannon(e)}broadcastMine(e){this.sendMine&&this.sendMine(e)}sendHitTarget(e,t,i){this.sendHit&&this.sendHit({targetId:e,attackerId:this.selfId,attackerName:this.playerName,damage:t,weapon:i,time:Date.now()})}broadcastKill(e,t,i){this.sendKill&&this.sendKill({victimId:e,killerId:t,killerName:i,time:Date.now()})}onCannon(e){return this.cannonListeners.add(e),()=>this.cannonListeners.delete(e)}onMine(e){return this.mineListeners.add(e),()=>this.mineListeners.delete(e)}onHit(e){return this.hitListeners.add(e),()=>this.hitListeners.delete(e)}onKill(e){return this.killListeners.add(e),()=>this.killListeners.delete(e)}getAveragePing(){if(this.peers.size===0)return 0;let e=0;for(const t of this.peers.values())e+=t.ping||30;return Math.round(e/this.peers.size)}leave(){if(ci.stopMasterKeepAlive(),this.pingInterval&&clearInterval(this.pingInterval),this.stateBroadcastInterval&&clearInterval(this.stateBroadcastInterval),this.room){try{this.room.leave()}catch{}this.room=null}this.peers.clear(),this.cannonListeners.clear(),this.mineListeners.clear(),this.hitListeners.clear(),this.killListeners.clear()}}/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const tc="170",Jf=0,nl=1,Qf=2,cu=1,ep=2,xn=3,Gt=0,At=1,on=2,Xn=0,Hi=1,nn=2,il=3,sl=4,tp=5,ri=100,np=101,ip=102,sp=103,rp=104,op=200,ap=201,cp=202,lp=203,sa=204,ra=205,hp=206,up=207,dp=208,fp=209,pp=210,mp=211,gp=212,_p=213,vp=214,oa=0,aa=1,ca=2,Zi=3,la=4,ha=5,ua=6,da=7,lu=0,yp=1,xp=2,qn=0,Mp=1,Sp=2,Ep=3,hu=4,wp=5,Tp=6,bp=7,uu=300,Ji=301,Qi=302,fa=303,pa=304,Wr=306,Us=1e3,li=1001,ma=1002,tn=1003,Ap=1004,Js=1005,cn=1006,uo=1007,hi=1008,Cn=1009,du=1010,fu=1011,Ns=1012,nc=1013,pi=1014,wn=1015,zs=1016,ic=1017,sc=1018,es=1020,pu=35902,mu=1021,gu=1022,Qt=1023,_u=1024,vu=1025,Gi=1026,ts=1027,yu=1028,rc=1029,xu=1030,oc=1031,ac=1033,Tr=33776,br=33777,Ar=33778,Rr=33779,ga=35840,_a=35841,va=35842,ya=35843,xa=36196,Ma=37492,Sa=37496,Ea=37808,wa=37809,Ta=37810,ba=37811,Aa=37812,Ra=37813,Ca=37814,Pa=37815,La=37816,Da=37817,Ia=37818,Ua=37819,Na=37820,Fa=37821,Cr=36492,Oa=36494,Ba=36495,Mu=36283,ka=36284,za=36285,Va=36286,Rp=3200,Cp=3201,Su=0,Pp=1,Hn="",Vt="srgb",is="srgb-linear",Xr="linear",nt="srgb",Ei=7680,rl=519,Lp=512,Dp=513,Ip=514,Eu=515,Up=516,Np=517,Fp=518,Op=519,Ha=35044,ol="300 es",Tn=2e3,Nr=2001;class ss{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const i=this._listeners;return i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const i=this._listeners[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const xt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fo=Math.PI/180,Ga=180/Math.PI;function $n(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(xt[n&255]+xt[n>>8&255]+xt[n>>16&255]+xt[n>>24&255]+"-"+xt[e&255]+xt[e>>8&255]+"-"+xt[e>>16&15|64]+xt[e>>24&255]+"-"+xt[t&63|128]+xt[t>>8&255]+"-"+xt[t>>16&255]+xt[t>>24&255]+xt[i&255]+xt[i>>8&255]+xt[i>>16&255]+xt[i>>24&255]).toLowerCase()}function Lt(n,e,t){return Math.max(e,Math.min(t,n))}function Bp(n,e){return(n%e+e)%e}function po(n,e,t){return(1-t)*n+t*e}function an(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function it(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}class ke{constructor(e=0,t=0){ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,i,s,r,o,a,c,l){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l)}set(e,t,i,s,r,o,a,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=a,h[3]=t,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],m=i[5],g=i[8],v=s[0],p=s[3],d=s[6],_=s[1],y=s[4],x=s[7],C=s[2],b=s[5],R=s[8];return r[0]=o*v+a*_+c*C,r[3]=o*p+a*y+c*b,r[6]=o*d+a*x+c*R,r[1]=l*v+h*_+u*C,r[4]=l*p+h*y+u*b,r[7]=l*d+h*x+u*R,r[2]=f*v+m*_+g*C,r[5]=f*p+m*y+g*b,r[8]=f*d+m*x+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8];return t*o*h-t*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=h*o-a*l,f=a*c-h*r,m=l*r-o*c,g=t*u+i*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(s*l-h*i)*v,e[2]=(a*i-s*o)*v,e[3]=f*v,e[4]=(h*t-s*c)*v,e[5]=(s*r-a*t)*v,e[6]=m*v,e[7]=(i*c-l*t)*v,e[8]=(o*t-i*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+e,-s*l,s*c,-s*(-l*o+c*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(mo.makeScale(e,t)),this}rotate(e){return this.premultiply(mo.makeRotation(-e)),this}translate(e,t){return this.premultiply(mo.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const mo=new Ge;function wu(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Fr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function kp(){const n=Fr("canvas");return n.style.display="block",n}const al={};function Ss(n){n in al||(al[n]=!0,console.warn(n))}function zp(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}function Vp(n){const e=n.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Hp(n){const e=n.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const je={enabled:!0,workingColorSpace:is,spaces:{},convert:function(n,e,t){return this.enabled===!1||e===t||!e||!t||(this.spaces[e].transfer===nt&&(n.r=An(n.r),n.g=An(n.g),n.b=An(n.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(n.applyMatrix3(this.spaces[e].toXYZ),n.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===nt&&(n.r=Wi(n.r),n.g=Wi(n.g),n.b=Wi(n.b))),n},fromWorkingColorSpace:function(n,e){return this.convert(n,this.workingColorSpace,e)},toWorkingColorSpace:function(n,e){return this.convert(n,e,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Hn?Xr:this.spaces[n].transfer},getLuminanceCoefficients:function(n,e=this.workingColorSpace){return n.fromArray(this.spaces[e].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,e,t){return n.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace}};function An(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Wi(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}const cl=[.64,.33,.3,.6,.15,.06],ll=[.2126,.7152,.0722],hl=[.3127,.329],ul=new Ge().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),dl=new Ge().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);je.define({[is]:{primaries:cl,whitePoint:hl,transfer:Xr,toXYZ:ul,fromXYZ:dl,luminanceCoefficients:ll,workingColorSpaceConfig:{unpackColorSpace:Vt},outputColorSpaceConfig:{drawingBufferColorSpace:Vt}},[Vt]:{primaries:cl,whitePoint:hl,transfer:nt,toXYZ:ul,fromXYZ:dl,luminanceCoefficients:ll,outputColorSpaceConfig:{drawingBufferColorSpace:Vt}}});let wi;class Gp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{wi===void 0&&(wi=Fr("canvas")),wi.width=e.width,wi.height=e.height;const i=wi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),t=wi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Fr("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=An(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(An(t[i]/255)*255):t[i]=An(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Wp=0;class Tu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wp++}),this.uuid=$n(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(go(s[o].image)):r.push(go(s[o]))}else r=go(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function go(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Gp.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Xp=0;class Rt extends ss{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,i=li,s=li,r=cn,o=hi,a=Qt,c=Cn,l=Rt.DEFAULT_ANISOTROPY,h=Hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Xp++}),this.uuid=$n(),this.name="",this.source=new Tu(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Us:e.x=e.x-Math.floor(e.x);break;case li:e.x=e.x<0?0:1;break;case ma:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Us:e.y=e.y-Math.floor(e.y);break;case li:e.y=e.y<0?0:1;break;case ma:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null;Rt.DEFAULT_MAPPING=uu;Rt.DEFAULT_ANISOTROPY=1;class st{constructor(e=0,t=0,i=0,s=1){st.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],f=c[1],m=c[5],g=c[9],v=c[2],p=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const y=(l+1)/2,x=(m+1)/2,C=(d+1)/2,b=(h+f)/4,R=(u+v)/4,D=(g+p)/4;return y>x&&y>C?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=b/i,r=R/i):x>C?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=b/s,r=D/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=R/r,s=D/r),this.set(i,s,r,t),this}let _=Math.sqrt((p-g)*(p-g)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(p-g)/_,this.y=(u-v)/_,this.z=(f-h)/_,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class qp extends ss{constructor(e=1,t=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new st(0,0,e,t),this.scissorTest=!1,this.viewport=new st(0,0,e,t);const s={width:e,height:t,depth:1};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},i);const r=new Rt(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);r.flipY=!1,r.generateMipmaps=i.generateMipmaps,r.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++)this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Tu(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class mi extends qp{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class bu extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $p extends Rt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ln{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3];const f=r[o+0],m=r[o+1],g=r[o+2],v=r[o+3];if(a===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=f,e[t+1]=m,e[t+2]=g,e[t+3]=v;return}if(u!==v||c!==f||l!==m||h!==g){let p=1-a;const d=c*f+l*m+h*g+u*v,_=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){const C=Math.sqrt(y),b=Math.atan2(C,d*_);p=Math.sin(p*b)/C,a=Math.sin(a*b)/C}const x=a*_;if(c=c*p+f*x,l=l*p+m*x,h=h*p+g*x,u=u*p+v*x,p===1-a){const C=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=C,l*=C,h*=C,u*=C}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],m=r[o+2],g=r[o+3];return e[t]=a*g+h*u+c*m-l*f,e[t+1]=c*g+h*f+l*u-a*m,e[t+2]=l*g+h*m+a*f-c*u,e[t+3]=h*g-a*u-c*f-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),m=c(s/2),g=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u-f*m*g;break;case"YXZ":this._x=f*h*u+l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u+f*m*g;break;case"ZXY":this._x=f*h*u-l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u-f*m*g;break;case"ZYX":this._x=f*h*u-l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u+f*m*g;break;case"YZX":this._x=f*h*u+l*m*g,this._y=l*m*u+f*h*g,this._z=l*h*g-f*m*u,this._w=l*h*u-f*m*g;break;case"XZY":this._x=f*h*u-l*m*g,this._y=l*m*u-f*h*g,this._z=l*h*g+f*m*u,this._w=l*h*u+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],c=t[9],l=t[2],h=t[6],u=t[10],f=i+a+u;if(f>0){const m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(h-c)*m,this._y=(r-l)*m,this._z=(o-s)*m}else if(i>a&&i>u){const m=2*Math.sqrt(1+i-a-u);this._w=(h-c)/m,this._x=.25*m,this._y=(s+o)/m,this._z=(r+l)/m}else if(a>u){const m=2*Math.sqrt(1+a-i-u);this._w=(r-l)/m,this._x=(s+o)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+u-i-a);this._w=(o-s)/m,this._x=(r+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Lt(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,c=t._y,l=t._z,h=t._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*i+t*this._x,this._y=m*s+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-t)*h)/l,f=Math.sin(t*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,t=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(fl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(fl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,c=e.w,l=2*(o*s-a*i),h=2*(a*t-r*s),u=2*(r*i-o*t);return this.x=t+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(e,Math.min(t,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,c=t.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return _o.copy(this).projectOnVector(e),this.sub(_o)}reflect(e){return this.sub(_o.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Lt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _o=new O,fl=new ln;class Vs{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,jt):jt.fromBufferAttribute(r,o),jt.applyMatrix4(e.matrixWorld),this.expandByPoint(jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qs.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qs.copy(i.boundingBox)),Qs.applyMatrix4(e.matrixWorld),this.union(Qs)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,jt),jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ds),er.subVectors(this.max,ds),Ti.subVectors(e.a,ds),bi.subVectors(e.b,ds),Ai.subVectors(e.c,ds),In.subVectors(bi,Ti),Un.subVectors(Ai,bi),Zn.subVectors(Ti,Ai);let t=[0,-In.z,In.y,0,-Un.z,Un.y,0,-Zn.z,Zn.y,In.z,0,-In.x,Un.z,0,-Un.x,Zn.z,0,-Zn.x,-In.y,In.x,0,-Un.y,Un.x,0,-Zn.y,Zn.x,0];return!vo(t,Ti,bi,Ai,er)||(t=[1,0,0,0,1,0,0,0,1],!vo(t,Ti,bi,Ai,er))?!1:(tr.crossVectors(In,Un),t=[tr.x,tr.y,tr.z],vo(t,Ti,bi,Ai,er))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(pn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),pn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),pn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),pn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),pn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),pn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),pn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),pn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(pn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const pn=[new O,new O,new O,new O,new O,new O,new O,new O],jt=new O,Qs=new Vs,Ti=new O,bi=new O,Ai=new O,In=new O,Un=new O,Zn=new O,ds=new O,er=new O,tr=new O,Jn=new O;function vo(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Jn.fromArray(n,r);const a=s.x*Math.abs(Jn.x)+s.y*Math.abs(Jn.y)+s.z*Math.abs(Jn.z),c=e.dot(Jn),l=t.dot(Jn),h=i.dot(Jn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Yp=new Vs,fs=new O,yo=new O;class Hs{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):Yp.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;fs.subVectors(e,this.center);const t=fs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(fs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(yo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(fs.copy(e.center).add(yo)),this.expandByPoint(fs.copy(e.center).sub(yo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const mn=new O,xo=new O,nr=new O,Nn=new O,Mo=new O,ir=new O,So=new O;class Au{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(mn.copy(this.origin).addScaledVector(this.direction,t),mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){xo.copy(e).add(t).multiplyScalar(.5),nr.copy(t).sub(e).normalize(),Nn.copy(this.origin).sub(xo);const r=e.distanceTo(t)*.5,o=-this.direction.dot(nr),a=Nn.dot(this.direction),c=-Nn.dot(nr),l=Nn.lengthSq(),h=Math.abs(1-o*o);let u,f,m,g;if(h>0)if(u=o*c-a,f=o*a-c,g=r*h,u>=0)if(f>=-g)if(f<=g){const v=1/h;u*=v,f*=v,m=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;else f<=-g?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l):f<=g?(u=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),m=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),m=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(xo).addScaledVector(nr,f),m}intersectSphere(e,t){mn.subVectors(e.center,this.origin);const i=mn.dot(this.direction),s=mn.dot(mn)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,t):this.at(a,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(e.min.x-f.x)*l,s=(e.max.x-f.x)*l):(i=(e.max.x-f.x)*l,s=(e.min.x-f.x)*l),h>=0?(r=(e.min.y-f.y)*h,o=(e.max.y-f.y)*h):(r=(e.max.y-f.y)*h,o=(e.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(e.min.z-f.z)*u,c=(e.max.z-f.z)*u):(a=(e.max.z-f.z)*u,c=(e.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,mn)!==null}intersectTriangle(e,t,i,s,r){Mo.subVectors(t,e),ir.subVectors(i,e),So.crossVectors(Mo,ir);let o=this.direction.dot(So),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Nn.subVectors(this.origin,e);const c=a*this.direction.dot(ir.crossVectors(Nn,ir));if(c<0)return null;const l=a*this.direction.dot(Mo.cross(Nn));if(l<0||c+l>o)return null;const h=-a*Nn.dot(So);return h<0?null:this.at(h/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ct{constructor(e,t,i,s,r,o,a,c,l,h,u,f,m,g,v,p){ct.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,c,l,h,u,f,m,g,v,p)}set(e,t,i,s,r,o,a,c,l,h,u,f,m,g,v,p){const d=this.elements;return d[0]=e,d[4]=t,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=m,d[7]=g,d[11]=v,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ct().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Ri.setFromMatrixColumn(e,0).length(),r=1/Ri.setFromMatrixColumn(e,1).length(),o=1/Ri.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const f=o*h,m=o*u,g=a*h,v=a*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=m+g*l,t[5]=f-v*l,t[9]=-a*c,t[2]=v-f*l,t[6]=g+m*l,t[10]=o*c}else if(e.order==="YXZ"){const f=c*h,m=c*u,g=l*h,v=l*u;t[0]=f+v*a,t[4]=g*a-m,t[8]=o*l,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=m*a-g,t[6]=v+f*a,t[10]=o*c}else if(e.order==="ZXY"){const f=c*h,m=c*u,g=l*h,v=l*u;t[0]=f-v*a,t[4]=-o*u,t[8]=g+m*a,t[1]=m+g*a,t[5]=o*h,t[9]=v-f*a,t[2]=-o*l,t[6]=a,t[10]=o*c}else if(e.order==="ZYX"){const f=o*h,m=o*u,g=a*h,v=a*u;t[0]=c*h,t[4]=g*l-m,t[8]=f*l+v,t[1]=c*u,t[5]=v*l+f,t[9]=m*l-g,t[2]=-l,t[6]=a*c,t[10]=o*c}else if(e.order==="YZX"){const f=o*c,m=o*l,g=a*c,v=a*l;t[0]=c*h,t[4]=v-f*u,t[8]=g*u+m,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-l*h,t[6]=m*u+g,t[10]=f-v*u}else if(e.order==="XZY"){const f=o*c,m=o*l,g=a*c,v=a*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=f*u+v,t[5]=o*h,t[9]=m*u-g,t[2]=g*u-m,t[6]=a*h,t[10]=v*u+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jp,e,Kp)}lookAt(e,t,i){const s=this.elements;return Ut.subVectors(e,t),Ut.lengthSq()===0&&(Ut.z=1),Ut.normalize(),Fn.crossVectors(i,Ut),Fn.lengthSq()===0&&(Math.abs(i.z)===1?Ut.x+=1e-4:Ut.z+=1e-4,Ut.normalize(),Fn.crossVectors(i,Ut)),Fn.normalize(),sr.crossVectors(Ut,Fn),s[0]=Fn.x,s[4]=sr.x,s[8]=Ut.x,s[1]=Fn.y,s[5]=sr.y,s[9]=Ut.y,s[2]=Fn.z,s[6]=sr.z,s[10]=Ut.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],m=i[13],g=i[2],v=i[6],p=i[10],d=i[14],_=i[3],y=i[7],x=i[11],C=i[15],b=s[0],R=s[4],D=s[8],w=s[12],M=s[1],I=s[5],W=s[9],S=s[13],L=s[2],N=s[6],P=s[10],z=s[14],B=s[3],F=s[7],k=s[11],Z=s[15];return r[0]=o*b+a*M+c*L+l*B,r[4]=o*R+a*I+c*N+l*F,r[8]=o*D+a*W+c*P+l*k,r[12]=o*w+a*S+c*z+l*Z,r[1]=h*b+u*M+f*L+m*B,r[5]=h*R+u*I+f*N+m*F,r[9]=h*D+u*W+f*P+m*k,r[13]=h*w+u*S+f*z+m*Z,r[2]=g*b+v*M+p*L+d*B,r[6]=g*R+v*I+p*N+d*F,r[10]=g*D+v*W+p*P+d*k,r[14]=g*w+v*S+p*z+d*Z,r[3]=_*b+y*M+x*L+C*B,r[7]=_*R+y*I+x*N+C*F,r[11]=_*D+y*W+x*P+C*k,r[15]=_*w+y*S+x*z+C*Z,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],c=e[9],l=e[13],h=e[2],u=e[6],f=e[10],m=e[14],g=e[3],v=e[7],p=e[11],d=e[15];return g*(+r*c*u-s*l*u-r*a*f+i*l*f+s*a*m-i*c*m)+v*(+t*c*m-t*l*f+r*o*f-s*o*m+s*l*h-r*c*h)+p*(+t*l*u-t*a*m-r*o*u+i*o*m+r*a*h-i*l*h)+d*(-s*a*h-t*c*u+t*a*f+s*o*u-i*o*f+i*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],c=e[6],l=e[7],h=e[8],u=e[9],f=e[10],m=e[11],g=e[12],v=e[13],p=e[14],d=e[15],_=u*p*l-v*f*l+v*c*m-a*p*m-u*c*d+a*f*d,y=g*f*l-h*p*l-g*c*m+o*p*m+h*c*d-o*f*d,x=h*v*l-g*u*l+g*a*m-o*v*m-h*a*d+o*u*d,C=g*u*c-h*v*c-g*a*f+o*v*f+h*a*p-o*u*p,b=t*_+i*y+s*x+r*C;if(b===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/b;return e[0]=_*R,e[1]=(v*f*r-u*p*r-v*s*m+i*p*m+u*s*d-i*f*d)*R,e[2]=(a*p*r-v*c*r+v*s*l-i*p*l-a*s*d+i*c*d)*R,e[3]=(u*c*r-a*f*r-u*s*l+i*f*l+a*s*m-i*c*m)*R,e[4]=y*R,e[5]=(h*p*r-g*f*r+g*s*m-t*p*m-h*s*d+t*f*d)*R,e[6]=(g*c*r-o*p*r-g*s*l+t*p*l+o*s*d-t*c*d)*R,e[7]=(o*f*r-h*c*r+h*s*l-t*f*l-o*s*m+t*c*m)*R,e[8]=x*R,e[9]=(g*u*r-h*v*r-g*i*m+t*v*m+h*i*d-t*u*d)*R,e[10]=(o*v*r-g*a*r+g*i*l-t*v*l-o*i*d+t*a*d)*R,e[11]=(h*a*r-o*u*r-h*i*l+t*u*l+o*i*m-t*a*m)*R,e[12]=C*R,e[13]=(h*v*s-g*u*s+g*i*f-t*v*f-h*i*p+t*u*p)*R,e[14]=(g*a*s-o*v*s-g*i*c+t*v*c+o*i*p-t*a*p)*R,e[15]=(o*u*s-h*a*s+h*i*c-t*u*c-o*i*f+t*a*f)*R,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,c=e.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,c=t._w,l=r+r,h=o+o,u=a+a,f=r*l,m=r*h,g=r*u,v=o*h,p=o*u,d=a*u,_=c*l,y=c*h,x=c*u,C=i.x,b=i.y,R=i.z;return s[0]=(1-(v+d))*C,s[1]=(m+x)*C,s[2]=(g-y)*C,s[3]=0,s[4]=(m-x)*b,s[5]=(1-(f+d))*b,s[6]=(p+_)*b,s[7]=0,s[8]=(g+y)*R,s[9]=(p-_)*R,s[10]=(1-(f+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Ri.set(s[0],s[1],s[2]).length();const o=Ri.set(s[4],s[5],s[6]).length(),a=Ri.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Kt.copy(this);const l=1/r,h=1/o,u=1/a;return Kt.elements[0]*=l,Kt.elements[1]*=l,Kt.elements[2]*=l,Kt.elements[4]*=h,Kt.elements[5]*=h,Kt.elements[6]*=h,Kt.elements[8]*=u,Kt.elements[9]*=u,Kt.elements[10]*=u,t.setFromRotationMatrix(Kt),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=Tn){const c=this.elements,l=2*r/(t-e),h=2*r/(i-s),u=(t+e)/(t-e),f=(i+s)/(i-s);let m,g;if(a===Tn)m=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Nr)m=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=Tn){const c=this.elements,l=1/(t-e),h=1/(i-s),u=1/(o-r),f=(t+e)*l,m=(i+s)*h;let g,v;if(a===Tn)g=(o+r)*u,v=-2*u;else if(a===Nr)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Ri=new O,Kt=new ct,jp=new O(0,0,0),Kp=new O(1,1,1),Fn=new O,sr=new O,Ut=new O,pl=new ct,ml=new ln;class qt{constructor(e=0,t=0,i=0,s=qt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(Lt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Lt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Lt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,m),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Lt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Lt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Lt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return pl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(pl,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ml.setFromEuler(this),this.setFromQuaternion(ml,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qt.DEFAULT_ORDER="XYZ";class Ru{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Zp=0;const gl=new O,Ci=new ln,gn=new ct,rr=new O,ps=new O,Jp=new O,Qp=new ln,_l=new O(1,0,0),vl=new O(0,1,0),yl=new O(0,0,1),xl={type:"added"},em={type:"removed"},Pi={type:"childadded",child:null},Eo={type:"childremoved",child:null};class ft extends ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zp++}),this.uuid=$n(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new O,t=new qt,i=new ln,s=new O(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new Ge}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ru,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ci.setFromAxisAngle(e,t),this.quaternion.multiply(Ci),this}rotateOnWorldAxis(e,t){return Ci.setFromAxisAngle(e,t),this.quaternion.premultiply(Ci),this}rotateX(e){return this.rotateOnAxis(_l,e)}rotateY(e){return this.rotateOnAxis(vl,e)}rotateZ(e){return this.rotateOnAxis(yl,e)}translateOnAxis(e,t){return gl.copy(e).applyQuaternion(this.quaternion),this.position.add(gl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_l,e)}translateY(e){return this.translateOnAxis(vl,e)}translateZ(e){return this.translateOnAxis(yl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(gn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?rr.copy(e):rr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ps.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?gn.lookAt(ps,rr,this.up):gn.lookAt(rr,ps,this.up),this.quaternion.setFromRotationMatrix(gn),s&&(gn.extractRotation(s.matrixWorld),Ci.setFromRotationMatrix(gn),this.quaternion.premultiply(Ci.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(xl),Pi.child=e,this.dispatchEvent(Pi),Pi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(em),Eo.child=e,this.dispatchEvent(Eo),Eo.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),gn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),gn.multiply(e.parent.matrixWorld)),e.applyMatrix4(gn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(xl),Pi.child=e,this.dispatchEvent(Pi),Pi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,e,Jp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ps,Qp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(e.materials,this.material[c]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(e.animations,c))}}if(t){const a=o(e.geometries),c=o(e.materials),l=o(e.textures),h=o(e.images),u=o(e.shapes),f=o(e.skeletons),m=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}ft.DEFAULT_UP=new O(0,1,0);ft.DEFAULT_MATRIX_AUTO_UPDATE=!0;ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Zt=new O,_n=new O,wo=new O,vn=new O,Li=new O,Di=new O,Ml=new O,To=new O,bo=new O,Ao=new O,Ro=new st,Co=new st,Po=new st;class Ht{constructor(e=new O,t=new O,i=new O){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Zt.subVectors(e,t),s.cross(Zt);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Zt.subVectors(s,t),_n.subVectors(i,t),wo.subVectors(e,t);const o=Zt.dot(Zt),a=Zt.dot(_n),c=Zt.dot(wo),l=_n.dot(_n),h=_n.dot(wo),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,m=(l*c-a*h)*f,g=(o*h-a*c)*f;return r.set(1-m-g,g,m)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,i,s,r,o,a,c){return this.getBarycoord(e,t,i,s,vn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,vn.x),c.addScaledVector(o,vn.y),c.addScaledVector(a,vn.z),c)}static getInterpolatedAttribute(e,t,i,s,r,o){return Ro.setScalar(0),Co.setScalar(0),Po.setScalar(0),Ro.fromBufferAttribute(e,t),Co.fromBufferAttribute(e,i),Po.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ro,r.x),o.addScaledVector(Co,r.y),o.addScaledVector(Po,r.z),o}static isFrontFacing(e,t,i,s){return Zt.subVectors(i,t),_n.subVectors(e,t),Zt.cross(_n).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),_n.subVectors(this.a,this.b),Zt.cross(_n).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ht.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ht.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return Ht.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return Ht.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ht.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;Li.subVectors(s,i),Di.subVectors(r,i),To.subVectors(e,i);const c=Li.dot(To),l=Di.dot(To);if(c<=0&&l<=0)return t.copy(i);bo.subVectors(e,s);const h=Li.dot(bo),u=Di.dot(bo);if(h>=0&&u<=h)return t.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),t.copy(i).addScaledVector(Li,o);Ao.subVectors(e,r);const m=Li.dot(Ao),g=Di.dot(Ao);if(g>=0&&m<=g)return t.copy(r);const v=m*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),t.copy(i).addScaledVector(Di,a);const p=h*g-m*u;if(p<=0&&u-h>=0&&m-g>=0)return Ml.subVectors(r,s),a=(u-h)/(u-h+(m-g)),t.copy(s).addScaledVector(Ml,a);const d=1/(p+v+f);return o=v*d,a=f*d,t.copy(i).addScaledVector(Li,o).addScaledVector(Di,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},On={h:0,s:0,l:0},or={h:0,s:0,l:0};function Lo(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class qe{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,je.toWorkingColorSpace(this,t),this}setRGB(e,t,i,s=je.workingColorSpace){return this.r=e,this.g=t,this.b=i,je.toWorkingColorSpace(this,s),this}setHSL(e,t,i,s=je.workingColorSpace){if(e=Bp(e,1),t=Lt(t,0,1),i=Lt(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Lo(o,r,e+1/3),this.g=Lo(o,r,e),this.b=Lo(o,r,e-1/3)}return je.toWorkingColorSpace(this,s),this}setStyle(e,t=Vt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){const i=Cu[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=An(e.r),this.g=An(e.g),this.b=An(e.b),this}copyLinearToSRGB(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return je.fromWorkingColorSpace(Mt.copy(this),e),Math.round(Lt(Mt.r*255,0,255))*65536+Math.round(Lt(Mt.g*255,0,255))*256+Math.round(Lt(Mt.b*255,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=je.workingColorSpace){je.fromWorkingColorSpace(Mt.copy(this),t);const i=Mt.r,s=Mt.g,r=Mt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=je.workingColorSpace){return je.fromWorkingColorSpace(Mt.copy(this),t),e.r=Mt.r,e.g=Mt.g,e.b=Mt.b,e}getStyle(e=Vt){je.fromWorkingColorSpace(Mt.copy(this),e);const t=Mt.r,i=Mt.g,s=Mt.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(On),this.setHSL(On.h+e,On.s+t,On.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(On),e.getHSL(or);const i=po(On.h,or.h,t),s=po(On.s,or.s,t),r=po(On.l,or.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Mt=new qe;qe.NAMES=Cu;let tm=0;class xi extends ss{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:tm++}),this.uuid=$n(),this.name="",this.blending=Hi,this.side=Gt,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sa,this.blendDst=ra,this.blendEquation=ri,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Zi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(i.blending=this.blending),this.side!==Gt&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==sa&&(i.blendSrc=this.blendSrc),this.blendDst!==ra&&(i.blendDst=this.blendDst),this.blendEquation!==ri&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Zi&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Wt extends xi{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.combine=lu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ut=new O,ar=new ke;class dt{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ha,this.updateRanges=[],this.gpuType=wn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ar.fromBufferAttribute(this,t),ar.applyMatrix3(e),this.setXY(t,ar.x,ar.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix3(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyMatrix4(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.applyNormalMatrix(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)ut.fromBufferAttribute(this,t),ut.transformDirection(e),this.setXYZ(t,ut.x,ut.y,ut.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=an(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=it(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=an(t,this.array)),t}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=an(t,this.array)),t}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=an(t,this.array)),t}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=an(t,this.array)),t}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array),s=it(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=it(t,this.array),i=it(i,this.array),s=it(s,this.array),r=it(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ha&&(e.usage=this.usage),e}}class Pu extends dt{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Lu extends dt{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class ht extends dt{constructor(e,t,i){super(new Float32Array(e),t,i)}}let nm=0;const zt=new ct,Do=new ft,Ii=new O,Nt=new Vs,ms=new Vs,gt=new O;class vt extends ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nm++}),this.uuid=$n(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(wu(e)?Lu:Pu)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ge().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return zt.makeRotationFromQuaternion(e),this.applyMatrix4(zt),this}rotateX(e){return zt.makeRotationX(e),this.applyMatrix4(zt),this}rotateY(e){return zt.makeRotationY(e),this.applyMatrix4(zt),this}rotateZ(e){return zt.makeRotationZ(e),this.applyMatrix4(zt),this}translate(e,t,i){return zt.makeTranslation(e,t,i),this.applyMatrix4(zt),this}scale(e,t,i){return zt.makeScale(e,t,i),this.applyMatrix4(zt),this}lookAt(e){return Do.lookAt(e),Do.updateMatrix(),this.applyMatrix4(Do.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ht(i,3))}else{for(let i=0,s=t.count;i<s;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Nt.setFromBufferAttribute(r),this.morphTargetsRelative?(gt.addVectors(this.boundingBox.min,Nt.min),this.boundingBox.expandByPoint(gt),gt.addVectors(this.boundingBox.max,Nt.max),this.boundingBox.expandByPoint(gt)):(this.boundingBox.expandByPoint(Nt.min),this.boundingBox.expandByPoint(Nt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(Nt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];ms.setFromBufferAttribute(a),this.morphTargetsRelative?(gt.addVectors(Nt.min,ms.min),Nt.expandByPoint(gt),gt.addVectors(Nt.max,ms.max),Nt.expandByPoint(gt)):(Nt.expandByPoint(ms.min),Nt.expandByPoint(ms.max))}Nt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)gt.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(gt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)gt.fromBufferAttribute(a,l),c&&(Ii.fromBufferAttribute(e,l),gt.add(Ii)),s=Math.max(s,i.distanceToSquared(gt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new dt(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<i.count;D++)a[D]=new O,c[D]=new O;const l=new O,h=new O,u=new O,f=new ke,m=new ke,g=new ke,v=new O,p=new O;function d(D,w,M){l.fromBufferAttribute(i,D),h.fromBufferAttribute(i,w),u.fromBufferAttribute(i,M),f.fromBufferAttribute(r,D),m.fromBufferAttribute(r,w),g.fromBufferAttribute(r,M),h.sub(l),u.sub(l),m.sub(f),g.sub(f);const I=1/(m.x*g.y-g.x*m.y);isFinite(I)&&(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-m.y).multiplyScalar(I),p.copy(u).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(I),a[D].add(v),a[w].add(v),a[M].add(v),c[D].add(p),c[w].add(p),c[M].add(p))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let D=0,w=_.length;D<w;++D){const M=_[D],I=M.start,W=M.count;for(let S=I,L=I+W;S<L;S+=3)d(e.getX(S+0),e.getX(S+1),e.getX(S+2))}const y=new O,x=new O,C=new O,b=new O;function R(D){C.fromBufferAttribute(s,D),b.copy(C);const w=a[D];y.copy(w),y.sub(C.multiplyScalar(C.dot(w))).normalize(),x.crossVectors(b,w);const I=x.dot(c[D])<0?-1:1;o.setXYZW(D,y.x,y.y,y.z,I)}for(let D=0,w=_.length;D<w;++D){const M=_[D],I=M.start,W=M.count;for(let S=I,L=I+W;S<L;S+=3)R(e.getX(S+0)),R(e.getX(S+1)),R(e.getX(S+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new dt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let f=0,m=i.count;f<m;f++)i.setXYZ(f,0,0,0);const s=new O,r=new O,o=new O,a=new O,c=new O,l=new O,h=new O,u=new O;if(e)for(let f=0,m=e.count;f<m;f+=3){const g=e.getX(f+0),v=e.getX(f+1),p=e.getX(f+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,p),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,g),c.fromBufferAttribute(i,v),l.fromBufferAttribute(i,p),a.add(h),c.add(h),l.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(v,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=t.count;f<m;f+=3)s.fromBufferAttribute(t,f+0),r.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gt.fromBufferAttribute(e,t),gt.normalize(),e.setXYZ(t,gt.x,gt.y,gt.z)}toNonIndexed(){function e(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let m=0,g=0;for(let v=0,p=c.length;v<p;v++){a.isInterleavedBufferAttribute?m=c[v]*a.data.stride+a.offset:m=c[v]*h;for(let d=0;d<h;d++)f[g++]=l[m++]}return new dt(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new vt,i=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=e(c,i);t.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],m=e(f,i);c.push(m)}t.morphAttributes[a]=c}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const m=l[u];h.push(m.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,m=u.length;f<m;f++)h.push(u[f].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Sl=new ct,Qn=new Au,cr=new Hs,El=new O,lr=new O,hr=new O,ur=new O,Io=new O,dr=new O,wl=new O,fr=new O;class Qe extends ft{constructor(e=new vt,t=new Wt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){dr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Io.fromBufferAttribute(u,e),o?dr.addScaledVector(Io,h):dr.addScaledVector(Io.sub(t),h))}t.add(dr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),cr.copy(i.boundingSphere),cr.applyMatrix4(r),Qn.copy(e.ray).recast(e.near),!(cr.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(cr,El)===null||Qn.origin.distanceToSquared(El)>(e.far-e.near)**2))&&(Sl.copy(r).invert(),Qn.copy(e.ray).applyMatrix4(Sl),!(i.boundingBox!==null&&Qn.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Qn)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],d=o[p.materialIndex],_=Math.max(p.start,m.start),y=Math.min(a.count,Math.min(p.start+p.count,m.start+m.count));for(let x=_,C=y;x<C;x+=3){const b=a.getX(x),R=a.getX(x+1),D=a.getX(x+2);s=pr(this,d,e,i,l,h,u,b,R,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let p=g,d=v;p<d;p+=3){const _=a.getX(p),y=a.getX(p+1),x=a.getX(p+2);s=pr(this,o,e,i,l,h,u,_,y,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=f.length;g<v;g++){const p=f[g],d=o[p.materialIndex],_=Math.max(p.start,m.start),y=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let x=_,C=y;x<C;x+=3){const b=x,R=x+1,D=x+2;s=pr(this,d,e,i,l,h,u,b,R,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{const g=Math.max(0,m.start),v=Math.min(c.count,m.start+m.count);for(let p=g,d=v;p<d;p+=3){const _=p,y=p+1,x=p+2;s=pr(this,o,e,i,l,h,u,_,y,x),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}}function im(n,e,t,i,s,r,o,a){let c;if(e.side===At?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,e.side===Gt,a),c===null)return null;fr.copy(a),fr.applyMatrix4(n.matrixWorld);const l=t.ray.origin.distanceTo(fr);return l<t.near||l>t.far?null:{distance:l,point:fr.clone(),object:n}}function pr(n,e,t,i,s,r,o,a,c,l){n.getVertexPosition(a,lr),n.getVertexPosition(c,hr),n.getVertexPosition(l,ur);const h=im(n,e,t,i,lr,hr,ur,wl);if(h){const u=new O;Ht.getBarycoord(wl,lr,hr,ur,u),s&&(h.uv=Ht.getInterpolatedAttribute(s,a,c,l,u,new ke)),r&&(h.uv1=Ht.getInterpolatedAttribute(r,a,c,l,u,new ke)),o&&(h.normal=Ht.getInterpolatedAttribute(o,a,c,l,u,new O),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new O,materialIndex:0};Ht.getNormal(lr,hr,ur,f.normal),h.face=f,h.barycoord=u}return h}class un extends vt{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,m=0;g("z","y","x",-1,-1,i,t,e,o,r,0),g("z","y","x",1,-1,i,t,-e,o,r,1),g("x","z","y",1,1,e,i,t,s,o,2),g("x","z","y",1,-1,e,i,-t,s,o,3),g("x","y","z",1,-1,e,t,i,s,r,4),g("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new ht(l,3)),this.setAttribute("normal",new ht(h,3)),this.setAttribute("uv",new ht(u,2));function g(v,p,d,_,y,x,C,b,R,D,w){const M=x/R,I=C/D,W=x/2,S=C/2,L=b/2,N=R+1,P=D+1;let z=0,B=0;const F=new O;for(let k=0;k<P;k++){const Z=k*I-S;for(let he=0;he<N;he++){const Me=he*M-W;F[v]=Me*_,F[p]=Z*y,F[d]=L,l.push(F.x,F.y,F.z),F[v]=0,F[p]=0,F[d]=b>0?1:-1,h.push(F.x,F.y,F.z),u.push(he/R),u.push(1-k/D),z+=1}}for(let k=0;k<D;k++)for(let Z=0;Z<R;Z++){const he=f+Z+N*k,Me=f+Z+N*(k+1),X=f+(Z+1)+N*(k+1),te=f+(Z+1)+N*k;c.push(he,Me,te),c.push(Me,X,te),B+=6}a.addGroup(m,B,w),m+=B,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new un(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function ns(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function Tt(n){const e={};for(let t=0;t<n.length;t++){const i=ns(n[t]);for(const s in i)e[s]=i[s]}return e}function sm(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Du(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:je.workingColorSpace}const rm={clone:ns,merge:Tt};var om=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,am=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class jn extends xi{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=om,this.fragmentShader=am,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ns(e.uniforms),this.uniformsGroups=sm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class Iu extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=Tn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Bn=new O,Tl=new ke,bl=new ke;class Ot extends Iu{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Ga*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ga*2*Math.atan(Math.tan(fo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Bn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z),Bn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Bn.x,Bn.y).multiplyScalar(-e/Bn.z)}getViewSize(e,t){return this.getViewBounds(e,Tl,bl),t.subVectors(bl,Tl)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(fo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,t-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ui=-90,Ni=1;class cm extends ft{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Ot(Ui,Ni,e,t);s.layers=this.layers,this.add(s);const r=new Ot(Ui,Ni,e,t);r.layers=this.layers,this.add(r);const o=new Ot(Ui,Ni,e,t);o.layers=this.layers,this.add(o);const a=new Ot(Ui,Ni,e,t);a.layers=this.layers,this.add(a);const c=new Ot(Ui,Ni,e,t);c.layers=this.layers,this.add(c);const l=new Ot(Ui,Ni,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,c]=t;for(const l of t)this.remove(l);if(e===Tn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Nr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=e.getRenderTarget(),f=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,c),e.setRenderTarget(i,4,s),e.render(t,l),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),e.render(t,h),e.setRenderTarget(u,f,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class Uu extends Rt{constructor(e,t,i,s,r,o,a,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Ji,super(e,t,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lm extends mi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new Uu(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:cn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new un(5,5,5),r=new jn({name:"CubemapFromEquirect",uniforms:ns(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:At,blending:Xn});r.uniforms.tEquirect.value=t;const o=new Qe(s,r),a=t.minFilter;return t.minFilter===hi&&(t.minFilter=cn),new cm(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,i,s){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}const Uo=new O,hm=new O,um=new Ge;class ii{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Uo.subVectors(i,t).cross(hm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Uo),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||um.getNormalMatrix(e),s=this.coplanarPoint(Uo).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ei=new Hs,mr=new O;class cc{constructor(e=new ii,t=new ii,i=new ii,s=new ii,r=new ii,o=new ii){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Tn){const i=this.planes,s=e.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],m=s[8],g=s[9],v=s[10],p=s[11],d=s[12],_=s[13],y=s[14],x=s[15];if(i[0].setComponents(c-r,f-l,p-m,x-d).normalize(),i[1].setComponents(c+r,f+l,p+m,x+d).normalize(),i[2].setComponents(c+o,f+h,p+g,x+_).normalize(),i[3].setComponents(c-o,f-h,p-g,x-_).normalize(),i[4].setComponents(c-a,f-u,p-v,x-y).normalize(),t===Tn)i[5].setComponents(c+a,f+u,p+v,x+y).normalize();else if(t===Nr)i[5].setComponents(a,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ei.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ei.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ei)}intersectsSprite(e){return ei.center.set(0,0,0),ei.radius=.7071067811865476,ei.applyMatrix4(e.matrixWorld),this.intersectsSphere(ei)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(mr.x=s.normal.x>0?e.max.x:e.min.x,mr.y=s.normal.y>0?e.max.y:e.min.y,mr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Nu(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function dm(n){const e=new WeakMap;function t(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=n.createBuffer();n.bindBuffer(c,f),n.bufferData(c,l,h),a.onUploadCallback();let m;if(l instanceof Float32Array)m=n.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?m=n.HALF_FLOAT:m=n.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=n.SHORT;else if(l instanceof Uint32Array)m=n.UNSIGNED_INT;else if(l instanceof Int32Array)m=n.INT;else if(l instanceof Int8Array)m=n.BYTE;else if(l instanceof Uint8Array)m=n.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,c,l){const h=c.array,u=c.updateRanges;if(n.bindBuffer(l,a),u.length===0)n.bufferSubData(l,0,h);else{u.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<u.length;m++){const g=u[f],v=u[m];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++f,u[f]=v)}u.length=f+1;for(let m=0,g=u.length;m<g;m++){const v=u[m];n.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=e.get(a);c&&(n.deleteBuffer(c.buffer),e.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=e.get(a);if(l===void 0)e.set(a,t(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}class qr extends vt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=e/a,f=t/c,m=[],g=[],v=[],p=[];for(let d=0;d<h;d++){const _=d*f-o;for(let y=0;y<l;y++){const x=y*u-r;g.push(x,-_,0),v.push(0,0,1),p.push(y/a),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let _=0;_<a;_++){const y=_+l*d,x=_+l*(d+1),C=_+1+l*(d+1),b=_+1+l*d;m.push(y,x,b),m.push(x,C,b)}this.setIndex(m),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qr(e.width,e.height,e.widthSegments,e.heightSegments)}}var fm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pm=`#ifdef USE_ALPHAHASH
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
#endif`,mm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_m=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ym=`#ifdef USE_AOMAP
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
#endif`,xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mm=`#ifdef USE_BATCHING
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
#endif`,Sm=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Em=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,wm=`vec3 objectNormal = vec3( normal );
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
} // validated`,bm=`#ifdef USE_IRIDESCENCE
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
#endif`,Am=`#ifdef USE_BUMPMAP
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
#endif`,Rm=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dm=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Um=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
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
#endif`,Fm=`#define PI 3.141592653589793
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
} // validated`,Om=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,km=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Vm=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Wm=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xm=`#ifdef USE_ENVMAP
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
#endif`,qm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,$m=`#ifdef USE_ENVMAP
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
#endif`,jm=`#ifdef USE_ENVMAP
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
#endif`,Km=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Zm=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Jm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,eg=`#ifdef USE_GRADIENTMAP
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
}`,tg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ng=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ig=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sg=`uniform bool receiveShadow;
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
#endif`,og=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ag=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,cg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lg=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hg=`PhysicalMaterial material;
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
#endif`,ug=`struct PhysicalMaterial {
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
}`,dg=`
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
#endif`,fg=`#if defined( RE_IndirectDiffuse )
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
#endif`,pg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,mg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_g=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,yg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Mg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Sg=`#if defined( USE_POINTS_UV )
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
#endif`,wg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Tg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ag=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rg=`#ifdef USE_MORPHTARGETS
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
#endif`,Cg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Pg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Lg=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Dg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ug=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ng=`#ifdef USE_NORMALMAP
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
#endif`,Fg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Og=`#ifdef USE_CLEARCOAT_NORMALMAP
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
#endif`,kg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,zg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Vg=`vec3 packNormalToRGB( const in vec3 normal ) {
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
#endif`,Gg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Wg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Xg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,qg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,$g=`#ifdef USE_ROUGHNESSMAP
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
#endif`,jg=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Kg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Zg=`float getShadowMask() {
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
}`,Jg=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Qg=`#ifdef USE_SKINNING
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
#endif`,e0=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,t0=`#ifdef USE_SKINNING
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
#endif`,n0=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,i0=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,s0=`#if defined( TONE_MAPPING )
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,o0=`#ifdef USE_TRANSMISSION
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
#endif`,a0=`#ifdef USE_TRANSMISSION
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
#endif`,c0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,l0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,h0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,u0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const d0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,f0=`uniform sampler2D t2D;
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
}`,p0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,g0=`varying vec3 vWorldDirection;
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
}`,v0=`#include <common>
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
}`,y0=`#if DEPTH_PACKING == 3200
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
}`,x0=`#define DISTANCE
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
}`,M0=`#define DISTANCE
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
}`,S0=`varying vec3 vWorldDirection;
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
}`,w0=`uniform float scale;
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
}`,b0=`#include <common>
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
}`,A0=`uniform vec3 diffuse;
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
}`,R0=`#define LAMBERT
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
}`,C0=`#define LAMBERT
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
}`,P0=`#define MATCAP
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
}`,L0=`#define MATCAP
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
}`,D0=`#define NORMAL
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
}`,I0=`#define NORMAL
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
}`,U0=`#define PHONG
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
}`,N0=`#define PHONG
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
}`,F0=`#define STANDARD
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
}`,O0=`#define STANDARD
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
}`,k0=`#define TOON
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
}`,z0=`uniform float size;
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
}`,V0=`uniform vec3 diffuse;
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
}`,G0=`uniform vec3 color;
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
}`,W0=`uniform float rotation;
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
}`,X0=`uniform vec3 diffuse;
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
}`,We={alphahash_fragment:fm,alphahash_pars_fragment:pm,alphamap_fragment:mm,alphamap_pars_fragment:gm,alphatest_fragment:_m,alphatest_pars_fragment:vm,aomap_fragment:ym,aomap_pars_fragment:xm,batching_pars_vertex:Mm,batching_vertex:Sm,begin_vertex:Em,beginnormal_vertex:wm,bsdfs:Tm,iridescence_fragment:bm,bumpmap_pars_fragment:Am,clipping_planes_fragment:Rm,clipping_planes_pars_fragment:Cm,clipping_planes_pars_vertex:Pm,clipping_planes_vertex:Lm,color_fragment:Dm,color_pars_fragment:Im,color_pars_vertex:Um,color_vertex:Nm,common:Fm,cube_uv_reflection_fragment:Om,defaultnormal_vertex:Bm,displacementmap_pars_vertex:km,displacementmap_vertex:zm,emissivemap_fragment:Vm,emissivemap_pars_fragment:Hm,colorspace_fragment:Gm,colorspace_pars_fragment:Wm,envmap_fragment:Xm,envmap_common_pars_fragment:qm,envmap_pars_fragment:$m,envmap_pars_vertex:Ym,envmap_physical_pars_fragment:rg,envmap_vertex:jm,fog_vertex:Km,fog_pars_vertex:Zm,fog_fragment:Jm,fog_pars_fragment:Qm,gradientmap_pars_fragment:eg,lightmap_pars_fragment:tg,lights_lambert_fragment:ng,lights_lambert_pars_fragment:ig,lights_pars_begin:sg,lights_toon_fragment:og,lights_toon_pars_fragment:ag,lights_phong_fragment:cg,lights_phong_pars_fragment:lg,lights_physical_fragment:hg,lights_physical_pars_fragment:ug,lights_fragment_begin:dg,lights_fragment_maps:fg,lights_fragment_end:pg,logdepthbuf_fragment:mg,logdepthbuf_pars_fragment:gg,logdepthbuf_pars_vertex:_g,logdepthbuf_vertex:vg,map_fragment:yg,map_pars_fragment:xg,map_particle_fragment:Mg,map_particle_pars_fragment:Sg,metalnessmap_fragment:Eg,metalnessmap_pars_fragment:wg,morphinstance_vertex:Tg,morphcolor_vertex:bg,morphnormal_vertex:Ag,morphtarget_pars_vertex:Rg,morphtarget_vertex:Cg,normal_fragment_begin:Pg,normal_fragment_maps:Lg,normal_pars_fragment:Dg,normal_pars_vertex:Ig,normal_vertex:Ug,normalmap_pars_fragment:Ng,clearcoat_normal_fragment_begin:Fg,clearcoat_normal_fragment_maps:Og,clearcoat_pars_fragment:Bg,iridescence_pars_fragment:kg,opaque_fragment:zg,packing:Vg,premultiplied_alpha_fragment:Hg,project_vertex:Gg,dithering_fragment:Wg,dithering_pars_fragment:Xg,roughnessmap_fragment:qg,roughnessmap_pars_fragment:$g,shadowmap_pars_fragment:Yg,shadowmap_pars_vertex:jg,shadowmap_vertex:Kg,shadowmask_pars_fragment:Zg,skinbase_vertex:Jg,skinning_pars_vertex:Qg,skinning_vertex:e0,skinnormal_vertex:t0,specularmap_fragment:n0,specularmap_pars_fragment:i0,tonemapping_fragment:s0,tonemapping_pars_fragment:r0,transmission_fragment:o0,transmission_pars_fragment:a0,uv_pars_fragment:c0,uv_pars_vertex:l0,uv_vertex:h0,worldpos_vertex:u0,background_vert:d0,background_frag:f0,backgroundCube_vert:p0,backgroundCube_frag:m0,cube_vert:g0,cube_frag:_0,depth_vert:v0,depth_frag:y0,distanceRGBA_vert:x0,distanceRGBA_frag:M0,equirect_vert:S0,equirect_frag:E0,linedashed_vert:w0,linedashed_frag:T0,meshbasic_vert:b0,meshbasic_frag:A0,meshlambert_vert:R0,meshlambert_frag:C0,meshmatcap_vert:P0,meshmatcap_frag:L0,meshnormal_vert:D0,meshnormal_frag:I0,meshphong_vert:U0,meshphong_frag:N0,meshphysical_vert:F0,meshphysical_frag:O0,meshtoon_vert:B0,meshtoon_frag:k0,points_vert:z0,points_frag:V0,shadow_vert:H0,shadow_frag:G0,sprite_vert:W0,sprite_frag:X0},pe={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},rn={basic:{uniforms:Tt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:We.meshbasic_vert,fragmentShader:We.meshbasic_frag},lambert:{uniforms:Tt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new qe(0)}}]),vertexShader:We.meshlambert_vert,fragmentShader:We.meshlambert_frag},phong:{uniforms:Tt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30}}]),vertexShader:We.meshphong_vert,fragmentShader:We.meshphong_frag},standard:{uniforms:Tt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag},toon:{uniforms:Tt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new qe(0)}}]),vertexShader:We.meshtoon_vert,fragmentShader:We.meshtoon_frag},matcap:{uniforms:Tt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:We.meshmatcap_vert,fragmentShader:We.meshmatcap_frag},points:{uniforms:Tt([pe.points,pe.fog]),vertexShader:We.points_vert,fragmentShader:We.points_frag},dashed:{uniforms:Tt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:We.linedashed_vert,fragmentShader:We.linedashed_frag},depth:{uniforms:Tt([pe.common,pe.displacementmap]),vertexShader:We.depth_vert,fragmentShader:We.depth_frag},normal:{uniforms:Tt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:We.meshnormal_vert,fragmentShader:We.meshnormal_frag},sprite:{uniforms:Tt([pe.sprite,pe.fog]),vertexShader:We.sprite_vert,fragmentShader:We.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:We.background_vert,fragmentShader:We.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:We.backgroundCube_vert,fragmentShader:We.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:We.cube_vert,fragmentShader:We.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:We.equirect_vert,fragmentShader:We.equirect_frag},distanceRGBA:{uniforms:Tt([pe.common,pe.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:We.distanceRGBA_vert,fragmentShader:We.distanceRGBA_frag},shadow:{uniforms:Tt([pe.lights,pe.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:We.shadow_vert,fragmentShader:We.shadow_frag}};rn.physical={uniforms:Tt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:We.meshphysical_vert,fragmentShader:We.meshphysical_frag};const gr={r:0,b:0,g:0},ti=new qt,q0=new ct;function $0(n,e,t,i,s,r,o){const a=new qe(0);let c=r===!0?0:1,l,h,u=null,f=0,m=null;function g(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?t:e).get(y)),y}function v(_){let y=!1;const x=g(_);x===null?d(a,c):x&&x.isColor&&(d(x,1),y=!0);const C=n.xr.getEnvironmentBlendMode();C==="additive"?i.buffers.color.setClear(0,0,0,1,o):C==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function p(_,y){const x=g(y);x&&(x.isCubeTexture||x.mapping===Wr)?(h===void 0&&(h=new Qe(new un(1,1,1),new jn({name:"BackgroundCubeMaterial",uniforms:ns(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:At,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(C,b,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),ti.copy(y.backgroundRotation),ti.x*=-1,ti.y*=-1,ti.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),h.material.uniforms.envMap.value=x,h.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(q0.makeRotationFromEuler(ti)),h.material.toneMapped=je.getTransfer(x.colorSpace)!==nt,(u!==x||f!==x.version||m!==n.toneMapping)&&(h.material.needsUpdate=!0,u=x,f=x.version,m=n.toneMapping),h.layers.enableAll(),_.unshift(h,h.geometry,h.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Qe(new qr(2,2),new jn({name:"BackgroundMaterial",uniforms:ns(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:Gt,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=je.getTransfer(x.colorSpace)!==nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(u!==x||f!==x.version||m!==n.toneMapping)&&(l.material.needsUpdate=!0,u=x,f=x.version,m=n.toneMapping),l.layers.enableAll(),_.unshift(l,l.geometry,l.material,0,0,null))}function d(_,y){_.getRGB(gr,Du(n)),i.buffers.color.setClear(gr.r,gr.g,gr.b,y,o)}return{getClearColor:function(){return a},setClearColor:function(_,y=1){a.set(_),c=y,d(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(_){c=_,d(a,c)},render:v,addToRenderList:p}}function Y0(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=f(null);let r=s,o=!1;function a(M,I,W,S,L){let N=!1;const P=u(S,W,I);r!==P&&(r=P,l(r.object)),N=m(M,S,W,L),N&&g(M,S,W,L),L!==null&&e.update(L,n.ELEMENT_ARRAY_BUFFER),(N||o)&&(o=!1,x(M,I,W,S),L!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(L).buffer))}function c(){return n.createVertexArray()}function l(M){return n.bindVertexArray(M)}function h(M){return n.deleteVertexArray(M)}function u(M,I,W){const S=W.wireframe===!0;let L=i[M.id];L===void 0&&(L={},i[M.id]=L);let N=L[I.id];N===void 0&&(N={},L[I.id]=N);let P=N[S];return P===void 0&&(P=f(c()),N[S]=P),P}function f(M){const I=[],W=[],S=[];for(let L=0;L<t;L++)I[L]=0,W[L]=0,S[L]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:W,attributeDivisors:S,object:M,attributes:{},index:null}}function m(M,I,W,S){const L=r.attributes,N=I.attributes;let P=0;const z=W.getAttributes();for(const B in z)if(z[B].location>=0){const k=L[B];let Z=N[B];if(Z===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(Z=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(Z=M.instanceColor)),k===void 0||k.attribute!==Z||Z&&k.data!==Z.data)return!0;P++}return r.attributesNum!==P||r.index!==S}function g(M,I,W,S){const L={},N=I.attributes;let P=0;const z=W.getAttributes();for(const B in z)if(z[B].location>=0){let k=N[B];k===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(k=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(k=M.instanceColor));const Z={};Z.attribute=k,k&&k.data&&(Z.data=k.data),L[B]=Z,P++}r.attributes=L,r.attributesNum=P,r.index=S}function v(){const M=r.newAttributes;for(let I=0,W=M.length;I<W;I++)M[I]=0}function p(M){d(M,0)}function d(M,I){const W=r.newAttributes,S=r.enabledAttributes,L=r.attributeDivisors;W[M]=1,S[M]===0&&(n.enableVertexAttribArray(M),S[M]=1),L[M]!==I&&(n.vertexAttribDivisor(M,I),L[M]=I)}function _(){const M=r.newAttributes,I=r.enabledAttributes;for(let W=0,S=I.length;W<S;W++)I[W]!==M[W]&&(n.disableVertexAttribArray(W),I[W]=0)}function y(M,I,W,S,L,N,P){P===!0?n.vertexAttribIPointer(M,I,W,L,N):n.vertexAttribPointer(M,I,W,S,L,N)}function x(M,I,W,S){v();const L=S.attributes,N=W.getAttributes(),P=I.defaultAttributeValues;for(const z in N){const B=N[z];if(B.location>=0){let F=L[z];if(F===void 0&&(z==="instanceMatrix"&&M.instanceMatrix&&(F=M.instanceMatrix),z==="instanceColor"&&M.instanceColor&&(F=M.instanceColor)),F!==void 0){const k=F.normalized,Z=F.itemSize,he=e.get(F);if(he===void 0)continue;const Me=he.buffer,X=he.type,te=he.bytesPerElement,le=X===n.INT||X===n.UNSIGNED_INT||F.gpuType===nc;if(F.isInterleavedBufferAttribute){const ae=F.data,Re=ae.stride,Le=F.offset;if(ae.isInstancedInterleavedBuffer){for(let Ie=0;Ie<B.locationSize;Ie++)d(B.location+Ie,ae.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ie=0;Ie<B.locationSize;Ie++)p(B.location+Ie);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let Ie=0;Ie<B.locationSize;Ie++)y(B.location+Ie,Z/B.locationSize,X,k,Re*te,(Le+Z/B.locationSize*Ie)*te,le)}else{if(F.isInstancedBufferAttribute){for(let ae=0;ae<B.locationSize;ae++)d(B.location+ae,F.meshPerAttribute);M.isInstancedMesh!==!0&&S._maxInstanceCount===void 0&&(S._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let ae=0;ae<B.locationSize;ae++)p(B.location+ae);n.bindBuffer(n.ARRAY_BUFFER,Me);for(let ae=0;ae<B.locationSize;ae++)y(B.location+ae,Z/B.locationSize,X,k,Z*te,Z/B.locationSize*ae*te,le)}}else if(P!==void 0){const k=P[z];if(k!==void 0)switch(k.length){case 2:n.vertexAttrib2fv(B.location,k);break;case 3:n.vertexAttrib3fv(B.location,k);break;case 4:n.vertexAttrib4fv(B.location,k);break;default:n.vertexAttrib1fv(B.location,k)}}}}_()}function C(){D();for(const M in i){const I=i[M];for(const W in I){const S=I[W];for(const L in S)h(S[L].object),delete S[L];delete I[W]}delete i[M]}}function b(M){if(i[M.id]===void 0)return;const I=i[M.id];for(const W in I){const S=I[W];for(const L in S)h(S[L].object),delete S[L];delete I[W]}delete i[M.id]}function R(M){for(const I in i){const W=i[I];if(W[M.id]===void 0)continue;const S=W[M.id];for(const L in S)h(S[L].object),delete S[L];delete W[M.id]}}function D(){w(),o=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:w,dispose:C,releaseStatesOfGeometry:b,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:p,disableUnusedAttributes:_}}function j0(n,e,t){let i;function s(l){i=l}function r(l,h){n.drawArrays(i,l,h),t.update(h,i,1)}function o(l,h,u){u!==0&&(n.drawArraysInstanced(i,l,h,u),t.update(h,i,u))}function a(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,u);let m=0;for(let g=0;g<u;g++)m+=h[g];t.update(m,i,1)}function c(l,h,u,f){if(u===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)o(l[g],h[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,h,0,f,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*f[v];t.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function K0(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(R){return!(R!==Qt&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const D=R===zs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Cn&&i.convert(R)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==wn&&!D)}function c(R){if(R==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,f=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),m=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),d=n.getParameter(n.MAX_VERTEX_ATTRIBS),_=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),y=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,b=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:_,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:C,maxSamples:b}}function Z0(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new ii,a=new Ge,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const m=u.length!==0||f||i!==0||s;return s=f,i=u.length,m},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){t=h(u,f,0)},this.setState=function(u,f,m){const g=u.clippingPlanes,v=u.clipIntersection,p=u.clipShadows,d=n.get(u);if(!s||g===null||g.length===0||r&&!p)r?h(null):l();else{const _=r?0:i,y=_*4;let x=d.clippingState||null;c.value=x,x=h(g,f,y,m);for(let C=0;C!==y;++C)x[C]=t[C];d.clippingState=x,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,f,m,g){const v=u!==null?u.length:0;let p=null;if(v!==0){if(p=c.value,g!==!0||p===null){const d=m+v*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(p===null||p.length<d)&&(p=new Float32Array(d));for(let y=0,x=m;y!==v;++y,x+=4)o.copy(u[y]).applyMatrix4(_,a),o.normal.toArray(p,x),p[x+3]=o.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}function J0(n){let e=new WeakMap;function t(o,a){return a===fa?o.mapping=Ji:a===pa&&(o.mapping=Qi),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===fa||a===pa)if(e.has(o)){const c=e.get(o).texture;return t(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new lm(c.height);return l.fromEquirectangularTexture(n,o),e.set(o,l),o.addEventListener("dispose",s),t(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=e.get(a);c!==void 0&&(e.delete(a),c.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}class Fu extends Iu{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Vi=4,Al=[.125,.215,.35,.446,.526,.582],oi=20,No=new Fu,Rl=new qe;let Fo=null,Oo=0,Bo=0,ko=!1;const si=(1+Math.sqrt(5))/2,Fi=1/si,Cl=[new O(-si,Fi,0),new O(si,Fi,0),new O(-Fi,0,si),new O(Fi,0,si),new O(0,si,-Fi),new O(0,si,Fi),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)];class Pl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100){Fo=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),Bo=this._renderer.getActiveMipmapLevel(),ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,i,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Il(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Fo,Oo,Bo),this._renderer.xr.enabled=ko,e.scissorTest=!1,_r(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ji||e.mapping===Qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fo=this._renderer.getRenderTarget(),Oo=this._renderer.getActiveCubeFace(),Bo=this._renderer.getActiveMipmapLevel(),ko=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:zs,format:Qt,colorSpace:is,depthBuffer:!1},s=Ll(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ll(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Q0(r)),this._blurMaterial=e_(r,e,t)}return s}_compileMaterial(e){const t=new Qe(this._lodPlanes[0],e);this._renderer.compile(t,No)}_sceneToCubeUV(e,t,i,s){const a=new Ot(90,1,t,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Rl),h.toneMapping=qn,h.autoClear=!1;const m=new Wt({name:"PMREM.Background",side:At,depthWrite:!1,depthTest:!1}),g=new Qe(new un,m);let v=!1;const p=e.background;p?p.isColor&&(m.color.copy(p),e.background=null,v=!0):(m.color.copy(Rl),v=!0);for(let d=0;d<6;d++){const _=d%3;_===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):_===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));const y=this._cubeSize;_r(s,_*y,d>2?y:0,y,y),h.setRenderTarget(s),v&&h.render(g,a),h.render(e,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=f,h.autoClear=u,e.background=p}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===Ji||e.mapping===Qi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Il()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new Qe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const c=this._cubeSize;_r(t,0,0,3*c,2*c),i.setRenderTarget(t),i.render(o,No)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Cl[(s-r-1)%Cl.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Qe(this._lodPlanes[s],l),f=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*oi-1),v=r/g,p=isFinite(r)?1+Math.floor(h*v):oi;p>oi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${oi}`);const d=[];let _=0;for(let R=0;R<oi;++R){const D=R/v,w=Math.exp(-D*D/2);d.push(w),R===0?_+=w:R<p&&(_+=2*w)}for(let R=0;R<d.length;R++)d[R]=d[R]/_;f.envMap.value=e.texture,f.samples.value=p,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-i;const x=this._sizeLods[s],C=3*x*(s>y-Vi?s-y+Vi:0),b=4*(this._cubeSize-x);_r(t,C,b,3*x,2*x),c.setRenderTarget(t),c.render(u,No)}}function Q0(n){const e=[],t=[],i=[];let s=n;const r=n-Vi+1+Al.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let c=1/a;o>n-Vi?c=Al[o-n+Vi-1]:o===0&&(c=0),i.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],m=6,g=6,v=3,p=2,d=1,_=new Float32Array(v*g*m),y=new Float32Array(p*g*m),x=new Float32Array(d*g*m);for(let b=0;b<m;b++){const R=b%3*2/3-1,D=b>2?0:-1,w=[R,D,0,R+2/3,D,0,R+2/3,D+1,0,R,D,0,R+2/3,D+1,0,R,D+1,0];_.set(w,v*g*b),y.set(f,p*g*b);const M=[b,b,b,b,b,b];x.set(M,d*g*b)}const C=new vt;C.setAttribute("position",new dt(_,v)),C.setAttribute("uv",new dt(y,p)),C.setAttribute("faceIndex",new dt(x,d)),e.push(C),s>Vi&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Ll(n,e,t){const i=new mi(n,e,t);return i.texture.mapping=Wr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function _r(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function e_(n,e,t){const i=new Float32Array(oi),s=new O(0,1,0);return new jn({name:"SphericalGaussianBlur",defines:{n:oi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:lc(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Dl(){return new jn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:lc(),fragmentShader:`

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
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function Il(){return new jn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:lc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xn,depthTest:!1,depthWrite:!1})}function lc(){return`

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
	`}function t_(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const c=a.mapping,l=c===fa||c===pa,h=c===Ji||c===Qi;if(l||h){let u=e.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return t===null&&(t=new Pl(n)),u=l?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{const m=a.image;return l&&m&&m.height>0||h&&m&&s(m)?(t===null&&(t=new Pl(n)),u=l?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function n_(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&Ss("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function i_(n,e,t,i){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&e.remove(f.index);for(const g in f.attributes)e.remove(f.attributes[g]);for(const g in f.morphAttributes){const v=f.morphAttributes[g];for(let p=0,d=v.length;p<d;p++)e.remove(v[p])}f.removeEventListener("dispose",o),delete s[f.id];const m=r.get(f);m&&(e.remove(m),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,t.memory.geometries++),f}function c(u){const f=u.attributes;for(const g in f)e.update(f[g],n.ARRAY_BUFFER);const m=u.morphAttributes;for(const g in m){const v=m[g];for(let p=0,d=v.length;p<d;p++)e.update(v[p],n.ARRAY_BUFFER)}}function l(u){const f=[],m=u.index,g=u.attributes.position;let v=0;if(m!==null){const _=m.array;v=m.version;for(let y=0,x=_.length;y<x;y+=3){const C=_[y+0],b=_[y+1],R=_[y+2];f.push(C,b,b,R,R,C)}}else if(g!==void 0){const _=g.array;v=g.version;for(let y=0,x=_.length/3-1;y<x;y+=3){const C=y+0,b=y+1,R=y+2;f.push(C,b,b,R,R,C)}}else return;const p=new(wu(f)?Lu:Pu)(f,1);p.version=v;const d=r.get(u);d&&e.remove(d),r.set(u,p)}function h(u){const f=r.get(u);if(f){const m=u.index;m!==null&&f.version<m.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function s_(n,e,t){let i;function s(f){i=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,m){n.drawElements(i,m,r,f*o),t.update(m,i,1)}function l(f,m,g){g!==0&&(n.drawElementsInstanced(i,m,r,f*o,g),t.update(m,i,g))}function h(f,m,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,f,0,g);let p=0;for(let d=0;d<g;d++)p+=m[d];t.update(p,i,1)}function u(f,m,g,v){if(g===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<f.length;d++)l(f[d]/o,m[d],v[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,r,f,0,v,0,g);let d=0;for(let _=0;_<g;_++)d+=m[_]*v[_];t.update(d,i,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function r_(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function o_(n,e,t){const i=new WeakMap,s=new st;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=i.get(a);if(f===void 0||f.count!==u){let M=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var m=M;f!==void 0&&f.texture.dispose();const g=a.morphAttributes.position!==void 0,v=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,d=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],y=a.morphAttributes.color||[];let x=0;g===!0&&(x=1),v===!0&&(x=2),p===!0&&(x=3);let C=a.attributes.position.count*x,b=1;C>e.maxTextureSize&&(b=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const R=new Float32Array(C*b*4*u),D=new bu(R,C,b,u);D.type=wn,D.needsUpdate=!0;const w=x*4;for(let I=0;I<u;I++){const W=d[I],S=_[I],L=y[I],N=C*b*4*I;for(let P=0;P<W.count;P++){const z=P*w;g===!0&&(s.fromBufferAttribute(W,P),R[N+z+0]=s.x,R[N+z+1]=s.y,R[N+z+2]=s.z,R[N+z+3]=0),v===!0&&(s.fromBufferAttribute(S,P),R[N+z+4]=s.x,R[N+z+5]=s.y,R[N+z+6]=s.z,R[N+z+7]=0),p===!0&&(s.fromBufferAttribute(L,P),R[N+z+8]=s.x,R[N+z+9]=s.y,R[N+z+10]=s.z,R[N+z+11]=L.itemSize===4?s.w:1)}}f={count:u,texture:D,size:new ke(C,b)},i.set(a,f),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const v=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(n,"morphTargetBaseInfluence",v),c.getUniforms().setValue(n,"morphTargetInfluences",l)}c.getUniforms().setValue(n,"morphTargetsTexture",f.texture,t),c.getUniforms().setValue(n,"morphTargetsTextureSize",f.size)}return{update:r}}function a_(n,e,t,i){let s=new WeakMap;function r(c){const l=i.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:o}}class Ou extends Rt{constructor(e,t,i,s,r,o,a,c,l,h=Gi){if(h!==Gi&&h!==ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Gi&&(i=pi),i===void 0&&h===ts&&(i=es),super(null,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=a!==void 0?a:tn,this.minFilter=c!==void 0?c:tn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Bu=new Rt,Ul=new Ou(1,1),ku=new bu,zu=new $p,Vu=new Uu,Nl=[],Fl=[],Ol=new Float32Array(16),Bl=new Float32Array(9),kl=new Float32Array(4);function rs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Nl[s];if(r===void 0&&(r=new Float32Array(s),Nl[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function pt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function mt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function $r(n,e){let t=Fl[e];t===void 0&&(t=new Int32Array(e),Fl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function c_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function l_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2fv(this.addr,e),mt(t,e)}}function h_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(pt(t,e))return;n.uniform3fv(this.addr,e),mt(t,e)}}function u_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4fv(this.addr,e),mt(t,e)}}function d_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;kl.set(i),n.uniformMatrix2fv(this.addr,!1,kl),mt(t,i)}}function f_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Bl.set(i),n.uniformMatrix3fv(this.addr,!1,Bl),mt(t,i)}}function p_(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(pt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),mt(t,e)}else{if(pt(t,i))return;Ol.set(i),n.uniformMatrix4fv(this.addr,!1,Ol),mt(t,i)}}function m_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function g_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2iv(this.addr,e),mt(t,e)}}function __(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3iv(this.addr,e),mt(t,e)}}function v_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4iv(this.addr,e),mt(t,e)}}function y_(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function x_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(pt(t,e))return;n.uniform2uiv(this.addr,e),mt(t,e)}}function M_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(pt(t,e))return;n.uniform3uiv(this.addr,e),mt(t,e)}}function S_(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(pt(t,e))return;n.uniform4uiv(this.addr,e),mt(t,e)}}function E_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Ul.compareFunction=Eu,r=Ul):r=Bu,t.setTexture2D(e||r,s)}function w_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||zu,s)}function T_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||Vu,s)}function b_(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||ku,s)}function A_(n){switch(n){case 5126:return c_;case 35664:return l_;case 35665:return h_;case 35666:return u_;case 35674:return d_;case 35675:return f_;case 35676:return p_;case 5124:case 35670:return m_;case 35667:case 35671:return g_;case 35668:case 35672:return __;case 35669:case 35673:return v_;case 5125:return y_;case 36294:return x_;case 36295:return M_;case 36296:return S_;case 35678:case 36198:case 36298:case 36306:case 35682:return E_;case 35679:case 36299:case 36307:return w_;case 35680:case 36300:case 36308:case 36293:return T_;case 36289:case 36303:case 36311:case 36292:return b_}}function R_(n,e){n.uniform1fv(this.addr,e)}function C_(n,e){const t=rs(e,this.size,2);n.uniform2fv(this.addr,t)}function P_(n,e){const t=rs(e,this.size,3);n.uniform3fv(this.addr,t)}function L_(n,e){const t=rs(e,this.size,4);n.uniform4fv(this.addr,t)}function D_(n,e){const t=rs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function I_(n,e){const t=rs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function U_(n,e){const t=rs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function N_(n,e){n.uniform1iv(this.addr,e)}function F_(n,e){n.uniform2iv(this.addr,e)}function O_(n,e){n.uniform3iv(this.addr,e)}function B_(n,e){n.uniform4iv(this.addr,e)}function k_(n,e){n.uniform1uiv(this.addr,e)}function z_(n,e){n.uniform2uiv(this.addr,e)}function V_(n,e){n.uniform3uiv(this.addr,e)}function H_(n,e){n.uniform4uiv(this.addr,e)}function G_(n,e,t){const i=this.cache,s=e.length,r=$r(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Bu,r[o])}function W_(n,e,t){const i=this.cache,s=e.length,r=$r(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||zu,r[o])}function X_(n,e,t){const i=this.cache,s=e.length,r=$r(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||Vu,r[o])}function q_(n,e,t){const i=this.cache,s=e.length,r=$r(t,s);pt(i,r)||(n.uniform1iv(this.addr,r),mt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||ku,r[o])}function $_(n){switch(n){case 5126:return R_;case 35664:return C_;case 35665:return P_;case 35666:return L_;case 35674:return D_;case 35675:return I_;case 35676:return U_;case 5124:case 35670:return N_;case 35667:case 35671:return F_;case 35668:case 35672:return O_;case 35669:case 35673:return B_;case 5125:return k_;case 36294:return z_;case 36295:return V_;case 36296:return H_;case 35678:case 36198:case 36298:case 36306:case 35682:return G_;case 35679:case 36299:case 36307:return W_;case 35680:case 36300:case 36308:case 36293:return X_;case 36289:case 36303:case 36311:case 36292:return q_}}class Y_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=A_(t.type)}}class j_{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=$_(t.type)}}class K_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const zo=/(\w+)(\])?(\[|\.)?/g;function zl(n,e){n.seq.push(e),n.map[e.id]=e}function Z_(n,e,t){const i=n.name,s=i.length;for(zo.lastIndex=0;;){const r=zo.exec(i),o=zo.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){zl(t,l===void 0?new Y_(a,n,e):new j_(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new K_(a),zl(t,u)),t=u}}}class Pr{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);Z_(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(e,c.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Vl(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const J_=37297;let Q_=0;function ev(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Hl=new Ge;function tv(n){je._getMatrix(Hl,je.workingColorSpace,n);const e=`mat3( ${Hl.elements.map(t=>t.toFixed(4))} )`;switch(je.getTransfer(n)){case Xr:return[e,"LinearTransferOETF"];case nt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Gl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),s=n.getShaderInfoLog(e).trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+ev(n.getShaderSource(e),o)}else return s}function nv(n,e){const t=tv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function iv(n,e){let t;switch(e){case Mp:t="Linear";break;case Sp:t="Reinhard";break;case Ep:t="Cineon";break;case hu:t="ACESFilmic";break;case Tp:t="AgX";break;case bp:t="Neutral";break;case wp:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vr=new O;function sv(){je.getLuminanceCoefficients(vr);const n=vr.x.toFixed(4),e=vr.y.toFixed(4),t=vr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function rv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Es).join(`
`)}function ov(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function av(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Es(n){return n!==""}function Wl(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wa(n){return n.replace(cv,hv)}const lv=new Map;function hv(n,e){let t=We[e];if(t===void 0){const i=lv.get(e);if(i!==void 0)t=We[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Wa(t)}const uv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ql(n){return n.replace(uv,dv)}function dv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $l(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}function fv(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===cu?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===ep?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===xn&&(e="SHADOWMAP_TYPE_VSM"),e}function pv(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ji:case Qi:e="ENVMAP_TYPE_CUBE";break;case Wr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function mv(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Qi:e="ENVMAP_MODE_REFRACTION";break}return e}function gv(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case lu:e="ENVMAP_BLENDING_MULTIPLY";break;case yp:e="ENVMAP_BLENDING_MIX";break;case xp:e="ENVMAP_BLENDING_ADD";break}return e}function _v(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:i,maxMip:t}}function vv(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const c=fv(t),l=pv(t),h=mv(t),u=gv(t),f=_v(t),m=rv(t),g=ov(r),v=s.createProgram();let p,d,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Es).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Es).join(`
`),d.length>0&&(d+=`
`)):(p=[$l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Es).join(`
`),d=[$l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==qn?"#define TONE_MAPPING":"",t.toneMapping!==qn?We.tonemapping_pars_fragment:"",t.toneMapping!==qn?iv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",We.colorspace_pars_fragment,nv("linearToOutputTexel",t.outputColorSpace),sv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Es).join(`
`)),o=Wa(o),o=Wl(o,t),o=Xl(o,t),a=Wa(a),a=Wl(a,t),a=Xl(a,t),o=ql(o),a=ql(a),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",t.glslVersion===ol?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===ol?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=_+p+o,x=_+d+a,C=Vl(s,s.VERTEX_SHADER,y),b=Vl(s,s.FRAGMENT_SHADER,x);s.attachShader(v,C),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(I){if(n.debug.checkShaderErrors){const W=s.getProgramInfoLog(v).trim(),S=s.getShaderInfoLog(C).trim(),L=s.getShaderInfoLog(b).trim();let N=!0,P=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,C,b);else{const z=Gl(s,C,"vertex"),B=Gl(s,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+W+`
`+z+`
`+B)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(S===""||L==="")&&(P=!1);P&&(I.diagnostics={runnable:N,programLog:W,vertexShader:{log:S,prefix:p},fragmentShader:{log:L,prefix:d}})}s.deleteShader(C),s.deleteShader(b),D=new Pr(s,v),w=av(s,v)}let D;this.getUniforms=function(){return D===void 0&&R(this),D};let w;this.getAttributes=function(){return w===void 0&&R(this),w};let M=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(v,J_)),M},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Q_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=b,this}let yv=0;class xv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Mv(e),t.set(e,i)),i}}class Mv{constructor(e){this.id=yv++,this.code=e,this.usedTimes=0}}function Sv(n,e,t,i,s,r,o){const a=new Ru,c=new xv,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let m=s.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return l.add(w),w===0?"uv":`uv${w}`}function p(w,M,I,W,S){const L=W.fog,N=S.geometry,P=w.isMeshStandardMaterial?W.environment:null,z=(w.isMeshStandardMaterial?t:e).get(w.envMap||P),B=z&&z.mapping===Wr?z.image.height:null,F=g[w.type];w.precision!==null&&(m=s.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));const k=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,Z=k!==void 0?k.length:0;let he=0;N.morphAttributes.position!==void 0&&(he=1),N.morphAttributes.normal!==void 0&&(he=2),N.morphAttributes.color!==void 0&&(he=3);let Me,X,te,le;if(F){const tt=rn[F];Me=tt.vertexShader,X=tt.fragmentShader}else Me=w.vertexShader,X=w.fragmentShader,c.update(w),te=c.getVertexShaderID(w),le=c.getFragmentShaderID(w);const ae=n.getRenderTarget(),Re=n.state.buffers.depth.getReversed(),Le=S.isInstancedMesh===!0,Ie=S.isBatchedMesh===!0,Y=!!w.map,Q=!!w.matcap,ue=!!z,U=!!w.aoMap,Ne=!!w.lightMap,Ue=!!w.bumpMap,Oe=!!w.normalMap,Se=!!w.displacementMap,Ee=!!w.emissiveMap,me=!!w.metalnessMap,A=!!w.roughnessMap,E=w.anisotropy>0,$=w.clearcoat>0,ee=w.dispersion>0,se=w.iridescence>0,q=w.sheen>0,oe=w.transmission>0,ie=E&&!!w.anisotropyMap,de=$&&!!w.clearcoatMap,Pe=$&&!!w.clearcoatNormalMap,re=$&&!!w.clearcoatRoughnessMap,fe=se&&!!w.iridescenceMap,De=se&&!!w.iridescenceThicknessMap,Fe=q&&!!w.sheenColorMap,xe=q&&!!w.sheenRoughnessMap,$e=!!w.specularMap,ze=!!w.specularColorMap,et=!!w.specularIntensityMap,V=oe&&!!w.transmissionMap,ge=oe&&!!w.thicknessMap,J=!!w.gradientMap,ne=!!w.alphaMap,ye=w.alphaTest>0,_e=!!w.alphaHash,Ve=!!w.extensions;let lt=qn;w.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(lt=n.toneMapping);const yt={shaderID:F,shaderType:w.type,shaderName:w.name,vertexShader:Me,fragmentShader:X,defines:w.defines,customVertexShaderID:te,customFragmentShaderID:le,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:Ie,batchingColor:Ie&&S._colorsTexture!==null,instancing:Le,instancingColor:Le&&S.instanceColor!==null,instancingMorph:Le&&S.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:ae===null?n.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:is,alphaToCoverage:!!w.alphaToCoverage,map:Y,matcap:Q,envMap:ue,envMapMode:ue&&z.mapping,envMapCubeUVHeight:B,aoMap:U,lightMap:Ne,bumpMap:Ue,normalMap:Oe,displacementMap:f&&Se,emissiveMap:Ee,normalMapObjectSpace:Oe&&w.normalMapType===Pp,normalMapTangentSpace:Oe&&w.normalMapType===Su,metalnessMap:me,roughnessMap:A,anisotropy:E,anisotropyMap:ie,clearcoat:$,clearcoatMap:de,clearcoatNormalMap:Pe,clearcoatRoughnessMap:re,dispersion:ee,iridescence:se,iridescenceMap:fe,iridescenceThicknessMap:De,sheen:q,sheenColorMap:Fe,sheenRoughnessMap:xe,specularMap:$e,specularColorMap:ze,specularIntensityMap:et,transmission:oe,transmissionMap:V,thicknessMap:ge,gradientMap:J,opaque:w.transparent===!1&&w.blending===Hi&&w.alphaToCoverage===!1,alphaMap:ne,alphaTest:ye,alphaHash:_e,combine:w.combine,mapUv:Y&&v(w.map.channel),aoMapUv:U&&v(w.aoMap.channel),lightMapUv:Ne&&v(w.lightMap.channel),bumpMapUv:Ue&&v(w.bumpMap.channel),normalMapUv:Oe&&v(w.normalMap.channel),displacementMapUv:Se&&v(w.displacementMap.channel),emissiveMapUv:Ee&&v(w.emissiveMap.channel),metalnessMapUv:me&&v(w.metalnessMap.channel),roughnessMapUv:A&&v(w.roughnessMap.channel),anisotropyMapUv:ie&&v(w.anisotropyMap.channel),clearcoatMapUv:de&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:Pe&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:De&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Fe&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:xe&&v(w.sheenRoughnessMap.channel),specularMapUv:$e&&v(w.specularMap.channel),specularColorMapUv:ze&&v(w.specularColorMap.channel),specularIntensityMapUv:et&&v(w.specularIntensityMap.channel),transmissionMapUv:V&&v(w.transmissionMap.channel),thicknessMapUv:ge&&v(w.thicknessMap.channel),alphaMapUv:ne&&v(w.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Oe||E),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:S.isPoints===!0&&!!N.attributes.uv&&(Y||ne),fog:!!L,useFog:w.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Re,skinning:S.isSkinnedMesh===!0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:he,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:n.shadowMap.enabled&&I.length>0,shadowMapType:n.shadowMap.type,toneMapping:lt,decodeVideoTexture:Y&&w.map.isVideoTexture===!0&&je.getTransfer(w.map.colorSpace)===nt,decodeVideoTextureEmissive:Ee&&w.emissiveMap.isVideoTexture===!0&&je.getTransfer(w.emissiveMap.colorSpace)===nt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===on,flipSided:w.side===At,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ve&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&w.extensions.multiDraw===!0||Ie)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return yt.vertexUv1s=l.has(1),yt.vertexUv2s=l.has(2),yt.vertexUv3s=l.has(3),l.clear(),yt}function d(w){const M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(const I in w.defines)M.push(I),M.push(w.defines[I]);return w.isRawShaderMaterial===!1&&(_(M,w),y(M,w),M.push(n.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function _(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function y(w,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),w.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),w.push(a.mask)}function x(w){const M=g[w.type];let I;if(M){const W=rn[M];I=rm.clone(W.uniforms)}else I=w.uniforms;return I}function C(w,M){let I;for(let W=0,S=h.length;W<S;W++){const L=h[W];if(L.cacheKey===M){I=L,++I.usedTimes;break}}return I===void 0&&(I=new vv(n,M,w,r),h.push(I)),I}function b(w){if(--w.usedTimes===0){const M=h.indexOf(w);h[M]=h[h.length-1],h.pop(),w.destroy()}}function R(w){c.remove(w)}function D(){c.dispose()}return{getParameters:p,getProgramCacheKey:d,getUniforms:x,acquireProgram:C,releaseProgram:b,releaseShaderCache:R,programs:h,dispose:D}}function Ev(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,c){n.get(o)[a]=c}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function wv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Yl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function jl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(u,f,m,g,v,p){let d=n[e];return d===void 0?(d={id:u.id,object:u,geometry:f,material:m,groupOrder:g,renderOrder:u.renderOrder,z:v,group:p},n[e]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=m,d.groupOrder=g,d.renderOrder=u.renderOrder,d.z=v,d.group=p),e++,d}function a(u,f,m,g,v,p){const d=o(u,f,m,g,v,p);m.transmission>0?i.push(d):m.transparent===!0?s.push(d):t.push(d)}function c(u,f,m,g,v,p){const d=o(u,f,m,g,v,p);m.transmission>0?i.unshift(d):m.transparent===!0?s.unshift(d):t.unshift(d)}function l(u,f){t.length>1&&t.sort(u||wv),i.length>1&&i.sort(f||Yl),s.length>1&&s.sort(f||Yl)}function h(){for(let u=e,f=n.length;u<f;u++){const m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function Tv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new jl,n.set(i,[o])):s>=r.length?(o=new jl,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function bv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new qe};break;case"SpotLight":t={position:new O,direction:new O,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new O,halfWidth:new O,halfHeight:new O};break}return n[e.id]=t,t}}}function Av(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let Rv=0;function Cv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function Pv(n){const e=new bv,t=Av(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const s=new O,r=new ct,o=new ct;function a(l){let h=0,u=0,f=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let m=0,g=0,v=0,p=0,d=0,_=0,y=0,x=0,C=0,b=0,R=0;l.sort(Cv);for(let w=0,M=l.length;w<M;w++){const I=l[w],W=I.color,S=I.intensity,L=I.distance,N=I.shadow&&I.shadow.map?I.shadow.map.texture:null;if(I.isAmbientLight)h+=W.r*S,u+=W.g*S,f+=W.b*S;else if(I.isLightProbe){for(let P=0;P<9;P++)i.probe[P].addScaledVector(I.sh.coefficients[P],S);R++}else if(I.isDirectionalLight){const P=e.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const z=I.shadow,B=t.get(I);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,i.directionalShadow[m]=B,i.directionalShadowMap[m]=N,i.directionalShadowMatrix[m]=I.shadow.matrix,_++}i.directional[m]=P,m++}else if(I.isSpotLight){const P=e.get(I);P.position.setFromMatrixPosition(I.matrixWorld),P.color.copy(W).multiplyScalar(S),P.distance=L,P.coneCos=Math.cos(I.angle),P.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),P.decay=I.decay,i.spot[v]=P;const z=I.shadow;if(I.map&&(i.spotLightMap[C]=I.map,C++,z.updateMatrices(I),I.castShadow&&b++),i.spotLightMatrix[v]=z.matrix,I.castShadow){const B=t.get(I);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,i.spotShadow[v]=B,i.spotShadowMap[v]=N,x++}v++}else if(I.isRectAreaLight){const P=e.get(I);P.color.copy(W).multiplyScalar(S),P.halfWidth.set(I.width*.5,0,0),P.halfHeight.set(0,I.height*.5,0),i.rectArea[p]=P,p++}else if(I.isPointLight){const P=e.get(I);if(P.color.copy(I.color).multiplyScalar(I.intensity),P.distance=I.distance,P.decay=I.decay,I.castShadow){const z=I.shadow,B=t.get(I);B.shadowIntensity=z.intensity,B.shadowBias=z.bias,B.shadowNormalBias=z.normalBias,B.shadowRadius=z.radius,B.shadowMapSize=z.mapSize,B.shadowCameraNear=z.camera.near,B.shadowCameraFar=z.camera.far,i.pointShadow[g]=B,i.pointShadowMap[g]=N,i.pointShadowMatrix[g]=I.shadow.matrix,y++}i.point[g]=P,g++}else if(I.isHemisphereLight){const P=e.get(I);P.skyColor.copy(I.color).multiplyScalar(S),P.groundColor.copy(I.groundColor).multiplyScalar(S),i.hemi[d]=P,d++}}p>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=pe.LTC_FLOAT_1,i.rectAreaLTC2=pe.LTC_FLOAT_2):(i.rectAreaLTC1=pe.LTC_HALF_1,i.rectAreaLTC2=pe.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=f;const D=i.hash;(D.directionalLength!==m||D.pointLength!==g||D.spotLength!==v||D.rectAreaLength!==p||D.hemiLength!==d||D.numDirectionalShadows!==_||D.numPointShadows!==y||D.numSpotShadows!==x||D.numSpotMaps!==C||D.numLightProbes!==R)&&(i.directional.length=m,i.spot.length=v,i.rectArea.length=p,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=x+C-b,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=b,i.numLightProbes=R,D.directionalLength=m,D.pointLength=g,D.spotLength=v,D.rectAreaLength=p,D.hemiLength=d,D.numDirectionalShadows=_,D.numPointShadows=y,D.numSpotShadows=x,D.numSpotMaps=C,D.numLightProbes=R,i.version=Rv++)}function c(l,h){let u=0,f=0,m=0,g=0,v=0;const p=h.matrixWorldInverse;for(let d=0,_=l.length;d<_;d++){const y=l[d];if(y.isDirectionalLight){const x=i.directional[u];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),u++}else if(y.isSpotLight){const x=i.spot[m];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),m++}else if(y.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),o.identity(),r.copy(y.matrixWorld),r.premultiply(p),o.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),g++}else if(y.isPointLight){const x=i.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){const x=i.hemi[v];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(p),v++}}}return{setup:a,setupView:c,state:i}}function Kl(n){const e=new Pv(n),t=[],i=[];function s(h){l.camera=h,t.length=0,i.length=0}function r(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function Lv(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Kl(n),e.set(s,[a])):r>=o.length?(a=new Kl(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}class Dv extends xi{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=Rp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Iv extends xi{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Uv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nv=`uniform sampler2D shadow_pass;
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
}`;function Fv(n,e,t){let i=new cc;const s=new ke,r=new ke,o=new st,a=new Dv({depthPacking:Cp}),c=new Iv,l={},h=t.maxTextureSize,u={[Gt]:At,[At]:Gt,[on]:on},f=new jn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:Uv,fragmentShader:Nv}),m=f.clone();m.defines.HORIZONTAL_PASS=1;const g=new vt;g.setAttribute("position",new dt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Qe(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cu;let d=this.type;this.render=function(b,R,D){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;const w=n.getRenderTarget(),M=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),W=n.state;W.setBlending(Xn),W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const S=d!==xn&&this.type===xn,L=d===xn&&this.type!==xn;for(let N=0,P=b.length;N<P;N++){const z=b[N],B=z.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",z,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const F=B.getFrameExtents();if(s.multiply(F),r.copy(B.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/F.x),s.x=r.x*F.x,B.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/F.y),s.y=r.y*F.y,B.mapSize.y=r.y)),B.map===null||S===!0||L===!0){const Z=this.type!==xn?{minFilter:tn,magFilter:tn}:{};B.map!==null&&B.map.dispose(),B.map=new mi(s.x,s.y,Z),B.map.texture.name=z.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();const k=B.getViewportCount();for(let Z=0;Z<k;Z++){const he=B.getViewport(Z);o.set(r.x*he.x,r.y*he.y,r.x*he.z,r.y*he.w),W.viewport(o),B.updateMatrices(z,Z),i=B.getFrustum(),x(R,D,B.camera,z,this.type)}B.isPointLightShadow!==!0&&this.type===xn&&_(B,D),B.needsUpdate=!1}d=this.type,p.needsUpdate=!1,n.setRenderTarget(w,M,I)};function _(b,R){const D=e.update(v);f.defines.VSM_SAMPLES!==b.blurSamples&&(f.defines.VSM_SAMPLES=b.blurSamples,m.defines.VSM_SAMPLES=b.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),b.mapPass===null&&(b.mapPass=new mi(s.x,s.y)),f.uniforms.shadow_pass.value=b.map.texture,f.uniforms.resolution.value=b.mapSize,f.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(R,null,D,f,v,null),m.uniforms.shadow_pass.value=b.mapPass.texture,m.uniforms.resolution.value=b.mapSize,m.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(R,null,D,m,v,null)}function y(b,R,D,w){let M=null;const I=D.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)M=I;else if(M=D.isPointLight===!0?c:a,n.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const W=M.uuid,S=R.uuid;let L=l[W];L===void 0&&(L={},l[W]=L);let N=L[S];N===void 0&&(N=M.clone(),L[S]=N,R.addEventListener("dispose",C)),M=N}if(M.visible=R.visible,M.wireframe=R.wireframe,w===xn?M.side=R.shadowSide!==null?R.shadowSide:R.side:M.side=R.shadowSide!==null?R.shadowSide:u[R.side],M.alphaMap=R.alphaMap,M.alphaTest=R.alphaTest,M.map=R.map,M.clipShadows=R.clipShadows,M.clippingPlanes=R.clippingPlanes,M.clipIntersection=R.clipIntersection,M.displacementMap=R.displacementMap,M.displacementScale=R.displacementScale,M.displacementBias=R.displacementBias,M.wireframeLinewidth=R.wireframeLinewidth,M.linewidth=R.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const W=n.properties.get(M);W.light=D}return M}function x(b,R,D,w,M){if(b.visible===!1)return;if(b.layers.test(R.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&M===xn)&&(!b.frustumCulled||i.intersectsObject(b))){b.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,b.matrixWorld);const S=e.update(b),L=b.material;if(Array.isArray(L)){const N=S.groups;for(let P=0,z=N.length;P<z;P++){const B=N[P],F=L[B.materialIndex];if(F&&F.visible){const k=y(b,F,w,M);b.onBeforeShadow(n,b,R,D,S,k,B),n.renderBufferDirect(D,null,S,k,b,B),b.onAfterShadow(n,b,R,D,S,k,B)}}}else if(L.visible){const N=y(b,L,w,M);b.onBeforeShadow(n,b,R,D,S,N,null),n.renderBufferDirect(D,null,S,N,b,null),b.onAfterShadow(n,b,R,D,S,N,null)}}const W=b.children;for(let S=0,L=W.length;S<L;S++)x(W[S],R,D,w,M)}function C(b){b.target.removeEventListener("dispose",C);for(const D in l){const w=l[D],M=b.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}const Ov={[oa]:aa,[ca]:ua,[la]:da,[Zi]:ha,[aa]:oa,[ua]:ca,[da]:la,[ha]:Zi};function Bv(n,e){function t(){let V=!1;const ge=new st;let J=null;const ne=new st(0,0,0,0);return{setMask:function(ye){J!==ye&&!V&&(n.colorMask(ye,ye,ye,ye),J=ye)},setLocked:function(ye){V=ye},setClear:function(ye,_e,Ve,lt,yt){yt===!0&&(ye*=lt,_e*=lt,Ve*=lt),ge.set(ye,_e,Ve,lt),ne.equals(ge)===!1&&(n.clearColor(ye,_e,Ve,lt),ne.copy(ge))},reset:function(){V=!1,J=null,ne.set(-1,0,0,0)}}}function i(){let V=!1,ge=!1,J=null,ne=null,ye=null;return{setReversed:function(_e){if(ge!==_e){const Ve=e.get("EXT_clip_control");ge?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT);const lt=ye;ye=null,this.setClear(lt)}ge=_e},getReversed:function(){return ge},setTest:function(_e){_e?ae(n.DEPTH_TEST):Re(n.DEPTH_TEST)},setMask:function(_e){J!==_e&&!V&&(n.depthMask(_e),J=_e)},setFunc:function(_e){if(ge&&(_e=Ov[_e]),ne!==_e){switch(_e){case oa:n.depthFunc(n.NEVER);break;case aa:n.depthFunc(n.ALWAYS);break;case ca:n.depthFunc(n.LESS);break;case Zi:n.depthFunc(n.LEQUAL);break;case la:n.depthFunc(n.EQUAL);break;case ha:n.depthFunc(n.GEQUAL);break;case ua:n.depthFunc(n.GREATER);break;case da:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}ne=_e}},setLocked:function(_e){V=_e},setClear:function(_e){ye!==_e&&(ge&&(_e=1-_e),n.clearDepth(_e),ye=_e)},reset:function(){V=!1,J=null,ne=null,ye=null,ge=!1}}}function s(){let V=!1,ge=null,J=null,ne=null,ye=null,_e=null,Ve=null,lt=null,yt=null;return{setTest:function(tt){V||(tt?ae(n.STENCIL_TEST):Re(n.STENCIL_TEST))},setMask:function(tt){ge!==tt&&!V&&(n.stencilMask(tt),ge=tt)},setFunc:function(tt,$t,dn){(J!==tt||ne!==$t||ye!==dn)&&(n.stencilFunc(tt,$t,dn),J=tt,ne=$t,ye=dn)},setOp:function(tt,$t,dn){(_e!==tt||Ve!==$t||lt!==dn)&&(n.stencilOp(tt,$t,dn),_e=tt,Ve=$t,lt=dn)},setLocked:function(tt){V=tt},setClear:function(tt){yt!==tt&&(n.clearStencil(tt),yt=tt)},reset:function(){V=!1,ge=null,J=null,ne=null,ye=null,_e=null,Ve=null,lt=null,yt=null}}}const r=new t,o=new i,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,m=[],g=null,v=!1,p=null,d=null,_=null,y=null,x=null,C=null,b=null,R=new qe(0,0,0),D=0,w=!1,M=null,I=null,W=null,S=null,L=null;const N=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let P=!1,z=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(B)[1]),P=z>=1):B.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),P=z>=2);let F=null,k={};const Z=n.getParameter(n.SCISSOR_BOX),he=n.getParameter(n.VIEWPORT),Me=new st().fromArray(Z),X=new st().fromArray(he);function te(V,ge,J,ne){const ye=new Uint8Array(4),_e=n.createTexture();n.bindTexture(V,_e),n.texParameteri(V,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(V,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ve=0;Ve<J;Ve++)V===n.TEXTURE_3D||V===n.TEXTURE_2D_ARRAY?n.texImage3D(ge,0,n.RGBA,1,1,ne,0,n.RGBA,n.UNSIGNED_BYTE,ye):n.texImage2D(ge+Ve,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ye);return _e}const le={};le[n.TEXTURE_2D]=te(n.TEXTURE_2D,n.TEXTURE_2D,1),le[n.TEXTURE_CUBE_MAP]=te(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),le[n.TEXTURE_2D_ARRAY]=te(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),le[n.TEXTURE_3D]=te(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(n.DEPTH_TEST),o.setFunc(Zi),Ue(!1),Oe(nl),ae(n.CULL_FACE),U(Xn);function ae(V){h[V]!==!0&&(n.enable(V),h[V]=!0)}function Re(V){h[V]!==!1&&(n.disable(V),h[V]=!1)}function Le(V,ge){return u[V]!==ge?(n.bindFramebuffer(V,ge),u[V]=ge,V===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=ge),V===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ie(V,ge){let J=m,ne=!1;if(V){J=f.get(ge),J===void 0&&(J=[],f.set(ge,J));const ye=V.textures;if(J.length!==ye.length||J[0]!==n.COLOR_ATTACHMENT0){for(let _e=0,Ve=ye.length;_e<Ve;_e++)J[_e]=n.COLOR_ATTACHMENT0+_e;J.length=ye.length,ne=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,ne=!0);ne&&n.drawBuffers(J)}function Y(V){return g!==V?(n.useProgram(V),g=V,!0):!1}const Q={[ri]:n.FUNC_ADD,[np]:n.FUNC_SUBTRACT,[ip]:n.FUNC_REVERSE_SUBTRACT};Q[sp]=n.MIN,Q[rp]=n.MAX;const ue={[op]:n.ZERO,[ap]:n.ONE,[cp]:n.SRC_COLOR,[sa]:n.SRC_ALPHA,[pp]:n.SRC_ALPHA_SATURATE,[dp]:n.DST_COLOR,[hp]:n.DST_ALPHA,[lp]:n.ONE_MINUS_SRC_COLOR,[ra]:n.ONE_MINUS_SRC_ALPHA,[fp]:n.ONE_MINUS_DST_COLOR,[up]:n.ONE_MINUS_DST_ALPHA,[mp]:n.CONSTANT_COLOR,[gp]:n.ONE_MINUS_CONSTANT_COLOR,[_p]:n.CONSTANT_ALPHA,[vp]:n.ONE_MINUS_CONSTANT_ALPHA};function U(V,ge,J,ne,ye,_e,Ve,lt,yt,tt){if(V===Xn){v===!0&&(Re(n.BLEND),v=!1);return}if(v===!1&&(ae(n.BLEND),v=!0),V!==tp){if(V!==p||tt!==w){if((d!==ri||x!==ri)&&(n.blendEquation(n.FUNC_ADD),d=ri,x=ri),tt)switch(V){case Hi:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nn:n.blendFunc(n.ONE,n.ONE);break;case il:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case sl:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}else switch(V){case Hi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case nn:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case il:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case sl:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",V);break}_=null,y=null,C=null,b=null,R.set(0,0,0),D=0,p=V,w=tt}return}ye=ye||ge,_e=_e||J,Ve=Ve||ne,(ge!==d||ye!==x)&&(n.blendEquationSeparate(Q[ge],Q[ye]),d=ge,x=ye),(J!==_||ne!==y||_e!==C||Ve!==b)&&(n.blendFuncSeparate(ue[J],ue[ne],ue[_e],ue[Ve]),_=J,y=ne,C=_e,b=Ve),(lt.equals(R)===!1||yt!==D)&&(n.blendColor(lt.r,lt.g,lt.b,yt),R.copy(lt),D=yt),p=V,w=!1}function Ne(V,ge){V.side===on?Re(n.CULL_FACE):ae(n.CULL_FACE);let J=V.side===At;ge&&(J=!J),Ue(J),V.blending===Hi&&V.transparent===!1?U(Xn):U(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),o.setFunc(V.depthFunc),o.setTest(V.depthTest),o.setMask(V.depthWrite),r.setMask(V.colorWrite);const ne=V.stencilWrite;a.setTest(ne),ne&&(a.setMask(V.stencilWriteMask),a.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),a.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ee(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ae(n.SAMPLE_ALPHA_TO_COVERAGE):Re(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ue(V){M!==V&&(V?n.frontFace(n.CW):n.frontFace(n.CCW),M=V)}function Oe(V){V!==Jf?(ae(n.CULL_FACE),V!==I&&(V===nl?n.cullFace(n.BACK):V===Qf?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Re(n.CULL_FACE),I=V}function Se(V){V!==W&&(P&&n.lineWidth(V),W=V)}function Ee(V,ge,J){V?(ae(n.POLYGON_OFFSET_FILL),(S!==ge||L!==J)&&(n.polygonOffset(ge,J),S=ge,L=J)):Re(n.POLYGON_OFFSET_FILL)}function me(V){V?ae(n.SCISSOR_TEST):Re(n.SCISSOR_TEST)}function A(V){V===void 0&&(V=n.TEXTURE0+N-1),F!==V&&(n.activeTexture(V),F=V)}function E(V,ge,J){J===void 0&&(F===null?J=n.TEXTURE0+N-1:J=F);let ne=k[J];ne===void 0&&(ne={type:void 0,texture:void 0},k[J]=ne),(ne.type!==V||ne.texture!==ge)&&(F!==J&&(n.activeTexture(J),F=J),n.bindTexture(V,ge||le[V]),ne.type=V,ne.texture=ge)}function $(){const V=k[F];V!==void 0&&V.type!==void 0&&(n.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function ee(){try{n.compressedTexImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function se(){try{n.compressedTexImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function q(){try{n.texSubImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function oe(){try{n.texSubImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function ie(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function de(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Pe(){try{n.texStorage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function re(){try{n.texStorage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function fe(){try{n.texImage2D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function De(){try{n.texImage3D.apply(n,arguments)}catch(V){console.error("THREE.WebGLState:",V)}}function Fe(V){Me.equals(V)===!1&&(n.scissor(V.x,V.y,V.z,V.w),Me.copy(V))}function xe(V){X.equals(V)===!1&&(n.viewport(V.x,V.y,V.z,V.w),X.copy(V))}function $e(V,ge){let J=l.get(ge);J===void 0&&(J=new WeakMap,l.set(ge,J));let ne=J.get(V);ne===void 0&&(ne=n.getUniformBlockIndex(ge,V.name),J.set(V,ne))}function ze(V,ge){const ne=l.get(ge).get(V);c.get(ge)!==ne&&(n.uniformBlockBinding(ge,ne,V.__bindingPointIndex),c.set(ge,ne))}function et(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},F=null,k={},u={},f=new WeakMap,m=[],g=null,v=!1,p=null,d=null,_=null,y=null,x=null,C=null,b=null,R=new qe(0,0,0),D=0,w=!1,M=null,I=null,W=null,S=null,L=null,Me.set(0,0,n.canvas.width,n.canvas.height),X.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Re,bindFramebuffer:Le,drawBuffers:Ie,useProgram:Y,setBlending:U,setMaterial:Ne,setFlipSided:Ue,setCullFace:Oe,setLineWidth:Se,setPolygonOffset:Ee,setScissorTest:me,activeTexture:A,bindTexture:E,unbindTexture:$,compressedTexImage2D:ee,compressedTexImage3D:se,texImage2D:fe,texImage3D:De,updateUBOMapping:$e,uniformBlockBinding:ze,texStorage2D:Pe,texStorage3D:re,texSubImage2D:q,texSubImage3D:oe,compressedTexSubImage2D:ie,compressedTexSubImage3D:de,scissor:Fe,viewport:xe,reset:et}}function Zl(n,e,t,i){const s=kv(i);switch(t){case mu:return n*e;case _u:return n*e;case vu:return n*e*2;case yu:return n*e/s.components*s.byteLength;case rc:return n*e/s.components*s.byteLength;case xu:return n*e*2/s.components*s.byteLength;case oc:return n*e*2/s.components*s.byteLength;case gu:return n*e*3/s.components*s.byteLength;case Qt:return n*e*4/s.components*s.byteLength;case ac:return n*e*4/s.components*s.byteLength;case Tr:case br:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ar:case Rr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _a:case ya:return Math.max(n,16)*Math.max(e,8)/4;case ga:case va:return Math.max(n,8)*Math.max(e,8)/2;case xa:case Ma:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sa:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ea:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wa:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ta:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case ba:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Aa:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ra:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ca:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Pa:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case La:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Da:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Ia:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Ua:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Na:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Fa:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Cr:case Oa:case Ba:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Mu:case ka:return Math.ceil(n/4)*Math.ceil(e/4)*8;case za:case Va:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function kv(n){switch(n){case Cn:case du:return{byteLength:1,components:1};case Ns:case fu:case zs:return{byteLength:2,components:1};case ic:case sc:return{byteLength:2,components:4};case pi:case nc:case wn:return{byteLength:4,components:1};case pu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}function zv(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ke,h=new WeakMap;let u;const f=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,E){return m?new OffscreenCanvas(A,E):Fr("canvas")}function v(A,E,$){let ee=1;const se=me(A);if((se.width>$||se.height>$)&&(ee=$/Math.max(se.width,se.height)),ee<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const q=Math.floor(ee*se.width),oe=Math.floor(ee*se.height);u===void 0&&(u=g(q,oe));const ie=E?g(q,oe):u;return ie.width=q,ie.height=oe,ie.getContext("2d").drawImage(A,0,0,q,oe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+q+"x"+oe+")."),ie}else return"data"in A&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),A;return A}function p(A){return A.generateMipmaps}function d(A){n.generateMipmap(A)}function _(A){return A.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?n.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(A,E,$,ee,se=!1){if(A!==null){if(n[A]!==void 0)return n[A];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let q=E;if(E===n.RED&&($===n.FLOAT&&(q=n.R32F),$===n.HALF_FLOAT&&(q=n.R16F),$===n.UNSIGNED_BYTE&&(q=n.R8)),E===n.RED_INTEGER&&($===n.UNSIGNED_BYTE&&(q=n.R8UI),$===n.UNSIGNED_SHORT&&(q=n.R16UI),$===n.UNSIGNED_INT&&(q=n.R32UI),$===n.BYTE&&(q=n.R8I),$===n.SHORT&&(q=n.R16I),$===n.INT&&(q=n.R32I)),E===n.RG&&($===n.FLOAT&&(q=n.RG32F),$===n.HALF_FLOAT&&(q=n.RG16F),$===n.UNSIGNED_BYTE&&(q=n.RG8)),E===n.RG_INTEGER&&($===n.UNSIGNED_BYTE&&(q=n.RG8UI),$===n.UNSIGNED_SHORT&&(q=n.RG16UI),$===n.UNSIGNED_INT&&(q=n.RG32UI),$===n.BYTE&&(q=n.RG8I),$===n.SHORT&&(q=n.RG16I),$===n.INT&&(q=n.RG32I)),E===n.RGB_INTEGER&&($===n.UNSIGNED_BYTE&&(q=n.RGB8UI),$===n.UNSIGNED_SHORT&&(q=n.RGB16UI),$===n.UNSIGNED_INT&&(q=n.RGB32UI),$===n.BYTE&&(q=n.RGB8I),$===n.SHORT&&(q=n.RGB16I),$===n.INT&&(q=n.RGB32I)),E===n.RGBA_INTEGER&&($===n.UNSIGNED_BYTE&&(q=n.RGBA8UI),$===n.UNSIGNED_SHORT&&(q=n.RGBA16UI),$===n.UNSIGNED_INT&&(q=n.RGBA32UI),$===n.BYTE&&(q=n.RGBA8I),$===n.SHORT&&(q=n.RGBA16I),$===n.INT&&(q=n.RGBA32I)),E===n.RGB&&$===n.UNSIGNED_INT_5_9_9_9_REV&&(q=n.RGB9_E5),E===n.RGBA){const oe=se?Xr:je.getTransfer(ee);$===n.FLOAT&&(q=n.RGBA32F),$===n.HALF_FLOAT&&(q=n.RGBA16F),$===n.UNSIGNED_BYTE&&(q=oe===nt?n.SRGB8_ALPHA8:n.RGBA8),$===n.UNSIGNED_SHORT_4_4_4_4&&(q=n.RGBA4),$===n.UNSIGNED_SHORT_5_5_5_1&&(q=n.RGB5_A1)}return(q===n.R16F||q===n.R32F||q===n.RG16F||q===n.RG32F||q===n.RGBA16F||q===n.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function x(A,E){let $;return A?E===null||E===pi||E===es?$=n.DEPTH24_STENCIL8:E===wn?$=n.DEPTH32F_STENCIL8:E===Ns&&($=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===pi||E===es?$=n.DEPTH_COMPONENT24:E===wn?$=n.DEPTH_COMPONENT32F:E===Ns&&($=n.DEPTH_COMPONENT16),$}function C(A,E){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==tn&&A.minFilter!==cn?Math.log2(Math.max(E.width,E.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?E.mipmaps.length:1}function b(A){const E=A.target;E.removeEventListener("dispose",b),D(E),E.isVideoTexture&&h.delete(E)}function R(A){const E=A.target;E.removeEventListener("dispose",R),M(E)}function D(A){const E=i.get(A);if(E.__webglInit===void 0)return;const $=A.source,ee=f.get($);if(ee){const se=ee[E.__cacheKey];se.usedTimes--,se.usedTimes===0&&w(A),Object.keys(ee).length===0&&f.delete($)}i.remove(A)}function w(A){const E=i.get(A);n.deleteTexture(E.__webglTexture);const $=A.source,ee=f.get($);delete ee[E.__cacheKey],o.memory.textures--}function M(A){const E=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let ee=0;ee<6;ee++){if(Array.isArray(E.__webglFramebuffer[ee]))for(let se=0;se<E.__webglFramebuffer[ee].length;se++)n.deleteFramebuffer(E.__webglFramebuffer[ee][se]);else n.deleteFramebuffer(E.__webglFramebuffer[ee]);E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer[ee])}else{if(Array.isArray(E.__webglFramebuffer))for(let ee=0;ee<E.__webglFramebuffer.length;ee++)n.deleteFramebuffer(E.__webglFramebuffer[ee]);else n.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&n.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&n.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ee=0;ee<E.__webglColorRenderbuffer.length;ee++)E.__webglColorRenderbuffer[ee]&&n.deleteRenderbuffer(E.__webglColorRenderbuffer[ee]);E.__webglDepthRenderbuffer&&n.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const $=A.textures;for(let ee=0,se=$.length;ee<se;ee++){const q=i.get($[ee]);q.__webglTexture&&(n.deleteTexture(q.__webglTexture),o.memory.textures--),i.remove($[ee])}i.remove(A)}let I=0;function W(){I=0}function S(){const A=I;return A>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),I+=1,A}function L(A){const E=[];return E.push(A.wrapS),E.push(A.wrapT),E.push(A.wrapR||0),E.push(A.magFilter),E.push(A.minFilter),E.push(A.anisotropy),E.push(A.internalFormat),E.push(A.format),E.push(A.type),E.push(A.generateMipmaps),E.push(A.premultiplyAlpha),E.push(A.flipY),E.push(A.unpackAlignment),E.push(A.colorSpace),E.join()}function N(A,E){const $=i.get(A);if(A.isVideoTexture&&Se(A),A.isRenderTargetTexture===!1&&A.version>0&&$.__version!==A.version){const ee=A.image;if(ee===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ee.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X($,A,E);return}}t.bindTexture(n.TEXTURE_2D,$.__webglTexture,n.TEXTURE0+E)}function P(A,E){const $=i.get(A);if(A.version>0&&$.__version!==A.version){X($,A,E);return}t.bindTexture(n.TEXTURE_2D_ARRAY,$.__webglTexture,n.TEXTURE0+E)}function z(A,E){const $=i.get(A);if(A.version>0&&$.__version!==A.version){X($,A,E);return}t.bindTexture(n.TEXTURE_3D,$.__webglTexture,n.TEXTURE0+E)}function B(A,E){const $=i.get(A);if(A.version>0&&$.__version!==A.version){te($,A,E);return}t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture,n.TEXTURE0+E)}const F={[Us]:n.REPEAT,[li]:n.CLAMP_TO_EDGE,[ma]:n.MIRRORED_REPEAT},k={[tn]:n.NEAREST,[Ap]:n.NEAREST_MIPMAP_NEAREST,[Js]:n.NEAREST_MIPMAP_LINEAR,[cn]:n.LINEAR,[uo]:n.LINEAR_MIPMAP_NEAREST,[hi]:n.LINEAR_MIPMAP_LINEAR},Z={[Lp]:n.NEVER,[Op]:n.ALWAYS,[Dp]:n.LESS,[Eu]:n.LEQUAL,[Ip]:n.EQUAL,[Fp]:n.GEQUAL,[Up]:n.GREATER,[Np]:n.NOTEQUAL};function he(A,E){if(E.type===wn&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===cn||E.magFilter===uo||E.magFilter===Js||E.magFilter===hi||E.minFilter===cn||E.minFilter===uo||E.minFilter===Js||E.minFilter===hi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(A,n.TEXTURE_WRAP_S,F[E.wrapS]),n.texParameteri(A,n.TEXTURE_WRAP_T,F[E.wrapT]),(A===n.TEXTURE_3D||A===n.TEXTURE_2D_ARRAY)&&n.texParameteri(A,n.TEXTURE_WRAP_R,F[E.wrapR]),n.texParameteri(A,n.TEXTURE_MAG_FILTER,k[E.magFilter]),n.texParameteri(A,n.TEXTURE_MIN_FILTER,k[E.minFilter]),E.compareFunction&&(n.texParameteri(A,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(A,n.TEXTURE_COMPARE_FUNC,Z[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===tn||E.minFilter!==Js&&E.minFilter!==hi||E.type===wn&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||i.get(E).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");n.texParameterf(A,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,s.getMaxAnisotropy())),i.get(E).__currentAnisotropy=E.anisotropy}}}function Me(A,E){let $=!1;A.__webglInit===void 0&&(A.__webglInit=!0,E.addEventListener("dispose",b));const ee=E.source;let se=f.get(ee);se===void 0&&(se={},f.set(ee,se));const q=L(E);if(q!==A.__cacheKey){se[q]===void 0&&(se[q]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,$=!0),se[q].usedTimes++;const oe=se[A.__cacheKey];oe!==void 0&&(se[A.__cacheKey].usedTimes--,oe.usedTimes===0&&w(E)),A.__cacheKey=q,A.__webglTexture=se[q].texture}return $}function X(A,E,$){let ee=n.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ee=n.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ee=n.TEXTURE_3D);const se=Me(A,E),q=E.source;t.bindTexture(ee,A.__webglTexture,n.TEXTURE0+$);const oe=i.get(q);if(q.version!==oe.__version||se===!0){t.activeTexture(n.TEXTURE0+$);const ie=je.getPrimaries(je.workingColorSpace),de=E.colorSpace===Hn?null:je.getPrimaries(E.colorSpace),Pe=E.colorSpace===Hn||ie===de?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);let re=v(E.image,!1,s.maxTextureSize);re=Ee(E,re);const fe=r.convert(E.format,E.colorSpace),De=r.convert(E.type);let Fe=y(E.internalFormat,fe,De,E.colorSpace,E.isVideoTexture);he(ee,E);let xe;const $e=E.mipmaps,ze=E.isVideoTexture!==!0,et=oe.__version===void 0||se===!0,V=q.dataReady,ge=C(E,re);if(E.isDepthTexture)Fe=x(E.format===ts,E.type),et&&(ze?t.texStorage2D(n.TEXTURE_2D,1,Fe,re.width,re.height):t.texImage2D(n.TEXTURE_2D,0,Fe,re.width,re.height,0,fe,De,null));else if(E.isDataTexture)if($e.length>0){ze&&et&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,$e[0].width,$e[0].height);for(let J=0,ne=$e.length;J<ne;J++)xe=$e[J],ze?V&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,xe.width,xe.height,fe,De,xe.data):t.texImage2D(n.TEXTURE_2D,J,Fe,xe.width,xe.height,0,fe,De,xe.data);E.generateMipmaps=!1}else ze?(et&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,re.width,re.height),V&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,re.width,re.height,fe,De,re.data)):t.texImage2D(n.TEXTURE_2D,0,Fe,re.width,re.height,0,fe,De,re.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ze&&et&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Fe,$e[0].width,$e[0].height,re.depth);for(let J=0,ne=$e.length;J<ne;J++)if(xe=$e[J],E.format!==Qt)if(fe!==null)if(ze){if(V)if(E.layerUpdates.size>0){const ye=Zl(xe.width,xe.height,E.format,E.type);for(const _e of E.layerUpdates){const Ve=xe.data.subarray(_e*ye/xe.data.BYTES_PER_ELEMENT,(_e+1)*ye/xe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,_e,xe.width,xe.height,1,fe,Ve)}E.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,xe.width,xe.height,re.depth,fe,xe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,J,Fe,xe.width,xe.height,re.depth,0,xe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ze?V&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,J,0,0,0,xe.width,xe.height,re.depth,fe,De,xe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,J,Fe,xe.width,xe.height,re.depth,0,fe,De,xe.data)}else{ze&&et&&t.texStorage2D(n.TEXTURE_2D,ge,Fe,$e[0].width,$e[0].height);for(let J=0,ne=$e.length;J<ne;J++)xe=$e[J],E.format!==Qt?fe!==null?ze?V&&t.compressedTexSubImage2D(n.TEXTURE_2D,J,0,0,xe.width,xe.height,fe,xe.data):t.compressedTexImage2D(n.TEXTURE_2D,J,Fe,xe.width,xe.height,0,xe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ze?V&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,xe.width,xe.height,fe,De,xe.data):t.texImage2D(n.TEXTURE_2D,J,Fe,xe.width,xe.height,0,fe,De,xe.data)}else if(E.isDataArrayTexture)if(ze){if(et&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ge,Fe,re.width,re.height,re.depth),V)if(E.layerUpdates.size>0){const J=Zl(re.width,re.height,E.format,E.type);for(const ne of E.layerUpdates){const ye=re.data.subarray(ne*J/re.data.BYTES_PER_ELEMENT,(ne+1)*J/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,ne,re.width,re.height,1,fe,De,ye)}E.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,fe,De,re.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Fe,re.width,re.height,re.depth,0,fe,De,re.data);else if(E.isData3DTexture)ze?(et&&t.texStorage3D(n.TEXTURE_3D,ge,Fe,re.width,re.height,re.depth),V&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,fe,De,re.data)):t.texImage3D(n.TEXTURE_3D,0,Fe,re.width,re.height,re.depth,0,fe,De,re.data);else if(E.isFramebufferTexture){if(et)if(ze)t.texStorage2D(n.TEXTURE_2D,ge,Fe,re.width,re.height);else{let J=re.width,ne=re.height;for(let ye=0;ye<ge;ye++)t.texImage2D(n.TEXTURE_2D,ye,Fe,J,ne,0,fe,De,null),J>>=1,ne>>=1}}else if($e.length>0){if(ze&&et){const J=me($e[0]);t.texStorage2D(n.TEXTURE_2D,ge,Fe,J.width,J.height)}for(let J=0,ne=$e.length;J<ne;J++)xe=$e[J],ze?V&&t.texSubImage2D(n.TEXTURE_2D,J,0,0,fe,De,xe):t.texImage2D(n.TEXTURE_2D,J,Fe,fe,De,xe);E.generateMipmaps=!1}else if(ze){if(et){const J=me(re);t.texStorage2D(n.TEXTURE_2D,ge,Fe,J.width,J.height)}V&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,fe,De,re)}else t.texImage2D(n.TEXTURE_2D,0,Fe,fe,De,re);p(E)&&d(ee),oe.__version=q.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function te(A,E,$){if(E.image.length!==6)return;const ee=Me(A,E),se=E.source;t.bindTexture(n.TEXTURE_CUBE_MAP,A.__webglTexture,n.TEXTURE0+$);const q=i.get(se);if(se.version!==q.__version||ee===!0){t.activeTexture(n.TEXTURE0+$);const oe=je.getPrimaries(je.workingColorSpace),ie=E.colorSpace===Hn?null:je.getPrimaries(E.colorSpace),de=E.colorSpace===Hn||oe===ie?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,E.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,E.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,de);const Pe=E.isCompressedTexture||E.image[0].isCompressedTexture,re=E.image[0]&&E.image[0].isDataTexture,fe=[];for(let ne=0;ne<6;ne++)!Pe&&!re?fe[ne]=v(E.image[ne],!0,s.maxCubemapSize):fe[ne]=re?E.image[ne].image:E.image[ne],fe[ne]=Ee(E,fe[ne]);const De=fe[0],Fe=r.convert(E.format,E.colorSpace),xe=r.convert(E.type),$e=y(E.internalFormat,Fe,xe,E.colorSpace),ze=E.isVideoTexture!==!0,et=q.__version===void 0||ee===!0,V=se.dataReady;let ge=C(E,De);he(n.TEXTURE_CUBE_MAP,E);let J;if(Pe){ze&&et&&t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,$e,De.width,De.height);for(let ne=0;ne<6;ne++){J=fe[ne].mipmaps;for(let ye=0;ye<J.length;ye++){const _e=J[ye];E.format!==Qt?Fe!==null?ze?V&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,0,0,_e.width,_e.height,Fe,_e.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,$e,_e.width,_e.height,0,_e.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):ze?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,0,0,_e.width,_e.height,Fe,xe,_e.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye,$e,_e.width,_e.height,0,Fe,xe,_e.data)}}}else{if(J=E.mipmaps,ze&&et){J.length>0&&ge++;const ne=me(fe[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,ge,$e,ne.width,ne.height)}for(let ne=0;ne<6;ne++)if(re){ze?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,fe[ne].width,fe[ne].height,Fe,xe,fe[ne].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,fe[ne].width,fe[ne].height,0,Fe,xe,fe[ne].data);for(let ye=0;ye<J.length;ye++){const Ve=J[ye].image[ne].image;ze?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,0,0,Ve.width,Ve.height,Fe,xe,Ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,$e,Ve.width,Ve.height,0,Fe,xe,Ve.data)}}else{ze?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,0,0,Fe,xe,fe[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0,$e,Fe,xe,fe[ne]);for(let ye=0;ye<J.length;ye++){const _e=J[ye];ze?V&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,0,0,Fe,xe,_e.image[ne]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,ye+1,$e,Fe,xe,_e.image[ne])}}}p(E)&&d(n.TEXTURE_CUBE_MAP),q.__version=se.version,E.onUpdate&&E.onUpdate(E)}A.__version=E.version}function le(A,E,$,ee,se,q){const oe=r.convert($.format,$.colorSpace),ie=r.convert($.type),de=y($.internalFormat,oe,ie,$.colorSpace),Pe=i.get(E),re=i.get($);if(re.__renderTarget=E,!Pe.__hasExternalTextures){const fe=Math.max(1,E.width>>q),De=Math.max(1,E.height>>q);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,q,de,fe,De,E.depth,0,oe,ie,null):t.texImage2D(se,q,de,fe,De,0,oe,ie,null)}t.bindFramebuffer(n.FRAMEBUFFER,A),Oe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ee,se,re.__webglTexture,0,Ue(E)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,ee,se,re.__webglTexture,q),t.bindFramebuffer(n.FRAMEBUFFER,null)}function ae(A,E,$){if(n.bindRenderbuffer(n.RENDERBUFFER,A),E.depthBuffer){const ee=E.depthTexture,se=ee&&ee.isDepthTexture?ee.type:null,q=x(E.stencilBuffer,se),oe=E.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ie=Ue(E);Oe(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ie,q,E.width,E.height):$?n.renderbufferStorageMultisample(n.RENDERBUFFER,ie,q,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,q,E.width,E.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,oe,n.RENDERBUFFER,A)}else{const ee=E.textures;for(let se=0;se<ee.length;se++){const q=ee[se],oe=r.convert(q.format,q.colorSpace),ie=r.convert(q.type),de=y(q.internalFormat,oe,ie,q.colorSpace),Pe=Ue(E);$&&Oe(E)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Pe,de,E.width,E.height):Oe(E)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Pe,de,E.width,E.height):n.renderbufferStorage(n.RENDERBUFFER,de,E.width,E.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Re(A,E){if(E&&E.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,A),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const ee=i.get(E.depthTexture);ee.__renderTarget=E,(!ee.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),N(E.depthTexture,0);const se=ee.__webglTexture,q=Ue(E);if(E.depthTexture.format===Gi)Oe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,se,0);else if(E.depthTexture.format===ts)Oe(E)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0,q):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Le(A){const E=i.get(A),$=A.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==A.depthTexture){const ee=A.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ee){const se=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ee.removeEventListener("dispose",se)};ee.addEventListener("dispose",se),E.__depthDisposeCallback=se}E.__boundDepthTexture=ee}if(A.depthTexture&&!E.__autoAllocateDepthBuffer){if($)throw new Error("target.depthTexture not supported in Cube render targets");Re(E.__webglFramebuffer,A)}else if($){E.__webglDepthbuffer=[];for(let ee=0;ee<6;ee++)if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer[ee]),E.__webglDepthbuffer[ee]===void 0)E.__webglDepthbuffer[ee]=n.createRenderbuffer(),ae(E.__webglDepthbuffer[ee],A,!1);else{const se=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,q=E.__webglDepthbuffer[ee];n.bindRenderbuffer(n.RENDERBUFFER,q),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,q)}}else if(t.bindFramebuffer(n.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=n.createRenderbuffer(),ae(E.__webglDepthbuffer,A,!1);else{const ee=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,se=E.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,se),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,se)}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Ie(A,E,$){const ee=i.get(A);E!==void 0&&le(ee.__webglFramebuffer,A,A.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),$!==void 0&&Le(A)}function Y(A){const E=A.texture,$=i.get(A),ee=i.get(E);A.addEventListener("dispose",R);const se=A.textures,q=A.isWebGLCubeRenderTarget===!0,oe=se.length>1;if(oe||(ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture()),ee.__version=E.version,o.memory.textures++),q){$.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer[ie]=[];for(let de=0;de<E.mipmaps.length;de++)$.__webglFramebuffer[ie][de]=n.createFramebuffer()}else $.__webglFramebuffer[ie]=n.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){$.__webglFramebuffer=[];for(let ie=0;ie<E.mipmaps.length;ie++)$.__webglFramebuffer[ie]=n.createFramebuffer()}else $.__webglFramebuffer=n.createFramebuffer();if(oe)for(let ie=0,de=se.length;ie<de;ie++){const Pe=i.get(se[ie]);Pe.__webglTexture===void 0&&(Pe.__webglTexture=n.createTexture(),o.memory.textures++)}if(A.samples>0&&Oe(A)===!1){$.__webglMultisampledFramebuffer=n.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let ie=0;ie<se.length;ie++){const de=se[ie];$.__webglColorRenderbuffer[ie]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,$.__webglColorRenderbuffer[ie]);const Pe=r.convert(de.format,de.colorSpace),re=r.convert(de.type),fe=y(de.internalFormat,Pe,re,de.colorSpace,A.isXRRenderTarget===!0),De=Ue(A);n.renderbufferStorageMultisample(n.RENDERBUFFER,De,fe,A.width,A.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ie,n.RENDERBUFFER,$.__webglColorRenderbuffer[ie])}n.bindRenderbuffer(n.RENDERBUFFER,null),A.depthBuffer&&($.__webglDepthRenderbuffer=n.createRenderbuffer(),ae($.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(q){t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),he(n.TEXTURE_CUBE_MAP,E);for(let ie=0;ie<6;ie++)if(E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)le($.__webglFramebuffer[ie][de],A,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,de);else le($.__webglFramebuffer[ie],A,E,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(E)&&d(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(oe){for(let ie=0,de=se.length;ie<de;ie++){const Pe=se[ie],re=i.get(Pe);t.bindTexture(n.TEXTURE_2D,re.__webglTexture),he(n.TEXTURE_2D,Pe),le($.__webglFramebuffer,A,Pe,n.COLOR_ATTACHMENT0+ie,n.TEXTURE_2D,0),p(Pe)&&d(n.TEXTURE_2D)}t.unbindTexture()}else{let ie=n.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ie=A.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ie,ee.__webglTexture),he(ie,E),E.mipmaps&&E.mipmaps.length>0)for(let de=0;de<E.mipmaps.length;de++)le($.__webglFramebuffer[de],A,E,n.COLOR_ATTACHMENT0,ie,de);else le($.__webglFramebuffer,A,E,n.COLOR_ATTACHMENT0,ie,0);p(E)&&d(ie),t.unbindTexture()}A.depthBuffer&&Le(A)}function Q(A){const E=A.textures;for(let $=0,ee=E.length;$<ee;$++){const se=E[$];if(p(se)){const q=_(A),oe=i.get(se).__webglTexture;t.bindTexture(q,oe),d(q),t.unbindTexture()}}}const ue=[],U=[];function Ne(A){if(A.samples>0){if(Oe(A)===!1){const E=A.textures,$=A.width,ee=A.height;let se=n.COLOR_BUFFER_BIT;const q=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,oe=i.get(A),ie=E.length>1;if(ie)for(let de=0;de<E.length;de++)t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,oe.__webglMultisampledFramebuffer),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglFramebuffer);for(let de=0;de<E.length;de++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),ie){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,oe.__webglColorRenderbuffer[de]);const Pe=i.get(E[de]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Pe,0)}n.blitFramebuffer(0,0,$,ee,0,0,$,ee,se,n.NEAREST),c===!0&&(ue.length=0,U.length=0,ue.push(n.COLOR_ATTACHMENT0+de),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ue.push(q),U.push(q),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,U)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ue))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ie)for(let de=0;de<E.length;de++){t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.RENDERBUFFER,oe.__webglColorRenderbuffer[de]);const Pe=i.get(E[de]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,oe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+de,n.TEXTURE_2D,Pe,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,oe.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const E=A.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[E])}}}function Ue(A){return Math.min(s.maxSamples,A.samples)}function Oe(A){const E=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function Se(A){const E=o.render.frame;h.get(A)!==E&&(h.set(A,E),A.update())}function Ee(A,E){const $=A.colorSpace,ee=A.format,se=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||$!==is&&$!==Hn&&(je.getTransfer($)===nt?(ee!==Qt||se!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",$)),E}function me(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=S,this.resetTextureUnits=W,this.setTexture2D=N,this.setTexture2DArray=P,this.setTexture3D=z,this.setTextureCube=B,this.rebindTextures=Ie,this.setupRenderTarget=Y,this.updateRenderTargetMipmap=Q,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=le,this.useMultisampledRTT=Oe}function Vv(n,e){function t(i,s=Hn){let r;const o=je.getTransfer(s);if(i===Cn)return n.UNSIGNED_BYTE;if(i===ic)return n.UNSIGNED_SHORT_4_4_4_4;if(i===sc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===pu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===du)return n.BYTE;if(i===fu)return n.SHORT;if(i===Ns)return n.UNSIGNED_SHORT;if(i===nc)return n.INT;if(i===pi)return n.UNSIGNED_INT;if(i===wn)return n.FLOAT;if(i===zs)return n.HALF_FLOAT;if(i===mu)return n.ALPHA;if(i===gu)return n.RGB;if(i===Qt)return n.RGBA;if(i===_u)return n.LUMINANCE;if(i===vu)return n.LUMINANCE_ALPHA;if(i===Gi)return n.DEPTH_COMPONENT;if(i===ts)return n.DEPTH_STENCIL;if(i===yu)return n.RED;if(i===rc)return n.RED_INTEGER;if(i===xu)return n.RG;if(i===oc)return n.RG_INTEGER;if(i===ac)return n.RGBA_INTEGER;if(i===Tr||i===br||i===Ar||i===Rr)if(o===nt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Tr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ar)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Rr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Tr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ar)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Rr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ga||i===_a||i===va||i===ya)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_a)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===va)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ya)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xa||i===Ma||i===Sa)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===xa||i===Ma)return o===nt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Sa)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ea||i===wa||i===Ta||i===ba||i===Aa||i===Ra||i===Ca||i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Na||i===Fa)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Ea)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wa)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ta)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ba)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Aa)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ra)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ca)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Pa)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===La)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Da)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ia)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ua)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Na)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Fa)return o===nt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Cr||i===Oa||i===Ba)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Cr)return o===nt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Oa)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ba)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Mu||i===ka||i===za||i===Va)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Cr)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ka)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===za)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Va)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===es?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}class Hv extends Ot{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class bn extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Gv={type:"move"};class Vo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new bn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new bn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new bn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){o=!0;for(const v of e.hand.values()){const p=t.getJointPose(v,i),d=this._getHandJoint(l,v);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Gv)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new bn;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}const Wv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Xv=`
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

}`;class qv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,i){if(this.texture===null){const s=new Rt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=i.depthNear||t.depthFar!=i.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new jn({vertexShader:Wv,fragmentShader:Xv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qe(new qr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class $v extends ss{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,m=null,g=null;const v=new qv,p=t.getContextAttributes();let d=null,_=null;const y=[],x=[],C=new ke;let b=null;const R=new Ot;R.viewport=new st;const D=new Ot;D.viewport=new st;const w=[R,D],M=new Hv;let I=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let te=y[X];return te===void 0&&(te=new Vo,y[X]=te),te.getTargetRaySpace()},this.getControllerGrip=function(X){let te=y[X];return te===void 0&&(te=new Vo,y[X]=te),te.getGripSpace()},this.getHand=function(X){let te=y[X];return te===void 0&&(te=new Vo,y[X]=te),te.getHandSpace()};function S(X){const te=x.indexOf(X.inputSource);if(te===-1)return;const le=y[te];le!==void 0&&(le.update(X.inputSource,X.frame,l||o),le.dispatchEvent({type:X.type,data:X.inputSource}))}function L(){s.removeEventListener("select",S),s.removeEventListener("selectstart",S),s.removeEventListener("selectend",S),s.removeEventListener("squeeze",S),s.removeEventListener("squeezestart",S),s.removeEventListener("squeezeend",S),s.removeEventListener("end",L),s.removeEventListener("inputsourceschange",N);for(let X=0;X<y.length;X++){const te=x[X];te!==null&&(x[X]=null,y[X].disconnect(te))}I=null,W=null,v.reset(),e.setRenderTarget(d),m=null,f=null,u=null,s=null,_=null,Me.stop(),i.isPresenting=!1,e.setPixelRatio(b),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){a=X,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(d=e.getRenderTarget(),s.addEventListener("select",S),s.addEventListener("selectstart",S),s.addEventListener("selectend",S),s.addEventListener("squeeze",S),s.addEventListener("squeezestart",S),s.addEventListener("squeezeend",S),s.addEventListener("end",L),s.addEventListener("inputsourceschange",N),p.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(C),s.renderState.layers===void 0){const te={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,te),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),_=new mi(m.framebufferWidth,m.framebufferHeight,{format:Qt,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil})}else{let te=null,le=null,ae=null;p.depth&&(ae=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,te=p.stencil?ts:Gi,le=p.stencil?es:pi);const Re={colorFormat:t.RGBA8,depthFormat:ae,scaleFactor:r};u=new XRWebGLBinding(s,t),f=u.createProjectionLayer(Re),s.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),_=new mi(f.textureWidth,f.textureHeight,{format:Qt,type:Cn,depthTexture:new Ou(f.textureWidth,f.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,te),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),Me.setContext(s),Me.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function N(X){for(let te=0;te<X.removed.length;te++){const le=X.removed[te],ae=x.indexOf(le);ae>=0&&(x[ae]=null,y[ae].disconnect(le))}for(let te=0;te<X.added.length;te++){const le=X.added[te];let ae=x.indexOf(le);if(ae===-1){for(let Le=0;Le<y.length;Le++)if(Le>=x.length){x.push(le),ae=Le;break}else if(x[Le]===null){x[Le]=le,ae=Le;break}if(ae===-1)break}const Re=y[ae];Re&&Re.connect(le)}}const P=new O,z=new O;function B(X,te,le){P.setFromMatrixPosition(te.matrixWorld),z.setFromMatrixPosition(le.matrixWorld);const ae=P.distanceTo(z),Re=te.projectionMatrix.elements,Le=le.projectionMatrix.elements,Ie=Re[14]/(Re[10]-1),Y=Re[14]/(Re[10]+1),Q=(Re[9]+1)/Re[5],ue=(Re[9]-1)/Re[5],U=(Re[8]-1)/Re[0],Ne=(Le[8]+1)/Le[0],Ue=Ie*U,Oe=Ie*Ne,Se=ae/(-U+Ne),Ee=Se*-U;if(te.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(Ee),X.translateZ(Se),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Re[10]===-1)X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse);else{const me=Ie+Se,A=Y+Se,E=Ue-Ee,$=Oe+(ae-Ee),ee=Q*Y/A*me,se=ue*Y/A*me;X.projectionMatrix.makePerspective(E,$,ee,se,me,A),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function F(X,te){te===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(te.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let te=X.near,le=X.far;v.texture!==null&&(v.depthNear>0&&(te=v.depthNear),v.depthFar>0&&(le=v.depthFar)),M.near=D.near=R.near=te,M.far=D.far=R.far=le,(I!==M.near||W!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,W=M.far),R.layers.mask=X.layers.mask|2,D.layers.mask=X.layers.mask|4,M.layers.mask=R.layers.mask|D.layers.mask;const ae=X.parent,Re=M.cameras;F(M,ae);for(let Le=0;Le<Re.length;Le++)F(Re[Le],ae);Re.length===2?B(M,R,D):M.projectionMatrix.copy(R.projectionMatrix),k(X,M,ae)};function k(X,te,le){le===null?X.matrix.copy(te.matrixWorld):(X.matrix.copy(le.matrixWorld),X.matrix.invert(),X.matrix.multiply(te.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(te.projectionMatrix),X.projectionMatrixInverse.copy(te.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=Ga*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(X){c=X,f!==null&&(f.fixedFoveation=X),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(M)};let Z=null;function he(X,te){if(h=te.getViewerPose(l||o),g=te,h!==null){const le=h.views;m!==null&&(e.setRenderTargetFramebuffer(_,m.framebuffer),e.setRenderTarget(_));let ae=!1;le.length!==M.cameras.length&&(M.cameras.length=0,ae=!0);for(let Le=0;Le<le.length;Le++){const Ie=le[Le];let Y=null;if(m!==null)Y=m.getViewport(Ie);else{const ue=u.getViewSubImage(f,Ie);Y=ue.viewport,Le===0&&(e.setRenderTargetTextures(_,ue.colorTexture,f.ignoreDepthValues?void 0:ue.depthStencilTexture),e.setRenderTarget(_))}let Q=w[Le];Q===void 0&&(Q=new Ot,Q.layers.enable(Le),Q.viewport=new st,w[Le]=Q),Q.matrix.fromArray(Ie.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(Ie.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Y.x,Y.y,Y.width,Y.height),Le===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),ae===!0&&M.cameras.push(Q)}const Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")){const Le=u.getDepthInformation(le[0]);Le&&Le.isValid&&Le.texture&&v.init(e,Le,s.renderState)}}for(let le=0;le<y.length;le++){const ae=x[le],Re=y[le];ae!==null&&Re!==void 0&&Re.update(ae,te,l||o)}Z&&Z(X,te),te.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:te}),g=null}const Me=new Nu;Me.setAnimationLoop(he),this.setAnimationLoop=function(X){Z=X},this.dispose=function(){}}}const ni=new qt,Yv=new ct;function jv(n,e){function t(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,Du(n)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function s(p,d,_,y,x){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(p,d):d.isMeshToonMaterial?(r(p,d),u(p,d)):d.isMeshPhongMaterial?(r(p,d),h(p,d)):d.isMeshStandardMaterial?(r(p,d),f(p,d),d.isMeshPhysicalMaterial&&m(p,d,x)):d.isMeshMatcapMaterial?(r(p,d),g(p,d)):d.isMeshDepthMaterial?r(p,d):d.isMeshDistanceMaterial?(r(p,d),v(p,d)):d.isMeshNormalMaterial?r(p,d):d.isLineBasicMaterial?(o(p,d),d.isLineDashedMaterial&&a(p,d)):d.isPointsMaterial?c(p,d,_,y):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,t(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===At&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,t(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===At&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,t(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,t(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,t(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const _=e.get(d),y=_.envMap,x=_.envMapRotation;y&&(p.envMap.value=y,ni.copy(x),ni.x*=-1,ni.y*=-1,ni.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ni.y*=-1,ni.z*=-1),p.envMapRotation.value.setFromMatrix4(Yv.makeRotationFromEuler(ni)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,t(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,t(d.aoMap,p.aoMapTransform))}function o(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform))}function a(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,_,y){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*_,p.scale.value=y*.5,d.map&&(p.map.value=d.map,t(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,t(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,t(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function u(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function f(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,t(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,t(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,_){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,t(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,t(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,t(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,t(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,t(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===At&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,t(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,t(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=_.texture,p.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,t(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,t(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,t(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,t(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,t(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function v(p,d){const _=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(_.matrixWorld),p.nearDistance.value=_.shadow.camera.near,p.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Kv(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function c(_,y){const x=y.program;i.uniformBlockBinding(_,x)}function l(_,y){let x=s[_.id];x===void 0&&(g(_),x=h(_),s[_.id]=x,_.addEventListener("dispose",p));const C=y.program;i.updateUBOMapping(_,C);const b=e.render.frame;r[_.id]!==b&&(f(_),r[_.id]=b)}function h(_){const y=u();_.__bindingPointIndex=y;const x=n.createBuffer(),C=_.__size,b=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,C,b),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,x),x}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){const y=s[_.id],x=_.uniforms,C=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let b=0,R=x.length;b<R;b++){const D=Array.isArray(x[b])?x[b]:[x[b]];for(let w=0,M=D.length;w<M;w++){const I=D[w];if(m(I,b,w,C)===!0){const W=I.__offset,S=Array.isArray(I.value)?I.value:[I.value];let L=0;for(let N=0;N<S.length;N++){const P=S[N],z=v(P);typeof P=="number"||typeof P=="boolean"?(I.__data[0]=P,n.bufferSubData(n.UNIFORM_BUFFER,W+L,I.__data)):P.isMatrix3?(I.__data[0]=P.elements[0],I.__data[1]=P.elements[1],I.__data[2]=P.elements[2],I.__data[3]=0,I.__data[4]=P.elements[3],I.__data[5]=P.elements[4],I.__data[6]=P.elements[5],I.__data[7]=0,I.__data[8]=P.elements[6],I.__data[9]=P.elements[7],I.__data[10]=P.elements[8],I.__data[11]=0):(P.toArray(I.__data,L),L+=z.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,W,I.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function m(_,y,x,C){const b=_.value,R=y+"_"+x;if(C[R]===void 0)return typeof b=="number"||typeof b=="boolean"?C[R]=b:C[R]=b.clone(),!0;{const D=C[R];if(typeof b=="number"||typeof b=="boolean"){if(D!==b)return C[R]=b,!0}else if(D.equals(b)===!1)return D.copy(b),!0}return!1}function g(_){const y=_.uniforms;let x=0;const C=16;for(let R=0,D=y.length;R<D;R++){const w=Array.isArray(y[R])?y[R]:[y[R]];for(let M=0,I=w.length;M<I;M++){const W=w[M],S=Array.isArray(W.value)?W.value:[W.value];for(let L=0,N=S.length;L<N;L++){const P=S[L],z=v(P),B=x%C,F=B%z.boundary,k=B+F;x+=F,k!==0&&C-k<z.storage&&(x+=C-k),W.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=x,x+=z.storage}}}const b=x%C;return b>0&&(x+=C-b),_.__size=x,_.__cache={},this}function v(_){const y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function p(_){const y=_.target;y.removeEventListener("dispose",p);const x=o.indexOf(y.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function d(){for(const _ in s)n.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}class Zv{constructor(e={}){const{canvas:t=kp(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:f=!1}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=o;const g=new Uint32Array(4),v=new Int32Array(4);let p=null,d=null;const _=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Vt,this.toneMapping=qn,this.toneMappingExposure=1;const x=this;let C=!1,b=0,R=0,D=null,w=-1,M=null;const I=new st,W=new st;let S=null;const L=new qe(0);let N=0,P=t.width,z=t.height,B=1,F=null,k=null;const Z=new st(0,0,P,z),he=new st(0,0,P,z);let Me=!1;const X=new cc;let te=!1,le=!1;const ae=new ct,Re=new ct,Le=new O,Ie=new st,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Q=!1;function ue(){return D===null?B:1}let U=i;function Ne(T,H){return t.getContext(T,H)}try{const T={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${tc}`),t.addEventListener("webglcontextlost",ne,!1),t.addEventListener("webglcontextrestored",ye,!1),t.addEventListener("webglcontextcreationerror",_e,!1),U===null){const H="webgl2";if(U=Ne(H,T),U===null)throw Ne(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(T){throw console.error("THREE.WebGLRenderer: "+T.message),T}let Ue,Oe,Se,Ee,me,A,E,$,ee,se,q,oe,ie,de,Pe,re,fe,De,Fe,xe,$e,ze,et,V;function ge(){Ue=new n_(U),Ue.init(),ze=new Vv(U,Ue),Oe=new K0(U,Ue,e,ze),Se=new Bv(U,Ue),Oe.reverseDepthBuffer&&f&&Se.buffers.depth.setReversed(!0),Ee=new r_(U),me=new Ev,A=new zv(U,Ue,Se,me,Oe,ze,Ee),E=new J0(x),$=new t_(x),ee=new dm(U),et=new Y0(U,ee),se=new i_(U,ee,Ee,et),q=new a_(U,se,ee,Ee),Fe=new o_(U,Oe,A),re=new Z0(me),oe=new Sv(x,E,$,Ue,Oe,et,re),ie=new jv(x,me),de=new Tv,Pe=new Lv(Ue),De=new $0(x,E,$,Se,q,m,c),fe=new Fv(x,q,Oe),V=new Kv(U,Ee,Oe,Se),xe=new j0(U,Ue,Ee),$e=new s_(U,Ue,Ee),Ee.programs=oe.programs,x.capabilities=Oe,x.extensions=Ue,x.properties=me,x.renderLists=de,x.shadowMap=fe,x.state=Se,x.info=Ee}ge();const J=new $v(x,U);this.xr=J,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const T=Ue.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=Ue.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(T){T!==void 0&&(B=T,this.setSize(P,z,!1))},this.getSize=function(T){return T.set(P,z)},this.setSize=function(T,H,j=!0){if(J.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}P=T,z=H,t.width=Math.floor(T*B),t.height=Math.floor(H*B),j===!0&&(t.style.width=T+"px",t.style.height=H+"px"),this.setViewport(0,0,T,H)},this.getDrawingBufferSize=function(T){return T.set(P*B,z*B).floor()},this.setDrawingBufferSize=function(T,H,j){P=T,z=H,B=j,t.width=Math.floor(T*j),t.height=Math.floor(H*j),this.setViewport(0,0,T,H)},this.getCurrentViewport=function(T){return T.copy(I)},this.getViewport=function(T){return T.copy(Z)},this.setViewport=function(T,H,j,K){T.isVector4?Z.set(T.x,T.y,T.z,T.w):Z.set(T,H,j,K),Se.viewport(I.copy(Z).multiplyScalar(B).round())},this.getScissor=function(T){return T.copy(he)},this.setScissor=function(T,H,j,K){T.isVector4?he.set(T.x,T.y,T.z,T.w):he.set(T,H,j,K),Se.scissor(W.copy(he).multiplyScalar(B).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(T){Se.setScissorTest(Me=T)},this.setOpaqueSort=function(T){F=T},this.setTransparentSort=function(T){k=T},this.getClearColor=function(T){return T.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor.apply(De,arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha.apply(De,arguments)},this.clear=function(T=!0,H=!0,j=!0){let K=0;if(T){let G=!1;if(D!==null){const ce=D.texture.format;G=ce===ac||ce===oc||ce===rc}if(G){const ce=D.texture.type,ve=ce===Cn||ce===pi||ce===Ns||ce===es||ce===ic||ce===sc,we=De.getClearColor(),Te=De.getClearAlpha(),Be=we.r,He=we.g,be=we.b;ve?(g[0]=Be,g[1]=He,g[2]=be,g[3]=Te,U.clearBufferuiv(U.COLOR,0,g)):(v[0]=Be,v[1]=He,v[2]=be,v[3]=Te,U.clearBufferiv(U.COLOR,0,v))}else K|=U.COLOR_BUFFER_BIT}H&&(K|=U.DEPTH_BUFFER_BIT),j&&(K|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ne,!1),t.removeEventListener("webglcontextrestored",ye,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),de.dispose(),Pe.dispose(),me.dispose(),E.dispose(),$.dispose(),q.dispose(),et.dispose(),V.dispose(),oe.dispose(),J.dispose(),J.removeEventListener("sessionstart",pc),J.removeEventListener("sessionend",mc),Kn.stop()};function ne(T){T.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ye(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const T=Ee.autoReset,H=fe.enabled,j=fe.autoUpdate,K=fe.needsUpdate,G=fe.type;ge(),Ee.autoReset=T,fe.enabled=H,fe.autoUpdate=j,fe.needsUpdate=K,fe.type=G}function _e(T){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function Ve(T){const H=T.target;H.removeEventListener("dispose",Ve),lt(H)}function lt(T){yt(T),me.remove(T)}function yt(T){const H=me.get(T).programs;H!==void 0&&(H.forEach(function(j){oe.releaseProgram(j)}),T.isShaderMaterial&&oe.releaseShaderCache(T))}this.renderBufferDirect=function(T,H,j,K,G,ce){H===null&&(H=Y);const ve=G.isMesh&&G.matrixWorld.determinant()<0,we=Xu(T,H,j,K,G);Se.setMaterial(K,ve);let Te=j.index,Be=1;if(K.wireframe===!0){if(Te=se.getWireframeAttribute(j),Te===void 0)return;Be=2}const He=j.drawRange,be=j.attributes.position;let Ke=He.start*Be,rt=(He.start+He.count)*Be;ce!==null&&(Ke=Math.max(Ke,ce.start*Be),rt=Math.min(rt,(ce.start+ce.count)*Be)),Te!==null?(Ke=Math.max(Ke,0),rt=Math.min(rt,Te.count)):be!=null&&(Ke=Math.max(Ke,0),rt=Math.min(rt,be.count));const ot=rt-Ke;if(ot<0||ot===1/0)return;et.setup(G,K,we,j,Te);let Pt,Ze=xe;if(Te!==null&&(Pt=ee.get(Te),Ze=$e,Ze.setIndex(Pt)),G.isMesh)K.wireframe===!0?(Se.setLineWidth(K.wireframeLinewidth*ue()),Ze.setMode(U.LINES)):Ze.setMode(U.TRIANGLES);else if(G.isLine){let Ce=K.linewidth;Ce===void 0&&(Ce=1),Se.setLineWidth(Ce*ue()),G.isLineSegments?Ze.setMode(U.LINES):G.isLineLoop?Ze.setMode(U.LINE_LOOP):Ze.setMode(U.LINE_STRIP)}else G.isPoints?Ze.setMode(U.POINTS):G.isSprite&&Ze.setMode(U.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Ze.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))Ze.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const Ce=G._multiDrawStarts,fn=G._multiDrawCounts,Je=G._multiDrawCount,Yt=Te?ee.get(Te).bytesPerElement:1,Mi=me.get(K).currentProgram.getUniforms();for(let Dt=0;Dt<Je;Dt++)Mi.setValue(U,"_gl_DrawID",Dt),Ze.render(Ce[Dt]/Yt,fn[Dt])}else if(G.isInstancedMesh)Ze.renderInstances(Ke,ot,G.count);else if(j.isInstancedBufferGeometry){const Ce=j._maxInstanceCount!==void 0?j._maxInstanceCount:1/0,fn=Math.min(j.instanceCount,Ce);Ze.renderInstances(Ke,ot,fn)}else Ze.render(Ke,ot)};function tt(T,H,j){T.transparent===!0&&T.side===on&&T.forceSinglePass===!1?(T.side=At,T.needsUpdate=!0,Xs(T,H,j),T.side=Gt,T.needsUpdate=!0,Xs(T,H,j),T.side=on):Xs(T,H,j)}this.compile=function(T,H,j=null){j===null&&(j=T),d=Pe.get(j),d.init(H),y.push(d),j.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),T!==j&&T.traverseVisible(function(G){G.isLight&&G.layers.test(H.layers)&&(d.pushLight(G),G.castShadow&&d.pushShadow(G))}),d.setupLights();const K=new Set;return T.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const ce=G.material;if(ce)if(Array.isArray(ce))for(let ve=0;ve<ce.length;ve++){const we=ce[ve];tt(we,j,G),K.add(we)}else tt(ce,j,G),K.add(ce)}),y.pop(),d=null,K},this.compileAsync=function(T,H,j=null){const K=this.compile(T,H,j);return new Promise(G=>{function ce(){if(K.forEach(function(ve){me.get(ve).currentProgram.isReady()&&K.delete(ve)}),K.size===0){G(T);return}setTimeout(ce,10)}Ue.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let $t=null;function dn(T){$t&&$t(T)}function pc(){Kn.stop()}function mc(){Kn.start()}const Kn=new Nu;Kn.setAnimationLoop(dn),typeof self<"u"&&Kn.setContext(self),this.setAnimationLoop=function(T){$t=T,J.setAnimationLoop(T),T===null?Kn.stop():Kn.start()},J.addEventListener("sessionstart",pc),J.addEventListener("sessionend",mc),this.render=function(T,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),J.enabled===!0&&J.isPresenting===!0&&(J.cameraAutoUpdate===!0&&J.updateCamera(H),H=J.getCamera()),T.isScene===!0&&T.onBeforeRender(x,T,H,D),d=Pe.get(T,y.length),d.init(H),y.push(d),Re.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),X.setFromProjectionMatrix(Re),le=this.localClippingEnabled,te=re.init(this.clippingPlanes,le),p=de.get(T,_.length),p.init(),_.push(p),J.enabled===!0&&J.isPresenting===!0){const ce=x.xr.getDepthSensingMesh();ce!==null&&Jr(ce,H,-1/0,x.sortObjects)}Jr(T,H,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(F,k),Q=J.enabled===!1||J.isPresenting===!1||J.hasDepthSensing()===!1,Q&&De.addToRenderList(p,T),this.info.render.frame++,te===!0&&re.beginShadows();const j=d.state.shadowsArray;fe.render(j,T,H),te===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();const K=p.opaque,G=p.transmissive;if(d.setupLights(),H.isArrayCamera){const ce=H.cameras;if(G.length>0)for(let ve=0,we=ce.length;ve<we;ve++){const Te=ce[ve];_c(K,G,T,Te)}Q&&De.render(T);for(let ve=0,we=ce.length;ve<we;ve++){const Te=ce[ve];gc(p,T,Te,Te.viewport)}}else G.length>0&&_c(K,G,T,H),Q&&De.render(T),gc(p,T,H);D!==null&&(A.updateMultisampleRenderTarget(D),A.updateRenderTargetMipmap(D)),T.isScene===!0&&T.onAfterRender(x,T,H),et.resetDefaultState(),w=-1,M=null,y.pop(),y.length>0?(d=y[y.length-1],te===!0&&re.setGlobalState(x.clippingPlanes,d.state.camera)):d=null,_.pop(),_.length>0?p=_[_.length-1]:p=null};function Jr(T,H,j,K){if(T.visible===!1)return;if(T.layers.test(H.layers)){if(T.isGroup)j=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(H);else if(T.isLight)d.pushLight(T),T.castShadow&&d.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||X.intersectsSprite(T)){K&&Ie.setFromMatrixPosition(T.matrixWorld).applyMatrix4(Re);const ve=q.update(T),we=T.material;we.visible&&p.push(T,ve,we,j,Ie.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||X.intersectsObject(T))){const ve=q.update(T),we=T.material;if(K&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),Ie.copy(T.boundingSphere.center)):(ve.boundingSphere===null&&ve.computeBoundingSphere(),Ie.copy(ve.boundingSphere.center)),Ie.applyMatrix4(T.matrixWorld).applyMatrix4(Re)),Array.isArray(we)){const Te=ve.groups;for(let Be=0,He=Te.length;Be<He;Be++){const be=Te[Be],Ke=we[be.materialIndex];Ke&&Ke.visible&&p.push(T,ve,Ke,j,Ie.z,be)}}else we.visible&&p.push(T,ve,we,j,Ie.z,null)}}const ce=T.children;for(let ve=0,we=ce.length;ve<we;ve++)Jr(ce[ve],H,j,K)}function gc(T,H,j,K){const G=T.opaque,ce=T.transmissive,ve=T.transparent;d.setupLightsView(j),te===!0&&re.setGlobalState(x.clippingPlanes,j),K&&Se.viewport(I.copy(K)),G.length>0&&Ws(G,H,j),ce.length>0&&Ws(ce,H,j),ve.length>0&&Ws(ve,H,j),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function _c(T,H,j,K){if((j.isScene===!0?j.overrideMaterial:null)!==null)return;d.state.transmissionRenderTarget[K.id]===void 0&&(d.state.transmissionRenderTarget[K.id]=new mi(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?zs:Cn,minFilter:hi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:je.workingColorSpace}));const ce=d.state.transmissionRenderTarget[K.id],ve=K.viewport||I;ce.setSize(ve.z,ve.w);const we=x.getRenderTarget();x.setRenderTarget(ce),x.getClearColor(L),N=x.getClearAlpha(),N<1&&x.setClearColor(16777215,.5),x.clear(),Q&&De.render(j);const Te=x.toneMapping;x.toneMapping=qn;const Be=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),d.setupLightsView(K),te===!0&&re.setGlobalState(x.clippingPlanes,K),Ws(T,j,K),A.updateMultisampleRenderTarget(ce),A.updateRenderTargetMipmap(ce),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let He=!1;for(let be=0,Ke=H.length;be<Ke;be++){const rt=H[be],ot=rt.object,Pt=rt.geometry,Ze=rt.material,Ce=rt.group;if(Ze.side===on&&ot.layers.test(K.layers)){const fn=Ze.side;Ze.side=At,Ze.needsUpdate=!0,vc(ot,j,K,Pt,Ze,Ce),Ze.side=fn,Ze.needsUpdate=!0,He=!0}}He===!0&&(A.updateMultisampleRenderTarget(ce),A.updateRenderTargetMipmap(ce))}x.setRenderTarget(we),x.setClearColor(L,N),Be!==void 0&&(K.viewport=Be),x.toneMapping=Te}function Ws(T,H,j){const K=H.isScene===!0?H.overrideMaterial:null;for(let G=0,ce=T.length;G<ce;G++){const ve=T[G],we=ve.object,Te=ve.geometry,Be=K===null?ve.material:K,He=ve.group;we.layers.test(j.layers)&&vc(we,H,j,Te,Be,He)}}function vc(T,H,j,K,G,ce){T.onBeforeRender(x,H,j,K,G,ce),T.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),G.onBeforeRender(x,H,j,K,T,ce),G.transparent===!0&&G.side===on&&G.forceSinglePass===!1?(G.side=At,G.needsUpdate=!0,x.renderBufferDirect(j,H,K,G,T,ce),G.side=Gt,G.needsUpdate=!0,x.renderBufferDirect(j,H,K,G,T,ce),G.side=on):x.renderBufferDirect(j,H,K,G,T,ce),T.onAfterRender(x,H,j,K,G,ce)}function Xs(T,H,j){H.isScene!==!0&&(H=Y);const K=me.get(T),G=d.state.lights,ce=d.state.shadowsArray,ve=G.state.version,we=oe.getParameters(T,G.state,ce,H,j),Te=oe.getProgramCacheKey(we);let Be=K.programs;K.environment=T.isMeshStandardMaterial?H.environment:null,K.fog=H.fog,K.envMap=(T.isMeshStandardMaterial?$:E).get(T.envMap||K.environment),K.envMapRotation=K.environment!==null&&T.envMap===null?H.environmentRotation:T.envMapRotation,Be===void 0&&(T.addEventListener("dispose",Ve),Be=new Map,K.programs=Be);let He=Be.get(Te);if(He!==void 0){if(K.currentProgram===He&&K.lightsStateVersion===ve)return xc(T,we),He}else we.uniforms=oe.getUniforms(T),T.onBeforeCompile(we,x),He=oe.acquireProgram(we,Te),Be.set(Te,He),K.uniforms=we.uniforms;const be=K.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(be.clippingPlanes=re.uniform),xc(T,we),K.needsLights=$u(T),K.lightsStateVersion=ve,K.needsLights&&(be.ambientLightColor.value=G.state.ambient,be.lightProbe.value=G.state.probe,be.directionalLights.value=G.state.directional,be.directionalLightShadows.value=G.state.directionalShadow,be.spotLights.value=G.state.spot,be.spotLightShadows.value=G.state.spotShadow,be.rectAreaLights.value=G.state.rectArea,be.ltc_1.value=G.state.rectAreaLTC1,be.ltc_2.value=G.state.rectAreaLTC2,be.pointLights.value=G.state.point,be.pointLightShadows.value=G.state.pointShadow,be.hemisphereLights.value=G.state.hemi,be.directionalShadowMap.value=G.state.directionalShadowMap,be.directionalShadowMatrix.value=G.state.directionalShadowMatrix,be.spotShadowMap.value=G.state.spotShadowMap,be.spotLightMatrix.value=G.state.spotLightMatrix,be.spotLightMap.value=G.state.spotLightMap,be.pointShadowMap.value=G.state.pointShadowMap,be.pointShadowMatrix.value=G.state.pointShadowMatrix),K.currentProgram=He,K.uniformsList=null,He}function yc(T){if(T.uniformsList===null){const H=T.currentProgram.getUniforms();T.uniformsList=Pr.seqWithValue(H.seq,T.uniforms)}return T.uniformsList}function xc(T,H){const j=me.get(T);j.outputColorSpace=H.outputColorSpace,j.batching=H.batching,j.batchingColor=H.batchingColor,j.instancing=H.instancing,j.instancingColor=H.instancingColor,j.instancingMorph=H.instancingMorph,j.skinning=H.skinning,j.morphTargets=H.morphTargets,j.morphNormals=H.morphNormals,j.morphColors=H.morphColors,j.morphTargetsCount=H.morphTargetsCount,j.numClippingPlanes=H.numClippingPlanes,j.numIntersection=H.numClipIntersection,j.vertexAlphas=H.vertexAlphas,j.vertexTangents=H.vertexTangents,j.toneMapping=H.toneMapping}function Xu(T,H,j,K,G){H.isScene!==!0&&(H=Y),A.resetTextureUnits();const ce=H.fog,ve=K.isMeshStandardMaterial?H.environment:null,we=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:is,Te=(K.isMeshStandardMaterial?$:E).get(K.envMap||ve),Be=K.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,He=!!j.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),be=!!j.morphAttributes.position,Ke=!!j.morphAttributes.normal,rt=!!j.morphAttributes.color;let ot=qn;K.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(ot=x.toneMapping);const Pt=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,Ze=Pt!==void 0?Pt.length:0,Ce=me.get(K),fn=d.state.lights;if(te===!0&&(le===!0||T!==M)){const kt=T===M&&K.id===w;re.setState(K,T,kt)}let Je=!1;K.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==fn.state.version||Ce.outputColorSpace!==we||G.isBatchedMesh&&Ce.batching===!1||!G.isBatchedMesh&&Ce.batching===!0||G.isBatchedMesh&&Ce.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Ce.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Ce.instancing===!1||!G.isInstancedMesh&&Ce.instancing===!0||G.isSkinnedMesh&&Ce.skinning===!1||!G.isSkinnedMesh&&Ce.skinning===!0||G.isInstancedMesh&&Ce.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ce.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Ce.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Ce.instancingMorph===!1&&G.morphTexture!==null||Ce.envMap!==Te||K.fog===!0&&Ce.fog!==ce||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==re.numPlanes||Ce.numIntersection!==re.numIntersection)||Ce.vertexAlphas!==Be||Ce.vertexTangents!==He||Ce.morphTargets!==be||Ce.morphNormals!==Ke||Ce.morphColors!==rt||Ce.toneMapping!==ot||Ce.morphTargetsCount!==Ze)&&(Je=!0):(Je=!0,Ce.__version=K.version);let Yt=Ce.currentProgram;Je===!0&&(Yt=Xs(K,H,G));let Mi=!1,Dt=!1,os=!1;const at=Yt.getUniforms(),sn=Ce.uniforms;if(Se.useProgram(Yt.program)&&(Mi=!0,Dt=!0,os=!0),K.id!==w&&(w=K.id,Dt=!0),Mi||M!==T){Se.buffers.depth.getReversed()?(ae.copy(T.projectionMatrix),Vp(ae),Hp(ae),at.setValue(U,"projectionMatrix",ae)):at.setValue(U,"projectionMatrix",T.projectionMatrix),at.setValue(U,"viewMatrix",T.matrixWorldInverse);const Pn=at.map.cameraPosition;Pn!==void 0&&Pn.setValue(U,Le.setFromMatrixPosition(T.matrixWorld)),Oe.logarithmicDepthBuffer&&at.setValue(U,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&at.setValue(U,"isOrthographic",T.isOrthographicCamera===!0),M!==T&&(M=T,Dt=!0,os=!0)}if(G.isSkinnedMesh){at.setOptional(U,G,"bindMatrix"),at.setOptional(U,G,"bindMatrixInverse");const kt=G.skeleton;kt&&(kt.boneTexture===null&&kt.computeBoneTexture(),at.setValue(U,"boneTexture",kt.boneTexture,A))}G.isBatchedMesh&&(at.setOptional(U,G,"batchingTexture"),at.setValue(U,"batchingTexture",G._matricesTexture,A),at.setOptional(U,G,"batchingIdTexture"),at.setValue(U,"batchingIdTexture",G._indirectTexture,A),at.setOptional(U,G,"batchingColorTexture"),G._colorsTexture!==null&&at.setValue(U,"batchingColorTexture",G._colorsTexture,A));const as=j.morphAttributes;if((as.position!==void 0||as.normal!==void 0||as.color!==void 0)&&Fe.update(G,j,Yt),(Dt||Ce.receiveShadow!==G.receiveShadow)&&(Ce.receiveShadow=G.receiveShadow,at.setValue(U,"receiveShadow",G.receiveShadow)),K.isMeshGouraudMaterial&&K.envMap!==null&&(sn.envMap.value=Te,sn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),K.isMeshStandardMaterial&&K.envMap===null&&H.environment!==null&&(sn.envMapIntensity.value=H.environmentIntensity),Dt&&(at.setValue(U,"toneMappingExposure",x.toneMappingExposure),Ce.needsLights&&qu(sn,os),ce&&K.fog===!0&&ie.refreshFogUniforms(sn,ce),ie.refreshMaterialUniforms(sn,K,B,z,d.state.transmissionRenderTarget[T.id]),Pr.upload(U,yc(Ce),sn,A)),K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(Pr.upload(U,yc(Ce),sn,A),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&at.setValue(U,"center",G.center),at.setValue(U,"modelViewMatrix",G.modelViewMatrix),at.setValue(U,"normalMatrix",G.normalMatrix),at.setValue(U,"modelMatrix",G.matrixWorld),K.isShaderMaterial||K.isRawShaderMaterial){const kt=K.uniformsGroups;for(let Pn=0,Ln=kt.length;Pn<Ln;Pn++){const Mc=kt[Pn];V.update(Mc,Yt),V.bind(Mc,Yt)}}return Yt}function qu(T,H){T.ambientLightColor.needsUpdate=H,T.lightProbe.needsUpdate=H,T.directionalLights.needsUpdate=H,T.directionalLightShadows.needsUpdate=H,T.pointLights.needsUpdate=H,T.pointLightShadows.needsUpdate=H,T.spotLights.needsUpdate=H,T.spotLightShadows.needsUpdate=H,T.rectAreaLights.needsUpdate=H,T.hemisphereLights.needsUpdate=H}function $u(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return b},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(T,H,j){me.get(T.texture).__webglTexture=H,me.get(T.depthTexture).__webglTexture=j;const K=me.get(T);K.__hasExternalTextures=!0,K.__autoAllocateDepthBuffer=j===void 0,K.__autoAllocateDepthBuffer||Ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),K.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(T,H){const j=me.get(T);j.__webglFramebuffer=H,j.__useDefaultFramebuffer=H===void 0},this.setRenderTarget=function(T,H=0,j=0){D=T,b=H,R=j;let K=!0,G=null,ce=!1,ve=!1;if(T){const Te=me.get(T);if(Te.__useDefaultFramebuffer!==void 0)Se.bindFramebuffer(U.FRAMEBUFFER,null),K=!1;else if(Te.__webglFramebuffer===void 0)A.setupRenderTarget(T);else if(Te.__hasExternalTextures)A.rebindTextures(T,me.get(T.texture).__webglTexture,me.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const be=T.depthTexture;if(Te.__boundDepthTexture!==be){if(be!==null&&me.has(be)&&(T.width!==be.image.width||T.height!==be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");A.setupDepthRenderbuffer(T)}}const Be=T.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ve=!0);const He=me.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(He[H])?G=He[H][j]:G=He[H],ce=!0):T.samples>0&&A.useMultisampledRTT(T)===!1?G=me.get(T).__webglMultisampledFramebuffer:Array.isArray(He)?G=He[j]:G=He,I.copy(T.viewport),W.copy(T.scissor),S=T.scissorTest}else I.copy(Z).multiplyScalar(B).floor(),W.copy(he).multiplyScalar(B).floor(),S=Me;if(Se.bindFramebuffer(U.FRAMEBUFFER,G)&&K&&Se.drawBuffers(T,G),Se.viewport(I),Se.scissor(W),Se.setScissorTest(S),ce){const Te=me.get(T.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+H,Te.__webglTexture,j)}else if(ve){const Te=me.get(T.texture),Be=H||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Te.__webglTexture,j||0,Be)}w=-1},this.readRenderTargetPixels=function(T,H,j,K,G,ce,ve){if(!(T&&T.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){Se.bindFramebuffer(U.FRAMEBUFFER,we);try{const Te=T.texture,Be=Te.format,He=Te.type;if(!Oe.textureFormatReadable(Be)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Oe.textureTypeReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=T.width-K&&j>=0&&j<=T.height-G&&U.readPixels(H,j,K,G,ze.convert(Be),ze.convert(He),ce)}finally{const Te=D!==null?me.get(D).__webglFramebuffer:null;Se.bindFramebuffer(U.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(T,H,j,K,G,ce,ve){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=me.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&ve!==void 0&&(we=we[ve]),we){const Te=T.texture,Be=Te.format,He=Te.type;if(!Oe.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Oe.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=T.width-K&&j>=0&&j<=T.height-G){Se.bindFramebuffer(U.FRAMEBUFFER,we);const be=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,be),U.bufferData(U.PIXEL_PACK_BUFFER,ce.byteLength,U.STREAM_READ),U.readPixels(H,j,K,G,ze.convert(Be),ze.convert(He),0);const Ke=D!==null?me.get(D).__webglFramebuffer:null;Se.bindFramebuffer(U.FRAMEBUFFER,Ke);const rt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await zp(U,rt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,be),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,ce),U.deleteBuffer(be),U.deleteSync(rt),ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(T,H=null,j=0){T.isTexture!==!0&&(Ss("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,T=arguments[1]);const K=Math.pow(2,-j),G=Math.floor(T.image.width*K),ce=Math.floor(T.image.height*K),ve=H!==null?H.x:0,we=H!==null?H.y:0;A.setTexture2D(T,0),U.copyTexSubImage2D(U.TEXTURE_2D,j,0,0,ve,we,G,ce),Se.unbindTexture()},this.copyTextureToTexture=function(T,H,j=null,K=null,G=0){T.isTexture!==!0&&(Ss("WebGLRenderer: copyTextureToTexture function signature has changed."),K=arguments[0]||null,T=arguments[1],H=arguments[2],G=arguments[3]||0,j=null);let ce,ve,we,Te,Be,He,be,Ke,rt;const ot=T.isCompressedTexture?T.mipmaps[G]:T.image;j!==null?(ce=j.max.x-j.min.x,ve=j.max.y-j.min.y,we=j.isBox3?j.max.z-j.min.z:1,Te=j.min.x,Be=j.min.y,He=j.isBox3?j.min.z:0):(ce=ot.width,ve=ot.height,we=ot.depth||1,Te=0,Be=0,He=0),K!==null?(be=K.x,Ke=K.y,rt=K.z):(be=0,Ke=0,rt=0);const Pt=ze.convert(H.format),Ze=ze.convert(H.type);let Ce;H.isData3DTexture?(A.setTexture3D(H,0),Ce=U.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(A.setTexture2DArray(H,0),Ce=U.TEXTURE_2D_ARRAY):(A.setTexture2D(H,0),Ce=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,H.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,H.unpackAlignment);const fn=U.getParameter(U.UNPACK_ROW_LENGTH),Je=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Yt=U.getParameter(U.UNPACK_SKIP_PIXELS),Mi=U.getParameter(U.UNPACK_SKIP_ROWS),Dt=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,ot.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ot.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Te),U.pixelStorei(U.UNPACK_SKIP_ROWS,Be),U.pixelStorei(U.UNPACK_SKIP_IMAGES,He);const os=T.isDataArrayTexture||T.isData3DTexture,at=H.isDataArrayTexture||H.isData3DTexture;if(T.isRenderTargetTexture||T.isDepthTexture){const sn=me.get(T),as=me.get(H),kt=me.get(sn.__renderTarget),Pn=me.get(as.__renderTarget);Se.bindFramebuffer(U.READ_FRAMEBUFFER,kt.__webglFramebuffer),Se.bindFramebuffer(U.DRAW_FRAMEBUFFER,Pn.__webglFramebuffer);for(let Ln=0;Ln<we;Ln++)os&&U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,me.get(T).__webglTexture,G,He+Ln),T.isDepthTexture?(at&&U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,me.get(H).__webglTexture,G,rt+Ln),U.blitFramebuffer(Te,Be,ce,ve,be,Ke,ce,ve,U.DEPTH_BUFFER_BIT,U.NEAREST)):at?U.copyTexSubImage3D(Ce,G,be,Ke,rt+Ln,Te,Be,ce,ve):U.copyTexSubImage2D(Ce,G,be,Ke,rt+Ln,Te,Be,ce,ve);Se.bindFramebuffer(U.READ_FRAMEBUFFER,null),Se.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else at?T.isDataTexture||T.isData3DTexture?U.texSubImage3D(Ce,G,be,Ke,rt,ce,ve,we,Pt,Ze,ot.data):H.isCompressedArrayTexture?U.compressedTexSubImage3D(Ce,G,be,Ke,rt,ce,ve,we,Pt,ot.data):U.texSubImage3D(Ce,G,be,Ke,rt,ce,ve,we,Pt,Ze,ot):T.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,G,be,Ke,ce,ve,Pt,Ze,ot.data):T.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,G,be,Ke,ot.width,ot.height,Pt,ot.data):U.texSubImage2D(U.TEXTURE_2D,G,be,Ke,ce,ve,Pt,Ze,ot);U.pixelStorei(U.UNPACK_ROW_LENGTH,fn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Je),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Yt),U.pixelStorei(U.UNPACK_SKIP_ROWS,Mi),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Dt),G===0&&H.generateMipmaps&&U.generateMipmap(Ce),Se.unbindTexture()},this.copyTextureToTexture3D=function(T,H,j=null,K=null,G=0){return T.isTexture!==!0&&(Ss("WebGLRenderer: copyTextureToTexture3D function signature has changed."),j=arguments[0]||null,K=arguments[1]||null,T=arguments[2],H=arguments[3],G=arguments[4]||0),Ss('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(T,H,j,K,G)},this.initRenderTarget=function(T){me.get(T).__webglFramebuffer===void 0&&A.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?A.setTextureCube(T,0):T.isData3DTexture?A.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?A.setTexture2DArray(T,0):A.setTexture2D(T,0),Se.unbindTexture()},this.resetState=function(){b=0,R=0,D=null,Se.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorspace=je._getDrawingBufferColorSpace(e),t.unpackColorSpace=je._getUnpackColorSpace()}}class hc{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(e),this.density=t}clone(){return new hc(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Jv extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qt,this.environmentIntensity=1,this.environmentRotation=new qt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Qv{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ha,this.updateRanges=[],this.version=0,this.uuid=$n()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=$n()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wt=new O;class Or{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyMatrix4(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.applyNormalMatrix(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)wt.fromBufferAttribute(this,t),wt.transformDirection(e),this.setXYZ(t,wt.x,wt.y,wt.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=an(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=it(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=it(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=an(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=an(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=an(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=an(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array),s=it(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=it(t,this.array),i=it(i,this.array),s=it(s,this.array),r=it(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new dt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Or(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let i=0;i<this.count;i++){const s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Hu extends xi{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Oi;const gs=new O,Bi=new O,ki=new O,zi=new ke,_s=new ke,Gu=new ct,yr=new O,vs=new O,xr=new O,Jl=new ke,Ho=new ke,Ql=new ke;class ey extends ft{constructor(e=new Hu){if(super(),this.isSprite=!0,this.type="Sprite",Oi===void 0){Oi=new vt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new Qv(t,5);Oi.setIndex([0,1,2,0,2,3]),Oi.setAttribute("position",new Or(i,3,0,!1)),Oi.setAttribute("uv",new Or(i,2,3,!1))}this.geometry=Oi,this.material=e,this.center=new ke(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Bi.setFromMatrixScale(this.matrixWorld),Gu.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ki.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Bi.multiplyScalar(-ki.z);const i=this.material.rotation;let s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));const o=this.center;Mr(yr.set(-.5,-.5,0),ki,o,Bi,s,r),Mr(vs.set(.5,-.5,0),ki,o,Bi,s,r),Mr(xr.set(.5,.5,0),ki,o,Bi,s,r),Jl.set(0,0),Ho.set(1,0),Ql.set(1,1);let a=e.ray.intersectTriangle(yr,vs,xr,!1,gs);if(a===null&&(Mr(vs.set(-.5,.5,0),ki,o,Bi,s,r),Ho.set(0,1),a=e.ray.intersectTriangle(yr,xr,vs,!1,gs),a===null))return;const c=e.ray.origin.distanceTo(gs);c<e.near||c>e.far||t.push({distance:c,point:gs.clone(),uv:Ht.getInterpolation(gs,yr,vs,xr,Jl,Ho,Ql,new ke),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function Mr(n,e,t,i,s,r){zi.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(_s.x=r*zi.x-s*zi.y,_s.y=s*zi.x+r*zi.y):_s.copy(zi),n.copy(e),n.x+=_s.x,n.y+=_s.y,n.applyMatrix4(Gu)}class Fs extends xi{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const eh=new ct,Xa=new Au,Sr=new Hs,Er=new O;class Br extends ft{constructor(e=new vt,t=new Fs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Sr.copy(i.boundingSphere),Sr.applyMatrix4(s),Sr.radius+=r,e.ray.intersectsSphere(Sr)===!1)return;eh.copy(s).invert(),Xa.copy(e.ray).applyMatrix4(eh);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=i.index,u=i.attributes.position;if(l!==null){const f=Math.max(0,o.start),m=Math.min(l.count,o.start+o.count);for(let g=f,v=m;g<v;g++){const p=l.getX(g);Er.fromBufferAttribute(u,p),th(Er,p,c,s,e,t,this)}}else{const f=Math.max(0,o.start),m=Math.min(u.count,o.start+o.count);for(let g=f,v=m;g<v;g++)Er.fromBufferAttribute(u,g),th(Er,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function th(n,e,t,i,s,r,o){const a=Xa.distanceSqToPoint(n);if(a<t){const c=new O;Xa.closestPointToPoint(n,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class Yr extends Rt{constructor(e,t,i,s,r,o,a,c,l){super(e,t,i,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gi extends vt{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;s=Math.floor(s),r=Math.floor(r);const h=[],u=[],f=[],m=[];let g=0;const v=[],p=i/2;let d=0;_(),o===!1&&(e>0&&y(!0),t>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ht(u,3)),this.setAttribute("normal",new ht(f,3)),this.setAttribute("uv",new ht(m,2));function _(){const x=new O,C=new O;let b=0;const R=(t-e)/i;for(let D=0;D<=r;D++){const w=[],M=D/r,I=M*(t-e)+e;for(let W=0;W<=s;W++){const S=W/s,L=S*c+a,N=Math.sin(L),P=Math.cos(L);C.x=I*N,C.y=-M*i+p,C.z=I*P,u.push(C.x,C.y,C.z),x.set(N,R,P).normalize(),f.push(x.x,x.y,x.z),m.push(S,1-M),w.push(g++)}v.push(w)}for(let D=0;D<s;D++)for(let w=0;w<r;w++){const M=v[w][D],I=v[w+1][D],W=v[w+1][D+1],S=v[w][D+1];(e>0||w!==0)&&(h.push(M,I,S),b+=3),(t>0||w!==r-1)&&(h.push(I,W,S),b+=3)}l.addGroup(d,b,0),d+=b}function y(x){const C=g,b=new ke,R=new O;let D=0;const w=x===!0?e:t,M=x===!0?1:-1;for(let W=1;W<=s;W++)u.push(0,p*M,0),f.push(0,M,0),m.push(.5,.5),g++;const I=g;for(let W=0;W<=s;W++){const L=W/s*c+a,N=Math.cos(L),P=Math.sin(L);R.x=w*P,R.y=p*M,R.z=w*N,u.push(R.x,R.y,R.z),f.push(0,M,0),b.x=N*.5+.5,b.y=P*.5*M+.5,m.push(b.x,b.y),g++}for(let W=0;W<s;W++){const S=C+W,L=I+W;x===!0?h.push(L,L+1,S):h.push(L+1,L,S),D+=3}l.addGroup(d,D,x===!0?1:2),d+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Xi extends gi{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Xi(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class jr extends vt{constructor(e=[],t=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:i,detail:s};const r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new ht(r,3)),this.setAttribute("normal",new ht(r.slice(),3)),this.setAttribute("uv",new ht(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){const y=new O,x=new O,C=new O;for(let b=0;b<t.length;b+=3)m(t[b+0],y),m(t[b+1],x),m(t[b+2],C),c(y,x,C,_)}function c(_,y,x,C){const b=C+1,R=[];for(let D=0;D<=b;D++){R[D]=[];const w=_.clone().lerp(x,D/b),M=y.clone().lerp(x,D/b),I=b-D;for(let W=0;W<=I;W++)W===0&&D===b?R[D][W]=w:R[D][W]=w.clone().lerp(M,W/I)}for(let D=0;D<b;D++)for(let w=0;w<2*(b-D)-1;w++){const M=Math.floor(w/2);w%2===0?(f(R[D][M+1]),f(R[D+1][M]),f(R[D][M])):(f(R[D][M+1]),f(R[D+1][M+1]),f(R[D+1][M]))}}function l(_){const y=new O;for(let x=0;x<r.length;x+=3)y.x=r[x+0],y.y=r[x+1],y.z=r[x+2],y.normalize().multiplyScalar(_),r[x+0]=y.x,r[x+1]=y.y,r[x+2]=y.z}function h(){const _=new O;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];const x=p(_)/2/Math.PI+.5,C=d(_)/Math.PI+.5;o.push(x,1-C)}g(),u()}function u(){for(let _=0;_<o.length;_+=6){const y=o[_+0],x=o[_+2],C=o[_+4],b=Math.max(y,x,C),R=Math.min(y,x,C);b>.9&&R<.1&&(y<.2&&(o[_+0]+=1),x<.2&&(o[_+2]+=1),C<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function m(_,y){const x=_*3;y.x=e[x+0],y.y=e[x+1],y.z=e[x+2]}function g(){const _=new O,y=new O,x=new O,C=new O,b=new ke,R=new ke,D=new ke;for(let w=0,M=0;w<r.length;w+=9,M+=6){_.set(r[w+0],r[w+1],r[w+2]),y.set(r[w+3],r[w+4],r[w+5]),x.set(r[w+6],r[w+7],r[w+8]),b.set(o[M+0],o[M+1]),R.set(o[M+2],o[M+3]),D.set(o[M+4],o[M+5]),C.copy(_).add(y).add(x).divideScalar(3);const I=p(C);v(b,M+0,_,I),v(R,M+2,y,I),v(D,M+4,x,I)}}function v(_,y,x,C){C<0&&_.x===1&&(o[y]=_.x-1),x.x===0&&x.z===0&&(o[y]=C/2/Math.PI+.5)}function p(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jr(e.vertices,e.indices,e.radius,e.details)}}class uc extends jr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=1/i,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-i,0,-s,i,0,s,-i,0,s,i,-s,-i,0,-s,i,0,s,-i,0,s,i,0,-i,0,-s,i,0,-s,-i,0,s,i,0,s],o=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,o,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new uc(e.radius,e.detail)}}class Kr extends jr{constructor(e=1,t=0){const i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Kr(e.radius,e.detail)}}class dc extends vt{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],c=[],l=[],h=[];let u=e;const f=(t-e)/s,m=new O,g=new ke;for(let v=0;v<=s;v++){for(let p=0;p<=i;p++){const d=r+p/i*o;m.x=u*Math.cos(d),m.y=u*Math.sin(d),c.push(m.x,m.y,m.z),l.push(0,0,1),g.x=(m.x/t+1)/2,g.y=(m.y/t+1)/2,h.push(g.x,g.y)}u+=f}for(let v=0;v<s;v++){const p=v*(i+1);for(let d=0;d<i;d++){const _=d+p,y=_,x=_+i+1,C=_+i+2,b=_+1;a.push(y,x,b),a.push(x,C,b)}}this.setIndex(a),this.setAttribute("position",new ht(c,3)),this.setAttribute("normal",new ht(l,3)),this.setAttribute("uv",new ht(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new dc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Gs extends vt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new O,f=new O,m=[],g=[],v=[],p=[];for(let d=0;d<=i;d++){const _=[],y=d/i;let x=0;d===0&&o===0?x=.5/t:d===i&&c===Math.PI&&(x=-.5/t);for(let C=0;C<=t;C++){const b=C/t;u.x=-e*Math.cos(s+b*r)*Math.sin(o+y*a),u.y=e*Math.cos(o+y*a),u.z=e*Math.sin(s+b*r)*Math.sin(o+y*a),g.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),p.push(b+x,1-y),_.push(l++)}h.push(_)}for(let d=0;d<i;d++)for(let _=0;_<t;_++){const y=h[d][_+1],x=h[d][_],C=h[d+1][_],b=h[d+1][_+1];(d!==0||o>0)&&m.push(y,x,b),(d!==i-1||c<Math.PI)&&m.push(x,C,b)}this.setIndex(m),this.setAttribute("position",new ht(g,3)),this.setAttribute("normal",new ht(v,3)),this.setAttribute("uv",new ht(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class fc extends vt{constructor(e=1,t=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);const o=[],a=[],c=[],l=[],h=new O,u=new O,f=new O;for(let m=0;m<=i;m++)for(let g=0;g<=s;g++){const v=g/s*r,p=m/i*Math.PI*2;u.x=(e+t*Math.cos(p))*Math.cos(v),u.y=(e+t*Math.cos(p))*Math.sin(v),u.z=t*Math.sin(p),a.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(g/s),l.push(m/i)}for(let m=1;m<=i;m++)for(let g=1;g<=s;g++){const v=(s+1)*m+g-1,p=(s+1)*(m-1)+g-1,d=(s+1)*(m-1)+g,_=(s+1)*m+g;o.push(v,p,_),o.push(p,d,_)}this.setIndex(o),this.setAttribute("position",new ht(a,3)),this.setAttribute("normal",new ht(c,3)),this.setAttribute("uv",new ht(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fc(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class hn extends xi{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Su,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Zr extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ty extends Zr{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new qe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Go=new ct,nh=new O,ih=new O;class Wu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new cc,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new st(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;nh.setFromMatrixPosition(e.matrixWorld),t.position.copy(nh),ih.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ih),t.updateMatrixWorld(),Go.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Go),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Go)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const sh=new ct,ys=new O,Wo=new O;class ny extends Wu{constructor(){super(new Ot(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ke(4,2),this._viewportCount=6,this._viewports=[new st(2,1,1,1),new st(0,1,1,1),new st(3,1,1,1),new st(1,1,1,1),new st(3,0,1,1),new st(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){const i=this.camera,s=this.matrix,r=e.distance||i.far;r!==i.far&&(i.far=r,i.updateProjectionMatrix()),ys.setFromMatrixPosition(e.matrixWorld),i.position.copy(ys),Wo.copy(i.position),Wo.add(this._cubeDirections[t]),i.up.copy(this._cubeUps[t]),i.lookAt(Wo),i.updateMatrixWorld(),s.makeTranslation(-ys.x,-ys.y,-ys.z),sh.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sh)}}class Ps extends Zr{constructor(e,t,i=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=s,this.shadow=new ny}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class iy extends Wu{constructor(){super(new Fu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class rh extends Zr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new iy}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class sy extends Zr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tc);function oh(n){let e=(typeof n=="number"?n:ry(n||"rockets-default-seed"))>>>0;return function(){e|=0,e=e+1831565813|0;let i=Math.imul(e^e>>>15,1|e);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}function ry(n){let e=0;for(let t=0;t<n.length;t++)e=(e<<5)-e+n.charCodeAt(t),e|=0;return e>>>0}function Xo(n,e,t){return Math.max(e,Math.min(t,n))}function oy(){if(typeof document>"u")return null;try{const n=document.createElement("canvas");n.width=64,n.height=64;const e=n.getContext("2d");if(!e)return null;const t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255, 255, 255, 1)"),t.addColorStop(.25,"rgba(235, 245, 255, 0.85)"),t.addColorStop(.55,"rgba(160, 205, 255, 0.35)"),t.addColorStop(.85,"rgba(100, 150, 255, 0.08)"),t.addColorStop(1,"rgba(0, 0, 0, 0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const i=new Yr(n);return i.generateMipmaps=!0,i}catch{return null}}function ay(){if(typeof document>"u")return null;try{const n=document.createElement("canvas");n.width=256,n.height=256;const e=n.getContext("2d");if(!e)return null;const t=e.createImageData(256,256),i=t.data;for(let r=0;r<256;r++)for(let o=0;o<256;o++){const a=(r*256+o)*4,c=o/256,l=r/256,h=Math.sin(c*32)*Math.cos(l*32)*.35+Math.sin(c*64+l*48)*.25+Math.sin(c*128-l*96)*.15,u=(Math.random()-.5)*.25,f=Math.floor(Math.min(255,Math.max(0,(h+u+.5)*255)));i[a]=f,i[a+1]=f,i[a+2]=f,i[a+3]=255}e.putImageData(t,0,0);const s=new Yr(n);return s.wrapS=Us,s.wrapT=Us,s.repeat.set(4,4),s}catch{return null}}class cy{constructor(e,t=42){this.scene=e,this.mapSeed=t,this.asteroids=[],this.asteroidGroup=new bn,this.init()}init(){this.setupLighting(),this.createStarfield(),this.createAsteroidField()}setupLighting(){const e=new ty(5601177,1713203,1.6);this.scene.add(e);const t=new sy(3820380,1.2);this.scene.add(t);const i=new rh(16774890,3.2);i.position.set(700,450,600),this.scene.add(i);const s=new rh(46335,1.8);s.position.set(-600,-350,-500),this.scene.add(s);const r=new Ps(16772829,3.2,900);r.position.set(0,60,160),this.scene.add(r)}createStarfield(){const t=new vt,i=new Float32Array(200*3),s=new Float32Array(200*3),r=oh("stars-fixed-background");for(let l=0;l<200;l++){const h=l*3,u=r(),f=r(),m=u*2*Math.PI,g=Math.acos(2*f-1),v=350+r()*450;i[h]=v*Math.sin(g)*Math.cos(m),i[h+1]=v*Math.sin(g)*Math.sin(m),i[h+2]=v*Math.cos(g);const p=r();p<.25?(s[h]=.65,s[h+1]=.88,s[h+2]=1):p<.45?(s[h]=1,s[h+1]=.88,s[h+2]=.65):p<.6?(s[h]=.92,s[h+1]=.65,s[h+2]=1):(s[h]=1,s[h+1]=1,s[h+2]=1)}t.setAttribute("position",new dt(i,3)),t.setAttribute("color",new dt(s,3));const o=oy(),a=new Fs({size:4,map:o||void 0,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,blending:nn,sizeAttenuation:!0,fog:!1}),c=new Br(t,a);this.scene.add(c),this.createNebulae(r,o)}createNebulae(e,t){const s=new vt,r=new Float32Array(25*3),o=new Float32Array(25*3),a=[new qe(35071),new qe(10035967),new qe(65484),new qe(16724872)];for(let h=0;h<25;h++){const u=h*3,f=Math.floor(e()*a.length),m=a[f],g=f/a.length*Math.PI*2+(e()-.5)*.8,v=550+e()*350;r[u]=Math.cos(g)*v+(e()-.5)*200,r[u+1]=(e()-.5)*400,r[u+2]=Math.sin(g)*v+(e()-.5)*200,o[u]=m.r,o[u+1]=m.g,o[u+2]=m.b}s.setAttribute("position",new dt(r,3)),s.setAttribute("color",new dt(o,3));const c=new Fs({size:60,map:t||void 0,vertexColors:!0,transparent:!0,opacity:.28,blending:nn,sizeAttenuation:!0,depthWrite:!1,fog:!1}),l=new Br(s,c);this.scene.add(l)}createAsteroidField(){const e=oh(this.mapSeed),t=120,i=1e3,s=ay(),r=new hn({color:10180674,roughness:.88,metalness:.16,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Gt}),o=new hn({color:3685958,roughness:.92,metalness:.1,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Gt}),a=new hn({color:6187125,roughness:.86,metalness:.14,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Gt}),c=new hn({color:8293530,roughness:.8,metalness:.26,flatShading:!1,bumpMap:s||null,bumpScale:1.2,depthWrite:!0,side:Gt}),l=[r,o,a,c];for(let h=0;h<t;h++){let u,f;h<20?(u=75+e()*65,f=4):h<65?(u=42+e()*33,f=3):(u=22+e()*20,f=3);const m=new Kr(u,f),g=m.attributes.position,v=new O,p=.82+e()*.4,d=.78+e()*.44,_=.82+e()*.4,y=e()*Math.PI*2,x=e()*Math.PI*2,C=e()*Math.PI*2,b=Math.floor(4+e()*3),R=[];for(let N=0;N<b;N++){const P=e()*Math.PI*2,z=Math.acos(2*e()-1);R.push({dir:new O(Math.sin(z)*Math.cos(P),Math.sin(z)*Math.sin(P),Math.cos(z)),depth:.16+e()*.16,radiusCos:.78+e()*.14})}for(let N=0;N<g.count;N++){v.fromBufferAttribute(g,N);const P=v.clone().normalize(),z=.1*Math.sin(P.x*3.2+y)*Math.cos(P.y*3.2+x)+.08*Math.sin(P.z*3.8+C),B=.05*Math.sin(P.x*6.5-P.z*5.2)*Math.cos(P.y*6.1),F=.025*Math.sin(P.y*12+P.x*10.5)*Math.sin(P.z*11.8),k=z+B+F;let Z=0;for(let Me=0;Me<R.length;Me++){const X=R[Me],te=P.dot(X.dir);if(te>X.radiusCos){const le=(te-X.radiusCos)/(1-X.radiusCos);Z-=X.depth*Math.cos(le*(Math.PI/2))}else if(te>X.radiusCos-.12){const le=(te-(X.radiusCos-.12))/.12;Z+=.35*X.depth*Math.sin(le*Math.PI)}}const he=Math.max(.6,1+k+Z);v.copy(P).multiplyScalar(u*he),v.x*=p,v.y*=d,v.z*=_,g.setXYZ(N,v.x,v.y,v.z)}m.computeVertexNormals();const D=l[Math.floor(e()*l.length)],w=new Qe(m,D);let M=0,I=0,W=0;if(h<12)M=(e()-.5)*180,I=(e()-.5)*90,W=60-e()*320;else{let N=!1,P=0;for(;!N&&P<50;){P++,M=(e()-.5)*i*2,I=(e()-.5)*(i*.7),W=(e()-.5)*i*2;const z=Math.hypot(M-0,I-0,W-180),B=Math.hypot(M,I,W);z>u+50&&B<i&&(N=!0)}}w.position.set(M,I,W),w.rotation.set(e()*Math.PI,e()*Math.PI,e()*Math.PI),this.asteroidGroup.add(w);const S=4/3*Math.PI*Math.pow(u,3)*.001,L=new O((e()-.5)*4,(e()-.5)*2.2,(e()-.5)*4);this.asteroids.push({mesh:w,radius:u,mass:S,position:w.position,velocity:L,rotationSpeed:new O((e()-.5)*.08,(e()-.5)*.08,(e()-.5)*.08),boundingSphere:new Hs(w.position,u*1.05)})}this.scene.add(this.asteroidGroup)}update(e,t,i){const r=this.asteroids.length;for(let o=0;o<r;o++){const a=this.asteroids[o];if(a.position.addScaledVector(a.velocity,e),a.boundingSphere.center.copy(a.position),a.mesh.rotation.x+=a.rotationSpeed.x*e,a.mesh.rotation.y+=a.rotationSpeed.y*e,a.mesh.rotation.z+=a.rotationSpeed.z*e,a.position.length()>1e3){const l=a.position.clone().normalize().multiplyScalar(-6*e);a.velocity.add(l)}}for(let o=0;o<r;o++){const a=this.asteroids[o],c=a.position;for(let l=o+1;l<r;l++){const h=this.asteroids[l],u=h.position,f=c.x-u.x,m=c.y-u.y,g=c.z-u.z,v=f*f+m*m+g*g,p=a.radius+h.radius;if(v<p*p&&v>1e-4){const d=Math.sqrt(v),_=f/d,y=m/d,x=g/d,C=p-d,b=a.mass+h.mass,R=h.mass/b,D=a.mass/b;c.x+=_*C*R,c.y+=y*C*R,c.z+=x*C*R,u.x-=_*C*D,u.y-=y*C*D,u.z-=x*C*D;const w=a.velocity.x-h.velocity.x,M=a.velocity.y-h.velocity.y,I=a.velocity.z-h.velocity.z,W=w*_+M*y+I*x;if(W<0){const S=-1.65*W/(1/a.mass+1/h.mass);a.velocity.x+=S/a.mass*_,a.velocity.y+=S/a.mass*y,a.velocity.z+=S/a.mass*x,h.velocity.x-=S/h.mass*_,h.velocity.y-=S/h.mass*y,h.velocity.z-=S/h.mass*x}}}}}checkCollision(e,t=2.5){for(let i=0;i<this.asteroids.length;i++){const s=this.asteroids[i],r=e.distanceToSquared(s.position),o=s.radius+t;if(r<o*o)return s}return null}resolveShipCollision(e,t,i=2.8,s=1200){for(let r=0;r<this.asteroids.length;r++){const o=this.asteroids[r],a=e.distanceTo(o.position),c=o.radius+i;if(a<c){const l=e.clone().sub(o.position);l.lengthSq()<1e-4?l.set(0,1,0):l.normalize(),e.copy(o.position).addScaledVector(l,c+.3);const u=t.clone().sub(o.velocity).dot(l);if(u<0){const f=-1.85*u*s;t.addScaledVector(l,f/s),o.velocity.addScaledVector(l,-(f/o.mass));const m=Math.abs(u),g=Math.round(Math.min(45,Math.max(10,m*.75)));return{asteroid:o,normal:l,impactDamage:g,impactSpeed:m}}}}return null}}class ly{constructor(e){this.camera=e,this.group=new bn,this.camera.add(this.group),this.targetOffset=new O,this.currentOffset=new O,this.targetRotation=new qt,this.currentRotation=new qt,this.shieldGlassMat=null,this.damageFlashTimer=0,this.createCockpitModel()}createCockpitModel(){const e=new hn({color:1712688,roughness:.3,metalness:.85,flatShading:!0}),t=new Wt({color:58879,wireframe:!1}),i=new un(1.6,.04,.2),s=new Qe(i,e);s.position.set(0,-.42,-.55),s.rotation.x=.25,this.group.add(s);const r=new un(1.2,.006,.01),o=new Qe(r,t);o.position.set(0,-.4,-.54),o.rotation.x=.25,this.group.add(o);const a=new un(.03,.9,.04),c=new Qe(a,e);c.position.set(-.72,.08,-.5),c.rotation.set(-.15,.15,.42),this.group.add(c);const l=c.clone();l.position.set(.72,.08,-.5),l.rotation.set(-.15,-.15,-.42),this.group.add(l);const h=new Gs(.75,16,12,0,Math.PI*2,0,Math.PI*.45);this.shieldGlassMat=new Wt({color:57855,transparent:!0,opacity:.03,side:At,blending:nn,depthWrite:!1});const u=new Qe(h,this.shieldGlassMat);u.position.set(0,0,.1),this.group.add(u);const f=new gi(.022,.03,.55,8),m=new Qe(f,e);m.position.set(-.52,-.32,-.65),m.rotation.x=Math.PI/2,this.group.add(m);const g=m.clone();g.position.set(.52,-.32,-.65),this.group.add(g);const v=new fc(.026,.006,6,12),p=new Qe(v,t);p.position.set(-.52,-.32,-.92),this.group.add(p);const d=p.clone();d.position.set(.52,-.32,-.92),this.group.add(d)}triggerDamageFlash(){this.damageFlashTimer=.35}update(e,t,i){i&&i.length();const s=t.thrust?.015:t.brake?-.015:0,r=t.strafe*.02,o=t.pitch*.012,a=t.roll*.02;this.targetOffset.set(-r,-o,s),this.targetRotation.set(-o*1.5,-r*1.2,-a),this.currentOffset.lerp(this.targetOffset,e*10),this.currentRotation.x+=(this.targetRotation.x-this.currentRotation.x)*e*10,this.currentRotation.y+=(this.targetRotation.y-this.currentRotation.y)*e*10,this.currentRotation.z+=(this.targetRotation.z-this.currentRotation.z)*e*10,this.group.position.copy(this.currentOffset),this.group.rotation.copy(this.currentRotation),this.damageFlashTimer>0?(this.damageFlashTimer-=e,this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(16720452),this.shieldGlassMat.opacity=Math.max(.04,this.damageFlashTimer*.8))):this.shieldGlassMat&&(this.shieldGlassMat.color.setHex(57855),this.shieldGlassMat.opacity=.04)}}class hy{constructor(e,t){this.camera=e,this.spaceEnv=t,this.position=new O(0,0,100),this.velocity=new O(0,0,0),this.quaternion=new ln,this.maxSpeed=90,this.forwardAccel=45,this.decelRate=this.maxSpeed/2,this.strafeAccel=40,this.maxStrafeSpeed=35,this.pitchSpeed=1.6,this.yawSpeed=1.6,this.rollSpeed=2,this.maxHp=100,this.hp=100,this.maxShield=100,this.shield=100,this.shieldRechargeDelay=2,this.shieldRechargeTimer=0,this.shieldRechargeRate=100/15,this.mass=1200,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.score=0,this.kills=0,this.deaths=0,this.input={thrust:!1,brake:!1,strafeLeft:!1,strafeRight:!1,pitchUp:!1,pitchDown:!1,yawLeft:!1,yawRight:!1,rollLeft:!1,rollRight:!1,analogPitch:0,analogYaw:0,analogRoll:0},this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}resetSpawn(){this.position.set(0,0,180),this.velocity.set(0,0,0),this.quaternion.set(0,0,0,1),this.hp=this.maxHp,this.shield=this.maxShield,this.shieldRechargeTimer=0,this.isDead=!1,this.respawnTimer=0,this.invulnerableTimer=2.5,this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}takeDamage(e){if(this.isDead||this.invulnerableTimer>0)return!1;if(this.shieldRechargeTimer=this.shieldRechargeDelay,this.shield>0){const t=Math.min(this.shield,e);this.shield-=t,e-=t}return e>0&&(this.hp=Math.max(0,this.hp-e)),this.hp<=0?(this.isDead=!0,this.deaths++,this.respawnTimer=3,!0):!1}recordKill(){this.kills++,this.score+=100}applyImpulse(e){this.velocity.add(e),this.velocity.length()>this.maxSpeed*1.35&&this.velocity.setLength(this.maxSpeed*1.35)}update(e){if(this.invulnerableTimer>0&&(this.invulnerableTimer=Math.max(0,this.invulnerableTimer-e)),this.isDead){this.respawnTimer-=e,this.respawnTimer<=0&&this.resetSpawn();return}this.shield<this.maxShield&&(this.shieldRechargeTimer>0?this.shieldRechargeTimer-=e:this.shield=Math.min(this.maxShield,this.shield+this.shieldRechargeRate*e)),(isNaN(this.position.x)||isNaN(this.position.y)||isNaN(this.position.z))&&(this.position.set(0,0,180),this.velocity.set(0,0,0)),(isNaN(this.velocity.x)||isNaN(this.velocity.y)||isNaN(this.velocity.z))&&this.velocity.set(0,0,0),(isNaN(this.quaternion.x)||isNaN(this.quaternion.w))&&this.quaternion.set(0,0,0,1),this.handleRotation(e),this.handleThrustAndMovement(e),this.handleAsteroidCollisions(),this.camera.position.copy(this.position),this.camera.quaternion.copy(this.quaternion)}handleRotation(e){let t=0;this.input.pitchUp&&(t+=1),this.input.pitchDown&&(t-=1),t+=this.input.analogPitch,t=Xo(t,-1,1);let i=0;this.input.yawLeft&&(i+=1),this.input.yawRight&&(i-=1),i+=this.input.analogYaw,i=Xo(i,-1,1);let s=0;this.input.rollLeft&&(s+=1),this.input.rollRight&&(s-=1),s+=this.input.analogRoll,s=Xo(s,-1,1);const r=new O(1,0,0),o=new O(0,1,0),a=new O(0,0,1);if(t!==0){const c=new ln().setFromAxisAngle(r,t*this.pitchSpeed*e);this.quaternion.multiply(c)}if(i!==0){const c=new ln().setFromAxisAngle(o,i*this.yawSpeed*e);this.quaternion.multiply(c)}if(s!==0){const c=new ln().setFromAxisAngle(a,s*this.rollSpeed*e);this.quaternion.multiply(c)}this.quaternion.normalize()}handleThrustAndMovement(e){const t=new O(0,0,-1).applyQuaternion(this.quaternion).normalize(),i=new O(1,0,0).applyQuaternion(this.quaternion).normalize();if(this.input.thrust&&(this.velocity.addScaledVector(t,this.forwardAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.input.brake){const o=this.velocity.length();if(o>.001){const a=this.decelRate*e,c=Math.max(0,o-a);c===0?this.velocity.set(0,0,0):this.velocity.setLength(c)}else this.velocity.set(0,0,0)}let s=0;if(this.input.strafeLeft&&(s-=1),this.input.strafeRight&&(s+=1),s!==0&&(this.velocity.addScaledVector(i,s*this.strafeAccel*e),this.velocity.length()>this.maxSpeed&&this.velocity.setLength(this.maxSpeed)),this.position.addScaledVector(this.velocity,e),this.position.length()>1100){const o=this.position.clone().normalize().multiplyScalar(-30*e);this.velocity.add(o)}}handleAsteroidCollisions(){if(this.spaceEnv&&typeof this.spaceEnv.resolveShipCollision=="function"){const t=this.spaceEnv.resolveShipCollision(this.position,this.velocity,2.8,this.mass);if(t)return this.takeDamage(t.impactDamage),t}else if(this.spaceEnv&&typeof this.spaceEnv.checkCollision=="function"){const t=this.spaceEnv.checkCollision(this.position,2.8);if(t){const i=this.position.clone().sub(t.position);i.lengthSq()<.001?i.set(0,1,0):i.normalize(),this.position.copy(t.position).addScaledVector(i,t.radius+2.8+.4);const s=this.velocity.dot(i);s<0&&this.velocity.subScaledVector(i,1.8*s),this.takeDamage(15)}}}getForwardVector(){return new O(0,0,-1).applyQuaternion(this.quaternion).normalize()}getRightVector(){return new O(1,0,0).applyQuaternion(this.quaternion).normalize()}getSpeed(){return this.velocity.length()}}class uy{constructor(){this.ctx=null,this.masterGain=null,this.compressor=null,this.isMuted=!1,this.isUnlocked=!1,this.engineGain=null,this.engineFilter=null,this.engineOsc1=null,this.engineOsc2=null,this.engineNoiseNode=null,this.currentEngineVol=0,this.brakeGain=null,this.brakeFilter=null,this.brakeNoiseNode=null,this.currentBrakeVol=0,this.noiseBuffer=null,this.init()}init(){if(typeof window>"u")return;const e=window.AudioContext||window.webkitAudioContext;if(e)try{this.ctx=new e,this.compressor=this.ctx.createDynamicsCompressor(),this.compressor.threshold.setValueAtTime(-12,this.ctx.currentTime),this.compressor.knee.setValueAtTime(8,this.ctx.currentTime),this.compressor.ratio.setValueAtTime(4,this.ctx.currentTime),this.compressor.attack.setValueAtTime(.005,this.ctx.currentTime),this.compressor.release.setValueAtTime(.08,this.ctx.currentTime),this.masterGain=this.ctx.createGain(),this.masterGain.gain.setValueAtTime(.85,this.ctx.currentTime),this.compressor.connect(this.masterGain),this.masterGain.connect(this.ctx.destination),this.generateNoiseBuffer(),this.initEngineSynth(),this.initBrakeSynth(),this.setupAutoUnlock()}catch(t){console.warn("AudioContext initialization failed:",t)}}setupAutoUnlock(){if(!this.ctx)return;const e=()=>{this.ctx&&this.ctx.state==="suspended"?this.ctx.resume().then(()=>{this.isUnlocked=!0}).catch(()=>{}):this.isUnlocked=!0,window.removeEventListener("pointerdown",e),window.removeEventListener("keydown",e),window.removeEventListener("touchstart",e)};window.addEventListener("pointerdown",e,{passive:!0,once:!0}),window.addEventListener("keydown",e,{passive:!0,once:!0}),window.addEventListener("touchstart",e,{passive:!0,once:!0})}resume(){this.ctx&&this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{})}generateNoiseBuffer(){if(!this.ctx)return;const e=this.ctx.sampleRate*2;this.noiseBuffer=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const t=this.noiseBuffer.getChannelData(0);for(let i=0;i<e;i++)t[i]=Math.random()*2-1}initEngineSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.engineOsc1=this.ctx.createOscillator(),this.engineOsc1.type="sawtooth",this.engineOsc1.frequency.setValueAtTime(55,this.ctx.currentTime),this.engineOsc2=this.ctx.createOscillator(),this.engineOsc2.type="triangle",this.engineOsc2.frequency.setValueAtTime(110,this.ctx.currentTime),this.engineNoiseNode=this.ctx.createBufferSource(),this.engineNoiseNode.buffer=this.noiseBuffer,this.engineNoiseNode.loop=!0,this.engineFilter=this.ctx.createBiquadFilter(),this.engineFilter.type="lowpass",this.engineFilter.frequency.setValueAtTime(120,this.ctx.currentTime),this.engineFilter.Q.setValueAtTime(3,this.ctx.currentTime),this.engineGain=this.ctx.createGain(),this.engineGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.engineOsc1.connect(this.engineFilter),this.engineOsc2.connect(this.engineFilter),this.engineNoiseNode.connect(this.engineFilter),this.engineFilter.connect(this.engineGain),this.engineGain.connect(this.compressor);try{this.engineOsc1.start(),this.engineOsc2.start(),this.engineNoiseNode.start()}catch{}}}initBrakeSynth(){if(!(!this.ctx||!this.noiseBuffer)){this.brakeNoiseNode=this.ctx.createBufferSource(),this.brakeNoiseNode.buffer=this.noiseBuffer,this.brakeNoiseNode.loop=!0,this.brakeFilter=this.ctx.createBiquadFilter(),this.brakeFilter.type="bandpass",this.brakeFilter.frequency.setValueAtTime(1400,this.ctx.currentTime),this.brakeFilter.Q.setValueAtTime(2.5,this.ctx.currentTime),this.brakeGain=this.ctx.createGain(),this.brakeGain.gain.setValueAtTime(1e-4,this.ctx.currentTime),this.brakeNoiseNode.connect(this.brakeFilter),this.brakeFilter.connect(this.brakeGain),this.brakeGain.connect(this.compressor);try{this.brakeNoiseNode.start()}catch{}}}updateEngine(e,t,i){if(!this.ctx||!this.engineGain||!this.brakeGain)return;this.resume();const s=e?.38:0,r=e?460:120;this.currentEngineVol+=(s-this.currentEngineVol)*Math.min(1,i*10);const o=this.ctx.currentTime;this.engineGain.gain.setTargetAtTime(Math.max(1e-4,this.currentEngineVol),o,.05),this.engineFilter.frequency.setTargetAtTime(r,o,.08);const a=t?.32:0;this.currentBrakeVol+=(a-this.currentBrakeVol)*Math.min(1,i*12),this.brakeGain.gain.setTargetAtTime(Math.max(1e-4,this.currentBrakeVol),o,.04)}playCannonShot(e=!0){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain(),r=this.ctx.createBiquadFilter();i.type=e?"sawtooth":"sine";const o=e?920:680,a=e?110:90;i.frequency.setValueAtTime(o,t),i.frequency.exponentialRampToValueAtTime(a,t+.08),r.type="lowpass",r.frequency.setValueAtTime(2800,t),r.frequency.exponentialRampToValueAtTime(400,t+.09);const c=e?.36:.18;s.gain.setValueAtTime(c,t),s.gain.exponentialRampToValueAtTime(.001,t+.095),i.connect(r),r.connect(s),s.connect(this.compressor),i.start(t),i.stop(t+.1)}playMineDeploy(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(260,e),t.frequency.exponentialRampToValueAtTime(60,e+.12),i.gain.setValueAtTime(.35,e),i.gain.exponentialRampToValueAtTime(.001,e+.13),t.connect(i),i.connect(this.compressor),t.start(e),t.stop(e+.14);const s=this.ctx.createOscillator(),r=this.ctx.createGain();s.type="sine",s.frequency.setValueAtTime(1250,e+.06),s.frequency.setValueAtTime(1750,e+.14),r.gain.setValueAtTime(1e-4,e),r.gain.setValueAtTime(.22,e+.06),r.gain.setValueAtTime(.25,e+.14),r.gain.exponentialRampToValueAtTime(.001,e+.28),s.connect(r),r.connect(this.compressor),s.start(e+.05),s.stop(e+.3)}playExplosion(e=1){if(!this.ctx||this.isMuted)return;this.resume();const t=this.ctx.currentTime,i=this.ctx.createOscillator(),s=this.ctx.createGain();i.type="sine",i.frequency.setValueAtTime(140,t),i.frequency.exponentialRampToValueAtTime(28,t+.7*e);const r=Math.min(.7,.45*e);if(s.gain.setValueAtTime(r,t),s.gain.exponentialRampToValueAtTime(.001,t+.75*e),i.connect(s),s.connect(this.compressor),i.start(t),i.stop(t+.8*e),this.noiseBuffer){const o=this.ctx.createBufferSource();o.buffer=this.noiseBuffer;const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(900,t),a.frequency.exponentialRampToValueAtTime(80,t+.6*e);const c=this.ctx.createGain();c.gain.setValueAtTime(.5*e,t),c.gain.exponentialRampToValueAtTime(.001,t+.65*e),o.connect(a),a.connect(c),c.connect(this.compressor),o.start(t),o.stop(t+.7*e)}}playDamageHit(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="sawtooth",t.frequency.setValueAtTime(320,e),t.frequency.exponentialRampToValueAtTime(70,e+.16),i.gain.setValueAtTime(.42,e),i.gain.exponentialRampToValueAtTime(.001,e+.18),t.connect(i),i.connect(this.compressor),t.start(e),t.stop(e+.2)}playScoreChime(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain();t.type="triangle",t.frequency.setValueAtTime(880,e),t.frequency.setValueAtTime(1320,e+.08),i.gain.setValueAtTime(.25,e),i.gain.exponentialRampToValueAtTime(.001,e+.35),t.connect(i),i.connect(this.compressor),t.start(e),t.stop(e+.36)}playStrafeBurst(){if(!this.ctx||this.isMuted||!this.noiseBuffer)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createBufferSource();t.buffer=this.noiseBuffer;const i=this.ctx.createBiquadFilter();i.type="bandpass",i.frequency.setValueAtTime(1600,e),i.Q.setValueAtTime(2,e);const s=this.ctx.createGain();s.gain.setValueAtTime(.2,e),s.gain.exponentialRampToValueAtTime(.001,e+.12),t.connect(i),i.connect(s),s.connect(this.compressor),t.start(e),t.stop(e+.13)}playEngagementBeacon(){if(!this.ctx||this.isMuted)return;this.resume();const e=this.ctx.currentTime,t=this.ctx.createOscillator(),i=this.ctx.createGain(),s=this.ctx.createBiquadFilter();t.type="sine",t.frequency.setValueAtTime(1480,e),t.frequency.exponentialRampToValueAtTime(520,e+.45),s.type="bandpass",s.frequency.setValueAtTime(1200,e),s.Q.setValueAtTime(4,e),i.gain.setValueAtTime(1e-4,e),i.gain.linearRampToValueAtTime(.38,e+.04),i.gain.exponentialRampToValueAtTime(.001,e+.95),t.connect(s),s.connect(i),i.connect(this.compressor),t.start(e),t.stop(e+1)}}const Ft=new uy;class dy{constructor(e){this.scene=e,this.maxParticles=1e3,this.particles=[],this.geom=new vt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new dt(this.positions,3)),this.geom.setAttribute("color",new dt(this.colors,3)),this.material=new Fs({size:4.8,vertexColors:!0,transparent:!0,opacity:.95,blending:nn,depthWrite:!1,sizeAttenuation:!0}),this.points=new Br(this.geom,this.material),this.scene.add(this.points)}emit(e,t,i=2){for(let s=0;s<i&&!(this.particles.length>=this.maxParticles);s++){const r=new O((Math.random()-.5)*.45,(Math.random()-.5)*.45,(Math.random()-.5)*.45),o=e.clone().add(r),a=t.clone().multiplyScalar(-18).add(new O((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8)),c=.28+Math.random()*.18;this.particles.push({pos:o,vel:a,life:c,maxLife:c})}}update(e){for(let i=this.particles.length-1;i>=0;i--){const s=this.particles[i];if(s.life-=e,s.life<=0){this.particles.splice(i,1);continue}s.pos.addScaledVector(s.vel,e)}const t=this.particles.length;for(let i=0;i<t;i++){const s=this.particles[i],r=i*3;this.positions[r]=s.pos.x,this.positions[r+1]=s.pos.y,this.positions[r+2]=s.pos.z;const o=1-s.life/s.maxLife;if(o<.25)this.colors[r]=1,this.colors[r+1]=.98,this.colors[r+2]=.7;else if(o<.65)this.colors[r]=1,this.colors[r+1]=.55*(1-(o-.25)/.4),this.colors[r+2]=.05;else{const a=(1-o)/.35;this.colors[r]=.85*a,this.colors[r+1]=.15*a,this.colors[r+2]=.02*a}}for(let i=t;i<this.maxParticles;i++){const s=i*3;this.positions[s]=99999,this.positions[s+1]=99999,this.positions[s+2]=99999,this.colors[s]=0,this.colors[s+1]=0,this.colors[s+2]=0}this.geom.attributes.position.needsUpdate=!0,this.geom.attributes.color.needsUpdate=!0}cleanup(){this.points&&this.points.parent&&this.points.parent.remove(this.points),this.geom.dispose(),this.material.dispose()}}class fy{constructor(e,t,i){this.scene=e,this.spaceEnv=t,this.network=i,this.cannonMaxEnergy=100,this.cannonEnergy=100,this.cannonShotCost=2.5,this.cannonCooldownDelay=1,this.cannonCooldownTimer=0,this.cannonRechargeRate=35,this.cannonFireInterval=.1,this.cannonLastFireTime=0,this.cannonDamage=5,this.cannonSpeed=175,this.mineMaxCharges=2,this.mineCharges=2,this.mineRechargeTime=5.5,this.mineRechargeProgress=0,this.mineForwardImpulse=20,this.mineFuseTime=3,this.mineDetonationRadius=8,this.mineExplosionDamage=50,this.mineExplosionRadius=18,this.projectiles=[],this.mines=[],this.explosions=[],this.fireTrails=new dy(this.scene),this.slugBodyGeom=new gi(.24,.32,2,8),this.slugBodyGeom.rotateX(Math.PI/2),this.slugNoseGeom=new Xi(.24,.9,8),this.slugNoseGeom.rotateX(-Math.PI/2),this.slugTailGeom=new gi(.18,.28,.45,8),this.slugTailGeom.rotateX(Math.PI/2),this.slugBodyMat=new hn({color:2371133,roughness:.35,metalness:.85,flatShading:!0}),this.localSlugNoseMat=new Wt({color:16763955}),this.remoteSlugNoseMat=new Wt({color:16724804}),this.slugThrusterMat=new Wt({color:16737792}),this.mineGeom=new uc(1.6,1),this.mineMat=new hn({color:2236962,roughness:.3,metalness:.9,emissive:16716032,emissiveIntensity:.4}),this.listenToNetworkEvents()}listenToNetworkEvents(){this.network.onCannon((e,t)=>{this.spawnRemoteProjectile(e,t)}),this.network.onMine((e,t)=>{this.spawnRemoteMine(e,t)})}triggerCannon(e,t,i){if(e){this.cannonCooldownTimer=this.cannonCooldownDelay;const s=i>1e3?i*.001:i;if(this.cannonEnergy>=this.cannonShotCost&&s-this.cannonLastFireTime>=this.cannonFireInterval){this.cannonLastFireTime=s,this.cannonEnergy=Math.max(0,this.cannonEnergy-this.cannonShotCost);const r=t.getForwardVector(),o=t.getRightVector(),a=(Math.random()>.5?1:-1)*.52,c=t.position.clone().addScaledVector(r,2.5).addScaledVector(o,a).add(new O(0,-.32,0)),l=`${this.network.selfId}-${Date.now()}-${Math.random().toString(36).slice(2,6)}`;this.spawnProjectile(c,r,t.velocity,!0,l),Ft.playCannonShot(!0),this.network.broadcastCannon({id:l,origin:{x:c.x,y:c.y,z:c.z},dir:{x:r.x,y:r.y,z:r.z},vel:{x:t.velocity.x,y:t.velocity.y,z:t.velocity.z},time:i})}}}triggerRearMine(e){if(this.mineCharges<1||e.isDead)return!1;this.mineCharges--;const t=e.getForwardVector();e.applyImpulse(t.clone().multiplyScalar(this.mineForwardImpulse));const i=e.position.clone().addScaledVector(t,-1.8),s=`mine-${this.network.selfId}-${Date.now()}`;return this.spawnMine(i,!0,this.network.selfId,s),Ft.playMineDeploy(),this.network.broadcastMine({id:s,pos:{x:i.x,y:i.y,z:i.z},ownerId:this.network.selfId,time:Date.now()}),!0}spawnProjectile(e,t,i,s,r){const o=new bn;o.position.copy(e),o.quaternion.setFromUnitVectors(new O(0,0,1),t);const a=new Qe(this.slugBodyGeom,this.slugBodyMat);o.add(a);const c=new Qe(this.slugNoseGeom,s?this.localSlugNoseMat:this.remoteSlugNoseMat);c.position.set(0,0,-1.45),o.add(c);const l=new Qe(this.slugTailGeom,this.slugThrusterMat);l.position.set(0,0,1.15),o.add(l);const h=new Ps(s?16746496:16720452,2.8,22);h.position.set(0,0,.5),o.add(h),this.scene.add(o),this.projectiles.push({mesh:o,dir:t.clone().normalize(),speed:this.cannonSpeed,initialVel:i?i.clone():new O,life:2.8,isLocal:s,id:r})}spawnRemoteProjectile(e,t){const i=new O(e.origin.x,e.origin.y,e.origin.z),s=new O(e.dir.x,e.dir.y,e.dir.z),r=e.vel?new O(e.vel.x,e.vel.y,e.vel.z):new O;this.spawnProjectile(i,s,r,!1,e.id),Ft.playCannonShot(!1)}spawnMine(e,t,i,s){const r=new Qe(this.mineGeom,this.mineMat);r.position.copy(e);const o=new Ps(16720384,2.5,30);r.add(o),this.scene.add(r),this.mines.push({mesh:r,light:o,pos:r.position,life:this.mineFuseTime,ownerId:i,isLocal:t,id:s})}spawnRemoteMine(e,t){const i=new O(e.pos.x,e.pos.y,e.pos.z);this.spawnMine(i,!1,e.ownerId||t,e.id)}spawnExplosion(e,t=12,i=16737792){const s=new Gs(t*.4,12,10),r=new Wt({color:i,transparent:!0,opacity:.9,blending:nn}),o=new Qe(s,r);o.position.copy(e);const a=new Ps(i,4,t*3.5);o.add(a),this.scene.add(o),Ft.playExplosion(t>15?1.5:.8),this.explosions.push({mesh:o,light:a,maxLife:.45,life:.45,maxRadius:t})}update(e,t,i,s){if(this.cannonCooldownTimer>0){const r=Math.min(this.cannonCooldownTimer,e);this.cannonCooldownTimer-=r;const o=e-r;o>0&&this.cannonEnergy<this.cannonMaxEnergy&&(this.cannonEnergy=Math.min(this.cannonMaxEnergy,this.cannonEnergy+this.cannonRechargeRate*o))}else this.cannonEnergy<this.cannonMaxEnergy&&(this.cannonEnergy=Math.min(this.cannonMaxEnergy,this.cannonEnergy+this.cannonRechargeRate*e));this.mineCharges<this.mineMaxCharges?(this.mineRechargeProgress+=e/this.mineRechargeTime,this.mineRechargeProgress>=1&&(this.mineCharges++,this.mineRechargeProgress=0)):this.mineRechargeProgress=0;for(let r=this.projectiles.length-1;r>=0;r--){const o=this.projectiles[r];o.life-=e;const a=o.dir.clone().multiplyScalar(o.speed*e);o.mesh.position.add(a);const c=o.mesh.position.clone().addScaledVector(o.dir,-1.2);this.fireTrails.emit(c,o.dir,3);let l=!1;if(this.spaceEnv.checkCollision(o.mesh.position,1)&&(this.spawnExplosion(o.mesh.position,4,54527),l=!0),!l&&!o.isLocal&&!t.isDead&&t.invulnerableTimer<=0&&o.mesh.position.distanceToSquared(t.position)<16&&(this.spawnExplosion(o.mesh.position,6,16720384),t.takeDamage(this.cannonDamage),s&&s(this.cannonDamage,"cannon",null),l=!0),!l&&o.isLocal){for(const[h,u]of i.entries())if(!u.isDead&&o.mesh.position.distanceToSquared(u.position)<16){this.spawnExplosion(o.mesh.position,6,65535),this.network.sendHitTarget(h,this.cannonDamage,"cannon"),l=!0;break}}(l||o.life<=0)&&(this.scene.remove(o.mesh),this.projectiles.splice(r,1))}for(let r=this.mines.length-1;r>=0;r--){const o=this.mines[r];o.life-=e,o.mesh.rotation.y+=e*2,o.mesh.rotation.x+=e*1.5;const a=Math.sin(o.life*12)>0;o.light.intensity=a?3.5:.8;let c=!1;const l=o.isLocal&&o.life>this.mineFuseTime-.6;if(!t.isDead&&!l&&o.pos.distanceToSquared(t.position)<=this.mineDetonationRadius*this.mineDetonationRadius&&(c=!0),!c){for(const[h,u]of i.entries())if(!u.isDead&&o.pos.distanceToSquared(u.position)<=this.mineDetonationRadius*this.mineDetonationRadius){c=!0;break}}if(o.life<=0&&(c=!0),c){if(this.spawnExplosion(o.pos,this.mineExplosionRadius,16729088),!t.isDead&&t.invulnerableTimer<=0){const h=o.pos.distanceTo(t.position);if(h<=this.mineExplosionRadius){const u=1-h/this.mineExplosionRadius,f=Math.round(this.mineExplosionDamage*u);t.takeDamage(f);const m=t.position.clone().sub(o.pos).normalize();t.applyImpulse(m.multiplyScalar(25*u)),s&&s(f,"mine",o.ownerId)}}if(o.isLocal){for(const[h,u]of i.entries())if(!u.isDead){const f=o.pos.distanceTo(u.position);if(f<=this.mineExplosionRadius){const m=1-f/this.mineExplosionRadius,g=Math.round(this.mineExplosionDamage*m);this.network.sendHitTarget(h,g,"mine")}}}this.scene.remove(o.mesh),this.mines.splice(r,1)}}for(let r=this.explosions.length-1;r>=0;r--){const o=this.explosions[r];o.life-=e;const a=1-o.life/o.maxLife,c=1+a*2.5;o.mesh.scale.set(c,c,c),o.mesh.material.opacity=Math.max(0,1-a),o.light.intensity=Math.max(0,(1-a)*4),o.life<=0&&(this.scene.remove(o.mesh),this.explosions.splice(r,1))}this.fireTrails&&this.fireTrails.update(e)}cleanup(){for(const e of this.projectiles)this.scene.remove(e.mesh);for(const e of this.mines)this.scene.remove(e.mesh);for(const e of this.explosions)this.scene.remove(e.mesh);this.fireTrails&&this.fireTrails.cleanup(),this.projectiles=[],this.mines=[],this.explosions=[]}}class ah{constructor(e,t,i="Pilot"){this.peerId=e,this.scene=t,this.playerName=i,this.group=new bn,this.position=this.group.position,this.quaternion=this.group.quaternion,this.lastReceivedState=null,this.targetPosition=new O,this.targetQuaternion=new ln,this.targetVelocity=new O,this.lastPacketTime=performance.now(),this.hp=100,this.maxHp=100,this.isDead=!1,this.isThrusting=!1,this.strafeState=0,this.engineFlares=[],this.sideThrusterFlares=[],this.shieldMesh=null,this.nameCanvas=null,this.nameSprite=null,this.createShipMesh(),this.createNameplate(),this.scene.add(this.group)}createShipMesh(){const e=new hn({color:10035746,roughness:.35,metalness:.8,flatShading:!0}),t=new hn({color:2237738,roughness:.5,metalness:.6}),i=new hn({color:54527,roughness:.1,metalness:.9,emissive:17510,emissiveIntensity:.5}),s=new Xi(1.2,5,5);s.rotateX(Math.PI/2);const r=new Qe(s,e);this.group.add(r);const o=new Xi(.55,2.2,4);o.rotateX(Math.PI/2);const a=new Qe(o,i);a.position.set(0,.45,-.4),this.group.add(a);const c=new un(5.2,.1,1.8),l=new Qe(c,e);l.position.set(0,-.1,.5),l.rotation.y=.1,this.group.add(l);const h=new un(.1,1.2,1.4),u=new Qe(h,t);u.position.set(-2.55,.45,.6),this.group.add(u);const f=u.clone();f.position.set(2.55,.45,.6),this.group.add(f);const m=new gi(.4,.5,.8,8);m.rotateX(Math.PI/2);const g=new Qe(m,t);g.position.set(-.7,0,2.3),this.group.add(g);const v=g.clone();v.position.set(.7,0,2.3),this.group.add(v);const p=new Xi(.35,2.2,8);p.rotateX(-Math.PI/2);const d=new Wt({color:43775,transparent:!0,opacity:.85,blending:nn}),_=new Qe(p,d);_.position.set(-.7,0,3.4),this.group.add(_),this.engineFlares.push(_);const y=_.clone();y.position.set(.7,0,3.4),this.group.add(y),this.engineFlares.push(y);const x=new Gs(3.2,16,12),C=new Wt({color:58879,wireframe:!0,transparent:!0,opacity:0});this.shieldMesh=new Qe(x,C),this.group.add(this.shieldMesh)}createNameplate(){this.nameCanvas=document.createElement("canvas"),this.nameCanvas.width=256,this.nameCanvas.height=64,this.updateNameplateTexture();const e=new Yr(this.nameCanvas),t=new Hu({map:e,transparent:!0});this.nameSprite=new ey(t),this.nameSprite.position.set(0,3.2,0),this.nameSprite.scale.set(7.5,1.8,1),this.group.add(this.nameSprite)}updateNameplateTexture(){if(!this.nameCanvas)return;const e=this.nameCanvas.getContext("2d");if(!e)return;e.clearRect(0,0,256,64),e.fillStyle="rgba(10, 16, 26, 0.75)",e.roundRect?e.roundRect(10,8,236,48,8):e.fillRect(10,8,236,48),e.fill(),e.strokeStyle="#00d4ff",e.lineWidth=2,e.stroke(),e.font='bold 20px "Segoe UI", sans-serif',e.fillStyle="#ffffff",e.textAlign="center",e.fillText(this.playerName,128,30);const t=Math.max(0,this.hp/this.maxHp);e.fillStyle="#222",e.fillRect(30,38,196,10),e.fillStyle=t>.4?"#00ff88":"#ff3344",e.fillRect(30,38,196*t,10),this.nameSprite&&this.nameSprite.material.map&&(this.nameSprite.material.map.needsUpdate=!0)}receiveNetworkState(e){e&&(this.lastPacketTime=performance.now(),e.name&&e.name!==this.playerName&&(this.playerName=e.name,this.updateNameplateTexture()),e.hp!==void 0&&e.hp!==this.hp&&(this.hp=e.hp,this.updateNameplateTexture()),this.isDead=!!e.isDead,this.isThrusting=!!e.thrust,this.strafeState=e.strafe||0,this.targetPosition.set(e.pos.x,e.pos.y,e.pos.z),this.targetQuaternion.set(e.quat._x||e.quat.x,e.quat._y||e.quat.y,e.quat._z||e.quat.z,e.quat._w||e.quat.w),e.vel&&this.targetVelocity.set(e.vel.x,e.vel.y,e.vel.z))}triggerShieldFlash(){this.shieldMesh&&(this.shieldMesh.material.opacity=.55)}update(e){if(this.isDead){this.group.visible=!1;return}this.group.visible=!0;const t=performance.now(),i=Math.min(.25,(t-this.lastPacketTime)/1e3),s=this.targetPosition.clone().addScaledVector(this.targetVelocity,i),r=Math.min(1,e*12);this.position.lerp(s,r),this.quaternion.slerp(this.targetQuaternion,Math.min(1,e*10));const o=this.isThrusting?.8+Math.random()*.4:.001;for(const a of this.engineFlares)a.scale.set(o,o,o),a.visible=this.isThrusting;this.shieldMesh&&this.shieldMesh.material.opacity>0&&(this.shieldMesh.material.opacity=Math.max(0,this.shieldMesh.material.opacity-e*2.5))}destroy(){this.scene.remove(this.group)}}class py{constructor(e){this.scene=e,this.maxParticles=2400,this.particles=[],this.geom=new vt,this.positions=new Float32Array(this.maxParticles*3),this.colors=new Float32Array(this.maxParticles*3),this.geom.setAttribute("position",new dt(this.positions,3)),this.geom.setAttribute("color",new dt(this.colors,3));let t=null;if(typeof document<"u")try{const i=document.createElement("canvas");i.width=64,i.height=64;const s=i.getContext("2d");if(s){const r=s.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255, 255, 255, 1)"),r.addColorStop(.2,"rgba(0, 220, 255, 0.85)"),r.addColorStop(.5,"rgba(0, 140, 255, 0.35)"),r.addColorStop(.8,"rgba(0, 60, 255, 0.1)"),r.addColorStop(1,"rgba(0, 0, 0, 0)"),s.fillStyle=r,s.fillRect(0,0,64,64),t=new Yr(i)}}catch{}this.mat=new Fs({size:5.5,map:t||void 0,vertexColors:!0,transparent:!0,opacity:.85,blending:nn,depthWrite:!1,sizeAttenuation:!0}),this.points=new Br(this.geom,this.mat),this.points.frustumCulled=!1,this.scene.add(this.points),this.emitTimer=0}emit(e,t,i=!1){this.particles.length>=this.maxParticles&&this.particles.shift();const s=(Math.random()-.5)*.6,r=(Math.random()-.5)*.6,o=(Math.random()-.5)*.6,a=e.clone().addScaledVector(t,-2.4);this.particles.push({x:a.x+s,y:a.y+r,z:a.z+o,vx:s*.4,vy:r*.4,vz:o*.4,age:0,maxAge:15,isHostile:i})}update(e){const t=this.geom.attributes.position,i=this.geom.attributes.color,s=this.particles.length;for(let r=s-1;r>=0;r--){const o=this.particles[r];if(o.age+=e,o.age>=o.maxAge){this.particles.splice(r,1);continue}o.x+=o.vx*e,o.y+=o.vy*e,o.z+=o.vz*e;const a=1-o.age/o.maxAge,c=Math.pow(a,1.6),l=r*3;this.positions[l]=o.x,this.positions[l+1]=o.y,this.positions[l+2]=o.z,o.isHostile?(this.colors[l]=1*c,this.colors[l+1]=.35*c,this.colors[l+2]=.15*c):(this.colors[l]=.15*c,this.colors[l+1]=.85*c,this.colors[l+2]=1*c)}this.maxParticles-this.particles.length;for(let r=this.particles.length;r<this.maxParticles;r++){const o=r*3;this.positions[o]=0,this.positions[o+1]=0,this.positions[o+2]=0,this.colors[o]=0,this.colors[o+1]=0,this.colors[o+2]=0}t.needsUpdate=!0,i.needsUpdate=!0}cleanup(){this.scene.remove(this.points),this.particles=[]}}class my{constructor(e){this.scene=e,this.ripples=[],this.ringGeom=new dc(.8,1.2,32),this.ringGeom.rotateX(Math.PI/2),this.sphereGeom=new Kr(1,2)}emitRipple(e,t=58879){const i=new bn;i.position.copy(e);const s=new Wt({color:t,wireframe:!0,transparent:!0,opacity:.85,blending:nn,depthWrite:!1}),r=new Qe(this.sphereGeom,s);i.add(r);const o=new Wt({color:16777215,transparent:!0,opacity:.95,side:on,blending:nn,depthWrite:!1}),a=new Qe(this.ringGeom,o);i.add(a);const c=new Ps(t,4,180);i.add(c),this.scene.add(i),this.ripples.push({group:i,sphereMesh:r,ringMesh:a,light:c,age:0,maxAge:2.5,maxRadius:280})}update(e){for(let t=this.ripples.length-1;t>=0;t--){const i=this.ripples[t];if(i.age+=e,i.age>=i.maxAge){this.scene.remove(i.group),this.ripples.splice(t,1);continue}const s=i.age/i.maxAge,r=2+Math.pow(s,.75)*i.maxRadius,o=Math.max(0,(1-s)*.9);i.sphereMesh.scale.set(r,r,r),i.sphereMesh.material.opacity=o,i.ringMesh.scale.set(r*1.05,r*1.05,r*1.05),i.ringMesh.material.opacity=o*1.2,i.light.distance=r*1.5,i.light.intensity=Math.max(0,(1-s)*4.5)}}cleanup(){for(const e of this.ripples)this.scene.remove(e.group);this.ripples=[]}}class gy{constructor(){this.logs=[],this.maxLogs=500,this.engineRef=null,this.startTime=Date.now(),this.webglInfo=null,this.lastFps=0,this.frameCount=0,this.fpsTimer=performance.now(),this.interceptConsole(),this.listenToErrors()}setEngine(e){if(this.engineRef=e,e&&e.renderer)try{const t=e.renderer.getContext(),i=t.getExtension("WEBGL_debug_renderer_info");this.webglInfo={renderer:i?t.getParameter(i.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER),vendor:i?t.getParameter(i.UNMASKED_VENDOR_WEBGL):t.getParameter(t.VENDOR),version:t.getParameter(t.VERSION),shadingLanguageVersion:t.getParameter(t.SHADING_LANGUAGE_VERSION),maxTextureSize:t.getParameter(t.MAX_TEXTURE_SIZE)},this.log("SYS",`WebGL Initialized: ${this.webglInfo.renderer}`)}catch(t){this.log("SYS",`WebGL info inspection error: ${t.message}`)}}interceptConsole(){const e=console.log.bind(console),t=console.warn.bind(console),i=console.error.bind(console);console.log=(...s)=>{this.log("LOG",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),e(...s)},console.warn=(...s)=>{this.log("WARN",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),t(...s)},console.error=(...s)=>{this.log("ERROR",s.map(r=>typeof r=="object"?JSON.stringify(r):String(r)).join(" ")),i(...s)}}listenToErrors(){window.addEventListener("error",e=>{this.log("UNCAUGHT",`${e.message} at ${e.filename}:${e.lineno}:${e.colno}`)}),window.addEventListener("unhandledrejection",e=>{var t;this.log("REJECTION",`${((t=e.reason)==null?void 0:t.message)||e.reason}`)})}log(e,t){const s=`[${((Date.now()-this.startTime)/1e3).toFixed(2)}s][${e}] ${t}`;this.logs.push(s),this.logs.length>this.maxLogs&&this.logs.shift()}recordFrame(){this.frameCount++;const e=performance.now();e-this.fpsTimer>=1e3&&(this.lastFps=Math.round(this.frameCount*1e3/(e-this.fpsTimer)),this.frameCount=0,this.fpsTimer=e)}generateDiagnosticReport(){var i,s,r,o,a,c,l,h,u,f,m,g;const e=[];if(e.push("================ ROCKETS CLIENT DIAGNOSTICS ================"),e.push(`Timestamp: ${new Date().toISOString()}`),e.push(`User Agent: ${navigator.userAgent}`),e.push(`Screen Resolution: ${window.screen.width}x${window.screen.height} (Pixel Ratio: ${window.devicePixelRatio})`),e.push(`Window Inner Size: ${window.innerWidth}x${window.innerHeight}`),e.push(`Orientation: ${((i=screen.orientation)==null?void 0:i.type)||"unknown"}`),e.push(`Touch Supported: ${"ontouchstart"in window||navigator.maxTouchPoints>0} (Max Points: ${navigator.maxTouchPoints})`),e.push(""),e.push("--- WebGL Environment ---"),this.webglInfo?(e.push(`Renderer: ${this.webglInfo.renderer}`),e.push(`Vendor: ${this.webglInfo.vendor}`),e.push(`WebGL Version: ${this.webglInfo.version}`),e.push(`Max Texture Size: ${this.webglInfo.maxTextureSize}`)):e.push("WebGL Info: Not yet captured or WebGL unavailable"),e.push(""),e.push("--- Engine & Simulation State ---"),this.engineRef){const v=this.engineRef;if(e.push(`Is Engine Running: ${v.isRunning}`),e.push(`Render FPS: ${this.lastFps}`),e.push(`Canvas Size: ${(r=(s=v.renderer)==null?void 0:s.domElement)==null?void 0:r.width}x${(a=(o=v.renderer)==null?void 0:o.domElement)==null?void 0:a.height}`),e.push(`Canvas Container Size: ${(c=v.container)==null?void 0:c.clientWidth}x${(l=v.container)==null?void 0:l.clientHeight}`),e.push(`Scene Children Count: ${((u=(h=v.scene)==null?void 0:h.children)==null?void 0:u.length)||0}`),e.push(`Asteroids Spawned: ${((m=(f=v.spaceEnv)==null?void 0:f.asteroids)==null?void 0:m.length)||0}`),v.playerShip){const p=v.playerShip;e.push(`Ship Position: (${p.position.x.toFixed(2)}, ${p.position.y.toFixed(2)}, ${p.position.z.toFixed(2)})`),e.push(`Ship Velocity: (${p.velocity.x.toFixed(2)}, ${p.velocity.y.toFixed(2)}, ${p.velocity.z.toFixed(2)}) [Speed: ${p.getSpeed().toFixed(1)}]`),e.push(`Ship Quaternion: (${p.quaternion.x.toFixed(3)}, ${p.quaternion.y.toFixed(3)}, ${p.quaternion.z.toFixed(3)}, ${p.quaternion.w.toFixed(3)})`),e.push(`Ship HP: ${p.hp}/${p.maxHp} (isDead: ${p.isDead}, invuln: ${p.invulnerableTimer.toFixed(1)})`),e.push(`Active Inputs: thrust=${p.input.thrust}, brake=${p.input.brake}, strafeL=${p.input.strafeLeft}, strafeR=${p.input.strafeRight}, analogPitch=${p.input.analogPitch.toFixed(2)}, analogYaw=${p.input.analogYaw.toFixed(2)}`)}v.network&&(e.push(`Network Self ID: ${v.network.selfId}`),e.push(`Network Room ID: ${v.network.roomId}`),e.push(`Network isMaster: ${v.network.isMaster}`),e.push(`Connected Peers: ${((g=v.network.peers)==null?void 0:g.size)||0}`))}else e.push("Engine Reference: None (Engine not attached)");e.push(""),e.push("--- Recent Event Stream (Last 50 Logs) ---");const t=this.logs.slice(-50);for(const v of t)e.push(v);return e.push("============================================================"),e.join(`
`)}async copyToClipboard(){const e=this.generateDiagnosticReport();if(navigator.clipboard&&navigator.clipboard.writeText)try{return await navigator.clipboard.writeText(e),!0}catch{}return window.prompt("Copy diagnostic report below (Ctrl+C / Cmd+C):",e),!0}}const bt=new gy;class _y{constructor({container:e,network:t,mapSeed:i,onHudUpdate:s,onDeathNotice:r}){this.container=e,this.network=t,this.mapSeed=i,this.onHudUpdate=s||(()=>{}),this.onDeathNotice=r||(()=>{}),this.scene=null,this.camera=null,this.renderer=null,this.spaceEnv=null,this.cockpit=null,this.playerShip=null,this.weaponsSystem=null,this.remoteShips=new Map,this.isRunning=!1,this.lastTime=performance.now(),this.animFrameId=null,this.lastWidth=0,this.lastHeight=0,this.isPointerLocked=!1,this.mouseSensitivity=.0022,this.isFiringCannon=!1,this.broadcastTimer=0,this.broadcastInterval=1/20,this.thrusterTrails=null,this.beaconSystem=null,this.trailEmitTimer=0,this.timeSinceLastCombat=0,this.beaconPulseTimer=0,this.netStatsTimer=0,this.initThree(),this.setupNetworkHandlers(),this.setupInputListeners(),bt.setEngine(this),bt.log("ENGINE",`GameEngine initialized with seed ${this.mapSeed}`)}initThree(){this.scene=new Jv,this.scene.background=new qe(264212),this.scene.fog=new hc(264212,1e-4);const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;this.camera=new Ot(75,e/t,.1,4e3),this.scene.add(this.camera),this.renderer=new Zv({antialias:!0,powerPreference:"high-performance",precision:"highp",stencil:!1,alpha:!1}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.toneMapping=hu,this.renderer.toneMappingExposure=1.2,this.renderer.domElement.style.transform="translateZ(0)",this.renderer.domElement.style.willChange="transform",this.container.appendChild(this.renderer.domElement),this.spaceEnv=new cy(this.scene,this.mapSeed),this.playerShip=new hy(this.camera,this.spaceEnv),this.playerShip.resetSpawn(),this.cockpit=new ly(this.camera),this.weaponsSystem=new fy(this.scene,this.spaceEnv,this.network),this.thrusterTrails=new py(this.scene),this.beaconSystem=new my(this.scene),window.addEventListener("resize",this.onWindowResize.bind(this))}setupNetworkHandlers(){this.network.onPeerJoined=e=>{if(!(!e||typeof e!="string")){if(!this.remoteShips.has(e)){const t=new ah(e,this.scene,`Pilot-${e.slice(0,4)}`);this.remoteShips.set(e,t)}bt.log("NET",`Peer joined: ${e}`)}},this.network.onPeerLeft=e=>{!e||typeof e!="string"||(this.remoteShips.has(e)&&(this.remoteShips.get(e).destroy(),this.remoteShips.delete(e)),bt.log("NET",`Peer left: ${e}`))},this.network.onHit(e=>{if(this.timeSinceLastCombat=0,e.targetId===this.network.selfId){const t=this.playerShip.takeDamage(e.damage);this.cockpit.triggerDamageFlash(),Ft.playDamageHit(),t&&(Ft.playExplosion(2.2),this.network.broadcastKill(this.network.selfId,e.attackerId,e.attackerName),this.onDeathNotice(`💥 Destroyed by ${e.attackerName||"Unknown Pilot"}`))}else this.remoteShips.has(e.targetId)&&this.remoteShips.get(e.targetId).triggerShieldFlash()}),this.weaponsSystem&&(this.network.onCannon(()=>{this.timeSinceLastCombat=0}),this.network.onMine(()=>{this.timeSinceLastCombat=0})),this.network.onKill(e=>{this.timeSinceLastCombat=0,e.killerId===this.network.selfId&&(this.playerShip.recordKill(),Ft.playScoreChime(),this.onDeathNotice(`🎯 You eliminated ${e.victimId?e.victimId.slice(0,5):"Enemy"}! (+100 PTS)`))})}setupInputListeners(){window.addEventListener("keydown",e=>{if(!(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"))switch(e.code){case"KeyW":this.playerShip.input.thrust=!0;break;case"KeyS":this.playerShip.input.brake=!0;break;case"KeyA":this.playerShip.input.strafeLeft||Ft.playStrafeBurst(),this.playerShip.input.strafeLeft=!0;break;case"KeyD":this.playerShip.input.strafeRight||Ft.playStrafeBurst(),this.playerShip.input.strafeRight=!0;break;case"KeyQ":this.playerShip.input.rollLeft=!0;break;case"KeyE":this.playerShip.input.rollRight=!0;break;case"ArrowUp":this.playerShip.input.pitchUp=!0;break;case"ArrowDown":this.playerShip.input.pitchDown=!0;break;case"ArrowLeft":this.playerShip.input.yawLeft=!0;break;case"ArrowRight":this.playerShip.input.yawRight=!0;break;case"Space":this.isFiringCannon=!0,e.preventDefault();break;case"KeyF":this.weaponsSystem.triggerRearMine(this.playerShip);break}}),window.addEventListener("keyup",e=>{switch(e.code){case"KeyW":this.playerShip.input.thrust=!1;break;case"KeyS":this.playerShip.input.brake=!1;break;case"KeyA":this.playerShip.input.strafeLeft=!1;break;case"KeyD":this.playerShip.input.strafeRight=!1;break;case"KeyQ":this.playerShip.input.rollLeft=!1;break;case"KeyE":this.playerShip.input.rollRight=!1;break;case"ArrowUp":this.playerShip.input.pitchUp=!1;break;case"ArrowDown":this.playerShip.input.pitchDown=!1;break;case"ArrowLeft":this.playerShip.input.yawLeft=!1;break;case"ArrowRight":this.playerShip.input.yawRight=!1;break;case"Space":this.isFiringCannon=!1;break}}),this.renderer.domElement.addEventListener("mousedown",e=>{e.button===0?this.isFiringCannon=!0:e.button===2&&this.weaponsSystem.triggerRearMine(this.playerShip)}),window.addEventListener("mouseup",e=>{e.button===0&&(this.isFiringCannon=!1)}),this.renderer.domElement.addEventListener("contextmenu",e=>e.preventDefault()),this.renderer.domElement.addEventListener("click",()=>{var e,t;document.pointerLockElement||(t=(e=this.renderer.domElement).requestPointerLock)==null||t.call(e)}),document.addEventListener("pointerlockchange",()=>{this.isPointerLocked=document.pointerLockElement===this.renderer.domElement}),document.addEventListener("mousemove",e=>{this.isPointerLocked&&(this.playerShip.input.analogYaw=-e.movementX*this.mouseSensitivity*25,this.playerShip.input.analogPitch=-e.movementY*this.mouseSensitivity*25)})}onWindowResize(){if(!this.container||!this.renderer||!this.camera)return;const e=this.container.clientWidth,t=this.container.clientHeight;this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}start(){this.isRunning=!0,this.lastTime=performance.now(),this.loop()}stop(){this.isRunning=!1,this.animFrameId&&cancelAnimationFrame(this.animFrameId)}loop(){if(this.isRunning){this.animFrameId=requestAnimationFrame(this.loop.bind(this));try{bt.recordFrame();const e=this.container.clientWidth||window.innerWidth,t=this.container.clientHeight||window.innerHeight;e>0&&t>0&&(e!==this.lastWidth||t!==this.lastHeight)&&(this.lastWidth=e,this.lastHeight=t,this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1));const i=performance.now(),s=Math.min(.1,(i-this.lastTime)/1e3);this.lastTime=i,this.isPointerLocked&&(this.playerShip.input.analogPitch*=.7,this.playerShip.input.analogYaw*=.7),this.playerShip.update(s),Ft.updateEngine(this.playerShip.input.thrust,this.playerShip.input.brake,s),this.isFiringCannon&&(this.timeSinceLastCombat=0),this.weaponsSystem.triggerCannon(this.isFiringCannon,this.playerShip,i),this.weaponsSystem.update(s,this.playerShip,this.remoteShips,(o,a,c)=>{this.timeSinceLastCombat=0,this.cockpit.triggerDamageFlash()});for(const[o,a]of this.network.peers.entries()){if(!o||typeof o!="string")continue;if(!this.remoteShips.has(o)){const l=(a==null?void 0:a.name)||`Pilot-${o.slice(0,4)}`,h=new ah(o,this.scene,l);this.remoteShips.set(o,h)}const c=this.remoteShips.get(o);c&&(a!=null&&a.lastState)&&c.receiveNetworkState(a.lastState),c&&c.update(s)}if(this.timeSinceLastCombat+=s,this.network.peers.size>0&&this.timeSinceLastCombat>=30){if(this.beaconPulseTimer+=s,this.beaconPulseTimer>=3.5){this.beaconPulseTimer=0,this.beaconSystem.emitRipple(this.playerShip.position,54527);for(const o of this.remoteShips.values())o.isDead||this.beaconSystem.emitRipple(o.position,16724821);Ft.playEngagementBeacon(),bt.log("BEACON",`Engagement beacon pulse emitted across sector (inactivity: ${Math.round(this.timeSinceLastCombat)}s)`)}}else this.beaconPulseTimer=0;if(this.trailEmitTimer+=s,this.trailEmitTimer>=.12){this.trailEmitTimer=0,(this.playerShip.input.thrust||this.playerShip.getSpeed()>10)&&this.thrusterTrails.emit(this.playerShip.position,this.playerShip.getForwardVector(),!1);for(const o of this.remoteShips.values())if(!o.isDead&&(o.isThrusting||o.targetVelocity.length()>10)){const a=new O(0,0,-1).applyQuaternion(o.quaternion);this.thrusterTrails.emit(o.position,a,!0)}}if(this.thrusterTrails.update(s),this.beaconSystem.update(s),this.netStatsTimer+=s,this.netStatsTimer>=5){this.netStatsTimer=0;const o=Array.from(this.network.peers.entries());if(o.length===0)bt.log("NET_STATS",`Connected Peers: 0 | Inactivity: ${Math.round(this.timeSinceLastCombat)}s | Master: ${this.network.isMaster}`);else{const a=o.map(([c,l])=>{const h=this.remoteShips.get(c),u=h?Math.round(this.playerShip.position.distanceTo(h.position)):"N/A",f=l.packetsReceived?(l.packetsReceived/5).toFixed(1):"0.0",m=Date.now()-(l.lastSeen||Date.now());l.packetsReceived=0;const g=h?`(${h.position.x.toFixed(1)}, ${h.position.y.toFixed(1)}, ${h.position.z.toFixed(1)})`:"N/A";return`Peer[${c.slice(0,5)}]: ${f} pkt/s, ping ${l.ping||0}ms, seen ${m}ms ago, dist ${u}u, pos ${g}, inScene: ${h?!!h.group.parent:!1}`}).join(" | ");bt.log("NET_STATS",`Peers (${o.length}): ${a}`)}}const r={thrust:this.playerShip.input.thrust,brake:this.playerShip.input.brake,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),pitch:(this.playerShip.input.pitchUp?1:0)-(this.playerShip.input.pitchDown?1:0)+this.playerShip.input.analogPitch,roll:(this.playerShip.input.rollRight?1:0)-(this.playerShip.input.rollLeft?1:0)};this.cockpit.update(s,r,this.playerShip.velocity),this.spaceEnv.update(s,this.playerShip.position,this.playerShip.velocity),this.broadcastTimer+=s,this.broadcastTimer>=this.broadcastInterval&&(this.broadcastTimer=0,this.network.broadcastLocalState({pos:{x:this.playerShip.position.x,y:this.playerShip.position.y,z:this.playerShip.position.z},quat:{x:this.playerShip.quaternion.x,y:this.playerShip.quaternion.y,z:this.playerShip.quaternion.z,w:this.playerShip.quaternion.w},vel:{x:this.playerShip.velocity.x,y:this.playerShip.velocity.y,z:this.playerShip.velocity.z},thrust:this.playerShip.input.thrust,strafe:(this.playerShip.input.strafeRight?1:0)-(this.playerShip.input.strafeLeft?1:0),hp:this.playerShip.hp,shield:this.playerShip.shield,isDead:this.playerShip.isDead,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths})),this.renderer.render(this.scene,this.camera),this.onHudUpdate({hp:this.playerShip.hp,maxHp:this.playerShip.maxHp,shield:Math.round(this.playerShip.shield),maxShield:this.playerShip.maxShield,speed:Math.round(this.playerShip.getSpeed()),maxSpeed:Math.round(this.playerShip.maxSpeed),cannonEnergy:Math.round(this.weaponsSystem.cannonEnergy),cannonMaxEnergy:this.weaponsSystem.cannonMaxEnergy,cannonRecharging:this.weaponsSystem.cannonCooldownTimer<=0&&this.weaponsSystem.cannonEnergy<this.weaponsSystem.cannonMaxEnergy,mineCharges:this.weaponsSystem.mineCharges,mineMaxCharges:this.weaponsSystem.mineMaxCharges,mineRechargeProgress:this.weaponsSystem.mineRechargeProgress,isDead:this.playerShip.isDead,respawnCountdown:Math.ceil(this.playerShip.respawnTimer),invulnerable:this.playerShip.invulnerableTimer>0,inactivityBeacon:this.network.peers.size>0&&this.timeSinceLastCombat>=30,score:this.playerShip.score,kills:this.playerShip.kills,deaths:this.playerShip.deaths,activePeersCount:this.network.peers.size+1,isMaster:this.network.isMaster,masterId:this.network.currentMasterId,avgPing:this.network.getAveragePing()})}catch(e){bt.log("CRASH",`Render loop exception: ${e.message}
${e.stack}`)}}}destroy(){this.stop(),this.weaponsSystem&&this.weaponsSystem.cleanup(),this.thrusterTrails&&this.thrusterTrails.cleanup(),this.beaconSystem&&this.beaconSystem.cleanup(),this.renderer&&this.renderer.domElement&&this.renderer.domElement.parentNode&&this.renderer.domElement.parentNode.removeChild(this.renderer.domElement)}}class vy{constructor(e,t){this.container=e,this.engine=t,this.hudElement=null,this.createDom(),this.bindJoystick(),this.bindTouchControls(),this.bindFullscreen(),this.bindDiagnostics();const i=document.getElementById("hud-room-title");i&&this.engine&&this.engine.network&&(i.textContent=this.engine.network.roomName||this.engine.network.roomId||"Orion Sector")}createDom(){this.hudElement=document.createElement("div"),this.hudElement.className="game-hud-overlay",this.hudElement.innerHTML=`
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
            <div class="hud-compact-meter meter-shield">
              <span class="meter-label">SHIELD</span>
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

            <div class="hud-beacon-pill" id="hud-beacon-pill" style="display: none;">
              📡 BEACON ACTIVE (30s)
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
    `,this.container.appendChild(this.hudElement)}bindJoystick(){const e=document.getElementById("touch-joystick-container"),t=document.getElementById("joystick-base"),i=document.getElementById("joystick-knob");if(!e||!t||!i)return;const s=this.engine.playerShip.input,r=45;let o=null,a=!1;const c=(h,u)=>{const f=t.getBoundingClientRect(),m=f.left+f.width/2,g=f.top+f.height/2;let v=h-m,p=u-g;const d=Math.sqrt(v*v+p*p);d>r&&(v=v/d*r,p=p/d*r),i.style.transform=`translate(${v}px, ${p}px)`,s.analogPitch=-(p/r),s.analogYaw=-(v/r)},l=()=>{o=null,a=!1,i.style.transform="translate(0px, 0px)",s.analogPitch=0,s.analogYaw=0};e.addEventListener("touchstart",h=>{if(h.preventDefault(),h.stopPropagation(),o===null&&h.touches.length>0){const u=h.touches[0];o=u.identifier,c(u.clientX,u.clientY),bt.log("TOUCH",`Joystick touchstart at (${Math.round(u.clientX)}, ${Math.round(u.clientY)})`)}},{passive:!1}),e.addEventListener("touchmove",h=>{if(h.preventDefault(),h.stopPropagation(),o!==null){for(let u=0;u<h.touches.length;u++)if(h.touches[u].identifier===o){c(h.touches[u].clientX,h.touches[u].clientY);break}}},{passive:!1}),e.addEventListener("touchend",h=>{h.preventDefault(),l()},{passive:!1}),e.addEventListener("touchcancel",h=>{l()},{passive:!1}),e.addEventListener("pointerdown",h=>{h.pointerType!=="touch"&&(h.preventDefault(),a=!0,c(h.clientX,h.clientY))}),window.addEventListener("pointermove",h=>{a&&c(h.clientX,h.clientY)}),window.addEventListener("pointerup",()=>{a&&l()})}bindTouchControls(){const e=this.engine.playerShip.input,t=(o,a,c)=>{const l=document.getElementById(o);if(!l)return;let h=!1;const u=m=>{m&&(m.preventDefault(),m.stopPropagation()),!h&&(h=!0,a(),l.classList.add("active"),bt.log("INPUT",`Button [${o}] ACTIVATED`))},f=m=>{h&&(h=!1,c(),l.classList.remove("active"),bt.log("INPUT",`Button [${o}] RELEASED`))};l.addEventListener("touchstart",u,{passive:!1}),l.addEventListener("touchend",f,{passive:!1}),l.addEventListener("touchcancel",f,{passive:!1}),l.addEventListener("pointerdown",m=>{m.pointerType!=="touch"&&u(m)}),l.addEventListener("pointerup",f),l.addEventListener("pointerleave",f),window.addEventListener("pointerup",f)};t("btn-roll-left",()=>e.rollLeft=!0,()=>e.rollLeft=!1),t("btn-roll-right",()=>e.rollRight=!0,()=>e.rollRight=!1),t("btn-strafe-left",()=>{Ft.playStrafeBurst(),e.strafeLeft=!0},()=>e.strafeLeft=!1),t("btn-strafe-right",()=>{Ft.playStrafeBurst(),e.strafeRight=!0},()=>e.strafeRight=!1),t("btn-thrust",()=>e.thrust=!0,()=>e.thrust=!1),t("btn-brake",()=>e.brake=!0,()=>e.brake=!1),t("btn-cannon",()=>this.engine.isFiringCannon=!0,()=>this.engine.isFiringCannon=!1);const i=document.getElementById("btn-mine");if(i){const o=a=>{a&&(a.preventDefault(),a.stopPropagation()),this.engine.weaponsSystem.triggerRearMine(this.engine.playerShip),i.classList.add("active"),bt.log("INPUT","Rear Mine Triggered"),setTimeout(()=>i.classList.remove("active"),150)};i.addEventListener("touchstart",o,{passive:!1}),i.addEventListener("pointerdown",a=>{a.pointerType!=="touch"&&o(a)})}const s=document.getElementById("hud-btn-copy");s&&s.addEventListener("click",()=>{const o=window.location.origin+window.location.pathname+`?room=${encodeURIComponent(this.engine.network.roomId)}`;navigator.clipboard.writeText(o).then(()=>{s.textContent="✅ Copied!",setTimeout(()=>s.textContent="📋 Invite",2e3)}).catch(()=>{prompt("Share this match link:",o)})});const r=document.getElementById("hud-btn-leave");r&&r.addEventListener("click",()=>{confirm("Leave current match and return to lobby?")&&(window.location.href=window.location.origin+window.location.pathname)})}bindDiagnostics(){const e=document.getElementById("hud-btn-diag"),t=document.getElementById("hud-diag-backdrop"),i=document.getElementById("btn-close-diag"),s=document.getElementById("btn-copy-diag-text"),r=document.getElementById("diag-text-display");!e||!t||(e.addEventListener("click",()=>{r&&(r.textContent=bt.generateDiagnosticReport()),t.style.display="flex"}),i&&i.addEventListener("click",()=>{t.style.display="none"}),s&&s.addEventListener("click",async()=>{await bt.copyToClipboard(),s.textContent="✅ Copied to Clipboard!",setTimeout(()=>{s.textContent="📋 Copy Log to Clipboard"},2500)}))}bindFullscreen(){const e=document.getElementById("hud-btn-fullscreen"),t=document.getElementById("btn-rotate-fullscreen"),i=()=>{if(!document.fullscreenElement&&!document.webkitFullscreenElement){const r=document.documentElement;r.requestFullscreen?r.requestFullscreen().catch(()=>{}):r.webkitRequestFullscreen&&r.webkitRequestFullscreen();try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{})}catch{}}else document.exitFullscreen?document.exitFullscreen().catch(()=>{}):document.webkitExitFullscreen&&document.webkitExitFullscreen()};e&&e.addEventListener("click",i),t&&t.addEventListener("click",i);const s=()=>{const r=!!(document.fullscreenElement||document.webkitFullscreenElement);e&&(e.textContent=r?"⛶ Exit":"⛶ Fullscreen")};document.addEventListener("fullscreenchange",s),document.addEventListener("webkitfullscreenchange",s)}showCombatMessage(e){const t=document.getElementById("hud-combat-feed");if(!t)return;const i=document.createElement("div");i.className="combat-feed-item",i.textContent=e,t.appendChild(i),setTimeout(()=>{i.classList.add("fade-out"),setTimeout(()=>i.remove(),400)},3500)}update(e){const t=document.getElementById("hud-room-title");t&&(t.textContent=this.engine.network.roomName||"Orion Sector");const i=document.getElementById("hud-peers-count");i&&(i.textContent=`👥 ${e.activePeersCount} Pilot${e.activePeersCount===1?"":"s"}`);const s=document.getElementById("hud-ping-val");s&&(s.textContent=`📡 ${e.avgPing}ms`);const r=document.getElementById("hud-shield-bar"),o=document.getElementById("hud-shield-num"),a=Math.round((e.shield!==void 0?e.shield:100)/(e.maxShield||100)*100);r&&(r.style.width=`${a}%`),o&&(o.textContent=`${a}%`);const c=document.getElementById("hud-hp-bar"),l=document.getElementById("hud-hp-num"),h=Math.round(e.hp/e.maxHp*100);c&&(c.style.width=`${h}%`,c.className=h>35?"gauge-bar-fill bar-hp":"gauge-bar-fill bar-hp bar-hp-critical"),l&&(l.textContent=`${h}%`);const u=document.getElementById("hud-beacon-pill");u&&(u.style.display=e.inactivityBeacon?"inline-flex":"none");const f=document.getElementById("hud-shield-status");f&&(e.invulnerable?(f.textContent="🛡️ INVULNERABLE",f.style.color="#00ffff"):e.hp<=35?(f.textContent="CRITICAL",f.style.color="#ff3344"):(f.textContent="ACTIVE",f.style.color="#00ff88"));const m=document.getElementById("hud-score-val");m&&(m.textContent=e.score);const g=document.getElementById("hud-kills-val");g&&(g.textContent=e.kills);const v=document.getElementById("hud-deaths-val");v&&(v.textContent=e.deaths);const p=document.getElementById("hud-speed-val");p&&(p.textContent=e.speed);const d=document.getElementById("hud-cannon-bar"),_=document.getElementById("hud-cannon-pct"),y=document.getElementById("hud-cannon-status");d&&(d.style.width=`${e.cannonEnergy}%`),_&&(_.textContent=`${e.cannonEnergy}%`),y&&(e.cannonRecharging?(y.textContent="RECHARGING...",y.style.color="#00ffff"):e.cannonEnergy<15?(y.textContent="COOLDOWN",y.style.color="#ffaa00"):(y.textContent="READY (TTK 2s)",y.style.color="#88aacc"));const x=document.getElementById("mine-dot-1"),C=document.getElementById("mine-dot-2");x&&(x.className=e.mineCharges>=1?"mine-dot active":"mine-dot empty"),C&&(C.className=e.mineCharges>=2?"mine-dot active":"mine-dot empty");const b=document.getElementById("hud-respawn-overlay"),R=document.getElementById("hud-respawn-counter");b&&R&&(e.isDead?(b.style.display="flex",R.textContent=`Respawning in ${e.respawnCountdown}s...`):b.style.display="none")}destroy(){this.hudElement&&this.hudElement.parentNode&&this.hudElement.parentNode.removeChild(this.hudElement)}}const qo=document.getElementById("app"),ch=["Nebula-Orion","Andromeda-Deep","Centauri-Prime","Cygnus-Rift","Cassiopeia-Void","Pegasus-Belt","Vela-Pulsar","Perseus-Arm"];function lh(){const n=ch[Math.floor(Math.random()*ch.length)],e=Math.floor(100+Math.random()*900);return`${n}-${e}`}class yy{constructor(){this.currentMode="lobby",this.engine=null,this.network=null,this.hud=null,this.playerName=localStorage.getItem("rockets_pilot_name")||`Pilot-${Math.floor(1e3+Math.random()*9e3)}`,this.init()}init(){const t=new URLSearchParams(window.location.search).get("room");t?this.startMatch({roomId:t,roomName:t,mapSeed:Math.abs(this.hashCode(t))}):this.renderLobby()}hashCode(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i),t|=0;return t}renderLobby(){this.currentMode="lobby",qo.innerHTML=`
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
              <input type="text" id="sector-name-input" class="lobby-input" value="${lh()}" />
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
    `;const e=document.getElementById("pilot-name-input");e&&e.addEventListener("input",h=>{this.playerName=h.target.value.trim()||"Pilot",localStorage.setItem("rockets_pilot_name",this.playerName)});let t=window.__pwaDeferredPrompt;const i=document.getElementById("pwa-install-banner"),s=document.getElementById("btn-pwa-install");t&&i&&(i.style.display="flex"),window.addEventListener("beforeinstallprompt",h=>{h.preventDefault(),window.__pwaDeferredPrompt=h,i&&(i.style.display="flex")}),s&&s.addEventListener("click",()=>{const h=window.__pwaDeferredPrompt;h&&(h.prompt(),h.userChoice.then(()=>{i&&(i.style.display="none")}))});const r=document.getElementById("btn-create-match"),o=document.getElementById("sector-name-input");r&&r.addEventListener("click",()=>{const h=o.value.trim()||lh(),u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const a=document.getElementById("btn-direct-join"),c=document.getElementById("join-room-input");a&&a.addEventListener("click",()=>{const h=c.value.trim();if(!h){alert("Please enter a Room Code or Sector ID to join.");return}const u=h.toLowerCase().replace(/[^a-z0-9_-]/g,"-");this.startMatch({roomId:u,roomName:h,mapSeed:Math.abs(this.hashCode(u))})});const l=document.getElementById("btn-refresh-rooms");l&&l.addEventListener("click",()=>{ci.refreshRooms()}),ci.init(),ci.onRoomsUpdated(h=>{this.updateRoomsListUI(h)})}updateRoomsListUI(e){const t=document.getElementById("rooms-list-container");if(!t)return;if(!e||e.length===0){t.innerHTML='<div class="rooms-empty">No active matches found. Click <strong>LAUNCH SECTOR</strong> above to host one!</div>';return}t.innerHTML=e.map(s=>`
      <div class="room-list-item">
        <div class="room-item-meta">
          <span class="room-item-name">🛰️ ${$o(s.roomName||s.roomId)}</span>
          <div class="room-item-details">
            <span>👥 ${s.playerCount||1} Pilot${s.playerCount===1?"":"s"}</span>
            <span>👑 Host: Pilot-${(s.masterId||"Host").slice(0,4)}</span>
            <span class="room-ttl-badge">⏳ TTL: ${s.ttlSecondsRemaining}s</span>
          </div>
        </div>
        <button class="btn-join-room-item" data-room-id="${$o(s.roomId)}" data-room-name="${$o(s.roomName||s.roomId)}" data-seed="${s.mapSeed||42}">
          JOIN SECTOR
        </button>
      </div>
    `).join(""),t.querySelectorAll(".btn-join-room-item").forEach(s=>{s.addEventListener("click",()=>{const r=s.getAttribute("data-room-id"),o=s.getAttribute("data-room-name"),a=parseInt(s.getAttribute("data-seed"),10)||42;this.startMatch({roomId:r,roomName:o,mapSeed:a})})})}startMatch({roomId:e,roomName:t,mapSeed:i}){this.currentMode="game",qo.innerHTML="";const s=document.createElement("div");s.id="game-canvas-container",s.style.width="100%",s.style.height="100%",s.style.position="relative",s.style.overflow="hidden",qo.appendChild(s);const r=`${window.location.pathname}?room=${encodeURIComponent(e)}`;window.history.pushState({path:r},"",r),this.network=new Zf({roomId:e,roomName:t,mapSeed:i,playerName:this.playerName,onCombatLog:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.engine=new _y({container:s,network:this.network,mapSeed:i,onHudUpdate:o=>{this.hud&&this.hud.update(o)},onDeathNotice:o=>{this.hud&&this.hud.showCombatMessage(o)}}),this.hud=new vy(s,this.engine);try{this.network.join()}catch(o){console.error("[Network] joinRoom exception:",(o==null?void 0:o.message)||o)}this.engine.start()}}function $o(n){return n?n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"):""}new yy;
//# sourceMappingURL=index-D7p12I0-.js.map
