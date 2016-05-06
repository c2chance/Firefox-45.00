var $trees;
$trees = typeof TGN == "undefined" ? typeof YAHOO != "undefined" ? YAHOO.namespace("Ancestry.Trees") : {} : TGN.namespace("TGN.Ancestry.Trees");
$trees.res = {
    resourceStrings: null ,
    getString: function(key) {
        var value = null  != $trees.res.resourceStrings ? $trees.res.resourceStrings[key] : null ;
        return value ? value : "$$" + key
    },
    setString: function(key, value) {
        $trees.res.resourceStrings || ($trees.res.resourceStrings = {});
        $trees.res.resourceStrings[key] = value
    }
};
$trees.content = {
    objs: null ,
    getObject: function(key) {
        return null  != $trees.content.objs ? $trees.content.objs[key] : null 
    },
    setObject: function(key, value) {
        $trees.content.objs || ($trees.content.objs = {});
        $trees.content.objs[key] = value
    },
    getPersonKey: function(tid, pid) {
        return "person_" + pid.toString()
    },
    setPerson: function(tid, pid, value) {
        $trees.content.setObject($trees.content.getPersonKey(tid, pid), value)
    },
    getPerson: function(tid, pid) {
        return $trees.content.getObject($trees.content.getPersonKey(tid, pid))
    },
    addPerson: function(typ, rel, name, gname, sname, birth, birthPlace, death, deathPlace, linkUrl, imgUrl, gender, sid, pid, tid, pageStackArgs) {
        var fm;
        return linkUrl = linkUrl.replace(/"/g, "'"),
        fm = {
            typ: typ,
            rel: rel,
            name: name,
            gname: gname,
            sname: sname,
            birth: birth,
            birthPlace: birthPlace,
            death: death,
            deathPlace: deathPlace,
            linkUrl: linkUrl,
            imgUrl: imgUrl,
            gender: gender,
            sid: sid,
            pid: pid,
            tid: tid,
            pageStackArgs: pageStackArgs
        },
        $trees.content.setPerson(tid, pid, fm),
        fm
    }
};
$trees.util = {
    gotoTemplate: null ,
    setGotoTemplate: function(template) {
        $trees.util.gotoTemplate = template
    },
    gotoPerson: function(tid, pid) {
        if ($trees.util.gotoTemplate != null  && pid != null ) {
            var url = $trees.util.gotoTemplate.indexOf("{p}") !== -1 ? $trees.util.gotoTemplate.replace("{t}", tid).replace("{p}", pid) : unescape($trees.util.gotoTemplate).replace(/{cfpid}/, pid);
            window.location.href = url
        }
    },
    getShortName: function(name) {
        if (name && 40 < name.length) {
            var temp = [];
            temp = name.split(" ");
            name = temp[0].charAt(0) + " " + temp[temp.length - 1]
        }
        return name
    },
    getYearFromDate: function(date) {
        var year = "", validYear;
        return date && "" != date && (validYear = validDateSimple(date),
        0 == validYear[0] && (year = validYear[1])),
        year
    },
    imposeMaxLength: function(Object, MaxLen) {
        return Object.value.length > MaxLen && (Object.value = Object.value.substring(0, MaxLen)),
        !0
    },
    htmlEncode: function(s) {
        var div = document.createElement("div")
          , text = document.createTextNode(s);
        return div.appendChild(text),
        div.innerHTML
    },
    htmlDecode: function(s) {
        var div = document.createElement("div");
        return div.innerHTML = s.replace(/<\/?[^>]+>/gi, ""),
        div.childNodes[0] ? div.childNodes[0].nodeValue : ""
    },
    appendArgsDistinct: function(url, args, stripArgs) {
        var toStrip = stripArgs.split(","), conjunction = "?", hookPos = url.indexOf("?"), existingUrlArgs, nextArgPos, endArg, checkingArg, hookOrAmp;
        if (hookPos > 0) {
            for (existingUrlArgs = url.substring(hookPos + 1); existingUrlArgs.length > 0; ) {
                if (nextArgPos = existingUrlArgs.indexOf("&"),
                endArg = existingUrlArgs.indexOf("="),
                endArg < 0 && (endArg = existingUrlArgs.length),
                checkingArg = existingUrlArgs.substring(0, endArg),
                args.indexOf(checkingArg + "=") >= 0 || this.contains(toStrip, checkingArg)) {
                    var endArgWithVal = nextArgPos > 0 ? nextArgPos : existingUrlArgs.length
                      , removeArg = existingUrlArgs.substring(0, endArgWithVal)
                      , removePos = url.indexOf(removeArg);
                    url.length > removePos + removeArg.length ? url = url.replace(removeArg + "&", "") : (hookOrAmp = url.charAt(removePos - 1),
                    url = url.replace(hookOrAmp + removeArg, ""))
                }
                existingUrlArgs = nextArgPos > 0 ? existingUrlArgs.substring(nextArgPos + 1) : ""
            }
            url.length > hookPos && (conjunction = "&")
        }
        return url + conjunction + args
    },
    contains: function(arr, obj) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i] === obj)
                return !0;
        return !1
    },
    trim: function(str) {
        return str.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1")
    },
    setPageTrackingName: function(page, func) {
        s = s_gi(s_account);
        (s.pageName.length == 0 || s.pageName.indexOf(":") == -1) && (s.pageName = "Ancestry ?? : Trees :");
        var index = s.pageName.indexOf(":");
        index = s.pageName.indexOf(":", index + 1);
        s.pageName = index != -1 ? s.pageName.substring(0, index + 1) + " " + page + " : " + func : "Ancestry ?? : Trees : " + page + " : " + func;
        s_pageName = s.pageName;
        s.t()
    },
    getParameterByName: function(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)")
          , results = regex.exec(location.search);
        return results === null  ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
    },
    appendPageArgs: function(url, pageArgs) {
        return url.indexOf("?") == -1 ? url + "?" + pageArgs : url + "&" + pageArgs
    },
    buildUrlWithHistory: function(pageName, urlArgs, staticUrl, pageStackArgs) {
        var deferred = $.Deferred();
        return typeof ancestry != "undefined" && ancestry.pub ? ancestry.pub.buildUrl().toGoTo(pageName, urlArgs).toComeBackToCurrent().build(function(err, url) {
            err && window.console != null  && console.warn(err);
            deferred.resolve(url)
        }) : deferred.resolve($trees.util.appendPageArgs(staticUrl, pageStackArgs)),
        deferred
    },
    decodeHTML: function(obj) {
        var div = document.createElement("div"), prop, value;
        if (typeof obj == "object")
            for (prop in obj)
                value = obj[prop],
                value && (div.innerHTML = value,
                obj[prop] = div.innerText || div.textContent || value),
                div.innerHTML = "";
        else
            typeof obj == "string" && (div.innerHTML = obj,
            obj = div.innerText || div.textContent || obj);
        return obj
    }
}
