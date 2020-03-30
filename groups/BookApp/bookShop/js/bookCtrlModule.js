(function(){
	angular.module("bookCtrlModule",[])
		.controller("bookController",["$scope","getDataService","IMAGEURL",
			"$ionicSlideBoxDelegate","$timeout","messageService",
			function($scope,getDataService,IMAGEURL,$ionicSlideBoxDelegate,
				$timeout,messageService){
			$scope.IMAGEURL = IMAGEURL;	
			$scope.books = [];
			$timeout(function(){
				$ionicSlideBoxDelegate.enableSlide(true);
			},500);
			$scope.pagerClick = function(index){
				$ionicSlideBoxDelegate.slide(index,1000);
			};
			$scope.onSlideChanger = function(index){
				console.log("onSlideChanger"+index);
			};
			// 实现上拉历史数据显示出来
            var nextPage = false;
            $scope.hasNextPage = function(){
                return nextPage;
            };
			var loadMoreStart = 0;
            $scope.loadMore = function(){
                console.log("loadMore");
                // 上拉历史数据
                getDataService.getRequest(
                    "book.php",
                    {start:loadMoreStart},
                    function(data){
                        console.log(data);
                        if(data.code==0){
                            if(data.data.length>=0){
                                nextPage = true;
                            }else {
                                nextPage = false;
                            }
                            console.log(data.data);
                            $scope.books = $scope.books.concat(data.data);
                            loadMoreStart = loadMoreStart+4;
                        }else {
                            nextPage = false;
                            messageService.showMessage(data.data);
                        }
                        $scope.$broadcast("scroll.infiniteScrollComplete");
                    },
                    function(error){
                        console.log(error);
                        nextPage = false;
                        messageService.showMessage(error);
                        $scope.$broadcast("scroll.infiniteScrollComplete");
                    }
                )
            };
            $scope.loadMore();
		}])
})();