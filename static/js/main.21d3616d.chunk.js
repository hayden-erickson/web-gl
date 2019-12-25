(window["webpackJsonpweb-gl"]=window["webpackJsonpweb-gl"]||[]).push([[0],{30:function(e,t,n){e.exports=n(41)},35:function(e,t,n){},36:function(e,t,n){},41:function(e,t,n){"use strict";n.r(t);var a,r=n(2),o=n.n(r),i=n(15),c=n.n(i);n(35),n(36);!function(e){e.SET_CONTEXT="SET_CONTEXT"}(a||(a={}));var s,u={context:void 0};!function(e){e.ROTATE="ROTATE",e.TRANSLATE="TRANSLATE",e.SCALE="SCALE",e.MODIFY_SCALE="MODIFY_SCALE",e.MODIFY_ROTATION="MODIFY_ROTATION",e.SET_ANCHOR="SET_ANCHOR",e.SET_ORIGINAL_ROTATION="SET_ORIGINAL_ROTATION",e.SET_ROTATION_DELTA="SET_ROTATION_DELTA",e.CALC_ROT="CALC_ROT"}(s||(s={}));var d=n(43),l=n(4);function p(e){return function(t,n){return void 0===t?null:n.type!==e?t:n.payload}}var b=p(s.SET_ANCHOR),h=p(s.SET_ORIGINAL_ROTATION),O=p(s.SET_ROTATION_DELTA);var v=Object(l.c)({rotation:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[0,0,0],t=arguments.length>1?arguments[1]:void 0;if(!t.payload)return e;switch(t.type){case s.ROTATE:return t.payload;case s.MODIFY_ROTATION:return Object(d.a)(e,t.payload).valueOf();default:return e}},translation:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[0,0,0],t=arguments.length>1?arguments[1]:void 0;return t.type!==s.TRANSLATE?e:null===t.payload?e:t.payload},scale:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[1,1,1],t=arguments.length>1?arguments[1]:void 0;if(!t.payload)return e;switch(t.type){case s.SCALE:return t.payload;case s.MODIFY_SCALE:return Object(d.a)(e,t.payload).valueOf();default:return e}},anchor:b,originalRotation:h,rotationDelta:O}),m=function(e){return function(t){return{type:e,payload:t}}},f=m("UPDATE_BOX"),T=m("UPDATE_BEAM_BOX"),E=Object(d.c)([[0,0,0],[32,16,8],[0,0,0]]),w=Object(d.c)([[-64,0,0],[128,64,4],[0,0,0]]),A=Object(l.c)({beamBox:function(e,t){return void 0===e?w:"UPDATE_BEAM_BOX"===t.type?Object(d.a)(t.payload,e):e},box:function(e,t){return void 0===e?E:"UPDATE_BOX"===t.type?Object(d.a)(t.payload,e):e},rays:function(e,t){return void 0===e?7:"SET_RAY_COUNT"===t.type?t.payload:e},inverted:function(e,t){return"INVERT_BEAMS"===t.type?!e:!!e}}),y=Object(l.c)({webgl:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;if(void 0===t)return e;switch(t.type){case a.SET_CONTEXT:return{context:t.payload};default:return e}},projections:v,radon:A}),_=n(16),R=n(28),g=n(13),j=n(12),S=n(14),I=n(11),x=n(23),C=n(6),N=n(29),B=n(0),L=function(e,t,n){return new B.s(e,t,n)};function D(e,t){return e.subset(Object(d.b)(t,[0,1,2])).toArray()[0]}function M(e,t){var n=D(e,0),a=Object(C.a)(n,3),r=a[0],o=a[1],i=a[2],c=D(e,1),s=Object(C.a)(c,3),u=s[0],d=s[1],l=s[2],p=D(e,2),b=Object(C.a)(p,3),h=b[0],O=b[1],v=b[2],m=new B.a(u,d,l);return m.translate(r,o,i),m.rotateX(h),m.rotateY(O),m.rotateZ(v),new B.g(m,function(e){var t=function(){return new B.b(e)};return new B.i({specular:t(),color:t().addScalar(-.3),emissive:t().addScalar(-.8),shininess:50,wireframe:!1,side:B.d})}(t||16777215))}var k=function(e,t){var n=D(e,1),a=Object(C.a)(n,2),r=a[0],o=a[1],i=new B.k(r,o),c=new B.h(t||{transparent:!0,opacity:0,map:null});return new B.g(i,c)},G=function(){function e(t){var n=this;Object(I.a)(this,e),this.webGLRenderer=void 0,this.camera=void 0,this.scene=void 0,this.webGLRenderer=new B.t,this.webGLRenderer.setSize(window.innerWidth,window.innerHeight),this.webGLRenderer.setPixelRatio(window.devicePixelRatio),this.scene=new B.n,this.camera=new B.j(80,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.x=0,this.camera.position.y=0,this.camera.position.z=100;var a=new B.c(16645629,2);a.position.set(2,2,1).normalize(),this.scene.add(a),new N.a(this.camera,this.webGLRenderer.domElement),t.forEach(function(e){return n.scene.add(e)})}return Object(x.a)(e,[{key:"render",value:function(){var e=this;return this.webGLRenderer.render(this.scene,this.camera),o.a.createElement("div",{id:"scene-container",ref:function(t){return t?t.appendChild(e.webGLRenderer.domElement):""}})}}]),e}(),X=function(e){return o.a.createElement("div",{style:{padding:"16px"}},o.a.createElement("button",{style:{color:e.inverted?"white":"black",backgroundColor:e.inverted?"black":"white",fontSize:"16px"},onClick:e.invert},"Invert"))},Y=function(e){function t(e){var n;Object(I.a)(this,t),(n=Object(g.a)(this,Object(j.a)(t).call(this,e))).rs=void 0,n.b=void 0,n.bb=void 0,n.screen=void 0,n.tl=void 0,n.beamData=void 0;requestAnimationFrame(function e(){n.props.rotateBeamBox(.01),requestAnimationFrame(e)}),n.beamData="",n.tl=new B.q,n.b=M(n.props.box,255),n.bb=k(n.props.beamBox);var a=D(n.props.beamBox,0),r=Object(C.a)(a,3),o=r[0],i=r[1],c=r[2],s=D(n.props.beamBox,1),u=Object(C.a)(s,3),l=u[0],p=u[1],b=u[2];return n.screen=k(Object(d.c)([[o+l,i,c],[l,p,b],[0,-Math.PI,0]]),{transparent:!1,color:16777215}),n.rs=new G([n.b,n.bb]),n}return Object(S.a)(t,e),Object(x.a)(t,[{key:"render",value:function(){var e=this;this.b.rotateZ(.01);var t=D(this.props.beamBox,1)[1],n=Math.ceil(Math.log2(t)),a=Math.pow(2,Math.floor(this.props.numRays)),r=this.bb,i=function(e,t,n,a){var r=D(t,0),o=Object(C.a)(r,3),i=o[0],c=o[1],s=o[2],u=D(t,1),d=Object(C.a)(u,2),l=d[0],p=d[1],b=document.createElement("canvas");b.height=p,b.width=l;var h=b.getContext("2d");if(null!==h){for(var O=h.createImageData(l,p),v=0;v<n;v++){var m=Math.floor(c+v*(p/n)+p/(2*n)),f=m*l*4,T=f+4*l,E=L(i,p/2-m,s),w=L(i+l,p/2-m,s),A=new B.m(E,w.sub(E).normalize()).intersectObject(e),y=255,_=T,R=0;switch(A.length){case 2:R=(A[1].distance-A[0].distance)/40,y=a?255*R:255*(1-R),_=A[1].distance;break;case 4:R=(A[2].distance-A[1].distance)/40,y=a?255*R:255*(1-R),_=A[2].distance}for(var g=a?0:255,j=f;j<T;j+=4)O.data[j]=255,O.data[j+1]=255,O.data[j+2]=255,O.data[j+3]=(j-f)/4>=_-2?y:g}return h.putImageData(O,0,0),b.toDataURL()}}(this.b,this.props.beamBox,a,this.props.inverted);return i&&i!==this.beamData&&(this.tl.load(i,function(e){r.material=new B.h({map:e,transparent:!0})}),this.beamData=i),o.a.createElement("div",null,o.a.createElement("div",{id:"controls",style:{position:"absolute",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px"}},o.a.createElement("h1",{style:{color:"white"}},a," Beam",a>1?"s":""),o.a.createElement("input",{type:"range",min:0,max:n,value:this.props.numRays,onChange:function(t){return e.props.setRayCount(parseInt(t.target.value))}}),o.a.createElement(X,{invert:this.props.invertBeams,inverted:this.props.inverted})),this.rs.render())}}]),t}(r.Component),F=function(e){return Object(d.c)([[0,0,0],[0,0,0],[e,0,0]])},P=Object(_.b)(function(e){return{box:e.radon.box,beamBox:e.radon.beamBox,numRays:e.radon.rays,inverted:e.radon.inverted}},function(e){return{rotateBox:function(t){return e(f(F(t)))},rotateBeamBox:function(t){return e(T(F(t)))},setRayCount:function(t){return e(function(e){return{type:"SET_RAY_COUNT",payload:e}}(t))},invertBeams:function(){return e({type:"INVERT_BEAMS"})}}})(Y),U=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||l.d,z=Object(l.e)(y,U(Object(l.a)(R.a))),H=function(){return o.a.createElement(_.a,{store:z},o.a.createElement(P,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[30,1,2]]]);
//# sourceMappingURL=main.21d3616d.chunk.js.map