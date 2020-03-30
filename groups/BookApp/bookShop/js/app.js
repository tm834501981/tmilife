(function(){
	angular.module("BookApp",["ionic",
			"appRouterModule",
			"bookCtrlModule",
			"hostConfigModule",
			"httpPostModule",
			"getDataModule",
			"postDataModule",
			"messageModule",
			"localStorageModule",
			"bookDetailCtrlModule",
			"cartCtrlModule",
			"modalDataModule",
			"personalCtrlModule",
			"loginCtrlModule",
			"registCtrlModule",
			"changePersonCtrlModule",
			"orderCtrlModule"

		])
		.run(["$rootScope","$ionicModal","modalDataService",
			"USERDATA","messageService","$timeout","localStorageService","$state",
			function($rootScope,$ionicModal,modalDataService,USERDATA,
				messageService,$timeout,localStorageService,$state){
			if(localStorageService.getObject("userList") == null){
				localStorageService.setObject("userList",{isLogin:false});
			}
			if(localStorageService.getObject("carList") == null){
				localStorageService.setObject("carList",{cartBooks:{}});
				$rootScope.carList = {};
			}else{
				$rootScope.carList = localStorageService.getObject("carList").cartBooks;
			}

			$rootScope.$on("carts",function(event,data){
				$rootScope.carList = localStorageService.getObject("carList").cartBooks;
			})

			$rootScope.$watch("carList",function(){
				var arr = Object.keys($rootScope.carList);
				$rootScope.badges = {
					carts:arr.length
				}
			},true)
			
			$rootScope.$on("changed",function(event,data){
				$rootScope.isLogin = true;
				$rootScope.username = localStorageService.getObject("userList").user_name;
				modalDataService.personal = localStorageService.getObject("userList");
			})

			$ionicModal.fromTemplateUrl("tpl/login.html",{
				scope:$rootScope,
				animation:'slide-in-up'
			}).then(function(modal){
				$rootScope.loginModal = modal;
			})

			$ionicModal.fromTemplateUrl("tpl/regist.html",{
				scope:$rootScope,
				animation:'slide-in-up'
			}).then(function(modal){
				$rootScope.registModal = modal;
			})
			// var username = localStorageService.getObject("userList").user_name;
			// var cartname = localStorageService.getObject("carList").user_name;
			$rootScope.login = function(){
				$rootScope.loginModal.show();
				var arr = Object.keys($rootScope.carList);
				$rootScope.badges = {
					carts:arr.length
				}				
			}
			$rootScope.$on("loginSuccess",function(){
				$rootScope.isLogin = true;
				$rootScope.username = localStorageService.getObject("userList").user_name;
				modalDataService.personal = localStorageService.getObject("userList");
				$state.go("tab.book");
				// $rootScope.$broadcast("personal",modalDataService.personal);
			})
			if(localStorageService.getObject("userList").isLogin == true){
				$rootScope.isLogin = true;
				$rootScope.username = localStorageService.getObject("userList").user_name;
			}

			$rootScope.loginout = function(){
				messageService.showLoading("注销中...");
				$timeout(function(){
					messageService.hideLoading();
					$rootScope.loginModal.hide();
					$rootScope.registModal.hide();
					$rootScope.isLogin = false;
					localStorageService.setObject("userList",{isLogin:false});
					$rootScope.badges = {
						carts:0
					}
					modalDataService.personal = USERDATA.user;
					$state.go("tab.book");
				},1000);
			}	
		}])
})();