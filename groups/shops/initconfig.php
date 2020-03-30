<?php 
	define("URL","/groups/shops/");
	if(empty($_COOKIE['admin_user'])){
      header("http://www.tminlife.cn/".URL.'login.php');
   	}
 ?>