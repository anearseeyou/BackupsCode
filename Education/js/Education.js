/**
 * Banner slider
 */

window.onload = function () {
    bannerSlider();
}

/**
 * 图片轮播
 */
function bannerSlider() {
    // 1. 获取标签
    var banner = document.getElementById('banner');
    var bannerUl = banner.children[0];
    var bannerOlLis = banner.children[1].children;

    var bannerW = banner.offsetWidth;

    // 2. 设置过度 清除过度 位置改变
    var addTransition = function () {
        bannerUl.style.transition = 'all .5s';
        bannerUl.style.webkitTransition = 'all .5s';
    };
    var removeTransition = function () {
        bannerUl.style.transition = 'none';
        bannerUl.style.webkitTransition = 'none';
    };
    var changeTranslateX = function (x) {
        bannerUl.style.transform = 'translateX(' + x + 'px)';
        bannerUl.style.webkitTransform = 'translateX(' + x + 'px)';
    };

    var index = 1;
    var timer = null;
    timer = setInterval(autoPlay, 1000);
    function autoPlay() {
        index++;
        addTransition();
        changeTranslateX(-index * bannerW);
    }

    // 4. 图片结束移除过度
    Edu.transitionEnd(bannerUl, function () {
        if (index >= 9) {
            index = 1;
        }
        else if (index <= 0) {
            index = 8;
        }
        removeTransition();
        changeTranslateX(-index * bannerW);
        scrollCircle();
    });

    // 5. 让指示器动起来
    function scrollCircle() {
        // 5.1 清除所有的classname 保留当前的
        for (var i = 0; i < bannerOlLis.length; i++) {
            bannerOlLis[i].className = '';
        }
        // 5.2 让圆点和图片的索引保持一直
        var circlrIndex = index;

        if (index >= 9) {
            circlrIndex = 1;
        }
        else if (index <= 0) {
            circlrIndex = 8;
        }
        bannerOlLis[circlrIndex - 1].className = 'current';
    }

    // 6. 滑动效果
    var beginX = 0, endX = 0, distanceX = 0;
    bannerUl.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        beginX = e.touches[0].clientX;

    });
    bannerUl.addEventListener('touchmove', function (e) {
        e.preventDefault();
        endX = e.touches[0].clientX;
        distanceX = beginX - endX;
        removeTransition();
        changeTranslateX(-index * bannerW - distanceX);

    });
    bannerUl.addEventListener('touchend', function () {
        if (Math.abs(distanceX) >= 1 / 3 * bannerW && endX != 0) {
            if (distanceX > 0) {
                index++
            }
            else {
                index--
            }
        }
        addTransition();
        changeTranslateX(-index * bannerW);

        timer = setInterval(autoPlay, 1000);
        beginX = 0;
        endX = 0;
        distanceX = 0;
    });
}