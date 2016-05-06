var ResourceManager = function() {
    function _parseResourceUrl(uri, pageResources, combinatorUrlRegex) {
        var parts, k;
        if (combinatorUrlRegex && combinatorUrlRegex.test(uri))
            for (parts = uri.substring(uri.indexOf("?") + 1, uri.length).split("&"),
            k = 0; k < parts.length; k++)
                pageResources[parts[k].toLowerCase()] = !0;
        else
            pageResources[uri.toLowerCase()] = !0
    }
    function _extractPageResourceUrls(combinatorUrl) {
        var pageResources = {}
          , combinatorRegex = _getCombinatorRegex(combinatorUrl);
        return _findPageResources("script", ["src", "data-src"], pageResources, combinatorRegex),
        _findPageResources("link", ["href"], pageResources, combinatorRegex),
        _findPageResources("style", ["data-href"], pageResources, combinatorRegex),
        pageResources
    }
    function _getCombinatorRegex(combinatorUrl) {
        return combinatorUrl ? new RegExp("^" + combinatorUrl,"i") : null 
    }
    function _findPageResources(tagName, attributeNames, pageResources, combinatorUrlRegex) {
        for (var item, j, att, k, elements = document.getElementsByTagName(tagName), i = 0; i < elements.length; i++)
            for (item = elements[i],
            j = 0; j < item.attributes.length; j++)
                for (att = item.attributes[j],
                k = 0; k < attributeNames.length; k++)
                    if (att.nodeName.toLowerCase() === attributeNames[k]) {
                        _parseResourceUrl(att.value, pageResources, combinatorUrlRegex);
                        break
                    }
    }
    function _queueResources(resources, pageResources, combinatorUrl) {
        for (var resource, resourceName, queryStrings = {
            script: "",
            style: ""
        }, i = 0; i < resources.length; i++)
            resource = resources[i],
            resourceName = resource.toLowerCase(),
            resourceName in _queuedUrls || resourceName in pageResources || (QUALIFIED_URL_REGEX.test(resource) ? (_queueAndResetCombinedQuery(combinatorUrl, queryStrings, _getResourceType(resource)),
            _queueResource(resource, combinatorUrl)) : _appendCombinatedResourceItem(combinatorUrl, resource, queryStrings));
        _queueIfAnyCombinated(combinatorUrl, queryStrings.script);
        _queueIfAnyCombinated(combinatorUrl, queryStrings.style);
        _callbackIfReady()
    }
    function _queueAndResetCombinedQuery(combinatorUrl, queryStrings, resourceType) {
        _queueIfAnyCombinated(combinatorUrl, queryStrings[resourceType]);
        queryStrings[resourceType] = ""
    }
    function _appendCombinatedResourceItem(combinatorUrl, resource, queryStrings) {
        var resourceType = _getResourceType(resource);
        resourceType !== "" && (queryStrings[resourceType].length + resource.length > MAX_QUERY_STRING_LENGTH && _queueAndResetCombinedQuery(combinatorUrl, queryStrings, resourceType),
        queryStrings[resourceType] += "&" + resource)
    }
    function _getResourceType(resourceUrl) {
        var resourceType = "";
        return SCRIPT_FILE_REGEX.test(resourceUrl) ? resourceType = "script" : STYLE_FILE_REGEX.test(resourceUrl) && (resourceType = "style"),
        resourceType
    }
    function _queueIfAnyCombinated(combinatorUrl, queryString) {
        queryString.length > 0 && (queryString = queryString.replace(/^&/, "?"),
        _queueResource(combinatorUrl + decodeURIComponent(queryString), combinatorUrl))
    }
    function _serviceQueue() {
        while (!_queuePaused && _resourceQueue.length > 0 && _queuedItems[_resourceQueue[0].toLowerCase()]) {
            var item = _dequeueItem()
              , head = document.getElementsByTagName("head").item(0);
            SCRIPT_FILE_REGEX.test(item.resourceUrl) ? head.appendChild(_createScriptTag(item.resourceUrl, item.data)) : STYLE_FILE_REGEX.test(item.resourceUrl) && head.appendChild(_createStyleTag(item.resourceUrl, item.data))
        }
        _callbackIfReady()
    }
    function _dequeueItem() {
        var resourceUrl = _resourceQueue.shift(), resourceName = resourceUrl.toLowerCase(), item = _queuedItems[resourceName], urls, url;
        delete _queuedItems[resourceName];
        urls = {};
        _parseResourceUrl(resourceName, urls, _getCombinatorRegex(item.combinatorUrl));
        for (url in urls)
            delete _queuedUrls[url];
        return {
            resourceUrl: resourceUrl,
            data: item.data
        }
    }
    function _createScriptTag(resourceUrl, data) {
        var tag = document.createElement("script");
        return tag.type = "text/javascript",
        tag.defer = !1,
        data === !0 ? (tag.src = resourceUrl,
        _queuePaused = !0,
        _public.hookScriptLoad(tag, _resumeQueue)) : (tag.setAttribute("data-src", resourceUrl),
        tag.text = data),
        tag
    }
    function _createStyleTag(resourceUrl, data) {
        var tag, rules;
        return data === !0 ? (tag = document.createElement("link"),
        tag.href = resourceUrl,
        tag.rel = "stylesheet",
        tag.type = "text/css",
        _queuePaused = !0,
        _public.hookStyleLinkLoad(tag, _resumeQueue)) : (rules = document.createTextNode(data),
        tag = document.createElement("style"),
        tag.type = "text/css",
        tag.setAttribute("data-href", resourceUrl),
        tag.styleSheet ? tag.styleSheet.cssText = rules.nodeValue : tag.appendChild(rules)),
        tag
    }
    function _resumeQueue(success) {
        _anyError = _anyError & !success;
        _queuePaused = !1;
        _serviceQueue()
    }
    function _callbackIfReady() {
        if (!_queuePaused && _resourceQueue.length === 0) {
            while (_queueCallbacks.length > 0) {
                var callback = _queueCallbacks.shift();
                callback && callback.call(window, !_anyError)
            }
            _anyError = !1
        }
    }
    function _resourceLoaded(resourceUrl, data) {
        _queuedItems[resourceUrl.toLowerCase()].data = data;
        _serviceQueue()
    }
    function _queueResource(resourceUrl, combinatorUrl) {
        if (QUALIFIED_URL_REGEX.test(resourceUrl))
            _queueItem(resourceUrl, combinatorUrl, !0);
        else {
            _queueItem(resourceUrl, combinatorUrl, null );
            var ajax = new XMLHttpRequest;
            ajax.onreadystatechange = function() {
                ajax.readyState == 4 && (ajax.status == 200 ? _resourceLoaded(resourceUrl, ajax.responseText) : _anyError = !0)
            }
            ;
            ajax.open("GET", resourceUrl, !0);
            ajax.send()
        }
        _serviceQueue()
    }
    function _queueItem(resourceUrl, combinatorUrl, data) {
        var resourceName, urls, url;
        _resourceQueue.push(resourceUrl);
        resourceName = resourceUrl.toLowerCase();
        _queuedItems[resourceName] = {
            data: data,
            combinatorUrl: combinatorUrl
        };
        urls = {};
        _parseResourceUrl(resourceName, urls, _getCombinatorRegex(combinatorUrl));
        for (url in urls)
            _queuedUrls[url] = !0
    }
    var MAX_QUERY_STRING_LENGTH = 2e3
      , STYLE_FILE_REGEX = /\.css(\?.*)?$/i
      , SCRIPT_FILE_REGEX = /\.js(\?.*)?$/i
      , QUALIFIED_URL_REGEX = /^(https?:)?\/\//i
      , STYLE_LOAD_TIMEOUT = 5e3
      , _resourceQueue = []
      , _queuedItems = {}
      , _queuedUrls = {}
      , _queueCallbacks = []
      , _queuePaused = !1
      , _anyError = !1
      , _public = {
        addResources: function(cdnCombinatorUrl, resources, resourcesLoadedCallback) {
            _queueCallbacks.push(resourcesLoadedCallback);
            cdnCombinatorUrl = "" + cdnCombinatorUrl;
            var pageResources = _extractPageResourceUrls(cdnCombinatorUrl);
            _queueResources(resources, pageResources, cdnCombinatorUrl)
        },
        addResource: function(resourceUrl, resourcesLoadedCallback) {
            _queueCallbacks.push(resourcesLoadedCallback);
            _queueResource(resourceUrl, null )
        },
        hookScriptLoad: function(scriptTag, callback) {
            scriptTag.onreadystatechange === null  ? scriptTag.onreadystatechange = function() {
                this.readyState == "complete" ? callback(!0) : this.readyState == "loaded" && callback(!1)
            }
             : scriptTag.onload = function() {
                callback(!0)
            }
        },
        hookStyleLinkLoad: function(linkTag, callback) {
            var sheet, cssRules;
            "sheet" in linkTag ? (sheet = "sheet",
            cssRules = "cssRules") : (sheet = "styleSheet",
            cssRules = "rules");
            var numSheets = document.styleSheets.length
              , poll = setInterval(function() {
                try {
                    document.styleSheets.length != numSheets && (clearInterval(poll),
                    clearTimeout(failTimer),
                    callback.call(window, !0))
                } catch (e) {}
            }, 10)
              , failTimer = setTimeout(function() {
                clearInterval(poll);
                clearTimeout(failTimer);
                callback.call(window, !1)
            }, STYLE_LOAD_TIMEOUT)
        }
    };
    return _public
}()
