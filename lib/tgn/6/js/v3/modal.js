(function($) {
    "use strict";
    var Modal, version = 3, isIe8 = $("html").hasClass("ie8"), isIe9 = $("html").hasClass("ie9"), localizer, $modal = !1, $modalContents = !1, $modalCenter = !1, $modalClose = !1, doubleIncluded = !!$.modal;
    if (doubleIncluded) {
        if ($.modal.version === version) {
            window.console && console.warn("ERROR: You are including modal.js multiple times");
            return
        }
        if (window.console && console.warn("ERROR: You are including multiple versions of modal.js"),
        $.modal.version > version)
            return
    }
    localizer = {
        lang: function() {
            var langAttr = $("html").attr("lang") || $("[lang]").first().attr("lang");
            return langAttr ? langAttr.toLowerCase() : "en"
        }(),
        langSets: {
            de: {
                closeBtn: "Schlie&#223;en"
            },
            en: {
                closeBtn: "Close"
            },
            es: {
                closeBtn: "Cerrar"
            },
            fr: {
                closeBtn: "Fermer"
            },
            it: {
                closeBtn: "Chiudi"
            },
            sv: {
                closeBtn: "St&#228;ng"
            }
        },
        localize: function(key) {
            return this.langSets[this.lang] && this.langSets[this.lang][key] ? this.langSets[this.lang][key] : this.langSets[this.lang.substring(0, 2)] && this.langSets[this.lang.substring(0, 2)][key] ? this.langSets[this.lang.substring(0, 2)][key] : this.langSets.en[key] || ""
        }
    };
    Modal = {};
    Modal.defaults = {
        hideCloseBtn: !1,
        closeOnBkgClick: !0,
        closeOnEscape: !0,
        fade: 200,
        isMarketing: !1,
        showLoading: !1,
        width: "",
        title: "",
        $trigger: !1,
        onOpen: function() {
            return
        },
        onClose: function() {
            return
        }
    };
    Modal.isOpen = !1;
    Modal.isTouchDevice = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
    Modal.paddingLeftRight = 40;
    Modal.widthTransition = 410;
    Modal.openButton = !1;
    Modal.addToPage = function() {
        $modal = $('<section id="modal"><div id="modalCenter"><\/div><div id="modalContents" aria-describedby="modalHeader" tabIndex="-1"><button class="closeBtn" id="modalClose" title="' + localizer.localize("closeBtn") + '" type="button"><\/button><\/div><\/section>');
        $modal.appendTo("body");
        $modalContents = $("#modalContents");
        $modalCenter = $("#modalCenter");
        $modalClose = $("#modalClose");
        $modalClose.on("click.modal", function() {
            $("body").trigger("closeModal.modal")
        });
        $modalContents.on("click.modal", function() {
            Modal.stopClosing = !0
        })
    }
    ;
    Modal.setTitle = function(title, $currentModalContents) {
        $currentModalContents === !1 && ($currentModalContents = $modalContents.find(".modalActive"));
        $modalContents.children("#modalHeader").remove();
        title && $currentModalContents.before('<h4 id="modalHeader" class="modalHeader">' + title + "<\/h4>");
        title || $currentModalContents.find(".modalHeader").length ? $modalContents.addClass("modalHasTitle") : $modalContents.removeClass("modalHasTitle")
    }
    ;
    Modal.centerModal = function() {
        var windowHeight = $("html").height()
          , modalHeight = $modalContents.outerHeight(!1);
        $modalCenter.css({
            "margin-bottom": -modalHeight / 2 + "px"
        });
        modalHeight += parseInt($modalContents.css("margin-top"), 10) + parseInt($modalContents.css("margin-bottom"), 10);
        Modal.isTouchDevice && (modalHeight <= windowHeight ? $modal.add("body").height(windowHeight) : $modal.add("body").height(modalHeight));
        $modal.scrollTop(0);
        setTimeout(function() {
            $modal.trigger("recentered")
        }, Modal.widthTransition)
    }
    ;
    Modal.resizeModal = function(width) {
        Modal.setWidth(width);
        isIe8 ? Modal.centerModal() : setTimeout(Modal.centerModal, Modal.widthTransition)
    }
    ;
    Modal.setWidth = function(width) {
        width && String(width).indexOf("%") !== -1 ? $modalContents.css("width", width) : width ? ($(window).width() < 768 && !$modalContents.hasClass("modalCustomPadding") && (Modal.paddingLeftRight = 20),
        $modalContents.css("width", parseInt(width, 10) + Modal.paddingLeftRight)) : $modalContents.css("width", "")
    }
    ;
    Modal.showLoading = function(loading) {
        loading ? $modalContents.addClass("loading") : $modalContents.removeClass("loading")
    }
    ;
    $.fn.modal = function(options) {
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
        function tabbable(element) {
            var tabIndex = $.attr(element, "tabindex")
              , isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN)
        }
        var addEvents, closeModal, openModal, removeEvents, $this = this, settings = $.extend({}, Modal.defaults, options);
        return settings.el = this,
        settings.windowPosition = [0, 0],
        Modal.stopClosing = !1,
        Modal.isAnimating = !1,
        $this.attr("title") && ($this.attr("data-title", $this.attr("title")),
        $this.removeAttr("title")),
        !settings.title && $this.attr("data-title") && (settings.title = $this.attr("data-title")),
        settings.$trigger && settings.$trigger.attr("aria-controls", "modal"),
        addEvents = function() {
            var $body = $("body");
            $body.on("closeModal.modal", function() {
                $body.find(":focus").blur();
                $modal.animate({
                    opacity: 0
                }, settings.fade / 2, "linear", function() {
                    closeModal()
                })
            });
            $(window).on("resize.modal orientationchange.modal", function() {
                $modal.data("preventModalCenterOnResize") !== !0 && setTimeout(Modal.centerModal, 300)
            });
            if (settings.closeOnBkgClick)
                $modal.on("click.modal", function() {
                    Modal.stopClosing || Modal.isAnimating || $body.trigger("closeModal.modal");
                    Modal.stopClosing = !1
                });
            if (settings.closeOnEscape)
                $body.on("keydown.modal", function(event) {
                    if (!event.isDefaultPrevented() && event.keyCode && event.keyCode === 27)
                        return $body.find(":focus").blur(),
                        $body.trigger("closeModal.modal"),
                        event.preventDefault(),
                        !1
                })
        }
        ,
        closeModal = function(alreadyOpen) {
            alreadyOpen !== !0 && (Modal.isOpen = !1,
            $("html").removeClass("modalOpen"),
            $("body").css("padding-right", "").height(""),
            $modal.removeAttr("style"),
            $modalCenter.removeClass("modalCentered"),
            $modalContents.removeAttr("style role"),
            Modal.showLoading(!1),
            window.scrollTo(settings.windowPosition[0], settings.windowPosition[1]),
            Modal.openButton && Modal.openButton.removeAttr("aria-expanded").focus(),
            $modal.removeAttr("aria-expanded"),
            Modal.openButton = !1);
            removeEvents();
            Modal.previousSettings.el.data("dynamic") ? Modal.previousSettings.el.remove() : Modal.previousSettings.el.hide().removeClass("modalActive");
            Modal.previousSettings.onClose($this);
            return Modal.previousSettings.windowPosition
        }
        ,
        openModal = function() {
            var $modalImages, imageLength, screenWidth = $(window).width(), scrollbarWidth = 0, imageCount = 0;
            if ($modal || Modal.addToPage(),
            settings.windowPosition = Modal.isOpen ? closeModal(!0) : $(document).scrollTop() >= $("html").scrollTop() ? [$(document).scrollLeft(), $(document).scrollTop()] : [$("html").scrollLeft(), $("html").scrollTop()],
            Modal.isOpen || ($modal.attr("aria-expanded", "true"),
            settings.$trigger && (Modal.openButton = settings.$trigger.attr("aria-expanded", "true"))),
            $this === undefined || $this.length === 0)
                return window.console && console.warn("Modal contents not found. Check your selector."),
                !1;
            $("body").find($this).length > 0 ? $this.data("dynamic", !1) : $this.data("dynamic", !0);
            $this.parent() !== $modalContents && $this.appendTo($modalContents);
            $this.show().addClass("modalActive");
            $("html").addClass("modalOpen");
            $modalContents.attr("role", "alertdialog").focus().on("keydown.modal", function(e) {
                var tabbableElements = $(this).find("*").filter(function() {
                    return tabbable(this) || $(this).is(":focus")
                })
                  , focusedElement = $(this).find(":focus");
                e.keyCode === 9 && (e.shiftKey && focusedElement.get(0) === tabbableElements.first().get(0) ? (e.preventDefault(),
                tabbableElements.last().focus()) : e.shiftKey || focusedElement.get(0) !== tabbableElements.last().get(0) ? $modalContents.is(":focus") && (e.preventDefault(),
                $modalClose.focus()) : (e.preventDefault(),
                tabbableElements.first().focus()))
            });
            scrollbarWidth = $(window).width() - screenWidth;
            $("body").css("padding-right", parseInt($("body").css("padding-right"), 10) + scrollbarWidth + "px");
            Modal.isTouchDevice ? window.scrollTo(0, 0) : window.scrollTo(settings.windowPosition[0], settings.windowPosition[1]);
            Modal.setTitle(settings.title, $this);
            Modal.showLoading(settings.showLoading);
            settings.isMarketing || settings.useCustomPadding ? ($modalContents.addClass("modalCustomPadding"),
            Modal.paddingLeftRight = 0) : ($modalContents.removeClass("modalCustomPadding"),
            Modal.paddingLeftRight = 40);
            Modal.setWidth(settings.width);
            settings.hideCloseBtn ? $modalContents.addClass("modalHideClose") : $modalContents.removeClass("modalHideClose");
            addEvents();
            settings.onOpen($this);
            (!Modal.isOpen || isIe8 || isIe9) && ($modal.show(),
            Modal.centerModal());
            setTimeout(Modal.centerModal, Modal.widthTransition);
            $modalImages = $this.is("img") ? $this : $this.find("img");
            imageLength = $modalImages.length;
            imageLength > 0 && $modalImages.load(function() {
                imageCount += 1;
                imageCount === imageLength && Modal.centerModal()
            });
            Modal.isAnimating = !0;
            setTimeout(function() {
                Modal.isAnimating = !1
            }, settings.fade + 300);
            $modal.animate({
                opacity: 1
            }, settings.fade, "linear", function() {
                $modalCenter.addClass("modalCentered");
                $modalContents.animate({
                    opacity: 1
                }, settings.fade / 2, "linear")
            });
            Modal.previousSettings = settings;
            Modal.isOpen = !0
        }
        ,
        removeEvents = function() {
            $modal.add("body").add(window).off(".modal")
        }
        ,
        openModal(),
        this
    }
    ;
    $(function() {
        Modal.isTouchDevice ? $("html").addClass("touch") : $("html").addClass("noTouch")
    });
    $.modal = {};
    $.modal.center = function() {
        $modal && Modal.centerModal()
    }
    ;
    $.modal.close = function() {
        $modal && $("body").trigger("closeModal.modal")
    }
    ;
    $.modal.showLoading = function(loading) {
        $modal && Modal.showLoading(loading)
    }
    ;
    $.modal.resize = function(width) {
        $modal && Modal.resizeModal(width)
    }
    ;
    $.modal.title = function(title) {
        $modal && Modal.setTitle(title, !1)
    }
    ;
    $.modal.preventClosing = function() {
        Modal.stopClosing = !0
    }
    ;
    $.modal.version = version
})(jQuery)
