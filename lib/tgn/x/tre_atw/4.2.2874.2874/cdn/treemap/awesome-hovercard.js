"use strict";
function quickEdit(treeId, personId) {
    var apmCallback = function(cbResponse) {
        if (cbResponse.status === "success") {
            var e = window.event;
            return typeof e != "undefined" && e.preventDefault(),
            cbResponse.mode === "m" && ($.modal.close(),
            location.reload()),
            !1
        }
        return window.isCancelClicked && cbResponse.mode === "m" && $.modal.close(),
        !0
    }
    ;
    AddPerson.Edit(treeId, personId, {}, apmCallback)
}
function removePersonModal() {
    closeCallouts();
    $("#modalRemovePerson").modal({
        onOpen: function() {
            var removeFormUrl = "/tree/" + $trees.hovercard.getTid() + "/person/" + $trees.hovercard.nodeEl.getAttribute("T:Pid") + "/removePerson?viewerType=" + $trees.treeMap.viewerType;
            $("#modalRemovePerson").attr("action", removeFormUrl)
        },
        onClose: function() {
            $(".remModalTriggered").removeClass("remModalTriggered").focus()
        }
    });
    $("#RemoveModalCancelButton").on("click", function() {
        $.modal.close()
    })
}
function closeCallouts() {
    $(".calloutTrigger.active").callout("close")
}
var showHoverCard = !1
  , showAddPerson = !1
  , skipHideHover = !1;
$trees.HoverCardObject = function(treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewLiving, editPtUrlTemplate) {
    this.init(treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewLiving, editPtUrlTemplate)
}
;
$trees.HoverCardObject.prototype = {
    treeId: "",
    hoverEl: null ,
    controlsDivId: "",
    canEdit: !1,
    focusUrl: "",
    profileUrl: "",
    pageStackArgs: "",
    searchUrl: "",
    hintUrl: "",
    addRelativeUrl: "",
    placesUrl: "",
    isUSSite: "",
    delayBeforeShow: 0,
    delayBeforeHide: 0,
    isDisplaying: !1,
    nodeEl: null ,
    showTimeoutId: -1,
    hideTimeoutId: -1,
    hintExtraWidth: 17,
    hintExtraHeight: 21,
    uploadPhotoUrl: "",
    editPhotoUrl: "",
    canContribute: !1,
    canViewLiving: !1,
    editPtUrlTemplate: "",
    calloutHeight: 179,
    viewport: null ,
    zoomLevel: .5,
    nodePosition: null ,
    offscreenNodes: null ,
    pubV2: !1,
    init: function(treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewLiving, editPtUrlTemplate) {
        this.treeId = treeId;
        this.hoverEl = $("#" + hoverDivId);
        this.hoverHeight = parseInt(this.hoverEl.css("height"));
        this.hoverWidth = parseInt(this.hoverEl.css("width"));
        this.controlsDivId = controlsDivId;
        this.canEdit = canEdit;
        this.focusUrl = decodeURI(focusUrl);
        this.profileUrl = decodeURI(profileUrl);
        this.pageStackArgs = decodeURI(pageStackArgs);
        this.searchUrl = decodeURI(searchUrl);
        this.hintUrl = decodeURI(hintUrl);
        this.addRelativeUrl = decodeURI(addRelativeUrl);
        this.placesUrl = decodeURI(placesUrl);
        this.isUSSite = isUSSite;
        this.focusPid = focusPid;
        this.clearShowTimer();
        this.clearHideTimer();
        this.uploadPhotoUrl = decodeURI(uploadPhotoUrl);
        this.editPhotoUrl = decodeURI(editPhotoUrl);
        this.canContribute = canContribute;
        this.canViewLiving = canViewLiving;
        this.editPtUrlTemplate = decodeURI(editPtUrlTemplate);
        this.viewport = document.getElementById("trVp");
        this.zoomLevel = $trees.treeMap.zoomLevel;
        this.pubV2 = typeof ancestry != "undefined" && ancestry.pub ? !0 : !1;
        this.pubV2 && ancestry.pub.setCurrentPage("TreeViewer", {
            TreeId: this.treeId,
            FocusPersonId: this.focusPid || null 
        })
    },
    setUpHoverCard: function() {
        window.treesScreenType("smart-phone") ? this.hoverEl.addClass("hoverCardNotDesktop hoverCardActive").removeClass("hoverCardNotDesktop hoverCardActive hoverCardQuadrant1 hoverCardQuadrant2 hoverCardQuadrant3 hoverCardQuadrant4").css({
            "-webkit-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            "-ms-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            transform: "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)"
        }) : this.hoverEl.removeClass("hoverCardNotDesktop hoverCardActive hoverCardQuadrant1 hoverCardQuadrant2 hoverCardQuadrant3 hoverCardQuadrant4").css({
            "-webkit-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            "-ms-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            transform: "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)"
        }).find(".userCardSize1").removeClass("userCardSize1").addClass("userCardSize4");
        skipHideHover === !0 && (this.hoverEl.addClass("noTransition"),
        $(".nodeActive").removeClass("nodeActive nodeActiveNotInView hoverArea hoverCardQuadrant1 hoverCardQuadrant2 hoverCardQuadrant3 hoverCardQuadrant4").find(".node-bdy").addClass("noTransition"),
        skipHideHover = !1)
    },
    showHover: function() {
        var $personLookupField = $("#personLookupField"), nodes, $node, isPedigreeView, $fsIcon, $hoverName, hintUrl, $hoverBirthDate, $hoverBirthPlace, hoverBPlaceHtml, $hoverDeathDate, $hoverLivingTag, tagText, $hoverDeathPlace, hoverDPlaceHtml, tidVal, $hoverSearchLink, $hoverChangeFocusLink, changeFocusText, $hoverAddRelativeLink, rUrl;
        $(".calloutTrigger").hasClass("active") && $(".calloutTrigger.active").callout("close");
        $personLookupField.hasClass("autocompleteAttached") && $personLookupField.autocomplete("close").blur();
        nodes = $(".trGraph .node");
        this.offscreenNodes = $.map(nodes, function(val) {
            var pos = $trees.hovercard.getNodePosition(val);
            if (pos.offScreen)
                return val = $(val),
                val.addClass("nodeHidden"),
                val
        });
        try {
            if (this.nodeEl == null  || $trees.treeMap.dragInProgress == !0)
                return;
            this.nodePosition = this.getNodePosition(this.nodeEl);
            $node = $(this.nodeEl).one("mouseout", this.handleNodeMouseOut);
            window.treesScreenType("smart-phone") ? this.hoverEl.removeClass("hoverCardClose").addClass(this.nodePosition.quadrantClass).css({
                "border-radius": 6 * this.zoomLevel,
                bottom: this.nodePosition.hovercard.bottom,
                left: this.nodePosition.hovercard.left,
                right: this.nodePosition.hovercard.right,
                top: this.nodePosition.hovercard.top,
                "-webkit-transform": "none",
                "-ms-transform": "none",
                transform: "none"
            }) : this.hoverEl.removeClass("hoverCardClose").addClass(this.nodePosition.quadrantClass).css({
                "border-radius": 6 * this.zoomLevel,
                bottom: this.nodePosition.hovercard.bottom,
                left: this.nodePosition.hovercard.left,
                right: this.nodePosition.hovercard.right,
                top: this.nodePosition.hovercard.top,
                "-webkit-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
                "-ms-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
                transform: "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)"
            });
            isPedigreeView = $trees.treeMap.viewerType == "pedigree";
            this.showTimeoutId = -1;
            var pidVal = this.nodeEl.getAttribute("T:Pid")
              , nodeIdVal = this.nodeEl.getAttribute("T:NodeId")
              , oidVal = this.nodeEl.getAttribute("T:Oid")
              , pid = pidVal ? parseInt(pidVal, 10) : 0
              , nodeId = nodeIdVal ? nodeIdVal : "";
            if (pid == 0 || nodeId == "")
                return;
            var nameVal = this.nodeEl.getAttribute("T:Name")
              , fbIdVal = this.nodeEl.getAttribute("T:FbId")
              , fsIdVal = this.nodeEl.getAttribute("T:FsId")
              , hintVal = this.nodeEl.getAttribute("T:Hints")
              , bDateVal = this.nodeEl.getAttribute("T:BDate")
              , bPlaceVal = this.nodeEl.getAttribute("T:BPlace")
              , bPlaceEidVal = this.nodeEl.getAttribute("T:BPlaceEid")
              , dDateVal = this.nodeEl.getAttribute("T:DDate")
              , dLTagText = this.nodeEl.getAttribute("T:LTText")
              , dPlaceVal = this.nodeEl.getAttribute("T:DPlace")
              , dPlaceEidVal = this.nodeEl.getAttribute("T:DPlaceEid")
              , isLivingVal = this.nodeEl.getAttribute("T:IsLiving") == "True" ? !0 : !1
              , canUploadPhoto = this.canContribute && (!isLivingVal || this.canViewLiving) ? !0 : !1
              , isOwner = this.nodeEl.getAttribute("T:IsOwner") == "True" ? !0 : !1
              , $photoEl = $(document.getElementById("ndImg_" + nodeIdVal))
              , hasImage = $photoEl.length ? !0 : !1
              , imageUrl = hasImage ? $photoEl.attr("src") : null 
              , $fbLinkNode = $("#fbLinkNode");
            fbIdVal != null  && fbIdVal.length > 0 ? ($fbLinkNode.show(),
            $("#fbLink").attr("href", "http://www.facebook.com/" + fbIdVal)) : $fbLinkNode.hide();
            $fsIcon = $("#fsIcon");
            fsIdVal != null  && fsIdVal.length > 0 && !isLivingVal ? $fsIcon.addClass("familySearchActive") : $fsIcon.removeClass("familySearchActive");
            $hoverName = $("#hoverName");
            nameVal ? $hoverName.html(nameVal) : $hoverName.html("");
            var $hoverHintLink = $("#hoverHintLink")
              , $hoverHint = $("#hoverHint")
              , $hoverHintLeaf = $("#hoverHintLeaf")
              , hintCount = $hoverHintLink.length && $hoverHint.length && hintVal ? parseInt(hintVal, 10) : 0;
            hintCount > 0 ? (window.treesScreenType("smart-phone") ? $hoverHintLink.html(hintVal) : hintCount == 1 ? $hoverHintLink.html($trees.res.getString("hoverCard.hintSingle")) : hintCount > 1 && $hoverHintLink.html($trees.res.getString("hoverCard.hintMultiple").replace("{hints}", hintVal)),
            hintUrl = "",
            $trees.util.buildUrlWithHistory("PersonHints", {
                TreeId: this.treeId,
                PersonId: pidVal
            }, this.hintUrl, this.pageStackArgs).done(function(url) {
                hintUrl = url.replace("{pid}", pidVal);
                $hoverHintLink.attr("href", hintUrl);
                $hoverHintLeaf.attr("href", hintUrl).css("display", "");
                $hoverHint.attr("href", hintUrl).css("display", "")
            })) : ($hoverHint.hide(),
            $hoverHintLeaf.hide());
            $hoverBirthDate = $("#hoverBirthDate").html(bDateVal || "");
            $hoverBirthPlace = $("#hoverBirthPlace");
            $hoverBirthPlace.length && (hoverBPlaceHtml = bPlaceVal ? bPlaceVal : "",
            $hoverBirthPlace.html(hoverBPlaceHtml));
            $hoverDeathDate = $("#hoverDeathDate").html(dDateVal || "");
            $hoverLivingTag = $("#hoverLivingTag");
            $hoverLivingTag.length && (tagText = dLTagText,
            tagText ? $hoverLivingTag.html("<a class='living' href=\"javascript:$trees.hovercard.showTreeViewerLivingModal();\">" + tagText + "<\/a>").css("display", "") : $hoverLivingTag.hide());
            $hoverDeathPlace = $("#hoverDeathPlace");
            $hoverDeathPlace.length && (hoverDPlaceHtml = dPlaceVal ? dPlaceVal : "",
            $hoverDeathPlace.html(hoverDPlaceHtml));
            var gender = $node.hasClass("male") ? "Male" : $node.hasClass("female") ? "Female" : "Person"
              , $hoverPhoto = $("<img>").attr({
                id: "hoverPhoto",
                src: imageUrl
            })
              , $hoverPhotoLink = $("#hoverPhotoLink").attr("class", "userCardImg userCardImgSquare").empty();
            hasImage ? $hoverPhotoLink.append($hoverPhoto) : $hoverPhotoLink.addClass("icon icon" + gender).removeAttr("style");
            $hoverPhotoLink.attr({
                href: this.profileUrl.replace("{pid}", pidVal),
                title: $trees.res.getString("hoverCard.altViewProfilePhoto")
            });
            imageUrl && $hoverPhotoLink.attr("style", "background-image:url(" + imageUrl + ")");
            var $hoverNameLink = $("#hoverName").attr("href", this.profileUrl.replace("{pid}", pidVal))
              , $hoverProfileLink = $("#hoverProfileLink").attr("href", this.profileUrl.replace("{pid}", pidVal))
              , $hoverEditLink = $(".hoverEditLink");
            if ($hoverEditLink.length && (tidVal = this.getTid(),
            $hoverEditLink.attr("href", "javascript:quickEdit('" + tidVal + "','" + pidVal + "');")),
            $hoverSearchLink = $("#hoverSearchLink"),
            $trees.util.buildUrlWithHistory("BuildTreeSearch", {
                TreeId: this.treeId,
                PersonId: pidVal,
                SSRC: "pt"
            }, this.searchUrl, this.pageStackArgs).done(function(url) {
                $hoverSearchLink.attr("href", url.replace("{pid}", pidVal))
            }),
            $hoverChangeFocusLink = $(this.canEdit ? "#hoverChangeFocus" : "#hoverChangeFocusNonEdit"),
            $hoverChangeFocusLink.length) {
                changeFocusText = "";
                switch (gender) {
                case "Male":
                    changeFocusText = $trees.res.getString("hoverCard.viewHisFamilyTree");
                    break;
                case "Female":
                    changeFocusText = $trees.res.getString("hoverCard.viewHerFamilyTree");
                    break;
                default:
                    changeFocusText = $trees.res.getString("hoverCard.viewFamilyTree")
                }
                $hoverChangeFocusLink.attr("href", this.focusUrl.replace("{cfpid}", pidVal)).removeClass("icon iconTreePedigree iconTreeFamily").html("<span>" + changeFocusText + "<\/span>").addClass(isPedigreeView ? "icon iconTreePedigree" : "icon iconTreeFamily").css("display", "")
            }
            $hoverAddRelativeLink = $("#hoverAddRelativeLink");
            $hoverAddRelativeLink.length && (rUrl = this.addRelativeUrl.replace("{pid}", pidVal),
            rUrl = rUrl.replace(/"/g, "'"),
            $hoverAddRelativeLink.attr("href", rUrl));
            var $subCard = $("#hoverCardToolsList")
              , $lastSep1 = $("#hoverLastSep1")
              , $lastSep2 = $("#hoverLastSep2")
              , $hoverCard = $("#trHover");
            this.focusPid == pidVal ? ($subCard.addClass("hoverCardToolsListFocusPerson"),
            $hoverCard.addClass("hoverCardFocusPerson"),
            $hoverCard.hasClass("hoverCardNoEditRights") && $hoverCard.find("footer .ancBtnL").addClass("needsAncBtnL").removeClass("ancBtnL"),
            $lastSep1.hide(),
            $lastSep2.hide()) : ($subCard.removeClass("hoverCardToolsListFocusPerson"),
            $hoverCard.removeClass("hoverCardFocusPerson"),
            $hoverCard.find(".needsAncBtnL").addClass("ancBtnL"),
            $lastSep1.css("display", ""));
            var calloutHeight = this.calloutHeight
              , hoverPosLeft = this.nodePosition.node.right - this.hoverWidth
              , hoverPosTop = this.nodePosition.node.top
              , hoverCalloutPosTop = !1;
            hoverCalloutPosTop = this.nodePosition.hovercard.callout.top;
            this.nodePosition.inView || $node.addClass("nodeActiveNotInView");
            $("#trGraph").addClass("trGraphFaded");
            $node.addClass("nodeActive hoverArea");
            window.treesScreenType("smart-phone") ? this.hoverEl.addClass("hoverCardOpen").css({
                bottom: "10px",
                left: "10px",
                top: "10px",
                right: "10px",
                "-webkit-transform": "none",
                "-ms-transform": "none",
                transform: "none"
            }) : this.hoverEl.addClass("hoverCardOpen").css({
                bottom: this.nodePosition.hovercard.bottom != "auto" ? this.nodePosition.hovercard.bottom : "auto",
                left: this.nodePosition.hovercard.left != "auto" ? this.nodePosition.hovercard.left : "auto",
                right: this.nodePosition.hovercard.right != "auto" ? this.nodePosition.hovercard.right : "auto",
                top: this.nodePosition.hovercard.top != "auto" ? this.nodePosition.hovercard.top : "auto",
                "-webkit-transform": "scale(1) translate(" + -parseInt(this.nodePosition.offset.left) + "px, " + -parseInt(this.nodePosition.offset.top) + "px)",
                "-ms-transform": "scale(1) translate(" + -parseInt(this.nodePosition.offset.left) + "px, " + -parseInt(this.nodePosition.offset.top) + "px)",
                transform: "scale(1) translate(" + -parseInt(this.nodePosition.offset.left) + "px, " + -parseInt(this.nodePosition.offset.top) + "px)"
            });
            $("body").addClass("treeViewerAwesomeHoverCardActive").on("mouseout.hoverArea", ".hoverArea", this, this.handleHoverMouseOut).on("mouseover.hoverArea", ".hoverArea", this, this.handleHoverMouseOver);
            $("#hoverCardToolsButton").callout({
                type: "click",
                classes: "calloutMenu calloutHoverCard",
                content: "#hoverCardToolsList",
                onOpen: function() {
                    $(".callout").addClass("hoverArea")
                },
                onAfterOpen: function() {
                    $(".hoverCardToolsList").on("click", ".icon", function() {
                        $trees.hovercard.hideHover()
                    })
                },
                onClose: function() {
                    $(".callout").removeClass("hoverArea")
                },
                position: window.treesScreenType("large-screen") ? hoverCalloutPosTop ? "top" : "bottom" : "top"
            })
        } catch (e) {}
    },
    hideHover: function() {
        $("#hoverCardToolsButton").callout("close");
        $("#trGraph").removeClass("trGraphFaded").find(".nodeActive").removeClass("noTransition nodeActive nodeActiveNotInView hoverArea hoverCardQuadrant1 hoverCardQuadrant2 hoverCardQuadrant3 hoverCardQuadrant4");
        window.treesScreenType("smart-phone") ? this.hoverEl.removeClass("hoverCardOpen noTransition").addClass("hoverCardClose").css({
            bottom: this.nodePosition.hovercard.bottom,
            left: this.nodePosition.hovercard.left,
            right: this.nodePosition.hovercard.right,
            top: this.nodePosition.hovercard.top,
            "-webkit-transform": "none",
            "-ms-transform": "none",
            transform: "none"
        }) : this.hoverEl.removeClass("hoverCardOpen noTransition").addClass("hoverCardClose").css({
            bottom: this.nodePosition.hovercard.bottom,
            left: this.nodePosition.hovercard.left,
            right: this.nodePosition.hovercard.right,
            top: this.nodePosition.hovercard.top,
            "-webkit-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            "-ms-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            transform: "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)"
        });
        try {
            this.hideTimeoutId = -1;
            this.isDisplaying = !1;
            $("body").removeClass("treeViewerAwesomeHoverCardActive").off("mouseout.hoverArea").off("mouseover.hoverArea")
        } catch (e) {}
    },
    setShowTimer: function() {
        this.clearShowTimer();
        this.showTimeoutId = setTimeout(function() {
            $trees.hovercard.showHover()
        }, 0)
    },
    clearShowTimer: function() {
        this.showTimeoutId != -1 && (clearTimeout(this.showTimeoutId),
        this.showTimeoutId = -1)
    },
    setHideTimer: function() {
        this.clearHideTimer();
        this.hideTimeoutId = setTimeout(function() {
            $trees.hovercard.hideHover()
        }, 25)
    },
    clearHideTimer: function() {
        this.hideTimeoutId != -1 && (clearTimeout(this.hideTimeoutId),
        this.hideTimeoutId = -1)
    },
    handleNodeMouseOver: function(nodeEl) {
        (this.nodeEl = nodeEl,
        this.zoomLevel = $trees.treeMap.zoomLevel,
        this.nodeHeight = nodeEl.offsetHeight * this.zoomLevel,
        this.nodeWidth = nodeEl.offsetWidth * this.zoomLevel,
        $("body").hasClass("draggingTreeView")) || (this.setUpHoverCard(),
        this.setShowTimer())
    },
    handleNodeMouseOut: function(nodeEl) {
        nodeEl.target || (this.nodeEl = nodeEl.parentNode,
        this.clearShowTimer())
    },
    handleHoverMouseOut: function(e) {
        var hovercard = e && e.data ? e.data : this;
        $("body").is(":hover") && hovercard.setHideTimer()
    },
    handleHoverMouseOver: function(e) {
        var hovercard = e && e.data ? e.data : this;
        hovercard.clearShowTimer();
        hovercard.clearHideTimer()
    },
    showTreeViewerLivingModal: function() {
        var tidVal = this.getTid()
          , pidVal = this.nodeEl.getAttribute("T:Pid")
          , livingModalUrl = "/modals/living/tree/" + tidVal + "/person/" + pidVal + "/option/1";
        $genTreesModal.init("LivingModal", 400, "");
        $genTreesModal.create("LivingModal", livingModalUrl, null )
    },
    getTid: function() {
        return this.treeId
    },
    getNodePosition: function(node) {
        var result = {}, buffer;
        if (typeof node == "undefined")
            return !1;
        var viewportWidth = this.viewport.offsetWidth
          , viewportHeight = this.viewport.offsetHeight
          , centerX = viewportWidth / 2
          , centerY = viewportHeight / 2
          , coordinates = $trees.treeMap.translateToViewportCoordinates(parseFloat(node.style.left) + parseFloat(node.style.width || $trees.treeMap.familyNodeDimensions.width), parseFloat(node.style.top));
        result.quadrant = centerX < coordinates.X ? centerY > coordinates.Y ? 1 : 4 : centerY > coordinates.Y ? 2 : 3;
        var nodeDim = $trees.treeMap.getNodeDimensions(node)
          , nodeTLPos = $trees.treeMap.translateToViewportCoordinates(nodeDim.left, nodeDim.top)
          , nodeBRPos = $trees.treeMap.translateToViewportCoordinates(nodeDim.left + nodeDim.width, nodeDim.top + nodeDim.height);
        if (result.node = {
            top: parseFloat(nodeTLPos.Y),
            left: parseFloat(nodeTLPos.X),
            bottom: parseFloat(nodeBRPos.Y),
            right: parseFloat(nodeBRPos.X)
        },
        result.hovercard = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        },
        result.hovercard.callout = {
            top: !1
        },
        result.offset = {
            bottom: 0,
            top: 0,
            left: 0,
            right: 0
        },
        result.inView = !0,
        result.offScreen = !1,
        this.scaleX = this.nodeWidth / this.hoverWidth,
        this.scaleY = this.nodeHeight / this.hoverHeight,
        window.treesScreenType("smart-phone"))
            result.hovercard.bottom = parseFloat(viewportHeight - nodeBRPos.Y),
            result.hovercard.right = parseFloat(viewportWidth - nodeBRPos.X),
            result.hovercard.top = parseFloat(nodeTLPos.Y),
            result.hovercard.left = parseFloat(nodeTLPos.X);
        else {
            buffer = 25;
            switch (result.quadrant) {
            case 1:
                (nodeBRPos.Y < 0 || nodeTLPos.X > viewportWidth) && (result.offScreen = !0);
                coordinates.Y < buffer && (result.inView = !1,
                result.offset.top = coordinates.Y - buffer);
                coordinates.X > viewportWidth - buffer && (result.inView = !1,
                result.offset.left = coordinates.X - viewportWidth + buffer);
                result.quadrantClass = "hoverCardQuadrant1";
                result.hovercard.bottom = "auto";
                result.hovercard.left = "auto";
                result.hovercard.top = parseFloat(nodeTLPos.Y);
                result.hovercard.right = parseFloat(viewportWidth - nodeBRPos.X);
                result.hovercard.origin = "top right";
                break;
            case 2:
                (nodeBRPos.Y < 0 || nodeBRPos.X < 0) && (result.offScreen = !0);
                coordinates.Y < buffer && (result.inView = !1,
                result.offset.top = coordinates.Y - buffer);
                coordinates.X - this.nodeWidth < buffer && (result.inView = !1,
                result.offset.left = coordinates.X - this.nodeWidth - buffer);
                result.quadrantClass = "hoverCardQuadrant2";
                result.hovercard.bottom = "auto";
                result.hovercard.left = parseFloat(nodeTLPos.X);
                result.hovercard.top = parseFloat(nodeTLPos.Y);
                result.hovercard.right = "auto";
                result.hovercard.origin = "top left";
                break;
            case 3:
                (nodeTLPos.Y > viewportHeight || nodeBRPos.X < 0) && (result.offScreen = !0);
                coordinates.Y + this.nodeHeight > viewportHeight - buffer && (result.inView = !1,
                result.offset.top = coordinates.Y + this.nodeHeight - viewportHeight + buffer);
                coordinates.X - this.nodeWidth < buffer && (result.inView = !1,
                result.offset.left = coordinates.X - this.nodeWidth - buffer);
                result.quadrantClass = "hoverCardQuadrant3";
                result.hovercard.bottom = parseFloat(viewportHeight - nodeBRPos.Y);
                result.hovercard.left = parseFloat(nodeTLPos.X);
                result.hovercard.top = "auto";
                result.hovercard.right = "auto";
                result.hovercard.callout.top = !0;
                result.hovercard.origin = "bottom left";
                break;
            case 4:
                (nodeTLPos.Y > viewportHeight || nodeTLPos.X > viewportWidth) && (result.offScreen = !0);
                coordinates.Y + this.nodeHeight > viewportHeight - buffer && (result.inView = !1,
                result.offset.top = coordinates.Y + this.nodeHeight - viewportHeight + buffer);
                coordinates.X > viewportWidth - buffer && (result.inView = !1,
                result.offset.left = coordinates.X - viewportWidth + buffer);
                result.quadrantClass = "hoverCardQuadrant4";
                result.hovercard.bottom = parseFloat(viewportHeight - nodeBRPos.Y);
                result.hovercard.left = "auto";
                result.hovercard.top = "auto";
                result.hovercard.right = parseFloat(viewportWidth - nodeBRPos.X);
                result.hovercard.callout.top = !0;
                result.hovercard.origin = "bottom right"
            }
        }
        return result
    }
};
$trees.hoverCardCreate = function(treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewliving, editPtUrlTemplate) {
    "undefined" == typeof $trees.hovercard && ($trees.hovercard = new $trees.HoverCardObject(treeId,hoverDivId,controlsDivId,focusPid,canEdit,focusUrl,profileUrl,pageStackArgs,searchUrl,hintUrl,addRelativeUrl,placesUrl,isUSSite,uploadPhotoUrl,editPhotoUrl,canContribute,canViewliving,editPtUrlTemplate))
}
;
$(function() {
    $(".pullToFullScreen").on("pointertouchmousedown", function() {
        $("body").hasClass("treeViewerAwesomeHoverCardActive") && $trees.hovercard.hideHover()
    });
    $(".hoverCard").on("pointertouchmousedown", function(e) {
        e.stopPropagation()
    });
    $(".hoverCardCloseButton").on("pointertouchmousedown", function(e) {
        e.stopPropagation();
        e.preventDefault()
    }).on("pointertouchmouseup", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $trees.hovercard.hideHover()
    }).on("click", function(e) {
        e.stopPropagation();
        e.preventDefault()
    });
    $("#trGraph").on("pointertouchmousedown", ".node-bdy", function(e) {
        var $this, checkMove;
        e.preventDefault();
        $this = $(this);
        showHoverCard = showAddPerson = !1;
        $("body").addClass("moveGraphOrTriggerClick");
        $("body").hasClass("treeViewerAwesomeHoverCardActive") && (e.stopPropagation(),
        showHoverCard = showAddPerson = !0);
        $this.data("data-mousedownoffset", $this.offset().top + $this.offset().left);
        checkMove = setInterval(function() {
            $this.data("data-mousedownoffset") != $this.offset().top + $this.offset().left && ($("body").removeClass("moveGraphOrTriggerClick"),
            clearInterval(checkMove));
            ($("body").hasClass("treeViewerAwesomeHoverCardActive") || $("html").hasClass("modalOpen")) && ($("body").removeClass("moveGraphOrTriggerClick"),
            clearInterval(checkMove))
        }, 10)
    }).on("pointertouchmouseup", ".node-bdy", function() {
        var $this = $(this);
        $this.data("data-mouseupoffset", $this.offset().top + $this.offset().left);
        !$("body").hasClass("treeViewerAwesomeHoverCardActive") && $this.data("data-mouseupoffset") > $(this).data("data-mousedownoffset") - 25 && $this.data("data-mouseupoffset") < $(this).data("data-mousedownoffset") + 25 && (showHoverCard = showAddPerson = !0);
        $this.parent(".node").hasClass("add") ? showAddPerson === !1 ? ($this.data("data-onclick", $this.attr("onclick")),
        $this.attr("onclick", null ),
        setTimeout(function() {
            $this.attr("onclick", $this.data("data-onclick"))
        }, 300)) : ($("body").hasClass("treeViewerAwesomeHoverCardActive") && $trees.hovercard.hideHover(),
        $this.trigger("click")) : $("body").hasClass("treeViewerAwesomeHoverCardActive") || showHoverCard !== !0 ? $("body").hasClass("treeViewerAwesomeHoverCardActive") && (skipHideHover = !0,
        $trees.hovercard.handleNodeMouseOver(this.parentNode)) : ($("body").removeClass("draggingTreeView"),
        $trees.hovercard.handleNodeMouseOver(this.parentNode),
        showHoverCard = !1)
    })
})
