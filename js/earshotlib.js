
var earshotLibrary = {
	gameControl:function(){
		hash = location.hash.slice(1).replace(/^\/|\/$/g, '');

		if(hash == "game"){
			window.location.hash = "#/pg_about";
		}else{
			window.location.hash = "#/game";
		}
	},
	mobileMenu:function(){
		$(".menu").toggleClass('expand');
	},
	getDevice:function(){
		var o = {};
		o.isAndroid = navigator.userAgent.toLowerCase().indexOf("android")>-1;
		o.isipad = navigator.userAgent.toLowerCase().indexOf("ipad")>-1;
		o.isMobile = $.browser.mobile;
		o.isTablet = (navigator.userAgent.match(/iPad/i) != null) || o.isAndroid || o.isipad;
		o.isDesktop = !o.isMobile && !o.isTablet;
		return o;
	}

}

