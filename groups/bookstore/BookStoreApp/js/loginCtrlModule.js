(function(){
    angular.module("loginCtrlModule",[])
        .controller("loginController",["$scope","$rootScope",
            "postDataService","userDataService","$location","localStorageService","$rootScope",
            function($scope,$rootScope,postDataService,
                     userDataService,$location,localStorageService,$rootScope){
                $scope.user = {};
                $scope.loginClick = function(){
                    $rootScope.loading = true;
                    $rootScope.loadingText = "加载中...";  
                    postDataService.postRequest(
                        "userInfoLogin.php",
                        {
                            username:$scope.user.name,
                            password:hex_md5($scope.user.password)
                        }
                        ,function(data){
                            if(data.code==0){ 
                                $rootScope.loading = false;
                                if(localStorageService.getObject("UserList")){
                                     $scope.UserData = localStorageService.getObject("UserList");
                                }else{
                                    $scope.UserData = {};
                                }
                                userDataService.userData = data.data;
                                userDataService.userData.isLogin = true;                        
                                localStorageService.setObject("userList",userDataService.userData);
                                $location.path("/bookList");
                            }else{
                                $rootScope.loading = false;
                                alert(data.data);
                            }
                        },
                        function(error){
                            console.log(error);
                        }
                    )

                }

            }
        ])
})();