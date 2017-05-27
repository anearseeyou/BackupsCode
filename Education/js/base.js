/**
 * Created by Administrator on 2017/2/17.
 */


window.Edu = {};

// 判断过度结束的索引改变
Edu.transitionEnd = function (obj, callBack) {
    // 1.判断当前是否是对象
    if (typeof obj != 'object') return;

    // 2. 监听事件,并回调
    obj.addEventListener('transitionEnd', function (e) {
        callBack && callBack(e);
    });

    obj.addEventListener('webkitTransitionEnd', function (e) {
        callBack && callBack(e);
    });
};

// 封装一个tap点击事件

Edu.tap = function (obj, callback) {
    if (typeof obj != 'object') return;
    var startTime = 0;
    var isMove = false;
    obj.addEventListener('touchstart', function () {
        startTime = Date.now();
    });
    obj.addEventListener('touchmove', function () {

        isMove = true;
    });
    obj.addEventListener('touchend', function (e) {
        if ((Date.now() - startTime) < 200 && !isMove) {
            callback && callback(e)
        }
        startTime = 0;
        isMove = false;
    });
}