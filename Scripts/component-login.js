var loginGeneralErrorHtml = "";
if (typeof loginGeneralError !== 'undefined'){
    loginGeneralErrorHtml = $xa("<div />").html(loginGeneralError).text();
}
;(function ($, window, document, undefined) {
    // Input Field's Value exists
    function initLoginInputBlur() {
        $xa('.component-login__container input').on('blur', function() {
            var _this = $xa(this);
            var inputValue = _this.val();
            if (inputValue) {
            _this.addClass('value-exists');
            } else {
            _this.removeClass('value-exists');
            }
        });
    }
    
    // Password Show/Hide
    $xa(".toggle-password").click(function() {
        $xa(this).toggleClass("show hide");
        var input = $xa($xa(this).attr("toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    // Enable/Disable Submit Button
    $xa('#login-form :input[type="submit"]').prop('disabled', true);
    $xa("form").keyup(function(event) {
        if (event.key == "Enter") return;
        $xa('#login-form :input[type="submit"]').prop('disabled', true);
        var email = $xa(".login-email").val();
        var password = $xa(".login-password").val();
        if (!(email == "" || password == "")) {
            $xa('#login-form :input[type="submit"]').prop('disabled', false);
        }
    });

    if (document.getElementById("login-email")){
        document.getElementById("login-email").addEventListener("invalid", function (e){
            e.preventDefault();
            e.stopPropagation();
            appendLoginError(loginGeneralErrorHtml);
        });
    }

    $xa("#login-form").submit(function (e) {
        e.preventDefault();
        e.returnValue = false;
        $xa('#login-form :input[type="submit"]').prop('disabled', true);
        $xa.ajax({
            method: "POST",
            data: { userName: $xa(".login-email").val(), password: $xa(".login-password").val(), rememberMe: $xa("#remember").prop('checked')},
            url: loginUrl,
            success: function (data) {
                if (data.Message){
                    appendLoginError(data.Message);
                    return false;
                }
                var returnUrl = GetUrlParameter("returnUrl");
                if(returnUrl){
                    var decodedUrl = decodeURIComponent(returnUrl);
                    window.location.href = decodedUrl;
                    return;
                }
                window.location.href = loginSuccessRedirect;
            },
            error: function () {
                appendLoginError(loginGeneralErrorHtml);
            }
        });
    });

    function appendLoginError(errorMessage){
        $xa(".component-login__errorwrapper").html("<span class=\"error\"></span>");
        $xa(".component-login__errorwrapper").append(errorMessage);
        $xa(".component-login__errorwrapper").show();
        $xa('#login-form :input[type="submit"]').prop('disabled', false);
    }

    $xa(window).on("load",function(){
        initLoginInputBlur();
    });

})(window.jQuery, this, this.document);


function GetUrlParameter(sParam)    
{    
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');    
    for (var i = 0; i < sURLVariables.length; i++)    
    {    
        var sParameterName = sURLVariables[i].split('=');    
        if (sParameterName[0] == sParam)    
        {    
            return sParameterName[1];    
        }
    }
}