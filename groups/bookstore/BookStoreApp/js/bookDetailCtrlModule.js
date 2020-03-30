(function(){
    angular.module("bookDetailCtrlModule",[])
        .controller("bookDetailController",["$scope",
            "$routeParams","getDataService","IMAGEURL","$rootScope",
            function($scope,$routeParams,getDataService,IMAGEURL,$rootScope){
                $rootScope.loading = true;
                $rootScope.loadingText = "加载中...";
                $scope.IMAGEURL = IMAGEURL;
                getDataService.getRequest(
                    "bookId.php",
                    {"id":$routeParams.id},
                    function(response){
                        $rootScope.loading = false;
                        console.log(response);
                        if(response.code==0){
                            $scope.book = response.data;
                        }else {
                            console.log(response.data);
                        }
                    },
                    function(error){
                        $rootScope.loading = false;
                        console.log(error);
                    }
                )


            }
        ])
})();