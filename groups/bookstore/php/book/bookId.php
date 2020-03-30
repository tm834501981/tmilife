<?php
	require "./extends/Model.class.php";
	require "./extends/config.php";

	if(isset($_GET['id'])){
		//$idMap['book_id'] = $_GET['id'];
		// id=1
		$bookId = $_GET['id'];
		$bookModel = new Model("b_book");
		$findResult = $bookModel->find($bookId);
		if($findResult){
			$tempBook['id'] = $findResult['book_id'];
			$tempBook['title'] = $findResult['book_title'];
			$tempBook['author'] = $findResult['book_author'];
			$tempBook['price'] = $findResult['book_price'];
			$tempBook['pudate'] = $findResult['book_pudate'];
			$tempBook['desc'] = $findResult['book_desc'];

			// 根据bookid 去相关的查询图片的信息
			$imageModel = new Model('b_images');
			$selectResult =$imageModel->where("book_id=$bookId")->select();
			if($selectResult){
				$tempBook['images'] = $selectResult;
			}else{
				$tempBook['images'] = null;
			}
			// 根据bookid 去查找关联的产品
			$relationModel = new Model("b_relatebook");
			$relationResult = $relationModel->where("book_id=$bookId")->select();
			if($relationResult){
				foreach($relationResult as $key => $value){
					$relate_bookid =  $value['relate_bookid'];
					$relateResult = $imageModel->where("book_id = $relate_bookid")->select();
					if($relateResult){
						$value['images'] = $relateResult;
					}else {
						$value['images'] = null;
					}
					$relationArray[] = $value;
				}
				$tempBook["relation"] = $relationArray;
			}else {
				$tempBook['relation'] = null;
			}
			$result['code'] = 0;
	        $result['data'] = $tempBook;
		}else{
			$result['data'] = 'no find data';
			$result['code'] = 1;
		}
	}else{
		$result['data'] = 'no id params';
		$result['code'] = 3;	
	}
	header('Access-Control-Allow-Origin: http://localhost:8855');
	echo json_encode($result);

