$trees.StateManagerObject = function(stateUrl) {
    this.init(stateUrl)
};

$trees.StateManagerObject.prototype = {
    stateUrl: "",
    delayBeforeRequest: 10,
    changeIsQueued: !1,
    savedState: {},

    init: function(stateUrl) {
        this.stateUrl = stateUrl;
        $trees.treeMap.zoomEvent.subscribe(this.handleZoomEvent, this, !0);
        $trees.treeMap.panEvent.subscribe(this.handlePanEvent, this, !0);
        $trees.treeMap.dragEndEvent.subscribe(this.handlePanEvent, this, !0);
        $trees.treeMap.scrollEvent.subscribe(this.handleScrollEvent, this, !0);
        $trees.toolbar.dragEndEvent.subscribe(this.handleZoomEvent, this, !0);
        var myScope = this;
        window.addEventListener("beforeunload", function() {
            myScope.sendStateToServer()
        })
    },

    handleZoomEvent: function() {
        $trees.toolbar.dragInProgress || this.handleChangedState()
    },

    handlePanEvent: function() {
        $trees.treeMap.dragInProgress || $trees.toolbar.dragInProgress || this.handleChangedState()
    },

    handleScrollEvent: function() {
        $trees.toolbar.dragInProgress || this.handleChangedState()
    },

    handleChangedState: function() {
        if (this.changeIsQueued === !1) {
            var myScope = this;
            this.changeIsQueued = !0;
            setTimeout(function() {
                myScope.sendStateToServer();
                myScope.changeIsQueued = !1
            }, this.delayBeforeRequest * 1e3)
        }
    },
    
    sendStateToServer: function() {
        var stateChanged = !1, zoomLevel = ($trees.treeMap.zoomLevel * 100).toFixed(5), vwidth, vheight, left, top, scrollTop, myUrl;
        this.savedState.zoomLevel !== zoomLevel && (stateChanged = !0,
        this.savedState.zoomLevel = zoomLevel);
        vwidth = $trees.treeMap.viewportWidth;
        this.savedState.vwidth !== vwidth && (stateChanged = !0,
        this.savedState.vwidth = vwidth);
        vheight = $trees.treeMap.viewportHeight;
        this.savedState.vheight !== vheight && (stateChanged = !0,
        this.savedState.vheight = vheight);
        left = $trees.treeMap.getCanvasLeft().toFixed(5);
        this.savedState.left !== left && (stateChanged = !0,
        this.savedState.left = left);
        top = $trees.treeMap.getCanvasTop().toFixed(5);
        this.savedState.top !== top && (stateChanged = !0,
        this.savedState.top = top);
        scrollTop = $trees.treeMap.windowScrollTop;
        this.savedState.scrollTop !== scrollTop && (stateChanged = !0,
        this.savedState.scrollTop = scrollTop);
        stateChanged && (myUrl = this.stateUrl + "&zoom=" + encodeURIComponent(zoomLevel) + "&top=" + encodeURIComponent(top) + "&left=" + encodeURIComponent(left) + "&vw=" + encodeURIComponent(vwidth) + "&vh=" + encodeURIComponent(vheight) + "&st=" + encodeURIComponent(scrollTop),
        $.post(myUrl)) // For example: "http://trees.ancestry.com/tree/81749066/family/updatetmzp?view=pedigree&zoom=60.00000&top=48.00000&left=121.00000&vw=375&vh=715&st=0"
    }
};

$trees.stateMgrCreate = function(stateUrl) {
    "undefined" == typeof $trees.statemgr && ($trees.statemgr = new $trees.StateManagerObject(stateUrl))
}