/**
 * 内部事件
 */

$(function () {
    /**
     * 点击切换登录三角
     ****************************************************************/
    $('.login').on('mouseover', function () {
        $('.login-list').show(function () {
            $('.login img').css({transform: 'rotate(180deg)'});
        });
    });
    $('.login-list').on('mouseleave', function () {
        $(this).hide(function () {
            $('.login img').css({transform: 'rotate(0deg)'});
        });
    });

    /**
     * 导航音乐
     ****************************************************************/
    $('#ul li').each(function (index) {
        var i = $(this).index();
        var audio = $('audio')[index];
        $(this).on('mouseover', function () {
            $('#ul li span').eq(i).stop().animate({top: 0});
            $('#ul li a').eq(i).toggleClass('current').siblings().removeClass('current');
            audio.pause();
            audio.play();

        });
        $(this).on('mouseout', function () {
            $('#ul li span').eq(i).stop().animate({top: 35});
            $('#ul li a').removeClass('current');
        });
    });

    /**
     * 点击切换小红心
     * @type {boolean}
     ****************************************************************/
    var isClick = false;  // 记录点击
    $('.control').each(function (index) {
        $(this).on('click', function () {
            var url = isClick ? 'images/heart-change.png' : 'images/heart.png';
            $('.control img').eq(index).attr('src', url);
            isClick = !isClick;
        });
    });

    /**
     * 切换歌单
     * @type {*}
     ****************************************************************/
    var ulIndex = $('.banner ul').index();
    $('.rotate3D li').each(function () {
        var rotateIndex = $(this).index();
        $(this).on('mouseover', function () {
            ulIndex = rotateIndex;
            $('.banner ul').eq(ulIndex).stop().show(500).siblings().stop().hide(500);
        });
    });

    /**
     * 鼠标按下移动盒子 --> 模态框
     ****************************************************************/
    // 定位盒子的距离
    $('.panel').mousedown(function (event) {
        var event = event || window.event;
        // 求出移动的距离
        var startX = event.pageX - $('#move').position().left;
        var startY = event.pageY - $('#move').position().top;

        $(document).mousemove(function (event) {
            // 限制在可视区域内运动
            var l = event.pageX - startX;
            var t = event.pageY - startY;
            var r = $(document).width() - $('#move').width();
            var b = $(document).height() - $('#move').height();
            // 检测边缘碰撞

            if (l <= 0) {
                $('#move').css({left: 0 + 'px'});
            }
            else if (l > r) {
                $('#move').css({left: r + 'px'});
            }
            else {
                $('#move').css({left: l + 'px'});
            }

            if (t < 0) {
                $('#move').css({top: 0 + 'px'});
            }
            else if (t > b) {
                $('#move').css({top: b + 'px'});
            }
            else {
                $('#move').css({top: t + 'px'});
            }
            /*
             // 给盒子赋值
             $('#move').css({left: event.pageX - startX, top: event.pageY - startY});
             */
            return false;

        });
        // 鼠标弹起移除事件
        $(document).mouseup(function () {
            $(document).unbind();
        });
    });
    // 点击手机登录显示模态框 蒙版出现
    $('.mobile').on('click', function () {
        $('.mask').show();
        $('#move').show();
    });
    // 显示或者隐藏模态框
    $('.email').on('click', function () {
        $('.mask').show();
        $('#move').show();
        $('.login-title').html("网易邮箱登录<i class='close'></i>");
        $('#user-pwd input').attr('placeholder', "请输入邮箱");
    });
    // 点击小X 取消蒙版 隐藏模态框
    $('.close').on('mousedown', function () {
        $('#move').hide();
        $('.mask').hide();
    });

});


