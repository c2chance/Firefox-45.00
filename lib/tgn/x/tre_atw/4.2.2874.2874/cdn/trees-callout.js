$(function() {
    $(".calloutAddFamily").each(function() {
        var $this = $(this)
          , contentSelector = $this.parent().find(".calloutHidden")
          , buildContent = contentSelector.html();
        $this.callout({
            content: buildContent,
            classes: "calloutMenu",
            hidePointer: !0,
            onOpen: function() {
                $(".addFamilyRole").click(function() {
                    $(".calloutAddFamily").callout("close");
                    var relation = $(this).data("modal-rel")
                      , gender = $(this).data("modal-gender")
                      , personaId = $("#callOutPersonaId").val();
                    typeof AddPerson != "undefined" ? AddPerson.Add(v_tid, personaId, '{"rel":"' + relation + '","gender":"' + gender + '"}', v_pushPageParams) : $AddPersonModal.AddPerson(v_tid, personaId, '{"rel":"' + relation + '","gender":"' + gender + '"}', v_pushPageParams)
                })
            }
        })
    })
})
