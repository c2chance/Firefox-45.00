//  $trees.toolbarCreate('81749066', 'trVp', 42446045903, 42446045903, false, '', 'pgn=32799');
//  treeId,   81749066
//  viewportDivId,  trVp
//  focusPid,  42446045903
//  homePid,   42446045903
//  changeFocus,  false
//  selectHomUrl, ''
//  pageStackArgs  pgn=32799
$trees.ToolbarObject = function(treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomUrl, pageStackArgs) {
    this.init(treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomUrl, pageStackArgs)
};

$trees.ToolbarObject.prototype = {
    treeId: "",
    viewportDivEl: null ,
    startPosition: null ,
    currentThumbOffset: 0,
    maxThumbOffset: 48,
    focusPid: 0,
    homePid: 0,
    dragInProgress: !1,
    dragFilter: null ,
    dragEndEvent: null ,
    selectHomeUrl: "",
    pageStackArgs: "",
    init: function(treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomeUrl, pageStackArgs) {
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
        if (changeFocus && $trees.treeMap.zoomLevel == .5 ? this.setControlEnable("centerFocus", !1) : this.setFocusControl(),
        this.isControlEnabled("homePerson") && ((this.selectHomeUrl == null  || this.selectHomeUrl.length == 0) && this.homePid == this.focusPid && this.setControlEnable("homePerson", !1),
        this.isControlEnabled("homePerson")))
            $("#homePerson").on("click.tlbr", this, this.homePersonCB);
        this.setZoomControls();
        $("#cntrls").css("display", "")
    },
    resetView: function(e) {
        var toolBar = e && e.data || this
          , focusCenter = $trees.treeMap.getFocusNodeCenter($trees.treeMap.focusNodeEl);
        $trees.treeMap.zoomOnPoint(.5, focusCenter.x, focusCenter.y, !1);
        toolBar.setZoomControls();
        toolBar.centerFocusCB()
    },
    centerFocusCB: function() {
        var focusCenter = $trees.treeMap.getFocusCenter();
        $trees.treeMap.focusOnPoint($trees.treeMap.zoomLevel, focusCenter.x, focusCenter.y);
        this.setFocusControl()
    },
    centerFocusAnimateCB: function() {
        var focusNodeId = $trees.treeMap.focusNodeEl != null  ? $trees.treeMap.focusNodeEl.id : "";
        this.centerFocusAnim(focusNodeId);
        this.setFocusControl()
    },
    centerFocusAnim: function(focusnodee1) {
        var focusCenter = $trees.treeMap.getFocusCenterId(focusnodee1.toString());
        focusCenter.x != 0 && focusCenter.y != 0 && $trees.treeMap.focusOnPointAnim($trees.treeMap.zoomLevel, focusCenter.x, focusCenter.y)
    },
    showFocusAnim: function(expnodee1, expansionlevel) {
        var focusCenter = $trees.treeMap.getFocusPosition(expnodee1.toString(), expansionlevel);
        focusCenter.x != 0 && focusCenter.y != 0 && $trees.treeMap.focusOnPointAnimEx($trees.treeMap.zoomLevel, focusCenter.x, focusCenter.y)
    },
    setControlEnable: function(controlName, enable) {
        enable ? $("#" + controlName).removeClass("disabled") : $("#" + controlName).addClass("disabled")
    },
    isControlEnabled: function(controlName) {
        return !$("#" + controlName).hasClass("disabled")
    },
    homePersonCB: function(e) {
        var toolBar = e && e.data || this;
        toolBar.selectHomeUrl && toolBar.selectHomeUrl.length > 0 ? $trees.util.buildUrlWithHistory("TreeSelectMe", {
            TreeId: toolBar.treeId,
            SetHomePerson: "1"
        }, toolBar.selectHomeUrl, toolBar.pageStackArgs).done(function(url) {
            document.location.href = url
        }) : $trees.treeMap.changeFocusPerson(toolBar.homePid)
    },
    zoomInCB: function() {
        $trees.treeMap.zoomIn()
    },
    zoomOutCB: function() {
        $trees.treeMap.zoomOut()
    },
    printCB: function() {
        $trees.treeMap.print()
    },
    startDragThumb: function(e) {
        var toolBar = e && e.data || this;
        if (e.target != null  && e.target.id == "slider") {
            $trees.treeMap.moveInprogress == !0 && $trees.treeMap.clearPositionMoveAnim();
            toolBar.dragInProgress = !0;
            toolBar.startPosition = $trees.treeMap.getMousePosition(e);
            toolBar.startPosition.offset = parseInt($(e.target).css("top"));
            toolBar.dragFilter = new $trees.EventFilter(toolBar,"dragThumb","checkDragThumb");
            $(document).on("pointertouchmousemove.tlbr", toolBar.dragFilter, toolBar.dragFilter.handleEvent).on("pointertouchmouseup.tlbr", toolBar, toolBar.endDragThumb);
            return $(".treeViewerAwesome").addClass("cntrlsZooming"),
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            !1
        }
    },
    endDragThumb: function(e) {
        var toolBar = e && e.data || this;
        if (toolBar.dragInProgress)
            return $(document).off("pointertouchmousemove.tlbr pointertouchmouseup.tlbr"),
            toolBar.startPosition = null ,
            toolBar.dragFilter = null ,
            toolBar.dragEndEvent.fire({}),
            toolBar.setZoomControls(),
            toolBar.setFocusControl(),
            $(".treeViewerAwesome").removeClass("cntrlsZooming"),
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            toolBar.dragInProgress = !1,
            !1
    },
    dragThumb: function(e) {
        var currentPosition, offsetY, sliderEl, zoomLevel;
        if (this.dragInProgress)
            return currentPosition = $trees.treeMap.getMousePosition(e),
            offsetY = currentPosition.y - this.startPosition.y + this.startPosition.offset,
            offsetY > this.maxThumbOffset && (offsetY = this.maxThumbOffset),
            offsetY < 0 && (offsetY = 0),
            sliderEl = $("#slider").css("top", offsetY),
            zoomLevel = Math.round((this.maxThumbOffset - offsetY) / this.maxThumbOffset * $trees.treeMap.maxZoom / $trees.treeMap.zoomIncrement) * $trees.treeMap.zoomIncrement,
            zoomLevel > $trees.treeMap.maxZoom && (zoomLevel = $trees.treeMap.maxZoom),
            zoomLevel < $trees.treeMap.minZoom && (zoomLevel = $trees.treeMap.minZoom),
            $trees.treeMap.zoomOnCenter(zoomLevel),
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            !1
    },
    checkDragThumb: function(e) {
        if (this.dragInProgress && e.target != null  && e.target.id == "Content-2")
            return this.endDragThumb(e)
    },
    setFocusControl: function(e) {
        var toolBar = e && e.data || this
          , currentZoom = $trees.treeMap.zoomLevel
          , currentCenter = $trees.treeMap.translateToCanvasCoordinates($trees.treeMap.viewportWidth / 2, $trees.treeMap.viewportHeight / 2)
          , focusCenter = $trees.treeMap.getFocusCenter();
        Math.abs(currentZoom - .5) < .01 && currentCenter != null  && Math.abs(focusCenter.x - currentCenter.x) < .1 && Math.abs(focusCenter.y - currentCenter.y) < .1 ? toolBar.setControlEnable("centerFocus", !1) : toolBar.setControlEnable("centerFocus", !0)
    },
    setZoomControls: function(e) {
        var toolBar = e && e.data || this
          , zoomLevel = $trees.treeMap.zoomLevel;
        toolBar.dragInProgress || toolBar.setSliderToMatchZoomLevel(zoomLevel);
        zoomLevel >= $trees.treeMap.maxZoom ? toolBar.setControlEnable("zoomIn", !1) : toolBar.setControlEnable("zoomIn", !0);
        zoomLevel <= $trees.treeMap.minZoom ? toolBar.setControlEnable("zoomOut", !1) : toolBar.setControlEnable("zoomOut", !0)
    },
    setSliderToMatchZoomLevel: function(zoomLevel) {
        var sliderEl = $("#slider"), sliderPosition;
        sliderEl.length && (sliderPosition = zoomLevel / $trees.treeMap.maxZoom * this.maxThumbOffset,
        sliderPosition > this.maxThumbOffset && (sliderPosition = this.maxThumbOffset),
        (sliderPosition < 0 || zoomLevel == $trees.treeMap.minZoom) && (sliderPosition = 0),
        this.currentThumbOffset = Math.round(this.maxThumbOffset - sliderPosition),
        sliderEl.css("top", parseFloat(this.currentThumbOffset.toFixed(2))))
    },
    handleZoomEvent: function() {
        this.dragInProgress || (this.setZoomControls(),
        this.setFocusControl())
    },
    handlePanEvent: function() {
        $trees.treeMap.dragInProgress || this.dragInProgress || this.setFocusControl()
    }
};
$trees.toolbarCreate = function(treeId, viewportDivId, focusPid, homePid, changeFocus, selectHomUrl, pageStackArgs) {
    "undefined" == typeof $trees.toolbar && ($trees.toolbar = new $trees.ToolbarObject(treeId,viewportDivId,focusPid,homePid,changeFocus,selectHomUrl,pageStackArgs))
}
