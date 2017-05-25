// JavaScript Document
$(function () {
    //nav slide JS
    $('.aside').on('click', '.slideBar', function () {
        var _this = $(this),
            aside = _this.closest('.aside'),
            mainWrap = aside.next('.wrap');
        aside.toggleClass('cur');
        _this.toggleClass('cur');
        mainWrap.toggleClass('cur');
    });


    //home page: tab & list
    $('.dateTab').on('click', 'span', function () {
        var _this = $(this),
            index = _this.index(),
            tabList = _this.closest('.dateTab').next('.tabList');
        _this.addClass('cur').siblings().removeClass('cur');
        tabList.children('div').eq(index).show().siblings().hide();
    });

    //tabs
    $('.pageTitle').on('click', 'span', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    //大弹框关闭
    $('.PopWin').on('click', '.del, .delBtn', function () {
        $(this).closest('.PopWin').hide();
        $('.tabContent').css({overflow: 'hidden'});
    });
    //可操作输入框
    $('.operableTxt').on('click', 'em', function () {
        var _this = $(this),
            operableTxt = _this.closest('.operableTxt'),
            up = _this.hasClass('up'),
            inpt = operableTxt.find('.text_s'),
            inptVal = inpt.val();

        if (up) {
            inptVal++;
        } else {
            inptVal--;
        }
        inpt.val(inptVal);
    });

    //switch ite
    $('.ite').on('click', function () {
        $(this).addClass('cur').siblings('.ite').removeClass('cur');
    });

    //edit base info
    $('.editBtn').on('click', function () {
        $('.editStyle').show().siblings('.infos2').hide();
    });
    $('.applyList').on('click', '.switchBtn', function () {
        $(this).toggleClass('cur');
    });

    //switch checkbox
    $('body').on('click','.checkboxLabel', function () {
        $(this).toggleClass('cur');
    });

    //unfold
    $('.applyList').on('click', '.unfoldBtn', function () {
        var _this = $(this),
            dd = _this.closest('dd'),
            flag = _this.hasClass('cur');
        _this.toggleClass('cur');
        dd.toggleClass('cur');
        if (flag) {
            _this.html('收起');
        } else {
            _this.html('达标信息');
        }
    });

    /**
     * ********************** 推送详情 **********************
     **/

    // 显示影院名称
    $('.inp-text').on('focus', function () {
        $('.pos-text').show();
    });
    $('.pos-text li').each(function () {
        $(this).on('click', function () {
            $('.inp-text').val($(this).text());
            $('.pos-text').hide();
        });
    });

    // 排片率和上座率
    var inputText1 = $('.add-percent').attr('placeholder');
    var inputText2 = $('.sub-percent').attr('placeholder');
    addOrSub($('.topBar'), $('.bottomBar'), inputText1, $('.add-percent'));
    addOrSub($('.addBar'), $('.subBar'), inputText2, $('.sub-percent'));
    function addOrSub(add, sub, val, ele) {
        add.on('click', function () {
            val++;
            if (val >= 100) {
                val = 100;
            }
            ele.val(val);
        });
        sub.on('click', function () {
            val--;
            if (val < 0) {
                val = 0
            }
            ele.val(val);
        });
    }
});

