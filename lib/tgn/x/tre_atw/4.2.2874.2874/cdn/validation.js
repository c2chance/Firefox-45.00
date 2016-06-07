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
    var input = dateInput.toLowerCase(), betweenModifier = !1, twoDates, results = [0, ""], parsedInput;
    if (input.length > 0) {
        if ((typeof unknown == "undefined" || unknown == null ) && initValidationStrings(),
        unknown != null  && input.indexOf(unknown.toLowerCase()) >= 0 && (input = ""),
        isDigit(input.charAt(0)) || (parsedInput = parseModifier(input, aboutAbbr),
        parsedInput.length < input.length ? input = parsedInput : (parsedInput = parseModifier(input, beforeAbbr),
        parsedInput.length < input.length ? input = parsedInput : (parsedInput = parseModifier(input, afterAbbr),
        parsedInput.length < input.length ? input = parsedInput : acceptRanges && (parsedInput = parseModifier(input, betweenAbbr),
        parsedInput.length < input.length && (input = parsedInput,
        betweenModifier = !0))))),
        acceptRanges && (betweenModifier ? (twoDates = new Array(2),
        twoDates = splitDateRange(input, !0)) : (twoDates = new Array(2),
        twoDates = splitDateRange(input, !1)),
        twoDates[0].length > 0 && twoDates[1].length > 0))
            return results = validDate(twoDates[0], eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath),
            results[0] == 0 && (results = validDate(twoDates[1], eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath)),
            results;
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
    var results = new Array(2), i = 0, abbrs, splitters, splitAbbr, pos;
    for (results[0] = "",
    results[1] = "",
    abbrs = useConjunction ? conjunctionAbbr : rangeAbbr,
    splitters = abbrs.split("|"),
    i = 0; i < splitters.length; i++)
        splitAbbr = splitters[i],
        pos = dateStr.indexOf(splitAbbr),
        pos > 0 && dateStr.length > pos + splitAbbr.length && (dateStr.indexOf(splitAbbr, pos + 1) != -1 || isLetter(dateStr.charAt(pos)) && isLetter(dateStr.charAt(pos - 1)) || isLetter(dateStr.charAt(pos + splitAbbr.length)) && isLetter(dateStr.charAt(pos + splitAbbr.length - 1)) || (results[0] = dateStr.substring(0, pos),
        results[1] = dateStr.substring(pos + splitAbbr.length)));
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
        if (token = date[i],
        isDigit(token.charAt(0)))
            if (token <= 31 && possibleDays.push(token),
            token <= 12 && possibleMonths.push(token),
            token <= currYear)
                possibleDays.length == 0 && possibleMonths.length == 0 && (yearFoundFirst = !0),
                possibleYears.push(token);
            else
                return results[0] = 1,
                results;
        else if (monthNumber = monthTextToNumber(token.toLowerCase()),
        monthNumber > 0) {
            if (validMonthByName > 0)
                return results[0] = 2,
                results;
            validMonthByName = monthNumber
        } else
            return results[0] = 9,
            results;
    if (validMonthByName > 0 ? (iMonth = validMonthByName,
    possibleMonths.length = 0) : possibleMonths.length == 1 && (iMonth = possibleMonths[0],
    removeItem(possibleDays, iMonth),
    removeItem(possibleYears, iMonth)),
    possibleDays.length == 1) {
        if (iDay = possibleDays[0],
        removeItem(possibleYears, iDay),
        iMonth == 0)
            return results[0] = 3,
            results
    } else if (possibleDays.length > 1)
        switch (possibleDays.length) {
        case 2:
            if (possibleMonths.length == 2)
                iMonth = possibleMonths[0],
                iDay = possibleDays[1],
                iMonth != iDay && monthDayYearOrder.indexOf("D") < monthDayYearOrder.indexOf("M") && (yearFoundFirst == !1 || monthDayYearOrder.indexOf("Y") == 0) && (tmp = iDay,
                iDay = iMonth,
                iMonth = tmp),
                possibleDays[0] = iDay,
                possibleDays.length = 1,
                removeItem(possibleYears, iDay),
                possibleMonths[0] = iMonth,
                possibleMonths.length = 1,
                removeItem(possibleYears, iMonth);
            else if (possibleYears.length == 2)
                iDay = possibleDays[0],
                monthDayYearOrder.indexOf("Y") < monthDayYearOrder.indexOf("D") && (iDay = possibleDays[1],
                possibleDays[0] = iDay),
                possibleDays.length = 1,
                removeItem(possibleYears, iDay);
            else
                return results[0] = 4,
                results;
            break;
        case 3:
            possibleYears.length == 3 && possibleMonths.length == 0 && (iDay = possibleDays[monthDayYearOrder.indexOf("D")],
            iMonth = possibleDays[monthDayYearOrder.indexOf("M")],
            possibleYears[0] = possibleDays[monthDayYearOrder.indexOf("Y")],
            possibleYears.length = 1,
            possibleMonths[0] = iMonth,
            possibleMonths.length = 1,
            possibleDays[0] = iDay,
            possibleDays.length = 1);
            break;
        default:
            return results[0] = 4,
            results
        }
    if (possibleMonths.length > 1)
        return results[0] = 5,
        results;
    if (possibleYears.length == 1)
        iYear = possibleYears[0];
    else if (possibleYears.length > 1)
        return results[0] = possibleDays.length == 0 ? possibleMonths.length == 0 ? 6 : 7 : validMonthByName == 0 && possibleMonths.length == 0 ? 8 : 6,
        results;
    return iMonth > 0 && iDay > 0 && !isDayInBounds(iMonth, iDay, iYear) ? (results[0] = 7,
    results) : (results[0] = 0,
    results[1] = possibleYears.length > 0 ? iYear : "",
    results[2] = iMonth,
    results[3] = iDay,
    results)
}

function stripDayModifier(dateIn) {
    for (var newDate = [], i = 0, i = 0; i < dateIn.length; i++)
        isLetter(dateIn[i].charAt(0)) ? isLetter(dateIn[i].charAt(0)) && dateIn[i].length > 2 ? newDate.push(dateIn[i]) : dateIn[i] != "th" && dateIn[i] != "nd" && dateIn[i] != "rd" && dateIn[i] != "st" && dateIn[i].length > 2 && newDate.push(dateIn[i]) : newDate.push(dateIn[i]);
    return newDate
}

function monthTextToNumber(mon) {
    for (var possibleMonth = 0, i = 0, abbrs, monLower, i = 0; i < 12; i++) {
        for (abbrs = monthAbbrs[i].split(":"),
        j = 0; j < abbrs.length; j++)
            if (mon == abbrs[j])
                return i + 1;
        if (monLower = ":" + mon,
        monthNamesAll[i].indexOf(monLower) >= 0) {
            if (possibleMonth > 0)
                return 0;
            possibleMonth = i + 1
        }
    }
    return possibleMonth
}

function parseModifier(str, modifierList) {
    for (var lstr = str.toLowerCase(), modifiers = modifierList.split("|"), i = 0, i = 0; i < modifiers.length; i++)
        if (lstr.substring(0, modifiers[i].length + 1) == modifiers[i] + " ")
            return str.substring(modifiers[i].length + 1);
    return str
}

function checkDates(year, month, day, eventType, ownBirth, ownDeath, motherBirth, motherDeath, fatherBirth, fatherDeath) {
    var bdate = null 
      , ddate = null 
      , fdate = null 
      , mdate = null ;
    if (eventType == "birth") {
        if (motherBirth != null  && motherBirth.length > 0 && (mdate = validateDate(motherBirth),
        mdate[0] == 0 && mdate[1].length > 0 && year < parseInt(mdate[1], 10) + 15))
            return 101;
        if (motherDeath != null  && motherDeath.length > 0 && (mdate = validateDate(motherDeath),
        mdate[0] == 0 && mdate[1].length > 0 && year > parseInt(mdate[1], 10)))
            return 102;
        if (fatherBirth != null  && fatherBirth.length > 0 && (fdate = validateDate(fatherBirth),
        fdate[0] == 0 && fdate[1].length > 0 && year < parseInt(fdate[1], 10) + 17))
            return 103;
        if (fatherDeath != null  && fatherDeath.length > 0 && (fdate = validateDate(fatherDeath),
        fdate[0] == 0 && fdate[1].length > 0 && year > parseInt(fdate[1], 10) + 1))
            return 104;
        if (ddate == null  && ownDeath != null  && ownDeath.length > 0 && (ddate = validateDate(ownDeath)),
        ddate != null  && ddate[0] == 0 && ddate[1].length > 0 && year < parseInt(ddate[1], 10) - 120)
            return 105
    } else {
        if (bdate == null  && ownBirth != null  && ownBirth.length > 0 && (bdate = validateDate(ownBirth)),
        eventType == "death" && bdate != null  && bdate[0] == 0 && bdate[1].length > 0 && year > parseInt(bdate[1], 10) + 120)
            return 106;
        if (bdate != null  && bdate[0] == 0 && dateCompare(year, month, day, bdate[1], bdate[2], bdate[3]) == -1)
            return 107
    }
    return eventType != "death" && eventType != "burial" && eventType != "cremation" && eventType != "funeral" && (ddate == null  && ownDeath.length > 0 && (ddate = validateDate(ownDeath)),
    ddate != null  && ddate[0] == 0 && dateCompare(year, month, day, ddate[1], ddate[2], ddate[3]) == 1) ? 108 : 0
}

function dateCompare(year1, month1, day1, year2, month2, day2) {
    var retVal = 0;
    return year1 != null  && year1.length > 0 && year2 != null  && year2.length > 0 && (parseInt(year1, 10) < parseInt(year2, 10) ? retVal = -1 : parseInt(year1, 10) > parseInt(year2, 10) ? retVal = 1 : month1 != null  && month1 > 0 && month2 != null  && month2 > 0 && (parseInt(month1, 10) < parseInt(month2, 10) ? retVal = -1 : parseInt(month1, 10) > parseInt(month2, 10) ? retVal = 1 : day1 != null  && day1.length > 0 && day2 != null  && day2.length > 0 && (parseInt(day1, 10) < parseInt(day2, 10) ? retVal = -1 : parseInt(day1, 10) > parseInt(day2, 10) && (retVal = 1)))),
    retVal
}

function getTokens(str) {
    for (var output = [], token = "", doingNumber = !1, doingText = !1, i = 0, c, i = 0; i < str.length; i++)
        c = str.charAt(i),
        isDigit(c) ? (doingText ? (output.push(token),
        token = c,
        doingText = !1) : token += c,
        doingNumber = !0) : " /-.,:;".indexOf(c) != -1 ? token.length > 0 && (output.push(token),
        token = "",
        doingText = !1,
        doingNumber = !1) : (doingNumber ? (output.push(token),
        token = c,
        doingNumber = !1) : token += c,
        doingText = !0);
    return token.length > 0 && output.push(token),
    output
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
            for (j = 0,
            j = i; j < array.length - 1; j++)
                array[j] = array[j + 1];
            array.length--
        }
    return array
}

function isDayInBounds(month, day, year) {
    if (day < 1)
        return !1;
    switch (month) {
    case 4:
    case 6:
    case 9:
    case 11:
        return day <= 30;
    case 2:
        var febDays = 29;
        return year > 0 && (year % 4 != 0 ? febDays = 28 : year % 400 == 0 ? febDays = 29 : year % 100 == 0 && (febDays = 28)),
        day <= febDays;
    default:
        return day <= 31
    }
}

function checkForInvalidChar(s) {
    for (var i = 0, i = 0; i < s.length; i++)
        if (invalidNameChars.indexOf(s.charAt(i)) >= 0)
            return s.charAt(i);
    return ""
}

function validateSurname(surname, fatherSurname, husbandSurname) {
    var lastname = surname.toLowerCase()
      , father = fatherSurname.toLowerCase()
      , husband = husbandSurname.toLowerCase()
      , retVal = "";
    return father.length > 0 ? lastname != father && (retVal = nameMatch(lastname, husband) ? warnNameMaiden : warnNameFather) : nameMatch(lastname, husband) && (retVal = warnNameMaiden),
    retVal
}

function nameMatch(name, nameList) {
    var i = 0, names;
    if (name.length > 0)
        for (names = nameList.split(";"),
        i = 0; i < names.length; i++)
            if (name == names[i])
                return !0;
    return !1
}

var monthNamesAll, monthAbbrs, aboutAbbr, beforeAbbr, afterAbbr, betweenAbbr, conjunctionAbbr, rangeAbbr, unknown, monthDayYearOrder, warnDateYearTooBig, warnDateTwoMonths, warnDateDayWithoutMonth, warnDateTwoDays, warnDateTwoYears, warnDateDayTooLarge, warnDateMonthTooLarge, warnDateInvalidMonth, warnDateBirthBeforeMother, warnDateBirthAfterMother, warnDateBirthBeforeFather, warnDateBirthAfterFather, warnDateBirth120BeforeDeath, warnDateDeath120AfterBirth, warnDateBeforeBirth, warnDateAfterDeath, warnDateMayBeWrong, warnStillUseIt, warnOfTheSpouse, badBirthDate, badDeathDate, badMarriageDate, warnLastName, warnNameFather, warnNameMaiden, invalidNameChars, errorNameInvalidChar, $val = {}
