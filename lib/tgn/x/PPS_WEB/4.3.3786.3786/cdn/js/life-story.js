"use strict";

function initializeLifeStoryMenuOptionsCallout() {
    $(".lifeStoryOptions .menuButtonOptions").callout({
        type: "click",
        classes: "calloutMenu calloutLifeStoryOptions",
        content: "#lifeStoryOptionsCalloutDomContent",
        style: "dark"
    });
    $(".calloutContent").hasClass("calloutLifeStoryOptions") && (window.personScreenType("smart-phone") ? $(".lifeStoryOptions .menuButtonOptions.show480").callout("close").callout("open") : $(".lifeStoryOptions .menuButtonOptions.hide480").callout("close").callout("open"))
}

function initializeMapbox() {
/*    
    (PersonStory.map.lifeEvents.show || PersonStory.map.count > 0) && ($("head").append($("<link rel='stylesheet' href='//api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.css' type='text/css' />")),
    $.cachedScript("//api.tiles.mapbox.com/mapbox.js/plugins/geo-viewport/v0.1.1/geo-viewport.js").done(function() {
        $.cachedScript("//api.tiles.mapbox.com/mapbox.js/plugins/geojson-extent/v0.0.1/geojson-extent.js").done(function() {
            $.cachedScript("//api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.js").done(function() {
                $.cachedScript("//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js").done(function() {
                    PersonStory.map.lifeEvents.show && lifeEventsMapInitializeStatic();
                    PersonStory.map.count > 0 && eventMapsInitializeStatic()
                })
            })
        })
    }))
*/
    (PersonStory.map.lifeEvents.show || PersonStory.map.count > 0) && ($("head").append($("<link rel='stylesheet' href='./lib/api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.css' type='text/css' />")),
    $.cachedScript("./lib/api.tiles.mapbox.com/mapbox.js/plugins/geo-viewport/v0.1.1/geo-viewport.js").done(function() {
        $.cachedScript(".lib/api.tiles.mapbox.com/mapbox.js/plugins/geojson-extent/v0.0.1/geojson-extent.js").done(function() {
            $.cachedScript("./lib/api.tiles.mapbox.com/mapbox.js/v1.6.1/mapbox.js").done(function() {
                $.cachedScript("./lib/api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/leaflet.markercluster.js").done(function() {
                    PersonStory.map.lifeEvents.show && lifeEventsMapInitializeStatic();
                    PersonStory.map.count > 0 && eventMapsInitializeStatic()
                })
            })
        })
    }))
}

function findAPersonInitTypeAhead(personField) {
    var excludepids = personField.data("autocomplete-excludepids")
      , treeId = PersonCard.treeId;
    personField.autocomplete({
        source: "/suggest/person?treeId=" + treeId + "&serviceDown=none&excludePids=" + excludepids,
        key: "name",
        queryParameter: "term",
        dataType: "json",
        minLength: 3,
        maxResults: 20,
        customDisplay: function(data) {
            return {
                value: data.value,
                display: data.display
            }
        },
        onItemSelect: function(itemData) {
            itemData !== "" && itemData.PID != "" && setFindPersonTypeAheadFields(itemData.PID)
        },
        onOpen: !1,
        onClose: !1
    })
}
function setFindPersonTypeAheadFields(personId) {
    var goToPerson = $("#hidableFindAPersonGoToPerson"), pageUrl, personIndex, clearPerson;
    goToPerson.length > 0 && (pageUrl = window.location.toString(),
    personIndex = pageUrl.indexOf(PersonCard.treeId + "/person"),
    pageUrl = pageUrl.substring(0, personIndex),
    goToPerson.attr("onclick", 'javascript:$(location).attr("href","' + pageUrl + PersonCard.treeId + "/person/" + personId + '");'),
    goToPerson.removeAttr("disabled"));
    clearPerson = $("#hidableFindAPersonClearSelection");
    clearPerson.length > 0 && (clearPerson.attr("onclick", "javascript:$('#hidableFindAPerson').val('');$('#hidableFindAPersonGoToPerson').removeAttr('onclick');$('#hidableFindAPersonGoToPerson').attr('disabled','disabled');$('#hidableFindAPersonClearSelection').attr('disabled','disabled');findAPersonInitTypeAhead($('#hidableFindAPerson'));"),
    clearPerson.removeAttr("disabled"))
}
function deleteEventModal() {
    $('<div class="form"><p>$$Are you sure you want to permanently delete this event from your timeline?<\/p><footer class="modalSection"><div class="ancGrid"><div class="ancCol"><button class="ancBtn lrg closeModal" onClick="hideEventFromTimeline();" type="button">$$Delete<\/button><\/div><div class="ancCol"><button class="ancBtn silver lrg closeModal" type="button">' + PersonStory.text.cancelUpper + "<\/button><\/div><\/div><\/footer><\/div>").modal({
        width: "410",
        title: PersonCard.text.deleteEvent
    })
}
function getLatLongDifferenceValues(LongLatList) {
    for (var latDiff, longDiff, prevLat = 0, prevLong = 0, latDiffVal = 0, longDiffVal = 0, latLongDiffArr = [], differentPlacesCnt = 0, m = 0; m < LongLatList.length; m++)
        latDiff = Math.abs(Math.abs(LongLatList[m].Latitude) - prevLat),
        longDiff = Math.abs(Math.abs(LongLatList[m].Longitude) - prevLong),
        latDiff > 1.75 && (latDiffVal = latDiff),
        longDiff > 1.75 && (longDiffVal = longDiff),
        prevLat = Math.abs(LongLatList[m].Latitude),
        prevLong = Math.abs(LongLatList[m].Longitude),
        (longDiff > 1 || latDiff > 1) && differentPlacesCnt++;
    return latLongDiffArr[0] = latDiffVal,
    latLongDiffArr[1] = longDiffVal,
    latLongDiffArr[2] = differentPlacesCnt,
    latLongDiffArr
}
function showLifeEventsMapModal() {
    var modalContents = $("#modalContents"), mapLifeEventsModal;
    modalContents.length > 0 && (mapLifeEventsModal = modalContents.find("#mapLifeEventsModal"),
    mapLifeEventsModal.length > 0 && mapLifeEventsModal.remove());
    lifeEventsMapInitialize();
    $("#mapLifeEventsModal").modal({
        showLoading: !0,
        useCustomPadding: !0,
        title: "",
        width: "100%",
        onClose: function() {
            $(".photoOverlayButton.active").removeClass("active").closest("figure").focus()
        }
    })
}
function lifeMapsZoomLevelEnhance(latDiffVal, longDiffVal, lifeEventsMapDataZoomLevel) {
    return lifeEventsMapDataZoomLevel > 7 ? latDiffVal < 4 && latDiffVal > 2 || longDiffVal < 4 && longDiffVal > 2 ? 6 : latDiffVal < 2 || longDiffVal < 2 ? longDiffVal > 20 ? 6 : 7 : latDiffVal > 4 && longDiffVal > 5.5 && lifeEventsMapDataZoomLevel === 8 ? latDiffVal < 20 && longDiffVal < 30 ? lifeEventsMapDataZoomLevel - 4 : latDiffVal < 36 && longDiffVal < 100 ? lifeEventsMapDataZoomLevel - 3 : latDiffVal < 50 && longDiffVal < 110 ? lifeEventsMapDataZoomLevel - 1 : lifeEventsMapDataZoomLevel : latDiffVal > 4 && longDiffVal > 2 && lifeEventsMapDataZoomLevel > 6 && lifeEventsMapDataZoomLevel !== 9 ? lifeEventsMapDataZoomLevel - 2 : latDiffVal < 40 && longDiffVal > 110 && lifeEventsMapDataZoomLevel === 9 ? lifeEventsMapDataZoomLevel : 7 : lifeEventsMapDataZoomLevel === 2 || lifeEventsMapDataZoomLevel === 3 ? latDiffVal > 4 && latDiffVal < 9 && longDiffVal > 4 && longDiffVal < 40 && lifeEventsMapDataZoomLevel === 2 ? 3 : latDiffVal < 3.2 && longDiffVal > 2 && longDiffVal < 15 && lifeEventsMapDataZoomLevel === 3 ? 4 : latDiffVal > 4 && latDiffVal < 60 && longDiffVal > 4 && longDiffVal < 60 && lifeEventsMapDataZoomLevel === 3 ? lifeEventsMapDataZoomLevel - 1 : lifeEventsMapDataZoomLevel : latDiffVal < 4 && latDiffVal > 2 || longDiffVal < 4 && longDiffVal > 2 ? lifeEventsMapDataZoomLevel > 6 ? latDiffVal > 4 && latDiffVal < 5.5 && longDiffVal > 2 && longDiffVal < 3 || latDiffVal < 4 && longDiffVal < 25 && lifeEventsMapDataZoomLevel === 7 ? lifeEventsMapDataZoomLevel - 2 : lifeEventsMapDataZoomLevel - 1 : latDiffVal < 4 && longDiffVal > 2 && longDiffVal < 36 && lifeEventsMapDataZoomLevel === 5 ? lifeEventsMapDataZoomLevel - 1 : lifeEventsMapDataZoomLevel : latDiffVal > 8 && latDiffVal < 16 && longDiffVal > 10 && longDiffVal < 25 && lifeEventsMapDataZoomLevel > 6 ? lifeEventsMapDataZoomLevel - 3 : latDiffVal > 4 && longDiffVal > 2 && lifeEventsMapDataZoomLevel > 6 ? latDiffVal < 8 && longDiffVal < 25 ? lifeEventsMapDataZoomLevel - 3 : lifeEventsMapDataZoomLevel - 2 : (latDiffVal < 2 && longDiffVal > 4 && longDiffVal < 36 || latDiffVal > 4 && longDiffVal > 4 && longDiffVal < 22 || latDiffVal < 6 && longDiffVal < 44 || latDiffVal > 35 && latDiffVal < 40 && longDiffVal > 40 && longDiffVal < 44) && lifeEventsMapDataZoomLevel === 4 ? lifeEventsMapDataZoomLevel : latDiffVal < 21 && latDiffVal > 4 && longDiffVal > 2 && longDiffVal < 36 && lifeEventsMapDataZoomLevel === 5 ? lifeEventsMapDataZoomLevel - 2 : lifeEventsMapDataZoomLevel - 1
}
function lifeEventsMapInitialize() {
    var isUseMapModal, lifeEventsMapData, heightVal, geoJson;
    if (PersonStory.map.lifeEvents.data !== null ) {
        if (isUseMapModal = typeof PersonStory.map.useMapModal != "undefined" && PersonStory.map.useMapModal !== null  && PersonStory.map.useMapModal.length > 0 && PersonStory.map.useMapModal === "true",
        isUseMapModal || $(".mapFigure .photoOverlayButton").hide(),
        lifeEventsMapData = PersonStory.map.lifeEvents.data[0],
        isUseMapModal || ($(".mapFigure .photoOverlayButton").hide(),
        $("#static-map").hide(),
        $("#mapLifeEvents").show()),
        isUseMapModal && $("#mapLifeEventsModalTemp").length > 0 && ($("#mapLifeEventsModalTemp").remove(),
        typeof PersonStory.map.lifeMapObject != "undefined" && PersonStory.map.lifeMapObject !== null  && (PersonStory.map.lifeMapObject.remove(),
        PersonStory.map.lifeMapObject = null )),
        isUseMapModal && (heightVal = $(window).height() - 40,
        $("#mapLifeEventsModalTemp").length && $("#mapLifeEventsModalTemp").length !== 0 || $('<div id="mapLifeEventsModalTemp"><div id="mapLifeEventsModal" style="height:' + heightVal + 'px;" /><\/div>').appendTo("body"),
        $("#mapLifeEventsModal").html("")),
        typeof L != "undefined" && (typeof PersonStory.map.lifeMapObject == "undefined" || PersonStory.map.lifeMapObject === null )) {
            var mapLE = L.mapbox.map(isUseMapModal ? "mapLifeEventsModal" : "mapLifeEvents", PersonStory.map.account + "." + PersonStory.map.handle, {
                zoomControl: !0,
                tileLayer: {
                    format: "jpg70",
                    noWrap: isUseMapModal ? !1 : !0,
                    minZoom: 2,
                    maxZoom: 13
                }
            })
              , latLongDiffArr = getLatLongDifferenceValues(lifeEventsMapData.LongLatList)
              , latDiffVal = latLongDiffArr[0]
              , longDiffVal = latLongDiffArr[1]
              , zoomLevel = latLongDiffArr[2] === 1 && lifeEventsMapData.ZoomLevel >= 7 ? lifeEventsMapData.ZoomLevel : lifeMapsZoomLevelEnhance(latDiffVal, longDiffVal, lifeEventsMapData.ZoomLevel);
            window.personScreenType("not-large-screen") && zoomLevel > 2 ? zoomLevel -= 1 : zoomLevel <= 2 && (zoomLevel += 1);
            mapLE.setView([lifeEventsMapData.CenterLatitude, lifeEventsMapData.CenterLongitude], zoomLevel);
            mapLE.options.maxBounds = mapLE.getBounds();
            isUseMapModal || (mapLE.scrollWheelZoom.disable(),
            $("#mapLink").attr("href", "javascript:window.open('" + lifeEventsMapData.MapUrl + "', 'toolbar=no, scrollbars=no, resizable=no, width=800, height=800');void(0);"));
            geoJson = {
                type: "FeatureCollection",
                features: parseLongLatVals(lifeEventsMapData.LongLatList)
            };
            mapLE.featureLayer.on("layeradd", function(e) {
                var marker = e.layer
                  , feature = marker.feature
                  , popupContent = '<div style="max-width:220px;"><b>' + feature.properties.details + "<\/b><\/div>";
                marker.bindPopup(popupContent, {
                    closeButton: !1,
                    maxWidth: 220,
                    minWidth: 100
                })
            });
            mapLE.featureLayer.setGeoJSON(geoJson);
            mapLE.on("mousedown", function() {
                personAnalyticsTrackClick("lifeEventMapClick")
            });
            mapLE.featureLayer.on("mouseover", function(e) {
                e.layer.openPopup()
            }).on("mouseout", function(e) {
                e.layer.closePopup()
            }).on("click", function(e) {
                personAnalyticsTrackClick("lifeEventMapPinClick" + e.layer.feature.properties["marker-type"]);
                mapLE.panTo(e.layer.getLatLng());
                mapLE.getZoom() < 13 && mapLE.setView(e.layer.getLatLng(), mapLE.getZoom() + (13 - lifeEventsMapData.ZoomLevel))
            }).on("ready", function() {
                mapLE.fitBounds(mapLE.featureLayer.getBounds())
            });
            PersonStory.map.lifeMapObject = mapLE
        }
        isUseMapModal && $("#mapLifeEventsModalTemp").hide()
    }
}
function showEventMapModal(mapId) {
    var modalContents = $("#modalContents"), mapJSONNarrativeModal, eventItem;
    modalContents.length > 0 && (mapJSONNarrativeModal = modalContents.find("#mapJSONNarrativeModal" + mapId),
    mapJSONNarrativeModal.length > 0 && mapJSONNarrativeModal.remove());
    eventItem = PersonStory.timeline.events[mapId];
    eventMapsInitializeSetData(mapId, eventItem.EventMapMapData);
    $("#mapJSONNarrativeModal" + mapId).modal({
        showLoading: !0,
        useCustomPadding: !0,
        title: "",
        width: "100%",
        onClose: function() {
            $(".photoOverlayButton.active").removeClass("active").closest("figure").focus()
        }
    })
}
function eventMapsInitialize() {
    for (var isUseMapModal, eventItem, i = 0; i < PersonStory.timeline.events.length; i++)
        isUseMapModal = typeof PersonStory.map.useMapModal != "undefined" && PersonStory.map.useMapModal !== null  && PersonStory.map.useMapModal.length > 0 && PersonStory.map.useMapModal === "true",
        eventItem = PersonStory.timeline.events[i],
        eventMapsInitializeSetData(i, eventItem.EventMapMapData),
        isUseMapModal && $("#mapJSONNarrativeModalTemp" + i).hide()
}
function eventMapsInitializeSetData(mapId, eventMapMapData) {
    var isUseMapModal = typeof PersonStory.map.useMapModal != "undefined" && PersonStory.map.useMapModal !== null  && PersonStory.map.useMapModal.length > 0 && PersonStory.map.useMapModal === "true", eventMap = eventMapMapData, mapContainer, heightVal, figureMap, divHtml, map, geoJson;
    if (eventMap && eventMap.MapImageUrl && eventMap.MapUrl && (isUseMapModal || ($(".mapFigure .photoOverlayButton").hide(),
    $("#photoOverlayButton" + mapId).hide(),
    $("#staticMapJSONNarrative" + mapId).hide()),
    mapContainer = isUseMapModal ? "mapJSONNarrativeModal" + mapId : "mapJSONNarrative" + mapId,
    isUseMapModal && $("#mapJSONNarrativeModalTemp" + mapId).length > 0 && ($("#mapJSONNarrativeModalTemp" + mapId).remove(),
    typeof PersonStory.map.eventsMapArray[mapId] != "undefined" && PersonStory.map.eventsMapArray[mapId] !== null  && (PersonStory.map.eventsMapArray[mapId].remove(),
    PersonStory.map.eventsMapArray[mapId] = null )),
    isUseMapModal && (heightVal = $(window).height() - 40,
    $("#mapJSONNarrativeModalTemp" + mapId).length && $("#mapJSONNarrativeModalTemp" + mapId).length !== 0 || $('<div id="mapJSONNarrativeModalTemp' + mapId + '"><div id="' + mapContainer + '" style="height:' + heightVal + 'px;" /><\/div>').appendTo("body")),
    $("#" + mapContainer).html(""),
    $("#" + mapContainer).show(),
    figureMap = $("#figureMap" + mapId),
    figureMap.show(),
    isUseMapModal || (divHtml = '<div class="mapJSON" id="' + mapContainer + '"><div id="map-ui' + mapId + '" class="map-ui"><ul><li><a id="mapLink' + mapId + '" class="leaflet-control-mapbox-geocoder-toggle mapbox-icon mapbox-icon-geocoder" href="#"><\/a><\/li><\/ul><\/div><\/div>',
    figureMap.html(divHtml),
    $("figure.loading").removeClass("loading")),
    isUseMapModal && $("#photoOverlayButton" + mapId).attr("href", "javascript:showEventMapModal('" + mapId + "');"),
    typeof L != "undefined" && (typeof PersonStory.map.eventsMapArray[mapId] == "undefined" || PersonStory.map.eventsMapArray[mapId] === null ))) {
        map = L.mapbox.map(mapContainer, PersonStory.map.account + "." + PersonStory.map.handle, {
            zoomControl: isUseMapModal ? !0 : !1,
            tileLayer: {
                format: "jpg70",
                noWrap: isUseMapModal ? !1 : !0,
                minZoom: isUseMapModal ? 3 : 2,
                maxZoom: 13
            }
        });
        map.setView([eventMap.CenterLatitude, eventMap.CenterLongitude], eventMap.ZoomLevel);
        isUseMapModal || (map.dragging.disable(),
        map.scrollWheelZoom.disable(),
        $("#mapLink" + mapId).attr("href", "javascript:window.open('" + eventMap.MapUrl + "', 'toolbar=no, scrollbars=no, resizable=no, width=600, height=1024');void(0);"));
        geoJson = {
            type: "FeatureCollection",
            features: [{
                type: "Feature",
                properties: {
                    "marker-symbol": eventMap.PinIcon,
                    "marker-color": eventMap.PinColor,
                    "marker-size": "medium",
                    "marker-type": eventMap.PinTitle.substr(0, eventMap.PinTitle.indexOf("<"))
                },
                geometry: {
                    type: "Point",
                    coordinates: [eventMap.CenterLongitude, eventMap.CenterLatitude]
                }
            }]
        };
        map.featureLayer.on("layeradd", function(e) {
            var marker = e.layer
              , popupContent = '<div class="popUpContent"><b>' + eventMap.PinTitle + "<\/b><\/div>";
            marker.bindPopup(popupContent, {
                closeButton: !1
            })
        });
        map.featureLayer.setGeoJSON(geoJson);
        map.featureLayer.on("mouseover", function(e) {
            e.layer.openPopup()
        }).on("mouseout", function(e) {
            e.layer.closePopup()
        }).on("click", function(e) {
            personAnalyticsTrackClick("mapPinClick" + e.layer.feature.properties["marker-type"]);
            map.panTo(e.layer.getLatLng())
        }).on("ready", function() {
            map.fitBounds(map.featureLayer.getBounds())
        });
        PersonStory.map.eventsMapArray[mapId] = map
    }
}
function lifeEventsMapInitializeStatic() {
    var isUseMapModal = typeof PersonStory.map.useMapModal != "undefined" && PersonStory.map.useMapModal !== null  && PersonStory.map.useMapModal.length > 0 && PersonStory.map.useMapModal === "true", lifeEventsMapData = PersonStory.map.lifeEvents.data[0], i, longDiffPlacesVal, latDiffPlacesVal, mapCenter;
    if (PersonStory.map.lifeEvents.data !== null  && (isUseMapModal && ($(".mapFigure .photoOverlayButton").show(),
    $("#mapOverlayButton").attr("onclick", "showLifeEventsMapModal();")),
    $(".mapFigure .photoOverlayButton").show(),
    typeof L != "undefined")) {
        L.mapbox.accessToken = PersonStory.map.accessToken;
        isUseMapModal || $("#mapLink").attr("href", "javascript:window.open('" + lifeEventsMapData.MapUrl + "', 'toolbar=no, scrollbars=no, resizable=no, width=800, height=800');void(0);");
        var geoJson = {
            type: "FeatureCollection",
            features: parseLongLatValsStatic(lifeEventsMapData.LongLatList)
        }
          , bounds = geojsonExtent(geoJson)
          , size = [750, 200]
          , vp = geoViewport.viewport(bounds, size)
          , pins = []
          , differentPlacesCnt = 0
          , latPrevVal = 0
          , longPrevVal = 0
          , alternateCentering = "";
        for (i = 0; i < geoJson.features.length; i++)
            longDiffPlacesVal = Math.abs(Math.abs(geoJson.features[i].geometry.coordinates[0]) - Math.abs(longPrevVal)),
            longPrevVal = geoJson.features[i].geometry.coordinates[0],
            latDiffPlacesVal = Math.abs(Math.abs(geoJson.features[i].geometry.coordinates[1]) - Math.abs(latPrevVal)),
            latPrevVal = geoJson.features[i].geometry.coordinates[1],
            (longDiffPlacesVal > 1 || latDiffPlacesVal > 1) && differentPlacesCnt++,
            pins.push("pin-m-" + geoJson.features[i].properties.markerSymbol + "+" + geoJson.features[i].properties.markerColor + "(" + geoJson.features[i].geometry.coordinates.join(",") + ")"),
            alternateCentering.length === 0 && (alternateCentering = geoJson.features[i].geometry.coordinates.join(","));
        var latLongDiffArr = getLatLongDifferenceValues(lifeEventsMapData.LongLatList)
          , latDiffVal = latLongDiffArr[0]
          , longDiffVal = latLongDiffArr[1]
          , zoomLevel = differentPlacesCnt === 1 && lifeEventsMapData.ZoomLevel >= 7 ? latDiffVal > 2 && latDiffVal < 4 && longDiffVal > 120 && lifeEventsMapData.ZoomLevel === 8 ? lifeMapsZoomLevelEnhance(latDiffVal, longDiffVal, lifeEventsMapData.ZoomLevel) : lifeEventsMapData.ZoomLevel : lifeMapsZoomLevelEnhance(latDiffVal, longDiffVal, lifeEventsMapData.ZoomLevel);
        ((latDiffVal < 2 || longDiffVal < 2) && zoomLevel > 6 && differentPlacesCnt === 1 || zoomLevel > 6 && differentPlacesCnt > 1) && (zoomLevel = 6);
        mapCenter = vp.center.join(",");
        (lifeEventsMapData.ZoomLevel <= 2 && zoomLevel <= 2 || latDiffVal < 13 && longDiffVal > 50 && lifeEventsMapData.ZoomLevel <= 3 && zoomLevel <= 2 || latDiffVal > 9 && latDiffVal < 20 && longDiffVal > 4 && longDiffVal < 32 && lifeEventsMapData.ZoomLevel <= 3 && zoomLevel <= 2 || latDiffVal > 6 && latDiffVal < 25 && longDiffVal > 4 && longDiffVal < 35 && lifeEventsMapData.ZoomLevel >= 8 && zoomLevel <= 5 || latDiffVal > 8 && latDiffVal < 10 && longDiffVal > 2 && longDiffVal < 3 && lifeEventsMapData.ZoomLevel === 5 && zoomLevel === 5 || latDiffVal > 10 && latDiffVal < 42 && longDiffVal > 110 && lifeEventsMapData.ZoomLevel === 9 && zoomLevel === 9 && differentPlacesCnt === 1 || latDiffVal < 5 && longDiffVal < 5 && lifeEventsMapData.ZoomLevel === 7 && zoomLevel === 7 && differentPlacesCnt === 1 || latDiffVal > 35 && latDiffVal < 40 && longDiffVal > 60 && longDiffVal < 65 && lifeEventsMapData.ZoomLevel === 3 && zoomLevel === 3 || latDiffVal < 30 && longDiffVal > 130 && lifeEventsMapData.ZoomLevel <= 3 && zoomLevel <= 3 || latDiffVal < 6 && longDiffVal < 16 && lifeEventsMapData.ZoomLevel <= 2 && zoomLevel <= 3 || latDiffVal < 13 && longDiffVal > 100 && lifeEventsMapData.ZoomLevel === 5 || latDiffVal < 40 && longDiffVal > 130 && lifeEventsMapData.ZoomLevel === 5) && (mapCenter = alternateCentering);
        $("#static-map").attr("src", "https://api.tiles.mapbox.com/v3/" + PersonStory.map.account + "." + PersonStory.map.handleBase + "," + PersonStory.map.account + "." + PersonStory.map.handleLabels + "/" + pins.join(",") + "/" + mapCenter + "," + (geoJson.features.length > 1 && differentPlacesCnt > 1 ? vp.zoom === "0" || vp.zoom === "1" ? 2 : zoomLevel.toString() : zoomLevel.toString()) + "/" + size.join("x") + ".jpg70").closest("figure.loading").removeClass("loading")
    }
}
function eventMapsInitializeStatic() {
    for (var eventItem, eventMap, figureMap, hrefVal, divHtml, isUseMapModal = typeof PersonStory.map.useMapModal != "undefined" && PersonStory.map.useMapModal !== null  && PersonStory.map.useMapModal.length > 0 && PersonStory.map.useMapModal === "true", i = 0; i < PersonStory.timeline.events.length; i++)
        if (eventItem = PersonStory.timeline.events[i],
        eventMap = eventItem.EventMapMapData,
        eventMap && eventMap.MapImageUrl && eventMap.MapUrl && (figureMap = $("#figureMap" + i),
        figureMap.show(),
        hrefVal = "javascript:$('.mapFigure .photoOverlayButton').hide();$('#photoOverlayButton" + i + "').hide();eventMapsInitialize();lifeEventsMapInitialize();",
        isUseMapModal && ($("#photoOverlayButton" + i).show(),
        hrefVal = "javascript:showEventMapModal('" + i + "');"),
        divHtml = '<a class="ancBtn silver photoOverlayButton" id="photoOverlayButton' + i + '" style="display:inline-block;" href="' + hrefVal + '">' + PersonStory.text.interactWithMap + '<\/a><img alt="Map" class="staticMap" id="staticMapJSONNarrative' + i + '" />',
        figureMap.html(divHtml),
        $("figure.loading").removeClass("loading"),
        typeof L != "undefined")) {
            var geoJson = {
                type: "FeatureCollection",
                features: [{
                    type: "Feature",
                    properties: {
                        markerSymbol: eventMap.PinIcon,
                        markerColor: eventMap.PinColor,
                        markerSize: "medium",
                        markerType: eventMap.PinTitle.substr(0, eventMap.PinTitle.indexOf("<"))
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [eventMap.CenterLongitude, eventMap.CenterLatitude]
                    }
                }]
            }
              , bounds = geojsonExtent(geoJson)
              , size = [710, 228]
              , vp = geoViewport.viewport(bounds, size)
              , pins = "pin-m-" + geoJson.features[0].properties.markerSymbol + "+" + geoJson.features[0].properties.markerColor + "(" + geoJson.features[0].geometry.coordinates.join(",") + ")";
            $("#staticMapJSONNarrative" + i).attr("src", "https://api.tiles.mapbox.com/v3/" + PersonStory.map.account + "." + PersonStory.map.handleBase + "," + PersonStory.map.account + "." + PersonStory.map.handleLabels + "/" + pins + "/" + vp.center.join(",") + ",7/" + size.join("x") + ".jpg70")
        }
}
function individualEventMapsInitializeStatic(mapId, eventMapMapData) {
    var isUseMapModal = typeof PersonStory.map.useMapModal != "undefined" && PersonStory.map.useMapModal !== null  && PersonStory.map.useMapModal.length > 0 && PersonStory.map.useMapModal === "true", eventMap = eventMapMapData, figureMap, hrefVal, divHtml;
    if (eventMap && eventMap.MapImageUrl && eventMap.MapUrl && (PersonStory.timeline.events[mapId].EventMapMapData = eventMapMapData,
    figureMap = $("#figureMap" + mapId),
    figureMap.show(),
    hrefVal = "javascript:$('.mapFigure .photoOverlayButton').hide();$('#photoOverlayButton" + mapId + "').hide();eventMapsInitialize();lifeEventsMapInitialize();",
    isUseMapModal && (isUseMapModal && ($("#mapJSONNarrativeModalTemp" + mapId).length && $("#mapJSONNarrativeModalTemp" + mapId).length !== 0 || $('<div id="mapJSONNarrativeModalTemp' + mapId + '"><div id="mapJSONNarrativeModal' + mapId + '" style="height:0px;"><\/div>').appendTo("body")),
    $("#mapJSONNarrativeModal" + mapId).html(""),
    $("#photoOverlayButton" + mapId).show(),
    hrefVal = "javascript:showEventMapModal('" + mapId + "');"),
    divHtml = '<a class="ancBtn silver photoOverlayButton" id="photoOverlayButton' + mapId + '" style="display:inline-block;" href="' + hrefVal + '">' + PersonStory.text.interactWithMap + '<\/a><img  alt="Map" class="staticMap" id="staticMapJSONNarrative' + mapId + '" />',
    figureMap.html(divHtml),
    $("figure.loading").removeClass("loading"),
    typeof L != "undefined")) {
        var geoJson = {
            type: "FeatureCollection",
            features: [{
                type: "Feature",
                properties: {
                    markerSymbol: eventMap.PinIcon,
                    markerColor: eventMap.PinColor,
                    markerSize: "medium",
                    markerType: eventMap.PinTitle.substr(0, eventMap.PinTitle.indexOf("<"))
                },
                geometry: {
                    type: "Point",
                    coordinates: [eventMap.CenterLongitude, eventMap.CenterLatitude]
                }
            }]
        }
          , bounds = geojsonExtent(geoJson)
          , size = [710, 228]
          , vp = geoViewport.viewport(bounds, size)
          , pins = "pin-m-" + geoJson.features[0].properties.markerSymbol + "+" + geoJson.features[0].properties.markerColor + "(" + geoJson.features[0].geometry.coordinates.join(",") + ")";
        $("#staticMapJSONNarrative" + mapId).attr("src", "https://api.tiles.mapbox.com/v3/" + PersonStory.map.account + "." + PersonStory.map.handleBase + "," + PersonStory.map.account + "." + PersonStory.map.handleLabels + "/" + pins + "/" + vp.center.join(",") + ",7/" + size.join("x") + ".jpg70")
    }
}
function parseLongLatVals(arr) {
    for (var obj, result = [], i = 0; i < arr.length; i++)
        obj = {
            type: "Feature",
            properties: {
                details: arr[i].PinTitle,
                "marker-symbol": arr[i].PinIcon,
                "marker-color": arr[i].PinColor,
                "marker-size": "medium",
                "marker-type": arr[i].PinTitle.substr(0, arr[i].PinTitle.indexOf("<"))
            },
            geometry: {
                type: "Point",
                coordinates: [arr[i].Longitude, arr[i].Latitude]
            }
        },
        result.push(obj);
    return result
}
function parseLongLatValsStatic(arr) {
    for (var obj, result = [], i = 0; i < arr.length; i++)
        obj = {
            type: "Feature",
            properties: {
                details: arr[i].PinTitle,
                markerSymbol: arr[i].PinIcon,
                markerColor: arr[i].PinColor,
                markerSize: "medium",
                markerType: arr[i].PinTitle.substr(0, arr[i].PinTitle.indexOf("<"))
            },
            geometry: {
                type: "Point",
                coordinates: [arr[i].Longitude, arr[i].Latitude]
            }
        },
        result.push(obj);
    return result
}
function ancContentRemove() {}
$(function() {
    initializeLifeStoryMenuOptionsCallout();
    loadScripts(PersonStory.jsAssets, function() {
        window.setTimeout(initializeMapbox, 500)
    });
    $(".mapFigure, .mediaFigureMap").on("click", ".photoOverlayButton", function() {
        $(this).addClass("active")
    })
})
