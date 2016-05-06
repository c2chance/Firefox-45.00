$(document).ready(function() {
    $(".responsiveTabLink").click(function(event) {
        $("#TabGroupLargeDiv").toggleClass("togglePages");
        event.stopPropagation()
    });
    $(document).click(function() {
        $("#TabGroupLargeDiv").hasClass("togglePages") || $("#TabGroupLargeDiv").addClass("togglePages")
    });
    $(".tabLink").click(function() {
        if ($(this).closest("li").hasClass("active"))
            return !1
    });
    $(".nav a.selected").click(function(event) {
        return $("#SubNavTabGroup").toggleClass("togglePagesSN"),
        event.stopPropagation(),
        $(this).hasClass("selected") ? !1 : void 0
    })
})
