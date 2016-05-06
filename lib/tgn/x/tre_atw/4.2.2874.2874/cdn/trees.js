function expandCollapse() {
    for (var element, i = 0; i < expandCollapse.arguments.length; i++)
        element = $("#" + expandCollapse.arguments[i]),
        element && element.toggle()
}
function expandElement() {
    for (var element, i = 0; i < expandElement.arguments.length; i++)
        element = $("#" + expandElement.arguments[i]),
        element && element.show()
}
function collapseElement() {
    for (var element, i = 0; i < collapseElement.arguments.length; i++)
        element = $("#" + collapseElement.arguments[i]),
        element && element.hide()
}
function addClass(elId, className) {
    var elIdItem = $("#" + elId);
    elIdItem && elIdItem.addClass(className)
}
function removeClass(elId, className) {
    var elIdItem = $("#" + elId);
    elIdItem && elIdItem.removeClass(className)
}
function showHover() {
    var treeMenu = null , printPubMenu = null , moreOptMenu = null , element;
    showHover.arguments[0] == "moreOptMenu" ? (treeMenu = $("#treeMenu"),
    treeMenu && treeMenu.hide(),
    printPubMenu = $("#printPubMenu"),
    printPubMenu && printPubMenu.hide()) : showHover.arguments[0] == "treeMenu" ? (moreOptMenu = $("#moreOptMenu"),
    moreOptMenu && moreOptMenu.hide(),
    printPubMenu = $("#printPubMenu"),
    printPubMenu && printPubMenu.hide()) : showHover.arguments[0] == "printPubMenu" && (treeMenu = $("#treeMenu"),
    treeMenu && treeMenu.hide(),
    moreOptMenu = $("#moreOptMenu"),
    moreOptMenu && moreOptMenu.hide());
    oldDiv != "undefined" && oldDiv && closeHover(oldDiv);
    currentDiv = showHover.arguments[0];
    oldDiv = currentDiv;
    element = $("#" + currentDiv);
    ToShow = setTimeout(function() {
        element && element.show()
    }, 500)
}
function closeHover() {
    var element = $("#" + closeHover.arguments[0]);
    element && element.hide();
    hoverTimeoutClear()
}
function onHoverInit() {
    hoverTimeoutClear()
}
function hoverTimeout() {
    hoverTimeoutClear();
    currentDiv = hoverTimeout.arguments[0];
    currentDiv != "undefined" && currentDiv != null  && (ToClear = setTimeout("closeHover('" + currentDiv + "')", 250, "JAVASCRIPT"))
}
function hoverTimeoutClear() {
    ToShow != -1 && (window.clearTimeout(ToShow),
    ToShow = 0);
    ToClear != -1 && (window.clearTimeout(ToClear),
    ToClear = 0)
}
function swapClass(row, oldClass) {
    $("#" + row).css("class", oldClass);
    oldClass == "tblrowOver" ? $("#" + row + "control").css("class", "resultsInfo") : $("#" + row + "control").css("class", "resultsHidden")
}
function guidelines() {
    window.open("http://" + v_communityPartner + "/guidelines.aspx", "", "toolbar=no,scrollbars=1,resizable=1,menubar=no,location=no,height=425,width=575")
}
function onclickBrowse(windowname, wwidth) {
    onclickOpenBrowseWindow(windowname, wwidth)
}
function onclickOpenBrowseWindow(windowname, wwidth) {
    windowname || (windowname = "_blank");
    wwidth || (wwidth = "800");
    var wparams = "toolbar=no,resizable=yes,scrollbars=yes,menubar=no,status=no,location=no,height=550,width=";
    wparams = wwidth != "" ? wparams + wwidth : wparams + "800";
    v_browseURL != "" && window.open(v_browseURL, windowname, wparams, !0)
}
var ToClear, ToShow, currentDiv, oldDiv
