// JavaScript Document
var now=0;
var time=4000;
var arr=new Array();
arr[0]="./images/ad1.jpg";
arr[1]="./images/ad2.jpg";
arr[2]="./images/ad3.jpg";
setInterval(change,time);
function change(){
var obj=document.getElementById("obj");
if(now==arr.length-1){
now=0;
}
else{now+=1;}
obj.src=arr[now];
}
