YAHOO.widget.DS_JSArray = YAHOO.util.LocalDataSource;
YAHOO.widget.DS_JSFunction = YAHOO.util.FunctionDataSource;
YAHOO.widget.DS_XHR = function(B, A, D) {
    var C = new YAHOO.util.XHRDataSource(B,D);
    return C._aDeprecatedSchema = A,
    C
}
;
YAHOO.widget.DS_ScriptNode = function(B, A, D) {
    var C = new YAHOO.util.ScriptNodeDataSource(B,D);
    return C._aDeprecatedSchema = A,
    C
}
;
YAHOO.widget.DS_XHR.TYPE_JSON = YAHOO.util.DataSourceBase.TYPE_JSON;
YAHOO.widget.DS_XHR.TYPE_XML = YAHOO.util.DataSourceBase.TYPE_XML;
YAHOO.widget.DS_XHR.TYPE_FLAT = YAHOO.util.DataSourceBase.TYPE_TEXT;
YAHOO.widget.AutoComplete = function(G, B, J, C) {
    var D, K, E, A, I, H, F;
    if (G && B && J) {
        if (J instanceof YAHOO.util.DataSourceBase)
            this.dataSource = J;
        else
            return;
        if (this.key = 0,
        D = J.responseSchema,
        J._aDeprecatedSchema && (K = J._aDeprecatedSchema,
        YAHOO.lang.isArray(K) && (J.responseType === YAHOO.util.DataSourceBase.TYPE_JSON || J.responseType === YAHOO.util.DataSourceBase.TYPE_UNKNOWN ? (D.resultsList = K[0],
        this.key = K[1],
        D.fields = K.length < 3 ? null  : K.slice(1)) : J.responseType === YAHOO.util.DataSourceBase.TYPE_XML ? (D.resultNode = K[0],
        this.key = K[1],
        D.fields = K.slice(1)) : J.responseType === YAHOO.util.DataSourceBase.TYPE_TEXT && (D.recordDelim = K[0],
        D.fieldDelim = K[1]),
        J.responseSchema = D)),
        YAHOO.util.Dom.inDocument(G))
            YAHOO.lang.isString(G) ? (this._sName = "instance" + YAHOO.widget.AutoComplete._nIndex + " " + G,
            this._elTextbox = document.getElementById(G)) : (this._sName = G.id ? "instance" + YAHOO.widget.AutoComplete._nIndex + " " + G.id : "instance" + YAHOO.widget.AutoComplete._nIndex,
            this._elTextbox = G),
            YAHOO.util.Dom.addClass(this._elTextbox, "yui-ac-input");
        else
            return;
        if (YAHOO.util.Dom.inDocument(B))
            this._elContainer = YAHOO.lang.isString(B) ? document.getElementById(B) : B,
            this._elContainer.style.display == "none",
            E = this._elContainer.parentNode,
            A = E.tagName.toLowerCase(),
            A == "div" && YAHOO.util.Dom.addClass(E, "yui-ac");
        else
            return;
        if (this.dataSource.dataType === YAHOO.util.DataSourceBase.TYPE_LOCAL && (this.applyLocalFilter = !0),
        C && C.constructor == Object)
            for (I in C)
                I && (this[I] = C[I]);
        this._initContainerEl();
        this._initProps();
        this._initListEl();
        this._initContainerHelperEls();
        H = this;
        F = this._elTextbox;
        YAHOO.util.Event.addListener(F, "keyup", H._onTextboxKeyUp, H);
        YAHOO.util.Event.addListener(F, "keydown", H._onTextboxKeyDown, H);
        YAHOO.util.Event.addListener(F, "focus", H._onTextboxFocus, H);
        YAHOO.util.Event.addListener(F, "blur", H._onTextboxBlur, H);
        YAHOO.util.Event.addListener(B, "mouseover", H._onContainerMouseover, H);
        YAHOO.util.Event.addListener(B, "mouseout", H._onContainerMouseout, H);
        YAHOO.util.Event.addListener(B, "click", H._onContainerClick, H);
        YAHOO.util.Event.addListener(B, "scroll", H._onContainerScroll, H);
        YAHOO.util.Event.addListener(B, "resize", H._onContainerResize, H);
        YAHOO.util.Event.addListener(F, "keypress", H._onTextboxKeyPress, H);
        YAHOO.util.Event.addListener(window, "unload", H._onWindowUnload, H);
        this.textboxFocusEvent = new YAHOO.util.CustomEvent("textboxFocus",this);
        this.textboxKeyEvent = new YAHOO.util.CustomEvent("textboxKey",this);
        this.dataRequestEvent = new YAHOO.util.CustomEvent("dataRequest",this);
        this.dataReturnEvent = new YAHOO.util.CustomEvent("dataReturn",this);
        this.dataErrorEvent = new YAHOO.util.CustomEvent("dataError",this);
        this.containerPopulateEvent = new YAHOO.util.CustomEvent("containerPopulate",this);
        this.containerExpandEvent = new YAHOO.util.CustomEvent("containerExpand",this);
        this.typeAheadEvent = new YAHOO.util.CustomEvent("typeAhead",this);
        this.itemMouseOverEvent = new YAHOO.util.CustomEvent("itemMouseOver",this);
        this.itemMouseOutEvent = new YAHOO.util.CustomEvent("itemMouseOut",this);
        this.itemArrowToEvent = new YAHOO.util.CustomEvent("itemArrowTo",this);
        this.itemArrowFromEvent = new YAHOO.util.CustomEvent("itemArrowFrom",this);
        this.itemSelectEvent = new YAHOO.util.CustomEvent("itemSelect",this);
        this.unmatchedItemSelectEvent = new YAHOO.util.CustomEvent("unmatchedItemSelect",this);
        this.selectionEnforceEvent = new YAHOO.util.CustomEvent("selectionEnforce",this);
        this.containerCollapseEvent = new YAHOO.util.CustomEvent("containerCollapse",this);
        this.textboxBlurEvent = new YAHOO.util.CustomEvent("textboxBlur",this);
        this.textboxChangeEvent = new YAHOO.util.CustomEvent("textboxChange",this);
        F.setAttribute("autocomplete", "off");
        YAHOO.widget.AutoComplete._nIndex++
    }
}
;
YAHOO.widget.AutoComplete.prototype.dataSource = null ;
YAHOO.widget.AutoComplete.prototype.applyLocalFilter = null ;
YAHOO.widget.AutoComplete.prototype.queryMatchCase = !1;
YAHOO.widget.AutoComplete.prototype.queryMatchContains = !1;
YAHOO.widget.AutoComplete.prototype.queryMatchSubset = !1;
YAHOO.widget.AutoComplete.prototype.minQueryLength = 1;
YAHOO.widget.AutoComplete.prototype.maxResultsDisplayed = 10;
YAHOO.widget.AutoComplete.prototype.queryDelay = .2;
YAHOO.widget.AutoComplete.prototype.typeAheadDelay = .5;
YAHOO.widget.AutoComplete.prototype.queryInterval = 500;
YAHOO.widget.AutoComplete.prototype.highlightClassName = "yui-ac-highlight";
YAHOO.widget.AutoComplete.prototype.prehighlightClassName = null ;
YAHOO.widget.AutoComplete.prototype.delimChar = null ;
YAHOO.widget.AutoComplete.prototype.autoHighlight = !0;
YAHOO.widget.AutoComplete.prototype.typeAhead = !1;
YAHOO.widget.AutoComplete.prototype.animHoriz = !1;
YAHOO.widget.AutoComplete.prototype.animVert = !0;
YAHOO.widget.AutoComplete.prototype.animSpeed = .3;
YAHOO.widget.AutoComplete.prototype.forceSelection = !1;
YAHOO.widget.AutoComplete.prototype.allowBrowserAutocomplete = !0;
YAHOO.widget.AutoComplete.prototype.alwaysShowContainer = !1;
YAHOO.widget.AutoComplete.prototype.useIFrame = !1;
YAHOO.widget.AutoComplete.prototype.useShadow = !1;
YAHOO.widget.AutoComplete.prototype.suppressInputUpdate = !1;
YAHOO.widget.AutoComplete.prototype.resultTypeList = !0;
YAHOO.widget.AutoComplete.prototype.queryQuestionMark = !0;
YAHOO.widget.AutoComplete.prototype.toString = function() {
    return "AutoComplete " + this._sName
}
;
YAHOO.widget.AutoComplete.prototype.getInputEl = function() {
    return this._elTextbox
}
;
YAHOO.widget.AutoComplete.prototype.getContainerEl = function() {
    return this._elContainer
}
;
YAHOO.widget.AutoComplete.prototype.isFocused = function() {
    return this._bFocused === null  ? !1 : this._bFocused
}
;
YAHOO.widget.AutoComplete.prototype.isContainerOpen = function() {
    return this._bContainerOpen
}
;
YAHOO.widget.AutoComplete.prototype.getListEl = function() {
    return this._elList
}
;
YAHOO.widget.AutoComplete.prototype.getListItemMatch = function(A) {
    return A._sResultMatch ? A._sResultMatch : null 
}
;
YAHOO.widget.AutoComplete.prototype.getListItemData = function(A) {
    return A._oResultData ? A._oResultData : null 
}
;
YAHOO.widget.AutoComplete.prototype.getListItemIndex = function(A) {
    return YAHOO.lang.isNumber(A._nItemIndex) ? A._nItemIndex : null 
}
;
YAHOO.widget.AutoComplete.prototype.setHeader = function(B) {
    if (this._elHeader) {
        var A = this._elHeader;
        B ? (A.innerHTML = B,
        A.style.display = "block") : (A.innerHTML = "",
        A.style.display = "none")
    }
}
;
YAHOO.widget.AutoComplete.prototype.setFooter = function(B) {
    if (this._elFooter) {
        var A = this._elFooter;
        B ? (A.innerHTML = B,
        A.style.display = "block") : (A.innerHTML = "",
        A.style.display = "none")
    }
}
;
YAHOO.widget.AutoComplete.prototype.setBody = function(A) {
    if (this._elBody) {
        var B = this._elBody;
        YAHOO.util.Event.purgeElement(B, !0);
        A ? (B.innerHTML = A,
        B.style.display = "block") : (B.innerHTML = "",
        B.style.display = "none");
        this._elList = null 
    }
}
;
YAHOO.widget.AutoComplete.prototype.generateRequest = function(B) {
    var A = this.dataSource.dataType;
    return A === YAHOO.util.DataSourceBase.TYPE_XHR ? B = this.dataSource.connMethodPost ? (this.dataSource.scriptQueryParam || "query") + "=" + B + (this.dataSource.scriptQueryAppend ? "&" + this.dataSource.scriptQueryAppend : "") : (this.queryQuestionMark ? "?" : "") + (this.dataSource.scriptQueryParam || "query") + "=" + B + (this.dataSource.scriptQueryAppend ? "&" + this.dataSource.scriptQueryAppend : "") : A === YAHOO.util.DataSourceBase.TYPE_SCRIPTNODE && (B = "&" + (this.dataSource.scriptQueryParam || "query") + "=" + B + (this.dataSource.scriptQueryAppend ? "&" + this.dataSource.scriptQueryAppend : "")),
    B
}
;
YAHOO.widget.AutoComplete.prototype.sendQuery = function(B) {
    this._bFocused = null ;
    var A = this.delimChar ? this._elTextbox.value + B : B;
    this._sendQuery(A)
}
;
YAHOO.widget.AutoComplete.prototype.collapseContainer = function() {
    this._toggleContainer(!1)
}
;
YAHOO.widget.AutoComplete.prototype.getSubsetMatches = function(E) {
    for (var D, C, A, B = E.length; B >= this.minQueryLength; B--)
        if (A = this.generateRequest(E.substr(0, B)),
        this.dataRequestEvent.fire(this, D, A),
        C = this.dataSource.getCachedResponse(A),
        C)
            return this.filterResults.apply(this.dataSource, [E, C, C, {
                scope: this
            }]);
    return null 
}
;
YAHOO.widget.AutoComplete.prototype.preparseRawResponse = function(C, B) {
    var D = this.responseStripAfter !== "" && B.indexOf ? B.indexOf(this.responseStripAfter) : -1;
    return D != -1 && (B = B.substring(0, D)),
    B
}
;
YAHOO.widget.AutoComplete.prototype.filterResults = function(J, L, P, K) {
    var C, F, E, N, G;
    if (K && K.argument && K.argument.query && (J = K.argument.query),
    J && J !== "") {
        P = YAHOO.widget.AutoComplete._cloneObject(P);
        var H = K.scope
          , O = this
          , B = P.results
          , M = []
          , I = O.queryMatchCase || H.queryMatchCase
          , A = O.queryMatchContains || H.queryMatchContains;
        for (C = B.length - 1; C >= 0; C--)
            F = B[C],
            E = null ,
            YAHOO.lang.isString(F) ? E = F : YAHOO.lang.isArray(F) ? E = F[0] : this.responseSchema.fields ? (N = this.responseSchema.fields[0].key || this.responseSchema.fields[0],
            E = F[N]) : this.key && (E = F[this.key]),
            YAHOO.lang.isString(E) && (G = I ? E.indexOf(decodeURIComponent(J)) : E.toLowerCase().indexOf(decodeURIComponent(J).toLowerCase()),
            (!A && G === 0 || A && G > -1) && M.unshift(F));
        P.results = M
    }
    return P
}
;
YAHOO.widget.AutoComplete.prototype.handleResponse = function(C, A, B) {
    this instanceof YAHOO.widget.AutoComplete && this._sName && this._populateList(C, A, B)
}
;
YAHOO.widget.AutoComplete.prototype.doBeforeLoadData = function() {
    return !0
}
;
YAHOO.widget.AutoComplete.prototype.formatResult = function(B, D, A) {
    return A ? A : ""
}
;
YAHOO.widget.AutoComplete.prototype.doBeforeExpandContainer = function() {
    return !0
}
;
YAHOO.widget.AutoComplete.prototype.destroy = function() {
    var B = this.toString(), A = this._elTextbox, D = this._elContainer, C;
    this.textboxFocusEvent.unsubscribeAll();
    this.textboxKeyEvent.unsubscribeAll();
    this.dataRequestEvent.unsubscribeAll();
    this.dataReturnEvent.unsubscribeAll();
    this.dataErrorEvent.unsubscribeAll();
    this.containerPopulateEvent.unsubscribeAll();
    this.containerExpandEvent.unsubscribeAll();
    this.typeAheadEvent.unsubscribeAll();
    this.itemMouseOverEvent.unsubscribeAll();
    this.itemMouseOutEvent.unsubscribeAll();
    this.itemArrowToEvent.unsubscribeAll();
    this.itemArrowFromEvent.unsubscribeAll();
    this.itemSelectEvent.unsubscribeAll();
    this.unmatchedItemSelectEvent.unsubscribeAll();
    this.selectionEnforceEvent.unsubscribeAll();
    this.containerCollapseEvent.unsubscribeAll();
    this.textboxBlurEvent.unsubscribeAll();
    this.textboxChangeEvent.unsubscribeAll();
    YAHOO.util.Event.purgeElement(A, !0);
    YAHOO.util.Event.purgeElement(D, !0);
    D.innerHTML = "";
    for (C in this)
        YAHOO.lang.hasOwnProperty(this, C) && (this[C] = null )
}
;
YAHOO.widget.AutoComplete.prototype.textboxFocusEvent = null ;
YAHOO.widget.AutoComplete.prototype.textboxKeyEvent = null ;
YAHOO.widget.AutoComplete.prototype.dataRequestEvent = null ;
YAHOO.widget.AutoComplete.prototype.dataReturnEvent = null ;
YAHOO.widget.AutoComplete.prototype.dataErrorEvent = null ;
YAHOO.widget.AutoComplete.prototype.containerPopulateEvent = null ;
YAHOO.widget.AutoComplete.prototype.containerExpandEvent = null ;
YAHOO.widget.AutoComplete.prototype.typeAheadEvent = null ;
YAHOO.widget.AutoComplete.prototype.itemMouseOverEvent = null ;
YAHOO.widget.AutoComplete.prototype.itemMouseOutEvent = null ;
YAHOO.widget.AutoComplete.prototype.itemArrowToEvent = null ;
YAHOO.widget.AutoComplete.prototype.itemArrowFromEvent = null ;
YAHOO.widget.AutoComplete.prototype.itemSelectEvent = null ;
YAHOO.widget.AutoComplete.prototype.unmatchedItemSelectEvent = null ;
YAHOO.widget.AutoComplete.prototype.selectionEnforceEvent = null ;
YAHOO.widget.AutoComplete.prototype.containerCollapseEvent = null ;
YAHOO.widget.AutoComplete.prototype.textboxBlurEvent = null ;
YAHOO.widget.AutoComplete.prototype.textboxChangeEvent = null ;
YAHOO.widget.AutoComplete._nIndex = 0;
YAHOO.widget.AutoComplete.prototype._sName = null ;
YAHOO.widget.AutoComplete.prototype._elTextbox = null ;
YAHOO.widget.AutoComplete.prototype._elContainer = null ;
YAHOO.widget.AutoComplete.prototype._elContent = null ;
YAHOO.widget.AutoComplete.prototype._elHeader = null ;
YAHOO.widget.AutoComplete.prototype._elBody = null ;
YAHOO.widget.AutoComplete.prototype._elFooter = null ;
YAHOO.widget.AutoComplete.prototype._elShadow = null ;
YAHOO.widget.AutoComplete.prototype._elIFrame = null ;
YAHOO.widget.AutoComplete.prototype._bFocused = null ;
YAHOO.widget.AutoComplete.prototype._oAnim = null ;
YAHOO.widget.AutoComplete.prototype._bContainerOpen = !1;
YAHOO.widget.AutoComplete.prototype._bOverContainer = !1;
YAHOO.widget.AutoComplete.prototype._elList = null ;
YAHOO.widget.AutoComplete.prototype._nDisplayedItems = 0;
YAHOO.widget.AutoComplete.prototype._sCurQuery = null ;
YAHOO.widget.AutoComplete.prototype._sPastSelections = "";
YAHOO.widget.AutoComplete.prototype._sInitInputValue = null ;
YAHOO.widget.AutoComplete.prototype._elCurListItem = null ;
YAHOO.widget.AutoComplete.prototype._bItemSelected = !1;
YAHOO.widget.AutoComplete.prototype._nKeyCode = null ;
YAHOO.widget.AutoComplete.prototype._nDelayID = -1;
YAHOO.widget.AutoComplete.prototype._nTypeAheadDelayID = -1;
YAHOO.widget.AutoComplete.prototype._iFrameSrc = "javascript:false;";
YAHOO.widget.AutoComplete.prototype._queryInterval = null ;
YAHOO.widget.AutoComplete.prototype._sLastTextboxValue = null ;
YAHOO.widget.AutoComplete.prototype._initProps = function() {
    var B = this.minQueryLength, E, F, C, A, D;
    YAHOO.lang.isNumber(B) || (this.minQueryLength = 1);
    E = this.maxResultsDisplayed;
    (!YAHOO.lang.isNumber(E) || E < 1) && (this.maxResultsDisplayed = 10);
    F = this.queryDelay;
    (!YAHOO.lang.isNumber(F) || F < 0) && (this.queryDelay = .2);
    C = this.typeAheadDelay;
    (!YAHOO.lang.isNumber(C) || C < 0) && (this.typeAheadDelay = .2);
    A = this.delimChar;
    YAHOO.lang.isString(A) && A.length > 0 ? this.delimChar = [A] : YAHOO.lang.isArray(A) || (this.delimChar = null );
    D = this.animSpeed;
    (this.animHoriz || this.animVert) && YAHOO.util.Anim && ((!YAHOO.lang.isNumber(D) || D < 0) && (this.animSpeed = .3),
    this._oAnim ? this._oAnim.duration = this.animSpeed : this._oAnim = new YAHOO.util.Anim(this._elContent,{},this.animSpeed));
    this.forceSelection && A
}
;
YAHOO.widget.AutoComplete.prototype._initContainerHelperEls = function() {
    var A, B;
    this.useShadow && !this._elShadow && (A = document.createElement("div"),
    A.className = "yui-ac-shadow",
    A.style.width = 0,
    A.style.height = 0,
    this._elShadow = this._elContainer.appendChild(A));
    this.useIFrame && !this._elIFrame && (B = document.createElement("iframe"),
    B.src = this._iFrameSrc,
    B.frameBorder = 0,
    B.scrolling = "no",
    B.style.position = "absolute",
    B.style.width = 0,
    B.style.height = 0,
    B.tabIndex = -1,
    B.style.padding = 0,
    this._elIFrame = this._elContainer.appendChild(B))
}
;
YAHOO.widget.AutoComplete.prototype._initContainerEl = function() {
    var C, B, D, A;
    YAHOO.util.Dom.addClass(this._elContainer, "yui-ac-container");
    this._elContent || (C = document.createElement("div"),
    C.className = "yui-ac-content",
    C.style.display = "none",
    this._elContent = this._elContainer.appendChild(C),
    B = document.createElement("div"),
    B.className = "yui-ac-hd",
    B.style.display = "none",
    this._elHeader = this._elContent.appendChild(B),
    D = document.createElement("div"),
    D.className = "yui-ac-bd",
    this._elBody = this._elContent.appendChild(D),
    A = document.createElement("div"),
    A.className = "yui-ac-ft",
    A.style.display = "none",
    this._elFooter = this._elContent.appendChild(A))
}
;
YAHOO.widget.AutoComplete.prototype._initListEl = function() {
    for (var C = this.maxResultsDisplayed, A = this._elList || document.createElement("ul"), B, D; A.childNodes.length < C; )
        B = document.createElement("li"),
        B.style.display = "none",
        B._nItemIndex = A.childNodes.length,
        A.appendChild(B);
    this._elList || (D = this._elBody,
    YAHOO.util.Event.purgeElement(D, !0),
    D.innerHTML = "",
    this._elList = D.appendChild(A))
}
;
YAHOO.widget.AutoComplete.prototype._focus = function() {
    var A = this;
    setTimeout(function() {
        try {
            A._elTextbox.focus()
        } catch (B) {}
    }, 0)
}
;
YAHOO.widget.AutoComplete.prototype._enableIntervalDetection = function() {
    var A = this;
    !A._queryInterval && A.queryInterval && (A._queryInterval = setInterval(function() {
        A._onInterval()
    }, A.queryInterval))
}
;
YAHOO.widget.AutoComplete.prototype._onInterval = function() {
    var A = this._elTextbox.value
      , B = this._sLastTextboxValue;
    A != B && (this._sLastTextboxValue = A,
    this._sendQuery(A))
}
;
YAHOO.widget.AutoComplete.prototype._clearInterval = function() {
    this._queryInterval && (clearInterval(this._queryInterval),
    this._queryInterval = null )
}
;
YAHOO.widget.AutoComplete.prototype._isIgnoreKey = function(A) {
    return A == 9 || A == 13 || A == 16 || A == 17 || A >= 18 && A <= 20 || A == 27 || A >= 33 && A <= 35 || A >= 36 && A <= 40 || A >= 44 && A <= 45 || A == 229 ? !0 : !1
}
;
YAHOO.widget.AutoComplete.prototype._sendQuery = function(D) {
    var A, C, B;
    if (this.minQueryLength < 0) {
        this._toggleContainer(!1);
        return
    }
    if (this.delimChar && (A = this._extractQuery(D),
    D = A.query,
    this._sPastSelections = A.previous),
    D && D.length < this.minQueryLength || !D && this.minQueryLength > 0) {
        this._nDelayID != -1 && clearTimeout(this._nDelayID);
        this._toggleContainer(!1);
        return
    }
    if (D = encodeURIComponent(D),
    this._nDelayID = -1,
    (this.dataSource.queryMatchSubset || this.queryMatchSubset) && (C = this.getSubsetMatches(D),
    C)) {
        this.handleResponse(D, C, {
            query: D
        });
        return
    }
    this.responseStripAfter && (this.dataSource.doBeforeParseData = this.preparseRawResponse);
    this.applyLocalFilter && (this.dataSource.doBeforeCallback = this.filterResults);
    B = this.generateRequest(D);
    this.dataRequestEvent.fire(this, D, B);
    this.dataSource.sendRequest(B, {
        success: this.handleResponse,
        failure: this.handleResponse,
        scope: this,
        argument: {
            query: D
        }
    })
}
;
YAHOO.widget.AutoComplete.prototype._populateList = function(K, F, C) {
    var H, M, I, Q, P, E, B, L, N, S, G, O, D;
    if (this._nTypeAheadDelayID != -1 && clearTimeout(this._nTypeAheadDelayID),
    K = C && C.query ? C.query : K,
    H = this.doBeforeLoadData(K, F, C),
    H && !F.error) {
        if (this.dataReturnEvent.fire(this, K, F.results),
        this._bFocused || this._bFocused === null ) {
            M = decodeURIComponent(K);
            this._sCurQuery = M;
            this._bItemSelected = !1;
            var R = F.results
              , A = Math.min(R.length, this.maxResultsDisplayed)
              , J = this.dataSource.responseSchema.fields ? this.dataSource.responseSchema.fields[0].key || this.dataSource.responseSchema.fields[0] : 0;
            if (A > 0) {
                for ((!this._elList || this._elList.childNodes.length < A) && this._initListEl(),
                this._initContainerHelperEls(),
                I = this._elList.childNodes,
                Q = A - 1; Q >= 0; Q--) {
                    if (P = I[Q],
                    E = R[Q],
                    this.resultTypeList) {
                        if (B = [],
                        B[0] = YAHOO.lang.isString(E) ? E : E[J] || E[this.key],
                        L = this.dataSource.responseSchema.fields,
                        YAHOO.lang.isArray(L) && L.length > 1)
                            for (N = 1,
                            S = L.length; N < S; N++)
                                B[B.length] = E[L[N].key || L[N]];
                        else
                            YAHOO.lang.isArray(E) ? B = E : YAHOO.lang.isString(E) ? B = [E] : B[1] = E;
                        E = B
                    }
                    P._sResultMatch = YAHOO.lang.isString(E) ? E : YAHOO.lang.isArray(E) ? E[0] : E[J] || "";
                    P._oResultData = E;
                    P.innerHTML = this.formatResult(E, M, P._sResultMatch);
                    P.style.display = ""
                }
                if (A < I.length)
                    for (O = I.length - 1; O >= A; O--)
                        G = I[O],
                        G.style.display = "none";
                this._nDisplayedItems = A;
                this.containerPopulateEvent.fire(this, K, R);
                this.autoHighlight ? (D = this._elList.firstChild,
                this._toggleHighlight(D, "to"),
                this.itemArrowToEvent.fire(this, D),
                this._typeAhead(D, K)) : this._toggleHighlight(this._elCurListItem, "from");
                H = this.doBeforeExpandContainer(this._elTextbox, this._elContainer, K, R);
                this._toggleContainer(H)
            } else
                this._toggleContainer(!1);
            return
        }
    } else
        this.dataErrorEvent.fire(this, K)
}
;
YAHOO.widget.AutoComplete.prototype._clearSelection = function() {
    var A = this.delimChar ? this._extractQuery(this._elTextbox.value) : {
        previous: "",
        query: this._elTextbox.value
    };
    this._elTextbox.value = A.previous;
    this.selectionEnforceEvent.fire(this, A.query)
}
;
YAHOO.widget.AutoComplete.prototype._textMatchesOption = function() {
    for (var C, D, A = null , B = 0; B < this._nDisplayedItems; B++)
        if (C = this._elList.childNodes[B],
        D = ("" + C._sResultMatch).toLowerCase(),
        D == this._sCurQuery.toLowerCase()) {
            A = C;
            break
        }
    return A
}
;
YAHOO.widget.AutoComplete.prototype._typeAhead = function(B, D) {
    if (this.typeAhead && this._nKeyCode != 8) {
        var A = this
          , C = this._elTextbox;
        (C.setSelectionRange || C.createTextRange) && (this._nTypeAheadDelayID = setTimeout(function() {
            var F = C.value.length, G, E;
            A._updateValue(B);
            G = C.value.length;
            A._selectText(C, F, G);
            E = C.value.substr(F, G);
            A.typeAheadEvent.fire(A, D, E)
        }, this.typeAheadDelay * 1e3))
    }
}
;
YAHOO.widget.AutoComplete.prototype._selectText = function(D, A, B) {
    if (D.setSelectionRange)
        D.setSelectionRange(A, B);
    else if (D.createTextRange) {
        var C = D.createTextRange();
        C.moveStart("character", A);
        C.moveEnd("character", B - D.value.length);
        C.select()
    } else
        D.select()
}
;
YAHOO.widget.AutoComplete.prototype._extractQuery = function(H) {
    for (var C = this.delimChar, F = -1, G, E, B = C.length - 1, D, A; B >= 0; B--)
        G = H.lastIndexOf(C[B]),
        G > F && (F = G);
    if (C[B] == " ")
        for (A = C.length - 1; A >= 0; A--)
            if (H[F - 1] == C[A]) {
                F--;
                break
            }
    if (F > -1) {
        for (E = F + 1; H.charAt(E) == " "; )
            E += 1;
        D = H.substring(0, E);
        H = H.substr(E)
    } else
        D = "";
    return {
        previous: D,
        query: H
    }
}
;
YAHOO.widget.AutoComplete.prototype._toggleContainerHelpers = function(D) {
    var E = this._elContent.offsetWidth + "px", B = this._elContent.offsetHeight + "px", C, A;
    this.useIFrame && this._elIFrame && (C = this._elIFrame,
    D ? (C.style.width = E,
    C.style.height = B,
    C.style.padding = "") : (C.style.width = 0,
    C.style.height = 0,
    C.style.padding = 0));
    this.useShadow && this._elShadow && (A = this._elShadow,
    D ? (A.style.width = E,
    A.style.height = B) : (A.style.width = 0,
    A.style.height = 0))
}
;
YAHOO.widget.AutoComplete.prototype._toggleContainer = function(I) {
    var D = this._elContainer, A, G, H, J;
    if ((!this.alwaysShowContainer || !this._bContainerOpen) && (I || (this._toggleHighlight(this._elCurListItem, "from"),
    this._nDisplayedItems = 0,
    this._sCurQuery = null ,
    this._elContent.style.display != "none")))
        if (A = this._oAnim,
        A && A.getEl() && (this.animHoriz || this.animVert)) {
            A.isAnimated() && A.stop(!0);
            G = this._elContent.cloneNode(!0);
            D.appendChild(G);
            G.style.top = "-9000px";
            G.style.width = "";
            G.style.height = "";
            G.style.display = "";
            var F = G.offsetWidth
              , C = G.offsetHeight
              , B = this.animHoriz ? 0 : F
              , E = this.animVert ? 0 : C;
            A.attributes = I ? {
                width: {
                    to: F
                },
                height: {
                    to: C
                }
            } : {
                width: {
                    to: B
                },
                height: {
                    to: E
                }
            };
            I && !this._bContainerOpen ? (this._elContent.style.width = B + "px",
            this._elContent.style.height = E + "px") : (this._elContent.style.width = F + "px",
            this._elContent.style.height = C + "px");
            D.removeChild(G);
            G = null ;
            H = this;
            J = function() {
                A.onComplete.unsubscribeAll();
                I ? (H._toggleContainerHelpers(!0),
                H._bContainerOpen = I,
                H.containerExpandEvent.fire(H)) : (H._elContent.style.display = "none",
                H._bContainerOpen = I,
                H.containerCollapseEvent.fire(H))
            }
            ;
            this._toggleContainerHelpers(!1);
            this._elContent.style.display = "";
            A.onComplete.subscribe(J);
            A.animate()
        } else
            I ? (this._elContent.style.display = "",
            this._toggleContainerHelpers(!0),
            this._bContainerOpen = I,
            this.containerExpandEvent.fire(this)) : (this._toggleContainerHelpers(!1),
            this._elContent.style.display = "none",
            this._bContainerOpen = I,
            this.containerCollapseEvent.fire(this))
}
;
YAHOO.widget.AutoComplete.prototype._toggleHighlight = function(A, C) {
    if (A) {
        var B = this.highlightClassName;
        this._elCurListItem && (YAHOO.util.Dom.removeClass(this._elCurListItem, B),
        this._elCurListItem = null );
        C == "to" && B && (YAHOO.util.Dom.addClass(A, B),
        this._elCurListItem = A)
    }
}
;
YAHOO.widget.AutoComplete.prototype._togglePrehighlight = function(B, C) {
    if (B != this._elCurListItem) {
        var A = this.prehighlightClassName;
        C == "mouseover" && A ? YAHOO.util.Dom.addClass(B, A) : YAHOO.util.Dom.removeClass(B, A)
    }
}
;
YAHOO.widget.AutoComplete.prototype._updateValue = function(C) {
    var A;
    if (!this.suppressInputUpdate) {
        var F = this._elTextbox
          , E = this.delimChar ? this.delimChar[0] || this.delimChar : null 
          , B = C._sResultMatch
          , D = "";
        E ? (D = this._sPastSelections,
        D += B + E,
        E != " " && (D += " ")) : D = B;
        F.value = D;
        F.type == "textarea" && (F.scrollTop = F.scrollHeight);
        A = F.value.length;
        this._selectText(F, A, A);
        this._elCurListItem = C
    }
}
;
YAHOO.widget.AutoComplete.prototype._selectItem = function(A) {
    this._bItemSelected = !0;
    this._updateValue(A);
    this._sPastSelections = this._elTextbox.value;
    this._clearInterval();
    this.itemSelectEvent.fire(this, A, A._oResultData);
    this._toggleContainer(!1)
}
;
YAHOO.widget.AutoComplete.prototype._jumpSelection = function() {
    this._elCurListItem ? this._selectItem(this._elCurListItem) : this._toggleContainer(!1)
}
;
YAHOO.widget.AutoComplete.prototype._moveSelection = function(G) {
    var H, D, E;
    if (this._bContainerOpen) {
        if (H = this._elCurListItem,
        D = -1,
        H && (D = H._nItemIndex),
        E = G == 40 ? D + 1 : D - 1,
        E < -2 || E >= this._nDisplayedItems)
            return;
        if (H && (this._toggleHighlight(H, "from"),
        this.itemArrowFromEvent.fire(this, H)),
        E == -1) {
            this._elTextbox.value = this.delimChar ? this._sPastSelections + this._sCurQuery : this._sCurQuery;
            return
        }
        if (E == -2) {
            this._toggleContainer(!1);
            return
        }
        var F = this._elList.childNodes[E]
          , B = this._elContent
          , C = YAHOO.util.Dom.getStyle(B, "overflow")
          , I = YAHOO.util.Dom.getStyle(B, "overflowY")
          , A = C == "auto" || C == "scroll" || I == "auto" || I == "scroll";
        A && E > -1 && E < this._nDisplayedItems && (G == 40 ? F.offsetTop + F.offsetHeight > B.scrollTop + B.offsetHeight ? B.scrollTop = F.offsetTop + F.offsetHeight - B.offsetHeight : F.offsetTop + F.offsetHeight < B.scrollTop && (B.scrollTop = F.offsetTop) : F.offsetTop < B.scrollTop ? this._elContent.scrollTop = F.offsetTop : F.offsetTop > B.scrollTop + B.offsetHeight && (this._elContent.scrollTop = F.offsetTop + F.offsetHeight - B.offsetHeight));
        this._toggleHighlight(F, "to");
        this.itemArrowToEvent.fire(this, F);
        this.typeAhead && this._updateValue(F)
    }
}
;
YAHOO.widget.AutoComplete.prototype._onContainerMouseover = function(A, C) {
    for (var D = YAHOO.util.Event.getTarget(A), B = D.nodeName.toLowerCase(); D && B != "table"; ) {
        switch (B) {
        case "body":
            return;
        case "li":
            C.prehighlightClassName ? C._togglePrehighlight(D, "mouseover") : C._toggleHighlight(D, "to");
            C.itemMouseOverEvent.fire(C, D);
            break;
        case "div":
            if (YAHOO.util.Dom.hasClass(D, "yui-ac-container")) {
                C._bOverContainer = !0;
                return
            }
        }
        D = D.parentNode;
        D && (B = D.nodeName.toLowerCase())
    }
}
;
YAHOO.widget.AutoComplete.prototype._onContainerMouseout = function(A, C) {
    for (var D = YAHOO.util.Event.getTarget(A), B = D.nodeName.toLowerCase(); D && B != "table"; ) {
        switch (B) {
        case "body":
            return;
        case "li":
            C.prehighlightClassName ? C._togglePrehighlight(D, "mouseout") : C._toggleHighlight(D, "from");
            C.itemMouseOutEvent.fire(C, D);
            break;
        case "ul":
            C._toggleHighlight(C._elCurListItem, "to");
            break;
        case "div":
            if (YAHOO.util.Dom.hasClass(D, "yui-ac-container")) {
                C._bOverContainer = !1;
                return
            }
        }
        D = D.parentNode;
        D && (B = D.nodeName.toLowerCase())
    }
}
;
YAHOO.widget.AutoComplete.prototype._onContainerClick = function(A, C) {
    for (var D = YAHOO.util.Event.getTarget(A), B = D.nodeName.toLowerCase(); D && B != "table"; ) {
        switch (B) {
        case "body":
            return;
        case "li":
            C._toggleHighlight(D, "to");
            C._selectItem(D);
            return
        }
        D = D.parentNode;
        D && (B = D.nodeName.toLowerCase())
    }
}
;
YAHOO.widget.AutoComplete.prototype._onContainerScroll = function(A, B) {
    B._focus()
}
;
YAHOO.widget.AutoComplete.prototype._onContainerResize = function(A, B) {
    B._toggleContainerHelpers(B._bContainerOpen)
}
;
YAHOO.widget.AutoComplete.prototype._onTextboxKeyDown = function(A, B) {
    var C = A.keyCode;
    B._nTypeAheadDelayID != -1 && clearTimeout(B._nTypeAheadDelayID);
    switch (C) {
    case 9:
        (!YAHOO.env.ua.opera && navigator.userAgent.toLowerCase().indexOf("mac") == -1 || YAHOO.env.ua.webkit > 420) && (B._elCurListItem ? (B.delimChar && B._nKeyCode != C && B._bContainerOpen && YAHOO.util.Event.stopEvent(A),
        B._selectItem(B._elCurListItem)) : B._toggleContainer(!1));
        break;
    case 13:
        (!YAHOO.env.ua.opera && navigator.userAgent.toLowerCase().indexOf("mac") == -1 || YAHOO.env.ua.webkit > 420) && (B._elCurListItem ? (B._nKeyCode != C && B._bContainerOpen && YAHOO.util.Event.stopEvent(A),
        B._selectItem(B._elCurListItem)) : B._toggleContainer(!1));
        break;
    case 27:
        B._toggleContainer(!1);
        return;
    case 39:
        B._jumpSelection();
        break;
    case 38:
        B._bContainerOpen && (YAHOO.util.Event.stopEvent(A),
        B._moveSelection(C));
        break;
    case 40:
        B._bContainerOpen && (YAHOO.util.Event.stopEvent(A),
        B._moveSelection(C));
        break;
    default:
        B._bItemSelected = !1;
        B._toggleHighlight(B._elCurListItem, "from");
        B.textboxKeyEvent.fire(B, C)
    }
    C === 18 && B._enableIntervalDetection();
    B._nKeyCode = C
}
;
YAHOO.widget.AutoComplete.prototype._onTextboxKeyPress = function(A, B) {
    var C = A.keyCode;
    if (YAHOO.env.ua.opera || navigator.userAgent.toLowerCase().indexOf("mac") != -1 && YAHOO.env.ua.webkit < 420)
        switch (C) {
        case 9:
            B._bContainerOpen && (B.delimChar && YAHOO.util.Event.stopEvent(A),
            B._elCurListItem ? B._selectItem(B._elCurListItem) : B._toggleContainer(!1));
            break;
        case 13:
            B._bContainerOpen && (YAHOO.util.Event.stopEvent(A),
            B._elCurListItem ? B._selectItem(B._elCurListItem) : B._toggleContainer(!1))
        }
    else
        C == 229 && B._enableIntervalDetection()
}
;
YAHOO.widget.AutoComplete.prototype._onTextboxKeyUp = function(A, C) {
    var B = this.value, D;
    (C._initProps(),
    D = A.keyCode,
    C._isIgnoreKey(D)) || (C._nDelayID != -1 && clearTimeout(C._nDelayID),
    C._nDelayID = setTimeout(function() {
        C._sendQuery(B)
    }, C.queryDelay * 1e3))
}
;
YAHOO.widget.AutoComplete.prototype._onTextboxFocus = function(A, B) {
    B._bFocused || (B._elTextbox.setAttribute("autocomplete", "off"),
    B._bFocused = !0,
    B._sInitInputValue = B._elTextbox.value,
    B.textboxFocusEvent.fire(B))
}
;
YAHOO.widget.AutoComplete.prototype._onTextboxBlur = function(A, C) {
    if (C._bOverContainer && C._nKeyCode != 9)
        C._focus();
    else {
        if (!C._bItemSelected) {
            var B = C._textMatchesOption();
            !C._bContainerOpen || C._bContainerOpen && B === null  ? C.forceSelection ? C._clearSelection() : C.unmatchedItemSelectEvent.fire(C, C._sCurQuery) : C.forceSelection && C._selectItem(B)
        }
        C._clearInterval();
        C._bFocused = !1;
        C._sInitInputValue !== C._elTextbox.value && C.textboxChangeEvent.fire(C);
        C.textboxBlurEvent.fire(C);
        C._toggleContainer(!1)
    }
}
;
YAHOO.widget.AutoComplete.prototype._onWindowUnload = function(A, B) {
    B && B._elTextbox && B.allowBrowserAutocomplete && B._elTextbox.setAttribute("autocomplete", "on")
}
;
YAHOO.widget.AutoComplete.prototype.doBeforeSendQuery = function(A) {
    return this.generateRequest(A)
}
;
YAHOO.widget.AutoComplete.prototype.getListItems = function() {
    for (var C = [], B = this._elList.childNodes, A = B.length - 1; A >= 0; A--)
        C[A] = B[A];
    return C
}
;
YAHOO.widget.AutoComplete._cloneObject = function(D) {
    var F, E, C, B, A;
    if (!YAHOO.lang.isValue(D))
        return D;
    if (F = {},
    YAHOO.lang.isFunction(D))
        F = D;
    else if (YAHOO.lang.isArray(D)) {
        for (E = [],
        C = 0,
        B = D.length; C < B; C++)
            E[C] = YAHOO.widget.AutoComplete._cloneObject(D[C]);
        F = E
    } else if (YAHOO.lang.isObject(D))
        for (A in D)
            YAHOO.lang.hasOwnProperty(D, A) && (F[A] = YAHOO.lang.isValue(D[A]) && YAHOO.lang.isObject(D[A]) || YAHOO.lang.isArray(D[A]) ? YAHOO.widget.AutoComplete._cloneObject(D[A]) : D[A]);
    else
        F = D;
    return F
}
;
YAHOO.register("autocomplete", YAHOO.widget.AutoComplete, {
    version: "2.7.0",
    build: "1799"
})
