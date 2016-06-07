var $genTreesModal = {
    Modal: $("#modalDLG"),
    Params: null ,
    spinnerCnt: "<div class='loading' style='margin:50px;'><\/div>",
    TitleName: "",
    
    init: function(id, width, title, datatitlename, modalEvents) {
        $genTreesModal.TitleName = datatitlename;
        $("<div data-title='' id='" + id + "'><div id='" + id + "Content'>" + $genTreesModal.spinnerCnt + "<\/div><\/div>").modal({
            hideCloseBtn: !1,
            closeOnBkgClick: !0,
            closeOnEscape: !0,
            isMarketing: !1,
            showLoading: !1,
            width: width,
            title: "",
            onOpen: modalEvents && modalEvents.onOpen ? modalEvents.onOpen : function() {}
            ,
            onClose: modalEvents && modalEvents.onClose ? modalEvents.onClose : function() {}
        })
    },

    create: function(id, url, htmlSrc, callback) {
        if (url != null  && url == "0" && htmlSrc != null  && htmlSrc.length > 0)
            return $genTreesModal.getView(id, htmlSrc),
            $("#modalHeader").hide(),
            callback != null  && callback(),
            $.modal.center(),
            !0;
        if (htmlSrc != null  && htmlSrc.length > 0) {
            var htmlSrcGet = $("#" + htmlSrc);
            htmlSrcGet && ($genTreesModal.getView(id, htmlSrcGet.html()),
            $("#modalHeader").hide(),
            callback != null  && callback(),
            $.modal.center())
        } else
            $.ajax({
                url: url,
                cache: !1,
                timeout: 2e4,
                type: "GET",
                data: {
                    params: $genTreesModal.Params
                },
                success: function(data) {
                    var result, modalCont, modalTitle, titleVal;
                    typeof data.hasexception != "undefined" && data.hasexception != null  && data.hasexception && $genTreesModal.throwException(id, "view has thrown an exception!");
                    $("#modalHeader").hide();
                    result = data.html != null  && data.html.length > 0 ? data.html : typeof data[0] != "undefined" && data[0].length > 1 ? data[0] : data;
                    $genTreesModal.getView(id, result);
                    modalCont = $("#modal");
                    modalCont.length > 0 && modalCont.show();
                    $.modal.center();
                    modalTitle = $("#modalTitle");
                    modalTitle.length > 0 && $genTreesModal.TitleName.length > 0 && (titleVal = modalTitle.data($genTreesModal.TitleName),
                    $("#modalHeader").text(titleVal),
                    $("#modalHeader").show(),
                    $.modal.title(titleVal));
                    callback != null  && callback();
                    $.modal.center()
                },
                error: function(xhr, ajaxOptions, thrownError) {
                    $genTreesModal.throwException(id, "source->" + id + " status->" + xhr.status + " thrownError->" + thrownError)
                }
            })
    },

    getView: function(id, html) {
        if (html == null  || html.responseText == "fail")
            $genTreesModal.throwException(id, html);
        else if (html != null  && html.length > 0) {
            var $callouts = $("#" + id + "Content").html(html).find("[data-callout]");
            typeof $callouts.callout != "undefined" && $callouts.length > 0 && $callouts.callout()
        }
    },

    throwException: function(id, msg) {
        window.console != null  && console.error(msg);
        $.ajax({
            url: "/pt/Down.aspx?noHeaderFooter=1",
            cache: !1,
            timeout: 2e4,
            type: "GET",
            data: {},
            success: function(data) {
                var modalcontent = document.getElementById(id);
                modalcontent.innerHTML = data
            }
        })
    }
}
