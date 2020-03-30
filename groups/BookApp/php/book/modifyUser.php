<?php
    sleep(2);
	 if(isset($_POST['user_name']) && 
        isset($_POST['user_sex']) &&
        isset($_POST['user_tel']) &&
        isset($_POST['user_password'])){
	 	require "./extends/config.php";
        require "./extends/Model.class.php";
        $userModel = new Model('b_user');
        $data['user_id'] = $_POST['user_id'];
        $data['user_name'] = $_POST['user_name'];
        $data['user_sex'] = $_POST['user_sex'];
        $data['user_tel'] = $_POST['user_tel'];
        $data['user_password'] = md5($_POST['user_password']);
        $saveUser = $userModel->save($data);
        // var_dump($saveUser);
        if($saveUser > 0){
        	$result['code'] = 0;
	        $result['data'] = $_POST;
	        echo json_encode($result);
        }else{
        	$result['code'] = 1;
	        $result['data'] = "修改失败";
	        echo json_encode($result);
        }
	 }else{
	 	$result['code'] = 2;
        $result['data'] = "no post params";
        echo json_encode($result);
	 }