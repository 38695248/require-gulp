/**
 * jquery.Jcrop.js v0.9.12
 * jQuery Image Cropping Plugin - released under MIT License 
 * Author: Kelly Hallman <khallman@gmail.com>
 * http://github.com/tapmodo/Jcrop
 * Copyright (c) 2008-2013 Tapmodo Interactive LLC {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * }}}
 */

(function(e){e.Jcrop=function(t,n){function a(e){return Math.round(e)+"px"}function f(e){return r.baseClass+"-"+e}function l(){return e.fx.step.hasOwnProperty("backgroundColor")}function c(t){var n=e(t).offset();return[n.left,n.top]}function h(e){return[e.pageX-i[0],e.pageY-i[1]]}function p(t){typeof t!="object"&&(t={}),r=e.extend(r,t),e.each(["onChange","onSelect","onRelease","onDblClick"],function(e,t){typeof r[t]!="function"&&(r[t]=function(){})})}function d(e,t,n){i=c(A),nt.setCursor(e==="move"?e:e+"-resize");if(e==="move")return nt.activateHandlers(m(t),E,n);var r=Z.getFixed(),s=g(e),o=Z.getCorner(g(s));Z.setPressed(Z.getCorner(s)),Z.setCurrent(o),nt.activateHandlers(v(e,r),E,n)}function v(e,t){return function(n){if(!r.aspectRatio)switch(e){case"e":n[1]=t.y2;break;case"w":n[1]=t.y2;break;case"n":n[0]=t.x2;break;case"s":n[0]=t.x2}else switch(e){case"e":n[1]=t.y+1;break;case"w":n[1]=t.y+1;break;case"n":n[0]=t.x+1;break;case"s":n[0]=t.x+1}Z.setCurrent(n),tt.update()}}function m(e){var t=e;return rt.watchKeys(),function(e){Z.moveOffset([e[0]-t[0],e[1]-t[1]]),t=e,tt.update()}}function g(e){switch(e){case"n":return"sw";case"s":return"nw";case"e":return"nw";case"w":return"ne";case"ne":return"sw";case"nw":return"se";case"se":return"nw";case"sw":return"ne"}}function y(e){return function(t){return r.disabled?!1:e==="move"&&!r.allowMove?!1:(i=c(A),K=!0,d(e,h(t)),t.stopPropagation(),t.preventDefault(),!1)}}function b(e,t,n){var r=e.width(),i=e.height();r>t&&t>0&&(r=t,i=t/e.width()*e.height()),i>n&&n>0&&(i=n,r=n/e.height()*e.width()),X=e.width()/r,V=e.height()/i,e.width(r).height(i)}function w(e){return{x:e.x*X,y:e.y*V,x2:e.x2*X,y2:e.y2*V,w:e.w*X,h:e.h*V}}function E(e){var t=Z.getFixed();t.w>r.minSelect[0]&&t.h>r.minSelect[1]?(tt.enableHandles(),tt.done()):tt.release(),nt.setCursor(r.allowSelect?"crosshair":"default")}function S(e){if(r.disabled)return!1;if(!r.allowSelect)return!1;K=!0,i=c(A),tt.disableHandles(),nt.setCursor("crosshair");var t=h(e);return Z.setPressed(t),tt.update(),nt.activateHandlers(x,E,e.type.substring(0,5)==="touch"),rt.watchKeys(),e.stopPropagation(),e.preventDefault(),!1}function x(e){Z.setCurrent(e),tt.update()}function T(){var t=e("<div></div>").addClass(f("tracker"));return o&&t.css({opacity:0,backgroundColor:"white"}),t}function it(e){_.removeClass().addClass(f("holder")).addClass(e)}function st(e,t){function b(){window.setTimeout(w,c)}var n=e[0]/X,i=e[1]/V,s=e[2]/X,o=e[3]/V;if(Q)return;var u=Z.flipCoords(n,i,s,o),a=Z.getFixed(),f=[a.x,a.y,a.x2,a.y2],l=f,c=r.animationDelay,h=u[0]-f[0],p=u[1]-f[1],d=u[2]-f[2],v=u[3]-f[3],m=0,g=r.swingSpeed;n=l[0],i=l[1],s=l[2],o=l[3],tt.animMode(!0);var y,w=function(){return function(){m+=(100-m)/g,l[0]=Math.round(n+m/100*h),l[1]=Math.round(i+m/100*p),l[2]=Math.round(s+m/100*d),l[3]=Math.round(o+m/100*v),m>=99.8&&(m=100),m<100?(ut(l),b()):(tt.done(),tt.animMode(!1),typeof t=="function"&&t.call(yt))}}();b()}function ot(e){ut([e[0]/X,e[1]/V,e[2]/X,e[3]/V]),r.onSelect.call(yt,w(Z.getFixed())),tt.enableHandles()}function ut(e){Z.setPressed([e[0],e[1]]),Z.setCurrent([e[2],e[3]]),tt.update()}function at(){return w(Z.getFixed())}function ft(){return Z.getFixed()}function lt(e){p(e),gt()}function ct(){r.disabled=!0,tt.disableHandles(),tt.setCursor("default"),nt.setCursor("default")}function ht(){r.disabled=!1,gt()}function pt(){tt.done(),nt.activateHandlers(null,null)}function dt(){_.remove(),C.show(),C.css("visibility","visible"),e(t).removeData("Jcrop")}function vt(e,t){tt.release(),ct();var n=new Image;n.onload=function(){var i=n.width,s=n.height,o=r.boxWidth,u=r.boxHeight;A.width(i).height(s),A.attr("src",e),D.attr("src",e),b(A,o,u),O=A.width(),M=A.height(),D.width(O).height(M),F.width(O+j*2).height(M+j*2),_.width(O).height(M),et.resize(O,M),ht(),typeof t=="function"&&t.call(yt)},n.src=e}function mt(e,t,n){var i=t||r.bgColor;r.bgFade&&l()&&r.fadeTime&&!n?e.animate({backgroundColor:i},{queue:!1,duration:r.fadeTime}):e.css("backgroundColor",i)}function gt(e){r.allowResize?e?tt.enableOnly():tt.enableHandles():tt.disableHandles(),nt.setCursor(r.allowSelect?"crosshair":"default"),tt.setCursor(r.allowMove?"move":"default"),r.hasOwnProperty("trueSize")&&(X=r.trueSize[0]/O,V=r.trueSize[1]/M),r.hasOwnProperty("setSelect")&&(ot(r.setSelect),tt.done(),delete r.setSelect),et.refresh(),r.bgColor!=I&&(mt(r.shade?et.getShades():_,r.shade?r.shadeColor||r.bgColor:r.bgColor),I=r.bgColor),q!=r.bgOpacity&&(q=r.bgOpacity,r.shade?et.refresh():tt.setBgOpacity(q)),R=r.maxSize[0]||0,U=r.maxSize[1]||0,z=r.minSize[0]||0,W=r.minSize[1]||0,r.hasOwnProperty("outerImage")&&(A.attr("src",r.outerImage),delete r.outerImage),tt.refresh()}var r=e.extend({},e.Jcrop.defaults),i,s=navigator.userAgent.toLowerCase(),o=/msie/.test(s),u=/msie [1-6]\./.test(s);typeof t!="object"&&(t=e(t)[0]),typeof n!="object"&&(n={}),p(n);var N={border:"none",visibility:"visible",margin:0,padding:0,position:"absolute",top:0,left:0},C=e(t),k=!0;if(t.tagName=="IMG"){if(C[0].width!=0&&C[0].height!=0)C.width(C[0].width),C.height(C[0].height);else{var L=new Image;L.src=C[0].src,C.width(L.width),C.height(L.height)}var A=C.clone().removeAttr("id").css(N).show();A.width(C.width()),A.height(C.height()),C.after(A).hide()}else A=C.css(N).show(),k=!1,r.shade===null&&(r.shade=!0);b(A,r.boxWidth,r.boxHeight);var O=A.width(),M=A.height(),_=e("<div />").width(O).height(M).addClass(f("holder")).css({position:"relative",backgroundColor:r.bgColor}).insertAfter(C).append(A);r.addClass&&_.addClass(r.addClass);var D=e("<div />"),P=e("<div />").width("100%").height("100%").css({zIndex:310,position:"absolute",overflow:"hidden"}),H=e("<div />").width("100%").height("100%").css("zIndex",320),B=e("<div />").css({position:"absolute",zIndex:600}).dblclick(function(){var e=Z.getFixed();r.onDblClick.call(yt,e)}).insertBefore(A).append(P,H);k&&(D=e("<img />").attr("src",A.attr("src")).css(N).width(O).height(M),P.append(D)),u&&B.css({overflowY:"hidden"});var j=r.boundary,F=T().width(O+j*2).height(M+j*2).css({position:"absolute",top:a(-j),left:a(-j),zIndex:290}).mousedown(S),I=r.bgColor,q=r.bgOpacity,R,U,z,W,X,V,J=!0,K,Q,G;i=c(A);var Y=function(){function e(){var e={},t=["touchstart","touchmove","touchend"],n=document.createElement("div"),r;try{for(r=0;r<t.length;r++){var i=t[r];i="on"+i;var s=i in n;s||(n.setAttribute(i,"return;"),s=typeof n[i]=="function"),e[t[r]]=s}return e.touchstart&&e.touchend&&e.touchmove}catch(o){return!1}}function t(){return r.touchSupport===!0||r.touchSupport===!1?r.touchSupport:e()}return{createDragger:function(e){return function(t){return r.disabled?!1:e==="move"&&!r.allowMove?!1:(i=c(A),K=!0,d(e,h(Y.cfilter(t)),!0),t.stopPropagation(),t.preventDefault(),!1)}},newSelection:function(e){return S(Y.cfilter(e))},cfilter:function(e){return e.pageX=e.originalEvent.changedTouches[0].pageX,e.pageY=e.originalEvent.changedTouches[0].pageY,e},isSupported:e,support:t()}}(),Z=function(){function u(r){r=p(r),n=e=r[0],i=t=r[1]}function a(e){e=p(e),s=e[0]-n,o=e[1]-i,n=e[0],i=e[1]}function f(){return[s,o]}function l(r){var s=r[0],o=r[1];0>e+s&&(s-=s+e),0>t+o&&(o-=o+t),M<i+o&&(o+=M-(i+o)),O<n+s&&(s+=O-(n+s)),e+=s,n+=s,t+=o,i+=o}function c(e){var t=h();switch(e){case"ne":return[t.x2,t.y];case"nw":return[t.x,t.y];case"se":return[t.x2,t.y2];case"sw":return[t.x,t.y2]}}function h(){if(!r.aspectRatio)return v();var s=r.aspectRatio,o=r.minSize[0]/X,u=r.maxSize[0]/X,a=r.maxSize[1]/V,f=n-e,l=i-t,c=Math.abs(f),h=Math.abs(l),p=c/h,g,y,b,w;return u===0&&(u=O*10),a===0&&(a=M*10),p<s?(y=i,b=h*s,g=f<0?e-b:b+e,g<0?(g=0,w=Math.abs((g-e)/s),y=l<0?t-w:w+t):g>O&&(g=O,w=Math.abs((g-e)/s),y=l<0?t-w:w+t)):(g=n,w=c/s,y=l<0?t-w:t+w,y<0?(y=0,b=Math.abs((y-t)*s),g=f<0?e-b:b+e):y>M&&(y=M,b=Math.abs(y-t)*s,g=f<0?e-b:b+e)),g>e?(g-e<o?g=e+o:g-e>u&&(g=e+u),y>t?y=t+(g-e)/s:y=t-(g-e)/s):g<e&&(e-g<o?g=e-o:e-g>u&&(g=e-u),y>t?y=t+(e-g)/s:y=t-(e-g)/s),g<0?(e-=g,g=0):g>O&&(e-=g-O,g=O),y<0?(t-=y,y=0):y>M&&(t-=y-M,y=M),m(d(e,t,g,y))}function p(e){return e[0]<0&&(e[0]=0),e[1]<0&&(e[1]=0),e[0]>O&&(e[0]=O),e[1]>M&&(e[1]=M),[Math.round(e[0]),Math.round(e[1])]}function d(e,t,n,r){var i=e,s=n,o=t,u=r;return n<e&&(i=n,s=e),r<t&&(o=r,u=t),[i,o,s,u]}function v(){var r=n-e,s=i-t,o;return R&&Math.abs(r)>R&&(n=r>0?e+R:e-R),U&&Math.abs(s)>U&&(i=s>0?t+U:t-U),W/V&&Math.abs(s)<W/V&&(i=s>0?t+W/V:t-W/V),z/X&&Math.abs(r)<z/X&&(n=r>0?e+z/X:e-z/X),e<0&&(n-=e,e-=e),t<0&&(i-=t,t-=t),n<0&&(e-=n,n-=n),i<0&&(t-=i,i-=i),n>O&&(o=n-O,e-=o,n-=o),i>M&&(o=i-M,t-=o,i-=o),e>O&&(o=e-M,i-=o,t-=o),t>M&&(o=t-M,i-=o,t-=o),m(d(e,t,n,i))}function m(e){return{x:e[0],y:e[1],x2:e[2],y2:e[3],w:e[2]-e[0],h:e[3]-e[1]}}var e=0,t=0,n=0,i=0,s,o;return{flipCoords:d,setPressed:u,setCurrent:a,getOffset:f,moveOffset:l,getCorner:c,getFixed:h}}(),et=function(){function s(e,t){i.left.css({height:a(t)}),i.right.css({height:a(t)})}function o(){return u(Z.getFixed())}function u(e){i.top.css({left:a(e.x),width:a(e.w),height:a(e.y)}),i.bottom.css({top:a(e.y2),left:a(e.x),width:a(e.w),height:a(M-e.y2)}),i.right.css({left:a(e.x2),width:a(O-e.x2)}),i.left.css({width:a(e.x)})}function f(){return e("<div />").css({position:"absolute",backgroundColor:r.shadeColor||r.bgColor}).appendTo(n)}function l(){t||(t=!0,n.insertBefore(A),o(),tt.setBgOpacity(1,0,1),D.hide(),c(r.shadeColor||r.bgColor,1),tt.isAwake()?p(r.bgOpacity,1):p(1,1))}function c(e,t){mt(v(),e,t)}function h(){t&&(n.remove(),D.show(),t=!1,tt.isAwake()?tt.setBgOpacity(r.bgOpacity,1,1):(tt.setBgOpacity(1,1,1),tt.disableHandles()),mt(_,0,1))}function p(e,i){t&&(r.bgFade&&!i?n.animate({opacity:1-e},{queue:!1,duration:r.fadeTime}):n.css({opacity:1-e}))}function d(){r.shade?l():h(),tt.isAwake()&&p(r.bgOpacity)}function v(){return n.children()}var t=!1,n=e("<div />").css({position:"absolute",zIndex:240,opacity:0}),i={top:f(),left:f().height(M),right:f().height(M),bottom:f()};return{update:o,updateRaw:u,getShades:v,setBgColor:c,enable:l,disable:h,resize:s,refresh:d,opacity:p}}(),tt=function(){function l(t){var n=e("<div />").css({position:"absolute",opacity:r.borderOpacity}).addClass(f(t));return P.append(n),n}function c(t,n){var r=e("<div />").mousedown(y(t)).css({cursor:t+"-resize",position:"absolute",zIndex:n}).addClass("ord-"+t);return Y.support&&r.bind("touchstart.jcrop",Y.createDragger(t)),H.append(r),r}function h(e){var t=r.handleSize,i=c(e,n++).css({opacity:r.handleOpacity}).addClass(f("handle"));return t&&i.width(t).height(t),i}function p(e){return c(e,n++).addClass("jcrop-dragbar")}function d(e){var t;for(t=0;t<e.length;t++)o[e[t]]=p(e[t])}function v(e){var t,n;for(n=0;n<e.length;n++){switch(e[n]){case"n":t="hline";break;case"s":t="hline bottom";break;case"e":t="vline right";break;case"w":t="vline"}i[e[n]]=l(t)}}function m(e){var t;for(t=0;t<e.length;t++)s[e[t]]=h(e[t])}function g(e,t){r.shade||D.css({top:a(-t),left:a(-e)}),B.css({top:a(t),left:a(e)})}function b(e,t){B.width(Math.round(e)).height(Math.round(t))}function E(){var e=Z.getFixed();Z.setPressed([e.x,e.y]),Z.setCurrent([e.x2,e.y2]),S()}function S(e){if(t)return x(e)}function x(e){var n=Z.getFixed();b(n.w,n.h),g(n.x,n.y),r.shade&&et.updateRaw(n),t||C(),e?r.onSelect.call(yt,w(n)):r.onChange.call(yt,w(n))}function N(e,n,i){if(!t&&!n)return;r.bgFade&&!i?A.animate({opacity:e},{queue:!1,duration:r.fadeTime}):A.css("opacity",e)}function C(){B.show(),r.shade?et.opacity(q):N(q,!0),t=!0}function k(){M(),B.hide(),r.shade?et.opacity(1):N(1),t=!1,r.onRelease.call(yt)}function L(){u&&H.show()}function O(){u=!0;if(r.allowResize)return H.show(),!0}function M(){u=!1,H.hide()}function _(e){e?(Q=!0,M()):(Q=!1,O())}function j(){_(!1),E()}var t,n=370,i={},s={},o={},u=!1;r.dragEdges&&e.isArray(r.createDragbars)&&d(r.createDragbars),e.isArray(r.createHandles)&&m(r.createHandles),r.drawBorders&&e.isArray(r.createBorders)&&v(r.createBorders),e(document).bind("touchstart.jcrop-ios",function(t){e(t.currentTarget).hasClass("jcrop-tracker")&&t.stopPropagation()});var F=T().mousedown(y("move")).css({cursor:"move",position:"absolute",zIndex:360});return Y.support&&F.bind("touchstart.jcrop",Y.createDragger("move")),P.append(F),M(),{updateVisible:S,update:x,release:k,refresh:E,isAwake:function(){return t},setCursor:function(e){F.css("cursor",e)},enableHandles:O,enableOnly:function(){u=!0},showHandles:L,disableHandles:M,animMode:_,setBgOpacity:N,done:j}}(),nt=function(){function s(t){F.css({zIndex:450}),t?e(document).bind("touchmove.jcrop",l).bind("touchend.jcrop",c):i&&e(document).bind("mousemove.jcrop",u).bind("mouseup.jcrop",a)}function o(){F.css({zIndex:290}),e(document).unbind(".jcrop")}function u(e){return t(h(e)),!1}function a(e){return e.preventDefault(),e.stopPropagation(),K&&(K=!1,n(h(e)),tt.isAwake()&&r.onSelect.call(yt,w(Z.getFixed())),o(),t=function(){},n=function(){}),!1}function f(e,r,i){return K=!0,t=e,n=r,s(i),!1}function l(e){return t(h(Y.cfilter(e))),!1}function c(e){return a(Y.cfilter(e))}function p(e){F.css("cursor",e)}var t=function(){},n=function(){},i=r.trackDocument;return i||F.mousemove(u).mouseup(a).mouseout(a),A.before(F),{activateHandlers:f,setCursor:p}}(),rt=function(){function i(){r.keySupport&&(t.show(),t.focus())}function s(e){t.hide()}function o(e,t,n){r.allowMove&&(Z.moveOffset([t,n]),tt.updateVisible(!0)),e.preventDefault(),e.stopPropagation()}function a(e){if(e.ctrlKey||e.metaKey)return!0;G=e.shiftKey?!0:!1;var t=G?10:1;switch(e.keyCode){case 37:o(e,-t,0);break;case 39:o(e,t,0);break;case 38:o(e,0,-t);break;case 40:o(e,0,t);break;case 27:r.allowSelect&&tt.release();break;case 9:return!0}return!1}var t=e('<input type="radio" />').css({position:"fixed",left:"-120px",width:"12px"}).addClass("jcrop-keymgr"),n=e("<div />").css({position:"absolute",overflow:"hidden"}).append(t);return r.keySupport&&(t.keydown(a).blur(s),u||!r.fixedSupport?(t.css({position:"absolute",left:"-20px"}),n.append(t).insertBefore(A)):t.insertBefore(A)),{watchKeys:i}}();Y.support&&F.bind("touchstart.jcrop",Y.newSelection),H.hide(),gt(!0);var yt={setImage:vt,animateTo:st,setSelect:ot,setOptions:lt,tellSelect:at,tellScaled:ft,setClass:it,disable:ct,enable:ht,cancel:pt,release:tt.release,destroy:dt,focus:rt.watchKeys,getBounds:function(){return[O*X,M*V]},getWidgetSize:function(){return[O,M]},getScaleFactor:function(){return[X,V]},getOptions:function(){return r},ui:{holder:_,selection:B}};return o&&_.bind("selectstart",function(){return!1}),C.data("Jcrop",yt),yt},e.fn.Jcrop=function(t,n){var r;return this.each(function(){if(e(this).data("Jcrop")){if(t==="api")return e(this).data("Jcrop");e(this).data("Jcrop").setOptions(t)}else this.tagName=="IMG"?e.Jcrop.Loader(this,function(){e(this).css({display:"block",visibility:"hidden"}),r=e.Jcrop(this,t),e.isFunction(n)&&n.call(r)}):(e(this).css({display:"block",visibility:"hidden"}),r=e.Jcrop(this,t),e.isFunction(n)&&n.call(r))}),this},e.Jcrop.Loader=function(t,n,r){function o(){s.complete?(i.unbind(".jcloader"),e.isFunction(n)&&n.call(s)):window.setTimeout(o,50)}var i=e(t),s=i[0];i.bind("load.jcloader",o).bind("error.jcloader",function(t){i.unbind(".jcloader"),e.isFunction(r)&&r.call(s)}),s.complete&&e.isFunction(n)&&(i.unbind(".jcloader"),n.call(s))},e.Jcrop.defaults={allowSelect:!0,allowMove:!0,allowResize:!0,trackDocument:!0,baseClass:"jcrop",addClass:null,bgColor:"black",bgOpacity:.6,bgFade:!1,borderOpacity:.4,handleOpacity:.5,handleSize:null,aspectRatio:0,keySupport:!0,createHandles:["n","s","e","w","nw","ne","se","sw"],createDragbars:["n","s","e","w"],createBorders:["n","s","e","w"],drawBorders:!0,dragEdges:!0,fixedSupport:!0,touchSupport:null,shade:null,boxWidth:0,boxHeight:0,boundary:2,fadeTime:400,animationDelay:20,swingSpeed:3,minSelect:[0,0],maxSize:[0,0],minSize:[0,0],onChange:function(){},onSelect:function(){},onDblClick:function(){},onRelease:function(){}}})(jQuery);