"use strict";
function getTabData(tabName) {
    var data = {};
    switch (tabName) {
        case "story":
        case "tabStory":
            data.tabId = "tabStory";
            data.contentId = "tabContentStory";
            data.url = window.PersonCard.URL.story;
            data.domId = "personPageStory";
            data.key = "story";
            data.queryValue = "story";
            data.events = {};
            break;
        case "facts":
        case "tabFacts":
            data.tabId = "tabFacts";
            data.contentId = "tabContentFacts";
            data.url = window.PersonCard.URL.facts;
            data.domId = "personPageFacts";
            data.key = "facts";
            data.queryValue = "facts";
            data.events = {};
            break;
        case "gallery":
        case "tabGallery":
            data.tabId = "tabGallery";
            data.contentId = "tabContentGallery";
            data.url = window.PersonCard.URL.gallery;
            data.domId = "personPageGallery";
            data.key = "gallery";
            data.queryValue = "gallery";
            data.events = {};
            break;
        case "hints":
        case "tabHints":
            data.tabId = "tabHints";
            data.contentId = "tabContentHints";
            data.url = window.PersonCard.URL.hints;
            data.domId = "personPageHints";
            data.key = "hints";
            data.queryValue = "hints";
            data.events = {
                "PersonHintTab::hintcount_change::pending": function (nData) {
                    updateHintCount(nData)
                }
            }
    }
    return data
}
function UpdateURL(history, data) {
    var urlArray = history.url.split("?", 2), newUrl = urlArray.join("").substring(0, urlArray[0].split("/", 7).join("/").length) + "/" + window.PersonCard.tabName, event;
    if (urlArray.length > 1 && (newUrl += "?" + urlArray[1]),
    data && data.events && window.acom && window.acom.bus)
        for (event in data.events) {
            window.acom.bus.on(event, data.events[event]);
            break
        }
    History.replaceState(data, HtmlDecode(window.PersonCard.name) + " - " + getTabNameStringForPageTitle(window.PersonCard.tabName), newUrl)
}
var personViewLoaded = !1;
window.personScreenType = function (type) {
    return type === "large-screen" ? $(".responsiveFlag").css("text-align") === "center" : type === "not-large-screen" ? $(".responsiveFlag").css("text-align") === "left" : type === "tablet-portrait" ? $(".responsiveFlag").css("position") === "relative" : type === "smart-phone" ? $(".responsiveFlag").css("visibility") === "visible" : type === "smart-phone-portrait" ? $(".responsiveFlag").css("text-align") === "right" : void 0
}
;
window.glue = {};
window.lock = {
    actionInProgress: !1
};
$(function () {
    var defaultGlueOptions = typeof PersonCard != "undefined" ? {
        key: window.PersonCard.tabName,
        queryValue: window.PersonCard.tabName,
        keyId: "#" + window.PersonCard.tabId,
        url: window.PersonCard.URL.current,
        domId: window.PersonCard.domId,
        combinatorPath: window.PersonCard.cacheUrl + "/lib/tgn/combo.ashx",
        options: getTabData(window.PersonCard.tabName)
    } : {
        key: "",
        queryValue: "",
        keyId: "#0",
        url: "",
        domId: "",
        combinatorPath: "",
        options: ""
    }, glue;
    UpdateURL(History.getState(), defaultGlueOptions.options);
    glue = new window.Glue(defaultGlueOptions);
    glue.preProcess = gluePreProcess;
    window.glue.reload = glue.reload;
    window.glue.fetch = glue.fetch;
    checkForError($(".tabContent.tabActive .personPage"));
    personAnalytics.init("<%=Model.AnalyticsType%>", "<%=Model.ShowIdWarnings%>");
    loadScripts(window.PersonCard.jsAssets, getPersonHintsCount);
    window.location.href.toLowerCase().indexOf("/hints") !== -1 ? setHintsWithHistoryUrl(null) : window.location.href.toLowerCase().indexOf("/gallery") !== -1 && setGalleryPubCurrentPage()
});
$(window).bind("pageshow", function (event) {
    event.originalEvent.persisted && window.location.reload()
}).load(function () {
    personViewLoaded = !0
})
