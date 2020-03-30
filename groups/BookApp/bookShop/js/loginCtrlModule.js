(function(){
	angular.module("loginCtrlModule",[])
		.controller("loginController",["$scope","postDataService","modalDataService",
			"USERDATA","$rootScope","messageService","$ionicModal","localStorageService",
			function($scope,postDataService,modalDataService,USERDATA,$rootScope,
				messageService,$ionicModal,localStorageService){
			$scope.user = {};
			$scope.loginClick = function(){
				if($scope.user.username != null && $scope.user.password != null ){
					messageService.showLoading("正在登录中...")
					postDataService.postRequest(
						"userInfoLogin.php",
						{
							username:$scope.user.username,
							password:hex_md5($scope.user.password)
						},
						function(data){
							messageService.hideLoading();
							if(data.code == 0){
								$scope.loginModal.hide();
								if(localStorageService.getObject("userList")){
                                     $scope.userData = localStorageService.getObject("userList");
                                }else{
                                    $scope.userData = {};
                                }
                                modalDataService.userData = data.data;
                                modalDataService.userData.isLogin = true;                        
                                localStorageService.setObject("userList",modalDataService.userData);                  
								if(localStorageService.getObject("userList").user_name !=
									localStorageService.getObject("carList").user_name ){
									var changeUser = localStorageService.getObject("userList");
									changeUser.cartBooks = {};
									localStorageService.setObject("carList",changeUser);
									$rootScope.$broadcast("carts");
								}
								$rootScope.$broadcast("loginSuccess");
							}else{
								messageService.showMessage(data.data);
							}
						},
						function(error){
							messageService.hideLoading();
							messageService.showMessage(error);
						})
				}else{
					messageService.showMessage("用户名和密码不能为空");
				}
			}
			
			
			$scope.regist = function(){
				$rootScope.registModal.show();
			}

			$scope.closelogin = function(){
				$scope.loginModal.hide();
			}
			
		}])
})();