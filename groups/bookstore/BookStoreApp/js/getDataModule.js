(function(){
    angular.module("getDataModule",[])
        .service("getDataService",["$http","HOST",
            function($http,HOST){
                this.getRequest = function(url,data,success,error){
                    $http.get(HOST+url,{params:data})
                        .success(success)
                        .error(error)
                }
            }
        ])
})();