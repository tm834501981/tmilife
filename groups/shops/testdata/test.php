<?php 
	require "../extends/Model.class.php";
	require "../extends/config.php";
	function test(){
		$model = new Model("s_product");
		for($i=0;$i<100;$i++){
			$testproduct['pro_name'] = "iPhone".$i;
			$testproduct['pro_price'] = 6000+$i*10;
			$testproduct['pro_desc'] = "很实用也很贵";
			$testproduct['pro_addtime'] = time();
			$testproduct['pro_oldprice'] = 6000+$i*20;
			$testproduct['pro_number'] = $i*10;
			$result = $model->add($testproduct);
			echo $result;

		}	
	}
	// test();
	
 ?>