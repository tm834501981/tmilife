(function(){
    angular.module("userDataModule",[])
        .provider("userDataService",function(){
            this.$get = function(){
                return {
                	userData:{
                		isLogin:false
                	}
                }
            }
        })
})();