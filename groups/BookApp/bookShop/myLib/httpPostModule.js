/**
 * Created by lin on 2016/12/13.
 */
(function(){
    angular.module("httpPostModule",[])
        // 服务的供应商的固定写法 是 服务名称+Provider
        // 用来对服务进行修改
        .config(["$httpProvider",function($httpProvider){
            $httpProvider.defaults.headers.post["Content-Type"] =
                "application/x-www-form-urlencoded";
            // 拿到post请求发送过来的数据
            $httpProvider.defaults.transformRequest.push(
                // application/json
                // 对象-> 键值对的形式
                function(data){
                    //console.log(data);
                    if(data){
                        try{
                            var result = JSON.parse(data);
                            if(result){
                                var postStr;
                                //{"name":"david","age":20}
                                for(var key in result){
                                    if(postStr){
                                        postStr += '&'+ key + '='+result[key];
                                    }else {
                                        postStr = key + "="+result[key];
;                                    }
                                }
                                //console.log(postStr);
                                return postStr;
                            }
                        }catch(e){
                            return data;
                        }
                    }
            })
        }])
})();