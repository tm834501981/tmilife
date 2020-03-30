/********************顶部广告**********************/
//设置广告的关闭
$('.x').click(function(){
	$('.topad').hide();
})


/********************送货地址**********************/
// 1.设置送货地址颜色
$($('.left a')[2]).hover(function(){
	$('.address').show();
	$($('.left a')[2]).css('background-color','white');
},function(){
	$('.address').hide();
	$($('.left a')[2]).css('background-color','');
})
$('.address').hover(function(){
	$('.address').show();
	$($('.left a')[2]).css('background-color','white');
},function(){
	$('.address').hide();
	$($('.left a')[2]).css('background-color','');
})

// 2.设置选择收货的地区
// var dd =document.querySelector('span.dd');
// var address = document.querySelectorAll('div.address a');
// for(var i=0;i<address.length;i++){
// 	address[i].index = i; 
// 	address[i].onclick = function(){
// 		for(var j=0;j<address.length;j++){
// 			address[j].className = "";
// 		}
// 		dd.innerHTML = address[this.index].innerHTML;
// 		address[this.index].className = 'active';
// 	}
// }


// 设置送货地址的选择
$(function(){
	$('.address a').click(function(){
		$('.address a').removeClass('active');
		$(this).addClass('active');
		 $('.dd').html($(this).html());
	})
})

/********************banner广告轮播图**********************/
// 1.设置变量
var lun = 1;
// 2.开始定时
var timer = setInterval(playing,2000);
// 3.定义轮播函数
function playing(){
	if(lun>9){
		lun=0;
	}
	imgRun(lun);
	spanRun(lun);
	bg(lun);
	lun++;
}
// 4.设置banner的背景颜色变化函数
function bg(i){
	switch(i){
		case 0:
			$('.banner').css('background','#D01A16');
		break;
		case 1:
			$('.banner').css('background','#24E2BC');
		break;
		case 2:
			$('.banner').css('background','#CA6B27');
		break;
		case 3:
			$('.banner').css('background','#DC192A');
		break;
		case 4:
			$('.banner').css('background','#F7487F');
		break;
		case 5:
			$('.banner').css('background','#FF8B14');
		break;
		case 6:
			$('.banner').css('background','#BA128B');
		break;
		case 7:
			$('.banner').css('background','#7F167D');
		break;
		case 8:
			$('.banner').css('background','#D87838');
		break;
		case 9:
			$('.banner').css('background','#D81A1C');
		break;
	}
}
// 5.图片的轮播函数
function imgRun(i){
	$('.adcont img').not($('.adcont img').eq(i)).fadeOut(100);
	$('.adcont img').eq(i).fadeIn(300);
}

// 6.焦点的轮播函数
function spanRun(i){
	$('.spanlist span').removeClass('active');
	$('.spanlist span').eq(i).addClass('active');
}

// 7.左键点击切换
$('.leftfo').click(function(){
	if(lun<0){
		lun = 9;
	}
	imgRun(lun-2);
	spanRun(lun-2);
	bg(lun-2);
	lun--;
});

// 8.右键点击切换
$('.rightfo').click(function(){
	if(lun>9){
		lun = 0;
	}
	imgRun(lun);
	spanRun(lun);
	bg(lun);
	lun++;
});


/*******************banner上面的左右两个键的样式***********************/
// 1.设置鼠标滑到banner上的左右键的显示
$('.banner').mouseenter(function(){
	$('.leftfo').css('opacity','0.3');
	$('.rightfo').css('opacity','0.3');
	clearInterval(timer);
	$('.spanlist span').mouseenter(function(){
		imgRun($(this).index());
		spanRun($(this).index());
		bg($(this).index());
	}).mouseleave(function(){
		lun=$(this).index()+1;
	});
	
}).mouseleave(function(){
	$('.leftfo').css('opacity','0');
	$('.rightfo').css('opacity','0');
	timer = setInterval(playing,2000);
})

// 2.设置左右键滑上去的样式的颜色加深
$('.leftfo').hover(function(){
	$(this).css('opacity','.7');
},function(){
	$(this).css('opacity','.3');
});
$('.rightfo').hover(function(){
	$(this).css('opacity','.7');
},function(){
	$(this).css('opacity','.3');
});


/*******************左侧导航栏的显示***********************/
// 设置导航栏的显示
$('.lfnav ul li').hover(function(){
	$('.lfnav ul li').removeClass('hh');
	$(this).addClass('hh');
	$('.lfnav ul li').find('a').removeClass('hov');
	$($(this)[$(this).index()]).find('a').addClass('hov');
	$($('.bignav>div')[$(this).index()]).show();
	$($('.bignav>div')[$(this).index()]).hover(function(){
		$('.lfnav ul li').removeClass('hh');
		$($('.lfnav ul li')[$(this).index()]).addClass('hh');
		$('.lfnav ul li').find('a').removeClass('hov');
		$($('.lfnav ul li')[$(this).index()]).find('a').addClass('hov');
		$(this).show();
	},function(){
		$('.lfnav ul li').removeClass('hh');
		$('.lfnav ul li').find('a').removeClass('hov');
		$(this).hide();
	})
},function(){
	$('.lfnav ul li').removeClass('hh');
	$('.lfnav ul li').find('a').removeClass('hov');
	$($('.bignav>div')[$(this).index()]).hide();
});


/*******************手机流量充值***********************/
// 1.手机充值
$('.money span').eq(0).click(function(){
	$(this).addClass('active').removeClass('actived');
	$(this).next().removeClass('activedd').addClass('actived');
	$('.moneycon').show();
	$('.liucon').hide();
})
 // 2.流量充值
$('.money span').eq(1).click(function(){
	$(this).prev().removeClass('active').addClass('actived');
	$(this).addClass('activedd').removeClass('actived');
	$('.moneycon').hide();
	$('.liucon').show();
})

// 3.话费框金额选择
$('.moneycon select').click(function(){
	var tel=$('.moneycon select').val();
	switch(tel){
		case '1':
			$('.moneycon p span').html('￥9.9元-10元');
		break;
		case '2':
			$('.moneycon p span').html('￥19.8元-20元');
		break;
		case '3':
			$('.moneycon p span').html('￥29.7元-29.98元');
		break;
		case '4':
			$('.moneycon p span').html('￥49.45元-49.93元');
		break;
		case '5':
			$('.moneycon p span').html('￥98.9元-99.85元');
		break;
		case '6':
			$('.moneycon p span').html('￥197.8元-199.7元');
		break;
		case '7':
			$('.moneycon p span').html('￥296.8元-299.6元');
		break;
		case '8':
			$('.moneycon p span').html('￥494.8元-499.4元');
		break;
	}
})
// 4.流量框金额选择
$('.liucon select').click(function(){
	var tel=$('.liucon select').val();
	switch(tel){
		case '1':
			$('.liucon p span').html('￥0.95元-1元');
		break;
		case '2':
			$('.liucon p span').html('￥1.9元-2元');
		break;
		case '3':
			$('.liucon p span').html('￥3元');
		break;
		case '4':
			$('.liucon p span').html('￥4.75元-5元');
		break;
		case '5':
			$('.liucon p span').html('￥6元-7元');
		break;
		case '6':
			$('.liucon p span').html('￥9.5元-10元');
		break;
		case '7':
			$('.liucon p span').html('￥14.5元-15元');
		break;
		case '8':
			$('.liucon p span').html('￥28.5元-30元');
		break;
		case '9':
			$('.liucon p span').html('￥47.5元');
		break;
	}
})


/*******************boimg的点击轮播图***********************/
//1.设置鼠标滑到boimg上的
$('.boimg').mouseenter(function(){
	$('.leftbo').css('opacity','0.3');
	$('.rightbo').css('opacity','0.3');	
}).mouseleave(function(){
	$('.leftbo').css('opacity','0');
	$('.rightbo').css('opacity','0');
})

// 2.设置左键滑上boimg去的样式
$('.leftbo').hover(function(){
	$(this).css('opacity','.7');
},function(){
	$(this).css('opacity','.3');
});

// 3.设置右键滑上boimg去的样式
$('.rightbo').hover(function(){
	$(this).css('opacity','.7');
},function(){
	$(this).css('opacity','.3');
});

// 4.复制一份内容
$('.botr').html($('.botl').html());

// 5.定义变量
var lli =$('.botl').position().left;
var ii =$('.botr').position().left;

// 6.设施左键点击boimg的样式  
$('.rightbo').click(function(){
	if(lli <= -4000){
		$('.botl').css('left','4000px');
		lli=$('.botl').position().left;
	}
	if(ii <= -4000){
		$('.botr').css('left','4000px');
		ii=$('.botr').position().left;
	}
	lli = lli-1000;
	ii = ii-1000;
	$('.botl').animate({
		'left':lli+'px'
	},500);
	$('.botr').animate({
		'left':ii+'px'
	},500);
})

// 7.设施右键点击boimg的样式 
$('.leftbo').click(function(){
	if(lli >=4000){
		$('.botl').css('left','-4000px');
		lli=$('.botl').position().left;
	}
	if(ii >=4000){
		$('.botr').css('left','-4000px');
		ii=$('.botr').position().left;
	}
	lli = lli+1000;
	ii = ii+1000;
	$('.botl').animate({
		'left':lli+'px'
	},500);
	$('.botr').animate({
		'left':ii+'px'
	},500);
	
})

/*******************点击轮播图函数***********************/
function lunbo(i){
	// 1.设置鼠标滑到上的
	$('.spclun[name='+i+']').mouseenter(function(){
		$('.spcleft[name='+i+']').css('opacity','0.3');
		$('.spcright[name='+i+']').css('opacity','0.3');	
	}).mouseleave(function(){
		$('.spcleft[name='+i+']').css('opacity','0');
		$('.spcright[name='+i+']').css('opacity','0');
	})

	// 2.设置左键滑上的样式
	$('.spcleft[name='+i+']').hover(function(){
		$(this).css('opacity','.7');
	},function(){
		$(this).css('opacity','.3');
	});

	// 3.设置右键滑上道的样式
	$('.spcright[name='+i+']').hover(function(){
		$(this).css('opacity','.7');
	},function(){
		$(this).css('opacity','.3');
	});

	// 4.定义变量
	var li =$('.spclunl[name='+i+']').position().left;
	var lii =$('.spclunr[name='+i+']').position().left;
	var spani;

	// 5.复制一份内容
	$('.spclunr[name='+i+']').html($('.spclunl[name='+i+']').html());

	// 6.设施左键点击的样式  
	$('.spcright[name='+i+']').click(function(){
		spcrightRun();
		spcspanRun();
	})
	function spcrightRun(){
		if(li <= -1600){
			$('.spclunl[name='+i+']').css('left','1600px');
			li=$('.spclunl[name='+i+']').position().left;
		}
		if(lii <= -1600){
			$('.spclunr[name='+i+']').css('left','1600px');
			lii=$('.spclunr[name='+i+']').position().left;
		}
		li = li-400;
		lii = lii-400;
		$('.spclunl[name='+i+']').animate({
			'left':li+'px'
		},500);
		$('.spclunr[name='+i+']').animate({
			'left':lii+'px'
		},500);
	}


	// 7.设施右键点击的样式 
	$('.spcleft[name='+i+']').click(function(){
		spcleftRun();
		spcspanRun();
	})
	function spcleftRun(){
		if(li >= 1600){
			$('.spclunl[name='+i+']').css('left','-1600px');
			li=$('.spclunl[name='+i+']').position().left;
		}
		if(lii >= 1600){
			$('.spclunr[name='+i+']').css('left','-1600px');
			lii=$('.spclunr[name='+i+']').position().left;
		}
		li = li+400;
		lii = lii+400;
		$('.spclunl[name='+i+']').animate({
			'left':li+'px'
		},500);
		$('.spclunr[name='+i+']').animate({
			'left':lii+'px'
		},500);
	}

	// 8.设置焦点的轮播
	function spcspanRun(){
		spani = Math.ceil(li/400);
		if(spani<0){
			spani = Math.abs(spani);
			if(spani == 4){
				spani = 0;
			}
		}else{
			spani = 4 - spani;
			if(spani == 4){
				spani = 0;
			}
		}
		$('.spcspan[name='+i+'] span').removeClass('active');
		$($('.spcspan[name='+i+'] span')[spani]).addClass('active');
	}

	// 9.设置鼠标滑上焦点
	$('.spcspan[name='+i+'] span').mouseenter(function(){
		li = -$(this).index()*400+400;
		lii = li+1600;
		spcrightRun();
		spcspanRun();
	})

	// 10.设置自动滑动
	function spcimgRun(){
		spcrightRun();
		spcspanRun();
	}
	var spctimer = setInterval(spcimgRun,3000);
	$('.spclun[name='+i+']').hover(function(){
		clearInterval(spctimer);
	},function(){
		spctimer = setInterval(spcimgRun,3000);
	})
}

// 特色频道
lunbo("te");

// 楼层的轮播图
lunbo('onef');
lunbo('twof');
lunbo('threef');
lunbo('fourf');


//设置右边栏点击事件
$('.asideord').add($('.mess')).add($('.top')).hover(function(){
	$(this).find('.moreaside').show().animate({
		'width':'120px',
		'opacity':'1'
	},500)
},function(){
	$(this).find('.moreaside').animate({
		'width':'0px',
		'opacity':'0',
	},500).hide();
})

// 设置购物车的点击拉出  点击关闭
var flag = 1;
$('.asidecar').click(function(){
	if(flag == 1){
		$('.aside').animate({
			'right':'-3px'
		},500);
		flag = 0;
	}else{
		$('.aside').animate({
			'right':'-273px'
		},500);		
		flag = 1;
	}
	$('.asidecar').css({'color':'white','background':'#c20035'});
	$('.asidenum').css({'color':'#c20035','background':'white'});
})

// 设置xx点击的样式
$('.lefttop .xx').click(function(){
	$('.aside').animate({
		'right':'-273px'
	},500);
	flag = 1;
	$('.asidecar').css({'color':'','background':''});
	$('.asidenum').css({'color':'','background':''});
})
// 设置1-3楼选项卡
function louceng(i){
	$('.ftop[name='+i+'] ul li').mouseenter(function(){
		$('.ftop[name='+i+'] ul li').removeClass('active');
		$('.ftop[name='+i+'] ul li').removeClass('unactive');
		$(this).addClass('active').siblings().addClass('unactive');
		$('.fconright[name='+i+'] ul').removeClass('active');
		$($('.fconright[name='+i+'] ul')[$(this).index()]).addClass('active');
	})
}
// 设置4楼的选项卡
function otherlou(i){
	$('.ftop[name='+i+'] ul li').mouseenter(function(){
		$('.ftop[name='+i+'] ul li').removeClass('active');
		$('.ftop[name='+i+'] ul li').removeClass('unactive');
		$(this).addClass('active').siblings().addClass('unactive');
		$('.fconfourright[name='+i+'] ul').removeClass('active');
		$($('.fconfourright[name='+i+'] ul')[$(this).index()]).addClass('active');
	})
}

louceng("one");
louceng("two");
louceng("three");
otherlou("four");



//天天抢热门订单向上弹出
var i=0;
var hottime;
$('.hotorder ul').html($('.hotorder ul').html()+$('.hotorder ul').html());
function tiantian(){
	if(i>612){
		i=0;
		$('.hotorder').scrollTop(i);
	}
	i+=153;
	$('.hotorder').animate({
 		'scrollTop':i
	},500);
	hottime = setTimeout(tiantian,2000);
}
tiantian();
$('.hotorder ul li').hover(function(){
	clearTimeout(hottime);
},function(){
	hottime = setTimeout(tiantian,2000);
})

// 设置左侧边栏
var louceng;
var lout;
var topp;

// 左侧边栏的滑动
$('.floor ul li').hover(function(){
	$(this).find($('.loufix')).css({'visibility':'visible','color':'white','background':'#c20035'});
},function(){
	$('.floor ul li').find('.loufix').css({'visibility':'hidden'});
	$('.floor ul li').eq(louceng).find('.loufix').css({'visibility':'visible','color':'#C20035','background':'white'});
})

// 左侧边栏的点击
$('.floor ul li').eq(0).click(function(){
	$('body,html').animate({
		'scrollTop':1705
	},200);
})
$('.floor ul li').eq(1).click(function(){
	$('body,html').animate({
		'scrollTop':2305
	},200);
})
$('.floor ul li').eq(2).click(function(){
	$('body,html').animate({
		'scrollTop':3005
	},200);
})
$('.floor ul li').eq(3).click(function(){
	$('body,html').animate({
		'scrollTop':3705
	},200);
})
$('.floor ul li').eq(4).click(function(){
	$('body,html').animate({
		'scrollTop':4505
	},200);
})

// 设置顶部搜索的显示
$(window).scroll(function(){
	var topl = $(document).scrollTop();
	if(topl>800){
		$('.showSearch').show();
		$('.aside').show();		
	}else{
		$('.showSearch').hide();
		$('.aside').hide();
	}
	if(topl>1400){
		$('.floor').show();
	}else{
		$('.floor').hide();
	}
})

// 返回顶部
$('.ttop').click(function(){
	$('body,html').animate({
		'scrollTop':0
	},200)
})


var aa;
//左侧边栏的显示 
var f = 0;
$(window).scroll(function(){
	topp = $(document).scrollTop();	
	if(topp<1400){
		$('.f').css('color','#ccc');
		f=0;
	}
	if(topp>=1400 && topp<=2000){
		louceng = 0;
		if(f!=1){
			$('.f').css('color','#ccc');
			loutu(louceng);
			f=1;
		}
	}
	if(topp>2000  && topp<=2700){
		louceng =1;
		if(f!=2){
			$('.f').css('color','#ccc');
			loutu(louceng);
			f=2;
		}
	}
	if(topp>2700  && topp<=3400){
		louceng = 2;
		if(f!=3){
			$('.f').css('color','#ccc');
			loutu(louceng);
			f=3;
		}
	}
	if(topp>3400 && topp<=3900){
		louceng = 3;
		if(f!=4){
			$('.f').css('color','#ccc');
			loutu(louceng);
			f=4;
		}
	}
	if(topp>3900){
		louceng = 4;
		f=5;
	}
	$('.floor ul li').find('.loufix').css({'visibility':'hidden'});
	$('.floor ul li').eq(louceng).find('.loufix').css({'visibility':'visible','color':'#C20035','background':'white'});	
});

// 楼层数的动画
function loutu(aa){
	$('.f[name="'+aa+'"]').animate({
		'height':'0px'
	},100,function(){
		$(this).css('color','#c20035');
	}).animate({
		'height':'25px'
	},1000);
	switch(aa){
		case 0: 
			f = 1;
		break;
		case 1:
			f = 2;
		break;
		case 2:
			f = 3;
		break;
		case 3:
			f = 4;
		break;
	}
	
}


// 验证手机号
var reg = /^1(([358]\d)|(7[0135678])|(4[57]))\d{8}$/;
	// 话费充值
	$('.chongzhi').click(function(){
	if($('.telnumber').val().match(reg)==null){
		$('.righttel').show();
		return false;
	}
	return true;
	})
	$('.telnumber').focus(function(){
		$('.righttel').hide();
	})
	// 流量充值
	$('.chongzhil').click(function(){
	if($('.telnumberl').val().match(reg)==null){
		$('.righttell').show();
		return false;
	}
	return true;
	})
	$('.telnumberl').focus(function(){
		$('.righttell').hide();
	})

