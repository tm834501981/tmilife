<?php 
	require "../extends/Model.class.php";
	require "../extends/config.php";
	if(empty($_GET['a'])){
		header("location:index.php");
		exit;
	}
	$model = new Model("s_product");
	$imagemodel = new Model('s_image');
	switch($_GET['a']){
		case 'delete':
			if($model->delete($_GET['pro_id'])>0){
				echo "<script>alert('删除成功')</script>";
				echo "<script>location.href = 'index.php?page=".$_GET['page']."'</script>";
			}else{
				echo "<script>alert('删除失败')</script>";
				echo "<script>history.back()</script>";
			}
		break;
		case 'edit':
			// var_dump($_POST);
			$result = $model->save($_POST);
			if($result>0){
				echo "<script>alert('修改成功')</script>";	
				echo "<script>location.href = 'index.php?page=".$_POST['page']."'</script>";
			}else{
				echo "<script>alert('修改失败')</script>";
				echo "<script>history.back()</script>";
			}
		break;
		case 'add':
			$_POST['pro_addtime'] = time();
			if($model->add($_POST)>0){
				echo "<script>alert('添加成功')</script>";
				echo "<script>location.href='index.php'</script>";
			}else{
				echo "<script>alert('添加失败')</script>";
				echo "<script>history.back()</script>";
			}
		break;
		case 'imagedelete':
			$deleteresult = $imagemodel->delete($_GET['image_id']);
			$imageurl = "../images/".$_GET['image_name'];
			unlink($imageurl);
			if($deleteresult>0){
				echo "<script>alert('删除成功')</script>";
				echo "<script>location.href = 'image_index.php?pro_id=".$_GET['pro_id']."'</script>";
			}else{
				echo "<script>alert('删除失败')</script>";
				echo "<script>history.back()</script>";
			}
		break;
		case 'addimage':
			require "../extends/Upload.class.php";
			$upload = new Upload();
			// $upload->exts = ['jpg','png','jpeg'];
			$upload->rootPath = "../images/";
			$upload->autoSub = false;			
			$upload->saveName = $_POST['image_name'];
			$info = $upload->upload();
			if(!$info){
				echo "<script>alert('".$upload->getError()."')</script>";
				echo "<script>history.back()</script>";
			}else{
				$imageadd['image_path'] = $info['images']['savepath'];
				$imageadd['image_name'] = $info['images']['savename'];
				$imageadd['pro_id'] = $_POST['pro_id'];
				$imageadd['image_addtime'] = time();
				if($imagemodel->add($imageadd)>0){
					echo "<script>alert('添加成功')</script>";
					echo "<script>location.href = 'image_index.php?pro_id=".$_POST['pro_id']."'</script>";
				}else{
					$imageaddurl = "../images/".$info['images']['savename'];
					unlink($imageaddurl);
					echo "<script>alert('添加失败')</script>";
					echo "<script>history.back()</script>";
				}
			}
		break;
		case 'editimage':
			$imageedit = $imagemodel->find($_POST['image_id']);
			$prename = $imageedit['image_name'];
			$index = strrpos($imageedit['image_name'],'.');			
			// $postconf = strrev(substr(strrev($prename),0,$index));
			$postconf = substr($prename,$index);
			$postname = $_POST['image_name'].$postconf;
			$imageedit['image_name'] = $postname;
			$imageedit['image_id'] = $_POST['image_id'];
			require "../extends/Upload.class.php";
			if(empty($_FILES['imageedit']['tmp_name'])){
				$testnumber = 0;
				$mysql = $imagemodel->select();
				for($i=0;$i<count($mysql);$i++){
					if($postname === $mysql[$i]['image_name']){
						 $testnumber = 1;
					}				
				}
				if($testnumber === 1){
					echo "<script>alert('存在相同文件名的文件')</script>";
					echo "<script>location.href='image_edit.php?image_id=".$_POST['image_id']."&pro_id=".$_POST['pro_id']."'</script>";
					exit;
				}else{
					$imagedata['image_name'] = $postname;
					$imagedata['image_id'] = $_POST['image_id'];
					$image = "../images/".$prename;
					rename($image, "../images/".$postname);
					if($imagemodel->save($imagedata) > 0){
						echo "<script>alert('修改成功')</script>";
						echo "<script>location.href='image_index.php?pro_id=".$_POST['pro_id']."'</script>";
					}
				}								
			}else{
				$upload = new Upload();
				// $upload->exts = ['jpg','png','jpeg'];
				$upload->rootPath = "../images/";
				$upload->autoSub = false;
				$upload->replace = true;
				$upload->saveName = $_POST['image_name'] ;
				$info = $upload->upload();
				if(!$info){
					echo "<script>alert('".$upload->getError()."')</script>";
					echo "<script>history.back()</script>";
				}else{
					$imageadd['image_path'] = $info['imageedit']['savepath'];
					$imageadd['image_name'] = $info['imageedit']['savename'];
					$imageadd['image_id'] = $_POST['image_id'];
					$imageadd['image_addtime'] = time();
					if($imagemodel->save($imageadd)>0){
						if($imageedit['image_name'] !== $prename){
							$imagepreurl = "../images/".$prename;
							unlink($imagepreurl);
						}
						echo "<script>alert('添加成功')</script>";
						echo "<script>location.href = 'image_index.php?pro_id=".$_POST['pro_id']."'</script>";
					}else{
						$imageaddurl = "../images/".$info['imageedit']['savename'];
						unlink($imageaddurl);
						echo "<script>alert('添加失败')</script>";
						echo "<script>history.back()</script>";
					}
				}
			}			
		break;
	}

 ?>