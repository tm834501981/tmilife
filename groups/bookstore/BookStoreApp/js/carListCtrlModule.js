(function(){
	angular.module("carListCtrlModule",[])
			.controller("carListController",["$scope","localStorageService","$location","$rootScope","$timeout",
				function($scope,localStorageService,$location,$rootScope,$timeout){
					$rootScope.loading = true;
					$rootScope.loadingText = "加载中...";
					$timeout(function(){
						$rootScope.loading =false;
						if(localStorageService.getObject("userList").isLogin){
							$scope.carLists = localStorageService.getObject("carList");
						}
					},1000);
										

					// 减少商品
					$scope.subGoods = function(id){
						$scope.carLists[id]['num']--;
						if($scope.carLists[id]['num'] <= 0){
							delete $scope.carLists[id];
						}
						localStorageService.setObject("carList",$scope.carLists);
					}

					// 添加商品
					$scope.addGoods = function(id){
						$scope.carLists[id]['num']++;
						localStorageService.setObject("carList",$scope.carLists);
					}
					// var goods = localStorageService.getObject("carList");
					
					$scope.$watch("carLists",function(){
	                    var total = 0;
	                    for(var i in $scope.carLists){
	                        total += $scope.carLists[i]['book_price']*$scope.carLists[i]['num'];
	                    }
	                    $scope.total =  total;
	                },true);  

	                $scope.orderPut = function(){
	                	$rootScope.loading = true;
                   		$rootScope.loadingText = "订单提交中..."; 
	                	// alert("订单提交成功");
	                	localStorageService.setObject("carList","");
	                	$timeout(function(){
	                		$location.path("/bookList");
	                	},1000);	     

	                }
			}])
})();