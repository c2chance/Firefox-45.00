!function a(b,c,d){function e(g,h){var i,j;if(!c[g]){if(!b[g]){if(i="function"==typeof require&&require,!h&&i)return i(g,!0);if(f)return f(g,!0);throw new Error("Cannot find module '"+g+"'");}j=c[g]={exports:{}};b[g][0].call(j.exports,function(a){var c=b[g][1][a];return e(c?c:a)},j,j.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a){!function(b){"use strict";var c=a("eventemitter2").EventEmitter2,d=new c({wildcard:!0,delimiter:"::"});b.acom||(b.acom={});b.acom.bus=d}(window)},{eventemitter2:2}],2:[function(a,b,c){!function(){function a(){this._events={};this._conf&&b.call(this,this._conf)}function b(a){a&&(this._conf=a,a.delimiter&&(this.delimiter=a.delimiter),a.maxListeners&&(this._events.maxListeners=a.maxListeners),a.wildcard&&(this.wildcard=a.wildcard),a.newListener&&(this.newListener=a.newListener),this.wildcard&&(this.listenerTree={}))}function d(a){this._events={};this.newListener=!1;b.call(this,a)}function e(a,b,c,d){if(!c)return[];var f,g,h,i,j,k,l,m=[],n=b.length,o=b[d],p=b[d+1];if(d===n&&c._listeners){if("function"==typeof c._listeners)return a&&a.push(c._listeners),[c];for(f=0,g=c._listeners.length;g>f;f++)a&&a.push(c._listeners[f]);return[c]}if("*"===o||"**"===o||c[o]){if("*"===o){for(h in c)"_listeners"!==h&&c.hasOwnProperty(h)&&(m=m.concat(e(a,b,c[h],d+1)));return m}if("**"===o){l=d+1===n||d+2===n&&"*"===p;l&&c._listeners&&(m=m.concat(e(a,b,c,n)));for(h in c)"_listeners"!==h&&c.hasOwnProperty(h)&&("*"===h||"**"===h?(c[h]._listeners&&!l&&(m=m.concat(e(a,b,c[h],n))),m=m.concat(e(a,b,c[h],d))):m=m.concat(h===p?e(a,b,c[h],d+2):e(a,b,c[h],d)));return m}m=m.concat(e(a,b,c[o],d+1))}if(i=c["*"],i&&e(a,b,i,d+1),j=c["**"])if(n>d){j._listeners&&e(a,b,j,n);for(h in j)"_listeners"!==h&&j.hasOwnProperty(h)&&(h===p?e(a,b,j[h],d+2):h===o?e(a,b,j[h],d+1):(k={},k[h]=j[h],e(a,b,{"**":k},d+1)))}else j._listeners?e(a,b,j,n):j["*"]&&j["*"]._listeners&&e(a,b,j["*"],n);return m}function f(a,b){var c,d,e,f,i;for(a="string"==typeof a?a.split(this.delimiter):a.slice(),c=0,d=a.length;d>c+1;c++)if("**"===a[c]&&"**"===a[c+1])return;for(e=this.listenerTree,f=a.shift();f;){if(e[f]||(e[f]={}),e=e[f],0===a.length)return e._listeners?"function"==typeof e._listeners?e._listeners=[e._listeners,b]:g(e._listeners)&&(e._listeners.push(b),!e._listeners.warned)&&(i=h,"undefined"!=typeof this._events.maxListeners&&(i=this._events.maxListeners),i>0&&e._listeners.length>i&&(e._listeners.warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",e._listeners.length),console.trace())):e._listeners=b,!0;f=a.shift()}return!0}var g=Array.isArray?Array.isArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},h=10;d.prototype.delimiter=".";d.prototype.setMaxListeners=function(b){this._events||a.call(this);this._events.maxListeners=b;this._conf||(this._conf={});this._conf.maxListeners=b};d.prototype.event="";d.prototype.once=function(a,b){return this.many(a,1,b),this};d.prototype.many=function(a,b,c){function d(){0==--b&&e.off(a,d);c.apply(this,arguments)}var e=this;if("function"!=typeof c)throw new Error("many only accepts instances of Function");return d._origin=c,this.on(a,d),e};d.prototype.emit=function(){var b,g,h;if(this._events||a.call(this),b=arguments[0],"newListener"===b&&!this.newListener&&!this._events.newListener)return!1;if(this._all){for(var c=arguments.length,d=new Array(c-1),f=1;c>f;f++)d[f-1]=arguments[f];for(f=0,c=this._all.length;c>f;f++)this.event=b,this._all[f].apply(this,d)}if("error"===b&&!(this._all||this._events.error||this.wildcard&&this.listenerTree.error))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");if(this.wildcard?(g=[],h="string"==typeof b?b.split(this.delimiter):b.slice(),e.call(this,g,h,this.listenerTree,0)):g=this._events[b],"function"==typeof g){if(this.event=b,1===arguments.length)g.call(this);else if(arguments.length>1)switch(arguments.length){case 2:g.call(this,arguments[1]);break;case 3:g.call(this,arguments[1],arguments[2]);break;default:for(var c=arguments.length,d=new Array(c-1),f=1;c>f;f++)d[f-1]=arguments[f];g.apply(this,d)}return!0}if(g){for(var c=arguments.length,d=new Array(c-1),f=1;c>f;f++)d[f-1]=arguments[f];for(var i=g.slice(),f=0,c=i.length;c>f;f++)this.event=b,i[f].apply(this,d);return i.length>0||!!this._all}return!!this._all};d.prototype.on=function(b,c){if("function"==typeof b)return this.onAny(b),this;if("function"!=typeof c)throw new Error("on only accepts instances of Function");if(this._events||a.call(this),this.emit("newListener",b,c),this.wildcard)return f.call(this,b,c),this;if(this._events[b]){if("function"==typeof this._events[b])this._events[b]=[this._events[b],c];else if(g(this._events[b])&&(this._events[b].push(c),!this._events[b].warned)){var d=h;"undefined"!=typeof this._events.maxListeners&&(d=this._events.maxListeners);d>0&&this._events[b].length>d&&(this._events[b].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[b].length),console.trace())}}else this._events[b]=c;return this};d.prototype.onAny=function(a){if("function"!=typeof a)throw new Error("onAny only accepts instances of Function");return this._all||(this._all=[]),this._all.push(a),this};d.prototype.addListener=d.prototype.on;d.prototype.off=function(a,b){var c,d,f,h,i;if("function"!=typeof b)throw new Error("removeListener only takes instances of Function");if(d=[],this.wildcard)f="string"==typeof a?a.split(this.delimiter):a.slice(),d=e.call(this,null,f,this.listenerTree,0);else{if(!this._events[a])return this;c=this._events[a];d.push({_listeners:c})}for(h=0;h<d.length;h++){if(i=d[h],c=i._listeners,g(c)){for(var j=-1,k=0,l=c.length;l>k;k++)if(c[k]===b||c[k].listener&&c[k].listener===b||c[k]._origin&&c[k]._origin===b){j=k;break}if(0>j)continue;return this.wildcard?i._listeners.splice(j,1):this._events[a].splice(j,1),0===c.length&&(this.wildcard?delete i._listeners:delete this._events[a]),this}(c===b||c.listener&&c.listener===b||c._origin&&c._origin===b)&&(this.wildcard?delete i._listeners:delete this._events[a])}return this};d.prototype.offAny=function(a){var b,c=0,d=0;if(a&&this._all&&this._all.length>0){for(b=this._all,c=0,d=b.length;d>c;c++)if(a===b[c])return b.splice(c,1),this}else this._all=[];return this};d.prototype.removeListener=d.prototype.off;d.prototype.removeAllListeners=function(b){var g;if(0===arguments.length)return!this._events||a.call(this),this;if(this.wildcard)for(var c="string"==typeof b?b.split(this.delimiter):b.slice(),d=e.call(this,null,c,this.listenerTree,0),f=0;f<d.length;f++)g=d[f],g._listeners=null;else{if(!this._events[b])return this;this._events[b]=null}return this};d.prototype.listeners=function(b){if(this.wildcard){var c=[],d="string"==typeof b?b.split(this.delimiter):b.slice();return e.call(this,c,d,this.listenerTree,0),c}return this._events||a.call(this),this._events[b]||(this._events[b]=[]),g(this._events[b])||(this._events[b]=[this._events[b]]),this._events[b]};d.prototype.listenersAny=function(){return this._all?this._all:[]};"function"==typeof define&&define.amd?define(function(){return d}):"object"==typeof c?c.EventEmitter2=d:window.EventEmitter2=d}()},{}]},{},[1])