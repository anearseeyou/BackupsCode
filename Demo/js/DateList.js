/***************************************************************
 * 项目日历逻辑
 ***************************************************************/

$(function () {
    $('#calendar').calendar({
        ifSwitch: true,  // 是否切换月份
        backToday: true  // 是否返回当天
    });
    $('.arrow span').on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
    });
    $('.calendar-date .item').each(function (index) {
        if (index > 32 && index >33 && index > 34) $(this).css({display:'none'});
    });
});

;(function ($, window, document, undefined) {
    // 函数
    var Calendar = function (elem, options) {
        this.$calendar = elem;
        this.defaults = {
            ifSwitch: true,
            backToday: false
        };
        this.opts = $.extend({}, this.defaults, options);
    };
    // 原型方法
    Calendar.prototype = {
        // 输入数据并显示
        showCalendar: function () {
            var year = dateObj.getDate().getFullYear();
            var month = dateObj.getDate().getMonth() + 1;
            var dateStr = returnDateStr(dateObj.getDate());
            var firstDay = new Date(year, month - 1, 1); // 当前月的第一天

            this.$calendarTitle_text.text(year + '年' + dateStr.substr(4, 2));
            this.$calendarDate_item.each(function (i) {
                // 得到当前列表显示的所有天数
                var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
                console.log(allDay);
                var allDay_str = returnDateStr(allDay);
                $(this).text(allDay.getDate()).attr('data', allDay_str);

                // 安全校验
                if (returnDateStr(new Date()) === allDay_str) {
                    $(this).attr('class', 'item item-curDay');
                } else if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
                    $(this).attr('class', 'item item-curMonth');
                } else {
                    $(this).attr('class', 'item');
                }
            });
        },

        // 渲染DOM
        renderDOM: function () {
            this.$calendar_title = $('<div class="calendar-title pageTitle date-content"></div>');
            this.$calendar_week = $('<ul class="calendar-week clearfix"></ul>');
            this.$calendar_date = $('<ul class="calendar-date clearfix"></ul>');
            this.$calendar_today = $('<div class="calendar-today"></div>');

            // 拼接赋值
            var _titleStr = '<a href="javascript:;" class="title pro-title"></a>' +
                '<div class="arrow">' +
                '<span class="tit cur" href="javascript:;" id="backToday">本月</span>' +
                '<span class="tit arrow-next">下月</span>' +
                '<span class="tit arrow-prev">上月</span>'
            '</div>';
            var _weekStr ='<li class="item">星期日</li>'+
                '<li class="item">星期一</li>' +
                '<li class="item">星期二</li>' +
                '<li class="item">星期三</li>' +
                '<li class="item">星期四</li>' +
                '<li class="item">星期五</li>' +
                '<li class="item">星期六</li>';

            var _dateStr = '';
            var _dayStr = '<i class="triangle"></i>' +
                '<p class="date"></p>' +
                '<p class="week"></p>';

            for (var i = 0; i < 6; i++) {
                _dateStr += '<li class="item"></li>' +
                    '<li class="item"></li>' +
                    '<li class="item"></li>' +
                    '<li class="item"></li>' +
                    '<li class="item"></li>' +
                    '<li class="item"></li>' +
                    '<li class="item"></li>';
            }

            this.$calendar_title.html(_titleStr);
            this.$calendar_week.html(_weekStr);
            this.$calendar_date.html(_dateStr);
            this.$calendar_today.html(_dayStr);

            this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
        },

        // 初始化
        inital: function () {
            var self = this;
            this.renderDOM();
            this.$calendarTitle_text = this.$calendar_title.find('.title');
            this.$backToday = $('#backToday');
            this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
            this.$arrow_next = this.$calendar_title.find('.arrow-next');
            this.$calendarDate_item = this.$calendar_date.find('.item');

            this.showCalendar();

            if (this.opts.ifSwitch) {
                this.$arrow_prev.bind('click', function () {
                    var _date = dateObj.getDate();
                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));
                    self.showCalendar();
                });

                this.$arrow_next.bind('click', function () {
                    var _date = dateObj.getDate();
                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));
                    self.showCalendar();
                });
            }

            if (this.opts.backToday) {
                this.$backToday.bind('click', function () {
                    if (!self.$calendarDate_item.hasClass('item-curDay')) {
                        dateObj.setDate(new Date());
                        self.showCalendar();
                    }
                });
            }
        },
        constructor: Calendar
    };
    $.fn.calendar = function (options) {
        var calendar = new Calendar(this, options);
        return calendar.inital();
    };
    // 用到的方法
    var dateObj = (function () {
        var _date = new Date();
        return {
            getDate: function () {return _date;},
            setDate: function (date) {_date = date;}
        }
    })();
    // 日期转字符串
    function returnDateStr(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        month = month < 9 ? ('0' + month) : ('' + month);
        day = day < 9 ? ('0' + day) : ('' + day);
        return year + month + day;
    };
})(jQuery, window, document);
