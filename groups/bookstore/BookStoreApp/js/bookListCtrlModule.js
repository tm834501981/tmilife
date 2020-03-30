(function(){
    angular.module("bookListCtrlModule",[])
        .controller("bookListController",["$scope","IMAGEURL",
            "getDataService","userDataService","$location","carDataService","localStorageService","$rootScope","$timeout",
            function($scope,IMAGEURL,getDataService,
                     userDataService,$location,carDataService,localStorageService,$rootScope,$timeout){
                if(localStorageService.getObject("userList")){
                    $rootScope.loading = true;
                    $rootScope.loadingText = "加载中..."; 
                    $timeout(function(){
                        $rootScope.loading = false;
                    },1000);
                    $scope.IMAGEURL = IMAGEURL; 

                    var userInfo = localStorageService.getObject("userList");
                    $scope.isUser = userInfo;
                    console.log($scope.isUser);
                    //»ñÈ¡Ò³ÃæÊé¼®µÄÐÅÏ¢
                    getDataService.getRequest(
                        "book.php",
                        null,
                        function(response){
                            console.log(response);
                            if(response.code==0){
                                $scope.books = response.data;
                            }else {
                                console.log(response.data);
                            }
                        },
                        function(error){
                            console.log(error);
                        }
                    );
                    //µÇ³ö
                    $scope.loginOut = function(){
                        $rootScope.loading = true;
                        $rootScope.loadingText = "注销中..."; 
                        $timeout(function(){
                            $rootScope.loading = false;
                            userDataService.userData = {};
                            userDataService.userData.isLogin = false;
                            userInfo = {};
                            userInfo.isLogin = false;
                            $scope.isUser = userInfo;
                            localStorageService.setObject("userList",userInfo);
                            $scope.carDataNum = 0;
                            $location.path("/bookList");
                        },1000);
                        
                    }
                    // Ìí¼Ó¹ºÎï³µ
                    if(localStorageService.getObject("carList")){
                         $scope.carData = localStorageService.getObject("carList");
                    }else{
                        $scope.carData = {};
                    }
                    $scope.addCar = function(book){
                        if(!userInfo.isLogin){
                            $location.path("/login");
                        }else{
                            if($scope.carData[book.id]){
                                $scope.carData[book.id]['num']++;
                            }else{
                                $scope.carData[book.id] = {
                                    "book_id":book.id,
                                    "book_title":book.title,
                                    "book_price":book.price,
                                    "num":1
                                }
                            }
                            localStorageService.setObject("carList",$scope.carData);
                        }
                    }
                    // ¼àÌý¹ºÎï³µµÄÄÚÉÌÆ·µÄÊýÁ¿
                    if(userInfo.isLogin){
                        $scope.$watch("carData",function(){
                        var num = 0;
                        for(var i in localStorageService.getObject("carList")){
                            num += localStorageService.getObject("carList")[i]['num'];
                        }
                        $scope.carDataNum =  num;
                        },true); 
                    }else{
                        $scope.carDataNum = 0;
                    }
                }else{
                    $location.path("/login");
                }
               
                              
            }
        ])
})();