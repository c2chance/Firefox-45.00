function ladderJSON(response){var html='<div class="modalHeader"><div class="modalHeaderActions"><button class="icon iconPrint link" onclick="rcPrintLadder();" type="button">'+response.printText+'<\/button><\/div><h4 class="modalTitle">'+response.title+"<\/h4><\/div>";html=html+response.html;$(html).modal({width:"400",onOpen:function(){$("#modalContents").addClass("modalHasTitle")},onClose:function(){$(".relModalTriggered").removeClass("relModalTriggered").focus()}})}function rcPrintLadder(){var ladderUrl="/tree/"+window.rcTid+"/person/"+window.rcPid+"/printladder",printWindow=window.open(ladderUrl,"PrintWindow","width=750,height=850,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");printWindow.focus()}$(function(){$(".pageHeader").on("click",".relLabel",function(){var ladderUrl=window.rcDomain+"/tree/"+window.rcTid+"/person/"+window.rcPid+"/getladder";$.ajax({jsonpCallback:"ladderJSON",url:ladderUrl,async:!0,type:"GET",dataType:"jsonp",contentType:"application/json",beforeSend:function(){$("<div><\/div>").modal();$.modal.showLoading(!0)},success:function(){},error:function(ex){var html="<div><p>"+ex.html+"<\/p><\/div>";$(html).modal({title:ex.title})}})})})