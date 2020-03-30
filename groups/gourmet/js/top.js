// top的样式
window.addEventListener("load",function() {
    var btn = document.getElementById("btn");
    var top = document.getElementById("top");


    function goTop(acceleration, time) { 
        //修改参数可调整返回顶部的速度
        acceleration = acceleration || 0.1;
        time = time || 10;
        var speed = 1 + acceleration;
        function getScrollTop() { //取得滚动条的竖直距离
            return document.documentElement.scrollTop || document.body.scrollTop;
        }
        function setScrollTop(value) { //设置滚动条的竖直距离,实现效果的关键就是在很短的间隔时间内不断地修改滚动条的竖直距离,以实现滚动效果
            document.documentElement.scrollTop = value;
            document.body.scrollTop = value;
        }

        // 右边top随着滚动条的变化弹出消失
        window.onscroll = function() {
            var scrollTop = getScrollTop();
            if (scrollTop > 100) { //判断滚动条距离窗口顶部多远时显示出来，这里是100px
                top.style.visibility = "visible";
                top.style.bottom = 50 + 'px';
                top.style.transition = 0.5 + 's';
            } else {
                top.style.visibility  = "hidden";
                top.style.bottom = 0 + 'px';
                top.style.transition = 0.1+'s';
            }
        };

        btn.onclick = function () {
            var timer = setInterval(function() {
            setScrollTop(Math.floor(getScrollTop() / speed)); //取得滚动条竖直距离，除以speed后再给滚动条设置竖直距离
            if (getScrollTop() == 0)
                clearInterval(timer);
            }, time);
        };
    }
    goTop(0.2,30);
}, false);