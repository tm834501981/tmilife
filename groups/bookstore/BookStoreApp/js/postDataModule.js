// 封装通用的POST请求服务模块 后面的项目都可以使用
(function(){
    angular.module("postDataModule",[])
        .factory("postDataService",["$http","HOST",
            function($http,HOST){
              return {
                  postRequest:function(url,data,success,error){
                      $http.post(HOST+url,data)
                          .then(function(response){
                              success(response.data);
                          },function(error){
                              error(error);
                            }
                          )
                  }
              }
        }])
})();