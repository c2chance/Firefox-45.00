function CreateClickHandlers(item){var action=utag_data.page_name+item.actionName,clickableItem=$(item.selector);if(clickableItem.length>0&&typeof utag!="undefined")clickableItem.on("click",function(){utag.link({action:action})});else console.log("Attempt to register invalid selector for analytics:"+item.actionName)}function personAnalyticsTrackClick(actionName){if(typeof utag!="undefined"){var action=utag_data.page_name+": "+actionName;utag.link({action:action})}}function personAnalyticsTrackMediaClicks(element){$(element).parents(".HistoricalInsight").length>0?personAnalyticsTrackClick("HistoricalInsightMediaClick"):personAnalyticsTrackClick("mediaNarrativeMediaClick")}function personAnalyticsTrackFactsPersonClick(personType){personAnalyticsTrackClick("familyListPerson");personType.indexOf("Child")>0&&personAnalyticsTrackClick("familyListPersonChild");personType.indexOf("Spouse")>0&&personAnalyticsTrackClick("familyListPersonSpouse");personType.indexOf("Parent")>0&&personAnalyticsTrackClick("familyListPersonParent");personType.indexOf("Sibling")>0&&personAnalyticsTrackClick("familyListPersonSibling")}function personAnalyticsChangePageName(pageId){if(typeof utag_data!="undefined"&&typeof utag!="undefined"){var newPageName=utag_data.page_name.substr(0,utag_data.page_name.lastIndexOf(": ")+2)+pageId;utag.view({page_name:newPageName})}}function logPersonPageContentView(pageId,treeId,personId,isPublicTree,userRole){if(typeof utag_data!="undefined"&&typeof utag!="undefined"){var newPageName=utag_data.page_name.substr(0,utag_data.page_name.lastIndexOf(": ")+2)+pageId,params={omniturePageName:newPageName,isPublicTree:isPublicTree.toLowerCase()==="true",userRole:userRole},url="/tree/"+treeId+"/person/"+personId+"/logPersonPageContentView";$.ajax({type:"POST",url:url,data:params,cache:!1,success:function(){},failure:function(){},complete:function(){}})}}var personAnalytics={showInformation:!1,pageIds:{LifeStory:[]},init:function(pageId,isDevEnvironment){personAnalytics.pageIds.length>0&&typeof utag!="undefined"&&$.each(personAnalytics.pageIds[pageId],function(index,item){CreateClickHandlers(item,isDevEnvironment)})}}