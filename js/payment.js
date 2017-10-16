


$(function () {
    $(".payment_time_title em").click(function () {
        $("#bg").css({
            display: "block", height: "100%"
        });
        var $box = $('.payment_time_mask');
        $box.css({
            display: "block",
        });
    });

    //点击关闭按钮的时候，遮罩层关闭
    $(".payment_time_mask li ").on('click',function () {
        $("#bg,.payment_time_mask").css("display", "none");

        $(".payment_time_title em").text($(this).children("div").children("p").html())  ;

    });


    $(".mask_c button").on('click',function () {
        $("#bg,.payment_time_mask").css("display", "none");

    });

    $('#subBtn').click(function () {
      var mobile = $('#tel_in #input_tel').val();
        if ($(".payment_time_title em").text() === "please choose") {
            $('#dialogContent').text('请选择餐厅');
            $('#iosDialog').fadeIn(200);
        } else if ($('#picktime #input1').val() == '') {
            $('#dialogContent').text('请选择时间');
            $('#iosDialog').fadeIn(200);
        } else if ($('#tel_in #input_tel').val() == '') {
            $('#dialogContent').text('请填写联系方式');
            $('#iosDialog').fadeIn(200);
        }else if(!(/^((\d{3}-\d{8}|\d{4}-\d{7,8})|(1[3|5|7|8][0-9]{9}))$/.test(mobile))) {
            $('#dialogContent').text('请填写正确的手机号');
            $('#iosDialog').fadeIn(200);
        }else if ($('#p ul li input[name="type"]:checked').size() == 0) {
            $('#dialogContent').text('请选择用餐人数');
            $('#iosDialog').fadeIn(200);
        } else {
            window.location.href = 'order.html';
        }
    })

    $('body').on('click', '.weui-dialog__btn', function(){
        $(this).parents('.js_dialog').fadeOut(200);
    });

});
