$trees.ThumbnailNavigator = function() {
    this.init()
}
;
$trees.ThumbnailNavigator.prototype = {
    paddingX: 0,
    paddingY: 0,
    viewPortDiv: null ,
    dragInProgress: !1,
    dragFilter: null ,
    viewportPosTL: null ,
    viewportPosBR: null ,
    dragViewportPosTL: null ,
    thumbnailContainerRect: null ,
    thumbnailContainer: null ,
    canvasX: 0,
    canvasY: 0,
    pixelsPerEm: 0,
    scaleFactor: 0,
    init: function() {
        if (this.thumbnailContainer = $("#ThumbnailNavCont"),
        this.thumbnailContainer.length) {
            var thumbnailPaddingX = "0"
              , thumbnailPaddingY = "0"
              , pixels = "0"
              , scale = "0"
              , thumbnailInfo = $("#thumbnailInfo");
            thumbnailInfo.length && (thumbnailPaddingX = thumbnailInfo.attr("t:paddingx"),
            thumbnailPaddingY = thumbnailInfo.attr("t:paddingy"),
            pixels = thumbnailInfo.attr("t:pixelsperem"),
            scale = thumbnailInfo.attr("t:scalefactor"));
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
    load: function() {
        this.buildTinyObjects();
        this.drawViewportRectangle()
    },
    buildTinyObjects: function() {
        var thumbContainer = this.thumbnailContainer
          , nodes = $(".trGraph div.node")
          , nodeBin = $("<div>")
          , pad = {
            x: this.paddingX,
            y: this.paddingY
        };
        nodes.each(function() {
            var current = $(this), tinyNode;
            current.css("top") && current.css("left") && (tinyNode = $("<div>").addClass("thumbNode"),
            current.hasClass("female") ? tinyNode.addClass("female") : current.hasClass("male") ? tinyNode.addClass("male") : tinyNode.addClass("unknown"),
            current.hasClass("focus") && tinyNode.addClass("focus"),
            tinyNode.css({
                left: (parseFloat(this.style.left) + pad.x).toFixed(4) + "em",
                top: (parseFloat(this.style.top) + pad.y).toFixed(4) + "em"
            }).appendTo(nodeBin))
        });
        thumbContainer.append(nodeBin)
    },
    drawViewportRectangle: function() {
        this.viewPortDiv.length && $trees.treeMap && (this.viewportPosTL = $trees.treeMap.translateToCanvasCoordinates(0, 0),
        this.viewportPosBR = $trees.treeMap.translateToCanvasCoordinates($trees.treeMap.viewportWidth, $trees.treeMap.viewportHeight),
        this.viewPortDiv.css({
            top: (this.viewportPosTL.y + this.paddingY).toFixed(5) + "em",
            left: (this.viewportPosTL.x + this.paddingX).toFixed(5) + "em",
            width: (this.viewportPosBR.x - this.viewportPosTL.x).toFixed(5) + "em",
            height: (this.viewportPosBR.y - this.viewportPosTL.y).toFixed(5) + "em",
            display: ""
        }))
    },
    startDragViewportRect: function(e) {
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
            this.dragFilter = new $trees.EventFilter(this,"dragViewportRect","checkDragViewportRect");
            $(document).on("pointertouchmousemove.thmbnv", this.dragFilter, this.dragFilter.handleEvent).on("pointertouchmouseup.thmbnv", this, this.endDragViewportRect);
            var thumbnav = e && e.data || this;
            return thumbnav.viewPortDiv.hasClass("openhand") && thumbnav.viewPortDiv.removeClass("openhand").addClass("closehand").closest(".trVp").addClass("closedhand"),
            this.dragInProgress = !0,
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            !1
        }
    },
    endDragViewportRect: function(e) {
        var thumbnav = e && e.data || this;
        return thumbnav.dragInProgress = !1,
        $trees.treeMap.updatePan(),
        $(document).off("pointertouchmousemove.thmbnv pointertouchmouseup.thmbnv"),
        thumbnav.startDragPosition = null ,
        thumbnav.dragFilter = null ,
        thumbnav.viewPortDiv.hasClass("closehand") && thumbnav.viewPortDiv.removeClass("closehand").addClass("openhand").closest(".trVp").removeClass("closedhand"),
        thumbnav.viewportPosTL.y = thumbnav.dragViewportPosTL.top - thumbnav.paddingY,
        thumbnav.viewportPosTL.x = thumbnav.dragViewportPosTL.left - thumbnav.paddingX,
        e.preventDefault ? e.preventDefault() : e.returnValue = !1,
        !1
    },
    dragViewportRect: function(e) {
        if (this.dragInProgress) {
            var viewportPosition = this.getThumbnailMousePosition(e);
            if (this.isMouseWithinThumbnail(e))
                return this.setThumbnailViewportPosition(viewportPosition),
                this.setViewportPosition(viewportPosition),
                e.preventDefault ? e.preventDefault() : e.returnValue = !1,
                !1
        }
        return !1
    },
    checkDragViewportRect: function(e) {
        if (this.dragInProgress) {
            if (e.target != null  && e.target.id == "Content-2")
                return this.endDragViewportRect(e)
        } else
            return
    },
    repositionViewportRect: function(e) {
        var thumbnav = e && e.data || this
          , mousePos = thumbnav.getThumbnailMousePosition(e)
          , viewPortRect = thumbnav.viewPortDiv.offset()
          , leftTop = thumbnav.translateToThumbnailPosition(viewPortRect.left, viewPortRect.top)
          , rightBottom = thumbnav.translateToThumbnailPosition(viewPortRect.left + parseInt(thumbnav.viewPortDiv.css("width")), viewPortRect.top + parseInt(thumbnav.viewPortDiv.css("height")))
          , width = rightBottom.x - leftTop.x
          , height = rightBottom.y - leftTop.y
          , deltaX = leftTop.x + width / 2 - mousePos.x
          , deltaY = leftTop.y + height / 2 - mousePos.y
          , left = thumbnav.translateThumbnailToEms(deltaX) - thumbnav.translateThumbnailToEms(leftTop.x) + thumbnav.paddingX
          , top = thumbnav.translateThumbnailToEms(deltaY) - thumbnav.translateThumbnailToEms(leftTop.y) + thumbnav.paddingY;
        $trees.treeMap.setPosition(left, top, !0);
        this.drawViewportRectangle()
    },
    getThumbnailMousePosition: function(e) {
        var absPos = this.getMousePosition(e)
          , X = absPos.x - this.canvasX
          , Y = absPos.y - this.canvasY;
        return {
            x: X,
            y: Y
        }
    },
    getMousePosition: function(e) {
        return {
            x: e.pageX,
            y: e.pageY
        }
    },
    translateToThumbnailPosition: function(x, y) {
        var X = x - this.canvasX
          , Y = y - this.canvasY;
        return {
            x: X,
            y: Y
        }
    },
    translateThumbnailToEms: function(pos) {
        return pos / this.scaleFactor / this.pixelsPerEm
    },
    isMouseWithinThumbnail: function(e) {
        var mousePos = this.getMousePosition(e);
        return mousePos.x >= this.thumbnailContainerRect.left && mousePos.x <= this.thumbnailContainerRect.right && mousePos.y >= this.thumbnailContainerRect.top && mousePos.y <= this.thumbnailContainerRect.bottom ? !0 : !1
    },
    isMouseDownInViewport: function(e) {
        var thumbnav = e && e.data || this
          , mousePos = thumbnav.getThumbnailMousePosition(e)
          , viewPortRect = {
            left: thumbnav.viewPortDiv.offset().left,
            right: thumbnav.viewPortDiv.offset().left + parseInt(thumbnav.viewPortDiv.css("width")),
            top: thumbnav.viewPortDiv.offset().top,
            bottom: thumbnav.viewPortDiv.offset().top + parseInt(thumbnav.viewPortDiv.css("height"))
        }
          , leftTop = thumbnav.translateToThumbnailPosition(viewPortRect.left, viewPortRect.top)
          , rightBottom = thumbnav.translateToThumbnailPosition(viewPortRect.right, viewPortRect.bottom);
        return mousePos.x >= leftTop.x && mousePos.x <= rightBottom.x && mousePos.y >= leftTop.y && mousePos.y <= rightBottom.y ? !0 : !1
    },
    setThumbnailViewportPosition: function(viewportPosition) {
        var left = this.translateThumbnailToEms(viewportPosition.x - this.startDragPosition.x) + this.startDragTopLeft.left
          , top = this.translateThumbnailToEms(viewportPosition.y - this.startDragPosition.y) + this.startDragTopLeft.top;
        this.dragViewportPosTL = {
            top: top,
            left: left
        };
        this.viewPortDiv.css({
            left: left.toFixed(5) + "em",
            top: top.toFixed(5) + "em"
        })
    },
    setViewportPosition: function(viewportPosition) {
        var left = this.translateThumbnailToEms(this.startDragPosition.x - viewportPosition.x) - this.startDragTopLeft.left + this.paddingX
          , top = this.translateThumbnailToEms(this.startDragPosition.y - viewportPosition.y) - this.startDragTopLeft.top + this.paddingY;
        $trees.treeMap.setPosition(left, top, !1)
    },
    handlePanEvent: function() {
        this.drawViewportRectangle()
    },
    handleZoomEvent: function() {
        this.drawViewportRectangle()
    },
    handleResizeEvent: function(e) {
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
    handleMouseDown: function(e) {
        var thumbnav = e && e.data || this;
        thumbnav.isMouseDownInViewport(e) ? thumbnav.startDragViewportRect(e) : thumbnav.repositionViewportRect(e)
    }
};
$trees.thumbnailNavigatorCreate = function() {
    "undefined" == typeof $trees.thumbNav && ($trees.thumbNav = new $trees.ThumbnailNavigator)
}
