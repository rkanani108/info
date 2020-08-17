var createAccountGeneralErrorHtml = "";
if (typeof createAccountGeneralError !== 'undefined'){
    createAccountGeneralErrorHtml = $xa("<div />").html(createAccountGeneralError).text();
}
    // Enable/Disable Submit Button
    $xa('#create-account-form :input[type="submit"]').prop('disabled', true);
    $xa("form").keyup(function() {
        $xa('#create-account-form :input[type="submit"]').prop('disabled', true);
        var firstName = $xa("#create-account-firstname").val();
        var lastName = $xa("#create-account-lastname").val();
        var email = $xa("#create-account-email").val();
        if (!(email == "" || firstName == "" || lastName == "")) {
            $xa('#create-account-form :input[type="submit"]').prop('disabled', false);
        }
    });

    $xa("#create-account-form").submit(function (e) {
        e.preventDefault();
        e.returnValue = false;
        var $form = $xa(this);
        var email = $xa("#create-account-email");
        
        $xa.ajax({
            type: 'POST',
            url: createAccountCheckEmailUrl,
            data: { email: email.val() },
            context: $form,
            success: function (data) {
                if (data.response) {
                    if (data.Error){
                        appendAccountError(data.Error);
                    }
                    else if (data.response.FriendlyErrorMessage) {
                        var message = data.response.FriendlyErrorMessage;
                        appendAccountError(message);
                    }
                    else{
                        doCreateAccount();
                    }
                }
            },
            error: function () {
                appendAccountError(createAccountGeneralErrorHtml);
            }
        });
    });

    function doCreateAccount(){
        var email = $xa("#create-account-email");
        var firstName = $xa("#create-account-firstname");
        var lastName = $xa("#create-account-lastname");
        $xa.ajax({
            type: 'POST',
            url: createAccountUrl,
            data: { firstName: firstName.val(), lastName: lastName.val(), email: email.val(), completeRegUrl: createAccountCompleteRegistrationUrl },
            success: function (data) {
                if (data.response) {
                    if (data.Message) {
                        var message = data.Message;
                        appendAccountError(message);
                        return false;
                    }
                }
                $xa("#create-account-form").off('submit');
                window.location.href = createAccountThankYouUrl + "?email=" + encodeURIComponent(email.val());
            },
            error: function () {
                appendAccountError(createAccountGeneralErrorHtml);
            }
        });
    }

    function appendAccountError(errorMessage){
        $xa("#email-error").html("<span class=\"error\"></span>");
        $xa("#email-error").append(errorMessage);
        $xa("#email-error").show();
    }

    $xa('#create-account-form').validate();

    ;(function ($, window, document, undefined) {

        $xa('[data-toggle="tooltip"]').tooltip({placement : 'top'});
    
    })(window.jQuery, this, this.document);