(function($) {
    $.fn.ancPlaceHolder = function() {
        return "placeholder" in document.createElement("input") ? this : (this.each(function() {
            var $input = $(this);
            $input.is(":focus") || $input.blur()
        }),
        this.focus(function() {
            var $input = $(this);
            $input.parent().hasClass("scSearch") ? $input.val($input.attr("placeholder")).css("color", "#999") : $input.val() == $input.attr("placeholder") && $input.val("").css("color", "")
        }),
        this.keypress(function() {
            var $input = $(this);
            $input.parent().hasClass("scSearch") && ($input.val() && $input.val() != $input.attr("placeholder") || $input.val("").css("color", ""))
        }),
        this.blur(function() {
            var $input = $(this);
            $input.parent().hasClass("scSearch") ? $input.css("color", "") : $input.val() || $input.val($input.attr("placeholder")).css("color", "#999")
        }),
        this)
    }
})(jQuery)
