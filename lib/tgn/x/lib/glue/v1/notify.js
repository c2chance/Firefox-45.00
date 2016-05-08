(function ($, bus, undefined) {
    "use strict";
    function doNotify() {
        notifyOptions.enableIpns && $.ajax({
            type: "GET",
            url: notifyOptions.ipnsUrl,
            cache: !1,
            dataType: "jsonp",
            success: function (notifications) {
                var displayGrowl, noteX, notification;
                notifications && notifications.length > 0 && (displayGrowl = !0,
                typeof notifyOptions.handler == "function" && (displayGrowl = notifyOptions.handler(notifications)),
                displayGrowl && renderTemplates(notifications, function (notifications) {
                    for (noteX in notifications)
                        notifications.hasOwnProperty(noteX) && (notification = notifications[noteX],
                        bus.emit("Interpage::Notify::" + notification.type, notification.message, notification.title, notification.noIcon))
                }))
            }
        })
    }

    function renderTemplates(notifications, callback) {
        if (callback !== undefined) {
            var promises = [];
            $.each(notifications, function (index, notification) {
                if (notification && notification.data && notification.data.useTemplate && notifyOptions.cmsUrlBase) {
                    var deferred = $.Deferred();
                    $.ajax({
                        type: "GET",
                        url: notifyOptions.cmsUrlBase + "/cs/spots2/" + getTemplateKey(notification),
                        dataType: "jsonp",
                        success: function (result) {
                            var template = "";
                            result && result[0] && result[0].Views && result[0].Views[0] ? (template = result[0].Views[0].Content,
                            replacePubUrls(notification.data).done(function () {
                                notification.title = "";
                                notification.message = replaceTokens(template, notification.data);
                                deferred.resolve()
                            })) : deferred.reject()
                        },
                        error: function () { }
                    });
                    promises.push(deferred.promise())
                }
            });
            $.when.apply(undefined, promises).done(function () {
                callback(notifications)
            }).fail(function () {
                console.log("renderTemplates finished with errors");
                callback(notifications)
            })
        }
    }
    function getTemplateKey(notification) {
        return notification && notification.data ? "GT" + notification.type + notification.action.replace(":", "") : ""
    }
    function replacePubUrls(data, scopeKey) {
        var deferred = $.Deferred()
          , promises = [];
        return typeof ancestry != "undefined" && typeof ancestry.pub != "undefined" ? $.each(data, function (property, propertyValue) {
            var usePub, pubDestPageName, pubDestInputs, pubDeferred, propertyName = property;
            scopeKey && scopeKey !== "" && (propertyName = scopeKey + "." + propertyName);
            typeof propertyValue == "object" && (usePub = propertyValue.usePub,
            usePub === !0 && (pubDestPageName = propertyValue.pubDestPageName,
            pubDestInputs = propertyValue.pubDestInputs,
            pubDestPageName !== undefined && pubDestInputs !== undefined && (pubDeferred = $.Deferred(),
            ancestry.pub.buildUrl().toGoTo(pubDestPageName, pubDestInputs).withoutHistory().build(function (error, url) {
                error || (propertyValue.url = url);
                deferred.resolve()
            }),
            promises.push(pubDeferred.promise()))),
            promises.push(replacePubUrls(propertyValue, propertyName)))
        }) : console.log("The PUB library was not found. PUB is a dependency of notify, please include it on the page!"),
        $.when.apply(undefined, promises).done(function () {
            deferred.resolve()
        }),
        deferred.promise()
    }
    function replaceTokens(template, data, scopeKey) {
        var property, propertyName, propertyValue;
        for (property in data)
            property && data.hasOwnProperty(property) && (propertyName = property,
            propertyValue = data[property],
            scopeKey && scopeKey !== "" && (propertyName = scopeKey + "." + propertyName),
            template = typeof propertyValue == "object" ? replaceTokens(template, propertyValue, propertyName) : template.replace(new RegExp("{{" + propertyName + "}}", "gi"), propertyValue));
        return scopeKey === undefined && (template = template.replace(new RegExp("{{", "g"), "").replace(new RegExp("}}", "g"), "")),
        template
    }
    function pollingLoop(waitTime) {
        notifyId = setTimeout(function () {
            doNotify();
            pollingLoop(waitTime)
        }, waitTime)
    }
    var notifyId = -1, notifyOptions, init = function () {
        function notifyByGrowl(msg, title, type, noIcon, delay) {
            var $notification;
            if (msg !== undefined || title !== undefined) {
                $notification = $('<div class="alert">' + msg + "<\/div>");
                title && $notification.prepend('<h4 class="alertTitle">' + title + "<\/h4>");
                switch (type) {
                    case "success":
                        $notification.addClass("alertSuccess");
                        break;
                    case "failure":
                        break;
                    default:
                        $notification.addClass("alertInfo")
                }
                noIcon && $notification.addClass("alertNoIcon");
                setTimeout(function () {
                    $notification.alert({
                        display: "notification",
                        duration: 5e3
                    })
                }, delay || 200)
            }
        }

        if (bus && !bus.listeners("*::Notify::*").length) {
            bus.on("*::Notify::Success", function (msg, title, noIcon, delay) {
                notifyByGrowl(msg, title, "success", noIcon, delay)
            });
            bus.on("*::Notify::Failure", function (msg, title, noIcon, delay) {
                notifyByGrowl(msg, title, "failure", noIcon, delay)
            });
            bus.on("*::Notify::Info", function (msg, title, noIcon, delay) {
                notifyByGrowl(msg, title, "alert", noIcon, delay)
            })
        }
    }
    ;

    window.notify = function (options) {
        var waitTime;
        if (options === undefined || options.action === undefined || options.action === "init")
            $(function () {
                notifyOptions = $.extend({}, options);
                init();
                doNotify()
            });
        else if (options.action === "startPolling")
            waitTime = options.waitTime !== undefined ? options.waitTime : 5e3,
            waitTime < 5e3 && (waitTime = 5e3),
            pollingLoop(waitTime);
        else if (options.action === "stopPolling") {
            if (notifyId !== -1) {
                clearTimeout(notifyId);
                notifyId = -1;
                return
            }
        } else
            options.action === "checkNow" && doNotify()
    }
})(jQuery, window.acom.bus)
