if ($Invite == undefined) {
    var $Invite = TGN.namespace("TGN.Ancestry.Trees.Invite")
        , _YDom = YAHOO.util.Dom
        , _YJson = YAHOO.lang.JSON
        , findInTreePrefix, previouslyInvitedContent;
    $Invite.tabClassName = "ancBtn lrg silver invTab";
    $Invite.tabClassNameSmallFont = "ancBtn lrg silver invTab smallerFont";
    $Invite.activeTabClassName = "ancBtn lrg silver invTab invTabActive active";
    $Invite.activeTabClassNameSmallFont = "ancBtn lrg silver invTab invTabActive active smallerFont";
    $Invite.title = "Invite to your tree";
    $Invite.error = "$$An error occurred.";
    $Invite.params = "";
    $Invite.url = "";
    $Invite.emailCount = 1;
    $Invite.userNameCount = 1;
    $Invite.maxEmails = 5;
    $Invite.maxUserNames = 5;
    $Invite.currentEmailId = 0;
    $Invite.currentUserNameId = 0;
    $Invite.currentTab = "";
    $Invite.validEmails = [];
    $Invite.contactsSelected = 0;
    $Invite.startTypingText = "";
    $Invite.inviteSent = !1;
    $Invite.showModal = function (config) {
        var cacheUrl, startTyping;
        $Invite.emailCount = 1;
        $Invite.userNameCount = 1;
        $Invite.url = config.url.substring(0, config.url.lastIndexOf("/") + 1);
        cacheUrl = v_treesCacheUrl;
        $Anc.load({
            libs: [{
                name: "invite"
                , type: "css"
                , fullpath: cacheUrl + "invite.css"
            }]
        });
        $genTreesModal.init("inviteModal", 900, typeof v_inviteToTree != "undefined" ? v_inviteToTree : "", "invitemodal");
        $genTreesModal.create("inviteModal", config.url, null);
        $Invite.currentTab = "";
        startTyping = _YDom.get("startTyping");
        startTyping && ($Invite.startTypingText = startTyping.innerHTML, $Invite.currentTab = "");
        _YDom.get("ftmMsg") && (_YDom.get("rightCol").style.display = "none", _YDom.get("centerCol").style.display = "none", _YDom.get("defaultView").style.display = "none")
    };
    $Invite.getView = function (o, scope) {
        var inviteModal, sharingInvCont, startTyping;
        clearTimeout($Invite.timeoutId);
        o.responseText == "fail" ? $Invite.displayError(o, scope) : (inviteModal = $("#inviteModal"), inviteModal && (inviteModal.css("position", "relative"), inviteModal.css("marginTop", "0px")), o != null && o.length > 0 && (sharingInvCont = document.getElementById("sharingInviteContent"), sharingInvCont && (sharingInvCont.innerHTML = o), startTyping = _YDom.get("startTyping"), startTyping && ($Invite.startTypingText = startTyping.innerHTML, $Invite.currentTab = "")));
        _YDom.get("ftmMsg") && (_YDom.get("rightCol").style.display = "none", _YDom.get("centerCol").style.display = "none", _YDom.get("defaultView").style.display = "none");
        $trees.util.setPageTrackingName("Share", "Invitee Modal")
    };
    $Invite.delayedClose = function () {
        setTimeout(function () {
            $.modal.close()
        }, 4e3)
    };
    $Invite.failure = function () {};
    $Invite.modalClosing = function () {
        if ($Invite.inviteSent) {
            var form = _YDom.get("aspnetForm");
            form && form.getAttribute("action") == "manageinvitees" && location.reload(!0)
        }
    };
    $Invite.displayError = function () {
        clearTimeout($Invite.timeoutId)
    };
    $Invite.closeModal = function () {
        $Invite.inviteSent && window.location.href.indexOf("invite") > 0 && (window.location.href = $Invite.url + "/manageinvitees");
        $.modal.close()
    };
    $Invite.switchTabs = function (tabId, provider) {
        var tabs, i, tabContents, j, tab, tabContent, previouslyRadio;
        if ($Invite.clearValidation(), $("#rolesInfoDiv").hide(), tabId != $Invite.currentTab) {
            for ($Invite.currentTab = tabId, tabs = _YDom.getElementsByClassName("invTab"), i = 0; i < tabs.length; i++) tabs[i].className = tabs[i].className.indexOf("smallerFont") != -1 ? $Invite.tabClassNameSmallFont : $Invite.tabClassName, _YDom.get(tabs[i].id + "Icon").className = _YDom.get(tabs[i].id + "Icon").className.replace(" Active", "");
            for ($Invite.resetCustomEmailSection(), _YDom.get("confirmation").style.display = "none", _YDom.get("chooser").style.display = "none", _YDom.get("ftmMsg") && (_YDom.get("ftmMsg").style.display = "none"), _YDom.get("defaultView").style.display = "none", tabContents = _YDom.getElementsByClassName("shareYourTreetabContent"), j = 0; j < tabContents.length; j++) tabContents[j].style.display = "none";
            tab = _YDom.get(tabId + "Tab");
            tabContent = _YDom.get(tabId + "TabContent");
            tabContent && (tabContent.style.display = "block");
            _YDom.get(tabId + "TabIcon").className += " Active";
            tab && (tab.className = tab.className.indexOf("smallerFont") != -1 ? $Invite.activeTabClassNameSmallFont : $Invite.activeTabClassName);
            provider && $Invite.switchProvider(tabId);
            tabId == "UserName" && (previouslyRadio = document.getElementById("previouslyInvitedRadio"), previouslyRadio && previouslyRadio.checked === !0 && $Invite.changeUserNameInviteType(2))
        }
        $.modal.center()
    };
    $Invite.showConfirmation = function (o) {
        var response, successField, userProvider;
        clearTimeout($Invite.timeoutId);
        _YDom.get("centerCol").style.display = "none";
        _YDom.get("rightCol").style.display = "none";
        _YDom.get("providerLogin").style.display = "none";
        _YDom.get("chooser").style.display = "none";
        _YDom.get("confirmation").style.display = "block";
        response = eval("(" + o.responseText + ")");
        response.count == "1" ? (_YDom.get("success1").style.display = "inline-block", _YDom.get("success2").style.display = "none") : (successField = _YDom.get("success2"), successField.innerHTML = successField.innerHTML.replace("{count}", response.count), _YDom.get("success1").style.display = "none", _YDom.get("success2").style.display = "inline-block");
        userProvider = _YDom.get("emailProvider").value;
        _YDom.get("providerInvite").style.display = $Invite.currentTab == userProvider || userProvider == "Other" ? "none" : "block";
        $Invite.inviteSent = !0;
        $Invite.currentTab = "";
        s = s_gi(s_account);
        s.pageName = "PT:Tree:Sharing:ModalSuccess:" + $Invite.currentTab;
        s_pageName = s.pageName;
        s.t()
    };
    $Invite.convertCustomtText = function () {
        var customMsg = _YDom.get("customText").value.replace(/</g, "%3C");
        return customMsg = customMsg.replace(/>/g, "%3E"), customMsg = customMsg.replace(/"/g, "''"), customMsg = customMsg.replace(/'/g, "'"), customMsg = customMsg.replace(/\\/g, "\\\\"), customMsg = customMsg.replace(/\//g, "/"), customMsg.replace(/&/g, "%26")
    };
    $Invite.addEmailField = function () {
        var emailField, emailTemplate, emailFields;
        $Invite.currentEmailId++;
        emailField = document.createElement("div");
        emailField.id = $Invite.currentEmailId + "emailDiv";
        emailField.style.margin = "0";
        emailTemplate = _YDom.get("templateEmail").innerHTML;
        emailTemplate = emailTemplate.replace(/__id__/g, $Invite.currentEmailId);
        emailField.innerHTML = emailTemplate;
        emailFields = _YDom.get("emailFields");
        emailFields.appendChild(emailField);
        $Invite.emailCount++;
        $Invite.emailCount == $Invite.maxEmails && (_YDom.get("addEmailBtn").style.display = "none");
        _YDom.get($Invite.currentEmailId + "email").focus()
    };
    $Invite.delEmailField = function (fieldId) {
        _YDom.get("emailFields").removeChild(_YDom.get(fieldId + "Div"));
        _YDom.get("addEmailBtn").style.display = "";
        $Invite.emailCount--
    };
    $Invite.submitEmails = function () {
        $Invite.validateEmailFields() && $Invite.sendEmailInvites()
    };
    $Invite.isValidEmail = function (emailAddr) {
        return emailAddr.length > 5 && emailAddr.indexOf("@") > 0 && emailAddr.indexOf("@") == emailAddr.lastIndexOf("@") && emailAddr.indexOf(".") > 0 && emailAddr.lastIndexOf(".") < emailAddr.length - 2 && emailAddr.indexOf("@") < emailAddr.lastIndexOf(".") - 1 && emailAddr.indexOf(" ") == -1 && emailAddr.indexOf("\t") == -1 && emailAddr.indexOf("\n") == -1 && emailAddr.indexOf("\r") == -1 ? !0 : !1
    };
    $Invite.validateEmail = function (emailAddr) {
        return $Invite.isValidEmail(emailAddr)
    };
    $Invite.validateEmailFields = function () {
        var i, emailAddr;
        $Invite.clearValidation();
        $Invite.validEmails = [];
        var success = !0
            , fieldsHaveValue = !1
            , fields = _YDom.getElementsByClassName("emailTxt");
        for (i = 0; i < fields.length; i++) emailAddr = fields[i].value.replace(/^\s\s*/, "").replace(/\s\s*$/, ""), fields[i].value = emailAddr, fields[i].className = "emailTxt", emailAddr !== "" && (fieldsHaveValue = !0, $Invite.validateEmail(emailAddr) === !1 ? (success = !1, fields[i].className = "emailTxt error") : $Invite.validEmails.push(fields[i]));
        return success = success && fieldsHaveValue, success || (_YDom.get("inviteError").style.display = "block"), success
    };
    $Invite.sendEmailInvites = function () {
        for (var json = 'invite={ "Type":"EMAIL", "Invitees": [', i = 0; i < $Invite.validEmails.length; i++) {
            var id = $Invite.validEmails[i].id.replace("email", "")
                , role = _YDom.get(id + "emailRole").value
                , email = $Invite.validEmails[i].value;
            json += '{ "Type":"email", "Email":"' + email + '", "Role":"' + role + '"';
            _YDom.get(id + "emailPid").value !== "" && (json += ', "Pid":"' + _YDom.get(id + "emailPid").value + '"');
            json += "},"
        }
        json = json.substring(0, json.length - 1);
        json += '], "Message":"' + $Invite.convertCustomtText() + '" }';
        YAHOO.util.Connect.asyncRequest("POST", $Invite.url + "sendinvites", {
            success: $Invite.showConfirmation
            , failure: $Invite.displayError
            , timeout: 2e4
        }, json)
    };
    $Invite.resetCustomEmailSection = function () {
        _YDom.get("rightCol").style.display = "block";
        _YDom.get("centerCol").style.display = "block"
    };
    $Invite.clearValidation = function () {
        var oldErrors, i, badUserNameMsg;
        for (_YDom.get("inviteError").style.display = "none", oldErrors = _YDom.getElementsByClassName("emailError"), i = 0; i < oldErrors.length; i++) oldErrors[i].style.display = "none";
        badUserNameMsg = document.getElementById("InvalidUserNames");
        badUserNameMsg && (badUserNameMsg.style.display = "none")
    };
    $Invite.addUserNameField = function () {
        var userNameField, userNameTemplate, userNameFields;
        $Invite.currentUserNameId++;
        userNameField = document.createElement("div");
        userNameField.id = $Invite.currentUserNameId + "userNameDiv";
        userNameTemplate = _YDom.get("templateUserName").innerHTML;
        userNameTemplate = userNameTemplate.replace(/__id__/g, $Invite.currentUserNameId);
        userNameField.innerHTML = userNameTemplate;
        userNameFields = _YDom.get("userNameFields");
        userNameFields.appendChild(userNameField);
        $Invite.userNameCount++;
        $Invite.userNameCount == $Invite.maxUserNames && (_YDom.get("addUserNameBtn").style.display = "none");
        _YDom.get($Invite.currentUserNameId + "userName").focus();
        $.modal.center()
    };
    $Invite.delUserNameField = function (fieldId) {
        _YDom.get("userNameFields").removeChild(_YDom.get(fieldId + "Div"));
        _YDom.get("addUserNameBtn").style.display = "";
        $Invite.userNameCount--
    };

    function userNameContactInfo() {
        this.Contacts = null
    }
    $Invite.handleChangePreviousInviteCategory = function () {
        var selectedTree, i, contactInfo;
        if (response = previouslyInvitedContent, previouslyInvitedSelect = document.getElementById("previousInviteCategory"), previouslyInvitedSelect)
            for (selectedTree = previouslyInvitedSelect.options[previouslyInvitedSelect.selectedIndex].value, _YDom.get("shareContactsBtn").className = "ancBtn orange disabled", i = 0; i < response.Invites.length; i++) selectedTree == response.Invites[i].TreeName && (contactInfo = new userNameContactInfo, contactInfo.Contacts = response.Invites[i].Invitees, $Invite.loadContacts(contactInfo), _YDom.get("chooser").style.display = "block")
    };
    $Invite.handlePreviouslyInvitedContent = function (o, scope) {
        var response, i, j, newOption;
        clearTimeout($Invite.timeoutId);
        try {
            if (response = eval("(" + o.responseText + ")"), response.status == "Success") {
                for (previouslyInvitedContent = response, previouslyInvitedSelect = document.getElementById("previousInviteCategory"), previouslyInvitedSelect.style.display = "block", i = previouslyInvitedSelect.options.length - 1; i >= 0; i--) previouslyInvitedSelect.remove(i);
                for (j = 0; j < response.Invites.length; j++) newOption = document.createElement("option"), newOption.text = response.Invites[j].TreeName + " (" + response.Invites[j].Invitees.length + ")", newOption.value = response.Invites[j].TreeName, previouslyInvitedSelect.options.add(newOption);
                $Invite.handleChangePreviousInviteCategory();
                $.modal.center()
            } else $Invite.displayPrvInvitedConnectError(o, scope)
        } catch (err) {
            $Invite.displayPrvInvitedConnectError(o, scope)
        }
    };
    $Invite.displayPrvInvitedConnectError = function () {
        connectErrorMsg = document.getElementById("PrvInvitedConnectError");
        connectErrorMsg && (connectErrorMsg.style.display = "block")
    };
    $Invite.changeUserNameInviteType = function (selectionType) {
        var byUserRadio = document.getElementById("byUserNameRadio")
            , byUserDiv = document.getElementById("inviteByUserNameContent")
            , previouslyRadio = document.getElementById("previouslyInvitedRadio")
            , previouslyDiv = document.getElementById("previouslyInvitedContent");
        byUserRadio && byUserDiv && previouslyRadio && previouslyDiv && (selectionType == 1 ? (byUserRadio.checked = !0, byUserDiv.style.display = "block", previouslyRadio.checked = !1, previouslyDiv.style.display = "none", _YDom.get("chooser").style.display = "none") : (previouslyRadio.checked = !0, previouslyDiv.style.display = "block", byUserRadio.checked = !1, byUserDiv.style.display = "none", YAHOO.util.Connect.asyncRequest("POST", $Invite.url + "getPrvInvited", {
            success: $Invite.handlePreviouslyInvitedContent
            , failure: $Invite.displayPreviouslyInvitedConnectError
            , timeout: 2e4
        })));
        $.modal.center()
    };
    $Invite.submitUserNames = function () {
        var id, userNameField, userPid, role, badUserNameMsg;
        $Invite.clearValidation();
        $Invite.validUserNames = [];
        var fields = _YDom.getElementsByClassName("userNameTxt")
            , json = 'invite={ "Type":"USERNAME", "Invitees": ['
            , count = 0;
        for (id = 0; id < $Invite.maxUserNames; id++) userNameField = document.getElementById(id + "userName"), userNameField && userNameField.value.length && (userPid = document.getElementById(id + "userNamePid"), role = _YDom.get(id + "userNameRole").value, json += '{ "Type":"username", "Username":"' + userNameField.value + '", "Role":"' + role + '"', userPid && userPid.value.length && (json += ', "Pid":"' + _YDom.get(id + "userNamePid").value + '"'), json += "},", count++);
        json = json.substring(0, json.length - 1);
        json += '], "Message":"' + $Invite.convertCustomtText() + '" }';
        badUserNameMsg = document.getElementById("InvalidUserNames");
        badUserNameMsg && (badUserNameMsg.style.display = "none");
        connectErrorMsg = document.getElementById("UserNameConnectError");
        connectErrorMsg && (connectErrorMsg.style.display = "none");
        count > 0 ? YAHOO.util.Connect.asyncRequest("POST", $Invite.url + "validateusernameinvites", {
            success: $Invite.handleUserNameConfirmation
            , failure: $Invite.displayUserNameConnectError
            , timeout: 2e4
        }, json) : (badUserNameMsg = document.getElementById("InvalidUserNames"), badUserNameMsg && (badUserNameMsg.style.display = "block"))
    };
    $Invite.handleUserNameConfirmation = function (o, scope) {
        var connectErrorMsg, response, fields, i, j, badUserNameMsg;
        clearTimeout($Invite.timeoutId);
        try {
            if (response = eval("(" + o.responseText + ")"), response.status == "Invalid")
                for (fields = _YDom.getElementsByClassName("userNameTxt"), i = 0; i < response.Invite.Invitees.length; i++)
                    for (j = 0; j < fields.length; j++) fields[j].value == response.Invite.Invitees[i].DisplayName && response.Invite.Invitees[i].Email == "Invalid" && ($Invite.showInvalidUserName(j), badUserNameMsg = document.getElementById("InvalidUserNames"), badUserNameMsg && (badUserNameMsg.style.display = "block"));
            else response.status == "Success" ? $Invite.showConfirmation(o, scope) : (connectErrorMsg = document.getElementById("UserNameConnectError"), connectErrorMsg && (connectErrorMsg.style.display = "block"))
        } catch (err) {
            connectErrorMsg = document.getElementById("UserNameConnectError");
            connectErrorMsg && (connectErrorMsg.style.display = "block")
        }
    };
    $Invite.displayUserNameConnectError = function () {
        connectErrorMsg = document.getElementById("UserNameConnectError");
        connectErrorMsg && (connectErrorMsg.style.display = "block")
    };
    $Invite.showInvalidUserName = function (entryNumber) {
        var element = document.getElementById(entryNumber + "userName");
        element && (element.style.backgroundColor = "#feece6")
    };
    $Invite.userNameContentChange = function () {
        for (var userNameField, i = 0; i < $Invite.maxUserNames; i++) userNameField = document.getElementById(i + "userName"), userNameField && (userNameField.style.backgroundColor = "")
    };
    $Invite.switchProvider = function (providerId) {
        var providers, i, provider, btn;
        if (_YDom.get("rightCol").style.display = "none", _YDom.get("centerCol").style.display = "none", _YDom.get("providerLogin").style.display = "block", providers = _YDom.getElementsByClassName("yourProvider"), providers)
            for (i = 0; i < providers.length; i++) providers[i].style.display = "none";
        $Invite.currentTab = providerId;
        provider = _YDom.get("your" + providerId);
        provider && (provider.style.display = "block");
        btn = _YDom.get("connect" + providerId);
        btn && (btn.style.display = "inline-block", btn.style.width = "auto");
        (providerId == "Aol" || providerId == "Gmx" || providerId == "Web") && (_YDom.get("providerLoginForm").style.display = "block", _YDom.get("providerUsernameTxt").value = "", _YDom.get("providerPasswordTxt").value = "")
    };
    $Invite.ProviderConnect = function () {
        $Invite.importContacts()
    };
    $Invite.externalAuth = function () {
        $ContactImport.externalAuthUrl = _YDom.get("extUrl").innerHTML;
        $ContactImport.externalAuth({
            Yahoo: "YahooExtAuth"
            , Gmail: "GmailExtAuth"
            , Hotmail: "LiveDelAuth"
            , Plaxo: "PlaxoExtAuth"
            , Aol: "Aol"
            , Gmx: "Gmx"
            , Web: "Web"
        }[$Invite.currentTab], $Invite.loadContacts, $Invite.importFailure, $Invite.showLoadingContacts)
    };
    $Invite.internalAuth = function () {
        var username = _YDom.get("providerUsernameTxt").value
            , password = _YDom.get("providerPasswordTxt").value;
        username.replace(/ /g, "") === "" || password.replace(/ /g, "") === "" ? _YDom.get("errorInvalidLogin").style.display = "block" : ($ContactImport.internalAuthUrl = _YDom.get("intUrl").innerHTML, $ContactImport.internalAuth(username, password, $Invite.currentTab, $Invite.loadContacts, $Invite.importFailure, $Invite.showLoadingContacts))
    };
    $Invite.importFailure = function (xhr, statusText, errorThrown) {
        alert(xhr + ", " + statusText + ", " + errorThrown)
    };
    $Invite.filterContacts = function () {
        var options = _YDom.getElementsByClassName("chooserOption")
            , searchText = _YDom.get("chooserNameTxt").value
            , optionDiv, i, regex;
        if (searchText !== "")
            for (_YDom.get("startTyping").style.display = "none", regex = new RegExp(searchText.replace(/\W/g, "").split("").join("\\w*"), "i"), i = 0; i < options.length; i++) optionDiv = _YDom.get(options[i].id.replace("chooserName", "") + "option"), optionDiv.style.display = options[i].innerHTML.match(regex) || options[i].getAttribute("email").match(regex) ? "block" : "none";
        else
            for (i = 0; i < options.length; i++) optionDiv = _YDom.get(options[i].id.replace("chooserName", "") + "option"), optionDiv.style.display = "block"
    };
    $Invite.clearStartTyping = function () {
        var txt = _YDom.get("chooserNameTxt");
        txt.value == $Invite.startTypingText && (txt.value = "", txt.style.color = "#000000")
    };
    $Invite.setStartTyping = function () {
        var txt = _YDom.get("chooserNameTxt");
        txt.value = $Invite.startTypingText;
        txt.style.color = "#999999"
    };
    $Invite.showLoadingContacts = function () {
        _YDom.get("selectedOptions").innerHTML = "";
        _YDom.get("gettingContacts").style.display = "block";
        _YDom.get("errorInvalidLogin").style.display = "none";
        _YDom.get("errorUnknown").style.display = "none";
        _YDom.get("errorNoContacts").style.display = "none"
    };
    $Invite.loadContacts = function (json) {
        var selects, j, selectText, template, i, option, displayName;
        for (_YDom.get("chooserOptions").innerHTML = "", _YDom.get("selectedOptions").innerHTML = "", selects = _YDom.getElementsByClassName("selectProvider"), j = 0; j < selects.length; j++) selects[j].style.display = "none";
        if (json == "Error") _YDom.get("errorInvalidLogin").style.display = "block", _YDom.get("gettingContacts").style.display = "none";
        else if (json == "ErrorUnknown") _YDom.get("errorUnknown").style.display = "block", _YDom.get("gettingContacts").style.display = "none";
        else if (json.Contacts.length > 0)
            for (_YDom.get("loadingContacts").style.display = "block", selectText = _YDom.get("select" + $Invite.currentTab), selectText && (selectText.style.display = "block"), $Invite.contactsSelected = 0, $Invite.setStartTyping(), _YDom.get("rightCol").style.display = "block", _YDom.get("providerLogin").style.display = "none", _YDom.get("chooser").style.display = "block", _YDom.get("loadingContacts").style.display = "none", _YDom.get("shareContactsBtn").className = "ancBtn orange disabled", template = _YDom.get("chooserOptionTemplate").innerHTML, i = 0; i < json.Contacts.length; i++)
                if (option = template.replace(/__id__/g, i), displayName = $Invite.getDisplayName(json.Contacts[i]), displayName !== "" && json.Contacts[i].Email) option = json.Contacts[i].user_name ? option.replace("__username__", json.Contacts[i].user_name) : option.replace("__username__", ""), json.Contacts[i].Role && (option = option.replace("__role__", json.Contacts[i].Role)), option = option.replace("__displayName__", displayName), option = option.replace("__email__", json.Contacts[i].Email[0]), option = (json.Contacts[i].user_name === undefined || json.Contacts[i].user_name === "") && displayName != json.Contacts[i].Email[0] ? option.replace("__displayEmail__", "(" + json.Contacts[i].Email[0] + ")") : option.replace("__displayEmail__", ""), _YDom.get("chooserOptions").innerHTML += option;
                else continue;
        else _YDom.get("errorNoContacts").style.display = "block", _YDom.get("gettingContacts").style.display = "none", _YDom.get("chooserOptions").innerHTML = _YDom.get("noContacts").innerHTML
    };
    $Invite.AddRemoveContact = function (optionId) {
        var chBx = _YDom.get(optionId + "checkbox")
            , template, selectedField, name;
        _YDom.get(optionId + "selected") ? (chBx.checked = !1, _YDom.get("selectedOptions").removeChild(_YDom.get(optionId + "selected")), $Invite.contactsSelected--, $Invite.contactsSelected === 0 && (_YDom.get("nobodySelected").style.display = "block", _YDom.get("shareContactsBtn").className = "ancBtn orange disabled")) : (chBx.checked = !0, template = _YDom.get("selectedOptionTemplate").innerHTML, selectedField = document.createElement("div"), template = template.replace(/__id__/g, optionId), name = _YDom.get(optionId + "displayName").innerHTML, template = template.replace("__displayName__", name), selectedField.innerHTML = template, selectedField.id = optionId + "selected", selectedField.className = "selectedOption", _YDom.get("selectedOptions").appendChild(selectedField), _YDom.get(optionId + "chooserName").getAttribute("role") != "__role__" && (_YDom.get(optionId + "selectedRole").value = _YDom.get(optionId + "chooserName").getAttribute("role")), _YDom.get("nobodySelected").style.display = "none", $Invite.contactsSelected++, _YDom.get("shareContactsBtn").className = "ancBtn orange")
    };
    $Invite.getDisplayName = function (contact) {
        var dispName = "";
        if (contact.Email.length > 0) dispName = contact.user_name && contact.user_name !== "" ? contact.user_name : contact.Name && contact.Name !== "" ? contact.Name : contact.Email[0];
        else return "";
        return dispName
    };
    $Invite.submitSelectedOptions = function () {
        var selected, json, i, id, role, email;
        if (_YDom.get("shareContactsBtn").className == "ancBtn orange") {
            for (selected = _YDom.getElementsByClassName("selectedOption"), json = 'invite={ "Type":"' + $Invite.currentTab + '", "Invitees": [', i = 0; i < selected.length; i++) id = selected[i].id.replace("selected", ""), id != "__id__" && (role = _YDom.get(id + "selectedRole").value, email = _YDom.get(id + "chooserName").getAttribute("email"), json += _YDom.get(id + "chooserName").getAttribute("username") !== "" ? '{ "Type":"username", "Username":"' + _YDom.get(id + "chooserName").getAttribute("username") + '", "Email":"' + email + '", ' : '{ "Type":"email", "Email":"' + email + '", ', json += '"Role":"' + role + '"', _YDom.get(id + "selectedPid").value !== "" && (json += ', "Pid":"' + _YDom.get(id + "selectedPid").value + '"'), json += "},");
            json = json.substring(0, json.length - 1);
            json += '], "Message":"' + $Invite.convertCustomtText() + '" }';
            YAHOO.util.Connect.asyncRequest("POST", $Invite.url + "sendinvites", {
                success: $Invite.showConfirmation
                , failure: $Invite.displayError
                , timeout: 2e4
            }, json)
        }
    };
    $Invite.findInTreeBrowse = function (selectFromTreeUrl, prefix) {
        findInTreePrefix = prefix;
        window.open(selectFromTreeUrl, "", "toolbar=no,resizable=yes,scrollbars=yes,menubar=no,status=no,location=no,height=600,width=800")
    };
    $Invite.removeTreeMember = function (prefix) {
        var pidInput = document.getElementById(prefix + "Pid")
            , nameInput, nameLabel, findLink, infoDiv;
        pidInput !== null && (pidInput.value = "");
        nameInput = document.getElementById(prefix + "Name");
        nameInput !== null && (nameInput.value = "");
        nameLabel = document.getElementById(prefix + "NameLabel");
        nameLabel !== null && (nameLabel.innerHTML = "");
        findLink = document.getElementById(prefix + "FindThemLink");
        findLink !== null && (findLink.style.display = "block");
        infoDiv = document.getElementById(prefix + "ThemInfoDiv");
        infoDiv !== null && (infoDiv.style.display = "none")
    };
    $Invite.selectMe = function () {
        YAHOO.util.Connect.asyncRequest("GET", $Invite.url + "select", {
            success: $Invite.getView
            , failure: $Invite.displayError
            , timeout: 2e4
        })
    };

    function myCallback(name, byear, dyear, pid) {
        var pidInput = document.getElementById(findInTreePrefix + "Pid")
            , nameInput, nameLabel, findLink, infoDiv;
        pidInput !== null && (pidInput.value = pid);
        nameInput = document.getElementById(findInTreePrefix + "Name");
        nameInput !== null && (nameInput.value = name);
        nameLabel = document.getElementById(findInTreePrefix + "NameLabel");
        nameLabel !== null && (nameLabel.innerHTML = name + " (" + byear + ")");
        findLink = document.getElementById(findInTreePrefix + "FindThemLink");
        findLink !== null && (findLink.style.display = "none");
        infoDiv = document.getElementById(findInTreePrefix + "ThemInfoDiv");
        infoDiv !== null && (infoDiv.style.display = "block")
    }
    $Invite.showRoles = function () {
        var contentZone = $("#rolesInfoDiv");
        contentZone.html().length === 0 && contentZone.html($("#rolesInfo").html());
        contentZone.toggle();
        $.modal.center()
    };
    $Invite.hideRoles = function () {
        $("#rolesInfoDiv").hide();
        $.modal.center()
    }
}
