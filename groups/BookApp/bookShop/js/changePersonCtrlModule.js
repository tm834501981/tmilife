(function(){
	angular.module("changePersonCtrlModule",[])
		.controller("changePersonController",["$scope","messageService",
			"localStorageService","postDataService","$rootScope",
			function($scope,messageService,localStorageService,postDataService,$rootScope){
			$scope.closeperson = function(){
				$rootScope.personModal.hide();
			}
			$scope.user = localStorageService.getObject("userList");
			$scope.checkUserName = function(username){
				if(username == null || username == ""){
					return false;
				}else{
					if(username.match(/^[a-zA-Z]\w{5,11}$/)){
						return true;
					}else{
						messageService.showMessage("用户名格式错误");
						return false;
					}
				}				
			}
			$scope.checkPassword = function(password){
				if(password == null || password == ""){
					return false;
				}else{
					if(password.match(/^\w{6,12}$/)){
						return true;
					}else{
						messageService.showMessage("密码格式错误");
					}
				}				
			}
			$scope.checkRePassword = function(user){
				if(user.repassword == null || user.repassword == ""){
					return false;
				}else{
					if(user.repassword == user.user_password){
						return true;
					}else{
						messageService.showMessage("重复密码错误");
					}
				}
			}
			$scope.checkTel = function(tel){
				if(tel == null || tel == ""){
					return false;
				}else{
					if(tel.match(/^1([358]\d|4[57]|7[0135678])\d{8}$/)){
						return true;
					}else{
						messageService.showMessage("手机号码错误");
					}
				}
			}
			$scope.change = function(user){
				messageService.showLoading("正在修改...");
				if($scope.checkUserName(user.user_name) && $scope.checkPassword(user.user_password) 
					&& $scope.checkRePassword(user) && $scope.checkTel(user.user_tel)){
					postDataService.postRequest(
						"modifyUser.php",
						user,
						function(data){
							if(data.code == 0){
								messageService.hideLoading();
								changedata = data.data;
								changedata.cartBooks = localStorageService.getObject("userList").cartBooks;
								changedata.isLogin = true;
								localStorageService.setObject("userList",changedata);
								// $state.go("tab.personal");
								$rootScope.personModal.hide();
								$rootScope.$broadcast("changed");
							}else{
								messageService.hideLoading();
								messageService.showMessage(data.data);
							}
						},
						function(error){
							messageService.hideLoading();
							messageService.showMessage(error)
						})
				}else{
					messageService.hideLoading();
					messageService.showMessage("再看一遍哦，确定没填错吗？");
				}
			}

		}])
})();