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
function loadAudioFiles() {
    audioFilesLoaded || (audioFilesLoaded = !0,
    $Anc.load({
        type: "audiodialog"
    }))
}
function loadAddPersonFiles() {
    addPersonFilesLoaded || (addPersonFilesLoaded = !0,
    loadCSSFile(v_treesCacheUrl + "Legacy/pt/modal_add.css"),
    $.getScript(v_treesCacheUrl + "tmp/addPerson.js"),
    $.getScript(v_treesCacheUrl + "Legacy/validation.js"))
}
function addPersonOnDemand(tid, pid, sid, rel, msg, basePage, ret, pg, cnt) {
    if (typeof addPerson == "function")
        addPerson(tid, pid, sid, rel, msg, basePage, ret, pg);
    else {
        if (typeof cnt == "undefined")
            var cnt = 0;
        cnt++;
        cnt > 25 && (addPersonFilesLoaded = !1,
        cnt = 0);
        loadAddPersonFiles();
        setTimeout("addPersonOnDemand('" + tid + "', '" + pid + "', '" + sid + "', '" + rel + "', '" + msg + "', '" + basePage + "', '" + ret + "', '" + pg + "'," + cnt + ")", 200)
    }
}
function AddAudioStoryOnDemand(param1, cnt) {
    typeof AddAudioStory == "function" ? AddAudioStory(param1, audioAdded) : (cnt++,
    cnt > 25 && (audioFilesLoaded = !1,
    cnt = 0),
    loadAudioFiles(),
    setTimeout("AddAudioStoryOnDemand('" + param1 + "'," + cnt + ")", 200))
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
    loadCSSFile(v_treesCacheUrl + "Legacy/trees_modal.css");
    loadCSSFile(v_treesCacheUrl + "Legacy/pt/heading.css");
    loadCSSFile(v_treesCacheUrl + "Legacy/pt/hints.css");
    loadCSSFile(v_treesCacheUrl + "Legacy/pt/hints_IE_hack.css");
    $.getScript(v_treesCacheUrl + "Legacy/hints.js");
    $.getScript(v_treesCacheUrl + "Legacy/pedigree.js");
    $.getScript(v_treesCacheUrl + "Legacy/trees_modal.js")
}
var audioFilesLoaded = !1
  , addPersonFilesLoaded = !1
