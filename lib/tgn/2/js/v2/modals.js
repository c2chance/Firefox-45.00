if (typeof AcomModal == "undefined")
    var AcomModal = !1;
    
jQuery(document).ready(function($) {
    "use strict";
    var version = 2.1
      , tempExtOpenList = []
      , tempExtCloseList = [];
    (AcomModal === !1 || AcomModal && AcomModal.version < version) && (AcomModal && (tempExtOpenList = AcomModal.getExtOpenList(),
    tempExtCloseList = AcomModal.getExtCloseList()),
    AcomModal = function(newModalParamsObj) {
        function extOpen(tempId, tempFuncOrParams) {
            var funcReturn = function() {
                return !1
            }
            ;
            if (typeof tempId != "string")
                funcReturn = !1;
            else if (typeof tempFuncOrParams != "undefined")
                if (typeof tempFuncOrParams != typeof funcReturn)
                    if (funcReturn = listOfExtOpenFunc[tempId],
                    typeof funcReturn == "undefined")
                        funcReturn = !1;
                    else
                        return funcReturn(tempFuncOrParams);
                else
                    listOfExtOpenFunc[tempId] = tempFuncOrParams,
                    funcReturn = !0;
            else if (funcReturn = listOfExtOpenFunc[tempId],
            typeof funcReturn == "undefined")
                funcReturn = !1;
            else
                return funcReturn();
            return funcReturn
        }
        function extClose(tempId, tempFuncOrParams) {
            var funcReturn = function() {
                return !1
            }
            ;
            if (typeof tempId != "string")
                funcReturn = !1;
            else if (typeof tempFuncOrParams != "undefined")
                if (typeof tempFuncOrParams != typeof funcReturn)
                    if (funcReturn = listOfExtCloseFunc[tempId],
                    typeof funcReturn == "undefined")
                        funcReturn = !1;
                    else
                        return funcReturn(tempFuncOrParams);
                else
                    listOfExtCloseFunc[tempId] = tempFuncOrParams,
                    funcReturn = !0;
            else if (funcReturn = listOfExtCloseFunc[tempId],
            typeof funcReturn == "undefined")
                funcReturn = !1;
            else
                return funcReturn();
            return funcReturn
        }
        function isTouchDevice() {
            if (navigator.userAgent.match(/android 3/i) || navigator.userAgent.match(/honeycomb/i))
                return !1;
            try {
                return document.createEvent("TouchEvent"),
                !0
            } catch (e) {
                return !1
            }
        }
        function touchScroll(id) {
            if (isTouchDevice()) {
                var el = document.getElementById(id)
                  , scrollStartPosY = 0
                  , scrollStartPosX = 0;
                el.addEventListener("touchstart", function(event) {
                    scrollStartPosY = this.scrollTop + event.touches[0].pageY;
                    scrollStartPosX = this.scrollLeft + event.touches[0].pageX
                }, !1);
                el.addEventListener("touchmove", function(event) {
                    (this.scrollTop < this.scrollHeight - this.offsetHeight && this.scrollTop + event.touches[0].pageY < scrollStartPosY - 5 || this.scrollTop !== 0 && this.scrollTop + event.touches[0].pageY > scrollStartPosY + 5) && event.preventDefault();
                    (this.scrollLeft < this.scrollWidth - this.offsetWidth && this.scrollLeft + event.touches[0].pageX < scrollStartPosX - 5 || this.scrollLeft !== 0 && this.scrollLeft + event.touches[0].pageX > scrollStartPosX + 5) && event.preventDefault();
                    this.scrollTop = scrollStartPosY - event.touches[0].pageY;
                    this.scrollLeft = scrollStartPosX - event.touches[0].pageX
                }, !1)
            }
        }
        function createModal() {
            $("body").append("<!--[if IE 7]><div class='ie ie7' id='acomModal'><\/div><![endif]--><!--[if IE 8]><div class='ie ie8' id='acomModal'><\/div><![endif]--><!--[if IE 9]><div class='ie ie9' id='acomModal'><\/div><![endif]--><!--[if !IE]> --><div id='acomModal'><\/div><!-- <![endif]--><!--[if lte IE 9]><div id='acomModalShadowForIE'><\/div><![endif]-->");
            touchScroll("acomModal")
        }
        function center(tempId) {
            var mdlElm = ""
              , currH = 0
              , currW = 0;
            return typeof tempId != "undefined" && (id = tempId),
            mdlElm = $("#" + id),
            $("#acomModal").length || createModal(),
            mdlElm.parent() !== $("#acomModal") && mdlElm.appendTo("#acomModal"),
            mdlElm.css("display", "block"),
            currH = mdlElm[0].offsetHeight,
            currW = mdlElm[0].offsetWidth,
            mdlElm.css({
                position: "fixed",
                top: "50%",
                "margin-top": -currH / 2 + "px"
            }),
            window.innerHeight && window.innerHeight < currH + 20 && mdlElm.css({
                position: "absolute",
                top: "20px",
                "margin-top": "0"
            }),
            document.body && document.body.offsetHeight && document.body.offsetHeight < currH + 20 && mdlElm.css({
                position: "absolute",
                top: "20px",
                "margin-top": "0"
            }),
            document.documentElement && Number(document.documentElement.clientHeight) !== 0 && document.documentElement.clientHeight < currH + 20 && mdlElm.css({
                position: "absolute",
                top: "20px",
                "margin-top": "0"
            }),
            mdlElm.css({
                left: "50%",
                "margin-left": -currW / 2 + "px"
            }),
            id
        }
        function open(tempId) {
            var mdlElm = ""
              , currScroll = [0, 0];
            return typeof tempId != "undefined" && (id = tempId),
            mdlElm = $("#" + id),
            typeof scrollX != "undefined" ? currScroll = [window.scrollX, window.scrollY] : document.body && (currScroll = [document.body.parentNode.scrollLeft, document.body.parentNode.scrollTop]),
            $("html").addClass("acomModalOpen"),
            window.scrollTo(currScroll[0], currScroll[1]),
            $(".acomModalContent").css("display", "none"),
            $("#acomModal")[0].scrollTop = 0,
            extOpen(id),
            center(id),
            isTouchDevice() ? $(window).bind("orientationchange", function() {
                AcomModal.center()
            }) : $(window).bind("resize", function() {
                AcomModal.center()
            }),
            id
        }
        function close(tempId) {
            var currScroll = [0, 0];
            return typeof tempId != "undefined" && (id = tempId),
            extClose(id),
            typeof scrollX != "undefined" ? currScroll = [window.scrollX, window.scrollY] : document.body && (currScroll = [document.body.parentNode.scrollLeft, document.body.parentNode.scrollTop]),
            $("#acomModal")[0].scrollTop = 0,
            $("html").removeClass("acomModalOpen"),
            window.scrollTo(currScroll[0], currScroll[1]),
            $(window).unbind("resize", function() {
                AcomModal.center()
            }),
            id
        }
        function modalId(tempId) {
            return typeof tempId != "undefined" && (id = tempId),
            id
        }
        function setModalFunctions() {
            $("#acomModal").appendTo($("body"));
            $("#acomModal").click(function(e) {
                var targ;
                e || (e = window.event);
                e.target ? targ = e.target : e.srcElement && (targ = e.srcElement);
                targ.nodeType === 3 && (targ = targ.parentNode);
                targ && targ.id && targ.id === "acomModal" && AcomModal.close(AcomModal.modalId())
            });
            $("#acomModalShadowForIE").click(function() {
                AcomModal.close(AcomModal.modalId())
            })
        }
        function init() {
            return $("#acomModal").length || createModal(),
            setModalFunctions(),
            {
                open: function(tempId) {
                    return open(tempId)
                },
                close: function(tempId) {
                    return close(tempId)
                },
                center: function(tempId) {
                    return center(tempId)
                },
                modalId: function(tempId) {
                    return modalId(tempId)
                },
                extOpen: function(tempId, newFunc) {
                    return extOpen(tempId, newFunc)
                },
                extClose: function(tempId, newFunc) {
                    return extClose(tempId, newFunc)
                },
                getExtOpenList: function() {
                    return listOfExtOpenFunc
                },
                getExtCloseList: function() {
                    return listOfExtCloseFunc
                },
                version: version
            }
        }
        var id = ""
          , listOfExtOpenFunc = newModalParamsObj.initialExtOpenList
          , listOfExtCloseFunc = newModalParamsObj.initialExtCloseList
          , version = newModalParamsObj.newVersion;
        return init()
    }({
        newVersion: version,
        initialExtOpenList: tempExtOpenList,
        initialExtCloseList: tempExtCloseList
    }))
})
