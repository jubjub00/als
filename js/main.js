
(function ($) {
    "use strict";

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        if(check){
            const username = $('#username').val()
            const password = $('#pass').val()
            const firstname = $('#firstname').val()
            const lastname = $('#lastname').val()
            const age = $('#age').val()
            const phone_number = $('#phone_number').val()
            if(localStorage['user']){
                const user = JSON.parse(localStorage['user'])
                user.push({
                    id: Date.now(),
                    username,
                    password,
                    firstname,
                    lastname,
                    age,
                    phone_number
                })

                localStorage['user'] = JSON.stringify(user)
            }else{
                const user = []
                user.push({
                    id: Date.now(),
                    username,
                    password,
                    firstname,
                    lastname,
                    age,
                    phone_number
                })
                localStorage['user'] = JSON.stringify(user)
            }
            alert('เพิ่มข้อมูลผู้ใช้เรียบร้อย')
        }

        // return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    $('.validate-form-login').on('submit', function () {
        var check = true;

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }

        if (check) {
            const username = $('#username').val()
            const password = $('#pass').val()
            if (localStorage['user']) {
                const user = JSON.parse(localStorage['user'] || null) || []
                const found = user.find(data => data.username === username && data.password === password)
                if (found) {
                    localStorage['user-signed'] = found.id
                    return true
                }
            }
            alert('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง')
        }

        return false;
    });


    $('.validate-form-login .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });


    

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    


    

})(jQuery);