module.exports=function(t,e){t.self,t.HTMLElement,t.Element,t.Node,t.localStorage,t.sessionStorage,t.navigator,t.history,t.location,t.performance,t.Image,t.CustomEvent,t.Event,t.requestAnimationFrame,t.cancelAnimationFrame,t.getComputedStyle,t.XMLHttpRequest,t.Worker,t.SharedWorker;t.createApp=function(e){function n(t){for(var n,o,s=t[0],u=t[1],l=t[2],c=0,f=[];c<s.length;c++)o=s[c],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&f.push(a[o][0]),a[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);for(p&&p(t);f.length;)f.shift()();return i.push.apply(i,l||[]),r()}function r(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,o=1;o<n.length;o++){var u=n[o];0!==a[u]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var o={},a={4:0},i=[];function s(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=o,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var u=t.webpackJsonpcreateApp=t.webpackJsonpcreateApp||[],l=u.push.bind(u);u.push=n,u=u.slice();for(var c=0;c<u.length;c++)n(u[c]);var p=l;return i.push([27,1,5,0]),r()}([,,,,,,,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},,,,,,,,function(t,e,n){"use strict";n(10)},function(t,e,n){"use strict";n(11)},function(t,e,n){"use strict";n(12)},function(t,e,n){"use strict";n(13)},function(t,e,n){"use strict";n(14)},function(t,n,r){"use strict";r.r(n),r.d(n,"default",(function(){return y}));var o=r(1),a=r(5),i=r(2),s=r(3),u={name:"App",components:{Header:i.a,Footer:s.a}},l=(r(22),r(0)),c=Object(l.a)(u,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cnt"},[e("Header"),this._v(" "),e("router-view"),this._v(" "),e("Footer")],1)}),[],!1,null,null,null).exports,p={name:"Layout"},f=(r(23),Object(l.a)(p,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("ul",{staticClass:"tabbar"},[e("li",[e("router-link",{staticClass:"link",attrs:{to:"/spa"}},[this._v("normal")])],1),this._v(" "),e("li",[e("router-link",{staticClass:"link",attrs:{to:"/spa/a"}},[this._v("aaa")])],1),this._v(" "),e("li",[e("router-link",{staticClass:"link",attrs:{to:"/spa/b"}},[this._v("bbb")])],1)]),this._v(" "),e("router-view")],1)}),[],!1,null,null,null).exports),h={name:"Normal",computed:{route(){return this.$route.path}}},v=(r(24),Object(l.a)(h,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cnt"},[e("p",[this._v("I am normal")]),this._v(" "),e("p",[this._v("route: "+this._s(this.route))])])}),[],!1,null,null,null).exports),m={name:"AAA",computed:{route(){return this.$route.path}}},d=(r(25),Object(l.a)(m,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cnt"},[e("p",[this._v("I am aaa")]),this._v(" "),e("p",[this._v("route: "+this._s(this.route))])])}),[],!1,null,null,null).exports),_={name:"BBB",computed:{route(){return this.$route.path}}},b=(r(26),Object(l.a)(_,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"cnt"},[e("p",[this._v("I am bbb")]),this._v(" "),e("p",[this._v("route: "+this._s(this.route))])])}),[],!1,null,null,null).exports);function y(){const t=e.createElement("div");t.id="app",e.body.appendChild(t),o.a.use(a.a);const n=new a.a({mode:"history",routes:[{path:"/spa",component:f,children:[{path:"",component:v},{path:"a",component:d},{path:"b",component:b}]}]});return new o.a({el:"#app",router:n,render:t=>t(c)})}}]).default};