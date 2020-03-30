/**
 * Created by lin on 2016/12/15.
 */
// 封装通用的POST请求服务模块 后面的项目都可以使用
(function(){
    angular.module("postDataModule",[])
        .factory("postDataService",["$http","HOST",
            function($http,HOST){
              return {
                  postRequest:function(url,data,success,error){
                      try {
                          $http.post(HOST+url,data,{timeout:3000})
                              .then(function(response){
                                      success(response.data);
                                  },function(error){
                                      //console.log(error);
                                      error(error);
                                  }
                              )
                      }catch(e){
                          console.log(e);
                      }
                  }
              }
        }])
})();