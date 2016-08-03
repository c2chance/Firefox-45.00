var endDragCanvas = !1, $hideTimeOut;
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
$trees.TreeMapObject = function(viewportDivId, canvasDivId, controlsDivId, focusPid, focusNodeId, changeFocusUrlTemplate, viewProfileUrlTemplate, printUrlTemplate, viewerType, cache) {
    this.init(viewportDivId, canvasDivId, controlsDivId, focusPid, focusNodeId, changeFocusUrlTemplate, viewProfileUrlTemplate, printUrlTemplate, viewerType, cache)
};

$trees.TreeMapObject.prototype = {
    viewportDivId: "",
    viewportMinHeight: 600,
    viewportEl: null ,
    viewportX: 0,
    viewportY: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    windowScrollTop: 0,
    canvasEl: null ,
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
    zoomEvent: null ,
    liftZoom: .01,
    panEvent: null ,
    dragEndEvent: null ,
    changeFocusUrlTemplate: "",
    viewProfileUrlTemplate: "",
    printUrlTemplate: "",
    focusNodeEl: null ,
    viewerType: "",
    familyNodeDimensions: {
        width: 1.3538461538461539,
        height: 2.2153846153846151
    },
    dragInProgress: !1,
    moveInProgress: !1,
    dragFilter: null ,
    movAnimTimer: -1,
    cacheUrl: "",
    extendedGraphOffset: 0,
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
    init: function(viewportDivId, canvasDivId, controlsDivId, focusPid, focusNodeId, changeFocusUrlTemplate, viewProfileUrlTemplate, printUrlTemplate, viewerType, cache) {
        var dom;
        this.viewerType = viewerType; // "family"
        "pedigree" == viewerType && (this.scaleFactor = 140);
        dom = YAHOO.util.Dom;
        
        this.viewportDivId = viewportDivId;   // trVp
        this.viewportEl = dom.get(viewportDivId); // div#trVp.trVp.openhand
        this.setViewportDimensions(); // return a region that is occupied by the DOM element
        this.canvasEl = dom.get(canvasDivId); // canvasDivId = trGraph, canvasEl = div#trGraph.trGraph
        this.controlsDivId = controlsDivId;   // trVwHd
        // changeFocusUrlTemplate  ::  'http://trees.ancestry.com/tree/81749066/family?cfpid=%7Bcfpid%7D'
        this.changeFocusUrlTemplate = decodeURI(changeFocusUrlTemplate); // "http://trees.ancestry.com/tree/81749066/family?cfpid={cfpid}"
        // viewProfileUrlTemplate  ::  'http://trees.ancestry.com/tree/81749066/person/%7Bpid%7D'
        this.viewProfileUrlTemplate = decodeURI(viewProfileUrlTemplate); // "http://trees.ancestry.com/tree/81749066/person/{pid}"
        // printUrlTemplate        ::  'http://trees.ancestry.com/tree/81749066/person/42446045903/familyview/print'
        this.printUrlTemplate = decodeURI(printUrlTemplate); // "http://trees.ancestry.com/tree/81749066/person/42446045903/familyview/print"
        var transformEl = document.getElementById(canvasDivId),
            transformSt = window.getComputedStyle(transformEl, null),
            trMatrix = transformSt.getPropertyValue("-webkit-transform") || transformSt.getPropertyValue("-moz-transform") || transformSt.getPropertyValue("-ms-transform") || transformSt.getPropertyValue("-o-transform") || transformSt.getPropertyValue("transform") || "fail...",
            values = trMatrix.split("(")[1];
            // transformEl == div#trGraph.trGraph
            // transformSt ==  CSS2Properties { 0="align-content",  1="align-items",  2="align-self",  ����...}
            // trMatrix ==  "matrix(0.4, 0, 0, 0.4, 0, 0)"
            // values == 	"0.4, 0, 0, 0.4, 0, 0)"
        values = values.split(")")[0];
        // values ==	"0.4, 0, 0, 0.4, 0, 0"
        values = values.split(",");
        // values = "0.4", " 0", " 0", 3 ����... == ["0.4", " 0", " 0", "0.4", " 0", " 0"] length=6
        //   convert to a Array
        var scaleX = values[0],
            skewX = values[1],
            skewY = values[2],
            scaleY = values[3],
            translateX = values[4],
            translateY = values[5];
        this.zoomLevel = scaleX / this.scaleMax;
        // this.zoomLevel = 0.4 / 1 = 0.4
        this.left = parseInt(this.canvasEl.style.left, 10) / this.zoomLevel / this.scaleFactor;
        // 346.167px --> 130 / 0.4 / 130 = 6.653846153856154
        isNaN(this.left) && (this.left = 0);
        this.top = parseInt(this.canvasEl.style.top, 10) / this.zoomLevel / this.scaleFactor;
        // 101.167px --> 101 / 0.4 / 130 == 1.9423076923076923
        isNaN(this.top) && (this.top = 0);
        this.focusNodeEl = dom.get(focusNodeId);
        // dom.get("42446045903:0") 
        // div#42446045903:0.node.male.focus.nodeFamily or div#0:0.nodePedigree.node.male.focus by chrome
        this.disableSelection(this.viewportEl); // this.viewportEl == div#trVp.trVp.openhand
        // Disable selection of text content within the set of matched elements. 
        //   version added: 1.6 deprecated: 1.9
        this.cacheUrl = cache; // "http://c.mfcreative.com/TRE_ATW/4.2.2874.2874/cdn/treemap" 
        
        var gesturesInWindows = !1,
            viewportDiv = $("#" + viewportDivId)[0],
            pinchDistance = 0;
            // false
            // viewportDiv = div#trVp.trVp.openhand
            
        // #trVp.on()    
        $("#" + viewportDivId).on("pointertouchmousedown", function (e) {
            $trees.treeMap.startDragCanvas(e)
        }).on("MSGestureStart gesturestart", function() {
            $(".pullToFullScreen").addClass("gestureing");
            gesturesInWindows = !0;
            endDragCanvas = !0
        }).on("MSGestureChange gesturechange", function(e) {
            if (!window.treesScreenType("smart-phone") || $("body").hasClass("treeViewerAwesomeNavigating"))
                return e.originalEvent.scale >= 1 ? ($trees.toolbar.zoomInCB(),
                e.stopPropagation(),
                !1) : ($trees.toolbar.zoomOutCB(),
                e.stopPropagation(),
                !1)
        }).on("MSGestureEnd gestureend", function() {
            endDragCanvas = !1;
            $(".pullToFullScreen").removeClass("gestureing")
        });
        // div#trVp.trVp.openhand . addEventListener
        viewportDiv.addEventListener("touchstart", function(e) {
            gesturesInWindows === !1 && (e.touches.length > 1 ? ($(".pullToFullScreen").addClass("gestureing"),
            pinchDistance = Math.sqrt(Math.pow(e.touches[1].pageX - e.touches[0].pageX, 2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY, 2)),
            endDragCanvas = !0) : pinchDistance = 0)
        });
        viewportDiv.addEventListener("touchmove", function(e) {
            if (gesturesInWindows === !1) {
                var newDistance = Math.sqrt(Math.pow(e.touches[1].pageX - e.touches[0].pageX, 2) + Math.pow(e.touches[1].pageY - e.touches[0].pageY, 2))
                  , scale = newDistance / pinchDistance;
                if (pinchDistance <= 0)
                    return;
                if (!window.treesScreenType("smart-phone") || $("body").hasClass("treeViewerAwesomeNavigating"))
                    return scale >= 1 ? ($trees.toolbar.zoomInCB(),
                    e.stopPropagation(),
                    !1) : ($trees.toolbar.zoomOutCB(),
                    e.stopPropagation(),
                    !1)
            }
        });
        viewportDiv.addEventListener("touchend", function() {
            gesturesInWindows === !1 && (endDragCanvas = !1,
            $(".pullToFullScreen").removeClass("gestureing"),
            pinchDistance <= 0)
        });
        // addListener(el, sType, fn, obj, overrideContext)
        YAHOO.util.Event.addListener(window, "scroll", this.scrollWindow, this, !0);
        this.zoomEvent = new YAHOO.util.CustomEvent("treemapzoom");
        this.panEvent = new YAHOO.util.CustomEvent("treemappan");
        this.dragEndEvent = new YAHOO.util.CustomEvent("treemapdragend");
        this.scrollEvent = new YAHOO.util.CustomEvent("treemapscroll");
        $(".pageHeader").trigger("treemappan", [{
            top: parseFloat(this.canvasEl.style.top) + this.extendedGraphOffset
        }])
    },
    getFocusCenter: function() {
        return this.focusNodeEl != null  ? this.getFocusCenterEx(this.focusNodeEl) : {
            x: 0,
            y: 0
        }
    },
    getFocusCenterId: function(fnId) {
        if (fnId != null ) {
            var focusNode_El = YAHOO.util.Dom.get(fnId);
            if (focusNode_El || (focusNode_El = dom.get("0:" + fnId)),
            focusNode_El || (focusNode_El = dom.get("1:" + fnId)),
            focusNode_El != null )
                return this.getFocusCenterEx(focusNode_El)
        }
        return {
            x: 0,
            y: 0
        }
    },
    getFocusCenterEx: function(focusnode_e1) {
        var centerX = 0, centerY = 0, focusNodeCenter, viewportWidth;
        return focusnode_e1 != null  && (focusNodeCenter = this.getFocusNodeCenter(focusnode_e1),
        centerY = focusNodeCenter.y,
        this.viewerType == "family" ? centerX = focusNodeCenter.x : (viewportWidth = this.viewportWidth / this.scaleFactor / this.zoomLevel,
        centerX = focusNodeCenter.x - focusNodeCenter.w / 2 + viewportWidth / 2 - 70 / this.scaleFactor / this.zoomLevel)),
        {
            x: centerX,
            y: centerY
        }
    },
    getFocusPosition: function(nodeId, expansionlevel) {
        var focusPosX = 0, focusPosY = 0, expansionDiv, expDim, focusPos;
        return nodeId != null  && (expansionDiv = YAHOO.util.Dom.get("graphRect" + expansionlevel.toString()),
        expansionDiv != null  && (expDim = this.getExpansionDimensions(expansionDiv),
        focusPos = this.getFocusPositionEx(nodeId, expDim),
        focusPosX = focusPos.x,
        focusPosY = focusPos.y)),
        {
            x: focusPosX,
            y: focusPosY
        }
    },
    getFocusPositionEx: function(nodeId, expDim) {
        var focusPosX = 0, focusPosY = 0, nodeCtrl, canvasPosTL, canvasPosBR, focusCenter, centerViewPort, centerExpansion;
        if (nodeId != null  && (nodeCtrl = YAHOO.util.Dom.get(nodeId),
        nodeCtrl != null  && (canvasPosTL = this.translateToCanvasCoordinates(0, 0),
        canvasPosBR = this.translateToCanvasCoordinates(this.viewportWidth, this.viewportHeight),
        focusPosX = this.left,
        focusPosY = this.top,
        expDim != null ))) {
            var nodeCenter = this.getFocusNodeCenter(nodeCtrl)
              , viewportWidth = this.viewportWidth / this.scaleFactor / this.zoomLevel
              , viewportHeight = this.viewportHeight / this.scaleFactor / this.zoomLevel
              , difX = 0
              , difY = 0
              , tooWide = !1;
            if (expDim.width > viewportWidth && (difX = expDim.width / 2 - viewportWidth / 2,
            tooWide = !0),
            expDim.height > viewportHeight)
                if (tooWide == !1)
                    difY = expDim.height / 2 - viewportHeight / 2;
                else if (focusCenter = this.getFocusCenterEx(nodeCtrl),
                focusCenter.x != 0 && focusCenter.y != 0)
                    return this.focusOnPointAnim(this.zoomLevel, focusCenter.x, focusCenter.y),
                    {
                        x: 0,
                        y: 0
                    };
            var e = Number(".8")
              , s = this.viewerType == "pedigree" ? Number("1.5") : Number(".6")
              , t = Number("1.3");
            if (expDim.left + e < canvasPosTL.x)
                return focusPosX = focusPosX + (canvasPosTL.x + e - expDim.left) + difX,
                centerViewPort = canvasPosTL.y + viewportHeight / 2,
                centerExpansion = expDim.top + expDim.height / 2,
                focusPosY = centerExpansion > centerViewPort ? focusPosY - (centerExpansion - centerViewPort) + t : focusPosY + (centerViewPort - centerExpansion) - t,
                {
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
    showNodeFocusAnim: function(nodeIdArray) {
        var areaBoundries = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }, x, nodeIdToMove, nodeCtrl, nodeDim, nodeDimRight, nodeDimBottom, focusPos;
        if (nodeIdArray.length > 0)
            for (x = 0; x < nodeIdArray.length; x++)
                nodeIdToMove = nodeIdArray[x],
                nodeCtrl = YAHOO.util.Dom.get(nodeIdToMove.toString()),
                nodeCtrl != null  && (nodeDim = this.getNodeDimensions(nodeCtrl),
                (nodeDim.left < areaBoundries.left || areaBoundries.left == 0) && (areaBoundries.left = nodeDim.left),
                (nodeDim.top < areaBoundries.top || areaBoundries.top == 0) && (areaBoundries.top = nodeDim.top),
                nodeDimRight = nodeDim.left + nodeDim.width,
                nodeDimBottom = nodeDim.top + nodeDim.height,
                (areaBoundries.right == 0 || nodeDimRight > areaBoundries.right) && (areaBoundries.right = nodeDimRight),
                (areaBoundries.bottom == 0 || nodeDimBottom > areaBoundries.bottom) && (areaBoundries.bottom = nodeDimBottom));
        focusPos = this.getFocusPositionEx(nodeIdArray[0].toString(), areaBoundries);
        focusPos.x != 0 && focusPos.y != 0 && this.focusOnPointAnimEx($trees.treeMap.zoomLevel, focusPos.x, focusPos.y)
    },
    getNodeFromPid: function(pid) {
        var nodes = $("[class*=node]");
        return jQuery.each(nodes, function(index, node) {
            if (node.getAttribute("t:pid") == pid)
                return node
        }),
        null 
    },
    getNodesFromPid: function(pid) {
        var nodes = $("[class*=node]")
          , nodeArr = []
          , i = 0;
        return (jQuery.each(nodes, function(index, node) {
            node.getAttribute("t:pid") == pid && (nodeArr[i] = node,
            i++)
        }),
        nodeArr.length > 0) ? nodeArr : null 
    },
    setViewportDimensions: function() {
        var region = YAHOO.util.Dom.getRegion(this.viewportEl);
        this.viewportX = region.left; // 0
        this.viewportY = region.top; // 39
        this.viewportWidth = region.width; // 320
        this.viewportHeight = region.height // 596
    },
    getCanvasZoom: function() {
        return this.zoomLevel * this.scaleFactor
    },
    getCanvasLeft: function() {
        var left = this.zoomLevel * this.scaleFactor * this.left;
        return isNaN(left) && (left = 0),
        left
    },
    getCanvasTop: function() {
        var top = this.zoomLevel * this.scaleFactor * this.top;
        return isNaN(top) && (top = 0),
        top
    },
    setZoomLevel: function(zoomLevel, fireEvent) {
        zoomLevel != 0 && (this.zoomLevel = zoomLevel,
        $canvasEl = $(this.canvasEl),
        $canvasEl.css({
            "-webkit-transform": "scale(" + zoomLevel + ")",
            "-ms-transform": "scale(" + zoomLevel + ")",
            transform: "scale(" + zoomLevel + ")"
        }),
        this.moveInProgress === !0 && this.clearPositionMoveAnim(),
        fireEvent == !0 && this.zoomEvent.fire({
            zoomLevel: zoomLevel
        }))
    },
    setPosition: function(left, top, fireEvent) {
        isNaN(left) && (left = 0);
        isNaN(top) && (top = 0);
        this.left = left;
        this.top = top;
        var posLeft = this.getCanvasLeft().toFixed(5) + "px"
          , posTop = this.getCanvasTop().toFixed(5) + "px";
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
    setScroll: function(top) {
        top && window.scrollTo(0, top)
    },
    updatePan: function() {
        this.panEvent.fire({
            left: this.left,
            top: this.top
        })
    },
    setPositionAnim: function(left, top) {
        var movSpeed, newleft, newtop;
        if (this.dragInProgress === !0) {
            this.clearPositionMoveAnim();
            return
        }
        var incrementX = this.left > left ? this.left - left : left - this.left
          , incrementY = this.top > top ? this.top - top : top - this.top
          , ratioYtoX = incrementY / incrementX
          , incrementPct = Number(".08")
          , maxXIncrement = Number(".99")
          , minXIncrement = Number(".15")
          , minYIncrement = Number(".12");
        if (incrementX = incrementX * incrementPct,
        incrementY = incrementY * incrementPct,
        movSpeed = Number("6"),
        incrementY < minXIncrement && (incrementY = minYIncrement,
        incrementX = incrementY / ratioYtoX,
        movSpeed = Number("3")),
        incrementX > maxXIncrement && (incrementX = maxXIncrement,
        incrementY = incrementX * ratioYtoX),
        newleft = left,
        newtop = top,
        this.left > left && this.left - left > incrementX ? newleft = this.left - incrementX : this.left < left && left - this.left > incrementX && (newleft = this.left + incrementX),
        this.top > top && this.top - top > incrementY ? newtop = this.top - incrementY : this.top < top && top - this.top > incrementY && (newtop = this.top + incrementY),
        newleft != left || newtop != top) {
            this.moveInProgress = !0;
            this.setPosition(newleft, newtop, !1);
            try {
                this.movAnimTimer = setTimeout(function() {
                    $trees.treeMap.setPositionAnim(left, top)
                }, movSpeed, "JAVASCRIPT")
            } catch (e) {
                this.clearPositionMoveAnim()
            }
        } else
            this.setPosition(newleft, newtop, !1),
            this.clearPositionMoveAnim()
    },
    clearPositionMoveAnim: function() {
        this.moveInProgress === !0 && (this.moveInProgress = !1,
        this.movAnimTimer != -1 && (clearTimeout(this.movAnimTimer),
        this.movAnimTimer = -1));
        this.panEvent.fire({
            left: this.left,
            top: this.top
        })
    },
    zoomOnPoint: function(zoomLevel, x, y, fireEvent) {
        if (zoomLevel != 0) {
            var myLeft = (x + this.left) * this.zoomLevel / zoomLevel - x
              , myTop = (y + this.top) * this.zoomLevel / zoomLevel - y;
            (myLeft != this.left || myTop != this.top || zoomLevel != this.zoomLevel) && (this.setZoomLevel(zoomLevel, fireEvent),
            this.setPosition(myLeft, myTop, fireEvent))
        }
    },
    setZoom: function(zoomLevel, viewportX, viewportY) {
        var canvasPosition = this.translateToCanvasCoordinates(viewportX, viewportY), canvasMax = this.translateToCanvasCoordinates(this.viewportWidth, this.viewportHeight), positionx = Math.max(canvasPosition.x, 0), positiony;
        positionx = Math.min(canvasPosition.x, canvasMax.x);
        positiony = Math.max(canvasPosition.y, 0);
        positiony = Math.min(canvasPosition.y, canvasMax.y);
        zoomLevel >= this.minZoom && zoomLevel <= this.maxZoom + this.liftZoom && this.zoomOnPoint(zoomLevel, positionx, positiony, !0)
    },
    changeZoom: function(increase, viewportX, viewportY) {
        var zoom;
        increase ? (zoom = this.zoomLevel + this.zoomIncrement,
        zoom > this.maxZoom && (zoom = this.maxZoom)) : (zoom = this.zoomLevel - this.zoomIncrement,
        zoom < this.minZoom && (zoom = this.minZoom));
        this.setZoom(zoom, viewportX, viewportY)
    },
    zoomOnCenter: function(zoomLevel) {
        this.setZoom(zoomLevel, this.viewportWidth / 2, this.viewportHeight / 2)
    },
    zoomIn: function() {
        this.changeZoom(!0, this.viewportWidth / 2, this.viewportHeight / 2)
    },
    zoomOut: function() {
        this.changeZoom(!1, this.viewportWidth / 2, this.viewportHeight / 2)
    },
    focusOnPoint: function(zoomLevel, focusx, focusy) {
        var viewportWidth = this.viewportWidth / this.scaleFactor / zoomLevel
          , viewportHeight = this.viewportHeight / this.scaleFactor / zoomLevel;
        this.setZoomLevel(zoomLevel, !0);
        this.setPosition(viewportWidth / 2 - focusx, viewportHeight / 2 - focusy, !0)
    },
    focusOnPointAnim: function(zoomLevel, focusx, focusy) {
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
    focusOnPointAnimEx: function(zoomLevel, focusx, focusy) {
        if (this.dragInProgress === !0 || this.moveInProgress === !0) {
            this.clearPositionMoveAnim();
            return
        }
        this.setPositionAnim(focusx, focusy)
    },
    translateToViewportCoordinates: function(x, y) {
        var retValues = {};
        return retValues.X = this.scaleFactor * this.zoomLevel * (x + this.left),
        retValues.Y = this.scaleFactor * this.zoomLevel * (y + this.top),
        retValues
    },
    translateToCanvasCoordinates: function(X, Y) {
        var retValues = {};
        return retValues.x = X / this.scaleFactor / this.zoomLevel - this.left,
        retValues.y = Y / this.scaleFactor / this.zoomLevel - this.top,
        retValues
    },
    startDragCanvas: function(e) {
        // e = m.Event {type: "pointertouchmousedown", pageX: 264, pageY: 170, originalEvent: m.Event, timeStamp: 1461644008030��}
        // // this: $trees.TreeMapObject, this.viewportEl: div#trVp.trVp.closehand or openhand
        var viewportId = this.viewportEl.id; // "trVp"
        
        var viewportId = this.viewportEl.id; 
        if (e.target != null ) {
            // ö�� #trVwHd #thumbnav #trHover .expandTree .viewTreeExtender .familyList ֮ length != 0
            if ($(e.target).closest("#" + this.controlsDivId + ", #thumbNav, #trHover, .expandTree, .viewTreeExtender, .familyList").length != 0)
                return;
            this.startDragPosition = this.getViewportMousePosition(e);
            this.startDragTopLeft = {
                top: this.top,
                left: this.left
            };
            $(document).on("pointertouchmousemove", function(e) {
                $trees.treeMap.dragCanvas(e);
                $trees.treeMap.checkDragCanvas(e)
            }).on("pointertouchmouseup", function(e) {
                $trees.treeMap.endDragCanvas(e)
            });
            // <div id = trVp class = trVp openhand->closehand 
            // viewportEl: div#trVp.trVp.closehand
            $(this.viewportEl).removeClass("openhand").addClass("closehand");
            $("body").addClass("draggingTreeView");
            this.dragInProgress = !0
        }
    },
    endDragCanvas: function(e) {
        if (this.dragInProgress)
            return this.dragInProgress = !1,
            $(document).off("pointertouchmousemove").off("pointertouchmouseup"),
            this.startDragPosition = null ,
            this.dragFilter = null ,
            this.dragEndEvent.fire({}),
            $(this.viewportEl).removeClass("closehand").addClass("openhand"),
            $("body").removeClass("draggingTreeView"),
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            !1
    },
    dragCanvas: function(e) {
        if (this.dragInProgress) {
            var viewportPosition = this.getViewportMousePosition(e)
              , left = (viewportPosition.x - this.startDragPosition.x) / this.scaleFactor / this.zoomLevel + this.startDragTopLeft.left
              , top = (viewportPosition.y - this.startDragPosition.y) / this.scaleFactor / this.zoomLevel + this.startDragTopLeft.top;
            return this.setPosition(left, top, !0),
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            !1
        }
    },
    checkDragCanvas: function(e) {
        if (this.dragInProgress) {
            // Yahoo.util.Event.getTarget() 
            var target = YAHOO.util.Event.getTarget(e);
            if (target != null  && target.id == "Content-2" || endDragCanvas === !0)
                return this.endDragCanvas(e)
        }
    },
    getMousePosition: function(e) {
        var position = YAHOO.util.Event.getXY(e);
        return {
            x: position[0],
            y: position[1]
        }
    },
    getViewportMousePosition: function(e) {
        var absPos = this.getMousePosition(e)
          , X = absPos.x - this.viewportX
          , Y = absPos.y - this.viewportY;
        return {
            x: X,
            y: Y
        }
    },
    scrollWindow: function() {
        this.setWindowScroll();
        this.scrollEvent.fire()
    },
    expandCollapse: function() {
        for (var element, i = 0; i < arguments.length; i++)
            element = document.getElementById(arguments[i]),
            element != null  && (element.style.display = element.style.display == "none" ? "" : "none")
    },
    hasParent: function(el, divIdName, stopDivIdName) {
        el = el.parentElement || el.parentNode;
        for (var i = 0; i < 100; i++) {
            if (el == null )
                return !1;
            if (el.id == divIdName)
                return !0;
            if (stopDivIdName != null  && el.id == stopDivIdName)
                return !1;
            el = el.parentElement || el.parentNode
        }
        return !1
    },
    print: function() {
        var printable = window.open(this.printUrlTemplate, "")
    },
    changeFocusPerson: function(fpid) {
        document.location.href = this.changeFocusUrlTemplate.replace("{cfpid}", fpid.toString())
    },
    viewProfilePage: function(fpid) {
        document.location.href = this.viewProfileUrlTemplate.replace("{pid}", fpid.toString())
    },
    getFocusNodeCenter: function(focusNodeEl) {
        var dim = this.getNodeDimensions(focusNodeEl);
        return {
            x: dim.left + dim.width / 2,
            y: dim.top + dim.height / 2,
            w: dim.width,
            h: dim.height
        }
    },
    getNodeDimensions: function(nodeEl) {
        var nodeLeft = parseFloat(nodeEl.style.left), nodeTop, nodeWidth, nodeHeight;
        return isNaN(nodeLeft) && (nodeLeft = 0),
        nodeTop = parseFloat(nodeEl.style.top),
        isNaN(nodeTop) && (nodeTop = 0),
        nodeWidth = parseFloat(nodeEl.style.width),
        isNaN(nodeWidth) && (nodeWidth = this.viewerType == "family" ? this.familyNodeDimensions.width : 0),
        nodeHeight = parseFloat(nodeEl.style.height),
        isNaN(nodeHeight) && (nodeHeight = this.viewerType == "family" ? this.familyNodeDimensions.height : 0),
        {
            left: nodeLeft,
            top: nodeTop,
            width: nodeWidth,
            height: nodeHeight
        }
    },
    getExpansionDimensions: function(expansionDiv) {
        var expTop = parseFloat(expansionDiv.getAttribute("t:top")), expLeft, expRight, expBottom;
        return isNaN(expTop) && (expTop = 0),
        expLeft = parseFloat(expansionDiv.getAttribute("t:left")),
        isNaN(expLeft) && (expLeft = 0),
        expRight = parseFloat(expansionDiv.getAttribute("t:right")),
        isNaN(expRight) && (expRight = this.viewportWidth),
        expBottom = parseFloat(expansionDiv.getAttribute("t:bottom")),
        isNaN(expBottom) && (expBottom = this.viewportHeight),
        {
            left: expLeft,
            top: expTop,
            right: expRight,
            bottom: expBottom,
            width: expRight - expLeft,
            height: expBottom - expTop
        }
    },
    setWindowScroll: function() {
        var tmpScrollTop = 0;
        typeof pageYOffset == "number" ? tmpScrollTop = window.pageYOffset : document.body && (document.body.scrollLeft || document.body.scrollTop) ? tmpScrollTop = document.body.scrollTop : document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop) && (tmpScrollTop = document.documentElement.scrollTop);
        this.windowScrollTop = tmpScrollTop
    },
    disableSelection: function(target) {
        typeof target.onselectstart != "undefined" ? target.onselectstart = function() {
            return !1
        }
         : typeof target.style.MozUserSelect != "undefined" ? target.style.MozUserSelect = "none" : target.onmousedown = function() {
            return !1
        }
    },
    showInviteeWelcome: function(url) {
        YAHOO.util.Connect.asyncRequest("GET", url, this.showInviteeWelcomeCallback)
    },
    showInviteeWelcomeCallback: {
        success: function(o) {
            var res = eval("(" + o.responseText + ")")
              , returnedHTML = res.html;
            $treesmodal.TreesGlobalModalCreate();
            $treesmodal.tgModal.openModal(returnedHTML, "400px")
        },
        failure: function() {},
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
    
    $(".node .hoverCallout").filter(function() {
        return $(this).attr("t:name") != "UNKNOWN"
    }).callout({
        type: "hover",
        align: "center",
        position: calloutAlignment,
        content: "Loading...",
        hideDelay: "500",
        onOpen: function(trigger) {
            var currentNode = trigger.parents(".node")
              , nodePid = currentNode.attr("t:pid")
              , callout = $(this)
              , nodeRollOverData = {
                ViewProfileStr: $("#ViewProfileStr").val(),
                ViewProfileHref: "/tree/" + v_treeId + "/person/" + nodePid,
                ViewTreeStr: $("#ViewTreeStr").val(),
                ViewTreeHref: "?cfpid=" + nodePid + "&snid=" + nodePid + ".0&pidval=" + nodePid,
                SearchToolTipStr: $("#SearchToolTipStr").val(),
                SearchHref: "/pt/RecordSearch.aspx?tid=" + v_treeId + "&pid=" + nodePid + "&ssrc=pt&mrgIgn=1&pg=32799",
                QuickEditStr: $("#QuickEditStr").val(),
                AddRelativeStr: $("#AddRelativeStr").val(),
                AddRelativeHref: "javascript:$TreesFunc.Family.showAddFamilyMemberModal('" + v_treeId + "', '" + nodePid + "', '&mrgign=1&pg=32799')"
            }
              , dataContent = $("<div/>").html($("#nodeOptionsTemplate").tmpl(nodeRollOverData));
              
            currentNode.attr("id") == $trees.treeMap.focusNodeEl.id && dataContent.find(".nodeOptions .iconTreeFamily").hide();
            
            $("#isOwnerEditor").length > 0 && $("#isOwnerEditor").val().toLowerCase() == "false" && (dataContent.find(".nodeOptions .iconEdit").remove(),
            
            dataContent.find(".nodeOptions .iconPersonAdd").remove());
            
            $("#userCanViewLiving").length > 0 && $("#userCanViewLiving").val().toLowerCase() == "false" && currentNode.attr("t:isliving").toLowerCase() == "true" && dataContent.find(".nodeOptions .iconSearch").remove();
            
            $.callout.content(callout, dataContent.html());
            
            $(".nodeOptions .icon").on("click", function() {
                $("#callout").css("z-index", "1004")
            });
            
            $trees.treeMap.viewerType == "pedigree" && $(".hoverCallout").css("right", "0")
        }
    })
};

$trees.displayHintCount = function(source) {
    var hintsCount = $(source).attr("t:hints");
    if (source && hintsCount && hintsCount > 0) {
        if (hintsCount > 99) {
            $(source).find(".node-bdy div.itemCount").html("99+").show();
            return
        }
        $(source).find(".node-bdy div.itemCount").html(hintsCount).show()
    }
};

$trees.hideHintCount = function(source) {
    $(source).find(".node-bdy div.itemCount").hide()
};

$trees.bindHover = function() {
    $("#trGraph .node").each(function() {
        $(this).hover(function() {
            $trees.displayHintCount(this)
        }, function() {
            $trees.hideHintCount(this)
        })
    })
};

$trees.bind = function() {
    $trees.bindHover();
    $(".hoverCallout").length > 0 && $trees.displayNodeOptions()
};

$trees.bindHoverOnExtend = function() {
    $(".node .node-bdy").off("mouseenter mouseleave");
    $trees.bind()
};

$trees.deselect = function() {
    document.selection ? document.selection.empty() : window.getSelection && window.getSelection().removeAllRanges()
};

$(function() {
    var resizeTimer;
    
    $("html").on("click", "body:not(.treeViewerAwesomeNavigating) #trVwHd, body:not(.treeViewerAwesomeNavigating) #thumbNav", function(e) {
        e.stopPropagation()
    }).on("pointertouchmousedown", "body:not(.treeViewerAwesomeNavigating) .treeViewerAwesome", function() {
        window.treesScreenType("smart-phone") && ($("body").addClass("treeViewerAwesomeNavigating"),
        checkPageActions())
    });
    
    $(".exitFullScreen").prependTo($(".pageCrumbs")).on("pointertouchmousedown", function(e) {
        e.stopPropagation();
        e.preventDefault()
    }).on("pointertouchmouseup", function(e) {
        e.stopPropagation();
        e.preventDefault();
        $("body").removeClass("treeViewerAwesomeNavigating");
        checkPageActions()
    }).on("click", function(e) {
        e.stopPropagation();
        e.preventDefault()
    });
    
    $(window).on("resize", function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            $(".nodeHidden").removeClass("nodeHidden");
            $("body").hasClass("treeViewerAwesomeHoverCardActive") && !window.treesScreenType("smart-phone") && $trees.hovercard.hideHover();
            window.treesScreenType("smart-phone") === !1 && $("body").hasClass("treeViewerAwesomeNavigating") === !0 && $(".exitFullScreen").trigger("pointertouchmouseup");
            $trees.treeMap.setViewportDimensions()
        }, 250)
    })
})
