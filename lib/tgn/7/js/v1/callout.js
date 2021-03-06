(function($) {
    "use strict";
    var defaults = {
        allowClick: !1,
        style: "light",
        type: "click",
        content: "",
        classes: "",
        calloutClasses: "",
        disableAutofocusOnOpen: !1,
        position: "bottom",
        align: "center",
        hidePointer: !1,
        keepContentInPlace: !0,
        showDelay: 100,
        hideDelay: 100,
        onOpen: !1,
        onAfterOpen: !1,
        onClose: !1,
        debounceTime: 250
    }, closeTimer, showDelayTimer, isTouchDevice = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, $html = $("html"), scrollable = !1, version = 1, doubleIncluded = !!$.callout;
    if (doubleIncluded) {
        if ($.callout.version === version) {
            window.console && console.warn("ERROR: You are including callout.js multiple times");
            return
        }
        if (window.console && console.warn("ERROR: You are including multiple versions of callout.js"),
        $.callout.version > version)
            return
    }
    $.fn.callout = function(options) {
        return this.each(function() {
            function visible(element) {
                return $.expr.filters.visible(element) && !$(element).parents().andSelf().filter(function() {
                    return $.css(this, "visibility") === "hidden"
                }).length
            }
            function focusable(element, isTabIndexNotNaN) {
                var map, mapName, img, nodeName = element.nodeName.toLowerCase();
                return "area" === nodeName ? (map = element.parentNode,
                mapName = map.name,
                !element.href || !mapName || map.nodeName.toLowerCase() !== "map") ? !1 : (img = $("img[usemap=#" + mapName + "]")[0],
                !!img && visible(img)) : (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element)
            }
            function getTabbableElements($container) {
                return $container.find("input, select, textarea, button, a, object, [tabindex]").filter(function() {
                    return tabbable(this)
                })
            }
            function tabbable(element) {
                var tabIndex = $.attr(element, "tabindex")
                  , isTabIndexNaN = isNaN(tabIndex);
                return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
            }
            function resetCalloutContent() {
                calloutWrap.add(calloutContent).add(calloutPointer).removeAttr("style class");
                calloutContent.removeAttr("role").off("keydown.callout").addClass("calloutContent");
                calloutWrap.addClass("callout");
                calloutPointer.addClass("calloutPointer");
                $("#modal, html").add(window).add(calloutWrap).off(".callout")
            }
            function hideCallout(runOnClose) {
                var $openCalloutTrigger = $(".calloutTrigger.active")
                  , openCalloutSettings = $openCalloutTrigger.data("callout-settings")
                  , focusIsWithinCallout = calloutContent.find(":focus").length;
                if ($openCalloutTrigger.length) {
                    if (runOnClose && openCalloutSettings.onClose !== !1)
                        openCalloutSettings.onClose($openCalloutTrigger);
                    resetCalloutContent();
                    openCalloutSettings.keepContentInPlace ? $("#calloutContentPlaceholder").replaceWith($(openCalloutSettings.content)) : calloutContent.children().remove();
                    $openCalloutTrigger.removeClass("hover active").attr("aria-expanded", !1);
                    scrollable && $openCalloutTrigger.closest(".calloutScrollPane").off("scroll.callout");
                    modalHeight !== !1 && ($("html").hasClass("modalOpen") && $("body, #modal").css("height", modalHeight),
                    $("#modalCenter").css("height", ""),
                    modalHeight = !1,
                    $("#modal").removeData("preventModalCenterOnResize"));
                    focusIsWithinCallout && $openCalloutTrigger.focus()
                }
            }
            function setModalHeightOnTouchDevices() {
                var $modalCenter = $("#modalCenter")
                  , heightCurrentlyAvailable = $("body").outerHeight(!0)
                  , heightNeededToShowCallout = calloutWrap.offset().top + calloutContent.outerHeight(!0);
                heightCurrentlyAvailable < heightNeededToShowCallout && (modalHeight = heightCurrentlyAvailable,
                $modalCenter.css("height", $modalCenter.css("height")),
                $("body, #modal").css("height", heightNeededToShowCallout),
                $("#modal").data("preventModalCenterOnResize", !0))
            }
            function setModalHeightOnNonTouchDevices() {
                var $modalContents = $("#modalContents")
                  , heightNeededToShowCallout = calloutWrap.offset().top + calloutContent.outerHeight(!0)
                  , heightCurrentlyAvailable = $modalContents.outerHeight(!1) + $modalContents.offset().top
                  , extraSpaceNeeded = Math.max(heightNeededToShowCallout - heightCurrentlyAvailable, 0);
                $modalContents.css("margin-bottom", extraSpaceNeeded)
            }
            function positionCallout(position, align, lastRun) {
                var windowWidth = $window.outerWidth(!1), triggerHeight = $trigger.outerHeight(!1), triggerWidth = $trigger.outerWidth(!1), triggerPos = $trigger.offset(), leftOfTrigger = triggerPos.left, centerOfTrigger = leftOfTrigger + triggerWidth / 2, rightOfTrigger = leftOfTrigger + triggerWidth, topOfTrigger = triggerPos.top, bottomOfTrigger = topOfTrigger + triggerHeight, calloutTempWidth = calloutContent.outerWidth(!1), calloutInputOffset = 16, calloutOffset = 24, inModal = $trigger.closest("#modal").length > 0, calloutContentHeight, calloutIsPastModalArea, minTriggerHeight = 42;
                if (calloutWrap.removeClass("calloutPositionBottom calloutPositionTop calloutPositionLeft calloutPositionRight calloutAlignLeft calloutAlignCenter calloutAlignMiddle calloutAlignRight calloutAlignTop calloutAlignBottom").add(calloutContent).add(calloutPointer).removeAttr("style"),
                calloutContent.css({
                    width: calloutDefaultWidth
                }),
                isInputField) {
                    var leftCorrect = 0
                      , minimumMaxWidth = 180
                      , widthAvailable = windowWidth - (leftOfTrigger + 10);
                    minimumMaxWidth > widthAvailable && (leftCorrect = Math.min(minimumMaxWidth, calloutDefaultWidth) - widthAvailable);
                    calloutContent.css({
                        "max-width": Math.max(triggerWidth, minimumMaxWidth),
                        width: calloutDefaultWidth
                    });
                    calloutWrap.addClass("calloutPositionBottom").css({
                        left: leftOfTrigger - leftCorrect,
                        top: bottomOfTrigger
                    })
                } else if (settings.type === "cursor") {
                    calloutContent.css("width", calloutTempWidth);
                    $trigger.on("mousemove.callout", function(e) {
                        calloutWrap.css({
                            left: Math.max(calloutInputOffset + windowPadding, Math.min(e.pageX, windowWidth - windowPadding - calloutContent.outerWidth(!1) + calloutInputOffset)),
                            top: e.pageY
                        });
                        e.pageX > windowWidth + calloutInputOffset - calloutContent.outerWidth(!1) ? calloutPointer.css({
                            left: Math.min(e.pageX - calloutWrap.offset().left - calloutInputOffset / 2, calloutContent.outerWidth(!1) - 48)
                        }) : calloutPointer.css({
                            left: 0
                        })
                    });
                    calloutWrap.addClass("calloutPositionBottom")
                } else {
                    position || (position = settings.position);
                    align || (align = settings.align);
                    calloutWrap.css({
                        left: centerOfTrigger
                    });
                    switch (align) {
                    case "left":
                        calloutWrap.addClass("calloutAlignLeft");
                        calloutContent.css({
                            "max-width": Math.max(centerOfTrigger + calloutOffset - windowPadding, calloutMinWidth),
                            right: triggerWidth < parseInt(calloutPointer.css("width"), 10) ? -calloutOffset : -triggerWidth / 2
                        });
                        break;
                    case "right":
                        calloutWrap.addClass("calloutAlignRight");
                        calloutContent.css({
                            left: -triggerWidth / 2,
                            "max-width": Math.max(windowWidth - centerOfTrigger + calloutOffset - windowPadding, calloutMinWidth)
                        });
                        break;
                    default:
                        if (position === "left" || position === "right")
                            switch (align) {
                            case "top":
                                calloutWrap.addClass("calloutAlignTop");
                                triggerHeight < minTriggerHeight ? calloutWrap.css({
                                    top: topOfTrigger - (minTriggerHeight - triggerHeight) / 2
                                }) : calloutWrap.css({
                                    top: topOfTrigger
                                });
                                break;
                            case "bottom":
                                calloutWrap.addClass("calloutAlignBottom");
                                triggerHeight < minTriggerHeight ? calloutWrap.css({
                                    top: bottomOfTrigger + (minTriggerHeight - triggerHeight) / 2
                                }) : calloutWrap.css({
                                    top: bottomOfTrigger
                                });
                                break;
                            default:
                                calloutWrap.addClass("calloutAlignMiddle").css({
                                    top: topOfTrigger + triggerHeight / 2 - calloutWrap.outerHeight(!1) / 2
                                });
                                calloutContent.css({
                                    top: "-" + calloutContent.outerHeight(!1) / 2 + "px"
                                })
                            }
                        else
                            calloutWrap.addClass("calloutAlignCenter"),
                            calloutContent.css({
                                left: -Math.abs(calloutContent.outerWidth(!1) / 2)
                            }),
                            calloutContent.offset().left + calloutContent.outerWidth(!1) - $(document).scrollLeft() > windowWidth && calloutContent.css({
                                left: -Math.abs(calloutContent.outerWidth(!1) / 2) + (windowWidth - calloutContent.offset().left - calloutContent.outerWidth(!1)) + $(document).scrollLeft() - windowPadding,
                                "max-width": windowWidth - windowPadding * 2
                            }),
                            calloutContent.offset().left < 0 && calloutContent.css({
                                left: -Math.abs(leftOfTrigger) - triggerWidth / 2 + windowPadding,
                                "max-width": windowWidth - windowPadding * 2
                            })
                    }
                    switch (position) {
                    case "left":
                        calloutWrap.addClass("calloutPositionLeft").css({
                            left: leftOfTrigger - calloutWrap.outerWidth(!1)
                        });
                        calloutContent.css({
                            "max-width": Math.max(leftOfTrigger - windowPadding - parseInt(calloutContent.css("margin-left"), 10) - parseInt(calloutContent.css("margin-right"), 10), calloutMinWidth)
                        });
                        break;
                    case "right":
                        calloutWrap.addClass("calloutPositionRight").css({
                            left: rightOfTrigger
                        });
                        calloutContent.css({
                            "max-width": Math.max(windowWidth - rightOfTrigger - windowPadding - parseInt(calloutContent.css("margin-left"), 10) - parseInt(calloutContent.css("margin-right"), 10), calloutMinWidth)
                        });
                        break;
                    case "top":
                        calloutWrap.addClass("calloutPositionTop").css({
                            top: topOfTrigger - calloutWrap.outerHeight(!1)
                        });
                        break;
                    default:
                        calloutWrap.addClass("calloutPositionBottom").css({
                            top: bottomOfTrigger
                        })
                    }
                    calloutContentHeight = calloutContent.outerHeight(!1);
                    calloutContent.offset().top + calloutContentHeight > $window.scrollTop() + $window.outerHeight(!1) && (position === "left" || position === "right") && calloutContent.css({
                        top: Math.max(parseInt(calloutContent.css("top"), 10) - (calloutContent.offset().top + calloutContentHeight - $window.scrollTop() - $window.outerHeight(!1) + windowPadding), -Math.abs(calloutContentHeight - calloutOffset))
                    });
                    calloutContent.offset().top < $window.scrollTop() && ((position === "left" || position === "right") && calloutContent.css({
                        top: Math.min(parseInt(calloutContent.css("top"), 10) + ($window.scrollTop() - calloutContent.offset().top + windowPadding), -Math.abs(calloutOffset))
                    }),
                    position !== "top" || lastRun || positionCallout("bottom", "center", !0));
                    (calloutContent.offset().left < 0 || windowWidth < calloutContent.offset().left + calloutContent.outerWidth(!1)) && (lastRun || positionCallout(settings.position === "left" || settings.position === "right" ? "bottom" : settings.position, "center", !0));
                    inModal && !lastRun && calloutWrap.hasClass("calloutPositionBottom") && (isTouchDevice ? (calloutIsPastModalArea = calloutContent.offset().top + calloutContent.outerHeight(!1) > $("#modal").height(),
                    calloutIsPastModalArea && setModalHeightOnTouchDevices()) : (calloutIsPastModalArea = $("#modal").scrollTop() + calloutContent.offset().top + calloutContent.outerHeight(!1) - Math.max($("body").scrollTop(), $html.scrollTop()) > Math.max($("#modal").outerHeight(!1), $("#modalContents").outerHeight(!1)),
                    calloutIsPastModalArea && setModalHeightOnNonTouchDevices()))
                }
            }
            function resetShowTimer() {
                showDelayTimer && (clearTimeout(showDelayTimer),
                showDelayTimer = null )
            }
            function hideDelay() {
                hideDelayTimer = setTimeout(function() {
                    $(".calloutTrigger").hasClass("hover") || calloutWrap.hasClass("hover") || (resetShowTimer(),
                    hideCallout(!0))
                }, settings.hideDelay)
            }
            function resetHideTimer() {
                hideDelayTimer && (clearTimeout(hideDelayTimer),
                hideDelayTimer = null )
            }
            function handleTabPress() {
                $("#calloutContent").off("keydown.callout").on("keydown.callout", function(e) {
                    var tabbableElements, focusedElement, $this = $(this);
                    e.keyCode === 9 && (tabbableElements = getTabbableElements($this),
                    focusedElement = $this.find(":focus") || $this,
                    (e.shiftKey && (focusedElement.get(0) === tabbableElements.first().get(0) || $("#calloutContent:focus").length) || !e.shiftKey && focusedElement.get(0) === tabbableElements.last().get(0) || focusedElement.eq(0).is('[type="radio"]') && (e.shiftKey && focusedElement.eq(0).attr("name") === tabbableElements.first().eq(0).attr("name") || !e.shiftKey && focusedElement.eq(0).attr("name") === tabbableElements.last().eq(0).attr("name"))) && ($trigger.focus(),
                    hideCallout(!0)))
                })
            }
            function focusOnCallout() {
                var newScrollTop, oldScrollTop, $body;
                $trigger.is("input, textarea") || ($body = $("body"),
                oldScrollTop = Math.max($body.scrollTop(), $html.scrollTop()),
                $("#calloutContent").focus(),
                newScrollTop = Math.max($body.scrollTop(), $html.scrollTop()),
                newScrollTop !== oldScrollTop && $("body, html").scrollTop(oldScrollTop))
            }
            function resetDefaultWidth() {
                return Math.ceil(calloutWrap.css({
                    display: "block",
                    left: "0",
                    top: "0",
                    width: "auto"
                }).find(calloutContent).css({
                    position: "relative",
                    width: "auto"
                })[0].getBoundingClientRect().width)
            }
            function debounce(func, wait, immediate) {
                var timeout;
                return function() {
                    var context = this
                      , args = arguments
                      , later = function() {
                        timeout = null ;
                        immediate || func.apply(context, args)
                    }
                      , callNow = immediate && !timeout;
                    clearTimeout(timeout);
                    timeout = setTimeout(later, wait);
                    callNow && func.apply(context, args)
                }
            }
            function showCallout() {
                var preventClose = !1, $scrollableContainer;
                if (clearTimeout(closeTimer),
                $trigger.data("callout-settings", settings),
                settings.keepContentInPlace && $trigger.data("callout-content").before('<span id="calloutContentPlaceholder" style="display:none;"><\/span>'),
                calloutContent.html($trigger.data("callout-content")),
                !calloutWrap.hasClass("calloutTypeCursor") && settings.type !== "custom")
                    $html.on("touchstart.callout", function(e) {
                        calloutTouches.x = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
                        calloutTouches.y = e.originalEvent.touches ? e.originalEvent.touches[0].pageY : e.pageY
                    }).on("click.callout touchend.callout", function(e) {
                        var triggerIsWithinCallout = $(e.srcElement || e.target || e.originalEvent.originalTarget).closest("#callout").length;
                        preventClose || triggerIsWithinCallout || (e.type === "click" ? hideCallout(!0) : !isInputField && Math.max(Math.abs(calloutTouches.x - e.originalEvent.changedTouches[0].pageX), Math.abs(calloutTouches.y - e.originalEvent.changedTouches[0].pageY)) < 5 && (closeTimer = setTimeout(function() {
                            hideCallout(!0);
                            preventClose = !1
                        }, 500),
                        preventClose = !0))
                    });
                if (settings.type === "hover" || settings.type === "cursor")
                    calloutWrap.on("mouseenter.callout", function() {
                        calloutWrap.addClass("hover");
                        resetHideTimer()
                    }).on("mouseleave.callout", function() {
                        calloutWrap.removeClass("hover");
                        hideDelay()
                    });
                if (settings.onOpen !== !1)
                    settings.onOpen($trigger);
                if (settings.style === "dark" ? calloutWrap.addClass("calloutStyleDark bgDark") : settings.style === "alt" ? calloutWrap.addClass("calloutStyleAlt") : settings.style === "guidance" && calloutWrap.addClass("calloutStyleGuidance"),
                settings.classes && calloutContent.addClass(settings.classes),
                settings.calloutClasses && calloutWrap.addClass(settings.calloutClasses),
                $trigger.attr("data-callout-classes") && calloutContent.addClass($trigger.attr("data-callout-classes")),
                $trigger.attr("data-callout-wrap-classes") && calloutContent.addClass($trigger.attr("data-callout-wrap-classes")),
                settings.hidePointer && calloutWrap.addClass("calloutHidePointer"),
                (!calloutDefaultWidth || $trigger.data("callout-updated")) && (isInputField && calloutContent.css({
                    "max-width": "none"
                }),
                calloutDefaultWidth = resetDefaultWidth(),
                calloutWrap.add(calloutContent).removeAttr("style"),
                $trigger.removeData("callout-updated")),
                calloutWrap.addClass("active"),
                isInputField && calloutWrap.addClass("calloutTypeInput"),
                settings.type === "cursor" && (calloutWrap.addClass("calloutTypeCursor"),
                calloutContent.css({
                    width: Math.min(parseInt(calloutDefaultWidth, 10), $window.outerWidth(!1) - windowPadding * 2)
                })),
                positionCallout(),
                $trigger.closest("#modal").length > 0) {
                    $("#modal").on("recentered", function() {
                        positionCallout();
                        adjustCalloutInModal()
                    });
                    adjustCalloutInModal();
                    $("#modal").on("scroll.callout", function() {
                        calloutWrap.css({
                            "margin-top": -$(this).scrollTop()
                        })
                    })
                }
                if ($trigger.addClass("hover active").attr("aria-expanded", !0),
                handleTabPress(),
                settings.onAfterOpen !== !1)
                    settings.onAfterOpen($trigger);
                settings.disableAutofocusOnOpen !== !0 && (settings.type !== "hover" && getTabbableElements(calloutContent).length ? calloutContent.find(":focus").length || focusOnCallout() : calloutContent.attr("role", "alert"));
                $window.on((isTouchDevice ? "orientationchange" : "resize") + ".callout", function() {
                    calloutWrap.hasClass("active") && !calloutWrap.hasClass("calloutStyleGuidance") && hideCallout(!1)
                });
                if (scrollable) {
                    $scrollableContainer = $trigger.closest(".calloutScrollPane");
                    $scrollableContainer.on("scroll.callout", debounce(function() {
                        stillInView($trigger, $scrollableContainer) ? positionCallout() : hideCallout()
                    }, settings.debounceTime))
                }
            }
            function adjustCalloutInModal() {
                modalScrollPos = $("#modal").scrollTop();
                calloutWrap.css({
                    "margin-top": -modalScrollPos,
                    top: "+=" + modalScrollPos,
                    "z-index": 1010
                })
            }
            function destroyCallout() {
                resetShowTimer();
                $trigger.hasClass("active") && hideCallout(!0);
                !$(".calloutTrigger.active").length && $("#callout.active").length && $("#calloutContent:empty").length && resetCalloutContent();
                $trigger.off(".callout").removeClass("calloutTrigger iconAfter iconArrowSmallDownAfter").removeData("callout-content").removeAttr("aria-expanded")
            }
            function showDelay() {
                showDelayTimer = setTimeout(function() {
                    $(".calloutTrigger.active").not($trigger).length && hideCallout(!0);
                    !$trigger.hasClass("hover") || $trigger.hasClass("active") || calloutWrap.hasClass("active") || (resetHideTimer(),
                    showCallout())
                }, Math.max(100, settings.showDelay))
            }
            function stillInView($element, $container) {
                var elementHeight = $element.outerHeight(!1)
                  , elementWidth = $element.outerWidth(!1)
                  , elementOffset = $element.offset()
                  , containerHeight = $container.outerHeight(!1)
                  , containerWidth = $container.outerWidth(!1)
                  , containerOffset = $container.offset()
                  , notAbove = elementOffset.top + elementHeight >= containerOffset.top
                  , notBelow = elementOffset.top + elementHeight <= containerOffset.top + containerHeight
                  , notLeft = elementOffset.left >= containerOffset.left
                  , notRight = elementOffset.left + elementWidth <= containerOffset.left + containerWidth;
                return notAbove && notBelow && notLeft && notRight
            }
            function addEvents() {
                var preventClick = !0;
                if (isInputField)
                    $trigger.on(($trigger.is("select") ? "mouseenter.callout " : "") + "focus.callout open.callout", function() {
                        showCallout()
                    }).on("blur.callout close.callout", function() {
                        hideCallout(!0)
                    }).on("click.callout", function(e) {
                        e.stopPropagation()
                    });
                else if (settings.type === "custom")
                    $trigger.on("open.callout", function() {
                        showCallout()
                    }).on("close.callout", function() {
                        hideCallout(!0)
                    });
                else if (settings.type === "hover" || settings.type === "cursor") {
                    $trigger.on("mouseenter.callout open.callout", function() {
                        $trigger.addClass("hover");
                        showDelay();
                        preventClick = !0;
                        setTimeout(function() {
                            preventClick = !1
                        }, 600)
                    }).on("mouseleave.callout", function() {
                        $trigger.removeClass("hover");
                        hideDelay()
                    }).on("close.callout", function() {
                        hideCallout(!0)
                    });
                    if (isTouchDevice)
                        $trigger.on("click.callout", function() {
                            if (preventClick)
                                return !1
                        })
                } else
                    $trigger.on("click.callout", function(e) {
                        $trigger.hasClass("active") ? (hideCallout(!0),
                        settings.allowClick && (preventClick = !1)) : (calloutWrap.hasClass("active") && hideCallout(!0),
                        showCallout());
                        preventClick && (e.stopImmediatePropagation(),
                        $trigger.is("a") && e.preventDefault());
                        preventClick = !0
                    }).on("open.callout", function() {
                        $trigger.hasClass("active") || (calloutWrap.hasClass("active") && hideCallout(!0),
                        showCallout())
                    }).on("close.callout", function() {
                        hideCallout(!0)
                    });
                $trigger.on("destroy.callout", function() {
                    destroyCallout()
                }).on("focusCallout.callout", function() {
                    focusOnCallout()
                }).on("updateContent.callout", function() {
                    calloutDefaultWidth = resetDefaultWidth();
                    positionCallout()
                }).on("updateCalloutSettings.callout", function(e, newTrigger, position, align) {
                    $trigger = $(newTrigger);
                    settings.position = position || "bottom";
                    settings.align = align || "center";
                    calloutDefaultWidth = resetDefaultWidth();
                    positionCallout();
                    $trigger.removeClass("hover active")
                }).on("position.callout", function() {
                    positionCallout()
                })
            }

            function initCallout() {
                if (settings.style === "guidance" ? ($('<div id="calloutGuidance" class="callout"><div id="calloutGuidanceContent" class="calloutContent" tabindex="0"><\/div><div id="calloutGuidancePointer" class="calloutPointer"><div id="calloutPointerShadow" class="calloutPointerShadow"><\/div><\/div><\/div>').appendTo("body"),
                calloutWrap = $("#calloutGuidance"),
                calloutContent = $("#calloutGuidanceContent"),
                calloutPointer = $("#calloutGuidancePointer")) : ($("#callout").length || $('<div id="callout" class="callout"><div id="calloutContent" class="calloutContent" tabindex="-1"><\/div><div id="calloutPointer" class="calloutPointer"><div id="calloutPointerShadow" class="calloutPointerShadow"><\/div><\/div><\/div>').appendTo("body"),
                calloutWrap = $("#callout"),
                calloutContent = $("#calloutContent"),
                calloutPointer = $("#calloutPointer")),
                calloutMinWidth = Math.max(240, parseInt(calloutWrap.css("min-width"), 10)),
                settings.content)
                    try {
                        $(settings.content).closest("body").length ? ($trigger.data("callout-content", $(settings.content)),
                        $trigger.data("callout-content").addClass("calloutDomContent")) : (settings.keepContentInPlace = !1,
                        $trigger.data("callout-content", settings.content))
                    } catch (e) {
                        settings.content = "<div>" + settings.content + "<\/div>";
                        settings.keepContentInPlace = !1;
                        $trigger.data("callout-content", settings.content)
                    }
                else
                    $trigger.attr("data-callout") ? (settings.keepContentInPlace = !1,
                    $trigger.data("callout-content", $trigger.attr("data-callout"))) : $trigger.attr("title") ? (settings.keepContentInPlace = !1,
                    $trigger.data("callout-content", $trigger.attr("title"))) : $trigger.data("callout-content", "&nbsp;");
                $trigger.off(".callout").addClass("calloutTrigger").attr("aria-expanded", !1).not(".calloutTooltip").not(".iconLeaf, .iconShakyLeaf, .iconBars, input, select, textarea, .calloutTriggerNoArrow").addClass("iconAfter iconArrowSmallDownAfter").not(".ancBtn").not(".photo").not(":empty").filter(function() {
                    var $e = $(this)
                      , $c = $e.children()
                      , $l = $c.length
                      , $f = $c.first();
                    return $l ? !($l === 1 && $f.is("span") && $.trim($e.text()) === $.trim($f.text())) : $.trim($e.text())
                }).wrapInner("<span>");
                $trigger.is("input, select, textarea") && (isInputField = !0,
                settings.style = "dark",
                settings.hidePointer = !0,
                settings.position = "bottom");
                $trigger.hasClass("calloutStyleDark") ? settings.style = "dark" : $trigger.hasClass("calloutStyleAlt") && (settings.style = "alt");
                $trigger.hasClass("calloutTypeHover") ? settings.type = "hover" : $trigger.hasClass("calloutTypeCursor") ? settings.type = "cursor" : $trigger.hasClass("calloutTypeCustom") && (settings.type = "custom");
                $trigger.hasClass("calloutPositionTop") ? settings.position = "top" : $trigger.hasClass("calloutPositionRight") ? settings.position = "right" : $trigger.hasClass("calloutPositionLeft") && (settings.position = "left");
                $trigger.hasClass("calloutAlignLeft") ? settings.align = "left" : $trigger.hasClass("calloutAlignRight") ? settings.align = "right" : $trigger.hasClass("calloutAlignTop") ? settings.align = "top" : $trigger.hasClass("calloutAlignBottom") && (settings.align = "bottom");
                $trigger.hasClass("calloutHidePointer") && (settings.hidePointer = !0);
                $trigger.closest(".calloutScrollPane").length && (scrollable = !0);
                $trigger.hasClass("calloutTooltip") && $trigger.addClass("link iconAfter iconHelpAfter").not(":has(span)").not(":empty").wrapInner("<span>");
                addEvents()
            }
            var $trigger = $(this), $window = $(window), isInputField, hideDelayTimer, calloutWrap, calloutContent, calloutPointer, calloutDefaultWidth, calloutMinWidth, modalHeight = !1, modalScrollPos = 0, windowPadding = 8, calloutTouches = {}, settings = $.extend({}, defaults, options);
            switch (options) {
            case "destroy":
                $trigger.triggerHandler("destroy.callout");
                break;
            case "open":
                $trigger.triggerHandler("open.callout");
                break;
            case "close":
                $trigger.triggerHandler("close.callout");
                break;
            case "focus":
                $trigger.triggerHandler("focusCallout.callout");
                break;
            default:
                initCallout()
            }
        })
    };

    $.callout = {
        close: function() {
            var $trigger = $(".calloutTrigger.active");
            $trigger.length && $trigger.triggerHandler("close.callout")
        },
        
        content: function($trigger, newContent) {
            $trigger.data("callout-content", newContent).data("callout-updated", !0);
            $trigger.hasClass("active") && $("#calloutContent").html(newContent);
            $trigger.triggerHandler("updateContent.callout")
        },

        updateCalloutSettings: function($trigger, $newTrigger, newContent, position, align) {
            newContent && ($trigger.data("callout-content", newContent).data("callout-updated", !0),
            $("#calloutGuidanceContent").html(newContent));
            $trigger.triggerHandler("updateCalloutSettings.callout", [$newTrigger, position, align])
        },

        positionCallout: function($trigger) {
            $trigger.triggerHandler("position.callout")
        },
        version: version
    };

    doubleIncluded || $(function() {
        $('[data-callout]:not([data-auto-instantiate="off"])').callout()
    })
})(jQuery)
