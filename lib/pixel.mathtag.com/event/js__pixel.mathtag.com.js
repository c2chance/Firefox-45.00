(function(){
(function() {
    var mid = document.createElement('script'); mid.type = 'text/javascript'; mid.async = true;
    mid.src = '//mathid.mathtag.com/d/i.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(mid, s);
})();

(window.MathIDInits = window.MathIDInits || []).push(function() {
    MathID.getData({mt_id:'483404',ccid:'',cuid:'',mm_uuid:'296756ef-9c54-4800-9a2a-6ca22f0c11aa',src:'mt2'}).then(function(data) {
        var p = document.createElement('script');
        p.src = '//pixel.mathtag.com/event/js?mt_id=483404&mt_adid=110193&mt_nsync=1&no_attr=1&cs_jsonp=utag.ut.getMediaMathID&mathid_data=' + encodeURIComponent(data);
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(p, s);
    });
});
})();
