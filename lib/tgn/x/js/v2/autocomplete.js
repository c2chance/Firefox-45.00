(function($) {
    "use strict";
    var shared = {
        debounce: function(callback, delay, immediate) {
            return this.throttle(callback, delay, undefined, !!immediate)
        },
        escapeRegExp: function(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        },
        focusable: function(element, isTabIndexNotNaN) {
            var nodeName = element.nodeName.toLowerCase();
            return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && this.visible(element)
        },
        isValidCallback: function(callback) {
            return callback && $.isFunction(callback)
        },
        lang: function() {
            var langAttr = $("html").attr("lang") || $("[lang]").first().attr("lang");
            return langAttr ? langAttr.toLowerCase() : "en"
        }(),
        localize: function(langSet, key) {
            return langSet[this.lang] && langSet[this.lang][key] ? langSet[this.lang][key] : langSet[this.lang.substring(0, 2)] && langSet[this.lang.substring(0, 2)][key] ? langSet[this.lang.substring(0, 2)][key] : langSet.en[key] || ""
        },
        getTabbableElements: function($container) {
            var self = this;
            return $container.find("input, select, textarea, button, a, object, [tabindex]").filter(function() {
                return self.tabbable(this)
            })
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex")
              , isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && this.focusable(element, !isTabIndexNaN)
        },
        throttle: function(callback, delay, noTrail, immediate) {
            var timeout, previous = 0;
            return function() {
                function reset() {
                    timeout = undefined
                }
                function execute() {
                    previous = Date.now();
                    callback.apply(self, args)
                }
                var self = this, elapsed = Date.now() - previous, args = arguments, timeoutCallback, timeoutDelay;
                immediate && !timeout && execute();
                timeout && clearTimeout(timeout);
                immediate === undefined && elapsed > delay ? execute() : noTrail !== !0 && (timeoutCallback = immediate ? reset : execute,
                timeoutDelay = immediate === undefined ? delay - elapsed : delay,
                timeout = setTimeout(timeoutCallback, timeoutDelay))
            }
        },
        visible: function(element) {
            return $.expr.filters.visible(element) && !$(element).parents().andSelf().filter(function() {
                return $.css(this, "visibility") === "hidden"
            }).length
        },
        warn: function(msg, useAlert) {
            window.console && (console.warn(msg),
            useAlert && /ancestry(?:stage|dev)/.test(window.location.hostname) && alert(msg))
        }
    }
      , autocomplete = {
        create: function($element, options) {
            var instance = $element.data("autocompleteInstance"), id = $element.attr("id"), config;
            if (instance && instance.destroy(),
            options.key) {
                $("#autocomplete").length || $("body").append('<div id="autocomplete"><\/div>');
                instance = Object.create(this.proto);
                instance.config = $.extend({}, this.staticProperties.defaults, options);
                config = instance.config;
                config.minLength = Math.max(1, config.minLength);
                instance.$element = $element;
                instance.cachedData = {};
                instance.isOpen = !1;
                instance.results = [];
                instance.screenTouches = {};
                instance.term = "";
                instance.$autocomplete = $("#autocomplete");
                instance.$container = $('<div id = "' + id + 'ResultCon" class="autocompleteCon" />');
                instance.$resultsList = $('<ul id="' + id + 'Results" class="autocompleteResults loading" role="listbox" />');
                $element.addClass("autocompleteInput").attr({
                    "aria-autocomplete": "list",
                    "aria-controls": id + "Results",
                    "aria-expanded": "false",
                    "aria-owns": id + "Results",
                    autocomplete: "off",
                    role: "combobox"
                });
                instance.$container.append(instance.$resultsList);
                instance.$autocomplete.append(instance.$container);
                instance.$container.on("click.autocomplete", function() {
                    return instance._handleResultsClick()
                }).on("keydown.autocomplete", function(e) {
                    return instance._handleResultsKeydown(e)
                }).on("keyup.autocomplete", function(e) {
                    return instance._handleResultsKeyup(e)
                });
                $element.on("input.autocomplete", function() {
                    $element.data("raw") && ($element.removeData("raw"),
                    shared.isValidCallback(config.onChange) && config.onChange.apply($element, []));
                    return
                }).on("keydown.autocomplete", function(e) {
                    return instance._handleInputKeydown(e)
                }).on("keyup.autocomplete", function(e) {
                    return instance._handleInputKeyup(e)
                }).on("focusin.autocomplete", function() {
                    return instance._handleInputFocusin()
                });
                return $element.data("autocompleteInstance", instance),
                shared.isValidCallback(config.onCreate) && config.onCreate.apply($element, []),
                instance
            }
        },
        proto: {
            _ajaxRequest: function() {
                var self = this, config = this.config, overrides, params = {}, originalAjaxObject, updatedAjaxObject, haveFullDataset = !1;
                config.queryParameter && (params[config.queryParameter] = this.term);
                originalAjaxObject = {
                    url: config.source,
                    data: params,
                    dataType: config.dataType,
                    error: function(jqXHR, textStatus, errorThrown) {
                        shared.warn("Autocomplete Source " + config.source + " cannot be reached");
                        shared.isValidCallback(config.onError) && config.onError.apply(self.$element, [jqXHR, textStatus, errorThrown]);
                        self.close()
                    },
                    success: function(data) {
                        var dirtyResults = [], cleanResults, parent;
                        shared.isValidCallback(config.jsonConversion) ? dirtyResults = config.jsonConversion.apply(self.$element, [data, config]) : config.dataType === "xml" ? (parent = $(data).find(config.key).parent(),
                        parent.each(function() {
                            var returnObj = {};
                            $(this).children().each(function() {
                                returnObj[this.nodeName] = $(this).text()
                            });
                            dirtyResults.push(returnObj)
                        })) : dirtyResults = data;
                        haveFullDataset && (self.results = dirtyResults);
                        cleanResults = self._cacheResults(dirtyResults);
                        !cleanResults.length && config.disableNoResultsMessage ? self.close() : (self._open(),
                        self._populate(cleanResults))
                    }
                };
                this.$resultsList.addClass("loading");
                overrides = shared.isValidCallback(config.ajaxOverride) ? config.ajaxOverride.apply(this.$element, [{
                    url: originalAjaxObject.url,
                    data: originalAjaxObject.data,
                    dataType: originalAjaxObject.dataType
                }]) : config.ajaxOverride;
                updatedAjaxObject = $.extend({}, originalAjaxObject, overrides);
                $.isEmptyObject(updatedAjaxObject.data) && (haveFullDataset = !0);
                $.ajax(updatedAjaxObject)
            },
            _bindMouseEvents: function() {
                var self = this;
                this.$container.on("mouseenter.autocomplete", ".autocompleteResult:not([aria-disabled]):not(.autocompleteNoResults)", function(e) {
                    return self.$focus = self._focusItem($(e.currentTarget)),
                    !0
                }).on("mouseleave.autocomplete", ".autocompleteResult:not([aria-disabled]):not(.autocompleteNoResults)", function(e) {
                    return e.relatedTarget && self._clearFocus(),
                    !0
                })
            },
            _buildResult: function(item, i, elementId) {
                var self = this
                  , config = this.config
                  , $result = ""
                  , attributes = 'tabindex="0"'
                  , classes = "autocompleteResult"
                  , id = elementId + "Autocomplete" + i
                  , itemData = {
                    term: this.term,
                    value: item[config.key],
                    display: this._getHighlightedValue(this.term, item[config.key]),
                    raw: item
                };
                if (shared.isValidCallback(config.customDisplay) && (itemData = config.customDisplay.apply(this.$element, [itemData])),
                itemData.checked === !0 && (classes += " autocompleteChecked iconAfter iconAfterCheck"),
                itemData.disabled && (attributes = 'aria-disabled="true"'),
                $result = $("<li " + attributes + ' class="' + classes + '" role="option" aria-selected="false" id="' + id + '"><div class="textWrap">' + itemData.display + "<\/div><\/li>"),
                $result.data({
                    raw: item,
                    value: itemData.value
                }),
                !itemData.disabled)
                    $result.on("click.autocomplete", function(e) {
                        return self._handleResultClick(e)
                    });
                return $result
            },
            _cacheResults: function(dirtyResults) {
                var self = this
                  , cleanResults = [];
                return this.config.queryParameter ? cleanResults = dirtyResults : dirtyResults.forEach(function(item) {
                    self._compare(item) && cleanResults.push(item)
                }),
                this.cachedData[this.term.toLowerCase()] = cleanResults,
                cleanResults
            },
            _clearFocus: function() {
                this.$focus && (this.$focus.removeAttr("aria-selected").removeClass("autocompleteSelected"),
                this.$focus = !1)
            },
            close: function() {
                var config = this.config
                  , id = this.$element.attr("id");
                this.isOpen && (shared.isValidCallback(config.onClose) && config.onClose.apply(this.$element, [this.$container, this.$before, this.$after]),
                this.$before && (this.$before.remove(),
                this.$before = !1),
                this.$after && (this.$after.remove(),
                this.$after = !1),
                (this.inModal || this.inCallout) && this.$autocomplete.appendTo("body"),
                $(window).add("html").add("body").off(".autocomplete." + id),
                this._clearFocus(),
                this.$container.off("mouseenter.autocomplete mouseleave.autocomplete").removeClass("autocompleteVisible autocompleteInModal autocompleteInCallout"),
                this.$resultsList.empty(),
                this.$autocomplete.css("max-height", ""),
                this.$element.attr("aria-expanded", "false").removeClass("autocompleteAttached autocompleteInputInCallout"),
                this.isOpen = !1,
                this.$element.trigger("closed.autocomplete"))
            },
            _compare: function(item) {
                var config = this.config
                  , regEx = new RegExp(shared.escapeRegExp(this.term),"gi")
                  , termSearch = item[config.key].search(regEx);
                return config.matchBeginning && termSearch === 0 || !config.matchBeginning && termSearch !== -1
            },
            destroy: function() {
                this.close();
                this.$element.add(this.$container).add(this.$resultsList).off(".autocomplete");
                this.$element.removeClass("autocompleteInput").removeAttr("aria-autocomplete aria-controls aria-expanded aria-owns autocomplete role").removeData("autocompleteInstance raw");
                this.$container.remove()
            },
            flush: function() {
                this.cachedData = {}
            },
            _focusItem: function($item) {
                return this._clearFocus(),
                $item.addClass("autocompleteSelected").focus(),
                $item.closest(this.$resultsList).length && $item.attr("aria-selected", "true"),
                shared.isValidCallback(this.config.onFocus) && this.config.onFocus.apply(this.$element, [$item]),
                $item
            },
            _getHighlightedValue: function(searchTerm, highlightedValue) {
                var config = this.config, openPattern, closePattern, regex;
                return config.highlight && (regex = new RegExp(shared.escapeRegExp(searchTerm),"gi"),
                config.highlight === !0 ? highlightedValue = highlightedValue.replace(regex, function(matched) {
                    return '<span class="autocompleteHighlighted">' + matched + "<\/span>"
                }) : (openPattern = new RegExp(shared.escapeRegExp(config.highlight.open),"g"),
                closePattern = new RegExp(shared.escapeRegExp(config.highlight.close),"g"),
                highlightedValue = highlightedValue.replace(openPattern, '<span class="autocompleteHighlighted">').replace(closePattern, "<\/span>"))),
                highlightedValue
            },
            _handleBodyFocusin: function(e) {
                var $target = $(e.target)
                  , targetInContainer = !!$target.closest(this.$container).length
                  , targetIsCurrentCallout = this.inCallout && $target.is("#calloutContent")
                  , targetIsCurrentElement = $target.is(this.$element);
                return targetInContainer || targetIsCurrentCallout || targetIsCurrentElement || this.close(),
                !0
            },
            _handleHtmlTouchendOrClick: function(e) {
                var $target = $(e.target)
                  , isLabel = $target.attr("for")
                  , $input = isLabel ? $("#" + isLabel) : !1
                  , isTapEvent = e.originalEvent.changedTouches ? Math.max(Math.abs(this.screenTouches.x - e.originalEvent.changedTouches[0].pageX), Math.abs(this.screenTouches.y - e.originalEvent.changedTouches[0].pageY)) < 5 : !1
                  , targetInAutocomplete = !!$target.closest(this.$autocomplete).length
                  , targetInElement = !!$target.closest(this.$element).length;
                return targetInElement || targetInAutocomplete || (!$input || $input.hasClass("autocompleteAttached")) && ($input || $target.hasClass("autocompleteAttached")) || (e.type === "click" || isTapEvent) && this.close(),
                !0
            },
            _handleHtmlTouchstart: function(e) {
                return this.screenTouches.x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX,
                this.screenTouches.y = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY,
                !0
            },
            _handleInputFocusin: function() {
                return this.isOpen ? this._clearFocus() : this._retrieveResults(),
                !0
            },
            _handleInputKeydown: function(e) {
                var key = e.which;
                if (key === 9 || key === 27)
                    this.close();
                else if (key === 38 || key === 40)
                    return !1;
                return !0
            },
            _handleInputKeyup: function(e) {
                var key = e.which;
                return key === 38 || key === 40 ? (this._navigateListItems(key === 38),
                !1) : (key !== 9 && key !== 13 && key !== 16 && key !== 27 && this.run(),
                !0)
            },
            _handleResultClick: function(e) {
                var $result = $(e.currentTarget);
                return $result.attr("aria-disabled") ? !1 : (this._selectItem($result),
                !0)
            },
            _handleResultsClick: function() {
                return this.inModal && $.modal && $.modal.preventClosing(),
                !0
            },
            _handleResultsKeydown: function(e) {
                var key = e.which
                  , $result = $(e.target)
                  , isResult = !!$result.closest(this.$resultsList).length
                  , tabOnResult = isResult && key === 9
                  , enterOnResult = isResult && key === 13
                  , shouldSelectResult = tabOnResult || enterOnResult
                  , shouldStopEvent = enterOnResult || key === 27 || key === 38 || key === 40
                  , shouldClose = key === 27 || key === 9 && !isResult
                  , shouldFocusOnElement = shouldClose || !shouldStopEvent && key !== 13 && !$result.is("input, textarea");
                return shouldSelectResult ? this._selectItem($result) : shouldFocusOnElement && this.$element.focus(),
                shouldClose && this.close(),
                !shouldStopEvent
            },
            _handleResultsKeyup: function(e) {
                var key = e.which;
                return (key === 40 || key === 221) && this._navigateListItems(),
                (key === 38 || key === 219) && this._navigateListItems(!0),
                !0
            },
            _navigateListItems: function(reverse) {
                var currentIndex, targetIndex, $targetElement = !1, $endElement, $tabbable;
                if ($tabbable = shared.getTabbableElements(this.$container),
                !$tabbable.length)
                    return !1;
                this.$focus ? ($endElement = reverse ? $tabbable.first() : $tabbable.last(),
                this.$focus.is($endElement) || (currentIndex = $tabbable.index(this.$focus),
                targetIndex = reverse ? currentIndex - 1 : currentIndex + 1,
                $targetElement = $tabbable.eq(targetIndex))) : $targetElement = reverse ? $tabbable.last() : $tabbable.first();
                $targetElement ? this.$focus = this._focusItem($targetElement) : this.$element.focus()
            },
            _open: function() {
                var self = this
                  , config = this.config
                  , id = this.$element.attr("id");
                if (this.inModal = this.$element.closest(".modal, #modal").length > 0,
                this.inCallout = this.$element.closest("#callout").length > 0,
                this.$resultsList.off("click.autocomplete.noResults").removeClass("loading autocompleteHasChecks").empty(),
                this.inCallout || this._positionAutocomplete(),
                !this.isOpen) {
                    if (shared.isValidCallback(config.onOpen) && (this.$before = $('<div class="autocompleteBefore" />'),
                    this.$after = $('<div class="autocompleteAfter" />'),
                    config.onOpen.apply(this.$element, [this.$container, this.$before, this.$after]),
                    this.$before.is(":empty") || this.$resultsList.before(this.$before),
                    this.$after.is(":empty") || this.$resultsList.after(this.$after)),
                    this.$element.addClass("autocompleteAttached").attr("aria-expanded", "true"),
                    this.$container.addClass("autocompleteVisible"),
                    this.inCallout)
                        this.$element.addClass("autocompleteInputInCallout"),
                        this.$container.addClass("autocompleteInCallout"),
                        this.$element.parent(".labelIconOnly").length ? this.$autocomplete.insertAfter(this.$element.parent()) : this.$autocomplete.insertAfter(this.$element);
                    else {
                        $(window).on("resize.autocomplete." + id, shared.debounce(function() {
                            return self._positionAutocomplete(),
                            !0
                        }, 100));
                        this.inModal && (this.$container.addClass("autocompleteInModal"),
                        this.$autocomplete.appendTo("#modal"))
                    }
                    $("html").on("touchstart.autocomplete." + id, function(e) {
                        return self._handleHtmlTouchstart(e)
                    }).on("touchend.autocomplete." + id + " click.autocomplete." + id, function(e) {
                        return self._handleHtmlTouchendOrClick(e)
                    });
                    $("body").on("focusin.autocomplete." + id, function(e) {
                        return self._handleBodyFocusin(e)
                    });
                    this.isOpen = !0;
                    this._bindMouseEvents();
                    this.$element.trigger("opened.autocomplete")
                }
            },
            _populate: function(results) {
                var self = this
                  , elementId = self.$element.attr("id");
                if (shared.isValidCallback(this.config.onResponse) && this.config.onResponse.apply(this.$element, [results]),
                results.length)
                    results = results.slice(0, this.config.maxResults),
                    results.forEach(function(item, i) {
                        var $result = self._buildResult(item, i, elementId);
                        self.$resultsList.append($result)
                    }),
                    self.$resultsList.find(".autocompleteChecked").length && self.$resultsList.addClass("autocompleteHasChecks");
                else {
                    this.$resultsList.html('<li class="autocompleteResult autocompleteNoResults" role="alert" label="Search Results">' + shared.localize(autocomplete.staticProperties.langSets, "noMatches") + "<\/li>").on("click.autocomplete.noResults", function() {
                        return !1
                    });
                    this.$element.removeData("raw")
                }
                this.$element.trigger("populated.autocomplete")
            },
            _positionAutocomplete: function() {
                var self = this;
                this._positionContainer();
                this.inModal && setTimeout(function() {
                    self._positionContainer()
                }, 300)
            },
            _positionContainer: function() {
                var offset = this.$element.offset(), top, modalPadding, $modal;
                this.$container.css("max-height", "");
                top = Number(offset.top + this.$element.outerHeight(!1));
                this.inModal && ($modal = $("#modal"),
                $modal.css("position") === "absolute" ? (modalPadding = parseInt($("#modalContents").css("padding"), 10),
                this.$container.css("max-height", $("#modal").outerHeight(!0) - top - modalPadding)) : $modal.css("position") === "fixed" && (top -= $(document).scrollTop()));
                this.$container.css({
                    top: top,
                    left: offset.left,
                    width: this.$element.outerWidth(!1)
                })
            },
            _retrieveResults: function() {
                var config = this.config, convertedData, enoughCharacters = !1, prevTerm = this.term, results;
                (this.term = this.$element.val(),
                this.term === prevTerm && this.isOpen) || (enoughCharacters = this.term.length >= config.minLength,
                enoughCharacters ? this.term !== this.$element.attr("placeholder") && (shared.isValidCallback(config.onSearch) && config.onSearch.apply(this.$element, [this.term]),
                Array.isArray(this.cachedData[this.term.toLowerCase()]) ? results = this.cachedData[this.term.toLowerCase()] : $.isFunction(config.source) ? (convertedData = shared.isValidCallback(config.jsonConversion) ? config.jsonConversion.apply(this.$element, [config.source.apply(this.$element, [this.term])]) : config.source.apply(this.$element, [this.term]),
                results = convertedData) : typeof config.source == "object" ? (convertedData = shared.isValidCallback(config.jsonConversion) ? config.jsonConversion.apply(this.$element, [config.source, config]) : config.source,
                results = this._cacheResults(convertedData)) : typeof config.source == "string" && (this.results && this.results.length ? results = this._cacheResults(this.results) : this._ajaxRequest()),
                results && (!results.length && config.disableNoResultsMessage ? this.close() : (this._open(),
                this._populate(results)))) : config.alwaysOpenOnFocus && !this.isOpen ? this._open() : !config.alwaysOpenOnFocus && this.isOpen ? this.close() : this.$resultsList.empty())
            },
            run: shared.debounce(function() {
                this._retrieveResults()
            }, 200),
            _selectItem: function($item) {
                var config = this.config
                  , raw = $item.data("raw");
                $item && this.$focus && $item[0] === this.$focus[0] ? (this.$element.data("raw", raw).val($item.data("value")),
                shared.isValidCallback(config.onResultSelect) && (shared.warn('DEPRECATION NOTICE: Please replace "onResultSelect" with "onItemSelect"'),
                config.onResultSelect.apply(this.$element, [$item])),
                shared.isValidCallback(config.onItemSelect) && config.onItemSelect.apply(this.$element, [raw])) : this.$element.removeData("raw");
                this.$element.focus();
                this.close()
            }
        },
        staticProperties: {
            defaults: {
                ajaxOverride: {},
                alwaysOpenOnFocus: !1,
                customDisplay: !1,
                dataType: "json",
                disableNoResultsMessage: !1,
                highlight: !0,
                jsonConversion: !1,
                key: "",
                matchBeginning: !1,
                maxResults: 20,
                minLength: 3,
                onChange: !1,
                onClose: !1,
                onCreate: !1,
                onError: !1,
                onFocus: !1,
                onItemSelect: !1,
                onOpen: !1,
                onResponse: !1,
                onSearch: !1,
                queryParameter: !1,
                source: ""
            },
            langSets: {
                de: {
                    noMatches: "Keine &#220;bereinstimmungen gefunden"
                },
                en: {
                    noMatches: "No matches found"
                },
                es: {
                    noMatches: "No se encontraron concordancias"
                },
                fr: {
                    noMatches: "Aucune correspondance trouv&#233;e"
                },
                it: {
                    noMatches: "Nessuna corrispondenza trovata"
                },
                sv: {
                    noMatches: "Inga matchningar hittades"
                }
            }
        }
    }
      , version = 2
      , doubleIncluded = !!$.autocomplete;
    if (doubleIncluded) {
        if ($.autocomplete.version === version) {
            shared.warn("ERROR: You are including autocomplete.js multiple times");
            return
        }
        if (shared.warn("ERROR: You are including multiple versions of autocomplete.js"),
        $.autocomplete.version > version)
            return
    }
    $.fn.autocomplete = function(options) {
        var isMethodCall = typeof options == "string"
          , args = arguments
          , returnValue = this;
        return this.each(function() {
            var $this = $(this), instance = $this.data("autocompleteInstance"), methodValue;
            if (isMethodCall) {
                if (!instance)
                    return shared.warn('Cannot call methods on autocomplete prior to initialization; attempted to call method "' + options + '".'),
                    !1;
                if (!$.isFunction(instance[options]) || options.indexOf("_") === 0)
                    return shared.warn('No such method "' + options + '" for autocomplete.'),
                    !1;
                if (methodValue = instance[options].apply(instance, Array.prototype.slice.call(args, 1)),
                methodValue !== instance && methodValue !== undefined)
                    return returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue,
                    !1
            } else
                autocomplete.create($this, options)
        }),
        returnValue
    }
    ;
    $.autocomplete = {
        close: function() {
            var $autocompleteInput = $(".autocompleteAttached");
            $autocompleteInput.length && $autocompleteInput.autocomplete("close")
        },
        getTest: function() {
            return $.extend({}, autocomplete)
        },
        version: version
    }
})(jQuery)
