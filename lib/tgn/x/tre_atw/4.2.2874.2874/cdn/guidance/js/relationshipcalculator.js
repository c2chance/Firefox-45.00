if ($(document).ready(function() {
    var relationshipCalculators = $(".relationshipLink.firstPersonHint"), firstRcDiv;
    relationshipCalculators.length > 0 && (firstRcDiv = relationshipCalculators.first(),
    $RelCalc.getRelationshipData(firstRcDiv.attr("tid"), firstRcDiv.attr("pid"), firstRcDiv.attr("page"), !0, !1, firstRcDiv, $RelCalc.RetrieveSubsequentRelations))
}),
$RelCalc == undefined) {
    var $RelCalc = TGN.namespace("TGN.Ancestry.Trees.RelCalc"), mepidSelectTextBox;
    $RelCalc.error = "An error occurred.";
    $RelCalc.url = "";
    $RelCalc.CallingSource = "";
    $RelCalc.Page = "";
    $RelCalc.pid = null ;
    $RelCalc.tid = null ;
    $RelCalc.getRelationshipText = function(tid, pid, page, cacheOnly, forceRecalc, src) {
        $RelCalc.getRelationshipData(tid, pid, page, cacheOnly, forceRecalc, src, $RelCalc.BindToUI)
    }
    ;
    $RelCalc.getRelationshipData = function(tid, pid, page, cacheOnly, forceRecalc, src, callBack) {
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
            success: function(data) {
                data.state != "NoMePid" && callBack(data, pid, src)
            },
            error: function() {
                return null 
            }
        })
    }
    ;
    $RelCalc.RetrieveSubsequentRelations = function(data, pid, src) {
        $RelCalc.BindToUI(data, pid, src);
        $(".relationshipLink.firstPersonHint").each(function(index) {
            index != 0 && data.state != "NoMePid" && data.state != "InValidAccess" && $RelCalc.getRelationshipText($(this).attr("tid"), $(this).attr("pid"), $(this).attr("page"), !0, !1, $(this))
        })
    }
    ;
    $RelCalc.BindToUI = function(data, pid, scr) {
        $(".relationshipStyle").show();
        $(scr).show().html(data.content);
        $(".relationshipLink." + pid).show().html(data.content)
    }
    ;
    $RelCalc.Init = function(url, name, page, nameStr, calcStr, src, pid, tid) {
        $RelCalc.pid = pid;
        $RelCalc.tid = tid;
        $RelCalc.Page = page;
        $RelCalc.CallingSource = src;
        $(window).resize(function() {
            $RelCalc.setLadderHeight()
        });
        $RelCalc.showModal(url, name, nameStr, calcStr)
    }
    ;
    $RelCalc.showModal = function(url, name, nameStr, calcStr) {
        var relCalcModal = $("#relCalcModal");
        relCalcModal && (relCalcModal.length === 0 && (relCalcModal = $("<div id='relCalcModal' style='display:none;'><\/div>").appendTo(document.body)),
        $RelCalc.url = url,
        $RelCalc.loading = "<div class='rCalcLadder' style='display:none;'><div>" + $RelCalc.format(nameStr, "<strong>" + name + "<\/strong>") + "<\/div><div><span class='flat_icon arrow2down_green'>&nbsp;<\/span><\/div><table class='center'><tr><td class='loading'><\/td><td>" + calcStr + "<\/td><\/tr><\/table><\/div>",
        relCalcModal.html("<div id='relCalcContent' style='display:none;'>" + $RelCalc.loading + "<\/div>"),
        $RelCalc.GetLadder($RelCalc.url + "getladder"))
    }
    ;
    $RelCalc.setLadderHeight = function() {
        var is_mac = /(iphone|ipod|ipad)/.test(navigator.userAgent.toLowerCase()), ladderDiv = $(".rCalcLadder"), height;
        ladderDiv && ladderDiv.length > 0 && (is_mac || (height = document.documentElement.clientHeight - 240,
        ladderDiv[0].style.maxHeight = height + "px"))
    }
    ;
    $RelCalc.GetLadder = function(ladderUrl, recalc) {
        $.ajax({
            url: ladderUrl,
            async: !0,
            type: "GET",
            beforeSend: function() {
                $RelCalc.setLoading()
            },
            success: function(data) {
                var e = document.getElementById("rCalcAction"), relCalcContent, hiddenPidfield, topRel;
                e && (e.style.display = "block");
                data.selectMepidJSON == 1 ? (relCalcContent = $("#relCalcContent"),
                relCalcContent && (relCalcContent.css("display", "block"),
                relCalcContent.html(data.content)),
                $("#relCalcModal").modal({
                    width: 400,
                    onClose: function() {
                        $RelCalc.modalClosing()
                    }
                }),
                $RelCalc.setMepidTextBoxFocus(),
                $RelCalc.mepidTextBoxTypeAheadSetup(data.userId, data.treeId, data.typeOfRequest, data.hintText),
                hiddenPidfield = document.getElementById("1_hiddenPid"),
                hiddenPidfield.onchange = function() {
                    mePidSet()
                }
                ) : ($("#relCalcContent").css("display", "block"),
                $("#relCalcContent").html(data),
                $("#relCalcModal").modal({
                    width: 400,
                    onClose: function() {
                        $RelCalc.modalClosing()
                    }
                }),
                $RelCalc.setLadderHeight(),
                $.modal.center(),
                topRel = document.getElementById("calculatedRelationship"),
                topRel && ($RelCalc.CallingSource != null  && ($RelCalc.CallingSource.innerHTML = topRel.innerHTML),
                recalc && $("#recalcDoneCtr").css("display", "block")));
                $("#IsEnglishSite").val() != undefined ? $("#IsEnglishSite").val().toLowerCase() == "true" && $RelCalc.updateRelationshipText() : $RelCalc.updateRelationshipText();
                $trees.util.setPageTrackingName($RelCalc.Page, "Relationship Ladder")
            },
            error: function() {
                $RelCalc.displayError()
            }
        })
    }
    ;
    $RelCalc.updateRelationshipText = function() {
        document.URL.indexOf("hints") != -1 || document.URL.indexOf("hints") != -1 ? $RelCalc.getRelationshipText($RelCalc.tid, $RelCalc.pid, "All Hints", !0, !1, $(".cls_" + $RelCalc.pid)) : $RelCalc.getRelationshipText($RelCalc.tid, $RelCalc.pid, "sidepanel", !0, !1, $("#relationshipTextDiv"))
    }
    ;
    $RelCalc.modalClosing = function() {
        $RelCalc.Modal = null 
    }
    ;
    $RelCalc.setLoading = function() {
        var e = document.getElementById("rCalcAction"), relCalcContent;
        e && (e.style.display = "none");
        relCalcContent = $("#relCalcContent");
        relCalcContent && relCalcContent.html($RelCalc.loading)
    }
    ;
    $RelCalc.displayError = function() {
        clearTimeout($RelCalc.timeoutId);
        var relCalcContent = $("#relCalcContent");
        relCalcContent && relCalcContent.html($RelCalc.error);
        $RelCalc.delayedClose()
    }
    ;
    $RelCalc.delayedClose = function() {
        setTimeout(function() {
            $.modal.close()
        }, 4e3)
    }
    ;
    $RelCalc.recalculate = function() {
        $('[data-modal-id="relCalcModal"]').remove();
        $RelCalc.GetLadder($RelCalc.url + "getladder/true", !0)
    }
    ;
    $RelCalc.selectMe = function() {
        $('[data-modal-id="relCalcModal"]').remove();
        $RelCalc.GetLadder($RelCalc.url + "selectMePid/0")
    }
    ;
    $RelCalc.toggleHelp = function() {
        $RelCalc.resetHelpItems();
        var recalc = document.getElementById("recalcDoneCtr");
        recalc && (recalc.style.display = "none");
        $Anc.ShowHide("rCalcHelp");
        $.modal.center()
    }
    ;
    $RelCalc.toggleHelpItem = function(id) {
        var e = document.getElementById("helpItem" + id);
        e !== null  && (e.style.display == "block" ? (e.style.display = "none",
        e = document.getElementById("helpIcon" + id).className = "flat_icon arrow3right_green_small") : ($RelCalc.resetHelpItems(),
        document.getElementById("helpIcon" + id).className = "flat_icon arrow3down_green_small",
        e.style.display = "block"))
    }
    ;
    $RelCalc.resetHelpItems = function() {
        var i = 1;
        for (e = document.getElementById("helpItem" + i); e !== null ; )
            e.style.display = "none",
            document.getElementById("helpIcon" + i).className = "flat_icon arrow3right_green_small",
            ++i,
            e = document.getElementById("helpItem" + i)
    }
    ;
    $RelCalc.format = function() {
        var str, i, re;
        if (arguments.length === 0)
            return null ;
        for (str = arguments[0],
        i = 1; i < arguments.length; i++)
            re = new RegExp("\\{" + (i - 1) + "\\}","gm"),
            str = str.replace(re, arguments[i]);
        return str
    }
    ;
    $RelCalc.selectFromTreeBrowse = function(selectFromTreeUrl) {
        window.open(selectFromTreeUrl, "", "toolbar=no,resizable=yes,scrollbars=yes,menubar=no,status=no,location=no,height=600,width=800")
    }
    ;
    $RelCalc.printLadder = function() {
        var printWindow = window.open($RelCalc.url + "printladder", "PrintWindow", "width=750,height=850,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");
        printWindow.focus()
    }
    ;
    $RelCalc.mepidTextBoxTypeAheadSetup = function(userId, treeId, typeOfRequest, hintText) {
        if (document.getElementById("1_mepidNameTextBox") !== null ) {
            mepidSelectTextBox = new AutoSuggestControl(document.getElementById("1_mepidNameTextBox"),document.getElementById("myContainer"),userId,treeId,typeOfRequest,document.getElementById("1_hiddenPid"),null ,null ,hintText);
            var mepidRelCalcModal = document.getElementById("relCalcModal");
            mepidRelCalcModal !== null  && (mepidRelCalcModal.style.overflow = "visible");
            mepidSelectTextBox.myAutoComp.itemSelectEvent.subscribe($RelCalc.mePidSelectHandler);
            mepidSelectTextBox.myAutoComp.dataReturnEvent.subscribe($RelCalc.mePidChangedHandler)
        }
        return
    }
    ;
    $RelCalc.setMepidTextBoxFocus = function() {
        var mepidNameTextBox = document.getElementById("1_mepidNameTextBox");
        mepidNameTextBox !== null  && (mepidNameTextBox.focus(),
        mepidNameTextBox.select())
    }
    ;
    $RelCalc.enableSelectButton = function() {
        document.getElementById("disabledSelectButton").style.display = "none";
        document.getElementById("enabledSelectButton").style.display = "inline-block"
    }
    ;
    $RelCalc.disableSelectButton = function() {
        document.getElementById("disabledSelectButton").style.display = "inline-block";
        document.getElementById("enabledSelectButton").style.display = "none"
    }
    ;
    $RelCalc.showNameNotFoundText = function() {
        document.getElementById("1_mepidNameTextBox").style.backgroundColor = "#feece6";
        document.getElementById("nameNotFoundText").style.display = "block";
        $RelCalc.disableSelectButton()
    }
    ;
    $RelCalc.hideNameNotFoundText = function() {
        document.getElementById("1_mepidNameTextBox").style.backgroundColor = "";
        document.getElementById("nameNotFoundText").style.display = "none"
    }
    ;
    $RelCalc.validateMepid = function(e) {
        var evt = e ? e : window.event, hiddenPid;
        return (evt.stopPropagation && evt.stopPropagation(),
        evt.cancelBubble != null  && (evt.cancelBubble = !0),
        hiddenPid = document.getElementById("1_hiddenPid"),
        hiddenPid !== null  && hiddenPid.value.length === 0) ? ($RelCalc.showNameNotFoundText(),
        !1) : ($RelCalc.GetLadder($RelCalc.url + "selectMePid/" + hiddenPid.value),
        $('div[data-modal-id="relCalcModal"]').remove(),
        !0)
    }
    ;
    $RelCalc.cancelSelectMepid = function() {
        $.modal.close();
        var currentAutoControl = document.getElementById("1_mepidNameTextBox");
        currentAutoControl !== null  && (currentAutoControl.value = "")
    }
    ;
    $RelCalc.mePidChangedHandler = function(sType, aArgs) {
        var items = aArgs[2];
        items[0].pid !== "" ? $RelCalc.hideNameNotFoundText() : $RelCalc.showNameNotFoundText()
    }
    ;
    $RelCalc.mePidSelectHandler = function() {
        var currentAutoControl = document.getElementById("1_mepidNameTextBox")
          , hiddenPid = document.getElementById("1_hiddenPid");
        hiddenPid !== null  && hiddenPid.value.length !== 0 && ($RelCalc.enableSelectButton(),
        $RelCalc.hideNameNotFoundText())
    }
    ;
    function myCallback(name, byear, dyear, pid) {
        var currentAutoControl = document.getElementById("1_mepidNameTextBox"), hiddenPid;
        currentAutoControl !== null  && (hiddenPid = document.getElementById("1_hiddenPid"),
        hiddenPid !== null  && (hiddenPid.value = pid),
        currentAutoControl.value = name + " (" + byear + " - " + dyear + ")",
        mepidSelectTextBox.myAutoComp.forceSelection = !1,
        $RelCalc.enableSelectButton())
    }
}
