window.onload=function(){
	var left=document.getElementById("touleft");
	var right=document.getElementById("touright");
	var obj=document.getElementById("obj");
	var now=0;
	var arr=new Array();	
	arr[0]="./images/ad1.jpg";
	arr[1]="./images/ad2.jpg";
	arr[2]="./images/ad3.jpg";
	
	right.onclick=function(){
		if(now==arr.length-1){
			now=0;
		}else{
			now+=1;
		}
		obj.src=arr[now];
	}
	left.onclick=function(){
		if(now==arr.length-3){
			now=2;
		}else{
			now-=1;
		}
		obj.src=arr[now];
	}
		
}