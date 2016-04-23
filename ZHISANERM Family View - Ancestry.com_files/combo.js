window.treesScreenType = function (type) {
    return type === "large-screen" ? $(".responsiveFlag").css("text-align") === "center" : type === "not-large-screen" ? $(".responsiveFlag").css("text-align") === "left" : type === "tablet-portrait" ? $(".responsiveFlag").css("position") === "relative" : type === "smart-phone" ? $(".responsiveFlag").css("visibility") === "visible" : type === "smart-phone-portrait" ? $(".responsiveFlag").css("text-align") === "right" : void 0
};
$(function () {
    $(".calloutAddFamily").each(function () {
        var $this = $(this),
            contentSelector = $this.parent().find(".calloutHidden"),
            buildContent = contentSelector.html();
        $this.callout({
            content: buildContent,
            classes: "calloutMenu",
            hidePointer: !0,
            onOpen: function () {
                $(".addFamilyRole").click(function () {
                    $(".calloutAddFamily").callout("close");
                    var relation = $(this).data("modal-rel"),
                        gender = $(this).data("modal-gender"),
                        personaId = $("#callOutPersonaId").val();
                    typeof AddPerson != "undefined" ? AddPerson.Add(v_tid, personaId, '{"rel":"' + relation + '","gender":"' + gender + '"}', v_pushPageParams) : $AddPersonModal.AddPerson(v_tid, personaId, '{"rel":"' + relation + '","gender":"' + gender + '"}', v_pushPageParams)
                })
            }
        })
    })
});
var endDragCanvas = !1,
    $hideTimeOut;
//
// viewportDivId :: 'trVp'
// canvasDivId   :: 'trGraph'
// controlsDivId :: 'trVwHd'
// focusPid      :: 42446045903
// focusNodeId   :: '42446045903:0'
// changeFocusUrlTemplate  ::  'http://trees.ancestry.com/tree/81749066/family?cfpid=%7Bcfpid%7D'
// viewProfileUrlTemplate  ::  'http://trees.ancestry.com/tree/81749066/person/%7Bpid%7D'
// printUrlTemplate        ::  'http://trees.ancestry.com/tree/81749066/person/42446045903/familyview/print'
// viewerType              ::  'family'
// cache                   ::  'http://c.mfcreative.com/TRE_ATW/4.2.2874.2874/cdn/treemap'
//

$trees.TreeMapObject = function (viewportDivId, canvasDivId, controlsDivId, focusPid, focusNodeId, changeFocusUrlTemplate, viewProfileUrlTemplate, printUrlTemplate, viewerType, cache) {
    this.init(viewportDivId, canvasDivId, controlsDivId, focusPid, focusNodeId, changeFocusUrlTemplate, viewProfileUrlTemplate, printUrlTemplate, viewerType, cache)
};

$trees.TreeMapObject.prototype = {
    viewportDivId: "",
    viewportMinHeight: 600,
    viewportEl: null,
    viewportX: 0,
    viewportY: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    windowScrollTop: 0,
    canvasEl: null,
    canvasWidth: 0,
    canvasHeight: 0,
    controlsDivId: "",
    scaleFactor: 130,
    scaleMax: 1,
    maxZoom: 1,
    minZoom: .1,
    top: 0,
    left: 0,
    zoomLevel: 1,
    zoomIncrement: .1,
    zoomEvent: null,
    liftZoom: .01,
    panEvent: null,
    dragEndEvent: null,
    changeFocusUrlTemplate: "",
    viewProfileUrlTemplate: "",
    printUrlTemplate: "",
    focusNodeEl: null,
    viewerType: "",
    familyNodeDimensions: {
        width: 1.3538461538461539,
        height: 2.2153846153846151
    },
    dragInProgress: !1,
    moveInProgress: !1,
    dragFilter: null,
    movAnimTimer: -1,
    cacheUrl: "",
    extendedGraphOffset: 0,
    init: function (viewportDivId, canvasDivId, controlsDivId, focusPid, focusNodeId, changeFocusUrlTemplate, viewProfileUrlTemplate, printUrlTemplate, viewerType, cache) {
        var dom;
        this.viewerType = viewerType;
        "pedigree" == viewerType && (this.scaleFactor = 140);
        dom = YAHOO.util.Dom;
        this.viewportDivId = viewportDivId;   // trVp
        this.viewportEl = dom.get(viewportDivId);
        this.setViewportDimensions();
        this.canvasEl = dom.get(canvasDivId); // trGraph
        this.controlsDivId = controlsDivId;   // trVwHd
        this.changeFocusUrlTemplate = decodeURI(changeFocusUrlTemplate);
        this.viewProfileUrlTemplate = decodeURI(viewProfileUrlTemplate);
        this.printUrlTemplate = decodeURI(printUrlTemplate);
        var transformEl = document.getElementById(canvasDivId),
            transformSt = window.getComputedStyle(transformEl, null),
            trMatrix = transformSt.getPropertyValue("-webkit-transform") || transformSt.getPropertyValue("-moz-transform") || transformSt.getPropertyValue("-ms-transform") || transformSt.getPropertyValue("-o-transform") || transformSt.getPropertyValue("transform") || "fail...",
            values = trMatrix.split("(")[1];
        values = values.split(")")[0];
        values = values.split(",");
        var scaleX = values[0],
            skewX = values[1],
            skewY = values[2],
            scaleY = values[3],
            translateX = values[4],
            translateY = values[5];
        this.zoomLevel = scaleX / this.scaleMax;
        this.left = parseInt(this.canvasEl.style.left, 10) / this.zoomLevel / this.scaleFactor;
        isNaN(this.left) && (this.left = 0);
        this.top = parseInt(this.canvasEl.style.top, 10) / this.zoomLevel / this.scaleFactor;
        isNaN(this.top) && (this.top = 0);
        this.focusNodeEl = dom.get(focusNodeId);
        this.disableSelection(this.viewportEl);
        this.cacheUrl = cache;
        var gesturesInWindows = !1,
            viewportDiv = $("#" + viewportDivId)[0],
            pinchDistance = 0;
        $("#" + viewportDivId).on("pointertouchmousedown", function (e) {
            $trees.treeMap.startDragCanvas(e)
        }).on("MSGestureStart gesturestart", function () {
            $(".pullToFullScreen").addClass("gestureing");
            gesturesInWindows = !0;
            endDragCanvas = !0
        }).on("MSGestureChange gesturechange", function (e) {
            if (!window.treesScreenType("smart-phone") || $("body").hasClass("treeViewerAwesomeNavigating")) return e.originalEvent.scale >= 1 ? ($trees.toolbar.zoomInCB(), e.stopPropagation(), !1) : ($trees.toolbar.zoomOutCB(), e.stopPropagation(), !1)
        }).on("MSGestureEnd gestureend", function () {
            endDragCanvas = !1;
            $(".pullToFullScreen").removeClass("gestureing")
        });
        viewportDiv.addEventListener("touchstart", function (e) {
            gesturesInWindows === !1 && (e.touches.length > 1 ? ($(".pullToFullScreen").addClass("gestureing"), pinchDistance = Math.sqrt(Math.pow(e.touches[1].pageX - e.touches[0].pageX, 2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY, 2)), endDragCanvas = !0) : pinchDistance = 0)
        });
        viewportDiv.addEventListener("touchmove", function (e) {
            if (gesturesInWindows === !1) {
                var newDistance = Math.sqrt(Math.pow(e.touches[1].pageX - e.touches[0].pageX, 2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY, 2)),
                    scale = newDistance / pinchDistance;
                if (pinchDistance <= 0) return;
                if (!window.treesScreenType("smart-phone") || $("body").hasClass("treeViewerAwesomeNavigating")) return scale >= 1 ? ($trees.toolbar.zoomInCB(), e.stopPropagation(), !1) : ($trees.toolbar.zoomOutCB(), e.stopPropagation(), !1)
            }
        });
        viewportDiv.addEventListener("touchend", function () {
            gesturesInWindows === !1 && (endDragCanvas = !1, $(".pullToFullScreen").removeClass("gestureing"), pinchDistance <= 0)
        });
        YAHOO.util.Event.addListener(window, "scroll", this.scrollWindow, this, !0);
        this.zoomEvent = new YAHOO.util.CustomEvent("treemapzoom");
        this.panEvent = new YAHOO.util.CustomEvent("treemappan");
        this.dragEndEvent = new YAHOO.util.CustomEvent("treemapdragend");
        this.scrollEvent = new YAHOO.util.CustomEvent("treemapscroll");
        $(".pageHeader").trigger("treemappan", [{
            top: parseFloat(this.canvasEl.style.top) + this.extendedGraphOffset
        }])
    },
    getFocusCenter: function () {
        return this.focusNodeEl != null ? this.getFocusCenterEx(this.focusNodeEl) : {
            x: 0,
            y: 0
        }
    },
    getFocusCenterId: function (fnId) {
        if (fnId != null) {
            var focusNode_El = YAHOO.util.Dom.get(fnId);
            if (focusNode_El || (focusNode_El = dom.get("0:" + fnId)), focusNode_El || (focusNode_El = dom.get("1:" + fnId)), focusNode_El != null) return this.getFocusCenterEx(focusNode_El)
        }
        return {
            x: 0,
            y: 0
        }
    },
    getFocusCenterEx: function (focusnode_e1) {
        var centerX = 0,
            centerY = 0,
            focusNodeCenter, viewportWidth;
        return focusnode_e1 != null && (focusNodeCenter = this.getFocusNodeCenter(focusnode_e1), centerY = focusNodeCenter.y, this.viewerType == "family" ? centerX = focusNodeCenter.x : (viewportWidth = this.viewportWidth / this.scaleFactor / this.zoomLevel, centerX = focusNodeCenter.x - focusNodeCenter.w / 2 + viewportWidth / 2 - 70 / this.scaleFactor / this.zoomLevel)), {
            x: centerX,
            y: centerY
        }
    },
    getFocusPosition: function (nodeId, expansionlevel) {
        var focusPosX = 0,
            focusPosY = 0,
            expansionDiv, expDim, focusPos;
        return nodeId != null && (expansionDiv = YAHOO.util.Dom.get("graphRect" + expansionlevel.toString()), expansionDiv != null && (expDim = this.getExpansionDimensions(expansionDiv), focusPos = this.getFocusPositionEx(nodeId, expDim), focusPosX = focusPos.x, focusPosY = focusPos.y)), {
            x: focusPosX,
            y: focusPosY
        }
    },
    getFocusPositionEx: function (nodeId, expDim) {
        var focusPosX = 0,
            focusPosY = 0,
            nodeCtrl, canvasPosTL, canvasPosBR, focusCenter, centerViewPort, centerExpansion;
        if (nodeId != null && (nodeCtrl = YAHOO.util.Dom.get(nodeId), nodeCtrl != null && (canvasPosTL = this.translateToCanvasCoordinates(0, 0), canvasPosBR = this.translateToCanvasCoordinates(this.viewportWidth, this.viewportHeight), focusPosX = this.left, focusPosY = this.top, expDim != null))) {
            var nodeCenter = this.getFocusNodeCenter(nodeCtrl),
                viewportWidth = this.viewportWidth / this.scaleFactor / this.zoomLevel,
                viewportHeight = this.viewportHeight / this.scaleFactor / this.zoomLevel,
                difX = 0,
                difY = 0,
                tooWide = !1;
            if (expDim.width > viewportWidth && (difX = expDim.width / 2 - viewportWidth / 2, tooWide = !0), expDim.height > viewportHeight)
                if (tooWide == !1) difY = expDim.height / 2 - viewportHeight / 2;
                else if (focusCenter = this.getFocusCenterEx(nodeCtrl), focusCenter.x != 0 && focusCenter.y != 0) return this.focusOnPointAnim(this.zoomLevel, focusCenter.x, focusCenter.y), {
                x: 0,
                y: 0
            };
            var e = Number(".8"),
                s = this.viewerType == "pedigree" ? Number("1.5") : Number(".6"),
                t = Number("1.3");
            if (expDim.left + e < canvasPosTL.x) return focusPosX = focusPosX + (canvasPosTL.x + e - expDim.left) + difX, centerViewPort = canvasPosTL.y + viewportHeight / 2, centerExpansion = expDim.top + expDim.height / 2, focusPosY = centerExpansion > centerViewPort ? focusPosY - (centerExpansion - centerViewPort) + t : focusPosY + (centerViewPort - centerExpansion) - t, {
                x: focusPosX,
                y: focusPosY
            };
            expDim.right + s > canvasPosBR.x && (focusPosX = focusPosX - (expDim.right + s - canvasPosBR.x) - difX);
            expDim.top - t < canvasPosTL.y ? focusPosY = focusPosY - (expDim.top - canvasPosTL.y - t) + difY : expDim.bottom + t > canvasPosBR.y && (focusPosY = focusPosY - (expDim.bottom + t - canvasPosBR.y) - difY)
        }
        return {
            x: focusPosX,
            y: focusPosY
        }
    },
    showNodeFocusAnim: function (nodeIdArray) {
        var areaBoundries = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            },
            x, nodeIdToMove, nodeCtrl, nodeDim, nodeDimRight, nodeDimBottom, focusPos;
        if (nodeIdArray.length > 0)
            for (x = 0; x < nodeIdArray.length; x++) nodeIdToMove = nodeIdArray[x], nodeCtrl = YAHOO.util.Dom.get(nodeIdToMove.toString()), nodeCtrl != null && (nodeDim = this.getNodeDimensions(nodeCtrl), (nodeDim.left < areaBoundries.left || areaBoundries.left == 0) && (areaBoundries.left = nodeDim.left), (nodeDim.top < areaBoundries.top || areaBoundries.top == 0) && (areaBoundries.top = nodeDim.top), nodeDimRight = nodeDim.left + nodeDim.width, nodeDimBottom = nodeDim.top + nodeDim.height, (areaBoundries.right == 0 || nodeDimRight > areaBoundries.right) && (areaBoundries.right = nodeDimRight), (areaBoundries.bottom == 0 || nodeDimBottom > areaBoundries.bottom) && (areaBoundries.bottom = nodeDimBottom));
        focusPos = this.getFocusPositionEx(nodeIdArray[0].toString(), areaBoundries);
        focusPos.x != 0 && focusPos.y != 0 && this.focusOnPointAnimEx($trees.treeMap.zoomLevel, focusPos.x, focusPos.y)
    },
    getNodeFromPid: function (pid) {
        var nodes = $("[class*=node]");
        return jQuery.each(nodes, function (index, node) {
            if (node.getAttribute("t:pid") == pid) return node
        }), null
    },
    getNodesFromPid: function (pid) {
        var nodes = $("[class*=node]"),
            nodeArr = [],
            i = 0;
        return (jQuery.each(nodes, function (index, node) {
            node.getAttribute("t:pid") == pid && (nodeArr[i] = node, i++)
        }), nodeArr.length > 0) ? nodeArr : null
    },
    setViewportDimensions: function () {
        var region = YAHOO.util.Dom.getRegion(this.viewportEl);
        this.viewportX = region.left;
        this.viewportY = region.top;
        this.viewportWidth = region.width;
        this.viewportHeight = region.height
    },
    getCanvasZoom: function () {
        return this.zoomLevel * this.scaleFactor
    },
    getCanvasLeft: function () {
        var left = this.zoomLevel * this.scaleFactor * this.left;
        return isNaN(left) && (left = 0), left
    },
    getCanvasTop: function () {
        var top = this.zoomLevel * this.scaleFactor * this.top;
        return isNaN(top) && (top = 0), top
    },
    setZoomLevel: function (zoomLevel, fireEvent) {
        zoomLevel != 0 && (this.zoomLevel = zoomLevel, $canvasEl = $(this.canvasEl), $canvasEl.css({
            "-webkit-transform": "scale(" + zoomLevel + ")",
            "-ms-transform": "scale(" + zoomLevel + ")",
            transform: "scale(" + zoomLevel + ")"
        }), this.moveInProgress === !0 && this.clearPositionMoveAnim(), fireEvent == !0 && this.zoomEvent.fire({
            zoomLevel: zoomLevel
        }))
    },
    setPosition: function (left, top, fireEvent) {
        isNaN(left) && (left = 0);
        isNaN(top) && (top = 0);
        this.left = left;
        this.top = top;
        var posLeft = this.getCanvasLeft().toFixed(5) + "px",
            posTop = this.getCanvasTop().toFixed(5) + "px";
        $(".nodeHidden").removeClass("nodeHidden");
        this.canvasEl.style.left = posLeft;
        this.canvasEl.style.top = posTop;
        fireEvent == !0 && this.panEvent.fire({
            left: left,
            top: top
        });
        $(".pageHeader").trigger("treemappan", [{
            top: parseFloat(posTop) + this.extendedGraphOffset
        }])
    },
    setScroll: function (top) {
        top && window.scrollTo(0, top)
    },
    updatePan: function () {
        this.panEvent.fire({
            left: this.left,
            top: this.top
        })
    },
    setPositionAnim: function (left, top) {
        var movSpeed, newleft, newtop;
        if (this.dragInProgress === !0) {
            this.clearPositionMoveAnim();
            return
        }
        var incrementX = this.left > left ? this.left - left : left - this.left,
            incrementY = this.top > top ? this.top - top : top - this.top,
            ratioYtoX = incrementY / incrementX,
            incrementPct = Number(".08"),
            maxXIncrement = Number(".99"),
            minXIncrement = Number(".15"),
            minYIncrement = Number(".12");
        if (incrementX = incrementX * incrementPct, incrementY = incrementY * incrementPct, movSpeed = Number("6"), incrementY < minXIncrement && (incrementY = minYIncrement, incrementX = incrementY / ratioYtoX, movSpeed = Number("3")), incrementX > maxXIncrement && (incrementX = maxXIncrement, incrementY = incrementX * ratioYtoX), newleft = left, newtop = top, this.left > left && this.left - left > incrementX ? newleft = this.left - incrementX : this.left < left && left - this.left > incrementX && (newleft = this.left + incrementX), this.top > top && this.top - top > incrementY ? newtop = this.top - incrementY : this.top < top && top - this.top > incrementY && (newtop = this.top + incrementY), newleft != left || newtop != top) {
            this.moveInProgress = !0;
            this.setPosition(newleft, newtop, !1);
            try {
                this.movAnimTimer = setTimeout(function () {
                    $trees.treeMap.setPositionAnim(left, top)
                }, movSpeed, "JAVASCRIPT")
            } catch (e) {
                this.clearPositionMoveAnim()
            }
        } else this.setPosition(newleft, newtop, !1), this.clearPositionMoveAnim()
    },
    clearPositionMoveAnim: function () {
        this.moveInProgress === !0 && (this.moveInProgress = !1, this.movAnimTimer != -1 && (clearTimeout(this.movAnimTimer), this.movAnimTimer = -1));
        this.panEvent.fire({
            left: this.left,
            top: this.top
        })
    },
    zoomOnPoint: function (zoomLevel, x, y, fireEvent) {
        if (zoomLevel != 0) {
            var myLeft = (x + this.left) * this.zoomLevel / zoomLevel - x,
                myTop = (y + this.top) * this.zoomLevel / zoomLevel - y;
            (myLeft != this.left || myTop != this.top || zoomLevel != this.zoomLevel) && (this.setZoomLevel(zoomLevel, fireEvent), this.setPosition(myLeft, myTop, fireEvent))
        }
    },
    setZoom: function (zoomLevel, viewportX, viewportY) {
        var canvasPosition = this.translateToCanvasCoordinates(viewportX, viewportY),
            canvasMax = this.translateToCanvasCoordinates(this.viewportWidth, this.viewportHeight),
            positionx = Math.max(canvasPosition.x, 0),
            positiony;
        positionx = Math.min(canvasPosition.x, canvasMax.x);
        positiony = Math.max(canvasPosition.y, 0);
        positiony = Math.min(canvasPosition.y, canvasMax.y);
        zoomLevel >= this.minZoom && zoomLevel <= this.maxZoom + this.liftZoom && this.zoomOnPoint(zoomLevel, positionx, positiony, !0)
    },
    changeZoom: function (increase, viewportX, viewportY) {
        var zoom;
        increase ? (zoom = this.zoomLevel + this.zoomIncrement, zoom > this.maxZoom && (zoom = this.maxZoom)) : (zoom = this.zoomLevel - this.zoomIncrement, zoom < this.minZoom && (zoom = this.minZoom));
        this.setZoom(zoom, viewportX, viewportY)
    },
    zoomOnCenter: function (zoomLevel) {
        this.setZoom(zoomLevel, this.viewportWidth / 2, this.viewportHeight / 2)
    },
    zoomIn: function () {
        this.changeZoom(!0, this.viewportWidth / 2, this.viewportHeight / 2)
    },
    zoomOut: function () {
        this.changeZoom(!1, this.viewportWidth / 2, this.viewportHeight / 2)
    },
    focusOnPoint: function (zoomLevel, focusx, focusy) {
        var viewportWidth = this.viewportWidth / this.scaleFactor / zoomLevel,
            viewportHeight = this.viewportHeight / this.scaleFactor / zoomLevel;
        this.setZoomLevel(zoomLevel, !0);
        this.setPosition(viewportWidth / 2 - focusx, viewportHeight / 2 - focusy, !0)
    },
    focusOnPointAnim: function (zoomLevel, focusx, focusy) {
        var viewportWidth, viewportHeight, endX, endY;
        if (this.dragInProgress === !0 || this.moveInProgress === !0) {
            this.clearPositionMoveAnim();
            return
        }
        viewportWidth = this.viewportWidth / this.scaleFactor / zoomLevel;
        viewportHeight = this.viewportHeight / this.scaleFactor / zoomLevel;
        this.setZoomLevel(zoomLevel, !1);
        endX = viewportWidth / 2 - focusx;
        endY = viewportHeight / 2 - focusy;
        this.setPositionAnim(endX, endY)
    },
    focusOnPointAnimEx: function (zoomLevel, focusx, focusy) {
        if (this.dragInProgress === !0 || this.moveInProgress === !0) {
            this.clearPositionMoveAnim();
            return
        }
        this.setPositionAnim(focusx, focusy)
    },
    translateToViewportCoordinates: function (x, y) {
        var retValues = {};
        return retValues.X = this.scaleFactor * this.zoomLevel * (x + this.left), retValues.Y = this.scaleFactor * this.zoomLevel * (y + this.top), retValues
    },
    translateToCanvasCoordinates: function (X, Y) {
        var retValues = {};
        return retValues.x = X / this.scaleFactor / this.zoomLevel - this.left, retValues.y = Y / this.scaleFactor / this.zoomLevel - this.top, retValues
    },
    startDragCanvas: function (e) {
        var viewportId = this.viewportEl.id;
        if (e.target != null) {
            if ($(e.target).closest("#" + this.controlsDivId + ", #thumbNav, #trHover, .expandTree, .viewTreeExtender, .familyList").length != 0) return;
            this.startDragPosition = this.getViewportMousePosition(e);
            this.startDragTopLeft = {
                top: this.top,
                left: this.left
            };
            $(document).on("pointertouchmousemove", function (e) {
                $trees.treeMap.dragCanvas(e);
                $trees.treeMap.checkDragCanvas(e)
            }).on("pointertouchmouseup", function (e) {
                $trees.treeMap.endDragCanvas(e)
            });
            $(this.viewportEl).removeClass("openhand").addClass("closehand");
            $("body").addClass("draggingTreeView");
            this.dragInProgress = !0
        }
    },
    endDragCanvas: function (e) {
        if (this.dragInProgress) return this.dragInProgress = !1, $(document).off("pointertouchmousemove").off("pointertouchmouseup"), this.startDragPosition = null, this.dragFilter = null, this.dragEndEvent.fire({}), $(this.viewportEl).removeClass("closehand").addClass("openhand"), $("body").removeClass("draggingTreeView"), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
    },
    dragCanvas: function (e) {
        if (this.dragInProgress) {
            var viewportPosition = this.getViewportMousePosition(e),
                left = (viewportPosition.x - this.startDragPosition.x) / this.scaleFactor / this.zoomLevel + this.startDragTopLeft.left,
                top = (viewportPosition.y - this.startDragPosition.y) / this.scaleFactor / this.zoomLevel + this.startDragTopLeft.top;
            return this.setPosition(left, top, !0), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }
    },
    checkDragCanvas: function (e) {
        if (this.dragInProgress) {
            var target = YAHOO.util.Event.getTarget(e);
            if (target != null && target.id == "Content-2" || endDragCanvas === !0) return this.endDragCanvas(e)
        }
    },
    getMousePosition: function (e) {
        var position = YAHOO.util.Event.getXY(e);
        return {
            x: position[0],
            y: position[1]
        }
    },
    getViewportMousePosition: function (e) {
        var absPos = this.getMousePosition(e),
            X = absPos.x - this.viewportX,
            Y = absPos.y - this.viewportY;
        return {
            x: X,
            y: Y
        }
    },
    scrollWindow: function () {
        this.setWindowScroll();
        this.scrollEvent.fire()
    },
    expandCollapse: function () {
        for (var element, i = 0; i < arguments.length; i++) element = document.getElementById(arguments[i]), element != null && (element.style.display = element.style.display == "none" ? "" : "none")
    },
    hasParent: function (el, divIdName, stopDivIdName) {
        el = el.parentElement || el.parentNode;
        for (var i = 0; i < 100; i++) {
            if (el == null) return !1;
            if (el.id == divIdName) return !0;
            if (stopDivIdName != null && el.id == stopDivIdName) return !1;
            el = el.parentElement || el.parentNode
        }
        return !1
    },
    print: function () {
        var printable = window.open(this.printUrlTemplate, "")
    },
    changeFocusPerson: function (fpid) {
        document.location.href = this.changeFocusUrlTemplate.replace("{cfpid}", fpid.toString())
    },
    viewProfilePage: function (fpid) {
        document.location.href = this.viewProfileUrlTemplate.replace("{pid}", fpid.toString())
    },
    getFocusNodeCenter: function (focusNodeEl) {
        var dim = this.getNodeDimensions(focusNodeEl);
        return {
            x: dim.left + dim.width / 2,
            y: dim.top + dim.height / 2,
            w: dim.width,
            h: dim.height
        }
    },
    getNodeDimensions: function (nodeEl) {
        var nodeLeft = parseFloat(nodeEl.style.left),
            nodeTop, nodeWidth, nodeHeight;
        return isNaN(nodeLeft) && (nodeLeft = 0), nodeTop = parseFloat(nodeEl.style.top), isNaN(nodeTop) && (nodeTop = 0), nodeWidth = parseFloat(nodeEl.style.width), isNaN(nodeWidth) && (nodeWidth = this.viewerType == "family" ? this.familyNodeDimensions.width : 0), nodeHeight = parseFloat(nodeEl.style.height), isNaN(nodeHeight) && (nodeHeight = this.viewerType == "family" ? this.familyNodeDimensions.height : 0), {
            left: nodeLeft,
            top: nodeTop,
            width: nodeWidth,
            height: nodeHeight
        }
    },
    getExpansionDimensions: function (expansionDiv) {
        var expTop = parseFloat(expansionDiv.getAttribute("t:top")),
            expLeft, expRight, expBottom;
        return isNaN(expTop) && (expTop = 0), expLeft = parseFloat(expansionDiv.getAttribute("t:left")), isNaN(expLeft) && (expLeft = 0), expRight = parseFloat(expansionDiv.getAttribute("t:right")), isNaN(expRight) && (expRight = this.viewportWidth), expBottom = parseFloat(expansionDiv.getAttribute("t:bottom")), isNaN(expBottom) && (expBottom = this.viewportHeight), {
            left: expLeft,
            top: expTop,
            right: expRight,
            bottom: expBottom,
            width: expRight - expLeft,
            height: expBottom - expTop
        }
    },
    setWindowScroll: function () {
        var tmpScrollTop = 0;
        typeof pageYOffset == "number" ? tmpScrollTop = window.pageYOffset : document.body && (document.body.scrollLeft || document.body.scrollTop) ? tmpScrollTop = document.body.scrollTop : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (tmpScrollTop = document.documentElement.scrollTop);
        this.windowScrollTop = tmpScrollTop
    },
    disableSelection: function (target) {
        typeof target.onselectstart != "undefined" ? target.onselectstart = function () {
            return !1
        } : typeof target.style.MozUserSelect != "undefined" ? target.style.MozUserSelect = "none" : target.onmousedown = function () {
            return !1
        }
    },
    showInviteeWelcome: function (url) {
        YAHOO.util.Connect.asyncRequest("GET", url, this.showInviteeWelcomeCallback)
    },
    showInviteeWelcomeCallback: {
        success: function (o) {
            var res = eval("(" + o.responseText + ")"),
                returnedHTML = res.html;
            $treesmodal.TreesGlobalModalCreate();
            $treesmodal.tgModal.openModal(returnedHTML, "400px")
        },
        failure: function () {},
        timeout: 15e3
    }
};

// $trees.treeMapCreate('trVp', 'trGraph', 'trVwHd', 42446045903, '42446045903:0', 
// 'http://trees.ancestry.com/tree/81749066/family?cfpid=%7Bcfpid%7D', 
// 'http://trees.ancestry.com/tree/81749066/person/%7Bpid%7D', 
// 'http://trees.ancestry.com/tree/81749066/person/42446045903/familyview/print', 
// 'family', 
// 'http://c.mfcreative.com/TRE_ATW/4.2.2874.2874/cdn/treemap');
//
// viewportDivId :: 'trVp'
// canvasDivId   :: 'trGraph'
// controlsDivId :: 'trVwHd'
// focusPid      :: 42446045903
// focusNodeId   :: '42446045903:0'
// changeFocusUrlTemplate  ::  'http://trees.ancestry.com/tree/81749066/family?cfpid=%7Bcfpid%7D'
// viewProfileUrlTemplate  ::  'http://trees.ancestry.com/tree/81749066/person/%7Bpid%7D'
// printUrlTemplate        ::  'http://trees.ancestry.com/tree/81749066/person/42446045903/familyview/print'
// viewerType              ::  'family'
// cache                   ::  'http://c.mfcreative.com/TRE_ATW/4.2.2874.2874/cdn/treemap'
//
$trees.treeMapCreate = function (viewportDivId, canvasDivId, controlsDivId, focusPid, focusNodeId, changeFocusUrlTemplate, viewProfileUrlTemplate, printUrlTemplate, viewerType, cache) {
    "undefined" == typeof $trees.treeMap && ($trees.treeMap = new $trees.TreeMapObject(viewportDivId, canvasDivId, controlsDivId, focusPid, focusNodeId, changeFocusUrlTemplate, viewProfileUrlTemplate, printUrlTemplate, viewerType, cache))
};
$trees.displayNodeOptions = function () {
    var calloutAlignment = "bottom";
    $trees.treeMap.viewerType == "pedigree" && (calloutAlignment = "right");
    $(".node .hoverCallout").filter(function () {
        return $(this).attr("t:name") != "UNKNOWN"
    }).callout({
        type: "hover",
        align: "center",
        position: calloutAlignment,
        content: "Loading...",
        hideDelay: "500",
        onOpen: function (trigger) {
            var currentNode = trigger.parents(".node"),
                nodePid = currentNode.attr("t:pid"),
                callout = $(this),
                nodeRollOverData = {
                    ViewProfileStr: $("#ViewProfileStr").val(),
                    ViewProfileHref: "/tree/" + v_treeId + "/person/" + nodePid,
                    ViewTreeStr: $("#ViewTreeStr").val(),
                    ViewTreeHref: "?cfpid=" + nodePid + "&snid=" + nodePid + ".0&pidval=" + nodePid,
                    SearchToolTipStr: $("#SearchToolTipStr").val(),
                    SearchHref: "/pt/RecordSearch.aspx?tid=" + v_treeId + "&pid=" + nodePid + "&ssrc=pt&mrgIgn=1&pg=32799",
                    QuickEditStr: $("#QuickEditStr").val(),
                    AddRelativeStr: $("#AddRelativeStr").val(),
                    AddRelativeHref: "javascript:$TreesFunc.Family.showAddFamilyMemberModal('" + v_treeId + "', '" + nodePid + "', '&mrgign=1&pg=32799')"
                },
                dataContent = $("<div/>").html($("#nodeOptionsTemplate").tmpl(nodeRollOverData));
            currentNode.attr("id") == $trees.treeMap.focusNodeEl.id && dataContent.find(".nodeOptions .iconTreeFamily").hide();
            $("#isOwnerEditor").length > 0 && $("#isOwnerEditor").val().toLowerCase() == "false" && (dataContent.find(".nodeOptions .iconEdit").remove(), dataContent.find(".nodeOptions .iconPersonAdd").remove());
            $("#userCanViewLiving").length > 0 && $("#userCanViewLiving").val().toLowerCase() == "false" && currentNode.attr("t:isliving").toLowerCase() == "true" && dataContent.find(".nodeOptions .iconSearch").remove();
            $.callout.content(callout, dataContent.html());
            $(".nodeOptions .icon").on("click", function () {
                $("#callout").css("z-index", "1004")
            });
            $trees.treeMap.viewerType == "pedigree" && $(".hoverCallout").css("right", "0")
        }
    })
};
$trees.displayHintCount = function (source) {
    var hintsCount = $(source).attr("t:hints");
    if (source && hintsCount && hintsCount > 0) {
        if (hintsCount > 99) {
            $(source).find(".node-bdy div.itemCount").html("99+").show();
            return
        }
        $(source).find(".node-bdy div.itemCount").html(hintsCount).show()
    }
};
$trees.hideHintCount = function (source) {
    $(source).find(".node-bdy div.itemCount").hide()
};
$trees.bindHover = function () {
    $("#trGraph .node").each(function () {
        $(this).hover(function () {
            $trees.displayHintCount(this)
        }, function () {
            $trees.hideHintCount(this)
        })
    })
};
$trees.bind = function () {
    $trees.bindHover();
    $(".hoverCallout").length > 0 && $trees.displayNodeOptions()
};
$trees.bindHoverOnExtend = function () {
    $(".node .node-bdy").off("mouseenter mouseleave");
    $trees.bind()
};
$trees.deselect = function () {
    document.selection ? document.selection.empty() : window.getSelection && window.getSelection().removeAllRanges()
};
$(function () {
    var resizeTimer;
    $("html").on("click", "body:not(.treeViewerAwesomeNavigating) #trVwHd, body:not(.treeViewerAwesomeNavigating) #thumbNav", function (e) {
        e.stopPropagation()
    }).on("pointertouchmousedown", "body:not(.treeViewerAwesomeNavigating) .treeViewerAwesome", function () {
        window.treesScreenType("smart-phone") && ($("body").addClass("treeViewerAwesomeNavigating"), checkPageActions())
    });
    $(".exitFullScreen").prependTo($(".pageCrumbs")).on("pointertouchmousedown", function (e) {
        e.stopPropagation();
        e.preventDefault()
    }).on("pointertouchmouseup", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("body").removeClass("treeViewerAwesomeNavigating");
        checkPageActions()
    }).on("click", function (e) {
        e.stopPropagation();
        e.preventDefault()
    });
    $(window).on("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            $(".nodeHidden").removeClass("nodeHidden");
            $("body").hasClass("treeViewerAwesomeHoverCardActive") && !window.treesScreenType("smart-phone") && $trees.hovercard.hideHover();
            window.treesScreenType("smart-phone") === !1 && $("body").hasClass("treeViewerAwesomeNavigating") === !0 && $(".exitFullScreen").trigger("pointertouchmouseup");
            $trees.treeMap.setViewportDimensions()
        }, 250)
    })
});
$trees.ToolbarObject = function (treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomUrl, pageStackArgs) {
    this.init(treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomUrl, pageStackArgs)
};
$trees.ToolbarObject.prototype = {
    treeId: "",
    viewportDivEl: null,
    startPosition: null,
    currentThumbOffset: 0,
    maxThumbOffset: 48,
    focusPid: 0,
    homePid: 0,
    dragInProgress: !1,
    dragFilter: null,
    dragEndEvent: null,
    selectHomeUrl: "",
    pageStackArgs: "",
    init: function (treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomeUrl, pageStackArgs) {
        this.treeId = treeId;
        this.viewportDivEl = $("#viewportDivId");
        this.homePid = homePid;
        this.focusPid = focusPid;
        this.selectHomeUrl = selectHomeUrl;
        this.pageStackArgs = pageStackArgs;
        $("#slider").on("pointertouchmousedown.tlbr", this, this.startDragThumb);
        $("#centerFocus").on("click.tlbr", this, this.resetView);
        $("#zoomIn").on("click.tlbr", this, this.zoomInCB);
        $("#zoomOut").on("click.tlbr", this, this.zoomOutCB);
        $("#print").on("click.tlbr", this, this.printCB);
        this.dragEndEvent = new YAHOO.util.CustomEvent("toolbardragend");
        $trees.treeMap.zoomEvent.subscribe(this.handleZoomEvent, this, !0);
        $trees.treeMap.panEvent.subscribe(this.handlePanEvent, this, !0);
        $trees.treeMap.dragEndEvent.subscribe(this.handlePanEvent, this, !0);
        $(window).on("resize.tlbr", this, this.setFocusControl);
        if (changeFocus && $trees.treeMap.zoomLevel == .5 ? this.setControlEnable("centerFocus", !1) : this.setFocusControl(), this.isControlEnabled("homePerson") && ((this.selectHomeUrl == null || this.selectHomeUrl.length == 0) && this.homePid == this.focusPid && this.setControlEnable("homePerson", !1), this.isControlEnabled("homePerson"))) $("#homePerson").on("click.tlbr", this, this.homePersonCB);
        this.setZoomControls();
        $("#cntrls").css("display", "")
    },
    resetView: function (e) {
        var toolBar = e && e.data || this,
            focusCenter = $trees.treeMap.getFocusNodeCenter($trees.treeMap.focusNodeEl);
        $trees.treeMap.zoomOnPoint(.5, focusCenter.x, focusCenter.y, !1);
        toolBar.setZoomControls();
        toolBar.centerFocusCB()
    },
    centerFocusCB: function () {
        var focusCenter = $trees.treeMap.getFocusCenter();
        $trees.treeMap.focusOnPoint($trees.treeMap.zoomLevel, focusCenter.x, focusCenter.y);
        this.setFocusControl()
    },
    centerFocusAnimateCB: function () {
        var focusNodeId = $trees.treeMap.focusNodeEl != null ? $trees.treeMap.focusNodeEl.id : "";
        this.centerFocusAnim(focusNodeId);
        this.setFocusControl()
    },
    centerFocusAnim: function (focusnodee1) {
        var focusCenter = $trees.treeMap.getFocusCenterId(focusnodee1.toString());
        focusCenter.x != 0 && focusCenter.y != 0 && $trees.treeMap.focusOnPointAnim($trees.treeMap.zoomLevel, focusCenter.x, focusCenter.y)
    },
    showFocusAnim: function (expnodee1, expansionlevel) {
        var focusCenter = $trees.treeMap.getFocusPosition(expnodee1.toString(), expansionlevel);
        focusCenter.x != 0 && focusCenter.y != 0 && $trees.treeMap.focusOnPointAnimEx($trees.treeMap.zoomLevel, focusCenter.x, focusCenter.y)
    },
    setControlEnable: function (controlName, enable) {
        enable ? $("#" + controlName).removeClass("disabled") : $("#" + controlName).addClass("disabled")
    },
    isControlEnabled: function (controlName) {
        return !$("#" + controlName).hasClass("disabled")
    },
    homePersonCB: function (e) {
        var toolBar = e && e.data || this;
        toolBar.selectHomeUrl && toolBar.selectHomeUrl.length > 0 ? $trees.util.buildUrlWithHistory("TreeSelectMe", {
            TreeId: toolBar.treeId,
            SetHomePerson: "1"
        }, toolBar.selectHomeUrl, toolBar.pageStackArgs).done(function (url) {
            document.location.href = url
        }) : $trees.treeMap.changeFocusPerson(toolBar.homePid)
    },
    zoomInCB: function () {
        $trees.treeMap.zoomIn()
    },
    zoomOutCB: function () {
        $trees.treeMap.zoomOut()
    },
    printCB: function () {
        $trees.treeMap.print()
    },
    startDragThumb: function (e) {
        var toolBar = e && e.data || this;
        if (e.target != null && e.target.id == "slider") {
            $trees.treeMap.moveInprogress == !0 && $trees.treeMap.clearPositionMoveAnim();
            toolBar.dragInProgress = !0;
            toolBar.startPosition = $trees.treeMap.getMousePosition(e);
            toolBar.startPosition.offset = parseInt($(e.target).css("top"));
            toolBar.dragFilter = new $trees.EventFilter(toolBar, "dragThumb", "checkDragThumb");
            $(document).on("pointertouchmousemove.tlbr", toolBar.dragFilter, toolBar.dragFilter.handleEvent).on("pointertouchmouseup.tlbr", toolBar, toolBar.endDragThumb);
            return $(".treeViewerAwesome").addClass("cntrlsZooming"), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }
    },
    endDragThumb: function (e) {
        var toolBar = e && e.data || this;
        if (toolBar.dragInProgress) return $(document).off("pointertouchmousemove.tlbr pointertouchmouseup.tlbr"), toolBar.startPosition = null, toolBar.dragFilter = null, toolBar.dragEndEvent.fire({}), toolBar.setZoomControls(), toolBar.setFocusControl(), $(".treeViewerAwesome").removeClass("cntrlsZooming"), e.preventDefault ? e.preventDefault() : e.returnValue = !1, toolBar.dragInProgress = !1, !1
    },
    dragThumb: function (e) {
        var currentPosition, offsetY, sliderEl, zoomLevel;
        if (this.dragInProgress) return currentPosition = $trees.treeMap.getMousePosition(e), offsetY = currentPosition.y - this.startPosition.y + this.startPosition.offset, offsetY > this.maxThumbOffset && (offsetY = this.maxThumbOffset), offsetY < 0 && (offsetY = 0), sliderEl = $("#slider").css("top", offsetY), zoomLevel = Math.round((this.maxThumbOffset - offsetY) / this.maxThumbOffset * $trees.treeMap.maxZoom / $trees.treeMap.zoomIncrement) * $trees.treeMap.zoomIncrement, zoomLevel > $trees.treeMap.maxZoom && (zoomLevel = $trees.treeMap.maxZoom), zoomLevel < $trees.treeMap.minZoom && (zoomLevel = $trees.treeMap.minZoom), $trees.treeMap.zoomOnCenter(zoomLevel), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
    },
    checkDragThumb: function (e) {
        if (this.dragInProgress && e.target != null && e.target.id == "Content-2") return this.endDragThumb(e)
    },
    setFocusControl: function (e) {
        var toolBar = e && e.data || this,
            currentZoom = $trees.treeMap.zoomLevel,
            currentCenter = $trees.treeMap.translateToCanvasCoordinates($trees.treeMap.viewportWidth / 2, $trees.treeMap.viewportHeight / 2),
            focusCenter = $trees.treeMap.getFocusCenter();
        Math.abs(currentZoom - .5) < .01 && currentCenter != null && Math.abs(focusCenter.x - currentCenter.x) < .1 && Math.abs(focusCenter.y - currentCenter.y) < .1 ? toolBar.setControlEnable("centerFocus", !1) : toolBar.setControlEnable("centerFocus", !0)
    },
    setZoomControls: function (e) {
        var toolBar = e && e.data || this,
            zoomLevel = $trees.treeMap.zoomLevel;
        toolBar.dragInProgress || toolBar.setSliderToMatchZoomLevel(zoomLevel);
        zoomLevel >= $trees.treeMap.maxZoom ? toolBar.setControlEnable("zoomIn", !1) : toolBar.setControlEnable("zoomIn", !0);
        zoomLevel <= $trees.treeMap.minZoom ? toolBar.setControlEnable("zoomOut", !1) : toolBar.setControlEnable("zoomOut", !0)
    },
    setSliderToMatchZoomLevel: function (zoomLevel) {
        var sliderEl = $("#slider"),
            sliderPosition;
        sliderEl.length && (sliderPosition = zoomLevel / $trees.treeMap.maxZoom * this.maxThumbOffset, sliderPosition > this.maxThumbOffset && (sliderPosition = this.maxThumbOffset), (sliderPosition < 0 || zoomLevel == $trees.treeMap.minZoom) && (sliderPosition = 0), this.currentThumbOffset = Math.round(this.maxThumbOffset - sliderPosition), sliderEl.css("top", parseFloat(this.currentThumbOffset.toFixed(2))))
    },
    handleZoomEvent: function () {
        this.dragInProgress || (this.setZoomControls(), this.setFocusControl())
    },
    handlePanEvent: function () {
        $trees.treeMap.dragInProgress || this.dragInProgress || this.setFocusControl()
    }
};
$trees.toolbarCreate = function (treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomUrl, pageStackArgs) {
    "undefined" == typeof $trees.toolbar && ($trees.toolbar = new $trees.ToolbarObject(treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomUrl, pageStackArgs))
};
$trees.StateManagerObject = function (stateUrl) {
    this.init(stateUrl)
};
$trees.StateManagerObject.prototype = {
    stateUrl: "",
    delayBeforeRequest: 10,
    changeIsQueued: !1,
    savedState: {},
    init: function (stateUrl) {
        this.stateUrl = stateUrl;
        $trees.treeMap.zoomEvent.subscribe(this.handleZoomEvent, this, !0);
        $trees.treeMap.panEvent.subscribe(this.handlePanEvent, this, !0);
        $trees.treeMap.dragEndEvent.subscribe(this.handlePanEvent, this, !0);
        $trees.treeMap.scrollEvent.subscribe(this.handleScrollEvent, this, !0);
        $trees.toolbar.dragEndEvent.subscribe(this.handleZoomEvent, this, !0);
        var myScope = this;
        window.addEventListener("beforeunload", function () {
            myScope.sendStateToServer()
        })
    },
    handleZoomEvent: function () {
        $trees.toolbar.dragInProgress || this.handleChangedState()
    },
    handlePanEvent: function () {
        $trees.treeMap.dragInProgress || $trees.toolbar.dragInProgress || this.handleChangedState()
    },
    handleScrollEvent: function () {
        $trees.toolbar.dragInProgress || this.handleChangedState()
    },
    handleChangedState: function () {
        if (this.changeIsQueued === !1) {
            var myScope = this;
            this.changeIsQueued = !0;
            setTimeout(function () {
                myScope.sendStateToServer();
                myScope.changeIsQueued = !1
            }, this.delayBeforeRequest * 1e3)
        }
    },
    sendStateToServer: function () {
        var stateChanged = !1,
            zoomLevel = ($trees.treeMap.zoomLevel * 100).toFixed(5),
            vwidth, vheight, left, top, scrollTop, myUrl;
        this.savedState.zoomLevel !== zoomLevel && (stateChanged = !0, this.savedState.zoomLevel = zoomLevel);
        vwidth = $trees.treeMap.viewportWidth;
        this.savedState.vwidth !== vwidth && (stateChanged = !0, this.savedState.vwidth = vwidth);
        vheight = $trees.treeMap.viewportHeight;
        this.savedState.vheight !== vheight && (stateChanged = !0, this.savedState.vheight = vheight);
        left = $trees.treeMap.getCanvasLeft().toFixed(5);
        this.savedState.left !== left && (stateChanged = !0, this.savedState.left = left);
        top = $trees.treeMap.getCanvasTop().toFixed(5);
        this.savedState.top !== top && (stateChanged = !0, this.savedState.top = top);
        scrollTop = $trees.treeMap.windowScrollTop;
        this.savedState.scrollTop !== scrollTop && (stateChanged = !0, this.savedState.scrollTop = scrollTop);
        stateChanged && (myUrl = this.stateUrl + "&zoom=" + encodeURIComponent(zoomLevel) + "&top=" + encodeURIComponent(top) + "&left=" + encodeURIComponent(left) + "&vw=" + encodeURIComponent(vwidth) + "&vh=" + encodeURIComponent(vheight) + "&st=" + encodeURIComponent(scrollTop), $.post(myUrl))
    }
};
$trees.stateMgrCreate = function (stateUrl) {
    "undefined" == typeof $trees.statemgr && ($trees.statemgr = new $trees.StateManagerObject(stateUrl))
};
"use strict";

function quickEdit(treeId, personId) {
    var apmCallback = function (cbResponse) {
        if (cbResponse.status === "success") {
            var e = window.event;
            return typeof e != "undefined" && e.preventDefault(), cbResponse.mode === "m" && ($.modal.close(), location.reload()), !1
        }
        return window.isCancelClicked && cbResponse.mode === "m" && $.modal.close(), !0
    };
    AddPerson.Edit(treeId, personId, {}, apmCallback)
}

function removePersonModal() {
    closeCallouts();
    $("#modalRemovePerson").modal({
        onOpen: function () {
            var removeFormUrl = "/tree/" + $trees.hovercard.getTid() + "/person/" + $trees.hovercard.nodeEl.getAttribute("T:Pid") + "/removePerson?viewerType=" + $trees.treeMap.viewerType;
            $("#modalRemovePerson").attr("action", removeFormUrl)
        },
        onClose: function () {
            $(".remModalTriggered").removeClass("remModalTriggered").focus()
        }
    });
    $("#RemoveModalCancelButton").on("click", function () {
        $.modal.close()
    })
}

function closeCallouts() {
    $(".calloutTrigger.active").callout("close")
}
var showHoverCard = !1,
    showAddPerson = !1,
    skipHideHover = !1;
$trees.HoverCardObject = function (treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewLiving, editPtUrlTemplate) {
    this.init(treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewLiving, editPtUrlTemplate)
};
$trees.HoverCardObject.prototype = {
    treeId: "",
    hoverEl: null,
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
    nodeEl: null,
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
    viewport: null,
    zoomLevel: .5,
    nodePosition: null,
    offscreenNodes: null,
    pubV2: !1,
    init: function (treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewLiving, editPtUrlTemplate) {
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
    setUpHoverCard: function () {
        window.treesScreenType("smart-phone") ? this.hoverEl.addClass("hoverCardNotDesktop hoverCardActive").removeClass("hoverCardNotDesktop hoverCardActive hoverCardQuadrant1 hoverCardQuadrant2 hoverCardQuadrant3 hoverCardQuadrant4").css({
            "-webkit-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            "-ms-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            transform: "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)"
        }) : this.hoverEl.removeClass("hoverCardNotDesktop hoverCardActive hoverCardQuadrant1 hoverCardQuadrant2 hoverCardQuadrant3 hoverCardQuadrant4").css({
            "-webkit-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            "-ms-transform": "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)",
            transform: "scale(" + this.scaleX + ", " + this.scaleY + ") translate(0px, 0px)"
        }).find(".userCardSize1").removeClass("userCardSize1").addClass("userCardSize4");
        skipHideHover === !0 && (this.hoverEl.addClass("noTransition"), $(".nodeActive").removeClass("nodeActive nodeActiveNotInView hoverArea hoverCardQuadrant1 hoverCardQuadrant2 hoverCardQuadrant3 hoverCardQuadrant4").find(".node-bdy").addClass("noTransition"), skipHideHover = !1)
    },
    showHover: function () {
        var $personLookupField = $("#personLookupField"),
            nodes, $node, isPedigreeView, $fsIcon, $hoverName, hintUrl, $hoverBirthDate, $hoverBirthPlace, hoverBPlaceHtml, $hoverDeathDate, $hoverLivingTag, tagText, $hoverDeathPlace, hoverDPlaceHtml, tidVal, $hoverSearchLink, $hoverChangeFocusLink, changeFocusText, $hoverAddRelativeLink, rUrl;
        $(".calloutTrigger").hasClass("active") && $(".calloutTrigger.active").callout("close");
        $personLookupField.hasClass("autocompleteAttached") && $personLookupField.autocomplete("close").blur();
        nodes = $(".trGraph .node");
        this.offscreenNodes = $.map(nodes, function (val) {
            var pos = $trees.hovercard.getNodePosition(val);
            if (pos.offScreen) return val = $(val), val.addClass("nodeHidden"), val
        });
        try {
            if (this.nodeEl == null || $trees.treeMap.dragInProgress == !0) return;
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
            var pidVal = this.nodeEl.getAttribute("T:Pid"),
                nodeIdVal = this.nodeEl.getAttribute("T:NodeId"),
                oidVal = this.nodeEl.getAttribute("T:Oid"),
                pid = pidVal ? parseInt(pidVal, 10) : 0,
                nodeId = nodeIdVal ? nodeIdVal : "";
            if (pid == 0 || nodeId == "") return;
            var nameVal = this.nodeEl.getAttribute("T:Name"),
                fbIdVal = this.nodeEl.getAttribute("T:FbId"),
                fsIdVal = this.nodeEl.getAttribute("T:FsId"),
                hintVal = this.nodeEl.getAttribute("T:Hints"),
                bDateVal = this.nodeEl.getAttribute("T:BDate"),
                bPlaceVal = this.nodeEl.getAttribute("T:BPlace"),
                bPlaceEidVal = this.nodeEl.getAttribute("T:BPlaceEid"),
                dDateVal = this.nodeEl.getAttribute("T:DDate"),
                dLTagText = this.nodeEl.getAttribute("T:LTText"),
                dPlaceVal = this.nodeEl.getAttribute("T:DPlace"),
                dPlaceEidVal = this.nodeEl.getAttribute("T:DPlaceEid"),
                isLivingVal = this.nodeEl.getAttribute("T:IsLiving") == "True" ? !0 : !1,
                canUploadPhoto = this.canContribute && (!isLivingVal || this.canViewLiving) ? !0 : !1,
                isOwner = this.nodeEl.getAttribute("T:IsOwner") == "True" ? !0 : !1,
                $photoEl = $(document.getElementById("ndImg_" + nodeIdVal)),
                hasImage = $photoEl.length ? !0 : !1,
                imageUrl = hasImage ? $photoEl.attr("src") : null,
                $fbLinkNode = $("#fbLinkNode");
            fbIdVal != null && fbIdVal.length > 0 ? ($fbLinkNode.show(), $("#fbLink").attr("href", "http://www.facebook.com/" + fbIdVal)) : $fbLinkNode.hide();
            $fsIcon = $("#fsIcon");
            fsIdVal != null && fsIdVal.length > 0 && !isLivingVal ? $fsIcon.addClass("familySearchActive") : $fsIcon.removeClass("familySearchActive");
            $hoverName = $("#hoverName");
            nameVal ? $hoverName.html(nameVal) : $hoverName.html("");
            var $hoverHintLink = $("#hoverHintLink"),
                $hoverHint = $("#hoverHint"),
                $hoverHintLeaf = $("#hoverHintLeaf"),
                hintCount = $hoverHintLink.length && $hoverHint.length && hintVal ? parseInt(hintVal, 10) : 0;
            hintCount > 0 ? (window.treesScreenType("smart-phone") ? $hoverHintLink.html(hintVal) : hintCount == 1 ? $hoverHintLink.html($trees.res.getString("hoverCard.hintSingle")) : hintCount > 1 && $hoverHintLink.html($trees.res.getString("hoverCard.hintMultiple").replace("{hints}", hintVal)), hintUrl = "", $trees.util.buildUrlWithHistory("PersonHints", {
                TreeId: this.treeId,
                PersonId: pidVal
            }, this.hintUrl, this.pageStackArgs).done(function (url) {
                hintUrl = url.replace("{pid}", pidVal);
                $hoverHintLink.attr("href", hintUrl);
                $hoverHintLeaf.attr("href", hintUrl).css("display", "");
                $hoverHint.attr("href", hintUrl).css("display", "")
            })) : ($hoverHint.hide(), $hoverHintLeaf.hide());
            $hoverBirthDate = $("#hoverBirthDate").html(bDateVal || "");
            $hoverBirthPlace = $("#hoverBirthPlace");
            $hoverBirthPlace.length && (hoverBPlaceHtml = bPlaceVal ? bPlaceVal : "", $hoverBirthPlace.html(hoverBPlaceHtml));
            $hoverDeathDate = $("#hoverDeathDate").html(dDateVal || "");
            $hoverLivingTag = $("#hoverLivingTag");
            $hoverLivingTag.length && (tagText = dLTagText, tagText ? $hoverLivingTag.html("<a class='living' href=\"javascript:$trees.hovercard.showTreeViewerLivingModal();\">" + tagText + "<\/a>").css("display", "") : $hoverLivingTag.hide());
            $hoverDeathPlace = $("#hoverDeathPlace");
            $hoverDeathPlace.length && (hoverDPlaceHtml = dPlaceVal ? dPlaceVal : "", $hoverDeathPlace.html(hoverDPlaceHtml));
            var gender = $node.hasClass("male") ? "Male" : $node.hasClass("female") ? "Female" : "Person",
                $hoverPhoto = $("<img>").attr({
                    id: "hoverPhoto",
                    src: imageUrl
                }),
                $hoverPhotoLink = $("#hoverPhotoLink").attr("class", "userCardImg userCardImgSquare").empty();
            hasImage ? $hoverPhotoLink.append($hoverPhoto) : $hoverPhotoLink.addClass("icon icon" + gender).removeAttr("style");
            $hoverPhotoLink.attr({
                href: this.profileUrl.replace("{pid}", pidVal),
                title: $trees.res.getString("hoverCard.altViewProfilePhoto")
            });
            imageUrl && $hoverPhotoLink.attr("style", "background-image:url(" + imageUrl + ")");
            var $hoverNameLink = $("#hoverName").attr("href", this.profileUrl.replace("{pid}", pidVal)),
                $hoverProfileLink = $("#hoverProfileLink").attr("href", this.profileUrl.replace("{pid}", pidVal)),
                $hoverEditLink = $(".hoverEditLink");
            if ($hoverEditLink.length && (tidVal = this.getTid(), $hoverEditLink.attr("href", "javascript:quickEdit('" + tidVal + "','" + pidVal + "');")), $hoverSearchLink = $("#hoverSearchLink"), $trees.util.buildUrlWithHistory("BuildTreeSearch", {
                    TreeId: this.treeId,
                    PersonId: pidVal,
                    SSRC: "pt"
                }, this.searchUrl, this.pageStackArgs).done(function (url) {
                    $hoverSearchLink.attr("href", url.replace("{pid}", pidVal))
                }), $hoverChangeFocusLink = $(this.canEdit ? "#hoverChangeFocus" : "#hoverChangeFocusNonEdit"), $hoverChangeFocusLink.length) {
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
            $hoverAddRelativeLink.length && (rUrl = this.addRelativeUrl.replace("{pid}", pidVal), rUrl = rUrl.replace(/"/g, "'"), $hoverAddRelativeLink.attr("href", rUrl));
            var $subCard = $("#hoverCardToolsList"),
                $lastSep1 = $("#hoverLastSep1"),
                $lastSep2 = $("#hoverLastSep2"),
                $hoverCard = $("#trHover");
            this.focusPid == pidVal ? ($subCard.addClass("hoverCardToolsListFocusPerson"), $hoverCard.addClass("hoverCardFocusPerson"), $hoverCard.hasClass("hoverCardNoEditRights") && $hoverCard.find("footer .ancBtnL").addClass("needsAncBtnL").removeClass("ancBtnL"), $lastSep1.hide(), $lastSep2.hide()) : ($subCard.removeClass("hoverCardToolsListFocusPerson"), $hoverCard.removeClass("hoverCardFocusPerson"), $hoverCard.find(".needsAncBtnL").addClass("ancBtnL"), $lastSep1.css("display", ""));
            var calloutHeight = this.calloutHeight,
                hoverPosLeft = this.nodePosition.node.right - this.hoverWidth,
                hoverPosTop = this.nodePosition.node.top,
                hoverCalloutPosTop = !1;
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
                onOpen: function () {
                    $(".callout").addClass("hoverArea")
                },
                onAfterOpen: function () {
                    $(".hoverCardToolsList").on("click", ".icon", function () {
                        $trees.hovercard.hideHover()
                    })
                },
                onClose: function () {
                    $(".callout").removeClass("hoverArea")
                },
                position: window.treesScreenType("large-screen") ? hoverCalloutPosTop ? "top" : "bottom" : "top"
            })
        } catch (e) {}
    },
    hideHover: function () {
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
    setShowTimer: function () {
        this.clearShowTimer();
        this.showTimeoutId = setTimeout(function () {
            $trees.hovercard.showHover()
        }, 0)
    },
    clearShowTimer: function () {
        this.showTimeoutId != -1 && (clearTimeout(this.showTimeoutId), this.showTimeoutId = -1)
    },
    setHideTimer: function () {
        this.clearHideTimer();
        this.hideTimeoutId = setTimeout(function () {
            $trees.hovercard.hideHover()
        }, 25)
    },
    clearHideTimer: function () {
        this.hideTimeoutId != -1 && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = -1)
    },
    handleNodeMouseOver: function (nodeEl) {
        (this.nodeEl = nodeEl, this.zoomLevel = $trees.treeMap.zoomLevel, this.nodeHeight = nodeEl.offsetHeight * this.zoomLevel, this.nodeWidth = nodeEl.offsetWidth * this.zoomLevel, $("body").hasClass("draggingTreeView")) || (this.setUpHoverCard(), this.setShowTimer())
    },
    handleNodeMouseOut: function (nodeEl) {
        nodeEl.target || (this.nodeEl = nodeEl.parentNode, this.clearShowTimer())
    },
    handleHoverMouseOut: function (e) {
        var hovercard = e && e.data ? e.data : this;
        $("body").is(":hover") && hovercard.setHideTimer()
    },
    handleHoverMouseOver: function (e) {
        var hovercard = e && e.data ? e.data : this;
        hovercard.clearShowTimer();
        hovercard.clearHideTimer()
    },
    showTreeViewerLivingModal: function () {
        var tidVal = this.getTid(),
            pidVal = this.nodeEl.getAttribute("T:Pid"),
            livingModalUrl = "/modals/living/tree/" + tidVal + "/person/" + pidVal + "/option/1";
        $genTreesModal.init("LivingModal", 400, "");
        $genTreesModal.create("LivingModal", livingModalUrl, null)
    },
    getTid: function () {
        return this.treeId
    },
    getNodePosition: function (node) {
        var result = {},
            buffer;
        if (typeof node == "undefined") return !1;
        var viewportWidth = this.viewport.offsetWidth,
            viewportHeight = this.viewport.offsetHeight,
            centerX = viewportWidth / 2,
            centerY = viewportHeight / 2,
            coordinates = $trees.treeMap.translateToViewportCoordinates(parseFloat(node.style.left) + parseFloat(node.style.width || $trees.treeMap.familyNodeDimensions.width), parseFloat(node.style.top));
        result.quadrant = centerX < coordinates.X ? centerY > coordinates.Y ? 1 : 4 : centerY > coordinates.Y ? 2 : 3;
        var nodeDim = $trees.treeMap.getNodeDimensions(node),
            nodeTLPos = $trees.treeMap.translateToViewportCoordinates(nodeDim.left, nodeDim.top),
            nodeBRPos = $trees.treeMap.translateToViewportCoordinates(nodeDim.left + nodeDim.width, nodeDim.top + nodeDim.height);
        if (result.node = {
                top: parseFloat(nodeTLPos.Y),
                left: parseFloat(nodeTLPos.X),
                bottom: parseFloat(nodeBRPos.Y),
                right: parseFloat(nodeBRPos.X)
            }, result.hovercard = {
                top: 0,
                left: 0,
                bottom: 0,
                right: 0
            }, result.hovercard.callout = {
                top: !1
            }, result.offset = {
                bottom: 0,
                top: 0,
                left: 0,
                right: 0
            }, result.inView = !0, result.offScreen = !1, this.scaleX = this.nodeWidth / this.hoverWidth, this.scaleY = this.nodeHeight / this.hoverHeight, window.treesScreenType("smart-phone")) result.hovercard.bottom = parseFloat(viewportHeight - nodeBRPos.Y), result.hovercard.right = parseFloat(viewportWidth - nodeBRPos.X), result.hovercard.top = parseFloat(nodeTLPos.Y), result.hovercard.left = parseFloat(nodeTLPos.X);
        else {
            buffer = 25;
            switch (result.quadrant) {
            case 1:
                (nodeBRPos.Y < 0 || nodeTLPos.X > viewportWidth) && (result.offScreen = !0);
                coordinates.Y < buffer && (result.inView = !1, result.offset.top = coordinates.Y - buffer);
                coordinates.X > viewportWidth - buffer && (result.inView = !1, result.offset.left = coordinates.X - viewportWidth + buffer);
                result.quadrantClass = "hoverCardQuadrant1";
                result.hovercard.bottom = "auto";
                result.hovercard.left = "auto";
                result.hovercard.top = parseFloat(nodeTLPos.Y);
                result.hovercard.right = parseFloat(viewportWidth - nodeBRPos.X);
                result.hovercard.origin = "top right";
                break;
            case 2:
                (nodeBRPos.Y < 0 || nodeBRPos.X < 0) && (result.offScreen = !0);
                coordinates.Y < buffer && (result.inView = !1, result.offset.top = coordinates.Y - buffer);
                coordinates.X - this.nodeWidth < buffer && (result.inView = !1, result.offset.left = coordinates.X - this.nodeWidth - buffer);
                result.quadrantClass = "hoverCardQuadrant2";
                result.hovercard.bottom = "auto";
                result.hovercard.left = parseFloat(nodeTLPos.X);
                result.hovercard.top = parseFloat(nodeTLPos.Y);
                result.hovercard.right = "auto";
                result.hovercard.origin = "top left";
                break;
            case 3:
                (nodeTLPos.Y > viewportHeight || nodeBRPos.X < 0) && (result.offScreen = !0);
                coordinates.Y + this.nodeHeight > viewportHeight - buffer && (result.inView = !1, result.offset.top = coordinates.Y + this.nodeHeight - viewportHeight + buffer);
                coordinates.X - this.nodeWidth < buffer && (result.inView = !1, result.offset.left = coordinates.X - this.nodeWidth - buffer);
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
                coordinates.Y + this.nodeHeight > viewportHeight - buffer && (result.inView = !1, result.offset.top = coordinates.Y + this.nodeHeight - viewportHeight + buffer);
                coordinates.X > viewportWidth - buffer && (result.inView = !1, result.offset.left = coordinates.X - viewportWidth + buffer);
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
$trees.hoverCardCreate = function (treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewliving, editPtUrlTemplate) {
    "undefined" == typeof $trees.hovercard && ($trees.hovercard = new $trees.HoverCardObject(treeId, hoverDivId, controlsDivId, focusPid, canEdit, focusUrl, profileUrl, pageStackArgs, searchUrl, hintUrl, addRelativeUrl, placesUrl, isUSSite, uploadPhotoUrl, editPhotoUrl, canContribute, canViewliving, editPtUrlTemplate))
};
$(function () {
    $(".pullToFullScreen").on("pointertouchmousedown", function () {
        $("body").hasClass("treeViewerAwesomeHoverCardActive") && $trees.hovercard.hideHover()
    });
    $(".hoverCard").on("pointertouchmousedown", function (e) {
        e.stopPropagation()
    });
    $(".hoverCardCloseButton").on("pointertouchmousedown", function (e) {
        e.stopPropagation();
        e.preventDefault()
    }).on("pointertouchmouseup", function (e) {
        e.stopPropagation();
        e.preventDefault();
        $trees.hovercard.hideHover()
    }).on("click", function (e) {
        e.stopPropagation();
        e.preventDefault()
    });
    $("#trGraph").on("pointertouchmousedown", ".node-bdy", function (e) {
        var $this, checkMove;
        e.preventDefault();
        $this = $(this);
        showHoverCard = showAddPerson = !1;
        $("body").addClass("moveGraphOrTriggerClick");
        $("body").hasClass("treeViewerAwesomeHoverCardActive") && (e.stopPropagation(), showHoverCard = showAddPerson = !0);
        $this.data("data-mousedownoffset", $this.offset().top + $this.offset().left);
        checkMove = setInterval(function () {
            $this.data("data-mousedownoffset") != $this.offset().top + $this.offset().left && ($("body").removeClass("moveGraphOrTriggerClick"), clearInterval(checkMove));
            ($("body").hasClass("treeViewerAwesomeHoverCardActive") || $("html").hasClass("modalOpen")) && ($("body").removeClass("moveGraphOrTriggerClick"), clearInterval(checkMove))
        }, 10)
    }).on("pointertouchmouseup", ".node-bdy", function () {
        var $this = $(this);
        $this.data("data-mouseupoffset", $this.offset().top + $this.offset().left);
        !$("body").hasClass("treeViewerAwesomeHoverCardActive") && $this.data("data-mouseupoffset") > $(this).data("data-mousedownoffset") - 25 && $this.data("data-mouseupoffset") < $(this).data("data-mousedownoffset") + 25 && (showHoverCard = showAddPerson = !0);
        $this.parent(".node").hasClass("add") ? showAddPerson === !1 ? ($this.data("data-onclick", $this.attr("onclick")), $this.attr("onclick", null), setTimeout(function () {
            $this.attr("onclick", $this.data("data-onclick"))
        }, 300)) : ($("body").hasClass("treeViewerAwesomeHoverCardActive") && $trees.hovercard.hideHover(), $this.trigger("click")) : $("body").hasClass("treeViewerAwesomeHoverCardActive") || showHoverCard !== !0 ? $("body").hasClass("treeViewerAwesomeHoverCardActive") && (skipHideHover = !0, $trees.hovercard.handleNodeMouseOver(this.parentNode)) : ($("body").removeClass("draggingTreeView"), $trees.hovercard.handleNodeMouseOver(this.parentNode), showHoverCard = !1)
    })
});
$trees.BreadcrumbObject = function (breadcrumbInfo, colorPref) {
    this.init(breadcrumbInfo, colorPref)
};
$trees.BreadcrumbObject.prototype = {
    breadcrumbList: null,
    overflowEl: null,
    resizeSet: !1,
    colorPreference: null,
    init: function (breadcrumbInfo, colorPref) {
        if (this.overflowEl = $("#bcoverflowList"), this.breadcrumbList = $.parseJSON(breadcrumbInfo), this.colorPreference = colorPref, this.breadcrumbList != null && !(this.breadcrumbList.length <= 1)) {
            $(window).on("resize", this, this.renderOnResize);
            this.render(!1)
        }
    },
    renderOnResize: function (e) {
        var brdcrmbs = e.data;
        brdcrmbs.resizeSet ? brdcrmbs.render(!0) : brdcrmbs.resizeSet || (brdcrmbs.resizeSet = !0)
    },
    render: function (onResize) {
        var $ovPopup, $bcParent;
        this.resizeSet = !1;
        $ovPopup = $("#bcoverflowList").hide();
        $bcParent = $("#bclist");
        $bcParent.children().each(function () {
            this.id != "bcoverflow" && $(this).remove()
        });
        var $ovParent = $("#bcovlist").empty(),
            bcWidth = 162,
            $bcRegion = $("#brdCrmbs");
        $bcRegion.length && onResize && $bcRegion.width() + $bcRegion.offset().left > $(window).width() && ($bcRegion = !1);
        var totalWidth = ($bcRegion.length ? $bcRegion.width() : $(window).width()) - 80,
            bcLeft = $bcRegion.length ? $bcRegion.offset().left : 50,
            $ovIndicator = $("#bcoverflow").removeClass("overflowActive").hide(),
            $html, $contentDiv, addToOverflowCount = -1,
            $firstChild = null,
            lastPosition = 0,
            listLength = this.breadcrumbList.length,
            $overflowList = $("<ul>"),
            colorPref = this.colorPreference;
        $.each(onResize ? this.breadcrumbList : this.breadcrumbList.reverse(), function (index) {
            var isFocus = index == 0 ? !0 : !1,
                genClass = this.g == "F" ? "Female" : this.g == "M" ? "Male" : "Person",
                $focusNode, focusNodeRight;
            $html = isFocus ? $('<div class="userCard userCardSize3" id="bcFocus"><div class="userCardImg userCardImgSquare icon icon' + genClass + '"><\/div><div class="userCardContent"><div class="userCardComment">' + this.n + "<\/div><\/div><\/div>") : $('<a class="userCard userCardSize3" href="javascript:try{$trees.treeMap.changeFocusPerson(' + this.p + ');}catch(e){}"><div class="userCardImg userCardImgSquare icon icon' + genClass + '"><\/div><div class="userCardContent"><div class="userCardComment' + colorPref + ' link">' + this.n + "<\/div><\/div><\/a>");
            $contentDiv = $("<li>").html($html);
            isFocus && $contentDiv.addClass("focus");
            $focusNode = $("#bcFocus");
            focusNodeRight = 0;
            $focusNode.length && (focusNodeRight = $focusNode.width() + $focusNode.offset().left, (focusNodeRight == lastPosition || focusNodeRight > bcLeft + totalWidth) && (focusNodeRight = index * bcWidth), lastPosition = $focusNode.width() + $focusNode.offset().left);
            addToOverflowCount == -1 && Math.floor((totalWidth - focusNodeRight) / bcWidth) <= 0 && (addToOverflowCount = 0);
            addToOverflowCount == -1 ? isFocus ? $bcParent.append($contentDiv) : $contentDiv.insertBefore($firstChild) : (addToOverflowCount == 0 && ($ovIndicator.css("display", "").addClass("overflowActive"), $firstChild.addClass("firstitem")), $overflowList.append($contentDiv));
            $firstChild = $contentDiv;
            addToOverflowCount >= 0 && ++addToOverflowCount
        });
        $ovIndicator.callout({
            content: $overflowList,
            calloutClasses: "breadcrumbCallout",
            classes: "calloutMenu",
            position: "top",
            onAfterOpen: function () {
                var calloutReposition = $(".tvFamily").css("padding-bottom");
                $(".callout").css({
                    "-webkit-transform": "translateY(" + calloutReposition + ")",
                    "-ms-transform": "translateY(" + calloutReposition + ")",
                    transform: "translateY(" + calloutReposition + ")"
                })
            }
        })
    },
    toggleOverflow: function () {},
    showOverflow: function () {},
    hideOverflow: function () {}
};
$trees.breadcrumbCreate = function (breadcrumbInfo, colorPref) {
    "undefined" == typeof $trees.breadcrumb && ($trees.breadcrumb = new $trees.BreadcrumbObject(breadcrumbInfo, colorPref))
};
$trees.EventFilter = function (eventObj, eventHandlerName, eventCheckName) {
    this.init(eventObj, eventHandlerName, eventCheckName)
};
$trees.EventFilterCount = $trees.EventFilter.prototype = {
    currentEvent: null,
    nextEvent: null,
    eventHandlerName: null,
    eventCheckName: null,
    eventObj: null,
    suppressMs: 30,
    suspendedCount: 0,
    processedCount: 0,
    init: function (eventObj, eventHandlerName, eventCheckName) {
        this.eventObj = eventObj;
        this.eventHandlerName = eventHandlerName;
        this.eventCheckName = eventCheckName;
        var self = this;
        this.doEvent = function () {
            this.currentEvent = this.nextEvent;
            this.nextEvent = null;
            var ret = this.eventObj[this.eventHandlerName](this.currentEvent);
            return this.processedCount++, setTimeout(function () {
                self.currentEvent = null
            }, this.suppressMs), ret
        }
    },
    handleEvent: function (e) {
        var thisObj = e && e.data || this,
            ret;
        return thisObj.eventCheckName && (ret = thisObj.eventObj[thisObj.eventCheckName](e), ret == !1) ? !1 : (thisObj.nextEvent = e, thisObj.currentEvent == null ? thisObj.doEvent() : (++thisObj.suspendedCount, e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1))
    }
};
$trees.LogObject = function (logUrl, logLevelToRecord) {
    this.init(logUrl, logLevelToRecord)
};
$trees.LogObject.prototype = {
    init: function (logUrl, logLevelToRecord) {
        this.LevelDebug = 5;
        this.LevelInfo = 4;
        this.LevelWarn = 3;
        this.LevelError = 2;
        this.LevelFatal = 1;
        this.LevelNames = ["", "Fatal", "Error", "Warn", "Info", "Debug"];
        this.logUrl = logUrl;
        this.logLevelToRecord = logLevelToRecord
    },
    debug: function (feature, message) {
        this.log(feature, message, this.LevelDebug)
    },
    info: function (feature, message) {
        this.log(feature, message, this.LevelInfo)
    },
    warn: function (feature, message) {
        this.log(feature, message, this.LevelWarn)
    },
    error: function (feature, message, err) {
        this.log(feature, message, this.LevelError, err)
    },
    fatal: function (feature, message, err) {
        this.log(feature, message, this.LevelFatal, err)
    },
    log: function (feature, message, logLevel, err) {
        var data;
        if (logLevel <= this.logLevelToRecord) {
            var logMessage = feature + " - " + message,
                lineNumber = 0,
                file = "";
            if (err && (logMessage += "\n \t\t", err.name && (logMessage += err.name + "\n"), err.responseText && (logMessage += "\nresponseText: " + err.responseText + "\n"), err.responseXml && (logMessage += "\nresponseXml: " + err.responseXml + "\n"), err.status && (logMessage += "\nstatus: " + err.status + "\n"), err.statusText && (logMessage += "\nstatusText: " + err.statusText + "\n"), err.message && (logMessage += "\nmessage: " + err.message + "\n"), err.stack && (logMessage += "stack: " + err.stack + "\n"), err.file && (file = err.file), err.lineNumber ? lineNumber = err.lineNumber : err.line ? lineNumber = err.line : err.number && (lineNumber = err.number)), this.logLevel === this.LevelDebug) switch (logLevel) {
            case this.LevelDebug:
                console.debug(logMessage);
                break;
            case this.LevelInfo:
                console.info(logMessage);
                break;
            case this.LevelWarn:
                console.warn(logMessage);
                break;
            case this.LevelError:
                err || console.error(logMessage);
                break;
            case this.LevelFatal:
                err || console.error(logMessage)
            }
            data = encodeURI("level=" + this.getLevelName(logLevel) + "&feature=" + feature + (err.status ? "&status=" + err.status : "") + (err.status ? "&statusText=" + err.statusText : "") + (err.responseText ? "&responseText=" + err.responseText : "") + (err.responseXml ? "&responseXml=" + err.responseXml : "") + (err.argument ? "&argument=" + err.argument : "") + (err.getAllResponseHeaders ? "&allResponseHeaders=" + err.getAllResponseHeaders : "") + (err.message ? "&errorMessage=" + err.message : "") + "&message=" + logMessage + "&url=" + window.location.href + "&file=" + file + "&line=" + lineNumber);
            YAHOO.util.Connect.asyncRequest("POST", this.logUrl, null, data)
        }
    },
    getLevelName: function (logLevel) {
        var levelName = "";
        return logLevel > 0 && logLevel < this.LevelNames.length && (levelName = this.LevelNames[logLevel]), levelName
    }
};
$trees.logCreate = function (logUrl, logLevelToRecord) {
    "undefined" == typeof $trees.log && ($trees.log = new $trees.LogObject(logUrl, logLevelToRecord))
};
typeof console == "undefined" && (console = {
    log: function () {},
    debug: function () {},
    info: function () {},
    warn: function () {},
    error: function () {}
});
$trees.HintsObject = function () {
    this.init()
};
$trees.HintsObject.prototype = {
    pidList: null,
    nodeIdList: null,
    retryPidList: null,
    retryNodeIdList: null,
    hintRequestInProgress: !1,
    curPid: "",
    curNodeIid: "",
    reRequestDelay: 2e3,
    init: function () {
        this.pidList = [];
        this.nodeIdList = [];
        this.retryPidList = [];
        this.retryNodeIdList = [];
        this.buildIdList()
    },
    buildIdList: function () {
        for (var i = 0, hintGenObj; i < 10;) {
            if (hintGenObj = document.getElementById("hintGen" + i), hintGenObj) this.addGraphIdList(i, hintGenObj);
            else break;
            i++
        }
    },
    addGraphIdList: function (graphId, hintGenObj) {
        var idListAttr, ids, j, pidNodeId;
        if (hintGenObj || (hintGenObj = document.getElementById("hintGen" + graphId)), hintGenObj && (idListAttr = hintGenObj.getAttribute("T:IdList"), idListAttr !== null && idListAttr.length > 0))
            for (ids = idListAttr.split(","), j = 0; j < ids.length; j++) pidNodeId = ids[j].split("|"), this.nodeIdList.push(pidNodeId[0]), this.pidList.push(pidNodeId[1])
    },
    initiateHintRequest: function () {
        var pid, nodeId, node, url;
        $trees.hints.hintRequestInProgress || ($trees.hints.pidList.length > 0 ? (pid = $trees.hints.pidList.shift(), nodeId = $trees.hints.nodeIdList.shift(), pid && pid.length > 0 && nodeId && nodeId.length > 0 && (node = document.getElementById(nodeId), node && (url = node.getAttribute("T:HintUrl"), url && url.length > 0 && ($trees.hints.hintRequestInProgress = !0, $trees.hints.curPid = pid, $trees.hints.curNodeId = nodeId, url += "&nodeid=" + nodeId, $trees.hints.showSearchingIcon(nodeId, node), YAHOO.util.Connect.asyncRequest("GET", url, $trees.hints.hintGenerationCallback)))), $trees.hints.hintRequestInProgress || $trees.hints.initiateHintRequest()) : $trees.hints.retryPidList.length > 0 && ($trees.hints.pidList = $trees.hints.retryPidList, $trees.hints.nodeIdList = $trees.hints.retryNodeIdList, $trees.hints.retryPidList = [], $trees.hints.retryNodeIdList = [], setTimeout($trees.hints.initiateHintRequest, $trees.hints.reRequestDelay), $trees.hints.reRequestDelay = $trees.hints.reRequestDelay * 3))
    },
    showSearchingIcon: function (nodeId, node) {
        if (node || (node = document.getElementById(nodeId)), node) {
            var className = node.className;
            className = className.indexOf("hint") != -1 ? className.replace("hint", "nodeSearching") : className + " nodeSearching";
            node.className = className
        }
    },
    hideHintIcon: function (nodeId, node) {
        if (node || (node = document.getElementById(nodeId)), node) {
            var className = node.className;
            className = className.indexOf("nodeSearching") != -1 ? className.replace("nodeSearching", "") : className.replace("hint", "");
            node.className = className
        }
    },
    showHintIcon: function (nodeId, node) {
        if (node || (node = document.getElementById(nodeId)), node) {
            var className = node.className;
            className = className.indexOf("nodeSearching") != -1 ? className.replace("nodeSearching", "hint") : className + " hint";
            node.className = className
        }
    },
    hintGenerationCallback: {
        success: function (o) {
            $trees.hints.hintRequestInProgress = !1;
            var hints = {
                showHintIcon: !1,
                pid: 0,
                nodeId: "",
                node: null,
                hintsInProgress: !1
            };
            o.responseXML && o.responseXML.documentElement ? this.HandleXmlResponse(o, hints) : this.HandleJsonResponse(o, hints);
            hints.showHintIcon ? $trees.hints.showHintIcon(hints.nodeId, hints.node) : $trees.hints.hideHintIcon(hints.nodeId, hints.node);
            $trees.hints.hintGenerationComplete(hints.nodeId, hints.pid, hints.showHintIcon);
            hints.hintsInProgress && ($trees.hints.retryPidList.push(hints.pid), $trees.hints.retryNodeIdList.push(hints.nodeId));
            $trees.hints.initiateHintRequest()
        },
        HandleXmlResponse: function (o, hints) {
            var res = o.responseXML.documentElement,
                obj, str, personaCount, recordCount, objectCount, pendingHints;
            res && (obj = res.getElementsByTagName("personaCount")[0], obj && (str = obj.firstChild.data, personaCount = parseInt(str, 10), obj = res.getElementsByTagName("pid")[0], obj && (hints.pid = parseInt(obj.firstChild.data, 10), obj = res.getElementsByTagName("nodeid")[0], obj && (hints.nodeId = obj.firstChild.data, obj = res.getElementsByTagName("recordCount")[0], obj && (str = obj.firstChild.data, recordCount = parseInt(str, 10), obj = res.getElementsByTagName("objectCount")[0], obj && (str = obj.firstChild.data, objectCount = parseInt(str, 10), obj = res.getElementsByTagName("HintsInProgress")[0], obj && (hints.nodeId = obj.firstChild.data, pendingHints = personaCount + recordCount + objectCount, pendingHints > 0 && (hints.showHintIcon = !0), hints.node = document.getElementById(hints.nodeId), hints.node && hints.node.setAttribute("T:Hints", pendingHints))))))))
        },
        HandleJsonResponse: function (o, hints) {
            var res = eval("(" + o.responseText + ")"),
                personaCount, facebookCount;
            if (res) {
                personaCount = res.PersonHintCount;
                facebookCount = res.FacebookHintCount;
                hints.nodeId = res.NodeId;
                hints.pid = res.PersonId;
                var recordCount = res.RecordHintCount,
                    objectCount = res.ObjectHintCount,
                    pendingHints = res.PendingHintCount;
                hints.hintsInProgress = res.HintsInProgress && personaCount === 0 && facebookCount === 0 && objectCount === 0 && recordCount === 0;
                pendingHints > 0 && (hints.showHintIcon = !0);
                hints.node = document.getElementById(hints.nodeId);
                hints.node && hints.node.setAttribute("T:Hints", pendingHints)
            }
        },
        failure: function () {
            var showIcon, hintVal, hintCount;
            if ($trees.hints.hintRequestInProgress = !1, pid = $trees.hints.curPid, nodeId = $trees.hints.curNodeId, node = document.getElementById(nodeId), node) {
                if (showIcon = !1, hintVal = node.getAttribute("T:Hints"), hintVal && hintVal.length > 0) try {
                    hintCount = parseInt(hintVal, 10);
                    hintCount > 0 && (showIcon = !0)
                } catch (ex) {}
                showIcon ? $trees.hints.showHintIcon(nodeId) : $trees.hints.hideHintIcon(nodeId);
                $trees.hints.hintGenerationComplete(nodeId, pid, showIcon)
            }
            $trees.hints.initiateHintRequest()
        },
        timeout: 4e4,
        scope: $trees.hints
    },
    hintGenerationComplete: function (nodeId, pid, showHintIcon) {
        if (!$trees.hints.hasViewedBing && showHintIcon && typeof $trees.initFirstHintBing == "function") {
            $trees.hints.hasViewedBing = !0;
            var nodeIdArray = [nodeId, pid];
            $trees.treeMap.panEvent.subscribe($trees.hints.showHintBing, nodeIdArray);
            $trees.treeMap.showNodeFocusAnim(nodeIdArray)
        }
    },
    showHintBing: function (type, args, nodeIdArray) {
        $trees.treeMap.panEvent.unsubscribe($trees.showHintBing, nodeIdArray);
        var url = "/SetUserFlags.ashx?uid=" + v_uid + "&tid=" + v_treeId + "&flag=" + $trees.hints.bingUserFlag,
            doNothing = function () {};
        YAHOO.util.Connect.asyncRequest("GET", url, {
            success: doNothing,
            failure: doNothing
        });
        url = "/tree/" + v_treeId + "/firsthintbingstate/true";
        YAHOO.util.Connect.asyncRequest("GET", url, {
            success: doNothing,
            failure: doNothing
        });
        $trees.initFirstHintBing(nodeIdArray[0], nodeIdArray[1])
    }
};
$trees.hintsCreate = function (hasViewedBing, bingUserFlag, firstHintNodeId, firstHintPersonId) {
    if ("undefined" == typeof $trees.hints && ($trees.hints = new $trees.HintsObject), $trees.hints.hasViewedBing = hasViewedBing, $trees.hints.bingUserFlag = bingUserFlag, !hasViewedBing && firstHintNodeId.length > 0) {
        $trees.hints.hasViewedBing = !0;
        var nodeIdArray = [firstHintNodeId, firstHintPersonId];
        $trees.hints.showHintBing("", "", nodeIdArray)
    }
};
$trees.initFirstFTMSyncBing = function () {
    var docHeight = YAHOO.util.Dom.getViewportHeight(),
        docWidth = YAHOO.util.Dom.getViewportWidth(),
        globalWrapper = document.body,
        ftmsCtr = document.getElementById("ftmsCtr"),
        modalBkg = document.createElement("div");
    modalBkg.setAttribute("id", "ftmsModalBkg");
    modalBkg.className = "ftmSyncModalBkg";
    document.body.appendChild(modalBkg);
    document.body.appendChild(ftmsCtr);
    ftmsCtr.style.left = docWidth / 2 - 300 + "px";
    ftmsCtr.style.top = docHeight / 2 - 200 + "px";
    ftmsCtr.style.display = "";
    s = s_gi(s_account);
    s.pageName = "PT:Tree:Pedigree:FTMS";
    s_pageName = s.pageName;
    s.t()
};
$trees.hideFirstFTMSyncBing = function () {
    document.getElementById("ftmsCtr").style.display = "none";
    document.getElementById("ftmsModalBkg").style.display = "none";
    $trees.hints.initiateHintRequest()
};
$trees.ftmsCreate = function (hasViewedBing, viewBing) {
    typeof viewBing != "undefined" && typeof hasViewedBing != "undefined" && (viewBing === !0 && hasViewedBing === !1 ? $trees.initFirstFTMSyncBing() : $trees.hints.initiateHintRequest())
};
$trees.ThumbnailNavigator = function () {
    this.init()
};
$trees.ThumbnailNavigator.prototype = {
    paddingX: 0,
    paddingY: 0,
    viewPortDiv: null,
    dragInProgress: !1,
    dragFilter: null,
    viewportPosTL: null,
    viewportPosBR: null,
    dragViewportPosTL: null,
    thumbnailContainerRect: null,
    thumbnailContainer: null,
    canvasX: 0,
    canvasY: 0,
    pixelsPerEm: 0,
    scaleFactor: 0,
    init: function () {
        if (this.thumbnailContainer = $("#ThumbnailNavCont"), this.thumbnailContainer.length) {
            var thumbnailPaddingX = "0",
                thumbnailPaddingY = "0",
                pixels = "0",
                scale = "0",
                thumbnailInfo = $("#thumbnailInfo");
            thumbnailInfo.length && (thumbnailPaddingX = thumbnailInfo.attr("t:paddingx"), thumbnailPaddingY = thumbnailInfo.attr("t:paddingy"), pixels = thumbnailInfo.attr("t:pixelsperem"), scale = thumbnailInfo.attr("t:scalefactor"));
            this.paddingX = parseFloat(thumbnailPaddingX);
            this.paddingY = parseFloat(thumbnailPaddingY);
            this.pixelsPerEm = $trees.treeMap.scaleFactor;
            this.scaleFactor = parseFloat(scale);
            this.thumbnailContainerRect = {
                left: this.thumbnailContainer.offset().left,
                right: this.thumbnailContainer.offset().left + parseInt(this.thumbnailContainer.css("width")),
                top: this.thumbnailContainer.offset().top,
                bottom: this.thumbnailContainer.offset().top + parseInt(this.thumbnailContainer.css("height"))
            };
            this.canvasX = this.thumbnailContainerRect.left;
            this.canvasY = this.thumbnailContainerRect.top;
            $trees.treeMap.zoomEvent.subscribe(this.handleZoomEvent, this, !0);
            $trees.treeMap.panEvent.subscribe(this.handlePanEvent, this, !0);
            this.viewPortDiv = $("#ThumbnailViewPort");
            this.thumbnailContainer.on("pointertouchmousedown", this, this.handleMouseDown);
            $(window).on("resize", this, this.handleResizeEvent);
            setTimeout("$trees.thumbNav.load()", 1e3)
        }
    },
    load: function () {
        this.buildTinyObjects();
        this.drawViewportRectangle()
    },
    buildTinyObjects: function () {
        var thumbContainer = this.thumbnailContainer,
            nodes = $(".trGraph div.node"),
            nodeBin = $("<div>"),
            pad = {
                x: this.paddingX,
                y: this.paddingY
            };
        nodes.each(function () {
            var current = $(this),
                tinyNode;
            current.css("top") && current.css("left") && (tinyNode = $("<div>").addClass("thumbNode"), current.hasClass("female") ? tinyNode.addClass("female") : current.hasClass("male") ? tinyNode.addClass("male") : tinyNode.addClass("unknown"), current.hasClass("focus") && tinyNode.addClass("focus"), tinyNode.css({
                left: (parseFloat(this.style.left) + pad.x).toFixed(4) + "em",
                top: (parseFloat(this.style.top) + pad.y).toFixed(4) + "em"
            }).appendTo(nodeBin))
        });
        thumbContainer.append(nodeBin)
    },
    drawViewportRectangle: function () {
        this.viewPortDiv.length && $trees.treeMap && (this.viewportPosTL = $trees.treeMap.translateToCanvasCoordinates(0, 0), this.viewportPosBR = $trees.treeMap.translateToCanvasCoordinates($trees.treeMap.viewportWidth, $trees.treeMap.viewportHeight), this.viewPortDiv.css({
            top: (this.viewportPosTL.y + this.paddingY).toFixed(5) + "em",
            left: (this.viewportPosTL.x + this.paddingX).toFixed(5) + "em",
            width: (this.viewportPosBR.x - this.viewportPosTL.x).toFixed(5) + "em",
            height: (this.viewportPosBR.y - this.viewportPosTL.y).toFixed(5) + "em",
            display: ""
        }))
    },
    startDragViewportRect: function (e) {
        if (e.target) {
            this.startDragPosition = this.getThumbnailMousePosition(e);
            this.startDragTopLeft = {
                top: this.viewportPosTL.y + this.paddingY,
                left: this.viewportPosTL.x + this.paddingX
            };
            this.dragViewportPosTL = {
                top: this.startDragTopLeft.top,
                left: this.startDragTopLeft.left
            };
            this.dragFilter = new $trees.EventFilter(this, "dragViewportRect", "checkDragViewportRect");
            $(document).on("pointertouchmousemove.thmbnv", this.dragFilter, this.dragFilter.handleEvent).on("pointertouchmouseup.thmbnv", this, this.endDragViewportRect);
            var thumbnav = e && e.data || this;
            return thumbnav.viewPortDiv.hasClass("openhand") && thumbnav.viewPortDiv.removeClass("openhand").addClass("closehand").closest(".trVp").addClass("closedhand"), this.dragInProgress = !0, e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }
    },
    endDragViewportRect: function (e) {
        var thumbnav = e && e.data || this;
        return thumbnav.dragInProgress = !1, $trees.treeMap.updatePan(), $(document).off("pointertouchmousemove.thmbnv pointertouchmouseup.thmbnv"), thumbnav.startDragPosition = null, thumbnav.dragFilter = null, thumbnav.viewPortDiv.hasClass("closehand") && thumbnav.viewPortDiv.removeClass("closehand").addClass("openhand").closest(".trVp").removeClass("closedhand"), thumbnav.viewportPosTL.y = thumbnav.dragViewportPosTL.top - thumbnav.paddingY, thumbnav.viewportPosTL.x = thumbnav.dragViewportPosTL.left - thumbnav.paddingX, e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
    },
    dragViewportRect: function (e) {
        if (this.dragInProgress) {
            var viewportPosition = this.getThumbnailMousePosition(e);
            if (this.isMouseWithinThumbnail(e)) return this.setThumbnailViewportPosition(viewportPosition), this.setViewportPosition(viewportPosition), e.preventDefault ? e.preventDefault() : e.returnValue = !1, !1
        }
        return !1
    },
    checkDragViewportRect: function (e) {
        if (this.dragInProgress) {
            if (e.target != null && e.target.id == "Content-2") return this.endDragViewportRect(e)
        } else return
    },
    repositionViewportRect: function (e) {
        var thumbnav = e && e.data || this,
            mousePos = thumbnav.getThumbnailMousePosition(e),
            viewPortRect = thumbnav.viewPortDiv.offset(),
            leftTop = thumbnav.translateToThumbnailPosition(viewPortRect.left, viewPortRect.top),
            rightBottom = thumbnav.translateToThumbnailPosition(viewPortRect.left + parseInt(thumbnav.viewPortDiv.css("width")), viewPortRect.top + parseInt(thumbnav.viewPortDiv.css("height"))),
            width = rightBottom.x - leftTop.x,
            height = rightBottom.y - leftTop.y,
            deltaX = leftTop.x + width / 2 - mousePos.x,
            deltaY = leftTop.y + height / 2 - mousePos.y,
            left = thumbnav.translateThumbnailToEms(deltaX) - thumbnav.translateThumbnailToEms(leftTop.x) + thumbnav.paddingX,
            top = thumbnav.translateThumbnailToEms(deltaY) - thumbnav.translateThumbnailToEms(leftTop.y) + thumbnav.paddingY;
        $trees.treeMap.setPosition(left, top, !0);
        this.drawViewportRectangle()
    },
    getThumbnailMousePosition: function (e) {
        var absPos = this.getMousePosition(e),
            X = absPos.x - this.canvasX,
            Y = absPos.y - this.canvasY;
        return {
            x: X,
            y: Y
        }
    },
    getMousePosition: function (e) {
        return {
            x: e.pageX,
            y: e.pageY
        }
    },
    translateToThumbnailPosition: function (x, y) {
        var X = x - this.canvasX,
            Y = y - this.canvasY;
        return {
            x: X,
            y: Y
        }
    },
    translateThumbnailToEms: function (pos) {
        return pos / this.scaleFactor / this.pixelsPerEm
    },
    isMouseWithinThumbnail: function (e) {
        var mousePos = this.getMousePosition(e);
        return mousePos.x >= this.thumbnailContainerRect.left && mousePos.x <= this.thumbnailContainerRect.right && mousePos.y >= this.thumbnailContainerRect.top && mousePos.y <= this.thumbnailContainerRect.bottom ? !0 : !1
    },
    isMouseDownInViewport: function (e) {
        var thumbnav = e && e.data || this,
            mousePos = thumbnav.getThumbnailMousePosition(e),
            viewPortRect = {
                left: thumbnav.viewPortDiv.offset().left,
                right: thumbnav.viewPortDiv.offset().left + parseInt(thumbnav.viewPortDiv.css("width")),
                top: thumbnav.viewPortDiv.offset().top,
                bottom: thumbnav.viewPortDiv.offset().top + parseInt(thumbnav.viewPortDiv.css("height"))
            },
            leftTop = thumbnav.translateToThumbnailPosition(viewPortRect.left, viewPortRect.top),
            rightBottom = thumbnav.translateToThumbnailPosition(viewPortRect.right, viewPortRect.bottom);
        return mousePos.x >= leftTop.x && mousePos.x <= rightBottom.x && mousePos.y >= leftTop.y && mousePos.y <= rightBottom.y ? !0 : !1
    },
    setThumbnailViewportPosition: function (viewportPosition) {
        var left = this.translateThumbnailToEms(viewportPosition.x - this.startDragPosition.x) + this.startDragTopLeft.left,
            top = this.translateThumbnailToEms(viewportPosition.y - this.startDragPosition.y) + this.startDragTopLeft.top;
        this.dragViewportPosTL = {
            top: top,
            left: left
        };
        this.viewPortDiv.css({
            left: left.toFixed(5) + "em",
            top: top.toFixed(5) + "em"
        })
    },
    setViewportPosition: function (viewportPosition) {
        var left = this.translateThumbnailToEms(this.startDragPosition.x - viewportPosition.x) - this.startDragTopLeft.left + this.paddingX,
            top = this.translateThumbnailToEms(this.startDragPosition.y - viewportPosition.y) - this.startDragTopLeft.top + this.paddingY;
        $trees.treeMap.setPosition(left, top, !1)
    },
    handlePanEvent: function () {
        this.drawViewportRectangle()
    },
    handleZoomEvent: function () {
        this.drawViewportRectangle()
    },
    handleResizeEvent: function (e) {
        var thumbnav = e && e.data || this;
        thumbnav.drawViewportRectangle();
        thumbnav.thumbnailContainerRect = {
            left: thumbnav.thumbnailContainer.offset().left,
            right: thumbnav.thumbnailContainer.offset().left + parseInt(thumbnav.thumbnailContainer.css("width")),
            top: thumbnav.thumbnailContainer.offset().top,
            bottom: thumbnav.thumbnailContainer.offset().top + parseInt(thumbnav.thumbnailContainer.css("height"))
        };
        thumbnav.canvasX = thumbnav.thumbnailContainerRect.left;
        thumbnav.canvasY = thumbnav.thumbnailContainerRect.top
    },
    handleMouseDown: function (e) {
        var thumbnav = e && e.data || this;
        thumbnav.isMouseDownInViewport(e) ? thumbnav.startDragViewportRect(e) : thumbnav.repositionViewportRect(e)
    }
};
$trees.thumbnailNavigatorCreate = function () {
    "undefined" == typeof $trees.thumbNav && ($trees.thumbNav = new $trees.ThumbnailNavigator)
};
/*! Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 * 
 * Requires: 1.2.2+
 */
(function ($) {
    function handler(event) {
        var orgEvent = event || window.event,
            args = [].slice.call(arguments, 1),
            delta = 0,
            deltaX = 0,
            deltaY = 0;
        return event = $.event.fix(orgEvent), event.type = "mousewheel", orgEvent.wheelDelta && (delta = orgEvent.wheelDelta / 120), orgEvent.detail && (delta = -orgEvent.detail / 3), deltaY = delta, orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS && (deltaY = 0, deltaX = -1 * delta), orgEvent.wheelDeltaY !== undefined && (deltaY = orgEvent.wheelDeltaY / 120), orgEvent.wheelDeltaX !== undefined && (deltaX = orgEvent.wheelDeltaX / -120), args.unshift(event, delta, deltaX, deltaY), ($.event.dispatch || $.event.handle).apply(this, args)
    }
    var types = ["DOMMouseScroll", "mousewheel"],
        i;
    if ($.event.fixHooks)
        for (i = types.length; i;) $.event.fixHooks[types[--i]] = $.event.mouseHooks;
    $.event.special.mousewheel = {
        setup: function () {
            if (this.addEventListener)
                for (var i = types.length; i;) this.addEventListener(types[--i], handler, !1);
            else this.onmousewheel = handler
        },
        teardown: function () {
            if (this.removeEventListener)
                for (var i = types.length; i;) this.removeEventListener(types[--i], handler, !1);
            else this.onmousewheel = null
        }
    };
    $.fn.extend({
        mousewheel: function (fn) {
            return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel")
        },
        unmousewheel: function (fn) {
            return this.unbind("mousewheel", fn)
        }
    })
})(jQuery);
(function (b, a, c) {
    b.fn.jScrollPane = function (e) {
        function d(D, O) {
            function ar(aQ) {
                var aL, aN, aM, aJ, aI, aP, aO = !1,
                    aK = !1;
                if (ay = aQ, Y === c) aI = D.scrollTop(), aP = D.scrollLeft(), D.css({
                    overflow: "hidden",
                    padding: 0
                }), aj = D.innerWidth() + f, v = D.innerHeight(), D.width(aj), Y = b('<div class="jspPane" />').css("padding", aH).append(D.children()), al = b('<div class="jspContainer" />').css({
                    width: aj + "px",
                    height: v + "px"
                }).append(Y).appendTo(D);
                else {
                    if (D.css("width", ""), aO = ay.stickToBottom && K(), aK = ay.stickToRight && B(), aJ = D.innerWidth() + f != aj || D.outerHeight() != v, aJ && (aj = D.innerWidth() + f, v = D.innerHeight(), al.css({
                            width: aj + "px",
                            height: v + "px"
                        })), !aJ && L == T && Y.outerHeight() == Z) {
                        D.width(aj);
                        return
                    }
                    L = T;
                    Y.css("width", "");
                    D.width(aj);
                    al.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()
                }
                Y.css("overflow", "auto");
                T = aQ.contentWidth ? aQ.contentWidth : Y[0].scrollWidth;
                Z = Y[0].scrollHeight;
                Y.css("overflow", "");
                y = T / aj;
                q = Z / v;
                az = q > 1;
                aE = y > 1;
                aE || az ? (D.addClass("jspScrollable"), aL = ay.maintainPosition && (I || aa), aL && (aN = aC(), aM = aA()), aF(), z(), F(), aL && (N(aK ? T - aj : aN, !1), M(aO ? Z - v : aM, !1)), J(), ag(), an(), ay.enableKeyboardNavigation && S(), ay.clickOnTrack && p(), C(), ay.hijackInternalLinks && m()) : (D.removeClass("jspScrollable"), Y.css({
                    top: 0,
                    width: al.width() - f
                }), n(), E(), R(), w());
                ay.autoReinitialise && !av ? av = setInterval(function () {
                    ar(ay)
                }, ay.autoReinitialiseDelay) : !ay.autoReinitialise && av && clearInterval(av);
                aI && D.scrollTop(0) && M(aI, !1);
                aP && D.scrollLeft(0) && N(aP, !1);
                D.trigger("jsp-initialised", [aE || az])
            }

            function aF() {
                az && (al.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'), b('<div class="jspDragBottom" />'))), b('<div class="jspCap jspCapBottom" />'))), U = al.find(">.jspVerticalBar"), ap = U.find(">.jspTrack"), au = ap.find(">.jspDrag"), ay.showArrows && (aq = b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp", aD(0, -1)).bind("click.jsp", aB), af = b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp", aD(0, 1)).bind("click.jsp", aB), ay.arrowScrollOnHover && (aq.bind("mouseover.jsp", aD(0, -1, aq)), af.bind("mouseover.jsp", aD(0, 1, af))), ak(ap, ay.verticalArrowPositions, aq, af)), t = v, al.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function () {
                    t -= b(this).outerHeight()
                }), au.hover(function () {
                    au.addClass("jspHover")
                }, function () {
                    au.removeClass("jspHover")
                }).bind("mousedown.jsp", function (aI) {
                    b("html").bind("dragstart.jsp selectstart.jsp", aB);
                    au.addClass("jspActive");
                    var s = aI.pageY - au.position().top;
                    return b("html").bind("mousemove.jsp", function (aJ) {
                        V(aJ.pageY - s, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", aw), !1
                }), o())
            }

            function o() {
                ap.height(t + "px");
                I = 0;
                X = ay.verticalGutter + ap.outerWidth();
                Y.width(aj - X - f);
                try {
                    U.position().left === 0 && Y.css("margin-left", X + "px")
                } catch (s) {}
            }

            function z() {
                aE && (al.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'), b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'), b('<div class="jspDragRight" />'))), b('<div class="jspCap jspCapRight" />'))), am = al.find(">.jspHorizontalBar"), G = am.find(">.jspTrack"), h = G.find(">.jspDrag"), ay.showArrows && (ax = b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp", aD(-1, 0)).bind("click.jsp", aB), x = b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp", aD(1, 0)).bind("click.jsp", aB), ay.arrowScrollOnHover && (ax.bind("mouseover.jsp", aD(-1, 0, ax)), x.bind("mouseover.jsp", aD(1, 0, x))), ak(G, ay.horizontalArrowPositions, ax, x)), h.hover(function () {
                    h.addClass("jspHover")
                }, function () {
                    h.removeClass("jspHover")
                }).bind("mousedown.jsp", function (aI) {
                    b("html").bind("dragstart.jsp selectstart.jsp", aB);
                    h.addClass("jspActive");
                    var s = aI.pageX - h.position().left;
                    return b("html").bind("mousemove.jsp", function (aJ) {
                        W(aJ.pageX - s, !1)
                    }).bind("mouseup.jsp mouseleave.jsp", aw), !1
                }), l = al.innerWidth(), ah())
            }

            function ah() {
                al.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function () {
                    l -= b(this).outerWidth()
                });
                G.width(l + "px");
                aa = 0
            }

            function F() {
                if (aE && az) {
                    var aI = G.outerHeight(),
                        s = ap.outerWidth();
                    t -= aI;
                    b(am).find(">.jspCap:visible,>.jspArrow").each(function () {
                        l += b(this).outerWidth()
                    });
                    l -= s;
                    v -= s;
                    aj -= aI;
                    G.parent().append(b('<div class="jspCorner" />').css("width", aI + "px"));
                    o();
                    ah()
                }
                aE && Y.width(al.outerWidth() - f + "px");
                Z = Y.outerHeight();
                q = Z / v;
                aE && (at = Math.ceil(1 / y * l), at > ay.horizontalDragMaxWidth ? at = ay.horizontalDragMaxWidth : at < ay.horizontalDragMinWidth && (at = ay.horizontalDragMinWidth), h.width(at + "px"), j = l - at, ae(aa));
                az && (A = Math.ceil(1 / q * t), A > ay.verticalDragMaxHeight ? A = ay.verticalDragMaxHeight : A < ay.verticalDragMinHeight && (A = ay.verticalDragMinHeight), au.height(A + "px"), i = t - A, ad(I))
            }

            function ak(aJ, aL, aI, s) {
                var aN = "before",
                    aK = "after",
                    aM;
                aL == "os" && (aL = /Mac/.test(navigator.platform) ? "after" : "split");
                aL == aN ? aK = aL : aL == aK && (aN = aL, aM = aI, aI = s, s = aM);
                aJ[aN](aI)[aK](s)
            }

            function aD(aI, s, aJ) {
                return function () {
                    return H(aI, s, this, aJ), this.blur(), !1
                }
            }

            function H(aL, aK, aO, aN) {
                aO = b(aO).addClass("jspActive");
                var aM, aJ, aI = !0,
                    s = function () {
                        aL !== 0 && Q.scrollByX(aL * ay.arrowButtonSpeed);
                        aK !== 0 && Q.scrollByY(aK * ay.arrowButtonSpeed);
                        aJ = setTimeout(s, aI ? ay.initialDelay : ay.arrowRepeatFreq);
                        aI = !1
                    };
                s();
                aM = aN ? "mouseout.jsp" : "mouseup.jsp";
                aN = aN || b("html");
                aN.bind(aM, function () {
                    aO.removeClass("jspActive");
                    aJ && clearTimeout(aJ);
                    aJ = null;
                    aN.unbind(aM)
                })
            }

            function p() {
                w();
                az && ap.bind("mousedown.jsp", function (aN) {
                    if (aN.originalTarget === c || aN.originalTarget == aN.currentTarget) {
                        var aL = b(this),
                            aO = aL.offset(),
                            aM = aN.pageY - aO.top - I,
                            aJ, aI = !0,
                            s = function () {
                                var aR = aL.offset(),
                                    aS = aN.pageY - aR.top - A / 2,
                                    aP = v * ay.scrollPagePercent,
                                    aQ = i * aP / (Z - v);
                                if (aM < 0) I - aQ > aS ? Q.scrollByY(-aP) : V(aS);
                                else if (aM > 0) I + aQ < aS ? Q.scrollByY(aP) : V(aS);
                                else {
                                    aK();
                                    return
                                }
                                aJ = setTimeout(s, aI ? ay.initialDelay : ay.trackClickRepeatFreq);
                                aI = !1
                            },
                            aK = function () {
                                aJ && clearTimeout(aJ);
                                aJ = null;
                                b(document).unbind("mouseup.jsp", aK)
                            };
                        return s(), b(document).bind("mouseup.jsp", aK), !1
                    }
                });
                aE && G.bind("mousedown.jsp", function (aN) {
                    if (aN.originalTarget === c || aN.originalTarget == aN.currentTarget) {
                        var aL = b(this),
                            aO = aL.offset(),
                            aM = aN.pageX - aO.left - aa,
                            aJ, aI = !0,
                            s = function () {
                                var aR = aL.offset(),
                                    aS = aN.pageX - aR.left - at / 2,
                                    aP = aj * ay.scrollPagePercent,
                                    aQ = j * aP / (T - aj);
                                if (aM < 0) aa - aQ > aS ? Q.scrollByX(-aP) : W(aS);
                                else if (aM > 0) aa + aQ < aS ? Q.scrollByX(aP) : W(aS);
                                else {
                                    aK();
                                    return
                                }
                                aJ = setTimeout(s, aI ? ay.initialDelay : ay.trackClickRepeatFreq);
                                aI = !1
                            },
                            aK = function () {
                                aJ && clearTimeout(aJ);
                                aJ = null;
                                b(document).unbind("mouseup.jsp", aK)
                            };
                        return s(), b(document).bind("mouseup.jsp", aK), !1
                    }
                })
            }

            function w() {
                G && G.unbind("mousedown.jsp");
                ap && ap.unbind("mousedown.jsp")
            }

            function aw() {
                b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");
                au && au.removeClass("jspActive");
                h && h.removeClass("jspActive")
            }

            function V(s, aI) {
                az && (s < 0 ? s = 0 : s > i && (s = i), aI === c && (aI = ay.animateScroll), aI ? Q.animate(au, "top", s, ad) : (au.css("top", s), ad(s)))
            }

            function ad(aI) {
                aI === c && (aI = au.position().top);
                al.scrollTop(0);
                I = aI;
                var aL = I === 0,
                    aJ = I == i,
                    aK = aI / i,
                    s = -aK * (Z - v);
                (ai != aL || aG != aJ) && (ai = aL, aG = aJ, D.trigger("jsp-arrow-change", [ai, aG, P, k]));
                u(aL, aJ);
                Y.css("top", s);
                D.trigger("jsp-scroll-y", [-s, aL, aJ]).trigger("scroll")
            }

            function W(aI, s) {
                aE && (aI < 0 ? aI = 0 : aI > j && (aI = j), s === c && (s = ay.animateScroll), s ? Q.animate(h, "left", aI, ae) : (h.css("left", aI), ae(aI)))
            }

            function ae(aI) {
                aI === c && (aI = h.position().left);
                al.scrollTop(0);
                aa = aI;
                var aL = aa === 0,
                    aK = aa == j,
                    aJ = aI / j,
                    s = -aJ * (T - aj);
                (P != aL || k != aK) && (P = aL, k = aK, D.trigger("jsp-arrow-change", [ai, aG, P, k]));
                r(aL, aK);
                Y.css("left", s);
                D.trigger("jsp-scroll-x", [-s, aL, aK]).trigger("scroll")
            }

            function u(aI, s) {
                ay.showArrows && (aq[aI ? "addClass" : "removeClass"]("jspDisabled"), af[s ? "addClass" : "removeClass"]("jspDisabled"))
            }

            function r(aI, s) {
                ay.showArrows && (ax[aI ? "addClass" : "removeClass"]("jspDisabled"), x[s ? "addClass" : "removeClass"]("jspDisabled"))
            }

            function M(s, aI) {
                var aJ = s / (Z - v);
                V(aJ * i, aI)
            }

            function N(aI, s) {
                var aJ = aI / (T - aj);
                W(aJ * j, s)
            }

            function ab(aV, aQ, aJ) {
                var aN, aK, aL, s = 0,
                    aU = 0,
                    aI, aP, aO, aS, aR, aT;
                try {
                    aN = b(aV)
                } catch (aM) {
                    return
                }
                for (aK = aN.outerHeight(), aL = aN.outerWidth(), al.scrollTop(0), al.scrollLeft(0); !aN.is(".jspPane");)
                    if (s += aN.position().top, aU += aN.position().left, aN = aN.offsetParent(), /^body|html$/i.test(aN[0].nodeName)) return;
                aI = aA();
                aO = aI + v;
                s < aI || aQ ? aR = s - ay.verticalGutter : s + aK > aO && (aR = s - v + aK + ay.verticalGutter);
                aR && M(aR, aJ);
                aP = aC();
                aS = aP + aj;
                aU < aP || aQ ? aT = aU - ay.horizontalGutter : aU + aL > aS && (aT = aU - aj + aL + ay.horizontalGutter);
                aT && N(aT, aJ)
            }

            function aC() {
                return -Y.position().left
            }

            function aA() {
                return -Y.position().top
            }

            function K() {
                var s = Z - v;
                return s > 20 && s - aA() < 10
            }

            function B() {
                var s = T - aj;
                return s > 20 && s - aC() < 10
            }

            function ag() {
                al.unbind(ac).bind(ac, function (aL, aM, aK, aI) {
                    var aJ = aa,
                        s = I;
                    return Q.scrollBy(aK * ay.mouseWheelSpeed, -aI * ay.mouseWheelSpeed, !1), aJ == aa && s == I
                })
            }

            function n() {
                al.unbind(ac)
            }

            function aB() {
                return !1
            }

            function J() {
                Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp", function (s) {
                    ab(s.target, !1)
                })
            }

            function E() {
                Y.find(":input,a").unbind("focus.jsp")
            }

            function S() {
                function aJ() {
                    var aM = aa,
                        aL = I;
                    switch (s) {
                    case 40:
                        Q.scrollByY(ay.keyboardSpeed, !1);
                        break;
                    case 38:
                        Q.scrollByY(-ay.keyboardSpeed, !1);
                        break;
                    case 34:
                    case 32:
                        Q.scrollByY(v * ay.scrollPagePercent, !1);
                        break;
                    case 33:
                        Q.scrollByY(-v * ay.scrollPagePercent, !1);
                        break;
                    case 39:
                        Q.scrollByX(ay.keyboardSpeed, !1);
                        break;
                    case 37:
                        Q.scrollByX(-ay.keyboardSpeed, !1)
                    }
                    return aI = aM != aa || aL != I
                }
                var s, aI, aK = [];
                aE && aK.push(am[0]);
                az && aK.push(U[0]);
                Y.focus(function () {
                    D.focus()
                });
                D.attr("tabindex", 0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp", function (aN) {
                    if (aN.target === this || aK.length && b(aN.target).closest(aK).length) {
                        var aM = aa,
                            aL = I;
                        switch (aN.keyCode) {
                        case 40:
                        case 38:
                        case 34:
                        case 32:
                        case 33:
                        case 39:
                        case 37:
                            s = aN.keyCode;
                            aJ();
                            break;
                        case 35:
                            M(Z - v);
                            s = null;
                            break;
                        case 36:
                            M(0);
                            s = null
                        }
                        return aI = aN.keyCode == s && aM != aa || aL != I, !aI
                    }
                }).bind("keypress.jsp", function (aL) {
                    return aL.keyCode == s && aJ(), !aI
                });
                ay.hideFocus ? (D.css("outline", "none"), "hideFocus" in al[0] && D.attr("hideFocus", !0)) : (D.css("outline", ""), "hideFocus" in al[0] && D.attr("hideFocus", !1))
            }

            function R() {
                D.attr("tabindex", "-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")
            }

            function C() {
                if (location.hash && location.hash.length > 1) {
                    var aK, aI, aJ = escape(location.hash.substr(1));
                    try {
                        aK = b("#" + aJ + ', a[name="' + aJ + '"]')
                    } catch (s) {
                        return
                    }
                    aK.length && Y.find(aJ) && (al.scrollTop() === 0 ? aI = setInterval(function () {
                        al.scrollTop() > 0 && (ab(aK, !0), b(document).scrollTop(al.position().top), clearInterval(aI))
                    }, 50) : (ab(aK, !0), b(document).scrollTop(al.position().top)))
                }
            }

            function m() {
                b(document.body).data("jspHijack") || (b(document.body).data("jspHijack", !0), b(document.body).delegate("a[href*=#]", "click", function (s) {
                    var aI = this.href.substr(0, this.href.indexOf("#")),
                        aK = location.href,
                        aO, aP, aJ, aM, aL, aN;
                    if (location.href.indexOf("#") !== -1 && (aK = location.href.substr(0, location.href.indexOf("#"))), aI === aK) {
                        aO = escape(this.href.substr(this.href.indexOf("#") + 1));
                        aP;
                        try {
                            aP = b("#" + aO + ', a[name="' + aO + '"]')
                        } catch (aQ) {
                            return
                        }
                        aP.length && (aJ = aP.closest(".jspScrollable"), aM = aJ.data("jsp"), aM.scrollToElement(aP, !0), aJ[0].scrollIntoView && (aL = b(a).scrollTop(), aN = aP.offset().top, (aN < aL || aN > aL + b(a).height()) && aJ[0].scrollIntoView()), s.preventDefault())
                    }
                }))
            }

            function an() {
                var aJ, aI, aL, aK, aM, s = !1;
                al.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp", function (aN) {
                    var aO = aN.originalEvent.touches[0];
                    aJ = aC();
                    aI = aA();
                    aL = aO.pageX;
                    aK = aO.pageY;
                    aM = !1;
                    s = !0
                }).bind("touchmove.jsp", function (aQ) {
                    if (s) {
                        var aP = aQ.originalEvent.touches[0],
                            aO = aa,
                            aN = I;
                        return Q.scrollTo(aJ + aL - aP.pageX, aI + aK - aP.pageY), aM = aM || Math.abs(aL - aP.pageX) > 5 || Math.abs(aK - aP.pageY) > 5, aO == aa && aN == I
                    }
                }).bind("touchend.jsp", function () {
                    s = !1
                }).bind("click.jsp-touchclick", function () {
                    if (aM) return aM = !1, !1
                })
            }

            function g() {
                var s = aA(),
                    aI = aC();
                D.removeClass("jspScrollable").unbind(".jsp");
                D.replaceWith(ao.append(Y.children()));
                ao.scrollTop(s);
                ao.scrollLeft(aI);
                av && clearInterval(av)
            }
            var ay, Q = this,
                Y, aj, v, al, T, Z, y, q, az, aE, au, i, I, h, j, aa, U, ap, X, t, A, aq, af, am, G, l, at, ax, x, av, aH, f, L, ai = !0,
                P = !0,
                aG = !1,
                k = !1,
                ao = D.clone(!1, !1).empty(),
                ac = b.fn.mwheelIntent ? "mwheelIntent.jsp" : "mousewheel.jsp";
            aH = D.css("paddingTop") + " " + D.css("paddingRight") + " " + D.css("paddingBottom") + " " + D.css("paddingLeft");
            f = (parseInt(D.css("paddingLeft"), 10) || 0) + (parseInt(D.css("paddingRight"), 10) || 0);
            b.extend(Q, {
                reinitialise: function (aI) {
                    aI = b.extend({}, ay, aI);
                    ar(aI)
                },
                scrollToElement: function (aJ, aI, s) {
                    ab(aJ, aI, s)
                },
                scrollTo: function (aJ, s, aI) {
                    N(aJ, aI);
                    M(s, aI)
                },
                scrollToX: function (aI, s) {
                    N(aI, s)
                },
                scrollToY: function (s, aI) {
                    M(s, aI)
                },
                scrollToPercentX: function (aI, s) {
                    N(aI * (T - aj), s)
                },
                scrollToPercentY: function (aI, s) {
                    M(aI * (Z - v), s)
                },
                scrollBy: function (aI, s, aJ) {
                    Q.scrollByX(aI, aJ);
                    Q.scrollByY(s, aJ)
                },
                scrollByX: function (s, aJ) {
                    var aI = aC() + Math[s < 0 ? "floor" : "ceil"](s),
                        aK = aI / (T - aj);
                    W(aK * j, aJ)
                },
                scrollByY: function (s, aJ) {
                    var aI = aA() + Math[s < 0 ? "floor" : "ceil"](s),
                        aK = aI / (Z - v);
                    V(aK * i, aJ)
                },
                positionDragX: function (s, aI) {
                    W(s, aI)
                },
                positionDragY: function (aI, s) {
                    V(aI, s)
                },
                animate: function (aI, aL, s, aK) {
                    var aJ = {};
                    aJ[aL] = s;
                    aI.animate(aJ, {
                        duration: ay.animateDuration,
                        easing: ay.animateEase,
                        queue: !1,
                        step: aK
                    })
                },
                getContentPositionX: function () {
                    return aC()
                },
                getContentPositionY: function () {
                    return aA()
                },
                getContentWidth: function () {
                    return T
                },
                getContentHeight: function () {
                    return Z
                },
                getPercentScrolledX: function () {
                    return aC() / (T - aj)
                },
                getPercentScrolledY: function () {
                    return aA() / (Z - v)
                },
                getIsScrollableH: function () {
                    return aE
                },
                getIsScrollableV: function () {
                    return az
                },
                getContentPane: function () {
                    return Y
                },
                scrollToBottom: function (s) {
                    V(i, s)
                },
                hijackInternalLinks: b.noop,
                destroy: function () {
                    g()
                }
            });
            ar(O)
        }
        return e = b.extend({}, b.fn.jScrollPane.defaults, e), b.each(["mouseWheelSpeed", "arrowButtonSpeed", "trackClickSpeed", "keyboardSpeed"], function () {
            e[this] = e[this] || e.speed
        }), this.each(function () {
            var f = b(this),
                g = f.data("jsp");
            g ? g.reinitialise(e) : (b("script", f).filter('[type="text/javascript"],not([type])').remove(), g = new d(f, e), f.data("jsp", g))
        })
    };
    b.fn.jScrollPane.defaults = {
        showArrows: !1,
        maintainPosition: !0,
        stickToBottom: !1,
        stickToRight: !1,
        clickOnTrack: !0,
        autoReinitialise: !1,
        autoReinitialiseDelay: 500,
        verticalDragMinHeight: 0,
        verticalDragMaxHeight: 99999,
        horizontalDragMinWidth: 0,
        horizontalDragMaxWidth: 99999,
        contentWidth: c,
        animateScroll: !1,
        animateDuration: 300,
        animateEase: "linear",
        hijackInternalLinks: !1,
        verticalGutter: 4,
        horizontalGutter: 4,
        mouseWheelSpeed: 0,
        arrowButtonSpeed: 0,
        arrowRepeatFreq: 50,
        arrowScrollOnHover: !1,
        trackClickSpeed: 0,
        trackClickRepeatFreq: 70,
        verticalArrowPositions: "split",
        horizontalArrowPositions: "split",
        enableKeyboardNavigation: !0,
        hideFocus: !1,
        keyboardSpeed: 0,
        initialDelay: 300,
        speed: 30,
        scrollPagePercent: .8
    }
})(jQuery, this);
(function (jQuery) {
    function newTmplItem(options, parentItem, fn, data) {
        var newItem = {
            data: data || (parentItem ? parentItem.data : {}),
            _wrap: parentItem ? parentItem._wrap : null,
            tmpl: null,
            parent: parentItem || null,
            nodes: [],
            calls: tiCalls,
            nest: tiNest,
            wrap: tiWrap,
            html: tiHtml,
            update: tiUpdate
        };
        return options && jQuery.extend(newItem, options, {
            nodes: [],
            parent: parentItem
        }), fn && (newItem.tmpl = fn, newItem._ctnt = newItem._ctnt || newItem.tmpl(jQuery, newItem), newItem.key = ++itemKey, (stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem), newItem
    }

    function build(tmplItem, nested, content) {
        var frag, ret = content ? jQuery.map(content, function (item) {
            return typeof item == "string" ? tmplItem.key ? item.replace(/(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + '="' + tmplItem.key + '" $2') : item : build(item, tmplItem, item._ctnt)
        }) : tmplItem;
        return nested ? ret : (ret = ret.join(""), ret.replace(/^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function (all, before, middle, after) {
            frag = jQuery(middle).get();
            storeTmplItems(frag);
            before && (frag = unencode(before).concat(frag));
            after && (frag = frag.concat(unencode(after)))
        }), frag ? frag : unencode(ret))
    }

    function unencode(text) {
        var el = document.createElement("div");
        return el.innerHTML = text, jQuery.makeArray(el.childNodes)
    }

    function buildTmplFn(markup) {
        return new Function("jQuery", "$item", "var $=jQuery,call,_=[],$data=$item.data;with($data){_.push('" + jQuery.trim(markup).replace(/([\\'])/g, "\\$1").replace(/[\r\t\n]/g, " ").replace(/\$\{([^\}]*)\}/g, "{{= $1}}").replace(/\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g, function (all, slash, type, fnargs, target, parens, args) {
            var tag = jQuery.tmpl.tag[type],
                def, expr, exprAutoFnDetect;
            if (!tag) throw "Template command not found: " + type;
            return def = tag._default || [], parens && !/\w$/.test(target) && (target += parens, parens = ""), target ? (target = unescape(target), args = args ? "," + unescape(args) + ")" : parens ? ")" : "", expr = parens ? target.indexOf(".") > -1 ? target + parens : "(" + target + ").call($item" + args : target, exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))") : exprAutoFnDetect = expr = def.$1 || "null", fnargs = unescape(fnargs), "');" + tag[slash ? "close" : "open"].split("$notnull_1").join(target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true").split("$1a").join(exprAutoFnDetect).split("$1").join(expr).split("$2").join(fnargs ? fnargs.replace(/\s*([^\(]+)\s*(\((.*?)\))?/g, function (all, name, parens, params) {
                return params = params ? "," + params + ")" : parens ? ")" : "", params ? "(" + name + ").call($item" + params : all
            }) : def.$2 || "") + "_.push('"
        }) + "');}return _;")
    }

    function updateWrapped(options, wrapped) {
        options._wrap = build(options, !0, jQuery.isArray(wrapped) ? wrapped : [htmlExpr.test(wrapped) ? wrapped : jQuery(wrapped).html()]).join("")
    }

    function unescape(args) {
        return args ? args.replace(/\\'/g, "'").replace(/\\\\/g, "\\") : null
    }

    function outerHtml(elem) {
        var div = document.createElement("div");
        return div.appendChild(elem.cloneNode(!0)), div.innerHTML
    }

    function storeTmplItems(content) {
        function processItemKey(el) {
            function cloneTmplItem(key) {
                key = key + keySuffix;
                tmplItem = newClonedItems[key] = newClonedItems[key] || newTmplItem(tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent, null, !0)
            }
            var pntKey, pntNode = el,
                pntItem, tmplItem, key;
            if (key = el.getAttribute(tmplItmAtt)) {
                while (pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute(tmplItmAtt)));
                pntKey !== key && (pntNode = pntNode.parentNode ? pntNode.nodeType === 11 ? 0 : pntNode.getAttribute(tmplItmAtt) || 0 : 0, (tmplItem = newTmplItems[key]) || (tmplItem = wrappedItems[key], tmplItem = newTmplItem(tmplItem, newTmplItems[pntNode] || wrappedItems[pntNode], null, !0), tmplItem.key = ++itemKey, newTmplItems[itemKey] = tmplItem), cloneIndex && cloneTmplItem(key));
                el.removeAttribute(tmplItmAtt)
            } else cloneIndex && (tmplItem = jQuery.data(el, "tmplItem")) && (cloneTmplItem(tmplItem.key), newTmplItems[tmplItem.key] = tmplItem, pntNode = jQuery.data(el.parentNode, "tmplItem"), pntNode = pntNode ? pntNode.key : 0);
            if (tmplItem) {
                for (pntItem = tmplItem; pntItem && pntItem.key != pntNode;) pntItem.nodes.push(el), pntItem = pntItem.parent;
                delete tmplItem._ctnt;
                delete tmplItem._wrap;
                jQuery.data(el, "tmplItem", tmplItem)
            }
        }
        for (var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, m, i = 0, l = content.length; i < l; i++)
            if ((elem = content[i]).nodeType === 1) {
                for (elems = elem.getElementsByTagName("*"), m = elems.length - 1; m >= 0; m--) processItemKey(elems[m]);
                processItemKey(elem)
            }
    }

    function tiCalls(content, tmpl, data, options) {
        if (!content) return stack.pop();
        stack.push({
            _: content,
            tmpl: tmpl,
            item: this,
            data: data,
            options: options
        })
    }

    function tiNest(tmpl, data, options) {
        return jQuery.tmpl(jQuery.template(tmpl), data, options, this)
    }

    function tiWrap(call, wrapped) {
        var options = call.options || {};
        return options.wrapped = wrapped, jQuery.tmpl(jQuery.template(call.tmpl), call.data, options, call.item)
    }

    function tiHtml(filter, textOnly) {
        var wrapped = this._wrap;
        return jQuery.map(jQuery(jQuery.isArray(wrapped) ? wrapped.join("") : wrapped).filter(filter || "*"), function (e) {
            return textOnly ? e.innerText || e.textContent : e.outerHTML || outerHtml(e)
        })
    }

    function tiUpdate() {
        var coll = this.nodes;
        jQuery.tmpl(null, null, null, this).insertBefore(coll[0]);
        jQuery(coll).remove()
    }
    var oldManip = jQuery.fn.domManip,
        tmplItmAtt = "_tmplitem",
        htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
        newTmplItems = {},
        wrappedItems = {},
        appendToTmplItems, topTmplItem = {
            key: 0,
            data: {}
        },
        itemKey = 0,
        cloneIndex = 0,
        stack = [];
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function (name, original) {
        jQuery.fn[name] = function (selector) {
            var ret = [],
                insert = jQuery(selector),
                elems, i, l, tmplItems, parent = this.length === 1 && this[0].parentNode;
            if (appendToTmplItems = newTmplItems || {}, parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) insert[original](this[0]), ret = this;
            else {
                for (i = 0, l = insert.length; i < l; i++) cloneIndex = i, elems = (i > 0 ? this.clone(!0) : this).get(), jQuery.fn[original].apply(jQuery(insert[i]), elems), ret = ret.concat(elems);
                cloneIndex = 0;
                ret = this.pushStack(ret, name, insert.selector)
            }
            return tmplItems = appendToTmplItems, appendToTmplItems = null, jQuery.tmpl.complete(tmplItems), ret
        }
    });
    jQuery.fn.extend({
        tmpl: function (data, options, parentItem) {
            return jQuery.tmpl(this[0], data, options, parentItem)
        },
        tmplItem: function () {
            return jQuery.tmplItem(this[0])
        },
        template: function (name) {
            return jQuery.template(name, this[0])
        },
        domManip: function (args, table, callback) {
            if (args[0] && args[0].nodeType) {
                for (var dmArgs = jQuery.makeArray(arguments), argsLength = args.length, i = 0, tmplItem; i < argsLength && !(tmplItem = jQuery.data(args[i++], "tmplItem")););
                argsLength > 1 && (dmArgs[0] = [jQuery.makeArray(args)]);
                tmplItem && cloneIndex && (dmArgs[2] = function (fragClone) {
                    jQuery.tmpl.afterManip(this, fragClone, callback)
                });
                oldManip.apply(this, dmArgs)
            } else oldManip.apply(this, arguments);
            return cloneIndex = 0, appendToTmplItems || jQuery.tmpl.complete(newTmplItems), this
        }
    });
    jQuery.extend({
        tmpl: function (tmpl, data, options, parentItem) {
            var ret, topLevel = !parentItem;
            if (topLevel) parentItem = topTmplItem, tmpl = jQuery.template[tmpl] || jQuery.template(null, tmpl), wrappedItems = {};
            else if (!tmpl) return tmpl = parentItem.tmpl, newTmplItems[parentItem.key] = parentItem, parentItem.nodes = [], parentItem.wrapped && updateWrapped(parentItem, parentItem.wrapped), jQuery(build(parentItem, null, parentItem.tmpl(jQuery, parentItem)));
            return tmpl ? (typeof data == "function" && (data = data.call(parentItem || {})), options && options.wrapped && updateWrapped(options, options.wrapped), ret = jQuery.isArray(data) ? jQuery.map(data, function (dataItem) {
                return dataItem ? newTmplItem(options, parentItem, tmpl, dataItem) : null
            }) : [newTmplItem(options, parentItem, tmpl, data)], topLevel ? jQuery(build(parentItem, null, ret)) : ret) : []
        },
        tmplItem: function (elem) {
            var tmplItem;
            for (elem instanceof jQuery && (elem = elem[0]); elem && elem.nodeType === 1 && !(tmplItem = jQuery.data(elem, "tmplItem")) && (elem = elem.parentNode););
            return tmplItem || topTmplItem
        },
        template: function (name, tmpl) {
            return tmpl ? (typeof tmpl == "string" ? tmpl = buildTmplFn(tmpl) : tmpl instanceof jQuery && (tmpl = tmpl[0] || {}), tmpl.nodeType && (tmpl = jQuery.data(tmpl, "tmpl") || jQuery.data(tmpl, "tmpl", buildTmplFn(tmpl.innerHTML))), typeof name == "string" ? jQuery.template[name] = tmpl : tmpl) : name ? typeof name != "string" ? jQuery.template(null, name) : jQuery.template[name] || jQuery.template(null, htmlExpr.test(name) ? name : jQuery(name)) : null
        },
        encode: function (text) {
            return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;")
        }
    });
    jQuery.extend(jQuery.tmpl, {
        tag: {
            tmpl: {
                _default: {
                    $2: "null"
                },
                open: "if($notnull_1){_=_.concat($item.nest($1,$2));}"
            },
            wrap: {
                _default: {
                    $2: "null"
                },
                open: "$item.calls(_,$1,$2);_=[];",
                close: "call=$item.calls();_=call._.concat($item.wrap(call,_));"
            },
            each: {
                _default: {
                    $2: "$index, $value"
                },
                open: "if($notnull_1){$.each($1a,function($2){with(this){",
                close: "}});}"
            },
            "if": {
                open: "if(($notnull_1) && $1a){",
                close: "}"
            },
            "else": {
                _default: {
                    $1: "true"
                },
                open: "}else if(($notnull_1) && $1a){"
            },
            html: {
                open: "if($notnull_1){_.push($1a);}"
            },
            "=": {
                _default: {
                    $1: "$data"
                },
                open: "if($notnull_1){_.push($.encode($1a));}"
            },
            "!": {
                open: ""
            }
        },
        complete: function () {
            newTmplItems = {}
        },
        afterManip: function (elem, fragClone, callback) {
            var content = fragClone.nodeType === 11 ? jQuery.makeArray(fragClone.childNodes) : fragClone.nodeType === 1 ? [fragClone] : [];
            callback.call(elem, fragClone);
            storeTmplItems(content);
            cloneIndex++
        }
    })
})(jQuery);

(function () {
    PointerTouchMouseEvent = {
        DOWN: "pointertouchmousedown",
        UP: "pointertouchmouseup",
        MOVE: "pointertouchmousemove"
    };
    var onPointerEvent = function (e) {
            var type, pointerTouchMouseEvent;
            if (e.which !== 2 && e.which !== 3) {
                switch (e.type) {
                case "pointerdown":
                    type = PointerTouchMouseEvent.DOWN;
                    break;
                case "pointerup":
                    type = PointerTouchMouseEvent.UP;
                    break;
                case "pointermove":
                    type = PointerTouchMouseEvent.MOVE;
                    break;
                default:
                    return
                }
                pointerTouchMouseEvent = normalizeEvent(type, e, e.originalEvent.clientX, e.originalEvent.clientY);
                $(e.target).trigger(pointerTouchMouseEvent)
            }
        },
        touchWasUsed = !1,
        mouseWasUsed = !1,
        onTouchEvent = function (e) {
            var type, touch = e.originalEvent.touches[0],
                pointerTouchMouseEvent;
            if (touchWasUsed = !0, mouseWasUsed === !0) {
                mouseWasUsed = !1;
                return
            }
            switch (e.type) {
            case "touchstart":
                type = PointerTouchMouseEvent.DOWN;
                break;
            case "touchend":
                type = PointerTouchMouseEvent.UP;
                break;
            case "touchmove":
                type = PointerTouchMouseEvent.MOVE;
                break;
            default:
                return
            }
            pointerTouchMouseEvent = type == PointerTouchMouseEvent.UP ? normalizeEvent(type, e, null, null) : normalizeEvent(type, e, touch.pageX, touch.pageY);
            $(e.target).trigger(pointerTouchMouseEvent)
        },
        onMouseEvent = function (e) {
            var type, pointerTouchMouseEvent;
            if (mouseWasUsed = !0, e.which === 2 || e.which === 3 || touchWasUsed === !0) {
                touchWasUsed = !1;
                return
            }
            switch (e.type) {
            case "mousedown":
                type = PointerTouchMouseEvent.DOWN;
                break;
            case "mouseup":
                type = PointerTouchMouseEvent.UP;
                break;
            case "mousemove":
                type = PointerTouchMouseEvent.MOVE;
                break;
            default:
                return
            }
            pointerTouchMouseEvent = normalizeEvent(type, e, e.pageX, e.pageY);
            $(e.target).trigger(pointerTouchMouseEvent)
        },
        normalizeEvent = function (type, original, x, y) {
            return $.Event(type, {
                pageX: x,
                pageY: y,
                originalEvent: original
            })
        };
    if (window.PointerEvent) $(document).on("pointerdown", onPointerEvent).on("pointerup", onPointerEvent).on("pointermove", onPointerEvent);
    else $(document).on("touchstart", onTouchEvent).on("touchmove", onTouchEvent).on("touchend", onTouchEvent).on("mousedown", onMouseEvent).on("mouseup", onMouseEvent).on("mousemove", onMouseEvent)
})();

var mboxTokens = {
        toBeWritten: [],
        documentWrite: null,
        isOverridden: !1,
        overrideDocumentWrite: function () {
            var self = this;
            self.isOverridden || (self.isOverridden = !0, self.toBeWritten = [], self.documentWrite = document.write, document.write = function (html) {
                self.toBeWritten.push(self.updateTokens(html))
            })
        },
        resetDocumentWrite: function () {
            var self = this,
                i;
            if (self.isOverridden) {
                for (self.isOverridden = !1, document.write = self.documentWrite, i = 0; i < self.toBeWritten.length; i++) document.write(self.toBeWritten[i]);
                self.toBeWritten = []
            }
        },
        updateTokens: function (html) {
            "use strict";
            var urlParts, http, https, replacements, i;
            http = "http://";
            https = "https://";
            try {
                urlParts = function () {
                    var result = {},
                        regexParse = new RegExp("([a-z-0-9]{2,63}).([a-z.]{2,6})$"),
                        urlParts = regexParse.exec(window.location.hostname);
                    return result.sitename = urlParts[1], result.tld = urlParts[2], result.protocol = window.location.protocol, result.subdomain = window.location.hostname.replace(result.sitename + "." + result.tld, "").slice(0, -1), result.domain = result.sitename + "." + result.tld, result
                }()
            } catch (e) {
                urlParts = {}
            }
            for (urlParts.sitename !== "ancestrydev" && urlParts.sitename !== "ancestrystage" && urlParts.sitename !== "ancestry" && (urlParts.sitename = "ancestry", urlParts.domain = "ancestry.com"), replacements = [
                    ["##AncestryTopDomain##", urlParts.domain],
                    ["##AncestryDomain##", http + "www." + urlParts.domain],
                    ["##TreesDomain##", http + "trees." + urlParts.domain],
                    ["##SearchDomain##", http + "search." + urlParts.domain],
                    ["##CommunityDomain##", http + "community." + urlParts.domain],
                    ["##SecureDomain##", https + "secure." + urlParts.domain],
                    ["##LearningDomain##", http + "learn." + urlParts.domain],
                    ["##WizDomain##", http + "wiz." + urlParts.domain],
                    ["##DnaDomain##", http + "dna." + urlParts.domain],
                    ["##HomeDomain##", http + "home." + urlParts.domain],
                    ["##StoreDomain##", http + "store.ancestry" + urlParts.sitename.replace("ancestry", "") + ".com"],
                    ["##CacheDomain##", window.location.protocol + "//c.mfcreative" + urlParts.sitename.replace("ancestry", "") + ".com"],
                    ["##CanaryDomain##", window.location.protocol + "//canary.mfcreative" + urlParts.sitename.replace("ancestry", "") + ".com"]
                ], i = replacements.length - 1; i >= 0; i--) html = html.replace(new RegExp(replacements[i][0], "g"), replacements[i][1]);
            return html
        }
    },
    mboxCopyright, TNT;
document.addEventListener("DOMContentLoaded", function () {
    window.ttMETA === undefined && document.getElementsByClassName("mboxDefault").length > 1 && (document.getElementById("mboxPreventFlicker").innerHTML = ".mboxDefault { visibility:visible; }")
});
mboxCopyright = "Copyright 1996-2014. Adobe Systems Incorporated. All rights reserved.";
TNT = TNT || {};
TNT.a = TNT.a || {};
TNT.a.nestedMboxes = [];
TNT.a.b = {
    companyName: "Test&amp;Target",
    isProduction: !0,
    adminUrl: "http://admin9.testandtarget.omniture.com/admin",
    clientCode: "myfamilycominc",
    serverHost: "myfamilycominc.tt.omtrdc.net",
    mboxTimeout: 15e3,
    mboxLoadedTimeout: 16,
    mboxFactoryDisabledTimeout: 3600,
    bodyPollingTimeout: 16,
    sessionExpirationTimeout: 1860,
    experienceManagerDisabledTimeout: 1800,
    experienceManagerTimeout: 5e3,
    tntIdLifetime: 2592e3,
    crossDomain: "enabled",
    trafficDuration: 10368e3,
    trafficLevelPercentage: 100,
    clientSessionIdSupport: !0,
    clientTntIdSupport: !0,
    passPageParameters: !0,
    usePersistentCookies: !0,
    crossDomainEnabled: !0,
    crossDomainXOnly: !1,
    imsOrgId: "ED3301AC512D2A290A490D4C@AdobeOrg",
    includeExperienceManagerPlugin: !1,
    globalMboxName: "target-global-mbox",
    globalMboxLocationDomId: "",
    globalMboxAutoCreate: !1,
    experienceManagerPluginUrl: "//cdn.tt.omtrdc.net/cdn/target.js",
    siteCatalystPluginName: "tt",
    includeSiteCatalystPlugin: !1,
    mboxVersion: 57,
    mboxIsSupportedFunction: function () {
        return navigator.userAgent.indexOf("MSIE 7.") == -1
    },
    parametersFunction: function () {
        function getOmnitureCookie(name) {
            for (var c = document.cookie.split(";"), i = 0; i < c.length; i++)
                if (c[i].indexOf(name + "=") != -1) return c[i].substring(c[i].indexOf(name + "=") + (name + "=").length);
            return "TYPE=NRVisitor"
        }

        function ageCookie(name) {
            for (var c = document.cookie.split(";"), i = 0; i < c.length; i++)
                if (c[i].indexOf(name + "=") != -1) return c[i].substring(c[i].indexOf(name + "=") + (name + "=").length);
            return "noAge"
        }
        var myCookies = document.cookie,
            myDemograph = "",
            myIdx, ATTIdx, startATT, ATT, ATTval, cLoggedIn, baitArray, bait, wizAge;
        myCookies != null && (myCookies = unescape(myCookies), myIdx = myCookies.indexOf("BAIT"), myIdx != -1 && (myDemograph = myCookies.substring(myIdx, myCookies.indexOf(" ", myIdx + 1))), ATTIdx = myCookies.indexOf(" ATT"), ATTIdx != -1 ? (startATT = myCookies.substring(ATTIdx), ATT = startATT.substring(5, startATT.indexOf(";")), ATTval = ATT == 0 || ATT == undefined ? 0 : 1, cLoggedIn = "cLoggedIn=" + ATTval) : cLoggedIn = "cLoggedIn=0");
        var myDemographData = "",
            bait = "",
            output = "";
        if (myDemograph.indexOf("BAIT=") == 0) {
            for (myDemographData = myDemograph.substring(myDemograph.indexOf("BAIT=") + 5), baitArray = myDemographData.split(";"), i = 0; i < baitArray.length; i++) baitArray[i] = baitArray[i] + "&";
            baitArray.pop();
            bait = baitArray.join("");
            output = bait
        } else myDemographData = "baitData=none", output = myDemographData;
        return wizAge = ageCookie("wizAge"), output + "&" + getOmnitureCookie("OMNITURE") + "&location=" + location.host + location.pathname + "&force=&wizAge=" + wizAge + "&" + cLoggedIn
    },
    cookieDomainFunction: function () {
        var dList = location.hostname.split(".");
        return dList.length > 2 && dList[dList.length - 1].length == 2 && dList[dList.length - 2].match("^(co|aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|xxx)$") ? dList.slice(dList.length - 3).join(".") : dList.length > 1 ? dList.slice(dList.length - 2).join(".") : dList[0]
    }
};
TNT.a.c = {};
TNT.a.c.d = "mboxPage";
TNT.a.c.e = "mboxMCGVID";
TNT.a.c.f = "mboxMCGLH";
TNT.a.c.g = "mboxAAMB";
TNT.a.c.h = "mboxMCAVID";
TNT.a.c.i = "mboxMCSDID";
TNT.a.c.j = "mboxCount";
TNT.a.c.k = "mboxHost";
TNT.a.c.l = "mboxFactoryId";
TNT.a.c.m = "mboxPC";
TNT.a.c.n = "screenHeight";
TNT.a.c.o = "screenWidth";
TNT.a.c.p = "browserWidth";
TNT.a.c.q = "browserHeight";
TNT.a.c.r = "browserTimeOffset";
TNT.a.c.s = "colorDepth";
TNT.a.c.t = "mboxXDomain";
TNT.a.c.u = "mboxURL";
TNT.a.c.v = "mboxReferrer";
TNT.a.c.w = "mboxVersion";
TNT.a.c.x = "mbox";
TNT.a.c.y = "mboxId";
TNT.a.c.z = "mboxDOMLoaded";
TNT.a.c.A = "mboxTime";
TNT.a.c.B = "scPluginVersion";
TNT.a.C = {};
TNT.a.C.D = "mboxDisable";
TNT.a.C.E = "mboxSession";
TNT.a.C.F = "mboxEnv";
TNT.a.C.G = "mboxDebug";
TNT.a.H = {};
TNT.a.H.D = "disable";
TNT.a.H.E = "session";
TNT.a.H.m = "PC";
TNT.a.H.I = "level";
TNT.a.H.J = "check";
TNT.a.H.G = "debug";
TNT.a.H.K = "em-disabled";
TNT.a.L = {};
TNT.a.L.M = "default";
TNT.a.L.N = "mbox";
TNT.a.L.O = "mboxImported-";
TNT.a.L.P = 6e4;
TNT.a.L.Q = "mboxDefault";
TNT.a.L.R = "mboxMarker-";
TNT.a.L.S = 250;
TNT.a.L.B = 1;
TNT.getGlobalMboxName = function () {
    return TNT.a.b.globalMboxName
};
TNT.getGlobalMboxLocation = function () {
    return TNT.a.b.globalMboxLocationDomId
};
TNT.isAutoCreateGlobalMbox = function () {
    return TNT.a.b.globalMboxAutoCreate
};
TNT.getClientMboxExtraParameters = function () {
    return TNT.a.b.parametersFunction()
};
TNT.a.T = {};
TNT.a.T.U = function (V) {
    return V === void 0
};
TNT.a.T.W = function (V) {
    return V === null
};
TNT.a.T.X = function (V) {
    var T = TNT.a.T;
    return T.U(V) || T.W(V) ? !0 : V.length === 0
};
TNT.a.T.Y = function (V) {
    var Z = {}.toString;
    return Z.call(V) === "[object Function]"
};
TNT.a.T._ = function (V) {
    var Z = {}.toString;
    return Z.call(V) === "[object Array]"
};
TNT.a.T.ab = function (V) {
    var Z = {}.toString;
    return Z.call(V) === "[object String]"
};
TNT.a.T.bb = function (V) {
    var Z = {}.toString;
    return Z.call(V) === "[object Object]"
};
TNT.getTargetPageParameters = function () {
    var T = TNT.a.T,
        cb = window.targetPageParams,
        db;
    if (!T.Y(cb)) return [];
    db = null;
    try {
        db = cb()
    } catch (eb) {}
    return T.W(db) ? [] : T._(db) ? db : T.ab(db) && !T.X(db) ? TNT.a.fb(db) : T.bb(db) ? TNT.a.gb(db, []) : []
};
TNT.a.fb = function (hb) {
    for (var db = [], ib = /([^&=]+)=([^&]*)/g, jb = decodeURIComponent, kb = ib.exec(hb); kb;) db.push([jb(kb[1]), jb(kb[2])].join("=")), kb = ib.exec(hb);
    return db
};
TNT.a.gb = function (lb, mb) {
    var T = TNT.a.T,
        db = [],
        nb, V;
    for (nb in lb) lb.hasOwnProperty(nb) && (V = lb[nb], T.bb(V) ? (mb.push(nb), db = db.concat(TNT.a.gb(V, mb)), mb.pop()) : mb.length > 0 ? db.push([mb.concat(nb).join("."), V].join("=")) : db.push([nb, V].join("=")));
    return db
};
TNT.a.ob = function () {};
TNT.a.ob.prototype.getType = function () {
    return "ajax"
};
TNT.a.ob.prototype.fetch = function (pb) {
    pb.setServerType(this.getType());
    document.write('<script src="' + pb.buildUrl() + '"><\/script>')
};
TNT.a.ob.prototype.cancel = function () {};
mboxUrlBuilder = function (qb, rb) {
    this.qb = qb;
    this.rb = rb;
    this.sb = [];
    this.tb = function (u) {
        return u
    };
    this.ub = null
};
mboxUrlBuilder.prototype.addNewParameter = function (vb, V) {
    return this.sb.push({
        name: vb,
        value: V
    }), this
};
mboxUrlBuilder.prototype.addParameterIfAbsent = function (vb, V) {
    var wb, xb;
    if (V) {
        for (wb = 0; wb < this.sb.length; wb++)
            if (xb = this.sb[wb], xb.name === vb) return this;
        return this.checkInvalidCharacters(vb), this.addNewParameter(vb, V)
    }
};
mboxUrlBuilder.prototype.addParameter = function (vb, V) {
    var wb, xb;
    for (this.checkInvalidCharacters(vb), wb = 0; wb < this.sb.length; wb++)
        if (xb = this.sb[wb], xb.name === vb) return xb.value = V, this;
    return this.addNewParameter(vb, V)
};
mboxUrlBuilder.prototype.addParameters = function (sb) {
    var wb, yb;
    if (!sb) return this;
    for (wb = 0; wb < sb.length; wb++)(yb = sb[wb].indexOf("="), yb !== -1 && yb !== 0) && this.addParameter(sb[wb].substring(0, yb), sb[wb].substring(yb + 1, sb[wb].length));
    return this
};
mboxUrlBuilder.prototype.setServerType = function (zb) {
    this.Ab = zb
};
mboxUrlBuilder.prototype.setBasePath = function (ub) {
    this.ub = ub
};
mboxUrlBuilder.prototype.setUrlProcessAction = function (Bb) {
    this.tb = Bb
};
mboxUrlBuilder.prototype.buildUrl = function () {
    for (var xb, Cb = this.ub ? this.ub : "/m2/" + this.rb + "/mbox/" + this.Ab, Db = document.location.protocol == "file:" ? "http:" : document.location.protocol, u = Db + "//" + this.qb + Cb, Eb = u.indexOf("?") != -1 ? "&" : "?", wb = 0; wb < this.sb.length; wb++) xb = this.sb[wb], u += Eb + encodeURIComponent(xb.name) + "=" + encodeURIComponent(xb.value), Eb = "&";
    return this.Fb(this.tb(u))
};
mboxUrlBuilder.prototype.getParameters = function () {
    return this.sb
};
mboxUrlBuilder.prototype.setParameters = function (sb) {
    this.sb = sb
};
mboxUrlBuilder.prototype.clone = function () {
    var Gb = new mboxUrlBuilder(this.qb, this.rb),
        wb;
    for (Gb.setServerType(this.Ab), Gb.setBasePath(this.ub), Gb.setUrlProcessAction(this.tb), wb = 0; wb < this.sb.length; wb++) Gb.addParameter(this.sb[wb].name, this.sb[wb].value);
    return Gb
};
mboxUrlBuilder.prototype.Fb = function (Hb) {
    return Hb.replace(/\"/g, "&quot;").replace(/>/g, "&gt;")
};
mboxUrlBuilder.prototype.checkInvalidCharacters = function (vb) {
    var Ib = new RegExp("('|\")");
    if (Ib.exec(vb)) throw "Parameter '" + vb + "' contains invalid characters";
};
mboxStandardFetcher = function () {};
mboxStandardFetcher.prototype.getType = function () {
    return "standard"
};
mboxStandardFetcher.prototype.fetch = function (pb) {
    pb.setServerType(this.getType());
    document.write('<script src="' + pb.buildUrl() + '"><\/script>')
};
mboxStandardFetcher.prototype.cancel = function () {};
mboxAjaxFetcher = function () {};
mboxAjaxFetcher.prototype.getType = function () {
    return "ajax"
};
mboxAjaxFetcher.prototype.fetch = function (pb) {
    pb.setServerType(this.getType());
    var u = pb.buildUrl();
    this.Jb = document.createElement("script");
    this.Jb.src = u;
    document.body.appendChild(this.Jb)
};
mboxAjaxFetcher.prototype.cancel = function () {};
mboxMap = function () {
    this.Kb = {};
    this.mb = []
};
mboxMap.prototype.put = function (nb, V) {
    this.Kb[nb] || (this.mb[this.mb.length] = nb);
    this.Kb[nb] = V
};
mboxMap.prototype.get = function (nb) {
    return this.Kb[nb]
};
mboxMap.prototype.remove = function (nb) {
    var Lb, i;
    for (this.Kb[nb] = undefined, Lb = [], i = 0; i < this.mb.length; i++) this.mb[i] !== nb && Lb.push(this.mb[i]);
    this.mb = Lb
};
mboxMap.prototype.each = function (Bb) {
    for (var nb, V, db, wb = 0; wb < this.mb.length; wb++)
        if (nb = this.mb[wb], V = this.Kb[nb], V && (db = Bb(nb, V), db === !1)) break
};
mboxMap.prototype.isEmpty = function () {
    return this.mb.length === 0
};
mboxFactory = function (Mb, rb, Nb) {
    var b = TNT.a.b,
        H = TNT.a.H,
        C = TNT.a.C,
        L = TNT.a.L,
        Ob = b.mboxVersion,
        Tb, Ub, ic;
    this.Pb = !1;
    this.Nb = Nb;
    this.Qb = new mboxList;
    mboxFactories.put(Nb, this);
    this.Rb = b.mboxIsSupportedFunction() && typeof (window.attachEvent || document.addEventListener || window.addEventListener) != "undefined";
    this.Sb = this.Rb && mboxGetPageParameter(C.D, !0) === null;
    Tb = Nb == L.M;
    Ub = L.N + (Tb ? "" : "-" + Nb);
    this.Vb = new mboxCookieManager(Ub, b.cookieDomainFunction());
    b.crossDomainXOnly && (this.Sb = this.Sb && this.Vb.isEnabled());
    this.Sb = this.Sb && TNT.a.T.W(this.Vb.getCookie(H.D)) && TNT.a.T.W(this.Vb.getCookie(H.K));
    this.isAdmin() && this.enable();
    this.Wb();
    this.Xb = mboxGenerateId();
    this.Yb = mboxScreenHeight();
    this.Zb = mboxScreenWidth();
    this._b = mboxBrowserWidth();
    this.ac = mboxBrowserHeight();
    this.bc = mboxScreenColorDepth();
    this.cc = mboxBrowserTimeOffset();
    this.dc = new mboxSession(this.Xb, C.E, H.E, b.sessionExpirationTimeout, this.Vb);
    this.ec = new mboxPC(H.m, b.tntIdLifetime, this.Vb);
    this.pb = new mboxUrlBuilder(Mb, rb);
    this.fc(this.pb, Tb, Ob);
    this.gc = (new Date).getTime();
    this.hc = this.gc;
    ic = this;
    this.addOnLoad(function () {
        ic.hc = (new Date).getTime()
    });
    this.Rb && (this.addOnLoad(function () {
        ic.Pb = !0;
        ic.getMboxes().each(function (jc) {
            jc.kc();
            jc.setFetcher(new mboxAjaxFetcher);
            jc.finalize()
        });
        TNT.a.nestedMboxes = []
    }), this.Sb ? (this.limitTraffic(b.trafficLevelPercentage, b.trafficDuration), this.lc(), this.mc = new mboxSignaler(this)) : b.isProduction || this.isAdmin() && (this.isEnabled() ? alert("It looks like your browser will not allow " + b.companyName + " to set its administrative cookie. To allow setting the cookie please lower the privacy settings of your browser.\n(this message will only appear in administrative mode)") : alert("mbox disabled, probably due to timeout\nReset your cookies to re-enable\n(this message will only appear in administrative mode)")))
};
mboxFactory.prototype.forcePCId = function (nc) {
    TNT.a.b.clientTntIdSupport && this.ec.forceId(nc) && this.dc.forceId(mboxGenerateId())
};
mboxFactory.prototype.forceSessionId = function (nc) {
    TNT.a.b.clientSessionIdSupport && this.dc.forceId(nc)
};
mboxFactory.prototype.isEnabled = function () {
    return this.Sb
};
mboxFactory.prototype.getDisableReason = function () {
    return this.Vb.getCookie(TNT.a.H.D)
};
mboxFactory.prototype.isSupported = function () {
    return this.Rb
};
mboxFactory.prototype.disable = function (oc, pc) {
    typeof oc == "undefined" && (oc = 3600);
    typeof pc == "undefined" && (pc = "unspecified");
    this.isAdmin() || (this.Sb = !1, this.Vb.setCookie(TNT.a.H.D, pc, oc))
};
mboxFactory.prototype.enable = function () {
    this.Sb = !0;
    this.Vb.deleteCookie(TNT.a.H.D)
};
mboxFactory.prototype.isAdmin = function () {
    return document.location.href.indexOf(TNT.a.C.F) != -1
};
mboxFactory.prototype.limitTraffic = function (qc, oc) {
    if (TNT.a.b.trafficLevelPercentage != 100) {
        if (qc == 100) return;
        var rc = !0;
        parseInt(this.Vb.getCookie(TNT.a.H.I)) != qc && (rc = Math.random() * 100 <= qc);
        this.Vb.setCookie(TNT.a.H.I, qc, oc);
        rc || this.disable(3600, "limited by traffic")
    }
};
mboxFactory.prototype.addOnLoad = function (sc) {
    if (this.isDomLoaded()) sc();
    else {
        var tc = !1,
            uc = function () {
                tc || (tc = !0, sc())
            };
        this.vc.push(uc);
        this.isDomLoaded() && !tc && uc()
    }
};
mboxFactory.prototype.getEllapsedTime = function () {
    return this.hc - this.gc
};
mboxFactory.prototype.getEllapsedTimeUntil = function (A) {
    return A - this.gc
};
mboxFactory.prototype.getMboxes = function () {
    return this.Qb
};
mboxFactory.prototype.get = function (x, y) {
    return this.Qb.get(x).getById(y || 0)
};
mboxFactory.prototype.update = function (x, sb) {
    if (this.isEnabled()) {
        var ic = this;
        if (!this.isDomLoaded()) {
            this.addOnLoad(function () {
                ic.update(x, sb)
            });
            return
        }
        if (this.Qb.get(x).length() === 0) throw "Mbox " + x + " is not defined";
        this.Qb.get(x).each(function (jc) {
            var pb = jc.getUrlBuilder();
            pb.addParameter(TNT.a.c.d, mboxGenerateId());
            ic.wc(pb);
            ic.xc(pb, x);
            ic.setVisitorIdParameters(pb, x);
            jc.load(sb)
        })
    }
};
mboxFactory.prototype.setVisitorIdParameters = function (u, x) {
    var visitor, addVisitorValueToUrl;
    typeof Visitor != "undefined" && TNT.a.b.imsOrgId && (visitor = Visitor.getInstance(TNT.a.b.imsOrgId), visitor.isAllowed() && (addVisitorValueToUrl = function (param, getter, mboxName) {
        if (visitor[getter]) {
            var callback = function (value) {
                    value && u.addParameter(param, value)
                },
                value;
            value = typeof mboxName != "undefined" ? visitor[getter]("mbox:" + mboxName) : visitor[getter](callback);
            callback(value)
        }
    }, addVisitorValueToUrl(TNT.a.c.e, "getMarketingCloudVisitorID"), addVisitorValueToUrl(TNT.a.c.f, "getAudienceManagerLocationHint"), addVisitorValueToUrl(TNT.a.c.g, "getAudienceManagerBlob"), addVisitorValueToUrl(TNT.a.c.h, "getAnalyticsVisitorID"), addVisitorValueToUrl(TNT.a.c.i, "getSupplementalDataID", x)))
};
mboxFactory.prototype.create = function (x, sb, yc) {
    var y, Ac, jc, ic;
    if (!this.isSupported()) return null;
    var zc = new Date,
        A = zc.getTime() - zc.getTimezoneOffset() * TNT.a.L.P,
        pb = this.pb.clone();
    if (pb.addParameter(TNT.a.c.j, this.Qb.length() + 1), pb.addParameter(TNT.a.c.A, A), pb.addParameters(sb), this.wc(pb), this.xc(pb, x), this.setVisitorIdParameters(pb, x), yc) Ac = new mboxLocatorNode(yc);
    else {
        if (this.Pb) throw "The page has already been loaded, can't write marker";
        Ac = new mboxLocatorDefault(this.Bc(x))
    }
    try {
        y = this.Qb.get(x).length();
        jc = new mbox(x, y, pb, Ac, this.Cc(x), this);
        this.Sb && jc.setFetcher(this.Pb ? new mboxAjaxFetcher : new mboxStandardFetcher);
        ic = this;
        jc.setOnError(function (Dc) {
            jc.setMessage(Dc);
            jc.activate();
            jc.isActivated() || (ic.disable(TNT.a.b.mboxFactoryDisabledTimeout, Dc), window.location.hostname.indexOf("order.ancestry") === -1 && window.location.reload(!1))
        });
        this.Qb.add(jc)
    } catch (Ec) {
        this.disable();
        throw 'Failed creating mbox "' + x + '", the error was: ' + Ec;
    }
    return jc
};
mboxFactory.prototype.wc = function (pb) {
    var m = this.ec.getId();
    m && pb.addParameter(TNT.a.c.m, m)
};
mboxFactory.prototype.xc = function (pb, x) {
    var Fc = !TNT.isAutoCreateGlobalMbox() && TNT.getGlobalMboxName() === x;
    Fc && pb.addParameters(TNT.getTargetPageParameters())
};
mboxFactory.prototype.getCookieManager = function () {
    return this.Vb
};
mboxFactory.prototype.getPageId = function () {
    return this.Xb
};
mboxFactory.prototype.getPCId = function () {
    return this.ec
};
mboxFactory.prototype.getSessionId = function () {
    return this.dc
};
mboxFactory.prototype.getSignaler = function () {
    return this.mc
};
mboxFactory.prototype.getUrlBuilder = function () {
    return this.pb
};
mboxFactory.prototype.Gc = function (x) {
    return this.Nb + "-" + x + "-" + this.Qb.get(x).length()
};
mboxFactory.prototype.Bc = function (x) {
    return TNT.a.L.R + this.Gc(x)
};
mboxFactory.prototype.Cc = function (x) {
    return TNT.a.L.O + this.Gc(x)
};
mboxFactory.prototype.fc = function (pb, Tb, Ob) {
    pb.addParameter(TNT.a.c.k, document.location.hostname);
    pb.addParameter(TNT.a.c.d, this.Xb);
    pb.addParameter(TNT.a.c.n, this.Yb);
    pb.addParameter(TNT.a.c.o, this.Zb);
    pb.addParameter(TNT.a.c.p, this._b);
    pb.addParameter(TNT.a.c.q, this.ac);
    pb.addParameter(TNT.a.c.r, this.cc);
    pb.addParameter(TNT.a.c.s, this.bc);
    pb.addParameter(TNT.a.C.E, this.dc.getId());
    Tb || pb.addParameter(TNT.a.c.l, this.Nb);
    this.wc(pb);
    TNT.a.b.crossDomainEnabled && pb.addParameter(TNT.a.c.t, TNT.a.b.crossDomain);
    var c = TNT.getClientMboxExtraParameters();
    c && pb.addParameters(c.split("&"));
    pb.setUrlProcessAction(function (u) {
        if (TNT.a.b.passPageParameters) {
            u += "&";
            u += TNT.a.c.u;
            u += "=" + encodeURIComponent(document.location);
            var v = encodeURIComponent(document.referrer);
            u.length + v.length < 2e3 && (u += "&", u += TNT.a.c.v, u += "=" + v)
        }
        return u += "&", u += TNT.a.c.w, u + ("=" + Ob)
    })
};
mboxFactory.prototype.lc = function () {
    document.write('<style id="mboxPreventFlicker">.' + TNT.a.L.Q + " { visibility:hidden; }<\/style>")
};
mboxFactory.prototype.isDomLoaded = function () {
    return this.Pb
};
mboxFactory.prototype.Wb = function () {
    if (!this.vc) {
        this.vc = [];
        var ic = this;
        (function () {
            var Hc = document.addEventListener ? "DOMContentLoaded" : "onreadystatechange",
                Ic = !1,
                Jc = function () {
                    if (!Ic) {
                        Ic = !0;
                        for (var i = 0; i < ic.vc.length; ++i) ic.vc[i]()
                    }
                },
                Kc;
            document.addEventListener ? (document.addEventListener(Hc, function () {
                document.removeEventListener(Hc, arguments.callee, !1);
                Jc()
            }, !1), window.addEventListener("load", function () {
                document.removeEventListener("load", arguments.callee, !1);
                Jc()
            }, !1)) : document.attachEvent && (self !== self.top ? document.attachEvent(Hc, function () {
                document.readyState === "complete" && (document.detachEvent(Hc, arguments.callee), Jc())
            }) : (Kc = function () {
                try {
                    document.documentElement.doScroll("left");
                    Jc()
                } catch (Lc) {
                    setTimeout(Kc, 13)
                }
            }, Kc()));
            document.readyState === "complete" && Jc()
        })()
    }
};
mboxSignaler = function (Mc) {
    this.Nc = document;
    this.Mc = Mc
};
mboxSignaler.prototype.signal = function (Oc, x) {
    var Pc, jc, pb;
    this.Mc.isEnabled() && (Pc = this.Qc(this.Mc.Bc(x)), this.Rc(this.Nc.body, Pc), jc = this.Mc.create(x, mboxShiftArray(arguments), Pc), pb = jc.getUrlBuilder(), pb.addParameter(TNT.a.c.d, mboxGenerateId()), jc.load())
};
mboxSignaler.prototype.Qc = function (Sc) {
    var db = this.Nc.createElement("DIV");
    return db.id = Sc, db.style.visibility = "hidden", db.style.display = "none", db
};
mboxSignaler.prototype.Rc = function (Tc, Uc) {
    Tc.appendChild(Uc)
};
mboxList = function () {
    this.Qb = []
};
mboxList.prototype.add = function (jc) {
    var T = TNT.a.T;
    T.U(jc) || T.W(jc) || (this.Qb[this.Qb.length] = jc)
};
mboxList.prototype.get = function (x) {
    for (var jc, db = new mboxList, wb = 0; wb < this.Qb.length; wb++) jc = this.Qb[wb], jc.getName() == x && db.add(jc);
    return db
};
mboxList.prototype.getById = function (Vc) {
    return this.Qb[Vc]
};
mboxList.prototype.length = function () {
    return this.Qb.length
};
mboxList.prototype.each = function (Bb) {
    if (typeof Bb != "function") throw "Action must be a function, was: " + typeof Bb;
    for (var wb = 0; wb < this.Qb.length; wb++) Bb(this.Qb[wb])
};
mboxLocatorDefault = function (Wc) {
    this.Wc = Wc;
    document.write('<div id="' + this.Wc + '" style="visibility:hidden;display:none">&nbsp;<\/div>')
};
mboxLocatorDefault.prototype.locate = function () {
    for (var Uc = document.getElementById(this.Wc); Uc;) {
        if (Uc.nodeType == 1 && Uc.className == "mboxDefault") return Uc;
        Uc = Uc.previousSibling
    }
    return null
};
mboxLocatorDefault.prototype.force = function () {
    var Yc = document.createElement("div"),
        Zc;
    return Yc.className = "mboxDefault", Zc = document.getElementById(this.Wc), Zc && Zc.parentNode.insertBefore(Yc, Zc), Yc
};
mboxLocatorNode = function (Uc) {
    this.Uc = Uc
};
mboxLocatorNode.prototype.locate = function () {
    return typeof this.Uc == "string" ? document.getElementById(this.Uc) : this.Uc
};
mboxLocatorNode.prototype.force = function () {
    return null
};
mboxCreate = function (x) {
    var jc = mboxFactoryDefault.create(x, mboxShiftArray(arguments));
    return jc && mboxFactoryDefault.isEnabled() && jc.load(), jc
};
mboxDefine = function (yc, x) {
    return mboxFactoryDefault.create(x, mboxShiftArray(mboxShiftArray(arguments)), yc)
};
mboxUpdate = function (x) {
    mboxFactoryDefault.update(x, mboxShiftArray(arguments))
};
mbox = function (vb, Sc, pb, _c, ad, Mc) {
    this.bd = null;
    this.cd = 0;
    this.Ac = _c;
    this.ad = ad;
    this.dd = null;
    this.ed = new mboxOfferContent;
    this.Yc = null;
    this.pb = pb;
    this.message = "";
    this.fd = {};
    this.gd = 0;
    this.Sc = Sc;
    this.vb = vb;
    this.hd();
    pb.addParameter(TNT.a.c.x, vb);
    pb.addParameter(TNT.a.c.y, Sc);
    this.id = function () {};
    this.jd = function () {};
    this.kd = null;
    this.ld = document.documentMode >= 10 && !Mc.isDomLoaded();
    this.ld && (this.md = TNT.a.nestedMboxes, this.md.push(this.vb))
};
mbox.prototype.getId = function () {
    return this.Sc
};
mbox.prototype.hd = function () {
    var maxLength = TNT.a.L.S;
    if (this.vb.length > maxLength) throw "Mbox Name " + this.vb + " exceeds max length of " + maxLength + " characters.";
    else if (this.vb.match(/^\s+|\s+$/g)) throw "Mbox Name " + this.vb + " has leading/trailing whitespace(s).";
};
mbox.prototype.getName = function () {
    return this.vb
};
mbox.prototype.getParameters = function () {
    for (var sb = this.pb.getParameters(), db = [], wb = 0; wb < sb.length; wb++) sb[wb].name.indexOf("mbox") !== 0 && (db[db.length] = sb[wb].name + "=" + sb[wb].value);
    return db
};
mbox.prototype.setOnLoad = function (Bb) {
    return this.jd = Bb, this
};
mbox.prototype.setMessage = function (Dc) {
    return this.message = Dc, this
};
mbox.prototype.setOnError = function (id) {
    return this.id = id, this
};
mbox.prototype.setFetcher = function (nd) {
    return this.dd && this.dd.cancel(), this.dd = nd, this
};
mbox.prototype.getFetcher = function () {
    return this.dd
};
mbox.prototype.load = function (sb) {
    var pb, ic;
    return this.dd === null ? this : (this.setEventTime("load.start"), this.cancelTimeout(), this.cd = 0, pb = sb && sb.length > 0 ? this.pb.clone().addParameters(sb) : this.pb, this.dd.fetch(pb), ic = this, this.od = setTimeout(function () {
        ic.id("browser timeout", ic.dd.getType())
    }, TNT.a.b.mboxTimeout), this.setEventTime("load.end"), mboxTokens.overrideDocumentWrite(), this)
};
mbox.prototype.loaded = function (ignoreReset) {
    if (ignoreReset !== !0 && mboxTokens.resetDocumentWrite(), this.cancelTimeout(), !this.activate()) {
        var ic = this;
        setTimeout(function () {
            ic.loaded(!0)
        }, TNT.a.b.mboxLoadedTimeout)
    }
};
mbox.prototype.activate = function () {
    return this.cd ? this.cd : (this.setEventTime("activate" + ++this.gd + ".start"), this.ld && this.md[this.md.length - 1] !== this.vb) ? this.cd : (this.show() && (this.cancelTimeout(), this.cd = 1), this.setEventTime("activate" + this.gd + ".end"), this.ld && this.md.pop(), this.cd)
};
mbox.prototype.isActivated = function () {
    return this.cd
};
mbox.prototype.setOffer = function (ed) {
    var pd = ed && ed.show && ed.setOnLoad,
        qd, rd;
    if (!pd) throw "Invalid offer";
    return (qd = TNT.a.b.globalMboxName === this.vb, qd = qd && ed instanceof mboxOfferDefault, qd = qd && this.dd !== null, qd = qd && this.dd.getType() === "ajax", !qd) ? (this.ed = ed, this) : (rd = this.ed.jd, this.ed = ed, this.ed.setOnLoad(rd), this)
};
mbox.prototype.getOffer = function () {
    return this.ed
};
mbox.prototype.show = function () {
    this.setEventTime("show.start");
    var db = this.ed.show(this);
    return this.setEventTime(db == 1 ? "show.end.ok" : "show.end"), db
};
mbox.prototype.showContent = function (sd) {
    return mbox.td(sd) ? (this.Yc = mbox.ud(this, this.Yc), this.Yc === null) ? 0 : mbox.vd(document.body, this.Yc) ? this.Yc === sd ? (this.wd(this.Yc), this.jd(), 1) : (this.xd(this.Yc), this.xd(sd), mbox.yd(this, sd), this.wd(this.Yc), this.jd(), 1) : 0 : 0
};
mbox.td = function (sd) {
    return sd !== undefined && sd !== null
};
mbox.vd = function (zd, Ad) {
    var Bd = zd.contains !== undefined;
    return Bd ? zd !== Ad && zd.contains(Ad) : Boolean(zd.compareDocumentPosition(Ad) & 16)
};
mbox.ud = function (jc, Yc) {
    return Yc !== undefined && Yc !== null && mbox.vd(document.body, Yc) ? Yc : jc.getDefaultDiv()
};
mbox.yd = function (jc, Cd) {
    jc.Yc.parentNode.replaceChild(Cd, jc.Yc);
    jc.Yc = Cd
};
mbox.prototype.hide = function () {
    this.setEventTime("hide.start");
    var db = this.showContent(this.getDefaultDiv());
    return this.setEventTime(db == 1 ? "hide.end.ok" : "hide.end.fail"), db
};
mbox.prototype.finalize = function () {
    this.setEventTime("finalize.start");
    this.cancelTimeout();
    this.getDefaultDiv() || (this.Ac.force() ? this.setMessage("No default content, an empty one has been added") : this.setMessage("Unable to locate mbox"));
    this.activate() || (this.hide(), this.setEventTime("finalize.end.hide"));
    this.setEventTime("finalize.end.ok")
};
mbox.prototype.cancelTimeout = function () {
    this.od && clearTimeout(this.od);
    this.dd && this.dd.cancel()
};
mbox.prototype.getDiv = function () {
    return this.Yc
};
mbox.prototype.getDefaultDiv = function () {
    return this.kd === null && (this.kd = this.Ac.locate()), this.kd
};
mbox.prototype.setEventTime = function (Dd) {
    this.fd[Dd] = (new Date).getTime()
};
mbox.prototype.getEventTimes = function () {
    return this.fd
};
mbox.prototype.getImportName = function () {
    return this.ad
};
mbox.prototype.getURL = function () {
    return this.pb.buildUrl()
};
mbox.prototype.getUrlBuilder = function () {
    return this.pb
};
mbox.prototype.Ed = function (Yc) {
    return Yc.style.display != "none"
};
mbox.prototype.wd = function (Yc) {
    this.Fd(Yc, !0)
};
mbox.prototype.xd = function (Yc) {
    this.Fd(Yc, !1)
};
mbox.prototype.Fd = function (Yc, Gd) {
    Yc.style.visibility = Gd ? "visible" : "hidden";
    Yc.style.display = Gd ? "block" : "none"
};
mbox.prototype.kc = function () {
    this.ld = !1
};
mbox.prototype.relocateDefaultDiv = function () {
    this.kd = this.Ac.locate()
};
mboxOfferContent = function () {
    this.jd = function () {}
};
mboxOfferContent.prototype.show = function (jc) {
    var db = jc.showContent(document.getElementById(jc.getImportName()));
    return db == 1 && this.jd(), db
};
mboxOfferContent.prototype.setOnLoad = function (jd) {
    this.jd = jd
};
mboxOfferAjax = function (sd) {
    this.sd = sd;
    this.jd = function () {}
};
mboxOfferAjax.prototype.setOnLoad = function (jd) {
    this.jd = jd
};
mboxOfferAjax.prototype.show = function (jc) {
    var Hd = document.createElement("div"),
        db;
    return Hd.id = jc.getImportName(), Hd.innerHTML = this.sd, db = jc.showContent(Hd), db == 1 && this.jd(), db
};
mboxOfferDefault = function () {
    this.jd = function () {}
};
mboxOfferDefault.prototype.setOnLoad = function (jd) {
    this.jd = jd
};
mboxOfferDefault.prototype.show = function (jc) {
    var db = jc.hide();
    return db == 1 && this.jd(), db
};
mboxCookieManager = function (vb, Id) {
    this.vb = vb;
    this.Id = Id === "" || Id.indexOf(".") === -1 ? "" : "; domain=" + Id;
    this.Jd = new mboxMap;
    this.loadCookies()
};
mboxCookieManager.prototype.isEnabled = function () {
    return this.setCookie(TNT.a.H.J, "true", 60), this.loadCookies(), this.getCookie(TNT.a.H.J) == "true"
};
mboxCookieManager.prototype.setCookie = function (vb, V, oc) {
    if (typeof vb != "undefined" && typeof V != "undefined" && typeof oc != "undefined") {
        var Kd = {};
        Kd.name = vb;
        Kd.value = encodeURIComponent(V);
        Kd.expireOn = Math.ceil(oc + (new Date).getTime() / 1e3);
        this.Jd.put(vb, Kd);
        this.saveCookies()
    }
};
mboxCookieManager.prototype.getCookie = function (vb) {
    var Kd = this.Jd.get(vb);
    return Kd ? decodeURIComponent(Kd.value) : null
};
mboxCookieManager.prototype.deleteCookie = function (vb) {
    this.Jd.remove(vb);
    this.saveCookies()
};
mboxCookieManager.prototype.getCookieNames = function (Ld) {
    var Md = [];
    return this.Jd.each(function (vb) {
        vb.indexOf(Ld) === 0 && (Md[Md.length] = vb)
    }), Md
};
mboxCookieManager.prototype.saveCookies = function () {
    var Nd = TNT.a.b.crossDomainXOnly,
        Od = TNT.a.H.D,
        Pd = [],
        Qd = 0,
        Rd, Sd;
    this.Jd.each(function (vb, Kd) {
        Nd && vb !== Od || (Pd[Pd.length] = vb + "#" + Kd.value + "#" + Kd.expireOn, Qd < Kd.expireOn && (Qd = Kd.expireOn))
    });
    Rd = new Date(Qd * 1e3);
    Sd = [];
    Sd.push(this.vb, "=", Pd.join("|"));
    TNT.a.b.usePersistentCookies && Sd.push("; expires=", Rd.toGMTString());
    Sd.push("; path=/", this.Id);
    document.cookie = Sd.join("")
};
mboxCookieManager.prototype.loadCookies = function () {
    var Td, Ud, Vd, Wd, wb, Kd, Xd;
    if (this.Jd = new mboxMap, Td = document.cookie.indexOf(this.vb + "="), Td != -1)
        for (Ud = document.cookie.indexOf(";", Td), Ud == -1 && (Ud = document.cookie.indexOf(",", Td), Ud == -1 && (Ud = document.cookie.length)), Vd = document.cookie.substring(Td + this.vb.length + 1, Ud).split("|"), Wd = Math.ceil((new Date).getTime() / 1e3), wb = 0; wb < Vd.length; wb++) Kd = Vd[wb].split("#"), Wd <= Kd[2] && (Xd = {}, Xd.name = Kd[0], Xd.value = Kd[1], Xd.expireOn = Kd[2], this.Jd.put(Xd.name, Xd))
};
mboxSession = function (Yd, Zd, Ub, _d, Vb) {
    this.Zd = Zd;
    this.Ub = Ub;
    this._d = _d;
    this.Vb = Vb;
    this.Sc = typeof mboxForceSessionId != "undefined" ? mboxForceSessionId : mboxGetPageParameter(this.Zd, !0);
    (this.Sc === null || this.Sc.length === 0) && (this.Sc = Vb.getCookie(Ub), (this.Sc === null || this.Sc.length === 0) && (this.Sc = Yd));
    this.Vb.setCookie(Ub, this.Sc, _d)
};
mboxSession.prototype.getId = function () {
    return this.Sc
};
mboxSession.prototype.forceId = function (nc) {
    this.Sc = nc;
    this.Vb.setCookie(this.Ub, this.Sc, this._d)
};
mboxPC = function (Ub, _d, Vb) {
    this.Ub = Ub;
    this._d = _d;
    this.Vb = Vb;
    this.Sc = typeof mboxForcePCId != "undefined" ? mboxForcePCId : Vb.getCookie(Ub);
    this.Sc && Vb.setCookie(Ub, this.Sc, _d)
};
mboxPC.prototype.getId = function () {
    return this.Sc
};
mboxPC.prototype.forceId = function (nc) {
    return this.Sc != nc ? (this.Sc = nc, this.Vb.setCookie(this.Ub, this.Sc, this._d), !0) : !1
};
mboxGetPageParameter = function (vb, ae) {
    var be, db, ce;
    return ae = ae || !1, be = ae ? new RegExp("\\?[^#]*" + vb + "=([^&;#]*)", "i") : new RegExp("\\?[^#]*" + vb + "=([^&;#]*)"), db = null, ce = be.exec(document.location), ce && ce.length >= 2 && (db = ce[1]), db
};
mboxSetCookie = function (vb, V, oc) {
    return mboxFactoryDefault.getCookieManager().setCookie(vb, V, oc)
};
mboxGetCookie = function (vb) {
    return mboxFactoryDefault.getCookieManager().getCookie(vb)
};
mboxCookiePageDomain = function () {
    var Id = /([^:]*)(:[0-9]{0,5})?/.exec(document.location.host)[1],
        ee;
    return /[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/.exec(Id) || (ee = /([^\.]+\.[^\.]{3}|[^\.]+\.[^\.]+\.[^\.]{2})$/.exec(Id), ee && (Id = ee[0], Id.indexOf("www.") === 0 && (Id = Id.substr(4)))), Id ? Id : ""
};
mboxShiftArray = function (fe) {
    for (var db = [], wb = 1; wb < fe.length; wb++) db[db.length] = fe[wb];
    return db
};
mboxGenerateId = function () {
    return (new Date).getTime() + "-" + Math.floor(Math.random() * 999999)
};
mboxScreenHeight = function () {
    return screen.height
};
mboxScreenWidth = function () {
    return screen.width
};
mboxBrowserWidth = function () {
    return window.innerWidth ? window.innerWidth : document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth
};
mboxBrowserHeight = function () {
    return window.innerHeight ? window.innerHeight : document.documentElement ? document.documentElement.clientHeight : document.body.clientHeight
};
mboxBrowserTimeOffset = function () {
    return -(new Date).getTimezoneOffset()
};
mboxScreenColorDepth = function () {
    return screen.pixelDepth
};
mboxVizTargetUrl = function (x) {
    var sb;
    if (mboxFactoryDefault.isEnabled()) {
        var c = TNT.a.c,
            P = TNT.a.L.P,
            rb = TNT.a.b.clientCode,
            zc = new Date,
            ge = zc.getTimezoneOffset() * P,
            pb = mboxFactoryDefault.getUrlBuilder().clone();
        return pb.setBasePath("/m2/" + rb + "/viztarget"), pb.addParameter(c.x, x), pb.addParameter(c.y, 0), pb.addParameter(c.j, mboxFactoryDefault.getMboxes().length() + 1), pb.addParameter(c.A, zc.getTime() - ge), pb.addParameter(c.d, mboxGenerateId()), pb.addParameter(c.z, mboxFactoryDefault.isDomLoaded()), sb = mboxShiftArray(arguments), sb && sb.length > 0 && pb.addParameters(sb), mboxFactoryDefault.wc(pb), mboxFactoryDefault.xc(pb, x), mboxFactoryDefault.setVisitorIdParameters(pb, x), pb.buildUrl()
    }
};
TNT.createGlobalMbox = function () {
    var he = TNT.getGlobalMboxName(),
        ie = TNT.getGlobalMboxLocation(),
        je, ke, le, me;
    ie || (ie = "mbox-" + he + "-" + mboxGenerateId(), je = document.createElement("div"), je.className = "mboxDefault", je.id = ie, je.style.visibility = "hidden", je.style.display = "none", ke = setInterval(function () {
        document.body && (clearInterval(ke), document.body.insertBefore(je, document.body.firstChild))
    }, TNT.a.b.bodyPollingTimeout));
    le = TNT.getTargetPageParameters();
    me = mboxFactoryDefault.create(he, le, ie);
    me && mboxFactoryDefault.isEnabled() && (me.setFetcher(new TNT.a.ob), me.load())
};
TNT.a.ne = function (Vb, oe, pe) {
    return mboxGetPageParameter(oe, !0) || Vb.getCookie(pe)
};
TNT.a.qe = function (b) {
    setTimeout(function () {
        typeof mboxDebugLoaded == "undefined" && alert("Could not load the remote debug.\nPlease check your connection to " + b.companyName + " servers")
    }, 3600);
    var u = b.adminUrl + "/mbox/mbox_debug.jsp?mboxServerHost=" + b.serverHost + "&clientCode=" + b.clientCode;
    document.write('<script src="' + u + '"><\/script>')
};
TNT.a.re = function (b) {
    var T = TNT.a.T;
    return !T.U(b) && !T.W(b) && T.bb(b)
};
TNT.a.se = function (b, te) {
    var T = TNT.a.T,
        ue, ve, V;
    for (var nb in b) ue = b.hasOwnProperty(nb) && te.hasOwnProperty(nb), V = b[nb], ve = !T.U(V) && !T.W(V), ue && ve && (te[nb] = V);
    return te
};
TNT.a.we = function () {
    var b = window.targetGlobalSettings;
    TNT.a.re(b) && (TNT.a.b = TNT.a.se(b, TNT.a.b));
    var Ob = TNT.a.b.mboxVersion,
        xe = TNT.a.b.serverHost,
        rb = TNT.a.b.clientCode,
        M = TNT.a.L.M,
        oe = TNT.a.C.G,
        pe = TNT.a.H.G;
    typeof mboxVersion == "undefined" && (window.mboxFactories = new mboxMap, window.mboxFactoryDefault = new mboxFactory(xe, rb, M), window.mboxVersion = Ob);
    TNT.a.ne(mboxFactoryDefault.getCookieManager(), oe, pe) && TNT.a.qe(TNT.a.b)
};
TNT.a.we();
TNT.isAutoCreateGlobalMbox() && TNT.createGlobalMbox();
(function () {
    YAHOO.util.Config = function (D) {
        D && this.init(D)
    };
    var B = YAHOO.lang,
        C = YAHOO.util.CustomEvent,
        A = YAHOO.util.Config;
    A.CONFIG_CHANGED_EVENT = "configChanged";
    A.BOOLEAN_TYPE = "boolean";
    A.prototype = {
        owner: null,
        queueInProgress: !1,
        config: null,
        initialConfig: null,
        eventQueue: null,
        configChangedEvent: null,
        init: function (D) {
            this.owner = D;
            this.configChangedEvent = this.createEvent(A.CONFIG_CHANGED_EVENT);
            this.configChangedEvent.signature = C.LIST;
            this.queueInProgress = !1;
            this.config = {};
            this.initialConfig = {};
            this.eventQueue = []
        },
        checkBoolean: function (D) {
            return typeof D == A.BOOLEAN_TYPE
        },
        checkNumber: function (D) {
            return !isNaN(D)
        },
        fireEvent: function (D, F) {
            var E = this.config[D];
            E && E.event && E.event.fire(F)
        },
        addProperty: function (E, D) {
            E = E.toLowerCase();
            this.config[E] = D;
            D.event = this.createEvent(E, {
                scope: this.owner
            });
            D.event.signature = C.LIST;
            D.key = E;
            D.handler && D.event.subscribe(D.handler, this.owner);
            this.setProperty(E, D.value, !0);
            D.suppressEvent || this.queueProperty(E, D.value)
        },
        getConfig: function () {
            var D = {},
                F = this.config,
                G, E;
            for (G in F) B.hasOwnProperty(F, G) && (E = F[G], E && E.event && (D[G] = E.value));
            return D
        },
        getProperty: function (D) {
            var E = this.config[D.toLowerCase()];
            return E && E.event ? E.value : undefined
        },
        resetProperty: function (D) {
            D = D.toLowerCase();
            var E = this.config[D];
            if (E && E.event) {
                if (this.initialConfig[D] && !B.isUndefined(this.initialConfig[D])) return this.setProperty(D, this.initialConfig[D]), !0
            } else return !1
        },
        setProperty: function (E, G, D) {
            var F;
            return E = E.toLowerCase(), this.queueInProgress && !D ? (this.queueProperty(E, G), !0) : (F = this.config[E], F && F.event ? F.validator && !F.validator(G) ? !1 : (F.value = G, D || (this.fireEvent(E, G), this.configChangedEvent.fire([E, G])), !0) : !1)
        },
        queueProperty: function (S, P) {
            S = S.toLowerCase();
            var R = this.config[S],
                K = !1,
                J, G, H, I, O, Q, F, M, N, D, L, T, E;
            if (R && R.event) {
                if (B.isUndefined(P) || !R.validator || R.validator(P)) {
                    for (B.isUndefined(P) ? P = R.value : R.value = P, K = !1, J = this.eventQueue.length, L = 0; L < J; L++)
                        if (G = this.eventQueue[L], G && (H = G[0], I = G[1], H == S)) {
                            this.eventQueue[L] = null;
                            this.eventQueue.push([S, B.isUndefined(P) ? I : P]);
                            K = !0;
                            break
                        }
                    K || B.isUndefined(P) || this.eventQueue.push([S, P])
                } else return !1;
                if (R.supercedes)
                    for (O = R.supercedes.length, T = 0; T < O; T++)
                        for (Q = R.supercedes[T], F = this.eventQueue.length, E = 0; E < F; E++)
                            if (M = this.eventQueue[E], M && (N = M[0], D = M[1], N == Q.toLowerCase())) {
                                this.eventQueue.push([N, D]);
                                this.eventQueue[E] = null;
                                break
                            }
                return !0
            }
            return !1
        },
        refireEvent: function (D) {
            D = D.toLowerCase();
            var E = this.config[D];
            E && E.event && !B.isUndefined(E.value) && (this.queueInProgress ? this.queueProperty(D) : this.fireEvent(D, E.value))
        },
        applyConfig: function (D, G) {
            var F, E;
            if (G) {
                E = {};
                for (F in D) B.hasOwnProperty(D, F) && (E[F.toLowerCase()] = D[F]);
                this.initialConfig = E
            }
            for (F in D) B.hasOwnProperty(D, F) && this.queueProperty(F, D[F])
        },
        refresh: function () {
            for (var D in this.config) B.hasOwnProperty(this.config, D) && this.refireEvent(D)
        },
        fireQueue: function () {
            var E, H, D, G, F;
            for (this.queueInProgress = !0, E = 0; E < this.eventQueue.length; E++) H = this.eventQueue[E], H && (D = H[0], G = H[1], F = this.config[D], F.value = G, this.eventQueue[E] = null, this.fireEvent(D, G));
            this.queueInProgress = !1;
            this.eventQueue = []
        },
        subscribeToConfigEvent: function (E, F, H, D) {
            var G = this.config[E.toLowerCase()];
            return G && G.event ? (A.alreadySubscribed(G.event, F, H) || G.event.subscribe(F, H, D), !0) : !1
        },
        unsubscribeFromConfigEvent: function (D, E, G) {
            var F = this.config[D.toLowerCase()];
            return F && F.event ? F.event.unsubscribe(E, G) : !1
        },
        toString: function () {
            var D = "Config";
            return this.owner && (D += " [" + this.owner.toString() + "]"), D
        },
        outputEventQueue: function () {
            for (var D = "", G, F = this.eventQueue.length, E = 0; E < F; E++) G = this.eventQueue[E], G && (D += G[0] + "=" + G[1] + ", ");
            return D
        },
        destroy: function () {
            var E = this.config,
                D, F;
            for (D in E) B.hasOwnProperty(E, D) && (F = E[D], F.event.unsubscribeAll(), F.event = null);
            this.configChangedEvent.unsubscribeAll();
            this.configChangedEvent = null;
            this.owner = null;
            this.config = null;
            this.initialConfig = null;
            this.eventQueue = null
        }
    };
    A.alreadySubscribed = function (E, H, I) {
        var F = E.subscribers.length,
            D, G;
        if (F > 0) {
            G = F - 1;
            do
                if (D = E.subscribers[G], D && D.obj == I && D.fn == H) return !0;
            while (G--)
        }
        return !1
    };
    YAHOO.lang.augmentProto(A, YAHOO.util.EventProvider)
})(),
function () {
    function L() {
        return H || (H = document.createElement("div"), H.innerHTML = '<div class="' + G.CSS_HEADER + '"><\/div><div class="' + G.CSS_BODY + '"><\/div><div class="' + G.CSS_FOOTER + '"><\/div>', P = H.firstChild, O = P.nextSibling, E = O.nextSibling), H
    }

    function K() {
        return P || L(), P.cloneNode(!1)
    }

    function B() {
        return O || L(), O.cloneNode(!1)
    }

    function C() {
        return E || L(), E.cloneNode(!1)
    }
    YAHOO.widget.Module = function (R, Q) {
        R && this.init(R, Q)
    };
    var F = YAHOO.util.Dom,
        D = YAHOO.util.Config,
        N = YAHOO.util.Event,
        M = YAHOO.util.CustomEvent,
        G = YAHOO.widget.Module,
        I = YAHOO.env.ua,
        H, P, O, E, A = {
            BEFORE_INIT: "beforeInit",
            INIT: "init",
            APPEND: "append",
            BEFORE_RENDER: "beforeRender",
            RENDER: "render",
            CHANGE_HEADER: "changeHeader",
            CHANGE_BODY: "changeBody",
            CHANGE_FOOTER: "changeFooter",
            CHANGE_CONTENT: "changeContent",
            DESTORY: "destroy",
            BEFORE_SHOW: "beforeShow",
            SHOW: "show",
            BEFORE_HIDE: "beforeHide",
            HIDE: "hide"
        },
        J = {
            VISIBLE: {
                key: "visible",
                value: !0,
                validator: YAHOO.lang.isBoolean
            },
            EFFECT: {
                key: "effect",
                suppressEvent: !0,
                supercedes: ["visible"]
            },
            MONITOR_RESIZE: {
                key: "monitorresize",
                value: !0
            },
            APPEND_TO_DOCUMENT_BODY: {
                key: "appendtodocumentbody",
                value: !1
            }
        };
    G.IMG_ROOT = null;
    G.IMG_ROOT_SSL = null;
    G.CSS_MODULE = "yui-module";
    G.CSS_HEADER = "hd";
    G.CSS_BODY = "bd";
    G.CSS_FOOTER = "ft";
    G.RESIZE_MONITOR_SECURE_URL = "javascript:false;";
    G.RESIZE_MONITOR_BUFFER = 1;
    G.textResizeEvent = new M("textResize");
    G.forceDocumentRedraw = function () {
        var Q = document.documentElement;
        Q && (Q.className += " ", Q.className = YAHOO.lang.trim(Q.className))
    };
    G.prototype = {
        constructor: G,
        element: null,
        header: null,
        body: null,
        footer: null,
        id: null,
        imageRoot: G.IMG_ROOT,
        initEvents: function () {
            var Q = M.LIST;
            this.beforeInitEvent = this.createEvent(A.BEFORE_INIT);
            this.beforeInitEvent.signature = Q;
            this.initEvent = this.createEvent(A.INIT);
            this.initEvent.signature = Q;
            this.appendEvent = this.createEvent(A.APPEND);
            this.appendEvent.signature = Q;
            this.beforeRenderEvent = this.createEvent(A.BEFORE_RENDER);
            this.beforeRenderEvent.signature = Q;
            this.renderEvent = this.createEvent(A.RENDER);
            this.renderEvent.signature = Q;
            this.changeHeaderEvent = this.createEvent(A.CHANGE_HEADER);
            this.changeHeaderEvent.signature = Q;
            this.changeBodyEvent = this.createEvent(A.CHANGE_BODY);
            this.changeBodyEvent.signature = Q;
            this.changeFooterEvent = this.createEvent(A.CHANGE_FOOTER);
            this.changeFooterEvent.signature = Q;
            this.changeContentEvent = this.createEvent(A.CHANGE_CONTENT);
            this.changeContentEvent.signature = Q;
            this.destroyEvent = this.createEvent(A.DESTORY);
            this.destroyEvent.signature = Q;
            this.beforeShowEvent = this.createEvent(A.BEFORE_SHOW);
            this.beforeShowEvent.signature = Q;
            this.showEvent = this.createEvent(A.SHOW);
            this.showEvent.signature = Q;
            this.beforeHideEvent = this.createEvent(A.BEFORE_HIDE);
            this.beforeHideEvent.signature = Q;
            this.hideEvent = this.createEvent(A.HIDE);
            this.hideEvent.signature = Q
        },
        platform: function () {
            var Q = navigator.userAgent.toLowerCase();
            return Q.indexOf("windows") != -1 || Q.indexOf("win32") != -1 ? "windows" : Q.indexOf("macintosh") != -1 ? "mac" : !1
        }(),
        browser: function () {
            var Q = navigator.userAgent.toLowerCase();
            return Q.indexOf("opera") != -1 ? "opera" : Q.indexOf("msie 7") != -1 ? "ie7" : Q.indexOf("msie") != -1 ? "ie" : Q.indexOf("safari") != -1 ? "safari" : Q.indexOf("gecko") != -1 ? "gecko" : !1
        }(),
        isSecure: function () {
            return window.location.href.toLowerCase().indexOf("https") === 0 ? !0 : !1
        }(),
        initDefaultConfig: function () {
            this.cfg.addProperty(J.VISIBLE.key, {
                handler: this.configVisible,
                value: J.VISIBLE.value,
                validator: J.VISIBLE.validator
            });
            this.cfg.addProperty(J.EFFECT.key, {
                suppressEvent: J.EFFECT.suppressEvent,
                supercedes: J.EFFECT.supercedes
            });
            this.cfg.addProperty(J.MONITOR_RESIZE.key, {
                handler: this.configMonitorResize,
                value: J.MONITOR_RESIZE.value
            });
            this.cfg.addProperty(J.APPEND_TO_DOCUMENT_BODY.key, {
                value: J.APPEND_TO_DOCUMENT_BODY.value
            })
        },
        init: function (V, U) {
            var S, W;
            if (this.initEvents(), this.beforeInitEvent.fire(G), this.cfg = new D(this), this.isSecure && (this.imageRoot = G.IMG_ROOT_SSL), typeof V == "string" && (S = V, V = document.getElementById(V), V || (V = L().cloneNode(!1), V.id = S)), this.id = F.generateId(V), this.element = V, W = this.element.firstChild, W) {
                var R = !1,
                    Q = !1,
                    T = !1;
                do 1 == W.nodeType && (!R && F.hasClass(W, G.CSS_HEADER) ? (this.header = W, R = !0) : !Q && F.hasClass(W, G.CSS_BODY) ? (this.body = W, Q = !0) : !T && F.hasClass(W, G.CSS_FOOTER) && (this.footer = W, T = !0)); while (W = W.nextSibling)
            }
            this.initDefaultConfig();
            F.addClass(this.element, G.CSS_MODULE);
            U && this.cfg.applyConfig(U, !0);
            D.alreadySubscribed(this.renderEvent, this.cfg.fireQueue, this.cfg) || this.renderEvent.subscribe(this.cfg.fireQueue, this.cfg, !0);
            this.initEvent.fire(G)
        },
        initResizeMonitor: function () {
            var R = I.gecko && this.platform == "windows",
                Q;
            R ? (Q = this, setTimeout(function () {
                Q._initResizeMonitor()
            }, 0)) : this._initResizeMonitor()
        },
        _initResizeMonitor: function () {
            function W() {
                G.textResizeEvent.fire()
            }
            var Q, S, U, V, R, T;
            if (!I.opera && (S = F.get("_yuiResizeMonitor"), V = this._supportsCWResize(), S || (S = document.createElement("iframe"), this.isSecure && G.RESIZE_MONITOR_SECURE_URL && I.ie && (S.src = G.RESIZE_MONITOR_SECURE_URL), V || (U = '<html><head><script type="text/javascript">window.onresize=function(){window.parent.YAHOO.widget.Module.textResizeEvent.fire();};<\/script><\/head><body><\/body><\/html>', S.src = "data:text/html;charset=utf-8," + encodeURIComponent(U)), S.id = "_yuiResizeMonitor", S.title = "Text Resize Monitor", S.style.position = "absolute", S.style.visibility = "hidden", R = document.body, T = R.firstChild, T ? R.insertBefore(S, T) : R.appendChild(S), S.style.width = "2em", S.style.height = "2em", S.style.top = -1 * (S.offsetHeight + G.RESIZE_MONITOR_BUFFER) + "px", S.style.left = "0", S.style.borderWidth = "0", S.style.visibility = "visible", I.webkit && (Q = S.contentWindow.document, Q.open(), Q.close())), S && S.contentWindow)) {
                if (G.textResizeEvent.subscribe(this.onDomResize, this, !0), !G.textResizeInitialized) {
                    if (V && !N.on(S.contentWindow, "resize", W)) N.on(S, "resize", W);
                    G.textResizeInitialized = !0
                }
                this.resizeMonitor = S
            }
        },
        _supportsCWResize: function () {
            var Q = !0;
            return I.gecko && I.gecko <= 1.8 && (Q = !1), Q
        },
        onDomResize: function () {
            var Q = -1 * (this.resizeMonitor.offsetHeight + G.RESIZE_MONITOR_BUFFER);
            this.resizeMonitor.style.top = Q + "px";
            this.resizeMonitor.style.left = "0"
        },
        setHeader: function (R) {
            var Q = this.header || (this.header = K());
            R.nodeName ? (Q.innerHTML = "", Q.appendChild(R)) : Q.innerHTML = R;
            this.changeHeaderEvent.fire(R);
            this.changeContentEvent.fire()
        },
        appendToHeader: function (R) {
            var Q = this.header || (this.header = K());
            Q.appendChild(R);
            this.changeHeaderEvent.fire(R);
            this.changeContentEvent.fire()
        },
        setBody: function (R) {
            var Q = this.body || (this.body = B());
            R.nodeName ? (Q.innerHTML = "", Q.appendChild(R)) : Q.innerHTML = R;
            this.changeBodyEvent.fire(R);
            this.changeContentEvent.fire()
        },
        appendToBody: function (R) {
            var Q = this.body || (this.body = B());
            Q.appendChild(R);
            this.changeBodyEvent.fire(R);
            this.changeContentEvent.fire()
        },
        setFooter: function (R) {
            var Q = this.footer || (this.footer = C());
            R.nodeName ? (Q.innerHTML = "", Q.appendChild(R)) : Q.innerHTML = R;
            this.changeFooterEvent.fire(R);
            this.changeContentEvent.fire()
        },
        appendToFooter: function (R) {
            var Q = this.footer || (this.footer = C());
            Q.appendChild(R);
            this.changeFooterEvent.fire(R);
            this.changeContentEvent.fire()
        },
        render: function (S, Q) {
            function R(V) {
                typeof V == "string" && (V = document.getElementById(V));
                V && (T._addToParent(V, T.element), T.appendEvent.fire())
            }
            var T = this,
                U;
            if (this.beforeRenderEvent.fire(), Q || (Q = this.element), S) R(S);
            else if (!F.inDocument(this.element)) return !1;
            return this.header && !F.inDocument(this.header) && (U = Q.firstChild, U ? Q.insertBefore(this.header, U) : Q.appendChild(this.header)), this.body && !F.inDocument(this.body) && (this.footer && F.isAncestor(this.moduleElement, this.footer) ? Q.insertBefore(this.body, this.footer) : Q.appendChild(this.body)), this.footer && !F.inDocument(this.footer) && Q.appendChild(this.footer), this.renderEvent.fire(), !0
        },
        destroy: function () {
            var Q;
            this.element && (N.purgeElement(this.element, !0), Q = this.element.parentNode);
            Q && Q.removeChild(this.element);
            this.element = null;
            this.header = null;
            this.body = null;
            this.footer = null;
            G.textResizeEvent.unsubscribe(this.onDomResize, this);
            this.cfg.destroy();
            this.cfg = null;
            this.destroyEvent.fire()
        },
        show: function () {
            this.cfg.setProperty("visible", !0)
        },
        hide: function () {
            this.cfg.setProperty("visible", !1)
        },
        configVisible: function (R, Q) {
            var T = Q[0];
            T ? (this.beforeShowEvent.fire(), F.setStyle(this.element, "display", "block"), this.showEvent.fire()) : (this.beforeHideEvent.fire(), F.setStyle(this.element, "display", "none"), this.hideEvent.fire())
        },
        configMonitorResize: function (S, R) {
            var Q = R[0];
            Q ? this.initResizeMonitor() : (G.textResizeEvent.unsubscribe(this.onDomResize, this, !0), this.resizeMonitor = null)
        },
        _addToParent: function (Q, R) {
            !this.cfg.getProperty("appendtodocumentbody") && Q === document.body && Q.firstChild ? Q.insertBefore(R, Q.firstChild) : Q.appendChild(R)
        },
        toString: function () {
            return "Module " + this.id
        }
    };
    YAHOO.lang.augmentProto(G, YAHOO.util.EventProvider)
}(),
function () {
    YAHOO.widget.Overlay = function (P, O) {
        YAHOO.widget.Overlay.superclass.constructor.call(this, P, O)
    };
    var I = YAHOO.lang,
        M = YAHOO.util.CustomEvent,
        G = YAHOO.widget.Module,
        N = YAHOO.util.Event,
        F = YAHOO.util.Dom,
        D = YAHOO.util.Config,
        K = YAHOO.env.ua,
        B = YAHOO.widget.Overlay,
        H = "subscribe",
        E = "unsubscribe",
        C = "contained",
        J, A = {
            BEFORE_MOVE: "beforeMove",
            MOVE: "move"
        },
        L = {
            X: {
                key: "x",
                validator: I.isNumber,
                suppressEvent: !0,
                supercedes: ["iframe"]
            },
            Y: {
                key: "y",
                validator: I.isNumber,
                suppressEvent: !0,
                supercedes: ["iframe"]
            },
            XY: {
                key: "xy",
                suppressEvent: !0,
                supercedes: ["iframe"]
            },
            CONTEXT: {
                key: "context",
                suppressEvent: !0,
                supercedes: ["iframe"]
            },
            FIXED_CENTER: {
                key: "fixedcenter",
                value: !1,
                supercedes: ["iframe", "visible"]
            },
            WIDTH: {
                key: "width",
                suppressEvent: !0,
                supercedes: ["context", "fixedcenter", "iframe"]
            },
            HEIGHT: {
                key: "height",
                suppressEvent: !0,
                supercedes: ["context", "fixedcenter", "iframe"]
            },
            AUTO_FILL_HEIGHT: {
                key: "autofillheight",
                supercedes: ["height"],
                value: "body"
            },
            ZINDEX: {
                key: "zindex",
                value: null
            },
            CONSTRAIN_TO_VIEWPORT: {
                key: "constraintoviewport",
                value: !1,
                validator: I.isBoolean,
                supercedes: ["iframe", "x", "y", "xy"]
            },
            IFRAME: {
                key: "iframe",
                value: K.ie == 6 ? !0 : !1,
                validator: I.isBoolean,
                supercedes: ["zindex"]
            },
            PREVENT_CONTEXT_OVERLAP: {
                key: "preventcontextoverlap",
                value: !1,
                validator: I.isBoolean,
                supercedes: ["constraintoviewport"]
            }
        };
    if (B.IFRAME_SRC = "javascript:false;", B.IFRAME_OFFSET = 3, B.VIEWPORT_OFFSET = 10, B.TOP_LEFT = "tl", B.TOP_RIGHT = "tr", B.BOTTOM_LEFT = "bl", B.BOTTOM_RIGHT = "br", B.CSS_OVERLAY = "yui-overlay", B.STD_MOD_RE = /^\s*?(body|footer|header)\s*?$/i, B.windowScrollEvent = new M("windowScroll"), B.windowResizeEvent = new M("windowResize"), B.windowScrollHandler = function (P) {
            var O = N.getTarget(P);
            O && O !== window && O !== window.document || (K.ie ? (window.scrollEnd || (window.scrollEnd = -1), clearTimeout(window.scrollEnd), window.scrollEnd = setTimeout(function () {
                B.windowScrollEvent.fire()
            }, 1)) : B.windowScrollEvent.fire())
        }, B.windowResizeHandler = function () {
            K.ie ? (window.resizeEnd || (window.resizeEnd = -1), clearTimeout(window.resizeEnd), window.resizeEnd = setTimeout(function () {
                B.windowResizeEvent.fire()
            }, 100)) : B.windowResizeEvent.fire()
        }, B._initialized = null, B._initialized === null) {
        N.on(window, "scroll", B.windowScrollHandler);
        N.on(window, "resize", B.windowResizeHandler);
        B._initialized = !0
    }
    B._TRIGGER_MAP = {
        windowScroll: B.windowScrollEvent,
        windowResize: B.windowResizeEvent,
        textResize: G.textResizeEvent
    };
    YAHOO.extend(B, G, {
        CONTEXT_TRIGGERS: [],
        init: function (P, O) {
            B.superclass.init.call(this, P);
            this.beforeInitEvent.fire(B);
            F.addClass(this.element, B.CSS_OVERLAY);
            O && this.cfg.applyConfig(O, !0);
            this.platform == "mac" && K.gecko && (D.alreadySubscribed(this.showEvent, this.showMacGeckoScrollbars, this) || this.showEvent.subscribe(this.showMacGeckoScrollbars, this, !0), D.alreadySubscribed(this.hideEvent, this.hideMacGeckoScrollbars, this) || this.hideEvent.subscribe(this.hideMacGeckoScrollbars, this, !0));
            this.initEvent.fire(B)
        },
        initEvents: function () {
            B.superclass.initEvents.call(this);
            var O = M.LIST;
            this.beforeMoveEvent = this.createEvent(A.BEFORE_MOVE);
            this.beforeMoveEvent.signature = O;
            this.moveEvent = this.createEvent(A.MOVE);
            this.moveEvent.signature = O
        },
        initDefaultConfig: function () {
            B.superclass.initDefaultConfig.call(this);
            var O = this.cfg;
            O.addProperty(L.X.key, {
                handler: this.configX,
                validator: L.X.validator,
                suppressEvent: L.X.suppressEvent,
                supercedes: L.X.supercedes
            });
            O.addProperty(L.Y.key, {
                handler: this.configY,
                validator: L.Y.validator,
                suppressEvent: L.Y.suppressEvent,
                supercedes: L.Y.supercedes
            });
            O.addProperty(L.XY.key, {
                handler: this.configXY,
                suppressEvent: L.XY.suppressEvent,
                supercedes: L.XY.supercedes
            });
            O.addProperty(L.CONTEXT.key, {
                handler: this.configContext,
                suppressEvent: L.CONTEXT.suppressEvent,
                supercedes: L.CONTEXT.supercedes
            });
            O.addProperty(L.FIXED_CENTER.key, {
                handler: this.configFixedCenter,
                value: L.FIXED_CENTER.value,
                validator: L.FIXED_CENTER.validator,
                supercedes: L.FIXED_CENTER.supercedes
            });
            O.addProperty(L.WIDTH.key, {
                handler: this.configWidth,
                suppressEvent: L.WIDTH.suppressEvent,
                supercedes: L.WIDTH.supercedes
            });
            O.addProperty(L.HEIGHT.key, {
                handler: this.configHeight,
                suppressEvent: L.HEIGHT.suppressEvent,
                supercedes: L.HEIGHT.supercedes
            });
            O.addProperty(L.AUTO_FILL_HEIGHT.key, {
                handler: this.configAutoFillHeight,
                value: L.AUTO_FILL_HEIGHT.value,
                validator: this._validateAutoFill,
                supercedes: L.AUTO_FILL_HEIGHT.supercedes
            });
            O.addProperty(L.ZINDEX.key, {
                handler: this.configzIndex,
                value: L.ZINDEX.value
            });
            O.addProperty(L.CONSTRAIN_TO_VIEWPORT.key, {
                handler: this.configConstrainToViewport,
                value: L.CONSTRAIN_TO_VIEWPORT.value,
                validator: L.CONSTRAIN_TO_VIEWPORT.validator,
                supercedes: L.CONSTRAIN_TO_VIEWPORT.supercedes
            });
            O.addProperty(L.IFRAME.key, {
                handler: this.configIframe,
                value: L.IFRAME.value,
                validator: L.IFRAME.validator,
                supercedes: L.IFRAME.supercedes
            });
            O.addProperty(L.PREVENT_CONTEXT_OVERLAP.key, {
                value: L.PREVENT_CONTEXT_OVERLAP.value,
                validator: L.PREVENT_CONTEXT_OVERLAP.validator,
                supercedes: L.PREVENT_CONTEXT_OVERLAP.supercedes
            })
        },
        moveTo: function (O, P) {
            this.cfg.setProperty("xy", [O, P])
        },
        hideMacGeckoScrollbars: function () {
            F.replaceClass(this.element, "show-scrollbars", "hide-scrollbars")
        },
        showMacGeckoScrollbars: function () {
            F.replaceClass(this.element, "hide-scrollbars", "show-scrollbars")
        },
        _setDomVisibility: function (O) {
            F.setStyle(this.element, "visibility", O ? "visible" : "hidden");
            O ? F.removeClass(this.element, "yui-overlay-hidden") : F.addClass(this.element, "yui-overlay-hidden")
        },
        configVisible: function (R, O) {
            var Q = O[0],
                S = F.getStyle(this.element, "visibility"),
                Y = this.cfg.getProperty("effect"),
                V = [],
                U = this.platform == "mac" && K.gecko,
                g = D.alreadySubscribed,
                W, P, f, c, b, a, d, Z, T;
            if (S == "inherit") {
                for (f = this.element.parentNode; f.nodeType != 9 && f.nodeType != 11;) {
                    if (S = F.getStyle(f, "visibility"), S != "inherit") break;
                    f = f.parentNode
                }
                S == "inherit" && (S = "visible")
            }
            if (Y)
                if (Y instanceof Array)
                    for (Z = Y.length, c = 0; c < Z; c++) W = Y[c], V[V.length] = W.effect(this, W.duration);
                else V[V.length] = Y.effect(this, Y.duration);
            if (Q)
                if (U && this.showMacGeckoScrollbars(), Y) {
                    if (Q && (S != "visible" || S === ""))
                        for (this.beforeShowEvent.fire(), T = V.length, b = 0; b < T; b++) P = V[b], b !== 0 || g(P.animateInCompleteEvent, this.showEvent.fire, this.showEvent) || P.animateInCompleteEvent.subscribe(this.showEvent.fire, this.showEvent, !0), P.animateIn()
                } else S != "visible" || S === "" ? (this.beforeShowEvent.fire(), this._setDomVisibility(!0), this.cfg.refireEvent("iframe"), this.showEvent.fire()) : this._setDomVisibility(!0);
            else if (U && this.hideMacGeckoScrollbars(), Y)
                if (S == "visible")
                    for (this.beforeHideEvent.fire(), T = V.length, a = 0; a < T; a++) d = V[a], a !== 0 || g(d.animateOutCompleteEvent, this.hideEvent.fire, this.hideEvent) || d.animateOutCompleteEvent.subscribe(this.hideEvent.fire, this.hideEvent, !0), d.animateOut();
                else S === "" && this._setDomVisibility(!1);
            else S == "visible" || S === "" ? (this.beforeHideEvent.fire(), this._setDomVisibility(!1), this.hideEvent.fire()) : this._setDomVisibility(!1)
        },
        doCenterOnDOMEvent: function () {
            var O = this.cfg,
                P = O.getProperty("fixedcenter");
            O.getProperty("visible") && P && (P !== C || this.fitsInViewport()) && this.center()
        },
        fitsInViewport: function () {
            var S = B.VIEWPORT_OFFSET,
                Q = this.element,
                T = Q.offsetWidth,
                R = Q.offsetHeight,
                O = F.getViewportWidth(),
                P = F.getViewportHeight();
            return T + S < O && R + S < P
        },
        configFixedCenter: function (S, Q) {
            var U = Q[0],
                P = D.alreadySubscribed,
                R = B.windowResizeEvent,
                O = B.windowScrollEvent;
            U ? (this.center(), P(this.beforeShowEvent, this.center) || this.beforeShowEvent.subscribe(this.center), P(R, this.doCenterOnDOMEvent, this) || R.subscribe(this.doCenterOnDOMEvent, this, !0), P(O, this.doCenterOnDOMEvent, this) || O.subscribe(this.doCenterOnDOMEvent, this, !0)) : (this.beforeShowEvent.unsubscribe(this.center), R.unsubscribe(this.doCenterOnDOMEvent, this), O.unsubscribe(this.doCenterOnDOMEvent, this))
        },
        configHeight: function (R, P) {
            var O = P[0],
                Q = this.element;
            F.setStyle(Q, "height", O);
            this.cfg.refireEvent("iframe")
        },
        configAutoFillHeight: function (T, S) {
            var V = S[0],
                Q = this.cfg,
                U = "autofillheight",
                W = "height",
                R = Q.getProperty(U),
                O = this._autoFillOnHeightChange;
            Q.unsubscribeFromConfigEvent(W, O);
            G.textResizeEvent.unsubscribe(O);
            this.changeContentEvent.unsubscribe(O);
            R && V !== R && this[R] && F.setStyle(this[R], W, "");
            V && (V = I.trim(V.toLowerCase()), Q.subscribeToConfigEvent(W, O, this[V], this), G.textResizeEvent.subscribe(O, this[V], this), this.changeContentEvent.subscribe(O, this[V], this), Q.setProperty(U, V, !0))
        },
        configWidth: function (R, O) {
            var Q = O[0],
                P = this.element;
            F.setStyle(P, "width", Q);
            this.cfg.refireEvent("iframe")
        },
        configzIndex: function (Q, O) {
            var S = O[0],
                P = this.element;
            S || (S = F.getStyle(P, "zIndex"), (!S || isNaN(S)) && (S = 0));
            (this.iframe || this.cfg.getProperty("iframe") === !0) && S <= 0 && (S = 1);
            F.setStyle(P, "zIndex", S);
            this.cfg.setProperty("zIndex", S, !0);
            this.iframe && this.stackIframe()
        },
        configXY: function (Q, P) {
            var T = P[0],
                O = T[0],
                S = T[1];
            this.cfg.setProperty("x", O);
            this.cfg.setProperty("y", S);
            this.beforeMoveEvent.fire([O, S]);
            O = this.cfg.getProperty("x");
            S = this.cfg.getProperty("y");
            this.cfg.refireEvent("iframe");
            this.moveEvent.fire([O, S])
        },
        configX: function (Q, P) {
            var O = P[0],
                S = this.cfg.getProperty("y");
            this.cfg.setProperty("x", O, !0);
            this.cfg.setProperty("y", S, !0);
            this.beforeMoveEvent.fire([O, S]);
            O = this.cfg.getProperty("x");
            S = this.cfg.getProperty("y");
            F.setX(this.element, O, !0);
            this.cfg.setProperty("xy", [O, S], !0);
            this.cfg.refireEvent("iframe");
            this.moveEvent.fire([O, S])
        },
        configY: function (Q, P) {
            var O = this.cfg.getProperty("x"),
                S = P[0];
            this.cfg.setProperty("x", O, !0);
            this.cfg.setProperty("y", S, !0);
            this.beforeMoveEvent.fire([O, S]);
            O = this.cfg.getProperty("x");
            S = this.cfg.getProperty("y");
            F.setY(this.element, S, !0);
            this.cfg.setProperty("xy", [O, S], !0);
            this.cfg.refireEvent("iframe");
            this.moveEvent.fire([O, S])
        },
        showIframe: function () {
            var P = this.iframe,
                O;
            P && (O = this.element.parentNode, O != P.parentNode && this._addToParent(O, P), P.style.display = "block")
        },
        hideIframe: function () {
            this.iframe && (this.iframe.style.display = "none")
        },
        syncIframe: function () {
            var O = this.iframe,
                Q = this.element,
                S = B.IFRAME_OFFSET,
                P = S * 2,
                R;
            O && (O.style.width = Q.offsetWidth + P + "px", O.style.height = Q.offsetHeight + P + "px", R = this.cfg.getProperty("xy"), (!I.isArray(R) || isNaN(R[0]) || isNaN(R[1])) && (this.syncPosition(), R = this.cfg.getProperty("xy")), F.setXY(O, [R[0] - S, R[1] - S]))
        },
        stackIframe: function () {
            if (this.iframe) {
                var O = F.getStyle(this.element, "zIndex");
                YAHOO.lang.isUndefined(O) || isNaN(O) || F.setStyle(this.iframe, "zIndex", O - 1)
            }
        },
        configIframe: function (R, Q) {
            function T() {
                var V = this.iframe,
                    W = this.element,
                    X, U;
                V || (J || (J = document.createElement("iframe"), this.isSecure && (J.src = B.IFRAME_SRC), K.ie ? (J.style.filter = "alpha(opacity=0)", J.frameBorder = 0) : J.style.opacity = "0", J.style.position = "absolute", J.style.border = "none", J.style.margin = "0", J.style.padding = "0", J.style.display = "none", J.tabIndex = -1), V = J.cloneNode(!1), X = W.parentNode, U = X || document.body, this._addToParent(U, V), this.iframe = V);
                this.showIframe();
                this.syncIframe();
                this.stackIframe();
                this._hasIframeEventListeners || (this.showEvent.subscribe(this.showIframe), this.hideEvent.subscribe(this.hideIframe), this.changeContentEvent.subscribe(this.syncIframe), this._hasIframeEventListeners = !0)
            }

            function P() {
                T.call(this);
                this.beforeShowEvent.unsubscribe(P);
                this._iframeDeferred = !1
            }
            var O = Q[0];
            O ? this.cfg.getProperty("visible") ? T.call(this) : this._iframeDeferred || (this.beforeShowEvent.subscribe(P), this._iframeDeferred = !0) : (this.hideIframe(), this._hasIframeEventListeners && (this.showEvent.unsubscribe(this.showIframe), this.hideEvent.unsubscribe(this.hideIframe), this.changeContentEvent.unsubscribe(this.syncIframe), this._hasIframeEventListeners = !1))
        },
        _primeXYFromDOM: function () {
            YAHOO.lang.isUndefined(this.cfg.getProperty("xy")) && (this.syncPosition(), this.cfg.refireEvent("xy"), this.beforeShowEvent.unsubscribe(this._primeXYFromDOM))
        },
        configConstrainToViewport: function (P, O) {
            var R = O[0];
            R ? (D.alreadySubscribed(this.beforeMoveEvent, this.enforceConstraints, this) || this.beforeMoveEvent.subscribe(this.enforceConstraints, this, !0), D.alreadySubscribed(this.beforeShowEvent, this._primeXYFromDOM) || this.beforeShowEvent.subscribe(this._primeXYFromDOM)) : (this.beforeShowEvent.unsubscribe(this._primeXYFromDOM), this.beforeMoveEvent.unsubscribe(this.enforceConstraints, this))
        },
        configContext: function (T, S) {
            var W = S[0],
                Q, O, U, R, V = this.CONTEXT_TRIGGERS;
            W && (Q = W[0], O = W[1], U = W[2], R = W[3], V && V.length > 0 && (R = (R || []).concat(V)), Q && (typeof Q == "string" && this.cfg.setProperty("context", [document.getElementById(Q), O, U, R], !0), O && U && this.align(O, U), this._contextTriggers && this._processTriggers(this._contextTriggers, E, this._alignOnTrigger), R && (this._processTriggers(R, H, this._alignOnTrigger), this._contextTriggers = R)))
        },
        _alignOnTrigger: function () {
            this.align()
        },
        _findTriggerCE: function (O) {
            var P = null;
            return O instanceof M ? P = O : B._TRIGGER_MAP[O] && (P = B._TRIGGER_MAP[O]), P
        },
        _processTriggers: function (S, U, R) {
            for (var Q, T, P = 0, O = S.length; P < O; ++P) Q = S[P], T = this._findTriggerCE(Q), T ? T[U](R, this, !0) : this[U](Q, R)
        },
        align: function (P, O) {
            function Q(W, X) {
                switch (P) {
                case B.TOP_LEFT:
                    T.moveTo(X, W);
                    break;
                case B.TOP_RIGHT:
                    T.moveTo(X - R.offsetWidth, W);
                    break;
                case B.BOTTOM_LEFT:
                    T.moveTo(X, W - R.offsetHeight);
                    break;
                case B.BOTTOM_RIGHT:
                    T.moveTo(X - R.offsetWidth, W - R.offsetHeight)
                }
            }
            var U = this.cfg.getProperty("context"),
                T = this,
                S, R, V;
            if (U && (S = U[0], R = this.element, T = this, P || (P = U[1]), O || (O = U[2]), R && S)) {
                V = F.getRegion(S);
                switch (O) {
                case B.TOP_LEFT:
                    Q(V.top, V.left);
                    break;
                case B.TOP_RIGHT:
                    Q(V.top, V.right);
                    break;
                case B.BOTTOM_LEFT:
                    Q(V.bottom, V.left);
                    break;
                case B.BOTTOM_RIGHT:
                    Q(V.bottom, V.right)
                }
            }
        },
        enforceConstraints: function (P, O) {
            var S = O[0],
                R = this.getConstrainedXY(S[0], S[1]);
            this.cfg.setProperty("x", R[0], !0);
            this.cfg.setProperty("y", R[1], !0);
            this.cfg.setProperty("xy", R, !0)
        },
        getConstrainedX: function (V) {
            var S = this,
                O = S.element,
                e = O.offsetWidth,
                c = B.VIEWPORT_OFFSET,
                h = F.getViewportWidth(),
                d = F.getDocumentScrollLeft(),
                Y = e + c < h,
                b = this.cfg.getProperty("context"),
                Q, X, j, T = !1,
                f, W, g = d + c,
                P = d + h - e - c,
                i = V,
                Z = function () {
                    var k;
                    return k = S.cfg.getProperty("x") - d > X ? X - e : X + j, S.cfg.setProperty("x", k + d, !0), k
                },
                R = function () {
                    return S.cfg.getProperty("x") - d > X ? W - c : f - c
                },
                a = function () {
                    var k = R(),
                        l;
                    return e > k && (T ? Z() : (Z(), T = !0, l = a())), l
                };
            return (V < g || V > P) && (Y ? this.cfg.getProperty("preventcontextoverlap") && b && {
                tltr: !0,
                blbr: !0,
                brbl: !0,
                trtl: !0
            }[b[1] + b[2]] ? (Q = b[0], X = F.getX(Q) - d, j = Q.offsetWidth, f = X, W = h - (X + j), a(), i = this.cfg.getProperty("x")) : V < g ? i = g : V > P && (i = P) : i = c + d), i
        },
        getConstrainedY: function (Z) {
            var W = this,
                P = W.element,
                i = P.offsetHeight,
                h = B.VIEWPORT_OFFSET,
                d = F.getViewportHeight(),
                g = F.getDocumentScrollTop(),
                e = i + h < d,
                f = this.cfg.getProperty("context"),
                U, a, b, X = !1,
                V, Q, c = g + h,
                S = g + d - i - h,
                O = Z,
                T = function () {
                    var k;
                    return k = W.cfg.getProperty("y") - g > a ? a - i : a + b, W.cfg.setProperty("y", k + g, !0), k
                },
                R = function () {
                    return W.cfg.getProperty("y") - g > a ? Q - h : V - h
                },
                j = function () {
                    var l = R(),
                        k;
                    return i > l && (X ? T() : (T(), X = !0, k = j())), k
                };
            return (Z < c || Z > S) && (e ? this.cfg.getProperty("preventcontextoverlap") && f && {
                trbr: !0,
                tlbl: !0,
                bltl: !0,
                brtr: !0
            }[f[1] + f[2]] ? (U = f[0], b = U.offsetHeight, a = F.getY(U) - g, V = a, Q = d - (a + b), j(), O = W.cfg.getProperty("y")) : Z < c ? O = c : Z > S && (O = S) : O = h + g), O
        },
        getConstrainedXY: function (O, P) {
            return [this.getConstrainedX(O), this.getConstrainedY(P)]
        },
        center: function () {
            var R = B.VIEWPORT_OFFSET,
                S = this.element.offsetWidth,
                Q = this.element.offsetHeight,
                P = F.getViewportWidth(),
                T = F.getViewportHeight(),
                O, U;
            O = S < P ? P / 2 - S / 2 + F.getDocumentScrollLeft() : R + F.getDocumentScrollLeft();
            U = Q < T ? T / 2 - Q / 2 + F.getDocumentScrollTop() : R + F.getDocumentScrollTop();
            this.cfg.setProperty("xy", [parseInt(O, 10), parseInt(U, 10)]);
            this.cfg.refireEvent("iframe");
            K.webkit && this.forceContainerRedraw()
        },
        syncPosition: function () {
            var O = F.getXY(this.element);
            this.cfg.setProperty("x", O[0], !0);
            this.cfg.setProperty("y", O[1], !0);
            this.cfg.setProperty("xy", O, !0)
        },
        onDomResize: function (Q, P) {
            var O = this;
            B.superclass.onDomResize.call(this, Q, P);
            setTimeout(function () {
                O.syncPosition();
                O.cfg.refireEvent("iframe");
                O.cfg.refireEvent("context")
            }, 0)
        },
        _getComputedHeight: function () {
            return document.defaultView && document.defaultView.getComputedStyle ? function (P) {
                var O = null,
                    Q;
                return P.ownerDocument && P.ownerDocument.defaultView && (Q = P.ownerDocument.defaultView.getComputedStyle(P, ""), Q && (O = parseInt(Q.height, 10))), I.isNumber(O) ? O : null
            } : function (P) {
                var O = null;
                return P.style.pixelHeight && (O = P.style.pixelHeight), I.isNumber(O) ? O : null
            }
        }(),
        _validateAutoFillHeight: function (O) {
            return !O || I.isString(O) && B.STD_MOD_RE.test(O)
        },
        _autoFillOnHeightChange: function (R, P, Q) {
            var O = this.cfg.getProperty("height");
            (O && O !== "auto" || O === 0) && this.fillHeight(Q)
        },
        _getPreciseHeight: function (P) {
            var O = P.offsetHeight,
                Q;
            return P.getBoundingClientRect && (Q = P.getBoundingClientRect(), O = Q.bottom - Q.top), O
        },
        fillHeight: function (R) {
            var U, S;
            if (R) {
                var P = this.innerElement || this.element,
                    O = [this.header, this.body, this.footer],
                    V, W = 0,
                    X = 0,
                    T = 0,
                    Q = !1;
                for (U = 0, S = O.length; U < S; U++) V = O[U], V && (R !== V ? X += this._getPreciseHeight(V) : Q = !0);
                Q && ((K.ie || K.opera) && F.setStyle(R, "height", "0px"), W = this._getComputedHeight(P), W === null && (F.addClass(P, "yui-override-padding"), W = P.clientHeight, F.removeClass(P, "yui-override-padding")), T = Math.max(W - X, 0), F.setStyle(R, "height", T + "px"), R.offsetHeight != T && (T = Math.max(T - (R.offsetHeight - T), 0)), F.setStyle(R, "height", T + "px"))
            }
        },
        bringToTop: function () {
            function V(Z, Y) {
                var b = F.getStyle(Z, "zIndex"),
                    a = F.getStyle(Y, "zIndex"),
                    X = !b || isNaN(b) ? 0 : parseInt(b, 10),
                    W = !a || isNaN(a) ? 0 : parseInt(a, 10);
                return X > W ? -1 : X < W ? 1 : 0
            }

            function Q(Y) {
                var X = F.hasClass(Y, B.CSS_OVERLAY),
                    W = YAHOO.widget.Panel;
                X && !F.isAncestor(R, Y) && (S[S.length] = W && F.hasClass(Y, W.CSS_PANEL) ? Y.parentNode : Y)
            }
            var S = [],
                R = this.element,
                O, U, T, P;
            F.getElementsBy(Q, "DIV", document.body);
            S.sort(V);
            O = S[0];
            O && (U = F.getStyle(O, "zIndex"), isNaN(U) || (T = !1, O != R ? T = !0 : S.length > 1 && (P = F.getStyle(S[1], "zIndex"), isNaN(P) || U != P || (T = !0)), T && this.cfg.setProperty("zindex", parseInt(U, 10) + 2)))
        },
        destroy: function () {
            this.iframe && this.iframe.parentNode.removeChild(this.iframe);
            this.iframe = null;
            B.windowResizeEvent.unsubscribe(this.doCenterOnDOMEvent, this);
            B.windowScrollEvent.unsubscribe(this.doCenterOnDOMEvent, this);
            G.textResizeEvent.unsubscribe(this._autoFillOnHeightChange);
            B.superclass.destroy.call(this)
        },
        forceContainerRedraw: function () {
            var O = this;
            F.addClass(O.element, "yui-force-redraw");
            setTimeout(function () {
                F.removeClass(O.element, "yui-force-redraw")
            }, 0)
        },
        toString: function () {
            return "Overlay " + this.id
        }
    })
}(),
function () {
    YAHOO.widget.OverlayManager = function (G) {
        this.init(G)
    };
    var D = YAHOO.widget.Overlay,
        C = YAHOO.util.Event,
        E = YAHOO.util.Dom,
        B = YAHOO.util.Config,
        F = YAHOO.util.CustomEvent,
        A = YAHOO.widget.OverlayManager;
    A.CSS_FOCUSED = "focused";
    A.prototype = {
        constructor: A,
        overlays: null,
        initDefaultConfig: function () {
            this.cfg.addProperty("overlays", {
                suppressEvent: !0
            });
            this.cfg.addProperty("focusevent", {
                value: "mousedown"
            })
        },
        init: function (I) {
            var H, G;
            this.cfg = new B(this);
            this.initDefaultConfig();
            I && this.cfg.applyConfig(I, !0);
            this.cfg.fireQueue();
            H = null;
            this.getActive = function () {
                return H
            };
            this.focus = function (J) {
                var K = this.find(J);
                K && K.focus()
            };
            this.remove = function (K) {
                var M = this.find(K),
                    J, L;
                M && (H == M && (H = null), L = M.element === null && M.cfg === null ? !0 : !1, L || (J = E.getStyle(M.element, "zIndex"), M.cfg.setProperty("zIndex", -1e3, !0)), this.overlays.sort(this.compareZIndexDesc), this.overlays = this.overlays.slice(0, this.overlays.length - 1), M.hideEvent.unsubscribe(M.blur), M.destroyEvent.unsubscribe(this._onOverlayDestroy, M), M.focusEvent.unsubscribe(this._onOverlayFocusHandler, M), M.blurEvent.unsubscribe(this._onOverlayBlurHandler, M), L || (C.removeListener(M.element, this.cfg.getProperty("focusevent"), this._onOverlayElementFocus), M.cfg.setProperty("zIndex", J, !0), M.cfg.setProperty("manager", null)), M.focusEvent._managed && (M.focusEvent = null), M.blurEvent._managed && (M.blurEvent = null), M.focus._managed && (M.focus = null), M.blur._managed && (M.blur = null))
            };
            this.blurAll = function () {
                var K = this.overlays.length,
                    J;
                if (K > 0) {
                    J = K - 1;
                    do this.overlays[J].blur(); while (J--)
                }
            };
            this._manageBlur = function (J) {
                var K = !1;
                return H == J && (E.removeClass(H.element, A.CSS_FOCUSED), H = null, K = !0), K
            };
            this._manageFocus = function (J) {
                var K = !1;
                return H != J && (H && H.blur(), H = J, this.bringToTop(H), E.addClass(H.element, A.CSS_FOCUSED), K = !0), K
            };
            G = this.cfg.getProperty("overlays");
            this.overlays || (this.overlays = []);
            G && (this.register(G), this.overlays.sort(this.compareZIndexDesc))
        },
        _onOverlayElementFocus: function (I) {
            var G = C.getTarget(I),
                H = this.close;
            H && (G == H || E.isAncestor(H, G)) ? this.blur() : this.focus()
        },
        _onOverlayDestroy: function (H, G, I) {
            this.remove(I)
        },
        _onOverlayFocusHandler: function (H, G, I) {
            this._manageFocus(I)
        },
        _onOverlayBlurHandler: function (H, G, I) {
            this._manageBlur(I)
        },
        _bindFocus: function (G) {
            var H = this;
            if (G.focusEvent ? G.focusEvent.subscribe(H._onOverlayFocusHandler, G, H) : (G.focusEvent = G.createEvent("focus"), G.focusEvent.signature = F.LIST, G.focusEvent._managed = !0), !G.focus) {
                C.on(G.element, H.cfg.getProperty("focusevent"), H._onOverlayElementFocus, null, G);
                G.focus = function () {
                    H._manageFocus(this) && (this.cfg.getProperty("visible") && this.focusFirst && this.focusFirst(), this.focusEvent.fire())
                };
                G.focus._managed = !0
            }
        },
        _bindBlur: function (G) {
            var H = this;
            G.blurEvent ? G.blurEvent.subscribe(H._onOverlayBlurHandler, G, H) : (G.blurEvent = G.createEvent("blur"), G.blurEvent.signature = F.LIST, G.focusEvent._managed = !0);
            G.blur || (G.blur = function () {
                H._manageBlur(this) && this.blurEvent.fire()
            }, G.blur._managed = !0);
            G.hideEvent.subscribe(G.blur)
        },
        _bindDestroy: function (G) {
            var H = this;
            G.destroyEvent.subscribe(H._onOverlayDestroy, G, H)
        },
        _syncZIndex: function (G) {
            var H = E.getStyle(G.element, "zIndex");
            isNaN(H) ? G.cfg.setProperty("zIndex", 0) : G.cfg.setProperty("zIndex", parseInt(H, 10))
        },
        register: function (G) {
            var J = !1,
                H, I;
            if (G instanceof D) G.cfg.addProperty("manager", {
                value: this
            }), this._bindFocus(G), this._bindBlur(G), this._bindDestroy(G), this._syncZIndex(G), this.overlays.push(G), this.bringToTop(G), J = !0;
            else if (G instanceof Array)
                for (H = 0, I = G.length; H < I; H++) J = this.register(G[H]) || J;
            return J
        },
        bringToTop: function (M) {
            var I = this.find(M),
                L, G, J, K, H;
            I && (J = this.overlays, J.sort(this.compareZIndexDesc), G = J[0], G && (L = E.getStyle(G.element, "zIndex"), isNaN(L) || (K = !1, G !== I ? K = !0 : J.length > 1 && (H = E.getStyle(J[1].element, "zIndex"), isNaN(H) || L != H || (K = !0)), K && I.cfg.setProperty("zindex", parseInt(L, 10) + 2)), J.sort(this.compareZIndexDesc)))
        },
        find: function (G) {
            var K = G instanceof D,
                I = this.overlays,
                M = I.length,
                J = null,
                L, H;
            if (K || typeof G == "string")
                for (H = M - 1; H >= 0; H--)
                    if (L = I[H], K && L === G || L.id == G) {
                        J = L;
                        break
                    }
            return J
        },
        compareZIndexDesc: function (J, I) {
            var H = J.cfg ? J.cfg.getProperty("zIndex") : null,
                G = I.cfg ? I.cfg.getProperty("zIndex") : null;
            return H === null && G === null ? 0 : H === null ? 1 : G === null ? -1 : H > G ? -1 : H < G ? 1 : 0
        },
        showAll: function () {
            for (var H = this.overlays, I = H.length, G = I - 1; G >= 0; G--) H[G].show()
        },
        hideAll: function () {
            for (var H = this.overlays, I = H.length, G = I - 1; G >= 0; G--) H[G].hide()
        },
        toString: function () {
            return "OverlayManager"
        }
    }
}(),
function () {
    function K(Q, O) {
        var P = this.cfg,
            R = P.getProperty("width");
        R == O && P.setProperty("width", Q)
    }

    function D() {
        "_originalWidth" in this && K.call(this, this._originalWidth, this._forcedWidth);
        var Q = document.body,
            U = this.cfg,
            T = U.getProperty("width"),
            R, S;
        (!T || T == "auto") && (U.getProperty("container") != Q || U.getProperty("x") >= C.getViewportWidth() || U.getProperty("y") >= C.getViewportHeight()) && (S = this.element.cloneNode(!0), S.style.visibility = "hidden", S.style.top = "0px", S.style.left = "0px", Q.appendChild(S), R = S.offsetWidth + "px", Q.removeChild(S), S = null, U.setProperty("width", R), U.refireEvent("xy"), this._originalWidth = T || "", this._forcedWidth = R)
    }

    function B(P, O, Q) {
        this.render(Q)
    }

    function L() {
        N.onDOMReady(B, this.cfg.getProperty("container"), this)
    }
    YAHOO.widget.Tooltip = function (P, O) {
        YAHOO.widget.Tooltip.superclass.constructor.call(this, P, O)
    };
    var E = YAHOO.lang,
        N = YAHOO.util.Event,
        M = YAHOO.util.CustomEvent,
        C = YAHOO.util.Dom,
        J = YAHOO.widget.Tooltip,
        H = YAHOO.env.ua,
        G = H.ie && (H.ie <= 6 || document.compatMode == "BackCompat"),
        F, I = {
            PREVENT_OVERLAP: {
                key: "preventoverlap",
                value: !0,
                validator: E.isBoolean,
                supercedes: ["x", "y", "xy"]
            },
            SHOW_DELAY: {
                key: "showdelay",
                value: 200,
                validator: E.isNumber
            },
            AUTO_DISMISS_DELAY: {
                key: "autodismissdelay",
                value: 5e3,
                validator: E.isNumber
            },
            HIDE_DELAY: {
                key: "hidedelay",
                value: 250,
                validator: E.isNumber
            },
            TEXT: {
                key: "text",
                suppressEvent: !0
            },
            CONTAINER: {
                key: "container"
            },
            DISABLED: {
                key: "disabled",
                value: !1,
                suppressEvent: !0
            }
        },
        A = {
            CONTEXT_MOUSE_OVER: "contextMouseOver",
            CONTEXT_MOUSE_OUT: "contextMouseOut",
            CONTEXT_TRIGGER: "contextTrigger"
        };
    J.CSS_TOOLTIP = "yui-tt";
    YAHOO.extend(J, YAHOO.widget.Overlay, {
        init: function (P, O) {
            J.superclass.init.call(this, P);
            this.beforeInitEvent.fire(J);
            C.addClass(this.element, J.CSS_TOOLTIP);
            O && this.cfg.applyConfig(O, !0);
            this.cfg.queueProperty("visible", !1);
            this.cfg.queueProperty("constraintoviewport", !0);
            this.setBody("");
            this.subscribe("changeContent", D);
            this.subscribe("init", L);
            this.subscribe("render", this.onRender);
            this.initEvent.fire(J)
        },
        initEvents: function () {
            J.superclass.initEvents.call(this);
            var O = M.LIST;
            this.contextMouseOverEvent = this.createEvent(A.CONTEXT_MOUSE_OVER);
            this.contextMouseOverEvent.signature = O;
            this.contextMouseOutEvent = this.createEvent(A.CONTEXT_MOUSE_OUT);
            this.contextMouseOutEvent.signature = O;
            this.contextTriggerEvent = this.createEvent(A.CONTEXT_TRIGGER);
            this.contextTriggerEvent.signature = O
        },
        initDefaultConfig: function () {
            J.superclass.initDefaultConfig.call(this);
            this.cfg.addProperty(I.PREVENT_OVERLAP.key, {
                value: I.PREVENT_OVERLAP.value,
                validator: I.PREVENT_OVERLAP.validator,
                supercedes: I.PREVENT_OVERLAP.supercedes
            });
            this.cfg.addProperty(I.SHOW_DELAY.key, {
                handler: this.configShowDelay,
                value: 200,
                validator: I.SHOW_DELAY.validator
            });
            this.cfg.addProperty(I.AUTO_DISMISS_DELAY.key, {
                handler: this.configAutoDismissDelay,
                value: I.AUTO_DISMISS_DELAY.value,
                validator: I.AUTO_DISMISS_DELAY.validator
            });
            this.cfg.addProperty(I.HIDE_DELAY.key, {
                handler: this.configHideDelay,
                value: I.HIDE_DELAY.value,
                validator: I.HIDE_DELAY.validator
            });
            this.cfg.addProperty(I.TEXT.key, {
                handler: this.configText,
                suppressEvent: I.TEXT.suppressEvent
            });
            this.cfg.addProperty(I.CONTAINER.key, {
                handler: this.configContainer,
                value: document.body
            });
            this.cfg.addProperty(I.DISABLED.key, {
                handler: this.configContainer,
                value: I.DISABLED.value,
                supressEvent: I.DISABLED.suppressEvent
            })
        },
        configText: function (P, O) {
            var R = O[0];
            R && this.setBody(R)
        },
        configContainer: function (Q, P) {
            var O = P[0];
            typeof O == "string" && this.cfg.setProperty("container", document.getElementById(O), !0)
        },
        _removeEventListeners: function () {
            var R = this._context,
                O, Q, P;
            if (R && (O = R.length, O > 0)) {
                P = O - 1;
                do Q = R[P], N.removeListener(Q, "mouseover", this.onContextMouseOver), N.removeListener(Q, "mousemove", this.onContextMouseMove), N.removeListener(Q, "mouseout", this.onContextMouseOut); while (P--)
            }
        },
        configContext: function (T, P) {
            var S = P[0],
                V, O, R, Q;
            if (S && (S instanceof Array || (typeof S == "string" ? this.cfg.setProperty("context", [document.getElementById(S)], !0) : this.cfg.setProperty("context", [S], !0), S = this.cfg.getProperty("context")), this._removeEventListeners(), this._context = S, V = this._context, V && (O = V.length, O > 0))) {
                Q = O - 1;
                do {
                    R = V[Q];
                    N.on(R, "mouseover", this.onContextMouseOver, this);
                    N.on(R, "mousemove", this.onContextMouseMove, this);
                    N.on(R, "mouseout", this.onContextMouseOut, this)
                } while (Q--)
            }
        },
        onContextMouseMove: function (P, O) {
            O.pageX = N.getPageX(P);
            O.pageY = N.getPageY(P)
        },
        onContextMouseOver: function (Q, P) {
            var O = this;
            if (O.title && (P._tempTitle = O.title, O.title = ""), P.fireEvent("contextMouseOver", O, Q) !== !1 && !P.cfg.getProperty("disabled")) {
                P.hideProcId && (clearTimeout(P.hideProcId), P.hideProcId = null);
                N.on(O, "mousemove", P.onContextMouseMove, P);
                P.showProcId = P.doShow(Q, O)
            }
        },
        onContextMouseOut: function (Q, P) {
            var O = this;
            P._tempTitle && (O.title = P._tempTitle, P._tempTitle = null);
            P.showProcId && (clearTimeout(P.showProcId), P.showProcId = null);
            P.hideProcId && (clearTimeout(P.hideProcId), P.hideProcId = null);
            P.fireEvent("contextMouseOut", O, Q);
            P.hideProcId = setTimeout(function () {
                P.hide()
            }, P.cfg.getProperty("hidedelay"))
        },
        doShow: function (Q, O) {
            var R = 25,
                P = this;
            return H.opera && O.tagName && O.tagName.toUpperCase() == "A" && (R += 12), setTimeout(function () {
                var S = P.cfg.getProperty("text");
                P._tempTitle && (S === "" || YAHOO.lang.isUndefined(S) || YAHOO.lang.isNull(S)) ? P.setBody(P._tempTitle) : P.cfg.refireEvent("text");
                P.moveTo(P.pageX, P.pageY + R);
                P.cfg.getProperty("preventoverlap") && P.preventOverlap(P.pageX, P.pageY);
                N.removeListener(O, "mousemove", P.onContextMouseMove);
                P.contextTriggerEvent.fire(O);
                P.show();
                P.hideProcId = P.doHide()
            }, this.cfg.getProperty("showdelay"))
        },
        doHide: function () {
            var O = this;
            return setTimeout(function () {
                O.hide()
            }, this.cfg.getProperty("autodismissdelay"))
        },
        preventOverlap: function (S, R) {
            var O = this.element.offsetHeight,
                Q = new YAHOO.util.Point(S, R),
                P = C.getRegion(this.element);
            P.top -= 5;
            P.left -= 5;
            P.right += 5;
            P.bottom += 5;
            P.contains(Q) && this.cfg.setProperty("y", R - O - 5)
        },
        onRender: function () {
            function T() {
                var W = this.element,
                    V = this.underlay;
                V && (V.style.width = W.offsetWidth + 6 + "px", V.style.height = W.offsetHeight + 1 + "px")
            }

            function P() {
                C.addClass(this.underlay, "yui-tt-shadow-visible");
                H.ie && this.forceUnderlayRedraw()
            }

            function O() {
                C.removeClass(this.underlay, "yui-tt-shadow-visible")
            }

            function U() {
                var X = this.underlay,
                    W, V, Z, Y;
                X || (W = this.element, V = YAHOO.widget.Module, Z = H.ie, Y = this, F || (F = document.createElement("div"), F.className = "yui-tt-shadow"), X = F.cloneNode(!1), W.appendChild(X), this.underlay = X, this._shadow = this.underlay, P.call(this), this.subscribe("beforeShow", P), this.subscribe("hide", O), G && (window.setTimeout(function () {
                    T.call(Y)
                }, 0), this.cfg.subscribeToConfigEvent("width", T), this.cfg.subscribeToConfigEvent("height", T), this.subscribe("changeContent", T), V.textResizeEvent.subscribe(T, this, !0), this.subscribe("destroy", function () {
                    V.textResizeEvent.unsubscribe(T, this)
                })))
            }

            function Q() {
                U.call(this);
                this.unsubscribe("beforeShow", Q)
            }
            this.cfg.getProperty("visible") ? U.call(this) : this.subscribe("beforeShow", Q)
        },
        forceUnderlayRedraw: function () {
            var O = this;
            C.addClass(O.underlay, "yui-force-redraw");
            setTimeout(function () {
                C.removeClass(O.underlay, "yui-force-redraw")
            }, 0)
        },
        destroy: function () {
            this._removeEventListeners();
            J.superclass.destroy.call(this)
        },
        toString: function () {
            return "Tooltip " + this.id
        }
    })
}(),
function () {
    function J() {
        !this.header && this.cfg.getProperty("draggable") && this.setHeader("&#160;")
    }

    function R(V, U, W) {
        var Z = W[0],
            X = W[1],
            Y = this.cfg,
            a = Y.getProperty("width");
        a == X && Y.setProperty("width", Z);
        this.unsubscribe("hide", R, W)
    }

    function B() {
        var Y, X, W;
        P && (Y = this.cfg, X = Y.getProperty("width"), X && X != "auto" || (W = this.element.offsetWidth + "px", Y.setProperty("width", W), this.subscribe("hide", R, [X || "", W])))
    }
    YAHOO.widget.Panel = function (V, U) {
        YAHOO.widget.Panel.superclass.constructor.call(this, V, U)
    };
    var S = null,
        E = YAHOO.lang,
        F = YAHOO.util,
        A = F.Dom,
        T = F.Event,
        M = F.CustomEvent,
        K = YAHOO.util.KeyListener,
        I = F.Config,
        H = YAHOO.widget.Overlay,
        O = YAHOO.widget.Panel,
        L = YAHOO.env.ua,
        P = L.ie && (L.ie <= 6 || document.compatMode == "BackCompat"),
        G, Q, C, D = {
            SHOW_MASK: "showMask",
            HIDE_MASK: "hideMask",
            DRAG: "drag"
        },
        N = {
            CLOSE: {
                key: "close",
                value: !0,
                validator: E.isBoolean,
                supercedes: ["visible"]
            },
            DRAGGABLE: {
                key: "draggable",
                value: F.DD ? !0 : !1,
                validator: E.isBoolean,
                supercedes: ["visible"]
            },
            DRAG_ONLY: {
                key: "dragonly",
                value: !1,
                validator: E.isBoolean,
                supercedes: ["draggable"]
            },
            UNDERLAY: {
                key: "underlay",
                value: "shadow",
                supercedes: ["visible"]
            },
            MODAL: {
                key: "modal",
                value: !1,
                validator: E.isBoolean,
                supercedes: ["visible", "zindex"]
            },
            KEY_LISTENERS: {
                key: "keylisteners",
                suppressEvent: !0,
                supercedes: ["visible"]
            },
            STRINGS: {
                key: "strings",
                supercedes: ["close"],
                validator: E.isObject,
                value: {
                    close: "Close"
                }
            }
        };
    O.CSS_PANEL = "yui-panel";
    O.CSS_PANEL_CONTAINER = "yui-panel-container";
    O.FOCUSABLE = ["a", "button", "select", "textarea", "input", "iframe"];
    YAHOO.extend(O, H, {
        init: function (V, U) {
            O.superclass.init.call(this, V);
            this.beforeInitEvent.fire(O);
            A.addClass(this.element, O.CSS_PANEL);
            this.buildWrapper();
            U && this.cfg.applyConfig(U, !0);
            this.subscribe("showMask", this._addFocusHandlers);
            this.subscribe("hideMask", this._removeFocusHandlers);
            this.subscribe("beforeRender", J);
            this.subscribe("render", function () {
                this.setFirstLastFocusable();
                this.subscribe("changeContent", this.setFirstLastFocusable)
            });
            this.subscribe("show", this.focusFirst);
            this.initEvent.fire(O)
        },
        _onElementFocus: function (Z) {
            if (S === this) {
                var Y = T.getTarget(Z),
                    X = document.documentElement,
                    V = Y !== X && Y !== window;
                if (V && Y !== this.element && Y !== this.mask && !A.isAncestor(this.element, Y)) try {
                    this.firstElement ? this.firstElement.focus() : this._modalFocus ? this._modalFocus.focus() : this.innerElement.focus()
                } catch (W) {
                    try {
                        V && Y !== document.body && Y.blur()
                    } catch (U) {}
                }
            }
        },
        _addFocusHandlers: function () {
            this.firstElement || (L.webkit || L.opera ? this._modalFocus || this._createHiddenFocusElement() : this.innerElement.tabIndex = 0);
            this.setTabLoop(this.firstElement, this.lastElement);
            T.onFocus(document.documentElement, this._onElementFocus, this, !0);
            S = this
        },
        _createHiddenFocusElement: function () {
            var U = document.createElement("button");
            U.style.height = "1px";
            U.style.width = "1px";
            U.style.position = "absolute";
            U.style.left = "-10000em";
            U.style.opacity = 0;
            U.tabIndex = -1;
            this.innerElement.appendChild(U);
            this._modalFocus = U
        },
        _removeFocusHandlers: function () {
            T.removeFocusListener(document.documentElement, this._onElementFocus, this);
            S == this && (S = null)
        },
        focusFirst: function (W, U) {
            var V = this.firstElement;
            if (U && U[1] && T.stopEvent(U[1]), V) try {
                V.focus()
            } catch (X) {}
        },
        focusLast: function (W, U) {
            var V = this.lastElement;
            if (U && U[1] && T.stopEvent(U[1]), V) try {
                V.focus()
            } catch (X) {}
        },
        setTabLoop: function (X, Z) {
            var V = this.preventBackTab,
                W = this.preventTabOut,
                U = this.showEvent,
                Y = this.hideEvent;
            V && (V.disable(), U.unsubscribe(V.enable, V), Y.unsubscribe(V.disable, V), V = this.preventBackTab = null);
            W && (W.disable(), U.unsubscribe(W.enable, W), Y.unsubscribe(W.disable, W), W = this.preventTabOut = null);
            X && (this.preventBackTab = new K(X, {
                shift: !0,
                keys: 9
            }, {
                fn: this.focusLast,
                scope: this,
                correctScope: !0
            }), V = this.preventBackTab, U.subscribe(V.enable, V, !0), Y.subscribe(V.disable, V, !0));
            Z && (this.preventTabOut = new K(Z, {
                shift: !1,
                keys: 9
            }, {
                fn: this.focusFirst,
                scope: this,
                correctScope: !0
            }), W = this.preventTabOut, U.subscribe(W.enable, W, !0), Y.subscribe(W.disable, W, !0))
        },
        getFocusableElements: function (U) {
            function V(Y) {
                return Y.focus && Y.type !== "hidden" && !Y.disabled && X[Y.tagName.toLowerCase()] ? !0 : !1
            }
            var X, W;
            for (U = U || this.innerElement, X = {}, W = 0; W < O.FOCUSABLE.length; W++) X[O.FOCUSABLE[W]] = !0;
            return A.getElementsBy(V, null, U)
        },
        setFirstLastFocusable: function () {
            this.firstElement = null;
            this.lastElement = null;
            var U = this.getFocusableElements();
            this.focusableElements = U;
            U.length > 0 && (this.firstElement = U[0], this.lastElement = U[U.length - 1]);
            this.cfg.getProperty("modal") && this.setTabLoop(this.firstElement, this.lastElement)
        },
        initEvents: function () {
            O.superclass.initEvents.call(this);
            var U = M.LIST;
            this.showMaskEvent = this.createEvent(D.SHOW_MASK);
            this.showMaskEvent.signature = U;
            this.hideMaskEvent = this.createEvent(D.HIDE_MASK);
            this.hideMaskEvent.signature = U;
            this.dragEvent = this.createEvent(D.DRAG);
            this.dragEvent.signature = U
        },
        initDefaultConfig: function () {
            O.superclass.initDefaultConfig.call(this);
            this.cfg.addProperty(N.CLOSE.key, {
                handler: this.configClose,
                value: N.CLOSE.value,
                validator: N.CLOSE.validator,
                supercedes: N.CLOSE.supercedes
            });
            this.cfg.addProperty(N.DRAGGABLE.key, {
                handler: this.configDraggable,
                value: F.DD ? !0 : !1,
                validator: N.DRAGGABLE.validator,
                supercedes: N.DRAGGABLE.supercedes
            });
            this.cfg.addProperty(N.DRAG_ONLY.key, {
                value: N.DRAG_ONLY.value,
                validator: N.DRAG_ONLY.validator,
                supercedes: N.DRAG_ONLY.supercedes
            });
            this.cfg.addProperty(N.UNDERLAY.key, {
                handler: this.configUnderlay,
                value: N.UNDERLAY.value,
                supercedes: N.UNDERLAY.supercedes
            });
            this.cfg.addProperty(N.MODAL.key, {
                handler: this.configModal,
                value: N.MODAL.value,
                validator: N.MODAL.validator,
                supercedes: N.MODAL.supercedes
            });
            this.cfg.addProperty(N.KEY_LISTENERS.key, {
                handler: this.configKeyListeners,
                suppressEvent: N.KEY_LISTENERS.suppressEvent,
                supercedes: N.KEY_LISTENERS.supercedes
            });
            this.cfg.addProperty(N.STRINGS.key, {
                value: N.STRINGS.value,
                handler: this.configStrings,
                validator: N.STRINGS.validator,
                supercedes: N.STRINGS.supercedes
            })
        },
        configClose: function (X, V) {
            var Z = V[0],
                W = this.close,
                U = this.cfg.getProperty("strings");
            if (Z)
                if (W) W.style.display = "block";
                else {
                    C || (C = document.createElement("a"), C.className = "container-close", C.href = "#");
                    W = C.cloneNode(!0);
                    this.innerElement.appendChild(W);
                    W.innerHTML = U && U.close ? U.close : "&#160;";
                    T.on(W, "click", this._doClose, this, !0);
                    this.close = W
                }
            else W && (W.style.display = "none")
        },
        _doClose: function (U) {
            T.preventDefault(U);
            this.hide()
        },
        configDraggable: function (V, U) {
            var X = U[0];
            if (X) {
                if (!F.DD) {
                    this.cfg.setProperty("draggable", !1);
                    return
                }
                this.header && (A.setStyle(this.header, "cursor", "move"), this.registerDragDrop());
                this.subscribe("beforeShow", B)
            } else this.dd && this.dd.unreg(), this.header && A.setStyle(this.header, "cursor", "auto"), this.unsubscribe("beforeShow", B)
        },
        configUnderlay: function (d, c) {
            function X() {
                var f = !1;
                V || (Q || (Q = document.createElement("div"), Q.className = "underlay"), V = Q.cloneNode(!1), this.element.appendChild(V), this.underlay = V, P && (this.sizeUnderlay(), this.cfg.subscribeToConfigEvent("width", this.sizeUnderlay), this.cfg.subscribeToConfigEvent("height", this.sizeUnderlay), this.changeContentEvent.subscribe(this.sizeUnderlay), YAHOO.widget.Module.textResizeEvent.subscribe(this.sizeUnderlay, this, !0)), L.webkit && L.webkit < 420 && this.changeContentEvent.subscribe(this.forceUnderlayRedraw), f = !0)
            }

            function a() {
                var f = X.call(this);
                !f && P && this.sizeUnderlay();
                this._underlayDeferred = !1;
                this.beforeShowEvent.unsubscribe(a)
            }

            function Y() {
                this._underlayDeferred && (this.beforeShowEvent.unsubscribe(a), this._underlayDeferred = !1);
                V && (this.cfg.unsubscribeFromConfigEvent("width", this.sizeUnderlay), this.cfg.unsubscribeFromConfigEvent("height", this.sizeUnderlay), this.changeContentEvent.unsubscribe(this.sizeUnderlay), this.changeContentEvent.unsubscribe(this.forceUnderlayRedraw), YAHOO.widget.Module.textResizeEvent.unsubscribe(this.sizeUnderlay, this, !0), this.element.removeChild(V), this.underlay = null)
            }
            var b = this.platform == "mac" && L.gecko,
                e = c[0].toLowerCase(),
                V = this.underlay,
                W = this.element,
                U;
            switch (e) {
            case "shadow":
                A.removeClass(W, "matte");
                A.addClass(W, "shadow");
                break;
            case "matte":
                b || Y.call(this);
                A.removeClass(W, "shadow");
                A.addClass(W, "matte");
                break;
            default:
                b || Y.call(this);
                A.removeClass(W, "shadow");
                A.removeClass(W, "matte")
            }(e == "shadow" || b && !V) && (this.cfg.getProperty("visible") ? (U = X.call(this), !U && P && this.sizeUnderlay()) : this._underlayDeferred || (this.beforeShowEvent.subscribe(a), this._underlayDeferred = !0))
        },
        configModal: function (V, U) {
            var W = U[0];
            W ? this._hasModalityEventListeners || (this.subscribe("beforeShow", this.buildMask), this.subscribe("beforeShow", this.bringToTop), this.subscribe("beforeShow", this.showMask), this.subscribe("hide", this.hideMask), H.windowResizeEvent.subscribe(this.sizeMask, this, !0), this._hasModalityEventListeners = !0) : this._hasModalityEventListeners && (this.cfg.getProperty("visible") && (this.hideMask(), this.removeMask()), this.unsubscribe("beforeShow", this.buildMask), this.unsubscribe("beforeShow", this.bringToTop), this.unsubscribe("beforeShow", this.showMask), this.unsubscribe("hide", this.hideMask), H.windowResizeEvent.unsubscribe(this.sizeMask, this), this._hasModalityEventListeners = !1)
        },
        removeMask: function () {
            var V = this.mask,
                U;
            V && (this.hideMask(), U = V.parentNode, U && U.removeChild(V), this.mask = null)
        },
        configKeyListeners: function (X, U) {
            var W = U[0],
                Z, Y, V;
            if (W)
                if (W instanceof Array)
                    for (Y = W.length, V = 0; V < Y; V++) Z = W[V], I.alreadySubscribed(this.showEvent, Z.enable, Z) || this.showEvent.subscribe(Z.enable, Z, !0), I.alreadySubscribed(this.hideEvent, Z.disable, Z) || (this.hideEvent.subscribe(Z.disable, Z, !0), this.destroyEvent.subscribe(Z.disable, Z, !0));
                else I.alreadySubscribed(this.showEvent, W.enable, W) || this.showEvent.subscribe(W.enable, W, !0), I.alreadySubscribed(this.hideEvent, W.disable, W) || (this.hideEvent.subscribe(W.disable, W, !0), this.destroyEvent.subscribe(W.disable, W, !0))
        },
        configStrings: function (V, U) {
            var X = E.merge(N.STRINGS.value, U[0]);
            this.cfg.setProperty(N.STRINGS.key, X, !0)
        },
        configHeight: function (X, V) {
            var U = V[0],
                W = this.innerElement;
            A.setStyle(W, "height", U);
            this.cfg.refireEvent("iframe")
        },
        _autoFillOnHeightChange: function () {
            if (O.superclass._autoFillOnHeightChange.apply(this, arguments), P) {
                var U = this;
                setTimeout(function () {
                    U.sizeUnderlay()
                }, 0)
            }
        },
        configWidth: function (X, U) {
            var W = U[0],
                V = this.innerElement;
            A.setStyle(V, "width", W);
            this.cfg.refireEvent("iframe")
        },
        configzIndex: function (V, U, X) {
            if (O.superclass.configzIndex.call(this, V, U, X), this.mask || this.cfg.getProperty("modal") === !0) {
                var W = A.getStyle(this.element, "zIndex");
                (!W || isNaN(W)) && (W = 0);
                W === 0 ? this.cfg.setProperty("zIndex", 1) : this.stackMask()
            }
        },
        buildWrapper: function () {
            var W = this.element.parentNode,
                U = this.element,
                V = document.createElement("div");
            V.className = O.CSS_PANEL_CONTAINER;
            V.id = U.id + "_c";
            W && W.insertBefore(V, U);
            V.appendChild(U);
            this.element = V;
            this.innerElement = U;
            A.setStyle(this.innerElement, "visibility", "inherit")
        },
        sizeUnderlay: function () {
            var V = this.underlay,
                U;
            V && (U = this.element, V.style.width = U.offsetWidth + "px", V.style.height = U.offsetHeight + "px")
        },
        registerDragDrop: function () {
            var V = this,
                U;
            if (this.header) {
                if (!F.DD) return;
                U = this.cfg.getProperty("dragonly") === !0;
                this.dd = new F.DD(this.element.id, this.id, {
                    dragOnly: U
                });
                this.header.id || (this.header.id = this.id + "_h");
                this.dd.startDrag = function () {
                    var X, Z, W, c, b, a, Y;
                    YAHOO.env.ua.ie == 6 && A.addClass(V.element, "drag");
                    V.cfg.getProperty("constraintoviewport") ? (Y = H.VIEWPORT_OFFSET, X = V.element.offsetHeight, Z = V.element.offsetWidth, W = A.getViewportWidth(), c = A.getViewportHeight(), b = A.getDocumentScrollLeft(), a = A.getDocumentScrollTop(), X + Y < c ? (this.minY = a + Y, this.maxY = a + c - X - Y) : (this.minY = a + Y, this.maxY = a + Y), Z + Y < W ? (this.minX = b + Y, this.maxX = b + W - Z - Y) : (this.minX = b + Y, this.maxX = b + Y), this.constrainX = !0, this.constrainY = !0) : (this.constrainX = !1, this.constrainY = !1);
                    V.dragEvent.fire("startDrag", arguments)
                };
                this.dd.onDrag = function () {
                    V.syncPosition();
                    V.cfg.refireEvent("iframe");
                    this.platform == "mac" && YAHOO.env.ua.gecko && this.showMacGeckoScrollbars();
                    V.dragEvent.fire("onDrag", arguments)
                };
                this.dd.endDrag = function () {
                    YAHOO.env.ua.ie == 6 && A.removeClass(V.element, "drag");
                    V.dragEvent.fire("endDrag", arguments);
                    V.moveEvent.fire(V.cfg.getProperty("xy"))
                };
                this.dd.setHandleElId(this.header.id);
                this.dd.addInvalidHandleType("INPUT");
                this.dd.addInvalidHandleType("SELECT");
                this.dd.addInvalidHandleType("TEXTAREA")
            }
        },
        buildMask: function () {
            var U = this.mask;
            U || (G || (G = document.createElement("div"), G.className = "mask", G.innerHTML = "&#160;"), U = G.cloneNode(!0), U.id = this.id + "_mask", document.body.insertBefore(U, document.body.firstChild), this.mask = U, YAHOO.env.ua.gecko && this.platform == "mac" && A.addClass(this.mask, "block-scrollbars"), this.stackMask())
        },
        hideMask: function () {
            this.cfg.getProperty("modal") && this.mask && (this.mask.style.display = "none", A.removeClass(document.body, "masked"), this.hideMaskEvent.fire())
        },
        showMask: function () {
            this.cfg.getProperty("modal") && this.mask && (A.addClass(document.body, "masked"), this.sizeMask(), this.mask.style.display = "block", this.showMaskEvent.fire())
        },
        sizeMask: function () {
            if (this.mask) {
                var V = this.mask,
                    W = A.getViewportWidth(),
                    U = A.getViewportHeight();
                V.offsetHeight > U && (V.style.height = U + "px");
                V.offsetWidth > W && (V.style.width = W + "px");
                V.style.height = A.getDocumentHeight() + "px";
                V.style.width = A.getDocumentWidth() + "px"
            }
        },
        stackMask: function () {
            if (this.mask) {
                var U = A.getStyle(this.element, "zIndex");
                YAHOO.lang.isUndefined(U) || isNaN(U) || A.setStyle(this.mask, "zIndex", U - 1)
            }
        },
        render: function (U) {
            return O.superclass.render.call(this, U, this.innerElement)
        },
        destroy: function () {
            H.windowResizeEvent.unsubscribe(this.sizeMask, this);
            this.removeMask();
            this.close && T.purgeElement(this.close);
            O.superclass.destroy.call(this)
        },
        forceUnderlayRedraw: function () {
            var U = this.underlay;
            A.addClass(U, "yui-force-redraw");
            setTimeout(function () {
                A.removeClass(U, "yui-force-redraw")
            }, 0)
        },
        toString: function () {
            return "Panel " + this.id
        }
    })
}(),
function () {
    function D() {
        var L = this._aButtons,
            J, K, I;
        if (F.isArray(L) && (J = L.length, J > 0)) {
            I = J - 1;
            do K = L[I], YAHOO.widget.Button && K instanceof YAHOO.widget.Button ? K.destroy() : K.tagName.toUpperCase() == "BUTTON" && (B.purgeElement(K), B.purgeElement(K, !1)); while (I--)
        }
    }
    YAHOO.widget.Dialog = function (J, I) {
        YAHOO.widget.Dialog.superclass.constructor.call(this, J, I)
    };
    var B = YAHOO.util.Event,
        G = YAHOO.util.CustomEvent,
        E = YAHOO.util.Dom,
        A = YAHOO.widget.Dialog,
        F = YAHOO.lang,
        H = {
            BEFORE_SUBMIT: "beforeSubmit",
            SUBMIT: "submit",
            MANUAL_SUBMIT: "manualSubmit",
            ASYNC_SUBMIT: "asyncSubmit",
            FORM_SUBMIT: "formSubmit",
            CANCEL: "cancel"
        },
        C = {
            POST_METHOD: {
                key: "postmethod",
                value: "async"
            },
            POST_DATA: {
                key: "postdata",
                value: null
            },
            BUTTONS: {
                key: "buttons",
                value: "none",
                supercedes: ["visible"]
            },
            HIDEAFTERSUBMIT: {
                key: "hideaftersubmit",
                value: !0
            }
        };
    A.CSS_DIALOG = "yui-dialog";
    YAHOO.extend(A, YAHOO.widget.Panel, {
        form: null,
        initDefaultConfig: function () {
            A.superclass.initDefaultConfig.call(this);
            this.callback = {
                success: null,
                failure: null,
                argument: null
            };
            this.cfg.addProperty(C.POST_METHOD.key, {
                handler: this.configPostMethod,
                value: C.POST_METHOD.value,
                validator: function (I) {
                    return I != "form" && I != "async" && I != "none" && I != "manual" ? !1 : !0
                }
            });
            this.cfg.addProperty(C.POST_DATA.key, {
                value: C.POST_DATA.value
            });
            this.cfg.addProperty(C.HIDEAFTERSUBMIT.key, {
                value: C.HIDEAFTERSUBMIT.value
            });
            this.cfg.addProperty(C.BUTTONS.key, {
                handler: this.configButtons,
                value: C.BUTTONS.value,
                supercedes: C.BUTTONS.supercedes
            })
        },
        initEvents: function () {
            A.superclass.initEvents.call(this);
            var I = G.LIST;
            this.beforeSubmitEvent = this.createEvent(H.BEFORE_SUBMIT);
            this.beforeSubmitEvent.signature = I;
            this.submitEvent = this.createEvent(H.SUBMIT);
            this.submitEvent.signature = I;
            this.manualSubmitEvent = this.createEvent(H.MANUAL_SUBMIT);
            this.manualSubmitEvent.signature = I;
            this.asyncSubmitEvent = this.createEvent(H.ASYNC_SUBMIT);
            this.asyncSubmitEvent.signature = I;
            this.formSubmitEvent = this.createEvent(H.FORM_SUBMIT);
            this.formSubmitEvent.signature = I;
            this.cancelEvent = this.createEvent(H.CANCEL);
            this.cancelEvent.signature = I
        },
        init: function (J, I) {
            A.superclass.init.call(this, J);
            this.beforeInitEvent.fire(A);
            E.addClass(this.element, A.CSS_DIALOG);
            this.cfg.setProperty("visible", !1);
            I && this.cfg.applyConfig(I, !0);
            this.showEvent.subscribe(this.focusFirst, this, !0);
            this.beforeHideEvent.subscribe(this.blurButtons, this, !0);
            this.subscribe("changeBody", this.registerForm);
            this.initEvent.fire(A)
        },
        doSubmit: function () {
            var P = YAHOO.util.Connect,
                Q = this.form,
                K = !1,
                N = !1,
                R, M, L, I, J, O;
            switch (this.cfg.getProperty("postmethod")) {
            case "async":
                if (R = Q.elements, M = R.length, M > 0) {
                    L = M - 1;
                    do
                        if (R[L].type == "file") {
                            K = !0;
                            break
                        }
                    while (L--)
                }
                K && YAHOO.env.ua.ie && this.isSecure && (N = !0);
                I = this._getFormAttributes(Q);
                P.setForm(Q, K, N);
                J = this.cfg.getProperty("postdata");
                O = P.asyncRequest(I.method, I.action, this.callback, J);
                this.asyncSubmitEvent.fire(O);
                break;
            case "form":
                Q.submit();
                this.formSubmitEvent.fire();
                break;
            case "none":
            case "manual":
                this.manualSubmitEvent.fire()
            }
        },
        _getFormAttributes: function (K) {
            var I = {
                    method: null,
                    action: null
                },
                J, L;
            return K && (K.getAttributeNode ? (J = K.getAttributeNode("action"), L = K.getAttributeNode("method"), J && (I.action = J.value), L && (I.method = L.value)) : (I.action = K.getAttribute("action"), I.method = K.getAttribute("method"))), I.method = (F.isString(I.method) ? I.method : "POST").toUpperCase(), I.action = F.isString(I.action) ? I.action : "", I
        },
        registerForm: function () {
            var I = this.element.getElementsByTagName("form")[0];
            if (this.form) {
                if (this.form == I && E.isAncestor(this.element, this.form)) return;
                B.purgeElement(this.form);
                this.form = null
            }
            if (I || (I = document.createElement("form"), I.name = "frm_" + this.id, this.body.appendChild(I)), I) {
                this.form = I;
                B.on(I, "submit", this._submitHandler, this, !0)
            }
        },
        _submitHandler: function (I) {
            B.stopEvent(I);
            this.submit();
            this.form.blur()
        },
        setTabLoop: function (I, J) {
            I = I || this.firstButton;
            J = this.lastButton || J;
            A.superclass.setTabLoop.call(this, I, J)
        },
        setFirstLastFocusable: function () {
            A.superclass.setFirstLastFocusable.call(this);
            var J, I, K, L = this.focusableElements;
            if (this.firstFormElement = null, this.lastFormElement = null, this.form && L && L.length > 0) {
                for (I = L.length, J = 0; J < I; ++J)
                    if (K = L[J], this.form === K.form) {
                        this.firstFormElement = K;
                        break
                    }
                for (J = I - 1; J >= 0; --J)
                    if (K = L[J], this.form === K.form) {
                        this.lastFormElement = K;
                        break
                    }
            }
        },
        configClose: function () {
            A.superclass.configClose.apply(this, arguments)
        },
        _doClose: function (I) {
            B.preventDefault(I);
            this.cancel()
        },
        configButtons: function (S, R) {
            var N = YAHOO.widget.Button,
                U = R[0],
                K = this.innerElement,
                T, P, J, Q, O, I, L;
            if (D.call(this), this._aButtons = null, F.isArray(U)) {
                for (O = document.createElement("span"), O.className = "button-group", Q = U.length, this._aButtons = [], this.defaultHtmlButton = null, L = 0; L < Q; L++) {
                    if (T = U[L], N) J = new N({
                        label: T.text
                    }), J.appendTo(O), P = J.get("element"), T.isDefault && (J.addClass("default"), this.defaultHtmlButton = P), F.isFunction(T.handler) ? J.set("onclick", {
                        fn: T.handler,
                        obj: this,
                        scope: this
                    }) : F.isObject(T.handler) && F.isFunction(T.handler.fn) && J.set("onclick", {
                        fn: T.handler.fn,
                        obj: F.isUndefined(T.handler.obj) ? this : T.handler.obj,
                        scope: T.handler.scope || this
                    }), this._aButtons[this._aButtons.length] = J;
                    else {
                        if (P = document.createElement("button"), P.setAttribute("type", "button"), T.isDefault && (P.className = "default", this.defaultHtmlButton = P), P.innerHTML = T.text, F.isFunction(T.handler)) B.on(P, "click", T.handler, this, !0);
                        else if (F.isObject(T.handler) && F.isFunction(T.handler.fn)) B.on(P, "click", T.handler.fn, F.isUndefined(T.handler.obj) ? this : T.handler.obj, T.handler.scope || this);
                        O.appendChild(P);
                        this._aButtons[this._aButtons.length] = P
                    }
                    T.htmlButton = P;
                    L === 0 && (this.firstButton = P);
                    L == Q - 1 && (this.lastButton = P)
                }
                this.setFooter(O);
                I = this.footer;
                E.inDocument(this.element) && !E.isAncestor(K, I) && K.appendChild(I);
                this.buttonSpan = O
            } else O = this.buttonSpan, I = this.footer, O && I && (I.removeChild(O), this.buttonSpan = null, this.firstButton = null, this.lastButton = null, this.defaultHtmlButton = null);
            this.changeContentEvent.fire()
        },
        getButtons: function () {
            return this._aButtons || null
        },
        focusFirst: function (K, I) {
            var J = this.firstFormElement;
            if (I && I[1] && B.stopEvent(I[1]), J) try {
                J.focus()
            } catch (L) {} else this.defaultHtmlButton ? this.focusDefaultButton() : this.focusFirstButton()
        },
        focusLast: function (K, I) {
            var N = this.cfg.getProperty("buttons"),
                J = this.lastFormElement;
            if (I && I[1] && B.stopEvent(I[1]), N && F.isArray(N)) this.focusLastButton();
            else if (J) try {
                J.focus()
            } catch (L) {}
        },
        _getButton: function (J) {
            var I = YAHOO.widget.Button;
            return I && J && J.nodeName && J.id && (J = I.getButton(J.id) || J), J
        },
        focusDefaultButton: function () {
            var I = this._getButton(this.defaultHtmlButton);
            if (I) try {
                I.focus()
            } catch (J) {}
        },
        blurButtons: function () {
            var N = this.cfg.getProperty("buttons"),
                K, M, J, I;
            if (N && F.isArray(N) && (K = N.length, K > 0)) {
                I = K - 1;
                do
                    if (M = N[I], M && (J = this._getButton(M.htmlButton), J)) try {
                        J.blur()
                    } catch (L) {}
                    while (I--)
            }
        },
        focusFirstButton: function () {
            var L = this.cfg.getProperty("buttons"),
                K, I;
            if (L && F.isArray(L) && (K = L[0], K && (I = this._getButton(K.htmlButton), I))) try {
                I.focus()
            } catch (J) {}
        },
        focusLastButton: function () {
            var M = this.cfg.getProperty("buttons"),
                J, L, I;
            if (M && F.isArray(M) && (J = M.length, J > 0 && (L = M[J - 1], L && (I = this._getButton(L.htmlButton), I)))) try {
                I.focus()
            } catch (K) {}
        },
        configPostMethod: function () {
            this.registerForm()
        },
        validate: function () {
            return !0
        },
        submit: function () {
            return this.validate() ? (this.beforeSubmitEvent.fire(), this.doSubmit(), this.submitEvent.fire(), this.cfg.getProperty("hideaftersubmit") && this.hide(), !0) : !1
        },
        cancel: function () {
            this.cancelEvent.fire();
            this.hide()
        },
        getData: function () {
            function Q(c) {
                var b = c.tagName.toUpperCase();
                return (b == "INPUT" || b == "TEXTAREA" || b == "SELECT") && c.name == M
            }
            var Y = this.form,
                K, R, U, M, S, P, O, J, V, L, W, Z, I, N, a, X, T;
            if (Y)
                for (K = Y.elements, R = K.length, U = {}, X = 0; X < R; X++)
                    if (M = K[X].name, S = E.getElementsBy(Q, "*", Y), P = S.length, P > 0)
                        if (P == 1) {
                            S = S[0];
                            O = S.type;
                            J = S.tagName.toUpperCase();
                            switch (J) {
                            case "INPUT":
                                O == "checkbox" ? U[M] = S.checked : O != "radio" && (U[M] = S.value);
                                break;
                            case "TEXTAREA":
                                U[M] = S.value;
                                break;
                            case "SELECT":
                                for (V = S.options, L = V.length, W = [], T = 0; T < L; T++) Z = V[T], Z.selected && (I = Z.value, I && I !== "" || (I = Z.text), W[W.length] = I);
                                U[M] = W
                            }
                        } else {
                            O = S[0].type;
                            switch (O) {
                            case "radio":
                                for (T = 0; T < P; T++)
                                    if (N = S[T], N.checked) {
                                        U[M] = N.value;
                                        break
                                    }
                                break;
                            case "checkbox":
                                for (W = [], T = 0; T < P; T++) a = S[T], a.checked && (W[W.length] = a.value);
                                U[M] = W
                            }
                        }
            return U
        },
        destroy: function () {
            D.call(this);
            this._aButtons = null;
            var I = this.element.getElementsByTagName("form"),
                J;
            I.length > 0 && (J = I[0], J && (B.purgeElement(J), J.parentNode && J.parentNode.removeChild(J), this.form = null));
            A.superclass.destroy.call(this)
        },
        toString: function () {
            return "Dialog " + this.id
        }
    })
}(),
function () {
    YAHOO.widget.SimpleDialog = function (E, D) {
        YAHOO.widget.SimpleDialog.superclass.constructor.call(this, E, D)
    };
    var C = YAHOO.util.Dom,
        B = YAHOO.widget.SimpleDialog,
        A = {
            ICON: {
                key: "icon",
                value: "none",
                suppressEvent: !0
            },
            TEXT: {
                key: "text",
                value: "",
                suppressEvent: !0,
                supercedes: ["icon"]
            }
        };
    B.ICON_BLOCK = "blckicon";
    B.ICON_ALARM = "alrticon";
    B.ICON_HELP = "hlpicon";
    B.ICON_INFO = "infoicon";
    B.ICON_WARN = "warnicon";
    B.ICON_TIP = "tipicon";
    B.ICON_CSS_CLASSNAME = "yui-icon";
    B.CSS_SIMPLEDIALOG = "yui-simple-dialog";
    YAHOO.extend(B, YAHOO.widget.Dialog, {
        initDefaultConfig: function () {
            B.superclass.initDefaultConfig.call(this);
            this.cfg.addProperty(A.ICON.key, {
                handler: this.configIcon,
                value: A.ICON.value,
                suppressEvent: A.ICON.suppressEvent
            });
            this.cfg.addProperty(A.TEXT.key, {
                handler: this.configText,
                value: A.TEXT.value,
                suppressEvent: A.TEXT.suppressEvent,
                supercedes: A.TEXT.supercedes
            })
        },
        init: function (E, D) {
            B.superclass.init.call(this, E);
            this.beforeInitEvent.fire(B);
            C.addClass(this.element, B.CSS_SIMPLEDIALOG);
            this.cfg.queueProperty("postmethod", "manual");
            D && this.cfg.applyConfig(D, !0);
            this.beforeRenderEvent.subscribe(function () {
                this.body || this.setBody("")
            }, this, !0);
            this.initEvent.fire(B)
        },
        registerForm: function () {
            B.superclass.registerForm.call(this);
            this.form.innerHTML += '<input type="hidden" name="' + this.id + '" value=""/>'
        },
        configIcon: function (F, E) {
            var K = E[0],
                D = this.body,
                I = B.ICON_CSS_CLASSNAME,
                H, G;
            K && K != "none" && (H = C.getElementsByClassName(I, "*", D), H && (G = H.parentNode, G && (G.removeChild(H), H = null)), K.indexOf(".") == -1 ? (H = document.createElement("span"), H.className = I + " " + K, H.innerHTML = "&#160;") : (H = document.createElement("img"), H.src = this.imageRoot + K, H.className = I), H && D.insertBefore(H, D.firstChild))
        },
        configText: function (E, D) {
            var G = D[0];
            G && (this.setBody(G), this.cfg.refireEvent("icon"))
        },
        toString: function () {
            return "SimpleDialog " + this.id
        }
    })
}(),
function () {
    YAHOO.widget.ContainerEffect = function (E, H, G, D, F) {
        F || (F = YAHOO.util.Anim);
        this.overlay = E;
        this.attrIn = H;
        this.attrOut = G;
        this.targetElement = D || E.element;
        this.animClass = F
    };
    var B = YAHOO.util.Dom,
        C = YAHOO.util.CustomEvent,
        A = YAHOO.widget.ContainerEffect;
    A.FADE = function (D, F) {
        var G = YAHOO.util.Easing,
            I = {
                attributes: {
                    opacity: {
                        from: 0,
                        to: 1
                    }
                },
                duration: F,
                method: G.easeIn
            },
            E = {
                attributes: {
                    opacity: {
                        to: 0
                    }
                },
                duration: F,
                method: G.easeOut
            },
            H = new A(D, I, E, D.element);
        return H.handleUnderlayStart = function () {
            var K = this.overlay.underlay,
                J;
            K && YAHOO.env.ua.ie && (J = K.filters && K.filters.length > 0, J && B.addClass(D.element, "yui-effect-fade"))
        }, H.handleUnderlayComplete = function () {
            var J = this.overlay.underlay;
            J && YAHOO.env.ua.ie && B.removeClass(D.element, "yui-effect-fade")
        }, H.handleStartAnimateIn = function (K, J, L) {
            B.addClass(L.overlay.element, "hide-select");
            L.overlay.underlay || L.overlay.cfg.refireEvent("underlay");
            L.handleUnderlayStart();
            L.overlay._setDomVisibility(!0);
            B.setStyle(L.overlay.element, "opacity", 0)
        }, H.handleCompleteAnimateIn = function (K, J, L) {
            B.removeClass(L.overlay.element, "hide-select");
            L.overlay.element.style.filter && (L.overlay.element.style.filter = null);
            L.handleUnderlayComplete();
            L.overlay.cfg.refireEvent("iframe");
            L.animateInCompleteEvent.fire()
        }, H.handleStartAnimateOut = function (K, J, L) {
            B.addClass(L.overlay.element, "hide-select");
            L.handleUnderlayStart()
        }, H.handleCompleteAnimateOut = function (K, J, L) {
            B.removeClass(L.overlay.element, "hide-select");
            L.overlay.element.style.filter && (L.overlay.element.style.filter = null);
            L.overlay._setDomVisibility(!1);
            B.setStyle(L.overlay.element, "opacity", 1);
            L.handleUnderlayComplete();
            L.overlay.cfg.refireEvent("iframe");
            L.animateOutCompleteEvent.fire()
        }, H.init(), H
    };
    A.SLIDE = function (F, D) {
        var I = YAHOO.util.Easing,
            L = F.cfg.getProperty("x") || B.getX(F.element),
            K = F.cfg.getProperty("y") || B.getY(F.element),
            M = B.getClientWidth(),
            H = F.element.offsetWidth,
            J = {
                attributes: {
                    points: {
                        to: [L, K]
                    }
                },
                duration: D,
                method: I.easeIn
            },
            E = {
                attributes: {
                    points: {
                        to: [M + 25, K]
                    }
                },
                duration: D,
                method: I.easeOut
            },
            G = new A(F, J, E, F.element, YAHOO.util.Motion);
        return G.handleStartAnimateIn = function (O, N, P) {
            P.overlay.element.style.left = -25 - H + "px";
            P.overlay.element.style.top = K + "px"
        }, G.handleTweenAnimateIn = function (Q, P, R) {
            var S = B.getXY(R.overlay.element),
                O = S[0],
                N = S[1];
            B.getStyle(R.overlay.element, "visibility") == "hidden" && O < L && R.overlay._setDomVisibility(!0);
            R.overlay.cfg.setProperty("xy", [O, N], !0);
            R.overlay.cfg.refireEvent("iframe")
        }, G.handleCompleteAnimateIn = function (O, N, P) {
            P.overlay.cfg.setProperty("xy", [L, K], !0);
            P.startX = L;
            P.startY = K;
            P.overlay.cfg.refireEvent("iframe");
            P.animateInCompleteEvent.fire()
        }, G.handleStartAnimateOut = function (O, N, R) {
            var P = B.getViewportWidth(),
                S = B.getXY(R.overlay.element),
                Q = S[1];
            R.animOut.attributes.points.to = [P + 25, Q]
        }, G.handleTweenAnimateOut = function (P, O, Q) {
            var S = B.getXY(Q.overlay.element),
                N = S[0],
                R = S[1];
            Q.overlay.cfg.setProperty("xy", [N, R], !0);
            Q.overlay.cfg.refireEvent("iframe")
        }, G.handleCompleteAnimateOut = function (O, N, P) {
            P.overlay._setDomVisibility(!1);
            P.overlay.cfg.setProperty("xy", [L, K]);
            P.animateOutCompleteEvent.fire()
        }, G.init(), G
    };
    A.prototype = {
        init: function () {
            this.beforeAnimateInEvent = this.createEvent("beforeAnimateIn");
            this.beforeAnimateInEvent.signature = C.LIST;
            this.beforeAnimateOutEvent = this.createEvent("beforeAnimateOut");
            this.beforeAnimateOutEvent.signature = C.LIST;
            this.animateInCompleteEvent = this.createEvent("animateInComplete");
            this.animateInCompleteEvent.signature = C.LIST;
            this.animateOutCompleteEvent = this.createEvent("animateOutComplete");
            this.animateOutCompleteEvent.signature = C.LIST;
            this.animIn = new this.animClass(this.targetElement, this.attrIn.attributes, this.attrIn.duration, this.attrIn.method);
            this.animIn.onStart.subscribe(this.handleStartAnimateIn, this);
            this.animIn.onTween.subscribe(this.handleTweenAnimateIn, this);
            this.animIn.onComplete.subscribe(this.handleCompleteAnimateIn, this);
            this.animOut = new this.animClass(this.targetElement, this.attrOut.attributes, this.attrOut.duration, this.attrOut.method);
            this.animOut.onStart.subscribe(this.handleStartAnimateOut, this);
            this.animOut.onTween.subscribe(this.handleTweenAnimateOut, this);
            this.animOut.onComplete.subscribe(this.handleCompleteAnimateOut, this)
        },
        animateIn: function () {
            this.beforeAnimateInEvent.fire();
            this.animIn.animate()
        },
        animateOut: function () {
            this.beforeAnimateOutEvent.fire();
            this.animOut.animate()
        },
        handleStartAnimateIn: function () {},
        handleTweenAnimateIn: function () {},
        handleCompleteAnimateIn: function () {},
        handleStartAnimateOut: function () {},
        handleTweenAnimateOut: function () {},
        handleCompleteAnimateOut: function () {},
        toString: function () {
            var D = "ContainerEffect";
            return this.overlay && (D += " [" + this.overlay.toString() + "]"), D
        }
    };
    YAHOO.lang.augmentProto(A, YAHOO.util.EventProvider)
}();
YAHOO.register("container", YAHOO.widget.Module, {
    version: "2.7.0",
    build: "1799"
});
(function () {
    var lang = YAHOO.lang,
        util = YAHOO.util,
        Ev = util.Event,
        DS;
    util.DataSourceBase = function (oLiveData, oConfigs) {
        var sConfig, maxCacheEntries, DS;
        if (oLiveData !== null && oLiveData !== undefined) {
            if (this.liveData = oLiveData, this._oQueue = {
                    interval: null,
                    conn: null,
                    requests: []
                }, this.responseSchema = {}, oConfigs && oConfigs.constructor == Object)
                for (sConfig in oConfigs) sConfig && (this[sConfig] = oConfigs[sConfig]);
            maxCacheEntries = this.maxCacheEntries;
            (!lang.isNumber(maxCacheEntries) || maxCacheEntries < 0) && (maxCacheEntries = 0);
            this._aIntervals = [];
            this.createEvent("cacheRequestEvent");
            this.createEvent("cacheResponseEvent");
            this.createEvent("requestEvent");
            this.createEvent("responseEvent");
            this.createEvent("responseParseEvent");
            this.createEvent("responseCacheEvent");
            this.createEvent("dataErrorEvent");
            this.createEvent("cacheFlushEvent");
            DS = util.DataSourceBase;
            this._sName = "DataSource instance" + DS._nIndex;
            DS._nIndex++
        }
    };
    DS = util.DataSourceBase;
    lang.augmentObject(DS, {
        TYPE_UNKNOWN: -1,
        TYPE_JSARRAY: 0,
        TYPE_JSFUNCTION: 1,
        TYPE_XHR: 2,
        TYPE_JSON: 3,
        TYPE_XML: 4,
        TYPE_TEXT: 5,
        TYPE_HTMLTABLE: 6,
        TYPE_SCRIPTNODE: 7,
        TYPE_LOCAL: 8,
        ERROR_DATAINVALID: "Invalid data",
        ERROR_DATANULL: "Null data",
        _nIndex: 0,
        _nTransactionId: 0,
        issueCallback: function (callback, params, error, scope) {
            if (lang.isFunction(callback)) callback.apply(scope, params);
            else if (lang.isObject(callback)) {
                scope = callback.scope || scope || window;
                var callbackFunc = callback.success;
                error && (callbackFunc = callback.failure);
                callbackFunc && callbackFunc.apply(scope, params.concat([callback.argument]))
            }
        },
        parseString: function (oData) {
            if (!lang.isValue(oData)) return null;
            var string = oData + "";
            return lang.isString(string) ? string : null
        },
        parseNumber: function (oData) {
            if (!lang.isValue(oData) || oData === "") return null;
            var number = oData * 1;
            return lang.isNumber(number) ? number : null
        },
        convertNumber: function (oData) {
            return DS.parseNumber(oData)
        },
        parseDate: function (oData) {
            var date = null;
            return oData instanceof Date ? oData : (date = new Date(oData), date instanceof Date ? date : null)
        },
        convertDate: function (oData) {
            return DS.parseDate(oData)
        }
    });
    DS.Parser = {
        string: DS.parseString,
        number: DS.parseNumber,
        date: DS.parseDate
    };
    DS.prototype = {
        _sName: null,
        _aCache: null,
        _oQueue: null,
        _aIntervals: null,
        maxCacheEntries: 0,
        liveData: null,
        dataType: DS.TYPE_UNKNOWN,
        responseType: DS.TYPE_UNKNOWN,
        responseSchema: null,
        toString: function () {
            return this._sName
        },
        getCachedResponse: function (oRequest, oCallback, oCaller) {
            var aCache = this._aCache,
                nCacheLength, oResponse, i, oCacheElem;
            if (this.maxCacheEntries > 0)
                if (aCache) {
                    if (nCacheLength = aCache.length, nCacheLength > 0) {
                        for (oResponse = null, this.fireEvent("cacheRequestEvent", {
                                request: oRequest,
                                callback: oCallback,
                                caller: oCaller
                            }), i = nCacheLength - 1; i >= 0; i--)
                            if (oCacheElem = aCache[i], this.isCacheHit(oRequest, oCacheElem.request)) {
                                oResponse = oCacheElem.response;
                                this.fireEvent("cacheResponseEvent", {
                                    request: oRequest,
                                    response: oResponse,
                                    callback: oCallback,
                                    caller: oCaller
                                });
                                i < nCacheLength - 1 && (aCache.splice(i, 1), this.addToCache(oRequest, oResponse));
                                oResponse.cached = !0;
                                break
                            }
                        return oResponse
                    }
                } else this._aCache = [];
            else aCache && (this._aCache = null);
            return null
        },
        isCacheHit: function (oRequest, oCachedRequest) {
            return oRequest === oCachedRequest
        },
        addToCache: function (oRequest, oResponse) {
            var aCache = this._aCache,
                oCacheElem;
            if (aCache) {
                while (aCache.length >= this.maxCacheEntries) aCache.shift();
                oCacheElem = {
                    request: oRequest,
                    response: oResponse
                };
                aCache[aCache.length] = oCacheElem;
                this.fireEvent("responseCacheEvent", {
                    request: oRequest,
                    response: oResponse
                })
            }
        },
        flushCache: function () {
            this._aCache && (this._aCache = [], this.fireEvent("cacheFlushEvent"))
        },
        setInterval: function (nMsec, oRequest, oCallback, oCaller) {
            if (lang.isNumber(nMsec) && nMsec >= 0) {
                var oSelf = this,
                    nId = setInterval(function () {
                        oSelf.makeConnection(oRequest, oCallback, oCaller)
                    }, nMsec);
                return this._aIntervals.push(nId), nId
            }
        },
        clearInterval: function (nId) {
            for (var tracker = this._aIntervals || [], i = tracker.length - 1; i > -1; i--) tracker[i] === nId && (tracker.splice(i, 1), clearInterval(nId))
        },
        clearAllIntervals: function () {
            for (var tracker = this._aIntervals || [], i = tracker.length - 1; i > -1; i--) clearInterval(tracker[i]);
            tracker = []
        },
        sendRequest: function (oRequest, oCallback, oCaller) {
            var oCachedResponse = this.getCachedResponse(oRequest, oCallback, oCaller);
            return oCachedResponse ? (DS.issueCallback(oCallback, [oRequest, oCachedResponse], !1, oCaller), null) : this.makeConnection(oRequest, oCallback, oCaller)
        },
        makeConnection: function (oRequest, oCallback, oCaller) {
            var tId = DS._nTransactionId++,
                oRawResponse;
            return this.fireEvent("requestEvent", {
                tId: tId,
                request: oRequest,
                callback: oCallback,
                caller: oCaller
            }), oRawResponse = this.liveData, this.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId), tId
        },
        handleResponse: function (oRequest, oRawResponse, oCallback, oCaller, tId) {
            var ctype, arrayEnd, parseArgs, objEnd, el;
            this.fireEvent("responseEvent", {
                tId: tId,
                request: oRequest,
                response: oRawResponse,
                callback: oCallback,
                caller: oCaller
            });
            var xhr = this.dataType == DS.TYPE_XHR ? !0 : !1,
                oParsedResponse = null,
                oFullResponse = oRawResponse;
            this.responseType === DS.TYPE_UNKNOWN && (ctype = oRawResponse && oRawResponse.getResponseHeader ? oRawResponse.getResponseHeader["Content-Type"] : null, ctype ? ctype.indexOf("text/xml") > -1 ? this.responseType = DS.TYPE_XML : ctype.indexOf("application/json") > -1 ? this.responseType = DS.TYPE_JSON : ctype.indexOf("text/plain") > -1 && (this.responseType = DS.TYPE_TEXT) : YAHOO.lang.isArray(oRawResponse) ? this.responseType = DS.TYPE_JSARRAY : oRawResponse && oRawResponse.nodeType && oRawResponse.nodeType == 9 ? this.responseType = DS.TYPE_XML : oRawResponse && oRawResponse.nodeName && oRawResponse.nodeName.toLowerCase() == "table" ? this.responseType = DS.TYPE_HTMLTABLE : YAHOO.lang.isObject(oRawResponse) ? this.responseType = DS.TYPE_JSON : YAHOO.lang.isString(oRawResponse) && (this.responseType = DS.TYPE_TEXT));
            switch (this.responseType) {
            case DS.TYPE_JSARRAY:
                xhr && oRawResponse && oRawResponse.responseText && (oFullResponse = oRawResponse.responseText);
                try {
                    if (lang.isString(oFullResponse))
                        if (parseArgs = [oFullResponse].concat(this.parseJSONArgs), lang.JSON) oFullResponse = lang.JSON.parse.apply(lang.JSON, parseArgs);
                        else if (window.JSON && JSON.parse) oFullResponse = JSON.parse.apply(JSON, parseArgs);
                    else if (oFullResponse.parseJSON) oFullResponse = oFullResponse.parseJSON.apply(oFullResponse, parseArgs.slice(1));
                    else {
                        while (oFullResponse.length > 0 && oFullResponse.charAt(0) != "{" && oFullResponse.charAt(0) != "[") oFullResponse = oFullResponse.substring(1, oFullResponse.length);
                        oFullResponse.length > 0 && (arrayEnd = Math.max(oFullResponse.lastIndexOf("]"), oFullResponse.lastIndexOf("}")), oFullResponse = oFullResponse.substring(0, arrayEnd + 1), oFullResponse = eval("(" + oFullResponse + ")"))
                    }
                } catch (e1) {}
                oFullResponse = this.doBeforeParseData(oRequest, oFullResponse, oCallback);
                oParsedResponse = this.parseArrayData(oRequest, oFullResponse);
                break;
            case DS.TYPE_JSON:
                xhr && oRawResponse && oRawResponse.responseText && (oFullResponse = oRawResponse.responseText);
                try {
                    if (lang.isString(oFullResponse))
                        if (parseArgs = [oFullResponse].concat(this.parseJSONArgs), lang.JSON) oFullResponse = lang.JSON.parse.apply(lang.JSON, parseArgs);
                        else if (window.JSON && JSON.parse) oFullResponse = JSON.parse.apply(JSON, parseArgs);
                    else if (oFullResponse.parseJSON) oFullResponse = oFullResponse.parseJSON.apply(oFullResponse, parseArgs.slice(1));
                    else {
                        while (oFullResponse.length > 0 && oFullResponse.charAt(0) != "{" && oFullResponse.charAt(0) != "[") oFullResponse = oFullResponse.substring(1, oFullResponse.length);
                        oFullResponse.length > 0 && (objEnd = Math.max(oFullResponse.lastIndexOf("]"), oFullResponse.lastIndexOf("}")), oFullResponse = oFullResponse.substring(0, objEnd + 1), oFullResponse = eval("(" + oFullResponse + ")"))
                    }
                } catch (e) {}
                oFullResponse = this.doBeforeParseData(oRequest, oFullResponse, oCallback);
                oParsedResponse = this.parseJSONData(oRequest, oFullResponse);
                break;
            case DS.TYPE_HTMLTABLE:
                xhr && oRawResponse.responseText && (el = document.createElement("div"), el.innerHTML = oRawResponse.responseText, oFullResponse = el.getElementsByTagName("table")[0]);
                oFullResponse = this.doBeforeParseData(oRequest, oFullResponse, oCallback);
                oParsedResponse = this.parseHTMLTableData(oRequest, oFullResponse);
                break;
            case DS.TYPE_XML:
                xhr && oRawResponse.responseXML && (oFullResponse = oRawResponse.responseXML);
                oFullResponse = this.doBeforeParseData(oRequest, oFullResponse, oCallback);
                oParsedResponse = this.parseXMLData(oRequest, oFullResponse);
                break;
            case DS.TYPE_TEXT:
                xhr && lang.isString(oRawResponse.responseText) && (oFullResponse = oRawResponse.responseText);
                oFullResponse = this.doBeforeParseData(oRequest, oFullResponse, oCallback);
                oParsedResponse = this.parseTextData(oRequest, oFullResponse);
                break;
            default:
                oFullResponse = this.doBeforeParseData(oRequest, oFullResponse, oCallback);
                oParsedResponse = this.parseData(oRequest, oFullResponse)
            }
            oParsedResponse = oParsedResponse || {};
            oParsedResponse.results || (oParsedResponse.results = []);
            oParsedResponse.meta || (oParsedResponse.meta = {});
            oParsedResponse && !oParsedResponse.error ? (oParsedResponse = this.doBeforeCallback(oRequest, oFullResponse, oParsedResponse, oCallback), this.fireEvent("responseParseEvent", {
                request: oRequest,
                response: oParsedResponse,
                callback: oCallback,
                caller: oCaller
            }), this.addToCache(oRequest, oParsedResponse)) : (oParsedResponse.error = !0, this.fireEvent("dataErrorEvent", {
                request: oRequest,
                response: oRawResponse,
                callback: oCallback,
                caller: oCaller,
                message: DS.ERROR_DATANULL
            }));
            oParsedResponse.tId = tId;
            DS.issueCallback(oCallback, [oRequest, oParsedResponse], oParsedResponse.error, oCaller)
        },
        doBeforeParseData: function (oRequest, oFullResponse) {
            return oFullResponse
        },
        doBeforeCallback: function (oRequest, oFullResponse, oParsedResponse) {
            return oParsedResponse
        },
        parseData: function (oRequest, oFullResponse) {
            return lang.isValue(oFullResponse) ? {
                results: oFullResponse,
                meta: {}
            } : null
        },
        parseArrayData: function (oRequest, oFullResponse) {
            var results, i, j, rec, field, data, fields, parsers, p, arrType, oResult;
            if (lang.isArray(oFullResponse)) {
                if (results = [], lang.isArray(this.responseSchema.fields)) {
                    for (fields = this.responseSchema.fields, i = fields.length - 1; i >= 0; --i) typeof fields[i] != "object" && (fields[i] = {
                        key: fields[i]
                    });
                    for (parsers = {}, i = fields.length - 1; i >= 0; --i) p = (typeof fields[i].parser == "function" ? fields[i].parser : DS.Parser[fields[i].parser + ""]) || fields[i].converter, p && (parsers[fields[i].key] = p);
                    for (arrType = lang.isArray(oFullResponse[0]), i = oFullResponse.length - 1; i > -1; i--) {
                        if (oResult = {}, rec = oFullResponse[i], typeof rec == "object")
                            for (j = fields.length - 1; j > -1; j--) field = fields[j], data = arrType ? rec[j] : rec[field.key], parsers[field.key] && (data = parsers[field.key].call(this, data)), data === undefined && (data = null), oResult[field.key] = data;
                        else if (lang.isString(rec))
                            for (j = fields.length - 1; j > -1; j--) field = fields[j], data = rec, parsers[field.key] && (data = parsers[field.key].call(this, data)), data === undefined && (data = null), oResult[field.key] = data;
                        results[i] = oResult
                    }
                } else results = oFullResponse;
                return {
                    results: results
                }
            }
            return null
        },
        parseTextData: function (oRequest, oFullResponse) {
            var newLength, recordsarray, bError, sRecord, fielddataarray, oResult, fields, j, data, field, key, parser;
            if (lang.isString(oFullResponse) && lang.isString(this.responseSchema.recordDelim) && lang.isString(this.responseSchema.fieldDelim)) {
                var oParsedResponse = {
                        results: []
                    },
                    recDelim = this.responseSchema.recordDelim,
                    fieldDelim = this.responseSchema.fieldDelim;
                if (oFullResponse.length > 0 && (newLength = oFullResponse.length - recDelim.length, oFullResponse.substr(newLength) == recDelim && (oFullResponse = oFullResponse.substr(0, newLength)), oFullResponse.length > 0)) {
                    recordsarray = oFullResponse.split(recDelim);
                    for (var i = 0, len = recordsarray.length, recIdx = 0; i < len; ++i)
                        if (bError = !1, sRecord = recordsarray[i], lang.isString(sRecord) && sRecord.length > 0) {
                            if (fielddataarray = recordsarray[i].split(fieldDelim), oResult = {}, lang.isArray(this.responseSchema.fields))
                                for (fields = this.responseSchema.fields, j = fields.length - 1; j > -1; j--) try {
                                    data = fielddataarray[j];
                                    lang.isString(data) ? (data.charAt(0) == '"' && (data = data.substr(1)), data.charAt(data.length - 1) == '"' && (data = data.substr(0, data.length - 1)), field = fields[j], key = lang.isValue(field.key) ? field.key : field, !field.parser && field.converter && (field.parser = field.converter), parser = typeof field.parser == "function" ? field.parser : DS.Parser[field.parser + ""], parser && (data = parser.call(this, data)), data === undefined && (data = null), oResult[key] = data) : bError = !0
                                } catch (e) {
                                    bError = !0
                                } else oResult = fielddataarray;
                            bError || (oParsedResponse.results[recIdx++] = oResult)
                        }
                }
                return oParsedResponse
            }
            return null
        },
        parseXMLResult: function (result) {
            var oResult = {},
                schema = this.responseSchema,
                m, xmlNode, item, datapieces, j, len, parser;
            try {
                for (m = schema.fields.length - 1; m >= 0; m--) {
                    var field = schema.fields[m],
                        key = lang.isValue(field.key) ? field.key : field,
                        data = null,
                        xmlAttr = result.attributes.getNamedItem(key);
                    if (xmlAttr) data = xmlAttr.value;
                    else if (xmlNode = result.getElementsByTagName(key), xmlNode && xmlNode.item(0) && (item = xmlNode.item(0), data = item ? item.text ? item.text : item.textContent ? item.textContent : null : null, !data)) {
                        for (datapieces = [], j = 0, len = item.childNodes.length; j < len; j++) item.childNodes[j].nodeValue && (datapieces[datapieces.length] = item.childNodes[j].nodeValue);
                        datapieces.length > 0 && (data = datapieces.join(""))
                    }
                    data === null && (data = "");
                    !field.parser && field.converter && (field.parser = field.converter);
                    parser = typeof field.parser == "function" ? field.parser : DS.Parser[field.parser + ""];
                    parser && (data = parser.call(this, data));
                    data === undefined && (data = null);
                    oResult[key] = data
                }
            } catch (e) {}
            return oResult
        },
        parseXMLData: function (oRequest, oFullResponse) {
            var bError = !1,
                schema = this.responseSchema,
                oParsedResponse = {
                    meta: {}
                },
                xmlList = null,
                metaNode = schema.metaNode,
                metaLocators = schema.metaFields || {},
                i, k, loc, v, oResult;
            try {
                if (xmlList = schema.resultNode ? oFullResponse.getElementsByTagName(schema.resultNode) : null, metaNode = metaNode ? oFullResponse.getElementsByTagName(metaNode)[0] : oFullResponse, metaNode)
                    for (k in metaLocators) lang.hasOwnProperty(metaLocators, k) && (loc = metaLocators[k], v = metaNode.getElementsByTagName(loc)[0], v ? v = v.firstChild.nodeValue : (v = metaNode.attributes.getNamedItem(loc), v && (v = v.value)), lang.isValue(v) && (oParsedResponse.meta[k] = v))
            } catch (e) {}
            if (xmlList && lang.isArray(schema.fields))
                for (oParsedResponse.results = [], i = xmlList.length - 1; i >= 0; --i) oResult = this.parseXMLResult(xmlList.item(i)), oParsedResponse.results[i] = oResult;
            else bError = !0;
            return bError && (oParsedResponse.error = !0), oParsedResponse
        },
        parseJSONData: function (oRequest, oFullResponse) {
            var oParsedResponse = {
                    results: [],
                    meta: {}
                },
                field, r, rec, p;
            if (lang.isObject(oFullResponse) && this.responseSchema.resultsList) {
                var schema = this.responseSchema,
                    fields = schema.fields,
                    resultsList = oFullResponse,
                    results = [],
                    metaFields = schema.metaFields || {},
                    fieldParsers = [],
                    fieldPaths = [],
                    simpleFields = [],
                    bError = !1,
                    i, len, j, v, key, parser, path, buildPath = function (needle) {
                        var path = null,
                            keys = [],
                            i = 0;
                        if (needle && (needle = needle.replace(/\[(['"])(.*?)\1\]/g, function (x, $1, $2) {
                                return keys[i] = $2, ".@" + i++
                            }).replace(/\[(\d+)\]/g, function (x, $1) {
                                return keys[i] = parseInt($1, 10) | 0, ".@" + i++
                            }).replace(/^\./, ""), !/[^\w\.\$@]/.test(needle)))
                            for (path = needle.split("."), i = path.length - 1; i >= 0; --i) path[i].charAt(0) === "@" && (path[i] = keys[parseInt(path[i].substr(1), 10)]);
                        return path
                    },
                    walkPath = function (path, origin) {
                        for (var v = origin, i = 0, len = path.length; i < len && v; ++i) v = v[path[i]];
                        return v
                    };
                if (path = buildPath(schema.resultsList), path ? (resultsList = walkPath(path, oFullResponse), resultsList === undefined && (bError = !0)) : bError = !0, resultsList || (resultsList = []), lang.isArray(resultsList) || (resultsList = [resultsList]), bError) oParsedResponse.error = !0;
                else {
                    if (schema.fields) {
                        for (i = 0, len = fields.length; i < len; i++) field = fields[i], key = field.key || field, parser = (typeof field.parser == "function" ? field.parser : DS.Parser[field.parser + ""]) || field.converter, path = buildPath(key), parser && (fieldParsers[fieldParsers.length] = {
                            key: key,
                            parser: parser
                        }), path && (path.length > 1 ? fieldPaths[fieldPaths.length] = {
                            key: key,
                            path: path
                        } : simpleFields[simpleFields.length] = {
                            key: key,
                            path: path[0]
                        });
                        for (i = resultsList.length - 1; i >= 0; --i) {
                            if (r = resultsList[i], rec = {}, r) {
                                for (j = simpleFields.length - 1; j >= 0; --j) rec[simpleFields[j].key] = r[simpleFields[j].path] !== undefined ? r[simpleFields[j].path] : r[j];
                                for (j = fieldPaths.length - 1; j >= 0; --j) rec[fieldPaths[j].key] = walkPath(fieldPaths[j].path, r);
                                for (j = fieldParsers.length - 1; j >= 0; --j) p = fieldParsers[j].key, rec[p] = fieldParsers[j].parser(rec[p]), rec[p] === undefined && (rec[p] = null)
                            }
                            results[i] = rec
                        }
                    } else results = resultsList;
                    for (key in metaFields) lang.hasOwnProperty(metaFields, key) && (path = buildPath(metaFields[key]), path && (v = walkPath(path, oFullResponse), oParsedResponse.meta[key] = v))
                }
                oParsedResponse.results = results
            } else oParsedResponse.error = !0;
            return oParsedResponse
        },
        parseHTMLTableData: function (oRequest, oFullResponse) {
            var bError = !1,
                elTable = oFullResponse,
                fields = this.responseSchema.fields,
                oParsedResponse = {
                    results: []
                },
                i, elTbody, j, elRow, oResult, k, parser;
            if (lang.isArray(fields))
                for (i = 0; i < elTable.tBodies.length; i++)
                    for (elTbody = elTable.tBodies[i], j = elTbody.rows.length - 1; j > -1; j--) {
                        for (elRow = elTbody.rows[j], oResult = {}, k = fields.length - 1; k > -1; k--) {
                            var field = fields[k],
                                key = lang.isValue(field.key) ? field.key : field,
                                data = elRow.cells[k].innerHTML;
                            !field.parser && field.converter && (field.parser = field.converter);
                            parser = typeof field.parser == "function" ? field.parser : DS.Parser[field.parser + ""];
                            parser && (data = parser.call(this, data));
                            data === undefined && (data = null);
                            oResult[key] = data
                        }
                        oParsedResponse.results[j] = oResult
                    } else bError = !0;
            return bError && (oParsedResponse.error = !0), oParsedResponse
        }
    };
    lang.augmentProto(DS, util.EventProvider);
    util.LocalDataSource = function (oLiveData, oConfigs) {
        this.dataType = DS.TYPE_LOCAL;
        oLiveData ? YAHOO.lang.isArray(oLiveData) ? this.responseType = DS.TYPE_JSARRAY : oLiveData.nodeType && oLiveData.nodeType == 9 ? this.responseType = DS.TYPE_XML : oLiveData.nodeName && oLiveData.nodeName.toLowerCase() == "table" ? (this.responseType = DS.TYPE_HTMLTABLE, oLiveData = oLiveData.cloneNode(!0)) : YAHOO.lang.isString(oLiveData) ? this.responseType = DS.TYPE_TEXT : YAHOO.lang.isObject(oLiveData) && (this.responseType = DS.TYPE_JSON) : (oLiveData = [], this.responseType = DS.TYPE_JSARRAY);
        util.LocalDataSource.superclass.constructor.call(this, oLiveData, oConfigs)
    };
    lang.extend(util.LocalDataSource, DS);
    lang.augmentObject(util.LocalDataSource, DS);
    util.FunctionDataSource = function (oLiveData, oConfigs) {
        this.dataType = DS.TYPE_JSFUNCTION;
        oLiveData = oLiveData || function () {};
        util.FunctionDataSource.superclass.constructor.call(this, oLiveData, oConfigs)
    };
    lang.extend(util.FunctionDataSource, DS, {
        scope: null,
        makeConnection: function (oRequest, oCallback, oCaller) {
            var tId = DS._nTransactionId++,
                oRawResponse;
            return this.fireEvent("requestEvent", {
                tId: tId,
                request: oRequest,
                callback: oCallback,
                caller: oCaller
            }), oRawResponse = this.scope ? this.liveData.call(this.scope, oRequest, this) : this.liveData(oRequest), this.responseType === DS.TYPE_UNKNOWN && (YAHOO.lang.isArray(oRawResponse) ? this.responseType = DS.TYPE_JSARRAY : oRawResponse && oRawResponse.nodeType && oRawResponse.nodeType == 9 ? this.responseType = DS.TYPE_XML : oRawResponse && oRawResponse.nodeName && oRawResponse.nodeName.toLowerCase() == "table" ? this.responseType = DS.TYPE_HTMLTABLE : YAHOO.lang.isObject(oRawResponse) ? this.responseType = DS.TYPE_JSON : YAHOO.lang.isString(oRawResponse) && (this.responseType = DS.TYPE_TEXT)), this.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId), tId
        }
    });
    lang.augmentObject(util.FunctionDataSource, DS);
    util.ScriptNodeDataSource = function (oLiveData, oConfigs) {
        this.dataType = DS.TYPE_SCRIPTNODE;
        oLiveData = oLiveData || "";
        util.ScriptNodeDataSource.superclass.constructor.call(this, oLiveData, oConfigs)
    };
    lang.extend(util.ScriptNodeDataSource, DS, {
        getUtility: util.Get,
        asyncMode: "allowAll",
        scriptCallbackParam: "callback",
        generateRequestCallback: function (id) {
            return "&" + this.scriptCallbackParam + "=YAHOO.util.ScriptNodeDataSource.callbacks[" + id + "]"
        },
        doBeforeGetScriptNode: function (sUri) {
            return sUri
        },
        makeConnection: function (oRequest, oCallback, oCaller) {
            var tId = DS._nTransactionId++,
                id, oSelf, sUri;
            return this.fireEvent("requestEvent", {
                tId: tId,
                request: oRequest,
                callback: oCallback,
                caller: oCaller
            }), util.ScriptNodeDataSource._nPending === 0 && (util.ScriptNodeDataSource.callbacks = [], util.ScriptNodeDataSource._nId = 0), id = util.ScriptNodeDataSource._nId, util.ScriptNodeDataSource._nId++, oSelf = this, util.ScriptNodeDataSource.callbacks[id] = function (oRawResponse) {
                (oSelf.asyncMode !== "ignoreStaleResponses" || id === util.ScriptNodeDataSource.callbacks.length - 1) && (oSelf.responseType === DS.TYPE_UNKNOWN && (YAHOO.lang.isArray(oRawResponse) ? oSelf.responseType = DS.TYPE_JSARRAY : oRawResponse.nodeType && oRawResponse.nodeType == 9 ? oSelf.responseType = DS.TYPE_XML : oRawResponse.nodeName && oRawResponse.nodeName.toLowerCase() == "table" ? oSelf.responseType = DS.TYPE_HTMLTABLE : YAHOO.lang.isObject(oRawResponse) ? oSelf.responseType = DS.TYPE_JSON : YAHOO.lang.isString(oRawResponse) && (oSelf.responseType = DS.TYPE_TEXT)), oSelf.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId));
                delete util.ScriptNodeDataSource.callbacks[id]
            }, util.ScriptNodeDataSource._nPending++, sUri = this.liveData + oRequest + this.generateRequestCallback(id), sUri = this.doBeforeGetScriptNode(sUri), this.getUtility.script(sUri, {
                autopurge: !0,
                onsuccess: util.ScriptNodeDataSource._bumpPendingDown,
                onfail: util.ScriptNodeDataSource._bumpPendingDown
            }), tId
        }
    });
    lang.augmentObject(util.ScriptNodeDataSource, DS);
    lang.augmentObject(util.ScriptNodeDataSource, {
        _nId: 0,
        _nPending: 0,
        callbacks: []
    });
    util.XHRDataSource = function (oLiveData, oConfigs) {
        this.dataType = DS.TYPE_XHR;
        this.connMgr = this.connMgr || util.Connect;
        oLiveData = oLiveData || "";
        util.XHRDataSource.superclass.constructor.call(this, oLiveData, oConfigs)
    };
    lang.extend(util.XHRDataSource, DS, {
        connMgr: null,
        connXhrMode: "allowAll",
        connMethodPost: !1,
        connTimeout: 0,
        makeConnection: function (oRequest, oCallback, oCaller) {
            var tId = DS._nTransactionId++,
                allRequests;
            this.fireEvent("requestEvent", {
                tId: tId,
                request: oRequest,
                callback: oCallback,
                caller: oCaller
            });
            var oSelf = this,
                oConnMgr = this.connMgr,
                oQueue = this._oQueue,
                _xhrSuccess = function (oResponse) {
                    if (oResponse && this.connXhrMode == "ignoreStaleResponses" && oResponse.tId != oQueue.conn.tId) return null;
                    if (oResponse) {
                        if (this.responseType === DS.TYPE_UNKNOWN) {
                            var ctype = oResponse.getResponseHeader ? oResponse.getResponseHeader["Content-Type"] : null;
                            ctype && (ctype.indexOf("text/xml") > -1 ? this.responseType = DS.TYPE_XML : ctype.indexOf("application/json") > -1 ? this.responseType = DS.TYPE_JSON : ctype.indexOf("text/plain") > -1 && (this.responseType = DS.TYPE_TEXT))
                        }
                        this.handleResponse(oRequest, oResponse, oCallback, oCaller, tId)
                    } else return this.fireEvent("dataErrorEvent", {
                        request: oRequest,
                        callback: oCallback,
                        caller: oCaller,
                        message: DS.ERROR_DATANULL
                    }), DS.issueCallback(oCallback, [oRequest, {
                        error: !0
                    }], !0, oCaller), null
                },
                _xhrFailure = function (oResponse) {
                    return this.fireEvent("dataErrorEvent", {
                        request: oRequest,
                        callback: oCallback,
                        caller: oCaller,
                        message: DS.ERROR_DATAINVALID
                    }), lang.isString(this.liveData) && lang.isString(oRequest) && this.liveData.lastIndexOf("?") !== this.liveData.length - 1 && oRequest.indexOf("?") !== 0, oResponse = oResponse || {}, oResponse.error = !0, DS.issueCallback(oCallback, [oRequest, oResponse], !0, oCaller), null
                },
                _xhrCallback = {
                    success: _xhrSuccess,
                    failure: _xhrFailure,
                    scope: this
                };
            if (lang.isNumber(this.connTimeout) && (_xhrCallback.timeout = this.connTimeout), this.connXhrMode == "cancelStaleRequests" && oQueue.conn && oConnMgr.abort && (oConnMgr.abort(oQueue.conn), oQueue.conn = null), oConnMgr && oConnMgr.asyncRequest) {
                var sLiveData = this.liveData,
                    isPost = this.connMethodPost,
                    sMethod = isPost ? "POST" : "GET",
                    sUri = isPost || !lang.isValue(oRequest) ? sLiveData : sLiveData + oRequest,
                    sRequest = isPost ? oRequest : null;
                this.connXhrMode != "queueRequests" ? oQueue.conn = oConnMgr.asyncRequest(sMethod, sUri, _xhrCallback, sRequest) : oQueue.conn ? (allRequests = oQueue.requests, allRequests.push({
                    request: oRequest,
                    callback: _xhrCallback
                }), oQueue.interval || (oQueue.interval = setInterval(function () {
                    oConnMgr.isCallInProgress(oQueue.conn) || (allRequests.length > 0 ? (sUri = isPost || !lang.isValue(allRequests[0].request) ? sLiveData : sLiveData + allRequests[0].request, sRequest = isPost ? allRequests[0].request : null, oQueue.conn = oConnMgr.asyncRequest(sMethod, sUri, allRequests[0].callback, sRequest), allRequests.shift()) : (clearInterval(oQueue.interval), oQueue.interval = null))
                }, 50))) : oQueue.conn = oConnMgr.asyncRequest(sMethod, sUri, _xhrCallback, sRequest)
            } else DS.issueCallback(oCallback, [oRequest, {
                error: !0
            }], !0, oCaller);
            return tId
        }
    });
    lang.augmentObject(util.XHRDataSource, DS);
    util.DataSource = function (oLiveData, oConfigs) {
        oConfigs = oConfigs || {};
        var dataType = oConfigs.dataType;
        if (dataType) {
            if (dataType == DS.TYPE_LOCAL) return lang.augmentObject(util.DataSource, util.LocalDataSource), new util.LocalDataSource(oLiveData, oConfigs);
            if (dataType == DS.TYPE_XHR) return lang.augmentObject(util.DataSource, util.XHRDataSource), new util.XHRDataSource(oLiveData, oConfigs);
            if (dataType == DS.TYPE_SCRIPTNODE) return lang.augmentObject(util.DataSource, util.ScriptNodeDataSource), new util.ScriptNodeDataSource(oLiveData, oConfigs);
            if (dataType == DS.TYPE_JSFUNCTION) return lang.augmentObject(util.DataSource, util.FunctionDataSource), new util.FunctionDataSource(oLiveData, oConfigs)
        }
        return YAHOO.lang.isString(oLiveData) ? (lang.augmentObject(util.DataSource, util.XHRDataSource), new util.XHRDataSource(oLiveData, oConfigs)) : YAHOO.lang.isFunction(oLiveData) ? (lang.augmentObject(util.DataSource, util.FunctionDataSource), new util.FunctionDataSource(oLiveData, oConfigs)) : (lang.augmentObject(util.DataSource, util.LocalDataSource), new util.LocalDataSource(oLiveData, oConfigs))
    };
    lang.augmentObject(util.DataSource, DS)
})();
YAHOO.util.Number = {
        format: function (C, G) {
            var B = YAHOO.lang,
                J, D, M, L, A, F;
            if (!B.isValue(C) || C === "") return "";
            if (G = G || {}, B.isNumber(C) || (C *= 1), B.isNumber(C)) {
                var E = C < 0,
                    K = C + "",
                    H = G.decimalSeparator ? G.decimalSeparator : ".",
                    I;
                if (B.isNumber(G.decimalPlaces) && (J = G.decimalPlaces, D = Math.pow(10, J), K = Math.round(C * D) / D + "", I = K.lastIndexOf("."), J > 0))
                    for (I < 0 ? (K += H, I = K.length - 1) : H !== "." && (K = K.replace(".", H)); K.length - 1 - I < J;) K += "0";
                if (G.thousandsSeparator) {
                    for (M = G.thousandsSeparator, I = K.lastIndexOf(H), I = I > -1 ? I : K.length, L = K.substring(I), A = -1, F = I; F > 0; F--) A++, A % 3 == 0 && F !== I && (!E || F > 1) && (L = M + L), L = K.charAt(F - 1) + L;
                    K = L
                }
                return K = G.prefix ? G.prefix + K : K, G.suffix ? K + G.suffix : K
            }
            return C
        }
    },
    function () {
        var A = function (C, E, D) {
                for (typeof D == "undefined" && (D = 10); parseInt(C, 10) < D && D > 1; D /= 10) C = E.toString() + C;
                return C.toString()
            },
            B = {
                formats: {
                    a: function (D, C) {
                        return C.a[D.getDay()]
                    },
                    A: function (D, C) {
                        return C.A[D.getDay()]
                    },
                    b: function (D, C) {
                        return C.b[D.getMonth()]
                    },
                    B: function (D, C) {
                        return C.B[D.getMonth()]
                    },
                    C: function (C) {
                        return A(parseInt(C.getFullYear() / 100, 10), 0)
                    },
                    d: ["getDate", "0"],
                    e: ["getDate", " "],
                    g: function (C) {
                        return A(parseInt(B.formats.G(C) % 100, 10), 0)
                    },
                    G: function (E) {
                        var F = E.getFullYear(),
                            D = parseInt(B.formats.V(E), 10),
                            C = parseInt(B.formats.W(E), 10);
                        return C > D ? F++ : C === 0 && D >= 52 && F--, F
                    },
                    H: ["getHours", "0"],
                    I: function (D) {
                        var C = D.getHours() % 12;
                        return A(C === 0 ? 12 : C, 0)
                    },
                    j: function (G) {
                        var F = new Date("" + G.getFullYear() + "/1/1 GMT"),
                            D = new Date("" + G.getFullYear() + "/" + (G.getMonth() + 1) + "/" + G.getDate() + " GMT"),
                            C = D - F,
                            E = parseInt(C / 864e5, 10) + 1;
                        return A(E, 0, 100)
                    },
                    k: ["getHours", " "],
                    l: function (D) {
                        var C = D.getHours() % 12;
                        return A(C === 0 ? 12 : C, " ")
                    },
                    m: function (C) {
                        return A(C.getMonth() + 1, 0)
                    },
                    M: ["getMinutes", "0"],
                    p: function (D, C) {
                        return C.p[D.getHours() >= 12 ? 1 : 0]
                    },
                    P: function (D, C) {
                        return C.P[D.getHours() >= 12 ? 1 : 0]
                    },
                    s: function (D) {
                        return parseInt(D.getTime() / 1e3, 10)
                    },
                    S: ["getSeconds", "0"],
                    u: function (C) {
                        var D = C.getDay();
                        return D === 0 ? 7 : D
                    },
                    U: function (F) {
                        var C = parseInt(B.formats.j(F), 10),
                            E = 6 - F.getDay(),
                            D = parseInt((C + E) / 7, 10);
                        return A(D, 0)
                    },
                    V: function (F) {
                        var E = parseInt(B.formats.W(F), 10),
                            C = new Date("" + F.getFullYear() + "/1/1").getDay(),
                            D = E + (C > 4 || C <= 1 ? 0 : 1);
                        return D === 53 && new Date("" + F.getFullYear() + "/12/31").getDay() < 4 ? D = 1 : D === 0 && (D = B.formats.V(new Date("" + (F.getFullYear() - 1) + "/12/31"))), A(D, 0)
                    },
                    w: "getDay",
                    W: function (F) {
                        var C = parseInt(B.formats.j(F), 10),
                            E = 7 - B.formats.u(F),
                            D = parseInt((C + E) / 7, 10);
                        return A(D, 0, 10)
                    },
                    y: function (C) {
                        return A(C.getFullYear() % 100, 0)
                    },
                    Y: "getFullYear",
                    z: function (E) {
                        var D = E.getTimezoneOffset(),
                            C = A(parseInt(Math.abs(D / 60), 10), 0),
                            F = A(Math.abs(D % 60), 0);
                        return (D > 0 ? "-" : "+") + C + F
                    },
                    Z: function (C) {
                        var D = C.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/, "$2").replace(/[a-z ]/g, "");
                        return D.length > 4 && (D = B.formats.z(C)), D
                    },
                    "%": function () {
                        return "%"
                    }
                },
                aggregates: {
                    c: "locale",
                    D: "%m/%d/%y",
                    F: "%Y-%m-%d",
                    h: "%b",
                    n: "\n",
                    r: "locale",
                    R: "%H:%M",
                    t: "\t",
                    T: "%H:%M:%S",
                    x: "locale",
                    X: "locale"
                },
                format: function (G, F, D) {
                    var H, I;
                    if (F = F || {}, !(G instanceof Date)) return YAHOO.lang.isValue(G) ? G : "";
                    H = F.format || "%m/%d/%Y";
                    H === "YYYY/MM/DD" ? H = "%Y/%m/%d" : H === "DD/MM/YYYY" ? H = "%d/%m/%Y" : H === "MM/DD/YYYY" && (H = "%m/%d/%Y");
                    D = D || "en";
                    D in YAHOO.util.DateLocale || (D = D.replace(/-[a-zA-Z]+$/, "") in YAHOO.util.DateLocale ? D.replace(/-[a-zA-Z]+$/, "") : "en");
                    for (var J = YAHOO.util.DateLocale[D], C = function (L, K) {
                            var M = B.aggregates[K];
                            return M === "locale" ? J[K] : M
                        }, E = function (L, K) {
                            var M = B.formats[K];
                            return typeof M == "string" ? G[M]() : typeof M == "function" ? M.call(G, G, J) : typeof M == "object" && typeof M[0] == "string" ? A(G[M[0]](), M[1]) : K
                        }; H.match(/%[cDFhnrRtTxX]/);) H = H.replace(/%([cDFhnrRtTxX])/g, C);
                    return I = H.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, E), C = E = undefined, I
                }
            };
        YAHOO.namespace("YAHOO.util");
        YAHOO.util.Date = B;
        YAHOO.util.DateLocale = {
            a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            A: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            b: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            B: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            c: "%a %d %b %Y %T %Z",
            p: ["AM", "PM"],
            P: ["am", "pm"],
            r: "%I:%M:%S %p",
            x: "%d/%m/%y",
            X: "%T"
        };
        YAHOO.util.DateLocale.en = YAHOO.lang.merge(YAHOO.util.DateLocale, {});
        YAHOO.util.DateLocale["en-US"] = YAHOO.lang.merge(YAHOO.util.DateLocale.en, {
            c: "%a %d %b %Y %I:%M:%S %p %Z",
            x: "%m/%d/%Y",
            X: "%I:%M:%S %p"
        });
        YAHOO.util.DateLocale["en-GB"] = YAHOO.lang.merge(YAHOO.util.DateLocale.en, {
            r: "%l:%M:%S %P %Z"
        });
        YAHOO.util.DateLocale["en-AU"] = YAHOO.lang.merge(YAHOO.util.DateLocale.en)
    }();
YAHOO.register("datasource", YAHOO.util.DataSource, {
    version: "2.7.0",
    build: "1799"
});
YAHOO.lang.JSON = function () {
    function _revive(data, reviver) {
        var walk = function (o, key) {
            var k, v, value = o[key];
            if (value && typeof value == "object")
                for (k in value) l.hasOwnProperty(value, k) && (v = walk(value, k), v === undefined ? delete value[k] : value[k] = v);
            return reviver.call(o, key, value)
        };
        return typeof reviver == "function" ? walk({
            "": data
        }, "") : data
    }

    function _char(c) {
        return _CHARS[c] || (_CHARS[c] = "\\u" + ("0000" + (+c.charCodeAt(0)).toString(16)).slice(-4)), _CHARS[c]
    }

    function _prepare(s) {
        return s.replace(_UNICODE_EXCEPTIONS, _char)
    }

    function _isValid(str) {
        return l.isString(str) && _INVALID.test(str.replace(_ESCAPES, "@").replace(_VALUES, "]").replace(_BRACKETS, ""))
    }

    function _string(s) {
        return '"' + s.replace(_SPECIAL_CHARS, _char) + '"'
    }

    function _stringify(h, key, d, w, pstack) {
        var o = typeof w == "function" ? w.call(h, key, h[key]) : h[key],
            i, len, j, k, v, isArray, a;
        o instanceof Date ? o = l.JSON.dateToString(o) : (o instanceof String || o instanceof Boolean || o instanceof Number) && (o = o.valueOf());
        switch (typeof o) {
        case "string":
            return _string(o);
        case "number":
            return isFinite(o) ? String(o) : "null";
        case "boolean":
            return String(o);
        case "object":
            if (o === null) return "null";
            for (i = pstack.length - 1; i >= 0; --i)
                if (pstack[i] === o) return "null";
            if (pstack[pstack.length] = o, a = [], isArray = l.isArray(o), d > 0)
                if (isArray)
                    for (i = o.length - 1; i >= 0; --i) a[i] = _stringify(o, i, d - 1, w, pstack) || "null";
                else {
                    if (j = 0, l.isArray(w))
                        for (i = 0, len = w.length; i < len; ++i) k = w[i], v = _stringify(o, k, d - 1, w, pstack), v && (a[j++] = _string(k) + ":" + v);
                    else
                        for (k in o) typeof k == "string" && l.hasOwnProperty(o, k) && (v = _stringify(o, k, d - 1, w, pstack), v && (a[j++] = _string(k) + ":" + v));
                    a.sort()
                }
            return pstack.pop(), isArray ? "[" + a.join(",") + "]" : "{" + a.join(",") + "}"
        }
        return undefined
    }
    var l = YAHOO.lang,
        _UNICODE_EXCEPTIONS = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        _ESCAPES = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        _VALUES = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        _BRACKETS = /(?:^|:|,)(?:\s*\[)+/g,
        _INVALID = /^[\],:{}\s]*$/,
        _SPECIAL_CHARS = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        _CHARS = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        };
    return {
        isValid: function (s) {
            return _isValid(_prepare(s))
        },
        parse: function (s, reviver) {
            if (s = _prepare(s), _isValid(s)) return _revive(eval("(" + s + ")"), reviver);
            throw new SyntaxError("parseJSON");
        },
        stringify: function (o, w, d) {
            return o !== undefined ? (l.isArray(w) && (w = function (a) {
                var uniq = [],
                    map = {},
                    v, i, j, len;
                for (i = 0, j = 0, len = a.length; i < len; ++i) v = a[i], typeof v == "string" && map[v] === undefined && (uniq[map[v] = j++] = v);
                return uniq
            }(w)), d = d >= 0 ? d : 1 / 0, _stringify({
                "": o
            }, "", d, w, [])) : undefined
        },
        dateToString: function (d) {
            function _zeroPad(v) {
                return v < 10 ? "0" + v : v
            }
            return d.getUTCFullYear() + "-" + _zeroPad(d.getUTCMonth() + 1) + "-" + _zeroPad(d.getUTCDate()) + "T" + _zeroPad(d.getUTCHours()) + ":" + _zeroPad(d.getUTCMinutes()) + ":" + _zeroPad(d.getUTCSeconds()) + "Z"
        },
        stringToDate: function (str) {
            if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/.test(str)) {
                var d = new Date;
                return d.setUTCFullYear(RegExp.$1, (RegExp.$2 | 0) - 1, RegExp.$3), d.setUTCHours(RegExp.$4, RegExp.$5, RegExp.$6), d
            }
            return str
        }
    }
}();
YAHOO.register("json", YAHOO.lang.JSON, {
    version: "2.7.0",
    build: "1799"
});

function delCookie(cookie_name) {
    var exp = new Date;
    exp.setTime(exp.getTime() - 1);
    document.cookie = cookie_name + "=" + getCookie(cookie_name) + "; expires=" + exp.toGMTString()
}

function setCookie(cookie_name, cookie_val, cookie_path) {
    setCookieEx(cookie_name, cookie_val, cookie_path, null)
}

function setCookieEx(cookie_name, cookie_val, cookie_path, cookie_expires) {
    setCookieEx2(cookie_name, cookie_val, cookie_path, cookie_expires, null)
}

function setCookieEx2(cookie_name, cookie_val, cookie_path, cookie_expires, cookie_domain) {
    null != cookie_name && (cookie_name = cookie_name.toUpperCase());
    var new_cookie = cookie_name + "=" + cookie_val + ";";
    new_cookie += " path=";
    new_cookie += null != cookie_path ? cookie_path : "/";
    null != cookie_expires && (new_cookie += "; expires=" + cookie_expires);
    null != cookie_domain && (new_cookie += "; domain=" + cookie_domain);
    document.cookie = new_cookie
}

function getCookieVal(cookie_text, offset, delim) {
    var endstr = cookie_text.indexOf(delim, offset);
    return endstr == -1 && (endstr = cookie_text.length), decodeURIComponent(cookie_text.substring(offset, endstr))
}

function getCookie(cookie_name) {
    for (var arg = cookie_name.toLowerCase() + "=", alen = arg.length, clen = document.cookie.length, i = 0, j; i < clen;) {
        if (j = i + alen, document.cookie.substring(i, j).toLowerCase() == arg) return getCookieVal(document.cookie, j, ";");
        if (i = document.cookie.indexOf(" ", i) + 1, i == 0) break
    }
    return null
}

function getDictionaryCookie(cookie_name, key) {
    var dictionary = getCookie(cookie_name);
    if (null == dictionary) return null;
    var dict_src = dictionary.toLowerCase(),
        dict_key = key.toLowerCase() + "=",
        startPos = -1;
    do
        if (startPos = dict_src.indexOf(dict_key, startPos + 1), -1 != startPos && (0 == startPos || "&" == dict_src.charAt(startPos - 1))) return getCookieVal(dictionary, startPos + dict_key.length, "&");
    while (-1 != startPos);
    return null
}

function setDictionaryCookieEx(cookie_name, key, value, path, expires, domain) {
    var dictionary, dict_src, start_key, end_key;
    null != cookie_name && (cookie_name = cookie_name.toUpperCase());
    null != key && (key = key.toUpperCase());
    dictionary = getCookie(cookie_name);
    null == dictionary ? dictionary = key + "=" + value : (dict_src = dictionary.toLowerCase(), start_key = dict_src.indexOf(key.toLowerCase() + "="), -1 == start_key ? (dictionary.length > 0 && (dictionary = dictionary + "&"), dictionary = dictionary + key + "=" + value) : (end_key = dict_src.indexOf("&", start_key), -1 == end_key ? dictionary = 0 == start_key ? key + "=" + value : dictionary.substring(0, start_key) + key + "=" + value : (dict_src = dictionary, dictionary = "", start_key > 0 && (dictionary = dict_src.substring(0, start_key)), dictionary = dictionary + key + "=" + value, dictionary = dictionary + dict_src.substring(end_key))));
    setCookieEx2(cookie_name, dictionary, path, expires, domain)
}

function setDictionaryCookie(cookie_name, key, value, path, expires) {
    setDictionaryCookieEx(cookie_name, key, value, path, expires, null)
}

function setVarsCookie(key, value) {
    var exp = new Date;
    exp.setFullYear(exp.getFullYear() + 20, 0, 14);
    setDictionaryCookieEx("VARS", key, value, null, exp.toGMTString(), getRootDomain())
}

function getVarsCookie(key) {
    return getDictionaryCookie("VARS", key)
}

function getVars2Cookie(key) {
    return getDictionaryCookie("VARSESSION", key)
}

function areBrowserCookiesEnabled() {
    var cookie_name = "cookie_test";
    return (setCookie(cookie_name, "true", "/"), null == getCookie(cookie_name)) ? !1 : (delCookie(cookie_name), !0)
}

function isAOLEnvironment() {
    return -1 != navigator.userAgent.indexOf("AOL")
}

function GetPageScheme() {
    return null != document.location && null != document.location.href && document.location.href.toLowerCase().indexOf("https://") == 0 ? "https" : "http"
}

function getRootDomain() {
    var d = document.domain.split("."),
        n = d.length,
        t = d[n - 2] + "." + d[n - 1];
    return d[n - 1].length > 2 ? t : d[n - 2] == "com" || d[n - 2] == "co" ? d[n - 3] + "." + t : t
};

function initValidationStrings() {
    monthNamesAll = [$trees.res.getString("g.monthNamesJan"), $trees.res.getString("g.monthNamesFeb"), $trees.res.getString("g.monthNamesMar"), $trees.res.getString("g.monthNamesApr"), $trees.res.getString("g.monthNamesMay"), $trees.res.getString("g.monthNamesJun"), $trees.res.getString("g.monthNamesJul"), $trees.res.getString("g.monthNamesAug"), $trees.res.getString("g.monthNamesSep"), $trees.res.getString("g.monthNamesOct"), $trees.res.getString("g.monthNamesNov"), $trees.res.getString("g.monthNamesDec")];
    monthAbbrs = [$trees.res.getString("g.monthAbbrsJan"), $trees.res.getString("g.monthAbbrsFeb"), $trees.res.getString("g.monthAbbrsMar"), $trees.res.getString("g.monthAbbrsApr"), $trees.res.getString("g.monthAbbrsMay"), $trees.res.getString("g.monthAbbrsJun"), $trees.res.getString("g.monthAbbrsJul"), $trees.res.getString("g.monthAbbrsAug"), $trees.res.getString("g.monthAbbrsSep"), $trees.res.getString("g.monthAbbrsOct"), $trees.res.getString("g.monthAbbrsNov"), $trees.res.getString("g.monthAbbrsDec")];
    aboutAbbr = $trees.res.getString("g.dateAboutAbbr");
    beforeAbbr = $trees.res.getString("g.dateBeforeAbbr");
    afterAbbr = $trees.res.getString("g.dateAfterAbbr");
    betweenAbbr = $trees.res.getString("g.dateBetweenAbbr");
    conjunctionAbbr = $trees.res.getString("g.dateConjunctionAbbr");
    rangeAbbr = $trees.res.getString("g.dateRangeAbbr");
    unknown = $trees.res.getString("g.unknown");
    monthDayYearOrder = $trees.res.getString("g.monthDayYearOrder");
    warnDateYearTooBig = $trees.res.getString("g.warnDateYearTooBig");
    warnDateTwoMonths = $trees.res.getString("g.warnDateTwoMonths");
    warnDateDayWithoutMonth = $trees.res.getString("g.warnDateDayWithoutMonth");
    warnDateTwoDays = $trees.res.getString("g.warnDateTwoDays");
    warnDateTwoYears = $trees.res.getString("g.warnDateTwoYears");
    warnDateDayTooLarge = $trees.res.getString("g.warnDateDayTooLarge");
    warnDateMonthTooLarge = $trees.res.getString("g.warnDateMonthTooLarge");
    warnDateInvalidMonth = $trees.res.getString("g.warnDateInvalidMonth");
    warnDateBirthBeforeMother = $trees.res.getString("g.warnDateBirthBeforeMother");
    warnDateBirthAfterMother = $trees.res.getString("g.warnDateBirthAfterMother");
    warnDateBirthBeforeFather = $trees.res.getString("g.warnDateBirthBeforeFather");
    warnDateBirthAfterFather = $trees.res.getString("g.warnDateBirthAfterFather");
    warnDateBirth120BeforeDeath = $trees.res.getString("g.warnDateBirth120BeforeDeath");
    warnDateDeath120AfterBirth = $trees.res.getString("g.warnDateDeath120AfterBirth");
    warnDateBeforeBirth = $trees.res.getString("g.warnDateBeforeBirth");
    warnDateAfterDeath = $trees.res.getString("g.warnDateAfterDeath");
    warnDateMayBeWrong = $trees.res.getString("g.warnDateMayBeWrong");
    warnStillUseIt = $trees.res.getString("g.warnStillUseIt");
    warnOfTheSpouse = $trees.res.getString("g.warnOfTheSpouse");
    badBirthDate = $trees.res.getString("g.badBirthDate");
    badDeathDate = $trees.res.getString("g.badDeathDate");
    badMarriageDate = $trees.res.getString("g.badMarriageDate");
    warnLastName = $trees.res.getString("g.warnLastName");
    warnNameEmpty = $trees.res.getString("g.warnNameEmpty");
    warnNameFather = $trees.res.getString("g.warnNameFather");
    warnNameMaiden = $trees.res.getString("g.warnNameMaiden");
    invalidNameChars = $trees.res.getString("g.invalidNameCharsJS");
    errorNameInvalidChar = $trees.res.getString("g.errorNameInvalidChar")
}

function validDate(dateInput, eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath, acceptRanges) {
    var input = dateInput.toLowerCase(),
        betweenModifier = !1,
        twoDates, results = [0, ""],
        parsedInput;
    if (input.length > 0) {
        if ((typeof unknown == "undefined" || unknown == null) && initValidationStrings(), unknown != null && input.indexOf(unknown.toLowerCase()) >= 0 && (input = ""), isDigit(input.charAt(0)) || (parsedInput = parseModifier(input, aboutAbbr), parsedInput.length < input.length ? input = parsedInput : (parsedInput = parseModifier(input, beforeAbbr), parsedInput.length < input.length ? input = parsedInput : (parsedInput = parseModifier(input, afterAbbr), parsedInput.length < input.length ? input = parsedInput : acceptRanges && (parsedInput = parseModifier(input, betweenAbbr), parsedInput.length < input.length && (input = parsedInput, betweenModifier = !0))))), acceptRanges && (betweenModifier ? (twoDates = new Array(2), twoDates = splitDateRange(input, !0)) : (twoDates = new Array(2), twoDates = splitDateRange(input, !1)), twoDates[0].length > 0 && twoDates[1].length > 0)) return results = validDate(twoDates[0], eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath), results[0] == 0 && (results = validDate(twoDates[1], eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath)), results;
        results = validateDate(input);
        results[0] == 0 && results[1].length > 0 && eventType.length > 0 && (results[0] = checkDates(results[1], results[2], results[3], eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath));
        results[0] != 0 && (results[1] = getWarning(results[0]))
    }
    return results
}

function getWarning(errorCode) {
    switch (errorCode) {
    case 1:
        return warnDateYearTooBig;
    case 2:
        return warnDateTwoMonths;
    case 3:
        return warnDateDayWithoutMonth;
    case 4:
        return warnDateTwoDays;
    case 5:
        return warnDateTwoMonths;
    case 6:
        return warnDateTwoYears;
    case 7:
        return warnDateDayTooLarge;
    case 8:
        return warnDateMonthTooLarge;
    case 9:
        return warnDateInvalidMonth;
    case 101:
        return warnDateBirthBeforeMother;
    case 102:
        return warnDateBirthAfterMother;
    case 103:
        return warnDateBirthBeforeFather;
    case 104:
        return warnDateBirthAfterFather;
    case 105:
        return warnDateBirth120BeforeDeath;
    case 106:
        return warnDateDeath120AfterBirth;
    case 107:
        return warnDateBeforeBirth;
    case 108:
        return warnDateAfterDeath;
    default:
        return ""
    }
}

function splitDateRange(dateStr, useConjunction) {
    var results = new Array(2),
        i = 0,
        abbrs, splitters, splitAbbr, pos;
    for (results[0] = "", results[1] = "", abbrs = useConjunction ? conjunctionAbbr : rangeAbbr, splitters = abbrs.split("|"), i = 0; i < splitters.length; i++) splitAbbr = splitters[i], pos = dateStr.indexOf(splitAbbr), pos > 0 && dateStr.length > pos + splitAbbr.length && (dateStr.indexOf(splitAbbr, pos + 1) != -1 || isLetter(dateStr.charAt(pos)) && isLetter(dateStr.charAt(pos - 1)) || isLetter(dateStr.charAt(pos + splitAbbr.length)) && isLetter(dateStr.charAt(pos + splitAbbr.length - 1)) || (results[0] = dateStr.substring(0, pos), results[1] = dateStr.substring(pos + splitAbbr.length)));
    return results
}

function validDateOwt(dateInput) {
    return validDate(dateInput, "", "", "", "", "", "", "", !1)
}

function validDateSimple(dateInput) {
    return validDate(dateInput, "", "", "", "", "", "", "", !0)
}

function validateDate(dateInput) {
    for (var results = new Array(4), date = getTokens(dateInput), possibleDays = [], possibleMonths = [], validMonthByName = 0, possibleYears = [], iMonth = 0, iDay = 0, iYear = 0, yearFoundFirst = !1, d = new Date, currYear = d.getFullYear(), i = 0, token, monthNumber, tmp, date = stripDayModifier(date), i = 0; i < date.length; i++)
        if (token = date[i], isDigit(token.charAt(0)))
            if (token <= 31 && possibleDays.push(token), token <= 12 && possibleMonths.push(token), token <= currYear) possibleDays.length == 0 && possibleMonths.length == 0 && (yearFoundFirst = !0), possibleYears.push(token);
            else return results[0] = 1, results;
    else if (monthNumber = monthTextToNumber(token.toLowerCase()), monthNumber > 0) {
        if (validMonthByName > 0) return results[0] = 2, results;
        validMonthByName = monthNumber
    } else return results[0] = 9, results;
    if (validMonthByName > 0 ? (iMonth = validMonthByName, possibleMonths.length = 0) : possibleMonths.length == 1 && (iMonth = possibleMonths[0], removeItem(possibleDays, iMonth), removeItem(possibleYears, iMonth)), possibleDays.length == 1) {
        if (iDay = possibleDays[0], removeItem(possibleYears, iDay), iMonth == 0) return results[0] = 3, results
    } else if (possibleDays.length > 1) switch (possibleDays.length) {
    case 2:
        if (possibleMonths.length == 2) iMonth = possibleMonths[0], iDay = possibleDays[1], iMonth != iDay && monthDayYearOrder.indexOf("D") < monthDayYearOrder.indexOf("M") && (yearFoundFirst == !1 || monthDayYearOrder.indexOf("Y") == 0) && (tmp = iDay, iDay = iMonth, iMonth = tmp), possibleDays[0] = iDay, possibleDays.length = 1, removeItem(possibleYears, iDay), possibleMonths[0] = iMonth, possibleMonths.length = 1, removeItem(possibleYears, iMonth);
        else if (possibleYears.length == 2) iDay = possibleDays[0], monthDayYearOrder.indexOf("Y") < monthDayYearOrder.indexOf("D") && (iDay = possibleDays[1], possibleDays[0] = iDay), possibleDays.length = 1, removeItem(possibleYears, iDay);
        else return results[0] = 4, results;
        break;
    case 3:
        possibleYears.length == 3 && possibleMonths.length == 0 && (iDay = possibleDays[monthDayYearOrder.indexOf("D")], iMonth = possibleDays[monthDayYearOrder.indexOf("M")], possibleYears[0] = possibleDays[monthDayYearOrder.indexOf("Y")], possibleYears.length = 1, possibleMonths[0] = iMonth, possibleMonths.length = 1, possibleDays[0] = iDay, possibleDays.length = 1);
        break;
    default:
        return results[0] = 4, results
    }
    if (possibleMonths.length > 1) return results[0] = 5, results;
    if (possibleYears.length == 1) iYear = possibleYears[0];
    else if (possibleYears.length > 1) return results[0] = possibleDays.length == 0 ? possibleMonths.length == 0 ? 6 : 7 : validMonthByName == 0 && possibleMonths.length == 0 ? 8 : 6, results;
    return iMonth > 0 && iDay > 0 && !isDayInBounds(iMonth, iDay, iYear) ? (results[0] = 7, results) : (results[0] = 0, results[1] = possibleYears.length > 0 ? iYear : "", results[2] = iMonth, results[3] = iDay, results)
}

function stripDayModifier(dateIn) {
    for (var newDate = [], i = 0, i = 0; i < dateIn.length; i++) isLetter(dateIn[i].charAt(0)) ? isLetter(dateIn[i].charAt(0)) && dateIn[i].length > 2 ? newDate.push(dateIn[i]) : dateIn[i] != "th" && dateIn[i] != "nd" && dateIn[i] != "rd" && dateIn[i] != "st" && dateIn[i].length > 2 && newDate.push(dateIn[i]) : newDate.push(dateIn[i]);
    return newDate
}

function monthTextToNumber(mon) {
    for (var possibleMonth = 0, i = 0, abbrs, monLower, i = 0; i < 12; i++) {
        for (abbrs = monthAbbrs[i].split(":"), j = 0; j < abbrs.length; j++)
            if (mon == abbrs[j]) return i + 1;
        if (monLower = ":" + mon, monthNamesAll[i].indexOf(monLower) >= 0) {
            if (possibleMonth > 0) return 0;
            possibleMonth = i + 1
        }
    }
    return possibleMonth
}

function parseModifier(str, modifierList) {
    for (var lstr = str.toLowerCase(), modifiers = modifierList.split("|"), i = 0, i = 0; i < modifiers.length; i++)
        if (lstr.substring(0, modifiers[i].length + 1) == modifiers[i] + " ") return str.substring(modifiers[i].length + 1);
    return str
}

function checkDates(year, month, day, eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath) {
    var bdate = null,
        ddate = null,
        fdate = null,
        mdate = null;
    if (eventType == "birth") {
        if (motherBirth != null && motherBirth.length > 0 && (mdate = validateDate(motherBirth), mdate[0] == 0 && mdate[1].length > 0 && year < parseInt(mdate[1], 10) + 15)) return 101;
        if (motherDeath != null && motherDeath.length > 0 && (mdate = validateDate(motherDeath), mdate[0] == 0 && mdate[1].length > 0 && year > parseInt(mdate[1], 10))) return 102;
        if (fatherBirth != null && fatherBirth.length > 0 && (fdate = validateDate(fatherBirth), fdate[0] == 0 && fdate[1].length > 0 && year < parseInt(fdate[1], 10) + 17)) return 103;
        if (fatherDeath != null && fatherDeath.length > 0 && (fdate = validateDate(fatherDeath), fdate[0] == 0 && fdate[1].length > 0 && year > parseInt(fdate[1], 10) + 1)) return 104;
        if (ddate == null && ownDeath != null && ownDeath.length > 0 && (ddate = validateDate(ownDeath)), ddate != null && ddate[0] == 0 && ddate[1].length > 0 && year < parseInt(ddate[1], 10) - 120) return 105
    } else {
        if (bdate == null && ownBirth != null && ownBirth.length > 0 && (bdate = validateDate(ownBirth)), eventType == "death" && bdate != null && bdate[0] == 0 && bdate[1].length > 0 && year > parseInt(bdate[1], 10) + 120) return 106;
        if (bdate != null && bdate[0] == 0 && dateCompare(year, month, day, bdate[1], bdate[2], bdate[3]) == -1) return 107
    }
    return eventType != "death" && eventType != "burial" && eventType != "cremation" && eventType != "funeral" && (ddate == null && ownDeath.length > 0 && (ddate = validateDate(ownDeath)), ddate != null && ddate[0] == 0 && dateCompare(year, month, day, ddate[1], ddate[2], ddate[3]) == 1) ? 108 : 0
}

function dateCompare(year1, month1, day1, year2, month2, day2) {
    var retVal = 0;
    return year1 != null && year1.length > 0 && year2 != null && year2.length > 0 && (parseInt(year1, 10) < parseInt(year2, 10) ? retVal = -1 : parseInt(year1, 10) > parseInt(year2, 10) ? retVal = 1 : month1 != null && month1 > 0 && month2 != null && month2 > 0 && (parseInt(month1, 10) < parseInt(month2, 10) ? retVal = -1 : parseInt(month1, 10) > parseInt(month2, 10) ? retVal = 1 : day1 != null && day1.length > 0 && day2 != null && day2.length > 0 && (parseInt(day1, 10) < parseInt(day2, 10) ? retVal = -1 : parseInt(day1, 10) > parseInt(day2, 10) && (retVal = 1)))), retVal
}

function getTokens(str) {
    for (var output = [], token = "", doingNumber = !1, doingText = !1, i = 0, c, i = 0; i < str.length; i++) c = str.charAt(i), isDigit(c) ? (doingText ? (output.push(token), token = c, doingText = !1) : token += c, doingNumber = !0) : " /-.,:;".indexOf(c) != -1 ? token.length > 0 && (output.push(token), token = "", doingText = !1, doingNumber = !1) : (doingNumber ? (output.push(token), token = c, doingNumber = !1) : token += c, doingText = !0);
    return token.length > 0 && output.push(token), output
}

function isDigit(n) {
    return n < "0" || n > "9" ? !1 : !0
}

function isLetter(n) {
    return n >= "a" && n <= "z" || n >= "A" && n <= "Z" ? !0 : !1
}

function removeItem(array, item) {
    for (var i = 0, j, i = 0; i < array.length; i++)
        if (array[i] == item) {
            for (j = 0, j = i; j < array.length - 1; j++) array[j] = array[j + 1];
            array.length--
        }
    return array
}

function isDayInBounds(month, day, year) {
    if (day < 1) return !1;
    switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
        return day <= 30;
    case 2:
        var febDays = 29;
        return year > 0 && (year % 4 != 0 ? febDays = 28 : year % 400 == 0 ? febDays = 29 : year % 100 == 0 && (febDays = 28)), day <= febDays;
    default:
        return day <= 31
    }
}

function checkForInvalidChar(s) {
    for (var i = 0, i = 0; i < s.length; i++)
        if (invalidNameChars.indexOf(s.charAt(i)) >= 0) return s.charAt(i);
    return ""
}

function validateSurname(surname, fatherSurname, husbandSurname) {
    var lastname = surname.toLowerCase(),
        father = fatherSurname.toLowerCase(),
        husband = husbandSurname.toLowerCase(),
        retVal = "";
    return father.length > 0 ? lastname != father && (retVal = nameMatch(lastname, husband) ? warnNameMaiden : warnNameFather) : nameMatch(lastname, husband) && (retVal = warnNameMaiden), retVal
}

function nameMatch(name, nameList) {
    var i = 0,
        names;
    if (name.length > 0)
        for (names = nameList.split(";"), i = 0; i < names.length; i++)
            if (name == names[i]) return !0;
    return !1
}
var monthNamesAll, monthAbbrs, aboutAbbr, beforeAbbr, afterAbbr, betweenAbbr, conjunctionAbbr, rangeAbbr, unknown, monthDayYearOrder, warnDateYearTooBig, warnDateTwoMonths, warnDateDayWithoutMonth, warnDateTwoDays, warnDateTwoYears, warnDateDayTooLarge, warnDateMonthTooLarge, warnDateInvalidMonth, warnDateBirthBeforeMother, warnDateBirthAfterMother, warnDateBirthBeforeFather, warnDateBirthAfterFather, warnDateBirth120BeforeDeath, warnDateDeath120AfterBirth, warnDateBeforeBirth, warnDateAfterDeath, warnDateMayBeWrong, warnStillUseIt, warnOfTheSpouse, badBirthDate, badDeathDate, badMarriageDate, warnLastName, warnNameFather, warnNameMaiden, invalidNameChars, errorNameInvalidChar, $val = {}