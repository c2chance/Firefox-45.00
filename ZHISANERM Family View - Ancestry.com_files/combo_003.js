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
        for (array = document.getElementsByTagName("script"), i = 0; i < array.length; i++)
            if (array.item(i).src != null && array.item(i).src.toLowerCase() == file.toLowerCase()) return !0
    } catch (e) {}
    return !1
}

function hasCSSFile(file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("link"), i = 0; i < array.length; i++)
            if (array.item(i).href != null && array.item(i).href.toLowerCase() == file.toLowerCase()) return !0
    } catch (e) {}
    return !1
}

function loadAudioFiles() {
    audioFilesLoaded || (audioFilesLoaded = !0, $Anc.load({
        type: "audiodialog"
    }))
}

function loadAddPersonFiles() {
    addPersonFilesLoaded || (addPersonFilesLoaded = !0, loadCSSFile(v_treesCacheUrl + "Legacy/pt/modal_add.css"), $.getScript(v_treesCacheUrl + "tmp/addPerson.js"), $.getScript(v_treesCacheUrl + "Legacy/validation.js"))
}

function addPersonOnDemand(tid, pid, sid, rel, msg, basePage, ret, pg, cnt) {
    if (typeof addPerson == "function") addPerson(tid, pid, sid, rel, msg, basePage, ret, pg);
    else {
        if (typeof cnt == "undefined") var cnt = 0;
        cnt++;
        cnt > 25 && (addPersonFilesLoaded = !1, cnt = 0);
        loadAddPersonFiles();
        setTimeout("addPersonOnDemand('" + tid + "', '" + pid + "', '" + sid + "', '" + rel + "', '" + msg + "', '" + basePage + "', '" + ret + "', '" + pg + "'," + cnt + ")", 200)
    }
}

function AddAudioStoryOnDemand(param1, cnt) {
    typeof AddAudioStory == "function" ? AddAudioStory(param1, audioAdded) : (cnt++, cnt > 25 && (audioFilesLoaded = !1, cnt = 0), loadAudioFiles(), setTimeout("AddAudioStoryOnDemand('" + param1 + "'," + cnt + ")", 200))
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
var audioFilesLoaded = !1,
    addPersonFilesLoaded = !1;

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
        for (array = document.getElementsByTagName("script"), i = 0; i < array.length; i++)
            if (array.item(i).src != null && array.item(i).src.toLowerCase() == file.toLowerCase()) return !0
    } catch (e) {}
    return !1
}

function hasCSSFile(file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("link"), i = 0; i < array.length; i++)
            if (array.item(i).href != null && array.item(i).href.toLowerCase() == file.toLowerCase()) return !0
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
    $trees.addFamilyDialog != null && typeof $trees.addFamilyDialog.addRelation == "function" ? (initValidationStrings(), info.rel === "M" ? $trees.addFamilyDialog.addBrother(info) : info.rel === "F" ? $trees.addFamilyDialog.addSister(info) : $trees.addFamilyDialog.addRelation(info)) : loadAddPersonFiles(info)
}

function addPersonOnDemandLegacy(tid, pid, sid, rel, msg, basePage, pgStkArgs, cnt) {
    if (typeof addPerson == "function") addPerson(tid, pid, sid, rel, msg, basePage, pgStkArgs);
    else {
        if (typeof cnt == "undefined") var cnt = 0;
        cnt++;
        cnt > 25 && (addPersonFilesLoadedLegacy = !1, cnt = 0);
        loadAddPersonFilesLegacy();
        setTimeout("addPersonOnDemandLegacy('" + tid + "', '" + pid + "', '" + sid + "', '" + rel + "', '" + msg + "', '" + basePage + "', '" + pgStkArgs + "'," + cnt + ")", 200)
    }
}

function loadAddPersonFilesLegacy() {
    addPersonFilesLoadedLegacy || (addPersonFilesLoadedLegacy = !0, $Anc.load({
        type: "addpersondialog"
    }))
}

function addPersonLoadSuccess() {
    initValidationStrings();
    this.info.rel ? this.info.rel === "M" ? $trees.addFamilyDialog.addBrother(this.info) : this.info.rel === "F" ? $trees.addFamilyDialog.addSister(this.info) : $trees.addFamilyDialog.addRelation(this.info) : ($trees.addFamilyDialog.selectRelative(this.info.tid, this.info.pid, this.info.pageStackArgs), $.modal.center())
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
    $trees.addFamilyDialog != null && typeof $trees.addFamilyDialog.choose == "function" ? $trees.addFamilyDialog.choose(info) : loadAddFamilyFiles(info)
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
        }),
        prefix = "x" + new RegExp("http://[^/]+(.*/cdn)").exec(v_treesCacheUrl)[1] + "/",
        script2 = $.getScript(v_cache + "lib/tgn/combo.ashx?" + prefix + "validation.js&" + prefix + "viewer/js/dialogmanagerall.js&" + prefix + "treedialogs.js&" + prefix + "editdialog.js&" + prefix + "plugin/jquery.ancautocomplete.js");
    jQuery.when(script1, script2).done(function () {
        editPersonLoadSuccess.call({
            tid: tid,
            pid: pid,
            pgStkArgs: pgStkArgs
        })
    })
}

function editDialogOnDemand(tid, pid, pgStkArgs) {
    $trees.editDialog != null && typeof $trees.editDialog.show == "function" ? ($trees.editDialog.show(tid, pid, pgStkArgs), $.modal.center()) : loadEditPersonFiles(tid, pid, pgStkArgs)
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
            }),
            prefix = "x" + new RegExp("http://[^/]+(.*/cdn)").exec(v_treesCacheUrl)[1] + "/",
            script2 = $.getScript(v_cache + "lib/tgn/combo.ashx?" + prefix + "viewer/js/dialogmanagerall.js&" + prefix + "treedialogs.js&" + prefix + "clickcard.js");
        jQuery.when(script1, script2).done(function () {
            clickCardLoadSuccess.call({
                elPosition: elPosition,
                tid: tid,
                pid: pid
            })
        })
    }
}

function clickCardOnDemand(elPosition, tid, pid) {
    $trees.clickCard != null && typeof $trees.clickCard.show == "function" ? $trees.clickCard.show(elPosition, tid, pid) : loadClickCardFiles(elPosition, tid, pid)
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
var addPersonFilesLoadedLegacy = !1,
    clickCardTreesDomain, clickCardFocusFunc, clickCardPageStackParams, clickCardFilesLoaded = !1;
if ($(document).ready(function () {
        var relationshipCalculators = $(".relationshipLink.firstPersonHint"),
            firstRcDiv;
        relationshipCalculators.length > 0 && (firstRcDiv = relationshipCalculators.first(), $RelCalc.getRelationshipData(firstRcDiv.attr("tid"), firstRcDiv.attr("pid"), firstRcDiv.attr("page"), !0, !1, firstRcDiv, $RelCalc.RetrieveSubsequentRelations))
    }), $RelCalc == undefined) {
    var $RelCalc = TGN.namespace("TGN.Ancestry.Trees.RelCalc"),
        mepidSelectTextBox;
    $RelCalc.error = "An error occurred.";
    $RelCalc.url = "";
    $RelCalc.CallingSource = "";
    $RelCalc.Page = "";
    $RelCalc.pid = null;
    $RelCalc.tid = null;
    $RelCalc.getRelationshipText = function (tid, pid, page, cacheOnly, forceRecalc, src) {
        $RelCalc.getRelationshipData(tid, pid, page, cacheOnly, forceRecalc, src, $RelCalc.BindToUI)
    };
    $RelCalc.getRelationshipData = function (tid, pid, page, cacheOnly, forceRecalc, src, callBack) {
        $.ajax({
            url: "/tree/" + tid + "/person/" + pid + "/getrelationshiptext",
            cache: !0,
            async: !0,
            type: "GET",
            data: {
                tid: tid,
                pid: pid,
                cacheOnly: cacheOnly,
                forceRecalc: forceRecalc,
                page: page
            },
            success: function (data) {
                data.state != "NoMePid" && callBack(data, pid, src)
            },
            error: function () {
                return null
            }
        })
    };
    $RelCalc.RetrieveSubsequentRelations = function (data, pid, src) {
        $RelCalc.BindToUI(data, pid, src);
        $(".relationshipLink.firstPersonHint").each(function (index) {
            index != 0 && data.state != "NoMePid" && data.state != "InValidAccess" && $RelCalc.getRelationshipText($(this).attr("tid"), $(this).attr("pid"), $(this).attr("page"), !0, !1, $(this))
        })
    };
    $RelCalc.BindToUI = function (data, pid, scr) {
        $(".relationshipStyle").show();
        $(scr).show().html(data.content);
        $(".relationshipLink." + pid).show().html(data.content)
    };
    $RelCalc.Init = function (url, name, page, nameStr, calcStr, src, pid, tid) {
        $RelCalc.pid = pid;
        $RelCalc.tid = tid;
        $RelCalc.Page = page;
        $RelCalc.CallingSource = src;
        $(window).resize(function () {
            $RelCalc.setLadderHeight()
        });
        $RelCalc.showModal(url, name, nameStr, calcStr)
    };
    $RelCalc.showModal = function (url, name, nameStr, calcStr) {
        var relCalcModal = $("#relCalcModal");
        relCalcModal && (relCalcModal.length === 0 && (relCalcModal = $("<div id='relCalcModal' style='display:none;'><\/div>").appendTo(document.body)), $RelCalc.url = url, $RelCalc.loading = "<div class='rCalcLadder' style='display:none;'><div>" + $RelCalc.format(nameStr, "<strong>" + name + "<\/strong>") + "<\/div><div><span class='flat_icon arrow2down_green'>&nbsp;<\/span><\/div><table class='center'><tr><td class='loading'><\/td><td>" + calcStr + "<\/td><\/tr><\/table><\/div>", relCalcModal.html("<div id='relCalcContent' style='display:none;'>" + $RelCalc.loading + "<\/div>"), $RelCalc.GetLadder($RelCalc.url + "getladder"))
    };
    $RelCalc.setLadderHeight = function () {
        var is_mac = /(iphone|ipod|ipad)/.test(navigator.userAgent.toLowerCase()),
            ladderDiv = $(".rCalcLadder"),
            height;
        ladderDiv && ladderDiv.length > 0 && (is_mac || (height = document.documentElement.clientHeight - 240, ladderDiv[0].style.maxHeight = height + "px"))
    };
    $RelCalc.GetLadder = function (ladderUrl, recalc) {
        $.ajax({
            url: ladderUrl,
            async: !0,
            type: "GET",
            beforeSend: function () {
                $RelCalc.setLoading()
            },
            success: function (data) {
                var e = document.getElementById("rCalcAction"),
                    relCalcContent, hiddenPidfield, topRel;
                e && (e.style.display = "block");
                data.selectMepidJSON == 1 ? (relCalcContent = $("#relCalcContent"), relCalcContent && (relCalcContent.css("display", "block"), relCalcContent.html(data.content)), $("#relCalcModal").modal({
                    width: 400,
                    onClose: function () {
                        $RelCalc.modalClosing()
                    }
                }), $RelCalc.setMepidTextBoxFocus(), $RelCalc.mepidTextBoxTypeAheadSetup(data.userId, data.treeId, data.typeOfRequest, data.hintText), hiddenPidfield = document.getElementById("1_hiddenPid"), hiddenPidfield.onchange = function () {
                    mePidSet()
                }) : ($("#relCalcContent").css("display", "block"), $("#relCalcContent").html(data), $("#relCalcModal").modal({
                    width: 400,
                    onClose: function () {
                        $RelCalc.modalClosing()
                    }
                }), $RelCalc.setLadderHeight(), $.modal.center(), topRel = document.getElementById("calculatedRelationship"), topRel && ($RelCalc.CallingSource != null && ($RelCalc.CallingSource.innerHTML = topRel.innerHTML), recalc && $("#recalcDoneCtr").css("display", "block")));
                $("#IsEnglishSite").val() != undefined ? $("#IsEnglishSite").val().toLowerCase() == "true" && $RelCalc.updateRelationshipText() : $RelCalc.updateRelationshipText();
                $trees.util.setPageTrackingName($RelCalc.Page, "Relationship Ladder")
            },
            error: function () {
                $RelCalc.displayError()
            }
        })
    };
    $RelCalc.updateRelationshipText = function () {
        document.URL.indexOf("hints") != -1 || document.URL.indexOf("hints") != -1 ? $RelCalc.getRelationshipText($RelCalc.tid, $RelCalc.pid, "All Hints", !0, !1, $(".cls_" + $RelCalc.pid)) : $RelCalc.getRelationshipText($RelCalc.tid, $RelCalc.pid, "sidepanel", !0, !1, $("#relationshipTextDiv"))
    };
    $RelCalc.modalClosing = function () {
        $RelCalc.Modal = null
    };
    $RelCalc.setLoading = function () {
        var e = document.getElementById("rCalcAction"),
            relCalcContent;
        e && (e.style.display = "none");
        relCalcContent = $("#relCalcContent");
        relCalcContent && relCalcContent.html($RelCalc.loading)
    };
    $RelCalc.displayError = function () {
        clearTimeout($RelCalc.timeoutId);
        var relCalcContent = $("#relCalcContent");
        relCalcContent && relCalcContent.html($RelCalc.error);
        $RelCalc.delayedClose()
    };
    $RelCalc.delayedClose = function () {
        setTimeout(function () {
            $.modal.close()
        }, 4e3)
    };
    $RelCalc.recalculate = function () {
        $('[data-modal-id="relCalcModal"]').remove();
        $RelCalc.GetLadder($RelCalc.url + "getladder/true", !0)
    };
    $RelCalc.selectMe = function () {
        $('[data-modal-id="relCalcModal"]').remove();
        $RelCalc.GetLadder($RelCalc.url + "selectMePid/0")
    };
    $RelCalc.toggleHelp = function () {
        $RelCalc.resetHelpItems();
        var recalc = document.getElementById("recalcDoneCtr");
        recalc && (recalc.style.display = "none");
        $Anc.ShowHide("rCalcHelp");
        $.modal.center()
    };
    $RelCalc.toggleHelpItem = function (id) {
        var e = document.getElementById("helpItem" + id);
        e !== null && (e.style.display == "block" ? (e.style.display = "none", e = document.getElementById("helpIcon" + id).className = "flat_icon arrow3right_green_small") : ($RelCalc.resetHelpItems(), document.getElementById("helpIcon" + id).className = "flat_icon arrow3down_green_small", e.style.display = "block"))
    };
    $RelCalc.resetHelpItems = function () {
        var i = 1;
        for (e = document.getElementById("helpItem" + i); e !== null;) e.style.display = "none", document.getElementById("helpIcon" + i).className = "flat_icon arrow3right_green_small", ++i, e = document.getElementById("helpItem" + i)
    };
    $RelCalc.format = function () {
        var str, i, re;
        if (arguments.length === 0) return null;
        for (str = arguments[0], i = 1; i < arguments.length; i++) re = new RegExp("\\{" + (i - 1) + "\\}", "gm"), str = str.replace(re, arguments[i]);
        return str
    };
    $RelCalc.selectFromTreeBrowse = function (selectFromTreeUrl) {
        window.open(selectFromTreeUrl, "", "toolbar=no,resizable=yes,scrollbars=yes,menubar=no,status=no,location=no,height=600,width=800")
    };
    $RelCalc.printLadder = function () {
        var printWindow = window.open($RelCalc.url + "printladder", "PrintWindow", "width=750,height=850,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");
        printWindow.focus()
    };
    $RelCalc.mepidTextBoxTypeAheadSetup = function (userId, treeId, typeOfRequest, hintText) {
        if (document.getElementById("1_mepidNameTextBox") !== null) {
            mepidSelectTextBox = new AutoSuggestControl(document.getElementById("1_mepidNameTextBox"), document.getElementById("myContainer"), userId, treeId, typeOfRequest, document.getElementById("1_hiddenPid"), null, null, hintText);
            var mepidRelCalcModal = document.getElementById("relCalcModal");
            mepidRelCalcModal !== null && (mepidRelCalcModal.style.overflow = "visible");
            mepidSelectTextBox.myAutoComp.itemSelectEvent.subscribe($RelCalc.mePidSelectHandler);
            mepidSelectTextBox.myAutoComp.dataReturnEvent.subscribe($RelCalc.mePidChangedHandler)
        }
        return
    };
    $RelCalc.setMepidTextBoxFocus = function () {
        var mepidNameTextBox = document.getElementById("1_mepidNameTextBox");
        mepidNameTextBox !== null && (mepidNameTextBox.focus(), mepidNameTextBox.select())
    };
    $RelCalc.enableSelectButton = function () {
        document.getElementById("disabledSelectButton").style.display = "none";
        document.getElementById("enabledSelectButton").style.display = "inline-block"
    };
    $RelCalc.disableSelectButton = function () {
        document.getElementById("disabledSelectButton").style.display = "inline-block";
        document.getElementById("enabledSelectButton").style.display = "none"
    };
    $RelCalc.showNameNotFoundText = function () {
        document.getElementById("1_mepidNameTextBox").style.backgroundColor = "#feece6";
        document.getElementById("nameNotFoundText").style.display = "block";
        $RelCalc.disableSelectButton()
    };
    $RelCalc.hideNameNotFoundText = function () {
        document.getElementById("1_mepidNameTextBox").style.backgroundColor = "";
        document.getElementById("nameNotFoundText").style.display = "none"
    };
    $RelCalc.validateMepid = function (e) {
        var evt = e ? e : window.event,
            hiddenPid;
        return (evt.stopPropagation && evt.stopPropagation(), evt.cancelBubble != null && (evt.cancelBubble = !0), hiddenPid = document.getElementById("1_hiddenPid"), hiddenPid !== null && hiddenPid.value.length === 0) ? ($RelCalc.showNameNotFoundText(), !1) : ($RelCalc.GetLadder($RelCalc.url + "selectMePid/" + hiddenPid.value), $('div[data-modal-id="relCalcModal"]').remove(), !0)
    };
    $RelCalc.cancelSelectMepid = function () {
        $.modal.close();
        var currentAutoControl = document.getElementById("1_mepidNameTextBox");
        currentAutoControl !== null && (currentAutoControl.value = "")
    };
    $RelCalc.mePidChangedHandler = function (sType, aArgs) {
        var items = aArgs[2];
        items[0].pid !== "" ? $RelCalc.hideNameNotFoundText() : $RelCalc.showNameNotFoundText()
    };
    $RelCalc.mePidSelectHandler = function () {
        var currentAutoControl = document.getElementById("1_mepidNameTextBox"),
            hiddenPid = document.getElementById("1_hiddenPid");
        hiddenPid !== null && hiddenPid.value.length !== 0 && ($RelCalc.enableSelectButton(), $RelCalc.hideNameNotFoundText())
    };

    function myCallback(name, byear, dyear, pid) {
        var currentAutoControl = document.getElementById("1_mepidNameTextBox"),
            hiddenPid;
        currentAutoControl !== null && (hiddenPid = document.getElementById("1_hiddenPid"), hiddenPid !== null && (hiddenPid.value = pid), currentAutoControl.value = name + " (" + byear + " - " + dyear + ")", mepidSelectTextBox.myAutoComp.forceSelection = !1, $RelCalc.enableSelectButton())
    }
};
var $TreesFunc = {
    BandidoPlusModal: {
        show: function () {
            $genTreesModal.init("BandidoPlusModal", 600, "");
            $genTreesModal.create("BandidoPlusModal", "/modals/bandidoplus/tree/" + v_tid + "/person/" + v_pid, null);
            $("#modalClose").css("z-index", "3")
        }
    },
    ClickCard: {
        clickCard: null,
        hide: function () {
            $("#clickCard").hide()
        },
        show: function (tid, pid) {
            $TreesFunc.ClickCard.clickCard === null ? $TreesFunc.ClickCard.clickCard = $("<div id='clickCard' class='subCon subConShdw' style='display:none;position:absolute;z-index:888;'><div id='clickCardContent'><span style='margin:50px auto;width:30px;height:30px;display:block;position:relative;background-image: url(\"" + v_treesCacheUrl + "TreeMap/images/a-i-30-30-expansion.gif\");'><\/span><\/div><\/div>").appendTo(document.body) : $("#clickCardContent").html("<span style='margin:50px auto;width:30px;height:30px;display:block;position:relative;background-image: url(\"" + v_treesCacheUrl + "TreeMap/images/a-i-30-30-expansion.gif\");'><\/span>");
            var personCCIcon = $("#person_" + pid),
                pcciPOS = personCCIcon.offset();
            $("#clickCard").css({
                left: pcciPOS.left,
                top: pcciPOS.top
            }).show();
            $.ajax({
                url: "/tree/" + tid + "/person/" + pid + "/clickcard",
                cache: !1,
                type: "GET",
                success: function (data) {
                    var result = data[0];
                    $("#clickCardContent").html(result)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    window.console != null && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                }
            })
        }
    },
    Family: {
        getSiblingsOnce: !0,
        showAddFamilyMemberModal: function (tidVal, pidVal, pageParams) {
            var url, addFamilySelector;
            v_tid = tidVal != null && tidVal != "" ? tidVal : v_tid;
            v_pid = pidVal != null && pidVal != "" ? pidVal : v_pid;
            v_pushPageParams = pageParams != null && pageParams != "" ? pageParams : v_pushPageParams;
            url = "http://" + v_treesDomain + "/fz/command.ashx?op=dialog&dialog=addfamily&tid=" + encodeURIComponent(v_tid) + "&pid=" + encodeURIComponent(v_pid) + v_pushPageParams;
            $genTreesModal.init("AddFamilyMemberModal", 400, "");
            $genTreesModal.create("AddFamilyMemberModal", url, null);
            addFamilySelector = $("#modal");
            addFamilySelector.length > 0 && addFamilySelector.show()
        },
        toggleInnerFamilyMembers: function () {
            $(".pageNav").removeClass("userChoseShowMembers").toggleClass("hideFamilyMembers");
            $(".pageNav").hasClass("hideFamilyMembers") || $(".pageNav").addClass("userChoseShowMembers")
        },
        toggleOuterFamilyMembers: function () {
            $(".pageNav").removeClass("hideFamilyMembers").toggleClass("userChoseShowMembers");
            $(".pageNav").hasClass("userChoseShowMembers") || $(".pageNav").addClass("hideFamilyMembers");
            $TreesFunc.Family.showSiblingsCard()
        },
        responseSuccessShSib: function (data) {
            var siblingData = jQuery.parseJSON(data),
                fullSiblings = siblingData.siblings.full,
                halfSiblings = siblingData.siblings.half,
                fullSibCount = typeof fullSiblings != "undefined" ? fullSiblings.length : 0,
                halfSibCount = typeof halfSiblings != "undefined" ? halfSiblings.length : 0,
                sibDataDL, sib, iFull, halfsibSpacer, iHalf;
            if ($TreesFunc.Family.showSiblingsHeader(), sibDataDL = $("#sibData"), fullSibCount > 0)
                for (iFull = 0; iFull < fullSibCount; iFull++) sib = fullSiblings[iFull], $TreesFunc.Family.buildSiblingNode(sibDataDL, sib);
            if (halfSibCount > 0)
                for (halfsibSpacer = "<h4>" + v_halfSiblings + "<\/h4>", sibDataDL.append($("<li>").addClass("halfSiblings").html(halfsibSpacer)), iHalf = 0; iHalf < halfSibCount; iHalf++) sib = halfSiblings[iHalf], $TreesFunc.Family.buildSiblingNode(sibDataDL, sib);
            fullSibCount == 0 && halfSibCount == 0 && sibDataDL.append($("<li>").addClass("noSiblings").html(v_noSiblings));
            $TreesFunc.Family.getSiblingsOnce = !1
        },
        buildSiblingNode: function (sibDataDL, sib) {
            var imgClass = "photo photoSize5 icon iconPerson";
            sib.gender == "M" && (imgClass = "photo photoSize5 icon iconMale");
            sib.gender == "F" && (imgClass = "photo photoSize5 icon iconFemale");
            var click = '<button class="link icon iconProfileCard" id="sibCC_' + sib.pid + '" onclick="clickCardOnDemand(\'sibCC_' + sib.pid + "', '" + v_tid + "', '" + sib.pid + '\');" type="button"><\/button>',
                spanHTML = "<dt><a href='javascript:$trees.util.gotoPerson(" + v_tid + "," + sib.pid + ");'>" + sib.name + "<\/a><\/dt><dd class='years'><small>" + sib.birthYear + "&nbsp;&ndash;&nbsp;" + sib.deathYear + "<\/small><\/dd>",
                validImg = sib.image32Url && sib.image32Url.length > 0;
            sibDataDL.append($("<li>").append($("<div>").addClass(validImg ? "photo photoSize5" : imgClass).append(validImg ? $("<img />").attr({
                src: sib.image32Url
            }) : "")).append($("<dl>").addClass("nameandyears").html(spanHTML)).append(click))
        },
        showSiblingsCard: function () {
            if ($TreesFunc.Family.getSiblingsOnce) {
                $TreesFunc.Family.showSiblingsHeader();
                var sibData = $("#sibData");
                sibData.append($("<li>").attr({
                    id: "processLoader"
                }).html("<div class='loading loadingSmall'><\/div>"));
                $.ajax({
                    url: "/PTgetsiblings.ashx?pid=" + v_pid + "&tid=" + v_tid + "&idHalf=true",
                    cache: !1,
                    type: "GET",
                    success: function (data) {
                        $("#processLoader").hide();
                        $TreesFunc.Family.responseSuccessShSib(data)
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        window.console != null && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                    }
                })
            }
        },
        showSiblingsHeader: function () {
            $("#sibSection").append($("<ul>").attr({
                id: "sibData"
            }))
        }
    },
    FamilySearch: {
        loadWidget: function () {
            var qs = document.location.search || "";
            qs += (qs ? "&" : "?") + "fsid=" + $("#familySearchId").val();
            $.ajax({
                cache: !1,
                url: "/tree/" + v_tid + "/person/" + v_pid + "/fs/personwidget" + qs
            }).done(function (response) {
                $("#fsWidget").html(response);
                $("#fsCancelDisconnect").click(function () {
                    $.modal.close()
                });
                $("#fsConfirmDisconnect").click(function () {
                    $.post(fsPerformDisconnectUrl).done(function (jsonResponse) {
                        jsonResponse.success ? ($("#familySearchId").val(""), $TreesFunc.FamilySearch.loadWidget(), $("#fsOrdStatus").callout("close"), domain === "trees" ? $.modal.close() : location.reload()) : $("#fsDisconnectFail").modal({
                            title: fsErrorDisconnecting
                        })
                    })
                });
                $("#fsDisconnect").click(function () {
                    $("#fsDisconnectConfirm").modal({
                        title: fsConfirmTitle
                    })
                })
            }).fail(function () {
                $("#fsWidget").empty()
            })
        }
    },
    Feedback: {
        _fzpFeedbackDialog: null,
        fzpInitFeedbackDialog: function () {
            var dlgXpos = YAHOO.util.Dom.getViewportWidth() / 2 - 235,
                dlgYpos, rendered;
            dlgXpos < 10 && (dlgXpos = 10);
            dlgXpos += YAHOO.util.Dom.getDocumentScrollLeft();
            dlgYpos = YAHOO.util.Dom.getViewportHeight() / 2 - 200;
            dlgYpos < 10 && (dlgYpos = 10);
            dlgYpos += YAHOO.util.Dom.getDocumentScrollTop();
            $TreesFunc.Feedback._fzpFeedbackDialog = new YAHOO.widget.Panel("feedbackModal", {
                width: "450px",
                zIndex: 9999,
                x: dlgXpos,
                y: dlgYpos,
                close: !0,
                fixedcenter: !0,
                draggable: !1,
                modal: !0,
                underlay: "none",
                visible: !1,
                constraintoviewport: !0
            });
            $TreesFunc.Feedback._fzpFeedbackDialog.setHeader("");
            $TreesFunc.Feedback._fzpFeedbackDialog.setBody("");
            $TreesFunc.Feedback._fzpFeedbackDialog.setFooter("");
            rendered = $TreesFunc.Feedback._fzpFeedbackDialog.render(document.body)
        },
        fzpHideFeedbackDialog: function () {
            "undefined" != typeof $TreesFunc.Feedback._fzpFeedbackDialog && $TreesFunc.Feedback._fzpFeedbackDialog.cfg.setProperty("visible", !1)
        },
        fzpShowFeedbackDialog: function () {
            var fbmC, fbmMask;
            $TreesFunc.Feedback.fzpHideFeedbackDialog();
            $TreesFunc.Feedback._fzpFeedbackDialog.setHeader('<div class=""tl""><\/div><div class=""tr""><\/div><h3 class=""personName"">' + v_fzpDlgTitle + "<\/h3>");
            $TreesFunc.Feedback._fzpFeedbackDialog.setBody('<div class=""content""><h4>' + v_fzpDlgTypeLabel + '<\/h4><span style=""margin-left:5px;""><select id=""fbType""><option value=""0"">' + v_fzpDlgTypeGeneral + '<\/option><option value=""1"">' + v_fzpDlgTypeShare + '<\/option><option value=""2"">' + v_fzpDlgTypeReport + '<\/option><option value=""3"">' + v_fzpDlgTypePraise + "<\/option><\/select><\/span><br/><br/><h4>" + v_fzpDlgCommentLabel + '<\/h4><span><textarea id=""fbMessage"" style=""height:100px;width:97%;margin:0 0 10px 5px;""><\/textarea><\/span><br/><\/br/><div class=""padding4ButtonDiv"" style=""float: left; * padding: 7px 7px 0 0;""><a class=""tempCSS"" onclick=""$TreesFunc.Feedback.fzpSubmitFeedback();""><input type=""submit"" value=""' + v_fzpDlgSendButton + '"" class=""ancBtn orange"" /><\/a><\/div><div style=""float: left; padding: 7px 0 0 7px;"">' + v_or + '&nbsp;<a href=""javascript:$TreesFunc.Feedback.fzpHideFeedbackDialog();"">' + v_cancel + '<\/a><\/div><div class=""clearDiv""><\/div><\/div>');
            $TreesFunc.Feedback._fzpFeedbackDialog.setFooter('<div class=""bl""><\/div><div class=""br""><\/div>');
            $TreesFunc.Feedback._fzpFeedbackDialog.render(document.body);
            $TreesFunc.Feedback._fzpFeedbackDialog.cfg.setProperty("visible", !0);
            fbmC = document.getElementById("feedbackModal_c");
            fbmC && (fbmC.style.zIndex = "9999");
            fbmMask = document.getElementById("feedbackModal_mask");
            fbmMask && (fbmMask.style.zIndex = "9998")
        },
        fzpSubmitFeedback: function () {
            var d = YAHOO.util.Dom,
                type = d.get("fbType"),
                message = d.get("fbMessage"),
                msgText = message && message.value ? message.value.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : "",
                callback, params;
            !type || !type.value || 1 != type.value.length || 0 >= msgText.length || "undefined" != typeof YAHOO.util.Connect && (callback = {
                success: function () {
                    $TreesFunc.Feedback.fzpHideFeedbackDialog()
                },
                failure: function () {
                    $TreesFunc.Feedback.fzpHideFeedbackDialog()
                },
                timeout: 1500
            }, params = "type=" + encodeURIComponent(type.value) + "&msg=" + encodeURIComponent(msgText), YAHOO.util.Connect.asyncRequest("POST", "/fz/command.ashx?op=fzpfeedback", callback, params))
        }
    },
    Hints: {
        hintPopupRequest: function (tid, pid) {
            $.ajax({
                url: "/tree/" + tid + "/person/" + pid + "/hintspopup",
                cache: !1,
                type: "GET",
                success: function (result) {
                    $("#HintsPopupDiv").html(result.html);
                    $("#hintsPendingCount").length > 0 && $(".itemCountUpdate").each(function () {
                        this.innerHTML = $("#hintsPendingCount").val()
                    })
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    window.console != null && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                }
            })
        }
    },
    LivingModal: {
        show: function () {
            $genTreesModal.init("LivingModal", 400, "");
            $genTreesModal.create("LivingModal", "/modals/living/tree/" + v_tid + "/person/" + v_pid + "/option/0", null)
        }
    },
    Miscellaneous: {
        ftmLoad: function () {
            setTimeout(function () {
                v_pid != null && v_pid != "" && v_isFtm == "True" && typeof FTM_Init != "undefined" && FTM_Init("1030", v_pid, v_tid)
            }, 500)
        },
        hideOnKeyEvent: function () {
            $("#typeNameOfPerson").hide()
        },
        initPersonTypeAhead: function (inputBox) {
            var typeInstructionsElement = $("#typeAheadPersonInstructionText"),
                d, oTextbox;
            typeInstructionsElement.length === 0 && (typeInstructionsElement = $('<input id="typeAheadPersonInstructionText" value="' + v_typeAheadInstructions + '" type="hidden"/>'), typeInstructionsElement.insertAfter(inputBox));
            $("#typeAheadPersonInstructionText").val(v_typeAheadInstructions);
            $trees.util.setGotoTemplate(v_gotoPersonTemplateUrl);
            d = YAHOO.util.Dom;
            d.get("typeAheadPersonText").value = v_typeAheadInstructions;
            d.get("typeAheadPersonText") && typeof AutoSuggestControl != "undefined" && (oTextbox = new AutoSuggestControl(d.get("typeAheadPersonText"), d.get("typeAheadPersonContainer"), v_uid, v_tid, "name", d.get("typeAheadPersonHidden"), $TreesFunc.Miscellaneous.hideOnKeyEvent, $TreesFunc.Miscellaneous.showOnKeyEvent, v_typeAheadInstructions, "yui-ac-input", "yui-ac-input loading loadingSmall", "ancText yui-ac-input", 20, function (pid) {
                $trees.util.gotoPerson(v_tid, pid)
            }, 3, $TreesFunc.Miscellaneous.hideOnKeyEvent), oTextbox.autoSuggestOnblur());
            typeof closeMEDivs != "undefined" && closeMEDivs("typeAheadPersonContainer")
        },
        setupFindAPersonAutoComplete: function () {
            $trees.util.setGotoTemplate(v_setFocusUrl);
            $("#typeAheadPersonText").autocomplete({
                source: "/suggest/person?treeId=" + v_tid + "&excludePids=",
                key: "name",
                queryParameter: "term",
                dataType: "json",
                minLength: 3,
                maxResults: 10,
                customDisplay: function (data) {
                    var displayText = data.display;
                    return (data.raw.birth != "" || data.raw.death != "") && (displayText += " " + data.raw.birth + " - " + data.raw.death), {
                        value: data.value,
                        display: displayText
                    }
                },
                onItemSelect: function (itemData) {
                    itemData !== "" && $trees.util.gotoPerson(v_tid, itemData.PID)
                }
            })
        },
        closeFindAPersonAutoComplete: function () {
            $("#typeAheadPersonText").autocomplete("destroy")
        },
        printPersonView: function (url) {
            var printable = window.open(url, "", "scrollbars=yes,menubar=yes,height=800,width=1024,resizable=yes,toolbar=no")
        },
        showOnKeyEvent: function () {
            $("#typeNameOfPerson").show()
        }
    },
    Save: {
        hidePop: function (elementId) {
            $("#" + elementId).css("visibility", "hidden")
        },
        saveACopy: function (sourceTid, sourcePid, tid, pid, pgArgs) {
            var saveToSourceNode, saveRadio1, url;
            $("#saveBox").css("visibility", "hidden");
            saveToSourceNode = !1;
            sourceTid.length > 0 && sourcePid.length > 0 && (saveRadio1 = $("#saveRadio1"), saveRadio1.length > 0 && saveRadio1.is(":checked") && (saveToSourceNode = !0));
            saveToSourceNode ? (url = "/pt/MergeFamily2.aspx?tid=" + sourceTid + "&pid=" + sourcePid + "&stid=" + tid + "&spid=" + pid + pgArgs, window.location.href = url) : TGN.Ancestry.Trees.selectPerson.saveRecordToTree(attachToPerson)
        },
        saveLivingStatus: function (deceased, saveStatusUrl, treeViewerPage) {
            saveStatusUrl += deceased ? "0" : "1";
            $.ajax({
                url: saveStatusUrl,
                success: function () {
                    var aliveSpans = $(".aliveSpan");
                    aliveSpans.length > 0 && (deceased ? (aliveSpans[0].hide(), aliveSpans[1].show()) : (aliveSpans[0].show(), aliveSpans[1].hide()));
                    treeViewerPage && window.location.reload()
                }
            })
        },
        savePersonPop: function (thisCtl, sourceTid, sourcePid, tid, pid, pgArgs) {
            sourceTid.length == 0 ? $TreesFunc.Save.saveACopy(sourceTid, sourcePid, tid, pid, pgArgs) : $TreesFunc.Save.showPopRelativeBelowOffset(thisCtl, "#saveBox")
        },
        showPopRelativeBelowOffset: function (element, saveBoxId) {
            var savePhotoOffset = $(element).offset(),
                saveBoxPanel = $(saveBoxId);
            saveBoxPanel.css({
                right: savePhotoOffset.right - saveBoxPanel.width(),
                top: savePhotoOffset.top - saveBoxPanel.height(),
                visibility: "visible"
            })
        },
        saveThisPerson: function () {
            closeHover("moreOptMenu");
            TGN.Ancestry.Trees.selectPerson.saveRecordToTree(attachToPerson)
        }
    },
    ShoeBoxModal: {
        show: function () {
            $genTreesModal.init("ShoeboxModal", 600, "");
            $genTreesModal.create("ShoeboxModal", "/modals/shoebox/tree/" + v_tid + "/person/" + v_pid + "", null);
            $("#modalClose").css("z-index", "3")
        }
    }
}