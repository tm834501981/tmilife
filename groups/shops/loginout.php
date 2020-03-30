<?php 
	setcookie("admin_user","",time()-1,'');
	echo '正在退出....';
	echo "<meta http-equiv='refresh' content='2,url=login.php'>";
 ?>