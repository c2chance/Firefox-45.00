(function() {
    PointerTouchMouseEvent = {
        DOWN: "pointertouchmousedown",
        UP: "pointertouchmouseup",
        MOVE: "pointertouchmousemove"
    };
    
    var onPointerEvent = function(e) {
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
    }
      , touchWasUsed = !1
      , mouseWasUsed = !1
      , onTouchEvent = function(e) {
        var type, touch = e.originalEvent.touches[0], pointerTouchMouseEvent;
        if (touchWasUsed = !0,
        mouseWasUsed === !0) {
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
        pointerTouchMouseEvent = type == PointerTouchMouseEvent.UP ? normalizeEvent(type, e, null , null ) : normalizeEvent(type, e, touch.pageX, touch.pageY);
        $(e.target).trigger(pointerTouchMouseEvent)
    }
      , onMouseEvent = function(e) {
        var type, pointerTouchMouseEvent;
        if (mouseWasUsed = !0,
        e.which === 2 || e.which === 3 || touchWasUsed === !0) {
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
    }
      , normalizeEvent = function(type, original, x, y) {
        return $.Event(type, {
            pageX: x,
            pageY: y,
            originalEvent: original
        })
    };
    
    if (window.PointerEvent)
        $(document).on("pointerdown", onPointerEvent).on("pointerup", onPointerEvent).on("pointermove", onPointerEvent);
    else
        $(document).on("touchstart", onTouchEvent).on("touchmove", onTouchEvent).on("touchend", onTouchEvent).on("mousedown", onMouseEvent).on("mouseup", onMouseEvent).on("mousemove", onMouseEvent)
})()
