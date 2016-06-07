$trees.initFirstFTMSyncBing = function() {
    var docHeight = YAHOO.util.Dom.getViewportHeight()
      , docWidth = YAHOO.util.Dom.getViewportWidth()
      , globalWrapper = document.body
      , ftmsCtr = document.getElementById("ftmsCtr")
      , modalBkg = document.createElement("div");
    modalBkg.setAttribute("id", "ftmsModalBkg");
    modalBkg.className = "ftmSyncModalBkg";
    document.body.appendChild(modalBkg);
    document.body.appendChild(ftmsCtr);
    ftmsCtr.style.left = docWidth / 2 - 300 + "px";
    ftmsCtr.style.top = docHeight / 2 - 200 + "px";
    ftmsCtr.style.display = "";
    s = s_gi(s_account);
    s.pageName = "PT:Tree:Pedigree:FTMS";
    s_pageName = s.pageName;
    s.t()
};

$trees.hideFirstFTMSyncBing = function() {
    document.getElementById("ftmsCtr").style.display = "none";
    document.getElementById("ftmsModalBkg").style.display = "none";
    $trees.hints.initiateHintRequest()
};

$trees.ftmsCreate = function(hasViewedBing, viewBing) {
    typeof viewBing != "undefined" && typeof hasViewedBing != "undefined" && (viewBing === !0 && hasViewedBing === !1 ? $trees.initFirstFTMSyncBing() : $trees.hints.initiateHintRequest())
}
