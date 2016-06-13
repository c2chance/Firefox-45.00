function loadJSFile(file) {
    if (!hasJSFile(file)) {
        var fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", file);
        document.getElementsByTagName("head").item(0).appendChild(fileref)
    }
}

function loadCSSFile(file) {
    if (!hasCSSFile(file)) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", file);
        document.getElementsByTagName("head").item(0).appendChild(fileref)
    }
}

function hasJSFile(file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("script"),
        i = 0; i < array.length; i++)
            if (array.item(i).src != null  && array.item(i).src.toLowerCase() == file.toLowerCase())
                return !0
    } catch (e) {}
    return !1
}

function hasCSSFile(file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("link"),
        i = 0; i < array.length; i++)
            if (array.item(i).href != null  && array.item(i).href.toLowerCase() == file.toLowerCase())
                return !0
    } catch (e) {}
    return !1
}

function loadAddPersonFiles(info) {
    loadCSSFile(v_treesCacheUrl + "dialogs.css");
    v_isIE7 === "True" && loadCSSFile(v_treesCacheUrl + "dialogsie7.css");
    v_isDESite === "True" && loadCSSFile(v_treesCacheUrl + "dialogsde.css");
    v_isCAFRSite === "True" && loadCSSFile(v_treesCacheUrl + "dialogscafr.css");
    v_useNewAddDialogs === "True" ? $Anc.load({
        type: "addfamilydialogex",
        onSuccess: addPersonLoadSuccess,
        info: info
    }) : $Anc.load({
        type: "addfamilydialog",
        onSuccess: addPersonLoadSuccess,
        info: info
    })
}

function addPersonOnDemand(tid, pid, sid, rel, pgStkArgs) {
    var info = {
        rel: rel,
        tid: tid,
        pid: pid,
        sid: sid,
        pageStackArgs: pgStkArgs
    };
    $trees.addFamilyDialog != null  && typeof $trees.addFamilyDialog.addRelation == "function" ? (initValidationStrings(),
    info.rel === "M" ? $trees.addFamilyDialog.addBrother(info) : info.rel === "F" ? $trees.addFamilyDialog.addSister(info) : $trees.addFamilyDialog.addRelation(info)) : loadAddPersonFiles(info)
}

function addPersonOnDemandLegacy(tid, pid, sid, rel, msg, basePage, pgStkArgs, cnt) {
    if (typeof addPerson == "function")
        addPerson(tid, pid, sid, rel, msg, basePage, pgStkArgs);
    else {
        if (typeof cnt == "undefined")
            var cnt = 0;
        cnt++;
        cnt > 25 && (addPersonFilesLoadedLegacy = !1,
        cnt = 0);
        loadAddPersonFilesLegacy();
        setTimeout("addPersonOnDemandLegacy('" + tid + "', '" + pid + "', '" + sid + "', '" + rel + "', '" + msg + "', '" + basePage + "', '" + pgStkArgs + "'," + cnt + ")", 200)
    }
}

function loadAddPersonFilesLegacy() {
    addPersonFilesLoadedLegacy || (addPersonFilesLoadedLegacy = !0,
    $Anc.load({
        type: "addpersondialog"
    }))
}

function addPersonLoadSuccess() {
    initValidationStrings();
    this.info.rel ? this.info.rel === "M" ? $trees.addFamilyDialog.addBrother(this.info) : this.info.rel === "F" ? $trees.addFamilyDialog.addSister(this.info) : $trees.addFamilyDialog.addRelation(this.info) : ($trees.addFamilyDialog.selectRelative(this.info.tid, this.info.pid, this.info.pageStackArgs),
    $.modal.center())
}

function addPersonTVOnDemand(tid, pid, pgStkArgs) {
    var info = {
        tid: tid,
        pid: pid,
        pageStackArgs: pgStkArgs
    };
    loadAddPersonFiles(info)
}

function loadAddFamilyFiles(info) {
    loadCSSFile(v_treesCacheUrl + "dialogs.css");
    v_isIE7 === "True" && loadCSSFile(v_treesCacheUrl + "dialogsie7.css");
    v_isDESite === "True" && loadCSSFile(v_treesCacheUrl + "dialogsde.css");
    v_isCAFRSite === "True" && loadCSSFile(v_treesCacheUrl + "dialogscafr.css");
    v_useNewAddDialogs === "True" ? $Anc.load({
        type: "addfamilydialogex",
        onSuccess: addFamilyLoadSuccess,
        info: info
    }) : $Anc.load({
        type: "addfamilydialog",
        onSuccess: addFamilyLoadSuccess,
        info: info
    })
}

function addFamilyOnDemand(tid, pid, pgStkArgs) {
    var info = {
        tid: tid,
        pid: pid,
        pageStackArgs: pgStkArgs
    };
    $trees.addFamilyDialog != null  && typeof $trees.addFamilyDialog.choose == "function" ? $trees.addFamilyDialog.choose(info) : loadAddFamilyFiles(info)
}

function addFamilyLoadSuccess() {
    initValidationStrings();
    $trees.addFamilyDialog.choose(this.info)
}

function loadEditPersonFiles(tid, pid, pgStkArgs) {
    loadCSSFile(v_treesCacheUrl + "uimenu.css");
    loadCSSFile(v_treesCacheUrl + "dialogs.css");
    v_isIE7 === "True" && loadCSSFile(v_treesCacheUrl + "dialogsie7.css");
    v_isDESite === "True" && loadCSSFile(v_treesCacheUrl + "dialogsde.css");
    v_isCAFRSite === "True" && loadCSSFile(v_treesCacheUrl + "dialogscafr.css");
    var script1 = $.ajax({
        url: "http://yui.yahooapis.com/combo?2.8.0/build/container/container-min.js",
        cache: !0,
        dataType: "script"
    })
      , prefix = "x" + new RegExp("http://[^/]+(.*/cdn)").exec(v_treesCacheUrl)[1] + "/"
      , script2 = $.getScript(v_cache + "lib/tgn/combo.ashx?" + prefix + "validation.js&" + prefix + "viewer/js/dialogmanagerall.js&" + prefix + "treedialogs.js&" + prefix + "editdialog.js&" + prefix + "plugin/jquery.ancautocomplete.js");
    jQuery.when(script1, script2).done(function() {
        editPersonLoadSuccess.call({
            tid: tid,
            pid: pid,
            pgStkArgs: pgStkArgs
        })
    })
}

function editDialogOnDemand(tid, pid, pgStkArgs) {
    $trees.editDialog != null  && typeof $trees.editDialog.show == "function" ? ($trees.editDialog.show(tid, pid, pgStkArgs),
    $.modal.center()) : loadEditPersonFiles(tid, pid, pgStkArgs)
}

function editPersonLoadSuccess() {
    initValidationStrings();
    $trees.editDialog.show(this.tid, this.pid, this.pgStkArgs);
    $.modal.center()
}

function initClickCard(treesDomain, focusFunc, pageStackParams) {
    clickCardTreesDomain = treesDomain;
    clickCardFocusFunc = focusFunc;
    clickCardPageStackParams = pageStackParams
}

function loadClickCardFiles(elPosition, tid, pid) {
    if (!clickCardFilesLoaded) {
        clickCardFilesLoaded = !0;
        loadCSSFile(v_treesCacheUrl + "clickcard.css");
        var script1 = $.ajax({
            url: "http://yui.yahooapis.com/combo?2.8.0/build/container/container-min.js",
            cache: !0,
            dataType: "script"
        })
          , prefix = "x" + new RegExp("http://[^/]+(.*/cdn)").exec(v_treesCacheUrl)[1] + "/"
          , script2 = $.getScript(v_cache + "lib/tgn/combo.ashx?" + prefix + "viewer/js/dialogmanagerall.js&" + prefix + "treedialogs.js&" + prefix + "clickcard.js");
        jQuery.when(script1, script2).done(function() {
            clickCardLoadSuccess.call({
                elPosition: elPosition,
                tid: tid,
                pid: pid
            })
        })
    }
}

function clickCardOnDemand(elPosition, tid, pid) {
    $trees.clickCard != null  && typeof $trees.clickCard.show == "function" ? $trees.clickCard.show(elPosition, tid, pid) : loadClickCardFiles(elPosition, tid, pid)
}

function clickCardLoadSuccess() {
    $trees.clickCard.init(clickCardTreesDomain, clickCardFocusFunc, clickCardPageStackParams);
    $trees.clickCard.show(this.elPosition, this.tid, this.pid)
}

function loadAudioFiles() {
    $Anc.load({
        type: "audiodialog",
        onSuccess: addAudioLoadSuccess
    })
}

function AddAudioStoryOnDemand(param1) {
    typeof AddAudioStory == "function" ? AddAudioStory(param1, audioAdded) : loadAudioFiles()
}

function addAudioLoadSuccess() {
    AddAudioStory(param1, audioAdded)
}

function PreloadYui(yuiUrl) {
    var baseUrl = "http://yui.yahooapis.com/2.7.0";
    typeof yuiUrl != "undefined" && (baseUrl = yuiUrl);
    baseUrl += "/build/";
    loadJSFile(baseUrl + "utilities/utilities.js");
    loadJSFile(baseUrl + "container/container-min.js");
    loadJSFile(baseUrl + "datasource/datasource-min.js");
    loadJSFile(baseUrl + "autocomplete/autocomplete-min.js")
}

function PreloadPedigreeFiles() {
    $Anc.load({
        type: "pedigree"
    })
}

var addPersonFilesLoadedLegacy = !1, clickCardTreesDomain, 
    clickCardFocusFunc, clickCardPageStackParams, 
    clickCardFilesLoaded = !1
