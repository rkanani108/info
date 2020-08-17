var changePasswordGeneralErrorHtml = "";
if (typeof changePasswordGeneralError !== 'undefined'){
    changePasswordGeneralErrorHtml = $xa("<div />").html(changePasswordGeneralError).text();
}

$xa("#changepassword-form").submit(function (e) {
    e.preventDefault();
    e.returnValue = false;
    $xa('input[type="submit"]').prop('disabled', true)
    var oldPw = $xa("#password-old-field").val();
    var newPw = $xa("#password-new-field").val();
    $xa.ajax({
        method: "POST",
        data: {oldPassword: oldPw, newPassword: newPw},
        url: changePasswordUrl,
        success: function (data) {
            if (data.Message){
                appendChangePasswordError(data.Message);
                return false;
            }
            window.location.href = changePasswordRedirectUrl + "?success=change_password";
        },
        error: function (){
            appendChangePasswordError(changePasswordGeneralErrorHtml);
        }
    });
});

function appendChangePasswordError(errorMessage){
    $xa(".component-profile__errorwrapper").html("<span class=\"error\"></span>");
    $xa(".component-profile__errorwrapper").append(errorMessage);
    $xa(".component-profile__errorwrapper").show();
    $xa('input[type="submit"]').prop('disabled', false)
}

    $xa('#changepassword-form').keyup(function(){
        checkValid($xa('#password-new-field').val());
    });  

    function checkValid(password){
        var valids = 0;
        var oldPassword = $xa('#password-old-field').val();
        var newPassword = $xa('#password-new-field');
        var confirmPassword = $xa('#password-confirm-field');

        if (password.match(/[a-z]/))  {
            $xa('#minlower').addClass('validated');
            valids +=1
        }else{
            $xa('#minlower').removeClass('validated');
            valids -1
        }

        if (password.match(/[A-Z]/))  {
            $xa('#minupper').addClass('validated');
            valids +=1
        }else{
            $xa('#minupper').removeClass('validated');
            valids -1
        }

        //Validate numbers/specials
        var numbersSpecials = /[!,%,&,@,#,$,^,*,?,_,~]/g;
        if (password.match(numbersSpecials)) {
          $xa('#minspecial').addClass('validated');
          valids += 1
        } else {
          $xa('#minspecial').removeClass('validated');
          valids - 1
        }

        if (password.match(/([0-9])/))  {
            $xa('#mindigit').addClass('validated');
            valids += 1
        }else{
            $xa('#mindigit').removeClass('validated');
            valids - 1
        }

        if (password.length > 7) {
            $xa('#minchar').addClass('validated');
            valids += 1
        }else{
            $xa('#minchar').removeClass('validated');
            valids - 1
        }

        if (newPassword.val() == confirmPassword.val() && newPassword.val().length >= 8) {
            $xa('#minmatch').addClass('validated');
            valids += 1
        }else{
            $xa('#minmatch').removeClass('validated');
            valids - 1
        }
        
        if (valids >= 6 && !(oldPassword == "")) {
            $xa('input[type="submit"]').prop('disabled', false);
        }else {
            $xa('input[type="submit"]').prop('disabled', true);
        }
    }