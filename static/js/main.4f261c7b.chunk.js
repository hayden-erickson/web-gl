(window["webpackJsonpweb-gl"]=window["webpackJsonpweb-gl"]||[]).push([[0],{31:function(e,t,n){e.exports=n(42)},36:function(e,t,n){},37:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(16),i=n.n(o),c=(n(36),n(37),n(6)),u=n(44),s=function(e){return function(t){return{type:e,payload:t}}},l=s("UPDATE_BOX"),d=(s("UPDATE_BEAM_BOX"),n(4)),p=n(14),f=n(13),m=n(15),h=n(12),b=n(21),v=n(27),g=n(1),y=function(e){return a.a.createElement("div",{style:{padding:"16px"}},a.a.createElement("button",{style:{cursor:"pointer",color:e.inverted?"white":"black",backgroundColor:e.inverted?"black":"white",fontSize:"32px",padding:"0px 8px",borderRadius:"8px"},onClick:e.invert},"Invert"))},E=function(e){return a.a.createElement("div",null,a.a.createElement("h1",{style:{color:"white"}},e.rayCount," Beam",e.rayCount>1?"s":""),a.a.createElement("input",{type:"range",min:0,max:e.maxRayCount,value:e.numRays,onChange:function(t){return e.setRayCount(parseInt(t.target.value))}}))},w=function(e){return a.a.createElement("div",{style:{color:"white",cursor:e.recording?"not-allowed":"pointer",padding:"8px",fontSize:"32px"},onClick:e.recording?function(){}:e.toggleRecording},a.a.createElement("span",{style:{padding:"4px",color:e.recording?"gray":"white"}},"Record"),a.a.createElement("button",{style:{cursor:e.recording?"not-allowed":"pointer",borderRadius:"12px",height:"24px",width:"24px",backgroundColor:e.recording?"gray":"red"}}))},O=function(e){return a.a.createElement("div",{id:"controls"},a.a.createElement(E,e),a.a.createElement(y,e),a.a.createElement(w,e))},x=function(e,t,n){return new g.s(e,t,n)};function R(e,t){return e.subset(Object(u.c)(t,[0,1,2])).toArray()[0]}function T(e,t){var n=R(e,0),r=Object(d.a)(n,3),a=r[0],o=r[1],i=r[2],c=R(e,1),u=Object(d.a)(c,3),s=u[0],l=u[1],p=u[2],f=R(e,2),m=Object(d.a)(f,3),h=m[0],b=m[1],v=m[2],y=new g.a(s,l,p);return y.translate(a,o,i),y.rotateX(h),y.rotateY(b),y.rotateZ(v),new g.g(y,function(e){var t=function(){return new g.b(e)};return new g.i({specular:t(),color:t().addScalar(-.3),emissive:t().addScalar(-.8),shininess:50,wireframe:!1,side:g.d})}(t||16777215))}var C=function(e,t){var n=R(e,0),r=Object(d.a)(n,3),a=r[0],o=r[1],i=r[2],c=R(e,1),u=Object(d.a)(c,2),s=u[0],l=u[1],p=R(e,2),f=Object(d.a)(p,3),m=f[0],h=f[1],b=f[2],v=new g.k(s,l);v.rotateX(m),v.rotateY(h),v.rotateZ(b),v.translate(a,o,i);var y=new g.h({transparent:!0,opacity:0,map:null});return new g.g(v,t||y)},_=Object(c.b)(function(e){var t=R(e.beamBox,1)[1],n=Math.ceil(Math.log2(t));return{numRays:e.rays,inverted:e.inverted,recording:e.recording,rayCount:Math.pow(2,Math.floor(e.rays)),maxRayCount:n,opacities:e.opacities}},function(e){return{setRayCount:function(t){return e(function(e){return{type:"SET_RAY_COUNT",payload:e}}(t))},invertBeams:function(){return e({type:"INVERT_BEAMS"})},toggleRecording:function(){e({type:"CLEAR_OPACITIES"}),e({type:"TOGGLE_RECORDING"})},invert:function(){return e({type:"INVERT_BEAMS"})}}})(O),j=function(e){return a.a.createElement("div",{style:{color:"white",padding:"8px"}},a.a.createElement("label",null,"filter"),a.a.createElement("input",{type:"checkbox",onChange:function(){return e.setFilter(!e.filter)},checked:e.filter}))},A=function(e){return a.a.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"}},a.a.createElement("h1",{style:{color:"white"}},"Inverse"),a.a.createElement(j,{filter:e.filter,setFilter:e.setFilter}),a.a.createElement("canvas",{style:{width:"300px",height:"300px"},ref:(t=e.reconstruction,function(e){if(e&&t.length){var n=e.getContext("2d");if(n){var r=t.length,a=r;e.height=a,e.width=r;for(var o=n.createImageData(r,a),i=0;i<r*a*4;i+=4){var c=Math.floor(i/(4*r)),u=Math.floor(i/4%r);o.data[i]=t[c][u],o.data[i+1]=t[c][u],o.data[i+2]=t[c][u],o.data[i+3]=255}n.putImageData(o,0,0)}}})}));var t},I=Object(c.b)(function(e){return{bbox:e.beamBox,opacities:e.opacities,maxTheta:e.maxTheta,reconstruction:e.reconstruction,filter:e.filter}},function(e){return{setFilter:function(t){return e({type:"SET_FILTER",payload:t})}}})(A),S=function(){function e(t){var n=this;Object(h.a)(this,e),this.webGLRenderer=void 0,this.camera=void 0,this.scene=void 0,this.webGLRenderer=new g.t,this.webGLRenderer.setSize(window.innerWidth,window.innerHeight),this.webGLRenderer.setPixelRatio(window.devicePixelRatio),this.scene=new g.n,this.camera=new g.j(80,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.x=0,this.camera.position.y=20,this.camera.position.z=100;var r=new g.c(16645629,2);r.position.set(-2,2,1).normalize(),this.scene.add(r),new v.a(this.camera,this.webGLRenderer.domElement),t.forEach(function(e){return n.scene.add(e)})}return Object(b.a)(e,[{key:"render",value:function(){var e=this;return this.webGLRenderer.render(this.scene,this.camera),a.a.createElement("div",{id:"scene-container",ref:function(t){return t?t.appendChild(e.webGLRenderer.domElement):""}})}}]),e}(),B=function(e){function t(e){var n;Object(h.a)(this,t),(n=Object(p.a)(this,Object(f.a)(t).call(this,e))).rs=void 0,n.b=void 0,n.bb=void 0,n.screen=void 0,n.tl=void 0,n.beamData=void 0,n.nr=void 0,n.beamData="",n.tl=new g.q,n.b=T(n.props.box,255),n.bb=C(n.props.beamBox),n.nr=0;var r=R(n.props.beamBox,0),a=Object(d.a)(r,3),o=a[0],i=a[1],c=a[2],s=R(n.props.beamBox,1),l=Object(d.a)(s,3),m=l[0],b=l[1],v=l[2],y=e.opacities.length;n.screen=C(Object(u.d)([[o+m/2,i,c+y/2],[y,b,v],[0,-Math.PI/2,0]])),n.rs=new S([n.b,n.bb,n.screen]);return requestAnimationFrame(function e(t){n.b.rotateZ(n.props.deltaV),n.props.rotateBox(n.props.deltaV);var r=Math.pow(2,Math.floor(n.props.numRays)),a=n.bb,o=function(e,t,n,r){var a=R(t,0),o=Object(d.a)(a,3),i=o[0],c=o[1],s=o[2],l=R(t,1),p=Object(d.a)(l,2),f=p[0],m=p[1],h=document.createElement("canvas");h.height=m,h.width=f;var b=h.getContext("2d");if(null===b)return"";for(var v=b.createImageData(f,m),y=[],E=0;E<n;E++){var w=Math.floor(c+E*(m/n)+m/(2*n)),O=w*f*4,T=O+4*f,C=x(i-f/2,m/2-w,s),_=x(i+f/2,m/2-w,s),j=new g.m(C,_.sub(C).normalize()).intersectObject(e),A=r.inv?0:255,I=T,S=0;switch(j.length){case 2:S=(j[1].distance-j[0].distance)/f,A=r.inv?255*S:255*(1-S),I=j[1].distance;break;case 3:case 4:S=(j[2].distance-j[1].distance)/f,A=r.inv?255*S:255*(1-S),I=j[2].distance}for(var B=r.inv?0:255,D=O;D<T;D+=4)v.data[D]=255,v.data[D+1]=255,v.data[D+2]=255,v.data[D+3]=(D-O)/4>=I-2?A:B;y.push(Object(u.b)(A))}return r.recording&&r.saveOpacity(y),b.putImageData(v,0,0),h.toDataURL()}(n.b,n.props.beamBox,r,{inv:n.props.inverted,recording:n.props.recording,saveOpacity:n.props.saveOpacity});o&&o!==n.beamData&&(n.tl.load(o,function(e){a.material=new g.h({map:e,transparent:!0})}),n.beamData=o);var i=n.screen,c=n.nr===n.props.opacities.length;if(n.props.recording&&c&&(n.nr=0,n.props.endRecording()),n.props.recording){n.nr+=1;var s=function(e,t,n){var r=R(e,1),a=Object(d.a)(r,2),o=a[0],i=a[1];o=n||4*o;var c=document.createElement("canvas");c.height=i,c.width=o;var u=c.getContext("2d");if(null===u)return"";for(var s=u.createImageData(o,i),l=0;l<t.length;l++)for(var p=t[l]?t[l].length:0,f=0;f<p;f++){var m=Math.floor(f*(i/p)+i/(2*p)),h=t[l][f],b=4*(m*o+l);s.data[b]=255,s.data[b+1]=255,s.data[b+2]=255,s.data[b+3]=h}return u.putImageData(s,0,0),c.toDataURL()}(n.props.beamBox,n.props.opacities,n.props.numAngles);n.tl.load(s,function(e){i.material=new g.h({map:e,transparent:!0})})}requestAnimationFrame(e)}),n}return Object(m.a)(t,e),Object(b.a)(t,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",{style:{position:"absolute",display:"flex",flexDirection:"column",alignItems:"center",padding:"16px"}},a.a.createElement(_,null),a.a.createElement(I,null)),this.rs.render())}}]),t}(r.Component),D=Object(c.b)(function(e){return{box:e.box,beamBox:e.beamBox,numRays:e.rays,inverted:e.inverted,recording:e.recording,opacities:e.opacities,theta:e.maxTheta/e.opacities.length,numAngles:e.opacities.length,deltaV:e.deltaV}},function(e){return{rotateBox:function(t){return e(l(function(e){return Object(u.d)([[0,0,0],[0,0,0],[0,0,e]])}(t)))},saveOpacity:function(t){return e({type:"SAVE_OPACITY",payload:t})},endRecording:function(){e({type:"TOGGLE_RECORDING"})},setDeltaV:function(t){return e({type:"SET_DELTA_V",payload:t})}}})(B),L=n(30),M=n(7),k=new WebSocket("ws://immense-ridge-35294.herokuapp.com/echo");function N(e){for(var t=new ArrayBuffer(e.length),n=new Uint8ClampedArray(t),r=0,a=e.length;r<a;r++)n[r]=e.charCodeAt(r);return n}k.onopen=function(){console.log("OPEN")},k.onclose=function(){console.log("CLOSE")},k.onmessage=function(e){var t=function(e){return{image:JSON.parse(e).image.map(atob).map(N)}}(e.data);Y.dispatch({type:"SET_RECONSTRUCTION",payload:t.image})},k.onerror=function(e){console.log("ERROR: "),console.log(e)};var P=Object(u.d)([[0,0,0],[32,64,8],[0,0,0]]),G=Object(u.d)([[0,0,0],[128,128,4],[0,0,0]]),V=Object(M.c)({beamBox:function(e,t){return void 0===e?G:"UPDATE_BEAM_BOX"===t.type?Object(u.a)(t.payload,e):e},box:function(e,t){return void 0===e?P:"UPDATE_BOX"===t.type?function(e){var t=Object(u.c)(2,[0,1,2]),n=e.subset(t).map(function(e){return e%(2*Math.PI)});return e.subset(t,n),e}(Object(u.a)(t.payload,e)):e},deltaV:function(e,t){return void 0===e?.01:"SET_DELTA_V"===t.type?t.payload:e},rays:function(e,t){return void 0===e?0:"SET_RAY_COUNT"===t.type?t.payload:e},inverted:function(e,t){return"INVERT_BEAMS"===t.type?!e:!!e},recording:function(e,t){return void 0!==e&&("TOGGLE_RECORDING"===t.type?!e:e)},reconstruction:function(e,t){return void 0===e?[]:"SET_RECONSTRUCTION"===t.type?t.payload:e},opacities:function(e,t){if(void 0===e)return Array(128);switch(t.type){case"SAVE_OPACITY":var n=Array.of.apply(Array,Object(L.a)(e));return n.unshift(t.payload),n.pop(),n;case"CLEAR_OPACITIES":return new Array(128);default:return e}},filter:function(e,t){return"SET_FILTER"===t.type?t.payload:!!e},maxTheta:function(){return Math.PI},cyclesPerSec:function(){return.05}}),U=function(e,t){var n;return void 0!==e&&"SAVE_OPACITY"===t.type&&(n={theta:R(e.box,2)[2],total:e.opacities.length,sino_row:t.payload,filter:e.filter},k.send(JSON.stringify(n))),V(e,t)},F=n(29),X=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||M.d,Y=Object(M.e)(U,X(Object(M.a)(F.a))),z=function(){return a.a.createElement(c.a,{store:Y},a.a.createElement(D,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(a.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[31,1,2]]]);
//# sourceMappingURL=main.4f261c7b.chunk.js.map