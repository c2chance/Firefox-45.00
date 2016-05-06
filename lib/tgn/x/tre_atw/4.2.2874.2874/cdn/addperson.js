var AddPerson = function($) {
    var $$ = window.jQuery.noConflict(), _addPerson, loadCacheFiles;
    return typeof window.$ == "undefined" && (window.$ = $$),
    _addPerson = {
        cacheLoaded: !1,
        apmDefCallback: function(cbResponse) {
            return window.isCancelClicked && cbResponse.mode === "m" ? ($.modal.close(),
            !1) : cbResponse.action === "submit" ? !0 : (cbResponse.status === "success" && (cbResponse.mode === "m" && $.modal.close(),
            location.reload()),
            !0)
        },
        apsCallback: function(cbResponse) {
            var cont = typeof AddPerson.apmCallback == "function" ? AddPerson.apmCallback(cbResponse) : AddPerson.apmDefCallback(cbResponse), $alertDiv;
            if (cont === !0) {
                if (!window.isCancelClicked && cbResponse.status != null  && cbResponse.status === "failure" && cbResponse.mode === "p")
                    try {
                        $alertDiv = $("#alertDiv");
                        $alertDiv.length > 0 && ($("#alertContent").html(cbResponse.message),
                        $alertDiv.alert("open"))
                    } catch (ex) {
                        window.console && console.log(ex);
                        alert(cbResponse.message)
                    }
            } else
                return cont
        },
        Add: function(tid, pid, args, onCloseCallback) {
            typeof closeCallouts == "function" && window.closeCallouts();
            AddPerson.Modal(tid, pid, args, onCloseCallback, "add")
        },
        Edit: function(tid, pid, args, onCloseCallback) {
            typeof closeCallouts == "function" && window.closeCallouts();
            typeof args == "string" ? args = JSON.parse(args) : typeof args == "undefined" && (args = {});
            typeof args == "object" && (args.otid == null  && (args.otid = tid),
            args.opid == null  && (args.opid = pid));
            AddPerson.Modal(tid, pid, args, onCloseCallback, "edit")
        },
        AddFromInfo: function(tid, type, infoMin, apmCallback, isPage) {
            var url = "http://" + window.addPersonDomain + "/modals/addPerson/tree/" + tid + "/type/" + type + "/info"
              , data = {
                useNewVersion: "5",
                info: JSON.stringify($trees.util.decodeHTML(infoMin)),
                isPageVersion: isPage
            };
            AddPerson.DoAddFromInfo(url, data, apmCallback)
        },
        AddFromArgs: function(tid, pid, args, apmCallback) {
            var params = {}, url;
            typeof args == "object" ? params = args : typeof args == "string" && (params = JSON.parse(args));
            params.useNewVersion = "5";
            url = "http://" + window.addPersonDomain + "/modals/addPerson/tree/" + tid + "/person/" + pid;
            AddPerson.DoAddFromInfo(url, params, apmCallback)
        },
        DoAddFromInfo: function(url, params, apmCallback) {
            $.ajax({
                url: url,
                cache: !1,
                timeout: 15e3,
                type: "GET",
                data: params,
                dataType: "jsonp",
                contentType: "application/json",
                success: function(response) {
                    if (response.hasexception) {
                        var html = '<div class="ancGrid ancGridPadded"><div class="ancCol w100"><p class="icon iconWarning">' + AddPersonText.addPersonError + "<\/p><\/div><\/div>";
                        $(".apsModalContent").html(html)
                    } else
                        $.when(loadCacheFiles(response)).done(function() {
                            if (AddPerson.cacheLoaded = !0,
                            $(".apsModalContent").html(response.html),
                            typeof apmCallback != "undefined" && (AddPerson.apmCallback = apmCallback),
                            typeof AddPersonModalInit == "function") {
                                var args = {
                                    rel: "",
                                    gender: params.Gender,
                                    history: null ,
                                    isTransition: !1
                                };
                                window.AddPersonModalInit(tid, null , args.history, AddPerson.apsCallback, params.isPageVersion ? "p" : "m")
                            }
                        }).fail(function(file) {
                            $(".apsModalContent").html(response.html);
                            window && window.console && console.error("AddPerson: Unable to load" + file + ".")
                        })
                },
                error: function() {
                    var html = '<div class="ancGrid ancGridPadded"><div class="ancCol w100"><p class="icon iconWarning">' + AddPersonText.addPersonError + "<\/p><\/div><\/div>";
                    $(".").html(html)
                }
            })
        },
        Modal: function(tid, pid, args, apmCallback, type) {
            var params;
            tid.length === 0 && (tid = 0);
            pid.length === 0 && (pid = 0);
            var url = "http://" + addPersonDomain + "/modals/addPerson/tree/" + tid + "/person/" + pid
              , title = AddPersonText.addNewPersonTitle
              , editMode = type === "edit";
            editMode && (url += "/edit",
            title = AddPersonText.quickEditModalTitle);
            params = {};
            typeof args == "object" ? params = args : typeof args == "string" && (params = JSON.parse(args));
            params.useNewVersion = "5";
            $('<div id="AddPersonModal"><\/div>').modal({
                showLoading: !0,
                hideCloseBtn: !1,
                useCustomPadding: !0,
                closeOnBkgClick: !0,
                closeOnEscape: !0,
                isMarketing: !0,
                title: title,
                onOpen: function($this) {
                    $.ajax({
                        url: url,
                        xhrFields: {
                            withCredentials: !0
                        },
                        crossDomain: !0,
                        cache: !1,
                        timeout: 15e3,
                        type: "GET",
                        data: params,
                        dataType: "jsonp",
                        contentType: "application/json",
                        success: function(response) {
                            if (response.hasexception) {
                                var html = '<div class="ancGrid ancGridPadded"><div class="ancCol w100"><p class="icon iconWarning">' + AddPersonText.addPersonError + "<\/p><\/div><\/div>";
                                typeof $.modal != "undefined" && $.modal.showLoading(!1);
                                $this.html(html);
                                $.modal.center()
                            } else
                                $.when(loadCacheFiles(response)).done(function() {
                                    if (AddPerson.cacheLoaded = !0,
                                    $.modal.resize(800),
                                    response.name) {
                                        $.modal.title("");
                                        var profileHtml = response.imageUrl ? '<div class="userCardImg"><img alt="' + response.title + '" src="' + response.imageUrl + '" style="vertical-align:middle;"><\/div>' : '<div class="userCardImg userCardImgSquare icon icon' + response.gender + '" role="presentation"><\/div>'
                                          , dateRangeHtml = response.dateRange ? '&nbsp;<p class="userCardSubTitle" style="font-weight:normal; font-size:16px;">' + response.dateRange + "<\/p>" : ""
                                          , modalHeaderStyle = editMode ? ' style="margin:0;"' : "";
                                        $this.html('<div class="modalHeader modalHeaderUserCard" id="addPersonModalHeader"' + modalHeaderStyle + '><div class="ancGrid full480"><div class="ancCol"><h4 class="modalTitle" style="line-height:30px;">' + response.title + '<\/h4><\/div><div class="ancCol ancColUserCard hide480"><div class="userCard userCardSize3" style="margin:4px 0 5px;">' + profileHtml + '<div class="userCardContent"><h6 class="userCardTitle">' + response.name + "<\/h6>" + dateRangeHtml + "<\/div><\/div><\/div><\/div><\/div>");
                                        $this.append(response.html);
                                        typeof $.modal != "undefined" && $.modal.showLoading(!1)
                                    } else
                                        $.modal.title(response.title),
                                        $this.html(response.html),
                                        typeof $.modal != "undefined" && $.modal.showLoading(!1);
                                    AddPerson.apmCallback = typeof apmCallback != "undefined" ? apmCallback : null ;
                                    typeof AddPersonModalInit == "function" && window.AddPersonModalInit(tid, pid, params.history, AddPerson.apsCallback, "m")
                                }).fail(function(file) {
                                    $this.html(response.html);
                                    window && window.console && console.error("AddPerson: Unable to load" + file + ".")
                                })
                        },
                        error: function() {
                            if (typeof $.modal != "undefined") {
                                var html = '<div class="ancGrid ancGridPadded"><div class="ancCol w100"><p class="icon iconWarning">' + AddPersonText.addPersonError + "<\/p><\/div><\/div>";
                                $.modal.showLoading(!1);
                                $this.html(html);
                                $.modal.center()
                            }
                        }
                    })
                },
                onClose: function() {
                    typeof apmCloseTypeAhead == "function" && window.apmCloseTypeAhead();
                    $(".addFamModalTriggered").removeClass("addFamModalTriggered").focus()
                }
            })
        }
    },
    loadCacheFiles = function(response) {
        var filesToLoad = []
          , deferred = $.Deferred();
        return AddPerson.cacheLoaded ? deferred.resolve(!0) : ($(".add-person-css").remove(),
        $.each(response.css, function(i, css) {
            $("head").append('<link class="add-person-css" rel="stylesheet" href="' + css + '" type="text/css" />')
        }),
        $.each(response.js, function(i, js) {
            var def = new $.Deferred;
            $.ajax({
                dataType: "script",
                cache: !0,
                url: js,
                crossDomain: !0,
                success: function() {
                    def.resolve(!0)
                },
                failure: function() {
                    deferred.reject(js)
                }
            });
            filesToLoad.push(def)
        }),
        $.when.apply($, filesToLoad).done(function() {
            deferred.resolve(!0)
        })),
        deferred
    }
    ,
    _addPerson
}(jQuery)
