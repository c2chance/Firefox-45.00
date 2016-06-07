function delCookie(cookie_name) {
    var exp = new Date;
    exp.setTime(exp.getTime() - 1);
    document.cookie = cookie_name + "=" + getCookie(cookie_name) + "; expires=" + exp.toGMTString()
}

function setCookie(cookie_name, cookie_val, cookie_path) {
    setCookieEx(cookie_name, cookie_val, cookie_path, null )
}

function setCookieEx(cookie_name, cookie_val, cookie_path, cookie_expires) {
    setCookieEx2(cookie_name, cookie_val, cookie_path, cookie_expires, null )
}

function setCookieEx2(cookie_name, cookie_val, cookie_path, cookie_expires, cookie_domain) {
    null  != cookie_name && (cookie_name = cookie_name.toUpperCase());
    var new_cookie = cookie_name + "=" + cookie_val + ";";
    new_cookie += " path=";
    new_cookie += null  != cookie_path ? cookie_path : "/";
    null  != cookie_expires && (new_cookie += "; expires=" + cookie_expires);
    null  != cookie_domain && (new_cookie += "; domain=" + cookie_domain);
    document.cookie = new_cookie
}

function getCookieVal(cookie_text, offset, delim) {
    var endstr = cookie_text.indexOf(delim, offset);
    return endstr == -1 && (endstr = cookie_text.length),
    decodeURIComponent(cookie_text.substring(offset, endstr))
}

function getCookie(cookie_name) {
    for (var arg = cookie_name.toLowerCase() + "=", alen = arg.length, clen = document.cookie.length, i = 0, j; i < clen; ) {
        if (j = i + alen,
        document.cookie.substring(i, j).toLowerCase() == arg)
            return getCookieVal(document.cookie, j, ";");
        if (i = document.cookie.indexOf(" ", i) + 1,
        i == 0)
            break
    }
    return null 
}

function getDictionaryCookie(cookie_name, key) {
    var dictionary = getCookie(cookie_name);
    if (null  == dictionary)
        return null ;
    var dict_src = dictionary.toLowerCase()
      , dict_key = key.toLowerCase() + "="
      , startPos = -1;
    do
        if (startPos = dict_src.indexOf(dict_key, startPos + 1),
        -1 != startPos && (0 == startPos || "&" == dict_src.charAt(startPos - 1)))
            return getCookieVal(dictionary, startPos + dict_key.length, "&");
    while (-1 != startPos);return null 
}

function setDictionaryCookieEx(cookie_name, key, value, path, expires, domain) {
    var dictionary, dict_src, start_key, end_key;
    null  != cookie_name && (cookie_name = cookie_name.toUpperCase());
    null  != key && (key = key.toUpperCase());
    dictionary = getCookie(cookie_name);
    null  == dictionary ? dictionary = key + "=" + value : (dict_src = dictionary.toLowerCase(),
    start_key = dict_src.indexOf(key.toLowerCase() + "="),
    -1 == start_key ? (dictionary.length > 0 && (dictionary = dictionary + "&"),
    dictionary = dictionary + key + "=" + value) : (end_key = dict_src.indexOf("&", start_key),
    -1 == end_key ? dictionary = 0 == start_key ? key + "=" + value : dictionary.substring(0, start_key) + key + "=" + value : (dict_src = dictionary,
    dictionary = "",
    start_key > 0 && (dictionary = dict_src.substring(0, start_key)),
    dictionary = dictionary + key + "=" + value,
    dictionary = dictionary + dict_src.substring(end_key))));
    setCookieEx2(cookie_name, dictionary, path, expires, domain)
}

function setDictionaryCookie(cookie_name, key, value, path, expires) {
    setDictionaryCookieEx(cookie_name, key, value, path, expires, null )
}

function setVarsCookie(key, value) {
    var exp = new Date;
    exp.setFullYear(exp.getFullYear() + 20, 0, 14);
    setDictionaryCookieEx("VARS", key, value, null , exp.toGMTString(), getRootDomain())
}

function getVarsCookie(key) {
    return getDictionaryCookie("VARS", key)
}

function getVars2Cookie(key) {
    return getDictionaryCookie("VARSESSION", key)
}

function areBrowserCookiesEnabled() {
    var cookie_name = "cookie_test";
    return (setCookie(cookie_name, "true", "/"),
    null  == getCookie(cookie_name)) ? !1 : (delCookie(cookie_name),
    !0)
}

function isAOLEnvironment() {
    return -1 != navigator.userAgent.indexOf("AOL")
}

function GetPageScheme() {
    return null  != document.location && null  != document.location.href && document.location.href.toLowerCase().indexOf("https://") == 0 ? "https" : "http"
}

function getRootDomain() {
    var d = document.domain.split(".")
      , n = d.length
      , t = d[n - 2] + "." + d[n - 1];
    return d[n - 1].length > 2 ? t : d[n - 2] == "com" || d[n - 2] == "co" ? d[n - 3] + "." + t : t
}
