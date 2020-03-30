<?php
	sleep(2);
	if (!empty($_POST)) {
		//执行添加
		require "./extends/Model.class.php";
		require "./extends/config.php";

		$model = new Model("b_order");
		$detailsModel = new Model("b_orderdetail");

		$order_data["user_id"] = $_POST["user_id"];

		$order_id = $model->add($order_data);

		if($order_id > 0){
			$details = json_decode($_POST['cartBooks'],true);
			$tempResutl = true;
			foreach ($details as $key => $val) {
				$detail_data["order_id"] = $order_id;
				$detail_data['book_id'] = $val["id"];
				$detail_data['book_num'] = $val['num'];
				$detailResult = $detailsModel->add($detail_data);
			 	if($detailResult>0){

		    	}else {
		    		$tempResutl=false;
		    	}
			}
			if($tempResutl){
	   	       $result['code'] = 0;
	   	       $result['data'] = "下单成功";
	   	    }else{
	   	       $result['code'] = 1;
	   	       $result['data'] = "订单详情插入失败";
	   	    }
		}else {
			$result['code'] = 2;
			$result['data'] = "订单添加失败";
		}
	} else {
		$result['code'] = 1;
		$result["data"] = "数据为空";
	}

	echo json_encode($result);


	