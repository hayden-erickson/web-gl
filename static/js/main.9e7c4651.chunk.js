(window["webpackJsonpweb-gl"]=window["webpackJsonpweb-gl"]||[]).push([[0],{31:function(e,t,n){e.exports=n(42)},36:function(e,t,n){},37:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r,a=n(0),o=n.n(a),i=n(16),c=n.n(i);n(36),n(37);!function(e){e.SET_CONTEXT="SET_CONTEXT"}(r||(r={}));var d,s={context:void 0};!function(e){e.ROTATE="ROTATE",e.TRANSLATE="TRANSLATE",e.SCALE="SCALE",e.MODIFY_SCALE="MODIFY_SCALE",e.MODIFY_ROTATION="MODIFY_ROTATION",e.SET_ANCHOR="SET_ANCHOR",e.SET_ORIGINAL_ROTATION="SET_ORIGINAL_ROTATION",e.SET_ROTATION_DELTA="SET_ROTATION_DELTA",e.CALC_ROT="CALC_ROT"}(d||(d={}));var u=n(44),l=n(5);function p(e){return function(t,n){return void 0===t?null:n.type!==e?t:n.payload}}var v=p(d.SET_ANCHOR),O=p(d.SET_ORIGINAL_ROTATION),b=p(d.SET_ROTATION_DELTA);var h=Object(l.c)({rotation:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[0,0,0],t=arguments.length>1?arguments[1]:void 0;if(!t.payload)return e;switch(t.type){case d.ROTATE:return t.payload;case d.MODIFY_ROTATION:return Object(u.a)(e,t.payload).valueOf();default:return e}},translation:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[0,0,0],t=arguments.length>1?arguments[1]:void 0;return t.type!==d.TRANSLATE?e:null===t.payload?e:t.payload},scale:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[1,1,1],t=arguments.length>1?arguments[1]:void 0;if(!t.payload)return e;switch(t.type){case d.SCALE:return t.payload;case d.MODIFY_SCALE:return Object(u.a)(e,t.payload).valueOf();default:return e}},anchor:v,originalRotation:O,rotationDelta:b}),m=n(30),f=function(e){return function(t){return{type:e,payload:t}}},E=f("UPDATE_BOX"),g=f("UPDATE_BEAM_BOX"),y=Object(u.c)([[0,0,0],[32,16,8],[0,0,0]]),T=Object(u.c)([[0,0,0],[64,64,4],[0,0,0]]),w=Object(l.c)({beamBox:function(e,t){return void 0===e?T:"UPDATE_BEAM_BOX"===t.type?Object(u.a)(t.payload,e):e},box:function(e,t){return void 0===e?y:"UPDATE_BOX"===t.type?Object(u.a)(t.payload,e):e},rays:function(e,t){return void 0===e?0:"SET_RAY_COUNT"===t.type?t.payload:e},inverted:function(e,t){return"INVERT_BEAMS"===t.type?!e:!!e},recording:function(e,t){return void 0===e||("TOGGLE_RECORDING"===t.type?!e:e)},opacities:function(e,t){if(void 0===e)return Array(256);if("SAVE_OPACITY"===t.type){var n=Array.of.apply(Array,Object(m.a)(e));return n.unshift(t.payload),n.pop(),n}return e}}),R=Object(l.c)({webgl:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1?arguments[1]:void 0;if(void 0===t)return e;switch(t.type){case r.SET_CONTEXT:return{context:t.payload};default:return e}},projections:h,radon:w}),A=n(17),_=n(28),x=n(4),C=n(13),I=n(12),j=n(14),S=n(11),D=n(23),L=n(29),N=n(1),B=function(e){return o.a.createElement("div",{style:{padding:"16px"}},o.a.createElement("button",{style:{cursor:"pointer",color:e.inverted?"white":"black",backgroundColor:e.inverted?"black":"white",fontSize:"32px",padding:"8px",borderRadius:"8px"},onClick:e.invert},"Invert"))},M=function(e){return o.a.createElement("div",null,o.a.createElement("h1",{style:{color:"white"}},e.rayCount," Beam",e.rayCount>1?"s":""),o.a.createElement("input",{type:"range",min:0,max:e.maxRayCount,value:e.numRays,onChange:function(t){return e.setRayCount(parseInt(t.target.value))}}))},G=function(e){return o.a.createElement("div",{style:{color:"white",cursor:"pointer",padding:"8px",fontSize:"32px"},onClick:e.toggleRecording},o.a.createElement("span",{style:{padding:"4px"}},e.recording?"Stop":"Record"),o.a.createElement("button",{style:{cursor:"pointer",borderRadius:e.recording?"0px":"12px",height:"24px",width:"24px",backgroundColor:e.recording?"rgba(0, 0, 0, 0)":"red"}}))},k=function(e){return o.a.createElement("div",{id:"controls",style:{position:"absolute",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px"}},o.a.createElement(M,e),o.a.createElement(B,e),o.a.createElement(G,e))},Y=function(e,t,n){return new N.s(e,t,n)};function P(e,t){return e.subset(Object(u.b)(t,[0,1,2])).toArray()[0]}function X(e,t){var n=P(e,0),r=Object(x.a)(n,3),a=r[0],o=r[1],i=r[2],c=P(e,1),d=Object(x.a)(c,3),s=d[0],u=d[1],l=d[2],p=P(e,2),v=Object(x.a)(p,3),O=v[0],b=v[1],h=v[2],m=new N.a(s,u,l);return m.translate(a,o,i),m.rotateX(O),m.rotateY(b),m.rotateZ(h),new N.g(m,function(e){var t=function(){return new N.b(e)};return new N.i({specular:t(),color:t().addScalar(-.3),emissive:t().addScalar(-.8),shininess:50,wireframe:!1,side:N.d})}(t||16777215))}var U=function(e,t){var n=P(e,0),r=Object(x.a)(n,3),a=r[0],o=r[1],i=r[2],c=P(e,1),d=Object(x.a)(c,2),s=d[0],u=d[1],l=P(e,2),p=Object(x.a)(l,3),v=p[0],O=p[1],b=p[2],h=new N.k(s,u);h.rotateX(v),h.rotateY(O),h.rotateZ(b),h.translate(a,o,i);var m=new N.h({transparent:!0,opacity:0,map:null});return new N.g(h,t||m)},F=function(){function e(t){var n=this;Object(S.a)(this,e),this.webGLRenderer=void 0,this.camera=void 0,this.scene=void 0,this.webGLRenderer=new N.t,this.webGLRenderer.setSize(window.innerWidth,window.innerHeight),this.webGLRenderer.setPixelRatio(window.devicePixelRatio),this.scene=new N.n,this.camera=new N.j(80,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.x=0,this.camera.position.y=20,this.camera.position.z=150;var r=new N.c(16645629,2);r.position.set(-2,2,1).normalize(),this.scene.add(r),new L.a(this.camera,this.webGLRenderer.domElement),t.forEach(function(e){return n.scene.add(e)})}return Object(D.a)(e,[{key:"render",value:function(){var e=this;return this.webGLRenderer.render(this.scene,this.camera),o.a.createElement("div",{id:"scene-container",ref:function(t){return t?t.appendChild(e.webGLRenderer.domElement):""}})}}]),e}(),z=function(e){function t(e){var n;Object(S.a)(this,t),(n=Object(C.a)(this,Object(I.a)(t).call(this,e))).rs=void 0,n.b=void 0,n.bb=void 0,n.screen=void 0,n.tl=void 0,n.beamData=void 0,n.recording=void 0,n.beamData="",n.recording=!1,n.tl=new N.q,n.b=X(n.props.box,255),n.bb=U(n.props.beamBox);var r=P(n.props.beamBox,0),a=Object(x.a)(r,3),o=a[0],i=a[1],c=a[2],d=P(n.props.beamBox,1),s=Object(x.a)(d,3),l=s[0],p=s[1],v=s[2];n.screen=U(Object(u.c)([[o+l/2,i,c+l/2],[l,p,v],[0,-Math.PI/2,0]])),n.rs=new F([n.b,n.bb,n.screen]);var O=Math.PI/(4*l);return requestAnimationFrame(function e(){n.b.rotateZ(O),n.props.rotateBox(O);var t=Math.pow(2,Math.floor(n.props.numRays)),r=n.bb,a=function(e,t,n,r){var a=P(t,0),o=Object(x.a)(a,3),i=o[0],c=o[1],d=o[2],s=P(t,1),u=Object(x.a)(s,2),l=u[0],p=u[1],v=document.createElement("canvas");v.height=p,v.width=l;var O=v.getContext("2d");if(null===O)return"";for(var b=O.createImageData(l,p),h=[],m=0;m<n;m++){var f=Math.floor(c+m*(p/n)+p/(2*n)),E=f*l*4,g=E+4*l,y=Y(i-l/2,p/2-f,d),T=Y(i+l/2,p/2-f,d),w=new N.m(y,T.sub(y).normalize()).intersectObject(e),R=r.inv?0:255,A=g,_=0;switch(w.length){case 2:_=(w[1].distance-w[0].distance)/40,R=r.inv?255*_:255*(1-_),A=w[1].distance;break;case 4:_=(w[2].distance-w[1].distance)/40,R=r.inv?255*_:255*(1-_),A=w[2].distance}for(var C=r.inv?0:255,I=E;I<g;I+=4)b.data[I]=255,b.data[I+1]=255,b.data[I+2]=255,b.data[I+3]=(I-E)/4>=A-2?R:C;h.push(R)}return r.recording&&r.saveOpacity(h),O.putImageData(b,0,0),v.toDataURL()}(n.b,n.props.beamBox,t,{inv:n.props.inverted,recording:n.props.recording,saveOpacity:n.props.saveOpacity});a&&a!==n.beamData&&(n.tl.load(a,function(e){r.material=new N.h({map:e,transparent:!0})}),n.beamData=a);var o=n.screen;if(n.props.recording){var i=function(e,t){var n=P(e,1),r=Object(x.a)(n,2),a=r[0],o=r[1];a*=4;var i=document.createElement("canvas");i.height=o,i.width=a;var c=i.getContext("2d");if(null===c)return"";for(var d=c.createImageData(a,o),s=0;s<t.length;s++)for(var u=t[s]?t[s].length:0,l=0;l<u;l++){var p=4*(Math.floor(l*(o/u)+o/(2*u))*a+s);d.data[p]=255,d.data[p+1]=255,d.data[p+2]=255,d.data[p+3]=t[s][l]}return c.putImageData(d,0,0),i.toDataURL()}(n.props.beamBox,n.props.opacities);n.tl.load(i,function(e){o.material=new N.h({map:e,transparent:!0})}),n.recording=!0}else n.recording&&!n.props.recording&&(o.material=new N.h({transparent:!0,opacity:0}),n.recording=!1);requestAnimationFrame(e)}),n}return Object(j.a)(t,e),Object(D.a)(t,[{key:"render",value:function(){var e=P(this.props.beamBox,1)[1],t=Math.ceil(Math.log2(e)),n=Math.pow(2,Math.floor(this.props.numRays));return o.a.createElement("div",null,o.a.createElement(k,{inverted:this.props.inverted,invert:this.props.invertBeams,rayCount:n,maxRayCount:t,numRays:this.props.numRays,setRayCount:this.props.setRayCount,recording:this.props.recording,toggleRecording:this.props.toggleRecording}),this.rs.render())}}]),t}(a.Component),H=function(e){return Object(u.c)([[0,0,0],[0,0,0],[0,0,e]])},V=Object(A.b)(function(e){return{box:e.radon.box,beamBox:e.radon.beamBox,numRays:e.radon.rays,inverted:e.radon.inverted,recording:e.radon.recording,opacities:e.radon.opacities}},function(e){return{rotateBox:function(t){return e(E(H(t)))},rotateBeamBox:function(t){return e(g(H(t)))},setRayCount:function(t){return e(function(e){return{type:"SET_RAY_COUNT",payload:e}}(t))},invertBeams:function(){return e({type:"INVERT_BEAMS"})},saveOpacity:function(t){return e({type:"SAVE_OPACITY",payload:t})},toggleRecording:function(){return e({type:"TOGGLE_RECORDING"})}}})(z),W=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.d,q=Object(l.e)(R,W(Object(l.a)(_.a))),Z=function(){return o.a.createElement(A.a,{store:q},o.a.createElement(V,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[31,1,2]]]);
//# sourceMappingURL=main.9e7c4651.chunk.js.map