$trees.EventFilter = function(eventObj, eventHandlerName, eventCheckName) {
    this.init(eventObj, eventHandlerName, eventCheckName)
}
;
$trees.EventFilterCount = $trees.EventFilter.prototype = {
    currentEvent: null ,
    nextEvent: null ,
    eventHandlerName: null ,
    eventCheckName: null ,
    eventObj: null ,
    suppressMs: 30,
    suspendedCount: 0,
    processedCount: 0,
    init: function(eventObj, eventHandlerName, eventCheckName) {
        this.eventObj = eventObj;
        this.eventHandlerName = eventHandlerName;
        this.eventCheckName = eventCheckName;
        var self = this;
        this.doEvent = function() {
            this.currentEvent = this.nextEvent;
            this.nextEvent = null ;
            var ret = this.eventObj[this.eventHandlerName](this.currentEvent);
            return this.processedCount++,
            setTimeout(function() {
                self.currentEvent = null 
            }, this.suppressMs),
            ret
        }
    },
    handleEvent: function(e) {
        var thisObj = e && e.data || this, ret;
        return thisObj.eventCheckName && (ret = thisObj.eventObj[thisObj.eventCheckName](e),
        ret == !1) ? !1 : (thisObj.nextEvent = e,
        thisObj.currentEvent == null  ? thisObj.doEvent() : (++thisObj.suspendedCount,
        e.preventDefault ? e.preventDefault() : e.returnValue = !1,
        !1))
    }
}
