function s_domain_standards() {
    var domainName = document.location.hostname;
    s.prop20 = s.prop20 ? s.prop20 : s.getQueryParam("o_ufc");
    s.prop21 = s.prop21 ? s.prop21 : s.getQueryParam("o_cvc");
    s.eVar4 = s.eVar4 ? s.evar4 : s.getQueryParam("o_iid");
    s.prop27 = sc_getKeyword();
    domainName.indexOf("ancestry") > -1 ? domainName = domainName.substring(domainName.indexOf("ancestry"), domainName.length) : domainName.indexOf("mfcreative") > -1 && (domainName = domainName.substring(domainName.indexOf("mfcreative"), domainName.length));
    s.trackingServer = "metrics." + domainName;
    s.trackingServerSecure = "smetrics." + domainName;
    s.visitorMigrationKey = "4DD6DCB5";
    s.visitorMigrationServer = s_account + ".112.2o7.net";
    s.visitorMigrationServerSecure = s_account + ".112.2o7.net"
}

// 在硬盘调用中, document.location.protocol is "file:"
//   因此 omniture_core.js 会从 'http://c.mfcreative.com/js/omniture_core.js 中加载
//    因此改写加载 src 路径, 原始为 src='http://c.mfcreative.com/js/omniture_core.js' 
//   或许在网络中 is "https"
//   测试在网络中 document.location.protocol 也有为 "http" 的 situation, 看来并不一定是 https 
"https:" == document.location.protocol ? document.write("<script type='text/javascript' src='https://a248.e.akamai.net/7/248/7051/v001/origin.c.mfcreative.com/js/omniture_core.js'><\/script>") : document.write("<script type='text/javascript' src='./lib/js/omniture_core_from_file.js'><\/script>"),

function(a, b, c, d) {
    var env = "prod", profile = "main", domain;
    try {
        domain = window.document.location.hostname.split("."); 
        // domain = ["trees", "ancestry", "com"] on network
        // domain = ["trees", "ancestry", "com"] on hardisk file
        domainExt = domain.length > 2 ? domain[2] : domain[1];
        domainExt = domain.length > 3 ? domain[3] : domain[2];
        domain = domain.length > 2 ? domain[1] : domain[0];
        /loc/.test(domain) || /dev/.test(domain) ? env = "dev" : /stage/.test(domain) && (env = "qa");
        domainExt == "au" ? profile = "australia" : domainExt == "ca" ? profile = "canada" : domainExt == "fr" ? profile = "france" : domainExt == "de" ? profile = "germany" : domainExt == "ie" ? profile = "ireland" : domainExt == "it" ? profile = "italy" : domainExt == "com" ? profile = "main" : domainExt == "mx" ? profile = "mexico" : domainExt == "pl" ? profile = "poland" : domainExt == "se" ? profile = "sweden" : domainExt == "uk" && (profile = "unitedkingdom")
    } catch (e) {}
    
//    a = "//tags.tiqcdn.com/utag/ancestry/" + profile + "/" + env + "/utag.js";
    a = "./lib/tags.tiqcdn.com/utag/ancestry/" + profile + "/" + env + "/utag.js";
    b = document;
    c = "script";
    d = b.createElement(c);
    d.src = a;
    d.type = "text/java" + c;
    d.async = !0;
    a = b.getElementsByTagName(c)[0];
    a.parentNode.insertBefore(d, a)
}()