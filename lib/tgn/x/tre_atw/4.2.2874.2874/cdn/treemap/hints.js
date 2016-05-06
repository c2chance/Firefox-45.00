$trees.HintsObject = function() {
    this.init()
}
;
$trees.HintsObject.prototype = {
    pidList: null ,
    nodeIdList: null ,
    retryPidList: null ,
    retryNodeIdList: null ,
    hintRequestInProgress: !1,
    curPid: "",
    curNodeIid: "",
    reRequestDelay: 2e3,
    init: function() {
        this.pidList = [];
        this.nodeIdList = [];
        this.retryPidList = [];
        this.retryNodeIdList = [];
        this.buildIdList()
    },
    buildIdList: function() {
        for (var i = 0, hintGenObj; i < 10; ) {
            if (hintGenObj = document.getElementById("hintGen" + i),
            hintGenObj)
                this.addGraphIdList(i, hintGenObj);
            else
                break;
            i++
        }
    },
    addGraphIdList: function(graphId, hintGenObj) {
        var idListAttr, ids, j, pidNodeId;
        if (hintGenObj || (hintGenObj = document.getElementById("hintGen" + graphId)),
        hintGenObj && (idListAttr = hintGenObj.getAttribute("T:IdList"),
        idListAttr !== null  && idListAttr.length > 0))
            for (ids = idListAttr.split(","),
            j = 0; j < ids.length; j++)
                pidNodeId = ids[j].split("|"),
                this.nodeIdList.push(pidNodeId[0]),
                this.pidList.push(pidNodeId[1])
    },
    initiateHintRequest: function() {
        var pid, nodeId, node, url;
        $trees.hints.hintRequestInProgress || ($trees.hints.pidList.length > 0 ? (pid = $trees.hints.pidList.shift(),
        nodeId = $trees.hints.nodeIdList.shift(),
        pid && pid.length > 0 && nodeId && nodeId.length > 0 && (node = document.getElementById(nodeId),
        node && (url = node.getAttribute("T:HintUrl"),
        url && url.length > 0 && ($trees.hints.hintRequestInProgress = !0,
        $trees.hints.curPid = pid,
        $trees.hints.curNodeId = nodeId,
        url += "&nodeid=" + nodeId,
        $trees.hints.showSearchingIcon(nodeId, node),
        YAHOO.util.Connect.asyncRequest("GET", url, $trees.hints.hintGenerationCallback)))),
        $trees.hints.hintRequestInProgress || $trees.hints.initiateHintRequest()) : $trees.hints.retryPidList.length > 0 && ($trees.hints.pidList = $trees.hints.retryPidList,
        $trees.hints.nodeIdList = $trees.hints.retryNodeIdList,
        $trees.hints.retryPidList = [],
        $trees.hints.retryNodeIdList = [],
        setTimeout($trees.hints.initiateHintRequest, $trees.hints.reRequestDelay),
        $trees.hints.reRequestDelay = $trees.hints.reRequestDelay * 3))
    },
    showSearchingIcon: function(nodeId, node) {
        if (node || (node = document.getElementById(nodeId)),
        node) {
            var className = node.className;
            className = className.indexOf("hint") != -1 ? className.replace("hint", "nodeSearching") : className + " nodeSearching";
            node.className = className
        }
    },
    hideHintIcon: function(nodeId, node) {
        if (node || (node = document.getElementById(nodeId)),
        node) {
            var className = node.className;
            className = className.indexOf("nodeSearching") != -1 ? className.replace("nodeSearching", "") : className.replace("hint", "");
            node.className = className
        }
    },
    showHintIcon: function(nodeId, node) {
        if (node || (node = document.getElementById(nodeId)),
        node) {
            var className = node.className;
            className = className.indexOf("nodeSearching") != -1 ? className.replace("nodeSearching", "hint") : className + " hint";
            node.className = className
        }
    },
    hintGenerationCallback: {
        success: function(o) {
            $trees.hints.hintRequestInProgress = !1;
            var hints = {
                showHintIcon: !1,
                pid: 0,
                nodeId: "",
                node: null ,
                hintsInProgress: !1
            };
            o.responseXML && o.responseXML.documentElement ? this.HandleXmlResponse(o, hints) : this.HandleJsonResponse(o, hints);
            hints.showHintIcon ? $trees.hints.showHintIcon(hints.nodeId, hints.node) : $trees.hints.hideHintIcon(hints.nodeId, hints.node);
            $trees.hints.hintGenerationComplete(hints.nodeId, hints.pid, hints.showHintIcon);
            hints.hintsInProgress && ($trees.hints.retryPidList.push(hints.pid),
            $trees.hints.retryNodeIdList.push(hints.nodeId));
            $trees.hints.initiateHintRequest()
        },
        HandleXmlResponse: function(o, hints) {
            var res = o.responseXML.documentElement, obj, str, personaCount, recordCount, objectCount, pendingHints;
            res && (obj = res.getElementsByTagName("personaCount")[0],
            obj && (str = obj.firstChild.data,
            personaCount = parseInt(str, 10),
            obj = res.getElementsByTagName("pid")[0],
            obj && (hints.pid = parseInt(obj.firstChild.data, 10),
            obj = res.getElementsByTagName("nodeid")[0],
            obj && (hints.nodeId = obj.firstChild.data,
            obj = res.getElementsByTagName("recordCount")[0],
            obj && (str = obj.firstChild.data,
            recordCount = parseInt(str, 10),
            obj = res.getElementsByTagName("objectCount")[0],
            obj && (str = obj.firstChild.data,
            objectCount = parseInt(str, 10),
            obj = res.getElementsByTagName("HintsInProgress")[0],
            obj && (hints.nodeId = obj.firstChild.data,
            pendingHints = personaCount + recordCount + objectCount,
            pendingHints > 0 && (hints.showHintIcon = !0),
            hints.node = document.getElementById(hints.nodeId),
            hints.node && hints.node.setAttribute("T:Hints", pendingHints))))))))
        },
        HandleJsonResponse: function(o, hints) {
            var res = eval("(" + o.responseText + ")"), personaCount, facebookCount;
            if (res) {
                personaCount = res.PersonHintCount;
                facebookCount = res.FacebookHintCount;
                hints.nodeId = res.NodeId;
                hints.pid = res.PersonId;
                var recordCount = res.RecordHintCount
                  , objectCount = res.ObjectHintCount
                  , pendingHints = res.PendingHintCount;
                hints.hintsInProgress = res.HintsInProgress && personaCount === 0 && facebookCount === 0 && objectCount === 0 && recordCount === 0;
                pendingHints > 0 && (hints.showHintIcon = !0);
                hints.node = document.getElementById(hints.nodeId);
                hints.node && hints.node.setAttribute("T:Hints", pendingHints)
            }
        },
        failure: function() {
            var showIcon, hintVal, hintCount;
            if ($trees.hints.hintRequestInProgress = !1,
            pid = $trees.hints.curPid,
            nodeId = $trees.hints.curNodeId,
            node = document.getElementById(nodeId),
            node) {
                if (showIcon = !1,
                hintVal = node.getAttribute("T:Hints"),
                hintVal && hintVal.length > 0)
                    try {
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
    hintGenerationComplete: function(nodeId, pid, showHintIcon) {
        if (!$trees.hints.hasViewedBing && showHintIcon && typeof $trees.initFirstHintBing == "function") {
            $trees.hints.hasViewedBing = !0;
            var nodeIdArray = [nodeId, pid];
            $trees.treeMap.panEvent.subscribe($trees.hints.showHintBing, nodeIdArray);
            $trees.treeMap.showNodeFocusAnim(nodeIdArray)
        }
    },
    showHintBing: function(type, args, nodeIdArray) {
        $trees.treeMap.panEvent.unsubscribe($trees.showHintBing, nodeIdArray);
        var url = "/SetUserFlags.ashx?uid=" + v_uid + "&tid=" + v_treeId + "&flag=" + $trees.hints.bingUserFlag
          , doNothing = function() {}
        ;
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
$trees.hintsCreate = function(hasViewedBing, bingUserFlag, firstHintNodeId, firstHintPersonId) {
    if ("undefined" == typeof $trees.hints && ($trees.hints = new $trees.HintsObject),
    $trees.hints.hasViewedBing = hasViewedBing,
    $trees.hints.bingUserFlag = bingUserFlag,
    !hasViewedBing && firstHintNodeId.length > 0) {
        $trees.hints.hasViewedBing = !0;
        var nodeIdArray = [firstHintNodeId, firstHintPersonId];
        $trees.hints.showHintBing("", "", nodeIdArray)
    }
}
