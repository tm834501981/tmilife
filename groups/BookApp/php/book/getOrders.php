<?php 

if (!empty($_GET['user_id'])) {

	$id = $_GET['user_id'];

	require "./extends/config.php";
	require "./extends/Model.class.php";

	$model = new Model("b_order");

	$order_data = $model->where("user_id={$id}")->select();

	//取出商品详情
	$detailModel = new Model("b_orderdetail");

	foreach ($order_data as &$val) {
		// var_dump($val);
		$val['order_details'] = $detailModel->where("order_id={$val['order_id']}")->select();
		// var_dump($val['order_details']);
		foreach ($val['order_details'] as &$value) {
			$bookModel = new Model("b_book");
			$value['book_data'] = $bookModel->query("SELECT book_title,book_price FROM b_book WHERE book_id = {$value['book_id']}");
			// var_dump($value['book_data']);
		}
	}

	$result['code'] = 0;
	$result['data'] = $order_data;


} else {
	$result['code'] = 1;
	$result['data'] = "请指定用户";
}


echo json_encode($result);
 ?>