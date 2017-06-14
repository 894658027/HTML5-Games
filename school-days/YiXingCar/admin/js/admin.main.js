//选择主题及初始化主题逻辑
(function () {
    $(".color-panel .color-mode ul li").click(function () {
        var color = $(this).attr("data-style");
        $.cookie('currentTheme', color, { expires: 7, path: '/' });
    });
    var currentTheme = $.cookie('currentTheme');
    if (currentTheme != null && currentTheme) {
        $('#style_color').attr("href", "/assets/css/style_" + currentTheme + ".css");
    }
})();

//新菜单根据Url决定逻辑
(function () {
    var locationHref = window.location.href;
    $(".page-sidebar>ul>li>a").each(function () {

        if (locationHref.indexOf($(this).attr("href")) > 0) {
            $(this).parent().addClass("active");
            $(this).append("<span class='selected'></span>");

            $("#navigation .page-title span").html($(this).text());
            $("#navigation .page-title small").html($(this).attr("title") || "");
            $("#navigation .breadcrumb li:eq(1) span").html($(this).text());
            $("#navigation .breadcrumb li:eq(1) i").remove();
            $("#navigation .breadcrumb li:eq(2)").remove();

            document.title = $(this).text() + " - " + document.title;

            return false;
        }
        else {
            var parent = $(this);
            $(this).next("ul").each(function () {
                $("a", $(this)).each(function () {
                    if (locationHref.indexOf($(this).attr("href")) > 0) {
                        $(this).parent().addClass("active");

                        parent.parent().addClass("active");
                        $(".arrow", parent).addClass("open").before("<span class='selected'></span>");

                        $("#navigation .page-title span").html($(this).text());
                        $("#navigation .page-title small").html($(this).attr("title") || "");
                        $("#navigation .breadcrumb li:eq(1) span").html(parent.text());
                        $("#navigation .breadcrumb li:eq(2) span").html($(this).text());

                        document.title = $(this).text() + " - " + document.title;

                        return false;
                    }
                });
            });
        }
    });
})();

(function () {
    var isIE8Or9 = false;

    if (window.ActiveXObject) {
        var ua = navigator.userAgent.toLowerCase();
        var ie = ua.match(/msie ([\d.]+)/)[1]
        if (ie == 8.0 || ie == 9.0) {
            isIE8Or9 = true;
        }

        if (ie == 6.0) {
            alert("您的浏览器版本是IE6，在本系统中不能达到良好的视觉效果，建议你升级到IE8及以上！")
        }
    }

    if (!isIE8Or9) {
        //alert("您的浏览器版本不是IE8或IE9，在本系统中不能达到良好的视觉效果，建议你升级到IE8以上！")
    }
})();

$("#checkall").click(function () {
    var ischecked = this.checked;
    $("input:checkbox[name='ids']").each(function () {
        this.checked = ischecked;
    });

    $.uniform.update(':checkbox');
});

$("#delete").click(function () {
    var message = "你确定要删除勾选的记录吗?";
    if ($(this).attr("message"))
        message = $(this).attr("message") + "，" + message;
    if (confirm(message))
        $("#mainForm").submit();
});



