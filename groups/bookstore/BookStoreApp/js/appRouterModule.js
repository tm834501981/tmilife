(function(){
    angular.module("appRouterModule",[])
        .config(["$routeProvider",function($routeProvider){
            $routeProvider
                .when("/bookList",{
                    templateUrl:"tpl/bookList.html",
                    controller:"bookListController"
                })
                .when("/bookDetail/:id",{
                    templateUrl:"tpl/bookDetail.html",
                    controller:"bookDetailController"
                })
                .when("/login",{
                    templateUrl:"tpl/login.html",
                    controller:"loginController"
                })
                .when("/carList",{
                    templateUrl:"tpl/carList.html",
                    controller:"carListController"
                })
                .otherwise("/bookList");
        }])
})();