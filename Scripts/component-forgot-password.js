var forgotPasswordInvalidEmailErrorHtml = "";
if (typeof forgotPasswordInvalidEmailError !== 'undefined'){
    forgotPasswordInvalidEmailErrorHtml = $xa("<div />").html(forgotPasswordInvalidEmailError).text();
}

var forgotPasswordGeneralErrorHtml = "";
if (typeof forgotPasswordGeneralError !== 'undefined'){
    forgotPasswordGeneralErrorHtml = $xa("<div />").html(forgotPasswordGeneralError).text();
}

;(function ($, window, document, undefined) {
 
    if (document.getElementById("forgotpassword_email")){
        document.getElementById("forgotpassword_email").addEventListener("invalid", function (e){
            e.preventDefault();
            e.stopPropagation();
            appendForgotPasswordError(forgotPasswordInvalidEmailErrorHtml);
        });
    }

    function appendForgotPasswordError(errorMessage){
        $xa(".component-reset-password__errorwrapper").html("<span class=\"fa fa-exclamation-triangle exclamation-triangle\"></span>");
        $xa(".component-reset-password__errorwrapper").append(errorMessage);
        $xa(".component-reset-password__errorwrapper").show();
    }

    // Enable/Disable Submit Button
      $xa('.component-reset-password__formEmail :input[type="submit"]').prop('disabled', true);
      $xa(".component-reset-password__formEmail").keyup(function() {
          $xa('.component-reset-password__formEmail :input[type="submit"]').prop('disabled', true);
          var email = $xa(".login-email").val();
          //var password = $xa(".login-password").val();
          if (!(email == "")) {
              $xa('.component-reset-password__formEmail :input[type="submit"]').prop('disabled', false);
          }
      });
 
     $xa("#forgotpassword-form").submit(function (e) {
       e.preventDefault();
       e.returnValue = false;
       var emailAddress = $xa("#forgotpassword_email").val();
       $xa.ajax({
           method: "POST",
           data: { email: emailAddress, resetUrl: resetPasswordUrl},
           url: forgotpasswordUrl,
           success: function (data) {
               if (data.Message){
                    appendForgotPasswordError(data.Message);
                   return false;
               }
               window.location.href = forgotpasswordRedirect + "?email=" + encodeURIComponent(emailAddress);
           },
           error: function () {
               appendForgotPasswordError(forgotPasswordGeneralErrorHtml);
           }
       });
     });

     $xa('.component-reset-password__form').keyup(function(){
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

      if (password.match(/([0-9])/))  {
          $xa('#mindigit').addClass('validated');
          valids += 1
      }else{
          $xa('#mindigit').removeClass('validated');
          valids - 1
      }

      if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/))  {
          $xa('#minspecial').addClass('validated');
          valids += 1
      }else{
          $xa('#minspecial').removeClass('validated');
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
 
    
      
    
  })(window.jQuery, this, this.document)