<?php
    function echoMessage($code,$data){
    	$result['code'] = $code;
     	$result['data'] = $data;
     	//echo json_encode($result);
        if(isset($_GET['callback'])){
            echo $_GET['callback']."(".json_encode($result).")";
        }else {
            echo json_encode($result);
        }
    }