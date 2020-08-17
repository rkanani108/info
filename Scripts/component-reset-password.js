var resetPasswordGeneralErrorHtml = "";
if (typeof resetPasswordGeneralError !== 'undefined'){
    resetPasswordGeneralErrorHtml = $xa("<div />").html(resetPasswordGeneralError).text();
}

$xa("#resetpassword-form").submit(function (e) {
    e.preventDefault();
    e.returnValue = false;
    var newPw = $xa("#password-new-field").val();
    $xa.ajax({
        method: "POST",
        data: {newPassword: newPw},
        url: resetPasswordUrl,
        success: function (data) {
            if (data.Message){
                appendResetPasswordError(data.Message);
                return false;
            }
            $xa("#reset-password-success-modal").show();
            $xa("#reset-password-wrapper").hide();
        },
        error: function () {
            appendResetPasswordError(resetPasswordGeneralErrorHtml);
        }
    });
});

function appendResetPasswordError(errorMessage){
    $xa(".component-reset-password__errorwrapper").html("<span class=\"fa fa-exclamation-triangle exclamation-triangle\"></span>");
    $xa(".component-reset-password__errorwrapper").append(errorMessage);
    $xa(".component-reset-password__errorwrapper").show();
    $xa(".component-reset-password__successwrapper").hide();
}