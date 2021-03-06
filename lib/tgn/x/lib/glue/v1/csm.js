(function () {
    "use strict";
    function getQueryValues() {
        var pairs = location.search.slice(1).split("&"), pairsLength = pairs.length, urlArgs = {}, index = 0, pair;
        if (pairs[index].length)
            for (index = 0; index < pairsLength; index++)
                pair = pairs[index].split("="),
                urlArgs[pair[0]] = decodeURIComponent(pair[1] || "");
        return urlArgs
    }

    function saveStateToQueryString(componentId, data) {
        if (componentId) {
            var currentState = History.getState(), queryData = getQueryValues(), queryString = "", propertyName, propertyValue, parameterName, stateData = {}, componentState = {};
            for (propertyName in data)
                data.hasOwnProperty(propertyName) && (propertyValue = data[propertyName],
                parameterName = componentId + "." + propertyName,
                queryData[parameterName] = propertyValue);
            for (propertyName in queryData)
                queryData.hasOwnProperty(propertyName) && (queryString !== "" && (queryString += "&"),
                queryString += propertyName + "=" + queryData[propertyName],
                stateData[propertyName] = queryData[propertyName]);
            return componentState.id = componentId,
            componentState.data = stateData,
            componentState.tab = "csm",
            componentState.isCsm = !0,
            currentState || (currentState = {
                title: "csm"
            }),
            History.replaceState(componentState, currentState.title, window.location.href.split("?", 1).join("") + "?" + queryString),
            queryString
        }
    }

    function init() {
        if (window.acom && window.acom.bus) {
            window.acom.bus.on("csm::component::statechange", function (newStatus) {
                var componentId, componentWrapper, id;
                newStatus.component && (componentWrapper = newStatus.component.closest(".csm-component"),
                componentWrapper && (id = componentWrapper.data("csmcomponentid"),
                id && (componentId = id)));
                componentId && saveStateToQueryString(componentId, newStatus.data)
            });
            History.Adapter.bind(window, "statechange", function () {
                var state = History.getState(), queryData = {}, componentId, propertyName;
                if (window.acom && window.acom.bus && state && state.data && state.data.isCsm) {
                    if (state.data.id) {
                        componentId = state.data.id;
                        for (propertyName in state.data.data)
                            state.data.data.hasOwnProperty(propertyName) && (propertyName.indexOf(componentId + ".") === 0 ? queryData[propertyName.replace(componentId + ".", "")] = state.data.data[propertyName] : queryData[propertyName] = state.data.data[propertyName])
                    }
                    window.acom.bus.emit("csm::history::statechange", queryData)
                }
            })
        } else
            attempts < 5 && setTimeout(init, 1e3),
            attempts += 1
    }

    var attempts = 0;
    window.csmLoaded !== !0 && (window.csmLoaded = !0,
    init())
})()