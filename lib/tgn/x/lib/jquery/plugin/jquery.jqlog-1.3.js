jQuery.jqlog = {
    _enabled: !1,
    _url: null,
    _componentId: null,
    _hostName: null,
    version: "1.3",
    targets: [],
    entryDefaults: {
        timestamp: null,
        origionUrl: "",
        message: "",
        format: function () {
            var msg = this.message;
            return typeof this.message != "object" && (msg = "[" + this.timestamp.getDate() + "/" + (this.timestamp.getMonth() + 1) + "/" + this.timestamp.getFullYear() + " " + this.timestamp.getHours() + ":" + this.timestamp.getMinutes() + ":" + this.timestamp.getSeconds() + "." + this.timestamp.getMilliseconds() + "] " + this.message.toString()),
            msg
        }
    },
    targetDefaults: {
        name: "",
        log: function () { }
    },
    init: function (url, enable) {
        this.init(url, enable, null)
    },
    init: function (url, enable, cid) {
        this.init(url, enable, cid, null)
    },
    init: function (url, enable, cid, host) {
        this.enabled(enable);
        this.url(url);
        this.componentId(cid);
        this.hostName(host)
    },
    enabled: function (enable) {
        return enable !== undefined && (this._enabled = enable),
        this._enabled
    },
    url: function (s) {
        return s !== undefined && (this._url = s),
        this._url
    },
    componentId: function (cid) {
        cid && !this._componentId && (this._componentId = cid)
    },
    hostName: function (host) {
        host && !this._hostName && (this._hostName = host)
    },
    log: function (object, options) {
        if (this.enabled()) {
            var t, target, entry = jQuery.extend({}, this.entryDefaults, {
                timestamp: new Date,
                origionUrl: this.url(),
                message: object
            }, options);
            if (!this.isExcluded(entry))
                for (t in this.targets)
                    if (this.targets.hasOwnProperty(t) && (target = this.targets[t],
                    target.log))
                        try {
                            target.log(entry)
                        } catch (err) { }
        }
    },
    isExcluded: function () {
        return !1
    }
};

jQuery.fn.log = function (options) {
    return this.each(function () {
        jQuery.jqlog.log(this, options)
    })
};

jQuery.extend(jQuery.jqlog, {
    _level: null,
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    level: function (level) {
        return level !== undefined && (this._level = level),
        this._level
    },
    isExcluded: function (entry) {
        var excluded = !1;
        return this._level && entry.level !== undefined && (excluded = this._level > entry.level),
        excluded
    },
    info: function (object, options) {
        var settings = jQuery.extend({
            level: this.levels.info
        }, options);
        this.log(object, settings)
    },
    warn: function (object, options) {
        var settings = jQuery.extend({
            level: this.levels.warn
        }, options);
        this.log(object, settings)
    },
    error: function (object, options) {
        var settings = jQuery.extend({
            level: this.levels.error
        }, options);
        this.log(object, settings)
    }
});

jQuery.jqlog.entryDefaults.level = jQuery.jqlog.levels.info;

jQuery.jqlog.targets.bd = jQuery.extend({}, jQuery.jqlog.targetDefaults, {
    name: "bd",
    version: "1.0",
    log: function (entry) {
        if (entry && entry.origionUrl) {
            var errorTransportFunc = function (jqXhr, textStatus, errorThrown) {
                errorThrown && errorThrown.toLowerCase() == "no transport" && (requestProperties.type = "GET",
                requestProperties.dataType = "jsonp",
                requestProperties.jsonpCallback = "$.noop",
                requestProperties.error = function () { }
                ,
                $.ajax(requestProperties))
            }
              , requestData = JSON.stringify({
                  eventName: entry.message.eventName,
                  componentId: jQuery.jqlog._componentId,
                  hostName: jQuery.jqlog._hostName,
                  eventProperties: entry.message.eventParams
              })
              , requestProperties = {
                  type: "POST",
                  url: entry.origionUrl,
                  timeout: 500,
                  crossDomain: !0,
                  cache: !1,
                  data: requestData,
                  xhrFields: {
                      withCredentials: !0
                  },
                  success: function () { },
                  error: errorTransportFunc
              };
            $.ajax(requestProperties)
        }
    }
})
