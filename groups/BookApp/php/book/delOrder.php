<?php
	sleep(2);
	if(isset($_GET["order_id"])){
		require "./extends/Model.class.php";
		require "./extends/config.php";

		$orderModel = new Model("b_order");
		$orderId = (int)$_GET["order_id"];
		$deleteResult = $orderModel->delete($orderId);

		if($deleteResult){
			$result['code'] = 0;
			$result['data'] = "删除成功";
		}else{
			$result['code'] = 1;
			$result['data'] = "删除失败";
		}
	}else {
		$result['code'] = 2;
		$result['data'] = "no data params";
	}

	echo json_encode($result);
