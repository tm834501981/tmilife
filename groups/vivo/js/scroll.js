$(document).ready(function(){
	$(window).bind('scroll',function(){
		var scrH = $(window).scrollTop();
		var banner = $('.ad');
		var ad = $('.adchangeone');
		var foot = $('.footer');
		var ttop = $('.ttop');
		var bannerH = banner.height();
		console.log(scrH);
		if(scrH > bannerH){
			ad.css('filter','blur(3px)');
			ad.css('-webkit-filter','blur(3px)');
		}else{
			ad.css('filter','blur(0px)');
			ad.css('-webkit-filter','blur(0px)');

		}		
		if(scrH > bannerH+350){
				banner.css({
					zIndex:0,
				});
				ttop.css('visibility','visible');
				
			}else{
				banner.css({
					zIndex:1,
				});
				ttop.css('visibility','hidden');
				
			}
	})
})


