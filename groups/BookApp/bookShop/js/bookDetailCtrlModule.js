(function(){
	angular.module("bookDetailCtrlModule",[])
		.controller("bookDetailController",["$scope","getDataService","IMAGEURL",
			"$stateParams","modalDataService","$rootScope","localStorageService",
			"$state","localStorageService",
			function($scope,getDataService,IMAGEURL,$stateParams,modalDataService,
				$rootScope,localStorageService,$state,localStorageService){
			$scope.IMAGEURL = IMAGEURL;
			getDataService.getRequest(
				"bookId.php",
				{"id":$stateParams.id},
				function(data){
					if(data.code == 0){
						$scope.book = data.data;
					}else{
						console.log(data.data);
					}
				},
				function(error){
					console.log(error);
				})
			if(localStorageService.getObject("carList").user_name == 
				localStorageService.getObject("userList").user_name){
				$scope.bookList = localStorageService.getObject("carList").cartBooks;
			}else{
				$scope.bookList = {};
			}
			$scope.addCar = function(book){
				if(localStorageService.getObject("userList").isLogin == true){
					if($scope.bookList[book.id]){
						$scope.bookList[book.id]['num']++;
					}else{
						$scope.bookList[book.id] = {
							"id":book.id,
							"name":book.title,
							"price":book.price,
							"image":book.images,
							"num":1
						}
					}
					modalDataService.cartBooks = $scope.bookList;
					modalDataService.userdata = localStorageService.getObject("userList");
					modalDataService.userdata.cartBooks = $scope.bookList;
					console.log(modalDataService.userdata);
					localStorageService.setObject("carList",modalDataService.userdata);
					$rootScope.$broadcast("carts");
					// $rootScope.$watch("carList",function(){
					// 	var arr = Object.keys(localStorageService.getObject("carList").cartBooks);
					// 	$rootScope.$broadcast("carts",arr.length);
					// },true);	
				}else{
					// $state.go("tab.book");
					$rootScope.loginModal.show();
				}			
			}
			

		}])
})();