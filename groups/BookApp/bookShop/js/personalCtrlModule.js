(function(){
	angular.module("personalCtrlModule",[])
		.controller("personalController",["$scope","$rootScope","modalDataService",
			"$ionicModal","localStorageService","$rootScope",
			function($scope,$rootScope,modalDataService,$ionicModal,localStorageService,
				$rootScope){
			if(localStorageService.getObject("userList").isLogin == true){
				$scope.isperson = true;
				$scope.personalData = localStorageService.getObject("userList");
				$ionicModal.fromTemplateUrl("tpl/changeperson.html",{
					scope:$rootScope,
					animation:'slide-in-up'
				}).then(function(modal){
					$rootScope.personModal = modal;				
				})
				$ionicModal.fromTemplateUrl("tpl/order.html",{
					scope:$rootScope,
					animation:'slide-in-up'
				}).then(function(modal){
					$rootScope.orderModal = modal;				
				})
				$scope.changePerson = function(){
					$rootScope.personModal.show();
				}
				$scope.showOrder = function(){
					$rootScope.orderModal.show();
				}
			}else{
				$scope.isperson = false;
			}

			$rootScope.$on("changed",function(event,data){
				$scope.isperson = true;
				$scope.personalData = localStorageService.getObject("userList");
			})
			
		}])
})();