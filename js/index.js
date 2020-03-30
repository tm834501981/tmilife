window.onscroll = function(){
	var top = document.body.scrollTop||document.documentElement.scrollTop;
	if(top>100){
		var exam_ul = document.getElementById("somethinggood")
		var exam_lis = exam_ul.getElementsByTagName("li");
		for(var i=0;i<exam_lis.length;i++){
			exam_lis[i].style.animationName = "flyingtop";
			exam_lis[i].style.animationDuration = "1s";
			exam_lis[i].style.animationTimimgFunction = "ease";
			exam_lis[i].style.animationDelay = i/4 +'s';
			exam_lis[i].style.animationFillMode = "forwards";
		}

	}
}