//tealium universal tag - utag.652 ut4.0.201603081755, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try {
    (function (id, loader) {
        var u = {};
        utag.o[loader].sender[id] = u;
        if (utag.ut === undefined) {
            utag.ut = {};
        }
        if (utag.ut.loader === undefined) {
            u.loader = function (o) {
                var b, c, l, a = document;
                if (o.type === "iframe") {
                    b = a.createElement("iframe");
                    o.attrs = o.attrs || {
                        "height": "1",
                        "width": "1",
                        "style": "display:none"
                    };
                    for (l in utag.loader.GV(o.attrs)) {
                        b.setAttribute(l, o.attrs[l]);
                    }
                    b.setAttribute("src", o.src);
                } else if (o.type == "img") {
                    utag.DB("Attach img: " + o.src);
                    b = new Image();
                    b.src = o.src;
                    return;
                } else {
                    b = a.createElement("script");
                    b.language = "javascript";
                    b.type = "text/javascript";
                    b.async = 1;
                    b.charset = "utf-8";
                    for (l in utag.loader.GV(o.attrs)) {
                        b[l] = o.attrs[l];
                    }
                    b.src = o.src;
                }
                if (o.id) {
                    b.id = o.id
                };
                if (typeof o.cb == "function") {
                    if (b.addEventListener) {
                        b.addEventListener("load", function () {
                            o.cb()
                        }, false);
                    } else {
                        b.onreadystatechange = function () {
                            if (this.readyState == 'complete' || this.readyState == 'loaded') {
                                this.onreadystatechange = null;
                                o.cb()
                            }
                        };
                    }
                }
                l = o.loc || "head";
                c = a.getElementsByTagName(l)[0];
                if (c) {
                    utag.DB("Attach to " + l + ": " + o.src);
                    if (l == "script") {
                        c.parentNode.insertBefore(b, c);
                    } else {
                        c.appendChild(b)
                    }
                }
            }
        } else {
            u.loader = utag.ut.loader;
        }
        u.ev = {
            'view': 1
        };
        u.map = {};
        u.extend = [];
        u.send = function (a, b) {
            if (u.ev[a] || typeof u.ev.all != "undefined") {
                var c, d, e, f;
                u.data = {
                    "qsp_delim": "&",
                    "kvp_delim": "=",
                    "qs_delim": "?",
                    "tag_type": "script",
                    "base_url": "c.mfcreative.com/lib/tgn/combo.ashx?x/lib/jquery/plugin/jquery.jqlog-1.3.js",
                    "secure_base_url": "c.mfcreative.com/lib/tgn/combo.ashx?x/lib/jquery/plugin/jquery.jqlog-1.3.js",
                    "static_params": ""
                };
                c = [];
                for (d in utag.loader.GV(u.map)) {
                    if (typeof b[d] !== "undefined" && b[d] !== "") {
                        e = u.map[d].split(",");
                        for (f = 0; f < e.length; f++) {
                            if (e[f] == "qsp_delim" || e[f] == "kvp_delim" || e[f] == "qs_delim" || e[f] == "base_url" || e[f] == "secure_base_url") {
                                u.data[e[f]] = b[d];
                            } else {
                                c.push(e[f] + u.data.kvp_delim + encodeURIComponent(b[d]));
                            }
                        }
                    }
                }
                u.data.secure_base_url = u.data.secure_base_url || u.data.base_url;
                u.data.url = (location.protocol == "https:" ? u.data.secure_base_url : u.data.base_url);
                if (u.data.url.indexOf("http") !== 0 && u.data.url.indexOf("/") !== 0) {
                    u.data.url = location.protocol + "//" + u.data.url;
                }
                if (u.data.url.indexOf(u.data.qs_delim) < 0 && (c.length > 0 || u.data.static_params.length > 0)) {
                    u.data.url += u.data.qs_delim
                }
                if (u.data.static_params) {
                    if (c.length > 0) {
                        u.data.url += u.data.static_params + u.data.qsp_delim;
                    } else {
                        u.data.url += u.data.static_params;
                    }
                }
                u.loader({
                    "type": u.data.tag_type,
                    "src": u.data.url + c.join(u.data.qsp_delim),
                    "loc": "script",
                    "id": 'utag_652'
                });
            }
        };
        utag.o[loader].loader.LOAD(id);
    }("652", "ancestry.main"));
} catch (error) {
    utag.DB(error);
}
var loc = window.location.href.split("?")[0];
var locP = loc.split('/');
var domain = window.document.location.hostname.split('.');
domainExt = (domain.length > 2) ? domain[2] : domain[1];
domainExt = (domain.length > 3) ? domain[3] : domain[2];
if (domain[1].indexOf('ancestrydev') != -1) {
    utag.data['geo'] = 'dev';
} else if (domain[1].indexOf('ancestrystage') != -1) {
    utag.data['geo'] = 'stage';
} else if (domainExt == 'au') {
    utag.data['geo'] = 'au';
} else if (domainExt == 'ca') {
    utag.data['geo'] = 'ca';
} else if (domainExt == 'fr') {
    utag.data['geo'] = 'fr';
} else if (domainExt == 'de') {
    utag.data['geo'] = 'de';
} else if (domainExt == 'ie') {
    utag.data['geo'] = 'ie';
} else if (domainExt == 'it') {
    utag.data['geo'] = 'it';
} else if (domainExt == 'com') {
    utag.data['geo'] = 'us';
} else if (domainExt == 'mx') {
    utag.data['geo'] = 'mx';
} else if (domainExt == 'se') {
    utag.data['geo'] = 'se';
} else if (domainExt == 'uk') {
    utag.data['geo'] = 'uk';
} else {
    utag.data['geo'] = 'unknown';
}
if (typeof utag.data['call_type'] == 'undefined' || utag.data['call_type'] == '') {
    utag.data['call_type'] = 'page view';
}
if (typeof utag.data['action'] == 'undefined' || utag.data['action'] == '') {
    utag.data['action'] = '';
}
utag.data['site'] = 'ancestry';
utag.data['stack'] = domain[0];
utag.data['user_agent'] = utag.data['js_page.navigator.userAgent'];
utag.data['screen_resolution'] = window.screen.width + 'x' + window.screen.height;
var pName = 'none : none : none : needs valid page name';
if (utag.data['page_name']) {
    pName = utag.data['page_name'];
}
if (typeof s_pageName != 'undefined') {
    pName = s_pageName;
}
if ((utag.data['dom.url'] == "http://home.ancestry." + domainExt + "/") && (utag.data['dom.pathname'] == '/')) {
    pName = 'ancestry ' + utag.data['geo'] + ' : home page : logged in : original';
}
if (utag.data['dom.url'].indexOf('wiz2.ancestry."+domainExt+"/Records/SEO~Records') != -1) {
    pName = 'ancestry ' + utag.data['geo'] + ' : wiz2 : seo : ' + locP[5];
}
if (typeof (s_pageName) != 'undefined') {
    pName = s_pageName;
}
if (typeof s != 'undefined') {
    if (typeof (s.pageName) != 'undefined') {
        pName = s.pageName;
    }
}
if (pName.indexOf(' : ') == -1) {
    pName = pName.replace(/:/g, " : ");
}
pName = pName.toLowerCase();
utag.data['page_name'] = pName;
if (typeof utag.data['cp.LAU'] != 'undefined') {
    utag.data['ucdmid'] = utag.data['cp.LAU'];
} else {
    utag.data['ucdmid'] == '00000000-0000-0000-0000-000000000000';
}
if (typeof utag.data['cp.OMNITURE'] != 'undefined') {
    var cust_seg = utag.data['cp.OMNITURE'].split('=');
    cust_seg = cust_seg[1].toLowerCase();
    utag.data['customer_segment'] = cust_seg;
} else {
    utag.data['customer_segment'] = 'nrvisitor';
}
utag.data['events'] = '';
if ((utag.data['dom.url'].match(/deny.aspx/g)) || (utag.data['dom.url'].match(/offers\/join/g))) {
    utag.data['events'] = 'deny';
}
if ((typeof (utag.data['order_id']) != 'undefined') && (utag.data['order_id'] != '')) {
    if (utag.data['flow_type'] == "gift sub - upgrade") {
        utag.data['events'] = 'upgrade conversion';
    }
    if (utag.data['flow_type'] == "gift sub - downgrade") {
        utag.data['events'] = 'downgrade conversion';
    }
    if (utag.data['flow_type'] == "free trial") {
        utag.data['events'] = 'free trial conversion';
    }
    if (utag.data['flow_type'] == "upgrade") {
        utag.data['events'] = 'upgrade conversion';
    }
    if (utag.data['flow_type'] == "hard offer") {
        utag.data['events'] = 'hard offer conversion';
    }
    if (utag.data['flow_type'] == "gift sub") {
        utag.data['events'] = 'gift sub conversion';
    }
}
utag.data['source_id'] = utag.data['qp.o_xid'];
utag.data['internal_source_id'] = utag.data['qp.o_iid'];
utag.data['db_catagory'] = utag.data['qp.cat'];
if (window.performance && window.performance.timing) {
    utag.data['time_latency'] = window.performance.timing.responseStart - window.performance.timing.fetchStart;
    utag.data['time_tranfser'] = window.performance.timing.responseEnd - window.performance.timing.responseStart;
    utag.data['time_processing_to_interactive'] = window.performance.timing.domInteractive - window.performance.timing.domLoading;
    utag.data['time_interactive_to_dcl'] = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.domInteractive;
    if (window.performance.timing.loadEventEnd > 0) {
        utag.data['time_dcl_to_complete'] = window.performance.timing.domComplete - window.performance.timing.domContentLoadedEventEnd;
        utag.data['time_onload_duration'] = window.performance.timing.loadEventEnd - window.performance.timing.loadEventStart;
        utag.data['time_total'] = window.performance.timing.loadEventEnd - window.performance.timing.fetchStart;
    } else if (window.addEventListener) {
        utag.data['time_dcl_to_complete'] = 'unknown';
        utag.data['time_onload_duration'] = 'unknown';
        utag.data['time_total'] = 'unknown';
    }
} else {
    utag.data['time_latency'] = 'unknown';
    utag.data['time_tranfser'] = 'unknown';
    utag.data['time_processing_to_interactive'] = 'unknown';
    utag.data['time_interactive_to_dcl'] = 'unknown';
    utag.data['time_dcl_to_complete'] = 'unknown';
    utag.data['time_onload_duration'] = 'unknown';
    utag.data['time_total'] = 'unknown';
}

function log(entry) {
    if ($.jqlog) {
        $.jqlog.log(entry);
    }
}

function checkFET() {
    if (typeof $.jqlog != 'undefined') {
        makeFETCall();
        stopFET();
    }
}

function stopFET() {
    clearInterval(intvFET);
}
var intvFET = setInterval(function () {
    checkFET()
}, 1000);

function makeFETCall() {
    if (window.jQuery) {
        var fet_env = "";
        try {
            var domain = window.document.location.hostname.split('.');
            domain = (domain.length > 2) ? domain[1] : domain[0];
            if (/loc/.test(domain) || /dev/.test(domain)) {
                fet_env = 'dev';
            } else if (/stage/.test(domain)) {
                fet_env = 'stage';
            }
        } catch (e) {}
        $.jqlog.init('//fel.ancestry' + fet_env + '.com/webapi/events', true, 'FETracking', 'PRDDRFJFETRAC00');
        log({
            eventName: "AnalyticsTest",
            eventParams: {
                geo: utag.data['geo'],
                site: utag.data['site'],
                stack: utag.data['stack'],
                call_type: utag.data['call_type'],
                url: utag.data['dom.url'],
                domain: utag.data['dom.domain'],
                hash: utag.data['dom.hash'],
                query_string: utag.data['dom.query_string'],
                referrer: utag.data['dom.referrer'],
                user_agent: utag.data['user_agent'],
                screen_resolution: utag.data['screen_resolution'],
                visitor_id: 'unknown',
                session_id: 'unknown',
                page_name: utag.data['page_name'],
                ucdmid: utag.data['ucdmid'],
                customer_segment: utag.data['customer_segment'],
                source_id: utag.data['source_id'],
                internal_source_id: utag.data['internal_source_id'],
                marketing_channel: utag.data['qp.o_sch'],
                events: utag.data['events'],
                dbid: utag.data['dbid'],
                db_catagory: utag.data['db_catagory'],
                visitor_id: utag.data['_t_visitor_id'],
                session_id: utag.data['_t_session_id'],
                product_id: utag.data['product_id'],
                product_sku: utag.data['product_sku'],
                product_type: utag.data['product_type'],
                product_name: utag.data['product_name'],
                product_quantity: utag.data['product_quantity'],
                flow_type: utag.data['flow_type'],
                offer_id: utag.data['offer_id'],
                offer_name: utag.data['offer_name'],
                offer_duration: utag.data['offer_duration'],
                offer_price: utag.data['offer_price'],
                offer_renewal: utag.data['offer_renewal'],
                is_paid_trial: utag.data['is_paid_trial'],
                is_payperview: utag.data['is_payperview'],
                order_id: utag.data['order_id'],
                order_shipping_amount: utag.data['order_shipping_amount'],
                order_tax_amount: utag.data['order_tax_amount'],
                order_discount_amount: utag.data['order_discount_amount'],
                order_subtotal: utag.data['order_subtotal'],
                order_total: utag.data['order_total'],
                order_payment_type: utag.data['order_payment_type'],
                order_currency: utag.data['order_currency'],
                webservice_id: utag.data['webservice_id'],
                promo_codes: utag.data['promo_codes'],
                postal_code: utag.data['postal_code'],
                test_order: utag.data['test_order'],
                site_currency: utag.data['site_currency'],
                customer_email: utag.data['customer_email'],
                bait_buy_gift_sub: utag.data['bait_buyGS'],
                bait_current_subscriber: utag.data['bait_cSub'],
                bait_current_trial: utag.data['bait_cTrial'],
                bait_cancel_reason: utag.data['bait_cancelReason'],
                bait_days_since_cancel: utag.data['bait_dayCancel'],
                bait_days_since_creation: utag.data['bait_dayCreate'],
                bait_ever_subscriber: utag.data['bait_eSub'],
                bait_EverTrialer: utag.data['bait_eTrial'],
                bait_former_gift_sub: utag.data['bait_hadGS'],
                bait_current_gift_sub: utag.data['bait_hasGS'],
                bait_new_dna: utag.data['bait_newDna'],
                bait_ownership: utag.data['bait_ownership'],
                bait_tree: utag.data['bait_hasTree'],
                bait_tree_nodes: utag.data['bait_treeNode'],
                search_type: utag.data['search_type'],
                search_resultsQuality: utag.data['search_resultsQuality'],
                search_category: utag.data['search_category'],
                search_subcategory: utag.data['search_subcategory'],
                search_dbName: utag.data['search_dbName'],
                search_dbid: utag.data['search_dbid'],
                search_dbSection: utag.data['dbSection'],
                hint_accepted: utag.data['hint_accepted'],
                action: utag.data['action'],
                time_latency: utag.data['time_latency'],
                time_tranfser: utag.data['time_tranfser'],
                time_processing_to_interactive: utag.data['time_processing_to_interactive'],
                time_interactive_to_dcl: utag.data['time_interactive_to_dcl'],
                time_dcl_to_complete: utag.data['time_dcl_to_complete'],
                time_onload_duration: utag.data['time_onload_duration'],
                time_total: utag.data['time_total'],
            }
        });
    } else {
        return;
    }
}