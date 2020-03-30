(function(){
	angular.module("orderCtrlModule",[])
		.controller("orderController",["$scope","$rootScope","getDataService",
			"localStorageService","$ionicListDelegate","messageService",
			function($scope,$rootScope,getDataService,localStorageService,$ionicListDelegate,
				messageService){
			$rootScope.$on("loginSuccess",function(){
				var user_id = localStorageService.getObject("userList").user_id;
			})
			var user_id = localStorageService.getObject("userList").user_id;
			console.log(user_id);
			$scope.closeOrder = function(){
				$rootScope.orderModal.hide();
			}
			$rootScope.$on("updateOrder",function(){
				var user_id = localStorageService.getObject("userList").user_id;
				$scope.closeOrder = function(){
					$rootScope.orderModal.hide();
				}
				getDataService.getRequest(
				"getOrders.php",
				{
					user_id:user_id
				},
				function(data){
					$scope.order = data.data;
					$scope.orders = {};
	                var index = 0;
	                for(var i in $scope.order){
	                    $scope.orders[index] = [];
	                    for (var k in $scope.order[i]["order_details"]){
	                        $scope.orders[index].push({
	                            "order_id":$scope.order[i]["order_details"][k].order_id,
	                            "book_id":$scope.order[i]["order_details"][k].book_id,
	                            "book_num":$scope.order[i]["order_details"][k].book_num,
	                            "book_data":$scope.order[i]["order_details"][k].book_data
	                        });
	                    }
	                    index++;
	                }

	                for (var n in $scope.orders){
	                    var total = 0;
	                   for(var m in $scope.orders[n]){
	                       total += $scope.orders[n][m].book_num * $scope.orders[n][m].book_data[0].book_price
	                   }
	                    $scope.orders[n]["total"] = total;
	                }
	                console.log($scope.order);	
				},
				function(error){
					console.log(error);
				}
			)
			})
			getDataService.getRequest(
				"getOrders.php",
				{
					user_id:user_id
				},
				function(data){
					$scope.order = data.data;
					$scope.orders = {};
	                var index = 0;
	                for(var i in $scope.order){
	                    $scope.orders[index] = [];
	                    for (var k in $scope.order[i]["order_details"]){
	                        $scope.orders[index].push({
	                            "order_id":$scope.order[i]["order_details"][k].order_id,
	                            "book_id":$scope.order[i]["order_details"][k].book_id,
	                            "book_num":$scope.order[i]["order_details"][k].book_num,
	                            "book_data":$scope.order[i]["order_details"][k].book_data
	                        });
	                    }
	                    index++;
	                }

	                for (var n in $scope.orders){
	                    var total = 0;
	                   for(var m in $scope.orders[n]){
	                       total += $scope.orders[n][m].book_num * $scope.orders[n][m].book_data[0].book_price
	                   }
	                    $scope.orders[n]["total"] = total;
	                }
	                console.log($scope.orders);
				},
				function(error){
					console.log(error);
				}
			)
			$scope.delete = function(id){
				messageService.showLoading("正在删除");
				getDataService.getRequest(
					"delOrder.php",
					{
						order_id:id
					},
					function(data){
						if(data.code == 0){
							messageService.hideLoading();
							messageService.showMessage(data.data);					
							$rootScope.$broadcast("updateOrder");
						}else{
							messageService.hideLoading();
							messageService.showMessage(data.data);
						}
					},
					function(error){
						messageService.hideLoading();
						messageService.showMessage(error);
					}
				)
			}
			
		}])
})();