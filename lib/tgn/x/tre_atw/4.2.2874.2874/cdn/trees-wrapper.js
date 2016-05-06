window.treesScreenType = function(type) {
    return type === "large-screen" ? $(".responsiveFlag").css("text-align") === "center" : type === "not-large-screen" ? $(".responsiveFlag").css("text-align") === "left" : type === "tablet-portrait" ? $(".responsiveFlag").css("position") === "relative" : type === "smart-phone" ? $(".responsiveFlag").css("visibility") === "visible" : type === "smart-phone-portrait" ? $(".responsiveFlag").css("text-align") === "right" : void 0
}
