function delCookie(cookie_name) {
    var exp = new Date;
    exp.setTime(exp.getTime() - 1);
    document.cookie = cookie_name + "=" + getCookie(cookie_name) + "; expires=" + exp.toGMTString()
}

function setCookie(cookie_name, cookie_val, cookie_path) {
    setCookieEx(cookie_name, cookie_val, cookie_path, null)
}

function setCookieEx(cookie_name, cookie_val, cookie_path, cookie_expires) {
    setCookieEx2(cookie_name, cookie_val, cookie_path, cookie_expires, null)
}

function setCookieEx2(cookie_name, cookie_val, cookie_path, cookie_expires, cookie_domain) {
    null != cookie_name && (cookie_name = cookie_name.toUpperCase());
    var new_cookie = cookie_name + "=" + cookie_val + ";";
    new_cookie += " path=";
    new_cookie += null != cookie_path ? cookie_path : "/";
    null != cookie_expires && (new_cookie += "; expires=" + cookie_expires);
    null != cookie_domain && (new_cookie += "; domain=" + cookie_domain);
    document.cookie = new_cookie
}

function getCookieVal(cookie_text, offset, delim) {
    var endstr = cookie_text.indexOf(delim, offset);
    return endstr == -1 && (endstr = cookie_text.length), decodeURIComponent(cookie_text.substring(offset, endstr))
}

function getCookie(cookie_name) {
    for (var arg = cookie_name.toLowerCase() + "=", alen = arg.length, clen = document.cookie.length, i = 0, j; i < clen;) {
        if (j = i + alen, document.cookie.substring(i, j).toLowerCase() == arg) return getCookieVal(document.cookie, j, ";");
        if (i = document.cookie.indexOf(" ", i) + 1, i == 0) break
    }
    return null
}

function getDictionaryCookie(cookie_name, key) {
    var dictionary = getCookie(cookie_name);
    if (null == dictionary) return null;
    var dict_src = dictionary.toLowerCase(),
        dict_key = key.toLowerCase() + "=",
        startPos = -1;
    do
        if (startPos = dict_src.indexOf(dict_key, startPos + 1), -1 != startPos && (0 == startPos || "&" == dict_src.charAt(startPos - 1))) return getCookieVal(dictionary, startPos + dict_key.length, "&");
    while (-1 != startPos);
    return null
}

function setDictionaryCookieEx(cookie_name, key, value, path, expires, domain) {
    var dictionary, dict_src, start_key, end_key;
    null != cookie_name && (cookie_name = cookie_name.toUpperCase());
    null != key && (key = key.toUpperCase());
    dictionary = getCookie(cookie_name);
    null == dictionary ? dictionary = key + "=" + value : (dict_src = dictionary.toLowerCase(), start_key = dict_src.indexOf(key.toLowerCase() + "="), -1 == start_key ? (dictionary.length > 0 && (dictionary = dictionary + "&"), dictionary = dictionary + key + "=" + value) : (end_key = dict_src.indexOf("&", start_key), -1 == end_key ? dictionary = 0 == start_key ? key + "=" + value : dictionary.substring(0, start_key) + key + "=" + value : (dict_src = dictionary, dictionary = "", start_key > 0 && (dictionary = dict_src.substring(0, start_key)), dictionary = dictionary + key + "=" + value, dictionary = dictionary + dict_src.substring(end_key))));
    setCookieEx2(cookie_name, dictionary, path, expires, domain)
}

function setDictionaryCookie(cookie_name, key, value, path, expires) {
    setDictionaryCookieEx(cookie_name, key, value, path, expires, null)
}

function setVarsCookie(key, value) {
    var exp = new Date;
    exp.setFullYear(exp.getFullYear() + 20, 0, 14);
    setDictionaryCookieEx("VARS", key, value, null, exp.toGMTString(), getRootDomain())
}

function getVarsCookie(key) {
    return getDictionaryCookie("VARS", key)
}

function getVars2Cookie(key) {
    return getDictionaryCookie("VARSESSION", key)
}

function areBrowserCookiesEnabled() {
    var cookie_name = "cookie_test";
    return (setCookie(cookie_name, "true", "/"), null == getCookie(cookie_name)) ? !1 : (delCookie(cookie_name), !0)
}

function isAOLEnvironment() {
    return -1 != navigator.userAgent.indexOf("AOL")
}

function GetPageScheme() {
    return null != document.location && null != document.location.href && document.location.href.toLowerCase().indexOf("https://") == 0 ? "https" : "http"
}

function getRootDomain() {
    var d = document.domain.split("."),
        n = d.length,
        t = d[n - 2] + "." + d[n - 1];
    return d[n - 1].length > 2 ? t : d[n - 2] == "com" || d[n - 2] == "co" ? d[n - 3] + "." + t : t
};

function initValidationStrings() {
    monthNamesAll = [$trees.res.getString("g.monthNamesJan"), $trees.res.getString("g.monthNamesFeb"), $trees.res.getString("g.monthNamesMar"), $trees.res.getString("g.monthNamesApr"), $trees.res.getString("g.monthNamesMay"), $trees.res.getString("g.monthNamesJun"), $trees.res.getString("g.monthNamesJul"), $trees.res.getString("g.monthNamesAug"), $trees.res.getString("g.monthNamesSep"), $trees.res.getString("g.monthNamesOct"), $trees.res.getString("g.monthNamesNov"), $trees.res.getString("g.monthNamesDec")];
    monthAbbrs = [$trees.res.getString("g.monthAbbrsJan"), $trees.res.getString("g.monthAbbrsFeb"), $trees.res.getString("g.monthAbbrsMar"), $trees.res.getString("g.monthAbbrsApr"), $trees.res.getString("g.monthAbbrsMay"), $trees.res.getString("g.monthAbbrsJun"), $trees.res.getString("g.monthAbbrsJul"), $trees.res.getString("g.monthAbbrsAug"), $trees.res.getString("g.monthAbbrsSep"), $trees.res.getString("g.monthAbbrsOct"), $trees.res.getString("g.monthAbbrsNov"), $trees.res.getString("g.monthAbbrsDec")];
    aboutAbbr = $trees.res.getString("g.dateAboutAbbr");
    beforeAbbr = $trees.res.getString("g.dateBeforeAbbr");
    afterAbbr = $trees.res.getString("g.dateAfterAbbr");
    betweenAbbr = $trees.res.getString("g.dateBetweenAbbr");
    conjunctionAbbr = $trees.res.getString("g.dateConjunctionAbbr");
    rangeAbbr = $trees.res.getString("g.dateRangeAbbr");
    unknown = $trees.res.getString("g.unknown");
    monthDayYearOrder = $trees.res.getString("g.monthDayYearOrder");
    warnDateYearTooBig = $trees.res.getString("g.warnDateYearTooBig");
    warnDateTwoMonths = $trees.res.getString("g.warnDateTwoMonths");
    warnDateDayWithoutMonth = $trees.res.getString("g.warnDateDayWithoutMonth");
    warnDateTwoDays = $trees.res.getString("g.warnDateTwoDays");
    warnDateTwoYears = $trees.res.getString("g.warnDateTwoYears");
    warnDateDayTooLarge = $trees.res.getString("g.warnDateDayTooLarge");
    warnDateMonthTooLarge = $trees.res.getString("g.warnDateMonthTooLarge");
    warnDateInvalidMonth = $trees.res.getString("g.warnDateInvalidMonth");
    warnDateBirthBeforeMother = $trees.res.getString("g.warnDateBirthBeforeMother");
    warnDateBirthAfterMother = $trees.res.getString("g.warnDateBirthAfterMother");
    warnDateBirthBeforeFather = $trees.res.getString("g.warnDateBirthBeforeFather");
    warnDateBirthAfterFather = $trees.res.getString("g.warnDateBirthAfterFather");
    warnDateBirth120BeforeDeath = $trees.res.getString("g.warnDateBirth120BeforeDeath");
    warnDateDeath120AfterBirth = $trees.res.getString("g.warnDateDeath120AfterBirth");
    warnDateBeforeBirth = $trees.res.getString("g.warnDateBeforeBirth");
    warnDateAfterDeath = $trees.res.getString("g.warnDateAfterDeath");
    warnDateMayBeWrong = $trees.res.getString("g.warnDateMayBeWrong");
    warnStillUseIt = $trees.res.getString("g.warnStillUseIt");
    warnOfTheSpouse = $trees.res.getString("g.warnOfTheSpouse");
    badBirthDate = $trees.res.getString("g.badBirthDate");
    badDeathDate = $trees.res.getString("g.badDeathDate");
    badMarriageDate = $trees.res.getString("g.badMarriageDate");
    warnLastName = $trees.res.getString("g.warnLastName");
    warnNameEmpty = $trees.res.getString("g.warnNameEmpty");
    warnNameFather = $trees.res.getString("g.warnNameFather");
    warnNameMaiden = $trees.res.getString("g.warnNameMaiden");
    invalidNameChars = $trees.res.getString("g.invalidNameCharsJS");
    errorNameInvalidChar = $trees.res.getString("g.errorNameInvalidChar")
}

function validDate(dateInput, eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath, acceptRanges) {
    var input = dateInput.toLowerCase(),
        betweenModifier = !1,
        twoDates, results = [0, ""],
        parsedInput;
    if (input.length > 0) {
        if ((typeof unknown == "undefined" || unknown == null) && initValidationStrings(), unknown != null && input.indexOf(unknown.toLowerCase()) >= 0 && (input = ""), isDigit(input.charAt(0)) || (parsedInput = parseModifier(input, aboutAbbr), parsedInput.length < input.length ? input = parsedInput : (parsedInput = parseModifier(input, beforeAbbr), parsedInput.length < input.length ? input = parsedInput : (parsedInput = parseModifier(input, afterAbbr), parsedInput.length < input.length ? input = parsedInput : acceptRanges && (parsedInput = parseModifier(input, betweenAbbr), parsedInput.length < input.length && (input = parsedInput, betweenModifier = !0))))), acceptRanges && (betweenModifier ? (twoDates = new Array(2), twoDates = splitDateRange(input, !0)) : (twoDates = new Array(2), twoDates = splitDateRange(input, !1)), twoDates[0].length > 0 && twoDates[1].length > 0)) return results = validDate(twoDates[0], eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath), results[0] == 0 && (results = validDate(twoDates[1], eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath)), results;
        results = validateDate(input);
        results[0] == 0 && results[1].length > 0 && eventType.length > 0 && (results[0] = checkDates(results[1], results[2], results[3], eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath));
        results[0] != 0 && (results[1] = getWarning(results[0]))
    }
    return results
}

function getWarning(errorCode) {
    switch (errorCode) {
    case 1:
        return warnDateYearTooBig;
    case 2:
        return warnDateTwoMonths;
    case 3:
        return warnDateDayWithoutMonth;
    case 4:
        return warnDateTwoDays;
    case 5:
        return warnDateTwoMonths;
    case 6:
        return warnDateTwoYears;
    case 7:
        return warnDateDayTooLarge;
    case 8:
        return warnDateMonthTooLarge;
    case 9:
        return warnDateInvalidMonth;
    case 101:
        return warnDateBirthBeforeMother;
    case 102:
        return warnDateBirthAfterMother;
    case 103:
        return warnDateBirthBeforeFather;
    case 104:
        return warnDateBirthAfterFather;
    case 105:
        return warnDateBirth120BeforeDeath;
    case 106:
        return warnDateDeath120AfterBirth;
    case 107:
        return warnDateBeforeBirth;
    case 108:
        return warnDateAfterDeath;
    default:
        return ""
    }
}

function splitDateRange(dateStr, useConjunction) {
    var results = new Array(2),
        i = 0,
        abbrs, splitters, splitAbbr, pos;
    for (results[0] = "", results[1] = "", abbrs = useConjunction ? conjunctionAbbr : rangeAbbr, splitters = abbrs.split("|"), i = 0; i < splitters.length; i++) splitAbbr = splitters[i], pos = dateStr.indexOf(splitAbbr), pos > 0 && dateStr.length > pos + splitAbbr.length && (dateStr.indexOf(splitAbbr, pos + 1) != -1 || isLetter(dateStr.charAt(pos)) && isLetter(dateStr.charAt(pos - 1)) || isLetter(dateStr.charAt(pos + splitAbbr.length)) && isLetter(dateStr.charAt(pos + splitAbbr.length - 1)) || (results[0] = dateStr.substring(0, pos), results[1] = dateStr.substring(pos + splitAbbr.length)));
    return results
}

function validDateOwt(dateInput) {
    return validDate(dateInput, "", "", "", "", "", "", "", !1)
}

function validDateSimple(dateInput) {
    return validDate(dateInput, "", "", "", "", "", "", "", !0)
}

function validateDate(dateInput) {
    for (var results = new Array(4), date = getTokens(dateInput), possibleDays = [], possibleMonths = [], validMonthByName = 0, possibleYears = [], iMonth = 0, iDay = 0, iYear = 0, yearFoundFirst = !1, d = new Date, currYear = d.getFullYear(), i = 0, token, monthNumber, tmp, date = stripDayModifier(date), i = 0; i < date.length; i++)
        if (token = date[i], isDigit(token.charAt(0)))
            if (token <= 31 && possibleDays.push(token), token <= 12 && possibleMonths.push(token), token <= currYear) possibleDays.length == 0 && possibleMonths.length == 0 && (yearFoundFirst = !0), possibleYears.push(token);
            else return results[0] = 1, results;
    else if (monthNumber = monthTextToNumber(token.toLowerCase()), monthNumber > 0) {
        if (validMonthByName > 0) return results[0] = 2, results;
        validMonthByName = monthNumber
    } else return results[0] = 9, results;
    if (validMonthByName > 0 ? (iMonth = validMonthByName, possibleMonths.length = 0) : possibleMonths.length == 1 && (iMonth = possibleMonths[0], removeItem(possibleDays, iMonth), removeItem(possibleYears, iMonth)), possibleDays.length == 1) {
        if (iDay = possibleDays[0], removeItem(possibleYears, iDay), iMonth == 0) return results[0] = 3, results
    } else if (possibleDays.length > 1) switch (possibleDays.length) {
    case 2:
        if (possibleMonths.length == 2) iMonth = possibleMonths[0], iDay = possibleDays[1], iMonth != iDay && monthDayYearOrder.indexOf("D") < monthDayYearOrder.indexOf("M") && (yearFoundFirst == !1 || monthDayYearOrder.indexOf("Y") == 0) && (tmp = iDay, iDay = iMonth, iMonth = tmp), possibleDays[0] = iDay, possibleDays.length = 1, removeItem(possibleYears, iDay), possibleMonths[0] = iMonth, possibleMonths.length = 1, removeItem(possibleYears, iMonth);
        else if (possibleYears.length == 2) iDay = possibleDays[0], monthDayYearOrder.indexOf("Y") < monthDayYearOrder.indexOf("D") && (iDay = possibleDays[1], possibleDays[0] = iDay), possibleDays.length = 1, removeItem(possibleYears, iDay);
        else return results[0] = 4, results;
        break;
    case 3:
        possibleYears.length == 3 && possibleMonths.length == 0 && (iDay = possibleDays[monthDayYearOrder.indexOf("D")], iMonth = possibleDays[monthDayYearOrder.indexOf("M")], possibleYears[0] = possibleDays[monthDayYearOrder.indexOf("Y")], possibleYears.length = 1, possibleMonths[0] = iMonth, possibleMonths.length = 1, possibleDays[0] = iDay, possibleDays.length = 1);
        break;
    default:
        return results[0] = 4, results
    }
    if (possibleMonths.length > 1) return results[0] = 5, results;
    if (possibleYears.length == 1) iYear = possibleYears[0];
    else if (possibleYears.length > 1) return results[0] = possibleDays.length == 0 ? possibleMonths.length == 0 ? 6 : 7 : validMonthByName == 0 && possibleMonths.length == 0 ? 8 : 6, results;
    return iMonth > 0 && iDay > 0 && !isDayInBounds(iMonth, iDay, iYear) ? (results[0] = 7, results) : (results[0] = 0, results[1] = possibleYears.length > 0 ? iYear : "", results[2] = iMonth, results[3] = iDay, results)
}

function stripDayModifier(dateIn) {
    for (var newDate = [], i = 0, i = 0; i < dateIn.length; i++) isLetter(dateIn[i].charAt(0)) ? isLetter(dateIn[i].charAt(0)) && dateIn[i].length > 2 ? newDate.push(dateIn[i]) : dateIn[i] != "th" && dateIn[i] != "nd" && dateIn[i] != "rd" && dateIn[i] != "st" && dateIn[i].length > 2 && newDate.push(dateIn[i]) : newDate.push(dateIn[i]);
    return newDate
}

function monthTextToNumber(mon) {
    for (var possibleMonth = 0, i = 0, abbrs, monLower, i = 0; i < 12; i++) {
        for (abbrs = monthAbbrs[i].split(":"), j = 0; j < abbrs.length; j++)
            if (mon == abbrs[j]) return i + 1;
        if (monLower = ":" + mon, monthNamesAll[i].indexOf(monLower) >= 0) {
            if (possibleMonth > 0) return 0;
            possibleMonth = i + 1
        }
    }
    return possibleMonth
}

function parseModifier(str, modifierList) {
    for (var lstr = str.toLowerCase(), modifiers = modifierList.split("|"), i = 0, i = 0; i < modifiers.length; i++)
        if (lstr.substring(0, modifiers[i].length + 1) == modifiers[i] + " ") return str.substring(modifiers[i].length + 1);
    return str
}

function checkDates(year, month, day, eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath) {
    var bdate = null,
        ddate = null,
        fdate = null,
        mdate = null;
    if (eventType == "birth") {
        if (motherBirth != null && motherBirth.length > 0 && (mdate = validateDate(motherBirth), mdate[0] == 0 && mdate[1].length > 0 && year < parseInt(mdate[1], 10) + 15)) return 101;
        if (motherDeath != null && motherDeath.length > 0 && (mdate = validateDate(motherDeath), mdate[0] == 0 && mdate[1].length > 0 && year > parseInt(mdate[1], 10))) return 102;
        if (fatherBirth != null && fatherBirth.length > 0 && (fdate = validateDate(fatherBirth), fdate[0] == 0 && fdate[1].length > 0 && year < parseInt(fdate[1], 10) + 17)) return 103;
        if (fatherDeath != null && fatherDeath.length > 0 && (fdate = validateDate(fatherDeath), fdate[0] == 0 && fdate[1].length > 0 && year > parseInt(fdate[1], 10) + 1)) return 104;
        if (ddate == null && ownDeath != null && ownDeath.length > 0 && (ddate = validateDate(ownDeath)), ddate != null && ddate[0] == 0 && ddate[1].length > 0 && year < parseInt(ddate[1], 10) - 120) return 105
    } else {
        if (bdate == null && ownBirth != null && ownBirth.length > 0 && (bdate = validateDate(ownBirth)), eventType == "death" && bdate != null && bdate[0] == 0 && bdate[1].length > 0 && year > parseInt(bdate[1], 10) + 120) return 106;
        if (bdate != null && bdate[0] == 0 && dateCompare(year, month, day, bdate[1], bdate[2], bdate[3]) == -1) return 107
    }
    return eventType != "death" && eventType != "burial" && eventType != "cremation" && eventType != "funeral" && (ddate == null && ownDeath.length > 0 && (ddate = validateDate(ownDeath)), ddate != null && ddate[0] == 0 && dateCompare(year, month, day, ddate[1], ddate[2], ddate[3]) == 1) ? 108 : 0
}

function dateCompare(year1, month1, day1, year2, month2, day2) {
    var retVal = 0;
    return year1 != null && year1.length > 0 && year2 != null && year2.length > 0 && (parseInt(year1, 10) < parseInt(year2, 10) ? retVal = -1 : parseInt(year1, 10) > parseInt(year2, 10) ? retVal = 1 : month1 != null && month1 > 0 && month2 != null && month2 > 0 && (parseInt(month1, 10) < parseInt(month2, 10) ? retVal = -1 : parseInt(month1, 10) > parseInt(month2, 10) ? retVal = 1 : day1 != null && day1.length > 0 && day2 != null && day2.length > 0 && (parseInt(day1, 10) < parseInt(day2, 10) ? retVal = -1 : parseInt(day1, 10) > parseInt(day2, 10) && (retVal = 1)))), retVal
}

function getTokens(str) {
    for (var output = [], token = "", doingNumber = !1, doingText = !1, i = 0, c, i = 0; i < str.length; i++) c = str.charAt(i), isDigit(c) ? (doingText ? (output.push(token), token = c, doingText = !1) : token += c, doingNumber = !0) : " /-.,:;".indexOf(c) != -1 ? token.length > 0 && (output.push(token), token = "", doingText = !1, doingNumber = !1) : (doingNumber ? (output.push(token), token = c, doingNumber = !1) : token += c, doingText = !0);
    return token.length > 0 && output.push(token), output
}

function isDigit(n) {
    return n < "0" || n > "9" ? !1 : !0
}

function isLetter(n) {
    return n >= "a" && n <= "z" || n >= "A" && n <= "Z" ? !0 : !1
}

function removeItem(array, item) {
    for (var i = 0, j, i = 0; i < array.length; i++)
        if (array[i] == item) {
            for (j = 0, j = i; j < array.length - 1; j++) array[j] = array[j + 1];
            array.length--
        }
    return array
}

function isDayInBounds(month, day, year) {
    if (day < 1) return !1;
    switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
        return day <= 30;
    case 2:
        var febDays = 29;
        return year > 0 && (year % 4 != 0 ? febDays = 28 : year % 400 == 0 ? febDays = 29 : year % 100 == 0 && (febDays = 28)), day <= febDays;
    default:
        return day <= 31
    }
}

function checkForInvalidChar(s) {
    for (var i = 0, i = 0; i < s.length; i++)
        if (invalidNameChars.indexOf(s.charAt(i)) >= 0) return s.charAt(i);
    return ""
}

function validateSurname(surname, fatherSurname, husbandSurname) {
    var lastname = surname.toLowerCase(),
        father = fatherSurname.toLowerCase(),
        husband = husbandSurname.toLowerCase(),
        retVal = "";
    return father.length > 0 ? lastname != father && (retVal = nameMatch(lastname, husband) ? warnNameMaiden : warnNameFather) : nameMatch(lastname, husband) && (retVal = warnNameMaiden), retVal
}

function nameMatch(name, nameList) {
    var i = 0,
        names;
    if (name.length > 0)
        for (names = nameList.split(";"), i = 0; i < names.length; i++)
            if (name == names[i]) return !0;
    return !1
}
var monthNamesAll, monthAbbrs, aboutAbbr, beforeAbbr, afterAbbr, betweenAbbr, conjunctionAbbr, rangeAbbr, unknown, monthDayYearOrder, warnDateYearTooBig, warnDateTwoMonths, warnDateDayWithoutMonth, warnDateTwoDays, warnDateTwoYears, warnDateDayTooLarge, warnDateMonthTooLarge, warnDateInvalidMonth, warnDateBirthBeforeMother, warnDateBirthAfterMother, warnDateBirthBeforeFather, warnDateBirthAfterFather, warnDateBirth120BeforeDeath, warnDateDeath120AfterBirth, warnDateBeforeBirth, warnDateAfterDeath, warnDateMayBeWrong, warnStillUseIt, warnOfTheSpouse, badBirthDate, badDeathDate, badMarriageDate, warnLastName, warnNameFather, warnNameMaiden, invalidNameChars, errorNameInvalidChar, $val = {};

function loadJSFile(file) {
    if (!hasJSFile(file)) {
        var fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", file);
        document.getElementsByTagName("head").item(0).appendChild(fileref)
    }
}

function loadCSSFile(file) {
    if (!hasCSSFile(file)) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", file);
        document.getElementsByTagName("head").item(0).appendChild(fileref)
    }
}

function hasJSFile(file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("script"), i = 0; i < array.length; i++)
            if (array.item(i).src != null && array.item(i).src.toLowerCase() == file.toLowerCase()) return !0
    } catch (e) {}
    return !1
}

function hasCSSFile(file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("link"), i = 0; i < array.length; i++)
            if (array.item(i).href != null && array.item(i).href.toLowerCase() == file.toLowerCase()) return !0
    } catch (e) {}
    return !1
}

function loadAudioFiles() {
    audioFilesLoaded || (audioFilesLoaded = !0, $Anc.load({
        type: "audiodialog"
    }))
}

function loadAddPersonFiles() {
    addPersonFilesLoaded || (addPersonFilesLoaded = !0, loadCSSFile(v_treesCacheUrl + "Legacy/pt/modal_add.css"), $.getScript(v_treesCacheUrl + "tmp/addPerson.js"), $.getScript(v_treesCacheUrl + "Legacy/validation.js"))
}

function addPersonOnDemand(tid, pid, sid, rel, msg, basePage, ret, pg, cnt) {
    if (typeof addPerson == "function") addPerson(tid, pid, sid, rel, msg, basePage, ret, pg);
    else {
        if (typeof cnt == "undefined") var cnt = 0;
        cnt++;
        cnt > 25 && (addPersonFilesLoaded = !1, cnt = 0);
        loadAddPersonFiles();
        setTimeout("addPersonOnDemand('" + tid + "', '" + pid + "', '" + sid + "', '" + rel + "', '" + msg + "', '" + basePage + "', '" + ret + "', '" + pg + "'," + cnt + ")", 200)
    }
}

function AddAudioStoryOnDemand(param1, cnt) {
    typeof AddAudioStory == "function" ? AddAudioStory(param1, audioAdded) : (cnt++, cnt > 25 && (audioFilesLoaded = !1, cnt = 0), loadAudioFiles(), setTimeout("AddAudioStoryOnDemand('" + param1 + "'," + cnt + ")", 200))
}

function PreloadYui(yuiUrl) {
    var baseUrl = "http://yui.yahooapis.com/2.7.0";
    typeof yuiUrl != "undefined" && (baseUrl = yuiUrl);
    baseUrl += "/build/";
    loadJSFile(baseUrl + "utilities/utilities.js");
    loadJSFile(baseUrl + "container/container-min.js");
    loadJSFile(baseUrl + "datasource/datasource-min.js");
    loadJSFile(baseUrl + "autocomplete/autocomplete-min.js")
}

function PreloadPedigreeFiles() {
    loadCSSFile(v_treesCacheUrl + "Legacy/trees_modal.css");
    loadCSSFile(v_treesCacheUrl + "Legacy/pt/heading.css");
    loadCSSFile(v_treesCacheUrl + "Legacy/pt/hints.css");
    loadCSSFile(v_treesCacheUrl + "Legacy/pt/hints_IE_hack.css");
    $.getScript(v_treesCacheUrl + "Legacy/hints.js");
    $.getScript(v_treesCacheUrl + "Legacy/pedigree.js");
    $.getScript(v_treesCacheUrl + "Legacy/trees_modal.js")
}
var audioFilesLoaded = !1,
    addPersonFilesLoaded = !1;

function loadJSFile(file) {
    if (!hasJSFile(file)) {
        var fileref = document.createElement("script");
        fileref.setAttribute("type", "text/javascript");
        fileref.setAttribute("src", file);
        document.getElementsByTagName("head").item(0).appendChild(fileref)
    }
}

function loadCSSFile(file) {
    if (!hasCSSFile(file)) {
        var fileref = document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", file);
        document.getElementsByTagName("head").item(0).appendChild(fileref)
    }
}

function hasJSFile(file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("script"), i = 0; i < array.length; i++)
            if (array.item(i).src != null && array.item(i).src.toLowerCase() == file.toLowerCase()) return !0
    } catch (e) {}
    return !1
}

function hasCSSFile(file) {
    var array, i;
    try {
        for (array = document.getElementsByTagName("link"), i = 0; i < array.length; i++)
            if (array.item(i).href != null && array.item(i).href.toLowerCase() == file.toLowerCase()) return !0
    } catch (e) {}
    return !1
}

function loadAddPersonFiles(info) {
    loadCSSFile(v_treesCacheUrl + "dialogs.css");
    v_isIE7 === "True" && loadCSSFile(v_treesCacheUrl + "dialogsie7.css");
    v_isDESite === "True" && loadCSSFile(v_treesCacheUrl + "dialogsde.css");
    v_isCAFRSite === "True" && loadCSSFile(v_treesCacheUrl + "dialogscafr.css");
    v_useNewAddDialogs === "True" ? $Anc.load({
        type: "addfamilydialogex",
        onSuccess: addPersonLoadSuccess,
        info: info
    }) : $Anc.load({
        type: "addfamilydialog",
        onSuccess: addPersonLoadSuccess,
        info: info
    })
}

function addPersonOnDemand(tid, pid, sid, rel, pgStkArgs) {
    var info = {
        rel: rel,
        tid: tid,
        pid: pid,
        sid: sid,
        pageStackArgs: pgStkArgs
    };
    $trees.addFamilyDialog != null && typeof $trees.addFamilyDialog.addRelation == "function" ? (initValidationStrings(), info.rel === "M" ? $trees.addFamilyDialog.addBrother(info) : info.rel === "F" ? $trees.addFamilyDialog.addSister(info) : $trees.addFamilyDialog.addRelation(info)) : loadAddPersonFiles(info)
}

function addPersonOnDemandLegacy(tid, pid, sid, rel, msg, basePage, pgStkArgs, cnt) {
    if (typeof addPerson == "function") addPerson(tid, pid, sid, rel, msg, basePage, pgStkArgs);
    else {
        if (typeof cnt == "undefined") var cnt = 0;
        cnt++;
        cnt > 25 && (addPersonFilesLoadedLegacy = !1, cnt = 0);
        loadAddPersonFilesLegacy();
        setTimeout("addPersonOnDemandLegacy('" + tid + "', '" + pid + "', '" + sid + "', '" + rel + "', '" + msg + "', '" + basePage + "', '" + pgStkArgs + "'," + cnt + ")", 200)
    }
}

function loadAddPersonFilesLegacy() {
    addPersonFilesLoadedLegacy || (addPersonFilesLoadedLegacy = !0, $Anc.load({
        type: "addpersondialog"
    }))
}

function addPersonLoadSuccess() {
    initValidationStrings();
    this.info.rel ? this.info.rel === "M" ? $trees.addFamilyDialog.addBrother(this.info) : this.info.rel === "F" ? $trees.addFamilyDialog.addSister(this.info) : $trees.addFamilyDialog.addRelation(this.info) : ($trees.addFamilyDialog.selectRelative(this.info.tid, this.info.pid, this.info.pageStackArgs), $.modal.center())
}

function addPersonTVOnDemand(tid, pid, pgStkArgs) {
    var info = {
        tid: tid,
        pid: pid,
        pageStackArgs: pgStkArgs
    };
    loadAddPersonFiles(info)
}

function loadAddFamilyFiles(info) {
    loadCSSFile(v_treesCacheUrl + "dialogs.css");
    v_isIE7 === "True" && loadCSSFile(v_treesCacheUrl + "dialogsie7.css");
    v_isDESite === "True" && loadCSSFile(v_treesCacheUrl + "dialogsde.css");
    v_isCAFRSite === "True" && loadCSSFile(v_treesCacheUrl + "dialogscafr.css");
    v_useNewAddDialogs === "True" ? $Anc.load({
        type: "addfamilydialogex",
        onSuccess: addFamilyLoadSuccess,
        info: info
    }) : $Anc.load({
        type: "addfamilydialog",
        onSuccess: addFamilyLoadSuccess,
        info: info
    })
}

function addFamilyOnDemand(tid, pid, pgStkArgs) {
    var info = {
        tid: tid,
        pid: pid,
        pageStackArgs: pgStkArgs
    };
    $trees.addFamilyDialog != null && typeof $trees.addFamilyDialog.choose == "function" ? $trees.addFamilyDialog.choose(info) : loadAddFamilyFiles(info)
}

function addFamilyLoadSuccess() {
    initValidationStrings();
    $trees.addFamilyDialog.choose(this.info)
}

function loadEditPersonFiles(tid, pid, pgStkArgs) {
    loadCSSFile(v_treesCacheUrl + "uimenu.css");
    loadCSSFile(v_treesCacheUrl + "dialogs.css");
    v_isIE7 === "True" && loadCSSFile(v_treesCacheUrl + "dialogsie7.css");
    v_isDESite === "True" && loadCSSFile(v_treesCacheUrl + "dialogsde.css");
    v_isCAFRSite === "True" && loadCSSFile(v_treesCacheUrl + "dialogscafr.css");
    var script1 = $.ajax({
            url: "http://yui.yahooapis.com/combo?2.8.0/build/container/container-min.js",
            cache: !0,
            dataType: "script"
        }),
        prefix = "x" + new RegExp("http://[^/]+(.*/cdn)").exec(v_treesCacheUrl)[1] + "/",
        script2 = $.getScript(v_cache + "lib/tgn/combo.ashx?" + prefix + "validation.js&" + prefix + "viewer/js/dialogmanagerall.js&" + prefix + "treedialogs.js&" + prefix + "editdialog.js&" + prefix + "plugin/jquery.ancautocomplete.js");
    jQuery.when(script1, script2).done(function () {
        editPersonLoadSuccess.call({
            tid: tid,
            pid: pid,
            pgStkArgs: pgStkArgs
        })
    })
}

function editDialogOnDemand(tid, pid, pgStkArgs) {
    $trees.editDialog != null && typeof $trees.editDialog.show == "function" ? ($trees.editDialog.show(tid, pid, pgStkArgs), $.modal.center()) : loadEditPersonFiles(tid, pid, pgStkArgs)
}

function editPersonLoadSuccess() {
    initValidationStrings();
    $trees.editDialog.show(this.tid, this.pid, this.pgStkArgs);
    $.modal.center()
}

function initClickCard(treesDomain, focusFunc, pageStackParams) {
    clickCardTreesDomain = treesDomain;
    clickCardFocusFunc = focusFunc;
    clickCardPageStackParams = pageStackParams
}

function loadClickCardFiles(elPosition, tid, pid) {
    if (!clickCardFilesLoaded) {
        clickCardFilesLoaded = !0;
        loadCSSFile(v_treesCacheUrl + "clickcard.css");
        var script1 = $.ajax({
                url: "http://yui.yahooapis.com/combo?2.8.0/build/container/container-min.js",
                cache: !0,
                dataType: "script"
            }),
            prefix = "x" + new RegExp("http://[^/]+(.*/cdn)").exec(v_treesCacheUrl)[1] + "/",
            script2 = $.getScript(v_cache + "lib/tgn/combo.ashx?" + prefix + "viewer/js/dialogmanagerall.js&" + prefix + "treedialogs.js&" + prefix + "clickcard.js");
        jQuery.when(script1, script2).done(function () {
            clickCardLoadSuccess.call({
                elPosition: elPosition,
                tid: tid,
                pid: pid
            })
        })
    }
}

function clickCardOnDemand(elPosition, tid, pid) {
    $trees.clickCard != null && typeof $trees.clickCard.show == "function" ? $trees.clickCard.show(elPosition, tid, pid) : loadClickCardFiles(elPosition, tid, pid)
}

function clickCardLoadSuccess() {
    $trees.clickCard.init(clickCardTreesDomain, clickCardFocusFunc, clickCardPageStackParams);
    $trees.clickCard.show(this.elPosition, this.tid, this.pid)
}

function loadAudioFiles() {
    $Anc.load({
        type: "audiodialog",
        onSuccess: addAudioLoadSuccess
    })
}

function AddAudioStoryOnDemand(param1) {
    typeof AddAudioStory == "function" ? AddAudioStory(param1, audioAdded) : loadAudioFiles()
}

function addAudioLoadSuccess() {
    AddAudioStory(param1, audioAdded)
}

function PreloadYui(yuiUrl) {
    var baseUrl = "http://yui.yahooapis.com/2.7.0";
    typeof yuiUrl != "undefined" && (baseUrl = yuiUrl);
    baseUrl += "/build/";
    loadJSFile(baseUrl + "utilities/utilities.js");
    loadJSFile(baseUrl + "container/container-min.js");
    loadJSFile(baseUrl + "datasource/datasource-min.js");
    loadJSFile(baseUrl + "autocomplete/autocomplete-min.js")
}

function PreloadPedigreeFiles() {
    $Anc.load({
        type: "pedigree"
    })
}
var addPersonFilesLoadedLegacy = !1,
    clickCardTreesDomain, clickCardFocusFunc, clickCardPageStackParams, clickCardFilesLoaded = !1;
if ($(document).ready(function () {
        var relationshipCalculators = $(".relationshipLink.firstPersonHint"),
            firstRcDiv;
        relationshipCalculators.length > 0 && (firstRcDiv = relationshipCalculators.first(), $RelCalc.getRelationshipData(firstRcDiv.attr("tid"), firstRcDiv.attr("pid"), firstRcDiv.attr("page"), !0, !1, firstRcDiv, $RelCalc.RetrieveSubsequentRelations))
    }), $RelCalc == undefined) {
    var $RelCalc = TGN.namespace("TGN.Ancestry.Trees.RelCalc"),
        mepidSelectTextBox;
    $RelCalc.error = "An error occurred.";
    $RelCalc.url = "";
    $RelCalc.CallingSource = "";
    $RelCalc.Page = "";
    $RelCalc.pid = null;
    $RelCalc.tid = null;
    $RelCalc.getRelationshipText = function (tid, pid, page, cacheOnly, forceRecalc, src) {
        $RelCalc.getRelationshipData(tid, pid, page, cacheOnly, forceRecalc, src, $RelCalc.BindToUI)
    };
    $RelCalc.getRelationshipData = function (tid, pid, page, cacheOnly, forceRecalc, src, callBack) {
        $.ajax({
            url: "/tree/" + tid + "/person/" + pid + "/getrelationshiptext",
            cache: !0,
            async: !0,
            type: "GET",
            data: {
                tid: tid,
                pid: pid,
                cacheOnly: cacheOnly,
                forceRecalc: forceRecalc,
                page: page
            },
            success: function (data) {
                data.state != "NoMePid" && callBack(data, pid, src)
            },
            error: function () {
                return null
            }
        })
    };
    $RelCalc.RetrieveSubsequentRelations = function (data, pid, src) {
        $RelCalc.BindToUI(data, pid, src);
        $(".relationshipLink.firstPersonHint").each(function (index) {
            index != 0 && data.state != "NoMePid" && data.state != "InValidAccess" && $RelCalc.getRelationshipText($(this).attr("tid"), $(this).attr("pid"), $(this).attr("page"), !0, !1, $(this))
        })
    };
    $RelCalc.BindToUI = function (data, pid, scr) {
        $(".relationshipStyle").show();
        $(scr).show().html(data.content);
        $(".relationshipLink." + pid).show().html(data.content)
    };
    $RelCalc.Init = function (url, name, page, nameStr, calcStr, src, pid, tid) {
        $RelCalc.pid = pid;
        $RelCalc.tid = tid;
        $RelCalc.Page = page;
        $RelCalc.CallingSource = src;
        $(window).resize(function () {
            $RelCalc.setLadderHeight()
        });
        $RelCalc.showModal(url, name, nameStr, calcStr)
    };
    $RelCalc.showModal = function (url, name, nameStr, calcStr) {
        var relCalcModal = $("#relCalcModal");
        relCalcModal && (relCalcModal.length === 0 && (relCalcModal = $("<div id='relCalcModal' style='display:none;'><\/div>").appendTo(document.body)), $RelCalc.url = url, $RelCalc.loading = "<div class='rCalcLadder' style='display:none;'><div>" + $RelCalc.format(nameStr, "<strong>" + name + "<\/strong>") + "<\/div><div><span class='flat_icon arrow2down_green'>&nbsp;<\/span><\/div><table class='center'><tr><td class='loading'><\/td><td>" + calcStr + "<\/td><\/tr><\/table><\/div>", relCalcModal.html("<div id='relCalcContent' style='display:none;'>" + $RelCalc.loading + "<\/div>"), $RelCalc.GetLadder($RelCalc.url + "getladder"))
    };
    $RelCalc.setLadderHeight = function () {
        var is_mac = /(iphone|ipod|ipad)/.test(navigator.userAgent.toLowerCase()),
            ladderDiv = $(".rCalcLadder"),
            height;
        ladderDiv && ladderDiv.length > 0 && (is_mac || (height = document.documentElement.clientHeight - 240, ladderDiv[0].style.maxHeight = height + "px"))
    };
    $RelCalc.GetLadder = function (ladderUrl, recalc) {
        $.ajax({
            url: ladderUrl,
            async: !0,
            type: "GET",
            beforeSend: function () {
                $RelCalc.setLoading()
            },
            success: function (data) {
                var e = document.getElementById("rCalcAction"),
                    relCalcContent, hiddenPidfield, topRel;
                e && (e.style.display = "block");
                data.selectMepidJSON == 1 ? (relCalcContent = $("#relCalcContent"), relCalcContent && (relCalcContent.css("display", "block"), relCalcContent.html(data.content)), $("#relCalcModal").modal({
                    width: 400,
                    onClose: function () {
                        $RelCalc.modalClosing()
                    }
                }), $RelCalc.setMepidTextBoxFocus(), $RelCalc.mepidTextBoxTypeAheadSetup(data.userId, data.treeId, data.typeOfRequest, data.hintText), hiddenPidfield = document.getElementById("1_hiddenPid"), hiddenPidfield.onchange = function () {
                    mePidSet()
                }) : ($("#relCalcContent").css("display", "block"), $("#relCalcContent").html(data), $("#relCalcModal").modal({
                    width: 400,
                    onClose: function () {
                        $RelCalc.modalClosing()
                    }
                }), $RelCalc.setLadderHeight(), $.modal.center(), topRel = document.getElementById("calculatedRelationship"), topRel && ($RelCalc.CallingSource != null && ($RelCalc.CallingSource.innerHTML = topRel.innerHTML), recalc && $("#recalcDoneCtr").css("display", "block")));
                $("#IsEnglishSite").val() != undefined ? $("#IsEnglishSite").val().toLowerCase() == "true" && $RelCalc.updateRelationshipText() : $RelCalc.updateRelationshipText();
                $trees.util.setPageTrackingName($RelCalc.Page, "Relationship Ladder")
            },
            error: function () {
                $RelCalc.displayError()
            }
        })
    };
    $RelCalc.updateRelationshipText = function () {
        document.URL.indexOf("hints") != -1 || document.URL.indexOf("hints") != -1 ? $RelCalc.getRelationshipText($RelCalc.tid, $RelCalc.pid, "All Hints", !0, !1, $(".cls_" + $RelCalc.pid)) : $RelCalc.getRelationshipText($RelCalc.tid, $RelCalc.pid, "sidepanel", !0, !1, $("#relationshipTextDiv"))
    };
    $RelCalc.modalClosing = function () {
        $RelCalc.Modal = null
    };
    $RelCalc.setLoading = function () {
        var e = document.getElementById("rCalcAction"),
            relCalcContent;
        e && (e.style.display = "none");
        relCalcContent = $("#relCalcContent");
        relCalcContent && relCalcContent.html($RelCalc.loading)
    };
    $RelCalc.displayError = function () {
        clearTimeout($RelCalc.timeoutId);
        var relCalcContent = $("#relCalcContent");
        relCalcContent && relCalcContent.html($RelCalc.error);
        $RelCalc.delayedClose()
    };
    $RelCalc.delayedClose = function () {
        setTimeout(function () {
            $.modal.close()
        }, 4e3)
    };
    $RelCalc.recalculate = function () {
        $('[data-modal-id="relCalcModal"]').remove();
        $RelCalc.GetLadder($RelCalc.url + "getladder/true", !0)
    };
    $RelCalc.selectMe = function () {
        $('[data-modal-id="relCalcModal"]').remove();
        $RelCalc.GetLadder($RelCalc.url + "selectMePid/0")
    };
    $RelCalc.toggleHelp = function () {
        $RelCalc.resetHelpItems();
        var recalc = document.getElementById("recalcDoneCtr");
        recalc && (recalc.style.display = "none");
        $Anc.ShowHide("rCalcHelp");
        $.modal.center()
    };
    $RelCalc.toggleHelpItem = function (id) {
        var e = document.getElementById("helpItem" + id);
        e !== null && (e.style.display == "block" ? (e.style.display = "none", e = document.getElementById("helpIcon" + id).className = "flat_icon arrow3right_green_small") : ($RelCalc.resetHelpItems(), document.getElementById("helpIcon" + id).className = "flat_icon arrow3down_green_small", e.style.display = "block"))
    };
    $RelCalc.resetHelpItems = function () {
        var i = 1;
        for (e = document.getElementById("helpItem" + i); e !== null;) e.style.display = "none", document.getElementById("helpIcon" + i).className = "flat_icon arrow3right_green_small", ++i, e = document.getElementById("helpItem" + i)
    };
    $RelCalc.format = function () {
        var str, i, re;
        if (arguments.length === 0) return null;
        for (str = arguments[0], i = 1; i < arguments.length; i++) re = new RegExp("\\{" + (i - 1) + "\\}", "gm"), str = str.replace(re, arguments[i]);
        return str
    };
    $RelCalc.selectFromTreeBrowse = function (selectFromTreeUrl) {
        window.open(selectFromTreeUrl, "", "toolbar=no,resizable=yes,scrollbars=yes,menubar=no,status=no,location=no,height=600,width=800")
    };
    $RelCalc.printLadder = function () {
        var printWindow = window.open($RelCalc.url + "printladder", "PrintWindow", "width=750,height=850,top=50,left=50,toolbars=no,scrollbars=yes,status=no,resizable=yes");
        printWindow.focus()
    };
    $RelCalc.mepidTextBoxTypeAheadSetup = function (userId, treeId, typeOfRequest, hintText) {
        if (document.getElementById("1_mepidNameTextBox") !== null) {
            mepidSelectTextBox = new AutoSuggestControl(document.getElementById("1_mepidNameTextBox"), document.getElementById("myContainer"), userId, treeId, typeOfRequest, document.getElementById("1_hiddenPid"), null, null, hintText);
            var mepidRelCalcModal = document.getElementById("relCalcModal");
            mepidRelCalcModal !== null && (mepidRelCalcModal.style.overflow = "visible");
            mepidSelectTextBox.myAutoComp.itemSelectEvent.subscribe($RelCalc.mePidSelectHandler);
            mepidSelectTextBox.myAutoComp.dataReturnEvent.subscribe($RelCalc.mePidChangedHandler)
        }
        return
    };
    $RelCalc.setMepidTextBoxFocus = function () {
        var mepidNameTextBox = document.getElementById("1_mepidNameTextBox");
        mepidNameTextBox !== null && (mepidNameTextBox.focus(), mepidNameTextBox.select())
    };
    $RelCalc.enableSelectButton = function () {
        document.getElementById("disabledSelectButton").style.display = "none";
        document.getElementById("enabledSelectButton").style.display = "inline-block"
    };
    $RelCalc.disableSelectButton = function () {
        document.getElementById("disabledSelectButton").style.display = "inline-block";
        document.getElementById("enabledSelectButton").style.display = "none"
    };
    $RelCalc.showNameNotFoundText = function () {
        document.getElementById("1_mepidNameTextBox").style.backgroundColor = "#feece6";
        document.getElementById("nameNotFoundText").style.display = "block";
        $RelCalc.disableSelectButton()
    };
    $RelCalc.hideNameNotFoundText = function () {
        document.getElementById("1_mepidNameTextBox").style.backgroundColor = "";
        document.getElementById("nameNotFoundText").style.display = "none"
    };
    $RelCalc.validateMepid = function (e) {
        var evt = e ? e : window.event,
            hiddenPid;
        return (evt.stopPropagation && evt.stopPropagation(), evt.cancelBubble != null && (evt.cancelBubble = !0), hiddenPid = document.getElementById("1_hiddenPid"), hiddenPid !== null && hiddenPid.value.length === 0) ? ($RelCalc.showNameNotFoundText(), !1) : ($RelCalc.GetLadder($RelCalc.url + "selectMePid/" + hiddenPid.value), $('div[data-modal-id="relCalcModal"]').remove(), !0)
    };
    $RelCalc.cancelSelectMepid = function () {
        $.modal.close();
        var currentAutoControl = document.getElementById("1_mepidNameTextBox");
        currentAutoControl !== null && (currentAutoControl.value = "")
    };
    $RelCalc.mePidChangedHandler = function (sType, aArgs) {
        var items = aArgs[2];
        items[0].pid !== "" ? $RelCalc.hideNameNotFoundText() : $RelCalc.showNameNotFoundText()
    };
    $RelCalc.mePidSelectHandler = function () {
        var currentAutoControl = document.getElementById("1_mepidNameTextBox"),
            hiddenPid = document.getElementById("1_hiddenPid");
        hiddenPid !== null && hiddenPid.value.length !== 0 && ($RelCalc.enableSelectButton(), $RelCalc.hideNameNotFoundText())
    };

    function myCallback(name, byear, dyear, pid) {
        var currentAutoControl = document.getElementById("1_mepidNameTextBox"),
            hiddenPid;
        currentAutoControl !== null && (hiddenPid = document.getElementById("1_hiddenPid"), hiddenPid !== null && (hiddenPid.value = pid), currentAutoControl.value = name + " (" + byear + " - " + dyear + ")", mepidSelectTextBox.myAutoComp.forceSelection = !1, $RelCalc.enableSelectButton())
    }
};
var $TreesFunc = {
    BandidoPlusModal: {
        show: function () {
            $genTreesModal.init("BandidoPlusModal", 600, "");
            $genTreesModal.create("BandidoPlusModal", "/modals/bandidoplus/tree/" + v_tid + "/person/" + v_pid, null);
            $("#modalClose").css("z-index", "3")
        }
    },
    ClickCard: {
        clickCard: null,
        hide: function () {
            $("#clickCard").hide()
        },
        show: function (tid, pid) {
            $TreesFunc.ClickCard.clickCard === null ? $TreesFunc.ClickCard.clickCard = $("<div id='clickCard' class='subCon subConShdw' style='display:none;position:absolute;z-index:888;'><div id='clickCardContent'><span style='margin:50px auto;width:30px;height:30px;display:block;position:relative;background-image: url(\"" + v_treesCacheUrl + "TreeMap/images/a-i-30-30-expansion.gif\");'><\/span><\/div><\/div>").appendTo(document.body) : $("#clickCardContent").html("<span style='margin:50px auto;width:30px;height:30px;display:block;position:relative;background-image: url(\"" + v_treesCacheUrl + "TreeMap/images/a-i-30-30-expansion.gif\");'><\/span>");
            var personCCIcon = $("#person_" + pid),
                pcciPOS = personCCIcon.offset();
            $("#clickCard").css({
                left: pcciPOS.left,
                top: pcciPOS.top
            }).show();
            $.ajax({
                url: "/tree/" + tid + "/person/" + pid + "/clickcard",
                cache: !1,
                type: "GET",
                success: function (data) {
                    var result = data[0];
                    $("#clickCardContent").html(result)
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    window.console != null && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                }
            })
        }
    },
    Family: {
        getSiblingsOnce: !0,
        showAddFamilyMemberModal: function (tidVal, pidVal, pageParams) {
            var url, addFamilySelector;
            v_tid = tidVal != null && tidVal != "" ? tidVal : v_tid;
            v_pid = pidVal != null && pidVal != "" ? pidVal : v_pid;
            v_pushPageParams = pageParams != null && pageParams != "" ? pageParams : v_pushPageParams;
            url = "http://" + v_treesDomain + "/fz/command.ashx?op=dialog&dialog=addfamily&tid=" + encodeURIComponent(v_tid) + "&pid=" + encodeURIComponent(v_pid) + v_pushPageParams;
            $genTreesModal.init("AddFamilyMemberModal", 400, "");
            $genTreesModal.create("AddFamilyMemberModal", url, null);
            addFamilySelector = $("#modal");
            addFamilySelector.length > 0 && addFamilySelector.show()
        },
        toggleInnerFamilyMembers: function () {
            $(".pageNav").removeClass("userChoseShowMembers").toggleClass("hideFamilyMembers");
            $(".pageNav").hasClass("hideFamilyMembers") || $(".pageNav").addClass("userChoseShowMembers")
        },
        toggleOuterFamilyMembers: function () {
            $(".pageNav").removeClass("hideFamilyMembers").toggleClass("userChoseShowMembers");
            $(".pageNav").hasClass("userChoseShowMembers") || $(".pageNav").addClass("hideFamilyMembers");
            $TreesFunc.Family.showSiblingsCard()
        },
        responseSuccessShSib: function (data) {
            var siblingData = jQuery.parseJSON(data),
                fullSiblings = siblingData.siblings.full,
                halfSiblings = siblingData.siblings.half,
                fullSibCount = typeof fullSiblings != "undefined" ? fullSiblings.length : 0,
                halfSibCount = typeof halfSiblings != "undefined" ? halfSiblings.length : 0,
                sibDataDL, sib, iFull, halfsibSpacer, iHalf;
            if ($TreesFunc.Family.showSiblingsHeader(), sibDataDL = $("#sibData"), fullSibCount > 0)
                for (iFull = 0; iFull < fullSibCount; iFull++) sib = fullSiblings[iFull], $TreesFunc.Family.buildSiblingNode(sibDataDL, sib);
            if (halfSibCount > 0)
                for (halfsibSpacer = "<h4>" + v_halfSiblings + "<\/h4>", sibDataDL.append($("<li>").addClass("halfSiblings").html(halfsibSpacer)), iHalf = 0; iHalf < halfSibCount; iHalf++) sib = halfSiblings[iHalf], $TreesFunc.Family.buildSiblingNode(sibDataDL, sib);
            fullSibCount == 0 && halfSibCount == 0 && sibDataDL.append($("<li>").addClass("noSiblings").html(v_noSiblings));
            $TreesFunc.Family.getSiblingsOnce = !1
        },
        buildSiblingNode: function (sibDataDL, sib) {
            var imgClass = "photo photoSize5 icon iconPerson";
            sib.gender == "M" && (imgClass = "photo photoSize5 icon iconMale");
            sib.gender == "F" && (imgClass = "photo photoSize5 icon iconFemale");
            var click = '<button class="link icon iconProfileCard" id="sibCC_' + sib.pid + '" onclick="clickCardOnDemand(\'sibCC_' + sib.pid + "', '" + v_tid + "', '" + sib.pid + '\');" type="button"><\/button>',
                spanHTML = "<dt><a href='javascript:$trees.util.gotoPerson(" + v_tid + "," + sib.pid + ");'>" + sib.name + "<\/a><\/dt><dd class='years'><small>" + sib.birthYear + "&nbsp;&ndash;&nbsp;" + sib.deathYear + "<\/small><\/dd>",
                validImg = sib.image32Url && sib.image32Url.length > 0;
            sibDataDL.append($("<li>").append($("<div>").addClass(validImg ? "photo photoSize5" : imgClass).append(validImg ? $("<img />").attr({
                src: sib.image32Url
            }) : "")).append($("<dl>").addClass("nameandyears").html(spanHTML)).append(click))
        },
        showSiblingsCard: function () {
            if ($TreesFunc.Family.getSiblingsOnce) {
                $TreesFunc.Family.showSiblingsHeader();
                var sibData = $("#sibData");
                sibData.append($("<li>").attr({
                    id: "processLoader"
                }).html("<div class='loading loadingSmall'><\/div>"));
                $.ajax({
                    url: "/PTgetsiblings.ashx?pid=" + v_pid + "&tid=" + v_tid + "&idHalf=true",
                    cache: !1,
                    type: "GET",
                    success: function (data) {
                        $("#processLoader").hide();
                        $TreesFunc.Family.responseSuccessShSib(data)
                    },
                    error: function (xhr, ajaxOptions, thrownError) {
                        window.console != null && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                    }
                })
            }
        },
        showSiblingsHeader: function () {
            $("#sibSection").append($("<ul>").attr({
                id: "sibData"
            }))
        }
    },
    FamilySearch: {
        loadWidget: function () {
            var qs = document.location.search || "";
            qs += (qs ? "&" : "?") + "fsid=" + $("#familySearchId").val();
            $.ajax({
                cache: !1,
                url: "/tree/" + v_tid + "/person/" + v_pid + "/fs/personwidget" + qs
            }).done(function (response) {
                $("#fsWidget").html(response);
                $("#fsCancelDisconnect").click(function () {
                    $.modal.close()
                });
                $("#fsConfirmDisconnect").click(function () {
                    $.post(fsPerformDisconnectUrl).done(function (jsonResponse) {
                        jsonResponse.success ? ($("#familySearchId").val(""), $TreesFunc.FamilySearch.loadWidget(), $("#fsOrdStatus").callout("close"), domain === "trees" ? $.modal.close() : location.reload()) : $("#fsDisconnectFail").modal({
                            title: fsErrorDisconnecting
                        })
                    })
                });
                $("#fsDisconnect").click(function () {
                    $("#fsDisconnectConfirm").modal({
                        title: fsConfirmTitle
                    })
                })
            }).fail(function () {
                $("#fsWidget").empty()
            })
        }
    },
    Feedback: {
        _fzpFeedbackDialog: null,
        fzpInitFeedbackDialog: function () {
            var dlgXpos = YAHOO.util.Dom.getViewportWidth() / 2 - 235,
                dlgYpos, rendered;
            dlgXpos < 10 && (dlgXpos = 10);
            dlgXpos += YAHOO.util.Dom.getDocumentScrollLeft();
            dlgYpos = YAHOO.util.Dom.getViewportHeight() / 2 - 200;
            dlgYpos < 10 && (dlgYpos = 10);
            dlgYpos += YAHOO.util.Dom.getDocumentScrollTop();
            $TreesFunc.Feedback._fzpFeedbackDialog = new YAHOO.widget.Panel("feedbackModal", {
                width: "450px",
                zIndex: 9999,
                x: dlgXpos,
                y: dlgYpos,
                close: !0,
                fixedcenter: !0,
                draggable: !1,
                modal: !0,
                underlay: "none",
                visible: !1,
                constraintoviewport: !0
            });
            $TreesFunc.Feedback._fzpFeedbackDialog.setHeader("");
            $TreesFunc.Feedback._fzpFeedbackDialog.setBody("");
            $TreesFunc.Feedback._fzpFeedbackDialog.setFooter("");
            rendered = $TreesFunc.Feedback._fzpFeedbackDialog.render(document.body)
        },
        fzpHideFeedbackDialog: function () {
            "undefined" != typeof $TreesFunc.Feedback._fzpFeedbackDialog && $TreesFunc.Feedback._fzpFeedbackDialog.cfg.setProperty("visible", !1)
        },
        fzpShowFeedbackDialog: function () {
            var fbmC, fbmMask;
            $TreesFunc.Feedback.fzpHideFeedbackDialog();
            $TreesFunc.Feedback._fzpFeedbackDialog.setHeader('<div class=""tl""><\/div><div class=""tr""><\/div><h3 class=""personName"">' + v_fzpDlgTitle + "<\/h3>");
            $TreesFunc.Feedback._fzpFeedbackDialog.setBody('<div class=""content""><h4>' + v_fzpDlgTypeLabel + '<\/h4><span style=""margin-left:5px;""><select id=""fbType""><option value=""0"">' + v_fzpDlgTypeGeneral + '<\/option><option value=""1"">' + v_fzpDlgTypeShare + '<\/option><option value=""2"">' + v_fzpDlgTypeReport + '<\/option><option value=""3"">' + v_fzpDlgTypePraise + "<\/option><\/select><\/span><br/><br/><h4>" + v_fzpDlgCommentLabel + '<\/h4><span><textarea id=""fbMessage"" style=""height:100px;width:97%;margin:0 0 10px 5px;""><\/textarea><\/span><br/><\/br/><div class=""padding4ButtonDiv"" style=""float: left; * padding: 7px 7px 0 0;""><a class=""tempCSS"" onclick=""$TreesFunc.Feedback.fzpSubmitFeedback();""><input type=""submit"" value=""' + v_fzpDlgSendButton + '"" class=""ancBtn orange"" /><\/a><\/div><div style=""float: left; padding: 7px 0 0 7px;"">' + v_or + '&nbsp;<a href=""javascript:$TreesFunc.Feedback.fzpHideFeedbackDialog();"">' + v_cancel + '<\/a><\/div><div class=""clearDiv""><\/div><\/div>');
            $TreesFunc.Feedback._fzpFeedbackDialog.setFooter('<div class=""bl""><\/div><div class=""br""><\/div>');
            $TreesFunc.Feedback._fzpFeedbackDialog.render(document.body);
            $TreesFunc.Feedback._fzpFeedbackDialog.cfg.setProperty("visible", !0);
            fbmC = document.getElementById("feedbackModal_c");
            fbmC && (fbmC.style.zIndex = "9999");
            fbmMask = document.getElementById("feedbackModal_mask");
            fbmMask && (fbmMask.style.zIndex = "9998")
        },
        fzpSubmitFeedback: function () {
            var d = YAHOO.util.Dom,
                type = d.get("fbType"),
                message = d.get("fbMessage"),
                msgText = message && message.value ? message.value.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : "",
                callback, params;
            !type || !type.value || 1 != type.value.length || 0 >= msgText.length || "undefined" != typeof YAHOO.util.Connect && (callback = {
                success: function () {
                    $TreesFunc.Feedback.fzpHideFeedbackDialog()
                },
                failure: function () {
                    $TreesFunc.Feedback.fzpHideFeedbackDialog()
                },
                timeout: 1500
            }, params = "type=" + encodeURIComponent(type.value) + "&msg=" + encodeURIComponent(msgText), YAHOO.util.Connect.asyncRequest("POST", "/fz/command.ashx?op=fzpfeedback", callback, params))
        }
    },
    Hints: {
        hintPopupRequest: function (tid, pid) {
            $.ajax({
                url: "/tree/" + tid + "/person/" + pid + "/hintspopup",
                cache: !1,
                type: "GET",
                success: function (result) {
                    $("#HintsPopupDiv").html(result.html);
                    $("#hintsPendingCount").length > 0 && $(".itemCountUpdate").each(function () {
                        this.innerHTML = $("#hintsPendingCount").val()
                    })
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    window.console != null && console.error(" status->" + xhr.status + " thrownError->" + thrownError)
                }
            })
        }
    },
    LivingModal: {
        show: function () {
            $genTreesModal.init("LivingModal", 400, "");
            $genTreesModal.create("LivingModal", "/modals/living/tree/" + v_tid + "/person/" + v_pid + "/option/0", null)
        }
    },
    Miscellaneous: {
        ftmLoad: function () {
            setTimeout(function () {
                v_pid != null && v_pid != "" && v_isFtm == "True" && typeof FTM_Init != "undefined" && FTM_Init("1030", v_pid, v_tid)
            }, 500)
        },
        hideOnKeyEvent: function () {
            $("#typeNameOfPerson").hide()
        },
        initPersonTypeAhead: function (inputBox) {
            var typeInstructionsElement = $("#typeAheadPersonInstructionText"),
                d, oTextbox;
            typeInstructionsElement.length === 0 && (typeInstructionsElement = $('<input id="typeAheadPersonInstructionText" value="' + v_typeAheadInstructions + '" type="hidden"/>'), typeInstructionsElement.insertAfter(inputBox));
            $("#typeAheadPersonInstructionText").val(v_typeAheadInstructions);
            $trees.util.setGotoTemplate(v_gotoPersonTemplateUrl);
            d = YAHOO.util.Dom;
            d.get("typeAheadPersonText").value = v_typeAheadInstructions;
            d.get("typeAheadPersonText") && typeof AutoSuggestControl != "undefined" && (oTextbox = new AutoSuggestControl(d.get("typeAheadPersonText"), d.get("typeAheadPersonContainer"), v_uid, v_tid, "name", d.get("typeAheadPersonHidden"), $TreesFunc.Miscellaneous.hideOnKeyEvent, $TreesFunc.Miscellaneous.showOnKeyEvent, v_typeAheadInstructions, "yui-ac-input", "yui-ac-input loading loadingSmall", "ancText yui-ac-input", 20, function (pid) {
                $trees.util.gotoPerson(v_tid, pid)
            }, 3, $TreesFunc.Miscellaneous.hideOnKeyEvent), oTextbox.autoSuggestOnblur());
            typeof closeMEDivs != "undefined" && closeMEDivs("typeAheadPersonContainer")
        },
        setupFindAPersonAutoComplete: function () {
            $trees.util.setGotoTemplate(v_setFocusUrl);
            $("#typeAheadPersonText").autocomplete({
                source: "/suggest/person?treeId=" + v_tid + "&excludePids=",
                key: "name",
                queryParameter: "term",
                dataType: "json",
                minLength: 3,
                maxResults: 10,
                customDisplay: function (data) {
                    var displayText = data.display;
                    return (data.raw.birth != "" || data.raw.death != "") && (displayText += " " + data.raw.birth + " - " + data.raw.death), {
                        value: data.value,
                        display: displayText
                    }
                },
                onItemSelect: function (itemData) {
                    itemData !== "" && $trees.util.gotoPerson(v_tid, itemData.PID)
                }
            })
        },
        closeFindAPersonAutoComplete: function () {
            $("#typeAheadPersonText").autocomplete("destroy")
        },
        printPersonView: function (url) {
            var printable = window.open(url, "", "scrollbars=yes,menubar=yes,height=800,width=1024,resizable=yes,toolbar=no")
        },
        showOnKeyEvent: function () {
            $("#typeNameOfPerson").show()
        }
    },
    Save: {
        hidePop: function (elementId) {
            $("#" + elementId).css("visibility", "hidden")
        },
        saveACopy: function (sourceTid, sourcePid, tid, pid, pgArgs) {
            var saveToSourceNode, saveRadio1, url;
            $("#saveBox").css("visibility", "hidden");
            saveToSourceNode = !1;
            sourceTid.length > 0 && sourcePid.length > 0 && (saveRadio1 = $("#saveRadio1"), saveRadio1.length > 0 && saveRadio1.is(":checked") && (saveToSourceNode = !0));
            saveToSourceNode ? (url = "/pt/MergeFamily2.aspx?tid=" + sourceTid + "&pid=" + sourcePid + "&stid=" + tid + "&spid=" + pid + pgArgs, window.location.href = url) : TGN.Ancestry.Trees.selectPerson.saveRecordToTree(attachToPerson)
        },
        saveLivingStatus: function (deceased, saveStatusUrl, treeViewerPage) {
            saveStatusUrl += deceased ? "0" : "1";
            $.ajax({
                url: saveStatusUrl,
                success: function () {
                    var aliveSpans = $(".aliveSpan");
                    aliveSpans.length > 0 && (deceased ? (aliveSpans[0].hide(), aliveSpans[1].show()) : (aliveSpans[0].show(), aliveSpans[1].hide()));
                    treeViewerPage && window.location.reload()
                }
            })
        },
        savePersonPop: function (thisCtl, sourceTid, sourcePid, tid, pid, pgArgs) {
            sourceTid.length == 0 ? $TreesFunc.Save.saveACopy(sourceTid, sourcePid, tid, pid, pgArgs) : $TreesFunc.Save.showPopRelativeBelowOffset(thisCtl, "#saveBox")
        },
        showPopRelativeBelowOffset: function (element, saveBoxId) {
            var savePhotoOffset = $(element).offset(),
                saveBoxPanel = $(saveBoxId);
            saveBoxPanel.css({
                right: savePhotoOffset.right - saveBoxPanel.width(),
                top: savePhotoOffset.top - saveBoxPanel.height(),
                visibility: "visible"
            })
        },
        saveThisPerson: function () {
            closeHover("moreOptMenu");
            TGN.Ancestry.Trees.selectPerson.saveRecordToTree(attachToPerson)
        }
    },
    ShoeBoxModal: {
        show: function () {
            $genTreesModal.init("ShoeboxModal", 600, "");
            $genTreesModal.create("ShoeboxModal", "/modals/shoebox/tree/" + v_tid + "/person/" + v_pid + "", null);
            $("#modalClose").css("z-index", "3")
        }
    }
}