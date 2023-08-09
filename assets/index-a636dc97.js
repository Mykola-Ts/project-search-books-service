import"./shopping-list-25fae0b4.js";function Ke(e){e.style.display="flex",e.style.justifyContent="center",e.style.alignItems="center",e.innerHTML='<span class="loader"></span>'}function Ge(e){e.removeAttribute("style"),e.innerHTML=""}function Ae(e,t){return function(){return e.apply(t,arguments)}}const{toString:Xe}=Object.prototype,{getPrototypeOf:ce}=Object,J=(e=>t=>{const n=Xe.call(t);return e[n]||(e[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),R=e=>(e=e.toLowerCase(),t=>J(t)===e),W=e=>t=>typeof t===e,{isArray:P}=Array,_=W("undefined");function Qe(e){return e!==null&&!_(e)&&e.constructor!==null&&!_(e.constructor)&&k(e.constructor.isBuffer)&&e.constructor.isBuffer(e)}const Le=R("ArrayBuffer");function Ye(e){let t;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?t=ArrayBuffer.isView(e):t=e&&e.buffer&&Le(e.buffer),t}const Ze=W("string"),k=W("function"),Te=W("number"),V=e=>e!==null&&typeof e=="object",et=e=>e===!0||e===!1,I=e=>{if(J(e)!=="object")return!1;const t=ce(e);return(t===null||t===Object.prototype||Object.getPrototypeOf(t)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)},tt=R("Date"),nt=R("File"),rt=R("Blob"),ot=R("FileList"),st=e=>V(e)&&k(e.pipe),it=e=>{let t;return e&&(typeof FormData=="function"&&e instanceof FormData||k(e.append)&&((t=J(e))==="formdata"||t==="object"&&k(e.toString)&&e.toString()==="[object FormData]"))},at=R("URLSearchParams"),ct=e=>e.trim?e.trim():e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function M(e,t,{allOwnKeys:n=!1}={}){if(e===null||typeof e>"u")return;let r,o;if(typeof e!="object"&&(e=[e]),P(e))for(r=0,o=e.length;r<o;r++)t.call(null,e[r],r,e);else{const s=n?Object.getOwnPropertyNames(e):Object.keys(e),i=s.length;let c;for(r=0;r<i;r++)c=s[r],t.call(null,e[c],c,e)}}function Be(e,t){t=t.toLowerCase();const n=Object.keys(e);let r=n.length,o;for(;r-- >0;)if(o=n[r],t===o.toLowerCase())return o;return null}const xe=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Ne=e=>!_(e)&&e!==xe;function re(){const{caseless:e}=Ne(this)&&this||{},t={},n=(r,o)=>{const s=e&&Be(t,o)||o;I(t[s])&&I(r)?t[s]=re(t[s],r):I(r)?t[s]=re({},r):P(r)?t[s]=r.slice():t[s]=r};for(let r=0,o=arguments.length;r<o;r++)arguments[r]&&M(arguments[r],n);return t}const lt=(e,t,n,{allOwnKeys:r}={})=>(M(t,(o,s)=>{n&&k(o)?e[s]=Ae(o,n):e[s]=o},{allOwnKeys:r}),e),ut=e=>(e.charCodeAt(0)===65279&&(e=e.slice(1)),e),dt=(e,t,n,r)=>{e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,Object.defineProperty(e,"super",{value:t.prototype}),n&&Object.assign(e.prototype,n)},ft=(e,t,n,r)=>{let o,s,i;const c={};if(t=t||{},e==null)return t;do{for(o=Object.getOwnPropertyNames(e),s=o.length;s-- >0;)i=o[s],(!r||r(i,e,t))&&!c[i]&&(t[i]=e[i],c[i]=!0);e=n!==!1&&ce(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},pt=(e,t,n)=>{e=String(e),(n===void 0||n>e.length)&&(n=e.length),n-=t.length;const r=e.indexOf(t,n);return r!==-1&&r===n},ht=e=>{if(!e)return null;if(P(e))return e;let t=e.length;if(!Te(t))return null;const n=new Array(t);for(;t-- >0;)n[t]=e[t];return n},mt=(e=>t=>e&&t instanceof e)(typeof Uint8Array<"u"&&ce(Uint8Array)),yt=(e,t)=>{const r=(e&&e[Symbol.iterator]).call(e);let o;for(;(o=r.next())&&!o.done;){const s=o.value;t.call(e,s[0],s[1])}},bt=(e,t)=>{let n;const r=[];for(;(n=e.exec(t))!==null;)r.push(n);return r},Et=R("HTMLFormElement"),gt=e=>e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,r,o){return r.toUpperCase()+o}),he=(({hasOwnProperty:e})=>(t,n)=>e.call(t,n))(Object.prototype),wt=R("RegExp"),Ce=(e,t)=>{const n=Object.getOwnPropertyDescriptors(e),r={};M(n,(o,s)=>{t(o,s,e)!==!1&&(r[s]=o)}),Object.defineProperties(e,r)},kt=e=>{Ce(e,(t,n)=>{if(k(e)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const r=e[n];if(k(r)){if(t.enumerable=!1,"writable"in t){t.writable=!1;return}t.set||(t.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},St=(e,t)=>{const n={},r=o=>{o.forEach(s=>{n[s]=!0})};return P(e)?r(e):r(String(e).split(t)),n},Ot=()=>{},Rt=(e,t)=>(e=+e,Number.isFinite(e)?e:t),Z="abcdefghijklmnopqrstuvwxyz",me="0123456789",Pe={DIGIT:me,ALPHA:Z,ALPHA_DIGIT:Z+Z.toUpperCase()+me},At=(e=16,t=Pe.ALPHA_DIGIT)=>{let n="";const{length:r}=t;for(;e--;)n+=t[Math.random()*r|0];return n};function Lt(e){return!!(e&&k(e.append)&&e[Symbol.toStringTag]==="FormData"&&e[Symbol.iterator])}const Tt=e=>{const t=new Array(10),n=(r,o)=>{if(V(r)){if(t.indexOf(r)>=0)return;if(!("toJSON"in r)){t[o]=r;const s=P(r)?[]:{};return M(r,(i,c)=>{const f=n(i,o+1);!_(f)&&(s[c]=f)}),t[o]=void 0,s}}return r};return n(e,0)},Bt=R("AsyncFunction"),xt=e=>e&&(V(e)||k(e))&&k(e.then)&&k(e.catch),a={isArray:P,isArrayBuffer:Le,isBuffer:Qe,isFormData:it,isArrayBufferView:Ye,isString:Ze,isNumber:Te,isBoolean:et,isObject:V,isPlainObject:I,isUndefined:_,isDate:tt,isFile:nt,isBlob:rt,isRegExp:wt,isFunction:k,isStream:st,isURLSearchParams:at,isTypedArray:mt,isFileList:ot,forEach:M,merge:re,extend:lt,trim:ct,stripBOM:ut,inherits:dt,toFlatObject:ft,kindOf:J,kindOfTest:R,endsWith:pt,toArray:ht,forEachEntry:yt,matchAll:bt,isHTMLForm:Et,hasOwnProperty:he,hasOwnProp:he,reduceDescriptors:Ce,freezeMethods:kt,toObjectSet:St,toCamelCase:gt,noop:Ot,toFiniteNumber:Rt,findKey:Be,global:xe,isContextDefined:Ne,ALPHABET:Pe,generateString:At,isSpecCompliantForm:Lt,toJSONObject:Tt,isAsyncFn:Bt,isThenable:xt};function m(e,t,n,r,o){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}a.inherits(m,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:a.toJSONObject(this.config),code:this.code,status:this.response&&this.response.status?this.response.status:null}}});const Fe=m.prototype,De={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(e=>{De[e]={value:e}});Object.defineProperties(m,De);Object.defineProperty(Fe,"isAxiosError",{value:!0});m.from=(e,t,n,r,o,s)=>{const i=Object.create(Fe);return a.toFlatObject(e,i,function(f){return f!==Error.prototype},c=>c!=="isAxiosError"),m.call(i,e.message,t,n,r,o),i.cause=e,i.name=e.name,s&&Object.assign(i,s),i};const Nt=null;function oe(e){return a.isPlainObject(e)||a.isArray(e)}function _e(e){return a.endsWith(e,"[]")?e.slice(0,-2):e}function ye(e,t,n){return e?e.concat(t).map(function(o,s){return o=_e(o),!n&&s?"["+o+"]":o}).join(n?".":""):t}function Ct(e){return a.isArray(e)&&!e.some(oe)}const Pt=a.toFlatObject(a,{},null,function(t){return/^is[A-Z]/.test(t)});function K(e,t,n){if(!a.isObject(e))throw new TypeError("target must be an object");t=t||new FormData,n=a.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(h,A){return!a.isUndefined(A[h])});const r=n.metaTokens,o=n.visitor||u,s=n.dots,i=n.indexes,f=(n.Blob||typeof Blob<"u"&&Blob)&&a.isSpecCompliantForm(t);if(!a.isFunction(o))throw new TypeError("visitor must be a function");function l(d){if(d===null)return"";if(a.isDate(d))return d.toISOString();if(!f&&a.isBlob(d))throw new m("Blob is not supported. Use a Buffer instead.");return a.isArrayBuffer(d)||a.isTypedArray(d)?f&&typeof Blob=="function"?new Blob([d]):Buffer.from(d):d}function u(d,h,A){let S=d;if(d&&!A&&typeof d=="object"){if(a.endsWith(h,"{}"))h=r?h:h.slice(0,-2),d=JSON.stringify(d);else if(a.isArray(d)&&Ct(d)||(a.isFileList(d)||a.endsWith(h,"[]"))&&(S=a.toArray(d)))return h=_e(h),S.forEach(function(q,Ve){!(a.isUndefined(q)||q===null)&&t.append(i===!0?ye([h],Ve,s):i===null?h:h+"[]",l(q))}),!1}return oe(d)?!0:(t.append(ye(A,h,s),l(d)),!1)}const p=[],g=Object.assign(Pt,{defaultVisitor:u,convertValue:l,isVisitable:oe});function b(d,h){if(!a.isUndefined(d)){if(p.indexOf(d)!==-1)throw Error("Circular reference detected in "+h.join("."));p.push(d),a.forEach(d,function(S,B){(!(a.isUndefined(S)||S===null)&&o.call(t,S,a.isString(B)?B.trim():B,h,g))===!0&&b(S,h?h.concat(B):[B])}),p.pop()}}if(!a.isObject(e))throw new TypeError("data must be an object");return b(e),t}function be(e){const t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g,function(r){return t[r]})}function le(e,t){this._pairs=[],e&&K(e,this,t)}const Ue=le.prototype;Ue.append=function(t,n){this._pairs.push([t,n])};Ue.toString=function(t){const n=t?function(r){return t.call(this,r,be)}:be;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};function Ft(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Me(e,t,n){if(!t)return e;const r=n&&n.encode||Ft,o=n&&n.serialize;let s;if(o?s=o(t,n):s=a.isURLSearchParams(t)?t.toString():new le(t,n).toString(r),s){const i=e.indexOf("#");i!==-1&&(e=e.slice(0,i)),e+=(e.indexOf("?")===-1?"?":"&")+s}return e}class Dt{constructor(){this.handlers=[]}use(t,n,r){return this.handlers.push({fulfilled:t,rejected:n,synchronous:r?r.synchronous:!1,runWhen:r?r.runWhen:null}),this.handlers.length-1}eject(t){this.handlers[t]&&(this.handlers[t]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(t){a.forEach(this.handlers,function(r){r!==null&&t(r)})}}const Ee=Dt,je={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},_t=typeof URLSearchParams<"u"?URLSearchParams:le,Ut=typeof FormData<"u"?FormData:null,Mt=typeof Blob<"u"?Blob:null,jt=(()=>{let e;return typeof navigator<"u"&&((e=navigator.product)==="ReactNative"||e==="NativeScript"||e==="NS")?!1:typeof window<"u"&&typeof document<"u"})(),qt=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),O={isBrowser:!0,classes:{URLSearchParams:_t,FormData:Ut,Blob:Mt},isStandardBrowserEnv:jt,isStandardBrowserWebWorkerEnv:qt,protocols:["http","https","file","blob","url","data"]};function It(e,t){return K(e,new O.classes.URLSearchParams,Object.assign({visitor:function(n,r,o,s){return O.isNode&&a.isBuffer(n)?(this.append(r,n.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)}},t))}function $t(e){return a.matchAll(/\w+|\[(\w*)]/g,e).map(t=>t[0]==="[]"?"":t[1]||t[0])}function vt(e){const t={},n=Object.keys(e);let r;const o=n.length;let s;for(r=0;r<o;r++)s=n[r],t[s]=e[s];return t}function qe(e){function t(n,r,o,s){let i=n[s++];const c=Number.isFinite(+i),f=s>=n.length;return i=!i&&a.isArray(o)?o.length:i,f?(a.hasOwnProp(o,i)?o[i]=[o[i],r]:o[i]=r,!c):((!o[i]||!a.isObject(o[i]))&&(o[i]=[]),t(n,r,o[i],s)&&a.isArray(o[i])&&(o[i]=vt(o[i])),!c)}if(a.isFormData(e)&&a.isFunction(e.entries)){const n={};return a.forEachEntry(e,(r,o)=>{t($t(r),o,n,0)}),n}return null}const Ht={"Content-Type":void 0};function zt(e,t,n){if(a.isString(e))try{return(t||JSON.parse)(e),a.trim(e)}catch(r){if(r.name!=="SyntaxError")throw r}return(n||JSON.stringify)(e)}const G={transitional:je,adapter:["xhr","http"],transformRequest:[function(t,n){const r=n.getContentType()||"",o=r.indexOf("application/json")>-1,s=a.isObject(t);if(s&&a.isHTMLForm(t)&&(t=new FormData(t)),a.isFormData(t))return o&&o?JSON.stringify(qe(t)):t;if(a.isArrayBuffer(t)||a.isBuffer(t)||a.isStream(t)||a.isFile(t)||a.isBlob(t))return t;if(a.isArrayBufferView(t))return t.buffer;if(a.isURLSearchParams(t))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),t.toString();let c;if(s){if(r.indexOf("application/x-www-form-urlencoded")>-1)return It(t,this.formSerializer).toString();if((c=a.isFileList(t))||r.indexOf("multipart/form-data")>-1){const f=this.env&&this.env.FormData;return K(c?{"files[]":t}:t,f&&new f,this.formSerializer)}}return s||o?(n.setContentType("application/json",!1),zt(t)):t}],transformResponse:[function(t){const n=this.transitional||G.transitional,r=n&&n.forcedJSONParsing,o=this.responseType==="json";if(t&&a.isString(t)&&(r&&!this.responseType||o)){const i=!(n&&n.silentJSONParsing)&&o;try{return JSON.parse(t)}catch(c){if(i)throw c.name==="SyntaxError"?m.from(c,m.ERR_BAD_RESPONSE,this,null,this.response):c}}return t}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:O.classes.FormData,Blob:O.classes.Blob},validateStatus:function(t){return t>=200&&t<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};a.forEach(["delete","get","head"],function(t){G.headers[t]={}});a.forEach(["post","put","patch"],function(t){G.headers[t]=a.merge(Ht)});const ue=G,Jt=a.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),Wt=e=>{const t={};let n,r,o;return e&&e.split(`
`).forEach(function(i){o=i.indexOf(":"),n=i.substring(0,o).trim().toLowerCase(),r=i.substring(o+1).trim(),!(!n||t[n]&&Jt[n])&&(n==="set-cookie"?t[n]?t[n].push(r):t[n]=[r]:t[n]=t[n]?t[n]+", "+r:r)}),t},ge=Symbol("internals");function F(e){return e&&String(e).trim().toLowerCase()}function $(e){return e===!1||e==null?e:a.isArray(e)?e.map($):String(e)}function Vt(e){const t=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let r;for(;r=n.exec(e);)t[r[1]]=r[2];return t}const Kt=e=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());function ee(e,t,n,r,o){if(a.isFunction(r))return r.call(this,t,n);if(o&&(t=n),!!a.isString(t)){if(a.isString(r))return t.indexOf(r)!==-1;if(a.isRegExp(r))return r.test(t)}}function Gt(e){return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(t,n,r)=>n.toUpperCase()+r)}function Xt(e,t){const n=a.toCamelCase(" "+t);["get","set","has"].forEach(r=>{Object.defineProperty(e,r+n,{value:function(o,s,i){return this[r].call(this,t,o,s,i)},configurable:!0})})}class X{constructor(t){t&&this.set(t)}set(t,n,r){const o=this;function s(c,f,l){const u=F(f);if(!u)throw new Error("header name must be a non-empty string");const p=a.findKey(o,u);(!p||o[p]===void 0||l===!0||l===void 0&&o[p]!==!1)&&(o[p||f]=$(c))}const i=(c,f)=>a.forEach(c,(l,u)=>s(l,u,f));return a.isPlainObject(t)||t instanceof this.constructor?i(t,n):a.isString(t)&&(t=t.trim())&&!Kt(t)?i(Wt(t),n):t!=null&&s(n,t,r),this}get(t,n){if(t=F(t),t){const r=a.findKey(this,t);if(r){const o=this[r];if(!n)return o;if(n===!0)return Vt(o);if(a.isFunction(n))return n.call(this,o,r);if(a.isRegExp(n))return n.exec(o);throw new TypeError("parser must be boolean|regexp|function")}}}has(t,n){if(t=F(t),t){const r=a.findKey(this,t);return!!(r&&this[r]!==void 0&&(!n||ee(this,this[r],r,n)))}return!1}delete(t,n){const r=this;let o=!1;function s(i){if(i=F(i),i){const c=a.findKey(r,i);c&&(!n||ee(r,r[c],c,n))&&(delete r[c],o=!0)}}return a.isArray(t)?t.forEach(s):s(t),o}clear(t){const n=Object.keys(this);let r=n.length,o=!1;for(;r--;){const s=n[r];(!t||ee(this,this[s],s,t,!0))&&(delete this[s],o=!0)}return o}normalize(t){const n=this,r={};return a.forEach(this,(o,s)=>{const i=a.findKey(r,s);if(i){n[i]=$(o),delete n[s];return}const c=t?Gt(s):String(s).trim();c!==s&&delete n[s],n[c]=$(o),r[c]=!0}),this}concat(...t){return this.constructor.concat(this,...t)}toJSON(t){const n=Object.create(null);return a.forEach(this,(r,o)=>{r!=null&&r!==!1&&(n[o]=t&&a.isArray(r)?r.join(", "):r)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([t,n])=>t+": "+n).join(`
`)}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(t){return t instanceof this?t:new this(t)}static concat(t,...n){const r=new this(t);return n.forEach(o=>r.set(o)),r}static accessor(t){const r=(this[ge]=this[ge]={accessors:{}}).accessors,o=this.prototype;function s(i){const c=F(i);r[c]||(Xt(o,i),r[c]=!0)}return a.isArray(t)?t.forEach(s):s(t),this}}X.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);a.freezeMethods(X.prototype);a.freezeMethods(X);const L=X;function te(e,t){const n=this||ue,r=t||n,o=L.from(r.headers);let s=r.data;return a.forEach(e,function(c){s=c.call(n,s,o.normalize(),t?t.status:void 0)}),o.normalize(),s}function Ie(e){return!!(e&&e.__CANCEL__)}function j(e,t,n){m.call(this,e??"canceled",m.ERR_CANCELED,t,n),this.name="CanceledError"}a.inherits(j,m,{__CANCEL__:!0});function Qt(e,t,n){const r=n.config.validateStatus;!n.status||!r||r(n.status)?e(n):t(new m("Request failed with status code "+n.status,[m.ERR_BAD_REQUEST,m.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}const Yt=O.isStandardBrowserEnv?function(){return{write:function(n,r,o,s,i,c){const f=[];f.push(n+"="+encodeURIComponent(r)),a.isNumber(o)&&f.push("expires="+new Date(o).toGMTString()),a.isString(s)&&f.push("path="+s),a.isString(i)&&f.push("domain="+i),c===!0&&f.push("secure"),document.cookie=f.join("; ")},read:function(n){const r=document.cookie.match(new RegExp("(^|;\\s*)("+n+")=([^;]*)"));return r?decodeURIComponent(r[3]):null},remove:function(n){this.write(n,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}();function Zt(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}function en(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}function $e(e,t){return e&&!Zt(t)?en(e,t):t}const tn=O.isStandardBrowserEnv?function(){const t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");let r;function o(s){let i=s;return t&&(n.setAttribute("href",i),i=n.href),n.setAttribute("href",i),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:n.pathname.charAt(0)==="/"?n.pathname:"/"+n.pathname}}return r=o(window.location.href),function(i){const c=a.isString(i)?o(i):i;return c.protocol===r.protocol&&c.host===r.host}}():function(){return function(){return!0}}();function nn(e){const t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}function rn(e,t){e=e||10;const n=new Array(e),r=new Array(e);let o=0,s=0,i;return t=t!==void 0?t:1e3,function(f){const l=Date.now(),u=r[s];i||(i=l),n[o]=f,r[o]=l;let p=s,g=0;for(;p!==o;)g+=n[p++],p=p%e;if(o=(o+1)%e,o===s&&(s=(s+1)%e),l-i<t)return;const b=u&&l-u;return b?Math.round(g*1e3/b):void 0}}function we(e,t){let n=0;const r=rn(50,250);return o=>{const s=o.loaded,i=o.lengthComputable?o.total:void 0,c=s-n,f=r(c),l=s<=i;n=s;const u={loaded:s,total:i,progress:i?s/i:void 0,bytes:c,rate:f||void 0,estimated:f&&i&&l?(i-s)/f:void 0,event:o};u[t?"download":"upload"]=!0,e(u)}}const on=typeof XMLHttpRequest<"u",sn=on&&function(e){return new Promise(function(n,r){let o=e.data;const s=L.from(e.headers).normalize(),i=e.responseType;let c;function f(){e.cancelToken&&e.cancelToken.unsubscribe(c),e.signal&&e.signal.removeEventListener("abort",c)}a.isFormData(o)&&(O.isStandardBrowserEnv||O.isStandardBrowserWebWorkerEnv?s.setContentType(!1):s.setContentType("multipart/form-data;",!1));let l=new XMLHttpRequest;if(e.auth){const b=e.auth.username||"",d=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";s.set("Authorization","Basic "+btoa(b+":"+d))}const u=$e(e.baseURL,e.url);l.open(e.method.toUpperCase(),Me(u,e.params,e.paramsSerializer),!0),l.timeout=e.timeout;function p(){if(!l)return;const b=L.from("getAllResponseHeaders"in l&&l.getAllResponseHeaders()),h={data:!i||i==="text"||i==="json"?l.responseText:l.response,status:l.status,statusText:l.statusText,headers:b,config:e,request:l};Qt(function(S){n(S),f()},function(S){r(S),f()},h),l=null}if("onloadend"in l?l.onloadend=p:l.onreadystatechange=function(){!l||l.readyState!==4||l.status===0&&!(l.responseURL&&l.responseURL.indexOf("file:")===0)||setTimeout(p)},l.onabort=function(){l&&(r(new m("Request aborted",m.ECONNABORTED,e,l)),l=null)},l.onerror=function(){r(new m("Network Error",m.ERR_NETWORK,e,l)),l=null},l.ontimeout=function(){let d=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded";const h=e.transitional||je;e.timeoutErrorMessage&&(d=e.timeoutErrorMessage),r(new m(d,h.clarifyTimeoutError?m.ETIMEDOUT:m.ECONNABORTED,e,l)),l=null},O.isStandardBrowserEnv){const b=(e.withCredentials||tn(u))&&e.xsrfCookieName&&Yt.read(e.xsrfCookieName);b&&s.set(e.xsrfHeaderName,b)}o===void 0&&s.setContentType(null),"setRequestHeader"in l&&a.forEach(s.toJSON(),function(d,h){l.setRequestHeader(h,d)}),a.isUndefined(e.withCredentials)||(l.withCredentials=!!e.withCredentials),i&&i!=="json"&&(l.responseType=e.responseType),typeof e.onDownloadProgress=="function"&&l.addEventListener("progress",we(e.onDownloadProgress,!0)),typeof e.onUploadProgress=="function"&&l.upload&&l.upload.addEventListener("progress",we(e.onUploadProgress)),(e.cancelToken||e.signal)&&(c=b=>{l&&(r(!b||b.type?new j(null,e,l):b),l.abort(),l=null)},e.cancelToken&&e.cancelToken.subscribe(c),e.signal&&(e.signal.aborted?c():e.signal.addEventListener("abort",c)));const g=nn(u);if(g&&O.protocols.indexOf(g)===-1){r(new m("Unsupported protocol "+g+":",m.ERR_BAD_REQUEST,e));return}l.send(o||null)})},v={http:Nt,xhr:sn};a.forEach(v,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch{}Object.defineProperty(e,"adapterName",{value:t})}});const an={getAdapter:e=>{e=a.isArray(e)?e:[e];const{length:t}=e;let n,r;for(let o=0;o<t&&(n=e[o],!(r=a.isString(n)?v[n.toLowerCase()]:n));o++);if(!r)throw r===!1?new m(`Adapter ${n} is not supported by the environment`,"ERR_NOT_SUPPORT"):new Error(a.hasOwnProp(v,n)?`Adapter '${n}' is not available in the build`:`Unknown adapter '${n}'`);if(!a.isFunction(r))throw new TypeError("adapter is not a function");return r},adapters:v};function ne(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new j(null,e)}function ke(e){return ne(e),e.headers=L.from(e.headers),e.data=te.call(e,e.transformRequest),["post","put","patch"].indexOf(e.method)!==-1&&e.headers.setContentType("application/x-www-form-urlencoded",!1),an.getAdapter(e.adapter||ue.adapter)(e).then(function(r){return ne(e),r.data=te.call(e,e.transformResponse,r),r.headers=L.from(r.headers),r},function(r){return Ie(r)||(ne(e),r&&r.response&&(r.response.data=te.call(e,e.transformResponse,r.response),r.response.headers=L.from(r.response.headers))),Promise.reject(r)})}const Se=e=>e instanceof L?e.toJSON():e;function C(e,t){t=t||{};const n={};function r(l,u,p){return a.isPlainObject(l)&&a.isPlainObject(u)?a.merge.call({caseless:p},l,u):a.isPlainObject(u)?a.merge({},u):a.isArray(u)?u.slice():u}function o(l,u,p){if(a.isUndefined(u)){if(!a.isUndefined(l))return r(void 0,l,p)}else return r(l,u,p)}function s(l,u){if(!a.isUndefined(u))return r(void 0,u)}function i(l,u){if(a.isUndefined(u)){if(!a.isUndefined(l))return r(void 0,l)}else return r(void 0,u)}function c(l,u,p){if(p in t)return r(l,u);if(p in e)return r(void 0,l)}const f={url:s,method:s,data:s,baseURL:i,transformRequest:i,transformResponse:i,paramsSerializer:i,timeout:i,timeoutMessage:i,withCredentials:i,adapter:i,responseType:i,xsrfCookieName:i,xsrfHeaderName:i,onUploadProgress:i,onDownloadProgress:i,decompress:i,maxContentLength:i,maxBodyLength:i,beforeRedirect:i,transport:i,httpAgent:i,httpsAgent:i,cancelToken:i,socketPath:i,responseEncoding:i,validateStatus:c,headers:(l,u)=>o(Se(l),Se(u),!0)};return a.forEach(Object.keys(Object.assign({},e,t)),function(u){const p=f[u]||o,g=p(e[u],t[u],u);a.isUndefined(g)&&p!==c||(n[u]=g)}),n}const ve="1.4.0",de={};["object","boolean","number","function","string","symbol"].forEach((e,t)=>{de[e]=function(r){return typeof r===e||"a"+(t<1?"n ":" ")+e}});const Oe={};de.transitional=function(t,n,r){function o(s,i){return"[Axios v"+ve+"] Transitional option '"+s+"'"+i+(r?". "+r:"")}return(s,i,c)=>{if(t===!1)throw new m(o(i," has been removed"+(n?" in "+n:"")),m.ERR_DEPRECATED);return n&&!Oe[i]&&(Oe[i]=!0,console.warn(o(i," has been deprecated since v"+n+" and will be removed in the near future"))),t?t(s,i,c):!0}};function cn(e,t,n){if(typeof e!="object")throw new m("options must be an object",m.ERR_BAD_OPTION_VALUE);const r=Object.keys(e);let o=r.length;for(;o-- >0;){const s=r[o],i=t[s];if(i){const c=e[s],f=c===void 0||i(c,s,e);if(f!==!0)throw new m("option "+s+" must be "+f,m.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new m("Unknown option "+s,m.ERR_BAD_OPTION)}}const se={assertOptions:cn,validators:de},T=se.validators;class z{constructor(t){this.defaults=t,this.interceptors={request:new Ee,response:new Ee}}request(t,n){typeof t=="string"?(n=n||{},n.url=t):n=t||{},n=C(this.defaults,n);const{transitional:r,paramsSerializer:o,headers:s}=n;r!==void 0&&se.assertOptions(r,{silentJSONParsing:T.transitional(T.boolean),forcedJSONParsing:T.transitional(T.boolean),clarifyTimeoutError:T.transitional(T.boolean)},!1),o!=null&&(a.isFunction(o)?n.paramsSerializer={serialize:o}:se.assertOptions(o,{encode:T.function,serialize:T.function},!0)),n.method=(n.method||this.defaults.method||"get").toLowerCase();let i;i=s&&a.merge(s.common,s[n.method]),i&&a.forEach(["delete","get","head","post","put","patch","common"],d=>{delete s[d]}),n.headers=L.concat(i,s);const c=[];let f=!0;this.interceptors.request.forEach(function(h){typeof h.runWhen=="function"&&h.runWhen(n)===!1||(f=f&&h.synchronous,c.unshift(h.fulfilled,h.rejected))});const l=[];this.interceptors.response.forEach(function(h){l.push(h.fulfilled,h.rejected)});let u,p=0,g;if(!f){const d=[ke.bind(this),void 0];for(d.unshift.apply(d,c),d.push.apply(d,l),g=d.length,u=Promise.resolve(n);p<g;)u=u.then(d[p++],d[p++]);return u}g=c.length;let b=n;for(p=0;p<g;){const d=c[p++],h=c[p++];try{b=d(b)}catch(A){h.call(this,A);break}}try{u=ke.call(this,b)}catch(d){return Promise.reject(d)}for(p=0,g=l.length;p<g;)u=u.then(l[p++],l[p++]);return u}getUri(t){t=C(this.defaults,t);const n=$e(t.baseURL,t.url);return Me(n,t.params,t.paramsSerializer)}}a.forEach(["delete","get","head","options"],function(t){z.prototype[t]=function(n,r){return this.request(C(r||{},{method:t,url:n,data:(r||{}).data}))}});a.forEach(["post","put","patch"],function(t){function n(r){return function(s,i,c){return this.request(C(c||{},{method:t,headers:r?{"Content-Type":"multipart/form-data"}:{},url:s,data:i}))}}z.prototype[t]=n(),z.prototype[t+"Form"]=n(!0)});const H=z;class fe{constructor(t){if(typeof t!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(s){n=s});const r=this;this.promise.then(o=>{if(!r._listeners)return;let s=r._listeners.length;for(;s-- >0;)r._listeners[s](o);r._listeners=null}),this.promise.then=o=>{let s;const i=new Promise(c=>{r.subscribe(c),s=c}).then(o);return i.cancel=function(){r.unsubscribe(s)},i},t(function(s,i,c){r.reason||(r.reason=new j(s,i,c),n(r.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(t){if(this.reason){t(this.reason);return}this._listeners?this._listeners.push(t):this._listeners=[t]}unsubscribe(t){if(!this._listeners)return;const n=this._listeners.indexOf(t);n!==-1&&this._listeners.splice(n,1)}static source(){let t;return{token:new fe(function(o){t=o}),cancel:t}}}const ln=fe;function un(e){return function(n){return e.apply(null,n)}}function dn(e){return a.isObject(e)&&e.isAxiosError===!0}const ie={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(ie).forEach(([e,t])=>{ie[t]=e});const fn=ie;function He(e){const t=new H(e),n=Ae(H.prototype.request,t);return a.extend(n,H.prototype,t,{allOwnKeys:!0}),a.extend(n,t,null,{allOwnKeys:!0}),n.create=function(o){return He(C(e,o))},n}const E=He(ue);E.Axios=H;E.CanceledError=j;E.CancelToken=ln;E.isCancel=Ie;E.VERSION=ve;E.toFormData=K;E.AxiosError=m;E.Cancel=E.CanceledError;E.all=function(t){return Promise.all(t)};E.spread=un;E.isAxiosError=dn;E.mergeConfig=C;E.AxiosHeaders=L;E.formToJSON=e=>qe(a.isHTMLForm(e)?new FormData(e):e);E.HttpStatusCode=fn;E.default=E;const ze=E,Je="https://books-backend.p.goit.global/books",w={body:document.querySelector("body"),categoryList:document.querySelector(".category-list"),header:document.querySelector(".header"),home:document.querySelector(".home"),bestSellers:document.querySelector(".best-sellers"),loader:document.querySelector(".loader-wrap"),booksListWrap:document.querySelector(".books-list-wrap")},D=[];w.home.style.topMargin=yn(w.home);Ke(w.loader);w.loader.classList.add("common-loader");ae("/category-list").then(e=>{const t=`<li class="category-list-item all-categories-list-item current-category"><a href="#" class="category-list-link all-category-link link" data-name="top-books">All categories</a></li>${hn(e)}`;w.categoryList.innerHTML=t,w.allCategoryLink=document.querySelector(".all-category-link"),w.categoryList.addEventListener("click",Re),e.map(({list_name:n})=>{D.push(n)}),ae("/top-books").then(n=>{const r=pe(n.map(({books:o})=>o[0]).slice(0,5));w.bestSellers.innerHTML=`
        <h2 class="best-sellers-title">Best Sellers <span class="best-sellers-title-item">Books</span></h2>
        <ul class="best-sellers-list books-list-by-category">${r}</ul>
        <button type="button" class="see-more-btn see-more-btn-best-sellers">SEE MORE</button>`}).catch(n=>{console.error("Error request data:",n)}),bn(D).then(n=>{const r=mn(n),o=document.querySelector(".books-list");o.innerHTML=r,w.booksListWrap.addEventListener("click",Re)}).catch(n=>{console.error("Error request data:",n)})}).catch(e=>{console.error("Error request data:",e)}).finally(()=>{Ge(w.loader),w.loader.classList.remove("common-loader"),w.booksListWrap.classList.remove("visually-hidden")});async function Re(e){if(!(!e.target.classList.contains("category-list-link")&&!e.target.classList.contains("see-more-btn")||e.target.classList.contains("all-category-link")||e.target.classList.contains("see-more-btn-best-sellers")))try{pn(e.target.dataset.name);const t=await ae(`/category?category=${e.target.dataset.name}`),n=pe(t),r=e.target.dataset.name.split(" ");let o,s;r.length>1&&(o=r.slice(0,r.length-1).join(" "),s=r.slice(r.length-1).join(" ")),w.booksListWrap.innerHTML=`<h2 class="open-category-title">${o}<span class="open-category-title-item"> ${s}</span></h2><ul class="open-category-list books-list-by-category">${n}</ul>`,document.querySelectorAll(".books-list-item").forEach(c=>c.classList.remove("books-list-item-category")),w.booksListWrap.scrollIntoView({behavior:"smooth",block:"start"})}catch(t){console.error("Error request data:",t)}}function pn(e){document.querySelector(".current-category")&&document.querySelector(".current-category").classList.remove("current-category"),document.querySelector(`[data-name="${e}"]`).classList.add("current-category")}function hn(e){return e.map(({list_name:t})=>`<li class="category-list-item"><a href="#" class="category-list-link link" data-name="${t}">${t}</a></li>`).join("")}function mn(e){let t=0;return e.map(({value:n})=>{const r=`<li class="books-list-category" data-id="${D[t]}">
    <h3 class="books-category-title">${D[t]}</h3>
    <ul class="books-list-by-category">
    ${pe(n.slice(0,5))}
    </ul>
    <button type="button" class="see-more-btn" data-name="${D[t]}">SEE MORE</button>
    </li>`;return t+=1,r}).join("")}function pe(e){return e.map(t=>`<li data-id="${t._id}" class="books-list-item books-list-item-category">
        <a href="#" class="book-item-link link">
        <div class="book-img-wrap-item">
        <img
          src="${t.book_image}"
          alt="${t.title}"
          width="335"
          height="485"
          loading="lazy"
          class="book-item-img"
        />
        <p class="book-overley">quick view</p>
      </div>
<div class="book-item-descr">
<h3 class="book-item-title">${t.title}</h3>
<p class="book-item-author">by ${t.author}</p></div></a>
      </li>`).join("")}function yn(e){const{height:t}=w.header.getBoundingClientRect(),n=Math.ceil(t);e.style.marginTop=`${n}px`}async function bn(e){const t=e.map(async r=>{const o=await ze.get(`${Je}/category?category=${r}`);if(o.status!==200)throw new Error(o.statusText);return o.data});return(await Promise.allSettled(t)).filter(({status:r})=>r==="fulfilled")}async function ae(e){const t=await fetch(`${Je}${e}`);if(!t.ok)throw new Error(t.statusText);return t.json()}const y={closeModalBtn:document.querySelector("button[data-modal-window-close]"),modal:document.querySelector("div[data-modal-window]"),backdrop:document.querySelector(".backdrop-modal"),addBookBtn:document.querySelector(".modal-btn-add"),textNotificationOfAdded:document.querySelector(".text-notification-of-added"),modalWrap:document.querySelector(".modal-wrap"),booksListWrap:document.querySelector(".books-list-wrap")},x=[];let U={};y.booksListWrap.addEventListener("click",En);function En(e){if(e.preventDefault(),!e.target.closest("li.books-list-item"))return;const t=e.target.closest("li").dataset.id;gn(t).then(({book_image:n,title:r,author:o,description:s,_id:i,buy_links:c})=>{U={bookId:i,bookName:r,bookAuthor:o,bookImage:n,buyLinks:c},y.modalWrap.innerHTML=wn(n,r,o,s,c),~We(x,U)?(y.addBookBtn.textContent="remove from the shopping list",y.addBookBtn.addEventListener("click",Y),y.textNotificationOfAdded.classList.contains("visually-hidden")&&y.textNotificationOfAdded.classList.remove("visually-hidden")):(y.addBookBtn.textContent="Add to shopping list",y.addBookBtn.addEventListener("click",Q),y.textNotificationOfAdded.classList.contains("visually-hidden")||y.textNotificationOfAdded.classList.add("visually-hidden")),kn(),y.closeModalBtn.addEventListener("click",N),y.backdrop.addEventListener("click",N),document.addEventListener("keydown",N)}).catch(n=>console.log(n))}async function gn(e){const t=await ze.get(`https://books-backend.p.goit.global/books/${e}`);if(t.status!==200)throw new Error(t.statusText);return t.data}function wn(e,t,n,r,o){const s=o.slice(0,3),i=[{name:"Amazon",img:"./img/amazon-icon.png"},{name:"Apple Books",img:"./img/apple-book-icon.png"},{name:"Barnes and Noble",img:"./img/book-shop-icon.png"}],c=s.map(({url:f,name:l})=>{const u=i.find(p=>p.name===l);return`<li><a href="${f}" target="_blank" rel="noopener noreferrer nofollow" class="buy-link">
      <img src="${u.img}" alt="${l}" class="buy-link-icon">
</a></li>`}).join("");return`<div class="book-img-wrap"><img
    src="${e}"
    alt="${t}"
    width="192"
    height="281"
    class="book-img"
  /></div>
        <div class="book-descr">
          <h2 class="book-name">${t}</h2>
          <h3 class="book-author">${n}</h3>
          <p class="book-descr-text">${r}</p>
          <ul class="buy-links-list">
${c}
          </ul>
        </div>`}function kn(){y.modal.classList.remove("is-hidden-modal"),document.body.style.overflow="hidden",y.modal.style.overflow="auto"}function N(e){e.currentTarget!==y.closeModalBtn&&e.target!==y.backdrop&&e.code!=="Escape"||(U={},y.modal.classList.add("is-hidden-modal"),document.body.style.overflow="",y.modal.style.overflow="",y.addBookBtn.removeEventListener("click",Q),y.addBookBtn.removeEventListener("click",Y),y.closeModalBtn.removeEventListener("click",N),y.backdrop.removeEventListener("click",N),document.removeEventListener("keydown",N))}function Q(e){x.push(U),localStorage.setItem("shoppingList",JSON.stringify(x)),y.addBookBtn.textContent="remove from the shopping list",y.textNotificationOfAdded.classList.remove("visually-hidden"),y.addBookBtn.removeEventListener("click",Q),y.addBookBtn.addEventListener("click",Y)}function Y(){const e=We(x,U);x.splice(e,1),localStorage.setItem("shoppingList",JSON.stringify(x)),y.addBookBtn.textContent="Add to shopping list",y.textNotificationOfAdded.classList.add("visually-hidden"),y.addBookBtn.removeEventListener("click",Y),y.addBookBtn.addEventListener("click",Q)}function We(e,t){return e.findIndex(n=>n.bookId===t.bookId)}
