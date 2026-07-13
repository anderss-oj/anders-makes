import{$ as dn}from"./jquery-evpGHFvf.js";/* empty css              */const Lu="14.9.17",zc=(i,e,t)=>({endTime:e,insertTime:t,type:"exponentialRampToValue",value:i}),Gc=(i,e,t)=>({endTime:e,insertTime:t,type:"linearRampToValue",value:i}),Ca=(i,e)=>({startTime:e,type:"setValue",value:i}),Nu=(i,e,t)=>({duration:t,startTime:e,type:"setValueCurve",values:i}),Iu=(i,e,{startTime:t,target:n,timeConstant:s})=>n+(e-n)*Math.exp((t-i)/s),ds=i=>i.type==="exponentialRampToValue",so=i=>i.type==="linearRampToValue",ii=i=>ds(i)||so(i),Ka=i=>i.type==="setValue",Bn=i=>i.type==="setValueCurve",ro=(i,e,t,n)=>{const s=i[e];return s===void 0?n:ii(s)||Ka(s)?s.value:Bn(s)?s.values[s.values.length-1]:Iu(t,ro(i,e-1,s.startTime,n),s)},Hc=(i,e,t,n,s)=>t===void 0?[n.insertTime,s]:ii(t)?[t.endTime,t.value]:Ka(t)?[t.startTime,t.value]:Bn(t)?[t.startTime+t.duration,t.values[t.values.length-1]]:[t.startTime,ro(i,e-1,t.startTime,s)],Ra=i=>i.type==="cancelAndHold",Pa=i=>i.type==="cancelScheduledValues",Kn=i=>Ra(i)||Pa(i)?i.cancelTime:ds(i)||so(i)?i.endTime:i.startTime,Wc=(i,e,t,{endTime:n,value:s})=>t===s?s:0<t&&0<s||t<0&&s<0?t*(s/t)**((i-e)/(n-e)):i<n?t:s,qc=(i,e,t,{endTime:n,value:s})=>t+(i-e)/(n-e)*(s-t),Ou=(i,e)=>{const t=Math.floor(e);if(t===e)return i[t];const n=Math.ceil(e);return(1-(e-t))*i[t]+(1-(n-e))*i[n]},Ed=(i,{duration:e,startTime:t,values:n})=>{const s=(i-t)/e*(n.length-1);return Ou(n,s)},bd=(i,e,t)=>{const n=i.length,s=Math.max(1,Math.floor(t/e*n))+1,r=i instanceof Float32Array?new Float32Array(s):i.slice(0,s);for(let a=0;a<s;a+=1){const c=a/(s-1)*t/e*(n-1);r[a]=Ou(i,c)}return r},Cr=i=>i.type==="setTarget";class wd{constructor(e){this._automationEvents=[],this._currenTime=0,this._defaultValue=e}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(e){const t=Kn(e);if(Ra(e)||Pa(e)){const n=this._automationEvents.findIndex(r=>Pa(e)&&Bn(r)?r.startTime+r.duration>=t:Kn(r)>=t),s=this._automationEvents[n];if(n!==-1&&(this._automationEvents=this._automationEvents.slice(0,n)),Ra(e)){const r=this._automationEvents[this._automationEvents.length-1];if(s!==void 0&&ii(s)){if(r!==void 0&&Cr(r))throw new Error("The internal list is malformed.");const a=r===void 0?s.insertTime:Bn(r)?r.startTime+r.duration:Kn(r),o=r===void 0?this._defaultValue:Bn(r)?r.values[r.values.length-1]:r.value,c=ds(s)?Wc(t,a,o,s):qc(t,a,o,s),l=ds(s)?zc(c,t,this._currenTime):Gc(c,t,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&Cr(r)&&this._automationEvents.push(Ca(this.getValue(t),t)),r!==void 0&&Bn(r)&&r.startTime+r.duration>t){const a=t-r.startTime;this._automationEvents[this._automationEvents.length-1]=Nu(bd(r.values,r.duration,a),r.startTime,a)}}}else{const n=this._automationEvents.findIndex(a=>Kn(a)>t),s=n===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[n-1];if(s!==void 0&&Bn(s)&&Kn(s)+s.duration>t)return!1;const r=ds(e)?zc(e.value,e.endTime,this._currenTime):so(e)?Gc(e.value,t,this._currenTime):e;if(n===-1)this._automationEvents.push(r);else{if(Bn(e)&&t+e.duration>Kn(this._automationEvents[n]))return!1;this._automationEvents.splice(n,0,r)}}return!0}flush(e){const t=this._automationEvents.findIndex(n=>Kn(n)>e);if(t>1){const n=this._automationEvents.slice(t-1),s=n[0];Cr(s)&&n.unshift(Ca(ro(this._automationEvents,t-2,s.startTime,this._defaultValue),s.startTime)),this._automationEvents=n}}getValue(e){if(this._automationEvents.length===0)return this._defaultValue;const t=this._automationEvents.findIndex(a=>Kn(a)>e),n=this._automationEvents[t],s=(t===-1?this._automationEvents.length:t)-1,r=this._automationEvents[s];if(r!==void 0&&Cr(r)&&(n===void 0||!ii(n)||n.insertTime>e))return Iu(e,ro(this._automationEvents,s-1,r.startTime,this._defaultValue),r);if(r!==void 0&&Ka(r)&&(n===void 0||!ii(n)))return r.value;if(r!==void 0&&Bn(r)&&(n===void 0||!ii(n)||r.startTime+r.duration>e))return e<r.startTime+r.duration?Ed(e,r):r.values[r.values.length-1];if(r!==void 0&&ii(r)&&(n===void 0||!ii(n)))return r.value;if(n!==void 0&&ds(n)){const[a,o]=Hc(this._automationEvents,s,r,n,this._defaultValue);return Wc(e,a,o,n)}if(n!==void 0&&so(n)){const[a,o]=Hc(this._automationEvents,s,r,n,this._defaultValue);return qc(e,a,o,n)}return this._defaultValue}}const Ad=i=>({cancelTime:i,type:"cancelAndHold"}),Cd=i=>({cancelTime:i,type:"cancelScheduledValues"}),Rd=(i,e)=>({endTime:e,type:"exponentialRampToValue",value:i}),Pd=(i,e)=>({endTime:e,type:"linearRampToValue",value:i}),Dd=(i,e,t)=>({startTime:e,target:i,timeConstant:t,type:"setTarget"}),Ld=()=>new DOMException("","AbortError"),Nd=i=>(e,t,[n,s,r],a)=>{i(e[s],[t,n,r],o=>o[0]===t&&o[1]===n,a)},Id=i=>(e,t,n)=>{const s=[];for(let r=0;r<n.numberOfInputs;r+=1)s.push(new Set);i.set(e,{activeInputs:s,outputs:new Set,passiveInputs:new WeakMap,renderer:t})},Od=i=>(e,t)=>{i.set(e,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:t})},vs=new WeakSet,Uu=new WeakMap,Ja=new WeakMap,Fu=new WeakMap,Qa=new WeakMap,Lo=new WeakMap,ku=new WeakMap,Da=new WeakMap,La=new WeakMap,Na=new WeakMap,Bu={construct(){return Bu}},Ud=i=>{try{const e=new Proxy(i,Bu);new e}catch{return!1}return!0},Xc=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,Yc=(i,e)=>{const t=[];let n=i.replace(/^[\s]+/,""),s=n.match(Xc);for(;s!==null;){const r=s[1].slice(1,-1),a=s[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,e).toString());t.push(a),n=n.slice(s[0].length).replace(/^[\s]+/,""),s=n.match(Xc)}return[t.join(";"),n]},jc=i=>{if(i!==void 0&&!Array.isArray(i))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},Zc=i=>{if(!Ud(i))throw new TypeError("The given value for processorCtor should be a constructor.");if(i.prototype===null||typeof i.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},Fd=(i,e,t,n,s,r,a,o,c,l,u,h,d)=>{let p=0;return(_,g,m={credentials:"omit"})=>{const f=u.get(_);if(f!==void 0&&f.has(g))return Promise.resolve();const y=l.get(_);if(y!==void 0){const S=y.get(g);if(S!==void 0)return S}const v=r(_),A=v.audioWorklet===void 0?s(g).then(([S,E])=>{const[T,C]=Yc(S,E),x=`${T};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${C}
})})(window,'_AWGS')`;return t(x)}).then(()=>{const S=d._AWGS.pop();if(S===void 0)throw new SyntaxError;n(v.currentTime,v.sampleRate,()=>S(class{},void 0,(E,T)=>{if(E.trim()==="")throw e();const C=La.get(v);if(C!==void 0){if(C.has(E))throw e();Zc(T),jc(T.parameterDescriptors),C.set(E,T)}else Zc(T),jc(T.parameterDescriptors),La.set(v,new Map([[E,T]]))},v.sampleRate,void 0,void 0))}):Promise.all([s(g),Promise.resolve(i(h,h))]).then(([[S,E],T])=>{const C=p+1;p=C;const[x,b]=Yc(S,E),P=`${x};((AudioWorkletProcessor,registerProcessor)=>{${b}
})(${T?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${T?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${T?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${C}',class extends AudioWorkletProcessor{process(){return !1}})`,I=new Blob([P],{type:"application/javascript; charset=utf-8"}),k=URL.createObjectURL(I);return v.audioWorklet.addModule(k,m).then(()=>{if(o(v))return v;const O=a(v);return O.audioWorklet.addModule(k,m).then(()=>O)}).then(O=>{if(c===null)throw new SyntaxError;try{new c(O,`__sac${C}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(k))});return y===void 0?l.set(_,new Map([[g,A]])):y.set(g,A),A.then(()=>{const S=u.get(_);S===void 0?u.set(_,new Set([g])):S.add(g)}).finally(()=>{const S=l.get(_);S!==void 0&&S.delete(g)}),A}},yn=(i,e)=>{const t=i.get(e);if(t===void 0)throw new Error("A value with the given key could not be found.");return t},No=(i,e)=>{const t=Array.from(i).filter(e);if(t.length>1)throw Error("More than one element was found.");if(t.length===0)throw Error("No element was found.");const[n]=t;return i.delete(n),n},Vu=(i,e,t,n)=>{const s=yn(i,e),r=No(s,a=>a[0]===t&&a[1]===n);return s.size===0&&i.delete(e),r},fr=i=>yn(ku,i),xs=i=>{if(vs.has(i))throw new Error("The AudioNode is already stored.");vs.add(i),fr(i).forEach(e=>e(!0))},zu=i=>"port"in i,pr=i=>{if(!vs.has(i))throw new Error("The AudioNode is not stored.");vs.delete(i),fr(i).forEach(e=>e(!1))},Ia=(i,e)=>{!zu(i)&&e.every(t=>t.size===0)&&pr(i)},kd=(i,e,t,n,s,r,a,o,c,l,u,h,d)=>{const p=new WeakMap;return(_,g,m,f,y)=>{const{activeInputs:v,passiveInputs:A}=r(g),{outputs:S}=r(_),E=o(_),T=C=>{const x=c(g),b=c(_);if(C){const D=Vu(A,_,m,f);i(v,_,D,!1),!y&&!h(_)&&t(b,x,m,f),d(g)&&xs(g)}else{const D=n(v,_,m,f);e(A,f,D,!1),!y&&!h(_)&&s(b,x,m,f);const L=a(g);if(L===0)u(g)&&Ia(g,v);else{const F=p.get(g);F!==void 0&&clearTimeout(F),p.set(g,setTimeout(()=>{u(g)&&Ia(g,v)},L*1e3))}}};return l(S,[g,m,f],C=>C[0]===g&&C[1]===m&&C[2]===f,!0)?(E.add(T),u(_)?i(v,_,[m,f,T],!0):e(A,f,[_,m,T],!0),!0):!1}},Bd=i=>(e,t,[n,s,r],a)=>{const o=e.get(n);o===void 0?e.set(n,new Set([[s,t,r]])):i(o,[s,t,r],c=>c[0]===s&&c[1]===t,a)},Vd=i=>(e,t)=>{const n=i(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});t.connect(n).connect(e.destination);const s=()=>{t.removeEventListener("ended",s),t.disconnect(n),n.disconnect()};t.addEventListener("ended",s)},zd=i=>(e,t)=>{i(e).add(t)},Gd={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},Hd=(i,e,t,n,s,r)=>class extends i{constructor(o,c){const l=s(o),u={...Gd,...c},h=n(l,u),d=r(l)?e():null;super(o,!1,h,d),this._nativeAnalyserNode=h}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(o){this._nativeAnalyserNode.fftSize=o}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(o){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=o,!(o>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,t()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(o){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=o,!(this._nativeAnalyserNode.maxDecibels>o))throw this._nativeAnalyserNode.minDecibels=c,t()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(o){this._nativeAnalyserNode.smoothingTimeConstant=o}getByteFrequencyData(o){this._nativeAnalyserNode.getByteFrequencyData(o)}getByteTimeDomainData(o){this._nativeAnalyserNode.getByteTimeDomainData(o)}getFloatFrequencyData(o){this._nativeAnalyserNode.getFloatFrequencyData(o)}getFloatTimeDomainData(o){this._nativeAnalyserNode.getFloatTimeDomainData(o)}},Ft=(i,e)=>i.context===e,Wd=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,a)=>{let o=e(r);if(!Ft(o,a)){const l={channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,fftSize:o.fftSize,maxDecibels:o.maxDecibels,minDecibels:o.minDecibels,smoothingTimeConstant:o.smoothingTimeConstant};o=i(a,l)}return n.set(a,o),await t(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):s(r,a)}}},oo=i=>{try{i.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},Rn=()=>new DOMException("","IndexSizeError"),ec=i=>{i.getChannelData=(e=>t=>{try{return e.call(i,t)}catch(n){throw n.code===12?Rn():n}})(i.getChannelData)},qd={numberOfChannels:1},Xd=(i,e,t,n,s,r,a,o)=>{let c=null;return class Gu{constructor(u){if(s===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:h,numberOfChannels:d,sampleRate:p}={...qd,...u};c===null&&(c=new s(1,1,44100));const _=n!==null&&e(r,r)?new n({length:h,numberOfChannels:d,sampleRate:p}):c.createBuffer(d,h,p);if(_.numberOfChannels===0)throw t();return typeof _.copyFromChannel!="function"?(a(_),ec(_)):e(oo,()=>oo(_))||o(_),i.add(_),_}static[Symbol.hasInstance](u){return u!==null&&typeof u=="object"&&Object.getPrototypeOf(u)===Gu.prototype||i.has(u)}}},Zt=-34028234663852886e22,Ht=-Zt,Hn=i=>vs.has(i),Yd={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},jd=(i,e,t,n,s,r,a,o)=>class extends i{constructor(l,u){const h=r(l),d={...Yd,...u},p=s(h,d),_=a(h),g=_?e():null;super(l,!1,p,g),this._audioBufferSourceNodeRenderer=g,this._isBufferNullified=!1,this._isBufferSet=d.buffer!==null,this._nativeAudioBufferSourceNode=p,this._onended=null,this._playbackRate=t(this,_,p.playbackRate,Ht,Zt)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw n();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const u=typeof l=="function"?o(this,l):null;this._nativeAudioBufferSourceNode.onended=u;const h=this._nativeAudioBufferSourceNode.onended;this._onended=h!==null&&h===u?l:h}get playbackRate(){return this._playbackRate}start(l=0,u=0,h){if(this._nativeAudioBufferSourceNode.start(l,u,h),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=h===void 0?[l,u]:[l,u,h]),this.context.state!=="closed"){xs(this);const d=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",d),Hn(this)&&pr(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",d)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},Zd=(i,e,t,n,s)=>()=>{const r=new WeakMap;let a=null,o=null;const c=async(l,u)=>{let h=t(l);const d=Ft(h,u);if(!d){const p={buffer:h.buffer,channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,loop:h.loop,loopEnd:h.loopEnd,loopStart:h.loopStart,playbackRate:h.playbackRate.value};h=e(u,p),a!==null&&h.start(...a),o!==null&&h.stop(o)}return r.set(u,h),d?await i(u,l.playbackRate,h.playbackRate):await n(u,l.playbackRate,h.playbackRate),await s(l,u,h),h};return{set start(l){a=l},set stop(l){o=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},$d=i=>"playbackRate"in i,Kd=i=>"frequency"in i&&"gain"in i,Jd=i=>"offset"in i,Qd=i=>!("frequency"in i)&&"gain"in i,ef=i=>"detune"in i&&"frequency"in i&&!("gain"in i),tf=i=>"pan"in i,Xt=i=>yn(Uu,i),mr=i=>yn(Fu,i),Oa=(i,e)=>{const{activeInputs:t}=Xt(i);t.forEach(s=>s.forEach(([r])=>{e.includes(i)||Oa(r,[...e,i])}));const n=$d(i)?[i.playbackRate]:zu(i)?Array.from(i.parameters.values()):Kd(i)?[i.Q,i.detune,i.frequency,i.gain]:Jd(i)?[i.offset]:Qd(i)?[i.gain]:ef(i)?[i.detune,i.frequency]:tf(i)?[i.pan]:[];for(const s of n){const r=mr(s);r!==void 0&&r.activeInputs.forEach(([a])=>Oa(a,e))}Hn(i)&&pr(i)},Hu=i=>{Oa(i.destination,[])},nf=i=>i===void 0||typeof i=="number"||typeof i=="string"&&(i==="balanced"||i==="interactive"||i==="playback"),sf=(i,e,t,n,s,r,a,o,c)=>class extends i{constructor(u={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let h;try{h=new c(u)}catch(_){throw _.code===12&&_.message==="sampleRate is not in range"?t():_}if(h===null)throw n();if(!nf(u.latencyHint))throw new TypeError(`The provided value '${u.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(u.sampleRate!==void 0&&h.sampleRate!==u.sampleRate)throw t();super(h,2);const{latencyHint:d}=u,{sampleRate:p}=h;if(this._baseLatency=typeof h.baseLatency=="number"?h.baseLatency:d==="balanced"?512/p:d==="interactive"||d===void 0?256/p:d==="playback"?1024/p:Math.max(2,Math.min(128,Math.round(d*p/128)))*128/p,this._nativeAudioContext=h,c.name==="webkitAudioContext"?(this._nativeGainNode=h.createGain(),this._nativeOscillatorNode=h.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(h.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,h.state==="running"){this._state="suspended";const _=()=>{this._state==="suspended"&&(this._state=null),h.removeEventListener("statechange",_)};h.addEventListener("statechange",_)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw e()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),Hu(this)}))}createMediaElementSource(u){return new s(this,{mediaElement:u})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(u){return new a(this,{mediaStream:u})}createMediaStreamTrackSource(u){return new o(this,{mediaStreamTrack:u})}resume(){return this._state==="suspended"?new Promise((u,h)=>{const d=()=>{this._nativeAudioContext.removeEventListener("statechange",d),this._nativeAudioContext.state==="running"?u():this.resume().then(u,h)};this._nativeAudioContext.addEventListener("statechange",d)}):this._nativeAudioContext.resume().catch(u=>{throw u===void 0||u.code===15?e():u})}suspend(){return this._nativeAudioContext.suspend().catch(u=>{throw u===void 0?e():u})}},rf=(i,e,t,n,s,r,a,o)=>class extends i{constructor(l,u){const h=r(l),d=a(h),p=s(h,u,d),_=d?e(o):null;super(l,!1,p,_),this._isNodeOfNativeOfflineAudioContext=d,this._nativeAudioDestinationNode=p}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw t();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},of=i=>{const e=new WeakMap,t=async(n,s)=>{const r=s.destination;return e.set(s,r),await i(n,s,r),r};return{render(n,s){const r=e.get(s);return r!==void 0?Promise.resolve(r):t(n,s)}}},af=(i,e,t,n,s,r,a,o)=>(c,l)=>{const u=l.listener,h=()=>{const S=new Float32Array(1),E=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),T=a(l);let C=!1,x=[0,0,-1,0,1,0],b=[0,0,0];const D=()=>{if(C)return;C=!0;const I=n(l,256,9,0);I.onaudioprocess=({inputBuffer:k})=>{const O=[r(k,S,0),r(k,S,1),r(k,S,2),r(k,S,3),r(k,S,4),r(k,S,5)];O.some((B,q)=>B!==x[q])&&(u.setOrientation(...O),x=O);const Z=[r(k,S,6),r(k,S,7),r(k,S,8)];Z.some((B,q)=>B!==b[q])&&(u.setPosition(...Z),b=Z)},E.connect(I)},L=I=>k=>{k!==x[I]&&(x[I]=k,u.setOrientation(...x))},F=I=>k=>{k!==b[I]&&(b[I]=k,u.setPosition(...b))},P=(I,k,O)=>{const Z=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:k});Z.connect(E,0,I),Z.start(),Object.defineProperty(Z.offset,"defaultValue",{get(){return k}});const B=i({context:c},T,Z.offset,Ht,Zt);return o(B,"value",q=>()=>q.call(B),q=>j=>{try{q.call(B,j)}catch(ie){if(ie.code!==9)throw ie}D(),T&&O(j)}),B.cancelAndHoldAtTime=(q=>T?()=>{throw s()}:(...j)=>{const ie=q.apply(B,j);return D(),ie})(B.cancelAndHoldAtTime),B.cancelScheduledValues=(q=>T?()=>{throw s()}:(...j)=>{const ie=q.apply(B,j);return D(),ie})(B.cancelScheduledValues),B.exponentialRampToValueAtTime=(q=>T?()=>{throw s()}:(...j)=>{const ie=q.apply(B,j);return D(),ie})(B.exponentialRampToValueAtTime),B.linearRampToValueAtTime=(q=>T?()=>{throw s()}:(...j)=>{const ie=q.apply(B,j);return D(),ie})(B.linearRampToValueAtTime),B.setTargetAtTime=(q=>T?()=>{throw s()}:(...j)=>{const ie=q.apply(B,j);return D(),ie})(B.setTargetAtTime),B.setValueAtTime=(q=>T?()=>{throw s()}:(...j)=>{const ie=q.apply(B,j);return D(),ie})(B.setValueAtTime),B.setValueCurveAtTime=(q=>T?()=>{throw s()}:(...j)=>{const ie=q.apply(B,j);return D(),ie})(B.setValueCurveAtTime),B};return{forwardX:P(0,0,L(0)),forwardY:P(1,0,L(1)),forwardZ:P(2,-1,L(2)),positionX:P(6,0,F(0)),positionY:P(7,0,F(1)),positionZ:P(8,0,F(2)),upX:P(3,0,L(3)),upY:P(4,1,L(4)),upZ:P(5,0,L(5))}},{forwardX:d,forwardY:p,forwardZ:_,positionX:g,positionY:m,positionZ:f,upX:y,upY:v,upZ:A}=u.forwardX===void 0?h():u;return{get forwardX(){return d},get forwardY(){return p},get forwardZ(){return _},get positionX(){return g},get positionY(){return m},get positionZ(){return f},get upX(){return y},get upY(){return v},get upZ(){return A}}},ao=i=>"context"in i,_r=i=>ao(i[0]),Wi=(i,e,t,n)=>{for(const s of i)if(t(s)){if(n)return!1;throw Error("The set contains at least one similar element.")}return i.add(e),!0},$c=(i,e,[t,n],s)=>{Wi(i,[e,t,n],r=>r[0]===e&&r[1]===t,s)},Kc=(i,[e,t,n],s)=>{const r=i.get(e);r===void 0?i.set(e,new Set([[t,n]])):Wi(r,[t,n],a=>a[0]===t,s)},Rs=i=>"inputs"in i,co=(i,e,t,n)=>{if(Rs(e)){const s=e.inputs[n];return i.connect(s,t,0),[s,t,0]}return i.connect(e,t,n),[e,t,n]},Wu=(i,e,t)=>{for(const n of i)if(n[0]===e&&n[1]===t)return i.delete(n),n;return null},cf=(i,e,t)=>No(i,n=>n[0]===e&&n[1]===t),qu=(i,e)=>{if(!fr(i).delete(e))throw new Error("Missing the expected event listener.")},Xu=(i,e,t)=>{const n=yn(i,e),s=No(n,r=>r[0]===t);return n.size===0&&i.delete(e),s},lo=(i,e,t,n)=>{Rs(e)?i.disconnect(e.inputs[n],t,0):i.disconnect(e,t,n)},rt=i=>yn(Ja,i),Zs=i=>yn(Qa,i),Fi=i=>Da.has(i),to=i=>!vs.has(i),Jc=(i,e)=>new Promise(t=>{if(e!==null)t(!0);else{const n=i.createScriptProcessor(256,1,1),s=i.createGain(),r=i.createBuffer(1,2,44100),a=r.getChannelData(0);a[0]=1,a[1]=1;const o=i.createBufferSource();o.buffer=r,o.loop=!0,o.connect(n).connect(i.destination),o.connect(s),o.disconnect(s),n.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,u=>u===1)?t(!0):t(!1),o.stop(),n.onaudioprocess=null,o.disconnect(n),n.disconnect(i.destination)},o.start()}}),$o=(i,e)=>{const t=new Map;for(const n of i)for(const s of n){const r=t.get(s);t.set(s,r===void 0?1:r+1)}t.forEach((n,s)=>e(s,n))},uo=i=>"context"in i,lf=i=>{const e=new Map;i.connect=(t=>(n,s=0,r=0)=>{const a=uo(n)?t(n,s,r):t(n,s),o=e.get(n);return o===void 0?e.set(n,[{input:r,output:s}]):o.every(c=>c.input!==r||c.output!==s)&&o.push({input:r,output:s}),a})(i.connect.bind(i)),i.disconnect=(t=>(n,s,r)=>{if(t.apply(i),n===void 0)e.clear();else if(typeof n=="number")for(const[a,o]of e){const c=o.filter(l=>l.output!==n);c.length===0?e.delete(a):e.set(a,c)}else if(e.has(n))if(s===void 0)e.delete(n);else{const a=e.get(n);if(a!==void 0){const o=a.filter(c=>c.output!==s&&(c.input!==r||r===void 0));o.length===0?e.delete(n):e.set(n,o)}}for(const[a,o]of e)o.forEach(c=>{uo(a)?i.connect(a,c.output,c.input):i.connect(a,c.output)})})(i.disconnect)},uf=(i,e,t,n)=>{const{activeInputs:s,passiveInputs:r}=mr(e),{outputs:a}=Xt(i),o=fr(i),c=l=>{const u=rt(i),h=Zs(e);if(l){const d=Xu(r,i,t);$c(s,i,d,!1),!n&&!Fi(i)&&u.connect(h,t)}else{const d=cf(s,i,t);Kc(r,d,!1),!n&&!Fi(i)&&u.disconnect(h,t)}};return Wi(a,[e,t],l=>l[0]===e&&l[1]===t,!0)?(o.add(c),Hn(i)?$c(s,i,[t,c],!0):Kc(r,[i,t,c],!0),!0):!1},hf=(i,e,t,n)=>{const{activeInputs:s,passiveInputs:r}=Xt(e),a=Wu(s[n],i,t);return a===null?[Vu(r,i,t,n)[2],!1]:[a[2],!0]},df=(i,e,t)=>{const{activeInputs:n,passiveInputs:s}=mr(e),r=Wu(n,i,t);return r===null?[Xu(s,i,t)[1],!1]:[r[2],!0]},tc=(i,e,t,n,s)=>{const[r,a]=hf(i,t,n,s);if(r!==null&&(qu(i,r),a&&!e&&!Fi(i)&&lo(rt(i),rt(t),n,s)),Hn(t)){const{activeInputs:o}=Xt(t);Ia(t,o)}},nc=(i,e,t,n)=>{const[s,r]=df(i,t,n);s!==null&&(qu(i,s),r&&!e&&!Fi(i)&&rt(i).disconnect(Zs(t),n))},ff=(i,e)=>{const t=Xt(i),n=[];for(const s of t.outputs)_r(s)?tc(i,e,...s):nc(i,e,...s),n.push(s[0]);return t.outputs.clear(),n},pf=(i,e,t)=>{const n=Xt(i),s=[];for(const r of n.outputs)r[1]===t&&(_r(r)?tc(i,e,...r):nc(i,e,...r),s.push(r[0]),n.outputs.delete(r));return s},mf=(i,e,t,n,s)=>{const r=Xt(i);return Array.from(r.outputs).filter(a=>a[0]===t&&(n===void 0||a[1]===n)&&(s===void 0||a[2]===s)).map(a=>(_r(a)?tc(i,e,...a):nc(i,e,...a),r.outputs.delete(a),a[0]))},_f=(i,e,t,n,s,r,a,o,c,l,u,h,d,p,_,g)=>class extends l{constructor(f,y,v,A){super(v),this._context=f,this._nativeAudioNode=v;const S=u(f);h(S)&&t(Jc,()=>Jc(S,g))!==!0&&lf(v),Ja.set(this,v),ku.set(this,new Set),f.state!=="closed"&&y&&xs(this),i(this,A,v)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(f){this._nativeAudioNode.channelCount=f}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(f){this._nativeAudioNode.channelCountMode=f}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(f){this._nativeAudioNode.channelInterpretation=f}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(f,y=0,v=0){if(y<0||y>=this._nativeAudioNode.numberOfOutputs)throw s();const A=u(this._context),S=_(A);if(d(f)||p(f))throw r();if(ao(f)){const C=rt(f);try{const b=co(this._nativeAudioNode,C,y,v),D=to(this);(S||D)&&this._nativeAudioNode.disconnect(...b),this.context.state!=="closed"&&!D&&to(f)&&xs(f)}catch(b){throw b.code===12?r():b}if(e(this,f,y,v,S)){const b=c([this],f);$o(b,n(S))}return f}const E=Zs(f);if(E.name==="playbackRate"&&E.maxValue===1024)throw a();try{this._nativeAudioNode.connect(E,y),(S||to(this))&&this._nativeAudioNode.disconnect(E,y)}catch(C){throw C.code===12?r():C}if(uf(this,f,y,S)){const C=c([this],f);$o(C,n(S))}}disconnect(f,y,v){let A;const S=u(this._context),E=_(S);if(f===void 0)A=ff(this,E);else if(typeof f=="number"){if(f<0||f>=this.numberOfOutputs)throw s();A=pf(this,E,f)}else{if(y!==void 0&&(y<0||y>=this.numberOfOutputs)||ao(f)&&v!==void 0&&(v<0||v>=f.numberOfInputs))throw s();if(A=mf(this,E,f,y,v),A.length===0)throw r()}for(const T of A){const C=c([this],T);$o(C,o)}}},gf=(i,e,t,n,s,r,a,o,c,l,u,h,d)=>(p,_,g,m=null,f=null)=>{const y=g.value,v=new wd(y),A=_?n(v):null,S={get defaultValue(){return y},get maxValue(){return m===null?g.maxValue:m},get minValue(){return f===null?g.minValue:f},get value(){return g.value},set value(E){g.value=E,S.setValueAtTime(E,p.context.currentTime)},cancelAndHoldAtTime(E){if(typeof g.cancelAndHoldAtTime=="function")A===null&&v.flush(p.context.currentTime),v.add(s(E)),g.cancelAndHoldAtTime(E);else{const T=Array.from(v).pop();A===null&&v.flush(p.context.currentTime),v.add(s(E));const C=Array.from(v).pop();g.cancelScheduledValues(E),T!==C&&C!==void 0&&(C.type==="exponentialRampToValue"?g.exponentialRampToValueAtTime(C.value,C.endTime):C.type==="linearRampToValue"?g.linearRampToValueAtTime(C.value,C.endTime):C.type==="setValue"?g.setValueAtTime(C.value,C.startTime):C.type==="setValueCurve"&&g.setValueCurveAtTime(C.values,C.startTime,C.duration))}return S},cancelScheduledValues(E){return A===null&&v.flush(p.context.currentTime),v.add(r(E)),g.cancelScheduledValues(E),S},exponentialRampToValueAtTime(E,T){if(E===0)throw new RangeError;if(!Number.isFinite(T)||T<0)throw new RangeError;const C=p.context.currentTime;return A===null&&v.flush(C),Array.from(v).length===0&&(v.add(l(y,C)),g.setValueAtTime(y,C)),v.add(a(E,T)),g.exponentialRampToValueAtTime(E,T),S},linearRampToValueAtTime(E,T){const C=p.context.currentTime;return A===null&&v.flush(C),Array.from(v).length===0&&(v.add(l(y,C)),g.setValueAtTime(y,C)),v.add(o(E,T)),g.linearRampToValueAtTime(E,T),S},setTargetAtTime(E,T,C){return A===null&&v.flush(p.context.currentTime),v.add(c(E,T,C)),g.setTargetAtTime(E,T,C),S},setValueAtTime(E,T){return A===null&&v.flush(p.context.currentTime),v.add(l(E,T)),g.setValueAtTime(E,T),S},setValueCurveAtTime(E,T,C){const x=E instanceof Float32Array?E:new Float32Array(E);if(h!==null&&h.name==="webkitAudioContext"){const b=T+C,D=p.context.sampleRate,L=Math.ceil(T*D),F=Math.floor(b*D),P=F-L,I=new Float32Array(P);for(let O=0;O<P;O+=1){const Z=(x.length-1)/C*((L+O)/D-T),B=Math.floor(Z),q=Math.ceil(Z);I[O]=B===q?x[B]:(1-(Z-B))*x[B]+(1-(q-Z))*x[q]}A===null&&v.flush(p.context.currentTime),v.add(u(I,T,C)),g.setValueCurveAtTime(I,T,C);const k=F/D;k<b&&d(S,I[I.length-1],k),d(S,x[x.length-1],b)}else A===null&&v.flush(p.context.currentTime),v.add(u(x,T,C)),g.setValueCurveAtTime(x,T,C);return S}};return t.set(S,g),e.set(S,p),i(S,A),S},vf=i=>({replay(e){for(const t of i)if(t.type==="exponentialRampToValue"){const{endTime:n,value:s}=t;e.exponentialRampToValueAtTime(s,n)}else if(t.type==="linearRampToValue"){const{endTime:n,value:s}=t;e.linearRampToValueAtTime(s,n)}else if(t.type==="setTarget"){const{startTime:n,target:s,timeConstant:r}=t;e.setTargetAtTime(s,n,r)}else if(t.type==="setValue"){const{startTime:n,value:s}=t;e.setValueAtTime(s,n)}else if(t.type==="setValueCurve"){const{duration:n,startTime:s,values:r}=t;e.setValueCurveAtTime(r,s,n)}else throw new Error("Can't apply an unknown automation.")}});class Yu{constructor(e){this._map=new Map(e)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(e,t=null){return this._map.forEach((n,s)=>e.call(t,n,s,this))}get(e){return this._map.get(e)}has(e){return this._map.has(e)}keys(){return this._map.keys()}values(){return this._map.values()}}const xf={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},Sf=(i,e,t,n,s,r,a,o,c,l,u,h,d,p)=>class extends e{constructor(g,m,f){var y;const v=o(g),A=c(v),S=u({...xf,...f});d(S);const E=La.get(v),T=E==null?void 0:E.get(m),C=A||v.state!=="closed"?v:(y=a(v))!==null&&y!==void 0?y:v,x=s(C,A?null:g.baseLatency,l,m,T,S),b=A?n(m,S,T):null;super(g,!0,x,b);const D=[];x.parameters.forEach((F,P)=>{const I=t(this,A,F);D.push([P,I])}),this._nativeAudioWorkletNode=x,this._onprocessorerror=null,this._parameters=new Yu(D),A&&i(v,this);const{activeInputs:L}=r(this);h(x,L)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(g){const m=typeof g=="function"?p(this,g):null;this._nativeAudioWorkletNode.onprocessorerror=m;const f=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=f!==null&&f===m?g:f}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function ho(i,e,t,n,s){if(typeof i.copyFromChannel=="function")e[t].byteLength===0&&(e[t]=new Float32Array(128)),i.copyFromChannel(e[t],n,s);else{const r=i.getChannelData(n);if(e[t].byteLength===0)e[t]=r.slice(s,s+128);else{const a=new Float32Array(r.buffer,s*Float32Array.BYTES_PER_ELEMENT,128);e[t].set(a)}}}const ju=(i,e,t,n,s)=>{typeof i.copyToChannel=="function"?e[t].byteLength!==0&&i.copyToChannel(e[t],n,s):e[t].byteLength!==0&&i.getChannelData(n).set(e[t],s)},fo=(i,e)=>{const t=[];for(let n=0;n<i;n+=1){const s=[],r=typeof e=="number"?e:e[n];for(let a=0;a<r;a+=1)s.push(new Float32Array(128));t.push(s)}return t},yf=(i,e)=>{const t=yn(Na,i),n=rt(e);return yn(t,n)},Mf=async(i,e,t,n,s,r,a)=>{const o=e===null?Math.ceil(i.context.length/128)*128:e.length,c=n.channelCount*n.numberOfInputs,l=s.reduce((m,f)=>m+f,0),u=l===0?null:t.createBuffer(l,o,t.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const h=Xt(i),d=await yf(t,i),p=fo(n.numberOfInputs,n.channelCount),_=fo(n.numberOfOutputs,s),g=Array.from(i.parameters.keys()).reduce((m,f)=>({...m,[f]:new Float32Array(128)}),{});for(let m=0;m<o;m+=128){if(n.numberOfInputs>0&&e!==null)for(let f=0;f<n.numberOfInputs;f+=1)for(let y=0;y<n.channelCount;y+=1)ho(e,p[f],y,y,m);r.parameterDescriptors!==void 0&&e!==null&&r.parameterDescriptors.forEach(({name:f},y)=>{ho(e,g,f,c+y,m)});for(let f=0;f<n.numberOfInputs;f+=1)for(let y=0;y<s[f];y+=1)_[f][y].byteLength===0&&(_[f][y]=new Float32Array(128));try{const f=p.map((v,A)=>h.activeInputs[A].size===0?[]:v),y=a(m/t.sampleRate,t.sampleRate,()=>d.process(f,_,g));if(u!==null)for(let v=0,A=0;v<n.numberOfOutputs;v+=1){for(let S=0;S<s[v];S+=1)ju(u,_[v],S,A+S,m);A+=s[v]}if(!y)break}catch(f){i.dispatchEvent(new ErrorEvent("processorerror",{colno:f.colno,filename:f.filename,lineno:f.lineno,message:f.message}));break}}return u},Tf=(i,e,t,n,s,r,a,o,c,l,u,h,d,p,_,g)=>(m,f,y)=>{const v=new WeakMap;let A=null;const S=async(E,T)=>{let C=u(E),x=null;const b=Ft(C,T),D=Array.isArray(f.outputChannelCount)?f.outputChannelCount:Array.from(f.outputChannelCount);if(h===null){const L=D.reduce((k,O)=>k+O,0),F=s(T,{channelCount:Math.max(1,L),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,L)}),P=[];for(let k=0;k<E.numberOfOutputs;k+=1)P.push(n(T,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:D[k]}));const I=a(T,{channelCount:f.channelCount,channelCountMode:f.channelCountMode,channelInterpretation:f.channelInterpretation,gain:1});I.connect=e.bind(null,P),I.disconnect=c.bind(null,P),x=[F,P,I]}else b||(C=new h(T,m));if(v.set(T,x===null?C:x[2]),x!==null){if(A===null){if(y===void 0)throw new Error("Missing the processor constructor.");if(d===null)throw new Error("Missing the native OfflineAudioContext constructor.");const O=E.channelCount*E.numberOfInputs,Z=y.parameterDescriptors===void 0?0:y.parameterDescriptors.length,B=O+Z;A=Mf(E,B===0?null:await(async()=>{const j=new d(B,Math.ceil(E.context.length/128)*128,T.sampleRate),ie=[],X=[];for(let ue=0;ue<f.numberOfInputs;ue+=1)ie.push(a(j,{channelCount:f.channelCount,channelCountMode:f.channelCountMode,channelInterpretation:f.channelInterpretation,gain:1})),X.push(s(j,{channelCount:f.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:f.channelCount}));const K=await Promise.all(Array.from(E.parameters.values()).map(async ue=>{const pe=r(j,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:ue.value});return await p(j,ue,pe.offset),pe})),Q=n(j,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,O+Z)});for(let ue=0;ue<f.numberOfInputs;ue+=1){ie[ue].connect(X[ue]);for(let pe=0;pe<f.channelCount;pe+=1)X[ue].connect(Q,pe,ue*f.channelCount+pe)}for(const[ue,pe]of K.entries())pe.connect(Q,0,O+ue),pe.start(0);return Q.connect(j.destination),await Promise.all(ie.map(ue=>_(E,j,ue))),g(j)})(),T,f,D,y,l)}const L=await A,F=t(T,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[P,I,k]=x;L!==null&&(F.buffer=L,F.start(0)),F.connect(P);for(let O=0,Z=0;O<E.numberOfOutputs;O+=1){const B=I[O];for(let q=0;q<D[O];q+=1)P.connect(B,Z+q,q);Z+=D[O]}return k}if(b)for(const[L,F]of E.parameters.entries())await i(T,F,C.parameters.get(L));else for(const[L,F]of E.parameters.entries())await p(T,F,C.parameters.get(L));return await _(E,T,C),C};return{render(E,T){o(T,E);const C=v.get(T);return C!==void 0?Promise.resolve(C):S(E,T)}}},Ef=(i,e,t,n,s,r,a,o,c,l,u,h,d,p,_,g,m,f,y,v)=>class extends _{constructor(S,E){super(S,E),this._nativeContext=S,this._audioWorklet=i===void 0?void 0:{addModule:(T,C)=>i(this,T,C)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new e(this)}createBiquadFilter(){return new s(this)}createBuffer(S,E,T){return new t({length:E,numberOfChannels:S,sampleRate:T})}createBufferSource(){return new n(this)}createChannelMerger(S=6){return new r(this,{numberOfInputs:S})}createChannelSplitter(S=6){return new a(this,{numberOfOutputs:S})}createConstantSource(){return new o(this)}createConvolver(){return new c(this)}createDelay(S=1){return new u(this,{maxDelayTime:S})}createDynamicsCompressor(){return new h(this)}createGain(){return new d(this)}createIIRFilter(S,E){return new p(this,{feedback:E,feedforward:S})}createOscillator(){return new g(this)}createPanner(){return new m(this)}createPeriodicWave(S,E,T={disableNormalization:!1}){return new f(this,{...T,imag:E,real:S})}createStereoPanner(){return new y(this)}createWaveShaper(){return new v(this)}decodeAudioData(S,E,T){return l(this._nativeContext,S).then(C=>(typeof E=="function"&&E(C),C),C=>{throw typeof T=="function"&&T(C),C})}},bf={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},wf=(i,e,t,n,s,r,a,o)=>class extends i{constructor(l,u){const h=r(l),d={...bf,...u},p=s(h,d),_=a(h),g=_?t():null;super(l,!1,p,g),this._Q=e(this,_,p.Q,Ht,Zt),this._detune=e(this,_,p.detune,1200*Math.log2(Ht),-1200*Math.log2(Ht)),this._frequency=e(this,_,p.frequency,l.sampleRate/2,0),this._gain=e(this,_,p.gain,40*Math.log10(Ht),Zt),this._nativeBiquadFilterNode=p,o(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,u,h){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,u,h)}catch(d){throw d.code===11?n():d}if(l.length!==u.length||u.length!==h.length)throw n()}},Af=(i,e,t,n,s)=>()=>{const r=new WeakMap,a=async(o,c)=>{let l=t(o);const u=Ft(l,c);if(!u){const h={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=e(c,h)}return r.set(c,l),u?(await i(c,o.Q,l.Q),await i(c,o.detune,l.detune),await i(c,o.frequency,l.frequency),await i(c,o.gain,l.gain)):(await n(c,o.Q,l.Q),await n(c,o.detune,l.detune),await n(c,o.frequency,l.frequency),await n(c,o.gain,l.gain)),await s(o,c,l),l};return{render(o,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):a(o,c)}}},Cf=(i,e)=>(t,n)=>{const s=e.get(t);if(s!==void 0)return s;const r=i.get(t);if(r!==void 0)return r;try{const a=n();return a instanceof Promise?(i.set(t,a),a.catch(()=>!1).then(o=>(i.delete(t),e.set(t,o),o))):(e.set(t,a),a)}catch{return e.set(t,!1),!1}},Rf={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},Pf=(i,e,t,n,s)=>class extends i{constructor(a,o){const c=n(a),l={...Rf,...o},u=t(c,l),h=s(c)?e():null;super(a,!1,u,h)}},Df=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,a)=>{let o=e(r);if(!Ft(o,a)){const l={channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,numberOfInputs:o.numberOfInputs};o=i(a,l)}return n.set(a,o),await t(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):s(r,a)}}},Lf={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},Nf=(i,e,t,n,s,r)=>class extends i{constructor(o,c){const l=n(o),u=r({...Lf,...c}),h=t(l,u),d=s(l)?e():null;super(o,!1,h,d)}},If=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,a)=>{let o=e(r);if(!Ft(o,a)){const l={channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,numberOfOutputs:o.numberOfOutputs};o=i(a,l)}return n.set(a,o),await t(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):s(r,a)}}},Of=i=>(e,t,n)=>i(t,e,n),Uf=i=>(e,t,n=0,s=0)=>{const r=e[n];if(r===void 0)throw i();return uo(t)?r.connect(t,0,s):r.connect(t,0)},Ff=i=>(e,t)=>{const n=i(e,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),s=e.createBuffer(1,2,44100);return n.buffer=s,n.loop=!0,n.connect(t),n.start(),()=>{n.stop(),n.disconnect(t)}},kf={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},Bf=(i,e,t,n,s,r,a)=>class extends i{constructor(c,l){const u=s(c),h={...kf,...l},d=n(u,h),p=r(u),_=p?t():null;super(c,!1,d,_),this._constantSourceNodeRenderer=_,this._nativeConstantSourceNode=d,this._offset=e(this,p,d.offset,Ht,Zt),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?a(this,c):null;this._nativeConstantSourceNode.onended=l;const u=this._nativeConstantSourceNode.onended;this._onended=u!==null&&u===l?c:u}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){xs(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),Hn(this)&&pr(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},Vf=(i,e,t,n,s)=>()=>{const r=new WeakMap;let a=null,o=null;const c=async(l,u)=>{let h=t(l);const d=Ft(h,u);if(!d){const p={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,offset:h.offset.value};h=e(u,p),a!==null&&h.start(a),o!==null&&h.stop(o)}return r.set(u,h),d?await i(u,l.offset,h.offset):await n(u,l.offset,h.offset),await s(l,u,h),h};return{set start(l){a=l},set stop(l){o=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},zf=i=>e=>(i[0]=e,i[0]),Gf={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},Hf=(i,e,t,n,s,r)=>class extends i{constructor(o,c){const l=n(o),u={...Gf,...c},h=t(l,u),p=s(l)?e():null;super(o,!1,h,p),this._isBufferNullified=!1,this._nativeConvolverNode=h,u.buffer!==null&&r(this,u.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(o){if(this._nativeConvolverNode.buffer=o,o===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(o){this._nativeConvolverNode.normalize=o}},Wf=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,a)=>{let o=e(r);if(!Ft(o,a)){const l={buffer:o.buffer,channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,disableNormalization:!o.normalize};o=i(a,l)}return n.set(a,o),Rs(o)?await t(r,a,o.inputs[0]):await t(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):s(r,a)}}},qf=(i,e)=>(t,n,s)=>{if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new e(t,n,s)}catch(r){throw r.name==="SyntaxError"?i():r}},Xf=()=>new DOMException("","DataCloneError"),Qc=i=>{const{port1:e,port2:t}=new MessageChannel;return new Promise(n=>{const s=()=>{t.onmessage=null,e.close(),t.close(),n()};t.onmessage=()=>s();try{e.postMessage(i,[i])}catch{}finally{s()}})},Yf=(i,e,t,n,s,r,a,o,c,l,u)=>(h,d)=>{const p=a(h)?h:r(h);if(s.has(d)){const _=t();return Promise.reject(_)}try{s.add(d)}catch{}return e(c,()=>c(p))?p.decodeAudioData(d).then(_=>(Qc(d).catch(()=>{}),e(o,()=>o(_))||u(_),i.add(_),_)):new Promise((_,g)=>{const m=async()=>{try{await Qc(d)}catch{}},f=y=>{g(y),m()};try{p.decodeAudioData(d,y=>{typeof y.copyFromChannel!="function"&&(l(y),ec(y)),i.add(y),m().then(()=>_(y))},y=>{f(y===null?n():y)})}catch(y){f(y)}})},jf=(i,e,t,n,s,r,a,o)=>(c,l)=>{const u=e.get(c);if(u===void 0)throw new Error("Missing the expected cycle count.");const h=r(c.context),d=o(h);if(u===l){if(e.delete(c),!d&&a(c)){const p=n(c),{outputs:_}=t(c);for(const g of _)if(_r(g)){const m=n(g[0]);i(p,m,g[1],g[2])}else{const m=s(g[0]);p.connect(m,g[1])}}}else e.set(c,u-l)},Zf={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},$f=(i,e,t,n,s,r,a)=>class extends i{constructor(c,l){const u=s(c),h={...Zf,...l},d=n(u,h),p=r(u),_=p?t(h.maxDelayTime):null;super(c,!1,d,_),this._delayTime=e(this,p,d.delayTime),a(this,h.maxDelayTime)}get delayTime(){return this._delayTime}},Kf=(i,e,t,n,s)=>r=>{const a=new WeakMap,o=async(c,l)=>{let u=t(c);const h=Ft(u,l);if(!h){const d={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,delayTime:u.delayTime.value,maxDelayTime:r};u=e(l,d)}return a.set(l,u),h?await i(l,c.delayTime,u.delayTime):await n(l,c.delayTime,u.delayTime),await s(c,l,u),u};return{render(c,l){const u=a.get(l);return u!==void 0?Promise.resolve(u):o(c,l)}}},Jf=i=>(e,t,n,s)=>i(e[s],r=>r[0]===t&&r[1]===n),Qf=i=>(e,t)=>{i(e).delete(t)},ep=i=>"delayTime"in i,tp=(i,e,t)=>function n(s,r){const a=ao(r)?r:t(i,r);if(ep(a))return[];if(s[0]===a)return[s];if(s.includes(a))return[];const{outputs:o}=e(a);return Array.from(o).map(c=>n([...s,a],c[0])).reduce((c,l)=>c.concat(l),[])},Rr=(i,e,t)=>{const n=e[t];if(n===void 0)throw i();return n},np=i=>(e,t=void 0,n=void 0,s=0)=>t===void 0?e.forEach(r=>r.disconnect()):typeof t=="number"?Rr(i,e,t).disconnect():uo(t)?n===void 0?e.forEach(r=>r.disconnect(t)):s===void 0?Rr(i,e,n).disconnect(t,0):Rr(i,e,n).disconnect(t,0,s):n===void 0?e.forEach(r=>r.disconnect(t)):Rr(i,e,n).disconnect(t,0),ip={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},sp=(i,e,t,n,s,r,a,o)=>class extends i{constructor(l,u){const h=r(l),d={...ip,...u},p=n(h,d),_=a(h),g=_?t():null;super(l,!1,p,g),this._attack=e(this,_,p.attack),this._knee=e(this,_,p.knee),this._nativeDynamicsCompressorNode=p,this._ratio=e(this,_,p.ratio),this._release=e(this,_,p.release),this._threshold=e(this,_,p.threshold),o(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const u=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=u,s()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const u=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=u,s()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},rp=(i,e,t,n,s)=>()=>{const r=new WeakMap,a=async(o,c)=>{let l=t(o);const u=Ft(l,c);if(!u){const h={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=e(c,h)}return r.set(c,l),u?(await i(c,o.attack,l.attack),await i(c,o.knee,l.knee),await i(c,o.ratio,l.ratio),await i(c,o.release,l.release),await i(c,o.threshold,l.threshold)):(await n(c,o.attack,l.attack),await n(c,o.knee,l.knee),await n(c,o.ratio,l.ratio),await n(c,o.release,l.release),await n(c,o.threshold,l.threshold)),await s(o,c,l),l};return{render(o,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):a(o,c)}}},op=()=>new DOMException("","EncodingError"),ap=i=>e=>new Promise((t,n)=>{if(i===null){n(new SyntaxError);return}const s=i.document.head;if(s===null)n(new SyntaxError);else{const r=i.document.createElement("script"),a=new Blob([e],{type:"application/javascript"}),o=URL.createObjectURL(a),c=i.onerror,l=()=>{i.onerror=c,URL.revokeObjectURL(o)};i.onerror=(u,h,d,p,_)=>{if(h===o||h===i.location.href&&d===1&&p===1)return l(),n(_),!1;if(c!==null)return c(u,h,d,p,_)},r.onerror=()=>{l(),n(new SyntaxError)},r.onload=()=>{l(),t()},r.src=o,r.type="module",s.appendChild(r)}}),cp=i=>class{constructor(t){this._nativeEventTarget=t,this._listeners=new WeakMap}addEventListener(t,n,s){if(n!==null){let r=this._listeners.get(n);r===void 0&&(r=i(this,n),typeof n=="function"&&this._listeners.set(n,r)),this._nativeEventTarget.addEventListener(t,r,s)}}dispatchEvent(t){return this._nativeEventTarget.dispatchEvent(t)}removeEventListener(t,n,s){const r=n===null?void 0:this._listeners.get(n);this._nativeEventTarget.removeEventListener(t,r===void 0?null:r,s)}},lp=i=>(e,t,n)=>{Object.defineProperties(i,{currentFrame:{configurable:!0,get(){return Math.round(e*t)}},currentTime:{configurable:!0,get(){return e}}});try{return n()}finally{i!==null&&(delete i.currentFrame,delete i.currentTime)}},up=i=>async e=>{try{const t=await fetch(e);if(t.ok)return[await t.text(),t.url]}catch{}throw i()},hp={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},dp=(i,e,t,n,s,r)=>class extends i{constructor(o,c){const l=s(o),u={...hp,...c},h=n(l,u),d=r(l),p=d?t():null;super(o,!1,h,p),this._gain=e(this,d,h.gain,Ht,Zt)}get gain(){return this._gain}},fp=(i,e,t,n,s)=>()=>{const r=new WeakMap,a=async(o,c)=>{let l=t(o);const u=Ft(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=e(c,h)}return r.set(c,l),u?await i(c,o.gain,l.gain):await n(c,o.gain,l.gain),await s(o,c,l),l};return{render(o,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):a(o,c)}}},pp=(i,e)=>t=>e(i,t),mp=i=>e=>{const t=i(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return t.renderer},_p=i=>e=>{var t;return(t=i.get(e))!==null&&t!==void 0?t:0},gp=i=>e=>{const t=i(e);if(t.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return t.renderer},vp=i=>e=>i.get(e),Rt=()=>new DOMException("","InvalidStateError"),xp=i=>e=>{const t=i.get(e);if(t===void 0)throw Rt();return t},Sp=(i,e)=>t=>{let n=i.get(t);if(n!==void 0)return n;if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");return n=new e(1,1,44100),i.set(t,n),n},yp=i=>e=>{const t=i.get(e);if(t===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return t},Io=()=>new DOMException("","InvalidAccessError"),Mp=i=>{i.getFrequencyResponse=(e=>(t,n,s)=>{if(t.length!==n.length||n.length!==s.length)throw Io();return e.call(i,t,n,s)})(i.getFrequencyResponse)},Tp={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},Ep=(i,e,t,n,s,r)=>class extends i{constructor(o,c){const l=n(o),u=s(l),h={...Tp,...c},d=e(l,u?null:o.baseLatency,h),p=u?t(h.feedback,h.feedforward):null;super(o,!1,d,p),Mp(d),this._nativeIIRFilterNode=d,r(this,1)}getFrequencyResponse(o,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(o,c,l)}},Zu=(i,e,t,n,s,r,a,o,c,l,u)=>{const h=l.length;let d=o;for(let p=0;p<h;p+=1){let _=t[0]*l[p];for(let g=1;g<s;g+=1){const m=d-g&c-1;_+=t[g]*r[m],_-=i[g]*a[m]}for(let g=s;g<n;g+=1)_+=t[g]*r[d-g&c-1];for(let g=s;g<e;g+=1)_-=i[g]*a[d-g&c-1];r[d]=l[p],a[d]=_,d=d+1&c-1,u[p]=_}return d},bp=(i,e,t,n)=>{const s=t instanceof Float64Array?t:new Float64Array(t),r=n instanceof Float64Array?n:new Float64Array(n),a=s.length,o=r.length,c=Math.min(a,o);if(s[0]!==1){for(let _=0;_<a;_+=1)r[_]/=s[0];for(let _=1;_<o;_+=1)s[_]/=s[0]}const l=32,u=new Float32Array(l),h=new Float32Array(l),d=e.createBuffer(i.numberOfChannels,i.length,i.sampleRate),p=i.numberOfChannels;for(let _=0;_<p;_+=1){const g=i.getChannelData(_),m=d.getChannelData(_);u.fill(0),h.fill(0),Zu(s,a,r,o,c,u,h,0,l,g,m)}return d},wp=(i,e,t,n,s)=>(r,a)=>{const o=new WeakMap;let c=null;const l=async(u,h)=>{let d=null,p=e(u);const _=Ft(p,h);if(h.createIIRFilter===void 0?d=i(h,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):_||(p=h.createIIRFilter(a,r)),o.set(h,d===null?p:d),d!==null){if(c===null){if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");const m=new t(u.context.destination.channelCount,u.context.length,h.sampleRate);c=(async()=>{await n(u,m,m.destination);const f=await s(m);return bp(f,h,r,a)})()}const g=await c;return d.buffer=g,d.start(0),d}return await n(u,h,p),p};return{render(u,h){const d=o.get(h);return d!==void 0?Promise.resolve(d):l(u,h)}}},Ap=(i,e,t,n,s,r)=>a=>(o,c)=>{const l=i.get(o);if(l===void 0){if(!a&&r(o)){const u=n(o),{outputs:h}=t(o);for(const d of h)if(_r(d)){const p=n(d[0]);e(u,p,d[1],d[2])}else{const p=s(d[0]);u.disconnect(p,d[1])}}i.set(o,c)}else i.set(o,l+c)},Cp=(i,e)=>t=>{const n=i.get(t);return e(n)||e(t)},Rp=(i,e)=>t=>i.has(t)||e(t),Pp=(i,e)=>t=>i.has(t)||e(t),Dp=(i,e)=>t=>{const n=i.get(t);return e(n)||e(t)},Lp=i=>e=>i!==null&&e instanceof i,Np=i=>e=>i!==null&&typeof i.AudioNode=="function"&&e instanceof i.AudioNode,Ip=i=>e=>i!==null&&typeof i.AudioParam=="function"&&e instanceof i.AudioParam,Op=(i,e)=>t=>i(t)||e(t),Up=i=>e=>i!==null&&e instanceof i,Fp=i=>i!==null&&i.isSecureContext,kp=(i,e,t,n)=>class extends i{constructor(r,a){const o=t(r),c=e(o,a);if(n(o))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},Bp={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},Vp=(i,e,t,n)=>class extends i{constructor(r,a){const o=t(r);if(n(o))throw new TypeError;const c={...Bp,...a},l=e(o,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},zp=(i,e,t,n)=>class extends i{constructor(r,a){const o=t(r),c=e(o,a);if(n(o))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},Gp=(i,e,t)=>class extends i{constructor(s,r){const a=t(s),o=e(a,r);super(s,!0,o,null)}},Hp=(i,e,t,n,s,r)=>class extends t{constructor(o,c){super(o),this._nativeContext=o,Lo.set(this,o),n(o)&&s.set(o,new Set),this._destination=new i(this,c),this._listener=e(this,o),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(o){const c=typeof o=="function"?r(this,o):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?o:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},$s=i=>{const e=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const t=i.decodeAudioData(e.buffer,()=>{});return t===void 0?!1:(t.catch(()=>{}),!0)}catch{}return!1},Wp=(i,e)=>(t,n,s)=>{const r=new Set;return t.connect=(a=>(o,c=0,l=0)=>{const u=r.size===0;if(e(o))return a.call(t,o,c,l),i(r,[o,c,l],h=>h[0]===o&&h[1]===c&&h[2]===l,!0),u&&n(),o;a.call(t,o,c),i(r,[o,c],h=>h[0]===o&&h[1]===c,!0),u&&n()})(t.connect),t.disconnect=(a=>(o,c,l)=>{const u=r.size>0;if(o===void 0)a.apply(t),r.clear();else if(typeof o=="number"){a.call(t,o);for(const d of r)d[1]===o&&r.delete(d)}else{e(o)?a.call(t,o,c,l):a.call(t,o,c);for(const d of r)d[0]===o&&(c===void 0||d[1]===c)&&(l===void 0||d[2]===l)&&r.delete(d)}const h=r.size===0;u&&h&&s()})(t.disconnect),t},at=(i,e,t)=>{const n=e[t];n!==void 0&&n!==i[t]&&(i[t]=n)},St=(i,e)=>{at(i,e,"channelCount"),at(i,e,"channelCountMode"),at(i,e,"channelInterpretation")},el=i=>typeof i.getFloatTimeDomainData=="function",qp=i=>{i.getFloatTimeDomainData=e=>{const t=new Uint8Array(e.length);i.getByteTimeDomainData(t);const n=Math.max(t.length,i.fftSize);for(let s=0;s<n;s+=1)e[s]=(t[s]-128)*.0078125;return e}},Xp=(i,e)=>(t,n)=>{const s=t.createAnalyser();if(St(s,n),!(n.maxDecibels>n.minDecibels))throw e();return at(s,n,"fftSize"),at(s,n,"maxDecibels"),at(s,n,"minDecibels"),at(s,n,"smoothingTimeConstant"),i(el,()=>el(s))||qp(s),s},Yp=i=>i===null?null:i.hasOwnProperty("AudioBuffer")?i.AudioBuffer:null,ut=(i,e,t)=>{const n=e[t];n!==void 0&&n!==i[t].value&&(i[t].value=n)},jp=i=>{i.start=(e=>{let t=!1;return(n=0,s=0,r)=>{if(t)throw Rt();e.call(i,n,s,r),t=!0}})(i.start)},ic=i=>{i.start=(e=>(t=0,n=0,s)=>{if(typeof s=="number"&&s<0||n<0||t<0)throw new RangeError("The parameters can't be negative.");e.call(i,t,n,s)})(i.start)},sc=i=>{i.stop=(e=>(t=0)=>{if(t<0)throw new RangeError("The parameter can't be negative.");e.call(i,t)})(i.stop)},Zp=(i,e,t,n,s,r,a,o,c,l,u)=>(h,d)=>{const p=h.createBufferSource();return St(p,d),ut(p,d,"playbackRate"),at(p,d,"buffer"),at(p,d,"loop"),at(p,d,"loopEnd"),at(p,d,"loopStart"),e(t,()=>t(h))||jp(p),e(n,()=>n(h))||c(p),e(s,()=>s(h))||l(p,h),e(r,()=>r(h))||ic(p),e(a,()=>a(h))||u(p,h),e(o,()=>o(h))||sc(p),i(h,p),p},$p=i=>i===null?null:i.hasOwnProperty("AudioContext")?i.AudioContext:i.hasOwnProperty("webkitAudioContext")?i.webkitAudioContext:null,Kp=(i,e)=>(t,n,s)=>{const r=t.destination;if(r.channelCount!==n)try{r.channelCount=n}catch{}s&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:n});const a=i(t,{channelCount:n,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return e(a,"channelCount",o=>()=>o.call(a),o=>c=>{o.call(a,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),e(a,"channelCountMode",o=>()=>o.call(a),o=>c=>{o.call(a,c),r.channelCountMode=c}),e(a,"channelInterpretation",o=>()=>o.call(a),o=>c=>{o.call(a,c),r.channelInterpretation=c}),Object.defineProperty(a,"maxChannelCount",{get:()=>r.maxChannelCount}),a.connect(r),a},Jp=i=>i===null?null:i.hasOwnProperty("AudioWorkletNode")?i.AudioWorkletNode:null,Qp=i=>{const{port1:e}=new MessageChannel;try{e.postMessage(i)}finally{e.close()}},em=(i,e,t,n,s)=>(r,a,o,c,l,u)=>{if(o!==null)try{const h=new o(r,c,u),d=new Map;let p=null;if(Object.defineProperties(h,{channelCount:{get:()=>u.channelCount,set:()=>{throw i()}},channelCountMode:{get:()=>"explicit",set:()=>{throw i()}},onprocessorerror:{get:()=>p,set:_=>{typeof p=="function"&&h.removeEventListener("processorerror",p),p=typeof _=="function"?_:null,typeof p=="function"&&h.addEventListener("processorerror",p)}}}),h.addEventListener=(_=>(...g)=>{if(g[0]==="processorerror"){const m=typeof g[1]=="function"?g[1]:typeof g[1]=="object"&&g[1]!==null&&typeof g[1].handleEvent=="function"?g[1].handleEvent:null;if(m!==null){const f=d.get(g[1]);f!==void 0?g[1]=f:(g[1]=y=>{y.type==="error"?(Object.defineProperties(y,{type:{value:"processorerror"}}),m(y)):m(new ErrorEvent(g[0],{...y}))},d.set(m,g[1]))}}return _.call(h,"error",g[1],g[2]),_.call(h,...g)})(h.addEventListener),h.removeEventListener=(_=>(...g)=>{if(g[0]==="processorerror"){const m=d.get(g[1]);m!==void 0&&(d.delete(g[1]),g[1]=m)}return _.call(h,"error",g[1],g[2]),_.call(h,g[0],g[1],g[2])})(h.removeEventListener),u.numberOfOutputs!==0){const _=t(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return h.connect(_).connect(r.destination),s(h,()=>_.disconnect(),()=>_.connect(r.destination))}return h}catch(h){throw h.code===11?n():h}if(l===void 0)throw n();return Qp(u),e(r,a,l,u)},$u=(i,e)=>i===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(i*e))))),tm=i=>new Promise((e,t)=>{const{port1:n,port2:s}=new MessageChannel;n.onmessage=({data:r})=>{n.close(),s.close(),e(r)},n.onmessageerror=({data:r})=>{n.close(),s.close(),t(r)},s.postMessage(i)}),nm=async(i,e)=>{const t=await tm(e);return new i(t)},im=(i,e,t,n)=>{let s=Na.get(i);s===void 0&&(s=new WeakMap,Na.set(i,s));const r=nm(t,n);return s.set(e,r),r},sm=(i,e,t,n,s,r,a,o,c,l,u,h,d)=>(p,_,g,m)=>{if(m.numberOfInputs===0&&m.numberOfOutputs===0)throw c();const f=Array.isArray(m.outputChannelCount)?m.outputChannelCount:Array.from(m.outputChannelCount);if(f.some(J=>J<1))throw c();if(f.length!==m.numberOfOutputs)throw e();if(m.channelCountMode!=="explicit")throw c();const y=m.channelCount*m.numberOfInputs,v=f.reduce((J,te)=>J+te,0),A=g.parameterDescriptors===void 0?0:g.parameterDescriptors.length;if(y+A>6||v>6)throw c();const S=new MessageChannel,E=[],T=[];for(let J=0;J<m.numberOfInputs;J+=1)E.push(a(p,{channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation,gain:1})),T.push(s(p,{channelCount:m.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:m.channelCount}));const C=[];if(g.parameterDescriptors!==void 0)for(const{defaultValue:J,maxValue:te,minValue:Ie,name:xe}of g.parameterDescriptors){const fe=r(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:m.parameterData[xe]!==void 0?m.parameterData[xe]:J===void 0?0:J});Object.defineProperties(fe.offset,{defaultValue:{get:()=>J===void 0?0:J},maxValue:{get:()=>te===void 0?Ht:te},minValue:{get:()=>Ie===void 0?Zt:Ie}}),C.push(fe)}const x=n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,y+A)}),b=$u(_,p.sampleRate),D=o(p,b,y+A,Math.max(1,v)),L=s(p,{channelCount:Math.max(1,v),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,v)}),F=[];for(let J=0;J<m.numberOfOutputs;J+=1)F.push(n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:f[J]}));for(let J=0;J<m.numberOfInputs;J+=1){E[J].connect(T[J]);for(let te=0;te<m.channelCount;te+=1)T[J].connect(x,te,J*m.channelCount+te)}const P=new Yu(g.parameterDescriptors===void 0?[]:g.parameterDescriptors.map(({name:J},te)=>{const Ie=C[te];return Ie.connect(x,0,y+te),Ie.start(0),[J,Ie.offset]}));x.connect(D);let I=m.channelInterpretation,k=null;const O=m.numberOfOutputs===0?[D]:F,Z={get bufferSize(){return b},get channelCount(){return m.channelCount},set channelCount(J){throw t()},get channelCountMode(){return m.channelCountMode},set channelCountMode(J){throw t()},get channelInterpretation(){return I},set channelInterpretation(J){for(const te of E)te.channelInterpretation=J;I=J},get context(){return D.context},get inputs(){return E},get numberOfInputs(){return m.numberOfInputs},get numberOfOutputs(){return m.numberOfOutputs},get onprocessorerror(){return k},set onprocessorerror(J){typeof k=="function"&&Z.removeEventListener("processorerror",k),k=typeof J=="function"?J:null,typeof k=="function"&&Z.addEventListener("processorerror",k)},get parameters(){return P},get port(){return S.port2},addEventListener(...J){return D.addEventListener(J[0],J[1],J[2])},connect:i.bind(null,O),disconnect:l.bind(null,O),dispatchEvent(...J){return D.dispatchEvent(J[0])},removeEventListener(...J){return D.removeEventListener(J[0],J[1],J[2])}},B=new Map;S.port1.addEventListener=(J=>(...te)=>{if(te[0]==="message"){const Ie=typeof te[1]=="function"?te[1]:typeof te[1]=="object"&&te[1]!==null&&typeof te[1].handleEvent=="function"?te[1].handleEvent:null;if(Ie!==null){const xe=B.get(te[1]);xe!==void 0?te[1]=xe:(te[1]=fe=>{u(p.currentTime,p.sampleRate,()=>Ie(fe))},B.set(Ie,te[1]))}}return J.call(S.port1,te[0],te[1],te[2])})(S.port1.addEventListener),S.port1.removeEventListener=(J=>(...te)=>{if(te[0]==="message"){const Ie=B.get(te[1]);Ie!==void 0&&(B.delete(te[1]),te[1]=Ie)}return J.call(S.port1,te[0],te[1],te[2])})(S.port1.removeEventListener);let q=null;Object.defineProperty(S.port1,"onmessage",{get:()=>q,set:J=>{typeof q=="function"&&S.port1.removeEventListener("message",q),q=typeof J=="function"?J:null,typeof q=="function"&&(S.port1.addEventListener("message",q),S.port1.start())}}),g.prototype.port=S.port1;let j=null;im(p,Z,g,m).then(J=>j=J);const X=fo(m.numberOfInputs,m.channelCount),K=fo(m.numberOfOutputs,f),Q=g.parameterDescriptors===void 0?[]:g.parameterDescriptors.reduce((J,{name:te})=>({...J,[te]:new Float32Array(128)}),{});let ue=!0;const pe=()=>{m.numberOfOutputs>0&&D.disconnect(L);for(let J=0,te=0;J<m.numberOfOutputs;J+=1){const Ie=F[J];for(let xe=0;xe<f[J];xe+=1)L.disconnect(Ie,te+xe,xe);te+=f[J]}},ee=new Map;D.onaudioprocess=({inputBuffer:J,outputBuffer:te})=>{if(j!==null){const Ie=h(Z);for(let xe=0;xe<b;xe+=128){for(let fe=0;fe<m.numberOfInputs;fe+=1)for(let Ee=0;Ee<m.channelCount;Ee+=1)ho(J,X[fe],Ee,Ee,xe);g.parameterDescriptors!==void 0&&g.parameterDescriptors.forEach(({name:fe},Ee)=>{ho(J,Q,fe,y+Ee,xe)});for(let fe=0;fe<m.numberOfInputs;fe+=1)for(let Ee=0;Ee<f[fe];Ee+=1)K[fe][Ee].byteLength===0&&(K[fe][Ee]=new Float32Array(128));try{const fe=X.map((Ze,et)=>{if(Ie[et].size>0)return ee.set(et,b/128),Ze;const M=ee.get(et);return M===void 0?[]:(Ze.every(z=>z.every(se=>se===0))&&(M===1?ee.delete(et):ee.set(et,M-1)),Ze)});ue=u(p.currentTime+xe/p.sampleRate,p.sampleRate,()=>j.process(fe,K,Q));for(let Ze=0,et=0;Ze<m.numberOfOutputs;Ze+=1){for(let R=0;R<f[Ze];R+=1)ju(te,K[Ze],R,et+R,xe);et+=f[Ze]}}catch(fe){ue=!1,Z.dispatchEvent(new ErrorEvent("processorerror",{colno:fe.colno,filename:fe.filename,lineno:fe.lineno,message:fe.message}))}if(!ue){for(let fe=0;fe<m.numberOfInputs;fe+=1){E[fe].disconnect(T[fe]);for(let Ee=0;Ee<m.channelCount;Ee+=1)T[xe].disconnect(x,Ee,fe*m.channelCount+Ee)}if(g.parameterDescriptors!==void 0){const fe=g.parameterDescriptors.length;for(let Ee=0;Ee<fe;Ee+=1){const Ze=C[Ee];Ze.disconnect(x,0,y+Ee),Ze.stop()}}x.disconnect(D),D.onaudioprocess=null,we?pe():V();break}}}};let we=!1;const Te=a(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),Re=()=>D.connect(Te).connect(p.destination),V=()=>{D.disconnect(Te),Te.disconnect()},Pt=()=>{if(ue){V(),m.numberOfOutputs>0&&D.connect(L);for(let J=0,te=0;J<m.numberOfOutputs;J+=1){const Ie=F[J];for(let xe=0;xe<f[J];xe+=1)L.connect(Ie,te+xe,xe);te+=f[J]}}we=!0},Me=()=>{ue&&(Re(),pe()),we=!1};return Re(),d(Z,Pt,Me)},Ku=(i,e)=>{const t=i.createBiquadFilter();return St(t,e),ut(t,e,"Q"),ut(t,e,"detune"),ut(t,e,"frequency"),ut(t,e,"gain"),at(t,e,"type"),t},rm=(i,e)=>(t,n)=>{const s=t.createChannelMerger(n.numberOfInputs);return i!==null&&i.name==="webkitAudioContext"&&e(t,s),St(s,n),s},om=i=>{const e=i.numberOfOutputs;Object.defineProperty(i,"channelCount",{get:()=>e,set:t=>{if(t!==e)throw Rt()}}),Object.defineProperty(i,"channelCountMode",{get:()=>"explicit",set:t=>{if(t!=="explicit")throw Rt()}}),Object.defineProperty(i,"channelInterpretation",{get:()=>"discrete",set:t=>{if(t!=="discrete")throw Rt()}})},gr=(i,e)=>{const t=i.createChannelSplitter(e.numberOfOutputs);return St(t,e),om(t),t},am=(i,e,t,n,s)=>(r,a)=>{if(r.createConstantSource===void 0)return t(r,a);const o=r.createConstantSource();return St(o,a),ut(o,a,"offset"),e(n,()=>n(r))||ic(o),e(s,()=>s(r))||sc(o),i(r,o),o},Ps=(i,e)=>(i.connect=e.connect.bind(e),i.disconnect=e.disconnect.bind(e),i),cm=(i,e,t,n)=>(s,{offset:r,...a})=>{const o=s.createBuffer(1,2,44100),c=e(s,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=t(s,{...a,gain:r}),u=o.getChannelData(0);u[0]=1,u[1]=1,c.buffer=o,c.loop=!0;const h={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(_){l.channelCount=_},get channelCountMode(){return l.channelCountMode},set channelCountMode(_){l.channelCountMode=_},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(_){l.channelInterpretation=_},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(_){c.onended=_},addEventListener(..._){return c.addEventListener(_[0],_[1],_[2])},dispatchEvent(..._){return c.dispatchEvent(_[0])},removeEventListener(..._){return c.removeEventListener(_[0],_[1],_[2])},start(_=0){c.start.call(c,_)},stop(_=0){c.stop.call(c,_)}},d=()=>c.connect(l),p=()=>c.disconnect(l);return i(s,c),n(Ps(h,l),d,p)},lm=(i,e)=>(t,n)=>{const s=t.createConvolver();if(St(s,n),n.disableNormalization===s.normalize&&(s.normalize=!n.disableNormalization),at(s,n,"buffer"),n.channelCount>2||(e(s,"channelCount",r=>()=>r.call(s),r=>a=>{if(a>2)throw i();return r.call(s,a)}),n.channelCountMode==="max"))throw i();return e(s,"channelCountMode",r=>()=>r.call(s),r=>a=>{if(a==="max")throw i();return r.call(s,a)}),s},Ju=(i,e)=>{const t=i.createDelay(e.maxDelayTime);return St(t,e),ut(t,e,"delayTime"),t},um=i=>(e,t)=>{const n=e.createDynamicsCompressor();if(St(n,t),t.channelCount>2||t.channelCountMode==="max")throw i();return ut(n,t,"attack"),ut(n,t,"knee"),ut(n,t,"ratio"),ut(n,t,"release"),ut(n,t,"threshold"),n},Jt=(i,e)=>{const t=i.createGain();return St(t,e),ut(t,e,"gain"),t},hm=i=>(e,t,n)=>{if(e.createIIRFilter===void 0)return i(e,t,n);const s=e.createIIRFilter(n.feedforward,n.feedback);return St(s,n),s};function dm(i,e){const t=e[0]*e[0]+e[1]*e[1];return[(i[0]*e[0]+i[1]*e[1])/t,(i[1]*e[0]-i[0]*e[1])/t]}function fm(i,e){return[i[0]*e[0]-i[1]*e[1],i[0]*e[1]+i[1]*e[0]]}function tl(i,e){let t=[0,0];for(let n=i.length-1;n>=0;n-=1)t=fm(t,e),t[0]+=i[n];return t}const pm=(i,e,t,n)=>(s,r,{channelCount:a,channelCountMode:o,channelInterpretation:c,feedback:l,feedforward:u})=>{const h=$u(r,s.sampleRate),d=l instanceof Float64Array?l:new Float64Array(l),p=u instanceof Float64Array?u:new Float64Array(u),_=d.length,g=p.length,m=Math.min(_,g);if(_===0||_>20)throw n();if(d[0]===0)throw e();if(g===0||g>20)throw n();if(p[0]===0)throw e();if(d[0]!==1){for(let C=0;C<g;C+=1)p[C]/=d[0];for(let C=1;C<_;C+=1)d[C]/=d[0]}const f=t(s,h,a,a);f.channelCount=a,f.channelCountMode=o,f.channelInterpretation=c;const y=32,v=[],A=[],S=[];for(let C=0;C<a;C+=1){v.push(0);const x=new Float32Array(y),b=new Float32Array(y);x.fill(0),b.fill(0),A.push(x),S.push(b)}f.onaudioprocess=C=>{const x=C.inputBuffer,b=C.outputBuffer,D=x.numberOfChannels;for(let L=0;L<D;L+=1){const F=x.getChannelData(L),P=b.getChannelData(L);v[L]=Zu(d,_,p,g,m,A[L],S[L],v[L],y,F,P)}};const E=s.sampleRate/2;return Ps({get bufferSize(){return h},get channelCount(){return f.channelCount},set channelCount(C){f.channelCount=C},get channelCountMode(){return f.channelCountMode},set channelCountMode(C){f.channelCountMode=C},get channelInterpretation(){return f.channelInterpretation},set channelInterpretation(C){f.channelInterpretation=C},get context(){return f.context},get inputs(){return[f]},get numberOfInputs(){return f.numberOfInputs},get numberOfOutputs(){return f.numberOfOutputs},addEventListener(...C){return f.addEventListener(C[0],C[1],C[2])},dispatchEvent(...C){return f.dispatchEvent(C[0])},getFrequencyResponse(C,x,b){if(C.length!==x.length||x.length!==b.length)throw i();const D=C.length;for(let L=0;L<D;L+=1){const F=-Math.PI*(C[L]/E),P=[Math.cos(F),Math.sin(F)],I=tl(p,P),k=tl(d,P),O=dm(I,k);x[L]=Math.sqrt(O[0]*O[0]+O[1]*O[1]),b[L]=Math.atan2(O[1],O[0])}},removeEventListener(...C){return f.removeEventListener(C[0],C[1],C[2])}},f)},mm=(i,e)=>i.createMediaElementSource(e.mediaElement),_m=(i,e)=>{const t=i.createMediaStreamDestination();return St(t,e),t.numberOfOutputs===1&&Object.defineProperty(t,"numberOfOutputs",{get:()=>0}),t},gm=(i,{mediaStream:e})=>{const t=e.getAudioTracks();t.sort((r,a)=>r.id<a.id?-1:r.id>a.id?1:0);const n=t.slice(0,1),s=i.createMediaStreamSource(new MediaStream(n));return Object.defineProperty(s,"mediaStream",{value:e}),s},vm=(i,e)=>(t,{mediaStreamTrack:n})=>{if(typeof t.createMediaStreamTrackSource=="function")return t.createMediaStreamTrackSource(n);const s=new MediaStream([n]),r=t.createMediaStreamSource(s);if(n.kind!=="audio")throw i();if(e(t))throw new TypeError;return r},xm=i=>i===null?null:i.hasOwnProperty("OfflineAudioContext")?i.OfflineAudioContext:i.hasOwnProperty("webkitOfflineAudioContext")?i.webkitOfflineAudioContext:null,Sm=(i,e,t,n,s,r)=>(a,o)=>{const c=a.createOscillator();return St(c,o),ut(c,o,"detune"),ut(c,o,"frequency"),o.periodicWave!==void 0?c.setPeriodicWave(o.periodicWave):at(c,o,"type"),e(t,()=>t(a))||ic(c),e(n,()=>n(a))||r(c,a),e(s,()=>s(a))||sc(c),i(a,c),c},ym=i=>(e,t)=>{const n=e.createPanner();return n.orientationX===void 0?i(e,t):(St(n,t),ut(n,t,"orientationX"),ut(n,t,"orientationY"),ut(n,t,"orientationZ"),ut(n,t,"positionX"),ut(n,t,"positionY"),ut(n,t,"positionZ"),at(n,t,"coneInnerAngle"),at(n,t,"coneOuterAngle"),at(n,t,"coneOuterGain"),at(n,t,"distanceModel"),at(n,t,"maxDistance"),at(n,t,"panningModel"),at(n,t,"refDistance"),at(n,t,"rolloffFactor"),n)},Mm=(i,e,t,n,s,r,a,o,c,l)=>(u,{coneInnerAngle:h,coneOuterAngle:d,coneOuterGain:p,distanceModel:_,maxDistance:g,orientationX:m,orientationY:f,orientationZ:y,panningModel:v,positionX:A,positionY:S,positionZ:E,refDistance:T,rolloffFactor:C,...x})=>{const b=u.createPanner();if(x.channelCount>2||x.channelCountMode==="max")throw a();St(b,x);const D={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},L=t(u,{...D,channelInterpretation:"speakers",numberOfInputs:6}),F=n(u,{...x,gain:1}),P=n(u,{...D,gain:1}),I=n(u,{...D,gain:0}),k=n(u,{...D,gain:0}),O=n(u,{...D,gain:0}),Z=n(u,{...D,gain:0}),B=n(u,{...D,gain:0}),q=s(u,256,6,1),j=r(u,{...D,curve:new Float32Array([1,1]),oversample:"none"});let ie=[m,f,y],X=[A,S,E];const K=new Float32Array(1);q.onaudioprocess=({inputBuffer:ee})=>{const we=[c(ee,K,0),c(ee,K,1),c(ee,K,2)];we.some((Re,V)=>Re!==ie[V])&&(b.setOrientation(...we),ie=we);const Te=[c(ee,K,3),c(ee,K,4),c(ee,K,5)];Te.some((Re,V)=>Re!==X[V])&&(b.setPosition(...Te),X=Te)},Object.defineProperty(I.gain,"defaultValue",{get:()=>0}),Object.defineProperty(k.gain,"defaultValue",{get:()=>0}),Object.defineProperty(O.gain,"defaultValue",{get:()=>0}),Object.defineProperty(Z.gain,"defaultValue",{get:()=>0}),Object.defineProperty(B.gain,"defaultValue",{get:()=>0});const Q={get bufferSize(){},get channelCount(){return b.channelCount},set channelCount(ee){if(ee>2)throw a();F.channelCount=ee,b.channelCount=ee},get channelCountMode(){return b.channelCountMode},set channelCountMode(ee){if(ee==="max")throw a();F.channelCountMode=ee,b.channelCountMode=ee},get channelInterpretation(){return b.channelInterpretation},set channelInterpretation(ee){F.channelInterpretation=ee,b.channelInterpretation=ee},get coneInnerAngle(){return b.coneInnerAngle},set coneInnerAngle(ee){b.coneInnerAngle=ee},get coneOuterAngle(){return b.coneOuterAngle},set coneOuterAngle(ee){b.coneOuterAngle=ee},get coneOuterGain(){return b.coneOuterGain},set coneOuterGain(ee){if(ee<0||ee>1)throw e();b.coneOuterGain=ee},get context(){return b.context},get distanceModel(){return b.distanceModel},set distanceModel(ee){b.distanceModel=ee},get inputs(){return[F]},get maxDistance(){return b.maxDistance},set maxDistance(ee){if(ee<0)throw new RangeError;b.maxDistance=ee},get numberOfInputs(){return b.numberOfInputs},get numberOfOutputs(){return b.numberOfOutputs},get orientationX(){return P.gain},get orientationY(){return I.gain},get orientationZ(){return k.gain},get panningModel(){return b.panningModel},set panningModel(ee){b.panningModel=ee},get positionX(){return O.gain},get positionY(){return Z.gain},get positionZ(){return B.gain},get refDistance(){return b.refDistance},set refDistance(ee){if(ee<0)throw new RangeError;b.refDistance=ee},get rolloffFactor(){return b.rolloffFactor},set rolloffFactor(ee){if(ee<0)throw new RangeError;b.rolloffFactor=ee},addEventListener(...ee){return F.addEventListener(ee[0],ee[1],ee[2])},dispatchEvent(...ee){return F.dispatchEvent(ee[0])},removeEventListener(...ee){return F.removeEventListener(ee[0],ee[1],ee[2])}};h!==Q.coneInnerAngle&&(Q.coneInnerAngle=h),d!==Q.coneOuterAngle&&(Q.coneOuterAngle=d),p!==Q.coneOuterGain&&(Q.coneOuterGain=p),_!==Q.distanceModel&&(Q.distanceModel=_),g!==Q.maxDistance&&(Q.maxDistance=g),m!==Q.orientationX.value&&(Q.orientationX.value=m),f!==Q.orientationY.value&&(Q.orientationY.value=f),y!==Q.orientationZ.value&&(Q.orientationZ.value=y),v!==Q.panningModel&&(Q.panningModel=v),A!==Q.positionX.value&&(Q.positionX.value=A),S!==Q.positionY.value&&(Q.positionY.value=S),E!==Q.positionZ.value&&(Q.positionZ.value=E),T!==Q.refDistance&&(Q.refDistance=T),C!==Q.rolloffFactor&&(Q.rolloffFactor=C),(ie[0]!==1||ie[1]!==0||ie[2]!==0)&&b.setOrientation(...ie),(X[0]!==0||X[1]!==0||X[2]!==0)&&b.setPosition(...X);const ue=()=>{F.connect(b),i(F,j,0,0),j.connect(P).connect(L,0,0),j.connect(I).connect(L,0,1),j.connect(k).connect(L,0,2),j.connect(O).connect(L,0,3),j.connect(Z).connect(L,0,4),j.connect(B).connect(L,0,5),L.connect(q).connect(u.destination)},pe=()=>{F.disconnect(b),o(F,j,0,0),j.disconnect(P),P.disconnect(L),j.disconnect(I),I.disconnect(L),j.disconnect(k),k.disconnect(L),j.disconnect(O),O.disconnect(L),j.disconnect(Z),Z.disconnect(L),j.disconnect(B),B.disconnect(L),L.disconnect(q),q.disconnect(u.destination)};return l(Ps(Q,b),ue,pe)},Tm=i=>(e,{disableNormalization:t,imag:n,real:s})=>{const r=n instanceof Float32Array?n:new Float32Array(n),a=s instanceof Float32Array?s:new Float32Array(s),o=e.createPeriodicWave(a,r,{disableNormalization:t});if(Array.from(n).length<2)throw i();return o},vr=(i,e,t,n)=>i.createScriptProcessor(e,t,n),Em=(i,e)=>(t,n)=>{const s=n.channelCountMode;if(s==="clamped-max")throw e();if(t.createStereoPanner===void 0)return i(t,n);const r=t.createStereoPanner();return St(r,n),ut(r,n,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>s,set:a=>{if(a!==s)throw e()}}),r},bm=(i,e,t,n,s,r)=>{const o=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},u={...l,oversample:"none"},h=(_,g,m,f)=>{const y=new Float32Array(16385),v=new Float32Array(16385);for(let x=0;x<16385;x+=1){const b=x/16384*c;y[x]=Math.cos(b),v[x]=Math.sin(b)}const A=t(_,{...l,gain:0}),S=n(_,{...u,curve:y}),E=n(_,{...u,curve:o}),T=t(_,{...l,gain:0}),C=n(_,{...u,curve:v});return{connectGraph(){g.connect(A),g.connect(E.inputs===void 0?E:E.inputs[0]),g.connect(T),E.connect(m),m.connect(S.inputs===void 0?S:S.inputs[0]),m.connect(C.inputs===void 0?C:C.inputs[0]),S.connect(A.gain),C.connect(T.gain),A.connect(f,0,0),T.connect(f,0,1)},disconnectGraph(){g.disconnect(A),g.disconnect(E.inputs===void 0?E:E.inputs[0]),g.disconnect(T),E.disconnect(m),m.disconnect(S.inputs===void 0?S:S.inputs[0]),m.disconnect(C.inputs===void 0?C:C.inputs[0]),S.disconnect(A.gain),C.disconnect(T.gain),A.disconnect(f,0,0),T.disconnect(f,0,1)}}},d=(_,g,m,f)=>{const y=new Float32Array(16385),v=new Float32Array(16385),A=new Float32Array(16385),S=new Float32Array(16385),E=Math.floor(16385/2);for(let O=0;O<16385;O+=1)if(O>E){const Z=(O-E)/(16384-E)*c;y[O]=Math.cos(Z),v[O]=Math.sin(Z),A[O]=0,S[O]=1}else{const Z=O/(16384-E)*c;y[O]=1,v[O]=0,A[O]=Math.cos(Z),S[O]=Math.sin(Z)}const T=e(_,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),C=t(_,{...l,gain:0}),x=n(_,{...u,curve:y}),b=t(_,{...l,gain:0}),D=n(_,{...u,curve:v}),L=n(_,{...u,curve:o}),F=t(_,{...l,gain:0}),P=n(_,{...u,curve:A}),I=t(_,{...l,gain:0}),k=n(_,{...u,curve:S});return{connectGraph(){g.connect(T),g.connect(L.inputs===void 0?L:L.inputs[0]),T.connect(C,0),T.connect(b,0),T.connect(F,1),T.connect(I,1),L.connect(m),m.connect(x.inputs===void 0?x:x.inputs[0]),m.connect(D.inputs===void 0?D:D.inputs[0]),m.connect(P.inputs===void 0?P:P.inputs[0]),m.connect(k.inputs===void 0?k:k.inputs[0]),x.connect(C.gain),D.connect(b.gain),P.connect(F.gain),k.connect(I.gain),C.connect(f,0,0),F.connect(f,0,0),b.connect(f,0,1),I.connect(f,0,1)},disconnectGraph(){g.disconnect(T),g.disconnect(L.inputs===void 0?L:L.inputs[0]),T.disconnect(C,0),T.disconnect(b,0),T.disconnect(F,1),T.disconnect(I,1),L.disconnect(m),m.disconnect(x.inputs===void 0?x:x.inputs[0]),m.disconnect(D.inputs===void 0?D:D.inputs[0]),m.disconnect(P.inputs===void 0?P:P.inputs[0]),m.disconnect(k.inputs===void 0?k:k.inputs[0]),x.disconnect(C.gain),D.disconnect(b.gain),P.disconnect(F.gain),k.disconnect(I.gain),C.disconnect(f,0,0),F.disconnect(f,0,0),b.disconnect(f,0,1),I.disconnect(f,0,1)}}},p=(_,g,m,f,y)=>{if(g===1)return h(_,m,f,y);if(g===2)return d(_,m,f,y);throw s()};return(_,{channelCount:g,channelCountMode:m,pan:f,...y})=>{if(m==="max")throw s();const v=i(_,{...y,channelCount:1,channelCountMode:m,numberOfInputs:2}),A=t(_,{...y,channelCount:g,channelCountMode:m,gain:1}),S=t(_,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:f});let{connectGraph:E,disconnectGraph:T}=p(_,g,A,S,v);Object.defineProperty(S.gain,"defaultValue",{get:()=>0}),Object.defineProperty(S.gain,"maxValue",{get:()=>1}),Object.defineProperty(S.gain,"minValue",{get:()=>-1});const C={get bufferSize(){},get channelCount(){return A.channelCount},set channelCount(L){A.channelCount!==L&&(x&&T(),{connectGraph:E,disconnectGraph:T}=p(_,L,A,S,v),x&&E()),A.channelCount=L},get channelCountMode(){return A.channelCountMode},set channelCountMode(L){if(L==="clamped-max"||L==="max")throw s();A.channelCountMode=L},get channelInterpretation(){return A.channelInterpretation},set channelInterpretation(L){A.channelInterpretation=L},get context(){return A.context},get inputs(){return[A]},get numberOfInputs(){return A.numberOfInputs},get numberOfOutputs(){return A.numberOfOutputs},get pan(){return S.gain},addEventListener(...L){return A.addEventListener(L[0],L[1],L[2])},dispatchEvent(...L){return A.dispatchEvent(L[0])},removeEventListener(...L){return A.removeEventListener(L[0],L[1],L[2])}};let x=!1;const b=()=>{E(),x=!0},D=()=>{T(),x=!1};return r(Ps(C,v),b,D)}},wm=(i,e,t,n,s,r,a)=>(o,c)=>{const l=o.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&o.createGain().gain.automationRate===void 0)return t(o,c);St(l,c);const u=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(u!==null&&u.length<2)throw e();at(l,{curve:u},"curve"),at(l,c,"oversample");let h=null,d=!1;return a(l,"curve",g=>()=>g.call(l),g=>m=>(g.call(l,m),d&&(n(m)&&h===null?h=i(o,l):!n(m)&&h!==null&&(h(),h=null)),m)),s(l,()=>{d=!0,n(l.curve)&&(h=i(o,l))},()=>{d=!1,h!==null&&(h(),h=null)})},Am=(i,e,t,n,s)=>(r,{curve:a,oversample:o,...c})=>{const l=r.createWaveShaper(),u=r.createWaveShaper();St(l,c),St(u,c);const h=t(r,{...c,gain:1}),d=t(r,{...c,gain:-1}),p=t(r,{...c,gain:1}),_=t(r,{...c,gain:-1});let g=null,m=!1,f=null;const y={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(S){h.channelCount=S,d.channelCount=S,l.channelCount=S,p.channelCount=S,u.channelCount=S,_.channelCount=S},get channelCountMode(){return l.channelCountMode},set channelCountMode(S){h.channelCountMode=S,d.channelCountMode=S,l.channelCountMode=S,p.channelCountMode=S,u.channelCountMode=S,_.channelCountMode=S},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(S){h.channelInterpretation=S,d.channelInterpretation=S,l.channelInterpretation=S,p.channelInterpretation=S,u.channelInterpretation=S,_.channelInterpretation=S},get context(){return l.context},get curve(){return f},set curve(S){if(S!==null&&S.length<2)throw e();if(S===null)l.curve=S,u.curve=S;else{const E=S.length,T=new Float32Array(E+2-E%2),C=new Float32Array(E+2-E%2);T[0]=S[0],C[0]=-S[E-1];const x=Math.ceil((E+1)/2),b=(E+1)/2-1;for(let D=1;D<x;D+=1){const L=D/x*b,F=Math.floor(L),P=Math.ceil(L);T[D]=F===P?S[F]:(1-(L-F))*S[F]+(1-(P-L))*S[P],C[D]=F===P?-S[E-1-F]:-((1-(L-F))*S[E-1-F])-(1-(P-L))*S[E-1-P]}T[x]=E%2===1?S[x-1]:(S[x-2]+S[x-1])/2,l.curve=T,u.curve=C}f=S,m&&(n(f)&&g===null?g=i(r,h):g!==null&&(g(),g=null))},get inputs(){return[h]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(S){l.oversample=S,u.oversample=S},addEventListener(...S){return h.addEventListener(S[0],S[1],S[2])},dispatchEvent(...S){return h.dispatchEvent(S[0])},removeEventListener(...S){return h.removeEventListener(S[0],S[1],S[2])}};a!==null&&(y.curve=a instanceof Float32Array?a:new Float32Array(a)),o!==y.oversample&&(y.oversample=o);const v=()=>{h.connect(l).connect(p),h.connect(d).connect(u).connect(_).connect(p),m=!0,n(f)&&(g=i(r,h))},A=()=>{h.disconnect(l),l.disconnect(p),h.disconnect(d),d.disconnect(u),u.disconnect(_),_.disconnect(p),m=!1,g!==null&&(g(),g=null)};return s(Ps(y,p),v,A)},jt=()=>new DOMException("","NotSupportedError"),Cm={numberOfChannels:1},Rm=(i,e,t,n,s)=>class extends i{constructor(a,o,c){let l;if(typeof a=="number"&&o!==void 0&&c!==void 0)l={length:o,numberOfChannels:a,sampleRate:c};else if(typeof a=="object")l=a;else throw new Error("The given parameters are not valid.");const{length:u,numberOfChannels:h,sampleRate:d}={...Cm,...l},p=n(h,u,d);e($s,()=>$s(p))||p.addEventListener("statechange",(()=>{let _=0;const g=m=>{this._state==="running"&&(_>0?(p.removeEventListener("statechange",g),m.stopImmediatePropagation(),this._waitForThePromiseToSettle(m)):_+=1)};return g})()),super(p,h),this._length=u,this._nativeOfflineAudioContext=p,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(t()):(this._state="running",s(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,Hu(this)}))}_waitForThePromiseToSettle(a){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(a):setTimeout(()=>this._waitForThePromiseToSettle(a))}},Pm={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},Dm=(i,e,t,n,s,r,a)=>class extends i{constructor(c,l){const u=s(c),h={...Pm,...l},d=t(u,h),p=r(u),_=p?n():null,g=c.sampleRate/2;super(c,!1,d,_),this._detune=e(this,p,d.detune,153600,-153600),this._frequency=e(this,p,d.frequency,g,-g),this._nativeOscillatorNode=d,this._onended=null,this._oscillatorNodeRenderer=_,this._oscillatorNodeRenderer!==null&&h.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=h.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?a(this,c):null;this._nativeOscillatorNode.onended=l;const u=this._nativeOscillatorNode.onended;this._onended=u!==null&&u===l?c:u}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){xs(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),Hn(this)&&pr(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},Lm=(i,e,t,n,s)=>()=>{const r=new WeakMap;let a=null,o=null,c=null;const l=async(u,h)=>{let d=t(u);const p=Ft(d,h);if(!p){const _={channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,detune:d.detune.value,frequency:d.frequency.value,periodicWave:a===null?void 0:a,type:d.type};d=e(h,_),o!==null&&d.start(o),c!==null&&d.stop(c)}return r.set(h,d),p?(await i(h,u.detune,d.detune),await i(h,u.frequency,d.frequency)):(await n(h,u.detune,d.detune),await n(h,u.frequency,d.frequency)),await s(u,h,d),d};return{set periodicWave(u){a=u},set start(u){o=u},set stop(u){c=u},render(u,h){const d=r.get(h);return d!==void 0?Promise.resolve(d):l(u,h)}}},Nm={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},Im=(i,e,t,n,s,r,a)=>class extends i{constructor(c,l){const u=s(c),h={...Nm,...l},d=t(u,h),p=r(u),_=p?n():null;super(c,!1,d,_),this._nativePannerNode=d,this._orientationX=e(this,p,d.orientationX,Ht,Zt),this._orientationY=e(this,p,d.orientationY,Ht,Zt),this._orientationZ=e(this,p,d.orientationZ,Ht,Zt),this._positionX=e(this,p,d.positionX,Ht,Zt),this._positionY=e(this,p,d.positionY,Ht,Zt),this._positionZ=e(this,p,d.positionZ,Ht,Zt),a(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},Om=(i,e,t,n,s,r,a,o,c,l)=>()=>{const u=new WeakMap;let h=null;const d=async(p,_)=>{let g=null,m=r(p);const f={channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation},y={...f,coneInnerAngle:m.coneInnerAngle,coneOuterAngle:m.coneOuterAngle,coneOuterGain:m.coneOuterGain,distanceModel:m.distanceModel,maxDistance:m.maxDistance,panningModel:m.panningModel,refDistance:m.refDistance,rolloffFactor:m.rolloffFactor},v=Ft(m,_);if("bufferSize"in m)g=n(_,{...f,gain:1});else if(!v){const A={...y,orientationX:m.orientationX.value,orientationY:m.orientationY.value,orientationZ:m.orientationZ.value,positionX:m.positionX.value,positionY:m.positionY.value,positionZ:m.positionZ.value};m=s(_,A)}if(u.set(_,g===null?m:g),g!==null){if(h===null){if(a===null)throw new Error("Missing the native OfflineAudioContext constructor.");const D=new a(6,p.context.length,_.sampleRate),L=e(D,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});L.connect(D.destination),h=(async()=>{const F=await Promise.all([p.orientationX,p.orientationY,p.orientationZ,p.positionX,p.positionY,p.positionZ].map(async(P,I)=>{const k=t(D,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:I===0?1:0});return await o(D,P,k.offset),k}));for(let P=0;P<6;P+=1)F[P].connect(L,0,P),F[P].start(0);return l(D)})()}const A=await h,S=n(_,{...f,gain:1});await c(p,_,S);const E=[];for(let D=0;D<A.numberOfChannels;D+=1)E.push(A.getChannelData(D));let T=[E[0][0],E[1][0],E[2][0]],C=[E[3][0],E[4][0],E[5][0]],x=n(_,{...f,gain:1}),b=s(_,{...y,orientationX:T[0],orientationY:T[1],orientationZ:T[2],positionX:C[0],positionY:C[1],positionZ:C[2]});S.connect(x).connect(b.inputs[0]),b.connect(g);for(let D=128;D<A.length;D+=128){const L=[E[0][D],E[1][D],E[2][D]],F=[E[3][D],E[4][D],E[5][D]];if(L.some((P,I)=>P!==T[I])||F.some((P,I)=>P!==C[I])){T=L,C=F;const P=D/_.sampleRate;x.gain.setValueAtTime(0,P),x=n(_,{...f,gain:0}),b=s(_,{...y,orientationX:T[0],orientationY:T[1],orientationZ:T[2],positionX:C[0],positionY:C[1],positionZ:C[2]}),x.gain.setValueAtTime(1,P),S.connect(x).connect(b.inputs[0]),b.connect(g)}}return g}return v?(await i(_,p.orientationX,m.orientationX),await i(_,p.orientationY,m.orientationY),await i(_,p.orientationZ,m.orientationZ),await i(_,p.positionX,m.positionX),await i(_,p.positionY,m.positionY),await i(_,p.positionZ,m.positionZ)):(await o(_,p.orientationX,m.orientationX),await o(_,p.orientationY,m.orientationY),await o(_,p.orientationZ,m.orientationZ),await o(_,p.positionX,m.positionX),await o(_,p.positionY,m.positionY),await o(_,p.positionZ,m.positionZ)),Rs(m)?await c(p,_,m.inputs[0]):await c(p,_,m),m};return{render(p,_){const g=u.get(_);return g!==void 0?Promise.resolve(g):d(p,_)}}},Um={disableNormalization:!1},Fm=(i,e,t,n)=>class Qu{constructor(r,a){const o=e(r),c=n({...Um,...a}),l=i(o,c);return t.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===Qu.prototype||t.has(r)}},km=(i,e)=>(t,n,s)=>(i(n).replay(s),e(n,t,s)),Bm=(i,e,t)=>async(n,s,r)=>{const a=i(n);await Promise.all(a.activeInputs.map((o,c)=>Array.from(o).map(async([l,u])=>{const d=await e(l).render(l,s),p=n.context.destination;!t(l)&&(n!==p||!t(n))&&d.connect(r,u,c)})).reduce((o,c)=>[...o,...c],[]))},Vm=(i,e,t)=>async(n,s,r)=>{const a=e(n);await Promise.all(Array.from(a.activeInputs).map(async([o,c])=>{const u=await i(o).render(o,s);t(o)||u.connect(r,c)}))},zm=(i,e,t,n)=>s=>i($s,()=>$s(s))?Promise.resolve(i(n,n)).then(r=>{if(!r){const a=t(s,512,0,1);s.oncomplete=()=>{a.onaudioprocess=null,a.disconnect()},a.onaudioprocess=()=>s.currentTime,a.connect(s.destination)}return s.startRendering()}):new Promise(r=>{const a=e(s,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});s.oncomplete=o=>{a.disconnect(),r(o.renderedBuffer)},a.connect(s.destination),s.startRendering()}),Gm=i=>(e,t)=>{i.set(e,t)},Hm=i=>(e,t)=>i.set(e,t),Wm=(i,e,t,n,s,r,a,o)=>(c,l)=>t(c).render(c,l).then(()=>Promise.all(Array.from(n(l)).map(u=>t(u).render(u,l)))).then(()=>s(l)).then(u=>(typeof u.copyFromChannel!="function"?(a(u),ec(u)):e(r,()=>r(u))||o(u),i.add(u),u)),qm={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},Xm=(i,e,t,n,s,r)=>class extends i{constructor(o,c){const l=s(o),u={...qm,...c},h=t(l,u),d=r(l),p=d?n():null;super(o,!1,h,p),this._pan=e(this,d,h.pan)}get pan(){return this._pan}},Ym=(i,e,t,n,s)=>()=>{const r=new WeakMap,a=async(o,c)=>{let l=t(o);const u=Ft(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=e(c,h)}return r.set(c,l),u?await i(c,o.pan,l.pan):await n(c,o.pan,l.pan),Rs(l)?await s(o,c,l.inputs[0]):await s(o,c,l),l};return{render(o,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):a(o,c)}}},jm=i=>()=>{if(i===null)return!1;try{new i({length:1,sampleRate:44100})}catch{return!1}return!0},Zm=(i,e)=>async()=>{if(i===null)return!0;if(e===null)return!1;const t=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),n=new e(1,128,44100),s=URL.createObjectURL(t);let r=!1,a=!1;try{await n.audioWorklet.addModule(s);const o=new i(n,"a",{numberOfOutputs:0}),c=n.createOscillator();o.port.onmessage=()=>r=!0,o.onprocessorerror=()=>a=!0,c.connect(o),c.start(0),await n.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(s)}return r&&!a},$m=(i,e)=>()=>{if(e===null)return Promise.resolve(!1);const t=new e(1,1,44100),n=i(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(s=>{t.oncomplete=()=>{n.disconnect(),s(t.currentTime!==0)},t.startRendering()})},Km=()=>new DOMException("","UnknownError"),Jm={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},Qm=(i,e,t,n,s,r,a)=>class extends i{constructor(c,l){const u=s(c),h={...Jm,...l},d=t(u,h),_=r(u)?n():null;super(c,!0,d,_),this._isCurveNullified=!1,this._nativeWaveShaperNode=d,a(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw e();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},e_=(i,e,t)=>()=>{const n=new WeakMap,s=async(r,a)=>{let o=e(r);if(!Ft(o,a)){const l={channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,curve:o.curve,oversample:o.oversample};o=i(a,l)}return n.set(a,o),Rs(o)?await t(r,a,o.inputs[0]):await t(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):s(r,a)}}},t_=()=>typeof window>"u"?null:window,n_=(i,e)=>t=>{t.copyFromChannel=(n,s,r=0)=>{const a=i(r),o=i(s);if(o>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(o),u=n.length;for(let h=a<0?-a:0;h+a<c&&h<u;h+=1)n[h]=l[h+a]},t.copyToChannel=(n,s,r=0)=>{const a=i(r),o=i(s);if(o>=t.numberOfChannels)throw e();const c=t.length,l=t.getChannelData(o),u=n.length;for(let h=a<0?-a:0;h+a<c&&h<u;h+=1)l[h+a]=n[h]}},i_=i=>e=>{e.copyFromChannel=(t=>(n,s,r=0)=>{const a=i(r),o=i(s);if(a<e.length)return t.call(e,n,o,a)})(e.copyFromChannel),e.copyToChannel=(t=>(n,s,r=0)=>{const a=i(r),o=i(s);if(a<e.length)return t.call(e,n,o,a)})(e.copyToChannel)},s_=i=>(e,t)=>{const n=t.createBuffer(1,1,44100);e.buffer===null&&(e.buffer=n),i(e,"buffer",s=>()=>{const r=s.call(e);return r===n?null:r},s=>r=>s.call(e,r===null?n:r))},r_=(i,e)=>(t,n)=>{n.channelCount=1,n.channelCountMode="explicit",Object.defineProperty(n,"channelCount",{get:()=>1,set:()=>{throw i()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:()=>{throw i()}});const s=t.createBufferSource();e(n,()=>{const o=n.numberOfInputs;for(let c=0;c<o;c+=1)s.connect(n,0,c)},()=>s.disconnect(n))},eh=(i,e,t)=>i.copyFromChannel===void 0?i.getChannelData(t)[0]:(i.copyFromChannel(e,t),e[0]),th=i=>{if(i===null)return!1;const e=i.length;return e%2!==0?i[Math.floor(e/2)]!==0:i[e/2-1]+i[e/2]!==0},xr=(i,e,t,n)=>{let s=i;for(;!s.hasOwnProperty(e);)s=Object.getPrototypeOf(s);const{get:r,set:a}=Object.getOwnPropertyDescriptor(s,e);Object.defineProperty(i,e,{get:t(r),set:n(a)})},o_=i=>({...i,outputChannelCount:i.outputChannelCount!==void 0?i.outputChannelCount:i.numberOfInputs===1&&i.numberOfOutputs===1?[i.channelCount]:Array.from({length:i.numberOfOutputs},()=>1)}),a_=i=>({...i,channelCount:i.numberOfOutputs}),c_=i=>{const{imag:e,real:t}=i;return e===void 0?t===void 0?{...i,imag:[0,0],real:[0,0]}:{...i,imag:Array.from(t,()=>0),real:t}:t===void 0?{...i,imag:e,real:Array.from(e,()=>0)}:{...i,imag:e,real:t}},nh=(i,e,t)=>{try{i.setValueAtTime(e,t)}catch(n){if(n.code!==9)throw n;nh(i,e,t+1e-7)}},l_=i=>{const e=i.createBufferSource();e.start();try{e.start()}catch{return!0}return!1},u_=i=>{const e=i.createBufferSource(),t=i.createBuffer(1,1,44100);e.buffer=t;try{e.start(0,1)}catch{return!1}return!0},h_=i=>{const e=i.createBufferSource();e.start();try{e.stop()}catch{return!1}return!0},rc=i=>{const e=i.createOscillator();try{e.start(-1)}catch(t){return t instanceof RangeError}return!1},ih=i=>{const e=i.createBuffer(1,1,44100),t=i.createBufferSource();t.buffer=e,t.start(),t.stop();try{return t.stop(),!0}catch{return!1}},oc=i=>{const e=i.createOscillator();try{e.stop(-1)}catch(t){return t instanceof RangeError}return!1},d_=i=>{const{port1:e,port2:t}=new MessageChannel;try{e.postMessage(i)}finally{e.close(),t.close()}},f_=i=>{i.start=(e=>(t=0,n=0,s)=>{const r=i.buffer,a=r===null?n:Math.min(r.duration,n);r!==null&&a>r.duration-.5/i.context.sampleRate?e.call(i,t,0,0):e.call(i,t,a,s)})(i.start)},sh=(i,e)=>{const t=e.createGain();i.connect(t);const n=(s=>()=>{s.call(i,t),i.removeEventListener("ended",n)})(i.disconnect);i.addEventListener("ended",n),Ps(i,t),i.stop=(s=>{let r=!1;return(a=0)=>{if(r)try{s.call(i,a)}catch{t.gain.setValueAtTime(0,a)}else s.call(i,a),r=!0}})(i.stop)},Ds=(i,e)=>t=>{const n={value:i};return Object.defineProperties(t,{currentTarget:n,target:n}),typeof e=="function"?e.call(i,t):e.handleEvent.call(i,t)},p_=Nd(Wi),m_=Bd(Wi),__=Jf(No),rh=new WeakMap,g_=_p(rh),Mn=Cf(new Map,new WeakMap),Cn=t_(),oh=Xp(Mn,Rn),ac=mp(Xt),Lt=Bm(Xt,ac,Fi),v_=Wd(oh,rt,Lt),nt=xp(Lo),jn=xm(Cn),Qe=Up(jn),ah=new WeakMap,ch=cp(Ds),Sr=$p(Cn),cc=Lp(Sr),lc=Np(Cn),lh=Ip(Cn),Ks=Jp(Cn),mt=_f(Id(Uu),kd(p_,m_,co,__,lo,Xt,g_,fr,rt,Wi,Hn,Fi,to),Mn,Ap(Da,lo,Xt,rt,Zs,Hn),Rn,Io,jt,jf(co,Da,Xt,rt,Zs,nt,Hn,Qe),tp(ah,Xt,yn),ch,nt,cc,lc,lh,Qe,Ks),x_=Hd(mt,v_,Rn,oh,nt,Qe),uc=new WeakSet,nl=Yp(Cn),uh=zf(new Uint32Array(1)),hc=n_(uh,Rn),dc=i_(uh),hh=Xd(uc,Mn,jt,nl,jn,jm(nl),hc,dc),Oo=Vd(Jt),dh=Vm(ac,mr,Fi),Pn=Of(dh),Ls=Zp(Oo,Mn,l_,u_,h_,rc,ih,oc,f_,s_(xr),sh),Dn=km(gp(mr),dh),S_=Zd(Pn,Ls,rt,Dn,Lt),Tn=gf(Od(Fu),ah,Qa,vf,Ad,Cd,Rd,Pd,Dd,Ca,Nu,Sr,nh),y_=jd(mt,S_,Tn,Rt,Ls,nt,Qe,Ds),M_=rf(mt,of,Rn,Rt,Kp(Jt,xr),nt,Qe,Lt),T_=Af(Pn,Ku,rt,Dn,Lt),qi=Hm(rh),E_=wf(mt,Tn,T_,Io,Ku,nt,Qe,qi),mi=Wp(Wi,lc),b_=r_(Rt,mi),_i=rm(Sr,b_),w_=Df(_i,rt,Lt),A_=Pf(mt,w_,_i,nt,Qe),C_=If(gr,rt,Lt),R_=Nf(mt,C_,gr,nt,Qe,a_),P_=cm(Oo,Ls,Jt,mi),Ns=am(Oo,Mn,P_,rc,oc),D_=Vf(Pn,Ns,rt,Dn,Lt),L_=Bf(mt,Tn,D_,Ns,nt,Qe,Ds),fh=lm(jt,xr),N_=Wf(fh,rt,Lt),I_=Hf(mt,N_,fh,nt,Qe,qi),O_=Kf(Pn,Ju,rt,Dn,Lt),U_=$f(mt,Tn,O_,Ju,nt,Qe,qi),ph=um(jt),F_=rp(Pn,ph,rt,Dn,Lt),k_=sp(mt,Tn,F_,ph,jt,nt,Qe,qi),B_=fp(Pn,Jt,rt,Dn,Lt),V_=dp(mt,Tn,B_,Jt,nt,Qe),z_=pm(Io,Rt,vr,jt),Uo=zm(Mn,Jt,vr,$m(Jt,jn)),G_=wp(Ls,rt,jn,Lt,Uo),H_=hm(z_),W_=Ep(mt,H_,G_,nt,Qe,qi),q_=af(Tn,_i,Ns,vr,jt,eh,Qe,xr),mh=new WeakMap,X_=Hp(M_,q_,ch,Qe,mh,Ds),_h=Sm(Oo,Mn,rc,ih,oc,sh),Y_=Lm(Pn,_h,rt,Dn,Lt),j_=Dm(mt,Tn,_h,Y_,nt,Qe,Ds),gh=Ff(Ls),Z_=Am(gh,Rt,Jt,th,mi),Fo=wm(gh,Rt,Z_,th,mi,Sr,xr),$_=Mm(co,Rt,_i,Jt,vr,Fo,jt,lo,eh,mi),vh=ym($_),K_=Om(Pn,_i,Ns,Jt,vh,rt,jn,Dn,Lt,Uo),J_=Im(mt,Tn,vh,K_,nt,Qe,qi),Q_=Tm(Rn),eg=Fm(Q_,nt,new WeakSet,c_),tg=bm(_i,gr,Jt,Fo,jt,mi),xh=Em(tg,jt),ng=Ym(Pn,xh,rt,Dn,Lt),ig=Xm(mt,Tn,xh,ng,nt,Qe),sg=e_(Fo,rt,Lt),rg=Qm(mt,Rt,Fo,sg,nt,Qe,qi),Sh=Fp(Cn),fc=lp(Cn),yh=new WeakMap,og=Sp(yh,jn),ag=Sh?Fd(Mn,jt,ap(Cn),fc,up(Ld),nt,og,Qe,Ks,new WeakMap,new WeakMap,Zm(Ks,jn),Cn):void 0,cg=Op(cc,Qe),lg=Yf(uc,Mn,Xf,op,new WeakSet,nt,cg,oo,$s,hc,dc),Mh=Ef(ag,x_,hh,y_,E_,A_,R_,L_,I_,lg,U_,k_,V_,W_,X_,j_,J_,eg,ig,rg),ug=kp(mt,mm,nt,Qe),hg=Vp(mt,_m,nt,Qe),dg=zp(mt,gm,nt,Qe),fg=vm(Rt,Qe),pg=Gp(mt,fg,nt),mg=sf(Mh,Rt,jt,Km,ug,hg,dg,pg,Sr),pc=yp(mh),_g=zd(pc),Th=Uf(Rn),gg=Qf(pc),Eh=np(Rn),bh=new WeakMap,vg=pp(bh,yn),xg=sm(Th,Rn,Rt,_i,gr,Ns,Jt,vr,jt,Eh,fc,vg,mi),Sg=em(Rt,xg,Jt,jt,mi),yg=Tf(Pn,Th,Ls,_i,gr,Ns,Jt,gg,Eh,fc,rt,Ks,jn,Dn,Lt,Uo),Mg=vp(yh),Tg=Gm(bh),il=Sh?Sf(_g,mt,Tn,yg,Sg,Xt,Mg,nt,Qe,Ks,o_,Tg,d_,Ds):void 0,Eg=qf(jt,jn),bg=Wm(uc,Mn,ac,pc,Uo,oo,hc,dc),wg=Rm(Mh,Mn,Rt,Eg,bg),Ag=Cp(Lo,cc),Cg=Rp(Ja,lc),Rg=Pp(Qa,lh),Pg=Dp(Lo,Qe);function un(i){return i===void 0}function We(i){return i!==void 0}function Dg(i){return typeof i=="function"}function ui(i){return typeof i=="number"}function Pi(i){return Object.prototype.toString.call(i)==="[object Object]"&&i.constructor===Object}function Lg(i){return typeof i=="boolean"}function sn(i){return Array.isArray(i)}function Wn(i){return typeof i=="string"}function Pr(i){return Wn(i)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(i)}function Pe(i,e){if(!i)throw new Error(e)}function hi(i,e,t=1/0){if(!(e<=i&&i<=t))throw new RangeError(`Value must be within [${e}, ${t}], got: ${i}`)}function wh(i){!i.isOffline&&i.state!=="running"&&ko('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let Ah=!1,sl=!1;function rl(i){Ah=i}function Ng(i){un(i)&&Ah&&!sl&&(sl=!0,ko("Events scheduled inside of scheduled callbacks should use the passed in scheduling time. See https://github.com/Tonejs/Tone.js/wiki/Accurate-Timing"))}let Ch=console;function Ig(...i){Ch.log(...i)}function ko(...i){Ch.warn(...i)}function Og(i){return new mg(i)}function Ug(i,e,t){return new wg(i,e,t)}const Di=typeof self=="object"?self:null,Fg=Di&&(Di.hasOwnProperty("AudioContext")||Di.hasOwnProperty("webkitAudioContext"));function kg(i,e,t){return Pe(We(il),"This node only works in a secure context (https or localhost)"),new il(i,e,t)}function En(i,e,t,n){var s=arguments.length,r=s<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(i,e,t,n);else for(var o=i.length-1;o>=0;o--)(a=i[o])&&(r=(s<3?a(r):s>3?a(e,t,r):a(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r}function gt(i,e,t,n){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(h){a(h)}}function c(u){try{l(n.throw(u))}catch(h){a(h)}}function l(u){u.done?r(u.value):s(u.value).then(o,c)}l((n=n.apply(i,e||[])).next())})}class Bg{constructor(e,t,n,s){this._callback=e,this._type=t,this._minimumUpdateInterval=Math.max(128/(s||44100),.001),this.updateInterval=n,this._createClock()}_createWorker(){const e=new Blob([`
			// the initial timeout time
			let timeoutTime =  ${(this._updateInterval*1e3).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`],{type:"text/javascript"}),t=URL.createObjectURL(e),n=new Worker(t);n.onmessage=this._callback.bind(this),this._worker=n}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&clearTimeout(this._timeout),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(e){var t;this._updateInterval=Math.max(e,this._minimumUpdateInterval),this._type==="worker"&&((t=this._worker)===null||t===void 0||t.postMessage(this._updateInterval*1e3))}get type(){return this._type}set type(e){this._disposeClock(),this._type=e,this._createClock()}dispose(){this._disposeClock()}}function ki(i){return Rg(i)}function oi(i){return Cg(i)}function no(i){return Pg(i)}function us(i){return Ag(i)}function Vg(i){return i instanceof hh}function zg(i,e){return i==="value"||ki(e)||oi(e)||Vg(e)}function Li(i,...e){if(!e.length)return i;const t=e.shift();if(Pi(i)&&Pi(t))for(const n in t)zg(n,t[n])?i[n]=t[n]:Pi(t[n])?(i[n]||Object.assign(i,{[n]:{}}),Li(i[n],t[n])):Object.assign(i,{[n]:t[n]});return Li(i,...e)}function Gg(i,e){return i.length===e.length&&i.every((t,n)=>e[n]===t)}function de(i,e,t=[],n){const s={},r=Array.from(e);if(Pi(r[0])&&n&&!Reflect.has(r[0],n)&&(Object.keys(r[0]).some(o=>Reflect.has(i,o))||(Li(s,{[n]:r[0]}),t.splice(t.indexOf(n),1),r.shift())),r.length===1&&Pi(r[0]))Li(s,r[0]);else for(let a=0;a<t.length;a++)We(r[a])&&(s[t[a]]=r[a]);return Li(i,s)}function Hg(i){return i.constructor.getDefaults()}function ms(i,e){return un(i)?e:i}function Ua(i,e){return e.forEach(t=>{Reflect.has(i,t)&&delete i[t]}),i}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2019 Yotam Mann
 */class Zn{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...e){(this.debug||Di&&this.toString()===Di.TONE_DEBUG_CLASS)&&Ig(this,...e)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}Zn.version=Lu;const mc=1e-6;function Ss(i,e){return i>e+mc}function Fa(i,e){return Ss(i,e)||_n(i,e)}function po(i,e){return i+mc<e}function _n(i,e){return Math.abs(i-e)<mc}function Wg(i,e,t){return Math.max(Math.min(i,t),e)}class hn extends Zn{constructor(){super(),this.name="Timeline",this._timeline=[];const e=de(hn.getDefaults(),arguments,["memory"]);this.memory=e.memory,this.increasing=e.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(e){if(Pe(Reflect.has(e,"time"),"Timeline: events must have a time attribute"),e.time=e.time.valueOf(),this.increasing&&this.length){const t=this._timeline[this.length-1];Pe(Fa(e.time,t.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(e)}else{const t=this._search(e.time);this._timeline.splice(t+1,0,e)}if(this.length>this.memory){const t=this.length-this.memory;this._timeline.splice(0,t)}return this}remove(e){const t=this._timeline.indexOf(e);return t!==-1&&this._timeline.splice(t,1),this}get(e,t="time"){const n=this._search(e,t);return n!==-1?this._timeline[n]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(e,t="time"){const n=this._search(e,t);return n+1<this._timeline.length?this._timeline[n+1]:null}getBefore(e){const t=this._timeline.length;if(t>0&&this._timeline[t-1].time<e)return this._timeline[t-1];const n=this._search(e);return n-1>=0?this._timeline[n-1]:null}cancel(e){if(this._timeline.length>1){let t=this._search(e);if(t>=0)if(_n(this._timeline[t].time,e)){for(let n=t;n>=0&&_n(this._timeline[n].time,e);n--)t=n;this._timeline=this._timeline.slice(0,t)}else this._timeline=this._timeline.slice(0,t+1);else this._timeline=[]}else this._timeline.length===1&&Fa(this._timeline[0].time,e)&&(this._timeline=[]);return this}cancelBefore(e){const t=this._search(e);return t>=0&&(this._timeline=this._timeline.slice(t+1)),this}previousEvent(e){const t=this._timeline.indexOf(e);return t>0?this._timeline[t-1]:null}_search(e,t="time"){if(this._timeline.length===0)return-1;let n=0;const s=this._timeline.length;let r=s;if(s>0&&this._timeline[s-1][t]<=e)return s-1;for(;n<r;){let a=Math.floor(n+(r-n)/2);const o=this._timeline[a],c=this._timeline[a+1];if(_n(o[t],e)){for(let l=a;l<this._timeline.length;l++){const u=this._timeline[l];if(_n(u[t],e))a=l;else break}return a}else{if(po(o[t],e)&&Ss(c[t],e))return a;Ss(o[t],e)?r=a:n=a+1}}return-1}_iterate(e,t=0,n=this._timeline.length-1){this._timeline.slice(t,n+1).forEach(e)}forEach(e){return this._iterate(e),this}forEachBefore(e,t){const n=this._search(e);return n!==-1&&this._iterate(t,0,n),this}forEachAfter(e,t){const n=this._search(e);return this._iterate(t,n+1),this}forEachBetween(e,t,n){let s=this._search(e),r=this._search(t);return s!==-1&&r!==-1?(this._timeline[s].time!==e&&(s+=1),this._timeline[r].time===t&&(r-=1),this._iterate(n,s,r)):s===-1&&this._iterate(n,0,r),this}forEachFrom(e,t){let n=this._search(e);for(;n>=0&&this._timeline[n].time>=e;)n--;return this._iterate(t,n+1),this}forEachAtTime(e,t){const n=this._search(e);if(n!==-1&&_n(this._timeline[n].time,e)){let s=n;for(let r=n;r>=0&&_n(this._timeline[r].time,e);r--)s=r;this._iterate(r=>{t(r)},s,n)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const Rh=[];function Bo(i){Rh.push(i)}function qg(i){Rh.forEach(e=>e(i))}const Ph=[];function Vo(i){Ph.push(i)}function Xg(i){Ph.forEach(e=>e(i))}class yr extends Zn{constructor(){super(...arguments),this.name="Emitter"}on(e,t){return e.split(/\W+/).forEach(s=>{un(this._events)&&(this._events={}),this._events.hasOwnProperty(s)||(this._events[s]=[]),this._events[s].push(t)}),this}once(e,t){const n=(...s)=>{t(...s),this.off(e,n)};return this.on(e,n),this}off(e,t){return e.split(/\W+/).forEach(s=>{if(un(this._events)&&(this._events={}),this._events.hasOwnProperty(s))if(un(t))this._events[s]=[];else{const r=this._events[s];for(let a=r.length-1;a>=0;a--)r[a]===t&&r.splice(a,1)}}),this}emit(e,...t){if(this._events&&this._events.hasOwnProperty(e)){const n=this._events[e].slice(0);for(let s=0,r=n.length;s<r;s++)n[s].apply(this,t)}return this}static mixin(e){["on","once","off","emit"].forEach(t=>{const n=Object.getOwnPropertyDescriptor(yr.prototype,t);Object.defineProperty(e.prototype,t,n)})}dispose(){return super.dispose(),this._events=void 0,this}}class Dh extends yr{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class Mr extends Dh{constructor(){var e,t;super(),this.name="Context",this._constants=new Map,this._timeouts=new hn,this._timeoutIds=0,this._initialized=!1,this._closeStarted=!1,this.isOffline=!1,this._workletPromise=null;const n=de(Mr.getDefaults(),arguments,["context"]);n.context?(this._context=n.context,this._latencyHint=((e=arguments[0])===null||e===void 0?void 0:e.latencyHint)||""):(this._context=Og({latencyHint:n.latencyHint}),this._latencyHint=n.latencyHint),this._ticker=new Bg(this.emit.bind(this,"tick"),n.clockSource,n.updateInterval,this._context.sampleRate),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this[!((t=arguments[0])===null||t===void 0)&&t.hasOwnProperty("updateInterval")?"_lookAhead":"lookAhead"]=n.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(qg(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(e,t,n){return this._context.createBuffer(e,t,n)}createChannelMerger(e){return this._context.createChannelMerger(e)}createChannelSplitter(e){return this._context.createChannelSplitter(e)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(e){return this._context.createDelay(e)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(e,t){return this._context.createIIRFilter(e,t)}createPanner(){return this._context.createPanner()}createPeriodicWave(e,t,n){return this._context.createPeriodicWave(e,t,n)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(e){return Pe(us(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(e)}createMediaElementSource(e){return Pe(us(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(e)}createMediaStreamDestination(){return Pe(us(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(e){return this._context.decodeAudioData(e)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(e){Pe(!this._initialized,"The listener cannot be set after initialization."),this._listener=e}get transport(){return this.initialize(),this._transport}set transport(e){Pe(!this._initialized,"The transport cannot be set after initialization."),this._transport=e}get draw(){return this.initialize(),this._draw}set draw(e){Pe(!this._initialized,"Draw cannot be set after initialization."),this._draw=e}get destination(){return this.initialize(),this._destination}set destination(e){Pe(!this._initialized,"The destination cannot be set after initialization."),this._destination=e}createAudioWorkletNode(e,t){return kg(this.rawContext,e,t)}addAudioWorkletModule(e){return gt(this,void 0,void 0,function*(){Pe(We(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletPromise||(this._workletPromise=this.rawContext.audioWorklet.addModule(e)),yield this._workletPromise})}workletsAreReady(){return gt(this,void 0,void 0,function*(){(yield this._workletPromise)?this._workletPromise:Promise.resolve()})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(e){this._ticker.updateInterval=e}get clockSource(){return this._ticker.type}set clockSource(e){this._ticker.type=e}get lookAhead(){return this._lookAhead}set lookAhead(e){this._lookAhead=e,this.updateInterval=e?e/2:.01}get latencyHint(){return this._latencyHint}get rawContext(){return this._context}now(){return this._context.currentTime+this._lookAhead}immediate(){return this._context.currentTime}resume(){return us(this._context)?this._context.resume():Promise.resolve()}close(){return gt(this,void 0,void 0,function*(){us(this._context)&&this.state!=="closed"&&!this._closeStarted&&(this._closeStarted=!0,yield this._context.close()),this._initialized&&Xg(this)})}getConstant(e){if(this._constants.has(e))return this._constants.get(e);{const t=this._context.createBuffer(1,128,this._context.sampleRate),n=t.getChannelData(0);for(let r=0;r<n.length;r++)n[r]=e;const s=this._context.createBufferSource();return s.channelCount=1,s.channelCountMode="explicit",s.buffer=t,s.loop=!0,s.start(0),this._constants.set(e,s),s}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(e=>this._constants[e].disconnect()),this.close(),this}_timeoutLoop(){const e=this.now();let t=this._timeouts.peek();for(;this._timeouts.length&&t&&t.time<=e;)t.callback(),this._timeouts.shift(),t=this._timeouts.peek()}setTimeout(e,t){this._timeoutIds++;const n=this.now();return this._timeouts.add({callback:e,id:this._timeoutIds,time:n+t}),this._timeoutIds}clearTimeout(e){return this._timeouts.forEach(t=>{t.id===e&&this._timeouts.remove(t)}),this}clearInterval(e){return this.clearTimeout(e)}setInterval(e,t){const n=++this._timeoutIds,s=()=>{const r=this.now();this._timeouts.add({callback:()=>{e(),s()},id:n,time:r+t})};return s(),n}}class Yg extends Dh{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(e,t,n){return{}}createChannelMerger(e){return{}}createChannelSplitter(e){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(e){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(e,t){return{}}createPanner(){return{}}createPeriodicWave(e,t,n){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(e){return{}}createMediaElementSource(e){return{}}createMediaStreamDestination(){return{}}decodeAudioData(e){return Promise.resolve({})}createAudioWorkletNode(e,t){return{}}get rawContext(){return{}}addAudioWorkletModule(e){return gt(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(e,t){return 0}clearTimeout(e){return this}setInterval(e,t){return 0}clearInterval(e){return this}getConstant(e){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(e){}get destination(){return{}}set destination(e){}now(){return 0}immediate(){return 0}}function ht(i,e){sn(e)?e.forEach(t=>ht(i,t)):Object.defineProperty(i,e,{enumerable:!0,writable:!1})}function Lh(i,e){sn(e)?e.forEach(t=>Lh(i,t)):Object.defineProperty(i,e,{writable:!0})}const Je=()=>{};class st extends Zn{constructor(){super(),this.name="ToneAudioBuffer",this.onload=Je;const e=de(st.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=e.reverse,this.onload=e.onload,Wn(e.url)?this.load(e.url).catch(e.onerror):e.url&&this.set(e.url)}static getDefaults(){return{onerror:Je,onload:Je,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:ln().sampleRate}set(e){return e instanceof st?e.loaded?this._buffer=e.get():e.onload=()=>{this.set(e),this.onload(this)}:this._buffer=e,this._reversed&&this._reverse(),this}get(){return this._buffer}load(e){return gt(this,void 0,void 0,function*(){const t=st.load(e).then(n=>{this.set(n),this.onload(this)});st.downloads.push(t);try{yield t}finally{const n=st.downloads.indexOf(t);st.downloads.splice(n,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(e){const t=sn(e)&&e[0].length>0,n=t?e.length:1,s=t?e[0].length:e.length,r=ln(),a=r.createBuffer(n,s,r.sampleRate),o=!t&&n===1?[e]:e;for(let c=0;c<n;c++)a.copyToChannel(o[c],c);return this._buffer=a,this}toMono(e){if(ui(e))this.fromArray(this.toArray(e));else{let t=new Float32Array(this.length);const n=this.numberOfChannels;for(let s=0;s<n;s++){const r=this.toArray(s);for(let a=0;a<r.length;a++)t[a]+=r[a]}t=t.map(s=>s/n),this.fromArray(t)}return this}toArray(e){if(ui(e))return this.getChannelData(e);if(this.numberOfChannels===1)return this.toArray(0);{const t=[];for(let n=0;n<this.numberOfChannels;n++)t[n]=this.getChannelData(n);return t}}getChannelData(e){return this._buffer?this._buffer.getChannelData(e):new Float32Array(0)}slice(e,t=this.duration){Pe(this.loaded,"Buffer is not loaded");const n=Math.floor(e*this.sampleRate),s=Math.floor(t*this.sampleRate);Pe(n<s,"The start time must be less than the end time");const r=s-n,a=ln().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let o=0;o<this.numberOfChannels;o++)a.copyToChannel(this.getChannelData(o).subarray(n,s),o);return new st(a)}_reverse(){if(this.loaded)for(let e=0;e<this.numberOfChannels;e++)this.getChannelData(e).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(e){this._reversed!==e&&(this._reversed=e,this._reverse())}static fromArray(e){return new st().fromArray(e)}static fromUrl(e){return gt(this,void 0,void 0,function*(){return yield new st().load(e)})}static load(e){return gt(this,void 0,void 0,function*(){const t=e.match(/\[([^\]\[]+\|.+)\]$/);if(t){const c=t[1].split("|");let l=c[0];for(const u of c)if(st.supportsType(u)){l=u;break}e=e.replace(t[0],l)}const n=st.baseUrl===""||st.baseUrl.endsWith("/")?st.baseUrl:st.baseUrl+"/",s=document.createElement("a");s.href=n+e,s.pathname=(s.pathname+s.hash).split("/").map(encodeURIComponent).join("/");const r=yield fetch(s.href);if(!r.ok)throw new Error(`could not load url: ${e}`);const a=yield r.arrayBuffer();return yield ln().decodeAudioData(a)})}static supportsType(e){const t=e.split("."),n=t[t.length-1];return document.createElement("audio").canPlayType("audio/"+n)!==""}static loaded(){return gt(this,void 0,void 0,function*(){for(yield Promise.resolve();st.downloads.length;)yield st.downloads[0]})}}st.baseUrl="";st.downloads=[];class _c extends Mr{constructor(){super({clockSource:"offline",context:no(arguments[0])?arguments[0]:Ug(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:no(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=no(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(e){return gt(this,void 0,void 0,function*(){let t=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,t++;const n=Math.floor(this.sampleRate/128);e&&t%n===0&&(yield new Promise(s=>setTimeout(s,1)))}})}render(e=!0){return gt(this,void 0,void 0,function*(){yield this.workletsAreReady(),yield this._renderClock(e);const t=yield this._context.startRendering();return new st(t)})}close(){return Promise.resolve()}}const Nh=new Yg;let Ci=Nh;function ln(){return Ci===Nh&&Fg&&jg(new Mr),Ci}function jg(i,e=!1){e&&Ci.dispose(),us(i)?Ci=new Mr(i):no(i)?Ci=new _c(i):Ci=i}function ka(){return Ci.resume()}if(Di&&!Di.TONE_SILENCE_LOGGING){const e=` * Tone.js v${Lu} * `;console.log(`%c${e}`,"background: #000; color: #fff")}function Zg(i){return Math.pow(10,i/20)}function $g(i){return 20*(Math.log(i)/Math.LN10)}function Ih(i){return Math.pow(2,i/12)}let zo=440;function Kg(){return zo}function Jg(i){zo=i}function Ri(i){return Math.round(Oh(i))}function Oh(i){return 69+12*Math.log2(i/zo)}function Uh(i){return zo*Math.pow(2,(i-69)/12)}class gc extends Zn{constructor(e,t,n){super(),this.defaultUnits="s",this._val=t,this._units=n,this.context=e,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:e=>this._frequencyToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:e=>this._ticksToUnits(parseInt(e,10)),regexp:/^(\d+)i$/i},m:{method:e=>this._beatsToUnits(parseInt(e,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(e,t)=>{const n=parseInt(e,10),s=t==="."?1.5:1;return n===1?this._beatsToUnits(this._getTimeSignature())*s:this._beatsToUnits(4/n)*s},regexp:/^(\d+)n(\.?)$/i},number:{method:e=>this._expressions[this.defaultUnits].method.call(this,e),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:e=>this._secondsToUnits(parseFloat(e)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:e=>parseInt(e,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:e=>{const t=parseInt(e,10);return this._beatsToUnits(8/(Math.floor(t)*3))},regexp:/^(\d+)t$/i},tr:{method:(e,t,n)=>{let s=0;return e&&e!=="0"&&(s+=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(s+=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(s+=this._beatsToUnits(parseFloat(n)/4)),s},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof gc&&this.fromType(this._val),un(this._val))return this._noArg();if(Wn(this._val)&&un(this._units)){for(const e in this._expressions)if(this._expressions[e].regexp.test(this._val.trim())){this._units=e;break}}else if(Pi(this._val)){let e=0;for(const t in this._val)if(We(this._val[t])){const n=this._val[t],s=new this.constructor(this.context,t).valueOf()*n;e+=s}return e}if(We(this._units)){const e=this._expressions[this._units],t=this._val.toString().trim().match(e.regexp);return t?e.method.apply(this,t.slice(1)):e.method.call(this,this._val)}else return Wn(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(e){return 1/e}_beatsToUnits(e){return 60/this._getBpm()*e}_secondsToUnits(e){return e}_ticksToUnits(e){return e*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(e){switch(this._units=void 0,this.defaultUnits){case"s":this._val=e.toSeconds();break;case"i":this._val=e.toTicks();break;case"hz":this._val=e.toFrequency();break;case"midi":this._val=e.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class Sn extends gc{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:e=>this._now()+new this.constructor(this.context,e).valueOf(),regexp:/^\+(.+)/},quantize:{method:e=>{const t=new Sn(this.context,e).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(t))},regexp:/^@(.+)/}})}quantize(e,t=1){const n=new this.constructor(this.context,e).valueOf(),s=this.valueOf(),o=Math.round(s/n)*n-s;return s+o*t}toNotation(){const e=this.toSeconds(),t=["1m"];for(let r=1;r<9;r++){const a=Math.pow(2,r);t.push(a+"n."),t.push(a+"n"),t.push(a+"t")}t.push("0");let n=t[0],s=new Sn(this.context,t[0]).toSeconds();return t.forEach(r=>{const a=new Sn(this.context,r).toSeconds();Math.abs(a-e)<Math.abs(s-e)&&(n=r,s=a)}),n}toBarsBeatsSixteenths(){const e=this._beatsToUnits(1);let t=this.valueOf()/e;t=parseFloat(t.toFixed(4));const n=Math.floor(t/this._getTimeSignature());let s=t%1*4;t=Math.floor(t)%this._getTimeSignature();const r=s.toString();return r.length>3&&(s=parseFloat(parseFloat(r).toFixed(3))),[n,t,s].join(":")}toTicks(){const e=this._beatsToUnits(1);return this.valueOf()/e*this._getPPQ()}toSeconds(){return this.valueOf()}toMidi(){return Ri(this.toFrequency())}_now(){return this.context.now()}}class nn extends Sn{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return Kg()}static set A4(e){Jg(e)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(e){return this.defaultUnits==="midi"?e:nn.mtof(e)}},note:{regexp:/^([a-g]{1}(?:b|#|##|x|bb|###|#x|x#|bbb)?)(-?[0-9]+)/i,method(e,t){const s=Qg[e.toLowerCase()]+(parseInt(t,10)+1)*12;return this.defaultUnits==="midi"?s:nn.mtof(s)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(e,t,n){let s=1;return e&&e!=="0"&&(s*=this._beatsToUnits(this._getTimeSignature()*parseFloat(e))),t&&t!=="0"&&(s*=this._beatsToUnits(parseFloat(t))),n&&n!=="0"&&(s*=this._beatsToUnits(parseFloat(n)/4)),s}}})}transpose(e){return new nn(this.context,this.valueOf()*Ih(e))}harmonize(e){return e.map(t=>this.transpose(t))}toMidi(){return Ri(this.valueOf())}toNote(){const e=this.toFrequency(),t=Math.log2(e/nn.A4);let n=Math.round(12*t)+57;const s=Math.floor(n/12);return s<0&&(n+=-12*s),ev[n%12]+s.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const e=this._beatsToUnits(1),t=this.valueOf()/e;return Math.floor(t*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(e){return e}_ticksToUnits(e){return 1/(e*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(e){return 1/super._beatsToUnits(e)}_secondsToUnits(e){return 1/e}static mtof(e){return Uh(e)}static ftom(e){return Ri(e)}}const Qg={cbbb:-3,cbb:-2,cb:-1,c:0,"c#":1,cx:2,"c##":2,"c###":3,"cx#":3,"c#x":3,dbbb:-1,dbb:0,db:1,d:2,"d#":3,dx:4,"d##":4,"d###":5,"dx#":5,"d#x":5,ebbb:1,ebb:2,eb:3,e:4,"e#":5,ex:6,"e##":6,"e###":7,"ex#":7,"e#x":7,fbbb:2,fbb:3,fb:4,f:5,"f#":6,fx:7,"f##":7,"f###":8,"fx#":8,"f#x":8,gbbb:4,gbb:5,gb:6,g:7,"g#":8,gx:9,"g##":9,"g###":10,"gx#":10,"g#x":10,abbb:6,abb:7,ab:8,a:9,"a#":10,ax:11,"a##":11,"a###":12,"ax#":12,"a#x":12,bbbb:8,bbb:9,bb:10,b:11,"b#":12,bx:13,"b##":13,"b###":14,"bx#":14,"b#x":14},ev=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class qs extends Sn{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class $t extends Zn{constructor(){super();const e=de($t.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=e.context}static getDefaults(){return{context:ln()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(e){return Ng(e),new Sn(this.context,e).toSeconds()}toFrequency(e){return new nn(this.context,e).toFrequency()}toTicks(e){return new qs(this.context,e).toTicks()}_getPartialProperties(e){const t=this.get();return Object.keys(t).forEach(n=>{un(e[n])&&delete t[n]}),t}get(){const e=Hg(this);return Object.keys(e).forEach(t=>{if(Reflect.has(this,t)){const n=this[t];We(n)&&We(n.value)&&We(n.setValueAtTime)?e[t]=n.value:n instanceof $t?e[t]=n._getPartialProperties(e[t]):sn(n)||ui(n)||Wn(n)||Lg(n)?e[t]=n:delete e[t]}}),e}set(e){return Object.keys(e).forEach(t=>{Reflect.has(this,t)&&We(this[t])&&(this[t]&&We(this[t].value)&&We(this[t].setValueAtTime)?this[t].value!==e[t]&&(this[t].value=e[t]):this[t]instanceof $t?this[t].set(e[t]):this[t]=e[t])}),this}}class vc extends hn{constructor(e="stopped"){super(),this.name="StateTimeline",this._initial=e,this.setStateAtTime(this._initial,0)}getValueAtTime(e){const t=this.get(e);return t!==null?t.state:this._initial}setStateAtTime(e,t,n){return hi(t,0),this.add(Object.assign({},n,{state:e,time:t})),this}getLastState(e,t){const n=this._search(t);for(let s=n;s>=0;s--){const r=this._timeline[s];if(r.state===e)return r}}getNextState(e,t){const n=this._search(t);if(n!==-1)for(let s=n;s<this._timeline.length;s++){const r=this._timeline[s];if(r.state===e)return r}}}class ot extends $t{constructor(){super(de(ot.getDefaults(),arguments,["param","units","convert"])),this.name="Param",this.overridden=!1,this._minOutput=1e-7;const e=de(ot.getDefaults(),arguments,["param","units","convert"]);for(Pe(We(e.param)&&(ki(e.param)||e.param instanceof ot),"param must be an AudioParam");!ki(e.param);)e.param=e.param._param;this._swappable=We(e.swappable)?e.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=e.param,this.input.connect(this._param)):this._param=this.input=e.param,this._events=new hn(1e3),this._initialValue=this._param.defaultValue,this.units=e.units,this.convert=e.convert,this._minValue=e.minValue,this._maxValue=e.maxValue,We(e.value)&&e.value!==this._toType(this._initialValue)&&this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign($t.getDefaults(),{convert:!0,units:"number"})}get value(){const e=this.now();return this.getValueAtTime(e)}set value(e){this.cancelScheduledValues(this.now()),this.setValueAtTime(e,this.now())}get minValue(){return We(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return We(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(e,t){return this.units===t}_assertRange(e){return We(this.maxValue)&&We(this.minValue)&&hi(e,this._fromType(this.minValue),this._fromType(this.maxValue)),e}_fromType(e){return this.convert&&!this.overridden?this._is(e,"time")?this.toSeconds(e):this._is(e,"decibels")?Zg(e):this._is(e,"frequency")?this.toFrequency(e):e:this.overridden?0:e}_toType(e){return this.convert&&this.units==="decibels"?$g(e):e}setValueAtTime(e,t){const n=this.toSeconds(t),s=this._fromType(e);return Pe(isFinite(s)&&isFinite(n),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(s),this.log(this.units,"setValueAtTime",e,n),this._events.add({time:n,type:"setValueAtTime",value:s}),this._param.setValueAtTime(s,n),this}getValueAtTime(e){const t=Math.max(this.toSeconds(e),0),n=this._events.getAfter(t),s=this._events.get(t);let r=this._initialValue;if(s===null)r=this._initialValue;else if(s.type==="setTargetAtTime"&&(n===null||n.type==="setValueAtTime")){const a=this._events.getBefore(s.time);let o;a===null?o=this._initialValue:o=a.value,s.type==="setTargetAtTime"&&(r=this._exponentialApproach(s.time,o,s.value,s.constant,t))}else if(n===null)r=s.value;else if(n.type==="linearRampToValueAtTime"||n.type==="exponentialRampToValueAtTime"){let a=s.value;if(s.type==="setTargetAtTime"){const o=this._events.getBefore(s.time);o===null?a=this._initialValue:a=o.value}n.type==="linearRampToValueAtTime"?r=this._linearInterpolate(s.time,a,n.time,n.value,t):r=this._exponentialInterpolate(s.time,a,n.time,n.value,t)}else r=s.value;return this._toType(r)}setRampPoint(e){e=this.toSeconds(e);let t=this.getValueAtTime(e);return this.cancelAndHoldAtTime(e),this._fromType(t)===0&&(t=this._toType(this._minOutput)),this.setValueAtTime(t,e),this}linearRampToValueAtTime(e,t){const n=this._fromType(e),s=this.toSeconds(t);return Pe(isFinite(n)&&isFinite(s),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._assertRange(n),this._events.add({time:s,type:"linearRampToValueAtTime",value:n}),this.log(this.units,"linearRampToValueAtTime",e,s),this._param.linearRampToValueAtTime(n,s),this}exponentialRampToValueAtTime(e,t){let n=this._fromType(e);n=_n(n,0)?this._minOutput:n,this._assertRange(n);const s=this.toSeconds(t);return Pe(isFinite(n)&&isFinite(s),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({time:s,type:"exponentialRampToValueAtTime",value:n}),this.log(this.units,"exponentialRampToValueAtTime",e,s),this._param.exponentialRampToValueAtTime(n,s),this}exponentialRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialRampToValueAtTime(e,n+this.toSeconds(t)),this}linearRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.linearRampToValueAtTime(e,n+this.toSeconds(t)),this}targetRampTo(e,t,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialApproachValueAtTime(e,n,t),this}exponentialApproachValueAtTime(e,t,n){t=this.toSeconds(t),n=this.toSeconds(n);const s=Math.log(n+1)/Math.log(200);return this.setTargetAtTime(e,t,s),this.cancelAndHoldAtTime(t+n*.9),this.linearRampToValueAtTime(e,t+n),this}setTargetAtTime(e,t,n){const s=this._fromType(e);Pe(isFinite(n)&&n>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(t);return this._assertRange(s),Pe(isFinite(s)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(e)}, ${JSON.stringify(t)}`),this._events.add({constant:n,time:r,type:"setTargetAtTime",value:s}),this.log(this.units,"setTargetAtTime",e,r,n),this._param.setTargetAtTime(s,r,n),this}setValueCurveAtTime(e,t,n,s=1){n=this.toSeconds(n),t=this.toSeconds(t);const r=this._fromType(e[0])*s;this.setValueAtTime(this._toType(r),t);const a=n/(e.length-1);for(let o=1;o<e.length;o++){const c=this._fromType(e[o])*s;this.linearRampToValueAtTime(this._toType(c),t+o*a)}return this}cancelScheduledValues(e){const t=this.toSeconds(e);return Pe(isFinite(t),`Invalid argument to cancelScheduledValues: ${JSON.stringify(e)}`),this._events.cancel(t),this._param.cancelScheduledValues(t),this.log(this.units,"cancelScheduledValues",t),this}cancelAndHoldAtTime(e){const t=this.toSeconds(e),n=this._fromType(this.getValueAtTime(t));Pe(isFinite(t),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(e)}`),this.log(this.units,"cancelAndHoldAtTime",t,"value="+n);const s=this._events.get(t),r=this._events.getAfter(t);return s&&_n(s.time,t)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(t),this._events.cancel(t+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(n),t):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(n),t)),this._events.add({time:t,type:"setValueAtTime",value:n}),this._param.setValueAtTime(n,t),this}rampTo(e,t=.1,n){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(e,t,n):this.linearRampTo(e,t,n),this}apply(e){const t=this.context.currentTime;e.setValueAtTime(this.getValueAtTime(t),t);const n=this._events.get(t);if(n&&n.type==="setTargetAtTime"){const s=this._events.getAfter(n.time),r=s?s.time:t+2,a=(r-t)/10;for(let o=t;o<r;o+=a)e.linearRampToValueAtTime(this.getValueAtTime(o),o)}return this._events.forEachAfter(this.context.currentTime,s=>{s.type==="cancelScheduledValues"?e.cancelScheduledValues(s.time):s.type==="setTargetAtTime"?e.setTargetAtTime(s.value,s.time,s.constant):e[s.type](s.value,s.time)}),this}setParam(e){Pe(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const t=this.input;return t.disconnect(this._param),this.apply(e),this._param=e,t.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(e,t,n,s,r){return n+(t-n)*Math.exp(-(r-e)/s)}_linearInterpolate(e,t,n,s,r){return t+(s-t)*((r-e)/(n-e))}_exponentialInterpolate(e,t,n,s,r){return t*Math.pow(s/t,(r-e)/(n-e))}}class Ge extends $t{constructor(){super(...arguments),this._internalChannels=[]}get numberOfInputs(){return We(this.input)?ki(this.input)||this.input instanceof ot?1:this.input.numberOfInputs:0}get numberOfOutputs(){return We(this.output)?this.output.numberOfOutputs:0}_isAudioNode(e){return We(e)&&(e instanceof Ge||oi(e))}_getInternalNodes(){const e=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&e.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&e.push(this.output),e}_setChannelProperties(e){this._getInternalNodes().forEach(n=>{n.channelCount=e.channelCount,n.channelCountMode=e.channelCountMode,n.channelInterpretation=e.channelInterpretation})}_getChannelProperties(){const e=this._getInternalNodes();Pe(e.length>0,"ToneAudioNode does not have any internal nodes");const t=e[0];return{channelCount:t.channelCount,channelCountMode:t.channelCountMode,channelInterpretation:t.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCount:e}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelCountMode:e}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(e){const t=this._getChannelProperties();this._setChannelProperties(Object.assign(t,{channelInterpretation:e}))}connect(e,t=0,n=0){return Is(this,e,t,n),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return ko("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(e,t=0,n=0){return tv(this,e,t,n),this}chain(...e){return Ba(this,...e),this}fan(...e){return e.forEach(t=>this.connect(t)),this}dispose(){return super.dispose(),We(this.input)&&(this.input instanceof Ge?this.input.dispose():oi(this.input)&&this.input.disconnect()),We(this.output)&&(this.output instanceof Ge?this.output.dispose():oi(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function Ba(...i){const e=i.shift();i.reduce((t,n)=>(t instanceof Ge?t.connect(n):oi(t)&&Is(t,n),n),e)}function Is(i,e,t=0,n=0){for(Pe(We(i),"Cannot connect from undefined node"),Pe(We(e),"Cannot connect to undefined node"),(e instanceof Ge||oi(e))&&Pe(e.numberOfInputs>0,"Cannot connect to node with no inputs"),Pe(i.numberOfOutputs>0,"Cannot connect from node with no outputs");e instanceof Ge||e instanceof ot;)We(e.input)&&(e=e.input);for(;i instanceof Ge;)We(i.output)&&(i=i.output);ki(e)?i.connect(e,t):i.connect(e,t,n)}function tv(i,e,t=0,n=0){if(We(e))for(;e instanceof Ge;)e=e.input;for(;!oi(i);)We(i.output)&&(i=i.output);ki(e)?i.disconnect(e,t):oi(e)?i.disconnect(e,t,n):i.disconnect()}class Dt extends Ge{constructor(){super(de(Dt.getDefaults(),arguments,["gain","units"])),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode;const e=de(Dt.getDefaults(),arguments,["gain","units"]);this.gain=new ot({context:this.context,convert:e.convert,param:this._gainNode.gain,units:e.units,value:e.gain,minValue:e.minValue,maxValue:e.maxValue}),ht(this,"gain")}static getDefaults(){return Object.assign(Ge.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class ys extends Ge{constructor(e){super(e),this.onended=Je,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new Dt({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(t){const n=this.toSeconds(t);return this._startTime!==-1&&n>=this._startTime&&(this._stopTime===-1||n<=this._stopTime)?"started":"stopped"},this._fadeIn=e.fadeIn,this._fadeOut=e.fadeOut,this._curve=e.curve,this.onended=e.onended}static getDefaults(){return Object.assign(Ge.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:Je})}_startGain(e,t=1){Pe(this._startTime===-1,"Source cannot be started more than once");const n=this.toSeconds(this._fadeIn);return this._startTime=e+n,this._startTime=Math.max(this._startTime,this.context.currentTime),n>0?(this._gainNode.gain.setValueAtTime(0,e),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(t,e+n):this._gainNode.gain.exponentialApproachValueAtTime(t,e,n)):this._gainNode.gain.setValueAtTime(t,e),this}stop(e){return this.log("stop",e),this._stopGain(this.toSeconds(e)),this}_stopGain(e){Pe(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const t=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(e)+t,this._stopTime=Math.max(this._stopTime,this.now()),t>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,t,e):this._gainNode.gain.targetRampTo(0,t,e):(this._gainNode.gain.cancelAndHoldAtTime(e),this._gainNode.gain.setValueAtTime(0,e)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const n=this._curve==="exponential"?t*2:0;this._stopSource(this.now()+n),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==Je&&(this.onended(this),this.onended=Je,!this.context.isOffline)){const e=()=>this.dispose();typeof window.requestIdleCallback<"u"?window.requestIdleCallback(e):setTimeout(e,1e3)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),Pe(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.dispose(),this.onended=Je,this}}class mo extends ys{constructor(){super(de(mo.getDefaults(),arguments,["offset"])),this.name="ToneConstantSource",this._source=this.context.createConstantSource();const e=de(mo.getDefaults(),arguments,["offset"]);Is(this._source,this._gainNode),this.offset=new ot({context:this.context,convert:e.convert,param:this._source.offset,units:e.units,value:e.offset,minValue:e.minValue,maxValue:e.maxValue})}static getDefaults(){return Object.assign(ys.getDefaults(),{convert:!0,offset:1,units:"number"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._source.start(t),this}_stopSource(e){this._source.stop(e)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class yt extends Ge{constructor(){super(de(yt.getDefaults(),arguments,["value","units"])),this.name="Signal",this.override=!0;const e=de(yt.getDefaults(),arguments,["value","units"]);this.output=this._constantSource=new mo({context:this.context,convert:e.convert,offset:e.value,units:e.units,minValue:e.minValue,maxValue:e.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(Ge.getDefaults(),{convert:!0,units:"number",value:0})}connect(e,t=0,n=0){return xc(this,e,t,n),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(e,t){return this._param.setValueAtTime(e,t),this}getValueAtTime(e){return this._param.getValueAtTime(e)}setRampPoint(e){return this._param.setRampPoint(e),this}linearRampToValueAtTime(e,t){return this._param.linearRampToValueAtTime(e,t),this}exponentialRampToValueAtTime(e,t){return this._param.exponentialRampToValueAtTime(e,t),this}exponentialRampTo(e,t,n){return this._param.exponentialRampTo(e,t,n),this}linearRampTo(e,t,n){return this._param.linearRampTo(e,t,n),this}targetRampTo(e,t,n){return this._param.targetRampTo(e,t,n),this}exponentialApproachValueAtTime(e,t,n){return this._param.exponentialApproachValueAtTime(e,t,n),this}setTargetAtTime(e,t,n){return this._param.setTargetAtTime(e,t,n),this}setValueCurveAtTime(e,t,n,s){return this._param.setValueCurveAtTime(e,t,n,s),this}cancelScheduledValues(e){return this._param.cancelScheduledValues(e),this}cancelAndHoldAtTime(e){return this._param.cancelAndHoldAtTime(e),this}rampTo(e,t,n){return this._param.rampTo(e,t,n),this}get value(){return this._param.value}set value(e){this._param.value=e}get convert(){return this._param.convert}set convert(e){this._param.convert=e}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(e){this._param.overridden=e}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(e){return this._param.apply(e),this}}function xc(i,e,t,n){(e instanceof ot||ki(e)||e instanceof yt&&e.override)&&(e.cancelScheduledValues(0),e.setValueAtTime(0,0),e instanceof yt&&(e.overridden=!0)),Is(i,e,t,n)}class _o extends ot{constructor(){super(de(_o.getDefaults(),arguments,["value"])),this.name="TickParam",this._events=new hn(1/0),this._multiplier=1;const e=de(_o.getDefaults(),arguments,["value"]);this._multiplier=e.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(e.value)}),this.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(ot.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(e,t,n){t=this.toSeconds(t),this.setRampPoint(t);const s=this._fromType(e),r=this._events.get(t),a=Math.round(Math.max(1/n,1));for(let o=0;o<=a;o++){const c=n*o+t,l=this._exponentialApproach(r.time,r.value,s,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(e,t){const n=this.toSeconds(t);super.setValueAtTime(e,t);const s=this._events.get(n),r=this._events.previousEvent(s),a=this._getTicksUntilEvent(r,n);return s.ticks=Math.max(a,0),this}linearRampToValueAtTime(e,t){const n=this.toSeconds(t);super.linearRampToValueAtTime(e,t);const s=this._events.get(n),r=this._events.previousEvent(s),a=this._getTicksUntilEvent(r,n);return s.ticks=Math.max(a,0),this}exponentialRampToValueAtTime(e,t){t=this.toSeconds(t);const n=this._fromType(e),s=this._events.get(t),r=Math.round(Math.max((t-s.time)*10,1)),a=(t-s.time)/r;for(let o=0;o<=r;o++){const c=a*o+s.time,l=this._exponentialInterpolate(s.time,s.value,t,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(e,t){if(e===null)e={ticks:0,time:0,type:"setValueAtTime",value:0};else if(un(e.ticks)){const a=this._events.previousEvent(e);e.ticks=this._getTicksUntilEvent(a,e.time)}const n=this._fromType(this.getValueAtTime(e.time));let s=this._fromType(this.getValueAtTime(t));const r=this._events.get(t);return r&&r.time===t&&r.type==="setValueAtTime"&&(s=this._fromType(this.getValueAtTime(t-this.sampleTime))),.5*(t-e.time)*(n+s)+e.ticks}getTicksAtTime(e){const t=this.toSeconds(e),n=this._events.get(t);return Math.max(this._getTicksUntilEvent(n,t),0)}getDurationOfTicks(e,t){const n=this.toSeconds(t),s=this.getTicksAtTime(t);return this.getTimeOfTick(s+e)-n}getTimeOfTick(e){const t=this._events.get(e,"ticks"),n=this._events.getAfter(e,"ticks");if(t&&t.ticks===e)return t.time;if(t&&n&&n.type==="linearRampToValueAtTime"&&t.value!==n.value){const s=this._fromType(this.getValueAtTime(t.time)),a=(this._fromType(this.getValueAtTime(n.time))-s)/(n.time-t.time),o=Math.sqrt(Math.pow(s,2)-2*a*(t.ticks-e)),c=(-s+o)/a,l=(-s-o)/a;return(c>0?c:l)+t.time}else return t?t.value===0?1/0:t.time+(e-t.ticks)/t.value:e/this._initialValue}ticksToTime(e,t){return this.getDurationOfTicks(e,t)}timeToTicks(e,t){const n=this.toSeconds(t),s=this.toSeconds(e),r=this.getTicksAtTime(n);return this.getTicksAtTime(n+s)-r}_fromType(e){return this.units==="bpm"&&this.multiplier?1/(60/e/this.multiplier):super._fromType(e)}_toType(e){return this.units==="bpm"&&this.multiplier?e/this.multiplier*60:super._toType(e)}get multiplier(){return this._multiplier}set multiplier(e){const t=this.value;this._multiplier=e,this.cancelScheduledValues(0),this.setValueAtTime(t,0)}}class go extends yt{constructor(){super(de(go.getDefaults(),arguments,["value"])),this.name="TickSignal";const e=de(go.getDefaults(),arguments,["value"]);this.input=this._param=new _o({context:this.context,convert:e.convert,multiplier:e.multiplier,param:this._constantSource.offset,units:e.units,value:e.value})}static getDefaults(){return Object.assign(yt.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(e,t){return this._param.ticksToTime(e,t)}timeToTicks(e,t){return this._param.timeToTicks(e,t)}getTimeOfTick(e){return this._param.getTimeOfTick(e)}getDurationOfTicks(e,t){return this._param.getDurationOfTicks(e,t)}getTicksAtTime(e){return this._param.getTicksAtTime(e)}get multiplier(){return this._param.multiplier}set multiplier(e){this._param.multiplier=e}dispose(){return super.dispose(),this._param.dispose(),this}}class vo extends $t{constructor(){super(de(vo.getDefaults(),arguments,["frequency"])),this.name="TickSource",this._state=new vc,this._tickOffset=new hn,this._ticksAtTime=new hn,this._secondsAtTime=new hn;const e=de(vo.getDefaults(),arguments,["frequency"]);this.frequency=new go({context:this.context,units:e.units,value:e.frequency}),ht(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},$t.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(e,t){const n=this.toSeconds(e);return this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),We(t)&&this.setTicksAtTime(t,n),this._ticksAtTime.cancel(n),this._secondsAtTime.cancel(n)),this}stop(e){const t=this.toSeconds(e);if(this._state.getValueAtTime(t)==="stopped"){const n=this._state.get(t);n&&n.time>0&&(this._tickOffset.cancel(n.time),this._state.cancel(n.time))}return this._state.cancel(t),this._state.setStateAtTime("stopped",t),this.setTicksAtTime(0,t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t)),this}cancel(e){return e=this.toSeconds(e),this._state.cancel(e),this._tickOffset.cancel(e),this._ticksAtTime.cancel(e),this._secondsAtTime.cancel(e),this}getTicksAtTime(e){const t=this.toSeconds(e),n=this._state.getLastState("stopped",t),s=this._ticksAtTime.get(t),r={state:"paused",time:t};this._state.add(r);let a=s||n,o=s?s.ticks:0,c=null;return this._state.forEachBetween(a.time,t+this.sampleTime,l=>{let u=a.time;const h=this._tickOffset.get(l.time);h&&h.time>=a.time&&(o=h.ticks,u=h.time),a.state==="started"&&l.state!=="started"&&(o+=this.frequency.getTicksAtTime(l.time)-this.frequency.getTicksAtTime(u),l.time!==r.time&&(c={state:l.state,time:l.time,ticks:o})),a=l}),this._state.remove(r),c&&this._ticksAtTime.add(c),o}get ticks(){return this.getTicksAtTime(this.now())}set ticks(e){this.setTicksAtTime(e,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(e){const t=this.now(),n=this.frequency.timeToTicks(e,t);this.setTicksAtTime(n,t)}getSecondsAtTime(e){e=this.toSeconds(e);const t=this._state.getLastState("stopped",e),n={state:"paused",time:e};this._state.add(n);const s=this._secondsAtTime.get(e);let r=s||t,a=s?s.seconds:0,o=null;return this._state.forEachBetween(r.time,e+this.sampleTime,c=>{let l=r.time;const u=this._tickOffset.get(c.time);u&&u.time>=r.time&&(a=u.seconds,l=u.time),r.state==="started"&&c.state!=="started"&&(a+=c.time-l,c.time!==n.time&&(o={state:c.state,time:c.time,seconds:a})),r=c}),this._state.remove(n),o&&this._secondsAtTime.add(o),a}setTicksAtTime(e,t){return t=this.toSeconds(t),this._tickOffset.cancel(t),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(e,t),ticks:e,time:t}),this._ticksAtTime.cancel(t),this._secondsAtTime.cancel(t),this}getStateAtTime(e){return e=this.toSeconds(e),this._state.getValueAtTime(e)}getTimeOfTick(e,t=this.now()){const n=this._tickOffset.get(t),s=this._state.get(t),r=Math.max(n.time,s.time),a=this.frequency.getTicksAtTime(r)+e-n.ticks;return this.frequency.getTimeOfTick(a)}forEachTickBetween(e,t,n){let s=this._state.get(e);this._state.forEachBetween(e,t,a=>{s&&s.state==="started"&&a.state!=="started"&&this.forEachTickBetween(Math.max(s.time,e),a.time-this.sampleTime,n),s=a});let r=null;if(s&&s.state==="started"){const a=Math.max(s.time,e),o=this.frequency.getTicksAtTime(a),c=this.frequency.getTicksAtTime(s.time),l=o-c;let u=Math.ceil(l)-l;u=_n(u,1)?0:u;let h=this.frequency.getTimeOfTick(o+u);for(;h<t;){try{n(h,Math.round(this.getTicksAtTime(h)))}catch(d){r=d;break}h+=this.frequency.getDurationOfTicks(1,h)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this._ticksAtTime.dispose(),this._secondsAtTime.dispose(),this.frequency.dispose(),this}}class Js extends $t{constructor(){super(de(Js.getDefaults(),arguments,["callback","frequency"])),this.name="Clock",this.callback=Je,this._lastUpdate=0,this._state=new vc("stopped"),this._boundLoop=this._loop.bind(this);const e=de(Js.getDefaults(),arguments,["callback","frequency"]);this.callback=e.callback,this._tickSource=new vo({context:this.context,frequency:e.frequency,units:e.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,ht(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign($t.getDefaults(),{callback:Je,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(e,t){wh(this.context);const n=this.toSeconds(e);return this.log("start",n),this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),this._tickSource.start(n,t),n<this._lastUpdate&&this.emit("start",n,t)),this}stop(e){const t=this.toSeconds(e);return this.log("stop",t),this._state.cancel(t),this._state.setStateAtTime("stopped",t),this._tickSource.stop(t),t<this._lastUpdate&&this.emit("stop",t),this}pause(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)==="started"&&(this._state.setStateAtTime("paused",t),this._tickSource.pause(t),t<this._lastUpdate&&this.emit("pause",t)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(e){this._tickSource.ticks=e}get seconds(){return this._tickSource.seconds}set seconds(e){this._tickSource.seconds=e}getSecondsAtTime(e){return this._tickSource.getSecondsAtTime(e)}setTicksAtTime(e,t){return this._tickSource.setTicksAtTime(e,t),this}getTimeOfTick(e,t=this.now()){return this._tickSource.getTimeOfTick(e,t)}getTicksAtTime(e){return this._tickSource.getTicksAtTime(e)}nextTickTime(e,t){const n=this.toSeconds(t),s=this.getTicksAtTime(n);return this._tickSource.getTimeOfTick(s+e,n)}_loop(){const e=this._lastUpdate,t=this.now();this._lastUpdate=t,this.log("loop",e,t),e!==t&&(this._state.forEachBetween(e,t,n=>{switch(n.state){case"started":const s=this._tickSource.getTicksAtTime(n.time);this.emit("start",n.time,s);break;case"stopped":n.time!==0&&this.emit("stop",n.time);break;case"paused":this.emit("pause",n.time);break}}),this._tickSource.forEachTickBetween(e,t,(n,s)=>{this.callback(n,s)}))}getStateAtTime(e){const t=this.toSeconds(e);return this._state.getValueAtTime(t)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}}yr.mixin(Js);class Sc extends Zn{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const e=de(Sc.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=e.baseUrl,Object.keys(e.urls).forEach(t=>{this._loadingCount++;const n=e.urls[t];this.add(t,n,this._bufferLoaded.bind(this,e.onload),e.onerror)})}static getDefaults(){return{baseUrl:"",onerror:Je,onload:Je,urls:{}}}has(e){return this._buffers.has(e.toString())}get(e){return Pe(this.has(e),`ToneAudioBuffers has no buffer named: ${e}`),this._buffers.get(e.toString())}_bufferLoaded(e){this._loadingCount--,this._loadingCount===0&&e&&e()}get loaded(){return Array.from(this._buffers).every(([e,t])=>t.loaded)}add(e,t,n=Je,s=Je){return Wn(t)?(this.baseUrl&&t.trim().substring(0,11).toLowerCase()==="data:audio/"&&(this.baseUrl=""),this._buffers.set(e.toString(),new st(this.baseUrl+t,n,s))):this._buffers.set(e.toString(),new st(t,n,s)),this}dispose(){return super.dispose(),this._buffers.forEach(e=>e.dispose()),this._buffers.clear(),this}}class xo extends nn{constructor(){super(...arguments),this.name="MidiClass",this.defaultUnits="midi"}_frequencyToUnits(e){return Ri(super._frequencyToUnits(e))}_ticksToUnits(e){return Ri(super._ticksToUnits(e))}_beatsToUnits(e){return Ri(super._beatsToUnits(e))}_secondsToUnits(e){return Ri(super._secondsToUnits(e))}toMidi(){return this.valueOf()}toFrequency(){return Uh(this.toMidi())}transpose(e){return new xo(this.context,this.toMidi()+e)}}class fs extends qs{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(e){return this._getPPQ()*e}_secondsToUnits(e){return Math.floor(e/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(e){return e}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}class nv extends $t{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new hn,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(e,t){return this._events.add({callback:e,time:this.toSeconds(t)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(e){return this._events.cancel(this.toSeconds(e)),this}_drawLoop(){const e=this.context.currentTime;for(;this._events.length&&this._events.peek().time-this.anticipation<=e;){const t=this._events.shift();t&&e-t.time<=this.expiration&&t.callback()}this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}}Bo(i=>{i.draw=new nv({context:i})});Vo(i=>{i.draw.dispose()});class iv extends Zn{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(e){Pe(We(e.time),"Events must have a time property"),Pe(We(e.duration),"Events must have a duration parameter"),e.time=e.time.valueOf();let t=new sv(e.time,e.time+e.duration,e);for(this._root===null?this._root=t:this._root.insert(t),this._length++;t!==null;)t.updateHeight(),t.updateMax(),this._rebalance(t),t=t.parent;return this}remove(e){if(this._root!==null){const t=[];this._root.search(e.time,t);for(const n of t)if(n.event===e){this._removeNode(n),this._length--;break}}return this}get length(){return this._length}cancel(e){return this.forEachFrom(e,t=>this.remove(t)),this}_setRoot(e){this._root=e,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(e,t){e.parent!==null?(e.isLeftChild()?e.parent.left=t:e.parent.right=t,this._rebalance(e.parent)):this._setRoot(t)}_removeNode(e){if(e.left===null&&e.right===null)this._replaceNodeInParent(e,null);else if(e.right===null)this._replaceNodeInParent(e,e.left);else if(e.left===null)this._replaceNodeInParent(e,e.right);else{const t=e.getBalance();let n,s=null;if(t>0)if(e.left.right===null)n=e.left,n.right=e.right,s=n;else{for(n=e.left.right;n.right!==null;)n=n.right;n.parent&&(n.parent.right=n.left,s=n.parent,n.left=e.left,n.right=e.right)}else if(e.right.left===null)n=e.right,n.left=e.left,s=n;else{for(n=e.right.left;n.left!==null;)n=n.left;n.parent&&(n.parent.left=n.right,s=n.parent,n.left=e.left,n.right=e.right)}e.parent!==null?e.isLeftChild()?e.parent.left=n:e.parent.right=n:this._setRoot(n),s&&this._rebalance(s)}e.dispose()}_rotateLeft(e){const t=e.parent,n=e.isLeftChild(),s=e.right;s&&(e.right=s.left,s.left=e),t!==null?n?t.left=s:t.right=s:this._setRoot(s)}_rotateRight(e){const t=e.parent,n=e.isLeftChild(),s=e.left;s&&(e.left=s.right,s.right=e),t!==null?n?t.left=s:t.right=s:this._setRoot(s)}_rebalance(e){const t=e.getBalance();t>1&&e.left?e.left.getBalance()<0?this._rotateLeft(e.left):this._rotateRight(e):t<-1&&e.right&&(e.right.getBalance()>0?this._rotateRight(e.right):this._rotateLeft(e))}get(e){if(this._root!==null){const t=[];if(this._root.search(e,t),t.length>0){let n=t[0];for(let s=1;s<t.length;s++)t[s].low>n.low&&(n=t[s]);return n.event}}return null}forEach(e){if(this._root!==null){const t=[];this._root.traverse(n=>t.push(n)),t.forEach(n=>{n.event&&e(n.event)})}return this}forEachAtTime(e,t){if(this._root!==null){const n=[];this._root.search(e,n),n.forEach(s=>{s.event&&t(s.event)})}return this}forEachFrom(e,t){if(this._root!==null){const n=[];this._root.searchAfter(e,n),n.forEach(s=>{s.event&&t(s.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(e=>e.dispose()),this._root=null,this}}class sv{constructor(e,t,n){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=n,this.low=e,this.high=t,this.max=this.high}insert(e){e.low<=this.low?this.left===null?this.left=e:this.left.insert(e):this.right===null?this.right=e:this.right.insert(e)}search(e,t){e>this.max||(this.left!==null&&this.left.search(e,t),this.low<=e&&this.high>e&&t.push(this),!(this.low>e)&&this.right!==null&&this.right.search(e,t))}searchAfter(e,t){this.low>=e&&(t.push(this),this.left!==null&&this.left.searchAfter(e,t)),this.right!==null&&this.right.searchAfter(e,t)}traverse(e){e(this),this.left!==null&&this.left.traverse(e),this.right!==null&&this.right.traverse(e)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let e=0;return this.left!==null&&this.right!==null?e=this.left.height-this.right.height:this.left!==null?e=this.left.height+1:this.right!==null&&(e=-(this.right.height+1)),e}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(e){this._left=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(e){this._right=e,e!==null&&(e.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class Bi extends Ge{constructor(){super(de(Bi.getDefaults(),arguments,["volume"])),this.name="Volume";const e=de(Bi.getDefaults(),arguments,["volume"]);this.input=this.output=new Dt({context:this.context,gain:e.volume,units:"decibels"}),this.volume=this.output.gain,ht(this,"volume"),this._unmutedVolume=e.volume,this.mute=e.mute}static getDefaults(){return Object.assign(Ge.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(e){!this.mute&&e?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!e&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class So extends Ge{constructor(){super(de(So.getDefaults(),arguments)),this.name="Destination",this.input=new Bi({context:this.context}),this.output=new Dt({context:this.context}),this.volume=this.input.volume;const e=de(So.getDefaults(),arguments);Ba(this.input,this.output,this.context.rawContext.destination),this.mute=e.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(Ge.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(e){this.input.mute=e}chain(...e){return this.input.disconnect(),e.unshift(this.input),e.push(this.output),Ba(...e),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}Bo(i=>{i.destination=new So({context:i})});Vo(i=>{i.destination.dispose()});class rv extends Zn{constructor(e){super(),this.name="TimelineValue",this._timeline=new hn({memory:10}),this._initialValue=e}set(e,t){return this._timeline.add({value:e,time:t}),this}get(e){const t=this._timeline.get(e);return t?t.value:this._initialValue}}class Ms extends Ge{constructor(){super(Object.assign(de(Ms.getDefaults(),arguments,["context"])))}connect(e,t=0,n=0){return xc(this,e,t,n),this}}class Ts extends Ms{constructor(){super(Object.assign(de(Ts.getDefaults(),arguments,["mapping","length"]))),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper;const e=de(Ts.getDefaults(),arguments,["mapping","length"]);sn(e.mapping)||e.mapping instanceof Float32Array?this.curve=Float32Array.from(e.mapping):Dg(e.mapping)&&this.setMap(e.mapping,e.length)}static getDefaults(){return Object.assign(yt.getDefaults(),{length:1024})}setMap(e,t=1024){const n=new Float32Array(t);for(let s=0,r=t;s<r;s++){const a=s/(r-1)*2-1;n[s]=e(a,s)}return this.curve=n,this}get curve(){return this._shaper.curve}set curve(e){this._shaper.curve=e}get oversample(){return this._shaper.oversample}set oversample(e){const t=["none","2x","4x"].some(n=>n.includes(e));Pe(t,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=e}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class yo extends Ms{constructor(){super(Object.assign(de(yo.getDefaults(),arguments,["value"]))),this.name="Pow";const e=de(yo.getDefaults(),arguments,["value"]);this._exponentScaler=this.input=this.output=new Ts({context:this.context,mapping:this._expFunc(e.value),length:8192}),this._exponent=e.value}static getDefaults(){return Object.assign(Ms.getDefaults(),{value:1})}_expFunc(e){return t=>Math.pow(Math.abs(t),e)}get value(){return this._exponent}set value(e){this._exponent=e,this._exponentScaler.setMap(this._expFunc(this._exponent))}dispose(){return super.dispose(),this._exponentScaler.dispose(),this}}class di{constructor(e,t){this.id=di._eventId++,this._remainderTime=0;const n=Object.assign(di.getDefaults(),t);this.transport=e,this.callback=n.callback,this._once=n.once,this.time=Math.floor(n.time),this._remainderTime=n.time-this.time}static getDefaults(){return{callback:Je,once:!1,time:0}}get floatTime(){return this.time+this._remainderTime}invoke(e){if(this.callback){const t=this.transport.bpm.getDurationOfTicks(1,e);this.callback(e+this._remainderTime*t),this._once&&this.transport.clear(this.id)}}dispose(){return this.callback=void 0,this}}di._eventId=0;class yc extends di{constructor(e,t){super(e,t),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const n=Object.assign(yc.getDefaults(),t);this.duration=n.duration,this._interval=n.interval,this._nextTick=n.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.transport.on("ticks",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},di.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(e){this._createEvents(e),super.invoke(e)}_createEvent(){return po(this._nextTick,this.floatTime+this.duration)?this.transport.scheduleOnce(this.invoke.bind(this),new fs(this.context,this._nextTick).toSeconds()):-1}_createEvents(e){po(this._nextTick+this._interval,this.floatTime+this.duration)&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new fs(this.context,this._nextTick).toSeconds()))}_restart(e){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.floatTime;const t=this.transport.getTicksAtTime(e);Ss(t,this.time)&&(this._nextTick=this.floatTime+Math.ceil((t-this.floatTime)/this._interval)*this._interval),this._currentId=this._createEvent(),this._nextTick+=this._interval,this._nextId=this._createEvent()}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this.transport.off("ticks",this._boundRestart),this}}class Qs extends $t{constructor(){super(de(Qs.getDefaults(),arguments)),this.name="Transport",this._loop=new rv(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new hn,this._repeatedEvents=new iv,this._syncedSignals=[],this._swingAmount=0;const e=de(Qs.getDefaults(),arguments);this._ppq=e.ppq,this._clock=new Js({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=e.ppq,this.bpm.setValueAtTime(e.bpm,0),ht(this,"bpm"),this._timeSignature=e.timeSignature,this._swingTicks=e.ppq/2}static getDefaults(){return Object.assign($t.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(e,t){if(this._loop.get(e)&&t>=this._loopEnd&&(this.emit("loopEnd",e),this._clock.setTicksAtTime(this._loopStart,e),t=this._loopStart,this.emit("loopStart",e,this._clock.getSecondsAtTime(e)),this.emit("loop",e)),this._swingAmount>0&&t%this._ppq!==0&&t%(this._swingTicks*2)!==0){const n=t%(this._swingTicks*2)/(this._swingTicks*2),s=Math.sin(n*Math.PI)*this._swingAmount;e+=new fs(this.context,this._swingTicks*2/3).toSeconds()*s}rl(!0),this._timeline.forEachAtTime(t,n=>n.invoke(e)),rl(!1)}schedule(e,t){const n=new di(this,{callback:e,time:new qs(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}scheduleRepeat(e,t,n,s=1/0){const r=new yc(this,{callback:e,duration:new Sn(this.context,s).toTicks(),interval:new Sn(this.context,t).toTicks(),time:new qs(this.context,n).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(e,t){const n=new di(this,{callback:e,once:!0,time:new qs(this.context,t).toTicks()});return this._addEvent(n,this._timeline)}clear(e){if(this._scheduledEvents.hasOwnProperty(e)){const t=this._scheduledEvents[e.toString()];t.timeline.remove(t.event),t.event.dispose(),delete this._scheduledEvents[e.toString()]}return this}_addEvent(e,t){return this._scheduledEvents[e.id.toString()]={event:e,timeline:t},t.add(e),e.id}cancel(e=0){const t=this.toTicks(e);return this._timeline.forEachFrom(t,n=>this.clear(n.id)),this._repeatedEvents.forEachFrom(t,n=>this.clear(n.id)),this}_bindClockEvents(){this._clock.on("start",(e,t)=>{t=new fs(this.context,t).toSeconds(),this.emit("start",e,t)}),this._clock.on("stop",e=>{this.emit("stop",e)}),this._clock.on("pause",e=>{this.emit("pause",e)})}get state(){return this._clock.getStateAtTime(this.now())}start(e,t){this.context.resume();let n;return We(t)&&(n=this.toTicks(t)),this._clock.start(e,n),this}stop(e){return this._clock.stop(e),this}pause(e){return this._clock.pause(e),this}toggle(e){return e=this.toSeconds(e),this._clock.getStateAtTime(e)!=="started"?this.start(e):this.stop(e),this}get timeSignature(){return this._timeSignature}set timeSignature(e){sn(e)&&(e=e[0]/e[1]*4),this._timeSignature=e}get loopStart(){return new Sn(this.context,this._loopStart,"i").toSeconds()}set loopStart(e){this._loopStart=this.toTicks(e)}get loopEnd(){return new Sn(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(e){this._loopEnd=this.toTicks(e)}get loop(){return this._loop.get(this.now())}set loop(e){this._loop.set(e,this.now())}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get swing(){return this._swingAmount}set swing(e){this._swingAmount=e}get swingSubdivision(){return new fs(this.context,this._swingTicks).toNotation()}set swingSubdivision(e){this._swingTicks=this.toTicks(e)}get position(){const e=this.now(),t=this._clock.getTicksAtTime(e);return new fs(this.context,t).toBarsBeatsSixteenths()}set position(e){const t=this.toTicks(e);this.ticks=t}get seconds(){return this._clock.seconds}set seconds(e){const t=this.now(),n=this._clock.frequency.timeToTicks(e,t);this.ticks=n}get progress(){if(this.loop){const e=this.now();return(this._clock.getTicksAtTime(e)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(e){if(this._clock.ticks!==e){const t=this.now();if(this.state==="started"){const n=this._clock.getTicksAtTime(t),s=this._clock.frequency.getDurationOfTicks(Math.ceil(n)-n,t),r=t+s;this.emit("stop",r),this._clock.setTicksAtTime(e,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this.emit("ticks",t),this._clock.setTicksAtTime(e,t)}}getTicksAtTime(e){return this._clock.getTicksAtTime(e)}getSecondsAtTime(e){return this._clock.getSecondsAtTime(e)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(e){this._clock.frequency.multiplier=e}nextSubdivision(e){if(e=this.toTicks(e),this.state!=="started")return 0;{const t=this.now(),n=this.getTicksAtTime(t),s=e-n%e;return this._clock.nextTickTime(s,t)}}syncSignal(e,t){const n=this.now();let s=this.bpm,r=1/(60/s.getValueAtTime(n)/this.PPQ),a=[];if(e.units==="time"){const c=.015625/r,l=new Dt(c),u=new yo(-1),h=new Dt(c);s.chain(l,u,h),s=h,r=1/r,a=[l,u,h]}t||(e.getValueAtTime(n)!==0?t=e.getValueAtTime(n)/r:t=0);const o=new Dt(t);return s.connect(o),o.connect(e._param),a.push(o),this._syncedSignals.push({initial:e.value,nodes:a,signal:e}),e.value=0,this}unsyncSignal(e){for(let t=this._syncedSignals.length-1;t>=0;t--){const n=this._syncedSignals[t];n.signal===e&&(n.nodes.forEach(s=>s.dispose()),n.signal.value=n.initial,this._syncedSignals.splice(t,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),Lh(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}}yr.mixin(Qs);Bo(i=>{i.transport=new Qs({context:i})});Vo(i=>{i.transport.dispose()});let rn=class extends Ge{constructor(e){super(e),this.input=void 0,this._state=new vc("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=Je,this._syncedStop=Je,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new Bi({context:this.context,mute:e.mute,volume:e.volume}),this.volume=this._volume.volume,ht(this,"volume"),this.onstop=e.onstop}static getDefaults(){return Object.assign(Ge.getDefaults(),{mute:!1,onstop:Je,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}_clampToCurrentTime(e){return this._synced?e:Math.max(e,this.context.currentTime)}start(e,t,n){let s=un(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(s=this._clampToCurrentTime(s),!this._synced&&this._state.getValueAtTime(s)==="started")Pe(Ss(s,this._state.get(s).time),"Start time must be strictly greater than previous start time"),this._state.cancel(s),this._state.setStateAtTime("started",s),this.log("restart",s),this.restart(s,t,n);else if(this.log("start",s),this._state.setStateAtTime("started",s),this._synced){const r=this._state.get(s);r&&(r.offset=this.toSeconds(ms(t,0)),r.duration=n?this.toSeconds(n):void 0);const a=this.context.transport.schedule(o=>{this._start(o,t,n)},s);this._scheduled.push(a),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>s&&this._syncedStart(this.now(),this.context.transport.seconds)}else wh(this.context),this._start(s,t,n);return this}stop(e){let t=un(e)&&this._synced?this.context.transport.seconds:this.toSeconds(e);if(t=this._clampToCurrentTime(t),this._state.getValueAtTime(t)==="started"||We(this._state.getNextState("started",t))){if(this.log("stop",t),!this._synced)this._stop(t);else{const n=this.context.transport.schedule(this._stop.bind(this),t);this._scheduled.push(n)}this._state.cancel(t),this._state.setStateAtTime("stopped",t)}return this}restart(e,t,n){return e=this.toSeconds(e),this._state.getValueAtTime(e)==="started"&&(this._state.cancel(e),this._restart(e,t,n)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(e,t)=>{if(Ss(t,0)){const n=this._state.get(t);if(n&&n.state==="started"&&n.time!==t){const s=t-this.toSeconds(n.time);let r;n.duration&&(r=this.toSeconds(n.duration)-s),this._start(e,this.toSeconds(n.offset)+s,r)}}},this._syncedStop=e=>{const t=this.context.transport.getSecondsAtTime(Math.max(e-this.sampleTime,0));this._state.getValueAtTime(t)==="started"&&this._stop(e)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(e=>this.context.transport.clear(e)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=Je,this.unsync(),this._volume.dispose(),this._state.dispose(),this}};class er extends ys{constructor(){super(de(er.getDefaults(),arguments,["url","onload"])),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1;const e=de(er.getDefaults(),arguments,["url","onload"]);Is(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new ot({context:this.context,param:this._source.playbackRate,units:"positive",value:e.playbackRate}),this.loop=e.loop,this.loopStart=e.loopStart,this.loopEnd=e.loopEnd,this._buffer=new st(e.url,e.onload,e.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(ys.getDefaults(),{url:new st,loop:!1,loopEnd:0,loopStart:0,onload:Je,onerror:Je,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(e){this._fadeIn=e}get fadeOut(){return this._fadeOut}set fadeOut(e){this._fadeOut=e}get curve(){return this._curve}set curve(e){this._curve=e}start(e,t,n,s=1){Pe(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(e);this._startGain(r,s),this.loop?t=ms(t,this.loopStart):t=ms(t,0);let a=Math.max(this.toSeconds(t),0);if(this.loop){const o=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=o-c;Fa(a,o)&&(a=(a-c)%l+c),_n(a,this.buffer.duration)&&(a=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,po(a,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,a)),We(n)){let o=this.toSeconds(n);o=Math.max(o,0),this.stop(r+o)}return this}_stopSource(e){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(e)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(e){this._source.loopStart=this.toSeconds(e)}get loopEnd(){return this._source.loopEnd}set loopEnd(e){this._source.loopEnd=this.toSeconds(e)}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._source.loop}set loop(e){this._source.loop=e,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}function Xi(i,e){return gt(this,void 0,void 0,function*(){const t=e/i.context.sampleRate,n=new _c(1,t,i.context.sampleRate);return new i.constructor(Object.assign(i.get(),{frequency:2/t,detune:0,context:n})).toDestination().start(0),(yield n.render()).getChannelData(0)})}class Mo extends ys{constructor(){super(de(Mo.getDefaults(),arguments,["frequency","type"])),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator];const e=de(Mo.getDefaults(),arguments,["frequency","type"]);Is(this._oscillator,this._gainNode),this.type=e.type,this.frequency=new ot({context:this.context,param:this._oscillator.frequency,units:"frequency",value:e.frequency}),this.detune=new ot({context:this.context,param:this._oscillator.detune,units:"cents",value:e.detune}),ht(this,["frequency","detune"])}static getDefaults(){return Object.assign(ys.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(e){const t=this.toSeconds(e);return this.log("start",t),this._startGain(t),this._oscillator.start(t),this}_stopSource(e){this._oscillator.stop(e)}setPeriodicWave(e){return this._oscillator.setPeriodicWave(e),this}get type(){return this._oscillator.type}set type(e){this._oscillator.type=e}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class pt extends rn{constructor(){super(de(pt.getDefaults(),arguments,["frequency","type"])),this.name="Oscillator",this._oscillator=null;const e=de(pt.getDefaults(),arguments,["frequency","type"]);this.frequency=new yt({context:this.context,units:"frequency",value:e.frequency}),ht(this,"frequency"),this.detune=new yt({context:this.context,units:"cents",value:e.detune}),ht(this,"detune"),this._partials=e.partials,this._partialCount=e.partialCount,this._type=e.type,e.partialCount&&e.type!=="custom"&&(this._type=this.baseType+e.partialCount.toString()),this.phase=e.phase}static getDefaults(){return Object.assign(rn.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(e){const t=this.toSeconds(e),n=new Mo({context:this.context,onended:()=>this.onstop(this)});this._oscillator=n,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(t)}_stop(e){const t=this.toSeconds(e);this._oscillator&&this._oscillator.stop(t)}_restart(e){const t=this.toSeconds(e);return this.log("restart",t),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(t),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return pt._periodicWaveCache.find(t=>t.phase===this._phase&&Gg(t.partials,this._partials));{const e=pt._periodicWaveCache.find(t=>t.type===this._type&&t.phase===this._phase);return this._partialCount=e?e.partialCount:this._partialCount,e}}get type(){return this._type}set type(e){this._type=e;const t=["sine","square","sawtooth","triangle"].indexOf(e)!==-1;if(this._phase===0&&t)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=e);else{const n=this._getCachedPeriodicWave();if(We(n)){const{partials:s,wave:r}=n;this._wave=r,this._partials=s,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[s,r]=this._getRealImaginary(e,this._phase),a=this.context.createPeriodicWave(s,r);this._wave=a,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),pt._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:s,type:this._type,wave:this._wave}),pt._periodicWaveCache.length>100&&pt._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(e){this.partialCount&&this._type!=="custom"&&e!=="custom"?this.type=e+this.partialCount:this.type=e}get partialCount(){return this._partialCount}set partialCount(e){hi(e,0);let t=this._type;const n=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(n&&(t=n[1]),this._type!=="custom")e===0?this.type=t:this.type=t+e.toString();else{const s=new Float32Array(e);this._partials.forEach((r,a)=>s[a]=r),this._partials=Array.from(s),this.type=this._type}}_getRealImaginary(e,t){let s=2048;const r=new Float32Array(s),a=new Float32Array(s);let o=1;if(e==="custom"){if(o=this._partials.length+1,this._partialCount=this._partials.length,s=o,this._partials.length===0)return[r,a]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);c?(o=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),e=c[1],o=Math.max(o,2),s=o):this._partialCount=0,this._partials=[]}for(let c=1;c<s;++c){const l=2/(c*Math.PI);let u;switch(e){case"sine":u=c<=o?1:0,this._partials[c-1]=u;break;case"square":u=c&1?2*l:0,this._partials[c-1]=u;break;case"sawtooth":u=l*(c&1?1:-1),this._partials[c-1]=u;break;case"triangle":c&1?u=2*(l*l)*(c-1>>1&1?-1:1):u=0,this._partials[c-1]=u;break;case"custom":u=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+e)}u!==0?(r[c]=-u*Math.sin(t*c),a[c]=u*Math.cos(t*c)):(r[c]=0,a[c]=0)}return[r,a]}_inverseFFT(e,t,n){let s=0;const r=e.length;for(let a=0;a<r;a++)s+=e[a]*Math.cos(a*n)+t[a]*Math.sin(a*n);return s}getInitialValue(){const[e,t]=this._getRealImaginary(this._type,0);let n=0;const s=Math.PI*2,r=32;for(let a=0;a<r;a++)n=Math.max(this._inverseFFT(e,t,a/r*s),n);return Wg(-this._inverseFFT(e,t,this._phase)/n,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(e){this._phase=e*Math.PI/180,this.type=this._type}asArray(e=1024){return gt(this,void 0,void 0,function*(){return Xi(this,e)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}pt._periodicWaveCache=[];class ov extends Ms{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new Ts({context:this.context,mapping:e=>(e+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Vi extends yt{constructor(){super(Object.assign(de(Vi.getDefaults(),arguments,["value"]))),this.name="Multiply",this.override=!1;const e=de(Vi.getDefaults(),arguments,["value"]);this._mult=this.input=this.output=new Dt({context:this.context,minValue:e.minValue,maxValue:e.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(e.value,0)}static getDefaults(){return Object.assign(yt.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class tr extends rn{constructor(){super(de(tr.getDefaults(),arguments,["frequency","type","modulationType"])),this.name="AMOscillator",this._modulationScale=new ov({context:this.context}),this._modulationNode=new Dt({context:this.context});const e=de(tr.getDefaults(),arguments,["frequency","type","modulationType"]);this._carrier=new pt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new pt({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Vi({context:this.context,units:"positive",value:e.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),ht(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(pt.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){this._modulator.restart(e),this._carrier.restart(e)}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(e=1024){return gt(this,void 0,void 0,function*(){return Xi(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class nr extends rn{constructor(){super(de(nr.getDefaults(),arguments,["frequency","type","modulationType"])),this.name="FMOscillator",this._modulationNode=new Dt({context:this.context,gain:0});const e=de(nr.getDefaults(),arguments,["frequency","type","modulationType"]);this._carrier=new pt({context:this.context,detune:e.detune,frequency:0,onstop:()=>this.onstop(this),phase:e.phase,type:e.type}),this.detune=this._carrier.detune,this.frequency=new yt({context:this.context,units:"frequency",value:e.frequency}),this._modulator=new pt({context:this.context,phase:e.phase,type:e.modulationType}),this.harmonicity=new Vi({context:this.context,units:"positive",value:e.harmonicity}),this.modulationIndex=new Vi({context:this.context,units:"positive",value:e.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),ht(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(pt.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(e){this._modulator.start(e),this._carrier.start(e)}_stop(e){this._modulator.stop(e),this._carrier.stop(e)}_restart(e){return this._modulator.restart(e),this._carrier.restart(e),this}get type(){return this._carrier.type}set type(e){this._carrier.type=e}get baseType(){return this._carrier.baseType}set baseType(e){this._carrier.baseType=e}get partialCount(){return this._carrier.partialCount}set partialCount(e){this._carrier.partialCount=e}get modulationType(){return this._modulator.type}set modulationType(e){this._modulator.type=e}get phase(){return this._carrier.phase}set phase(e){this._carrier.phase=e,this._modulator.phase=e}get partials(){return this._carrier.partials}set partials(e){this._carrier.partials=e}asArray(e=1024){return gt(this,void 0,void 0,function*(){return Xi(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class Es extends rn{constructor(){super(de(Es.getDefaults(),arguments,["frequency","width"])),this.name="PulseOscillator",this._widthGate=new Dt({context:this.context,gain:0}),this._thresh=new Ts({context:this.context,mapping:t=>t<=0?-1:1});const e=de(Es.getDefaults(),arguments,["frequency","width"]);this.width=new yt({context:this.context,units:"audioRange",value:e.width}),this._triangle=new pt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),ht(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(rn.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(e){e=this.toSeconds(e),this._triangle.start(e),this._widthGate.gain.setValueAtTime(1,e)}_stop(e){e=this.toSeconds(e),this._triangle.stop(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(0,e)}_restart(e){this._triangle.restart(e),this._widthGate.gain.cancelScheduledValues(e),this._widthGate.gain.setValueAtTime(1,e)}get phase(){return this._triangle.phase}set phase(e){this._triangle.phase=e}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(e){this._triangle.type=e}asArray(e=1024){return gt(this,void 0,void 0,function*(){return Xi(this,e)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class ir extends rn{constructor(){super(de(ir.getDefaults(),arguments,["frequency","type","spread"])),this.name="FatOscillator",this._oscillators=[];const e=de(ir.getDefaults(),arguments,["frequency","type","spread"]);this.frequency=new yt({context:this.context,units:"frequency",value:e.frequency}),this.detune=new yt({context:this.context,units:"cents",value:e.detune}),this._spread=e.spread,this._type=e.type,this._phase=e.phase,this._partials=e.partials,this._partialCount=e.partialCount,this.count=e.count,ht(this,["frequency","detune"])}static getDefaults(){return Object.assign(pt.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(e){e=this.toSeconds(e),this._forEach(t=>t.start(e))}_stop(e){e=this.toSeconds(e),this._forEach(t=>t.stop(e))}_restart(e){this._forEach(t=>t.restart(e))}_forEach(e){for(let t=0;t<this._oscillators.length;t++)e(this._oscillators[t],t)}get type(){return this._type}set type(e){this._type=e,this._forEach(t=>t.type=e)}get spread(){return this._spread}set spread(e){if(this._spread=e,this._oscillators.length>1){const t=-e/2,n=e/(this._oscillators.length-1);this._forEach((s,r)=>s.detune.value=t+n*r)}}get count(){return this._oscillators.length}set count(e){if(hi(e,1),this._oscillators.length!==e){this._forEach(t=>t.dispose()),this._oscillators=[];for(let t=0;t<e;t++){const n=new pt({context:this.context,volume:-6-e*1.1,type:this._type,phase:this._phase+t/e*360,partialCount:this._partialCount,onstop:t===0?()=>this.onstop(this):Je});this.type==="custom"&&(n.partials=this._partials),this.frequency.connect(n.frequency),this.detune.connect(n.detune),n.detune.overridden=!1,n.connect(this.output),this._oscillators[t]=n}this.spread=this._spread,this.state==="started"&&this._forEach(t=>t.start())}}get phase(){return this._phase}set phase(e){this._phase=e,this._forEach((t,n)=>t.phase=this._phase+n/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(e){this._forEach(t=>t.baseType=e),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(e){this._partials=e,this._partialCount=this._partials.length,e.length&&(this._type="custom",this._forEach(t=>t.partials=e))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(e){this._partialCount=e,this._forEach(t=>t.partialCount=e),this._type=this._oscillators[0].type}asArray(e=1024){return gt(this,void 0,void 0,function*(){return Xi(this,e)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(e=>e.dispose()),this}}class sr extends rn{constructor(){super(de(sr.getDefaults(),arguments,["frequency","modulationFrequency"])),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new Vi({context:this.context,value:2});const e=de(sr.getDefaults(),arguments,["frequency","modulationFrequency"]);this._pulse=new Es({context:this.context,frequency:e.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new pt({context:this.context,detune:e.detune,frequency:e.frequency,onstop:()=>this.onstop(this),phase:e.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),ht(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(rn.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(e){e=this.toSeconds(e),this._modulator.start(e),this._pulse.start(e)}_stop(e){e=this.toSeconds(e),this._modulator.stop(e),this._pulse.stop(e)}_restart(e){this._modulator.restart(e),this._pulse.restart(e)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(e){this._modulator.phase=e}asArray(e=1024){return gt(this,void 0,void 0,function*(){return Xi(this,e)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const ol={am:tr,fat:ir,fm:nr,oscillator:pt,pulse:Es,pwm:sr};class rr extends rn{constructor(){super(de(rr.getDefaults(),arguments,["frequency","type"])),this.name="OmniOscillator";const e=de(rr.getDefaults(),arguments,["frequency","type"]);this.frequency=new yt({context:this.context,units:"frequency",value:e.frequency}),this.detune=new yt({context:this.context,units:"cents",value:e.detune}),ht(this,["frequency","detune"]),this.set(e)}static getDefaults(){return Object.assign(pt.getDefaults(),nr.getDefaults(),tr.getDefaults(),ir.getDefaults(),Es.getDefaults(),sr.getDefaults())}_start(e){this._oscillator.start(e)}_stop(e){this._oscillator.stop(e)}_restart(e){return this._oscillator.restart(e),this}get type(){let e="";return["am","fm","fat"].some(t=>this._sourceType===t)&&(e=this._sourceType),e+this._oscillator.type}set type(e){e.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(2)):e.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=e.substr(3)):e==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):e==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=e)}get partials(){return this._oscillator.partials}set partials(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=e)}get partialCount(){return this._oscillator.partialCount}set partialCount(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=e)}set(e){return Reflect.has(e,"type")&&e.type&&(this.type=e.type),super.set(e),this}_createNewOscillator(e){if(e!==this._sourceType){this._sourceType=e;const t=ol[e],n=this.now();if(this._oscillator){const s=this._oscillator;s.stop(n),this.context.setTimeout(()=>s.dispose(),this.blockTime)}this._oscillator=new t({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(n)}}get phase(){return this._oscillator.phase}set phase(e){this._oscillator.phase=e}get sourceType(){return this._sourceType}set sourceType(e){let t="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(t=this._oscillator.type),e==="fm"?this.type="fm"+t:e==="am"?this.type="am"+t:e==="fat"?this.type="fat"+t:e==="oscillator"?this.type=t:e==="pulse"?this.type="pulse":e==="pwm"&&(this.type="pwm")}_getOscType(e,t){return e instanceof ol[t]}get baseType(){return this._oscillator.baseType}set baseType(e){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&e!=="pulse"&&e!=="pwm"&&(this._oscillator.baseType=e)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(e){this._getOscType(this._oscillator,"fat")&&ui(e)&&(this._oscillator.count=e)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(e){this._getOscType(this._oscillator,"fat")&&ui(e)&&(this._oscillator.spread=e)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(e){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&Wn(e)&&(this._oscillator.modulationType=e)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(e=1024){return gt(this,void 0,void 0,function*(){return Xi(this,e)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}function Fh(i,e=1/0){const t=new WeakMap;return function(n,s){Reflect.defineProperty(n,s,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){hi(r,i,e),t.set(this,r)}})}}function $n(i,e=1/0){const t=new WeakMap;return function(n,s){Reflect.defineProperty(n,s,{configurable:!0,enumerable:!0,get:function(){return t.get(this)},set:function(r){hi(this.toSeconds(r),i,e),t.set(this,r)}})}}class or extends rn{constructor(){super(de(or.getDefaults(),arguments,["url","onload"])),this.name="Player",this._activeSources=new Set;const e=de(or.getDefaults(),arguments,["url","onload"]);this._buffer=new st({onload:this._onload.bind(this,e.onload),onerror:e.onerror,reverse:e.reverse,url:e.url}),this.autostart=e.autostart,this._loop=e.loop,this._loopStart=e.loopStart,this._loopEnd=e.loopEnd,this._playbackRate=e.playbackRate,this.fadeIn=e.fadeIn,this.fadeOut=e.fadeOut}static getDefaults(){return Object.assign(rn.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:Je,onerror:Je,playbackRate:1,reverse:!1})}load(e){return gt(this,void 0,void 0,function*(){return yield this._buffer.load(e),this._onload(),this})}_onload(e=Je){e(),this.autostart&&this.start()}_onSourceEnd(e){this.onstop(this),this._activeSources.delete(e),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(e,t,n){return super.start(e,t,n),this}_start(e,t,n){this._loop?t=ms(t,this._loopStart):t=ms(t,0);const s=this.toSeconds(t),r=n;n=ms(n,Math.max(this._buffer.duration-s,0));let a=this.toSeconds(n);a=a/this._playbackRate,e=this.toSeconds(e);const o=new er({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(e+a),this._state.setStateAtTime("stopped",e+a,{implicitEnd:!0})),this._activeSources.add(o),this._loop&&un(r)?o.start(e,s):o.start(e,s,a-this.toSeconds(this.fadeOut))}_stop(e){const t=this.toSeconds(e);this._activeSources.forEach(n=>n.stop(t))}restart(e,t,n){return super.restart(e,t,n),this}_restart(e,t,n){var s;(s=[...this._activeSources].pop())===null||s===void 0||s.stop(e),this._start(e,t,n)}seek(e,t){const n=this.toSeconds(t);if(this._state.getValueAtTime(n)==="started"){const s=this.toSeconds(e);this._stop(n),this._start(n,s)}return this}setLoopPoints(e,t){return this.loopStart=e,this.loopEnd=t,this}get loopStart(){return this._loopStart}set loopStart(e){this._loopStart=e,this.buffer.loaded&&hi(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopStart=e})}get loopEnd(){return this._loopEnd}set loopEnd(e){this._loopEnd=e,this.buffer.loaded&&hi(this.toSeconds(e),0,this.buffer.duration),this._activeSources.forEach(t=>{t.loopEnd=e})}get buffer(){return this._buffer}set buffer(e){this._buffer.set(e)}get loop(){return this._loop}set loop(e){if(this._loop!==e&&(this._loop=e,this._activeSources.forEach(t=>{t.loop=e}),e)){const t=this._state.getNextState("stopped",this.now());t&&this._state.cancel(t.time)}}get playbackRate(){return this._playbackRate}set playbackRate(e){this._playbackRate=e;const t=this.now(),n=this._state.getNextState("stopped",t);n&&n.implicitEnd&&(this._state.cancel(n.time),this._activeSources.forEach(s=>s.cancelStop())),this._activeSources.forEach(s=>{s.playbackRate.setValueAtTime(e,t)})}get reverse(){return this._buffer.reverse}set reverse(e){this._buffer.reverse=e}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(e=>e.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}En([$n(0)],or.prototype,"fadeIn",void 0);En([$n(0)],or.prototype,"fadeOut",void 0);class qn extends Ge{constructor(){super(de(qn.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="Envelope",this._sig=new yt({context:this.context,value:0}),this.output=this._sig,this.input=void 0;const e=de(qn.getDefaults(),arguments,["attack","decay","sustain","release"]);this.attack=e.attack,this.decay=e.decay,this.sustain=e.sustain,this.release=e.release,this.attackCurve=e.attackCurve,this.releaseCurve=e.releaseCurve,this.decayCurve=e.decayCurve}static getDefaults(){return Object.assign(Ge.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(e,t){if(Wn(e))return e;{let n;for(n in Dr)if(Dr[n][t]===e)return n;return e}}_setCurve(e,t,n){if(Wn(n)&&Reflect.has(Dr,n)){const s=Dr[n];Pi(s)?e!=="_decayCurve"&&(this[e]=s[t]):this[e]=s}else if(sn(n)&&e!=="_decayCurve")this[e]=n;else throw new Error("Envelope: invalid curve: "+n)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(e){this._setCurve("_attackCurve","In",e)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(e){this._setCurve("_releaseCurve","Out",e)}get decayCurve(){return this._getCurve(this._decayCurve,"Out")}set decayCurve(e){this._setCurve("_decayCurve","Out",e)}triggerAttack(e,t=1){this.log("triggerAttack",e,t),e=this.toSeconds(e);let s=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),a=this.getValueAtTime(e);if(a>0){const o=1/s;s=(1-a)/o}if(s<this.sampleTime)this._sig.cancelScheduledValues(e),this._sig.setValueAtTime(t,e);else if(this._attackCurve==="linear")this._sig.linearRampTo(t,s,e);else if(this._attackCurve==="exponential")this._sig.targetRampTo(t,s,e);else{this._sig.cancelAndHoldAtTime(e);let o=this._attackCurve;for(let c=1;c<o.length;c++)if(o[c-1]<=a&&a<=o[c]){o=this._attackCurve.slice(c),o[0]=a;break}this._sig.setValueCurveAtTime(o,e,s,t)}if(r&&this.sustain<1){const o=t*this.sustain,c=e+s;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(o,r+c):this._sig.exponentialApproachValueAtTime(o,c,r)}return this}triggerRelease(e){this.log("triggerRelease",e),e=this.toSeconds(e);const t=this.getValueAtTime(e);if(t>0){const n=this.toSeconds(this.release);n<this.sampleTime?this._sig.setValueAtTime(0,e):this._releaseCurve==="linear"?this._sig.linearRampTo(0,n,e):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,n,e):(Pe(sn(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(e),this._sig.setValueCurveAtTime(this._releaseCurve,e,n,t))}return this}getValueAtTime(e){return this._sig.getValueAtTime(e)}triggerAttackRelease(e,t,n=1){return t=this.toSeconds(t),this.triggerAttack(t,n),this.triggerRelease(t+this.toSeconds(e)),this}cancel(e){return this._sig.cancelScheduledValues(this.toSeconds(e)),this}connect(e,t=0,n=0){return xc(this,e,t,n),this}asArray(e=1024){return gt(this,void 0,void 0,function*(){const t=e/this.context.sampleRate,n=new _c(1,t,this.context.sampleRate),s=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=s+this.toSeconds(this.release),a=r*.1,o=r+a,c=new this.constructor(Object.assign(this.get(),{attack:t*this.toSeconds(this.attack)/o,decay:t*this.toSeconds(this.decay)/o,release:t*this.toSeconds(this.release)/o,context:n}));return c._sig.toDestination(),c.triggerAttackRelease(t*(s+a)/o,0),(yield n.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}En([$n(0)],qn.prototype,"attack",void 0);En([$n(0)],qn.prototype,"decay",void 0);En([Fh(0,1)],qn.prototype,"sustain",void 0);En([$n(0)],qn.prototype,"release",void 0);const Dr=(()=>{let e,t;const n=[];for(e=0;e<128;e++)n[e]=Math.sin(e/127*(Math.PI/2));const s=[],r=6.4;for(e=0;e<127;e++){t=e/127;const d=Math.sin(t*(Math.PI*2)*r-Math.PI/2)+1;s[e]=d/10+t*.83}s[127]=1;const a=[],o=5;for(e=0;e<128;e++)a[e]=Math.ceil(e/127*o)/o;const c=[];for(e=0;e<128;e++)t=e/127,c[e]=.5*(1-Math.cos(Math.PI*t));const l=[];for(e=0;e<128;e++){t=e/127;const d=Math.pow(t,3)*4+.2,p=Math.cos(d*Math.PI*2*t);l[e]=Math.abs(p*(1-t))}function u(d){const p=new Array(d.length);for(let _=0;_<d.length;_++)p[_]=1-d[_];return p}function h(d){return d.slice(0).reverse()}return{bounce:{In:u(l),Out:l},cosine:{In:n,Out:h(n)},exponential:"exponential",linear:"linear",ripple:{In:s,Out:u(s)},sine:{In:c,Out:u(c)},step:{In:a,Out:u(a)}}})();class Xn extends Ge{constructor(){super(de(Xn.getDefaults(),arguments)),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease,this._syncedRelease=t=>this._original_triggerRelease(t);const e=de(Xn.getDefaults(),arguments);this._volume=this.output=new Bi({context:this.context,volume:e.volume}),this.volume=this._volume.volume,ht(this,"volume")}static getDefaults(){return Object.assign(Ge.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}_syncState(){let e=!1;return this._synced||(this._synced=!0,e=!0),e}_syncMethod(e,t){const n=this["_original_"+e]=this[e];this[e]=(...s)=>{const r=s[t],a=this.context.transport.schedule(o=>{s[t]=o,n.apply(this,s)},r);this._scheduledEvents.push(a)}}unsync(){return this._scheduledEvents.forEach(e=>this.context.transport.clear(e)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease,this.context.transport.off("stop",this._syncedRelease),this.context.transport.off("pause",this._syncedRelease),this.context.transport.off("loopEnd",this._syncedRelease)),this}triggerAttackRelease(e,t,n,s){const r=this.toSeconds(n),a=this.toSeconds(t);return this.triggerAttack(e,r,s),this.triggerRelease(r+a),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class fi extends Xn{constructor(){super(de(fi.getDefaults(),arguments));const e=de(fi.getDefaults(),arguments);this.portamento=e.portamento,this.onsilence=e.onsilence}static getDefaults(){return Object.assign(Xn.getDefaults(),{detune:0,onsilence:Je,portamento:0})}triggerAttack(e,t,n=1){this.log("triggerAttack",e,t,n);const s=this.toSeconds(t);return this._triggerEnvelopeAttack(s,n),this.setNote(e,s),this}triggerRelease(e){this.log("triggerRelease",e);const t=this.toSeconds(e);return this._triggerEnvelopeRelease(t),this}setNote(e,t){const n=this.toSeconds(t),s=e instanceof nn?e.toFrequency():e;if(this.portamento>0&&this.getLevelAtTime(n)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(s,r,n)}else this.frequency.setValueAtTime(s,n);return this}}En([$n(0)],fi.prototype,"portamento",void 0);class Mc extends qn{constructor(){super(de(Mc.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new Dt({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class zi extends fi{constructor(){super(de(zi.getDefaults(),arguments)),this.name="Synth";const e=de(zi.getDefaults(),arguments);this.oscillator=new rr(Object.assign({context:this.context,detune:e.detune,onstop:()=>this.onsilence(this)},e.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new Mc(Object.assign({context:this.context},e.envelope)),this.oscillator.chain(this.envelope,this.output),ht(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(fi.getDefaults(),{envelope:Object.assign(Ua(qn.getDefaults(),Object.keys(Ge.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(Ua(rr.getDefaults(),[...Object.keys(rn.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(e,t){if(this.envelope.triggerAttack(e,t),this.oscillator.start(e),this.envelope.sustain===0){const n=this.toSeconds(this.envelope.attack),s=this.toSeconds(this.envelope.decay);this.oscillator.stop(e+n+s)}}_triggerEnvelopeRelease(e){this.envelope.triggerRelease(e),this.oscillator.stop(e+this.toSeconds(this.envelope.release))}getLevelAtTime(e){return e=this.toSeconds(e),this.envelope.getValueAtTime(e)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class ar extends zi{constructor(){super(de(ar.getDefaults(),arguments)),this.name="MembraneSynth",this.portamento=0;const e=de(ar.getDefaults(),arguments);this.pitchDecay=e.pitchDecay,this.octaves=e.octaves,ht(this,["oscillator","envelope"])}static getDefaults(){return Li(fi.getDefaults(),zi.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(e,t){const n=this.toSeconds(t),s=this.toFrequency(e instanceof nn?e.toFrequency():e),r=s*this.octaves;return this.oscillator.frequency.setValueAtTime(r,n),this.oscillator.frequency.exponentialRampToValueAtTime(s,n+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}En([Fh(0)],ar.prototype,"octaves",void 0);En([$n(0)],ar.prototype,"pitchDecay",void 0);const kh=new Set;function Tc(i){kh.add(i)}function Bh(i,e){const t=`registerProcessor("${i}", ${e})`;kh.add(t)}const av=`
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the {@link ToneAudioWorklet}. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`;Tc(av);const cv=`
	/**
	 * Abstract class for a single input/output processor. 
	 * has a 'generate' function which processes one sample at a time
	 */
	class SingleIOProcessor extends ToneAudioWorkletProcessor {

		constructor(options) {
			super(Object.assign(options, {
				numberOfInputs: 1,
				numberOfOutputs: 1
			}));
			/**
			 * Holds the name of the parameter and a single value of that
			 * parameter at the current sample
			 * @type { [name: string]: number }
			 */
			this.params = {}
		}

		/**
		 * Generate an output sample from the input sample and parameters
		 * @abstract
		 * @param input number
		 * @param channel number
		 * @param parameters { [name: string]: number }
		 * @returns number
		 */
		generate(){}

		/**
		 * Update the private params object with the 
		 * values of the parameters at the given index
		 * @param parameters { [name: string]: Float32Array },
		 * @param index number
		 */
		updateParams(parameters, index) {
			for (const paramName in parameters) {
				const param = parameters[paramName];
				if (param.length > 1) {
					this.params[paramName] = parameters[paramName][index];
				} else {
					this.params[paramName] = parameters[paramName][0];
				}
			}
		}

		/**
		 * Process a single frame of the audio
		 * @param inputs Float32Array[][]
		 * @param outputs Float32Array[][]
		 */
		process(inputs, outputs, parameters) {
			const input = inputs[0];
			const output = outputs[0];
			// get the parameter values
			const channelCount = Math.max(input && input.length || 0, output.length);
			for (let sample = 0; sample < this.blockSize; sample++) {
				this.updateParams(parameters, sample);
				for (let channel = 0; channel < channelCount; channel++) {
					const inputSample = input && input.length ? input[channel][sample] : 0;
					output[channel][sample] = this.generate(inputSample, channel, this.params);
				}
			}
			return !this.disposed;
		}
	};
`;Tc(cv);const lv=`
	/**
	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line
	 */
	class DelayLine {
		
		constructor(size, channels) {
			this.buffer = [];
			this.writeHead = []
			this.size = size;

			// create the empty channels
			for (let i = 0; i < channels; i++) {
				this.buffer[i] = new Float32Array(this.size);
				this.writeHead[i] = 0;
			}
		}

		/**
		 * Push a value onto the end
		 * @param channel number
		 * @param value number
		 */
		push(channel, value) {
			this.writeHead[channel] += 1;
			if (this.writeHead[channel] > this.size) {
				this.writeHead[channel] = 0;
			}
			this.buffer[channel][this.writeHead[channel]] = value;
		}

		/**
		 * Get the recorded value of the channel given the delay
		 * @param channel number
		 * @param delay number delay samples
		 */
		get(channel, delay) {
			let readHead = this.writeHead[channel] - Math.floor(delay);
			if (readHead < 0) {
				readHead += this.size;
			}
			return this.buffer[channel][readHead];
		}
	}
`;Tc(lv);const uv="feedback-comb-filter",hv=`
	class FeedbackCombFilterWorklet extends SingleIOProcessor {

		constructor(options) {
			super(options);
			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);
		}

		static get parameterDescriptors() {
			return [{
				name: "delayTime",
				defaultValue: 0.1,
				minValue: 0,
				maxValue: 1,
				automationRate: "k-rate"
			}, {
				name: "feedback",
				defaultValue: 0.5,
				minValue: 0,
				maxValue: 0.9999,
				automationRate: "k-rate"
			}];
		}

		generate(input, channel, parameters) {
			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);
			this.delayLine.push(channel, input + delayedSample * parameters.feedback);
			return delayedSample;
		}
	}
`;Bh(uv,hv);class To extends Xn{constructor(){super(de(To.getDefaults(),arguments,["voice","options"])),this.name="PolySynth",this._availableVoices=[],this._activeVoices=[],this._voices=[],this._gcTimeout=-1,this._averageActiveVoices=0,this._syncedRelease=s=>this.releaseAll(s);const e=de(To.getDefaults(),arguments,["voice","options"]);Pe(!ui(e.voice),"DEPRECATED: The polyphony count is no longer the first argument.");const t=e.voice.getDefaults();this.options=Object.assign(t,e.options),this.voice=e.voice,this.maxPolyphony=e.maxPolyphony,this._dummyVoice=this._getNextAvailableVoice();const n=this._voices.indexOf(this._dummyVoice);this._voices.splice(n,1),this._gcTimeout=this.context.setInterval(this._collectGarbage.bind(this),1)}static getDefaults(){return Object.assign(Xn.getDefaults(),{maxPolyphony:32,options:{},voice:zi})}get activeVoices(){return this._activeVoices.length}_makeVoiceAvailable(e){this._availableVoices.push(e);const t=this._activeVoices.findIndex(n=>n.voice===e);this._activeVoices.splice(t,1)}_getNextAvailableVoice(){if(this._availableVoices.length)return this._availableVoices.shift();if(this._voices.length<this.maxPolyphony){const e=new this.voice(Object.assign(this.options,{context:this.context,onsilence:this._makeVoiceAvailable.bind(this)}));return Pe(e instanceof fi,"Voice must extend Monophonic class"),e.connect(this.output),this._voices.push(e),e}else ko("Max polyphony exceeded. Note dropped.")}_collectGarbage(){if(this._averageActiveVoices=Math.max(this._averageActiveVoices*.95,this.activeVoices),this._availableVoices.length&&this._voices.length>Math.ceil(this._averageActiveVoices+1)){const e=this._availableVoices.shift(),t=this._voices.indexOf(e);this._voices.splice(t,1),this.context.isOffline||e.dispose()}}_triggerAttack(e,t,n){e.forEach(s=>{const r=new xo(this.context,s).toMidi(),a=this._getNextAvailableVoice();a&&(a.triggerAttack(s,t,n),this._activeVoices.push({midi:r,voice:a,released:!1}),this.log("triggerAttack",s,t))})}_triggerRelease(e,t){e.forEach(n=>{const s=new xo(this.context,n).toMidi(),r=this._activeVoices.find(({midi:a,released:o})=>a===s&&!o);r&&(r.voice.triggerRelease(t),r.released=!0,this.log("triggerRelease",n,t))})}_scheduleEvent(e,t,n,s){Pe(!this.disposed,"Synth was already disposed"),n<=this.now()?e==="attack"?this._triggerAttack(t,n,s):this._triggerRelease(t,n):this.context.setTimeout(()=>{this.disposed||this._scheduleEvent(e,t,n,s)},n-this.now())}triggerAttack(e,t,n){Array.isArray(e)||(e=[e]);const s=this.toSeconds(t);return this._scheduleEvent("attack",e,s,n),this}triggerRelease(e,t){Array.isArray(e)||(e=[e]);const n=this.toSeconds(t);return this._scheduleEvent("release",e,n),this}triggerAttackRelease(e,t,n,s){const r=this.toSeconds(n);if(this.triggerAttack(e,r,s),sn(t)){Pe(sn(e),"If the duration is an array, the notes must also be an array"),e=e;for(let a=0;a<e.length;a++){const o=t[Math.min(a,t.length-1)],c=this.toSeconds(o);Pe(c>0,"The duration must be greater than 0"),this.triggerRelease(e[a],r+c)}}else{const a=this.toSeconds(t);Pe(a>0,"The duration must be greater than 0"),this.triggerRelease(e,r+a)}return this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1),this.context.transport.on("stop",this._syncedRelease),this.context.transport.on("pause",this._syncedRelease),this.context.transport.on("loopEnd",this._syncedRelease)),this}set(e){const t=Ua(e,["onsilence","context"]);return this.options=Li(this.options,t),this._voices.forEach(n=>n.set(t)),this._dummyVoice.set(t),this}get(){return this._dummyVoice.get()}releaseAll(e){const t=this.toSeconds(e);return this._activeVoices.forEach(({voice:n})=>{n.triggerRelease(t)}),this}dispose(){return super.dispose(),this._dummyVoice.dispose(),this._voices.forEach(e=>e.dispose()),this._activeVoices=[],this._availableVoices=[],this.context.clearInterval(this._gcTimeout),this}}class cr extends Xn{constructor(){super(de(cr.getDefaults(),arguments,["urls","onload","baseUrl"],"urls")),this.name="Sampler",this._activeSources=new Map;const e=de(cr.getDefaults(),arguments,["urls","onload","baseUrl"],"urls"),t={};Object.keys(e.urls).forEach(n=>{const s=parseInt(n,10);if(Pe(Pr(n)||ui(s)&&isFinite(s),`url key is neither a note or midi pitch: ${n}`),Pr(n)){const r=new nn(this.context,n).toMidi();t[r]=e.urls[n]}else ui(s)&&isFinite(s)&&(t[s]=e.urls[s])}),this._buffers=new Sc({urls:t,onload:e.onload,baseUrl:e.baseUrl,onerror:e.onerror}),this.attack=e.attack,this.release=e.release,this.curve=e.curve,this._buffers.loaded&&Promise.resolve().then(e.onload)}static getDefaults(){return Object.assign(Xn.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:Je,onerror:Je,release:.1,urls:{}})}_findClosest(e){let n=0;for(;n<96;){if(this._buffers.has(e+n))return-n;if(this._buffers.has(e-n))return n;n++}throw new Error(`No available buffers for note: ${e}`)}triggerAttack(e,t,n=1){return this.log("triggerAttack",e,t,n),Array.isArray(e)||(e=[e]),e.forEach(s=>{const r=Oh(new nn(this.context,s).toFrequency()),a=Math.round(r),o=r-a,c=this._findClosest(a),l=a-c,u=this._buffers.get(l),h=Ih(c+o),d=new er({url:u,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:h}).connect(this.output);d.start(t,0,u.duration/h,n),sn(this._activeSources.get(a))||this._activeSources.set(a,[]),this._activeSources.get(a).push(d),d.onended=()=>{if(this._activeSources&&this._activeSources.has(a)){const p=this._activeSources.get(a),_=p.indexOf(d);_!==-1&&p.splice(_,1)}}}),this}triggerRelease(e,t){return this.log("triggerRelease",e,t),Array.isArray(e)||(e=[e]),e.forEach(n=>{const s=new nn(this.context,n).toMidi();if(this._activeSources.has(s)&&this._activeSources.get(s).length){const r=this._activeSources.get(s);t=this.toSeconds(t),r.forEach(a=>{a.stop(t)}),this._activeSources.set(s,[])}}),this}releaseAll(e){const t=this.toSeconds(e);return this._activeSources.forEach(n=>{for(;n.length;)n.shift().stop(t)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(e,t,n,s=1){const r=this.toSeconds(n);return this.triggerAttack(e,r,s),sn(t)?(Pe(sn(e),"notes must be an array when duration is array"),e.forEach((a,o)=>{const c=t[Math.min(o,t.length-1)];this.triggerRelease(a,r+this.toSeconds(c))})):this.triggerRelease(e,r+this.toSeconds(t)),this}add(e,t,n){if(Pe(Pr(e)||isFinite(e),`note must be a pitch or midi: ${e}`),Pr(e)){const s=new nn(this.context,e).toMidi();this._buffers.add(s,t,n)}else this._buffers.add(e,t,n);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(e=>{e.forEach(t=>t.dispose())}),this._activeSources.clear(),this}}En([$n(0)],cr.prototype,"attack",void 0);En([$n(0)],cr.prototype,"release",void 0);class Eo extends Ge{constructor(){super(Object.assign(de(Eo.getDefaults(),arguments,["pan"]))),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner;const e=de(Eo.getDefaults(),arguments,["pan"]);this.pan=new ot({context:this.context,param:this._panner.pan,value:e.pan,minValue:-1,maxValue:1}),this._panner.channelCount=e.channelCount,this._panner.channelCountMode="explicit",ht(this,"pan")}static getDefaults(){return Object.assign(Ge.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const dv="bit-crusher",fv=`
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`;Bh(dv,fv);class ft extends Ge{constructor(){super(de(ft.getDefaults(),arguments,["solo"])),this.name="Solo";const e=de(ft.getDefaults(),arguments,["solo"]);this.input=this.output=new Dt({context:this.context}),ft._allSolos.has(this.context)||ft._allSolos.set(this.context,new Set),ft._allSolos.get(this.context).add(this),this.solo=e.solo}static getDefaults(){return Object.assign(Ge.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(e){e?this._addSolo():this._removeSolo(),ft._allSolos.get(this.context).forEach(t=>t._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){ft._soloed.has(this.context)||ft._soloed.set(this.context,new Set),ft._soloed.get(this.context).add(this)}_removeSolo(){ft._soloed.has(this.context)&&ft._soloed.get(this.context).delete(this)}_isSoloed(){return ft._soloed.has(this.context)&&ft._soloed.get(this.context).has(this)}_noSolos(){return!ft._soloed.has(this.context)||ft._soloed.has(this.context)&&ft._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),ft._allSolos.get(this.context).delete(this),this._removeSolo(),this}}ft._allSolos=new Map;ft._soloed=new Map;class bo extends Ge{constructor(){super(de(bo.getDefaults(),arguments,["pan","volume"])),this.name="PanVol";const e=de(bo.getDefaults(),arguments,["pan","volume"]);this._panner=this.input=new Eo({context:this.context,pan:e.pan,channelCount:e.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new Bi({context:this.context,volume:e.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=e.mute,ht(this,["pan","volume"])}static getDefaults(){return Object.assign(Ge.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(e){this._volume.mute=e}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class bi extends Ge{constructor(){super(de(bi.getDefaults(),arguments,["volume","pan"])),this.name="Channel";const e=de(bi.getDefaults(),arguments,["volume","pan"]);this._solo=this.input=new ft({solo:e.solo,context:this.context}),this._panVol=this.output=new bo({context:this.context,pan:e.pan,volume:e.volume,mute:e.mute,channelCount:e.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),ht(this,["pan","volume"])}static getDefaults(){return Object.assign(Ge.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(e){this._solo.solo=e}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(e){this._panVol.mute=e}_getBus(e){return bi.buses.has(e)||bi.buses.set(e,new Dt({context:this.context})),bi.buses.get(e)}send(e,t=0){const n=this._getBus(e),s=new Dt({context:this.context,units:"decibels",gain:t});return this.connect(s),s.connect(n),s}receive(e){return this._getBus(e).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}bi.buses=new Map;class pv extends Ge{constructor(){super(...arguments),this.name="Listener",this.positionX=new ot({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new ot({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new ot({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new ot({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new ot({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new ot({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new ot({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new ot({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new ot({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(Ge.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}Bo(i=>{i.listener=new pv({context:i})});Vo(i=>{i.listener.dispose()});function mv(){return ln().now()}ln().transport;ln().destination;ln().destination;ln().listener;ln().draw;ln();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ec="159",_v=0,al=1,gv=2,Vh=1,vv=2,kn=3,pi=0,Kt=1,Vn=2,ai=0,_s=1,cl=2,ll=3,ul=4,xv=5,wi=100,Sv=101,yv=102,hl=103,dl=104,Mv=200,Tv=201,Ev=202,bv=203,Va=204,za=205,wv=206,Av=207,Cv=208,Rv=209,Pv=210,Dv=211,Lv=212,Nv=213,Iv=214,Ov=0,Uv=1,Fv=2,wo=3,kv=4,Bv=5,Vv=6,zv=7,zh=0,Gv=1,Hv=2,ci=0,Wv=1,qv=2,Xv=3,Yv=4,jv=5,Gh=300,bs=301,ws=302,Ga=303,Ha=304,Go=306,Wa=1e3,qt=1001,qa=1002,Gt=1003,fl=1004,Ko=1005,At=1006,Zv=1007,lr=1008,li=1009,$v=1010,Kv=1011,bc=1012,Hh=1013,si=1014,ri=1015,ur=1016,Wh=1017,qh=1018,Ni=1020,Jv=1021,xn=1023,Qv=1024,e0=1025,Ii=1026,As=1027,t0=1028,Xh=1029,n0=1030,Yh=1031,jh=1033,Jo=33776,Qo=33777,ea=33778,ta=33779,pl=35840,ml=35841,_l=35842,gl=35843,Zh=36196,vl=37492,xl=37496,Sl=37808,yl=37809,Ml=37810,Tl=37811,El=37812,bl=37813,wl=37814,Al=37815,Cl=37816,Rl=37817,Pl=37818,Dl=37819,Ll=37820,Nl=37821,na=36492,Il=36494,Ol=36495,i0=36283,Ul=36284,Fl=36285,kl=36286,$h=3e3,Oi=3001,s0=3200,r0=3201,Kh=0,o0=1,cn="",vt="srgb",Yn="srgb-linear",wc="display-p3",Ho="display-p3-linear",Ao="linear",it="srgb",Co="rec709",Ro="p3",ji=7680,Bl=519,a0=512,c0=513,l0=514,Jh=515,u0=516,h0=517,d0=518,f0=519,Vl=35044,zl="300 es",Xa=1035,zn=2e3,Po=2001;class Os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const It=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Gl=1234567;const Xs=Math.PI/180,hr=180/Math.PI;function Us(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(It[i&255]+It[i>>8&255]+It[i>>16&255]+It[i>>24&255]+"-"+It[e&255]+It[e>>8&255]+"-"+It[e>>16&15|64]+It[e>>24&255]+"-"+It[t&63|128]+It[t>>8&255]+"-"+It[t>>16&255]+It[t>>24&255]+It[n&255]+It[n>>8&255]+It[n>>16&255]+It[n>>24&255]).toLowerCase()}function Wt(i,e,t){return Math.max(e,Math.min(t,i))}function Ac(i,e){return(i%e+e)%e}function p0(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function m0(i,e,t){return i!==e?(t-i)/(e-i):0}function Ys(i,e,t){return(1-t)*i+t*e}function _0(i,e,t,n){return Ys(i,e,1-Math.exp(-t*n))}function g0(i,e=1){return e-Math.abs(Ac(i,e*2)-e)}function v0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function x0(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function S0(i,e){return i+Math.floor(Math.random()*(e-i+1))}function y0(i,e){return i+Math.random()*(e-i)}function M0(i){return i*(.5-Math.random())}function T0(i){i!==void 0&&(Gl=i);let e=Gl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function E0(i){return i*Xs}function b0(i){return i*hr}function Ya(i){return(i&i-1)===0&&i!==0}function w0(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Do(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function A0(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),p=r((n-e)/2),_=a((n-e)/2);switch(s){case"XYX":i.set(o*u,c*h,c*d,o*l);break;case"YZY":i.set(c*d,o*u,c*h,o*l);break;case"ZXZ":i.set(c*h,c*d,o*u,o*l);break;case"XZX":i.set(o*u,c*_,c*p,o*l);break;case"YXY":i.set(c*p,o*u,c*_,o*l);break;case"ZYZ":i.set(c*_,c*p,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function hs(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Vt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const ia={DEG2RAD:Xs,RAD2DEG:hr,generateUUID:Us,clamp:Wt,euclideanModulo:Ac,mapLinear:p0,inverseLerp:m0,lerp:Ys,damp:_0,pingpong:g0,smoothstep:v0,smootherstep:x0,randInt:S0,randFloat:y0,randFloatSpread:M0,seededRandom:T0,degToRad:E0,radToDeg:b0,isPowerOfTwo:Ya,ceilPowerOfTwo:w0,floorPowerOfTwo:Do,setQuaternionFromProperEuler:A0,normalize:Vt,denormalize:hs};class Xe{constructor(e=0,t=0){Xe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,t,n,s,r,a,o,c,l){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],d=n[2],p=n[5],_=n[8],g=s[0],m=s[3],f=s[6],y=s[1],v=s[4],A=s[7],S=s[2],E=s[5],T=s[8];return r[0]=a*g+o*y+c*S,r[3]=a*m+o*v+c*E,r[6]=a*f+o*A+c*T,r[1]=l*g+u*y+h*S,r[4]=l*m+u*v+h*E,r[7]=l*f+u*A+h*T,r[2]=d*g+p*y+_*S,r[5]=d*m+p*v+_*E,r[8]=d*f+p*A+_*T,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=u*a-o*l,d=o*c-u*r,p=l*r-a*c,_=t*h+n*d+s*p;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/_;return e[0]=h*g,e[1]=(s*l-u*n)*g,e[2]=(o*n-s*a)*g,e[3]=d*g,e[4]=(u*t-s*c)*g,e[5]=(s*r-o*t)*g,e[6]=p*g,e[7]=(n*c-l*t)*g,e[8]=(a*t-n*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(sa.makeScale(e,t)),this}rotate(e){return this.premultiply(sa.makeRotation(-e)),this}translate(e,t){return this.premultiply(sa.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const sa=new ze;function Qh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function dr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function C0(){const i=dr("canvas");return i.style.display="block",i}const Hl={};function js(i){i in Hl||(Hl[i]=!0,console.warn(i))}const Wl=new ze().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ql=new ze().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Lr={[Yn]:{transfer:Ao,primaries:Co,toReference:i=>i,fromReference:i=>i},[vt]:{transfer:it,primaries:Co,toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Ho]:{transfer:Ao,primaries:Ro,toReference:i=>i.applyMatrix3(ql),fromReference:i=>i.applyMatrix3(Wl)},[wc]:{transfer:it,primaries:Ro,toReference:i=>i.convertSRGBToLinear().applyMatrix3(ql),fromReference:i=>i.applyMatrix3(Wl).convertLinearToSRGB()}},R0=new Set([Yn,Ho]),Ke={enabled:!0,_workingColorSpace:Yn,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(i){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!i},get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!R0.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Lr[e].toReference,s=Lr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Lr[i].primaries},getTransfer:function(i){return i===cn?Ao:Lr[i].transfer}};function gs(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ra(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Zi;class ed{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Zi===void 0&&(Zi=dr("canvas")),Zi.width=e.width,Zi.height=e.height;const n=Zi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Zi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=dr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=gs(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(gs(t[n]/255)*255):t[n]=gs(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let P0=0;class td{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:P0++}),this.uuid=Us(),this.data=e,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(oa(s[a].image)):r.push(oa(s[a]))}else r=oa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function oa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ed.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let D0=0;class Yt extends Os{constructor(e=Yt.DEFAULT_IMAGE,t=Yt.DEFAULT_MAPPING,n=qt,s=qt,r=At,a=lr,o=xn,c=li,l=Yt.DEFAULT_ANISOTROPY,u=cn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:D0++}),this.uuid=Us(),this.name="",this.source=new td(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xe(0,0),this.repeat=new Xe(1,1),this.center=new Xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof u=="string"?this.colorSpace=u:(js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=u===Oi?vt:cn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wa:e.x=e.x-Math.floor(e.x);break;case qt:e.x=e.x<0?0:1;break;case qa:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Wa:e.y=e.y-Math.floor(e.y);break;case qt:e.y=e.y<0?0:1;break;case qa:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===vt?Oi:$h}set encoding(e){js("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=e===Oi?vt:cn}}Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=Gh;Yt.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,n=0,s=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],u=c[4],h=c[8],d=c[1],p=c[5],_=c[9],g=c[2],m=c[6],f=c[10];if(Math.abs(u-d)<.01&&Math.abs(h-g)<.01&&Math.abs(_-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+g)<.1&&Math.abs(_+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(l+1)/2,A=(p+1)/2,S=(f+1)/2,E=(u+d)/4,T=(h+g)/4,C=(_+m)/4;return v>A&&v>S?v<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(v),s=E/n,r=T/n):A>S?A<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(A),n=E/s,r=C/s):S<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(S),n=T/r,s=C/r),this.set(n,s,r,t),this}let y=Math.sqrt((m-_)*(m-_)+(h-g)*(h-g)+(d-u)*(d-u));return Math.abs(y)<.001&&(y=1),this.x=(m-_)/y,this.y=(h-g)/y,this.z=(d-u)/y,this.w=Math.acos((l+p+f-1)/2),this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class L0 extends Os{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t);const s={width:e,height:t,depth:1};n.encoding!==void 0&&(js("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Oi?vt:cn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:At,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Yt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(e,t,n=1){(this.width!==e||this.height!==t||this.depth!==n)&&(this.width=e,this.height=t,this.depth=n,this.texture.image.width=e,this.texture.image.height=t,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.texture=e.texture.clone(),this.texture.isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new td(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends L0{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class nd extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class N0 extends Yt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=qt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tr{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],h=n[s+3];const d=r[a+0],p=r[a+1],_=r[a+2],g=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=_,e[t+3]=g;return}if(h!==g||c!==d||l!==p||u!==_){let m=1-o;const f=c*d+l*p+u*_+h*g,y=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const S=Math.sqrt(v),E=Math.atan2(S,f*y);m=Math.sin(m*E)/S,o=Math.sin(o*E)/S}const A=o*y;if(c=c*m+d*A,l=l*m+p*A,u=u*m+_*A,h=h*m+g*A,m===1-o){const S=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=S,l*=S,u*=S,h*=S}}e[t]=c,e[t+1]=l,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],h=r[a],d=r[a+1],p=r[a+2],_=r[a+3];return e[t]=o*_+u*h+c*p-l*d,e[t+1]=c*_+u*d+l*h-o*p,e[t+2]=l*_+u*p+o*d-c*h,e[t+3]=u*_-o*h-c*d-l*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),h=o(r/2),d=c(n/2),p=c(s/2),_=c(r/2);switch(a){case"XYZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"YXZ":this._x=d*u*h+l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"ZXY":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h-d*p*_;break;case"ZYX":this._x=d*u*h-l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h+d*p*_;break;case"YZX":this._x=d*u*h+l*p*_,this._y=l*p*h+d*u*_,this._z=l*u*_-d*p*h,this._w=l*u*h-d*p*_;break;case"XZY":this._x=d*u*h-l*p*_,this._y=l*p*h-d*u*_,this._z=l*u*_+d*p*h,this._w=l*u*h+d*p*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t!==!1&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-s)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-c)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-l)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-s)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Wt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-t)*u)/l,d=Math.sin(t*u)/l;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=Math.random(),t=Math.sqrt(1-e),n=Math.sqrt(e),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(t*Math.cos(s),n*Math.sin(r),n*Math.cos(r),t*Math.sin(s))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(e=0,t=0,n=0){W.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Xl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Xl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+c*l+a*h-o*u,this.y=n+c*u+o*l-r*h,this.z=s+c*h+r*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return aa.copy(this).projectOnVector(e),this.sub(aa)}reflect(e){return this.sub(aa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Wt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=(Math.random()-.5)*2,t=Math.random()*Math.PI*2,n=Math.sqrt(1-e**2);return this.x=n*Math.cos(t),this.y=n*Math.sin(t),this.z=e,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const aa=new W,Xl=new Tr;class Er{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(fn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(fn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=fn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,fn):fn.fromBufferAttribute(r,a),fn.applyMatrix4(e.matrixWorld),this.expandByPoint(fn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Nr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Nr.copy(n.boundingBox)),Nr.applyMatrix4(e.matrixWorld),this.union(Nr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return!(e.x<this.min.x||e.x>this.max.x||e.y<this.min.y||e.y>this.max.y||e.z<this.min.z||e.z>this.max.z)}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return!(e.max.x<this.min.x||e.min.x>this.max.x||e.max.y<this.min.y||e.min.y>this.max.y||e.max.z<this.min.z||e.min.z>this.max.z)}intersectsSphere(e){return this.clampPoint(e.center,fn),fn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vs),Ir.subVectors(this.max,Vs),$i.subVectors(e.a,Vs),Ki.subVectors(e.b,Vs),Ji.subVectors(e.c,Vs),Jn.subVectors(Ki,$i),Qn.subVectors(Ji,Ki),xi.subVectors($i,Ji);let t=[0,-Jn.z,Jn.y,0,-Qn.z,Qn.y,0,-xi.z,xi.y,Jn.z,0,-Jn.x,Qn.z,0,-Qn.x,xi.z,0,-xi.x,-Jn.y,Jn.x,0,-Qn.y,Qn.x,0,-xi.y,xi.x,0];return!ca(t,$i,Ki,Ji,Ir)||(t=[1,0,0,0,1,0,0,0,1],!ca(t,$i,Ki,Ji,Ir))?!1:(Or.crossVectors(Jn,Qn),t=[Or.x,Or.y,Or.z],ca(t,$i,Ki,Ji,Ir))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,fn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(fn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Nn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Nn=[new W,new W,new W,new W,new W,new W,new W,new W],fn=new W,Nr=new Er,$i=new W,Ki=new W,Ji=new W,Jn=new W,Qn=new W,xi=new W,Vs=new W,Ir=new W,Or=new W,Si=new W;function ca(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Si.fromArray(i,r);const o=s.x*Math.abs(Si.x)+s.y*Math.abs(Si.y)+s.z*Math.abs(Si.z),c=e.dot(Si),l=t.dot(Si),u=n.dot(Si);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const I0=new Er,zs=new W,la=new W;class Cc{constructor(e=new W,t=-1){this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):I0.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);const t=zs.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(zs,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(la.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(la)),this.expandByPoint(zs.copy(e.center).sub(la))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new W,ua=new W,Ur=new W,ei=new W,ha=new W,Fr=new W,da=new W;class id{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ua.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),ei.copy(this.origin).sub(ua);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ur),o=ei.dot(this.direction),c=-ei.dot(Ur),l=ei.lengthSq(),u=Math.abs(1-a*a);let h,d,p,_;if(u>0)if(h=a*c-o,d=a*o-c,_=r*u,h>=0)if(d>=-_)if(d<=_){const g=1/u;h*=g,d*=g,p=h*(h+a*d+2*o)+d*(a*h+d+2*c)+l}else d=r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;else d=-r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;else d<=-_?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l):d<=_?(h=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+d*(d+2*c)+l);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ua).addScaledVector(Ur,d),p}intersectSphere(e,t){In.subVectors(e.center,this.origin);const n=In.dot(this.direction),s=In.dot(In)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,c=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,c=(e.min.z-d.z)*h),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,n,s,r){ha.subVectors(t,e),Fr.subVectors(n,e),da.crossVectors(ha,Fr);let a=this.direction.dot(da),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ei.subVectors(this.origin,e);const c=o*this.direction.dot(Fr.crossVectors(ei,Fr));if(c<0)return null;const l=o*this.direction.dot(ha.cross(ei));if(l<0||c+l>a)return null;const u=-o*ei.dot(da);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xt{constructor(e,t,n,s,r,a,o,c,l,u,h,d,p,_,g,m){xt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,u,h,d,p,_,g,m)}set(e,t,n,s,r,a,o,c,l,u,h,d,p,_,g,m){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=_,f[11]=g,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new xt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/Qi.setFromMatrixColumn(e,0).length(),r=1/Qi.setFromMatrixColumn(e,1).length(),a=1/Qi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,p=a*h,_=o*u,g=o*h;t[0]=c*u,t[4]=-c*h,t[8]=l,t[1]=p+_*l,t[5]=d-g*l,t[9]=-o*c,t[2]=g-d*l,t[6]=_+p*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*u,p=c*h,_=l*u,g=l*h;t[0]=d+g*o,t[4]=_*o-p,t[8]=a*l,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-_,t[6]=g+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*u,p=c*h,_=l*u,g=l*h;t[0]=d-g*o,t[4]=-a*h,t[8]=_+p*o,t[1]=p+_*o,t[5]=a*u,t[9]=g-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*u,p=a*h,_=o*u,g=o*h;t[0]=c*u,t[4]=_*l-p,t[8]=d*l+g,t[1]=c*h,t[5]=g*l+d,t[9]=p*l-_,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,p=a*l,_=o*c,g=o*l;t[0]=c*u,t[4]=g-d*h,t[8]=_*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=p*h+_,t[10]=d-g*h}else if(e.order==="XZY"){const d=a*c,p=a*l,_=o*c,g=o*l;t[0]=c*u,t[4]=-h,t[8]=l*u,t[1]=d*h+g,t[5]=a*u,t[9]=p*h-_,t[2]=_*h-p,t[6]=o*u,t[10]=g*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(O0,e,U0)}lookAt(e,t,n){const s=this.elements;return en.subVectors(e,t),en.lengthSq()===0&&(en.z=1),en.normalize(),ti.crossVectors(n,en),ti.lengthSq()===0&&(Math.abs(n.z)===1?en.x+=1e-4:en.z+=1e-4,en.normalize(),ti.crossVectors(n,en)),ti.normalize(),kr.crossVectors(en,ti),s[0]=ti.x,s[4]=kr.x,s[8]=en.x,s[1]=ti.y,s[5]=kr.y,s[9]=en.y,s[2]=ti.z,s[6]=kr.z,s[10]=en.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],d=n[9],p=n[13],_=n[2],g=n[6],m=n[10],f=n[14],y=n[3],v=n[7],A=n[11],S=n[15],E=s[0],T=s[4],C=s[8],x=s[12],b=s[1],D=s[5],L=s[9],F=s[13],P=s[2],I=s[6],k=s[10],O=s[14],Z=s[3],B=s[7],q=s[11],j=s[15];return r[0]=a*E+o*b+c*P+l*Z,r[4]=a*T+o*D+c*I+l*B,r[8]=a*C+o*L+c*k+l*q,r[12]=a*x+o*F+c*O+l*j,r[1]=u*E+h*b+d*P+p*Z,r[5]=u*T+h*D+d*I+p*B,r[9]=u*C+h*L+d*k+p*q,r[13]=u*x+h*F+d*O+p*j,r[2]=_*E+g*b+m*P+f*Z,r[6]=_*T+g*D+m*I+f*B,r[10]=_*C+g*L+m*k+f*q,r[14]=_*x+g*F+m*O+f*j,r[3]=y*E+v*b+A*P+S*Z,r[7]=y*T+v*D+A*I+S*B,r[11]=y*C+v*L+A*k+S*q,r[15]=y*x+v*F+A*O+S*j,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],u=e[2],h=e[6],d=e[10],p=e[14],_=e[3],g=e[7],m=e[11],f=e[15];return _*(+r*c*h-s*l*h-r*o*d+n*l*d+s*o*p-n*c*p)+g*(+t*c*p-t*l*d+r*a*d-s*a*p+s*l*u-r*c*u)+m*(+t*l*h-t*o*p-r*a*h+n*a*p+r*o*u-n*l*u)+f*(-s*o*u-t*c*h+t*o*d+s*a*h-n*a*d+n*c*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],u=e[8],h=e[9],d=e[10],p=e[11],_=e[12],g=e[13],m=e[14],f=e[15],y=h*m*l-g*d*l+g*c*p-o*m*p-h*c*f+o*d*f,v=_*d*l-u*m*l-_*c*p+a*m*p+u*c*f-a*d*f,A=u*g*l-_*h*l+_*o*p-a*g*p-u*o*f+a*h*f,S=_*h*c-u*g*c-_*o*d+a*g*d+u*o*m-a*h*m,E=t*y+n*v+s*A+r*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=y*T,e[1]=(g*d*r-h*m*r-g*s*p+n*m*p+h*s*f-n*d*f)*T,e[2]=(o*m*r-g*c*r+g*s*l-n*m*l-o*s*f+n*c*f)*T,e[3]=(h*c*r-o*d*r-h*s*l+n*d*l+o*s*p-n*c*p)*T,e[4]=v*T,e[5]=(u*m*r-_*d*r+_*s*p-t*m*p-u*s*f+t*d*f)*T,e[6]=(_*c*r-a*m*r-_*s*l+t*m*l+a*s*f-t*c*f)*T,e[7]=(a*d*r-u*c*r+u*s*l-t*d*l-a*s*p+t*c*p)*T,e[8]=A*T,e[9]=(_*h*r-u*g*r-_*n*p+t*g*p+u*n*f-t*h*f)*T,e[10]=(a*g*r-_*o*r+_*n*l-t*g*l-a*n*f+t*o*f)*T,e[11]=(u*o*r-a*h*r-u*n*l+t*h*l+a*n*p-t*o*p)*T,e[12]=S*T,e[13]=(u*g*s-_*h*s+_*n*d-t*g*d-u*n*m+t*h*m)*T,e[14]=(_*o*s-a*g*s-_*n*c+t*g*c+a*n*m-t*o*m)*T,e[15]=(a*h*s-u*o*s+u*n*c-t*h*c-a*n*d+t*o*d)*T,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,u=a+a,h=o+o,d=r*l,p=r*u,_=r*h,g=a*u,m=a*h,f=o*h,y=c*l,v=c*u,A=c*h,S=n.x,E=n.y,T=n.z;return s[0]=(1-(g+f))*S,s[1]=(p+A)*S,s[2]=(_-v)*S,s[3]=0,s[4]=(p-A)*E,s[5]=(1-(d+f))*E,s[6]=(m+y)*E,s[7]=0,s[8]=(_+v)*T,s[9]=(m-y)*T,s[10]=(1-(d+g))*T,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=Qi.set(s[0],s[1],s[2]).length();const a=Qi.set(s[4],s[5],s[6]).length(),o=Qi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],pn.copy(this);const l=1/r,u=1/a,h=1/o;return pn.elements[0]*=l,pn.elements[1]*=l,pn.elements[2]*=l,pn.elements[4]*=u,pn.elements[5]*=u,pn.elements[6]*=u,pn.elements[8]*=h,pn.elements[9]*=h,pn.elements[10]*=h,t.setFromRotationMatrix(pn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=zn){const c=this.elements,l=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s);let p,_;if(o===zn)p=-(a+r)/(a-r),_=-2*a*r/(a-r);else if(o===Po)p=-a/(a-r),_=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=zn){const c=this.elements,l=1/(t-e),u=1/(n-s),h=1/(a-r),d=(t+e)*l,p=(n+s)*u;let _,g;if(o===zn)_=(a+r)*h,g=-2*h;else if(o===Po)_=r*h,g=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=g,c[14]=-_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Qi=new W,pn=new xt,O0=new W(0,0,0),U0=new W(1,1,1),ti=new W,kr=new W,en=new W,Yl=new xt,jl=new Tr;class Wo{constructor(e=0,t=0,n=0,s=Wo.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],h=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Wt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Wt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Wt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Wt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Wt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Wt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return jl.setFromEuler(this),this.setFromQuaternion(jl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wo.DEFAULT_ORDER="XYZ";class Rc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let F0=0;const Zl=new W,es=new Tr,On=new xt,Br=new W,Gs=new W,k0=new W,B0=new Tr,$l=new W(1,0,0),Kl=new W(0,1,0),Jl=new W(0,0,1),V0={type:"added"},z0={type:"removed"};class Ut extends Os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:F0++}),this.uuid=Us(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new W,t=new Wo,n=new Tr,s=new W(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new xt},normalMatrix:{value:new ze}}),this.matrix=new xt,this.matrixWorld=new xt,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Rc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.multiply(es),this}rotateOnWorldAxis(e,t){return es.setFromAxisAngle(e,t),this.quaternion.premultiply(es),this}rotateX(e){return this.rotateOnAxis($l,e)}rotateY(e){return this.rotateOnAxis(Kl,e)}rotateZ(e){return this.rotateOnAxis(Jl,e)}translateOnAxis(e,t){return Zl.copy(e).applyQuaternion(this.quaternion),this.position.add(Zl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($l,e)}translateY(e){return this.translateOnAxis(Kl,e)}translateZ(e){return this.translateOnAxis(Jl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(On.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Br.copy(e):Br.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Gs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?On.lookAt(Gs,Br,this.up):On.lookAt(Br,Gs,this.up),this.quaternion.setFromRotationMatrix(On),s&&(On.extractRotation(s.matrixWorld),es.setFromRotationMatrix(On),this.quaternion.premultiply(es.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.parent!==null&&e.parent.remove(e),e.parent=this,this.children.push(e),e.dispatchEvent(V0)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(z0)),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),On.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),On.multiply(e.parent.matrixWorld)),e.applyMatrix4(On),this.add(e),e.updateWorldMatrix(!1,!0),this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,e,k0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Gs,B0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++){const r=t[n];(r.matrixWorldAutoUpdate===!0||e===!0)&&r.updateMatrixWorld(e)}}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++){const o=s[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(e.shapes,h)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}Ut.DEFAULT_UP=new W(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mn=new W,Un=new W,fa=new W,Fn=new W,ts=new W,ns=new W,Ql=new W,pa=new W,ma=new W,_a=new W;let Vr=!1;class gn{constructor(e=new W,t=new W,n=new W){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),mn.subVectors(e,t),s.cross(mn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){mn.subVectors(s,t),Un.subVectors(n,t),fa.subVectors(e,t);const a=mn.dot(mn),o=mn.dot(Un),c=mn.dot(fa),l=Un.dot(Un),u=Un.dot(fa),h=a*l-o*o;if(h===0)return r.set(-2,-1,-1);const d=1/h,p=(l*c-o*u)*d,_=(a*u-o*c)*d;return r.set(1-p-_,_,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Fn),Fn.x>=0&&Fn.y>=0&&Fn.x+Fn.y<=1}static getUV(e,t,n,s,r,a,o,c){return Vr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Vr=!0),this.getInterpolation(e,t,n,s,r,a,o,c)}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Fn),c.setScalar(0),c.addScaledVector(r,Fn.x),c.addScaledVector(a,Fn.y),c.addScaledVector(o,Fn.z),c}static isFrontFacing(e,t,n,s){return mn.subVectors(n,t),Un.subVectors(e,t),mn.cross(Un).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return mn.subVectors(this.c,this.b),Un.subVectors(this.a,this.b),mn.cross(Un).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return gn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return gn.getBarycoord(e,this.a,this.b,this.c,t)}getUV(e,t,n,s,r){return Vr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Vr=!0),gn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}getInterpolation(e,t,n,s,r){return gn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return gn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return gn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ts.subVectors(s,n),ns.subVectors(r,n),pa.subVectors(e,n);const c=ts.dot(pa),l=ns.dot(pa);if(c<=0&&l<=0)return t.copy(n);ma.subVectors(e,s);const u=ts.dot(ma),h=ns.dot(ma);if(u>=0&&h<=u)return t.copy(s);const d=c*h-u*l;if(d<=0&&c>=0&&u<=0)return a=c/(c-u),t.copy(n).addScaledVector(ts,a);_a.subVectors(e,r);const p=ts.dot(_a),_=ns.dot(_a);if(_>=0&&p<=_)return t.copy(r);const g=p*l-c*_;if(g<=0&&l>=0&&_<=0)return o=l/(l-_),t.copy(n).addScaledVector(ns,o);const m=u*_-p*h;if(m<=0&&h-u>=0&&p-_>=0)return Ql.subVectors(r,s),o=(h-u)/(h-u+(p-_)),t.copy(s).addScaledVector(Ql,o);const f=1/(m+g+d);return a=g*f,o=d*f,t.copy(n).addScaledVector(ts,a).addScaledVector(ns,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const sd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ni={h:0,s:0,l:0},zr={h:0,s:0,l:0};function ga(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ye{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=Ke.workingColorSpace){if(e=Ac(e,1),t=Wt(t,0,1),n=Wt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ga(a,r,e+1/3),this.g=ga(a,r,e),this.b=ga(a,r,e-1/3)}return Ke.toWorkingColorSpace(this,s),this}setStyle(e,t=vt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=vt){const n=sd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gs(e.r),this.g=gs(e.g),this.b=gs(e.b),this}copyLinearToSRGB(e){return this.r=ra(e.r),this.g=ra(e.g),this.b=ra(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vt){return Ke.fromWorkingColorSpace(Ot.copy(this),e),Math.round(Wt(Ot.r*255,0,255))*65536+Math.round(Wt(Ot.g*255,0,255))*256+Math.round(Wt(Ot.b*255,0,255))}getHexString(e=vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Ot.copy(this),t);const n=Ot.r,s=Ot.g,r=Ot.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(s-r)/h+(s<r?6:0);break;case s:c=(r-n)/h+2;break;case r:c=(n-s)/h+4;break}c/=6}return e.h=c,e.s=l,e.l=u,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Ot.copy(this),t),e.r=Ot.r,e.g=Ot.g,e.b=Ot.b,e}getStyle(e=vt){Ke.fromWorkingColorSpace(Ot.copy(this),e);const t=Ot.r,n=Ot.g,s=Ot.b;return e!==vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ni),this.setHSL(ni.h+e,ni.s+t,ni.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ni),e.getHSL(zr);const n=Ys(ni.h,zr.h,t),s=Ys(ni.s,zr.s,t),r=Ys(ni.l,zr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ot=new Ye;Ye.NAMES=sd;let G0=0;class br extends Os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:G0++}),this.uuid=Us(),this.name="",this.type="Material",this.blending=_s,this.side=pi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Va,this.blendDst=za,this.blendEquation=wi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ye(0,0,0),this.blendAlpha=0,this.depthFunc=wo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Bl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ji,this.stencilZFail=ji,this.stencilZPass=ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==_s&&(n.blending=this.blending),this.side!==pi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Va&&(n.blendSrc=this.blendSrc),this.blendDst!==za&&(n.blendDst=this.blendDst),this.blendEquation!==wi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==wo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Bl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class rd extends br{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=zh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _t=new W,Gr=new Xe;class An{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Vl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}get updateRange(){return console.warn('THREE.BufferAttribute: "updateRange" is deprecated and removed in r169. Use "addUpdateRange()" instead.'),this._updateRange}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Gr.fromBufferAttribute(this,t),Gr.applyMatrix3(e),this.setXY(t,Gr.x,Gr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix3(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyMatrix4(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.applyNormalMatrix(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)_t.fromBufferAttribute(this,t),_t.transformDirection(e),this.setXYZ(t,_t.x,_t.y,_t.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=hs(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Vt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=hs(t,this.array)),t}setX(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=hs(t,this.array)),t}setY(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=hs(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=hs(t,this.array)),t}setW(e,t){return this.normalized&&(t=Vt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),s=Vt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Vt(t,this.array),n=Vt(n,this.array),s=Vt(s,this.array),r=Vt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Vl&&(e.usage=this.usage),e}}class od extends An{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class ad extends An{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ui extends An{constructor(e,t,n){super(new Float32Array(e),t,n)}}let H0=0;const an=new xt,va=new Ut,is=new W,tn=new Er,Hs=new Er,wt=new W;class Yi extends Os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:H0++}),this.uuid=Us(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Qh(e)?ad:od)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ze().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return an.makeRotationFromQuaternion(e),this.applyMatrix4(an),this}rotateX(e){return an.makeRotationX(e),this.applyMatrix4(an),this}rotateY(e){return an.makeRotationY(e),this.applyMatrix4(an),this}rotateZ(e){return an.makeRotationZ(e),this.applyMatrix4(an),this}translate(e,t,n){return an.makeTranslation(e,t,n),this.applyMatrix4(an),this}scale(e,t,n){return an.makeScale(e,t,n),this.applyMatrix4(an),this}lookAt(e){return va.lookAt(e),va.updateMatrix(),this.applyMatrix4(va.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(is).negate(),this.translate(is.x,is.y,is.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ui(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Er);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];tn.setFromBufferAttribute(r),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,tn.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,tn.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(tn.min),this.boundingBox.expandByPoint(tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cc);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new W,1/0);return}if(e){const n=this.boundingSphere.center;if(tn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];Hs.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(tn.min,Hs.min),tn.expandByPoint(wt),wt.addVectors(tn.max,Hs.max),tn.expandByPoint(wt)):(tn.expandByPoint(Hs.min),tn.expandByPoint(Hs.max))}tn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)wt.fromBufferAttribute(o,l),c&&(is.fromBufferAttribute(e,l),wt.add(is)),s=Math.max(s,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.array,s=t.position.array,r=t.normal.array,a=t.uv.array,o=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new An(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let b=0;b<o;b++)l[b]=new W,u[b]=new W;const h=new W,d=new W,p=new W,_=new Xe,g=new Xe,m=new Xe,f=new W,y=new W;function v(b,D,L){h.fromArray(s,b*3),d.fromArray(s,D*3),p.fromArray(s,L*3),_.fromArray(a,b*2),g.fromArray(a,D*2),m.fromArray(a,L*2),d.sub(h),p.sub(h),g.sub(_),m.sub(_);const F=1/(g.x*m.y-m.x*g.y);isFinite(F)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-g.y).multiplyScalar(F),y.copy(p).multiplyScalar(g.x).addScaledVector(d,-m.x).multiplyScalar(F),l[b].add(f),l[D].add(f),l[L].add(f),u[b].add(y),u[D].add(y),u[L].add(y))}let A=this.groups;A.length===0&&(A=[{start:0,count:n.length}]);for(let b=0,D=A.length;b<D;++b){const L=A[b],F=L.start,P=L.count;for(let I=F,k=F+P;I<k;I+=3)v(n[I+0],n[I+1],n[I+2])}const S=new W,E=new W,T=new W,C=new W;function x(b){T.fromArray(r,b*3),C.copy(T);const D=l[b];S.copy(D),S.sub(T.multiplyScalar(T.dot(D))).normalize(),E.crossVectors(C,D);const F=E.dot(u[b])<0?-1:1;c[b*4]=S.x,c[b*4+1]=S.y,c[b*4+2]=S.z,c[b*4+3]=F}for(let b=0,D=A.length;b<D;++b){const L=A[b],F=L.start,P=L.count;for(let I=F,k=F+P;I<k;I+=3)x(n[I+0]),x(n[I+1]),x(n[I+2])}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new An(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const s=new W,r=new W,a=new W,o=new W,c=new W,l=new W,u=new W,h=new W;if(e)for(let d=0,p=e.count;d<p;d+=3){const _=e.getX(d+0),g=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,g),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(g,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(o,c){const l=o.array,u=o.itemSize,h=o.normalized,d=new l.constructor(c.length*u);let p=0,_=0;for(let g=0,m=c.length;g<m;g++){o.isInterleavedBufferAttribute?p=c[g]*o.data.stride+o.offset:p=c[g]*u;for(let f=0;f<u;f++)d[_++]=l[p++]}return new An(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Yi,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const d=l[u],p=e(d,n);c.push(p)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,d=l.length;h<d;h++){const p=l[h];u.push(p.toJSON(e.data))}u.length>0&&(s[c]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(t))}const r=e.morphAttributes;for(const l in r){const u=[],h=r[l];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const eu=new xt,yi=new id,Hr=new Cc,tu=new W,ss=new W,rs=new W,os=new W,xa=new W,Wr=new W,qr=new Xe,Xr=new Xe,Yr=new Xe,nu=new W,iu=new W,su=new W,jr=new W,Zr=new W;class Gn extends Ut{constructor(e=new Yi,t=new rd){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Wr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(xa.fromBufferAttribute(h,e),a?Wr.addScaledVector(xa,u):Wr.addScaledVector(xa.sub(t),u))}t.add(Wr)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Hr.copy(n.boundingSphere),Hr.applyMatrix4(r),yi.copy(e.ray).recast(e.near),!(Hr.containsPoint(yi.origin)===!1&&(yi.intersectSphere(Hr,tu)===null||yi.origin.distanceToSquared(tu)>(e.far-e.near)**2))&&(eu.copy(r).invert(),yi.copy(e.ray).applyMatrix4(eu),!(n.boundingBox!==null&&yi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,yi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const m=d[_],f=a[m.materialIndex],y=Math.max(m.start,p.start),v=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let A=y,S=v;A<S;A+=3){const E=o.getX(A),T=o.getX(A+1),C=o.getX(A+2);s=$r(this,f,e,n,l,u,h,E,T,C),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),g=Math.min(o.count,p.start+p.count);for(let m=_,f=g;m<f;m+=3){const y=o.getX(m),v=o.getX(m+1),A=o.getX(m+2);s=$r(this,a,e,n,l,u,h,y,v,A),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,g=d.length;_<g;_++){const m=d[_],f=a[m.materialIndex],y=Math.max(m.start,p.start),v=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let A=y,S=v;A<S;A+=3){const E=A,T=A+1,C=A+2;s=$r(this,f,e,n,l,u,h,E,T,C),s&&(s.faceIndex=Math.floor(A/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const _=Math.max(0,p.start),g=Math.min(c.count,p.start+p.count);for(let m=_,f=g;m<f;m+=3){const y=m,v=m+1,A=m+2;s=$r(this,a,e,n,l,u,h,y,v,A),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function W0(i,e,t,n,s,r,a,o){let c;if(e.side===Kt?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===pi,o),c===null)return null;Zr.copy(o),Zr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Zr);return l<t.near||l>t.far?null:{distance:l,point:Zr.clone(),object:i}}function $r(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ss),i.getVertexPosition(c,rs),i.getVertexPosition(l,os);const u=W0(i,e,t,n,ss,rs,os,jr);if(u){s&&(qr.fromBufferAttribute(s,o),Xr.fromBufferAttribute(s,c),Yr.fromBufferAttribute(s,l),u.uv=gn.getInterpolation(jr,ss,rs,os,qr,Xr,Yr,new Xe)),r&&(qr.fromBufferAttribute(r,o),Xr.fromBufferAttribute(r,c),Yr.fromBufferAttribute(r,l),u.uv1=gn.getInterpolation(jr,ss,rs,os,qr,Xr,Yr,new Xe),u.uv2=u.uv1),a&&(nu.fromBufferAttribute(a,o),iu.fromBufferAttribute(a,c),su.fromBufferAttribute(a,l),u.normal=gn.getInterpolation(jr,ss,rs,os,nu,iu,su,new W),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new W,materialIndex:0};gn.getNormal(ss,rs,os,h.normal),u.face=h}return u}class Fs extends Yi{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let d=0,p=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ui(l,3)),this.setAttribute("normal",new Ui(u,3)),this.setAttribute("uv",new Ui(h,2));function _(g,m,f,y,v,A,S,E,T,C,x){const b=A/T,D=S/C,L=A/2,F=S/2,P=E/2,I=T+1,k=C+1;let O=0,Z=0;const B=new W;for(let q=0;q<k;q++){const j=q*D-F;for(let ie=0;ie<I;ie++){const X=ie*b-L;B[g]=X*y,B[m]=j*v,B[f]=P,l.push(B.x,B.y,B.z),B[g]=0,B[m]=0,B[f]=E>0?1:-1,u.push(B.x,B.y,B.z),h.push(ie/T),h.push(1-q/C),O+=1}}for(let q=0;q<C;q++)for(let j=0;j<T;j++){const ie=d+j+I*q,X=d+j+I*(q+1),K=d+(j+1)+I*(q+1),Q=d+(j+1)+I*q;c.push(ie,X,Q),c.push(X,K,Q),Z+=6}o.addGroup(p,Z,x),p+=Z,d+=O}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Cs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function zt(i){const e={};for(let t=0;t<i.length;t++){const n=Cs(i[t]);for(const s in n)e[s]=n[s]}return e}function q0(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function cd(i){return i.getRenderTarget()===null?i.outputColorSpace:Ke.workingColorSpace}const X0={clone:Cs,merge:zt};var Y0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,j0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Hi extends br{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Y0,this.fragmentShader=j0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Cs(e.uniforms),this.uniformsGroups=q0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class ld extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new xt,this.projectionMatrix=new xt,this.projectionMatrixInverse=new xt,this.coordinateSystem=zn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class vn extends ld{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=hr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Xs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return hr*2*Math.atan(Math.tan(Xs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Xs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const as=-90,cs=1;class Z0 extends Ut{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new vn(as,cs,e,t);s.layers=this.layers,this.add(s);const r=new vn(as,cs,e,t);r.layers=this.layers,this.add(r);const a=new vn(as,cs,e,t);a.layers=this.layers,this.add(a);const o=new vn(as,cs,e,t);o.layers=this.layers,this.add(o);const c=new vn(as,cs,e,t);c.layers=this.layers,this.add(c);const l=new vn(as,cs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===zn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Po)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const g=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=g,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class ud extends Yt{constructor(e,t,n,s,r,a,o,c,l,u){e=e!==void 0?e:[],t=t!==void 0?t:bs,super(e,t,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $0 extends Gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];t.encoding!==void 0&&(js("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),t.colorSpace=t.encoding===Oi?vt:cn),this.texture=new ud(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:At}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Fs(5,5,5),r=new Hi({name:"CubemapFromEquirect",uniforms:Cs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Kt,blending:ai});r.uniforms.tEquirect.value=t;const a=new Gn(s,r),o=t.minFilter;return t.minFilter===lr&&(t.minFilter=At),new Z0(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Sa=new W,K0=new W,J0=new ze;class Ti{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Sa.subVectors(n,t).cross(K0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Sa),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||J0.getNormalMatrix(e),s=this.coplanarPoint(Sa).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Mi=new Cc,Kr=new W;class Pc{constructor(e=new Ti,t=new Ti,n=new Ti,s=new Ti,r=new Ti,a=new Ti){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=zn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],h=s[6],d=s[7],p=s[8],_=s[9],g=s[10],m=s[11],f=s[12],y=s[13],v=s[14],A=s[15];if(n[0].setComponents(c-r,d-l,m-p,A-f).normalize(),n[1].setComponents(c+r,d+l,m+p,A+f).normalize(),n[2].setComponents(c+a,d+u,m+_,A+y).normalize(),n[3].setComponents(c-a,d-u,m-_,A-y).normalize(),n[4].setComponents(c-o,d-h,m-g,A-v).normalize(),t===zn)n[5].setComponents(c+o,d+h,m+g,A+v).normalize();else if(t===Po)n[5].setComponents(o,h,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Mi)}intersectsSprite(e){return Mi.center.set(0,0,0),Mi.radius=.7071067811865476,Mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Mi)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Kr.x=s.normal.x>0?e.max.x:e.min.x,Kr.y=s.normal.y>0?e.max.y:e.min.y,Kr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Kr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function hd(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Q0(i,e){const t=e.isWebGL2,n=new WeakMap;function s(l,u){const h=l.array,d=l.usage,p=h.byteLength,_=i.createBuffer();i.bindBuffer(u,_),i.bufferData(u,h,d),l.onUploadCallback();let g;if(h instanceof Float32Array)g=i.FLOAT;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(t)g=i.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)g=i.SHORT;else if(h instanceof Uint32Array)g=i.UNSIGNED_INT;else if(h instanceof Int32Array)g=i.INT;else if(h instanceof Int8Array)g=i.BYTE;else if(h instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:_,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,u,h){const d=u.array,p=u._updateRange,_=u.updateRanges;if(i.bindBuffer(h,l),p.count===-1&&_.length===0&&i.bufferSubData(h,0,d),_.length!==0){for(let g=0,m=_.length;g<m;g++){const f=_[g];t?i.bufferSubData(h,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):i.bufferSubData(h,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}u.clearUpdateRanges()}p.count!==-1&&(t?i.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):i.bufferSubData(h,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);u&&(i.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);if(h===void 0)n.set(l,s(l,u));else if(h.version<l.version){if(h.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(h.buffer,l,u),h.version=l.version}}return{get:a,remove:o,update:c}}class Dc extends Yi{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,h=e/o,d=t/c,p=[],_=[],g=[],m=[];for(let f=0;f<u;f++){const y=f*d-a;for(let v=0;v<l;v++){const A=v*h-r;_.push(A,-y,0),g.push(0,0,1),m.push(v/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let y=0;y<o;y++){const v=y+l*f,A=y+l*(f+1),S=y+1+l*(f+1),E=y+1+l*f;p.push(v,A,E),p.push(A,S,E)}this.setIndex(p),this.setAttribute("position",new Ui(_,3)),this.setAttribute("normal",new Ui(g,3)),this.setAttribute("uv",new Ui(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Dc(e.width,e.height,e.widthSegments,e.heightSegments)}}var ex=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tx=`#ifdef USE_ALPHAHASH
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
#endif`,nx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ix=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sx=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,rx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ox=`#ifdef USE_AOMAP
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
#endif`,ax=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,cx=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
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
#endif`,lx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,ux=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,dx=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,fx=`#ifdef USE_IRIDESCENCE
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
#endif`,px=`#ifdef USE_BUMPMAP
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
#endif`,mx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
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
#endif`,_x=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,xx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Sx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,yx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Mx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Tx=`#define PI 3.141592653589793
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
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
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
} // validated`,Ex=`#ifdef ENVMAP_TYPE_CUBE_UV
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
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
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
#endif`,bx=`vec3 transformedNormal = objectNormal;
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
#endif`,wx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Ax=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Cx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Rx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Px="gl_FragColor = linearToOutputTexel( gl_FragColor );",Dx=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Lx=`#ifdef USE_ENVMAP
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
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
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
#endif`,Nx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ix=`#ifdef USE_ENVMAP
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
#endif`,Ox=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ux=`#ifdef USE_ENVMAP
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
#endif`,Fx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Bx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Vx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,zx=`#ifdef USE_GRADIENTMAP
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
}`,Gx=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Hx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Wx=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Xx=`uniform bool receiveShadow;
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
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
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
#endif`,Yx=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
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
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
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
#endif`,jx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$x=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Kx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Jx=`PhysicalMaterial material;
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
#endif`,Qx=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
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
}`,eS=`
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
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
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
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
#endif`,tS=`#if defined( RE_IndirectDiffuse )
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
#endif`,nS=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sS=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,oS=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,aS=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cS=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lS=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,uS=`#if defined( USE_POINTS_UV )
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
#endif`,hS=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,dS=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,fS=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pS=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,mS=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,_S=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,gS=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,vS=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SS=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yS=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,MS=`#ifdef USE_NORMALMAP
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
#endif`,TS=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ES=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,bS=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,wS=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,AS=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,CS=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
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
}`,RS=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,PS=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,DS=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,LS=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,NS=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,IS=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,OS=`#if NUM_SPOT_LIGHT_COORDS > 0
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
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
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
		return shadow;
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
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
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
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,US=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
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
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,FS=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,kS=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,BS=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,VS=`#ifdef USE_SKINNING
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
#endif`,zS=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,GS=`#ifdef USE_SKINNING
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
#endif`,HS=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,WS=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qS=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,XS=`#ifndef saturate
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
vec3 OptimizedCineonToneMapping( vec3 color ) {
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,YS=`#ifdef USE_TRANSMISSION
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
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,jS=`#ifdef USE_TRANSMISSION
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
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ZS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,$S=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,KS=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JS=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const QS=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ey=`uniform sampler2D t2D;
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
}`,ty=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ny=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,sy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ry=`#include <common>
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
}`,oy=`#if DEPTH_PACKING == 3200
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
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
	#endif
}`,ay=`#define DISTANCE
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
}`,cy=`#define DISTANCE
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ly=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hy=`uniform float scale;
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
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dy=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fy=`#include <common>
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
}`,py=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,my=`#define LAMBERT
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
}`,_y=`#define LAMBERT
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,gy=`#define MATCAP
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
}`,vy=`#define MATCAP
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,xy=`#define NORMAL
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
}`,Sy=`#define NORMAL
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
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,yy=`#define PHONG
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
}`,My=`#define PHONG
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ty=`#define STANDARD
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
}`,Ey=`#define STANDARD
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,by=`#define TOON
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
}`,wy=`#define TOON
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
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ay=`uniform float size;
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
}`,Cy=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,Ry=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
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
}`,Py=`uniform vec3 color;
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
}`,Dy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
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
}`,Ly=`uniform vec3 diffuse;
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
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
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
}`,ke={alphahash_fragment:ex,alphahash_pars_fragment:tx,alphamap_fragment:nx,alphamap_pars_fragment:ix,alphatest_fragment:sx,alphatest_pars_fragment:rx,aomap_fragment:ox,aomap_pars_fragment:ax,batching_pars_vertex:cx,batching_vertex:lx,begin_vertex:ux,beginnormal_vertex:hx,bsdfs:dx,iridescence_fragment:fx,bumpmap_pars_fragment:px,clipping_planes_fragment:mx,clipping_planes_pars_fragment:_x,clipping_planes_pars_vertex:gx,clipping_planes_vertex:vx,color_fragment:xx,color_pars_fragment:Sx,color_pars_vertex:yx,color_vertex:Mx,common:Tx,cube_uv_reflection_fragment:Ex,defaultnormal_vertex:bx,displacementmap_pars_vertex:wx,displacementmap_vertex:Ax,emissivemap_fragment:Cx,emissivemap_pars_fragment:Rx,colorspace_fragment:Px,colorspace_pars_fragment:Dx,envmap_fragment:Lx,envmap_common_pars_fragment:Nx,envmap_pars_fragment:Ix,envmap_pars_vertex:Ox,envmap_physical_pars_fragment:Yx,envmap_vertex:Ux,fog_vertex:Fx,fog_pars_vertex:kx,fog_fragment:Bx,fog_pars_fragment:Vx,gradientmap_pars_fragment:zx,lightmap_fragment:Gx,lightmap_pars_fragment:Hx,lights_lambert_fragment:Wx,lights_lambert_pars_fragment:qx,lights_pars_begin:Xx,lights_toon_fragment:jx,lights_toon_pars_fragment:Zx,lights_phong_fragment:$x,lights_phong_pars_fragment:Kx,lights_physical_fragment:Jx,lights_physical_pars_fragment:Qx,lights_fragment_begin:eS,lights_fragment_maps:tS,lights_fragment_end:nS,logdepthbuf_fragment:iS,logdepthbuf_pars_fragment:sS,logdepthbuf_pars_vertex:rS,logdepthbuf_vertex:oS,map_fragment:aS,map_pars_fragment:cS,map_particle_fragment:lS,map_particle_pars_fragment:uS,metalnessmap_fragment:hS,metalnessmap_pars_fragment:dS,morphcolor_vertex:fS,morphnormal_vertex:pS,morphtarget_pars_vertex:mS,morphtarget_vertex:_S,normal_fragment_begin:gS,normal_fragment_maps:vS,normal_pars_fragment:xS,normal_pars_vertex:SS,normal_vertex:yS,normalmap_pars_fragment:MS,clearcoat_normal_fragment_begin:TS,clearcoat_normal_fragment_maps:ES,clearcoat_pars_fragment:bS,iridescence_pars_fragment:wS,opaque_fragment:AS,packing:CS,premultiplied_alpha_fragment:RS,project_vertex:PS,dithering_fragment:DS,dithering_pars_fragment:LS,roughnessmap_fragment:NS,roughnessmap_pars_fragment:IS,shadowmap_pars_fragment:OS,shadowmap_pars_vertex:US,shadowmap_vertex:FS,shadowmask_pars_fragment:kS,skinbase_vertex:BS,skinning_pars_vertex:VS,skinning_vertex:zS,skinnormal_vertex:GS,specularmap_fragment:HS,specularmap_pars_fragment:WS,tonemapping_fragment:qS,tonemapping_pars_fragment:XS,transmission_fragment:YS,transmission_pars_fragment:jS,uv_pars_fragment:ZS,uv_pars_vertex:$S,uv_vertex:KS,worldpos_vertex:JS,background_vert:QS,background_frag:ey,backgroundCube_vert:ty,backgroundCube_frag:ny,cube_vert:iy,cube_frag:sy,depth_vert:ry,depth_frag:oy,distanceRGBA_vert:ay,distanceRGBA_frag:cy,equirect_vert:ly,equirect_frag:uy,linedashed_vert:hy,linedashed_frag:dy,meshbasic_vert:fy,meshbasic_frag:py,meshlambert_vert:my,meshlambert_frag:_y,meshmatcap_vert:gy,meshmatcap_frag:vy,meshnormal_vert:xy,meshnormal_frag:Sy,meshphong_vert:yy,meshphong_frag:My,meshphysical_vert:Ty,meshphysical_frag:Ey,meshtoon_vert:by,meshtoon_frag:wy,points_vert:Ay,points_frag:Cy,shadow_vert:Ry,shadow_frag:Py,sprite_vert:Dy,sprite_frag:Ly},he={common:{diffuse:{value:new Ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Ye(16777215)},opacity:{value:1},center:{value:new Xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},wn={basic:{uniforms:zt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:zt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:zt([he.common,he.specularmap,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.fog,he.lights,{emissive:{value:new Ye(0)},specular:{value:new Ye(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:zt([he.common,he.envmap,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.roughnessmap,he.metalnessmap,he.fog,he.lights,{emissive:{value:new Ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:zt([he.common,he.aomap,he.lightmap,he.emissivemap,he.bumpmap,he.normalmap,he.displacementmap,he.gradientmap,he.fog,he.lights,{emissive:{value:new Ye(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:zt([he.common,he.bumpmap,he.normalmap,he.displacementmap,he.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:zt([he.points,he.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:zt([he.common,he.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:zt([he.common,he.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:zt([he.common,he.bumpmap,he.normalmap,he.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:zt([he.sprite,he.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:zt([he.common,he.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:zt([he.lights,he.fog,{color:{value:new Ye(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};wn.physical={uniforms:zt([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Ye(0)},specularColor:{value:new Ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const Jr={r:0,b:0,g:0};function Ny(i,e,t,n,s,r,a){const o=new Ye(0);let c=r===!0?0:1,l,u,h=null,d=0,p=null;function _(m,f){let y=!1,v=f.isScene===!0?f.background:null;v&&v.isTexture&&(v=(f.backgroundBlurriness>0?t:e).get(v)),v===null?g(o,c):v&&v.isColor&&(g(v,1),y=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,a):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil),v&&(v.isCubeTexture||v.mapping===Go)?(u===void 0&&(u=new Gn(new Fs(1,1,1),new Hi({name:"BackgroundCubeMaterial",uniforms:Cs(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(S,E,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),u.material.uniforms.envMap.value=v,u.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,u.material.toneMapped=Ke.getTransfer(v.colorSpace)!==it,(h!==v||d!==v.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=v,d=v.version,p=i.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Gn(new Dc(2,2),new Hi({name:"BackgroundMaterial",uniforms:Cs(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:pi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(v.colorSpace)!==it,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||p!==i.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,p=i.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,f){m.getRGB(Jr,cd(i)),n.buffers.color.setClear(Jr.r,Jr.g,Jr.b,f,a)}return{getClearColor:function(){return o},setClearColor:function(m,f=1){o.set(m),c=f,g(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,g(o,c)},render:_}}function Iy(i,e,t,n){const s=i.getParameter(i.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:e.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=m(null);let l=c,u=!1;function h(P,I,k,O,Z){let B=!1;if(a){const q=g(O,k,I);l!==q&&(l=q,p(l.object)),B=f(P,O,k,Z),B&&y(P,O,k,Z)}else{const q=I.wireframe===!0;(l.geometry!==O.id||l.program!==k.id||l.wireframe!==q)&&(l.geometry=O.id,l.program=k.id,l.wireframe=q,B=!0)}Z!==null&&t.update(Z,i.ELEMENT_ARRAY_BUFFER),(B||u)&&(u=!1,C(P,I,k,O),Z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(Z).buffer))}function d(){return n.isWebGL2?i.createVertexArray():r.createVertexArrayOES()}function p(P){return n.isWebGL2?i.bindVertexArray(P):r.bindVertexArrayOES(P)}function _(P){return n.isWebGL2?i.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function g(P,I,k){const O=k.wireframe===!0;let Z=o[P.id];Z===void 0&&(Z={},o[P.id]=Z);let B=Z[I.id];B===void 0&&(B={},Z[I.id]=B);let q=B[O];return q===void 0&&(q=m(d()),B[O]=q),q}function m(P){const I=[],k=[],O=[];for(let Z=0;Z<s;Z++)I[Z]=0,k[Z]=0,O[Z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:k,attributeDivisors:O,object:P,attributes:{},index:null}}function f(P,I,k,O){const Z=l.attributes,B=I.attributes;let q=0;const j=k.getAttributes();for(const ie in j)if(j[ie].location>=0){const K=Z[ie];let Q=B[ie];if(Q===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(Q=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(Q=P.instanceColor)),K===void 0||K.attribute!==Q||Q&&K.data!==Q.data)return!0;q++}return l.attributesNum!==q||l.index!==O}function y(P,I,k,O){const Z={},B=I.attributes;let q=0;const j=k.getAttributes();for(const ie in j)if(j[ie].location>=0){let K=B[ie];K===void 0&&(ie==="instanceMatrix"&&P.instanceMatrix&&(K=P.instanceMatrix),ie==="instanceColor"&&P.instanceColor&&(K=P.instanceColor));const Q={};Q.attribute=K,K&&K.data&&(Q.data=K.data),Z[ie]=Q,q++}l.attributes=Z,l.attributesNum=q,l.index=O}function v(){const P=l.newAttributes;for(let I=0,k=P.length;I<k;I++)P[I]=0}function A(P){S(P,0)}function S(P,I){const k=l.newAttributes,O=l.enabledAttributes,Z=l.attributeDivisors;k[P]=1,O[P]===0&&(i.enableVertexAttribArray(P),O[P]=1),Z[P]!==I&&((n.isWebGL2?i:e.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,I),Z[P]=I)}function E(){const P=l.newAttributes,I=l.enabledAttributes;for(let k=0,O=I.length;k<O;k++)I[k]!==P[k]&&(i.disableVertexAttribArray(k),I[k]=0)}function T(P,I,k,O,Z,B,q){q===!0?i.vertexAttribIPointer(P,I,k,Z,B):i.vertexAttribPointer(P,I,k,O,Z,B)}function C(P,I,k,O){if(n.isWebGL2===!1&&(P.isInstancedMesh||O.isInstancedBufferGeometry)&&e.get("ANGLE_instanced_arrays")===null)return;v();const Z=O.attributes,B=k.getAttributes(),q=I.defaultAttributeValues;for(const j in B){const ie=B[j];if(ie.location>=0){let X=Z[j];if(X===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(X=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(X=P.instanceColor)),X!==void 0){const K=X.normalized,Q=X.itemSize,ue=t.get(X);if(ue===void 0)continue;const pe=ue.buffer,ee=ue.type,we=ue.bytesPerElement,Te=n.isWebGL2===!0&&(ee===i.INT||ee===i.UNSIGNED_INT||X.gpuType===Hh);if(X.isInterleavedBufferAttribute){const Re=X.data,V=Re.stride,Pt=X.offset;if(Re.isInstancedInterleavedBuffer){for(let Me=0;Me<ie.locationSize;Me++)S(ie.location+Me,Re.meshPerAttribute);P.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let Me=0;Me<ie.locationSize;Me++)A(ie.location+Me);i.bindBuffer(i.ARRAY_BUFFER,pe);for(let Me=0;Me<ie.locationSize;Me++)T(ie.location+Me,Q/ie.locationSize,ee,K,V*we,(Pt+Q/ie.locationSize*Me)*we,Te)}else{if(X.isInstancedBufferAttribute){for(let Re=0;Re<ie.locationSize;Re++)S(ie.location+Re,X.meshPerAttribute);P.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=X.meshPerAttribute*X.count)}else for(let Re=0;Re<ie.locationSize;Re++)A(ie.location+Re);i.bindBuffer(i.ARRAY_BUFFER,pe);for(let Re=0;Re<ie.locationSize;Re++)T(ie.location+Re,Q/ie.locationSize,ee,K,Q*we,Q/ie.locationSize*Re*we,Te)}}else if(q!==void 0){const K=q[j];if(K!==void 0)switch(K.length){case 2:i.vertexAttrib2fv(ie.location,K);break;case 3:i.vertexAttrib3fv(ie.location,K);break;case 4:i.vertexAttrib4fv(ie.location,K);break;default:i.vertexAttrib1fv(ie.location,K)}}}}E()}function x(){L();for(const P in o){const I=o[P];for(const k in I){const O=I[k];for(const Z in O)_(O[Z].object),delete O[Z];delete I[k]}delete o[P]}}function b(P){if(o[P.id]===void 0)return;const I=o[P.id];for(const k in I){const O=I[k];for(const Z in O)_(O[Z].object),delete O[Z];delete I[k]}delete o[P.id]}function D(P){for(const I in o){const k=o[I];if(k[P.id]===void 0)continue;const O=k[P.id];for(const Z in O)_(O[Z].object),delete O[Z];delete k[P.id]}}function L(){F(),u=!0,l!==c&&(l=c,p(l.object))}function F(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:L,resetDefaultState:F,dispose:x,releaseStatesOfGeometry:b,releaseStatesOfProgram:D,initAttributes:v,enableAttribute:A,disableUnusedAttributes:E}}function Oy(i,e,t,n){const s=n.isWebGL2;let r;function a(u){r=u}function o(u,h){i.drawArrays(r,u,h),t.update(h,r,1)}function c(u,h,d){if(d===0)return;let p,_;if(s)p=i,_="drawArraysInstanced";else if(p=e.get("ANGLE_instanced_arrays"),_="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[_](r,u,h,d),t.update(h,r,d)}function l(u,h,d){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let _=0;_<d;_++)this.render(u[_],h[_]);else{p.multiDrawArraysWEBGL(r,u,0,h,0,d);let _=0;for(let g=0;g<d;g++)_+=h[g];t.update(_,r,1)}}this.setMode=a,this.render=o,this.renderInstances=c,this.renderMultiDraw=l}function Uy(i,e,t){let n;function s(){if(n!==void 0)return n;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");n=i.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(T){if(T==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&i.constructor.name==="WebGL2RenderingContext";let o=t.precision!==void 0?t.precision:"highp";const c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||e.has("WEBGL_draw_buffers"),u=t.logarithmicDepthBuffer===!0,h=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),m=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),f=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),v=d>0,A=a||e.has("OES_texture_float"),S=v&&A,E=a?i.getParameter(i.MAX_SAMPLES):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:y,vertexTextures:v,floatFragmentTextures:A,floatVertexTextures:S,maxSamples:E}}function Fy(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Ti,o=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const p=h.length!==0||d||n!==0||s;return s=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){const _=h.clippingPlanes,g=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!s||_===null||_.length===0||r&&!m)r?u(null):l();else{const y=r?0:n,v=y*4;let A=f.clippingState||null;c.value=A,A=u(_,d,v,p);for(let S=0;S!==v;++S)A[S]=t[S];f.clippingState=A,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,_){const g=h!==null?h.length:0;let m=null;if(g!==0){if(m=c.value,_!==!0||m===null){const f=p+g*4,y=d.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let v=0,A=p;v!==g;++v,A+=4)a.copy(h[v]).applyMatrix4(y,o),a.normal.toArray(m,A),m[A+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,m}}function ky(i){let e=new WeakMap;function t(a,o){return o===Ga?a.mapping=bs:o===Ha&&(a.mapping=ws),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===Ga||o===Ha)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new $0(c.height/2);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Lc extends ld{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const ps=4,ru=[.125,.215,.35,.446,.526,.582],Ai=20,ya=new Lc,ou=new Ye;let Ma=null,Ta=0,Ea=0;const Ei=(1+Math.sqrt(5))/2,ls=1/Ei,au=[new W(1,1,1),new W(-1,1,1),new W(1,1,-1),new W(-1,1,-1),new W(0,Ei,ls),new W(0,Ei,-ls),new W(ls,0,Ei),new W(-ls,0,Ei),new W(Ei,ls,0),new W(-Ei,ls,0)];class cu{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Ma=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ma,Ta,Ea),e.scissorTest=!1,Qr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===bs||e.mapping===ws?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ma=this._renderer.getRenderTarget(),Ta=this._renderer.getActiveCubeFace(),Ea=this._renderer.getActiveMipmapLevel();const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:At,minFilter:At,generateMipmaps:!1,type:ur,format:xn,colorSpace:Yn,depthBuffer:!1},s=lu(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=lu(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=By(r)),this._blurMaterial=Vy(r,e,t)}return s}_compileMaterial(e){const t=new Gn(this._lodPlanes[0],e);this._renderer.compile(t,ya)}_sceneToCubeUV(e,t,n,s){const o=new vn(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(ou),u.toneMapping=ci,u.autoClear=!1;const p=new rd({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1}),_=new Gn(new Fs,p);let g=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,g=!0):(p.color.copy(ou),g=!0);for(let f=0;f<6;f++){const y=f%3;y===0?(o.up.set(0,c[f],0),o.lookAt(l[f],0,0)):y===1?(o.up.set(0,0,c[f]),o.lookAt(0,l[f],0)):(o.up.set(0,c[f],0),o.lookAt(0,0,l[f]));const v=this._cubeSize;Qr(s,y*v,f>2?v:0,v,v),u.setRenderTarget(s),g&&u.render(_,o),u.render(e,o)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===bs||e.mapping===ws;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hu()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uu());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new Gn(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Qr(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,ya)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){const r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=au[(s-1)%au.length];this._blur(e,s-1,s,r,a)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Gn(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Ai-1),g=r/_,m=isFinite(r)?1+Math.floor(u*g):Ai;m>Ai&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ai}`);const f=[];let y=0;for(let T=0;T<Ai;++T){const C=T/g,x=Math.exp(-C*C/2);f.push(x),T===0?y+=x:T<m&&(y+=2*x)}for(let T=0;T<f.length;T++)f[T]=f[T]/y;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:v}=this;d.dTheta.value=_,d.mipInt.value=v-n;const A=this._sizeLods[s],S=3*A*(s>v-ps?s-v+ps:0),E=4*(this._cubeSize-A);Qr(t,S,E,3*A,2*A),c.setRenderTarget(t),c.render(h,ya)}}function By(i){const e=[],t=[],n=[];let s=i;const r=i-ps+1+ru.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-ps?c=ru[a-i+ps-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,_=6,g=3,m=2,f=1,y=new Float32Array(g*_*p),v=new Float32Array(m*_*p),A=new Float32Array(f*_*p);for(let E=0;E<p;E++){const T=E%3*2/3-1,C=E>2?0:-1,x=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];y.set(x,g*_*E),v.set(d,m*_*E);const b=[E,E,E,E,E,E];A.set(b,f*_*E)}const S=new Yi;S.setAttribute("position",new An(y,g)),S.setAttribute("uv",new An(v,m)),S.setAttribute("faceIndex",new An(A,f)),e.push(S),s>ps&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function lu(i,e,t){const n=new Gi(i,e,t);return n.texture.mapping=Go,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Qr(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function Vy(i,e,t){const n=new Float32Array(Ai),s=new W(0,1,0);return new Hi({name:"SphericalGaussianBlur",defines:{n:Ai,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function uu(){return new Hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:ai,depthTest:!1,depthWrite:!1})}function hu(){return new Hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ai,depthTest:!1,depthWrite:!1})}function Nc(){return`

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
	`}function zy(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Ga||c===Ha,u=c===bs||c===ws;if(l||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=e.get(o);return t===null&&(t=new cu(i)),h=l?t.fromEquirectangular(o,h):t.fromCubemap(o,h),e.set(o,h),h.texture}else{if(e.has(o))return e.get(o).texture;{const h=o.image;if(l&&h&&h.height>0||u&&h&&s(h)){t===null&&(t=new cu(i));const d=l?t.fromEquirectangular(o):t.fromCubemap(o);return e.set(o,d),o.addEventListener("dispose",r),d.texture}else return null}}}return o}function s(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function Gy(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(n){n.isWebGL2?t("EXT_color_buffer_float"):(t("WEBGL_depth_texture"),t("OES_texture_float"),t("OES_texture_half_float"),t("OES_texture_half_float_linear"),t("OES_standard_derivatives"),t("OES_element_index_uint"),t("OES_vertex_array_object"),t("ANGLE_instanced_arrays")),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture")},get:function(n){const s=t(n);return s===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Hy(i,e,t,n){const s={},r=new WeakMap;function a(h){const d=h.target;d.index!==null&&e.remove(d.index);for(const _ in d.attributes)e.remove(d.attributes[_]);for(const _ in d.morphAttributes){const g=d.morphAttributes[_];for(let m=0,f=g.length;m<f;m++)e.remove(g[m])}d.removeEventListener("dispose",a),delete s[d.id];const p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(h){const d=h.attributes;for(const _ in d)e.update(d[_],i.ARRAY_BUFFER);const p=h.morphAttributes;for(const _ in p){const g=p[_];for(let m=0,f=g.length;m<f;m++)e.update(g[m],i.ARRAY_BUFFER)}}function l(h){const d=[],p=h.index,_=h.attributes.position;let g=0;if(p!==null){const y=p.array;g=p.version;for(let v=0,A=y.length;v<A;v+=3){const S=y[v+0],E=y[v+1],T=y[v+2];d.push(S,E,E,T,T,S)}}else if(_!==void 0){const y=_.array;g=_.version;for(let v=0,A=y.length/3-1;v<A;v+=3){const S=v+0,E=v+1,T=v+2;d.push(S,E,E,T,T,S)}}else return;const m=new(Qh(d)?ad:od)(d,1);m.version=g;const f=r.get(h);f&&e.remove(f),r.set(h,m)}function u(h){const d=r.get(h);if(d){const p=h.index;p!==null&&d.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function Wy(i,e,t,n){const s=n.isWebGL2;let r;function a(p){r=p}let o,c;function l(p){o=p.type,c=p.bytesPerElement}function u(p,_){i.drawElements(r,_,o,p*c),t.update(_,r,1)}function h(p,_,g){if(g===0)return;let m,f;if(s)m=i,f="drawElementsInstanced";else if(m=e.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,_,o,p*c,g),t.update(_,r,g)}function d(p,_,g){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<g;f++)this.render(p[f]/c,_[f]);else{m.multiDrawElementsWEBGL(r,_,0,o,p,0,g);let f=0;for(let y=0;y<g;y++)f+=_[y];t.update(f,r,1)}}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=h,this.renderMultiDraw=d}function qy(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Xy(i,e){return i[0]-e[0]}function Yy(i,e){return Math.abs(e[1])-Math.abs(i[1])}function jy(i,e,t){const n={},s=new Float32Array(8),r=new WeakMap,a=new Ct,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,u,h){const d=l.morphTargetInfluences;if(e.isWebGL2===!0){const p=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=p!==void 0?p.length:0;let g=r.get(u);if(g===void 0||g.count!==_){let P=function(){L.dispose(),r.delete(u),u.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();const y=u.morphAttributes.position!==void 0,v=u.morphAttributes.normal!==void 0,A=u.morphAttributes.color!==void 0,S=u.morphAttributes.position||[],E=u.morphAttributes.normal||[],T=u.morphAttributes.color||[];let C=0;y===!0&&(C=1),v===!0&&(C=2),A===!0&&(C=3);let x=u.attributes.position.count*C,b=1;x>e.maxTextureSize&&(b=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const D=new Float32Array(x*b*4*_),L=new nd(D,x,b,_);L.type=ri,L.needsUpdate=!0;const F=C*4;for(let I=0;I<_;I++){const k=S[I],O=E[I],Z=T[I],B=x*b*4*I;for(let q=0;q<k.count;q++){const j=q*F;y===!0&&(a.fromBufferAttribute(k,q),D[B+j+0]=a.x,D[B+j+1]=a.y,D[B+j+2]=a.z,D[B+j+3]=0),v===!0&&(a.fromBufferAttribute(O,q),D[B+j+4]=a.x,D[B+j+5]=a.y,D[B+j+6]=a.z,D[B+j+7]=0),A===!0&&(a.fromBufferAttribute(Z,q),D[B+j+8]=a.x,D[B+j+9]=a.y,D[B+j+10]=a.z,D[B+j+11]=Z.itemSize===4?a.w:1)}}g={count:_,texture:L,size:new Xe(x,b)},r.set(u,g),u.addEventListener("dispose",P)}let m=0;for(let y=0;y<d.length;y++)m+=d[y];const f=u.morphTargetsRelative?1:1-m;h.getUniforms().setValue(i,"morphTargetBaseInfluence",f),h.getUniforms().setValue(i,"morphTargetInfluences",d),h.getUniforms().setValue(i,"morphTargetsTexture",g.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",g.size)}else{const p=d===void 0?0:d.length;let _=n[u.id];if(_===void 0||_.length!==p){_=[];for(let v=0;v<p;v++)_[v]=[v,0];n[u.id]=_}for(let v=0;v<p;v++){const A=_[v];A[0]=v,A[1]=d[v]}_.sort(Yy);for(let v=0;v<8;v++)v<p&&_[v][1]?(o[v][0]=_[v][0],o[v][1]=_[v][1]):(o[v][0]=Number.MAX_SAFE_INTEGER,o[v][1]=0);o.sort(Xy);const g=u.morphAttributes.position,m=u.morphAttributes.normal;let f=0;for(let v=0;v<8;v++){const A=o[v],S=A[0],E=A[1];S!==Number.MAX_SAFE_INTEGER&&E?(g&&u.getAttribute("morphTarget"+v)!==g[S]&&u.setAttribute("morphTarget"+v,g[S]),m&&u.getAttribute("morphNormal"+v)!==m[S]&&u.setAttribute("morphNormal"+v,m[S]),s[v]=E,f+=E):(g&&u.hasAttribute("morphTarget"+v)===!0&&u.deleteAttribute("morphTarget"+v),m&&u.hasAttribute("morphNormal"+v)===!0&&u.deleteAttribute("morphNormal"+v),s[v]=0)}const y=u.morphTargetsRelative?1:1-f;h.getUniforms().setValue(i,"morphTargetBaseInfluence",y),h.getUniforms().setValue(i,"morphTargetInfluences",s)}}return{update:c}}function Zy(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=e.get(c,u);if(s.get(h)!==l&&(e.update(h),s.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return h}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class dd extends Yt{constructor(e,t,n,s,r,a,o,c,l,u){if(u=u!==void 0?u:Ii,u!==Ii&&u!==As)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ii&&(n=si),n===void 0&&u===As&&(n=Ni),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Gt,this.minFilter=c!==void 0?c:Gt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const fd=new Yt,pd=new dd(1,1);pd.compareFunction=Jh;const md=new nd,_d=new N0,gd=new ud,du=[],fu=[],pu=new Float32Array(16),mu=new Float32Array(9),_u=new Float32Array(4);function ks(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=du[s];if(r===void 0&&(r=new Float32Array(s),du[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Tt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function qo(i,e){let t=fu[e];t===void 0&&(t=new Int32Array(e),fu[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function $y(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Ky(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),Tt(t,e)}}function Jy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),Tt(t,e)}}function Qy(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),Tt(t,e)}}function eM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Tt(t,e)}else{if(Mt(t,n))return;_u.set(n),i.uniformMatrix2fv(this.addr,!1,_u),Tt(t,n)}}function tM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Tt(t,e)}else{if(Mt(t,n))return;mu.set(n),i.uniformMatrix3fv(this.addr,!1,mu),Tt(t,n)}}function nM(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Tt(t,e)}else{if(Mt(t,n))return;pu.set(n),i.uniformMatrix4fv(this.addr,!1,pu),Tt(t,n)}}function iM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function sM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),Tt(t,e)}}function rM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),Tt(t,e)}}function oM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),Tt(t,e)}}function aM(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function cM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),Tt(t,e)}}function lM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),Tt(t,e)}}function uM(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),Tt(t,e)}}function hM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);const r=this.type===i.SAMPLER_2D_SHADOW?pd:fd;t.setTexture2D(e||r,s)}function dM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||_d,s)}function fM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||gd,s)}function pM(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||md,s)}function mM(i){switch(i){case 5126:return $y;case 35664:return Ky;case 35665:return Jy;case 35666:return Qy;case 35674:return eM;case 35675:return tM;case 35676:return nM;case 5124:case 35670:return iM;case 35667:case 35671:return sM;case 35668:case 35672:return rM;case 35669:case 35673:return oM;case 5125:return aM;case 36294:return cM;case 36295:return lM;case 36296:return uM;case 35678:case 36198:case 36298:case 36306:case 35682:return hM;case 35679:case 36299:case 36307:return dM;case 35680:case 36300:case 36308:case 36293:return fM;case 36289:case 36303:case 36311:case 36292:return pM}}function _M(i,e){i.uniform1fv(this.addr,e)}function gM(i,e){const t=ks(e,this.size,2);i.uniform2fv(this.addr,t)}function vM(i,e){const t=ks(e,this.size,3);i.uniform3fv(this.addr,t)}function xM(i,e){const t=ks(e,this.size,4);i.uniform4fv(this.addr,t)}function SM(i,e){const t=ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function yM(i,e){const t=ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function MM(i,e){const t=ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function TM(i,e){i.uniform1iv(this.addr,e)}function EM(i,e){i.uniform2iv(this.addr,e)}function bM(i,e){i.uniform3iv(this.addr,e)}function wM(i,e){i.uniform4iv(this.addr,e)}function AM(i,e){i.uniform1uiv(this.addr,e)}function CM(i,e){i.uniform2uiv(this.addr,e)}function RM(i,e){i.uniform3uiv(this.addr,e)}function PM(i,e){i.uniform4uiv(this.addr,e)}function DM(i,e,t){const n=this.cache,s=e.length,r=qo(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||fd,r[a])}function LM(i,e,t){const n=this.cache,s=e.length,r=qo(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||_d,r[a])}function NM(i,e,t){const n=this.cache,s=e.length,r=qo(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||gd,r[a])}function IM(i,e,t){const n=this.cache,s=e.length,r=qo(t,s);Mt(n,r)||(i.uniform1iv(this.addr,r),Tt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||md,r[a])}function OM(i){switch(i){case 5126:return _M;case 35664:return gM;case 35665:return vM;case 35666:return xM;case 35674:return SM;case 35675:return yM;case 35676:return MM;case 5124:case 35670:return TM;case 35667:case 35671:return EM;case 35668:case 35672:return bM;case 35669:case 35673:return wM;case 5125:return AM;case 36294:return CM;case 36295:return RM;case 36296:return PM;case 35678:case 36198:case 36298:case 36306:case 35682:return DM;case 35679:case 36299:case 36307:return LM;case 35680:case 36300:case 36308:case 36293:return NM;case 36289:case 36303:case 36311:case 36292:return IM}}class UM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=mM(t.type)}}class FM{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=OM(t.type)}}class kM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const ba=/(\w+)(\])?(\[|\.)?/g;function gu(i,e){i.seq.push(e),i.map[e.id]=e}function BM(i,e,t){const n=i.name,s=n.length;for(ba.lastIndex=0;;){const r=ba.exec(n),a=ba.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){gu(t,l===void 0?new UM(o,i,e):new FM(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new kM(o),gu(t,h)),t=h}}}class io{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);BM(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function vu(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const VM=37297;let zM=0;function GM(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function HM(i){const e=Ke.getPrimaries(Ke.workingColorSpace),t=Ke.getPrimaries(i);let n;switch(e===t?n="":e===Ro&&t===Co?n="LinearDisplayP3ToLinearSRGB":e===Co&&t===Ro&&(n="LinearSRGBToLinearDisplayP3"),i){case Yn:case Ho:return[n,"LinearTransferOETF"];case vt:case wc:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function xu(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+GM(i.getShaderSource(e),a)}else return s}function WM(i,e){const t=HM(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function qM(i,e){let t;switch(e){case Wv:t="Linear";break;case qv:t="Reinhard";break;case Xv:t="OptimizedCineon";break;case Yv:t="ACESFilmic";break;case jv:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function XM(i){return[i.extensionDerivatives||i.envMapCubeUVHeight||i.bumpMap||i.normalMapTangentSpace||i.clearcoatNormalMap||i.flatShading||i.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(i.extensionFragDepth||i.logarithmicDepthBuffer)&&i.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",i.extensionDrawBuffers&&i.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(i.extensionShaderTextureLOD||i.envMap||i.transmission)&&i.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ws).join(`
`)}function YM(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function jM(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function Ws(i){return i!==""}function Su(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function yu(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ZM=/^[ \t]*#include +<([\w\d./]+)>/gm;function ja(i){return i.replace(ZM,KM)}const $M=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function KM(i,e){let t=ke[e];if(t===void 0){const n=$M.get(e);if(n!==void 0)t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ja(t)}const JM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mu(i){return i.replace(JM,QM)}function QM(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Tu(i){let e="precision "+i.precision+` float;
precision `+i.precision+" int;";return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function eT(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Vh?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===vv?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===kn&&(e="SHADOWMAP_TYPE_VSM"),e}function tT(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case bs:case ws:e="ENVMAP_TYPE_CUBE";break;case Go:e="ENVMAP_TYPE_CUBE_UV";break}return e}function nT(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case ws:e="ENVMAP_MODE_REFRACTION";break}return e}function iT(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case zh:e="ENVMAP_BLENDING_MULTIPLY";break;case Gv:e="ENVMAP_BLENDING_MIX";break;case Hv:e="ENVMAP_BLENDING_ADD";break}return e}function sT(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function rT(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=eT(t),l=tT(t),u=nT(t),h=iT(t),d=sT(t),p=t.isWebGL2?"":XM(t),_=YM(r),g=s.createProgram();let m,f,y=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ws).join(`
`),m.length>0&&(m+=`
`),f=[p,"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(Ws).join(`
`),f.length>0&&(f+=`
`)):(m=[Tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.batching?"#define USE_BATCHING":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors&&t.isWebGL2?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0&&t.isWebGL2?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ws).join(`
`),f=[p,Tu(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.useLegacyLights?"#define LEGACY_LIGHTS":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.logarithmicDepthBuffer&&t.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ci?"#define TONE_MAPPING":"",t.toneMapping!==ci?ke.tonemapping_pars_fragment:"",t.toneMapping!==ci?qM("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,WM("linearToOutputTexel",t.outputColorSpace),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ws).join(`
`)),a=ja(a),a=Su(a,t),a=yu(a,t),o=ja(o),o=Su(o,t),o=yu(o,t),a=Mu(a),o=Mu(o),t.isWebGL2&&t.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["precision mediump sampler2DArray;","#define varying in",t.glslVersion===zl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===zl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=y+m+a,A=y+f+o,S=vu(s,s.VERTEX_SHADER,v),E=vu(s,s.FRAGMENT_SHADER,A);s.attachShader(g,S),s.attachShader(g,E),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function T(D){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(g).trim(),F=s.getShaderInfoLog(S).trim(),P=s.getShaderInfoLog(E).trim();let I=!0,k=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(I=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,g,S,E);else{const O=xu(s,S,"vertex"),Z=xu(s,E,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Program Info Log: `+L+`
`+O+`
`+Z)}else L!==""?console.warn("THREE.WebGLProgram: Program Info Log:",L):(F===""||P==="")&&(k=!1);k&&(D.diagnostics={runnable:I,programLog:L,vertexShader:{log:F,prefix:m},fragmentShader:{log:P,prefix:f}})}s.deleteShader(S),s.deleteShader(E),C=new io(s,g),x=jM(s,g)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let x;this.getAttributes=function(){return x===void 0&&T(this),x};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(g,VM)),b},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=zM++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=E,this}let oT=0;class aT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new cT(e),t.set(e,n)),n}}class cT{constructor(e){this.id=oT++,this.code=e,this.usedTimes=0}}function lT(i,e,t,n,s,r,a){const o=new Rc,c=new aT,l=[],u=s.isWebGL2,h=s.logarithmicDepthBuffer,d=s.vertexTextures;let p=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return x===0?"uv":`uv${x}`}function m(x,b,D,L,F){const P=L.fog,I=F.geometry,k=x.isMeshStandardMaterial?L.environment:null,O=(x.isMeshStandardMaterial?t:e).get(x.envMap||k),Z=O&&O.mapping===Go?O.image.height:null,B=_[x.type];x.precision!==null&&(p=s.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const q=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,j=q!==void 0?q.length:0;let ie=0;I.morphAttributes.position!==void 0&&(ie=1),I.morphAttributes.normal!==void 0&&(ie=2),I.morphAttributes.color!==void 0&&(ie=3);let X,K,Q,ue;if(B){const kt=wn[B];X=kt.vertexShader,K=kt.fragmentShader}else X=x.vertexShader,K=x.fragmentShader,c.update(x),Q=c.getVertexShaderID(x),ue=c.getFragmentShaderID(x);const pe=i.getRenderTarget(),ee=F.isInstancedMesh===!0,we=F.isBatchedMesh===!0,Te=!!x.map,Re=!!x.matcap,V=!!O,Pt=!!x.aoMap,Me=!!x.lightMap,J=!!x.bumpMap,te=!!x.normalMap,Ie=!!x.displacementMap,xe=!!x.emissiveMap,fe=!!x.metalnessMap,Ee=!!x.roughnessMap,Ze=x.anisotropy>0,et=x.clearcoat>0,R=x.iridescence>0,M=x.sheen>0,z=x.transmission>0,se=Ze&&!!x.anisotropyMap,ne=et&&!!x.clearcoatMap,ae=et&&!!x.clearcoatNormalMap,Se=et&&!!x.clearcoatRoughnessMap,le=R&&!!x.iridescenceMap,me=R&&!!x.iridescenceThicknessMap,De=M&&!!x.sheenColorMap,je=M&&!!x.sheenRoughnessMap,oe=!!x.specularMap,$e=!!x.specularColorMap,Oe=!!x.specularIntensityMap,Le=z&&!!x.transmissionMap,be=z&&!!x.thicknessMap,ve=!!x.gradientMap,He=!!x.alphaMap,N=x.alphaTest>0,_e=!!x.alphaHash,re=!!x.extensions,$=!!I.attributes.uv1,ce=!!I.attributes.uv2,Ce=!!I.attributes.uv3;let qe=ci;return x.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(qe=i.toneMapping),{isWebGL2:u,shaderID:B,shaderType:x.type,shaderName:x.name,vertexShader:X,fragmentShader:K,defines:x.defines,customVertexShaderID:Q,customFragmentShaderID:ue,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,batching:we,instancing:ee,instancingColor:ee&&F.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:pe===null?i.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:Yn,map:Te,matcap:Re,envMap:V,envMapMode:V&&O.mapping,envMapCubeUVHeight:Z,aoMap:Pt,lightMap:Me,bumpMap:J,normalMap:te,displacementMap:d&&Ie,emissiveMap:xe,normalMapObjectSpace:te&&x.normalMapType===o0,normalMapTangentSpace:te&&x.normalMapType===Kh,metalnessMap:fe,roughnessMap:Ee,anisotropy:Ze,anisotropyMap:se,clearcoat:et,clearcoatMap:ne,clearcoatNormalMap:ae,clearcoatRoughnessMap:Se,iridescence:R,iridescenceMap:le,iridescenceThicknessMap:me,sheen:M,sheenColorMap:De,sheenRoughnessMap:je,specularMap:oe,specularColorMap:$e,specularIntensityMap:Oe,transmission:z,transmissionMap:Le,thicknessMap:be,gradientMap:ve,opaque:x.transparent===!1&&x.blending===_s,alphaMap:He,alphaTest:N,alphaHash:_e,combine:x.combine,mapUv:Te&&g(x.map.channel),aoMapUv:Pt&&g(x.aoMap.channel),lightMapUv:Me&&g(x.lightMap.channel),bumpMapUv:J&&g(x.bumpMap.channel),normalMapUv:te&&g(x.normalMap.channel),displacementMapUv:Ie&&g(x.displacementMap.channel),emissiveMapUv:xe&&g(x.emissiveMap.channel),metalnessMapUv:fe&&g(x.metalnessMap.channel),roughnessMapUv:Ee&&g(x.roughnessMap.channel),anisotropyMapUv:se&&g(x.anisotropyMap.channel),clearcoatMapUv:ne&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:ae&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:le&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:me&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:De&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:je&&g(x.sheenRoughnessMap.channel),specularMapUv:oe&&g(x.specularMap.channel),specularColorMapUv:$e&&g(x.specularColorMap.channel),specularIntensityMapUv:Oe&&g(x.specularIntensityMap.channel),transmissionMapUv:Le&&g(x.transmissionMap.channel),thicknessMapUv:be&&g(x.thicknessMap.channel),alphaMapUv:He&&g(x.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(te||Ze),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:$,vertexUv2s:ce,vertexUv3s:Ce,pointsUvs:F.isPoints===!0&&!!I.attributes.uv&&(Te||He),fog:!!P,useFog:x.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:F.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:j,morphTextureStride:ie,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:qe,useLegacyLights:i._useLegacyLights,decodeVideoTexture:Te&&x.map.isVideoTexture===!0&&Ke.getTransfer(x.map.colorSpace)===it,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Vn,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:re&&x.extensions.derivatives===!0,extensionFragDepth:re&&x.extensions.fragDepth===!0,extensionDrawBuffers:re&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:re&&x.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()}}function f(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)b.push(D),b.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(y(b,x),v(b,x),b.push(i.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function y(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function v(x,b){o.disableAll(),b.isWebGL2&&o.enable(0),b.supportsVertexTextures&&o.enable(1),b.instancing&&o.enable(2),b.instancingColor&&o.enable(3),b.matcap&&o.enable(4),b.envMap&&o.enable(5),b.normalMapObjectSpace&&o.enable(6),b.normalMapTangentSpace&&o.enable(7),b.clearcoat&&o.enable(8),b.iridescence&&o.enable(9),b.alphaTest&&o.enable(10),b.vertexColors&&o.enable(11),b.vertexAlphas&&o.enable(12),b.vertexUv1s&&o.enable(13),b.vertexUv2s&&o.enable(14),b.vertexUv3s&&o.enable(15),b.vertexTangents&&o.enable(16),b.anisotropy&&o.enable(17),b.alphaHash&&o.enable(18),b.batching&&o.enable(19),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.skinning&&o.enable(4),b.morphTargets&&o.enable(5),b.morphNormals&&o.enable(6),b.morphColors&&o.enable(7),b.premultipliedAlpha&&o.enable(8),b.shadowMapEnabled&&o.enable(9),b.useLegacyLights&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),x.push(o.mask)}function A(x){const b=_[x.type];let D;if(b){const L=wn[b];D=X0.clone(L.uniforms)}else D=x.uniforms;return D}function S(x,b){let D;for(let L=0,F=l.length;L<F;L++){const P=l[L];if(P.cacheKey===b){D=P,++D.usedTimes;break}}return D===void 0&&(D=new rT(i,b,x,r),l.push(D)),D}function E(x){if(--x.usedTimes===0){const b=l.indexOf(x);l[b]=l[l.length-1],l.pop(),x.destroy()}}function T(x){c.remove(x)}function C(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:A,acquireProgram:S,releaseProgram:E,releaseShaderCache:T,programs:l,dispose:C}}function uT(){let i=new WeakMap;function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function t(r){i.delete(r)}function n(r,a,o){i.get(r)[a]=o}function s(){i=new WeakMap}return{get:e,remove:t,update:n,dispose:s}}function hT(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Eu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bu(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,p,_,g,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:_,renderOrder:h.renderOrder,z:g,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=_,f.renderOrder=h.renderOrder,f.z=g,f.group=m),e++,f}function o(h,d,p,_,g,m){const f=a(h,d,p,_,g,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function c(h,d,p,_,g,m){const f=a(h,d,p,_,g,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function l(h,d){t.length>1&&t.sort(h||hT),n.length>1&&n.sort(d||Eu),s.length>1&&s.sort(d||Eu)}function u(){for(let h=e,d=i.length;h<d;h++){const p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function dT(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new bu,i.set(n,[a])):s>=r.length?(a=new bu,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function fT(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new W,color:new Ye};break;case"SpotLight":t={position:new W,direction:new W,color:new Ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Ye,groundColor:new Ye};break;case"RectAreaLight":t={color:new Ye,position:new W,halfWidth:new W,halfHeight:new W};break}return i[e.id]=t,t}}}function pT(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"SpotLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe};break;case"PointLight":t={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let mT=0;function _T(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function gT(i,e){const t=new fT,n=pT(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)s.probe.push(new W);const r=new W,a=new xt,o=new xt;function c(u,h){let d=0,p=0,_=0;for(let L=0;L<9;L++)s.probe[L].set(0,0,0);let g=0,m=0,f=0,y=0,v=0,A=0,S=0,E=0,T=0,C=0,x=0;u.sort(_T);const b=h===!0?Math.PI:1;for(let L=0,F=u.length;L<F;L++){const P=u[L],I=P.color,k=P.intensity,O=P.distance,Z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=I.r*k*b,p+=I.g*k*b,_+=I.b*k*b;else if(P.isLightProbe){for(let B=0;B<9;B++)s.probe[B].addScaledVector(P.sh.coefficients[B],k);x++}else if(P.isDirectionalLight){const B=t.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity*b),P.castShadow){const q=P.shadow,j=n.get(P);j.shadowBias=q.bias,j.shadowNormalBias=q.normalBias,j.shadowRadius=q.radius,j.shadowMapSize=q.mapSize,s.directionalShadow[g]=j,s.directionalShadowMap[g]=Z,s.directionalShadowMatrix[g]=P.shadow.matrix,A++}s.directional[g]=B,g++}else if(P.isSpotLight){const B=t.get(P);B.position.setFromMatrixPosition(P.matrixWorld),B.color.copy(I).multiplyScalar(k*b),B.distance=O,B.coneCos=Math.cos(P.angle),B.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),B.decay=P.decay,s.spot[f]=B;const q=P.shadow;if(P.map&&(s.spotLightMap[T]=P.map,T++,q.updateMatrices(P),P.castShadow&&C++),s.spotLightMatrix[f]=q.matrix,P.castShadow){const j=n.get(P);j.shadowBias=q.bias,j.shadowNormalBias=q.normalBias,j.shadowRadius=q.radius,j.shadowMapSize=q.mapSize,s.spotShadow[f]=j,s.spotShadowMap[f]=Z,E++}f++}else if(P.isRectAreaLight){const B=t.get(P);B.color.copy(I).multiplyScalar(k),B.halfWidth.set(P.width*.5,0,0),B.halfHeight.set(0,P.height*.5,0),s.rectArea[y]=B,y++}else if(P.isPointLight){const B=t.get(P);if(B.color.copy(P.color).multiplyScalar(P.intensity*b),B.distance=P.distance,B.decay=P.decay,P.castShadow){const q=P.shadow,j=n.get(P);j.shadowBias=q.bias,j.shadowNormalBias=q.normalBias,j.shadowRadius=q.radius,j.shadowMapSize=q.mapSize,j.shadowCameraNear=q.camera.near,j.shadowCameraFar=q.camera.far,s.pointShadow[m]=j,s.pointShadowMap[m]=Z,s.pointShadowMatrix[m]=P.shadow.matrix,S++}s.point[m]=B,m++}else if(P.isHemisphereLight){const B=t.get(P);B.skyColor.copy(P.color).multiplyScalar(k*b),B.groundColor.copy(P.groundColor).multiplyScalar(k*b),s.hemi[v]=B,v++}}y>0&&(e.isWebGL2||i.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=he.LTC_FLOAT_1,s.rectAreaLTC2=he.LTC_FLOAT_2):i.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=he.LTC_HALF_1,s.rectAreaLTC2=he.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=p,s.ambient[2]=_;const D=s.hash;(D.directionalLength!==g||D.pointLength!==m||D.spotLength!==f||D.rectAreaLength!==y||D.hemiLength!==v||D.numDirectionalShadows!==A||D.numPointShadows!==S||D.numSpotShadows!==E||D.numSpotMaps!==T||D.numLightProbes!==x)&&(s.directional.length=g,s.spot.length=f,s.rectArea.length=y,s.point.length=m,s.hemi.length=v,s.directionalShadow.length=A,s.directionalShadowMap.length=A,s.pointShadow.length=S,s.pointShadowMap.length=S,s.spotShadow.length=E,s.spotShadowMap.length=E,s.directionalShadowMatrix.length=A,s.pointShadowMatrix.length=S,s.spotLightMatrix.length=E+T-C,s.spotLightMap.length=T,s.numSpotLightShadowsWithMaps=C,s.numLightProbes=x,D.directionalLength=g,D.pointLength=m,D.spotLength=f,D.rectAreaLength=y,D.hemiLength=v,D.numDirectionalShadows=A,D.numPointShadows=S,D.numSpotShadows=E,D.numSpotMaps=T,D.numLightProbes=x,s.version=mT++)}function l(u,h){let d=0,p=0,_=0,g=0,m=0;const f=h.matrixWorldInverse;for(let y=0,v=u.length;y<v;y++){const A=u[y];if(A.isDirectionalLight){const S=s.directional[d];S.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(f),d++}else if(A.isSpotLight){const S=s.spot[_];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(f),S.direction.setFromMatrixPosition(A.matrixWorld),r.setFromMatrixPosition(A.target.matrixWorld),S.direction.sub(r),S.direction.transformDirection(f),_++}else if(A.isRectAreaLight){const S=s.rectArea[g];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(f),o.identity(),a.copy(A.matrixWorld),a.premultiply(f),o.extractRotation(a),S.halfWidth.set(A.width*.5,0,0),S.halfHeight.set(0,A.height*.5,0),S.halfWidth.applyMatrix4(o),S.halfHeight.applyMatrix4(o),g++}else if(A.isPointLight){const S=s.point[p];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(f),p++}else if(A.isHemisphereLight){const S=s.hemi[m];S.direction.setFromMatrixPosition(A.matrixWorld),S.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:s}}function wu(i,e){const t=new gT(i,e),n=[],s=[];function r(){n.length=0,s.length=0}function a(h){n.push(h)}function o(h){s.push(h)}function c(h){t.setup(n,h)}function l(h){t.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:s,lights:t},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function vT(i,e){let t=new WeakMap;function n(r,a=0){const o=t.get(r);let c;return o===void 0?(c=new wu(i,e),t.set(r,[c])):a>=o.length?(c=new wu(i,e),o.push(c)):c=o[a],c}function s(){t=new WeakMap}return{get:n,dispose:s}}class xT extends br{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=s0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class ST extends br{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const yT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,MT=`uniform sampler2D shadow_pass;
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
}`;function TT(i,e,t){let n=new Pc;const s=new Xe,r=new Xe,a=new Ct,o=new xT({depthPacking:r0}),c=new ST,l={},u=t.maxTextureSize,h={[pi]:Kt,[Kt]:pi,[Vn]:Vn},d=new Hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xe},radius:{value:4}},vertexShader:yT,fragmentShader:MT}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const _=new Yi;_.setAttribute("position",new An(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new Gn(_,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vh;let f=this.type;this.render=function(S,E,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const C=i.getRenderTarget(),x=i.getActiveCubeFace(),b=i.getActiveMipmapLevel(),D=i.state;D.setBlending(ai),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const L=f!==kn&&this.type===kn,F=f===kn&&this.type!==kn;for(let P=0,I=S.length;P<I;P++){const k=S[P],O=k.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",k,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);const Z=O.getFrameExtents();if(s.multiply(Z),r.copy(O.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Z.x),s.x=r.x*Z.x,O.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Z.y),s.y=r.y*Z.y,O.mapSize.y=r.y)),O.map===null||L===!0||F===!0){const q=this.type!==kn?{minFilter:Gt,magFilter:Gt}:{};O.map!==null&&O.map.dispose(),O.map=new Gi(s.x,s.y,q),O.map.texture.name=k.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();const B=O.getViewportCount();for(let q=0;q<B;q++){const j=O.getViewport(q);a.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),D.viewport(a),O.updateMatrices(k,q),n=O.getFrustum(),A(E,T,O.camera,k,this.type)}O.isPointLightShadow!==!0&&this.type===kn&&y(O,T),O.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(C,x,b)};function y(S,E){const T=e.update(g);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Gi(s.x,s.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,i.setRenderTarget(S.mapPass),i.clear(),i.renderBufferDirect(E,null,T,d,g,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,i.setRenderTarget(S.map),i.clear(),i.renderBufferDirect(E,null,T,p,g,null)}function v(S,E,T,C){let x=null;const b=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(b!==void 0)x=b;else if(x=T.isPointLight===!0?c:o,i.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0){const D=x.uuid,L=E.uuid;let F=l[D];F===void 0&&(F={},l[D]=F);let P=F[L];P===void 0&&(P=x.clone(),F[L]=P),x=P}if(x.visible=E.visible,x.wireframe=E.wireframe,C===kn?x.side=E.shadowSide!==null?E.shadowSide:E.side:x.side=E.shadowSide!==null?E.shadowSide:h[E.side],x.alphaMap=E.alphaMap,x.alphaTest=E.alphaTest,x.map=E.map,x.clipShadows=E.clipShadows,x.clippingPlanes=E.clippingPlanes,x.clipIntersection=E.clipIntersection,x.displacementMap=E.displacementMap,x.displacementScale=E.displacementScale,x.displacementBias=E.displacementBias,x.wireframeLinewidth=E.wireframeLinewidth,x.linewidth=E.linewidth,T.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const D=i.properties.get(x);D.light=T}return x}function A(S,E,T,C,x){if(S.visible===!1)return;if(S.layers.test(E.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&x===kn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);const L=e.update(S),F=S.material;if(Array.isArray(F)){const P=L.groups;for(let I=0,k=P.length;I<k;I++){const O=P[I],Z=F[O.materialIndex];if(Z&&Z.visible){const B=v(S,Z,C,x);S.onBeforeShadow(i,S,E,T,L,B,O),i.renderBufferDirect(T,null,L,B,S,O),S.onAfterShadow(i,S,E,T,L,B,O)}}}else if(F.visible){const P=v(S,F,C,x);S.onBeforeShadow(i,S,E,T,L,P,null),i.renderBufferDirect(T,null,L,P,S,null),S.onAfterShadow(i,S,E,T,L,P,null)}}const D=S.children;for(let L=0,F=D.length;L<F;L++)A(D[L],E,T,C,x)}}function ET(i,e,t){const n=t.isWebGL2;function s(){let N=!1;const _e=new Ct;let re=null;const $=new Ct(0,0,0,0);return{setMask:function(ce){re!==ce&&!N&&(i.colorMask(ce,ce,ce,ce),re=ce)},setLocked:function(ce){N=ce},setClear:function(ce,Ce,qe,Et,kt){kt===!0&&(ce*=Et,Ce*=Et,qe*=Et),_e.set(ce,Ce,qe,Et),$.equals(_e)===!1&&(i.clearColor(ce,Ce,qe,Et),$.copy(_e))},reset:function(){N=!1,re=null,$.set(-1,0,0,0)}}}function r(){let N=!1,_e=null,re=null,$=null;return{setTest:function(ce){ce?we(i.DEPTH_TEST):Te(i.DEPTH_TEST)},setMask:function(ce){_e!==ce&&!N&&(i.depthMask(ce),_e=ce)},setFunc:function(ce){if(re!==ce){switch(ce){case Ov:i.depthFunc(i.NEVER);break;case Uv:i.depthFunc(i.ALWAYS);break;case Fv:i.depthFunc(i.LESS);break;case wo:i.depthFunc(i.LEQUAL);break;case kv:i.depthFunc(i.EQUAL);break;case Bv:i.depthFunc(i.GEQUAL);break;case Vv:i.depthFunc(i.GREATER);break;case zv:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}re=ce}},setLocked:function(ce){N=ce},setClear:function(ce){$!==ce&&(i.clearDepth(ce),$=ce)},reset:function(){N=!1,_e=null,re=null,$=null}}}function a(){let N=!1,_e=null,re=null,$=null,ce=null,Ce=null,qe=null,Et=null,kt=null;return{setTest:function(tt){N||(tt?we(i.STENCIL_TEST):Te(i.STENCIL_TEST))},setMask:function(tt){_e!==tt&&!N&&(i.stencilMask(tt),_e=tt)},setFunc:function(tt,Bt,bn){(re!==tt||$!==Bt||ce!==bn)&&(i.stencilFunc(tt,Bt,bn),re=tt,$=Bt,ce=bn)},setOp:function(tt,Bt,bn){(Ce!==tt||qe!==Bt||Et!==bn)&&(i.stencilOp(tt,Bt,bn),Ce=tt,qe=Bt,Et=bn)},setLocked:function(tt){N=tt},setClear:function(tt){kt!==tt&&(i.clearStencil(tt),kt=tt)},reset:function(){N=!1,_e=null,re=null,$=null,ce=null,Ce=null,qe=null,Et=null,kt=null}}}const o=new s,c=new r,l=new a,u=new WeakMap,h=new WeakMap;let d={},p={},_=new WeakMap,g=[],m=null,f=!1,y=null,v=null,A=null,S=null,E=null,T=null,C=null,x=new Ye(0,0,0),b=0,D=!1,L=null,F=null,P=null,I=null,k=null;const O=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Z=!1,B=0;const q=i.getParameter(i.VERSION);q.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(q)[1]),Z=B>=1):q.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),Z=B>=2);let j=null,ie={};const X=i.getParameter(i.SCISSOR_BOX),K=i.getParameter(i.VIEWPORT),Q=new Ct().fromArray(X),ue=new Ct().fromArray(K);function pe(N,_e,re,$){const ce=new Uint8Array(4),Ce=i.createTexture();i.bindTexture(N,Ce),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let qe=0;qe<re;qe++)n&&(N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY)?i.texImage3D(_e,0,i.RGBA,1,1,$,0,i.RGBA,i.UNSIGNED_BYTE,ce):i.texImage2D(_e+qe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ce);return Ce}const ee={};ee[i.TEXTURE_2D]=pe(i.TEXTURE_2D,i.TEXTURE_2D,1),ee[i.TEXTURE_CUBE_MAP]=pe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ee[i.TEXTURE_2D_ARRAY]=pe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ee[i.TEXTURE_3D]=pe(i.TEXTURE_3D,i.TEXTURE_3D,1,1)),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),we(i.DEPTH_TEST),c.setFunc(wo),xe(!1),fe(al),we(i.CULL_FACE),te(ai);function we(N){d[N]!==!0&&(i.enable(N),d[N]=!0)}function Te(N){d[N]!==!1&&(i.disable(N),d[N]=!1)}function Re(N,_e){return p[N]!==_e?(i.bindFramebuffer(N,_e),p[N]=_e,n&&(N===i.DRAW_FRAMEBUFFER&&(p[i.FRAMEBUFFER]=_e),N===i.FRAMEBUFFER&&(p[i.DRAW_FRAMEBUFFER]=_e)),!0):!1}function V(N,_e){let re=g,$=!1;if(N)if(re=_.get(_e),re===void 0&&(re=[],_.set(_e,re)),N.isWebGLMultipleRenderTargets){const ce=N.texture;if(re.length!==ce.length||re[0]!==i.COLOR_ATTACHMENT0){for(let Ce=0,qe=ce.length;Ce<qe;Ce++)re[Ce]=i.COLOR_ATTACHMENT0+Ce;re.length=ce.length,$=!0}}else re[0]!==i.COLOR_ATTACHMENT0&&(re[0]=i.COLOR_ATTACHMENT0,$=!0);else re[0]!==i.BACK&&(re[0]=i.BACK,$=!0);$&&(t.isWebGL2?i.drawBuffers(re):e.get("WEBGL_draw_buffers").drawBuffersWEBGL(re))}function Pt(N){return m!==N?(i.useProgram(N),m=N,!0):!1}const Me={[wi]:i.FUNC_ADD,[Sv]:i.FUNC_SUBTRACT,[yv]:i.FUNC_REVERSE_SUBTRACT};if(n)Me[hl]=i.MIN,Me[dl]=i.MAX;else{const N=e.get("EXT_blend_minmax");N!==null&&(Me[hl]=N.MIN_EXT,Me[dl]=N.MAX_EXT)}const J={[Mv]:i.ZERO,[Tv]:i.ONE,[Ev]:i.SRC_COLOR,[Va]:i.SRC_ALPHA,[Pv]:i.SRC_ALPHA_SATURATE,[Cv]:i.DST_COLOR,[wv]:i.DST_ALPHA,[bv]:i.ONE_MINUS_SRC_COLOR,[za]:i.ONE_MINUS_SRC_ALPHA,[Rv]:i.ONE_MINUS_DST_COLOR,[Av]:i.ONE_MINUS_DST_ALPHA,[Dv]:i.CONSTANT_COLOR,[Lv]:i.ONE_MINUS_CONSTANT_COLOR,[Nv]:i.CONSTANT_ALPHA,[Iv]:i.ONE_MINUS_CONSTANT_ALPHA};function te(N,_e,re,$,ce,Ce,qe,Et,kt,tt){if(N===ai){f===!0&&(Te(i.BLEND),f=!1);return}if(f===!1&&(we(i.BLEND),f=!0),N!==xv){if(N!==y||tt!==D){if((v!==wi||E!==wi)&&(i.blendEquation(i.FUNC_ADD),v=wi,E=wi),tt)switch(N){case _s:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cl:i.blendFunc(i.ONE,i.ONE);break;case ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ul:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}else switch(N){case _s:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ll:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case ul:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",N);break}A=null,S=null,T=null,C=null,x.set(0,0,0),b=0,y=N,D=tt}return}ce=ce||_e,Ce=Ce||re,qe=qe||$,(_e!==v||ce!==E)&&(i.blendEquationSeparate(Me[_e],Me[ce]),v=_e,E=ce),(re!==A||$!==S||Ce!==T||qe!==C)&&(i.blendFuncSeparate(J[re],J[$],J[Ce],J[qe]),A=re,S=$,T=Ce,C=qe),(Et.equals(x)===!1||kt!==b)&&(i.blendColor(Et.r,Et.g,Et.b,kt),x.copy(Et),b=kt),y=N,D=!1}function Ie(N,_e){N.side===Vn?Te(i.CULL_FACE):we(i.CULL_FACE);let re=N.side===Kt;_e&&(re=!re),xe(re),N.blending===_s&&N.transparent===!1?te(ai):te(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),c.setFunc(N.depthFunc),c.setTest(N.depthTest),c.setMask(N.depthWrite),o.setMask(N.colorWrite);const $=N.stencilWrite;l.setTest($),$&&(l.setMask(N.stencilWriteMask),l.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),l.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Ze(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?we(i.SAMPLE_ALPHA_TO_COVERAGE):Te(i.SAMPLE_ALPHA_TO_COVERAGE)}function xe(N){L!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),L=N)}function fe(N){N!==_v?(we(i.CULL_FACE),N!==F&&(N===al?i.cullFace(i.BACK):N===gv?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Te(i.CULL_FACE),F=N}function Ee(N){N!==P&&(Z&&i.lineWidth(N),P=N)}function Ze(N,_e,re){N?(we(i.POLYGON_OFFSET_FILL),(I!==_e||k!==re)&&(i.polygonOffset(_e,re),I=_e,k=re)):Te(i.POLYGON_OFFSET_FILL)}function et(N){N?we(i.SCISSOR_TEST):Te(i.SCISSOR_TEST)}function R(N){N===void 0&&(N=i.TEXTURE0+O-1),j!==N&&(i.activeTexture(N),j=N)}function M(N,_e,re){re===void 0&&(j===null?re=i.TEXTURE0+O-1:re=j);let $=ie[re];$===void 0&&($={type:void 0,texture:void 0},ie[re]=$),($.type!==N||$.texture!==_e)&&(j!==re&&(i.activeTexture(re),j=re),i.bindTexture(N,_e||ee[N]),$.type=N,$.texture=_e)}function z(){const N=ie[j];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function se(){try{i.compressedTexImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ne(){try{i.compressedTexImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function ae(){try{i.texSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Se(){try{i.texSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function le(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function me(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function De(){try{i.texStorage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function je(){try{i.texStorage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function oe(){try{i.texImage2D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function $e(){try{i.texImage3D.apply(i,arguments)}catch(N){console.error("THREE.WebGLState:",N)}}function Oe(N){Q.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),Q.copy(N))}function Le(N){ue.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),ue.copy(N))}function be(N,_e){let re=h.get(_e);re===void 0&&(re=new WeakMap,h.set(_e,re));let $=re.get(N);$===void 0&&($=i.getUniformBlockIndex(_e,N.name),re.set(N,$))}function ve(N,_e){const $=h.get(_e).get(N);u.get(_e)!==$&&(i.uniformBlockBinding(_e,$,N.__bindingPointIndex),u.set(_e,$))}function He(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),n===!0&&(i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null)),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),d={},j=null,ie={},p={},_=new WeakMap,g=[],m=null,f=!1,y=null,v=null,A=null,S=null,E=null,T=null,C=null,x=new Ye(0,0,0),b=0,D=!1,L=null,F=null,P=null,I=null,k=null,Q.set(0,0,i.canvas.width,i.canvas.height),ue.set(0,0,i.canvas.width,i.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:we,disable:Te,bindFramebuffer:Re,drawBuffers:V,useProgram:Pt,setBlending:te,setMaterial:Ie,setFlipSided:xe,setCullFace:fe,setLineWidth:Ee,setPolygonOffset:Ze,setScissorTest:et,activeTexture:R,bindTexture:M,unbindTexture:z,compressedTexImage2D:se,compressedTexImage3D:ne,texImage2D:oe,texImage3D:$e,updateUBOMapping:be,uniformBlockBinding:ve,texStorage2D:De,texStorage3D:je,texSubImage2D:ae,texSubImage3D:Se,compressedTexSubImage2D:le,compressedTexSubImage3D:me,scissor:Oe,viewport:Le,reset:He}}function bT(i,e,t,n,s,r,a){const o=s.isWebGL2,c=s.maxTextures,l=s.maxCubemapSize,u=s.maxTextureSize,h=s.maxSamples,d=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),_=new WeakMap;let g;const m=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(R,M){return f?new OffscreenCanvas(R,M):dr("canvas")}function v(R,M,z,se){let ne=1;if((R.width>se||R.height>se)&&(ne=se/Math.max(R.width,R.height)),ne<1||M===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const ae=M?Do:Math.floor,Se=ae(ne*R.width),le=ae(ne*R.height);g===void 0&&(g=y(Se,le));const me=z?y(Se,le):g;return me.width=Se,me.height=le,me.getContext("2d").drawImage(R,0,0,Se,le),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Se+"x"+le+")."),me}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function A(R){return Ya(R.width)&&Ya(R.height)}function S(R){return o?!1:R.wrapS!==qt||R.wrapT!==qt||R.minFilter!==Gt&&R.minFilter!==At}function E(R,M){return R.generateMipmaps&&M&&R.minFilter!==Gt&&R.minFilter!==At}function T(R){i.generateMipmap(R)}function C(R,M,z,se,ne=!1){if(o===!1)return M;if(R!==null){if(i[R]!==void 0)return i[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ae=M;if(M===i.RED&&(z===i.FLOAT&&(ae=i.R32F),z===i.HALF_FLOAT&&(ae=i.R16F),z===i.UNSIGNED_BYTE&&(ae=i.R8)),M===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(ae=i.R8UI),z===i.UNSIGNED_SHORT&&(ae=i.R16UI),z===i.UNSIGNED_INT&&(ae=i.R32UI),z===i.BYTE&&(ae=i.R8I),z===i.SHORT&&(ae=i.R16I),z===i.INT&&(ae=i.R32I)),M===i.RG&&(z===i.FLOAT&&(ae=i.RG32F),z===i.HALF_FLOAT&&(ae=i.RG16F),z===i.UNSIGNED_BYTE&&(ae=i.RG8)),M===i.RGBA){const Se=ne?Ao:Ke.getTransfer(se);z===i.FLOAT&&(ae=i.RGBA32F),z===i.HALF_FLOAT&&(ae=i.RGBA16F),z===i.UNSIGNED_BYTE&&(ae=Se===it?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT_4_4_4_4&&(ae=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(ae=i.RGB5_A1)}return(ae===i.R16F||ae===i.R32F||ae===i.RG16F||ae===i.RG32F||ae===i.RGBA16F||ae===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function x(R,M,z){return E(R,z)===!0||R.isFramebufferTexture&&R.minFilter!==Gt&&R.minFilter!==At?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function b(R){return R===Gt||R===fl||R===Ko?i.NEAREST:i.LINEAR}function D(R){const M=R.target;M.removeEventListener("dispose",D),F(M),M.isVideoTexture&&_.delete(M)}function L(R){const M=R.target;M.removeEventListener("dispose",L),I(M)}function F(R){const M=n.get(R);if(M.__webglInit===void 0)return;const z=R.source,se=m.get(z);if(se){const ne=se[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&P(R),Object.keys(se).length===0&&m.delete(z)}n.remove(R)}function P(R){const M=n.get(R);i.deleteTexture(M.__webglTexture);const z=R.source,se=m.get(z);delete se[M.__cacheKey],a.memory.textures--}function I(R){const M=R.texture,z=n.get(R),se=n.get(M);if(se.__webglTexture!==void 0&&(i.deleteTexture(se.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let ne=0;ne<6;ne++){if(Array.isArray(z.__webglFramebuffer[ne]))for(let ae=0;ae<z.__webglFramebuffer[ne].length;ae++)i.deleteFramebuffer(z.__webglFramebuffer[ne][ae]);else i.deleteFramebuffer(z.__webglFramebuffer[ne]);z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer[ne])}else{if(Array.isArray(z.__webglFramebuffer))for(let ne=0;ne<z.__webglFramebuffer.length;ne++)i.deleteFramebuffer(z.__webglFramebuffer[ne]);else i.deleteFramebuffer(z.__webglFramebuffer);if(z.__webglDepthbuffer&&i.deleteRenderbuffer(z.__webglDepthbuffer),z.__webglMultisampledFramebuffer&&i.deleteFramebuffer(z.__webglMultisampledFramebuffer),z.__webglColorRenderbuffer)for(let ne=0;ne<z.__webglColorRenderbuffer.length;ne++)z.__webglColorRenderbuffer[ne]&&i.deleteRenderbuffer(z.__webglColorRenderbuffer[ne]);z.__webglDepthRenderbuffer&&i.deleteRenderbuffer(z.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let ne=0,ae=M.length;ne<ae;ne++){const Se=n.get(M[ne]);Se.__webglTexture&&(i.deleteTexture(Se.__webglTexture),a.memory.textures--),n.remove(M[ne])}n.remove(M),n.remove(R)}let k=0;function O(){k=0}function Z(){const R=k;return R>=c&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+c),k+=1,R}function B(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function q(R,M){const z=n.get(R);if(R.isVideoTexture&&Ze(R),R.isRenderTargetTexture===!1&&R.version>0&&z.__version!==R.version){const se=R.image;if(se===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(se.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{we(z,R,M);return}}t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+M)}function j(R,M){const z=n.get(R);if(R.version>0&&z.__version!==R.version){we(z,R,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+M)}function ie(R,M){const z=n.get(R);if(R.version>0&&z.__version!==R.version){we(z,R,M);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+M)}function X(R,M){const z=n.get(R);if(R.version>0&&z.__version!==R.version){Te(z,R,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+M)}const K={[Wa]:i.REPEAT,[qt]:i.CLAMP_TO_EDGE,[qa]:i.MIRRORED_REPEAT},Q={[Gt]:i.NEAREST,[fl]:i.NEAREST_MIPMAP_NEAREST,[Ko]:i.NEAREST_MIPMAP_LINEAR,[At]:i.LINEAR,[Zv]:i.LINEAR_MIPMAP_NEAREST,[lr]:i.LINEAR_MIPMAP_LINEAR},ue={[a0]:i.NEVER,[f0]:i.ALWAYS,[c0]:i.LESS,[Jh]:i.LEQUAL,[l0]:i.EQUAL,[d0]:i.GEQUAL,[u0]:i.GREATER,[h0]:i.NOTEQUAL};function pe(R,M,z){if(z?(i.texParameteri(R,i.TEXTURE_WRAP_S,K[M.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,K[M.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,K[M.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Q[M.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Q[M.minFilter])):(i.texParameteri(R,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(R,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,i.CLAMP_TO_EDGE),(M.wrapS!==qt||M.wrapT!==qt)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),i.texParameteri(R,i.TEXTURE_MAG_FILTER,b(M.magFilter)),i.texParameteri(R,i.TEXTURE_MIN_FILTER,b(M.minFilter)),M.minFilter!==Gt&&M.minFilter!==At&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),M.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,ue[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){const se=e.get("EXT_texture_filter_anisotropic");if(M.magFilter===Gt||M.minFilter!==Ko&&M.minFilter!==lr||M.type===ri&&e.has("OES_texture_float_linear")===!1||o===!1&&M.type===ur&&e.has("OES_texture_half_float_linear")===!1)return;(M.anisotropy>1||n.get(M).__currentAnisotropy)&&(i.texParameterf(R,se.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy)}}function ee(R,M){let z=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",D));const se=M.source;let ne=m.get(se);ne===void 0&&(ne={},m.set(se,ne));const ae=B(M);if(ae!==R.__cacheKey){ne[ae]===void 0&&(ne[ae]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),ne[ae].usedTimes++;const Se=ne[R.__cacheKey];Se!==void 0&&(ne[R.__cacheKey].usedTimes--,Se.usedTimes===0&&P(M)),R.__cacheKey=ae,R.__webglTexture=ne[ae].texture}return z}function we(R,M,z){let se=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(se=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(se=i.TEXTURE_3D);const ne=ee(R,M),ae=M.source;t.bindTexture(se,R.__webglTexture,i.TEXTURE0+z);const Se=n.get(ae);if(ae.version!==Se.__version||ne===!0){t.activeTexture(i.TEXTURE0+z);const le=Ke.getPrimaries(Ke.workingColorSpace),me=M.colorSpace===cn?null:Ke.getPrimaries(M.colorSpace),De=M.colorSpace===cn||le===me?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);const je=S(M)&&A(M.image)===!1;let oe=v(M.image,je,!1,u);oe=et(M,oe);const $e=A(oe)||o,Oe=r.convert(M.format,M.colorSpace);let Le=r.convert(M.type),be=C(M.internalFormat,Oe,Le,M.colorSpace,M.isVideoTexture);pe(se,M,$e);let ve;const He=M.mipmaps,N=o&&M.isVideoTexture!==!0&&be!==Zh,_e=Se.__version===void 0||ne===!0,re=x(M,oe,$e);if(M.isDepthTexture)be=i.DEPTH_COMPONENT,o?M.type===ri?be=i.DEPTH_COMPONENT32F:M.type===si?be=i.DEPTH_COMPONENT24:M.type===Ni?be=i.DEPTH24_STENCIL8:be=i.DEPTH_COMPONENT16:M.type===ri&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),M.format===Ii&&be===i.DEPTH_COMPONENT&&M.type!==bc&&M.type!==si&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),M.type=si,Le=r.convert(M.type)),M.format===As&&be===i.DEPTH_COMPONENT&&(be=i.DEPTH_STENCIL,M.type!==Ni&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),M.type=Ni,Le=r.convert(M.type))),_e&&(N?t.texStorage2D(i.TEXTURE_2D,1,be,oe.width,oe.height):t.texImage2D(i.TEXTURE_2D,0,be,oe.width,oe.height,0,Oe,Le,null));else if(M.isDataTexture)if(He.length>0&&$e){N&&_e&&t.texStorage2D(i.TEXTURE_2D,re,be,He[0].width,He[0].height);for(let $=0,ce=He.length;$<ce;$++)ve=He[$],N?t.texSubImage2D(i.TEXTURE_2D,$,0,0,ve.width,ve.height,Oe,Le,ve.data):t.texImage2D(i.TEXTURE_2D,$,be,ve.width,ve.height,0,Oe,Le,ve.data);M.generateMipmaps=!1}else N?(_e&&t.texStorage2D(i.TEXTURE_2D,re,be,oe.width,oe.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe.width,oe.height,Oe,Le,oe.data)):t.texImage2D(i.TEXTURE_2D,0,be,oe.width,oe.height,0,Oe,Le,oe.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){N&&_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,be,He[0].width,He[0].height,oe.depth);for(let $=0,ce=He.length;$<ce;$++)ve=He[$],M.format!==xn?Oe!==null?N?t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ve.width,ve.height,oe.depth,Oe,ve.data,0,0):t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,$,be,ve.width,ve.height,oe.depth,0,ve.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?t.texSubImage3D(i.TEXTURE_2D_ARRAY,$,0,0,0,ve.width,ve.height,oe.depth,Oe,Le,ve.data):t.texImage3D(i.TEXTURE_2D_ARRAY,$,be,ve.width,ve.height,oe.depth,0,Oe,Le,ve.data)}else{N&&_e&&t.texStorage2D(i.TEXTURE_2D,re,be,He[0].width,He[0].height);for(let $=0,ce=He.length;$<ce;$++)ve=He[$],M.format!==xn?Oe!==null?N?t.compressedTexSubImage2D(i.TEXTURE_2D,$,0,0,ve.width,ve.height,Oe,ve.data):t.compressedTexImage2D(i.TEXTURE_2D,$,be,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?t.texSubImage2D(i.TEXTURE_2D,$,0,0,ve.width,ve.height,Oe,Le,ve.data):t.texImage2D(i.TEXTURE_2D,$,be,ve.width,ve.height,0,Oe,Le,ve.data)}else if(M.isDataArrayTexture)N?(_e&&t.texStorage3D(i.TEXTURE_2D_ARRAY,re,be,oe.width,oe.height,oe.depth),t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,oe.width,oe.height,oe.depth,Oe,Le,oe.data)):t.texImage3D(i.TEXTURE_2D_ARRAY,0,be,oe.width,oe.height,oe.depth,0,Oe,Le,oe.data);else if(M.isData3DTexture)N?(_e&&t.texStorage3D(i.TEXTURE_3D,re,be,oe.width,oe.height,oe.depth),t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,oe.width,oe.height,oe.depth,Oe,Le,oe.data)):t.texImage3D(i.TEXTURE_3D,0,be,oe.width,oe.height,oe.depth,0,Oe,Le,oe.data);else if(M.isFramebufferTexture){if(_e)if(N)t.texStorage2D(i.TEXTURE_2D,re,be,oe.width,oe.height);else{let $=oe.width,ce=oe.height;for(let Ce=0;Ce<re;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,be,$,ce,0,Oe,Le,null),$>>=1,ce>>=1}}else if(He.length>0&&$e){N&&_e&&t.texStorage2D(i.TEXTURE_2D,re,be,He[0].width,He[0].height);for(let $=0,ce=He.length;$<ce;$++)ve=He[$],N?t.texSubImage2D(i.TEXTURE_2D,$,0,0,Oe,Le,ve):t.texImage2D(i.TEXTURE_2D,$,be,Oe,Le,ve);M.generateMipmaps=!1}else N?(_e&&t.texStorage2D(i.TEXTURE_2D,re,be,oe.width,oe.height),t.texSubImage2D(i.TEXTURE_2D,0,0,0,Oe,Le,oe)):t.texImage2D(i.TEXTURE_2D,0,be,Oe,Le,oe);E(M,$e)&&T(se),Se.__version=ae.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function Te(R,M,z){if(M.image.length!==6)return;const se=ee(R,M),ne=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+z);const ae=n.get(ne);if(ne.version!==ae.__version||se===!0){t.activeTexture(i.TEXTURE0+z);const Se=Ke.getPrimaries(Ke.workingColorSpace),le=M.colorSpace===cn?null:Ke.getPrimaries(M.colorSpace),me=M.colorSpace===cn||Se===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,me);const De=M.isCompressedTexture||M.image[0].isCompressedTexture,je=M.image[0]&&M.image[0].isDataTexture,oe=[];for(let $=0;$<6;$++)!De&&!je?oe[$]=v(M.image[$],!1,!0,l):oe[$]=je?M.image[$].image:M.image[$],oe[$]=et(M,oe[$]);const $e=oe[0],Oe=A($e)||o,Le=r.convert(M.format,M.colorSpace),be=r.convert(M.type),ve=C(M.internalFormat,Le,be,M.colorSpace),He=o&&M.isVideoTexture!==!0,N=ae.__version===void 0||se===!0;let _e=x(M,$e,Oe);pe(i.TEXTURE_CUBE_MAP,M,Oe);let re;if(De){He&&N&&t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,ve,$e.width,$e.height);for(let $=0;$<6;$++){re=oe[$].mipmaps;for(let ce=0;ce<re.length;ce++){const Ce=re[ce];M.format!==xn?Le!==null?He?t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce,0,0,Ce.width,Ce.height,Le,Ce.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce,ve,Ce.width,Ce.height,0,Ce.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce,0,0,Ce.width,Ce.height,Le,be,Ce.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce,ve,Ce.width,Ce.height,0,Le,be,Ce.data)}}}else{re=M.mipmaps,He&&N&&(re.length>0&&_e++,t.texStorage2D(i.TEXTURE_CUBE_MAP,_e,ve,oe[0].width,oe[0].height));for(let $=0;$<6;$++)if(je){He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,oe[$].width,oe[$].height,Le,be,oe[$].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ve,oe[$].width,oe[$].height,0,Le,be,oe[$].data);for(let ce=0;ce<re.length;ce++){const qe=re[ce].image[$].image;He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce+1,0,0,qe.width,qe.height,Le,be,qe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce+1,ve,qe.width,qe.height,0,Le,be,qe.data)}}else{He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,Le,be,oe[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,ve,Le,be,oe[$]);for(let ce=0;ce<re.length;ce++){const Ce=re[ce];He?t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce+1,0,0,Le,be,Ce.image[$]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+$,ce+1,ve,Le,be,Ce.image[$])}}}E(M,Oe)&&T(i.TEXTURE_CUBE_MAP),ae.__version=ne.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function Re(R,M,z,se,ne,ae){const Se=r.convert(z.format,z.colorSpace),le=r.convert(z.type),me=C(z.internalFormat,Se,le,z.colorSpace);if(!n.get(M).__hasExternalTextures){const je=Math.max(1,M.width>>ae),oe=Math.max(1,M.height>>ae);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,ae,me,je,oe,M.depth,0,Se,le,null):t.texImage2D(ne,ae,me,je,oe,0,Se,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Ee(M)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,se,ne,n.get(z).__webglTexture,0,fe(M)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,se,ne,n.get(z).__webglTexture,ae),t.bindFramebuffer(i.FRAMEBUFFER,null)}function V(R,M,z){if(i.bindRenderbuffer(i.RENDERBUFFER,R),M.depthBuffer&&!M.stencilBuffer){let se=o===!0?i.DEPTH_COMPONENT24:i.DEPTH_COMPONENT16;if(z||Ee(M)){const ne=M.depthTexture;ne&&ne.isDepthTexture&&(ne.type===ri?se=i.DEPTH_COMPONENT32F:ne.type===si&&(se=i.DEPTH_COMPONENT24));const ae=fe(M);Ee(M)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ae,se,M.width,M.height):i.renderbufferStorageMultisample(i.RENDERBUFFER,ae,se,M.width,M.height)}else i.renderbufferStorage(i.RENDERBUFFER,se,M.width,M.height);i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.RENDERBUFFER,R)}else if(M.depthBuffer&&M.stencilBuffer){const se=fe(M);z&&Ee(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,se,i.DEPTH24_STENCIL8,M.width,M.height):Ee(M)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,se,i.DEPTH24_STENCIL8,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,i.DEPTH_STENCIL,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.RENDERBUFFER,R)}else{const se=M.isWebGLMultipleRenderTargets===!0?M.texture:[M.texture];for(let ne=0;ne<se.length;ne++){const ae=se[ne],Se=r.convert(ae.format,ae.colorSpace),le=r.convert(ae.type),me=C(ae.internalFormat,Se,le,ae.colorSpace),De=fe(M);z&&Ee(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,De,me,M.width,M.height):Ee(M)?d.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,De,me,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,me,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Pt(R,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),q(M.depthTexture,0);const se=n.get(M.depthTexture).__webglTexture,ne=fe(M);if(M.depthTexture.format===Ii)Ee(M)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(M.depthTexture.format===As)Ee(M)?d.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Me(R){const M=n.get(R),z=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!M.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");Pt(M.__webglFramebuffer,R)}else if(z){M.__webglDepthbuffer=[];for(let se=0;se<6;se++)t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[se]),M.__webglDepthbuffer[se]=i.createRenderbuffer(),V(M.__webglDepthbuffer[se],R,!1)}else t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer=i.createRenderbuffer(),V(M.__webglDepthbuffer,R,!1);t.bindFramebuffer(i.FRAMEBUFFER,null)}function J(R,M,z){const se=n.get(R);M!==void 0&&Re(se.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&Me(R)}function te(R){const M=R.texture,z=n.get(R),se=n.get(M);R.addEventListener("dispose",L),R.isWebGLMultipleRenderTargets!==!0&&(se.__webglTexture===void 0&&(se.__webglTexture=i.createTexture()),se.__version=M.version,a.memory.textures++);const ne=R.isWebGLCubeRenderTarget===!0,ae=R.isWebGLMultipleRenderTargets===!0,Se=A(R)||o;if(ne){z.__webglFramebuffer=[];for(let le=0;le<6;le++)if(o&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer[le]=[];for(let me=0;me<M.mipmaps.length;me++)z.__webglFramebuffer[le][me]=i.createFramebuffer()}else z.__webglFramebuffer[le]=i.createFramebuffer()}else{if(o&&M.mipmaps&&M.mipmaps.length>0){z.__webglFramebuffer=[];for(let le=0;le<M.mipmaps.length;le++)z.__webglFramebuffer[le]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(ae)if(s.drawBuffers){const le=R.texture;for(let me=0,De=le.length;me<De;me++){const je=n.get(le[me]);je.__webglTexture===void 0&&(je.__webglTexture=i.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&Ee(R)===!1){const le=ae?M:[M];z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let me=0;me<le.length;me++){const De=le[me];z.__webglColorRenderbuffer[me]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[me]);const je=r.convert(De.format,De.colorSpace),oe=r.convert(De.type),$e=C(De.internalFormat,je,oe,De.colorSpace,R.isXRRenderTarget===!0),Oe=fe(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Oe,$e,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+me,i.RENDERBUFFER,z.__webglColorRenderbuffer[me])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),V(z.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ne){t.bindTexture(i.TEXTURE_CUBE_MAP,se.__webglTexture),pe(i.TEXTURE_CUBE_MAP,M,Se);for(let le=0;le<6;le++)if(o&&M.mipmaps&&M.mipmaps.length>0)for(let me=0;me<M.mipmaps.length;me++)Re(z.__webglFramebuffer[le][me],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,me);else Re(z.__webglFramebuffer[le],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);E(M,Se)&&T(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ae){const le=R.texture;for(let me=0,De=le.length;me<De;me++){const je=le[me],oe=n.get(je);t.bindTexture(i.TEXTURE_2D,oe.__webglTexture),pe(i.TEXTURE_2D,je,Se),Re(z.__webglFramebuffer,R,je,i.COLOR_ATTACHMENT0+me,i.TEXTURE_2D,0),E(je,Se)&&T(i.TEXTURE_2D)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?le=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),t.bindTexture(le,se.__webglTexture),pe(le,M,Se),o&&M.mipmaps&&M.mipmaps.length>0)for(let me=0;me<M.mipmaps.length;me++)Re(z.__webglFramebuffer[me],R,M,i.COLOR_ATTACHMENT0,le,me);else Re(z.__webglFramebuffer,R,M,i.COLOR_ATTACHMENT0,le,0);E(M,Se)&&T(le),t.unbindTexture()}R.depthBuffer&&Me(R)}function Ie(R){const M=A(R)||o,z=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let se=0,ne=z.length;se<ne;se++){const ae=z[se];if(E(ae,M)){const Se=R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,le=n.get(ae).__webglTexture;t.bindTexture(Se,le),T(Se),t.unbindTexture()}}}function xe(R){if(o&&R.samples>0&&Ee(R)===!1){const M=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],z=R.width,se=R.height;let ne=i.COLOR_BUFFER_BIT;const ae=[],Se=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,le=n.get(R),me=R.isWebGLMultipleRenderTargets===!0;if(me)for(let De=0;De<M.length;De++)t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,le.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglFramebuffer);for(let De=0;De<M.length;De++){ae.push(i.COLOR_ATTACHMENT0+De),R.depthBuffer&&ae.push(Se);const je=le.__ignoreDepthValues!==void 0?le.__ignoreDepthValues:!1;if(je===!1&&(R.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),me&&i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,le.__webglColorRenderbuffer[De]),je===!0&&(i.invalidateFramebuffer(i.READ_FRAMEBUFFER,[Se]),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[Se])),me){const oe=n.get(M[De]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,oe,0)}i.blitFramebuffer(0,0,z,se,0,0,z,se,ne,i.NEAREST),p&&i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ae)}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),me)for(let De=0;De<M.length;De++){t.bindFramebuffer(i.FRAMEBUFFER,le.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.RENDERBUFFER,le.__webglColorRenderbuffer[De]);const je=n.get(M[De]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,le.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+De,i.TEXTURE_2D,je,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,le.__webglMultisampledFramebuffer)}}function fe(R){return Math.min(h,R.samples)}function Ee(R){const M=n.get(R);return o&&R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ze(R){const M=a.render.frame;_.get(R)!==M&&(_.set(R,M),R.update())}function et(R,M){const z=R.colorSpace,se=R.format,ne=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Xa||z!==Yn&&z!==cn&&(Ke.getTransfer(z)===it?o===!1?e.has("EXT_sRGB")===!0&&se===xn?(R.format=Xa,R.minFilter=At,R.generateMipmaps=!1):M=ed.sRGBToLinear(M):(se!==xn||ne!==li)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),M}this.allocateTextureUnit=Z,this.resetTextureUnits=O,this.setTexture2D=q,this.setTexture2DArray=j,this.setTexture3D=ie,this.setTextureCube=X,this.rebindTextures=J,this.setupRenderTarget=te,this.updateRenderTargetMipmap=Ie,this.updateMultisampleRenderTarget=xe,this.setupDepthRenderbuffer=Me,this.setupFrameBufferTexture=Re,this.useMultisampledRTT=Ee}function wT(i,e,t){const n=t.isWebGL2;function s(r,a=cn){let o;const c=Ke.getTransfer(a);if(r===li)return i.UNSIGNED_BYTE;if(r===Wh)return i.UNSIGNED_SHORT_4_4_4_4;if(r===qh)return i.UNSIGNED_SHORT_5_5_5_1;if(r===$v)return i.BYTE;if(r===Kv)return i.SHORT;if(r===bc)return i.UNSIGNED_SHORT;if(r===Hh)return i.INT;if(r===si)return i.UNSIGNED_INT;if(r===ri)return i.FLOAT;if(r===ur)return n?i.HALF_FLOAT:(o=e.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===Jv)return i.ALPHA;if(r===xn)return i.RGBA;if(r===Qv)return i.LUMINANCE;if(r===e0)return i.LUMINANCE_ALPHA;if(r===Ii)return i.DEPTH_COMPONENT;if(r===As)return i.DEPTH_STENCIL;if(r===Xa)return o=e.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===t0)return i.RED;if(r===Xh)return i.RED_INTEGER;if(r===n0)return i.RG;if(r===Yh)return i.RG_INTEGER;if(r===jh)return i.RGBA_INTEGER;if(r===Jo||r===Qo||r===ea||r===ta)if(c===it)if(o=e.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===Jo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Qo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===ea)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===ta)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=e.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===Jo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Qo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===ea)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===ta)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===pl||r===ml||r===_l||r===gl)if(o=e.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===pl)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===ml)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===_l)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===gl)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Zh)return o=e.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===vl||r===xl)if(o=e.get("WEBGL_compressed_texture_etc"),o!==null){if(r===vl)return c===it?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===xl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Sl||r===yl||r===Ml||r===Tl||r===El||r===bl||r===wl||r===Al||r===Cl||r===Rl||r===Pl||r===Dl||r===Ll||r===Nl)if(o=e.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Sl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===yl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Ml)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Tl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===El)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===bl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===wl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Al)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Cl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Rl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Pl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Dl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Ll)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Nl)return c===it?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===na||r===Il||r===Ol)if(o=e.get("EXT_texture_compression_bptc"),o!==null){if(r===na)return c===it?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Il)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Ol)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===i0||r===Ul||r===Fl||r===kl)if(o=e.get("EXT_texture_compression_rgtc"),o!==null){if(r===na)return o.COMPRESSED_RED_RGTC1_EXT;if(r===Ul)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Fl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===kl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ni?n?i.UNSIGNED_INT_24_8:(o=e.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):i[r]!==void 0?i[r]:null}return{convert:s}}class AT extends vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class eo extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const CT={type:"move"};class wa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new eo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new eo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new eo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const g of e.hand.values()){const m=t.getJointPose(g,n),f=this._getHandJoint(l,g);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,_=.005;l.inputState.pinching&&d>p+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=p-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(CT)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new eo;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class RT extends Os{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,d=null,p=null,_=null;const g=t.getContextAttributes();let m=null,f=null;const y=[],v=[],A=new Xe;let S=null;const E=new vn;E.layers.enable(1),E.viewport=new Ct;const T=new vn;T.layers.enable(2),T.viewport=new Ct;const C=[E,T],x=new AT;x.layers.enable(1),x.layers.enable(2);let b=null,D=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let K=y[X];return K===void 0&&(K=new wa,y[X]=K),K.getTargetRaySpace()},this.getControllerGrip=function(X){let K=y[X];return K===void 0&&(K=new wa,y[X]=K),K.getGripSpace()},this.getHand=function(X){let K=y[X];return K===void 0&&(K=new wa,y[X]=K),K.getHandSpace()};function L(X){const K=v.indexOf(X.inputSource);if(K===-1)return;const Q=y[K];Q!==void 0&&(Q.update(X.inputSource,X.frame,l||a),Q.dispatchEvent({type:X.type,data:X.inputSource}))}function F(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",F),s.removeEventListener("inputsourceschange",P);for(let X=0;X<y.length;X++){const K=v[X];K!==null&&(v[X]=null,y[X].disconnect(K))}b=null,D=null,e.setRenderTarget(m),p=null,d=null,h=null,s=null,f=null,ie.stop(),n.isPresenting=!1,e.setPixelRatio(S),e.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(X){l=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(m=e.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",F),s.addEventListener("inputsourceschange",P),g.xrCompatible!==!0&&await t.makeXRCompatible(),S=e.getPixelRatio(),e.getSize(A),s.renderState.layers===void 0||e.capabilities.isWebGL2===!1){const K={antialias:s.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,K),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new Gi(p.framebufferWidth,p.framebufferHeight,{format:xn,type:li,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let K=null,Q=null,ue=null;g.depth&&(ue=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=g.stencil?As:Ii,Q=g.stencil?Ni:si);const pe={colorFormat:t.RGBA8,depthFormat:ue,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(pe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),f=new Gi(d.textureWidth,d.textureHeight,{format:xn,type:li,depthTexture:new dd(d.textureWidth,d.textureHeight,Q,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0});const ee=e.properties.get(f);ee.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ie.setContext(s),ie.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(X){for(let K=0;K<X.removed.length;K++){const Q=X.removed[K],ue=v.indexOf(Q);ue>=0&&(v[ue]=null,y[ue].disconnect(Q))}for(let K=0;K<X.added.length;K++){const Q=X.added[K];let ue=v.indexOf(Q);if(ue===-1){for(let ee=0;ee<y.length;ee++)if(ee>=v.length){v.push(Q),ue=ee;break}else if(v[ee]===null){v[ee]=Q,ue=ee;break}if(ue===-1)break}const pe=y[ue];pe&&pe.connect(Q)}}const I=new W,k=new W;function O(X,K,Q){I.setFromMatrixPosition(K.matrixWorld),k.setFromMatrixPosition(Q.matrixWorld);const ue=I.distanceTo(k),pe=K.projectionMatrix.elements,ee=Q.projectionMatrix.elements,we=pe[14]/(pe[10]-1),Te=pe[14]/(pe[10]+1),Re=(pe[9]+1)/pe[5],V=(pe[9]-1)/pe[5],Pt=(pe[8]-1)/pe[0],Me=(ee[8]+1)/ee[0],J=we*Pt,te=we*Me,Ie=ue/(-Pt+Me),xe=Ie*-Pt;K.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(xe),X.translateZ(Ie),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert();const fe=we+Ie,Ee=Te+Ie,Ze=J-xe,et=te+(ue-xe),R=Re*Te/Ee*fe,M=V*Te/Ee*fe;X.projectionMatrix.makePerspective(Ze,et,R,M,fe,Ee),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}function Z(X,K){K===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(K.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;x.near=T.near=E.near=X.near,x.far=T.far=E.far=X.far,(b!==x.near||D!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),b=x.near,D=x.far);const K=X.parent,Q=x.cameras;Z(x,K);for(let ue=0;ue<Q.length;ue++)Z(Q[ue],K);Q.length===2?O(x,E,T):x.projectionMatrix.copy(E.projectionMatrix),B(X,x,K)};function B(X,K,Q){Q===null?X.matrix.copy(K.matrixWorld):(X.matrix.copy(Q.matrixWorld),X.matrix.invert(),X.matrix.multiply(K.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(K.projectionMatrix),X.projectionMatrixInverse.copy(K.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=hr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(X){c=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)};let q=null;function j(X,K){if(u=K.getViewerPose(l||a),_=K,u!==null){const Q=u.views;p!==null&&(e.setRenderTargetFramebuffer(f,p.framebuffer),e.setRenderTarget(f));let ue=!1;Q.length!==x.cameras.length&&(x.cameras.length=0,ue=!0);for(let pe=0;pe<Q.length;pe++){const ee=Q[pe];let we=null;if(p!==null)we=p.getViewport(ee);else{const Re=h.getViewSubImage(d,ee);we=Re.viewport,pe===0&&(e.setRenderTargetTextures(f,Re.colorTexture,d.ignoreDepthValues?void 0:Re.depthStencilTexture),e.setRenderTarget(f))}let Te=C[pe];Te===void 0&&(Te=new vn,Te.layers.enable(pe),Te.viewport=new Ct,C[pe]=Te),Te.matrix.fromArray(ee.transform.matrix),Te.matrix.decompose(Te.position,Te.quaternion,Te.scale),Te.projectionMatrix.fromArray(ee.projectionMatrix),Te.projectionMatrixInverse.copy(Te.projectionMatrix).invert(),Te.viewport.set(we.x,we.y,we.width,we.height),pe===0&&(x.matrix.copy(Te.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),ue===!0&&x.cameras.push(Te)}}for(let Q=0;Q<y.length;Q++){const ue=v[Q],pe=y[Q];ue!==null&&pe!==void 0&&pe.update(ue,K,l||a)}q&&q(X,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),_=null}const ie=new hd;ie.setAnimationLoop(j),this.setAnimationLoop=function(X){q=X},this.dispose=function(){}}}function PT(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,cd(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,y,v,A){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,A)):f.isMeshMatcapMaterial?(r(m,f),_(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),g(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,y,v):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===Kt&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===Kt&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=e.get(f).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;const v=i._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*v,t(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,y,v){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=v*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),e.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Kt&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function _(m,f){f.matcap&&(m.matcap.value=f.matcap)}function g(m,f){const y=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function DT(i,e,t,n){let s={},r={},a=[];const o=t.isWebGL2?i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(y,v){const A=v.program;n.uniformBlockBinding(y,A)}function l(y,v){let A=s[y.id];A===void 0&&(_(y),A=u(y),s[y.id]=A,y.addEventListener("dispose",m));const S=v.program;n.updateUBOMapping(y,S);const E=e.render.frame;r[y.id]!==E&&(d(y),r[y.id]=E)}function u(y){const v=h();y.__bindingPointIndex=v;const A=i.createBuffer(),S=y.__size,E=y.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,S,E),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,v,A),A}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const v=s[y.id],A=y.uniforms,S=y.__cache;i.bindBuffer(i.UNIFORM_BUFFER,v);for(let E=0,T=A.length;E<T;E++){const C=A[E];if(p(C,E,S)===!0){const x=C.__offset,b=Array.isArray(C.value)?C.value:[C.value];let D=0;for(let L=0;L<b.length;L++){const F=b[L],P=g(F);typeof F=="number"?(C.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,x+D,C.__data)):F.isMatrix3?(C.__data[0]=F.elements[0],C.__data[1]=F.elements[1],C.__data[2]=F.elements[2],C.__data[3]=F.elements[0],C.__data[4]=F.elements[3],C.__data[5]=F.elements[4],C.__data[6]=F.elements[5],C.__data[7]=F.elements[0],C.__data[8]=F.elements[6],C.__data[9]=F.elements[7],C.__data[10]=F.elements[8],C.__data[11]=F.elements[0]):(F.toArray(C.__data,D),D+=P.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,x,C.__data)}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(y,v,A){const S=y.value;if(A[v]===void 0){if(typeof S=="number")A[v]=S;else{const E=Array.isArray(S)?S:[S],T=[];for(let C=0;C<E.length;C++)T.push(E[C].clone());A[v]=T}return!0}else if(typeof S=="number"){if(A[v]!==S)return A[v]=S,!0}else{const E=Array.isArray(A[v])?A[v]:[A[v]],T=Array.isArray(S)?S:[S];for(let C=0;C<E.length;C++){const x=E[C];if(x.equals(T[C])===!1)return x.copy(T[C]),!0}}return!1}function _(y){const v=y.uniforms;let A=0;const S=16;let E=0;for(let T=0,C=v.length;T<C;T++){const x=v[T],b={boundary:0,storage:0},D=Array.isArray(x.value)?x.value:[x.value];for(let L=0,F=D.length;L<F;L++){const P=D[L],I=g(P);b.boundary+=I.boundary,b.storage+=I.storage}if(x.__data=new Float32Array(b.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=A,T>0){E=A%S;const L=S-E;E!==0&&L-b.boundary<0&&(A+=S-E,x.__offset=A)}A+=b.storage}return E=A%S,E>0&&(A+=S-E),y.__size=A,y.__cache={},this}function g(y){const v={boundary:0,storage:0};return typeof y=="number"?(v.boundary=4,v.storage=4):y.isVector2?(v.boundary=8,v.storage=8):y.isVector3||y.isColor?(v.boundary=16,v.storage=12):y.isVector4?(v.boundary=16,v.storage=16):y.isMatrix3?(v.boundary=48,v.storage=48):y.isMatrix4?(v.boundary=64,v.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),v}function m(y){const v=y.target;v.removeEventListener("dispose",m);const A=a.indexOf(v.__bindingPointIndex);a.splice(A,1),i.deleteBuffer(s[v.id]),delete s[v.id],delete r[v.id]}function f(){for(const y in s)i.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}class vd{constructor(e={}){const{canvas:t=C0(),context:n=null,depth:s=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=e;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=a;const p=new Uint32Array(4),_=new Int32Array(4);let g=null,m=null;const f=[],y=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=vt,this._useLegacyLights=!1,this.toneMapping=ci,this.toneMappingExposure=1;const v=this;let A=!1,S=0,E=0,T=null,C=-1,x=null;const b=new Ct,D=new Ct;let L=null;const F=new Ye(0);let P=0,I=t.width,k=t.height,O=1,Z=null,B=null;const q=new Ct(0,0,I,k),j=new Ct(0,0,I,k);let ie=!1;const X=new Pc;let K=!1,Q=!1,ue=null;const pe=new xt,ee=new Xe,we=new W,Te={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Re(){return T===null?O:1}let V=n;function Pt(w,U){for(let H=0;H<w.length;H++){const Y=w[H],G=t.getContext(Y,U);if(G!==null)return G}return null}try{const w={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ec}`),t.addEventListener("webglcontextlost",He,!1),t.addEventListener("webglcontextrestored",N,!1),t.addEventListener("webglcontextcreationerror",_e,!1),V===null){const U=["webgl2","webgl","experimental-webgl"];if(v.isWebGL1Renderer===!0&&U.shift(),V=Pt(U,w),V===null)throw Pt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&V instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),V.getShaderPrecisionFormat===void 0&&(V.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Me,J,te,Ie,xe,fe,Ee,Ze,et,R,M,z,se,ne,ae,Se,le,me,De,je,oe,$e,Oe,Le;function be(){Me=new Gy(V),J=new Uy(V,Me,e),Me.init(J),$e=new wT(V,Me,J),te=new ET(V,Me,J),Ie=new qy(V),xe=new uT,fe=new bT(V,Me,te,xe,J,$e,Ie),Ee=new ky(v),Ze=new zy(v),et=new Q0(V,J),Oe=new Iy(V,Me,et,J),R=new Hy(V,et,Ie,Oe),M=new Zy(V,R,et,Ie),De=new jy(V,J,fe),Se=new Fy(xe),z=new lT(v,Ee,Ze,Me,J,Oe,Se),se=new PT(v,xe),ne=new dT,ae=new vT(Me,J),me=new Ny(v,Ee,Ze,te,M,d,c),le=new TT(v,M,J),Le=new DT(V,Ie,J,te),je=new Oy(V,Me,Ie,J),oe=new Wy(V,Me,Ie,J),Ie.programs=z.programs,v.capabilities=J,v.extensions=Me,v.properties=xe,v.renderLists=ne,v.shadowMap=le,v.state=te,v.info=Ie}be();const ve=new RT(v,V);this.xr=ve,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const w=Me.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Me.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(w){w!==void 0&&(O=w,this.setSize(I,k,!1))},this.getSize=function(w){return w.set(I,k)},this.setSize=function(w,U,H=!0){if(ve.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=w,k=U,t.width=Math.floor(w*O),t.height=Math.floor(U*O),H===!0&&(t.style.width=w+"px",t.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(I*O,k*O).floor()},this.setDrawingBufferSize=function(w,U,H){I=w,k=U,O=H,t.width=Math.floor(w*H),t.height=Math.floor(U*H),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(b)},this.getViewport=function(w){return w.copy(q)},this.setViewport=function(w,U,H,Y){w.isVector4?q.set(w.x,w.y,w.z,w.w):q.set(w,U,H,Y),te.viewport(b.copy(q).multiplyScalar(O).floor())},this.getScissor=function(w){return w.copy(j)},this.setScissor=function(w,U,H,Y){w.isVector4?j.set(w.x,w.y,w.z,w.w):j.set(w,U,H,Y),te.scissor(D.copy(j).multiplyScalar(O).floor())},this.getScissorTest=function(){return ie},this.setScissorTest=function(w){te.setScissorTest(ie=w)},this.setOpaqueSort=function(w){Z=w},this.setTransparentSort=function(w){B=w},this.getClearColor=function(w){return w.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor.apply(me,arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha.apply(me,arguments)},this.clear=function(w=!0,U=!0,H=!0){let Y=0;if(w){let G=!1;if(T!==null){const ge=T.texture.format;G=ge===jh||ge===Yh||ge===Xh}if(G){const ge=T.texture.type,ye=ge===li||ge===si||ge===bc||ge===Ni||ge===Wh||ge===qh,Ae=me.getClearColor(),Ne=me.getClearAlpha(),Be=Ae.r,Ue=Ae.g,Fe=Ae.b;ye?(p[0]=Be,p[1]=Ue,p[2]=Fe,p[3]=Ne,V.clearBufferuiv(V.COLOR,0,p)):(_[0]=Be,_[1]=Ue,_[2]=Fe,_[3]=Ne,V.clearBufferiv(V.COLOR,0,_))}else Y|=V.COLOR_BUFFER_BIT}U&&(Y|=V.DEPTH_BUFFER_BIT),H&&(Y|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(Y)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",He,!1),t.removeEventListener("webglcontextrestored",N,!1),t.removeEventListener("webglcontextcreationerror",_e,!1),ne.dispose(),ae.dispose(),xe.dispose(),Ee.dispose(),Ze.dispose(),M.dispose(),Oe.dispose(),Le.dispose(),z.dispose(),ve.dispose(),ve.removeEventListener("sessionstart",kt),ve.removeEventListener("sessionend",tt),ue&&(ue.dispose(),ue=null),Bt.stop()};function He(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function N(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const w=Ie.autoReset,U=le.enabled,H=le.autoUpdate,Y=le.needsUpdate,G=le.type;be(),Ie.autoReset=w,le.enabled=U,le.autoUpdate=H,le.needsUpdate=Y,le.type=G}function _e(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function re(w){const U=w.target;U.removeEventListener("dispose",re),$(U)}function $(w){ce(w),xe.remove(w)}function ce(w){const U=xe.get(w).programs;U!==void 0&&(U.forEach(function(H){z.releaseProgram(H)}),w.isShaderMaterial&&z.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,H,Y,G,ge){U===null&&(U=Te);const ye=G.isMesh&&G.matrixWorld.determinant()<0,Ae=Sd(w,U,H,Y,G);te.setMaterial(Y,ye);let Ne=H.index,Be=1;if(Y.wireframe===!0){if(Ne=R.getWireframeAttribute(H),Ne===void 0)return;Be=2}const Ue=H.drawRange,Fe=H.attributes.position;let dt=Ue.start*Be,Qt=(Ue.start+Ue.count)*Be;ge!==null&&(dt=Math.max(dt,ge.start*Be),Qt=Math.min(Qt,(ge.start+ge.count)*Be)),Ne!==null?(dt=Math.max(dt,0),Qt=Math.min(Qt,Ne.count)):Fe!=null&&(dt=Math.max(dt,0),Qt=Math.min(Qt,Fe.count));const bt=Qt-dt;if(bt<0||bt===1/0)return;Oe.setup(G,Y,Ae,H,Ne);let Ln,ct=je;if(Ne!==null&&(Ln=et.get(Ne),ct=oe,ct.setIndex(Ln)),G.isMesh)Y.wireframe===!0?(te.setLineWidth(Y.wireframeLinewidth*Re()),ct.setMode(V.LINES)):ct.setMode(V.TRIANGLES);else if(G.isLine){let Ve=Y.linewidth;Ve===void 0&&(Ve=1),te.setLineWidth(Ve*Re()),G.isLineSegments?ct.setMode(V.LINES):G.isLineLoop?ct.setMode(V.LINE_LOOP):ct.setMode(V.LINE_STRIP)}else G.isPoints?ct.setMode(V.POINTS):G.isSprite&&ct.setMode(V.TRIANGLES);if(G.isBatchedMesh)ct.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)ct.renderInstances(dt,bt,G.count);else if(H.isInstancedBufferGeometry){const Ve=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Xo=Math.min(H.instanceCount,Ve);ct.renderInstances(dt,bt,Xo)}else ct.render(dt,bt)};function Ce(w,U,H){w.transparent===!0&&w.side===Vn&&w.forceSinglePass===!1?(w.side=Kt,w.needsUpdate=!0,Ar(w,U,H),w.side=pi,w.needsUpdate=!0,Ar(w,U,H),w.side=Vn):Ar(w,U,H)}this.compile=function(w,U,H=null){H===null&&(H=w),m=ae.get(H),m.init(),y.push(m),H.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),w!==H&&w.traverseVisible(function(G){G.isLight&&G.layers.test(U.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(v._useLegacyLights);const Y=new Set;return w.traverse(function(G){const ge=G.material;if(ge)if(Array.isArray(ge))for(let ye=0;ye<ge.length;ye++){const Ae=ge[ye];Ce(Ae,H,G),Y.add(Ae)}else Ce(ge,H,G),Y.add(ge)}),y.pop(),m=null,Y},this.compileAsync=function(w,U,H=null){const Y=this.compile(w,U,H);return new Promise(G=>{function ge(){if(Y.forEach(function(ye){xe.get(ye).currentProgram.isReady()&&Y.delete(ye)}),Y.size===0){G(w);return}setTimeout(ge,10)}Me.get("KHR_parallel_shader_compile")!==null?ge():setTimeout(ge,10)})};let qe=null;function Et(w){qe&&qe(w)}function kt(){Bt.stop()}function tt(){Bt.start()}const Bt=new hd;Bt.setAnimationLoop(Et),typeof self<"u"&&Bt.setContext(self),this.setAnimationLoop=function(w){qe=w,ve.setAnimationLoop(w),w===null?Bt.stop():Bt.start()},ve.addEventListener("sessionstart",kt),ve.addEventListener("sessionend",tt),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ve.enabled===!0&&ve.isPresenting===!0&&(ve.cameraAutoUpdate===!0&&ve.updateCamera(U),U=ve.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,U,T),m=ae.get(w,y.length),m.init(),y.push(m),pe.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),X.setFromProjectionMatrix(pe),Q=this.localClippingEnabled,K=Se.init(this.clippingPlanes,Q),g=ne.get(w,f.length),g.init(),f.push(g),bn(w,U,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(Z,B),this.info.render.frame++,K===!0&&Se.beginShadows();const H=m.state.shadowsArray;if(le.render(H,w,U),K===!0&&Se.endShadows(),this.info.autoReset===!0&&this.info.reset(),me.render(g,w),m.setupLights(v._useLegacyLights),U.isArrayCamera){const Y=U.cameras;for(let G=0,ge=Y.length;G<ge;G++){const ye=Y[G];Oc(g,w,ye,ye.viewport)}}else Oc(g,w,U);T!==null&&(fe.updateMultisampleRenderTarget(T),fe.updateRenderTargetMipmap(T)),w.isScene===!0&&w.onAfterRender(v,w,U),Oe.resetDefaultState(),C=-1,x=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,f.pop(),f.length>0?g=f[f.length-1]:g=null};function bn(w,U,H,Y){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||X.intersectsSprite(w)){Y&&we.setFromMatrixPosition(w.matrixWorld).applyMatrix4(pe);const ye=M.update(w),Ae=w.material;Ae.visible&&g.push(w,ye,Ae,H,we.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||X.intersectsObject(w))){const ye=M.update(w),Ae=w.material;if(Y&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),we.copy(w.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),we.copy(ye.boundingSphere.center)),we.applyMatrix4(w.matrixWorld).applyMatrix4(pe)),Array.isArray(Ae)){const Ne=ye.groups;for(let Be=0,Ue=Ne.length;Be<Ue;Be++){const Fe=Ne[Be],dt=Ae[Fe.materialIndex];dt&&dt.visible&&g.push(w,ye,dt,H,we.z,Fe)}}else Ae.visible&&g.push(w,ye,Ae,H,we.z,null)}}const ge=w.children;for(let ye=0,Ae=ge.length;ye<Ae;ye++)bn(ge[ye],U,H,Y)}function Oc(w,U,H,Y){const G=w.opaque,ge=w.transmissive,ye=w.transparent;m.setupLightsView(H),K===!0&&Se.setGlobalState(v.clippingPlanes,H),ge.length>0&&xd(G,ge,U,H),Y&&te.viewport(b.copy(Y)),G.length>0&&wr(G,U,H),ge.length>0&&wr(ge,U,H),ye.length>0&&wr(ye,U,H),te.buffers.depth.setTest(!0),te.buffers.depth.setMask(!0),te.buffers.color.setMask(!0),te.setPolygonOffset(!1)}function xd(w,U,H,Y){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;const ge=J.isWebGL2;ue===null&&(ue=new Gi(1,1,{generateMipmaps:!0,type:Me.has("EXT_color_buffer_half_float")?ur:li,minFilter:lr,samples:ge?4:0})),v.getDrawingBufferSize(ee),ge?ue.setSize(ee.x,ee.y):ue.setSize(Do(ee.x),Do(ee.y));const ye=v.getRenderTarget();v.setRenderTarget(ue),v.getClearColor(F),P=v.getClearAlpha(),P<1&&v.setClearColor(16777215,.5),v.clear();const Ae=v.toneMapping;v.toneMapping=ci,wr(w,H,Y),fe.updateMultisampleRenderTarget(ue),fe.updateRenderTargetMipmap(ue);let Ne=!1;for(let Be=0,Ue=U.length;Be<Ue;Be++){const Fe=U[Be],dt=Fe.object,Qt=Fe.geometry,bt=Fe.material,Ln=Fe.group;if(bt.side===Vn&&dt.layers.test(Y.layers)){const ct=bt.side;bt.side=Kt,bt.needsUpdate=!0,Uc(dt,H,Y,Qt,bt,Ln),bt.side=ct,bt.needsUpdate=!0,Ne=!0}}Ne===!0&&(fe.updateMultisampleRenderTarget(ue),fe.updateRenderTargetMipmap(ue)),v.setRenderTarget(ye),v.setClearColor(F,P),v.toneMapping=Ae}function wr(w,U,H){const Y=U.isScene===!0?U.overrideMaterial:null;for(let G=0,ge=w.length;G<ge;G++){const ye=w[G],Ae=ye.object,Ne=ye.geometry,Be=Y===null?ye.material:Y,Ue=ye.group;Ae.layers.test(H.layers)&&Uc(Ae,U,H,Ne,Be,Ue)}}function Uc(w,U,H,Y,G,ge){w.onBeforeRender(v,U,H,Y,G,ge),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),G.onBeforeRender(v,U,H,Y,w,ge),G.transparent===!0&&G.side===Vn&&G.forceSinglePass===!1?(G.side=Kt,G.needsUpdate=!0,v.renderBufferDirect(H,U,Y,G,w,ge),G.side=pi,G.needsUpdate=!0,v.renderBufferDirect(H,U,Y,G,w,ge),G.side=Vn):v.renderBufferDirect(H,U,Y,G,w,ge),w.onAfterRender(v,U,H,Y,G,ge)}function Ar(w,U,H){U.isScene!==!0&&(U=Te);const Y=xe.get(w),G=m.state.lights,ge=m.state.shadowsArray,ye=G.state.version,Ae=z.getParameters(w,G.state,ge,U,H),Ne=z.getProgramCacheKey(Ae);let Be=Y.programs;Y.environment=w.isMeshStandardMaterial?U.environment:null,Y.fog=U.fog,Y.envMap=(w.isMeshStandardMaterial?Ze:Ee).get(w.envMap||Y.environment),Be===void 0&&(w.addEventListener("dispose",re),Be=new Map,Y.programs=Be);let Ue=Be.get(Ne);if(Ue!==void 0){if(Y.currentProgram===Ue&&Y.lightsStateVersion===ye)return kc(w,Ae),Ue}else Ae.uniforms=z.getUniforms(w),w.onBuild(H,Ae,v),w.onBeforeCompile(Ae,v),Ue=z.acquireProgram(Ae,Ne),Be.set(Ne,Ue),Y.uniforms=Ae.uniforms;const Fe=Y.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Fe.clippingPlanes=Se.uniform),kc(w,Ae),Y.needsLights=Md(w),Y.lightsStateVersion=ye,Y.needsLights&&(Fe.ambientLightColor.value=G.state.ambient,Fe.lightProbe.value=G.state.probe,Fe.directionalLights.value=G.state.directional,Fe.directionalLightShadows.value=G.state.directionalShadow,Fe.spotLights.value=G.state.spot,Fe.spotLightShadows.value=G.state.spotShadow,Fe.rectAreaLights.value=G.state.rectArea,Fe.ltc_1.value=G.state.rectAreaLTC1,Fe.ltc_2.value=G.state.rectAreaLTC2,Fe.pointLights.value=G.state.point,Fe.pointLightShadows.value=G.state.pointShadow,Fe.hemisphereLights.value=G.state.hemi,Fe.directionalShadowMap.value=G.state.directionalShadowMap,Fe.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Fe.spotShadowMap.value=G.state.spotShadowMap,Fe.spotLightMatrix.value=G.state.spotLightMatrix,Fe.spotLightMap.value=G.state.spotLightMap,Fe.pointShadowMap.value=G.state.pointShadowMap,Fe.pointShadowMatrix.value=G.state.pointShadowMatrix),Y.currentProgram=Ue,Y.uniformsList=null,Ue}function Fc(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=io.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function kc(w,U){const H=xe.get(w);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function Sd(w,U,H,Y,G){U.isScene!==!0&&(U=Te),fe.resetTextureUnits();const ge=U.fog,ye=Y.isMeshStandardMaterial?U.environment:null,Ae=T===null?v.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Yn,Ne=(Y.isMeshStandardMaterial?Ze:Ee).get(Y.envMap||ye),Be=Y.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ue=!!H.attributes.tangent&&(!!Y.normalMap||Y.anisotropy>0),Fe=!!H.morphAttributes.position,dt=!!H.morphAttributes.normal,Qt=!!H.morphAttributes.color;let bt=ci;Y.toneMapped&&(T===null||T.isXRRenderTarget===!0)&&(bt=v.toneMapping);const Ln=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ct=Ln!==void 0?Ln.length:0,Ve=xe.get(Y),Xo=m.state.lights;if(K===!0&&(Q===!0||w!==x)){const on=w===x&&Y.id===C;Se.setState(Y,w,on)}let lt=!1;Y.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==Xo.state.version||Ve.outputColorSpace!==Ae||G.isBatchedMesh&&Ve.batching===!1||!G.isBatchedMesh&&Ve.batching===!0||G.isInstancedMesh&&Ve.instancing===!1||!G.isInstancedMesh&&Ve.instancing===!0||G.isSkinnedMesh&&Ve.skinning===!1||!G.isSkinnedMesh&&Ve.skinning===!0||G.isInstancedMesh&&Ve.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Ve.instancingColor===!1&&G.instanceColor!==null||Ve.envMap!==Ne||Y.fog===!0&&Ve.fog!==ge||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Se.numPlanes||Ve.numIntersection!==Se.numIntersection)||Ve.vertexAlphas!==Be||Ve.vertexTangents!==Ue||Ve.morphTargets!==Fe||Ve.morphNormals!==dt||Ve.morphColors!==Qt||Ve.toneMapping!==bt||J.isWebGL2===!0&&Ve.morphTargetsCount!==ct)&&(lt=!0):(lt=!0,Ve.__version=Y.version);let gi=Ve.currentProgram;lt===!0&&(gi=Ar(Y,U,G));let Bc=!1,Bs=!1,Yo=!1;const Nt=gi.getUniforms(),vi=Ve.uniforms;if(te.useProgram(gi.program)&&(Bc=!0,Bs=!0,Yo=!0),Y.id!==C&&(C=Y.id,Bs=!0),Bc||x!==w){Nt.setValue(V,"projectionMatrix",w.projectionMatrix),Nt.setValue(V,"viewMatrix",w.matrixWorldInverse);const on=Nt.map.cameraPosition;on!==void 0&&on.setValue(V,we.setFromMatrixPosition(w.matrixWorld)),J.logarithmicDepthBuffer&&Nt.setValue(V,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(Y.isMeshPhongMaterial||Y.isMeshToonMaterial||Y.isMeshLambertMaterial||Y.isMeshBasicMaterial||Y.isMeshStandardMaterial||Y.isShaderMaterial)&&Nt.setValue(V,"isOrthographic",w.isOrthographicCamera===!0),x!==w&&(x=w,Bs=!0,Yo=!0)}if(G.isSkinnedMesh){Nt.setOptional(V,G,"bindMatrix"),Nt.setOptional(V,G,"bindMatrixInverse");const on=G.skeleton;on&&(J.floatVertexTextures?(on.boneTexture===null&&on.computeBoneTexture(),Nt.setValue(V,"boneTexture",on.boneTexture,fe)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}G.isBatchedMesh&&(Nt.setOptional(V,G,"batchingTexture"),Nt.setValue(V,"batchingTexture",G._matricesTexture,fe));const jo=H.morphAttributes;if((jo.position!==void 0||jo.normal!==void 0||jo.color!==void 0&&J.isWebGL2===!0)&&De.update(G,H,gi),(Bs||Ve.receiveShadow!==G.receiveShadow)&&(Ve.receiveShadow=G.receiveShadow,Nt.setValue(V,"receiveShadow",G.receiveShadow)),Y.isMeshGouraudMaterial&&Y.envMap!==null&&(vi.envMap.value=Ne,vi.flipEnvMap.value=Ne.isCubeTexture&&Ne.isRenderTargetTexture===!1?-1:1),Bs&&(Nt.setValue(V,"toneMappingExposure",v.toneMappingExposure),Ve.needsLights&&yd(vi,Yo),ge&&Y.fog===!0&&se.refreshFogUniforms(vi,ge),se.refreshMaterialUniforms(vi,Y,O,k,ue),io.upload(V,Fc(Ve),vi,fe)),Y.isShaderMaterial&&Y.uniformsNeedUpdate===!0&&(io.upload(V,Fc(Ve),vi,fe),Y.uniformsNeedUpdate=!1),Y.isSpriteMaterial&&Nt.setValue(V,"center",G.center),Nt.setValue(V,"modelViewMatrix",G.modelViewMatrix),Nt.setValue(V,"normalMatrix",G.normalMatrix),Nt.setValue(V,"modelMatrix",G.matrixWorld),Y.isShaderMaterial||Y.isRawShaderMaterial){const on=Y.uniformsGroups;for(let Zo=0,Td=on.length;Zo<Td;Zo++)if(J.isWebGL2){const Vc=on[Zo];Le.update(Vc,gi),Le.bind(Vc,gi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return gi}function yd(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function Md(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return E},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(w,U,H){xe.get(w.texture).__webglTexture=U,xe.get(w.depthTexture).__webglTexture=H;const Y=xe.get(w);Y.__hasExternalTextures=!0,Y.__hasExternalTextures&&(Y.__autoAllocateDepthBuffer=H===void 0,Y.__autoAllocateDepthBuffer||Me.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Y.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(w,U){const H=xe.get(w);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(w,U=0,H=0){T=w,S=U,E=H;let Y=!0,G=null,ge=!1,ye=!1;if(w){const Ne=xe.get(w);Ne.__useDefaultFramebuffer!==void 0?(te.bindFramebuffer(V.FRAMEBUFFER,null),Y=!1):Ne.__webglFramebuffer===void 0?fe.setupRenderTarget(w):Ne.__hasExternalTextures&&fe.rebindTextures(w,xe.get(w.texture).__webglTexture,xe.get(w.depthTexture).__webglTexture);const Be=w.texture;(Be.isData3DTexture||Be.isDataArrayTexture||Be.isCompressedArrayTexture)&&(ye=!0);const Ue=xe.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ue[U])?G=Ue[U][H]:G=Ue[U],ge=!0):J.isWebGL2&&w.samples>0&&fe.useMultisampledRTT(w)===!1?G=xe.get(w).__webglMultisampledFramebuffer:Array.isArray(Ue)?G=Ue[H]:G=Ue,b.copy(w.viewport),D.copy(w.scissor),L=w.scissorTest}else b.copy(q).multiplyScalar(O).floor(),D.copy(j).multiplyScalar(O).floor(),L=ie;if(te.bindFramebuffer(V.FRAMEBUFFER,G)&&J.drawBuffers&&Y&&te.drawBuffers(w,G),te.viewport(b),te.scissor(D),te.setScissorTest(L),ge){const Ne=xe.get(w.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+U,Ne.__webglTexture,H)}else if(ye){const Ne=xe.get(w.texture),Be=U||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,Ne.__webglTexture,H||0,Be)}C=-1},this.readRenderTargetPixels=function(w,U,H,Y,G,ge,ye){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ae=xe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ye!==void 0&&(Ae=Ae[ye]),Ae){te.bindFramebuffer(V.FRAMEBUFFER,Ae);try{const Ne=w.texture,Be=Ne.format,Ue=Ne.type;if(Be!==xn&&$e.convert(Be)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Fe=Ue===ur&&(Me.has("EXT_color_buffer_half_float")||J.isWebGL2&&Me.has("EXT_color_buffer_float"));if(Ue!==li&&$e.convert(Ue)!==V.getParameter(V.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ue===ri&&(J.isWebGL2||Me.has("OES_texture_float")||Me.has("WEBGL_color_buffer_float")))&&!Fe){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-Y&&H>=0&&H<=w.height-G&&V.readPixels(U,H,Y,G,$e.convert(Be),$e.convert(Ue),ge)}finally{const Ne=T!==null?xe.get(T).__webglFramebuffer:null;te.bindFramebuffer(V.FRAMEBUFFER,Ne)}}},this.copyFramebufferToTexture=function(w,U,H=0){const Y=Math.pow(2,-H),G=Math.floor(U.image.width*Y),ge=Math.floor(U.image.height*Y);fe.setTexture2D(U,0),V.copyTexSubImage2D(V.TEXTURE_2D,H,0,0,w.x,w.y,G,ge),te.unbindTexture()},this.copyTextureToTexture=function(w,U,H,Y=0){const G=U.image.width,ge=U.image.height,ye=$e.convert(H.format),Ae=$e.convert(H.type);fe.setTexture2D(H,0),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,H.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,H.unpackAlignment),U.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Y,w.x,w.y,G,ge,ye,Ae,U.image.data):U.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Y,w.x,w.y,U.mipmaps[0].width,U.mipmaps[0].height,ye,U.mipmaps[0].data):V.texSubImage2D(V.TEXTURE_2D,Y,w.x,w.y,ye,Ae,U.image),Y===0&&H.generateMipmaps&&V.generateMipmap(V.TEXTURE_2D),te.unbindTexture()},this.copyTextureToTexture3D=function(w,U,H,Y,G=0){if(v.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const ge=w.max.x-w.min.x+1,ye=w.max.y-w.min.y+1,Ae=w.max.z-w.min.z+1,Ne=$e.convert(Y.format),Be=$e.convert(Y.type);let Ue;if(Y.isData3DTexture)fe.setTexture3D(Y,0),Ue=V.TEXTURE_3D;else if(Y.isDataArrayTexture)fe.setTexture2DArray(Y,0),Ue=V.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,Y.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,Y.unpackAlignment);const Fe=V.getParameter(V.UNPACK_ROW_LENGTH),dt=V.getParameter(V.UNPACK_IMAGE_HEIGHT),Qt=V.getParameter(V.UNPACK_SKIP_PIXELS),bt=V.getParameter(V.UNPACK_SKIP_ROWS),Ln=V.getParameter(V.UNPACK_SKIP_IMAGES),ct=H.isCompressedTexture?H.mipmaps[0]:H.image;V.pixelStorei(V.UNPACK_ROW_LENGTH,ct.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,ct.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,w.min.x),V.pixelStorei(V.UNPACK_SKIP_ROWS,w.min.y),V.pixelStorei(V.UNPACK_SKIP_IMAGES,w.min.z),H.isDataTexture||H.isData3DTexture?V.texSubImage3D(Ue,G,U.x,U.y,U.z,ge,ye,Ae,Ne,Be,ct.data):H.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),V.compressedTexSubImage3D(Ue,G,U.x,U.y,U.z,ge,ye,Ae,Ne,ct.data)):V.texSubImage3D(Ue,G,U.x,U.y,U.z,ge,ye,Ae,Ne,Be,ct),V.pixelStorei(V.UNPACK_ROW_LENGTH,Fe),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,dt),V.pixelStorei(V.UNPACK_SKIP_PIXELS,Qt),V.pixelStorei(V.UNPACK_SKIP_ROWS,bt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,Ln),G===0&&Y.generateMipmaps&&V.generateMipmap(Ue),te.unbindTexture()},this.initTexture=function(w){w.isCubeTexture?fe.setTextureCube(w,0):w.isData3DTexture?fe.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?fe.setTexture2DArray(w,0):fe.setTexture2D(w,0),te.unbindTexture()},this.resetState=function(){S=0,E=0,T=null,te.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===wc?"display-p3":"srgb",t.unpackColorSpace=Ke.workingColorSpace===Ho?"display-p3":"srgb"}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(e){console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!e}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===vt?Oi:$h}set outputEncoding(e){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=e===Oi?vt:Yn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(e){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=e}}class LT extends vd{}LT.prototype.isWebGL1Renderer=!0;class NT extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t}}class IT extends Yt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isVideoTexture=!0,this.minFilter=a!==void 0?a:At,this.magFilter=r!==void 0?r:At,this.generateMipmaps=!1;const u=this;function h(){u.needsUpdate=!0,e.requestVideoFrameCallback(h)}"requestVideoFrameCallback"in e&&e.requestVideoFrameCallback(h)}clone(){return new this.constructor(this.image).copy(this)}update(){const e=this.image;"requestVideoFrameCallback"in e===!1&&e.readyState>=e.HAVE_CURRENT_DATA&&(this.needsUpdate=!0)}}class OT extends br{constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ye(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Kh,this.normalScale=new Xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Au={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class UT{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,h){return l.push(u,h),this},this.removeHandler=function(u){const h=l.indexOf(u);return h!==-1&&l.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=l.length;h<d;h+=2){const p=l[h],_=l[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return _}return null}}}const FT=new UT;class Ic{constructor(e){this.manager=e!==void 0?e:FT,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Ic.DEFAULT_MATERIAL_NAME="__DEFAULT";class kT extends Ic{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=Au.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=dr("img");function c(){u(),Au.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class BT extends Ic{constructor(e){super(e)}load(e,t,n,s){const r=new Yt,a=new kT(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class VT extends Ut{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),t}}const Aa=new xt,Cu=new W,Ru=new W;class zT{constructor(e){this.camera=e,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xe(512,512),this.map=null,this.mapPass=null,this.matrix=new xt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pc,this._frameExtents=new Xe(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Cu.setFromMatrixPosition(e.matrixWorld),t.position.copy(Cu),Ru.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ru),t.updateMatrixWorld(),Aa.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Aa),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Aa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class GT extends zT{constructor(){super(new Lc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class HT extends VT{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new GT}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class WT{constructor(e,t,n=0,s=1/0){this.ray=new id(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Rc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}intersectObject(e,t=!0,n=[]){return Za(e,this,n,t),n.sort(Pu),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)Za(e[s],this,n,t);return n.sort(Pu),n}}function Pu(i,e){return i.distance-e.distance}function Za(i,e,t,n){if(i.layers.test(e.layers)&&i.raycast(e,t),n===!0){const s=i.children;for(let r=0,a=s.length;r<a;r++)Za(s[r],e,t,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ec}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ec);class qT{static isWebGLAvailable(){try{const e=document.createElement("canvas");return!!(window.WebGLRenderingContext&&(e.getContext("webgl")||e.getContext("experimental-webgl")))}catch{return!1}}static isWebGL2Available(){try{const e=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&e.getContext("webgl2"))}catch{return!1}}static isColorSpaceAvailable(e){try{const t=document.createElement("canvas"),n=window.WebGL2RenderingContext&&t.getContext("webgl2");return n.drawingBufferColorSpace=e,n.drawingBufferColorSpace===e}catch{return!1}}static getWebGLErrorMessage(){return this.getErrorMessage(1)}static getWebGL2ErrorMessage(){return this.getErrorMessage(2)}static getErrorMessage(e){const t={1:"WebGL",2:"WebGL 2"},n={1:window.WebGLRenderingContext,2:window.WebGL2RenderingContext};let s='Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';const r=document.createElement("div");return r.id="webglmessage",r.style.fontFamily="monospace",r.style.fontSize="13px",r.style.fontWeight="normal",r.style.textAlign="center",r.style.background="#fff",r.style.color="#000",r.style.padding="1.5em",r.style.width="400px",r.style.margin="5em auto 0",n[e]?s=s.replace("$0","graphics card"):s=s.replace("$0","browser"),s=s.replace("$1",t[e]),r.innerHTML=s,r}}const Du=qT;dn(document).ready(function(){function i(e){e.hover(function(){e.addClass("fontStretch")},function(){e.removeClass("fontStretch")})}dn(".headerContent").hover(function(){dn(this).addClass("fontStretch")},function(){dn(this).removeClass("fontStretch")}),i(dn(".titleText")),dn("a").hover(function(){dn(this).css("background-color","white")},function(){dn(this).css("background-color","")}),dn("#instruction").hover(function(){dn(this).css("filter","blur(0px)")},function(){dn(this).css("filter","blur(1px)")})});class $a{constructor(){const e=new To(zi).toDestination();mv(),e.triggerAttackRelease(["D3"],"32n")}}const XT=document.getElementById("instruction");XT.addEventListener("click",async()=>{await ka(),console.log("audio is ready"),new $a});if(Du.isWebGLAvailable()){let g=function(T,C,x){const b=x.load(C.imageSrc);b.colorSpace=vt,b.minFilter=At,b.magFilter=At,b.wrapS=qt,b.wrapT=qt,T.map=b,T.needsUpdate=!0;const D=document.createElement("video");D.src=C.videoSrc,D.crossOrigin="anonymous",D.loop=!0,D.muted=!0,D.autoplay=!0,D.playsInline=!0,D.load(),D.addEventListener("canplaythrough",()=>{D.play().catch(()=>{});const L=new IT(D);L.colorSpace=vt,L.minFilter=At,L.magFilter=At,L.wrapS=qt,L.wrapT=qt,T.map=L,T.needsUpdate=!0}),D.addEventListener("error",()=>{T.map=b,T.needsUpdate=!0})},m=function(){const T=window.innerWidth/window.innerHeight;t=new Lc(_*T/-2,_*T/2,_/2,_/-2,.1,1e3),n=new NT,n.background=new Ye(4293848581);const C=new HT(16776656,3);C.position.set(1,1,1).normalize(),n.add(C);const x=new Fs,b=new BT;for(let D=0;D<Object.keys(i).length;D++){const L=e[D]||e[0],F=new OT;g(F,L,b);const P=new Gn(x,F);P.position.x=Math.random()*40-20,P.position.y=Math.random()*40-20,P.position.z=Math.random()*40-20,P.rotation.x=Math.random()*2*Math.PI,P.rotation.y=Math.random()*2*Math.PI,P.rotation.z=Math.random()*2*Math.PI;const I=h?1.2:1;P.scale.x=(Math.random()+5)*I,P.scale.y=(Math.random()+4)*I,P.scale.z=(Math.random()+5)*I,P.userData={URL:i[D]},n.add(P)}s=new WT,r=new vd({antialias:!0}),r.setPixelRatio(window.devicePixelRatio),r.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(r.domElement),h?(document.addEventListener("touchstart",v,{passive:!1}),console.log("touch device detected")):(document.addEventListener("pointermove",y),document.addEventListener("click",A,!1)),window.addEventListener("resize",f)},f=function(){const T=window.innerWidth/window.innerHeight;t.left=-_*T/2,t.right=_*T/2,t.top=_/2,t.bottom=-_/2,t.updateProjectionMatrix(),r.setSize(window.innerWidth,window.innerHeight)},y=function(T){d.x=T.clientX/window.innerWidth*2-1,d.y=-(T.clientY/window.innerHeight)*2+1},v=function(T){if(!h||T.touches.length===0)return;const C=T.touches[0],x=C.clientX/window.innerWidth*2-1,b=-(C.clientY/window.innerHeight)*2+1,D=new Xe(x,b);s.setFromCamera(D,t);const L=s.intersectObjects(n.children,!1);if(L.length>0){const F=L[0].object;o&&o!==F&&o.material.emissive.setHex(o.currentHex),o=F,o.currentHex=o.material.emissive.getHex(),o.material.emissive.setHex(16711680),ka(),new $a,T.preventDefault(),setTimeout(()=>{window.location.href=F.userData.URL},180)}},A=function(){o&&(window.location.href=o.userData.URL,console.log("clicked"))},S=function(){requestAnimationFrame(S),E()},E=function(){a+=.1,t.position.x=p*Math.sin(ia.degToRad(a)),t.position.y=p*Math.sin(ia.degToRad(a)),t.position.z=p*Math.cos(ia.degToRad(a)),t.lookAt(n.position),t.updateMatrixWorld(),s.setFromCamera(d,t);const T=s.intersectObjects(n.children,!1);T.length>0?o!=T[0].object&&(o&&o.material.emissive.setHex(o.currentHex),o=T[0].object,o.currentHex=o.material.emissive.getHex(),o.material.emissive.setHex(16711680),h||(ka(),new $a)):(o&&o.material.emissive.setHex(o.currentHex),o=null),r.render(n,t)},i={0:"pages/work/machineNman.html",1:"pages/work/bitRot.html",2:"pages/work/terms.html",3:"pages/work/beluchaga.html",4:"pages/work/mashUp.html",5:"pages/work/radio.html",6:"pages/work/fern.html",7:"pages/work/2005fordTaurus.html",8:"pages/work/autoVirtual.html",9:"pages/work/slowing.html",10:"pages/work/m.c.Dean.html"};const e={0:{videoSrc:new URL("/static/machineNman-HI3l41tT.webm",import.meta.url).href,imageSrc:new URL("/static/machineNman-sgkfGMee.gif",import.meta.url).href},1:{videoSrc:new URL("/static/bitRotSmall-swFltTSE.webm",import.meta.url).href,imageSrc:new URL("/static/bitRot-U-XGX0oV.gif",import.meta.url).href},2:{videoSrc:new URL("/static/terms-AipImrfx.webm",import.meta.url).href,imageSrc:new URL("/static/terms-8IxT4fKm.gif",import.meta.url).href},3:{videoSrc:new URL("/static/beluchaga-TdHi-6H_.webm",import.meta.url).href,imageSrc:new URL("/static/beluchaga-hsT4ggBH.gif",import.meta.url).href},4:{videoSrc:new URL("/static/mashUp-nmiCKleE.webm",import.meta.url).href,imageSrc:new URL("/static/mashUp-YcsgxG6i.gif",import.meta.url).href},5:{videoSrc:new URL("/static/radio-mx86Xw-C.webm",import.meta.url).href,imageSrc:new URL("/static/radio--n89hXGG.gif",import.meta.url).href},6:{videoSrc:new URL("/static/fern-Ft0BePLp.webm",import.meta.url).href,imageSrc:new URL("/static/fern-2yHetRKi.gif",import.meta.url).href},7:{videoSrc:new URL("/static/2005fordTaurus-K9DaFM2L.webm",import.meta.url).href,imageSrc:new URL("/static/2005fordTaurus-mwY51xzL.gif",import.meta.url).href},8:{videoSrc:new URL("/static/autoVirtual-spTaAVYf.webm",import.meta.url).href,imageSrc:new URL("/static/autoVirtual-uGaMpiaf.gif",import.meta.url).href},9:{videoSrc:new URL("/static/slowingArchive-c8uHG6An.webm",import.meta.url).href,imageSrc:new URL("/static/slowingArchive-cVkgMry6.gif",import.meta.url).href},10:{videoSrc:new URL("/static/slowingSculpture-ldyUE-ur.webm",import.meta.url).href,imageSrc:new URL("/static/slowingSculpture-egotqjjO.gif",import.meta.url).href}};let t,n,s,r,a=0,o;const c=window.matchMedia("(hover: hover)").matches,l=window.matchMedia("(pointer: fine)").matches||window.matchMedia("(any-pointer: fine)").matches,u="ontouchstart"in window||navigator.maxTouchPoints>0,h=window.matchMedia("(pointer: coarse)").matches||window.matchMedia("(hover: none)").matches||window.matchMedia("(pointer: none)").matches||u&&(!c||!l),d=new Xe,p=25,_=50;m(),S()}else{const i=Du.getWebGLErrorMessage();document.getElementById("container").appendChild(i)}
