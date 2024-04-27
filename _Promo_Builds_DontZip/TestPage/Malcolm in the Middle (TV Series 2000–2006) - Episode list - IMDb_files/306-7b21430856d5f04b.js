"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[306],{90793:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.EMBEDDABLE_ERROR_ATTRIBUTION=t.POST_MESSAGE=t.POST_MESSAGE_READY=t.EMBEDDABLE_ELEMENT_SELECTOR=t.EMBEDDABLE_ELEMENT_CLASS=void 0,t.EMBEDDABLE_ELEMENT_CLASS="embeddable-iframe",t.EMBEDDABLE_ELEMENT_SELECTOR="iframe."+t.EMBEDDABLE_ELEMENT_CLASS,t.POST_MESSAGE_READY="embeddableReady",t.POST_MESSAGE="embeddableMessage",t.EMBEDDABLE_ERROR_ATTRIBUTION="embeddable_bridge_js"},74095:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.logError=t.WindowParentScopeError=t.InvalidAspectRatioError=t.EmbeddableBridgeInitError=t.UnknownElementError=t.UnknownRequestError=void 0;var n=r(90793);t.UnknownRequestError=function(e){return{name:"EmbeddableBridge_RequestError",message:"requestKey '"+e+"' from postMessage does not match list of expected values"}},t.UnknownElementError=function(){return{name:"EmbeddableBridge_DOMError",message:"postMessage event.source frameElement could not accessed in the DOM"}},t.EmbeddableBridgeInitError=function(){return{name:"EmbeddableBridge_InitError",message:"embeddable bridge request before `embeddableBridgeReady = true` on iframe window"}},t.InvalidAspectRatioError=function(){return{name:"EmbeddableBridge_ValueError",message:"setWidgetAspectRatio value cannot be less than zero"}},t.WindowParentScopeError=function(){return{name:"EmbeddableBridge_WindowScopeError",message:"bridge request must be sent from a child window"}},t.logError=function(e){if(window.ueLogError){var t={logLevel:"ERROR",attribution:n.EMBEDDABLE_ERROR_ATTRIBUTION};window.ueLogError(e,t)}}},61139:function(e,t,r){Object.defineProperty(t,"__esModule",{value:!0}),t.getElementOffset=t.getScrollOffset=void 0;var n=r(74095);function i(e){if(!e)throw n.UnknownElementError();var t=o(e);return{left:t.left-window.scrollX,top:t.top-window.scrollY}}function o(e){if(!e)throw n.UnknownElementError();for(var t=0,r=0,i=e,o=document&&document.body?document.body:null;i&&i!==o;)t+=i.offsetLeft-i.scrollLeft+i.clientLeft,r+=i.offsetTop-i.scrollTop+i.clientTop,i=i.offsetParent;return{left:t,top:r}}t.getScrollOffset=i,t.getElementOffset=o,t.default=i},44115:function(e,t){function r(){return{width:window.innerWidth,height:window.innerHeight}}t.ZP=r},43698:function(e,t,r){var n=r(74095);function i(e,t){if(!e||"undefined"===typeof e.clientWidth||"undefined"===typeof e.style)throw n.UnknownElementError();if(t<0)throw n.InvalidAspectRatioError();var r=e.clientWidth,i=Math.floor(r*t);return e.style.height=i+"px",{width:r,height:i}}t.ZP=i},51347:function(e,t,r){t.Od=t.IH=t.Zr=void 0;var n=r(90793);function i(e){var t={subscribeKey:"intersectionObserver",messageType:n.POST_MESSAGE};return function(r){t.subscribeData=function(e){return e.map((function(e){return{boundingClientRect:JSON.parse(JSON.stringify(e.boundingClientRect)),intersectionRatio:e.intersectionRatio,intersectionRect:JSON.parse(JSON.stringify(e.intersectionRect)),isIntersecting:e.isIntersecting,rootBounds:JSON.parse(JSON.stringify(e.rootBounds)),time:e.time}}))}(r),e.contentWindow.postMessage(t,window.location.origin)}}t.Zr=new Map,t.IH=function(e,r){if(t.Zr.has(e))return!1;var n=i(e),o=new IntersectionObserver(n,r);return o.observe(e),t.Zr.set(e,o),!0},t.Od=function(e){return!!t.Zr.has(e)&&(t.Zr.get(e).unobserve(e),t.Zr.delete(e),!0)}},36123:function(e,t,r){t.Od=t.IH=t.Zr=void 0;var n=r(90793);function i(e,t){var r=new Map;return t.forEach((function(t){var i=window.matchMedia(t),o=function(e){var t={subscribeKey:"mediaQuery",messageType:n.POST_MESSAGE};return function(r){var n=r.matches,i=r.media;t.subscribeData={matches:n,media:i},e.contentWindow.postMessage(t,window.location.origin)}}(e);i.addEventListener("change",o),r.set(t,{list:i,callback:o})})),r}t.Zr=new Map,t.IH=function(e,r){if(t.Zr.has(e))return!1;var n=i(e,r);return t.Zr.set(e,n),!0},t.Od=function(e){if(!t.Zr.has(e))return!1;var r=t.Zr.get(e);return r.forEach((function(e){e.list.removeEventListener("change",e.callback)})),r.clear(),t.Zr.delete(e),!0}},23279:function(e,t,r){t.Od=t.IH=t.Zr=void 0;var n=r(90793),i=r(68697);function o(e,t){var r=Math.max(20,t),o={subscribeKey:"resize",messageType:n.POST_MESSAGE};return i.default((function(){var t=window.innerWidth,r=window.innerHeight;o.subscribeData={width:t,height:r},e.contentWindow.postMessage(o,window.location.origin)}),r)}t.Zr=new Map,t.IH=function(e,r){if(void 0===r&&(r=100),t.Zr.has(e))return!1;var n=o(e,r);return t.Zr.set(e,n),window.addEventListener("resize",n),!0},t.Od=function(e){if(!t.Zr.has(e))return!1;var r=t.Zr.get(e);return window.removeEventListener("resize",r),t.Zr.delete(e),!0}},55736:function(e,t,r){t.Od=t.IH=t.Zr=void 0;var n=r(90793),i=r(68697),o=r(61139);function s(e,t){var r=Math.max(20,t),s={subscribeKey:"scrollChange",messageType:n.POST_MESSAGE};return i.default((function(){s.subscribeData=o.default(e),e.contentWindow.postMessage(s,window.location.origin)}),r)}function a(e){return i.default((function(){t.Zr.get(e).scrollOffset=o.default(e)}),100)}t.Zr=new Map,t.IH=function(e,r){if(void 0===r&&(r=100),t.Zr.has(e))return!1;var n={callback:s(e,r),resizeCallback:a(e),scrollOffset:o.default(e)};return t.Zr.set(e,n),window.addEventListener("resize",n.resizeCallback),window.addEventListener("scroll",n.callback),!0},t.Od=function(e){if(!t.Zr.has(e))return!1;var r=t.Zr.get(e);return window.removeEventListener("resize",r.resizeCallback),window.removeEventListener("scroll",r.callback),t.Zr.delete(e),!0}},78267:function(e,t){t.vg=t.Cd=t.hP=t.li=void 0,function(e){e.getIsReady="getIsReady",e.getPageContext="getPageContext",e.getPlacementData="getPlacementData",e.getPlatform="getPlatform",e.getScrollOffset="getScrollOffset",e.getSiteVariant="getSiteVariant",e.getTheme="getTheme",e.getThemeVariables="getThemeVariables",e.getViewportSize="getViewportSize",e.getWeblabActivations="getWeblabActivations",e.getWidgetSize="getWidgetSize",e.openTitlePrompt="openTitlePrompt",e.openCreditPrompt="openCreditPrompt",e.openRatingPrompt="openRatingPrompt",e.setWidgetAspectRatio="setWidgetAspectRatio",e.setRating="setRating",e.setWatchlist="setWatchlist",e.subscribeToRatingChange="subscribeToRatingChange",e.subscribeToWatchlistChange="subscribeToWatchlistChange",e.subscribeToMediaQueries="subscribeToMediaQueries",e.subscribeToIntersectionObserver="subscribeToIntersectionObserver",e.subscribeToResize="subscribeToResize",e.subscribeToScrollChange="subscribeToScrollChange",e.unsubscribeFromMediaQueries="unsubscribeFromMediaQueries",e.unsubscribeFromIntersectionObserver="unsubscribeFromIntersectionObserver",e.unsubscribeFromResize="unsubscribeFromResize",e.unsubscribeFromScrollChange="unsubscribeFromScrollChange"}(t.li||(t.li={})),function(e){e.mediaQuery="mediaQuery",e.intersectionObserver="intersectionObserver",e.resize="resize",e.scrollChange="scrollChange",e.rating="rating",e.watchlist="watchlist"}(t.hP||(t.hP={})),function(e){e.embeddableMessage="embeddableMessage",e.embeddableReady="embeddableReady"}(t.Cd||(t.Cd={})),function(e){e.userCanceled="userCanceled",e.systemError="systemError"}(t.vg||(t.vg={}))},75785:function(e,t,r){var n=r(74095);function i(e,t,r){try{return e.postMessage(t,r),!0}catch(i){n.logError(i)}}t.ZP=i},68697:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){var r,n;return void 0===t&&(t=20),function(){for(var i=[],o=0;o<arguments.length;o++)i[o]=arguments[o];var s=Date.now();r&&s<r+t?(clearTimeout(n),n=setTimeout((function(){r=s,e.call(i)}),t)):(r=s,e.call(i))}}},89363:function(e,t,r){t.E5=t.uu=void 0;var n=r(9659);Object.defineProperty(t,"uu",{enumerable:!0,get:function(){return n.SecondaryButtonType}});var i=r(46315);Object.defineProperty(t,"E5",{enumerable:!0,get:function(){return i.RatingsContext}})},98042:function(e,t,r){t.h6=void 0;var n=r(20150);Object.defineProperty(t,"h6",{enumerable:!0,get:function(){return n.jsonLdScriptProps}})},20150:function(e,t,r){var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},n.apply(this,arguments)};Object.defineProperty(t,"__esModule",{value:!0}),t.helmetJsonLdProp=t.jsonLdScriptProps=t.JsonLd=void 0;var i=r(2784);function o(e,t){return void 0===t&&(t={}),{type:"application/ld+json",dangerouslySetInnerHTML:{__html:JSON.stringify(e,u,t.space)}}}t.JsonLd=function(e){return i.createElement("script",n({},o(e.item,e)))},t.jsonLdScriptProps=o,t.helmetJsonLdProp=function(e,t){return void 0===t&&(t={}),{type:"application/ld+json",innerHTML:JSON.stringify(e,u,t.space)}};var s=Object.freeze({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&apos;"}),a=new RegExp("["+Object.keys(s).join("")+"]","g"),c=function(e){return s[e]},u=function(e,t){switch(typeof t){case"object":if(null===t)return;return t;case"number":case"boolean":case"bigint":return t;case"string":return t.replace(a,c);default:return}}}}]);