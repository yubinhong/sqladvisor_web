/**
 * Created by Administrator on 2017/9/15 0015.
 */
$(document).ready(function() {
    $('#form1').bootstrapValidator({
        message: 'This value is not valid',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            IP: {
                message: 'The IP is not valid',
                validators: {
                    notEmpty: {
                        message: 'IP不能为空'
                    },
                    ip: {
                        message: 'IP格式不正确'
                    }
                }
            },
            port: {
                message: 'The port is not valid',
                validators: {
                    notEmpty: {
                        message: '端口不能为空'
                    },
                    regexp: {
                        regexp: /^[0-9]{1,5}/,
                        message: '端口只能是数字'
                    }
                }
            },
            database: {
                message: 'The database is not valid',
                validators: {
                    notEmpty: {
                        message: '数据库不能为空'
                    },
                }
            },
            username: {
                message: 'The username is not valid',
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                }
            },
            passwd: {
                message: 'The password is not valid',
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                }
            },
            sql: {
                message: 'The sql is not valid',
                validators: {
                    notEmpty: {
                        message: 'sql语句不能为空'
                    },
                }
            },
        }
    });
});

function confirmAct(){
    //var action=action;
    $('#form1').data('bootstrapValidator').validate();//手动对表单进行校检
    if (!$('#form1').data('bootstrapValidator').isValid()) {//判断校检是否通过
        // alert("验证不通过");
        return;
    }else {
        showMask();
        return manage();
    }
}

function manage() {
    var formdata=new FormData($("#form1")[0]);
    $.ajax({
        url: '/',
        type: 'POST',
        data: formdata,
        async: true,
        cache: false,
        contentType: false,
        processData: false,
        success:function (callback) {
            console.log(callback);
            hideMask();
            var advisor_list=JSON.parse(callback);
            var html_ele='';
            $.each(advisor_list,function (index,item) {
                html_ele +='<p>'+item+'</p>';
            });
            console.log(html_ele);
            $('#advisor').html(html_ele);
            $('#myModal').modal('show');

        },

    });
}




//显示遮罩层
function showMask(){
    $("#mask").css("height",$(document).height());
    $("#mask").css("width",$(document).width());
    $("#mask").show();
}
//隐藏遮罩层
function hideMask(){

    $("#mask").hide();
}