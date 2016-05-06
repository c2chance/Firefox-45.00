var $TreesFunc = {
    BandidoPlusModal: {
        show: function() {
            $genTreesModal.init("BandidoPlusModal", 600, "");
            $genTreesModal.create("BandidoPlusModal", "/modals/bandidoplus/tree/" + v_tid + "/person/" + v_pid, null );
            $("#modalClose").css("z-index", "3")
        }
    },
    ClickCard: {
        clickCard: null ,
        hide: function() {
            $("#clickCard").hide()
        },
        show: function(tid, pid) {
            $TreesFunc.ClickCard.clickCard === null  ? $TreesFunc.ClickCard.clickCard = $("<div id='clickCard' class='subCon subConShdw' style='display:none;position:absolute;z-index:888;'><div id='clickCardContent'><span style='margin:50px auto;width:30px;height:30px;display:block;position:relative;background-image: url(\"" + v_treesCacheUrl + "TreeMap/images/a-i-30-30-expansion.gif\");'><\/span><\/div><\/div>").appendTo(document.body) : $("#clickCardContent").html("<span style='margin:50px auto;width:30px;height:30px;display:block;position:relative;background-image: url(\"" + v_treesCacheUrl + "TreeMap/images/a-i-30-30-expansion.gif\");'><\/span>");
            var personCCIcon = $("#person_" + pid)
              , pcciPOS = personCCIcon.offset();
            $("#clickCard").css({
                left: pcciPOS.left,
                top: pcciPOS.top
            }).show();
            $.ajax({
                url: "/tree/" + tid + "/person/" + pid + "/clickcard",
                cache: !1,
                type: "GET",
                success: function(data) {
                    var result = data[0];
                    $("#clickCardContent").html(result)
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    window.console != null  && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                }
            })
        }
    },
    Family: {
        getSiblingsOnce: !0,
        showAddFamilyMemberModal: function(tidVal, pidVal, pageParams) {
            var url, addFamilySelector;
            v_tid = tidVal != null  && tidVal != "" ? tidVal : v_tid;
            v_pid = pidVal != null  && pidVal != "" ? pidVal : v_pid;
            v_pushPageParams = pageParams != null  && pageParams != "" ? pageParams : v_pushPageParams;
            url = "http://" + v_treesDomain + "/fz/command.ashx?op=dialog&dialog=addfamily&tid=" + encodeURIComponent(v_tid) + "&pid=" + encodeURIComponent(v_pid) + v_pushPageParams;
            $genTreesModal.init("AddFamilyMemberModal", 400, "");
            $genTreesModal.create("AddFamilyMemberModal", url, null );
            addFamilySelector = $("#modal");
            addFamilySelector.length > 0 && addFamilySelector.show()
        },
        toggleInnerFamilyMembers: function() {
            $(".pageNav").removeClass("userChoseShowMembers").toggleClass("hideFamilyMembers");
            $(".pageNav").hasClass("hideFamilyMembers") || $(".pageNav").addClass("userChoseShowMembers")
        },
        toggleOuterFamilyMembers: function() {
            $(".pageNav").removeClass("hideFamilyMembers").toggleClass("userChoseShowMembers");
            $(".pageNav").hasClass("userChoseShowMembers") || $(".pageNav").addClass("hideFamilyMembers");
            $TreesFunc.Family.showSiblingsCard()
        },
        responseSuccessShSib: function(data) {
            var siblingData = jQuery.parseJSON(data), fullSiblings = siblingData.siblings.full, halfSiblings = siblingData.siblings.half, fullSibCount = typeof fullSiblings != "undefined" ? fullSiblings.length : 0, halfSibCount = typeof halfSiblings != "undefined" ? halfSiblings.length : 0, sibDataDL, sib, iFull, halfsibSpacer, iHalf;
            if ($TreesFunc.Family.showSiblingsHeader(),
            sibDataDL = $("#sibData"),
            fullSibCount > 0)
                for (iFull = 0; iFull < fullSibCount; iFull++)
                    sib = fullSiblings[iFull],
                    $TreesFunc.Family.buildSiblingNode(sibDataDL, sib);
            if (halfSibCount > 0)
                for (halfsibSpacer = "<h4>" + v_halfSiblings + "<\/h4>",
                sibDataDL.append($("<li>").addClass("halfSiblings").html(halfsibSpacer)),
                iHalf = 0; iHalf < halfSibCount; iHalf++)
                    sib = halfSiblings[iHalf],
                    $TreesFunc.Family.buildSiblingNode(sibDataDL, sib);
            fullSibCount == 0 && halfSibCount == 0 && sibDataDL.append($("<li>").addClass("noSiblings").html(v_noSiblings));
            $TreesFunc.Family.getSiblingsOnce = !1
        },
        buildSiblingNode: function(sibDataDL, sib) {
            var imgClass = "photo photoSize5 icon iconPerson";
            sib.gender == "M" && (imgClass = "photo photoSize5 icon iconMale");
            sib.gender == "F" && (imgClass = "photo photoSize5 icon iconFemale");
            var click = '<button class="link icon iconProfileCard" id="sibCC_' + sib.pid + '" onclick="clickCardOnDemand(\'sibCC_' + sib.pid + "', '" + v_tid + "', '" + sib.pid + '\');" type="button"><\/button>'
              , spanHTML = "<dt><a href='javascript:$trees.util.gotoPerson(" + v_tid + "," + sib.pid + ");'>" + sib.name + "<\/a><\/dt><dd class='years'><small>" + sib.birthYear + "&nbsp;&ndash;&nbsp;" + sib.deathYear + "<\/small><\/dd>"
              , validImg = sib.image32Url && sib.image32Url.length > 0;
            sibDataDL.append($("<li>").append($("<div>").addClass(validImg ? "photo photoSize5" : imgClass).append(validImg ? $("<img />").attr({
                src: sib.image32Url
            }) : "")).append($("<dl>").addClass("nameandyears").html(spanHTML)).append(click))
        },
        showSiblingsCard: function() {
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
                    success: function(data) {
                        $("#processLoader").hide();
                        $TreesFunc.Family.responseSuccessShSib(data)
                    },
                    error: function(xhr, ajaxOptions, thrownError) {
                        window.console != null  && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                    }
                })
            }
        },
        showSiblingsHeader: function() {
            $("#sibSection").append($("<ul>").attr({
                id: "sibData"
            }))
        }
    },
    FamilySearch: {
        loadWidget: function() {
            var qs = document.location.search || "";
            qs += (qs ? "&" : "?") + "fsid=" + $("#familySearchId").val();
            $.ajax({
                cache: !1,
                url: "/tree/" + v_tid + "/person/" + v_pid + "/fs/personwidget" + qs
            }).done(function(response) {
                $("#fsWidget").html(response);
                $("#fsCancelDisconnect").click(function() {
                    $.modal.close()
                });
                $("#fsConfirmDisconnect").click(function() {
                    $.post(fsPerformDisconnectUrl).done(function(jsonResponse) {
                        jsonResponse.success ? ($("#familySearchId").val(""),
                        $TreesFunc.FamilySearch.loadWidget(),
                        $("#fsOrdStatus").callout("close"),
                        domain === "trees" ? $.modal.close() : location.reload()) : $("#fsDisconnectFail").modal({
                            title: fsErrorDisconnecting
                        })
                    })
                });
                $("#fsDisconnect").click(function() {
                    $("#fsDisconnectConfirm").modal({
                        title: fsConfirmTitle
                    })
                })
            }).fail(function() {
                $("#fsWidget").empty()
            })
        }
    },
    Feedback: {
        _fzpFeedbackDialog: null ,
        fzpInitFeedbackDialog: function() {
            var dlgXpos = YAHOO.util.Dom.getViewportWidth() / 2 - 235, dlgYpos, rendered;
            dlgXpos < 10 && (dlgXpos = 10);
            dlgXpos += YAHOO.util.Dom.getDocumentScrollLeft();
            dlgYpos = YAHOO.util.Dom.getViewportHeight() / 2 - 200;
            dlgYpos < 10 && (dlgYpos = 10);
            dlgYpos += YAHOO.util.Dom.getDocumentScrollTop();
            $TreesFunc.Feedback._fzpFeedbackDialog = new YAHOO.widget.Panel("feedbackModal",{
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
        fzpHideFeedbackDialog: function() {
            "undefined" != typeof $TreesFunc.Feedback._fzpFeedbackDialog && $TreesFunc.Feedback._fzpFeedbackDialog.cfg.setProperty("visible", !1)
        },
        fzpShowFeedbackDialog: function() {
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
        fzpSubmitFeedback: function() {
            var d = YAHOO.util.Dom, type = d.get("fbType"), message = d.get("fbMessage"), msgText = message && message.value ? message.value.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : "", callback, params;
            !type || !type.value || 1 != type.value.length || 0 >= msgText.length || "undefined" != typeof YAHOO.util.Connect && (callback = {
                success: function() {
                    $TreesFunc.Feedback.fzpHideFeedbackDialog()
                },
                failure: function() {
                    $TreesFunc.Feedback.fzpHideFeedbackDialog()
                },
                timeout: 1500
            },
            params = "type=" + encodeURIComponent(type.value) + "&msg=" + encodeURIComponent(msgText),
            YAHOO.util.Connect.asyncRequest("POST", "/fz/command.ashx?op=fzpfeedback", callback, params))
        }
    },
    Hints: {
        hintPopupRequest: function(tid, pid) {
            $.ajax({
                url: "/tree/" + tid + "/person/" + pid + "/hintspopup",
                cache: !1,
                type: "GET",
                success: function(result) {
                    $("#HintsPopupDiv").html(result.html);
                    $("#hintsPendingCount").length > 0 && $(".itemCountUpdate").each(function() {
                        this.innerHTML = $("#hintsPendingCount").val()
                    })
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    window.console != null  && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                }
            })
        }
    },
    LivingModal: {
        show: function() {
            $genTreesModal.init("LivingModal", 400, "");
            $genTreesModal.create("LivingModal", "/modals/living/tree/" + v_tid + "/person/" + v_pid + "/option/0", null )
        }
    },
    Miscellaneous: {
        ftmLoad: function() {
            setTimeout(function() {
                v_pid != null  && v_pid != "" && v_isFtm == "True" && typeof FTM_Init != "undefined" && FTM_Init("1030", v_pid, v_tid)
            }, 500)
        },
        hideOnKeyEvent: function() {
            $("#typeNameOfPerson").hide()
        },
        initPersonTypeAhead: function(inputBox) {
            var typeInstructionsElement = $("#typeAheadPersonInstructionText"), d, oTextbox;
            typeInstructionsElement.length === 0 && (typeInstructionsElement = $('<input id="typeAheadPersonInstructionText" value="' + v_typeAheadInstructions + '" type="hidden"/>'),
            typeInstructionsElement.insertAfter(inputBox));
            $("#typeAheadPersonInstructionText").val(v_typeAheadInstructions);
            $trees.util.setGotoTemplate(v_gotoPersonTemplateUrl);
            d = YAHOO.util.Dom;
            d.get("typeAheadPersonText").value = v_typeAheadInstructions;
            d.get("typeAheadPersonText") && typeof AutoSuggestControl != "undefined" && (oTextbox = new AutoSuggestControl(d.get("typeAheadPersonText"),d.get("typeAheadPersonContainer"),v_uid,v_tid,"name",d.get("typeAheadPersonHidden"),$TreesFunc.Miscellaneous.hideOnKeyEvent,$TreesFunc.Miscellaneous.showOnKeyEvent,v_typeAheadInstructions,"yui-ac-input","yui-ac-input loading loadingSmall","ancText yui-ac-input",20,function(pid) {
                $trees.util.gotoPerson(v_tid, pid)
            }
            ,3,$TreesFunc.Miscellaneous.hideOnKeyEvent),
            oTextbox.autoSuggestOnblur());
            typeof closeMEDivs != "undefined" && closeMEDivs("typeAheadPersonContainer")
        },
        setupFindAPersonAutoComplete: function() {
            $trees.util.setGotoTemplate(v_setFocusUrl);
            $("#typeAheadPersonText").autocomplete({
                source: "/suggest/person?treeId=" + v_tid + "&excludePids=",
                key: "name",
                queryParameter: "term",
                dataType: "json",
                minLength: 3,
                maxResults: 10,
                customDisplay: function(data) {
                    var displayText = data.display;
                    return (data.raw.birth != "" || data.raw.death != "") && (displayText += " " + data.raw.birth + " - " + data.raw.death),
                    {
                        value: data.value,
                        display: displayText
                    }
                },
                onItemSelect: function(itemData) {
                    itemData !== "" && $trees.util.gotoPerson(v_tid, itemData.PID)
                }
            })
        },
        closeFindAPersonAutoComplete: function() {
            $("#typeAheadPersonText").autocomplete("destroy")
        },
        printPersonView: function(url) {
            var printable = window.open(url, "", "scrollbars=yes,menubar=yes,height=800,width=1024,resizable=yes,toolbar=no")
        },
        showOnKeyEvent: function() {
            $("#typeNameOfPerson").show()
        }
    },
    Save: {
        hidePop: function(elementId) {
            $("#" + elementId).css("visibility", "hidden")
        },
        saveACopy: function(sourceTid, sourcePid, tid, pid, pgArgs) {
            var saveToSourceNode, saveRadio1, url;
            $("#saveBox").css("visibility", "hidden");
            saveToSourceNode = !1;
            sourceTid.length > 0 && sourcePid.length > 0 && (saveRadio1 = $("#saveRadio1"),
            saveRadio1.length > 0 && saveRadio1.is(":checked") && (saveToSourceNode = !0));
            saveToSourceNode ? (url = "/pt/MergeFamily2.aspx?tid=" + sourceTid + "&pid=" + sourcePid + "&stid=" + tid + "&spid=" + pid + pgArgs,
            window.location.href = url) : TGN.Ancestry.Trees.selectPerson.saveRecordToTree(attachToPerson)
        },
        saveLivingStatus: function(deceased, saveStatusUrl, treeViewerPage) {
            saveStatusUrl += deceased ? "0" : "1";
            $.ajax({
                url: saveStatusUrl,
                success: function() {
                    var aliveSpans = $(".aliveSpan");
                    aliveSpans.length > 0 && (deceased ? (aliveSpans[0].hide(),
                    aliveSpans[1].show()) : (aliveSpans[0].show(),
                    aliveSpans[1].hide()));
                    treeViewerPage && window.location.reload()
                }
            })
        },
        savePersonPop: function(thisCtl, sourceTid, sourcePid, tid, pid, pgArgs) {
            sourceTid.length == 0 ? $TreesFunc.Save.saveACopy(sourceTid, sourcePid, tid, pid, pgArgs) : $TreesFunc.Save.showPopRelativeBelowOffset(thisCtl, "#saveBox")
        },
        showPopRelativeBelowOffset: function(element, saveBoxId) {
            var savePhotoOffset = $(element).offset()
              , saveBoxPanel = $(saveBoxId);
            saveBoxPanel.css({
                right: savePhotoOffset.right - saveBoxPanel.width(),
                top: savePhotoOffset.top - saveBoxPanel.height(),
                visibility: "visible"
            })
        },
        saveThisPerson: function() {
            closeHover("moreOptMenu");
            TGN.Ancestry.Trees.selectPerson.saveRecordToTree(attachToPerson)
        }
    },
    ShoeBoxModal: {
        show: function() {
            $genTreesModal.init("ShoeboxModal", 600, "");
            $genTreesModal.create("ShoeboxModal", "/modals/shoebox/tree/" + v_tid + "/person/" + v_pid + "", null );
            $("#modalClose").css("z-index", "3")
        }
    }
}
