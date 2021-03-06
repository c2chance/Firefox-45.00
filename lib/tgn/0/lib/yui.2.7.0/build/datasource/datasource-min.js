(function() {
    var lang = YAHOO.lang, util = YAHOO.util, Ev = util.Event, DS;
    util.DataSourceBase = function(oLiveData, oConfigs) {
        var sConfig, maxCacheEntries, DS;
        if (oLiveData !== null  && oLiveData !== undefined) {
            if (this.liveData = oLiveData,
            this._oQueue = {
                interval: null ,
                conn: null ,
                requests: []
            },
            this.responseSchema = {},
            oConfigs && oConfigs.constructor == Object)
                for (sConfig in oConfigs)
                    sConfig && (this[sConfig] = oConfigs[sConfig]);
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
    }
    ;
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
        issueCallback: function(callback, params, error, scope) {
            if (lang.isFunction(callback))
                callback.apply(scope, params);
            else if (lang.isObject(callback)) {
                scope = callback.scope || scope || window;
                var callbackFunc = callback.success;
                error && (callbackFunc = callback.failure);
                callbackFunc && callbackFunc.apply(scope, params.concat([callback.argument]))
            }
        },
        parseString: function(oData) {
            if (!lang.isValue(oData))
                return null ;
            var string = oData + "";
            return lang.isString(string) ? string : null 
        },
        parseNumber: function(oData) {
            if (!lang.isValue(oData) || oData === "")
                return null ;
            var number = oData * 1;
            return lang.isNumber(number) ? number : null 
        },
        convertNumber: function(oData) {
            return DS.parseNumber(oData)
        },
        parseDate: function(oData) {
            var date = null ;
            return oData instanceof Date ? oData : (date = new Date(oData),
            date instanceof Date ? date : null )
        },
        convertDate: function(oData) {
            return DS.parseDate(oData)
        }
    });
    DS.Parser = {
        string: DS.parseString,
        number: DS.parseNumber,
        date: DS.parseDate
    };
    DS.prototype = {
        _sName: null ,
        _aCache: null ,
        _oQueue: null ,
        _aIntervals: null ,
        maxCacheEntries: 0,
        liveData: null ,
        dataType: DS.TYPE_UNKNOWN,
        responseType: DS.TYPE_UNKNOWN,
        responseSchema: null ,
        toString: function() {
            return this._sName
        },
        getCachedResponse: function(oRequest, oCallback, oCaller) {
            var aCache = this._aCache, nCacheLength, oResponse, i, oCacheElem;
            if (this.maxCacheEntries > 0)
                if (aCache) {
                    if (nCacheLength = aCache.length,
                    nCacheLength > 0) {
                        for (oResponse = null ,
                        this.fireEvent("cacheRequestEvent", {
                            request: oRequest,
                            callback: oCallback,
                            caller: oCaller
                        }),
                        i = nCacheLength - 1; i >= 0; i--)
                            if (oCacheElem = aCache[i],
                            this.isCacheHit(oRequest, oCacheElem.request)) {
                                oResponse = oCacheElem.response;
                                this.fireEvent("cacheResponseEvent", {
                                    request: oRequest,
                                    response: oResponse,
                                    callback: oCallback,
                                    caller: oCaller
                                });
                                i < nCacheLength - 1 && (aCache.splice(i, 1),
                                this.addToCache(oRequest, oResponse));
                                oResponse.cached = !0;
                                break
                            }
                        return oResponse
                    }
                } else
                    this._aCache = [];
            else
                aCache && (this._aCache = null );
            return null 
        },
        isCacheHit: function(oRequest, oCachedRequest) {
            return oRequest === oCachedRequest
        },
        addToCache: function(oRequest, oResponse) {
            var aCache = this._aCache, oCacheElem;
            if (aCache) {
                while (aCache.length >= this.maxCacheEntries)
                    aCache.shift();
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
        flushCache: function() {
            this._aCache && (this._aCache = [],
            this.fireEvent("cacheFlushEvent"))
        },
        setInterval: function(nMsec, oRequest, oCallback, oCaller) {
            if (lang.isNumber(nMsec) && nMsec >= 0) {
                var oSelf = this
                  , nId = setInterval(function() {
                    oSelf.makeConnection(oRequest, oCallback, oCaller)
                }, nMsec);
                return this._aIntervals.push(nId),
                nId
            }
        },
        clearInterval: function(nId) {
            for (var tracker = this._aIntervals || [], i = tracker.length - 1; i > -1; i--)
                tracker[i] === nId && (tracker.splice(i, 1),
                clearInterval(nId))
        },
        clearAllIntervals: function() {
            for (var tracker = this._aIntervals || [], i = tracker.length - 1; i > -1; i--)
                clearInterval(tracker[i]);
            tracker = []
        },
        sendRequest: function(oRequest, oCallback, oCaller) {
            var oCachedResponse = this.getCachedResponse(oRequest, oCallback, oCaller);
            return oCachedResponse ? (DS.issueCallback(oCallback, [oRequest, oCachedResponse], !1, oCaller),
            null ) : this.makeConnection(oRequest, oCallback, oCaller)
        },
        makeConnection: function(oRequest, oCallback, oCaller) {
            var tId = DS._nTransactionId++, oRawResponse;
            return this.fireEvent("requestEvent", {
                tId: tId,
                request: oRequest,
                callback: oCallback,
                caller: oCaller
            }),
            oRawResponse = this.liveData,
            this.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId),
            tId
        },
        handleResponse: function(oRequest, oRawResponse, oCallback, oCaller, tId) {
            var ctype, arrayEnd, parseArgs, objEnd, el;
            this.fireEvent("responseEvent", {
                tId: tId,
                request: oRequest,
                response: oRawResponse,
                callback: oCallback,
                caller: oCaller
            });
            var xhr = this.dataType == DS.TYPE_XHR ? !0 : !1
              , oParsedResponse = null 
              , oFullResponse = oRawResponse;
            this.responseType === DS.TYPE_UNKNOWN && (ctype = oRawResponse && oRawResponse.getResponseHeader ? oRawResponse.getResponseHeader["Content-Type"] : null ,
            ctype ? ctype.indexOf("text/xml") > -1 ? this.responseType = DS.TYPE_XML : ctype.indexOf("application/json") > -1 ? this.responseType = DS.TYPE_JSON : ctype.indexOf("text/plain") > -1 && (this.responseType = DS.TYPE_TEXT) : YAHOO.lang.isArray(oRawResponse) ? this.responseType = DS.TYPE_JSARRAY : oRawResponse && oRawResponse.nodeType && oRawResponse.nodeType == 9 ? this.responseType = DS.TYPE_XML : oRawResponse && oRawResponse.nodeName && oRawResponse.nodeName.toLowerCase() == "table" ? this.responseType = DS.TYPE_HTMLTABLE : YAHOO.lang.isObject(oRawResponse) ? this.responseType = DS.TYPE_JSON : YAHOO.lang.isString(oRawResponse) && (this.responseType = DS.TYPE_TEXT));
            switch (this.responseType) {
            case DS.TYPE_JSARRAY:
                xhr && oRawResponse && oRawResponse.responseText && (oFullResponse = oRawResponse.responseText);
                try {
                    if (lang.isString(oFullResponse))
                        if (parseArgs = [oFullResponse].concat(this.parseJSONArgs),
                        lang.JSON)
                            oFullResponse = lang.JSON.parse.apply(lang.JSON, parseArgs);
                        else if (window.JSON && JSON.parse)
                            oFullResponse = JSON.parse.apply(JSON, parseArgs);
                        else if (oFullResponse.parseJSON)
                            oFullResponse = oFullResponse.parseJSON.apply(oFullResponse, parseArgs.slice(1));
                        else {
                            while (oFullResponse.length > 0 && oFullResponse.charAt(0) != "{" && oFullResponse.charAt(0) != "[")
                                oFullResponse = oFullResponse.substring(1, oFullResponse.length);
                            oFullResponse.length > 0 && (arrayEnd = Math.max(oFullResponse.lastIndexOf("]"), oFullResponse.lastIndexOf("}")),
                            oFullResponse = oFullResponse.substring(0, arrayEnd + 1),
                            oFullResponse = eval("(" + oFullResponse + ")"))
                        }
                } catch (e1) {}
                oFullResponse = this.doBeforeParseData(oRequest, oFullResponse, oCallback);
                oParsedResponse = this.parseArrayData(oRequest, oFullResponse);
                break;
            case DS.TYPE_JSON:
                xhr && oRawResponse && oRawResponse.responseText && (oFullResponse = oRawResponse.responseText);
                try {
                    if (lang.isString(oFullResponse))
                        if (parseArgs = [oFullResponse].concat(this.parseJSONArgs),
                        lang.JSON)
                            oFullResponse = lang.JSON.parse.apply(lang.JSON, parseArgs);
                        else if (window.JSON && JSON.parse)
                            oFullResponse = JSON.parse.apply(JSON, parseArgs);
                        else if (oFullResponse.parseJSON)
                            oFullResponse = oFullResponse.parseJSON.apply(oFullResponse, parseArgs.slice(1));
                        else {
                            while (oFullResponse.length > 0 && oFullResponse.charAt(0) != "{" && oFullResponse.charAt(0) != "[")
                                oFullResponse = oFullResponse.substring(1, oFullResponse.length);
                            oFullResponse.length > 0 && (objEnd = Math.max(oFullResponse.lastIndexOf("]"), oFullResponse.lastIndexOf("}")),
                            oFullResponse = oFullResponse.substring(0, objEnd + 1),
                            oFullResponse = eval("(" + oFullResponse + ")"))
                        }
                } catch (e) {}
                oFullResponse = this.doBeforeParseData(oRequest, oFullResponse, oCallback);
                oParsedResponse = this.parseJSONData(oRequest, oFullResponse);
                break;
            case DS.TYPE_HTMLTABLE:
                xhr && oRawResponse.responseText && (el = document.createElement("div"),
                el.innerHTML = oRawResponse.responseText,
                oFullResponse = el.getElementsByTagName("table")[0]);
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
            oParsedResponse && !oParsedResponse.error ? (oParsedResponse = this.doBeforeCallback(oRequest, oFullResponse, oParsedResponse, oCallback),
            this.fireEvent("responseParseEvent", {
                request: oRequest,
                response: oParsedResponse,
                callback: oCallback,
                caller: oCaller
            }),
            this.addToCache(oRequest, oParsedResponse)) : (oParsedResponse.error = !0,
            this.fireEvent("dataErrorEvent", {
                request: oRequest,
                response: oRawResponse,
                callback: oCallback,
                caller: oCaller,
                message: DS.ERROR_DATANULL
            }));
            oParsedResponse.tId = tId;
            DS.issueCallback(oCallback, [oRequest, oParsedResponse], oParsedResponse.error, oCaller)
        },
        doBeforeParseData: function(oRequest, oFullResponse) {
            return oFullResponse
        },
        doBeforeCallback: function(oRequest, oFullResponse, oParsedResponse) {
            return oParsedResponse
        },
        parseData: function(oRequest, oFullResponse) {
            return lang.isValue(oFullResponse) ? {
                results: oFullResponse,
                meta: {}
            } : null 
        },
        parseArrayData: function(oRequest, oFullResponse) {
            var results, i, j, rec, field, data, fields, parsers, p, arrType, oResult;
            if (lang.isArray(oFullResponse)) {
                if (results = [],
                lang.isArray(this.responseSchema.fields)) {
                    for (fields = this.responseSchema.fields,
                    i = fields.length - 1; i >= 0; --i)
                        typeof fields[i] != "object" && (fields[i] = {
                            key: fields[i]
                        });
                    for (parsers = {},
                    i = fields.length - 1; i >= 0; --i)
                        p = (typeof fields[i].parser == "function" ? fields[i].parser : DS.Parser[fields[i].parser + ""]) || fields[i].converter,
                        p && (parsers[fields[i].key] = p);
                    for (arrType = lang.isArray(oFullResponse[0]),
                    i = oFullResponse.length - 1; i > -1; i--) {
                        if (oResult = {},
                        rec = oFullResponse[i],
                        typeof rec == "object")
                            for (j = fields.length - 1; j > -1; j--)
                                field = fields[j],
                                data = arrType ? rec[j] : rec[field.key],
                                parsers[field.key] && (data = parsers[field.key].call(this, data)),
                                data === undefined && (data = null ),
                                oResult[field.key] = data;
                        else if (lang.isString(rec))
                            for (j = fields.length - 1; j > -1; j--)
                                field = fields[j],
                                data = rec,
                                parsers[field.key] && (data = parsers[field.key].call(this, data)),
                                data === undefined && (data = null ),
                                oResult[field.key] = data;
                        results[i] = oResult
                    }
                } else
                    results = oFullResponse;
                return {
                    results: results
                }
            }
            return null 
        },
        parseTextData: function(oRequest, oFullResponse) {
            var newLength, recordsarray, bError, sRecord, fielddataarray, oResult, fields, j, data, field, key, parser;
            if (lang.isString(oFullResponse) && lang.isString(this.responseSchema.recordDelim) && lang.isString(this.responseSchema.fieldDelim)) {
                var oParsedResponse = {
                    results: []
                }
                  , recDelim = this.responseSchema.recordDelim
                  , fieldDelim = this.responseSchema.fieldDelim;
                if (oFullResponse.length > 0 && (newLength = oFullResponse.length - recDelim.length,
                oFullResponse.substr(newLength) == recDelim && (oFullResponse = oFullResponse.substr(0, newLength)),
                oFullResponse.length > 0)) {
                    recordsarray = oFullResponse.split(recDelim);
                    for (var i = 0, len = recordsarray.length, recIdx = 0; i < len; ++i)
                        if (bError = !1,
                        sRecord = recordsarray[i],
                        lang.isString(sRecord) && sRecord.length > 0) {
                            if (fielddataarray = recordsarray[i].split(fieldDelim),
                            oResult = {},
                            lang.isArray(this.responseSchema.fields))
                                for (fields = this.responseSchema.fields,
                                j = fields.length - 1; j > -1; j--)
                                    try {
                                        data = fielddataarray[j];
                                        lang.isString(data) ? (data.charAt(0) == '"' && (data = data.substr(1)),
                                        data.charAt(data.length - 1) == '"' && (data = data.substr(0, data.length - 1)),
                                        field = fields[j],
                                        key = lang.isValue(field.key) ? field.key : field,
                                        !field.parser && field.converter && (field.parser = field.converter),
                                        parser = typeof field.parser == "function" ? field.parser : DS.Parser[field.parser + ""],
                                        parser && (data = parser.call(this, data)),
                                        data === undefined && (data = null ),
                                        oResult[key] = data) : bError = !0
                                    } catch (e) {
                                        bError = !0
                                    }
                            else
                                oResult = fielddataarray;
                            bError || (oParsedResponse.results[recIdx++] = oResult)
                        }
                }
                return oParsedResponse
            }
            return null 
        },
        parseXMLResult: function(result) {
            var oResult = {}, schema = this.responseSchema, m, xmlNode, item, datapieces, j, len, parser;
            try {
                for (m = schema.fields.length - 1; m >= 0; m--) {
                    var field = schema.fields[m]
                      , key = lang.isValue(field.key) ? field.key : field
                      , data = null 
                      , xmlAttr = result.attributes.getNamedItem(key);
                    if (xmlAttr)
                        data = xmlAttr.value;
                    else if (xmlNode = result.getElementsByTagName(key),
                    xmlNode && xmlNode.item(0) && (item = xmlNode.item(0),
                    data = item ? item.text ? item.text : item.textContent ? item.textContent : null  : null ,
                    !data)) {
                        for (datapieces = [],
                        j = 0,
                        len = item.childNodes.length; j < len; j++)
                            item.childNodes[j].nodeValue && (datapieces[datapieces.length] = item.childNodes[j].nodeValue);
                        datapieces.length > 0 && (data = datapieces.join(""))
                    }
                    data === null  && (data = "");
                    !field.parser && field.converter && (field.parser = field.converter);
                    parser = typeof field.parser == "function" ? field.parser : DS.Parser[field.parser + ""];
                    parser && (data = parser.call(this, data));
                    data === undefined && (data = null );
                    oResult[key] = data
                }
            } catch (e) {}
            return oResult
        },
        parseXMLData: function(oRequest, oFullResponse) {
            var bError = !1, schema = this.responseSchema, oParsedResponse = {
                meta: {}
            }, xmlList = null , metaNode = schema.metaNode, metaLocators = schema.metaFields || {}, i, k, loc, v, oResult;
            try {
                if (xmlList = schema.resultNode ? oFullResponse.getElementsByTagName(schema.resultNode) : null ,
                metaNode = metaNode ? oFullResponse.getElementsByTagName(metaNode)[0] : oFullResponse,
                metaNode)
                    for (k in metaLocators)
                        lang.hasOwnProperty(metaLocators, k) && (loc = metaLocators[k],
                        v = metaNode.getElementsByTagName(loc)[0],
                        v ? v = v.firstChild.nodeValue : (v = metaNode.attributes.getNamedItem(loc),
                        v && (v = v.value)),
                        lang.isValue(v) && (oParsedResponse.meta[k] = v))
            } catch (e) {}
            if (xmlList && lang.isArray(schema.fields))
                for (oParsedResponse.results = [],
                i = xmlList.length - 1; i >= 0; --i)
                    oResult = this.parseXMLResult(xmlList.item(i)),
                    oParsedResponse.results[i] = oResult;
            else
                bError = !0;
            return bError && (oParsedResponse.error = !0),
            oParsedResponse
        },
        parseJSONData: function(oRequest, oFullResponse) {
            var oParsedResponse = {
                results: [],
                meta: {}
            }, field, r, rec, p;
            if (lang.isObject(oFullResponse) && this.responseSchema.resultsList) {
                var schema = this.responseSchema, fields = schema.fields, resultsList = oFullResponse, results = [], metaFields = schema.metaFields || {}, fieldParsers = [], fieldPaths = [], simpleFields = [], bError = !1, i, len, j, v, key, parser, path, buildPath = function(needle) {
                    var path = null 
                      , keys = []
                      , i = 0;
                    if (needle && (needle = needle.replace(/\[(['"])(.*?)\1\]/g, function(x, $1, $2) {
                        return keys[i] = $2,
                        ".@" + i++
                    }).replace(/\[(\d+)\]/g, function(x, $1) {
                        return keys[i] = parseInt($1, 10) | 0,
                        ".@" + i++
                    }).replace(/^\./, ""),
                    !/[^\w\.\$@]/.test(needle)))
                        for (path = needle.split("."),
                        i = path.length - 1; i >= 0; --i)
                            path[i].charAt(0) === "@" && (path[i] = keys[parseInt(path[i].substr(1), 10)]);
                    return path
                }
                , walkPath = function(path, origin) {
                    for (var v = origin, i = 0, len = path.length; i < len && v; ++i)
                        v = v[path[i]];
                    return v
                }
                ;
                if (path = buildPath(schema.resultsList),
                path ? (resultsList = walkPath(path, oFullResponse),
                resultsList === undefined && (bError = !0)) : bError = !0,
                resultsList || (resultsList = []),
                lang.isArray(resultsList) || (resultsList = [resultsList]),
                bError)
                    oParsedResponse.error = !0;
                else {
                    if (schema.fields) {
                        for (i = 0,
                        len = fields.length; i < len; i++)
                            field = fields[i],
                            key = field.key || field,
                            parser = (typeof field.parser == "function" ? field.parser : DS.Parser[field.parser + ""]) || field.converter,
                            path = buildPath(key),
                            parser && (fieldParsers[fieldParsers.length] = {
                                key: key,
                                parser: parser
                            }),
                            path && (path.length > 1 ? fieldPaths[fieldPaths.length] = {
                                key: key,
                                path: path
                            } : simpleFields[simpleFields.length] = {
                                key: key,
                                path: path[0]
                            });
                        for (i = resultsList.length - 1; i >= 0; --i) {
                            if (r = resultsList[i],
                            rec = {},
                            r) {
                                for (j = simpleFields.length - 1; j >= 0; --j)
                                    rec[simpleFields[j].key] = r[simpleFields[j].path] !== undefined ? r[simpleFields[j].path] : r[j];
                                for (j = fieldPaths.length - 1; j >= 0; --j)
                                    rec[fieldPaths[j].key] = walkPath(fieldPaths[j].path, r);
                                for (j = fieldParsers.length - 1; j >= 0; --j)
                                    p = fieldParsers[j].key,
                                    rec[p] = fieldParsers[j].parser(rec[p]),
                                    rec[p] === undefined && (rec[p] = null )
                            }
                            results[i] = rec
                        }
                    } else
                        results = resultsList;
                    for (key in metaFields)
                        lang.hasOwnProperty(metaFields, key) && (path = buildPath(metaFields[key]),
                        path && (v = walkPath(path, oFullResponse),
                        oParsedResponse.meta[key] = v))
                }
                oParsedResponse.results = results
            } else
                oParsedResponse.error = !0;
            return oParsedResponse
        },
        parseHTMLTableData: function(oRequest, oFullResponse) {
            var bError = !1, elTable = oFullResponse, fields = this.responseSchema.fields, oParsedResponse = {
                results: []
            }, i, elTbody, j, elRow, oResult, k, parser;
            if (lang.isArray(fields))
                for (i = 0; i < elTable.tBodies.length; i++)
                    for (elTbody = elTable.tBodies[i],
                    j = elTbody.rows.length - 1; j > -1; j--) {
                        for (elRow = elTbody.rows[j],
                        oResult = {},
                        k = fields.length - 1; k > -1; k--) {
                            var field = fields[k]
                              , key = lang.isValue(field.key) ? field.key : field
                              , data = elRow.cells[k].innerHTML;
                            !field.parser && field.converter && (field.parser = field.converter);
                            parser = typeof field.parser == "function" ? field.parser : DS.Parser[field.parser + ""];
                            parser && (data = parser.call(this, data));
                            data === undefined && (data = null );
                            oResult[key] = data
                        }
                        oParsedResponse.results[j] = oResult
                    }
            else
                bError = !0;
            return bError && (oParsedResponse.error = !0),
            oParsedResponse
        }
    };
    lang.augmentProto(DS, util.EventProvider);
    util.LocalDataSource = function(oLiveData, oConfigs) {
        this.dataType = DS.TYPE_LOCAL;
        oLiveData ? YAHOO.lang.isArray(oLiveData) ? this.responseType = DS.TYPE_JSARRAY : oLiveData.nodeType && oLiveData.nodeType == 9 ? this.responseType = DS.TYPE_XML : oLiveData.nodeName && oLiveData.nodeName.toLowerCase() == "table" ? (this.responseType = DS.TYPE_HTMLTABLE,
        oLiveData = oLiveData.cloneNode(!0)) : YAHOO.lang.isString(oLiveData) ? this.responseType = DS.TYPE_TEXT : YAHOO.lang.isObject(oLiveData) && (this.responseType = DS.TYPE_JSON) : (oLiveData = [],
        this.responseType = DS.TYPE_JSARRAY);
        util.LocalDataSource.superclass.constructor.call(this, oLiveData, oConfigs)
    }
    ;
    lang.extend(util.LocalDataSource, DS);
    lang.augmentObject(util.LocalDataSource, DS);
    util.FunctionDataSource = function(oLiveData, oConfigs) {
        this.dataType = DS.TYPE_JSFUNCTION;
        oLiveData = oLiveData || function() {}
        ;
        util.FunctionDataSource.superclass.constructor.call(this, oLiveData, oConfigs)
    }
    ;
    lang.extend(util.FunctionDataSource, DS, {
        scope: null ,
        makeConnection: function(oRequest, oCallback, oCaller) {
            var tId = DS._nTransactionId++, oRawResponse;
            return this.fireEvent("requestEvent", {
                tId: tId,
                request: oRequest,
                callback: oCallback,
                caller: oCaller
            }),
            oRawResponse = this.scope ? this.liveData.call(this.scope, oRequest, this) : this.liveData(oRequest),
            this.responseType === DS.TYPE_UNKNOWN && (YAHOO.lang.isArray(oRawResponse) ? this.responseType = DS.TYPE_JSARRAY : oRawResponse && oRawResponse.nodeType && oRawResponse.nodeType == 9 ? this.responseType = DS.TYPE_XML : oRawResponse && oRawResponse.nodeName && oRawResponse.nodeName.toLowerCase() == "table" ? this.responseType = DS.TYPE_HTMLTABLE : YAHOO.lang.isObject(oRawResponse) ? this.responseType = DS.TYPE_JSON : YAHOO.lang.isString(oRawResponse) && (this.responseType = DS.TYPE_TEXT)),
            this.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId),
            tId
        }
    });
    lang.augmentObject(util.FunctionDataSource, DS);
    util.ScriptNodeDataSource = function(oLiveData, oConfigs) {
        this.dataType = DS.TYPE_SCRIPTNODE;
        oLiveData = oLiveData || "";
        util.ScriptNodeDataSource.superclass.constructor.call(this, oLiveData, oConfigs)
    }
    ;
    lang.extend(util.ScriptNodeDataSource, DS, {
        getUtility: util.Get,
        asyncMode: "allowAll",
        scriptCallbackParam: "callback",
        generateRequestCallback: function(id) {
            return "&" + this.scriptCallbackParam + "=YAHOO.util.ScriptNodeDataSource.callbacks[" + id + "]"
        },
        doBeforeGetScriptNode: function(sUri) {
            return sUri
        },
        makeConnection: function(oRequest, oCallback, oCaller) {
            var tId = DS._nTransactionId++, id, oSelf, sUri;
            return this.fireEvent("requestEvent", {
                tId: tId,
                request: oRequest,
                callback: oCallback,
                caller: oCaller
            }),
            util.ScriptNodeDataSource._nPending === 0 && (util.ScriptNodeDataSource.callbacks = [],
            util.ScriptNodeDataSource._nId = 0),
            id = util.ScriptNodeDataSource._nId,
            util.ScriptNodeDataSource._nId++,
            oSelf = this,
            util.ScriptNodeDataSource.callbacks[id] = function(oRawResponse) {
                (oSelf.asyncMode !== "ignoreStaleResponses" || id === util.ScriptNodeDataSource.callbacks.length - 1) && (oSelf.responseType === DS.TYPE_UNKNOWN && (YAHOO.lang.isArray(oRawResponse) ? oSelf.responseType = DS.TYPE_JSARRAY : oRawResponse.nodeType && oRawResponse.nodeType == 9 ? oSelf.responseType = DS.TYPE_XML : oRawResponse.nodeName && oRawResponse.nodeName.toLowerCase() == "table" ? oSelf.responseType = DS.TYPE_HTMLTABLE : YAHOO.lang.isObject(oRawResponse) ? oSelf.responseType = DS.TYPE_JSON : YAHOO.lang.isString(oRawResponse) && (oSelf.responseType = DS.TYPE_TEXT)),
                oSelf.handleResponse(oRequest, oRawResponse, oCallback, oCaller, tId));
                delete util.ScriptNodeDataSource.callbacks[id]
            }
            ,
            util.ScriptNodeDataSource._nPending++,
            sUri = this.liveData + oRequest + this.generateRequestCallback(id),
            sUri = this.doBeforeGetScriptNode(sUri),
            this.getUtility.script(sUri, {
                autopurge: !0,
                onsuccess: util.ScriptNodeDataSource._bumpPendingDown,
                onfail: util.ScriptNodeDataSource._bumpPendingDown
            }),
            tId
        }
    });
    lang.augmentObject(util.ScriptNodeDataSource, DS);
    lang.augmentObject(util.ScriptNodeDataSource, {
        _nId: 0,
        _nPending: 0,
        callbacks: []
    });
    util.XHRDataSource = function(oLiveData, oConfigs) {
        this.dataType = DS.TYPE_XHR;
        this.connMgr = this.connMgr || util.Connect;
        oLiveData = oLiveData || "";
        util.XHRDataSource.superclass.constructor.call(this, oLiveData, oConfigs)
    }
    ;
    lang.extend(util.XHRDataSource, DS, {
        connMgr: null ,
        connXhrMode: "allowAll",
        connMethodPost: !1,
        connTimeout: 0,
        makeConnection: function(oRequest, oCallback, oCaller) {
            var tId = DS._nTransactionId++, allRequests;
            this.fireEvent("requestEvent", {
                tId: tId,
                request: oRequest,
                callback: oCallback,
                caller: oCaller
            });
            var oSelf = this
              , oConnMgr = this.connMgr
              , oQueue = this._oQueue
              , _xhrSuccess = function(oResponse) {
                if (oResponse && this.connXhrMode == "ignoreStaleResponses" && oResponse.tId != oQueue.conn.tId)
                    return null ;
                if (oResponse) {
                    if (this.responseType === DS.TYPE_UNKNOWN) {
                        var ctype = oResponse.getResponseHeader ? oResponse.getResponseHeader["Content-Type"] : null ;
                        ctype && (ctype.indexOf("text/xml") > -1 ? this.responseType = DS.TYPE_XML : ctype.indexOf("application/json") > -1 ? this.responseType = DS.TYPE_JSON : ctype.indexOf("text/plain") > -1 && (this.responseType = DS.TYPE_TEXT))
                    }
                    this.handleResponse(oRequest, oResponse, oCallback, oCaller, tId)
                } else
                    return this.fireEvent("dataErrorEvent", {
                        request: oRequest,
                        callback: oCallback,
                        caller: oCaller,
                        message: DS.ERROR_DATANULL
                    }),
                    DS.issueCallback(oCallback, [oRequest, {
                        error: !0
                    }], !0, oCaller),
                    null 
            }
              , _xhrFailure = function(oResponse) {
                return this.fireEvent("dataErrorEvent", {
                    request: oRequest,
                    callback: oCallback,
                    caller: oCaller,
                    message: DS.ERROR_DATAINVALID
                }),
                lang.isString(this.liveData) && lang.isString(oRequest) && this.liveData.lastIndexOf("?") !== this.liveData.length - 1 && oRequest.indexOf("?") !== 0,
                oResponse = oResponse || {},
                oResponse.error = !0,
                DS.issueCallback(oCallback, [oRequest, oResponse], !0, oCaller),
                null 
            }
              , _xhrCallback = {
                success: _xhrSuccess,
                failure: _xhrFailure,
                scope: this
            };
            if (lang.isNumber(this.connTimeout) && (_xhrCallback.timeout = this.connTimeout),
            this.connXhrMode == "cancelStaleRequests" && oQueue.conn && oConnMgr.abort && (oConnMgr.abort(oQueue.conn),
            oQueue.conn = null ),
            oConnMgr && oConnMgr.asyncRequest) {
                var sLiveData = this.liveData
                  , isPost = this.connMethodPost
                  , sMethod = isPost ? "POST" : "GET"
                  , sUri = isPost || !lang.isValue(oRequest) ? sLiveData : sLiveData + oRequest
                  , sRequest = isPost ? oRequest : null ;
                this.connXhrMode != "queueRequests" ? oQueue.conn = oConnMgr.asyncRequest(sMethod, sUri, _xhrCallback, sRequest) : oQueue.conn ? (allRequests = oQueue.requests,
                allRequests.push({
                    request: oRequest,
                    callback: _xhrCallback
                }),
                oQueue.interval || (oQueue.interval = setInterval(function() {
                    oConnMgr.isCallInProgress(oQueue.conn) || (allRequests.length > 0 ? (sUri = isPost || !lang.isValue(allRequests[0].request) ? sLiveData : sLiveData + allRequests[0].request,
                    sRequest = isPost ? allRequests[0].request : null ,
                    oQueue.conn = oConnMgr.asyncRequest(sMethod, sUri, allRequests[0].callback, sRequest),
                    allRequests.shift()) : (clearInterval(oQueue.interval),
                    oQueue.interval = null ))
                }, 50))) : oQueue.conn = oConnMgr.asyncRequest(sMethod, sUri, _xhrCallback, sRequest)
            } else
                DS.issueCallback(oCallback, [oRequest, {
                    error: !0
                }], !0, oCaller);
            return tId
        }
    });
    lang.augmentObject(util.XHRDataSource, DS);
    util.DataSource = function(oLiveData, oConfigs) {
        oConfigs = oConfigs || {};
        var dataType = oConfigs.dataType;
        if (dataType) {
            if (dataType == DS.TYPE_LOCAL)
                return lang.augmentObject(util.DataSource, util.LocalDataSource),
                new util.LocalDataSource(oLiveData,oConfigs);
            if (dataType == DS.TYPE_XHR)
                return lang.augmentObject(util.DataSource, util.XHRDataSource),
                new util.XHRDataSource(oLiveData,oConfigs);
            if (dataType == DS.TYPE_SCRIPTNODE)
                return lang.augmentObject(util.DataSource, util.ScriptNodeDataSource),
                new util.ScriptNodeDataSource(oLiveData,oConfigs);
            if (dataType == DS.TYPE_JSFUNCTION)
                return lang.augmentObject(util.DataSource, util.FunctionDataSource),
                new util.FunctionDataSource(oLiveData,oConfigs)
        }
        return YAHOO.lang.isString(oLiveData) ? (lang.augmentObject(util.DataSource, util.XHRDataSource),
        new util.XHRDataSource(oLiveData,oConfigs)) : YAHOO.lang.isFunction(oLiveData) ? (lang.augmentObject(util.DataSource, util.FunctionDataSource),
        new util.FunctionDataSource(oLiveData,oConfigs)) : (lang.augmentObject(util.DataSource, util.LocalDataSource),
        new util.LocalDataSource(oLiveData,oConfigs))
    }
    ;
    lang.augmentObject(util.DataSource, DS)
})();
YAHOO.util.Number = {
    format: function(C, G) {
        var B = YAHOO.lang, J, D, M, L, A, F;
        if (!B.isValue(C) || C === "")
            return "";
        if (G = G || {},
        B.isNumber(C) || (C *= 1),
        B.isNumber(C)) {
            var E = C < 0, K = C + "", H = G.decimalSeparator ? G.decimalSeparator : ".", I;
            if (B.isNumber(G.decimalPlaces) && (J = G.decimalPlaces,
            D = Math.pow(10, J),
            K = Math.round(C * D) / D + "",
            I = K.lastIndexOf("."),
            J > 0))
                for (I < 0 ? (K += H,
                I = K.length - 1) : H !== "." && (K = K.replace(".", H)); K.length - 1 - I < J; )
                    K += "0";
            if (G.thousandsSeparator) {
                for (M = G.thousandsSeparator,
                I = K.lastIndexOf(H),
                I = I > -1 ? I : K.length,
                L = K.substring(I),
                A = -1,
                F = I; F > 0; F--)
                    A++,
                    A % 3 == 0 && F !== I && (!E || F > 1) && (L = M + L),
                    L = K.charAt(F - 1) + L;
                K = L
            }
            return K = G.prefix ? G.prefix + K : K,
            G.suffix ? K + G.suffix : K
        }
        return C
    }
},
function() {
    var A = function(C, E, D) {
        for (typeof D == "undefined" && (D = 10); parseInt(C, 10) < D && D > 1; D /= 10)
            C = E.toString() + C;
        return C.toString()
    }
      , B = {
        formats: {
            a: function(D, C) {
                return C.a[D.getDay()]
            },
            A: function(D, C) {
                return C.A[D.getDay()]
            },
            b: function(D, C) {
                return C.b[D.getMonth()]
            },
            B: function(D, C) {
                return C.B[D.getMonth()]
            },
            C: function(C) {
                return A(parseInt(C.getFullYear() / 100, 10), 0)
            },
            d: ["getDate", "0"],
            e: ["getDate", " "],
            g: function(C) {
                return A(parseInt(B.formats.G(C) % 100, 10), 0)
            },
            G: function(E) {
                var F = E.getFullYear()
                  , D = parseInt(B.formats.V(E), 10)
                  , C = parseInt(B.formats.W(E), 10);
                return C > D ? F++ : C === 0 && D >= 52 && F--,
                F
            },
            H: ["getHours", "0"],
            I: function(D) {
                var C = D.getHours() % 12;
                return A(C === 0 ? 12 : C, 0)
            },
            j: function(G) {
                var F = new Date("" + G.getFullYear() + "/1/1 GMT")
                  , D = new Date("" + G.getFullYear() + "/" + (G.getMonth() + 1) + "/" + G.getDate() + " GMT")
                  , C = D - F
                  , E = parseInt(C / 864e5, 10) + 1;
                return A(E, 0, 100)
            },
            k: ["getHours", " "],
            l: function(D) {
                var C = D.getHours() % 12;
                return A(C === 0 ? 12 : C, " ")
            },
            m: function(C) {
                return A(C.getMonth() + 1, 0)
            },
            M: ["getMinutes", "0"],
            p: function(D, C) {
                return C.p[D.getHours() >= 12 ? 1 : 0]
            },
            P: function(D, C) {
                return C.P[D.getHours() >= 12 ? 1 : 0]
            },
            s: function(D) {
                return parseInt(D.getTime() / 1e3, 10)
            },
            S: ["getSeconds", "0"],
            u: function(C) {
                var D = C.getDay();
                return D === 0 ? 7 : D
            },
            U: function(F) {
                var C = parseInt(B.formats.j(F), 10)
                  , E = 6 - F.getDay()
                  , D = parseInt((C + E) / 7, 10);
                return A(D, 0)
            },
            V: function(F) {
                var E = parseInt(B.formats.W(F), 10)
                  , C = new Date("" + F.getFullYear() + "/1/1").getDay()
                  , D = E + (C > 4 || C <= 1 ? 0 : 1);
                return D === 53 && new Date("" + F.getFullYear() + "/12/31").getDay() < 4 ? D = 1 : D === 0 && (D = B.formats.V(new Date("" + (F.getFullYear() - 1) + "/12/31"))),
                A(D, 0)
            },
            w: "getDay",
            W: function(F) {
                var C = parseInt(B.formats.j(F), 10)
                  , E = 7 - B.formats.u(F)
                  , D = parseInt((C + E) / 7, 10);
                return A(D, 0, 10)
            },
            y: function(C) {
                return A(C.getFullYear() % 100, 0)
            },
            Y: "getFullYear",
            z: function(E) {
                var D = E.getTimezoneOffset()
                  , C = A(parseInt(Math.abs(D / 60), 10), 0)
                  , F = A(Math.abs(D % 60), 0);
                return (D > 0 ? "-" : "+") + C + F
            },
            Z: function(C) {
                var D = C.toString().replace(/^.*:\d\d( GMT[+-]\d+)? \(?([A-Za-z ]+)\)?\d*$/, "$2").replace(/[a-z ]/g, "");
                return D.length > 4 && (D = B.formats.z(C)),
                D
            },
            "%": function() {
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
        format: function(G, F, D) {
            var H, I;
            if (F = F || {},
            !(G instanceof Date))
                return YAHOO.lang.isValue(G) ? G : "";
            H = F.format || "%m/%d/%Y";
            H === "YYYY/MM/DD" ? H = "%Y/%m/%d" : H === "DD/MM/YYYY" ? H = "%d/%m/%Y" : H === "MM/DD/YYYY" && (H = "%m/%d/%Y");
            D = D || "en";
            D in YAHOO.util.DateLocale || (D = D.replace(/-[a-zA-Z]+$/, "") in YAHOO.util.DateLocale ? D.replace(/-[a-zA-Z]+$/, "") : "en");
            for (var J = YAHOO.util.DateLocale[D], C = function(L, K) {
                var M = B.aggregates[K];
                return M === "locale" ? J[K] : M
            }
            , E = function(L, K) {
                var M = B.formats[K];
                return typeof M == "string" ? G[M]() : typeof M == "function" ? M.call(G, G, J) : typeof M == "object" && typeof M[0] == "string" ? A(G[M[0]](), M[1]) : K
            }
            ; H.match(/%[cDFhnrRtTxX]/); )
                H = H.replace(/%([cDFhnrRtTxX])/g, C);
            return I = H.replace(/%([aAbBCdegGHIjklmMpPsSuUVwWyYzZ%])/g, E),
            C = E = undefined,
            I
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
})
