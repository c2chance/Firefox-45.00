(function($) {
    "use strict";
    function log(msg) {
        window.console && console.log(msg)
    }
    var Form, Validator, localizer, version = 1, doubleIncluded = !!$.validator;
    if (doubleIncluded) {
        if ($.validator.version === version) {
            window.console && console.warn("ERROR: You are including form.js multiple times");
            return
        }
        if (window.console && console.warn("ERROR: You are including multiple versions of form.js"),
        $.validator.version > version)
            return
    }
    localizer = {
        lang: function() {
            var langAttr = $("html").attr("lang") || $("[lang]").first().attr("lang");
            return langAttr ? langAttr.toLowerCase() : "en"
        }(),
        langSets: {
            de: {
                chooseFile: "Datei ausw&#228;hlen",
                chooseFiles: "W&#228;hle Dateien",
                errorMsg: "Es liegen Feldfehler vor:"
            },
            en: {
                chooseFile: "Choose file",
                chooseFiles: "Choose files",
                errorMsg: "There are errors on these fields:"
            },
            es: {
                chooseFile: "Selecciona un archivo",
                chooseFiles: "Seleccionar archivos",
                errorMsg: "Hay campos con errores:"
            },
            fr: {
                chooseFile: "Choisir le fichier",
                chooseFiles: "Choisir les fichiers",
                errorMsg: "Il y a d&#8217;erreurs dans ces champs:"
            },
            it: {
                chooseFile: "Scegli file",
                chooseFiles: "Scegli file",
                errorMsg: "Ci sono errori in questi campi:"
            },
            sv: {
                chooseFile: "V&#228;lj fil",
                chooseFiles: "V&#228;lja filer",
                errorMsg: "Det uppstod fel f&#246;r dessa f&#228;lt:"
            }
        },
        localize: function(key) {
            return this.langSets[this.lang] && this.langSets[this.lang][key] ? this.langSets[this.lang][key] : this.langSets[this.lang.substring(0, 2)] && this.langSets[this.lang.substring(0, 2)][key] ? this.langSets[this.lang.substring(0, 2)][key] : this.langSets.en[key] || ""
        }
    };
    Form = {};
    Form.isTouchDevice = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch;
    Form.isPlaceholderSupported = typeof document.createElement("input").placeholder != "undefined";
    Form.handlePlaceholders = function($form) {
        Form.isPlaceholderSupported || $form.find("input[placeholder], textarea[placeholder]").each(function() {
            var placeholder;
            if ($(this).data("usesPlaceholderPolyfill") || $(this).attr("type") === "password")
                return !0;
            placeholder = $(this).attr("placeholder");
            Form.addPlaceholderValue($(this), placeholder);
            $(this).data("usesPlaceholderPolyfill", !0).on("blur.form", function() {
                $(this).val() === "" ? $(this).val(placeholder).addClass("placeholderPolyfill") : $(this).removeClass("placeholderPolyfill")
            }).on("focus.form", function() {
                $(this).removeClass("placeholderPolyfill");
                $(this).val() === placeholder && $(this).val("")
            })
        })
    }
    ;
    Form.removePlaceholderValues = function($form) {
        $form.find("input[placeholder]").each(function() {
            $(this).val() === $(this).attr("placeholder") && $(this).val("")
        })
    }
    ;
    Form.addPlaceholderValues = function($form) {
        $form.find('input[placeholder]:not([type="password"]), textarea[placeholder]').each(function() {
            Form.addPlaceholderValue($(this), $(this).attr("placeholder"))
        })
    }
    ;
    Form.addPlaceholderValue = function($field, placeholder) {
        $field.val() === "" && $field.val(placeholder);
        $field.val() === placeholder && $field.addClass("placeholderPolyfill")
    }
    ;
    Form.handleUrls = function($field) {
        if ($field.data("usesUrlPlaceholder"))
            return !0;
        $field.data("usesUrlPlaceholder", !0).on("blur.form", function() {
            $field.val() && $field.val().indexOf("://") === -1 && $field.val() !== $field.attr("placeholder") && $field.val("http://" + $field.val())
        })
    }
    ;
    Form.handleFileInputs = function($form) {
        $form.find('input[type="file"]').each(function() {
            var $field = $(this), isMultiple = $field[0].hasAttribute("multiple"), browserVersion, ua, tem, M;
            if ($field.data("usesFilePolyfill"))
                return !0;
            $field.data("usesFilePolyfill", !0).after('<label class="ancBtn fileBtn silver" for="' + $field.attr("id") + '">' + localizer.localize(isMultiple ? "chooseFiles" : "chooseFile") + '<\/label><span class="filename"><\/span>').on("change.form", function() {
                var fileNames = $.map($field[0].files, function(file) {
                    return file.name
                }).join(", ");
                fileNames ? $field.siblings(".filename").html(fileNames) : $field.siblings(".filename").html("");
                $field.blur()
            });
            if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && (ua = navigator.userAgent,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [],
            /trident/i.test(M[1]) ? (tem = /\brv[ :]+(\d+(\.\d+)?)/g.exec(ua) || [],
            browserVersion = "IE " + (tem[1] || "")) : (M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"],
            (tem = ua.match(/version\/([\.\d]+)/i)) !== null  && (M[2] = tem[1]),
            browserVersion = M.join(" ")),
            browserVersion = browserVersion.split(" "),
            browserVersion = browserVersion[1].split("."),
            browserVersion = parseInt(browserVersion[0], 10),
            browserVersion < 22))
                $('label[for="' + $field.attr("id") + '"]').on("click.form", function() {
                    $field.click()
                })
        })
    }
    ;
    Validator = {};
    Validator.defaults = {
        validateOnSubmitHover: !1,
        submitButton: null ,
        onSubmit: !1,
        fields: {}
    };
    Validator.patterns = {
        match: function(value, match) {
            return value === $("#" + match).val()
        },
        maxLength: function(value, maxLength) {
            return value.length <= maxLength
        },
        minLength: function(value, minLength) {
            return value.length >= minLength
        },
        extensions: function(values, extensions) {
            var i, len;
            for (typeof values == "string" && (values = [{
                name: values
            }]),
            i = 0,
            len = values.length; i < len; i++)
                if ($.inArray(values[i].name.split(".").pop().toLowerCase(), extensions) === -1)
                    return !1;
            return !0
        },
        email: function(value) {
            return !!value.match(/^[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/)
        },
        number: function(value) {
            return !!value.match(/^[0-9]*(\.[0-9]+)?$/)
        },
        tel: function(value) {
            return !!value.match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)
        },
        url: function(value) {
            return !!value.match(/^(http|https|ftp):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i)
        }
    };
    Validator.validateCollection = function($collection, required) {
        return Number(required) > $collection.filter(":checked").length ? !1 : !0
    }
    ;
    Validator.isValid = function($field, e) {
        var value = ""
          , restrictions = $field.data("restrictions");
        if ($field.val() && !/^\s*$/.test($field.val()) && (value = $field.val()),
        $field.is('input[type="checkbox"], input[type="radio"]'))
            return Validator.validateCollection(restrictions.collection, restrictions.required);
        if ($field.is('[type="file"]') && (value = $field[0].files),
        restrictions.pattern && $.isFunction(restrictions.pattern))
            return restrictions.pattern(value, $field, !!restrictions.required, e || {
                type: "validation"
            });
        if (restrictions.required || value.length) {
            if (!value.length || restrictions.extensions && !$.validator.extensions(value, restrictions.extensions) || restrictions.match && !$.validator.match(value, restrictions.match) || restrictions.minLength && !$.validator.minLength(value, restrictions.minLength) || restrictions.maxLength && !$.validator.maxLength(value, restrictions.maxLength))
                return !1;
            if (restrictions.pattern)
                return $.validator[restrictions.pattern](value)
        }
        return !0
    }
    ;
    Validator.removeErrorAndSuccess = function($field) {
        var $label = $field.data("$label");
        $field.removeClass("error success inform").removeAttr("aria-invalid");
        $label.removeClass("error success inform").parent().find(".errorMessage").remove();
        $field.data("restrictions").collection && $field.data("restrictions").collection.removeClass("error success inform");
        $field.data("hasErrorCallout") && jQuery().callout && ($field.data("hasErrorCallout", !1).callout("destroy"),
        $field.attr("data-callout") && $field.callout())
    }
    ;
    Validator.updateValidationMessage = function($field, isValid) {
        var errorClass, errorId, $label = $field.data("$label"), labelID, whichMessage = $label.attr("data-error-index") || 0, restrictions = $field.data("restrictions"), errorMessage = $.trim(($label.attr("data-error") || "").split("|")[whichMessage]);
        Validator.removeErrorAndSuccess($field);
        isValid === !0 ? ($field.data("restrictions").collection && $field.data("restrictions").collection.removeAttr("aria-invalid aria-labelledby").addClass("success"),
        $field.removeAttr("aria-invalid aria-labelledby").addClass("success"),
        $label.addClass("success")) : (isValid === !1 || isValid === "info") && (labelID = $label.attr("id"),
        labelID || (labelID = Validator.getRandomNumber()),
        errorClass = isValid === "info" ? "inform" : "error",
        errorId = labelID + "ErrorMessage",
        $field.data("restrictions").collection ? $field.data("restrictions").collection.each(function() {
            var thisLabel = $('label[for="' + $(this).attr("id") + '"]')
              , thisLabelID = thisLabel.attr("id")
              , self = this;
            thisLabelID || (thisLabelID = Validator.getRandomNumber(),
            thisLabel.attr("id", thisLabelID));
            setTimeout(function() {
                $(self).attr("aria-labelledby", thisLabelID + " " + errorId)
            }, 50)
        }) : setTimeout(function() {
            $field.attr("aria-labelledby", $label.attr("id") + " " + errorId)
        }, 50),
        $field.addClass(errorClass).attr("aria-invalid", !0),
        $label.addClass(errorClass),
        restrictions.errorLocation === "callout" && jQuery().callout ? ($label.append('<span class="errorMessage icon iconWarning"><\/span>'),
        $field.data("restrictions").collection || $field.callout("destroy").data("hasErrorCallout", !0).callout({
            content: errorMessage,
            classes: "errorCallout"
        }),
        $label.parent().append('<div class="noDisplay" id="' + errorId + '">' + errorMessage + "<\/div>")) : restrictions.errorLocation === "below" || restrictions.errorLocation === "callout" ? $label.parent().append('<div class="errorMessage icon iconWarning" id="' + errorId + '">' + errorMessage + "<\/div>") : $label.append('<span class="errorMessage icon iconWarning">' + errorMessage + "<\/span>"));
        $label.removeAttr("data-error-index")
    }
    ;
    Validator.getRandomNumber = function(min, max) {
        return !isNaN(min) && !isNaN(max) ? Math.floor(Math.random() * (1 + max - min) + min) : Date.now().toString() + Math.floor(Math.random() * 1e3 + 1)
    }
    ;
    Validator.validateForm = function($form, scroll) {
        var $firstErrorLabel = !1, $firstErrorInput = !1, result, validation = {
            success: !0,
            errorFieldLabels: []
        };
        return Form.isPlaceholderSupported || Form.removePlaceholderValues($form),
        $.each($form.data("fields"), function(key, $field) {
            var $label = $field.data("$label");
            if ($field.length === 0)
                return delete $form.data("fields")[key],
                !0;
            result = Validator.isValid($field);
            result !== "delay" && (result && result !== "info" ? $field.val().length && Validator.updateValidationMessage($field, !0) : ($firstErrorLabel === !1 && ($firstErrorLabel = $label,
            $firstErrorInput = $field),
            Validator.updateValidationMessage($field, result),
            validation.success = !1,
            $label.attr("data-error-label") ? validation.errorFieldLabels.push($label.attr("data-error-label")) : validation.errorFieldLabels.push($label.contents().filter(function() {
                return !$(this).is("a, b, button, i, em, span, strong")
            }).text())))
        }),
        !validation.success && scroll && ($firstErrorLabel.offset().top < ($("html").scrollTop() || $(document).scrollTop()) && $(document).scrollTop($firstErrorLabel.offset().top),
        $firstErrorInput.focus()),
        $form.data("onSubmit") && (validation.success = $form.data("onSubmit")(validation.success, $form) ? !0 : !1),
        validation.success || Form.isPlaceholderSupported || Form.addPlaceholderValues($form),
        validation
    }
    ;
    Validator.handleValidationOnSubmitHover = function($form, settings) {
        var hoverAlertTimer, spaceBetweenButtonAndAlert = 8, $formAlert = $("#formAlert");
        if (settings.validateOnSubmitHover && !Form.isTouchDevice)
            settings.submitButton.on("mouseenter.form focus.form", function() {
                var $submitButton = $(this), offset, validationResults = Validator.validateForm($form, !1);
                clearTimeout(hoverAlertTimer);
                !validationResults.success && validationResults.errorFieldLabels.length && (offset = $submitButton.offset(),
                $formAlert.css("opacity", 1).html("<h4><strong>" + localizer.localize("errorMsg") + "<\/strong><\/h4><p>" + validationResults.errorFieldLabels.join(", ") + "<\/p>").addClass("alert alertOverlay formAlertActive").offset({
                    left: offset.left + $submitButton.outerWidth(!1) + spaceBetweenButtonAndAlert,
                    top: offset.top - ($formAlert.outerHeight(!1) - $submitButton.outerHeight(!1)) / 2
                }));
                Form.isPlaceholderSupported || Form.addPlaceholderValues($form)
            }).on("mouseleave.form blur.form", function() {
                $formAlert.css("opacity", 0);
                hoverAlertTimer = setTimeout(function() {
                    $formAlert.removeClass("alert alertOverlay formAlertActive").removeAttr("style")
                }, 500)
            })
    }
    ;
    Validator.namespaceEvents = function(events) {
        return events.split(" ").join(".form ") + ".form"
    }
    ;
    Validator.validateInput = function($field, e) {
        var result = Validator.isValid($field, e);
        result === "delay" || result === "info" ? Validator.updateValidationMessage($field, result) : result || $field.val() === $field.attr("placeholder") ? $field.val() && $field.val() !== $field.attr("placeholder") ? Validator.updateValidationMessage($field, !0) : Validator.removeErrorAndSuccess($field) : Validator.updateValidationMessage($field, !1)
    }
    ;
    Validator.init = function($form, options) {
        function getField($field) {
            return $field.is("label, legend") && ($field = $form.data("fields")[$field.attr("id")] || $field),
            $field
        }
        var settings = $.extend({}, Validator.defaults, options);
        if (settings.submitButton = settings.submitButton || $form.find('input[type="submit"]').first(),
        $form.data("allowSubmit", !0),
        !$form.data("fields")) {
            $form.on("submit.form", function() {
                var validation = Validator.validateForm($form, !0);
                return validation.success && $form.data("allowSubmit") ? ($form.data("allowSubmit", !1),
                settings.allowMultipleSubmissions && setTimeout(function() {
                    $form.data("allowSubmit", !0)
                }, 1e3),
                !0) : !1
            });
            Validator.handleValidationOnSubmitHover($form, settings)
        }
        settings.onSubmit && $form.data("onSubmit", settings.onSubmit);
        $form.data("fields") || $form.data("fields", {});
        $.each(settings.fields, function(key, restrictions) {
            var $field = $form.find("#" + key)
              , $label = $('label[for="' + key + '"]').first();
            if ($field.length === 0 && ($field = $form.find('[name="' + key + '"]'),
            $field.length === 0))
                return log("Invalid field ID: " + key),
                !0;
            if (restrictions.pattern === "url" && Form.handleUrls($field),
            $field.is("label, legend") ? ($label = $field,
            $field = restrictions.collection,
            restrictions.when = "blur change") : $field.is('input[type="checkbox"]') ? (restrictions.collection = $field,
            restrictions.when = "blur change") : restrictions.when || (restrictions.when = "blur"),
            $field.data("hasFormEvents") && $field.off(".form"),
            $field.data("hasFormEvents", !0).data("restrictions", restrictions).data("$label", $label),
            $form.data("fields")[key] = $field,
            restrictions.required === !0 && $field.attr("aria-required", !0),
            restrictions.when !== "submit")
                $field.on(Validator.namespaceEvents(restrictions.when), function(e) {
                    Validator.validateInput($(this), e)
                });
            $label.attr("data-error-index") ? Validator.updateValidationMessage($field, !1) : $field.val() && !$field.is('input[type="checkbox"], input[type="radio"], input[type="submit"]') && $field.val() !== $field.attr("placeholder") && (Validator.isValid($field) ? Validator.updateValidationMessage($field, !0) : Validator.updateValidationMessage($field, !1));
            $field.on("showValidationMessage.form", function(e, isValid, indexOfErrorMessage) {
                log('Deprecation Notice: Use $("selector").trigger("validation-message", [isValid, indexOfErrorMessage]); instead.');
                $(this).trigger("validation-message.form", [isValid, indexOfErrorMessage])
            })
        });
        $form.attr("novalidate", "novalidate").off("polyfills.form").on("polyfills.form", function() {
            var $form = $(this);
            Form.handlePlaceholders($form);
            Form.handleFileInputs($form)
        }).off("validation-message.form").on("validation-message.form", "input, label, legend, select, textarea", function(e, isValid, indexOfErrorMessage) {
            var $field = getField($(this));
            if (!$field.data("hasFormEvents"))
                return !1;
            $field.data("$label").attr("data-error-index", indexOfErrorMessage);
            Validator.updateValidationMessage($field, isValid)
        }).off("validation-error-index.form").on("validation-error-index.form", "input, label, legend, select, textarea", function(e, index) {
            var $field = getField($(this));
            if (!$field.data("hasFormEvents"))
                return !1;
            $field.data("$label").attr("data-error-index", index)
        }).off("validation-remove.form").on("validation-remove.form", "input, label, legend, select, textarea", function() {
            var $this = $(this)
              , $fieldId = $this.attr("id")
              , $field = getField($this);
            if (!$field.data("hasFormEvents"))
                return !1;
            $field.trigger("validation-message.form", "clear");
            $field.off(".form").data("hasFormEvents", !1);
            delete $form.data("fields")[$fieldId]
        }).off("validation.form").on("validation.form", "input, label, legend, select, textarea", function(e) {
            var $field = getField($(this));
            if (!$field.data("hasFormEvents"))
                return !1;
            Validator.validateInput($field, e)
        }).trigger("polyfills.form")
    }
    ;
    $.fn.validator = function(options) {
        return this.is("label, legend, input, select, textarea") ? (log('Deprecation Notice: Use $("selector").trigger("validation"); instead.'),
        Validator.validateInput(this)) : Validator.init(this, options),
        this
    }
    ;
    $.fn.polyfill = $.fn.validator;
    $.validator = Validator.patterns;
    $.validator.setErrorIndex = function($field, index) {
        log('Deprecation Notice: Use $("field-selector").trigger("validation-error-index", [0]); instead.');
        $field.data("$label").attr("data-error-index", index)
    }
    ;
    $.validator.version = version;
    $(function() {
        Form.isTouchDevice ? $("html").addClass("touch") : $("html").addClass("noTouch");
        $("#formAlert").length || $('<div id="formAlert"><\/div>').appendTo("body")
    })
})(jQuery)
