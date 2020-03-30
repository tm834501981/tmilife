(function(){
	angular.module("cartCtrlModule",[])
		.controller("cartController",["$scope","modalDataService","$rootScope",
			"localStorageService","IMAGEURL","postDataService","messageService","$state",
			function($scope,modalDataService,$rootScope,localStorageService,IMAGEURL,
				postDataService,messageService,$state){
				if(localStorageService.getObject("userList").isLogin == true){
					$scope.iscar = true;
					$scope.IMAGEURL = IMAGEURL;
					var carusername = localStorageService.getObject("userList").user_name;
					var cardata = localStorageService.getObject("carList");
					if(localStorageService.getObject("carList").user_name == carusername){
						$scope.cartBooks = localStorageService.getObject("carList").cartBooks;
					}else{
						$scope.cartBooks = {};
					}
					$scope.jia = function(id){
						$scope.cartBooks[id]['num']++;
						cardata.cartBooks = $scope.cartBooks;
						localStorageService.setObject("carList",cardata);
						$rootScope.$broadcast("carts");
					}
					$scope.jian = function(id){
						if($scope.cartBooks[id]['num'] > 1){
							$scope.cartBooks[id]['num']--;
						}else{
							delete $scope.cartBooks[id];
						}
						cardata.cartBooks = $scope.cartBooks;
						localStorageService.setObject("carList",cardata);	
						$rootScope.$broadcast("carts");			
					}
					$scope.$watch("cartBooks",function(){
						var total = 0;
						for(var i in $scope.cartBooks){
							total += $scope.cartBooks[i]['price']*$scope.cartBooks[i]['num'];
						}
						$scope.total = total;
					},true);			
				}else{
					$scope.iscar = false;
				}
				
				$scope.pay = function(){
					messageService.showLoading("正在下单");
					console.log(cardata);
					postDataService.postRequest(
						"order.php",
						{
							user_id:cardata.user_id,
							cartBooks:JSON.stringify(cardata.cartBooks)
						},
						function(data){
							if(data.code == 0){
								messageService.hideLoading();
								messageService.showMessage(data.data);
								var userinfo = localStorageService.getObject("userList");
								userinfo.cartBooks = {};
								localStorageService.setObject("carList",userinfo);
								$state.go("tab.personal");
								$rootScope.$broadcast("carts");
								$rootScope.$broadcast("carList");
							}else{
								messageService.hideLoading();
								messageService.showMessage(data.data);
							}
						},
						function(error){
							console.log(error);
						});
				}
		}])
})();