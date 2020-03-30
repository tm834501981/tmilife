/**
 * Created by lin on 2016/12/20.
 */
(function(){
    angular.module("messageModule",[])
        .factory("messageService",["$ionicLoading","$rootScope",
            function($ionicLoading,$rootScope){
                $rootScope.hideLoad = function(){
                    $ionicLoading.hide();
                    $rootScope.$broadcast("abortRequest");
                };
                return {
                    showLoading:function(msgText){
                        var showText =
                            "正在加载中...<button class='button-icon light ion-close-round'" +
                            "ng-click='hideLoad()'></button>";
                        if(msgText){
                            showText = msgText;
                        }
                        $ionicLoading.show({
                            template:showText
                        })
                    },
                    hideLoading:function(){
                        $ionicLoading.hide();
                    },
                    showMessage:function(title){
                        $ionicLoading.show({
                            template:title,
                            noBackdrop:true,
                            duration:2000
                        })
                    }
                }

        }])
})();