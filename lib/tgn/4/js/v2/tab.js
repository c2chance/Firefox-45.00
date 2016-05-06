(function($) {
    "use strict";
    var shared = {
        debounce: function(callback, delay, immediate) {
            return this.throttle(callback, delay, undefined, !!immediate)
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
        warn: function(msg, useAlert) {
            window.console && (console.warn(msg),
            useAlert && /ancestry(?:stage|dev)/.test(window.location.hostname) && alert(msg))
        }
    }
      , tabs = {
        create: function($element, options) {
            var instance = $element.data("tabsInstance"), resizeEvent;
            instance && instance.destroy();
            $element.data("allow-urls") === !0 && (options = options || {},
            options.allowUrls = !0);
            instance = Object.create(this.proto);
            instance.config = $.extend({}, this.staticProperties.defaults, options);
            instance.$element = $element;
            instance.tabsName = $element.data("tab");
            instance.isVertical = instance._getVertical();
            instance.activeIndex = instance._getActiveIndex();
            instance.overflowBound = !1;
            instance.$tabs = $element.children(".tab");
            instance.$tabGroup = $('[data-tab-group="' + instance.tabsName + '"]');
            instance.$tabContents = instance.$tabGroup.children(".tabContent");
            instance.$tabContents.attr("tabindex", "-1");
            resizeEvent = ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch ? "orientationchange.tabs" : "resize.tabs") + ("." + instance.tabsName);
            $(window).on(resizeEvent, shared.debounce(function() {
                return instance._handleResize()
            }, 100));
            instance.$element.on("click.tabs", ".tab", function(e) {
                return instance._handleTabClick(e)
            });
            instance.$element.on("keydown.tabs", ".tab", function(e) {
                return instance._handleTabKeydown(e)
            });
            return instance._applyAriaRoles(),
            instance._updateTabs(),
            instance._removeButtonClasses(),
            instance._updateButtonClasses(),
            instance._triggerClickOnUrlTab(),
            instance.delayedCheckOverflow = setTimeout(function() {
                typeof instance.overflow == "undefined" && (instance._measureWidths(),
                instance._checkOverflow())
            }, 500),
            instance.$element.data("tabsInstance", instance),
            instance
        },
        proto: {
            _addOverflow: function() {
                this._createOverflowElements();
                this._bindOverflowEvents();
                this._measureWidths();
                this._centerTab()
            },
            _animateHorizontalScroll: function(direction) {
                var dx = Math.ceil(this.elementWidth * .75)
                  , xi = this.$element.scrollLeft()
                  , xf = direction === "left" ? xi - dx : xi + dx;
                this.$element.animate({
                    scrollLeft: xf
                }, 250)
            },
            _applyAriaRoles: function() {
                var self = this;
                this.$element.attr("role", this.$element.attr("role") || "tablist");
                this.$tabs.each(function(i) {
                    var $tab = $(this)
                      , dataTab = self.tabsName || "Tabs" + Date.now() + Math.floor(Math.random() * 1e3 + 1)
                      , isTabActive = $tab.hasClass("tabActive")
                      , $curTabPanel = self.$tabContents.eq(i)
                      , panelId = $curTabPanel.attr("id") || dataTab + "TabPanel" + i;
                    $tab.attr({
                        id: $tab.attr("id") || self.tabsName + "Tab" + i,
                        role: $tab.attr("role") || "tab",
                        "aria-controls": $tab.attr("aria-controls") || panelId,
                        "aria-selected": $tab.attr("aria-selected") || isTabActive,
                        "aria-expanded": isTabActive
                    });
                    $curTabPanel.attr({
                        id: panelId,
                        role: $curTabPanel.attr("role") || "tabpanel",
                        "aria-labelledby": $curTabPanel.attr("aria-labelledby") || $tab.attr("id"),
                        "aria-hidden": !isTabActive
                    })
                })
            },
            _bindOverflowEvents: function() {
                var self = this;
                this.$element.on("scroll.tabs", shared.throttle(function() {
                    return self._handleOverflowScroll()
                }, 100));
                this.$overflowLeftButton.on("click.tabs", shared.debounce(function() {
                    return self._animateHorizontalScroll("left"),
                    !0
                }, 250, !0));
                this.$overflowRightButton.on("click.tabs", shared.debounce(function() {
                    return self._animateHorizontalScroll("right"),
                    !0
                }, 250, !0));
                this.overflowBound = !0
            },
            _centerTab: function() {
                if (this.overflow) {
                    var $tab = this.$tabs.eq(this.activeIndex)
                      , w = $tab.outerWidth(!1)
                      , offX = $tab.position().left
                      , curX = this.$element.scrollLeft()
                      , pLeft = parseInt(this.$element.css("padding-left"), 10)
                      , mLeft = parseInt($tab.css("margin-left"), 10)
                      , ideal = (this.elementWidth - w) / 2;
                    this.$element.animate({
                        scrollLeft: curX + offX - pLeft + mLeft - ideal
                    }, 250)
                }
            },
            _checkOverflow: function() {
                this.overflow = this._getOverflow();
                this.overflow ? (this.overflowBound || this._addOverflow(),
                this._handleOverflowScroll()) : this.overflowBound && this._removeOverflow()
            },
            _checkSubTabs: function() {
                var $tabContent = this.$tabContents.eq(this.activeIndex)
                  , $subTabs = $tabContent.find(".tabs");
                $subTabs.length && $subTabs.each(function() {
                    var $subTab = $(this);
                    $subTab.data("tabsInstance") ? $subTab.tabs("resize") : $subTab.data("auto-instantiate") !== "off" && $subTab.tabs()
                })
            },
            _clearActiveTab: function() {
                this.$tabs.removeClass("tabActive active tabLast tabFirst").attr({
                    "aria-selected": "false",
                    "aria-expanded": "false"
                });
                this.$tabContents.removeClass("tabActive active").attr("aria-hidden", "true")
            },
            _createOverflowElements: function() {
                var hasVerticalTabs = this.$element.hasClass("tabsVertical") ? " hasVerticalTabs" : "";
                this.$element.wrap('<div class="tabsScrollable' + hasVerticalTabs + '" />');
                this.$overflow = this.$element.parent();
                this.$overflowLeftButton = $('<button class="icon iconArrowLeft tabsOverflowBtn" aria-hidden="true" tabindex="-1" type="button" />');
                this.$overflowRightButton = $('<button class="icon iconArrowRight tabsOverflowBtn" aria-hidden="true" tabindex="-1" type="button" />');
                this.$overflowLeftButton.insertBefore(this.$overflow);
                this.$overflowRightButton.insertAfter(this.$overflow)
            },
            destroy: function() {
                clearTimeout(this.delayedCheckOverflow);
                this._removeOverflow();
                this.$element.off(".tabs");
                this._removeAriaRoles();
                $(window).off(".tabs." + this.tabsName);
                this.$element.removeData("tabsInstance")
            },
            _getActiveIndex: function() {
                var config = this.config, activeIndex, tabActive;
                return config.activeIndex ? activeIndex = config.activeIndex : config.active ? activeIndex = config.active - 1 : (tabActive = this.$element.find(".tabActive"),
                activeIndex = tabActive.length ? tabActive.index() : 0),
                activeIndex
            },
            _getElementWidth: function() {
                var outerWidth = this.$element.outerWidth(!1)
                  , paddingLeft = parseInt(this.$element.css("padding-left"), 10)
                  , paddingRight = parseInt(this.$element.css("padding-right"), 10);
                return Math.max(0, outerWidth - (paddingLeft + paddingRight))
            },
            _getOverflow: function() {
                return this.isVertical || this.$element.is(":hidden") || this.config.overrideOverflow ? !1 : this.tabsWidth > this.elementWidth
            },
            _getTabsWidth: function() {
                var totalWidth = 0;
                return this.$tabs.each(function() {
                    totalWidth += $(this).outerWidth(!0)
                }),
                totalWidth
            },
            _getVertical: function() {
                var windowWidth = $(window).width()
                  , notResponsive = !this.$element.hasClass("tabs480") && !this.$element.hasClass("tabs320")
                  , responsiveOnTablet = this.$element.hasClass("tabs480") && windowWidth >= 768
                  , responsiveOnMobile = this.$element.hasClass("tabs320") && windowWidth >= 480;
                return this.$element.hasClass("tabsVertical") && (notResponsive || responsiveOnTablet || responsiveOnMobile)
            },
            _handleOverflowScroll: function() {
                var leftX = this.$element.scrollLeft();
                return this.$overflow && (leftX < this.tabsWidth - this.elementWidth - 5 ? (this.$overflow.addClass("tabsOverflowRight"),
                this.$overflowRightButton.addClass("tabsOverflowBtnVisible")) : (this.$overflow.removeClass("tabsOverflowRight"),
                this.$overflowRightButton.removeClass("tabsOverflowBtnVisible")),
                leftX > 5 ? (this.$overflow.addClass("tabsOverflowLeft"),
                this.$overflowLeftButton.addClass("tabsOverflowBtnVisible")) : (this.$overflow.removeClass("tabsOverflowLeft"),
                this.$overflowLeftButton.removeClass("tabsOverflowBtnVisible"))),
                !0
            },
            _handleResize: function() {
                return this.isVertical = this._getVertical(),
                this._updateButtonClasses(),
                this._measureWidths(),
                this._checkOverflow(),
                !0
            },
            _handleTabClick: function(e) {
                var config = this.config
                  , $tab = $(e.currentTarget)
                  , thisHref = $tab.attr("href");
                return $tab.index() === this.activeIndex ? !1 : !config.allowUrls && thisHref && thisHref.indexOf("#") !== 0 && thisHref.indexOf("javascript") !== 0 ? (window.location = thisHref,
                !1) : (this.activeIndex = $tab.index(),
                this._updateTabs(),
                config.allowUrls) ? !1 : !0
            },
            _handleTabKeydown: function(e) {
                var $tab = $(e.currentTarget)
                  , key = e.which;
                return key === 37 ? $tab.prev().focus() : key === 39 && $tab.next().focus(),
                !0
            },
            _measureWidths: function() {
                this.tabsWidth = this._getTabsWidth();
                this.elementWidth = this._getElementWidth()
            },
            _removeAriaRoles: function() {
                this.$element.removeAttr("role");
                this.$tabs.removeAttr("role aria-controls aria-selected aria-expanded");
                this.$tabContents.removeAttr("role aria-labelledby aria-hidden")
            },
            _removeButtonClasses: function() {
                this.$tabs.hasClass("ancBtnL") && this.$element.addClass("tabsConnected");
                this.$tabs.hasClass("ancBtn") && shared.warn("The ancBtn class should not be used on tabs.");
                this.$tabs.removeClass("ancBtn ancBtnL ancBtnM ancBtnR silver")
            },
            _removeOverflow: function() {
                this.$overflow && this.$overflow.hasClass("tabsScrollable") && (this.$element.unwrap(),
                this.$overflowLeftButton.remove(),
                this.$overflowRightButton.remove(),
                this.$overflow = !1,
                this.$overflowLeftButton = !1,
                this.$overflowRightButton = !1,
                this._measureWidths());
                this._removeOverflowEvents()
            },
            _removeOverflowEvents: function() {
                this.$element.off("scroll.tabs");
                this.overflowBound = !1
            },
            resize: function() {
                this._handleResize()
            },
            _setActiveContent: function() {
                var config = this.config;
                this.$tabContents.eq(this.activeIndex).addClass("tabActive active").attr("aria-hidden", "false");
                config.onOpen && $.isFunction(config.onOpen) && config.onOpen.apply(this.$element, [this.activeIndex, this.$tabContents.eq(this.activeIndex)]);
                this._checkSubTabs()
            },
            _setActiveTab: function() {
                this.$tabs.eq(this.activeIndex).addClass("tabActive active").attr({
                    "aria-selected": "true",
                    "aria-expanded": "true"
                })
            },
            _triggerClickOnUrlTab: function() {
                var self = this
                  , config = this.config;
                !config || isNaN(parseInt(config.active, 10)) && isNaN(parseInt(config.activeIndex, 10)) || window.location.hash && $('.tab[data-label="' + window.location.hash.replace("#", "") + '"], .tab[href="' + window.location.hash + '"]').length || setTimeout(function() {
                    self.$tabs.eq(self.activeIndex).trigger("click.tabs")
                }, 100)
            },
            _updateButtonClasses: function() {
                this.$element.hasClass("tabsVertical") && (this.isVertical ? this.$element.removeClass("tabsConnected") : this.$element.addClass("tabsConnected"))
            },
            _updateTabs: function() {
                this._clearActiveTab();
                this._setActiveTab();
                this._setActiveContent();
                this._centerTab()
            }
        },
        staticProperties: {
            defaults: {
                active: !1,
                activeIndex: !1,
                allowUrls: !1,
                onOpen: !1,
                overrideOverflow: !1
            }
        }
    }
      , version = 2
      , doubleIncluded = !!$.tabs;
    if (doubleIncluded) {
        if ($.tabs.version === version) {
            shared.warn("ERROR: You are including tab.js multiple times");
            return
        }
        if (shared.warn("ERROR: You are including multiple versions of tab.js"),
        $.tabs.version > version)
            return
    }
    $.fn.tabs = function(options) {
        var isMethodCall = typeof options == "string"
          , args = arguments
          , returnValue = this;
        return this.each(function() {
            var $this = $(this), instance = $this.data("tabsInstance"), methodValue;
            if (isMethodCall) {
                if (!instance)
                    return shared.warn('Cannot call methods on tabs prior to initialization; attempted to call method "' + options + '".'),
                    !1;
                if (!$.isFunction(instance[options]) || options.indexOf("_") === 0)
                    return shared.warn('No such method "' + options + '" for tabs.'),
                    !1;
                if (methodValue = instance[options].apply(instance, Array.prototype.slice.call(args, 1)),
                methodValue !== instance && methodValue !== undefined)
                    return returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue,
                    !1
            } else
                tabs.create($this, options)
        }),
        returnValue
    }
    ;
    $.tabs = {
        getTest: function() {
            return $.extend({}, tabs)
        },
        version: version
    };
    doubleIncluded || $(function() {
        $(".tabs, .tabs2").filter(function() {
            return !$(this).data("tabsInstance") && $(this).data("auto-instantiate") !== "off"
        }).tabs();
        window.location.hash && $('.tab[data-label="' + window.location.hash.replace("#", "") + '"], .tab[href="' + window.location.hash + '"]').trigger("click.tabs")
    })
})(jQuery)
