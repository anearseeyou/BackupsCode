/***************************************************************
 * 项目日历
 ***************************************************************/

    // 页面加载初始化年月
    var mydate = new Date();
    var currentMonth = mydate.getMonth() + 1;
    var currentYear = mydate.getFullYear();

    // Tab切换
    $('.arrow span').on('click', function () {
        $(this).addClass('cur').siblings().removeClass('cur');
    });

    /**
     * 读取年月
     * @param 年
     * @param 月
     */
    function showDate(yyyy, mm) {
        var dd = new Date(parseInt(yyyy), parseInt(mm), 0);   // Wed Mar 31 00:00:00 UTC+0800 2010
        var daysCount = dd.getDate();            // 本月天数
        var mystr = "";                          // 写入代码
        var today = new Date().getDate();        // 今天几号
        var monthstart = new Date(parseInt(yyyy) + "/" + parseInt(mm) + "/1").getDay(); // 本月1日周几
        var lastMonth;          //上一月天数
        var nextMounth;         //下一月天数

        // 当前月及下一月
        var nowMonth = parseInt(mm);
        var nextMonth;
        nowMonth == 12 ? nextMonth = 1 : nextMonth = nowMonth + 1;
        // console.log(nextMonth);

        // 判断月份边缘值
        if (parseInt(mm) == 1) {
            lastMonth = new Date(parseInt(yyyy) - 1, parseInt(12), 0).getDate();
        }
        else {
            lastMonth = new Date(parseInt(yyyy), parseInt(mm) - 1, 0).getDate();
        }
        if (parseInt(mm) == 12) {
            nextMounth = new Date(parseInt(yyyy) + 1, parseInt(1), 0).getDate();
        }
        else {
            nextMounth = new Date(parseInt(yyyy), parseInt(mm) + 1, 0).getDate();
        }

        // 计算上月空格数
        for (j = monthstart; j > 0; j--) {
            mystr +=
                "<div class='f-td f-null f-lastMonth' style='color:#D7D7D7'>"
                + (lastMonth - j + 1)
                + "</div>";
        }

        // 本月单元格
        for (i = 0; i < daysCount; i++) {
            //这里为一个单元格，在这里可以添加内容
            mystr +=
                "<div class='f-td f-number'>"
                + "<span class='f-day' date='"+yyyy+"-"+mm+"-"+(i + 1)+"'>" + (i + 1) + "</span>"
                + "</div>";
        }

        // 计算下月空格数
        for (k = 0; k < 42 - (daysCount + monthstart); k++) {  //表格保持等高6行42个单元格
            k == 0 ?
                mystr +=
                    "<div class='f-td f-null f-nextMounth' style='color:#D7D7D7;'>"
                    + (k + 1)
                    + "<span class='nextMonth fr mr20'>" + nextMonth + "月</span>"  // 下月一号添加对应月份
                    + "</div>"
                : mystr +=
                "<div class='f-td f-null f-nextMounth' style='color:#D7D7D7;'>"
                + (k + 1)
                + "</div>";
        }

        // 渲染日历
        $(".f-rili-table .f-tbody").html(mystr);

        // 给当日加类名
        /*
         if (mydate.getFullYear() == yyyy) {
         if ((mydate.getMonth() + 1 ) == mm) {
         var today = mydate.getDate();
         var lastNum = $(".f-lastMonth").length;
         $(".f-rili-table .f-td").eq(today + lastNum - 1).addClass("f-today");
         }
         }
         */
    }

    /**
     * 当前年月
     */
    function showNowDate() {
        $(".f-year").html(mydate.getFullYear());
        $(".f-month").html(mydate.getMonth() + 1);
        showDate(mydate.getFullYear(), mydate.getMonth() + 1);
        insertContent();
    }
    showNowDate();

    /**
     * 控制月份递减
     */
    function monthReduce() {
        var yy = parseInt($(".f-year").html());
        $(".f-month").html(currentMonth - 1);
        showDate(yy, currentMonth - 1)
    }

    /**
     * 控制月份递增
     */
    function monthAdd() {
        var yy = parseInt($(".f-year").html());
        $(".f-month").html(currentMonth + 1);
        showDate(yy, currentMonth + 1);
    }

    // 动态插入数据
    function insertContent() {
        // 显示隐藏浮层
        $('.hovColor').each(function () {
            $('.calendar-date').on('mouseover','.hovColor', function (event) {
                var event = event || window.event;
                var screenWidth = $(window).width();
                var boxWidth = $('.calendar-today').width() + $('.layer').width();
                var distenceLeft = event.pageX;

                // 边缘检测
                if (distenceLeft + boxWidth >= screenWidth) {
                    $('.calendar-today').css({left: '-400px'});
                    $('.triangle').css({left: '390px', transform: 'rotate(180deg)'});
                }
                else if (distenceLeft + boxWidth <= screenWidth) {
                    $('.calendar-today').css({left: '135px'});
                    $('.triangle').css({left: '-16px', transform: 'rotate(0deg)'});
                }

                $(this).children('.calendar-today').css({display: 'block'}).siblings().css({display: 'none'});

                return false;

            });
            $('.calendar-date').on('mouseout','.hovColor', function () {
                $(this).children('.calendar-today').css({display: 'none'}).siblings().css({display: 'block'});

                return false;
            });
        });
    }
