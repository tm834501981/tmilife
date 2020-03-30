// 侧拉栏的弹出样式


	var flagn = 1;
		function show(){
			var nav = document.getElementById('nav');
			var one = document.getElementById('one');
			var two = document.getElementById('two');
			var three = document.getElementById('three');
			var leftnavs = document.getElementById('leftnavs');
			if(flagn == 1){
				leftnavs.style.left = 0;

				if(document.body.offsetWidth >=400){
					// 获取当前屏幕的分辨率比较大小
					nav.style.marginLeft = 250 + 'px';	
					threeline.style.marginLeft = 250 + 'px';
					one.style.transform = "rotate(45deg) translate3d(0px,14px,10px)";
					three.style.transform = "rotate(-45deg) translate3d(0px,-14px,10px)";
				}else{
					// nav.style.marginLeft = 60 + '%';
					threeline.style.marginLeft = 60 + '%';
					one.style.transform = "rotate(45deg) translate3d(0px,13px,10px)";
					three.style.transform = "rotate(-45deg) translate3d(0px,-13px,10px)";						
				}
				one.style.transition = .5 + 's';
				two.style.transition = 0.2 + 's';
				three.style.transition = .5 + 's';				
				two.style.visibility = "hidden";		
				flagn = 0;
			}else{
				leftnavs.style.left = '-' + 250 + 'px';
				nav.style.marginLeft = 0 + 'px';
				threeline.style.marginLeft = 0 + 'px';
				one.style.transition = .5 + 's';
				two.style.transition = .9 + 's';
				three.style.transition = .5 + 's';
				one.style.transform = "rotate(0deg) translate3d(0px,0px,0px)";
				two.style.visibility = "visible";
				three.style.transform = "rotate(0deg) translate3d(0px,0px,0px)";
				flagn = 1;
			}
		}


// 第一行的点击下拉
var flag = 1;
var flags = 1;
var flagt = 1;
var flagfo = 1;
function showf(){
	// 获取下拉框，加减号的id
	var fir = document.getElementById('fir');
	var jiaf = document.getElementById('jiaf');
	var jianf = document.getElementById('jianf');
	// 点击时下拉框显示，加号隐藏，减号显示
	if(flag == 1){
		fir.style.display = 'block';
		sec.style.display = 'none';
		thr.style.display = 'none';
		fou.style.display = 'none';
		jiaf.style.display = 'none';
		jianf.style.display = 'block';
		jias.style.display = 'block';
		jians.style.display = 'none';
		jiat.style.display = 'block';
		jiant.style.display = 'none';
		jiafo.style.display = 'block';
		jianfo.style.display = 'none';
		flag = 0;
		flags = 1;
		flagt = 1;
		flagfo = 1;
	}else{
		// 再次点击下拉框隐藏，加号显示，减号隐藏
		fir.style.display = 'none';
		flag = 1;
		jiaf.style.display = 'block';
		jianf.style.display = 'none';
	}
}


// 第二行的点击下拉
function shows(){
	var sec = document.getElementById('sec');
	var jias = document.getElementById('jias');
	var jians = document.getElementById('jians');
	if(flags == 1){
		fir.style.display = 'none';
		sec.style.display = 'block';
		thr.style.display = 'none';
		fou.style.display = 'none';
		jiaf.style.display = 'block';
		jianf.style.display = 'none';
		jias.style.display = 'none';
		jians.style.display = 'block';
		jiat.style.display = 'block';
		jiant.style.display = 'none';
		jiafo.style.display = 'block';
		jianfo.style.display = 'none';
		flag = 1;
		flags = 0;
		flagt = 1;
		flagfo = 1;

	}else{
		sec.style.display = 'none';
		jias.style.display = 'block';
		jians.style.display = 'none';
		flags = 1;
	}
}


// 第三行的点击下拉
function showt(){
	var thr = document.getElementById('thr');
	var jiat = document.getElementById('jiat');
	var jiant = document.getElementById('jiant');
	if(flagt == 1){
		fir.style.display = 'none';
		sec.style.display = 'none';
		thr.style.display = 'block';
		fou.style.display = 'none';
		jiaf.style.display = 'block';
		jianf.style.display = 'none';
		jias.style.display = 'block';
		jians.style.display = 'none';
		jiat.style.display = 'none';
		jiant.style.display = 'block';
		jiafo.style.display = 'block';
		jianfo.style.display = 'none';
		flag = 1;
		flags = 1;
		flagt = 0;
		flagfo = 1;
	}else{
		thr.style.display = 'none';
		jiat.style.display = 'block';
		jiant.style.display = 'none';
		flagt = 1;
	}
}


// 第四行的点击下拉
function showfo(){
	var fou = document.getElementById('fou');
	var jiafo = document.getElementById('jiafo');
	var jianfo = document.getElementById('jianfo');
	if(flagfo == 1){
		fou.style.display = 'block';
		fir.style.display = 'none';
		sec.style.display = 'none';
		thr.style.display = 'none';		
		jiaf.style.display = 'block';
		jianf.style.display = 'none';
		jias.style.display = 'block';
		jians.style.display = 'none';
		jiat.style.display = 'block';
		jiant.style.display = 'none';
		jiafo.style.display = 'none';
		jianfo.style.display = 'block';
		flag = 1;
		flags = 1;
		flagt = 1;
		flagfo = 0;
	}else{
		fou.style.display = 'none';
		jiafo.style.display = 'block';
		jianfo.style.display = 'none';
		flagfo = 1;
	}
}