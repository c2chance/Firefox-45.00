$trees.BreadcrumbObject = function(breadcrumbInfo, colorPref) {
    this.init(breadcrumbInfo, colorPref)
};

$trees.BreadcrumbObject.prototype = {
    breadcrumbList: null ,
    overflowEl: null ,
    resizeSet: !1,
    colorPreference: null ,
    init: function(breadcrumbInfo, colorPref) {
        if (this.overflowEl = $("#bcoverflowList"),
        this.breadcrumbList = $.parseJSON(breadcrumbInfo),
        this.colorPreference = colorPref,
        this.breadcrumbList != null  && !(this.breadcrumbList.length <= 1)) {
            $(window).on("resize", this, this.renderOnResize);
            this.render(!1)
        }
    },
    renderOnResize: function(e) {
        var brdcrmbs = e.data;
        brdcrmbs.resizeSet ? brdcrmbs.render(!0) : brdcrmbs.resizeSet || (brdcrmbs.resizeSet = !0)
    },
    render: function(onResize) {
        var $ovPopup, $bcParent;
        this.resizeSet = !1;
        $ovPopup = $("#bcoverflowList").hide();
        $bcParent = $("#bclist");
        $bcParent.children().each(function() {
            this.id != "bcoverflow" && $(this).remove()
        });
        var $ovParent = $("#bcovlist").empty()
          , bcWidth = 162
          , $bcRegion = $("#brdCrmbs");
        $bcRegion.length && onResize && $bcRegion.width() + $bcRegion.offset().left > $(window).width() && ($bcRegion = !1);
        var totalWidth = ($bcRegion.length ? $bcRegion.width() : $(window).width()) - 80, bcLeft = $bcRegion.length ? $bcRegion.offset().left : 50, $ovIndicator = $("#bcoverflow").removeClass("overflowActive").hide(), $html, $contentDiv, addToOverflowCount = -1, $firstChild = null , lastPosition = 0, listLength = this.breadcrumbList.length, $overflowList = $("<ul>"), colorPref = this.colorPreference;
        $.each(onResize ? this.breadcrumbList : this.breadcrumbList.reverse(), function(index) {
            var isFocus = index == 0 ? !0 : !1, genClass = this.g == "F" ? "Female" : this.g == "M" ? "Male" : "Person", $focusNode, focusNodeRight;
            $html = isFocus ? $('<div class="userCard userCardSize3" id="bcFocus"><div class="userCardImg userCardImgSquare icon icon' + genClass + '"><\/div><div class="userCardContent"><div class="userCardComment">' + this.n + "<\/div><\/div><\/div>") : $('<a class="userCard userCardSize3" href="javascript:try{$trees.treeMap.changeFocusPerson(' + this.p + ');}catch(e){}"><div class="userCardImg userCardImgSquare icon icon' + genClass + '"><\/div><div class="userCardContent"><div class="userCardComment' + colorPref + ' link">' + this.n + "<\/div><\/div><\/a>");
            $contentDiv = $("<li>").html($html);
            isFocus && $contentDiv.addClass("focus");
            $focusNode = $("#bcFocus");
            focusNodeRight = 0;
            $focusNode.length && (focusNodeRight = $focusNode.width() + $focusNode.offset().left,
            (focusNodeRight == lastPosition || focusNodeRight > bcLeft + totalWidth) && (focusNodeRight = index * bcWidth),
            lastPosition = $focusNode.width() + $focusNode.offset().left);
            addToOverflowCount == -1 && Math.floor((totalWidth - focusNodeRight) / bcWidth) <= 0 && (addToOverflowCount = 0);
            addToOverflowCount == -1 ? isFocus ? $bcParent.append($contentDiv) : $contentDiv.insertBefore($firstChild) : (addToOverflowCount == 0 && ($ovIndicator.css("display", "").addClass("overflowActive"),
            $firstChild.addClass("firstitem")),
            $overflowList.append($contentDiv));
            $firstChild = $contentDiv;
            addToOverflowCount >= 0 && ++addToOverflowCount
        });
        $ovIndicator.callout({
            content: $overflowList,
            calloutClasses: "breadcrumbCallout",
            classes: "calloutMenu",
            position: "top",
            onAfterOpen: function() {
                var calloutReposition = $(".tvFamily").css("padding-bottom");
                $(".callout").css({
                    "-webkit-transform": "translateY(" + calloutReposition + ")",
                    "-ms-transform": "translateY(" + calloutReposition + ")",
                    transform: "translateY(" + calloutReposition + ")"
                })
            }
        })
    },
    toggleOverflow: function() {},
    showOverflow: function() {},
    hideOverflow: function() {}
};
$trees.breadcrumbCreate = function(breadcrumbInfo, colorPref) {
    "undefined" == typeof $trees.breadcrumb && ($trees.breadcrumb = new $trees.BreadcrumbObject(breadcrumbInfo,colorPref))
}
