typeof JSON != "object" && (JSON = {}),
function () {
    "use strict";
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    function quote(string) {
        return escapable.lastIndex = 0,
        escapable.test(string) ? '"' + string.replace(escapable, function (a) {
            var c = meta[a];
            return typeof c == "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
        value && typeof value == "object" && typeof value.toJSON == "function" && (value = value.toJSON(key));
        typeof rep == "function" && (value = rep.call(holder, key, value));
        switch (typeof value) {
            case "string":
                return quote(value);
            case "number":
                return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
                return String(value);
            case "object":
                if (!value)
                    return "null";
                if (gap += indent,
                partial = [],
                Object.prototype.toString.apply(value) === "[object Array]") {
                    for (length = value.length,
                    i = 0; i < length; i += 1)
                        partial[i] = str(i, value) || "null";
                    return v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]",
                    gap = mind,
                    v
                }
                if (rep && typeof rep == "object")
                    for (length = rep.length,
                    i = 0; i < length; i += 1)
                        typeof rep[i] == "string" && (k = rep[i],
                        v = str(k, value),
                        v && partial.push(quote(k) + (gap ? ": " : ":") + v));
                else
                    for (k in value)
                        Object.prototype.hasOwnProperty.call(value, k) && (v = str(k, value),
                        v && partial.push(quote(k) + (gap ? ": " : ":") + v));
                return v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}",
                gap = mind,
                v
        }
    }
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function () {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
    }
    ,
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function () {
        return this.valueOf()
    }
    );
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    }, rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function (value, replacer, space) {
        var i;
        if (gap = "",
        indent = "",
        typeof space == "number")
            for (i = 0; i < space; i += 1)
                indent += " ";
        else
            typeof space == "string" && (indent = space);
        if (rep = replacer,
        replacer && typeof replacer != "function" && (typeof replacer != "object" || typeof replacer.length != "number"))
            throw new Error("JSON.stringify");
        return str("", {
            "": value
        })
    }
    );
    typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
        function walk(holder, key) {
            var k, v, value = holder[key];
            if (value && typeof value == "object")
                for (k in value)
                    Object.prototype.hasOwnProperty.call(value, k) && (v = walk(value, k),
                    v !== undefined ? value[k] = v : delete value[k]);
            return reviver.call(holder, key, value)
        }
        var j;
        if (text = String(text),
        cx.lastIndex = 0,
        cx.test(text) && (text = text.replace(cx, function (a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        })),
        /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            return j = eval("(" + text + ")"),
            typeof reviver == "function" ? walk({
                "": j
            }, "") : j;
        throw new SyntaxError("JSON.parse");
    }
    )
}();
/**
 * History.js jQuery Adapter
 * @author Benjamin Arthur Lupton <contact@balupton.com>
 * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */
(function (window, undefined) {
    "use strict";
    var History = window.History = window.History || {}
      , jQuery = window.jQuery;
    if (typeof History.Adapter != "undefined")
        throw new Error("History.js Adapter has already been loaded...");
    History.Adapter = {
        bind: function (el, event, callback) {
            jQuery(el).bind(event, callback)
        },
        trigger: function (el, event, extra) {
            jQuery(el).trigger(event, extra)
        },
        extractEventData: function (key, event, extra) {
            return event && event.originalEvent && event.originalEvent[key] || extra && extra[key] || undefined
        },
        onDomLoad: function (callback) {
            jQuery(callback)
        }
    };
    typeof History.init != "undefined" && History.init()
})(window);
/**
 * History.js HTML4 Support
 * Depends on the HTML5 Support
 * @author Benjamin Arthur Lupton <contact@balupton.com>
 * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */
(function (window) {
    "use strict";
    var document = window.document
      , setTimeout = window.setTimeout || setTimeout
      , clearTimeout = window.clearTimeout || clearTimeout
      , setInterval = window.setInterval || setInterval
      , History = window.History = window.History || {};
    if (typeof History.initHtml4 != "undefined")
        throw new Error("History.js HTML4 Support has already been loaded...");
    History.initHtml4 = function () {
        if (typeof History.initHtml4.initialized != "undefined")
            return !1;
        if (History.initHtml4.initialized = !0,
        History.enabled = !0,
        History.savedHashes = [],
        History.isLastHash = function (newHash) {
            var oldHash = History.getHashByIndex();
            return newHash === oldHash
        }
        ,
        History.isHashEqual = function (newHash, oldHash) {
            return newHash = encodeURIComponent(newHash).replace(/%25/g, "%"),
            oldHash = encodeURIComponent(oldHash).replace(/%25/g, "%"),
            newHash === oldHash
        }
        ,
        History.saveHash = function (newHash) {
            return History.isLastHash(newHash) ? !1 : (History.savedHashes.push(newHash),
            !0)
        }
        ,
        History.getHashByIndex = function (index) {
            return typeof index == "undefined" ? History.savedHashes[History.savedHashes.length - 1] : index < 0 ? History.savedHashes[History.savedHashes.length + index] : History.savedHashes[index]
        }
        ,
        History.discardedHashes = {},
        History.discardedStates = {},
        History.discardState = function (discardedState, forwardState, backState) {
            var discardedStateHash = History.getHashByState(discardedState), discardObject;
            return discardObject = {
            discardedState: discardedState,
            backState: backState,
            forwardState: forwardState
        },
            History.discardedStates[discardedStateHash] = discardObject,
            !0
        }
        ,
        History.discardHash = function (discardedHash, forwardState, backState) {
            var discardObject = {
            discardedHash: discardedHash,
            backState: backState,
            forwardState: forwardState
        };
            return History.discardedHashes[discardedHash] = discardObject,
            !0
        }
        ,
        History.discardedState = function (State) {
            var StateHash = History.getHashByState(State);
            return History.discardedStates[StateHash] || !1
        }
        ,
        History.discardedHash = function (hash) {
            return History.discardedHashes[hash] || !1
        }
        ,
        History.recycleState = function (State) {
            var StateHash = History.getHashByState(State);
            return History.discardedState(State) && delete History.discardedStates[StateHash],
            !0
        }
        ,
        History.emulated.hashChange) {
            History.hashChangeInit = function () {
                History.checkerFunction = null;
                var lastDocumentHash = "", iframeId, iframe, lastIframeHash, checkerRunning, startedWithHash = Boolean(History.getHash());
                return History.isInternetExplorer() ? (iframeId = "historyjs-iframe",
                iframe = document.createElement("iframe"),
                iframe.setAttribute("id", iframeId),
                iframe.setAttribute("src", "#"),
                iframe.style.display = "none",
                document.body.appendChild(iframe),
                iframe.contentWindow.document.open(),
                iframe.contentWindow.document.close(),
                lastIframeHash = "",
                checkerRunning = !1,
                History.checkerFunction = function () {
                    if (checkerRunning)
                        return !1;
                    checkerRunning = !0;
                    var documentHash = History.getHash()
                      , iframeHash = History.getHash(iframe.contentWindow.document);
                    return documentHash !== lastDocumentHash ? (lastDocumentHash = documentHash,
                    iframeHash !== documentHash && (lastIframeHash = iframeHash = documentHash,
                    iframe.contentWindow.document.open(),
                    iframe.contentWindow.document.close(),
                    iframe.contentWindow.document.location.hash = History.escapeHash(documentHash)),
                    History.Adapter.trigger(window, "hashchange")) : iframeHash !== lastIframeHash && (lastIframeHash = iframeHash,
                    startedWithHash && iframeHash === "" ? History.back() : History.setHash(iframeHash, !1)),
                    checkerRunning = !1,
                    !0
                }
                ) : History.checkerFunction = function () {
                    var documentHash = History.getHash() || "";
                    return documentHash !== lastDocumentHash && (lastDocumentHash = documentHash,
                    History.Adapter.trigger(window, "hashchange")),
                    !0
                }
                ,
                History.intervalList.push(setInterval(History.checkerFunction, History.options.hashChangeInterval)),
                !0
            }
            ;
            History.Adapter.onDomLoad(History.hashChangeInit)
        }
        if (History.emulated.pushState && (History.onHashChange = function (event) {
            var currentUrl = event && event.newURL || History.getLocationHref(), currentHash = History.getHashByUrl(currentUrl), currentState = null, currentStateHash = null, discardObject;
            return History.isLastHash(currentHash) ? (History.busy(!1),
            !1) : (History.doubleCheckComplete(),
            History.saveHash(currentHash),
            currentHash && History.isTraditionalAnchor(currentHash)) ? (History.Adapter.trigger(window, "anchorchange"),
            History.busy(!1),
            !1) : (currentState = History.extractState(History.getFullUrl(currentHash || History.getLocationHref()), !0),
            History.isLastSavedState(currentState)) ? (History.busy(!1),
            !1) : (currentStateHash = History.getHashByState(currentState),
            discardObject = History.discardedState(currentState),
            discardObject) ? (History.getHashByIndex(-2) === History.getHashByState(discardObject.forwardState) ? History.back(!1) : History.forward(!1),
            !1) : (History.pushState(currentState.data, currentState.title, encodeURI(currentState.url), !1),
            !0)
        }
        ,
        History.Adapter.bind(window, "hashchange", History.onHashChange),
        History.pushState = function (data, title, url, queue) {
            if (url = encodeURI(url).replace(/%25/g, "%"),
            History.getHashByUrl(url))
                throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
            if (queue !== !1 && History.busy())
                return History.pushQueue({
            scope: History,
            callback: History.pushState,
            args: arguments,
            queue: queue
        }),
                !1;
            History.busy(!0);
            var newState = History.createStateObject(data, title, url)
              , newStateHash = History.getHashByState(newState)
              , oldState = History.getState(!1)
              , oldStateHash = History.getHashByState(oldState)
              , html4Hash = History.getHash()
              , wasExpected = History.expectedStateId == newState.id;
            return (History.storeState(newState),
            History.expectedStateId = newState.id,
            History.recycleState(newState),
            History.setTitle(newState),
            newStateHash === oldStateHash) ? (History.busy(!1),
            !1) : (History.saveState(newState),
            wasExpected || History.Adapter.trigger(window, "statechange"),
            History.isHashEqual(newStateHash, html4Hash) || History.isHashEqual(newStateHash, History.getShortUrl(History.getLocationHref())) || History.setHash(newStateHash, !1),
            History.busy(!1),
            !0)
        }
        ,
        History.replaceState = function (data, title, url, queue) {
            if (url = encodeURI(url).replace(/%25/g, "%"),
            History.getHashByUrl(url))
                throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");
            if (queue !== !1 && History.busy())
                return History.pushQueue({
            scope: History,
            callback: History.replaceState,
            args: arguments,
            queue: queue
        }),
                !1;
            History.busy(!0);
            var newState = History.createStateObject(data, title, url)
              , newStateHash = History.getHashByState(newState)
              , oldState = History.getState(!1)
              , oldStateHash = History.getHashByState(oldState)
              , previousState = History.getStateByIndex(-2);
            return History.discardState(oldState, newState, previousState),
            newStateHash === oldStateHash ? (History.storeState(newState),
            History.expectedStateId = newState.id,
            History.recycleState(newState),
            History.setTitle(newState),
            History.saveState(newState),
            History.Adapter.trigger(window, "statechange"),
            History.busy(!1)) : History.pushState(newState.data, newState.title, newState.url, !1),
            !0
        }
        ),
        History.emulated.pushState && History.getHash() && !History.emulated.hashChange)
            History.Adapter.onDomLoad(function () {
                History.Adapter.trigger(window, "hashchange")
            })
    }
    ;
    typeof History.init != "undefined" && History.init()
})(window);
/**
 * History.js Core
 * @author Benjamin Arthur Lupton <contact@balupton.com>
 * @copyright 2010-2011 Benjamin Arthur Lupton <contact@balupton.com>
 * @license New BSD License <http://creativecommons.org/licenses/BSD/>
 */
(function (window, undefined) {
    "use strict";
    var console = window.console || undefined
      , document = window.document
      , navigator = window.navigator
      , sessionStorage = !1
      , setTimeout = window.setTimeout
      , clearTimeout = window.clearTimeout
      , setInterval = window.setInterval
      , clearInterval = window.clearInterval
      , JSON = window.JSON
      , alert = window.alert
      , History = window.History = window.History || {}
      , history = window.history;
    try {
        sessionStorage = window.sessionStorage;
        sessionStorage.setItem("TEST", "1");
        sessionStorage.removeItem("TEST")
    } catch (e) {
        sessionStorage = !1
    }
    if (JSON.stringify = JSON.stringify || JSON.encode,
    JSON.parse = JSON.parse || JSON.decode,
    typeof History.init != "undefined")
        throw new Error("History.js Core has already been loaded...");
    History.init = function () {
        return typeof History.Adapter == "undefined" ? !1 : (typeof History.initCore != "undefined" && History.initCore(),
        typeof History.initHtml4 != "undefined" && History.initHtml4(),
        !0)
    }
    ;
    History.initCore = function () {
        if (typeof History.initCore.initialized != "undefined")
            return !1;
        History.initCore.initialized = !0;
        History.options = History.options || {};
        History.options.hashChangeInterval = History.options.hashChangeInterval || 100;
        History.options.safariPollInterval = History.options.safariPollInterval || 500;
        History.options.doubleCheckInterval = History.options.doubleCheckInterval || 500;
        History.options.disableSuid = History.options.disableSuid || !1;
        History.options.storeInterval = History.options.storeInterval || 1e3;
        History.options.busyDelay = History.options.busyDelay || 250;
        History.options.debug = History.options.debug || !1;
        History.options.initialTitle = History.options.initialTitle || document.title;
        History.options.html4Mode = History.options.html4Mode || !1;
        History.options.delayInit = History.options.delayInit || !1;
        History.intervalList = [];
        History.clearAllIntervals = function () {
            var i, il = History.intervalList;
            if (typeof il != "undefined" && il !== null) {
                for (i = 0; i < il.length; i++)
                    clearInterval(il[i]);
                History.intervalList = null
            }
        }
        ;
        History.debug = function () {
            (History.options.debug || !1) && History.log.apply(History, arguments)
        }
        ;
        History.log = function () {
            var consoleExists = !(typeof console == "undefined" || typeof console.log == "undefined" || typeof console.log.apply == "undefined"), textarea = document.getElementById("log"), message, i, n, args, arg;
            for (consoleExists ? (args = Array.prototype.slice.call(arguments),
            message = args.shift(),
            typeof console.debug != "undefined" ? console.debug.apply(console, [message, args]) : console.log.apply(console, [message, args])) : message = "\n" + arguments[0] + "\n",
            i = 1,
            n = arguments.length; i < n; ++i) {
                if (arg = arguments[i],
                typeof arg == "object" && typeof JSON != "undefined")
                    try {
                        arg = JSON.stringify(arg)
                    } catch (Exception) { }
                message += "\n" + arg + "\n"
            }
            return textarea ? (textarea.value += message + "\n-----\n",
            textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight) : consoleExists || alert(message),
            !0
        }
        ;
        /**
         * History.getInternetExplorerMajorVersion()
         * Get's the major version of Internet Explorer
         * @return {integer}
         * @license Public Domain
         * @author Benjamin Arthur Lupton <contact@balupton.com>
         * @author James Padolsey <https://gist.github.com/527683>
         */
        History.getInternetExplorerMajorVersion = function () {
            return History.getInternetExplorerMajorVersion.cached = typeof History.getInternetExplorerMajorVersion.cached != "undefined" ? History.getInternetExplorerMajorVersion.cached : function () {
                for (var v = 3, div = document.createElement("div"), all = div.getElementsByTagName("i") ; (div.innerHTML = "<!--[if gt IE " + ++v + "]><i><\/i><![endif]-->") && all[0];)
                    ;
                return v > 4 ? v : !1
            }()
        }
        ;
        /**
         * History.isInternetExplorer()
         * Are we using Internet Explorer?
         * @return {boolean}
         * @license Public Domain
         * @author Benjamin Arthur Lupton <contact@balupton.com>
         */
        if (History.isInternetExplorer = function () {
            return History.isInternetExplorer.cached = typeof History.isInternetExplorer.cached != "undefined" ? History.isInternetExplorer.cached : Boolean(History.getInternetExplorerMajorVersion())
        }
        ,
        History.emulated = History.options.html4Mode ? {
            pushState: !0,
            hashChange: !0
        } : {
            pushState: !Boolean(window.history && window.history.pushState && window.history.replaceState && !(/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(navigator.userAgent) || /AppleWebKit\/5([0-2]|3[0-2])/i.test(navigator.userAgent))),
            hashChange: Boolean(!("onhashchange" in window || "onhashchange" in document) || History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8)
        },
        History.enabled = !History.emulated.pushState,
        History.bugs = {
            setHash: Boolean(!History.emulated.pushState && navigator.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),
            safariPoll: Boolean(!History.emulated.pushState && navigator.vendor === "Apple Computer, Inc." && /AppleWebKit\/5([0-2]|3[0-3])/.test(navigator.userAgent)),
            ieDoubleCheck: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 8),
            hashEscape: Boolean(History.isInternetExplorer() && History.getInternetExplorerMajorVersion() < 7)
        },
        History.isEmptyObject = function (obj) {
            for (var name in obj)
                if (obj.hasOwnProperty(name))
                    return !1;
            return !0
        }
        ,
        History.cloneObject = function (obj) {
            var hash, newObj;
            return obj ? (hash = JSON.stringify(obj),
            newObj = JSON.parse(hash)) : newObj = {},
            newObj
        }
        ,
        History.getRootUrl = function () {
            var rootUrl = document.location.protocol + "//" + (document.location.hostname || document.location.host);
            return (document.location.port || !1) && (rootUrl += ":" + document.location.port),
            rootUrl + "/"
        }
        ,
        History.getBaseHref = function () {
            var baseElements = document.getElementsByTagName("base")
              , baseElement = null
              , baseHref = "";
            return baseElements.length === 1 && (baseElement = baseElements[0],
            baseHref = baseElement.href.replace(/[^\/]+$/, "")),
            baseHref = baseHref.replace(/\/+$/, ""),
            baseHref && (baseHref += "/"),
            baseHref
        }
        ,
        History.getBaseUrl = function () {
            return History.getBaseHref() || History.getBasePageUrl() || History.getRootUrl()
        }
        ,
        History.getPageUrl = function () {
            var State = History.getState(!1, !1)
              , stateUrl = (State || {}).url || History.getLocationHref();
            return stateUrl.replace(/\/+$/, "").replace(/[^\/]+$/, function (part) {
                return /\./.test(part) ? part : part + "/"
        })
        }
        ,
        History.getBasePageUrl = function () {
            return History.getLocationHref().replace(/[#\?].*/, "").replace(/[^\/]+$/, function (part) {
                return /[^\/]$/.test(part) ? "" : part
        }).replace(/\/+$/, "") + "/"
        }
        ,
        History.getFullUrl = function (url, allowBaseHref) {
            var fullUrl = url
              , firstChar = url.substring(0, 1);
            return allowBaseHref = typeof allowBaseHref == "undefined" ? !0 : allowBaseHref,
            /[a-z]+\:\/\//.test(url) || (fullUrl = firstChar === "/" ? History.getRootUrl() + url.replace(/^\/+/, "") : firstChar === "#" ? History.getPageUrl().replace(/#.*/, "") + url : firstChar === "?" ? History.getPageUrl().replace(/[\?#].*/, "") + url : allowBaseHref ? History.getBaseUrl() + url.replace(/^(\.\/)+/, "") : History.getBasePageUrl() + url.replace(/^(\.\/)+/, "")),
            fullUrl.replace(/\#$/, "")
        }
        ,
        History.getShortUrl = function (url) {
            var shortUrl = url
              , baseUrl = History.getBaseUrl()
              , rootUrl = History.getRootUrl();
            return History.emulated.pushState && (shortUrl = shortUrl.replace(baseUrl, "")),
            shortUrl = shortUrl.replace(rootUrl, "/"),
            History.isTraditionalAnchor(shortUrl) && (shortUrl = "./" + shortUrl),
            shortUrl.replace(/^(\.\/)+/g, "./").replace(/\#$/, "")
        }
        ,
        History.getLocationHref = function (doc) {
            return (doc = doc || document,
            doc.URL === doc.location.href) ? doc.location.href : doc.location.href === decodeURIComponent(doc.URL) ? doc.URL : doc.location.hash && decodeURIComponent(doc.location.href.replace(/^[^#]+/, "")) === doc.location.hash ? doc.location.href : doc.URL.indexOf("#") == -1 && doc.location.href.indexOf("#") != -1 ? doc.location.href : doc.URL || doc.location.href
        }
        ,
        History.store = {},
        History.idToState = History.idToState || {},
        History.stateToId = History.stateToId || {},
        History.urlToId = History.urlToId || {},
        History.storedStates = History.storedStates || [],
        History.savedStates = History.savedStates || [],
        History.normalizeStore = function () {
            History.store.idToState = History.store.idToState || {};
            History.store.urlToId = History.store.urlToId || {};
            History.store.stateToId = History.store.stateToId || {}
        }
        ,
        History.getState = function (friendly, create) {
            typeof friendly == "undefined" && (friendly = !0);
            typeof create == "undefined" && (create = !0);
            var State = History.getLastSavedState();
            return !State && create && (State = History.createStateObject()),
            friendly && (State = History.cloneObject(State),
            State.url = State.cleanUrl || State.url),
            State
        }
        ,
        History.getIdByState = function (newState) {
            var id = History.extractId(newState.url), str;
            if (!id)
                if (str = History.getStateString(newState),
                typeof History.stateToId[str] != "undefined")
                    id = History.stateToId[str];
        else if (typeof History.store.stateToId[str] != "undefined")
                    id = History.store.stateToId[str];
        else {
                    for (; ;)
                        if (id = (new Date).getTime() + String(Math.random()).replace(/\D/g, ""),
                        typeof History.idToState[id] == "undefined" && typeof History.store.idToState[id] == "undefined")
                            break;
                    History.stateToId[str] = id;
                    History.idToState[id] = newState
        }
            return id
        }
        ,
        History.normalizeState = function (oldState) {
            var newState, dataNotEmpty;
            return (oldState && typeof oldState == "object" || (oldState = {}),
            typeof oldState.normalized != "undefined") ? oldState : (oldState.data && typeof oldState.data == "object" || (oldState.data = {}),
            newState = {},
            newState.normalized = !0,
            newState.title = oldState.title || "",
            newState.url = History.getFullUrl(oldState.url ? oldState.url : History.getLocationHref()),
            newState.hash = History.getShortUrl(newState.url),
            newState.data = History.cloneObject(oldState.data),
            newState.id = History.getIdByState(newState),
            newState.cleanUrl = newState.url.replace(/\??\&_suid.*/, ""),
            newState.url = newState.cleanUrl,
            dataNotEmpty = !History.isEmptyObject(newState.data),
            (newState.title || dataNotEmpty) && History.options.disableSuid !== !0 && (newState.hash = History.getShortUrl(newState.url).replace(/\??\&_suid.*/, ""),
            /\?/.test(newState.hash) || (newState.hash += "?"),
            newState.hash += "&_suid=" + newState.id),
            newState.hashedUrl = History.getFullUrl(newState.hash),
            (History.emulated.pushState || History.bugs.safariPoll) && History.hasUrlDuplicate(newState) && (newState.url = newState.hashedUrl),
            newState)
        }
        ,
        History.createStateObject = function (data, title, url) {
            var State = {
            data: data,
            title: title,
            url: url
        };
            return History.normalizeState(State)
        }
        ,
        History.getStateById = function (id) {
            id = String(id);
            return History.idToState[id] || History.store.idToState[id] || undefined
        }
        ,
        History.getStateString = function (passedState) {
            var State, cleanedState;
            return State = History.normalizeState(passedState),
            cleanedState = {
            data: State.data,
            title: passedState.title,
            url: passedState.url
        },
            JSON.stringify(cleanedState)
        }
        ,
        History.getStateId = function (passedState) {
            var State;
            return State = History.normalizeState(passedState),
            State.id
        }
        ,
        History.getHashByState = function (passedState) {
            var State;
            return State = History.normalizeState(passedState),
            State.hash
        }
        ,
        History.extractId = function (url_or_hash) {
            var id, parts, url, tmp;
            return tmp = url_or_hash.indexOf("#") != -1 ? url_or_hash.split("#")[0] : url_or_hash,
            parts = /(.*)\&_suid=([0-9]+)$/.exec(tmp),
            url = parts ? parts[1] || url_or_hash : url_or_hash,
            id = parts ? String(parts[2] || "") : "",
            id || !1
        }
        ,
        History.isTraditionalAnchor = function (url_or_hash) {
            return !/[\/\?\.]/.test(url_or_hash)
        }
        ,
        History.extractState = function (url_or_hash, create) {
            var State = null, id, url;
            return create = create || !1,
            id = History.extractId(url_or_hash),
            id && (State = History.getStateById(id)),
            State || (url = History.getFullUrl(url_or_hash),
            id = History.getIdByUrl(url) || !1,
            id && (State = History.getStateById(id)),
            State || !create || History.isTraditionalAnchor(url_or_hash) || (State = History.createStateObject(null, null, url))),
            State
        }
        ,
        History.getIdByUrl = function (url) {
            return History.urlToId[url] || History.store.urlToId[url] || undefined
        }
        ,
        History.getLastSavedState = function () {
            return History.savedStates[History.savedStates.length - 1] || undefined
        }
        ,
        History.getLastStoredState = function () {
            return History.storedStates[History.storedStates.length - 1] || undefined
        }
        ,
        History.hasUrlDuplicate = function (newState) {
            var oldState;
            return oldState = History.extractState(newState.url),
            oldState && oldState.id !== newState.id
        }
        ,
        History.storeState = function (newState) {
            return History.urlToId[newState.url] = newState.id,
            History.storedStates.push(History.cloneObject(newState)),
            newState
        }
        ,
        History.isLastSavedState = function (newState) {
            var isLast = !1, newId, oldState, oldId;
            return History.savedStates.length && (newId = newState.id,
            oldState = History.getLastSavedState(),
            oldId = oldState.id,
            isLast = newId === oldId),
            isLast
        }
        ,
        History.saveState = function (newState) {
            return History.isLastSavedState(newState) ? !1 : (History.savedStates.push(History.cloneObject(newState)),
            !0)
        }
        ,
        History.getStateByIndex = function (index) {
            return typeof index == "undefined" ? History.savedStates[History.savedStates.length - 1] : index < 0 ? History.savedStates[History.savedStates.length + index] : History.savedStates[index]
        }
        ,
        History.getCurrentIndex = function () {
            return History.savedStates.length < 1 ? 0 : History.savedStates.length - 1
        }
        ,
        History.getHash = function (doc) {
            var url = History.getLocationHref(doc);
            return History.getHashByUrl(url)
        }
        ,
        History.unescapeHash = function (hash) {
            var result = History.normalizeHash(hash);
            return decodeURIComponent(result)
        }
        ,
        History.normalizeHash = function (hash) {
            return hash.replace(/[^#]*#/, "").replace(/#.*/, "")
        }
        ,
        History.setHash = function (hash, queue) {
            var State, pageUrl;
            return queue !== !1 && History.busy() ? (History.pushQueue({
            scope: History,
            callback: History.setHash,
            args: arguments,
            queue: queue
        }),
            !1) : (History.busy(!0),
            State = History.extractState(hash, !0),
            State && !History.emulated.pushState ? History.pushState(State.data, State.title, State.url, !1) : History.getHash() !== hash && (History.bugs.setHash ? (pageUrl = History.getPageUrl(),
            History.pushState(null, null, pageUrl + "#" + hash, !1)) : document.location.hash = hash),
            History)
        }
        ,
        History.escapeHash = function (hash) {
            var result = History.normalizeHash(hash);
            return result = window.encodeURIComponent(result),
            History.bugs.hashEscape || (result = result.replace(/\%21/g, "!").replace(/\%26/g, "&").replace(/\%3D/g, "=").replace(/\%3F/g, "?")),
            result
        }
        ,
        History.getHashByUrl = function (url) {
            var hash = String(url).replace(/([^#]*)#?([^#]*)#?(.*)/, "$2");
            return History.unescapeHash(hash)
        }
        ,
        History.setTitle = function (newState) {
            var title = newState.title, firstState;
            title || (firstState = History.getStateByIndex(0),
            firstState && firstState.url === newState.url && (title = firstState.title || History.options.initialTitle));
            try {
                document.getElementsByTagName("title")[0].innerHTML = title.replace("<", "&lt;").replace(">", "&gt;").replace(" & ", " &amp; ")
        } catch (Exception) { }
            return document.title = title,
            History
        }
        ,
        History.queues = [],
        History.busy = function (value) {
            if (typeof value != "undefined" ? History.busy.flag = value : typeof History.busy.flag == "undefined" && (History.busy.flag = !1),
            !History.busy.flag) {
                clearTimeout(History.busy.timeout);
                var fireNext = function () {
                    var i, queue, item;
                    if (!History.busy.flag)
                        for (i = History.queues.length - 1; i >= 0; --i)
                            (queue = History.queues[i],
                            queue.length !== 0) && (item = queue.shift(),
                            History.fireQueueItem(item),
                            History.busy.timeout = setTimeout(fireNext, History.options.busyDelay))
        }
            ;
                History.busy.timeout = setTimeout(fireNext, History.options.busyDelay)
        }
            return History.busy.flag
        }
        ,
        History.busy.flag = !1,
        History.fireQueueItem = function (item) {
            return item.callback.apply(item.scope || History, item.args || [])
        }
        ,
        History.pushQueue = function (item) {
            return History.queues[item.queue || 0] = History.queues[item.queue || 0] || [],
            History.queues[item.queue || 0].push(item),
            History
        }
        ,
        History.queue = function (item, queue) {
            return typeof item == "function" && (item = {
            callback: item
        }),
            typeof queue != "undefined" && (item.queue = queue),
            History.busy() ? History.pushQueue(item) : History.fireQueueItem(item),
            History
        }
        ,
        History.clearQueue = function () {
            return History.busy.flag = !1,
            History.queues = [],
            History
        }
        ,
        History.stateChanged = !1,
        History.doubleChecker = !1,
        History.doubleCheckComplete = function () {
            return History.stateChanged = !0,
            History.doubleCheckClear(),
            History
        }
        ,
        History.doubleCheckClear = function () {
            return History.doubleChecker && (clearTimeout(History.doubleChecker),
            History.doubleChecker = !1),
            History
        }
        ,
        History.doubleCheck = function (tryAgain) {
            return History.stateChanged = !1,
            History.doubleCheckClear(),
            History.bugs.ieDoubleCheck && (History.doubleChecker = setTimeout(function () {
                return History.doubleCheckClear(),
                History.stateChanged || tryAgain(),
                !0
        }, History.options.doubleCheckInterval)),
            History
        }
        ,
        History.safariStatePoll = function () {
            var urlState = History.extractState(History.getLocationHref()), newState;
            if (!History.isLastSavedState(urlState))
                return newState = urlState,
                newState || (newState = History.createStateObject()),
                History.Adapter.trigger(window, "popstate"),
                History
        }
        ,
        History.back = function (queue) {
            return queue !== !1 && History.busy() ? (History.pushQueue({
            scope: History,
            callback: History.back,
            args: arguments,
            queue: queue
        }),
            !1) : (History.busy(!0),
            History.doubleCheck(function () {
                History.back(!1)
        }),
            history.go(-1),
            !0)
        }
        ,
        History.forward = function (queue) {
            return queue !== !1 && History.busy() ? (History.pushQueue({
            scope: History,
            callback: History.forward,
            args: arguments,
            queue: queue
        }),
            !1) : (History.busy(!0),
            History.doubleCheck(function () {
                History.forward(!1)
        }),
            history.go(1),
            !0)
        }
        ,
        History.go = function (index, queue) {
            var i;
            if (index > 0)
                for (i = 1; i <= index; ++i)
                    History.forward(queue);
        else if (index < 0)
                for (i = -1; i >= index; --i)
                    History.back(queue);
        else
                throw new Error("History.go: History.go requires a positive or negative integer passed.");
            return History
        }
        ,
        History.emulated.pushState) {
            var emptyFunction = function () { }
            ;
            History.pushState = History.pushState || emptyFunction;
            History.replaceState = History.replaceState || emptyFunction
        } else
            History.onPopState = function (event, extra) {
                var stateId = !1, newState = !1, currentHash, currentState;
                return (History.doubleCheckComplete(),
                currentHash = History.getHash(),
                currentHash) ? (currentState = History.extractState(currentHash || History.getLocationHref(), !0),
                currentState ? History.replaceState(currentState.data, currentState.title, currentState.url, !1) : (History.Adapter.trigger(window, "anchorchange"),
                History.busy(!1)),
                History.expectedStateId = !1,
                !1) : (stateId = History.Adapter.extractEventData("state", event, extra) || !1,
                newState = stateId ? History.getStateById(stateId) : History.expectedStateId ? History.getStateById(History.expectedStateId) : History.extractState(History.getLocationHref()),
                newState || (newState = History.createStateObject(null, null, History.getLocationHref())),
                History.expectedStateId = !1,
                History.isLastSavedState(newState)) ? (History.busy(!1),
                !1) : (History.storeState(newState),
                History.saveState(newState),
                History.setTitle(newState),
                History.Adapter.trigger(window, "statechange"),
                History.busy(!1),
                !0)
            }
            ,
            History.Adapter.bind(window, "popstate", History.onPopState),
            History.pushState = function (data, title, url, queue) {
                if (History.getHashByUrl(url) && History.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (queue !== !1 && History.busy())
                    return History.pushQueue({
                        scope: History,
                        callback: History.pushState,
                        args: arguments,
                        queue: queue
                    }),
                    !1;
                History.busy(!0);
                var newState = History.createStateObject(data, title, url);
                return History.isLastSavedState(newState) ? History.busy(!1) : (History.storeState(newState),
                History.expectedStateId = newState.id,
                history.pushState(newState.id, newState.title, newState.url),
                History.Adapter.trigger(window, "popstate")),
                !0
            }
            ,
            History.replaceState = function (data, title, url, queue) {
                if (History.getHashByUrl(url) && History.emulated.pushState)
                    throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");
                if (queue !== !1 && History.busy())
                    return History.pushQueue({
                        scope: History,
                        callback: History.replaceState,
                        args: arguments,
                        queue: queue
                    }),
                    !1;
                History.busy(!0);
                var newState = History.createStateObject(data, title, url);
                return History.isLastSavedState(newState) ? History.busy(!1) : (History.storeState(newState),
                History.expectedStateId = newState.id,
                history.replaceState(newState.id, newState.title, newState.url),
                History.Adapter.trigger(window, "popstate")),
                !0
            }
        ;
        if (sessionStorage) {
            try {
                History.store = JSON.parse(sessionStorage.getItem("History.store")) || {}
            } catch (err) {
                History.store = {}
            }
            History.normalizeStore()
        } else
            History.store = {},
            History.normalizeStore();
        if (History.Adapter.bind(window, "unload", History.clearAllIntervals),
        History.saveState(History.storeState(History.extractState(History.getLocationHref(), !0))),
        sessionStorage && (History.onUnload = function () {
            var currentStore, item, currentStoreString;
            try {
                currentStore = JSON.parse(sessionStorage.getItem("History.store")) || {}
        } catch (err) {
                currentStore = {}
        }
            currentStore.idToState = currentStore.idToState || {};
            currentStore.urlToId = currentStore.urlToId || {};
            currentStore.stateToId = currentStore.stateToId || {};
            for (item in History.idToState)
                History.idToState.hasOwnProperty(item) && (currentStore.idToState[item] = History.idToState[item]);
            for (item in History.urlToId)
                History.urlToId.hasOwnProperty(item) && (currentStore.urlToId[item] = History.urlToId[item]);
            for (item in History.stateToId)
                History.stateToId.hasOwnProperty(item) && (currentStore.stateToId[item] = History.stateToId[item]);
            History.store = currentStore;
            History.normalizeStore();
            currentStoreString = JSON.stringify(currentStore);
            try {
                sessionStorage.setItem("History.store", currentStoreString)
        } catch (e) {
                if (e.code === DOMException.QUOTA_EXCEEDED_ERR)
                    sessionStorage.length && (sessionStorage.removeItem("History.store"),
                    sessionStorage.setItem("History.store", currentStoreString));
        else
                    throw e;
        }
        }
        ,
        History.intervalList.push(setInterval(History.onUnload, History.options.storeInterval)),
        History.Adapter.bind(window, "beforeunload", History.onUnload),
        History.Adapter.bind(window, "unload", History.onUnload)),
        !History.emulated.pushState && (History.bugs.safariPoll && History.intervalList.push(setInterval(History.safariStatePoll, History.options.safariPollInterval)),
        (navigator.vendor === "Apple Computer, Inc." || (navigator.appCodeName || "") === "Mozilla") && (History.Adapter.bind(window, "hashchange", function () {
            History.Adapter.trigger(window, "popstate")
        }),
        History.getHash())))
            History.Adapter.onDomLoad(function () {
                History.Adapter.trigger(window, "hashchange")
            })
    }
    ;
    History.options && History.options.delayInit || History.init()
})(window)
