"use strict";function getUrl(page,urlParams,callback){window.ancestry&&window.ancestry.pub||callback("PUB is unavailable!");try{window.ancestry.pub.buildUrl().toGoTo(page,urlParams).toComeBackToCurrent(!0).build(function(err,url){err?callback("PUB call failed!"):callback(null,url)})}catch(err){callback("PUB call failed!")}}(function(window){function getPageName(mediaType,action){var view="",fullType="",pageName="";return window.location.href.search("/gallery")>-1?view="gallery : person":window.location.href.search("/apv")>-1?view="gallery : apv":window.location.href.search("/viewer")>-1&&(view="viewer",fullType=mediaType?getFullMediaType(mediaType):"invalid data"),pageName="ancestry "+getOmnitureLocaleString()+" : media : "+view,fullType&&(pageName+=" : "+fullType),action&&(pageName+=" : "+action),pageName}function getLcid(){return document.cookie.match(/LCID=\d+/)?document.cookie.match(/LCID=\d+/)[0].replace("LCID=",""):"1033"}function getOmnitureLocaleString(){return{1031:"de",1033:"us",1036:"fr",1040:"it",1053:"se",2057:"uk",2058:"mx",3081:"au",3082:"es",3084:"ca",4105:"ca"}[lcid]||"us"}function getOmnitureURL(){var country={1031:"germany",1033:"main",1036:"france",1040:"italy",1053:"sweden",2057:"unitedkingdom",2058:"mexico",3081:"australia",3082:"spain",3084:"canada",4105:"canada"}[lcid]||"main",env="prod";return/dev/g.test(location.hostname)&&(env="dev"),/stage/g.test(location.hostname)&&(env="qa"),"http://tags.tiqcdn.com/utag/ancestry/"+country+"/"+env+"/utag.js"}function getFullMediaType(type){return{p:"photo",s:"story",rm:"recordMedia",a:"audio",v:"video"}[type]||"other"}var lcid=getLcid(),utag=window.utag||{};window.mediaOmniture={runOmniture:function(mediaType){window.utag_data=window.utag_data||{};var tags=document.getElementsByTagName("script"),lastScript=tags[tags.length-1],el=document.createElement("script"),pageName=getPageName(mediaType);window.utag_data.page_name=pageName;el.src=getOmnitureURL();el.async=!0;lastScript.parentNode.insertBefore(el,lastScript)},logTealium:function(mediaType,action){var tealiumString;if(mediaType&&action){tealiumString=getPageName(mediaType,action);try{utag.link({action:tealiumString,page_name:tealiumString})}catch(e){}}}}})(window),function(){window.mediaApp=window.mediaApp||{};var common={sorters:{sortByMediaType:function(first,second){var order=["p","s","a","v","rm"],a=order.indexOf(first.type),b=order.indexOf(second.type);return a>b?1:a<b?-1:0},sortByTitleZA:function(a,b){var nameA=a.title.toLowerCase(),nameB=b.title.toLowerCase();return nameA<nameB?1:nameA>nameB?-1:0},sortByTitleAZ:function(a,b){var nameA=a.title.toLowerCase(),nameB=b.title.toLowerCase();return nameA>nameB?1:nameA<nameB?-1:0},sortByDateOldest:function(a,b){return a.createdDate?b.createdDate?new Date(a.createdDate).getTime()-new Date(b.createdDate).getTime():-1:1},sortByDateNewest:function(a,b){return a.createdDate?b.createdDate?new Date(b.createdDate).getTime()-new Date(a.createdDate).getTime():-1:1}}};$.extend(window.mediaApp,common)}()