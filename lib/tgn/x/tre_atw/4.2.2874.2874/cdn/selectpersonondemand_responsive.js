if (typeof TGN == "undefined") var TGN = {};
TGN.namespace = function () {
    for (var a = arguments, o = null, j, d, i = 0; i < a.length; i++)
        for (d = a[i].split("."), o = TGN, j = d[0] == "TGN" ? 1 : 0; j < d.length; j++) o[d[j]] = o[d[j]] || {}, o = o[d[j]];
    return o
};
TGN.namespace("TGN.Ancestry.Trees.selectPerson");
$sp = TGN.Ancestry.Trees.selectPerson;
D$ = YAHOO.util.Dom.get;
TGN.Ancestry.Trees.selectPerson.callbackFunction;
TGN.Ancestry.Trees.selectPerson.extFileLoaded = 0;
TGN.Ancestry.Trees.selectPerson.extFileLoading = 0;
TGN.Ancestry.Trees.selectPerson.hasJSFile = function (file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("script"), i = 0; i < array.length; i++) try {
            if (array.item(i).src !== null && array.item(i).src.toLowerCase() == file.toLowerCase()) return !0
        } catch (e) {}
    } catch (e1) {}
    return !1
};
TGN.Ancestry.Trees.selectPerson.hasCSSFile = function (file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("link"), i = 0; i < array.length; i++) try {
            if (array.item(i).href != null && array.item(i).href.toLowerCase() == file.toLowerCase()) return !0
        } catch (e) {}
    } catch (e1) {}
    return !1
};
TGN.Ancestry.Trees.selectPerson.selectPersonFilesLoaded = !1;
TGN.Ancestry.Trees.selectPerson.loadSelectPersonFiles = function () {
    var i, aJS, aCSS, hasCssFile, loadCssFile;
    if (!$sp.selectPersonFilesLoaded) try {
        for ($sp.selectPersonFilesLoaded = !0, aJS = [], i = 0; i < v_sp_aJS.length; i++) $sp.hasJSFile(v_sp_aJS[i]) || aJS.push(v_sp_aJS[i]);
        for (aJS.length > 0 && ($sp.extFileLoading += 1, YAHOO.util.Get.script(aJS, {
                onSuccess: function () {
                    $sp.extFileLoaded += 1
                }
            })), aCSS = [], i = 0; i < v_sp_aCSS.length; i++) $sp.hasCSSFile(v_sp_aCSS[i]) || aCSS.push(v_sp_aCSS[i]);
        aCSS.length > 0 && ($sp.extFileLoading += 1, YAHOO.util.Get.css(aCSS, {
            onSuccess: function () {
                $sp.extFileLoaded += 1
            }
        }));
        hasCssFile = function (file) {
            var array, i;
            try {
                for (array = document.getElementsByTagName("link"), i = 0; i < array.length; i++)
                    if (array.item(i).href != null && array.item(i).href.toLowerCase() === file.toLowerCase()) return !0
            } catch (e) {}
            return !1
        };
        loadCssFile = function (file) {
            if (!hasCssFile(file)) {
                var fileref = document.createElement("link");
                fileref.setAttribute("rel", "stylesheet");
                fileref.setAttribute("type", "text/css");
                fileref.setAttribute("href", file);
                document.getElementsByTagName("head").item(0).appendChild(fileref)
            }
        };
        loadCssFile(v_treesCacheUrl + "dialogs.css");
        v_isIE7 === "True" && loadCssFile(v_treesCacheUrl + "dialogsie7.css");
        v_isDESite === "True" && loadCssFile(v_treesCacheUrl + "dialogsde.css");
        v_isCAFRSite === "True" && loadCssFile(v_treesCacheUrl + "dialogscafr.css")
    } catch (e) {}
};
TGN.Ancestry.Trees.selectPerson.modalInit = function (actionCallback, cnt) {
    if ("function" == typeof AutoSuggestControl && $sp.selectPersonFilesLoaded && $sp.extFileLoaded > 0 && $sp.extFileLoaded >= $sp.extFileLoading) {
        $sp.callback.argument = actionCallback;
        var sURL = "/Frozone/Controls/Person/LoadOnDemandSelectPerson_Responsive.aspx?userId=" + v_spUid + "&title=&message=" + v_spMessage + "&buttonText=" + v_spButtonText + "&tid=" + v_spTid + "&otid=" + v_spOtid + "&oid=" + v_spOid + "&showTreeName=" + v_spShowTreeName + "&canSwitchTree=" + v_spCanSwitchTree
            , request = YAHOO.util.Connect.asyncRequest("GET", sURL, $sp.callback)
    } else {
        if (typeof cnt == "undefined" && (cnt = 0), cnt++, cnt > 50) {
            $sp.failGracefully(1);
            return
        }
        $sp.selectPersonFilesLoaded || $sp.loadSelectPersonFiles();
        setTimeout("$sp.modalInit(" + actionCallback + "," + cnt + ")", 200)
    }
};
TGN.Ancestry.Trees.selectPerson.handleSuccess = function (o) {
    o.responseText !== undefined && (200 == o.status || 304 == o.status) ? $sp.dialogInit($sp.callback.argument, o.responseText) : $sp.failGracefully(3)
};
TGN.Ancestry.Trees.selectPerson.handleFailure = function () {
    TGN.Ancestry.Trees.selectPerson.failGracefully(4)
};
TGN.Ancestry.Trees.selectPerson.failGracefully = function (failCode) {
    var sParams = "";
    v_spBrowseArgs && v_spBrowseArgs.length > 0 ? sParams = v_spBrowseArgs : (v_spTid && (sParams += "&tid=" + v_spTid), v_spTreeid && (sParams += "&treeId=" + v_spTreeid), v_spOtid && (sParams += "&otid=" + v_spOtid), v_spOpid && (sParams += "&opid=" + v_spOpid), v_spOid && (sParams += "&oid=" + v_spOid), v_spDbid && (sParams += "&dbid=" + v_spDbid), v_spRpid && (sParams += "&rpid=" + v_spRpid));
    document.location.href = "http://" + v_spTreesDomain + "/pt/AttachStree.aspx?" + sParams + "&failCode=" + failCode
};
TGN.Ancestry.Trees.selectPerson.callback = {
    success: $sp.handleSuccess
    , failure: $sp.handleFailure
    , timeout: 1e4
};
TGN.Ancestry.Trees.selectPerson.clearSelection = function () {
    $("#typeAheadSelectPersonText").val("");
    $("#typeAheadSelectPersonPid").val("");
    $("#typeAheadSelectPersonDate").val("")
};
TGN.Ancestry.Trees.selectPerson.dialogInit = function (actionCallback, html) {
    var modalTitle = typeof v_spTitle != "undefined" ? decodeURIComponent(v_spTitle) : ""
        , selectModal, absm, tasp;
    modalTitle = modalTitle.replace(/\+/gi, " ");
    $genTreesModal.init("selectPersonModal", 500, modalTitle, "selectpersonmodal");
    $genTreesModal.create("selectPersonModal", "0", html);
    selectModal = $("#selectModal");
    selectModal && selectModal.show();
    $("#modalHeader").text(modalTitle);
    $("#modalHeader").show();
    $sp.typeAheadSetup();
    $sp.callbackFunction = actionCallback;
    absm = $("#actionButtonSelectModal");
    absm.length && YAHOO.util.Event.addListener(absm.get(0), "click", $sp.takeAction);
    tasp = $("#typeAheadSelectPersonText");
    tasp && tasp.focus();
    $sp.changeTreeSTDDL()
};
TGN.Ancestry.Trees.selectPerson.createToolTip = function () {
    var tooltipdiv = document.createElement("div")
        , tooltipdivSub1, tooltipdivSub1_1, tooltipdivSub1_2, tooltipdivSub1_3, tooltipdivSub1_4, tooltipdivSub1_5, tooltipdivSub1_6, tooltipdivSub1_7, tooltipdivSub1_8, tooltipdivSub1_8_1, tooltipdivSub1_8_2, tooltipdivSub1_8_3, tooltipdivSub1_8_3_1, tooltipdivSub1_8_3_2, tooltipdivSub1_8_3_3, tooltipdivSub1_8_3_4, tooltipdivSub1_8_3_5, tooltipdivSub1_8_4;
    return tooltipdiv.id = "SharedToolTip", tooltipdiv.className = "SharedToolTip", tooltipdiv.setAttribute("onmouseout", "javascript:closeToolTip();"), tooltipdiv.style.width = "300px", tooltipdiv.style.display = "none", tooltipdiv.style.position = "fixed", tooltipdiv.style.zIndex = "9999", tooltipdivSub1 = document.createElement("div"), tooltipdivSub1.className = "subCon subConShdwGrn", tooltipdivSub1_1 = document.createElement("div"), tooltipdivSub1_1.className = "subConArrowTL", tooltipdivSub1.appendChild(tooltipdivSub1_1), tooltipdivSub1_2 = document.createElement("div"), tooltipdivSub1_2.className = "subConTL", tooltipdivSub1.appendChild(tooltipdivSub1_2), tooltipdivSub1_3 = document.createElement("div"), tooltipdivSub1_3.className = "subConT", tooltipdivSub1.appendChild(tooltipdivSub1_3), tooltipdivSub1_4 = document.createElement("div"), tooltipdivSub1_4.className = "subConTR", tooltipdivSub1.appendChild(tooltipdivSub1_4), tooltipdivSub1_5 = document.createElement("div"), tooltipdivSub1_5.className = "subConBL", tooltipdivSub1.appendChild(tooltipdivSub1_5), tooltipdivSub1_6 = document.createElement("div"), tooltipdivSub1_6.className = "subConB", tooltipdivSub1.appendChild(tooltipdivSub1_6), tooltipdivSub1_7 = document.createElement("div"), tooltipdivSub1_7.className = "subConBR", tooltipdivSub1.appendChild(tooltipdivSub1_7), tooltipdivSub1_8 = document.createElement("div"), tooltipdivSub1_8.className = "subConBd", tooltipdivSub1_8_1 = document.createElement("div"), tooltipdivSub1_8_1.className = "subConL", tooltipdivSub1_8.appendChild(tooltipdivSub1_8_1), tooltipdivSub1_8_2 = document.createElement("div"), tooltipdivSub1_8_2.className = "subConR", tooltipdivSub1_8.appendChild(tooltipdivSub1_8_2), tooltipdivSub1_8_3 = document.createElement("div"), tooltipdivSub1_8_3.className = "ancSecHdStretch inModal", tooltipdivSub1_8_3_1 = document.createElement("div"), tooltipdivSub1_8_3_1.className = "ancSecHdL", tooltipdivSub1_8_3.appendChild(tooltipdivSub1_8_3_1), tooltipdivSub1_8_3_2 = document.createElement("div"), tooltipdivSub1_8_3_2.className = "ancSecHdR", tooltipdivSub1_8_3.appendChild(tooltipdivSub1_8_3_2), tooltipdivSub1_8_3_3 = document.createElement("div"), tooltipdivSub1_8_3_3.className = "ancSecHdBL", tooltipdivSub1_8_3.appendChild(tooltipdivSub1_8_3_3), tooltipdivSub1_8_3_4 = document.createElement("div"), tooltipdivSub1_8_3_4.className = "ancSecHdBR", tooltipdivSub1_8_3.appendChild(tooltipdivSub1_8_3_4), tooltipdivSub1_8_3_5 = document.createElement("h1"), tooltipdivSub1_8_3_5.className = "ancSecHdTitle", typeof v_headerText != "undefined" ? tooltipdivSub1_8_3_5.appendChild(document.createTextNode(v_headerText)) : tooltipdivSub1_8_3_5.appendChild(document.createTextNode("")), tooltipdivSub1_8_3.appendChild(tooltipdivSub1_8_3_5), tooltipdivSub1_8.appendChild(tooltipdivSub1_8_3), tooltipdivSub1_8_4 = document.createElement("p"), typeof v_contextText != "undefined" ? tooltipdivSub1_8_4.appendChild(document.createTextNode(v_contentText)) : tooltipdivSub1_8_4.appendChild(document.createTextNode("")), tooltipdivSub1_8.appendChild(tooltipdivSub1_8_4), tooltipdivSub1.appendChild(tooltipdivSub1_8), tooltipdiv.appendChild(tooltipdivSub1), tooltipdiv
};
TGN.Ancestry.Trees.selectPerson.setMessage = function (msg) {
    $("#spMessage").html(msg)
};
TGN.Ancestry.Trees.selectPerson.takeAction = function () {
    var pid = $("#typeAheadSelectPersonPid").val();
    pid.length > 0 ? ($sp.callbackFunction(v_spTid, pid, $("#typeAheadSelectPersonText").val(), $("#typeAheadSelectPersonDate").val(), typeof v_NPP != "undefined" ? v_NPP : ""), $sp.clearSelection(), $.modal.close()) : alert(rs_pleaseSelectPerson)
};
TGN.Ancestry.Trees.selectPerson.CancelSelectModal = function () {
    $sp.clearSelection();
    $.modal.close()
};
TGN.Ancestry.Trees.selectPerson.autoSuggestBox;
TGN.Ancestry.Trees.selectPerson.typeAheadSetup = function () {
    $("#typeAheadSelectPersonText")[0] != null && ($sp.autoSuggestBox = new AutoSuggestControl($("#typeAheadSelectPersonText")[0], $("#typeAheadSelectPersonContainer")[0], v_spUid, v_spTid, "name", $("#typeAheadSelectPersonPid")[0], null, null, null, null, null, "autoSuggestStart", 20, null, 3, $("typeAheadSelectPersonDate")[0]))
};
TGN.Ancestry.Trees.selectPerson.typeAheadUpdate = function (tid) {
    $sp.autoSuggestBox != null && $sp.autoSuggestBox.autoSuggestTreeUpdate(tid)
};
TGN.Ancestry.Trees.selectPerson.selectPerson = function () {};
TGN.Ancestry.Trees.selectPerson.selectFromList = function (tid) {
    var url = "http://" + v_spTreesDomain + "/pt/BrowseList.aspx?tid=" + tid;
    window.open(url, "", "toolbar=no,resizable=yes,scrollbars=yes,menubar=no,status=no,location=no,height=550,width=800", !0)
};
TGN.Ancestry.Trees.selectPerson.browseListCallback = function (name, pid, date) {
    $("#typeAheadSelectPersonText").val(name);
    $("#typeAheadSelectPersonPid").val(pid);
    $("#typeAheadSelectPersonDate").val(date);
    $sp.takeAction()
};
TGN.Ancestry.Trees.selectPerson.changeTreeSTDDL = function () {
    var tid = $("#selectTreeDropDown").val()
        , hasRights, display;
    v_spTid = tid;
    $("#typeAheadSelectPersonText").val("");
    $("#typeAheadSelectPersonPid").val("");
    $("#typeAheadSelectPersonDate").val("");
    $sp.typeAheadUpdate(tid);
    hasRights = $("#selectTreeDropDown option:selected").attr("rights");
    el = $("#addNewPersonLink");
    el != null && (display = typeof hasRights != "undefined" && hasRights != "True" ? "none" : "block", el.css("display", display))
};
TGN.Ancestry.Trees.selectPerson.setTreeId = function (tid) {
    v_spTid = tid
};
TGN.Ancestry.Trees.selectPerson.addNewPerson = function () {
    var args = ""
        , url;
    v_spDbid.length > 0 && (args = args + "&dbid=" + v_spDbid);
    v_spRpid.length > 0 && (args = args + "&rpid=" + v_spRpid);
    v_spOtid.length > 0 && (args = args + "&otid=" + v_spOtid);
    v_spOpid.length > 0 && (args = args + "&opid=" + v_spOpid);
    v_spOid.length > 0 && (args = args + "&oid=" + v_spOid);
    typeof v_NPP != "undefined" && (v_NPP == !0 || v_NPP == "True" || v_NPP == 1) && (args = args + "&npp=1");
    url = "http://" + v_spTreesDomain + "/pt/AddPerson.aspx?tid=" + v_spTid + args;
    window.location.href = url
};
TGN.Ancestry.Trees.selectPerson.gotoSelectList = function () {
    var i, c, tidLoc, retTid, pidLoc, retPid, url;
    if (v_spBrowseArgs.length > 0) {
        if (tidLoc = v_spBrowseArgs.indexOf("_t"), tidLoc > 0) {
            for (i = tidLoc + 2; i < v_spBrowseArgs.length; i++)
                if (c = v_spBrowseArgs.charAt(i), (c < "0" || c > "9") && c != "-") break;
            retTid = v_spBrowseArgs.substring(tidLoc + 2, i);
            v_spBrowseArgs = v_spBrowseArgs.substring(0, tidLoc + 2) + v_spTid + v_spBrowseArgs.substring(i) + "&stid=" + retTid
        }
        if (pidLoc = v_spBrowseArgs.indexOf("_p"), pidLoc > 0) {
            for (i = pidLoc + 2; i < v_spBrowseArgs.length; i++)
                if (c = v_spBrowseArgs.charAt(i), (c < "0" || c > "9") && c != "-") break;
            retPid = v_spBrowseArgs.substring(pidLoc + 2, i);
            v_spBrowseArgs = v_spBrowseArgs.substring(0, pidLoc) + v_spBrowseArgs.substring(i) + "&spid=" + retPid
        }
        url = "http://" + v_spTreesDomain + "/pt/AttachStree.aspx?" + unescape(v_spBrowseArgs);
        window.location = url
    } else $sp.selectFromList(v_spTid)
}
