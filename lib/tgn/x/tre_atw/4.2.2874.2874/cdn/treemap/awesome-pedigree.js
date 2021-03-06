function toggleFamilyListArrowIcons(clickedElement) {
    $(clickedElement).hasClass('iconArrowSmallRightAfter') ? ($(clickedElement).removeClass('iconArrowSmallRightAfter'), $(clickedElement).addClass('iconArrowSmallDownAfter')) : ($(clickedElement).removeClass('iconArrowSmallDownAfter'), $(clickedElement).addClass('iconArrowSmallRightAfter'))
}

$trees.PedigreeObject = function (baseExpandUrl, baseCollapseUrl, baseSiblingsUrl, expandErrorText, loadingSiblingsText, siblingsErrorText, rootPid, rootNodeId, clearHints) {
    this.init(baseExpandUrl, baseCollapseUrl, baseSiblingsUrl, expandErrorText, loadingSiblingsText, siblingsErrorText, rootPid, rootNodeId, clearHints)
};

$trees.PedigreeObject.prototype = {
    baseExpandUrl: '',
    baseCollapseUrl: '',
    currentLevel: '',
    inExpansion: !1,
    expansionNodeIds: null,
    expansionPids: null,
    loadingSiblingsText: '',
    siblingsHtml: '',
    siblingsErrorText: '',
    expandErrorText: '',
    loadingNodeId: '',
    clearHints: !1,
// baseExpandUrl:  'http://trees.ancestry.com/tree/81749066/family/pedigreeExpand', 
// baseCollapseUrl: 'http://trees.ancestry.com/tree/81749066/family/pedigreeCollapse', 
// baseSiblingsUrl: 'http://trees.ancestry.com/tree/81749066/person/42446045903/pedigree/siblingslisthtml', 
// expandErrorText: 'There was an error expanding the pedigree.  Please try again.', 
// loadingSiblingsText: 'Loading Siblings...', 
// siblingsErrorText: 'An error occured while trying to load the siblings. Please try again.', 
// rootPid: '42446045903', 
// rootNodeId: '0:0', 
// clearHints: 'False'
    init: function (baseExpandUrl, baseCollapseUrl, baseSiblingsUrl, expandErrorText, loadingSiblingsText, siblingsErrorText, rootPid, rootNodeId, clearHints) {
        this.baseExpandUrl = baseExpandUrl; // 'http://trees.ancestry.com/tree/81749066/family/pedigreeExpand'
        this.baseCollapseUrl = baseCollapseUrl; // 'http://trees.ancestry.com/tree/81749066/family/pedigreeCollapse'
        this.baseSiblingsUrl = baseSiblingsUrl; // 'http://trees.ancestry.com/tree/81749066/person/42446045903/pedigree/siblingslisthtml'
        this.loadingSiblingsText = loadingSiblingsText; // 'Loading Siblings...'
        this.siblingsErrorText = siblingsErrorText;     // 'An error occured while trying to load the siblings. Please try again.'
        this.expandErrorText = expandErrorText; // 'There was an error expanding the pedigree.  Please try again.'
        this.expansionPids = new Array(rootPid);
        this.expansionNodeIds = new Array(rootNodeId);
        this.clearHints = clearHints === 'True';
        this.discoverExistingExpansions()
    },

    expandSiblings: function () {
        var siblingsItem = YAHOO.util.Dom.get('tvSiblingOpen');
        this.siblingsHtml = siblingsItem.innerHTML;
        siblingsItem.innerHTML = '<span class="text">' + this.loadingSiblingsText + '</span>';
        YAHOO.util.Connect.asyncRequest('POST', this.baseSiblingsUrl, this.siblingsCallback)
    },

    siblingsCallback: {
        success: function (o) {
            var response;
            try {
                if (response = YAHOO.lang.JSON.parse(o.responseText), typeof response.SiblingList == 'undefined') throw new Error('Unexpected response in Siblings List');
            } catch (x) {
                this.restoreSiblingsHtml();
                $trees.log.error('Siblings JSON', 'Error parsing JSON or unrecognized response', {
                    exception: x,
                    response: o
                });
                alert($trees.pedigree.siblingsErrorText);
                return
            }
            YAHOO.util.Dom.get('Siblings').innerHTML = response.SiblingList
        },
        
        failure: function (o) {
            this.restoreSiblingsHtml();
            $trees.log.error('Siblings AJAX', 'Failure callback for siblings request', o);
            alert($trees.pedigree.siblingsErrorText)
        },

        restoreSiblingsHtml: function () {
            YAHOO.util.Dom.get('tvSiblingOpen').innerHTML = $trees.pedigree.siblingsHtml
        },
        timeout: 10000
    },

    expandBranch: function (level, pid, nodeId, xOffset, yOffset) {
        var iLevel,
        requestUrl;

        if (!this.inExpansion) {
            iLevel = parseInt(level, 10);
            this.inExpansion = !0;
            var slicePid = this.expansionPids.slice(iLevel),
            currExpansionPid = slicePid.length > 0 ? slicePid[0] : null,
            sliceNodeId = this.expansionNodeIds.slice(iLevel),
            currExpansionNodeId = sliceNodeId.length > 0 ? sliceNodeId[0] : null;
            currExpansionPid != null && currExpansionPid.length > 0 && currExpansionNodeId != null && currExpansionNodeId.length > 0 && (this.removeExpansion(iLevel), this.hideExpansionIcon(currExpansionNodeId), this.expansionPids.splice(iLevel, this.expansionPids.length - iLevel), this.expansionNodeIds.splice(iLevel, this.expansionNodeIds.length - iLevel));
            nodeId != null && nodeId.length > 0 && currExpansionNodeId != nodeId && (this.expansionNodeIds.push(nodeId), this.expansionPids.push(pid));
            this.currentLevel = level;
            requestUrl = '';
            // requestUrl = "http://trees.ancestry.com/tree/81749066/family/pedigreeExpand?exlevel=1&expid=46580516772&exnodeid=0:15&xOffset=10.968&yOffset=-3.3345"
            nodeId != null && nodeId.length > 0 && currExpansionNodeId != nodeId ? (requestUrl = this.baseExpandUrl + '?exlevel=' + level, requestUrl += '&expid=' + pid, requestUrl += '&exnodeid=' + nodeId, requestUrl += '&xOffset=' + xOffset, requestUrl += '&yOffset=' + yOffset, this.clearHints && (requestUrl += '&ch=1'), YAHOO.util.Connect.asyncRequest('GET', requestUrl, this.expansionCallback), this.showSpinnerIcon(nodeId), this.loadingNodeId = nodeId, $trees.treeMap.extendedGraphOffset = yOffset * $trees.treeMap.scaleFactor * $trees.treeMap.zoomLevel, $.event.trigger('treemappan', [
                {
                    top: parseFloat($trees.treeMap.canvasEl.style.top) + $trees.treeMap.extendedGraphOffset
                }
            ])) : (requestUrl = this.baseCollapseUrl + '?exlevel=' + level, YAHOO.util.Connect.asyncRequest('POST', requestUrl, this.collapseCallback), $trees.treeMap.extendedGraphOffset = 0)
        }
    },

    showExpansionIcon: function (nodeId) {
        var node = document.getElementById(nodeId);
        node != null && (node.className = node.className.replace('notExpanded', 'expanded'), node.className = node.className.replace('expanding', 'expanded'))
    },

    hideExpansionIcon: function (nodeId) {
        var node = document.getElementById(nodeId);
        node != null && (node.className = node.className.replace('expanded', 'notExpanded'))
    },

    showSpinnerIcon: function (nodeId) {
        var node = document.getElementById(nodeId);
        node != null && (node.className = node.className.replace('notExpanded', 'expanding'))
    },

    hideSpinnerIcon: function (nodeId) {
        var node = document.getElementById(nodeId);
        node != null && (node.className = node.className.replace('expanding', 'notExpanded'))
    },

    removeExpansion: function (level) {
        if (level > 0) for (var i = level, expansionToRemove = document.getElementById('graph' + i++) ; expansionToRemove != null && i < 100;) expansionToRemove.parentNode.removeChild(expansionToRemove),
        expansionToRemove = document.getElementById('graph' + i++)
    },

    collapseCallback: {
        success: function () {
            $trees.pedigree.repositionGraph();
            $trees.pedigree.inExpansion = !1
        },
        failure: function () {
            $trees.pedigree.repositionGraph();
            $trees.pedigree.inExpansion = !1
        },
        timeout: 40000
    },

    expansionCallback: {
        success: function (o) {
            var startLabel = '<div id="graph' + $trees.pedigree.currentLevel + '">',
            endLabel = '<label id="end' + $trees.pedigree.currentLevel + '">',
            start = o.responseText.indexOf(startLabel),
            contentDiv;
            if (start != -1) {
                var end = o.responseText.indexOf(endLabel),
                nodes = o.responseText.substring(start + startLabel.length, end),
                trGraph = document.getElementById('trGraph');
                trGraph != null && (contentDiv = document.createElement('div'), contentDiv.setAttribute('id', 'graph' + $trees.pedigree.currentLevel), contentDiv.innerHTML = nodes, trGraph.appendChild(contentDiv));
                $trees.pedigree.showExpansionIcon($trees.pedigree.loadingNodeId)
            }
            $trees.pedigree.repositionGraph();
            $trees.pedigree.inExpansion = !1;
            $trees.hints && ($trees.hints.addGraphIdList($trees.pedigree.currentLevel), $trees.hints.initiateHintRequest());
            $trees.bindHoverOnExtend()
        },

        failure: function (o) {
            $trees.log.error('Pedigree Expansion', 'Branch expansion failure', o);
            alert($trees.pedigree.expandErrorText);
            $trees.pedigree.inExpansion = !1
        },
        timeout: 30000
    },

    repositionGraph: function () {
        var nodeIdArray,
        nodeIdToMove;
        $trees.pedigree.expansionNodeIds.length > 0 && (nodeIdArray = $trees.pedigree.expansionNodeIds.slice(-1), nodeIdArray.length > 0 && (nodeIdToMove = nodeIdArray[0], nodeIdToMove != null && nodeIdToMove.length > 0 && $trees.toolbar.showFocusAnim(nodeIdToMove, $trees.pedigree.expansionNodeIds.length - 1)))
    },

    repositionGraphNodes: function (nodeIdArray) {
        $trees.treeMap.showNodeFocusAnim(nodeIdArray)
    },

    discoverExistingExpansions: function () {
        var i,
        obj = document.getElementById('graphExpansions'),
        pidListAttr,
        expansionPidArray,
        nodeIdListAttr,
        expansionIdArray;

        if (obj != null) {
            if (pidListAttr = obj.getAttribute('T:PidList'), pidListAttr) 
                for (expansionPidArray = pidListAttr.split(','), i = 0; i < expansionPidArray.length; i++) 
                    this.expansionPids.push(expansionPidArray[i]);
            if (nodeIdListAttr = obj.getAttribute('T:NodeIdList'), nodeIdListAttr) 
                for (expansionIdArray = nodeIdListAttr.split(','), i = 0; i < expansionIdArray.length; i++) 
                    this.expansionNodeIds.push(expansionIdArray[i])
        }
    }
};

// baseExpandUrl:  'http://trees.ancestry.com/tree/81749066/family/pedigreeExpand', 
// baseCollapseUrl: 'http://trees.ancestry.com/tree/81749066/family/pedigreeCollapse', 
// baseSiblingsUrl: 'http://trees.ancestry.com/tree/81749066/person/42446045903/pedigree/siblingslisthtml', 
// expandErrorText: 'There was an error expanding the pedigree.  Please try again.', 
// loadingSiblingsText: 'Loading Siblings...', 
// siblingsErrorText: 'An error occured while trying to load the siblings. Please try again.', 
// rootPid: '42446045903', 
// rootNodeId: '0:0', 
// clearHints: 'False'
$trees.pedigreeCreate = function (baseExpandUrl, baseCollapseUrl, baseSiblingsUrl, expandErrorText, loadingSiblingsText, siblingsErrorText, rootPid, rootNodeId, clearHints) {
    'undefined' == typeof $trees.pedigree && ($trees.pedigree = new $trees.PedigreeObject(baseExpandUrl, baseCollapseUrl, baseSiblingsUrl, expandErrorText, loadingSiblingsText, siblingsErrorText, rootPid, rootNodeId, clearHints))
};

$(function () {
    $(document).on('click', '#pedigreeSpouseChildrenDropdown', function () {
        toggleFamilyListArrowIcons(this)
    })
})
