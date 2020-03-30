/**
 * Created by lin on 2016/12/14.
 */
(function(){
    angular.module("localStorageModule",[])
        .provider("localStorageService",function(){
            this.$get = ["$window",function($window){
                return {
                    get:function(key){
                        return $window.localStorage.getItem(key);
                    },
                    set:function(key,value) {
                        $window.localStorage.setItem(key,value);
                    },
                    getObject:function(key){
                        var objStr = $window.localStorage.getItem(key);
                        try{
                            return JSON.parse(objStr);
                        }catch (e){
                            return null;
                        }
                    },
                    setObject:function(key,value){
                        $window.localStorage.setItem(key,JSON.stringify(value));
                    }
                }
            }]
        })
})();