$trees.LogObject = function(logUrl, logLevelToRecord) {
    this.init(logUrl, logLevelToRecord)
};

$trees.LogObject.prototype = {
    init: function(logUrl, logLevelToRecord) {
        this.LevelDebug = 5;
        this.LevelInfo = 4;
        this.LevelWarn = 3;
        this.LevelError = 2;
        this.LevelFatal = 1;
        this.LevelNames = ["", "Fatal", "Error", "Warn", "Info", "Debug"];
        this.logUrl = logUrl;
        this.logLevelToRecord = logLevelToRecord
    },
    debug: function(feature, message) {
        this.log(feature, message, this.LevelDebug)
    },
    info: function(feature, message) {
        this.log(feature, message, this.LevelInfo)
    },
    warn: function(feature, message) {
        this.log(feature, message, this.LevelWarn)
    },
    error: function(feature, message, err) {
        this.log(feature, message, this.LevelError, err)
    },
    fatal: function(feature, message, err) {
        this.log(feature, message, this.LevelFatal, err)
    },
    log: function(feature, message, logLevel, err) {
        var data;
        if (logLevel <= this.logLevelToRecord) {
            var logMessage = feature + " - " + message
              , lineNumber = 0
              , file = "";
            if (err && (logMessage += "\n \t\t",
            err.name && (logMessage += err.name + "\n"),
            err.responseText && (logMessage += "\nresponseText: " + err.responseText + "\n"),
            err.responseXml && (logMessage += "\nresponseXml: " + err.responseXml + "\n"),
            err.status && (logMessage += "\nstatus: " + err.status + "\n"),
            err.statusText && (logMessage += "\nstatusText: " + err.statusText + "\n"),
            err.message && (logMessage += "\nmessage: " + err.message + "\n"),
            err.stack && (logMessage += "stack: " + err.stack + "\n"),
            err.file && (file = err.file),
            err.lineNumber ? lineNumber = err.lineNumber : err.line ? lineNumber = err.line : err.number && (lineNumber = err.number)),
            this.logLevel === this.LevelDebug)
                switch (logLevel) {
                case this.LevelDebug:
                    console.debug(logMessage);
                    break;
                case this.LevelInfo:
                    console.info(logMessage);
                    break;
                case this.LevelWarn:
                    console.warn(logMessage);
                    break;
                case this.LevelError:
                    err || console.error(logMessage);
                    break;
                case this.LevelFatal:
                    err || console.error(logMessage)
                }
            data = encodeURI("level=" + this.getLevelName(logLevel) + "&feature=" + feature + (err.status ? "&status=" + err.status : "") + (err.status ? "&statusText=" + err.statusText : "") + (err.responseText ? "&responseText=" + err.responseText : "") + (err.responseXml ? "&responseXml=" + err.responseXml : "") + (err.argument ? "&argument=" + err.argument : "") + (err.getAllResponseHeaders ? "&allResponseHeaders=" + err.getAllResponseHeaders : "") + (err.message ? "&errorMessage=" + err.message : "") + "&message=" + logMessage + "&url=" + window.location.href + "&file=" + file + "&line=" + lineNumber);
            YAHOO.util.Connect.asyncRequest("POST", this.logUrl, null , data)
        }
    },
    getLevelName: function(logLevel) {
        var levelName = "";
        return logLevel > 0 && logLevel < this.LevelNames.length && (levelName = this.LevelNames[logLevel]),
        levelName
    }
};
$trees.logCreate = function(logUrl, logLevelToRecord) {
    "undefined" == typeof $trees.log && ($trees.log = new $trees.LogObject(logUrl,logLevelToRecord))
}
;
typeof console == "undefined" && (console = {
    log: function() {},
    debug: function() {},
    info: function() {},
    warn: function() {},
    error: function() {}
})
