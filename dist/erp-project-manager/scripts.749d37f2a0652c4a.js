setTimeout(function(){(function(o){"use strict";o("#sidebarToggle, #sidebarToggleTop").on("click",function(d){o("body").toggleClass("sidebar-toggled"),o(".sidebar").toggleClass("toggled"),o(".sidebar").hasClass("toggled")&&o(".sidebar .collapse").collapse("hide")}),o(window).resize(function(){o(window).width()<768&&o(".sidebar .collapse").collapse("hide")}),o("body.fixed-nav .sidebar").on("mousewheel DOMMouseScroll wheel",function(d){if(o(window).width()>768){var m=d.originalEvent;this.scrollTop+=30*((m.wheelDelta||-m.detail)<0?1:-1),d.preventDefault()}}),o(document).on("scroll",function(){o(this).scrollTop()>100?o(".scroll-to-top").fadeIn():o(".scroll-to-top").fadeOut()}),o(document).on("click","a.scroll-to-top",function(d){var m=o(this);o("html, body").stop().animate({scrollTop:o(m.attr("href")).offset().top},1e3,"easeInOutExpo"),d.preventDefault()})})(jQuery),$(document).ready(function(){$("#myBtn").click(function(){$(".modal").modal("show")}),$("#modalLong").click(function(){$(".modal").modal("show")}),$("#modalScroll").click(function(){$(".modal").modal("show")}),$("#modalCenter").click(function(){$(".modal").modal("show")})}),$(function(){$('[data-toggle="popover"]').popover()}),$(".popover-dismiss").popover({trigger:"focus"})},200),setTimeout(function(){!function(){"use strict";const o=(n,c=!1)=>(n=n.trim(),c?[...document.querySelectorAll(n)]:document.querySelector(n)),d=(n,c,g,x=!1)=>{let t=o(c,x);t&&(x?t.forEach(e=>e.addEventListener(n,g)):t.addEventListener(n,g))},m=(n,c)=>{n.addEventListener("scroll",c)};let y=o("#navbar .scrollto",!0);const b=()=>{let n=window.scrollY+200;y.forEach(c=>{if(!c.hash)return;let g=o(c.hash);g&&(n>=g.offsetTop&&n<=g.offsetTop+g.offsetHeight?c.classList.add("active"):c.classList.remove("active"))})};window.addEventListener("load",b),m(document,b);const L=n=>{let g=o("#header").offsetHeight,x=o(n).offsetTop;window.scrollTo({top:x-g,behavior:"smooth"})};let w=o("#header"),E=o("#topbar");if(w){const n=()=>{window.scrollY>100?(w.classList.add("header-scrolled"),E&&E.classList.add("topbar-scrolled")):(w.classList.remove("header-scrolled"),E&&E.classList.remove("topbar-scrolled"))};window.addEventListener("load",n),m(document,n)}let O=o(".back-to-top");if(O){const n=()=>{window.scrollY>100?O.classList.add("active"):O.classList.remove("active")};window.addEventListener("load",n),m(document,n)}d("click",".mobile-nav-toggle",function(n){o("#navbar").classList.toggle("navbar-mobile"),this.classList.toggle("bi-list"),this.classList.toggle("bi-x")}),d("click",".navbar .dropdown > a",function(n){o("#navbar").classList.contains("navbar-mobile")&&(n.preventDefault(),this.nextElementSibling.classList.toggle("dropdown-active"))},!0),d("click",".scrollto",function(n){if(o(this.hash)){n.preventDefault();let c=o("#navbar");if(c.classList.contains("navbar-mobile")){c.classList.remove("navbar-mobile");let g=o(".mobile-nav-toggle");g.classList.toggle("bi-list"),g.classList.toggle("bi-x")}L(this.hash)}},!0),window.addEventListener("load",()=>{window.location.hash&&o(window.location.hash)&&L(window.location.hash)});let S=o("#preloader");S&&window.addEventListener("load",()=>{S.remove()}),new PureCounter}()},1e3),function(o,d){"object"==typeof exports&&"object"==typeof module?module.exports=d():"function"==typeof define&&define.amd?define([],d):"object"==typeof exports?exports.PureCounter=d():o.PureCounter=d()}(self,function(){return o={638:function(y){function b(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function L(t){return function(e){if(Array.isArray(e))return w(e)}(t)||function(e){if(typeof Symbol<"u"&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(t)||function(e,r){if(e){if("string"==typeof e)return w(e,r);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?w(e,r):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,i=new Array(e);r<e;r++)i[r]=t[r];return i}function E(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r={};for(var i in t)if(e=={}||e.hasOwnProperty(i)){var a=c(t[i]);r[i]=a,i.match(/duration|pulse/)&&(r[i]="boolean"!=typeof a?1e3*a:a)}return Object.assign({},e,r)}function O(t,e){var r=(e.end-e.start)/(e.duration/e.delay),i="inc";e.start>e.end&&(i="dec",r*=-1);var a=c(e.start);t.innerHTML=n(a,e),!0===e.once&&t.setAttribute("data-purecounter-duration",0);var u=setInterval(function(){var h=function(s,f){var p=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"inc";return s=c(s),f=c(f),parseFloat("inc"===p?s+f:s-f)}(a,r,i);t.innerHTML=n(h,e),((a=h)>=e.end&&"inc"==i||a<=e.end&&"dec"==i)&&(t.innerHTML=n(e.end,e),e.pulse&&(t.setAttribute("data-purecounter-duration",0),setTimeout(function(){t.setAttribute("data-purecounter-duration",e.duration/1e3)},e.pulse)),clearInterval(u))},e.delay)}function S(t,e){return Math.pow(t,e)}function n(t,e){var a,u,s,r={minimumFractionDigits:e.decimals,maximumFractionDigits:e.decimals},i="string"==typeof e.formater?e.formater:void 0;return t=function(a,u){if(u.filesizing||u.currency){a=Math.abs(Number(a));var h=1e3,s=u.currency&&"string"==typeof u.currency?u.currency:"",f=u.decimals||1,p=["","K","M","B","T"],v="";u.filesizing&&(h=1024,p=["bytes","KB","MB","GB","TB"]);for(var l=4;l>=0;l--)if(0===l&&(v="".concat(a.toFixed(f)," ").concat(p[l])),a>=S(h,l)){v="".concat((a/S(h,l)).toFixed(f)," ").concat(p[l]);break}return s+v}return parseFloat(a)}(t,e),a=t=e.formater?t.toLocaleString(i,r):parseInt(t).toString(),(u=e).formater?"en-US"!==u.formater&&!0===u.separator?a:(s=u.separator?"string"==typeof u.separator?u.separator:",":"",a.replace(/^(?:(\d{1,3},(?:\d{1,3},?)*)|(\d{1,3}\.(?:\d{1,3}\.?)*)|(\d{1,3}(?:\s\d{1,3})*))([\.,]?\d{0,2}?)$/gi,function(f,p,v,l,T){var A="",I="";if(void 0!==p?(A=p.replace(new RegExp(/,/gi,"gi"),s),I=","):void 0!==v?A=v.replace(new RegExp(/\./gi,"gi"),s):void 0!==l&&(A=l.replace(new RegExp(/ /gi,"gi"),s)),void 0!==T){var M=","!==I&&","!==s?",":".";A+=void 0!==T?T.replace(new RegExp(/\.|,/gi,"gi"),M):""}return A})):a}function c(t){return/^[0-9]+\.[0-9]+$/.test(t)?parseFloat(t):/^[0-9]+$/.test(t)?parseInt(t):/^true|false/i.test(t)?/^true/i.test(t):t}function g(t){for(var e=t.offsetTop,r=t.offsetLeft,i=t.offsetWidth,a=t.offsetHeight;t.offsetParent;)e+=(t=t.offsetParent).offsetTop,r+=t.offsetLeft;return e>=window.pageYOffset&&r>=window.pageXOffset&&e+a<=window.pageYOffset+window.innerHeight&&r+i<=window.pageXOffset+window.innerWidth}function x(){return"IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype}y.exports=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e={start:0,end:100,duration:2e3,delay:10,once:!0,pulse:!1,decimals:0,legacy:!0,filesizing:!1,currency:!1,separator:!1,formater:"us-US",selector:".purecounter"},r=E(t,e);function i(){var s=document.querySelectorAll(r.selector);if(0!==s.length)if(x()){var f=new IntersectionObserver(u.bind(this),{root:null,rootMargin:"20px",threshold:.5});s.forEach(function(p){f.observe(p)})}else window.addEventListener&&(a(s),window.addEventListener("scroll",function(p){a(s)},{passive:!0}))}function a(s){s.forEach(function(f){!0===h(f).legacy&&g(f)&&u([f])})}function u(s,f){s.forEach(function(p){var v=p.target||p,l=h(v);return l.duration<=0?v.innerHTML=n(l.end,l):!f&&!g(p)||f&&p.intersectionRatio<.5?v.innerHTML=n(l.start>l.end?l.end:l.start,l):void setTimeout(function(){return O(v,l)},l.delay)})}function h(s){var f=r,p=[].filter.call(s.attributes,function(v){return/^data-purecounter-/.test(v.name)});return E(0!=p.length?Object.assign.apply(Object,[{}].concat(L(p.map(function(v){var T=v.value;return b({},v.name.replace("data-purecounter-","").toLowerCase(),c(T))})))):{},f)}i()}}},d={},function y(b){var L=d[b];if(void 0!==L)return L.exports;var w=d[b]={exports:{}};return o[b](w,w.exports,y),w.exports}(638);var o,d});