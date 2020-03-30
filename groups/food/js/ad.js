// JavaScript Document
var now=0;
var time=3000;
var arr=new Array();
arr[0]="url('./images/ad1.jpg')";
arr[1]="url('./images/ad2.jpg')";
arr[2]="url('./images/ad3.jpg')";
setInterval(change,time);
function change(){
var top=document.getElementById("top");
if(now==arr.length-1){
now=0;
}
else{now+=1;}
top.style.background=arr[now];
}