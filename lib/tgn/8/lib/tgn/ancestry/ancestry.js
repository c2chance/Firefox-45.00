var TGN, _YDom, $Anc;
typeof TGN == "undefined" && (TGN = {});
_YDom = YAHOO.util.Dom;
TGN.namespace = function() {
    for (var a = arguments, o = null , j, d, i = 0; i < a.length; i++)
        for (d = a[i].split("."),
        o = TGN,
        j = d[0] == "TGN" ? 1 : 0; j < d.length; j++)
            o[d[j]] = o[d[j]] || {},
            o = o[d[j]];
    return o
}
;
$Anc = TGN.namespace("Ancestry");
$Anc.ShowHide = function(id) {
    var e = document.getElementById(id);
    e != null  && (e.style.display = e.style.display == "block" ? "none" : "block")
}
;
$Anc.PublishException = function(feature, method, err, jsFile) {
    var url = "/JavaScriptException.ashx?f=" + escape(feature) + "&m=" + escape(method) + "&e=" + escape(err) + "&js=" + escape(jsFile) + "&u=" + escape(document.location.href);
    if (YAHOO.util.Get.script(url, {}),
    typeof console != "undefined" && console.error("JavaScript Error: Feature: " + feature + " Method: " + method + " Err: " + err + " JsFile: " + jsFile),
    document.location.href.indexOf("jsdebug=alert") > 1 && alert("JavaScript Error: \nFeature: " + feature + " \nMethod: " + method + " \nErr: " + err + " \nJsFile: " + jsFile),
    document.location.href.indexOf("jsdebug=break") > 1)
        throw "$Anc.PublishException: jsdebug=break";
}
;
$Anc.loaded = [];
$Anc.depend = function() {}
;
$Anc.load = function(config) {
    var dependNames, i;
    if (config.type != undefined && config.type.length > 0) {
        if ($Anc.isLoaded(config.type))
            return config.onSuccess(config);
        var loader = new YAHOO.util.YUILoader({
            require: "dependency",
            onSuccess: function() {
                $Anc.loadLibs(this.data)
            },
            onFailure: function(o) {
                if (this.data.onFailure != undefined)
                    this.data.onFailure(o.msg)
            },
            onTimeout: function(o) {
                if (this.data.onTimeout != undefined)
                    this.data.onTimeout(o.msg);
                else if (this.data.failure != undefined)
                    this.data.onFailure(o.msg)
            },
            data: config,
            timeout: config.timeout != undefined ? config.timeout : 1e4
        })
          , combineTGN = config.combineTGN != undefined && !config.combineTGN ? "&cmbTGN=false" : ""
          , combineYUI = config.combineYUI != undefined && !config.combineYUI ? "&cmbYUI=false" : "";
        loader.addModule({
            name: "dependency",
            type: "js",
            fullpath: "http://c.ancestrydev.com/dependency.jsx?type=" + config.type + combineTGN + combineYUI
        });
        loader.insert()
    } else if (config.libs != undefined && config.libs.length > 0) {
        for (dependNames = [],
        i = 0; i < config.libs.length; i++)
            $Anc.isLoaded(config.libs[i].name) || dependNames.push(config.libs[i].name);
        if (dependNames.length > 0) {
            for (loader = new YAHOO.util.YUILoader({
                require: dependNames,
                onSuccess: function() {
                    for (var i = 0; i < this.data.libs.length; i++)
                        $Anc.loaded.push(this.data.libs[i].name);
                    this.data.onSuccess(this.data)
                },
                onFailure: function(o) {
                    if (this.data.onFailure != undefined)
                        this.data.onFailure(o.msg)
                },
                onTimeout: function(o) {
                    if (this.data.onTimeout != undefined)
                        this.data.onTimeout(o.msg);
                    else if (this.data.failure != undefined)
                        this.data.onFailure(o.msg)
                },
                data: config,
                timeout: config.timeout != undefined ? config.timeout : 1e4
            }),
            i = 0; i < config.libs.length; i++)
                loader.addModule(config.libs[i]);
            loader.insert()
        } else
            config.onSuccess(config)
    } else if (config.onFailure != undefined)
        config.onFailure("no type or libs defined");
    return ""
}
;
$Anc.loadLibs = function(config) {
    var type = config.type.toLowerCase(), dependNames, dependLibs, i, name, loader;
    if ($Anc.depend[type].names.length > 0) {
        for (dependNames = [],
        dependLibs = $Anc.depend[type].libs,
        i = 0; i < $Anc.depend[type].names.length; i++)
            name = $Anc.depend[type].names[i],
            $Anc.isLoaded(name) || dependNames.push(name);
        if (config.libs != undefined && config.libs.length > 0)
            for (i = 0; i < config.libs.length; i++)
                $Anc.isLoaded(config.libs[i].name) || (dependNames.push(config.libs[i].name),
                dependLibs.push(config.libs[i]));
        if (dependNames.length > 0) {
            for (config.dependNames = dependNames,
            loader = new YAHOO.util.YUILoader({
                require: dependNames,
                onSuccess: function() {
                    var i, name;
                    for ($Anc.loaded.push(this.data.type),
                    i = 0; i < this.data.dependNames.length; i++)
                        name = this.data.dependNames[i],
                        name != "yuiLibs" && name != "yuiAssets" && name != "tgnLibs" && name != "tgnAssets" && $Anc.loaded.push(name);
                    this.data.onSuccess(this.data)
                },
                onFailure: function(o) {
                    if (this.data.onFailure != undefined)
                        this.data.onFailure(o.msg)
                },
                onTimeout: function(o) {
                    if (this.data.onTimeout != undefined)
                        this.data.onTimeout(o.msg);
                    else if (this.data.failure != undefined)
                        this.data.onFailure(o.msg)
                },
                data: config,
                timeout: config.timeout != undefined ? config.timeout : 1e4
            }),
            i = 0; i < dependLibs.length; i++)
                loader.addModule(dependLibs[i]);
            loader.insert()
        } else
            this.data.onSuccess(this.data)
    } else if (config.onFailure != undefined)
        config.onFailure("no dependencies defined")
}
;
$Anc.isLoaded = function(name) {
    var i;
    for (name = name.toLowerCase(),
    i = 0; i < $Anc.loaded.length; i++)
        if ($Anc.loaded[i].toLowerCase() == name)
            return !0;
    return !1
}
