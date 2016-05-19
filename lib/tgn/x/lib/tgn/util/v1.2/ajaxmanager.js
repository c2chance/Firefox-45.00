(function($) {
    AjaxManager = function() {
        function _processResponse(response) {
            switch (response.ResponseType.Value) {
            case "Success":
                break;
            case "Redirect":
                response.RedirectUrl && (window.location = response.RedirectUrl);
                break;
            case "Error":
                return _showErrors(response.ActionErrors),
                !1;
            case "Views":
                _renderViews(response.Views);
                break;
            default:
                return !1
            }
            return !0
        }
        function _renderViews(views) {
            var i, view;
            if (views && views.length > 0) {
                for (i = 0; i < views.length; i++)
                    view = views[i],
                    _renderView(view.Content, view.InsertionMode, view.Region);
                _public.bindAjaxForms()
            }
        }
        function _renderView(content, insertionMode, region) {
            var $region = $("#" + region);
            $region.length === 0 && ($region = $("<div/>", {
                id: region
            }).hide().appendTo(document.body));
            switch (insertionMode.Value) {
            case "InsertBefore":
                $region.prepend(content);
                break;
            case "InsertAfter":
                $region.append(content);
                break;
            case "Replace":
            default:
                $region.empty().append(content)
            }
            $region.trigger($.extend($.Event(), {
                type: "regionupdated",
                target: $region
            }))
        }
        function _getAllResources(responses) {
            var result = {
                links: [],
                blocks: [],
                CombinatorUri: "combo"
            };
            return $(responses).each(function() {
                result.CombinatorUri = this.CombinatorUri;
                this.ResponseType.Value == "Views" && this.Resources && $(this.Resources).each(function() {
                    this.Src !== null  && this.Src.length > 0 ? result.links.push(this.Src) : result.blocks.push(this)
                })
            }),
            result
        }
        function _outputResourceBlocks(resourceBlocks) {
            var scriptBlock, i, resource, head, tag;
            if (resourceBlocks && resourceBlocks.length > 0) {
                for (scriptBlock = "",
                i = 0; i < resourceBlocks.length; i++)
                    resource = resourceBlocks[i],
                    resource.Type.Value === "Script" && resource.Content && (scriptBlock += resource.Content);
                scriptBlock !== "" && (head = document.getElementsByTagName("head")[0],
                tag = document.createElement("script"),
                tag.type = "text/javascript",
                tag.defer = !1,
                tag.text = scriptBlock,
                head.appendChild(tag))
            }
        }
        function _showErrors(errors) {
            var i, error;
            if (errors && errors.length > 0) {
                var newCosmeticErrors = !1
                  , newActionPreventedOrCriticalErrors = !1
                  , errorMsg = "<li><strong>{ExceptionMessage}<\/strong> - {ExceptionType}<\/li>";
                for (i = 0; i < errors.length; i++)
                    error = errors[0],
                    error.Severity.Value === "Cosmetic" ? ($("#cosmeticErrorContainer ul").empty().append($.substitute(errorMsg, error)),
                    newCosmeticErrors = !0) : (error.Severity.Value === "ActionPrevented" || error.Severity.Value === "CriticalFailure") && ($("#ErrorDialog ul").append($.substitute(errorMsg, error)),
                    newActionPreventedOrCriticalErrors = !0);
                newCosmeticErrors && $("#cosmeticErrorContainer").css({
                    display: "block"
                });
                newActionPreventedOrCriticalErrors && alert("errors")
            }
        }
        function _processLoadError(xhr, options) {
            _public.log(xhr);
            options.failure(null , xhr);
            options.after()
        }
        function _processResponses(jsonResponse, options) {
            typeof jsonResponse == "string" && (jsonResponse = $.parseJSON(jsonResponse));
            var resourceNeeds = _getAllResources(jsonResponse);
            ResourceManager.addResources(resourceNeeds.CombinatorUri, resourceNeeds.links, function(success) {
                $(jsonResponse).each(function() {
                    success = success & _processResponse(this, options)
                });
                _outputResourceBlocks(resourceNeeds.blocks);
                _responsesComplete(options, jsonResponse, success)
            })
        }
        function _responsesComplete(options, response, success) {
            success ? options.success(response) : options.failure(response);
            options.after()
        }
        var _windowHandles = {}
          , _public = {
            initForm: function(options) {
                var settings = $.extend({}, {
                    formSelector: "",
                    success: function() {},
                    failure: function() {},
                    before: function() {},
                    after: function() {},
                    error: function() {},
                    eventNamespace: null 
                }, options), $form, eventName;
                settings.formSelector && ($form = $(settings.formSelector),
                eventName = settings.eventNamespace ? "submit." + settings.eventNamespace : "submit",
                $form.bind(eventName, function() {
                    var $upload, filesSelected, iFrameId, $iFrame, $textareas;
                    if (settings.before(),
                    $upload = $form.find("input[type=file]"),
                    $upload.length > 0) {
                        if (filesSelected = $upload.filter(function() {
                            return $(this).val()
                        }).length > 0,
                        filesSelected)
                            return iFrameId = $form.attr("id") + "_async-iframe",
                            $form.attr({
                                enctype: "multipart/form-data",
                                encoding: "multipart/form-data",
                                target: iFrameId
                            }).append($("<input/>").attr({
                                type: "hidden",
                                name: "webpart-request-type",
                                value: "iframe"
                            })),
                            $(document.body).append('<iframe id="' + iFrameId + '" name="' + iFrameId + '" src="about:blank" class="am_ijaxIFrame">'),
                            $iFrame = $("#" + iFrameId).bind("load", function() {
                                var doc = undefined
                                  , iFrameElem = $iFrame[0];
                                if (doc = iFrameElem.contentDocument ? iFrameElem.contentDocument : iFrameElem.contentWindow ? iFrameElem.contentWindow.document : window.frames[iFrameId].document,
                                doc.location.href !== "about:blank")
                                    try {
                                        _processResponses(doc.webPartResponse, settings)
                                    } catch (e) {
                                        settings.failure(null , e);
                                        settings.after()
                                    }
                            }).appendTo("body"),
                            !0;
                        settings.error();
                        settings.after()
                    } else {
                        var url = $form.attr("action")
                          , method = $form.attr("method")
                          , formData = {}
                          , $inputs = $form.find("input");
                        return $inputs.each(function(i) {
                            formData[$inputs[i].name] = $inputs[i].value
                        }),
                        $textareas = $form.find("textarea"),
                        $textareas.each(function(i) {
                            formData[$textareas[i].name] = $textareas[i].value
                        }),
                        _public.send({
                            url: url,
                            data: formData,
                            method: method,
                            success: settings.success,
                            failure: settings.failure
                        }),
                        settings.after(),
                        !1
                    }
                    return !1
                }))
            },
            log: function() {},
            send: function(params) {
                var options = $.extend({
                    success: function() {},
                    failure: function() {},
                    before: function() {},
                    after: function() {},
                    cache: !1,
                    url: "",
                    method: "get",
                    dataType: "jsonp"
                }, params);
                options.data = options.data || {};
                options.data["webpart-request-type"] = "ajax";
                $.ajax({
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("webpart-request-type", "ajax");
                        options.before()
                    },
                    cache: options.cache,
                    success: function(json) {
                        _processResponses(json, options)
                    },
                    error: function(xhr) {
                        _processLoadError(xhr, options)
                    },
                    complete: function() {},
                    data: options.data,
                    dataType: options.dataType,
                    jsonpCallback: options.jsonpCallback,
                    type: options.method,
                    url: options.url
                })
            },
            getWindowHandle: function(windowName) {
                return _windowHandles[windowName]
            },
            popupWindowEvent: function(event, windowName, windowOptions) {
                event.preventDefault ? event.preventDefault() : event.returnValue = !1;
                var $element = $(event.target || event.srcElement)
                  , data = $element.data();
                return AjaxManager.popupWindow(windowName, {
                    url: $element.attr("href"),
                    data: data
                }, windowOptions),
                !1
            },
            popupWindow: function(windowName, params, windowOptions) {
                var settings, optionString;
                _windowHandles[windowName] && (_windowHandles[windowName].close(),
                delete _windowHandles[windowName]);
                settings = $.extend({
                    width: 480,
                    height: 345,
                    toolbar: !1,
                    scrollbars: !1,
                    location: !1,
                    statusbar: !1,
                    menubar: !1,
                    resizable: !0
                }, windowOptions);
                settings.left = screen.width / 2 - settings.width / 2;
                settings.top = screen.height / 2 - settings.height / 2;
                optionString = "";
                for (name in settings)
                    optionString += "," + name + "=" + Number(settings[name]);
                optionString = optionString.substring(1);
                _windowHandles[windowName] = window.open("about:blank", windowName, optionString);
                params.data = params.data || {};
                params.data.windowName = windowName;
                AjaxManager.send(params)
            },
            bindAjaxForms: function() {
                $("form[data-ajaxEnable=true]").unbind("submit.ajaxEnabled");
                $("form[data-ajaxEnable=true]").each(function() {
                    AjaxManager.initForm({
                        formSelector: this,
                        eventNamespace: "ajaxEnabled"
                    })
                })
            }
        };
        return _public
    }();
    $("body").on("click", "a[data-ajaxEnable=true]", function(event) {
        event.preventDefault();
        var $element = $(this)
          , data = $element.data();
        delete data.ajaxenable;
        AjaxManager.send({
            url: $element.attr("href"),
            data: data
        })
    });
    $(document).ready(function() {
        AjaxManager.bindAjaxForms()
    })
})(jQuery)
