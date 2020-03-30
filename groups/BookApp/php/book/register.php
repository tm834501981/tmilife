<?php 
//执行注册
 sleep(2);
 if(isset($_POST['user_name']) 
 	&& isset($_POST["user_password"])
 	&& isset($_POST["user_tel"])
 	&& isset($_POST["user_sex"])) {
    	// 插入数据库 之前 需要判断该用户是否已经注册
    	require "./extends/config.php";
    	require "./extends/Model.class.php";
    	$userModel = new Model("b_user");
    	$username = $_POST['user_name'];
    	$selectResult = $userModel->where("user_name='$username'")->select();
    	if($selectResult){
    		// 该用户名已经存在 无法注册
    		$result['code'] = 1;
    		$result['data'] = "用户名已经注册 请更换用户名";
    		echo json_encode($result);
    	}else {
    		// 插入数据到数据库
    		$newUser['user_name'] = $_POST['user_name'];
    		$newUser['user_password'] = md5($_POST['user_password']);
    		$newUser['user_sex'] = $_POST['user_sex'];
    		$newUser['user_tel'] = $_POST['user_tel'];
    		$addResult = $userModel->add($newUser);
    		if($addResult>0){
                $selectUser  = $userModel->where("user_name='$username'")->select();
    			$result['code'] = 0;
    			$result['data'] = $selectUser;
    			echo json_encode($result);
    		}else {
    			$result['code'] = 2;
    			$result['data'] = "用户名注册失败 请稍后在尝试";
    			echo json_encode($result);
    		}
    	}
    }else {
    	$result['code'] = 3;
    	$result['data'] = "no user params";
    	echo json_encode($result);
    }
